import {useQuery} from '@tanstack/react-query';
import {FetchHttpClient} from '@/core/http/http-client';
import {HttpMembersGateway, type MemberRecord, type FetchMembersParams} from '@/gateways/members-gateway';
import type DomainException from '@/domain/exceptions/DomainException';

const gateway = new HttpMembersGateway(new FetchHttpClient());

export function useMembersList(params: FetchMembersParams = {page: 1, perPage: 20}) {
	return useQuery<{members: MemberRecord[]; meta: {total: number; page: number; perPage: number; totalPages: number}}, DomainException>({
		queryKey: ['members', params],
		queryFn: () => gateway.fetchMembers(params),
	});
}

export function useMember(memberId: string | undefined) {
	const {data} = useMembersList({page: 1, perPage: 200});
	return data?.members.find((m: MemberRecord) => m.memberId === memberId);
}
