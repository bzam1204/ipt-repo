import {inject, injectable} from "tsyringe";

import {Member} from "@/domain/entities/Member/Member";
import {MemberStatus} from "@/domain/enums/MemberStatus";
import {LevelOfEducation} from "@/domain/enums/LevelOfEducation";
import {MemberAdmissionType} from "@/domain/enums/MemberAdmitionType";
import {MemberClassification} from "@/domain/enums/MemberClassification";

import {MemberModel} from "@/infra/database/models/member.model";
import {DatabaseConnectionAdapter, DatabaseConnectionAdapterToken} from "@/infra/database/DatabaseConnectionAdapter";
import {buildMeta, normalizePagination, PaginationMeta} from "@/infra/http/pagination";

export interface FetchMembersQuery {
	search?: string;
	sort?: string;
	page?: number;
	perPage?: number;
	status?: string | string[];
	createdAt?: {
		gte?: string;
		lte?: string;
	};
}

export interface FetchMembersRecord {
	memberId: string;
	cpf: string;
	email: string;
	phone: string;
	status: MemberStatus;
	fullName: string;
	admissionType: MemberAdmissionType;
	classification: MemberClassification;
	levelOfEducation: LevelOfEducation;
	birthdate: string;
	address: {
		city: string;
		state: string;
		street: string;
		number: string;
		zipCode: string;
		district: string;
		complement?: string;
	};
}

export interface FetchMembersResult {
	members: FetchMembersRecord[];
	meta: PaginationMeta;
}

type MemberRow = Omit<MemberModel, 'address'>;

@injectable()
export class FetchMembers {

	constructor(@inject(DatabaseConnectionAdapterToken) private readonly _db: DatabaseConnectionAdapter) { }

	async execute(query: FetchMembersQuery = {}): Promise<FetchMembersResult> {
		const {page, perPage} = normalizePagination(query, {page: 1, perPage: 20, maxPerPage: 100});
		const {whereClause, params} = this.buildWhereClause(query);
		const sortClause = this.buildSortClause(query.sort);
		const offset = (page - 1) * perPage;
		const selectSql = `
            SELECT m.member_id, m.sex, m.cpf, m.email, m.phone, m.status, m.full_name, m.birthdate, m.celebrant, m.place_of_birth, m.marital_status, m.admission_type, m.classification, m.level_of_education, m.religious_background, m.was_baptized_in_infancy, m.profession_of_faith_date, a.city, a.state, a.number, a.street, a.zip_code, a.district, a.complement, m.created_at
            FROM ipt.members as m
            JOIN ipt.members_addresses as a ON m.member_id = a.member_id
            ${whereClause}
            ${sortClause}
            LIMIT ${perPage} OFFSET ${offset};
		`;
		const countSql = `SELECT COUNT(*)::int as total FROM ipt.members as m ${whereClause};`;
		const rows = await this._db.query<MemberRow[]>(selectSql, params);
		const [{total}] = await this._db.query<{total: number}[]>(countSql, params);
		const members = rows.map(this.mapToRecord);
		return {members, meta: buildMeta(total, page, perPage)};
	};

	private mapToRecord(model: MemberRow): FetchMembersRecord {
		const addressData = {city: model.city, state: model.state, street: model.street, number: model.number, zipCode: model.zip_code, district: model.district, complement: model.complement ?? undefined};
		const member = new Member(model.member_id, model.sex, model.cpf, model.email, model.phone, model.status, addressData, model.full_name, model.birthdate, model.celebrant, model.place_of_birth, model.marital_status, model.admission_type, model.classification, model.level_of_education, model.religious_background, model.was_baptized_in_infancy, model.profession_of_faith_date);
		return {
			memberId: member.memberId,
			cpf: member.cpf,
			email: member.email,
			phone: member.phone,
			status: member.status,
			fullName: member.fullName,
			admissionType: member.admissionType,
			classification: member.classification,
			levelOfEducation: member.levelOfEducation,
			birthdate: member.birthdate.toISOString(),
			address: {
				city: member.address.city,
				state: member.address.state,
				street: member.address.street,
				number: member.address.number,
				zipCode: member.address.zipCode,
				district: member.address.district,
				complement: member.address.complement,
			},
		};
	};

	private buildWhereClause(query: FetchMembersQuery): {whereClause: string; params: any[]} {
		const clauses: string[] = [];
		const params: any[] = [];
		if (query.search) {
			params.push(`%${query.search}%`);
			clauses.push(`(m.full_name ILIKE $${params.length} OR m.email ILIKE $${params.length})`);
		}
		if (query.status) {
			if (Array.isArray(query.status)) {
				const placeholders = query.status.map((_, idx) => `$${params.length + idx + 1}`).join(', ');
				params.push(...query.status);
				clauses.push(`m.status IN (${placeholders})`);
			} else {
				params.push(query.status);
				clauses.push(`m.status = $${params.length}`);
			}
		}
		if (query.createdAt?.gte) {
			params.push(query.createdAt.gte);
			clauses.push(`m.created_at >= $${params.length}`);
		}
		if (query.createdAt?.lte) {
			params.push(query.createdAt.lte);
			clauses.push(`m.created_at <= $${params.length}`);
		}
		if (clauses.length === 0) return {whereClause: '', params};
		return {whereClause: `WHERE ${clauses.join(' AND ')}`, params};
	}

	private buildSortClause(sort?: string): string {
		if (!sort) return 'ORDER BY m.created_at DESC';
		const direction = sort.startsWith('-') ? 'DESC' : 'ASC';
		const field = sort.replace(/^-/, '');
		const allowed: Record<string, string> = {
			fullName: 'm.full_name',
			createdAt: 'm.created_at',
			email: 'm.email',
			status: 'm.status',
		};
		const column = allowed[field];
		if (!column) return 'ORDER BY m.created_at DESC';
		return `ORDER BY ${column} ${direction}`;
	}

}

export const FetchMembersToken = Symbol(FetchMembers.name);
