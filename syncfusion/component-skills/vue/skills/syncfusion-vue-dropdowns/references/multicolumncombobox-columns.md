# Columns Configuration – Syncfusion Vue 3 MultiColumnComboBox

## Basic Column Setup

```vue
<template>
  <ejs-multicolumncombobox
    :dataSource="employees"
    :columns="columns"
    :fields="{ text: 'name', value: 'id' }"
  />
</template>

<script setup>
import { ref } from 'vue';

const employees = ref([...]);

const columns = ref([
  { field: 'name', headerText: 'Name', width: '100px' },
  { field: 'email', headerText: 'Email', width: '150px' },
  { field: 'department', headerText: 'Department', width: '120px' }
]);
</script>
```

---

## Column Properties

```typescript
{
  field: 'columnField',           // Data field
  headerText: 'Header',           // Column header
  width: '100px',                 // Column width
  type: 'text',                   // Data type
  textAlign: 'Left',              // Text alignment
  visible: true,                  // Show/hide column
  allowSorting: true,             // Enable sorting
  allowFiltering: true,           // Enable filtering
}
```

---

## Hidden Columns

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
  { field: 'name', headerText: 'Name', width: '100px' },
  { field: 'email', headerText: 'Email', width: '150px', visible: false },
  { field: 'department', headerText: 'Department', width: '120px' }
]);
</script>
```

---

## Next Steps

- For data binding, read `references/multicolumncombobox-data-binding.md`
- For filtering, read `references/multicolumncombobox-filtering.md`
- For API reference, read `references/multicolumncombobox-api.md`
