# Stealify Lang
is a ECMAScript Template Strings and the tagged template Strings variant inspired language implementation framework
it is streambased and gets used as modular SDK and build block for own language implementations that are highly readable
and AST based

## Learn from examples
Your maybe familar with bash

```
const bash = (bashShellStr,stdin,stdout,stderr) => {
 // `${bashShellStr.split('|')}` // returns the parts 
 bashShellStr.split('|').reduce((input,output)=>{output = output.pipeThrough(eval(output))},eval(stdin))
 .pipeTo(new WriteableStream({write(output){
    output?.stderr.pipeTo(stderr);
    output?.stdout.pipeTo(stdout);
 }}));
}

// bash('fetch("")')
```