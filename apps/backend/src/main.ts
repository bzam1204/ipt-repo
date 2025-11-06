import 'dotenv/config';

import cors from 'cors';
import express from 'express';

import {Login} from "@/application/use-cases/Login/Login";
import {CreateAccount} from "@/application/use-cases/CreateAccount/CreateAccount";

import {JwtAdapter} from "@/infra/JwtAdapter";
import {AccountRepository} from "@/infra/repositories/AccountRepository";
import {DatabaseConnectionAdapter} from "@/infra/database/DatabaseConnectionPostgres";
import DomainException from "@/domain/exceptions/DomainException";

const app = express();
const port = process.env.PORT ?? 3001;

app.use(cors());
app.use(express.json());
const databaseConnection = new DatabaseConnectionAdapter();
const accountRepository = new AccountRepository(databaseConnection);
const tokenProvider = new JwtAdapter();
const login = new Login(accountRepository, tokenProvider);
const createAccount = new CreateAccount(accountRepository);

app.post('/account/create', async (req, res) => {
	try {
		const output = await createAccount.execute(req.body);
		res.status(204).json(output);
	} catch (e) {
		if (e instanceof DomainException) res.status(422).json({message: e.message, cause: e.cause});
		if (e instanceof Error) res.status(500).json({message: e.message, cause: e.cause});
	}
});

app.post('/account/login', async (req, res) => {
	const output = await login.execute(req.body);
	res.status(200).json(output);
});

app.listen(port, () => {
	console.log(`🚀 Servidor Express rodando na porta:${port}`);
});
