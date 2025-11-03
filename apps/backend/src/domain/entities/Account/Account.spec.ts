import {Account, AccountBuilder} from "@/domain/entities/Account/Account";

import {cpfGenerator} from "@/infra/cpf-generator";

describe('Account', () => {

	it('should be able to create a new account', () => {
		const builder: AccountBuilder = {email: "johndoe@gmail.com", password: "P@ssw0rd", lastName: 'Doe', cpf: cpfGenerator(), firstName: 'John'};
		const account = Account.build(builder);
		expect(account.accountId).toBeDefined();
		expect(account.cpf).toBe(builder.cpf.replace(/\D/g, ''));
		expect(account.email).toBe(builder.email);
		expect(account.lastName).toBe(builder.lastName);
		expect(account.firstName).toBe(builder.firstName);
		expect(account.comparePassword(builder.password)).toBe(true);
	});

});
