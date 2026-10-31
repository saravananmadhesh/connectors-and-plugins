# Data Binding in ComboBox

## Table of Contents
- [Overview](#overview)
- [Local Data Binding](#local-data-binding)
- [Remote Data Binding](#remote-data-binding)
- [Field Mapping](#field-mapping)
- [DataManager Configuration](#datamanager-configuration)
- [Common Patterns](#common-patterns)

---

## Overview

The ComboBox `dataSource` property accepts multiple data types:

| Data Type | When to Use | Example |
|-----------|------------|---------|
| **Array of strings** | Simple lists, no metadata | `List<string> {"Red", "Green", "Blue"}` |
| **Array of objects** | Complex data, multiple fields | `List<Category> {new Category {Id=1, Name="Electronics"}}` |
| **DataManager** | Remote APIs (OData, Web API) | Connect to backend services |
| **URL** | Direct API endpoint | `'/api/items'` |

---

## Local Data Binding

### Array of Strings (Simplest)

Use when you have a simple list of values where text and value are the same.

**Controller (`HomeController.cs`):**

```csharp
public IActionResult Index()
{
    ViewBag.colorsList = new List<string> 
    { 
        "Red", 
        "Green", 
        "Blue", 
        "Yellow", 
        "Orange" 
    };
    return View();
}
```

**View (`Index.cshtml`):**

```cshtml
<ejs-combobox id="color-combo"
    dataSource="@ViewBag.colorsList"
    placeholder="Select a color">
</ejs-combobox>

<script>
function onColorChange(args) {
    console.log('Selected:', args.value);  // Output: "Red"
}
</script>
```

---

### Array of Objects (Recommended for Apps)

Use when items have multiple fields (ID, name, description, etc.).

#### Single Key-Value Mapping

**Controller:**

```csharp
public class Game
{
    public string GameId { get; set; }
    public string GameName { get; set; }
}

public IActionResult Index()
{
    ViewBag.gamesData = new List<Game>
    {
        new Game { GameId = "game1", GameName = "Chess" },
        new Game { GameId = "game2", GameName = "Carrom" },
        new Game { GameId = "game3", GameName = "Badminton" }
    };
    return View();
}
```

**View:**

```cshtml
<ejs-combobox id="games-combo"
    dataSource="@ViewBag.gamesData"
    placeholder="Select a game"
    change="onGameChange">
    <e-combobox-fields text="GameName" value="GameId"></e-combobox-fields>
</ejs-combobox>

<script>
function onGameChange(args) {
    console.log('Selected ID:', args.value);      // "game1"
    console.log('Selected Item:', args.itemData);  // Full object
}
</script>
```

#### Multiple Field Mapping

**Controller:**

```csharp
public class Employee
{
    public string EmpId { get; set; }
    public string EmpName { get; set; }
    public string Department { get; set; }
    public string IconCss { get; set; }
}

public IActionResult Index()
{
    ViewBag.employeeData = new List<Employee>
    {
        new Employee { EmpId = "EMP001", EmpName = "Alice Johnson", Department = "Engineering", IconCss = "icon-engineer" },
        new Employee { EmpId = "EMP002", EmpName = "Bob Smith", Department = "Sales", IconCss = "icon-sales" }
    };
    return View();
}
```

**View:**

```cshtml
<ejs-combobox id="emp-combo"
    dataSource="@ViewBag.employeeData"
    placeholder="Select employee">
    <e-combobox-fields text="EmpName" value="EmpId" iconCss="IconCss" groupBy="Department"></e-combobox-fields>
</ejs-combobox>
```

---

## Remote Data Binding

### Using DataManager with Web API

For data from backend APIs, use Syncfusion's DataManager:

**View:**

```cshtml
<ejs-combobox id="sports-combo"
    allowFiltering="true"
    placeholder="Loading sports...">
    <e-combobox-fields text="Name" value="Id"></e-combobox-fields>
    <e-data-manager url="/api/sports" adaptor="UrlAdaptor"></e-data-manager>
</ejs-combobox>
```

**Controller (API Endpoint - `SportsController.cs`):**

```csharp
[ApiController]
[Route("api/[controller]")]
public class SportsController : ControllerBase
{
    [HttpGet]
    public IActionResult GetSports()
    {
        var sports = new List<object>
        {
            new { Id = 1, Name = "Cricket" },
            new { Id = 2, Name = "Football" },
            new { Id = 3, Name = "Tennis" }
        };
        return Ok(sports);
    }
}
```

**Expected Response:**
```json
[
  { "Id": 1, "Name": "Cricket" },
  { "Id": 2, "Name": "Football" },
  { "Id": 3, "Name": "Tennis" }
]
```

---

### OData Service

For OData v4 endpoints:

```cshtml
<ejs-combobox id="products-combo"
    allowFiltering="true"
    placeholder="Select a product">
    <e-combobox-fields text="ProductName" value="ProductID"></e-combobox-fields>
    <e-data-manager url="https://your-odata-endpoint/Products" adaptor="ODataV4Adaptor" crossDomain="true"></e-data-manager>
</ejs-combobox>
```

---

## Field Mapping

### All Available Fields

**View:**

```cshtml
<ejs-combobox id="combo"
    dataSource="@ViewBag.data">
    <e-combobox-fields 
        text="DisplayName"
        value="Id"
        iconCss="Icon"
        groupBy="Category"
        disabled="IsDisabled">
    </e-combobox-fields>
</ejs-combobox>
```

| Field | Purpose | Type |
|-------|---------|------|
| `text` | Display in input and list | string |
| `value` | Hidden value (stored/returned) | string |
| `iconCss` | CSS class for item icon | string |
| `groupBy` | Field to group items | string |
| `disabled` | Field to disable items | boolean |

---

## DataManager Configuration

The `<e-data-manager>` element configures remote data fetching:

```cshtml
<e-data-manager 
    url="/api/items"
    adaptor="UrlAdaptor"
    offline="false"
    pageSize="10">
</e-data-manager>
```

| Property | Description |
|----------|-------------|
| `url` | Endpoint URL for data fetching |
| `adaptor` | Type: `UrlAdaptor`, `ODataAdaptor`, `ODataV4Adaptor`, `WebApiAdaptor` |
| `offline` | Cache data locally when `true` |
| `pageSize` | Records per page for pagination |
| `crossDomain` | Allow cross-domain requests (use with CORS) |

---

## Common Patterns

### Pattern 1: Local Array Binding

```cshtml
<!-- Controller sets ViewBag.items -->
<ejs-combobox id="items"
    dataSource="@ViewBag.items"
    placeholder="Select an item">
</ejs-combobox>
```

### Pattern 2: Object Array with Field Mapping

```cshtml
<ejs-combobox id="categories"
    dataSource="@ViewBag.categories"
    placeholder="Select category">
    <e-combobox-fields text="CategoryName" value="CategoryId"></e-combobox-fields>
</ejs-combobox>
```

### Pattern 3: Remote Data from Same-Origin API

```cshtml
<ejs-combobox id="customers"
    allowFiltering="true"
    placeholder="Select customer">
    <e-combobox-fields text="CustomerName" value="CustomerId"></e-combobox-fields>
    <e-data-manager url="/api/customers" adaptor="UrlAdaptor"></e-data-manager>
</ejs-combobox>
```

### Pattern 4: Pre-Selected Value

**Controller:**

```csharp
public IActionResult Index()
{
    ViewBag.categories = GetCategories();
    ViewBag.selectedCategory = 2;  // Pre-select category with Id=2
    return View();
}
```

**View:**

```cshtml
<ejs-combobox id="categories"
    dataSource="@ViewBag.categories"
    value="@ViewBag.selectedCategory"
    placeholder="Select category">
    <e-combobox-fields text="CategoryName" value="CategoryId"></e-combobox-fields>
</ejs-combobox>
```
