---
title: Caching in Syncfusion Vue DataManager
---

# Caching in Syncfusion Vue DataManager

## Table of Contents

- [Overview](#overview)
- [Enabling Caching](#enabling-caching)
- [How Caching Works](#how-caching-works)
- [Cache Invalidation](#cache-invalidation)
- [Programmatic Cache Clear](#manual-cache-clearing-with-clearcache)
- [Performance Impact](#performance-impact)
- [Vue Examples](#vue-examples)

---

## Overview

Caching stores query results in memory to avoid redundant server requests. Automatically clears on data modifications.

---

## Enabling Caching

### Basic Configuration

```typescript
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data'

const dm = new DataManager({
  url: 'url',
  adaptor: new WebApiAdaptor(),
  enableCache: true  // Enable caching
})
```

### Advanced Configuration

```typescript
const dm = new DataManager({
  url: 'url',
  adaptor: new WebApiAdaptor(),
  enableCache: true
})
```

---

## How Caching Works

### Cache Key Generation

DataManager generates unique cache keys from query parameters:

```typescript
// These generate the SAME cache key (same parameters)
dm.executeQuery(new Query().take(10).skip(0))
dm.executeQuery(new Query().take(10).skip(0))  // Returns from cache

// Different cache key (different parameters)
dm.executeQuery(new Query().take(10).skip(10))
```

### Cache Storage

```typescript
// Query with filtering
const result1 = await dm.executeQuery(
  new Query()
    .where('Freight', 'greaterThan', 30)
    .take(10)
)
// Cache key: "where:Freight:greaterThan:30|take:10"
// Result: Stored in memory

// Same query
const result2 = await dm.executeQuery(
  new Query()
    .where('Freight', 'greaterThan', 30)
    .take(10)
)
// Returns from cache instantly (no server call)
```

---

## Cache Invalidation

### Auto-Clear on CRUD

Cache automatically clears when data changes:

```typescript
// These operations CLEAR the cache:
await dm.insert(newOrder, 'Orders')      // After insert
await dm.update('OrderID', updatedOrder, 'Orders')  // After update
await dm.remove('OrderID', orderId, 'Orders')       // After delete
```

### Complete Example with Cache Invalidation

```typescript
import { ref } from 'vue'

const items = ref([])
const loading = ref(false)

const dm = new DataManager({
  url: 'url',
  adaptor: new WebApiAdaptor(),
  enableCache: true
})

const loadOrders = async () => {
  loading.value = true
  try {
    const result = await dm.executeQuery(
      new Query().take(20).skip(0)
    )
    items.value = result.result
    // Result cached
  } finally {
    loading.value = false
  }
}

const insertOrder = async (order) => {
  try {
    const result = await dm.insert(order, 'Orders')
    items.value.push(result)
    // Cache automatically cleared here
    return { success: true, data: result }
  } catch (error) {
    return { success: false, message: error.message }
  }
}

// Reload after insert (will fetch fresh from server)
const insertAndRefresh = async (order) => {
  const insertResult = await insertOrder(order)
  if (insertResult.success) {
    await loadOrders()  // New query, cache miss, fresh data
  }
}
```

---

## Manual Cache Clearing with clearCache()

Explicitly clear cached data using the `clearCache()` method:

```typescript
const dm = new DataManager({
  url: 'url',
  adaptor: new WebApiAdaptor(),
  enableCache: true
})

// Load and cache data
const result = await dm.executeQuery(new Query().take(20))
items.value = result.result
console.log('Data cached')

// Clear all cache manually
dm.clearCache()
console.log('Cache cleared')

// Next query hits server
const freshResult = await dm.executeQuery(new Query().take(20))
items.value = freshResult.result
console.log('Fresh data from server')
```

**Method signature:** `dm.clearCache()`

**Purpose:** Clears cached data from memory or browser storage

**When to use:**
- After modifying offline data
- During user logout or session end
- Resetting application state
- Manually invalidating entire cache
- After critical data system updates

**Vue 3 Composition API example:**

```typescript
<script setup>
import { ref, onBeforeUnmount } from 'vue'
import { DataManager, Query, WebApiAdaptor } from '@syncfusion/ej2-data'

const items = ref([])
const isLoggedIn = ref(true)

const dm = new DataManager({
  url: 'url',
  adaptor: new WebApiAdaptor(),
  enableCache: true
})

const loadOrders = async () => {
  const result = await dm.executeQuery(new Query().take(100))
  items.value = result.result
}

const logout = () => {
  // Clear sensitive cached data before logout
  dm.clearCache()
  isLoggedIn.value = false
  console.log('Cache cleared for security')
  // Redirect to login
  window.location.href = '/login'
}

const performCriticalUpdate = async (newData) => {
  try {
    // Make critical change
    await dm.update('OrderID', newData, 'Orders')
    
    // Force all components to refresh by clearing cache
    dm.clearCache()
    
    // Reload data
    await loadOrders()
    console.log('Critical update complete - cache cleared')
  } catch (error) {
    console.error('Update failed:', error)
  }
}

onBeforeUnmount(() => {
  // Optionally clear cache on component unmount
  dm.clearCache()
})
</script>

<template>
  <div>
    <button @click="logout">Logout</button>
    <button @click="performCriticalUpdate">Update & Refresh</button>
    <p v-if="!isLoggedIn">Logged out</p>
  </div>
</template>
```

**Vue 2 Options API example:**

```vue
<script>
import { DataManager, Query, WebApiAdaptor } from '@syncfusion/ej2-data'

export default {
  data() {
    return {
      items: [],
      dm: null,
      isLoggedIn: true
    }
  },
  created() {
    this.dm = new DataManager({
      url: 'url',
      adaptor: new WebApiAdaptor(),
      enableCache: true
    })
  },
  methods: {
    async loadOrders() {
      const result = await this.dm.executeQuery(new Query().take(100))
      this.items = result.result
    },
    logout() {
      this.dm.clearCache()  // Clear cache before logout
      this.isLoggedIn = false
      this.$router.push('/login')
    },
    async onDataRefresh() {
      this.dm.clearCache()
      await this.loadOrders()
    }
  }
}
</script>
```

**Automatic vs Manual clearing:**

```typescript
// AUTOMATIC: CRUD clears cache
await dm.insert(newOrder, 'Orders')     // Cache cleared automatically
await dm.update('OrderID', updated, 'Orders')      // Cache cleared automatically
await dm.remove('OrderID', orderId, 'Orders')      // Cache cleared automatically

// MANUAL: Explicit control
dm.clearCache()  // Clears all cache at any time
```

---

## Performance Impact

### Without Caching

```typescript
const dm = new DataManager({
  url: 'url',
  adaptor: new WebApiAdaptor(),
  enableCache: false
})

// Each call hits server
await dm.executeQuery(new Query().take(10))  // Server request
await dm.executeQuery(new Query().take(10))  // Server request again
```

**Result:** 2 server requests, ~200-400ms latency each

### With Caching

```typescript
const dm = new DataManager({
  url: 'url',
  adaptor: new WebApiAdaptor(),
  enableCache: true
})

// First call hits server
await dm.executeQuery(new Query().take(10))  // Server request ~300ms
// Second call returns from cache
await dm.executeQuery(new Query().take(10))  // Memory lookup ~1ms (300x faster)
```

**Result:** 1 server request, instant second access

---

## When to Enable/Disable

### Enable Caching When:
- ✅ Data doesn't change frequently
- ✅ Multiple components access same data
- ✅ User performs repeated queries
- ✅ Network latency is high
- ✅ Server resources are limited

### Disable Caching When:
- ❌ Real-time data required
- ❌ Data changes constantly
- ❌ Memory constraints exist
- ❌ Complex filtering variations
- ❌ Large result sets

---

## Vue Examples

### Search with Cache

```typescript
<script setup>
import { ref, watch } from 'vue'
import { DataManager, Query, WebApiAdaptor } from '@syncfusion/ej2-data'

const searchText = ref('')
const items = ref([])
const loading = ref(false)

const dm = new DataManager({
  url: 'url',
  adaptor: new WebApiAdaptor(),
  enableCache: true
})

// Search updates cache miss on different search text
// But repeats of same search text return from cache
const search = async () => {
  if (!searchText.value) {
    items.value = []
    return
  }

  loading.value = true
  try {
    const result = await dm.executeQuery(
      new Query()
        .where('CustomerID', 'contains', searchText.value)
        .take(50)
    )
    items.value = result.result
  } finally {
    loading.value = false
  }
}

watch(searchText, search)
</script>

<template>
  <div>
    <input v-model="searchText" placeholder="Search customer ID" />
    <p v-if="loading">Loading...</p>
    <ul>
      <li v-for="item in items" :key="item.OrderID">
        {{ item.OrderID }} - {{ item.CustomerID }}
      </li>
    </ul>
  </div>
</template>
```

### Dashboard with Mixed Cache

```typescript
<script setup>
import { ref, onMounted } from 'vue'
import { DataManager, Query, WebApiAdaptor } from '@syncfusion/ej2-data'

const orders = ref([])
const stats = ref({ total: 0, highValue: 0 })

const dm = new DataManager({
  url: 'url',
  adaptor: new WebApiAdaptor(),
  enableCache: true
})

const loadDashboard = async () => {
  // Query 1: All orders (cached)
  const result1 = await dm.executeQuery(
    new Query().take(1000)
  )
  orders.value = result1.result

  // Query 2: High-value orders (different cache key)
  const result2 = await dm.executeQuery(
    new Query()
      .where('Freight', 'greaterThan', 100)
      .take(1000)
  )
  stats.value.highValue = result2.count

  stats.value.total = result1.count
}

// Repeat calls from cache
const refreshDashboard = async () => {
  // These queries hit cache (same parameters)
  await loadDashboard()
}

onMounted(loadDashboard)

// Schedule refresh every 15 minutes
setInterval(refreshDashboard, 15 * 60 * 1000)
</script>

<template>
  <div>
    <h2>Total Orders: {{ stats.total }}</h2>
    <h2>High-Value Orders (>100): {{ stats.highValue }}</h2>
    <table>
      <tr v-for="order in orders.slice(0, 10)" :key="order.OrderID">
        <td>{{ order.OrderID }}</td>
        <td>{{ order.CustomerID }}</td>
        <td>${{ order.Freight }}</td>
      </tr>
    </table>
  </div>
</template>
```

### Cache Clear Manual

```typescript
const manualClearCache = async () => {
  // If needed to force refresh
  // Save current filters
  const filters = new Query().where('Status', 'equal', 'active')

  // Temporarily disable cache
  dm.enableCache = false

  // Force fresh data
  const result = await dm.executeQuery(filters)
  items.value = result.result

  // Re-enable cache
  dm.enableCache = true
}
```

---

## Troubleshooting

### Issue: Getting Stale Data

**Symptom:** User sees old data after another user modified it

**Solution:** Disable caching or reduce TTL

```typescript
const dm = new DataManager({
  url: 'url',
  adaptor: new WebApiAdaptor(),
  enableCache: true
})
```

---
