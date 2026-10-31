# SpeedDial Styles

> Customize SpeedDial appearance.

---

## CSS Classes

Apply predefined styles:

```vue
<template>
  <div class="flex gap-8">
    <ejs-speeddial 
      :items="items"
      iconCss="e-icons e-plus"
      cssClass="e-primary"
    ></ejs-speeddial>
    <ejs-speeddial 
      :items="items"
      iconCss="e-icons e-plus"
      cssClass="e-success"
    ></ejs-speeddial>
    <ejs-speeddial 
      :items="items"
      iconCss="e-icons e-plus"
      cssClass="e-warning"
    ></ejs-speeddial>
  </div>
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
  { text: 'Item 1', icon: 'e-icons e-edit' },
  { text: 'Item 2', icon: 'e-icons e-delete' }
];
</script>
```

## Custom Styling

```vue
<template>
  <ejs-speeddial 
    :items="items"
    iconCss="e-icons e-plus"
    cssClass="custom-speeddial"
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
  { text: 'Edit', icon: 'e-icons e-edit' }
];
</script>

<style scoped>
:deep(.custom-speeddial .e-fab) {
  background-color: #7b3ff2;
  color: white;
}
</style>
```

---

## Next Steps

- Handle events in [speeddial-events.md](speeddial-events.md)
