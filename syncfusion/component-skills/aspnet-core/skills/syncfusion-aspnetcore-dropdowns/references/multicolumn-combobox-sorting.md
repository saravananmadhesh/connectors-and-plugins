# Sorting — MultiColumn ComboBox

## Table of Contents
- [Default Sorting](#default-sorting)
- [Sort Column Data](#sort-column-data)
- [Multi-Column Sorting](#multi-column-sorting)
- [Custom Sort](#custom-sort)
- [Sort UI](#sort-ui)

---

## Default Sorting

### Apply Initial Sort

```cshtml
<ejs-multicolumncombobox id="combo"
    dataSource="@ViewBag.employees"
    popupHeight="300px">
    <e-multicolumncombobox-fields text="EmployeeName" value="EmployeeID"></e-multicolumncombobox-fields>
    <e-multicolumncombobox-columns>
        <e-multicolumncombobox-column field="EmployeeID" header="ID" width="60px"></e-multicolumncombobox-column>
        <e-multicolumncombobox-column field="EmployeeName" header="Name" width="150px"></e-multicolumncombobox-column>
        <e-multicolumncombobox-column field="Designation" header="Designation" width="120px"></e-multicolumncombobox-column>
    </e-multicolumncombobox-columns>
</ejs-multicolumncombobox>

<script>
document.addEventListener('DOMContentLoaded', function() {
    let combo = document.getElementById('combo').ej2_instances[0];
    
    // Wait for data to load
    combo.dataBound = function() {
        // Sort by EmployeeName ascending
        combo.gridSettings.sortSettings.columns = [
            { field: 'EmployeeName', direction: 'Ascending' }
        ];
        
        if (combo.gridSettings.gridInstance) {
            combo.gridSettings.gridInstance.sortSettings.columns = [
                { field: 'EmployeeName', direction: 'Ascending' }
            ];
            combo.gridSettings.gridInstance.refresh();
        }
    };
});
</script>
```

---

## Sort Column Data

### Ascending Order

```javascript
let combo = document.getElementById('combo').ej2_instances[0];

function sortAscending(columnName) {
    if (combo.gridSettings.gridInstance) {
        combo.gridSettings.gridInstance.sortSettings.columns = [
            { field: columnName, direction: 'Ascending' }
        ];
        combo.gridSettings.gridInstance.refresh();
    }
}

// Usage
sortAscending('EmployeeName');  // Sort by name A-Z
sortAscending('EmployeeID');    // Sort by ID ascending
```

### Descending Order

```javascript
function sortDescending(columnName) {
    if (combo.gridSettings.gridInstance) {
        combo.gridSettings.gridInstance.sortSettings.columns = [
            { field: columnName, direction: 'Descending' }
        ];
        combo.gridSettings.gridInstance.refresh();
    }
}

// Usage
sortDescending('EmployeeName');  // Sort by name Z-A
sortDescending('Salary');        // Sort by salary high to low
```

### Clear Sort

```javascript
function clearSort() {
    let combo = document.getElementById('combo').ej2_instances[0];
    
    if (combo.gridSettings.gridInstance) {
        combo.gridSettings.gridInstance.sortSettings.columns = [];
        combo.gridSettings.gridInstance.refresh();
    }
}
```

---

## Multi-Column Sorting

### Sort by Multiple Columns

```cshtml
<ejs-multicolumncombobox id="combo"
    dataSource="@ViewBag.employees"
    popupHeight="300px">
    <e-multicolumncombobox-fields text="EmployeeName" value="EmployeeID"></e-multicolumncombobox-fields>
    <e-multicolumncombobox-columns>
        <e-multicolumncombobox-column field="Department" header="Department" width="120px"></e-multicolumncombobox-column>
        <e-multicolumncombobox-column field="EmployeeName" header="Name" width="150px"></e-multicolumncombobox-column>
        <e-multicolumncombobox-column field="Salary" header="Salary" width="100px"></e-multicolumncombobox-column>
    </e-multicolumncombobox-columns>
</ejs-multicolumncombobox>

<script>
document.addEventListener('DOMContentLoaded', function() {
    let combo = document.getElementById('combo').ej2_instances[0];
    
    combo.dataBound = function() {
        // First by Department, then by Name
        if (combo.gridSettings.gridInstance) {
            combo.gridSettings.gridInstance.sortSettings.columns = [
                { field: 'Department', direction: 'Ascending' },
                { field: 'EmployeeName', direction: 'Ascending' }
            ];
            combo.gridSettings.gridInstance.refresh();
        }
    };
});
</script>
```

### Dynamic Multi-Column Sort

```javascript
function sortByMultipleColumns(sortConfig) {
    // sortConfig = [
    //   { field: 'Department', direction: 'Ascending' },
    //   { field: 'Name', direction: 'Ascending' }
    // ]
    
    let combo = document.getElementById('combo').ej2_instances[0];
    
    if (combo.gridSettings.gridInstance) {
        combo.gridSettings.gridInstance.sortSettings.columns = sortConfig;
        combo.gridSettings.gridInstance.refresh();
    }
}

// Usage
sortByMultipleColumns([
    { field: 'Department', direction: 'Ascending' },
    { field: 'EmployeeName', direction: 'Ascending' },
    { field: 'Salary', direction: 'Descending' }
]);
```

---

## Custom Sort

### Server-Side Sorting

```cshtml
<ejs-multicolumncombobox id="combo"
    dataSource="@ViewBag.employees"
    actionBegin="onActionBegin"
    popupHeight="300px">
    <e-multicolumncombobox-fields text="EmployeeName" value="EmployeeID"></e-multicolumncombobox-fields>
    <e-multicolumncombobox-columns>
        <e-multicolumncombobox-column field="EmployeeID" header="ID" width="60px"></e-multicolumncombobox-column>
        <e-multicolumncombobox-column field="EmployeeName" header="Name" width="150px"></e-multicolumncombobox-column>
        <e-multicolumncombobox-column field="Salary" header="Salary" width="100px"></e-multicolumncombobox-column>
    </e-multicolumncombobox-columns>
</ejs-multicolumncombobox>

<script>
function onActionBegin(args) {
    if (args.requestType === 'sorting') {
        console.log('Sort columns:', args.sortModel.columns);
        
        // Send sort info to server
        let sortColumns = args.sortModel.columns.map(col => ({
            field: col.field,
            direction: col.direction
        }));
        
        fetch('/api/employees/sort', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sortColumns: sortColumns })
        })
        .then(response => response.json())
        .then(data => {
            let combo = document.getElementById('combo').ej2_instances[0];
            combo.dataSource = data;
            combo.refresh();
        });
    }
}
</script>
```

**Controller:**

```csharp
[HttpPost("sort")]
public IActionResult SortEmployees([FromBody] SortRequest request)
{
    var employees = GetAllEmployees().AsEnumerable();
    
    foreach (var sort in request.SortColumns)
    {
        if (sort.Direction == "Ascending")
        {
            employees = employees.OrderBy(e => GetPropertyValue(e, sort.Field));
        }
        else
        {
            employees = employees.OrderByDescending(e => GetPropertyValue(e, sort.Field));
        }
    }
    
    return Ok(employees.ToList());
}

private object GetPropertyValue(object obj, string propertyName)
{
    return obj.GetType().GetProperty(propertyName)?.GetValue(obj);
}
```

### Custom Comparator

```javascript
function customSort(columnName, ascending = true) {
    let combo = document.getElementById('combo').ej2_instances[0];
    let data = combo.dataSource;
    
    data.sort((a, b) => {
        let aVal = a[columnName];
        let bVal = b[columnName];
        
        // Custom comparison logic
        if (typeof aVal === 'string') {
            aVal = aVal.toLowerCase();
            bVal = bVal.toLowerCase();
        }
        
        if (aVal < bVal) return ascending ? -1 : 1;
        if (aVal > bVal) return ascending ? 1 : -1;
        return 0;
    });
    
    combo.dataSource = data;
    combo.refresh();
}

// Usage
customSort('EmployeeName', true);  // Sort name A-Z
customSort('Salary', false);       // Sort salary high to low
```

### Natural Sort (Version Numbering)

```javascript
function naturalSort(columnName, ascending = true) {
    let combo = document.getElementById('combo').ej2_instances[0];
    let data = combo.dataSource;
    
    function naturalCompare(a, b) {
        // Convert to string and handle numeric sequences
        a = String(a);
        b = String(b);
        
        let aNum = parseInt(a, 10);
        let bNum = parseInt(b, 10);
        
        if (!isNaN(aNum) && !isNaN(bNum)) {
            return ascending ? aNum - bNum : bNum - aNum;
        }
        
        return ascending ? a.localeCompare(b) : b.localeCompare(a);
    }
    
    data.sort((a, b) => {
        return naturalCompare(a[columnName], b[columnName]);
    });
    
    combo.dataSource = data;
    combo.refresh();
}
```

---

## Sort UI

### Sort Buttons

```cshtml
<div class="sort-controls">
    <button onclick="sortByName(true)" class="btn btn-sm">↑ Name A-Z</button>
    <button onclick="sortByName(false)" class="btn btn-sm">↓ Name Z-A</button>
    
    <button onclick="sortBySalary(false)" class="btn btn-sm">↓ Salary High</button>
    <button onclick="sortBySalary(true)" class="btn btn-sm">↑ Salary Low</button>
    
    <button onclick="clearSort()" class="btn btn-sm btn-secondary">Clear Sort</button>
</div>

<ejs-multicolumncombobox id="combo"
    dataSource="@ViewBag.employees"
    popupHeight="300px">
    <e-multicolumncombobox-fields text="EmployeeName" value="EmployeeID"></e-multicolumncombobox-fields>
    <e-multicolumncombobox-columns>
        <e-multicolumncombobox-column field="EmployeeID" header="ID" width="60px"></e-multicolumncombobox-column>
        <e-multicolumncombobox-column field="EmployeeName" header="Name" width="150px"></e-multicolumncombobox-column>
        <e-multicolumncombobox-column field="Salary" header="Salary" width="100px"></e-multicolumncombobox-column>
    </e-multicolumncombobox-columns>
</ejs-multicolumncombobox>

<script>
function sortByName(ascending) {
    let combo = document.getElementById('combo').ej2_instances[0];
    if (combo.gridSettings.gridInstance) {
        combo.gridSettings.gridInstance.sortSettings.columns = [
            { field: 'EmployeeName', direction: ascending ? 'Ascending' : 'Descending' }
        ];
        combo.gridSettings.gridInstance.refresh();
    }
}

function sortBySalary(ascending) {
    let combo = document.getElementById('combo').ej2_instances[0];
    if (combo.gridSettings.gridInstance) {
        combo.gridSettings.gridInstance.sortSettings.columns = [
            { field: 'Salary', direction: ascending ? 'Ascending' : 'Descending' }
        ];
        combo.gridSettings.gridInstance.refresh();
    }
}

function clearSort() {
    let combo = document.getElementById('combo').ej2_instances[0];
    if (combo.gridSettings.gridInstance) {
        combo.gridSettings.gridInstance.sortSettings.columns = [];
        combo.gridSettings.gridInstance.refresh();
    }
}
</script>

<style>
.sort-controls {
    margin-bottom: 15px;
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
}

.sort-controls button {
    padding: 8px 12px;
    border: 1px solid #ddd;
    background: #f9f9f9;
    cursor: pointer;
    border-radius: 4px;
    font-size: 13px;
}

.sort-controls button:hover {
    background: #0066cc;
    color: white;
    border-color: #0066cc;
}
</style>
```

### Column Header Click to Sort

```javascript
// Enable sort on column header click
let combo = document.getElementById('combo').ej2_instances[0];

combo.dataBound = function() {
    let headerCells = document.querySelectorAll('.e-grid .e-headercell');
    
    headerCells.forEach(cell => {
        cell.style.cursor = 'pointer';
        cell.addEventListener('click', function() {
            let field = cell.getAttribute('data-field');
            if (field) {
                toggleSort(field);
            }
        });
    });
};

function toggleSort(field) {
    let combo = document.getElementById('combo').ej2_instances[0];
    let currentSort = combo.gridSettings.gridInstance.sortSettings.columns[0];
    
    if (currentSort && currentSort.field === field) {
        // Toggle direction
        currentSort.direction = currentSort.direction === 'Ascending' ? 'Descending' : 'Ascending';
    } else {
        // New sort
        combo.gridSettings.gridInstance.sortSettings.columns = [
            { field: field, direction: 'Ascending' }
        ];
    }
    
    combo.gridSettings.gridInstance.refresh();
}
```
