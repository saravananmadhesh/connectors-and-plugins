---
title: Complete Guide to 10 Syncfusion Vue DataManager Adaptors
---

# Complete Guide to 10 Syncfusion Vue DataManager Adaptors

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

An adaptor in DataManager acts as a bridge between your Vue component and the data source. It standardizes communication, formatting requests, and parsing responses based on the backend protocol.

---

## Adaptor Decision Tree

```
Choose Your Data Source:
├─ Local array in memory?
│  └─ JsonAdaptor
├─ OData v3 endpoint?
│  └─ ODataAdaptor
├─ OData v4 endpoint?
│  └─ ODataV4Adaptor
├─ Generic REST API?
│  ├─ Simple REST → UrlAdaptor
│  ├─ ASP.NET Web API → WebApiAdaptor
│  ├─ Client queries + server CRUD → RemoteSaveAdaptor
│  └─ Custom format → CustomDataAdaptor
├─ ASP.NET web methods?
│  └─ WebMethodAdaptor
├─ GraphQL endpoint?
│  └─ GraphQLAdaptor
└─ Need custom logic? Custom format/non-standard response?
   ├─ FIRST CHOICE: CustomDataAdaptor ⭐ (MOST FLEXIBLE)
   │      └─ Use ANY fetching tool (fetch, axios, Socket.IO, etc.)
   │      └─ Return standard: { result, count }
   ├─ Full control needed? → CustomAdaptor
   └─ Standard REST format → UrlAdaptor
```

---

## 1. JsonAdaptor

### Purpose
Work with local JavaScript arrays in memory.

### Configuration

```typescript
import { DataManager, JsonAdaptor } from '@syncfusion/ej2-data'

const data = [
  { OrderID: 10248, CustomerID: 'VINET', Freight: 32.38 },
  { OrderID: 10249, CustomerID: 'TOMSP', Freight: 11.61 }
]

const dm = new DataManager({
  json: data,
  adaptor: new JsonAdaptor()
})
```

### Usage Example

```typescript
import { Query } from '@syncfusion/ej2-data'

dm.executeLocal(new Query().where('Freight', 'greaterThan', 30))
  .then((result) => {
    console.log(result) // Local filtering result
  })
```

### When to Use
- Small to medium datasets (< 10,000 records)
- No server needed
- All operations instant
- Offline capability required

---

## 2. ODataAdaptor

### Purpose
Connect to OData v3 services (legacy standard).

### Configuration

```typescript
import { DataManager, ODataAdaptor } from '@syncfusion/ej2-data'

const dm = new DataManager({
  url: 'url',
  adaptor: new ODataAdaptor()
})
```

### Usage Example

```typescript
dm.executeQuery(
  new Query()
    .from('Orders')
    .select(['OrderID', 'CustomerID', 'Freight'])
    .where('Freight', 'greaterThan', 30)
    .take(10)
)
  .then((result) => {
    console.log('OData v3 result:', result.result)
  })
```

### Expected Response Format
```json
{
  "d": {
    "results": [
      { "OrderID": 10248, "CustomerID": "VINET", "Freight": 32.38 }
    ],
    "__count": "830"
  }
}
```

---

## 3. ODataV4Adaptor

### Purpose
Connect to OData v4 endpoints (modern standard).

### Configuration

```typescript
const dm = new DataManager({
  url: 'url',
  adaptor: new ODataV4Adaptor()
})
```

### Usage Example

```typescript
dm.executeQuery(
  new Query()
    .from('Orders')
    .select(['OrderID', 'CustomerID'])
    .expand('Customer')  // Navigate related data
    .filter('Freight', 'greaterThan', 30)
    .orderBy('OrderID')
    .take(20)
)
  .then((result) => {
    result.result.forEach(order => {
      console.log(order.OrderID, order.Customer.CompanyName)
    })
  })
```

### When to Use
- Modern OData v4 servers
- Need data relationships (expand)
- Want advanced filtering

---

## 4. UrlAdaptor

### Purpose
Generic RESTful API adaptor for standard HTTP endpoints. **Important:** UrlAdaptor sends **only POST requests** with query parameters in the request body - never GET requests.

