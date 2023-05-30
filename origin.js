globalThis.navigator && globalThis.navigator.serviceWorker && globalThis?.navigator?.serviceWorker?.register('origin.service-worker.js');
globalThis.sharedWorkers = globalThis.sharedWorkers || {};
const importUrl = new URL('origin.shared-worker.js',import.meta.url)
globalThis.sharedWorkers[importUrl] = (launch) => {
    const processor = new SharedWorker(importUrl);
    processor.postMessage({ launch });
    new WritableStream({ write(output){ 
        processor.postMessage(input);
    }})
    new ReadableStream({ start(output){ 
        processor.onmessage = (watch) => output.enqueue(watch);
    }})
};
export default globalThis;
