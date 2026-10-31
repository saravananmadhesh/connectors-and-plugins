# Z-Order (Layering) in Angular Image Editor

Z-order controls the layering of annotations. Higher z-order means the annotation appears on top.

## Z-Order Operations

### Bring Forward

Move annotation one layer forward (closer to top):

```typescript
import { ViewChild } from '@angular/core';
import { ImageEditorComponent } from '@syncfusion/ej2-angular-image-editor';

@Component({
  selector: 'app-z-order',
  template: `
    <ejs-imageeditor #imageEditor></ejs-imageeditor>
    <button (click)="bringForward()">Bring Forward</button>
    <button (click)="sendBackward()">Send Backward</button>
    <button (click)="bringToFront()">Bring to Front</button>
    <button (click)="sendToBack()">Send to Back</button>
  `
})
export class ZOrderComponent {
  @ViewChild('imageEditor') imageEditor?: ImageEditorComponent;
  selectedShapeId: string | null = null;

  bringForward() {
    if (this.selectedShapeId) {
      this.imageEditor?.bringForward(this.selectedShapeId);
    }
  }

  sendBackward() {
    if (this.selectedShapeId) {
      this.imageEditor?.sendBackward(this.selectedShapeId);
    }
  }

  bringToFront() {
    if (this.selectedShapeId) {
      this.imageEditor?.bringToFront(this.selectedShapeId);
    }
  }

  sendToBack() {
    if (this.selectedShapeId) {
      this.imageEditor?.sendToBack(this.selectedShapeId);
    }
  }
}
```

### Z-Order Method Reference

All z-order methods require the shapeId parameter:

```typescript
// Requires a selected shape ID
const shapeId = 'shape_1'; // Get from getShapeSettings()

this.imageEditor?.bringForward(shapeId);   // Move up one layer
this.imageEditor?.sendBackward(shapeId);   // Move down one layer
this.imageEditor?.bringToFront(shapeId);   // Move to top
this.imageEditor?.sendToBack(shapeId);     // Move to bottom
```

## Z-Order Workflow

For multiple overlapping annotations:

1. **Select annotation** (click on it)
2. **Use toolbar or buttons** to adjust z-order
3. **Repeat** for each annotation as needed

## Complete Example

```typescript
@Component({
  selector: 'app-z-order-manager',
  template: `
    <div style="padding: 20px;">
      <h3>Z-Order Manager</h3>
      <div style="margin-bottom: 10px;">
        <button (click)="addAnnotation()">Add Annotation</button>
        <button (click)="bringForward()" [disabled]="!selectedAnnotation">↑ Forward</button>
        <button (click)="sendBackward()" [disabled]="!selectedAnnotation">↓ Backward</button>
        <button (click)="bringToFront()" [disabled]="!selectedAnnotation">⬆ To Front</button>
        <button (click)="sendToBack()" [disabled]="!selectedAnnotation">⬇ To Back</button>
      </div>
      <div style="width: 600px; height: 400px;">
        <ejs-imageeditor 
          #imageEditor
          [shapeChanging]="onShapeSelected"
        ></ejs-imageeditor>
      </div>
    </div>
  `,
  imports: [ImageEditorModule, CommonModule],
  standalone: true
})
export class ZOrderManagerComponent {
  @ViewChild('imageEditor') imageEditor?: ImageEditorComponent;
  selectedAnnotation = false;
  annotationCount = 0;

  addAnnotation() {
    // Alternate between rectangles and circles
    if (this.annotationCount % 2 === 0) {
      this.imageEditor?.drawRectangle(
        100 + this.annotationCount * 20,
        100 + this.annotationCount * 20,
        150, 100, 2, '#FF0000', '#FFB6C6'
      );
    } else {
      this.imageEditor?.drawEllipse(
        150 + this.annotationCount * 20,
        150 + this.annotationCount * 20,
        75, 50, 2, '#0000FF', '#B6D7FF'
      );
    }
    this.annotationCount++;
  }

  onShapeSelected() {
    this.selectedAnnotation = true;
  }

  bringForward() {
    if (this.selectedAnnotation) {
      this.imageEditor?.bringForward(this.selectedAnnotation);
    }
  }

  sendBackward() {
    if (this.selectedAnnotation) {
      this.imageEditor?.sendBackward(this.selectedAnnotation);
    }
  }

  bringToFront() {
    if (this.selectedAnnotation) {
      this.imageEditor?.bringToFront(this.selectedAnnotation);
    }
  }

  sendToBack() {
    if (this.selectedAnnotation) {
      this.imageEditor?.sendToBack(this.selectedAnnotation);
    }
  }
}
```

## Use Cases

1. **Template Design** - Layer text over images
2. **Watermarking** - Control watermark visibility
3. **Annotation Hierarchy** - Emphasize important annotations
4. **Creative Layouts** - Professional design compositions

## Best Practices

1. Start with background elements (send to back)
2. Add foreground elements (bring to front)
3. Use clear z-order in toolbar for easy management
4. Save after finalizing z-order

## Edge Cases

**Issue:** Cannot change z-order
- **Solution:** Ensure annotation is selected; click on it first

**Issue:** Z-order changes not visible
- **Solution:** Verify annotations are overlapping; non-overlapping annotations show no z-order effect
