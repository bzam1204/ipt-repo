import {TokenProvider} from "@/application/services/token-provider";

import {AccountRepository} from "@/infra/repositories/AccountRepository";

export class Login {

	constructor(
		private readonly accountRepo: AccountRepository,
		private readonly tokenProvider: TokenProvider,
	) {};

	async execute(input: Input): Promise<Output> {
		const account = await this.accountRepo.getByEmail(input.email);
		if (!account) throw new Error("Invalid credentials");
		const isValidPassword = account.comparePassword(input.password);
		if (!isValidPassword) throw new Error("Invalid credentials");
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
