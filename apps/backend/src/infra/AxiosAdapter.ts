import 'dotenv';

import axiosLib, {AxiosInstance} from "axios";

class AxiosAdapter {
	private readonly _baseUrl = `http://localhost:${process.env.PORT ?? 3010}`;
	readonly fetcher: AxiosInstance;

	constructor() {
		this.fetcher = axiosLib.create(
			{
				baseURL: this._baseUrl,
				headers: {'Content-Type': 'application/json'},
				validateStatus: () => true,
			}
		);
	};

}

export const axios = new AxiosAdapter().fetcher;