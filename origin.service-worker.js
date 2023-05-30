// service worker for the current scope
import serviceWorker from './origin.js';



serviceWorker.sharedWorkers = globalThis.sharedWorkers || {};
const importUrl = new URL('origin.shared-worker.js',import.meta.url)
serviceWorker.sharedWorkers[importUrl] = (launch,readable) => {
    const processor = new SharedWorker(importUrl);
    processor.postMessage({ launch });
    readable.pipeTo(new WritableStream({ write(input){ 
        processor.postMessage(input);
    }}));
    return new ReadableStream({ start(output){ 
        processor.onmessage = (watch) => output.enqueue(watch);
    }, close(){processor.close();}});
};

serviceWorker.onfetch = (request)=>serviceWorker.sharedWorkers[importUrl]()