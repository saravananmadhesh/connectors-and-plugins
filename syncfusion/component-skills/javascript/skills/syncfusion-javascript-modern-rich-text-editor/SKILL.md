---
name: syncfusion-javascript-modern-rich-text-editor
description: "Implement the Syncfusion JavaScript Modern Rich Text Editor (RichTextEditorUI) in a Vite-based TypeScript project. Covers setup, toolbar configuration, inline formatting, lists, tables, images, links, block formats, slash commands, events, methods, and accessibility."
metadata:
  author: "Syncfusion Inc"
  version: "34.1.29"
---

# Syncfusion JavaScript Modern Rich Text Editor

The Syncfusion JavaScript Modern Rich Text Editor (`RichTextEditorUI` from `@syncfusion/ej2-richtexteditor-ui`) is a WYSIWYG control for creating, editing, and formatting rich text content in a Vite-based TypeScript project. This skill documents every public surface the component exposes — toolbar configuration, inline and block formatting, lists, tables, images, links, slash commands, events, methods, and accessibility — and points to dedicated reference files for each topic.

## Overview

Use this skill when you need to:

- Add the Modern Rich Text Editor to a Vite-based TypeScript application.
- Configure the toolbar layout, floating behavior, custom toolbar items, and keyboard shortcuts.
- Apply inline formatting (bold, italic, underline, font family/size, color, highlight, case transforms, inline code).
- Insert and configure block formats (paragraph, headings, quote, code block, callout, collapsible, horizontal line).
- Build bullet, numbered, and checklist lists with custom formatting.
- Insert images with upload, dimension, display, alignment, caption, and alt-text controls.
- Configure links — paste-as-link, target, protocol allow-list, and link quick toolbar.
- Insert and configure tables with row, column, header, alignment, and quick-toolbar actions.
- Enable the slash-command popup, restrict its items, or add custom items.
- Wire up editor events (`change`, `created`, `destroyed`, `focus`, `blur`, `actionBegin`, `actionComplete`).
- Read and manipulate content through the public methods (`save`, `focusIn`, `focusOut`, `getDocument`, `getHtml`, `getText`, `updateToolbarItems`).
- Apply accessibility roles, ARIA attributes, and keyboard-navigation conformance.

## Documentation and Navigation Guide

### Getting Started

📄 **Read:** [references/getting-started.md](references/getting-started.md)
- Prerequisites (Node.js `24.13.0` or higher)
- Create a Vite TypeScript application (`npm create vite@latest my-app -- --template vanilla-ts`)
- Install `@syncfusion/ej2-richtexteditor-ui` and a theme package
- Apply the CSS reference (`@import '../node_modules/@syncfusion/ej2-tailwind3-theme/styles/richtexteditor-ui/index.css';`)
- Add the editor: `new RichTextEditorUI({}).appendTo('#editor')`
- Run with `npm run dev`
- Set editor content (`value`), content format (`valueFormat: 'html' | 'json'`)
- Configure `toolbarSettings.items` and `imageSettings`
- Set placeholder text
- Accessibility compliance, ARIA attributes, keyboard navigation, axe-core validation
- **API references**: `ValueFormat`, `InteractionSettings`, `InteractionSettingsModel`, `RichTextEditorUIModel`, `EditorDocument`, `BlockNode`, `InlineNode`, `EditorMark`, `CustomNodeAttributeType`, `CustomNodeContent`, `CustomNodeGroup`, `CustomNodeName`, `DialogType`, `EditorComponentEventArgs` (under the `## API references` section of this file)

### Toolbar

