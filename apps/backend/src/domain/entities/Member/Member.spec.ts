import {Sex} from "@/domain/enums/Sex";
import {MemberStatus} from "@/domain/enums/MemberStatus";
import {MaritalStatus} from "@/domain/enums/MaritalStatus";
import {MemberAdmissionType} from "@/domain/enums/MemberAdmitionType";
import {MemberClassification} from "@/domain/enums/MemberClassification";
import {LevelOfEducation} from "@/domain/enums/LevelOfEducation";
import {Member, MemberBuilder} from "@/domain/entities/Member/Member";


describe('Membro', () => {
	const builder: MemberBuilder = {
		sex: Sex.Male,
		cpf: '678.258.070-57',
		email: crypto.randomUUID() + "@gmail.com",
		phone: '95 99999-9999',
		status: MemberStatus.Transferred,
		address: {city: 'São Paulo', state: 'SP', street: 'Rua Principal', number: '123', zipCode: '12345-678', district: 'Centro'},
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
		professionOfFaithDate: '22-10-2007',
	};

	it('deve criar um membro', async () => {
		const member = Member.build(builder);
		expect(member.sex).toBe(builder.sex);
		expect(member.cpf).toBe('67825807057');
		expect(member.phone).toBe('(95) 99999-9999');
		expect(member.email).toBe(builder.email);
		expect(member.status).toBe(MemberStatus.Transferred);
		expect(member.fullName).toBe(builder.fullName);
		expect(member.birthdate).toStrictEqual(new Date('1987-10-22'));
		expect(member.celebrant).toBe(builder.celebrant);
		expect(member.placeOfBirth).toBe(builder.placeOfBirth);
		expect(member.maritalStatus).toBe(MaritalStatus.Single);
		expect(member.admissionType).toBe(MemberAdmissionType.Restoration);
		expect(member.classification).toBe(MemberClassification.Communicant);
		expect(member.levelOfEducation).toBe(LevelOfEducation.SpecialEducation);
		expect(member.religiousBackground).toBe('Batista');
		expect(member.wasBaptizedInInfancy).toBe(false);
		expect(member.address.city).toBe(builder.address.city);
		expect(member.address.state).toBe(builder.address.state);
		expect(member.address.street).toBe(builder.address.street);
		expect(member.address.number).toBe(builder.address.number);
		expect(member.address.zipCode).toBe(builder.address.zipCode);
		expect(member.address.district).toBe(builder.address.district);
		expect(member.address.complement).toBe(builder.address.complement);
	});
});