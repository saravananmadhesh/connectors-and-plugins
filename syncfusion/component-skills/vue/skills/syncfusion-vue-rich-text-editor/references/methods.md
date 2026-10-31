# Vue Rich Text Editor Methods

## Table of Contents
- [Overview](#overview)
- [Content Access Methods](#content-access-methods)
- [Selection & Range Methods](#selection--range-methods)
- [Command Execution Methods](#command-execution-methods)
- [Toolbar Management Methods](#toolbar-management-methods)
- [Dialog Methods](#dialog-methods)
- [Focus & State Methods](#focus--state-methods)
- [AI Assistant Methods](#ai-assistant-methods)
- [Utility Methods](#utility-methods)

## Overview

The Rich Text Editor provides a comprehensive API of methods to programmatically control the editor, manipulate content, and interact with its features. All methods are accessed through the component's instance reference.

**Method Access Pattern:**
```vue
<template>
  <ejs-richtexteditor ref="rteRef" />
</template>

<script setup>
import { ref } from 'vue';

const rteRef = ref(null);

const callMethod = () => {
  // Access methods through ej2Instances
  rteRef.value.ej2Instances.methodName();
};
</script>
```

## Content Access Methods

### getHtml
**Signature:** `getHtml(): string`  
**Returns:** HTML content as a string  
**Description:** Retrieves the current HTML content from the Rich Text Editor.

```vue
<script setup>
import { ref } from 'vue';

const rteRef = ref(null);

const getContent = () => {
  const htmlContent = rteRef.value.ej2Instances.getHtml();
  console.log('HTML:', htmlContent);
  return htmlContent;
};
</script>
```

**Use Cases:**
- Save content to database
- Generate document exports
- Content validation before submission

### getText
**Signature:** `getText(): string`  
**Returns:** Plain text content (HTML tags stripped)  
**Description:** Retrieves the text content as a string, removing all HTML markup.

```vue
<script setup>
const getPlainText = () => {
  const textContent = rteRef.value.ej2Instances.getText();
  console.log('Plain text:', textContent);
  return textContent;
};
</script>
```

**Use Cases:**
- Character count for validation
- Search/indexing without HTML
- Preview generation

### getXhtml
**Signature:** `getXhtml(): string`  
**Returns:** XHTML-validated HTML content  
**Description:** Retrieves XHTML validated HTML content when `enableXhtml` property is set to `true`.

```vue
<template>
  <ejs-richtexteditor 
    ref="rteRef"
    :enableXhtml="true"
  />
</template>

<script setup>
const getValidatedContent = () => {
  const xhtmlContent = rteRef.value.ej2Instances.getXhtml();
  console.log('XHTML:', xhtmlContent);
  return xhtmlContent;
};
</script>
```

### getContent
**Signature:** `getContent(): Element`  
**Returns:** DOM Element containing the editor content  
**Description:** Retrieves the content area DOM element of the editor.

```vue
<script setup>
const getContentElement = () => {
  const contentElem = rteRef.value.ej2Instances.getContent();
  console.log('Content element:', contentElem);
  
  // Direct DOM manipulation (use cautiously)
  const images = contentElem.querySelectorAll('img');
  console.log('Image count:', images.length);
};
</script>
```

**Warning:** Direct DOM manipulation can break the editor. Use `executeCommand` or events instead when possible.

### getCharCount
**Signature:** `getCharCount(): number`  
**Returns:** Number of characters in the editor  
**Description:** Calculates the maximum number of characters currently in the Rich Text Editor.

```vue
<script setup>
const checkCharCount = () => {
  const charCount = rteRef.value.ej2Instances.getCharCount();
  console.log('Character count:', charCount);
  
  if (charCount > 1000) {
    alert('Content exceeds 1000 characters');
  }
};
</script>
```

**Use Cases:**
- Enforce character limits
- Show character counter UI
- Validate before submission

## Selection & Range Methods

### getSelection
**Signature:** `getSelection(): string`  
**Returns:** HTML markup of selected content  
**Description:** Retrieves the HTML markup from the currently selected content.

```vue
<script setup>
const getSelectedText = () => {
  const selection = rteRef.value.ej2Instances.getSelection();
  console.log('Selected HTML:', selection);
  return selection;
};

const formatSelection = () => {
  const selected = getSelectedText();
  if (selected) {
    // Apply custom formatting to selection
    console.log('Formatting selected content');
  } else {
    alert('Please select some text first');
  }
};
</script>
```

### getSelectedHtml
**Signature:** `getSelectedHtml(): string`  
**Returns:** HTML string representation of selection  
**Description:** Retrieves the HTML representation of the selected content as a string.

```vue
<script setup>
const copySelectedHtml = () => {
  const selectedHtml = rteRef.value.ej2Instances.getSelectedHtml();
  
  if (selectedHtml) {
    navigator.clipboard.writeText(selectedHtml);
    console.log('Copied to clipboard:', selectedHtml);
  }
};
</script>
```

### getRange
**Signature:** `getRange(): Range`  
**Returns:** Browser Range object  
**Description:** Get the selected range from the RichTextEditor's content.

```vue
<script setup>
const getCurrentRange = () => {
  const range = rteRef.value.ej2Instances.getRange();
  console.log('Start:', range.startContainer, range.startOffset);
  console.log('End:', range.endContainer, range.endOffset);
  return range;
};
</script>
```

### selectAll
**Signature:** `selectAll(): void`  
**Description:** Selects all content within the RichTextEditor.

```vue
<script setup>
const selectAllContent = () => {
  rteRef.value.ej2Instances.selectAll();
  console.log('All content selected');
};

// Common use: Select all before copy
const copyAll = () => {
  selectAllContent();
  document.execCommand('copy');
  alert('Content copied to clipboard');
};
</script>
```

### selectRange
**Signature:** `selectRange(range: Range): void`  
**Parameters:**
- `range` (Range) - The range to select  
**Description:** Selects a specific content range or element.

```vue
<script setup>
const selectSpecificText = () => {
  const content = rteRef.value.ej2Instances.getContent();
  const range = document.createRange();
  
  // Select first paragraph
  const firstP = content.querySelector('p');
  if (firstP) {
    range.selectNodeContents(firstP);
    rteRef.value.ej2Instances.selectRange(range);
  }
};

const highlightSearchResult = (searchText) => {
  const content = rteRef.value.ej2Instances.getContent();
  const textNode = findTextNode(content, searchText);
  
  if (textNode) {
    const range = document.createRange();
    range.selectNode(textNode);
    rteRef.value.ej2Instances.selectRange(range);
  }
};
</script>
```

## Command Execution Methods

### executeCommand
**Signature:** `executeCommand(commandName: CommandName, value?: string | HTMLElement | ILinkCommandsArgs | IImageCommandsArgs | ITableCommandsArgs | FormatPainterSettingsModel | IAudioCommandsArgs | IVideoCommandsArgs | ICodeBlockCommandsArgs, option?: ExecuteCommandOption): void`

**Description:** Executes a specified command within the rich text editor.

**Available Commands:**
- **Text Formatting:** bold, italic, underline, strikeThrough, superscript, subscript
- **Case:** uppercase, lowercase
- **Font:** fontColor, fontName, fontSize, backColor
- **Alignment:** justifyCenter, justifyFull, justifyLeft, justifyRight
- **Lists:** insertOrderedList, insertUnorderedList, numberFormatList, bulletFormatList
- **Indentation:** indent, outdent
- **Insert:** insertHTML, insertText, insertImage, insertAudio, insertVideo, insertTable, insertHorizontalRule, insertCode, insertCodeBlock
- **Block:** formatBlock, heading, insertParagraph, insertBrOnReturn, blockquote
- **Links:** createLink, editLink
- **Images:** editImage
- **Format Painter:** applyFormatPainter, copyFormatPainter, escapeFormatPainter
- **History:** undo, redo
- **Cleanup:** removeFormat
- **Import:** importWord
- **Misc:** emojiPicker, InlineCode, checklist, lineHeight

**Basic Text Formatting:**
```vue
<script setup>
const makeBold = () => {
  rteRef.value.ej2Instances.executeCommand('bold');
};

const makeItalic = () => {
  rteRef.value.ej2Instances.executeCommand('italic');
};

const applyHeading = (level) => {
  rteRef.value.ej2Instances.executeCommand('heading', `h${level}`);
};
</script>
```

**Inserting Content:**
```vue
<script setup>
const insertCustomHTML = () => {
  const html = '<div class="custom-block">Custom content</div>';
  rteRef.value.ej2Instances.executeCommand('insertHTML', html);
};

const insertPlainText = () => {
  rteRef.value.ej2Instances.executeCommand('insertText', 'Plain text content');
};

const insertHR = () => {
  rteRef.value.ej2Instances.executeCommand('insertHorizontalRule');
};
</script>
```

**Inserting Links:**
```vue
<script setup>
const insertLink = () => {
  const linkArgs = {
    url: 'https://example.com',
    text: 'Click here',
    title: 'Example Link',
    target: '_blank'
  };
  
  rteRef.value.ej2Instances.executeCommand('createLink', linkArgs);
};

const editExistingLink = () => {
  const linkArgs = {
    url: 'https://newurl.com',
    text: 'Updated text',
    target: '_self'
  };
  
  rteRef.value.ej2Instances.executeCommand('editLink', linkArgs);
};
</script>
```

**Inserting Images:**
```vue
<script setup>
const insertImageByUrl = () => {
  const imageArgs = {
    url: 'https://example.com/image.jpg',
    altText: 'Example Image',
    width: '300',
    height: '200'
  };
  
  rteRef.value.ej2Instances.executeCommand('insertImage', imageArgs);
};

const editImage = () => {
  const imageArgs = {
    altText: 'Updated alt text',
    width: '400',
    height: 'auto'
  };
  
  rteRef.value.ej2Instances.executeCommand('editImage', imageArgs);
};
</script>
```

**Inserting Tables:**
```vue
<script setup>
const insertTable = () => {
  const tableArgs = {
    rows: 3,
    columns: 4,
    width: '100%',
    tableHeader: true
  };
  
  rteRef.value.ej2Instances.executeCommand('insertTable', tableArgs);
};
</script>
```

**Format Painter:**
```vue
<script setup>
const copyFormat = () => {
  // Copy format from selected text
  rteRef.value.ej2Instances.executeCommand('copyFormatPainter');
  console.log('Format copied - click target to apply');
};

const applyFormat = () => {
  // Apply copied format to selection
  rteRef.value.ej2Instances.executeCommand('applyFormatPainter');
};

const cancelFormatPainter = () => {
  rteRef.value.ej2Instances.executeCommand('escapeFormatPainter');
};
</script>
```

**Import Word Document:**
```vue
<script setup>
const importWordDoc = () => {
  // Triggers Word import file picker
  rteRef.value.ej2Instances.executeCommand('importWord');
};
</script>
```

**With Undo Support:**
```vue
<script setup>
const insertWithUndo = () => {
  const html = '<p>New paragraph</p>';
  const options = { undo: true };
  
  rteRef.value.ej2Instances.executeCommand('insertHTML', html, options);
  console.log('Content inserted - undo available');
};
</script>
```

## Toolbar Management Methods

### disableToolbarItem
**Signature:** `disableToolbarItem(items: string | string[], muteToolbarUpdate?: boolean): void`  
**Parameters:**
- `items` - Single item or array of toolbar items to disable
- `muteToolbarUpdate` - Mute toolbar status updates (optional)

```vue
<script setup>
const disableFormatting = () => {
  rteRef.value.ej2Instances.disableToolbarItem(['Bold', 'Italic', 'Underline']);
  console.log('Formatting tools disabled');
};

const disableSingleItem = () => {
  rteRef.value.ej2Instances.disableToolbarItem('Image');
};
</script>
```

**Use Cases:**
- Conditional feature access based on user permissions
- Disable tools in read-only mode
- Progressive feature unlock

### enableToolbarItem
**Signature:** `enableToolbarItem(items: string | string[], muteToolbarUpdate?: boolean): void`  
**Parameters:**
- `items` - Single item or array of toolbar items to enable
- `muteToolbarUpdate` - Mute toolbar status updates (optional)

```vue
<script setup>
const enableFormatting = () => {
  rteRef.value.ej2Instances.enableToolbarItem(['Bold', 'Italic', 'Underline']);
  console.log('Formatting tools enabled');
};

// Conditional enabling based on user role
const updateToolbarByRole = (userRole) => {
  if (userRole === 'admin') {
    rteRef.value.ej2Instances.enableToolbarItem(['Image', 'Table', 'CreateLink']);
  } else {
    rteRef.value.ej2Instances.disableToolbarItem(['Image', 'Table']);
  }
};
</script>
```

### removeToolbarItem
**Signature:** `removeToolbarItem(items: string | string[]): void`  
**Parameters:**
- `items` - Single item or array of toolbar items to remove

```vue
<script setup>
const removeAdvancedTools = () => {
  rteRef.value.ej2Instances.removeToolbarItem(['SourceCode', 'FullScreen']);
  console.log('Advanced tools removed');
};

const removeAllMediaTools = () => {
  rteRef.value.ej2Instances.removeToolbarItem([
    'Image',
    'Audio',
    'Video',
    'CreateLink'
  ]);
};
</script>
```

**Note:** Unlike disable, remove permanently removes the toolbar item from the UI.

## Dialog Methods

### showDialog
**Signature:** `showDialog(type: DialogType): void`  
**Parameters:**
- `type` - Dialog type: `'InsertImage'`, `'InsertLink'`, `'InsertTable'`, `'InsertAudio'`, `'InsertVideo'`

```vue
<script setup>
const openImageDialog = () => {
  rteRef.value.ej2Instances.showDialog('InsertImage');
};

const openLinkDialog = () => {
  rteRef.value.ej2Instances.showDialog('InsertLink');
};

const openTableDialog = () => {
  rteRef.value.ej2Instances.showDialog('InsertTable');
};

// Custom button to trigger dialogs
const customInsertImage = () => {
  rteRef.value.ej2Instances.focusIn();
  rteRef.value.ej2Instances.showDialog('InsertImage');
};
</script>
```

### closeDialog
**Signature:** `closeDialog(type: DialogType): void`  
**Parameters:**
- `type` - Dialog type to close

```vue
<script setup>
const closeImageDialog = () => {
  rteRef.value.ej2Instances.closeDialog('InsertImage');
};

// Close dialog after custom validation
const validateAndClose = () => {
  if (isValid) {
    rteRef.value.ej2Instances.closeDialog('InsertLink');
  }
};
</script>
```

## Focus & State Methods

### focusIn
**Signature:** `focusIn(): void`  
**Description:** Focuses the Rich Text Editor component.

```vue
<script setup>
const focusEditor = () => {
  rteRef.value.ej2Instances.focusIn();
  console.log('Editor focused');
};

// Auto-focus after page load
onMounted(() => {
  setTimeout(() => {
    focusEditor();
  }, 500);
});
</script>
```

### focusOut
**Signature:** `focusOut(): void`  
**Description:** Blurs the Rich Text Editor component, removing focus.

```vue
<script setup>
const blurEditor = () => {
  rteRef.value.ej2Instances.focusOut();
  console.log('Editor blurred');
};

// Blur after save
const saveAndBlur = async () => {
  await saveContent();
  blurEditor();
};
</script>
```

### refreshUI
**Signature:** `refreshUI(): void`  
**Description:** Refreshes the view of the editor.

```vue
<script setup>
const refresh = () => {
  rteRef.value.ej2Instances.refreshUI();
  console.log('UI refreshed');
};

// Refresh after theme change
const changeTheme = (newTheme) => {
  applyTheme(newTheme);
  refresh();
};
</script>
```

### destroy
**Signature:** `destroy(): void`  
**Description:** Destroys the component, removing all event handlers and clearing content.

```vue
<script setup>
import { onBeforeUnmount } from 'vue';

const destroyEditor = () => {
  rteRef.value?.ej2Instances.destroy();
  console.log('Editor destroyed');
};

// Clean up before component unmount
onBeforeUnmount(() => {
  destroyEditor();
});
</script>
```

## AI Assistant Methods

### showAIAssistantPopup
**Signature:** `showAIAssistantPopup(): void`  
**Description:** Shows the AI Assistant Query Popup.

```vue
<script setup>
const openAIAssistant = () => {
  rteRef.value.ej2Instances.showAIAssistantPopup();
  console.log('AI Assistant opened');
};

// Custom toolbar button
const customAIButton = () => {
  rteRef.value.ej2Instances.focusIn();
  rteRef.value.ej2Instances.showAIAssistantPopup();
};
</script>
```

### hideAIAssistantPopup
**Signature:** `hideAIAssistantPopup(): void`  
**Description:** Hides the AI Assistant Query Popup.

```vue
<script setup>
const closeAIAssistant = () => {
  rteRef.value.ej2Instances.hideAIAssistantPopup();
  console.log('AI Assistant closed');
};

// Close after AI response complete
const onAIComplete = () => {
  setTimeout(() => {
    closeAIAssistant();
  }, 2000);
};
</script>
```

### executeAIPrompt
**Signature:** `executeAIPrompt(prompt: string): void`  
**Parameters:**
- `prompt` - The prompt text to execute

```vue
<script setup>
const runAIPrompt = (promptText) => {
  if (!promptText.trim()) {
    alert('Please enter a prompt');
    return;
  }
  
  rteRef.value.ej2Instances.executeAIPrompt(promptText);
  console.log('AI prompt executed:', promptText);
};

// Predefined prompts
const summarizeContent = () => {
  runAIPrompt('Summarize the content in 3 bullet points');
};

const improveWriting = () => {
  runAIPrompt('Improve the writing style and grammar');
};
</script>
```

### addAIPromptResponse
**Signature:** `addAIPromptResponse(outputResponse: string | Object, isFinalUpdate?: boolean): void`  
**Parameters:**
- `outputResponse` - Response text (Markdown format) or object with prompt/response
- `isFinalUpdate` - Whether this is the final response (hides stop button)

```vue
<script setup>
const addAIResponse = (responseText, isFinal = false) => {
  rteRef.value.ej2Instances.addAIPromptResponse(responseText, isFinal);
};

// Streaming AI response
const streamAIResponse = async (prompt) => {
  const stream = await callAIServiceStream(prompt);
  
  for await (const chunk of stream) {
    const isFinal = chunk.isFinalChunk;
    addAIResponse(chunk.text, isFinal);
  }
};

// Add complete response
const addCompleteResponse = (response) => {
  rteRef.value.ej2Instances.addAIPromptResponse(response, true);
};
</script>
```

### getAIPromptHistory
**Signature:** `getAIPromptHistory(): PromptModel[]`  
**Returns:** Array of prompt/response data

```vue
<script setup>
const getHistory = () => {
  const history = rteRef.value.ej2Instances.getAIPromptHistory();
  console.log('AI conversation history:', history);
  return history;
};

// Export AI conversation
const exportAIHistory = () => {
  const history = getHistory();
  const json = JSON.stringify(history, null, 2);
  downloadFile('ai-history.json', json);
};
</script>
```

### clearAIPromptHistory
**Signature:** `clearAIPromptHistory(): void`  
**Description:** Clears all prompt and response data from the AI Assistant's history.

```vue
<script setup>
const clearAIHistory = () => {
  if (confirm('Clear all AI conversation history?')) {
    rteRef.value.ej2Instances.clearAIPromptHistory();
    console.log('AI history cleared');
  }
};

// Clear on logout
const onLogout = () => {
  clearAIHistory();
  // ... other logout logic
};
</script>
```

## Utility Methods

### sanitizeHtml
**Signature:** `sanitizeHtml(value: string): string`  
**Parameters:**
- `value` - HTML content to sanitize  
**Returns:** Sanitized HTML string

```vue
<script setup>
const sanitizeUserInput = (htmlContent) => {
  const sanitized = rteRef.value.ej2Instances.sanitizeHtml(htmlContent);
  console.log('Original:', htmlContent);
  console.log('Sanitized:', sanitized);
  return sanitized;
};

// Sanitize before inserting external content
const insertExternalContent = (externalHtml) => {
  const safe = sanitizeUserInput(externalHtml);
  rteRef.value.ej2Instances.executeCommand('insertHTML', safe);
};
</script>
```

**Note:** Only works in HTML mode (not Markdown).

### print
**Signature:** `print(): void`  
**Description:** Prints all the pages of the RichTextEditor.

```vue
<script setup>
const printContent = () => {
  rteRef.value.ej2Instances.print();
  console.log('Print dialog opened');
};

// Custom print button
const customPrint = () => {
  // Optional: Add print styles before printing
  addPrintStyles();
  printContent();
};
</script>
```

### showFullScreen
**Signature:** `showFullScreen(): void`  
**Description:** Displays the Rich Text Editor in full-screen mode.

```vue
<script setup>
const enterFullScreen = () => {
  rteRef.value.ej2Instances.showFullScreen();
  console.log('Entered full-screen mode');
};

// Toggle full-screen
const toggleFullScreen = () => {
  if (isFullScreen.value) {
    // Use Escape key or toolbar button to exit
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
  } else {
    enterFullScreen();
  }
  isFullScreen.value = !isFullScreen.value;
};
</script>
```

### showSourceCode
**Signature:** `showSourceCode(): void`  
**Description:** Toggles the display of the HTML/Markdown source code.

```vue
<script setup>
const toggleSource = () => {
  rteRef.value.ej2Instances.showSourceCode();
  console.log('Source view toggled');
};

// Show source for debugging
const debugContent = () => {
  toggleSource();
  const html = rteRef.value.ej2Instances.getHtml();
  console.log('Current HTML:', html);
};
</script>
```

### showEmojiPicker
**Signature:** `showEmojiPicker(x?: number, y?: number): void`  
**Parameters:**
- `x` - X-axis position (optional)
- `y` - Y-axis position (optional)

```vue
<script setup>
const openEmojiPicker = () => {
  // Open at cursor position
  rteRef.value.ej2Instances.showEmojiPicker();
};

const openEmojiAtPosition = (event) => {
  // Open at specific coordinates
  rteRef.value.ej2Instances.showEmojiPicker(event.clientX, event.clientY);
};
</script>
```

### showInlineToolbar
**Signature:** `showInlineToolbar(): void`  
**Description:** Displays the inline quick toolbar.

```vue
<script setup>
const showQuickToolbar = () => {
  rteRef.value.ej2Instances.showInlineToolbar();
};
</script>
```

### hideInlineToolbar
**Signature:** `hideInlineToolbar(): void`  
**Description:** Hides the inline quick toolbar.

```vue
<script setup>
const hideQuickToolbar = () => {
  rteRef.value.ej2Instances.hideInlineToolbar();
};
</script>
```

### clearUndoRedo
**Signature:** `clearUndoRedo(): void`  
**Description:** Clears the undo and redo stacks and resets toolbar status.

```vue
<script setup>
const resetHistory = () => {
  if (confirm('Clear all undo/redo history?')) {
    rteRef.value.ej2Instances.clearUndoRedo();
    console.log('Undo/redo history cleared');
  }
};

// Clear history after content reset
const resetContent = () => {
  rteRef.value.ej2Instances.value = '';
  resetHistory();
};
</script>
```

## Method Chaining & Complex Workflows

### Auto-save with Selection Preservation
```vue
<script setup>
const autoSave = async () => {
  // Save current selection
  const range = rteRef.value.ej2Instances.getRange();
  
  // Get and save content
  const content = rteRef.value.ej2Instances.getHtml();
  await saveToServer(content);
  
  // Restore selection
  rteRef.value.ej2Instances.selectRange(range);
  
  console.log('Auto-saved with selection preserved');
};
</script>
```

### Custom Format Workflow
```vue
<script setup>
const applyCustomFormat = () => {
  // Get selection
  const selectedHtml = rteRef.value.ej2Instances.getSelectedHtml();
  
  if (!selectedHtml) {
    alert('Please select text first');
    return;
  }
  
  // Apply multiple formats
  rteRef.value.ej2Instances.executeCommand('bold');
  rteRef.value.ej2Instances.executeCommand('fontColor', 'red');
  rteRef.value.ej2Instances.executeCommand('fontSize', '18pt');
  
  console.log('Custom format applied');
};
</script>
```

### Content Validation Before Submit
```vue
<script setup>
const validateAndSubmit = async () => {
  // Get content
  const html = rteRef.value.ej2Instances.getHtml();
  const text = rteRef.value.ej2Instances.getText();
  const charCount = rteRef.value.ej2Instances.getCharCount();
  
  // Validate
  if (charCount < 50) {
    alert('Content must be at least 50 characters');
    rteRef.value.ej2Instances.focusIn();
    return;
  }
  
  // Sanitize
  const sanitized = rteRef.value.ej2Instances.sanitizeHtml(html);
  
  // Submit
  await submitToServer(sanitized);
  console.log('Content submitted successfully');
};
</script>
```

### Dynamic Toolbar Management
```vue
<script setup>
const updateToolbarByMode = (mode) => {
  if (mode === 'basic') {
    // Basic mode: only essential tools
    rteRef.value.ej2Instances.removeToolbarItem([
      'CreateTable',
      'Audio',
      'Video',
      'SourceCode',
      'FullScreen'
    ]);
  } else if (mode === 'advanced') {
    // Advanced mode: all tools enabled
    rteRef.value.ej2Instances.enableToolbarItem([
      'Bold', 'Italic', 'Underline',
      'CreateLink', 'Image', 'CreateTable'
    ]);
  } else if (mode === 'readonly') {
    // Read-only: disable all editing tools
    rteRef.value.ej2Instances.disableToolbarItem([
      'Bold', 'Italic', 'Underline', 'CreateLink', 'Image'
    ]);
  }
  
  rteRef.value.ej2Instances.refreshUI();
};
</script>
```

### AI-Assisted Content Generation
```vue
<script setup>
const generateContent = async (topic) => {
  // Focus editor
  rteRef.value.ej2Instances.focusIn();
  
  // Open AI assistant
  rteRef.value.ej2Instances.showAIAssistantPopup();
  
  // Execute prompt
  const prompt = `Generate a professional article about ${topic} in 3 paragraphs`;
  rteRef.value.ej2Instances.executeAIPrompt(prompt);
  
  // Handle response in aiAssistantPromptRequest event
};

const onAIPromptRequest = async (args) => {
  const response = await callAIService(args.prompt);
  rteRef.value.ej2Instances.addAIPromptResponse(response, true);
};
</script>
```

## Best Practices

### Always Check Instance Availability
```vue
<script setup>
const safeMethodCall = () => {
  if (!rteRef.value?.ej2Instances) {
    console.warn('Editor not ready');
    return;
  }
  
  rteRef.value.ej2Instances.methodName();
};
</script>
```

### Use Lifecycle Hooks Appropriately
```vue
<script setup>
import { onMounted, onBeforeUnmount } from 'vue';

onMounted(() => {
  // Safe to call methods after mount
  rteRef.value.ej2Instances.focusIn();
});

onBeforeUnmount(() => {
  // Clean up before unmount
  rteRef.value?.ej2Instances.destroy();
});
</script>
```

### Combine with Events for Complete Control
```vue
<template>
  <ejs-richtexteditor 
    ref="rteRef"
    @created="onCreated"
    @actionComplete="onActionComplete"
  />
</template>

<script setup>
const onCreated = () => {
  // Initialize after creation
  rteRef.value.ej2Instances.focusIn();
};

const onActionComplete = (args) => {
  // Auto-save after actions
  if (args.requestType === 'Image') {
    autoSave();
  }
};
</script>
```
