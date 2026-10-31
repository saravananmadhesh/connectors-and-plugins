# Resize Image

## Table of Contents
- [Resize Operations](#resize-operations)
- [Aspect Ratio](#aspect-ratio)
- [Resize Events](#resize-events)

## Resize Operations

### Basic Resize

```vue
<template>
  <div>
    <button @click="resizeImage">Resize to 800x600</button>
    <ImageEditorComponent ref="imgObj" width="550px" height="350px" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);

const resizeImage = () => {
  imgObj.value?.resize(800, 600, false);
};
</script>
```

### Resize with Aspect Ratio

```vue
<template>
  <div>
    <button @click="resizeWithRatio">Resize with Aspect</button>
    <ImageEditorComponent ref="imgObj" width="550px" height="350px" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);

const resizeWithRatio = () => {
  imgObj.value?.resize(1024, 768, true);
};
</script>
```

### Resize to Specific Dimensions

```vue
<template>
  <div>
    <label>Width: <input type="number" v-model.number="width" /></label>
    <label>Height: <input type="number" v-model.number="height" /></label>
    <button @click="doResize">Resize</button>
    <ImageEditorComponent ref="imgObj" width="550px" height="350px" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);
const width = ref(800);
const height = ref(600);

const doResize = () => {
  imgObj.value?.resize(width.value, height.value, false);
};
</script>
```

## Aspect Ratio

### Maintain Aspect Ratio

```vue
<template>
  <div>
    <button @click="resizeProportional">Maintain Aspect</button>
    <ImageEditorComponent ref="imgObj" width="550px" height="350px" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);

const resizeProportional = () => {
  imgObj.value?.resize(1024, null, true);
};
</script>
```

### Free Resize

```vue
<template>
  <div>
    <button @click="freeResize">Free Resize</button>
    <ImageEditorComponent ref="imgObj" width="550px" height="350px" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);

const freeResize = () => {
  imgObj.value?.resize(500, 300, false);
};
</script>
```

## Resize Events

### Resizing Event

```vue
<template>
  <div>
    <ImageEditorComponent 
      ref="imgObj"
      width="550px" 
      height="350px"
      :resizing="onResizing"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);

const onResizing = (args) => {
  console.log('Resizing from:', args.oldWidth, 'x', args.oldHeight);
  console.log('To:', args.width, 'x', args.height);
};
</script>
```

## Next Steps

- Learn about [frame-decoration.md](./frame-decoration.md)
- Explore [z-order-layering.md](./z-order-layering.md)
