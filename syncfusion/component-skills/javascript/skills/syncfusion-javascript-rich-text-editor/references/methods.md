# Methods

All public methods available on the `RichTextEditor` instance from `@syncfusion/ej2-richtexteditor`.

## Table of Contents
- [addAIPromptResponse](#addaipromptresponse)
- [addEventListener](#addeventlistener)
- [appendTo](#appendto)
- [clearAIPromptHistory](#clearaiprompthistory)
- [clearUndoRedo](#clearundoredo)
- [closeDialog](#closedialog)
- [dataBind](#databind)
- [destroy](#destroy)
- [disableToolbarItem](#disabletoolbaritem)
- [enableToolbarItem](#enabletoolbaritem)
- [executeAIPrompt](#executeaiprompt)
- [executeCommand](#executecommand)
- [focusIn](#focusin)
- [focusOut](#focusout)
- [getAIPromptHistory](#getaiprompthistory)
- [getCharCount](#getcharcount)
- [getContent](#getcontent)
- [getHtml](#gethtml)
- [getRange](#getrange)
- [getRootElement](#getrootelement)
- [getSelectedHtml](#getselectedhtml)
- [getSelection](#getselection)
- [getText](#gettext)
- [getXhtml](#getxhtml)
- [hideAIAssistantPopup](#hideaiassistantpopup)
- [hideInlineToolbar](#hideinlinetoolbar)
- [refresh](#refresh)
- [refreshUI](#refreshui)
- [removeEventListener](#removeeventlistener)
- [removeToolbarItem](#removetoolbaritem)
- [sanitizeHtml](#sanitizehtml)
- [selectAll](#selectall)
- [selectRange](#selectrange)
- [showAIAssistantPopup](#showaiassistantpopup)
- [showDialog](#showdialog)
- [showEmojiPicker](#showemojipicker)
- [showFullScreen](#showfullscreen)
- [showInlineToolbar](#showinlinetoolbar)
- [showSourceCode](#showsourcecode)
- [Inject (static)](#inject)

---

## addAIPromptResponse

```typescript
addAIPromptResponse(outputResponse: string | Object, isFinalUpdate?: boolean): void
```

Adds a response to the last prompt, or appends new prompt+response data to the AI Assistant conversation.

> The `outputResponse` text should be in Markdown format — it is automatically converted to HTML.

**Parameters:**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `outputResponse` | `string \| Object` | ✅ | Response text (string) or an object with both prompt and response data. |
| `isFinalUpdate` | `boolean` | optional | When `true`, hides the Stop Responding button (response is complete). |

---

## addEventListener

```typescript
addEventListener(eventName: string, handler: Function): void
```

Registers an event handler for the specified event.

**Parameters:**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `eventName` | `string` | ✅ | Name of the event to listen to. |
| `handler` | `Function` | ✅ | Callback function executed when the event fires. |

---

## appendTo

```typescript
appendTo(selector?: string | HTMLElement): void
```

Appends and initializes the editor inside the given target element.

**Parameters:**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `selector` | `string \| HTMLElement` | optional | CSS selector string or DOM element to attach the editor to. |

**Example:**

```typescript
const editor = new RichTextEditor({ value: '<p>Hello</p>' });
editor.appendTo('#editor');
```

---

## clearAIPromptHistory

```typescript
clearAIPromptHistory(): void
```

Clears all prompt and response data from the AI Assistant's history stack, resetting the entire conversation.

---

## clearUndoRedo

```typescript
clearUndoRedo(): void
```

Clears both the undo and redo stacks and disables the undo/redo toolbar buttons.

---

## closeDialog

```typescript
closeDialog(type: DialogType): void
```

Programmatically closes a specified dialog.

**Parameters:**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `type` | `DialogType` | ✅ | The dialog to close. |

**`DialogType` values:**

| Value | Description |
|---|---|
| `DialogType.InsertImage` | Image insert dialog. |
| `DialogType.InsertLink` | Link insert dialog. |
| `DialogType.InsertTable` | Table insert dialog. |
| `DialogType.InsertAudio` | Audio insert dialog. |
| `DialogType.InsertVideo` | Video insert dialog. |

---

## dataBind

```typescript
dataBind(): void
```

Immediately applies all pending property changes to the component without waiting for the next render cycle.

**Example:**

```typescript
editor.value = '<p>Updated content</p>';
editor.dataBind(); // Apply the change immediately
```

---

## destroy

```typescript
destroy(): void
```

Destroys the component by removing all event handlers, DOM attributes, CSS classes, and element content.

---

## disableToolbarItem

```typescript
disableToolbarItem(items: string | string[], muteToolbarUpdate?: boolean): void
```

Disables one or more toolbar items.

**Parameters:**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `items` | `string \| string[]` | ✅ | Toolbar item name(s) to disable. |
| `muteToolbarUpdate` | `boolean` | optional | When `true`, suppresses toolbar status update events. |

**Example:**

```typescript
editor.disableToolbarItem('Bold');
editor.disableToolbarItem(['Bold', 'Italic']);
```

---

## enableToolbarItem

```typescript
enableToolbarItem(items: string | string[], muteToolbarUpdate?: boolean): void
```

Enables one or more previously disabled toolbar items.

**Parameters:**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `items` | `string \| string[]` | ✅ | Toolbar item name(s) to enable. |
| `muteToolbarUpdate` | `boolean` | optional | When `true`, suppresses toolbar status update events. |

---

## executeAIPrompt

```typescript
executeAIPrompt(prompt: string): void
```

Programmatically sends a prompt to the AI Assistant for processing.

**Parameters:**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `prompt` | `string` | ✅ | Non-empty prompt text to execute. |

---

## executeCommand

```typescript
executeCommand(
  commandName: CommandName,
  value?: string | HTMLElement | ILinkCommandsArgs | IImageCommandsArgs | ITableCommandsArgs | FormatPainterSettingsModel | IAudioCommandsArgs | IVideoCommandsArgs | ICodeBlockCommandsArgs,
  option?: ExecuteCommandOption
): void
```

Executes a built-in editor command programmatically.

**Parameters:**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `commandName` | `CommandName` | ✅ | The command to execute (see list below). |
| `value` | various | optional | Argument required by specific commands (e.g., URL for `insertImage`). |
| `option` | `ExecuteCommandOption` | optional | Additional execution options (e.g., enable undo). |

**Available `CommandName` values:**

`bold`, `italic`, `underline`, `strikeThrough`, `superscript`, `subscript`, `uppercase`, `lowercase`, `fontColor`, `fontName`, `fontSize`, `backColor`, `justifyCenter`, `justifyFull`, `justifyLeft`, `justifyRight`, `undo`, `redo`, `createLink`, `formatBlock`, `heading`, `indent`, `insertHTML`, `insertOrderedList`, `insertUnorderedList`, `insertParagraph`, `outdent`, `removeFormat`, `insertText`, `insertImage`, `insertAudio`, `insertVideo`, `insertHorizontalRule`, `insertBrOnReturn`, `insertCode`, `insertTable`, `editImage`, `editLink`, `applyFormatPainter`, `copyFormatPainter`, `escapeFormatPainter`, `emojiPicker`, `InlineCode`, `importWord`, `insertCodeBlock`, `numberFormatList`, `bulletFormatList`, `checklist`, `lineHeight`

**Key argument interfaces:**

**`ILinkCommandsArgs`** — for `createLink` / `editLink`:

| Property | Type | Description |
|---|---|---|
| `url` | `string` | Link URL. |
| `text` | `string` | Link display text. |
| `title` | `string` | Link `title` attribute. |
| `target` | `string` | Link `target` attribute. |
| `selectParent` | `Node[]` | Existing link node to edit. |
| `selection` | `NodeSelection` | Current selection instance. |

**`IImageCommandsArgs`** — for `insertImage` / `editImage`:

| Property | Type | Description |
|---|---|---|
| `url` | `string` | Image `src`. |
| `altText` | `string` | Image `alt` attribute. |
| `cssClass` | `string` | CSS class for the image. |
| `width` | `Object` | Width constraints (min, max, actual). |
| `height` | `Object` | Height constraints (min, max, actual). |
| `selectParent` | `Node[]` | Existing image node to edit. |
| `selection` | `NodeSelection` | Current selection instance. |

**`ITableCommandsArgs`** — for `insertTable`:

| Property | Type | Description |
|---|---|---|
| `rows` | `number` | Number of rows. |
| `columns` | `number` | Number of columns. |
| `width` | `Object` | Table width constraints. |
| `selection` | `NodeSelection` | Current selection instance. |

**`ICodeBlockCommandsArgs`** — for `insertCodeBlock`:

| Property | Type | Description |
|---|---|---|
| `language` | `string` | Programming language identifier. |
| `label` | `string` | Display label for the language. |

**Example:**

```typescript
// Bold selected text
editor.executeCommand('bold');

// Insert an image
editor.executeCommand('insertImage', {
  url: 'https://example.com/image.png',
  altText: 'Example image',
});

// Insert HTML content
editor.executeCommand('insertHTML', '<strong>Inserted content</strong>');
```

---

## focusIn

```typescript
focusIn(): void
```

Sets focus to the Rich Text Editor content area.

---

## focusOut

```typescript
focusOut(): void
```

Removes focus from the Rich Text Editor.

---

## getAIPromptHistory

```typescript
getAIPromptHistory(): PromptModel[]
```

Returns the full conversation history between the user and the AI Assistant.

**Returns:** `PromptModel[]`

---

## getCharCount

```typescript
getCharCount(): number
```

Returns the current number of characters in the editor content.

**Returns:** `number`

---

## getContent

```typescript
getContent(): Element
```

Retrieves the editor's content wrapper DOM element.

**Returns:** `Element`

---

## getHtml

```typescript
getHtml(): string
```

Retrieves the full HTML content from the editor.

**Returns:** `string`

**Example:**

```typescript
const html = editor.getHtml();
console.log(html); // '<p>Hello, World!</p>'
```

---

## getRange

```typescript
getRange(): Range
```

Returns the current selection `Range` from the editor content.

**Returns:** `Range`

---

## getRootElement

```typescript
getRootElement(): HTMLElement
```

Returns the root DOM element of the component.

**Returns:** `HTMLElement`

---

## getSelectedHtml

```typescript
getSelectedHtml(): string
```

Returns the HTML representation of the currently selected content.

**Returns:** `string`

---

## getSelection

```typescript
getSelection(): string
```

Returns the HTML markup of the currently selected content.

**Returns:** `string`

---

## getText

```typescript
getText(): string
```

Returns the plain text content of the editor (HTML tags stripped).

**Returns:** `string`

---

## getXhtml

```typescript
getXhtml(): string
```

Returns XHTML-validated HTML content. Requires `enableXhtml: true`.

**Returns:** `string`

---

## hideAIAssistantPopup

```typescript
hideAIAssistantPopup(): void
```

Programmatically hides/closes the AI Assistant popup.

---

## hideInlineToolbar

```typescript
hideInlineToolbar(): void
```

Programmatically hides the inline quick toolbar.

---

## refresh

```typescript
refresh(): void
```

Applies all pending property changes and re-renders the component.

---

## refreshUI

```typescript
refreshUI(): void
```

Refreshes the editor view without a full re-render.

---

## removeEventListener

```typescript
removeEventListener(eventName: string, handler: Function): void
```

Removes a previously registered event handler.

**Parameters:**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `eventName` | `string` | ✅ | Name of the event. |
| `handler` | `Function` | ✅ | The handler function to remove. |

---

## removeToolbarItem

```typescript
removeToolbarItem(items: string | string[]): void
```

Permanently removes one or more items from the toolbar.

**Parameters:**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `items` | `string \| string[]` | ✅ | Toolbar item name(s) to remove. |

---

## sanitizeHtml

```typescript
sanitizeHtml(value: string): string
```

Sanitizes an HTML string to prevent XSS attacks. Only applicable in HTML mode.

**Parameters:**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `value` | `string` | ✅ | HTML content to sanitize. |

**Returns:** `string` — sanitized HTML.

---

## selectAll

```typescript
selectAll(): void
```

Selects all content within the editor.

---

## selectRange

```typescript
selectRange(range: Range): void
```

Applies a specific `Range` selection to the editor content.

**Parameters:**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `range` | `Range` | ✅ | The range to select. |

---

## showAIAssistantPopup

```typescript
showAIAssistantPopup(): void
```

Programmatically opens/shows the AI Assistant popup.

---

## showDialog

```typescript
showDialog(type: DialogType): void
```

Programmatically opens a specified dialog.

**Parameters:**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `type` | `DialogType` | ✅ | The dialog to open. |

See [`closeDialog`](#closedialog) for the `DialogType` enum values.

**Example:**

```typescript
import { DialogType } from '@syncfusion/ej2-richtexteditor';

editor.showDialog(DialogType.InsertImage);
```

---

## showEmojiPicker

```typescript
showEmojiPicker(x?: number, y?: number): void
```

Displays the emoji picker. Optionally positions it at the given coordinates.

**Parameters:**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `x` | `number` | optional | X-axis position for the picker. |
| `y` | `number` | optional | Y-axis position for the picker. |

---

## showFullScreen

```typescript
showFullScreen(): void
```

Expands the editor to full-screen mode.

---

## showInlineToolbar

```typescript
showInlineToolbar(): void
```

Programmatically shows the inline quick toolbar.

---

## showSourceCode

```typescript
showSourceCode(): void
```

Toggles the display of the HTML/Markdown source code view.

---

## Inject

```typescript
static Inject(...moduleList: Function[]): void
```

Dynamically injects feature modules into the component. Must be called **before** instantiating `new RichTextEditor(...)`.

**Parameters:**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `moduleList` | `Function[]` | ✅ | One or more feature modules to inject. |

**Example:**

```typescript
import {
  RichTextEditor, Toolbar, Link, Image,
  HtmlEditor, QuickToolbar, Table,
} from '@syncfusion/ej2-richtexteditor';

RichTextEditor.Inject(Toolbar, Link, Image, HtmlEditor, QuickToolbar, Table);

const editor = new RichTextEditor({ value: '<p>Hello</p>' });
editor.appendTo('#editor');
```

**Available modules:**

| Module | Feature |
|---|---|
| `HtmlEditor` | HTML editing mode |
| `MarkdownEditor` | Markdown editing mode |
| `Toolbar` | Editor toolbar |
| `Link` | Hyperlink support |
| `Image` | Image insertion |
| `Audio` | Audio insertion |
| `Video` | Video insertion |
| `Table` | Table support |
| `QuickToolbar` | Quick context toolbars |
| `PasteCleanup` | Paste cleanup |
| `Count` | Character counter |
| `Resize` | Editor resizing |
| `FileManager` | File manager integration |
| `CodeBlock` | Code block support |
