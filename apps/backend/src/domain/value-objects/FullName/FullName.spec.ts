import {FullName} from "@/domain/value-objects/FullName/FullName";

describe('Nome Completo', () => {

	it("deve criar um Nome Completo", () => {
		const input = "John Doe";
		const fullName = new FullName(input);
		expect(fullName.value).toBe(input);
	});

	it("deve criar um Nome Completo limpo", () => {
		const input = "      John     Doe    da Silva         ";
		const fullName = new FullName(input);
		expect(fullName.value).toBe('John Doe da Silva');
	});


	it("não deve criar um Nome Completo com espaços em branco", () => {
		const input = "       ";
		expect(() => new FullName(input)).toThrow();
	});

	it("não deve criar um Nome Completo com apenas um nome", () => {
		const input = "John";
		expect(() => new FullName(input)).toThrow("Nome Completo precisa ter pelo menos 2 nomes");
	});

	it("não deve criar um Nome Completo com nomes curtos", () => {
		const input = "J J";
		expect(() => new FullName(input)).toThrow("Nome precisa ter pelo menos 2 letras");
	});

	it.each(['11 11', '#% %&'])("não deve criar um Nome Completo com números ou caracteres especiais", (input) => {
		expect(() => new FullName(input)).toThrow("Nome não pode números ou caracteres especiais");
	});

});