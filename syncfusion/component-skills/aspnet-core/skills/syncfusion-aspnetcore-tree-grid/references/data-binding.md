# Data Binding — Syncfusion ASP.NET Core TreeGrid

> **When to Use:** Configure how TreeGrid loads data (nested, flat, remote, Ajax). Choose binding mode based on data structure.

## Table of Contents
- [Local Data — childMapping (Nested)](#local-data--childmapping-nested)
- [Local Data — idMapping (Flat)](#local-data--idmapping-flat)
- [expandStateMapping](#expandstatemapping)
- [Remote Data with DataManager](#remote-data-with-datamanager)
- [Ajax / Fetch Binding](#ajax--fetch-binding)
- [Troubleshooting](#troubleshooting)

---

## Local Data — childMapping (Nested)

Use `childMapping` when each parent object contains a `List<T>` property holding its child records.

```cshtml
@{
    var data = SelfReferenceData.GetTree();
}

<ejs-treegrid id="TreeGrid" dataSource="@data" childMapping="SubTasks" treeColumnIndex="1" height="315">
    <e-treegrid-columns>
        <e-treegrid-column field="TaskId"   headerText="Task ID"   isPrimaryKey="true" textAlign="Right" width="90"></e-treegrid-column>
        <e-treegrid-column field="TaskName" headerText="Task Name" width="190"></e-treegrid-column>
        <e-treegrid-column field="Duration" headerText="Duration"  textAlign="Right" width="110"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>
```

**Model:**
```csharp
public class SelfReferenceData
{
    public int TaskId { get; set; }
    public string TaskName { get; set; }
    public int Duration { get; set; }
    public List<SelfReferenceData> SubTasks { get; set; }

    public static List<SelfReferenceData> GetTree()
    {
        return new List<SelfReferenceData>
        {
            new SelfReferenceData
            {
                TaskId = 1, TaskName = "Parent Task 1", Duration = 10,
                SubTasks = new List<SelfReferenceData>
                {
                    new SelfReferenceData { TaskId = 2, TaskName = "Child Task 1", Duration = 4 },
                    new SelfReferenceData { TaskId = 3, TaskName = "Child Task 2", Duration = 6 }
                }
            }
        };
    }
}
```

---

## Local Data — idMapping (Flat)

Use `idMapping` + `parentIdMapping` when the data is a flat list with parent-ID references. Root records have `null` or `0` as parent ID.

```cshtml
@{
    var data = FlatData.GetData();
}

<ejs-treegrid id="TreeGrid" dataSource="@data"
              idMapping="TaskId" parentIdMapping="ParentId"
              treeColumnIndex="1" height="315">
    <e-treegrid-columns>
        <e-treegrid-column field="TaskId"   headerText="Task ID"   isPrimaryKey="true" textAlign="Right" width="90"></e-treegrid-column>
        <e-treegrid-column field="TaskName" headerText="Task Name" width="190"></e-treegrid-column>
        <e-treegrid-column field="Duration" headerText="Duration"  textAlign="Right" width="110"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>
```

**Model:**
```csharp
public class FlatData
{
    public int TaskId { get; set; }
    public string TaskName { get; set; }
    public int? ParentId { get; set; }
    public int Duration { get; set; }

    public static List<FlatData> GetData()
    {
        return new List<FlatData>
        {
            new FlatData { TaskId = 1, TaskName = "Parent Task",   ParentId = null, Duration = 10 },
            new FlatData { TaskId = 2, TaskName = "Child Task 1",  ParentId = 1,    Duration = 4 },
            new FlatData { TaskId = 3, TaskName = "Child Task 2",  ParentId = 1,    Duration = 6 }
        };
    }
}
```

> Do NOT use `childMapping` and `idMapping` simultaneously — this causes a runtime error.

---

## expandStateMapping

Map a boolean field in your data source that controls whether a parent row renders expanded or collapsed initially.

```cshtml
<ejs-treegrid id="TreeGrid" dataSource="@data" childMapping="Children"
              treeColumnIndex="1" expandStateMapping="IsExpanded">
    <e-treegrid-columns>
        <e-treegrid-column field="TaskId"   headerText="Task ID"   width="90"></e-treegrid-column>
        <e-treegrid-column field="TaskName" headerText="Task Name" width="190"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>
```

**Model:**
```csharp
public class TreeData
{
    public int TaskId { get; set; }
    public string TaskName { get; set; }
    public bool IsExpanded { get; set; }
    public List<TreeData> Children { get; set; }
}
```

When `IsExpanded = false`, the parent row renders collapsed. When `true`, it renders expanded.

---

## Remote Data with DataManager

Bind remote data using `DataManager` with an appropriate adaptor (ODataV4, WebApiAdaptor, etc.):

```cshtml
@using Syncfusion.EJ2
@using Syncfusion.EJ2.Data

@{
    var dataManager = new DataManager
    {
        Url = "/api/treegrid",
        Adaptor = "WebApiAdaptor"
    };
}

<ejs-treegrid id="TreeGrid" dataSource="@dataManager"
              idMapping="TaskId" parentIdMapping="ParentId"
              treeColumnIndex="1" hasChildMapping="IsParent" height="315">
    <e-treegrid-columns>
        <e-treegrid-column field="TaskId"   headerText="Task ID"   isPrimaryKey="true" width="90"></e-treegrid-column>
        <e-treegrid-column field="TaskName" headerText="Task Name" width="190"></e-treegrid-column>
        <e-treegrid-column field="Duration" headerText="Duration"  textAlign="Right" width="110"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>
```

- `hasChildMapping` — property that indicates whether a record has children (for lazy loading)
- The server API should return data in the expected format for the selected adaptor

---

## Ajax / Fetch Binding

Fetch data asynchronously and assign it programmatically. This acts like local data — server-side CRUD is not supported this way.

```cshtml
<ejs-treegrid id="TreeGrid" treeColumnIndex="1" childMapping="Children" height="315">
    <e-treegrid-columns>
        <e-treegrid-column field="TaskId"   headerText="Task ID"   isPrimaryKey="true" width="90"></e-treegrid-column>
        <e-treegrid-column field="TaskName" headerText="Task Name" width="190"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>

<script>
    fetch('/api/treedata')
        .then(response => response.json())
        .then(data => {
            var grid = document.getElementById('TreeGrid').ej2_instances[0];
            grid.dataSource = data;
        });
</script>
```

---

## Load Child On Demand (Remote)

For remote data, parent rows render collapsed by default. Set `loadChildOnDemand="false"` to load all children during initial render:

```cshtml
<ejs-treegrid id="TreeGrid" idMapping="TaskID" parentIdMapping="ParentItem"
              loadChildOnDemand="false" allowSorting="true" treeColumnIndex="1" height="400">
    <e-data-manager url="/Home/DataSource" adaptor="UrlAdaptor"></e-data-manager>
    <e-treegrid-columns>
        <e-treegrid-column field="TaskID" headerText="Task ID" textAlign="Right" width="90"></e-treegrid-column>
        <e-treegrid-column field="TaskName" headerText="Task Name" width="180"></e-treegrid-column>
        <e-treegrid-column field="Duration" headerText="Duration" textAlign="Right" width="90"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>
```

> **Note:** Server must handle child record requests and CRUD operations when `loadChildOnDemand` is enabled.

---

## Offline Mode (Remote Cache)

Load all remote data once and cache locally for client-side paging/sorting without additional server calls:

```cshtml
<ejs-treegrid id="TreeGrid" idMapping="TaskID" height="260" parentIdMapping="ParentItem" treeColumnIndex="1">
    <e-data-manager url="services.syncfusion.com/aspnet/production/api/SelfReferenceData"
                    adaptor="WebApiAdaptor" offline="true" crossDomain="true"></e-data-manager>
    <e-treegrid-columns>
        <e-treegrid-column field="TaskID" headerText="Task ID" textAlign="Right" width="90"></e-treegrid-column>
        <e-treegrid-column field="TaskName" headerText="Task Name" width="180"></e-treegrid-column>
        <e-treegrid-column field="StartDate" headerText="Start Date" textAlign="Right" format="yMd" type="date" width="90"></e-treegrid-column>
        <e-treegrid-column field="Duration" headerText="Duration" textAlign="Right" width="80"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>
```

---

## Custom Adaptor

Extend built-in adaptors to customize request/response processing (e.g., serial numbers, custom headers):

```cshtml
<ejs-treegrid id="TreeGrid" idMapping="TaskID" parentIdMapping="ParentItem" created="created" treeColumnIndex="1">
    <e-treegrid-columns>
        <e-treegrid-column field="Sno"      headerText="S.No" textAlign="Right" width="90"></e-treegrid-column>
        <e-treegrid-column field="TaskID" headerText="Task ID" textAlign="Right" width="90"></e-treegrid-column>
        <e-treegrid-column field="TaskName" headerText="Task Name" width="180"></e-treegrid-column>
        <e-treegrid-column field="StartDate" headerText="Start Date" textAlign="Right" format="yMd" type="date" width="90"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>

<script>
    function created(args) {
        class SerialNoAdaptor extends ej.data.ODataAdaptor {
            processResponse() {
                var i = 0;
                var original = super.processResponse.apply(this, arguments);
                if (!ej.base.isNullOrUndefined(original.result)) {
                    original.result.forEach(function (item) { item['Sno'] = ++i });
                    return { result: original.result, count: original.count };
                }
                return original;
            }
        }
        var treegrid = document.querySelector('#TreeGrid').ej2_instances[0];
        treegrid.dataSource = new ej.data.DataManager({
            url: "services.syncfusion.com/aspnet/production/api/SelfReferenceData",
            adaptor: new SerialNoAdaptor()
        });
    }
</script>
```

---

## Sending Additional Parameters

Add custom parameters to server requests using `Query`:

```cshtml
<ejs-treegrid id="TreeGrid" idMapping="TaskID" query="new ej.data.Query().addParams('ej2treegrid', 'true')"
              height="260" parentIdMapping="ParentItem" treeColumnIndex="1" hasChildMapping="isParent">
    <e-data-manager url="ej2services.syncfusion.com/production/web-services/api/SelfReferenceData" adaptor="WebApiAdaptor" crossDomain="true"></e-data-manager>
    <e-treegrid-columns>
        <e-treegrid-column field="TaskID" headerText="Task ID" textAlign="Right" width="90"></e-treegrid-column>
        <e-treegrid-column field="TaskName" headerText="Task Name" width="180"></e-treegrid-column>
        <e-treegrid-column field="StartDate" headerText="Start Date" textAlign="Right" format="yMd" type="date" width="90"></e-treegrid-column>
        <e-treegrid-column field="Duration" headerText="Duration" textAlign="Right" width="80"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>
```

Server receives: `?ej2treegrid=true&$skip=0&$top=12...`

---

## Handling HTTP Errors (Remote)

Use `actionFailure` event to catch server errors during remote binding:

```cshtml
<ejs-treegrid id="TreeGrid" idMapping="TaskID" parentIdMapping="ParentItem"
              actionFailure="actionFailure" treeColumnIndex="1" hasChildMapping="isParent">
    <e-data-manager url="some.com/invalidUrl"></e-data-manager>
    <e-treegrid-columns>
        <e-treegrid-column field="TaskID" headerText="Task ID" textAlign="Right" width="90"></e-treegrid-column>
        <e-treegrid-column field="TaskName" headerText="Task Name" width="180"></e-treegrid-column>
        <e-treegrid-column field="StartDate" headerText="Start Date" textAlign="Right" format="yMd" type="date" width="90"></e-treegrid-column>
        <e-treegrid-column field="Duration" headerText="Duration" textAlign="Right" width="80"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>

<script>
    function actionFailure(e) {
        console.error('Server error: ' + e.error[0]);
    }
</script>
```

---

## Load on Demand with Virtualization

Combine `loadChildOnDemand="true"` and `enableVirtualization="true"` to efficiently load large hierarchies:

```cshtml
<ejs-treegrid id="TreeGrid" idMapping="TaskID" parentIdMapping="ParentValue"allowFiltering="true"
              loadChildOnDemand="true" expandStateMapping="IsExpanded" allowSorting="true"
              enableVirtualization="true" hasChildMapping="isParent" treeColumnIndex="1" height="400">
    <e-data-manager url="/Home/DataSource" adaptor="UrlAdaptor" insertUrl="/Home/Insert"
                    updateUrl="/Home/Update" removeUrl="/Home/Delete"></e-data-manager>
    <e-treegrid-pagesettings pageSize="30"></e-treegrid-pagesettings>
    <e-treegrid-editsettings allowAdding="true" allowEditing="true" allowDeleting="true" newRowPosition="Below"></e-treegrid-editsettings>
    <e-treegrid-columns>
        <e-treegrid-column field="TaskID" headerText="ID" isPrimaryKey="true" textAlign="Left" width="40"></e-treegrid-column>
        <e-treegrid-column field="TaskName" headerText="Name" textAlign="Left" width="95"></e-treegrid-column>
        <e-treegrid-column field="Duration" headerText="Tag Data" textAlign="Left" width="95"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>
```

---

## Troubleshooting

| Problem | Cause | Fix |
|---------|-------|-----|
| No child rows shown | `childMapping` property name mismatch | Match property name exactly (case-sensitive) |
| All rows appear as root | Using flat data but `childMapping` set | Switch to `idMapping` + `parentIdMapping` |
| Runtime error on edit | `idMapping` and `childMapping` both set | Use only one at a time |
| Expand/collapse not working | `treeColumnIndex` exceeds column count | Set `treeColumnIndex` to a valid 0-based index |
