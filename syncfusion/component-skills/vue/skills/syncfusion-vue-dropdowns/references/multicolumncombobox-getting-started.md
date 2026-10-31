# Getting Started – Syncfusion Vue 3 MultiColumnComboBox

## Installation

```bash
npm install @syncfusion/ej2-vue-dropdowns --save
```

## CSS Imports

```typescript
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/multicolumn-combobox/index.css";
```

## Basic MultiColumnComboBox

```vue
<template>
  <ejs-multicolumncombobox
    :dataSource="employees"
    :columns="columns"
  />
</template>

<script setup>
import { ref } from 'vue';
import { MultiColumnComboBoxComponent } from '@syncfusion/ej2-vue-dropdowns';

const employees = ref([
  { id: 1, name: 'John', email: 'john@example.com', department: 'Sales' },
  { id: 2, name: 'Jane', email: 'jane@example.com', department: 'IT' },
  { id: 3, name: 'Bob', email: 'bob@example.com', department: 'HR' }
]);

const columns = ref([
  { field: 'name', headerText: 'Name', width: '100px' },
  { field: 'email', headerText: 'Email', width: '150px' },
  { field: 'department', headerText: 'Department', width: '100px' }
]);
</script>
```

---

## Key Features

- Multiple columns display
- Column customization
- Search across columns
- Sorting and filtering
- Grid-based dropdown

---

## Differences from ComboBox

| Feature | MultiColumnComboBox | ComboBox |
|---------|---------------------|----------|
| Columns | Multiple columns | Single column |
| Display | Grid layout | List layout |
| Complexity | Complex data | Simple data |
| Use Case | Employee, product lists | Simple selections |

---

## Next Steps

- For columns configuration, read `references/multicolumncombobox-columns.md`
- For data binding, read `references/multicolumncombobox-data-binding.md`
- For filtering, read `references/multicolumncombobox-filtering.md`
- For API reference, read `references/multicolumncombobox-api.md`
