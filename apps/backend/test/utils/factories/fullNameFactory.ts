export function fullNameFactory(random: () => number = Math.random) {
	const firstNames = [
		"Lucas", "Mateus", "Gabriel", "Bruno", "Felipe", "Rafael", "Daniel", "Pedro", "Gustavo", "Henrique",
		"Thiago", "Diego", "Leonardo", "Caio", "André", "Eduardo", "Vinicius", "João", "Miguel", "Samuel",
		"Lara", "Mariana", "Ana", "Julia", "Carolina", "Camila", "Beatriz", "Sophia", "Leticia", "Isabela",
		"Manuela", "Laura", "Fernanda", "Bianca", "Vitória", "Gabriela", "Luana", "Patricia", "Natália", "Amanda",
		"Cecília", "Clara", "Helena", "Yasmin", "Nicole", "Melissa", "Lorena", "Alice", "Ester", "Raquel",
		"Marina", "Valentina", "Alana", "Isadora", "Sarah", "Daiane", "Mirella", "Flávia", "Rafaela", "Priscila"
	];

	const lastNames = [
		"Silva", "Santos", "Oliveira", "Souza", "Pereira", "Costa", "Rodrigues", "Almeida", "Gomes", "Barbosa",
		"Cardoso", "Melo", "Araujo", "Fernandes", "Ribeiro", "Carvalho", "Martins", "Rocha", "Dias", "Nascimento",
		"Andrade", "Moreira", "Nunes", "Vieira", "Castro", "Cavalcanti", "Batista", "Campos", "Teixeira", "Freitas",
		"Moura", "Correia", "Barros", "Monteiro", "Cruz", "Farias", "Santiago", "Assis", "Fonseca", "Tavares",
		"Borges", "Bezerra", "Figueiredo", "Peixoto", "Xavier", "Guimarães", "Passos", "Lima", "Miranda", "Ramos",
		"Duarte", "Amaral", "Pinto", "Queiroz", "Rezende", "Prado", "Monteiro", "Cordeiro", "Macedo", "Porto"
	];

	return () => {
		const first = firstNames[Math.floor(random() * firstNames.length)];
		const last = lastNames[Math.floor(random() * lastNames.length)];
		const output = `${first} ${last}`;
		return output;
	};
}
