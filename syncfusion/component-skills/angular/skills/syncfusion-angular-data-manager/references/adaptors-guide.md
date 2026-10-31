---
title: 10 Adaptors Guide - Syncfusion Angular DataManager
---

# Complete Guide to 10 Syncfusion Angular DataManager Adaptors

## Table of Contents

- [Overview](#overview)
- [Adaptor Decision Tree](#adaptor-decision-tree)
- [1. JsonAdaptor](#1-jsonadaptor)
- [2. ODataAdaptor](#2-odataadaptor)
- [3. ODataV4Adaptor](#3-odatav4adaptor)
- [4. UrlAdaptor](#4-urladaptor)
- [5. WebApiAdaptor](#5-webapiadaptor)
- [6. WebMethodAdaptor](#6-webmethodadaptor)
- [7. RemoteSaveAdaptor](#7-remotesaveadaptor)
- [8. GraphQLAdaptor](#8-graphqladaptor)
- [9. CustomDataAdaptor](#9-customdataadaptor)
- [10. CustomAdaptor](#10-customadaptor)
- [Comparison Matrix](#comparison-matrix)

---

## Overview

An adaptor handles communication between DataManager and your data source. Each adaptor format requests and interprets responses differently based on the backend's protocol.

### When to Use an Adaptor

- **JsonAdaptor** → In-memory local data
- **ODataAdaptor** → OData v3 endpoints
- **ODataV4Adaptor** → OData v4 endpoints
- **UrlAdaptor** → Generic REST APIs
- **WebApiAdaptor** → ASP.NET Web API
- **WebMethodAdaptor** → ASP.NET web methods
- **RemoteSaveAdaptor** → Client-side queries + server CRUD
- **GraphQLAdaptor** → GraphQL servers
- **CustomDataAdaptor** → Custom request/response handling
- **CustomAdaptor** → Extend built-in adaptors

---

## Adaptor Decision Tree

```
Start: Which data source?
│
├─ Local JSON array in memory?
│  └─ Use: JsonAdaptor
│
└─ Remote API endpoint?
   │
   ├─ OData v3 standard protocol?
   │  └─ Use: ODataAdaptor
   │
   ├─ OData v4 standard protocol?
   │  └─ Use: ODataV4Adaptor
   │
   ├─ ASP.NET Web API?
   │  └─ Use: WebApiAdaptor (recommended for .NET backends)
   │
   ├─ ASP.NET Web Methods?
   │  └─ Use: WebMethodAdaptor
   │
   ├─ Generic RESTful API?
   │  ├─ Need client-side queries + server-side CRUD?
   │  │  └─ Use: RemoteSaveAdaptor
   │  │
   │  └─ Standard REST patterns?
   │     └─ Use: UrlAdaptor
   │
   ├─ GraphQL endpoint?
   │  └─ Use: GraphQLAdaptor
   │
   └─ Need custom logic? Custom request/response format?
      ├─ FIRST CHOICE: CustomDataAdaptor ⭐ (MOST FLEXIBLE)
      │      ├─ Use ANY fetching tool (fetch, axios, Socket.IO, etc.)
      │      └─ Return standard: { result, count }
      ├─ Full control needed? → CustomAdaptor
      └─ Standard REST format → UrlAdaptor
```

---

## 1. JsonAdaptor

### Purpose
Works with local JavaScript arrays. All operations happen in the browser (client-side).

### When to Use
- Data is already in memory
- Small to medium datasets
- Need instant filtering/sorting without server calls
- Working offline or without network

### Configuration

```typescript
import { DataManager, Query, JsonAdaptor } from '@syncfusion/ej2-data';

const data = [
  { OrderID: 10248, CustomerID: 'VINET', Freight: 32.38 },
  { OrderID: 10249, CustomerID: 'TOMSP', Freight: 11.61 },
  { OrderID: 10250, CustomerID: 'HANAR', Freight: 65.83 }
];

const dataManager = new DataManager({
  json: data,
  adaptor: new JsonAdaptor()
});
```

### Usage Example

```typescript
// Client-side filtering and sorting
const result = dataManager.executeLocal(
  new Query()
    .where('Freight', 'greaterThan', 30)
    .sortBy('CustomerID')
    .take(10)
);
```

### Advantages
✓ No network calls
✓ Works offline
✓ Instant operations
✓ Simpler complexity

### Limitations
✗ Limited to loaded data
✗ Memory constraints
✗ Can't leverage server processing

---

## 2. ODataAdaptor

### Purpose
Communicates with OData v3 service endpoints using the OData protocol.

### When to Use
- Working with OData v3 compliant services
- Need standardized REST protocol
- Server supports $filter, $select, $top, $skip parameters

### Configuration

```typescript
import { DataManager, Query, ODataAdaptor } from '@syncfusion/ej2-data';

const dataManager = new DataManager({
  url: 'url',
  adaptor: new ODataAdaptor()
});
```

### Usage Example

```typescript
dataManager.executeQuery(
  new Query()
    .select(['OrderID', 'CustomerID', 'Freight'])
    .where('Freight', 'greaterThan', 30)
    .sortBy('OrderID')
    .take(10)
)
  .then((result) => {
    console.log(result.result);
    console.log(result.count);
  });
```

### Server Request Format
```
GET url
  ?$select=OrderID,CustomerID,Freight
  &$filter=Freight gt 30
  &$orderby=OrderID
  &$top=10
```

---

## 3. ODataV4Adaptor

### Purpose
Supports OData v4 protocol endpoints (newer version of OData v3).

### When to Use
- OData v4 compliant services
- Need latest OData standards
- Server implements $expand, $group features

### Configuration

```typescript
import { DataManager, Query, ODataV4Adaptor } from '@syncfusion/ej2-data';

const dataManager = new DataManager({
  url: 'url',
  adaptor: new ODataV4Adaptor()
});
```

### Usage Example

```typescript
dataManager.executeQuery(
  new Query()
    .select(['OrderID', 'CustomerID', 'Freight'])
    .where('Freight', 'greaterThan', 30)
    .expand('Customer')  // Navigate to related data
    .take(20)
)
  .then((result) => {
    const orders = result.result;
    orders.forEach(order => {
      console.log(order.OrderID, order.Customer.CustomerID);
    });
  });
```

---

## 4. UrlAdaptor

### Purpose
Generic RESTful API adaptor for standard HTTP endpoints. **Important:** UrlAdaptor sends **only POST requests** with query parameters in the request body - never GET requests.

### When to Use
- Custom REST APIs (POST-based)
- Non-OData compliant endpoints
- Any HTTP service endpoint accepting POST queries
- GraphQL or custom query formats

### Configuration

```typescript
import { DataManager, Query, UrlAdaptor } from '@syncfusion/ej2-data';

const dataManager = new DataManager({
  url: 'url',
  adaptor: new UrlAdaptor()
});
```

### Usage Example

```typescript
dataManager.executeQuery(
  new Query()
    .select(['id', 'name', 'price'])
    .where('price', 'greaterThan', 50)
    .take(10)
)
  .then((result) => {
    this.orders = result.result;
  });
```

### Expected Server Response

```json
{
  "result": [
    { "OrderID": 10248, "CustomerID": "VINET", "Freight": 32.38 },
    { "OrderID": 10249, "CustomerID": "TOMSP", "Freight": 11.61 }
  ],
  "count": 830
}
```

---

## 5. WebApiAdaptor

### Purpose
Specifically designed for ASP.NET Web API endpoints (recommended for .NET backends).

### When to Use
- ASP.NET Web API backends
- Standard REST resource endpoints
- Best practice for .NET integration

### Configuration

```typescript
import { DataManager, Query, WebApiAdaptor } from '@syncfusion/ej2-data';

const dataManager = new DataManager({
  url: 'url',
  adaptor: new WebApiAdaptor(),
  crossDomain: true
});
```

### Usage Example

```typescript
dataManager.executeQuery(
  new Query()
    .select(['OrderID', 'CustomerID', 'Freight'])
    .where('Freight', 'greaterThan', 20)
    .sortBy('CustomerID')
    .take(25)
)
  .then((result) => {
    this.items = result.result;
    this.pageCount = result.count;
  })
  .catch((error) => {
    console.error('Error:', error);
  });
```

### Backend Example (C#)

```csharp
[ApiController]
[Route("api/[controller]")]
public class OrdersController : ControllerBase {
  
  [HttpGet]
  public IActionResult Get(int $skip = 0, int $take = 10, string $filter = "", string $select = "") {
    // Process OData-like parameters
    var data = DBContext.Orders;
    
    if (!string.IsNullOrEmpty($filter)) {
      // Parse and apply filter
    }
    
    var result = data.Skip($skip).Take($take).ToList();
    return Ok(new { Items, Count = data.Count() });
  }
  
  [HttpPost]
  public IActionResult Post([FromBody] Order order) {
    DBContext.Orders.Add(order);
    DBContext.SaveChanges();
    return Ok(order);
  }
  
  [HttpPut("{id}")]
  public IActionResult Put(int id, [FromBody] Order order) {
    var existing = DBContext.Orders.Find(id);
    if (existing == null) return NotFound();
    
    existing.CustomerID = order.CustomerID;
    existing.Freight = order.Freight;
    DBContext.SaveChanges();
    return Ok(existing);
  }
  
  [HttpDelete("{id}")]
  public IActionResult Delete(int id) {
    var order = DBContext.Orders.Find(id);
    if (order == null) return NotFound();
    
    DBContext.Orders.Remove(order);
    DBContext.SaveChanges();
    return Ok();
  }
}
```

### Expected Response Format

```json
{
  "Items": [
    { "OrderID": 10248, "CustomerID": "VINET", "Freight": 32.38 },
    { "OrderID": 10249, "CustomerID": "TOMSP", "Freight": 11.61 }
  ],
  "Count": 830
}
```

---

## 6. WebMethodAdaptor

### Purpose
Integrates with ASP.NET Web Methods (traditional server-side methods exposed via HTTP).

### When to Use
- Legacy ASP.NET applications
- Web Method-based services
- Traditional ASMX web services

### Configuration

```typescript
import { DataManager, Query, WebMethodAdaptor } from '@syncfusion/ej2-data';

const dataManager = new DataManager({
  url: 'urlervice.asmx/GetOrders',
  adaptor: new WebMethodAdaptor()
});
```

### Usage Example

```typescript
dataManager.executeQuery(new Query().take(10))
  .then((result) => {
    this.orders = result.result;
  });
```

---

## 7. RemoteSaveAdaptor

### Purpose
Unique adaptor for hybrid client/server processing: **Client-side queries (filtering, sorting, paging) + Server-side CRUD (insert, update, delete)**.

### When to Use
- Need to load all data once, filter locally
- Server-side CRUD for data persistence only
- Reduce CRUD operation server calls
- Large datasets with local filtering/sorting
- Dashboard-like applications

### Key Feature
Executes `executeQuery()` with client-side filtering/sorting, but sends CRUD operations (insert, update, delete) to server.

### Configuration

```typescript
import { DataManager, RemoteSaveAdaptor } from '@syncfusion/ej2-data';

this.http.get<Order[]>('url')
  .subscribe((value: Order[]) => {
    this.dataManager = new DataManager({
      json: value,                           // Load data locally
      adaptor: new RemoteSaveAdaptor(),      // Handle persistence on server
      url: 'url'  // CRUD endpoint,
      insertUrl: 'url/insert', // Executed Automaticaly
      updateUrl: 'url/update', // Executed Automaticaly
      removeUrl: 'url/delete', // Executed Automaticaly
    });
  });
```

### Usage Example

```typescript
// Filtering/sorting happens CLIENT-SIDE (executeQuery)
this.dataManager.executeQuery(
  new Query()
    .where('Freight', 'greaterThan', 30)
    .sortBy('CustomerID')
    .take(10)
)
  .then((result) => {
    this.filteredItems = result.result;  // Client-side filtered
  });

// CRUD operations go to SERVER
const newOrder = { CustomerID: 'NEW01', Freight: 25 };
this.dataManager.insert(newOrder, 'Orders')  // Calls server: POST /api/orders
  .then(() => console.log('Inserted'));

this.dataManager.update('OrderID', { OrderID: 10248, Freight: 50 }, 'Orders')
  .then(() => console.log('Updated'));  // Calls server: PUT /api/orders/10248

this.dataManager.remove('OrderID', 10249, 'Orders')
  .then(() => console.log('Deleted'));  // Calls server: DELETE /api/orders/10249
```

### Backend Response Format

```json
{
  "result": [
    { "OrderID": 10248, "CustomerID": "VINET", "Freight": 32.38 },
    { "OrderID": 10249, "CustomerID": "TOMSP", "Freight": 11.61 }
  ],
  "count": 830
}
```

### C# Backend Example

```csharp
[ApiController]
[Route("api/[controller]")]
public class OrdersController : ControllerBase {
  
  [HttpGet]
  public IActionResult Get() {
    var orders = DBContext.Orders.ToList();
    return Ok(new { result = orders, count = orders.Count() });
  }
  
  [HttpPost]
  public IActionResult Post([FromBody] Order order) {
    DBContext.Orders.Add(order);
    DBContext.SaveChanges();
    return Ok(order);
  }
  
  [HttpPut("{id}")]
  public IActionResult Put(int id, [FromBody] Order order) {
    var existing = DBContext.Orders.Find(id);
    if (existing != null) {
      existing.CustomerID = order.CustomerID;
      existing.Freight = order.Freight;
      DBContext.SaveChanges();
    }
    return Ok(existing);
  }
  
  [HttpDelete("{id}")]
  public IActionResult Delete(int id) {
    var order = DBContext.Orders.Find(id);
    if (order != null) {
      DBContext.Orders.Remove(order);
      DBContext.SaveChanges();
    }
    return Ok();
  }
}
```

### Advantages
✓ Load once, work offline locally
✓ Instant filtering/sorting
✓ Server persists changes
✓ Reduce CRUD network overhead

### Limitations
✗ Memory limited to loaded data
✗ Real-time data not reflected
✗ Manual reload needed for server updates

---

## 8. GraphQLAdaptor

### Purpose
Integrates with GraphQL servers using GraphQL query language.

### When to Use
- GraphQL endpoints
- Complex, nested data queries
- Need flexible, client-driven queries

### Configuration

```typescript
import { DataManager, Query, GraphQLAdaptor } from '@syncfusion/ej2-data';

const dataManager = new DataManager({
  url: 'url',
  adaptor: new GraphQLAdaptor()
});
```

### Usage Example

```typescript
dataManager.executeQuery(
  new Query()
    .select(['OrderID', 'CustomerID', 'Freight'])
    .sortBy('OrderID')
)
  .then((result) => {
    this.orders = result.result;
  });
```

---

## 9. CustomDataAdaptor

### Purpose
Complete control over request/response with custom fetch logic. Extends UrlAdaptor with ability to override `getData()` method.

### When to Use
- APIs with non-standard request/response formats
- Custom authentication mechanisms
- Non-standard query parameters
- Complex transformation logic
- Complete control over HTTP communication

### Key Feature
Override `getData()` method to implement custom fetch logic with complete control over request construction and response handling.

### Configuration

```typescript
import { DataManager, Query, CustomDataAdaptor } from '@syncfusion/ej2-data';

this.dataManager = new DataManager({
  adaptor: new CustomDataAdaptor({
    getData: (option: any) => {
      // Custom request construction
      const request = {
        skip: option.skip,
        take: option.take,
        filter: option.where,
        sort: option.sorted
      };

      fetch("url", {
        method: 'POST'
      })
        .then(response => response.json())
        .then(data => {
          // Custom response handling
          option.onSuccess({
            result: data.items,
            count: data.total
          });
        })
        .catch(error => {
          option.onFailure({}, error);
        });
    }
  })
});
```

### Complete Example

```typescript
this.dataManager = new DataManager({
  adaptor: new CustomDataAdaptor({
    getData: (option: any) => {
      // Build custom request payload
      const queryOptions = {
        page: Math.floor(option.skip / option.take) + 1,
        pageSize: option.take,
        search: option.search,
        filters: option.where,
        sortBy: option.sorted
      };

      fetch("url", {
        method: 'POST'
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('API Error');
          }
          return response.json();
        })
        .then(data => {
          // Transform response to expected format
          const result = {
            result: data.data,  // Extract items
            count: data.pagination.total  // Extract count
          };
          option.onSuccess(result, {});
        })
        .catch(error => {
          option.onFailure({}, error);
        });
    }
  })
});

// Use with queries
this.dataManager.executeQuery(
  new Query().take(10).skip(0)
)
  .then((result) => {
    this.items = result.result;
  });
```

### Expected Server Response

```json
{
  "result": [
    { "OrderID": 10248, "CustomerID": "VINET" }
  ],
  "count": 830
}
```

### Advantages
✓ Complete control over requests
✓ Flexible response handling
✓ Custom authentication
✓ Transform data as needed

### Limitations
✗ More complex setup
✗ Manual error handling
✗ Requires deeper API knowledge

---

## 10. CustomAdaptor

### Purpose
Extend built-in adaptors (like UrlAdaptor) and override specific methods for fine-grained customization.

### When to Use
- Need to modify behavior of existing adaptor
- Custom query translation
- Request/response interception
- Extend rather than completely replace adaptor

### Configuration with Method Overrides

```typescript
import { DataManager, Query, UrlAdaptor } from '@syncfusion/ej2-data';

class MyCustomAdaptor extends UrlAdaptor {
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
      request.setRequestHeader('Authorization', 'send_token');
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
      method: 'POST',
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
  url: 'url',
  adaptor: new MyCustomAdaptor()
});
```

### Available Methods to Override

- `processQuery()` — Transform Query to request
- `beforeSend()` — Modify headers, authentication
- `processResponse()` — Transform server response
- `insert()`, `update()`, `remove()` — Custom CRUD

---

## Comparison Matrix

| Feature | Json | OData | ODataV4 | Url | WebApi | WebMethod | RemoteSave | GraphQL | CustomData | Custom |
|---------|------|-------|---------|-----|--------|-----------|------------|---------|-----------|--------|
| **Local Data** | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ | ✗ | ✗ | ✗ |
| **Remote API** | ✗ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **Server Filtering** | ✗ | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ | ✓ | ✓ | ✓ |
| **Offline Mode** | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ | ✗ | ✗ | ✗ |
| **GraphQL Support** | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ | ✓* | ✓* |
| **Custom Headers** | ✗ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **Ease of Use** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ | ⭐⭐ |
| **Customization** | None | Low | Low | Medium | Medium | Medium | Low | Low | High | High |

---

## Performance Recommendations

| Scenario | Recommended Adaptor | Reason |
|----------|-------------------|--------|
| Small local dataset | JsonAdaptor | Fastest, no network |
| Large remote dataset | WebApiAdaptor | Server-side processing |
| Real-time dashboard | RemoteSaveAdaptor | Load once, filter locally |
| Non-standard API | CustomDataAdaptor | Complete flexibility |
| .NET Backend | WebApiAdaptor | Best practice integration |
| OData Service | ODataV4Adaptor | Use latest OData version |

---
