# Data Binding – Syncfusion Vue 3 AutoComplete

## Table of Contents
- [String Array Binding](#string-array-binding)
- [Object Array with Fields](#object-array-with-fields)
- [Remote Data](#remote-data)
- [Nested Objects](#nested-objects)

---

## String Array Binding

Bind a simple array of strings:

```vue
<template>
  <ejs-autocomplete :dataSource="countries" />
</template>

<script setup>
import { ref } from 'vue';

const countries = ref(['USA', 'UK', 'Canada', 'Australia', 'Germany']);
</script>
```

---

## Object Array with Fields

Bind object array with field mapping:

```vue
<template>
  <ejs-autocomplete
    :dataSource="employees"
    :fields="{ text: 'name', value: 'id' }"
    @change="onItemSelect"
  />
</template>

<script setup>
import { ref } from 'vue';

const employees = ref([
  { id: 1, name: 'John Smith', department: 'IT' },
  { id: 2, name: 'Jane Doe', department: 'HR' },
  { id: 3, name: 'Bob Johnson', department: 'Sales' }
]);

const onItemSelect = (args) => {
  console.log('Selected ID:', args.value);
};
</script>
```

---

## Remote Data

Bind remote data with DataManager:

```vue
<template>
  <ejs-autocomplete
    :dataSource="remoteData"
    :fields="{ text: 'CustomerID', value: 'ContactName' }"
    :minLength="1"
  />
</template>

<script setup>
import { ref } from 'vue';
import { DataManager, ODataV4Adaptor, Query } from '@syncfusion/ej2-data';

const remoteData = ref(
  new DataManager({
    url: 'https://services.odata.org/V4/Northwind/Northwind.svc/Customers',
    adaptor: new ODataV4Adaptor(),
    crossDomain: true
  })
);
</script>
```

---

## Nested Objects

Access nested properties with dot notation:

```vue
<template>
  <ejs-autocomplete
    :dataSource="companies"
    :fields="{ text: 'company.name', value: 'id' }"
  />
</template>

<script setup>
import { ref } from 'vue';

const companies = ref([
  { id: 1, company: { name: 'Acme Corp', city: 'NYC' } },
  { id: 2, company: { name: 'Tech Inc', city: 'SF' } }
]);
</script>
```

---

## Next Steps

- For filtering, read `references/autocomplete-filtering.md`
- For templates, read `references/autocomplete-templates.md`
- For API reference, read `references/autocomplete-api.md`
