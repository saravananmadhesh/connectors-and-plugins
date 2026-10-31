# Sorting, Filtering, and Validation

## Table of Contents
- [Overview](#overview)
- [Card Sorting](#card-sorting)
- [Swimlane Sorting](#swimlane-sorting)
- [Filtering Cards](#filtering-cards)
- [Search Functionality](#search-functionality)
- [Card Validation Rules](#card-validation-rules)
- [Column Constraints](#column-constraints)
- [Swimlane Constraints](#swimlane-constraints)

## Overview

Kanban provides built-in features for organizing, filtering, and constraining cards to maintain workflow integrity and board usability.

**Key Features:**
- **Sorting**: Order cards within columns and swimlanes
- **Filtering**: Show/hide cards based on criteria
- **Validation**: Enforce minimum and maximum card limits
- **Search**: Find cards by content
- **Constraints**: Apply WIP limits per column or swimlane

## Card Sorting

Control the display order of cards within columns using the `SortSettings` property.

**⚠️ IMPORTANT: Namespace Conflict**

The `SortDirection` enum exists in both `System.Web.Helpers` and `Syncfusion.EJ2.Kanban` namespaces. To avoid compilation errors, use fully qualified names:

```csharp
// ✅ Correct - Fully Qualified
.SortSettings(sort =>
{
    sort.SortBy(Syncfusion.EJ2.Kanban.SortOrderBy.Custom)
        .Field("Priority")
        .Direction(Syncfusion.EJ2.Kanban.SortDirection.Descending);
})

// ❌ Incorrect - Ambiguous Reference
.SortSettings(sort =>
{
    sort.SortBy(SortOrderBy.Custom)
        .Direction(SortDirection.Descending);  // Compiler Error CS0104
})
```

**Sort Options:**
- **Index**: Display order based on card index
- **DataSourceOrder**: Order matches data source sequence
- **Custom**: Custom sort field with direction

### Sort by Index

Default sorting based on card index position.

**Example:**

```razor
@Html.EJS().Kanban("kanban")
    .KeyField("Status")
    .DataSource((IEnumerable<object>)ViewBag.data)
    .Columns(col =>
    {
        col.HeaderText("To Do").KeyField("Open").Add();
        col.HeaderText("In Progress").KeyField("InProgress").Add();
        col.HeaderText("Testing").KeyField("Testing").Add();
        col.HeaderText("Done").KeyField("Close").Add();
    })
    .CardSettings(card =>
    {
        card.ContentField("Summary").HeaderField("Id");
    })
    .SortSettings(sort =>
    {
        sort.SortBy(SortOrderBy.Index);
    })
    .Render()
```

### Sort by Data Source Order

Maintain the original order from the data source.

**Example:**

```razor
.SortSettings(sort =>
{
    sort.SortBy(SortOrderBy.DataSourceOrder);
})
```

### Sort by Custom Field

Sort cards by a specific data field in ascending or descending order.

**Example - Sort by Priority (Descending):**

```razor
@Html.EJS().Kanban("kanban")
    .KeyField("Status")
    .DataSource((IEnumerable<object>)ViewBag.data)
    .Columns(col =>
    {
        col.HeaderText("To Do").KeyField("Open").Add();
        col.HeaderText("In Progress").KeyField("InProgress").Add();
    })
    .CardSettings(card =>
    {
        card.ContentField("Summary").HeaderField("Id");
    })
    .SortSettings(sort =>
    {
        sort.SortBy(Syncfusion.EJ2.Kanban.SortOrderBy.Custom)
            .Field("Priority")
            .Direction(Syncfusion.EJ2.Kanban.SortDirection.Descending);
    })
    .Render()
```

**Sort Directions:**
- `Syncfusion.EJ2.Kanban.SortDirection.Ascending`: A-Z, 0-9, Low to High
- `Syncfusion.EJ2.Kanban.SortDirection.Descending`: Z-A, 9-0, High to Low

**Example - Sort by Due Date (Ascending):**

```csharp
// Data Model
public class KanbanDataModel
{
    public int Id { get; set; }
    public string Status { get; set; }
    public string Summary { get; set; }
    public DateTime DueDate { get; set; }
    public string Priority { get; set; }
}

// Controller
public ActionResult Index()
{
    ViewBag.data = new List<KanbanDataModel>
    {
        new KanbanDataModel { Id = 1, Status = "Open", Summary = "Task 1", DueDate = DateTime.Now.AddDays(5), Priority = "High" },
        new KanbanDataModel { Id = 2, Status = "Open", Summary = "Task 2", DueDate = DateTime.Now.AddDays(2), Priority = "Normal" },
        new KanbanDataModel { Id = 3, Status = "Open", Summary = "Task 3", DueDate = DateTime.Now.AddDays(10), Priority = "Low" }
    };
    return View();
}
```

```razor
.SortSettings(sort =>
{
    sort.SortBy(Syncfusion.EJ2.Kanban.SortOrderBy.Custom)
        .Field("DueDate")
        .Direction(Syncfusion.EJ2.Kanban.SortDirection.Ascending);  // Earliest dates first
})
```

**Multiple Field Sorting:**

For complex sorting (e.g., Priority then DueDate), use custom comparer:

```razor
.SortSettings(sort =>
{
    sort.SortBy(Syncfusion.EJ2.Kanban.SortOrderBy.Custom)
        .Field("Priority")
        .Direction(Syncfusion.EJ2.Kanban.SortDirection.Descending)
        .SortComparer("customSortComparer");
})

<script>
    function customSortComparer(a, b) {
        // Primary sort: Priority
        var priorityOrder = { 'Critical': 1, 'High': 2, 'Normal': 3, 'Low': 4 };
        var priorityDiff = priorityOrder[a.Priority] - priorityOrder[b.Priority];
        
        if (priorityDiff !== 0) {
            return priorityDiff;
        }
        
        // Secondary sort: DueDate
        return new Date(a.DueDate) - new Date(b.DueDate);
    }
</script>
```

## Swimlane Sorting

Sort swimlane rows using the `SwimlaneSettings.SortBy` property. See the [swimlane.md](./swimlane.md) reference for detailed swimlane sorting examples.

**Quick Example:**

```razor
.SwimlaneSettings(swim =>
{
    swim.KeyField("Assignee")
        .SortBy(SortType.Ascending);  // A-Z order
})
```

## Filtering Cards

Dynamically filter cards based on custom criteria using the `query` property or methods.

**Example - Filter by Priority:**

```razor
@Html.EJS().Kanban("kanban")
    .KeyField("Status")
    .DataSource((IEnumerable<object>)ViewBag.data)
    .Columns(col =>
    {
        col.HeaderText("To Do").KeyField("Open").Add();
        col.HeaderText("In Progress").KeyField("InProgress").Add();
    })
    .CardSettings(card =>
    {
        card.ContentField("Summary").HeaderField("Id");
    })
    .Render()

<label>Filter by Priority:</label>
<select id="priorityFilter" onchange="filterCards()">
    <option value="">All</option>
    <option value="Critical">Critical</option>
    <option value="High">High</option>
    <option value="Normal">Normal</option>
    <option value="Low">Low</option>
</select>

<script>
    function filterCards() {
        var kanbanObj = document.getElementById('kanban').ej2_instances[0];
        var priority = document.getElementById('priorityFilter').value;
        
        if (priority) {
            // Filter to show only selected priority
            var query = new ej.data.Query().where('Priority', 'equal', priority);
            kanbanObj.query = query;
        } else {
            // Show all cards
            kanbanObj.query = new ej.data.Query();
        }
        
        kanbanObj.refresh();
    }
</script>
```

**Example - Filter by Multiple Criteria:**

```razor
<label>Assignee:</label>
<select id="assigneeFilter" onchange="filterByMultiple()">
    <option value="">All</option>
    <option value="Nancy">Nancy</option>
    <option value="Andrew">Andrew</option>
    <option value="Janet">Janet</option>
</select>

<label>Priority:</label>
<select id="priorityFilter" onchange="filterByMultiple()">
    <option value="">All</option>
    <option value="High">High</option>
    <option value="Normal">Normal</option>
    <option value="Low">Low</option>
</select>

<button onclick="clearFilters()">Clear Filters</button>

<script>
    function filterByMultiple() {
        var kanbanObj = document.getElementById('kanban').ej2_instances[0];
        var assignee = document.getElementById('assigneeFilter').value;
        var priority = document.getElementById('priorityFilter').value;
        
        var query = new ej.data.Query();
        
        // Add filters
        if (assignee) {
            query = query.where('Assignee', 'equal', assignee);
        }
        if (priority) {
            query = query.where('Priority', 'equal', priority);
        }
        
        kanbanObj.query = query;
        kanbanObj.refresh();
    }
    
    function clearFilters() {
        document.getElementById('assigneeFilter').value = '';
        document.getElementById('priorityFilter').value = '';
        filterByMultiple();
    }
</script>
```

**Example - Filter by Date Range:**

```razor
<label>Due Date From:</label>
<input type="date" id="dateFrom" onchange="filterByDateRange()" />

<label>Due Date To:</label>
<input type="date" id="dateTo" onchange="filterByDateRange()" />

<script>
    function filterByDateRange() {
        var kanbanObj = document.getElementById('kanban').ej2_instances[0];
        var dateFrom = document.getElementById('dateFrom').value;
        var dateTo = document.getElementById('dateTo').value;
        
        var query = new ej.data.Query();
        
        if (dateFrom && dateTo) {
            var fromDate = new Date(dateFrom);
            var toDate = new Date(dateTo);
            
            query = query.where('DueDate', 'greaterthanorequal', fromDate)
                         .where('DueDate', 'lessthanorequal', toDate);
        }
        
        kanbanObj.query = query;
        kanbanObj.refresh();
    }
</script>
```

**Query Operators:**
- `equal`: Exact match
- `notequal`: Not equal
- `greaterthan`: Greater than
- `greaterthanorequal`: Greater than or equal
- `lessthan`: Less than
- `lessthanorequal`: Less than or equal
- `contains`: String contains (case-insensitive)
- `startswith`: String starts with
- `endswith`: String ends with

## Search Functionality

Implement search to find cards by text content.

**Example - Search Cards:**

```razor
@Html.EJS().Kanban("kanban")
    .KeyField("Status")
    .DataSource((IEnumerable<object>)ViewBag.data)
    .Columns(col =>
    {
        col.HeaderText("To Do").KeyField("Open").Add();
        col.HeaderText("In Progress").KeyField("InProgress").Add();
        col.HeaderText("Testing").KeyField("Testing").Add();
        col.HeaderText("Done").KeyField("Close").Add();
    })
    .CardSettings(card =>
    {
        card.ContentField("Summary").HeaderField("Id");
    })
    .Render()

<div style="margin-bottom: 10px;">
    <input type="text" id="searchBox" placeholder="Search cards..." style="padding: 5px; width: 300px;" />
    <button onclick="searchCards()">Search</button>
    <button onclick="clearSearch()">Clear</button>
</div>

<script>
    function searchCards() {
        var kanbanObj = document.getElementById('kanban').ej2_instances[0];
        var searchText = document.getElementById('searchBox').value;
        
        if (searchText) {
            // Search across multiple fields
            var query = new ej.data.Query()
                .search(searchText, ['Summary', 'Description', 'Assignee'], 'contains', true);
            
            kanbanObj.query = query;
        } else {
            kanbanObj.query = new ej.data.Query();
        }
        
        kanbanObj.refresh();
    }
    
    function clearSearch() {
        document.getElementById('searchBox').value = '';
        searchCards();
    }
    
    // Search on Enter key
    document.getElementById('searchBox').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchCards();
        }
    });
</script>
```

**Live Search (Search as You Type):**

```razor
<input type="text" id="liveSearchBox" placeholder="Live search..." oninput="liveSearch()" />

<script>
    function liveSearch() {
        var kanbanObj = document.getElementById('kanban').ej2_instances[0];
        var searchText = document.getElementById('liveSearchBox').value;
        
        if (searchText.length >= 2) {  // Start searching after 2 characters
            var query = new ej.data.Query()
                .search(searchText, ['Summary', 'Description'], 'contains', true);
            kanbanObj.query = query;
        } else {
            kanbanObj.query = new ej.data.Query();
        }
        
        kanbanObj.refresh();
    }
</script>
```

## Card Validation Rules

Enforce minimum and maximum limits on the number of cards allowed in columns or swimlanes using `ConstraintType`.

**Constraint Types:**
- **Column**: Apply limits per column
- **Swimlane**: Apply limits per swimlane row

### Column Constraints

Limit the number of cards in each column to enforce Work In Progress (WIP) limits.

**Example - Column-Based WIP Limits:**

```razor
@Html.EJS().Kanban("kanban")
    .KeyField("Status")
    .DataSource((IEnumerable<object>)ViewBag.data)
    .ConstraintType(ConstraintType.Column)  // Apply constraints per column
    .Columns(col =>
    {
        col.HeaderText("To Do").KeyField("Open").Add();
        col.HeaderText("In Progress").KeyField("InProgress")
            .MinCount(2)   // Minimum 2 cards required
            .MaxCount(5)   // Maximum 5 cards allowed
            .Add();
        col.HeaderText("Testing").KeyField("Testing")
            .MaxCount(3)   // Maximum 3 cards allowed
            .Add();
        col.HeaderText("Done").KeyField("Close").Add();
    })
    .CardSettings(card =>
    {
        card.ContentField("Summary").HeaderField("Id");
    })
    .Render()
```

**Behavior:**
- **MaxCount exceeded**: Card count turns red, drag-and-drop to column is prevented
- **MinCount not met**: Card count indicator shows warning
- Visual indicators help enforce WIP limits
- Validation occurs on drag-and-drop and programmatic card additions

**Example - Visual Feedback:**

```razor
<style>
    /* Column with max count exceeded */
    .e-kanban .e-column-max-count {
        color: red;
        font-weight: bold;
    }
    
    /* Column with min count not met */
    .e-kanban .e-column-min-count {
        color: orange;
    }
</style>
```

### Swimlane Constraints

Apply card limits per swimlane row instead of per column.

**Example - Swimlane-Based Limits:**

```razor
@Html.EJS().Kanban("kanban")
    .KeyField("Status")
    .DataSource((IEnumerable<object>)ViewBag.data)
    .ConstraintType(ConstraintType.Swimlane)  // Apply constraints per swimlane
    .Columns(col =>
    {
        col.HeaderText("To Do").KeyField("Open")
            .MaxCount(5)   // Max 5 cards per swimlane in this column
            .Add();
        col.HeaderText("In Progress").KeyField("InProgress")
            .MaxCount(3)   // Max 3 cards per swimlane in this column
            .Add();
        col.HeaderText("Testing").KeyField("Testing")
            .MaxCount(2)   // Max 2 cards per swimlane in this column
            .Add();
        col.HeaderText("Done").KeyField("Close").Add();
    })
    .CardSettings(card =>
    {
        card.ContentField("Summary").HeaderField("Id");
    })
    .SwimlaneSettings(swim =>
    {
        swim.KeyField("Assignee");
    })
    .Render()
```

**Behavior:**
- Limits apply to each swimlane row independently
- Nancy's "In Progress" can have 3 cards, Andrew's "In Progress" can also have 3 cards
- Useful for workload balancing per team member

**Use Cases:**
- **Column constraints**: Enforce WIP limits across entire workflow stages
- **Swimlane constraints**: Balance workload per assignee or team

## Validation Events

Handle validation with the `DragStop` event to implement custom validation logic.

**Example - Custom Validation:**

```razor
@Html.EJS().Kanban("kanban")
    .KeyField("Status")
    .DataSource((IEnumerable<object>)ViewBag.data)
    .ConstraintType(ConstraintType.Column)
    .Columns(col =>
    {
        col.HeaderText("To Do").KeyField("Open").Add();
        col.HeaderText("In Progress").KeyField("InProgress").MaxCount(5).Add();
        col.HeaderText("Testing").KeyField("Testing").MaxCount(3).Add();
        col.HeaderText("Done").KeyField("Close").Add();
    })
    .CardSettings(card =>
    {
        card.ContentField("Summary").HeaderField("Id");
    })
    .DragStop("onDragStop")
    .Render()

<script>
    function onDragStop(args) {
        var kanbanObj = document.getElementById('kanban').ej2_instances[0];
        var targetColumn = args.data[0].Status;
        
        // Custom validation: High priority tasks must be assigned
        if (targetColumn === 'InProgress' && args.data[0].Priority === 'High' && !args.data[0].Assignee) {
            args.cancel = true;
            alert('High priority tasks must be assigned before moving to In Progress');
            return;
        }
        
        // Custom validation: Tasks must be tested before closing
        if (targetColumn === 'Close' && args.data[0].TestingCompleted !== true) {
            args.cancel = true;
            alert('Tasks must complete testing before closing');
            return;
        }
        
        // Check column capacity
        var columnData = kanbanObj.getColumnData(targetColumn);
        if (columnData.length >= 5) {
            args.cancel = true;
            alert('Column has reached maximum capacity');
            return;
        }
    }
</script>
```

## Show Empty Columns

Display columns even when they have no cards using `ShowEmptyColumn`.

**Example:**

```razor
@Html.EJS().Kanban("kanban")
    .KeyField("Status")
    .DataSource((IEnumerable<object>)ViewBag.data)
    .ShowEmptyColumn(true)  // Show columns with no cards
    .Columns(col =>
    {
        col.HeaderText("To Do").KeyField("Open").Add();
        col.HeaderText("In Progress").KeyField("InProgress").Add();
        col.HeaderText("Testing").KeyField("Testing").Add();
        col.HeaderText("Done").KeyField("Close").Add();
    })
    .CardSettings(card =>
    {
        card.ContentField("Summary").HeaderField("Id");
    })
    .Render()
```

**Benefits:**
- Maintains consistent board layout
- Shows all workflow stages even if unused
- Allows drag-and-drop to empty columns

## Best Practices

### Sorting
1. **Sort by priority**: Use descending order to show high-priority items first
2. **Sort by due date**: Ascending order helps identify urgent tasks
3. **Custom comparers**: Implement for complex multi-field sorting
4. **Performance**: Simple sorting (Index, DataSourceOrder) is faster than custom sorting

### Filtering
1. **Combine filters**: Use multiple criteria for precise filtering
2. **Clear filters**: Always provide a way to reset/clear filters
3. **Visual feedback**: Show active filters to users
4. **Performance**: Filter on indexed fields when possible

### Search
1. **Multi-field search**: Search across Summary, Description, Assignee for better results
2. **Minimum characters**: Start search after 2-3 characters for performance
3. **Case-insensitive**: Use `ignoreCase: true` in search queries
4. **Debounce**: Add delay for live search to reduce queries

### Validation
1. **Column constraints**: Use for WIP limits and workflow control
2. **Swimlane constraints**: Use for workload balancing per assignee
3. **Visual indicators**: Color-code constraint violations
4. **Custom validation**: Implement business rules in DragStop event
5. **User feedback**: Provide clear messages when validation fails
6. **Reasonable limits**: Set MaxCount based on realistic capacity
7. **Testing**: Test validation with edge cases (empty columns, concurrent updates)

### Constraints Best Practices
1. **WIP limits**: Typical values: 3-5 for "In Progress", 2-3 for "Testing"
2. **Balance**: Avoid too restrictive limits that block workflow
3. **MinCount**: Use sparingly, primarily for quality gates
4. **Documentation**: Explain constraint rationale to team
5. **Flexibility**: Allow overrides for exceptional cases

## Common Patterns

**Pattern 1: Priority-Based Board**
```razor
.SortSettings(sort =>
{
    sort.SortBy(Syncfusion.EJ2.Kanban.SortOrderBy.Custom)
        .Field("Priority")
        .Direction(Syncfusion.EJ2.Kanban.SortDirection.Descending);
})
.ConstraintType(Syncfusion.EJ2.Kanban.ConstraintType.Column)
.Columns(col =>
{
    col.HeaderText("In Progress").KeyField("InProgress").MaxCount(3).Add();
})
```

**Pattern 2: Assignee Workload Limits**
```razor
.ConstraintType(Syncfusion.EJ2.Kanban.ConstraintType.Swimlane)
.Columns(col =>
{
    col.HeaderText("In Progress").KeyField("InProgress").MaxCount(2).Add();
})
.SwimlaneSettings(swim =>
{
    swim.KeyField("Assignee");
})
```

**Pattern 3: Search + Filter Combination**
```javascript
function advancedFilter() {
    var searchText = document.getElementById('search').value;
    var priority = document.getElementById('priority').value;
    
    var query = new ej.data.Query();
    if (searchText) {
        query = query.search(searchText, ['Summary', 'Description'], 'contains', true);
    }
    if (priority) {
        query = query.where('Priority', 'equal', priority);
    }
    
    kanbanObj.query = query;
    kanbanObj.refresh();
}
```
