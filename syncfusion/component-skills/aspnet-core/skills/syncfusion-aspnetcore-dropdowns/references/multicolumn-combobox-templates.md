# Templates and Customization — MultiColumn ComboBox

## Table of Contents
- [Cell Templates](#cell-templates)
- [Header Templates](#header-templates)
- [Footer Templates](#footer-templates)
- [Row Templates](#row-templates)
- [Empty State Templates](#empty-state-templates)
- [Custom Styling](#custom-styling)

---

## Cell Templates

### Basic Cell Template

```cshtml
<ejs-multicolumncombobox id="combo"
    dataSource="@ViewBag.employees"
    popupHeight="300px">
    <e-multicolumncombobox-fields text="EmployeeName" value="EmployeeID"></e-multicolumncombobox-fields>
    <e-multicolumncombobox-columns>
        <e-multicolumncombobox-column field="EmployeeID" header="ID" width="60px"></e-multicolumncombobox-column>
        <e-multicolumncombobox-column field="EmployeeName" header="Name" width="150px"></e-multicolumncombobox-column>
        <!-- Template column -->
        <e-multicolumncombobox-column field="Status" header="Status" width="100px" 
            template="getStatusTemplate"></e-multicolumncombobox-column>
    </e-multicolumncombobox-columns>
</ejs-multicolumncombobox>

<script>
function getStatusTemplate(props) {
    if (props.Status === 'Active') {
        return `<span class="badge badge-success">Active</span>`;
    } else if (props.Status === 'Inactive') {
        return `<span class="badge badge-danger">Inactive</span>`;
    } else {
        return `<span class="badge badge-warning">On Leave</span>`;
    }
}
</script>

<style>
.badge {
    display: inline-block;
    padding: 4px 8px;
    border-radius: 3px;
    font-size: 11px;
    font-weight: 600;
}

.badge-success { background: #d4edda; color: #155724; }
.badge-danger { background: #f8d7da; color: #721c24; }
.badge-warning { background: #fff3cd; color: #856404; }
</style>
```

### Image Cell Template

```cshtml
<ejs-multicolumncombobox id="combo"
    dataSource="@ViewBag.employees"
    popupHeight="300px">
    <e-multicolumncombobox-fields text="EmployeeName" value="EmployeeID"></e-multicolumncombobox-fields>
    <e-multicolumncombobox-columns>
        <!-- Photo column -->
        <e-multicolumncombobox-column field="Photo" header="Photo" width="60px" 
            template="getPhotoTemplate"></e-multicolumncombobox-column>
        
        <e-multicolumncombobox-column field="EmployeeID" header="ID" width="60px"></e-multicolumncombobox-column>
        <e-multicolumncombobox-column field="EmployeeName" header="Name" width="150px"></e-multicolumncombobox-column>
    </e-multicolumncombobox-columns>
</ejs-multicolumncombobox>

<script>
function getPhotoTemplate(props) {
    return `<img src="${props.Photo}" alt="${props.EmployeeName}" 
            style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover;" />`;
}
</script>
```

### Rich Content Cell Template

```cshtml
<ejs-multicolumncombobox id="combo"
    dataSource="@ViewBag.employees"
    popupHeight="300px">
    <e-multicolumncombobox-fields text="EmployeeName" value="EmployeeID"></e-multicolumncombobox-fields>
    <e-multicolumncombobox-columns>
        <e-multicolumncombobox-column field="EmployeeID" header="ID" width="60px"></e-multicolumncombobox-column>
        <e-multicolumncombobox-column field="EmployeeName" header="Name" width="150px"></e-multicolumncombobox-column>
        
        <!-- Details column -->
        <e-multicolumncombobox-column field="Email" header="Details" width="200px" 
            template="getDetailsTemplate"></e-multicolumncombobox-column>
    </e-multicolumncombobox-columns>
</ejs-multicolumncombobox>

<script>
function getDetailsTemplate(props) {
    return `
        <div class="cell-details">
            <div class="email">${props.Email}</div>
            <div class="phone">${props.Phone}</div>
        </div>`;
}
</script>

<style>
.cell-details {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.cell-details .email {
    font-weight: 500;
    color: #333;
}

.cell-details .phone {
    font-size: 12px;
    color: #666;
}
</style>
```

---

## Header Templates

### Custom Column Header

```cshtml
<ejs-multicolumncombobox id="combo"
    dataSource="@ViewBag.employees"
    popupHeight="300px">
    <e-multicolumncombobox-fields text="EmployeeName" value="EmployeeID"></e-multicolumncombobox-fields>
    <e-multicolumncombobox-columns>
        <e-multicolumncombobox-column field="EmployeeID" header="ID" width="60px"
            headerTemplate="getIdHeaderTemplate"></e-multicolumncombobox-column>
        
        <e-multicolumncombobox-column field="EmployeeName" header="Name" width="150px"
            headerTemplate="getNameHeaderTemplate"></e-multicolumncombobox-column>
        
        <e-multicolumncombobox-column field="Salary" header="Salary" width="120px"
            headerTemplate="getSalaryHeaderTemplate"></e-multicolumncombobox-column>
    </e-multicolumncombobox-columns>
</ejs-multicolumncombobox>

<script>
function getIdHeaderTemplate() {
    return `<div class="header-cell">
                <span class="header-icon">🆔</span>
                <span>ID</span>
            </div>`;
}

function getNameHeaderTemplate() {
    return `<div class="header-cell">
                <span class="header-icon">👤</span>
                <span>Employee Name</span>
            </div>`;
}

function getSalaryHeaderTemplate() {
    return `<div class="header-cell">
                <span class="header-icon">💰</span>
                <span>Salary</span>
            </div>`;
}
</script>

<style>
.header-cell {
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 600;
}

.header-icon {
    font-size: 16px;
}
</style>
```

### Sortable Header

```javascript
// Enable clicking header to sort
let combo = document.getElementById('combo').ej2_instances[0];

combo.dataBound = function() {
    let headerCells = document.querySelectorAll('.e-grid .e-headercell');
    
    headerCells.forEach(cell => {
        cell.style.cursor = 'pointer';
        cell.style.userSelect = 'none';
        
        cell.addEventListener('click', function() {
            let field = cell.getAttribute('data-field');
            if (field && field !== 'Template') {
                toggleColumnSort(field);
            }
        });
        
        // Add sort indicator
        cell.addEventListener('mouseenter', function() {
            cell.style.backgroundColor = '#f0f0f0';
        });
        
        cell.addEventListener('mouseleave', function() {
            cell.style.backgroundColor = '';
        });
    });
};

function toggleColumnSort(field) {
    let combo = document.getElementById('combo').ej2_instances[0];
    
    if (combo.gridSettings.gridInstance) {
        let current = combo.gridSettings.gridInstance.sortSettings.columns[0];
        
        if (current && current.field === field) {
            current.direction = current.direction === 'Ascending' ? 'Descending' : 'Ascending';
        } else {
            combo.gridSettings.gridInstance.sortSettings.columns = [
                { field: field, direction: 'Ascending' }
            ];
        }
        
        combo.gridSettings.gridInstance.refresh();
    }
}
```

---

## Footer Templates

### Summary Footer

```cshtml
<ejs-multicolumncombobox id="combo"
    dataSource="@ViewBag.employees"
    popupHeight="300px">
    <e-multicolumncombobox-fields text="EmployeeName" value="EmployeeID"></e-multicolumncombobox-fields>
    <e-multicolumncombobox-columns>
        <e-multicolumncombobox-column field="EmployeeID" header="ID" width="60px"></e-multicolumncombobox-column>
        <e-multicolumncombobox-column field="EmployeeName" header="Name" width="150px"></e-multicolumncombobox-column>
        <e-multicolumncombobox-column field="Salary" header="Salary" width="120px"
            footerTemplate="getSalaryFooterTemplate"></e-multicolumncombobox-column>
    </e-multicolumncombobox-columns>
</ejs-multicolumncombobox>

<script>
function getSalaryFooterTemplate(props) {
    // Calculate total salary
    let total = 0;
    if (props && props.length > 0) {
        total = props.reduce((sum, emp) => sum + emp.Salary, 0);
    }
    
    return `<div class="footer-cell">
                <strong>Total: $${total.toLocaleString()}</strong>
            </div>`;
}
</script>

<style>
.footer-cell {
    padding: 12px;
    background: #f9f9f9;
    border-top: 2px solid #ddd;
    font-weight: 600;
    text-align: right;
}
</style>
```

### Pagination Footer

```cshtml
<script>
function getPaginationFooterTemplate(props) {
    let combo = document.getElementById('combo').ej2_instances[0];
    let pageSize = combo.gridSettings.pageSettings.pageSize || 10;
    let pageCount = Math.ceil(props.length / pageSize);
    
    return `<div class="footer-pagination">
                <span>Showing 1 of ${pageCount} pages</span>
                <span>Total Records: ${props.length}</span>
            </div>`;
}
</script>

<style>
.footer-pagination {
    display: flex;
    justify-content: space-between;
    padding: 12px;
    background: #f9f9f9;
    border-top: 1px solid #ddd;
    font-size: 12px;
}
</style>
```

---

## Row Templates

### Full Row Template

```cshtml
<ejs-multicolumncombobox id="combo"
    dataSource="@ViewBag.employees"
    popupHeight="300px">
    <e-multicolumncombobox-fields text="EmployeeName" value="EmployeeID"></e-multicolumncombobox-fields>
    <e-multicolumncombobox-columns>
        <!-- Full row template -->
        <e-multicolumncombobox-column header="Employee Card" width="100%"
            template="getRowTemplate"></e-multicolumncombobox-column>
    </e-multicolumncombobox-columns>
</ejs-multicolumncombobox>

<script>
function getRowTemplate(props) {
    return `
        <div class="employee-card">
            <div class="card-header">
                <img src="${props.Photo}" alt="${props.EmployeeName}" class="card-photo" />
                <div class="card-info">
                    <h4>${props.EmployeeName}</h4>
                    <p class="designation">${props.Designation}</p>
                </div>
            </div>
            <div class="card-body">
                <div class="info-row">
                    <span class="label">ID:</span>
                    <span class="value">${props.EmployeeID}</span>
                </div>
                <div class="info-row">
                    <span class="label">Email:</span>
                    <span class="value">${props.Email}</span>
                </div>
                <div class="info-row">
                    <span class="label">Department:</span>
                    <span class="value">${props.Department}</span>
                </div>
            </div>
        </div>`;
}
</script>

<style>
.employee-card {
    border: 1px solid #e0e0e0;
    border-radius: 6px;
    padding: 12px;
    margin: 8px 4px;
    background: #fafafa;
}

.card-header {
    display: flex;
    gap: 12px;
    margin-bottom: 12px;
    border-bottom: 1px solid #eee;
    padding-bottom: 12px;
}

.card-photo {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
}

.card-info h4 {
    margin: 0;
    font-size: 14px;
    color: #333;
}

.designation {
    margin: 4px 0 0 0;
    font-size: 12px;
    color: #666;
}

.card-body .info-row {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    margin: 6px 0;
}

.info-row .label {
    font-weight: 600;
    color: #555;
}

.info-row .value {
    color: #333;
}
</style>
```

---

## Empty State Templates

### No Records Message

```cshtml
<ejs-multicolumncombobox id="combo"
    dataSource="@ViewBag.employees"
    noRecordsTemplate="getNoRecordsTemplate"
    popupHeight="300px">
    <e-multicolumncombobox-fields text="EmployeeName" value="EmployeeID"></e-multicolumncombobox-fields>
    <e-multicolumncombobox-columns>
        <e-multicolumncombobox-column field="EmployeeID" header="ID" width="60px"></e-multicolumncombobox-column>
        <e-multicolumncombobox-column field="EmployeeName" header="Name" width="150px"></e-multicolumncombobox-column>
    </e-multicolumncombobox-columns>
</ejs-multicolumncombobox>

<script>
function getNoRecordsTemplate() {
    return `<div class="no-records">
                <div class="no-records-icon">📋</div>
                <h4>No Records Found</h4>
                <p>No employees match your search criteria</p>
            </div>`;
}
</script>

<style>
.no-records {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 200px;
    color: #666;
}

.no-records-icon {
    font-size: 48px;
    margin-bottom: 16px;
    opacity: 0.5;
}

.no-records h4 {
    margin: 0 0 8px 0;
    color: #333;
}

.no-records p {
    margin: 0;
    font-size: 13px;
}
</style>
```

---

## Custom Styling

### CSS Custom Properties

```css
:root {
    --combo-primary: #0066cc;
    --combo-border: #ddd;
    --combo-hover: #f5f5f5;
    --combo-text: #333;
}

.e-multicolumncombobox {
    --combo-primary: #0066cc;
}

/* Use CSS variables for easy theming */
.e-grid .e-gridheader .e-headercell {
    background: var(--combo-primary);
    color: white;
}

.e-grid .e-gridcontent .e-rowcell:hover {
    background: var(--combo-hover);
}
```

### Conditional Row Styling

```javascript
let combo = document.getElementById('combo').ej2_instances[0];

combo.dataBound = function() {
    let rows = document.querySelectorAll('.e-grid .e-gridcontent .e-row');
    
    rows.forEach(row => {
        let cells = row.querySelectorAll('.e-rowcell');
        
        // Check salary value (third column)
        if (cells.length > 2) {
            let salary = parseFloat(cells[2].textContent);
            
            if (salary > 50000) {
                row.style.backgroundColor = '#d4edda';  // Green for high salary
            } else if (salary < 30000) {
                row.style.backgroundColor = '#f8d7da';  // Red for low salary
            }
        }
    });
};
```
