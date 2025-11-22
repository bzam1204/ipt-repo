import "reflect-metadata";
import {Sex} from "@/domain/enums/Sex";
import {MemberStatus} from "@/domain/enums/MemberStatus";
import {MaritalStatus} from "@/domain/enums/MaritalStatus";
import {MemberAdmissionType} from "@/domain/enums/MemberAdmitionType";
import {MemberClassification} from "@/domain/enums/MemberClassification";
import {LevelOfEducation} from "@/domain/enums/LevelOfEducation";
import {AdmitMember} from "@/application/use-cases/AdmitMember/AdmitMember";
import {stub} from "sinon";
import DomainException from "@/domain/exceptions/DomainException";

describe('Admitir Membro', () => {
	const input = {
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
	let admitMember: AdmitMember;
	const memberRepoStub = {existsByCpf: () => false, existsByEmail: () => false, save: jest.fn} as any;

	beforeEach(() => {
		 admitMember = new AdmitMember(memberRepoStub);
	});

	it('deve admitir um membro', async () => {
		 await expect(admitMember.execute(input)).resolves.not.toThrow();
	});

	it('não deve admitir um membro já cadastrado por cpf', async () => {
		const repoStub = stub(memberRepoStub, 'existsByCpf').resolves(true);
		await expect(() => admitMember.execute(input)).rejects.toThrow(new DomainException('Parâmetros inválidos', 'Membro com este cpf já cadastrado'));
		repoStub.restore();
	});

	it('não deve admitir um membro já cadastrado por email', async () => {
		const repoStub = stub(memberRepoStub, 'existsByEmail').resolves(true);
		await expect(() => admitMember.execute(input)).rejects.toThrow(new DomainException('Parâmetros inválidos', 'Membro com este email já cadastrado'));
		repoStub.restore();
	});

});
