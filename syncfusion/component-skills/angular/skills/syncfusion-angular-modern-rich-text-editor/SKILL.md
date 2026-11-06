---
name: syncfusion-angular-modern-rich-text-editor
description: "Implements the Syncfusion Angular Modern Rich Text Editor (ejs-richtexteditor-ui) from @syncfusion/ej2-angular-richtexteditor-ui using RichTextEditorUIModule and SlashCommandService. Use this skill for toolbar configuration, inline/block formatting, slash-command menu, quick toolbar (text/image/link/table), hyperlinks, image insertion and remote upload, lists (numbered/bulleted/checklist), tables, callouts, code blocks, collapsible sections, keyboard shortcuts, events (change, created, destroyed, focus, blur, actionBegin, actionComplete, itemClicked, updatedToolbarStatus, fileUpload*), and the fluent commands() programmatic API in Angular applications."
metadata:
  author: "Syncfusion Inc"
  version: "34.1.29"
  category: "File Viewers & Editors"
---

# Modern Rich Text Editor for Angular

The Syncfusion Angular Modern Rich Text Editor is a WYSIWYG editor that enables users to create, edit, and format rich text content. It supports JSON and HTML content models, a configurable main toolbar, contextual quick toolbars for text/image/link/table, a `/` slash-command menu, image upload to a remote endpoint, hyperlinks with protocol validation, lists, tables, callouts, code blocks, collapsible sections, and deep customization.

> **Note:** Although this skill is exposed under the `react-modern-rich-text-editor` name, the implementation targets **Angular** using `@syncfusion/ej2-angular-richtexteditor-ui` and the `<ejs-richtexteditor-ui>` selector. Code samples throughout this skill are Angular standalone components.

## When to Use This Skill

Use this skill when you need to:
- **WYSIWYG editing** — add a Modern Rich Text Editor to an Angular application
- **HTML or JSON output** — capture content as an HTML string or as a structured JSON document
- **Custom toolbar** — configure, trim, or extend toolbar items, add custom toolbar actions
- **Slash-command menu** — enable `/` to insert block formats and built-in modules
- **Quick toolbar** — configure the contextual popups for text, image, link, and table selections
- **Image upload** — handle local uploads, remote endpoints, Blob vs Base64, renaming, and authentication
- **Hyperlinks** — control link creation, target, allowed protocols, and the Insert-Link dialog
- **Lists and tables** — numbered, bulleted, checklist lists, and tables with row/column/cell operations
- **Block formats** — paragraph, headings, blockquote, code block, horizontal line, callouts, collapsible sections
- **Programmatic API** — dispatch editor actions through the fluent `commands()` builder

## Component Overview

The `<ejs-richtexteditor-ui>` component from `@syncfusion/ej2-angular-richtexteditor-ui` provides:
- HTML and JSON content formats (`valueFormat: 'html' | 'json'`, default `'json'`)
- Configurable main toolbar (`toolbarSettings.items`, `type`, `position`, `enableFloating`)
- Slash-command popup (`slashCommandSettings` with `SlashCommandService` provider)
- Quick toolbars for text, image, link, and table (`quickToolbarSettings`)
- Image upload and remote storage (`imageSettings.uploadUrl`, `imageUrl`, `removeUrl`, `allowedTypes`, `maxFileSize`, `saveFormat`, `dimension`)
- Link settings (`linkSettings.linkOnPaste`, `defaultTarget`, `autoPrependProtocol`, `defaultProtocol`, `allowedProtocols`)
- List settings (`listSettings.numberFormatListItems`, `bulletFormatListItems`, `checklistType`)
- Table settings (`tableSettings.resize`)
- Font family, font size, font color, background color settings
- Keyboard shortcuts with customizable `keyBindings`
- Events: `change`, `created`, `destroyed`, `focus`, `blur`, `actionBegin`, `actionComplete`, `updatedToolbarStatus`, `itemClicked` (on `toolbarSettings`), `fileUploadSuccess`, `fileUploading`
- Fluent programmatic command builder (`editor.commands().<builder>().<setter>().apply()`)
- Theme integration via `@syncfusion/ej2-material3-theme/styles/richtexteditor-ui/index.css`

## Quick Start

Install the wrapper and a theme:

```bash
npm install @syncfusion/ej2-angular-richtexteditor-ui
npm install @syncfusion/ej2-material3-theme
```

