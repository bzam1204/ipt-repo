import {Login} from "@/application/use-cases/Login/Login";

export interface TokenProvider {
	decode(token: string): TokenPayload;

	signAccessToken(payload: TokenPayload): string;

	signRefreshToken(payload: TokenPayload): string;

}

export type TokenPayload = {
	accountId: string;
	email: string;
}

export const TokenProviderToken = Symbol('TokenProvider');
