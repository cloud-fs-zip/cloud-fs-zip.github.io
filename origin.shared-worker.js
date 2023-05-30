// Serializes messages cross context via BroadcastChannel output merge to readableStream
// Represents the Runtime State Context 
// service worker for the current scope
import * as Comlink from "unpkg/comlink/dist/esm/comlink.mjs";

const sharedWorker = origin.sharedWorkers[import.meta.url];

sharedWorker.onconnect = ({ports:[port]}) => port.onmessage = ({data: {id, run }}) => {

}

sharedWorker.run = (promise,port) => new ReadableStream({ async start(progress){ 
    for await (const value of await (new Function(`return ${promise}`))()) {
        progress.enqueue(value);
    }
}}).pipeTo(new WritableStream({write(progress){
    port.postMessage(progress)
}}))
Comlink.expose(sharedWorker)