---
title: Data Binding in Syncfusion Vue DataManager
---

# Data Binding in Syncfusion Vue DataManager

## Table of Contents

- [Overview](#overview)
- [Local Data Binding](#local-data-binding)
- [Remote Data Binding](#remote-data-binding)
- [Error Handling](#error-handling)
- [Loading States](#loading-states)

---

## Overview

Data binding connects your Vue component to data via DataManager. Two approaches:
- **Local**: Data in component memory
- **Remote**: Data fetched from server

---

## Local Data Binding

### Vue 3 - Composition API

```typescript
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { DataManager, JsonAdaptor, Query } from '@syncfusion/ej2-data'

const items = ref([])
const loading = ref(false)

const data = [
  { OrderID: 10248, CustomerID: 'VINET', Freight: 32.38 },
  { OrderID: 10249, CustomerID: 'TOMSP', Freight: 11.61 },
  { OrderID: 10250, CustomerID: 'HANAR', Freight: 65.83 }
]

const dm = new DataManager({
  json: data,
  adaptor: new JsonAdaptor()
})

const loadData = async () => {
  loading.value = true
  try {
    const result = await dm.executeLocal(new Query())
    items.value = result
  } catch (error) {
    console.error('Error:', error)
  } finally {
    loading.value = false
  }
}

onMounted(loadData)
</script>

<template>
  <div>
    <p v-if="loading">Loading...</p>
    <table v-else>
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Customer ID</th>
          <th>Freight</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.OrderID">
          <td>{{ item.OrderID }}</td>
          <td>{{ item.CustomerID }}</td>
          <td>{{ item.Freight }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
```

### Vue 2 - Options API

```vue
<template>
  <div>
    <p v-if="loading">Loading...</p>
    <table v-else>
      <tr v-for="item in items" :key="item.OrderID">
        <td>{{ item.OrderID }}</td>
        <td>{{ item.CustomerID }}</td>
        <td>{{ item.Freight }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import { DataManager, JsonAdaptor, Query } from '@syncfusion/ej2-data'

export default {
  data() {
    return {
      items: [],
      loading: false,
      data: [
        { OrderID: 10248, CustomerID: 'VINET', Freight: 32.38 },
        { OrderID: 10249, CustomerID: 'TOMSP', Freight: 11.61 }
      ]
    }
  },
  mounted() {
    this.loadData()
  },
  methods: {
    loadData() {
      this.loading = true
      const dm = new DataManager({
        json: this.data,
        adaptor: new JsonAdaptor()
      })

      dm.executeLocal(new Query())
        .then((result) => {
          this.items = result
          this.loading = false
        })
        .catch((error) => {
          console.error('Error:', error)
          this.loading = false
        })
    }
  }
}
</script>
```

---

## Remote Data Binding

### Vue 3 - WebApiAdaptor with async/await

```typescript
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { DataManager, Query, WebApiAdaptor } from '@syncfusion/ej2-data'

const items = ref([])
const loading = ref(false)
const error = ref('')

const dm = new DataManager({
  url: 'url',
  adaptor: new WebApiAdaptor(),
  headers: [...]
})

const loadData = async () => {
  loading.value = true
  error.value = ''
  try {
    const result = await dm.executeQuery(
      new Query().take(10).skip(0)
    )
    items.value = result.result
  } catch (err) {
    error.value = err.message || 'Failed to load data'
  } finally {
    loading.value = false
  }
}

onMounted(loadData)
</script>

<template>
  <div>
    <div v-if="loading">⏳ Loading...</div>
    <div v-else-if="error" class="error">❌ {{ error }}</div>
    <table v-else>
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Customer ID</th>
          <th>Freight</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.OrderID">
          <td>{{ item.OrderID }}</td>
          <td>{{ item.CustomerID }}</td>
          <td>{{ item.Freight }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
```

### Vue 2 - Promise Pattern

```vue
<template>
  <div>
    <p v-if="loading">⏳ Loading...</p>
    <p v-else-if="error" class="error">❌ {{ error }}</p>
    <table v-else>
      <tr v-for="item in items" :key="item.OrderID">
        <td>{{ item.OrderID }}</td>
        <td>{{ item.CustomerID }}</td>
        <td>{{ item.Freight }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import { DataManager, Query, WebApiAdaptor } from '@syncfusion/ej2-data'

export default {
  data() {
    return {
      items: [],
      loading: false,
      error: ''
    }
  },
  mounted() {
    this.loadData()
  },
  methods: {
    loadData() {
      this.loading = true
      this.error = ''

      const dm = new DataManager({
        url: 'url',
        adaptor: new WebApiAdaptor()
      })

      dm.executeQuery(new Query().take(10))
        .then((result) => {
          this.items = result.result
        })
        .catch((error) => {
          this.error = error.message
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>
```

---

## Reactive Data Binding

### Vue 3 - reactive() Pattern

```typescript
import { reactive, onMounted } from 'vue'

const state = reactive({
  items: [],
  loading: false,
  error: '',
  pageSize: 10,
  currentPage: 0
})

const dm = new DataManager({
  url: 'url',
  adaptor: new WebApiAdaptor()
})

const loadData = async () => {
  state.loading = true
  try {
    const skip = state.currentPage * state.pageSize
    const result = await dm.executeQuery(
      new Query()
        .skip(skip)
        .take(state.pageSize)
    )
    state.items = result.result
  } catch (err) {
    state.error = err.message
  } finally {
    state.loading = false
  }
}

const goToNextPage = () => {
  state.currentPage++
  loadData()
}
```

---

## Error Handling by Status Code

### HTTP Status Code Mapping

```typescript
const handleError = (error) => {
  switch (error.status) {
    case 0:
      return 'Network error - check your connection'
    case 400:
      return 'Bad request - invalid data format'
    case 401:
      return 'Unauthorized - login required'
    case 403:
      return 'Forbidden - you don\'t have access'
    case 404:
      return 'Not found - resource doesn\'t exist'
    case 409:
      return 'Conflict - data mismatch (may need refresh)'
    case 500:
      return 'Server error - try again later'
    case 503:
      return 'Service unavailable - maintenance in progress'
    default:
      return 'Unknown error occurred'
  }
}

const loadData = async () => {
  loading.value = true
  error.value = ''
  try {
    const result = await dm.executeQuery(new Query())
    items.value = result.result
  } catch (err) {
    error.value = handleError(err)
  } finally {
    loading.value = false
  }
}
```

---

## Filter and Search Binding

### Vue 3 - Live Filtering

```typescript
import { ref, watch, onMounted } from 'vue'

const searchText = ref('')
const items = ref([])

const dm = new DataManager({
  json: largeDataset,
  adaptor: new JsonAdaptor()
})

watch(searchText, (newValue) => {
  if (!newValue) {
    items.value = dm.executeLocal(new Query())
    return
  }

  const filtered = dm.executeLocal(
    new Query()
      .where('CustomerID', 'contains', newValue)
      .or('OrderID', 'equal', parseInt(newValue))
  )
  items.value = filtered
})

onMounted(() => {
  items.value = dm.executeLocal(new Query())
})
```

---

## OData Binding

```typescript
const dm = new DataManager({
  url: 'url',
  adaptor: new ODataV4Adaptor(),
  crossDomain: true
})

const loadOrders = async () => {
  const result = await dm.executeQuery(
    new Query()
      .from('Orders')
      .select(['OrderID', 'CustomerID', 'Freight'])
      .expand('Customer')  // Get related customer data
      .where('Freight', 'greaterThan', 30)
      .take(20)
  )
  items.value = result.result
}
```

---

## Caching and Performance

```typescript
const dm = new DataManager({
  url: 'url',
  adaptor: new WebApiAdaptor(),
  enableCache: true,      // Cache responses
})
```

Cached queries return instantly without server call.

---

## Loading States with Computed

### Vue 3 Composition API

```typescript
import { ref, computed } from 'vue'

const items = ref([])
const loading = ref(false)
const error = ref('')

const hasError = computed(() => error.value.length > 0)
const isEmpty = computed(() => items.value.length === 0 && !loading.value)
const showTable = computed(() => items.value.length > 0)

const loadData = async () => {
  loading.value = true
  error.value = ''
  try {
    const result = await dm.executeQuery(new Query())
    items.value = result.result
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}
```

---
