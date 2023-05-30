globalThis.navigator && globalThis.navigator.serviceWorker && globalThis?.navigator?.serviceWorker?.register('origin.service-worker.js');
globalThis.sharedWorkers = globalThis.sharedWorkers || {};
globalThis.sharedWorkers['origin.shared-worker.js'] =  new SharedWorker('origin.shared-worker.js');
export default globalThis;
