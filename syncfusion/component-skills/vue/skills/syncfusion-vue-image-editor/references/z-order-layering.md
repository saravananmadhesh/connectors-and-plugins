# Z-Order Layering

## Table of Contents
- [Z-Order Methods](#z-order-methods)
- [Bring Forward/Backward](#bring-forwardbackward)
- [Bring to Front/Back](#bring-to-frontback)
- [Layer Management](#layer-management)

## Z-Order Methods

### Bring Forward

Move annotation one layer up:

```vue
<template>
  <div>
    <button @click="bringForward">Bring Forward</button>
    <button @click="sendBackward">Send Backward</button>
    <ImageEditorComponent ref="imgObj" width="550px" height="350px" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);

const bringForward = () => {
  const shapes = imgObj.value?.getShapeSettings();
  if (shapes && shapes.length > 0) {
    imgObj.value?.bringForward(shapes[shapes.length - 1].id);
  }
};

const sendBackward = () => {
  const shapes = imgObj.value?.getShapeSettings();
  if (shapes && shapes.length > 0) {
    imgObj.value?.sendBackward(shapes[shapes.length - 1].id);
  }
};
</script>
```

## Bring to Front/Back

### Bring to Front

Move annotation to the top layer:

```vue
<template>
  <div>
    <button @click="bringToFront">Bring to Front</button>
    <button @click="sendToBack">Send to Back</button>
    <ImageEditorComponent ref="imgObj" width="550px" height="350px" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);

const bringToFront = () => {
  const shapes = imgObj.value?.getShapeSettings();
  if (shapes && shapes.length > 0) {
    imgObj.value?.bringToFront(shapes[0].id);
  }
};

const sendToBack = () => {
  const shapes = imgObj.value?.getShapeSettings();
  if (shapes && shapes.length > 0) {
    imgObj.value?.sendToBack(shapes[shapes.length - 1].id);
  }
};
</script>
```

## Layer Management

### Get All Layers

```vue
<template>
  <div>
    <button @click="showLayers">Show Layers</button>
    <ul v-if="layers.length">
      <li v-for="(layer, idx) in layers" :key="idx">
        {{ layer.type }} - {{ layer.id }}
      </li>
    </ul>
    <ImageEditorComponent ref="imgObj" width="550px" height="350px" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);
const layers = ref([]);

const showLayers = () => {
  const shapes = imgObj.value?.getShapeSettings();
  layers.value = shapes || [];
};
</script>
```

### Reorder Annotations

```vue
<template>
  <div>
    <button @click="addShape">Add Shape</button>
    <button @click="bringToFront">Bring to Front</button>
    <button @click="sendToBack">Send to Back</button>
    <ImageEditorComponent ref="imgObj" width="550px" height="350px" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);

const addShape = () => {
  const dim = imgObj.value?.getImageDimension();
  imgObj.value?.drawShape('Rectangle', {
    x: dim.x + 50,
    y: dim.y + 50,
    width: 100,
    height: 80
  });
};

const bringToFront = () => {
  const shapes = imgObj.value?.getShapeSettings();
  if (shapes && shapes.length > 0) {
    imgObj.value?.bringToFront(shapes[0].id);
  }
};

const sendToBack = () => {
  const shapes = imgObj.value?.getShapeSettings();
  if (shapes && shapes.length > 0) {
    imgObj.value?.sendToBack(shapes[shapes.length - 1].id);
  }
};
</script>
```

## Next Steps

- Learn about [redact-sensitive-info.md](./redact-sensitive-info.md)
- Explore [accessibility-localization.md](./accessibility-localization.md)
