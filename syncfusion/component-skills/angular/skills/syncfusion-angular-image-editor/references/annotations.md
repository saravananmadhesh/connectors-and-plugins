# Annotations in Angular Image Editor

## Table of Contents
- [Text Annotations](#text-annotations)
- [Freehand Drawing](#freehand-drawing)
- [Shape Annotations](#shape-annotations)
- [Image Annotations](#image-annotations)
- [Managing Annotations](#managing-annotations)

---

## Text Annotations

Text annotations allow you to add customizable text labels and captions directly onto images.

### Add Basic Text

Use the `drawText()` method to insert text:

```typescript
import { ViewChild } from '@angular/core';
import { ImageEditorComponent } from '@syncfusion/ej2-angular-image-editor';

@Component({
  selector: 'app-text-annotation',
  template: `
    <ejs-imageeditor #imageEditor></ejs-imageeditor>
    <button (click)="addTextAnnotation()">Add Text</button>
  `
})
export class TextAnnotationComponent {
  @ViewChild('imageEditor') imageEditor?: ImageEditorComponent;

  addTextAnnotation() {
    this.imageEditor?.drawText(
      100,        // x-coordinate
      50,         // y-coordinate
      'Hello World', // text content
      'Arial',    // font family
      20,         // font size
      false,      // bold
      false,      // italic
      '#000000'   // text color
    );
  }
}
```

### Text Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `x` | number | X-coordinate of text position |
| `y` | number | Y-coordinate of text position |
| `text` | string | Text content to display |
| `fontFamily` | string | Font family (Arial, Times New Roman, etc.) |
| `fontSize` | number | Font size in pixels |
| `bold` | boolean | Apply bold style |
| `italic` | boolean | Apply italic style |
| `color` | string | Text color in hex format |
| `isSelected` | boolean | Show text in selected state |
| `degree` | number | Rotation angle in degrees |
| `fillColor` | string | Background fill color |
| `strokeColor` | string | Text outline color |
| `strokeWidth` | number | Outline thickness |
| `underline` | boolean | Apply underline |
| `strikethrough` | boolean | Apply strikethrough |

### Multiline Text

Text containing newline characters automatically splits into multiple lines:

```typescript
addMultilineText() {
  this.imageEditor?.drawText(
    100,
    50,
    'Line 1\nLine 2\nLine 3', // Newline characters
    'Arial',
    16,
    false,
    false,
    '#000000'
  );
}
```

### Text Formatting

Apply advanced text formatting with all style options:

```typescript
addFormattedText() {
  this.imageEditor?.drawText(
    100,
    50,
    'Important Notice',
    'Arial',
    20,
    true,         // bold
    true,         // italic
    '#FFFFFF',    // white text
    true,         // selected
    0,            // no rotation
    '#FF0000',    // red background
    '#000000',    // black outline
    3,            // 3px stroke
    true,         // underline
    false         // no strikethrough
  );
}
```

### Customize Font Family

Add additional font families beyond defaults:

```typescript
@Component({
  imports: [ImageEditorModule],
  standalone: true,
  template: `<ejs-imageeditor [fontFamily]="customFonts"></ejs-imageeditor>`
})
export class FontCustomizationComponent {
  customFonts = [
    { id: 'Arial', text: 'Arial' },
    { id: 'Georgia', text: 'Georgia' },
    { id: 'Courier New', text: 'Courier New' },
    { id: 'Comic Sans MS', text: 'Comic Sans MS' }
  ];
}
```

### Handle Shape Events

Handle shape modifications through the `shapeChange` or `shapeChanging` events:

```typescript
@Component({
  template: `
    <ejs-imageeditor 
      [shapeChanging]="onShapeChanging"
    ></ejs-imageeditor>
  `
})
export class TextCustomizationComponent {
  onShapeChanging(args: any) {
    if (args.currentShapeSettings) {
      // Validate or modify shape properties
      console.log('Shape changing:', args.currentShapeSettings);
    }
  }
}
```

---

## Freehand Drawing

Enable users to draw and sketch directly on the image.

### Enable Freehand Drawing

```typescript
export class FreehandComponent {
  @ViewChild('imageEditor') imageEditor?: ImageEditorComponent;

  enableFreehandDraw() {
    this.imageEditor?.freehandDraw();
  }
}
```

### Customize Stroke Properties

You can customize stroke properties on shapes:

```typescript
@Component({
  template: `
    <ejs-imageeditor 
      #imageEditor
    ></ejs-imageeditor>
    <button (click)="enableFreehand()">Freehand Draw</button>
  `
})
export class FreehandCustomComponent {
  @ViewChild('imageEditor') imageEditor?: ImageEditorComponent;

  enableFreehand() {
    this.imageEditor?.freehandDraw(true);
  }
}
```

### Delete Freehand Drawing

```typescript
deleteFreehandAnnotation(shapeId: string) {
  this.imageEditor?.deleteShape(shapeId);
}
```

---

## Shape Annotations

Add geometric shapes like rectangles, ellipses, lines, and arrows.

### Rectangle Shape

```typescript
addRectangle() {
  this.imageEditor?.drawRectangle(
    50,         // x-coordinate (top-left)
    50,         // y-coordinate (top-left)
    200,        // width
    150,        // height
    2,          // stroke width
    '#0000FF',  // stroke color
    '#FFFFFF',  // fill color
    0,          // rotation degree
    true,       // isSelected
    10          // border radius
  );
}
```

### Ellipse Shape

```typescript
addEllipse() {
  this.imageEditor?.drawEllipse(
    300,        // x-coordinate (center)
    200,        // y-coordinate (center)
    100,        // radiusX
    75,         // radiusY
    2,          // stroke width
    '#00FF00',  // stroke color
    '#FFFF00',  // fill color
    0,          // rotation degree
    true        // isSelected
  );
}
```

### Line Shape

```typescript
addLine() {
  this.imageEditor?.drawLine(
    50,         // startX
    50,         // startY
    300,        // endX
    300,        // endY
    3,          // stroke width
    '#FF0000',  // stroke color
    true        // isSelected
  );
}
```

### Arrow Shape

```typescript
addArrow() {
  this.imageEditor?.drawArrow(
    100,        // startX
    100,        // startY
    400,        // endX
    100,        // endY
    3,          // stroke width
    '#FF6600',  // stroke color
    'Start',    // arrowStart type (None, Start, End)
    'End',      // arrowEnd type
    true        // isSelected
  );
}
```

### Path Shape

```typescript
addPath() {
  const points = [
    { x: 50, y: 50 },
    { x: 100, y: 100 },
    { x: 150, y: 50 },
    { x: 200, y: 150 }
  ];

  this.imageEditor?.drawPath(
    points,     // array of ImageEditorPoint
    3,          // stroke width
    '#FF00FF',  // stroke color
    true        // isSelected
  );
}
```

### Customize Shape Defaults

You can customize individual shapes after creating them:

```typescript
@Component({
  template: `
    <ejs-imageeditor 
      #imageEditor
    ></ejs-imageeditor>
    <button (click)="addCustomRectangle()">Add Custom Rectangle</button>
  `
})
export class ShapeDefaultsComponent {
  @ViewChild('imageEditor') imageEditor?: ImageEditorComponent;

  addCustomRectangle() {
    // Draw rectangle with custom properties
    this.imageEditor?.drawRectangle(
      50, 50,      // x, y
      200, 150,    // width, height
      3,           // strokeWidth
      '#0066FF',   // strokeColor
      '#CCCCCC'    // fillColor
    );
  }
}
```

### Delete Shapes

```typescript
deleteShape(shapeId: string) {
  this.imageEditor?.deleteShape(shapeId);
}

// Retrieve shape IDs
getAllShapes() {
  const shapes = this.imageEditor?.getShapeSetting();
  console.log(shapes); // Array of ShapeSettings
}
```

---

## Image Annotations

Add images or icons as annotations on top of the image.

### Add Image Annotation

```typescript
addImageAnnotation() {
  this.imageEditor?.drawImage(
    'watermark.png',  // image data or URL
    100,              // x-coordinate
    100,              // y-coordinate
    200,              // width
    100,              // height
    true,             // maintain aspect ratio
    0,                // rotation degree
    0.8,              // opacity (0-1)
    true              // isSelected
  );
}
```

### Using Base64 Image Data

```typescript
addBase64Image() {
  const base64String = 'data:image/png;base64,iVBORw0KGgoAAAANS...';

  this.imageEditor?.drawImage(
    base64String,
    150,
    150,
    200,
    150,
    true,
    0,
    1.0,
    false
  );
}
```

### Watermarking Images

Add watermarks when opening or saving images:

```typescript
@Component({
  template: `
    <ejs-imageeditor 
      [fileOpened]="onFileOpened"
    ></ejs-imageeditor>
    <button (click)="openImage()">Open Image</button>
  `
})
export class WatermarkComponent {
  @ViewChild('imageEditor') imageEditor?: ImageEditorComponent;

  openImage() {
    this.imageEditor?.open('image.png');
  }

  onFileOpened() {
    // Add watermark text
    this.imageEditor?.drawText(
      50, 50,
      '© My Company',
      'Arial',
      24,
      false,
      false,
      '#FFFFFF'
    );

    // Or add watermark image
    this.imageEditor?.drawImage(
      'logo.png',
      10, 10,
      100, 50,
      true, 0, 0.5, false
    );
  }
}
```

---

## Managing Annotations

### Retrieve All Annotations

```typescript
getAnnotations() {
  const annotations = this.imageEditor?.getShapeSetting();
  annotations?.forEach(annotation => {
    console.log('Shape ID:', annotation.id);
    console.log('Type:', annotation.type); // 'text', 'shape', 'image', etc.
    console.log('Position:', { x: annotation.x, y: annotation.y });
  });
}
```

### Delete Annotations

```typescript
deleteAnnotationById(shapeId: string) {
  this.imageEditor?.deleteShape(shapeId);
}

deleteAllAnnotations() {
  const annotations = this.imageEditor?.getShapeSetting();
  annotations?.forEach(annotation => {
    this.imageEditor?.deleteShape(annotation.id);
  });
}
```

### Manage Annotations with Events

```typescript
@Component({
  template: `
    <ejs-imageeditor 
      [shapeChange]="onShapeChange"
    ></ejs-imageeditor>
  `
})
export class ShapeEventComponent {
  onShapeChange(args: any) {
    console.log('Shape changed:', args);
  }
}
```

---

## Edge Cases & Troubleshooting

**Issue:** Text appears blurry when rotated
- **Solution:** Limit rotation to multiples of 90 degrees for text

**Issue:** Shape not visible after drawing
- **Solution:** Check if stroke color matches background; ensure stroke width > 0

**Issue:** Annotations disappear after transformations
- **Solution:** Annotations are transformed along with the image; this is expected behavior

**Issue:** Cannot edit text after creation
- **Solution:** Select the text annotation first, then modifications appear in toolbar
