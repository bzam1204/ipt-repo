import {stub} from 'sinon';

import {Account} from "@/domain/entities/Account/Account";

import {CreateAccount} from "@/application/use-cases/CreateAccount/CreateAccount";

import {cpfGenerator} from "@/infra/cpf-generator";
import {AccountRepository} from "@/infra/repositories/AccountRepository";

describe('Create Account', () => {
	const accountRepositoryStub = {
		save: jest.fn().mockResolvedValue(undefined),
		getByEmail: jest.fn().mockResolvedValue(null),
		getByCpf: jest.fn().mockResolvedValue(null),
	} as unknown as AccountRepository;
	const createAccount = new CreateAccount(accountRepositoryStub);

	it('should be able to create a new account', async () => {
		const input = {email: "johndoe@gmail.com", password: "P@ssw0rd", lastName: 'Doe', cpf: cpfGenerator(), firstName: 'John'};
		const output = await createAccount.execute(input);
		expect(output).toBe(void 0);
	});

	it('should not create an account if the given Email already exists', async () => {
		const repoStub = stub(accountRepositoryStub, 'getByEmail').resolves({} as Account);
		const input = {email: "johndoe@gmail.com", password: "123", lastName: 'Doe', cpf: '123', firstName: 'John'};
		const createAccount = new CreateAccount(accountRepositoryStub);
		await expect(createAccount.execute(input)).rejects.toThrow("Email already exists")
		repoStub.restore();
	});

	it('should not create an account if the given cpf already exists', async () => {
		const repoStub = stub(accountRepositoryStub, 'getByCpf').resolves({} as Account);
		const input = {email: "johndoe@gmail.com", password: "123", lastName: 'Doe', cpf: '123', firstName: 'John'};
		await expect(createAccount.execute(input)).rejects.toThrow("Cpf already exists")
		repoStub.restore();
	});

});
