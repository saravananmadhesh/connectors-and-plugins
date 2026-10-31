# Getting Started and Data Binding

## Table of Contents
- [Project Setup](#project-setup)
- [TagHelper Syntax](#taghelper-syntax)
- [DataSource Property](#datasource-property)
- [Local Data Binding](#local-data-binding)
- [Remote Data Binding](#remote-data-binding)
- [Field Mapping](#field-mapping)
- [Query Property](#query-property)

## Project Setup

To use the Syncfusion ListView component in ASP.NET Core, follow these setup steps:

### 1. Install NuGet Package

Install the `Syncfusion.EJ2.AspNet.Core` NuGet package:

```powershell
Install-Package Syncfusion.EJ2.AspNet.Core -Version 26.1.35
```

### 2. Import TagHelper

Open `~/Pages/_ViewImports.cshtml` and add the Syncfusion TagHelper import:

```cshtml
@addTagHelper *, Syncfusion.EJ2
```

### 3. Add Stylesheet and Script Resources

In `~/Pages/Shared/_Layout.cshtml`, add the theme CSS and JavaScript in the `<head>`:

```cshtml
<head>
    <!-- Syncfusion EJ2 Fluent Theme -->
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/26.1.35/fluent.css" />
    <!-- Syncfusion EJ2 Script -->
    <script src="https://cdn.syncfusion.com/ej2/26.1.35/dist/ej2.min.js"></script>
</head>
```

### 4. Register Script Manager

In `~/Pages/Shared/_Layout.cshtml`, add the script manager at the end of `<body>`:

```cshtml
<body>
    @RenderBody()
    <!-- Syncfusion Script Manager -->
    <ejs-scripts></ejs-scripts>
</body>
```

## TagHelper Syntax

Syncfusion ListView uses the `<ejs-listview>` TagHelper for declarative markup in ASP.NET Core Razor pages.

### Basic Structure

```cshtml
<ejs-listview id="list" 
    dataSource="ViewBag.DataSource"
    showHeader="true" 
    headerTitle="My List">
</ejs-listview>
```

**Key Attributes:**
- `id`: Unique identifier for the ListView instance
- `dataSource`: Array or IEnumerable data
- `showHeader`: Boolean to display/hide header
- `headerTitle`: Header title text

### Nested Tag Helpers

For complex configurations, use nested tag helpers:

```cshtml
<ejs-listview id="list" dataSource="@ViewBag.DataSource">
    <e-listview-fieldsettings 
        text="productName" 
        id="productId" 
        groupBy="category">
    </e-listview-fieldsettings>
</ejs-listview>
```

## DataSource Property

The `dataSource` property accepts multiple data types:

### DataSource Types

| Type | Format | Use Case |
|------|--------|----------|
| Array of strings | `["Item1", "Item2"]` | Simple text lists |
| Array of objects | `[{ text: "Item1", id: "1" }]` | Complex data |
| IEnumerable<T> | `List<Product>` | Server-side collections |
| DataManager | `new DataManager(url)` | Remote server data |

## Local Data Binding

### Array of Strings

Bind a simple array of strings directly to ListView:

```csharp
// In Controller
public IActionResult Index()
{
    ViewBag.Arts = new List<string>()
    {
        "Artwork",
        "Abstract",
        "Modern Painting",
        "Ceramics",
        "Animation Art",
        "Oil Painting"
    };
    return Page();
}
```

```cshtml
<!-- In Razor Page -->
<ejs-listview id="list" dataSource="ViewBag.Arts" 
    showHeader="true" headerTitle="List of Arts">
</ejs-listview>
```

**Output:** A simple list of 6 items with text rendering.

### Array of JSON Objects

For more control, bind an array of objects with field mapping:

```csharp
// Data Model
public class ListItem
{
    public string id { get; set; }
    public string text { get; set; }
}

// In Controller
public IActionResult Index()
{
    ViewBag.DataSource = new List<ListItem>()
    {
        new ListItem { id = "1", text = "Audi A4" },
        new ListItem { id = "2", text = "Audi A5" },
        new ListItem { id = "3", text = "BMW 501" },
        new ListItem { id = "4", text = "BMW 502" }
    };
    return Page();
}
```

```cshtml
<!-- In Razor Page -->
<ejs-listview id="list" dataSource="@ViewBag.DataSource">
    <e-listview-fieldsettings text="text" id="id"></e-listview-fieldsettings>
</ejs-listview>
```

**Output:** A list with items mapped from the `text` property.

### IEnumerable Collections

Direct binding with IEnumerable:

```csharp
public class Product
{
    public int ProductId { get; set; }
    public string ProductName { get; set; }
    public string Category { get; set; }
}

// In Page Model
public List<Product> Products { get; set; }

public void OnGet()
{
    Products = new List<Product>()
    {
        new Product { ProductId = 1, ProductName = "Laptop", Category = "Electronics" },
        new Product { ProductId = 2, ProductName = "Mouse", Category = "Accessories" },
        new Product { ProductId = 3, ProductName = "Keyboard", Category = "Accessories" }
    };
}
```

```cshtml
<!-- In Razor Page -->
<ejs-listview id="list" dataSource="@Model.Products">
    <e-listview-fieldsettings text="ProductName" id="ProductId"></e-listview-fieldsettings>
</ejs-listview>
```

## Remote Data Binding

Bind ListView to server APIs using DataManager via `<e-data-manager>` TagHelper:

### Using DataManager with Remote URL

```cshtml
<!-- Remote data binding with DataManager -->
<ejs-listview id="remotelist"
    query="new ej.data.Query().from('Orders').take(6)">
    <e-data-manager url="https://services.syncfusion.com/aspnet/production/api/" crossDomain="true">
    </e-data-manager>
    <e-listview-fieldsettings id="ShipName" text="ShipName"></e-listview-fieldsettings>
</ejs-listview>
```

**Explanation:**
- `<e-data-manager url="...">` specifies the remote API endpoint
- `crossDomain="true"` enables cross-origin requests
- `query="new ej.data.Query().from('Orders').take(6)"` specifies source table and limits to 6 records

### Custom API Endpoint

```csharp
// In Controller
public IActionResult Index()
{
    ViewBag.ApiData = new DataManager
    {
        Url = "/api/products",
        Adaptor = "UrlAdaptor"
    };
    return Page();
}
```

```cshtml
<ejs-listview id="list" dataSource="@ViewBag.ApiData">
    <e-listview-fieldsettings text="productName" id="productId"></e-listview-fieldsettings>
</ejs-listview>
```

## Field Mapping

The `<e-listview-fieldsettings>` tag controls which data properties map to ListView features:

### Complete Field Mapping Example

```cshtml
<ejs-listview id="list" dataSource="@ViewBag.DataSource">
    <e-listview-fieldsettings 
        id="ProductId"
        text="ProductName"
        tooltip="Description"
        iconCss="Icon"
        groupBy="Category"
        child="Subcategories"
        enabled="IsEnabled"
        isChecked="IsSelected"
        isVisible="IsVisible"
        sortBy="Name">
    </e-listview-fieldsettings>
</ejs-listview>
```

**Field Descriptions:**
- `id`: Unique identifier from data source
- `text`: Display text for each item
- `tooltip`: Hover tooltip information
- `iconCss`: CSS class for icon display
- `groupBy`: Property for grouping items
- `child`: Nested child data property
- `enabled`: Property controlling item enable state
- `isChecked`: Property for checkbox state
- `isVisible`: Property controlling visibility
- `sortBy`: Property for sorting logic

### Practical Example: Product List

```csharp
public class ProductItem
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Category { get; set; }
    public string IconClass { get; set; }
    public bool IsActive { get; set; }
    public bool IsInStock { get; set; }
    public string Description { get; set; }
}
```

```cshtml
<ejs-listview id="productList" dataSource="@ViewBag.Products">
    <e-listview-fieldsettings 
        id="Id"
        text="Name"
        groupBy="Category"
        iconCss="IconClass"
        enabled="IsActive"
        isVisible="IsInStock"
        tooltip="Description">
    </e-listview-fieldsettings>
</ejs-listview>
```

## Query Property

The `Query` property enables server-side filtering and sorting with DataManager:

### Select Specific Columns

```cshtml
<ejs-listview id="list"
    query="new ej.data.Query().from('Orders').select('ShipName', 'ShipCity').take(6)">
    <e-data-manager url="https://services.syncfusion.com/aspnet/production/api/" crossDomain="true">
    </e-data-manager>
    <e-listview-fieldsettings text="ShipName" id="ShipName"></e-listview-fieldsettings>
</ejs-listview>
```

### Apply Where Condition

```cshtml
<ejs-listview id="list"
    query="new ej.data.Query().from('Orders').where('ShipCity', 'equal', 'London').take(6)">
    <e-data-manager url="https://services.syncfusion.com/aspnet/production/api/" crossDomain="true">
    </e-data-manager>
    <e-listview-fieldsettings id="Id" text="Name"></e-listview-fieldsettings>
</ejs-listview>
```

### Order Results

```cshtml
<ejs-listview id="list"
    query="new ej.data.Query().from('Orders').sortBy('ShipName', 'Ascending', false).take(6)">
    <e-data-manager url="https://services.syncfusion.com/aspnet/production/api/" crossDomain="true">
    </e-data-manager>
    <e-listview-fieldsettings id="Id" text="Name"></e-listview-fieldsettings>
</ejs-listview>
```

### Combined Query

```cshtml
<ejs-listview id="list"
    query="new ej.data.Query().from('Products').where('UnitPrice', 'greaterThan', '20').sortBy('ProductName', 'Ascending', false).take(10)">
    <e-data-manager url="https://services.syncfusion.com/aspnet/production/api/" crossDomain="true">
    </e-data-manager>
    <e-listview-fieldsettings text="ProductName" id="ProductID"></e-listview-fieldsettings>
</ejs-listview>
```

## Edge Cases and Validation

### Empty DataSource

If `dataSource` is null or empty, ListView renders as empty container:

```csharp
ViewBag.DataSource = new List<ListItem>(); // Empty list
```

**Result:** No items render; header still displays if `showHeader="true"`.

### Missing Field Mapping

If field mapping property name doesn't exist in data, item text shows as blank:

```csharp
// Data has 'productName' property
new ListItem { id = "1", text = "Product A" }

// But mapping looks for 'ProductName' (case-sensitive in some contexts)
```

**Best Practice:** Always validate field names match data source exactly.

### Large Datasets

For datasets >1000 items, enable `enableVirtualization="true"`:

```cshtml
<ejs-listview id="list" dataSource="@ViewBag.LargeData" 
    enableVirtualization="true" height="500">
</ejs-listview>
```

**Performance Improvement:** Renders only visible items; reduces DOM nodes from thousands to ~20.

---

**Related Topics:**
- [Field Settings & Configuration](field-settings-and-configuration.md) for detailed field options
- [Remote Data Binding with Query](field-settings-and-configuration.md#remote-data-binding)
- [Templates & Customization](templates-and-customization.md) for advanced rendering
