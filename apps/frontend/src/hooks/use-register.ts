import {useMutation} from '@tanstack/react-query';

import {Account, type AccountBuilder} from "@/domain/entities/Account/Account.ts";

import {FetchHttpClient} from '@/core/http/http-client';

import {HttpAuthGateway} from '@/gateways/auth-gateway';
import type DomainException from "@/domain/exceptions/DomainException.ts";

const gateway = new HttpAuthGateway(new FetchHttpClient());

export function useRegisterAccount() {
	const mutationKey = ['auth', 'register'];
	const mutationFn = (input: AccountBuilder) => {
		const account = Account.build(input);
		const output = gateway.createAccount(account);
		return output;
	};
	const output = useMutation<void, DomainException, AccountBuilder>({mutationKey, mutationFn,});
	return output;
}
