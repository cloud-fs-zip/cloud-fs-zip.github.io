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
const PortStreams = (port) => [
    new ReadableStream({start(output){ 
        port.onmessage = (watch) => output.enqueue(watch);
    }}),
    new WritableStream({
        write(output){ port.postMessage(output); },
        close(){ port.close(); },
    })
];
//const [ReadablePort,WritablePort] = PortStreams(port) 


globalThis.onconnect = ({ports:[port]}) => {
    port.onmessage = async (launch) => {    
        if (data.startsWith('function') || data.startsWith('()')) {
            const [ReadablePort,WritablePort] = PortStreams(port);
            // the receiver destructures [stdout,stderr] } = output
            port.stream = ReadablePort.pipeThrough(
                (await new Function(`return ${launch}`)())
            ).pipeTo(WritablePort);
        } else {
            const exampleFunction = async () => await new TransformStream();
            new Error(`did you forget to postMessage(${exampleFunction})?`)
        }
    }
};

// takes transform,stdin ,output
export const launch = (launch,stdin,output) => {
    const port = new SharedWorker(import.meta.url);
    port.postMessage(launch);
    const [ReadablePort,WritablePort] = PortStreams(port);
    stdin.pipeTo(WritablePort);
    return ReadablePort.pipeTo(output);
};

globalThis.window && launch('()=>new TransformStream()',new ReadableStream({start(stdin){
   globalThis.onmessage = msg => stdin.enqueue(msg);
}}),new WritableStream({write([stdout,stderr]){

}}));

// const port = { 
//     postMessage(msg){globalThis.postMessage(msg)}
// }; 
// PortStreams(port);
// globalThis.onmessage = (msg) => port.onmessage(msg);