# Frames and Borders

## Frame Types

The Image Editor supports multiple frame styles for adding decorative borders:

| Frame Type | Description | Use Case |
|-----------|-------------|----------|
| **Mat** | Matte border with solid color | Professional photos, artwork |
| **Bevel** | 3D beveled edge effect | Modern, dimensional look |
| **Line** | Simple line border | Clean, minimalist |
| **Hook** | Ornamental hook-style frame | Creative, decorative |
| **Inset** | Inset border effect | Depth, framing |

## Drawing Frames

Use the `drawFrame()` method:

```javascript
const imageEditor = imageEditorObj.value?.ej2Instances;

imageEditor.drawFrame(
  'Mat',              // frameType
  '#FF0000',          // Color
  '#FFFF00',          // Gradient color (optional)
  20,                 // size
  5,                  // inset (for line, hook, inset types)
  10,                 // offset (for line, inset types)
  10,                 // borderRadius (for line type)
  'solid',            // frameLineStyle (for line type)
  1                   // lineCount (for line type)
);
```

## Frame Parameters

### Common Parameters

- **frameType** - Type of frame (Mat, Bevel, Line, Hook, Inset)
- **Color** - Primary color of the frame
- **gradientColor** - Secondary gradient color (optional)
- **size** - Thickness of the frame in pixels

### Advanced Parameters

- **inset** - Inset value for line, hook, and inset frames
- **offset** - Offset value for line and inset frames
- **borderRadius** - Corner radius for line type frames
- **frameLineStyle** - Line style (solid, dashed, dotted)
- **lineCount** - Number of lines for line type frame

## Frame Examples

### Mat Frame

Simple matte border:

```javascript
imageEditor.drawFrame('Mat', '#8B7355', null, 30);
```

**Result:** Brown mat border 30px thick

### Bevel Frame

3D beveled effect:

```javascript
imageEditor.drawFrame('Bevel', '#C0C0C0', '#808080', 25);
```

**Result:** Gray beveled frame with shadow effect

### Line Frame

Clean line border:

```javascript
imageEditor.drawFrame('Line', '#000000', null, 5, 0, 0, 5, 'solid', 1);
```

**Result:** Black 5px line border with rounded corners

### Hook Frame

Ornamental hook frame:

```javascript
imageEditor.drawFrame('Hook', '#D4AF37', null, 20);
```

**Result:** Gold ornamental hook frame

### Inset Frame

Inset depth effect:

```javascript
imageEditor.drawFrame('Inset', '#A9A9A9', null, 15, 3, 2);
```

**Result:** Gray inset frame with depth

## Frame Customization

### Custom Colors

```javascript
// Simple frame with single color
imageEditor.drawFrame('Mat', '#FF6347', null, 25);  // Tomato color

// Frame with gradient colors
imageEditor.drawFrame('Bevel', '#FF0000', '#0000FF', 30);  // Red to blue gradient
```

### Frame Size

```javascript
// Thin frame (10px)
imageEditor.drawFrame('Line', '#000000', null, 10);

// Medium frame (20px)
imageEditor.drawFrame('Mat', '#8B4513', null, 20);

// Large frame (40px)
imageEditor.drawFrame('Hook', '#FFD700', null, 40);
```

### Rounded Corners

```javascript
// Line frame with rounded corners
imageEditor.drawFrame('Line', '#000000', null, 5, 0, 0, 20, 'solid');  // 20px border radius
```

### Dashed Line Style

```javascript
imageEditor.drawFrame('Line', '#000000', null, 5, 0, 0, 5, 'dashed');
```

## Removing Frames

There's no explicit "removeFrame" method, but you can:

### Reset the Image

```javascript
const imageEditor = imageEditorObj.value?.ej2Instances;
imageEditor.reset();
```

### Undo Frame Application

```javascript
imageEditor.undo();
```

## Complete Frame Example

