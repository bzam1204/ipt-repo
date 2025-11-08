import {Account, type AccountBuilder} from "@/domain/entities/Account/Account.ts";

import type {HttpClient} from "@/core/http/http-client";

export interface LoginInput {
	email: string;
	password: string;
}

export interface LoginOutput {
	accessToken: string;
	refreshToken: string;
}

export interface AuthGateway {
	login(input: LoginInput): Promise<LoginOutput>;

	createAccount(input: AccountBuilder): Promise<void>;
}

export class HttpAuthGateway implements AuthGateway {
	private readonly http: HttpClient;
	private readonly baseUrl = import.meta.env.VITE_API_BASE_URL;

	constructor(http: HttpClient) {
		this.http = http;
	};

	async createAccount(account: Account): Promise<void> {
		const url = this.baseUrl + "/account/create";
		const body: AccountBuilder = {cpf: account.cpf, email: account.email, password: account.password, lastName: account.lastName, firstName: account.firstName};
		await this.http.post<AccountBuilder, void>({url, body});
	};

	async login(input: LoginInput): Promise<LoginOutput> {
		const url = this.baseUrl + "/account/login";
		const output = await this.http.post<LoginInput, LoginOutput>({url, body: input});
		return output;
	};

}
