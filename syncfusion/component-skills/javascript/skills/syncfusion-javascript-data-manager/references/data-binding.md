---
title: Data Binding with Syncfusion DataManager
---

# Data Binding

## Table of Contents
- [Local Data Binding](#local-data-binding)
- [Remote API Binding](#remote-api-binding)
- [Error Handling](#error-handling-by-http-status)
- [Promise vs Async/Await](#promise-vs-asyncawait)
- [Performance Tips](#performance-tips)

---

## Local Data Binding

### Scenario
You have data in memory (array) and want to bind it with DataManager.

### Basic Example

```typescript
import { DataManager, Query } from '@syncfusion/ej2-data';

const employees = [
  { EmployeeID: 1, Name: 'Alice', Department: 'Sales', Salary: 50000, JoinDate: '2020-01-15' },
  { EmployeeID: 2, Name: 'Bob', Department: 'Engineering', Salary: 80000, JoinDate: '2019-06-20' },
  { EmployeeID: 3, Name: 'Charlie', Department: 'Sales', Salary: 55000, JoinDate: '2021-03-10' },
  { EmployeeID: 4, Name: 'Diana', Department: 'HR', Salary: 45000, JoinDate: '2020-11-05' }
];

// Method 1: Pass array directly
const dm1 = new DataManager(employees);

// Method 2: Pass as json property
const dm2 = new DataManager({
  json: employees
});

// Both are equivalent
```

### Execute Local Query

```typescript
const dm = new DataManager(employees);

// Simple filter
dm.executeLocal(
  new Query().where('Department', 'equal', 'Sales')
).then(result => {
  console.log('Sales employees:', result.result);
  // Output: [Alice, Charlie]
});

// Complex filter with sorting & pagination
dm.executeLocal(
  new Query()
    .where('Department', 'equal', 'Sales')
    .where('Salary', 'greaterThan', 50000)
    .sortByDescending('Salary')
    .skip(0)
    .take(10)
).then(result => {
  console.log('Result:', result.result);
  console.log('Total count:', result.count);
  // count = total matching records before pagination
});
```

### Loading from Local File

```typescript
import fs from 'fs';
import path from 'path';

// Node.js - read JSON file
const data = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'employees.json'), 'utf-8')
);

const dm = new DataManager(data);

dm.executeLocal(new Query().take(10))
  .then(result => console.log(result.result));
```

### Performance with Large Local Data

```typescript
const largeDataset = Array.from({ length: 10000 }, (_, i) => ({
  id: i,
  name: `Item ${i}`,
  value: Math.random() * 1000
}));

const dm = new DataManager(largeDataset);

// ⚠️ WARNING: Filtering large dataset client-side is slow
// Better: Use server-side filtering or limit data size

// ✅ GOOD: Take only needed records
dm.executeLocal(
  new Query()
    .take(100)  // Limit first
    .where('value', 'greaterThan', 500)
).then(result => console.log(result.result));

// ✅ GOOD: Use offline mode with remote data
const dmRemote = new DataManager({
  url: '/api/items',
  offline: true  // Filter client-side after loading
});
```

---

## Remote API Binding

### Scenario
Bind data from a REST API endpoint with DataManager.

### Basic Remote Setup

```typescript
const dm = new DataManager({
  url: 'api.example.com/orders',
  adaptor: new UrlAdaptor()
  // For CRUD operations
});

// Execute query (sends HTTP request)
dm.executeQuery(
  new Query()
    .where('Status', 'equal', 'Pending')
    .take(10)
).then(result => {
  console.log('Orders:', result.result);
  console.log('Total:', result.count);
});

// HTTP Request sent:
// GET /orders?$skip=0&$top=10&$filter=Status eq 'Pending'
```

### Different Adaptors, Same Query

```typescript
// ASP.NET Web API
const dmWebApi = new DataManager({
  url: 'aspnet.example.com/api/products',
  adaptor: new WebApiAdaptor()
});

// Generic REST
const dmRest = new DataManager({
  url: 'rest.example.com/products',
  adaptor: new UrlAdaptor()
});

// OData v4
const dmOData = new DataManager({
  url: 'odata.example.com/data.svc/Products',
  adaptor: new ODataV4Adaptor()
});

// GraphQL
const dmGraphQL = new DataManager({
  url: 'graphql.example.com/graphql',
  adaptor: new GraphQLAdaptor()
});

// Same query works with all!
const query = new Query().where('Price', 'greaterThan', 100).take(10);

// Each sends appropriate HTTP request
dmWebApi.executeQuery(query);
dmRest.executeQuery(query);
dmOData.executeQuery(query);
dmGraphQL.executeQuery(query);
```

### Query String Generation

```typescript
const dm = new DataManager({
  url: '/api/orders',
  adaptor: new UrlAdaptor()
});

// Build query
const query = new Query()
  .where('Status', 'equal', 'Active')
  .where('Freight', 'greaterThan', 50)
  .sortByDescending('OrderDate')
  .skip(20)
  .take(10);

dm.executeQuery(query);

// Generated URL:
// GET /api/orders?$skip=20&$top=10&$filter=Status eq 'Active' and Freight gt 50&$orderby=OrderDate desc
```

### Dynamic Headers

```typescript
const dm = new DataManager({
  url: '/api/orders',
  adaptor: new UrlAdaptor()
});

// Static headers
dm.headers = [
  { 'Content-Type': 'application/json' },
  { 'Authorization': 'Bearer token123' }
];

// Or pass in config
new DataManager({
  url: '/api/orders',
  adaptor: new UrlAdaptor()
});

// Execute
dm.executeQuery(new Query()).then(result => {
  // Headers sent with request above
});
```

---

## Error Handling by HTTP Status

### Common HTTP Status Codes

| Code | Meaning | Solution |
|------|---------|----------|
| **0** | No response/Network error | Check URL, network connectivity, CORS |
| **400** | Bad Request | Invalid query parameters, wrong data format |
| **401** | Unauthorized | Missing/invalid authentication token |
| **403** | Forbidden | User lacks permission |
| **404** | Not Found | Wrong API endpoint, missing resource |
| **500** | Server Error | Unhandled exception in backend |
| **503** | Service Unavailable | Server overloaded or maintenance |

### Handle Errors with Promises

```typescript
const dm = new DataManager({
  url: '/api/orders',
  adaptor: new UrlAdaptor()
});

dm.executeQuery(new Query().take(10))
  .then(result => {
    console.log('Success:', result.result);
  })
  .catch(error => {
    console.error('Status:', error.status);
    console.error('Message:', error.statusText);
    
    // Handle specific errors
    if (error.status === 401) {
      console.log('Redirect to login');
      redirectToLogin();
    } else if (error.status === 404) {
      console.log('Resource not found');
      showNotFound();
    } else if (error.status === 500) {
      console.log('Server error - check backend logs');
      showServerError();
    } else if (error.status === 0) {
      console.log('Network error - check connectivity');
      showNetworkError();
    }
  });
```

### Handle Errors with Async/Await

```typescript
async function fetchOrders() {
  const dm = new DataManager({
    url: '/api/orders',
    adaptor: new UrlAdaptor()
  });

  try {
    const result = await dm.executeQuery(new Query().take(10));
    console.log('Orders:', result.result);
    console.log('Total:', result.count);
  } catch (error) {
    console.error(`Error [${error.status}]: ${error.statusText}`);
    
    switch (error.status) {
      case 0:
        console.error('Network error');
        break;
      case 400:
        console.error('Bad request - check query');
        break;
      case 401:
        console.error('Unauthorized - login required');
        break;
      case 404:
        console.error('Not found');
        break;
      case 500:
        console.error('Server error');
        break;
      default:
        console.error('Unknown error');
    }
  }
}
```

### Retry Logic

```typescript
async function fetchWithRetry(dm, query, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`Attempt ${attempt}/${maxRetries}`);
      return await dm.executeQuery(query);
    } catch (error) {
      console.error(`Attempt ${attempt} failed:`, error.statusText);
      
      // Don't retry on auth/permission errors
      if (error.status === 401 || error.status === 403) {
        throw error;
      }
      
      // Retry on network/server errors
      if (attempt < maxRetries && error.status >= 500 || error.status === 0) {
        // Exponential backoff: 1s, 2s, 4s
        const delay = Math.pow(2, attempt - 1) * 1000;
        console.log(`Waiting ${delay}ms before retry...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        throw error;
      }
    }
  }
}

// Usage
const dm = new DataManager({
  url: '/api/orders',
  adaptor: new UrlAdaptor()
});

fetchWithRetry(dm, new Query().take(10))
  .then(result => console.log('Success:', result.result))
  .catch(error => console.error('Final error:', error));
```

---

## Promise vs Async/Await

### Promise-based Approach

```typescript
const dm = new DataManager({
  url: '/api/orders',
  adaptor: new UrlAdaptor()
});

// Promise chain
dm.executeQuery(new Query().take(10))
  .then(result => {
    console.log('Orders:', result.result);
    return processorOrders(result.result);
  })
  .then(processed => {
    console.log('Processed:', processed);
    return displayUI(processed);
  })
  .catch(error => {
    console.error('Error:', error.statusText);
  });

// Parallel queries with Promise.all
const queries = [
  dm.executeQuery(new Query().where('Status', 'equal', 'Active')),
  dm.executeQuery(new Query().where('Status', 'equal', 'Pending')),
  dm.executeQuery(new Query().where('Status', 'equal', 'Completed'))
];

Promise.all(queries)
  .then(results => {
    console.log('Active:', results[0].count);
    console.log('Pending:', results[1].count);
    console.log('Completed:', results[2].count);
  })
  .catch(error => console.error('Error:', error));
```

### Async/Await Approach

```typescript
const dm = new DataManager({
  url: '/api/orders',
  adaptor: new UrlAdaptor()
});

// Async/await (cleaner)
async function getOrders() {
  try {
    const result = await dm.executeQuery(new Query().take(10));
    console.log('Orders:', result.result);
    
    const processed = await processOrders(result.result);
    console.log('Processed:', processed);
    
    await displayUI(processed);
  } catch (error) {
    console.error('Error:', error.statusText);
  }
}

getOrders();

// Parallel queries with async/await
async function getOrderStats() {
  try {
    const [active, pending, completed] = await Promise.all([
      dm.executeQuery(new Query().where('Status', 'equal', 'Active')),
      dm.executeQuery(new Query().where('Status', 'equal', 'Pending')),
      dm.executeQuery(new Query().where('Status', 'equal', 'Completed'))
    ]);
    
    console.log('Active:', active.count);
    console.log('Pending:', pending.count);
    console.log('Completed:', completed.count);
  } catch (error) {
    console.error('Error:', error);
  }
}

getOrderStats();
```

---

## Performance Tips

### 1. Use Server-side Filtering

```typescript
// ❌ BAD: Load everything, filter client-side (slow)
const dm = new DataManager({
  url: '/api/orders',
  offline: true  // Download all records
});

// ✅ GOOD: Filter on server
const dm = new DataManager({
  url: '/api/orders',
  adaptor: new UrlAdaptor()
});

dm.executeQuery(
  new Query()
    .where('Status', 'equal', 'Active')  // Server filters
    .take(20)
);
```

### 2. Use Pagination

```typescript
// ❌ BAD: Request all records
dm.executeQuery(new Query());

// ✅ GOOD: Paginate
let pageNumber = 1;

async function getPage(pageNum) {
  const pageSize = 20;
  return await dm.executeQuery(
    new Query()
      .skip((pageNum - 1) * pageSize)
      .take(pageSize)
  );
}

// First page
const page1 = await getPage(1);
console.log('Page 1:', page1.result);
console.log('Total records:', page1.count);

// Next page
const page2 = await getPage(2);
```

### 3. Select Only Needed Columns

```typescript
// ❌ BAD: All columns
dm.executeQuery(new Query().take(10));

// ✅ GOOD: Select specific columns (with OData)
dm.executeQuery(
  new Query()
    .select('OrderID', 'CustomerID', 'Freight')  // Only needed
    .take(10)
);
```

### 4. Enable Caching

```typescript
const dm = new DataManager({
  url: '/api/orders',
  adaptor: new UrlAdaptor(),
  enableCache: true  // Cache results
});

// First call hits server
dm.executeQuery(new Query());

// Subsequent identical query uses cache
dm.executeQuery(new Query());
```

### 5. Use Batch Operations

```typescript
// ❌ BAD: Multiple insert calls (3 HTTP requests)
await dm.insert('Orders', order1);
await dm.insert('Orders', order2);
await dm.insert('Orders', order3);

// ✅ GOOD: Batch insert (1 HTTP request)
await dm.insert('Orders', [order1, order2, order3]);
```

### 6. Lazy Load with Deferred

```typescript
// Execute query but don't wait for results immediately
dm.executeQuery(new Query().take(10))
  .then(result => console.log(result));

// Do other work while query runs
console.log('Query initiated, continuing...');

// Results available when ready
```

---