Add the stylesheet to `src/styles.css`:

```css
@import '../node_modules/@syncfusion/ej2-material3-theme/styles/richtexteditor-ui/index.css';
```

Render the editor in a standalone Angular component:

```ts
import { Component } from '@angular/core';
import { RichTextEditorUIModule } from '@syncfusion/ej2-angular-richtexteditor-ui';

@Component({
    imports: [RichTextEditorUIModule],
    standalone: true,
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class App {
    public placeholder: string = 'Type something ...';
    public value: string = '<p>Getting started with the Rich Text Editor UI.</p>';
    public valueFormat: string = 'html';
    public toolbarSettings: object = {
        items: ['Bold', 'Italic', 'Underline', '|', 'Formats', 'Alignment', '|', 'Link', 'Image', 'Table', '|', 'Undo', 'Redo']
    };
}
```

```html
<ejs-richtexteditor-ui
    [placeholder]="placeholder"
    [value]="value"
    [valueFormat]="valueFormat"
    [toolbarSettings]="toolbarSettings">
</ejs-richtexteditor-ui>
```

---

## Documentation and Navigation Guide

This skill is organized into focused reference files. Use the guide below to find the right reference for your task.

### Getting Started
📄 **Read:** [references/getting-started.md](references/getting-started.md)

**When to read:** First-time setup, installation, Syncfusion CLI / Angular CLI flow, CSS theme imports, first component

**Topics covered:**
- Prerequisites (Node.js, Angular CLI, Syncfusion CLI)
- Creating an Angular app with the Syncfusion CLI (non-interactive and interactive)
- Creating an Angular app with the Angular CLI
- Installing `@syncfusion/ej2-angular-richtexteditor-ui`
- Adding the theme CSS reference
- Rendering `<ejs-richtexteditor-ui>` in a standalone component

---

### Basic Setup
📄 **Read:** [references/getting-started.md](references/getting-started.md) *(basic setup is consolidated in the Getting Started reference)*

**When to read:** Configuring initial value, content format, toolbar items, image settings, placeholder, auto-save

**Topics covered:**
- `value` and `valueFormat` (`'html'` vs `'json'`)
- `toolbarSettings.items` initial configuration
- `imageSettings` (`allowedTypes`, `maxFileSize`, `uploadUrl`, `removeUrl`, `imageUrl`)
- `placeholder` text
- `saveInterval` for auto-save behavior
- API Reference: `ValueFormat` enum (`'html'` | `'json'`)

---

### Toolbar Configuration
📄 **Read:** [references/toolbar.md](references/toolbar.md)

**When to read:** Customizing toolbar items, layout type, position, floating, and custom toolbar actions

**Topics covered:**
- Default toolbar items list
- Available toolbar item identifiers (`Bold`, `Italic`, `Formats`, `Alignment`, `Callout`, `Quote`, `CodeBlock`, `HorizontalLine`, etc.)
- Toolbar layout: `type` (`Auto` / `Expanded` / `Scrollable` / `MultiRow`) and `position` (`Top` / `Bottom`)
- Floating toolbar (`enableFloating`, `floatingOffset`)
- Custom toolbar items via `actionId` and `toolbarSettings.itemClicked`
- Updating toolbar items at runtime with `editor.updateToolbarItems(updates)`
- The Quick Toolbar configuration object (`quickToolbarSettings.text`, `image`, `link`, `table`)
- `enableAppendToBody` for narrow / scroll-constrained containers
- Built-in quick-toolbar item identifiers for text, image, link, and table surfaces
- Custom toolbar items in quick toolbars and `ToolbarItemClickedEventArgs`
- API Reference: `AddToolbarItem`, `BuiltInToolbarItem`, `BuiltInToolbarItemConfig`, `CustomToolbarItem`, `DisableToolbarItem`, `EnableToolbarItem`, `HideToolbarItem`, `HorizontalRuleCommandBuilder`, `itemClickEventArgs`, `QuickToolbarSettings`, `QuickToolbarSettingsModel`, `RemoveToolbarItem`, `ShowToolbarItem`, `ToolbarItem`, `ToolbarItemClickedEventArgs`, `ToolbarItemUpdate`, `ToolbarPosition`, `ToolbarSettings`, `ToolbarSettingsModel`, `ToolbarType`, `UpdatedToolbarStatusEventArgs`, static function `reconcileToolbarItems`

