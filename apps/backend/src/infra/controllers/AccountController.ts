import {inject, injectable} from "tsyringe"

import DomainException from "@/domain/exceptions/DomainException";

import {Login, LoginToken} from "@/application/use-cases/Login/Login";
import {CreateAccount, CreateAccountToken} from "@/application/use-cases/CreateAccount/CreateAccount";

import {Post} from "@/infra/decorators/route.decorator";
import {Body} from "@/infra/decorators/parameter.decorator";
import {Controller} from "@/infra/decorators/controller.decorator";

@injectable()
@Controller('/account')
export class AccountController {
	constructor(
		@inject(LoginToken) private readonly _login: Login,
		@inject(CreateAccountToken) private readonly _createAccount: CreateAccount,
	) {};

	@Post('/create')
	async createAccount(@Body() input: any, res: any) {
		try {
			const output = await this._createAccount.execute(input);
			res.status(204).json(output);
		} catch (e) {
			if (e instanceof DomainException) return res.status(422).json({message: e.message, cause: e.cause});
			if (e instanceof Error) return  res.status(500).json({message: e.message, cause: e.cause});
		}
	};

	@Post('/login')
	async login(@Body() input: any, res: any) {
		const output = await this._login.execute(input);
		return res.status(200).json(output);
	};

}