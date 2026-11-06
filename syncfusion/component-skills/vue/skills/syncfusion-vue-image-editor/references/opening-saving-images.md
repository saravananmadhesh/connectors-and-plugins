# Opening and Saving Images

## Table of Contents
- [Opening Images](#opening-images)
- [Saving and Exporting](#saving-and-exporting)
- [Image Dimensions](#image-dimensions)
- [File Events](#file-events)

## Opening Images

### Open from URL

Open an image from a remote URL:

```vue
<template>
  <div>
    <button @click="openFromUrl">Open from URL</button>
    <ImageEditorComponent ref="imgObj" width="550px" height="350px" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);

const openFromUrl = () => {
  imgObj.value?.open('https://ej2.syncfusion.com/vue/documentation/image-editor/images/bridge.jpeg');
};
</script>
```

### Open from Base64

Open an image from a base64 string:

```vue
<template>
  <div>
    <button @click="openFromBase64">Open Base64</button>
    <ImageEditorComponent ref="imgObj" width="550px" height="350px" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);

const openFromBase64 = () => {
  const base64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
  imgObj.value?.open(base64);
};
</script>
```

### Open from Blob

Open an image from a Blob object:

```vue
<template>
  <div>
    <input type="file" @change="onFileChange" accept="image/*" />
    <ImageEditorComponent ref="imgObj" width="550px" height="350px" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);

const onFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    const blob = new Blob([file], { type: file.type });
    imgObj.value?.open(blob);
  }
};
</script>
```

### Open from File Uploader

Use Syncfusion Uploader component:

```vue
<template>
  <div>
    <UploaderComponent :asyncSettings="path" :success="onUploadSuccess" />
    <ImageEditorComponent ref="imgObj" width="550px" height="350px" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';
import { UploaderComponent } from '@syncfusion/ej2-vue-inputs';

const imgObj = ref(null);

const path = {
  saveUrl: 'https://ej2.syncfusion.com/services/api/uploadbox/Save',
  removeUrl: 'https://ej2.syncfusion.com/services/api/uploadbox/Remove'
};

const onUploadSuccess = (args) => {
  imgObj.value?.open(args.file.rawFile);
};
</script>
```

## Saving and Exporting

### Export as PNG

```vue
<template>
  <div>
    <button @click="exportPng">Export PNG</button>
    <ImageEditorComponent ref="imgObj" width="550px" height="350px" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);

const exportPng = () => {
  const imageData = imgObj.value?.getImageData();
  console.log('PNG data:', imageData);
};
</script>
```

### Export to Base64

```vue
<template>
  <div>
    <button @click="exportToBase64">Export Base64</button>
    <p v-if="base64Data">Data: {{ base64Data.substring(0, 50) }}...</p>
    <ImageEditorComponent ref="imgObj" width="550px" height="350px" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);
const base64Data = ref('');

const exportToBase64 = () => {
  const data = imgObj.value?.getImageData();
  base64Data.value = data;
};
</script>
```

## Image Dimensions

### Get Image Dimensions

```vue
<template>
  <div>
    <button @click="getDimensions">Get Dimensions</button>
    <p v-if="dimensions">Width: {{ dimensions.width }}, Height: {{ dimensions.height }}</p>
    <ImageEditorComponent ref="imgObj" width="550px" height="350px" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);
const dimensions = ref(null);

const getDimensions = () => {
  const dim = imgObj.value?.getImageDimension();
  dimensions.value = dim;
};
</script>
```

## File Events

### File Opened Event

```vue
<template>
  <div>
    <ImageEditorComponent 
      ref="imgObj"
      width="550px" 
      height="350px"
      :fileOpened="onFileOpened"
      :created="onCreated"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);

const onCreated = () => {
  imgObj.value?.open('https://ej2.syncfusion.com/vue/documentation/image-editor/images/bridge.jpeg');
};

const onFileOpened = (args) => {
  console.log('File opened:', args.fileName);
  console.log('Image dimensions:', args.imageData?.width, 'x', args.imageData?.height);
};
</script>
```

### Before Save Event

```vue
<template>
  <div>
    <button @click="saveImage">Save</button>
    <ImageEditorComponent 
      ref="imgObj"
      width="550px" 
      height="350px"
      :beforeSave="onBeforeSave"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);

const onBeforeSave = (args) => {
  console.log('Saving image...');
  // You can modify args.cancel to prevent save
};

const saveImage = () => {
  const data = imgObj.value?.getImageData();
  console.log('Saved data:', data);
};
</script>
```

## Next Steps

- Learn about [selection-cropping.md](./selection-cropping.md) for cropping images
- Explore [transform-rotate-flip.md](./transform-rotate-flip.md) for transformations
