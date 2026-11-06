# Data Binding

Complete guide to binding data to the Kanban control using local data, remote services, and various data adaptors.

## Table of Contents
- [Overview](#overview)
- [Local Data](#local-data)
- [Remote Data](#remote-data)
- [OData Services](#odata-services)
- [OData v4 Services](#odata-v4-services)
- [Web API](#web-api)
- [URL Adaptor for CRUD](#url-adaptor-for-crud)
- [Custom Adaptor](#custom-adaptor)

## Overview

The Kanban uses `DataManager`, which supports both RESTful data service binding and JavaScript object array binding. The `dataSource` property can be assigned:
- JavaScript object array (local data)
- `DataManager` instance (local or remote data)

**Supported data binding methods:**
1. **Local data**: JavaScript arrays
2. **Remote data**: REST APIs, OData services, Web APIs

## Local Data

Bind local JSON data by assigning a JavaScript object array to the `dataSource` property.

### Basic Local Data Binding

```typescript
import { Kanban } from '@syncfusion/ej2-kanban';
import { kanbanData } from './datasource';

const kanbanObj: Kanban = new Kanban({
    dataSource: kanbanData,  // Simple array assignment
    keyField: 'Status',
    columns: [
        { headerText: 'Backlog', keyField: 'Open' },
        { headerText: 'In Progress', keyField: 'InProgress' },
        { headerText: 'Testing', keyField: 'Testing' },
        { headerText: 'Done', keyField: 'Close' }
    ],
    cardSettings: {
        contentField: 'Summary',
        headerField: 'Id'
    }
});
kanbanObj.appendTo('#Kanban');
```

### Using DataManager with Local Data

```typescript
import { Kanban } from '@syncfusion/ej2-kanban';
import { DataManager, JsonAdaptor } from '@syncfusion/ej2-data';
import { kanbanData } from './datasource';

const dataManager: DataManager = new DataManager({
    json: kanbanData,
    adaptor: new JsonAdaptor()
});

const kanbanObj: Kanban = new Kanban({
    dataSource: dataManager,
    keyField: 'Status',
    columns: [
        { headerText: 'Backlog', keyField: 'Open' },
        { headerText: 'In Progress', keyField: 'InProgress' },
        { headerText: 'Testing', keyField: 'Testing' },
        { headerText: 'Done', keyField: 'Close' }
    ],
    cardSettings: {
        contentField: 'Summary',
        headerField: 'Id'
    }
});
kanbanObj.appendTo('#Kanban');
```

> **Note:** By default, `DataManager` uses `JsonAdaptor` for binding local data.

### Local Data Structure Example

```typescript
export const kanbanData: Object[] = [
    {
        Id: 1,
        Status: 'Open',
        Summary: 'Analyze the new requirements gathered from the customer.',
        Type: 'Story',
        Priority: 'Low',
        Tags: 'Analyze,Customer',
        Estimate: 3.5,
        Assignee: 'Nancy Davloio',
        RankId: 1
    },
    {
        Id: 2,
        Status: 'InProgress',
        Summary: 'Improve application performance',
        Type: 'Improvement',
        Priority: 'Normal',
        Tags: 'Improvement',
        Estimate: 6,
        Assignee: 'Andrew Fuller',
        RankId: 1
    },
    {
        Id: 3,
        Status: 'Testing',
        Summary: 'Fix the issues reported by the customer.',
        Type: 'Bug',
        Priority: 'High',
        Tags: 'Customer',
        Estimate: 3.5,
        Assignee: 'Steven Walker',
        RankId: 1
    }
];
```

## Remote Data

Bind remote data by assigning a `DataManager` instance with service endpoint URL.

### Basic Remote Data Binding

```typescript
import { Kanban, DialogEventArgs } from '@syncfusion/ej2-kanban';
import { DataManager, ODataAdaptor } from '@syncfusion/ej2-data';

const dataManager: DataManager = new DataManager({
    url: 'https://services.syncfusion.com/js/production/api/Kanban',
    adaptor: new ODataAdaptor()
});

const kanbanObj: Kanban = new Kanban({
    dataSource: dataManager,
    keyField: 'Status',
    columns: [
        { headerText: 'Backlog', keyField: 'Open' },
        { headerText: 'In Progress', keyField: 'InProgress' },
        { headerText: 'Testing', keyField: 'Testing' },
        { headerText: 'Done', keyField: 'Close' }
    ],
    cardSettings: {
        contentField: 'Summary',
        headerField: 'Id'
    },
    allowDragAndDrop: false,
    dialogOpen: (args: DialogEventArgs): void => {
        args.cancel = true;  // Disable dialog for read-only remote data
    }
});
kanbanObj.appendTo('#Kanban');
```

> **Note:** By default, `DataManager` uses `ODataAdaptor` for remote data binding.

**Why disable dialog:** In this example, `dialogOpen` is cancelled to prevent add/edit/delete operations on remote data without proper CRUD setup.

## OData Services

OData is a standardized protocol for creating and consuming data. Retrieve data from OData services using `DataManager` with `ODataAdaptor`.

### OData Example

```typescript
import { Kanban, DialogEventArgs } from '@syncfusion/ej2-kanban';
import { DataManager, ODataAdaptor } from '@syncfusion/ej2-data';

const dataManager: DataManager = new DataManager({
    url: 'https://services.syncfusion.com/js/production/api/Kanban',
    adaptor: new ODataAdaptor(),
    crossDomain: true
});

const kanbanObj: Kanban = new Kanban({
    dataSource: dataManager,
    keyField: 'Status',
    columns: [
        { headerText: 'Backlog', keyField: 'Open' },
        { headerText: 'In Progress', keyField: 'InProgress' },
        { headerText: 'Testing', keyField: 'Testing' },
        { headerText: 'Done', keyField: 'Close' }
    ],
    cardSettings: {
        contentField: 'Summary',
        headerField: 'Id'
    },
    allowDragAndDrop: false,
    dialogOpen: (args: DialogEventArgs): void => {
        args.cancel = true;
    }
});
kanbanObj.appendTo('#Kanban');
```

**DataManager configuration:**
- `url`: OData service endpoint
- `adaptor`: `ODataAdaptor` for OData protocol
- `crossDomain`: `true` if the service is on a different domain

## OData v4 Services

ODataV4 is an improved version of OData protocols. Use `ODataV4Adaptor` for OData v4 services.

### OData v4 Example

```typescript
import { Kanban, DialogEventArgs } from '@syncfusion/ej2-kanban';
import { DataManager, ODataV4Adaptor } from '@syncfusion/ej2-data';

const dataManager: DataManager = new DataManager({
    url: 'https://services.odata.org/v4/northwind/northwind.svc/Suppliers',
    adaptor: new ODataV4Adaptor()
});

const kanbanObj: Kanban = new Kanban({
    dataSource: dataManager,
    keyField: 'ContactTitle',
    columns: [
        { headerText: 'Order Administrator', keyField: 'Order Administrator' },
        { headerText: 'Sales Representative', keyField: 'Sales Representative' },
        { headerText: 'Export Administrator', keyField: 'Export Administrator' }
    ],
    cardSettings: {
        contentField: 'ContactName',
        headerField: 'SupplierID'
    },
    allowDragAndDrop: false,
    dialogOpen: (args: DialogEventArgs): void => {
        args.cancel = true;
    }
});
kanbanObj.appendTo('#Kanban');
```

**Differences from OData v3:**
- Uses `ODataV4Adaptor` instead of `ODataAdaptor`
- URL format follows OData v4 conventions
- Enhanced query capabilities

## Web API

Bind Kanban to Web API created using OData endpoint with `WebApiAdaptor`.

### Web API Example

```typescript
import { Kanban, DialogEventArgs } from '@syncfusion/ej2-kanban';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';

const dataManager: DataManager = new DataManager({
    url: '/api/Tasks',
    adaptor: new WebApiAdaptor()
});

const kanbanObj: Kanban = new Kanban({
    dataSource: dataManager,
    keyField: 'Status',
    columns: [
        { headerText: 'Backlog', keyField: 'Open' },
        { headerText: 'In Progress', keyField: 'InProgress' },
        { headerText: 'Testing', keyField: 'Testing' },
        { headerText: 'Done', keyField: 'Close' }
    ],
    cardSettings: {
        contentField: 'Summary',
        headerField: 'Id'
    },
    allowDragAndDrop: false,
    dialogOpen: (args: DialogEventArgs): void => {
        args.cancel = true;
    }
});
kanbanObj.appendTo('#Kanban');
```

### Server-Side Controller (C#)

```csharp
[HttpGet]
public object Get()
{
    var data = OrdersDetails.GetAllRecords().ToList();
    return data;
}
```

**WebApiAdaptor features:**
- Works with ASP.NET Web API controllers
- Supports standard RESTful conventions
- Handles CRUD operations automatically

## URL Adaptor for CRUD

Perform CRUD (Create, Read, Update, Delete) operations using `UrlAdaptor` with specific server endpoints.

### UrlAdaptor Configuration

```typescript
import { Kanban } from '@syncfusion/ej2-kanban';
import { DataManager, UrlAdaptor } from '@syncfusion/ej2-data';

const dataManager: DataManager = new DataManager({
    url: 'Home/DataSource',      // Read endpoint
    updateUrl: 'Home/Update',     // Update endpoint
    insertUrl: 'Home/Insert',     // Create endpoint
    removeUrl: 'Home/Delete',     // Delete endpoint
    adaptor: new UrlAdaptor(),
    crossDomain: true
});

const kanbanObj: Kanban = new Kanban({
    dataSource: dataManager,
    keyField: 'Status',
    columns: [
        { headerText: 'Backlog', keyField: 'Open' },
        { headerText: 'In Progress', keyField: 'InProgress' },
        { headerText: 'Testing', keyField: 'Testing' },
        { headerText: 'Done', keyField: 'Close' }
    ],
    cardSettings: {
        contentField: 'Summary',
        headerField: 'Id'
    }
});
kanbanObj.appendTo('#Kanban');
```

### CRUD URL Properties

| Property | Purpose | Operation |
|----------|---------|-----------|
| `url` | Read data | GET request to fetch all cards |
| `insertUrl` | Create card | POST request with new card data |
| `updateUrl` | Update card | PUT/POST request with modified card data |
| `removeUrl` | Delete card | DELETE request with card identifier |
| `crudUrl` | Bulk operations | Batch create/update/delete operations |

### Server-Side Controller Example (C#)

```csharp
private NORTHWNDEntities db = new NORTHWNDEntities();

// Read: Get all tasks
public ActionResult DataSource()
{
    var dataSource = db.Tasks.ToList();
    return Json(dataSource, JsonRequestBehavior.AllowGet);
}

// Create: Insert new card
public ActionResult Insert(Params value)
{
    // Insert card data into the database
    db.Tasks.Add(new Task {
        Id = value.Id,
        Status = value.Status,
        Summary = value.Summary,
        Assignee = value.Assignee
    });
    db.SaveChanges();
    return Json(value, JsonRequestBehavior.AllowGet);
}

// Update: Modify existing card
public ActionResult Update(Params value)
{
    // Update card data in the database
    var task = db.Tasks.Find(value.Id);
    if (task != null)
    {
        task.Status = value.Status;
        task.Summary = value.Summary;
        task.Assignee = value.Assignee;
        db.SaveChanges();
    }
    return Json(value, JsonRequestBehavior.AllowGet);
}

// Delete: Remove card
public void Delete(Params value)
{
    // Delete card data from the database
    var task = db.Tasks.Find(value.Id);
    if (task != null)
    {
        db.Tasks.Remove(task);
        db.SaveChanges();
    }
}

// Model for parameters
public class Params
{
    public int Id { get; set; }
    public string Status { get; set; }
    public string Summary { get; set; }
    public string Assignee { get; set; }
}
```

### Bulk Operations with crudUrl

```typescript
const dataManager: DataManager = new DataManager({
    crudUrl: 'Home/BatchUpdate',  // Single endpoint for all operations
    adaptor: new UrlAdaptor(),
    crossDomain: true
});

const kanbanObj: Kanban = new Kanban({
    dataSource: dataManager,
    keyField: 'Status',
    columns: [
        { headerText: 'Backlog', keyField: 'Open' },
        { headerText: 'In Progress', keyField: 'InProgress' },
        { headerText: 'Testing', keyField: 'Testing' },
        { headerText: 'Done', keyField: 'Close' }
    ],
    cardSettings: {
        contentField: 'Summary',
        headerField: 'Id'
    }
});
kanbanObj.appendTo('#Kanban');
```

> **Note:** The `crudUrl` is used to update bulk data sent to the server. This is useful with multiple card selection and batch operations.

## Custom Adaptor

Create custom adaptors by extending built-in adaptors to add custom logic or modify data processing.

### Custom Adaptor Example

```typescript
import { Kanban } from '@syncfusion/ej2-kanban';
import { DataManager, ODataAdaptor } from '@syncfusion/ej2-data';

// Extend ODataAdaptor to add custom field
class TaskIdAdaptor extends ODataAdaptor {
    processResponse(): Object {
        let i: number = 0;
        // Call base class processResponse function
        const original: Object[] = super.processResponse.apply(this, arguments);
        
        // Add custom Task Id field to each item
        original.forEach((item: { [key: string]: Object }) => {
            item['Id'] = 'Task - ' + ++i;
        });
        
        return original;
    }
}

const dataManager: DataManager = new DataManager({
    url: 'https://services.syncfusion.com/js/production/api/Kanban',
    adaptor: new TaskIdAdaptor()  // Use custom adaptor
});

const kanbanObj: Kanban = new Kanban({
    dataSource: dataManager,
    keyField: 'Status',
    columns: [
        { headerText: 'Backlog', keyField: 'Open' },
        { headerText: 'In Progress', keyField: 'InProgress' },
        { headerText: 'Testing', keyField: 'Testing' },
        { headerText: 'Done', keyField: 'Close' }
    ],
    cardSettings: {
        contentField: 'Summary',
        headerField: 'Id'
    }
});
kanbanObj.appendTo('#Kanban');
```

### Custom Adaptor Use Cases

1. **Transform data format**: Convert server response to Kanban-expected format
2. **Add computed fields**: Calculate derived values from existing data
3. **Filter sensitive data**: Remove fields before displaying
4. **Custom authentication**: Add headers or tokens to requests
5. **Error handling**: Implement custom retry logic or error messages

### Override Methods

| Method | Purpose |
|--------|---------|
| `processResponse()` | Modify data received from server |
| `processQuery()` | Customize query parameters sent to server |
| `insert()` | Custom insert logic |
| `update()` | Custom update logic |
| `remove()` | Custom delete logic |

## Data Binding Best Practices

1. **Use appropriate adaptor**: Match adaptor to your backend API protocol
2. **Handle errors gracefully**: Implement error handling for network failures
3. **Optimize data size**: Fetch only required fields, use pagination if needed
4. **Secure endpoints**: Use authentication/authorization for CRUD operations
5. **Test CRUD operations**: Verify all create, update, and delete operations work correctly
6. **Consider caching**: For static data, cache responses to reduce server calls
7. **Use batch operations**: For multiple changes, use `crudUrl` for better performance

## Troubleshooting

**Data not loading:**
- Verify URL is correct and accessible
- Check network tab in browser developer tools
- Ensure CORS is configured if cross-domain
- Verify adaptor matches server API type

**CRUD operations not working:**
- Check that CRUD URLs are correctly configured
- Verify server endpoints accept expected HTTP methods
- Ensure data format matches server expectations
- Check authentication/authorization is properly set up

**Performance issues:**
- Limit data size with server-side filtering
- Implement pagination for large datasets
- Use virtual scrolling for many cards
- Optimize server response time

**Custom adaptor not working:**
- Verify method overrides are correct
- Check `super` calls for inherited functionality
- Test with console.log to debug data transformations
- Ensure return types match expected formats
