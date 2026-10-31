# API Reference

## Table of Contents
- [Properties](#properties)
- [Methods](#methods)
- [Events](#events)
- [Enums and Types](#enums-and-types)
- [Complete Examples](#complete-examples)

## Properties

### Core Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `width` | string | `'100%'` | Editor canvas width (e.g., "550px", "100%") |
| `height` | string | `'100%'` | Editor canvas height (e.g., "350px", "100%") |
| `toolbar` | array | `[]` | Toolbar items configuration |
| `fontFamily` | object | `null` | Custom font families |
| `locale` | string | `'en-US'` | Locale code |
| `cssClass` | string | `''` | Custom CSS classes |
| `enabled` | boolean | `true` | Enable/disable component |
| `inline` | boolean | `false` | Render as inline element |
| `showQuickAccessToolbar` | boolean | `true` | Show/hide quick access toolbar |
| `quickAccessToolbar` | array | `[]` | Quick access toolbar items |
| `enableRtl` | boolean | `false` | Enable RTL mode |

### Toolbar Settings

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `toolbar` | array | All items | Custom toolbar items |
| `toolbarTemplate` | string | `null` | Custom toolbar template |
| `contextualToolbarSettings` | object | `null` | Contextual toolbar config |

### Upload Settings

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `uploadSettings.allowedExtensions` | string | `'.jpg,.png,.jpeg,.svg'` | Allowed file types |
| `uploadSettings.minFileSize` | number | `0` | Minimum file size (bytes) |
| `uploadSettings.maxFileSize` | number | `Infinity` | Maximum file size (bytes) |

### Zoom Settings

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `zoomSettings.minZoomFactor` | number | `0.1` | Minimum zoom level |
| `zoomSettings.maxZoomFactor` | number | `10` | Maximum zoom level |
| `zoomSettings.zoomTrigger` | array | `['Toolbar','Pinch','MouseWheel','Keyboard']` | Zoom triggers |

## Methods

### Image Operations

| Method | Parameters | Returns | Description |
|--------|-----------|---------|-------------|
| `open(data)` | string/Blob/base64 | void | Open image |
| `export(type, fileName)` | string, string | Promise | Export image |
| `getImageData()` | - | string | Get base64 data |
| `clearImage()` | - | void | Clear editor |
| `reset()` | - | void | Reset to original |

### Transformation Methods

| Method | Parameters | Returns | Description |
|--------|-----------|---------|-------------|
| `rotate(degree)` | number | void | Rotate image |
| `flip(direction)` | 'Horizontal'/'Vertical' | void | Flip image |
| `straightenImage(degree)` | number | void | Straighten image |
| `resize(width, height, aspectRatio)` | number, number, boolean | void | Resize image |
| `zoom(factor, point)` | number, object | void | Zoom image |
| `pan(deltaX, deltaY)` | number, number | void | Pan image |

### Annotation Methods

| Method | Parameters | Returns | Description |
|--------|-----------|---------|-------------|
| `drawText(x, y, text, ...)` | coordinates and styles | void | Add text |
| `drawShape(type, options)` | string, object | void | Add shape |
| `drawImage(url, options)` | string, object | void | Add image |
| `drawFrame(type, color, size, style)` | string, string, number, string | void | Add frame |
| `drawRedaction(type, options)` | string, object | void | Add redaction |
| `enableFreeHandDrawing()` | - | void | Enable drawing |
| `disableFreeHandDrawing()` | - | void | Disable drawing |

### Selection Methods

| Method | Parameters | Returns | Description |
|--------|-----------|---------|-------------|
| `select(type, options)` | string, object | void | Insert selection |
| `crop()` | - | void | Crop image |
| `selectShape(id)` | string | void | Select annotation |

### Layer Management

| Method | Parameters | Returns | Description |
|--------|-----------|---------|-------------|
| `bringForward(id)` | string | void | Move layer up |
| `sendBackward(id)` | string | void | Move layer down |
| `bringToFront(id)` | string | void | Move to top |
| `sendToBack(id)` | string | void | Move to bottom |

### Shape Management

| Method | Parameters | Returns | Description |
|--------|-----------|---------|-------------|
| `getShapeSettings()` | - | array | Get all shapes |
| `deleteShape(id)` | string | void | Delete shape |
| `updateShape(shape)` | object | void | Update shape |
| `rotateShape(id, degree)` | string, number | void | Rotate shape |

### Effects Methods

| Method | Parameters | Returns | Description |
|--------|-----------|---------|-------------|
| `applyImageFilter(type)` | string | void | Apply filter |
| `finetuneImage(option, value)` | string, number | void | Fine-tune image |
| `fitToWidth()` | - | void | Fit to width |
| `fitToHeight()` | - | void | Fit to height |

### History Methods

| Method | Parameters | Returns | Description |
|--------|-----------|---------|-------------|
| `undo()` | - | void | Undo last action |
| `redo()` | - | void | Redo last action |

### Utility Methods

| Method | Parameters | Returns | Description |
|--------|-----------|---------|-------------|
| `getImageDimension()` | - | object | Get dimensions |
| `getZoomFactor()` | - | number | Get current zoom |

## Events

### Lifecycle Events

| Event | Parameters | Description |
|-------|-----------|-------------|
| `@created` | - | Component initialized |
| `@destroyed` | - | Component destroyed |

### File Events

| Event | Parameters | Description |
|-------|-----------|-------------|
| `@fileOpened` | `args` | Image loaded |
| `@fileLoading` | `args` | Image loading |
| `@beforeSave` | `args` | Before save |

### Transformation Events

| Event | Parameters | Description |
|-------|-----------|-------------|
| `@rotating` | `args` | During rotation |
| `@flipping` | `args` | During flip |
| `@cropping` | `args` | During crop |
| `@zooming` | `args` | During zoom |
| `@panning` | `args` | During pan |
| `@resizing` | `args` | During resize |

### Annotation Events

| Event | Parameters | Description |
|-------|-----------|-------------|
| `@shapeChanging` | `args` | Annotation changed |
| `@shapeChanged` | `args` | Annotation change complete |
| `@selectionChanging` | `args` | Selection changing |

### Effects Events

| Event | Parameters | Description |
|-------|-----------|-------------|
| `@imageFiltering` | `args` | Filter applied |
| `@finetuneValueChanging` | `args` | Finetune adjusting |

### Toolbar Events

| Event | Parameters | Description |
|-------|-----------|-------------|
| `@toolbarCreated` | `args` | Toolbar initialized |
| `@toolbarItemClicked` | `args` | Toolbar item clicked |
| `@toolbarUpdating` | `args` | Toolbar updating |
| `@quickAccessToolbarOpen` | `args` | Quick access opens |

### Frame Events

| Event | Parameters | Description |
|-------|-----------|-------------|
| `@frameChanging` | `args` | Frame applied |

## Enums and Types

### FilterType

| Value | Description |
|-------|-------------|
| `Chrome` | Chrome filter |
| `Cold` | Cold filter |
| `Warm` | Warm filter |
| `Grayscale` | Grayscale filter |
| `Sepia` | Sepia filter |
| `Invert` | Invert filter |

### FinetuneOption

| Value | Description |
|-------|-------------|
| `Brightness` | Brightness adjustment |
| `Contrast` | Contrast adjustment |
| `Saturation` | Saturation adjustment |
| `Hue` | Hue adjustment |
| `Exposure` | Exposure adjustment |
| `Blur` | Blur effect |
| `Opacity` | Opacity adjustment |

### FrameType

| Value | Description |
|-------|-------------|
| `Mat` | Mat frame |
| `Bevel` | Bevel frame |
| `Line` | Line frame |
| `Inset` | Inset frame |
| `Hook` | Hook frame |

### SelectionType

| Value | Description |
|-------|-------------|
| `Custom` | Custom selection |
| `Square` | Square selection |
| `Circle` | Circle selection |

### ShapeType

| Value | Description |
|-------|-------------|
| `Rectangle` | Rectangle shape |
| `Ellipse` | Ellipse shape |
| `Line` | Line shape |
| `Arrow` | Arrow shape |
| `Path` | Path shape |
| `Text` | Text annotation |
| `Freehand` | Freehand drawing |
| `Image` | Image annotation |
| `Redact` | Redaction |

### RedactType

| Value | Description |
|-------|-------------|
| `Blur` | Blur redaction |
| `Pixelate` | Pixelate redaction |

### ArrowheadType

| Value | Description |
|-------|-------------|
| `None` | No arrowhead |
| `Arrow` | Arrow style |
| `Circle` | Circle style |
| `Square` | Square style |

### LineType

| Value | Description |
|-------|-------------|
| `Solid` | Solid line |
| `Dashed` | Dashed line |
| `Dotted` | Dotted line |

## Complete Examples

### Full-Featured Image Editor

```vue
<template>
  <div>
    <div class="controls">
      <button @click="openImage">Open</button>
      <button @click="rotateImage">Rotate</button>
      <button @click="flipImage">Flip</button>
      <button @click="addText">Add Text</button>
      <button @click="addShape">Add Shape</button>
      <button @click="applyFilter">Apply Filter</button>
      <button @click="saveImage">Save</button>
      <button @click="undoAction">Undo</button>
      <button @click="redoAction">Redo</button>
    </div>
    
    <ImageEditorComponent 
      ref="imgObj"
      width="800px" 
      height="500px"
      :toolbar="customToolbar"
      :zoomSettings="zoomSettings"
      :fileOpened="onFileOpened"
      :shapeChanging="onShapeChanging"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);

const customToolbar = [
  'Open', 'Save', 'Crop', 'RotateLeft', 'RotateRight',
  'FlipHorizontal', 'FlipVertical', 'Undo', 'Redo',
  'Text', 'Shape', 'Pen', 'Filter', 'Finetune'
];

const zoomSettings = {
  minZoomFactor: 0.1,
  maxZoomFactor: 10,
  zoomTrigger: ['Toolbar', 'Pinch', 'MouseWheel', 'Keyboard']
};

const openImage = () => {
  imgObj.value?.open('https://ej2.syncfusion.com/vue/documentation/image-editor/images/bridge.jpeg');
};

const rotateImage = () => {
  imgObj.value?.rotate(90);
};

const flipImage = () => {
  imgObj.value?.flip('Horizontal');
};

const addText = () => {
  const dim = imgObj.value?.getImageDimension();
  imgObj.value?.drawText(dim.x + 100, dim.y + 100, 'Hello Vue 3!', 'Arial', 30, true, false, 'red');
};

const addShape = () => {
  const dim = imgObj.value?.getImageDimension();
  imgObj.value?.drawShape('Rectangle', {
    x: dim.x + 50,
    y: dim.y + 50,
    width: 150,
    height: 100,
    strokeColor: 'blue',
    strokeWidth: 3
  });
};

const applyFilter = () => {
  imgObj.value?.applyImageFilter('Sepia');
};

const saveImage = async () => {
  const data = imgObj.value?.getImageData();
  console.log('Image data:', data);
  // Use the data to save to backend
};

const undoAction = () => {
  imgObj.value?.undo();
};

const redoAction = () => {
  imgObj.value?.redo();
};

const onFileOpened = (args) => {
  console.log('File opened:', args.fileName);
};

const onShapeChanging = (args) => {
  if (args.currentShapeSettings.type === 'Rectangle') {
    args.currentShapeSettings.fillColor = 'lightblue';
  }
};
</script>

<style scoped>
.controls {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

button {
  padding: 8px 16px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background: #0056b3;
}
</style>
```

### Image Editor with File Upload

```vue
<template>
  <div>
    <input type="file" @change="onFileChange" accept="image/*" />
    <ImageEditorComponent 
      ref="imgObj"
      width="100%" 
      height="600px"
      :uploadSettings="uploadSettings"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);

const uploadSettings = {
  allowedExtensions: '.jpg,.png,.jpeg,.svg,.webp,.bmp',
  minFileSize: 1024,
  maxFileSize: 10485760
};

const onFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    imgObj.value?.open(file);
  }
};
</script>
```

## Next Steps

- Explore [getting-started.md](./getting-started.md) for basic setup
- Learn about [accessibility-localization.md](./accessibility-localization.md)
- Check specific features in their dedicated reference files
