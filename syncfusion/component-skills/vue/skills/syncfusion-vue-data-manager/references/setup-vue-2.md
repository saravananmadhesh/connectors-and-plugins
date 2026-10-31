---
title: Vue 2 Getting Started with DataManager
---

# Getting Started with Vue DataManager in Vue 2

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Setup](#project-setup)
- [First DataManager Example](#first-datamanager-example)
- [Vue 2 vs Vue 3 Differences](#vue-2-vs-vue-3-differences)
- [Troubleshooting](#troubleshooting)

---

## Prerequisites

- Node.js v8 or higher
- npm or yarn package manager
- Vue CLI v3 or higher
- Basic understanding of Vue 2 and ES6

---

## Installation

### Step 1: Create a New Vue 2 Project

```bash
# Install Vue CLI globally
npm install -g @vue/cli

# Create new Vue project
vue create data-app

# Select 'Default ([Vue 2] babel, eslint)' from the menu
```

### Step 2: Navigate to Project

```bash
cd data-app
```

### Step 3: Install Syncfusion DataManager Package

```bash
npm install @syncfusion/ej2-data --save
```

### Step 4: Install Dependencies

If you need the base package:

```bash
npm install @syncfusion/ej2-base --save
```

---

## Project Setup

### Update imports in main.js

```typescript
import Vue from 'vue'
import App from './App.vue'

// Import DataManager components
import { DataManager, Query, ODataV4Adaptor } from '@syncfusion/ej2-data';

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
```

### Create DataService.js

```typescript
import { DataManager, ODataV4Adaptor, Query } from '@syncfusion/ej2-data';

class DataService {
  constructor(url, adaptor) {
    this.dataManager = new DataManager({
      url: url,
      adaptor: adaptor,
      crossDomain: true
    });
  }

  getOrders(pageSize = 10) {
    return this.dataManager.executeQuery(
      new Query().take(pageSize)
    );
  }

  getFilteredOrders(filterCondition) {
    return this.dataManager.executeQuery(
      new Query().where(filterCondition)
    );
  }
}

export default DataService;
```

---

## First DataManager Example

### App.vue - Options API

```vue
<template>
  <div id="app">
    <h1>Vue 2 DataManager Example</h1>
    
    <div v-if="loading" class="loader">Loading...</div>
    <div v-if="error" class="error">{{ error }}</div>
    
    <table v-if="orders.length" class="table">
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Customer ID</th>
          <th>Freight</th>
          <th>Order Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.OrderID">
          <td>{{ order.OrderID }}</td>
          <td>{{ order.CustomerID }}</td>
          <td>{{ order.Freight }}</td>
          <td>{{ order.OrderDate | formatDate }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { DataManager, Query, ODataV4Adaptor } from '@syncfusion/ej2-data';

export default {
  name: 'App',
  data() {
    return {
      orders: [],
      loading: false,
      error: null
    };
  },
  mounted() {
    this.loadOrders();
  },
  methods: {
    loadOrders() {
      this.loading = true;
      this.error = null;

      const dataManager = new DataManager({
        url: 'url',
        adaptor: new ODataV4Adaptor(),
        crossDomain: true
      });

      dataManager.executeQuery(new Query().take(10))
        .then((result) => {
          this.orders = result.result;
          this.loading = false;
        })
        .catch((error) => {
          this.error = `Error: ${error.status ? error.status : 'Network error'}`;
          this.loading = false;
        });
    }
  },
  filters: {
    formatDate(date) {
      if (!date) return '';
      return new Date(date).toLocaleDateString();
    }
  }
}
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

.table th {
  background-color: #f2f2f2;
}

.table tr:hover {
  background-color: #f5f5f5;
}

.loader {
  padding: 20px;
  color: #666;
}

.error {
  padding: 20px;
  color: #d32f2f;
  background-color: #ffebee;
  border-radius: 4px;
}
</style>
```

---

## Vue 2 vs Vue 3 Differences

### Component Structure

| Feature | Vue 2 | Vue 3 |
|---------|-------|-------|
| API | Options API | Composition API (default) |
| Lifecycle | `mounted()` | `onMounted()` |
| State | `data()` | `ref()` / `reactive()` |
| Methods | `methods: {}` | Function inside `setup()` |
| Computed | `computed: {}` | `computed()` |
| Watch | `watch: {}` | `watch()` |

### DataManager Usage

**Vue 2:**
```typescript
export default {
  methods: {
    loadData() {
      dataManager.executeQuery(query)
        .then(result => {
          this.items = result.result;
        });
    }
  }
}
```

**Vue 3:**
```typescript
setup() {
  const items = ref([]);
  
  onMounted(async () => {
    const result = await dataManager.executeQuery(query);
    items.value = result.result;
  });
  
  return { items };
}
```

---

## Troubleshooting

### Issue: Module not found

**Error:** `Cannot find module '@syncfusion/ej2-data'`

**Solution:**
```bash
npm install @syncfusion/ej2-data --save
```

### Issue: CORS errors

**Error:** `No 'Access-Control-Allow-Origin' header`

**Solution:**
```typescript
const dataManager = new DataManager({
  url: 'url',
  adaptor: new WebApiAdaptor(),
  crossDomain: true  // Enable CORS
});
```

### Issue: Data not loading

**Check:**
1. Verify URL is correct
2. Check browser console for errors
3. Verify adaptor matches backend format
4. Add error logging in .catch()

### Issue: Slow performance

**Solution:**
1. Enable caching: `enableCache: true`
2. Use pagination: `new Query().take(10).skip(0)`
3. Select specific fields: `new Query().select(['OrderID', 'CustomerID'])`

---
