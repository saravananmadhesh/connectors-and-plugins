---
name: syncfusion-javascript-image-editor
description: Implement the Syncfusion TypeScript Image Editor control for image editing, annotation, and manipulation. Use this when the user needs to add image editing capabilities, work with filters, transformations, cropping, or drawing features in TypeScript applications. Covers setup, image operations, annotations, filters, accessibility, and customization patterns.
metadata:
  author: "Syncfusion Inc"
  version: "34.1.29"
  category: "File Viewers & Editors"
---

# Implementing Syncfusion TypeScript Image Editor

A comprehensive skill for implementing the Syncfusion Image Editor control in TypeScript applications. This skill covers initialization, image loading/saving, annotation tools, image manipulation (zoom, crop, rotate, transform), filtering, fine-tuning, accessibility, and customization patterns.

## Overview

The Syncfusion Image Editor is a powerful, feature-rich component for professional image editing in web applications. Key capabilities include:

- **Image Operations** - Open, save, export in JPEG, PNG, SVG, WebP, BMP formats
- **Zoom & Pan** - Multiple zoom methods (toolbar, mouse wheel, pinch, keyboard)
- **Transformations** - Crop, rotate, flip, straighten, resize with preview
- **Annotations** - Text, freehand drawing, shapes (rectangles, circles, arrows, lines), redaction, frames
- **Filters & Effects** - 20+ filter effects plus fine-tuning controls
- **Layer Management** - Z-order operations, multiple annotations
- **History** - Full undo/redo support with action tracking
- **Accessibility** - WCAG 2.2 compliant, keyboard navigation, screen reader support
- **Customization** - Toolbar, themes, event handlers, quick access
- **TypeScript Support** - Full type definitions and webpack configuration

## Documentation and Navigation Guide

### Getting Started
📄 **Read:** [references/getting-started.md](references/getting-started.md)
- TypeScript project setup with webpack
- NPM package installation (@syncfusion/ej2-image-editor)
- Dependency management
- CSS theme imports and configuration
- Basic component initialization
- HTML markup setup

### Core Operations
📄 **Read:** [references/core-operations.md](references/core-operations.md)
- Opening and loading images programmatically
- Supported file formats (JPEG, PNG, SVG, WebP, BMP)
- Saving and exporting images
- File input validation and restrictions
- File type constraints and size limits
- Download vs. save operations

### Image Manipulation
📄 **Read:** [references/image-manipulation.md](references/image-manipulation.md)
- Zooming methods (toolbar, mouse wheel, pinch, keyboard, fit-to-width/height)
- Panning and image movement
- Image resizing and scaling operations
- Image rotation and flip operations
- Straightening with sliders
- Image dimension queries
- Canvas and viewport management

### Annotation Tools
📄 **Read:** [references/annotation-tools.md](references/annotation-tools.md)
- Text annotations with font customization (family, size, style, color)
- Freehand drawing tools and brush settings
- Shape annotations (rectangles, ellipses, arrows, lines, paths)
- Redaction capabilities and masking
- Frame insertion and styling
- Annotation styling (fill color, stroke color, stroke width)
- Annotation positioning and transformation

### Selection and Cropping
📄 **Read:** [references/selection-cropping.md](references/selection-cropping.md)
- Selection types (custom, circle, square, ratio-based)
- Cropping workflow and execution
- Aspect ratio constraints and custom ratios
- Selection manipulation and repositioning
- Crop finalization and preview
- Region management

### Filters and Effects
📄 **Read:** [references/filters-effects.md](references/filters-effects.md)
- Applying filter effects programmatically
- Fine-tuning adjustments (20+ effect types)
- Brightness, contrast, saturation controls
- Blur, sharpen, hue, saturation effects
- Image processing capabilities
- Effect preview and application

### Undo and Redo
📄 **Read:** [references/undo-redo.md](references/undo-redo.md)
- Undo/redo keyboard shortcuts (Ctrl+Z, Ctrl+Y)
- Undo/redo method calls
- Operation history tracking
- History state management
- Action reversal patterns

### Layer Management
📄 **Read:** [references/layer-management.md](references/layer-management.md)
- Z-order operations and layer stacking
- Bringing layers forward/backward
- Layer arrangement and management
- Working with multiple annotations
- Overlap management

