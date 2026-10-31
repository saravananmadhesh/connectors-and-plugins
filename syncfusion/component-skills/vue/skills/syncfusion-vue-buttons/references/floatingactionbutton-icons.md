# FloatingActionButton Icons

> Customize FAB icons and appearance.

---

## Icon CSS

Apply icon CSS classes:

```vue
<template>
  <ejs-fab 
    iconCss="e-icons e-plus"
    @click="onAdd"
  ></ejs-fab>
</template>

<script setup>
import { FabComponent } from '@syncfusion/ej2-vue-buttons';
const onAdd = () => console.log('Add');
</script>
```

## Icon Types

```vue
<template>
  <div class="icon-examples">
    <ejs-fab iconCss="e-icons e-plus"></ejs-fab>
    <ejs-fab iconCss="e-icons e-edit"></ejs-fab>
    <ejs-fab iconCss="e-icons e-delete"></ejs-fab>
    <ejs-fab iconCss="e-icons e-save"></ejs-fab>
    <ejs-fab iconCss="e-icons e-share"></ejs-fab>
  </div>
</template>

<script setup>
import { FabComponent } from '@syncfusion/ej2-vue-buttons';
</script>
```

---

## Next Steps

- Learn positions in [floatingactionbutton-positions.md](floatingactionbutton-positions.md)
