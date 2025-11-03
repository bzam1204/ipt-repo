import bcrypt from "bcryptjs";

import DomainException from "@/domain/exceptions/DomainException";
import {PasswordErrorCodes} from "@/domain/exceptions/PasswordErrorCodes";

export class Password {
	private static readonly saltRounds = 10;

	constructor(private readonly _value: string) { };

	static create(value: string): Password {
		if (!value) throw new DomainException(PasswordErrorCodes.message);
		if (!this.hasNumber(value)) throw new DomainException(...PasswordErrorCodes.getValues('number'));
		if (!this.hasMinLength(value)) throw new DomainException(...PasswordErrorCodes.getValues('tooShort'));
		if (!this.hasUpperCase(value)) throw new DomainException(...PasswordErrorCodes.getValues('uppercase'));
		if (!this.hasLowerCase(value)) throw new DomainException(...PasswordErrorCodes.getValues('lowercase'));
		const hashedValue = this.hash(value);
		const output = new Password(hashedValue);
		return output;
	};

	private static hash(value: string): string {
		const salt = bcrypt.genSaltSync(Password.saltRounds);
		const output = bcrypt.hashSync(value, salt);
		return output;
	};

	private static hasMinLength(value: string): boolean {
		return value.length >= 8;
	};

	private static hasUpperCase(value: string): boolean {
		return /[A-Z]/.test(value);
	};

	private static hasLowerCase(value: string): boolean {
		return /[a-z]/.test(value);
	};

	private static hasNumber(value: string): boolean {
		return /[0-9]/.test(value);
	};

	public compare(value: string): boolean {
		return bcrypt.compareSync(value, this._value);
	};

	get value(): string { return this._value; };

}
