# ListView Data Binding & Rendering (Vue 3)

## Table of Contents
- [Local Data Sources](#local-data-sources)
- [Object Data Mapping](#object-data-mapping)
- [Remote Data with DataManager](#remote-data-with-datamanager)
- [Query Filtering](#query-filtering)
- [Pagination](#pagination)
- [Dynamic Data Updates](#dynamic-data-updates)

## Local Data Sources

### String Array

```vue
<template>
  <ListViewComponent id="string-list" :dataSource="data" />
</template>

<script setup>
import { ref } from 'vue';
import { ListViewComponent } from '@syncfusion/ej2-vue-lists';

const data = ref(['Apple', 'Banana', 'Orange', 'Mango']);
</script>
```

### Number Array

```vue
<script setup>
const numbers = ref([1, 2, 3, 4, 5]);
</script>

<template>
  <ListViewComponent id="number-list" :dataSource="numbers" />
</template>
```

### Simple Objects

```vue
<script setup>
import { ref } from 'vue';

const items = ref([
  { id: '1', text: 'Item 1' },
  { id: '2', text: 'Item 2' },
  { id: '3', text: 'Item 3' }
]);

const fields = { id: 'id', text: 'text' };
</script>

<template>
  <ListViewComponent
    id="object-list"
    :dataSource="items"
    :fields="fields"
  />
</template>
```

## Object Data Mapping

### Basic Field Mapping

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { ListViewComponent } from '@syncfusion/ej2-vue-lists';

interface Product {
  productId: number;
  productName: string;
  category: string;
  price: number;
}

const products = ref<Product[]>([
  { productId: 1, productName: 'Laptop', category: 'Electronics', price: 999 },
  { productId: 2, productName: 'Desk', category: 'Furniture', price: 299 },
  { productId: 3, productName: 'Chair', category: 'Furniture', price: 199 }
]);

const fields = {
  id: 'productId',
  text: 'productName',
  tooltip: 'category'
};
</script>

<template>
  <ListViewComponent :dataSource="products" :fields="fields" />
</template>
```

### Field Mapping for Features

```vue
<script setup>
import { ref } from 'vue';

const data = ref([
  {
    itemId: 'a1',
    itemName: 'Active Item',
    description: 'This is active',
    isActive: true,
    iconClass: 'e-icons e-check',
    imageUrl: 'a.png',
    sortField: 'A'
  },
  {
    itemId: 'b1',
    itemName: 'Disabled Item',
    description: 'This is disabled',
    isActive: false,
    iconClass: 'e-icons e-close',
    imageUrl: 'b.png',
    sortField: 'B'
  }
]);

const fields = {
  id: 'itemId',
  text: 'itemName',
  tooltip: 'description',
  enabled: 'isActive',
  iconCss: 'iconClass',
  image: 'imageUrl',
  sortBy: 'sortField'
};
</script>

<template>
  <ListViewComponent :dataSource="data" :fields="fields" />
</template>
```

### Nested/Hierarchical Data

```vue
<script setup>
import { ref } from 'vue';

const hierarchyData = ref([
  {
    id: '1',
    text: 'Asia',
    child: [
      {
        id: '1.1',
        text: 'India',
        child: [
          { id: '1.1.1', text: 'Delhi' },
          { id: '1.1.2', text: 'Mumbai' }
        ]
      },
      { id: '1.2', text: 'China' }
    ]
  },
  {
    id: '2',
    text: 'Europe',
    child: [
      { id: '2.1', text: 'Germany' },
      { id: '2.2', text: 'France' }
    ]
  }
]);

const fields = {
  id: 'id',
  text: 'text',
  child: 'child'
};
</script>

<template>
  <ListViewComponent :dataSource="hierarchyData" :fields="fields" />
</template>
```

## Remote Data with DataManager

### Basic Remote Binding

```vue
<template>
  <ListViewComponent :dataSource="data" :query="query" :fields="fields" />
</template>

<script setup>
import { DataManager, ODataAdaptor, Query } from '@syncfusion/ej2-data';
import { ListViewComponent } from '@syncfusion/ej2-vue-lists';

const data = new DataManager({
  url: 'https://services.odata.org/V4/Northwind/Northwind.svc/Customers',
  adaptor: new ODataAdaptor()
});

const query = new Query().select(['ContactName', 'CustomerID']).take(10);
const fields = { id: 'CustomerID', text: 'ContactName' };
</script>
```

### With Custom Headers

```js
const data = new DataManager({
  url: 'https://api.example.com/items',
  adaptor: new ODataAdaptor(),
  headers: [{ Authorization: 'Bearer YOUR_TOKEN' }]
});
```

**⚠️ Security Note:** Never hardcode tokens. Retrieve from secure session storage at runtime.

## Query Filtering

```vue
<script setup>
import { DataManager, ODataAdaptor, Query, Predicate } from '@syncfusion/ej2-data';

const data = new DataManager({
  url: 'https://services.odata.org/V4/Northwind/Northwind.svc/Products',
  adaptor: new ODataAdaptor()
});

// Simple filter
const simpleQuery = new Query()
  .where('UnitPrice', 'greaterthan', 50)
  .take(20);

// Compound filter
const compoundQuery = new Query()
  .where(new Predicate('UnitPrice', 'greaterthan', 50).and('UnitsInStock', 'greaterthan', 0))
  .sortBy('ProductName', 'ascending');
</script>
```

## Pagination

### Load on Demand

```vue
<template>
  <ListViewComponent
    :dataSource="data"
    :query="query"
    :fields="fields"
    :actionComplete="onActionComplete"
  />
</template>

<script setup>
import { ref } from 'vue';
import { DataManager, ODataAdaptor, Query } from '@syncfusion/ej2-data';

const allItems = ref([]);

const data = new DataManager({
  url: 'https://services.odata.org/V4/Northwind/Northwind.svc/Customers',
  adaptor: new ODataAdaptor()
});

let query = new Query().range(0, 9);

const onActionComplete = (args) => {
  allItems.value = [...allItems.value, ...args.result];
};
</script>
```

## Dynamic Data Updates

### Replace Data Source

```vue
<script setup>
import { ref } from 'vue';

const items = ref([{ id: '1', text: 'Initial' }]);

const updateData = () => {
  items.value = [
    { id: '1', text: 'Updated 1' },
    { id: '2', text: 'New Item' }
  ];
};
</script>

<template>
  <button @click="updateData">Update Data</button>
  <ListViewComponent :dataSource="items" :fields="{ id: 'id', text: 'text' }" />
</template>
```

### Append to Existing Data

```vue
<script setup>
import { ref } from 'vue';
import { ListViewComponent } from '@syncfusion/ej2-vue-lists';

const listViewRef = ref(null);
const items = ref([{ id: 1, text: 'First' }]);

const append = () => {
  listViewRef.value?.addItem([{ id: Date.now(), text: 'Appended' }]);
};
</script>

<template>
  <button @click="append">Append</button>
  <ListViewComponent ref="listViewRef" :dataSource="items" :fields="{ id: 'id', text: 'text' }" />
</template>
```

### Reactive Data Updates

```vue
<script setup>
import { ref, watch } from 'vue';

const search = ref('');
const allItems = ref([
  { id: '1', name: 'Apple' },
  { id: '2', name: 'Banana' },
  { id: '3', name: 'Cherry' }
]);

const filteredItems = ref(allItems.value);

watch(search, (newSearch) => {
  filteredItems.value = allItems.value.filter(item =>
    item.name.toLowerCase().includes(newSearch.toLowerCase())
  );
});
</script>

<template>
  <input v-model="search" placeholder="Search..." />
  <ListViewComponent
    :dataSource="filteredItems"
    :fields="{ id: 'id', text: 'name' }"
  />
</template>
```

**Next:** Learn about [item management](listview-item-management.md) for CRUD operations.
