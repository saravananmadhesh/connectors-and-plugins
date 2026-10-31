# Image Transformations in Angular Image Editor

## Table of Contents
- [Rotation](#rotation)
- [Flipping](#flipping)
- [Straightening](#straightening)
- [Zooming](#zooming)
- [Panning](#panning)
- [Transform Events](#transform-events)

---

## Rotation

### Rotate Image

Rotate the image and all annotations by specified degrees:

```typescript
import { ViewChild } from '@angular/core';
import { ImageEditorComponent } from '@syncfusion/ej2-angular-image-editor';

@Component({
  selector: 'app-rotate',
  template: `
    <ejs-imageeditor #imageEditor></ejs-imageeditor>
    <button (click)="rotateClockwise()">Rotate 90°</button>
    <button (click)="rotateCounterClockwise()">Rotate -90°</button>
  `
})
export class RotateComponent {
  @ViewChild('imageEditor') imageEditor?: ImageEditorComponent;

  rotateClockwise() {
    this.imageEditor?.rotate(90); // Positive value = clockwise
  }

  rotateCounterClockwise() {
    this.imageEditor?.rotate(-90); // Negative value = counterclockwise
  }
}
```

### Recommended Rotation Values

Best results with multiples of 90 degrees:

```typescript
rotate90() {
  this.imageEditor?.rotate(90);
}

rotate180() {
  this.imageEditor?.rotate(180);
}

rotate270() {
  this.imageEditor?.rotate(270);
}

rotate45() {
  // Custom angles also supported
  this.imageEditor?.rotate(45);
}
```

### Rotating Annotations

When you rotate the image, all annotations are transformed accordingly:

```typescript
rotateWithAnnotations() {
  // This rotates the image AND all annotations
  this.imageEditor?.rotate(90);
}
```

---

## Flipping

### Flip Horizontally

Mirror the image along the vertical axis:

```typescript
flipHorizontal() {
  this.imageEditor?.flip('Horizontal');
}
```

### Flip Vertically

Mirror the image along the horizontal axis:

```typescript
flipVertical() {
  this.imageEditor?.flip('Vertical');
}
```

### Flip with Annotations

Annotations are also flipped with the image:

```typescript
@Component({
  template: `
    <ejs-imageeditor #imageEditor></ejs-imageeditor>
    <button (click)="flipBothWays()">Flip Both</button>
  `
})
export class FlipComponent {
  @ViewChild('imageEditor') imageEditor?: ImageEditorComponent;

  flipBothWays() {
    // Flip horizontal
    this.imageEditor?.flip('Horizontal');
    
    // Then flip vertical
    this.imageEditor?.flip('Vertical');
  }
}
```

---

## Straightening

### Straighten Image

Adjust image rotation with fine control (±45 degrees):

```typescript
straightenImage() {
  this.imageEditor?.straightenImage(5); // 5 degrees clockwise
}

straightenImageCounterClockwise() {
  this.imageEditor?.straightenImage(-8); // 8 degrees counterclockwise
}
```

### Straightening Slider

Enable straightening through toolbar for user control:

```typescript
@Component({
  template: `
    <ejs-imageeditor 
      [toolbar]="['Straightening', 'Crop', 'Save']"
    ></ejs-imageeditor>
  `
})
export class StraighteningComponent { }
```

### Fine Adjustments

Use small increments for precise alignment:

```typescript
@Component({
  template: `
    <button (click)="adjustLeft()">← Adjust Left</button>
    <button (click)="adjustRight()">Adjust Right →</button>
    <ejs-imageeditor #imageEditor></ejs-imageeditor>
  `
})
export class FineAdjustmentComponent {
  @ViewChild('imageEditor') imageEditor?: ImageEditorComponent;

  adjustLeft() {
    this.imageEditor?.straightenImage(-2); // Small left adjustment
  }

  adjustRight() {
    this.imageEditor?.straightenImage(2); // Small right adjustment
  }
}
```

---

## Zooming

### Zoom In and Out

Magnify or reduce image size:

```typescript
zoomIn() {
  this.imageEditor?.zoom(1.2, { x: 300, y: 200 }); // Zoom factor > 1
}

zoomOut() {
  this.imageEditor?.zoom(0.8, { x: 300, y: 200 }); // Zoom factor < 1
}
```

### Zoom Parameters

```typescript
// zoom(zoomFactor, zoomPoint)
// zoomFactor: Percentage-based zoom factor (e.g., 20 for 2x zoom)
// zoomPoint: x,y coordinates on image to zoom toward

this.imageEditor?.zoom(200, { x: 200, y: 150 }); // Zoom 2x (200%) at point (200, 150)
this.imageEditor?.zoom(50, { x: 100, y: 100 }); // Zoom 0.5x (50%) at point (100, 100)
```

### Set Zoom Limits

Configure minimum and maximum zoom levels:

```typescript
@Component({
  selector: 'app-zoom-limits',
  template: `<ejs-imageeditor [zoomSettings]="zoomSettings"></ejs-imageeditor>`,
  imports: [ImageEditorModule],
  standalone: true
})
export class ZoomLimitsComponent {
  zoomSettings = {
    minZoomFactor: 0.1,  // 10% of original size
    maxZoomFactor: 10    // 10x original size
  };
}
```

### Keyboard Zoom

Users can zoom with keyboard shortcuts:

```
Ctrl + Plus (+)  →  Zoom In
Ctrl + Minus (-)  →  Zoom Out
```

### Mouse Wheel Zoom

Users can zoom with mouse wheel while holding Ctrl:

```
Ctrl + Scroll Up  →  Zoom In
Ctrl + Scroll Down  →  Zoom Out
```

---

## Panning

### Enable Panning

Pan (drag) the image when zoomed in:

```typescript
enablePanning() {
  this.imageEditor?.pan();
}
```

### Panning Use Cases

Panning is automatically available when:
1. Image size exceeds canvas size (after zooming)
2. Selection region is active

### Handle Panning Events

```typescript
@Component({
  template: `
    <ejs-imageeditor 
      [panning]="onPanning"
    ></ejs-imageeditor>
  `
})
export class PanningEventComponent {
  onPanning(args: any) {
    console.log('Start Point:', args.startPoint);   // {x, y}
    console.log('End Point:', args.endPoint);       // {x, y}
    
    // Can set args.cancel = true to prevent panning
  }
}
```

---

## Transform Events

### Rotating Event

```typescript
@Component({
  template: `
    <ejs-imageeditor 
      [rotating]="onRotating"
    ></ejs-imageeditor>
  `
})
export class RotatingEventComponent {
  onRotating(args: any) {
    console.log('Previous Degree:', args.previousDegree);
    console.log('Current Degree:', args.currentDegree);
    
    // Validate rotation
    if (args.currentDegree > 360) {
      args.cancel = true;
    }
  }
}
```

### Flipping Event

```typescript
@Component({
  template: `
    <ejs-imageeditor 
      [flipping]="onFlipping"
    ></ejs-imageeditor>
  `
})
export class FlippingEventComponent {
  onFlipping(args: any) {
    console.log('Flip Direction:', args.direction); // 'Horizontal' or 'Vertical'
    
    // can set args.cancel = true to prevent flip
  }
}
```

### Zooming Event

```typescript
@Component({
  template: `
    <ejs-imageeditor 
      [zooming]="onZooming"
    ></ejs-imageeditor>
  `
})
export class ZoomingEventComponent {
  onZooming(args: any) {
    console.log('Zoom Point:', args.zoomPoint);          // {x, y}
    console.log('Previous Zoom:', args.previousZoomFactor);
    console.log('Current Zoom:', args.currentZoomFactor);
    console.log('Trigger:', args.zoomTrigger);          // 'toolbar', 'keyboard', etc.
    
    // Limit zoom
    if (args.currentZoomFactor > 5) {
      args.currentZoomFactor = 5;
    }
  }
}
```

### Panning Event

```typescript
@Component({
  template: `
    <ejs-imageeditor 
      [panning]="onPanning"
    ></ejs-imageeditor>
  `
})
export class PanningEventComponent {
  onPanning(args: any) {
    console.log('Start:', args.startPoint);
    console.log('End:', args.endpoint);
    
    // Can prevent panning
    if (args.endpoint.x > 500) {
      args.cancel = true;
    }
  }
}
```

---

## Complete Transform Example

```typescript
@Component({
  selector: 'app-transform-suite',
  template: `
    <div style="padding: 20px;">
      <div style="margin-bottom: 10px;">
        <button (click)="rotate90()">Rotate 90°</button>
        <button (click)="flipH()">Flip H</button>
        <button (click)="flipV()">Flip V</button>
        <button (click)="straighten()">Straighten</button>
        <button (click)="zoomInImage()">Zoom In</button>
        <button (click)="zoomOutImage()">Zoom Out</button>
      </div>
      <div style="width: 600px; height: 400px;">
        <ejs-imageeditor 
          #imageEditor
          [zoomSettings]="{ minZoomFactor: 0.1, maxZoomFactor: 10 }"
          [rotating]="onRotating"
          [flipping]="onFlipping"
        ></ejs-imageeditor>
      </div>
    </div>
  `,
  imports: [ImageEditorModule],
  standalone: true
})
export class TransformSuiteComponent {
  @ViewChild('imageEditor') imageEditor?: ImageEditorComponent;

  rotate90() {
    this.imageEditor?.rotate(90);
  }

  flipH() {
    this.imageEditor?.flip('Horizontal');
  }

  flipV() {
    this.imageEditor?.flip('Vertical');
  }

  straighten() {
    this.imageEditor?.straightenImage(0);
  }

  zoomInImage() {
    this.imageEditor?.zoom(1.2, { x: 300, y: 200 });
  }

  zoomOutImage() {
    this.imageEditor?.zoom(0.8, { x: 300, y: 200 });
  }

  onRotating(args: any) {
    console.log('Rotating to:', args.currentDegree);
  }

  onFlipping(args: any) {
    console.log('Flipping:', args.direction);
  }
}
```

---

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl + Z` | Undo last action |
| `Ctrl + Y` | Redo last action |
| `Ctrl + +` | Zoom In |
| `Ctrl + -` | Zoom Out |
| `Ctrl + 0` | Reset zoom to 100% |

---

## Edge Cases & Troubleshooting

**Issue:** Rotation appears pixelated
- **Solution:** Use multiples of 90 degrees for crisp results; other angles may show interpolation artifacts

**Issue:** Zoom point seems off
- **Solution:** Ensure zoom point coordinates are relative to the image, not the canvas

**Issue:** Panning not working
- **Solution:** Panning only works when image is larger than canvas (use zoom first)

**Issue:** Straightening doesn't reset
- **Solution:** Call `straightenImage(0)` to reset to 0 degrees
