import 'reflect-metadata';
import 'dotenv/config';

import {AccountController} from "@/infra/controllers/AccountController";
import {MemberController} from "@/infra/controllers/MemberController";

import {ExpressAdapter} from "@/ExpressAdapter";

const app = new ExpressAdapter();
const port = Number(process.env.PORT) ?? 3001;

app.registerControllers([AccountController, MemberController]);

app.listen(port, () => {
	console.log(`🚀 Servidor Express rodando na porta:${port}`);
});