📄 **Read:** [references/toolbar.md](references/toolbar.md)
- `toolbarSettings.items` (built-in identifiers and `'|'` separators)
- Available toolbar items by category (History, Text formatting, Font and color, Structure, Alignment, Lists, Insert)
- Layout configuration: `toolbarSettings.type` (`'Auto'`, `'Expanded'`, `'Scrollable'`, `'MultiRow'`) and `toolbarSettings.position` (`'Top'`, `'Bottom'`)
- Floating toolbar (`toolbarSettings.enableFloating`, `toolbarSettings.floatingOffset`)
- Block-format toolbar identifiers (`Paragraph`, `Heading 1`–`Heading 4`, `Quote`, `CodeBlock`, `HorizontalLine`, `Callout`) wired through `toolbarSettings.items` and `slashCommandSettings.items`
- Custom toolbar items with `actionId`, presentation fields, and routing through `toolbarSettings.itemClicked`
- `toolbarSettings.itemClicked` and `toolbarSettings.updatedToolbarStatus` events
- Configuring keyboard shortcuts via `toolbarSettings.keyBindings`
- Updating toolbar items at runtime with `editor.updateToolbarItems(updates)`
- **API references**: `AlignmentCommandBuilder`, `HorizontalRuleCommandBuilder`, `FormattingStateService`, `EditorKeyBindingAction`, `QuickToolbarSettings`, `QuickToolbarSettingsModel`, `ToolbarSettings`, `ToolbarItemClickedEventArgs`, `ToolbarSettingsModel`, `AddToolbarItem`, `BuiltInToolbarItemConfig`, `CustomToolbarItem`, `BuiltInToolbarItem`, `ToolbarItem`, `ToolbarItemUpdate`, `ToolbarPosition`, `ToolbarType`, `DisableToolbarItem`, `EnableToolbarItem`, `HideToolbarItem`, `ShowToolbarItem`, `RemoveToolbarItem`, `StaticFunctions` (under the `## API references` section of this file)

### Inline Formatting

📄 **Read:** [references/formatting.md](references/formatting.md)
- Available inline formats (Bold, Italic, Underline, StrikeThrough, SubScript, SuperScript, LowerCase, UpperCase, InlineCode, FontName, FontSize, FontColor, BackgroundColor, ClearFormat)
- Toggle text styles
- Font and styling (dropdown-bound toolbar items)
- Color commands (`fontColor`, `backgroundColor`) with `ColorCommand { color: string }` payload; empty string removes the mark
- Typography commands (`fontSize().size(string)`, `fontName().family(string)`)
- Font family: built-in and custom via `fontFamily.items`; Google font support
- Font size: built-in and custom via `fontSize.items`
- Font and background color with `Picker` / `Palette` modes, `columns`, `default`, and `modeSwitcher`
- `ClearFormat` toolbar item and `clearFormat` fluent command
- Programmatic end-to-end example wiring external buttons to `editor.commands().<builder>().apply()`
- Keyboard shortcuts for every text-formatting action (Bold, Italic, Underline, Strikethrough, Subscript, Superscript, Inline Code, Clear Format, Uppercase, Lowercase)
- **API references**: `ColorCommandBuilder`, `CommandExecutor`, `FontFamilyCommandBuilder`, `FontSizeCommandBuilder`, `ToggleCommandBuilder`, `BackgroundColor`, `FontColor`, `BackgroundColorModel`, `FontColorModel`, `ColorModeType`, `ColorPickerType`, `FontFamily`, `FontSize`, `Format`, `FontFamilyModel`, `FontSizeModel`, `FormatModel`, `FontFamilyItem`, `FontSizeItem`, `TextAlignment` (under the `## API references` section of this file)

### Block Formats — Block Quote

📄 **Read:** [references/block-quote.md](references/block-quote.md)
- `blockQuote` command — toggles a `<blockquote>` on the current selection (no payload)
- Toolbar identifier `Quote`
- Slash-command entry `Blockquote`
- Configuring block quote through `toolbarSettings.items` and `slashCommandSettings.items`

### Block Formats — Callout

📄 **Read:** [references/callout.md](references/callout.md)
- Five callout variants: `Info`, `Success`, `Warning`, `Error`, `Note`
- `Callout` split-button toolbar item (exposes all five variants together)
- Slash-command entries for each variant (`Info`, `Success`, `Warning`, `Error`, `Note`)
- Variants cannot be wired as separate top-level toolbar buttons
- `callout` command with `CalloutCommand` payload (`{ callout: 'info' | 'success' | 'warning' | 'error' | 'note' }`)
- Surface-to-payload dispatch table
- **API references**: `CalloutCommandBuilder` (under the `## API references` section of this file)

### Block Formats — Code Block

📄 **Read:** [references/codeblock.md](references/codeblock.md)
- `codeBlock` command — inserts a `<pre>` block with optional language annotation
- `CodeBlockCommand` payload (`{ language: string }`)
- Toolbar identifier `CodeBlock`
- No slash-command entry for code block
- `Ctrl+Shift+B` (Windows) / `⌘ ⇧ B` (macOS) keyboard shortcut
- **API references**: `CodeBlockCommandBuilder` (under the `## API references` section of this file)

