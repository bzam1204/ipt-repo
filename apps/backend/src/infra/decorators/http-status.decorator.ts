import {MetadataKeys} from "@/infra/decorators/metadata-keys";

export enum HttpStatusCode {
	OK = 200,
	CREATED = 201,
	NO_CONTENT = 204,
	BAD_REQUEST = 400,
	UNAUTHORIZED = 401,
	FORBIDDEN = 403,
	NOT_FOUND = 404,
	UNPROCESSABLE_ENTITY = 422,
	INTERNAL_SERVER_ERROR = 500,
}

export function HttpStatus(status: HttpStatusCode) {
	return function (target: any, propertyKey: string) {
		Reflect.defineMetadata(MetadataKeys.httpStatus, status, target.constructor, propertyKey);
	};
}
