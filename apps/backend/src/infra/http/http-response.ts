import {HttpException} from "@/infra/http/http-exception";
import {HttpStatusCode} from "@/infra/decorators/http-status.decorator";

export interface SuccessResponseBody<T> {
	success: true;
	data: T;
}

export interface ErrorResponseBody {
	success: false;
	message: string;
	cause?: string;
	path: string;
	timestamp: string;
}

export interface StandardResponse<T> {
	statusCode: number;
	body?: SuccessResponseBody<T> | ErrorResponseBody;
}

export function buildSuccessResponse<T>(data: T, statusCode: number): StandardResponse<T> {
	if (statusCode === HttpStatusCode.NO_CONTENT) return {statusCode};
	return {
		statusCode,
		body: {
			success: true,
			data,
		},
	};
}

export function buildErrorResponse(error: HttpException, path: string): StandardResponse<never> {
	return {
		statusCode: error.statusCode,
		body: {
			success: false,
			message: error.message,
			cause: error.cause,
			path,
			timestamp: new Date().toISOString(),
		},
	};
}
