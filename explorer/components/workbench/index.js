//import('./module.js')
// mkdir node_modules && npm install --prefix $PWD --no-save vscode-web

require.config({
	baseUrl: `${new URL('.',document.location)}node_modules/vscode-web/dist`,
	recordStats: true,
	trustedTypesPolicy: window.trustedTypes?.createPolicy('amdLoader', {
		createScriptURL(value) {
			return value;
		}
	}),
	paths: Object.entries(self.webPackagePaths).map(function ([key, value]) {
		return [key,`${new URL('.',document.location)}node_modules/vscode-web/dist/node_modules/${key}/${value}`];
	}),
});

// TODO: implement typescript server