export default class DomainException extends Error {
	readonly cause?: string;

	constructor(message: string, cause?: string) {
		super(message);
		this.cause = cause;
	}
}