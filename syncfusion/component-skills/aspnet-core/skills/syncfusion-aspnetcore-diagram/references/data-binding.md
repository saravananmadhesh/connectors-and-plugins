# Data Binding in Syncfusion ASP.NET Core Diagram

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
public class EmployeeInfo
{
    public string Id { get; set; }
    public string Name { get; set; }
    public string Designation { get; set; }
    public string ReportingPerson { get; set; }
}
```

```csharp
// Controller
var employees = new List<EmployeeInfo>
{
    new EmployeeInfo { Id = "1",  Name = "Director",      Designation = "Director",  ReportingPerson = ""  },
    new EmployeeInfo { Id = "2",  Name = "Manager A",     Designation = "Manager",   ReportingPerson = "1" },
    new EmployeeInfo { Id = "3",  Name = "Manager B",     Designation = "Manager",   ReportingPerson = "1" },
    new EmployeeInfo { Id = "4",  Name = "Developer A",   Designation = "Developer", ReportingPerson = "2" },
    new EmployeeInfo { Id = "5",  Name = "Developer B",   Designation = "Developer", ReportingPerson = "2" },
    new EmployeeInfo { Id = "6",  Name = "Designer",      Designation = "Designer",  ReportingPerson = "3" }
};

ViewBag.employees = employees;
```

```cshtml
<ejs-diagram id="diagram" width="100%" height="550px"
    getNodeDefaults="getNodeDefaults"
    getConnectorDefaults="getConnectorDefaults">
    <e-diagram-datasourcesettings
        id="Id"
        parentId="ReportingPerson"
        dataManager="new DataManager(){ Data = (List<EmployeeInfo>)ViewBag.employees }">
    </e-diagram-datasourcesettings>
    <e-diagram-layout type="OrganizationalChart"
        horizontalSpacing="40"
        verticalSpacing="40">
    </e-diagram-layout>
</ejs-diagram>

