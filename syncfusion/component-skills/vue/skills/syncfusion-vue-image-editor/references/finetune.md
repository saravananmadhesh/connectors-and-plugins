# Fine-Tuning

## Table of Contents
- [Brightness and Contrast](#brightness-and-contrast)
- [Color Adjustments](#color-adjustments)
- [Effects](#effects)
- [Finetune Events](#finetune-events)

## Brightness and Contrast

### Adjust Brightness

```vue
<template>
  <div>
    <label>Brightness: <input type="range" v-model.number="brightness" min="-100" max="100" @input="applyFinetune" /></label>
    <ImageEditorComponent ref="imgObj" width="550px" height="350px" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);
const brightness = ref(0);

const applyFinetune = () => {
  imgObj.value?.finetuneImage('Brightness', brightness.value);
};
</script>
```

### Adjust Contrast

```vue
<template>
  <div>
    <label>Contrast: <input type="range" v-model.number="contrast" min="-100" max="100" @input="applyFinetune" /></label>
    <ImageEditorComponent ref="imgObj" width="550px" height="350px" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);
const contrast = ref(0);

const applyFinetune = () => {
  imgObj.value?.finetuneImage('Contrast', contrast.value);
};
</script>
```

## Color Adjustments

### Adjust Saturation

```vue
<template>
  <div>
    <label>Saturation: <input type="range" v-model.number="saturation" min="-100" max="100" @input="applyFinetune" /></label>
    <ImageEditorComponent ref="imgObj" width="550px" height="350px" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);
const saturation = ref(0);

const applyFinetune = () => {
  imgObj.value?.finetuneImage('Saturation', saturation.value);
};
</script>
```

### Adjust Hue

```vue
<template>
  <div>
    <label>Hue: <input type="range" v-model.number="hue" min="-100" max="100" @input="applyFinetune" /></label>
    <ImageEditorComponent ref="imgObj" width="550px" height="350px" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);
const hue = ref(0);

const applyFinetune = () => {
  imgObj.value?.finetuneImage('Hue', hue.value);
};
</script>
```

### Adjust Exposure

```vue
<template>
  <div>
    <label>Exposure: <input type="range" v-model.number="exposure" min="-100" max="100" @input="applyFinetune" /></label>
    <ImageEditorComponent ref="imgObj" width="550px" height="350px" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);
const exposure = ref(0);

const applyFinetune = () => {
  imgObj.value?.finetuneImage('Exposure', exposure.value);
};
</script>
```

## Effects

### Adjust Blur

```vue
<template>
  <div>
    <label>Blur: <input type="range" v-model.number="blur" min="0" max="100" @input="applyFinetune" /></label>
    <ImageEditorComponent ref="imgObj" width="550px" height="350px" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);
const blur = ref(0);

const applyFinetune = () => {
  imgObj.value?.finetuneImage('Blur', blur.value);
};
</script>
```

### Adjust Opacity

```vue
<template>
  <div>
    <label>Opacity: <input type="range" v-model.number="opacity" min="0" max="100" @input="applyFinetune" /></label>
    <ImageEditorComponent ref="imgObj" width="550px" height="350px" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);
const opacity = ref(100);

const applyFinetune = () => {
  imgObj.value?.finetuneImage('Opacity', opacity.value);
};
</script>
```

## Finetune Events

### Finetune Value Changing Event

```vue
<template>
  <div>
    <ImageEditorComponent 
      ref="imgObj"
      width="550px" 
      height="350px"
      :finetuneValueChanging="onFinetuneChange"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);

const onFinetuneChange = (args) => {
  console.log('Finetune value changing:', args);
};
</script>
```

## Next Steps

- Learn about [undo-redo.md](./undo-redo.md)
- Explore [toolbar-customization.md](./toolbar-customization.md)
