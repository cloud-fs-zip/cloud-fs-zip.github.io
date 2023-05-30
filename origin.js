globalThis.navigator && globalThis.navigator.serviceWorker && globalThis?.navigator?.serviceWorker?.register('origin.service-worker.js');
globalThis.sharedWorkers = globalThis.sharedWorkers || {};
const importUrl = new URL('origin.shared-worker.js',import.meta.url)
globalThis.sharedWorkers[importUrl] =  new SharedWorker(importUrl);
export default globalThis;
