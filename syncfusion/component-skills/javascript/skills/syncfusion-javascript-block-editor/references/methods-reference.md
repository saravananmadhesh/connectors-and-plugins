# Methods Reference

Complete reference for all public methods available in the Syncfusion JavaScript BlockEditor control.

## Table of Contents

- [Overview](#overview)
- [Block Management Methods](#block-management-methods)
  - [addBlock](#addblock)
  - [removeBlock](#removeblock)
  - [moveBlock](#moveblock)
  - [updateBlock](#updateblock)
  - [getBlock](#getblock)
  - [getBlockCount](#getblockcount)
- [Selection and Cursor Methods](#selection-and-cursor-methods)
  - [setSelection](#setselection)
  - [setCursorPosition](#setcursorposition)
  - [getSelectedBlocks](#getselectedblocks)
  - [getRange](#getrange)
  - [selectRange](#selectrange)
  - [selectBlock](#selectblock)
  - [selectAllBlocks](#selectallblocks)
- [Focus Management Methods](#focus-management-methods)
  - [focusIn](#focusin)
  - [focusOut](#focusout)
- [Formatting Methods](#formatting-methods)
  - [executeToolbarAction](#executetoolbaraction)
  - [enableToolbarItems](#enabletoolbaritems)
  - [disableToolbarItems](#disabletoolbaritems)
- [Data Export Methods](#data-export-methods)
  - [getDataAsJson](#getdataasjson)
  - [getDataAsHtml](#getdataashtml)
  - [renderBlocksFromJson](#renderblocksfromjson)
  - [parseHtmlToBlocks](#parsehtmltoblocks)
  - [print](#print)
- [Component Lifecycle Methods](#component-lifecycle-methods)
- [Code Examples](#code-examples)

## Overview

The Block Editor control provides a comprehensive set of public methods to programmatically interact with and manipulate the editor content. These methods enable adding, removing, updating, and managing blocks, as well as controlling selection, formatting, and other editor operations.

## Block Management Methods

### addBlock

Adds a new block to the editor at a specified position.

**Signature:**
```typescript
addBlock(block: BlockModel, targetId?: string, isAfter?: boolean): void
```

**Parameters:**
- `block` (BlockModel) - The block model to add
- `targetId` (string, optional) - The ID of the target block for positioning
- `isAfter` (boolean, optional) - Whether to insert after (true) or before (false) the target block

**Description:**
This method can insert the block before or after a target block. If no target is specified, the block is added at the end.

**Example:**
```typescript
const newBlock: BlockModel = {
    id: 'new-block',
    blockType: 'Paragraph',
    content: [
        {
            contentType: ContentType.Text,
            content: 'This is a newly added block'
        }
    ]
};

// Add after a specific block
editor.addBlock(newBlock, 'target-block-id', true);

// Add at the end
editor.addBlock(newBlock);
```

### removeBlock

Removes a block from the editor.

**Signature:**
```typescript
removeBlock(blockId: string): void
```

**Parameters:**
- `blockId` (string) - The ID of the block to remove

**Description:**
Removes the specified block from the editor completely, including all its content.

**Example:**
```typescript
// Remove a block by its ID
editor.removeBlock('block-to-remove-id');
```

### moveBlock

Moves a block from one position to another within the editor.

**Signature:**
```typescript
moveBlock(fromBlockId: string, toBlockId: string): void
```

**Parameters:**
- `fromBlockId` (string) - The ID of the block to move
- `toBlockId` (string) - The ID of the target position block

**Description:**
Moves a block to a new position, placing it after the target block.

**Example:**
```typescript
// Move a block to a new position
editor.moveBlock('source-block-id', 'target-block-id');
```

### updateBlock

Updates the properties of an existing block.

**Signature:**
```typescript
updateBlock(blockId: string, properties: Partial<BlockModel>): boolean
```

**Parameters:**
- `blockId` (string) - The ID of the block to update
- `properties` (Partial<BlockModel>) - The properties to update

**Returns:**
- `boolean` - Returns true if the update was successful, false otherwise

**Description:**
Only the specified properties are modified, while others remain unchanged.

**Example:**
```typescript
// Update block properties
const success = editor.updateBlock('block-id', {
    indent: 1,
    content: [
        {
            contentType: ContentType.Text,
            content: 'Updated content'
        }
    ]
});

console.log('Update successful:', success);
```

### getBlock

Retrieves a block model by its unique identifier.

**Signature:**
```typescript
getBlock(blockId: string): BlockModel | null
```

**Parameters:**
- `blockId` (string) - The ID of the block to retrieve

**Returns:**
- `BlockModel | null` - The block model if found, null otherwise

**Description:**
Returns null if the block is not found.

**Example:**
```typescript
// Get a specific block
const block = editor.getBlock('block-id');
if (block) {
    console.log('Block type:', block.blockType);
    console.log('Content:', block.content);
}
```

### getBlockCount

Retrieves the total number of blocks in the editor.

**Signature:**
```typescript
getBlockCount(): number
```

**Returns:**
- `number` - The total number of blocks

**Description:**
Returns the count of all top-level blocks in the editor.

**Example:**
```typescript
// Get total block count
const count = editor.getBlockCount();
console.log('Total blocks:', count);
```

## Selection and Cursor Methods

### setSelection

Sets the text selection within a specific content element using start and end positions.

**Signature:**
```typescript
setSelection(node: Node, startIndex: number, endIndex: number): void
```

**Parameters:**
- `node` (Node) - The content element node
- `startIndex` (number) - The starting position of the selection
- `endIndex` (number) - The ending position of the selection

**Description:**
Selects content within the specified element using start and end indices.

**Example:**
```typescript
// Select text from position 5 to 15 in a content element
editor.setSelection('content-element-id', 5, 15);
```

### setCursorPosition

Places the cursor at a specific position within a block.

**Signature:**
```typescript
setCursorPosition(blockId: string, position: number): void
```

**Parameters:**
- `blockId` (string) - The ID of the block
- `position` (number) - The cursor position

**Description:**
Sets the cursor at the specified position in the block's content.

**Example:**
```typescript
// Set cursor at position 10 in a block
editor.setCursorPosition('block-id', 10);
```

### getSelectedBlocks

Retrieves the currently selected blocks in the editor.

**Signature:**
```typescript
getSelectedBlocks(): BlockModel[] | null
```

**Returns:**
- `BlockModel[] | null` - Array of selected blocks, or null if no blocks are selected

**Description:**
Returns null if no blocks are selected.

**Example:**
```typescript
// Get all selected blocks
const selectedBlocks = editor.getSelectedBlocks();
if (selectedBlocks && selectedBlocks.length > 0) {
    selectedBlocks.forEach(block => {
        console.log('Selected block:', block.id);
    });
}
```

### getRange

Gets the current selection range in the editor.

**Signature:**
```typescript
getRange(): Range | null
```

**Returns:**
- `Range | null` - A Range object representing the selected text, or null if no selection is active

**Description:**
Returns a Range object that defines the start and end positions of the selection.

**Example:**
```typescript
// Get current selection range
const range = editor.getRange();
if (range) {
    console.log('Selection start:', range.startOffset);
    console.log('Selection end:', range.endOffset);
}
```

### selectRange

Sets the selection range in the editor.

**Signature:**
```typescript
selectRange(range: Range): void
```

**Parameters:**
- `range` (Range) - The Range object defining the selection

**Description:**
Accepts a Range object that defines the start and end positions of the selection.

**Example:**
```typescript
// Create and select a custom range
const range = document.createRange();
const textNode = document.getElementById('block-id').firstChild;
range.setStart(textNode, 0);
range.setEnd(textNode, 10);
editor.selectRange(range);
```

### selectBlock

Selects a specific block in the editor.

**Signature:**
```typescript
selectBlock(blockId: string): void
```

**Parameters:**
- `blockId` (string) - The ID of the block to select

**Description:**
Selects the entire block, including all its content.

**Example:**
```typescript
// Select a complete block
editor.selectBlock('block-id');
```

### selectAllBlocks

Selects all blocks in the editor.

**Signature:**
```typescript
selectAllBlocks(): void
```

**Description:**
Selects all content in the editor, equivalent to Ctrl+A.

**Example:**
```typescript
// Select all content in the editor
editor.selectAllBlocks();
```

## Focus Management Methods

### focusIn

Gives focus to the editor.

**Signature:**
```typescript
focusIn(): void
```

**Description:**
This method ensures that the editor is ready for user input by giving it focus.

**Example:**
```typescript
// Focus the editor
editor.focusIn();
```

### focusOut

Removes focus from the editor.

**Signature:**
```typescript
focusOut(): void
```

**Description:**
This method clears any active selections and makes the editor inactive for user input.

**Example:**
```typescript
// Remove focus from the editor
editor.focusOut();
```

## Formatting Methods

### executeToolbarAction

Executes a built-in toolbar formatting command.

**Signature:**
```typescript
executeToolbarAction(action: CommandName, value?: string): void
```

**Parameters:**
- `action` (CommandName) - The toolbar command to execute
- `value` (string, optional) - Optional value for the command (e.g., color value)

**Description:**
Used to apply formatting such as bold, italic, or color to the selected text.

**Available Commands:**
- `CommandName.Bold`
- `CommandName.Italic`
- `CommandName.Underline`
- `CommandName.Strikethrough`
- `CommandName.Color`
- `CommandName.BackgroundColor`
- `CommandName.Superscript`
- `CommandName.Subscript`
- `CommandName.Uppercase`
- `CommandName.Lowercase`

**Example:**
```typescript
// Apply bold formatting
editor.executeToolbarAction(CommandName.Bold);

// Apply color formatting with a specific value
editor.executeToolbarAction(CommandName.Color, '#ff0000');
```

### enableToolbarItems

Enables specific toolbar items in the inline toolbar.

**Signature:**
```typescript
enableToolbarItems(itemId: string | string[]): void
```

**Parameters:**
- `itemId` (string | string[]) - Single item ID or array of item IDs to enable

**Description:**
This method accepts a single item or an array of items to be enabled.

**Example:**
```typescript
// Enable specific toolbar item
editor.enableToolbarItems('bold');

// Enable multiple items
editor.enableToolbarItems(['bold', 'italic', 'underline']);
```

### disableToolbarItems

Disables specific toolbar items in the inline toolbar.

**Signature:**
```typescript
disableToolbarItems(itemId: string | string[]): void
```

**Parameters:**
- `itemId` (string | string[]) - Single item ID or array of item IDs to disable

**Description:**
This method accepts a single item or an array of items to be disabled.

**Example:**
```typescript
// Disable specific toolbar item
editor.disableToolbarItems('bold');

// Disable multiple items
editor.disableToolbarItems(['bold', 'italic', 'underline']);
```

## Data Export Methods

### getDataAsJson

Exports the editor content in JSON format.

**Signature:**
```typescript
getDataAsJson(blockId?: string): BlockModel | BlockModel[]
```

**Parameters:**
- `blockId` (string, optional) - Optional block ID to export a specific block

**Returns:**
- `BlockModel | BlockModel[]` - Single block model or array of all blocks

**Description:**
If a block ID is provided, returns the data of that specific block; otherwise returns all content.

**Example:**
```typescript
// Get all blocks as JSON
const allBlocks = editor.getDataAsJson();

// Get a specific block as JSON
const specificBlock = editor.getDataAsJson('block-id');

console.log('JSON data:', JSON.stringify(allBlocks, null, 2));
```

### getDataAsHtml

Exports the editor content in HTML format.

**Signature:**
```typescript
getDataAsHtml(blockId?: string): string
```

**Parameters:**
- `blockId` (string, optional) - Optional block ID to export a specific block

**Returns:**
- `string` - HTML string representation of the content

**Description:**
Allows exporting all blocks or a specific block in HTML format.

**Example:**
```typescript
// Get all blocks as HTML
const allBlocksHtml = editor.getDataAsHtml();

// Get a specific block as HTML
const specificBlockHtml = editor.getDataAsHtml('block-id');

console.log('HTML output:', allBlocksHtml);
```

### renderBlocksFromJson

Renders blocks from JSON data.

**Signature:**
```typescript
renderBlocksFromJson(json: object | string, replace: boolean, targetBlockId?: string): boolean
```

**Parameters:**
- `json` (object | string) - JSON data containing block models
- `replace` (boolean) - Whether to replace all existing content (true) or insert at cursor (false)
- `targetBlockId` (string, optional) - Target block ID for insertion (only when replace is false)

**Returns:**
- `boolean` - Returns true if successful, false otherwise

**Description:**
This method allows either replacing all existing content or inserting at the cursor position.

**Example:**
```typescript
const jsonData = [
    {
        blockType: 'Paragraph',
        content: [
            {
                contentType: 'Text',
                content: 'New content from JSON'
            }
        ]
    }
];

// Replace all existing content
editor.renderBlocksFromJson(jsonData, true);

// Insert at cursor without replacing
editor.renderBlocksFromJson(jsonData, false);

// Insert after a specific block
editor.renderBlocksFromJson(jsonData, false, 'target-block-id');
```

### parseHtmlToBlocks

Converts an HTML string into an array of BlockModel objects.

**Signature:**
```typescript
parseHtmlToBlocks(html: string): BlockModel[]
```

**Parameters:**
- `html` (string) - HTML string to parse

**Returns:**
- `BlockModel[]` - Array of BlockModel objects

**Description:**
This method allows transforming HTML content into structured editor blocks.

**Example:**
```typescript
const htmlContent = '<h1>Title</h1><p>Paragraph content</p>';

// Parse HTML into blocks
const blocks = editor.parseHtmlToBlocks(htmlContent);

console.log('Parsed blocks:', blocks);
```

### print

Prints the editor content.

**Signature:**
```typescript
print(): void
```

**Description:**
This action opens the browser's print dialog with the current editor content.

**Example:**
```typescript
// Print the editor content
editor.print();
```

## Component Lifecycle Methods

### addEventListener

Adds an event handler to the given event listener.

**Signature:**
```typescript
addEventListener(eventName: string, handler: Function): void
```

**Parameters:**
- `eventName` (string) - Name of the event
- `handler` (Function) - Event handler function

**Example:**
```typescript
editor.addEventListener('blockChanged', (args) => {
    console.log('Block changed:', args);
});
```

### removeEventListener

Removes the handler from the given event listener.

**Signature:**
```typescript
removeEventListener(eventName: string, handler: Function): void
```

**Parameters:**
- `eventName` (string) - Name of the event
- `handler` (Function) - Event handler function to remove

**Example:**
```typescript
const handler = (args) => console.log('Event:', args);
editor.addEventListener('blockChanged', handler);
// Later remove it
editor.removeEventListener('blockChanged', handler);
```

### appendTo

Appends the control within the given HTML element.

**Signature:**
```typescript
appendTo(selector?: string | HTMLElement): void
```

**Parameters:**
- `selector` (string | HTMLElement, optional) - Element selector or HTMLElement

**Example:**
```typescript
const editor = new BlockEditor({
    blocks: []
});
editor.appendTo('#blockeditor');
```

### dataBind

Applies the pending property changes immediately to the component.

**Signature:**
```typescript
dataBind(): void
```

**Description:**
When invoked, applies the pending property changes immediately to the component.

**Example:**
```typescript
editor.blocks = newBlocksData;
editor.dataBind();
```

### refresh

Applies all pending property changes and renders the component again.

**Signature:**
```typescript
refresh(): void
```

**Description:**
Re-renders the entire component with current property values.

**Example:**
```typescript
editor.refresh();
```

### getRootElement

Returns the root element of the component.

**Signature:**
```typescript
getRootElement(): HTMLElement
```

**Returns:**
- `HTMLElement` - The root element

**Example:**
```typescript
const rootElement = editor.getRootElement();
console.log('Root element:', rootElement);
```

## Code Examples

### Complete Block Management Example

```typescript
import { BlockEditor, BlockModel, ContentType } from "@syncfusion/ej2-blockeditor";

const blockData = [
    {
        id: 'block-1',
        blockType: 'Heading',
        properties: { level: 1},
        content: [
            {
                contentType: ContentType.Text,
                content: 'Sample Heading'
            }
        ]
    },
    {
        id: 'block-2',
        blockType: 'Paragraph',
        content: [
            {
                contentType: ContentType.Text,
                content: 'This is a sample paragraph block.'
            }
        ]
    }
];

const blockEditor: BlockEditor = new BlockEditor({
    blocks: blockData
});

blockEditor.appendTo('#blockeditor');

// Add a new block
const newBlock: BlockModel = {
    id: 'new-block',
    blockType: 'Paragraph',
    content: [
        {
            contentType: ContentType.Text,
            content: 'This is a newly added block'
        }
    ]
};

blockEditor.addBlock(newBlock, 'block-2', true);

// Update a block
blockEditor.updateBlock('block-2', {
    indent: 1,
    content: [
        {
            contentType: ContentType.Text,
            content: 'Updated content'
        }
    ]
});

// Get block count
const count = blockEditor.getBlockCount();
console.log('Total blocks:', count);

// Remove a block
blockEditor.removeBlock('block-1');
```

### Complete Selection and Cursor Example

```typescript
import { BlockEditor, ContentType } from '@syncfusion/ej2-blockeditor';

const blockData = [
    {
        id: 'heading-block',
        blockType: 'Heading',
        properties: { level: 1},
        content: [
            {
                contentType: ContentType.Text,
                content: 'Welcome to Block Editor'
            }
        ]
    },
    {
        id: 'paragraph-1',
        blockType: 'Paragraph',
        content: [
            {
                contentType: ContentType.Text,
                content: 'This is the first paragraph with some sample text.'
            }
        ]
    }
];

const blockEditor: BlockEditor = new BlockEditor({
    blocks: blockData
});

blockEditor.appendTo('#blockeditor');

// Set text selection
blockEditor.setSelection('paragraph1-content', 5, 15);

// Set cursor position
blockEditor.setCursorPosition('heading-block', 10);

// Get selected blocks
const selectedBlocks = blockEditor.getSelectedBlocks();
if (selectedBlocks && selectedBlocks.length > 0) {
    console.log('Selected blocks:', selectedBlocks.length);
}

// Select a complete block
blockEditor.selectBlock('heading-block');

// Select all blocks
blockEditor.selectAllBlocks();
```

### Complete Formatting Example

```typescript
import { BlockEditor, ContentType, CommandName } from '@syncfusion/ej2-blockeditor';

const blockData = [
    {
        blockType: 'Paragraph',
        content: [
            {
                contentType: ContentType.Text,
                content: 'Select this text and apply formatting.'
            }
        ]
    }
];

const blockEditor: BlockEditor = new BlockEditor({
    blocks: blockData
});

blockEditor.appendTo('#blockeditor');

// Apply bold formatting
blockEditor.executeToolbarAction(CommandName.Bold);

// Apply color formatting
blockEditor.executeToolbarAction(CommandName.Color, '#ff6b35');

// Enable toolbar items
blockEditor.enableToolbarItems(['bold', 'italic', 'underline']);

// Disable toolbar items
blockEditor.disableToolbarItems(['bold', 'italic']);
```

### Complete Data Export Example

```typescript
import { BlockEditor, ContentType } from '@syncfusion/ej2-blockeditor';

const blockData = [
    {
        id: 'title-block',
        blockType: 'Heading',
        properties: { level: 1},
        content: [
            {
                contentType: ContentType.Text,
                content: 'Document Title'
            }
        ]
    },
    {
        id: 'content-block',
        blockType: 'Paragraph',
        content: [
            {
                contentType: ContentType.Text,
                content: 'Document content goes here.'
            }
        ]
    }
];

const blockEditor: BlockEditor = new BlockEditor({
    blocks: blockData
});

blockEditor.appendTo('#blockeditor');

// Get all data as JSON
const jsonData = blockEditor.getDataAsJson();
console.log('JSON:', JSON.stringify(jsonData, null, 2));

// Get specific block as JSON
const blockData = blockEditor.getDataAsJson('title-block');
console.log('Block JSON:', JSON.stringify(blockData, null, 2));

// Get all data as HTML
const htmlData = blockEditor.getDataAsHtml();
console.log('HTML:', htmlData);

// Get specific block as HTML
const blockHtml = blockEditor.getDataAsHtml('content-block');
console.log('Block HTML:', blockHtml);

// Render blocks from JSON
const newJsonData = [
    {
        blockType: 'Paragraph',
        content: [
            {
                contentType: ContentType.Text,
                content: 'New content from JSON'
            }
        ]
    }
];

blockEditor.renderBlocksFromJson(newJsonData, false);

// Parse HTML to blocks
const htmlContent = '<h2>Heading</h2><p>Paragraph</p>';
const parsedBlocks = blockEditor.parseHtmlToBlocks(htmlContent);
console.log('Parsed blocks:', parsedBlocks);

// Print editor content
blockEditor.print();
```
---
