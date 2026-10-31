# Frame Decoration

## Table of Contents
- [Apply Frames](#apply-frames)
- [Frame Types](#frame-types)
- [Customize Frames](#customize-frames)
- [Frame Events](#frame-events)

## Apply Frames

### Apply Mat Frame

```vue
<template>
  <div>
    <button @click="applyMat">Mat Frame</button>
    <button @click="applyBevel">Bevel Frame</button>
    <button @click="applyLine">Line Frame</button>
    <button @click="applyInset">Inset Frame</button>
    <button @click="applyHook">Hook Frame</button>
    <ImageEditorComponent ref="imgObj" width="550px" height="350px" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);

const applyMat = () => imgObj.value?.drawFrame('Mat', '#fff', 20, 'Solid');
const applyBevel = () => imgObj.value?.drawFrame('Bevel', '#000', 15, 'Solid');
const applyLine = () => imgObj.value?.drawFrame('Line', '#ff0000', 10, 'Dashed');
const applyInset = () => imgObj.value?.drawFrame('Inset', '#333', 12, 'Solid');
const applyHook = () => imgObj.value?.drawFrame('Hook', '#666', 8, 'Dotted');
</script>
```

## Frame Types

### Mat Frame

Mat-style decorative border:

```vue
<template>
  <div>
    <button @click="addMatFrame">Add Mat</button>
    <ImageEditorComponent ref="imgObj" width="550px" height="350px" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);

const addMatFrame = () => {
  imgObj.value?.drawFrame('Mat', 'white', 20, 'Solid');
};
</script>
```

### Bevel Frame

3D bevel effect:

```vue
<template>
  <div>
    <button @click="addBevelFrame">Add Bevel</button>
    <ImageEditorComponent ref="imgObj" width="550px" height="350px" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);

const addBevelFrame = () => {
  imgObj.value?.drawFrame('Bevel', 'black', 15, 'Solid');
};
</script>
```

### Line Frame

Simple line border:

```vue
<template>
  <div>
    <button @click="addLineFrame">Add Line</button>
    <ImageEditorComponent ref="imgObj" width="550px" height="350px" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);

const addLineFrame = () => {
  imgObj.value?.drawFrame('Line', 'red', 5, 'Dashed');
};
</script>
```

## Customize Frames

### Custom Color and Size

```vue
<template>
  <div>
    <select v-model="frameType">
      <option>Mat</option>
      <option>Bevel</option>
      <option>Line</option>
      <option>Inset</option>
      <option>Hook</option>
    </select>
    <input type="color" v-model="color" />
    <input type="number" v-model.number="size" min="1" max="50" />
    <select v-model="lineStyle">
      <option>Solid</option>
      <option>Dashed</option>
      <option>Dotted</option>
    </select>
    <button @click="applyFrame">Apply</button>
    <ImageEditorComponent ref="imgObj" width="550px" height="350px" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);
const frameType = ref('Mat');
const color = ref('#ffffff');
const size = ref(20);
const lineStyle = ref('Solid');

const applyFrame = () => {
  imgObj.value?.drawFrame(frameType.value, color.value, size.value, lineStyle.value);
};
</script>
```

## Frame Events

### Frame Changing Event

```vue
<template>
  <div>
    <ImageEditorComponent 
      ref="imgObj"
      width="550px" 
      height="350px"
      :frameChanging="onFrameChanging"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);

const onFrameChanging = (args) => {
  console.log('Frame changing:', args);
};
</script>
```

## Next Steps

- Learn about [z-order-layering.md](./z-order-layering.md)
- Explore [redact-sensitive-info.md](./redact-sensitive-info.md)
