# Shape Annotations

## Table of Contents
- [Draw Shapes](#draw-shapes)
- [Customize Shapes](#customize-shapes)
- [Shape Rotation](#shape-rotation)
- [Delete Shapes](#delete-shapes)
- [Shape Events](#shape-events)

## Draw Shapes

### Draw Rectangle

```vue
<template>
  <div>
    <button @click="drawRect">Draw Rectangle</button>
    <ImageEditorComponent ref="imgObj" width="550px" height="350px" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);

const drawRect = () => {
  const dimension = imgObj.value?.getImageDimension();
  imgObj.value?.drawShape('Rectangle', {
    x: dimension.x + 50,
    y: dimension.y + 50,
    width: 150,
    height: 100
  });
};
</script>
```

### Draw Ellipse

```vue
<template>
  <div>
    <button @click="drawEllipse">Draw Ellipse</button>
    <ImageEditorComponent ref="imgObj" width="550px" height="350px" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);

const drawEllipse = () => {
  const dimension = imgObj.value?.getImageDimension();
  imgObj.value?.drawShape('Ellipse', {
    x: dimension.x + 50,
    y: dimension.y + 50,
    width: 150,
    height: 100
  });
};
</script>
```

### Draw Line

```vue
<template>
  <div>
    <button @click="drawLine">Draw Line</button>
    <ImageEditorComponent ref="imgObj" width="550px" height="350px" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);

const drawLine = () => {
  const dimension = imgObj.value?.getImageDimension();
  imgObj.value?.drawShape('Line', {
    startX: dimension.x + 50,
    startY: dimension.y + 50,
    endX: dimension.x + 200,
    endY: dimension.y + 200
  });
};
</script>
```

### Draw Arrow

```vue
<template>
  <div>
    <button @click="drawArrow">Draw Arrow</button>
    <ImageEditorComponent ref="imgObj" width="550px" height="350px" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);

const drawArrow = () => {
  const dimension = imgObj.value?.getImageDimension();
  imgObj.value?.drawShape('Arrow', {
    startX: dimension.x + 50,
    startY: dimension.y + 50,
    endX: dimension.x + 200,
    endY: dimension.y + 200
  });
};
</script>
```

## Customize Shapes

### Stroke and Fill Colors

```vue
<template>
  <div>
    <button @click="drawStyled">Styled Shape</button>
    <ImageEditorComponent ref="imgObj" width="550px" height="350px" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);

const drawStyled = () => {
  const dimension = imgObj.value?.getImageDimension();
  imgObj.value?.drawShape('Rectangle', {
    x: dimension.x + 50,
    y: dimension.y + 50,
    width: 150,
    height: 100,
    strokeColor: 'red',
    strokeWidth: 3,
    fillColor: 'yellow'
  });
};
</script>
```

## Shape Rotation

### Rotate Shape

```vue
<template>
  <div>
    <button @click="rotateShape">Rotate 45°</button>
    <ImageEditorComponent ref="imgObj" width="550px" height="350px" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);

const rotateShape = () => {
  const shapes = imgObj.value?.getShapeSettings();
  if (shapes && shapes.length > 0) {
    const shape = shapes[shapes.length - 1];
    imgObj.value?.rotateShape(shape.id, 45);
  }
};
</script>
```

## Delete Shapes

### Delete Shape by ID

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
    imgObj.value?.deleteShape(shapes[shapes.length - 1].id);
  }
};
</script>
```

## Shape Events

### Shape Changing Event

```vue
<template>
  <div>
    <ImageEditorComponent 
      ref="imgObj"
      width="550px" 
      height="350px"
      :shapeChanging="onShapeChanging"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);

const onShapeChanging = (args) => {
  if (args.currentShapeSettings.type === 'Rectangle') {
    args.currentShapeSettings.strokeColor = 'blue';
    args.currentShapeSettings.fillColor = 'lightblue';
  }
};
</script>
```

## Next Steps

- Learn about [image-annotations.md](./image-annotations.md)
- Explore [filters.md](./filters.md)
