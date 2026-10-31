# Filters

## Table of Contents
- [Predefined Filters](#predefined-filters)
- [Filter Events](#filter-events)
- [Reset Filter](#reset-filter)

## Predefined Filters

### Chrome Filter

Apply Chrome filter:

```vue
<template>
  <div>
    <button @click="applyChrome">Chrome</button>
    <button @click="applyCold">Cold</button>
    <button @click="applyWarm">Warm</button>
    <button @click="applyGrayscale">Grayscale</button>
    <button @click="applySepia">Sepia</button>
    <button @click="applyInvert">Invert</button>
    <ImageEditorComponent ref="imgObj" width="550px" height="350px" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);

const applyChrome = () => imgObj.value?.applyImageFilter('Chrome');
const applyCold = () => imgObj.value?.applyImageFilter('Cold');
const applyWarm = () => imgObj.value?.applyImageFilter('Warm');
const applyGrayscale = () => imgObj.value?.applyImageFilter('Grayscale');
const applySepia = () => imgObj.value?.applyImageFilter('Sepia');
const applyInvert = () => imgObj.value?.applyImageFilter('Invert');
</script>
```

### Apply Filter with Type

```vue
<template>
  <div>
    <select v-model="selectedFilter" @change="applyFilter">
      <option value="Chrome">Chrome</option>
      <option value="Cold">Cold</option>
      <option value="Warm">Warm</option>
      <option value="Grayscale">Grayscale</option>
      <option value="Sepia">Sepia</option>
      <option value="Invert">Invert</option>
    </select>
    <ImageEditorComponent ref="imgObj" width="550px" height="350px" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);
const selectedFilter = ref('Chrome');

const applyFilter = () => {
  imgObj.value?.applyImageFilter(selectedFilter.value);
};
</script>
```

## Filter Events

### Image Filtering Event

```vue
<template>
  <div>
    <button @click="applyChrome">Apply Filter</button>
    <ImageEditorComponent 
      ref="imgObj"
      width="550px" 
      height="350px"
      :imageFiltering="onImageFiltering"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);

const applyChrome = () => {
  imgObj.value?.applyImageFilter('Chrome');
};

const onImageFiltering = (args) => {
  console.log('Filter applied:', args.filter);
};
</script>
```

## Reset Filter

### Reset to Original

```vue
<template>
  <div>
    <button @click="applyChrome">Apply Chrome</button>
    <button @click="resetFilter">Reset Filter</button>
    <ImageEditorComponent ref="imgObj" width="550px" height="350px" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);

const applyChrome = () => {
  imgObj.value?.applyImageFilter('Chrome');
};

const resetFilter = () => {
  // Use undo or reset to clear filters
  imgObj.value?.reset();
};
</script>
```

## Next Steps

- Learn about [finetune.md](./finetune.md) for fine adjustments
- Explore [undo-redo.md](./undo-redo.md)
