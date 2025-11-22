import jwtLib from 'jsonwebtoken';

import {TokenPayload, TokenProvider} from "@/application/services/token-provider";
import {injectable} from "tsyringe";

@injectable()
export class JwtAdapter implements TokenProvider {
	private readonly _jwt = jwtLib;
	private readonly accessSecret = process.env.JWT_ACCESS_SECRET ?? "access-secret";
	private readonly refreshSecret = process.env.JWT_REFRESH_SECRET ?? "refresh-secret";

	decode(token: string): TokenPayload {
		const decoded = this._jwt.decode(token);
		return decoded as TokenPayload;
	};

	signAccessToken(payload: any): string {
		return this._jwt.sign(payload, this.accessSecret, {expiresIn: '1h'});
	};

	signRefreshToken(payload: any): string {
		return this._jwt.sign(payload, this.refreshSecret, {expiresIn: '7d'});
	};

}
