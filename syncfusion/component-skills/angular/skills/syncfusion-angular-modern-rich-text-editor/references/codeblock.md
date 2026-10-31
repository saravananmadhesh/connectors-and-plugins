# Code Block

## Table of Contents
- [Overview](#overview)
- [Commands support](#commands-support)
- [Configuration example](#configuration-example)
- [Keyboard shortcut](#keyboard-shortcut)
- [API Reference](#api-reference)
  - [CodeBlockCommandBuilder](#codeblockcommandbuilder)

---

## Overview

A code block inserts a `<pre>` element at the current selection and tags it with a language identifier for syntax highlighting. Code blocks are reached through the `CodeBlock` built-in toolbar identifier in the Modern Rich Text Editor. There is no slash-command entry for the code block; users reach it through the toolbar or through the `codeBlock` command.

## Commands support

The `codeBlock` command accepts a `CodeBlockCommand` payload (`{ language: string }`). The `language` value is the language identifier applied to the block — common values include `"javascript"`, `"typescript"`, `"html"`, `"css"`, `"python"`, and `"plaintext"`. An empty string applies a plain code block with no specific language annotation.

| Command | Payload | Toolbar item | Keyboard shortcut |
| --- | --- | --- | --- |
| `codeBlock` | `CodeBlockCommand` (`{ language: string }`) | `CodeBlock` | `Ctrl+Shift+B` (Windows) / `⌘ ⇧ B` (macOS) |

## Configuration example

Add the `CodeBlock` toolbar item next to the other block-format buttons to expose the command.

```ts
import { Component } from '@angular/core';
import { RichTextEditorUIModule, SlashCommandService } from '@syncfusion/ej2-angular-richtexteditor-ui';

@Component({
    imports: [RichTextEditorUIModule],
    standalone: true,
    selector: 'app-root',
    providers: [SlashCommandService],
    templateUrl: './app.component.html'
})
export class App {
    public placeholder: string = 'Insert code snippets...';
    public toolbarSettings: object = {
        items: [
            'Bold', 'Italic', 'Underline', '|',
            'Formats', 'Alignment', '|',
            'CodeBlock', 'Quote', 'HorizontalLine', '|',
            'Undo', 'Redo'
        ]
    };
}
```

```html
<ejs-richtexteditor-ui
    [placeholder]="placeholder"
    [toolbarSettings]="toolbarSettings">
</ejs-richtexteditor-ui>
```

## Keyboard shortcut

| Action | Windows / Linux | macOS | Description |
| :--- | :--- | :--- | :--- |
| **Code Block** | <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>B</kbd> | <kbd>⌘</kbd> + <kbd>Shift</kbd> + <kbd>B</kbd> | Converts the block into a preformatted code snippet. |
---

## API Reference

### CodeBlockCommandBuilder

Source: <https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/codeblockcommandbuilder>

Builder for code block command.

#### Methods

- `language(lang: string): this` — Set the code language. Parameter `lang`: The language code to set (e.g. `'javascript'`, `'typescript'`, `'html'`, `'css'`, `'python'`, `'plaintext'`). Returns `this`.
- `apply(): void` — Execute the code block command with set options. Returns `void`.
