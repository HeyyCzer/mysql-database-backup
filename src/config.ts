export default {
	cronExpression: "0 0 */2 * * *",
	keepFiles: 10,
	safeAmountOfFiles: 50,

	source: {
		access: {
			host: 'localhost',
			port: 3306,
			user: 'root',
			password: 'password',
			database: 'database',
		}
	},
	destination: {
		access: {
			host: 'localhost',
			port: 21,
			user: 'user',
			password: 'password',
		},
		path: "mysql-backups"
	}
} as Config;
