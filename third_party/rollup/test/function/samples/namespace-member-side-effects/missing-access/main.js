import api from './api/index';

let errored = false;
try {
	api.namespace.missing.foo;
} catch {
	errored = true;
}
assert.ok(errored, 'unknown nested member access should be preserved');
