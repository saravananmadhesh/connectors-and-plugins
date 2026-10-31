# Toolbar Customization

## Table of Contents
- [Built-in Toolbar Items](#built-in-toolbar-items)
- [Customize Toolbar](#customize-toolbar)
- [Custom Toolbar Items](#custom-toolbar-items)
- [Toolbar Events](#toolbar-events)

## Built-in Toolbar Items

The Image Editor includes 20+ default toolbar items. Configure them via the `toolbar` property:

```vue
<template>
  <div>
    <ImageEditorComponent 
      ref="imgObj"
      width="550px" 
      height="350px"
      :toolbar="toolbarItems"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);

const toolbarItems = [
  'Open', 'Save', 'ZoomIn', 'ZoomOut', 'Reset', 
  'Undo', 'Redo', 'Crop', 'RotateLeft', 'RotateRight',
  'FlipHorizontal', 'FlipVertical', 'Straighten', 'FreehandDraw',
  'Shape', 'Text', 'Pen', 'Filter', 'Finetune', 'Frame',
  'Redact', 'Resize', 'Image', 'ZoomPan'
];
</script>
```

## Customize Toolbar

### Show/Hide Items

```vue
<template>
  <div>
    <ImageEditorComponent 
      ref="imgObj"
      width="550px" 
      height="350px"
      :toolbar="customToolbar"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);

const customToolbar = [
  'Open', 'Save', 'Crop', 'RotateLeft', 'RotateRight',
  'Undo', 'Redo', 'Text', 'Shape'
];
</script>
```

### Custom Toolbar with Visibility

```vue
<template>
  <div>
    <ImageEditorComponent 
      ref="imgObj"
      width="550px" 
      height="350px"
      :toolbar="toolbarConfig"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);

const toolbarConfig = [
  { text: 'Open' },
  { text: 'Save' },
  { text: 'Crop' },
  { text: 'RotateLeft' },
  { text: 'Undo' },
  { text: 'Redo' }
];
</script>
```

## Custom Toolbar Items

### Add Custom Item

```vue
<template>
  <div>
    <ImageEditorComponent 
      ref="imgObj"
      width="550px" 
      height="350px"
      :toolbar="customToolbar"
      :toolbarItemClicked="onToolbarClick"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);

const customToolbar = [
  'Open', 'Save', 'Undo', 'Redo',
  { text: 'Custom Action', prefixIcon: 'e-icons e-cut' }
];

const onToolbarClick = (args) => {
  if (args.item?.text === 'Custom Action') {
    console.log('Custom action triggered');
    const dim = imgObj.value?.getImageDimension();
    imgObj.value?.drawText(dim.x + 100, dim.y + 100, 'Custom!');
  }
};
</script>
```

## Toolbar Events

### Toolbar Created Event

```vue
<template>
  <div>
    <ImageEditorComponent 
      ref="imgObj"
      width="550px" 
      height="350px"
      :toolbarCreated="onToolbarCreated"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);

const onToolbarCreated = (args) => {
  console.log('Toolbar created with items:', args.toolbarItems);
};
</script>
```

### Toolbar Item Clicked Event

```vue
<template>
  <div>
    <ImageEditorComponent 
      ref="imgObj"
      width="550px" 
      height="350px"
      :toolbarItemClicked="onItemClick"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);

const onItemClick = (args) => {
  console.log('Clicked:', args.item?.text);
};
</script>
```

### Toolbar Updating Event

```vue
<template>
  <div>
    <ImageEditorComponent 
      ref="imgObj"
      width="550px" 
      height="350px"
      :toolbarUpdating="onToolbarUpdating"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);

const onToolbarUpdating = (args) => {
  // Customize contextual toolbar
  console.log('Toolbar updating:', args);
};
</script>
```

## Next Steps

- Learn about [quick-access-toolbar.md](./quick-access-toolbar.md)
- Explore [resize-image.md](./resize-image.md)
