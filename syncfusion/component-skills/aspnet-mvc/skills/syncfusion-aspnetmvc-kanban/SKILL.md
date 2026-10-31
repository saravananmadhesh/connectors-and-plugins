---
name: syncfusion-aspnetmvc-kanban
description: "Implement and configure Syncfusion ASP.NET MVC Kanban Board component for task management and workflow visualization. Use this when working with kanban boards, task tracking systems, agile project management, or workflow visualization. This skill covers card management, drag-and-drop functionality, swimlane grouping, and column-based layouts."
metadata:
  author: "Syncfusion Inc"
  version: "34.1.29"
  category: "Data Visualization"
  platform: "ASP.NET MVC"
---

# Implementing Syncfusion ASP.NET MVC Kanban Board

The Syncfusion ASP.NET MVC Kanban Board is a powerful component for visualizing workflows and managing tasks through an intuitive card-based interface. It supports drag-and-drop operations, swimlane grouping, customizable columns, remote data binding, and extensive customization options.

## When to Use This Skill

Use this skill when users need to:

- **Task Management Systems**: Create visual task boards with drag-and-drop functionality for moving tasks between workflow stages
- **Agile Project Management**: Implement sprint boards, backlog management, and work-in-progress tracking with swimlanes for team members
- **Workflow Visualization**: Display business processes with columns representing different stages (To Do, In Progress, Testing, Done)
- **Card-Based Interfaces**: Build applications requiring card layouts with grouping, filtering, and sorting capabilities
- **Real-Time Collaboration**: Develop systems where multiple users track and update task statuses
- **Data-Driven Boards**: Connect to remote data sources (OData, Web API) with CRUD operations
- **Customizable Dashboards**: Create personalized views with column toggling, custom templates, and responsive layouts

## Component Overview

The Kanban Board organizes tasks as **cards** within **columns** that represent workflow stages. Cards can be grouped into **swimlanes** (horizontal rows) for categorization by assignee, priority, or custom criteria. The component supports:

- **Drag-and-Drop**: Move cards between columns, swimlanes, or external components
- **Data Binding**: Local arrays, DataManager, or remote services (OData, Web API)
- **Customization**: Card templates, column headers, swimlane rows, dialogs
- **Interactions**: Click events, keyboard navigation, tooltips, dialogs for editing
- **Advanced Features**: Virtual scrolling, persistence, localization, accessibility

## Documentation and Navigation Guide

### Getting Started
📄 **Read:** [references/getting-started.md](references/getting-started.md)

Start here for initial setup and basic implementation:
- Prerequisites and system requirements for ASP.NET MVC
- Creating ASP.NET MVC application with Visual Studio
- Installing Syncfusion.EJ2.MVC5 NuGet package
- Adding namespace, stylesheet, and script references
- Basic Kanban implementation with columns
- Populating cards from data source
- Enabling swimlane for grouping

### Core Features

#### Columns Configuration
📄 **Read:** [references/columns.md](references/columns.md)

Essential for defining workflow stages:
- Single-key mapping with KeyField (mandatory)
- Multi-key mapping (multiple keys per column)
- Header text and custom header templates
- Toggle columns (expand/collapse functionality)
- Initially collapsed columns configuration
- Column drag-and-drop reordering
- Stacked headers for grouping columns
- Allow/disallow drag or drop per column
- Transition columns for workflow control

#### Cards Management
📄 **Read:** [references/cards.md](references/cards.md)

Configure card appearance and behavior:
- Card structure (header and content fields)
- HeaderField and ContentField mapping from data
- Card drag-and-drop within and across columns
- Show/hide card headers
- Custom card templates with HTML/CSS
- Card selection types (None, Single, Multiple)
- Multiple selection with Ctrl+Click and Shift+Click

#### Data Binding
📄 **Read:** [references/data-binding.md](references/data-binding.md)

Connect to data sources:
- Local data binding with List or DataManager
- Remote data binding to service endpoints
- OData and OData v4 services integration
- Web API adaptor configuration
- URL adaptor for CRUD operations (Insert, Update, Delete)
- Custom adaptor by extending built-in adaptors
- Sending additional parameters to server
- HTTP error handling with ActionFailure event
- Loading data via AJAX requests

### Grouping and Organization

