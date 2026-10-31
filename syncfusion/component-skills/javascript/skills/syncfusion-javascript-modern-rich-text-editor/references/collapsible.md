# Collapsible Sections in Syncfusion JavaScript Modern Rich Text Editor

Collapsible sections wrap a block of text in a expandable container that the user can expand or collapse. The Modern Rich Text Editor ships five collapsible variants — `Collapsible Paragraph` and `Collapsible Heading 1` through `Collapsible Heading 4`. Collapsible sections are reached **only** through the slash-command popup; there is no dedicated public toolbar item for them.

## Table of contents

- [Available types](#available-types)
- [Configuring collapsible sections](#configuring-collapsible-sections)
- [Commands support](#commands-support)
- [API references](#api-references)

## Available types

| Type | Slash-command entry | Dispatched payload |
| --- | --- | --- |
| Collapsible Paragraph | `Collapsible Paragraph` | `{ triggerType: 'paragraph' }` |
| Collapsible Heading 1 | `Collapsible Heading 1` | `{ triggerType: 'heading', level: 1 }` |
| Collapsible Heading 2 | `Collapsible Heading 2` | `{ triggerType: 'heading', level: 2 }` |
| Collapsible Heading 3 | `Collapsible Heading 3` | `{ triggerType: 'heading', level: 3 }` |
| Collapsible Heading 4 | `Collapsible Heading 4` | `{ triggerType: 'heading', level: 4 }` |

All five entries funnel through the `collapsible` command with a `ToggleCollapsiblePayload` (`{ triggerType: 'paragraph' | 'heading', level?: 1 | 2 | 3 | 4 }`).

## Configuring collapsible sections

Enable `slashCommandSettings` and list the five collapsible entries in `slashCommandSettings.items` to expose them through the popup. Each entry is a string identifier from `SlashCommandItems`.

```ts
import { RichTextEditorUI, SlashCommand } from '@syncfusion/ej2-richtexteditor-ui';

RichTextEditorUI.Inject(SlashCommand);

const editor: RichTextEditorUI = new RichTextEditorUI({
    slashCommandSettings: {
        enable: true,
        items: [
            'Collapsible Paragraph',
            'Collapsible Heading 1',
            'Collapsible Heading 2',
            'Collapsible Heading 3',
            'Collapsible Heading 4'
        ]
    },
    placeholder: 'Type / for collapsible sections...'
});

editor.appendTo('#editor');
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

## API references

API types that back the collapsible surface, sourced from the Syncfusion EJ2 TypeScript API reference for `@syncfusion/ej2-richtexteditor-ui`.

### `CollapsibleCommandBuilder`

Source: <https://ej2.syncfusion.com/documentation/api/richtexteditor-ui/collapsiblecommandbuilder>

Builder for collapsible command.

#### Methods

- `apply` — Execute the collapsible command. Returns `void`.
- `level(level)` — Set heading level.

  | Parameter | Type | Description |
  | --- | --- | --- |
  | `level` | `1` \| `2` \| `3` \| `4` | Heading level |

  Returns `this`.

- `triggerType` — Set trigger type. Returns `this`.