<script>
    function getNodeDefaults(node) {
        node.width = 140;
        node.height = 60;
        node.style = { fill: '#6BA5D7', strokeColor: 'none' };
        return node;
    }

    function getConnectorDefaults(connector) {
        connector.type = 'Orthogonal';
        connector.targetDecorator = { shape: 'Arrow', fill: '#6BA5D7', strokeColor: '#6BA5D7' };
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

```cshtml
<ejs-diagram id="diagram" width="100%" height="550px"
    getNodeDefaults="getNodeDefaults"
    getConnectorDefaults="getConnectorDefaults"
    setNodeTemplate="setNodeTemplate">
    <e-diagram-datasourcesettings
        id="Name"
        parentId="Category"
        dataManager="new DataManager(){ Data = (List<CategoryItem>)ViewBag.data }">
    </e-diagram-datasourcesettings>
    <e-diagram-layout type="HierarchicalTree"
        horizontalSpacing="40"
        verticalSpacing="40"
        orientation="TopToBottom">
    </e-diagram-layout>
</ejs-diagram>
```

## Customizing Node Appearance from Data

Use `setNodeTemplate` to customize nodes based on their bound data record:

```cshtml
<ejs-diagram id="diagram" width="100%" height="550px"
    setNodeTemplate="setNodeTemplate">
    <e-diagram-datasourcesettings
        id="Id"
        parentId="ReportingPerson"
        dataManager="new DataManager(){ Data = (List<EmployeeInfo>)ViewBag.employees }">
    </e-diagram-datasourcesettings>
    <e-diagram-layout type="OrganizationalChart" horizontalSpacing="40" verticalSpacing="40">
    </e-diagram-layout>
</ejs-diagram>

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

## Remote Data Binding

Bind data from a remote API endpoint using `DataManager`:

```cshtml
<ejs-diagram id="diagram" width="100%" height="550px"
    getNodeDefaults="getNodeDefaults"
    getConnectorDefaults="getConnectorDefaults">
    <e-diagram-datasourcesettings
        id="Id"
        parentId="ReportingPerson"
        dataManager="new DataManager() { Url = '[YOUR URL HERE]', Adaptor = new WebApiAdaptor() }">
    </e-diagram-datasourcesettings>
    <e-diagram-layout type="HierarchicalTree"
        horizontalSpacing="40" verticalSpacing="40">
    </e-diagram-layout>
</ejs-diagram>
```

Adaptor types: `"ODataAdaptor"`, `"ODataV4Adaptor"`, `"WebApiAdaptor"`, `"JsonAdaptor"`, `"UrlAdaptor"`

## Connector Data Source

Provide a separate data source for connectors (useful when parent-child isn't sufficient):

```csharp
ViewBag.nodeData = nodeList;      // List with Id field
ViewBag.connectorData = edgeList; // List with Id, SourceNode, TargetNode fields
```

```cshtml
<ejs-diagram id="diagram" width="100%" height="550px">
    <e-diagram-datasourcesettings
        id="Id"
        parentId=""
        dataManager="new DataManager(){ Data = (List<NodeData>)ViewBag.nodeData }">
        <e-datasourcesettings-connectiondatasource
            id="Id"
            sourceId="SourceNode"
            targetId="TargetNode"
            dataManager="new DataManager(){ Data = (List<EdgeData>)ViewBag.connectorData }">
        </e-datasourcesettings-connectiondatasource>
    </e-diagram-datasourcesettings>
</ejs-diagram>
```

| Property | Description |
|----------|-------------|
| `id` | Connector record unique ID field |
| `sourceId` | Field holding source node ID |
| `targetId` | Field holding target node ID |

## CRUD Operations

Configure URLs for server-side CRUD:

```cshtml
<e-diagram-datasourcesettings
    id="Id"
    parentId="ReportingPerson"
    dataManager="new DataManager() { Url = '[YOUR URL HERE]', Adaptor = new WebApiAdaptor() }">
    <e-datasourcesettings-crudaction
        read="[YOUR URL HERE]"
        create="[YOUR URL HERE]"
        update="[YOUR URL HERE]"
        destroy="[YOUR URL HERE]">
    </e-datasourcesettings-crudaction>
</e-diagram-datasourcesettings>
```

### Connector CRUD

```cshtml
<e-datasourcesettings-connectiondatasource
    id="Id"
    sourceId="SourceNode"
    targetId="TargetNode">
    <e-connectiondatasource-crudaction
        read="[YOUR URL HERE]"
        create="[YOUR URL HERE]"
        update="[YOUR URL HERE]"
        destroy="[YOUR URL HERE]">
    </e-connectiondatasource-crudaction>
</e-datasourcesettings-connectiondatasource>
```

## Runtime Data Operations

### Insert New Data Record

```javascript
var diagram = document.getElementById('diagram').ej2_instances[0];

var newEmployee = { Id: '10', Name: 'New Hire', Designation: 'Developer', ReportingPerson: '2' };
diagram.insertData(newEmployee);
```

### Update Existing Data Record

```javascript
// Modify data and call updateData
var node = diagram.getObject('10');
node.data.Name = 'Updated Name';
diagram.updateData(node);
```

### Remove Data Record

```javascript
var node = diagram.getObject('10');
diagram.removeData(node);
```

### Refresh Data

```javascript
// Reload all data from the data manager
diagram.clear();
diagram.dataSource.dataManager.executeQuery(new ej.data.Query()).then(function(e) {
    diagram.dataSource.data = e.result;
    diagram.dataBind();
});
```

## loaded Event

The `loaded` event fires after the diagram is fully populated from the data source:

```cshtml
<ejs-diagram id="diagram"
    loaded="onDiagramLoaded">
    <e-diagram-datasourcesettings id="Id" parentId="ReportingPerson"
        dataManager="new DataManager(){ Data = (List<EmployeeInfo>)ViewBag.employees }">
    </e-diagram-datasourcesettings>
</ejs-diagram>

<script>
    function onDiagramLoaded() {
        var diagram = document.getElementById('diagram').ej2_instances[0];
        console.log('Diagram loaded with', diagram.nodes.length, 'nodes');
        diagram.fitPage();   // fit all nodes in view
    }
</script>
```