### Block Formats — Collapsible Sections

📄 **Read:** [references/collapsible.md](references/collapsible.md)
- Five collapsible variants: `Collapsible Paragraph`, `Collapsible Heading 1`–`Collapsible Heading 4`
- Reachable **only** through the slash-command popup (no dedicated public toolbar item)
- **API references**: `CollapsibleCommandBuilder` (under the `## API references` section of this file)
- `collapsible` command with `ToggleCollapsiblePayload` (`{ triggerType: 'paragraph' | 'heading', level?: 1 | 2 | 3 | 4 }`)
- Slash-command entries to payload mapping table

### Block Formats — Tables

📄 **Read:** [references/table.md](references/table.md)
- Table insertion (toolbar `Table`, slash command `/table`, shortcut `Ctrl+Shift+E`)
- Interactive Table Popup Grid (3×10) and Insert Table Dialog (rows 1–100, columns 1–50, optional header)
- Row operations (Insert Before/After, Delete)
- Column operations (Insert Left/Right, Delete)
- Header management (Toggle Header Row)
- Cell formatting (Cell Background Color, Horizontal Alignment, Vertical Alignment)
- Table deletion (Remove)
- `tableSettings.resize`
- Quick toolbar items: `Header`, `Row`, `Column`, `CellBackgroundColor`, `Align`, `VerticalAlign`, `Remove`
- Keyboard shortcuts (Ctrl+Shift+E to open the Insert Table popup/dialog; Arrow Keys, Enter, Escape inside the popup)
- **API references**: `TableSettings`, `TableSettingsModel`, `TableQuickToolbarItem` (under the `## API references` section of this file)

### Block Formats — Images

📄 **Read:** [references/image.md](references/image.md)
- Insert from local storage (file dialog) and web URLs (URL input)
- `imageSettings.allowedTypes`, `imageSettings.maxFileSize`, `imageSettings.saveFormat` (`'Blob'` or `'Base64'`)
- Limitations of Base64 and Blob formats
- `imageSettings.dimension` (`width`, `height`, `minWidth`, `maxWidth`, `minHeight`, `maxHeight`)
- Display modes (`'inline'` default, `'break'` block)
- Image resizing (`resize` default `true`)
- Image quick toolbar items: `AltText`, `Caption`, `Align`, `Display`, `WrapText`, `Dimension`, `Replace`, `Remove`
- Caption HTML output (`<figure>` + `<figcaption>`)
- Wrap text modes (`'left'`, `'right'`, `'none'`) and alignment options (`'left'`, `'center'`, `'right'`, `'none'`)
- Remote upload with `uploadUrl`, `imageUrl`, `removeUrl`; the `UploadFiles` form field name
- `Ctrl+Shift+I` (Windows) / `⌘ ⇧ I` (macOS) keyboard shortcut
- **API references**: `ImageSettings`, `ImageDisplayMode`, `ImageSaveFormat`, `ImageSettingsModel`, `ImageQuickToolbarItem` (under the `## API references` section of this file)

### File upload

📄 **Read:** [references/file-upload.md](references/file-upload.md)
- File drop event: `beforeFileDrop` (`BeforeFileDropEventArgs`)
- File selection event: `fileSelected` (`FileSelectedEventArgs`)
- Upload lifecycle: `beforeFileUpload` (`BeforeFileUploadEventArgs`), `fileUploading` (`FileUploadingEventArgs`), `fileUploadSuccess` (`FileUploadSuccessEventArgs`), `fileUploadFailed` (`FileUploadFailedEventArgs`)
- File removal: `fileRemoving` (`FileRemovingEventArgs`)
- All 7 event-arg types carry `source: 'Image'`; the `source` discriminant identifies the editor feature the upload is for
- Settings referenced by the upload workflow (`uploadUrl`, `imageUrl`, `removeUrl`, `UploadFiles`, `saveFormat: 'Blob' | 'Base64'`) live under [image.md](image.md) → `ImageSettings`
- **API references**: `BeforeFileDropEventArgs`, `BeforeFileUploadEventArgs`, `FileRemovingEventArgs`, `FileSelectedEventArgs`, `FileUploadFailedEventArgs`, `FileUploadSuccessEventArgs`, `FileUploadingEventArgs` (under the `## API references` section of this file)

