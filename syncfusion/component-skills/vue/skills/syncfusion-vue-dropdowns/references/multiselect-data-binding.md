# Data Binding – Syncfusion Vue 3 MultiSelect

## Simple Array

```vue
<template>
  <ejs-multiselect :dataSource="skills" />
</template>

<script setup>
import { ref } from 'vue';

const skills = ref(['JavaScript', 'TypeScript', 'Vue', 'React', 'Angular']);
</script>
```

---

## Object Array

```vue
<template>
  <ejs-multiselect
    :dataSource="roles"
    :fields="{ text: 'name', value: 'id' }"
  />
</template>

<script setup>
import { ref } from 'vue';

const roles = ref([
  { id: 1, name: 'Admin' },
  { id: 2, name: 'User' },
  { id: 3, name: 'Guest' },
  { id: 4, name: 'Moderator' }
]);
</script>
```

---

## Remote Data

```vue
<template>
  <ejs-multiselect
    :dataSource="remoteData"
    :fields="{ text: 'CustomerID', value: 'ContactName' }"
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
</script>
```

---

## Grouped Data

```vue
<template>
  <ejs-multiselect
    :dataSource="employees"
    :fields="{ text: 'name', groupBy: 'department' }"
  />
</template>

<script setup>
import { ref } from 'vue';

const employees = ref([
  { name: 'John', department: 'Sales' },
  { name: 'Jane', department: 'IT' },
  { name: 'Bob', department: 'Sales' }
]);
</script>
```

---

## Next Steps

- For selection modes, read `references/multiselect-selection-and-features.md`
- For filtering, read `references/multiselect-filtering.md`
- For templates, read `references/multiselect-grouping.md`
- For API reference, read `references/multiselect-api.md`
