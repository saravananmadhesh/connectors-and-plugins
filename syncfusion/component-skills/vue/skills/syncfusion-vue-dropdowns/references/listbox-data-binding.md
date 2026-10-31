# Data Binding – Syncfusion Vue 3 ListBox

## Simple Array

```vue
<template>
  <ejs-listbox :dataSource="colors" />
</template>

<script setup>
import { ref } from 'vue';

const colors = ref(['Red', 'Green', 'Blue', 'Yellow', 'Purple']);
</script>
```

---

## Object Array

```vue
<template>
  <ejs-listbox
    :dataSource="employees"
    :fields="{ text: 'name', value: 'id' }"
  />
</template>

<script setup>
import { ref } from 'vue';

const employees = ref([
  { id: 1, name: 'John Smith' },
  { id: 2, name: 'Jane Doe' },
  { id: 3, name: 'Bob Johnson' },
  { id: 4, name: 'Alice Brown' }
]);
</script>
```

---

## Remote Data

```vue
<template>
  <ejs-listbox
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
  <ejs-listbox
    :dataSource="departments"
    :fields="{ text: 'name', groupBy: 'category' }"
  />
</template>

<script setup>
import { ref } from 'vue';

const departments = ref([
  { name: 'Sales', category: 'Client Services' },
  { name: 'Support', category: 'Client Services' },
  { name: 'Development', category: 'Engineering' }
]);
</script>
```

---

## Next Steps

- For selection, read `references/listbox-selection.md`
- For templates, read `references/listbox-icons-and-templates.md`
- For API reference, read `references/listbox-api.md`
