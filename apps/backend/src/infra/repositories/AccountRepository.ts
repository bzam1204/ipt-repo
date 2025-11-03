import {Account, AccountBuilder} from "@/domain/entities/Account/Account";

import {AccountModel} from "@/infra/database/models/account.model";
import {DatabaseConnectionAdapter} from "@/infra/database/DatabaseConnectionPostgres";

export class AccountRepository {

	constructor(private readonly db: DatabaseConnectionAdapter) { }

	async getByEmail(email: string): Promise<Account | null> {
		const query = "SELECT FROM ipt.ipt.accounts WHERE Email = $1"
		const params = [email];
		const result = await this.db.query<DatabaseQueryResult<AccountModel>>(query, params);
		if (result.length === 0) return null;
		const [model] = result;
		const builder: AccountBuilder = {email: model.email, password: model.password, cpf: model.cpf, lastName: model.last_name, firstName: model.first_name};
		const output = Account.build(builder);
		return output;
	};

	async getByCpf(cpf: string): Promise<Account | null> {
		const query = "SELECT cpf, email,password, last_name, first_name  FROM ipt.ipt.accounts WHERE cpf = $1"
		const params = [cpf];
		const result = await this.db.query<DatabaseQueryResult<AccountModel>>(query, params);
		if (result.length === 0) return null;
		const [model] = result;
		const builder: AccountBuilder = {email: model.email, password: model.password, cpf: model.cpf, lastName: model.last_name, firstName: model.first_name};
		const output = Account.build(builder);
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
