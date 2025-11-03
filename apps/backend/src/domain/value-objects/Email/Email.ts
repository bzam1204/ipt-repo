export class Email {
	private readonly regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	constructor(private readonly _value: string) {
		if (!this._value) throw new Error("Email is required");
		if (!this._value.match(this.regex)) throw new Error("Invalid Email");
	}

	static create(value: string): Email {
		const output = new Email(value);
		return output;
	}

	get value(): string { return this._value; }
}
