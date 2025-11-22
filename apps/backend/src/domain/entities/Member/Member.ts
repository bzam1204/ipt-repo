import {Sex} from "@/domain/enums/Sex";
import {Cpf} from "@/domain/value-objects/Cpf/Cpf";
import {UUID} from "@/domain/value-objects/UUID/UUID";
import {Label} from "@/domain/value-objects/Label/Label";
import {Email} from "@/domain/value-objects/Email/Email";
import Birthdate from "@/domain/value-objects/birthdate/birthdate";
import {FullName} from "@/domain/value-objects/FullName/FullName";
import {PhoneNumber} from "@/domain/value-objects/PhoneNumber/PhoneNumber";
import {MemberStatus} from "@/domain/enums/MemberStatus";
import {MaritalStatus} from "@/domain/enums/MaritalStatus";
import {LevelOfEducation} from "@/domain/enums/LevelOfEducation";
import {MemberAdmissionType} from "@/domain/enums/MemberAdmitionType";
import {MemberClassification} from "@/domain/enums/MemberClassification";
import {Address, AddressBuilder} from "@/domain/value-objects/address/address";

export class Member {
	private readonly _memberId: UUID;
	private readonly _sex: Sex;
	private readonly _cpf: Cpf;
	private readonly _email: Email;
	private readonly _phone: PhoneNumber;
	private readonly _status: MemberStatus;
	private readonly _address: Address;
	private readonly _fullName: FullName;
	private readonly _birthdate: Birthdate;
	private readonly _celebrant: FullName;
	private readonly _placeOfBirth: Label;
	private readonly _maritalStatus: MaritalStatus;
	private readonly _admissionType: MemberAdmissionType;
	private readonly _classification: MemberClassification;
	private readonly _levelOfEducation: LevelOfEducation;
	private readonly _religiousBackground: Label;
	private readonly _wasBaptizedInInfancy: boolean;
	private readonly _professionOfFaithDate: Date;

	constructor(memberId: string, sex: Sex, cpf: string, email: string, phone: string, status: MemberStatus, address: AddressBuilder, fullName: string, birthdate: string, celebrant: string, placeOfBirth: string, maritalStatus: MaritalStatus, admissionType: MemberAdmissionType, classification: MemberClassification, levelOfEducation: LevelOfEducation, religiousBackground: string, wasBaptizedInInfancy: boolean, professionOfFaithDate: string) {
		this._memberId = new UUID(memberId);
		this._sex = sex;
		this._cpf = new Cpf(cpf);
		this._email = new Email(email);
		this._phone = new PhoneNumber(phone);
		this._status = status;
		this._address = Address.build(address);
		this._fullName = new FullName(fullName);
		this._birthdate = new Birthdate(birthdate);
		this._celebrant = new FullName(celebrant);
		this._placeOfBirth = new Label(placeOfBirth);
		this._maritalStatus = maritalStatus;
		this._admissionType = admissionType;
		this._classification = classification;
		this._levelOfEducation = levelOfEducation;
		this._religiousBackground = new Label(religiousBackground);
		this._wasBaptizedInInfancy = wasBaptizedInInfancy;
		this._professionOfFaithDate = new Date(professionOfFaithDate);
	}

	static create(sex: Sex, cpf: string, email: string, phone: string, status: MemberStatus, address: AddressBuilder, fullName: string, birthdate: string, celebrant: string, placeOfBirth: string, maritalStatus: MaritalStatus, admissionType: MemberAdmissionType, classification: MemberClassification, levelOfEducation: LevelOfEducation, religiousBackground: string, wasBaptizedInInfancy: boolean, professionOfFaithDate: string) {
		const memberId = UUID.create().value;
		return new Member(memberId, sex, cpf, email, phone, status, address, fullName, birthdate, celebrant, placeOfBirth, maritalStatus, admissionType, classification, levelOfEducation, religiousBackground, wasBaptizedInInfancy, professionOfFaithDate);
	};

	static build(builder: MemberBuilder): Member {
		const b = builder;
		return Member.create(b.sex, b.cpf, b.email, b.phone, b.status, b.address, b.fullName, b.birthdate, b.celebrant, b.placeOfBirth, b.maritalStatus, b.admissionType, b.classification, b.levelOfEducation, b.religiousBackground, b.wasBaptizedInInfancy, b.professionOfFaithDate);
	}
	
	get memberId(): string { return this._memberId.value; }
	get sex(): Sex { return this._sex; }
	get cpf(): string { return this._cpf.value; }
	get email(): string { return this._email.value; }
	get phone(): string { return this._phone.value; }
	get status(): MemberStatus { return this._status; }
	get address(): Address { return this._address; }
	get fullName(): string { return this._fullName.value; }
	get birthdate(): Date { return this._birthdate.value; }
	get celebrant(): string { return this._celebrant.value; }
	get placeOfBirth(): string { return this._placeOfBirth.value; }
	get maritalStatus(): MaritalStatus { return this._maritalStatus; }
	get admissionType(): MemberAdmissionType { return this._admissionType; }
	get classification(): MemberClassification { return this._classification; }
	get levelOfEducation(): LevelOfEducation { return this._levelOfEducation; }
	get religiousBackground(): string { return this._religiousBackground.value; }
	get wasBaptizedInInfancy(): boolean { return this._wasBaptizedInInfancy; }
	get professionOfFaithDate(): Date { return this._professionOfFaithDate; }

}

export interface MemberBuilder {
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