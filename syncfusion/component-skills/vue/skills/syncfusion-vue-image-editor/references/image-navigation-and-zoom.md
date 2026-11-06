# Image Navigation and Zoom Controls

## Panning (Moving Images)

Click and drag the image across the canvas to reposition it. Panning is useful when the image is zoomed in and you want to see different areas of the image.

**When panning is enabled:**
- Image is selected (for cropping)
- Image is zoomed beyond canvas size

### Programmatic Panning

```javascript
// Pan the image by clicking and dragging
// This is handled automatically by the component
```

## Zoom Operations

### Zoom In

Increase the magnification level to see image details:

```javascript
const imageEditor = imageEditorObj.value?.ej2Instances;
imageEditor.zoomIn();
```

### Zoom Out

Decrease the magnification level:

```javascript
imageEditor.zoomOut();
```

### Set Zoom Level

Set a specific zoom level (1 = 100%, 2 = 200%, etc.):

```javascript
imageEditor.zoom(1.5); // 150% zoom
```

## Keyboard Shortcuts for Zoom

| Shortcut | Action |
|----------|--------|
| `Ctrl + +` | Zoom in |
| `Ctrl + -` | Zoom out |
| `Ctrl + Scroll` | Mouse wheel zoom |

### Keyboard Zoom Implementation

```javascript
// Keyboard shortcuts are handled automatically
// Users can press Ctrl++ to zoom in
// Users can press Ctrl+- to zoom out
```

## Mouse Wheel Zoom

Hold `Ctrl` and scroll your mouse wheel to zoom in/out:

```
1. Hold Ctrl key
2. Scroll mouse wheel up (zoom in) or down (zoom out)
```

This is handled automatically by the component.

## Touch Device Pinch Zoom

On touch-enabled devices, users can perform pinch zoom gestures:

```
1. Place two fingers on the image
2. Pinch inward (zoom out) or spread outward (zoom in)
```

## Programmatic Zoom Methods

### Zoom In with Method

```javascript
const imageEditor = imageEditorObj.value?.ej2Instances;
imageEditor.zoomIn();
```

### Zoom Out with Method

```javascript
imageEditor.zoomOut();
```

### Set Exact Zoom Level

```javascript
// Set zoom to 100% (original size)
imageEditor.zoom(1);

// Set zoom to 200%
imageEditor.zoom(2);

// Set zoom to 150%
imageEditor.zoom(1.5);

// Set zoom to 50%
imageEditor.zoom(0.5);
```

## Zoom to Fit Strategies

### Fit Image to Width

Scale the image to fit the editor width:

```javascript
const imageEditor = imageEditorObj.value?.ej2Instances;
imageEditor.zoom(1); // Reset to original
const containerWidth = imageEditor.upperCanvas.width;
const { width: originalWidth } = imageEditor.getImageDimension();

let zoomFactor = containerWidth / originalWidth;
imageEditor.zoom(zoomFactor);
```

### Fit Image to Height

Scale the image to fit the editor height:

```javascript
const containerHeight = imageEditor.upperCanvas.height;
const { height: originalHeight } = imageEditor.getImageDimension();

let zoomFactor = containerHeight / originalHeight;
imageEditor.zoom(zoomFactor);
```

## Complete Zoom Control Example

```vue
<template>
  <div>
    <div>
      <button @click="handleZoomIn">Zoom In</button>
      <button @click="handleZoomOut">Zoom Out</button>
      <button @click="handleZoomReset">Reset Zoom</button>
      <button @click="handleFitWidth">Fit Width</button>
      <button @click="handleFitHeight">Fit Height</button>
      <span>Zoom: {{ zoomLevel }}%</span>
    </div>
    <ejs-imageeditor 
      ref="imageEditorObj" 
      height="500px"
      width="100%"
      :created="onCreated"
    ></ejs-imageeditor>
  </div>
</template>

<script setup>
import { ImageEditorComponent } from "@syncfusion/ej2-vue-image-editor";
import { Browser } from "@syncfusion/ej2-base";
import { ref } from "vue";

const imageEditorObj = ref(null);
const zoomLevel = ref(100);

const onCreated = () => {
  const imageEditor = imageEditorObj.value?.ej2Instances;
  if (!imageEditor) return;
  const imageUrl = Browser.isDevice
    ? "https://ej2.syncfusion.com/vue/documentation/image-editor/images/flower.jpeg"
    : "https://ej2.syncfusion.com/vue/documentation/image-editor/images/bridge.jpeg";
  imageEditor.open(imageUrl);
};

const handleZoomIn = () => {
  const imageEditor = imageEditorObj.value?.ej2Instances;
  imageEditor.zoomIn();
  zoomLevel.value = Math.round(zoomLevel.value * 1.2);
};

const handleZoomOut = () => {
  const imageEditor = imageEditorObj.value?.ej2Instances;
  imageEditor.zoomOut();
  zoomLevel.value = Math.round(zoomLevel.value / 1.2);
};

const handleZoomReset = () => {
  const imageEditor = imageEditorObj.value?.ej2Instances;
  imageEditor.zoom(1);
  zoomLevel.value = 100;
};

const handleFitWidth = () => {
  const imageEditor = imageEditorObj.value?.ej2Instances;
  imageEditor.zoom(1);
  const containerWidth = imageEditor.upperCanvas.width;
  const { width: originalWidth } = imageEditor.getImageDimension();
  let factor = containerWidth / originalWidth;
  imageEditor.zoom(factor);
  zoomLevel.value = Math.round(factor * 100);
};

const handleFitHeight = () => {
  const imageEditor = imageEditorObj.value?.ej2Instances;
  imageEditor.zoom(1);
  const containerHeight = imageEditor.upperCanvas.height;
  const { height: originalHeight } = imageEditor.getImageDimension();
  let factor = containerHeight / originalHeight;
  imageEditor.zoom(factor);
  zoomLevel.value = Math.round(factor * 100);
};
</script>
```

## Combining Navigation and Zoom

Users can combine operations for effective image exploration:

1. **Zoom in** to see details
2. **Pan** (drag) to navigate within the zoomed area
3. **Zoom out** to see the full image
4. **Fit Width/Height** for optimal viewing

All operations work together seamlessly to provide a complete navigation experience.
