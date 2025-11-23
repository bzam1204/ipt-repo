import cors from "cors";

import express, {Express, NextFunction, Request, Response} from "express";

import {Container} from "@/infra/container";
import {MetadataKeys} from "@/infra/decorators/metadata-keys";
import {RouteDefinition} from "@/infra/decorators/RouteDefinition";
import {ParameterDefinition} from "@/infra/decorators/ParameterDefinition";
import DomainException from "@/domain/exceptions/DomainException";
import {HttpStatusCode} from "@/infra/decorators/http-status.decorator";
import {HttpException} from "@/infra/http/http-exception";
import {buildErrorResponse, buildSuccessResponse} from "@/infra/http/http-response";

export class ExpressAdapter {
	app: Express;
	private errorHandlerRegistered = false;

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
		this.registerErrorHandler();
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
		const args = this.getRouteParameters(paramsList, httpRequest);
		const statusFromDecorator = Reflect.getMetadata(MetadataKeys.httpStatus, controller, routeDefinition.propertyKey) as number | undefined;
		const statusCode = statusFromDecorator ?? this.getDefaultStatus(routeDefinition.httpMethod);
		try {
			const result = await expressHandler(...args);
			const response = buildSuccessResponse(result, statusCode);
			if (response.statusCode === HttpStatusCode.NO_CONTENT) return res.status(response.statusCode).end();
			return res.status(response.statusCode).json(response.body);
		} catch (error) {
			return next(error);
		}
	}

	getRouteParameters(parameterDefinitionsList: ParameterDefinition[], httpRequest: any) {
		const parameterValues: any[] = new Array(parameterDefinitionsList.length);
		for (const {parameterIndex, type, name} of parameterDefinitionsList) {
			if (type === 'params') parameterValues[parameterIndex] = name ? httpRequest.params[name] : httpRequest.params;
			if (type === 'query') parameterValues[parameterIndex] = name ? httpRequest.query[name] : httpRequest.query;
			if (type === 'body') parameterValues[parameterIndex] = name ? httpRequest.body[name] : httpRequest.body;
		}
		return parameterValues;
	};

	private registerErrorHandler() {
		if (this.errorHandlerRegistered) return;
		this.errorHandlerRegistered = true;
		this.app.use((err: any, req: Request, res: Response, _next: NextFunction) => {
			const normalizedError = this.normalizeError(err);
			const response = buildErrorResponse(normalizedError, req.path);
			return res.status(response.statusCode).json(response.body);
		});
	}

	private normalizeError(err: any): HttpException {
		if (err instanceof HttpException) return err;
		if (err instanceof DomainException) return new HttpException(HttpStatusCode.UNPROCESSABLE_ENTITY, err.message, err.cause);
		if (err instanceof Error) return new HttpException(HttpStatusCode.INTERNAL_SERVER_ERROR, err.message);
		return new HttpException(HttpStatusCode.INTERNAL_SERVER_ERROR, 'Internal server error');
	}

	private getDefaultStatus(method: RouteDefinition["httpMethod"]): HttpStatusCode {
		if (method === 'post') return HttpStatusCode.CREATED;
		return HttpStatusCode.OK;
	}

	public listen(port: number, callback: Function) {
		this.app.listen(port, () => callback());
	};

}

export type HttpMethod = "get" | "post";
