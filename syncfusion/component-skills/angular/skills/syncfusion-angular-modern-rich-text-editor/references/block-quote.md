# Block Quote

## Table of Contents
- [Overview](#overview)
- [Commands support](#commands-support)
- [Configuration example](#configuration-example)

---

## Overview

A block quote wraps the current block in a `<blockquote>` element to visually set it apart from surrounding text. The Modern Rich Text Editor exposes the block quote through the `Quote` built-in toolbar identifier and through the `Blockquote` slash-command entry.

## Commands support

The `blockQuote` command does not require a payload. It toggles a blockquote on the current selection: invoking it on a plain paragraph wraps it in a blockquote, and invoking it again on the resulting blockquote unwraps it.

| Command | Payload | Toolbar item | Slash-command entry |
| --- | --- | --- | --- |
| `blockQuote` | — | `Quote` | `Blockquote` |

## Configuration example

Add the `Quote` toolbar item alongside the other block-format buttons, and add `Blockquote` to [`slashCommandSettings.items`](https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/slashcommandsettings#items) if you want to expose it through the slash-command popup as well.

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
    public placeholder: string = 'Quote a passage...';
    public toolbarSettings: object = {
        items: [
            'Bold', 'Italic', 'Underline', '|',
            'Formats', 'Alignment', '|',
            'Quote', 'CodeBlock', '|',
            'Undo', 'Redo'
        ]
    };
    public slashCommandSettings: object = {
        enable: true,
        items: ['Blockquote']
    };
}
```

```html
<ejs-richtexteditor-ui
    [placeholder]="placeholder"
    [toolbarSettings]="toolbarSettings"
    [slashCommandSettings]="slashCommandSettings">
</ejs-richtexteditor-ui>
```