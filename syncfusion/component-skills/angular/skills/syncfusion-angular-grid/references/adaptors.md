# Data Adaptors in Angular Grid

## Table of Contents
- [When to Use This Skill](#when-to-use-this-skill)
- [Overview](#overview)
- [URL Adaptor](#url-adaptor)
- [ODataV4 Adaptor](#odatav4-adaptor)
- [WebAPI Adaptor](#webapi-adaptor)
- [GraphQL Adaptor](#graphql-adaptor)
- [Custom Adaptor](#custom-adaptor)
- [RemoteSave Adaptor](#remotesave-adaptor)
- [Adaptor Comparison](#adaptor-comparison)
- [Error Handling](#error-handling)

## When to Use This Skill

Use this skill when you need to:
- **Connect to REST APIs** — Configure grid to fetch data from RESTful backend services
- **Integrate with OData services** — Use ODataV4 adaptor for OData-compliant APIs
- **WebAPI integration** — Connect to .NET WebAPI endpoints with proper parameter binding
- **GraphQL support** — Integrate grid with GraphQL backend services
- **Custom backend protocols** — Build custom adaptors for proprietary or specialized backend systems
- **Server-side operations** — Offload filtering, sorting, grouping, and paging to the server
- **Error handling** — Implement robust error handling for backend communication failures
- **Data transformation** — Transform server responses before binding to grid
- **Cross-domain requests** — Configure CORS and cross-domain data fetching

## Overview

Data adaptors provide an interface between the Grid component and various backend services. They handle data fetching, filtering, sorting, grouping, and CRUD operations on the server side.

Adaptors are configured through the `DataManager` component using the `adaptor` property.

## URL Adaptor

Simplest adaptor for REST APIs with standard HTTP GET/POST requests.

### Setup

```typescript
import { Component } from '@angular/core';
import { DataManager, UrlAdaptor } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-url-adaptor-grid',
  template: `<ejs-grid [dataSource]="dataManager">
    <e-columns>
      <!-- columns -->
    </e-columns>
  </ejs-grid>`
})
export class UrlAdaptorGridComponent {
  public dataManager = new DataManager({
    url: 'url',
    adaptor: new UrlAdaptor(),
    crossDomain: true
  });
}
```

### Server Expectations

The server expects:
- GET request for reading data
- Query parameters: `$skip`, `$top`, `$orderby`, `$filter`

Example URL:
```
GET url?$skip=0&$top=12&$orderby=OrderID%20desc&$filter=Freight%20gt%2050
```

### Server Response Format

```json
{
  "d": [
    { "OrderID": 10248, "CustomerID": "VINET", "Freight": 32.38 },
    { "OrderID": 10249, "CustomerID": "TOMSP", "Freight": 11.61 }
  ],
  "__count": 830
}
```

Or with array response:
```json
[
  { "OrderID": 10248, "CustomerID": "VINET", "Freight": 32.38 },
  { "OrderID": 10249, "CustomerID": "TOMSP", "Freight": 11.61 }
]
```

### Example Implementation

```typescript
import { Component } from '@angular/core';
import { DataManager, UrlAdaptor } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-grid',
  template: `
    <ejs-grid [dataSource]="dataManager" 
              [allowPaging]="true" 
              [allowSorting]="true" 
              [allowFiltering]="true">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
        <e-column field="CustomerID" headerText="Customer" width="120"></e-column>
        <e-column field="Freight" headerText="Freight" width="100" format="C2"></e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class UrlAdaptorGridComponent {
  public dataManager = new DataManager({
    url: 'url',
    adaptor: new UrlAdaptor(),
    crossDomain: true
  });
}
```

---

## ODataV4 Adaptor

Specialized for OData v4 protocol. Provides advanced filtering, sorting, and server-side operations.

### Setup

```typescript
import { Component } from '@angular/core';
import { DataManager, ODataV4Adaptor } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-grid',
  template: `<ejs-grid [dataSource]="dataManager">
    <e-columns>
      <!-- columns -->
    </e-columns>
  </ejs-grid>`
})
export class ODataV4GridComponent {
  public dataManager = new DataManager({
    url: 'url',
    adaptor: new ODataV4Adaptor(),
    pageSize: 12
  });
}
```

### Benefits

- **Advanced Filtering**: Complex filter expressions
- **Selective Loading**: Only required columns via $select
- **Server-Side Aggregates**: Count, sum, average on server
- **Relationship Navigation**: Access related entities via $expand

### Query Parameters

```
$select     - Select specific columns
$filter     - Complex filter expressions  
$orderby    - Sort by one or more fields
$skip       - Skip N records (pagination)
$top        - Return N records
$count      - Include total count
$expand     - Include related data
```

### Example Queries

```
// Basic with paging
/Orders?$skip=0&$top=12&$count=true

// With filtering
/Orders?$filter=Freight gt 50 and ShipCity eq 'London'

// With sorting
/Orders?$orderby=OrderDate desc,CustomerID asc

// Selective columns
/Orders?$select=OrderID,CustomerID,Freight

// With relationships
/Orders?$expand=Customer,Employee

// Complex filter
/Orders?$filter=contains(tolower(CustomerID),'a') and Freight lt 100
```

### Complex OData Filters

```typescript
import { Predicate } from '@syncfusion/ej2-data';

const predicate = new Predicate('Freight', 'greaterThan', 50);
predicate = predicate.and('ShipCity', 'equal', 'London');
predicate = predicate.or('CustomerID', 'startsWith', 'A');

const gridInstance = this.gridInstance;
gridInstance.query = new Query().where(predicate);
gridInstance.refresh();
```

### Example with Expand

```typescript
const dataManager = new DataManager({
  url: 'url',
  adaptor: new ODataV4Adaptor()
});

export class ODataGridComponent implements OnInit {
  @ViewChild('grid') gridInstance: GridComponent;
  data = dataManager;
  
  ngOnInit() {
    // Data is automatically managed by DataManager
  }
}

// In template:
<ejs-grid [dataSource]="data" [allowPaging]="true" [allowSorting]="true" [allowFiltering]="true">
  <e-columns>
    <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
    <e-column field="Customer.CompanyName" headerText="Company" width="150"></e-column>
    <e-column field="Employee.FirstName" headerText="Employee" width="120"></e-column>
    <e-column field="Freight" headerText="Freight" width="100" format="C2"></e-column>
  </e-columns>
  <e-inject [services]="[Page, Sort, Filter]"></e-inject>
</ejs-grid>
```

---

## WebAPI Adaptor

For ASP.NET Web API services using RESTful conventions.

### Setup

```typescript
import { Component } from '@angular/core';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-grid',
  template: `<ejs-grid [dataSource]="dataManager">
    <e-columns>
      <!-- columns -->
    </e-columns>
  </ejs-grid>`
})
export class WebApiAdaptorGridComponent {
    crossDomain: true
  });
}
```

### ASP.NET Web API Controller

```csharp
[ApiController]
[Route("api/[controller]")]
public class OrdersController : ControllerBase
{
    [HttpGet]
    public IActionResult GetOrders([FromQuery] DataManagerRequest dm)
    {
        var orders = GetAllOrders(); // Your data source
        
        if (dm.Search != null && dm.Search.Count > 0)
        {
            orders = orders.Where(o => o.CustomerID.Contains(dm.Search[0].Key)).ToList();
        }

        if (dm.Sorted != null && dm.Sorted.Count > 0)
        {
            foreach (var sort in dm.Sorted)
            {
                if (sort.Direction == "Ascending")
                    orders = orders.OrderBy(x => x.GetType().GetProperty(sort.Name)?.GetValue(x)).ToList();
                else
                    orders = orders.OrderByDescending(x => x.GetType().GetProperty(sort.Name)?.GetValue(x)).ToList();
            }
        }

        var count = orders.Count();
        
        if (dm.Skip > 0)
            orders = orders.Skip(dm.Skip).ToList();
        
        if (dm.Take > 0)
            orders = orders.Take(dm.Take).ToList();

        return Ok(new { result = orders, count = count });
    }

    [HttpPost]
    public IActionResult Create([FromBody] Order value)
    {
        // Insert logic
        return Ok(value);
    }

    [HttpPut("{id}")]
    public IActionResult Update(int id, [FromBody] Order value)
    {
        // Update logic
        return Ok(value);
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        // Delete logic
        return Ok(id);
    }
}
```

### React Grid With CRUD

```typescript
import { Component } from '@angular/core';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-grid',
  template: `
    <ejs-grid [dataSource]="dataManager"
              [editSettings]="{ allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog' }"
              toolbar="['Add', 'Edit', 'Delete', 'Update', 'Cancel']">
      <e-columns>
        <!-- columns -->
      </e-columns>
    </ejs-grid>
  `
})
export class WebApiCrudGridComponent {
    insertUrl: 'url/insert',
    updateUrl: 'url/update',
    removeUrl: 'url/remove',
    batchUrl: 'url/batch'
  });
}
```

---

## GraphQL Adaptor

For GraphQL endpoints returning complex nested queries.

### Setup

```typescript
import { DataManager, GraphQLAdaptor } from '@syncfusion/ej2-data';

