---
name: syncfusion-aspnetmvc-gantt-chart
description: Implement Syncfusion ASP.NET MVC Gantt Chart component (EJ2) for project management and task scheduling. Use this when working with Gantt charts, project timelines, task dependencies, or resource allocation in ASP.NET MVC applications using @Html.EJS().Gantt() Razor helpers. Covers data binding, task management, editing, filtering, sorting, export, timeline customization, events, and public methods.
metadata:
  author: "Syncfusion Inc"
  version: "34.1.29"
---

# Syncfusion ASP.NET MVC Gantt Chart

The Syncfusion EJ2 Gantt Chart control for ASP.NET MVC renders a project schedule as a combined tree grid (left) and chart (right) separated by a splitter. Tasks are displayed as taskbars on a timeline. It supports task editing, dependencies, resources, baselines, critical path, filtering, sorting, and Excel/PDF export.

## When to Use This Skill

Use this skill when you need to:
- Set up and render a Gantt Chart in an ASP.NET MVC view using `@Html.EJS().Gantt()`
- Bind local or remote data to the Gantt control from a controller action
- Configure task fields, columns, and the chart timeline
- Enable editing (cell, dialog, taskbar), manage tasks (add/delete/update)
- Define task dependencies (FS, SS, FF, SF) and predecessors
- Assign and display resources on tasks
- Filter, sort, search, or select rows/cells
- Export to Excel, CSV, or PDF
- Customize the timeline, taskbars, labels, tooltips, holidays, event markers and data markers/indicators
- Configure task scheduling modes (Auto/Manual/Custom)
- Configure project and task calendars, working time, holidays, and calendar exceptions
- Enable undo/redo, state persistence, virtual scrolling, or critical path
- Scroll the component, configure row height, or drag-and-drop rows
- Set timezone or localise the UI for different cultures and RTL languages
- Handle events (`ActionBegin`, `ActionComplete`, `CellEdit`) or call public methods programmatically

## Documentation and Navigation Guide

### Getting Started
📄 **Read:** [references/getting-started.md](references/getting-started.md)
- NuGet package installation (`Syncfusion.EJ2.MVC5`)
- Namespace import and CDN stylesheet/script setup
- ScriptManager registration in `_Layout.cshtml`
- First Gantt control (`Index.cshtml` + controller)
- Mapping task fields and defining columns
- Enabling editing, filtering, sorting

### Data Binding
📄 **Read:** [references/data-binding.md](references/data-binding.md)
- Local hierarchical data binding (parent/child objects with `SubTasks`)
- Local flat/self-referential data binding (Id + ParentID mapping)
- Remote data with DataManager (URL Adaptor, OData, Web API)
- Load-on-demand with `HasChildMapping`

### Columns
📄 **Read:** [references/columns.md](references/columns.md)
- Defining columns with Field, HeaderText, Width, Format, TextAlign
- Custom column headers and header templates
- Column templates and value accessors
- **Serial number column** — enable with `EnableSerialNumber(true)` and a `SerialNumber` field; numbers follow the visible row order
- Checkbox column, frozen columns
- Column reordering, resizing, spanning
- Responsive columns, WBS column, column menu

### Managing Tasks (Editing)
📄 **Read:** [references/managing-tasks.md](references/managing-tasks.md)
- `IsPrimaryKey` requirement for CRUD
- Cell editing, dialog editing, taskbar editing
- Adding and deleting tasks
- Indent / outdent tasks
- Splitting and merging tasks
- Customize Dependency, Segments, Resources tabs in the edit/add dialog using `AdditionalParams`
- Customize Notes tab (RTE) in the edit/add dialog using `AdditionalParams` (for example `inlineMode`)
- Server-side CRUD persistence
- Edit validation and error handling

