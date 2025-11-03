import {Cpf} from "@/domain/value-objects/Cpf/Cpf";
import {UUID} from "@/domain/value-objects/UUID/UUID";
import {Email} from "@/domain/value-objects/Email/Email";
import {Password} from "@/domain/value-objects/Password/Password";

export class Account {
	constructor(
		private readonly _accountId: UUID,
		private readonly _cpf: Cpf,
		private readonly _email: Email,
		private readonly _password: Password,
		private readonly _lastName: string,
		private readonly _firstName: string,
	) {};

	static create(email: string, password: string, cpf: string, lastName: string, firstName: string): Account {
		const output = new Account(UUID.create(), Cpf.create(cpf), Email.create(email), Password.create(password), lastName, firstName);
		return output;
	};

	static build(builder: AccountBuilder): Account {
		const output = Account.create(builder.email, builder.password, builder.cpf, builder.lastName, builder.firstName);
		return output;
	};

	public comparePassword(password: string): boolean {
		return this._password.compare(password);
	};

	get accountId(): string { return this._accountId.value; }

	get cpf(): string { return this._cpf.value; }

	get email(): string { return this._email.value; }

	get password(): string { return this._password.value; }

	get lastName(): string { return this._lastName; }

	get firstName(): string { return this._firstName; }

}

export interface AccountBuilder {
	cpf: string,
	email: string,
	password: string,
	lastName: string,
	firstName: string
}
