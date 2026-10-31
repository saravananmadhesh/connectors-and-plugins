# Paste, Undo/Redo, and Keyboard Shortcuts Reference

Complete reference for paste cleanup, undo/redo operations, and keyboard shortcuts in the Syncfusion JavaScript BlockEditor.

## Table of Contents

- [Overview](#overview)
- [Paste Cleanup](#paste-cleanup)
  - [Configuration](#paste-cleanup-configuration)
  - [Allowed Styles](#allowed-styles)
  - [Denied Tags](#denied-tags)
  - [Keep Format Setting](#keep-format-setting)
  - [Plain Text Mode](#plain-text-mode)
  - [Paste Events](#paste-events)
- [Undo/Redo Operations](#undo-redo-operations)
  - [Keyboard Shortcuts](#undo-redo-keyboard-shortcuts)
  - [Configuring Undo/Redo Stack](#configuring-undo-redo-stack)
  - [Programmatic Undo/Redo](#programmatic-undo-redo)
- [Keyboard Shortcuts](#keyboard-shortcuts)
  - [Content Editing and Formatting](#content-editing-shortcuts)
  - [Block Creation and Management](#block-creation-shortcuts)
  - [Block Level Actions](#block-level-actions)
  - [General Editor Operations](#general-operations)
  - [Customizing Keyboard Shortcuts](#customizing-shortcuts)
- [API Reference](#api-reference)
- [Code Examples](#code-examples)

## Overview

The Block Editor provides robust paste clean-up functionalities, comprehensive undo/redo support, and extensive keyboard shortcuts to ensure seamless content integration, efficient editing operations, and enhanced productivity.

## Paste Cleanup

The Block Editor control provides robust paste clean-up functionalities to ensure that pasted content integrates seamlessly and maintains styling and structural consistency.

### Paste Cleanup Configuration

Configure paste behavior using the `pasteCleanupSettings` property:

```typescript
const editor = new BlockEditor({
    pasteCleanupSettings: {
        deniedTags: ['script', 'iframe'],
        keepFormat: true,
        plainText: false
    }
});
```

### Denied Tags

The `deniedTags` property specifies a list of HTML tags to be removed from pasted content. This is useful for stripping potentially problematic elements.

**Default:**
```typescript
[] // Empty array - no tags are removed by default
```

**Configuration:**
```typescript
pasteCleanupSettings: {
    deniedTags: ['script', 'iframe', 'embed', 'object']
}
```

**Example:**
```typescript
const blockEditor: BlockEditor = new BlockEditor({
    blocks: [
        {
            blockType: 'Paragraph'
        }
    ],
    pasteCleanupSettings: {
        deniedTags: ['script', 'iframe', 'embed', 'object', 'style']
    }
});

blockEditor.appendTo('#blockeditor');
```

### Keep Format Setting

By default, the editor retains the formatting of pasted content (e.g., bold, italics, links). You can disable this by setting the `keepFormat` property to `false`.

**Default:** `true`

**Configuration:**
```typescript
pasteCleanupSettings: {
    keepFormat: false
}
```

When disabled, the editor primarily pastes content as plain text.

**Example:**
```typescript
const blockEditor: BlockEditor = new BlockEditor({
    blocks: [
        {
            blockType: 'Paragraph'
        }
    ],
    pasteCleanupSettings: {
        keepFormat: false
    }
});

blockEditor.appendTo('#blockeditor');
```

### Plain Text Mode

To paste content as plain text, stripping all HTML tags and inline styles, set the `plainText` property to `true`. This ensures that only raw text is inserted.

**Default:** `false`

**Configuration:**
```typescript
pasteCleanupSettings: {
    plainText: true
}
```

**Example:**
```typescript
const blockEditor: BlockEditor = new BlockEditor({
    blocks: [
        {
            blockType: 'Paragraph'
        }
    ],
    pasteCleanupSettings: {
        plainText: true
    }
});

blockEditor.appendTo('#blockeditor');
```

### Paste Events

The Block Editor provides events to monitor and interact with paste actions.

#### beforePasteCleanup

Triggers before the content is pasted into the editor.

**Event Arguments:**

| Property | Type | Description |
|----------|------|-------------|
| `cancel` | `boolean` | Set to true to cancel the paste operation |
| `content` | `string` | The content being pasted |

**Example:**
```typescript
const editor = new BlockEditor({
    beforePasteCleanup: (args: BeforePasteCleanupEventArgs) => {
        console.log('Before paste:', args.content);
        
        // Cancel paste if content contains scripts
        if (args.content.includes('<script>')) {
            args.cancel = true;
            alert('Script tags are not allowed');
        }
        
        // Modify content before paste
        args.content = args.content.replace(/<iframe[^>]*>/gi, '');
    }
});
```

#### afterPasteCleanup

Triggers after the content is pasted into the editor.

**Event Arguments:**

| Property | Type | Description |
|----------|------|-------------|
| `content` | `string` | The content that was pasted (after cleanup) |

**Example:**
```typescript
const editor = new BlockEditor({
    afterPasteCleanup: (args: AfterPasteCleanupEventArgs) => {
        console.log('After paste:', args.content.length, 'characters');
        // Update word count or other UI elements
    }
});
```

## Undo/Redo Operations

The undo/redo feature enables users to revert or reapply changes made to the content, offering a safety net for edits and enhancing the overall editing experience.

### Undo/Redo Keyboard Shortcuts

| Action | Windows | Mac | Description |
|--------|---------|-----|-------------|
| Undo | Ctrl + Z | ⌘ + Z | Reverts the last action |
| Redo | Ctrl + Y | ⌘ + Y | Reapplies the last undone action |

### Configuring Undo/Redo Stack

The Block Editor stores a history of actions. By default, it saves up to **30** actions. You can customize this limit using the `undoRedoStack` property.

**Default:** `30`

**Configuration:**
```typescript
const blockEditor = new BlockEditor({
    undoRedoStack: 20  // Store up to 20 actions
});
```

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
                content: 'Undo/Redo Demo'
            }
        ]
    },
    {
        blockType: 'Paragraph',
        content: [
            {
                contentType: ContentType.Text,
                content: 'Try making edits, then use Ctrl+Z to undo and Ctrl+Y to redo.'
            }
        ]
    }
];

const blockEditor: BlockEditor = new BlockEditor({
    blocks: blocksData,
    undoRedoStack: 40  // Store up to 40 actions
});

blockEditor.appendTo('#blockeditor');
```

### Programmatic Undo/Redo

While the Block Editor doesn't expose direct `undo()` and `redo()` methods, you can programmatically trigger undo/redo by:

1. **Simulating Keyboard Events:**
```typescript
// Trigger undo
const undoEvent = new KeyboardEvent('keydown', {
    key: 'z',
    ctrlKey: true
});
editor.getRootElement().dispatchEvent(undoEvent);

// Trigger redo
const redoEvent = new KeyboardEvent('keydown', {
    key: 'y',
    ctrlKey: true
});
editor.getRootElement().dispatchEvent(redoEvent);
```

2. **Using Custom Undo/Redo Manager:**
Implement a custom history manager using the `blockChanged` event.

## Keyboard Shortcuts

The Block Editor provides comprehensive keyboard shortcuts organized into different categories based on their functionality.

### Content Editing Shortcuts

These keyboard shortcuts allow quick access to content editing features:

| Action | Windows | Mac | Description |
|--------|---------|-----|-------------|
| Bold | Ctrl + B | ⌘ + B | Apply bold formatting |
| Italic | Ctrl + I | ⌘ + I | Apply italic formatting |
| Underline | Ctrl + U | ⌘ + U | Apply underline formatting |
| Strikethrough | Ctrl + Shift + X | ⌘ + ⇧ + X | Apply strikethrough formatting |
| Insert Link | Ctrl + K | ⌘ + K | Insert or edit hyperlink |

**Example:**
```typescript
// Select text and press Ctrl+B to make it bold
// Or use programmatically:
editor.executeToolbarAction(CommandName.Bold);
```

### Block Creation Shortcuts

These shortcuts enable quick creation of different block types:

| Action | Windows | Mac | Description |
|--------|---------|-----|-------------|
| Create Paragraph | Ctrl + Alt + P | ⌘ + ⌥ + P | Create a paragraph block |
| Create Checklist | Ctrl + Shift + 7 | ⌘ + ⇧ + 7 | Create a checklist block |
| Create Bullet List | Ctrl + Shift + 8 | ⌘ + ⇧ + 8 | Create a bullet list block |
| Create Numbered List | Ctrl + Shift + 9 | ⌘ + ⇧ + 9 | Create a numbered list block |
| Create Heading 1 | Ctrl + Alt + 1 | ⌘ + ⌥ + 1 | Create a level 1 heading |
| Create Heading 2 | Ctrl + Alt + 2 | ⌘ + ⌥ + 2 | Create a level 2 heading |
| Create Heading 3 | Ctrl + Alt + 3 | ⌘ + ⌥ + 3 | Create a level 3 heading |
| Create Heading 4 | Ctrl + Alt + 4 | ⌘ + ⌥ + 4 | Create a level 4 heading |
| Create Quote | Ctrl + Alt + Q | ⌘ + ⌥ + Q | Create a quote block |
| Create Code Block | Ctrl + Alt + K | ⌘ + ⌥ + K | Create a code block |
| Create Callout | Ctrl + Alt + C | ⌘ + ⌥ + C | Create a callout block |
| Insert Image | Ctrl + Alt + / | ⌘ + ⌥ + / | Insert an image block |
| Insert Divider | Ctrl + Shift + - | ⌘ + ⇧ + - | Insert a divider block |

### Block Level Actions

These shortcuts provide quick access to block-specific actions:

| Action | Windows | Mac | Description |
|--------|---------|-----|-------------|
| Duplicate Block | Ctrl + D | ⌘ + D | Duplicate the current block |
| Delete Block | Ctrl + Shift + D | ⌘ + ⇧ + D | Delete the current block |
| Move Block Up | Ctrl + Shift + ↑ | ⌘ + ⇧ + ↑ | Move block one position up |
| Move Block Down | Ctrl + Shift + ↓ | ⌘ + ⇧ + ↓ | Move block one position down |
| Increase Indent | Ctrl + ] or Tab | ⌘ + ] or Tab | Increase block indentation |
| Decrease Indent | Ctrl + [ or Shift + Tab | ⌘ + [ or ⇧ + Tab | Decrease block indentation |

**Note:** For indent, both `Ctrl+]` and `Tab` are supported. For outdent, both `Ctrl+[` and `Shift+Tab` are supported.

### General Operations

These shortcuts cover general editor functionality:

| Action | Windows | Mac | Description |
|--------|---------|-----|-------------|
| Undo | Ctrl + Z | ⌘ + Z | Undo the last action |
| Redo | Ctrl + Y | ⌘ + Y | Redo the last undone action |
| Cut | Ctrl + X | ⌘ + X | Cut selected content |
| Copy | Ctrl + C | ⌘ + C | Copy selected content |
| Paste | Ctrl + V | ⌘ + V | Paste content from clipboard |
| Print | Ctrl + P | ⌘ + P | Print editor content |

### Customizing Shortcuts

You can customize keyboard shortcuts by configuring the `keyConfig` property when initializing the Block Editor control.

**Example:**
```typescript
const editor = new BlockEditor({
    keyConfig: {
        'bold': 'alt+b',
        'italic': 'alt+i',
        'underline': 'alt+u',
        'undo': 'ctrl+z',
        'redo': 'ctrl+y'
    }
});
```

**Custom Command Menu Shortcuts:**

You can also customize shortcuts for menu-based actions:

```typescript
commandMenuSettings: {
    commands: [
        {
            id: 'heading1',
            type: BlockType.Heading,
            label: 'Heading 1',
            shortcut: 'Ctrl+Shift+1'  // Custom shortcut
        }
    ]
}
```

## API Reference

### PasteCleanupSettings Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `deniedTags` | `string[]` | `[]` | HTML tags to be removed from pasted content |
| `keepFormat` | `boolean` | `true` | Whether to keep formatting of pasted content |
| `plainText` | `boolean` | `false` | Whether to paste as plain text |

### Undo/Redo Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `undoRedoStack` | `number` | `30` | Maximum size of the undo/redo stack |

### Keyboard Configuration

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `keyConfig` | `{ [key: string]: string }` | `null` | Custom keyboard shortcuts configuration |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `beforePasteCleanup` | `EmitType<BeforePasteCleanupEventArgs>` | Triggers before content is pasted |
| `afterPasteCleanup` | `EmitType<AfterPasteCleanupEventArgs>` | Triggers after content is pasted |

## Code Examples

### Complete Paste Cleanup Example

```typescript
import { BlockEditor, BeforePasteCleanupEventArgs, AfterPasteCleanupEventArgs } from '@syncfusion/ej2-blockeditor';

const blockEditor: BlockEditor = new BlockEditor({
    blocks: [
        {
            blockType: 'Heading',
            properties: { level: 1},
            content: [
                {
                    contentType: ContentType.Text,
                    content: 'Paste Cleanup Demo'
                }
            ]
        },
        {
            blockType: 'Paragraph',
            content: [
                {
                    contentType: ContentType.Text,
                    content: 'Try pasting formatted content from other sources.'
                }
            ]
        }
    ],
    
    pasteCleanupSettings: {
        deniedTags: ['script', 'iframe', 'embed', 'object', 'style'],
        keepFormat: true,
        plainText: false
    },
    
    beforePasteCleanup: (args: BeforePasteCleanupEventArgs) => {
        console.log('Before paste:', args.content.length, 'characters');
        
        // Validate content
        if (args.content.includes('<script>')) {
            args.cancel = true;
            alert('Script tags are not allowed!');
            return;
        }
        
        // Remove specific patterns
        args.content = args.content.replace(/<iframe[^>]*>/gi, '');
        args.content = args.content.replace(/on\w+="[^"]*"/gi, ''); // Remove event handlers
        
        displayMessage('Cleaning pasted content...');
    },
    
    afterPasteCleanup: (args: AfterPasteCleanupEventArgs) => {
        console.log('After paste:', args.content.length, 'characters');
        displayMessage(`Pasted ${args.content.length} characters successfully`);
        
        // Update statistics
        updateContentStats();
    }
});

blockEditor.appendTo('#blockeditor');

function displayMessage(message: string): void {
    const messageDiv = document.getElementById('message');
    if (messageDiv) {
        messageDiv.textContent = message;
    }
}

function updateContentStats(): void {
    const content = blockEditor.getDataAsHtml();
    const text = content.replace(/<[^>]*>/g, '');
    const wordCount = text.split(/\s+/).filter(w => w.length > 0).length;
    
    console.log('Word count:', wordCount);
}
```

### Complete Undo/Redo Configuration Example

```typescript
import { BlockEditor, BlockModel, ContentType, BlockChangedEventArgs } from "@syncfusion/ej2-blockeditor";

const blocksData: BlockModel[] = [
    {
        blockType: 'Heading',
        properties: { level: 1},
        content: [
            {
                contentType: ContentType.Text,
                content: 'Undo/Redo Demo'
            }
        ]
    },
    {
        blockType: 'Paragraph',
        content: [
            {
                contentType: ContentType.Text,
                content: 'Make changes to test undo/redo functionality.'
            }
        ]
    }
];

const blockEditor: BlockEditor = new BlockEditor({
    blocks: blocksData,
    undoRedoStack: 40,  // Store up to 40 actions
    
    blockChanged: (args: BlockChangedEventArgs) => {
        console.log('Block changed:', args.changes);
        updateUndoRedoButtons();
    }
});

blockEditor.appendTo('#blockeditor');

// Custom undo/redo buttons
document.getElementById('undoBtn')?.addEventListener('click', () => {
    triggerUndo();
});

document.getElementById('redoBtn')?.addEventListener('click', () => {
    triggerRedo();
});

function triggerUndo(): void {
    const undoEvent = new KeyboardEvent('keydown', {
        key: 'z',
        ctrlKey: true,
        bubbles: true
    });
    blockEditor.getRootElement().dispatchEvent(undoEvent);
}

function triggerRedo(): void {
    const redoEvent = new KeyboardEvent('keydown', {
        key: 'y',
        ctrlKey: true,
        bubbles: true
    });
    blockEditor.getRootElement().dispatchEvent(redoEvent);
}

function updateUndoRedoButtons(): void {
    // Update button states based on undo/redo availability
    console.log('Update undo/redo button states');
}
```

### Complete Keyboard Shortcuts Customization Example

```typescript
import { BlockEditor, BlockType } from '@syncfusion/ej2-blockeditor';

const blockEditor = new BlockEditor({
    blocks: [
        {
            blockType: 'Paragraph',
            content: [
                {
                    contentType: ContentType.Text,
                    content: 'Test custom keyboard shortcuts.'
                }
            ]
        }
    ],
    
    // Custom keyboard shortcuts
    keyConfig: {
        'bold': 'alt+b',
        'italic': 'alt+i',
        'underline': 'alt+u',
        'strikethrough': 'alt+s',
        'undo': 'ctrl+z',
        'redo': 'ctrl+y',
        'heading1': 'ctrl+1',
        'heading2': 'ctrl+2',
        'bulletlist': 'ctrl+8',
        'numberedlist': 'ctrl+9'
    },
    
    // Custom shortcuts in command menu
    commandMenuSettings: {
        commands: [
            {
                id: 'h1-cmd',
                type: BlockType.Heading,
                label: 'Heading 1',
                shortcut: 'Ctrl+1',
                iconCss: 'e-icons e-h1'
            },
            {
                id: 'h2-cmd',
                type: BlockType.Heading,
                label: 'Heading 2',
                shortcut: 'Ctrl+2',
                iconCss: 'e-icons e-h2'
            },
            {
                id: 'bullet-cmd',
                type: BlockType.BulletList,
                label: 'Bullet List',
                shortcut: 'Ctrl+8',
                iconCss: 'e-icons e-bullet-list'
            }
        ]
    }
});

blockEditor.appendTo('#blockeditor');

// Display keyboard shortcuts reference
function displayShortcuts(): void {
    const shortcuts = {
        'Formatting': {
            'Alt+B': 'Bold',
            'Alt+I': 'Italic',
            'Alt+U': 'Underline',
            'Alt+S': 'Strikethrough'
        },
        'Blocks': {
            'Ctrl+1': 'Heading 1',
            'Ctrl+2': 'Heading 2',
            'Ctrl+8': 'Bullet List',
            'Ctrl+9': 'Numbered List'
        },
        'Operations': {
            'Ctrl+Z': 'Undo',
            'Ctrl+Y': 'Redo',
            'Ctrl+C': 'Copy',
            'Ctrl+V': 'Paste'
        }
    };
    
    console.log('Available Keyboard Shortcuts:', shortcuts);
}

displayShortcuts();
```
---
