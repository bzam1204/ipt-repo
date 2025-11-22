import {inject, injectable} from "tsyringe";

import {Member} from "@/domain/entities/Member/Member";
import {MemberStatus} from "@/domain/enums/MemberStatus";
import {LevelOfEducation} from "@/domain/enums/LevelOfEducation";
import {MemberAdmissionType} from "@/domain/enums/MemberAdmitionType";
import {MemberClassification} from "@/domain/enums/MemberClassification";

import {MemberModel} from "@/infra/database/models/member.model";
import {DatabaseConnectionAdapter, DatabaseConnectionAdapterToken} from "@/infra/database/DatabaseConnectionAdapter";

@injectable()
export class FetchMembers {

	constructor(@inject(DatabaseConnectionAdapterToken) private readonly _db: DatabaseConnectionAdapter) { }

	async execute(query: FetchMembersQuery = {}): Promise<FetchMembersResult> {
		const parsedLimit = Number(query.limit ?? 50);
		const parsedOffset = Number(query.offset ?? 0);
		const limit = Number.isFinite(parsedLimit) && parsedLimit > 0 ? parsedLimit : 50;
		const offset = Number.isFinite(parsedOffset) && parsedOffset >= 0 ? parsedOffset : 0;
		const sql = `
            SELECT m.member_id, m.sex, m.cpf, m.email, m.phone, m.status, m.full_name, m.birthdate, m.celebrant, m.place_of_birth, m.marital_status, m.admission_type, m.classification, m.level_of_education, m.religious_background, m.was_baptized_in_infancy, m.profession_of_faith_date, a.city, a.state, a.number, a.street, a.zip_code, a.district, a.complement, m.created_at
            FROM ipt.members as m
            JOIN ipt.members_addresses as a ON m.member_id = a.member_id
            ORDER BY m.created_at DESC
            LIMIT $1 OFFSET $2;
		`;
		const rows = await this._db.query<MemberRow[]>(sql, [limit, offset]);
		const members = rows.map(this.mapToRecord);
		const output = {members};
		return output;
	};

	private mapToRecord(model: MemberRow): FetchMembersRecord {
		const addressData = { 	city: model.city, state: model.state, street: model.street, number: model.number, zipCode: model.zip_code, district: model.district, complement: model.complement ?? undefined};
		const member = new Member(model.member_id, model.sex, model.cpf, model.email, model.phone, model.status, addressData, model.full_name, model.birthdate, model.celebrant, model.place_of_birth, model.marital_status, model.admission_type, model.classification, model.level_of_education, model.religious_background, model.was_baptized_in_infancy, model.profession_of_faith_date);
		const m = member;
 		const output = {
			memberId: m.memberId,
			cpf: m.cpf,
			email: m.email,
			phone: m.phone,
			status: m.status,
			fullName: m.fullName,
			admissionType: m.admissionType,
			classification: m.classification,
			levelOfEducation: m.levelOfEducation,
			birthdate: m.birthdate.toISOString(),
			address: {
				city: m.address.city,
				state: m.address.state,
				street: m.address.street,
				number: m.address.number,
				zipCode: m.address.zipCode,
				district: m.address.district,
				complement: m.address.complement,
			},
		};
		return output;
	};

}

export const FetchMembersToken = Symbol(FetchMembers.name);

export interface FetchMembersQuery {
	limit?: number;
	offset?: number;
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
}

type MemberRow = Omit<MemberModel, 'address'>;
