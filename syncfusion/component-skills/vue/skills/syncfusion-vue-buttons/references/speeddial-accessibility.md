# SpeedDial Accessibility

> Ensure SpeedDial compliance with WCAG 2.2.

---

## ARIA Attributes

```vue
<template>
  <ejs-speeddial 
    :items="items"
    iconCss="e-icons e-plus"
    aria-label="Action Menu"
    aria-expanded="false"
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
  { text: 'Edit', icon: 'e-icons e-edit', 'aria-label': 'Edit Item' },
  { text: 'Delete', icon: 'e-icons e-delete', 'aria-label': 'Delete Item' },
  { text: 'Share', icon: 'e-icons e-share', 'aria-label': 'Share Item' }
];
</script>
```

## Keyboard Navigation

| Key | Action |
|-----|--------|
| `Tab` | Focus SpeedDial |
| `Enter`/`Space` | Open/close menu |
| `Arrow Keys` | Navigate items |
| `Esc` | Close menu |

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
  { text: 'Add New', icon: 'e-icons e-plus' },
  { text: 'Edit', icon: 'e-icons e-edit' },
  { text: 'Delete', icon: 'e-icons e-delete' }
];
</script>
```

---

## Next Steps

- Review API in [speeddial-api.md](speeddial-api.md)
