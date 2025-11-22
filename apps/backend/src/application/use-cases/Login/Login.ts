import {inject, injectable} from "tsyringe";

import {TokenProvider, TokenProviderToken} from "@/application/services/token-provider";

import {AccountRepository, AccountRepositoryToken} from "@/infra/repositories/AccountRepository";

@injectable()
export class Login {

	constructor(
		@inject(AccountRepositoryToken)private readonly accountRepo: AccountRepository,
		@inject(TokenProviderToken) private readonly tokenProvider: TokenProvider,
	) {};

	async execute(input: Input): Promise<Output> {
		const account = await this.accountRepo.getByEmail(input.email);
		if (!account) throw new Error("Credenciais Inválidas");
		const isValidPassword = account.comparePassword(input.password);
		if (!isValidPassword) throw new Error("Credenciais Inválidas");
		const payload = {accountId: account.accountId, email: account.email};
		const accessToken = this.tokenProvider.signAccessToken(payload);
		const refreshToken = this.tokenProvider.signRefreshToken(payload);
		const output: Output = {accessToken, refreshToken};
		return output;
	};

}

interface Input {
	email: string;
	password: string;
}

interface Output {
	accessToken: string;
	refreshToken: string;
}

export const LoginToken = Symbol(Login.name);