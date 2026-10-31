# Annotation Tools

## Table of Contents
- [Text Annotations](#text-annotations)
- [Freehand Drawing](#freehand-drawing)
- [Shape Annotations](#shape-annotations)
- [Redaction Tools](#redaction-tools)
- [Frames](#frames)
- [Annotation Styling](#annotation-styling)
- [Managing Annotations](#managing-annotations)
- [Common Patterns](#common-patterns)

## Text Annotations

### Add Text to Image

Insert text annotations with full customization:

```typescript
import { ImageEditor } from '@syncfusion/ej2-image-editor';

const imageEditor = new ImageEditor({ width: '550px', height: '330px' });
imageEditor.appendTo('#imageeditor');

// Get image dimension for positioning
const dimension = imageEditor.getImageDimension();

// Add basic text
imageEditor.drawText(
    dimension.x + 50,           // X coordinate
    dimension.y + 50,           // Y coordinate
    'Hello Syncfusion'          // Text content
);
```

### Text Customization

Control font, size, style, and colors:

```typescript
const dimension = imageEditor.getImageDimension();

// Full customization
imageEditor.drawText(
    dimension.x + 100,          // x position
    dimension.y + 100,          // y position
    'Custom Text',              // text content
    'Arial',                    // font family
    30,                         // font size (pixels)
    true,                       // bold
    false,                      // italic
    'darkblue',                 // text color
    false,                      // isSelected
    0,                          // rotation (degrees)
    '#FFFFCC',                  // fill (background) color
    'black',                    // stroke (outline) color
    2                           // stroke width
);
```

### Text Parameters Reference

| Parameter | Type | Purpose |
|-----------|------|---------|
| x | number | Horizontal position from left |
| y | number | Vertical position from top |
| text | string | Text content to display |
| fontFamily | string | Font family (Arial, Times New Roman, etc.) |
| fontSize | number | Font size in pixels |
| bold | boolean | Enable bold text |
| italic | boolean | Enable italic text |
| color | string | Text color (hex or name) |
| isSelected | boolean | Show selection handles |
| degree | number | Rotation angle in degrees |
| fillColor | string | Background fill color |
| strokeColor | string | Outline stroke color |
| strokeWidth | number | Outline width in pixels |

### Font Families

Available font options:

```typescript
const fonts = [
    'Arial',
    'Courier New',
    'Georgia',
    'Impact',
    'Palatino Linotype',
    'Segoe UI',
    'Tahoma',
    'Times New Roman',
    'Trebuchet MS',
    'Verdana'
];

// Use in drawText
imageEditor.drawText(x, y, 'Text', 'Georgia', 24, false, false, 'black');
```

### Text Styling Combinations

```typescript
// Bold only
imageEditor.drawText(x, y, 'Bold Text', 'Arial', 20, true, false, 'black');

// Italic only
imageEditor.drawText(x, y, 'Italic Text', 'Arial', 20, false, true, 'blue');

// Bold + Italic
imageEditor.drawText(x, y, 'Bold Italic', 'Arial', 20, true, true, 'red');
```

### Underline and Strikethrough

Add text decoration:

```typescript
const dimension = imageEditor.getImageDimension();

imageEditor.drawText(
    dimension.x + 50,
    dimension.y + 50,
    'Decorated Text',
    'Arial',
    24,
    false,
    false,
    'black',
    false,
    0,
    '',
    '',
    0,
    null,                       // transformCollection
    true,                       // underline
    false                       // strikethrough
);
```

## Freehand Drawing

### Enable Freehand Drawing Tool

Allow users to draw on image:

```typescript
const imageEditor = new ImageEditor({
    toolbar: ['FreehandDraw'],
    // Users can now draw freehand on image
});
```

### Draw via Toolbar

```typescript
// User clicks toolbar: Annotation → Freehand Draw
// Then draws on image by clicking and dragging
// Tool is UI-driven, no direct draw method
```

### Freehand Drawing Settings

Configure pen behavior:

```typescript
const imageEditor = new ImageEditor({
    width: '550px',
    height: '330px',
    toolbar: ['Annotate'] // Includes freehand drawing
});

// Enable freehand drawing programmatically
imageEditor.freehandDraw(true);  // Enable
imageEditor.freehandDraw(false); // Disable
```

### Programmatic Path Drawing

Draw multi-point paths using `drawPath()`:

```typescript
const dimension = imageEditor.getImageDimension();

imageEditor.drawPath(
    [
        { x: dimension.x + 50, y: dimension.y + 50 },
        { x: dimension.x + 100, y: dimension.y + 60 },
        { x: dimension.x + 150, y: dimension.y + 50 },
        { x: dimension.x + 200, y: dimension.y + 100 }
    ],
    3,           // strokeWidth
    '#FF0000'    // strokeColor
);
```

## Shape Annotations

### Rectangle

Draw rectangular shapes:

```typescript
const dimension = imageEditor.getImageDimension();

imageEditor.drawRectangle(
    dimension.x + 50,   // x
    dimension.y + 50,   // y
    200,                // width
    150,                // height
    2,                  // strokeWidth
    '#0000FF',          // strokeColor
    '#FFFFCC'           // fillColor
);
```

### Ellipse/Circle

Draw elliptical or circular shapes:

```typescript
const dimension = imageEditor.getImageDimension();

// Ellipse
imageEditor.drawEllipse(
    dimension.x + 150,  // x (center)
    dimension.y + 100,  // y (center)
    75,                 // radiusX
    50,                 // radiusY
    2,                  // strokeWidth
    '#00FF00',          // strokeColor
    'transparent'       // fillColor
);

// Perfect circle (radiusX == radiusY)
imageEditor.drawEllipse(
    dimension.x + 150,
    dimension.y + 100,
    60,                 // radiusX
    60,                 // radiusY — same as radiusX for circle
    2,
    '#FF0000',
    'transparent'
);
```

### Arrow

Draw arrow annotations:

```typescript
const dimension = imageEditor.getImageDimension();

imageEditor.drawArrow(
    dimension.x + 50,   // startX
    dimension.y + 50,   // startY
    dimension.x + 250,  // endX
    dimension.y + 150,  // endY
    3,                  // strokeWidth
    '#FF0000',          // strokeColor
    ArrowheadType.Arrow // start head type (ArrowheadType enum)
);
```

### Line

Draw straight lines:

```typescript
const dimension = imageEditor.getImageDimension();

imageEditor.drawLine(
    dimension.x + 50,   // startX
    dimension.y + 50,   // startY
    dimension.x + 300,  // endX
    dimension.y + 200,  // endY
    2,                  // strokeWidth
    '#0000FF'           // strokeColor
);
```

### Path

Draw multi-point paths:

```typescript
const dimension = imageEditor.getImageDimension();

imageEditor.drawPath(
    [
        { x: dimension.x + 50, y: dimension.y + 50 },
        { x: dimension.x + 100, y: dimension.y + 100 },
        { x: dimension.x + 150, y: dimension.y + 50 },
        { x: dimension.x + 200, y: dimension.y + 100 }
    ],
    2,          // strokeWidth
    '#FF00FF'   // strokeColor
);
```

## Redaction Tools

### Redact/Mask Areas

Hide sensitive information:

```typescript
// Redaction via toolbar
const imageEditor = new ImageEditor({
    toolbar: ['Redact'],
    // User draws rectangle to redact information
});

// Toolbar approach:
// 1. User clicks Redact tool
// 2. Draws rectangle over sensitive area
// 3. Area is masked/blurred
```

### Programmatic Redaction

```typescript
import { ImageEditor, RedactType } from '@syncfusion/ej2-image-editor';

const dimension = imageEditor.getImageDimension();

// Blur-based redaction
imageEditor.drawRedact(
    RedactType.Blur,            // Blur redaction
    dimension.x + 100,         // x
    dimension.y + 100,         // y
    150,                       // width
    50                         // height
);

// Pixel redaction
imageEditor.drawRedact(
    RedactType.Pixelate,       // Pixelate redaction
    dimension.x + 100,
    dimension.y + 200,
    150,
    50
);
```

## Frames

### Add Frames to Image

Insert decorative borders/frames:

```typescript
const imageEditor = new ImageEditor({
    toolbar: ['Frame'],
    // User selects frame from options
});

// Available frame types accessed via toolbar
```

### Frame Selection via Toolbar

```typescript
// User interaction:
// 1. Click Frame button in toolbar
// 2. Select frame style from dropdown
// 3. Frame applied to image with adjustable border thickness
```

### Custom Frame Implementation

```typescript
import { ImageEditor, FrameType } from '@syncfusion/ej2-image-editor';

// Apply a built-in frame type
imageEditor.drawFrame(FrameType.Mat);   // Mat frame
imageEditor.drawFrame(FrameType.Bevel); // Bevel frame
imageEditor.drawFrame(FrameType.Line);  // Line frame
imageEditor.drawFrame(FrameType.Hook);  // Hook frame
imageEditor.drawFrame(FrameType.None);  // Remove frame

// Custom border using rectangle annotation
function addBorderAnnotation(thickness: number, color: string) {
    const dimension = imageEditor.getImageDimension();

    imageEditor.drawRectangle(
        dimension.x,
        dimension.y,
        dimension.width,
        dimension.height,
        thickness,      // strokeWidth acts as border thickness
        color,          // strokeColor
        'transparent'   // no fill
    );
}

addBorderAnnotation(10, '#8B4513');  // Brown border annotation
```

## Annotation Styling

### Color Selection

Set annotation colors:

```typescript
const dimension = imageEditor.getImageDimension();

// Text color
imageEditor.drawText(
    dimension.x + 50, dimension.y + 50,
    'Red Text', 'Arial', 20, false, false, '#FF0000'
);

// Shape with stroke and fill colors
imageEditor.drawRectangle(
    dimension.x + 50, dimension.y + 50,
    100, 100,
    2,          // strokeWidth
    '#0000FF',  // strokeColor — blue outline
    '#00FF00'   // fillColor — green fill
);
```

### Stroke Width/Thickness

Control line thickness:

```typescript
const dimension = imageEditor.getImageDimension();

// Thin line
imageEditor.drawLine(
    dimension.x + 50, dimension.y + 50,
    dimension.x + 200, dimension.y + 100,
    1,          // strokeWidth — 1 pixel
    '#000000'   // strokeColor
);

// Thick line
imageEditor.drawLine(
    dimension.x + 50, dimension.y + 150,
    dimension.x + 200, dimension.y + 200,
    5,          // strokeWidth — 5 pixels
    '#000000'   // strokeColor
);
```

### Transparency/Opacity

Use rgba for transparency:

```typescript
const dimension = imageEditor.getImageDimension();

// Semi-transparent fill
imageEditor.drawRectangle(
    dimension.x + 50, dimension.y + 50,
    200, 150,
    2,
    'rgba(0, 0, 255, 1)',       // Solid blue outline
    'rgba(255, 255, 0, 0.5)'    // 50% transparent yellow fill
);
```

## Managing Annotations

### Select Annotation

Make annotation selected/editable:

```typescript
// Annotation becomes selected with handles
imageEditor.drawText(x, y, 'Selectable', 'Arial', 20, false, false, 'black', true);
//                                                                     ^^^^
//                                                          isSelected = true
```

### Delete Annotation

Remove annotations by shape id:

```typescript
// Get all shape settings to find the id
const shapes = imageEditor.getShapeSettings();

if (shapes && shapes.length > 0) {
    const shapeId = shapes[shapes.length - 1].id; // last shape
    imageEditor.deleteShape(shapeId);
}

// Keyboard shortcut (automatic)
// User selects annotation and presses Delete key
```

### Rotate Annotation

Rotate individual annotations:

```typescript
// Rotate text by 45 degrees
imageEditor.drawText(x, y, 'Rotated', 'Arial', 20, false, false, 'black', false, 45);
//                                                                                 ^^
//                                                                          degree = 45
```

### Update Annotation

After drawing, use `updateShape()` to modify an existing annotation:

```typescript
// Get shape id from shapeChange event or getShapeSettings()
imageEditor.addEventListener('shapeChange', (args: ShapeChangeEventArgs) => {
    // args.currentShapeSettings has current shape info
    const shapeId = args.currentShapeSettings.id;

    // Update the shape's properties
    imageEditor.updateShape(shapeId, {
        strokeColor: '#FF0000',
        fillColor: '#FFFFCC',
        strokeWidth: 3
    });
});
```

## Common Patterns

### Pattern: Watermark Text

```typescript
function addWatermark(text: string) {
    const dimension = imageEditor.getImageDimension();
    
    // Center position
    const x = dimension.x + (dimension.width / 2) - 100;
    const y = dimension.y + (dimension.height / 2);
    
    // Large, semi-transparent text
    imageEditor.drawText(
        x, y, text, 'Arial', 48, false, true,
        'rgba(255, 255, 255, 0.3)',  // White, 30% opacity
        false, 45                     // 45 degree rotation
    );
}

addWatermark('© 2024 Company');
```

### Pattern: Multiple Shapes for Emphasis

```typescript
function highlightArea(x: number, y: number, width: number, height: number) {
    // Draw rectangle with thick border
    imageEditor.drawRectangle(
        x, y, width, height,
        3,              // strokeWidth
        '#FF0000',      // strokeColor
        'transparent'   // fillColor
    );

    // Add small corner marker
    const cornerSize = 10;
    imageEditor.drawRectangle(
        x - cornerSize / 2, y - cornerSize / 2,
        cornerSize, cornerSize,
        1,
        '#FF0000',
        '#FF0000'
    );
}

const dim = imageEditor.getImageDimension();
highlightArea(dim.x + 100, dim.y + 100, 200, 150);
```

### Pattern: Annotation with Label

```typescript
function annotateWithLabel(x: number, y: number, label: string, note: string) {
    // Add arrow pointing to area
    imageEditor.drawArrow(
        x + 50, y + 50,  // startX, startY
        x, y,             // endX, endY
        2,                // strokeWidth
        '#0000FF'         // strokeColor
    );

    // Add label text
    imageEditor.drawText(
        x + 60, y + 40,
        label, 'Arial', 16, true, false, '#0000FF'
    );

    // Add note in smaller text
    imageEditor.drawText(
        x + 60, y + 60,
        note, 'Arial', 12, false, false, '#666666'
    );
}

const dim = imageEditor.getImageDimension();
annotateWithLabel(dim.x + 200, dim.y + 150, 'Important', 'Review this section');
```

### Pattern: Batch Annotations

```typescript
interface AnnotationItem {
    type: 'text' | 'rectangle' | 'arrow';
    x?: number; y?: number;
    text?: string; font?: string; size?: number; color?: string;
    x2?: number; y2?: number; width?: number; height?: number;
    strokeColor?: string; strokeWidth?: number; fillColor?: string;
}

function addAnnotations(annotations: AnnotationItem[]) {
    annotations.forEach(annotation => {
        switch (annotation.type) {
            case 'text':
                imageEditor.drawText(
                    annotation.x, annotation.y, annotation.text,
                    annotation.font, annotation.size, false, false,
                    annotation.color
                );
                break;
            case 'rectangle':
                imageEditor.drawRectangle(
                    annotation.x, annotation.y,
                    annotation.width, annotation.height,
                    annotation.strokeWidth || 1,
                    annotation.strokeColor || '#000000',
                    annotation.fillColor || 'transparent'
                );
                break;
            case 'arrow':
                imageEditor.drawArrow(
                    annotation.x, annotation.y,
                    annotation.x2, annotation.y2,
                    annotation.strokeWidth || 2,
                    annotation.strokeColor || '#0000FF'
                );
                break;
        }
    });
}

const dim = imageEditor.getImageDimension();
addAnnotations([
    { type: 'rectangle', x: dim.x + 50, y: dim.y + 50, width: 100, height: 100, strokeColor: '#FF0000' },
    { type: 'text', x: dim.x + 200, y: dim.y + 200, text: 'Note', font: 'Arial', size: 20, color: '#000000' },
    { type: 'arrow', x: dim.x + 100, y: dim.y + 100, x2: dim.x + 200, y2: dim.y + 200, strokeColor: '#0000FF' }
]);
```

