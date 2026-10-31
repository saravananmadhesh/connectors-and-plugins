# Columns — Syncfusion ASP.NET Core TreeGrid

> **When to Use:** Configure TreeGrid columns to bind data fields, format values, enable sorting/filtering, display custom templates, and control column layout (width, alignment, locking, reordering). Use `treeColumnIndex` to show expand/collapse tree navigation.

## Table of Contents
- [Column Basics](#column-basics)
- [Column Headers](#column-headers)
- [Format (Number & Date)](#format-number--date)
- [Column Type](#column-type)
- [Column Template](#column-template)
- [ValueAccessor](#valueaccessor)
- [Lock Columns](#lock-columns)
- [Checkbox Column](#checkbox-column)
- [Display Checkbox for Boolean Values](#display-checkbox-for-boolean-values)
- [Show / Hide Columns Dynamically](#show--hide-columns-dynamically)
- [Column Menu](#column-menu)
- [Column Chooser](#column-chooser)
- [Column Reorder](#column-reorder)
- [Column Resizing](#column-resizing)
- [Auto Fit Columns](#auto-fit-columns)
- [Column Spanning](#column-spanning)
- [Complex Data Binding](#complex-data-binding)
- [Responsive Columns](#responsive-columns)
- [Controlling Per-Column Actions](#controlling-per-column-actions)
- [Best Practices](#best-practices)

---

## Column Basics

Column definitions map data source fields to visual columns using the `field` property. `treeColumnIndex` specifies which column shows the expand/collapse tree arrows. The `field` property is **mandatory** for column operations (sorting, filtering, editing).

**Key Properties**:
- `field`: Data property name (REQUIRED)
- `headerText`: Column header display text
- `treeColumnIndex`: Column that shows expand/collapse arrows
- `isPrimaryKey`: Mark primary key column (required for editing/deleting)
- `width`: Column width (pixels or percentage)
- `textAlign`: Left/Center/Right alignment
- `type`: Data type for formatting/sorting
- `format`: Number or date format

```cshtml
<ejs-treegrid id="TreeGrid" dataSource="@ViewBag.data" childMapping="Children" treeColumnIndex="1">
    <e-treegrid-columns>
        <!-- Tree column (shows expand/collapse) - usually primary key -->
        <e-treegrid-column field="TaskId" headerText="Task ID" 
                           isPrimaryKey="true" textAlign="Right" width="95"></e-treegrid-column>
        <!-- Tree column shows in this column field="TaskName" -->
        <e-treegrid-column field="TaskName" headerText="Task Name" width="220"></e-treegrid-column>
        <!-- Date column with formatting -->
        <e-treegrid-column field="StartDate" headerText="Start Date" 
                           textAlign="Right" format="yMd" type="date" width="115"></e-treegrid-column>
        <!-- Numeric column -->
        <e-treegrid-column field="Duration" headerText="Duration" 
                           textAlign="Right" type="number" width="100"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>
```

**Important Notes**:
- `textAlign="Right"` is NOT valid for the tree column (the column at `treeColumnIndex`)
- If `field` property is not specified, the column cannot perform sorting, filtering, or editing
- If `headerText` is not defined, column renders with empty header

---

## Column Headers

Column headers display the `headerText` property. By default, the field name is used if `headerText` is not specified.

```cshtml
<e-treegrid-column field="TaskId" headerText="Task ID" width="95"></e-treegrid-column>
<e-treegrid-column field="TaskName" headerText="Task Name" width="220"></e-treegrid-column>
```

**Header Template** - Customize header with icons or HTML:

```cshtml
<e-treegrid-column field="TaskId" headerText="Task ID" headerTemplate="#taskTemplate" width="120"></e-treegrid-column>

<script type="text/x-template" id="taskTemplate">
    <div><span class="e-icon-schedule"></span> Task ID</div>
</script>
```

**Stacked Headers** - Group related columns by nesting:

```cshtml
<e-treegrid-column headerText="Order Info">
    <e-treegrid-columns>
        <e-treegrid-column field="OrderId" headerText="Order ID" width="90"></e-treegrid-column>
        <e-treegrid-column field="OrderName" headerText="Order Name" width="150"></e-treegrid-column>
    </e-treegrid-columns>
</e-treegrid-column>
<e-treegrid-column headerText="Shipment">
    <e-treegrid-columns>
        <e-treegrid-column field="ShipDate" headerText="Ship Date" format="yMd" type="date" width="120"></e-treegrid-column>
    </e-treegrid-columns>
</e-treegrid-column>
```

---

## Format (Number & Date)

Format cell values using the `format` property:

```cshtml
<e-treegrid-column field="OrderDate" headerText="Order Date" format="yMd" type="date" width="120"></e-treegrid-column>
<e-treegrid-column field="Price" headerText="Price" format="C2" type="number" width="100"></e-treegrid-column>
```

**Number formats**: `N2` (1234.56), `C2` ($1,234.56), `P2` (12.34%)  
**Date formats**: `yMd` (7/4/1996), `dd/MM/yyyy` (04/07/1996)

---

## Column Type

Specify the data type with `type` for proper formatting and sorting:

```cshtml
<e-treegrid-column field="StartDate" type="date" format="yMd" width="120"></e-treegrid-column>
<e-treegrid-column field="Approved" type="boolean" displayAsCheckBox="true" width="100"></e-treegrid-column>
<e-treegrid-column field="Amount" type="number" format="C2" width="110"></e-treegrid-column>
```

Supported types: `string`, `number`, `boolean`, `date`, `datetime`

---

## Lock Columns

A locked column moves to the first position and its reordering is disabled.

```cshtml
<ejs-treegrid id="TreeGrid" dataSource="@data" childMapping="Children"
              treeColumnIndex="1" allowReordering="true">
    <e-treegrid-columns>
        <e-treegrid-column field="TaskId"   headerText="Task ID"   isPrimaryKey="true" width="90"></e-treegrid-column>
        <e-treegrid-column field="TaskName" headerText="Task Name" width="220"></e-treegrid-column>
        <e-treegrid-column field="Duration" headerText="Duration"  lockColumn="true" width="100"></e-treegrid-column>
        <e-treegrid-column field="Priority" headerText="Priority"  width="120"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>
```

---

## Checkbox Column

Render checkboxes in an existing column using `showCheckbox`. Enable `autoCheckHierarchy` so checking a parent also checks all its children.

```cshtml
<ejs-treegrid id="TreeGrid" dataSource="@data" childMapping="Children"
              treeColumnIndex="1" autoCheckHierarchy="true">
    <e-treegrid-columns>
        <e-treegrid-column field="TaskId"   headerText="Task ID"   showCheckbox="true" width="90"></e-treegrid-column>
        <e-treegrid-column field="TaskName" headerText="Task Name" width="190"></e-treegrid-column>
        <e-treegrid-column field="Duration" headerText="Duration"  textAlign="Right" width="110"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>
```

> `showCheckbox` must be defined on the tree column only.

---

## Display Checkbox for Boolean Values

To render boolean values as checkboxes instead of `true`/`false` text, use `displayAsCheckBox`:

```cshtml
<ejs-treegrid id="TreeGrid" dataSource="@ViewBag.data" childMapping="Children" treeColumnIndex="1" autoCheckHierarchy="true">
    <e-treegrid-columns>
        <e-treegrid-column field="TaskId" headerText="Task ID" textAlign="Right" width="100"></e-treegrid-column>
        <e-treegrid-column field="TaskName" headerText="Task Name" width="190"></e-treegrid-column>
        <!-- Boolean column rendered as checkbox -->
        <e-treegrid-column field="Approved" headerText="Approved" type="boolean" 
                           displayAsCheckBox="true" textAlign="Center" width="120"></e-treegrid-column>
        <e-treegrid-column field="StartDate" headerText=" Start Date" textAlign="Right" format="yMd" type="date" width="120"></e-treegrid-column>
        <e-treegrid-column field="Duration" headerText="Duration" textAlign="Right" width="110"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>
```

**C# Model Example**:
```csharp
public class TaskItem
{
    public int TaskId { get; set; }
    public string TaskName { get; set; }
    public bool Approved { get; set; }  // Boolean property
    public DateTime StartDate { get; set; }
    public int Duration { get; set; }
}
```

---

## Show / Hide Columns Dynamically

Use the `showColumns` and `hideColumns` methods via external buttons:

```cshtml
<button onclick="showCol()">Show Duration</button>
<button onclick="hideCol()">Hide Duration</button>

<ejs-treegrid id="TreeGrid" dataSource="@data" childMapping="Children" treeColumnIndex="1">
    <e-treegrid-columns>
        <e-treegrid-column field="TaskId"   headerText="Task ID"   width="90"></e-treegrid-column>
        <e-treegrid-column field="TaskName" headerText="Task Name" width="190"></e-treegrid-column>
        <e-treegrid-column field="Duration" headerText="Duration"  textAlign="Right" width="110"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>

<script>
    function showCol() {
        document.getElementById('TreeGrid').ej2_instances[0].showColumns('Duration');
    }
    function hideCol() {
        document.getElementById('TreeGrid').ej2_instances[0].hideColumns('Duration');
    }
</script>
```

---

## ValueAccessor

Use `valueAccessor` to compute or combine display values from the data source.

**Combine two fields:**
```cshtml
<e-treegrid-column field="FirstName" headerText="Full Name"
                   valueAccessor="fullNameAccessor" width="160"></e-treegrid-column>

<script>
    function fullNameAccessor(field, data, column) {
        return data['FirstName'] + ' ' + data['LastName'];
    }
</script>
```

**Expression column (computed value):**
```cshtml
<e-treegrid-column headerText="Total Cost" valueAccessor="totalCostAccessor" width="120"></e-treegrid-column>

<script>
    function totalCostAccessor(field, data, column) {
        return (data['Units'] * data['UnitPrice']).toFixed(2);
    }
</script>
```

---

## Column Menu

Enable a per-column menu with sort, filter, and auto-fit options:

```cshtml
<ejs-treegrid id="TreeGrid" dataSource="@data" childMapping="Children"
              treeColumnIndex="1" showColumnMenu="true" allowSorting="true" allowFiltering="true">
    <e-treegrid-columns>
        <e-treegrid-column field="TaskId"   headerText="Task ID"   width="90"></e-treegrid-column>
        <e-treegrid-column field="TaskName" headerText="Task Name" width="190"></e-treegrid-column>
        <e-treegrid-column field="Duration" headerText="Duration"  showColumnMenu="false" width="110"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>
```

Default menu items: `SortAscending`, `SortDescending`, `AutoFit`, `AutoFitAll`, `Filter`

Disable per column by setting `showColumnMenu="false"` on the column.

---

## Column Chooser

Show/hide columns via UI (Column Chooser):

```cshtml
<ejs-treegrid id="TreeGrid" dataSource="@data" childMapping="Children" 
              treeColumnIndex="1" showColumnChooser="true">
    <e-treegrid-columns>
        <e-treegrid-column field="TaskId"   headerText="Task ID" width="90"></e-treegrid-column>
        <e-treegrid-column field="TaskName" headerText="Task Name" width="190"></e-treegrid-column>
        <e-treegrid-column field="Duration" headerText="Duration" width="110"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>
```

Column Chooser icon appears in the grid header, allowing users to check/uncheck columns to toggle visibility.

---

## Column Reorder

Allow columns to be dragged and dropped to new positions:

```cshtml
<ejs-treegrid id="TreeGrid" dataSource="@data" childMapping="Children"
              treeColumnIndex="1" allowReordering="true">
    ...
</ejs-treegrid>
```

> Freeze direction is incompatible with column reordering when stacked headers are used.

---

## Column Resizing

Enable drag-resize on column borders:

```cshtml
<ejs-treegrid id="TreeGrid" dataSource="@data" childMapping="Children"
              treeColumnIndex="1" allowResizing="true">
    <e-treegrid-columns>
        <e-treegrid-column field="TaskId"   headerText="Task ID"   minWidth="80" maxWidth="200" width="90"></e-treegrid-column>
        <e-treegrid-column field="TaskName" headerText="Task Name" minWidth="100" width="190"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>
```

Set `allowResizing="false"` on a specific column to disable it per column.

---

## Auto Fit Columns

Auto-fit adjusts column width to fit content. Trigger programmatically or via column menu:

```cshtml
<button onclick="autoFit()">Auto Fit</button>

<ejs-treegrid id="TreeGrid" dataSource="@data" childMapping="Children" treeColumnIndex="1">
    ...
</ejs-treegrid>

<script>
    function autoFit() {
        document.getElementById('TreeGrid').ej2_instances[0].autoFitColumns(['TaskName', 'Duration']);
    }
</script>
```

---

## Column Template

Render custom HTML or components inside a column cell using a template:

```cshtml
<ejs-treegrid id="TreeGrid" dataSource="@ViewBag.data" childMapping="Children" treeColumnIndex="1">
    <e-treegrid-columns>
        <e-treegrid-column field="TaskId" headerText="Task ID" width="90"></e-treegrid-column>
        <e-treegrid-column field="TaskName" headerText="Task Name" width="180"></e-treegrid-column>
        <!-- Custom template with conditional rendering -->
        <e-treegrid-column headerText="Status" template="#statusTemplate" width="120"></e-treegrid-column>
        <e-treegrid-column field="Duration" headerText="Duration" width="100"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>

<script type="text/x-template" id="statusTemplate">
    <div class="template_status">
        ${if(Status === 'Completed')}
        <span class="badge badge-success">✓ Completed</span>
        ${else if(Status === 'In Progress')}
        <span class="badge badge-warning">⧖ In Progress</span>
        ${else}
        <span class="badge badge-secondary">⊘ Not Started</span>
        ${/if}
    </div>
</script>
```

**Template Variables**:
- `${dataPropertyName}` - Access any data property
- `data` object - Full row data available as `data.propertyName`
- `column` object - Current column metadata

**Common Template Examples**:

**Action Buttons**:
```cshtml
<e-treegrid-column headerText="Actions" template="#actionsTemplate" width="150"></e-treegrid-column>

<script type="text/x-template" id="actionsTemplate">
    <button class="e-btn e-btn-sm" onclick="editRow('${TaskId}')">Edit</button>
    <button class="e-btn e-btn-sm" onclick="deleteRow('${TaskId}')">Delete</button>
</script>

<script>
    function editRow(id) { /* edit logic */ }
    function deleteRow(id) { /* delete logic */ }
</script>
```

**Conditional Badge/Badge**:
```cshtml
<e-treegrid-column field="Priority" headerText="Priority" template="#priorityTemplate" width="100"></e-treegrid-column>

<script type="text/x-template" id="priorityTemplate">
    ${if(Priority === 'High')}
    <span class="badge badge-danger">🔴 High</span>
    ${else if(Priority === 'Medium')}
    <span class="badge badge-warning">🟡 Medium</span>
    ${else}
    <span class="badge badge-success">🟢 Low</span>
    ${/if}
</script>
```

**Image Templates**:
```cshtml
<e-treegrid-column field="Photo" headerText="Photo" template="#photoTemplate" width="90"></e-treegrid-column>

<script type="text/x-template" id="photoTemplate">
    <img src="/images/${EmployeeId}.jpg" alt="${EmployeeName}" style="height: 40px; width: 40px; border-radius: 50%;" />
</script>
```

> If `field` is not specified in a template column, TreeGrid actions (sorting, filtering, editing) cannot be performed on that column. Always include a `field` if you want users to interact with the column data.

---

## Column Spanning

Span multiple columns for specific rows using `queryCellInfo`:

```cshtml
<ejs-treegrid id="TreeGrid" dataSource="@data" childMapping="Children"
              treeColumnIndex="0" queryCellInfo="onQueryCellInfo">
    <e-treegrid-columns>
        <e-treegrid-column field="TaskName" headerText="Task Name" width="190"></e-treegrid-column>
        <e-treegrid-column field="Duration" headerText="Duration"  width="110"></e-treegrid-column>
        <e-treegrid-column field="Priority" headerText="Priority"  width="110"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>

<script>
    function onQueryCellInfo(args) {
        if (args.data.TaskName === 'Design' && args.column.field === 'Duration') {
            args.colSpan = 2;
        }
    }
</script>
```

---

## Complex Data Binding

Bind nested properties using dot notation in `field`:

```cshtml
<e-treegrid-column field="Name.FirstName" headerText="First Name" width="140"></e-treegrid-column>
<e-treegrid-column field="Name.LastName"  headerText="Last Name"  width="140"></e-treegrid-column>
```

---

## Responsive Columns

Hide columns on smaller screens by specifying `hideAtMedia`:

```cshtml
<e-treegrid-column field="Priority" headerText="Priority" hideAtMedia="(min-width: 700px)" width="120"></e-treegrid-column>
```

---

## Controlling Per-Column Actions

Prevent sort or filter actions on specific columns:

```cshtml
<e-treegrid-column field="TaskId"   headerText="Task ID"   allowSorting="false" allowFiltering="false" width="90"></e-treegrid-column>
<e-treegrid-column field="TaskName" headerText="Task Name" allowSorting="true"  allowFiltering="true"  width="190"></e-treegrid-column>
```

---

## Best Practices

**1. Always Define Primary Key**
- Mark one column with `isPrimaryKey="true"` for editing/deletion operations
- Usually the ID field

**2. Set Column Types Explicitly**
- Use `type="date"` / `type="number"` / `type="boolean"` for proper formatting and sorting
- Match C# model property types with column definitions

**3. Use Meaningful Header Text**
- Set `headerText` clearly instead of relying on field names
- Makes UI more user-friendly

**4. Optimize Column Width**
- Fixed width + responsive columns on mobile
- Use `hideAtMedia` for columns that don't fit small screens
- Base widths on content length

**5. Template Guidelines**
- Include `field` property in template columns if sorting/filtering is needed
- Use `valueAccessor` for computed values instead of templates (better performance)
- Keep templates simple; move complex logic to JavaScript functions

**6. Control Element Visibility**
- Use `allowSorting="false"` / `allowFiltering="false"` to disable per column
- Combine with global `allowSorting="true"` / `allowFiltering="true"` settings

**7. Handle Complex Data**
- Use dot notation for nested properties: `field="Employee.Department.Name"`
- Use `valueAccessor` for array properties or complex transformations

**8. Column Reordering & Resizing**
- Enable only when needed: `allowReordering="true"` / `allowResizing="true"`
- Use `lockColumn="true"` for critical columns (ID, Name) to prevent accidental moves
- Set `minWidth` / `maxWidth` on resizing columns for safety
