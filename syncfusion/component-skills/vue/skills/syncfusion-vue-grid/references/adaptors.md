# Connecting to Adaptors

## Table of Contents
- [When to Use](#when-to-use)
- [Quick Reference](#quick-reference)
- [URL Adaptor](#url-adaptor)
- [ODataV4 Adaptor](#odatav4-adaptor)
- [Web API Adaptor](#web-api-adaptor)
- [GraphQL Adaptor](#graphql-adaptor)
- [Web Method Adaptor](#web-method-adaptor)
- [RemoteSave Adaptor](#remotesave-adaptor)
- [Custom Adaptor](#custom-adaptor)
- [Comparison](#comparison)

## When to Use

- **URL Adaptor**: Custom REST API that doesn't follow OData standards. Returns `{ result: [], count: 0 }`
- **ODataV4 Adaptor**: OData V4 services with auto-formatting of $filter, $orderby, $skip, $top
- **Web API Adaptor**: OData-capable Web APIs with REST semantics
- **GraphQL Adaptor**: GraphQL backends requiring custom queries/mutations
- **Web Method Adaptor**: Legacy ASP.NET Web Methods with value wrapper
- **RemoteSave Adaptor**: Client-side filtering/sorting with server-side CRUD (small datasets <10K)
- **Custom Adaptor**: Extend adaptors with custom processQuery, beforeSend, processResponse hooks

## Quick Reference

| Adaptor | Protocol | Query Handling | Best For |
|---------|----------|----------------|----------|
| URL | REST | Manual | Custom APIs |
| ODataV4 | OData | Automatic | Modern APIs |
| WebApi | OData | Automatic | Web APIs |
| GraphQL | GraphQL | Manual | GraphQL servers |
| WebMethod | .NET | Manual | Legacy ASP.NET |
| RemoteSave | Local/REST | Client-side | Small datasets |
| Custom | Any | Custom | Special requirements |

## Vue 3 Grid Template

Use this template pattern for all adaptors:

```vue
<template>
  <ejs-grid :dataSource='dataSource'>
    <e-columns>
      <e-column field='OrderID' headerText='Order ID' width='120' textAlign='Right' isPrimaryKey="true"></e-column>
      <e-column field='CustomerID' headerText='Customer ID' width='160'></e-column>
      <e-column field='ShipCity' headerText='Ship City' width='150'></e-column>
    </e-columns>
  </ejs-grid>
</template>

<script setup>
import { GridComponent as EjsGrid, ColumnDirective as EColumn, ColumnsDirective as EColumns } from "@syncfusion/ej2-vue-grids";
import { DataManager } from "@syncfusion/ej2-data";
// Import specific adaptor as needed: UrlAdaptor, ODataV4Adaptor, etc.

const dataSource = new DataManager({
  url: 'url',
  adaptor: new SpecificAdaptor()
});
</script>
```

---

## URL Adaptor

Base adaptor for custom REST APIs enabling communication with any remote service.

**Client Configuration:**
```javascript
import { DataManager, UrlAdaptor } from "@syncfusion/ej2-data";

const data = new DataManager({
  url: 'url',
  adaptor: new UrlAdaptor(),
});
```

**Vue 3 (Composition API):**
```vue
<script setup>
import { GridComponent as EjsGrid, ColumnDirective as EColumn, ColumnsDirective as EColumns } from "@syncfusion/ej2-vue-grids";
import { DataManager, UrlAdaptor } from "@syncfusion/ej2-data";

const dataSource = new DataManager({
  url: 'url',
  adaptor: new UrlAdaptor(),
});
</script>

<template>
  <ejs-grid :dataSource='dataSource'>
    <e-columns>
      <e-column field='OrderID' headerText='Order ID' width='120' textAlign='Right' isPrimaryKey="true"></e-column>
      <e-column field='CustomerID' headerText='Customer ID' width='160'></e-column>
      <e-column field='ShipCity' headerText='Ship City' width='150'></e-column>
    </e-columns>
  </ejs-grid>
</template>
```

**API Response Format:**
```json
{
  "result": [
    { "OrderID": 10248, "CustomerID": "VINET", "ShipCity": "Reims" }
  ],
  "count": 830
}
```

**Map CRUD Operations:**
```javascript
const data = new DataManager({
  url: 'url',
  insertUrl: 'url/Insert',
  updateUrl: 'url/Update',
  removeUrl: 'url/Remove',
  adaptor: new UrlAdaptor(),
});
```

**Server (ASP.NET Core) - GET:**
```csharp
[HttpPost]
public object Post([FromBody] DataManagerRequest DataManagerRequest)
{
  IQueryable<OrdersDetails> DataSource = GetOrderData().AsQueryable();
  QueryableOperation queryableOperation = new QueryableOperation();
  
  if (DataManagerRequest.Skip != 0)
    DataSource = queryableOperation.PerformSkip(DataSource, DataManagerRequest.Skip);
  if (DataManagerRequest.Take != 0)
    DataSource = queryableOperation.PerformTake(DataSource, DataManagerRequest.Take);
  
  return new { result = DataSource, count = DataSource.Count() };
}
```

**Batch Operations:**
```csharp
[HttpPost("api/Grid/BatchUpdate")]
public IActionResult BatchUpdate([FromBody] CRUDModel<OrdersDetails> batchOp)
{
  if (batchOp.added != null)
    foreach (var item in batchOp.added)
      OrdersDetails.GetAllRecords().Insert(0, item);
  if (batchOp.changed != null)
    foreach (var item in batchOp.changed)
      UpdateRecord(item);
  if (batchOp.deleted != null)
    foreach (var item in batchOp.deleted)
      DeleteRecord(item);
  return Json(batchOp);
}
```

---

## ODataV4 Adaptor

Integrates with OData V4 services, automatically formatting queries using OData conventions.

**Server Setup (ASP.NET Core Program.cs):**
```csharp
var modelBuilder = new ODataConventionModelBuilder();
modelBuilder.EntitySet<OrdersDetails>("Orders");

builder.Services.AddControllers().AddOData(options => options
  .Count().Filter().OrderBy().SetMaxTop(null)
  .AddRouteComponents("odata", modelBuilder.GetEdmModel())
);
```

**Controller:**
```csharp
[ApiController]
public class OrdersController : ControllerBase
{
  [HttpGet][EnableQuery]
  public IActionResult Get() => Ok(OrdersDetails.GetAllRecords().AsQueryable());
  
  [HttpPost][EnableQuery]
  public IActionResult Post([FromBody] OrdersDetails record)
  {
    OrdersDetails.GetAllRecords().Insert(0, record);
    return Ok(record);
  }
  
  [HttpPatch("{key}")]
  public IActionResult Patch(int key, [FromBody] OrdersDetails record)
  {
    var existing = OrdersDetails.GetAllRecords().FirstOrDefault(o => o.OrderID == key);
    if (existing != null) Object.Assign(existing, record);
    return Ok(record);
  }
  
  [HttpDelete("{key}")]
  public IActionResult Delete(int key)
  {
    var order = OrdersDetails.GetAllRecords().FirstOrDefault(o => o.OrderID == key);
    if (order != null) OrdersDetails.GetAllRecords().Remove(order);
    return Ok(order);
  }
}
```

**Client Configuration:**
```javascript
import { DataManager, ODataV4Adaptor } from "@syncfusion/ej2-data";

const data = new DataManager({
  url: 'url',
  adaptor: new ODataV4Adaptor(),
});

// Optional: Custom URLs for CRUD
const data = new DataManager({
  url: 'url',
  insertUrl: 'url/Insert',
  updateUrl: 'url/Update',
  removeUrl: 'url/Remove',
  adaptor: new ODataV4Adaptor(),
});
```

**Auto-Formatted Queries:**
- Filtering: `$filter=CustomerID eq 'VINET'`
- Sorting: `$orderby=OrderID desc`
- Paging: `$skip=10&$top=10`
- Searching: Uses `$filter` with substring matching
- Counting: `$count=true`

---

## Web API Adaptor

Extension of ODataAdaptor for Web APIs that understand OData query options but may not follow pure OData conventions.

**Client Configuration:**
```javascript
import { DataManager, WebApiAdaptor } from "@syncfusion/ej2-data";

const data = new DataManager({
  url: 'url',
  adaptor: new WebApiAdaptor(),
});
```

**Vue 3 Example:**
```vue
<script setup>
import { GridComponent as EjsGrid, ColumnDirective as EColumn, ColumnsDirective as EColumns } from "@syncfusion/ej2-vue-grids";
import { DataManager, WebApiAdaptor } from "@syncfusion/ej2-data";

const dataSource = new DataManager({
  url: 'url',
  adaptor: new WebApiAdaptor(),
});
</script>

<template>
  <ejs-grid :dataSource='dataSource'>
    <e-columns>
      <e-column field='OrderID' headerText='Order ID' width='120' isPrimaryKey="true"></e-column>
      <e-column field='CustomerID' headerText='Customer ID' width='160'></e-column>
    </e-columns>
  </ejs-grid>
</template>
```
**Vue 3 (Composition API):**
```vue
<script setup>
import { GridComponent as EjsGrid, ColumnDirective as EColumn, ColumnsDirective as EColumns } from "@syncfusion/ej2-vue-grids";
import { DataManager, ODataV4Adaptor } from "@syncfusion/ej2-data";

const dataSource = new DataManager({
  url: 'url',
  adaptor: new ODataV4Adaptor(),
});
</script>

<template>
  <ejs-grid :dataSource='dataSource'>
    <e-columns>
      <e-column field='OrderID' headerText='Order ID' width='120' textAlign='Right' isPrimaryKey="true"></e-column>
      <e-column field='CustomerID' headerText='Customer ID' width='160'></e-column>
      <e-column field='ShipCity' headerText='Ship City' width='150'></e-column>
    </e-columns>
  </ejs-grid>
</template>
```
**Server Response Format:**
```json
{
  "items": [
    { "OrderID": 10248, "CustomerID": "VINET", "Freight": 32.38 }
  ],
  "count": 830
}
```

**Handle OData Queries (ASP.NET Core):**
```csharp
[HttpGet]
public object Get()
{
  var data = OrdersDetails.GetAllRecords().ToList();
  string filter = Request.Query["$filter"];
  string orderby = Request.Query["$orderby"];
  int skip = int.Parse(Request.Query["$skip"] ?? "0");
  int take = int.Parse(Request.Query["$top"] ?? "0");
  
  // Apply filter, sort, skip/take...
  int count = data.Count;
  if (take != 0) data = data.Skip(skip).Take(take).ToList();
  
  return new { Items = data, Count = count };
}
```

---

## GraphQL Adaptor

Enables grid integration with GraphQL servers for maximum flexibility with custom queries/mutations.

**GraphQL Schema:**
```graphql
type Order { OrderID: Int!; CustomerID: String; Freight: Float; ShipCity: String }
type ReturnType { result: [Order]; count: Int }

type Query {
  getOrders(datamanager: DataManager): ReturnType
}

type Mutation {
  createOrder(value: OrderInput!): Order!
  updateOrder(key: Int!, value: OrderInput): Order
  deleteOrder(key: Int!): Order!
}
```

**Resolver Implementation:**
```javascript
const resolvers = {
  Query: {
    getOrders: (parent, { datamanager }) => {
      var result = DataUtil.processData(datamanager, OrderData);
      return result;
    }
  },
  Mutation: {
    createOrder: (parent, { value }) => { OrderData.push(value); return value; },
    updateOrder: (parent, { key, value }) => {
      let order = OrderData.find(o => o.OrderID === parseInt(key));
      if (order) Object.assign(order, value);
      return order;
    },
    deleteOrder: (parent, { key }) => {
      const idx = OrderData.findIndex(o => o.OrderID === parseInt(key));
      return idx !== -1 ? OrderData.splice(idx, 1)[0] : null;
    }
  }
};
```

**Vue 3 Example:**
```vue
<script setup>
import { GridComponent as EjsGrid, ColumnDirective as EColumn, ColumnsDirective as EColumns } from "@syncfusion/ej2-vue-grids";
import { DataManager, GraphQLAdaptor } from "@syncfusion/ej2-data";

const dataSource = new DataManager({
  url: "url",
  adaptor: new GraphQLAdaptor({
    response: { result: 'getOrders.result', count: 'getOrders.count' },
    query: `query getOrders($datamanager: DataManager) { getOrders(datamanager: $datamanager) { count, result { OrderID, CustomerID } } }`,
    getMutation: function(action) {
      if (action === 'insert') return `mutation CreateOrder($value: OrderInput!) { createOrder(value: $value) { OrderID } }`;
      if (action === 'update') return `mutation UpdateOrder($key: Int!, $value: OrderInput) { updateOrder(key: $key, value: $value) { OrderID } }`;
      if (action === 'delete') return `mutation DeleteOrder($key: Int!) { deleteOrder(key: $key) { OrderID } }`;
    }
  })
});
</script>

<template>
  <ejs-grid :dataSource='dataSource'>
    <e-columns>
      <e-column field='OrderID' headerText='Order ID' width='120'></e-column>
      <e-column field='CustomerID' headerText='Customer ID' width='160'></e-column>
    </e-columns>
  </ejs-grid>
</template>
```

**Client Configuration (Detailed):**
```javascript
import { DataManager, GraphQLAdaptor } from "@syncfusion/ej2-data";

const data = new DataManager({
  url: "url",
  adaptor: new GraphQLAdaptor({
    response: { result: 'getOrders.result', count: 'getOrders.count' },
    query: `query getOrders($datamanager: DataManager) {
      getOrders(datamanager: $datamanager) {
        count, result { OrderID, CustomerID, Freight, ShipCity }
      }
    }`,
    getMutation: function(action) {
      if (action === 'insert')
        return `mutation CreateOrder($value: OrderInput!) {
          createOrder(value: $value) { OrderID, CustomerID, Freight }
        }`;
      if (action === 'update')
        return `mutation UpdateOrder($key: Int!, $value: OrderInput) {
          updateOrder(key: $key, value: $value) { OrderID, CustomerID }
        }`;
      if (action === 'delete')
        return `mutation DeleteOrder($key: Int!) { deleteOrder(key: $key) { OrderID } }`;
    }
  })
});
```

**Features:** Custom query selection, automatic query building, resolver-based data processing, nested data support.

---

## Web Method Adaptor

Designed for ASP.NET Web Methods, wrapping DataManager properties inside a `value` object.

**Client Configuration:**
```javascript
import { DataManager, WebMethodAdaptor } from "@syncfusion/ej2-data";

const data = new DataManager({
  url: 'url',
  adaptor: new WebMethodAdaptor(),
});
```

**Server Implementation (ASP.NET Core):**
```csharp
[HttpPost]
public object Post([FromBody] DataManager DataManagerRequest)
{
  IQueryable<OrdersDetails> DataSource = GetOrderData().AsQueryable();
  QueryableOperation queryableOp = new QueryableOperation();
  var param = DataManagerRequest.Value;  // Access wrapped value
  
  if (param.Search?.Count > 0)
    DataSource = queryableOp.PerformSearching(DataSource, param.Search);
  if (param.Where?.Count > 0)
    DataSource = queryableOp.PerformFiltering(DataSource, param.Where, null);
  if (param.Sorted?.Count > 0)
    DataSource = queryableOp.PerformSorting(DataSource, param.Sorted);
  
  int count = DataSource.Count();
  if (param.Skip != 0) DataSource = queryableOp.PerformSkip(DataSource, param.Skip);
  if (param.Take != 0) DataSource = queryableOp.PerformTake(DataSource, param.Take);
  
  return new { result = DataSource, count = count };
}

// CRUD endpoints
[HttpPost("api/Grid/Insert")]
public void Insert([FromBody] CRUDModel<OrdersDetails> newRecord)
{
  if (newRecord.value != null)
    OrdersDetails.GetAllRecords().Insert(0, newRecord.value);
}

[HttpPost("api/Grid/Update")]
public void Update([FromBody] CRUDModel<OrdersDetails> updatedRecord)
{
  var existing = OrdersDetails.GetAllRecords().FirstOrDefault(o => o.OrderID == updatedRecord.value.OrderID);
  if (existing != null) existing.CustomerID = updatedRecord.value.CustomerID;
}

[HttpPost("api/Grid/Remove")]
public void Remove([FromBody] CRUDModel<OrdersDetails> deletedRecord)
{
  int orderId = int.Parse(deletedRecord.key.ToString());
  var order = OrdersDetails.GetAllRecords().FirstOrDefault(o => o.OrderID == orderId);
  if (order != null) OrdersDetails.GetAllRecords().Remove(order);
}
```

---

## RemoteSave Adaptor

Client-side sorting/filtering/paging with server-side CRUD. Ideal for datasets <10K records.

**How It Works:**
- **Data Loading:** All data fetched at once
- **Client Operations:** Sorting, filtering, paging done locally (fast, no roundtrip)
- **CRUD:** Insert/Update/Delete sent to server for persistence

**Vue 3 Example:**
```vue
<script setup>
import { ref } from 'vue';
import { GridComponent as EjsGrid, ColumnDirective as EColumn, ColumnsDirective as EColumns } from "@syncfusion/ej2-vue-grids";
import { DataManager, RemoteSaveAdaptor } from "@syncfusion/ej2-data";

const dataSource = ref(null);

fetch("url")
  .then(r => r.json())
  .then(value => {
    dataSource.value = new DataManager({
      json: value,
      insertUrl: 'url/Insert',
      updateUrl: 'url/Update',
      removeUrl: 'url/Remove',
      adaptor: new RemoteSaveAdaptor(),
    });
  });
</script>

<template>
  <ejs-grid :dataSource='dataSource'>
    <e-columns>
      <e-column field='OrderID' headerText='Order ID' width='120' isPrimaryKey="true"></e-column>
      <e-column field='CustomerID' headerText='Customer ID' width='160'></e-column>
    </e-columns>
  </ejs-grid>
</template>
```

**Client Configuration (JS Only):**

> ⚠️ Security Note  
> The following example is for illustration only.
> Applications must not directly fetch or trust third‑party API responses.
> All external data must be validated, sanitized, and constrained
> before being supplied to DataManager.

```javascript
import { DataManager, RemoteSaveAdaptor } from "@syncfusion/ej2-data";

fetch("api/")
  .then(r => r.json())
  .then(value => {
    const data = new DataManager({
      json: value,
      insertUrl: 'url/Insert',
      updateUrl: 'url/Update',
      removeUrl: 'url/Remove',
      adaptor: new RemoteSaveAdaptor(),
    });
  });
```

**Server Endpoints:**
```csharp
[HttpGet]
public List<OrdersDetails> Get() => OrdersDetails.GetAllRecords().ToList();

[HttpPost("api/Orders/Insert")]
public object Insert([FromBody] CRUDModel<OrdersDetails> record)
{
  if (record.value != null) OrdersDetails.GetAllRecords().Insert(0, record.value);
  return record.value;
}

[HttpPost("api/Orders/Update")]
public object Update([FromBody] CRUDModel<OrdersDetails> record)
{
  var existing = OrdersDetails.GetAllRecords().FirstOrDefault(o => o.OrderID == record.value.OrderID);
  if (existing != null) Object.Assign(existing, record.value);
  return record;
}

[HttpPost("api/Orders/Remove")]
public object Remove([FromBody] CRUDModel<OrdersDetails> record)
{
  int id = int.Parse(record.key.ToString());
  var order = OrdersDetails.GetAllRecords().FirstOrDefault(o => o.OrderID == id);
  if (order != null) OrdersDetails.GetAllRecords().Remove(order);
  return record;
}
```

---

## Custom Adaptor

Extend any base adaptor with custom logic for processQuery, beforeSend, and processResponse hooks.

**Create Custom Adaptor:**
```javascript
import { ODataV4Adaptor } from '@syncfusion/ej2-data';

export class CustomAdaptor extends ODataV4Adaptor {
  processQuery(dm, query) {
    // Add custom parameters
    query.addParams('ApiVersion', 'v2');
    query.addParams('ClientId', 'GridClient');
    return super.processQuery.apply(this, arguments);
  }
  
  beforeSend(dm, request, settings) {
    // Add custom headers
    request.headers.set('Authorization', `send_token`);
    request.headers.set('X-Custom-Header', 'CustomValue');
    super.beforeSend(dm, request, settings);
  }
  
  processResponse() {
    const original = super.processResponse.apply(this, arguments);
    if (original.result) {
      original.result.forEach((item, i) => {
        item.SerialNumber = i + 1;
        item.FormattedFreight = `$${item.Freight?.toFixed(2)}`;
      });
    }
    return original;
  }
}
```

**Vue 3 Example:**
```vue
<script setup>
import { GridComponent as EjsGrid, ColumnDirective as EColumn, ColumnsDirective as EColumns } from "@syncfusion/ej2-vue-grids";
import { DataManager } from "@syncfusion/ej2-data";
import { CustomAdaptor } from './custom-adaptor';

const dataSource = new DataManager({
  url: 'url',
  adaptor: new CustomAdaptor(),
  insertUrl: 'url/Insert',
  updateUrl: 'url/Update',
  removeUrl: 'url/Remove',
});
</script>

<template>
  <ejs-grid :dataSource='dataSource'>
    <e-columns>
      <e-column field='OrderID' headerText='Order ID' width='120'></e-column>
      <e-column field='CustomerID' headerText='Customer ID' width='160'></e-column>
    </e-columns>
  </ejs-grid>
</template>
```

**Use in Grid (JS Only):**
```javascript
import { DataManager } from "@syncfusion/ej2-data";
import { CustomAdaptor } from './custom-adaptor';

const data = new DataManager({
  url: 'url',
  adaptor: new CustomAdaptor(),
  insertUrl: 'url/Insert',
  updateUrl: 'url/Update',
  removeUrl: 'url/Remove',
});
```

**Common Scenarios:**

> 🔒 **Security Warning:** `localStorage` and `sessionStorage` store data **unencrypted** in the browser. **Never store sensitive data** (passwords, tokens, PII, payment info, user secrets, authentication credentials) in persisted TreeGrid state. State persistence is safe for **UI state only** (expand/collapse state, page number, sort order, column visibility, filter selections). For sensitive configuration or user data, use secure server-side session storage instead.

Custom headers (JWT authentication):
```javascript
beforeSend(dm, request, settings) {
  const token = localStorage.getItem('authToken');
  request.headers.set('Authorization', `send_token`);
  super.beforeSend(dm, request, settings);
}
```

Add correlation IDs:
```javascript
processQuery(dm, query) {
  query.addParams('RequestId', generateUUID());
  query.addParams('Timestamp', new Date().toISOString());
  return super.processQuery.apply(this, arguments);
}
```

Format dates in response:
```javascript
processResponse() {
  const result = super.processResponse.apply(this, arguments);
  if (result.result) {
    result.result.forEach(item => {
      if (item.OrderDate) item.OrderDate = new Date(item.OrderDate).toLocaleDateString();
    });
  }
  return result;
}
```

Server-side handling of custom parameters:
```csharp
[HttpGet]
[EnableQuery]
public IActionResult Get([FromQuery] string ApiVersion, [FromQuery] string ClientId)
{
  logger.LogInformation($"API Version: {ApiVersion}, Client: {ClientId}");
  return Ok(OrdersDetails.GetAllRecords().AsQueryable());
}
```

---

## Comparison

| Feature | URL | ODataV4 | WebApi | GraphQL | WebMethod | RemoteSave | Custom |
|---------|-----|---------|--------|---------|-----------|-----------|--------|
| **Query Format** | JSON | OData | OData | GraphQL | DataManager | Array | Custom |
| **Filtering** | Server | Auto | Auto | Manual | Server | Client | Custom |
| **Sorting** | Server | Auto | Auto | Manual | Server | Client | Custom |
| **Paging** | Server | Auto | Auto | Manual | Server | Client | Custom |
| **CRUD** | Server | Server | Server | Server | Server | Server | Server |
| **Data Load** | On-demand | On-demand | On-demand | On-demand | On-demand | All at once | Custom |
| **Best For** | Custom APIs | OData V4 | Web APIs | GraphQL backends | Legacy .NET | Small datasets | Special cases |
| **Complexity** | Medium | Low | Low | High | Medium | Low | High |
