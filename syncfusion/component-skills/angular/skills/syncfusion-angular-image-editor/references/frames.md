# Frame Application in Angular Image Editor

## Supported Frame Types

The Image Editor provides 5 decorative frame types:
- **Mat** - Simple border frame
- **Bevel** - 3D beveled border
- **Line** - Simple line border with styling
- **Hook** - Ornamental hook-style border
- **Inset** - Inset border effect

## Apply Frame to Image

```typescript
import { ViewChild } from '@angular/core';
import { ImageEditorComponent } from '@syncfusion/ej2-angular-image-editor';

@Component({
  selector: 'app-frames',
  template: `
    <ejs-imageeditor #imageEditor></ejs-imageeditor>
    <button (click)="applyMatFrame()">Mat Frame</button>
    <button (click)="applyBevelFrame()">Bevel Frame</button>
    <button (click)="applyLineFrame()">Line Frame</button>
  `
})
export class FramesComponent {
  @ViewChild('imageEditor') imageEditor?: ImageEditorComponent;

  applyMatFrame() {
    this.imageEditor?.drawFrame(
      'Mat',          // frameType
      '#FF6B6B',      // color
      undefined,      // gradientColor (optional)
      30              // size
    );
  }

  applyBevelFrame() {
    this.imageEditor?.drawFrame(
      'Bevel',
      '#4ECDC4',
      undefined,
      25
    );
  }

  applyLineFrame() {
    this.imageEditor?.drawFrame(
      'Line',
      '#FFD93D',
      undefined,
      20
    );
  }
}
```

## Frame Parameters

| Parameter | Type | Description | Required |
|-----------|------|-------------|----------|
| `frameType` | string | Frame type (Mat, Bevel, Line, Hook, Inset) | Yes |
| `color` | string | Primary color (hex format) | Yes |
| `gradientColor` | string | Secondary color for gradient | No |
| `size` | number | Frame thickness/size | Yes |
| `inset` | number | Inset value (Line, Hook, Inset types) | No |
| `offset` | number | Offset value (Line, Inset types) | No |
| `borderRadius` | number | Border radius (Line type) | No |
| `frameLineStyle` | string | Line style: Solid, Dashed, Dotted (Line type) | No |
| `lineCount` | number | Number of lines (Line type) | No |

## Frame Type Examples

### Mat Frame

```typescript
applyMatFrame() {
  this.imageEditor?.drawFrame(
    'Mat',
    '#CC5555',      // Reddish color
    '#FF9999',      // Light red gradient
    40              // Large frame
  );
}
```

### Bevel Frame

```typescript
applyBevelFrame() {
  this.imageEditor?.drawFrame(
    'Bevel',
    '#4169E1',      // Royal blue
    '#87CEEB',      // Sky blue gradient
    35
  );
}
```

### Line Frame with Styling

```typescript
applyLineFrame() {
  this.imageEditor?.drawFrame(
    'Line',
    '#2ECC71',      // Green
    undefined,      // No gradient
    25,             // size
    undefined,      // inset
    undefined,      // offset
    10,             // borderRadius
    'Dashed'        // frameLineStyle
  );
}
```

### Hook Frame

```typescript
applyHookFrame() {
  this.imageEditor?.drawFrame(
    'Hook',
    '#9B59B6',      // Purple
    '#E8DAEF',      // Light purple
    30
  );
}
```

### Inset Frame

```typescript
applyInsetFrame() {
  this.imageEditor?.drawFrame(
    'Inset',
    '#E67E22',      // Orange
    undefined,
    28,
    15,             // inset
    5               // offset
  );
}
```

## Line Frame Styles

```typescript
// Solid line (default)
this.imageEditor?.drawFrame('Line', '#333', undefined, 20, 0, 0, 0, 'Solid');

// Dashed line
this.imageEditor?.drawFrame('Line', '#333', undefined, 20, 0, 0, 0, 'Dashed');

// Dotted line
this.imageEditor?.drawFrame('Line', '#333', undefined, 20, 0, 0, 0, 'Dotted');
```

