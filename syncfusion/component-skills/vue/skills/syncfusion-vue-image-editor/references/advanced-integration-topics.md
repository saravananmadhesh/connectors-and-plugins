# Advanced Integration Topics

## Table of Contents
- [Clearing Image State](#clearing-image-state)
- [Fitting to Width and Height](#fitting-to-width-and-height)
- [Rendering in Dialog Modal](#rendering-in-dialog-modal)
- [Resetting to Original Image](#resetting-to-original-image)
- [Image Restrictions](#image-restrictions)
- [Canvas Management](#canvas-management)
- [Performance Optimization](#performance-optimization)

## Clearing Image State

### clearImage() Method

Clear the current image from the editor, useful when reusing the editor:

```javascript
const imageEditor = imageEditorObj.value?.ej2Instances;
imageEditor.clearImage();
```

**When to use:**
- Reusing the same editor instance for different images
- Closing an image editor dialog
- Resetting editor before opening new image

### Complete Clear Example

```vue
<template>
  <div>
    <button @click="loadImage">Load Image</button>
    <button @click="clearImage">Clear</button>
    <ejs-imageeditor 
      ref="imageEditorObj" 
      height="500px" 
      width="100%"
    ></ejs-imageeditor>
  </div>
</template>

<script setup>
import { ImageEditorComponent } from "@syncfusion/ej2-vue-image-editor";
import { ref } from "vue";

const imageEditorObj = ref(null);

const loadImage = () => {
  const imageEditor = imageEditorObj.value?.ej2Instances;
  imageEditor.open('https://ej2.syncfusion.com/vue/documentation/image-editor/images/bridge.jpeg');
};

const clearImage = () => {
  const imageEditor = imageEditorObj.value?.ej2Instances;
  imageEditor.clearImage();
};
</script>
```

## Fitting to Width and Height

### Fit to Width

Scale image to match editor width:

```javascript
const imageEditor = imageEditorObj.value?.ej2Instances;

// Reset zoom to 100% first
imageEditor.zoom(1);

// Get container width
const containerWidth = imageEditor.upperCanvas.width;

// Get original image dimensions
const { width: originalWidth } = imageEditor.getImageDimension();

// Calculate zoom factor
const zoomFactor = containerWidth / originalWidth;

// Apply zoom
imageEditor.zoom(zoomFactor);
```

### Fit to Height

Scale image to match editor height:

```javascript
const imageEditor = imageEditorObj.value?.ej2Instances;

imageEditor.zoom(1);  // Reset

const containerHeight = imageEditor.upperCanvas.height;
const { height: originalHeight } = imageEditor.getImageDimension();

const zoomFactor = containerHeight / originalHeight;
imageEditor.zoom(zoomFactor);
```

### Complete Fit Example

```vue
<template>
  <div>
    <button @click="fitToWidth">Fit Width</button>
    <button @click="fitToHeight">Fit Height</button>
    <button @click="fitBoth">Fit Both (Smart)</button>
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

const onCreated = () => {
  const imageEditor = imageEditorObj.value?.ej2Instances;
  if (!imageEditor) return;
  const imageUrl = Browser.isDevice
    ? "https://ej2.syncfusion.com/vue/documentation/image-editor/images/flower.jpeg"
    : "https://ej2.syncfusion.com/vue/documentation/image-editor/images/bridge.jpeg";
  imageEditor.open(imageUrl);
};

const fitToWidth = () => {
  const imageEditor = imageEditorObj.value?.ej2Instances;
  imageEditor.zoom(1);
  const containerWidth = imageEditor.upperCanvas.width;
  const { width: originalWidth } = imageEditor.getImageDimension();
  imageEditor.zoom(containerWidth / originalWidth);
};

const fitToHeight = () => {
  const imageEditor = imageEditorObj.value?.ej2Instances;
  imageEditor.zoom(1);
  const containerHeight = imageEditor.upperCanvas.height;
  const { height: originalHeight } = imageEditor.getImageDimension();
  imageEditor.zoom(containerHeight / originalHeight);
};

const fitBoth = () => {
  const imageEditor = imageEditorObj.value?.ej2Instances;
  imageEditor.zoom(1);
  const containerWidth = imageEditor.upperCanvas.width;
  const containerHeight = imageEditor.upperCanvas.height;
  const { width: originalWidth, height: originalHeight } = imageEditor.getImageDimension();
  
  const widthRatio = containerWidth / originalWidth;
  const heightRatio = containerHeight / originalHeight;
  
  // Use the smaller ratio to fit both dimensions
  const zoomFactor = Math.min(widthRatio, heightRatio);
  imageEditor.zoom(zoomFactor);
};
</script>

<style>
button {
  margin: 5px;
  padding: 8px 12px;
}
</style>
```

## Rendering in Dialog Modal

### Dialog Setup

Render Image Editor inside a Syncfusion Dialog:

```vue
<template>
  <div>
    <button @click="openDialog">Open Editor Dialog</button>
    <ejs-dialog 
      ref="dialogRef"
      :isModal="true"
      width="700px"
      height="600px"
      :visible="dialogVisible"
      :closeOnEscape="true"
      @overlayClick="closeDialog"
    >
      <ejs-imageeditor
        ref="imageEditorRef"
        height="500px"
        width="100%"
      ></ejs-imageeditor>
      <div style="margin-top: 10px;">
        <button @click="saveAndClose">Save & Close</button>
        <button @click="closeDialog">Cancel</button>
      </div>
    </ejs-dialog>
  </div>
</template>

<script setup>
import { ref, nextTick } from "vue";
import { DialogComponent } from "@syncfusion/ej2-vue-popups";
import { ImageEditorComponent } from "@syncfusion/ej2-vue-image-editor";
import { ButtonComponent } from "@syncfusion/ej2-vue-buttons";

const dialogRef = ref(null);
const imageEditorRef = ref(null);
const dialogVisible = ref(false);

const openDialog = async () => {
  dialogVisible.value = true;
  await nextTick();
  
  setTimeout(() => {
    if (imageEditorRef.value?.ej2Instances) {
      imageEditorRef.value.ej2Instances.open(
        "https://ej2.syncfusion.com/vue/documentation/image-editor/images/flower.jpeg"
      );
    }
  }, 10);
};

const closeDialog = () => {
  const imageEditor = imageEditorRef.value?.ej2Instances;
  if (imageEditor) {
    imageEditor.clearImage();  // Clear before closing
  }
  dialogVisible.value = false;
};

const saveAndClose = () => {
  const imageEditor = imageEditorRef.value?.ej2Instances;
  imageEditor.save();
  closeDialog();
};
</script>

<style scoped>
button {
  margin: 5px;
  padding: 8px 12px;
}
</style>
```

## Resetting to Original Image

### reset() Method

Discard all edits and revert to original image:

```javascript
const imageEditor = imageEditorObj.value?.ej2Instances;
imageEditor.reset();
```

**What gets reset:**
- All annotations removed
- Transformations reverted
- Filters cleared
- Fine-tuning adjustments removed
- Frames removed
- Undo/redo history cleared

### Complete Reset Example

```vue
<template>
  <div>
    <button @click="addEdits">Add Edits</button>
    <button @click="undoLastEdit">Undo Last Edit</button>
    <button @click="resetAll">Reset All Changes</button>
    <p>{{ editStatus }}</p>
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
const editStatus = ref('Original image loaded');

const onCreated = () => {
  const imageEditor = imageEditorObj.value?.ej2Instances;
  if (!imageEditor) return;
  const imageUrl = Browser.isDevice
    ? "https://ej2.syncfusion.com/vue/documentation/image-editor/images/flower.jpeg"
    : "https://ej2.syncfusion.com/vue/documentation/image-editor/images/bridge.jpeg";
  imageEditor.open(imageUrl);
};

const addEdits = () => {
  const imageEditor = imageEditorObj.value?.ej2Instances;
  imageEditor.rotate(90);
  imageEditor.drawText(100, 100, 'Edited', 'Arial', 16);
  imageEditor.applyImageFilter('Sepia');
  editStatus.value = 'Multiple edits applied';
};

const undoLastEdit = () => {
  const imageEditor = imageEditorObj.value?.ej2Instances;
  imageEditor.undo();
  editStatus.value = 'Last edit undone';
};

const resetAll = () => {
  const imageEditor = imageEditorObj.value?.ej2Instances;
  imageEditor.reset();
  editStatus.value = 'All changes reset to original';
};
</script>

<style>
button {
  margin: 5px;
  padding: 8px 12px;
}

p {
  font-style: italic;
  margin-top: 10px;
}
</style>
```

## Image Restrictions

### Supported Formats

The Image Editor supports:
- **PNG** - Portable Network Graphics
- **JPEG/JPG** - Joint Photographic Experts Group
- **WEBP** - Modern format
- **BMP** - Bitmap
- **SVG** - Scalable Vector Graphics

### File Size Considerations

```javascript
// Check file size before loading
const MAX_FILE_SIZE = 5 * 1024 * 1024;  // 5MB

const validateImageFile = (file) => {
  if (file.size > MAX_FILE_SIZE) {
    console.error('File too large');
    return false;
  }
  
  const validTypes = ['image/png', 'image/jpeg', 'image/webp', 'image/bmp'];
  if (!validTypes.includes(file.type)) {
    console.error('Invalid file type');
    return false;
  }
  
  return true;
};
```

### Dimension Restrictions

```javascript
// Validate image dimensions
const validateDimensions = (width, height) => {
  const MIN_WIDTH = 100;
  const MAX_WIDTH = 4000;
  const MIN_HEIGHT = 100;
  const MAX_HEIGHT = 4000;
  
  if (width < MIN_WIDTH || width > MAX_WIDTH) {
    return false;
  }
  if (height < MIN_HEIGHT || height > MAX_HEIGHT) {
    return false;
  }
  
  return true;
};
```

## Canvas Management

### Get Canvas Information

```javascript
const imageEditor = imageEditorObj.value?.ej2Instances;

// Get canvas dimensions
const canvas = imageEditor.upperCanvas;
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

// Get image dimensions
const { width: imgWidth, height: imgHeight } = imageEditor.getImageDimension();

console.log(`Canvas: ${canvasWidth}x${canvasHeight}`);
console.log(`Image: ${imgWidth}x${imgHeight}`);
```

### Resize Canvas

```javascript
// Adjust canvas size
const imageEditor = imageEditorObj.value?.ej2Instances;

// Canvas typically resizes automatically with container
// But you can force specific dimensions
const newCanvasHeight = 600;
const newCanvasWidth = 800;

// This depends on the parent container sizing
```

## Performance Optimization

### Lazy Loading Images

```vue
<script setup>
import { ref } from "vue";

const imageSrc = ref(null);

const loadImageLazy = (url) => {
  // Load image only when needed
  imageSrc.value = url;
};
</script>
```

### Optimize File Size

```javascript
// Use appropriate formats for export
const exportImage = (format) => {
  const imageEditor = imageEditorObj.value?.ej2Instances;
  
  imageEditor.toBlob((blob) => {
    console.log(`Original size: ${blob.size} bytes`);
    
    // Smaller formats: WEBP > JPEG > PNG
    if (format === 'webp') {
      // WEBP typically smallest
    } else if (format === 'jpeg') {
      // JPEG good for photos
    } else {
      // PNG good for graphics with transparency
    }
  });
};
```

### Memory Management

```javascript
// Clear unused resources
const cleanupEditor = () => {
  const imageEditor = imageEditorObj.value?.ej2Instances;
  
  // Clear image
  imageEditor.clearImage();
  
  // This frees memory
};
```

## Complete Advanced Example

```vue
<template>
  <div>
    <h2>Advanced Image Editor</h2>
    <div class="controls">
      <button @click="performAdvancedWorkflow">Advanced Workflow</button>
      <button @click="showStatus">Show Status</button>
    </div>
    <ejs-imageeditor 
      ref="imageEditorObj" 
      height="500px" 
      width="100%"
      :created="onCreated"
    ></ejs-imageeditor>
    <div v-if="statusInfo" class="status">
      {{ statusInfo }}
    </div>
  </div>
</template>

<script setup>
import { ImageEditorComponent } from "@syncfusion/ej2-vue-image-editor";
import { ref } from "vue";

const imageEditorObj = ref(null);
const statusInfo = ref('');

const onCreated = () => {
  const imageEditor = imageEditorObj.value?.ej2Instances;
  if (!imageEditor) return;
  imageEditor.open(
    "https://ej2.syncfusion.com/vue/documentation/image-editor/images/bridge.jpeg"
  );
};

const performAdvancedWorkflow = () => {
  const imageEditor = imageEditorObj.value?.ej2Instances;
  
  // 1. Get image info
  const { width, height } = imageEditor.getImageDimension();
  
  // 2. Perform edits
  imageEditor.rotate(90);
  imageEditor.drawText(width / 2 - 50, height / 2, 'EDITED', 'Arial', 24);
  imageEditor.applyImageFilter('Sepia');
  
  // 3. Export
  imageEditor.toBlob((blob) => {
    statusInfo.value = `Processed image: ${blob.size} bytes`;
  });
};

const showStatus = () => {
  const imageEditor = imageEditorObj.value?.ej2Instances;
  const { width, height } = imageEditor.getImageDimension();
  const shapes = imageEditor.getShapes();
  
  statusInfo.value = `
    Image: ${width}x${height}px
    Annotations: ${shapes.length}
  `;
};
</script>

<style scoped>
.controls {
  margin: 10px 0;
}

button {
  margin: 5px;
  padding: 8px 12px;
}

.status {
  margin-top: 10px;
  padding: 10px;
  background-color: #f0f0f0;
  border-radius: 4px;
  white-space: pre-wrap;
  font-family: monospace;
}
</style>
```

## Best Practices Summary

1. **Always clear** before closing dialogs
2. **Reset appropriately** for fresh starts
3. **Check dimensions** before processing
4. **Fit intelligently** to container sizes
5. **Handle errors** gracefully
6. **Optimize exports** for different use cases
7. **Test performance** with large images
