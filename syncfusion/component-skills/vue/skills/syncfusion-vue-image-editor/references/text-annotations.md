# Text Annotations

## Table of Contents
- [Adding Text](#adding-text)
- [Text Styling](#text-styling)
- [Font Customization](#font-customization)
- [Multiline Text](#multiline-text)
- [Managing Text Annotations](#managing-text-annotations)

## Adding Text

### Basic Text

Add simple text annotation at specific coordinates:

```vue
<template>
  <div>
    <button @click="addText">Add Text</button>
    <ImageEditorComponent ref="imgObj" width="550px" height="350px" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);

const addText = () => {
  const dimension = imgObj.value?.getImageDimension();
  imgObj.value?.drawText(dimension.x, dimension.y, 'Sample Text');
};
</script>
```

### Text with Font Properties

Add text with customized font settings:

```vue
<template>
  <div>
    <button @click="addStyledText">Add Styled Text</button>
    <ImageEditorComponent ref="imgObj" width="550px" height="350px" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);

const addStyledText = () => {
  const dimension = imgObj.value?.getImageDimension();
  imgObj.value?.drawText(
    dimension.x + 50,
    dimension.y + 50,
    'Syncfusion',
    'Arial',
    30,
    false,
    false,
    'blue'
  );
};
</script>
```

### Text with Background and Outline

Add text with background color and stroke:

```vue
<template>
  <div>
    <button @click="addTextWithOutline">Add Watermark</button>
    <ImageEditorComponent ref="imgObj" width="550px" height="350px" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);

const addTextWithOutline = () => {
  const dimension = imgObj.value?.getImageDimension();
  imgObj.value?.drawText(
    dimension.x + 100,
    dimension.y + 100,
    'Watermark',
    'Arial',
    40,
    false,
    false,
    'white',
    false,
    0,
    'red',
    'black',
    2
  );
};
</script>
```

### Text with Rotation

Add text rotated by specific degree:

```vue
<template>
  <div>
    <button @click="addRotatedText">Add Rotated</button>
    <ImageEditorComponent ref="imgObj" width="550px" height="350px" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);

const addRotatedText = () => {
  const dimension = imgObj.value?.getImageDimension();
  imgObj.value?.drawText(
    dimension.x + 50,
    dimension.y + 50,
    'Rotated Text',
    'Arial',
    25,
    false,
    false,
    'black',
    false,
    45
  );
};
</script>
```

## Text Styling

### Bold Text

```vue
<template>
  <div>
    <button @click="addBold">Bold</button>
    <button @click="addItalic">Italic</button>
    <button @click="addBoldItalic">Bold Italic</button>
    <ImageEditorComponent ref="imgObj" width="550px" height="350px" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);

const addBold = () => {
  const dimension = imgObj.value?.getImageDimension();
  imgObj.value?.drawText(dimension.x, dimension.y, 'Bold Text', 'Arial', 25, true, false);
};

const addItalic = () => {
  const dimension = imgObj.value?.getImageDimension();
  imgObj.value?.drawText(dimension.x, dimension.y, 'Italic Text', 'Arial', 25, false, true);
};

const addBoldItalic = () => {
  const dimension = imgObj.value?.getImageDimension();
  imgObj.value?.drawText(dimension.x, dimension.y, 'Bold Italic', 'Arial', 25, true, true);
};
</script>
```

## Font Customization

### Add Custom Font Families

```vue
<template>
  <div>
    <ImageEditorComponent 
      ref="imgObj"
      width="550px" 
      height="350px"
      :fontFamily="fontFamily"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);

const fontFamily = {
  default: 'Arial',
  items: [
    { id: 'arial', text: 'Arial' },
    { id: 'brush script mt', text: 'Brush Script MT' },
    { id: 'papyrus', text: 'Papyrus' },
    { id: 'times new roman', text: 'Times New Roman' },
    { id: 'courier new', text: 'Courier New' }
  ]
};
</script>
```

## Multiline Text

### Add Multiline Text

```vue
<template>
  <div>
    <button @click="addMultiline">Multiline</button>
    <ImageEditorComponent ref="imgObj" width="550px" height="350px" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);

const addMultiline = () => {
  const dimension = imgObj.value?.getImageDimension();
  imgObj.value?.drawText(
    dimension.x,
    dimension.y,
    'Line 1\nLine 2\nLine 3',
    'Arial',
    20
  );
};
</script>
```

## Managing Text Annotations

### Delete Text Annotation

```vue
<template>
  <div>
    <button @click="deleteLastText">Delete Last</button>
    <ImageEditorComponent ref="imgObj" width="550px" height="350px" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);

const deleteLastText = () => {
  const shapes = imgObj.value?.getShapeSettings();
  if (shapes && shapes.length > 0) {
    imgObj.value?.deleteShape(shapes[shapes.length - 1].id);
  }
};
</script>
```

## Next Steps

- Learn about [shape-annotations.md](./shape-annotations.md)
- Explore [freehand-drawing.md](./freehand-drawing.md)
