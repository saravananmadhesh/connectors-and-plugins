# Selection and Cursor Methods

## Table of Contents
- [Overview](#overview)
- [setSelection Method](#setselection-method)
- [setCursorPosition Method](#setcursorposition-method)
- [getSelectedBlocks Method](#getselectedblocks-method)
- [getRange Method](#getrange-method)
- [selectRange Method](#selectrange-method)
- [selectBlock Method](#selectblock-method)
- [selectAllBlocks Method](#selectallblocks-method)
- [Practical Examples](#practical-examples)

## Overview

Selection and cursor methods allow you to programmatically control text selection and cursor positioning within blocks. Use these methods to:

- Set text selection within content elements
- Position the cursor at specific locations
- Retrieve currently selected blocks
- Manage selection ranges
- Select entire blocks or all content

These methods are essential for building custom editing interfaces and implementing advanced text manipulation features.

## setSelection Method

Sets the selection range within a content node using start and end indices.

**Syntax:**
```typescript
setSelection(node: Node, startIndex: number, endIndex: number): void
```

**Parameters:**
- `node`: DOM Node object to apply selection (must be a text node or element containing text)
- `startIndex`: Starting character index (0-based)
- `endIndex`: Ending character index

**Returns:** void

**Important:** The first parameter must be a DOM `Node` object, not a string ID. Use `document.querySelector()` or similar DOM methods to get the node reference.

**Examples:**

```typescript
// Get node reference first, then set selection
const contentNode = document.querySelector('#paragraph1-content') as Node;
if (contentNode) {
  this.blockEditor.setSelection(contentNode, 5, 15);
}

// Select text in a specific block's content node
public selectTextInBlock(blockId: string, start: number, end: number): void {
  // Get the block element
  const blockElement = document.querySelector(`[data-block-id="${blockId}"]`);
  
  if (blockElement) {
    // Get the text node (first child or specific content node)
    const textNode = blockElement.querySelector('.block-content')?.firstChild as Node;
    
    if (textNode) {
      this.blockEditor.setSelection(textNode, start, end);
    }
  }
}

// Select word at specific position
public selectWord(textNode: Node, wordStart: number, wordEnd: number): void {
  this.blockEditor.setSelection(textNode, wordStart, wordEnd);
}

// Select entire content in a node
public selectAllInNode(node: Node, textLength: number): void {
  this.blockEditor.setSelection(node, 0, textLength);
}
```

**Use Cases:**
- Highlighting specific text for formatting
- Pre-selecting text before applying styles
- Building custom editing interfaces
- Implementing find and replace functionality
- Creating custom selection tools

**Common Pattern - Get Node from Block:**

```typescript
public selectTextInCurrentBlock(start: number, end: number): void {
  // Get the currently focused or selected block
  const selectedBlocks = this.blockEditor.getSelectedBlocks();
  
  if (selectedBlocks && selectedBlocks.length > 0) {
    const blockId = selectedBlocks[0].id;
    
    // Get the DOM element for this block
    const blockElement = document.querySelector(`[id="${blockId}"]`);
    
    if (blockElement) {
      // Get the text content node
      const contentNode = blockElement.querySelector('.content')?.firstChild as Node;
      
      if (contentNode && contentNode.nodeType === Node.TEXT_NODE) {
        this.blockEditor.setSelection(contentNode, start, end);
      }
    }
  }
}
```
- Implementing find-and-replace functionality

## setCursorPosition Method

Places the cursor at a specific position within a block.

**Syntax:**
```typescript
setCursorPosition(blockId: string, position: number): void
```

**Parameters:**
- `blockId`: ID of the block containing the cursor
- `position`: Character position for cursor placement

**Returns:** void

**Examples:**

```typescript
// Place cursor at position 10 in a block
this.blockEditor.setCursorPosition('heading-block', 10);

// Place cursor at the beginning of a block
this.blockEditor.setCursorPosition('paragraph-1', 0);

// Place cursor at the end (assuming 50-character text)
this.blockEditor.setCursorPosition('block-id', 50);

// Place cursor after a specific word
this.blockEditor.setCursorPosition('text-block', 25);
```

**Use Cases:**
- Setting cursor after inserting content
- Positioning cursor for continued editing
- Implementing auto-complete functionality
- Building structured data entry forms

## getSelectedBlocks Method

Retrieves the currently selected blocks in the editor.

**Syntax:**
```typescript
getSelectedBlocks(): BlockModel[] | null
```

**Parameters:** None

**Returns:** Array of selected BlockModels, or `null` if no blocks are selected

**Examples:**

```typescript
// Get currently selected blocks
const selectedBlocks = this.blockEditor.getSelectedBlocks();

if (selectedBlocks && selectedBlocks.length > 0) {
  console.log(`${selectedBlocks.length} blocks selected`);
  
  selectedBlocks.forEach(block => {
    console.log(`Block type: ${block.blockType}`);
  });
} else {
  console.log('No blocks selected');
}

// Check if specific block type is selected
const selected = this.blockEditor.getSelectedBlocks();
if (selected) {
  const hasParagraphs = selected.some(b => b.blockType === 'Paragraph');
  console.log('Has paragraphs:', hasParagraphs);
}

// Get count of selected blocks
const count = this.blockEditor.getSelectedBlocks()?.length || 0;
console.log(`${count} blocks selected`);
```

**Use Cases:**
- Implementing custom toolbar actions based on selection
- Checking what's selected for formatting
- Building multi-block operations
- Validating selection before operations

## getRange Method

Gets the current selection range (start and end positions of selected text).

**Syntax:**
```typescript
getRange(): Range | null
```

**Parameters:** None

**Returns:** Native DOM Range object representing current selection, or `null` if no selection

**Examples:**

```typescript
// Get current selection range
const range = this.blockEditor.getRange();

if (range) {
  console.log('Selection start offset:', range.startOffset);
  console.log('Selection end offset:', range.endOffset);
  console.log('Selection collapsed:', range.collapsed);  // true if no selection
  
  // Get selected text
  const selectedText = range.toString();
  console.log('Selected text:', selectedText);
} else {
  console.log('No selection found');
}

// Check if anything is selected
const range = this.blockEditor.getRange();
if (range && !range.collapsed) {
  console.log('Text is selected');
} else {
  console.log('No text selected or cursor only');
}

// Get container element of selection
const range = this.blockEditor.getRange();
if (range) {
  const container = range.commonAncestorContainer;
  console.log('Selection container:', container.nodeName);
}
```

**Use Cases:**
- Detecting if user has selected text
- Formatting selected text
- Getting selected text content
- Implementing custom selection-based features

## selectRange Method

Programmatically sets the selection range using a Range object.

**Syntax:**
```typescript
selectRange(range: Range): void
```

**Parameters:**
- `range`: DOM Range object defining the selection

**Returns:** void

**Examples:**

```typescript
// Create and select a custom range
const contentElement = document.querySelector('.e-block-content');
if (contentElement && contentElement.firstChild) {
  const range = document.createRange();
  range.setStart(contentElement.firstChild, 5);   // Start at position 5
  range.setEnd(contentElement.firstChild, 15);    // End at position 15
  this.blockEditor.selectRange(range);
}

// Select entire paragraph content
const paragraph = document.getElementById('paragraph-1');
if (paragraph) {
  const range = document.createRange();
  range.selectNodeContents(paragraph);
  this.blockEditor.selectRange(range);
}

// Select from start to a specific position
const element = document.querySelector('.e-block-content');
if (element && element.firstChild) {
  const range = document.createRange();
  range.setStart(element.firstChild, 0);
  range.setEnd(element.firstChild, 25);
  this.blockEditor.selectRange(range);
}
```

**Use Cases:**
- Programmatically selecting text for formatting
- Highlighting text based on conditions
- Implementing search and highlight features
- Building custom editing workflows

## selectBlock Method

Selects an entire block.

**Syntax:**
```typescript
selectBlock(blockId: string): void
```

**Parameters:**
- `blockId`: ID of the block to select

**Returns:** void

**Examples:**

```typescript
// Select a single block
this.blockEditor.selectBlock('heading-block');

// Select multiple blocks one at a time (note: each call replaces previous selection)
this.blockEditor.selectBlock('block-1');

// Select a specific paragraph
this.blockEditor.selectBlock('paragraph-2');

// Select block by reference
const blockId = 'my-block';
this.blockEditor.selectBlock(blockId);
```

**Use Cases:**
- Selecting entire blocks for deletion
- Highlighting important sections
- Preparing blocks for copy/move operations
- Implementing block-level formatting

## selectAllBlocks Method

Selects all blocks in the editor.

**Syntax:**
```typescript
selectAllBlocks(): void
```

**Parameters:** None

**Returns:** void

**Examples:**

```typescript
// Select all content in the editor
this.blockEditor.selectAllBlocks();

// Select all, then perform action
this.blockEditor.selectAllBlocks();
console.log('All blocks selected');

// Select all for copy operation
this.blockEditor.selectAllBlocks();
// User can now press Ctrl+C to copy
```

**Use Cases:**
- Selecting all content for copying
- Batch operations on entire document
- Exporting full document content
- Clearing or replacing all content

## Practical Examples

### Example 1: Format Selected Text

```typescript
public formatSelectedText(): void {
  // Get selection range
  const range = this.blockEditor.getRange();

  if (range && !range.collapsed) {
    // Text is selected
    const selectedText = range.toString();
    console.log('Selected text:', selectedText);
    
    // Apply formatting (bold in this example)
    this.blockEditor.executeToolbarAction(CommandName.Bold);
  } else {
    alert('Please select text first');
  }
}
```

### Example 2: Highlight Specific Text

```typescript
public highlightWord(word: string): void {
  const contentElement = document.querySelector('.e-block-content');
  
  if (contentElement && contentElement.textContent) {
    const text = contentElement.textContent;
    const startPos = text.indexOf(word);
    
    if (startPos !== -1) {
      const endPos = startPos + word.length;
      // Assuming this is a content element ID
      this.blockEditor.setSelection('content-id', startPos, endPos);
    }
  }
}
```

### Example 3: Position Cursor After Insertion

```typescript
public insertAndPositionCursor(blockId: string, textToInsert: string): void {
  // Get the block
  const block = this.blockEditor.getBlock(blockId);
  
  if (block && block.content) {
    const currentText = block.content[0].content || '';
    const newText = currentText + textToInsert;
    
    // Update block with new text
    this.blockEditor.updateBlock(blockId, {
      content: [{ contentType: ContentType.Text, content: newText }]
    });
    
    // Position cursor at end of inserted text
    this.blockEditor.setCursorPosition(blockId, newText.length);
  }
}
```

### Example 4: Multi-Block Selection Handler

```typescript
public handleMultiBlockOperation(): void {
  // Get selected blocks
  const selectedBlocks = this.blockEditor.getSelectedBlocks();
  
  if (selectedBlocks && selectedBlocks.length > 1) {
    // Multiple blocks selected - perform bulk operation
    console.log(`Operating on ${selectedBlocks.length} blocks`);
    
    selectedBlocks.forEach(block => {
      // Apply operation to each block
      if (block.id) {
        this.blockEditor.updateBlock(block.id, {
          cssClass: 'highlighted'
        });
      }
    });
  } else if (selectedBlocks && selectedBlocks.length === 1) {
    console.log('Single block selected');
  } else {
    console.log('No blocks selected');
  }
}
```

### Example 5: Select and Delete

```typescript
public selectAndDelete(blockId: string): void {
  // Select the block
  this.blockEditor.selectBlock(blockId);
  
  // Remove the block
  this.blockEditor.removeBlock(blockId);
  
  console.log('Block deleted');
}
```

---

## executeToolbarAction Method

Executes a toolbar command programmatically.

**Syntax:**
```typescript
executeToolbarAction(action: CommandName, value?: string): void
```

**Parameters:**
- `action`: `CommandName` — The command to execute (e.g., Bold, Italic, InsertLink)
- `value` (optional): `string` — Value required by some commands (for example, URL for InsertLink)

**Returns:** `void`

**Description:** Triggers the specified toolbar action as if the user activated the toolbar control. Use this to apply formatting or perform editor commands from custom UI.

**Examples:**

```typescript
// Execute Bold command
this.blockEditor.executeToolbarAction(CommandName.Bold);

// Execute Insert Link with a URL value
this.blockEditor.executeToolbarAction(CommandName.InsertLink, 'https://example.com');

// Execute Undo
this.blockEditor.executeToolbarAction(CommandName.Undo);
```

**Use Cases:**
- Invoke formatting from custom buttons
- Integrate editor actions into app-level UI
- Trigger commands in automated workflows

---

## focusIn Method

Programmatically focuses the editor.

**Syntax:**
```typescript
focusIn(): void
```

**Parameters:** None

**Returns:** void

**Purpose:**
- Focus the editor programmatically
- Activate the editor after external interactions
- Set focus after dynamic content loading
- Enable keyboard input

**Examples:**

```typescript
// Focus editor on button click
public focusEditor(): void {
  this.blockEditor.focusIn();
  console.log('Editor focused');
}

// Focus after loading content
public loadAndFocus(content: BlockModel[]): void {
  // Load content
  this.blockEditor.renderBlocksFromJson(content);
  
  // Focus editor for immediate editing
  setTimeout(() => {
    this.blockEditor.focusIn();
  }, 100);
}

// Focus on specific user action
public handleExternalAction(): void {
  // Perform action
  this.processData();
  
  // Return focus to editor
  this.blockEditor.focusIn();
}
```

**Use Cases:**
- Focus editor after modal close
- Focus after toolbar button click
- Focus after content load
- Focus after external form submission
- Auto-focus on page load

**Common Pattern:**

```typescript
@Component({
  selector: 'app-editor',
  template: `
    <button (click)="focusEditor()">Focus Editor</button>
    <ejs-blockeditor #blockEditor [blocks]="blocksData"></ejs-blockeditor>
  `
})
export class EditorComponent implements AfterViewInit {
  @ViewChild('blockEditor')
  public blockEditor!: BlockEditorComponent;
  
  ngAfterViewInit(): void {
    // Auto-focus on component load
    setTimeout(() => {
      this.blockEditor.focusIn();
    }, 0);
  }
  
  public focusEditor(): void {
    this.blockEditor.focusIn();
  }
}
```

---

## focusOut Method

Programmatically removes focus from the editor.

**Syntax:**
```typescript
focusOut(): void
```

**Parameters:** None

**Returns:** void

**Purpose:**
- Remove focus from editor programmatically
- Trigger blur events
- Deactivate editor before other actions
- Implement custom focus management

**Examples:**

```typescript
// Remove focus on button click
public blurEditor(): void {
  this.blockEditor.focusOut();
  console.log('Editor blurred');
}

// Blur before validation
public validateContent(): void {
  // Remove focus to trigger blur event
  this.blockEditor.focusOut();
  
  // Validate content
  const content = this.blockEditor.getDataAsJson();
  this.performValidation(content);
}

// Blur on specific condition
public handleConditionalBlur(): void {
  if (this.shouldBlur()) {
    this.blockEditor.focusOut();
    this.hideToolbars();
  }
}

// Auto-blur on timeout
public setupAutoBlur(): void {
  setTimeout(() => {
    this.blockEditor.focusOut();
    console.log('Editor auto-blurred after timeout');
  }, 30000); // 30 seconds
}
```

**Use Cases:**
- Blur editor before dialog open
- Blur before saving content
- Blur on inactivity timeout
- Blur before navigation
- Implement tabbing to next field

**Focus Management Pattern:**

```typescript
public focusManagementExample(): void {
  // Focus editor
  this.blockEditor.focusIn();
  
  // Perform editing
  // ...
  
  // Blur after editing
  setTimeout(() => {
    this.blockEditor.focusOut();
    this.autoSave();
  }, 1000);
}
```

**Integration with Focus Events:**

```typescript
@Component({
  selector: 'app-editor',
  template: `
    <ejs-blockeditor 
      #blockEditor
      [blocks]="blocksData"
      (focus)="onFocus($event)"
      (blur)="onBlur($event)">
    </ejs-blockeditor>
  `
})
export class EditorComponent {
  @ViewChild('blockEditor')
  public blockEditor!: BlockEditorComponent;
  
  // Programmatic focus
  public setFocus(shouldFocus: boolean): void {
    if (shouldFocus) {
      this.blockEditor.focusIn();
    } else {
      this.blockEditor.focusOut();
    }
  }
  
  // Event handlers
  public onFocus(args: FocusEventArgs): void {
    console.log('Editor gained focus:', args.blockId);
    this.showEditingUI();
  }
  
  public onBlur(args: BlurEventArgs): void {
    console.log('Editor lost focus:', args.blockId);
    this.hideEditingUI();
    this.autoSave();
  }
}
```

---

## Focus Management Best Practices

### 1. Timing Considerations

```typescript
// ✅ GOOD: Use setTimeout for initial focus
ngAfterViewInit(): void {
  setTimeout(() => {
    this.blockEditor.focusIn();
  }, 0);
}

// ❌ BAD: Immediate focus might not work
ngAfterViewInit(): void {
  this.blockEditor.focusIn(); // May fail if editor not fully rendered
}
```

### 2. Combine with Cursor Positioning

```typescript
public focusAndPositionCursor(blockId: string, position: number): void {
  // Focus first
  this.blockEditor.focusIn();
  
  // Then set cursor position
  setTimeout(() => {
    this.blockEditor.setCursorPosition(blockId, position);
  }, 50);
}
```

### 3. Handle Focus After Actions

```typescript
public performActionAndRefocus(): void {
  // Remove focus for action
  this.blockEditor.focusOut();
  
  // Perform action
  this.processAction();
  
  // Restore focus
  setTimeout(() => {
    this.blockEditor.focusIn();
  }, 100);
}
```

### 4. Implement Focus Guards

```typescript
private isEditorFocused = false;

public onFocus(args: FocusEventArgs): void {
  this.isEditorFocused = true;
}

public onBlur(args: BlurEventArgs): void {
  this.isEditorFocused = false;
}

public safeFocus(): void {
  if (!this.isEditorFocused) {
    this.blockEditor.focusIn();
  }
}
```

### 5. Accessibility Considerations

```typescript
// Manage focus for keyboard navigation
public handleKeyboardNavigation(direction: 'next' | 'previous'): void {
  if (direction === 'next') {
    this.blockEditor.focusOut();
    this.focusNextElement();
  } else {
    this.blockEditor.focusOut();
    this.focusPreviousElement();
  }
}

// Trap focus for modal dialogs
public openModalDialog(): void {
  // Blur editor
  this.blockEditor.focusOut();
  
  // Open modal with focus trap
  this.modalService.open({
    onClose: () => {
      // Return focus to editor
      this.blockEditor.focusIn();
    }
  });
}
```

