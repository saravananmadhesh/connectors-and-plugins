---
title: How to Enable Offline Mode in Vue DataManager
---

# How to Enable Offline Mode in Syncfusion Vue DataManager

## Enable Offline Mode

### Configuration

```typescript
import { DataManager, RemoteSaveAdaptor } from '@syncfusion/ej2-data'

const dm = new DataManager({
  url: 'url',
  adaptor: new RemoteSaveAdaptor(),
  offline: true  // Load all data once, filter client-side
})
```

---

## How It Works

1. **Initial Load:** Download ALL data from server
2. **Local Operations:** Filter, sort, group client-side (instant)
3. **Modifications:** Still sent to server (insert, update, delete)
4. **Refresh:** Can re-fetch data or work with cached copy

---

## Vue 3 Component Example

```typescript
<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import { DataManager, Query, RemoteSaveAdaptor } from '@syncfusion/ej2-data'

const items = ref([])
const isOffline = ref(false)
const loading = ref(false)

const state = reactive({
  allData: [],
  filteredData: [],
  searchText: '',
  sortBy: 'OrderID'
})

const dm = new DataManager({
  url: 'url',
  adaptor: new RemoteSaveAdaptor(),
  offline: true  // Enable offline mode
})

// Load all data once
const loadOfflineData = async () => {
  loading.value = true
  try {
    // Wait for data to be ready
    await dm.ready

    // Execute local query with all loaded data
    state.allData = dm.executeLocal(new Query())
    state.filteredData = state.allData
    isOffline.value = true
  } catch (error) {
    console.error('Failed to load offline data:', error)
    isOffline.value = false
  } finally {
    loading.value = false
  }
}

// Filter locally (no server call)
const filterData = () => {
  if (!state.searchText) {
    state.filteredData = state.allData
    return
  }

  // Client-side filtering
  state.filteredData = dm.executeLocal(
    new Query()
      .where('CustomerID', 'contains', state.searchText)
      .or('OrderID', 'equal', parseInt(state.searchText))
  )
}

// Sort locally (no server call)
const sortData = (field) => {
  state.sortBy = field
  state.filteredData = dm.executeLocal(
    new Query().sortBy(field)
  )
}

// Still sync to server when inserting
const addOrder = async (order) => {
  try {
    const result = await dm.insert('Orders', order)
    state.allData.push(result)
    state.filteredData.push(result)
    return { success: true }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// Refresh from server
const syncWithServer = async () => {
  loading.value = true
  try {
    await dm.ready  // Reload from server
    state.allData = dm.executeLocal(new Query())
    state.filteredData = state.allData
  } finally {
    loading.value = false
  }
}

onMounted(loadOfflineData)
</script>

<template>
  <div>
    <p v-if="loading">Loading offline data...</p>
    <div v-else-if="isOffline" class="container">
      <h2>✓ Working Offline ({{ state.allData.length }} records loaded)</h2>
      
      <!-- Search -->
      <input 
        v-model="state.searchText" 
        placeholder="Search customer or order ID"
        @input="filterData"
      />
      
      <!-- Sort -->
      <select v-model="state.sortBy" @change="sortData(state.sortBy)">
        <option value="OrderID">Order ID</option>
        <option value="CustomerID">Customer ID</option>
        <option value="Freight">Freight</option>
      </select>
      
      <!-- Sync -->
      <button @click="syncWithServer">Sync with Server</button>

      <!-- Results ({{ state.filteredData.length }} matching) -->
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer ID</th>
            <th>Freight</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in state.filteredData" :key="item.OrderID">
            <td>{{ item.OrderID }}</td>
            <td>{{ item.CustomerID }}</td>
            <td>${{ item.Freight }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <p>Failed to load offline data</p>
    </div>
  </div>
</template>
```

---

## Vue 2 Example

```vue
<template>
  <div>
    <p v-if="loading">Loading...</p>
    <div v-else-if="isOffline">
      <input v-model="searchText" @input="filterData" placeholder="Search..." />
      
      <table>
        <tr v-for="item in filteredData" :key="item.OrderID">
          <td>{{ item.OrderID }}</td>
          <td>{{ item.CustomerID }}</td>
          <td>{{ item.Freight }}</td>
        </tr>
      </table>
      
      <button @click="syncWithServer">Sync</button>
    </div>
  </div>
</template>

<script>
import { DataManager, Query, RemoteSaveAdaptor } from '@syncfusion/ej2-data'

export default {
  data() {
    return {
      allData: [],
      filteredData: [],
      searchText: '',
      isOffline: false,
      loading: false,
      dm: null
    }
  },
  mounted() {
    this.initOfflineMode()
  },
  methods: {
    initOfflineMode() {
      this.loading = true
      this.dm = new DataManager({
        url: 'url',
        adaptor: new RemoteSaveAdaptor(),
        offline: true
      })

      this.dm.ready.then(() => {
        this.allData = this.dm.executeLocal(new Query())
        this.filteredData = this.allData
        this.isOffline = true
        this.loading = false
      }).catch(error => {
        console.error('Error:', error)
        this.loading = false
      })
    },
    filterData() {
      if (!this.searchText) {
        this.filteredData = this.allData
        return
      }

      this.filteredData = this.dm.executeLocal(
        new Query().where('CustomerID', 'contains', this.searchText)
      )
    },
    syncWithServer() {
      this.loading = true
      this.dm = new DataManager({
        url: 'url',
        adaptor: new RemoteSaveAdaptor(),
        offline: true
      })

      this.dm.ready.then(() => {
        this.allData = this.dm.executeLocal(new Query())
        this.filteredData = this.allData
        this.loading = false
      })
    }
  }
}
</script>
```

---

## Use Cases

### Mobile App

```typescript
const dm = new DataManager({
  url: 'url',
  adaptor: new RemoteSaveAdaptor(),
  offline: true
})

// Download once, work offline during commute
// All filtering/sorting instant
// Sync when connection restored
```

### Large Reports

```typescript
const dm = new DataManager({
  url: 'url',
  adaptor: new RemoteSaveAdaptor(),
  offline: true
})

// Download 50,000 records once
// User can sort/filter instantly
// No server round-trips needed
```

### Performance Optimization

```typescript
// Offline mode for known-good data
const dm = new DataManager({
  url: 'url',
  adaptor: new RemoteSaveAdaptor(),
  offline: true  // One load, then instant filtering
})
```

---

## Limitations

- ❌ Cannot stream large datasets
- ❌ Memory constraints on huge files
- ❌ Real-time data updates not reflected
- ✅ CRUD still goes to server
- ✅ Queries execute instantly client-side

---

## When to Use

**Use offline mode when:**
- Dataset size < 100MB
- Users need instant filtering/sorting
- Data doesn't change frequently
- Server bandwidth limited

**Don't use when:**
- Real-time data required
- Dataset too large (millions of records)
- Live updates needed
