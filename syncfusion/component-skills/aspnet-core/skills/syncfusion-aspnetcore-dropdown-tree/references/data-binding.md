---
name: data-binding-dropdown-tree
---

# Data Binding and Hierarchy Management in Syncfusion DropDownTree

## Table of Contents

- [Overview](#overview)
- [Hierarchical Data Binding](#hierarchical-data-binding)
- [Self-Referential Data Binding](#self-referential-data-binding)
- [Remote Data Binding](#remote-data-binding)
- [Load on Demand (Lazy Loading)](#load-on-demand-lazy-loading)
- [Field Mapping Configuration](#field-mapping-configuration)
- [Prevent Node Selection](#prevent-node-selection)
- [Advanced Data Management](#advanced-data-management)
- [Performance Optimization](#performance-optimization)

## Overview

The Syncfusion DropDownTree component supports multiple data binding approaches to accommodate different data structures and scenarios. Whether your data is organized hierarchically in nested arrays, self-referentially with parent-child relationships, or provided by a remote service, the component provides flexible configuration options through the `fields` property and DataManager integration.

Data binding is the core feature that transforms raw data into an interactive, navigable tree structure. The component handles the transformation automatically based on your field mapping configuration, allowing you to work with your existing data models without modification.

### Data Binding Architecture

The DropDownTree component uses the following architecture for data binding:

1. **Data Source**: Array or DataManager instance containing your data
2. **Fields Configuration**: Maps data properties to component display properties
3. **Hierarchy Detection**: Determines parent-child relationships
4. **Rendering Engine**: Builds DOM elements based on mapped data
5. **Interaction Layer**: Handles selection, expansion, and filtering

This three-tier approach provides flexibility while maintaining performance and ease of use.

## Hierarchical Data Binding

Hierarchical data binding is used when your data contains nested arrays representing parent-child relationships. This approach is ideal for data already organized in a tree structure.

### Hierarchical Data Structure

```csharp
public class FileSystem
{
    public string Name { get; set; }
    public string Id { get; set; }
    public List<FileSystem> Folders { get; set; }
}
```

### Example Data

```csharp
var fileSystemData = new List<FileSystem>
{
    new FileSystem
    {
        Id = "root1",
        Name = "C:/ Drive",
        Folders = new List<FileSystem>
        {
            new FileSystem
            {
                Id = "fold1",
                Name = "Documents",
                Folders = new List<FileSystem>
                {
                    new FileSystem { Id = "file1", Name = "Resume.pdf", Folders = null },
                    new FileSystem { Id = "file2", Name = "Cover_Letter.docx", Folders = null }
                }
            },
            new FileSystem
            {
                Id = "fold2",
                Name = "Downloads",
                Folders = new List<FileSystem>
                {
                    new FileSystem { Id = "file3", Name = "Setup.exe", Folders = null }
                }
            }
        }
    },
    new FileSystem
    {
        Id = "root2",
        Name = "D:/ Drive",
        Folders = new List<FileSystem>
        {
            new FileSystem { Id = "fold3", Name = "Projects", Folders = null }
        }
    }
};
```

### Implementation

**Razor View:**

```html
@page
@model FileExplorerModel
@{
    var fieldSettings = new Syncfusion.EJ2.DropDowns.DropDownTreeFieldSettings
    {
        dataSource = Model.FileSystemData,
        text = "Name",              // Display text from data property
        value = "Id",               // Value identifier from data property
        child = "Folders"           // Child collection property name
    };
}

<ejs-dropdowntree id="hierarchicalTree" placeholder="Select a file or folder" change="onChange">
    <e-dropdowntree-fields dataSource="@Model.FileSystemData" text="Name" value="Id" child="Folders"></e-dropdowntree-fields>
</ejs-dropdowntree>

@section Scripts {
    <script>
        var treeObj = document.getElementById("hierarchicalTree").ej2_instances[0];
        
        function onChange(e) {
            console.log("Old Items:", e.oldValue);
            console.log("Selected Value:", e.value);
        }
    </script>
}
```

**Page Model:**

```csharp
public class FileExplorerModel : PageModel
{
    public List<FileSystem> FileSystemData { get; set; }

    public void OnGet()
    {
        FileSystemData = new List<FileSystem>
        {
            // Data from example above
        };
    }
}
```

### Hierarchical Data Advantages

- **Natural Structure**: Data representation matches your object hierarchy
- **Nested Navigation**: Easy expansion/collapse of parent items
- **Intuitive Mapping**: Field mapping is straightforward
- **Performance**: Efficient for moderately sized datasets

### Hierarchical Data Limitations

- **Large Datasets**: Not ideal for very large tree structures (use lazy loading instead)
- **Circular References**: Requires careful handling to avoid infinite loops
- **Duplicate Data**: Parent items are repeated in tree structure
- **Memory Usage**: All data loaded into memory at once

## Self-Referential Data Binding

Self-referential data binding is used when your data items reference their parent items by ID instead of containing nested arrays. This approach is more normalized and efficient for complex hierarchies.

### Self-Referential Data Structure

```csharp
public class OrganizationNode
{
    public int EmployeeId { get; set; }
    public string EmployeeName { get; set; }
    public int? ManagerId { get; set; }  // Parent reference (null for root)
    public string Department { get; set; }
}
```

### Example Data

```csharp
var organizationData = new List<OrganizationNode>
{
    // Root level (ManagerId = null)
    new OrganizationNode 
    { 
        EmployeeId = 1, 
        EmployeeName = "CEO", 
        ManagerId = null,
        Department = "Executive"
    },
    // Level 2 (ManagerId = 1)
    new OrganizationNode 
    { 
        EmployeeId = 2, 
        EmployeeName = "VP Engineering", 
        ManagerId = 1,
        Department = "Engineering"
    },
    new OrganizationNode 
    { 
        EmployeeId = 3, 
        EmployeeName = "VP Sales", 
        ManagerId = 1,
        Department = "Sales"
    },
    // Level 3
    new OrganizationNode 
    { 
        EmployeeId = 4, 
        EmployeeName = "Engineering Manager", 
        ManagerId = 2,
        Department = "Engineering"
    },
    new OrganizationNode 
    { 
        EmployeeId = 5, 
        EmployeeName = "Sales Manager", 
        ManagerId = 3,
        Department = "Sales"
    },
    // Level 4
    new OrganizationNode 
    { 
        EmployeeId = 6, 
        EmployeeName = "Developer", 
        ManagerId = 4,
        Department = "Engineering"
    },
    new OrganizationNode 
    { 
        EmployeeId = 7, 
        EmployeeName = "Developer", 
        ManagerId = 4,
        Department = "Engineering"
    }
};
```

### Implementation

**Razor View:**

```html
@page
@model OrganizationModel

<h3>Organization Hierarchy</h3>

<ejs-dropdowntree id="selfRefTree" placeholder="Select an employee" allowFiltering="true" change="change">
    <e-dropdowntree-fields dataSource="@Model.OrganizationData" value="EmployeeId" text="EmployeeName" parentValue="ManagerId" hasChildren="HasChildren"></e-dropdowntree-fields>
</ejs-dropdowntree>

@section Scripts {
    <script>
        function change(e) {
            console.log("Selected Employee ID:", e.value);
        }
    </script>
}
```

**Page Model:**

```csharp
public class OrganizationModel : PageModel
{
    public List<OrganizationNode> OrganizationData { get; set; }

    public void OnGet()
    {
        // Load data from database or service
        OrganizationData = new List<OrganizationNode>
        {
            // Data from example above
        };
    }
}
```

### Self-Referential Data Advantages

- **Database Friendly**: Normalized structure matches standard database schemas
- **Scalable**: Efficient for very large hierarchies
- **No Duplication**: Each item stored once
- **Flexible Updates**: Parent relationships easy to modify
- **Memory Efficient**: Smaller data payload

### Self-Referential Data Limitations

- **Build Overhead**: Component must construct hierarchy from parent references
- **Circular Reference Risk**: Must validate parentValue references
- **Complex Queries**: Requires tree reconstruction for sorting/filtering
- **Performance Impact**: Additional processing needed for large datasets

## Remote Data Binding

Remote data binding retrieves data from a server endpoint, making it ideal for large datasets and scenarios where data changes frequently.

### DataManager Configuration

The DataManager component acts as a middle layer between the component and remote service:

```csharp
var dataManager = new DataManager 
{
    Url = "/api/items/tree",     // Remote endpoint
    Adaptor = "UrlAdaptor",      // How to communicate with server
    Offline = false              // Always fetch from server
};
```

### Available Adaptors

| Adaptor | Purpose | Usage |
|---------|---------|-------|
| UrlAdaptor | Generic remote data services | Custom APIs, basic HTTP endpoints |
| ODataAdaptor | OData v2 services | SharePoint, traditional OData services |
| ODataV4Adaptor | OData v4 services | Modern OData implementations |
| WebApiAdaptor | ASP.NET Web API | RESTful Web API services |
| WebMethodAdaptor | ASP.NET Web Services | Legacy ASMX web services |

### Remote Data Implementation

**Server-Side Controller:**

```csharp
[ApiController]
[Route("api/[controller]")]
public class ItemsController : ControllerBase
{
    [HttpGet("tree")]
    public IActionResult GetTreeData()
    {
        var data = new List<TreeItem>
        {
            new TreeItem 
            { 
                ItemId = "1", 
                ItemName = "Electronics",
                ParentId = null,
                HasChild = true
            },
            new TreeItem 
            { 
                ItemId = "2", 
                ItemName = "Computers",
                ParentId = "1",
                HasChild = true
            },
            new TreeItem 
            { 
                ItemId = "3", 
                ItemName = "Laptops",
                ParentId = "2",
                HasChild = false
            },
            new TreeItem 
            { 
                ItemId = "4", 
                ItemName = "Desktops",
                ParentId = "2",
                HasChild =false
            }
        };
        
        return Ok(data);
    }
}
```

**Client-Side View:**

```html
@page
@model RemoteDataModel

<h3>Remote Data DropDownTree</h3>

<ejs-dropdowntree id="remoteTree" placeholder="Select from remote data" actionFailure="actionFailure">
    <e-dropdowntree-fields child="ViewBag.child" query="new ej.data.Query().from('Employees').select('EmployeeID,FirstName,Title').take(5)" value="EmployeeID" text="FirstName" hasChildren="EmployeeID">
        <e-data-manager url="https://services.odata.org/V4/Northwind/Northwind.svc" adaptor="ODataV4Adaptor" crossDomain="true"></e-data-manager>
    </e-dropdowntree-fields>
</ejs-dropdowntree>

@section Scripts {
    <script>
        function actionFailure(e) {
            console.log("Error loading remote data:", e);
        }
    </script>
}
```

### Remote Data Error Handling

```csharp
public ActionResult RemoteData()
{
    DropDownTreeFields parentData = new DropDownTreeFields();
    DropDownTreeFields childData = new DropDownTreeFields();
    object data = new DataManager
    {
        Url = "https://services.odata.org/V4/Northwind/Northwind.svc",
        Adaptor = "ODataV4Adaptor",
        CrossDomain = true
    };
    // Parent data mapping
    parentData.Query = "new ej.data.Query().from('Employees').select('EmployeeID,FirstName,Title').take(5)";
    parentData.Value = "EmployeeID";
    parentData.Text = "FirstName";
    parentData.HasChildren = "EmployeeID";
    parentData.Child = childData;
    parentData.DataSource = data;
    // Child data mapping  
    childData.Query = "new ej.data.Query().from('Orders').select('OrderID,EmployeeID,ShipName').take(5)";
    childData.Value = "OrderID";
    childData.Text = "ShipName";
    childData.ParentValue = "EmployeeID";
    childData.DataSource = data;
    ViewBag.remoteFields = parentData;
    return View();
}
```

**Client-Side Error Handling:**

```html
<ejs-dropdowntree id="remoteTree" actionFailure="actionFailure" actionFailureTemplate="<div class='error'>Failed to load items</div>">
    <e-dropdowntree-fields>
        <e-data-manager url="/api/items" adaptor="UrlAdaptor"></e-data-manager>
    </e-dropdowntree-fields>
</ejs-dropdowntree>

<script>
    var tree = document.getElementById("remoteTree").ej2_instances[0];
    function actionFailure(args) {
        console.error("Data loading failed:", args);
        // Provide user feedback
    }
</script>
```

## Load on Demand (Lazy Loading)

Lazy loading is a performance optimization technique that loads only the currently visible nodes and retrieves child nodes when a parent is expanded. This is essential for very large datasets.

### Basic Lazy Loading Setup

**Server Controller:**

```csharp
[ApiController]
[Route("api/[controller]")]
public class LazyCategoryController : ControllerBase
{
    private readonly IRepository<Category> _categoryRepository;

    [HttpGet("categories")]
    public IActionResult GetCategories([FromQuery] string parentId = null)
    {
        IEnumerable<Category> categories;
        
        if (string.IsNullOrEmpty(parentId))
        {
            // Return root categories (first level)
            categories = _categoryRepository.GetRootCategories();
        }
        else
        {
            // Return child categories for the given parent
            categories = _categoryRepository.GetCategoriesByParent(parentId);
        }

        return Ok(categories.Select(c => new
        {
            CategoryId = c.Id,
            CategoryName = c.Name,
            ParentId = c.ParentId,
            HasChildren = _categoryRepository.HasChildren(c.Id)
        }));
    }
}
```

**View Implementation:**

```html

<ejs-dropdowntree id="lazyTree" placeholder="Select Category">
    <e-dropdowntree-treeSettings loadOnDemand="true"></e-dropdowntree-treeSettings>
    <e-dropdowntree-fields dataSource="@lazyDataManager" value="CategoryId" text="CategoryName" parentValue="ParentId" hasChildren="HasChildren"></e-dropdowntree-fields>
</ejs-dropdowntree>
```

### How Lazy Loading Works

1. **Initial Load**: Component loads only root nodes (where ParentId = null)
2. **User Expands Node**: Component detects expansion action
3. **Server Request**: DataManager sends request to server for child items
   - Includes parentId parameter indicating which children to load
4. **Response Processing**: Component receives and renders child items
5. **State Preservation**: Expanded state is maintained during interaction

### Lazy Loading Configuration Properties

```html
<ejs-dropdowntree id="lazyTree">
    <e-dropdowntree-treeSettings loadOnDemand="true" expandOn="Auto"></e-dropdowntree-treeSettings>
    <e-dropdowntree-fields dataSource="@remoteDataManager" hasChildren="HasChildren"></e-dropdowntree-fields>
</ejs-dropdowntree>
```

### Lazy Loading Statistics

For a dataset with:
- 1,000 root items
- Average 50 children per item
- Average 10 children per child

**Without Lazy Loading**:
- All 1,000 + (1,000 × 50) + (1,000 × 50 × 10) = 501,000 items loaded
- Initial load time: 3-5 seconds
- Memory usage: ~15MB

**With Lazy Loading**:
- Initial load: 1,000 root items
- Initial load time: 100-300ms
- Memory usage: ~0.1MB
- Child items loaded on demand (100-200ms per expansion)

## Field Mapping Configuration

Field mapping defines how data properties relate to component features. This is the core configuration for all data binding approaches.

### Field Mapping Properties

```csharp
var fieldSettings = new Syncfusion.EJ2.DropDowns.DropDownTreeFieldSettings
{
    // Core Mapping Properties
    dataSource = data,                     // Data array or DataManager
    value = "Id",                          // Property for value identifier
    text = "Name",                         // Property for display text
    
    // Hierarchy Properties
    child = "SubItems",                    // Property containing child array (hierarchical)
    parentValue = "ParentId",              // Parent reference property (self-referential)
    hasChildren = "HasChild",              // Boolean property indicating children
    
    // Display Properties
    iconCss = "IconClass",                 // Class for item icon
    imageUrl = "ImagePath",                // URL for item image
    tooltip = "Description",               // Hover tooltip text
    htmlAttributes = "Attributes",         // HTML attribute object property
    
    // State Properties
    selected = "IsSelected",               // Pre-selected state property
    expanded = "IsExpanded",               // Initially expanded state property
    
    // Advanced Properties
    selectable = "CanSelect",              // Whether item is selectable
    query = new Query()                    // OData query object
};
```

### Field Mapping Examples

**Example 1: Hierarchical with Full Properties**

```csharp
new Syncfusion.EJ2.DropDowns.DropDownTreeFieldSettings
{
    dataSource = menuItems,
    value = "MenuId",
    text = "MenuName",
    child = "SubMenus",
    iconCss = "Icon",
    selected = "IsDefault"
}
```

**Example 2: Self-Referential**

```csharp
new Syncfusion.EJ2.DropDowns.DropDownTreeFieldSettings
{
    dataSource = employeeList,
    value = "EmployeeId",
    text = "EmployeeName",
    parentValue = "ManagerId",
    hasChildren = "IsManager"
}
```

**Example 3: Remote with Query**

```csharp
var query = new Query()
    .Where("IsActive", "equal", true)
    .OrderBy("SortOrder");

new Syncfusion.EJ2.DropDowns.DropDownTreeFieldSettings
{
    dataSource = new DataManager { Url = "/api/data", Adaptor = "UrlAdaptor" },
    value = "ItemId",
    text = "ItemName",
    parentValue = "ParentId",
    query = query
}
```

## Prevent Node Selection

In some scenarios, you want certain nodes (typically parent/category nodes) to be non-selectable, allowing only leaf nodes to be selected.

### Non-Selectable Node Implementation

**Data Model:**

```csharp
public class MenuItem
{
    public string MenuId { get; set; }
    public string MenuName { get; set; }
    public bool CanSelect { get; set; }  // false for categories
    public List<MenuItem> SubMenus { get; set; }
}
```

**Sample Data:**

```csharp
var menuData = new List<MenuItem>
{
    new MenuItem
    {
        MenuId = "file",
        MenuName = "File",
        CanSelect = false,  // Cannot select category
        SubMenus = new List<MenuItem>
        {
            new MenuItem { MenuId = "new", MenuName = "New", CanSelect = true },
            new MenuItem { MenuId = "open", MenuName = "Open", CanSelect = true },
            new MenuItem { MenuId = "save", MenuName = "Save", CanSelect = true }
        }
    },
    new MenuItem
    {
        MenuId = "edit",
        MenuName = "Edit",
        CanSelect = false,
        SubMenus = new List<MenuItem>
        {
            new MenuItem { MenuId = "cut", MenuName = "Cut", CanSelect = true },
            new MenuItem { MenuId = "copy", MenuName = "Copy", CanSelect = true }
        }
    }
};
```

**View Implementation:**

```html
<ejs-dropdowntree id="selectiveTree" placeholder="Select option" select="select">
    <e-dropdowntree-fields dataSource="@Model.MenuData" value="MenuId" text="MenuName" child="SubMenus" selectable="CanSelect"></e-dropdowntree-fields>
</ejs-dropdowntree>
```

### Event-Based Prevention

Alternatively, prevent selection via event handling:

```html
@section Scripts {
    <script>
        var treeObj = document.getElementById("selectiveTree").ej2_instances[0];
        
        function select(args) {
            // Check if node is a parent node
            if (args.itemData.length > 0) {
                alert("Please select an option");
            }
        }
    </script>
}
```

## Advanced Data Management

### Dynamic Data Updates

```csharp
var ddtreeObj = document.getElementById("dynamicTree").ej2_instances[0];

// Add new item to tree
ddtreeObj.treeObj.addNode(new {
    id = "new-item",
    text = "New Item"
}, parentNodeElement);

// Remove item
ddtreeObj.treeObj.removeNode(itemToDelete);

// Update item
ddtreeObj.treeObj.updateNode(updatedItemData);
```

### Data Filtering and Querying

```csharp
var query = new Query()
    .Where("Category", "equal", "Electronics")
    .Where("Price", "lessthan", 1000)
    .Where("InStock", "equal", true)
    .OrderBy("ProductName");

new Syncfusion.EJ2.DropDowns.DropDownTreeFieldSettings
{
    dataSource = new DataManager { Url = "/api/products", Adaptor = "UrlAdaptor" },
    query = query
}
```

## Performance Optimization

### Best Practices for Large Datasets

1. **Use Lazy Loading**: Load nodes on demand rather than all at once
2. **Optimize Field Mapping**: Use only required properties
3. **Enable Caching**: Cache remote data responses when appropriate
4. **Simplify Templates**: Complex itemTemplates impact rendering performance
5. **Minimize Re-binding**: Only re-bind when data actually changes
6. **Use Server-Side Filtering**: Filter large datasets on server before sending

### Performance Monitoring

```html
<script>
    var startTime = performance.now();
    
    var treeObj = document.getElementById("largeTree").ej2_instances[0];
    treeObj.dataBound = function(e) {
        var endTime = performance.now();
        console.log("Tree rendering took " + (endTime - startTime) + " milliseconds");
    };
</script>
```

---

**Next Steps**: Now that you understand data binding, explore selection features in `checkbox-and-selection.md` or template customization in `templates-and-customization.md`.
