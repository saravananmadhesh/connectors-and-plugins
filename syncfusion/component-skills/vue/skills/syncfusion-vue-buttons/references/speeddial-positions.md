# SpeedDial Positions

> Control SpeedDial position on screen.

---

## Position Options

Available position values:

| Position | Description |
|----------|-------------|
| `TopLeft` | Top-left corner |
| `TopCenter` | Top-center |
| `TopRight` | Top-right corner |
| `MiddleLeft` | Center-left |
| `Center` | Center |
| `MiddleRight` | Center-right |
| `BottomLeft` | Bottom-left corner |
| `BottomCenter` | Bottom-center |
| `BottomRight` | Bottom-right corner |

## Position Example

```vue
<template>
  <ejs-speeddial 
    :items="items"
    iconCss="e-icons e-plus"
    :position="'BottomRight'"
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

const items = [
  { text: 'Add', icon: 'e-icons e-plus' },
  { text: 'Edit', icon: 'e-icons e-edit' },
  { text: 'Delete', icon: 'e-icons e-delete' }
];
</script>
```

## Dynamic Position

```vue
<template>
  <div class="mb-4">
    <select v-model="position" class="p-2 border">
      <option>TopLeft</option>
      <option>TopRight</option>
      <option>BottomLeft</option>
      <option>BottomRight</option>
    </select>
  </div>
  
  <ejs-speeddial 
    :items="items"
    iconCss="e-icons e-plus"
    :position="position"
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

const position = ref('BottomRight');
const items = [
  { text: 'Add', icon: 'e-icons e-plus' },
  { text: 'Edit', icon: 'e-icons e-edit' }
];
</script>
```

---

## Next Steps

- Customize styles in [speeddial-styles.md](speeddial-styles.md)
