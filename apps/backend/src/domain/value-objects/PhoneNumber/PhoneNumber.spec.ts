import {PhoneNumber} from "@/domain/value-objects/PhoneNumber/PhoneNumber";

describe('Telefone', () => {
	it('deve aceitar número válido de telefone fixo com 10 dígitos', () => {
		const phone = new PhoneNumber('3499883424');
		expect(phone.value).toBe('(34) 99988-3424');
	});

	it('deve aceitar números válidos de celular com 11 dígitos', () => {
		const phone = new PhoneNumber('34998834244');
		expect(phone.value).toBe('(34) 99883-4244');
	});

	it('deve rejeita números com DDD inválido', () => {
		expect(() => new PhoneNumber('00998834244')).toThrow('DDD inválido');
	});

	it('deve remove caracteres de formatação e valida', () => {
		const phone = new PhoneNumber('   (34))%#$^#$(!)!)($@($@$#)!)     9 9 8 8---3424 ');
		expect(phone.value).toBe('(34) 99988-3424');
	});

	it.each(['34988342', '349988342444'])('deve rejeita números muito curtos ou muito longos', (input) => {
		expect(() => new PhoneNumber(input)).toThrow('Número de telefone inválido. Deve ser (XX) XXXXX-XXXX');
	});
});
