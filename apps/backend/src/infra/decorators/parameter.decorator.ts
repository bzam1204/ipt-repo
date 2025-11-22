import {MetadataKeys} from "@/infra/decorators/metadata-keys";
import {ParameterDefinition, ParameterType} from "@/infra/decorators/ParameterDefinition";

export const Params = createParameterDecorator('params');

export const Body = createParameterDecorator('body');

export const Query = createParameterDecorator('query');

export function createParameterDecorator(type: ParameterType) {

	return function (name?: string) {

		return function (target: any, propertyKey: string, parameterIndex: number) {
			const parameterDefinition: ParameterDefinition = {parameterIndex, propertyKey, type, name}
			const alreadyHasMetadata = Reflect.hasMetadata(MetadataKeys.params, target.constructor, propertyKey);
			if (!alreadyHasMetadata) Reflect.defineMetadata(MetadataKeys.params, [], target.constructor, propertyKey);
			const parameters = Reflect.getMetadata(MetadataKeys.params, target.constructor, propertyKey);
			parameters.push(parameterDefinition);
			Reflect.defineMetadata(MetadataKeys.params, parameters, target.constructor, propertyKey);
		};

	};

}
