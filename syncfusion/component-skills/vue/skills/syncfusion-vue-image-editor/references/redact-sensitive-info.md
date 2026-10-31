# Redact Sensitive Information

## Table of Contents
- [Blur Sensitive Areas](#blur-sensitive-areas)
- [Pixelate Information](#pixelate-information)
- [Redact CRUD Operations](#redact-crud-operations)
- [Privacy and Compliance](#privacy-and-compliance)

## Blur Sensitive Areas

### Apply Blur Redaction

```vue
<template>
  <div>
    <button @click="applyBlur">Apply Blur Redaction</button>
    <ImageEditorComponent ref="imgObj" width="550px" height="350px" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);

const applyBlur = () => {
  const dim = imgObj.value?.getImageDimension();
  imgObj.value?.drawRedaction('Blur', {
    x: dim.x + 100,
    y: dim.y + 100,
    width: 150,
    height: 50
  });
};
</script>
```

### Custom Blur Settings

```vue
<template>
  <div>
    <button @click="applyCustomBlur">Custom Blur</button>
    <ImageEditorComponent ref="imgObj" width="550px" height="350px" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);

const applyCustomBlur = () => {
  const dim = imgObj.value?.getImageDimension();
  imgObj.value?.drawRedaction('Blur', {
    x: dim.x + 100,
    y: dim.y + 100,
    width: 200,
    height: 60
  });
};
</script>
```

## Pixelate Information

### Apply Pixelate Redaction

```vue
<template>
  <div>
    <button @click="applyPixelate">Apply Pixelate</button>
    <ImageEditorComponent ref="imgObj" width="550px" height="350px" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);

const applyPixelate = () => {
  const dim = imgObj.value?.getImageDimension();
  imgObj.value?.drawRedaction('Pixelate', {
    x: dim.x + 100,
    y: dim.y + 100,
    width: 150,
    height: 50
  });
};
</script>
```

## Redact CRUD Operations

### Select Redaction

```vue
<template>
  <div>
    <button @click="selectFirstRedaction">Select First</button>
    <ImageEditorComponent ref="imgObj" width="550px" height="350px" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);

const selectFirstRedaction = () => {
  const shapes = imgObj.value?.getShapeSettings();
  if (shapes && shapes.length > 0) {
    imgObj.value?.selectShape(shapes[0].id);
  }
};
</script>
```

### Update Redaction

```vue
<template>
  <div>
    <button @click="updateRedaction">Update</button>
    <ImageEditorComponent ref="imgObj" width="550px" height="350px" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);

const updateRedaction = () => {
  const shapes = imgObj.value?.getShapeSettings();
  if (shapes && shapes.length > 0) {
    const redaction = shapes.find(s => s.type === 'Redact');
    if (redaction) {
      redaction.width = 200;
      imgObj.value?.updateShape(redaction);
    }
  }
};
</script>
```

### Delete Redaction

```vue
<template>
  <div>
    <button @click="deleteRedaction">Delete Redaction</button>
    <ImageEditorComponent ref="imgObj" width="550px" height="350px" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);

const deleteRedaction = () => {
  const shapes = imgObj.value?.getShapeSettings();
  if (shapes) {
    const redaction = shapes.find(s => s.type === 'Redact');
    if (redaction) {
      imgObj.value?.deleteShape(redaction.id);
    }
  }
};
</script>
```

## Privacy and Compliance

### Redact Before Export

```vue
<template>
  <div>
    <button @click="redactAndExport">Redact & Export</button>
    <ImageEditorComponent ref="imgObj" width="550px" height="350px" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);

const redactAndExport = () => {
  // Apply redactions
  const dim = imgObj.value?.getImageDimension();
  imgObj.value?.drawRedaction('Blur', {
    x: dim.x + 50,
    y: dim.y + 50,
    width: 200,
    height: 40
  });
  imgObj.value?.drawRedaction('Pixelate', {
    x: dim.x + 50,
    y: dim.y + 100,
    width: 200,
    height: 40
  });
  
  // Export the redacted image
  setTimeout(() => {
    const data = imgObj.value?.getImageData();
    console.log('Redacted image data:', data);
  }, 500);
};
</script>
```

## Next Steps

- Learn about [accessibility-localization.md](./accessibility-localization.md)
- Explore [image-restrictions-validation.md](./image-restrictions-validation.md)
