# Sorting – Syncfusion Vue 3 MultiColumnComboBox

## Enable Column Sorting

```vue
<template>
  <ejs-multicolumncombobox
    :dataSource="employees"
    :columns="columns"
    :allowSorting="true"
  />
</template>

<script setup>
import { ref } from 'vue';

const employees = ref([...]);

const columns = ref([
  { field: 'name', headerText: 'Name', width: '100px', allowSorting: true },
  { field: 'email', headerText: 'Email', width: '150px', allowSorting: true },
  { field: 'dept', headerText: 'Department', width: '100px', allowSorting: true }
]);
</script>
```

---

## Sort Direction

```typescript
// Ascending or Descending
const sortSettings = ref({
  columns: [
    { field: 'name', direction: 'Ascending' }
  ]
});
```

---

## Disable Column Sorting

```vue
<template>
  <ejs-multicolumncombobox
    :dataSource="employees"
    :columns="columns"
  />
</template>

<script setup>
import { ref } from 'vue';

const columns = ref([
  { field: 'name', headerText: 'Name', width: '100px', allowSorting: false },
  { field: 'email', headerText: 'Email', width: '150px', allowSorting: true }
]);
</script>
```

---

## Next Steps

- For filtering, read `references/multicolumncombobox-filtering.md`
- For data binding, read `references/multicolumncombobox-data-binding.md`
- For API reference, read `references/multicolumncombobox-api.md`
