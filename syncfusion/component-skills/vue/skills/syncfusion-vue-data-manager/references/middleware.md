---
title: Middleware in Syncfusion Vue DataManager
---

# Middleware in Syncfusion Vue DataManager

## Table of Contents

- [Overview](#overview)
- [Pre-Request Middleware](#pre-request-middleware)
- [Post-Request Middleware](#post-request-middleware)
- [Authentication Patterns](#authentication-patterns)
- [Request/Response Transformation](#requestresponse-transformation)
- [Error Handling with Retry](#error-handling-with-retry)

---

## Overview

Middleware intercepts and transforms HTTP requests/responses globally without modifying individual queries.

**Two Types:**
- **Pre-Request:** Modify outgoing requests (headers, parameters)
- **Post-Request:** Transform incoming responses

---

## Pre-Request Middleware

### Add Static Headers

```typescript
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data'

const dm = new DataManager({
  url: 'url',
  adaptor: new WebApiAdaptor()
})

dm.applyPreRequestMiddlewares([
  async (context) => {
    // context.request is the HTTP request object
    context.request.headers = context.request.headers || {}
    context.request.headers['X-API-Version'] = '2.0'
    context.request.headers['X-Request-ID'] = generateUUID()
  }
])
```

### Add Dynamic Headers

> 🔒 **Security Warning:** `localStorage` and `sessionStorage` store data **unencrypted** in the browser. **Never store sensitive data** (passwords, tokens, PII, payment info, user secrets, authentication credentials) in persisted TreeGrid state. State persistence is safe for **UI state only** (expand/collapse state, page number, sort order, column visibility, filter selections). For sensitive configuration or user data, use secure server-side session storage instead.

```typescript
const getAuthToken = () => {
  return localStorage.getItem('authToken') || ''
}

dm.applyPreRequestMiddlewares([
  async (context) => {
    const token = getAuthToken()
    context.request.headers = context.request.headers || {}
    context.request.headers['Authorization'] = `send_token`
  }
])
```

### Add Timestamps

```typescript
dm.applyPreRequestMiddlewares([
  async (context) => {
    context.request.headers = context.request.headers || {}
    context.request.headers['X-Request-Time'] = new Date().toISOString()
    context.request.headers['X-Client-Timezone'] = Intl.DateTimeFormat().resolvedOptions().timeZone
  }
])
```

### Vue Component Example

```typescript
<script setup>
import { DataManager, Query, WebApiAdaptor } from '@syncfusion/ej2-data'
import { ref, onMounted } from 'vue'

const items = ref([])
const authToken = ref('')

const dm = new DataManager({
  url: 'url',
  adaptor: new WebApiAdaptor()
})

// Add middleware for authentication
dm.applyPreRequestMiddlewares([
  async (context) => {
    context.request.headers = context.request.headers || {}
    context.request.headers['Authorization'] = `send_token`
    context.request.headers['Content-Type'] = 'application/json'
  }
])

const loadOrders = async () => {
  try {
    const result = await dm.executeQuery(new Query().take(10))
    items.value = result.result
  } catch (error) {
    console.error('Error:', error)
  }
}

onMounted(loadOrders)
</script>
```

---

## Post-Request Middleware

### Transform Response Format

```typescript
// Backend returns: { data: [...], total: 100 }
// Frontend expects: { result: [...], count: 100 }

dm.applyPostRequestMiddlewares([
  async (context) => {
    if (context.response && context.response.data) {
      // Normalize format
      context.response.result = context.response.data
      context.response.count = context.response.total
    }
  }
])
```

### Normalize Field Names

```typescript
// Backend returns: { OrderID, CustomerID, Freight }
// Map to: { id, customer, amount }

dm.applyPostRequestMiddlewares([
  async (context) => {
    if (context.response && context.response.result) {
      context.response.result = context.response.result.map(item => ({
        id: item.OrderID,
        customer: item.CustomerID,
        amount: item.Freight
      }))
    }
  }
])
```

### Add Computed Fields

```typescript
dm.applyPostRequestMiddlewares([
  async (context) => {
    if (context.response && context.response.result) {
      context.response.result.forEach(order => {
        // Add calculated field
        order.tax = order.Freight * 0.1
        order.total = order.Freight + order.tax
        // Format date
        order.OrderDateFormatted = new Date(order.OrderDate)
          .toLocaleDateString()
      })
    }
  }
])
```

---

## Authentication Patterns

### JWT Token Pattern

> 🔒 **Security Warning:** `localStorage` and `sessionStorage` store data **unencrypted** in the browser. **Never store sensitive data** (passwords, tokens, PII, payment info, user secrets, authentication credentials) in persisted TreeGrid state. State persistence is safe for **UI state only** (expand/collapse state, page number, sort order, column visibility, filter selections). For sensitive configuration or user data, use secure server-side session storage instead.

```typescript
const refreshTokenIfNeeded = async () => {
  const token = localStorage.getItem('token')
  const expiry = localStorage.getItem('token_expiry')

  if (expiry && new Date(expiry) < new Date()) {
    // Token expired, try refresh
    const refreshToken = localStorage.getItem('refresh_token')
    const response = await fetch('url', {
      method: 'POST',
      body: JSON.stringify({ refreshToken })
    })
    const data = await response.json()
    localStorage.setItem('token', data.token)
    localStorage.setItem('token_expiry', data.expiry)
  }
}

const dm = new DataManager({
  url: 'url',
  adaptor: new WebApiAdaptor()
})

dm.applyPreRequestMiddlewares([
  async (context) => {
    await refreshTokenIfNeeded()
    const token = localStorage.getItem('token')
    context.request.headers = context.request.headers || {}
    context.request.headers['Authorization'] = `send_token`
  }
])
```

### API Key Pattern

```typescript
const dm = new DataManager({
  url: 'url',
  adaptor: new WebApiAdaptor()
})

dm.applyPreRequestMiddlewares([
  async (context) => {
    context.request.headers = context.request.headers || {}
    context.request.headers['X-API-Key'] = process.env.VUE_APP_API_KEY
  }
])
```

---

## Request/Response Transformation

### Complete Transform Chain

```typescript
const dm = new DataManager({
  url: 'url',
  adaptor: new WebApiAdaptor()
})

// Pre-request: Add headers and info
dm.applyPreRequestMiddlewares([
  async (context) => {
    context.request.headers = context.request.headers || {}
    context.request.headers['Authorization'] = `send_token`
    context.request.headers['X-Request-ID'] = generateID()
  }
])

// Post-request: Transform response
dm.applyPostRequestMiddlewares([
  async (context) => {
    // Normalize response format
    if (context.response.data) {
      context.response.result = context.response.data.records
      context.response.count = context.response.data.total
    }

    // Normalize dates
    if (context.response.result) {
      context.response.result.forEach(item => {
        if (item.OrderDate) {
          item.OrderDate = new Date(item.OrderDate).toISOString()
        }
      })
    }
  }
])
```

### CamelCase to PascalCase Conversion

```typescript
const toPascalCase = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

dm.applyPostRequestMiddlewares([
  async (context) => {
    if (context.response && context.response.result) {
      context.response.result = context.response.result.map(item => {
        const normalized = {}
        for (const key in item) {
          normalized[toPascalCase(key)] = item[key]
        }
        return normalized
      })
    }
  }
])
```

---

## Error Handling with Retry

### Retry on Network Error

```typescript
const retryRequest = async (fn, maxRetries = 3) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn()
    } catch (error) {
      if (error.status === 0 && i < maxRetries - 1) {
        // Network error, retry after delay
        await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)))
        continue
      }
      throw error
    }
  }
}

const loadWithRetry = async () => {
  return retryRequest(() =>
    dm.executeQuery(new Query().take(10))
  )
}
```

### Handle 401 with Token Refresh

```typescript
dm.applyPostRequestMiddlewares([
  async (context) => {
    if (context.response && context.response.status === 401) {
      // Token expired
      const refreshed = await refreshAuthToken()
      if (refreshed) {
        // Retry original request with new token
        context.response.retry = true
      }
    }
  }
])
```

---

## Vue Component with Full Middleware

```typescript
<script setup>
import { DataManager, Query, WebApiAdaptor } from '@syncfusion/ej2-data'
import { ref, onMounted } from 'vue'

const items = ref([])
const loading = ref(false)
const error = ref('')

const dm = new DataManager({
  url: 'url',
  adaptor: new WebApiAdaptor()
})

// Pre-request: Add authentication headers
dm.applyPreRequestMiddlewares([
  async (context) => {
    context.request.headers = context.request.headers || {}
    
    // Add token
    const token = localStorage.getItem('authToken')
    context.request.headers['Authorization'] = `send_token`
    
    // Add request ID for tracking
    context.request.headers['X-Request-ID'] = 'req_' + Date.now()
    
    // Add API version
    context.request.headers['X-API-Version'] = 'v2'
  }
])

// Post-request: Transform response
dm.applyPostRequestMiddlewares([
  async (context) => {
    // Normalize different response formats
    if (context.response.data && !context.response.result) {
      context.response.result = context.response.data
      context.response.count = context.response.total
    }

    // Add metadata
    if (context.response.result) {
      context.response.result.forEach(item => {
        item._loaded = new Date()
      })
    }
  }
])

const loadOrders = async () => {
  loading.value = true
  error.value = ''

  try {
    const result = await dm.executeQuery(
      new Query()
        .where('Status', 'equal', 'active')
        .take(50)
    )
    items.value = result.result
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

const insertOrder = async (order) => {
  try {
    const result = await dm.insert('Orders', order)
    items.value.push(result)
    return { success: true }
  } catch (err) {
    error.value = err.message
    return { success: false, error: err.message }
  }
}

onMounted(loadOrders)
</script>

<template>
  <div>
    <p v-if="loading">Loading...</p>
    <p v-if="error" class="error">{{ error }}</p>
    <table v-else>
      <tr v-for="item in items" :key="item.OrderID">
        <td>{{ item.OrderID }}</td>
        <td>{{ item.CustomerID }}</td>
        <td>${{ item.Freight }}</td>
      </tr>
    </table>
  </div>
</template>
```

---

## Best Practices

1. **Middleware runs for every request** - Keep it performant
2. **Avoid blocking operations** - Use async/await sparingly
3. **Preserve context objects** - Don't delete, only modify
4. **Handle all response types** - Check for different formats
5. **Log errors** - For debugging

---
