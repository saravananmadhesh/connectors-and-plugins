# Undo and Redo

## Table of Contents
- [Undo Operations](#undo-operations)
- [Redo Operations](#redo-operations)
- [History Management](#history-management)
- [Keyboard Shortcuts](#keyboard-shortcuts)

## Undo Operations

### Undo Action

```vue
<template>
  <div>
    <button @click="undoAction">Undo</button>
    <button @click="redoAction">Redo</button>
    <ImageEditorComponent ref="imgObj" width="550px" height="350px" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);

const undoAction = () => {
  imgObj.value?.undo();
};

const redoAction = () => {
  imgObj.value?.redo();
};
</script>
```

### Undo with Counter

```vue
<template>
  <div>
    <p>History count: {{ historyCount }}</p>
    <button @click="undoAction">Undo</button>
    <button @click="redoAction">Redo</button>
    <ImageEditorComponent ref="imgObj" width="550px" height="350px" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);
const historyCount = ref(0);

const undoAction = () => {
  imgObj.value?.undo();
};

const redoAction = () => {
  imgObj.value?.redo();
};
</script>
```

## Redo Operations

### Redo After Undo

```vue
<template>
  <div>
    <button @click="doAction">Do Action</button>
    <button @click="undoAction">Undo</button>
    <button @click="redoAction">Redo</button>
    <ImageEditorComponent ref="imgObj" width="550px" height="350px" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);

const doAction = () => {
  const dim = imgObj.value?.getImageDimension();
  imgObj.value?.drawText(dim.x + 50, dim.y + 50, 'Test');
};

const undoAction = () => {
  imgObj.value?.undo();
};

const redoAction = () => {
  imgObj.value?.redo();
};
</script>
```

## History Management

### Clear History

```vue
<template>
  <div>
    <button @click="undoAction">Undo</button>
    <button @click="redoAction">Redo</button>
    <ImageEditorComponent ref="imgObj" width="550px" height="350px" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);

const undoAction = () => {
  imgObj.value?.undo();
};

const redoAction = () => {
  imgObj.value?.redo();
};
</script>
```

## Keyboard Shortcuts

### Default Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl + Z` | Undo |
| `Ctrl + Y` | Redo |

The undo/redo operations are triggered automatically by keyboard shortcuts within the component.

```vue
<template>
  <div>
    <p>Use Ctrl+Z to undo and Ctrl+Y to redo</p>
    <ImageEditorComponent ref="imgObj" width="550px" height="350px" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);
</script>
```

## Next Steps

- Learn about [toolbar-customization.md](./toolbar-customization.md)
- Explore [quick-access-toolbar.md](./quick-access-toolbar.md)
