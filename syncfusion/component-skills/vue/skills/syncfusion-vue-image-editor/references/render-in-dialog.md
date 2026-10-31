# Render in Dialog

## Table of Contents
- [Basic Dialog Integration](#basic-dialog-integration)
- [Content Template](#content-template)
- [Dialog Show/Hide](#dialog-showhide)
- [Advanced Patterns](#advanced-patterns)

## Basic Dialog Integration

### Render Image Editor in Dialog

```vue
<template>
  <div>
    <button @click="openDialog">Open Image Editor</button>
    
    <DialogComponent 
      ref="dialogObj"
      header="Image Editor"
      :visible="dialogVisible"
      width="600px"
      :showCloseIcon="true"
      :close="onClose"
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

const onClose = () => {
  dialogVisible.value = false;
};
</script>
```

## Content Template

### Custom Content

```vue
<template>
  <div>
    <button @click="showDialog">Edit Image</button>
    
    <DialogComponent 
      :visible="dialogVisible"
      header="Edit Image"
      width="650px"
      :close="hideDialog"
    >
      <div class="dialog-content">
        <ImageEditorComponent 
          ref="imgObj"
          width="600px" 
          height="400px"
          :created="onCreated"
        />
        <div class="dialog-actions">
          <button @click="saveAndClose">Save & Close</button>
          <button @click="cancelEdit">Cancel</button>
        </div>
      </div>
    </DialogComponent>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';
import { DialogComponent } from '@syncfusion/ej2-vue-popups';

const imgObj = ref(null);
const dialogVisible = ref(false);
const imageData = ref(null);

const showDialog = () => {
  dialogVisible.value = true;
};

const hideDialog = () => {
  dialogVisible.value = false;
};

const onCreated = () => {
  imgObj.value?.open('https://ej2.syncfusion.com/vue/documentation/image-editor/images/bridge.jpeg');
};

const saveAndClose = () => {
  imageData.value = imgObj.value?.getImageData();
  imgObj.value?.clearImage();
  hideDialog();
};

const cancelEdit = () => {
  imgObj.value?.clearImage();
  hideDialog();
};
</script>
```

## Dialog Show/Hide

### Toggle Dialog

```vue
<template>
  <div>
    <button @click="toggleDialog">
      {{ dialogVisible ? 'Close' : 'Open' }} Editor
    </button>
    
    <DialogComponent 
      :visible="dialogVisible"
      header="Image Editor"
      width="600px"
      :close="toggleDialog"
    >
      <ImageEditorComponent 
        ref="imgObj"
        width="550px" 
        height="350px"
        :fileOpened="onFileOpened"
      />
    </DialogComponent>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';
import { DialogComponent } from '@syncfusion/ej2-vue-popups';

const imgObj = ref(null);
const dialogVisible = ref(false);

const toggleDialog = () => {
  dialogVisible.value = !dialogVisible.value;
  
  if (dialogVisible.value) {
    setTimeout(() => {
      imgObj.value?.open('https://ej2.syncfusion.com/vue/documentation/image-editor/images/bridge.jpeg');
    }, 100);
  } else {
    imgObj.value?.clearImage();
  }
};

const onFileOpened = () => {
  console.log('File loaded in dialog');
};
</script>
```

## Advanced Patterns

### Modal Image Editor

```vue
<template>
  <div>
    <button @click="openModal">Edit Image (Modal)</button>
    
    <DialogComponent 
      :visible="dialogVisible"
      header="Image Editor - Modal Mode"
      width="700px"
      :isModal="true"
      :closeOnEscape="true"
      :close="closeDialog"
    >
      <ImageEditorComponent 
        ref="imgObj"
        width="650px" 
        height="400px"
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
const dialogVisible = ref(false);

const openModal = () => {
  dialogVisible.value = true;
};

const closeDialog = () => {
  imgObj.value?.clearImage();
  dialogVisible.value = false;
};

const onCreated = () => {
  imgObj.value?.open('https://ej2.syncfusion.com/vue/documentation/image-editor/images/bridge.jpeg');
};
</script>
```

## Next Steps

- Learn about [reset-image.md](./reset-image.md)
- Explore [api.md](./api.md)
