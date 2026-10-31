# Clear Image

## Table of Contents
- [Clear Editor State](#clear-editor-state)
- [Dialog Reuse Pattern](#dialog-reuse-pattern)
- [Remove Loaded Images](#remove-loaded-images)

## Clear Editor State

### Clear Image

```vue
<template>
  <div>
    <button @click="clearImage">Clear Image</button>
    <ImageEditorComponent ref="imgObj" width="550px" height="350px" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);

const clearImage = () => {
  imgObj.value?.clearImage();
};
</script>
```

### Clear with Confirmation

```vue
<template>
  <div>
    <button @click="confirmClear">Clear Image</button>
    <p v-if="message">{{ message }}</p>
    <ImageEditorComponent ref="imgObj" width="550px" height="350px" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);
const message = ref('');

const confirmClear = () => {
  if (confirm('Are you sure you want to clear the image?')) {
    imgObj.value?.clearImage();
    message.value = 'Image cleared';
  }
};
</script>
```

## Dialog Reuse Pattern

### Clear Before Closing Dialog

```vue
<template>
  <div>
    <button @click="openDialog">Open Editor</button>
    <DialogComponent 
      ref="dialogObj"
      header="Image Editor"
      :visible="dialogVisible"
      width="600px"
      :close="onDialogClose"
    >
      <ImageEditorComponent 
        ref="imgObj"
        width="550px" 
        height="350px"
        :created="onCreated"
      />
    </DialogComponent>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';
import { DialogComponent } from '@syncfusion/ej2-vue-popups';

const imgObj = ref(null);
const dialogObj = ref(null);
const dialogVisible = ref(false);

const openDialog = () => {
  dialogVisible.value = true;
};

const onCreated = () => {
  imgObj.value?.open('https://ej2.syncfusion.com/vue/documentation/image-editor/images/bridge.jpeg');
};

const onDialogClose = () => {
  imgObj.value?.clearImage();
  dialogVisible.value = false;
};
</script>
```

## Remove Loaded Images

### Reset to Empty State

```vue
<template>
  <div>
    <button @click="resetEditor">Reset Editor</button>
    <ImageEditorComponent ref="imgObj" width="550px" height="350px" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);

const resetEditor = () => {
  imgObj.value?.clearImage();
};
</script>
```

## Next Steps

- Learn about [fit-width-height.md](./fit-width-height.md)
- Explore [render-in-dialog.md](./render-in-dialog.md)
