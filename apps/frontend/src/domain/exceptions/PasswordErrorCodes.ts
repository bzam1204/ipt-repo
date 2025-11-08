import {ErrorCodes} from "@/domain/exceptions/ErrorCodes";

const causes = {
	empty: "A senha é obrigatória",
	number: "A senha deve conter pelo menos um número",
	tooShort: "A senha deve ter pelo menos 8 caracteres",
	uppercase: "A senha deve conter pelo menos uma letra maiúscula",
	lowercase: "A senha deve conter pelo menos uma letra minúscula",
} as const;

type ErrorCauseKeys = keyof typeof causes;

export const PasswordErrorCodes = new ErrorCodes<ErrorCauseKeys>("Senha inválida", causes);
