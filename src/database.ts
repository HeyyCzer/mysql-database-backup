import mysqldump from 'mysqldump';
import config from './config';

async function dumpDatabase() {
	try {
		const targetFile = 'temp-dump.sql.gz';
		await mysqldump({
			connection: config.source.access,
			dumpToFile: targetFile,
			// compressFile: true,
		});
		return targetFile;
	} catch (err) {
		console.log(err);
	}
}

export { dumpDatabase };

