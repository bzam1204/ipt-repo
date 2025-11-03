import DomainException from "@/domain/exceptions/DomainException";

export class UUID {

	private readonly regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/g;

	constructor(private readonly _value: string) {
		if (!this.isValidUUID(_value)) throw new DomainException('Invalid UUID');
	};

	static create(value?: string): UUID {
		const uuid = value ?? crypto.randomUUID();
		const output = new UUID(uuid);
		return output;
	};

	private isValidUUID(value: string): boolean {
		const output = this.regex.test(value);
		return output;
	};

	get value(): string { return this._value; };

}