## Gradient Color Support

Apply gradient colors for visual depth:

```typescript
applyGradientFrame() {
  this.imageEditor?.drawFrame(
    'Mat',
    '#FF1744',      // Primary color (red)
    '#D50000',      // Gradient color (darker red)
    35
  );
}
```

## Frame Changing Event

```typescript
@Component({
  template: `
    <ejs-imageeditor 
      [frameChanging]="onFrameChanging"
    ></ejs-imageeditor>
  `
})
export class FrameEventComponent {
  onFrameChanging(args: any) {
    console.log('Previous Frame:', args.previousFrameSetting);
    console.log('Current Frame:', args.currentFrameSetting);
    
    // Can validate and modify frame
    if (args.currentFrameSetting.size > 50) {
      args.currentFrameSetting.size = 50; // Limit size
    }
    
    // Prevent frame application
    if (args.currentFrameSetting.frameType === 'Hook') {
      args.cancel = true;
    }
  }
}
```

## Toolbar Frame Selection

Allow users to select frames through toolbar:

```typescript
@Component({
  template: `
    <ejs-imageeditor 
      [toolbar]="['Open', 'Frame', 'Save']"
    ></ejs-imageeditor>
  `
})
export class FrameToolbarComponent { }
```

## Complete Frame Example

```typescript
@Component({
  selector: 'app-frame-gallery',
  template: `
    <div style="padding: 20px;">
      <h3>Frame Gallery</h3>
      <div style="margin-bottom: 15px;">
        <button (click)="applyMat()">Mat</button>
        <button (click)="applyBevel()">Bevel</button>
        <button (click)="applyLine()">Line (Dashed)</button>
        <button (click)="applyHook()">Hook</button>
        <button (click)="applyInset()">Inset</button>
        <button (click)="removeFrame()">Remove</button>
      </div>
      <div style="width: 600px; height: 400px;">
        <ejs-imageeditor 
          #imageEditor
          [frameChanging]="onFrameChanging"
        ></ejs-imageeditor>
      </div>
    </div>
  `,
  imports: [ImageEditorModule],
  standalone: true
})
export class FrameGalleryComponent {
  @ViewChild('imageEditor') imageEditor?: ImageEditorComponent;

  applyMat() {
    this.imageEditor?.drawFrame('Mat', '#D4AF37', '#FFD700', 40);
  }

  applyBevel() {
    this.imageEditor?.drawFrame('Bevel', '#696969', '#A9A9A9', 35);
  }

  applyLine() {
    this.imageEditor?.drawFrame('Line', '#000000', undefined, 20, 0, 0, 5, 'Dashed', 2);
  }

  applyHook() {
    this.imageEditor?.drawFrame('Hook', '#8B4513', '#D2B48C', 30);
  }

  applyInset() {
    this.imageEditor?.drawFrame('Inset', '#C0C0C0', '#808080', 25, 10, 5);
  }

  removeFrame() {
    // Apply transparent or original frame to remove
    this.imageEditor?.drawFrame('Mat', '#FFFFFF', '#FFFFFF', 0);
  }

  onFrameChanging(args: any) {
    console.log('Frame applied:', args.currentFrameSetting.frameType);
  }
}
```

## Best Practices

1. **Test frame sizes** with your image dimensions
2. **Use contrasting colors** for frame visibility
3. **Consider gradient colors** for professional appearance
4. **Match frame style** to image content
5. **Save after frame application** to preserve edits

## Edge Cases & Troubleshooting

**Issue:** Frame not visible after application
- **Solution:** Ensure frame color contrasts with image; check size parameter

**Issue:** Gradient color not applying
- **Solution:** Ensure gradientColor is provided; not all frame types support gradient

**Issue:** Cannot remove applied frame
- **Solution:** Apply new frame over existing or reload image without frame
