export interface ParameterDefinition {
	type: ParameterType;
	name?: string;
	propertyKey: string;
	parameterIndex: number;
}

export type ParameterType = 'body' | 'params' | 'query';