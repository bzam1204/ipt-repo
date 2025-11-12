import {axios} from "../src/infra/AxiosAdapter";
import {cpfGenerator} from "../src/infra/cpf-generator";
import {MaritalStatus} from "../src/domain/enums/MaritalStatus";
import {MemberAdmissionType} from "../src/domain/enums/MemberAdmitionType";
import {MemberClassification} from "../src/domain/enums/MemberClassification";
import {LevelOfEducation} from "../src/domain/enums/LevelOfEducation";
import {MemberStatus} from "../src/domain/enums/MemberStatus";
import {Sex} from "../src/domain/enums/Sex";

describe('Admit Member', () => {
	const input = {
		sex: Sex.Male,
		cpf: '678.258.070-57',
		email: crypto.randomUUID() + "@gmail.com",
		phone: '95 99999-9999',
		status: MemberStatus.Transferred,
		address: {},
		fullName: 'John Doe',
		birthDate: '22-10-1987',
		celebrant: 'Ciclano da Silva',
		placeOfBirth: 'Juiz de Fora - MG',
		maritalStatus: MaritalStatus.Single,
		admissionType: MemberAdmissionType.Restoration,
		classification: MemberClassification.Communicant,
		levelOfEducation: LevelOfEducation.SpecialEducation,
		religiousBackground: 'Batista',
		wasBaptizedInInfancy: false,
		professionOfFaithDate: '22-10-2007',
	};

	it('deve admitir um novo membro', async () => {
		const response = await axios.post('membership/admit-member', input);
		expect(response.status).toBe(204);
		const getMemberResponse = await axios.get(`membership/get-member?cpf=${input.cpf}`);
		expect(getMemberResponse.status).toBe(200);
		expect(getMemberResponse.data.sex).toBe(input.sex);
		expect(getMemberResponse.data.cpf).toBe(input.cpf);
		expect(getMemberResponse.data.phone).toBe(input.phone);
		expect(getMemberResponse.data.email).toBe(input.email);
		expect(getMemberResponse.data.status).toBe(MemberStatus.Transferred);
		expect(getMemberResponse.data.address).toEqual({});
		expect(getMemberResponse.data.fullName).toBe(input.fullName);
		expect(getMemberResponse.data.birthDate).toBe(input.birthDate);
		expect(getMemberResponse.data.celebrant).toBe(input.celebrant);
		expect(getMemberResponse.data.placeOfBirth).toBe(input.placeOfBirth);
		expect(getMemberResponse.data.maritalStatus).toBe(MaritalStatus.Single);
		expect(getMemberResponse.data.admissionType).toBe(MemberAdmissionType.Restoration);
		expect(getMemberResponse.data.classification).toBe(MemberClassification.Communicant);
		expect(getMemberResponse.data.levelOfEducation).toBe(LevelOfEducation.SpecialEducation);
		expect(getMemberResponse.data.religiousBackground).toBe('Batista');
		expect(getMemberResponse.data.wasBaptizedInInfancy).toBe(false);
	});

});
