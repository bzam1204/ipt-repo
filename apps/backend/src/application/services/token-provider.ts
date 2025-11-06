export interface TokenProvider {
	decode(token: string): TokenPayload;

	signAccessToken(payload: TokenPayload): string;

	signRefreshToken(payload: TokenPayload): string;

}

export type TokenPayload = {
	accountId: string;
	email: string;
}
