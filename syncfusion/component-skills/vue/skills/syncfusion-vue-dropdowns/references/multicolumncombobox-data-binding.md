# Data Binding – Syncfusion Vue 3 MultiColumnComboBox

## Local Array

```vue
<template>
  <ejs-multicolumncombobox
    :dataSource="employees"
    :columns="columns"
  />
</template>

<script setup>
import { ref } from 'vue';

const employees = ref([
  { id: 1, name: 'John', email: 'john@example.com', dept: 'Sales' },
  { id: 2, name: 'Jane', email: 'jane@example.com', dept: 'IT' },
  { id: 3, name: 'Bob', email: 'bob@example.com', dept: 'HR' }
]);

const columns = ref([
  { field: 'name', headerText: 'Name', width: '100px' },
  { field: 'email', headerText: 'Email', width: '150px' },
  { field: 'dept', headerText: 'Department', width: '100px' }
]);
</script>
```

---

## Remote Data

```vue
<template>
  <ejs-multicolumncombobox
    :dataSource="remoteData"
    :columns="columns"
  />
</template>

<script setup>
import { ref } from 'vue';
import { DataManager, ODataV4Adaptor } from '@syncfusion/ej2-data';

const remoteData = ref(
  new DataManager({
    url: 'https://services.odata.org/V4/Northwind/Northwind.svc/Customers',
    adaptor: new ODataV4Adaptor()
  })
);

const columns = ref([...]);
</script>
```

---

## Field Value Binding

```vue
<template>
  <ejs-multicolumncombobox
    :dataSource="employees"
    :columns="columns"
    :fields="{ text: 'name', value: 'id' }"
    :value="selectedId"
  />
</template>

<script setup>
import { ref } from 'vue';

const selectedId = ref(1);
const employees = ref([...]);
const columns = ref([...]);
</script>
```

---

## Next Steps

- For filtering, read `references/multicolumncombobox-filtering.md`
- For sorting, read `references/multicolumncombobox-sorting.md`
- For API reference, read `references/multicolumncombobox-api.md`
