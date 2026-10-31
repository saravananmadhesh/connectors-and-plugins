# Data Binding in Syncfusion ASP.NET MVC Diagram

## Table of Contents
- [Local Data Binding](#local-data-binding)
- [DataSourceSettings Configuration](#datasourcesettings-configuration)
- [Combining Data Binding with Layout](#combining-data-binding-with-layout)
- [Customizing Node Appearance from Data](#customizing-node-appearance-from-data)
- [Remote Data Binding](#remote-data-binding)
- [Connector Data Source](#connector-data-source)
- [CRUD Operations](#crud-operations)
- [Runtime Data Operations](#runtime-data-operations)

## Local Data Binding

Bind a list of C# objects to auto-generate nodes and connectors:


```csharp
// Model
using EJ2MVCSampleBrowser.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace EJ2MVCSampleBrowser.Controllers.Diagram
{
    public partial class DiagramController : Controller
    {
        // GET: HierarchicalLayoutWithMultipleRoots
        public ActionResult Index()
        {
            ViewData["Nodes"] = HierarchicalMultipleRoots.GetAllRecords();
            ViewData["getConnectorDefaults"] = "ConnectorDefaults";
            ViewData["getNodeDefaults"] = "nodeDefaults";
            return View();
        }

    }
}
```

Under Models/HierarchicalMultipleRoots.cs

```cs
 public class HierarchicalMultipleRoots
 {
     public string Id { get; set; }
     public string Label { get; set; }
     public string ParentId { get; set; }

     public HierarchicalMultipleRoots(string id, string label, string parentId)
     {
         Id = id;
         Label = label;
         ParentId = parentId;
     }

     public static List<HierarchicalMultipleRoots> GetAllRecords()
     {
         return new List<HierarchicalMultipleRoots>
         {
             new("1", "Production Manager", ""),
             new("2", "Control Room", "1"),
             new("3", "Plant Operator", "1"),
             new("4", "Foreman", "2"),
             new("5", "Foreman", "3"),
             new("6", "Craft Personnel", "4"),
             new("7", "Craft Personnel", "4"),
             new("8", "Craft Personnel", "5"),
             new("9", "Craft Personnel", "5"),
             new("10", "Administrative Officer", ""),
             new("11", "Security Supervisor", "10"),
             new("12", "HR Supervisor", "10"),
             new("13", "Reception Supervisor", "10"),
             new("14", "Securities", "11"),
             new("15", "HR Officer", "12"),
             new("16", "Receptionist", "13"),
             new("17", "Maintainence Manager", ""),
             new("18", "Electrical Supervisor", "17"),
             new("19", "Mechanical Supervisor", "17"),
             new("20", "Craft Personnel", "18"),
             new("21", "Craft Personnel", "19")
         };
     }
 }
```

```cshtml
        @(Html.EJS().Diagram("diagram").Created("create").Width("100%").Height("500px").GetNodeDefaults("nodeDefaults").GetConnectorDefaults("connectorDefaults").DataSourceSettings(ss => ss.Id("Id").ParentId("ParentId")
.DataSource(new DataManager() { Data = (List<HierarchicalMultipleRoots>)ViewData["Nodes"] })).Layout(l => l.Type(Syncfusion.EJ2.Diagrams.LayoutType.HierarchicalTree).VerticalSpacing(30).HorizontalSpacing(40).EnableAnimation(true)).SnapSettings(s => s.Constraints(Syncfusion.EJ2.Diagrams.SnapConstraints.None)).Render())

<script>
        function create() {
            var diagram = document.getElementById("diagram").ej2_instances[0];
            diagram.tool = ej.diagrams.DiagramTools.ZoomPan;
            diagram.dataBind();
        }

        function nodeDefaults(obj, diagram) {
            obj.shape = {
                type: 'Text', content: obj.data.Label,
                margin: { left: 10, right: 10, top: 10, bottom: 10 }
            };
            if (obj.data.Id === "1" | obj.data.Id === "10" | obj.data.Id === "17") {
                obj.style = { fill: '#1c5b9b', strokeColor: 'none', color: 'white', strokeWidth: 2 };
                obj.borderColor = '#1c5b9b';
                obj.backgroundColor = '#1c5b9b';
            }
            else if (obj.data.Id === "2" | obj.data.Id === "3" | obj.data.Id === "11" | obj.data.Id === "12" | obj.data.Id === "13" | obj.data.Id === "18" | obj.data.Id === "19") {
                obj.style = { fill: '#18c1be', strokeColor: '#18c1be', color: 'white', strokeWidth: 2 };
                obj.borderColor = '#18c1be';
                obj.backgroundColor = '#18c1be';
            }
            else if (obj.data.Id === "4" | obj.data.Id === "5" | obj.data.Id === "14" | obj.data.Id === "15" | obj.data.Id === "16" | obj.data.Id === "20" | obj.data.Id === "21") {
                obj.style = { fill: '#17a573', strokeColor: 'none', color: 'white', strokeWidth: 2 };
                obj.borderColor = '#17a573';
                obj.backgroundColor = '#17a573';
            }
            else {
                obj.style = { fill: '#73bb34', strokeColor: 'none', color: 'white', strokeWidth: 2 };
                obj.borderColor = '#73bb34';
                obj.backgroundColor = '#73bb34';
            }
            obj.width = 75;
            obj.height = 35;
            obj.shape.margin = { left: 5, right: 5, bottom: 5, top: 5 };
            return obj;
        }

        function connectorDefaults(connector, diagram) {
            connector.type = 'Orthogonal';
            return connector;
        }

</script>
```

## DataSourceSettings Configuration

| Property | Description |
|----------|-------------|
| `id` | Field in data that holds the unique node identifier |
| `parentId` | Field that holds the parent node identifier (parent-child hierarchy) |
| `dataManager` | `DataManager` instance wrapping the data |
| `root` | ID value of the root record (optional) |
| `crudAction` | URLs for create/read/update/delete operations |
| `connectionDataSource` | Separate data source for connector records |

## Combining Data Binding with Layout

All automatic layouts (HierarchicalTree, OrganizationalChart, RadialTree, MindMap) work with data binding. The layout reads the `id`/`parentId` fields to build the tree structure:

```csharp
// Configure DataSource and Layout in controller
ViewBag.dataSourceSettings = new DiagramDataSourceSettings
{
    Id = "Name",
    ParentId = "Category",
    DataSource = new DataManager { Data = (List<HierarchicalMultipleRoots>)ViewBag.data }
};

ViewBag.layout = new DiagramLayout
{
    Type = Syncfusion.EJ2.Diagrams.LayoutType.HierarchicalTree,
    HorizontalSpacing = 40,
    VerticalSpacing = 40,
    Orientation = Syncfusion.EJ2.Diagrams.LayoutOrientation.TopToBottom
};
```

```cshtml
@(Html.EJS().Diagram("diagram")
    .Width("100%")
    .Height("550px")
    .GetNodeDefaults("getNodeDefaults")
    .GetConnectorDefaults("getConnectorDefaults")
    .SetNodeTemplate("setNodeTemplate")
    .DataSourceSettings(ViewBag.dataSourceSettings)
    .Layout(ViewBag.layout)
    .Render())
```

## Customizing Node Appearance from Data

Use `setNodeTemplate` to customize nodes based on their bound data record:

```csharp
// Configure DataSource and Layout in controller
ViewBag.dataSourceSettings = new DiagramDataSource
{
    Id = "Id",
    ParentId = "ReportingPerson",
    DataSource = new DataManager { Data = (List<EmployeeInfo>)ViewBag.employees }
};

ViewBag.layout = new DiagramLayout
{
    Type = Syncfusion.EJ2.Diagrams.LayoutType.OrganizationalChart,
    HorizontalSpacing = 40,
    VerticalSpacing = 40
};
```

```cshtml
@(Html.EJS().Diagram("diagram")
    .Width("100%")
    .Height("550px")
    .SetNodeTemplate("setNodeTemplate")
    .DataSourceSettings(ViewBag.dataSourceSettings)
    .Layout(ViewBag.layout)
    .Render())

<script>
    function setNodeTemplate(obj, diagram) {
        var data = obj.data;
        if (!data) return null;

        var container = new ej.diagrams.Canvas();
        container.style.fill = data.Designation === 'Director' ? '#4674CE' : '#6BA5D7';
        container.style.strokeColor = 'none';

        var nameLabel = new ej.diagrams.TextElement();
        nameLabel.content = data.Name;
        nameLabel.style.color = 'white';
        nameLabel.style.bold = true;
        nameLabel.style.fontSize = 13;
        nameLabel.relativeMode = 'Point';
        nameLabel.offsetX = 0.5;
        nameLabel.offsetY = 0.35;

        var roleLabel = new ej.diagrams.TextElement();
        roleLabel.content = data.Designation;
        roleLabel.style.color = '#D9E9FF';
        roleLabel.style.fontSize = 11;
        roleLabel.relativeMode = 'Point';
        roleLabel.offsetX = 0.5;
        roleLabel.offsetY = 0.65;

        container.children = [nameLabel, roleLabel];
        return container;
    }
</script>
```

## Connector Data Source

Provide a separate data source for connectors (useful when parent-child isn't sufficient):

```csharp
ViewBag.nodeData = nodeList;      // List with Id field
ViewBag.connectorData = edgeList; // List with Id, SourceNode, TargetNode fields

// Configure DataSource Settings with separate connection data source
ViewBag.dataSourceSettings = new DiagramDataSource
{
    Id = "Id",
    ParentId = "",
    DataSource = new DataManager { Data = (List<NodeData>)ViewBag.nodeData }
};

// Configure connection data source for connectors
var connectionDataSource = new DiagramDataSource
{
    Id = "Id",
    SourceId = "SourceNode",
    TargetId = "TargetNode",
    DataManager = new DataManager { Data = (List<EdgeData>)ViewBag.connectorData }
};
ViewBag.connectionDataSource = connectionDataSource;
```

```cshtml
@(Html.EJS().Diagram("diagram")
    .Width("100%")
    .Height("550px")
    .DataSourceSettings(ViewBag.connectionDataSource)
    .Render())
```

| Property | Description |
|----------|-------------|
| `id` | Connector record unique ID field |
| `sourceId` | Field holding source node ID |
| `targetId` | Field holding target node ID |

## CRUD Operations

Configure URLs for server-side CRUD:

### Insert New Data Record

```javascript
var diagramElement = document.getElementById('element');
var diagram = diagramElement.ej2_instances[0];
//Sends the newly added nodes/connectors from client side to the server side through the URL which is specified in server side.
diagram.insertData();
```

```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace EJ2CoreSampleBrowser.Controllers.Diagram
{
    public partial class DiagramController : Controller
    {
        // GET: LocalData
        public IActionResult LocalData()
        {
             CRUDAction nodeCrud = new CRUDAction()
            {
                //Define URL to perform CRUD operations with nodes records in database.
                Create = "https://js.syncfusion.com/demos/ejServices/api/Diagram/AddNodes",
            };

            ViewBag.NodeCrud = nodeCrud;


            ConnectionDataSource dataSource = new ConnectionDataSource()
            {
                Id = "Name",
                SourceID = "SourceNode",
                TargetID = "TargetNode",
                CrudAction = new CRUDAction()
                {
                    //Define URL to perform CRUD operations with connector records in database.
                    Create = "https://js.syncfusion.com/demos/ejServices/api/Diagram/AddConnectors",
                }
            };
            ViewBag.DataSource = dataSource;
            return View();
        }
    }
   public class CRUDAction
    {
        [DefaultValue(null)]
        [HtmlAttributeName("read")]
        [JsonProperty("read")]
        public string Read { get; set; }

        [DefaultValue(null)]
        [HtmlAttributeName("create")]
        [JsonProperty("create")]
        public string Create { get; set; }

        [DefaultValue(null)]
        [HtmlAttributeName("update")]
        [JsonProperty("update")]
        public string Update { get; set; }

        [DefaultValue(null)]
        [HtmlAttributeName("destroy")]
        [JsonProperty("destroy")]
        public string Destroy { get; set; }

        [DefaultValue(null)]
        [HtmlAttributeName("customFields")]
        [JsonProperty("customFields")]
        public object[] CustomFields { get; set; }
    }

    public class ConnectionDataSource
    {
        [DefaultValue(null)]
        [HtmlAttributeName("id")]
        [JsonProperty("id")]
        public string Id { get; set; }

        [DefaultValue(null)]
        [HtmlAttributeName("sourceID")]
        [JsonProperty("sourceID")]
        public string SourceID { get; set; }

        [DefaultValue(null)]
        [HtmlAttributeName("targetID")]
        [JsonProperty("targetID")]
        public string TargetID { get; set; }

        [DefaultValue(null)]
        [HtmlAttributeName("crudAction")]
        [JsonProperty("crudAction")]
        public CRUDAction CrudAction { get; set; }
    }
}
```

### Update Existing Data Record

```javascript
var diagramElement = document.getElementById('element');
var diagram = diagramElement.ej2_instances[0];
//Sends the updated nodes/connectors from client side to the server side through the URL which is specified in server side.
diagram.updateData();
```

```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace EJ2CoreSampleBrowser.Controllers.Diagram
{
    public partial class DiagramController : Controller
    {
        // GET: LocalData
        public IActionResult LocalData()
        {
             CRUDAction nodeCrud = new CRUDAction()
            {
                //Define URL to perform CRUD operations with nodes records in database.
                Update = "https://js.syncfusion.com/demos/ejServices/api/Diagram/UpdateNodes",
            };

            ViewBag.NodeCrud = nodeCrud;


            ConnectionDataSource dataSource = new ConnectionDataSource()
            {
                Id = "Name",
                SourceID = "SourceNode",
                TargetID = "TargetNode",
                CrudAction = new CRUDAction()
                {
                    //Define URL to perform CRUD operations with connector records in database.
                    Update = "https://js.syncfusion.com/demos/ejServices/api/Diagram/UpdateConnectors",
                }
            };
            ViewBag.DataSource = dataSource;
            return View();
        }
    }
   public class CRUDAction
    {
        [DefaultValue(null)]
        [HtmlAttributeName("read")]
        [JsonProperty("read")]
        public string Read { get; set; }

        [DefaultValue(null)]
        [HtmlAttributeName("create")]
        [JsonProperty("create")]
        public string Create { get; set; }

        [DefaultValue(null)]
        [HtmlAttributeName("update")]
        [JsonProperty("update")]
        public string Update { get; set; }

        [DefaultValue(null)]
        [HtmlAttributeName("destroy")]
        [JsonProperty("destroy")]
        public string Destroy { get; set; }

        [DefaultValue(null)]
        [HtmlAttributeName("customFields")]
        [JsonProperty("customFields")]
        public object[] CustomFields { get; set; }
    }

    public class ConnectionDataSource
    {
        [DefaultValue(null)]
        [HtmlAttributeName("id")]
        [JsonProperty("id")]
        public string Id { get; set; }

        [DefaultValue(null)]
        [HtmlAttributeName("sourceID")]
        [JsonProperty("sourceID")]
        public string SourceID { get; set; }

        [DefaultValue(null)]
        [HtmlAttributeName("targetID")]
        [JsonProperty("targetID")]
        public string TargetID { get; set; }

        [DefaultValue(null)]
        [HtmlAttributeName("crudAction")]
        [JsonProperty("crudAction")]
        public CRUDAction CrudAction { get; set; }
    }
}
```

### Remove Data Record

```javascript
var diagramElement = document.getElementById('element');
var diagram = diagramElement.ej2_instances[0];
//Sends the deleted nodes/connectors from client side to the server side through the URL which is specified in server side.
diagram.removeData();
```

```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace EJ2CoreSampleBrowser.Controllers.Diagram
{
    public partial class DiagramController : Controller
    {
        // GET: LocalData
        public IActionResult LocalData()
        {
             CRUDAction nodeCrud = new CRUDAction()
            {
                //Define URL to perform CRUD operations with nodes records in database.
                Destroy = "https://js.syncfusion.com/demos/ejServices/api/Diagram/DeleteNodes",
            };

            ViewBag.NodeCrud = nodeCrud;


            ConnectionDataSource dataSource = new ConnectionDataSource()
            {
                Id = "Name",
                SourceID = "SourceNode",
                TargetID = "TargetNode",
                CrudAction = new CRUDAction()
                {
                    //Define URL to perform CRUD operations with connector records in database.
                    Destroy = "https://js.syncfusion.com/demos/ejServices/api/Diagram/DeleteConnectors",
                }
            };
            ViewBag.DataSource = dataSource;
            return View();
        }
    }
   public class CRUDAction
    {
        [DefaultValue(null)]
        [HtmlAttributeName("read")]
        [JsonProperty("read")]
        public string Read { get; set; }

        [DefaultValue(null)]
        [HtmlAttributeName("create")]
        [JsonProperty("create")]
        public string Create { get; set; }

        [DefaultValue(null)]
        [HtmlAttributeName("update")]
        [JsonProperty("update")]
        public string Update { get; set; }

        [DefaultValue(null)]
        [HtmlAttributeName("destroy")]
        [JsonProperty("destroy")]
        public string Destroy { get; set; }

        [DefaultValue(null)]
        [HtmlAttributeName("customFields")]
        [JsonProperty("customFields")]
        public object[] CustomFields { get; set; }
    }

    public class ConnectionDataSource
    {
        [DefaultValue(null)]
        [HtmlAttributeName("id")]
        [JsonProperty("id")]
        public string Id { get; set; }

        [DefaultValue(null)]
        [HtmlAttributeName("sourceID")]
        [JsonProperty("sourceID")]
        public string SourceID { get; set; }

        [DefaultValue(null)]
        [HtmlAttributeName("targetID")]
        [JsonProperty("targetID")]
        public string TargetID { get; set; }

        [DefaultValue(null)]
        [HtmlAttributeName("crudAction")]
        [JsonProperty("crudAction")]
        public CRUDAction CrudAction { get; set; }
    }
}

```

### Refresh Data

```javascript
// Reload all data from the data manager
diagram.doLayout();
```

## loaded Event

The `loaded` event fires after the diagram is fully populated from the data source:

```csharp
// Configure DataSource Settings in controller
ViewBag.dataSourceSettings = new DiagramDataSourceSettings
{
    Id = "Id",
    ParentId = "ReportingPerson",
    DataSource = new DataManager { Data = (List<EmployeeInfo>)ViewBag.employees }
};
```

```cshtml
@(Html.EJS().Diagram("diagram")
    .Loaded("onDiagramLoaded")
    .DataSourceSettings(ViewBag.dataSourceSettings)
    .Render())

<script>
    function onDiagramLoaded(args) {
        var diagram = document.getElementById('diagram').ej2_instances[0];
        console.log('Diagram loaded', args);
    }
</script>
```
