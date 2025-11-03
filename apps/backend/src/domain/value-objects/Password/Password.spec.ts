import {Password} from "@/domain/value-objects/Password/Password";
import DomainException from "@/domain/exceptions/DomainException";
import {PasswordErrorCodes} from "@/domain/exceptions/PasswordErrorCodes";

describe('Password', () => {

	it('should create a new Password', () => {
		const input = "P@ssw0rd";
		const password = Password.create(input);
		expect(password.value).toBeDefined();
		expect(password.compare(input)).toBe(true);
	});

	it('should create a password which value is hashed and different from the input', () => {
		const input = "P@ssw0rd";
		const password = Password.create(input);
		expect(password.value).not.toBe(input);
		expect(password.compare(input)).toBe(true);
	});

	it('should not create a Password if it is too short', () => {
		const input = "123";
		try {
			Password.create(input)
		} catch (e) {
			if (!(e instanceof DomainException)) throw new Error();
			expect(e).toBeInstanceOf(DomainException);
			expect(e.cause).toBe(PasswordErrorCodes.pickCause('tooShort'));
			expect(e.message).toBe(PasswordErrorCodes.message);
		}
	});

	it('should not create a Password if it does not have a number', () => {
		const input = "P@ssw0rd1";
		try {
			Password.create(input)
		} catch (e) {
			if (!(e instanceof DomainException)) throw new Error();
			expect(e).toBeInstanceOf(DomainException);
			expect(e.cause).toBe(PasswordErrorCodes.pickCause('number'));
		}
	});

	it('should not create a Password if it does not have a uppercase letter', () => {
		const input = "p@ssw0rd";
		try {
			Password.create(input)
		} catch (e) {
			if (!(e instanceof DomainException)) throw new Error();
			expect(e).toBeInstanceOf(DomainException);
			expect(e.cause).toBe(PasswordErrorCodes.pickCause('uppercase'));
			expect(e.message).toBe(PasswordErrorCodes.message);
		}
	});

	it('should not create a Password if it does not have a lowercase letter', () => {
		const input = "P@SSW0RD";
		try {
			Password.create(input)
		} catch (e) {
			if (!(e instanceof DomainException)) throw new Error();
			expect(e).toBeInstanceOf(DomainException);
			expect(e.cause).toBe(PasswordErrorCodes.pickCause('lowercase'));
			expect(e.message).toBe(PasswordErrorCodes.message);
		}
	});

});
