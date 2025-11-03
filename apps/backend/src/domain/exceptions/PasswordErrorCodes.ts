import {ErrorCodes} from "@/domain/exceptions/ErrorCodes";

const causes = {
	empty: "Password is required",
	number: "Password must have at least one number",
	tooShort: "Password must have at least 8 characters",
	uppercase: "Password must have at least one uppercase letter",
	lowercase: "Password must have at least one lowercase letter",
} as const;

type ErrorCauseKeys = keyof typeof causes;

export const PasswordErrorCodes = new ErrorCodes<ErrorCauseKeys>("Invalid Password", causes);
