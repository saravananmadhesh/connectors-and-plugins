# Filtering — MultiColumn ComboBox

## Table of Contents
- [Enable Filtering](#enable-filtering)
- [Filter Types](#filter-types)
- [Client-Side Filtering](#client-side-filtering)
- [Server-Side Filtering](#server-side-filtering)
- [Filter Operators](#filter-operators)
- [Advanced Filtering](#advanced-filtering)

---

## Enable Filtering

### Basic Filtering

```cshtml
<ejs-multicolumncombobox id="combo"
    dataSource="@ViewBag.employees"
    allowFiltering="true"
    popupHeight="300px">
    <e-multicolumncombobox-fields text="EmployeeName" value="EmployeeID"></e-multicolumncombobox-fields>
    <e-multicolumncombobox-columns>
        <e-multicolumncombobox-column field="EmployeeID" header="ID" width="60px"></e-multicolumncombobox-column>
        <e-multicolumncombobox-column field="EmployeeName" header="Name" width="150px"></e-multicolumncombobox-column>
        <e-multicolumncombobox-column field="Designation" header="Designation" width="120px"></e-multicolumncombobox-column>
    </e-multicolumncombobox-columns>
</ejs-multicolumncombobox>
```

---

## Filter Types

### StartsWith Filter

```cshtml
<ejs-multicolumncombobox id="combo"
    dataSource="@ViewBag.employees"
    allowFiltering="true"
    filterType="StartsWith"
    placeholder="Search from beginning..."
    popupHeight="300px">
    <e-multicolumncombobox-fields text="EmployeeName" value="EmployeeID"></e-multicolumncombobox-fields>
    <e-multicolumncombobox-columns>
        <e-multicolumncombobox-column field="EmployeeID" header="ID" width="60px"></e-multicolumncombobox-column>
        <e-multicolumncombobox-column field="EmployeeName" header="Name" width="150px"></e-multicolumncombobox-column>
    </e-multicolumncombobox-columns>
</ejs-multicolumncombobox>
```

### Contains Filter

```cshtml
<ejs-multicolumncombobox id="combo"
    dataSource="@ViewBag.employees"
    allowFiltering="true"
    filterType="Contains"
    placeholder="Search anywhere..."
    popupHeight="300px">
    <e-multicolumncombobox-fields text="EmployeeName" value="EmployeeID"></e-multicolumncombobox-fields>
    <e-multicolumncombobox-columns>
        <e-multicolumncombobox-column field="EmployeeID" header="ID" width="60px"></e-multicolumncombobox-column>
        <e-multicolumncombobox-column field="EmployeeName" header="Name" width="150px"></e-multicolumncombobox-column>
    </e-multicolumncombobox-columns>
</ejs-multicolumncombobox>
```

### EndsWith Filter

```cshtml
<ejs-multicolumncombobox id="combo"
    dataSource="@ViewBag.employees"
    allowFiltering="true"
    filterType="EndsWith"
    placeholder="Search from end..."
    popupHeight="300px">
    <e-multicolumncombobox-fields text="EmployeeName" value="EmployeeID"></e-multicolumncombobox-fields>
    <e-multicolumncombobox-columns>
        <e-multicolumncombobox-column field="EmployeeID" header="ID" width="60px"></e-multicolumncombobox-column>
        <e-multicolumncombobox-column field="EmployeeName" header="Name" width="150px"></e-multicolumncombobox-column>
    </e-multicolumncombobox-columns>
</ejs-multicolumncombobox>
```

---

## Client-Side Filtering

### Filter on Specific Columns

```cshtml
<ejs-multicolumncombobox id="combo"
    dataSource="@ViewBag.employees"
    allowFiltering="true"
    placeholder="Search in Name column..."
    popupHeight="300px">
    <e-multicolumncombobox-fields text="EmployeeName" value="EmployeeID"></e-multicolumncombobox-fields>
    <e-multicolumncombobox-columns>
        <e-multicolumncombobox-column field="EmployeeID" header="ID" width="60px"></e-multicolumncombobox-column>
        <e-multicolumncombobox-column field="EmployeeName" header="Name" width="150px"></e-multicolumncombobox-column>
        <e-multicolumncombobox-column field="Designation" header="Designation" width="120px"></e-multicolumncombobox-column>
    </e-multicolumncombobox-columns>
</ejs-multicolumncombobox>
```

### Case-Insensitive Filtering

```cshtml
<ejs-multicolumncombobox id="combo"
    dataSource="@ViewBag.employees"
    allowFiltering="true"
    ignoreCase="true"
    placeholder="Search (case-insensitive)..."
    popupHeight="300px">
    <e-multicolumncombobox-fields text="EmployeeName" value="EmployeeID"></e-multicolumncombobox-fields>
    <e-multicolumncombobox-columns>
        <e-multicolumncombobox-column field="EmployeeID" header="ID" width="60px"></e-multicolumncombobox-column>
        <e-multicolumncombobox-column field="EmployeeName" header="Name" width="150px"></e-multicolumncombobox-column>
    </e-multicolumncombobox-columns>
</ejs-multicolumncombobox>
```

### Accent-Insensitive Filtering

```cshtml
<ejs-multicolumncombobox id="combo"
    dataSource="@ViewBag.employees"
    allowFiltering="true"
    ignoreAccent="true"
    placeholder="Search (accent-insensitive)..."
    popupHeight="300px">
    <e-multicolumncombobox-fields text="EmployeeName" value="EmployeeID"></e-multicolumncombobox-fields>
    <e-multicolumncombobox-columns>
        <e-multicolumncombobox-column field="EmployeeID" header="ID" width="60px"></e-multicolumncombobox-column>
        <e-multicolumncombobox-column field="EmployeeName" header="Name" width="150px"></e-multicolumncombobox-column>
    </e-multicolumncombobox-columns>
</ejs-multicolumncombobox>
```

---

## Server-Side Filtering

### Remote Data Filtering

```cshtml
<ejs-multicolumncombobox id="combo"
    dataSource="@ViewBag.remoteData"
    allowFiltering="true"
    filtering="onServerFiltering"
    popupHeight="300px">
    <e-multicolumncombobox-fields text="EmployeeName" value="EmployeeID"></e-multicolumncombobox-fields>
    <e-multicolumncombobox-columns>
        <e-multicolumncombobox-column field="EmployeeID" header="ID" width="60px"></e-multicolumncombobox-column>
        <e-multicolumncombobox-column field="EmployeeName" header="Name" width="150px"></e-multicolumncombobox-column>
        <e-multicolumncombobox-column field="Designation" header="Designation" width="120px"></e-multicolumncombobox-column>
    </e-multicolumncombobox-columns>
</ejs-multicolumncombobox>

<script>
function onServerFiltering(args) {
    let searchTerm = args.text;
    
    fetch(`/api/employees/search?query=${encodeURIComponent(searchTerm)}`)
        .then(response => response.json())
        .then(data => {
            let combo = document.getElementById('combo').ej2_instances[0];
            combo.dataSource = data;
            combo.refresh();
        })
        .catch(error => console.error('Filter error:', error));
}
</script>
```

**Controller:**

```csharp
[ApiController]
[Route("api/[controller]")]
public class EmployeesController : ControllerBase
{
    [HttpGet("search")]
    public IActionResult Search(string query)
    {
        if (string.IsNullOrWhiteSpace(query) || query.Length < 2)
        {
            return Ok(new List<Employee>());
        }
        
        var results = GetAllEmployees()
            .Where(e => e.EmployeeName.Contains(query, StringComparison.OrdinalIgnoreCase) ||
                       e.Designation.Contains(query, StringComparison.OrdinalIgnoreCase))
            .Take(50)
            .ToList();
        
        return Ok(results);
    }
}
```

---

## Filter Operators

### DataManager Filter Query

```javascript
let combo = document.getElementById('combo').ej2_instances[0];

// Filter by specific value
let predicate = new ej2.data.Predicate('Designation', 'equal', 'Manager');
combo.gridSettings.gridInstance.filterSettings.columns = [
    { field: 'Designation', operator: 'equal', value: 'Manager' }
];

// Filter with AND condition
let pred1 = new ej2.data.Predicate('Designation', 'equal', 'Manager');
let pred2 = new ej2.data.Predicate('Department', 'equal', 'IT');
let finalPredicate = pred1.and(pred2);

// Filter with OR condition
let orPredicate = pred1.or(pred2);
```

---

## Advanced Filtering

### Multi-Column Filtering

```cshtml
<div>
    <label>Filter by Designation:</label>
    <input type="text" id="designationFilter" 
           onkeyup="filterByDesignation()" 
           placeholder="Enter designation" />
    
    <label>Filter by Department:</label>
    <input type="text" id="departmentFilter" 
           onkeyup="filterByDepartment()" 
           placeholder="Enter department" />
</div>

<ejs-multicolumncombobox id="combo"
    dataSource="@ViewBag.employees"
    popupHeight="300px">
    <e-multicolumncombobox-fields text="EmployeeName" value="EmployeeID"></e-multicolumncombobox-fields>
    <e-multicolumncombobox-columns>
        <e-multicolumncombobox-column field="EmployeeID" header="ID" width="60px"></e-multicolumncombobox-column>
        <e-multicolumncombobox-column field="EmployeeName" header="Name" width="150px"></e-multicolumncombobox-column>
        <e-multicolumncombobox-column field="Designation" header="Designation" width="120px"></e-multicolumncombobox-column>
        <e-multicolumncombobox-column field="Department" header="Department" width="100px"></e-multicolumncombobox-column>
    </e-multicolumncombobox-columns>
</ejs-multicolumncombobox>

<script>
let originalData = @Html.Raw(JsonConvert.SerializeObject(ViewBag.employees));
let currentFilters = {};

function filterByDesignation() {
    let value = document.getElementById('designationFilter').value;
    currentFilters.designation = value;
    applyFilters();
}

function filterByDepartment() {
    let value = document.getElementById('departmentFilter').value;
    currentFilters.department = value;
    applyFilters();
}

function applyFilters() {
    let filtered = originalData;
    
    if (currentFilters.designation) {
        filtered = filtered.filter(e => 
            e.Designation.toLowerCase().includes(currentFilters.designation.toLowerCase())
        );
    }
    
    if (currentFilters.department) {
        filtered = filtered.filter(e => 
            e.Department.toLowerCase().includes(currentFilters.department.toLowerCase())
        );
    }
    
    let combo = document.getElementById('combo').ej2_instances[0];
    combo.dataSource = filtered;
    combo.refresh();
}
</script>
```

### Range Filtering

```csharp
// Controller method for range filtering
[HttpGet("filter-by-salary-range")]
public IActionResult FilterBySalaryRange(decimal minSalary, decimal maxSalary)
{
    var results = GetAllEmployees()
        .Where(e => e.Salary >= minSalary && e.Salary <= maxSalary)
        .ToList();
    
    return Ok(results);
}
```

```cshtml
<div>
    <label>Minimum Salary:</label>
    <input type="number" id="minSalary" />
    
    <label>Maximum Salary:</label>
    <input type="number" id="maxSalary" />
    
    <button onclick="filterBySalaryRange()">Apply Filter</button>
</div>

<script>
function filterBySalaryRange() {
    let minSalary = document.getElementById('minSalary').value;
    let maxSalary = document.getElementById('maxSalary').value;
    
    fetch(`/api/employees/filter-by-salary-range?minSalary=${minSalary}&maxSalary=${maxSalary}`)
        .then(response => response.json())
        .then(data => {
            let combo = document.getElementById('combo').ej2_instances[0];
            combo.dataSource = data;
            combo.refresh();
        });
}
</script>
```

### Date Range Filtering

```cshtml
<div>
    <label>From Date:</label>
    <input type="date" id="fromDate" />
    
    <label>To Date:</label>
    <input type="date" id="toDate" />
    
    <button onclick="filterByDateRange()">Apply</button>
</div>

<ejs-multicolumncombobox id="combo"
    dataSource="@ViewBag.employees"
    popupHeight="300px">
    <e-multicolumncombobox-fields text="EmployeeName" value="EmployeeID"></e-multicolumncombobox-fields>
    <e-multicolumncombobox-columns>
        <e-multicolumncombobox-column field="EmployeeID" header="ID" width="60px"></e-multicolumncombobox-column>
        <e-multicolumncombobox-column field="EmployeeName" header="Name" width="150px"></e-multicolumncombobox-column>
        <e-multicolumncombobox-column field="JoinDate" header="Join Date" width="120px"></e-multicolumncombobox-column>
    </e-multicolumncombobox-columns>
</ejs-multicolumncombobox>

<script>
function filterByDateRange() {
    let fromDate = document.getElementById('fromDate').value;
    let toDate = document.getElementById('toDate').value;
    
    fetch(`/api/employees/filter-by-date-range?from=${fromDate}&to=${toDate}`)
        .then(response => response.json())
        .then(data => {
            let combo = document.getElementById('combo').ej2_instances[0];
            combo.dataSource = data;
            combo.refresh();
        });
}
</script>
```

### Clear Filters

```javascript
function clearAllFilters() {
    let combo = document.getElementById('combo').ej2_instances[0];
    
    // Reset to original data
    combo.dataSource = @Html.Raw(JsonConvert.SerializeObject(ViewBag.employees));
    combo.refresh();
    
    // Clear input fields
    document.getElementById('designationFilter').value = '';
    document.getElementById('departmentFilter').value = '';
}
```
