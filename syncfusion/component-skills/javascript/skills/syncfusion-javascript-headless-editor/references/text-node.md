# Text Node

The `textExtension` registers the inline `text` node used to represent plain textual content. The `text` node is used inside block nodes such as paragraphs, headings, and blockquotes, and is a mandatory part of the editor schema.

## Table of Contents

- [Register the extension](#register-the-extension)

## Register the extension

The `text` extension has no configurable options. Add it to the `extensions` array when initializing the editor.

```ts
import { HeadlessEditor, textExtension } from '@syncfusion/ej2-headless-editor';

const editor = HeadlessEditor.create({
    extensions: [textExtension]
});
editor.mount(document.getElementById('editor') as HTMLElement);
```

> The Headless Editor automatically adds the required `document` and `text` extensions if they are not registered. Marks such as bold, italic, or links are applied on top of `text` nodes.
