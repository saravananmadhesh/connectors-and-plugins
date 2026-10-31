# Zoom and Pan Operations

## Table of Contents
- [Zoom Operations](#zoom-operations)
- [Pan Operations](#pan-operations)
- [Zoom Settings](#zoom-settings)
- [Zoom Events](#zoom-events)

## Zoom Operations

### Zoom In

```vue
<template>
  <div>
    <button @click="zoomIn">Zoom In</button>
    <button @click="zoomOut">Zoom Out</button>
    <ImageEditorComponent ref="imgObj" width="550px" height="350px" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);

const zoomIn = () => {
  imgObj.value?.zoom(0.1);
};

const zoomOut = () => {
  imgObj.value?.zoom(-0.1);
};
</script>
```

### Zoom to Specific Point

```vue
<template>
  <div>
    <button @click="zoomToCenter">Zoom to Center</button>
    <ImageEditorComponent ref="imgObj" width="550px" height="350px" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);

const zoomToCenter = () => {
  imgObj.value?.zoom(0.5, { x: 275, y: 175 });
};
</script>
```

### Zoom by Factor

```vue
<template>
  <div>
    <button @click="zoom(2)">Zoom 2x</button>
    <button @click="zoom(0.5)">Zoom 0.5x</button>
    <button @click="zoom(1)">Reset 1x</button>
    <ImageEditorComponent ref="imgObj" width="550px" height="350px" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);

const zoom = (factor) => {
  const current = imgObj.value?.getZoomFactor() || 1;
  const change = factor - current;
  imgObj.value?.zoom(change);
};
</script>
```

## Pan Operations

### Pan Image

```vue
<template>
  <div>
    <button @click="panLeft">Pan Left</button>
    <button @click="panRight">Pan Right</button>
    <ImageEditorComponent ref="imgObj" width="550px" height="350px" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);

const panLeft = () => {
  imgObj.value?.pan(-50, 0);
};

const panRight = () => {
  imgObj.value?.pan(50, 0);
};
</script>
```

## Zoom Settings

### Configure Min/Max Zoom

```vue
<template>
  <div>
    <ImageEditorComponent 
      ref="imgObj"
      width="550px" 
      height="350px"
      :zoomSettings="zoomSettings"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);

const zoomSettings = {
  minZoomFactor: 0.1,
  maxZoomFactor: 10,
  zoomTrigger: ['Toolbar', 'Pinch', 'MouseWheel', 'Keyboard']
};
</script>
```

## Zoom Events

### Zooming Event

```vue
<template>
  <div>
    <ImageEditorComponent 
      ref="imgObj"
      width="550px" 
      height="350px"
      :zooming="onZooming"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);

const onZooming = (args) => {
  console.log('Zoom factor:', args.zoomFactor);
};
</script>
```

### Panning Event

```vue
<template>
  <div>
    <ImageEditorComponent 
      ref="imgObj"
      width="550px" 
      height="350px"
      :panning="onPanning"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);

const onPanning = (args) => {
  console.log('Panning:', args);
};
</script>
```

## Next Steps

- Learn about [text-annotations.md](./text-annotations.md)
- Explore [shape-annotations.md](./shape-annotations.md)
