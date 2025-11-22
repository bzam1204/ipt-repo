
import Birthdate from './birthdate';
import DomainException from "@/domain/exceptions/DomainException";

describe('Birthdate Value Object', () => {
  it('Deve criar uma instância de Birthdate com sucesso para uma data válida', () => {
    const validDateString = '1990-10-25';
    const birthdate = new Birthdate(validDateString);
    expect(birthdate).toBeInstanceOf(Birthdate);
    expect(birthdate.value.getUTCFullYear()).toBe(1990);
    expect(birthdate.value.getUTCMonth()).toBe(9);
    expect(birthdate.value.getUTCDate()).toBe(25);
  });

  it('Deve poder devolver a data em forma de string', () => {
    const validDateString = '1990-10-25';
    const birthdate = new Birthdate(validDateString);
    expect(birthdate.toString()).toBe(validDateString);
  });

  it('Deve lançar uma DomainException para um formato de data inválido', () => {
    const invalidDateString = 'not-a-date';
    expect(() => new Birthdate(invalidDateString)).toThrow(new DomainException('Formato de data inválido.'));
  });

  it('Deve lançar uma DomainException para uma data no futuro', () => {
    const tomorrow = new Date();
    tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);
    const futureDateString = tomorrow.toISOString().split('T')[0];
    expect(() => new Birthdate(futureDateString)).toThrow(new DomainException('A data de nascimento não pode ser futura.'));
  });

});
