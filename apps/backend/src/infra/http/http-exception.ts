export class HttpException extends Error {
	constructor(
		public readonly statusCode: number,
		message: string,
		public readonly cause?: string,
		stack?: string,
	) {
		super(message);
		this.name = 'HttpException';
		if (stack) this.stack = stack;
	}
}
