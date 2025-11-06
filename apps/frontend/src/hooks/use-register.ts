import { useMutation } from '@tanstack/react-query';
import { HttpAuthGateway, type CreateAccountInput } from '@/gateways/auth-gateway';
import { FetchHttpClient } from '@/core/http/http-client';

const gateway = new HttpAuthGateway(new FetchHttpClient());

export function useRegisterAccount() {
  return useMutation({
    mutationKey: ['auth', 'register'],
    mutationFn: async (input: CreateAccountInput) => gateway.createAccount(input),
  });
}
