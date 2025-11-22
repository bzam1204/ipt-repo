export class PhoneNumber {

	constructor(private readonly _value: string) {
		if (!_value) throw new Error("Número de telefone é obrigatório");
		const cleanValue = _value.replace(/\D/g, '');
		if (cleanValue.length !== 10 && cleanValue.length !== 11) throw new Error("Número de telefone inválido. Deve ser (XX) XXXXX-XXXX");
		if (this.validateDDD(cleanValue)) throw new Error("DDD inválido");
		this._value =  this.formatValue(cleanValue);
	};

	private validateDDD(value: string): boolean {
		const regex = /^[1-9]{2}$/;
		return !regex.test(value.slice(0, 2));
	};

	private formatValue(value: string): string {
		const ddd = value.slice(0, 2);
		const number = value.slice(-8)
		const firstNumberPart = number.slice(0,4);
		const lastNumberPart = number.slice(4,8);
		return `(${ddd}) 9${firstNumberPart}-${lastNumberPart}`;
	}

	get value(): string { return this._value; }

}