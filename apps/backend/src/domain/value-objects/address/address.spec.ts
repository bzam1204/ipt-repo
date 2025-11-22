import DomainException from "@/domain/exceptions/DomainException";

import Address, {AddressBuilder} from './address';

describe('Address Value Object', () => {
	const builder: AddressBuilder = {
		state: 'SP',
		city: 'São Paulo',
		street: 'Rua Principal',
		number: '123',
		zipCode: '12345-678',
		district: 'Centro',
		complement: 'Apto 101',
	};

	it('Deve criar uma instância de Address com sucesso para propriedades válidas', () => {
		const address = Address.build(builder);
		expect(address).toBeInstanceOf(Address);
		expect(address.state).toBe('SP');
		expect(address.street).toBe('Rua Principal');
		expect(address.zipCode).toBe('12345-678');
		expect(address.complement).toBe('Apto 101');
	});

	it('Deve criar uma instância de Address mesmo sem um complemento', () => {
		const {complement, ...propsWithoutComplement} = builder;
		const address = Address.build(propsWithoutComplement);
		expect(address).toBeInstanceOf(Address);
		expect(address.complement).toBeUndefined();
	});

	describe('Validações de Domínio', () => {
		it('Deve lançar uma exceção se o CEP (zipCode) for inválido', () => {
			const invalidProps = {...builder, zipCode: '12345'};
			expect(() => Address.build(invalidProps)).toThrow(new DomainException('Formato de cep inválido.'));
		});

		it('Deve lançar uma exceção se a rua (street) for muito curta', () => {
			const invalidProps = {...builder, street: 'R'};
			expect(() => Address.build(invalidProps)).toThrow(new DomainException('Rua precisa ter no mínimo 3 caracteres.'));
		});

		it('Deve lançar uma exceção se o estado (state) não tiver 2 caracteres', () => {
			const invalidProps = {...builder, state: 'SAO PAULO'};
			expect(() => Address.build(invalidProps)).toThrow(new DomainException('Estado precisa ser a abreviação com 2 caracteres.'));
		});
	});
});
