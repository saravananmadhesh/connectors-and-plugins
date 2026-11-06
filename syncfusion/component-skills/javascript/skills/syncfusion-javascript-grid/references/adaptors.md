---
name: adaptors
description: 'Data adaptors in Syncfusion Grid: URL/REST, ODataV4, WebAPI, WebMethod, RemoteSave, custom, and GraphQL integration for various backend services.'
---

# Data Adaptors

## Table of Contents
- [Overview](#overview)
- [URL Adaptor](#url-adaptor)
- [OData Adaptor](#odata-adaptor)
- [WebAPI Adaptor](#webapi-adaptor)
- [WebMethod Adaptor](#webmethod-adaptor)
- [RemoteSave Adaptor](#remotesave-adaptor)
- [Custom Adaptor](#custom-adaptor)
- [GraphQL Adaptor](#graphql-adaptor)
- [Adaptor Selection Guide](#adaptor-selection-guide)

## When to Use This Reference

- Connect to REST APIs using URL adaptor
- Integrate with OData services (SharePoint, Azure)
- Configure grid for ASP.NET WebAPI services
- Support legacy ASMX Web Services with WebMethod adaptor
- Implement CQRS patterns with RemoteSave adaptor
- Build custom adaptors for proprietary APIs
- Query GraphQL endpoints

---

## Overview

The Syncfusion Grid supports multiple data adaptors to connect with various backend services. Each adaptor handles a specific API pattern or communication protocol.

### Supported Adaptors
| Adaptor | Backend Type | Use Case |
|---------|-------------|----------|
| URL | RESTful HTTP APIs | Generic REST endpoints |
| OData | ODataV4 Services | SharePoint, Azure, standard OData |
| WebAPI | ASP.NET WebAPI | Modern ASP.NET REST services |
| WebMethod | ASMX Services | Legacy ASP.NET Framework |
| RemoteSave | Separate Read/Write | CQRS, microservices |
| Custom | Any Backend | Proprietary APIs, special handling |
| GraphQL | GraphQL Endpoints | Modern graph query APIs |

---

## URL Adaptor

### Basic URL Adaptor Setup

```ts
import { Grid, DataManager, UrlAdaptor, Page, Sort, Filter } from '@syncfusion/ej2-grids';

Grid.Inject(Page, Sort, Filter);

const grid = new Grid({
  dataSource: new DataManager({
    url: 'url',
    adaptor: new UrlAdaptor()
  }),
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerName', headerText: 'Customer', width: 150 },
    { field: 'OrderDate', headerText: 'Order Date', width: 130 },
    { field: 'Freight', headerText: 'Freight', width: 120 }
  ],
  allowPaging: true,
  pageSettings: { pageSize: 12 },
  allowSorting: true,
  allowFiltering: true
});

grid.appendTo('#grid');
```

### URL Query Parameters

The URL adaptor automatically generates OData-style query parameters:

```
GET /orders?$skip=0&$top=12&$orderby=OrderDate desc&$filter=CustomerName eq 'VINET'
```

### URL CRUD Operations

```ts
const grid = new Grid({
  dataSource: new DataManager({
    url: 'url',
    adaptor: new UrlAdaptor(),
    insertUrl: 'url',
    updateUrl: 'url',
    removeUrl: 'url'
  }),
  editSettings: {
    mode: 'Dialog',
    allowEditing: true,
    allowAdding: true,
    allowDeleting: true
  },
  toolbar: ['Add', 'Edit', 'Delete', 'Update', 'Cancel'],
  columns: [...]
});

grid.appendTo('#grid');
```

### URL with Custom Headers

```ts
class AuthenticatedUrlAdaptor extends UrlAdaptor {
  send(request: any) {
    request.headers = request.headers || {};
    request.headers['Authorization'] = `send_token`;
    request.headers['X-API-Key'] = getApiKey();
    return super.send(request);
  }
}

const grid = new Grid({
  dataSource: new DataManager({
    url: 'url',
    adaptor: new AuthenticatedUrlAdaptor()
  }),
  columns: [...]
});
```

### URL Error Handling

```ts
const grid = new Grid({
  dataSource: new DataManager({
    url: 'url',
    adaptor: new UrlAdaptor(),
    timeOut: 30000
  }),
  actionFailure: (args: FailureEventArgs) => {
    if (args.error?.statusCode === 401) {
      window.location.href = '/login';
    } else {
      alert('Failed to load data: ' + args.error?.message);
    }
  },
  columns: [...]
});
```

---

## OData Adaptor

### Basic OData Setup

```ts
import { Grid, DataManager, ODataAdaptor, Page, Sort, Filter } from '@syncfusion/ej2-grids';

const grid = new Grid({
  dataSource: new DataManager({
    url: 'ur;',
    adaptor: new ODataAdaptor('ODataV4')
  }),
  columns: [
    { field: 'CustomerID', headerText: 'Customer ID', width: 100 },
    { field: 'ContactName', headerText: 'Contact Name', width: 150 },
    { field: 'CompanyName', headerText: 'Company', width: 150 },
    { field: 'Country', headerText: 'Country', width: 100 }
  ],
  allowPaging: true,
  pageSettings: { pageSize: 10 },
  allowSorting: true,
  allowFiltering: true
});

grid.appendTo('#grid');
```

### OData Query Syntax

The OData adaptor builds V4 compliant queries:

```
/odata/Orders?$filter=Status eq 'Active' and Freight gt 50&$orderby=OrderDate desc&$select=OrderID,CustomerName,OrderDate&$skip=0&$top=10
```

**Common Operators:**
- String: `eq`, `ne`, `startswith`, `endswith`, `contains`
- Numeric: `gt`, `ge`, `lt`, `le`, `eq`, `ne`
- Logical: `and`, `or`, `not`
- Date: `year()`, `month()`, `day()`, `hour()`

### OData Complex Filtering

```ts
// Date range
const query = "OrderDate ge datetime'2024-01-01' and OrderDate le datetime'2024-12-31'";

// Multiple conditions
const query = "(CustomerName eq 'VINET' or CustomerName eq 'TOMSP') and Freight gt 20";

// String functions
const query = "tolower(ContactName) eq 'john doe'";

// Null checking
const query = "ShippedDate eq null";
```

### OData Navigation Properties

```ts
const grid = new Grid({
  dataSource: new DataManager({
    url: 'url',
    adaptor: new ODataAdaptor('ODataV4'),
    expand: 'Customer'  // Include related Customer data
  }),
  columns: [
    { field: 'OrderID', headerText: 'Order ID' },
    { field: 'Customer/CompanyName', headerText: 'Company' }
  ]
});

grid.appendTo('#grid');
```

---

## WebAPI Adaptor

### WebAPI Integration

```ts
import { Grid, DataManager, WebApiAdaptor, Edit, Toolbar } from '@syncfusion/ej2-grids';

Grid.Inject(Edit, Toolbar);

const grid = new Grid({
  dataSource: new DataManager({
    url: 'url',
    insertUrl: 'url/insert',
    updateUrl: 'url/update',
    removeUrl: 'url/delete',
  }),
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100, isPrimaryKey: true },
    { field: 'CustomerName', headerText: 'Customer', width: 150 },
    { field: 'Freight', headerText: 'Freight', width: 100, type: 'number' }
  ],
  editSettings: {
    mode: 'Dialog',
    allowEditing: true,
    allowAdding: true,
    allowDeleting: true
  },
  toolbar: ['Add', 'Edit', 'Delete', 'Update', 'Cancel']
});

grid.appendTo('#grid');
```

### WebAPI HTTP Method Mapping

| Operation | HTTP Method | URL |
|-----------|-------------|-----|
| Read | GET | /api/orders |
| Create | POST | /api/orders |
| Update | PUT | /api/orders/{id} |
| Delete | DELETE | /api/orders/{id} |

### WebAPI Response Format

```json
{
  "result": [
    { "OrderID": 10248, "CustomerName": "VINET", "Freight": 32.38 },
    { "OrderID": 10249, "CustomerName": "TOMSP", "Freight": 11.61 }
  ],
  "count": 830
}
```

### WebAPI with Batch

```ts
const grid = new Grid({
  dataSource: new DataManager({
    url: 'url',
    adaptor: new WebApiAdaptor(),
    batchUrl: 'url/batch'
  }),
  editSettings: {
    mode: 'Batch',
    allowAdding: true,
    allowEditing: true,
    allowDeleting: true
  },
  toolbar: ['Add', 'Edit', 'Delete', 'Update', 'Cancel']
});

grid.appendTo('#grid');
```

---

## WebMethod Adaptor

### ASMX Web Service Integration

```ts
import { Grid, DataManager, WebMethodAdaptor } from '@syncfusion/ej2-grids';

const grid = new Grid({
  dataSource: new DataManager({
    url: 'url',
    adaptor: new WebMethodAdaptor(),
    methodName: 'GetOrders'
  }),
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerName', headerText: 'Customer', width: 150 },
    { field: 'OrderDate', headerText: 'Date', width: 130, type: 'date' },
    { field: 'Freight', headerText: 'Freight', width: 100 }
  ],
  allowPaging: true,
  pageSettings: { pageSize: 12 }
});

grid.appendTo('#grid');
```

### C# WebMethod Implementation

```csharp
[WebService(Namespace = "example.com/")]
public class OrderService : System.Web.Services.WebService {
    
    [WebMethod]
    public List<Order> GetOrders(int? skip, int? take, string sortBy) {
        List<Order> allOrders = GetAllOrders();
        
        // Apply paging
        if (skip.HasValue && take.HasValue) {
            allOrders = allOrders.Skip(skip.Value).Take(take.Value).ToList();
        }
        
        return allOrders;
    }

    [WebMethod]
    public void InsertOrder(Order newOrder) {
        using (OrderContext context = new OrderContext()) {
            context.Orders.Add(newOrder);
            context.SaveChanges();
        }
    }
}

public class Order {
    public int OrderID { get; set; }
    public string CustomerName { get; set; }
    public DateTime OrderDate { get; set; }
    public decimal Freight { get; set; }
}
```

### WebMethod Response Format

ASMX returns JSON with dates as `/Date(ticks)/`:

```json
[
  { "OrderID": 10248, "CustomerName": "VINET", "OrderDate": "/Date(835478400000)/", "Freight": 32.38 }
]
```

### WebMethod with CRUD

```ts
const grid = new Grid({
  dataSource: new DataManager({
    url: 'url',
    adaptor: new WebMethodAdaptor(),
    methodName: 'GetOrders',
    insertUrl: 'InsertOrder',
    updateUrl: 'UpdateOrder',
    removeUrl: 'DeleteOrder'
  }),
  editSettings: {
    mode: 'Dialog',
    allowEditing: true,
    allowAdding: true,
    allowDeleting: true
  },
  toolbar: ['Add', 'Edit', 'Delete', 'Update', 'Cancel']
});

grid.appendTo('#grid');
```

---

## RemoteSave Adaptor

### Separate Read/Write Endpoints

```ts
import { Grid, DataManager, RemoteSaveAdaptor } from '@syncfusion/ej2-grids';

const grid = new Grid({
  dataSource: new DataManager({
    url: 'query-url',      // Read endpoint
    adaptor: new RemoteSaveAdaptor(),
    insertUrl: 'command-url/create',
    updateUrl: 'command-url/update',
    removeUrl: 'command-url/delete'
  }),
  columns: [
    { field: 'OrderID', headerText: 'Order ID', isPrimaryKey: true },
    { field: 'CustomerName', headerText: 'Customer', width: 150 },
    { field: 'Freight', headerText: 'Freight', width: 100 }
  ],
  editSettings: {
    mode: 'Dialog',
    allowEditing: true,
    allowAdding: true,
    allowDeleting: true
  },
  toolbar: ['Add', 'Edit', 'Delete', 'Update', 'Cancel']
});

grid.appendTo('#grid');
```

### RemoteSave with Different Authentication

```ts
class CQRSAdaptor extends RemoteSaveAdaptor {
  send(request: any) {
    request.headers = request.headers || {};
    
    if (request.url.includes('query')) {
      request.headers['Authorization'] = `send_token`;
    } else {
      request.headers['Authorization'] = `send_token`;
      request.headers['X-Command-Version'] = 'v2';
    }
    
    return super.send(request);
  }
}

const grid = new Grid({
  dataSource: new DataManager({
    url: queryService,
    adaptor: new CQRSAdaptor(),
    insertUrl: `${commandService}/create`,
    updateUrl: `${commandService}/update`,
    removeUrl: `${commandService}/delete`
  }),
  columns: [...]
});
```

---

## Custom Adaptor

### Basic Custom Adaptor

> ⚠️ Security Note
> The following example is for illustration only.
> Applications must not directly fetch or trust third‑party API responses.
> All external data must be validated, sanitized, and constrained
> before being supplied to DataManager.

```ts
class CustomDataAdaptor extends DataManager {
  constructor() {
    super();
    this.url = null;
  }

  update(dataManager: DataManager, record: any) {
    // Custom update logic
    return fetch('url', {
      method: 'PUT'
    }).then(response => response.json());
  }

  insert(dataManager: DataManager, record: any) {
    // Custom insert logic
    return fetch('url', {
      method: 'POST'
      body: JSON.stringify(record)
    }).then(response => response.json());
  }

  remove(dataManager: DataManager, keyField: string, value: any) {
    // Custom delete logic
    return fetch(`url/${value}`, {
      method: 'DELETE'
    }).then(response => response.json());
  }
}

const grid = new Grid({
  dataSource: new CustomDataAdaptor(),
  columns: [...]
});
```

### Custom Adaptor with Authentication

> 🔒 **Security Warning:** `localStorage` and `sessionStorage` store data **unencrypted** in the browser. **Never store sensitive data** (passwords, tokens, PII, payment info, user secrets, authentication credentials) in persisted TreeGrid state. State persistence is safe for **UI state only** (expand/collapse state, page number, sort order, column visibility, filter selections). For sensitive configuration or user data, use secure server-side session storage instead.

> ⚠️ Security Note
> The following example is for illustration only.
> Applications must not directly fetch or trust third‑party API responses.
> All external data must be validated, sanitized, and constrained
> before being supplied to DataManager.

```ts
class AuthenticatedCustomAdaptor extends CustomDataAdaptor {
  private getHeaders() {
    return {
      'Content-Type': 'application/json',
      'Authorization': `send_token`,
      'X-User-ID': getCurrentUserId()
    };
  }

  insert(dataManager: DataManager, record: any) {
    return fetch('url', {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(record)
    }).then(response => response.json());
  }
}

const grid = new Grid({
  dataSource: new AuthenticatedCustomAdaptor(),
  columns: [...]
});
```

### Custom Adaptor with Caching

> ⚠️ Security Note
> The following example is for illustration only.
> Applications must not directly fetch or trust third‑party API responses.
> All external data must be validated, sanitized, and constrained
> before being supplied to DataManager.

```ts
class CachedCustomAdaptor extends CustomDataAdaptor {
  private cache = new Map();
  private cacheExpiry = 5 * 60 * 1000; // 5 minutes

  read(dataManager: DataManager) {
    const cacheKey = 'orders_' + JSON.stringify(dataManager.query);
    
    if (this.cache.has(cacheKey)) {
      const cachedData = this.cache.get(cacheKey);
      if (Date.now() - cachedData.timestamp < this.cacheExpiry) {
        return Promise.resolve(cachedData.data);
      }
    }

    return fetch('url')
      .then(response => response.json())
      .then(data => {
        this.cache.set(cacheKey, { data, timestamp: Date.now() });
        return data;
      });
  }
}
```

---

## GraphQL Adaptor

### GraphQL Setup

```ts
import { Grid, DataManager, GraphQLAdaptor } from '@syncfusion/ej2-grids';

const grid = new Grid({
  dataSource: new DataManager({
    url: 'url',
    adaptor: new GraphQLAdaptor({
      query: `
        query GetOrders($skip: Int!, $take: Int!) {
          orders(skip: $skip, take: $take) {
            items {
              id
              customerName
              orderDate
              freight
            }
            totalCount
          }
        }
      `
    })
  }),
  columns: [
    { field: 'id', headerText: 'Order ID', width: 100 },
    { field: 'customerName', headerText: 'Customer', width: 150 },
    { field: 'orderDate', headerText: 'Date', width: 130 },
    { field: 'freight', headerText: 'Freight', width: 100 }
  ],
  allowPaging: true,
  pageSettings: { pageSize: 10 }
});

grid.appendTo('#grid');
```

### GraphQL with Mutations

```ts
const grid = new Grid({
  dataSource: new DataManager({
    url: 'url',
    adaptor: new GraphQLAdaptor({
      query: `query GetOrders { orders { id, customerName, freight } }`,
      mutations: {
        createOrder: `
          mutation CreateOrder($input: OrderInput!) {
            createOrder(input: $input) {
              id
              customerName
              freight
            }
          }
        `,
        updateOrder: `
          mutation UpdateOrder($id: ID!, $input: OrderInput!) {
            updateOrder(id: $id, input: $input) {
              id
              customerName
              freight
            }
          }
        `,
        deleteOrder: `
          mutation DeleteOrder($id: ID!) {
            deleteOrder(id: $id) {
              success
            }
          }
        `
      }
    })
  }),
  editSettings: {
    mode: 'Dialog',
    allowEditing: true,
    allowAdding: true,
    allowDeleting: true
  },
  columns: [...]
});

grid.appendTo('#grid');
```

### GraphQL with Variables

```ts
const gridAdaptor = new GraphQLAdaptor({
  query: `
    query GetOrders($skip: Int!, $take: Int!, $filter: String) {
      orders(skip: $skip, take: $take, filter: $filter) {
        items { id, customerName, freight }
        totalCount
      }
    }
  `,
  getVariables: (dataManager: DataManager) => {
    const pageSettings = dataManager.pageSettings || {};
    return {
      skip: (pageSettings.currentPage - 1) * pageSettings.pageSize || 0,
      take: pageSettings.pageSize || 10,
      filter: dataManager.query?.filter || null
    };
  }
});

const grid = new Grid({
  dataSource: new DataManager({
    url: 'url',
    adaptor: gridAdaptor
  }),
  columns: [...]
});
```