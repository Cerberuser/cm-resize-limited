# cm-resize-limited
Add a resize handle to your CodeMirror editor. Forked from [Sphinxxxx/cm-resize](https://github.com/Sphinxxxx/cm-resize), with some small improvements.

## Getting Started

#### Installing

* NPM:

  + ```npm install cm-resize-limited --save```
  + ```import cmResize from 'cm-resize-limited';```

#### Usage

```javascript
const myCodeMirror = CodeMirror.fromTextArea(element, options);  //..or some other way to create a CodeMirror instance
cmResize(myCodeMirror);
```


## Options

```javascript
const handle = cmResize(myCodeMirror, {
    minWidth:  200,               // Minimum size of the CodeMirror editor.
    minHeight: 100,
    
    maxWidth:  400,               // Maximum size of the CodeMirror editor.
    maxHeight: 800,

    resizableWidth:  true,        // In which direction the editor can be resized (default: both width and height).
    resizableHeight: true,

    cssClass: 'cm-resize-handle', // CSS class to use on the *default* resize handle.
    handle: someElement,          // An element to use as the handler instead of the default one (`cssClass` doesn't apply here).
});
```
