# Block Quote in Syncfusion JavaScript Modern Rich Text Editor

A block quote wraps the current block in a `<blockquote>` element to visually set it apart from surrounding text. The Modern Rich Text Editor exposes the block quote through the `Quote` built-in toolbar identifier and through the `Blockquote` slash-command entry.

## Table of contents

- [Commands support](#commands-support)
- [Configuring block quote](#configuring-block-quote)

## Commands support

The `blockQuote` command does not require a payload. It toggles a blockquote on the current selection: invoking it on a plain paragraph wraps it in a blockquote, and invoking it again on the resulting blockquote unwraps it.

| Command | Payload | Toolbar item | Slash-command entry |
| --- | --- | --- | --- |
| `blockQuote` | — | `Quote` | `Blockquote` |

## Configuring block quote

Add the `Quote` toolbar item alongside the other block-format buttons, and add `Blockquote` to `slashCommandSettings.items` if you want to expose it through the slash-command popup as well.

```ts
import { RichTextEditorUI, SlashCommand } from '@syncfusion/ej2-richtexteditor-ui';

RichTextEditorUI.Inject(SlashCommand);

const editor: RichTextEditorUI = new RichTextEditorUI({
    toolbarSettings: {
        items: [
            'Bold', 'Italic', 'Underline', '|',
            'Formats', 'Alignment', '|',
            'Quote', 'CodeBlock', '|',
            'Undo', 'Redo'
        ]
    },
    slashCommandSettings: {
        enable: true,
        items: ['Blockquote']
    },
    placeholder: 'Quote a passage...'
});

editor.appendTo('#editor');
```