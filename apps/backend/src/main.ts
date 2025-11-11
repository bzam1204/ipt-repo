import 'dotenv/config';

import DomainException from "@/domain/exceptions/DomainException";

import {Login} from "@/application/use-cases/Login/Login";
import {CreateAccount} from "@/application/use-cases/CreateAccount/CreateAccount";

import {JwtAdapter} from "@/infra/JwtAdapter";
import {AccountRepository} from "@/infra/repositories/AccountRepository";
import {DatabaseConnectionAdapter} from "@/infra/database/DatabaseConnectionPostgres";

import {ExpressAdapter} from "@/ExpressAdapter";

const app = new ExpressAdapter();
const port = Number(process.env.PORT) ?? 3001;

const databaseConnection = new DatabaseConnectionAdapter();
const accountRepository = new AccountRepository(databaseConnection);
const tokenProvider = new JwtAdapter();
const login = new Login(accountRepository, tokenProvider);
const createAccount = new CreateAccount(accountRepository);

app.createRoute('post', '/account/create', async (req:any, res:any) => {
	try {
		const output = await createAccount.execute(req.body);
		res.status(204).json(output);
	} catch (e) {
		if (e instanceof DomainException) res.status(422).json({message: e.message, cause: e.cause});
		if (e instanceof Error) res.status(500).json({message: e.message, cause: e.cause});
	}
});

app.createRoute('post', '/account/login', async (req:any, res:any) => {
	const output = await login.execute(req.body);
	res.status(200).json(output);
});

app.listen(port, () => {
	console.log(`🚀 Servidor Express rodando na porta:${port}`);
});
