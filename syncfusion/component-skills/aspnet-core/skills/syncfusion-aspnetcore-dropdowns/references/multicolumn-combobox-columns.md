# Columns Configuration — MultiColumn ComboBox

## Table of Contents
- [Column Properties](#column-properties)
- [Column Width and Sizing](#column-width-and-sizing)
- [Text Alignment](#text-alignment)
- [Column Formatting](#column-formatting)
- [Header and Footer](#header-and-footer)
- [Dynamic Columns](#dynamic-columns)

---

## Column Properties

### Column Definition Structure

```cshtml
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
```

### Column Properties Table

| Property | Type | Description |
|----------|------|-------------|
| `field` | string | Field name to bind data |
| `header` | string | Column header text |
| `width` | string | Column width (px, %) |
| `textAlign` | enum | Text alignment (Left, Center, Right) |
| `visible` | bool | Show/hide column |
| `displayAsCheckBox` | bool | Show field as checkbox |
| `type` | enum | Column type (text, date, number) |
| `format` | string | Format string for display |
| `customClass` | string | CSS class for styling |

### Basic Column Example

```cshtml
<ejs-multicolumncombobox id="employees"
    dataSource="@ViewBag.employees"
    popupHeight="300px">
    <e-multicolumncombobox-fields text="EmployeeName" value="EmployeeID"></e-multicolumncombobox-fields>
    <e-multicolumncombobox-columns>
        <!-- ID Column -->
        <e-multicolumncombobox-column field="EmployeeID" header="ID" width="50px" 
            textAlign="Right"></e-multicolumncombobox-column>
        
        <!-- Name Column -->
        <e-multicolumncombobox-column field="EmployeeName" header="Name" width="150px"></e-multicolumncombobox-column>
        
        <!-- Email Column -->
        <e-multicolumncombobox-column field="Email" header="Email" width="200px"></e-multicolumncombobox-column>
    </e-multicolumncombobox-columns>
</ejs-multicolumncombobox>
```

---

## Column Width and Sizing

### Fixed Width Columns

```cshtml
<ejs-multicolumncombobox id="combo"
    dataSource="@ViewBag.employees"
    popupHeight="300px">
    <e-multicolumncombobox-fields text="EmployeeName" value="EmployeeID"></e-multicolumncombobox-fields>
    <e-multicolumncombobox-columns>
        <e-multicolumncombobox-column field="EmployeeID" header="ID" width="80px"></e-multicolumncombobox-column>
        <e-multicolumncombobox-column field="EmployeeName" header="Name" width="200px"></e-multicolumncombobox-column>
        <e-multicolumncombobox-column field="Designation" header="Designation" width="150px"></e-multicolumncombobox-column>
    </e-multicolumncombobox-columns>
</ejs-multicolumncombobox>
```

### Percentage-Based Width

```cshtml
<ejs-multicolumncombobox id="combo"
    dataSource="@ViewBag.employees"
    popupHeight="300px"
    popupWidth="500px">
    <e-multicolumncombobox-fields text="EmployeeName" value="EmployeeID"></e-multicolumncombobox-fields>
    <e-multicolumncombobox-columns>
        <!-- Each column takes 1/3 of the width -->
        <e-multicolumncombobox-column field="EmployeeID" header="ID" width="33.33%"></e-multicolumncombobox-column>
        <e-multicolumncombobox-column field="EmployeeName" header="Name" width="33.33%"></e-multicolumncombobox-column>
        <e-multicolumncombobox-column field="Designation" header="Designation" width="33.34%"></e-multicolumncombobox-column>
    </e-multicolumncombobox-columns>
</ejs-multicolumncombobox>
```

### Auto Width

```cshtml
<ejs-multicolumncombobox id="combo"
    dataSource="@ViewBag.employees"
    popupHeight="300px">
    <e-multicolumncombobox-fields text="EmployeeName" value="EmployeeID"></e-multicolumncombobox-fields>
    <e-multicolumncombobox-columns>
        <!-- Columns without width will auto-expand -->
        <e-multicolumncombobox-column field="EmployeeID" header="ID" width="60px"></e-multicolumncombobox-column>
        <e-multicolumncombobox-column field="EmployeeName" header="Name"></e-multicolumncombobox-column>
        <e-multicolumncombobox-column field="Designation" header="Designation"></e-multicolumncombobox-column>
    </e-multicolumncombobox-columns>
</ejs-multicolumncombobox>
```

### Min and Max Width

```javascript
let combo = document.getElementById('combo').ej2_instances[0];

// Set column widths programmatically
combo.gridSettings.columns = [
    { field: 'EmployeeID', header: 'ID', width: 60, minWidth: 50, maxWidth: 100 },
    { field: 'EmployeeName', header: 'Name', width: 150, minWidth: 120 },
    { field: 'Designation', header: 'Designation', width: 120 }
];

combo.refresh();
```

---

## Text Alignment

### Align Column Text

```cshtml
<ejs-multicolumncombobox id="combo"
    dataSource="@ViewBag.data"
    popupHeight="300px">
    <e-multicolumncombobox-fields text="Name" value="Id"></e-multicolumncombobox-fields>
    <e-multicolumncombobox-columns>
        <!-- Left aligned (default) -->
        <e-multicolumncombobox-column field="Name" header="Name" width="150px" 
            textAlign="Left"></e-multicolumncombobox-column>
        
        <!-- Center aligned -->
        <e-multicolumncombobox-column field="Salary" header="Salary" width="120px"
            textAlign="Center"></e-multicolumncombobox-column>
        
        <!-- Right aligned (numbers) -->
        <e-multicolumncombobox-column field="Amount" header="Amount" width="100px"
            textAlign="Right"></e-multicolumncombobox-column>
    </e-multicolumncombobox-columns>
</ejs-multicolumncombobox>
```

### CSS Text Alignment

```css
/* Right-align all cells in Amount column */
.e-grid .e-gridcontent tbody tr td:nth-child(3) {
    text-align: right;
    padding-right: 16px;
}

/* Center align header */
.e-grid .e-gridheader tbody tr th {
    text-align: center;
}

/* Vertical alignment */
.e-grid .e-gridcontent tbody tr td {
    vertical-align: middle;
    padding: 10px;
}
```

---

## Column Formatting

### Date Formatting

```csharp
public class Employee
{
    public int EmployeeID { get; set; }
    public string EmployeeName { get; set; }
    public DateTime JoinDate { get; set; }
}

public IActionResult Index()
{
    ViewBag.employees = new List<Employee>
    {
        new Employee { EmployeeID = 1, EmployeeName = "John", JoinDate = new DateTime(2020, 1, 15) },
        new Employee { EmployeeID = 2, EmployeeName = "Jane", JoinDate = new DateTime(2019, 5, 20) }
    };
    return View();
}
```

```cshtml
<ejs-multicolumncombobox id="combo"
    dataSource="@ViewBag.employees"
    popupHeight="300px">
    <e-multicolumncombobox-fields text="EmployeeName" value="EmployeeID"></e-multicolumncombobox-fields>
    <e-multicolumncombobox-columns>
        <e-multicolumncombobox-column field="EmployeeID" header="ID" width="60px"></e-multicolumncombobox-column>
        <e-multicolumncombobox-column field="EmployeeName" header="Name" width="120px"></e-multicolumncombobox-column>
        <e-multicolumncombobox-column field="JoinDate" header="Join Date" width="120px" 
            type="date" format="yMd"></e-multicolumncombobox-column>
    </e-multicolumncombobox-columns>
</ejs-multicolumncombobox>
```

### Number Formatting

```cshtml
<ejs-multicolumncombobox id="combo"
    dataSource="@ViewBag.products"
    popupHeight="300px">
    <e-multicolumncombobox-fields text="ProductName" value="ProductID"></e-multicolumncombobox-fields>
    <e-multicolumncombobox-columns>
        <e-multicolumncombobox-column field="ProductID" header="ID" width="60px"></e-multicolumncombobox-column>
        <e-multicolumncombobox-column field="ProductName" header="Product" width="150px"></e-multicolumncombobox-column>
        <!-- Currency format -->
        <e-multicolumncombobox-column field="Price" header="Price" width="100px" 
            type="number" format="C2" textAlign="Right"></e-multicolumncombobox-column>
        <!-- Percent format -->
        <e-multicolumncombobox-column field="Discount" header="Discount" width="100px"
            type="number" format="P0" textAlign="Right"></e-multicolumncombobox-column>
    </e-multicolumncombobox-columns>
</ejs-multicolumncombobox>
```

### Custom Templates

```cshtml
<ejs-multicolumncombobox id="combo"
    dataSource="@ViewBag.employees"
    popupHeight="300px">
    <e-multicolumncombobox-fields text="EmployeeName" value="EmployeeID"></e-multicolumncombobox-fields>
    <e-multicolumncombobox-columns>
        <e-multicolumncombobox-column field="EmployeeID" header="ID" width="60px"></e-multicolumncombobox-column>
        <e-multicolumncombobox-column field="EmployeeName" header="Name" width="150px"></e-multicolumncombobox-column>
        <!-- Status column with custom template -->
        <e-multicolumncombobox-column field="Status" header="Status" width="100px" 
            template="getStatusTemplate"></e-multicolumncombobox-column>
    </e-multicolumncombobox-columns>
</ejs-multicolumncombobox>

<script>
function getStatusTemplate(props) {
    if (props.Status === 'Active') {
        return `<span class="badge badge-success">Active</span>`;
    } else {
        return `<span class="badge badge-danger">Inactive</span>`;
    }
}
</script>
```

---

## Header and Footer

### Column Headers

```cshtml
<ejs-multicolumncombobox id="combo"
    dataSource="@ViewBag.employees"
    popupHeight="300px">
    <e-multicolumncombobox-fields text="EmployeeName" value="EmployeeID"></e-multicolumncombobox-fields>
    <e-multicolumncombobox-columns>
        <!-- Standard headers -->
        <e-multicolumncombobox-column field="EmployeeID" header="Employee ID" width="80px"></e-multicolumncombobox-column>
        <e-multicolumncombobox-column field="EmployeeName" header="Full Name" width="150px"></e-multicolumncombobox-column>
        <e-multicolumncombobox-column field="Designation" header="Designation" width="120px"></e-multicolumncombobox-column>
    </e-multicolumncombobox-columns>
</ejs-multicolumncombobox>

<style>
/* Style column headers */
.e-grid .e-gridheader .e-headercell {
    background: #0066cc;
    color: white;
    font-weight: 600;
    padding: 12px;
}

.e-grid .e-gridheader .e-headercell:hover {
    background: #004c99;
}
</style>
```

### Header Template

```javascript
let combo = document.getElementById('combo').ej2_instances[0];

// Set header template
combo.gridSettings.headerTemplate = '<div class="custom-header">${EmployeeName}</div>';
combo.refresh();
```

---

## Dynamic Columns

### Add/Remove Columns

```javascript
let combo = document.getElementById('combo').ej2_instances[0];

function addColumn() {
    let newColumn = {
        field: 'Email',
        header: 'Email',
        width: 180
    };
    
    combo.gridSettings.columns.push(newColumn);
    combo.refresh();
}

function removeColumn(fieldName) {
    combo.gridSettings.columns = combo.gridSettings.columns
        .filter(col => col.field !== fieldName);
    combo.refresh();
}

function updateColumnWidth(fieldName, newWidth) {
    let column = combo.gridSettings.columns
        .find(col => col.field === fieldName);
    
    if (column) {
        column.width = newWidth;
        combo.refresh();
    }
}
```

### Toggle Column Visibility

```javascript
function toggleColumn(fieldName) {
    let column = combo.gridSettings.columns
        .find(col => col.field === fieldName);
    
    if (column) {
        column.visible = !column.visible;
        combo.refresh();
    }
}

// Usage
toggleColumn('Email');  // Hide/show Email column
toggleColumn('Department');  // Hide/show Department column
```

### Column Template Expressions

```cshtml
<ejs-multicolumncombobox id="combo"
    dataSource="@ViewBag.employees"
    popupHeight="300px">
    <e-multicolumncombobox-fields text="EmployeeName" value="EmployeeID"></e-multicolumncombobox-fields>
    <e-multicolumncombobox-columns>
        <e-multicolumncombobox-column field="EmployeeID" header="ID" width="60px"></e-multicolumncombobox-column>
        <e-multicolumncombobox-column field="EmployeeName" header="Name" width="150px"></e-multicolumncombobox-column>
        
        <!-- Column with conditional formatting -->
        <e-multicolumncombobox-column field="Salary" header="Salary" width="120px" 
            textAlign="Right" 
            template="getSalaryTemplate"></e-multicolumncombobox-column>
    </e-multicolumncombobox-columns>
</ejs-multicolumncombobox>

<script>
function getSalaryTemplate(props) {
    let salary = props.Salary;
    let cssClass = salary > 50000 ? 'high-salary' : 'normal-salary';
    return `<span class="${cssClass}">$${salary.toLocaleString()}</span>`;
}
</script>

<style>
.high-salary { color: #28a745; font-weight: 600; }
.normal-salary { color: #666; }
</style>
```
