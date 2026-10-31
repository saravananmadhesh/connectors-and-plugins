# Freehand Drawing

## Table of Contents
- [Enable Freehand Drawing](#enable-freehand-drawing)
- [Customize Stroke](#customize-stroke)
- [Delete Freehand Annotations](#delete-freehand-annotations)
- [Drawing Events](#drawing-events)

## Enable Freehand Drawing

### Basic Freehand Drawing

Enable freehand drawing mode:

```vue
<template>
  <div>
    <button @click="enableDrawing">Enable Drawing</button>
    <button @click="disableDrawing">Disable Drawing</button>
    <ImageEditorComponent ref="imgObj" width="550px" height="350px" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);

const enableDrawing = () => {
  imgObj.value?.enableFreeHandDrawing();
};

const disableDrawing = () => {
  imgObj.value?.disableFreeHandDrawing();
};
</script>
```

### Freehand with Custom Settings

```vue
<template>
  <div>
    <ImageEditorComponent 
      ref="imgObj"
      width="550px" 
      height="350px"
      :shapeChanging="onShapeChanging"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);

const onShapeChanging = (args) => {
  if (args.currentShapeSettings.type === 'Freehand') {
    args.currentShapeSettings.strokeColor = 'red';
    args.currentShapeSettings.strokeWidth = 3;
  }
};
</script>
```

## Customize Stroke

### Change Stroke Color and Width

```vue
<template>
  <div>
    <button @click="setRedStroke">Red Stroke</button>
    <button @click="setBlueStroke">Blue Stroke</button>
    <ImageEditorComponent ref="imgObj" width="550px" height="350px" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);

const setRedStroke = () => {
  // Default freehand stroke is set in component
  imgObj.value?.enableFreeHandDrawing();
};

const setBlueStroke = () => {
  // Use shapeChanging event to customize
  imgObj.value?.enableFreeHandDrawing();
};
</script>
```

## Delete Freehand Annotations

### Delete Specific Freehand

```vue
<template>
  <div>
    <button @click="deleteLast">Delete Last</button>
    <ImageEditorComponent ref="imgObj" width="550px" height="350px" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);

const deleteLast = () => {
  const shapes = imgObj.value?.getShapeSettings();
  if (shapes && shapes.length > 0) {
    const freehand = shapes.find(s => s.type === 'Freehand');
    if (freehand) {
      imgObj.value?.deleteShape(freehand.id);
    }
  }
};
</script>
```

## Drawing Events

### Shape Changing Event

```vue
<template>
  <div>
    <ImageEditorComponent 
      ref="imgObj"
      width="550px" 
      height="350px"
      :shapeChanging="onShapeChanging"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);

const onShapeChanging = (args) => {
  if (args.currentShapeSettings.type === 'Freehand') {
    args.currentShapeSettings.strokeColor = 'blue';
    args.currentShapeSettings.strokeWidth = 4;
  }
};
</script>
```

## Next Steps

- Explore [shape-annotations.md](./shape-annotations.md)
- Learn about [image-annotations.md](./image-annotations.md)
