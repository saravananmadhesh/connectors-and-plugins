# FloatingActionButton Styles

> Customize FAB colors and appearance.

---

## CSS Classes

Available style classes:

```vue
<template>
  <div class="fab-styles">
    <ejs-fab cssClass="e-primary" iconCss="e-icons e-plus"></ejs-fab>
    <ejs-fab cssClass="e-success" iconCss="e-icons e-check"></ejs-fab>
    <ejs-fab cssClass="e-warning" iconCss="e-icons e-alert"></ejs-fab>
    <ejs-fab cssClass="e-danger" iconCss="e-icons e-delete"></ejs-fab>
  </div>
</template>

<script setup>
import { FabComponent } from '@syncfusion/ej2-vue-buttons';
</script>

<style scoped>
.fab-styles {
  display: flex;
  gap: 20px;
}
</style>
```

## Size Options

```vue
<template>
  <div>
    <ejs-fab cssClass="e-small" iconCss="e-icons e-plus"></ejs-fab>
    <ejs-fab iconCss="e-icons e-plus"></ejs-fab>
    <ejs-fab cssClass="e-large" iconCss="e-icons e-plus"></ejs-fab>
  </div>
</template>

<script setup>
import { FabComponent } from '@syncfusion/ej2-vue-buttons';
</script>
```

---

## Next Steps

- Check events in [floatingactionbutton-events.md](floatingactionbutton-events.md)
