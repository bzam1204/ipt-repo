import "reflect-metadata";
import {Login} from "@/application/use-cases/Login/Login";

import {AccountRepository} from "@/infra/repositories/AccountRepository";
import {TokenProvider} from "@/application/services/token-provider";

describe('Login', () => {
	const makeRepositoryStub = () => {
		const getByEmail = jest.fn();
		const getByCpf = jest.fn();
		const save = jest.fn();
		const repository = {
			getByEmail,
			getByCpf,
			save,
		} as unknown as AccountRepository;
		return {repository, getByEmail};
	};

	const makeTokenProviderStub = () => ({
		signAccessToken: jest.fn().mockReturnValue('access-token'),
		signRefreshToken: jest.fn().mockReturnValue('refresh-token'),
	}) as unknown as TokenProvider;

	it('should authenticate when credentials are valid', async () => {
		const {repository, getByEmail} = makeRepositoryStub();
		const comparePassword = jest.fn().mockReturnValue(true);
		getByEmail.mockResolvedValue({comparePassword});
		const login = new Login(repository, makeTokenProviderStub());
		const input = {email: 'john.doe@example.com', password: 'P@ssw0rd'};
		const output = await login.execute(input);
		expect(output.accessToken).toBeDefined();
		expect(output.refreshToken).toBeDefined();
		expect(comparePassword).toHaveBeenCalledWith(input.password);
	});

	it('should not authenticate when account does not exist', async () => {
		const {repository, getByEmail} = makeRepositoryStub();
		getByEmail.mockResolvedValue(null);
		const login = new Login(repository, makeTokenProviderStub());
		await expect(login.execute({email: 'john.doe@example.com', password: 'P@ssw0rd'})).rejects.toThrow('Credenciais Inválidas');
	});

	it('should not authenticate when password is invalid', async () => {
		const {repository, getByEmail} = makeRepositoryStub();
		const comparePassword = jest.fn().mockReturnValue(false);
		getByEmail.mockResolvedValue({comparePassword});
		const login = new Login(repository, makeTokenProviderStub());
		await expect(login.execute({email: 'john.doe@example.com', password: 'wrong'})).rejects.toThrow('Credenciais Inválidas');
	});
});