---

### Inline Formats
📄 **Read:** [references/formatting.md](references/formatting.md)

**When to read:** Applying character-level marks — bold, italic, underline, colors, font, size, code

**Topics covered:**
- Available inline formats and their toolbar identifiers
- Toggle text styles (Bold, Italic, Underline, StrikeThrough, SubScript, SuperScript, UpperCase, LowerCase, InlineCode)
- Font and background color commands (picker vs palette mode, `columns`, `default`, `modeSwitcher`)
- Font family configuration (built-in, custom, Google fonts)
- Font size configuration (built-in, custom)
- Fluently calling commands via `editor.commands().bold().apply()` etc.
- Keyboard shortcuts for formatting (Ctrl+B/I/U, etc.)
- API Reference: `AlignmentCommandBuilder`, `ColorCommandBuilder`, `FontFamily`, `FontFamilyModel`, `FontFamilyItem`, `FontFamilyCommandBuilder`, `FontSize`, `FontSizeModel`, `FontSizeItem`, `FontSizeCommandBuilder`, `Format`, `FormatModel`, `TextAlignment`, `ToggleCommandBuilder`

---

### Block Formats
📄 **Read:** [references/block-quote.md](references/block-quote.md), [references/callout.md](references/callout.md), [references/codeblock.md](references/codeblock.md), [references/collapsible.md](references/collapsible.md)

**When to read:** Applying block-level structure changes — quote, callout, code block, collapsible section

**Topics covered:**
- **Block quote** — `Quote` toolbar item, `Blockquote` slash command, `blockQuote` command
- **Callouts** — `Info`, `Success`, `Warning`, `Error`, `Note` via the `Callout` split-button toolbar item or slash-command entries
- **Code blocks** — `CodeBlock` toolbar item, `codeBlock` command with `CodeBlockCommand` payload (`{ language: string }`)
- **Collapsible headings** — `Collapsible Paragraph` / `Collapsible Heading 1`–`4` slash-command entries with `collapsible` command and `ToggleCollapsiblePayload`
- API Reference: `CalloutCommandBuilder`, `CodeBlockCommandBuilder`, `CollapsibleCommandBuilder` (each block-format reference)

---

### Lists (Numbered, Bulleted, Checklist)
📄 **Read:** [references/lists.md](references/lists.md)

**When to read:** Working with `NumberFormatList`, `BulletFormatList`, and `Checklist` items

**Topics covered:**
- List types overview
- `listSettings.numberFormatListItems`, `bulletFormatListItems`, `checklistType`
- Available numbering formats (`decimal`, `lower-alpha`, `upper-alpha`, `lower-roman`, `upper-roman`, `lower-greek`)
- Available bullet styles (`disc`, `circle`, `square`)
- Checklist shape (`Square`, `Circle`)
- Common list commands (`numberedList`, `bulletList`, `toggleTaskList`, `setListStyle`)
- Keyboard shortcuts for lists and indentation (Tab / Shift+Tab)
- API Reference: `BulletFormatList`, `BulletFormatListItem`, `NumberFormatList`, `NumberFormatListItem`, `CustomFormatListItem`, `ListCommandBuilder`, `ListStyleCommandBuilder`, `ChecklistCommandBuilder`, `ListSettings`, `ListSettingsModel`

---

### Tables
📄 **Read:** [references/table.md](references/table.md)

**When to read:** Inserting tables, configuring row/column operations, header toggling, cell formatting

**Topics covered:**
- Table insertion via toolbar, slash command, keyboard shortcut (Ctrl+Shift+E)
- 3×10 interactive table grid and Insert Table dialog
- Row operations (insert above / below, delete)
- Column operations (insert left / right, delete)
- Header row toggle
- Cell background color, horizontal alignment, vertical alignment
- Table deletion
- `tableSettings.resize` property
- Default `quickToolbarSettings.table` items
- Keyboard shortcuts for table popup
- API Reference: `TableQuickToolbarItem`, `TableSettings`, `TableSettingsModel`

---

### Links & Hyperlinks
📄 **Read:** [references/links.md](references/links.md)

**When to read:** Configuring link creation, target, allowed protocols, and the Link Quick Toolbar

