# SpeedDial Items

> Configure SpeedDial menu items.

---

## Item Structure

Define SpeedDial items:

```vue
<template>
  <ejs-speeddial 
    :items="items"
    iconCss="e-icons e-plus"
  ></ejs-speeddial>
</template>

<script setup>
import { SpeedDialComponent } from '@syncfusion/ej2-vue-buttons';

export default {
  name: "App",
  components: {
    "ejs-speeddial": SpeedDialComponent
  }
}

const items = [
  { text: 'Add', icon: 'e-icons e-plus' },
  { text: 'Edit', icon: 'e-icons e-edit' },
  { text: 'Delete', icon: 'e-icons e-trash' }
];
</script>
```

## Item Properties

| Property | Type | Description |
|----------|------|-------------|
| `text` | string | Item label |
| `icon` | string | Icon CSS class |
| `id` | string | Unique identifier |
| `title` | string | Tooltip title |
| `enabled` | boolean | Enable/disable item |
| `target` | string | Target element selector |

## Dynamic Items

```vue
<template>
  <ejs-speeddial 
    :items="items"
    iconCss="e-icons e-plus"
  ></ejs-speeddial>
</template>

<script setup>
import { ref } from 'vue';
import { SpeedDialComponent } from '@syncfusion/ej2-vue-buttons';

export default {
  name: "App",
  components: {
    "ejs-speeddial": SpeedDialComponent
  }
}

const items = ref([
  { text: 'Item 1', icon: 'e-icons e-upload' },
  { text: 'Item 2', icon: 'e-icons e-download' }
]);
</script>
```

---

## Next Steps

- Learn display modes in [speeddial-display-modes.md](speeddial-display-modes.md)
