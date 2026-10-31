# Methods

Complete reference for all client-side methods available on the Syncfusion ASP.NET Core Rich Text Editor JavaScript instance.

Access the instance via:
```javascript
var rte = document.getElementById('editor').ej2_instances[0];
```

> Method names follow JavaScript camelCase conventions when called from client-side scripts, but are documented here in PascalCase per ASP.NET Core conventions.

---

## Content Methods

### GetHtml
**Signature:** `getHtml(): string`  
Retrieves the current HTML content from the editor.

```javascript
var html = rte.getHtml();
console.log(html);
```

### GetText
**Signature:** `getText(): string`  
Retrieves the plain text content (without HTML tags).

### GetContent
**Signature:** `getContent(): Element`  
Retrieves the DOM element representing the editor's content area.

### GetSelectedHtml
**Signature:** `getSelectedHtml(): string`  
Retrieves the HTML representation of the currently selected content.

### GetSelection
**Signature:** `getSelection(): string`  
Retrieves the HTML markup of the currently selected content.

### GetXhtml
**Signature:** `getXhtml(): string`  
Retrieves XHTML-validated HTML content. Requires `enableXhtml="true"`.

### GetCharCount
**Signature:** `getCharCount(): number`  
Returns the total number of characters currently in the editor.

### GetRange
**Signature:** `getRange(): Range`  
Returns the current selection `Range` object from the editor content.

### SelectAll
**Signature:** `selectAll(): void`  
Selects all content inside the editor.

### SelectRange
**Signature:** `selectRange(range: Range): void`  
Selects a specific content range within the editor.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `range` | `Range` | Yes | The range to select. |

### Print
**Signature:** `print(): void`  
Opens the browser's print dialog to print the editor's content.

---

## Command Execution

### ExecuteCommand
**Signature:** `executeCommand(commandName: CommandName, value?: ..., option?: ExecuteCommandOption): void`  
Programmatically executes a formatting or editing command.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `commandName` | `CommandName` | Yes | The command to execute (see table below). |
| `value` | various | No | Value required by the command (e.g., URL for links, HTML for `insertHTML`). |
| `option` | `ExecuteCommandOption` | No | Additional options such as enabling undo support. |

**Available CommandName values:**

| Command | Description |
|---|---|
| `bold` | Toggle bold |
| `italic` | Toggle italic |
| `underline` | Toggle underline |
| `strikeThrough` | Toggle strikethrough |
| `superscript` | Toggle superscript |
| `subscript` | Toggle subscript |
| `uppercase` | Convert to uppercase |
| `lowercase` | Convert to lowercase |
| `fontColor` | Apply font color |
| `fontName` | Apply font family |
| `fontSize` | Apply font size |
| `backColor` | Apply background/highlight color |
| `justifyCenter` | Center align |
| `justifyFull` | Justify align |
| `justifyLeft` | Left align |
| `justifyRight` | Right align |
| `undo` | Undo last action |
| `redo` | Redo last undone action |
| `createLink` | Insert or edit a hyperlink |
| `formatBlock` | Apply a block format |
| `heading` | Apply a heading |
| `indent` | Increase indent |
| `outdent` | Decrease indent |
| `insertHTML` | Insert arbitrary HTML at cursor |
| `insertText` | Insert plain text at cursor |
| `insertOrderedList` | Insert ordered (numbered) list |
| `insertUnorderedList` | Insert unordered (bullet) list |
| `insertParagraph` | Insert a paragraph break |
| `insertImage` | Insert an image |
| `insertAudio` | Insert audio |
| `insertVideo` | Insert video |
| `insertHorizontalRule` | Insert a horizontal rule |
| `insertBrOnReturn` | Insert `<br>` on Enter |
| `insertCode` | Insert inline code |
| `insertTable` | Insert a table |
| `insertCodeBlock` | Insert a code block |
| `editImage` | Open image edit dialog |
| `editLink` | Open link edit dialog |
| `applyFormatPainter` | Apply copied format |
| `copyFormatPainter` | Copy format from selection |
| `escapeFormatPainter` | Exit format painter mode |
| `emojiPicker` | Open emoji picker |
| `InlineCode` | Apply inline code style |
| `importWord` | Import Word document |
| `numberFormatList` | Apply numbered format list |
| `bulletFormatList` | Apply bullet format list |
| `checklist` | Insert checklist |
| `lineHeight` | Apply line height |
| `removeFormat` | Remove all formatting |

```javascript
// Insert HTML at cursor position
rte.executeCommand('insertHTML', '<strong>Hello World</strong>');

// Insert a table (3 rows × 3 cols)
rte.executeCommand('insertTable', { rows: 3, columns: 3 });

// Apply font color
rte.executeCommand('fontColor', { color: '#ff0000' });
```

---

## Toolbar Methods

### EnableToolbarItem
**Signature:** `enableToolbarItem(items: string | string[], muteToolbarUpdate?: boolean): void`  
Enables one or more toolbar items.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `items` | `string \| string[]` | Yes | Item name(s) to enable. |
| `muteToolbarUpdate` | `bool` | No | Suppresses toolbar state refresh when `true`. |

