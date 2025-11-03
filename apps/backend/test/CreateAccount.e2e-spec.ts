import {axios} from "../src/infra/AxiosAdapter";
import {cpfGenerator} from "../src/infra/cpf-generator";

describe('Account', () => {

	it('should create a new account', async () => {
		const input = {cpf: cpfGenerator(), email: crypto.randomUUID() + "johndoe@gmail.com", password: "P@ssw0rd", lastName: 'Doe', firstName: 'John'};
		const response = await axios.post('account/create', input);
		expect(response.status).toBe(204);
	});

});
