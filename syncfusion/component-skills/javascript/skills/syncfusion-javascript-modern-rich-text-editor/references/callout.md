# Callouts in Syncfusion JavaScript Modern Rich Text Editor

Callouts highlight a block of text with a status indicator. The Modern Rich Text Editor ships five callout variants — `Info`, `Success`, `Warning`, `Error`, and `Note` — each available through two public surfaces: the `Callout` split-button toolbar item (which exposes all five variants together) and the slash-command popup (which exposes each variant as its own entry). The variants cannot be wired as separate top-level toolbar buttons; the public `callout` command only fires through the `Callout` split-button child or through a slash-command selection.

## Table of contents

- [Available types](#available-types)
- [Configuring callouts](#configuring-callouts)
- [Commands support](#commands-support)
- [API references](#api-references)

## Available types

| Variant | Slash-command entry |
| --- | --- |
| Info | `Info` |
| Success | `Success` |
| Warning | `Warning` |
| Error | `Error` |
| Note | `Note` |

All five variants funnel through the same `callout` command with a `CalloutCommand` payload (`{ callout: 'info' | 'success' | 'warning' | 'error' | 'note' }`).

## Configuring callouts

Add the `Callout` split-button to expose all five variants through a single toolbar control. To surface the variants through the slash-command popup, enable `slashCommandSettings` and list the matching entries in `slashCommandSettings.items`.

```ts
import { RichTextEditorUI, SlashCommand } from '@syncfusion/ej2-richtexteditor-ui';

RichTextEditorUI.Inject(SlashCommand);

const editor: RichTextEditorUI = new RichTextEditorUI({
    toolbarSettings: {
        items: [
            'Bold', 'Italic', 'Underline', '|',
            'Callout',
            '|',
            'Undo', 'Redo'
        ]
    },
    slashCommandSettings: {
        enable: true,
        items: [
            'Info', 'Success', 'Warning', 'Error', 'Note'
        ]
    },
    placeholder: 'Type / for slash commands...'
});

editor.appendTo('#editor');
```

## Commands support

The `callout` command accepts a `CalloutCommand` payload (`{ callout: 'info' | 'success' | 'warning' | 'error' | 'note' }`). The following table shows how every public surface dispatches the same command with the matching variant.

| Public surface | Identifier | Dispatched command | Payload `callout` |
| --- | --- | --- | --- |
| Toolbar split-button | `Callout` (child: `CalloutInfo`) | `callout` | `'info'` |
| Toolbar split-button | `Callout` (child: `CalloutSuccess`) | `callout` | `'success'` |
| Toolbar split-button | `Callout` (child: `CalloutWarning`) | `callout` | `'warning'` |
| Toolbar split-button | `Callout` (child: `CalloutError`) | `callout` | `'error'` |
| Toolbar split-button | `Callout` (child: `CalloutNote`) | `callout` | `'note'` |
| Slash command | `Info` | `callout` | `'info'` |
| Slash command | `Success` | `callout` | `'success'` |
| Slash command | `Warning` | `callout` | `'warning'` |
| Slash command | `Error` | `callout` | `'error'` |
| Slash command | `Note` | `callout` | `'note'` |

## API references

API types that back the callout surface, sourced from the Syncfusion EJ2 TypeScript API reference for `@syncfusion/ej2-richtexteditor-ui`.

### `CalloutCommandBuilder`

Source: <https://ej2.syncfusion.com/documentation/api/richtexteditor-ui/calloutcommandbuilder>

Builder for the callout command. Sets the callout variant (`info` | `warning` | `error` | `success` | `note`) before dispatching the toggle to the headless editor.

#### Methods

- `apply` — Execute the callout command with set options. Returns `void`.
- `callout` — Set the callout variant. Returns `this`.