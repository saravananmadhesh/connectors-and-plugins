---
title: Querying with Syncfusion Vue DataManager
---

# Querying with Syncfusion Vue DataManager

## Table of Contents

- [Overview](#overview)
- [from()](#from)
- [Filtering](#filtering)
- [Selection](#selection)
- [Sorting](#sorting)
- [Pagination](#pagination)
- [Grouping](#grouping)
- [Aggregation](#aggregation)
- [Complex Queries](#complex-queries)

---

## Overview

Query is a builder for constructing data operations. Chain methods to build complex queries without server complexity.

---

## from()

### Specify Resource

```typescript
import { Query } from '@syncfusion/ej2-data'

// Named resource (REST endpoint)
const query = new Query().from('Orders')

// Used with remote adaptors
const result = await dm.executeQuery(query)
```

### With Different Adaptors

**OData:** Resource name from $metadata

```typescript
new Query().from('Orders')  // OData resource
```

**REST:** API endpoint resource

```typescript
new Query().from('api/orders')
```

---

## Filtering

### where() - Multiple Operators

```typescript
import { Query } from '@syncfusion/ej2-data'

// Equal
new Query().where('CustomerID', 'equal', 'VINET')

// Not equal
new Query().where('Freight', 'notequal', 0)

// Greater than
new Query().where('Freight', 'greaterThan', 30)

// Greater than or equal
new Query().where('Freight', 'greaterThanOrEqual', 30)

// Less than
new Query().where('OrderDate', 'lessThan', new Date('2024-01-01'))

// Less than or equal
new Query().where('Freight', 'lessthanOrEqual', 50)

// Contains (search in string)
new Query().where('CustomerID', 'contains', 'VI')

// startswith
new Query().where('CustomerID', 'startswith', 'VI')

// endswith
new Query().where('CustomerID', 'endswith', 'NET')
```

### Logical Operators

```typescript
// AND - both conditions must be true
new Query()
  .where('CustomerID', 'equal', 'VINET')
  .where('Freight', 'greaterThan', 30)

// OR - at least one condition must be true
new Query()
  .where('CustomerID', 'equal', 'VINET')
  .or('CustomerID', 'equal', 'TOMSP')

// Combine AND and OR
new Query()
  .where('Freight', 'greaterThan', 30)
  .where('OrderDate', 'greaterThan', new Date('2024-01-01'))
  .or('CustomerID', 'equal', 'VINET')
```

### Predicate-based Filtering

```typescript
import { Predicate } from '@syncfusion/ej2-data'

// Build complex predicates
const predicate = new Predicate('Freight', 'greaterThan', 30)
  .and('CustomerID', 'equal', 'VINET')
  .or('OrderID', 'greaterThan', 10300)

const query = new Query().where(predicate)

const result = await dm.executeQuery(query)
```

---

## Selection

### select() - Column Projection

Choose specific columns to return:

```typescript
// Single column
new Query().select(['OrderID'])

// Multiple columns
new Query().select(['OrderID', 'CustomerID', 'Freight'])

// Exclude columns (via adaptor)
new Query().select(['*']) // All columns (default)
```

### Usage in Component

```typescript
import { ref, onMounted } from 'vue'

const orders = ref([])

const loadSpecificColumns = async () => {
  const result = await dm.executeQuery(
    new Query()
      .select(['OrderID', 'CustomerID', 'Freight'])
      .take(10)
  )
  orders.value = result.result
}

onMounted(loadSpecificColumns)
```

---

## Sorting

### Single Column Sorts

```typescript
// Ascending
new Query().sortBy('OrderID')

// Descending
new Query().sortByDesc('Freight')

// Legacy: orderBy
new Query().orderBy('OrderID')
```

### Multiple Column Sorts

```typescript
new Query()
  .sortBy('CustomerID')
  .sortByDesc('Freight')
  .sortBy('OrderDate')
```

### Vue Example

```typescript
<script setup>
import { ref } from 'vue'

const sortBy = ref('OrderID')
const sortDescending = ref(false)

const loadWithSort = async () => {
  const query = new Query()
  
  if (sortDescending.value) {
    query.sortByDesc(sortBy.value)
  } else {
    query.sortBy(sortBy.value)
  }

  const result = await dm.executeQuery(query)
  items.value = result.result
}
</script>

<template>
  <select v-model="sortBy" @change="loadWithSort">
    <option>OrderID</option>
    <option>CustomerID</option>
    <option>Freight</option>
  </select>
  <input v-model="sortDescending" type="checkbox" @change="loadWithSort" />
  Descending
</template>
```

---

## Pagination

### take() and skip()

```typescript
// Get first 10 items
new Query().take(10)

// Skip first 10, get next 10
new Query().skip(10).take(10)

// Page calculation
const pageNumber = 2
const pageSize = 10
const query = new Query()
  .skip((pageNumber - 1) * pageSize)
  .take(pageSize)
```

### Pagination Vue Component

```typescript
<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { Query } from '@syncfusion/ej2-data'

const items = ref([])
const pageNumber = ref(1)
const pageSize = ref(10)
const totalCount = ref(0)

const totalPages = computed(() => 
  Math.ceil(totalCount.value / pageSize.value)
)

const loadPage = async (page = 1) => {
  const skip = (page - 1) * pageSize.value
  const result = await dm.executeQuery(
    new Query()
      .skip(skip)
      .take(pageSize.value)
  )
  items.value = result.result
  totalCount.value = result.count
  pageNumber.value = page
}

const nextPage = () => {
  if (pageNumber.value < totalPages.value) {
    loadPage(pageNumber.value + 1)
  }
}

const prevPage = () => {
  if (pageNumber.value > 1) {
    loadPage(pageNumber.value - 1)
  }
}

onMounted(() => loadPage(1))
</script>

<template>
  <div>
    <button @click="prevPage" :disabled="pageNumber == 1">Previous</button>
    <span>Page {{ pageNumber }} of {{ totalPages }}</span>
    <button @click="nextPage" :disabled="pageNumber >= totalPages">Next</button>

    <table>
      <tr v-for="item in items" :key="item.OrderID">
        <td>{{ item.OrderID }}</td>
        <td>{{ item.CustomerID }}</td>
        <td>{{ item.Freight }}</td>
      </tr>
    </table>
  </div>
</template>
```

---

## Grouping

### group() - Data Grouping

```typescript
import { Query } from '@syncfusion/ej2-data'

// Group by single column
new Query().group('CustomerID')

// Group by multiple columns
new Query().group('CustomerID').group('OrderDate')
```

### Grouped Result Format

```typescript
const result = await dm.executeQuery(
  new Query().group('CustomerID')
)

// result.result looks like:
[
  {
    key: 'VINET',
    items: [
      { OrderID: 10248, CustomerID: 'VINET', Freight: 32.38 },
      { OrderID: 10254, CustomerID: 'VINET', Freight: 17.62 }
    ],
    count: 2
  },
  {
    key: 'TOMSP',
    items: [
      { OrderID: 10249, CustomerID: 'TOMSP', Freight: 11.61 }
    ],
    count: 1
  }
]
```

---

## Aggregation

### aggregate() - Calculations

```typescript
import { Query, Aggregate } from '@syncfusion/ej2-data'

// Sum
new Query()
  .aggregate('sum', 'Freight')

// Average
new Query()
  .aggregate('average', 'Freight')

// Count
new Query()
  .aggregate('count', 'OrderID')

// Min/Max
new Query()
  .aggregate('min', 'Freight')
  .aggregate('max', 'Freight')
```

### Aggregation Result

```typescript
const result = await dm.executeQuery(
  new Query()
    .aggregate('sum', 'Freight')
    .aggregate('average', 'Freight')
)

// result.aggregates:
{
  'Freight - sum': 49500.20,
  'Freight - average': 45.60
}
```

---

## Complex Queries

### Full Query Example

```typescript
const result = await dm.executeQuery(
  new Query()
    .from('Orders')
    .select(['OrderID', 'CustomerID', 'Freight', 'OrderDate'])
    .where('Freight', 'greaterThan', 30)
    .sortByDesc('OrderDate')
    .skip(0)
    .take(20)
)
```

### Search Across Multiple Fields

```typescript
const searchText = ref('')

const search = async () => {
  const predicate = new Predicate('OrderID', 'equal', searchText.value)
    .or('CustomerID', 'contains', searchText.value)
    .or('ShipCity', 'contains', searchText.value)

  const result = await dm.executeQuery(
    new Query()
      .where(predicate)
      .take(50)
  )
  items.value = result.result
}
```

### Dashboard Query

```typescript
const loadDashboard = async () => {
  // Today's orders
  const today = new Date().toDateString()

  const result = await dm.executeQuery(
    new Query()
      .where('OrderDate', 'greaterThanOrEqual', new Date(today))
      .where('Freight', 'greaterThan', 100)
      .sortByDesc('Freight')
      .take(10)
  )

  return result.result
}
```

---

## Performance Tips

### 1. Use select() for Needed Columns

```typescript
// Good - only fetch necessary fields
new Query().select(['OrderID', 'CustomerID'])

// Avoid - fetches all columns including large text fields
new Query()
```

### 2. Combine where() Filters

```typescript
// Good - filters on server
new Query()
  .where('Freight', 'greaterThan', 30)
  .where('CustomerID', 'equal', 'VINET')

// Avoid - loads excess data then filters client-side
new Query().take(10000)
```

### 3. Limit take()

```typescript
// Good - pagination
new Query().skip(0).take(50)

// Avoid - loading excessive data
new Query()
```

---

## Error Handling

```typescript
const executeQueryWithErrorHandling = async (query) => {
  try {
    const result = await dm.executeQuery(query)
    return { success: true, data: result.result, count: result.count }
  } catch (error) {
    console.error('Query failed:', error.message)
    return { success: false, message: error.message }
  }
}
```

---
