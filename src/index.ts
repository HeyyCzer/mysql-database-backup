import "source-map-support/register";

import * as cron from "node-cron";

// Validate config
import config from "../config.json";

config as Config;

import { dumpDatabase } from "./database";
import { connect as connectFtp } from "./ftp";

import { unlinkSync } from "fs";
import { DateTime } from "luxon";

import parser from 'cron-parser';

cron.schedule(config.cronExpression, async () => {
	// Dump database
	console.log("⏳ Starting backup...");
	const targetFile = await dumpDatabase();
	if (!targetFile) {
		console.log("❗ Failed to dump database!");
		return;
	}
	console.log(`✅ Dumped database to ${targetFile}!`);

	// Connect to FTP
	console.log("⏳ Uploading to FTP...");
	const ftpClient = await connectFtp();
	console.log(`✅ Connected to FTP server!`);

	// Upload file
	const destinationPath = config.destination.path;
	const fileName = `${DateTime.now().toFormat("yyyy_MM_dd__HH_mm_ss")}.sql.gz`;
	console.log(`⏳ Uploading ${targetFile} to ${destinationPath}/${fileName}`);
	try {
		await ftpClient.ensureDir(destinationPath);
	} catch (e) {
		console.error("❗ Failed to create directory!", e);
		return ftpClient.close();
	}
	try {
		await ftpClient.uploadFrom(targetFile, fileName);
	} catch (e) {
		console.error("❗ Failed to create directory!", e);
		return ftpClient.close();
	}
	console.log("✅ Upload complete!");

	// Remove temp local file
	console.log("⏳ Removing temp file...");
	unlinkSync(targetFile);
	console.log("✅ Temp file removed!");

	// Remove old files
	console.log("⏳ Removing old files...");
	try {
		const files = await ftpClient.list();
		if (files.length <= config.keepFiles) {
			console.log("❗ No files to remove!");
			return ftpClient.close();
		}

		if (files.length > config.safeAmountOfFiles) {
			console.log("❗ Too many files! Aborting cleanup!");
			return ftpClient.close();
		}

		const filesToRemove = files
			.filter((file) => file.name.endsWith(".sql.gz"))
			.sort((a, b) => a.name.localeCompare(b.name))
			.slice(0, -config.keepFiles);
		
		for (const file of filesToRemove) {
			console.log(`⏳ Removing ${file.name}`);
			await ftpClient.remove(file.name);
			console.log(`✅ Removed ${file.name}`);
		}

		console.log("✅ Cleanup complete!");
	} catch (e) {
		console.error("❗ Failed to remove old files!", e);
	} finally {
		ftpClient.close();
	}

	console.log("✅ Backup complete!");
	showNextExecution();
});

function showNextExecution() {
	const interval = parser.parseExpression(config.cronExpression);
	console.log('Next execution at:', interval.next().toISOString());
}

console.log("Backup service started!");
showNextExecution();