#### Swimlane
📄 **Read:** [references/swimlane.md](references/swimlane.md)

Horizontal grouping of cards:
- Rendering swimlane rows with KeyField
- Custom row text with TextField property
- Swimlane row templates with HTML
- Sorting swimlane rows (Ascending/Descending)
- Drag-and-drop across swimlanes
- Show empty rows for missing groups
- Display item count per swimlane
- Frozen swimlane rows on scroll

### Interactions

#### Drag and Drop
📄 **Read:** [references/drag-and-drop.md](references/drag-and-drop.md)

Advanced drag-and-drop scenarios:
- Internal column drag-and-drop behavior
- Enable/disable drag-and-drop globally or per column
- AllowDrag and AllowDrop column properties
- TransitionColumns for allowed workflow transitions
- Swimlane drag-and-drop configuration
- External drag-and-drop with ExternalDropId
- Kanban to Kanban card transfer
- Integration with TreeView component
- Integration with Schedule component
- DragStop event for custom logic

#### Dialog Operations
📄 **Read:** [references/dialog.md](references/dialog.md)

Card editing interface:
- Card editing dialog configuration
- DialogOpen and DialogClose events
- Form fields setup and validation
- Add, Edit, Delete operations through dialog
- Custom dialog templates
- Programmatically opening/closing dialogs with methods

### Data Operations

#### Sorting, Filtering, and Validation
📄 **Read:** [references/sorting-filtering-validation.md](references/sorting-filtering-validation.md)

Organize and validate card data:
- Sort settings configuration (Field, Direction, SortBy)
- SortBy options (Index, DataSourceOrder, Custom)
- Filtering cards by criteria
- Search functionality implementation
- Validation rules for card fields
- Required field validation
- Custom validation logic
- Constraint types (Column/Swimlane)

### Customization and Styling

#### Visual Customization
📄 **Read:** [references/customization-styling.md](references/customization-styling.md)

Style and layout options:
- Kanban dimensions (Height, Width properties)
- Card height configuration
- CSS class customization with CssClass property
- Theme integration (CDN, NPM, Custom Resource Generator)
- Tooltip configuration and templates
- Priority visualization
- Responsive mode for mobile devices
- Custom CSS for cards, columns, swimlanes

### Localization and Persistence

#### Internationalization and State Management
📄 **Read:** [references/localization-persistence.md](references/localization-persistence.md)

Adapt for different locales and save state:
- Localization setup and configuration
- Locale property for culture-specific rendering
- Custom text localization for UI elements
- EnablePersistence for state persistence
- LocalStorage integration
- Saving and restoring column state, data source

### Advanced Features

#### Performance and Accessibility
📄 **Read:** [references/advanced-features.md](references/advanced-features.md)

Optimize for large datasets and accessibility:
- Virtual scrolling with EnableVirtualization
- Performance optimization techniques
- WCAG compliance features
- Keyboard navigation with AllowKeyboard
- ARIA attributes for screen readers
- Focus management

### API Reference

#### Events
📄 **Read:** [references/events.md](references/events.md)

Handle Kanban lifecycle and user interactions:
- Action events: ActionBegin, ActionComplete, ActionFailure
- Card events: CardClick, CardDoubleClick, CardRendered
- Column events: ColumnDrag, ColumnDragStart, ColumnDrop
- Data events: DataBinding, DataBound, DataSourceChanged, DataStateChange
- Dialog events: DialogOpen, DialogClose
- Drag events: Drag, DragStart, DragStop
- Lifecycle events: Created
- Query events: QueryCellInfo

#### Methods
📄 **Read:** [references/methods.md](references/methods.md)

Public methods for programmatic control:
- Card operations: AddCard, UpdateCard, DeleteCard
- Column operations: AddColumn, DeleteColumn, HideColumn, ShowColumn
- Dialog operations: OpenDialog, CloseDialog
- Data retrieval: GetCardDetails, GetColumnData, GetSwimlaneData
- UI operations: Refresh, RefreshHeader, RefreshUI
- Selection: GetSelectedCards
- Spinner display: ShowSpinner, HideSpinner
- Lifecycle: DataBind, Destroy
- Events: AddEventListener, RemoveEventListener

#### Properties
📄 **Read:** [references/properties.md](references/properties.md)

