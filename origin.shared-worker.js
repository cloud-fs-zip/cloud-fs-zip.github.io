// Serializes messages cross context via BroadcastChannel output merge to readableStream
// Represents the Runtime State Context 
// service worker for the current scope
import * as Comlink from "unpkg/comlink/dist/esm/comlink.mjs";

const sharedWorker = origin.sharedWorkers[import.meta.url];


Comlink.expose(sharedWorker)