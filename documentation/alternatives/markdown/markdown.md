# Markdown
markdown is a nice text format to create and store text to get rendered as html later
it saves a lot of storage place and is highly efficent parse able while staying readable

the notebook format jupyther which includes the lagcy lang reference to python

got replaced by the .stealify format which is highly compatible with the jupyther format.

it mainly gets parsed out of JS Syntax Tree which is also usefull to apply universal rules
for code excution of needed.

it is like js but with optional markdown comments

```ts
/** @markdown {id}  
 * 
 * 
*/

/** @md {id}  
 
*/
```

lines starting with * will star will get skiped from markdown rendering by default you can define the handling in a custom renderer always.
keeping code and comments in sync is a highly needed thing so stealify offers additional via its internal versioning algorythm so called code tours
which allow a interactive walk through the code base and or changes if needed. as a .stealify file is designed to get used in a cloud-fs.zip
environment via loading it a stealify(.getFile()).run(input,output,stderr) or input.pipeThrough(.module("name")).pipeTo()

