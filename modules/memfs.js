"use strict";
// the memfs spec is simple path, content when loaded like opfs
exports.__esModule = true;
exports.MemFS = exports.Directory = exports.File = void 0;
var vscode_1 = require("vscode");
var exampleFiles_1 = require("./exampleFiles");
var seed = function (memfs) {
    memfs.createDirectory(vscode_1.Uri.parse("memfs:/sample-folder/"));
    // most common files types
    memfs.writeFile(vscode_1.Uri.parse("memfs:/sample-folder/large.ts"), textEncoder.encode(exampleFiles_1.largeTSFile), { create: true, overwrite: true });
    memfs.writeFile(vscode_1.Uri.parse("memfs:/sample-folder/file.txt"), textEncoder.encode('foo'), { create: true, overwrite: true });
    memfs.writeFile(vscode_1.Uri.parse("memfs:/sample-folder/file.html"), textEncoder.encode('<html><body><h1 class="hd">Hello</h1></body></html>'), { create: true, overwrite: true });
    memfs.writeFile(vscode_1.Uri.parse("memfs:/sample-folder/file.js"), textEncoder.encode('console.log("JavaScript")'), { create: true, overwrite: true });
    memfs.writeFile(vscode_1.Uri.parse("memfs:/sample-folder/file.json"), textEncoder.encode('{ "json": true }'), { create: true, overwrite: true });
    memfs.writeFile(vscode_1.Uri.parse("memfs:/sample-folder/file.ts"), textEncoder.encode('console.log("TypeScript")'), { create: true, overwrite: true });
    memfs.writeFile(vscode_1.Uri.parse("memfs:/sample-folder/file.css"), textEncoder.encode('* { color: green; }'), { create: true, overwrite: true });
    memfs.writeFile(vscode_1.Uri.parse("memfs:/sample-folder/file.md"), textEncoder.encode(exampleFiles_1.debuggableFile), { create: true, overwrite: true });
    memfs.writeFile(vscode_1.Uri.parse("memfs:/sample-folder/file.xml"), textEncoder.encode('<?xml version="1.0" encoding="UTF-8" standalone="yes" ?>'), { create: true, overwrite: true });
    memfs.writeFile(vscode_1.Uri.parse("memfs:/sample-folder/file.py"), textEncoder.encode('import base64, sys; base64.decode(open(sys.argv[1], "rb"), open(sys.argv[2], "wb"))'), { create: true, overwrite: true });
    memfs.writeFile(vscode_1.Uri.parse("memfs:/sample-folder/file.yaml"), textEncoder.encode('- just: write something'), { create: true, overwrite: true });
    memfs.writeFile(vscode_1.Uri.parse("memfs:/sample-folder/file.jpg"), (0, exampleFiles_1.getImageFile)(), { create: true, overwrite: true });
    memfs.writeFile(vscode_1.Uri.parse("memfs:/sample-folder/file.php"), textEncoder.encode('<?php echo "Hello World!"; ?>'), { create: true, overwrite: true });
    // some more files & folders
    memfs.createDirectory(vscode_1.Uri.parse("memfs:/sample-folder/folder/"));
    memfs.createDirectory(vscode_1.Uri.parse("memfs:/sample-folder/workspaces/"));
    memfs.createDirectory(vscode_1.Uri.parse("memfs:/sample-folder/large/"));
    memfs.createDirectory(vscode_1.Uri.parse("memfs:/sample-folder/xyz/"));
    memfs.createDirectory(vscode_1.Uri.parse("memfs:/sample-folder/xyz/abc"));
    memfs.createDirectory(vscode_1.Uri.parse("memfs:/sample-folder/xyz/def"));
    memfs.writeFile(vscode_1.Uri.parse("memfs:/sample-folder/folder/empty.txt"), new Uint8Array(0), { create: true, overwrite: true });
    memfs.writeFile(vscode_1.Uri.parse("memfs:/sample-folder/folder/empty.foo"), new Uint8Array(0), { create: true, overwrite: true });
    memfs.writeFile(vscode_1.Uri.parse("memfs:/sample-folder/folder/file.ts"), textEncoder.encode('let a:number = true; console.log(a);'), { create: true, overwrite: true });
    memfs.writeFile(vscode_1.Uri.parse("memfs:/sample-folder/large/rnd.foo"), randomData(50000), { create: true, overwrite: true });
    memfs.writeFile(vscode_1.Uri.parse("memfs:/sample-folder/xyz/UPPER.txt"), textEncoder.encode('UPPER'), { create: true, overwrite: true });
    memfs.writeFile(vscode_1.Uri.parse("memfs:/sample-folder/xyz/upper.txt"), textEncoder.encode('upper'), { create: true, overwrite: true });
    memfs.writeFile(vscode_1.Uri.parse("memfs:/sample-folder/xyz/def/foo.md"), textEncoder.encode('*MemFS*'), { create: true, overwrite: true });
    memfs.writeFile(vscode_1.Uri.parse("memfs:/sample-folder/workspaces/mem.code-workspace"), textEncoder.encode(JSON.stringify({
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
    memfs.createDirectory(vscode_1.Uri.parse("memfs:/sample-folder/encodings/"));
    memfs.writeFile(vscode_1.Uri.parse("memfs:/sample-folder/encodings/windows1251.txt"), exampleFiles_1.windows1251File, { create: true, overwrite: true });
    memfs.writeFile(vscode_1.Uri.parse("memfs:/sample-folder/encodings/gbk.txt"), exampleFiles_1.gbkFile, { create: true, overwrite: true });
};
var File = /** @class */ (function () {
    function File(uri, name) {
        this.uri = uri;
        this.type = vscode_1.FileType.File;
        this.ctime = Date.now();
        this.mtime = Date.now();
        this.size = 0;
        this.name = name;
    }
    return File;
}());
exports.File = File;
var Directory = /** @class */ (function () {
    function Directory(uri, name) {
        this.uri = uri;
        this.type = vscode_1.FileType.Directory;
        this.ctime = Date.now();
        this.mtime = Date.now();
        this.size = 0;
        this.name = name;
        this.entries = new Map();
    }
    return Directory;
}());
exports.Directory = Directory;
var textEncoder = new TextEncoder();
var MemFS = /** @class */ (function () {
    function MemFS() {
        this.root = new Directory(vscode_1.Uri.parse('memfs:/'), '');
        // --- manage file events
        this._emitter = new vscode_1.EventEmitter();
        this._bufferedEvents = [];
        this.onDidChangeFile = this._emitter.event;
        this._textDecoder = new TextDecoder();
        this.disposable = vscode_1.Disposable.from(vscode_1.workspace.registerFileSystemProvider(MemFS.scheme, this, { isCaseSensitive: true }), vscode_1.workspace.registerFileSearchProvider(MemFS.scheme, this), vscode_1.workspace.registerTextSearchProvider(MemFS.scheme, this));
    }
    MemFS.prototype.dispose = function () {
        var _a;
        (_a = this.disposable) === null || _a === void 0 ? void 0 : _a.dispose();
    };
    MemFS.prototype.seed = function () {
        seed(this);
    };
    // --- manage file metadata
    MemFS.prototype.stat = function (uri) {
        return this._lookup(uri, false);
    };
    MemFS.prototype.readDirectory = function (uri) {
        var entry = this._lookupAsDirectory(uri, false);
        var result = [];
        for (var _i = 0, _a = entry.entries; _i < _a.length; _i++) {
            var _b = _a[_i], name_1 = _b[0], child = _b[1];
            result.push([name_1, child.type]);
        }
        return result;
    };
    // --- manage file contents
    MemFS.prototype.readFile = function (uri) {
        var data = this._lookupAsFile(uri, false).data;
        if (data) {
            return data;
        }
        throw vscode_1.FileSystemError.FileNotFound();
    };
    MemFS.prototype.writeFile = function (uri, content, options) {
        var basename = this._basename(uri.path);
        var parent = this._lookupParentDirectory(uri);
        var entry = parent.entries.get(basename);
        if (entry instanceof Directory) {
            throw vscode_1.FileSystemError.FileIsADirectory(uri);
        }
        if (!entry && !options.create) {
            throw vscode_1.FileSystemError.FileNotFound(uri);
        }
        if (entry && options.create && !options.overwrite) {
            throw vscode_1.FileSystemError.FileExists(uri);
        }
        if (!entry) {
            entry = new File(uri, basename);
            parent.entries.set(basename, entry);
            this._fireSoon({ type: vscode_1.FileChangeType.Created, uri: uri });
        }
        entry.mtime = Date.now();
        entry.size = content.byteLength;
        entry.data = content;
        this._fireSoon({ type: vscode_1.FileChangeType.Changed, uri: uri });
    };
    // --- manage files/folders
    MemFS.prototype.rename = function (oldUri, newUri, options) {
        if (!options.overwrite && this._lookup(newUri, true)) {
            throw vscode_1.FileSystemError.FileExists(newUri);
        }
        var entry = this._lookup(oldUri, false);
        var oldParent = this._lookupParentDirectory(oldUri);
        var newParent = this._lookupParentDirectory(newUri);
        var newName = this._basename(newUri.path);
        oldParent.entries["delete"](entry.name);
        entry.name = newName;
        newParent.entries.set(newName, entry);
        this._fireSoon({ type: vscode_1.FileChangeType.Deleted, uri: oldUri }, { type: vscode_1.FileChangeType.Created, uri: newUri });
    };
    MemFS.prototype["delete"] = function (uri) {
        var dirname = uri["with"]({ path: this._dirname(uri.path) });
        var basename = this._basename(uri.path);
        var parent = this._lookupAsDirectory(dirname, false);
        if (!parent.entries.has(basename)) {
            throw vscode_1.FileSystemError.FileNotFound(uri);
        }
        parent.entries["delete"](basename);
        parent.mtime = Date.now();
        parent.size -= 1;
        this._fireSoon({ type: vscode_1.FileChangeType.Changed, uri: dirname }, { uri: uri, type: vscode_1.FileChangeType.Deleted });
    };
    MemFS.prototype.createDirectory = function (uri) {
        var basename = this._basename(uri.path);
        var dirname = uri["with"]({ path: this._dirname(uri.path) });
        var parent = this._lookupAsDirectory(dirname, false);
        var entry = new Directory(uri, basename);
        parent.entries.set(entry.name, entry);
        parent.mtime = Date.now();
        parent.size += 1;
        this._fireSoon({ type: vscode_1.FileChangeType.Changed, uri: dirname }, { type: vscode_1.FileChangeType.Created, uri: uri });
    };
    MemFS.prototype._lookup = function (uri, silent) {
        var parts = uri.path.split('/');
        var entry = this.root;
        for (var _i = 0, parts_1 = parts; _i < parts_1.length; _i++) {
            var part = parts_1[_i];
            if (!part) {
                continue;
            }
            var child = void 0;
            if (entry instanceof Directory) {
                child = entry.entries.get(part);
            }
            if (!child) {
                if (!silent) {
                    throw vscode_1.FileSystemError.FileNotFound(uri);
                }
                else {
                    return undefined;
                }
            }
            entry = child;
        }
        return entry;
    };
    MemFS.prototype._lookupAsDirectory = function (uri, silent) {
        var entry = this._lookup(uri, silent);
        if (entry instanceof Directory) {
            return entry;
        }
        throw vscode_1.FileSystemError.FileNotADirectory(uri);
    };
    MemFS.prototype._lookupAsFile = function (uri, silent) {
        var entry = this._lookup(uri, silent);
        if (entry instanceof File) {
            return entry;
        }
        throw vscode_1.FileSystemError.FileIsADirectory(uri);
    };
    MemFS.prototype._lookupParentDirectory = function (uri) {
        var dirname = uri["with"]({ path: this._dirname(uri.path) });
        return this._lookupAsDirectory(dirname, false);
    };
    MemFS.prototype.watch = function (_resource) {
        // ignore, fires for all changes...
        return new vscode_1.Disposable(function () { });
    };
    MemFS.prototype._fireSoon = function () {
        var _a;
        var _this = this;
        var events = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            events[_i] = arguments[_i];
        }
        (_a = this._bufferedEvents).push.apply(_a, events);
        if (this._fireSoonHandle) {
            clearTimeout(this._fireSoonHandle);
        }
        this._fireSoonHandle = setTimeout(function () {
            _this._emitter.fire(_this._bufferedEvents);
            _this._bufferedEvents.length = 0;
        }, 5);
    };
    // --- path utils
    MemFS.prototype._basename = function (path) {
        path = this._rtrim(path, '/');
        if (!path) {
            return '';
        }
        return path.substr(path.lastIndexOf('/') + 1);
    };
    MemFS.prototype._dirname = function (path) {
        path = this._rtrim(path, '/');
        if (!path) {
            return '/';
        }
        return path.substr(0, path.lastIndexOf('/'));
    };
    MemFS.prototype._rtrim = function (haystack, needle) {
        if (!haystack || !needle) {
            return haystack;
        }
        var needleLen = needle.length, haystackLen = haystack.length;
        if (needleLen === 0 || haystackLen === 0) {
            return haystack;
        }
        var offset = haystackLen, idx = -1;
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
    };
    MemFS.prototype._getFiles = function () {
        var files = new Set();
        this._doGetFiles(this.root, files);
        return files;
    };
    MemFS.prototype._doGetFiles = function (dir, files) {
        var _this = this;
        dir.entries.forEach(function (entry) {
            if (entry instanceof File) {
                files.add(entry);
            }
            else {
                _this._doGetFiles(entry, files);
            }
        });
    };
    MemFS.prototype._convertSimple2RegExpPattern = function (pattern) {
        return pattern.replace(/[\-\\\{\}\+\?\|\^\$\.\,\[\]\(\)\#\s]/g, '\\$&').replace(/[\*]/g, '.*');
    };
    // --- search provider
    MemFS.prototype.provideFileSearchResults = function (query, _options, _token) {
        return this._findFiles(query.pattern);
    };
    MemFS.prototype._findFiles = function (query) {
        var files = this._getFiles();
        var result = [];
        var pattern = query ? new RegExp(this._convertSimple2RegExpPattern(query)) : null;
        for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
            var file = files_1[_i];
            if (!pattern || pattern.exec(file.name)) {
                result.push(file.uri);
            }
        }
        return result;
    };
    MemFS.prototype.provideTextSearchResults = function (query, options, progress, _token) {
        var result = { limitHit: false };
        var files = this._findFiles(options.includes[0]);
        if (files) {
            for (var _i = 0, files_2 = files; _i < files_2.length; _i++) {
                var file = files_2[_i];
                var content = this._textDecoder.decode(this.readFile(file));
                var lines = content.split('\n');
                for (var i = 0; i < lines.length; i++) {
                    var line = lines[i];
                    var index = line.indexOf(query.pattern);
                    if (index !== -1) {
                        progress.report({
                            uri: file,
                            ranges: new vscode_1.Range(new vscode_1.Position(i, index), new vscode_1.Position(i, index + query.pattern.length)),
                            preview: {
                                text: line,
                                matches: new vscode_1.Range(new vscode_1.Position(0, index), new vscode_1.Position(0, index + query.pattern.length))
                            }
                        });
                    }
                }
            }
        }
        return result;
    };
    MemFS.scheme = 'memfs';
    return MemFS;
}());
exports.MemFS = MemFS;
function randomData(lineCnt, lineLen) {
    if (lineLen === void 0) { lineLen = 155; }
    var lines = [];
    for (var i = 0; i < lineCnt; i++) {
        var line = '';
        while (line.length < lineLen) {
            line += Math.random().toString(2 + (i % 34)).substr(2);
        }
        lines.push(line.substr(0, lineLen));
    }
    return textEncoder.encode(lines.join('\n'));
}
