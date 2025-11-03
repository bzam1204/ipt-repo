export function cpfGenerator(formatado = true): string {
	const calcularDigito = (nums: number[], pesos: number[]): number => {
		const soma = nums.reduce((acc, num, i) => acc + num * pesos[i], 0);
		const resto = (soma * 10) % 11;
		return resto === 10 ? 0 : resto;
	};

	const numeros = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10));
	const peso1 = [10,9,8,7,6,5,4,3,2];
	const digito1 = calcularDigito(numeros, peso1);
	const peso2 = [11,10,9,8,7,6,5,4,3,2];
	const digito2 = calcularDigito([...numeros, digito1], peso2);

	const cpfArray = [...numeros, digito1, digito2];
	const cpf = cpfArray.join('');

	if (formatado) {
		return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
	} else {
		return cpf;
	}
}
