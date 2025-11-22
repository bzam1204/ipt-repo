import {MetadataKeys} from "@/infra/decorators/metadata-keys";

export function Controller(path: string = '/') {
	return decorate;

	function decorate(target: any) {
		Reflect.defineMetadata(MetadataKeys.controllers, path, target);
	}

}
