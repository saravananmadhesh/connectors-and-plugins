# Grouping, Nested Lists & Virtualization

## Table of Contents
- [Grouping Overview](#grouping-overview)
- [Group Templates](#group-templates)
- [Nested List Navigation](#nested-list-navigation)
- [UI Virtualization](#ui-virtualization)
- [Virtualization Modes](#virtualization-modes)
- [Performance Optimization](#performance-optimization)
- [Conditional Rendering](#conditional-rendering)

## Grouping Overview

Grouping organizes list items into categories using the `groupBy` field. Items are automatically wrapped under group headers.

### Basic Grouping

```csharp
public class Vehicle
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Brand { get; set; } // Grouping field
}

var vehicles = new List<Vehicle>()
{
    new Vehicle { Id = 1, Name = "A4", Brand = "Audi" },
    new Vehicle { Id = 2, Name = "A5", Brand = "Audi" },
    new Vehicle { Id = 3, Name = "Series 3", Brand = "BMW" },
    new Vehicle { Id = 4, Name = "Series 5", Brand = "BMW" },
    new Vehicle { Id = 5, Name = "Civic", Brand = "Honda" }
};
```

```cshtml
<ejs-listview id="vehicles" dataSource="@ViewBag.Vehicles">
    <e-listview-fieldsettings 
        id="Id" 
        text="Name" 
        groupBy="Brand">
    </e-listview-fieldsettings>
</ejs-listview>
```

**Output:**
```
[Audi]
  ├── A4
  └── A5
[BMW]
  ├── Series 3
  └── Series 5
[Honda]
  └── Civic
```

### Grouped Data Rendering

Each group automatically renders with:
- Group header displaying the group key (e.g., "Audi", "BMW")
- Indented list items under the header
- Collapsible/expandable behavior (optional with templates)

## Group Templates

The `groupTemplate` property customizes group header appearance:

### Simple Group Template

```cshtml
<ejs-listview id="vehicles" dataSource="@ViewBag.Vehicles"
    groupTemplate="<div class='e-list-group-item'>${key}</div>">
    <e-listview-fieldsettings 
        id="Id" 
        text="Name" 
        groupBy="Brand">
    </e-listview-fieldsettings>
</ejs-listview>
```

### Group Template with Item Count

Display the number of items in each group:

```cshtml
<ejs-listview id="vehicles" dataSource="@ViewBag.Vehicles"
    groupTemplate="<div class='e-list-group-item'>${key} (${items.length} items)</div>">
    <e-listview-fieldsettings 
        id="Id" 
        text="Name" 
        groupBy="Brand">
    </e-listview-fieldsettings>
</ejs-listview>
```

### Advanced Group Template with Styling

```cshtml
<ejs-listview id="products" dataSource="@ViewBag.Products"
    groupTemplate="<div class='e-list-group-item' style='background-color: #e3f2fd; font-weight: bold;'><span class='e-badge e-badge-primary'>${items.length}</span>${key}</div>">
    <e-listview-fieldsettings 
        id="Id" 
        text="Name" 
        groupBy="Category">
    </e-listview-fieldsettings>
</ejs-listview>
```

## Nested List Navigation

The `child` property enables drill-down navigation through hierarchical data:

### Multi-Level Hierarchy

```csharp
public class Continent
{
    public int Id { get; set; }
    public string Name { get; set; }
    public List<Country> Countries { get; set; }
}

public class Country
{
    public int Id { get; set; }
    public string Name { get; set; }
    public List<City> Cities { get; set; }
}

public class City
{
    public int Id { get; set; }
    public string Name { get; set; }
}

var continents = new List<Continent>()
{
    new Continent 
    { 
        Id = 1, 
        Name = "Asia",
        Countries = new List<Country>()
        {
            new Country 
            { 
                Id = 101, 
                Name = "India",
                Cities = new List<City>()
                {
                    new City { Id = 1001, Name = "Delhi" },
                    new City { Id = 1002, Name = "Mumbai" }
                }
            },
            new Country 
            { 
                Id = 102, 
                Name = "China",
                Cities = new List<City>()
                {
                    new City { Id = 1011, Name = "Beijing" },
                    new City { Id = 1012, Name = "Shanghai" }
                }
            }
        }
    },
    new Continent 
    { 
        Id = 2, 
        Name = "Europe",
        Countries = new List<Country>()
        {
            new Country 
            { 
                Id = 201, 
                Name = "France",
                Cities = new List<City>()
                {
                    new City { Id = 2001, Name = "Paris" }
                }
            }
        }
    }
};
```

```cshtml
<ejs-listview id="locations" dataSource="@ViewBag.Continents">
    <e-listview-fieldsettings 
        id="Id" 
        text="Name" 
        child="Countries">
    </e-listview-fieldsettings>
</ejs-listview>
```

**Navigation Flow:**
1. User clicks "Asia" → Shows India, China
2. User clicks "India" → Shows Delhi, Mumbai
3. User clicks back button → Returns to country list
4. User clicks back again → Returns to continent list

### Nested Lists with Different Fields

```csharp
public class Category
{
    public int CategoryId { get; set; }
    public string CategoryName { get; set; }
    public List<Product> Products { get; set; }
}

public class Product
{
    public int ProductId { get; set; }
    public string ProductName { get; set; }
    public decimal Price { get; set; }
}
```

```cshtml
<ejs-listview id="catalog" dataSource="@ViewBag.Categories">
    <e-listview-fieldsettings 
        id="CategoryId" 
        text="CategoryName" 
        child="Products">
    </e-listview-fieldsettings>
</ejs-listview>
```

**Note:** Inner list automatically maps to nested structure; field names adjust to Product properties.

## UI Virtualization

Virtualization renders only visible items, dramatically improving performance with large datasets.

### Enable Virtualization

```cshtml
<ejs-listview id="largeList" 
    dataSource="@ViewBag.LargeData" 
    enableVirtualization="true" 
    height="500">
</ejs-listview>
```

### Performance Impact

| Dataset Size | Without Virtualization | With Virtualization |
|--------------|------------------------|---------------------|
| 100 items | ~30ms render | ~5ms render |
| 1,000 items | ~300ms render | ~10ms render |
| 10,000 items | ~3000ms render | ~15ms render |

**Key Benefit:** Virtualization maintains constant rendering time regardless of dataset size.

## Virtualization Modes

### Window Scroll Mode (Default)

Uses browser window scrollbar. Best for full-page lists:

```cshtml
<ejs-listview id="list" 
    dataSource="@ViewBag.Data" 
    enableVirtualization="true">
</ejs-listview>
```

**Characteristics:**
- Scrollbar is browser window scrollbar
- No explicit height needed
- Items load as user scrolls down page

### Container Scroll Mode

Uses internal scrollbar within a fixed-height container. Best for sidebar/drawer lists:

```cshtml
<ejs-listview id="list" 
    dataSource="@ViewBag.Data" 
    enableVirtualization="true" 
    height="500">
</ejs-listview>
```

**Characteristics:**
- Internal scrollbar within ListView element
- Fixed height specified (500px)
- Items load as user scrolls within container
- Multiple lists can exist on same page

### Which Mode to Use?

```
Window Scroll:
  ✓ Full-page list view
  ✓ Master/detail layout
  ✓ Single list per page

Container Scroll:
  ✓ Sidebar lists
  ✓ Multiple lists on page
  ✓ Drawer/modal lists
  ✓ Fixed-size panels
```

## Performance Optimization

### Strategy 1: Enable Virtualization + Container Height

```cshtml
<ejs-listview id="optimized" 
    dataSource="@ViewBag.Data" 
    enableVirtualization="true" 
    height="600"
    sortOrder="Ascending">
    <e-listview-fieldsettings 
        id="Id" 
        text="Name" 
        sortBy="Name">
    </e-listview-fieldsettings>
</ejs-listview>
```

### Strategy 2: Use Query for Server-Side Filtering

Reduce data transferred to client:

```csharp
var data = new DataManager
{
    Url = "https://api.example.com/items",
    Adaptor = "UrlAdaptor"
};
ViewBag.FilteredData = data;
```

```cshtml
<ejs-listview id="filtered" dataSource="@ViewBag.FilteredData"
    query="new ej.data.Query().where('Status', 'equal', 'Active').take(100)">
    <e-listview-fieldsettings id="Id" text="Name"></e-listview-fieldsettings>
</ejs-listview>
```

### Strategy 3: Simple Templates

Complex HTML templates increase rendering time. Keep templates simple:

```cshtml
<!-- GOOD: Simple template -->
<template>${Name}</template>

<!-- AVOID: Complex template -->
<template>
    <div class="wrapper">
        <span>${FirstName} ${LastName}</span>
        <p>${Description}</p>
        <div class="details">
            <span>${Department}</span>
            <span>${Email}</span>
            <span>${Phone}</span>
        </div>
    </div>
</template>
```

### Strategy 4: Pagination Instead of Virtualization

For extremely large datasets (100k+), use pagination:

```csharp
// Fetch 50 items per page
var page1 = data.Skip(0).Take(50);
var page2 = data.Skip(50).Take(50);
```

## Conditional Rendering

Conditionally render template content based on data values:

### Conditional CSS Classes

```cshtml
<ejs-listview id="status" dataSource="@ViewBag.Tasks"
    template="<div class='e-list-wrapper ${Priority === 'High' ? 'e-high-priority' : 'e-normal-priority'}'><span class='e-list-content'>${TaskName}</span></div>">
    <e-listview-fieldsettings 
        id="TaskId" 
        text="TaskName">
    </e-listview-fieldsettings>
</ejs-listview>
```

**CSS:**
```css
.e-high-priority {
    background-color: #ffebee;
    border-left: 3px solid #f44336;
}

.e-normal-priority {
    background-color: #f5f5f5;
}
```

### Conditional Attributes

```cshtml
<div class="e-list-wrapper" id="${Id}">
    <span class="e-list-content" title="${Availability === 'Available' ? 'In stock' : 'Out of stock'}">
        ${ProductName}
    </span>
</div>
```

### Conditional Elements

```cshtml
<div class="e-list-wrapper">
    <span class="e-list-content">${Name}</span>
    ${Status === 'Premium' ? '<span class="e-badge e-badge-primary">Premium</span>' : ''}
</div>
```

### Ternary Operator Examples

```cshtml
<!-- Show different text based on condition -->
${IsActive ? 'Active' : 'Inactive'}

<!-- Show different icon based on condition -->
<span class="${IsVerified ? 'e-icons e-check' : 'e-icons e-close'}"></span>

<!-- Show conditional paragraph -->
${Comments ? '<p class="comment">' + Comments + '</p>' : ''}
```

## Advanced Patterns

### Pattern: Grouped + Virtualized List

```cshtml
<ejs-listview id="grouped" 
    dataSource="@ViewBag.LargeGroupedData" 
    enableVirtualization="true"
    height="600"
    groupTemplate="<div class='e-list-group-item'>${key} (${items.length})</div>">
    <e-listview-fieldsettings 
        id="Id" 
        text="Name" 
        groupBy="Department">
    </e-listview-fieldsettings>
</ejs-listview>
```

### Pattern: Nested + Virtualized List

```cshtml
<ejs-listview id="nested" 
    dataSource="@ViewBag.LargeNested" 
    enableVirtualization="true"
    height="600">
    <e-listview-fieldsettings 
        id="Id" 
        text="Name" 
        child="SubItems">
    </e-listview-fieldsettings>
</ejs-listview>
```

---

**Related Topics:**
- [Field Settings & Configuration](field-settings-and-configuration.md) for field mapping
- [Templates & Customization](templates-and-customization.md) for advanced styling
- [Sorting, Filtering & Scrolling](sorting-filtering-scrolling.md) for scroll events
