import "reflect-metadata";

import {FetchMembers} from "@/application/use-cases/FetchMembers/FetchMembers";

import {Sex} from "@/domain/enums/Sex";
import {MemberStatus} from "@/domain/enums/MemberStatus";
import {MaritalStatus} from "@/domain/enums/MaritalStatus";
import {LevelOfEducation} from "@/domain/enums/LevelOfEducation";
import {MemberAdmissionType} from "@/domain/enums/MemberAdmitionType";
import {MemberClassification} from "@/domain/enums/MemberClassification";

describe('Fetch Members', () => {
	const rows = [{
		member_id: crypto.randomUUID(),
		sex: Sex.Male,
		cpf: '67825807057',
		email: 'john.doe@example.com',
		phone: '95 99999-9999',
		status: MemberStatus.InFullCommunion,
		full_name: 'John Doe',
		birthdate: '1987-10-22',
		celebrant: 'Celebrant Doe',
		place_of_birth: 'Juiz de Fora - MG',
		marital_status: MaritalStatus.Single,
		admission_type: MemberAdmissionType.ProfessionOfFaith,
		classification: MemberClassification.Communicant,
		level_of_education: LevelOfEducation.SpecialEducation,
		religious_background: 'Batista',
		was_baptized_in_infancy: false,
		profession_of_faith_date: '2007-10-20',
		city: 'São Paulo',
		state: 'SP',
		street: 'Rua Principal',
		number: '123',
		zip_code: '12345-678',
		district: 'Centro',
		complement: null,
		created_at: new Date(),
	}];
	const query = jest.fn().mockResolvedValue(rows);
	const dbStub = {query};

	it('should return mapped members', async () => {
		const fetchMembers = new FetchMembers(dbStub as any);
		const output = await fetchMembers.execute({limit: 10});
		expect(query).toHaveBeenCalledWith(expect.any(String), [10, 0]);
		expect(output.members).toHaveLength(1);
		const [member] = output.members;
		expect(member.memberId).toBe(rows[0].member_id);
		expect(member.cpf).toBe(rows[0].cpf);
		expect(member.status).toBe(rows[0].status);
		expect(member.address.city).toBe(rows[0].city);
		expect(member.birthdate).toBe(new Date(rows[0].birthdate).toISOString());
	});

	it('should use default pagination when none is provided', async () => {
		const fetchMembers = new FetchMembers(dbStub as any);
		await fetchMembers.execute();
		expect(query).toHaveBeenLastCalledWith(expect.any(String), [50, 0]);
	});
});
