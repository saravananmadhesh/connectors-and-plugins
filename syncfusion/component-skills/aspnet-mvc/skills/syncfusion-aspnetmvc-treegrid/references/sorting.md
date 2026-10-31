# Sorting in Tree Grid

## Table of Contents
- [When to Use This](#when-to-use-this)
- [Enable Sorting](#enable-sorting)
- [Sort Types](#sort-types)
- [Sort Configuration](#sort-configuration)
- [Programmatic Sorting](#programmatic-sorting)
- [Sort Events](#sort-events)
- [Custom Sort Comparer](#custom-sort-comparer)

## When to Use This

Use sorting features when you need to:
- Allow users to organize data in ascending or descending order
- Sort by multiple columns simultaneously
- Implement custom sort logic for special data types
- Sort hierarchical data while maintaining parent-child relationships
- Provide programmatic sorting based on business rules

## Enable Sorting

### Basic Sorting

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .AllowSorting(true)
    .SortSettings(sort =>
    {
        sort.Columns(col =>
        {
            col.Field("TaskName").Direction(SortDirection.Ascending).Add();
        });
    })
    .ChildMapping("Children")
    .Columns(col =>
    {
        col.Field("TaskID").HeaderText("ID").Width("80").AllowSorting(true).Add();
        col.Field("TaskName").HeaderText("Task").Width("200").AllowSorting(true).Add();
        col.Field("StartDate").HeaderText("Start").Type("date").Format("yMd").Width("120").AllowSorting(true).Add();
        col.Field("Duration").HeaderText("Duration").Width("100").AllowSorting(true).Add();
    })
    .Render()
```

## Sort Types

### Single Column Sort

Click column header to sort ascending/descending:

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .AllowSorting(true)
    .Columns(col =>
    {
        col.Field("TaskID").HeaderText("ID").AllowSorting(true).Width("80").Add();
        col.Field("TaskName").HeaderText("Task").AllowSorting(true).Width("200").Add();
    })
    .Render()
```

Clicking header cycles: Ascending → Descending → No Sort

### Multi-level Sorting

Sort by multiple columns:

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .AllowSorting(true)
    .SortSettings(sort =>
    {
        sort.Columns(col =>
        {
            col.Field("Priority").Direction(SortDirection.Ascending).Add();  // First sort
            col.Field("StartDate").Direction(SortDirection.Ascending).Add();  // Then sort
            col.Field("TaskName").Direction(SortDirection.Ascending).Add();   // Finally sort
        });
    })
    .ChildMapping("Children")
    .Columns(col =>
    {
        col.Field("TaskID").Width("80").Add();
        col.Field("Priority").Width("100").Add();
        col.Field("StartDate").Type("date").Format("yMd").Width("120").Add();
        col.Field("TaskName").Width("200").Add();
    })
    .Render()
```

**To apply multi-sort:** Ctrl+Click column headers in desired order

## Sort Configuration

### Allow/Disable Sort per Column

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .AllowSorting(true)
    .Columns(col =>
    {
        col.Field("TaskID").AllowSorting(true).Width("80").Add();           // Sortable
        col.Field("TaskName").AllowSorting(true).Width("200").Add();        // Sortable
        col.Field("Notes").AllowSorting(false).Width("300").Add();          // Not sortable
        col.Field("InternalID").AllowSorting(false).Width("80").Add();      // Not sortable
    })
    .Render()
```

### Initial Sort Direction

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .AllowSorting(true)
    .SortSettings(sort =>
    {
        sort.Columns(col =>
        {
            col.Field("TaskName").Direction(SortDirection.Ascending).Add();
        });
    })
    .Render()
```

## Programmatic Sorting

### Sort by Column

```html
<button onclick="sortByName()">Sort by Task Name</button>
<button onclick="sortByDate()">Sort by Date</button>
<button onclick="clearSort()">Clear Sort</button>

@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .AllowSorting(true)
    .Render()

<script>
function sortByName() {
    var grid = document.getElementById('TreeGrid').ej2_instances[0];
    var sortSettings = [{ field: 'TaskName', direction: 'Ascending' }];
    grid.sort(sortSettings);
}

function sortByDate() {
    var grid = document.getElementById('TreeGrid').ej2_instances[0];
    var sortSettings = [{ field: 'StartDate', direction: 'Descending' }];
    grid.sort(sortSettings);
}

function clearSort() {
    var grid = document.getElementById('TreeGrid').ej2_instances[0];
    grid.clearSorting();
}
</script>
```

### Complex Sorting

```html
<script>
function multiSort() {
    var grid = document.getElementById('TreeGrid').ej2_instances[0];
    
    // Sort by Priority (Ascending), then Duration (Descending)
    var sortSettings = [
        { field: 'Priority', direction: 'Ascending' },
        { field: 'Duration', direction: 'Descending' }
    ];
    
    grid.sort(sortSettings);
}
</script>
```

## Sort Events

### ActionBegin Event

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .AllowSorting(true)
    .ActionBegin("beforeSort")
    .Columns(col =>
    {
        col.Field("TaskID").Width("80").Add();
        col.Field("TaskName").Width("200").Add();
    })
    .Render()

<script>
function beforeSort(args) {
    if (args.requestType === 'sorting') {
        console.log("Sorting by: " + args.data[0].field);
        console.log("Direction: " + args.data[0].direction);
        
        // Prevent sorting certain columns
        if (args.data[0].field === 'InternalID') {
            args.cancel = true;
        }
    }
}
</script>
```

### ActionComplete Event

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .AllowSorting(true)
    .ActionComplete("afterSort")
    .Render()

<script>
function afterSort(args) {
    if (args.requestType === 'sorting') {
        console.log("Sort completed successfully");
        // Update UI, refresh details, etc.
    }
}
</script>
```

## Custom Sort Comparer

### Custom Sorting Logic

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .AllowSorting(true)
    .CustomComparer("customSort")
    .Columns(col =>
    {
        col.Field("TaskID").Width("80").Add();
        col.Field("Priority").Width("100").Add();  // Will use custom sort
        col.Field("TaskName").Width("200").Add();
    })
    .Render()

<script>
function customSort(args) {
    // Custom comparison for Priority column
    var priority = { 'Critical': 1, 'High': 2, 'Medium': 3, 'Low': 4 };
    
    if (args.direction === 'Ascending') {
        return priority[args.value1] - priority[args.value2];
    } else {
        return priority[args.value2] - priority[args.value1];
    }
}
</script>
```
