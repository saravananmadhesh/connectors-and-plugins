---
title: Getting Started with Syncfusion DataManager
---

# Getting Started

## Table of Contents
- [Installation](#installation)
- [System Requirements](#system-requirements)
- [First Example: Local Array](#first-example-local-array)
- [Second Example: Remote REST API](#second-example-remote-rest-api)
- [Third Example: CRUD Operations](#third-example-crud-operations)
- [CSS & Styling](#css--styling)
- [Framework Integration](#framework-integration)
- [Quick Troubleshooting](#quick-troubleshooting)
- [Next Steps](#next-steps)

---

## Installation

### Step 1: Install via npm

```bash
npm install @syncfusion/ej2-data
```

### Step 2: Verify Installation

```bash
npm list @syncfusion/ej2-data
```

Expected output: `@syncfusion/ej2-data@<version>`

### Step 3: Import in Your Project

```typescript
// TypeScript
import { DataManager, Query, WebApiAdaptor } from '@syncfusion/ej2-data';

// or JavaScript (ES6)
import { DataManager, Query, WebApiAdaptor } from '@syncfusion/ej2-data';

// Node.js CommonJS
const { DataManager, Query, WebApiAdaptor } = require('@syncfusion/ej2-data');
```

---

## System Requirements

| Requirement | Version |
|-------------|---------|
| Node.js | 12.0 or higher |
| npm | 6.0 or higher |
| Browser (if client-side) | Chrome 90+, Firefox 88+, Safari 14+, Edge 90+ |
| TypeScript (if using TS) | 4.0 or higher |

---

## First Example: Local Array

### Scenario
You have employee data in a local array and want to filter/sort it.

### Code

```typescript
import { DataManager, Query } from '@syncfusion/ej2-data';

// Your data
const employees = [
  { EmployeeID: 1, Name: 'Alice', Department: 'Sales', Salary: 50000 },
  { EmployeeID: 2, Name: 'Bob', Department: 'Engineering', Salary: 80000 },
  { EmployeeID: 3, Name: 'Charlie', Department: 'Sales', Salary: 55000 },
  { EmployeeID: 4, Name: 'Diana', Department: 'HR', Salary: 45000 }
];

// Create DataManager with local data
const dataManager = new DataManager(employees);

// Execute query
dataManager.executeLocal(
  new Query()
    .where('Department', 'equal', 'Sales')
    .sortByDescending('Salary')
).then((result) => {
  console.log('Sales employees by salary:');
  console.log(result.result);
  // Output: [Charlie, Alice]
});
```

### Output
```typescript
[
  { EmployeeID: 3, Name: 'Charlie', Department: 'Sales', Salary: 55000 },
  { EmployeeID: 1, Name: 'Alice', Department: 'Sales', Salary: 50000 }
]
```

---

## Second Example: Remote REST API

### Scenario
You want to fetch orders from a REST API and filter by status.

### Setup

```typescript
const dataManager = new DataManager({
  url: 'api.example.com/orders',
  adaptor: new WebApiAdaptor()
});
```

### Execute Remote Query

```typescript
dataManager.executeQuery(
  new Query()
    .where('Status', 'equal', 'Pending')
    .sortByDescending('OrderDate')
    .take(20)
).then((result) => {
  console.log('Pending orders:');
  console.log(result.result);  // Array of orders
  console.log(result.count);   // Total matching records
}).catch((error) => {
  console.error('Error:', error.status, error.statusText);
});
```

### What Happens

1. **Query Building**: DataManager converts Query into HTTP params
   ```
   /orders?$skip=0&$top=20&$where=Status%20eq%20'Pending'&$orderby=OrderDate%20desc
   ```

2. **HTTP Request**: Sends to your backend
   ```
   GET /api/orders?$skip=0&$top=20&$where=Status%20eq%20'Pending'
   Authorization: Bearer YOUR_TOKEN
   ```

3. **Backend Processing**: Server filters and returns
   ```json
   { "Items": [...], "Count": 150 }
   ```

4. **Response Handling**: DataManager transforms to result object
   ```typescript
   { result: [...], count: 150 }
   ```

---

## Third Example: CRUD Operations

### Setup with Primary Key

```typescript
const dataManager = new DataManager({
  url: 'api.example.com/orders',
  adaptor: new WebApiAdaptor(),
  // ⚠️ Required for CRUD
});
```

### Create (Insert)

```typescript
const newOrder = {
  CustomerID: 'ABC123',
  OrderDate: new Date(),
  Freight: 25.50
};

await dataManager.insert('Orders', newOrder);
console.log('Order created successfully');

// Backend receives:
// POST /api/orders
// { CustomerID: 'ABC123', OrderDate: '...', Freight: 25.50 }
```

### Read (Query)

```typescript
const result = await dataManager.executeQuery(
  new Query()
    .where('OrderID', 'equal', 10248)
);
console.log('Order:', result.result[0]);
```

### Update

```typescript
const updatedOrder = {
  OrderID: 10248,
  Freight: 30.00
};

await dataManager.update('Orders', updatedOrder, 'OrderID', 10248);
console.log('Order updated');

// Backend receives:
// PUT /api/orders(10248)
// { OrderID: 10248, Freight: 30.00 }
```

### Delete

```typescript
await dataManager.remove('Orders', 10248);
console.log('Order deleted');

// Backend receives:
// DELETE /api/orders(10248)
```

---

## CSS & Styling

DataManager is **data-only** (no UI components), so no CSS needed.

If using with Syncfusion Grid/Table:

```typescript
// Grid handles styling
import '@syncfusion/ej2-grids/styles/material.css';
```

---

## Framework Integration

### TypeScript Node.js App

```typescript
import { DataManager, Query, UrlAdaptor } from '@syncfusion/ej2-data';

const fetchOrders = async () => {
  const dm = new DataManager({
    url: 'localhost:3000/api/orders',
    adaptor: new UrlAdaptor()
  });

  const result = await dm.executeQuery(
    new Query().take(10)
  );
  return result.result;
};

fetchOrders().then(orders => console.log(orders));
```

### Vanilla JavaScript (Browser)

```html
<script src="cdn.syncfusion.com/ej2/dist/ej2.min.js"></script>
<script>
  const dataManager = new ej2.data.DataManager({
    url: 'api.example.com/orders',
    adaptor: new ej2.data.UrlAdaptor()
  });

  dataManager.executeQuery(new ej2.data.Query().take(10))
    .then(result => console.log(result.result));
</script>
```

---

## Quick Troubleshooting

| Issue | Cause | Solution |
|-------|-------|----------|
| **CORS Error** | Browser blocks cross-domain | Enable CORS on backend or use proxy |
| **401 Unauthorized** | Missing auth token | Add Authorization header in httpClientModule or adaptor.headers |
| **404 Not Found** | Wrong endpoint URL | Verify API URL matches backend route |
| **Adaptor mismatch** | Response format doesn't match adaptor | Use WebApiAdaptor for Items/Count, UrlAdaptor for result/count |
| **No data returned** | Skip parameter wrong | Verify skip/take values and total record count |

---