const data = new DataManager({
  url: 'url',
  adaptor: new GraphQLAdaptor(),
  query: `query {
    orders(skip: 0, take: 12) {
      items {
        orderId
        customerId
        freight
      }
      totalCount
    }
  }`
});

<ejs-grid [dataSource]="data">
  <e-columns>
    <!-- columns -->
  </e-columns>
</ejs-grid>
```

### GraphQL Query with Variables

```typescript
const data = new DataManager({
  url: 'url',
  adaptor: new GraphQLAdaptor(),
  query: `query getOrders($skip: Int!, $take: Int!, $filter: String) {
    orders(skip: $skip, take: $take, filter: $filter) {
      items {
        orderId
        customerId
        orderDate
        freight
      }
      totalCount
    }
  }`
});
```

### GraphQL API Example (Node.js)

```javascript
const express = require('express');
const { graphql, buildSchema } = require('graphql');

const schema = buildSchema(`
  type Query {
    orders(skip: Int, take: Int, filter: String): OrderResult
  }
  
  type Order {
    orderId: Int
    customerId: String
    orderDate: String
    freight: Float
  }
  
  type OrderResult {
    items: [Order]
    totalCount: Int
  }
`);

const root = {
  orders: ({ skip = 0, take = 12, filter }) => {
    let orders = getAllOrders();
    
    if (filter) {
      orders = orders.filter(o => o.customerId.includes(filter));
    }
    
    return {
      items: orders.slice(skip, skip + take),
      totalCount: orders.length
    };
  }
};

