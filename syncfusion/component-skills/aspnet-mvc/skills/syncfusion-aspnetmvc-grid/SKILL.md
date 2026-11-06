---
name: syncfusion-aspnetmvc-grid
description: Implements Syncfusion EJ2 ASP.NET MVC Grid component for feature-rich data tables and grids. Use this when working with data display, sorting, filtering, grouping, aggregates, editing, or exporting. This skill covers grid configuration, CRUD operations, virtual scrolling or infinite scrolling,  hierarchy grids, state persistence, and advanced data management features for data-intensive applications.
metadata:
  author: "Syncfusion Inc"
  version: "34.1.29"
  category: "Grids"
---

# Syncfusion ASP.NET MVC Grid

The Syncfusion EJ2 ASP.NET MVC Grid is a powerful data presentation component that provides comprehensive data management capabilities. It enables developers to create interactive, feature-rich data grids with built-in support for editing, filtering, sorting, grouping, paging, exporting, and much more.

## When to Use This Skill

Use this skill when:
- Setting up a Grid control in your ASP.NET MVC application
- Configuring data binding (local or remote sources)
- Implementing user interactions (selection, editing, drag-and-drop)
- Creating responsive and adaptive grid layouts for mobile devices
- Adding advanced features (grouping, aggregates, hierarchical grids)
- Exporting grid data to Excel or PDF
- Styling and customizing grid appearance
- Managing grid state and persistence

## Grid Overview & Key Features

**Core Capabilities:**
- Multi-format data binding (local arrays, remote data via DataManager)
- Inline, dialog, batch, and template-based editing
- Advanced filtering with Excel-like filters
- Single and multi-column sorting
- Data grouping with aggregates and summaries
- Hierarchical grid support for parent-child relationships
- Virtual and infinite scrolling for large datasets
- Row and column selection with checkboxes
- Export to Excel and PDF formats
- Adaptive UI for mobile and desktop responsiveness
- State management and persistence
- Rich toolbar and context menus
- Clipboard operations (copy/paste)

## Documentation Navigation

### Getting Started & Basics
📄 **Read:** [references/getting-started.md](references/getting-started.md)
- Installation and setup prerequisites
- NuGet package installation
- Basic grid initialization with HTML helper
- Adding stylesheets and scripts
- Binding data to the grid

📄 **Read:** [references/adaptive.md](references/adaptive.md)
- Adaptive dialogs for small screens
- Vertical row rendering mode
- Responsive behavior
- Mobile-optimized UI

### Data Management & Binding
📄 **Read:** [references/data-binding.md](references/data-binding.md)
- Local data binding with IEnumerable
- Remote data binding with DataManager
- Async data loading
- DataSource property configuration

📄 **Read:** [references/paging.md](references/paging.md)
- Pagination setup and configuration
- Page size configuration
- Server-side paging
- Pager customization

📄 **Read:** [references/hierarchy-grid.md](references/hierarchy-grid.md)
- Parent-child grid relationships
- Child grid initialization
- Hierarchy row expansion
- Related data display

📄 **Read:** [references/global-local.md](references/global-local.md)
- Global and local property settings
- Property precedence
- Configuration scopes

📄 **Read:** [references/state-management.md](references/state-management.md)
- Save and restore grid state
- State persistence
- Column state management
- Custom state handling

### Display & Layout
📄 **Read:** [references/columns.md](references/columns.md)
- Column definition and configuration
- Column templates and rendering
- Column headers and customization
- Column reordering and resizing
- Column spanning
- Foreign key columns
- Frozen columns

📄 **Read:** [references/row.md](references/row.md)
- Row templates and customization
- Detail templates for expanded rows
- Row spanning
- Row drag and drop
- Row pinning
- Row styling and formatting

📄 **Read:** [references/cell.md](references/cell.md)
- Cell display and formatting
- HTML content in cells
- Text wrapping (AllowTextWrap)
- Cell styling and customization
- Cell events (QueryCellInfo)
- DisableHtmlEncode property

📄 **Read:** [references/frozen.md](references/frozen.md)
- Freeze columns at grid edges
- Freeze rows
- Frozen column behavior
- Frozen row handling

📄 **Read:** [references/scrolling.md](references/scrolling.md)
- Virtual scrolling for performance
- Infinite scrolling with lazy loading
- Horizontal and vertical scrolling
- Scroll indicators

### User Interactions
📄 **Read:** [references/selection.md](references/selection.md)
- Row selection modes
- Column selection
- Cell selection
- Checkbox selection
- Multi-select behavior
- Selection events

📄 **Read:** [references/editing.md](references/editing.md)
- Inline editing mode
- Dialog editing
- Batch editing
- Template editing
- Edit types and configurations
- Validation during editing
- Data persistence in server
- Command column editing

📄 **Read:** [references/clipboard.md](references/clipboard.md)
- Keyboard shortcuts (Ctrl+C, Ctrl+Shift+H)
- Copy selected rows and cells
- AutoFill feature with drag-and-drop
- Paste functionality
- External button-triggered copy

📄 **Read:** [references/context-menu.md](references/context-menu.md)
- Right-click context menu
- Custom menu items
- Menu item configuration
- Context menu events

### Search, Sort & Filter
📄 **Read:** [references/searching.md](references/searching.md)
- Quick search functionality
- Search bar configuration
- Search across columns
- Global search

📄 **Read:** [references/sorting.md](references/sorting.md)
- Single-column sorting
- Multi-column sorting
- Custom sort comparers
- Sort indicators
- Programmatic sorting

📄 **Read:** [references/filtering.md](references/filtering.md)
- Filter bar
- Filter menu
- Excel-like filter UI
- Filter types and operators
- Filtering configurations
- Custom filters

