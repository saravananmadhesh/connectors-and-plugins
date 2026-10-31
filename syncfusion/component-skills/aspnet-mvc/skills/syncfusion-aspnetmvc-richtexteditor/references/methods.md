# Rich Text Editor Methods

Complete reference for all client-side methods on the Syncfusion ASP.NET MVC Rich Text Editor JavaScript instance.

**Access the instance:**
```javascript
var rte = document.getElementById('editor').ej2_instances[0];
```

> Method names use JavaScript camelCase conventions when called from client-side scripts.

---

## Content Methods

| Method | Signature | Returns | Description |
|---|---|---|---|
| `getHtml()` | `string` | HTML string | Retrieves current HTML content from the editor. |
| `getText()` | `string` | Plain text | Retrieves plain text without HTML tags. |
| `getContent()` | `Element` | DOM Element | Returns the DOM element of editor content area. |
| `getSelectedHtml()` | `string` | HTML string | Retrieves selected content as HTML. |
| `getSelection()` | `string` | HTML string | Retrieves selected content markup. |
| `getXhtml()` | `string` | XHTML string | Returns XHTML-validated content (requires `enableXhtml: true`). |
| `getCharCount()` | `number` | Character count | Returns total character count including spaces. |
| `getRange()` | `Range` | DOM Range object | Returns current selection Range object. |
| `selectAll()` | `void` | — | Selects all content in the editor. |
| `print()` | `void` | — | Opens browser print dialog for editor content. |

**Usage Examples:**
```javascript
var rte = document.getElementById('editor').ej2_instances[0];

// Get content
var html = rte.getHtml();
var text = rte.getText();
var charCount = rte.getCharCount();

// Select all
rte.selectAll();
```

### SelectRange
**Signature:** `selectRange(range: Range): void`  
Selects a specific range in the editor.

```javascript
var range = document.createRange();
range.selectNodeContents(rte.getContent());
rte.selectRange(range);
```

---

## Command Execution

### ExecuteCommand
**Signature:** `executeCommand(commandName: string, value?: any, option?: object): void`  
Programmatically executes formatting or editing commands.

| Parameter | Type | Description |
|---|---|---|
| `commandName` | `string` | Command to execute (see table below) |
| `value` | `any` (optional) | Command-specific value (URL, HTML, color, etc.) |
| `option` | `object` (optional) | Additional options |

**Available Commands:**

| Category | Commands |
|---|---|
| **Text Formatting** | `bold`, `italic`, `underline`, `strikethrough`, `superscript`, `subscript`, `uppercase`, `lowercase` |
| **Colors & Fonts** | `fontColor`, `fontName`, `fontSize`, `backColor` |
| **Alignment** | `justifyLeft`, `justifyCenter`, `justifyRight`, `justifyFull` |
| **Lists & Indentation** | `insertOrderedList`, `insertUnorderedList`, `indent`, `outdent` |
| **History** | `undo`, `redo` |
| **Links** | `createLink`, `removeLink` |
| **Insertion** | `insertHTML`, `insertText`, `insertImage`, `insertAudio`, `insertVideo`, `insertTable`, `insertCode`, `insertCodeBlock`, `insertParagraph`, `insertHorizontalRule` |
| **Format** | `removeFormat`, `formatBlock`, `heading`, `lineHeight`, `InlineCode` |
| **Other** | `emojiPicker`, `importWord`, `checklist`, `editImage`, `editLink` |

**Usage Examples:**
```javascript
// Text formatting
rte.executeCommand('bold');
rte.executeCommand('italic');

// With values
rte.executeCommand('fontSize', '18px');
rte.executeCommand('fontColor', { color: '#ff0000' });
rte.executeCommand('fontName', 'Arial');

// Insert content
rte.executeCommand('insertHTML', '<b>Bold text</b>');
rte.executeCommand('insertTable', { rows: 3, columns: 3 });

// Create link
rte.executeCommand('createLink', {
    url: 'https://example.com',
    text: 'Example'
});
```

---

## Toolbar Methods

### EnableToolbarItem
**Signature:** `enableToolbarItem(items: string | string[], muteToolbarUpdate?: boolean): void`  
Enables one or more toolbar items.

| Parameter | Type | Description |
|---|---|---|
| `items` | `string \| string[]` | Item name(s) to enable |
| `muteToolbarUpdate` | `boolean` | Suppress toolbar refresh when true |

### DisableToolbarItem
**Signature:** `disableToolbarItem(items: string | string[], muteToolbarUpdate?: boolean): void`  
Disables one or more toolbar items.

### RemoveToolbarItem
**Signature:** `removeToolbarItem(items: string | string[]): void`  
Removes toolbar items permanently.

**Usage Examples:**
```javascript
rte.enableToolbarItem(['Bold', 'Italic']);
rte.disableToolbarItem('InsertImage');
rte.removeToolbarItem(['Undo', 'Redo']);
```

---

## Focus & Selection Methods

