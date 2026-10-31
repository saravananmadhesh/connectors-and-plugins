# FloatingActionButton Accessibility

> Ensure FAB meets WCAG 2.2 accessibility standards.

---

## ARIA Labels

Add accessibility attributes:

```vue
<template>
  <ejs-fab 
    iconCss="e-icons e-plus"
    aria-label="Add new item"
    title="Add new item (Ctrl+N)"
    @click="onAdd"
  ></ejs-fab>
</template>

<script setup>
import { FabComponent } from '@syncfusion/ej2-vue-buttons';

const onAdd = () => {
  console.log('Add item');
};
</script>
```

## Keyboard Support

FAB supports keyboard navigation:

```vue
<template>
  <ejs-fab 
    iconCss="e-icons e-plus"
    aria-label="Action button"
    @keydown="onKeyDown"
  ></ejs-fab>
</template>

<script setup>
import { FabComponent } from '@syncfusion/ej2-vue-buttons';

const onKeyDown = (args) => {
  // Tab to focus FAB
  // Enter/Space to activate
};
</script>
```

---

## Next Steps

- View API reference in [floatingactionbutton-api.md](floatingactionbutton-api.md)