**Topics covered:**
- `linkSettings` properties (`linkOnPaste`, `defaultTarget`, `autoPrependProtocol`, `defaultProtocol`, `allowedProtocols`)
- Paste-link-as-text behavior
- Default `target` (`_blank` / `_self` / `_parent` / `_top`)
- Configure available protocols
- Configure allowed protocols (built-in, adding `sms`/`ftp`, restricting to a single protocol)
- Link Quick Toolbar (`Open`, `Copy`, `Edit`, `Remove`)
- API Reference: `LinkCommandBuilder`, `LinkQuickToolbarItem`, `LinkSettings`, `LinkSettingsModel`

---

### Image Handling & Upload
📄 **Read:** [references/image.md](references/image.md)

**When to read:** Inserting images, configuring upload endpoints, server-side upload pipeline

**Topics covered:**
- Inserting images from local storage and web URLs
- `imageSettings` configuration (`allowedTypes`, `maxFileSize`, `uploadUrl`, `removeUrl`, `imageUrl`)
- Image save formats — `Blob` vs `Base64`, and their trade-offs
- Image dimension constraints (`dimension.width`, `height`, `min/maxWidth`, `min/maxHeight`)
- Image display modes (`inline` / `break`)
- Image resize (`resize` property)
- Image Quick Toolbar items (`AltText`, `Caption`, `Align`, `Display`, `WrapText`, `Dimension`, `Replace`, `Remove`)
- Text wrap modes (`left` / `right` / `none`)
- Alignment options (`left` / `center` / `right` / `none`)
- Remote image upload (writing an endpoint, `form field name 'UploadFiles'`)
- Renaming images on the server (`fileUploadSuccess`)
- Secure upload with authentication (`fileUploading` + `currentRequest.setRequestHeader`)
- Keyboard shortcut (Ctrl+Shift+I to open image dialog)
- API Reference: `ImageDisplayMode`, `ImageSaveFormat`, `ImageQuickToolbarItem`, `ImageSettings`, `ImageSettingsModel`, `BackgroundColor`, `BackgroundColorModel`, `ColorModeType`, `ColorPickerType`, `FontColor`, `FontColorModel`

---

### Quick Toolbar (Contextual Popups)
📄 **Read:** [references/toolbar.md](references/toolbar.md) *(the Quick Toolbar configuration is consolidated in the Toolbar reference)*

**When to read:** Configuring the four contextual quick toolbar surfaces (text / image / link / table)

**Topics covered:**
- `quickToolbarSettings.enable`, `enableAppendToBody`, `text`, `image`, `link`, `table`
- Text Quick Toolbar triggers (mouseup, keyup, triple-click) and dismissal (Escape, blur)
- Custom toolbar items in any quick-toolbar surface
- Item unions per surface (`LinkQuickToolbarItem`, `TableQuickToolbarItem`, `ImageQuickToolbarItem`)
- Full `ToolbarItem` union for text quick toolbar

---

### Slash Commands (`/` menu)
📄 **Read:** [references/features.md](references/features.md)

**When to read:** Enabling the `/` slash-command popup, configuring items, custom items, lifecycle

**Topics covered:**
- Enabling via `slashCommandSettings.enable = true`
- `SlashCommandService` provider registration
- Available built-in slash-command items (Paragraph, Headings 1–4, NumberedList, BulletList, Checklist, Blockquote, Info/Success/Warning/Error/Note, Collapsible Paragraph/Headings 1–4, Link, Image, Table)
- Configuring `slashCommandSettings.items` (restrict, reorder, add custom)
- `popupWidth` and `popupHeight` for the popup size
- Adding custom items via `ISlashCommandItem` (`text`, `command`, `iconCss`, `description`, `type`)
- `itemSelect` event and `SlashCommandItemSelectArgs`
- Caret restoration, filtering, read-only / disabled behavior, destroy lifecycle
- API Reference: `ISlashCommandItem`, `SlashCommandItems`, `SlashCommandItemSelectArgs`, `SlashCommandSettings`, `SlashCommandSettingsModel`, `SlashCommandType`

---

### Events
📄 **Read:** [references/editor-events.md](references/editor-events.md)

**When to read:** Handling editor lifecycle, content changes, focus, action begin/complete, item clicks, file upload events