| Method | Signature | Description |
|---|---|---|
| `focusIn()` | `void` | Sets focus on the editor. |
| `focusOut()` | `void` | Removes focus from the editor. |
| `showInlineToolbar()` | `void` | Displays the inline quick toolbar. |
| `hideInlineToolbar()` | `void` | Hides the inline quick toolbar. |

---

## Dialog Methods

### ShowDialog / CloseDialog
**Signature:** `showDialog(type: string): void` / `closeDialog(type: string): void`  
Opens or closes specific dialogs.

| Dialog Type | Description |
|---|---|
| `InsertImage` | Insert Image dialog |
| `InsertLink` | Insert Link dialog |
| `InsertTable` | Insert Table dialog |
| `InsertAudio` | Insert Audio dialog |
| `InsertVideo` | Insert Video dialog |

**Usage:**
```javascript
rte.showDialog('InsertImage');
rte.closeDialog('InsertImage');
```

---

## History, View & Security Methods

| Method | Signature | Description |
|---|---|---|
| `clearUndoRedo()` | `void` | Clears undo/redo history. |
| `showSourceCode()` | `void` | Toggles between HTML/Markdown source view. |
| `showFullScreen()` | `void` | Expands editor to fullscreen. |
| `sanitizeHtml(value: string)` | `string` | Sanitizes HTML to prevent XSS attacks. |
| `showEmojiPicker(x?: number, y?: number)` | `void` | Opens emoji picker at optional coordinates. |

**Usage Examples:**
```javascript
rte.clearUndoRedo();
rte.showSourceCode();
rte.showFullScreen();

var clean = rte.sanitizeHtml('<p>Safe</p><script>alert("XSS")</script>');
rte.showEmojiPicker(100, 200);
```

---

## AI Assistant Methods

| Method | Signature | Parameters | Description |
|---|---|---|---|
| `executeAIPrompt(prompt)` | `void` | `prompt: string` | Sends prompt to AI Assistant. |
| `addAIPromptResponse(response, isFinalUpdate?)` | `void` | `response: string \| object`, `isFinalUpdate?: boolean` | Adds AI response to interface. Hides "Stop" button when final. |
| `getAIPromptHistory()` | `PromptModel[]` | — | Returns full conversation history. |
| `clearAIPromptHistory()` | `void` | — | Clears all AI history. |
| `showAIAssistantPopup()` | `void` | — | Opens AI Assistant popup. |
| `hideAIAssistantPopup()` | `void` | — | Closes AI Assistant popup. |

**Usage Example:**
```javascript
rte.executeAIPrompt("Summarize this content");

// Add response
rte.addAIPromptResponse("Generated response", true);

// Get history
var history = rte.getAIPromptHistory();
console.log(history);
```

---

## Component Lifecycle Methods

| Method | Signature | Description |
|---|---|---|
| `refresh()` | `void` | Applies pending property changes and re-renders. |
| `refreshUI()` | `void` | Refreshes visual state without full re-render. |
| `dataBind()` | `void` | Applies pending property changes immediately. |
| `destroy()` | `void` | Destroys component, removes event handlers and clears DOM. |
| `getRootElement()` | `HTMLElement` | Returns root DOM element of component. |
| `appendTo(selector?)` | `void` | Appends component to specified DOM element. |

**Usage Examples:**
```javascript
// Update content and apply changes
rte.value = "New content";
rte.dataBind();

// Refresh UI after property changes
rte.refresh();

// Get and inspect root
var root = rte.getRootElement();
console.log(root);

// Destroy when done
rte.destroy();
```

---

## Event Listener Methods

| Method | Signature | Parameters | Description |
|---|---|---|---|
| `addEventListener(eventName, handler)` | `void` | `eventName: string`, `handler: Function` | Attaches event handler. |
| `removeEventListener(eventName, handler)` | `void` | `eventName: string`, `handler: Function` | Removes event handler. |

**Usage Example:**
```javascript
function onContentChange(e) {
    console.log("Content changed:", e.value);
}

rte.addEventListener('change', onContentChange);
rte.removeEventListener('change', onContentChange);
```

---

## Common Patterns

### Pattern 1: Get & Modify Content
```javascript
var rte = document.getElementById('editor').ej2_instances[0];
var currentHtml = rte.getHtml();
rte.value = currentHtml + "<p>Appended</p>";
rte.dataBind();
```

### Pattern 2: Programmatic Formatting
```javascript
rte.selectAll();
rte.executeCommand('bold');
rte.executeCommand('fontSize', '16px');
rte.executeCommand('fontColor', { color: '#0066cc' });
```

### Pattern 3: Form Submission
```javascript
document.getElementById('submitBtn').addEventListener('click', function() {
    var rte = document.getElementById('editor').ej2_instances[0];
    document.getElementById('contentField').value = rte.getHtml();
    document.getElementById('form').submit();
});
```

### Pattern 4: Character Limit Validation
```javascript
rte.addEventListener('change', function(e) {
    var charCount = rte.getCharCount();
    if (charCount > 5000) {
        alert('Content exceeds 5000 characters');
        rte.value = rte.getText().substring(0, 5000);
    }
});
```

---

