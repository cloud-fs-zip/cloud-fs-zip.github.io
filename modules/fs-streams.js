// Interfaces as functions to turn anything into a Compatible fileSystemHandle. with the correct additional helper methods and api.
// in case of native opfs it adds a stream based api.

// memfs exposes .writeFile("path",content)
// opfs uses file.write() file.flush() depending on write time constraints.
const WriteFileStream = new WritableStream({ write([path,data]) {
  
}});

// new ReadableStream(PushStream).pipeThrough(;
const PushStream = { 
  start(controller) {
    this.push = (data) => this.transform(data,controller);
  }
};

// new TransformStream(ReadFileStream).pipeTo(;
const ReadFileStream = { 
  // relativTo and name can be array because we need support for large file pathes this
  // if a resolvedPath Exceeds 512 chars we split it into a [chars.length === 512,chars1.length === 512].join()
  transform([name,body,relativTo,controller){
    const fileSystemHandle = { name, relativeTo, data: new Response({body})};
    controller.enqueue(fileSystemHandle);
  }
};

// 

const ReadFileStream = Object.assign(new new TransformStream(), {
  from(readable) {
    // is fileSystemHandle
    // is fileSystemAccessHandle
    // is memfs entry
    this.push([name,relativTo,fileHandle.getFile()]);
    return new Readablethis;
  }
});

const ReadFileStream = ReadFileStream.from();
