globalThis.navigator && globalThis.navigator.serviceWorker && globalThis?.navigator?.serviceWorker?.register('origin.service-worker.js');
globalThis.sharedWorkers = globalThis.sharedWorkers || {};
const importUrl = new URL('origin.shared-worker.js',import.meta.url)
globalThis.sharedWorkers[importUrl] = (readable,launch) => {
    const processor = new SharedWorker(importUrl);
    processor.postMessage({ launch });
    readable.pipeTo(new WritableStream({ write(input){ 
        processor.postMessage(input);
    }}));
    return new ReadableStream({ start(output){ 
        processor.onmessage = (watch) => output.enqueue(watch);
    }, close(){processor.close();}});
};
export default globalThis;
