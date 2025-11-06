import { useMutation } from '@tanstack/react-query';
import { HttpAuthGateway, type LoginInput, type LoginOutput } from '@/gateways/auth-gateway';
import { FetchHttpClient } from '@/core/http/http-client';

const gateway = new HttpAuthGateway(new FetchHttpClient());

export function useLogin() {
  return useMutation<LoginOutput, Error, LoginInput>({
    mutationKey: ['auth', 'login'],
    mutationFn: async (input: LoginInput) => gateway.login(input),
  });
}

