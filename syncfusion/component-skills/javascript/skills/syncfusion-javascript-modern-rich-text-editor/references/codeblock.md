# Code Block in Syncfusion JavaScript Modern Rich Text Editor

A code block inserts a `<pre>` element at the current selection and tags it with a language identifier for syntax highlighting. Code blocks are reached through the `CodeBlock` built-in toolbar identifier in the Modern Rich Text Editor. There is no slash-command entry for the code block; users reach it through the toolbar or through the `codeBlock` command.

## Table of contents

- [Commands support](#commands-support)
- [Configuring code block](#configuring-code-block)
- [Keyboard shortcut](#keyboard-shortcut)
- [API references](#api-references)

## Commands support

The `codeBlock` command accepts a `CodeBlockCommand` payload (`{ language: string }`). The `language` value is the language identifier applied to the block — common values include `"javascript"`, `"typescript"`, `"html"`, `"css"`, `"python"`, and `"plaintext"`. An empty string applies a plain code block with no specific language annotation.

| Command | Payload | Toolbar item | Keyboard shortcut |
| --- | --- | --- | --- |
| `codeBlock` | `CodeBlockCommand` (`{ language: string }`) | `CodeBlock` | `Ctrl+Shift+B` (Windows) / `⌘ ⇧ B` (macOS) |

Add the `CodeBlock` toolbar item next to the other block-format buttons to expose the command.

```ts
import { RichTextEditorUI } from '@syncfusion/ej2-richtexteditor-ui';

const editor: RichTextEditorUI = new RichTextEditorUI({
    toolbarSettings: {
        items: [
            'Bold', 'Italic', 'Underline', '|',
            'Formats', 'Alignment', '|',
            'CodeBlock', 'Quote', 'HorizontalLine', '|',
            'Undo', 'Redo'
        ]
    },
    placeholder: 'Insert code snippets...'
});

editor.appendTo('#editor');
```

## Configuring code block

The following example adds `CodeBlock` alongside the other block-format toolbar identifiers (`Quote`, `HorizontalLine`) so the editor exposes the code block through the toolbar only.

```ts
import { RichTextEditorUI } from '@syncfusion/ej2-richtexteditor-ui';

const editor: RichTextEditorUI = new RichTextEditorUI({
    toolbarSettings: {
        items: [
            'Bold', 'Italic', 'Underline', '|',
            'Formats', 'Alignment', '|',
            'CodeBlock', 'Quote', 'HorizontalLine', '|',
            'Undo', 'Redo'
        ]
    },
    placeholder: 'Insert code snippets...'
});

editor.appendTo('#editor');
```

## Keyboard shortcut

The default keyboard shortcut for inserting a code block is `Ctrl+Shift+B` (Windows) / `⌘ ⇧ B` (macOS). To remap the shortcut, override `keyBindings['code-block']` on `toolbarSettings` — see [toolbar.md](toolbar.md) → *Configuring keyboard shortcuts*.

## API references

API types that back the code-block surface, sourced from the Syncfusion EJ2 TypeScript API reference for `@syncfusion/ej2-richtexteditor-ui`.

### `CodeBlockCommandBuilder`

Source: <https://ej2.syncfusion.com/documentation/api/richtexteditor-ui/codeblockcommandbuilder>

Builder for code block command.

#### Methods

- `apply` — Execute the code block command with set options. Returns `void`.
- `language(lang)` — Set the code language.

  | Parameter | Type | Description |
  | --- | --- | --- |
  | `lang` | `string` | The language code to set |

  Returns `this`.