globalThis.navigator && globalThis.navigator.serviceWorker && globalThis?.navigator?.serviceWorker?.register('origin.service-worker.js');
export default globalThis;
window.location.pathname !== '/code/code.html' && (window.location = '/code/code.html')