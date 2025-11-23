export class HttpException extends Error {
	constructor(
		public readonly statusCode: number,
		message: string,
		public readonly cause?: string,
	) {
		super(message);
	}
}
