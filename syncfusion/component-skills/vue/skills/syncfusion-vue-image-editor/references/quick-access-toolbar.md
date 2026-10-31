# Quick Access Toolbar

## Table of Contents
- [Show/Hide Quick Access Toolbar](#showhide-quick-access-toolbar)
- [Custom Quick Access Items](#custom-quick-access-items)
- [Quick Access Events](#quick-access-events)

## Show/Hide Quick Access Toolbar

### Enable Quick Access

```vue
<template>
  <div>
    <ImageEditorComponent 
      ref="imgObj"
      width="550px" 
      height="350px"
      :showQuickAccessToolbar="true"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);
</script>
```

### Disable Quick Access

```vue
<template>
  <div>
    <ImageEditorComponent 
      ref="imgObj"
      width="550px" 
      height="350px"
      :showQuickAccessToolbar="false"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);
</script>
```

## Custom Quick Access Items

### Add Custom Items

```vue
<template>
  <div>
    <ImageEditorComponent 
      ref="imgObj"
      width="550px" 
      height="350px"
      :quickAccessToolbar="customQuickAccess"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);

const customQuickAccess = [
  'Clone', 'Delete', 'Lock', 'Unlock', 'Edit'
];
</script>
```

### Dynamic Quick Access

```vue
<template>
  <div>
    <ImageEditorComponent 
      ref="imgObj"
      width="550px" 
      height="350px"
      :quickAccessToolbar="quickAccessItems"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);

const quickAccessItems = ref([
  { text: 'Clone' },
  { text: 'Delete' },
  { text: 'Edit' }
]);
</script>
```

## Quick Access Events

### Quick Access Toolbar Open Event

```vue
<template>
  <div>
    <ImageEditorComponent 
      ref="imgObj"
      width="550px" 
      height="350px"
      :showQuickAccessToolbar="true"
      :quickAccessToolbarOpen="onQuickAccessOpen"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);

const onQuickAccessOpen = (args) => {
  console.log('Quick access opened for:', args.shape);
};
</script>
```

## Next Steps

- Learn about [resize-image.md](./resize-image.md)
- Explore [frame-decoration.md](./frame-decoration.md)
