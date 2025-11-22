import DomainException from "@/domain/exceptions/DomainException";

export class Address {
	private readonly REGEX = /^\d{5}-?\d{3}$/;

	public constructor(
		private readonly _city: string,
		private readonly _state: string,
		private readonly _street: string,
		private readonly _number: string,
		private readonly _zipCode: string,
		private readonly _district: string,
		private readonly _complement?: string,
	) {
		if (_zipCode && !this.isValidZipCode(_zipCode)) throw new DomainException('Formato de cep inválido.');
		if (!this.isValidState(_state)) throw new DomainException('Estado precisa ser a abreviação com 2 caracteres.');
		if (!this.isValidStreet(_street)) throw new DomainException('Rua precisa ter no mínimo 3 caracteres.');
	};

	public static build(builder: AddressBuilder): Address {
		const output = new Address(builder.city, builder.state, builder.street, builder.number, builder.zipCode, builder.district, builder.complement);
		return output;
	};

	private isValidStreet(street: string): boolean {
		return !street || street.length >= 3;
	};

	private isValidState(state: string): boolean {
		return !state || state.length === 2;
	};

	private isValidZipCode(zipCode: string) {
		return !zipCode || this.REGEX.test(zipCode);
	};

	get city(): string { return this._city; };

	get state(): string { return this._state; };

	get street(): string { return this._street; };

	get number(): string { return this._number; };

	get zipCode(): string { return this._zipCode; };

	get district(): string { return this._district; };

	get complement(): string | undefined { return this._complement; };

}

export interface AddressBuilder {
	city: string;
	state: string;
	street: string;
	number: string;
	zipCode: string;
	district: string;
	complement?: string;
}
