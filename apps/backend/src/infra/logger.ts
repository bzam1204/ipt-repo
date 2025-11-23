const COLORS = {
	gray: '\x1b[90m',
	green: '\x1b[32m',
	yellow: '\x1b[33m',
	red: '\x1b[31m',
	reset: '\x1b[0m',
};

type LogLevel = 'info' | 'warn' | 'error';

export class Logger {
	private readonly enabled = process.env.NODE_ENV !== 'production';

	info(message: string) {
		this.print('info', message, COLORS.green);
	}

	warn(message: string) {
		this.print('warn', message, COLORS.yellow);
	}

	error(message: string) {
		this.print('error', message, COLORS.red);
	}

	private print(level: LogLevel, message: string, color: string) {
		if (!this.enabled) return;
		const timestamp = new Date().toISOString();
		// eslint-disable-next-line no-console
		console.log(`${COLORS.gray}${timestamp}${COLORS.reset} ${color}${level.toUpperCase()}${COLORS.reset} ${message}`);
	}
}

export const logger = new Logger();
