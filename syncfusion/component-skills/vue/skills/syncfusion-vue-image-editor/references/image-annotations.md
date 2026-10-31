# Image Annotations

## Table of Contents
- [Add Image Annotation](#add-image-annotation)
- [Customize Image Properties](#customize-image-properties)
- [Watermarks](#watermarks)
- [Manage Image Annotations](#manage-image-annotations)

## Add Image Annotation

### Basic Image Annotation

Add an image as an annotation:

```vue
<template>
  <div>
    <button @click="addImage">Add Image</button>
    <ImageEditorComponent ref="imgObj" width="550px" height="350px" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);

const addImage = () => {
  const dimension = imgObj.value?.getImageDimension();
  imgObj.value?.drawImage('https://ej2.syncfusion.com/vue/documentation/image-editor/images/bridge.jpeg', {
    x: dimension.x + 50,
    y: dimension.y + 50,
    width: 150,
    height: 100
  });
};
</script>
```

### Add Icon

Add an icon as annotation:

```vue
<template>
  <div>
    <button @click="addIcon">Add Icon</button>
    <ImageEditorComponent ref="imgObj" width="550px" height="350px" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);

const addIcon = () => {
  const dimension = imgObj.value?.getImageDimension();
  imgObj.value?.drawImage('https://ej2.syncfusion.com/vue/documentation/image-editor/images/icon.png', {
    x: dimension.x + 50,
    y: dimension.y + 50,
    width: 50,
    height: 50
  });
};
</script>
```

## Customize Image Properties

### Image with Rotation and Opacity

```vue
<template>
  <div>
    <button @click="addCustomImage">Add Custom</button>
    <ImageEditorComponent ref="imgObj" width="550px" height="350px" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);

const addCustomImage = () => {
  const dimension = imgObj.value?.getImageDimension();
  imgObj.value?.drawImage('https://ej2.syncfusion.com/vue/documentation/image-editor/images/bridge.jpeg', {
    x: dimension.x + 50,
    y: dimension.y + 50,
    width: 200,
    height: 150,
    rotation: 45,
    opacity: 0.7
  });
};
</script>
```

### Aspect Ratio Preservation

```vue
<template>
  <div>
    <button @click="addAspectRatio">With Aspect Ratio</button>
    <ImageEditorComponent ref="imgObj" width="550px" height="350px" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);

const addAspectRatio = () => {
  const dimension = imgObj.value?.getImageDimension();
  imgObj.value?.drawImage('https://ej2.syncfusion.com/vue/documentation/image-editor/images/bridge.jpeg', {
    x: dimension.x + 50,
    y: dimension.y + 50,
    width: 200,
    height: 150,
    isAspectRatio: true
  });
};
</script>
```

## Watermarks

### Add Watermark

```vue
<template>
  <div>
    <button @click="addWatermark">Add Watermark</button>
    <ImageEditorComponent ref="imgObj" width="550px" height="350px" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);

const addWatermark = () => {
  const dimension = imgObj.value?.getImageDimension();
  imgObj.value?.drawImage('https://ej2.syncfusion.com/vue/documentation/image-editor/images/watermark.png', {
    x: dimension.width / 2 - 50,
    y: dimension.height / 2 - 50,
    width: 100,
    height: 100,
    opacity: 0.5
  });
};
</script>
```

## Manage Image Annotations

### Delete Image Annotation

```vue
<template>
  <div>
    <button @click="deleteLast">Delete Last</button>
    <ImageEditorComponent ref="imgObj" width="550px" height="350px" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);

const deleteLast = () => {
  const shapes = imgObj.value?.getShapeSettings();
  if (shapes && shapes.length > 0) {
    const imageShape = shapes.filter(s => s.type === 'Image').pop();
    if (imageShape) {
      imgObj.value?.deleteShape(imageShape.id);
    }
  }
};
</script>
```

## Next Steps

- Explore [filters.md](./filters.md)
- Learn about [finetune.md](./finetune.md)
