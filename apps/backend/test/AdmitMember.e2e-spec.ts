import 'reflect-metadata';

import {Sex} from "../src/domain/enums/Sex";
import {Cpf} from "../src/domain/value-objects/Cpf/Cpf";
import {MemberStatus} from "../src/domain/enums/MemberStatus";
import {MaritalStatus} from "../src/domain/enums/MaritalStatus";
import {LevelOfEducation} from "../src/domain/enums/LevelOfEducation";
import {MemberAdmissionType} from "../src/domain/enums/MemberAdmitionType";
import {MemberClassification} from "../src/domain/enums/MemberClassification";


import {axios} from "../src/infra/AxiosAdapter";
import {Container} from "../src/infra/container";
import {cpfGenerator} from "../src/infra/cpf-generator";
import {MemberRepository} from "../src/infra/repositories/MemberRepository";

describe('Admit Member', () => {
	const input = {
		sex: Sex.Male,
		cpf: cpfGenerator(),
		email: crypto.randomUUID() + "@gmail.com",
		phone: '95 99999-9999',
		status: MemberStatus.Transferred,
		fullName: 'John Doe',
		birthdate: '1987-10-22',
		celebrant: 'Ciclano da Silva',
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
	};

	it('deve admitir um novo membro', async () => {
		const response = await axios.post('membership/admit-member', input);
		expect(response.status).toBe(204);
		const memberRepo = Container.resolve(MemberRepository);
		const cpf = new Cpf(input.cpf);
		const getMemberResponse = await memberRepo.getMemberByCpf(cpf.value);
		if (!getMemberResponse) throw new Error('Membro não encontrado');
		const data = getMemberResponse;
		expect(data.sex).toBe(input.sex);
		expect(data.cpf).toBe(cpf.value);
		expect(data.phone).toBe('(95) 99999-9999');
		expect(data.email).toBe(input.email);
		expect(data.status).toBe(MemberStatus.Transferred);
		expect(data.fullName).toBe(input.fullName);
		expect(data.birthdate.getTime()).toBe(new Date('1987-10-21T04:00:00.000Z').getTime());
		expect(data.celebrant).toBe(input.celebrant);
		expect(data.placeOfBirth).toBe(input.placeOfBirth);
		expect(data.maritalStatus).toBe(MaritalStatus.Single);
		expect(data.admissionType).toBe(MemberAdmissionType.Restoration);
		expect(data.classification).toBe(MemberClassification.Communicant);
		expect(data.levelOfEducation).toBe(LevelOfEducation.SpecialEducation);
		expect(data.religiousBackground).toBe('Batista');
		expect(data.wasBaptizedInInfancy).toBe(false);
		expect(data.address.city).toBe(input.address.city);
		expect(data.address.state).toBe(input.address.state);
		expect(data.address.street).toBe(input.address.street);
		expect(data.address.number).toBe(input.address.number);
		expect(data.address.zipCode).toBe(input.address.zipCode);
		expect(data.address.district).toBe(input.address.district);
		expect(data.address.complement).toBe(null);
	});

});