### Block Formats — Links

📄 **Read:** [references/links.md](references/links.md)
- `linkSettings.linkOnPaste`, `linkSettings.defaultTarget`, `linkSettings.autoPrependProtocol`, `linkSettings.defaultProtocol`, `linkSettings.allowedProtocols`
- Default protocol allow-list: `['http', 'https', 'mailto', 'tel']`
- Default `defaultTarget: '_blank'` and supported target values (`''`, `'_self'`, `'_blank'`, `'_parent'`, `'_top'`)
- URL validation in the Insert-Link dialog and `linkOnPaste` flow
- Adding protocols (`sms`, `ftp`) and restricting to a single protocol
- Link quick toolbar (`quickToolbarSettings.link`) with `Open`, `Copy`, `Edit`, `Remove`, separator, and `CustomToolbarItem`
- Default-link toolbar surface and trigger/close behavior
- Customizing the link quick toolbar with custom items routed through `toolbarSettings.itemClicked`
- `Ctrl+K` (Windows) / `⌘ K` (macOS) keyboard shortcut
- **API references**: `LinkCommandBuilder`, `LinkSettings`, `LinkSettingsModel`, `LinkQuickToolbarItem` (under the `## API references` section of this file)

### Block Formats — Lists

📄 **Read:** [references/lists.md](references/lists.md)
- Three list types: NumberFormat, BulletFormat, Checklist
- `listSettings.numberFormatListItems` and `listSettings.bulletFormatListItems`
- `listSettings.checklistType` (`'Square'` default, `'Circle'`)
- NumberFormat list types (`'decimal'`, `'lower-alpha'`, `'upper-alpha'`, `'lower-roman'`, `'upper-roman'`, `'lower-greek'`)
- BulletFormat list styles (`'disc'`, `'circle'`, `'square'`)
- Commands: `numberedList`, `bulletList`, `toggleTaskList`, `setListStyle`
- Keyboard shortcuts (Ordered List, Unordered List, Checklist, Indent, Outdent)
- **API references**: `ListCommandBuilder`, `ListStyleCommandBuilder`, `ChecklistCommandBuilder`, `CustomFormatListItem`, `ListSettings`, `BulletFormatList`, `NumberFormatList`, `BulletFormatListItem`, `NumberFormatListItem`, `ListSettingsModel` (under the `## API references` section of this file)

### Slash Commands

📄 **Read:** [references/features.md](references/features.md)
- `slashCommandSettings.enable` (default disabled)
- `RichTextEditorUI.Inject(SlashCommand)` module injection
- Built-in items: `Paragraph`, `Heading 1`–`Heading 4`, `NumberedList`, `BulletList`, `Checklist`, `Blockquote`, `Info`, `Warning`, `Error`, `Success`, `Note`, `Collapsible Paragraph`, `Collapsible Heading 1`–`Collapsible Heading 4`, `Link`, `Image`, `Table`
- `items` array: restrict, reorder, add custom items
- `popupWidth`, `popupHeight`
- Custom items via `ISlashCommandItem` (`text`, `command`, `iconCss`, `description`, `type`)
- `itemSelect` event with `SlashCommandItemSelectArgs` (`isInteracted`, `item`, `itemData`, `originalEvent`, `cancel`)
- Caret restoration, filtering, read-only/disabled behavior, destroy lifecycle
- **API references**: `ISlashCommandItem`, `SlashCommandItemSelectArgs`, `SlashCommandItems`, `SlashCommandSettings`, `SlashCommandType`, `SlashCommandSettingsModel` (under the `## API references` section of this file)

### Events

📄 **Read:** [references/editor-events.md](references/editor-events.md)
- `change` event with `ChangeEventArgs` (`action`, `affectedNodes`)
- `created` event
- `destroyed` event
- `focus` and `blur` events
- `actionBegin` event
- `actionComplete` event
- **API references**: `ChangeEventArgs`, `UpdatedToolbarStatusEventArgs`, `itemClickEventArgs`, `BeforeDialogCloseEventArgs`, `BeforeDialogOpenEventArgs`, `BeforePopupCloseEventArgs`, `BeforePopupOpenEventArgs` (under the `## API references` section of this file)

### Methods

