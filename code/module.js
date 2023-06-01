/** Render the content. */
// <!-- Startup (do not modify order of script tags!) -->
//const scope = new URL('.',import.meta.url);
const baseUrl = new URL('./node_modules/code-oss/out',import.meta.url); // uses base from html
const codeOssUrl = './vs';
//globalThis.global = globalThis;

	
const paths = await fetch('/code-oss/out/vs/webPackagePaths.js').then(
r=>r.text()).then(text=>Object.fromEntries(Object.entries(
new Function('return ' + text.split('\n',1)[0].slice(
'"use strict";self.webPackagePaths='.length,
-1))()
).map(([key,value]) => [key,`../node_modules/${key}/${value}`])));
	
//await fetch(`${codeOssUrl}/loader.js`).then(r=>r.text()).then((fnBody)=>new Function(fnBody).call(globalThis));
//await fetch(`${codeOssUrl}/webPackagePaths.js`).then(r=>r.text()).then((fnBody)=>new Function(fnBody).call(globalThis));
const loadScript = async (scriptBody) => new Function(await scriptBody).call(globalThis);
// await loadScript(fetch(`${codeOssUrl}/loader.js`).then(r=>r.text())).then(
//async () => {
	//console.log('works', webPackagePaths)
	
	globalThis.require.config({
		baseUrl, recordStats: true,
		trustedTypesPolicy: window.trustedTypes?.createPolicy('amdLoader', { 
			createScriptURL: (value) => value }),
		paths,
	});
	await [`${'./code-oss/out/vs'}/workbench/workbench.web.main.nls.js`,
	`${'./code-oss/out/vs'}/workbench/workbench.web.main.js`,
	`${'./code-oss/out/vs'}/code/browser/workbench/workbench.js`]
    .reduce((p,specifier)=>(p=p.then(loadScript(fetch(specifier).then(r=>r.text())))),Promise.resolve())
    //.reduce((p,specifier)=>(p=p.then(import(specifier))),Promise.resolve())
    

// });

//navigator.serviceWorker && navigator.serviceWorker.register(import.meta.url)
//caches.add.all
export {}