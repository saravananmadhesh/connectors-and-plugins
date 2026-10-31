# Data Binding in Syncfusion ASP.NET Core Kanban

## Table of Contents
- [Local Data Binding](#local-data-binding)
- [Remote Data with e-data-manager](#remote-data-with-e-data-manager)
- [OData and ODataV4 Adaptor](#odata-and-odatav4-adaptor)
- [WebAPI Adaptor](#webapi-adaptor)
- [UrlAdaptor with CRUD](#urladaptor-with-crud)
- [Custom Adaptor](#custom-adaptor)
- [Error Handling](#error-handling)

## Local Data Binding

Pass a C# collection via `ViewBag` and assign to `dataSource`:

```html
<ejs-kanban id="Kanban" keyField="Status" dataSource="@ViewBag.data">
    <e-kanban-columns>
        <e-kanban-column headerText="To Do" keyField="Open"></e-kanban-column>
        <e-kanban-column headerText="In Progress" keyField="InProgress"></e-kanban-column>
        <e-kanban-column headerText="Done" keyField="Close"></e-kanban-column>
    </e-kanban-columns>
    <e-kanban-cardsettings contentField="Summary" headerField="Title"></e-kanban-cardsettings>
</ejs-kanban>
```

```csharp
public IActionResult Index()
{
    ViewBag.data = new KanbanDataModels().KanbanTasks();
    return View();
}
```

Use local binding when all data is available server-side at page load. The data is serialized into the page as JSON.

## Remote Data with e-data-manager

Replace `dataSource` attribute with a nested `<e-data-manager>` tag helper:

```html
<ejs-kanban id="Kanban" keyField="Status">
    <e-data-manager url="https://services.syncfusion.com/aspnetcore/api/Kanban"
        adaptor="ODataAdaptor" crossDomain="true"></e-data-manager>
    <e-kanban-columns>
        <e-kanban-column headerText="To Do" keyField="Open"></e-kanban-column>
        <e-kanban-column headerText="In Progress" keyField="InProgress"></e-kanban-column>
        <e-kanban-column headerText="Done" keyField="Close"></e-kanban-column>
    </e-kanban-columns>
    <e-kanban-cardsettings contentField="Summary" headerField="Title"></e-kanban-cardsettings>
</ejs-kanban>
```

- Remove `dataSource` from `<ejs-kanban>` when using `<e-data-manager>`
- The Kanban makes HTTP requests per column to load cards lazily

## OData and ODataV4 Adaptor

Use `ODataAdaptor` for OData v3 endpoints or `ODataV4Adaptor` for v4:

```html
<ejs-kanban id="Kanban" keyField="Status">
    <e-data-manager url="https://services.syncfusion.com/aspnetcore/api/Kanban"
        adaptor="ODataV4Adaptor" crossDomain="true"></e-data-manager>
    <e-kanban-columns>
        <e-kanban-column headerText="To Do" keyField="Open"></e-kanban-column>
        <e-kanban-column headerText="In Progress" keyField="InProgress"></e-kanban-column>
        <e-kanban-column headerText="Done" keyField="Close"></e-kanban-column>
    </e-kanban-columns>
    <e-kanban-cardsettings contentField="Summary" headerField="Title"></e-kanban-cardsettings>
</ejs-kanban>
```

- `crossDomain="true"` — required when calling a different domain or port
- The adaptor automatically formats query parameters per OData spec

## WebAPI Adaptor

Use `WebApiAdaptor` for ASP.NET Web API or minimal API endpoints:

```html
<ejs-kanban id="Kanban" keyField="Status">
    <e-data-manager url="/api/tasks" adaptor="WebApiAdaptor"></e-data-manager>
    <e-kanban-columns>
        <e-kanban-column headerText="To Do" keyField="Open"></e-kanban-column>
        <e-kanban-column headerText="In Progress" keyField="InProgress"></e-kanban-column>
        <e-kanban-column headerText="Done" keyField="Close"></e-kanban-column>
    </e-kanban-columns>
    <e-kanban-cardsettings contentField="Summary" headerField="Title"></e-kanban-cardsettings>
</ejs-kanban>
```

**Minimal API endpoint:**

```csharp
app.MapGet("/api/tasks", (AppDbContext db) => db.KanbanCards.ToList());
```

## UrlAdaptor with CRUD

Use `UrlAdaptor` when the server needs to handle all data operations via explicit POST endpoints:

```html
<ejs-kanban id="Kanban" keyField="Status">
    <e-data-manager url="/Home/LoadData" adaptor="UrlAdaptor"
        crudUrl="/Home/UpdateData"></e-data-manager>
    <e-kanban-columns>
        <e-kanban-column headerText="To Do" keyField="Open"></e-kanban-column>
        <e-kanban-column headerText="In Progress" keyField="InProgress"></e-kanban-column>
        <e-kanban-column headerText="Done" keyField="Close"></e-kanban-column>
    </e-kanban-columns>
    <e-kanban-cardsettings contentField="Summary" headerField="Title"></e-kanban-cardsettings>
    <e-kanban-dialogsettings fields="@ViewBag.dialogFields"></e-kanban-dialogsettings>
</ejs-kanban>
```

**Server-side CRUD handler (`HomeController.cs`):**

```csharp
public class EditParams
{
    public string key { get; set; }
    public string action { get; set; }
    public List<KanbanDataModels> added { get; set; }
    public List<KanbanDataModels> changed { get; set; }
    public List<KanbanDataModels> deleted { get; set; }
    public KanbanDataModels value { get; set; }
}

public IActionResult UpdateData([FromBody] EditParams param)
{
    if (param.action == "insert" || (param.action == "batch" && param.added != null))
    {
        // Handle insert: param.value (single) or param.added (batch)
    }
    if (param.action == "update" || (param.action == "batch" && param.changed != null))
    {
        // Handle update: param.value (single) or param.changed (batch)
    }
    if (param.action == "remove" || (param.action == "batch" && param.deleted != null))
    {
        // Handle delete: param.key (single ID) or param.deleted (batch)
    }
    return Json(param.value ?? (object)param.added);
}
```

- `crudUrl` — single endpoint that receives all CRUD actions
- Alternatively use `insertUrl`, `updateUrl`, `removeUrl` for separate endpoints
- `EditParams.action` values: `"insert"`, `"update"`, `"remove"`, `"batch"`

## Custom Adaptor

Extend `ej.data.UrlAdaptor` in JavaScript to add custom request/response logic:

```html
<ejs-kanban id="Kanban" keyField="Status">
    <e-data-manager adaptor="customAdaptor"></e-data-manager>
    <e-kanban-columns>
        <e-kanban-column headerText="To Do" keyField="Open"></e-kanban-column>
        <e-kanban-column headerText="Done" keyField="Close"></e-kanban-column>
    </e-kanban-columns>
    <e-kanban-cardsettings contentField="Summary" headerField="Title"></e-kanban-cardsettings>
</ejs-kanban>
<script>
    var customAdaptor = new ej.data.UrlAdaptor();
    // Override processResponse to transform server response
    customAdaptor.processResponse = function(data, ds, query, xhr, request, changes) {
        // Custom transformation logic
        return ej.data.UrlAdaptor.prototype.processResponse.call(
            this, data, ds, query, xhr, request, changes
        );
    };
</script>
```

## Error Handling

Handle data load failures with the `actionFailure` event:

```html
<ejs-kanban id="Kanban" keyField="Status" actionFailure="onActionFailure">
    <e-data-manager url="/api/tasks" adaptor="ODataV4Adaptor"></e-data-manager>
    <e-kanban-columns>
        <e-kanban-column headerText="To Do" keyField="Open"></e-kanban-column>
        <e-kanban-column headerText="Done" keyField="Close"></e-kanban-column>
    </e-kanban-columns>
    <e-kanban-cardsettings contentField="Summary" headerField="Title"></e-kanban-cardsettings>
</ejs-kanban>
<script>
    function onActionFailure(args) {
        console.error('Kanban data load failed:', args.error);
        // Show user-friendly error message
    }
</script>
```

The `actionFailure` event fires when any data manager request fails (network error, server error, etc.). The `args.error` property contains the error details.