Complete properties reference:
- Core properties: KeyField, DataSource, Columns
- Card settings: CardSettings with all sub-properties
- Drag-and-drop: AllowDragAndDrop, AllowColumnDragAndDrop
- Swimlane: SwimlaneSettings with complete configuration
- Dialog: DialogSettings for form customization
- Sorting: SortSettings properties
- Dimensions: Height, Width, CardHeight
- Features: EnableTooltip, EnableVirtualization, EnablePersistence
- Localization: Locale, EnableRtl
- Styling: CssClass, TooltipTemplate
- Other: ConstraintType, ExternalDropId, Query

### How-To Guides

#### Practical Examples
📄 **Read:** [references/how-to-guides.md](references/how-to-guides.md)

Step-by-step implementation guides:
- Dynamically change columns at runtime
- Filter cards programmatically
- Handle header double-click events
- Implement search functionality
- Custom card rendering techniques
- Dynamic data refresh strategies

## Quick Start Example

Here's a minimal Kanban implementation with data binding:

```csharp
// Controller action
public ActionResult Index()
{
    ViewBag.data = GetKanbanData();
    return View();
}

private List<KanbanDataModel> GetKanbanData()
{
    return new List<KanbanDataModel>
    {
        new KanbanDataModel { Id = 1, Status = "Open", Summary = "Task 1", Assignee = "Nancy" },
        new KanbanDataModel { Id = 2, Status = "InProgress", Summary = "Task 2", Assignee = "Andrew" },
        new KanbanDataModel { Id = 3, Status = "Testing", Summary = "Task 3", Assignee = "Janet" },
        new KanbanDataModel { Id = 4, Status = "Close", Summary = "Task 4", Assignee = "Nancy" }
    };
}

public class KanbanDataModel
{
    public int Id { get; set; }
    public string Status { get; set; }
    public string Summary { get; set; }
    public string Assignee { get; set; }
}
```

```razor
@* View (Index.cshtml) *@
@(Html.EJS().Kanban("kanban")
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
)
```

## Common Patterns

### Pattern 1: Kanban with Swimlane Grouping

Group cards by assignee or any field:

```razor
@(Html.EJS().Kanban("kanban")
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
        swim.KeyField("Assignee").TextField("AssigneeName");
    })
    .Render()
)
```

### Pattern 2: Remote Data with OData Service

```razor
@(Html.EJS().Kanban("kanban")
    .KeyField("Status")
    .AllowDragAndDrop(false)
    .DataSource(dataMgr =>
    {
        dataMgr.Url("https://services.syncfusion.com/aspnet/production/api/Kanban")
               .CrossDomain(true)
               .Adaptor("ODataAdaptor");
    })
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
    .DialogOpen("onDialogOpen")
    .Render()
)

<script>
    function onDialogOpen(args) {
        args.cancel = true; // Prevent editing for remote read-only data
    }
</script>
```

### Pattern 3: Custom Card Template

```razor
<script id="cardTemplate" type="text/x-jsrender">
    <div class='card-template'>
        <div class='card-header'>${Id} - ${Status}</div>
        <div class='card-content'>
            <div>${Summary}</div>
            <div class='card-footer'>Assigned to: ${Assignee}</div>
        </div>
    </div>
</script>

@(Html.EJS().Kanban("kanban")
    .KeyField("Status")
    .DataSource((IEnumerable<object>)ViewBag.data)
    .Columns(col =>
    {
        col.HeaderText("To Do").KeyField("Open").Add();
        col.HeaderText("Done").KeyField("Close").Add();
    })
    .CardSettings(card =>
    {
        card.HeaderField("Id").Template("#cardTemplate");
    })
    .Render()
)
```

### Pattern 4: Programmatic Card Management