**Topics covered:**
- Lifecycle events — `change`, `created`, `destroyed`
- Focus events — `focus`, `blur`
- Action events — `actionBegin`, `actionComplete`
- Toolbar events — `toolbarSettings.itemClicked`, `updatedToolbarStatus`
- File upload events — `fileUploadSuccess`, `fileUploading`
- API Reference: `ChangeEventArgs`, `EditorComponentEventArgs`, `DialogType`, `BeforeDialogCloseEventArgs`, `BeforeDialogOpenEventArgs`, `BeforePopupCloseEventArgs`, `BeforePopupOpenEventArgs`

---

### File Upload Events
📄 **Read:** [references/file-upload.md](references/file-upload.md)

**When to read:** Handling the full upload lifecycle — file drop, selection, upload-in-progress, success, failure, removal

**Topics covered:**
- `BeforeFileDropEventArgs`, `BeforeFileUploadEventArgs`
- `FileSelectedEventArgs`, `FileUploadingEventArgs`, `FileUploadSuccessEventArgs`, `FileUploadFailedEventArgs`
- `FileRemovingEventArgs` (client-side `Blob` revocation + server `removeUrl` POST)

---

### Programmatic Commands API
📄 **Read:** [references/editor-methods.md](references/editor-methods.md)

**When to read:** Dispatching editor actions from code through the fluent `commands()` builder

**Topics covered:**
- `editor.commands()` fluent builder shape
- Inline format command chain (toggle styles, colors, font, size)
- The `apply()` terminal
- Available builder identifiers sourced from inline-formats and list commands
- API Reference: `CommandExecutor` (full builder catalog), `EditorDocument`, `BlockNode`, `InlineNode`, `EditorMark`, custom node types (`CustomNodeAttributeType`, `CustomNodeContent`, `CustomNodeGroup`, `CustomNodeName`), `EditorKeyBindingAction`, `FormattingStateService`, `InteractionSettings`, `InteractionSettingsModel`, full `RichTextEditorUIModel` component API (28 properties + 15 events)

---

### Keyboard Shortcuts
📄 **Read:** Keyboard shortcuts are documented inline within the consuming reference (text formatting shortcuts → [formatting.md](references/formatting.md), list/indent shortcuts → [lists.md](references/lists.md), insert shortcuts → [image.md](references/image.md), [table.md](references/table.md), [links.md](references/links.md), history/navigation shortcuts → [toolbar.md](references/toolbar.md)). The full source-of-truth keyboard matrix is split by topic to keep each reference self-contained.

**Topics covered:**
- Text formatting & style shortcuts (Ctrl+B / I / U / Shift+S / = / Shift+= / E / Shift+R / Shift+U / Shift+L)
- Lists & indentation (Ctrl+Shift+O / Alt+O / Shift+7 / Tab / Shift+Tab)
- Insertions (Ctrl+K / Shift+I / Shift+E / Shift+B)
- History & focus navigation (Ctrl+Z / Shift+Z / Alt+F10 / Esc)
- Customizing shortcuts via `toolbarSettings.keyBindings`

---

## Common Patterns

### Two-way value binding (HTML)

```ts
import { Component } from '@angular/core';
import { RichTextEditorUIModule } from '@syncfusion/ej2-angular-richtexteditor-ui';

@Component({
    imports: [RichTextEditorUIModule],
    standalone: true,
    selector: 'app-root',
    template: `<ejs-richtexteditor-ui [(value)]="content" valueFormat="html"></ejs-richtexteditor-ui>`
})
export class App {
    public content: string = '<p>Start editing ...</p>';
}
```

### Slash-command-enabled standalone component

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
    public slashCommandSettings: object = { enable: true };
}
```

### Programmatic format application via the `commands()` builder

```ts
this.rteObj.commands().bold().apply();
this.rteObj.commands().fontColor().color('#00A3FF').apply();
this.rteObj.commands().fontSize().size('18px').apply();
```

---

## Key Services Reference

| Service | What it enables |
|---|---|
| `SlashCommandService` | Registers the `/` slash-command popup with the editor instance. Required when `slashCommandSettings.enable` is `true`. |

---

## Related Skills

- Syncfusion Angular Components (`syncfusion-angular-common` skill) — Common utilities and base libraries referenced by this component
- Syncfusion Angular Themes (`syncfusion-angular-themes` skill) — Theme packages used by the Modern Rich Text Editor CSS import path