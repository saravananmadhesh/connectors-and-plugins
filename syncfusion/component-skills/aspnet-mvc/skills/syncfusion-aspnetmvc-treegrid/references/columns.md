# Columns Management in Tree Grid

## Table of Contents

- [When to Use This](#when-to-use-this)
- [Column Definitions](#column-definitions)
- [Data Types](#data-types)
- [Column Formatting](#column-formatting)
- [Column Templates](#column-templates)
- [Advanced Formatting](#advanced-formatting)

## When to Use This

Use column management features when you need to:
- Define column properties like width, alignment, and data type
- Format dates, numbers, and currency values
- Create custom cell templates with HTML or components
- Apply conditional formatting based on cell values
- Show/hide columns dynamically
- Configure sortable, filterable, or editable columns

## Column Definitions

### Basic Column Setup

**Simple Column Definition:**
```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .Columns(col =>
    {
        // Text column
        col.Field("TaskID").HeaderText("ID").Width("80").Add();
        
        // Date column
        col.Field("StartDate").HeaderText("Start").Type("date").Format("yMd").Width("120").Add();
        
        // Number column
        col.Field("Duration").HeaderText("Days").Type("number").Width("100").Add();
        
        // Boolean column
        col.Field("IsCompleted").HeaderText("Completed").Type("checkbox").Width("120").Add();
    })
    .Render()
```

### Column Properties

```csharp
col.Field("FieldName")                    // Data source field
   .HeaderText("Display Name")            // Column header
   .Width("150")                          // Column width (px/%)
   .Type("text|date|number|checkbox")     // Data type
   .Format("yMd|P|N2|C")                  // Format string
   .TextAlign(TextAlign.Left)             // Text alignment
   .AllowSorting(true)                    // Sortable
   .AllowFiltering(true)                  // Filterable
   .AllowReordering(true)                 // Draggable
   .AllowResizing(true)                   // Resizable
   .AllowSearching(true)                  // Searchable
   .Add();
```

## Data Types

### Text Column (Default)

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .Columns(col =>
    {
        col.Field("TaskName").HeaderText("Task Name").Type("text").Width("200").Add();
        col.Field("Description").HeaderText("Description").Type("text").Width("250").Add();
    })
    .Render()
```

### Date Column

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .Columns(col =>
    {
        // Date with format
        col.Field("StartDate")
            .HeaderText("Start Date")
            .Type("date")
            .Format("yMd")                  // Year-Month-Day
            .Width("120")
            .Add();
            
        // Date with custom format
        col.Field("EndDate")
            .HeaderText("End Date")
            .Type("date")
            .Format("MM/dd/yyyy")            // Month/Day/Year
            .Width("120")
            .Add();
    })
    .Render()
```

**Data Model:**
```csharp
public class Task
{
    public int TaskID { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime? EndDate { get; set; }
}
```

### Number Column

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .Columns(col =>
    {
        // Integer
        col.Field("TaskID").HeaderText("ID").Type("number").Format("N0").Width("80").Add();
        
        // Decimal (2 places)
        col.Field("Budget").HeaderText("Budget").Type("number").Format("C").Width("120").Add();
        
        // Percentage
        col.Field("Progress").HeaderText("Progress %").Type("number").Format("P0").Width("120").Add();
    })
    .Render()
```

### Checkbox Column

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .Columns(col =>
    {
        col.Field("IsCompleted").HeaderText("Completed").Type("checkbox").Width("100").Add();
        col.Field("IsApproved").HeaderText("Approved").Type("checkbox").Width("100").Add();
    })
    .Render()
```

## Column Formatting

### Number Formatting

```csharp
// Currency
.Format("C")        // $1,234.56
.Format("C2")       // $1,234.56

// Integer
.Format("N0")       // 1,235
.Format("N")        // 1,234.56

// Percentage
.Format("P0")       // 50%
.Format("P2")       // 50.25%

// Scientific
.Format("E2")       // 1.23E+03
```

### Date Formatting

```csharp
// Standard formats
.Format("d")        // 3/19/2026
.Format("D")        // March 19, 2026
.Format("yMd")      // Mar 19, 26
.Format("MM/dd/yyyy")  // 03/19/2026
.Format("dd-MMM-yyyy") // 19-Mar-2026
```

### Custom Format Example

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .Columns(col =>
    {
        // Currency column
        col.Field("Amount")
            .HeaderText("Amount")
            .Type("number")
            .Format("C2")
            .TextAlign(TextAlign.Right)
            .Width("120")
            .Add();
            
        // Percentage column
        col.Field("Discount")
            .HeaderText("Discount")
            .Type("number")
            .Format("P1")
            .TextAlign(TextAlign.Right)
            .Width("120")
            .Add();
    })
    .Render()
```

## Column Templates

### Custom Cell Template

**View with Template:**
```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .Columns(col =>
    {
        col.Field("TaskID").HeaderText("ID").Width("80").Add();
        
        // Custom template for status
        col.Field("Status")
            .HeaderText("Status")
            .Template(@"<span class='status-${Status}'>${Status}</span>")
            .Width("120")
            .Add();
            
        // Custom template with icon
        col.Field("Priority")
            .HeaderText("Priority")
            .Template(@"<span class='priority-${Priority}'>
                       <i class='icon-${Priority}' />${Priority}
                       </span>")
            .Width("120")
            .Add();
    })
    .Render()
```

**CSS for Templates:**
```css
.status-Completed {
    color: green;
    font-weight: bold;
}

.status-Pending {
    color: orange;
}

.status-OnHold {
    color: red;
}

.priority-Low { color: blue; }
.priority-Medium { color: orange; }
.priority-High { color: red; }
```

### Template with Events

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .Columns(col =>
    {
        col.Field("TaskName").HeaderText("Task").Width("200").Add();
        
        // Action buttons template
        col.Template(@"<button class='btn-edit' onclick='EditRow(${TaskID})'>Edit</button>
                      <button class='btn-delete' onclick='DeleteRow(${TaskID})'>Delete</button>")
            .HeaderText("Actions")
            .Width("150")
            .Add();
    })
    .Render()
```

**JavaScript Handler:**
```javascript
function EditRow(id) {
    console.log('Edit row: ' + id);
    // Implement edit logic
}

function DeleteRow(id) {
    console.log('Delete row: ' + id);
    // Implement delete logic
}
```

## Advanced Formatting

### Conditional Formatting

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .QueryCellInfo(@<Syncfusion.EJ2.QueryCellInfo>(delegate(QueryCellInfoEventArgs args) {
        if (args.Column.Field == "Progress")
        {
            if ((int)args.Data.Row["Progress"] >= 75)
                args.Cell.AddClass("high-progress");
            else if ((int)args.Data.Row["Progress"] >= 50)
                args.Cell.AddClass("medium-progress");
            else
                args.Cell.AddClass("low-progress");
        }
    }))
    .Render()
```

**CSS:**
```css
.high-progress { background-color: #d4edda; }
.medium-progress { background-color: #fff3cd; }
.low-progress { background-color: #f8d7da; }
```

### Multi-line Column Headers

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .Columns(col =>
    {
        col.Field("TaskID")
            .HeaderText("Task<br/>ID")
            .Width("80")
            .Add();
            
        col.Field("Duration")
            .HeaderText("Duration<br/>(Days)")
            .Width("120")
            .Add();
    })
    .Render()
```

### Column Visibility Toggle

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .Columns(col =>
    {
        col.Field("TaskID").HeaderText("ID").Visible(true).Width("80").Add();
        col.Field("TaskName").HeaderText("Task").Visible(true).Width("200").Add();
        col.Field("Details").HeaderText("Details").Visible(false).Width("200").Add();
        col.Field("Notes").HeaderText("Notes").Visible(false).Width("200").Add();
    })
    .Render()
```

**Toggle Button:**
```html
<button onclick="ShowColumn()">Show Details</button>
<button onclick="HideColumn()">Hide Details</button>

<script>
function ShowColumn() {
    var grid = document.getElementById('TreeGrid').ej2_instances[0];
    grid.showColumns(['Details', 'Notes']);
}

function HideColumn() {
    var grid = document.getElementById('TreeGrid').ej2_instances[0];
    grid.hideColumns(['Details', 'Notes']);
}
</script>
```
