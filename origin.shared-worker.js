// Serializes messages cross context via BroadcastChannel output merge to readableStream
// Represents the Runtime State Context 
// service worker for the current scope
import sharedWorker from './origin.js';
import * as Comlink from "unpkg/comlink/dist/esm/comlink.mjs";
serviceWorker.onfetch()
sharedWorker.sharedWorkers[import.meta.url]
Comlink.expose(serviceWorker)