app.post('/graphql', express.json(), async (req, res) => {
  const result = await graphql(schema, req.body.query, root);
  res.json(result);
});
```

---

## Custom Adaptor

For non-standard backend implementations.

### Creating a Custom Adaptor

```typescript
import { DataManager, Adaptor, Query } from '@syncfusion/ej2-data';

class CustomAdaptor extends Adaptor {
  processQuery(dm, query, hierarchyIndex) {
    // Custom query processing
    const req = this.baseUrl;
    const filter = query.params.filter || '';
    const sort = query.params.sort || '';
    const page = query.params.pageIndex || 1;
    const pageSize = query.params.pageSize || 12;

    return {
      type: 'GET',
      url: `${req}?filter=${filter}&sort=${sort}&page=${page}&pageSize=${pageSize}`
    };
  }

  processResponse(data, dm, query, xhr, request, key) {
    // Process response to expected format
    if (data.result) {
      return { result: data.result, count: data.totalCount };
    }
    return data;
  }

  insert(dm, value, tableName, key) {
    // Custom insert logic
    return {
      type: 'POST',
      url: dm.insertUrl || dm.baseUrl,
      data: JSON.stringify(value),
      contentType: 'application/json'
    };
  }

  update(dm, keyField, value, tableName, key) {
    // Custom update logic
    return {
      type: 'PUT',
      url: `${dm.updateUrl || dm.baseUrl}/${value[keyField]}`,
      data: JSON.stringify(value),
      contentType: 'application/json'
    };
  }

  remove(dm, keyField, value, tableName, key) {
    // Custom delete logic
    return {
      type: 'DELETE',
      url: `${dm.removeUrl || dm.baseUrl}/${value[keyField]}`
    };
  }
}

const data = new DataManager({
  url: 'url',
  adaptor: new CustomAdaptor()
});
```

### Custom Adaptor with Special Headers

```typescript
class AuthenticatedAdaptor extends Adaptor {
  processRequest(dm, request, state) {
    request.headers = {
      ...request.headers,
      'Authorization': `send_token`,
      'X-Custom-Header': 'CustomValue'
    };
    return request;
  }

