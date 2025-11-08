import {axios} from "../src/infra/AxiosAdapter";
import {cpfGenerator} from "../src/infra/cpf-generator";
import {AccountBuilder} from "../src/domain/entities/Account/Account";

describe('Login', () => {
	const accountBuilder: AccountBuilder = {cpf: cpfGenerator(), email: crypto.randomUUID() + "johndoe@gmail.com", password: "P@ssw0rd", lastName: 'Doe', firstName: 'John'};

	beforeEach(async () => {
		const response = await axios.post('account/create', accountBuilder);
		expect(response.status).toBe(204);
	});

	const loginEndpoint = 'account/login';

	it('should authenticate with valid credentials', async () => {
		const payload = {email: accountBuilder.email, password: accountBuilder.password};
		const response = await axios.post(loginEndpoint, payload);
		expect(response.status).toBe(200);
		expect(response.data.accessToken).toBeDefined();
		expect(response.data.refreshToken).toBeDefined();
	});

});
