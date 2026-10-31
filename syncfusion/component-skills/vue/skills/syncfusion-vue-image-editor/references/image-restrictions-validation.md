# Image Restrictions and Validation

## Table of Contents
- [Allowed File Extensions](#allowed-file-extensions)
- [File Size Restrictions](#file-size-restrictions)
- [File Validation](#file-validation)
- [Error Handling](#error-handling)

## Allowed File Extensions

### Configure Upload Settings

```vue
<template>
  <div>
    <ImageEditorComponent 
      ref="imgObj"
      width="550px" 
      height="350px"
      :uploadSettings="uploadSettings"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);

const uploadSettings = {
  allowedExtensions: '.jpg, .png, .jpeg, .svg, .webp, .bmp',
  minFileSize: 1024,
  maxFileSize: 10485760  // 10 MB
};
</script>
```

### Custom Extensions

```vue
<template>
  <div>
    <ImageEditorComponent 
      ref="imgObj"
      width="550px" 
      height="350px"
      :uploadSettings="customSettings"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);

const customSettings = {
  allowedExtensions: '.png, .jpg, .jpeg'
};
</script>
```

## File Size Restrictions

### Set Min and Max Size

```vue
<template>
  <div>
    <ImageEditorComponent 
      ref="imgObj"
      width="550px" 
      height="350px"
      :uploadSettings="sizeSettings"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);

const sizeSettings = {
  minFileSize: 1024,      // 1 KB
  maxFileSize: 5242880    // 5 MB
};
</script>
```

## File Validation

### Validate Before Open

```vue
<template>
  <div>
    <input type="file" @change="onFileSelect" accept="image/*" />
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    <ImageEditorComponent ref="imgObj" width="550px" height="350px" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);
const errorMessage = ref('');

const allowedTypes = ['image/jpeg', 'image/png', 'image/svg+xml', 'image/webp', 'image/bmp'];
const maxSize = 10485760; // 10 MB

const onFileSelect = (event) => {
  const file = event.target.files[0];
  
  if (!file) return;
  
  if (!allowedTypes.includes(file.type)) {
    errorMessage.value = 'Invalid file type. Allowed: JPEG, PNG, SVG, WEBP, BMP';
    return;
  }
  
  if (file.size > maxSize) {
    errorMessage.value = 'File too large. Max size: 10 MB';
    return;
  }
  
  errorMessage.value = '';
  imgObj.value?.open(file);
};
</script>
```

## Error Handling

### Handle Upload Errors

```vue
<template>
  <div>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
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
const errorMessage = ref('');

const onFileOpened = (args) => {
  if (!args.imageData) {
    errorMessage.value = 'Failed to load image';
  } else {
    errorMessage.value = '';
  }
};
</script>
```

## Next Steps

- Learn about [clear-image.md](./clear-image.md)
- Explore [fit-width-height.md](./fit-width-height.md)
