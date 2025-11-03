import 'dotenv/config';

import cors from 'cors';
import express from 'express';

import {CreateAccount} from "@/application/use-cases/CreateAccount/CreateAccount";

import {AccountRepository} from "@/infra/repositories/AccountRepository";
import {DatabaseConnectionAdapter} from "@/infra/database/DatabaseConnectionPostgres";

const app = express();
const port = process.env.PORT ?? 3001;

app.use(cors());
app.use(express.json());
const databaseConnection = new DatabaseConnectionAdapter();
const accountRepository = new AccountRepository(databaseConnection);
const createAccount = new CreateAccount(accountRepository);

app.post('/account/create', async (req, res) => {
	const output = await createAccount.execute(req.body);
	res.status(201).json(output);
});

app.listen(port, () => {
	console.log(`🚀 Servidor Express rodando na porta:${port}`);
});
