# Data Binding in ASP.NET MVC TreeMap Control

## Table of Contents
- [Overview](#overview)
- [DataSource Property](#datasource-property)
- [Flat Collection Data Binding](#flat-collection-data-binding)
- [Hierarchical Collection Data Binding](#hierarchical-collection-data-binding)
- [Advanced Data Binding Scenarios](#advanced-data-binding-scenarios)
- [Data Binding Best Practices](#data-binding-best-practices)
- [Troubleshooting Data Binding](#troubleshooting-data-binding)

## Overview

Data binding is the foundation of TreeMap functionality. The TreeMap control accepts data collections and visualizes them as nested rectangles. The area of each rectangle is calculated based on a numeric weight value. Data can be structured as either a flat collection (single level) or a hierarchical collection (multiple levels with parent-child relationships).

### Supported Data Sources

- **List<object>** — Generic collection of objects with properties
- **List<T>** — Generic typed collection (strongly recommended)
- **IEnumerable** — Any enumerable collection
- **AJAX dynamic data** — Data loaded from server endpoints
- **JSON arrays** — Data serialized from JSON

### Core Binding Properties

| Property | Purpose | Required |
|----------|---------|----------|
| **DataSource** | Collection of data objects | Yes |
| **WeightValuePath** | Property name for rectangle area calculation | Yes |
| **IdPath** | Property name for unique identification | Optional |
| **ParentIdPath** | Property name for parent reference (hierarchical) | For hierarchical data |

## DataSource Property

The DataSource property is where you specify the collection of objects to display in the TreeMap.

### Setting DataSource Inline

Pass the collection directly to the TreeMap:

```csharp
@Html.EJS().TreeMap("treemap")
    .DataSource(new List<object>
    {
        new { Name = "Item1", Value = 100 },
        new { Name = "Item2", Value = 200 }
    })
    .WeightValuePath("Value")
    .Render();
```

### Setting DataSource from Controller

For better separation of concerns, pass data from your controller:

**Controller:**
```csharp
public ActionResult Index()
{
    var data = GetTreeMapData();
    return View(data);
}

private List<TreeMapItem> GetTreeMapData()
{
    return new List<TreeMapItem>
    {
        new TreeMapItem { Id = 1, Name = "Item1", Value = 100 },
        new TreeMapItem { Id = 2, Name = "Item2", Value = 200 }
    };
}

public class TreeMapItem
{
    public int Id { get; set; }
    public string Name { get; set; }
    public int Value { get; set; }
}
```

**View:**
```razor
@model List<TreeMapItem>

@Html.EJS().TreeMap("treemap")
    .DataSource(Model)
    .WeightValuePath("Value")
    .Render();
```

### Setting DataSource via AJAX

Dynamically load data from a server endpoint:

```csharp
@Html.EJS().TreeMap("treemap")
    .DataSource(url: "/Home/GetTreeMapData")
    .WeightValuePath("Value")
    .Render();
```

**Controller endpoint:**
```csharp
public ActionResult GetTreeMapData()
{
    var data = new List<object>
    {
        new { Name = "Item1", Value = 100 },
        new { Name = "Item2", Value = 200 }
    };
    return Json(data, JsonRequestBehavior.AllowGet);
}
```

## Flat Collection Data Binding

Flat data binding is used when all items are at the same level with no parent-child relationships. This creates a single-level TreeMap visualization.

### Data Structure

A flat collection is a simple list where each item is independent:

```csharp
public class Product
{
    public int ProductId { get; set; }      // Unique identifier
    public string ProductName { get; set; }  // Display name
    public int Sales { get; set; }           // Weight for rectangle size
}
```

### Complete Flat Binding Example

**Controller (HomeController.cs):**
```csharp
using System.Collections.Generic;
using System.Web.Mvc;

public class HomeController : Controller
{
    public ActionResult FlatTreeMap()
    {
        var data = new List<object>
        {
            new { ProductName = "Laptop", Sales = 5000 },
            new { ProductName = "Desktop", Sales = 3500 },
            new { ProductName = "Tablet", Sales = 2800 },
            new { ProductName = "Phone", Sales = 4200 },
            new { ProductName = "Monitor", Sales = 1900 },
            new { ProductName = "Keyboard", Sales = 1200 }
        };
        return View(data);
    }

    public ActionResult GetFlatData()
    {
        var data = new List<object>
        {
            new { ProductName = "Laptop", Sales = 5000 },
            new { ProductName = "Desktop", Sales = 3500 },
            new { ProductName = "Tablet", Sales = 2800 }
        };
        return Json(data, JsonRequestBehavior.AllowGet);
    }
}
```

**View (FlatTreeMap.cshtml):**
```razor
@model List<object>

@Html.EJS().TreeMap("container")
    .DataSource(Model)
    .WeightValuePath("Sales")
    .Levels(levels =>
    {
        levels.GroupPath("ProductName").Add();
    })
    .LeafItemSettings(leaf => leaf.LabelPath("ProductName"))
    .Tooltip(tooltip => 
        tooltip.Visible(true)
               .Format("<b>${ProductName}</b><br/>Sales: $${Sales}"))
    .Render();

<style>
    #container {
        height: 500px;
    }
</style>
```

**Expected Output:**
- A TreeMap showing 6 products as rectangles
- Each rectangle size proportional to sales value
- Larger products (Laptop, Phone) appear larger
- Smaller products (Keyboard, Monitor) appear smaller
- Labels show product names
- Tooltip shows product name and sales on hover

### Flat Data Properties Used

| Property | Example Value | Purpose |
|----------|---------------|---------|
| **ProductName** | "Laptop" | Display name, used for labeling |
| **Sales** | 5000 | Weight value (WeightValuePath property) |

## Hierarchical Collection Data Binding

Hierarchical data binding is used for multi-level data with parent-child relationships. This creates nested rectangles showing organizational or categorical hierarchies.

### Data Structure

Hierarchical data typically uses:
- **ParentIdPath** — Reference to parent item
- **IdPath** — Unique identifier for the item
- **Levels** — Configuration for each hierarchy level

```csharp
public class Category
{
    public int CategoryId { get; set; }
    public int? ParentCategoryId { get; set; }  // null for root items
    public string CategoryName { get; set; }
    public int Revenue { get; set; }
}
```

### Complete Hierarchical Binding Example

**Controller:**
```csharp
public ActionResult HierarchicalTreeMap()
{
    var data = new List<object>
    {
        // Level 1: Continents
        new { Id = 1, Parent = null, Name = "Asia", Value = 15000 },
        new { Id = 2, Parent = null, Name = "Europe", Value = 12000 },
        new { Id = 3, Parent = null, Name = "North America", Value = 18000 },
        
        // Level 2: Countries under Asia
        new { Id = 4, Parent = 1, Name = "China", Value = 8000 },
        new { Id = 5, Parent = 1, Name = "India", Value = 5000 },
        new { Id = 6, Parent = 1, Name = "Japan", Value = 2000 },
        
        // Level 2: Countries under Europe
        new { Id = 7, Parent = 2, Name = "Germany", Value = 4500 },
        new { Id = 8, Parent = 2, Name = "France", Value = 4000 },
        new { Id = 9, Parent = 2, Name = "UK", Value = 3500 },
        
        // Level 2: Countries under North America
        new { Id = 10, Parent = 3, Name = "USA", Value = 15000 },
        new { Id = 11, Parent = 3, Name = "Canada", Value = 2000 },
        new { Id = 12, Parent = 3, Name = "Mexico", Value = 1000 }
    };
    return View(data);
}

public ActionResult GetHierarchicalData()
{
    var data = new List<object>
    {
        new { Id = 1, Parent = null, Name = "Asia", Value = 15000 },
        new { Id = 2, Parent = null, Name = "Europe", Value = 12000 },
        new { Id = 4, Parent = 1, Name = "China", Value = 8000 },
        new { Id = 5, Parent = 1, Name = "India", Value = 5000 }
    };
    return Json(data, JsonRequestBehavior.AllowGet);
}
```

**View (HierarchicalTreeMap.cshtml):**
```razor
@model List<object>

@Html.EJS().TreeMap("container")
    .DataSource(Model)
    .WeightValuePath("Value")
    .Levels(levels =>
    {
        levels.GroupPath("Name").Add();
    })
    .LeafItemSettings(leaf => leaf.LabelPath("Name"))
    .Tooltip(tooltip => 
        tooltip.Visible(true)
               .Format("<b>${Name}</b><br/>Value: $${Value}"))
    .Render();

<style>
    #container {
        height: 500px;
    }
</style>
```

**Expected Output:**
- Continents displayed as large rectangles (Asia, Europe, North America)
- Countries as smaller rectangles nested within continents
- Sizes proportional to value (China large within Asia, USA large in North America)
- Hierarchical nesting visible with parent-child relationships
- Labels on all rectangles

### Hierarchical Data Properties Used

| Property | Example Value | Purpose |
|----------|---------------|---------|
| **Id** | 1 | Unique identifier for this item |
| **Parent** | null / 1 | Parent's Id (null for root items) |
| **Name** | "Asia" | Display name |
| **Value** | 15000 | Weight value for rectangle size |

## Advanced Data Binding Scenarios

### Scenario 1: Three-Level Hierarchy

Extend the hierarchy to three levels (Region → Country → City):

```csharp
var data = new List<object>
{
    // Level 1
    new { Id = 1, Parent = null, Name = "North America", Value = 20000 },
    
    // Level 2
    new { Id = 2, Parent = 1, Name = "USA", Value = 15000 },
    
    // Level 3
    new { Id = 3, Parent = 2, Name = "New York", Value = 5000 },
    new { Id = 4, Parent = 2, Name = "California", Value = 7000 },
    new { Id = 5, Parent = 2, Name = "Texas", Value = 3000 }
};
```

Configure multiple levels in the view:

```razor
@Html.EJS().TreeMap("container")
    .DataSource(Model)
    .WeightValuePath("Value")
    .Levels(levels =>
    {
        levels.GroupPath("Name").Add();
        levels.GroupPath("Name").Add();
        levels.GroupPath("Name").Add();
    })
    .Render();
```

### Scenario 2: Mixed Data Types

Combine different data types (strings, integers, decimals):

```csharp
var data = new List<object>
{
    new { Name = "Q1", Value = 1500.75m, Quarter = "2024-Q1", Status = "Active" },
    new { Name = "Q2", Value = 2200.50m, Quarter = "2024-Q2", Status = "Active" }
};
```

### Scenario 3: Dynamic Data Loading

Load data based on user selection:

```csharp
[HttpPost]
public ActionResult LoadTreeMapByCategory(int categoryId)
{
    var data = GetTreeMapDataByCategory(categoryId);
    return Json(data, JsonRequestBehavior.AllowGet);
}
```

In your JavaScript:
```javascript
var treemapInstance = document.getElementById('container').ej2_instances[0];
treemapInstance.dataSource = newDataArray;
```

## Data Binding Best Practices

### 1. Use Strongly Typed Collections
Always prefer generic typed collections over `List<object>`:

```csharp
// ✅ Better
public List<TreeMapItem> GetData()
{
    return new List<TreeMapItem> { /* ... */ };
}

// ❌ Less reliable
public List<object> GetData()
{
    return new List<object> { /* ... */ };
}
```

### 2. Include IdPath for Complex Hierarchies
When using parent-child relationships, always specify IdPath and ParentIdPath:

```razor
.IdPath("CategoryId")
.ParentIdPath("ParentCategoryId")
```

### 3. Validate Weight Values
Ensure WeightValuePath contains valid numeric values:

```csharp
// ✅ Correct
public { ProductName = "Laptop", Sales = 5000 }

// ❌ Incorrect (non-numeric)
public { ProductName = "Laptop", Sales = "Five Thousand" }
```

### 4. Keep Data Structures Simple
Avoid deeply nested objects in your data source:

```csharp
// ✅ Simple, flat structure
new { Name = "Item", Value = 100 }

// ❌ Complex nested structure
new { Product = new { Info = new { Name = "Item", Value = 100 } } }
```

### 5. Handle Null Values
Ensure no null values in critical properties:

```csharp
// ✅ Always provide values
new { Name = "Item" ?? "Unknown", Value = Sales ?? 0 }

// ❌ May cause issues
new { Name = null, Value = null }
```

### 6. Use Descriptive Property Names
Choose clear, meaningful property names for the WeightValuePath:

```csharp
// ✅ Clear
.WeightValuePath("SalesRevenue")
.WeightValuePath("EmployeeCount")

// ❌ Vague
.WeightValuePath("Value")
.WeightValuePath("V")
```

## Troubleshooting Data Binding

### Issue: TreeMap Not Rendering / Blank Display

**Cause:** DataSource is null or not passed correctly.

**Solution:**
1. Verify data is being passed from controller to view
2. Check browser F12 console for JavaScript errors
3. Add debug breakpoint in controller to confirm data exists

```csharp
public ActionResult Index()
{
    var data = GetTreeMapData();
    // Debug: Verify data is not null or empty
    if (data == null || data.Count == 0)
        return View(new List<object>()); // Empty list
    return View(data);
}
```

### Issue: Rectangles All Same Size

**Cause:** WeightValuePath is incorrect or values are identical.

**Solution:**
1. Verify WeightValuePath property name matches your data
2. Check that values in your data are different
3. Ensure values are numeric (int, decimal, double)

```csharp
// ✅ Correct
.WeightValuePath("Sales")  // Property "Sales" must exist
var data = new { Sales = 5000 };  // Different values

// ❌ Incorrect
.WeightValuePath("Sles")   // Typo in property name
var data = new { Sales = 1000 };  // Doesn't match "Sles"
```

### Issue: Hierarchical Data Not Grouping Correctly

**Cause:** Parent-child relationships not properly configured.

**Solution:**
1. Verify IdPath matches your ID property name
2. Verify ParentIdPath matches your parent reference property name
3. Check that Parent IDs actually match existing IDs in the data
4. Ensure null or 0 is used for root-level items (no parent)

```csharp
// ✅ Correct
new { Id = 1, ParentId = null, Name = "Root" }  // null for root
new { Id = 2, ParentId = 1, Name = "Child" }     // 1 matches parent

// ❌ Incorrect
new { Id = 1, ParentId = 0, Name = "Root" }      // 0 might not match
new { Id = 2, ParentId = 999, Name = "Child" }   // 999 doesn't exist
```

### Issue: Labels Not Displaying

**Cause:** LabelPath property name doesn't match data or LeafItemSettings not configured.

**Solution:**
```razor
// Ensure LabelPath property exists in your data
.LeafItemSettings(leaf => leaf.LabelPath("ProductName"))

// Verify data has the property
new { ProductName = "Laptop", ... }  // Must have "ProductName"
```

### Issue: AJAX Data Not Loading

**Cause:** Server endpoint not returning data correctly.

**Solution:**
1. Test the endpoint directly in browser: `http://localhost/Home/GetTreeMapData`
2. Verify endpoint returns valid JSON
3. Check server-side errors in Application Insights or logs

```csharp
// Endpoint must return JsonResult
public ActionResult GetTreeMapData()
{
    var data = /* ... */;
    return Json(data, JsonRequestBehavior.AllowGet);  // ✅ Correct
    // NOT: return View(data);  // ❌ Wrong
}
```

### Performance Tip: Large Datasets

For large datasets (1000+ items), consider:
1. Paginating data on the server
2. Filtering data before passing to TreeMap
3. Using AJAX with lazy loading
4. Virtualizing items (render only visible items)

```csharp
public ActionResult GetPagedTreeMapData(int page = 1, int pageSize = 100)
{
    var allData = GetAllTreeMapData();
    var pagedData = allData.Skip((page - 1) * pageSize)
                           .Take(pageSize)
                           .ToList();
    return Json(pagedData, JsonRequestBehavior.AllowGet);
}
```

