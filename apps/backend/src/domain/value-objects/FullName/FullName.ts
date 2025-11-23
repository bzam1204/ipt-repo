import DomainException from "@/domain/exceptions/DomainException";

export class FullName {

	constructor(private readonly _value: string) {
		if (!_value) throw new DomainException("Nome é obrigatório");
		const cleanName = this.cleanName(_value);
		const names = cleanName.split(" ");
		if (names.length < 2) throw new DomainException("Nome Completo precisa ter pelo menos 2 nomes");
		for (const name of names) if (name.length < 2) throw new DomainException("Nome precisa ter pelo menos 2 letras");
		if (this.hasInvalidCharacter(cleanName)) throw new DomainException("Nome não pode números ou caracteres especiais");
		this._value = cleanName;
	};

	cleanName(name: string): string {
		const output = name.replace(/\s+/g, ' ').trim();
		return output;
	};

	hasInvalidCharacter(name: string): boolean {
		const regex = /[^a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ\s]/;
		const output = regex.test(name);
		return output;
	};

	get value(): string { return this._value; }

}