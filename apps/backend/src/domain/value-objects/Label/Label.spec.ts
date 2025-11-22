import {Label} from "@/domain/value-objects/Label/Label";

describe('Label', () => {

	it("deve criar um Label válido", () => {
		const input = "Valid Label";
		const label = new Label(input);
		expect(label.value).toBe("Valid Label");
	});

	it("deve criar um Label limpo, removendo espaços extras", () => {
		const input = "   Valid    Label   Test   ";
		const label = new Label(input);
		expect(label.value).toBe("Valid Label Test");
	});

	it("não deve criar um Label com string vazia", () => {
		const input = "    ";
		expect(() => new Label(input)).toThrow("Label não pode ser vazio");
	});

	it("não deve criar um Label com menos de 3 letras", () => {
		const input = "ab";
		expect(() => new Label(input)).toThrow("Label deve conter pelo menos 3 letras");
	});

	it.each([
		"123456",
		"!!!@@@",
		"123 !!!",
		"##$$ %%"
	])("não deve criar um Label contendo apenas números ou caracteres especiais: %s", (input) => {
		expect(() => new Label(input)).toThrow("Label deve conter letras válidas");
	});

});
