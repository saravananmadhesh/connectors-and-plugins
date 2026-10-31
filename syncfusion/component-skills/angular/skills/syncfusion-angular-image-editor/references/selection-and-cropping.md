# Selection and Cropping in Angular Image Editor

## Table of Contents
- [Selection Types](#selection-types)
- [Aspect Ratio Selections](#aspect-ratio-selections)
- [Cropping Operations](#cropping-operations)
- [Selection Events](#selection-events)
- [Advanced Cropping](#advanced-cropping)

---

## Selection Types

### Custom Selection

Create a custom rectangular selection with specified dimensions:

```typescript
selectCustomRegion() {
  this.imageEditor?.select(
    'Custom',   // type
    50,         // startX
    50,         // startY
    300,        // width
    200         // height
  );
}
```

### Square Selection

Create a perfect square selection:

```typescript
selectSquare() {
  this.imageEditor?.select(
    'Square',   // type
    100,        // startX
    100,        // startY
    200,        // width/height (must be equal)
    200
  );
}
```

### Circle Selection

Create a circular selection:

```typescript
selectCircle() {
  this.imageEditor?.select(
    'Circle',   // type
    150,        // startX (center)
    150,        // startY (center)
    100,        // radiusX
    100         // radiusY
  );
}
```

### Interactive Selection

Allow users to create selections through the UI toolbar:

```typescript
@Component({
  template: `
    <ejs-imageeditor 
      [toolbar]="['Crop', 'RotateLeft', 'RotateRight']"
    ></ejs-imageeditor>
    <button (click)="triggerCrop()">Crop Tool</button>
  `
})
export class InteractiveSelectionComponent {
  @ViewChild('imageEditor') imageEditor?: ImageEditorComponent;

  triggerCrop() {
    // User can then draw selection on canvas
    this.imageEditor?.freehandDraw(); // Or use toolbar
  }
}
```

---

## Aspect Ratio Selections

Selections locked to specific aspect ratios.

### Predefined Ratios

```typescript
selectWithRatio(ratio: string) {
  // Supported ratios: '2:3', '3:2', '3:4', '4:3', '4:5', 
  // '5:4', '5:7', '7:5', '9:16', '16:9'
  
  this.imageEditor?.select(
    ratio,      // e.g., '16:9'
    100,        // startX
    100         // startY
  );
}

// Examples:
selectPrint() {
  this.imageEditor?.select('2:3', 50, 50);  // Print format
}

selectLandscape() {
  this.imageEditor?.select('16:9', 50, 50); // Widescreen
}

selectPortrait() {
  this.imageEditor?.select('9:16', 50, 50); // Portrait
}

selectSquare() {
  this.imageEditor?.select('1:1', 50, 50);  // Square
}
```

### Custom Ratio Selections

```typescript
selectCustomRatio(widthRatio: number, heightRatio: number) {
  // Select with custom ratio like 3:2 (1.5:1)
  const ratio = `${widthRatio}:${heightRatio}`;
  this.imageEditor?.select(ratio, 100, 100);
}

// Example: 3:2 aspect ratio
selectThreeToTwo() {
  this.selectCustomRatio(3, 2);
}
```

---

## Cropping Operations

### Crop Selection

Crop the currently selected region:

```typescript
cropImage() {
  this.imageEditor?.crop();
}
```

### Crop with Custom Selection

```typescript
cropWithCustomRegion() {
  // Select region
  this.imageEditor?.select('Custom', 50, 50, 300, 200);
  
  // Crop the selection
  this.imageEditor?.crop();
}
```

### Crop with Aspect Ratio

```typescript
cropCircular() {
  // Select circular region
  this.imageEditor?.select('Circle', 200, 200, 150, 150);
  
  // Crop to circle
  this.imageEditor?.crop();
}
```

### Combined with Transformations

```typescript
cropAndRotate() {
  // Select region
  this.imageEditor?.select('Custom', 50, 50, 300, 200);
  
  // Crop
  this.imageEditor?.crop();
  
  // Then rotate
  this.imageEditor?.rotate(90);
  
  // Then flip
  this.imageEditor?.flip('Horizontal');
}
```

---

## Selection Events

### Cropping Event Handler

Handle cropping operations and enforce constraints:

```typescript
@Component({
  template: `
    <ejs-imageeditor 
      [cropping]="onCropping"
    ></ejs-imageeditor>
  `
})
export class CroppingEventComponent {
  onCropping(args: any) {
    console.log('Start Point:', args.startPoint);
    console.log('End Point:', args.endPoint);
    
    // Can set args.cancel = true to prevent cropping
    // Can set args.preventScaling = true to maintain original size
  }
}
```

### Maintain Original Size During Cropping

Prevent automatic scaling during crop operations:

```typescript
@Component({
  template: `
    <ejs-imageeditor 
      [cropping]="onCropping"
    ></ejs-imageeditor>
  `
})
export class PreventScalingComponent {
  onCropping(args: any) {
    // Keep original size without enlargement
    args.preventScaling = true;
  }
}
```

### Selection Changing Event

Monitor selection changes as user resizes:

```typescript
@Component({
  template: `
    <ejs-imageeditor 
      [selectionChanging]="onSelectionChanging"
    ></ejs-imageeditor>
  `
})
export class SelectionChangingComponent {
  onSelectionChanging(args: any) {
    console.log('Action:', args.action); // 'insert' or 'resize'
    console.log('Current:', args.currentSelectionPoint);
    console.log('Previous:', args.previousSelectionPoint);
  }
}
```

---

## Advanced Cropping

### Lock Selection During Editing

Prevent users from resizing the selection:

```typescript
@Component({
  template: `
    <ejs-imageeditor 
      [selectionChanging]="onSelectionChanging"
    ></ejs-imageeditor>
  `
})
export class LockSelectionComponent {
  onSelectionChanging(args: any) {
    if (args.action === 'resize') {
      // Lock selection by reverting changes
      args.currentSelectionPoint = args.previousSelectionPoint;
    }
  }
}
```

### Enforce Minimum Selection Size

```typescript
@Component({
  template: `
    <ejs-imageeditor 
      [selectionChanging]="onSelectionChanging"
    ></ejs-imageeditor>
  `
})
export class MinimumSizeComponent {
  MIN_WIDTH = 100;
  MIN_HEIGHT = 100;

  onSelectionChanging(args: any) {
    const currentSelection = args.currentSelectionPoint;
    
    if (currentSelection.width < this.MIN_WIDTH || 
        currentSelection.height < this.MIN_HEIGHT) {
      // Revert to previous selection
      args.currentSelectionPoint = args.previousSelectionPoint;
    }
  }
}
```

### Custom Ratio Selection During Cropping

```typescript
@Component({
  template: `
    <ejs-imageeditor 
      [selectionChanging]="onSelectionChanging"
    ></ejs-imageeditor>
  `
})
export class CustomRatioComponent {
  TARGET_RATIO = 16 / 9; // 16:9 ratio

  onSelectionChanging(args: any) {
    const selection = args.currentSelectionPoint;
    const currentRatio = selection.width / selection.height;

    // If ratio doesn't match, adjust height
    if (Math.abs(currentRatio - this.TARGET_RATIO) > 0.01) {
      const newHeight = selection.width / this.TARGET_RATIO;
      selection.height = newHeight;
    }
  }
}
```

### Programmatic Crop with Validation

```typescript
@Component({
  template: `
    <button (click)="validateAndCrop()">Crop with Validation</button>
    <ejs-imageeditor #imageEditor></ejs-imageeditor>
  `
})
export class ValidatedCropComponent {
  @ViewChild('imageEditor') imageEditor?: ImageEditorComponent;

  validateAndCrop() {
    // Create a selection first
    this.imageEditor?.select('Custom', 50, 50, 300, 200);
    
    // Crop the selection
    const result = this.imageEditor?.crop();
    
    if (result) {
      console.log('Crop successful');
    } else {
      console.warn('Crop failed');
    }
  }
}
```

---

## Complete Example: Image Cropper

```typescript
@Component({
  selector: 'app-image-cropper',
  template: `
    <div style="padding: 20px;">
      <div style="margin-bottom: 10px;">
        <button (click)="selectSquare()">Square</button>
        <button (click)="select16to9()">16:9</button>
        <button (click)="selectCircle()">Circle</button>
        <button (click)="cropImage()">Crop</button>
        <button (click)="resetSelection()">Reset</button>
      </div>
      <div style="width: 600px; height: 400px;">
        <ejs-imageeditor 
          #imageEditor
          [selectionChanging]="onSelectionChanging"
        ></ejs-imageeditor>
      </div>
    </div>
  `
})
export class ImageCropperComponent {
  @ViewChild('imageEditor') imageEditor?: ImageEditorComponent;

  selectSquare() {
    this.imageEditor?.select('Square', 100, 100, 200, 200);
  }

  select16to9() {
    this.imageEditor?.select('16:9', 100, 100);
  }

  selectCircle() {
    this.imageEditor?.select('Circle', 300, 200, 150, 150);
  }

  cropImage() {
    this.imageEditor?.crop();
  }

  resetSelection() {
    // Clear selection by opening same image
    this.imageEditor?.open('current-image.png');
  }

  onSelectionChanging(args: any) {
    // Validate selection changes
    if (args.action === 'resize') {
      console.log('Selection resized');
    }
  }
}
```

---

## Edge Cases & Troubleshooting

**Issue:** Selection not maintaining aspect ratio
- **Solution:** Use predefined ratio string (e.g., '16:9') or enforce in `selectionChanging` event

**Issue:** Crop removes too much content
- **Solution:** Enable `preventScaling` in cropping event to maintain original size

**Issue:** Circle crop appears as ellipse
- **Solution:** Ensure radiusX equals radiusY for perfect circle

**Issue:** Selection locked but user can still drag
- **Solution:** Set `args.currentSelectionPoint = args.previousSelectionPoint` in selectionChanging event
