import {axios} from "../src/infra/AxiosAdapter";
import {cpfGenerator} from "../src/infra/cpf-generator";

describe('Login', () => {
	const input = {cpf: cpfGenerator(), email: crypto.randomUUID() + "johndoe@gmail.com", password: "P@ssw0rd", lastName: 'Doe', firstName: 'John'};

	beforeEach(async () => {
		const response = await axios.post('account/create', input);
		expect(response.status).toBe(201);
	});

	//todo: analyse the application defaults and standards and make that test pass
	it('should login', async () => {
		const payload = {email: input.email, password: input.password};
		const response = await axios.post('login', input);
		expect(response.status).toBe(200);
		expect(response.data.accessToken).toBeDefined();
		expect(response.data.refreshToken).toBeDefined();
	});

});
