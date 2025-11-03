import {randomUUID} from "crypto";

import {AccountRepository} from "@/infra/repositories/AccountRepository";

export class Login {

	constructor(private readonly accountRepo: AccountRepository) {}

	async execute(input: Input): Promise<Output> {
		const account = await this.accountRepo.getByEmail(input.email);
		if (!account) throw new Error("Invalid credentials");
		const isValidPassword = account.comparePassword(input.password);
		if (!isValidPassword) throw new Error("Invalid credentials");
		const output: Output = {accessToken: randomUUID(), refreshToken: randomUUID(),};
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
