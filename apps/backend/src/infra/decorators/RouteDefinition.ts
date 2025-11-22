import {HttpMethod} from "@/ExpressAdapter";

export interface RouteDefinition {
	path: string;
	httpMethod: HttpMethod;
	propertyKey: string;
}
