// Serializes messages cross context via BroadcastChannel output merge to readableStream
// Represents the Runtime State Context 
// service worker for the current scope
const sharedWorker = origin.sharedWorkers[import.meta.url];

sharedWorker.onconnect = ({ports:[port]}) => port.onmessage = ({data: { id, run }}) => {
    if (id && run) {
        try {
        new ReadableStream({ async start(progress){ 
            // the function is able to be a readable stream or iterator 
            // you should always return { stdout, stderr or one of them.}
            for await (const output of [].concat(await (new Function(`return ${run}`))(port))) {
                progress.enqueue({ id, output })
            }
        }}).pipeTo(new WritableStream({write(progress){
            port.postMessage(progress)
        }}));
        } catch(stderr) {
            port.postMessage({ id, stderr })
        }
    }
}