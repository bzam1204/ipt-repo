import {inject, injectable} from "tsyringe";

import {Account} from "@/domain/entities/Account/Account";
import DomainException from "@/domain/exceptions/DomainException";

import {AccountRepository, AccountRepositoryToken} from "@/infra/repositories/AccountRepository";

@injectable()
export class CreateAccount {

	constructor(@inject(AccountRepositoryToken)private readonly accountRepo: AccountRepository) {}

	async execute(input: Input): Promise<void> {
		const emailExists = await this.accountRepo.getByEmail(input.email);
		if (emailExists) throw new DomainException("Parâmetros inválidos", "E-mail já cadastrado");
		const cpfExists = await this.accountRepo.getByCpf(input.cpf);
		if (cpfExists) throw new DomainException('Parâmetros inválidos', "CPF já cadastrado");
		const account = Account.build(input);
		await this.accountRepo.save(account);
	}
}

interface Input {
	email: string;
	cpf: string;
	password: string;
	lastName: string;
	firstName: string;
}

export const CreateAccountToken = Symbol(CreateAccount.name);