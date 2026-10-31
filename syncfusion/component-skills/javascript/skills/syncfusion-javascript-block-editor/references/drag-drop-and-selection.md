# Drag, Drop, and Selection Reference

Complete reference for drag-and-drop functionality and selection management in the Syncfusion JavaScript BlockEditor.

## Table of Contents

- [Overview](#overview)
- [Drag and Drop](#drag-and-drop)
  - [Enable Drag and Drop](#enable-drag-and-drop)
  - [Single Block Dragging](#single-block-dragging)
  - [Multiple Block Dragging](#multiple-block-dragging)
  - [Visual Indicators](#visual-indicators)
  - [Drag and Drop Events](#drag-and-drop-events)
- [Selection Management](#selection-management)
  - [Text Selection](#text-selection)
  - [Block Selection](#block-selection)
  - [Multiple Block Selection](#multiple-block-selection)
  - [Selection Methods](#selection-methods)
  - [Selection Events](#selection-events)
- [Cursor Management](#cursor-management)
  - [Setting Cursor Position](#setting-cursor-position)
  - [Cursor Navigation](#cursor-navigation)
- [Selection Range Operations](#selection-range-operations)
  - [Getting Selection Range](#getting-selection-range)
  - [Setting Selection Range](#setting-selection-range)
- [API Reference](#api-reference)
- [Code Examples](#code-examples)

## Overview

The Block Editor provides intuitive drag-and-drop functionality and comprehensive selection management features that allow users to rearrange content blocks and select text and blocks for editing operations.

## Drag and Drop

The drag and drop feature in the Block Editor allows users to intuitively rearrange content blocks by dragging them to different positions within the editor.

### Enable Drag and Drop

Control the drag and drop functionality using the `enableDragAndDrop` property. This feature is enabled by default (`true`).

```typescript
const blockEditor = new BlockEditor({
    enableDragAndDrop: true  // Default value
});
```

**To disable drag and drop:**

```typescript
const blockEditor = new BlockEditor({
    enableDragAndDrop: false
});
```

### Single Block Dragging

To drag a single block:

1. Hover over the block to reveal the drag handle
2. Click and hold the handle
3. Drag the block to a new position
4. Release to drop the block

**Visual Feedback:**
- A drag handle icon appears when hovering over a block
- During drag, a visual indicator shows where the block will be placed
- The cursor changes to indicate the drag operation

**Example:**
```typescript
import { BlockEditor, BlockModel, ContentType } from "@syncfusion/ej2-blockeditor";

const blocksData: BlockModel[] = [
    {
        blockType: 'Heading',
        properties: { level: 1},
        content: [
            {
                contentType: ContentType.Text,
                content: 'Drag and Drop Demo'
            }
        ]
    },
    {
        blockType: 'Paragraph',
        content: [
            {
                contentType: ContentType.Text,
                content: 'Hover over this block to see the drag handle.'
            }
        ]
    }
];

const blockEditor: BlockEditor = new BlockEditor({
    blocks: blocksData,
    enableDragAndDrop: true
});

blockEditor.appendTo('#blockeditor');
```

### Multiple Block Dragging

The Block Editor supports dragging multiple blocks simultaneously:

1. Select multiple blocks (using Shift+Click or drag selection)
2. Click and hold the drag handle on any selected block
3. Drag the entire group to a new location
4. Release to drop all blocks at once

**Features:**
- All selected blocks move together
- Maintains the relative order of selected blocks
- Visual feedback shows all blocks being moved

**Example:**
```typescript
const blocksData: BlockModel[] = [
    {
        id: 'block-1',
        blockType: 'Paragraph',
        content: [
            {
                contentType: ContentType.Text,
                content: 'First block - select multiple blocks to drag them together.'
            }
        ]
    },
    {
        id: 'block-2',
        blockType: 'BulletList',
        content: [
            {
                contentType: ContentType.Text,
                content: 'Second block'
            }
        ]
    },
    {
        id: 'block-3',
        blockType: 'NumberedList',
        content: [
            {
                contentType: ContentType.Text,
                content: 'Third block'
            }
        ]
    }
];

const blockEditor: BlockEditor = new BlockEditor({
    blocks: blocksData,
    enableDragAndDrop: true
});

blockEditor.appendTo('#blockeditor');
```

### Visual Indicators

During drag operations, the editor provides several visual indicators:

1. **Drag Handle**: Appears when hovering over a block
2. **Drop Line**: Shows the exact insertion point
3. **Ghost Image**: Semi-transparent preview of the dragged content
4. **Cursor Changes**: Indicates valid drop zones

### Drag and Drop Events

The editor provides three events for monitoring drag-and-drop operations:

#### blockDragStart

Triggered at the beginning of a drag operation.

```typescript
blockDragStart: (args: BlockDragEventArgs) => {
    console.log('Drag started:', args.blocks);
    console.log('From index:', args.fromIndex);
    
    // Cancel drag for specific conditions
    if (args.blocks[0].blockType === 'Image') {
        args.cancel = true;
    }
}
```

#### blockDragging

Triggered continuously during dragging.

```typescript
blockDragging: (args: BlockDraggingEventArgs) => {
    console.log('Dragging to index:', args.dropIndex);
    // Show custom visual feedback
}
```

#### blockDropped

Triggered when blocks are successfully dropped.

```typescript
blockDropped: (args: BlockDroppedEventArgs) => {
    console.log('Dropped at index:', args.dropIndex);
    console.log('From index:', args.fromIndex);
    // Log the reorder operation
}
```

**Complete Example:**
```typescript
import { BlockEditor, BlockDragEventArgs, BlockDroppedEventArgs } from '@syncfusion/ej2-blockeditor';

const blockEditor = new BlockEditor({
    blocks: blocksData,
    enableDragAndDrop: true,
    
    blockDragStart: (args: BlockDragEventArgs) => {
        console.log(`Starting drag of ${args.blocks.length} block(s)`);
        
        // Prevent dragging of certain block types
        const hasRestrictedType = args.blocks.some(
            block => block.blockType === 'Table'
        );
        
        if (hasRestrictedType) {
            args.cancel = true;
            alert('Tables cannot be dragged');
        }
    },
    
    blockDragging: (args: BlockDraggingEventArgs) => {
        // Update drop indicator
        updateDropIndicator(args.dropIndex);
    },
    
    blockDropped: (args: BlockDroppedEventArgs) => {
        console.log('Block(s) moved successfully');
        console.log('From:', args.fromIndex);
        console.log('To:', args.dropIndex);
        
        // Log the change
        logBlockReorder(args.blocks, args.fromIndex, args.dropIndex);
    }
});

blockEditor.appendTo('#blockeditor');
```

## Selection Management

The Block Editor provides comprehensive selection management for both text and blocks.

### Text Selection

Select text within a block:

1. Click and drag to select text
2. Double-click to select a word
3. Triple-click to select a paragraph

**Programmatic Text Selection:**

```typescript
// Select text from position 5 to 15
editor.setSelection('content-element-id', 5, 15);
```

### Block Selection

Select entire blocks:

1. Click the drag handle or block margin
2. Use keyboard shortcuts (Shift + Arrow keys)
3. Programmatically select blocks

**Programmatic Block Selection:**

```typescript
// Select a specific block
editor.selectBlock('block-id');

// Select all blocks
editor.selectAllBlocks();
```

### Multiple Block Selection

Select multiple blocks:

1. **Shift + Click**: Select a range of blocks
2. **Ctrl/Cmd + Click**: Add individual blocks to selection
3. **Drag Selection**: Click and drag in the margin area

### Selection Methods

#### setSelection

Sets text selection within a specific content element.

```typescript
setSelection(node: Node, startIndex: number, endIndex: number): void
```

**Example:**
```typescript
// Select characters 0 to 10 in a paragraph
editor.setSelection('paragraph-content-id', 0, 10);
```

#### setCursorPosition

Places the cursor at a specific position.

```typescript
setCursorPosition(blockId: string, position: number): void
```

**Example:**
```typescript
// Set cursor at position 5 in a block
editor.setCursorPosition('block-id', 5);
```

#### getSelectedBlocks

Retrieves currently selected blocks.

```typescript
getSelectedBlocks(): BlockModel[] | null
```

**Example:**
```typescript
const selectedBlocks = editor.getSelectedBlocks();
if (selectedBlocks && selectedBlocks.length > 0) {
    console.log('Selected:', selectedBlocks.length, 'blocks');
}
```

#### selectBlock

Selects a specific block.

```typescript
selectBlock(blockId: string): void
```

**Example:**
```typescript
// Select a block by its ID
editor.selectBlock('heading-block-1');
```

#### selectAllBlocks

Selects all blocks in the editor.

```typescript
selectAllBlocks(): void
```

**Example:**
```typescript
// Select all content (Ctrl+A equivalent)
editor.selectAllBlocks();
```

### Selection Events

#### selectionChanged

Triggered when the selection changes.

```typescript
selectionChanged: (args: SelectionChangedEventArgs) => {
    console.log('Selection changed');
    
    // Get current selection
    const selectedBlocks = editor.getSelectedBlocks();
    const range = editor.getRange();
    
    // Update UI based on selection
    updateToolbarState(selectedBlocks, range);
}
```

## Cursor Management

### Setting Cursor Position

Set the cursor at a specific position within a block:

```typescript
// Set cursor at the beginning
editor.setCursorPosition('block-id', 0);

// Set cursor at position 10
editor.setCursorPosition('block-id', 10);

// Set cursor at the end
const block = editor.getBlock('block-id');
const contentLength = block.content[0].content.length;
editor.setCursorPosition('block-id', contentLength);
```

### Cursor Navigation

Use keyboard shortcuts for cursor navigation:

- **Arrow Keys**: Move cursor character by character
- **Ctrl/Cmd + Arrow**: Move by word
- **Home/End**: Move to start/end of line
- **Ctrl/Cmd + Home/End**: Move to start/end of document

## Selection Range Operations

### Getting Selection Range

Get the current selection range:

```typescript
const range = editor.getRange();
if (range) {
    console.log('Start:', range.startContainer, range.startOffset);
    console.log('End:', range.endContainer, range.endOffset);
    console.log('Collapsed:', range.collapsed);
}
```

### Setting Selection Range

Set a custom selection range:

```typescript
// Create a custom range
const range = document.createRange();
const textNode = document.getElementById('block-id').firstChild;

if (textNode) {
    range.setStart(textNode, 5);
    range.setEnd(textNode, 20);
    
    // Apply the range
    editor.selectRange(range);
}
```

## API Reference

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `enableDragAndDrop` | `boolean` | `true` | Enables or disables drag and drop functionality |

### Methods

| Method | Signature | Description |
|--------|-----------|-------------|
| `setSelection` | `setSelection(node: Node, startIndex: number, endIndex: number): void` | Sets text selection within a content element |
| `setCursorPosition` | `setCursorPosition(blockId: string, position: number): void` | Places cursor at a specific position |
| `getSelectedBlocks` | `getSelectedBlocks(): BlockModel[] \| null` | Retrieves currently selected blocks |
| `getRange` | `getRange(): Range \| null` | Gets current selection range |
| `selectRange` | `selectRange(range: Range): void` | Sets the selection range |
| `selectBlock` | `selectBlock(blockId: string): void` | Selects a specific block |
| `selectAllBlocks` | `selectAllBlocks(): void` | Selects all blocks |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `blockDragStart` | `EmitType<BlockDragEventArgs>` | Triggered when drag starts |
| `blockDragging` | `EmitType<BlockDraggingEventArgs>` | Triggered during dragging |
| `blockDropped` | `EmitType<BlockDroppedEventArgs>` | Triggered when blocks are dropped |
| `selectionChanged` | `EmitType<SelectionChangedEventArgs>` | Triggered when selection changes |

### Event Arguments

#### BlockDragEventArgs

```typescript
interface BlockDragEventArgs {
    blocks: BlockModel[];
    cancel: boolean;
    dropIndex: number;
    event: Event;
    fromIndex: number[];
    target: HTMLElement;
}
```

#### BlockDraggingEventArgs

```typescript
interface BlockDraggingEventArgs {
    blocks: BlockModel[];
    cancel: boolean;
    dropIndex: number;
    event: Event;
    fromIndex: number[];
    target: HTMLElement;
}
```

#### BlockDroppedEventArgs

```typescript
interface BlockDroppedEventArgs {
    blocks: BlockModel[];
    dropIndex: number;
    event: Event;
    fromIndex: number[];
    target: HTMLElement;
}
```

#### SelectionChangedEventArgs

```typescript
interface SelectionChangedEventArgs {
    event: Event;
}
```

## Code Examples

### Complete Drag and Drop Example

```typescript
import { 
    BlockEditor, 
    BlockModel, 
    ContentType,
    BlockDragEventArgs,
    BlockDraggingEventArgs,
    BlockDroppedEventArgs
} from "@syncfusion/ej2-blockeditor";

const blocksData: BlockModel[] = [
    {
        id: 'heading',
        blockType: 'Heading',
        properties: { level: 1},
        content: [
            {
                contentType: ContentType.Text,
                content: 'Drag and Drop Demo'
            }
        ]
    },
    {
        id: 'intro',
        blockType: 'Paragraph',
        content: [
            {
                contentType: ContentType.Text,
                content: 'Try rearranging blocks by dragging the handle.'
            }
        ]
    },
    {
        id: 'list1',
        blockType: 'BulletList',
        content: [
            {
                contentType: ContentType.Text,
                content: 'Drag and drop is enabled by default'
            }
        ]
    },
    {
        id: 'list2',
        blockType: 'NumberedList',
        content: [
            {
                contentType: ContentType.Text,
                content: 'You can select multiple blocks and drag them together'
            }
        ]
    },
    {
        id: 'note',
        blockType: 'Callout',
        properties: {
            children: [{
                blockType: 'Paragraph',
                content: [
                    {
                        contentType: ContentType.Text,
                        content: 'This is a callout block that can also be dragged'
                    }
                ]
            }]
        }
    }
];

const blockEditor: BlockEditor = new BlockEditor({
    blocks: blocksData,
    enableDragAndDrop: true,
    
    blockDragStart: (args: BlockDragEventArgs) => {
        console.log('=== Drag Started ===');
        console.log('Blocks being dragged:', args.blocks.length);
        console.log('From indices:', args.fromIndex);
        
        // Example: Prevent dragging the heading
        if (args.blocks.some(block => block.id === 'heading')) {
            args.cancel = true;
            displayMessage('Cannot drag the main heading');
            return;
        }
        
        displayMessage(`Dragging ${args.blocks.length} block(s)`);
    },
    
    blockDragging: (args: BlockDraggingEventArgs) => {
        // Show where the blocks will be dropped
        displayMessage(`Drop position: ${args.dropIndex}`);
    },
    
    blockDropped: (args: BlockDroppedEventArgs) => {
        console.log('=== Blocks Dropped ===');
        console.log('Dropped at index:', args.dropIndex);
        console.log('Original indices:', args.fromIndex);
        
        displayMessage(
            `Moved ${args.blocks.length} block(s) from position ${args.fromIndex[0]} to ${args.dropIndex}`
        );
        
        // Log the reorder for undo/redo or sync
        logReorderOperation(args.blocks, args.fromIndex, args.dropIndex);
    }
});

blockEditor.appendTo('#blockeditor');

function displayMessage(message: string): void {
    const messageDiv = document.getElementById('message');
    if (messageDiv) {
        messageDiv.textContent = message;
    }
}

function logReorderOperation(
    blocks: BlockModel[], 
    fromIndices: number[], 
    toIndex: number
): void {
    console.log('Logging reorder operation:', {
        blocks: blocks.map(b => b.id),
        from: fromIndices,
        to: toIndex,
        timestamp: new Date().toISOString()
    });
}
```

### Complete Selection Management Example

```typescript
import { 
    BlockEditor, 
    BlockModel, 
    ContentType,
    SelectionChangedEventArgs
} from '@syncfusion/ej2-blockeditor';

const blockData: BlockModel[] = [
    {
        id: 'heading-block',
        blockType: 'Heading',
        properties: { level: 1},
        content: [
            {
                contentType: ContentType.Text,
                content: 'Selection Management Demo'
            }
        ]
    },
    {
        id: 'paragraph-1',
        blockType: 'Paragraph',
        content: [
            {
                contentType: ContentType.Text,
                content: 'This is the first paragraph. You can select text or entire blocks.'
            }
        ]
    },
    {
        id: 'paragraph-2',
        blockType: 'Paragraph',
        content: [
            {
                contentType: ContentType.Text,
                content: 'This is the second paragraph for demonstrating multiple block selection.'
            }
        ]
    },
    {
        id: 'list-block',
        blockType: 'BulletList',
        content: [
            {
                contentType: ContentType.Text,
                content: 'First list item for selection testing'
            }
        ]
    }
];

const blockEditor: BlockEditor = new BlockEditor({
    blocks: blockData,
    
    selectionChanged: (args: SelectionChangedEventArgs) => {
        console.log('Selection changed');
        updateSelectionInfo();
    }
});

blockEditor.appendTo('#blockeditor');

// Button event handlers
document.getElementById('selectText')?.addEventListener('click', () => {
    // Select text from position 5 to 15 in paragraph 1
    blockEditor.setSelection('para1-content', 5, 15);
    displayMessage('Selected text from position 5 to 15');
});

document.getElementById('setCursor')?.addEventListener('click', () => {
    // Set cursor at position 10 in heading
    blockEditor.setCursorPosition('heading-block', 10);
    displayMessage('Cursor set at position 10 in heading');
});

document.getElementById('selectBlock')?.addEventListener('click', () => {
    // Select the entire heading block
    blockEditor.selectBlock('heading-block');
    displayMessage('Heading block selected');
});

document.getElementById('selectAll')?.addEventListener('click', () => {
    // Select all blocks
    blockEditor.selectAllBlocks();
    displayMessage('All blocks selected');
});

document.getElementById('getSelection')?.addEventListener('click', () => {
    // Get current selection
    const selectedBlocks = blockEditor.getSelectedBlocks();
    const range = blockEditor.getRange();
    
    let info = 'Current Selection:\n';
    
    if (selectedBlocks && selectedBlocks.length > 0) {
        info += `Blocks: ${selectedBlocks.length}\n`;
        selectedBlocks.forEach(block => {
            info += `  - ${block.id} (${block.blockType})\n`;
        });
    }
    
    if (range && !range.collapsed) {
        info += `Text Range: ${range.startOffset} to ${range.endOffset}\n`;
    }
    
    displayMessage(info);
});

document.getElementById('customRange')?.addEventListener('click', () => {
    // Create a custom range for paragraph 2
    const paragraph = document.getElementById('paragraph-2');
    if (paragraph) {
        const range = document.createRange();
        const textNode = paragraph.querySelector('.e-block-content')?.firstChild;
        
        if (textNode) {
            range.setStart(textNode, 8);
            range.setEnd(textNode, 25);
            blockEditor.selectRange(range);
            displayMessage('Custom range selected (positions 8-25)');
        }
    }
});

function updateSelectionInfo(): void {
    const selectedBlocks = blockEditor.getSelectedBlocks();
    const range = blockEditor.getRange();
    
    const infoDiv = document.getElementById('selection-info');
    if (infoDiv) {
        let info = '';
        
        if (selectedBlocks && selectedBlocks.length > 0) {
            info += `Selected blocks: ${selectedBlocks.length}\n`;
        }
        
        if (range && !range.collapsed) {
            info += `Text selected: ${range.toString().length} characters\n`;
        }
        
        infoDiv.textContent = info || 'No selection';
    }
}

function displayMessage(message: string): void {
    const messageDiv = document.getElementById('message');
    if (messageDiv) {
        messageDiv.textContent = message;
    }
}
```
---
