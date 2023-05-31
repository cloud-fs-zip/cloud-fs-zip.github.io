// Serializes messages cross context via BroadcastChannel output merge to readableStream
// Represents the Runtime State Context 
// service worker for the current scope

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

globalThis.onconnect = ({ports:[port]}) => {
    port.onmessage = async (launch) => {    
        if (data.startsWith('function') || data.startsWith('()')) {
            port.stream = new ReadableStream(
                { start(stdin) { port.onmessage = (input) => stdin.enqueue(input); }}
            ).pipeThrough(
                (await new Function(`return ${launch}`)())
            ).pipeTo(
                // the receiver destructures [stdout,stderr] } = output
                new WritableStream({write(output){ port.postMessage(output); }})
            )
        } else {
            const exampleFunction = async () => await new TransformStream();
            new Error(`did you forget to postMessage(${exampleFunction})?`)
        }
    }
};

// takes transform,stdin ,output
export const launch = (launch,stdin,output) => {
    const processor = new SharedWorker(import.meta.url);
    processor.postMessage(launch);
    stdin.pipeTo(new WritableStream({ write(input){ processor.postMessage(input); }}));
    return new ReadableStream({start(output){ 
        processor.onmessage = (watch) => output.enqueue(watch);
    }, close(){processor.close();}})
    .pipeTo(output);
};

globalThis.window && launch('()=>new TransformStream()',new ReadableStream({start(stdin){
   globalThis.onmessage = msg => stdin.enqueue(msg);
}}),new WritableStream({write([stdout,stderr]){

}}));