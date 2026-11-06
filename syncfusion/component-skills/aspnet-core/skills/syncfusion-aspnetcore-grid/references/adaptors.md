# Data Adaptors in ASP.NET Core Grid

## Table of Contents
- [Overview](#overview)
- [URL Adaptor](#url-adaptor)
- [ODataV4 Adaptor](#odatav4-adaptor)
- [WebAPI Adaptor](#webapi-adaptor)
- [Custom Adaptor](#custom-adaptor)
- [RemoteSave Adaptor](#remotesave-adaptor)
- [Adaptor Comparison](#adaptor-comparison)
- [Error Handling](#error-handling)
- [Best Practices](#best-practices)

## Overview

Data adaptors provide an interface between the Grid component and various backend services. They handle data fetching, filtering, sorting, grouping, and CRUD operations on the server side.

Adaptors are configured through the `<e-datamanager>` tag helper using the `adaptor` property.

---

## URL Adaptor

Simplest adaptor for REST APIs with standard HTTP GET/POST requests.

### Setup

```cshtml
<ejs-grid id="Grid" pageSize="12" allowPaging="true" allowSorting="true">
    <e-datamanager url="url" adaptor="UrlAdaptor"></e-datamanager>
    <e-grid-columns>
        <e-grid-column field="OrderID" headerText="Order ID" width="100"></e-grid-column>
        <e-grid-column field="CustomerID" headerText="Customer" width="120"></e-grid-column>
        <e-grid-column field="Freight" headerText="Freight" format="C2" width="100"></e-grid-column>
    </e-grid-columns>
</ejs-grid>
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

---

## ODataV4 Adaptor

For OData V4 protocol services (e.g., Azure Data Services).

### Setup

```cshtml
<ejs-grid id="Grid" allowPaging="true" allowSorting="true" allowFiltering="true">
    <e-datamanager url="url" adaptor="ODataV4Adaptor"></e-datamanager>
    <e-grid-columns>
        <e-grid-column field="OrderID" headerText="Order ID" width="100"></e-grid-column>
        <e-grid-column field="CustomerID" headerText="Customer" width="120"></e-grid-column>
        <e-grid-column field="EmployeeID" headerText="Employee" type="number" width="100"></e-grid-column>
        <e-grid-column field="OrderDate" headerText="Order Date" type="date" format="yMd" width="130"></e-grid-column>
    </e-grid-columns>
</ejs-grid>
```

### Request Example

```
GET url/Orders/?$skip=0&$top=12&$orderby=OrderID%20desc&$filter=Freight%20gt%2050
```

### Response Format

```json
{
  "value": [
    { "OrderID": 10248, "CustomerID": "VINET", "Freight": 32.38 },
    { "OrderID": 10249, "CustomerID": "TOMSP", "Freight": 11.61 }
  ],
  "@odata.count": 830
}
```

---

## WebAPI Adaptor

For ASP.NET Web API endpoints with CRUD support.

### Setup

```cshtml
<ejs-grid id="Grid" allowPaging="true" allowSorting="true" toolbar="@(new List<string>() { "Add", "Edit", "Delete", "Update", "Cancel" })">
    <e-datamanager url="/api/orders" 
                   insertUrl="/api/orders" 
                   updateUrl="/api/orders" 
                   removeUrl="/api/orders" 
                   adaptor="WebApiAdaptor"></e-datamanager>
    <e-grid-editSettings allowAdding="true" allowEditing="true" allowDeleting="true"></e-grid-editSettings>
    <e-grid-columns>
        <e-grid-column field="OrderID" headerText="Order ID" isPrimaryKey="true" width="100"></e-grid-column>
        <e-grid-column field="CustomerID" headerText="Customer" width="120"></e-grid-column>
        <e-grid-column field="Freight" headerText="Freight" format="C2" width="100"></e-grid-column>
    </e-grid-columns>
</ejs-grid>
```

### Server-Side C# Controller Example

```csharp
[ApiController]
[Route("api/[controller]")]
public class OrdersController : ControllerBase
{
    private readonly IOrderService _service;

    public OrdersController(IOrderService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetOrders([FromQuery] DataManagerRequest dm)
    {
        var orders = await _service.GetOrdersAsync();
        
        // Apply filtering
        if (dm.Where != null && dm.Where.Count > 0)
            orders = FilterHelper.ApplyFilters(orders, dm.Where);
        
        // Apply sorting
        if (dm.Sorted != null && dm.Sorted.Count > 0)
            orders = SortHelper.ApplySorting(orders, dm.Sorted);
        
        var totalCount = orders.Count();
        
        // Apply paging
        if (dm.Skip > 0)
            orders = orders.Skip(dm.Skip);
        
        orders = orders.Take(dm.Take);
        
        return Ok(new { result = orders, count = totalCount });
    }

    [HttpPost]
    public async Task<IActionResult> CreateOrder([FromBody] Order order)
    {
        var result = await _service.CreateOrderAsync(order);
        return Ok(result);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateOrder(int id, [FromBody] Order order)
    {
        order.OrderID = id;
        var result = await _service.UpdateOrderAsync(order);
        return Ok(result);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteOrder(int id)
    {
        await _service.DeleteOrderAsync(id);
        return Ok();
    }
}
```

---

## Custom Adaptor

> ⚠️ Security Note
> The following example is for illustration only.
> Applications must not directly fetch or trust third‑party API responses.
> All external data must be validated, sanitized, and constrained
> before being supplied to DataManager.

For complex scenarios requiring custom data handling.

### Setup

```cshtml
<ejs-grid id="Grid" allowPaging="true" allowSorting="true">
    <e-datamanager 
        url="javascript:customAdaptorMethods.read"
        insertUrl="javascript:customAdaptorMethods.create"
        updateUrl="javascript:customAdaptorMethods.update"
        removeUrl="javascript:customAdaptorMethods.delete"
        adaptor="CustomAdaptor">
    </e-datamanager>
    <e-grid-columns>
        <e-grid-column field="OrderID" headerText="Order ID" width="100"></e-grid-column>
        <e-grid-column field="CustomerID" headerText="Customer" width="120"></e-grid-column>
    </e-grid-columns>
</ejs-grid>

<script>
var customAdaptorMethods = {
    read: function(dm, done) {
        fetch('/api/custom/orders?skip=' + dm.skip + '&take=' + dm.take)
            .then(response => response.json())
            .then(data => done(data))
            .catch(error => console.error('Error:', error));
    },
    create: function(dm, done) {
        fetch('/api/custom/orders', {
            method: 'POST'
        })
        .then(response => response.json())
        .then(data => done(data))
        .catch(error => console.error('Error:', error));
    },
    update: function(dm, done) {
        fetch('/api/custom/orders/' + dm.value.OrderID, {
            method: 'PUT'
        })
        .then(response => response.json())
        .then(data => done(data))
        .catch(error => console.error('Error:', error));
    },
    delete: function(dm, done) {
        fetch('/api/custom/orders/' + dm.value[0].OrderID, {
            method: 'DELETE'
        })
        .then(() => done(null))
        .catch(error => console.error('Error:', error));
    }
};
</script>
```

---

## RemoteSave Adaptor

Processes data locally but persists changes to the server.

### Setup

```cshtml
<ejs-grid id="Grid" allowPaging="true" allowSorting="true" toolbar="@(new List<string>() { "Add", "Edit", "Delete", "Update", "Cancel" })">
    <e-datamanager url="/api/orders" updateUrl="/api/orders/batch" adaptor="RemoteSaveAdaptor"></e-datamanager>
    <e-grid-editSettings allowAdding="true" allowEditing="true" allowDeleting="true" mode="Batch"></e-grid-editSettings>
    <e-grid-columns>
        <e-grid-column field="OrderID" headerText="Order ID" isPrimaryKey="true" width="100"></e-grid-column>
        <e-grid-column field="CustomerID" headerText="Customer" width="120"></e-grid-column>
        <e-grid-column field="Freight" headerText="Freight" format="C2" width="100"></e-grid-column>
    </e-grid-columns>
</ejs-grid>
```

---

## Adaptor Comparison

| Feature | URL | ODataV4 | WebAPI | Custom | RemoteSave |
|---------|-----|---------|--------|--------|------------|
| **Read** | ✓ | ✓ | ✓ | ✓ | ✓ |
| **Create** | ✓ | ✓ | ✓ | ✓ | ✓ |
| **Update** | ✓ | ✓ | ✓ | ✓ | ✓ |
| **Delete** | ✓ | ✓ | ✓ | ✓ | ✓ |
| **Filtering** | ✓ | ✓ | Manual | Custom | Local |
| **Sorting** | ✓ | ✓ | Manual | Custom | Local |
| **Paging** | ✓ | ✓ | Manual | Custom | Local |
| **Standard Protocol** | REST | OData V4 | ASP.NET | Custom Logic | REST |

---

## Error Handling

### Grid-Level Error Handling

```cshtml
<ejs-grid id="Grid" 
          onActionFailure="onActionFailure"
          allowPaging="true">
    <e-datamanager url="/api/orders" adaptor="UrlAdaptor"></e-datamanager>
    <e-grid-columns>
        <e-grid-column field="OrderID" headerText="Order ID" width="100"></e-grid-column>
    </e-grid-columns>
</ejs-grid>

<script>
function onActionFailure(args) {
    console.error('Error occurred:', args.error);
    
    if (args.error.status === 401) {
        alert('Unauthorized. Please log in again.');
    } else if (args.error.status === 403) {
        alert('You do not have permission to perform this action.');
    } else if (args.error.status === 500) {
        alert('Server error. Please try again later.');
    } else {
        alert('An error occurred: ' + args.error.message);
    }
}
</script>
```

### Server-Side Error Response

```csharp
[HttpGet]
public IActionResult GetOrders()
{
    try
    {
        var orders = _service.GetOrders();
        return Ok(new { result = orders, count = orders.Count() });
    }
    catch (Exception ex)
    {
        return StatusCode(500, new { message = ex.Message });
    }
}
```

---

## Best Practices

1. **Choose the Right Adaptor**: Use ODataV4 for standards compliance, WebAPI for ASP.NET, Custom for complex logic
2. **Server-Side Filtering**: Always filter/sort/page on the server for large datasets
3. **Error Handling**: Implement comprehensive error handling on both client and server
4. **Authentication**: Secure endpoints with proper authentication (JWT, OAuth)
5. **CORS**: Configure CORS properly for cross-domain requests
6. **Caching**: Cache frequently accessed data client-side when appropriate
7. **Response Format**: Keep response payloads lean, include only necessary fields
8. **Pagination**: Always implement server-side paging for large datasets
9. **Query Optimization**: Optimize database queries to handle filters and sorts efficiently
10. **Rate Limiting**: Implement rate limiting to prevent abuse
