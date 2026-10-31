# Editor Methods

## Table of Contents
- [Overview](#overview)
- [`commands()` — fluent command builder](#commands--fluent-command-builder)
  - [Inline format commands](#inline-format-commands)
  - [Color commands](#color-commands)
  - [Typography commands](#typography-commands)
  - [List commands](#list-commands)
  - [End-to-end programmatic example](#end-to-end-programmatic-example)
- [`updateToolbarItems(updates)` — runtime toolbar reconciliation](#updatetoolbaritemsupdates--runtime-toolbar-reconciliation)
- [`destroy()` — destroy the editor](#destroy--destroy-the-editor)
- [`getText()` — read the plain text content](#gettext--read-the-plain-text-content)
- [API Reference](#api-reference)
  - [CommandExecutor](#commandexecutor)
  - [EditorDocument](#editordocument)
  - [BlockNode](#blocknode)
  - [InlineNode](#inlinenode)
  - [EditorMark](#editormark)
  - [CustomNodeAttributeType](#customnodeattributetype)
  - [CustomNodeContent](#customnodecontent)
  - [CustomNodeGroup](#customnodegroup)
  - [CustomNodeName](#customnodename)
  - [EditorKeyBindingAction](#editorkeybindingaction)
  - [FormattingStateService](#formattingstateservice)
  - [InteractionSettings](#interactionsettings)
  - [InteractionSettingsModel](#interactionsettingsmodel)
  - [RichTextEditorUIModel (full component API)](#richtexteditoruimodel-full-component-api)
    - [Properties](#properties)
    - [Events](#events)

---

## Overview

The Modern Rich Text Editor exposes a programmatic API through the `RichTextEditorUIComponent` instance. The two surfaces that appear in the user guide are:

1. The fluent `commands()` builder — used to dispatch any editor action programmatically (formatting, lists, code blocks, callouts, collapsible sections, etc.) without going through the toolbar.
2. The runtime `updateToolbarItems(updates)` call — used to add, remove, or reorder toolbar items without re-rendering the whole toolbar.

This page consolidates both surfaces. For the live link to the API documentation that lists every available method on `RichTextEditorUIComponent`, see the future `api-references.md` reference that will be authored from the official API documentation.

## `commands()` — fluent command builder

The Modern Rich Text Editor exposes every inline format through two equivalent surfaces — a toolbar click and the fluent `editor.commands().<builder>().<setter>().apply()` chain. Both routes converge on the same `actionBegin` / `actionComplete` pipeline and share identical cancellation and history semantics.

### Inline format commands

Toggle commands carry no payload. They flip the mark for the selection or set the active typing mark for a collapsed caret.

```ts
this.rteObj.commands().bold().apply();
this.rteObj.commands().italic().apply();
this.rteObj.commands().underline().apply();
this.rteObj.commands().strikethrough().apply();
this.rteObj.commands().subscript().apply();
this.rteObj.commands().superscript().apply();
this.rteObj.commands().inlineCode().apply();
this.rteObj.commands().clearFormat().apply();
this.rteObj.commands().uppercase().apply();
this.rteObj.commands().lowercase().apply();
```

See [Formatting](formatting.md) for the full inline-format reference including the programmatic payload for `fontColor`, `backgroundColor`, `fontSize`, and `fontName`.

### Color commands

Both color commands share the `ColorCommand { color: string }` payload. An empty string removes the corresponding mark from the selection.

```ts
// Apply
this.rteObj.commands().fontColor().color('#DC2626').apply();
this.rteObj.commands().backgroundColor().color('rgba(255, 247, 199, 1)').apply();

// Remove
this.rteObj.commands().fontColor().color('').apply();
this.rteObj.commands().backgroundColor().color('').apply();
```

The empty-string signal is the documented convention for removing a color mark. Any other "no color" string is treated as a literal color.

### Typography commands

```ts
// Font size — `size` accepts any CSS size string ('12px', '1.5em', 'small', '120%').
// '{ size: 'Default' }' (or an empty string) is treated as remove the font size.
this.rteObj.commands().fontSize().size('16px').apply();
this.rteObj.commands().fontSize().size('').apply(); // remove the font size

// Font family — toolbar item label is `FontName`, command name is `fontFamily`,
// and the fluent builder is exposed as `.fontName()` to match the toolbar label.
this.rteObj.commands().fontName().family('Georgia, serif').apply();
this.rteObj.commands().fontName().family('').apply(); // remove the font family
```

### List commands

All list operations use the following commands:
- `numberedList` — Create a numbered list
- `bulletList` — Create a bulleted list
- `toggleTaskList` — Create a checklist
- `setListStyle` — Change the current list style

```ts
// Create a bullet list
this.rteObj.commands().bulletList().apply();

// Change to Roman numerals
this.rteObj.commands().numberedList().options({ listType: 'upper-alpha' }).apply();

// Toggle checklist
this.rteObj.commands().toggleTaskList().apply();
```

See [Lists](lists.md) for full `listType` options and configuration.

### End-to-end programmatic example

```ts
import { Component, ViewChild } from '@angular/core';
import { RichTextEditorUIModule, RichTextEditorUIComponent } from '@syncfusion/ej2-angular-richtexteditor-ui';

@Component({
    imports: [RichTextEditorUIModule],
    standalone: true,
    selector: 'app-root',
    styleUrls: ['./app.component.css'],
    templateUrl: './app.component.html'
})
export class App {
    @ViewChild('editor') public rteObj!: RichTextEditorUIComponent;

    public placeholder: string = 'Type something ...';
    public toolbarSettings: object = {
        items: [
            'Bold', 'Italic', 'Underline', 'Strikethrough',
            '|',
            'FontSize', 'FontName', 'FontColor', 'BackgroundColor',
            '|',
            'InlineCode', 'ClearFormat'
        ]
    };

    public applyBold(): void { this.rteObj.commands().bold().apply(); }
    public applyUnderline(): void { this.rteObj.commands().underline().apply(); }
    public applyFontSize(): void { this.rteObj.commands().fontSize().size('18px').apply(); }
    public applyFontColor(): void { this.rteObj.commands().fontColor().color('#00A3FF').apply(); }
    public applyHighlight(): void { this.rteObj.commands().backgroundColor().color('#FFF7C7').apply(); }
    public applyClearFormat(): void { this.rteObj.commands().clearFormat().apply(); }
}
```

```html
<div class="external-toolbar">
    <button id="boldBtn" (click)="applyBold()">Bold</button>
    <button id="underlineBtn" (click)="applyUnderline()">Underline</button>
    <button id="fontSizeBtn" (click)="applyFontSize()">18px Font Size</button>
    <button id="fontColorBtn" (click)="applyFontColor()">Blue Font Color</button>
    <button id="highlightBtn" (click)="applyHighlight()">Highlight</button>
    <button id="clearFormatBtn" (click)="applyClearFormat()">Clear Format</button>
</div>
<ejs-richtexteditor-ui
    #editor
    [placeholder]="placeholder"
    [toolbarSettings]="toolbarSettings">
</ejs-richtexteditor-ui>
```

Custom toolbar items can also dispatch through the fluent builder. The `toolbarSettings.itemClicked` handler reads `args.item.actionId` and calls the matching `commands()` method:

```ts
public toolbarSettings: object = {
    itemClicked: (args: ClickedArgs): void => {
        if (args.item && args.item.actionId === 'uppercase') {
            // dispatch the `uppercase` command through the fluent builder
            this.rteObj.commands().uppercase().apply();
        }
    }
};
```

## `updateToolbarItems(updates)` — runtime toolbar reconciliation

If your toolbar needs to change based on application state — for example, showing a different set of tools depending on the user's permissions — call `editor.updateToolbarItems(updates)` with a batch of add/remove/reorder operations. The editor reconciles only what actually changed rather than re-rendering the whole toolbar, so things like an open dropdown or current focus aren't disrupted.

## `destroy()` — destroy the editor

Call `editor.destroy()` to tear down the editor and release its resources. The editor instance will raise the `destroyed` event as the teardown completes.

```ts
public destroy(): void {
    if (this.rteObj) {
        this.rteObj.destroy();
    }
}
```

```html
<ejs-richtexteditor-ui #editor></ejs-richtexteditor-ui>
<button id="destroy-btn" (click)="destroy()">
    Destroy Editor Component
</button>
```

## `getText()` — read the plain text content

`editor.getText()` returns the editor's plain text content (no HTML markup). It is used in the [Toolbar — `itemClicked`](toolbar.md#itemclicked-event) example to implement a word-count custom action:

```ts
public onItemClicked(args: any): void {
    if (args.item) {
        const words: number = this.rteObj.getText().trim().split(/\s+/).filter(Boolean).length;
        alert('Word count: ' + words);
    }
}
```
---

## API Reference

### CommandExecutor

Source: <https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/commandexecutor>

Command executor providing chainable builders for all supported commands.

#### Methods

Each method returns a chainable builder that lets you configure a command and then call `.apply()` to dispatch it. Builders returned are listed next to each entry.

- `backgroundColor(): ColorCommandBuilder` — Get a builder for the `backgroundColor` command.
- `blockQuote(): ToggleCommandBuilder` — Get a builder for the `blockQuote` command.
- `bold(): ToggleCommandBuilder` — Get a builder for the `bold` command.
- `bulletList(): ListCommandBuilder` — Get a builder for the `bulletList` command.
- `callout(): CalloutCommandBuilder` — Get a builder for the `callout` command.
- `clearFormat(): ToggleCommandBuilder` — Get a builder for the `clearFormat` command.
- `codeBlock(): CodeBlockCommandBuilder` — Get a builder for the `codeBlock` command.
- `collapsible(): CollapsibleCommandBuilder` — Get a builder for the `collapsible` command.
- `fontColor(): ColorCommandBuilder` — Get a builder for the `fontColor` command.
- `fontName(): FontFamilyCommandBuilder` — Get a builder for the `fontName` command.
- `fontSize(): FontSizeCommandBuilder` — Get a builder for the `fontSize` command.
- `heading1(): ToggleCommandBuilder` — Get a builder for the `heading1` command.
- `heading2(): ToggleCommandBuilder` — Get a builder for the `heading2` command.
- `heading3(): ToggleCommandBuilder` — Get a builder for the `heading3` command.
- `heading4(): ToggleCommandBuilder` — Get a builder for the `heading4` command.
- `horizontalRule(): HorizontalRuleCommandBuilder` — Get a builder for the `horizontalRule` command.
- `indent(): ToggleCommandBuilder` — Get a builder for the `indent` command.
- `inlineCode(): ToggleCommandBuilder` — Get a builder for the `inlineCode` command.
- `italic(): ToggleCommandBuilder` — Get a builder for the `italic` command.
- `link(): LinkCommandBuilder` — Get a builder for the `link` command.
- `lowercase(): ToggleCommandBuilder` — Get a builder for the `lowercase` command.
- `numberedList(): ListCommandBuilder` — Get a builder for the `numberedList` command.
- `outdent(): ToggleCommandBuilder` — Get a builder for the `outdent` command.
- `paragraph(): ToggleCommandBuilder` — Get a builder for the `paragraph` command.
- `redo(): ToggleCommandBuilder` — Get a builder for the `redo` command.
- `setListStyle(): ListStyleCommandBuilder` — Get a builder for the `setListStyle` command.
- `setTextAlign(): AlignmentCommandBuilder` — Get a builder for the `setTextAlign` command.
- `strikethrough(): ToggleCommandBuilder` — Get a builder for the `strikethrough` command.
- `subscript(): ToggleCommandBuilder` — Get a builder for the `subscript` command.
- `superscript(): ToggleCommandBuilder` — Get a builder for the `superscript` command.
- `toggleTaskList(): ChecklistCommandBuilder` — Get a builder for the `toggleTaskList` command.
- `underline(): ToggleCommandBuilder` — Get a builder for the `underline` command.
- `undo(): ToggleCommandBuilder` — Get a builder for the `undo` command.
- `uppercase(): ToggleCommandBuilder` — Get a builder for the `uppercase` command.

---

### EditorDocument

Source: <https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/editordocument>

Public document model — the same shape used for `value` when `valueFormat` is `'json'`. Always has `type: 'doc'` and may have any registered block-level children.

#### Properties

- `attrs: Record` — Node attributes (alignment, indent, color, etc.).
- `children: BlockNode[]` — Child block nodes in the document.
- `marks: EditorMark[]` — Marks applied to this node (for block-level mark support).
- `schemaVersion: number` — Schema version — used for future migration handling.

---

### BlockNode

Source: <https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/blocknode>

Block-level node union — built-in plus registered custom block nodes.

Members:

- `ParagraphNode`
- `HeadingNode`
- `BlockquoteNode`
- `CodeBlockNode`
- `OrderedListNode`
- `BulletListNode`

---

### InlineNode

Source: <https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/inlinenode>

Inline-level node union — built-in plus registered custom inline nodes.

Members:

- `TextNode`
- `HardBreakNode`

---

### EditorMark

Source: <https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/editormark>

Inline formatting marks — built-in plus registered custom marks.

Members:

- `BoldMark`
- `ItalicMark`
- `UnderlineMark`
- `StrikeMark`
- `SubscriptMark`
- `SuperscriptMark`
- `CodeMark`
- `LinkMark`
- `TextColorMark`
- `BackgroundColorMark`

---

### CustomNodeAttributeType

Source: <https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/customnodeattributetype>

Members:

- `string`
- `number`
- `boolean`
- `enum`

---

### CustomNodeContent

Source: <https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/customnodecontent>

Members:

- `block`
- `inline`
- `text`
- `none`

---

### CustomNodeGroup

Source: <https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/customnodegroup>

Coarse content cardinality for the runtime schema. The spec uses typed arrays (`content: BlockNode[]`) at the model level; the runtime maps those to ProseMirror-style cardinality rules.

Members:

- `block`
- `inline`

---

### CustomNodeName

Source: <https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/customnodename>

Members:

- `CustomBlockNodeName`
- `CustomInlineNodeName`

---

### EditorKeyBindingAction

Source: <https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/editorkeybindingaction>

Members:

- `toolbar-focus`
- `link`
- `image`
- `audio`
- `video`
- `table`
- `undo`
- `redo`
- `bold`
- `italic`
- `underline`
- `strikethrough`
- `superscript`
- `subscript`
- `indents`
- `outdents`
- `clear-format`
- `ordered-list`
- `unordered-list`
- `checklist`
- `inlinecode`
- `uppercase`
- `lowercase`
- `code-block`

---

### FormattingStateService

Source: <https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/formattingstateservice>

Service for querying and caching the editor's formatting state. Ensures formatting state is queried only once per command, and the result is shared to both toolbar and quick-toolbar modules.

#### Methods

- `getCurrentState(): FormattingState | null` — Returns the most recently cached formatting state.
- `refreshFormattingState(editorCore: EditorCore): FormattingState` — Queries the current formatting state from the editor and caches it. This is the single query point for all toolbar UI updates. Parameter `editorCore`: the editor core instance.

---

### InteractionSettings

Source: <https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/interactionsettings>

Configures the interactions settings of the RichTextEditor.

#### Properties

- `enableAutoFormat: boolean` — Specifies whether Markdown-style auto formatting is enabled while typing. When `true`, supported Markdown-style syntax entered at the beginning of a block is converted into the corresponding editor structure (for example `# `, `## `, `> `, `- `, `1. `, ```` ``` ````). Defaults to `true`.
- `enableTabKeyIndent: boolean` — Specifies whether the `Tab` and `Shift+Tab` keys can be used for indentation. When `true`:
  - `Tab` at the beginning of a supported block indents the block.
  - `Shift+Tab` at the beginning of a supported block outdents the block.
  - `Tab` in the middle of a block inserts tab spacing at the cursor position.
  - If the current selection does not support indentation or tab spacing, normal browser focus navigation is preserved.
  - When `false`, `Tab` and `Shift+Tab` do not trigger editor indentation.
  - Defaults to `true`.

---

### InteractionSettingsModel

Source: <https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/interactionsettingsmodel>

Interface for a class `InteractionSettings`.

#### Properties

- `enableAutoFormat: boolean` — Specifies whether Markdown-style auto formatting is enabled while typing. When `true`, supported Markdown-style syntax entered at the beginning of a block is converted into the corresponding editor structure (for example `# `, `## `, `> `, `- `, `1. `, ```` ``` ````).
- `enableTabKeyIndent: boolean` — Specifies whether the `Tab` and `Shift+Tab` keys can be used for indentation. When `true`:
  - `Tab` at the beginning of a supported block indents the block.
  - `Shift+Tab` at the beginning of a supported block outdents the block.
  - `Tab` in the middle of a block inserts tab spacing at the cursor position.
  - If the current selection does not support indentation or tab spacing, normal browser focus navigation is preserved.
  - When `false`, `Tab` and `Shift+Tab` do not trigger editor indentation.

---

### RichTextEditorUIModel (full component API)

Source: <https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/richtexteditoruimodel>

Interface for a class `RichTextEditorUI`. This is the canonical property + event surface of the `<ejs-richtexteditor-ui>` component.

#### Properties

- `backgroundColor: BackgroundColorModel` — Configures the background color (text highlight color) picker settings in the Rich Text Editor. This property controls the color palette, default background color selection, color picker mode (Palette or Picker), number of columns in the palette, mode switcher visibility, and recent colors functionality. Uses the same configuration shape as `fontColor`.
- `cssClass: string` — Specifies custom CSS classes to be applied to the Rich Text Editor root element. Multiple classes can be separated by spaces to apply multiple CSS classes for custom styling.
- `enable: boolean` — Enable or disable the Rich Text Editor. When set to `false`, the editor becomes non-interactive and all toolbar items are disabled. The editable area remains visible but input is prevented.
- `enablePersistence: boolean` — Enables persistence for the Editor state. When set to `true`, the editor state (including content) is persisted across page reloads using the browser's local storage.
- `enableRtl: boolean` — Enables right-to-left (RTL) text direction for the Rich Text Editor. When set to `true`, the editor layout, toolbar, and content direction are flipped to support RTL languages like Arabic and Hebrew.
- `fontColor: FontColorModel` — Configures the font color picker settings in the Rich Text Editor. This property controls the color palette, default color selection, color picker mode (Palette or Picker), number of columns in the palette, mode switcher visibility, and recent colors functionality shown in the FontColor toolbar item.
- `fontFamily: FontFamilyModel` — Defines the font family settings of the Rich Text Editor. Configures the font family dropdown items, default font family selection, and the width of the font family dropdown in the toolbar.
- `fontSize: FontSizeModel` — Defines the font size settings of the Rich Text Editor. Configures the font size dropdown items, default font size selection, and the width of the font size dropdown in the toolbar.
- `format: FormatModel` — Defines the Format toolbar item configuration for the Rich Text Editor. This property controls the formatting options available in the Format dropdown menu in the toolbar.
- `height: number | string` — Specifies the height of the Rich Text Editor container.
- `htmlAttributes: { [key: string]: string }` — Additional HTML attributes (such as `id`, `class`, `style`, etc.) applied to the root element of the editor.
- `imageSettings: ImageSettingsModel` — Configures the image settings of the Rich Text Editor. Controls allowed file types, maximum file size, dimensions, display mode, save format, and the upload/remove server endpoints.
- `interactionSettings: InteractionSettingsModel` — Configures the interaction settings of the Rich Text Editor — auto-format Markdown shortcuts and Tab-key indentation.
- `keyBindings: { [key in EditorKeyBindingAction]?: string }` — Custom keyboard shortcut overrides. Maps a key-binding action to a shortcut string (e.g. `{ link: 'ctrl+alt+k' }`).
- `linkSettings: LinkSettingsModel` — Configures the link settings of the Rich Text Editor. Controls auto-link-on-paste, default target, protocol auto-prepending, and the allowed-protocol allow-list.
- `listSettings: ListSettingsModel` — Configures list settings — the bullet styles and number styles available in the toolbar dropdowns, and the checklist shape.
- `locale: string` — Specifies the locale (IETF language tag) used by the editor for its UI strings.
- `placeholder: string` — Specifies the placeholder text shown when the editor is empty.
- `quickToolbarSettings: QuickToolbarSettingsModel` — Configures the quick toolbar (contextual popup) for text, image, link, and table surfaces.
- `readonly: boolean` — Specifies whether the editor is read-only. When `true`, the editor is not editable but remains focusable.
- `saveInterval: number` — Specifies the idle interval (in milliseconds) after which auto-save triggers. Used together with `enableAutoSave`.
- `slashCommandSettings: SlashCommandSettingsModel` — Configures the slash-command (`/`) popup. Includes `enable`, `items`, `popupWidth`, `popupHeight`, and the `itemSelect` event.
- `tableSettings: TableSettingsModel` — Configures the table insertion behavior of the Rich Text Editor.
- `toolbarSettings: ToolbarSettingsModel` — Configures the main toolbar — `items`, `type`, `position`, `enableFloating`, `floatingOffset`, plus the `itemClicked` and `updatedToolbarStatus` events.
- `undoRedoSteps: number` — Specifies the maximum number of actions retained in the undo/redo stack.
- `undoRedoTimer: number` — Specifies the debounce interval (in milliseconds) for coalescing consecutive edits into a single undo/redo step.
- `value: string | EditorDocument` — Specifies the editor content. With `valueFormat: 'html'`, accepts an HTML string. With `valueFormat: 'json'`, accepts an `EditorDocument`.
- `valueFormat: ValueFormat` — Specifies the format used to interpret the `value` property. Allowed values: `'html'` (value is an HTML string) or `'json'` (value is an `EditorDocument` object).
- `width: number | string` — Specifies the width of the Rich Text Editor container.

#### Events

- `actionBegin: EmitType<Object>` — Triggered before an editor action is executed (inserting, deleting, formatting, or modifying content). Allows the action to be cancelled.
- `actionComplete: EmitType<Object>` — Triggered after an editor action has completed.
- `beforeDialogClose: EmitType<BeforeDialogCloseEventArgs>` — Triggered before a feature dialog closes. See [Editor Events — API Reference](#changeeventargs) for the args shape.
- `beforeDialogOpen: EmitType<BeforeDialogOpenEventArgs>` — Triggered before a feature dialog opens.
- `beforeFileDrop: EmitType<BeforeFileDropEventArgs>` — Triggered when one or more files are dropped or pasted onto the editable area, before the image module routes them through the typed command pipeline. See [File Upload](file-upload.md#beforefiledropeventargs) for the args shape.
- `beforeFileUpload: EmitType<BeforeFileUploadEventArgs>` — Triggered before a file upload begins.
- `blur: EmitType<FocusEventArgs>` — Triggered when the editor loses focus.
- `change: EmitType<ChangeEventArgs>` — Triggered whenever the editor content changes (insert, delete, move, replace, format).
- `created: EmitType<Object>` — Triggered after the Rich Text Editor UI component is successfully initialized and rendered.
- `destroyed: EmitType<Object>` — Triggered when the Rich Text Editor component is destroyed and removed from the application.
- `fileRemoving: EmitType<FileRemovingEventArgs>` — Triggered before a previously-uploaded image is removed. See [File Upload](file-upload.md#fileremovingeventargs).
- `fileSelected: EmitType<FileSelectedEventArgs>` — Triggered after the user selects one or more files for upload.
- `fileUploadFailed: EmitType<FileUploadFailedEventArgs>` — Triggered when there is an error during media upload.
- `fileUploadSuccess: EmitType<FileUploadSuccessEventArgs>` — Triggered when a file has been successfully uploaded to the server side.
- `fileUploading: EmitType<FileUploadingEventArgs>` — Triggered while a file is being uploaded to the server.
- `focus: EmitType<FocusEventArgs>` — Triggered when focus enters the Rich Text Editor shell (editable area or toolbar).
