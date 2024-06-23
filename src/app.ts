/**
 * This file bootstraps your application by running the register function
 * 	and setting up error handling.
 */
import { Bootstrap as _Bootstrap, RunFunction } from 'ts-async-bootstrap';

import { errorHandler } from './error';
import { register, teardown } from './register';

export class App extends _Bootstrap {
	override onError = errorHandler;
	override register = register;
	override teardown = teardown;
}

export const app = new App();

export function bootstrap(run: RunFunction) {
	app.boot(run);
}
