# Selection and Cropping

## Table of Contents
- [Selection Types](#selection-types)
- [Cropping Workflow](#cropping-workflow)
- [Aspect Ratio Constraints](#aspect-ratio-constraints)
- [Selection Manipulation](#selection-manipulation)
- [Advanced Cropping](#advanced-cropping)
- [Common Patterns](#common-patterns)

## Selection Types

### Enable Crop Tool

Activate cropping with selection options:

```typescript
import { ImageEditor } from '@syncfusion/ej2-image-editor';

const imageEditor = new ImageEditor({
    toolbar: ['Crop']
});

imageEditor.appendTo('#imageeditor');

// User clicks Crop button to start selection
```

### Selection Type Options

Available selection shapes:

| Type | Shape | Use Case |
|------|-------|----------|
| Custom | Free rectangle | Any region |
| Circle | Perfect circle | Round images |
| Square | Perfect square | Equal aspect ratio |
| Ratio | Custom ratio | 16:9, 4:3, 1:1 |

### Custom Selection

Free-form rectangular selection:

```typescript
// User clicks Crop → Selection Type → Custom
// Then draws rectangle on image
// Can resize by dragging edges/corners
```

### Circle Selection

Round selection area:

```typescript
// User clicks Crop → Selection Type → Circle
// Then draws circle on image
// Aspect ratio is 1:1 (perfect circle)
```

### Square Selection

Square selection with equal sides:

```typescript
// User clicks Crop → Selection Type → Square
// Maintains equal width and height
// Useful for icon/avatar cropping
```

### Ratio-Based Selection

Constrain to specific aspect ratios:

```typescript
// Available presets:
// - 16:9 (Widescreen)
// - 4:3 (Standard)
// - 1:1 (Square)
// - 3:2 (Classic photo)
// - Custom ratio input

// User selects ratio from dropdown in crop toolbar
```

## Cropping Workflow

### Basic Crop Process

```typescript
const imageEditor = new ImageEditor({
    toolbar: ['Crop']
});

// Step 1: User clicks Crop button
// Step 2: Contextual toolbar appears with selection options
// Step 3: User selects selection type (Custom, Circle, Square, Ratio)
// Step 4: User draws selection on image
// Step 5: User can pan image to align crop region
// Step 6: User clicks ✓ (check mark) to apply crop
// OR clicks ✗ (X) to cancel
```

### Crop via Programmatic Selection

Use `select()` to define the crop region, then call `crop()` to apply it:

```typescript
const dimension = imageEditor.getImageDimension();

// Step 1: Select the region to crop
imageEditor.select(
    'Custom',               // selection type
    dimension.x + 100,      // x
    dimension.y + 100,      // y
    300,                    // width
    300                     // height
);

// Step 2: Apply the crop
imageEditor.crop();
```

### Crop with Specific Dimensions

```typescript
const dimension = imageEditor.getImageDimension();

// Select a 400x300 region starting at offset (50, 50)
imageEditor.select('Custom', dimension.x + 50, dimension.y + 50, 400, 300);

// Apply the crop
imageEditor.crop();
```

## Aspect Ratio Constraints

### Preset Aspect Ratios

```typescript
const presetRatios = {
    'Free': null,
    '1:1': 1,
    '4:3': 4/3,
    '16:9': 16/9,
    '3:2': 3/2,
    '2:3': 2/3
};

// User selects from toolbar dropdown
// Selection box maintains chosen ratio
```

### Custom Aspect Ratio

```typescript
// User can input custom ratio
// Example: 5:4 ratio
// Selection maintains 5:4 proportions as user resizes

// Custom ratio entry field in crop toolbar
```

### Apply Aspect Ratio Constraint

```typescript
function cropWithRatio(imageEditor: ImageEditor, ratio: number) {
    const dim = imageEditor.getImageDimension();

    // Calculate dimensions maintaining ratio
    let width = 300;
    let height = width / ratio;

    // Ensure doesn't exceed image bounds
    if (height > dim.height) {
        height = dim.height;
        width = height * ratio;
    }

    // Center the selection within the image
    const x = dim.x + (dim.width - width) / 2;
    const y = dim.y + (dim.height - height) / 2;

    // Select then crop
    imageEditor.select('Custom', x, y, width, height);
    imageEditor.crop();
}

cropWithRatio(imageEditor, 16 / 9);  // Crop to 16:9
```

## Selection Manipulation

### Move Selection

Drag selection to different position:

```typescript
// User can click inside selection and drag to move
// Useful for positioning crop area on specific region
// Works automatically with selection enabled
```

### Resize Selection

Adjust selection dimensions:

```typescript
// User drags edges/corners to resize
// If ratio constraint active, maintains ratio
// Works automatically with selection enabled
```

### Selection Handles

```typescript
// Visual handles appear on selection:
// - 4 corners for diagonal resize
// - 4 edges for horizontal/vertical resize
// - Center for movement
// All are interactive by default
```

## Advanced Cropping

### Pan Image Within Selection

Move image to position crop region:

```typescript
// When crop selection active:
// 1. User can click outside selection to pan image
// 2. OR hold spacebar and drag to pan
// 3. Aligns image to desired crop position
```

### Preview Crop Result

```typescript
// Crop dialog shows:
// - Selection outline on image
// - Area outside selection dimmed
// - Aspect ratio maintained if constrained
// - Real-time preview as user adjusts
```

### Apply Rotation During Crop

```typescript
// In crop contextual toolbar:
// 1. Rotate button for 90° increments
// 2. Flip buttons for mirror operations
// 3. Straighten slider for fine angle adjustment
// 4. All applied before crop finalizes
```

### Straighten While Cropping

```typescript
// Straighten slider appears in crop context menu
// - Adjusts image angle before cropping
// - Typically range: -45° to +45°
// - Click apply to accept straightening
```

## Common Patterns

### Pattern: Crop to Square Avatar

```typescript
function cropToSquareAvatar(imageEditor: ImageEditor) {
    const dimension = imageEditor.getImageDimension();
    const minDim = Math.min(dimension.width, dimension.height);

    // Center the square selection
    const x = dimension.x + (dimension.width - minDim) / 2;
    const y = dimension.y + (dimension.height - minDim) / 2;

    // Select square region then crop
    imageEditor.select('Custom', x, y, minDim, minDim);
    imageEditor.crop();
}
```

### Pattern: Crop to Common Aspect Ratios

```typescript
function setupRatioCropping(imageEditor: ImageEditor) {
    const ratios: Record<string, number> = {
        '16:9': 16 / 9,
        '4:3': 4 / 3,
        '1:1': 1,
        '3:2': 3 / 2
    };

    Object.entries(ratios).forEach(([label, ratio]) => {
        const button = document.createElement('button');
        button.textContent = label;
        button.onclick = () => {
            const dim = imageEditor.getImageDimension();
            let width = dim.width * 0.8;
            let height = width / ratio;

            if (height > dim.height * 0.8) {
                height = dim.height * 0.8;
                width = height * ratio;
            }

            const x = dim.x + (dim.width - width) / 2;
            const y = dim.y + (dim.height - height) / 2;

            imageEditor.select('Custom', x, y, width, height);
            imageEditor.crop();
        };
        document.getElementById('ratioControls').appendChild(button);
    });
}
```

### Pattern: Smart Center Crop

```typescript
function smartCenterCrop(imageEditor: ImageEditor, scale: number = 0.8) {
    const dimension = imageEditor.getImageDimension();

    const cropWidth = dimension.width * scale;
    const cropHeight = dimension.height * scale;

    const x = dimension.x + (dimension.width - cropWidth) / 2;
    const y = dimension.y + (dimension.height - cropHeight) / 2;

    imageEditor.select('Custom', Math.round(x), Math.round(y), Math.round(cropWidth), Math.round(cropHeight));
    imageEditor.crop();
}

// document.getElementById('smartCropBtn').onclick = () => smartCenterCrop(imageEditor);
```

### Pattern: Progressive Cropping with Undo

```typescript
function setupProgressiveCrop(imageEditor: ImageEditor) {
    document.getElementById('cropBtn').onclick = () => {
        const dimension = imageEditor.getImageDimension();

        // Select center 80% region and crop
        const w = dimension.width * 0.8;
        const h = dimension.height * 0.8;
        const x = dimension.x + (dimension.width - w) / 2;
        const y = dimension.y + (dimension.height - h) / 2;

        imageEditor.select('Custom', x, y, w, h);
        imageEditor.crop();
    };

    document.getElementById('undoCropBtn').onclick = () => {
        // Built-in undo restores previous state
        imageEditor.undo();
    };
}
```

### Pattern: Crop with Selection Event

```typescript
// Listen to selection changes via cropping event
imageEditor.addEventListener('cropping', (args) => {
    // args contains crop region info during cropping
    console.log('Cropping event fired', args);
});

// Select region and apply crop
const dim = imageEditor.getImageDimension();
imageEditor.select('Custom', dim.x + 50, dim.y + 50, 400, 300);
imageEditor.crop();
```