📄 **Read:** [references/editor-methods.md](references/editor-methods.md)
- `save` — persist current editor content into the `value` property
- `focusIn` — move focus into the editable area
- `focusOut` — remove focus from the editable area
- `getDocument` — return the current editor document
- `getHtml` — return the current editor content as an HTML string
- `getText` — return the current editor content as plain text
- `updateToolbarItems` — apply a batch of toolbar item updates

## Quick Start Example

### Minimal Editor Setup

```ts
import { RichTextEditorUI } from '@syncfusion/ej2-richtexteditor-ui';

const editor: RichTextEditorUI = new RichTextEditorUI({
    value: '<p>Getting started with the Rich Text Editor UI.</p>',
    valueFormat: 'html',
    toolbarSettings: {
        items: ['Bold', 'Italic', 'Underline', '|', 'Formats', 'Alignment', '|', 'Link', 'Image', 'Table', '|', 'Undo', 'Redo']
    },
    imageSettings: {
        allowedTypes: ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'],
        maxFileSize: 30000000,
        uploadUrl: 'https://services.syncfusion.com/js/production/api/RichTextEditor/SaveFile',
        imageUrl: 'https://services.syncfusion.com/js/production/RichTextEditor/'
    },
    placeholder: 'Type something.'
});

editor.appendTo('#editor');
```

### HTML Template (`src/index.html`)

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <link rel="icon" type="image/svg+xml" href="/vite.svg" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Syncfusion JavaScript Modern Rich Text Editor</title>
</head>
<body>
  <div id="editor"></div>
  <script type="module" src="/src/main.ts"></script>
</body>
</html>
```

### CSS Reference (`src/style.css`)

```css
@import '../node_modules/@syncfusion/ej2-tailwind3-theme/styles/richtexteditor-ui/index.css';
```

## Common Patterns

### Pattern 1: Read content in different formats

**Get the structured document:**

```ts
const doc = editor.getDocument();
```

**Serialize to HTML:**

```ts
const html: string = editor.getHtml();
```

**Get plain text:**

```ts
const text: string = editor.getText();
```

**Persist the current content into `value`:**

```ts
editor.save();
```

### Pattern 2: Configure the toolbar

```ts
import { RichTextEditorUI } from '@syncfusion/ej2-richtexteditor-ui';

const editor: RichTextEditorUI = new RichTextEditorUI({
    toolbarSettings: {
        items: ['Bold', 'Italic', 'Underline', 'Strikethrough', '|', 'Formats', 'Alignment', 'BulletList', 'NumberedList', '|', 'Link', 'Image', 'Table', '|', 'Undo', 'Redo'],
        type: 'MultiRow',
        position: 'Top',
        enableFloating: true,
        floatingOffset: 0
    }
});

editor.appendTo('#editor');
```

### Pattern 3: Apply inline formatting through the fluent builder

```ts
editor.commands().bold().apply();
editor.commands().italic().apply();
editor.commands().fontColor().color('#DC2626').apply();
editor.commands().fontSize().size('16px').apply();
editor.commands().clearFormat().apply();
```

### Pattern 4: Configure keyboard shortcuts

```ts
import { RichTextEditorUI } from '@syncfusion/ej2-richtexteditor-ui';

const editor: RichTextEditorUI = new RichTextEditorUI({
    toolbarSettings: {
        items: ['Bold', 'Italic', 'Underline', '|', 'Link', 'Image', 'Table', 'CodeBlock', '|', 'Undo', 'Redo'],
        keyBindings: {
            link: 'ctrl+alt+k',
            image: 'ctrl+alt+i',
            'code-block': 'ctrl+shift+c'
        }
    }
});

editor.appendTo('#editor');
```

### Pattern 5: Enable the Slash command popup

```ts
import { RichTextEditorUI, SlashCommand } from '@syncfusion/ej2-richtexteditor-ui';

RichTextEditorUI.Inject(SlashCommand);

const editor: RichTextEditorUI = new RichTextEditorUI({
    slashCommandSettings: {
        enable: true,
        items: ['Paragraph', 'Heading 1', 'Heading 2', 'Heading 3', 'BulletList', 'NumberedList']
    }
});

editor.appendTo('#editor');
```

### Pattern 6: Wire up an event

```ts
import { RichTextEditorUI, ChangeEventArgs } from '@syncfusion/ej2-richtexteditor-ui';

