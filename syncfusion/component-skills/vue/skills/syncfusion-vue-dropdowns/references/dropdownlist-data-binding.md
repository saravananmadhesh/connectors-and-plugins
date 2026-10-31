# Data Binding – Syncfusion Vue 3 DropdownList

## Simple Array

```vue
<template>
  <ejs-dropdownlist :dataSource="colors" />
</template>

<script setup>
import { ref } from 'vue';

const colors = ref(['Red', 'Green', 'Blue', 'Yellow']);
</script>
```

---

## Object Array

```vue
<template>
  <ejs-dropdownlist
    :dataSource="employees"
    :fields="{ text: 'name', value: 'id' }"
  />
</template>

<script setup>
import { ref } from 'vue';

const employees = ref([
  { id: 1, name: 'John Smith' },
  { id: 2, name: 'Jane Doe' },
  { id: 3, name: 'Bob Johnson' }
]);
</script>
```

---

## Remote Data

```vue
<template>
  <ejs-dropdownlist
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

## Dynamic Data Update

```vue
<template>
  <div>
    <ejs-dropdownlist :dataSource="items" />
    <button @click="addItem">Add Item</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const items = ref(['Item 1', 'Item 2']);

const addItem = () => {
  items.value.push(`Item ${items.value.length + 1}`);
};
</script>
```

---

## Next Steps

- For filtering, read `references/dropdownlist-filtering.md`
- For templates, read `references/dropdownlist-grouping-and-templates.md`
- For API reference, read `references/dropdownlist-api.md`
