import 'jasmine';
import { env } from '../../src/env';

describe('Environment', () => {
	it('can load', () => {
		expect(env).toBeDefined();
	});

	it('has APP_TITLE key', () => {
		expect(typeof env.APP_TITLE).toBe(typeof 'string');
	});
});
