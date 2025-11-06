export interface HttpClient {
  post<TInput, TOutput>(params: {
    url: string;
    body: TInput;
    headers?: Record<string, string>;
  }): Promise<TOutput>;
}

export class FetchHttpClient implements HttpClient {
  async post<TInput, TOutput>({ url, body, headers }: { url: string; body: TInput; headers?: Record<string, string> }): Promise<TOutput> {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(headers ?? {}),
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const message = `HTTP ${res.status}`;
      throw new Error(message);
    }
    // Some endpoints may return no content
    const text = await res.text();
    if (!text) return undefined as unknown as TOutput;
    try {
      return JSON.parse(text) as TOutput;
    } catch {
      return undefined as unknown as TOutput;
    }
  }
}

