# Callouts

## Table of Contents
- [Overview](#overview)
- [Available types](#available-types)
- [Configuring callouts](#configuring-callouts)
- [Commands support](#commands-support)
- [API Reference](#api-reference)
  - [CalloutCommandBuilder](#calloutcommandbuilder)

---

## Overview

Callouts highlight a block of text with a status indicator. The Modern Rich Text Editor ships five callout variants — `Info`, `Success`, `Warning`, `Error`, and `Note` — each available through two public surfaces: the `Callout` split-button toolbar item (which exposes all five variants together) and the slash-command popup (which exposes each variant as its own entry). The variants cannot be wired as separate top-level toolbar buttons; the public `callout` command only fires through the `Callout` split-button child or through a slash-command selection.

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

Add the `Callout` split-button to expose all five variants through a single toolbar control. To surface the variants through the slash-command popup, enable [`slashCommandSettings`](https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/index-default#slashcommandsettings) and list the matching entries in [`slashCommandSettings.items`](https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/slashcommandsettings#items).

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
    public placeholder: string = 'Type / for slash commands...';
    public toolbarSettings: object = {
        items: [
            'Bold', 'Italic', 'Underline', '|',
            'Callout',
            '|',
            'Undo', 'Redo'
        ]
    };
    public slashCommandSettings: object = {
        enable: true,
        items: [
            'Info', 'Success', 'Warning', 'Error', 'Note'
        ]
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
---

## API Reference

### CalloutCommandBuilder

Source: <https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/calloutcommandbuilder>

Builder for the callout command. Sets the callout variant (info | warning | error | success | note) before dispatching the toggle to the headless editor.

#### Methods

- `callout(variant: 'info' | 'success' | 'warning' | 'error' | 'note'): this` — Set the callout variant. Returns `this`.
- `apply(): void` — Execute the callout command with set options. Returns `void`.
