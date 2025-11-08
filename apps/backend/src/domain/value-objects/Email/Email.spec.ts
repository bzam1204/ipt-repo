import {Email} from "@/domain/value-objects/Email/Email";

describe('Email', () => {

	it('should create a valid Email', () => {
		const value = "example@eg.com"
		const email = Email.create(value);
		expect(email.value).toBe(value);
		expect(email).toBeInstanceOf(Email);
	});

	it('should not create a Email with invalid value', () => {
		const value = "invalid-email"
		expect(() => Email.create(value)).toThrow('E-mail inválido');
	});

})
