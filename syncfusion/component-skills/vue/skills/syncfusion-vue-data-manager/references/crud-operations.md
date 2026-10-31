---
title: CRUD Operations in Syncfusion Vue DataManager
---

# CRUD Operations in Syncfusion Vue DataManager

## Table of Contents

- [Overview](#overview)
- [Insert](#insert)
- [Update](#update)
- [Delete](#delete)
- [saveChanges](#savechanges)
- [Batch Operations](#batch-operations)
- [Error Handling](#error-handling)

---

## Overview

CRUD (Create, Read, Update, Delete) enables data manipulation and persistence to the server through DataManager methods.

---

## Insert

### Single Record

#### Vue 3 - Composition API

```typescript
import { ref } from 'vue'
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data'

const dm = new DataManager({
  url: 'url',
  adaptor: new WebApiAdaptor()
})

const newOrder = {
  CustomerID: 'VINET',
  OrderDate: new Date(),
  Freight: 32.38
}

const insertOrder = async () => {
  try {
    const result = await dm.insert(newOrder, 'Orders')
    console.log('Inserted:', result)
    // Result: { OrderID: 10251, CustomerID: 'VINET', ... }
  } catch (error) {
    console.error('Insert failed:', error.message)
  }
}
```

#### Vue 2 - Options API

```vue
<script>
export default {
  data() {
    return {
      dm: new DataManager({
        url: 'url',
        adaptor: new WebApiAdaptor()
      })
    }
  },
  methods: {
    insertOrder() {
      const newOrder = {
        CustomerID: 'VINET',
        OrderDate: new Date(),
        Freight: 32.38
      }

      this.dm.insert(newOrder, 'Orders')
        .then((result) => {
          console.log('Inserted:', result)
          this.items.push(result)
        })
        .catch((error) => {
          console.error('Insert failed:', error.message)
        })
    }
  }
}
</script>
```

### Multiple Records

```typescript
const newOrders = [
  { CustomerID: 'VINET', Freight: 32.38 },
  { CustomerID: 'TOMSP', Freight: 11.61 },
  { CustomerID: 'HANAR', Freight: 65.83 }
]

const insertMultiple = async () => {
  try {
    const results = await Promise.all(
      newOrders.map(order => dm.insert(order, 'Orders'))
    )
    console.log('Inserted:', results)
  } catch (error) {
    console.error('Bulk insert failed:', error)
  }
}
```

### Insert Response

Server returns the newly created record:

```json
{
  "OrderID": 10251,
  "CustomerID": "VINET",
  "OrderDate": "2024-01-15T00:00:00",
  "Freight": 32.38
}
```

---

## Update

### Single Record Update

#### Vue 3

```typescript
const updatedOrder = {
  OrderID: 10248,
  CustomerID: 'VINET',
  Freight: 45.50  // Changed from 32.38
}

const updateOrder = async () => {
  try {
    // Syntax: update(action, data, keyField_value, original)
    await dm.update('OrderID', updatedOrder, 'Orders')
    console.log('Updated successfully')
  } catch (error) {
    console.error('Update failed:', error.message)
  }
}
```

#### Vue 2

```vue
<script>
export default {
  methods: {
    updateOrder() {
      const updatedOrder = {
        OrderID: 10248,
        Freight: 45.50
      }

      this.dm.update('OrderID', updatedOrder, 'Orders')
        .then(() => {
          console.log('Updated successfully')
          // Update local items array
          const index = this.items.findIndex(o => o.OrderID === 10248)
          if (index > -1) {
            this.$set(this.items, index, updatedOrder)
          }
        })
        .catch((error) => {
          console.error('Update failed:', error)
        })
    }
  }
}
</script>
```

### Batch Updates

```typescript
const ordersToUpdate = [
  { OrderID: 10248, Freight: 45.50 },
  { OrderID: 10249, Freight: 15.75 }
]

const updateMultiple = async () => {
  try {
    await Promise.all(
      ordersToUpdate.map(order =>
        dm.update('OrderID', order, 'Orders')
      )
    )
    console.log('All updated')
  } catch (error) {
    console.error('Batch update failed:', error)
  }
}
```

---

## Delete

### Single Record

```typescript
const deleteOrder = async (orderId) => {
  try {
    await dm.remove('Orders', orderId)
    console.log('Deleted:', orderId)
  } catch (error) {
    console.error('Delete failed:', error)
  }
}

// Usage
deleteOrder(10248)
```

### Multiple Records

```typescript
const deleteMultiple = async (orderIds) => {
  try {
    await Promise.all(
      orderIds.map(id => dm.remove('Orders', id))
    )
    console.log('All deleted')
  } catch (error) {
    console.error('Bulk delete failed:', error)
  }
}

// Usage
deleteMultiple([10248, 10249, 10250])
```

---

## saveChanges

### Batch CRUD Operations

Submit all changes (insert/update/delete) in one request:

```typescript
import { ref } from 'vue'

const items = ref([])
const changes = {
  added: [],     // New records
  changed: [],   // Updated records
  deleted: []    // Deleted records
}

const addItem = (item) => {
  changes.added.push(item)
}

const editItem = (item) => {
  changes.changed.push(item)
}

const removeItem = (id) => {
  const item = items.value.find(i => i.OrderID === id)
  if (item) changes.deleted.push(item)
}

const saveAllChanges = async () => {
  try {
    const result = await dm.saveChanges(changes)
    console.log('Changes saved:', result)
    // Reload data from server
    items.value = await dm.executeQuery(new Query())
  } catch (error) {
    console.error('Save failed:', error)
  }
}
```

---

## Response Format

### Success Response

```json
{
  "result": {
    "OrderID": 10251,
    "CustomerID": "VINET",
    "OrderDate": "2024-01-15",
    "Freight": 32.38
  }
}
```

### Error Response

```json
{
  "statusCode": 400,
  "error": "Invalid customer ID",
  "message": "Customer must exist in database"
}
```

---

## Error Handling

### Status Code Handling

```typescript
const insertWithErrorHandling = async (newOrder) => {
  try {
    const result = await dm.insert(newOrder, 'Orders')
    return { success: true, data: result }
  } catch (error) {
    switch (error.status) {
      case 400:
        return { success: false, message: 'Invalid data - check required fields' }
      case 401:
        return { success: false, message: 'Unauthorized - login required' }
      case 409:
        return { success: false, message: 'Duplicate record - this order exists' }
      case 500:
        return { success: false, message: 'Server error - try again later' }
      default:
        return { success: false, message: error.message }
    }
  }
}
```

### Client-Side Validation

```typescript
const validateOrder = (order) => {
  if (!order.CustomerID) return 'Customer ID required'
  if (!order.OrderDate) return 'Order date required'
  if (order.Freight < 0) return 'Freight cannot be negative'
  return null
}

const insertOrderWithValidation = async (order) => {
  const error = validateOrder(order)
  if (error) {
    console.error('Validation error:', error)
    return { success: false, message: error }
  }

  try {
    const result = await dm.insert(order, 'Orders')
    return { success: true, data: result }
  } catch (err) {
    return { success: false, message: err.message }
  }
}
```

---

## Vue Component Example

```typescript
<script setup lang="ts">
import { ref, reactive } from 'vue'
import { DataManager, Query, WebApiAdaptor } from '@syncfusion/ej2-data'

const items = ref([])
const loading = ref(false)
const error = ref('')

const dm = new DataManager({
  url: 'url',
  adaptor: new WebApiAdaptor(),

})

const formData = reactive({
  OrderID: 0,
  CustomerID: '',
  Freight: 0
})

const isEditing = ref(false)

const loadData = async () => {
  loading.value = true
  try {
    const result = await dm.executeQuery(new Query())
    items.value = result.result
  } finally {
    loading.value = false
  }
}

const insertNew = async () => {
  if (!formData.CustomerID || formData.Freight <= 0) {
    error.value = 'Invalid data'
    return
  }

  try {
    const result = await dm.insert(formData, 'Orders')
    items.value.push(result)
    formData.CustomerID = ''
    formData.Freight = 0
    error.value = ''
  } catch (err) {
    error.value = err.message
  }
}

const selectForEdit = (item) => {
  formData.OrderID = item.OrderID
  formData.CustomerID = item.CustomerID
  formData.Freight = item.Freight
  isEditing.value = true
}

const saveEdit = async () => {
  try {
    await dm.update('OrderID', formData, 'Orders')
    const index = items.value.findIndex(o => o.OrderID === formData.OrderID)
    if (index > -1) items.value[index] = { ...formData }
    isEditing.value = false
    error.value = ''
  } catch (err) {
    error.value = err.message
  }
}

const deleteItem = async (orderId) => {
  if (!confirm('Delete this order?')) return

  try {
    await dm.remove('Orders', orderId)
    items.value = items.value.filter(o => o.OrderID !== orderId)
  } catch (err) {
    error.value = err.message
  }
}
</script>

<template>
  <div>
    <!-- Form -->
    <form @submit.prevent="isEditing ? saveEdit() : insertNew()">
      <input v-model.number="formData.OrderID" placeholder="Order ID" disabled v-if="isEditing" />
      <input v-model="formData.CustomerID" placeholder="Customer ID" required />
      <input v-model.number="formData.Freight" placeholder="Freight" required />
      <button>{{ isEditing ? 'Update' : 'Insert' }}</button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>

    <!-- Table -->
    <table>
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Customer ID</th>
          <th>Freight</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.OrderID">
          <td>{{ item.OrderID }}</td>
          <td>{{ item.CustomerID }}</td>
          <td>{{ item.Freight }}</td>
          <td>
            <button @click="selectForEdit(item)">Edit</button>
            <button @click="deleteItem(item.OrderID)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
```

---
