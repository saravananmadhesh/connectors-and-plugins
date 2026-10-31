# Rich Text Editor Methods

## Table of Contents
- [AI Assistant Methods](#ai-assistant-methods)
- [Content Retrieval Methods](#content-retrieval-methods)
- [Content Manipulation Methods](#content-manipulation-methods)
- [Dialog Management](#dialog-management)
- [Focus Management](#focus-management)
- [Selection Methods](#selection-methods)
- [Toolbar Management](#toolbar-management)
- [Popup and UI Control](#popup-and-ui-control)
- [Component Lifecycle](#component-lifecycle)
- [Security and Sanitization](#security-and-sanitization)

---

## AI Assistant Methods

### addAIPromptResponse()

Adds a response to the last prompt or appends new prompt data in the AI Assistant. The output text should be in Markdown format and will be converted to HTML.

**Signature:**
```typescript
addAIPromptResponse(outputResponse: string | Object, isFinalUpdate?: boolean): void
```

**Parameters:**
- `outputResponse` (required): The response to add. Can be:
  - `string`: Response text to add to the last prompt
  - `Object`: Contains both prompt and response data to append/update
- `isFinalUpdate` (optional): Indicates if this is the final response, which hides the stop response button

**Example:**
```typescript
import { Component, ViewChild } from '@angular/core';
import { RichTextEditorComponent } from '@syncfusion/ej2-angular-richtexteditor';

@Component({
  template: `<ejs-richtexteditor #rte></ejs-richtexteditor>`,
  providers: [AIAssistantService]
})
export class AppComponent {
  @ViewChild('rte') rteObj!: RichTextEditorComponent;

  addAIResponse(): void {
    // Add streaming response
    this.rteObj.addAIPromptResponse('This is a generated response.', false);
    
    // Add final response
    this.rteObj.addAIPromptResponse('Final complete response.', true);
  }
}
```

### clearAIPromptHistory()

Clears all prompt and response data from the AI Assistant's history stack, resetting the entire conversation history.

**Signature:**
```typescript
clearAIPromptHistory(): void
```

**Example:**
```typescript
clearHistory(): void {
  this.rteObj.clearAIPromptHistory();
  console.log('AI history cleared');
}
```

### executeAIPrompt()

Executes the specified prompt in the AI Assistant. Sends the provided text as a prompt for processing and response.

**Signature:**
```typescript
executeAIPrompt(prompt: string): void
```

**Parameters:**
- `prompt` (required): The prompt text to execute (must be non-empty)

**Example:**
```typescript
sendPromptToAI(): void {
  const userPrompt = 'Improve the writing clarity of this content';
  this.rteObj.executeAIPrompt(userPrompt);
}
```

### getAIPromptHistory()

Returns the collection of prompt and response data from the AI Assistant.

**Signature:**
```typescript
getAIPromptHistory(): PromptModel[]
```

**Returns:** Array of `PromptModel` objects containing prompt-response pairs

**Example:**
```typescript
viewAIHistory(): void {
  const history = this.rteObj.getAIPromptHistory();
  console.log('AI conversation history:', history);
  
  history.forEach((item, index) => {
    console.log(`${index + 1}. Prompt: ${item.prompt}`);
    console.log(`   Response: ${item.response}`);
  });
}
```

### showAIAssistantPopup()

Shows the AI Assistant Query Popup.

**Signature:**
```typescript
showAIAssistantPopup(): void
```

**Example:**
```typescript
openAIAssistant(): void {
  this.rteObj.showAIAssistantPopup();
}
```

### hideAIAssistantPopup()

Hides the AI Assistant Query Popup.

**Signature:**
```typescript
hideAIAssistantPopup(): void
```

**Example:**
```typescript
closeAIAssistant(): void {
  this.rteObj.hideAIAssistantPopup();
}
```

---

## Content Retrieval Methods

### getHtml()

Retrieves the HTML content from the Rich Text Editor.

**Signature:**
```typescript
getHtml(): string
```

**Returns:** HTML content as a string

**Example:**
```typescript
saveContent(): void {
  const htmlContent = this.rteObj.getHtml();
  console.log('HTML content:', htmlContent);
  
  // Send to server
  this.http.post('/api/save', { content: htmlContent }).subscribe();
}
```

### getText()

Retrieves the text content as a plain string (without HTML tags).

**Signature:**
```typescript
getText(): string
```

**Returns:** Plain text content

**Example:**
```typescript
getPlainText(): void {
  const plainText = this.rteObj.getText();
  console.log('Plain text:', plainText);
  
  // Get character count
  const charCount = plainText.length;
  console.log('Characters:', charCount);
}
```

### getXhtml()

Retrieves XHTML-validated HTML content. Only works when the `enableXhtml` property is set to `true`.

**Signature:**
```typescript
getXhtml(): string
```

**Returns:** XHTML-validated content

**Example:**
```typescript
getValidatedContent(): void {
  // Ensure enableXhtml is true
  const xhtmlContent = this.rteObj.getXhtml();
  console.log('XHTML content:', xhtmlContent);
}
```

### getContent()

Retrieves the HTML or text content inside the RichTextEditor as an Element.

**Signature:**
```typescript
getContent(): Element
```

**Returns:** Content as DOM Element

**Example:**
```typescript
getContentElement(): void {
  const contentElement = this.rteObj.getContent();
  console.log('Content element:', contentElement);
  
  // Manipulate content directly
  const paragraphs = contentElement.querySelectorAll('p');
  console.log('Number of paragraphs:', paragraphs.length);
}
```

### getCharCount()

Calculates the maximum number of characters currently in the editor.

**Signature:**
```typescript
getCharCount(): number
```

**Returns:** Character count

**Example:**
```typescript
updateCharacterCount(): void {
  const count = this.rteObj.getCharCount();
  this.characterCount = count;
  console.log(`Character count: ${count}`);
  
  // Check against limit
  if (count > 5000) {
    console.warn('Character limit exceeded!');
  }
}
```

---

## Content Manipulation Methods

### executeCommand()

Executes a specified command within the rich text editor, optionally using additional parameters.

**Signature:**
```typescript
executeCommand(
  commandName: CommandName,
  value?: string | HTMLElement | ILinkCommandsArgs | IImageCommandsArgs | ITableCommandsArgs | FormatPainterSettingsModel | IAudioCommandsArgs | IVideoCommandsArgs | ICodeBlockCommandsArgs,
  option?: ExecuteCommandOption
): void
```

**Parameters:**
- `commandName` (required): The command to execute
- `value` (optional): Command-specific value or configuration
- `option` (optional): Additional execution options

**Available Commands:**
- **Formatting:** bold, italic, underline, strikeThrough, superscript, subscript, uppercase, lowercase
- **Color:** fontColor, backColor
- **Font:** fontName, fontSize
- **Alignment:** justifyCenter, justifyFull, justifyLeft, justifyRight
- **Lists:** insertOrderedList, insertUnorderedList, numberFormatList, bulletFormatList, checklist
- **Indent:** indent, outdent
- **Insert:** insertHTML, insertText, insertImage, insertAudio, insertVideo, insertTable, insertHorizontalRule, insertCode, insertCodeBlock, insertBrOnReturn, insertParagraph
- **Links:** createLink, editLink
- **Editing:** undo, redo, removeFormat
- **Format:** formatBlock, heading
- **Advanced:** applyFormatPainter, copyFormatPainter, escapeFormatPainter, emojiPicker, importWord, lineHeight, InlineCode

**Example - Basic Formatting:**
```typescript
applyBold(): void {
  this.rteObj.executeCommand('bold');
}

applyFontSize(): void {
  this.rteObj.executeCommand('fontSize', '18pt');
}

applyFontColor(): void {
  this.rteObj.executeCommand('fontColor', '#FF0000');
}
```

**Example - Insert HTML:**
```typescript
insertCustomContent(): void {
  const htmlToInsert = '<p><strong>Important:</strong> This is custom content.</p>';
  this.rteObj.executeCommand('insertHTML', htmlToInsert);
}
```

**Example - Insert Link:**
```typescript
import { ILinkCommandsArgs } from '@syncfusion/ej2-angular-richtexteditor';

insertLink(): void {
  const linkArgs: ILinkCommandsArgs = {
    url: 'url',
    text: 'Visit Example',
    title: 'Example Website',
    target: '_blank'
  };
  this.rteObj.executeCommand('createLink', linkArgs);
}
```

**Example - Insert Image:**
```typescript
import { IImageCommandsArgs } from '@syncfusion/ej2-angular-richtexteditor';

insertImage(): void {
  const imageArgs: IImageCommandsArgs = {
    url: 'url',
    altText: 'Sample Image',
    width: '300px',
    height: 'auto'
  };
  this.rteObj.executeCommand('insertImage', imageArgs);
}
```

**Example - Insert Table:**
```typescript
import { ITableCommandsArgs } from '@syncfusion/ej2-angular-richtexteditor';

insertTable(): void {
  const tableArgs: ITableCommandsArgs = {
    rows: 3,
    columns: 3,
    width: '100%'
  };
  this.rteObj.executeCommand('insertTable', tableArgs);
}
```

### clearUndoRedo()

Clears the undo and redo stacks and resets the toolbar status.

**Signature:**
```typescript
clearUndoRedo(): void
```

**Example:**
```typescript
resetHistory(): void {
  this.rteObj.clearUndoRedo();
  console.log('Undo/Redo history cleared');
}
```

### sanitizeHtml()

Sanitizes an HTML string to prevent cross-site scripting (XSS) attacks. Only applicable when `editorMode` is `HTML`.

**Signature:**
```typescript
sanitizeHtml(value: string): string
```

**Parameters:**
- `value` (required): The HTML content to sanitize

**Returns:** Sanitized HTML string

**Example:**
```typescript
cleanUserContent(): void {
  const userInput = '<script>alert("XSS")</script><p>Safe content</p>';
  const sanitized = this.rteObj.sanitizeHtml(userInput);
  console.log('Sanitized:', sanitized); // Output: <p>Safe content</p>
  
  // Set sanitized content
  this.rteObj.value = sanitized;
}
```

---

## Dialog Management

### showDialog()

Displays a specified dialog within the Rich Text Editor.

**Signature:**
```typescript
showDialog(type: DialogType): void
```

**Parameters:**
- `type` (required): The dialog type to display
  - `DialogType.InsertImage`: Image insertion dialog
  - `DialogType.InsertLink`: Link insertion dialog
  - `DialogType.InsertTable`: Table insertion dialog
  - `DialogType.InsertVideo`: Video insertion dialog
  - `DialogType.InsertAudio`: Audio insertion dialog

**Example:**
```typescript
openImageDialog(): void {
  this.rteObj.showDialog('InsertImage');
}

openLinkDialog(): void {
  this.rteObj.showDialog('InsertLink');
}

openTableDialog(): void {
  this.rteObj.showDialog('InsertTable');
}
```

### closeDialog()

Closes a specified dialog within the Rich Text Editor.

**Signature:**
```typescript
closeDialog(type: DialogType): void
```

**Parameters:**
- `type` (required): The dialog type to close (same types as `showDialog`)

**Example:**
```typescript
closeImageDialog(): void {
  this.rteObj.closeDialog('InsertImage');
}
```

---

## Focus Management

### focusIn()

Focuses the Rich Text Editor component.

**Signature:**
```typescript
focusIn(): void
```

**Example:**
```typescript
setFocusToEditor(): void {
  this.rteObj.focusIn();
}

ngAfterViewInit(): void {
  // Auto-focus editor on load
  setTimeout(() => {
    this.rteObj.focusIn();
  }, 100);
}
```

### focusOut()

Blurs the Rich Text Editor component, removing focus.

**Signature:**
```typescript
focusOut(): void
```

**Example:**
```typescript
removeFocus(): void {
  this.rteObj.focusOut();
}
```

---

## Selection Methods

### getRange()

Gets the selected range from the RichTextEditor's content.

**Signature:**
```typescript
getRange(): Range
```

**Returns:** The current selection Range object

**Example:**
```typescript
getCurrentSelection(): void {
  const range = this.rteObj.getRange();
  console.log('Selection range:', range);
  console.log('Start:', range.startContainer, range.startOffset);
  console.log('End:', range.endContainer, range.endOffset);
}
```

### selectRange()

Selects a specific content range or element.

**Signature:**
```typescript
selectRange(range: Range): void
```

**Parameters:**
- `range` (required): The range to select

**Example:**
```typescript
selectCustomRange(): void {
  const contentElement = this.rteObj.getContent();
  const range = document.createRange();
  const firstParagraph = contentElement.querySelector('p');
  
  if (firstParagraph) {
    range.selectNodeContents(firstParagraph);
    this.rteObj.selectRange(range);
  }
}
```

### selectAll()

Selects all content within the RichTextEditor.

**Signature:**
```typescript
selectAll(): void
```

**Example:**
```typescript
selectEntireContent(): void {
  this.rteObj.selectAll();
  console.log('All content selected');
}

copyAllContent(): void {
  this.rteObj.selectAll();
  document.execCommand('copy');
  console.log('Content copied to clipboard');
}
```

### getSelection()

Retrieves the HTML markup from the currently selected content.

**Signature:**
```typescript
getSelection(): string
```

**Returns:** HTML string of selected content

**Example:**
```typescript
getSelectedContent(): void {
  const selectedHtml = this.rteObj.getSelection();
  console.log('Selected HTML:', selectedHtml);
  
  if (selectedHtml) {
    // Process selected content
    this.processSelection(selectedHtml);
  }
}
```

### getSelectedHtml()

Retrieves the HTML representation of the selected content as a string.

**Signature:**
```typescript
getSelectedHtml(): string
```

**Returns:** HTML string of selected content

**Example:**
```typescript
copySelectedHtml(): void {
  const html = this.rteObj.getSelectedHtml();
  
  if (html) {
    navigator.clipboard.writeText(html);
    console.log('Selected HTML copied:', html);
  } else {
    console.log('No content selected');
  }
}
```

---

## Toolbar Management

### enableToolbarItem()

Enables the specified toolbar items in the Rich Text Editor.

**Signature:**
```typescript
enableToolbarItem(items: string | string[], muteToolbarUpdate?: boolean): void
```

**Parameters:**
- `items` (required): Single item or array of items to enable
- `muteToolbarUpdate` (optional): Whether to mute toolbar status updates

**Example:**
```typescript
enableFormatting(): void {
  this.rteObj.enableToolbarItem(['Bold', 'Italic', 'Underline']);
}

enableSingleItem(): void {
  this.rteObj.enableToolbarItem('Bold');
}
```

### disableToolbarItem()

Disables the specified toolbar items in the Rich Text Editor.

**Signature:**
```typescript
disableToolbarItem(items: string | string[], muteToolbarUpdate?: boolean): void
```

**Parameters:**
- `items` (required): Single item or array of items to disable
- `muteToolbarUpdate` (optional): Whether to mute toolbar status updates

**Example:**
```typescript
disableFormatting(): void {
  this.rteObj.disableToolbarItem(['Bold', 'Italic', 'Underline']);
}

conditionalDisable(): void {
  if (this.isReadOnlyMode) {
    this.rteObj.disableToolbarItem([
      'Bold', 'Italic', 'Underline', 'InsertImage', 'CreateLink'
    ]);
  }
}
```

### removeToolbarItem()

Removes the specified toolbar items from the Rich Text Editor.

**Signature:**
```typescript
removeToolbarItem(items: string | string[]): void
```

**Parameters:**
- `items` (required): Single item or array of items to remove

**Example:**
```typescript
removeAdvancedTools(): void {
  this.rteObj.removeToolbarItem(['SourceCode', 'FullScreen', 'Print']);
}

simplifyToolbar(): void {
  this.rteObj.removeToolbarItem([
    'FontColor',
    'BackgroundColor',
    'FontName',
    'FontSize',
    'Formats'
  ]);
}
```

---

## Popup and UI Control

### showEmojiPicker()

Displays the emoji picker. If coordinates are provided, positions the picker at those locations.

**Signature:**
```typescript
showEmojiPicker(x?: number, y?: number): void
```

**Parameters:**
- `x` (optional): X-coordinate for picker position
- `y` (optional): Y-coordinate for picker position

**Example:**
```typescript
openEmojiPicker(): void {
  this.rteObj.showEmojiPicker();
}

openEmojiAtPosition(event: MouseEvent): void {
  this.rteObj.showEmojiPicker(event.clientX, event.clientY);
}
```

### showFullScreen()

Displays the Rich Text Editor in full-screen mode.

**Signature:**
```typescript
showFullScreen(): void
```

**Example:**
```typescript
enterFullScreen(): void {
  this.rteObj.showFullScreen();
}
```

### showSourceCode()

Toggles the display of the HTML/Markdown source code within the editor.

**Signature:**
```typescript
showSourceCode(): void
```

**Example:**
```typescript
toggleSourceView(): void {
  this.rteObj.showSourceCode();
}
```

### showInlineToolbar()

Displays the inline quick toolbar.

**Signature:**
```typescript
showInlineToolbar(): void
```

**Example:**
```typescript
displayQuickToolbar(): void {
  this.rteObj.showInlineToolbar();
}
```

### hideInlineToolbar()

Hides the inline quick toolbar.

**Signature:**
```typescript
hideInlineToolbar(): void
```

**Example:**
```typescript
hideQuickToolbar(): void {
  this.rteObj.hideInlineToolbar();
}
```

### refreshUI()

Refreshes the view of the editor.

**Signature:**
```typescript
refreshUI(): void
```

**Example:**
```typescript
refreshEditor(): void {
  this.rteObj.refreshUI();
}

updateAfterDynamicChange(): void {
  // After changing properties or content programmatically
  this.rteObj.height = 600;
  this.rteObj.refreshUI();
}
```

---

## Component Lifecycle

### destroy()

Destroys the component by detaching/removing all event handlers, attributes, and CSS classes. Clears the component's element content.

**Signature:**
```typescript
destroy(): void
```

**Example:**
```typescript
ngOnDestroy(): void {
  if (this.rteObj) {
    this.rteObj.destroy();
  }
}

cleanupEditor(): void {
  this.rteObj.destroy();
  console.log('Editor destroyed');
}
```

---

## Common Method Patterns

### Chaining Operations

```typescript
formatAndInsert(): void {
  // Apply bold formatting
  this.rteObj.executeCommand('bold');
  
  // Insert custom content
  this.rteObj.executeCommand('insertHTML', '<p>New content</p>');
  
  // Focus editor
  this.rteObj.focusIn();
}
```

### Conditional Toolbar Management

```typescript
updateToolbarBasedOnRole(userRole: string): void {
  if (userRole === 'viewer') {
    // Disable all editing tools
    this.rteObj.disableToolbarItem([
      'Bold', 'Italic', 'Underline', 'InsertImage', 
      'CreateLink', 'InsertTable'
    ]);
  } else if (userRole === 'contributor') {
    // Enable basic formatting only
    this.rteObj.enableToolbarItem(['Bold', 'Italic', 'Underline']);
    this.rteObj.disableToolbarItem(['InsertImage', 'CreateLink']);
  } else if (userRole === 'admin') {
    // Enable all tools
    this.rteObj.enableToolbarItem([
      'Bold', 'Italic', 'Underline', 'InsertImage', 
      'CreateLink', 'InsertTable'
    ]);
  }
}
```

### Content Validation Before Save

```typescript
saveWithValidation(): void {
  const htmlContent = this.rteObj.getHtml();
  const textContent = this.rteObj.getText();
  const charCount = this.rteObj.getCharCount();
  
  // Check if content is empty
  if (textContent.trim().length === 0) {
    alert('Please enter some content before saving.');
    return;
  }
  
  // Check character limit
  if (charCount > 10000) {
    alert('Content exceeds maximum character limit of 10,000.');
    return;
  }
  
  // Sanitize content
  const sanitizedContent = this.rteObj.sanitizeHtml(htmlContent);
  
  // Save to server
  this.http.post('/api/content', { content: sanitizedContent })
    .subscribe(
      () => console.log('Content saved successfully'),
      (error) => console.error('Save failed:', error)
    );
}
```

### Auto-Save Implementation

```typescript
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('rte') rteObj!: RichTextEditorComponent;
  private autoSaveInterval: number;
  
  ngOnInit(): void {
    // Auto-save every 30 seconds
    this.autoSaveInterval = setInterval(() => {
      this.autoSave();
    }, 30000);
  }
  
  ngOnDestroy(): void {
    if (this.autoSaveInterval) {
      clearInterval(this.autoSaveInterval);
    }
  }
  
  autoSave(): void {
    const content = this.rteObj.getHtml();
    
    if (content && content.trim().length > 0) {
      localStorage.setItem('rte-autosave', content);
      console.log('Content auto-saved');
    }
  }
  
  restoreAutoSave(): void {
    const savedContent = localStorage.getItem('rte-autosave');
    
    if (savedContent) {
      this.rteObj.value = savedContent;
      console.log('Content restored from auto-save');
    }
  }
}
```

---

## See Also

- [Properties Reference](properties.md) - Component properties and configuration
- [Events Reference](events.md) - Available event handlers
- [Editor Value and Selection](editor-value-and-selection.md) - Value binding and selection APIs
- [Toolbar Configuration](toolbar.md) - Toolbar customization
