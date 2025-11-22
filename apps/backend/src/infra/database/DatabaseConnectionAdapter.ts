import 'dotenv/config';

import pgp, {IDatabase, ITask} from "pg-promise";
import {singleton} from "tsyringe";

@singleton()
export class DatabaseConnectionAdapter {
	private readonly _connectionUrl?: string;
	private readonly _connection: IDatabase<{}>;

	constructor() {
		this._connectionUrl = process.env.DATABASE_URL;
		if (!this._connectionUrl) throw new Error("DATABASE_URL is not defined");
		this._connection = pgp()(this._connectionUrl);
		void this._connection.$pool.connect();
		this._connection.$pool.on('error', (err) => {
			console.error('Unexpected error on idle client', err);
			process.exit(-1);
		});
	};

	async query<T = unknown>(input: string, params: any): Promise<T> {
		const query = await this._connection.query(input, params);
		return query as T;
	};

	async onTransaction<T>(callback: (trx: ITask<{}>) => Promise<T>): Promise<T> {
		return this._connection.tx(callback);
	};

	close(): void {
		void this._connection.$pool.end();
	};

}

export const DatabaseConnectionAdapterToken = Symbol(DatabaseConnectionAdapter.name);