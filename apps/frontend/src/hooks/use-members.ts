import {useQuery} from '@tanstack/react-query';
import {FetchHttpClient} from '@/core/http/http-client';
import {HttpMembersGateway, type MemberRecord} from '@/gateways/members-gateway';
import type DomainException from '@/domain/exceptions/DomainException';

const gateway = new HttpMembersGateway(new FetchHttpClient());

export function useMembersList() {
	return useQuery<MemberRecord[], DomainException>({
		queryKey: ['members'],
		queryFn: () => gateway.fetchMembers(),
	});
}

export function useMember(memberId: string | undefined) {
	return useMembersList().data?.find((m) => m.memberId === memberId);
}
