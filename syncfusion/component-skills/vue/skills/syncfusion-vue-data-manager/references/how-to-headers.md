---
title: How to Set Custom Headers in Vue DataManager
---

# How to Set Custom Headers in Syncfusion Vue DataManager

## Static Headers

### Configuration

```typescript
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data'

const dm = new DataManager({
  url: 'url',
  adaptor: new WebApiAdaptor(),
  headers: [...]
})
```

---

## Dynamic Headers

### Per-Request Headers

```typescript
dm.applyPreRequestMiddlewares([
  async (context) => {
    context.request.headers = context.request.headers || {}
    
    // Add dynamic headers
    context.request.headers['X-Request-Time'] = new Date().toISOString()
    context.request.headers['X-Client-ID'] = getUserID()
    context.request.headers['X-Session-ID'] = getSessionID()
  }
])
```

---

## JWT Bearer Token

### Authentication Header

> 🔒 **Security Warning:** `localStorage` and `sessionStorage` store data **unencrypted** in the browser. **Never store sensitive data** (passwords, tokens, PII, payment info, user secrets, authentication credentials) in persisted TreeGrid state. State persistence is safe for **UI state only** (expand/collapse state, page number, sort order, column visibility, filter selections). For sensitive configuration or user data, use secure server-side session storage instead.

```typescript
const dm = new DataManager({
  url: 'url',
  adaptor: new WebApiAdaptor()
})

dm.applyPreRequestMiddlewares([
  async (context) => {
    const token = localStorage.getItem('authToken')
    context.request.headers = context.request.headers || {}
    context.request.headers['Authorization'] = `send_token`
  }
])
```

---

## Vue Component Example

> 🔒 **Security Warning:** `localStorage` and `sessionStorage` store data **unencrypted** in the browser. **Never store sensitive data** (passwords, tokens, PII, payment info, user secrets, authentication credentials) in persisted TreeGrid state. State persistence is safe for **UI state only** (expand/collapse state, page number, sort order, column visibility, filter selections). For sensitive configuration or user data, use secure server-side session storage instead.

```typescript
<script setup>
import { DataManager, Query, WebApiAdaptor } from '@syncfusion/ej2-data'
import { ref, onMounted } from 'vue'

const items = ref([])

const dm = new DataManager({
  url: 'url',
  adaptor: new WebApiAdaptor(),
  headers: [...]
})

// Add dynamic headers
dm.applyPreRequestMiddlewares([
  async (context) => {
    const token = localStorage.getItem('token')
    context.request.headers = context.request.headers || {}
    context.request.headers['Authorization'] = `send_token`
    context.request.headers['X-Request-ID'] = `req_${Date.now()}`
    context.request.headers['X-Client-Version'] = '1.0.0'
  }
])

const loadOrders = async () => {
  const result = await dm.executeQuery(new Query().take(10))
  items.value = result.result
}

onMounted(loadOrders)
</script>
```

---

## CORS with Custom Headers

```typescript
const dm = new DataManager({
  url: 'url',
  adaptor: new WebApiAdaptor(),
  crossDomain: true,  // Enable CORS
  headers: [...]
})
```

---

## Common Headers

```typescript
const dm = new DataManager({
  url: 'url',
  adaptor: new WebApiAdaptor(),
  headers: [...]
})
```
