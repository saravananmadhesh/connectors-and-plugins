# Field Settings and Configuration

## Table of Contents
- [Field Settings Overview](#field-settings-overview)
- [Core Field Properties](#core-field-properties)
- [State Properties](#state-properties)
- [Display Properties](#display-properties)
- [Data Organization Properties](#data-organization-properties)
- [Configuration Patterns](#configuration-patterns)
- [Validation and Edge Cases](#validation-and-edge-cases)

## Field Settings Overview

The `<e-listview-fieldsettings>` tag controls how ListView extracts and interprets data from the source. It provides 14 configurable properties that map data attributes to component features.

### FieldSettingsModel Properties

| Property | Type | Purpose |
|----------|------|---------|
| id | string | Unique identifier field |
| text | string | Display text field |
| child | string | Nested child data field |
| groupBy | string | Grouping/category field |
| iconCss | string | Icon CSS class field |
| enabled | string | Enable/disable state field |
| isChecked | string | Checkbox state field |
| isVisible | string | Visibility state field |
| tooltip | string | Tooltip text field |
| sortBy | string | Sort field reference |
| htmlAttributes | string | HTML attributes field |
| tableName | string | Remote data table name |

## Core Field Properties

### id Property

The `id` property specifies the unique identifier field from the data source:

```csharp
public class Item
{
    public int ItemId { get; set; }
    public string ItemName { get; set; }
}

var data = new List<Item>()
{
    new Item { ItemId = 1, ItemName = "Item 1" },
    new Item { ItemId = 2, ItemName = "Item 2" }
};
```

```cshtml
<ejs-listview id="list" dataSource="@ViewBag.Data">
    <e-listview-fieldsettings id="ItemId" text="ItemName"></e-listview-fieldsettings>
</ejs-listview>
```

**Usage:** ListView uses id for selection, event data, and tracking.

### text Property

The `text` property maps the display content for each list item:

```csharp
public class Product
{
    public int ProductId { get; set; }
    public string ProductName { get; set; }
    public string Sku { get; set; }
}
```

```cshtml
<!-- Display ProductName -->
<ejs-listview id="list" dataSource="@ViewBag.Products">
    <e-listview-fieldsettings text="ProductName" id="ProductId"></e-listview-fieldsettings>
</ejs-listview>

<!-- OR display SKU -->
<ejs-listview id="list" dataSource="@ViewBag.Products">
    <e-listview-fieldsettings text="Sku" id="ProductId"></e-listview-fieldsettings>
</ejs-listview>
```

**Key Point:** Only the `text` field renders in the UI by default. Use `template` for multi-field display.

## State Properties

### enabled Property

The `enabled` property controls which items are interactive vs. disabled:

```csharp
public class MenuItem
{
    public int Id { get; set; }
    public string Label { get; set; }
    public bool IsEnabled { get; set; }
}

var items = new List<MenuItem>()
{
    new MenuItem { Id = 1, Label = "Edit", IsEnabled = true },
    new MenuItem { Id = 2, Label = "Delete", IsEnabled = false },
    new MenuItem { Id = 3, Label = "Archive", IsEnabled = true }
};
```

```cshtml
<ejs-listview id="list" dataSource="@ViewBag.Items">
    <e-listview-fieldsettings 
        id="Id" 
        text="Label" 
        enabled="IsEnabled">
    </e-listview-fieldsettings>
</ejs-listview>
```

**Result:** "Delete" item appears grayed out and non-interactive; "Edit" and "Archive" are clickable.

### isChecked Property

The `isChecked` property pre-sets checkbox state for items when `showCheckBox="true"`:

```csharp
public class Task
{
    public int TaskId { get; set; }
    public string TaskName { get; set; }
    public bool IsCompleted { get; set; }
}

var tasks = new List<Task>()
{
    new Task { TaskId = 1, TaskName = "Setup", IsCompleted = true },
    new Task { TaskId = 2, TaskName = "Testing", IsCompleted = false },
    new Task { TaskId = 3, TaskName = "Deploy", IsCompleted = false }
};
```

```cshtml
<ejs-listview id="taskList" dataSource="@ViewBag.Tasks" showCheckBox="true">
    <e-listview-fieldsettings 
        id="TaskId" 
        text="TaskName" 
        isChecked="IsCompleted">
    </e-listview-fieldsettings>
</ejs-listview>
```

**Result:** "Setup" checkbox is pre-checked; "Testing" and "Deploy" are unchecked.

### isVisible Property

The `isVisible` property determines which items display or are hidden:

```csharp
public class FeatureItem
{
    public int FeatureId { get; set; }
    public string FeatureName { get; set; }
    public bool IsVisible { get; set; }
}

var features = new List<FeatureItem>()
{
    new FeatureItem { FeatureId = 1, FeatureName = "Public Feature", IsVisible = true },
    new FeatureItem { FeatureId = 2, FeatureName = "Private Feature", IsVisible = false },
    new FeatureItem { FeatureId = 3, FeatureName = "Beta Feature", IsVisible = true }
};
```

```cshtml
<ejs-listview id="features" dataSource="@ViewBag.Features">
    <e-listview-fieldsettings 
        id="FeatureId" 
        text="FeatureName" 
        isVisible="IsVisible">
    </e-listview-fieldsettings>
</ejs-listview>
```

**Result:** Only "Public Feature" and "Beta Feature" render; "Private Feature" is completely hidden.

## Display Properties

### iconCss Property

The `iconCss` property dynamically assigns CSS icon classes to list items:

```csharp
public class MenuItem
{
    public int Id { get; set; }
    public string Label { get; set; }
    public string IconClass { get; set; }
}

var menu = new List<MenuItem>()
{
    new MenuItem { Id = 1, Label = "Home", IconClass = "e-icons e-home" },
    new MenuItem { Id = 2, Label = "Settings", IconClass = "e-icons e-settings" },
    new MenuItem { Id = 3, Label = "Help", IconClass = "e-icons e-question" }
};
```

```cshtml
<ejs-listview id="menu" dataSource="@ViewBag.Menu" showIcon="true">
    <e-listview-fieldsettings 
        id="Id" 
        text="Label" 
        iconCss="IconClass">
    </e-listview-fieldsettings>
</ejs-listview>
```

**CSS Requirement:** Ensure `showIcon="true"` is set; use Syncfusion icon classes or custom CSS classes.

### tooltip Property

The `tooltip` property adds hover tooltips to items:

```csharp
public class Product
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
}

var products = new List<Product>()
{
    new Product { Id = 1, Name = "Laptop", Description = "High-performance computing device" },
    new Product { Id = 2, Name = "Mouse", Description = "Wireless pointing device" }
};
```

```cshtml
<ejs-listview id="products" dataSource="@ViewBag.Products">
    <e-listview-fieldsettings 
        id="Id" 
        text="Name" 
        tooltip="Description">
    </e-listview-fieldsettings>
</ejs-listview>
```

**Result:** Hovering over "Laptop" shows "High-performance computing device" tooltip.

## Data Organization Properties

### groupBy Property

The `groupBy` property organizes items into categories:

```csharp
public class Car
{
    public int Id { get; set; }
    public string Model { get; set; }
    public string Brand { get; set; } // Grouping field
}

var cars = new List<Car>()
{
    new Car { Id = 1, Model = "A4", Brand = "Audi" },
    new Car { Id = 2, Model = "A5", Brand = "Audi" },
    new Car { Id = 3, Model = "501", Brand = "BMW" },
    new Car { Id = 4, Model = "502", Brand = "BMW" }
};
```

```cshtml
<ejs-listview id="cars" dataSource="@ViewBag.Cars">
    <e-listview-fieldsettings 
        id="Id" 
        text="Model" 
        groupBy="Brand">
    </e-listview-fieldsettings>
</ejs-listview>
```

**Result:**
```
[Audi]
  - A4
  - A5
[BMW]
  - 501
  - 502
```

### child Property

The `child` property enables nested list navigation:

```csharp
public class Category
{
    public int Id { get; set; }
    public string Name { get; set; }
    public List<SubCategory> Subcategories { get; set; }
}

public class SubCategory
{
    public int Id { get; set; }
    public string Name { get; set; }
}

var categories = new List<Category>()
{
    new Category 
    { 
        Id = 1, 
        Name = "Electronics", 
        Subcategories = new List<SubCategory>()
        {
            new SubCategory { Id = 101, Name = "Laptops" },
            new SubCategory { Id = 102, Name = "Phones" }
        }
    },
    new Category 
    { 
        Id = 2, 
        Name = "Clothing", 
        Subcategories = new List<SubCategory>()
        {
            new SubCategory { Id = 201, Name = "Shirts" },
            new SubCategory { Id = 202, Name = "Pants" }
        }
    }
};
```

```cshtml
<ejs-listview id="categories" dataSource="@ViewBag.Categories">
    <e-listview-fieldsettings 
        id="Id" 
        text="Name" 
        child="Subcategories">
    </e-listview-fieldsettings>
</ejs-listview>
```

**Result:** Click "Electronics" → Shows "Laptops" and "Phones"; back button returns to main list.

### sortBy Property

The `sortBy` property specifies a field for sorting:

```csharp
public class Person
{
    public int Id { get; set; }
    public string Name { get; set; }
    public int Age { get; set; }
}

var people = new List<Person>()
{
    new Person { Id = 1, Name = "Charlie", Age = 30 },
    new Person { Id = 2, Name = "Alice", Age = 25 },
    new Person { Id = 3, Name = "Bob", Age = 35 }
};
```

```cshtml
<ejs-listview id="people" dataSource="@ViewBag.People" sortOrder="Ascending">
    <e-listview-fieldsettings 
        id="Id" 
        text="Name" 
        sortBy="Name">
    </e-listview-fieldsettings>
</ejs-listview>
```

**Result:** Items sorted alphabetically: Alice, Bob, Charlie.

## Configuration Patterns

### Pattern 1: Complete Configuration

```csharp
public class CompleteItem
{
    public int ItemId { get; set; }
    public string ItemName { get; set; }
    public string Category { get; set; }
    public string IconClass { get; set; }
    public bool IsActive { get; set; }
    public bool IsSelected { get; set; }
    public bool IsShown { get; set; }
    public string Info { get; set; }
    public List<CompleteItem> Children { get; set; }
}
```

```cshtml
<ejs-listview id="complete" 
    dataSource="@ViewBag.CompleteItems" 
    showIcon="true" 
    showCheckBox="true">
    <e-listview-fieldsettings 
        id="ItemId"
        text="ItemName"
        groupBy="Category"
        iconCss="IconClass"
        enabled="IsActive"
        isChecked="IsSelected"
        isVisible="IsShown"
        tooltip="Info"
        child="Children">
    </e-listview-fieldsettings>
</ejs-listview>
```

### Pattern 2: Minimal Configuration

```csharp
var simple = new List<string> { "Item1", "Item2", "Item3" };
```

```cshtml
<ejs-listview id="simple" dataSource="@ViewBag.SimpleList"></ejs-listview>
```

**Note:** Default field mapping works for simple arrays without explicit `<e-listview-fieldsettings>`.

### Pattern 3: Remote Data with Fields

```cshtml
<ejs-listview id="remote"
    query="new ej.data.Query().from('Employees').take(20)">
    <e-data-manager url="https://services.syncfusion.com/aspnet/production/api/" crossDomain="true">
    </e-data-manager>
    <e-listview-fieldsettings 
        id="EmployeeID"
        text="FirstName"
        tooltip="Title"
        enabled="ReportsTo">
    </e-listview-fieldsettings>
</ejs-listview>
```

## Validation and Edge Cases

### Case Sensitivity

Field names are **case-sensitive**. Mismatches result in empty values:

```csharp
// Data model
public class Product { public string ProductName { get; set; } }

// Correct
<e-listview-fieldsettings text="ProductName"></e-listview-fieldsettings>

// INCORRECT - Won't render
<e-listview-fieldsettings text="productName"></e-listview-fieldsettings>
```

**Solution:** Always match field names exactly to data source properties.

### Null/Missing Values

If a mapped field is null or missing, ListView displays empty:

```csharp
public class Item
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string OptionalField { get; set; } // May be null
}
```

**Best Practice:** Initialize fields with default values or check existence in data model.

### Type Mismatches

If field type doesn't match expected type, conversion occurs:

```csharp
// Boolean to string: "true" displays as "true"
public bool IsActive { get; set; }
<e-listview-fieldsettings text="IsActive"></e-listview-fieldsettings>

// Integer to string: "123" displays as "123"
public int Count { get; set; }
<e-listview-fieldsettings text="Count"></e-listview-fieldsettings>
```

### Large Nested Structures

For deeply nested data, use `child` property carefully:

```csharp
// Maximum recommended nesting: 3-4 levels
Category > SubCategory > Product > Variant
```

**Performance Note:** Each level adds DOM rendering; deep nesting impacts performance.

---

**Related Topics:**
- [Grouping, Nested Lists & Virtualization](grouping-nested-lists-virtualization.md)
- [Getting Started & Data Binding](getting-started-and-data-binding.md)
- [Templates & Customization](templates-and-customization.md)
