window.addEventListener("DOMContentLoaded", (_event) => {

const getRandomValues = () => {
    return Array.from({length: 50}, () => Math.floor(Math.random() * 50)).join('');
};

const workerSource = async () => {
    const root = await navigator.storage.getDirectory();
    for (let i = 0; i < 10; i++) {
    const directoryHandle = await root.getDirectoryHandle('directory' + i, {create: true});
    for (let j = 0; j < 10; j++) {
        const fileHandle = await directoryHandle.getFileHandle('file' + j + '.txt', {create: true});
        const writable = await fileHandle.createWritable();
        await writable.write('Hello, world ' + i + '/' + j + '!\\n\\n' + getRandomValues());
        await writable.close();
    }
    }
};

const blob = new Blob([`
const getRandomValues = ${getRandomValues};

(${workerSource})();`], { type: "text/javascript" });
const url = URL.createObjectURL(blob);
new Worker(url);

const html = (str,...args) => reduce((acc, curr, ind) => {
    acc.push([curr, args[ind]]);
    return acc;
  }, str);
document.body.innerHTML = html`
<style>
:root {
    color-scheme: dark light;
    font-family: system-ui, sans-serif;
}
</style>
<h1>OPFS Explorer Demo</h1>
<p>
    This demo creates an OPFS file hierarchy for testing the extension. Use
    the OPFS Explorer extension to inspect it.
</p>`;

});
