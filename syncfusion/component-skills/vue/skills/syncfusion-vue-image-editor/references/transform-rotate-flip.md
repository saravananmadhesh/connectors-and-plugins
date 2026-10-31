# Transform: Rotate, Flip, and Straighten

## Table of Contents
- [Rotate Image](#rotate-image)
- [Flip Image](#flip-image)
- [Straighten Image](#straighten-image)
- [Transform Events](#transform-events)

## Rotate Image

### Rotate Clockwise

Rotate image 90 degrees clockwise:

```vue
<template>
  <div>
    <button @click="rotateClockwise">Rotate 90° CW</button>
    <ImageEditorComponent ref="imgObj" width="550px" height="350px" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);

const rotateClockwise = () => {
  imgObj.value?.rotate(90);
};
</script>
```

### Rotate Counter-Clockwise

Rotate image 90 degrees counter-clockwise:

```vue
<template>
  <div>
    <button @click="rotateCounterClockwise">Rotate 90° CCW</button>
    <ImageEditorComponent ref="imgObj" width="550px" height="350px" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);

const rotateCounterClockwise = () => {
  imgObj.value?.rotate(-90);
};
</script>
```

### Rotate by Custom Degree

Rotate by any degree value:

```vue
<template>
  <div>
    <button @click="rotate45">Rotate 45°</button>
    <button @click="rotate180">Rotate 180°</button>
    <ImageEditorComponent ref="imgObj" width="550px" height="350px" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);

const rotate45 = () => {
  imgObj.value?.rotate(45);
};

const rotate180 = () => {
  imgObj.value?.rotate(180);
};
</script>
```

## Flip Image

### Flip Horizontally

```vue
<template>
  <div>
    <button @click="flipHorizontal">Flip Horizontal</button>
    <ImageEditorComponent ref="imgObj" width="550px" height="350px" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);

const flipHorizontal = () => {
  imgObj.value?.flip('Horizontal');
};
</script>
```

### Flip Vertically

```vue
<template>
  <div>
    <button @click="flipVertical">Flip Vertical</button>
    <ImageEditorComponent ref="imgObj" width="550px" height="350px" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);

const flipVertical = () => {
  imgObj.value?.flip('Vertical');
};
</script>
```

### Flip Both Directions

```vue
<template>
  <div>
    <button @click="flipHorizontal">Flip H</button>
    <button @click="flipVertical">Flip V</button>
    <ImageEditorComponent ref="imgObj" width="550px" height="350px" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);

const flipHorizontal = () => {
  imgObj.value?.flip('Horizontal');
};

const flipVertical = () => {
  imgObj.value?.flip('Vertical');
};
</script>
```

## Straighten Image

### Straighten with Degree Adjustment

Straighten image within -45° to +45° range:

```vue
<template>
  <div>
    <button @click="straighten(-5)">-5°</button>
    <button @click="straighten(-2)">-2°</button>
    <button @click="straighten(2)">+2°</button>
    <button @click="straighten(5)">+5°</button>
    <ImageEditorComponent ref="imgObj" width="550px" height="350px" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);

const straighten = (degree) => {
  imgObj.value?.straightenImage(degree);
};
</script>
```

## Transform Events

### Rotating Event

```vue
<template>
  <div>
    <ImageEditorComponent 
      ref="imgObj"
      width="550px" 
      height="350px"
      :rotating="onRotating"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);

const onRotating = (args) => {
  console.log('Rotating to:', args.degree);
};
</script>
```

### Flipping Event

```vue
<template>
  <div>
    <ImageEditorComponent 
      ref="imgObj"
      width="550px" 
      height="350px"
      :flipping="onFlipping"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);

const onFlipping = (args) => {
  console.log('Flipping:', args.direction);
};
</script>
```

## Next Steps

- Explore [zooming-panning.md](./zooming-panning.md) for zoom operations
- Learn about [resize-image.md](./resize-image.md)