### Configuration

```typescript
const dm = new DataManager({
  url: 'url',
  adaptor: new UrlAdaptor()
})
```

### Expected Request/Response

**Request:** `POST /orders` with body: `{ skip: 0, take: 10 }`

**Response:**
```json
{
  "result": [
    { "OrderID": 10248, "CustomerID": "VINET", "Freight": 32.38 }
  ],
  "count": 830
}
```

### Usage Example

```typescript
dm.executeQuery(new Query().take(10).skip(0))
  .then((result) => {
    console.log('Total:', result.count)
    console.log('Items:', result.result)
  })
```

---

## 5. WebApiAdaptor

### Purpose
Specifically for ASP.NET Web API (responds with Items/Count).

### Configuration

```typescript
const dm = new DataManager({
  url: 'url',
  adaptor: new WebApiAdaptor()
})
```

### Expected Response Format

**IMPORTANT:** WebApiAdaptor expects `Items` (capital I) and `Count`:

```json
{
  "Items": [
    { "OrderID": 10248, "CustomerID": "VINET", "Freight": 32.38 }
  ],
  "Count": 830
}
```

### Backend Example (C#)

```csharp
[ApiController]
[Route("api/[controller]")]
public class OrdersController : ControllerBase {
  
  [HttpGet]
  public IActionResult Get(int $skip = 0, int $take = 10) {
    var allOrders = GetOrders(); // Get from DB
    var total = allOrders.Count;
    var data = allOrders.Skip($skip).Take($take).ToList();
    
    return Ok(new { Items = data, Count = total });
  }
}
```

### Usage with Vue 3

```typescript
import { ref, onMounted } from 'vue'
import { DataManager, Query, WebApiAdaptor } from '@syncfusion/ej2-data'

export default {
  setup() {
    const items = ref([])

    onMounted(async () => {
      const dm = new DataManager({
        url: 'url',
        adaptor: new WebApiAdaptor()
      })

      const result = await dm.executeQuery(new Query().take(10))
      items.value = result.result
    })

    return { items }
  }
}
```

---

## 6. WebMethodAdaptor

### Purpose
Connect to ASP.NET web methods (legacy approach).

### Configuration

```typescript
const dm = new DataManager({
  url: '/Services/OrderService.asmx/GetOrders',
  adaptor: new WebMethodAdaptor()
})
```

### Backend Example

```csharp
[WebMethod]
public List<Order> GetOrders(int pageSize = 10, int skipSize = 0) {
  return orders.Skip(skipSize).Take(pageSize).ToList();
}
```

---

## 7. RemoteSaveAdaptor

### Purpose
Hybrid: client-side queries + server-side CRUD (insert/update/delete).

### Use Case
- Load ALL data once
- Filter/sort client-side (no server round-trip)
- Save changes to server (CRUD → server)

### Configuration

```typescript
const dm = new DataManager({
  url: 'url',
  adaptor: new RemoteSaveAdaptor(),
  offline: true  // Load all data once
})
```

### Usage Pattern

```typescript
import { ref, onMounted } from 'vue'
import { DataManager, Query, RemoteSaveAdaptor } from '@syncfusion/ej2-data'

export default {
  setup() {
    const items = ref([])
    
    const dm = new DataManager({
      url: 'url',
      adaptor: new RemoteSaveAdaptor(),
      offline: true
    })

    onMounted(async () => {
      // Load all data ONCE
      const result = await dm.ready
      items.value = result
    })

    // Client-side filtering (NO server call)
    const filterData = (searchText) => {
      const filteredItems = dm.executeLocal(
        new Query().where('CustomerID', 'contains', searchText)
      )
      items.value = filteredItems
    }

    // Server CRUD operations
    const insertOrder = async (order) => {
      await dm.insert(order, 'Orders')  // POST /api/orders
      await dm.ready  // Refresh
    }

    const updateOrder = async (order) => {
      await dm.update('OrderID', order, 'Orders')  // PUT
    }

    const deleteOrder = async (orderId) => {
      await dm.remove('OrderID', orderId, 'Orders')  // DELETE
    }

    return { items, filterData, insertOrder, updateOrder, deleteOrder }
  }
}
```

