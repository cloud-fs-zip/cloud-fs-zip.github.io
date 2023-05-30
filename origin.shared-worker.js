// Serializes messages cross context via BroadcastChannel output merge to readableStream
// Represents the Runtime State Context 
// service worker for the current scope
const sharedWorker = origin.sharedWorkers[import.meta.url];

sharedWorker.onconnect = ({ports:[port]}) => port.onmessage = ({data: {id, run }}) => {
    if (id && run) {
        new ReadableStream({ async start(progress){ 
            // the function is able to be a readable stream or iterator 
            // you should always return { stdout, stderr or one of them.}
            for await (const value of [].concat(await (new Function(`return ${run}`))(port))) {
                progress.enqueue(value)
            }
        }}).pipeTo(new WritableStream({write(progress){
            port.postMessage(progress)
        }}))
    }
}