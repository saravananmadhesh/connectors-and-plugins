# Block Management Methods

## Table of Contents
- [Overview](#overview)
- [addBlock Method](#addblock-method)
- [removeBlock Method](#removeblock-method)
- [moveBlock Method](#moveblock-method)
- [updateBlock Method](#updateblock-method)
- [getBlock Method](#getblock-method)
- [getBlockCount Method](#getblockcount-method)
- [Practical Examples](#practical-examples)

## Overview

Block management methods allow you to programmatically manipulate the editor content. Use these methods to:

- Add new blocks dynamically
- Remove blocks from the editor
- Rearrange blocks
- Update block properties
- Query block information
- Get editor statistics

Access these methods via a template reference to the BlockEditor component.

## addBlock Method

Adds a new block to the editor at a specified position.

**Syntax:**
```typescript
addBlock(block: BlockModel, targetBlockId?: string, insertAfter?: boolean): void
```

**Parameters:**
- `block`: The BlockModel to add
- `targetBlockId` (optional): ID of the reference block for positioning
- `insertAfter` (optional): `true` to insert after target, `false` to insert before. Default: end of editor

**Returns:** void

**Examples:**

```typescript
// Add block at the end
const newBlock: BlockModel = {
  blockType: 'Paragraph',
  content: [
    { contentType: ContentType.Text, content: 'New paragraph' }
  ]
};
this.blockEditor.addBlock(newBlock);

// Add block after a specific block
this.blockEditor.addBlock(newBlock, 'block-2', true);

// Add block before a specific block
this.blockEditor.addBlock(newBlock, 'block-3', false);

// Add a heading block
const headingBlock: BlockModel = {
  blockType: 'Heading',
  properties: { level: 2 },
  content: [
    { contentType: ContentType.Text, content: 'New Section' }
  ]
};
this.blockEditor.addBlock(headingBlock, 'block-1', true);
```

**Use Cases:**
- Inserting content programmatically
- Adding sections to a document template
- Building dynamic forms or documents
- Appending generated content

## removeBlock Method

Removes a block from the editor by its ID.

**Syntax:**
```typescript
removeBlock(blockId: string): void
```

**Parameters:**
- `blockId`: The ID of the block to remove

**Returns:** void

**Examples:**

```typescript
// Remove a block by ID
this.blockEditor.removeBlock('block-to-remove');

// Remove the first block
this.blockEditor.removeBlock('block-1');

// Remove multiple blocks (one at a time)
['block-1', 'block-2', 'block-3'].forEach(id => {
  this.blockEditor.removeBlock(id);
});
```

**Use Cases:**
- Deleting outdated sections
- Cleaning up template blocks
- Removing user-selected content
- Reverting document changes

## moveBlock Method

Moves a block to a new position.

**Syntax:**
```typescript
moveBlock(fromBlockId: string, toBlockId: string): void
```

**Parameters:**
- `fromBlockId`: ID of the block to move
- `toBlockId`: ID of the target block to move to

**Returns:** `void`

**Description:** Moves a block from its current position to the position of the target block. The exact behavior (insert before/after) is determined by the editor's internal logic.

**Examples:**

```typescript
// Move block to another position
this.blockEditor.moveBlock('block-3', 'block-1');

// Reorder blocks
this.blockEditor.moveBlock('block-2', 'block-4');
```

**Use Cases:**
- Rearranging content programmatically
- Reordering sections
- Reorganizing document structure
- Implementing drag-and-drop reordering

## updateBlock Method

Updates the properties of an existing block. Only specified properties are modified.

**Syntax:**
```typescript
updateBlock(blockId: string, updates: Partial<BlockModel>): boolean
```

**Parameters:**
- `blockId`: ID of the block to update
- `updates`: Object containing properties to update

**Returns:** `true` if update succeeded, `false` otherwise

**Examples:**

```typescript
// Update block indentation
const success = this.blockEditor.updateBlock('block-1', {
  indent: 2
});

// Update block content
this.blockEditor.updateBlock('block-2', {
  content: [
    { contentType: ContentType.Text, content: 'Updated text' }
  ]
});

// Update checklist item status
this.blockEditor.updateBlock('checklist-1', {
  properties: { isChecked: true }
});

// Add CSS class to block
this.blockEditor.updateBlock('block-3', {
  cssClass: 'highlighted-section'
});

// Update heading level
this.blockEditor.updateBlock('heading-1', {
  properties: { level: 3 }
});

// Update with multiple properties
const updated = this.blockEditor.updateBlock('block-4', {
  indent: 1,
  cssClass: 'important-section',
  content: [
    { contentType: ContentType.Text, content: 'Important' }
  ]
});

if (updated) {
  console.log('Block updated successfully');
}
```

**Use Cases:**
- Modifying content programmatically
- Updating styling based on conditions
- Changing block types or properties
- Batch updating multiple blocks

## getBlock Method

Retrieves a block by its ID.

**Syntax:**
```typescript
getBlock(blockId: string): BlockModel | null
```

**Parameters:**
- `blockId`: ID of the block to retrieve

**Returns:** BlockModel object or `null` if not found

**Examples:**

```typescript
// Get a block
const block = this.blockEditor.getBlock('block-1');
if (block) {
  console.log('Block type:', block.blockType);
  console.log('Block content:', block.content);
}

// Check if block exists before updating
const blockToUpdate = this.blockEditor.getBlock('block-2');
if (blockToUpdate) {
  console.log('Found block:', blockToUpdate.blockType);
} else {
  console.log('Block not found');
}

// Get and display block information
const block = this.blockEditor.getBlock('heading-1');
if (block && block.content) {
  const text = block.content[0].content;
  console.log('Heading text:', text);
}

// Check heading level
const heading = this.blockEditor.getBlock('heading-2');
if (heading && heading.properties) {
  console.log('Level:', heading.properties.level);
}
```

**Use Cases:**
- Reading block data for validation
- Checking block properties
- Verifying block existence
- Building block-specific logic

## getBlockCount Method

Returns the total number of blocks in the editor.

**Syntax:**
```typescript
getBlockCount(): number
```

**Parameters:** None

**Returns:** Number of blocks (integer)

**Examples:**

```typescript
// Get total block count
const count = this.blockEditor.getBlockCount();
console.log(`Total blocks: ${count}`);

// Check if editor is empty
if (this.blockEditor.getBlockCount() === 0) {
  console.log('Editor is empty');
}

// Validate minimum content
if (this.blockEditor.getBlockCount() < 3) {
  alert('Document must have at least 3 blocks');
}

// Track document complexity
const blockCount = this.blockEditor.getBlockCount();
const complexity = blockCount > 10 ? 'Complex' : 'Simple';
console.log(`Document complexity: ${complexity}`);
```

**Use Cases:**
- Validating document completeness
- Showing editor statistics
- Preventing empty submissions
- Calculating document metrics

## Practical Examples

### Example 1: Build a Document Template

```typescript
public createTemplate(): void {
  // Add title
  this.blockEditor.addBlock({
    blockType: 'Heading',
    properties: { level: 1 },
    content: [
      { contentType: ContentType.Text, content: 'New Document' }
    ]
  });

  // Add introduction section
  this.blockEditor.addBlock({
    blockType: 'Heading',
    properties: { level: 2 },
    content: [
      { contentType: ContentType.Text, content: 'Introduction' }
    ]
  });

  // Add placeholder paragraph
  this.blockEditor.addBlock({
    blockType: 'Paragraph',
    content: [
      { contentType: ContentType.Text, content: 'Add your introduction here...' }
    ]
  });

  console.log(`Template created with ${this.blockEditor.getBlockCount()} blocks`);
}
```

### Example 2: Reorganize Document

```typescript
public reorganizeDocument(): void {
  // Get all blocks
  const count = this.blockEditor.getBlockCount();

  // Move block to new position
  if (count > 0) {
    this.blockEditor.moveBlock('block-5', 'block-1');
  }

  // Reorder another block
  if (count > 1) {
    this.blockEditor.moveBlock('block-2', 'block-3');
  }
}
```

### Example 3: Update Content Based on Validation

```typescript
public validateAndUpdate(): void {
  // Check first block
  const firstBlock = this.blockEditor.getBlock('block-1');

  if (!firstBlock || !firstBlock.content) {
    // Add placeholder if missing
    this.blockEditor.addBlock({
      blockType: 'Paragraph',
      content: [
        { contentType: ContentType.Text, content: 'Please add content' }
      ]
    }, 'block-1', false);
  }

  // Validate block count
  const totalBlocks = this.blockEditor.getBlockCount();
  if (totalBlocks === 0) {
    console.warn('Document is empty');
  }
}
```

### Example 4: Duplicate a Block

```typescript
public duplicateBlock(blockId: string): void {
  const originalBlock = this.blockEditor.getBlock(blockId);

  if (originalBlock) {
    // Create a copy
    const duplicatedBlock: BlockModel = { ...originalBlock };
    delete duplicatedBlock.id;  // Remove ID to let editor generate new one

    // Add after original
    this.blockEditor.addBlock(duplicatedBlock, blockId, true);
    console.log('Block duplicated');
  }
}
```