```razor
@Html.EJS().Button("addBtn").Content("Add Card").Render()
@Html.EJS().Button("updateBtn").Content("Update Card").Render()
@Html.EJS().Button("deleteBtn").Content("Delete Card").Render()

@(Html.EJS().Kanban("kanban")
    .KeyField("Status")
    .DataSource((IEnumerable<object>)ViewBag.data)
    .Columns(col =>
    {
        col.HeaderText("To Do").KeyField("Open").Add();
        col.HeaderText("Done").KeyField("Close").Add();
    })
    .CardSettings(card =>
    {
        card.ContentField("Summary").HeaderField("Id");
    })
    .Render()
)

<script>
    document.getElementById('addBtn').addEventListener('click', function() {
        var kanbanObj = document.getElementById('kanban').ej2_instances[0];
        kanbanObj.addCard({ Id: 5, Status: 'Open', Summary: 'New Task', Assignee: 'John' });
    });
    
    document.getElementById('updateBtn').addEventListener('click', function() {
        var kanbanObj = document.getElementById('kanban').ej2_instances[0];
        kanbanObj.updateCard({ Id: 5, Status: 'Close', Summary: 'Updated Task', Assignee: 'John' });
    });
    
    document.getElementById('deleteBtn').addEventListener('click', function() {
        var kanbanObj = document.getElementById('kanban').ej2_instances[0];
        kanbanObj.deleteCard(5);
    });
</script>
```

### Pattern 5: Stacked Headers for Column Grouping

Group multiple columns under common parent headers:

```razor
@(Html.EJS().Kanban("kanban")
    .KeyField("Status")
    .DataSource((IEnumerable<object>)ViewBag.data)
    .Columns(col =>
    {
        col.HeaderText("To Do").KeyField("Open").Add();
        col.HeaderText("In Progress").KeyField("InProgress").Add();
        col.HeaderText("Testing").KeyField("Testing").Add();
        col.HeaderText("Done").KeyField("Close").Add();
    })
    .StackedHeaders(stack =>
    {
        stack.Text("Planning").KeyFields("Open").Add();
        stack.Text("Development").KeyFields("InProgress,Testing").Add();
        stack.Text("Completed").KeyFields("Close").Add();
    })
    .CardSettings(card =>
    {
        card.ContentField("Summary").HeaderField("Id");
    })
    .Render()
)
```

**Note:** `KeyFields` accepts a comma-separated string of column keys (e.g., `"Open,InProgress"`), not an array.

## Key Properties

**Essential Configuration:**

- **KeyField** (string, required): Maps to the data field that determines column placement. Example: `"Status"`
- **DataSource** (object, required): Binds data (local array, DataManager, or remote service)
- **Columns** (List<KanbanColumn>, required): Defines workflow columns with KeyField, HeaderText, and options
- **CardSettings.HeaderField** (string, required): Unique identifier field for cards (e.g., "Id")
- **CardSettings.ContentField** (string): Field to display as card content

**Common Properties:**

- **AllowDragAndDrop** (bool, default: true): Enable/disable card drag-and-drop
- **SwimlaneSettings.KeyField** (string): Group cards into horizontal swimlanes
- **CardSettings.Template** (string): Custom HTML template for card rendering
- **DialogSettings.Fields**: Configure dialog form fields for Add/Edit operations
- **SortSettings**: Control card ordering (Index, DataSourceOrder, Custom)
- **Height** / **Width** (string): Set dimensions ("100%", "500px", "auto")
- **EnableTooltip** (bool): Show tooltips on card hover
- **EnableVirtualization** (bool): Optimize performance for large datasets
- **EnablePersistence** (bool): Save state across page reloads

**Advanced Properties:**

- **ExternalDropId** (string[]): Enable drag-and-drop between Kanban instances or external components
- **ConstraintType**: Validation type (Column or Swimlane)
- **ShowEmptyColumn** (bool): Display columns with no cards
- **AllowColumnDragAndDrop** (bool): Enable column reordering
- **StackedHeaders**: Group multiple columns under common headers

## Best Practices

1. **Always define KeyField**: It's mandatory for rendering columns and routing cards
2. **Use unique HeaderField**: Prevents card duplication and enables proper CRUD operations
3. **Start with local data**: Test functionality before implementing remote data binding
4. **Leverage events**: Use ActionBegin/ActionComplete for custom validation or logging
5. **Optimize with virtualization**: Enable for datasets with 100+ cards
6. **Implement error handling**: Use ActionFailure event for remote data error management
7. **Test responsiveness**: Verify mobile experience with responsive mode
8. **Consider accessibility**: Enable keyboard navigation and test with screen readers

## Related Skills

- For general Syncfusion ASP.NET MVC setup, see the main library skill
- For data visualization alternatives, explore Chart, TreeMap, or Gantt components
- For task scheduling with timeline views, see the Scheduler component
