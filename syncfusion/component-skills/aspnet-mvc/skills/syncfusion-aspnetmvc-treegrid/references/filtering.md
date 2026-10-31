# Filtering in Tree Grid

## Table of Contents

- [When to Use This](#when-to-use-this)
- [Enable Filtering](#enable-filtering)
- [Filter Types](#filter-types)
- [Filter Bar](#filter-bar)
- [Menu Filter](#menu-filter)
- [Advanced Filtering](#advanced-filtering)

## When to Use This

Use filtering features when you need to:
- Allow users to filter data by specific column values
- Implement filter bar for quick text-based filtering
- Provide menu filters with multiple selection options
- Apply programmatic filters based on business logic
- Filter hierarchical data with parent, child, or both modes
- Combine multiple filter conditions with AND/OR logic

## Enable Filtering

### Basic Filter Setup

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .AllowFiltering(true)
    .FilterSettings(filter =>
    {
        filter.Type(FilterType.FilterBar);      // FilterBar or Menu
        filter.Hierarchymode(FilterHierarchyMode.Parent);  // Parent, Child, or Both
    })
    .Columns(col =>
    {
        col.Field("TaskID").HeaderText("ID").Width("80").AllowFiltering(true).Add();
        col.Field("TaskName").HeaderText("Task").Width("200").AllowFiltering(true).Add();
        col.Field("StartDate").HeaderText("Start").Type("date").Format("yMd").Width("120").Add();
        col.Field("Duration").HeaderText("Duration").Width("100").Add();
    })
    .Render()
```

## Filter Types

### Filter Bar Mode

Filter bar appears below column headers:

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .AllowFiltering(true)
    .FilterSettings(filter =>
    {
        filter.Type(FilterType.FilterBar);
    })
    .Columns(col =>
    {
        col.Field("TaskName")
           .HeaderText("Task Name")
           .Filter("Text")             // Text, Numeric, Date, Boolean
           .Width("200")
           .Add();
           
        col.Field("Duration")
           .HeaderText("Duration Days")
           .Filter("Numeric")
           .Width("120")
           .Add();
           
        col.Field("StartDate")
           .HeaderText("Start Date")
           .Filter("Date")
           .Type("date")
           .Format("yMd")
           .Width("120")
           .Add();
    })
    .Render()
```

### Menu Filter Mode

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .AllowFiltering(true)
    .FilterSettings(filter =>
    {
        filter.Type(FilterType.Menu);
    })
    .Columns(col =>
    {
        col.Field("TaskID").HeaderText("ID").Width("80").Add();
        col.Field("TaskName").HeaderText("Task").Width("200").Add();
        col.Field("Status").HeaderText("Status").Width("120").Add();
    })
    .Render()
```

## Filter Bar

### Custom Filter Operators

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .AllowFiltering(true)
    .FilterSettings(filter => filter.Type(FilterType.FilterBar))
    .Columns(col =>
    {
        // Text filter with custom operators
        col.Field("TaskName")
           .HeaderText("Task Name")
           .Filter("Text")
           .FilterBarTemplate("<input type='text' placeholder='Search task...'>")
           .Width("200")
           .Add();
           
        // Number filter
        col.Field("Duration")
           .HeaderText("Duration")
           .Filter("Numeric")
           .FilterBarTemplate("<input type='number' min='0' max='100'>")
           .Width("120")
           .Add();
    })
    .Render()
```

### Clearing Filters

```html
<button onclick="clearFilters()">Clear All Filters</button>

<script>
function clearFilters() {
    var grid = document.getElementById('TreeGrid').ej2_instances[0];
    grid.clearFiltering();
    console.log("All filters cleared");
}
</script>
```

## Menu Filter

### Multi-value Filtering

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .AllowFiltering(true)
    .FilterSettings(filter =>
    {
        filter.Type(FilterType.Menu)
              .Hierarchymode(FilterHierarchyMode.Both);
    })
    .Columns(col =>
    {
        col.Field("Status")
           .HeaderText("Status")
           .Width("120")
           .Add();
    })
    .Render()
```

Click the filter icon to open menu and select multiple values.

## Advanced Filtering

### Programmatic Filtering

```html
<button onclick="filterByStatus()">Filter Active</button>
<button onclick="filterByDateRange()">Filter Recent</button>

@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .AllowFiltering(true)
    .Columns(col =>
    {
        col.Field("TaskID").Width("80").Add();
        col.Field("TaskName").Width("200").Add();
        col.Field("Status").Width("120").Add();
        col.Field("StartDate").Type("date").Format("yMd").Width("120").Add();
    })
    .Render()

<script>
function filterByStatus() {
    var grid = document.getElementById('TreeGrid').ej2_instances[0];
    var filterSettings = [
        { field: 'Status', operator: 'equal', value: 'Active' }
    ];
    grid.filterByMethod(filterSettings);
}

function filterByDateRange() {
    var grid = document.getElementById('TreeGrid').ej2_instances[0];
    var thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    var filterSettings = [
        { field: 'StartDate', operator: 'greaterThanOrEqual', value: thirtyDaysAgo }
    ];
    grid.filterByMethod(filterSettings);
}
</script>
```

### Multiple Conditions

```html
<script>
function advancedFilter() {
    var grid = document.getElementById('TreeGrid').ej2_instances[0];
    
    // Filter: (Duration > 5 AND Status = 'Active') OR Progress >= 50
    var filterSettings = [
        { field: 'Duration', operator: 'greaterThan', value: 5, predicate: 'and' },
        { field: 'Status', operator: 'equal', value: 'Active', predicate: 'or' },
        { field: 'Progress', operator: 'greaterThanOrEqual', value: 50 }
    ];
    
    grid.filterByMethod(filterSettings);
}
</script>
```

### Filter Operators

| Operator | Description |
|----------|-------------|
| `equal` | Column value equals provided value |
| `notEqual` | Column value not equals provided value |
| `greaterThan` | Column value > provided value |
| `lessThan` | Column value < provided value |
| `greaterThanOrEqual` | Column value >= provided value |
| `lessThanOrEqual` | Column value <= provided value |
| `startsWith` | Text starts with value |
| `endsWith` | Text ends with value |
| `contains` | Text contains value |
| `between` | Value between range |

### Custom Filter Function

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .ActionBegin("applyCustomFilter")
    .AllowFiltering(true)
    .Render()

<script>
function applyCustomFilter(args) {
    if (args.requestType === 'filtering') {
        var predicate = [];
        
        // Apply custom logic
        for (var i = 0; i < args.filterModel.filtered.length; i++) {
            var filter = args.filterModel.filtered[i];
            
            // Custom condition: multiply duration by 2 for comparison
            if (filter.field === 'Duration') {
                filter.value = filter.value / 2;
            }
        }
    }
}
</script>
```

### Filter Events

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .AllowFiltering(true)
    .ActionBegin("onFilterBegin")
    .ActionComplete("onFilterComplete")
    .Render()

<script>
function onFilterBegin(args) {
    if (args.requestType === 'filtering') {
        console.log("Filter applying for field: " + args.filterModel.field);
        // Validate filter condition
        if (args.filterModel.operator === 'contains' && args.filterModel.value === '') {
            args.cancel = true;
            alert('Filter value cannot be empty');
        }
    }
}

function onFilterComplete(args) {
    if (args.requestType === 'filtering') {
        console.log("Filter applied successfully");
        // Update UI based on filtered results
    }
}
</script>
```

### Filter with Hierarchy Mode

```html
@Html.EJS().TreeGrid("TreeGrid")
    .DataSource(ViewBag.DataSource)
    .AllowFiltering(true)
    .FilterSettings(filter =>
    {
        // Hierarchymode.Parent: Show filtered parent rows
        // Hierarchymode.Child: Show child rows matching filter
        // Hierarchymode.Both: Show parent and child matching
        filter.Hierarchymode(FilterHierarchyMode.Parent);
    })
    .Columns(col =>
    {
        col.Field("TaskID").Width("80").Add();
        col.Field("TaskName").Width("200").Add();
        col.Field("Status").Width("120").Add();
    })
    .Render()
```

**Example with Parent Mode:**
```
Parent Task (doesn't match filter) - Hidden
├─ Child Task (matches filter) - Shown
```
