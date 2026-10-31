# SpeedDial Events

> Handle SpeedDial interactions.

---

## Item Click Event

Handle item selection:

```vue
<template>
  <ejs-speeddial 
    :items="items"
    iconCss="e-icons e-plus"
    @item-click="handleItemClick"
  ></ejs-speeddial>
  <p v-if="selected">Selected: {{ selected }}</p>
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
  { text: 'Edit', icon: 'e-icons e-edit' },
  { text: 'Delete', icon: 'e-icons e-delete' },
  { text: 'Share', icon: 'e-icons e-share' }
];

const selected = ref('');

const handleItemClick = (event) => {
  selected.value = event.item?.text;
};
</script>
```

## Open/Close Events

```vue
<template>
  <ejs-speeddial 
    :items="items"
    iconCss="e-icons e-plus"
    @open="onOpen"
    @close="onClose"
  ></ejs-speeddial>
  <p>{{ status }}</p>
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
  { text: 'Edit', icon: 'e-icons e-edit' }
];

const status = ref('');

const onOpen = () => {
  status.value = 'Menu opened';
};

const onClose = () => {
  status.value = 'Menu closed';
};
</script>
```

---

## Next Steps

- Explore templates in [speeddial-template.md](speeddial-template.md)
