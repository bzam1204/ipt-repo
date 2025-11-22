import cors from "cors";

import express, {Express, NextFunction, Request, Response} from "express";

import {Container} from "@/infra/container";
import {MetadataKeys} from "@/infra/decorators/metadata-keys";
import {RouteDefinition} from "@/infra/decorators/RouteDefinition";
import {ParameterDefinition} from "@/infra/decorators/ParameterDefinition";

export class ExpressAdapter {
	app: Express;

	constructor() {
		this.app = express();
		this.app.use(cors());
		this.app.use(express.json());
	}

	public registerControllers(controllers: any[]): void {
		for (const controller of controllers) {
			const controllerPath = Reflect.getMetadata(MetadataKeys.controllers, controller);
			const routes: RouteDefinition[] = Reflect.getMetadata(MetadataKeys.routes, controller) ?? [];
			const instance: any = Container.resolve(controller);
			for (const route of routes) this.registerRoute(route, instance, controller, controllerPath);
		}
	};

	private registerRoute(routeDefinition: RouteDefinition, instance: any, controller: any, controllerPath: string) {
		const _controllerPath = controllerPath.replace('/', '');
		const _routePath = routeDefinition.path.replace('/', '');
		const path = `/${_controllerPath}/${_routePath}`;
		const expressHandler = instance[routeDefinition.propertyKey].bind(instance);
		this.app[routeDefinition.httpMethod](path, this.routeAdapter(expressHandler, controller, routeDefinition));
	};

	private routeAdapter = (expressHandler: any, controller: any, routeDefinition: RouteDefinition) => async (req: Request, res: Response, next: NextFunction) => {
		const httpRequest = {body: req.body, params: req.params, query: req.query};
		const paramsList = Reflect.getMetadata(MetadataKeys.params, controller, routeDefinition.propertyKey) ?? [];
		const args = this.getRouteParameters(paramsList, httpRequest, res);
		return await expressHandler(...args);
	}

	getRouteParameters(parameterDefinitionsList: ParameterDefinition[], httpRequest: any, httpResponse: Response) {
		const parameterValues: any[] = new Array(parameterDefinitionsList.length);
		for (const {parameterIndex, type, name} of parameterDefinitionsList) {
			if (type === 'params') parameterValues[parameterIndex] = name ? httpRequest.params[name] : httpRequest.params;
			if (type === 'query') parameterValues[parameterIndex] = name ? httpRequest.query[name] : httpRequest.query;
			if (type === 'body') parameterValues[parameterIndex] = name ? httpRequest.body[name] : httpRequest.body;
		}
		parameterValues.push(httpResponse);
		return parameterValues;
	};

	public listen(port: number, callback: Function) {
		this.app.listen(port, () => callback());
	};

}

export type HttpMethod = "get" | "post";