### Data Features
📄 **Read:** [references/aggregates.md](references/aggregates.md)
- Footer aggregates (Sum, Average, Count, Min, Max)
- Group and caption aggregates
- Custom aggregate functions
- Reactive aggregate calculations
- Aggregate display formatting

📄 **Read:** [references/grouping.md](references/grouping.md)
- Group by single or multiple columns
- Caption templates
- Group summary rows
- Lazy load grouping
- Group expand/collapse
- Grouping configurations

### Export & Output
📄 **Read:** [references/excel-export.md](references/excel-export.md)
- Export grid data to Excel
- Excel export options
- Export with templates
- Server-side Excel exporting
- Custom export formatting

📄 **Read:** [references/pdf-export.md](references/pdf-export.md)
- Export grid to PDF format
- PDF export options
- Headers and footers in PDF
- Export with custom templates
- Server-side PDF generation

📄 **Read:** [references/print.md](references/print.md)
- Print grid data
- Print templates
- Print preview
- Print options configuration
- Page setup

### UI & Customization
📄 **Read:** [references/toolbar.md](references/toolbar.md)
- Toolbar configuration
- Built-in toolbar items
- Custom toolbar items
- Toolbar templates
- Item customization and events

📄 **Read:** [references/style-and-appearance.md](references/style-and-appearance.md)
- Theme selection and application
- CSS customization
- Custom CSS classes
- Styling classes and properties
- Appearance configuration

## Quick Start Example

```csharp
// View (CSHTML)
@{
    var data = new List<OrderData>
    {
        new OrderData { OrderID = 10248, CustomerName = "Acme Corp", TotalAmount = 32.38m },
        new OrderData { OrderID = 10249, CustomerName = "Wonderland", TotalAmount = 11.61m }
    };
}

@Html.EJS().Grid("Grid").DataSource(data)
    .Columns(col =>
    {
        col.Field("OrderID").HeaderText("Order ID").IsPrimaryKey(true).Width("120").Add();
        col.Field("CustomerName").HeaderText("Customer Name").Width("150").Add();
        col.Field("TotalAmount").HeaderText("Total Amount").Width("150").Format("C2").Add();
    })
    .AllowPaging()
    .PageSettings(page => page.PageSize(12))
    .Render()

// Model
public class OrderData
{
    public int OrderID { get; set; }
    public string CustomerName { get; set; }
    public decimal TotalAmount { get; set; }
}
```

## Common Patterns

### Pattern 1: Remote Data Binding with Paging and Sorting
```csharp
@Html.EJS().Grid("Grid")
    .DataSource(ds => ds.Url("url").Adaptor("UrlAdaptor"))
    .Columns(col =>
    {
        col.Field("OrderID").HeaderText("Order ID").Width("100").Add();
        col.Field("CustomerName").HeaderText("Customer").Width("150").Add();
    })
    .AllowPaging()
    .AllowSorting()
    .PageSettings(page => page.PageSize(15))
    .Render()
```

### Pattern 2: Inline Editing with Validation
```csharp
@Html.EJS().Grid("Grid").DataSource(data)
    .Columns(col =>
    {
        col.Field("OrderID").HeaderText("Order ID").IsPrimaryKey(true).Width("100").Add();
        col.Field("CustomerName").HeaderText("Customer").ValidationRules(new { required = true, minLength = 5 }).Width("150").Add();
        col.Field("TotalAmount").HeaderText("Amount").Type("number").ValidationRules(new { required = true, min = 0 }).Width("150").Add();
    })
    .EditSettings(edit => edit.AllowEditing().AllowDeleting())
    .ActionFailure("onActionFailure")
    .Render()
```

### Pattern 3: Grouping with Footer Aggregates
```csharp
@Html.EJS().Grid("Grid").DataSource(data)
    .Columns(col =>
    {
        col.Field("CustomerName").HeaderText("Customer").Width("150").Add();
        col.Field("TotalAmount").HeaderText("Amount").Format("C2").Width("150").Add();
    })
    .AllowGrouping()
    .GroupSettings(group => { group.Columns(new string[] { "CustomerName" }); })
    .Aggregates(gridAggregation => { gridAggregation.Columns(new List<Syncfusion.EJ2.Grids.GridAggregateColumn>() {new Syncfusion.EJ2.Grids.GridAggregateColumn() { Field = "TotalAmount", Type = "Sum", FooterTemplate = "Sum: ${Sum}" }}).Add();})
    .Render()
```

### Pattern 4: Excel-like Filtering
```csharp
@Html.EJS().Grid("Grid").DataSource(data)
    .AllowFiltering()
    .FilterSettings(filter => filter.Type(FilterType.Excel))
    .Columns(col =>
    {
        col.Field("OrderID").HeaderText("Order ID").Width("100").Add();
        col.Field("CustomerName").HeaderText("Customer").Width("150").Add();
    })
    .Render()
```

### Pattern 5: Export to Excel and PDF
```csharp
@Html.EJS().Grid("Grid").DataSource(data)
    .Columns(col =>
    {
        col.Field("OrderID").HeaderText("Order ID").Width("100").Add();
        col.Field("CustomerName").HeaderText("Customer").Width("150").Add();
    })
    .Toolbar(new List<string> { "ExcelExport", "PdfExport" })
    .AllowExcelExport()
    .AllowPdfExport()
    .ToolbarClick("toolbarClick")
    .Render()
```

```javascript
function toolbarClick(args) {
    var grid = document.getElementById('Grid').ej2_instances[0];
    if (args.item.id === 'Grid_excelexport') {
        grid.excelExport();
    } else if (args.item.id === 'Grid_pdfexport') {
        grid.pdfExport();
    }
}
```
