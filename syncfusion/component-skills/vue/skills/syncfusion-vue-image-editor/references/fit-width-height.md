# Fit to Width and Height

## Table of Contents
- [Fit to Container Width](#fit-to-container-width)
- [Fit to Container Height](#fit-to-container-height)
- [Zoom Calculations](#zoom-calculations)

## Fit to Container Width

### Fit Width

```vue
<template>
  <div>
    <button @click="fitToWidth">Fit to Width</button>
    <ImageEditorComponent ref="imgObj" width="550px" height="350px" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);

const fitToWidth = () => {
  imgObj.value?.fitToWidth();
};
</script>
```

## Fit to Container Height

### Fit Height

```vue
<template>
  <div>
    <button @click="fitToHeight">Fit to Height</button>
    <ImageEditorComponent ref="imgObj" width="550px" height="350px" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);

const fitToHeight = () => {
  imgObj.value?.fitToHeight();
};
</script>
```

## Zoom Calculations

### Calculate Perfect Fit

```vue
<template>
  <div>
    <button @click="calculateFit">Calculate Fit</button>
    <p v-if="zoomInfo">Zoom factor: {{ zoomInfo }}</p>
    <ImageEditorComponent ref="imgObj" width="550px" height="350px" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);
const zoomInfo = ref(null);

const calculateFit = () => {
  const dim = imgObj.value?.getImageDimension();
  const currentZoom = imgObj.value?.getZoomFactor() || 1;
  
  if (dim) {
    // Calculate ratio
    const ratio = 550 / dim.width;
    zoomInfo.value = `Required zoom: ${ratio}, Current: ${currentZoom}`;
  }
};
</script>
```

### Auto Fit on Load

```vue
<template>
  <div>
    <ImageEditorComponent 
      ref="imgObj"
      width="550px" 
      height="350px"
      :fileOpened="onFileOpened"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);

const onFileOpened = () => {
  setTimeout(() => {
    imgObj.value?.fitToWidth();
  }, 100);
};
</script>
```

## Next Steps

- Learn about [render-in-dialog.md](./render-in-dialog.md)
- Explore [reset-image.md](./reset-image.md)
