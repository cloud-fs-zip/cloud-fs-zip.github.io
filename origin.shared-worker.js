// Serializes messages cross context via BroadcastChannel output merge to readableStream
// Represents the Runtime State Context 
// service worker for the current scope
import * as Comlink from "unpkg/comlink/dist/esm/comlink.mjs";

const sharedWorker = origin.sharedWorkers[import.meta.url];

sharedWorker.run = (promise) => new ReadableStream({ async start(progress){ 
    for await (const value of await (new Function(`return ${promise}`))()) {
        progress.enqueue(value);
    }
    
}})
Comlink.expose(sharedWorker)