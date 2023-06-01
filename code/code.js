//import('./module.js')
// mkdir node_modules && npm install --prefix $PWD vscode-web
Object.entries(self.webPackagePaths).map(([key, value]) => 
self.webPackagePaths[key] = `${new URL(`./node_modules/vscode-web/dist/node_modules/${key}/${value}`,window.location)}`);
console.log(self.webPackagePaths)
	require.config({
	baseUrl: `${new URL('./node_modules/vscode-web/dist/out/',window.location)}`,
	recordStats: true,
	trustedTypesPolicy: window.trustedTypes?.createPolicy('amdLoader', {
		createScriptURL(value) {
			return value;
		}
	}),
	paths: self.webPackagePaths,
});
// TODO: implement typescript server