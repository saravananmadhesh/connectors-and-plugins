# Grouping & Sorting

## Table of Contents
- [Grouping Overview](#grouping-overview)
- [Basic Grouping](#basic-grouping)
- [Sorting Options](#sorting-options)
- [Combined Grouping & Sorting](#combined-grouping--sorting)
- [Custom Group Headers](#custom-group-headers)

---

## Grouping Overview

Grouping organizes list items into logical categories with section headers. This improves usability for large datasets by grouping related items together.

**When to use:**
- Department/category organization (e.g., Engineering, Sales, HR)
- Geographic grouping (e.g., USA, Europe, Asia)
- Type-based grouping (e.g., Fruits, Vegetables)
- Status-based grouping (e.g., Active, Inactive)

---

## Basic Grouping

### Enable Grouping with `groupBy` Field

**Controller:**
```csharp
public class Employee
{
    public string EmployeeId { get; set; }
    public string Name { get; set; }
    public string Department { get; set; }
}

public ActionResult Index()
{
    List<Employee> employeeData = new List<Employee>
    {
        new Employee { EmployeeId = "emp1", Name = "Alice Johnson", Department = "Engineering" },
        new Employee { EmployeeId = "emp2", Name = "Bob Smith", Department = "Sales" },
        new Employee { EmployeeId = "emp3", Name = "Carol Davis", Department = "Engineering" },
        new Employee { EmployeeId = "emp4", Name = "David Lee", Department = "Sales" },
        new Employee { EmployeeId = "emp5", Name = "Eve Wilson", Department = "HR" }
    };
    ViewBag.EmployeeData = employeeData;
    return View();
}
```

**View (Razor):**
```html
<ejs-combobox id="emp-combo" 
    dataSource="ViewBag.EmployeeData"
    placeholder="Select an employee">
    <e-combobox-fields text="Name" value="EmployeeId" groupBy="Department"></e-combobox-fields>
</ejs-combobox>
```

**Result:**
```
Engineering
  - Alice Johnson
  - Carol Davis
Sales
  - Bob Smith
  - David Lee
HR
  - Eve Wilson
```

### Grouping with Simple Data

For simple arrays, create objects with groupBy field:

**Controller:**
```csharp
public ActionResult Index()
{
    List<dynamic> fruitData = new List<dynamic>
    {
        new { Name = "Apple", Category = "Red Fruits" },
        new { Name = "Cherry", Category = "Red Fruits" },
        new { Name = "Banana", Category = "Yellow Fruits" },
        new { Name = "Mango", Category = "Yellow Fruits" }
    };
    ViewBag.FruitData = fruitData;
    return View();
}
```

**View (Razor):**
```html
<ejs-combobox id="fruit-combo"
    dataSource="ViewBag.FruitData">
    <e-combobox-fields text="Name" value="Name" groupBy="Category"></e-combobox-fields>
</ejs-combobox>
```

---

## Sorting Options

### Sort Data

Control item order in dropdown using `sortOrder`:

**Controller:**
```csharp
using System.Linq;

public ActionResult Index()
{
    List<Employee> employeeData = new List<Employee>
    {
        new Employee { EmployeeId = "emp1", Name = "Alice Johnson", Department = "Engineering" },
        new Employee { EmployeeId = "emp2", Name = "Bob Smith", Department = "Sales" },
        new Employee { EmployeeId = "emp3", Name = "Carol Davis", Department = "Engineering" }
    };
    
    // Sort ascending
    ViewBag.SortedAscending = employeeData.OrderBy(e => e.Name).ToList();
    
    // Sort descending
    ViewBag.SortedDescending = employeeData.OrderByDescending(e => e.Name).ToList();
    
    return View();
}
```

**View (Razor):**
```html
<!-- Ascending sort -->
<ejs-combobox id="emp-asc"
    dataSource="ViewBag.SortedAscending"
    placeholder="Sorted A → Z">
    <e-combobox-fields text="Name" value="EmployeeId"></e-combobox-fields>
</ejs-combobox>

<!-- Descending sort -->
<ejs-combobox id="emp-desc"
    dataSource="ViewBag.SortedDescending"
    placeholder="Sorted Z → A">
    <e-combobox-fields text="Name" value="EmployeeId"></e-combobox-fields>
</ejs-combobox>
```

### Sort Directions

| Direction | Method |
|-----------|--------|
| **Ascending** | `OrderBy()` |
| **Descending** | `OrderByDescending()` |
| **None** | Original order |

---

## Combined Grouping & Sorting

Combine grouping with sorting for better organization:

**Controller:**
```csharp
using System.Linq;

public ActionResult Index()
{
    List<Employee> employeeData = new List<Employee>
    {
        new Employee { EmployeeId = "emp1", Name = "Zoe Johnson", Department = "Engineering" },
        new Employee { EmployeeId = "emp2", Name = "Alice Smith", Department = "Sales" },
        new Employee { EmployeeId = "emp3", Name = "Carol Davis", Department = "Engineering" },
        new Employee { EmployeeId = "emp4", Name = "Bob Lee", Department = "Sales" }
    };
    
    // Sort by name within each group
    var sortedAndGrouped = employeeData
        .OrderBy(e => e.Department)
        .ThenBy(e => e.Name)
        .ToList();
    
    ViewBag.EmployeeData = sortedAndGrouped;
    return View();
}
```

**View (Razor):**
```html
<ejs-combobox id="emp-combo"
    dataSource="ViewBag.EmployeeData"
    placeholder="Grouped and sorted">
    <e-combobox-fields text="Name" value="EmployeeId" groupBy="Department"></e-combobox-fields>
</ejs-combobox>
```

---

## Custom Group Headers

### Customize Group Template

**View (Razor):**
```html
<ejs-combobox id="emp-combo"
    dataSource="ViewBag.EmployeeData"
    groupTemplate="#groupTemplate"
    placeholder="Select employee">
    <e-combobox-fields text="Name" value="EmployeeId" groupBy="Department"></e-combobox-fields>
</ejs-combobox>

<script id="groupTemplate" type="text/x-template">
    <div class="e-group-header">
        <span class="e-group-name">${Department}</span>
        <span class="e-group-count">${Count} employees</span>
    </div>
</script>
```

**CSS for custom headers:**
```css
.e-group-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f5f5f5;
    padding: 8px 12px;
    font-weight: bold;
    border-bottom: 1px solid #ddd;
}

.e-group-name {
    color: #333;
}

.e-group-count {
    color: #999;
    font-size: 12px;
    font-weight: normal;
}
```

### Group Count Display

The template system in ASP.NET Core ComboBox provides automatic access to group metadata through expressions in the template.