### Taskbar Draw
📄 **Read:** [references/taskbar-draw.md](references/taskbar-draw.md)
- Configure `EditSettings.AllowTaskbarDraw(true)` to schedule unscheduled or partially scheduled rows on the timeline
- Use `AllowUnscheduledTasks(true)` for unscheduled-row workflows
- Review scheduling output, calendar/dependency interactions, and parent/milestone limitations

### Task Dependencies
📄 **Read:** [references/task-dependency.md](references/task-dependency.md)
- SS, SF, FS, FF relationship types
- Mapping `Dependency` field in data source
- **Allowed dependency types** — restrict dependency parsing, creation, and editing through `AllowedDependencyTypes`
- Predecessor offset with duration units
- Dependency editing via mouse drag
- Validation, error handling, parent dependencies

### Resources
📄 **Read:** [references/resources.md](references/resources.md)
- Resource collection and `ResourceFields` mapping
- Assigning resources to tasks (`ResourceInfo`)
- Resource view (`ViewType`)
- Multi-taskbar display
- Resource customization

### Filtering
📄 **Read:** [references/filtering.md](references/filtering.md)
- Menu filtering (`AllowFiltering(true)`) — column-level filter menu
- Excel-like filtering (`FilterSettings.Type = Excel`)
- Filter hierarchy modes (Parent, Child, Both, None)
- Toolbar search / `SearchSettings`
- Filter operators, initial filter state, programmatic filtering

### Sorting
📄 **Read:** [references/sorting.md](references/sorting.md)
- Enabling sorting, multi-column sort (`AllowSorting(true)`)
- Initial sort configuration via `SortSettings`
- Programmatic sort (`sortModule.sortColumn`) / clear sort

### Timeline
📄 **Read:** [references/timeline.md](references/timeline.md)
- Top tier and bottom tier configuration
- Zooming in and out (`ZoomIn`, `ZoomOut`, `ZoomToFit`)
- Custom timeline units and formats
- Timeline template
- Infinite timeline scrolling (`EnableInfiniteTimelineScroll`)

### Task Scheduling
📄 **Read:** [references/task-scheduling.md](references/task-scheduling.md)
- Auto, Manual, Custom scheduling modes (`TaskMode`)
- Duration units (Day, Hour, Minute, Week, Month), including `DaysPerWeek` and `DaysPerMonth` conversions
- Unscheduled tasks
- Task constraints (ALAP, ASAP, FNLT, SNLT, MSO, MFO)

### Calendar Settings
📄 **Read:** [references/calendar-settings.md](references/calendar-settings.md)
- Configure the default project calendar and task-specific calendars
- Map task calendars with `TaskFields.CalendarId` and `CalendarSettings.TaskCalendars`
- Define working time, holidays, and date-specific exceptions
- Understand calendar precedence and its effect on duration, weekends, and dependencies

### Baseline
📄 **Read:** [references/baseline.md](references/baseline.md)
- Baseline fields: `BaselineStartDate`, `BaselineEndDate`, `BaselineDuration`
- Enable baseline with `RenderBaseline(true)`
- Customize baseline color and CSS styling
- Baseline templates for custom rendering
- Multiple baseline rendering using task-specific fields
- Baseline milestones and advanced visualization

### Selection
📄 **Read:** [references/selection.md](references/selection.md)
- Row selection and cell selection
- Single/multiple selection modes (`SelectionSettings`)
- **Hierarchy checkbox mode** — control checkbox propagation with `HierarchyCheckboxMode` (`self`, `hierarchy`, `filteredHierarchy`)
- Toggle selection and hover highlighting
- Programmatic selection (`selectionModule.selectRow`, `selectRows`, `selectCell`)
- Selection events (`RowSelecting`, `RowSelected`, `CellSelecting`, `CellSelected`)

### Scrolling
📄 **Read:** [references/scrolling.md](references/scrolling.md)
- Configure `Height` and `Width` to enable scrollbars
- Responsive sizing with `100%` and parent container height requirements
- Programmatic timeline scroll via `scrollToDate()`
- Set vertical scroll with `setScrollTop()` and `updateChartScrollOffset()`

