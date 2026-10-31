# Layer Management and Z-Order

## Table of Contents
- [Z-Order Operations](#z-order-operations)
- [Layer Stacking](#layer-stacking)
- [Managing Multiple Annotations](#managing-multiple-annotations)
- [Common Patterns](#common-patterns)

## Z-Order Operations

### Understanding Z-Order

Z-order determines the stacking order of annotations on the image (which appears in front/back):

```typescript
import { ImageEditor } from '@syncfusion/ej2-image-editor';

const imageEditor = new ImageEditor({ width: '550px', height: '330px' });
imageEditor.appendTo('#imageeditor');

// Lower z-index = behind
// Higher z-index = in front
```

### Get Shape Settings

Use `getShapeSettings()` to retrieve all current shapes and their IDs:

```typescript
// Get all shapes — each has an `id` property
const shapes = imageEditor.getShapeSettings();
shapes.forEach(shape => {
    console.log(`Shape id: ${shape.id}, type: ${shape.type}`);
});
```

### Bring Forward

Move a specific annotation up in z-order (closer to front):

```typescript
const shapes = imageEditor.getShapeSettings();
if (shapes && shapes.length > 0) {
    const shapeId = shapes[0].id;

    // Bring forward by one level
    imageEditor.bringForward(shapeId);

    // Bring to absolute front (topmost)
    imageEditor.bringToFront(shapeId);
}
```

### Send Backward

Move a specific annotation down in z-order (further back):

```typescript
const shapes = imageEditor.getShapeSettings();
if (shapes && shapes.length > 0) {
    const shapeId = shapes[0].id;

    // Send backward by one level
    imageEditor.sendBackward(shapeId);

    // Send to absolute back (bottom-most)
    imageEditor.sendToBack(shapeId);
}
```

## Layer Stacking

### Understanding Layers

Each annotation is a layer that can be arranged:

```
Layer 3 (Front) ──┐
Layer 2          │ Z-Order (stacking)
Layer 1          │
Layer 0 (Back)  ─┘
```

### Select Annotation for Reordering

```typescript
// Click on annotation to select it via UI
// Then use bring forward/backward operations

// Programmatic selection by shape id
const shapes = imageEditor.getShapeSettings();
if (shapes && shapes.length > 0) {
    imageEditor.selectShape(shapes[0].id);  // Select by string id
}
```

### Reorder via Context Menu

```typescript
// Right-click on annotation shows menu:
// - Bring Forward
// - Bring to Front
// - Send Backward
// - Send to Back
```

### View Stacking Order

```typescript
function printZOrderStack(imageEditor: ImageEditor) {
    const shapes = imageEditor.getShapeSettings();

    shapes.forEach((shape, index) => {
        console.log(`Level ${index}: id=${shape.id}, type=${shape.type}`);
    });
}
```

## Managing Multiple Annotations

### Add Multiple Annotations

```typescript
const imageEditor = new ImageEditor({ width: '550px', height: '330px' });
imageEditor.appendTo('#imageeditor');

const dimension = imageEditor.getImageDimension();

// Add first annotation (will be at back initially)
imageEditor.drawText(
    dimension.x + 50,
    dimension.y + 50,
    'First Annotation',
    'Arial', 16, false, false, 'black'
);

// Add second annotation
imageEditor.drawRectangle(
    dimension.x + 100,
    dimension.y + 100,
    150,
    100,
    2,
    '#0000FF',
    'transparent'
);

// Add third annotation (will be at front)
imageEditor.drawArrow(
    dimension.x + 50,
    dimension.y + 50,
    dimension.x + 200,
    dimension.y + 150,
    2,
    '#FF0000'
);
```

### Delete Annotation

Remove a specific annotation by its id:

```typescript
const shapes = imageEditor.getShapeSettings();
if (shapes && shapes.length > 0) {
    const lastShapeId = shapes[shapes.length - 1].id;
    imageEditor.deleteShape(lastShapeId);
}

// Or use keyboard shortcut after selecting: Delete key
```

### Select Specific Annotation

```typescript
// Click on annotation in editor via UI
// Or programmatically by id:

const shapes = imageEditor.getShapeSettings();
if (shapes && shapes.length > 0) {
    imageEditor.selectShape(shapes[0].id);  // Select first annotation by id
}
```

### List All Annotations

```typescript
function getAnnotationsList(imageEditor: ImageEditor) {
    const shapes = imageEditor.getShapeSettings();
    return shapes.map((shape, index) => ({
        index,
        id: shape.id,
        type: shape.type
    }));
}

console.log(getAnnotationsList(imageEditor));
```

## Common Patterns

### Pattern: Organize by Type

```typescript
import { ShapeSettings } from '@syncfusion/ej2-image-editor';

function organizeAnnotationsByType(imageEditor: ImageEditor) {
    const shapes: ShapeSettings[] = imageEditor.getShapeSettings();

    const textAnnotations = shapes.filter(s => s.type === 'Text');
    const shapeAnnotations = shapes.filter(s => ['Rectangle', 'Ellipse', 'Arrow', 'Line'].includes(s.type));
    const pathAnnotations = shapes.filter(s => s.type === 'Path' || s.type === 'FreehandDraw');

    console.log(`Text annotations: ${textAnnotations.length}`);
    console.log(`Shape annotations: ${shapeAnnotations.length}`);
    console.log(`Path annotations: ${pathAnnotations.length}`);
}
```

### Pattern: Bring Selected Shape to Front via Event

```typescript
import { ImageEditor, ShapeChangeEventArgs } from '@syncfusion/ej2-image-editor';

// When a shape is selected, bring it to front
imageEditor.addEventListener('shapeChange', (args: ShapeChangeEventArgs) => {
    const shapeId = args.currentShapeSettings?.id;
    if (shapeId) {
        imageEditor.bringToFront(shapeId);
        console.log(`Brought to front: ${shapeId}`);
    }
});
```

### Pattern: Delete All Annotations

```typescript
function deleteAllAnnotations(imageEditor: ImageEditor) {
    let shapes = imageEditor.getShapeSettings();
    while (shapes && shapes.length > 0) {
        imageEditor.deleteShape(shapes[0].id);
        shapes = imageEditor.getShapeSettings();
    }
}
```

### Pattern: Reorder Using Bring/Send

```typescript
function reorderShapes(imageEditor: ImageEditor) {
    const shapes = imageEditor.getShapeSettings();
    if (!shapes || shapes.length < 2) return;

    // Send first shape to back
    imageEditor.sendToBack(shapes[0].id);

    // Bring last shape to front
    imageEditor.bringToFront(shapes[shapes.length - 1].id);
}
```

### Pattern: Clone and Reposition Shape

```typescript
import { ImageEditor } from '@syncfusion/ej2-image-editor';

function cloneShape(imageEditor: ImageEditor, shapeId: string) {
    imageEditor.cloneShape(shapeId);
    // The cloned shape is placed slightly offset from the original
}

// Usage
const shapes = imageEditor.getShapeSettings();
if (shapes && shapes.length > 0) {
    cloneShape(imageEditor, shapes[0].id);
}
```

