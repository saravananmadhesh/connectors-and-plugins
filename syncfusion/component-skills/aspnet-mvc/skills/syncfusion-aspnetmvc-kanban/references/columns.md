# Columns Configuration

## Table of Contents
- [Overview](#overview)
- [Single-Key Mapping](#single-key-mapping)
- [Multi-Key Mapping](#multi-key-mapping)
- [Header Text](#header-text)
- [Header Template](#header-template)
- [Toggle Columns](#toggle-columns)
- [Initially Collapsed Columns](#initially-collapsed-columns)
- [Column Drag and Drop](#column-drag-and-drop)
- [Stacked Headers](#stacked-headers)

## Overview

Columns in the Kanban board represent each stage of the workflow process. Column definitions serve as the schema for organizing cards and enabling drag-and-drop operations. Columns are defined using the `Columns` property and are categorized by mapping keys from the data source.

**Essential Properties:**
- `KeyField`: Maps to data field value (determines which cards belong to this column)
- `HeaderText`: Display text for the column header
- `AllowDrag` / `AllowDrop`: Control drag-and-drop behavior per column
- `AllowToggle`: Enable expand/collapse functionality
- `MinCount` / `MaxCount`: Validation limits for cards per column
- `ShowItemCount`: Display card count in column header
- `Template`: Custom HTML template for column header
- `TransitionColumns`: Define allowed workflow transitions

## Single-Key Mapping

The most common column configuration where each column maps to a single status value from the data source.

**Required Property:** `KeyField` must be set on the Kanban component to specify which data field determines column placement.

**Example:**

```razor
@Html.EJS().Kanban("kanban")
    .KeyField("Status")  // Maps to the Status field in data
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
```

**How it works:**
- Cards with `Status = "Open"` appear in the "To Do" column
- Cards with `Status = "InProgress"` appear in the "In Progress" column
- Cards with `Status = "Testing"` appear in the "Testing" column
- Cards with `Status = "Close"` appear in the "Done" column

**Important:** The `KeyField` property on the Kanban component is **mandatory** and must match a field in your data source.

## Multi-Key Mapping

Map multiple data values to a single column using comma-separated keys. This is useful when consolidating similar statuses into one column.

**Example:**

```razor
@Html.EJS().Kanban("kanban")
    .KeyField("Status")
    .DataSource((IEnumerable<object>)ViewBag.data)
    .Columns(col =>
    {
        col.HeaderText("To Do").KeyField("Open, Validate").Add();  // Multiple keys
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

**Result:** Both cards with `Status = "Open"` and `Status = "Validate"` will appear in the "To Do" column.

**Use Cases:**
- Combining "New" and "Backlog" into a single "To Do" column
- Merging "Done" and "Delivered" into a "Completed" column
- Grouping similar workflow states

## Header Text

Customize the text displayed in column headers using the `HeaderText` property.

**Example:**

```razor
.Columns(col =>
{
    col.HeaderText("Backlog").KeyField("Open").Add();
    col.HeaderText("Development").KeyField("InProgress").Add();
    col.HeaderText("QA Review").KeyField("Testing").Add();
    col.HeaderText("Released").KeyField("Close").Add();
})
```

**If HeaderText is not specified:** The column renders without header text, showing only icons and counts if enabled.

## Header Template

Customize column headers with HTML, CSS, icons, or dynamic content using the `Template` property.

**Template Variables Available:**
- `keyField`: The column's key field value
- `headerText`: The column's header text
- `minCount`: Minimum card count (if set)
- `maxCount`: Maximum card count (if set)
- `allowToggle`: Whether toggle is enabled
- `isExpanded`: Current expansion state
- `showItemCount`: Whether to show item count
- `count`: Current card count in column

**Example:**

```razor
@Html.EJS().Kanban("kanban")
    .KeyField("Status")
    .DataSource((IEnumerable<object>)ViewBag.data)
    .Columns(col =>
    {
        col.HeaderText("To Do").KeyField("Open").Template("#headerTemplate").Add();
        col.HeaderText("In Progress").KeyField("InProgress").Template("#headerTemplate").Add();
        col.HeaderText("In Review").KeyField("Review").Template("#headerTemplate").Add();
        col.HeaderText("Done").KeyField("Close").Template("#headerTemplate").Add();
    })
    .CardSettings(card =>
    {
        card.ContentField("Summary").HeaderField("Id");
    })
    .Render()

<script id="headerTemplate" type="text/x-jsrender">
    <div class="header-template-wrap">
        <div class="header-icon e-icons ${keyField}"></div>
        <div class="header-text">${headerText}</div>
    </div>
</script>

<style>
    .e-kanban .header-template-wrap {
        display: inline-flex;
        font-size: 15px;
        font-weight: 400;
    }
    
    .e-kanban .header-template-wrap .header-icon {
        margin-right: 10px;
    }
    
    .e-kanban .Open::before {
        content: '\e700';
        color: #0251cc;
    }
    
    .e-kanban .InProgress::before {
        content: '\e703';
        color: #ea9713;
    }
    
    .e-kanban .Review::before {
        content: '\e701';
        color: #8e4399;
    }
    
    .e-kanban .Close::before {
        content: '\e702';
        color: #63ba3c;
    }
</style>
```

**Use Cases:**
- Adding status icons or emojis
- Displaying custom metrics or KPIs
- Color-coding columns
- Including progress bars or charts

## Toggle Columns

Enable users to expand or collapse columns to save screen space and focus on active work.

**Property:** `AllowToggle` (boolean)

**Example:**

```razor
@Html.EJS().Kanban("kanban")
    .KeyField("Status")
    .DataSource((IEnumerable<object>)ViewBag.data)
    .Columns(col =>
    {
        col.HeaderText("To Do").KeyField("Open").AllowToggle(true).Add();
        col.HeaderText("In Progress").KeyField("InProgress").AllowToggle(true).Add();
        col.HeaderText("Testing").KeyField("Testing").AllowToggle(true).Add();
        col.HeaderText("Done").KeyField("Close").AllowToggle(true).Add();
    })
    .CardSettings(card =>
    {
        card.ContentField("Summary").HeaderField("Id");
    })
    .Render()
```

**Behavior:**
- A toggle icon (expand/collapse) appears in the column header
- Clicking the icon collapses the column to a narrow width (default: 50px)
- Clicking again expands the column to its original width
- Collapsed columns still display header text vertically

**Default Collapsed Width:** 50 pixels (can be customized via CSS)

## Initially Collapsed Columns

Render columns in a collapsed state when the Kanban loads using the `IsExpanded` property.

**Requirements:**
- `AllowToggle` must be set to `true` for the column
- `IsExpanded` set to `false`

**Example:**

```razor
@Html.EJS().Kanban("kanban")
    .KeyField("Status")
    .DataSource((IEnumerable<object>)ViewBag.data)
    .Columns(col =>
    {
        col.HeaderText("To Do")
           .KeyField("Open")
           .AllowToggle(true)
           .IsExpanded(false)  // Collapsed on load
           .Add();
        col.HeaderText("In Progress")
           .KeyField("InProgress")
           .AllowToggle(true)
           .Add();
        col.HeaderText("Testing")
           .KeyField("Testing")
           .AllowToggle(true)
           .IsExpanded(false)  // Collapsed on load
           .Add();
        col.HeaderText("Done")
           .KeyField("Close")
           .AllowToggle(true)
           .Add();
    })
    .CardSettings(card =>
    {
        card.ContentField("Summary").HeaderField("Id");
    })
    .Render()
```

**Use Cases:**
- Hiding completed work ("Done" column)
- Focusing on active columns during sprint planning
- Reducing visual clutter on large boards

## Column Drag and Drop

Enable column reordering through drag-and-drop to customize the workflow sequence dynamically.

**Property:** `AllowColumnDragAndDrop` (boolean) on the Kanban component

**Example:**

```razor
@Html.EJS().Kanban("kanban")
    .KeyField("Status")
    .AllowColumnDragAndDrop(true)  // Enable column reordering
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
```

**Behavior:**
- Users can drag column headers to reorder them
- A highlighted drop zone indicates valid drop locations
- Column order is preserved during the session

**Events:**
- `ColumnDragStart`: Fired when column drag begins
- `ColumnDrag`: Fired during column dragging
- `ColumnDrop`: Fired when column is dropped

**Use Cases:**
- Customizing workflow order per user preferences
- Adapting to different project methodologies
- Testing different workflow sequences

## Stacked Headers

Group multiple columns under a common parent header to organize complex workflows.

**Property:** `StackedHeaders` on the Kanban component

**Example:**

```razor
@Html.EJS().Kanban("kanban")
    .KeyField("Status")
    .DataSource((IEnumerable<object>)ViewBag.data)
    .Columns(col =>
    {
        col.HeaderText("Open").KeyField("Open").Add();
        col.HeaderText("In Progress").KeyField("InProgress").Add();
        col.HeaderText("In Review").KeyField("Review").Add();
        col.HeaderText("Completed").KeyField("Close").Add();
    })
    .CardSettings(card =>
    {
        card.ContentField("Summary").HeaderField("Id");
    })
    .StackedHeaders(stackedHeaders =>
    {
        stackedHeaders.Text("To Do").KeyFields("Open").Add();
        stackedHeaders.Text("Development Phase").KeyFields("InProgress,Review").Add();
        stackedHeaders.Text("Done").KeyFields("Close").Add();
    })
    .Render()
```

**StackedHeaders Properties:**
- `Text`: The stacked header title
- `KeyFields`: Comma-separated list of column keys to group

**Result:** "Development Phase" appears as a header spanning both "In Progress" and "In Review" columns.

**Use Cases:**
- Grouping related workflow stages
- Organizing large boards with many columns
- Visualizing process phases (Planning, Execution, Review, Closure)

## Controlling Drag and Drop Per Column

Fine-tune drag-and-drop behavior by enabling/disabling drag or drop for specific columns.

**Properties:**
- `AllowDrag`: Whether cards can be dragged from this column
- `AllowDrop`: Whether cards can be dropped into this column

**Example:**

```razor
@Html.EJS().Kanban("kanban")
    .KeyField("Status")
    .DataSource((IEnumerable<object>)ViewBag.data)
    .Columns(col =>
    {
        col.HeaderText("To Do")
           .KeyField("Open")
           .AllowDrag(true)
           .AllowDrop(true)
           .Add();
        col.HeaderText("In Progress")
           .KeyField("InProgress")
           .AllowDrag(true)
           .AllowDrop(true)
           .Add();
        col.HeaderText("Testing")
           .KeyField("Testing")
           .AllowDrag(true)
           .AllowDrop(true)
           .Add();
        col.HeaderText("Done")
           .KeyField("Close")
           .AllowDrag(false)  // Cannot drag from Done
           .AllowDrop(true)   // Can drop into Done
           .Add();
    })
    .CardSettings(card =>
    {
        card.ContentField("Summary").HeaderField("Id");
    })
    .Render()
```

**Use Cases:**
- Preventing cards from moving out of "Done" column
- Creating one-way workflow transitions
- Implementing approval workflows

## Workflow Transitions

Define allowed transitions between columns using the `TransitionColumns` property.

**Example:**

```razor
@Html.EJS().Kanban("kanban")
    .KeyField("Status")
    .DataSource((IEnumerable<object>)ViewBag.data)
    .Columns(col =>
    {
        col.HeaderText("To Do")
           .KeyField("Open")
           .TransitionColumns(new string[] { "InProgress" })  // Can only move to In Progress
           .Add();
        col.HeaderText("In Progress")
           .KeyField("InProgress")
           .TransitionColumns(new string[] { "Open", "Testing" })  // Can move to Open or Testing
           .Add();
        col.HeaderText("Testing")
           .KeyField("Testing")
           .TransitionColumns(new string[] { "InProgress", "Close" })  // Can move to In Progress or Done
           .Add();
        col.HeaderText("Done")
           .KeyField("Close")
           .AllowDrag(false)  // Cannot drag from Done
           .Add();
    })
    .CardSettings(card =>
    {
        card.ContentField("Summary").HeaderField("Id");
    })
    .Render()
```

**How it works:**
- Only specified columns are highlighted as valid drop targets during drag operations
- Attempting to drop in a non-allowed column cancels the drag

**Use Cases:**
- Enforcing workflow rules (e.g., tasks must be tested before closing)
- Preventing backward transitions
- Implementing stage gates

## Column Properties Summary

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `KeyField` | string | null | Column identifier (matches data field value) |
| `HeaderText` | string | null | Text displayed in column header |
| `AllowDrag` | bool | true | Allow dragging cards from this column |
| `AllowDrop` | bool | true | Allow dropping cards into this column |
| `AllowToggle` | bool | false | Enable expand/collapse icon |
| `IsExpanded` | bool | true | Initial expansion state (requires AllowToggle) |
| `MinCount` | int | null | Minimum cards for validation |
| `MaxCount` | int | null | Maximum cards for validation |
| `ShowItemCount` | bool | true | Display card count in header |
| `ShowAddButton` | bool | false | Display add button in column |
| `Template` | string | null | Custom header template |
| `TransitionColumns` | string[] | null | Allowed target columns for drag-and-drop |

## Best Practices

1. **Use meaningful KeyField values**: Match your workflow stages exactly
2. **Keep column count manageable**: 3-7 columns is optimal for visibility
3. **Enable toggle for large boards**: Helps focus on active work
4. **Use stacked headers**: Organize boards with 6+ columns
5. **Define transitions**: Prevent invalid workflow movements
6. **Show item counts**: Helps identify bottlenecks
7. **Consider validation limits**: Use MinCount/MaxCount for WIP limits
