---
title: Vue 3 Getting Started with DataManager
---

# Getting Started with Vue DataManager in Vue 3

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Setup](#project-setup)
- [Composition API Example](#composition-api-example)
- [Options API Example](#options-api-example)
- [reactive() vs ref()](#reactive-vs-ref)
- [Performance & Best Practices](#performance--best-practices)

---

## Prerequisites

- Node.js v14 or higher
- npm or yarn
- Vite (for fast development)
- Vue 3 knowledge
- TypeScript (optional but recommended)

---

## Installation

### Step 1: Create Vue 3 Project with Vite

```bash
# Using npm
npm create vite@latest my-vue-app -- --template vue

# Or using yarn
yarn create vite my-vue-app --template vue
```

### Step 2: Navigate and Install Dependencies

```bash
cd my-vue-app
npm install
```

### Step 3: Install Syncfusion DataManager

```bash
npm install @syncfusion/ej2-data --save
```

### Step 4: Run Development Server

```bash
npm run dev
```

---

## Project Setup

### main.js Configuration

```typescript
import { createApp } from 'vue'
import App from './App.vue'
import { DataManager, ODataV4Adaptor } from '@syncfusion/ej2-data'

const app = createApp(App)

// Make DataManager available globally (optional)
app.config.globalProperties.$DataManager = DataManager
app.config.globalProperties.$ODataV4Adaptor = ODataV4Adaptor

app.mount('#app')
```

### Creating a Composable (Reusable Logic)

```typescript
// composables/useDataManager.ts
import { ref } from 'vue'
import { DataManager, Query, ReturnOption } from '@syncfusion/ej2-data'

export function useDataManager(url, adaptor) {
  const data = ref([])
  const loading = ref(false)
  const error = ref(null)
  const pageCount = ref(0)

  // Function to load data
  const loadData = async (query = new Query().take(10)) => {
    loading.value = true
    error.value = null

    try {
      const dm = new DataManager({ url, adaptor, crossDomain: true })
      const result = await dm.executeQuery(query) as ReturnOption

      data.value = result.result || []
      pageCount.value = result.count || 0
    } catch (err) {
      error.value = `Error: ${err.status || 'Unknown'}`
    } finally {
      loading.value = false
    }
  }

  return { data, loading, error, pageCount, loadData }
}
```

---

## Composition API Example

### App.vue with Composition API

```vue
<template>
  <div id="app">
    <h1>Vue 3 DataManager - Composition API</h1>

    <button @click="loadData" :disabled="loading">
      {{ loading ? 'Loading...' : 'Load Orders' }}
    </button>

    <div v-if="error" class="error">{{ error }}</div>

    <table v-if="items.length" class="table">
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Customer</th>
          <th>Freight</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.OrderID">
          <td>{{ item.OrderID }}</td>
          <td>{{ item.CustomerID }}</td>
          <td>{{ item.Freight }}</td>
          <td>{{ new Date(item.OrderDate).toLocaleDateString() }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { DataManager, Query, ODataV4Adaptor } from '@syncfusion/ej2-data'

const items = ref([])
const loading = ref(false)
const error = ref(null)

const loadData = async () => {
  loading.value = true
  error.value = null

  try {
    const dm = new DataManager({
      url: 'url',
      adaptor: new ODataV4Adaptor(),
      crossDomain: true
    })

    const result = await dm.executeQuery(new Query().take(10))
    items.value = result.result || []
  } catch (err) {
    error.value = err.message || 'Failed to load data'
  } finally {
    loading.value = false
  }
}

onMounted(loadData)
</script>

<style scoped>
.table {
  border-collapse: collapse;
  width: 100%;
  margin: 20px 0;
}

.table th, .table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.error {
  padding: 10px;
  color: #d32f2f;
  background: #ffebee;
  border-radius: 4px;
  margin: 10px 0;
}

button {
  padding: 8px 16px;
  background: #1976d2;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
```

---

## Options API Example

### App.vue with Options API

```vue
<template>
  <div id="app">
    <h1>Vue 3 DataManager - Options API</h1>
    
    <button @click="loadData" :disabled="loading">
      {{ loading ? 'Loading...' : 'Fetch Data' }}
    </button>

    <div v-if="error" class="error">{{ error }}</div>

    <div v-if="items.length">
      <p>Total: {{ pageCount }} records</p>
      <ul>
        <li v-for="item in items" :key="item.OrderID">
          {{ item.OrderID }} - {{ item.CustomerID }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { DataManager, Query, ODataV4Adaptor } from '@syncfusion/ej2-data'

export default {
  data() {
    return {
      items: [],
      loading: false,
      error: null,
      pageCount: 0
    }
  },
  methods: {
    async loadData() {
      this.loading = true
      this.error = null

      try {
        const dm = new DataManager({
          url: 'url',
          adaptor: new ODataV4Adaptor(),
          crossDomain: true
        })

        const result = await dm.executeQuery(new Query().take(10))
        this.items = result.result
        this.pageCount = result.count
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    }
  },
  mounted() {
    this.loadData()
  }
}
</script>

<style scoped>
.error {
  padding: 10px;
  color: #d32f2f;
  background: #ffebee;
  border-radius: 4px;
}

button {
  padding: 8px 16px;
  background: #1976d2;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
```

---

## reactive() vs ref()

### ref() - For Single Values

```typescript
import { ref } from 'vue'

const count = ref(0)
const name = ref('John')
const items = ref([])

// Access with .value
count.value++
console.log(name.value)
```

### reactive() - For Objects

```typescript
import { reactive } from 'vue'

const state = reactive({
  orders: [],
  user: {
    id: 1,
    name: 'John'
  },
  loading: false
})

// Access directly (no .value)
state.orders.push(newOrder)
state.user.name = 'Jane'
```

### DataManager with reactive()

```typescript
import { reactive } from 'vue'
import { DataManager, Query, ODataV4Adaptor } from '@syncfusion/ej2-data'

const state = reactive({
  items: [],
  pageCount: 0,
  loading: false,
  error: null
})

async function loadData() {
  state.loading = true
  
  try {
    const dm = new DataManager({
      url: 'url',
      adaptor: new ODataV4Adaptor()
    })
    
    const result = await dm.executeQuery(new Query().take(10))
    state.items = result.result
    state.pageCount = result.count
  } catch (err) {
    state.error = err.message
  } finally {
    state.loading = false
  }
}
```

---

## Performance & Best Practices

### 1. Use Computed for Filtering

```typescript
import { computed, ref } from 'vue'

const items = ref([])
const searchText = ref('')

const filteredItems = computed(() => {
  return items.value.filter(item =>
    item.CustomerID.includes(searchText.value)
  )
})
```

### 2. Lazy Load with Pagination

```typescript
const loadMore = async () => {
  const pageSize = 10
  const pageNo = Math.floor(items.value.length / pageSize)
  
  const result = await dm.executeQuery(
    new Query().take(pageSize).skip(pageNo * pageSize)
  )
  
  items.value.push(...result.result)
}
```

### 3. Enable Caching

```typescript
const dm = new DataManager({
  url: 'url',
  adaptor: new WebApiAdaptor(),
  enableCache: true  // Reduce repeated requests
})
```

### 4. Error Handling with Status Codes

```typescript
try {
  const result = await dm.executeQuery(query)
} catch (error) {
  switch (error.status) {
    case 0:
      console.error('Network error')
      break
    case 401:
      console.error('Unauthorized')
      break
    case 404:
      console.error('Not found')
      break
    case 500:
      console.error('Server error')
      break
  }
}
```

---
