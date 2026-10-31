# Data Binding – Syncfusion Vue 3 ComboBox

## Local Array

```vue
<template>
  <ejs-combobox :dataSource="statusOptions" />
</template>

<script setup>
import { ref } from 'vue';

const statusOptions = ref(['Active', 'Inactive', 'Pending']);
</script>
```

## Object Array

```vue
<template>
  <ejs-combobox
    :dataSource="departments"
    :fields="{ text: 'name', value: 'id' }"
  />
</template>

<script setup>
import { ref } from 'vue';

const departments = ref([
  { id: 1, name: 'Sales' },
  { id: 2, name: 'IT' },
  { id: 3, name: 'HR' }
]);
</script>
```

## Remote Data

```vue
<template>
  <ejs-combobox
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
    adaptor: new ODataV4Adaptor(),
    crossDomain: true
  })
);
</script>
```

## Nested Fields

```vue
<template>
  <ejs-combobox
    :dataSource="companies"
    :fields="{ text: 'company.name', value: 'id' }"
  />
</template>

<script setup>
import { ref } from 'vue';

const companies = ref([
  { id: 1, company: { name: 'Acme', city: 'NYC' } },
  { id: 2, company: { name: 'Tech', city: 'SF' } }
]);
</script>
```

---

## Next Steps

- For filtering, read `references/combobox-filtering-and-search.md`
- For templates, read `references/combobox-templates-and-customization.md`
- For API reference, read `references/combobox-api.md`
