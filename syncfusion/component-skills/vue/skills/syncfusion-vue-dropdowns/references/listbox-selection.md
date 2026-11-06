# Selection – Syncfusion Vue 3 ListBox

## Single Selection

```vue
<template>
  <div>
    <ejs-listbox
      :dataSource="items"
      :value="selectedItem"
      @change="onSelectionChange"
    />
    <p>Selected: {{ selectedItem }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const selectedItem = ref('');
const items = ref(['Item 1', 'Item 2', 'Item 3', 'Item 4']);

const onSelectionChange = (args) => {
  selectedItem.value = args.value;
};
</script>
```

---

## Multiple Selection

```vue
<template>
  <div>
    <ejs-listbox
      :dataSource="items"
      :value="selectedItems"
      :selectionSettings="{ mode: 'Multiple' }"
      @change="onMultiSelect"
    />
    <p>Selected: {{ selectedItems.join(', ') }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const selectedItems = ref(['Item 1', 'Item 2']);
const items = ref(['Item 1', 'Item 2', 'Item 3', 'Item 4']);

const onMultiSelect = (args) => {
  selectedItems.value = args.value;
};
</script>
```

---

## Checkbox Selection

```vue
<template>
  <ejs-listbox
    :dataSource="items"
    :value="selectedItems"
    :selectionSettings="{ mode: 'CheckBox' }"
  />
</template>

<script setup>
import { ref } from 'vue';

const selectedItems = ref([]);
const items = ref(['Item 1', 'Item 2', 'Item 3', 'Item 4']);
</script>
```

---

## Next Steps

- For data binding, read `references/listbox-data-binding.md`
- For dual ListBox, read `references/listbox-dual-list-box.md`
- For API reference, read `references/listbox-api.md`
