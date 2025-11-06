import type { HttpClient } from "@/core/http/http-client";

export interface CreateAccountInput {
    email: string;
    cpf: string;
    password: string;
    lastName: string;
    firstName: string;
}

export interface LoginInput {
    email: string;
    password: string;
}

export interface LoginOutput {
    accessToken: string;
    refreshToken: string;
}

export interface AuthGateway {
    createAccount(input: CreateAccountInput): Promise<void>;
    login(input: LoginInput): Promise<LoginOutput>;
}

export class HttpAuthGateway implements AuthGateway {
    private readonly http: HttpClient;
    private readonly baseUrl = import.meta.env.VITE_API_BASE_URL;
    constructor(http: HttpClient) {
        this.http = http;
    }

    async createAccount(input: CreateAccountInput): Promise<void> {
        await this.http.post<CreateAccountInput, void>({
            url: this.baseUrl + "/account/create",
            body: input,
        });
    }

    async login(input: LoginInput): Promise<LoginOutput> {
        return this.http.post<LoginInput, LoginOutput>({
            url: this.baseUrl + "/account/login",
            body: input,
        });
    }
}
