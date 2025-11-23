import type {HttpClient} from '@/core/http/http-client';
import {MemberAdmissionType} from '@/domain/enums/MemberAdmissionType';
import {LevelOfEducation} from '@/domain/enums/LevelOfEducation';
import {MemberClassification} from '@/domain/enums/MemberClassification';
import {MemberStatus} from '@/domain/enums/MemberStatus';

export type MemberRecord = {
	memberId: string;
	cpf: string;
	email: string;
	phone: string;
	status: MemberStatus;
	fullName: string;
	admissionType: MemberAdmissionType;
	classification: MemberClassification;
	levelOfEducation: LevelOfEducation;
	birthdate: string;
	address: {
		city: string;
		state: string;
		street: string;
		number: string;
		zipCode: string;
		district: string;
		complement?: string;
	};
};

type FetchMembersResponse =
	| {success: true; data: {members: MemberRecord[]}}
	| {members: MemberRecord[]};

export interface MembersGateway {
	fetchMembers(params?: {limit?: number; offset?: number}): Promise<MemberRecord[]>;
}

export class HttpMembersGateway implements MembersGateway {
	private readonly http: HttpClient;
	private readonly baseUrl = import.meta.env.VITE_API_BASE_URL;

	constructor(http: HttpClient) {
		this.http = http;
	}

	async fetchMembers(params?: {limit?: number; offset?: number}): Promise<MemberRecord[]> {
		const searchParams = new URLSearchParams();
		if (params?.limit) searchParams.set('limit', String(params.limit));
		if (params?.offset) searchParams.set('offset', String(params.offset));
		const qs = searchParams.toString();
		const url = `${this.baseUrl}/membership/fetch-members${qs ? `?${qs}` : ''}`;
		const res = await this.http.get<FetchMembersResponse>({url});
		if (!res) return [];
		if ('success' in res) return res.data.members;
		return res.members;
	}
}
