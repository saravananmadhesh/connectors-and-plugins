---
title: Overview - Syncfusion DataManager for TypeScript/JavaScript
---

# DataManager Overview

## Table of Contents
- [What is DataManager](#what-is-datamanager)
- [Key Problems Solved](#key-problems-datamanager-solves)
- [Key Features](#key-features)
- [When to Use](#when-to-use-datamanager)
- [Core Concepts](#core-concepts)
- [Architecture](#datamanager-architecture)
- [Common Use Cases](#common-use-cases)
- [Best Practices](#best-practices)

---

## What is DataManager?

**Syncfusion DataManager** is a powerful data management component for TypeScript/JavaScript applications that acts as a universal bridge between your application and multiple data sources - whether local (arrays, JSON) or remote (REST APIs, OData, GraphQL).

Instead of writing custom code for each data source, DataManager provides a unified API that handles:
- Query building (filtering, sorting, paging)
- CRUD operations (Create, Read, Update, Delete)
- Multiple data protocols (REST, OData, GraphQL)
- Error handling and data transformation
- Caching and offline support

---

## Key Problems DataManager Solves

### Without DataManager
```typescript
// ❌ Manual approach - repetitive code
async function getOrders() {
  try {
    const response = await fetch('api.example.com/orders?skip=0&take=10&filter=...');
    const data = await response.json();
    // Transform response
    // Handle errors
    // Parse query parameters manually
  } catch (error) {
    // Error handling repeated everywhere
  }
}
```

### With DataManager
```typescript
// ✅ DataManager approach - clean, unified
const dataManager = new DataManager({
  url: 'api.example.com/orders',
  adaptor: new WebApiAdaptor()
});

dataManager.executeQuery(
  new Query()
    .where('Freight', 'greaterThan', 30)
    .take(10)
).then(result => console.log(result.result));
```

---

## Key Features

### 1. Unified Data Access

Works with **any data source**:

```
TypeScript/JavaScript Application
    ↓ DataManager
    ├─ Local Arrays (JsonAdaptor)
    ├─ REST APIs (UrlAdaptor, WebApiAdaptor)
    ├─ OData Services (ODataAdaptor, ODataV4Adaptor)
    ├─ GraphQL Endpoints (GraphQLAdaptor)
    ├─ Custom Formats (CustomDataAdaptor)
    └─ Proprietary Backends (CustomAdaptor)
```

### 2. Comprehensive Query Support

```typescript
// Single operation
.where('Status', 'equal', 'active')

// Complex filters
.where('Freight', 'greaterThan', 30)
  .where('OrderDate', 'greaterThan', new Date('2024-01-01'))
  .or('CustomerID', 'equal', 'VINET')

// Sorting, pagination, grouping, aggregation
.sortByDescending('OrderDate')
.take(20)
.skip(0)
.group('CustomerID')
.aggregate('sum', 'Freight')
```

### 3. 10 Different Adaptors

| Adaptor | Purpose | Use When |
|---------|---------|----------|
| JsonAdaptor | Local arrays | In-memory data |
| WebApiAdaptor | ASP.NET Web API | Items/Count format |
| UrlAdaptor | Generic REST | Standard REST APIs |
| RemoteSaveAdaptor | Hybrid approach | Client filters + server CRUD |
| ODataAdaptor | OData v3 | Legacy OData services |
| ODataV4Adaptor | OData v4 | Modern OData with relations |
| WebMethodAdaptor | ASMX web methods | Legacy ASP.NET |
| GraphQLAdaptor | GraphQL servers | GraphQL endpoints |
| CustomDataAdaptor | Custom format | Non-standard APIs |
| CustomAdaptor | Full control | Complete override |

### 4. CRUD Operations

```typescript
// Create
await dm.insert('Orders', newOrder);

// Read
await dm.executeQuery(new Query().take(10));

// Update
await dm.update('Orders', updatedOrder, 'OrderID', orderId);

// Delete
await dm.remove('Orders', orderId);
```

### 5. Advanced Features

- **Middleware**: Pre/post request hooks for authentication, headers, transformation
- **Caching**: Automatic with TTL (Time To Live)
- **Offline Mode**: Download once, filter client-side
- **State Persistence**: localStorage integration
- **Load-on-Demand**: Paginate large datasets efficiently
- **Error Handling**: HTTP status codes, retry logic

---

## When to Use DataManager

### ✅ Use DataManager When

1. **Binding data to UI components**
   - Grid, TreeGrid, Scheduler displays
   - Any data-driven component

2. **Working with remote APIs**
   - REST, OData, GraphQL endpoints
   - Different response formats

3. **Complex data operations needed**
   - Filtering, sorting, paging
   - Grouping, aggregation
   - Search across fields

4. **CRUD operations**
   - Insert, update, delete records
   - Batch operations

5. **Authentication/Security**
   - JWT tokens, API keys
   - Custom headers

### ❌ Don't Use DataManager When

- Trivial JSON parsing (use native fetch)
- Need to completely customize behavior (consider backend logic)

---

## Core Concepts

### 1. DataManager Configuration

```typescript
const config = {
  url: 'api.example.com/orders',      // Remote endpoint
  json: [], // Local array data
  adaptor: new WebApiAdaptor(),               // Protocol handler
  crossDomain: true,                          // CORS
  offline: true,                              // Client-side processing
  enableCache: true,                          // Enable caching
                         // Primary key for CRUD
};

const dataManager = new DataManager(config);
```

### 2. Query Execution

```typescript
// Local queries
dataManager.executeLocal(new Query().where('Status', 'equal', 'active'));

// Remote queries
dataManager.executeQuery(new Query().where('Status', 'equal', 'active'));

// Both return Promises
```

### 3. Adaptor Role

Adaptors translate between DataManager and data sources:

```
Query Object (from DataManager)
    ↓ Adaptor
HTTP Request (to backend)
    ↓ Backend
Response (JSON)
    ↓ Adaptor
Result Object (to application)
```

### 4. Response Format

Different adaptors expect different formats:

```typescript
// WebApiAdaptor expects:
{ Items: [...], Count: 100 }

// UrlAdaptor expects:
{ result: [...], count: 100 }

// OData expects:
{ value: [...], "@odata.count": 100 }
```

---

## DataManager Architecture

```
┌─────────────────────────────────────┐
│   TypeScript/JavaScript App         │
│   (Angular, React, Vue, Vanilla)    │
└──────────────┬──────────────────────┘
               │ Query()
               ↓
┌─────────────────────────────────────┐
│        DataManager                   │
│  - Build queries                     │
│  - Manage connections                │
│  - Handle CRUD                       │
└──────────────┬──────────────────────┘
               │ Request
               ↓
┌─────────────────────────────────────┐
│      Adaptor Layer                   │
│ - WebApiAdaptor (ASP.NET)           │
│ - UrlAdaptor (Generic REST)         │
│ - ODataAdaptor (OData v3/v4)        │
│ - CustomDataAdaptor (Custom)        │
│ - GraphQLAdaptor (GraphQL)          │
│ ... (10 total)                       │
└──────────────┬──────────────────────┘
               │ HTTP/Protocol
               ↓
┌─────────────────────────────────────┐
│     Data Source                      │
│  - REST API                          │
│  - OData Service                     │
│  - GraphQL Endpoint                  │
│  - Local Array                       │
│  - Database (via backend)            │
└─────────────────────────────────────┘
```

---

## Common Use Cases

### 1. Employee Directory
```typescript
// Load all employees, search/filter client-side
const dm = new DataManager({
  url: '/api/employees',
  adaptor: new UrlAdaptor(),
  offline: true  // Download once
});

dm.executeQuery(
  new Query()
    .where('Department', 'equal', 'Sales')
    .take(100)
).then(result => displayInGrid(result.result));
```

### 2. Real-time Order Management
```typescript
// Filter server-side for performance
const dm = new DataManager({
  url: '/api/orders',
  adaptor: new WebApiAdaptor(),
  enableCache: true  // Cache results
});

// Server processes filter, returns only matching records
dm.executeQuery(
  new Query()
    .where('Status', 'equal', 'Pending')
    .where('Priority', 'equal', 'High')
).then(result => showOrders(result.result));
```

### 3. Master-Detail Relationship
```typescript
// Expand related data
const dm = new DataManager({
  url: 'services.odata.org/V4/Northwind/Northwind.svc/',
  adaptor: new ODataV4Adaptor()
});

dm.executeQuery(
  new Query()
    .from('Orders')
    .expand('Customer')  // Include customer details
    .take(10)
).then(result => {
  // result.result has Customer nested in each Order
  console.log(result.result[0].Customer.CompanyName);
});
```

---

## Best Practices

1. **Choose right adaptor** - WebApiAdaptor for ASP.NET, UrlAdaptor for generic REST
2. **Use keyField** - Required for CRUD operations (insert, update, delete)
3. **Add error handling** - HTTP status codes: 401 (auth), 404 (not found), 500 (server error)
4. **Authentication** - Use middleware for JWT tokens
5. **Caching** - Enable for frequently accessed data
6. **Offline mode** - Use for large datasets that change infrequently
7. **Performance** - Use server-side filtering for large datasets

---
