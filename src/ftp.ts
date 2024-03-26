import { Client as FTPClient } from "basic-ftp";
import config from "./config";

async function connect() {
	const client = new FTPClient();
	// client.ftp.verbose = true;
	try {
		await client.access(config.destination.access);
	}
	catch (err) {
		console.log(err);
	}
	return client;
}

export { connect };

