interface Config {
	cronExpression: string;
	keepFiles: number;
	safeAmountOfFiles: number,

	source: {
		access: {
			host: string,
			port: number,
			user: string,
			password: string,
			database: string,
		}
	},
	destination: {
		access: {
			host: string;
			port: number;
			user: string;
			password: string;
			secure?: boolean;
			secureOptions?: any;
		},
		path: string;
	}
}