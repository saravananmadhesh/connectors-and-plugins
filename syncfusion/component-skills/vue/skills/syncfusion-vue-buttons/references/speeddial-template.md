# SpeedDial Template

> Customize SpeedDial item display with templates.

---

## Item Template

Create custom item rendering:

```vue
<template>
  <ejs-speeddial 
    :items="items"
    iconCss="e-icons e-plus"
    @item-click="handleItemClick"
  >
    <template #item="{ data }">
      <div class="flex items-center gap-2">
        <i :class="data.icon"></i>
        <span>{{ data.text }}</span>
      </div>
    </template>
  </ejs-speeddial>
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
  { text: 'Create', icon: 'e-icons e-plus' },
  { text: 'Open', icon: 'e-icons e-folder-open' },
  { text: 'Save', icon: 'e-icons e-save' }
];

const handleItemClick = (event) => {
  console.log('Action:', event.item?.text);
};
</script>
```

## Content Template

```vue
<template>
  <ejs-speeddial 
    :items="items"
    iconCss="e-icons e-settings"
  >
    <template #content>
      <div class="p-4 bg-white rounded shadow">
        <p class="font-semibold mb-2">Settings</p>
        <ul class="text-sm space-y-1">
          <li v-for="item in items" :key="item.id">
            {{ item.text }}
          </li>
        </ul>
      </div>
    </template>
  </ejs-speeddial>
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
  { id: 1, text: 'Preferences' },
  { id: 2, text: 'Help' },
  { id: 3, text: 'About' }
];
</script>
```

---

## Next Steps

- Learn accessibility in [speeddial-accessibility.md](speeddial-accessibility.md)