### Backend (C#)

```csharp
[ApiController]
[Route("api/[controller]")]
public class OrdersController {
  
  [HttpGet]
  public IActionResult Get() {
    return Ok(new { Items = allOrders, Count = allOrders.Count });
  }

  [HttpPost]
  public IActionResult Post([FromBody] Order order) {
    allOrders.Add(order);
    return Ok(order);
  }

  [HttpPut("{id}")]
  public IActionResult Put(int id, [FromBody] Order order) {
    var existing = allOrders.FirstOrDefault(o => o.OrderID == id);
    if (existing != null) {
      existing.CustomerID = order.CustomerID;
      existing.Freight = order.Freight;
    }
    return Ok(existing);
  }

  [HttpDelete("{id}")]
  public IActionResult Delete(int id) {
    allOrders.RemoveAll(o => o.OrderID == id);
    return Ok();
  }
}
```

---

## 8. GraphQLAdaptor

### Purpose
Connect to GraphQL endpoints.

### Configuration

```typescript
const dm = new DataManager({
  url: 'url',
  adaptor: new GraphQLAdaptor()
})
```

### Usage Example

```typescript
dm.executeQuery(
  new Query()
    .select(['id', 'name', 'email'])
    .where('status', 'equal', 'active')
)
  .then((result) => {
    console.log(result.result)
  })
```

---

## 9. CustomDataAdaptor

### Purpose
Complete control over request/response format.

### Configuration

```typescript
import { DataManager, CustomDataAdaptor, Query } from '@syncfusion/ej2-data'

class MyCustomAdaptor extends CustomDataAdaptor {
  getData(args, query) {
    if (args.action === 'read') {
      // Custom GET request
      const params = {
        page: Math.ceil(args.skip / args.take) + 1,
        pageSize: args.take,
        filter: query.params
      }

      return fetch(`url`, {
        method: 'POST',
        ...
      })
        .then(response => response.json())
        .then(data => new Promise((resolve) => {
          resolve(data.result)
        }))
    }
  }
}

const dm = new DataManager({
  adaptor: new MyCustomAdaptor()
})
```

### Vue Example

```typescript
const dm = new DataManager({
  adaptor: new CustomDataAdaptor(),
  // Custom transformation
  processResponse(response) {
    return {
      result: response.data.orders,
      count: response.data.total
    }
  }
})
```

---

## 10. CustomAdaptor

### Purpose
Extend built-in adaptors with custom logic.

### Example: WebApi + Custom LoggingExample: WebApi + Custom Logging

```typescript
class LoggingWebApiAdaptor extends WebApiAdaptor {
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
      ...
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

const dm = new DataManager({
  url: 'url',
  adaptor: new LoggingWebApiAdaptor()
})
```

---

## Comparison Matrix

| Feature | Json | OData v3 | OData v4 | Url | WebApi | WebMethod | RemoteSave | GraphQL | CustomData | Custom |
|---------|------|---------|---------|-----|--------|-----------|------------|---------|------------|--------|
| Local Data | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ |
| Remote Data | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Filtering | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Sorting | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Pagination | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| CRUD | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ | ✅ |
| Relationships | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ✅ |
| Caching | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Middleware | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Offline Mode | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ | ✅ |
| Browser Support | All | All | All | All | All | All | All | All | All | All |

---

## Key Properties Across Adaptors

```typescript
const config = {
  url: string,                              // Data endpoint
  json: any[],                              // Local array
  adaptor: Adaptor,                         // Adaptor instance
  headers: { [key: string]: string }[],    // HTTP headers
  crossDomain: boolean,                     // CORS
  offline: boolean,                         // Offline mode
  enableCache: boolean,                     // Caching
  pageSize: number,                         // Default page size
}
```

**Note:** `keyField` is NOT a DataManager configuration property. It's passed as the first parameter to CRUD methods: `dm.update('OrderID', data, 'tableName')`

---
