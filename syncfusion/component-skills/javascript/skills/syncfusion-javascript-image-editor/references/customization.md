# Customization

## Table of Contents
- [Toolbar Customization](#toolbar-customization)
- [Quick Access Configuration](#quick-access-configuration)
- [Theme Styling](#theme-styling)
- [Event Handlers](#event-handlers)
- [Configuration Options](#configuration-options)

## Toolbar Customization

### Toolbar Items

Control which tools appear in the toolbar:

```typescript
import { ImageEditor } from '@syncfusion/ej2-image-editor';

const imageEditor = new ImageEditor({
    toolbar: [
        'Open',              // File open
        'Save',              // File save
        'ZoomIn',            // Zoom in
        'ZoomOut',           // Zoom out
        'ZoomReset',         // Reset zoom to 100%
        'FitToWidth',        // Fit image to width
        'FitToHeight',       // Fit image to height
        'Crop',              // Crop tool
        'Rotate',            // Rotate options
        'Flip',              // Flip options
        'Undo',              // Undo action
        'Redo',              // Redo action
        'Reset',             // Reset to original
        'Annotation',        // Text annotation
        'ShapeAnnotation',   // Shape tools
        'FreehandDraw',      // Freehand drawing
        'Redact',            // Redaction tool
        'Frame',             // Frame insertion
        'Filter',            // Filter effects
        'FineTune'           // Fine-tuning adjustments
    ]
});

imageEditor.appendTo('#imageeditor');
```

### Minimal Toolbar

```typescript
// Simplified toolbar for basic editing
const imageEditor = new ImageEditor({
    toolbar: ['Open', 'Crop', 'Rotate', 'Save', 'Undo', 'Redo']
});
```

### Hide Toolbar Entirely

```typescript
const imageEditor = new ImageEditor({
    toolbar: []  // Empty array hides toolbar
});
```

### Custom Toolbar with Separator

```typescript
const imageEditor = new ImageEditor({
    toolbar: [
        'Open', 'Save',
        '|',                 // Separator/divider
        'Crop', 'Rotate',
        '|',
        'Annotation', 'FreehandDraw',
        '|',
        'Filter', 'FineTune'
    ]
});
```

### Toolbar Template

Provide a custom template function to render a custom toolbar:

```typescript
const imageEditor = new ImageEditor({
    toolbarTemplate: '#toolbarTemplate'  // ID of a script template element
});
```

## Quick Access Configuration

### Show Quick Access Toolbar

```typescript
const imageEditor = new ImageEditor({
    width: '550px',
    height: '330px',
    showQuickAccessToolbar: true   // Show quick access toolbar (default: true)
});
```

### Quick Access Toolbar Events

```typescript
import { ImageEditor, QuickAccessToolbarEventArgs } from '@syncfusion/ej2-image-editor';

const imageEditor = new ImageEditor({
    quickAccessToolbarOpen: (args: QuickAccessToolbarEventArgs) => {
        console.log('Quick access toolbar opened');
    },
    quickAccessToolbarItemClick: (args) => {
        console.log('Quick access item clicked', args);
    }
});
```

### Quick Access Toolbar Template

```typescript
const imageEditor = new ImageEditor({
    quickAccessToolbarTemplate: '#qaTemplate'  // Custom template ID
});
```

## Theme Styling

### Built-in Themes

```typescript
const imageEditor = new ImageEditor({
    theme: 'material'      // Material theme (default)
});

// Available themes:
// - material / material-dark
// - bootstrap5 / bootstrap5-dark
// - bootstrap4 / bootstrap4-dark
// - fabric / fabric-dark
// - tailwind / tailwind-dark
// - fluent / fluent-dark
```

### CSS Theme Import

```css
/* Import theme CSS */
@import "@syncfusion/ej2-image-editor/styles/material.css";

/* Dark theme variant */
@import "@syncfusion/ej2-image-editor/styles/material-dark.css";
```

### CSS Variables

Customize theme using CSS variables:

```css
:root {
    /* Primary colors */
    --primary-color: #0078d4;
    --primary-hover: #005a9e;
    
    /* Background colors */
    --background-color: #ffffff;
    --surface-color: #f3f2f1;
    
    /* Text colors */
    --text-color: #323130;
    --text-secondary: #605e5c;
    
    /* Border and shadows */
    --border-color: #e1dfdd;
    --shadow: 0 1px 3px rgba(0,0,0,0.12);
}

.e-image-editor {
    --primary-color: var(--primary-color);
    --background-color: var(--background-color);
}
```

### Custom Theme

```typescript
// Create custom theme stylesheet
const customTheme = `
    .e-image-editor .e-toolbar {
        background: linear-gradient(to right, #667eea 0%, #764ba2 100%);
    }
    
    .e-image-editor .e-toolbar-item {
        color: white;
    }
    
    .e-image-editor .e-toolbar-item:hover {
        background: rgba(255, 255, 255, 0.2);
    }
    
    .e-image-editor .e-toolbar-item.e-active {
        background: rgba(0, 0, 0, 0.3);
    }
`;

const style = document.createElement('style');
style.textContent = customTheme;
document.head.appendChild(style);
```

### Theme Studio

Create custom themes using Syncfusion Theme Studio:

```
https://ej2.syncfusion.com/themestudio/
```

## Event Handlers

### Creation Events

```typescript
const imageEditor = new ImageEditor({
    created: () => {
        console.log('Image Editor initialized');
        // Load default image
        imageEditor.open('url');
    },
    
    destroyed: () => {
        console.log('Image Editor destroyed');
        // Cleanup resources
    }
});
```

### Image Events

```typescript
import { ImageEditor, OpenEventArgs } from '@syncfusion/ej2-image-editor';

const imageEditor = new ImageEditor({
    fileOpened: (args: OpenEventArgs) => {
        console.log('Image loaded and ready');
        const dimension = imageEditor.getImageDimension();
        console.log(`Image size: ${dimension.width}x${dimension.height}`);
    }
});
```

### Save Events

```typescript
const imageEditor = new ImageEditor({
    beforeSave: (args) => {
        console.log('Before save', args);
        // Validate before saving
        // Prevent default save if needed
        // args.cancel = true;
    },
    
    saved: (args) => {
        console.log('After save', args);
    }
});
```

### Shape Events

```typescript
import { ImageEditor, ShapeChangeEventArgs, ShapeChangingEventArgs } from '@syncfusion/ej2-image-editor';

const imageEditor = new ImageEditor({
    shapeChanging: (args: ShapeChangingEventArgs) => {
        console.log('Shape changing (before):', args.currentShapeSettings);
    },

    shapeChange: (args: ShapeChangeEventArgs) => {
        console.log('Shape change (after):', args.currentShapeSettings);
    }
});
```

### Selection Events

```typescript
import { ImageEditor, SelectionChangeEventArgs } from '@syncfusion/ej2-image-editor';

const imageEditor = new ImageEditor({
    selectionChanging: (args: SelectionChangeEventArgs) => {
        console.log('Selection changing:', args);
    }
});
```

## Configuration Options

### Size Configuration

```typescript
const imageEditor = new ImageEditor({
    width: '600px',        // Fixed width
    height: '400px',       // Fixed height
    
    // OR use percentages
    width: '100%',
    height: '80vh'
});
```

### Interaction Configuration

```typescript
const imageEditor = new ImageEditor({
    disabled: false,        // Enable/disable the editor (default: false)
    cssClass: 'custom-cls' // Additional CSS class for styling
});
```

### Localization

```typescript
import { L10n } from '@syncfusion/ej2-base';

// Register translations
L10n.load({
    'en-US': {
        'image-editor': {
            'open': 'Open Image',
            'save': 'Save Image',
            'crop': 'Crop',
            'rotate': 'Rotate'
        }
    }
});

const imageEditor = new ImageEditor({
    locale: 'en-US'
});
```

### Background Color

```typescript
const imageEditor = new ImageEditor({
    // Set the editor background color
    backgroundColor: '#f0f0f0'
});
```

## Common Patterns

### Pattern: Minimal Editor with Essential Tools

```typescript
import { ImageEditor } from '@syncfusion/ej2-image-editor';

const imageEditor = new ImageEditor({
    width: '100%',
    height: '500px',
    toolbar: ['Open', 'Crop', 'Rotate', 'Undo', 'Redo', 'Reset'],
    created: () => {
        console.log('Image Editor initialized');
    }
});

imageEditor.appendTo('#imageeditor');
```

### Pattern: Editor with All Tools

```typescript
const imageEditor = new ImageEditor({
    width: '100%',
    height: '600px',
    toolbar: [
        'Open', 'Undo', 'Redo', 'Reset',
        '|', 'ZoomIn', 'ZoomOut',
        '|', 'Crop', 'Rotate', 'Flip',
        '|', 'Annotate', 'Redact',
        '|', 'Filter', 'Finetune',
        '|', 'Frame'
    ],
    showQuickAccessToolbar: true
});

imageEditor.appendTo('#imageeditor');
```

### Pattern: Handle Toolbar Events

```typescript
import { ImageEditor, ToolbarEventArgs } from '@syncfusion/ej2-image-editor';

const imageEditor = new ImageEditor({
    toolbarCreated: (args: ToolbarEventArgs) => {
        console.log('Toolbar created', args);
    },
    toolbarUpdating: (args: ToolbarEventArgs) => {
        // Customize toolbar items before rendering
        console.log('Toolbar updating', args);
    },
    toolbarItemClicked: (args) => {
        console.log('Toolbar item clicked', args);
    }
});
```

