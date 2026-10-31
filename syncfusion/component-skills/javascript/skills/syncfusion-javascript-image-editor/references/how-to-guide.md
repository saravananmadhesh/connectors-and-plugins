# How-To Guide

## Table of Contents
- [Render in Dialog](#render-in-dialog)
- [Clear Image Before Reopening](#clear-image-before-reopening)
- [Reset to Original State](#reset-to-original-state)
- [Fit Image to Dimensions](#fit-image-to-dimensions)
- [Dialog State Management](#dialog-state-management)

## Render in Dialog

### Basic Dialog Setup

Render the Image Editor inside a modal dialog:

```typescript
import { ImageEditor } from '@syncfusion/ej2-image-editor';
import { Dialog } from '@syncfusion/ej2-popups';

// Create dialog
const dialog = new Dialog({
    isModal: true,
    width: '600px',
    height: '500px',
    closeOnEscape: true,
    visible: false,
    minHeight: '400px',
    content: document.getElementById('imageeditor')
});
dialog.appendTo('#profile-dialog');

// Create image editor inside dialog
const imageEditor = new ImageEditor({
    width: '100%',
    height: '100%'
});
imageEditor.appendTo('#imageeditor');

// Show dialog with image
const openBtn = document.getElementById('openBtn');
openBtn.onclick = () => {
    dialog.show();
    setTimeout(() => {
        imageEditor.open('url');
    }, 10);
};
```

### HTML Structure

```html
<div id="profile-dialog">
    <div id="imageeditor"></div>
</div>

<button id="openBtn">Open Image Editor</button>
```

### Dialog with Export Button

```typescript
const dialog = new Dialog({
    isModal: true,
    width: '600px',
    height: '500px',
    buttons: [
        {
            buttonModel: { content: 'Export', isPrimary: true },
            click: () => {
                // export() triggers a browser download — it returns void
                imageEditor.export('PNG', 'edited-image');
                dialog.close();
            }
        },
        {
            buttonModel: { content: 'Cancel' },
            click: () => {
                imageEditor.clearImage();
                dialog.close();
            }
        }
    ]
});
```

## Clear Image Before Reopening

### Clear Image Method

Use `clearImage()` to reset editor before reopening dialog:

```typescript
import { ImageEditor } from '@syncfusion/ej2-image-editor';
import { Dialog } from '@syncfusion/ej2-popups';

const imageEditor = new ImageEditor({
    width: '550px',
    height: '330px'
});

const dialog = new Dialog({
    isModal: true,
    visible: false
});
dialog.appendTo('#profile-dialog');

// Close handler
dialog.beforeClose = () => {
    // Clear image before closing
    imageEditor.clearImage();
};

// Open handler
const openBtn = document.getElementById('openBtn');
openBtn.onclick = () => {
    // Ensure clean state
    imageEditor.clearImage();
    dialog.show();
    
    setTimeout(() => {
        imageEditor.open('url');
    }, 10);
};
```

### Why Clear Before Reopening

**Problem:** Image editor retains previous image when dialog reopens
**Solution:** Call `clearImage()` to ensure fresh start

```typescript
// BAD: Dialog remembers old image
dialog.show();
imageEditor.open('url');  // Old image still there!

// GOOD: Clear first
dialog.show();
imageEditor.clearImage();
imageEditor.open('url');  // Clean slate
```

## Reset to Original State

### Reset Method

Revert all changes to original image:

```typescript
// Undo all modifications and return to original
imageEditor.reset();

// This reverts:
// - All annotations
// - All filters and effects
// - All transformations (rotate, flip, crop)
// - Image returns to opened state
```

### Reset Button

```typescript
const resetBtn = document.getElementById('resetBtn');
resetBtn.onclick = () => {
    if (confirm('Reset all changes to original image?')) {
        imageEditor.reset();
    }
};
```

### Compare Before/After

```typescript
function setupBeforeAfterComparison() {
    let isOriginal = false;
    const compareBtn = document.getElementById('compareBtn');
    
    compareBtn.onclick = () => {
        if (isOriginal) {
            // Show edited version
            // (would require saving state before reset)
            console.log('Show edited version');
        } else {
            // Show original
            imageEditor.reset();
        }
        isOriginal = !isOriginal;
        compareBtn.textContent = isOriginal ? 'Show Edited' : 'Show Original';
    };
}
```

## Fit Image to Dimensions

### Fit to Width

Scale image to match editor width using the host container dimensions:

```typescript
function fitToWidth(imageEditor: ImageEditor) {
    imageEditor.zoom(1);  // Reset to 100% first

    const container = document.getElementById('imageeditor');
    const containerWidth = container.clientWidth;
    const dimension = imageEditor.getImageDimension();

    if (dimension.width > 0) {
        const zoomFactor = containerWidth / dimension.width;
        imageEditor.zoom(Math.max(0.1, zoomFactor));
    }
}

document.getElementById('fitWidthBtn').onclick = () => fitToWidth(imageEditor);
```

### Fit to Height

Scale image to match editor height:

```typescript
function fitToHeight(imageEditor: ImageEditor) {
    imageEditor.zoom(1);  // Reset first

    const container = document.getElementById('imageeditor');
    const containerHeight = container.clientHeight;
    const dimension = imageEditor.getImageDimension();

    if (dimension.height > 0) {
        const zoomFactor = containerHeight / dimension.height;
        imageEditor.zoom(Math.max(0.1, zoomFactor));
    }
}

document.getElementById('fitHeightBtn').onclick = () => fitToHeight(imageEditor);
```

### Fit to Container

```typescript
function fitToContainer(imageEditor: ImageEditor) {
    imageEditor.zoom(1);  // Reset first

    const container = document.getElementById('imageeditor');
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    const dimension = imageEditor.getImageDimension();

    if (dimension.width > 0 && dimension.height > 0) {
        const zoomWidth = containerWidth / dimension.width;
        const zoomHeight = containerHeight / dimension.height;
        const zoom = Math.min(zoomWidth, zoomHeight);
        imageEditor.zoom(Math.max(0.1, zoom));
    }
}

document.getElementById('fitContainerBtn').onclick = () => fitToContainer(imageEditor);
```

## Dialog State Management

### Manage State Around Dialog Lifecycle

```typescript
import { ImageEditor } from '@syncfusion/ej2-image-editor';
import { Dialog } from '@syncfusion/ej2-popups';

const imageEditor = new ImageEditor({ width: '100%', height: '100%' });
imageEditor.appendTo('#imageeditor');

const dialog = new Dialog({
    isModal: true,
    width: '600px',
    height: '500px',
    visible: false
});
dialog.appendTo('#profile-dialog');

// Before closing — clear the image
dialog.beforeClose = () => {
    imageEditor.clearImage();
};

// Opening — clear, show, then open image
document.getElementById('openBtn').onclick = () => {
    imageEditor.clearImage();
    dialog.show();
    setTimeout(() => {
        imageEditor.open('url');
    }, 10);
};
```

### Multiple Editor Instances

```typescript
class MultiDialogManager {
    private editors: Map<string, ImageEditor> = new Map();
    private dialogs: Map<string, Dialog> = new Map();
    
    createEditorDialog(id: string, title: string) {
        // Create dialog
        const dialog = new Dialog({
            isModal: true,
            width: '600px',
            height: '500px',
            title: title,
            visible: false
        });
        dialog.appendTo(`#${id}-dialog`);
        
        // Create editor
        const editor = new ImageEditor({
            width: '100%',
            height: '100%'
        });
        editor.appendTo(`#${id}`);
        
        this.editors.set(id, editor);
        this.dialogs.set(id, dialog);
    }
    
    openEditor(id: string, imageUrl: string) {
        const dialog = this.dialogs.get(id);
        const editor = this.editors.get(id);
        
        if (dialog && editor) {
            editor.clearImage();
            dialog.show();
            editor.open(imageUrl);
        }
    }
    
    closeEditor(id: string) {
        const dialog = this.dialogs.get(id);
        const editor = this.editors.get(id);
        
        if (dialog && editor) {
            editor.clearImage();
            dialog.close();
        }
    }
}

// Usage
const manager = new MultiDialogManager();
manager.createEditorDialog('editor1', 'Edit Profile Photo');
manager.createEditorDialog('editor2', 'Edit Cover Photo');

document.getElementById('editProfileBtn').onclick = () => {
    manager.openEditor('editor1', 'profile.jpg');
};

document.getElementById('editCoverBtn').onclick = () => {
    manager.openEditor('editor2', 'cover.jpg');
};
```

### Dialog with Confirmation Before Close

```typescript
import { ImageEditor } from '@syncfusion/ej2-image-editor';
import { Dialog } from '@syncfusion/ej2-popups';

let hasEdits = false;

const imageEditor = new ImageEditor({
    width: '100%',
    height: '100%',
    editComplete: () => {
        hasEdits = true;  // Track unsaved edits via editComplete event
    }
});
imageEditor.appendTo('#imageeditor');

const dialog = new Dialog({
    isModal: true,
    beforeClose: (args) => {
        if (hasEdits) {
            args.cancel = true;

            if (confirm('You have unsaved changes. Close anyway?')) {
                hasEdits = false;
                imageEditor.clearImage();
                dialog.hide();
            }
        } else {
            imageEditor.clearImage();
        }
    }
});
dialog.appendTo('#profile-dialog');
```

### Dialog Lifecycle Pattern

```typescript
import { ImageEditor } from '@syncfusion/ej2-image-editor';
import { Dialog } from '@syncfusion/ej2-popups';

class DialogLifecycle {
    constructor(private imageEditor: ImageEditor, private dialog: Dialog) {
        this.setupHandlers();
    }

    setupHandlers() {
        this.dialog.open = () => {
            console.log('Dialog opened — editor ready');
        };

        this.dialog.beforeClose = () => {
            // Clear editor state before dialog hides
            this.imageEditor.clearImage();
        };

        this.dialog.close = () => {
            console.log('Dialog closed');
        };
    }
}
```

