import {inject, injectable} from "tsyringe"

import {AdmitMember, AdmitMemberToken} from "@/application/use-cases/AdmitMember/AdmitMember";
import {FetchMembers, FetchMembersToken} from "@/application/use-cases/FetchMembers/FetchMembers";

import {Get, Post} from "@/infra/decorators/route.decorator";
import {Controller} from "@/infra/decorators/controller.decorator";
import {Body, Query} from "@/infra/decorators/parameter.decorator";
import {HttpStatus, HttpStatusCode} from "@/infra/decorators/http-status.decorator";

@injectable()
@Controller('/membership')
export class MemberController {
	constructor(
		@inject(AdmitMemberToken) private readonly _admitMember: AdmitMember,
		@inject(FetchMembersToken) private readonly _fetchMembers: FetchMembers,
	) {};

	@Post('/admit-member')
	@HttpStatus(HttpStatusCode.NO_CONTENT)
	async createAccount(@Body() input: any) {
		return await this._admitMember.execute(input);
	};

	@Get('/fetch-members')
	@HttpStatus(HttpStatusCode.OK)
	async searchMembers(@Query() input: any) {
		return await this._fetchMembers.execute(input);
	};

}
