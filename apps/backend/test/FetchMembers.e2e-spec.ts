import 'reflect-metadata';

import {Sex} from "../src/domain/enums/Sex";
import {MemberStatus} from "../src/domain/enums/MemberStatus";
import {MaritalStatus} from "../src/domain/enums/MaritalStatus";
import {LevelOfEducation} from "../src/domain/enums/LevelOfEducation";
import {MemberAdmissionType} from "../src/domain/enums/MemberAdmitionType";
import {MemberClassification} from "../src/domain/enums/MemberClassification";


import {axios} from "../src/infra/AxiosAdapter";
import {cpfGenerator} from "../src/infra/cpf-generator";
import {fullNameFactory} from "./utils/factories/fullNameFactory";


describe('Fetch Members', () => {
	const fullName = fullNameFactory();
	const buildMemberInput = () => ({
		sex: Sex.Male,
		cpf: cpfGenerator(),
		email: crypto.randomUUID() + "@gmail.com",
		phone: '95 99999-9999',
		status: MemberStatus.InFullCommunion,
		fullName: fullName(),
		birthdate: '1987-10-22',
		celebrant: fullName(),
		placeOfBirth: 'Juiz de Fora - MG',
		maritalStatus: MaritalStatus.Single,
		admissionType: MemberAdmissionType.Restoration,
		classification: MemberClassification.Communicant,
		levelOfEducation: LevelOfEducation.SpecialEducation,
		religiousBackground: 'Batista',
		wasBaptizedInInfancy: false,
		professionOfFaithDate: '2007-10-20',
		address: {
			city: 'new york',
			state: 'NY',
			street: 'street',
			number: '123',
			zipCode: '12345-678',
			district: 'district',
		},
	});

	it('deve buscar os membros recém admitidos', async () => {
		const first = buildMemberInput();
		const second = buildMemberInput();
		const admitEndpoint = 'membership/admit-member';
		expect((await axios.post(admitEndpoint, first)).status).toBe(204);
		expect((await axios.post(admitEndpoint, second)).status).toBe(204);
		const response = await axios.get('membership/fetch-members');
		expect(response.status).toBe(200);
		expect(response.data.success).toBe(true);
		expect(response.data.data.members.length).toBeGreaterThanOrEqual(2);
		expect(response.data.data.meta.total).toBeGreaterThanOrEqual(2);
		const emails = response.data.data.members.map((m: any) => m.email);
		expect(emails).toEqual(expect.arrayContaining([first.email, second.email]));
	});

});