### DisableToolbarItem
**Signature:** `disableToolbarItem(items: string | string[], muteToolbarUpdate?: boolean): void`  
Disables one or more toolbar items.

### RemoveToolbarItem
**Signature:** `removeToolbarItem(items: string | string[]): void`  
Permanently removes one or more toolbar items from the toolbar.

---

## Focus Methods

### FocusIn
**Signature:** `focusIn(): void`  
Programmatically sets focus on the editor.

### FocusOut
**Signature:** `focusOut(): void`  
Programmatically removes focus from the editor.

---

## Inline Toolbar Methods

### ShowInlineToolbar
**Signature:** `showInlineToolbar(): void`  
Displays the inline quick toolbar.

### HideInlineToolbar
**Signature:** `hideInlineToolbar(): void`  
Hides the inline quick toolbar.

---

## Dialog Methods

### ShowDialog
**Signature:** `showDialog(type: DialogType): void`  
Opens the specified dialog.

| `DialogType` value | Description |
|---|---|
| `InsertImage` | Insert Image dialog |
| `InsertLink` | Insert Link dialog |
| `InsertTable` | Insert Table dialog |
| `InsertAudio` | Insert Audio dialog |
| `InsertVideo` | Insert Video dialog |

### CloseDialog
**Signature:** `closeDialog(type: DialogType): void`  
Closes the specified dialog (same `DialogType` values as above).

---

## Undo / Redo Methods

### ClearUndoRedo
**Signature:** `clearUndoRedo(): void`  
Clears the undo and redo stacks and disables the undo/redo toolbar buttons.

---

## Source Code

### ShowSourceCode
**Signature:** `showSourceCode(): void`  
Toggles the HTML/Markdown source code view within the editor.

---

## Full Screen

### ShowFullScreen
**Signature:** `showFullScreen(): void`  
Expands the editor into full-screen mode.

---

## Security

### SanitizeHtml
**Signature:** `sanitizeHtml(value: string): string`  
Sanitizes an HTML string to prevent XSS attacks. Only applicable in HTML mode.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `value` | `string` | Yes | Raw HTML string to sanitize. |

---

## Emoji Picker

### ShowEmojiPicker
**Signature:** `showEmojiPicker(x?: number, y?: number): void`  
Displays the emoji picker, optionally at specific coordinates.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `x` | `number` | No | Horizontal position (pixels). |
| `y` | `number` | No | Vertical position (pixels). |

---

## AI Assistant Methods

### AddAIPromptResponse
**Signature:** `addAIPromptResponse(outputResponse: string | Object, isFinalUpdate?: boolean): void`  
Adds or appends a response to the AI Assistant interface.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `outputResponse` | `string \| Object` | Yes | Response text (Markdown format converted to HTML) or an object with prompt + response data. |
| `isFinalUpdate` | `bool` | No | When `true`, hides the "Stop Responding" button indicating the response is complete. |

### ExecuteAIPrompt
**Signature:** `executeAIPrompt(prompt: string): void`  
Programmatically sends a prompt to the AI Assistant.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `prompt` | `string` | Yes | The prompt text to send (must be non-empty). |

### GetAIPromptHistory
**Signature:** `getAIPromptHistory(): PromptModel[]`  
Returns the full conversation history (array of prompt/response pairs) from the AI Assistant.

### ClearAIPromptHistory
**Signature:** `clearAIPromptHistory(): void`  
Clears all stored AI Assistant prompt and response history.

### ShowAIAssistantPopup
**Signature:** `showAIAssistantPopup(): void`  
Programmatically opens the AI Assistant popup interface.

### HideAIAssistantPopup
**Signature:** `hideAIAssistantPopup(): void`  
Programmatically closes the AI Assistant popup interface.

---

## Component Lifecycle Methods

### Refresh
**Signature:** `refresh(): void`  
Applies all pending property changes and re-renders the component.

### RefreshUI
**Signature:** `refreshUI(): void`  
Refreshes the visual state of the editor without a full re-render.

### DataBind
**Signature:** `dataBind(): void`  
Immediately applies all pending property changes to the component.

### Destroy
**Signature:** `destroy(): void`  
Destroys the component, detaching all event handlers, attributes, and CSS classes, and clearing the element's content.

### GetRootElement
**Signature:** `getRootElement(): HTMLElement`  
Returns the root DOM element of the component.

---

## Event Listener Methods

### AddEventListener
**Signature:** `addEventListener(eventName: string, handler: Function): void`  
Attaches an event handler to the specified event.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `eventName` | `string` | Yes | Name of the event (e.g., `"change"`, `"focus"`). |
| `handler` | `Function` | Yes | Callback function to invoke when the event fires. |

### RemoveEventListener
**Signature:** `removeEventListener(eventName: string, handler: Function): void`  
Removes a previously attached event handler.

---

## Miscellaneous

### AppendTo
**Signature:** `appendTo(selector?: string | HTMLElement): void`  
Appends the Rich Text Editor control to the specified DOM element.

### Inject
**Signature:** `inject(moduleList: Function[]): void`  
Dynamically injects required feature modules into the component.
