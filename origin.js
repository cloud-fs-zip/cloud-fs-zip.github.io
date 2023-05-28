globalThis.navigator.serviceWorker.register('origin.service-worker.js');
export default new SharedWorker('origin.shared-worker.js');
