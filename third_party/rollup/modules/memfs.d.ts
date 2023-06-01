// @ts-ignore
import { CancellationToken, Disposable, Event, FileChangeEvent, FileSearchOptions, FileSearchProvider, FileSearchQuery, FileStat, FileSystemProvider, FileType, Progress, ProviderResult, TextSearchOptions, TextSearchQuery, TextSearchProvider, TextSearchResult, Uri } from 'vscode';
export declare class File implements FileStat {
    uri: Uri;
    type: FileType;
    ctime: number;
    mtime: number;
    size: number;
    name: string;
    data?: Uint8Array;
    constructor(uri: Uri, name: string);
}
export declare class Directory implements FileStat {
    uri: Uri;
    type: FileType;
    ctime: number;
    mtime: number;
    size: number;
    name: string;
    entries: Map<string, File | Directory>;
    constructor(uri: Uri, name: string);
}
export declare type Entry = File | Directory;
export declare class MemFS implements FileSystemProvider, FileSearchProvider, TextSearchProvider, Disposable {
    static scheme: string;
    private readonly disposable;
    constructor();
    dispose(): void;
    seed(): void;
    root: Directory;
    stat(uri: Uri): FileStat;
    readDirectory(uri: Uri): [string, FileType][];
    readFile(uri: Uri): Uint8Array;
    writeFile(uri: Uri, content: Uint8Array, options: {
        create: boolean;
        overwrite: boolean;
    }): void;
    rename(oldUri: Uri, newUri: Uri, options: {
        overwrite: boolean;
    }): void;
    delete(uri: Uri): void;
    createDirectory(uri: Uri): void;
    private _lookup;
    private _lookupAsDirectory;
    private _lookupAsFile;
    private _lookupParentDirectory;
    private _emitter;
    private _bufferedEvents;
    private _fireSoonHandle?;
    readonly onDidChangeFile: Event<FileChangeEvent[]>;
    watch(_resource: Uri): Disposable;
    private _fireSoon;
    private _basename;
    private _dirname;
    private _rtrim;
    private _getFiles;
    private _doGetFiles;
    private _convertSimple2RegExpPattern;
    provideFileSearchResults(query: FileSearchQuery, _options: FileSearchOptions, _token: CancellationToken): ProviderResult<Uri[]>;
    private _findFiles;
    private _textDecoder;
    // @ts-ignore
    provideTextSearchResults(query: TextSearchQuery, options: TextSearchOptions, progress: Progress<TextSearchResult>, _token: CancellationToken): TextSearchComplete;
}
