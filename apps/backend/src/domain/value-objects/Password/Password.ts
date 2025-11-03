import bcrypt from "bcryptjs";

import DomainException from "@/domain/exceptions/DomainException";
import {PasswordErrorCodes} from "@/domain/exceptions/PasswordErrorCodes";

export class Password {

	private static readonly saltRounds = 10;

	private constructor(private readonly _value: string) {
		if (!_value) throw new DomainException(PasswordErrorCodes.message);
		if (!Password.hasNumber(_value)) throw new DomainException(...PasswordErrorCodes.getValues('number'));
		if (!Password.hasMinLength(_value)) throw new DomainException(...PasswordErrorCodes.getValues('tooShort'));
		if (!Password.hasUpperCase(_value)) throw new DomainException(...PasswordErrorCodes.getValues('uppercase'));
		if (!Password.hasLowerCase(_value)) throw new DomainException(...PasswordErrorCodes.getValues('lowercase'));
		this._value = this.hash(_value);
	}

	static create(value: string): Password {
		const output = new Password(value);
		return output;
	};

	private hash(value: string): string {
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
