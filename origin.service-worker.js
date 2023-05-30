// service worker for the current scope
import serviceWorker from './origin.js';
import * as Comlink from "unpkg/comlink/dist/esm/comlink.mjs";
serviceWorker.onfetch()