### Rows
📄 **Read:** [references/rows.md](references/rows.md)
- Configure global `RowHeight` and per-row expand state via `TaskFields.ExpandState`
- Collapse all parent tasks at load with `CollapseAllParentTasks`
- Expand/collapse with toolbar and public methods (`expandAll()`, `collapseAll()`, etc.)
- Customize expand/collapse behavior using `Expanding`, `Collapsing`, `Expanded`, and `Collapsed`
- Customize row appearance with `RowDataBound` and taskbar styling with `QueryTaskbarInfo`
- Styling alternate rows and per-cell customization (`RowDataBound` + `QueryCellInfo`)
- Row spanning via `rowSpan` in `QueryCellInfo`
- Control overflow rendering with `ClipMode`
- Row template (`RowTemplate`)

### Row Drag And Drop
📄 **Read:** [references/row-drag-and-drop.md](references/row-drag-and-drop.md)
- Enable row reordering with `AllowRowDragAndDrop(true)` and `SelectionSettings.Type = Multiple` for multi-drag
- Allow taskbar-based drag with `AllowTaskbarDragAndDrop(true)` and edit mode `Auto`
- Lifecycle events: `RowDragStartHelper`, `RowDragStart`, `RowDrag`, `RowDrop`
- Programmatic reordering via `reorderRows(fromIndexes, toIndex, position)`

### Timezone
📄 **Read:** [references/timezone.md](references/timezone.md)
- Set `Timezone()` (e.g., `"UTC"`, `"America/New_York"`) to normalise displayed dates across clients
- CRUD operations respect configured timezone and convert for server persistence
- Utility methods: `ej.schedule.Timezone().offset()`, `convert()`, and `remove()` for programmatic conversions

### Globalization
📄 **Read:** [references/globalization.md](references/globalization.md)
- Localize UI text via `Locale()` and `ej.base.L10n.load()` translation objects
- Internationalization: load CLDR files to format dates and numbers per culture
- Enable RTL layout with `EnableRtl(true)` for right-to-left languages

### Export (Excel & PDF)
📄 **Read:** [references/export.md](references/export.md)
- Excel export with column and data customization (`AllowExcelExport`, `excelExport()`)
- CSV export (`csvExport()`)
- PDF export with themes and custom columns (`AllowPdfExport`, `pdfExport()`)
- Exporting multiple Gantt charts to a single PDF or Excel file

### Toolbar
📄 **Read:** [references/toolbar.md](references/toolbar.md)
- Built-in toolbar items (Add, Edit, Delete, Search, ExpandAll, CollapseAll, ExcelExport, PdfExport, ZoomIn, ZoomOut, ZoomToFit, UndoRedo)
- Custom toolbar items and click handling
- Enabling/disabling toolbar items programmatically

### Context Menu
📄 **Read:** [references/context-menu.md](references/context-menu.md)
- Enable context menu with `EnableContextMenu(true)`
- Built-in context menu items for CRUD operations
- Custom context menu items and click event handling

### Taskbar
📄 **Read:** [references/taskbar.md](references/taskbar.md)
- Taskbar height, custom templates (`TaskbarTemplate`, `ParentTaskbarTemplate`, `MilestoneTemplate`)
- Progress bar customization and connector line configuration
- Data markers / indicators (per-task symbols with tooltip labels)
- Segment taskbars (split tasks) rendering
- `QueryTaskbarInfo` event for per-task styling

### Labels and Tooltips
📄 **Read:** [references/labels-and-tooltips.md](references/labels-and-tooltips.md)
- Left/right/inside label templates on taskbars (`LabelSettings`)
- Taskbar tooltip customization via `TooltipSettings`
- Connector line and baseline tooltips
- `BeforeTooltipRender` event

