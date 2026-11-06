# Image Transformations

## Rotating Images

### Rotate by 90 Degrees Clockwise

```javascript
const imageEditor = imageEditorObj.value?.ej2Instances;
imageEditor.rotate(90);
```

### Rotate by 90 Degrees Counter-Clockwise

```javascript
imageEditor.rotate(-90);
```

### Rotate by 180 Degrees

```javascript
imageEditor.rotate(180);
```

### Rotate by Custom Angle

**Recommended:** Use multiples of 90° for proper alignment:

```javascript
imageEditor.rotate(90);   // 90°
imageEditor.rotate(180);  // 180°
imageEditor.rotate(270);  // 270° (or -90°)
imageEditor.rotate(-90);  // Counter-clockwise
```

**Note:** While custom angles are possible, multiples of 90° provide the best visual results.

## Flipping Images

### Horizontal Flip

Mirror the image left-to-right:

```javascript
const imageEditor = imageEditorObj.value?.ej2Instances;
imageEditor.flipHorizontal();
```

Use case: Correct mirrored photos or create symmetrical effects.

### Vertical Flip

Mirror the image top-to-bottom:

```javascript
imageEditor.flipVertical();
```

Use case: Upside-down correction or creative effects.

## Straightening Images

### Straighten Slider

The Image Editor provides a straightening slider in the toolbar for fine-tuning:

1. Click "Straightening" in the toolbar
2. Adjust the slider to correct skewed images
3. Click checkmark to apply

### Programmatic Straightening

```javascript
// Straightening is typically done via the UI toolbar
// The slider allows real-time adjustments
```

## Combining Transformations

You can apply multiple transformations sequentially:

```javascript
const imageEditor = imageEditorObj.value?.ej2Instances;

// 1. Rotate 90 degrees
imageEditor.rotate(90);

// 2. Flip horizontally
imageEditor.flipHorizontal();

// 3. The image is now rotated AND flipped
```

Each operation is independent and can be undone:

```javascript
// Undo the flip
imageEditor.undo();

// Undo the rotation
imageEditor.undo();
```

## Transformations with Annotations

All transformations apply to both the image AND any annotations:

```vue
<template>
  <div>
    <button @click="drawText">Add Text</button>
    <button @click="rotate">Rotate 90°</button>
    <ejs-imageeditor ref="imageEditorObj" height="500px" width="100%"></ejs-imageeditor>
  </div>
</template>

<script setup>
import { ImageEditorComponent } from "@syncfusion/ej2-vue-image-editor";
import { ref } from "vue";

const imageEditorObj = ref(null);

const drawText = () => {
  const imageEditor = imageEditorObj.value?.ej2Instances;
  imageEditor.drawText(100, 100, 'Hello', 'Arial', 16);
};

const rotate = () => {
  const imageEditor = imageEditorObj.value?.ej2Instances;
  imageEditor.rotate(90); // Text rotates with image
};
</script>
```

## Complete Transformation Example

```vue
<template>
  <div>
    <div style="margin-bottom: 10px;">
      <button @click="rotateLeft">↺ Rotate Left</button>
      <button @click="rotateRight">↻ Rotate Right</button>
      <button @click="flipH">⟷ Flip Horizontal</button>
      <button @click="flipV">⟲ Flip Vertical</button>
      <button @click="resetTransform">Reset</button>
    </div>
    <ejs-imageeditor 
      ref="imageEditorObj" 
      height="500px" 
      width="100%"
      :toolbar="['Undo', 'Redo', 'RotateLeft', 'RotateRight', 'HorizontalFlip', 'VerticalFlip', 'Straightening']"
    ></ejs-imageeditor>
  </div>
</template>

<script setup>
import { ImageEditorComponent } from "@syncfusion/ej2-vue-image-editor";
import { Browser } from "@syncfusion/ej2-base";
import { ref } from "vue";

const imageEditorObj = ref(null);

const rotateLeft = () => {
  const imageEditor = imageEditorObj.value?.ej2Instances;
  imageEditor.rotate(-90); // Counter-clockwise
};

const rotateRight = () => {
  const imageEditor = imageEditorObj.value?.ej2Instances;
  imageEditor.rotate(90); // Clockwise
};

const flipH = () => {
  const imageEditor = imageEditorObj.value?.ej2Instances;
  imageEditor.flipHorizontal();
};

const flipV = () => {
  const imageEditor = imageEditorObj.value?.ej2Instances;
  imageEditor.flipVertical();
};

const resetTransform = () => {
  const imageEditor = imageEditorObj.value?.ej2Instances;
  // Reset by reloading the image
  const currentImage = imageEditor.baseImage;
  imageEditor.open(currentImage);
};

const onCreated = () => {
  const imageEditor = imageEditorObj.value?.ej2Instances;
  if (!imageEditor) return;
  const imageUrl = Browser.isDevice
    ? "https://ej2.syncfusion.com/vue/documentation/image-editor/images/flower.jpeg"
    : "https://ej2.syncfusion.com/vue/documentation/image-editor/images/bridge.jpeg";
  imageEditor.open(imageUrl);
};
</script>

<style>
button {
  margin-right: 5px;
  padding: 5px 10px;
}
</style>
```

## Transformation Use Cases

| Operation | Use Case |
|-----------|----------|
| **Rotate 90°** | Correct portrait/landscape orientation |
| **Flip Horizontal** | Mirror left-right or correct mirrored shots |
| **Flip Vertical** | Correct upside-down images |
| **Straighten** | Fix skewed/tilted photos |
| **Combine** | Complex orientation corrections |

## Performance Considerations

Transformations are applied instantly without re-encoding the entire image, so they're very efficient. All transformations are:
- **Non-destructive** until saved
- **Reversible** with undo/redo
- **Tracked** in history (16-step limit)
