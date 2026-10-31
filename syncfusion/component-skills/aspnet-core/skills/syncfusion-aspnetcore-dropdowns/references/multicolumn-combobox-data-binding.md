# Data Binding — MultiColumn ComboBox

## Table of Contents
- [Overview](#overview)
- [Fields Mapping](#fields-mapping)
- [Binding Local Data](#binding-local-data)
- [Binding Remote Data](#binding-remote-data)
- [Using Query](#using-query)
- [Supported Data Services](#supported-data-services)

---

## Overview

The MultiColumn ComboBox accepts data through the `dataSource` property. It supports:
- Plain C# object arrays (local data)
- `DataManager` instances (remote or advanced local queries)

The `fields` property maps which data object keys serve as the display text and hidden value.

---

## Fields Mapping

```cshtml
<e-multicolumncombobox-fields 
    text="Name"
    value="EmpID">
</e-multicolumncombobox-fields>
```

| Field | Type | Description |
|-------|------|-------------|
| `text` | `string` | Property to display as item text in the input |
| `value` | `string` | Property used as the underlying value |

> **Important:** Map `fields` correctly — an incorrect mapping causes the selected item to appear `undefined`.

---

## Binding Local Data

Pass a list of objects to `dataSource`. Each object's keys must include what `fields.text`, `fields.value`, and each `<e-column field>` reference.

**Controller:**

```csharp
public class Employee
{
    public int EmpID { get; set; }
    public string Name { get; set; }
    public string Designation { get; set; }
    public string Country { get; set; }
}

public IActionResult Index()
{
    ViewBag.empData = new List<Employee>
    {
        new Employee { EmpID = 1001, Name = "Andrew Fuller", Designation = "Team Lead", Country = "England" },
        new Employee { EmpID = 1002, Name = "Robert", Designation = "Developer", Country = "USA" },
        new Employee { EmpID = 1003, Name = "Michael", Designation = "HR", Country = "Russia" },
        new Employee { EmpID = 1004, Name = "Steven Buchanan", Designation = "Product Manager", Country = "Ukraine" },
        new Employee { EmpID = 1005, Name = "Margaret Peacock", Designation = "Developer", Country = "Egypt" }
    };
    return View();
}
```

**View:**

```cshtml
<ejs-multicolumncombobox id="multicolumn"
    dataSource="@ViewBag.empData"
    text="Michael"
    placeholder="Select an employee">
    <e-multicolumncombobox-fields text="Name" value="EmpID"></e-multicolumncombobox-fields>
    <e-multicolumncombobox-columns>
        <e-multicolumncombobox-column field="EmpID" header="Employee ID" width="90"></e-multicolumncombobox-column>
        <e-multicolumncombobox-column field="Name" header="Name" width="90"></e-multicolumncombobox-column>
        <e-multicolumncombobox-column field="Designation" header="Designation" width="90"></e-multicolumncombobox-column>
        <e-multicolumncombobox-column field="Country" header="Country" width="70"></e-multicolumncombobox-column>
    </e-multicolumncombobox-columns>
</ejs-multicolumncombobox>
```

---

## Binding Remote Data

Use `DataManager` with an adaptor to fetch data from a REST API:

**View:**

```cshtml
<ejs-multicolumncombobox id="multicolumn"
    placeholder="Select a name"
    popupHeight="230px">
    <e-multicolumncombobox-fields text="FirstName" value="EmployeeID"></e-multicolumncombobox-fields>
    <e-data-manager url="/api/employees" adaptor="UrlAdaptor"></e-data-manager>
    <e-multicolumncombobox-columns>
        <e-multicolumncombobox-column field="EmployeeID" header="Employee ID" width="120"></e-multicolumncombobox-column>
        <e-multicolumncombobox-column field="FirstName" header="Name" width="130"></e-multicolumncombobox-column>
        <e-multicolumncombobox-column field="Designation" header="Designation" width="120"></e-multicolumncombobox-column>
        <e-multicolumncombobox-column field="Country" header="Country" width="90"></e-multicolumncombobox-column>
    </e-multicolumncombobox-columns>
</ejs-multicolumncombobox>
```

**Controller (API Endpoint - `EmployeesController.cs`):**

```csharp
[ApiController]
[Route("api/[controller]")]
public class EmployeesController : ControllerBase
{
    [HttpGet]
    public IActionResult GetEmployees()
    {
        var employees = new List<object>
        {
            new { EmployeeID = 1001, FirstName = "Andrew Fuller", Designation = "Team Lead", Country = "England" },
            new { EmployeeID = 1002, FirstName = "Robert", Designation = "Developer", Country = "USA" },
            new { EmployeeID = 1003, FirstName = "Michael", Designation = "HR", Country = "Russia" }
        };
        return Ok(employees);
    }
}
```

**Expected Response:**
```json
[
  { "EmployeeID": 1001, "FirstName": "Andrew Fuller", "Designation": "Team Lead", "Country": "England" },
  { "EmployeeID": 1002, "FirstName": "Robert", "Designation": "Developer", "Country": "USA" }
]
```

---

## Using Query

Use the `query` property to apply constraints on the data before rendering. Works with both local and remote data:

**View:**

```cshtml
<ejs-multicolumncombobox id="multicolumn"
    dataSource="@ViewBag.empData"
    query="new ej.data.Query().select(['Name', 'EmpID', 'Designation', 'Country']).take(7)"
    placeholder="Select an employee">
    <e-multicolumncombobox-fields text="Name" value="EmpID"></e-multicolumncombobox-fields>
    <e-multicolumncombobox-columns>
        <e-multicolumncombobox-column field="EmpID" header="Employee ID" width="90"></e-multicolumncombobox-column>
        <e-multicolumncombobox-column field="Name" header="Name" width="90"></e-multicolumncombobox-column>
        <e-multicolumncombobox-column field="Designation" header="Designation" width="90"></e-multicolumncombobox-column>
        <e-multicolumncombobox-column field="Country" header="Country" width="70"></e-multicolumncombobox-column>
    </e-multicolumncombobox-columns>
</ejs-multicolumncombobox>
```

This query selects specific fields and limits to 7 records.

---

## Supported Data Services

The `DataManager` supports multiple adaptors:

| Adaptor | Use Case | Example |
|---------|----------|---------|
| `UrlAdaptor` | Same-origin API endpoints | `/api/employees` |
| `ODataAdaptor` | OData v3 services | Third-party OData endpoints |
| `ODataV4Adaptor` | OData v4 services | Modern OData v4 endpoints |
| `WebApiAdaptor` | ASP.NET Web API | REST endpoints |

**Example with UrlAdaptor:**

```cshtml
<e-data-manager url="/api/employees" adaptor="UrlAdaptor"></e-data-manager>
```

---

## Common Patterns

### Pattern 1: Local Data Binding

```cshtml
<ejs-multicolumncombobox id="employees"
    dataSource="@ViewBag.employees"
    placeholder="Select employee">
    <e-multicolumncombobox-fields text="Name" value="Id"></e-multicolumncombobox-fields>
    <e-multicolumncombobox-columns>
        <e-multicolumncombobox-column field="Id" header="ID" width="80"></e-multicolumncombobox-column>
        <e-multicolumncombobox-column field="Name" header="Name" width="100"></e-multicolumncombobox-column>
        <e-multicolumncombobox-column field="Dept" header="Department" width="100"></e-multicolumncombobox-column>
    </e-multicolumncombobox-columns>
</ejs-multicolumncombobox>
```

### Pattern 2: Remote Data with Filtering

```cshtml
<ejs-multicolumncombobox id="products"
    allowFiltering="true"
    placeholder="Select product">
    <e-multicolumncombobox-fields text="ProductName" value="ProductID"></e-multicolumncombobox-fields>
    <e-data-manager url="/api/products" adaptor="UrlAdaptor"></e-data-manager>
    <e-multicolumncombobox-columns>
        <e-multicolumncombobox-column field="ProductID" header="Product ID" width="100"></e-multicolumncombobox-column>
        <e-multicolumncombobox-column field="ProductName" header="Product" width="150"></e-multicolumncombobox-column>
        <e-multicolumncombobox-column field="Price" header="Price" width="100"></e-multicolumncombobox-column>
    </e-multicolumncombobox-columns>
</ejs-multicolumncombobox>
```

### Pattern 3: Pre-Selected Value

**Controller:**

```csharp
public IActionResult Index()
{
    ViewBag.employees = GetEmployees();
    ViewBag.selectedEmployee = "Michael";
    return View();
}
```

**View:**

```cshtml
<ejs-multicolumncombobox id="employees"
    dataSource="@ViewBag.employees"
    text="@ViewBag.selectedEmployee"
    placeholder="Select employee">
    <e-multicolumncombobox-fields text="Name" value="Id"></e-multicolumncombobox-fields>
    <e-multicolumncombobox-columns>
        <e-multicolumncombobox-column field="Id" header="ID" width="80"></e-multicolumncombobox-column>
        <e-multicolumncombobox-column field="Name" header="Name" width="100"></e-multicolumncombobox-column>
    </e-multicolumncombobox-columns>
</ejs-multicolumncombobox>
```
