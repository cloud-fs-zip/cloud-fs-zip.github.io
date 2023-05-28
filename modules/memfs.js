// the memfs spec is simple path, content when loaded like opfs
import { Disposable, EventEmitter, FileChangeType, FileSystemError, FileType, Position, Range, Uri, workspace, } from 'vscode';
import { largeTSFile, getImageFile, debuggableFile, windows1251File, gbkFile } from './exampleFiles';
const seed = (memfs) => {
    memfs.createDirectory(Uri.parse(`memfs:/sample-folder/`));
    // most common files types
    memfs.writeFile(Uri.parse(`memfs:/sample-folder/large.ts`), textEncoder.encode(largeTSFile), { create: true, overwrite: true });
    memfs.writeFile(Uri.parse(`memfs:/sample-folder/file.txt`), textEncoder.encode('foo'), { create: true, overwrite: true });
    memfs.writeFile(Uri.parse(`memfs:/sample-folder/file.html`), textEncoder.encode('<html><body><h1 class="hd">Hello</h1></body></html>'), { create: true, overwrite: true });
    memfs.writeFile(Uri.parse(`memfs:/sample-folder/file.js`), textEncoder.encode('console.log("JavaScript")'), { create: true, overwrite: true });
    memfs.writeFile(Uri.parse(`memfs:/sample-folder/file.json`), textEncoder.encode('{ "json": true }'), { create: true, overwrite: true });
    memfs.writeFile(Uri.parse(`memfs:/sample-folder/file.ts`), textEncoder.encode('console.log("TypeScript")'), { create: true, overwrite: true });
    memfs.writeFile(Uri.parse(`memfs:/sample-folder/file.css`), textEncoder.encode('* { color: green; }'), { create: true, overwrite: true });
    memfs.writeFile(Uri.parse(`memfs:/sample-folder/file.md`), textEncoder.encode(debuggableFile), { create: true, overwrite: true });
    memfs.writeFile(Uri.parse(`memfs:/sample-folder/file.xml`), textEncoder.encode('<?xml version="1.0" encoding="UTF-8" standalone="yes" ?>'), { create: true, overwrite: true });
    memfs.writeFile(Uri.parse(`memfs:/sample-folder/file.py`), textEncoder.encode('import base64, sys; base64.decode(open(sys.argv[1], "rb"), open(sys.argv[2], "wb"))'), { create: true, overwrite: true });
    memfs.writeFile(Uri.parse(`memfs:/sample-folder/file.yaml`), textEncoder.encode('- just: write something'), { create: true, overwrite: true });
    memfs.writeFile(Uri.parse(`memfs:/sample-folder/file.jpg`), getImageFile(), { create: true, overwrite: true });
    memfs.writeFile(Uri.parse(`memfs:/sample-folder/file.php`), textEncoder.encode('<?php echo "Hello World!"; ?>'), { create: true, overwrite: true });
    // some more files & folders
    memfs.createDirectory(Uri.parse(`memfs:/sample-folder/folder/`));
    memfs.createDirectory(Uri.parse(`memfs:/sample-folder/workspaces/`));
    memfs.createDirectory(Uri.parse(`memfs:/sample-folder/large/`));
    memfs.createDirectory(Uri.parse(`memfs:/sample-folder/xyz/`));
    memfs.createDirectory(Uri.parse(`memfs:/sample-folder/xyz/abc`));
    memfs.createDirectory(Uri.parse(`memfs:/sample-folder/xyz/def`));
    memfs.writeFile(Uri.parse(`memfs:/sample-folder/folder/empty.txt`), new Uint8Array(0), { create: true, overwrite: true });
    memfs.writeFile(Uri.parse(`memfs:/sample-folder/folder/empty.foo`), new Uint8Array(0), { create: true, overwrite: true });
    memfs.writeFile(Uri.parse(`memfs:/sample-folder/folder/file.ts`), textEncoder.encode('let a:number = true; console.log(a);'), { create: true, overwrite: true });
    memfs.writeFile(Uri.parse(`memfs:/sample-folder/large/rnd.foo`), randomData(50000), { create: true, overwrite: true });
    memfs.writeFile(Uri.parse(`memfs:/sample-folder/xyz/UPPER.txt`), textEncoder.encode('UPPER'), { create: true, overwrite: true });
    memfs.writeFile(Uri.parse(`memfs:/sample-folder/xyz/upper.txt`), textEncoder.encode('upper'), { create: true, overwrite: true });
    memfs.writeFile(Uri.parse(`memfs:/sample-folder/xyz/def/foo.md`), textEncoder.encode('*MemFS*'), { create: true, overwrite: true });
    memfs.writeFile(Uri.parse(`memfs:/sample-folder/workspaces/mem.code-workspace`), textEncoder.encode(JSON.stringify({
        "folders": [
            {
                "name": "sample-folder-large",
                "uri": "memfs:/sample-folder/large"
            },
            {
                "name": "sample-folder-xyz",
                "uri": "memfs:/sample-folder/xyz"
            },
            {
                "name": "sample-folder-folder",
                "uri": "memfs:/sample-folder/folder"
            }
        ]
    }, undefined, '\t')), { create: true, overwrite: true });
    // some files in different encodings
    memfs.createDirectory(Uri.parse(`memfs:/sample-folder/encodings/`));
    memfs.writeFile(Uri.parse(`memfs:/sample-folder/encodings/windows1251.txt`), windows1251File, { create: true, overwrite: true });
    memfs.writeFile(Uri.parse(`memfs:/sample-folder/encodings/gbk.txt`), gbkFile, { create: true, overwrite: true });
};
export class File {
    uri;
    type;
    ctime;
    mtime;
    size;
    name;
    data;
    constructor(uri, name) {
        this.uri = uri;
        this.type = FileType.File;
        this.ctime = Date.now();
        this.mtime = Date.now();
        this.size = 0;
        this.name = name;
    }
}
export class Directory {
    uri;
    type;
    ctime;
    mtime;
    size;
    name;
    entries;
    constructor(uri, name) {
        this.uri = uri;
        this.type = FileType.Directory;
        this.ctime = Date.now();
        this.mtime = Date.now();
        this.size = 0;
        this.name = name;
        this.entries = new Map();
    }
}
const textEncoder = new TextEncoder();
export class MemFS {
    static scheme = 'memfs';
    disposable;
    constructor() {
        this.disposable = Disposable.from(workspace.registerFileSystemProvider(MemFS.scheme, this, { isCaseSensitive: true }), workspace.registerFileSearchProvider(MemFS.scheme, this), workspace.registerTextSearchProvider(MemFS.scheme, this));
    }
    dispose() {
        this.disposable?.dispose();
    }
    seed() {
        seed(this);
    }
    root = new Directory(Uri.parse('memfs:/'), '');
    // --- manage file metadata
    stat(uri) {
        return this._lookup(uri, false);
    }
    readDirectory(uri) {
        const entry = this._lookupAsDirectory(uri, false);
        let result = [];
        for (const [name, child] of entry.entries) {
            result.push([name, child.type]);
        }
        return result;
    }
    // --- manage file contents
    readFile(uri) {
        const data = this._lookupAsFile(uri, false).data;
        if (data) {
            return data;
        }
        throw FileSystemError.FileNotFound();
    }
    writeFile(uri, content, options) {
        let basename = this._basename(uri.path);
        let parent = this._lookupParentDirectory(uri);
        let entry = parent.entries.get(basename);
        if (entry instanceof Directory) {
            throw FileSystemError.FileIsADirectory(uri);
        }
        if (!entry && !options.create) {
            throw FileSystemError.FileNotFound(uri);
        }
        if (entry && options.create && !options.overwrite) {
            throw FileSystemError.FileExists(uri);
        }
        if (!entry) {
            entry = new File(uri, basename);
            parent.entries.set(basename, entry);
            this._fireSoon({ type: FileChangeType.Created, uri });
        }
        entry.mtime = Date.now();
        entry.size = content.byteLength;
        entry.data = content;
        this._fireSoon({ type: FileChangeType.Changed, uri });
    }
    // --- manage files/folders
    rename(oldUri, newUri, options) {
        if (!options.overwrite && this._lookup(newUri, true)) {
            throw FileSystemError.FileExists(newUri);
        }
        let entry = this._lookup(oldUri, false);
        let oldParent = this._lookupParentDirectory(oldUri);
        let newParent = this._lookupParentDirectory(newUri);
        let newName = this._basename(newUri.path);
        oldParent.entries.delete(entry.name);
        entry.name = newName;
        newParent.entries.set(newName, entry);
        this._fireSoon({ type: FileChangeType.Deleted, uri: oldUri }, { type: FileChangeType.Created, uri: newUri });
    }
    delete(uri) {
        let dirname = uri.with({ path: this._dirname(uri.path) });
        let basename = this._basename(uri.path);
        let parent = this._lookupAsDirectory(dirname, false);
        if (!parent.entries.has(basename)) {
            throw FileSystemError.FileNotFound(uri);
        }
        parent.entries.delete(basename);
        parent.mtime = Date.now();
        parent.size -= 1;
        this._fireSoon({ type: FileChangeType.Changed, uri: dirname }, { uri, type: FileChangeType.Deleted });
    }
    createDirectory(uri) {
        let basename = this._basename(uri.path);
        let dirname = uri.with({ path: this._dirname(uri.path) });
        let parent = this._lookupAsDirectory(dirname, false);
        let entry = new Directory(uri, basename);
        parent.entries.set(entry.name, entry);
        parent.mtime = Date.now();
        parent.size += 1;
        this._fireSoon({ type: FileChangeType.Changed, uri: dirname }, { type: FileChangeType.Created, uri });
    }
    _lookup(uri, silent) {
        let parts = uri.path.split('/');
        let entry = this.root;
        for (const part of parts) {
            if (!part) {
                continue;
            }
            let child;
            if (entry instanceof Directory) {
                child = entry.entries.get(part);
            }
            if (!child) {
                if (!silent) {
                    throw FileSystemError.FileNotFound(uri);
                }
                else {
                    return undefined;
                }
            }
            entry = child;
        }
        return entry;
    }
    _lookupAsDirectory(uri, silent) {
        let entry = this._lookup(uri, silent);
        if (entry instanceof Directory) {
            return entry;
        }
        throw FileSystemError.FileNotADirectory(uri);
    }
    _lookupAsFile(uri, silent) {
        let entry = this._lookup(uri, silent);
        if (entry instanceof File) {
            return entry;
        }
        throw FileSystemError.FileIsADirectory(uri);
    }
    _lookupParentDirectory(uri) {
        const dirname = uri.with({ path: this._dirname(uri.path) });
        return this._lookupAsDirectory(dirname, false);
    }
    // --- manage file events
    _emitter = new EventEmitter();
    _bufferedEvents = [];
    _fireSoonHandle;
    onDidChangeFile = this._emitter.event;
    watch(_resource) {
        // ignore, fires for all changes...
        return new Disposable(() => { });
    }
    _fireSoon(...events) {
        this._bufferedEvents.push(...events);
        if (this._fireSoonHandle) {
            clearTimeout(this._fireSoonHandle);
        }
        this._fireSoonHandle = setTimeout(() => {
            this._emitter.fire(this._bufferedEvents);
            this._bufferedEvents.length = 0;
        }, 5);
    }
    // --- path utils
    _basename(path) {
        path = this._rtrim(path, '/');
        if (!path) {
            return '';
        }
        return path.substr(path.lastIndexOf('/') + 1);
    }
    _dirname(path) {
        path = this._rtrim(path, '/');
        if (!path) {
            return '/';
        }
        return path.substr(0, path.lastIndexOf('/'));
    }
    _rtrim(haystack, needle) {
        if (!haystack || !needle) {
            return haystack;
        }
        const needleLen = needle.length, haystackLen = haystack.length;
        if (needleLen === 0 || haystackLen === 0) {
            return haystack;
        }
        let offset = haystackLen, idx = -1;
        while (true) {
            idx = haystack.lastIndexOf(needle, offset - 1);
            if (idx === -1 || idx + needleLen !== offset) {
                break;
            }
            if (idx === 0) {
                return '';
            }
            offset = idx;
        }
        return haystack.substring(0, offset);
    }
    _getFiles() {
        const files = new Set();
        this._doGetFiles(this.root, files);
        return files;
    }
    _doGetFiles(dir, files) {
        dir.entries.forEach(entry => {
            if (entry instanceof File) {
                files.add(entry);
            }
            else {
                this._doGetFiles(entry, files);
            }
        });
    }
    _convertSimple2RegExpPattern(pattern) {
        return pattern.replace(/[\-\\\{\}\+\?\|\^\$\.\,\[\]\(\)\#\s]/g, '\\$&').replace(/[\*]/g, '.*');
    }
    // --- search provider
    provideFileSearchResults(query, _options, _token) {
        return this._findFiles(query.pattern);
    }
    _findFiles(query) {
        const files = this._getFiles();
        const result = [];
        const pattern = query ? new RegExp(this._convertSimple2RegExpPattern(query)) : null;
        for (const file of files) {
            if (!pattern || pattern.exec(file.name)) {
                result.push(file.uri);
            }
        }
        return result;
    }
    _textDecoder = new TextDecoder();
    provideTextSearchResults(query, options, progress, _token) {
        const result = { limitHit: false };
        const files = this._findFiles(options.includes[0]);
        if (files) {
            for (const file of files) {
                const content = this._textDecoder.decode(this.readFile(file));
                const lines = content.split('\n');
                for (let i = 0; i < lines.length; i++) {
                    const line = lines[i];
                    const index = line.indexOf(query.pattern);
                    if (index !== -1) {
                        progress.report({
                            uri: file,
                            ranges: new Range(new Position(i, index), new Position(i, index + query.pattern.length)),
                            preview: {
                                text: line,
                                matches: new Range(new Position(0, index), new Position(0, index + query.pattern.length))
                            }
                        });
                    }
                }
            }
        }
        return result;
    }
}
function randomData(lineCnt, lineLen = 155) {
    let lines = [];
    for (let i = 0; i < lineCnt; i++) {
        let line = '';
        while (line.length < lineLen) {
            line += Math.random().toString(2 + (i % 34)).substr(2);
        }
        lines.push(line.substr(0, lineLen));
    }
    return textEncoder.encode(lines.join('\n'));
}
