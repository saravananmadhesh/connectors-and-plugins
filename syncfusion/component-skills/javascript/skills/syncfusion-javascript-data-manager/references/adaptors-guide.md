---
title: Complete Guide to All 10 DataManager Adaptors
---

# All 10 DataManager Adaptors

## Table of Contents
- [Quick Decision Guide](#quick-decision-guide)
- [1. JsonAdaptor](#1-jsonadaptor)
- [2. UrlAdaptor](#2-urladaptor)
- [3. WebApiAdaptor](#3-webapiada­ptor)
- [4. ODataAdaptor](#4-odataadaptor)
- [5. ODataV4Adaptor](#5-odatav4adaptor)
- [6. RemoteSaveAdaptor](#6-remotesaveadaptor)
- [7. WebMethodAdaptor](#7-webmethodadaptor)
- [8. GraphQLAdaptor](#8-graphqladaptor)
- [9. CustomDataAdaptor](#9-customdataadaptor)
- [10. CustomAdaptor](#10-customadaptor)
- [Comparison Matrix](#comparison-matrix)

---

## Quick Decision Guide

**Which adaptor do I use?**

```
Is data LOCAL (in-memory array)?
├─ YES → JsonAdaptor

Is data REMOTE (API endpoint)?
├─ Is it ASP.NET Web API?
│  ├─ YES → WebApiAdaptor (expects Items/Count)
│  └─ NO → Continue...
│
├─ Is it OData service?
│  ├─ OData v3? → ODataAdaptor
│  ├─ OData v4? → ODataV4Adaptor
│  └─ NO → Continue...
│
├─ Is it GraphQL endpoint?
│  ├─ YES → GraphQLAdaptor
│  └─ NO → Continue...
│
├─ Is it legacy ASMX web method?
│  ├─ YES → WebMethodAdaptor
│  └─ NO → Continue...
│
├─ Need client-side filtering + server CRUD?
│  ├─ YES → RemoteSaveAdaptor
│  └─ NO → Continue...
│
├─ Custom format/non-standard response?
│  ├─ FIRST CHOICE: CustomDataAdaptor ⭐ (MOST FLEXIBLE)
│  │      └─ Use ANY fetching tool (fetch, axios, Socket.IO, etc.)
│  │      └─ Return standard: { result, count }
│  ├─ Full control needed? → CustomAdaptor
│  └─ Standard REST format → UrlAdaptor
│
└─ Standard REST (result/count)?
   └─ UrlAdaptor
```

---

## 1. JsonAdaptor

**Use Case**: Local data in memory (arrays, objects)

**Response Format**:
```typescript
const data = [
  { id: 1, name: 'Item 1', value: 100 },
  { id: 2, name: 'Item 2', value: 200 }
];
```

**Setup**:
```typescript
const dataManager = new DataManager(data);
// or
const dataManager = new DataManager({ json: data });
```

**Example**:
```typescript
const employees = [
  { EmployeeID: 1, Name: 'Alice', Department: 'Sales', Salary: 50000 },
  { EmployeeID: 2, Name: 'Bob', Department: 'Engineering', Salary: 80000 },
  { EmployeeID: 3, Name: 'Charlie', Department: 'Sales', Salary: 55000 }
];

const dm = new DataManager(employees);

// Filter department & sort by salary
dm.executeLocal(
  new Query()
    .where('Department', 'equal', 'Sales')
    .sortByDescending('Salary')
).then(result => console.log(result.result));

// Output: [{ EmployeeID: 3, ... }, { EmployeeID: 1, ... }]
```

**Pros**: No network calls, instant filtering, great for small datasets
**Cons**: Loads everything into memory, not for large datasets
**Best For**: Dropdowns, cached data, offline scenarios

---

## 2. UrlAdaptor

**Use Case**: Generic REST APIs with standard form. **Important:** UrlAdaptor sends only **POST requests** with query parameters in the request body (never GET).

**Response Format**:
```json
{
  "result": [ { "id": 1, "name": "Item 1" }, ... ],
  "count": 100
}
```

**Server POST request body format**:
```
POST /api/items
Body: { skip: 0, take: 10, where: [...{field: Status, operator: equal, value: 'active'}], $sorted: [{field: Name, direction: Ascending"}] }
```

**Setup**:
```typescript
const dataManager = new DataManager({
  url: 'api.example.com/items',
  adaptor: new UrlAdaptor()
});
```

**Example**:
```typescript
const dm = new DataManager({
  url: 'api.example.com/orders',
  adaptor: new UrlAdaptor()
});

// Read
dm.executeQuery(
  new Query()
    .where('Status', 'equal', 'Pending')
    .take(10)
).then(result => console.log(result.result, result.count));

// Insert
await dm.insert({ CustomerID: 'ABC', Freight: 25 }, 'Orders');

// HTTP: POST /api/orders

// Update
await dm.update('OrderID', { OrderID: 123, Freight: 30 }, 'Orders');

// HTTP: PUT /api/orders(123)

// Delete
await dm.remove('OrderID', 123, 'Orders');

// HTTP: DELETE /api/orders(123)
```

**Query String Generated**:
```
Skip: 0, Take: 10 → $skip=0&$top=10
where('Status', 'equal', 'Pending') → $filter=Status eq 'Pending'
sortByDescending('DateCreated') → $orderby=DateCreated desc
```

**Pros**: Works with most REST APIs, standard conventions
**Cons**: Adaptor for specific backend format not available
**Best For**: Node.js/Express, generic REST services

---

## 3. WebApiAdaptor

**Use Case**: ASP.NET Web API specifically

**Response Format**:
```json
{
  "Items": [ { "id": 1, "name": "Item 1" }, ... ],
  "Count": 100
}
```

**Setup**:
```typescript
const dataManager = new DataManager({
  url: 'api.example.com/orders',
  adaptor: new WebApiAdaptor()
});
```

**Example**:
```typescript
const dm = new DataManager({
  url: 'aspnet.example.com/api/products',
  adaptor: new WebApiAdaptor()
});

// Query
dm.executeQuery(
  new Query()
    .where('Category', 'equal', 'Electronics')
    .where('Price', 'greaterThan', 100)
    .take(20)
).then(result => {
  console.log('Products:', result.result);  // Array from Items
  console.log('Total:', result.count);      // Value from Count
});

// C# Backend Expected
// public List<Product> GetProducts([FromUri]DataManagerRequest dm) {
//   var filtered = products.Where(p => p.Category == "Electronics" && p.Price > 100);
//   return new { Items = filtered, Count = filtered.Count() };
// }
```

**Key Differences from UrlAdaptor**:
- `Items` instead of `result`
- `Count` instead of `count` (capital letters)
- Query format: `$skip`, `$top`, `$filter`, `$orderby`

**Pros**: Direct match with ASP.NET Web API conventions
**Cons**: Only for .NET backends
**Best For**: ASP.NET Framework, ASP.NET Core with WebApiAdaptor

---

## 4. ODataAdaptor

**Use Case**: OData v3 services

**Response Format**:
```json
{
  "d": {
    "results": [ { "id": 1, "name": "Item 1" }, ... ],
    "__count": "100"
  }
}
```

**Setup**:
```typescript
const dataManager = new DataManager({
  url: 'services.odata.org/V3/OData/OData.svc/Products',
  adaptor: new ODataAdaptor()
});
```

**Example**:
```typescript
const dm = new DataManager({
  url: 'services.odata.org/V3/OData/OData.svc/Orders',
  adaptor: new ODataAdaptor()
});

dm.executeQuery(
  new Query()
    .where('Freight', 'greaterThan', 50)
    .select('OrderID', 'CustomerID', 'Freight')
    .take(10)
).then(result => console.log(result.result));

// Generated OData query:
// /Orders?$filter=Freight gt 50&$select=OrderID,CustomerID,Freight&$top=10&$inlinecount=allpages
```

**Key Features**:
- Wrapped response: `d.results`
- Count: `__count`
- Select specific fields
- Complex filters

**Pros**: Works with Microsoft OData services, SAP, Salesforce OData
**Cons**: OData v3 becoming legacy
**Best For**: Legacy OData v3 systems, SharePoint lists

---

## 5. ODataV4Adaptor

**Use Case**: OData v4 services (modern standard)

**Response Format**:
```json
{
  "value": [ { "id": 1, "name": "Item 1" }, ... ],
  "@odata.count": 100
}
```

**Setup**:
```typescript
const dataManager = new DataManager({
  url: 'services.odata.org/V4/OData/OData.svc/Products',
  adaptor: new ODataV4Adaptor()
});
```

**Example**:
```typescript
const dm = new DataManager({
  url: 'services.odata.org/V4/Northwind/Northwind.svc/Orders',
  adaptor: new ODataV4Adaptor()
});

// Query with expand (relations)
dm.executeQuery(
  new Query()
    .from('Orders')
    .select('OrderID', 'CustomerID', 'Freight')
    .expand('Customer')  // Include related customer data
    .where('Freight', 'greaterThan', 50)
    .take(10)
).then(result => {
  console.log(result.result[0].Customer.CompanyName);  // Nested data
});

// Generated OData v4 query:
// /Orders?$select=OrderID,CustomerID,Freight&$expand=Customer&$filter=Freight gt 50&$top=10&$count=true
```

**Key Differences from ODataAdaptor**:
- Response wrapped in `value` instead of `d.results`
- Count: `@odata.count` instead of `__count`
- `$expand` for relations (not `$select`)
- `$count=true` instead of `$inlinecount`

**Pros**: Modern OData standard, excellent for complex relationships
**Cons**: Not all services use OData v4 yet
**Best For**: Modern SAP systems, Microsoft Graph, current OData implementations

---

## 6. RemoteSaveAdaptor

**Use Case**: Hybrid - client-side filtering with server-side CRUD

**Scenario**: Load large dataset once, filter locally, save changes to server

**Setup**:
```typescript
const dataManager = new DataManager({
  url: 'api.example.com/orders',
  adaptor: new RemoteSaveAdaptor(),
  offline: true,

});
```

**Example**:
```typescript
const dm = new DataManager({
  url: 'api.example.com/products',
  adaptor: new RemoteSaveAdaptor(),
  offline: true,
,
  insertUrl: 'api.example.com/insert', // Executed Automaticaly
  updateUrl: 'api.example.com/update', // Executed Automaticaly
  removeUrl: 'api.example.com/delete', // Executed Automaticaly
});

// Step 1: Load all products (stored locally)
const result = await dm.executeQuery(new Query());
console.log(`Loaded ${result.result.length} products`);

// Step 2: Filter client-side (instant, no server call)
const filtered = await dm.executeLocal(
  new Query()
    .where('Category', 'equal', 'Electronics')
    .where('Price', 'lessThan', 1000)
);
console.log(`Filtered: ${filtered.result.length} products`);

// Step 3: Modify local data
const updatedProduct = { ProductID: 5, Price: 999 };

// Step 4: Save back to server
await dm.update('ProductID', updatedProduct, 'Products');
// HTTP: PUT /api/products/5
```

**Flow**:
```
1. Load → Download all (executeQuery)
2. Filter → Client-side (executeLocal)
3. Save → Server CRUD (insert/update/remove)
```

**Pros**: Fast filtering, network efficient, works offline
**Cons**: Memory usage for large datasets, local data goes stale
**Best For**: Mobile apps, offline-first architectures, read-heavy with sparse writes

---

## 7. WebMethodAdaptor

**Use Case**: Legacy ASP.NET ASMX web methods

**Setup**:
```typescript
const dataManager = new DataManager({
  url: 'example.com/OrderService.asmx/GetOrders',
  adaptor: new WebMethodAdaptor(),

});
```

**Example**:
```typescript
const dm = new DataManager({
  url: 'legacy.example.com/Services.asmx/GetProducts',
  adaptor: new WebMethodAdaptor()
});

dm.executeQuery(
  new Query()
    .where('Category', 'equal', 'Books')
    .take(10)
).then(result => console.log(result.result));

// C# Backend (ASMX):
// [WebMethod]
// public DataResult GetProducts(DataManagerRequest request) {
//   var allProducts = GetAllProducts();
//   var filtered = allProducts.Where(p => p.Category == "Books");
//   return new DataResult { result = filtered, count = filtered.Count() };
// }
```

**Pros**: Works with legacy ASMX services
**Cons**: ASMX is deprecated, security concerns with JSON over HTTP
**Best For**: Enterprise legacy migrations, maintenance mode systems

---

## 8. GraphQLAdaptor

**Use Case**: GraphQL API endpoints

**Setup**:
```typescript
const dataManager = new DataManager({
  url: 'api.example.com/graphql',
  adaptor: new GraphQLAdaptor(),

});
```

**Example**:
```typescript
const dm = new DataManager({
  url: 'graphql.example.com/graphql',
  adaptor: new GraphQLAdaptor()
});

dm.executeQuery(
  new Query()
    .from('GetOrders')  // GraphQL query name
    .select('id', 'customerName', 'amount')
    .where('status', 'equal', 'shipped')
    .take(10)
).then(result => console.log(result.result));

// Generated GraphQL:
// {
//   GetOrders(first: 10, where: { status: "shipped" }) {
//     id
//     customerName
//     amount
//   }
// }
```

**Response Format**:
```json
{
  "data": {
    "GetOrders": [
      { "id": 1, "customerName": "John", "amount": 150 },
      { "id": 2, "customerName": "Jane", "amount": 250 }
    ]
  }
}
```

**Pros**: Strongly-typed queries, no over-fetching, flexible
**Cons**: Requires GraphQL backend, learning curve
**Best For**: Modern APIs, microservices, Apollo/Hasura backends

---

## 9. CustomDataAdaptor

**Use Case**: Non-standard REST format, custom response structure

**Scenario**: API returns format different from standard REST

**Example Response** (non-standard):
```json
{
  "data": {
    "items": [ { "id": 1, "name": "Item 1" }, ... ],
    "total": 100,
    "page": 1
  },
  "success": true
}
```

**Setup**:
```typescript
class MyCustomAdaptor extends CustomDataAdaptor {
  getData(args, query) {
    if (args.action === 'read') {
      // Map DataManager params to custom format
      const pageNumber = Math.floor(args.skip / args.take) + 1;
      const params = {
        page: pageNumber,
        perPage: args.take,
        search: query?.params?.search || ''
      };

      return fetch('api.example.com/items', {
        method: 'POST'
      })
        .then(response => response.json())
        .then(data => {
          // Map custom response to standard format
          return new Promise((resolve) => {
            resolve({
              result: data.data.items,
              count: data.data.total
            });
          });
        });
    }
  }
}

const dataManager = new DataManager({
  adaptor: new MyCustomAdaptor(),

});
```

**Real-world Example**:
```typescript
class StripeDataAdaptor extends CustomDataAdaptor {
  getData(args) {
    const params = {
      limit: args.take,
      starting_after: args.skip > 0 ? getCursorAt(args.skip) : null
    };

    return fetch('api.stripe.com/v1/customers', {
    })
      .then(r => r.json())
      .then(stripe_response => ({
        result: stripe_response.data,
        count: stripe_response.total_count
      }));
  }
}
```

**When to Override**:
- API returns non-standard pagination (cursor-based, page-based)
- Response nested deeply
- Custom authentication headers
- Request/response transformation needed
- Third-party API (Stripe, GitHub, etc.)

---

## 10. CustomAdaptor

**Use Case**: Full control - completely override adaptor behavior

**Setup** (minimal override):
```typescript
class FullCustomAdaptor extends CustomAdaptor {
  // Override processQuery to customize URL building
  processQuery(dm: DataManager, query: Query, params?: any): DMRequest | null {
    const req = super.processQuery(dm, query, params);
    // Modify request
    console.log('Query:', req);
    return req;
  }

  // Override beforeSend to add headers
  beforeSend(dm: DataManager, request: XMLHttpRequest | Request, settings?: any): void {
    super.beforeSend(dm, request, settings);
    
    if (request instanceof XMLHttpRequest) {
      request.setRequestHeader('Authorization', 'Bearer token');
      request.setRequestHeader('X-API-Key', 'apikey');
    }
  }

  // Override processResponse to transform data
  processResponse(response: any, dm?: DataManager, query?: Query, xhr?: XMLHttpRequest, request?: Request, params?: any): any {
    const result = super.processResponse(response, dm, query, xhr, request, params);
    
    // Transform result
    if (result && result.result) {
      result.result = result.result.map((item: any) => ({
        ...item,
        processed: true
      }));
    }
    
    return result;
  }

  insert(dm: DataManager, value, tableName) {
    // Complete custom insert logic
    return fetch(`${dm.dataSource.url}/${tableName}`, {
      method: 'POST'
    }).then(r => r.json());
  }

  update(dm: DataManager, value, tableName, key, keyField) {
    // Complete custom update logic
    return fetch(`${dm.dataSource.url}/${tableName}/${key}`, {
      method: 'PUT',
      body: JSON.stringify(value)
    }).then(r => r.json());
  }

  remove(dm: DataManager, keyField, value, tableName) {
    // Complete custom delete logic
    return fetch(`${dm.dataSource.url}/${tableName}/${value}`, {
      method: 'DELETE'
    }).then(r => r.json());
  }
}

const dataManager = new DataManager({
  adaptor: new FullCustomAdaptor()
});
```

**Advanced Example** (complex scenarios):
```typescript
class CloudStorageAdaptor extends CustomAdaptor {
  // Use AWS S3, Azure Blob Storage, etc.
  
  async read(dm, query, tableName) {
    const data = await fetchFromS3(`${tableName}/data.json`);
    const filtered = this.applyQuery(data, query);
    return filtered;
  }

  async insert(dm, value, tableName) {
    const existing = await this.read(dm, null, tableName);
    existing.push(value);
    await saveToS3(`${tableName}/data.json`, existing);
    return value;
  }

  applyQuery(data, query) {
    // Manual query filtering
    if (query.where) {
      return data.filter(item =>
        this.evaluateExpression(item, query.where)
      );
    }
    return data;
  }

  evaluateExpression(item, condition) {
    // Implement predicates logic
    // where('Field', 'equal', 'value')
    // where('Field', 'greaterThan', 100)
    // etc...
  }
}
```

**When to Use**:
- Multiple simultaneous data sources
- Complex caching logic
- Audit/logging on every operation
- Database-specific optimization
- Offline-first synchronization

---

## Comparison Matrix

| Feature | JSON | Url | WebApi | OData | ODataV4 | RemoteSave | WebMethod | GraphQL | CustomData | Custom |
|---------|------|-----|--------|-------|---------|------------|-----------|---------|------------|--------|
| **Local Data** | ✓ | - | - | - | - | ✓ | - | - | - | - |
| **Remote API** | - | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **async/await** | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **Promises** | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **Query Support** | Full | Full | Full | Full | Full | ✓ Query | Limited | Full | Custom | Custom |
| **CRUD Support** | Limited | ✓ | ✓ | ✓ | ✓ | ✓ | Limited | ✓ | ✓ | ✓ |
| **Offline Mode** | Yes | - | - | - | - | Yes | - | - | - | - |
| **Filters** | All operators | All operators | All operators | All operators | All operators | Client-side | Basic | Dynamic | Custom | Custom |
| **Sorting** | Multiple fields | Multiple | Multiple | Multiple | Multiple | Client-side | Multiple | Dynamic | Custom | Custom |
| **Paging** | Client-side | Server | Server | Server | Server | Hybrid | Server | Server | Custom | Custom |
| **Expand Relations** | No | No | No | Yes | Yes | No | No | Yes | Custom | Custom |
| **Select Fields** | No | No | No | Yes | Yes | No | No | Yes | Custom | Custom |
| **Best For** | In-memory | Node/Express | ASP.NET | Legacy OData | Modern OData | Mobile/Offline | Legacy ASMX | Modern APIs | Custom APIs | Complex Logic |

---

## Common Patterns

### Pattern 1: Switching Adaptors Based on Environment

```typescript
let adaptor;
if (process.env.API_TYPE === 'aspnet') {
  adaptor = new WebApiAdaptor();
} else if (process.env.API_TYPE === 'odata') {
  adaptor = new ODataV4Adaptor();
} else if (process.env.API_TYPE === 'graphql') {
  adaptor = new GraphQLAdaptor();
} else {
  adaptor = new UrlAdaptor();
}

const dm = new DataManager({
  url: process.env.API_URL,
  adaptor: adaptor
});
```

### Pattern 2: Custom Adaptor with Caching

```typescript
class CachedAdaptor extends CustomDataAdaptor {
  private cache = new Map();

  getData(args, query) {
    const cacheKey = JSON.stringify(query);
    
    if (this.cache.has(cacheKey)) {
      return Promise.resolve(this.cache.get(cacheKey));
    }

    return fetch('/api/data')
      .then(r => r.json())
      .then(data => {
        this.cache.set(cacheKey, data);
        return data;
      });
  }

  invalidateCache() {
    this.cache.clear();
  }
}
```

### Pattern 3: Multi-source DataManager

```typescript
const dmPrimary = new DataManager({
  url: '/api/primary',
  adaptor: new UrlAdaptor()
});

const dmFallback = new DataManager({
  url: '/api/fallback',
  adaptor: new UrlAdaptor()
});

// Try primary, fallback if fails
const executeWithFallback = async (query) => {
  try {
    return await dmPrimary.executeQuery(query);
  } catch (error) {
    console.warn('Primary failed, using fallback');
    return await dmFallback.executeQuery(query);
  }
};
```

---

**Summary**: Choose adaptor based on your backend:
- **ASP.NET Web API** → WebApiAdaptor
- **Standard REST** → UrlAdaptor
- **OData** → ODataV4Adaptor (modern) or ODataAdaptor (legacy)
- **GraphQL** → GraphQLAdaptor
- **Local Data** → JsonAdaptor
- **Custom Format** → CustomDataAdaptor
- **Full Control** → CustomAdaptor
