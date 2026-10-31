# Reset Image

## Table of Contents
- [Reset All Modifications](#reset-all-modifications)
- [Restore Original State](#restore-original-state)
- [Clear Annotations and Effects](#clear-annotations-and-effects)

## Reset All Modifications

### Reset Image

```vue
<template>
  <div>
    <button @click="resetImage">Reset Image</button>
    <ImageEditorComponent ref="imgObj" width="550px" height="350px" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);

const resetImage = () => {
  imgObj.value?.reset();
};
</script>
```

### Reset with Confirmation

```vue
<template>
  <div>
    <button @click="confirmReset">Reset Image</button>
    <p v-if="message">{{ message }}</p>
    <ImageEditorComponent ref="imgObj" width="550px" height="350px" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);
const message = ref('');

const confirmReset = () => {
  if (confirm('Reset all modifications? This will restore the original image.')) {
    imgObj.value?.reset();
    message.value = 'Image reset to original';
  }
};
</script>
```

## Restore Original State

### Reset to Original

```vue
<template>
  <div>
    <button @click="restoreOriginal">Restore Original</button>
    <ImageEditorComponent ref="imgObj" width="550px" height="350px" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);

const restoreOriginal = () => {
  imgObj.value?.reset();
};
</script>
```

## Clear Annotations and Effects

### Clear All Annotations

```vue
<template>
  <div>
    <button @click="clearAll">Clear All</button>
    <ImageEditorComponent ref="imgObj" width="550px" height="350px" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);

const clearAll = () => {
  // Clear all shapes/annotations
  const shapes = imgObj.value?.getShapeSettings();
  if (shapes) {
    shapes.forEach(shape => {
      imgObj.value?.deleteShape(shape.id);
    });
  }
};
</script>
```

### Selective Reset

```vue
<template>
  <div>
    <button @click="resetAll">Full Reset</button>
    <button @click="clearAnnotations">Clear Annotations Only</button>
    <ImageEditorComponent ref="imgObj" width="550px" height="350px" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);

const resetAll = () => {
  imgObj.value?.reset();
};

const clearAnnotations = () => {
  const shapes = imgObj.value?.getShapeSettings();
  if (shapes) {
    shapes.forEach(shape => {
      imgObj.value?.deleteShape(shape.id);
    });
  }
};
</script>
```

## Next Steps

- Explore [api.md](./api.md) for complete API reference
- Learn about [opening-saving-images.md](./opening-saving-images.md)
