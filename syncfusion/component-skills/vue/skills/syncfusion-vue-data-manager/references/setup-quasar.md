---
title: Quasar Getting Started with DataManager
---

# Getting Started with Vue DataManager in Quasar

## Table of Contents

- [Prerequisites](#prerequisites)
- [Quasar Installation](#quasar-installation)
- [DataManager Setup](#datamanager-setup)
- [Boot File Configuration](#boot-file-configuration)
- [Component Example](#component-example)
- [Q-Grid Integration](#q-grid-integration)

---

## Prerequisites

- Node.js v12 or higher
- Quasar CLI knowledge
- Vue 3 with Composition API
- Basic Quasar project experience

---

## Quasar Installation

### Step 1: Create Quasar Project

```bash
npm init quasar
# or
yarn create quasar
```

### Step 2: Follow Setup Prompts

Select:
- **Project type**: App with Quasar CLI
- **Quasar version**: Quasar v2 (Vue 3)
- **Script type**: TypeScript (recommended)
- **Build tool**: Vite 2

### Step 3: Navigate to Project

```bash
cd your-project-name
```

### Step 4: Install DataManager Package

```bash
npm install @syncfusion/ej2-data --save
```

---

## DataManager Setup

### Create services/dataService.ts

```typescript
import { DataManager, Query, WebApiAdaptor } from '@syncfusion/ej2-data'

export class OrderService {
  private dataManager: DataManager

  constructor(apiUrl: string) {
    this.dataManager = new DataManager({
      url: apiUrl,
      adaptor: new WebApiAdaptor(),
      crossDomain: true
    })
  }

  async getOrders(pageSize: number = 10) {
    try {
      const result = await this.dataManager.executeQuery(
        new Query().take(pageSize)
      )
      return result.result
    } catch (error) {
      console.error('Error fetching orders:', error)
      throw error
    }
  }

  async searchOrders(searchText: string) {
    const result = await this.dataManager.executeQuery(
      new Query().search(searchText, ['CustomerID', 'ShipCity'])
    )
    return result.result
  }
}
```

---

## Boot File Configuration

### Create boot/dataManager.ts

```typescript
import { boot } from 'quasar/app'
import { DataManager } from '@syncfusion/ej2-data'

export default boot(({ app }) => {
  // Make DataManager available globally
  app.config.globalProperties.$DataManager = DataManager
})
```

### Register in quasar.conf.js

```javascript
module.exports = function (ctx) {
  return {
    boot: ['dataManager'],
    // ... rest of config
  }
}
```

---

## Component Example

### pages/Orders.vue

```vue
<template>
  <q-page class="row items-center justify-center">
    <div class="col-12 col-md-8">
      <h4>Orders Management</h4>

      <q-card class="q-mb-md">
        <q-card-section>
          <q-input
            v-model="searchText"
            filled
            dense
            placeholder="Search orders..."
            @update:model-value="handleSearch"
          >
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
          </q-input>
        </q-card-section>
      </q-card>

      <q-spinner v-if="loading" size="50px" color="primary" />

      <q-card v-else-if="orders.length">
        <q-table
          :rows="orders"
          columns="columns"
          row-key="OrderID"
          flat
          bordered
        >
          <template v-slot:body-cell-action="props">
            <q-td :props="props">
              <q-btn
                size="sm"
                color="primary"
                round
                dense
                icon="edit"
                @click="editOrder(props.row)"
              />
              <q-btn
                size="sm"
                color="negative"
                round
                dense
                icon="delete"
                @click="deleteOrder(props.row.OrderID)"
              />
            </q-td>
          </template>
        </q-table>
      </q-card>

      <q-card v-else>
        <q-card-section>
          <p v-if="error" class="text-negative">{{ error }}</p>
          <p v-else>No orders found</p>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { DataManager, Query, WebApiAdaptor } from '@syncfusion/ej2-data'

const $q = useQuasar()

interface Order {
  OrderID: number
  CustomerID: string
  Freight: number
  OrderDate: string
}

const orders = ref<Order[]>([])
const loading = ref(false)
const error = ref('')
const searchText = ref('')

const dataManager = new DataManager({
  url: 'url',
  adaptor: new WebApiAdaptor(),
  crossDomain: true
})

const columns = [
  { name: 'OrderID', label: 'Order ID', field: 'OrderID' },
  { name: 'CustomerID', label: 'Customer', field: 'CustomerID' },
  { name: 'Freight', label: 'Freight', field: 'Freight' },
  { name: 'OrderDate', label: 'Date', field: 'OrderDate' },
  { name: 'action', label: 'Actions', field: '' }
]

const loadOrders = async () => {
  loading.value = true
  error.value = ''

  try {
    const result = await dataManager.executeQuery(new Query().take(10))
    orders.value = result.result
  } catch (err) {
    error.value = `Failed to load orders: ${err.message}`
    $q.notify({
      type: 'negative',
      message: error.value,
      position: 'top'
    })
  } finally {
    loading.value = false
  }
}

const handleSearch = async () => {
  if (!searchText.value) {
    loadOrders()
    return
  }

  loading.value = true
  try {
    const result = await dataManager.executeQuery(
      new Query().search(searchText.value, ['CustomerID'])
    )
    orders.value = result.result
  } catch (err) {
    error.value = 'Search failed'
  } finally {
    loading.value = false
  }
}

const editOrder = (order: Order) => {
  $q.dialog({
    title: 'Edit Order',
    message: `Edit Order ${order.CustomerID}`
  })
}

const deleteOrder = async (orderId: number) => {
  $q.dialog({
    title: 'Confirm Delete',
    message: 'Are you sure you want to delete this order?',
    cancel: true,
    persistent: true
  }).onOk(async () => {
    try {
      await dataManager.remove('Orders', orderId)
      loadOrders()
      $q.notify({
        type: 'positive',
        message: 'Order deleted successfully'
      })
    } catch (err) {
      $q.notify({
        type: 'negative',
        message: 'Failed to delete order'
      })
    }
  })
}

onMounted(loadOrders)
</script>
```

---

## Q-Grid Integration

### Using Q-Table with DataManager

```vue
<template>
  <q-table
    :rows="rows"
    :columns="columns"
    row-key="OrderID"
    :loading="loading"
    :pagination.sync="pagination"
    @request="onRequest"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DataManager, Query, WebApiAdaptor } from '@syncfusion/ej2-data'

const dataManager = new DataManager({
  url: 'url',
  adaptor: new WebApiAdaptor()
})

const rows = ref([])
const loading = ref(false)
const pagination = ref({
  sortBy: 'OrderID',
  descending: false,
  page: 1,
  rowsPerPage: 10,
  rowsNumber: 0
})

const onRequest = async (props: any) => {
  const { page, rowsPerPage, sortBy, descending } = props.pagination

  loading.value = true

  try {
    let query = new Query()
      .take(rowsPerPage)
      .skip((page - 1) * rowsPerPage)

    if (sortBy) {
      if (descending) {
        query = query.sortByDescending(sortBy)
      } else {
        query = query.sortBy(sortBy)
      }
    }

    const result = await dataManager.executeQuery(query)

    rows.value = result.result
    pagination.value.rowsNumber = result.count
    pagination.value.page = page
    pagination.value.rowsPerPage = rowsPerPage
    pagination.value.sortBy = sortBy
    pagination.value.descending = descending
  } finally {
    loading.value = false
  }
}
</script>
```

---

## Build for Production

### Optimize Bundle Size

```bash
# Build for production
quasar build
```

### quasar.conf.js Optimization

```javascript
build: {
  target: {
    browser: ['es2019', 'edge88', 'firefox78', 'chrome84', 'safari13.1'],
    node: 'node12'
  },
  vueRouterMode: 'hash',
  publicPath: '/',
  gzip: true
}
```

---
