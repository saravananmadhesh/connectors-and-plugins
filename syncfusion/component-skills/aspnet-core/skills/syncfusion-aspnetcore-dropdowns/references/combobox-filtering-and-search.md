# Filtering & Search Behavior

## Table of Contents
- [Overview](#overview)
- [Enable Filtering](#enable-filtering)
- [Custom Filter Functions](#custom-filter-functions)
- [Search Configuration](#search-configuration)
- [Performance Optimization](#performance-optimization)
- [No Results Handling](#no-results-handling)

---

## Overview

Filtering allows users to search and find items by typing. The ComboBox provides:

- **Built-in filtering:** Case-insensitive text search by default
- **Custom filters:** Advanced filtering logic (complex queries)
- **Case sensitivity:** Option to match case exactly
- **Performance:** Handle 10,000+ items efficiently with virtual scrolling

---

## Enable Filtering

### Basic Filtering (Default Behavior)

**View:**

```cshtml
<ejs-combobox id="sports-combo"
    dataSource="@ViewBag.sportsList"
    allowFiltering="true"
    placeholder="Type to search...">
</ejs-combobox>
```

**Controller:**

```csharp
public IActionResult Index()
{
    ViewBag.sportsList = new List<string> 
    { 
        "Cricket", 
        "Football", 
        "Tennis", 
        "Badminton", 
        "Volleyball" 
    };
    return View();
}
```

**User Behavior:**
1. User clicks dropdown → Search box appears
2. Types "foot" → Filters to show only "Football"
3. Selects result or continues typing

### With JSON Objects

**Controller:**

```csharp
public class Employee
{
    public string EmpId { get; set; }
    public string EmpName { get; set; }
    public string Department { get; set; }
}

public IActionResult Index()
{
    ViewBag.employeeData = new List<Employee>
    {
        new Employee { EmpId = "EMP001", EmpName = "Alice Johnson", Department = "Engineering" },
        new Employee { EmpId = "EMP002", EmpName = "Bob Smith", Department = "Sales" },
        new Employee { EmpId = "EMP003", EmpName = "Carol Davis", Department = "Engineering" }
    };
    return View();
}
```

**View:**

```cshtml
<ejs-combobox id="emp-combo"
    dataSource="@ViewBag.employeeData"
    allowFiltering="true"
    placeholder="Select an employee">
    <e-combobox-fields text="EmpName" value="EmpId"></e-combobox-fields>
</ejs-combobox>
```

---

## Custom Filter Functions

### Simple Custom Filter

Create filtering logic beyond text matching:

**View:**

```cshtml
<ejs-combobox id="items-combo"
    dataSource="@ViewBag.items"
    allowFiltering="true"
    filtering="customFilter"
    placeholder="Search by name or category...">
    <e-combobox-fields text="Name" value="Id"></e-combobox-fields>
</ejs-combobox>

<script>
function customFilter(e) {
    if (e.text === '') {
        e.updateData(@Html.Raw(Json.Serialize(ViewBag.items)));
    } else {
        var searchText = e.text.toLowerCase();
        var filtered = @Html.Raw(Json.Serialize(ViewBag.items)).filter(item =>
            item.Name.toLowerCase().includes(searchText) ||
            item.Category.toLowerCase().includes(searchText)
        );
        e.updateData(filtered);
    }
}
</script>
```

---

## Search Configuration

### Filter Type Options

Control how the search matches items:

```cshtml
<ejs-combobox id="combo"
    dataSource="@ViewBag.data"
    allowFiltering="true"
    filterType="StartsWith"
    placeholder="Starts with search...">
</ejs-combobox>
```

| Filter Type | Behavior | Example |
|------------|----------|---------|
| `StartsWith` | Match from beginning | "ba" matches "Badminton" |
| `EndsWith` | Match from end | "ton" matches "Badminton" |
| `Contains` | Match anywhere | "min" matches "Badminton" |

### Case-Sensitive Filtering

By default, filtering is case-insensitive. Enable case sensitivity:

```cshtml
<ejs-combobox id="combo"
    dataSource="@ViewBag.data"
    allowFiltering="true"
    ignoreCase="false"
    placeholder="Case-sensitive search...">
</ejs-combobox>
```

### Diacritics Handling

Ignore accent marks and diacritical characters:

```cshtml
<ejs-combobox id="combo"
    dataSource="@ViewBag.data"
    allowFiltering="true"
    ignoreAccent="true"
    placeholder="Ignores accents (café = cafe)...">
</ejs-combobox>
```

### Debounce Delay

Add delay between keystrokes and filter execution (useful for remote data):

```cshtml
<ejs-combobox id="combo"
    dataSource="@ViewBag.data"
    allowFiltering="true"
    debounceDelay="500"
    placeholder="Search with 500ms delay...">
</ejs-combobox>
```

---

## Performance Optimization

### Virtual Scrolling

For large datasets (1000+ items), enable virtual scrolling:

```cshtml
<ejs-combobox id="large-list"
    dataSource="@ViewBag.largeData"
    allowFiltering="true"
    enableVirtualization="true"
    popupHeight="300px"
    placeholder="Virtual scroll enabled...">
</ejs-combobox>
```

---

## No Results Handling

### Default No Records Template

When filter returns no results, display custom message:

```cshtml
<ejs-combobox id="combo"
    dataSource="@ViewBag.data"
    allowFiltering="true"
    noRecordsTemplate="<div class='no-data'>No matching items found</div>"
    placeholder="Search...">
</ejs-combobox>
```

### Custom No Records Template

Create complex HTML for no results:

**View:**

```cshtml
<ejs-combobox id="combo"
    dataSource="@ViewBag.data"
    allowFiltering="true"
    noRecordsTemplate="noRecordsTemplateFn"
    placeholder="Search...">
</ejs-combobox>

<script>
function noRecordsTemplateFn(e) {
    return '<div class="no-results">' +
           '<p>No items match your search</p>' +
           '<small>Try different keywords</small>' +
           '</div>';
}
</script>
```

### Filter Complete Event

Execute code when filtering finishes:

```cshtml
<ejs-combobox id="combo"
    dataSource="@ViewBag.data"
    allowFiltering="true"
    filtering="onFiltering"
    placeholder="Search...">
</ejs-combobox>

<script>
function onFiltering(e) {
    console.log('Filter text:', e.text);
    console.log('Filter type:', e.filterType);
    // Custom logic here
}
</script>
```

---

## Combined Example

**Complete filtering setup:**

```cshtml
<ejs-combobox id="employees"
    dataSource="@ViewBag.employees"
    allowFiltering="true"
    filterType="Contains"
    ignoreCase="true"
    ignoreAccent="true"
    debounceDelay="300"
    enableVirtualization="true"
    noRecordsTemplate="<div>No employees found</div>"
    placeholder="Search employees...">
    <e-combobox-fields text="Name" value="Id"></e-combobox-fields>
</ejs-combobox>
```
