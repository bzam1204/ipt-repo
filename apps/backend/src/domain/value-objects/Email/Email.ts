export class Email {
	private readonly regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	constructor(private readonly _value: string) {
		if (!this._value) throw new Error("E-mail é obrigatório");
		if (!this._value.match(this.regex)) throw new Error("E-mail inválido");
	};

	get value(): string { return this._value; }
}
