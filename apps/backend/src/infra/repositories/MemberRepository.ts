import {inject, injectable} from "tsyringe";

import {Member} from "@/domain/entities/Member/Member";
import {Address} from "@/domain/value-objects/address/address";

import {MemberModel} from "@/infra/database/models/member.model";
import {DatabaseConnectionAdapter, DatabaseConnectionAdapterToken} from "@/infra/database/DatabaseConnectionAdapter";

@injectable()
export class MemberRepository {

	constructor(@inject(DatabaseConnectionAdapterToken) private readonly _db: DatabaseConnectionAdapter) { }

	async getMemberByCpf(cpf: string): Promise<Member | null> {
		const query = `
            SELECT m.member_id, m.sex, m.cpf, m.email, m.phone, m.status, m.full_name, m.birthdate, m.celebrant, m.place_of_birth, m.marital_status, m.admission_type, m.classification, m.level_of_education, m.religious_background, m.was_baptized_in_infancy, m.profession_of_faith_date, a.city, a.state, a.number, a.street, a.zip_code, a.district, a.complement 
            FROM ipt.members as m
   			JOIN ipt.members_addresses as a ON m.member_id = a.member_id
            WHERE m.cpf = $1
		`;
		const params = [cpf];
		const result = await this._db.query<DatabaseQueryResult<MemberModel>>(query, params);
		if (result.length === 0) return null;
		const [model] = result;
		const m = model;
		const address = new Address(m.city, m.state, m.street, m.number, m.zip_code, m.district, m.complement);
		const output = new Member(m.member_id, m.sex, m.cpf, m.email, m.phone, m.status, address, m.full_name, m.birthdate, m.celebrant, m.place_of_birth, m.marital_status, m.admission_type, m.classification, m.level_of_education, m.religious_background, m.was_baptized_in_infancy, m.profession_of_faith_date);
		return output;
	}

	async getMember(memberId: string): Promise<Member | null> {
		const query = `
            SELECT m.member_id, m.sex, m.cpf, m.email, m.phone, m.status, m.full_name, m.birthdate, m.celebrant, m.place_of_birth, m.marital_status, m.admission_type, m.classification, m.level_of_education, m.religious_background, m.was_baptized_in_infancy, m.profession_of_faith_date, a.city, a.state, a.number, a.street, a.zip_code, a.district, a.complement 
            FROM ipt.members as m
   			JOIN ipt.members_addresses as a ON m.member_id = a.member_id
            WHERE m.member_id = $1
		`;
		const params = [memberId];
		const result = await this._db.query<DatabaseQueryResult<MemberModel>>(query, params);
		if (result.length === 0) return null;
		const [model] = result;
		const m = model;
		const address = new Address(m.city, m.state, m.street, m.number, m.zip_code, m.district, m.complement);
		const output = new Member(m.member_id, m.sex, m.cpf, m.email, m.phone, m.status, address, m.full_name, m.birthdate, m.celebrant, m.place_of_birth, m.marital_status, m.admission_type, m.classification, m.level_of_education, m.religious_background, m.was_baptized_in_infancy, m.profession_of_faith_date);
		return output;
	};

	async existsByCpf(cpf: string): Promise<boolean> {
		const query = 'SELECT 1 FROM ipt.members WHERE cpf = $1;';
		const params = [cpf];
		const result = await this._db.query<DatabaseQueryResult<any>>(query, params);
		const output = result.length > 0;
		return output;
	};

	async existsByEmail(email: string): Promise<boolean> {
		const query = 'SELECT 1 FROM ipt.members WHERE email = $1;';
		const params = [email];
		const result = await this._db.query<DatabaseQueryResult<any>>(query, params);
		const output = result.length > 0;
		return output;
	};

	async save(member: Member): Promise<void> {
		const query = `
            INSERT INTO ipt.members (member_id, sex, cpf, email, phone, status, full_name, birthdate, celebrant, place_of_birth, marital_status, admission_type, classification, level_of_education, religious_background, was_baptized_in_infancy, profession_of_faith_date, created_at)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $25);
            INSERT INTO ipt.members_addresses (member_id, city, state, street, number, zip_code, district, complement)
            VALUES ($1, $18, $19, $20, $21, $22, $23, $24);
		`;
		const m = member;
		const addressParams = [m.address.city, m.address.state, m.address.street, m.address.number, m.address.zipCode, m.address.district, m.address.complement]
		const params = [m.memberId, m.sex, m.cpf, m.email, m.phone, m.status, m.fullName, m.birthdate, m.celebrant, m.placeOfBirth, m.maritalStatus, m.admissionType, m.classification, m.levelOfEducation, m.religiousBackground, m.wasBaptizedInInfancy, m.professionOfFaithDate, ...addressParams, new Date()];
		await this._db.onTransaction(transaction => transaction.query(query, params))
	};

}

export type DatabaseQueryResult<T> = Array<T>;
export const MemberRepositoryToken = Symbol(MemberRepository.name);
