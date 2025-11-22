import {Account} from "@/domain/entities/Account/Account";

import {AccountModel} from "@/infra/database/models/account.model";
import {DatabaseConnectionAdapter, DatabaseConnectionAdapterToken} from "@/infra/database/DatabaseConnectionAdapter";
import {inject, injectable} from "tsyringe";

@injectable()
export class AccountRepository {

	constructor(@inject(DatabaseConnectionAdapterToken) private readonly db: DatabaseConnectionAdapter) { }

	async getByEmail(email: string): Promise<Account | null> {
		const query = "SELECT account_id, cpf, email, password, last_name, first_name FROM ipt.accounts WHERE email = $1";
		const params = [email];
		const result = await this.db.query<DatabaseQueryResult<AccountModel>>(query, params);
		if (result.length === 0) return null;
		const [model] = result;
		const output = new Account(model.account_id, model.email, model.password, model.cpf, model.last_name, model.first_name);
		return output;
	};

	async getByCpf(cpf: string): Promise<Account | null> {
		const query = "SELECT account_id, cpf, email, password, last_name, first_name FROM ipt.accounts WHERE cpf = $1";
		const params = [cpf];
		const result = await this.db.query<DatabaseQueryResult<AccountModel>>(query, params);
		if (result.length === 0) return null;
		const [model] = result;
		const output = new Account(model.account_id, model.email, model.password, model.cpf, model.last_name, model.first_name);
		return output;
	};

	async save(account: Account): Promise<void> {
		const query = "INSERT INTO ipt.accounts (account_id, Email, Password, last_name, cpf, first_name) VALUES ($1, $2, $3, $4, $5, $6)";
		const a = account;
		const params = [a.accountId, a.email, a.password, a.lastName, a.cpf, a.firstName];
		await this.db.query(query, params);
	};

}

export type DatabaseQueryResult<T> = Array<T>;
export const AccountRepositoryToken = Symbol('AccountRepository');