import DomainException from "@/domain/exceptions/DomainException";

export default class Birthdate {
	public readonly value: Date;

	constructor(dateString: string) {
		const date = new Date(dateString);
		if (isNaN(date.getTime())) throw new DomainException('Formato de data inválido.');
		const today = new Date();
		today.setHours(0, 0, 0, 0);
		if (date > today) throw new DomainException('A data de nascimento não pode ser futura.');
		this.value = date;
	};

	toString(): string {
		return this.value.toISOString().split('T')[0];
	}

}
