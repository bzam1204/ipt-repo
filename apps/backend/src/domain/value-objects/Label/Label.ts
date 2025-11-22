import DomainException from "@/domain/exceptions/DomainException";

export class Label {

	private readonly _value: string;

	 constructor(value: string) {
		if (!value || !value.trim()) throw new DomainException("Label não pode ser vazio");
		const clean = this.cleanLabel(value);
		if (clean.length < 3) throw new DomainException("Label deve conter pelo menos 3 letras");
		if (this.hasNoLetters(clean)) throw new DomainException("Label deve conter letras válidas");
		this._value = clean;
	}

	private cleanLabel(value: string): string {
		return value.replace(/\s+/g, " ").trim();
	}

	private hasNoLetters(value: string): boolean {
		const hasLetters = /[a-zA-Z]/.test(value);
		return !hasLetters;
	}

	get value(): string { return this._value; }

}