```vue
<template>
  <div>
    <div>
      <select v-model="frameType">
        <option>Mat</option>
        <option>Bevel</option>
        <option>Line</option>
        <option>Hook</option>
        <option>Inset</option>
      </select>
      <input v-model="frameColor" type="color" placeholder="Color">
      <input v-model.number="frameSize" type="number" min="5" max="50" placeholder="Size">
      <button @click="applyFrame">Apply Frame</button>
      <button @click="resetImage">Remove Frame</button>
    </div>
    <ejs-imageeditor 
      ref="imageEditorObj" 
      height="500px" 
      width="100%"
      :toolbar="['Frame', 'Undo', 'Redo']"
      :created="onCreated"
    ></ejs-imageeditor>
  </div>
</template>

<script setup>
import { ImageEditorComponent } from "@syncfusion/ej2-vue-image-editor";
import { Browser } from "@syncfusion/ej2-base";
import { ref } from "vue";

const imageEditorObj = ref(null);
const frameType = ref('Mat');
const frameColor = ref('#8B7355');
const frameSize = ref(25);

const onCreated = () => {
  const imageEditor = imageEditorObj.value?.ej2Instances;
  if (!imageEditor) return;
  const imageUrl = Browser.isDevice
    ? "https://ej2.syncfusion.com/vue/documentation/image-editor/images/flower.jpeg"
    : "https://ej2.syncfusion.com/vue/documentation/image-editor/images/bridge.jpeg";
  imageEditor.open(imageUrl);
};

const applyFrame = () => {
  const imageEditor = imageEditorObj.value?.ej2Instances;
  imageEditor.drawFrame(frameType.value, frameColor.value, null, frameSize.value);
};

const resetImage = () => {
  const imageEditor = imageEditorObj.value?.ej2Instances;
  imageEditor.undo();
};
</script>

<style>
select, input, button {
  margin: 5px;
  padding: 5px;
}
</style>
```

## Preset Frame Styles

```vue
<template>
  <div>
    <button @click="applyPreset('classic')">Classic Mat</button>
    <button @click="applyPreset('modern')">Modern Bevel</button>
    <button @click="applyPreset('minimalist')">Minimalist Line</button>
    <button @click="applyPreset('elegant')">Elegant Hook</button>
    <button @click="applyPreset('depth')">Depth Inset</button>
    <button @click="resetImage">Reset</button>
    <ejs-imageeditor ref="imageEditorObj" height="500px" width="100%"></ejs-imageeditor>
  </div>
</template>

<script setup>
import { ImageEditorComponent } from "@syncfusion/ej2-vue-image-editor";
import { ref } from "vue";

const imageEditorObj = ref(null);

const framePresets = {
  classic: () => {
    imageEditorObj.value?.ej2Instances.drawFrame('Mat', '#8B7355', null, 25);
  },
  modern: () => {
    imageEditorObj.value?.ej2Instances.drawFrame('Bevel', '#C0C0C0', '#808080', 20);
  },
  minimalist: () => {
    imageEditorObj.value?.ej2Instances.drawFrame('Line', '#000000', null, 5, 0, 0, 5);
  },
  elegant: () => {
    imageEditorObj.value?.ej2Instances.drawFrame('Hook', '#D4AF37', null, 20);
  },
  depth: () => {
    imageEditorObj.value?.ej2Instances.drawFrame('Inset', '#A9A9A9', null, 15, 3, 2);
  }
};

const applyPreset = (presetName) => {
  framePresets[presetName]?.();
};

const resetImage = () => {
  imageEditorObj.value?.ej2Instances.undo();
};
</script>

<style>
button {
  margin: 5px;
  padding: 8px 12px;
}
</style>
```

## Frame History

All frame applications are tracked in undo/redo:

```javascript
// Apply frame
imageEditor.drawFrame('Mat', '#8B7355', null, 25);

// Undo frame
imageEditor.undo();

// Redo frame
imageEditor.redo();
```

## Use Cases

1. **Photo Framing** - Add professional frames to photos
2. **Design Templates** - Create greeting cards, posters
3. **Social Media** - Add borders to match platform aesthetics
4. **Artistic Effects** - Combine frames with other effects
5. **Document Presentation** - Professional document preparation

## Color Ideas

| Style | Primary Color | Gradient |
|-------|---------------|----------|
| **Gold** | #FFD700 | #FFA500 |
| **Silver** | #C0C0C0 | #808080 |
| **Bronze** | #CD7F32 | #8B4513 |
| **Wood** | #8B4513 | #A0522D |
| **Modern** | #000000 | #333333 |