const editor: RichTextEditorUI = new RichTextEditorUI({
    change: (args: ChangeEventArgs) => {
        console.log('Action:', args.action);
    }
});

editor.appendTo('#editor');
```

## Key Concepts

### Editor lifecycle

1. **Create** — instantiate with `new RichTextEditorUI({...})`.
2. **Mount** — attach to a DOM element with `editor.appendTo('#editor')`.
3. **Interact** — read content, dispatch commands, handle events.
4. **Destroy** — clean up with `editor.destroy()` (safe to call more than once).

### Document model

- `valueFormat: 'json'` is the default — the editor stores content using its structured document model.
- `valueFormat: 'html'` stores content as an HTML string.
- `editor.getDocument()` returns the structured document; `editor.getHtml()` returns the HTML string.

### Toolbar surfaces

- **Main toolbar** — `toolbarSettings.items` configures the buttons that sit at the top or bottom of the editor.
- **Quick toolbar** — `quickToolbarSettings` configures the contextual popups for `text`, `image`, `link`, and `table` selections.
- **Slash command popup** — `slashCommandSettings.items` configures the `/`-triggered popup.

### Command pipeline

- Inline format commands run through `editor.commands().<builder>().<setter>().apply()`.
- The pipeline converges on the same `actionBegin` / `actionComplete` events for any source — toolbar click, slash command, or programmatic invocation.

### Module injection

Some features are standalone modules that must be injected before the editor is constructed:

- `RichTextEditorUI.Inject(SlashCommand)` enables the slash-command popup.

The injection is a one-time, side-effect-only call. Subsequent `new RichTextEditorUI({...})` calls do not need to re-inject.

## Configuration Options

| Option | Type | Default | Purpose |
| --- | --- | --- | --- |
| `value` | `string` | — | Initial HTML content. Use with `valueFormat: 'html'`. |
| `valueFormat` | `'json' \| 'html'` | `'json'` | Storage format for `value`. |
| `width` | `string \| number` | — | Editor width (CSS string or numeric pixels). |
| `placeholder` | `string` | — | Instructional text shown when the editor is empty. |
| `toolbarSettings` | `ToolbarSettings` | — | Toolbar items, layout, floating behavior, click handlers, and key bindings. |
| `quickToolbarSettings` | `QuickToolbarSettings` | — | Quick-toolbar popups for text, image, link, and table selections. |
| `slashCommandSettings` | `SlashCommandSettings` | — | Slash-command popup items, size, and selection handler. |
| `fontFamily` | `FontFamilySettings` | — | `items` array of `{ text, value }` for the font-family dropdown. |
| `fontSize` | `FontSizeSettings` | — | `items` array of `{ text, value }` for the font-size dropdown. |
| `fontColor` | `ColorSettings` | — | `default`, `mode`, `columns`, `modeSwitcher`. |
| `backgroundColor` | `ColorSettings` | — | `default`, `mode`, `columns`, `modeSwitcher`. |
| `imageSettings` | `ImageSettings` | — | `allowedTypes`, `maxFileSize`, `saveFormat`, `uploadUrl`, `imageUrl`, `removeUrl`, `dimension`, `resize`. |
| `linkSettings` | `LinkSettings` | — | `linkOnPaste`, `defaultTarget`, `autoPrependProtocol`, `defaultProtocol`, `allowedProtocols`. |
| `tableSettings` | `TableSettings` | — | `resize` toggle. |
| `listSettings` | `ListSettings` | — | `numberFormatListItems`, `bulletFormatListItems`, `checklistType`. |

### Lifecycle / Event Callbacks

| Event | Purpose |
| --- | --- |
| `change` | Called when editor content changes (insertion, deletion, formatting). |
| `created` | Called when the editor is fully initialized and rendered. |
| `destroyed` | Called when the editor is destroyed. |
| `focus` | Called when the editor receives focus. |
| `blur` | Called when the editor loses focus. |
| `actionBegin` | Called before an editor action executes. |
| `actionComplete` | Called after an editor action completes. |
| `toolbarSettings.itemClicked` | Called whenever any toolbar button is clicked (main or quick toolbar). |
| `toolbarSettings.updatedToolbarStatus` | Called after the toolbar syncs its visual state with the current selection. |
| `slashCommandSettings.itemSelect` | Called when the user picks an item from the slash-command popup. |