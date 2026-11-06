# Undo and Redo

## Table of Contents
- [Keyboard Shortcuts](#keyboard-shortcuts)
- [Undo/Redo Methods](#undoredo-methods)
- [History Management](#history-management)
- [Common Patterns](#common-patterns)

## Keyboard Shortcuts

### Standard Shortcuts

Users can undo and redo using keyboard:

```
Ctrl + Z  : Undo last action
Ctrl + Y  : Redo last undone action
```

### Supported Operations

The undo/redo history tracks all modifications:

- Image opening/loading
- Zooming operations
- Rotation and flipping
- Cropping actions
- Resizing operations
- Annotations (text, shapes, freehand)
- Filters and fine-tuning adjustments
- Layer operations (z-order changes)
- Redaction actions
- Straightening adjustments

## Undo/Redo Methods

### Undo Last Action

```typescript
import { ImageEditor } from '@syncfusion/ej2-image-editor';

const imageEditor = new ImageEditor({ width: '550px', height: '330px' });
imageEditor.appendTo('#imageeditor');

// Undo last action programmatically
imageEditor.undo();

// Multiple undos in sequence
imageEditor.undo();
imageEditor.undo();
imageEditor.undo();
```

### Redo Last Undone Action

```typescript
// Redo last undone action
imageEditor.redo();

// Multiple redos
imageEditor.redo();
imageEditor.redo();
```

### Undo Specific Count

```typescript
// Undo multiple times (approach: call multiple times)
for (let i = 0; i < 5; i++) {
    imageEditor.undo();
}
```

### Check Undo/Redo Available

```typescript
// Check if undo is available
if (imageEditor.canUndo()) {
    imageEditor.undo();
}

// Check if redo is available
if (imageEditor.canRedo()) {
    imageEditor.redo();
}
```

## History Management

### Check Undo/Redo Availability

Use `canUndo()` and `canRedo()` to determine whether history actions are available:

```typescript
// Check if undo is available
if (imageEditor.canUndo()) {
    console.log('There are actions to undo');
}

// Check if redo is available
if (imageEditor.canRedo()) {
    console.log('There are actions to redo');
}
```

### Action Tracking via Events

The `editComplete` event fires after each edit operation, useful for tracking state changes:

```typescript
import { ImageEditor, EditCompleteEventArgs } from '@syncfusion/ej2-image-editor';

imageEditor.addEventListener('editComplete', (args: EditCompleteEventArgs) => {
    // Update UI buttons based on current history state
    const undoBtn = document.getElementById('undoBtn') as HTMLButtonElement;
    const redoBtn = document.getElementById('redoBtn') as HTMLButtonElement;

    if (undoBtn) undoBtn.disabled = !imageEditor.canUndo();
    if (redoBtn) redoBtn.disabled = !imageEditor.canRedo();
});
```

### Reset All Changes

Use `reset()` to revert the image to its original state (clears all history):

```typescript
// Reset entire editing session to original image
imageEditor.reset();
```

## Toolbar Integration

### Enable Undo/Redo Buttons

```typescript
const imageEditor = new ImageEditor({
    toolbar: ['Undo', 'Redo'],
    // Users see Undo/Redo buttons
});
```

### Button Enabling/Disabling

```typescript
// Buttons automatically enable/disable based on history state
// Undo button: enabled if actions available to undo
// Redo button: enabled if actions available to redo
```

### Full History Toolbar

```typescript
const imageEditor = new ImageEditor({
    toolbar: [
        'Open', 'Save',
        'ZoomIn', 'ZoomOut',
        'Crop', 'Rotate', 'Flip',
        'Undo', 'Redo', 'Reset',
        'Annotation',
        'Filter'
    ]
});
```

## Common Patterns

### Pattern: Undo/Redo with UI Buttons

```typescript
function setupUndoRedoButtons(imageEditor: ImageEditor) {
    const undoBtn = document.getElementById('undoBtn') as HTMLButtonElement;
    const redoBtn = document.getElementById('redoBtn') as HTMLButtonElement;
    
    undoBtn.onclick = () => {
        if (imageEditor.canUndo()) {
            imageEditor.undo();
            updateButtonStates();
        }
    };
    
    redoBtn.onclick = () => {
        if (imageEditor.canRedo()) {
            imageEditor.redo();
            updateButtonStates();
        }
    };
    
    function updateButtonStates() {
        undoBtn.disabled = !imageEditor.canUndo();
        redoBtn.disabled = !imageEditor.canRedo();
    }
    
    // Initial state
    updateButtonStates();
}
```

### Pattern: Track Undo/Redo State via Events

```typescript
import { ImageEditor, EditCompleteEventArgs } from '@syncfusion/ej2-image-editor';

function setupUndoRedoTracking(imageEditor: ImageEditor) {
    function updateButtonStates() {
        const undoBtn = document.getElementById('undoBtn') as HTMLButtonElement;
        const redoBtn = document.getElementById('redoBtn') as HTMLButtonElement;
        if (undoBtn) undoBtn.disabled = !imageEditor.canUndo();
        if (redoBtn) redoBtn.disabled = !imageEditor.canRedo();
    }

    // Update after each completed edit
    imageEditor.addEventListener('editComplete', (args: EditCompleteEventArgs) => {
        updateButtonStates();
    });

    // Initial state
    updateButtonStates();
}
```

### Pattern: Revert to Original

```typescript
function revertToOriginal(imageEditor: ImageEditor) {
    // reset() restores original image and clears all edit history
    imageEditor.reset();
}

document.getElementById('revertBtn').onclick = () => {
    if (confirm('Revert all changes to original?')) {
        revertToOriginal(imageEditor);
    }
};
```

### Pattern: Sequential Undo with Condition

```typescript
function undoMultiple(imageEditor: ImageEditor, count: number) {
    for (let i = 0; i < count; i++) {
        if (imageEditor.canUndo()) {
            imageEditor.undo();
        } else {
            break;
        }
    }
}

// Undo the last 3 operations
undoMultiple(imageEditor, 3);
```

### Pattern: Undo/Redo Keyboard Shortcut Handler

```typescript
function setupKeyboardShortcuts(imageEditor: ImageEditor) {
    document.addEventListener('keydown', (e: KeyboardEvent) => {
        const isCtrl = e.ctrlKey || e.metaKey;

        if (isCtrl && e.key === 'z') {
            e.preventDefault();
            if (imageEditor.canUndo()) {
                imageEditor.undo();
            }
        }

        if (isCtrl && e.key === 'y') {
            e.preventDefault();
            if (imageEditor.canRedo()) {
                imageEditor.redo();
            }
        }
    });
}
```

