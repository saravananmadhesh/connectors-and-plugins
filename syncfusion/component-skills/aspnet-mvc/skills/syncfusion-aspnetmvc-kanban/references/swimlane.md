# Swimlane Configuration

## Table of Contents
- [Overview](#overview)
- [Rendering Swimlane Rows](#rendering-swimlane-rows)
- [Custom Row Text](#custom-row-text)
- [Swimlane Templates](#swimlane-templates)
- [Sorting Swimlane Rows](#sorting-swimlane-rows)
- [Drag and Drop Across Swimlanes](#drag-and-drop-across-swimlanes)
- [Empty Swimlane Rows](#empty-swimlane-rows)
- [Item Count Display](#item-count-display)
- [Frozen Swimlane Rows](#frozen-swimlane-rows)

## Overview

Swimlanes are horizontal categorizations of cards on the Kanban board. They group cards based on a specific data field, providing transparency to the workflow process by organizing tasks by assignee, priority, team, or any custom criteria.

**Key SwimlaneSettings Properties:**
- **KeyField**: Data field for grouping cards (required)
- **TextField**: Custom text field for swimlane header display
- **Template**: Custom HTML template for swimlane headers
- **SortBy**: Sort order (Ascending/Descending)
- **AllowDragAndDrop**: Enable drag-and-drop across swimlanes
- **ShowEmptyRow**: Display swimlanes with no cards
- **ShowItemCount**: Show card count per swimlane
- **ShowUnassignedRow**: Display unassigned cards in a separate row
- **EnableFrozenRows**: Keep current swimlane header visible on scroll

## Rendering Swimlane Rows

Cards are grouped based on the `KeyField` property mapped from the data source and displayed in horizontal rows separated by columns.

**Requirements:**
- `KeyField` is mandatory for rendering swimlanes
- KeyField must map to a field in your data source

**Example:**

```csharp
// Data Model
public class KanbanDataModel
{
    public int Id { get; set; }
    public string Status { get; set; }
    public string Summary { get; set; }
    public string Assignee { get; set; }  // Used for swimlane grouping
}

// Controller
public ActionResult Index()
{
    ViewBag.data = new List<KanbanDataModel>
    {
        new KanbanDataModel { Id = 1, Status = "Open", Summary = "Task 1", Assignee = "Nancy Davloio" },
        new KanbanDataModel { Id = 2, Status = "InProgress", Summary = "Task 2", Assignee = "Andrew Fuller" },
        new KanbanDataModel { Id = 3, Status = "Testing", Summary = "Task 3", Assignee = "Nancy Davloio" },
        new KanbanDataModel { Id = 4, Status = "Close", Summary = "Task 4", Assignee = "Janet Leverling" }
    };
    return View();
}
```

```razor
@* View *@
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
    .SwimlaneSettings(swim =>
    {
        swim.KeyField("Assignee");  // Group by Assignee
    })
    .Render()
```

**Result:** Each assignee gets their own horizontal swimlane row. Cards are organized showing Nancy's tasks, Andrew's tasks, and Janet's tasks in separate rows across all columns.

**Use Cases:**
- Grouping by team member assignments
- Organizing by priority levels
- Separating by project or epic
- Categorizing by customer or department

## Custom Row Text

Customize the swimlane row header text using the `TextField` property to display a different field than the KeyField.

**Example:**

```csharp
// Data Model with separate display name
public class KanbanDataModel
{
    public int Id { get; set; }
    public string Status { get; set; }
    public string Summary { get; set; }
    public string Assignee { get; set; }          // Key field (e.g., "ndavloio")
    public string AssigneeName { get; set; }      // Display name (e.g., "Nancy Davloio")
}

// Controller
public ActionResult Index()
{
    ViewBag.data = new List<KanbanDataModel>
    {
        new KanbanDataModel 
        { 
            Id = 1, 
            Status = "Open", 
            Summary = "Task 1", 
            Assignee = "ndavloio",
            AssigneeName = "Nancy Davloio"
        },
        new KanbanDataModel 
        { 
            Id = 2, 
            Status = "InProgress", 
            Summary = "Task 2", 
            Assignee = "afuller",
            AssigneeName = "Andrew Fuller"
        }
    };
    return View();
}
```

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
    .SwimlaneSettings(swim =>
    {
        swim.KeyField("Assignee")           // Groups by: ndavloio, afuller
            .TextField("AssigneeName");      // Displays: Nancy Davloio, Andrew Fuller
    })
    .Render()
```

**Notes:**
- TextField is optional; if not specified, KeyField value is displayed
- If TextField mapping doesn't exist in data, KeyField is used as fallback
- Useful for displaying user-friendly names while using IDs for grouping

## Swimlane Templates

Customize swimlane row headers with HTML elements, images, icons, or custom styling using the `Template` property.

**Template Variables Available:**
- `keyField`: The swimlane key field value
- `textField`: The swimlane text field value
- All other fields from the swimlane grouping data

**Example - Swimlane with Avatar Images:**

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
    .SwimlaneSettings(swim =>
    {
        swim.KeyField("Assignee")
            .Template("#swimlaneTemplate")
            .TextField("AssigneeName");
    })
    .Render()

<script id="swimlaneTemplate" type="text/x-jsrender">
    <div class='swimlane-template e-swimlane-template-table'>
        <div class="e-swimlane-row-text">
            <img src="../Content/images/Kanban/${keyField}.png" alt="" />
            <span>${textField}</span>
        </div>
    </div>
</script>

<style>
    .swimlane-template {
        font-size: 15px;
        font-weight: 500;
    }
    
    .swimlane-template img {
        height: 24px;
        width: 24px;
        border-radius: 50%;
        margin-right: 10px;
    }
    
    .swimlane-template span {
        padding-left: 10px;
        vertical-align: middle;
    }
</style>
```

**Use Cases:**
- Adding user avatars or profile pictures
- Displaying priority icons with colors
- Including metrics or KPIs per swimlane
- Custom branding or theming
- Status indicators

## Sorting Swimlane Rows

Control the display order of swimlane rows using the `SortBy` property.

**Sort Options:**
- **Ascending**: Default order (A-Z, 0-9)
- **Descending**: Reverse order (Z-A, 9-0)

**Example - Descending Order:**

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
    .SwimlaneSettings(swim =>
    {
        swim.KeyField("Assignee")
            .SortBy(SortType.Descending);  // Sort Z-A
    })
    .Render()
```

**Custom Sorting:**

For custom sort logic, use the `SortComparer` property with a JavaScript function:

```razor
.SwimlaneSettings(swim =>
{
    swim.KeyField("Priority")
        .SortComparer("customSortComparer");
})

<script>
    function customSortComparer(a, b) {
        // Custom sort: High > Normal > Low
        var order = { 'High': 1, 'Normal': 2, 'Low': 3 };
        return order[a] - order[b];
    }
</script>
```

## Drag and Drop Across Swimlanes

By default, cards can be dragged within their swimlane row across columns, but not to different swimlane rows. Enable cross-swimlane drag-and-drop using `AllowDragAndDrop`.

**Default Behavior:**
- Drag cards horizontally across columns within the same swimlane
- Cannot drag cards to different swimlane rows

**Example - Enable Cross-Swimlane Drag-and-Drop:**

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
    .SwimlaneSettings(swim =>
    {
        swim.KeyField("Assignee")
            .AllowDragAndDrop(true);  // Enable cross-swimlane drag-and-drop
    })
    .Render()
```

**Result:** Users can now drag cards vertically across swimlane rows, enabling task reassignment between team members.

**Use Cases:**
- Reassigning tasks to different team members
- Moving items between priority levels
- Transferring work between teams
- Rebalancing workload

## Empty Swimlane Rows

Display swimlane rows even when they contain no cards using the `ShowEmptyRow` property.

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
    .SwimlaneSettings(swim =>
    {
        swim.KeyField("Assignee")
            .ShowEmptyRow(true);  // Show rows with no cards
    })
    .Render()
```

**Behavior:**
- Swimlane rows appear for all unique KeyField values in the data source
- Even if a swimlane has zero cards, its row is still rendered
- Empty rows can receive cards via drag-and-drop

**Use Cases:**
- Showing all team members even if they have no current tasks
- Displaying all priority levels for consistency
- Maintaining visual structure of the board
- Indicating available assignees

## Item Count Display

Show or hide the card count per swimlane row in the header using `ShowItemCount`.

**Default:** `ShowItemCount` is `true` by default.

**Example - Hide Item Count:**

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
    .SwimlaneSettings(swim =>
    {
        swim.KeyField("Assignee")
            .ShowItemCount(false);  // Hide card count
    })
    .Render()
```

**Display Format:** When enabled, shows "X Items" (localized based on Locale property).

**Use Cases:**
- Tracking workload per team member
- Monitoring task distribution
- Identifying bottlenecks
- Minimalist display when count is unnecessary

## Frozen Swimlane Rows

Keep the current swimlane row header visible at the top while scrolling through long swimlane content.

**Requirements:**
- Kanban must have scrollable content (height set explicitly)
- Only works with Kanban content scrolling

**Example:**

```razor
@Html.EJS().Kanban("kanban")
    .KeyField("Status")
    .Height("500")  // Required for scrolling
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
    .SwimlaneSettings(swim =>
    {
        swim.KeyField("Assignee")
            .EnableFrozenRows(true);  // Freeze swimlane header on scroll
    })
    .Render()
```

**Behavior:**
- As you scroll down within a swimlane, the swimlane header stays visible at the top
- When scrolling to a new swimlane, the header dynamically updates to show the current swimlane
- Improves context awareness in boards with many cards per swimlane

**Use Cases:**
- Large datasets with many cards per swimlane
- Long scrolling boards
- Maintaining context during vertical scrolling
- Better navigation in complex boards

## Unassigned Row

Display cards with no swimlane KeyField value in a separate "Unassigned" row using `ShowUnassignedRow`.

**Default:** `ShowUnassignedRow` is `true` by default.

**Example:**

```csharp
// Data with some cards having null/empty Assignee
public ActionResult Index()
{
    ViewBag.data = new List<KanbanDataModel>
    {
        new KanbanDataModel { Id = 1, Status = "Open", Summary = "Task 1", Assignee = "Nancy" },
        new KanbanDataModel { Id = 2, Status = "Open", Summary = "Task 2", Assignee = null },  // No assignee
        new KanbanDataModel { Id = 3, Status = "InProgress", Summary = "Task 3", Assignee = "" }  // Empty assignee
    };
    return View();
}
```

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
    .SwimlaneSettings(swim =>
    {
        swim.KeyField("Assignee")
            .ShowUnassignedRow(true);  // Show "Unassigned" row
    })
    .Render()
```

**Result:** Cards without an assignee appear in a special "Unassigned" swimlane row at the top or bottom of the board.

**Hide Unassigned Row:**

```razor
.SwimlaneSettings(swim =>
{
    swim.KeyField("Assignee")
        .ShowUnassignedRow(false);  // Hide unassigned cards
})
```

**Note:** The text "Unassigned" can be localized using the Locale property.

## Swimlane Direction

Control swimlane sort direction using the `SortDirection` property.

**Example:**

```razor
.SwimlaneSettings(swim =>
{
    swim.KeyField("Assignee")
        .SortDirection(SortDirection.Ascending);  // A-Z sort
})
```

**Options:**
- `SortDirection.Ascending`: Default, A-Z order
- `SortDirection.Descending`: Z-A order

## Best Practices

1. **Choose meaningful KeyField**: Select a field that logically groups related work
2. **Use TextField for readability**: Display user-friendly names while using IDs for grouping
3. **Enable ShowEmptyRow**: Provides complete view of all team members or categories
4. **Show item counts**: Helps identify workload imbalances
5. **Consider frozen rows**: Essential for boards with 100+ cards per swimlane
6. **Enable cross-swimlane drag**: When reassignment is common workflow
7. **Sort strategically**: Descending might work better for priority-based swimlanes
8. **Handle unassigned items**: Decide whether to show or hide based on your workflow
9. **Test with realistic data**: Ensure swimlane grouping makes sense with production data
10. **Use templates sparingly**: Complex templates can impact rendering performance

## Swimlane vs Column Grouping

**When to use Swimlanes:**
- Grouping by assignee, team, or priority
- Horizontal organization preferred
- Need to see all team members' work across workflow stages
- Comparing workload distribution

**When to use Columns:**
- Representing workflow stages (To Do, In Progress, Done)
- Vertical progression through process
- Sequential workflow visualization
- Status-based organization
