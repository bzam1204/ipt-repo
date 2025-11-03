export class ErrorCodes<T> {
	readonly message: string;
	private readonly causes: Record<string, string>;

	constructor(message: string, causes: Record<string, string>) {
		this.message = message;
		this.causes = causes;
	}

	pickCause(cause: T) {
		return this.causes[cause as string];
	}

	getValues(cause: T) {
		return [this.message, this.causes[cause as string]] as const;
	}
}
