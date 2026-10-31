# SpeedDial How-To

> Common SpeedDial patterns and recipes.

---

## Programmatic Control

```vue
<template>
  <div>
    <button @click="openMenu">Open</button>
    <button @click="closeMenu">Close</button>
    <button @click="toggleMenu">Toggle</button>
    
    <ejs-speeddial 
      ref="speedDialRef"
      :items="items"
      iconCss="e-icons e-plus"
    ></ejs-speeddial>
  </div>
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

const speedDialRef = ref(null);

const items = [
  { text: 'Add', icon: 'e-icons e-plus' },
  { text: 'Edit', icon: 'e-icons e-edit' }
];

const openMenu = () => {
  speedDialRef.value?.show?.();
};

const closeMenu = () => {
  speedDialRef.value?.hide?.();
};

const toggleMenu = () => {
  speedDialRef.value?.toggle?.();
};
</script>
```

## Conditional Item Display

```vue
<template>
  <ejs-speeddial 
    :items="visibleItems"
    iconCss="e-icons e-plus"
  ></ejs-speeddial>
</template>

<script setup>
import { computed } from 'vue';
import { SpeedDialComponent } from '@syncfusion/ej2-vue-buttons';

export default {
  name: "App",
  components: {
    "ejs-speeddial": SpeedDialComponent
  }
}

const allItems = [
  { text: 'Add', icon: 'e-icons e-plus' },
  { text: 'Edit', icon: 'e-icons e-edit' },
  { text: 'Delete', icon: 'e-icons e-delete' },
  { text: 'Admin', icon: 'e-icons e-settings' }
];

const isAdmin = true;

const visibleItems = computed(() => {
  return allItems.filter(item => {
    if (item.text === 'Admin') return isAdmin;
    return true;
  });
});
</script>
```

---

## Related

- [speeddial-getting-started.md](speeddial-getting-started.md)
- [speeddial-events.md](speeddial-events.md)
