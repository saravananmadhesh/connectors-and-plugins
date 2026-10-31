# Data Binding in ListBox

## Table of Contents
- [Overview](#overview)
- [Local Data Binding](#local-data-binding)
- [Remote Data Binding](#remote-data-binding)
- [Field Mapping](#field-mapping)
- [Selection Modes](#selection-modes)
- [Common Patterns](#common-patterns)

---

## Overview

The ListBox `dataSource` property accepts:

| Data Type | When to Use | Example |
|-----------|------------|---------|
| **Array of objects** | Complex data with metadata | `List<Item> {new Item {Id=1, Name="Item1"}}` |
| **DataManager** | Remote APIs (OData, Web API) | Connect to backend services |
| **URL** | Direct API endpoint | `'/api/items'` |

---

## Local Data Binding

### Array of Objects

**Controller (`HomeController.cs`):**

```csharp
public class ProgrammingLanguage
{
    public string Id { get; set; }
    public string Name { get; set; }
}

public IActionResult Index()
{
    ViewBag.languages = new List<ProgrammingLanguage>
    {
        new ProgrammingLanguage { Id = "1", Name = "JavaScript" },
        new ProgrammingLanguage { Id = "2", Name = "TypeScript" },
        new ProgrammingLanguage { Id = "3", Name = "React" },
        new ProgrammingLanguage { Id = "4", Name = "Vue" },
        new ProgrammingLanguage { Id = "5", Name = "Angular" }
    };
    return View();
}
```

**View (`Index.cshtml`):**

```cshtml
<ejs-listbox id="languages"
    dataSource="@ViewBag.languages"
    height="300px">
    <e-listbox-fields text="Name" value="Id"></e-listbox-fields>
</ejs-listbox>
```

### With Multiple Fields

**Controller:**

```csharp
public class Employee
{
    public string Id { get; set; }
    public string Name { get; set; }
    public string Department { get; set; }
    public string IconCss { get; set; }
}

public IActionResult Index()
{
    ViewBag.employees = new List<Employee>
    {
        new Employee { Id = "1", Name = "Alice Johnson", Department = "Engineering", IconCss = "icon-engineer" },
        new Employee { Id = "2", Name = "Bob Smith", Department = "Sales", IconCss = "icon-sales" },
        new Employee { Id = "3", Name = "Carol Davis", Department = "Engineering", IconCss = "icon-engineer" }
    };
    return View();
}
```

**View:**

```cshtml
<ejs-listbox id="employees"
    dataSource="@ViewBag.employees"
    height="300px">
    <e-listbox-fields text="Name" value="Id" iconCss="IconCss" groupBy="Department"></e-listbox-fields>
</ejs-listbox>
```

---

## Remote Data Binding

### Using DataManager with Web API

**View:**

```cshtml
<ejs-listbox id="items"
    height="300px">
    <e-listbox-fields text="Name" value="Id"></e-listbox-fields>
    <e-data-manager url="/api/items" adaptor="UrlAdaptor"></e-data-manager>
</ejs-listbox>
```

**Controller (API Endpoint - `ItemsController.cs`):**

```csharp
[ApiController]
[Route("api/[controller]")]
public class ItemsController : ControllerBase
{
    [HttpGet]
    public IActionResult GetItems()
    {
        var items = new List<object>
        {
            new { Id = "1", Name = "Item 1" },
            new { Id = "2", Name = "Item 2" },
            new { Id = "3", Name = "Item 3" }
        };
        return Ok(items);
    }
}
```

**Expected Response:**
```json
[
  { "Id": "1", "Name": "Item 1" },
  { "Id": "2", "Name": "Item 2" },
  { "Id": "3", "Name": "Item 3" }
]
```

---

## Field Mapping

Map your data properties to component roles:

**View:**

```cshtml
<ejs-listbox id="items"
    dataSource="@ViewBag.items">
    <e-listbox-fields 
        text="DisplayName"
        value="ItemId"
        iconCss="IconClass"
        groupBy="Category"
        disabled="IsDisabled">
    </e-listbox-fields>
</ejs-listbox>
```

| Field | Purpose | Type |
|-------|---------|------|
| `text` | Display in list | string |
| `value` | Hidden value (stored/returned) | string |
| `iconCss` | CSS class for item icon | string |
| `groupBy` | Field to group items | string |
| `disabled` | Field to disable items | boolean |

---

## Selection Modes

### Single Selection (Default)

Users can select only one item:

```cshtml
<ejs-listbox id="items"
    dataSource="@ViewBag.items">
    <e-listbox-fields text="Name" value="Id"></e-listbox-fields>
    <e-listbox-selectionsettings mode="Single"></e-listbox-selectionsettings>
</ejs-listbox>
```

### Multiple Selection

Users can select multiple items:

```cshtml
<ejs-listbox id="items"
    dataSource="@ViewBag.items"
    change="onSelectionChange">
    <e-listbox-fields text="Name" value="Id"></e-listbox-fields>
    <e-listbox-selectionsettings mode="Multiple"></e-listbox-selectionsettings>
</ejs-listbox>

<script>
function onSelectionChange(args) {
    console.log('Selected values:', args.value);  // Array of selected values
    console.log('Selected items:', args.items);   // Array of selected item data
}
</script>
```

---

## Common Patterns

### Pattern 1: Simple List

```cshtml
<ejs-listbox id="items"
    dataSource="@ViewBag.items"
    height="300px">
    <e-listbox-fields text="Name" value="Id"></e-listbox-fields>
</ejs-listbox>
```

### Pattern 2: Grouped Items

**Controller:**

```csharp
public IActionResult Index()
{
    ViewBag.technologies = new List<Technology>
    {
        new Technology { Id = "1", Name = "HTML", Category = "Markup" },
        new Technology { Id = "2", Name = "CSS", Category = "Styling" },
        new Technology { Id = "3", Name = "JavaScript", Category = "Programming" },
        new Technology { Id = "4", Name = "TypeScript", Category = "Programming" }
    };
    return View();
}
```

**View:**

```cshtml
<ejs-listbox id="technologies"
    dataSource="@ViewBag.technologies"
    height="300px">
    <e-listbox-fields text="Name" value="Id" groupBy="Category"></e-listbox-fields>
</ejs-listbox>
```

### Pattern 3: With Filtering

```cshtml
<ejs-listbox id="items"
    dataSource="@ViewBag.items"
    allowFiltering="true"
    filterBarPlaceholder="Search..."
    height="300px">
    <e-listbox-fields text="Name" value="Id"></e-listbox-fields>
</ejs-listbox>
```

### Pattern 4: Pre-Selected Values

**Controller:**

```csharp
public IActionResult Index()
{
    ViewBag.items = GetItems();
    ViewBag.selectedValues = new[] { "1", "3" };  // Pre-select items with IDs 1 and 3
    return View();
}
```

**View:**

```cshtml
<ejs-listbox id="items"
    dataSource="@ViewBag.items"
    value="@ViewBag.selectedValues">
    <e-listbox-fields text="Name" value="Id"></e-listbox-fields>
    <e-listbox-selectionsettings mode="Multiple"></e-listbox-selectionsettings>
</ejs-listbox>
```
