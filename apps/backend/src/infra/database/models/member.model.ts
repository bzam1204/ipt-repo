import {Sex} from "@/domain/enums/Sex";
import {MemberStatus} from "@/domain/enums/MemberStatus";
import {AddressBuilder} from "@/domain/value-objects/address/address";
import {MaritalStatus} from "@/domain/enums/MaritalStatus";
import {MemberAdmissionType} from "@/domain/enums/MemberAdmitionType";
import {MemberClassification} from "@/domain/enums/MemberClassification";
import {LevelOfEducation} from "@/domain/enums/LevelOfEducation";

export interface MemberModel {
	member_id: string;
	sex: Sex;
	cpf: string;
	email: string;
	phone: string;
	status: MemberStatus;
	address: AddressBuilder;
	full_name: string;
	birthdate: string;
	celebrant: string;
	place_of_birth: string;
	marital_status: MaritalStatus;
	admission_type: MemberAdmissionType;
	classification: MemberClassification;
	level_of_education: LevelOfEducation;
	religious_background: string;
	was_baptized_in_infancy: boolean;
	profession_of_faith_date: string;
	city: string;
	state: string;
	street: string;
	number: string;
	district: string;
	zip_code: string;
	complement?: string;
	created_at: Date;
}
