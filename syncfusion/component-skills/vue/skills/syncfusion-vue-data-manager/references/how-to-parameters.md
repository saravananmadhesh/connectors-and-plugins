---
title: How to Pass Query Parameters in Vue DataManager
---

# How to Pass Query Parameters in Syncfusion Vue DataManager

## Static Query Parameters

### Via URL

```typescript
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data'

const dm = new DataManager({
  url: 'url',
  adaptor: new WebApiAdaptor()
})
```

---

## Dynamic Parameters

### Via Pre-Request Middleware

```typescript
const dm = new DataManager({
  url: 'url',
  adaptor: new WebApiAdaptor()
})

dm.applyPreRequestMiddlewares([
  async (context) => {
    // Add query parameters to URL
    const url = new URL(context.request.url)
    url.searchParams.append('apiKey', 'your-api-key')
    url.searchParams.append('client', getClientID())
    url.searchParams.append('timestamp', Date.now())
    
    context.request.url = url.toString()
  }
])
```

---

## Filter Parameters

### Custom Query Processing

```typescript
const userId = ref(123)
const filterStatus = ref('active')

const loadUserOrders = async () => {
  const result = await dm.executeQuery(
    new Query()
      .addParams('userId', userId.value)
      .addParams('status', filterStatus.value)
      .take(10)
  )
  items.value = result.result
}
```

---

## Vue Example with Parameters

> 🔒 **Security Warning:** `localStorage` and `sessionStorage` store data **unencrypted** in the browser. **Never store sensitive data** (passwords, tokens, PII, payment info, user secrets, authentication credentials) in persisted TreeGrid state. State persistence is safe for **UI state only** (expand/collapse state, page number, sort order, column visibility, filter selections). For sensitive configuration or user data, use secure server-side session storage instead.

```typescript
<script setup>
import { DataManager, Query, WebApiAdaptor } from '@syncfusion/ej2-data'
import { ref, onMounted, watch } from 'vue'

const items = ref([])
const filters = ref({
  year: new Date().getFullYear(),
  department: 'Sales'
})

const dm = new DataManager({
  url: 'url',
  adaptor: new WebApiAdaptor()
})

dm.applyPreRequestMiddlewares([
  async (context) => {
    const url = new URL(context.request.url)
    
    // Add user-specific parameters
    url.searchParams.append('userId', localStorage.getItem('userId'))
    url.searchParams.append('tenant', localStorage.getItem('tenantId'))
    
    context.request.url = url.toString()
  }
])

const loadOrders = async () => {
  var url = new URL(dm.url)
  url.searchParams.append('year', filters.value.year)
  url.searchParams.append('dept', filters.value.department)
  dm.url = url.toString()

  const result = await dm.executeQuery(new Query().take(50))
  items.value = result.result
}

watch(filters.value, loadOrders, { deep: true })

onMounted(loadOrders)
</script>

<template>
  <div>
    <select v-model.number="filters.year" @change="loadOrders">
      <option value="2022">2022</option>
      <option value="2023">2023</option>
      <option value="2024">2024</option>
    </select>
    
    <select v-model="filters.department" @change="loadOrders">
      <option value="Sales">Sales</option>
      <option value="Support">Support</option>
      <option value="Marketing">Marketing</option>
    </select>

    <table>
      <tr v-for="item in items" :key="item.OrderID">
        <td>{{ item.OrderID }}</td>
        <td>{{ item.CustomerID }}</td>
      </tr>
    </table>
  </div>
</template>
```

---

## Pagination Parameters

### Custom Page Size

```typescript
const pageSize = ref(25)
const pageNumber = ref(1)

const loadPage = async () => {
  const skip = (pageNumber.value - 1) * pageSize.value
  
  const result = await dm.executeQuery(
    new Query()
      .skip(skip)
      .take(pageSize.value)
  )
  
  items.value = result.result
  totalCount.value = result.count
}
```

---

## Search Parameters

```typescript
const searchText = ref('')

const search = async () => {
  const url = new URL(dm.url)
  url.searchParams.append('search', searchText.value)
  url.searchParams.append('searchFields', 'CustomerID,ShipCity')
  
  dm.url = url.toString()

  const result = await dm.executeQuery(new Query().take(50))
  items.value = result.result
}
```
