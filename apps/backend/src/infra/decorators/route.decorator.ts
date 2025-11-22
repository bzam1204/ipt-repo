import {MetadataKeys} from "@/infra/decorators/metadata-keys";
import {RouteDefinition} from "@/infra/decorators/RouteDefinition";

import {HttpMethod} from "@/ExpressAdapter";

function createRouteDecorator(httpMethod: HttpMethod) {
	return decorator;

	function decorator(path: string = '') {
		return decorate;

		function decorate(target: any, propertyKey: string) {
			const routeDefinition: RouteDefinition = {path, httpMethod, propertyKey};
			const alreadyHasMetadata = Reflect.hasMetadata(MetadataKeys.routes, target.constructor);
			if (!alreadyHasMetadata) Reflect.defineMetadata(MetadataKeys.routes, [], target.constructor);
			const getMetadata = Reflect.getMetadata(MetadataKeys.routes, target.constructor) ?? [];
			getMetadata.push(routeDefinition);
			Reflect.defineMetadata(MetadataKeys.routes, getMetadata, target.constructor);
		}

	}

}

export function Post (path?: string) {
	return createRouteDecorator('post')(path);
}

export function Get (path?: string) {
	return createRouteDecorator('get')(path);
}
