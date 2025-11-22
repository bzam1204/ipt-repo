import {inject, injectable} from "tsyringe"

import DomainException from "@/domain/exceptions/DomainException";

import {AdmitMember, AdmitMemberToken} from "@/application/use-cases/AdmitMember/AdmitMember";

import {Get, Post} from "@/infra/decorators/route.decorator";
import {Controller} from "@/infra/decorators/controller.decorator";
import {Body, Query} from "@/infra/decorators/parameter.decorator";

@injectable()
@Controller('/membership')
export class MemberController {
	constructor(
		@inject(AdmitMemberToken) private readonly _admitMember: AdmitMember,
		@inject(AdmitMemberToken) private readonly _searchMembers: AdmitMember,
	) {};

	@Post('/admit-member')
	async createAccount(@Body() input: any, res: any) {
		try {
			const output = await this._admitMember.execute(input);
			res.status(204).json(output);
		} catch (e) {
			if (e instanceof DomainException) return res.status(422).json({message: e.message, cause: e.cause});
			if (e instanceof Error) return res.status(500).json({message: e.message, cause: e.cause});
		}
	};

	@Get('/search-members')
	async searchMembers(@Query() input: any, res: any) {
		try {
			const output = await this._searchMembers.execute(input);
			res.status(204).json(output);
		} catch (e) {
			if (e instanceof DomainException) return res.status(422).json({message: e.message, cause: e.cause});
			if (e instanceof Error) return res.status(500).json({message: e.message, cause: e.cause});
		}
	};

}
