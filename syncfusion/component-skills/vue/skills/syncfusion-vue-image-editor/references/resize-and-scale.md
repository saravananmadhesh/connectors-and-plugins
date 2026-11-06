# Image Resizing and Scaling

## Resizing Images

The `resize()` method adjusts image dimensions:

```javascript
const imageEditor = imageEditorObj.value?.ej2Instances;

imageEditor.resize(
  width,           // New width in pixels
  height,          // New height in pixels
  isAspectRatio    // true = maintain aspect ratio, false = free resize
);
```

## Aspect Ratio Preservation

### Resizing with Aspect Ratio

Keep proportions when resizing:

```javascript
// Resize to 800px width, height adjusts automatically
imageEditor.resize(800, null, true);

// If original is 1600x1200, result will be 800x600 (4:3 ratio maintained)
```

**Behavior:** Width is applied exactly, height is calculated from aspect ratio.

### Free Resizing

Resize without maintaining aspect ratio:

```javascript
// Resize to exact dimensions
imageEditor.resize(800, 600, false);

// Result: 800x600 regardless of original aspect ratio
imageEditor.resize(640, 480, false);

// Can create stretched/squashed images
```

## Common Resize Scenarios

### Resize for Web Display

```javascript
// Standard web size: 1024x768
imageEditor.resize(1024, 768, true);

// HD size: 1280x720
imageEditor.resize(1280, 720, true);

// Mobile size: 480x360
imageEditor.resize(480, 360, true);
```

### Resize for Social Media

```javascript
// Instagram square: 1080x1080
imageEditor.resize(1080, 1080, false);

// Instagram story: 1080x1920
imageEditor.resize(1080, 1920, false);

// Twitter header: 1500x500
imageEditor.resize(1500, 500, false);

// Facebook cover: 820x312
imageEditor.resize(820, 312, false);
```

### Resize for Print

```javascript
// 4x6 inch at 300 DPI: 1200x1800
imageEditor.resize(1200, 1800, false);

// 8x10 inch at 300 DPI: 2400x3000
imageEditor.resize(2400, 3000, false);

// 5x7 inch at 300 DPI: 1500x2100
imageEditor.resize(1500, 2100, false);
```

## Complete Resize Example

```vue
<template>
  <div>
    <div>
      <h3>Resize Image</h3>
      <label>
        Width: <input v-model.number="width" type="number" min="100" max="4000">
      </label>
      <label>
        Height: <input v-model.number="height" type="number" min="100" max="4000">
      </label>
      <label>
        <input v-model="maintainAspect" type="checkbox"> Maintain Aspect Ratio
      </label>
      <button @click="performResize">Resize</button>
      <button @click="resetImage">Reset</button>
    </div>
    <ejs-imageeditor 
      ref="imageEditorObj" 
      height="500px" 
      width="100%"
      :toolbar="['Resize', 'Undo', 'Redo']"
      :created="onCreated"
    ></ejs-imageeditor>
  </div>
</template>

<script setup>
import { ImageEditorComponent } from "@syncfusion/ej2-vue-image-editor";
import { Browser } from "@syncfusion/ej2-base";
import { ref } from "vue";

const imageEditorObj = ref(null);
const width = ref(800);
const height = ref(600);
const maintainAspect = ref(true);

const onCreated = () => {
  const imageEditor = imageEditorObj.value?.ej2Instances;
  if (!imageEditor) return;
  const imageUrl = Browser.isDevice
    ? "https://ej2.syncfusion.com/vue/documentation/image-editor/images/flower.jpeg"
    : "https://ej2.syncfusion.com/vue/documentation/image-editor/images/bridge.jpeg";
  imageEditor.open(imageUrl);
};

const performResize = () => {
  const imageEditor = imageEditorObj.value?.ej2Instances;
  imageEditor.resize(width.value, height.value, maintainAspect.value);
};

const resetImage = () => {
  const imageEditor = imageEditorObj.value?.ej2Instances;
  imageEditor.undo();
};
</script>

<style>
label {
  display: block;
  margin: 10px 0;
}

input[type="number"] {
  width: 100px;
  margin: 0 10px;
}

button {
  margin: 5px;
  padding: 8px 12px;
}
</style>
```

