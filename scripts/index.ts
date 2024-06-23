import { bootstrap } from '../src/app';

/* eslint-disable no-console */
if (process.argv.length < 3) {
	throw new Error('Usage: npm run script -- my-script');
}

console.log('Running script', process.argv[2]);
/* eslint-disable-next-line @typescript-eslint/no-var-requires */
const run = require('./' + process.argv[2]);

if (run.bootstrap) {
	bootstrap(run.default);
}
else {
	run.default()
		.then(() => {
			process.exit(0);
		})
		.catch((err: string | Error) => {
			console.error(err);
			process.exit(1);
		});
}
