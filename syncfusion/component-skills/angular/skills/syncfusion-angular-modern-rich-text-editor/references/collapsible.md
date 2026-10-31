# Collapsible Headings

## Table of Contents
- [Overview](#overview)
- [Available types](#available-types)
- [Configuring collapsible headings](#configuring-collapsible-headings)
- [Commands support](#commands-support)
- [API Reference](#api-reference)
  - [CollapsibleCommandBuilder](#collapsiblecommandbuilder)

---

## Overview

Collapsible sections wrap a block of text in an expandable container that the user can expand or collapse. The Modern Rich Text Editor ships five collapsible variants — `Collapsible Paragraph` and `Collapsible Heading 1` through `Collapsible Heading 4`. Collapsible sections are reached **only** through the slash-command popup; there is no dedicated public toolbar item for them.

## Available types

| Type | Slash-command entry | Dispatched payload |
| --- | --- | --- |
| Collapsible Paragraph | `Collapsible Paragraph` | `{ triggerType: 'paragraph' }` |
| Collapsible Heading 1 | `Collapsible Heading 1` | `{ triggerType: 'heading', level: 1 }` |
| Collapsible Heading 2 | `Collapsible Heading 2` | `{ triggerType: 'heading', level: 2 }` |
| Collapsible Heading 3 | `Collapsible Heading 3` | `{ triggerType: 'heading', level: 3 }` |
| Collapsible Heading 4 | `Collapsible Heading 4` | `{ triggerType: 'heading', level: 4 }` |

All five entries funnel through the `collapsible` command with a `ToggleCollapsiblePayload` (`{ triggerType: 'paragraph' | 'heading', level?: 1 | 2 | 3 | 4 }`).

## Configuring collapsible headings

Enable `slashCommandSettings` and list the five collapsible entries in `slashCommandSettings.items` to expose them through the popup. Each entry is a string identifier from `SlashCommandItems`.

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
    public placeholder: string = 'Type / for collapsible sections...';
    public slashCommandSettings: object = {
        enable: true,
        items: [
            'Collapsible Paragraph',
            'Collapsible Heading 1',
            'Collapsible Heading 2',
            'Collapsible Heading 3',
            'Collapsible Heading 4'
        ]
    };
}
```

```html
<ejs-richtexteditor-ui
    [placeholder]="placeholder"
    [slashCommandSettings]="slashCommandSettings">
</ejs-richtexteditor-ui>
```

## Commands support

The `collapsible` command accepts a `ToggleCollapsiblePayload` (`{ triggerType: 'paragraph' | 'heading', level?: 1 | 2 | 3 | 4 }`). The `triggerType` selects between a collapsible paragraph and a collapsible heading; when `triggerType` is `'heading'`, `level` is required and selects the heading level (1–4).

| Slash-command entry | Command | Payload |
| --- | --- | --- |
| `Collapsible Paragraph` | `collapsible` | `{ triggerType: 'paragraph' }` |
| `Collapsible Heading 1` | `collapsible` | `{ triggerType: 'heading', level: 1 }` |
| `Collapsible Heading 2` | `collapsible` | `{ triggerType: 'heading', level: 2 }` |
| `Collapsible Heading 3` | `collapsible` | `{ triggerType: 'heading', level: 3 }` |
| `Collapsible Heading 4` | `collapsible` | `{ triggerType: 'heading', level: 4 }` |
---

## API Reference

### CollapsibleCommandBuilder

Source: <https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/collapsiblecommandbuilder>

Builder for collapsible command.

#### Methods

- `triggerType(type: 'paragraph' | 'heading'): this` — Set trigger type. Returns `this`.
- `level(level: 1 | 2 | 3 | 4): this` — Set heading level (required when `triggerType` is `'heading'`). Returns `this`.
- `apply(): void` — Execute the collapsible command. Returns `void`.