## Preset Resizing

```vue
<template>
  <div>
    <div>
      <button @click="applyPreset('web')">Web (1024x768)</button>
      <button @click="applyPreset('mobile')">Mobile (480x360)</button>
      <button @click="applyPreset('hd')">HD (1280x720)</button>
      <button @click="applyPreset('instagram')">Instagram (1080x1080)</button>
      <button @click="applyPreset('twitter')">Twitter Header (1500x500)</button>
      <button @click="applyPreset('print')">Print 4x6 (1200x1800)</button>
    </div>
    <ejs-imageeditor ref="imageEditorObj" height="500px" width="100%"></ejs-imageeditor>
  </div>
</template>

<script setup>
import { ImageEditorComponent } from "@syncfusion/ej2-vue-image-editor";
import { ref } from "vue";

const imageEditorObj = ref(null);

const presets = {
  web: { width: 1024, height: 768, aspect: true },
  mobile: { width: 480, height: 360, aspect: true },
  hd: { width: 1280, height: 720, aspect: true },
  instagram: { width: 1080, height: 1080, aspect: false },
  twitter: { width: 1500, height: 500, aspect: false },
  print: { width: 1200, height: 1800, aspect: false }
};

const applyPreset = (presetName) => {
  const imageEditor = imageEditorObj.value?.ej2Instances;
  const preset = presets[presetName];
  imageEditor.resize(preset.width, preset.height, preset.aspect);
};
</script>

<style>
button {
  margin: 5px;
  padding: 8px 12px;
}
</style>
```

## Aspect Ratio Calculations

### Calculate Height from Width

```javascript
// Original aspect ratio 16:9
const originalWidth = 1920;
const originalHeight = 1080;
const aspectRatio = originalHeight / originalWidth;  // 0.5625

// Resize to 1280px width
const newWidth = 1280;
const newHeight = Math.round(newWidth * aspectRatio);  // 720

imageEditor.resize(newWidth, newHeight, true);
```

### Calculate Width from Height

```javascript
// Original aspect ratio 4:3
const originalWidth = 1024;
const originalHeight = 768;
const aspectRatio = originalWidth / originalHeight;  // 1.333

// Resize to 600px height
const newHeight = 600;
const newWidth = Math.round(newHeight * aspectRatio);  // 800

imageEditor.resize(newWidth, newHeight, true);
```

## Common Aspect Ratios

| Ratio | Use Case | Example Dimensions |
|-------|----------|-------------------|
| **1:1** | Square, Instagram | 1080x1080 |
| **4:3** | Standard, older monitors | 1024x768 |
| **3:2** | Photo, 35mm | 1200x800 |
| **16:9** | Widescreen, HD video | 1920x1080 |
| **9:16** | Vertical video, stories | 1080x1920 |
| **2:3** | Portrait, professional photos | 800x1200 |
| **16:10** | Desktop monitors | 1680x1050 |
| **21:9** | Ultrawide | 2560x1080 |

## Resize with Constraints

```javascript
// Maximum width for web (100% of container)
const maxWebWidth = 1200;
let resizeWidth = 1600;
if (resizeWidth > maxWebWidth) {
  resizeWidth = maxWebWidth;
  // Height will adjust with aspect ratio
}

imageEditor.resize(resizeWidth, null, true);
```

## Performance with Resizing

```javascript
// Large to small (fast)
imageEditor.resize(800, 600, true);  // Downsampling

// Small to large (may pixelate)
imageEditor.resize(2000, 1500, true);  // Upsampling

// Significant resize
imageEditor.resize(4000, 3000, true);  // High resolution
```

## History and Undo

All resize operations are tracked:

```javascript
// Apply resize
imageEditor.resize(800, 600, true);

// Undo resize
imageEditor.undo();

// Redo resize
imageEditor.redo();
```

## Best Practices

1. **Maintain Aspect** when resizing for natural look
2. **Downsize** rather than upsize (avoid pixelation)
3. **Use Presets** for common dimensions (web, social, print)
4. **Test Results** before saving
5. **Keep Original** reference for non-destructive edits
6. **Consider DPI** for print: 300 DPI for quality