### Accessibility
📄 **Read:** [references/accessibility.md](references/accessibility.md)
- Complete keyboard shortcut reference (Ctrl+Z, Ctrl+Y, Ctrl+S, Delete, Escape, etc.)
- WCAG 2.2, Section 508, ADA compliance
- Screen reader support and ARIA attributes
- Right-to-Left (RTL) support
- Keyboard navigation patterns
- Color contrast and accessibility best practices
- Mobile device support

### Customization
📄 **Read:** [references/customization.md](references/customization.md)
- Toolbar configuration and customization
- Quick access toolbar setup
- Theme styling and CSS customization
- Theme Studio integration
- CSS variables and custom themes
- Event binding and callbacks
- Configuration options reference

### Localization
📄 **Read:** [references/localization.md](references/localization.md)
- Multi-language support setup
- Language-specific configurations
- Locale settings and resource strings
- RTL (Right-to-Left) support configuration
- Region-specific customizations

### How-To Guide
📄 **Read:** [references/how-to-guide.md](references/how-to-guide.md)
- Rendering image editor in dialog/modal windows
- Clearing image before reopening dialogs
- Resetting images to original state
- Fitting images to editor width or height
- Dialog state management
- Common integration patterns

### Advanced Patterns
📄 **Read:** [references/advanced-patterns.md](references/advanced-patterns.md)
- Event handling patterns and event system
- Custom workflow examples
- Complex integration scenarios
- Performance optimization tips
- TypeScript type definitions and interfaces
- Memory management

### API Reference
📄 **Read:** [references/api.md](references/api.md)
- Complete list of all public properties with types and defaults
- Full method signatures with parameter descriptions and return types
- All events with their event-arg interfaces
- Key model interfaces (ZoomSettingsModel, FinetuneSettingsModel, SelectionSettingsModel, UploadSettingsModel)
- Key event-arg interfaces (ShapeSettings, RedactSettings, ShapeChangeEventArgs, EditCompleteEventArgs, etc.)
- Quick usage examples for initialization, crop, drawText, finetuneImage

## Quick Start

### Installation

```bash
npm install @syncfusion/ej2-image-editor
```

