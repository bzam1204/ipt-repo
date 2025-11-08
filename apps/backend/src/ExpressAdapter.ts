import express, {Express} from "express";
import cors from "cors";

export class ExpressAdapter {
	app: Express;

	constructor() {
		this.app = express();
		this.app.use(cors());
		this.app.use(express.json());
	}

	createRoute(method: HttpMethod, path: string, callback: Function) {
		this.app[method](path, (req, res) => callback(req, res));
	}

	listen(port: number, callback: Function) {
		this.app.listen(port, () => callback());
	}
}

export type HttpMethod = "get" | "post";
