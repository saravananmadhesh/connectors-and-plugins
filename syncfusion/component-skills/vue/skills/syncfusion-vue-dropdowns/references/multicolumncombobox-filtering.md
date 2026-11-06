# Filtering – Syncfusion Vue 3 MultiColumnComboBox

## Enable Filtering

```vue
<template>
  <ejs-multicolumncombobox
    :dataSource="employees"
    :columns="columns"
    :allowFiltering="true"
  />
</template>

<script setup>
import { ref } from 'vue';

const employees = ref([...]);
const columns = ref([...]);
</script>
```

---

## Filter Type

```vue
<template>
  <ejs-multicolumncombobox
    :dataSource="employees"
    :columns="columns"
    :allowFiltering="true"
    :filterType="'Contains'"
  />
</template>

<script setup>
import { ref } from 'vue';

const employees = ref([...]);
const columns = ref([...]);
</script>
```

---

## Filter Columns

```vue
<template>
  <ejs-multicolumncombobox
    :dataSource="employees"
    :columns="columns"
    :allowFiltering="true"
    :fields="{ text: 'name', value: 'id' }"
  />
</template>

<script setup>
import { ref } from 'vue';

const employees = ref([...]);
const columns = ref([
  { field: 'name', headerText: 'Name', width: '100px', allowFiltering: true },
  { field: 'email', headerText: 'Email', width: '150px', allowFiltering: true },
  { field: 'dept', headerText: 'Department', width: '100px', allowFiltering: false }
]);
</script>
```

---

## Next Steps

- For sorting, read `references/multicolumncombobox-sorting.md`
- For data binding, read `references/multicolumncombobox-data-binding.md`
- For API reference, read `references/multicolumncombobox-api.md`