> **Security:** After installing, run `npm audit` or verify the package via [Socket.dev](https://socket.dev) to confirm the supply-chain integrity of `@syncfusion/ej2-image-editor` before deploying to production.

### Basic Initialization

```typescript
import { ImageEditor } from '@syncfusion/ej2-image-editor';

// Create a new instance
const imageEditor = new ImageEditor({
    width: '550px',
    height: '330px',
    toolbar: ['Open', 'Save', 'ZoomIn', 'ZoomOut', 'Crop', 'Rotate', 'Flip']
});

// Append to a container
imageEditor.appendTo('#imageeditor');

// Open an image — replace with a validated, trusted URL; never use URLs from third-party responses directly
imageEditor.open('url');
```

### HTML Setup

```html
<div id="imageeditor"></div>
```

### CSS Themes

```css
@import "@syncfusion/ej2-image-editor/styles/material.css";
```

## Common Patterns

### Pattern 1: Basic Image Editor with Full Toolbar

```typescript
import { ImageEditor } from '@syncfusion/ej2-image-editor';

const imageEditor = new ImageEditor({
    width: '600px',
    height: '400px',
    toolbar: ['Open', 'Save', 'ZoomIn', 'ZoomOut', 'Crop', 
              'Rotate', 'Flip', 'Undo', 'Redo', 'Reset'],
    created: () => {
        // Replace 'url' with a validated, trusted image URL or local asset path
        imageEditor.open('url');
    }
});

imageEditor.appendTo('#imageeditor');
```

### Pattern 2: Adding Text Annotation

```typescript
const dimension = imageEditor.getImageDimension();
imageEditor.drawText(
    dimension.x + 50, 
    dimension.y + 50, 
    'Annotation Text',
    'Arial',      // font family
    30,           // font size
    false,        // bold
    false,        // italic
    'blue',       // text color
    false,        // selected
    null,         // rotation
    '#FFFFCC',    // fill color
    'black'       // stroke color
);
```

### Pattern 3: Applying Filters

```typescript
import { ImageEditor, ImageFilterOption } from '@syncfusion/ej2-image-editor';

// Apply brightness adjustment
imageEditor.finetuneImage('brightness', 30);

// Apply blur filter
imageEditor.applyImageFilter(ImageFilterOption.Blur);

// Apply multiple fine-tune effects
imageEditor.finetuneImage('contrast', 20);
imageEditor.finetuneImage('saturation', 15);
```

### Pattern 4: Cropping an Image

```typescript
const dimension = imageEditor.getImageDimension();

// Step 1: Programmatically select a crop region
imageEditor.select('Custom', dimension.x, dimension.y, 500, 300);

// Step 2: Apply the crop
imageEditor.crop();
```

### Pattern 5: Dialog Integration

```typescript
import { Dialog } from '@syncfusion/ej2-popups';

const dialog = new Dialog({
    width: '600px',
    height: '450px',
    isModal: true,
    visible: false
});
dialog.appendTo('#dialog');

const imageEditor = new ImageEditor({
    width: '100%',
    height: '100%'
});
imageEditor.appendTo('#imageeditor');

document.getElementById('openBtn').onclick = () => {
    dialog.show();
    // Replace 'url' with a validated, trusted image URL
    imageEditor.open('url');
};
```

## Key APIs

### Essential Methods

| Method | Purpose |
|--------|---------|
| `open(fileOrUrl)` | Load an image from URL, File, or ImageData — **always validate or sanitize URL inputs against a trusted allowlist in production; never pass URLs derived from third-party content to prevent SSRF and indirect injection** |
| `export(type?, fileName?, imageQuality?)` | Export/download image in specified format |
| `crop()` | Execute crop based on current selection |
| `select(type, startX?, startY?, width?, height?)` | Set crop selection area |
| `rotate(degree)` | Rotate image (positive = clockwise, negative = anti-clockwise) |
| `flip(direction)` | Flip image horizontally or vertically |
| `zoom(zoomFactor, zoomPoint?)` | Zoom in/out to a factor and optional point |
| `pan(value, x?, y?)` | Enable/disable panning or pan to x/y |
| `resize(width, height, isAspectRatio?)` | Resize image dimensions |
| `straightenImage(degree)` | Straighten image by small rotation angle |
| `drawText(x?, y?, text?, ...)` | Add text annotation |
| `drawRectangle(x?, y?, width?, height?, ...)` | Draw rectangle annotation |
| `drawEllipse(x?, y?, radiusX?, radiusY?, ...)` | Draw ellipse annotation |
| `drawArrow(startX?, startY?, endX?, endY?, ...)` | Draw arrow annotation |
| `drawLine(startX?, startY?, endX?, endY?, ...)` | Draw line annotation |
| `drawPath(pointColl, ...)` | Draw path/freehand annotation |
| `drawImage(data, x?, y?, width?, height?, ...)` | Draw image annotation |
| `drawFrame(frameType, ...)` | Draw decorative frame around image |
| `drawRedact(type?, x?, y?, width?, height?, value?)` | Draw blur/pixelate redaction |
| `freehandDraw(value)` | Enable/disable freehand drawing mode |
| `applyImageFilter(filterOption)` | Apply a predefined image filter |
| `finetuneImage(finetuneOption, value)` | Apply fine-tuning adjustment |
| `getShapeSettings()` | Get all drawn shapes |
| `getShapeSetting(id)` | Get single shape by id |
| `selectShape(id)` | Select a shape by id |
| `updateShape(setting, isSelected?)` | Update an existing shape |
| `deleteShape(id)` | Delete a shape by id |
| `cloneShape(shapeId)` | Duplicate a shape by id |
| `bringToFront(shapeId)` | Move shape to front |
| `sendToBack(shapeId)` | Move shape to back |
| `bringForward(shapeId)` | Move shape forward one position |
| `sendBackward(shapeId)` | Move shape backward one position |
| `getRedacts()` | Get all redaction shapes |
| `selectRedact(id)` | Select a redaction by id |
| `updateRedact(setting, isSelected?)` | Update a redaction |
| `deleteRedact(id)` | Delete a redaction by id |
| `undo()` | Undo last action |
| `redo()` | Redo last undone action |
| `canUndo()` | Returns true if undo is available |
| `canRedo()` | Returns true if redo is available |
| `reset()` | Reset image to original state |
| `clearImage()` | Clear the loaded image |
| `clearSelection(resetCrop?)` | Clear current selection |
| `getImageDimension()` | Get current image x, y, width, height |
| `getImageData()` | Get canvas image as ImageData |
| `apply()` | Apply pending annotation drawings |
| `discard()` | Discard unapplied annotation changes |
| `enableShapeDrawing(shapeType, isEnabled?)` | Enable/disable shape drawing |
| `enableTextEditing()` | Enter text-edit mode on a text annotation |

### Key Properties

| Property | Type | Default | Purpose |
|----------|------|---------|---------|
| `width` | `string` | `'100%'` | Editor container width |
| `height` | `string` | `'100%'` | Editor container height |
| `toolbar` | `(string \| ItemModel)[]` | `null` | Toolbar items; `null` = default toolbar, `[]` = no toolbar |
| `toolbarTemplate` | `string \| Function` | `null` | Fully custom toolbar template (overrides `toolbar`) |
| `quickAccessToolbarTemplate` | `string \| Function` | `null` | Template for quick access toolbar |
| `showQuickAccessToolbar` | `boolean` | `true` | Show/hide quick access toolbar |
| `theme` | `string \| Theme` | `Theme.Bootstrap5` | UI appearance theme |
| `allowUndoRedo` | `boolean` | `true` | Enable undo/redo operations |
| `disabled` | `boolean` | `false` | Disable the component |
| `cssClass` | `string` | `''` | Custom CSS classes for styling |
| `imageSmoothingEnabled` | `boolean` | `false` | Enable high-quality image smoothing |
| `locale` | `string` | `''` | Locale override for localization |
| `zoomSettings` | `ZoomSettingsModel` | `null` | Zoom configuration (min, max, factor, trigger, point) |
| `finetuneSettings` | `FinetuneSettingsModel` | — | Fine-tune controls configuration (brightness, contrast, etc.) |
| `selectionSettings` | `SelectionSettingsModel` | `null` | Selection/crop appearance (fill, stroke, showCircle) |
| `uploadSettings` | `UploadSettingsModel` | — | File upload constraints (extensions, min/max size) |
| `fontFamily` | `FontFamilyModel[]` | — | Custom font families in text annotation dropdown |

### Events

| Event | Args Interface | When Triggered |
|-------|---------------|----------------|
| `created` | `Event` | After component is rendered |
| `destroyed` | `Event` | After component is destroyed |
| `fileOpened` | `OpenEventArgs` | After an image is opened |
| `beforeSave` | `BeforeSaveEventArgs` | Before image is saved/exported |
| `saved` | `SaveEventArgs` | After image is saved/exported |
| `editComplete` | `EditCompleteEventArgs` | After any edit action completes |
| `cropping` | `CropEventArgs` | While crop is in progress |
| `rotating` | `RotateEventArgs` | While rotation is in progress |
| `flipping` | `FlipEventArgs` | While flip is in progress |
| `resizing` | `ResizeEventArgs` | While resize is in progress |
| `zooming` | `ZoomEventArgs` | While zoom is in progress |
| `panning` | `PanEventArgs` | While pan is in progress |
| `selectionChanging` | `SelectionChangeEventArgs` | While crop selection changes |
| `shapeChanging` | `ShapeChangeEventArgs` | While a shape is being changed |
| `shapeChange` | `ShapeChangeEventArgs` | After a shape change completes |
| `imageFiltering` | `ImageFilterEventArgs` | When a filter is applied |
| `finetuneValueChanging` | `FinetuneEventArgs` | While a fine-tune value changes |
| `frameChange` | `FrameChangeEventArgs` | While a frame is applied |
| `toolbarCreated` | `ToolbarEventArgs` | After toolbar is created |
| `toolbarUpdating` | `ToolbarEventArgs` | While toolbar is refreshed |
| `toolbarItemClicked` | `ClickEventArgs` | On toolbar item click |
| `quickAccessToolbarOpen` | `QuickAccessToolbarEventArgs` | When quick access toolbar opens |
| `quickAccessToolbarItemClick` | `ClickEventArgs` | On quick access toolbar item click |
| `click` | `ImageEditorClickEventArgs` | On click inside editor canvas |

## Common Use Cases

**Professional Image Editing Suite** - Full-featured editor with all tools
**Annotation Workflow** - Markup and redaction for documents
**Quick Crop Tool** - Simplified UI focused on cropping
**Social Media Tool** - Preset aspect ratios for platforms
**Screenshot Markup** - Quick annotation on screenshots
**Document Processing** - Straighten, crop, and export scans
**Dialog Integration** - Modal image editing workflows

## Related Skills

- `implementing-rich-text-editor` - For text document editing
- `implementing-buttons` - For control customization
- `implementing-dialogs` - For modal workflow integration

