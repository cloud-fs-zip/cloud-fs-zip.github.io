// Serializes messages cross context via BroadcastChannel output merge to readableStream
// Represents the Runtime State Context 
// service worker for the current scope
const sharedWorker = origin.sharedWorkers[import.meta.url];

/*
const readEverything =     new ReadableStream({ async start(progress){ 
    // the function is able to be a readable stream or iterator 
    // you should always return { stdout, stderr or one of them.}
    for await (const output of [].concat(await (new Function(`return ${run}`))(port))) {
        progress.enqueue({ id, output })
    }
}});

({ data: { run, ...data }}) => {
                if (run) {
                    try {
                    // sharedWorker.tasks[id].readable //.pipeThough(new TransformStream({transform(watch,observer){ observer.enqueue(watch); }}))
                    // .pipeTo(sharedWorker.tasks[id].writable);
                    } catch(stderr) {
                        port.postMessage({ id, output: { stderr }})
                    }
                }
*/

sharedWorker.onconnect = ({ports:[port]}) => {
    port.onmessage = ({ data: { transformStream, ...input }}) => {    
        if (run) {
            new ReadableStream({ start(stdin) {
                stdin.enqueue(input);
            }}).pipeThrough(new Function(`return ${transformStream}`)(port)).pipeTo(new WritableStream({write(output){
                // the receiver destructures id, [stdout,stderr] } = output
                port.postMessage(output);
            }}))
        }
    }
}