### Event Markers
📄 **Read:** [references/event-markers.md](references/event-markers.md)
- Add event markers with `EventMarkers` builder: `Day`, `Label`, `CssClass`
- Multiple event markers in a single Gantt
- Dynamic event markers

### Critical Path
📄 **Read:** [references/critical-path.md](references/critical-path.md)
- Enable critical path highlighting with `EnableCriticalPath(true)`
- Critical path rendering and customization via `QueryTaskbarInfo`
- Critical slack value configuration

### Splitter
📄 **Read:** [references/splitter.md](references/splitter.md)
- Configure grid/chart pane ratio with `SplitterSettings`
- Set splitter position by column index, percentage, or pixel
- Programmatic splitter position update via `setSplitterPosition()`

### Undo and Redo
📄 **Read:** [references/undo-redo.md](references/undo-redo.md)
- Enable undo/redo via toolbar items or `Ctrl+Z` / `Ctrl+Y` with `EnableUndoRedo(true)`
- Configure undo-redo history size (`UndoRedoStepsCount`)
- Supported actions and programmatic `undo()` / `redo()` calls

### State Persistence
📄 **Read:** [references/state-persistence.md](references/state-persistence.md)
- Enable persistence with `EnablePersistence(true)` (saves to `localStorage`)
- Persisted properties: filter, sort, column width, scroll position, zoom level
- Clearing persisted state programmatically

### Immutable Mode
📄 **Read:** [references/immutable-mode.md](references/immutable-mode.md)
- Enable `EnableImmutableMode(true)` to prevent re-render of unchanged rows
- Performance benefit for large data sets with frequent updates
- Limitations and usage patterns

### Virtual Scroll
📄 **Read:** [references/virtual-scroll.md](references/virtual-scroll.md)
- Enable row virtualization with `EnableVirtualization(true)`
- Enable timeline virtualization with `EnableTimelineVirtualization(true)`
- Performance characteristics and known limitations

### Loading Animation
📄 **Read:** [references/loading-animation.md](references/loading-animation.md)
- Built-in spinner shown during data load
- Show/hide loading indicator programmatically via `showSpinner()` / `hideSpinner()`
- `LoadingIndicator` with `IndicatorType.Shimmer` or `IndicatorType.Spinner`

### Style and Appearance
📄 **Read:** [references/style-and-appearance.md](references/style-and-appearance.md)
- Applying Syncfusion themes (Bootstrap, Material, Fabric, High Contrast)
- CSS class overrides for taskbars, grid rows, and header
- `QueryTaskbarInfo` event for per-task styling
- `GridLines` enum (Horizontal, Vertical, Both, None)

### Events
📄 **Read:** [references/events.md](references/events.md)
- Wire events via builder methods (`.ActionBegin("fn")`, `.ActionComplete("fn")`, `.ActionFailure("fn")`)
- `ActionBegin` — cancellable hook before every CRUD, filter, sort, zoom, and dependency action
- `ActionComplete` — post-action callback with `requestType` reference table
- `CellEdit` — prevent specific cells or rows from entering edit mode
- `BeforeTooltipRender` — customise or suppress any tooltip dynamically
- Row/cell selection events: `RowSelecting`, `RowSelected`, `RowDeselecting`, `RowDeselected`, `CellSelecting`, `CellSelected`
- Export events: `BeforeExcelExport`, `BeforePdfExport`, `ExcelExportComplete`, `PdfExportComplete`

### Public Methods
📄 **Read:** [references/methods.md](references/methods.md)
- Data access: `getCurrentViewData()`, `getRecordByID()`, `getTaskByUniqueID()`, `getRowByID()`
- Row expand/collapse: `expandAll()`, `collapseAll()`, `expandByID()`, `collapseByID()`, `expandByIndex()`
- Task utilities: `convertToMilestone()`, `updateTaskId()`, `updateDataSource()`, `updateRecordByID()`
- Scrolling: `scrollToDate()`, `scrollToTask()`, `setScrollTop()`, `updateChartScrollOffset()`
- Search: `search(keyword)` — programmatic search across displayed columns
- Selection: `selectCells()` — programmatically select one or more cells
- Lifecycle: `refresh()`, `dataBind()`, `addEventListener()`, `removeEventListener()`

