import {inject, injectable} from "tsyringe";

import {Sex} from "@/domain/enums/Sex";
import {Member} from "@/domain/entities/Member/Member";
import {MemberStatus} from "@/domain/enums/MemberStatus";
import DomainException from "@/domain/exceptions/DomainException";
import {MaritalStatus} from "@/domain/enums/MaritalStatus";
import {AddressBuilder} from "@/domain/value-objects/address/address";
import {LevelOfEducation} from "@/domain/enums/LevelOfEducation";
import {MemberAdmissionType} from "@/domain/enums/MemberAdmitionType";
import {MemberClassification} from "@/domain/enums/MemberClassification";

import {MemberRepository, MemberRepositoryToken} from "@/infra/repositories/MemberRepository";

@injectable()
export class AdmitMember {

	constructor(@inject(MemberRepositoryToken) private readonly memberRepo: MemberRepository) { }

	async execute(input: Input): Promise<void> {
		const existsByCpf = await this.memberRepo.existsByCpf(input.cpf);
		if (existsByCpf) throw new DomainException('Parâmetros inválidos', 'Membro com este cpf já cadastrado');
		const existsByEmail = await this.memberRepo.existsByEmail(input.email);
		if (existsByEmail) throw new DomainException('Parâmetros inválidos', 'Membro com este email já cadastrado');
		const member = Member.build(input);
		await this.memberRepo.save(member);
	};

}

interface Input {
	sex: Sex;
	cpf: string;
	email: string;
	phone: string;
	status: MemberStatus;
	address: AddressBuilder;
	fullName: string;
	birthdate: string;
	celebrant: string;
	placeOfBirth: string;
	maritalStatus: MaritalStatus;
	admissionType: MemberAdmissionType;
	classification: MemberClassification;
	levelOfEducation: LevelOfEducation;
	religiousBackground: string;
	wasBaptizedInInfancy: boolean;
	professionOfFaithDate: string;
}

export const AdmitMemberToken = Symbol(AdmitMember.name);