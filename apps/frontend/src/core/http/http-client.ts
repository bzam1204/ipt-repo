import type DomainException from "@/domain/exceptions/DomainException.ts";

export interface HttpClient {
	post<TInput, TOutput>(params: {
		url: string;
		body: TInput;
		headers?: Record<string, string>;
	}): Promise<TOutput>;
	get<TOutput>(params: { url: string; headers?: Record<string, string> }): Promise<TOutput>;
}

export class FetchHttpClient implements HttpClient {
	async post<TInput, TOutput>({url, body, headers}: { url: string; body: TInput; headers?: Record<string, string> }): Promise<TOutput> {
		const res = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				...(headers ?? {}),
			},
			body: JSON.stringify(body),
		});
		if (!res.ok) {
			const body = await res.json() as DomainException;
			throw new Error(body.message, {cause: body.cause});
		}
		// Some endpoints may return no content
		const text = await res.text();
		if (!text) return undefined as unknown as TOutput;
		return JSON.parse(text) as TOutput;
	}

	async get<TOutput>({url, headers}: { url: string; headers?: Record<string, string> }): Promise<TOutput> {
		const res = await fetch(url, {
			method: 'GET',
			headers: {
				...(headers ?? {}),
			},
		});
		if (!res.ok) {
			const body = await res.json() as DomainException;
			throw new Error(body.message, {cause: body.cause});
		}
		const text = await res.text();
		if (!text) return undefined as unknown as TOutput;
		return JSON.parse(text) as TOutput;
	}
}
