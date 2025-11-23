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
	| {success: true; data: {members: MemberRecord[]; meta: {total: number; page: number; perPage: number; totalPages: number}}}
	| {members: MemberRecord[]; meta?: {total: number; page?: number; perPage?: number; totalPages?: number}};

export type FetchMembersParams = {
	page?: number;
	perPage?: number;
	search?: string;
	status?: MemberStatus | MemberStatus[];
	sort?: string; // e.g. "fullName" or "-createdAt"
	createdAtGte?: string;
	createdAtLte?: string;
};

export interface MembersGateway {
	fetchMembers(params?: FetchMembersParams): Promise<{members: MemberRecord[]; meta: {total: number; page: number; perPage: number; totalPages: number}}>;
}

export class HttpMembersGateway implements MembersGateway {
	private readonly http: HttpClient;
	private readonly baseUrl = import.meta.env.VITE_API_BASE_URL;

	constructor(http: HttpClient) {
		this.http = http;
	}

	async fetchMembers(params?: FetchMembersParams): Promise<{members: MemberRecord[]; meta: {total: number; page: number; perPage: number; totalPages: number}}> {
		const searchParams = new URLSearchParams();
		if (params?.page) searchParams.set('page', String(params.page));
		if (params?.perPage) searchParams.set('perPage', String(params.perPage));
		if (params?.search) searchParams.set('search', params.search);
		if (params?.status) {
			const statusValue = Array.isArray(params.status) ? params.status.join(',') : params.status;
			searchParams.set('status', statusValue);
		}
		if (params?.sort) searchParams.set('sort', params.sort);
		if (params?.createdAtGte) searchParams.set('createdAt[gte]', params.createdAtGte);
		if (params?.createdAtLte) searchParams.set('createdAt[lte]', params.createdAtLte);
		const qs = searchParams.toString();
		const url = `${this.baseUrl}/membership/fetch-members${qs ? `?${qs}` : ''}`;
		const res = await this.http.get<FetchMembersResponse>({url});
		if (!res) return {members: [], meta: {total: 0, page: 1, perPage: params?.perPage ?? 0, totalPages: 0}};
		if ('success' in res) return {members: res.data.members, meta: res.data.meta};
		return {
			members: res.members,
			meta: {
				total: res.meta?.total ?? res.members.length,
				page: res.meta?.page ?? params?.page ?? 1,
				perPage: res.meta?.perPage ?? params?.perPage ?? res.members.length,
				totalPages: res.meta?.totalPages ?? 1,
			},
		};
	}
}
