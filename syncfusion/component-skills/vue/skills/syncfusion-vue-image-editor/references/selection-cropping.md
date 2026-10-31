# Selection and Cropping

## Table of Contents
- [Insert Selections](#insert-selections)
- [Crop Images](#crop-images)
- [Aspect Ratios](#aspect-ratios)
- [Selection Events](#selection-events)

## Insert Selections

### Custom Selection

Insert a custom rectangular selection:

```vue
<template>
  <div>
    <button @click="selectCustom">Custom Selection</button>
    <ImageEditorComponent ref="imgObj" width="550px" height="350px" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);

const selectCustom = () => {
  const dimension = imgObj.value?.getImageDimension();
  imgObj.value?.select('Custom', {
    x: dimension.x + 50,
    y: dimension.y + 50,
    width: 200,
    height: 150
  });
};
</script>
```

### Square Selection

Insert a square selection:

```vue
<template>
  <div>
    <button @click="selectSquare">Square Selection</button>
    <ImageEditorComponent ref="imgObj" width="550px" height="350px" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);

const selectSquare = () => {
  const dimension = imgObj.value?.getImageDimension();
  imgObj.value?.select('Square', {
    x: dimension.x + 100,
    y: dimension.y + 100,
    width: 150,
    height: 150
  });
};
</script>
```

### Circle Selection

Insert a circle selection:

```vue
<template>
  <div>
    <button @click="selectCircle">Circle Selection</button>
    <ImageEditorComponent ref="imgObj" width="550px" height="350px" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);

const selectCircle = () => {
  const dimension = imgObj.value?.getImageDimension();
  imgObj.value?.select('Circle', {
    x: dimension.x + 100,
    y: dimension.y + 100,
    width: 150,
    height: 150
  });
};
</script>
```

## Crop Images

### Basic Crop

Crop the image:

```vue
<template>
  <div>
    <button @click="performCrop">Crop Image</button>
    <ImageEditorComponent ref="imgObj" width="550px" height="350px" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);

const performCrop = () => {
  const dimension = imgObj.value?.getImageDimension();
  // First select an area
  imgObj.value?.select('Custom', {
    x: dimension.x + 50,
    y: dimension.y + 50,
    width: 200,
    height: 150
  });
  // Then crop
  setTimeout(() => {
    imgObj.value?.crop();
  }, 100);
};
</script>
```

## Aspect Ratios

### Crop with Aspect Ratio

```vue
<template>
  <div>
    <button @click="cropWithRatio('16:9')">16:9</button>
    <button @click="cropWithRatio('4:3')">4:3</button>
    <button @click="cropWithRatio('1:1')">1:1</button>
    <ImageEditorComponent ref="imgObj" width="550px" height="350px" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);

const cropWithRatio = (ratio) => {
  const dimension = imgObj.value?.getImageDimension();
  imgObj.value?.select('Custom', {
    x: dimension.x + 50,
    y: dimension.y + 50,
    width: 300,
    height: ratio === '1:1' ? 300 : ratio === '4:3' ? 225 : 169
  });
};
</script>
```

## Selection Events

### Selection Changing Event

```vue
<template>
  <div>
    <ImageEditorComponent 
      ref="imgObj"
      width="550px" 
      height="350px"
      :selectionChanging="onSelectionChanging"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);

const onSelectionChanging = (args) => {
  console.log('Selection changing:', args);
};
</script>
```

## Next Steps

- Explore [transform-rotate-flip.md](./transform-rotate-flip.md) for rotating/flipping
- Learn about [zooming-panning.md](./zooming-panning.md)
