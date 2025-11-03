import {Account} from "@/domain/entities/Account/Account";

import {AccountRepository} from "@/infra/repositories/AccountRepository";

export class CreateAccount {

	constructor(private readonly accountRepo: AccountRepository) {}

	async execute(input: Input): Promise<Output> {
		const emailExists = await this.accountRepo.getByEmail(input.email);
		if (emailExists) throw new Error("Email already exists");
		const cpfExists = await this.accountRepo.getByCpf(input.cpf);
		if (cpfExists) throw new Error("Cpf already exists");
		const account = Account.build(input);
		await this.accountRepo.save(account);
		const output: Output = {
			accountId: account.accountId,
			email: account.email
		};
		return output;
	}
}

interface Input {
	email: string;
	cpf: string;
	password: string;
	lastName: string;
	firstName: string;
}

interface Output {
	accountId: string;
	email: string;
}
