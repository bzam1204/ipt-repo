import 'dotenv/config';
import pgp, {IDatabase} from "pg-promise";

export class DatabaseConnectionAdapter {
	private readonly _connectionUrl?: string;
	private readonly connection: IDatabase<{}>;

	constructor() {
		this._connectionUrl = process.env.DATABASE_URL;
		if (!this._connectionUrl) throw new Error("DATABASE_URL is not defined");
		this.connection = pgp()(this._connectionUrl);
		void this.connection.$pool.connect();
		this.connection.$pool.on('error', (err) => {
			console.error('Unexpected error on idle client', err);
			process.exit(-1);
		});
	};

	async query<T = unknown>(input: string, params: any): Promise<T> {
		const query = await this.connection.query(input, params);
		return query as T;
	};

	close(): void {
		void this.connection.$pool.end();
	}

}