  processResponse(data, dm, query, xhr, request, key) {
    if (xhr.status === 401) {
      // Handle unauthorized
      redirectToLogin();
    }
    return data;
  }
}
```

---

## RemoteSave Adaptor

Specialized for batch CRUD operations (multiple insert/update/delete in single request).

### Setup

```typescript
import { DataManager, RemoteSaveAdaptor } from '@syncfusion/ej2-data';
import { GridComponent, Inject, Edit, Toolbar } from '@syncfusion/ej2-angular-grids';

const data = new DataManager({
  url: 'url',
  adaptor: new RemoteSaveAdaptor(),
  batchUrl: 'url/batch'
});

export class BatchGridComponent implements OnInit {
  @ViewChild('grid') gridInstance: GridComponent;
  data = dataManager;
  editSettings: any = { 
    allowEditing: true, 
    allowAdding: true, 
    allowDeleting: true, 
    mode: 'Batch' 
  };
  toolbar: string[] = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
  
}

<ejs-grid [dataSource]="data" [editSettings]="editSettings" [toolbar]="toolbar">
  <e-columns>
    <!-- columns -->
  </e-columns>
  <e-inject [services]="[Edit, Toolbar]"></e-inject>
</ejs-grid>
```

### Batch Request Format

```json
{
  "changed": [
    { "OrderID": 10248, "CustomerID": "VINET_UPDATED" }
  ],
  "added": [
    { "CustomerID": "NEWCUST", "Freight": 25.5 }
  ],
  "deleted": [
    { "OrderID": 10249 }
  ]
}
```

### ASP.NET Backend

```csharp
[HttpPost("batch")]
public IActionResult UpdateBatch([FromBody] BatchRequest request)
{
    if (request.Changed != null)
        foreach (var order in request.Changed)
            UpdateOrder(order);
    
    if (request.Added != null)
        foreach (var order in request.Added)
            InsertOrder(order);
    
    if (request.Deleted != null)
        foreach (var order in request.Deleted)
            DeleteOrder(order.OrderID);

    return Ok();
}

public class BatchRequest
{
    public List<Order> Changed { get; set; }
    public List<Order> Added { get; set; }
    public List<Order> Deleted { get; set; }
}
```

---

## Adaptor Comparison

| Feature | URL | OData | WebAPI | GraphQL | Custom |
|---------|-----|-------|--------|---------|--------|
| **Easy Setup** | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ | ⚠️ Complex |
| **Filtering** | ⭐⭐⭐ | ⭐⭐⭐ | Good | Complex | Custom |
| **Sorting** | ⭐⭐⭐ | ⭐⭐⭐ | Good | Custom | Custom |
| **Pagination** | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ | Custom | Custom |
| **Aggregates** | ⭐⭐⭐ | ⭐⭐⭐ | ⚠️ | Custom | Custom |
| **Relationships** | ❌ | ⭐⭐⭐ | Basic | ⭐⭐⭐ | Custom |
| **CRUD** | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ | Custom | Custom |
| **Performance** | Good | Good | Good | Variable | Variable |

---

## Error Handling

### Global Error Handler

```typescript
const data = new DataManager({
  url: 'url',
  adaptor: new UrlAdaptor()
});

export class ErrorHandlingGridComponent implements OnInit {
  @ViewChild('grid') gridInstance: GridComponent;
  data = dataManager;

  onActionFailure(args: any) {
    console.error('Grid Error:', args);
    
    if (args.error?.status === 401) {
      this.redirectToLogin();
    } else if (args.error?.status === 500) {
      this.showErrorNotification('Server error occurred');
    } else {
      this.showErrorNotification('An error occurred');
    }
  }

  redirectToLogin() {
    // Implement redirect
  }

  showErrorNotification(message: string) {
    // Implement notification
  }
}
```

### Request/Response Interceptor

```typescript
class InterceptorAdaptor extends Adaptor {
  beforeSend(request: any) {
    console.log('Request:', request);
    return request;
  }

  processResponse(data: any, dm: any, query: any, xhr: any, request: any, key: string) {
    console.log('Response:', data);
    
    if (data.error) {
      throw new Error(data.error.message);
    }
    
    return data;
  }
}
```
