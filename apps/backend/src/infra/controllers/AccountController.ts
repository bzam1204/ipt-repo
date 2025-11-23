import {inject, injectable} from "tsyringe"

import {Login, LoginToken} from "@/application/use-cases/Login/Login";
import {CreateAccount, CreateAccountToken} from "@/application/use-cases/CreateAccount/CreateAccount";

import {Post} from "@/infra/decorators/route.decorator";
import {Body} from "@/infra/decorators/parameter.decorator";
import {Controller} from "@/infra/decorators/controller.decorator";
import {HttpStatus, HttpStatusCode} from "@/infra/decorators/http-status.decorator";

@injectable()
@Controller('/account')
export class AccountController {
	constructor(
		@inject(LoginToken) private readonly _login: Login,
		@inject(CreateAccountToken) private readonly _createAccount: CreateAccount,
	) {};

	@Post('/create')
	@HttpStatus(HttpStatusCode.NO_CONTENT)
	async createAccount(@Body() input: any) {
		return await this._createAccount.execute(input);
	};

	@Post('/login')
	@HttpStatus(HttpStatusCode.OK)
	async login(@Body() input: any) {
		return await this._login.execute(input);
	};

}