## Quick Start Example

**Controller (`HomeController.cs`):**

```csharp
public ActionResult Index()
{
    ViewBag.GanttData = GetGanttData();
    return View();
}

public static List<GanttDataSource> GetGanttData()
{
    return new List<GanttDataSource>
    {
        new GanttDataSource
        {
            TaskId = 1, TaskName = "Project Initiation",
            StartDate = new DateTime(2024, 4, 2), EndDate = new DateTime(2024, 4, 21),
            SubTasks = new List<GanttDataSource>
            {
                new GanttDataSource { TaskId = 2, TaskName = "Identify site", StartDate = new DateTime(2024, 4, 2), Duration = 4, Progress = 70 },
                new GanttDataSource
                {
                    TaskId = 3,
                    TaskName = "Soil test",
                    StartDate = new DateTime(2024, 4, 2),
                    Duration = 4,
                    Progress = 50,
                    Predecessor = "2FS",
                    Indicators = new List<GanttIndicator>
                    {
                        new GanttIndicator { Date = new DateTime(2024, 4, 4), IconClass = "e-btn-icon e-notes-info", Label = "Mid-review" }
                    }
                }
            }
        }
    };
}

public class GanttDataSource
{
    public int TaskId { get; set; }
    public string TaskName { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public int? Duration { get; set; }
    public int Progress { get; set; }
    public string Predecessor { get; set; }
    public List<GanttIndicator> Indicators { get; set; }
    public List<GanttDataSource> SubTasks { get; set; }
}

public class GanttIndicator
{
    public string IconClass { get; set; }
    public string Label { get; set; }
    public DateTime Date { get; set; }
}
```

**View (`Index.cshtml`):**

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.GanttData)
    .Height("450px")
    .TaskFields(tf => tf
        .Id("TaskId")
        .Name("TaskName")
        .StartDate("StartDate")
        .EndDate("EndDate")
        .Duration("Duration")
        .Progress("Progress")
        .Indicators("Indicators")
        .Dependency("Predecessor")
        .Child("SubTasks")
    )
    .EditSettings(es => es.AllowEditing(true).AllowAdding(true).AllowDeleting(true).AllowTaskbarEditing(true))
    .Toolbar(new List<string> { "Add", "Edit", "Delete", "Update", "Cancel", "Search" })
    .AllowSorting(true)
    .AllowFiltering(true)
    .Render()
```

## Common Patterns

### Pass resources from controller

```csharp
ViewBag.Resources = GetResources(); // List<GanttResource>
```

```cshtml
@Html.EJS().Gantt("gantt")
    .DataSource((IEnumerable<object>)ViewBag.GanttData)
    .Resources((IEnumerable<object>)ViewBag.Resources)
    .ResourceFields(rf => rf.Id("ResourceId").Name("ResourceName"))
    .TaskFields(tf => tf.ResourceInfo("ResourceId") /* other fields */ )
    .Render()
```

### Enable critical path

```cshtml
@Html.EJS().Gantt("gantt")
    .EnableCriticalPath(true)
    /* other config */
    .Render()
```

### Enable Excel and PDF export with toolbar

```cshtml
@Html.EJS().Gantt("gantt")
    .AllowExcelExport(true)
    .AllowPdfExport(true)
    .Toolbar(new List<string> { "ExcelExport", "PdfExport" })
    .ToolbarClick("toolbarClick")
    .Render()

<script>
function toolbarClick(args) {
    var ganttObj = document.getElementById('gantt').ej2_instances[0];
    if (args.item.id === 'gantt_excelexport') ganttObj.excelExport();
    if (args.item.id === 'gantt_pdfexport') ganttObj.pdfExport();
}
</script>
```
