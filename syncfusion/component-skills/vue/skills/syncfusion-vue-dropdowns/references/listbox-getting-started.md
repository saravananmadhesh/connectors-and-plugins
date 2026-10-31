# Getting Started – Syncfusion Vue 3 ListBox

## Installation

```bash
npm install @syncfusion/ej2-vue-dropdowns --save
```

## CSS Imports

```typescript
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/list-box/index.css";
```

## Basic ListBox

```vue
<template>
  <ejs-listbox :dataSource="items" />
</template>

<script setup>
import { ref } from 'vue';
import { ListBoxComponent } from '@syncfusion/ej2-vue-dropdowns';

const items = ref(['Item 1', 'Item 2', 'Item 3', 'Item 4']);
</script>
```

---

## With Selection

```vue
<template>
  <ejs-listbox
    :dataSource="items"
    :value="selectedItems"
    @change="onSelectionChange"
  />
  <p>Selected: {{ selectedItems }}</p>
</template>

<script setup>
import { ref } from 'vue';

const selectedItems = ref(['Item 1']);
const items = ref(['Item 1', 'Item 2', 'Item 3', 'Item 4']);

const onSelectionChange = (args) => {
  selectedItems.value = args.value;
};
</script>
```

---

## Key Features

- Single or multiple selection
- Drag-and-drop support
- Search/filter capability
- Custom templates
- Sorting and grouping

---

## Differences from DropdownList

| Feature | ListBox | DropdownList |
|---------|---------|--------------|
| Display | All items visible | Dropdown mode |
| Selection | Multiple by default | Single selection |
| Scrolling | Built-in scroll | Popup scroll |
| Drag-drop | Supported | Not supported |

---

## Next Steps

- For data binding, read `references/listbox-data-binding.md`
- For selection, read `references/listbox-selection.md`
- For dual ListBox, read `references/listbox-dual-list-box.md`
- For API reference, read `references/listbox-api.md`
