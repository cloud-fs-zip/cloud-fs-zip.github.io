// Serializes messages cross context via BroadcastChannel output merge to readableStream
// Represents the Runtime State Context 
// service worker for the current scope
import * as Comlink from "unpkg/comlink/dist/esm/comlink.mjs";

const sharedWorker = origin.sharedWorkers[import.meta.url];

sharedWorker.onconnect = ({ports:[port]}) => port.onmessage = ({data: {id, run }}) => {
    if (id && run) {
        new ReadableStream({ async start(progress){ 
        
            for await (const value of await (new Function(`return ${run}`))(port)) {
                progress.enqueue(value)
            }
        
        }}).pipeTo(new WritableStream({write(progress){
            port.postMessage(progress)
        }}))
    }
    

}

sharedWorker.run = (promise,port) => 
Comlink.expose(sharedWorker)