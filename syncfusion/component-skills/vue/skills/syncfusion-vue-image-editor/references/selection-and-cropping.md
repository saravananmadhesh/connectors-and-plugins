# Selection and Cropping

## Selection Types

The Image Editor supports multiple selection shapes for precise region definition.

### Custom Selection

Free-form rectangular selection with custom dimensions:

```javascript
const imageEditor = imageEditorObj.value?.ej2Instances;
imageEditor.select('Custom', startX, startY, width, height);
```

**Parameters:**
- `startX` - X-coordinate of selection start point
- `startY` - Y-coordinate of selection start point
- `width` - Width of the selection area
- `height` - Height of the selection area

### Square Selection

Fixed-aspect selection (1:1 ratio):

```javascript
imageEditor.select('Square', 50, 50, 200, 200);
```

### Circle Selection

Elliptical/circular selection:

```javascript
imageEditor.select('Circle', 100, 100, 150, 150);
```

## Aspect Ratio Selections

Predefined aspect ratio selections for specific use cases:

| Ratio | Use Case |
|-------|----------|
| **2:3** | Vertical photos, portrait orientation |
| **3:2** | Horizontal photos, landscape orientation |
| **3:4** | Phone screen format |
| **4:3** | Standard TV/monitor format |
| **4:5** | Instagram portrait |
| **5:4** | Older monitor formats |
| **5:7** | Vintage photo format |
| **7:5** | Film format |
| **9:16** | Vertical video/story format |
| **16:9** | Standard widescreen/video format |

To use aspect ratio selections, specify the ratio type in the toolbar or UI selection interface.

## Selection Methods

### Using select() Method

```javascript
// Custom selection at specific coordinates
imageEditor.select('Custom', 100, 100, 300, 200);

// Wait for confirmation
```

### Programmatic Selection

```javascript
const imageEditor = imageEditorObj.value?.ej2Instances;

// Define a square region
imageEditor.select('Square', 0, 0, 300, 300);

// Define based on aspect ratio (toolbar handles this)
// User selects via UI: Custom, Square, Circle, or aspect ratios
```

## Cropping Workflow

### Step 1: Create Selection

Select the region you want to keep:

```javascript
imageEditor.select('Custom', 50, 50, 400, 300);
```

### Step 2: Confirm Crop

Apply the crop operation:

```javascript
imageEditor.crop();
```

### Complete Crop Example

```vue
<template>
  <div>
    <button @click="selectRegion">Select Region</button>
    <button @click="applyCrop">Crop</button>
    <ejs-imageeditor ref="imageEditorObj" height="500px" width="100%"></ejs-imageeditor>
  </div>
</template>

<script setup>
import { ImageEditorComponent } from "@syncfusion/ej2-vue-image-editor";
import { Browser } from "@syncfusion/ej2-base";
import { ref } from "vue";

const imageEditorObj = ref(null);

const selectRegion = () => {
  const imageEditor = imageEditorObj.value?.ej2Instances;
  // Create a square selection from coordinates (50,50) with dimensions 300x300
  imageEditor.select('Square', 50, 50, 300, 300);
};

const applyCrop = () => {
  const imageEditor = imageEditorObj.value?.ej2Instances;
  imageEditor.crop();
};
</script>
```

## Selection Best Practices

### 1. Validate Coordinates

Ensure selection coordinates are within image bounds:

```javascript
const imageEditor = imageEditorObj.value?.ej2Instances;
const { width: imgWidth, height: imgHeight } = imageEditor.getImageDimension();

// Ensure selection stays within bounds
const maxX = 100;
const maxY = 100;
const maxWidth = Math.min(300, imgWidth - maxX);
const maxHeight = Math.min(300, imgHeight - maxY);

imageEditor.select('Custom', maxX, maxY, maxWidth, maxHeight);
```

### 2. Aspect Ratio Calculations

Calculate dimensions to maintain aspect ratio:

```javascript
// To maintain 16:9 aspect ratio
const width = 640;
const height = 360; // (640 * 9) / 16

imageEditor.select('Custom', 0, 0, width, height);
```

### 3. User-Friendly Selection

Let users interact with the toolbar for intuitive selection:

```vue
<template>
  <ejs-imageeditor
    ref="imageEditorObj"
    :toolbar="['Crop', 'CustomSelection', 'SquareSelection']"
  ></ejs-imageeditor>
</template>
```

## Common Crop Scenarios

### Crop to 1:1 Square

```javascript
const imageEditor = imageEditorObj.value?.ej2Instances;
const size = Math.min(imageEditor.upperCanvas.width, imageEditor.upperCanvas.height);
imageEditor.select('Square', 0, 0, size, size);
imageEditor.crop();
```

### Crop to 16:9 Widescreen

```javascript
const imageEditor = imageEditorObj.value?.ej2Instances;
const width = imageEditor.upperCanvas.width;
const height = (width * 9) / 16;
imageEditor.select('Custom', 0, 0, width, height);
imageEditor.crop();
```

### Crop to 4:3 Standard

```javascript
const width = 400;
const height = 300; // (400 * 3) / 4
imageEditor.select('Custom', 50, 50, width, height);
imageEditor.crop();
```

## Undoing Crop Operations

Crop operations are tracked in the undo/redo history:

```javascript
// Undo the last crop
imageEditor.undo();

// Redo if undone
imageEditor.redo();
```

## Selection UI Integration

The Image Editor provides built-in UI for selection:

```vue
<template>
  <ejs-imageeditor
    :toolbar="['Crop', 'CustomSelection', 'SquareSelection', 'Undo', 'Redo']"
  ></ejs-imageeditor>
</template>
```

Users can then:
1. Click "CustomSelection" or "SquareSelection" from toolbar
2. Drag to define the region
3. Adjust selection by dragging edges
4. Click checkmark to confirm
5. Use Undo if needed
