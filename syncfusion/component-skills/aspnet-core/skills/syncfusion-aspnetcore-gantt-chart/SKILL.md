---
name: syncfusion-aspnetcore-gantt-chart
description: Implement Syncfusion ASP.NET Core Gantt Chart component (EJ2) for project management and task scheduling. Use this when working with Gantt charts, project timelines, task dependencies, or resource allocation in ASP.NET Core applications (Tag Helper/Razor Pages/MVC). This skill covers data binding, task management, editing, filtering, export, and timeline customization.
metadata:
  author: "Syncfusion Inc"
  version: "34.1.29"
---

# Syncfusion ASP.NET Core Gantt Chart

The Syncfusion EJ2 Gantt Chart for ASP.NET Core is a powerful project management component that visualizes project schedules, task dependencies, resource allocation, and timelines using Tag Helpers.

## When to Use This Skill

Use this skill when you need to:
- Set up and render a Gantt Chart in an ASP.NET Core application
- Bind local or remote data to the Gantt control
- Configure task fields, columns, and the chart timeline
- Enable editing (cell, dialog, taskbar), manage tasks (add/delete/update)
- Define task dependencies (FS, SS, FF, SF) and predecessors
- Assign and display resources on tasks
- Filter, sort, search, or select rows/cells
- Export to Excel or PDF
- Customize the timeline, taskbars, labels, holidays, and event markers
- Configure task scheduling modes (Auto/Manual/Custom)
- Enable undo/redo, state persistence, virtual scrolling, or critical path
- Scroll the component, configure row height, or drag-and-drop rows
- Set timezone or localise the UI for different cultures and RTL languages
- Handle events (actionBegin, actionComplete, cellEdit) or call public methods programmatically

## Documentation and Navigation Guide

### Getting Started
📄 **Read:** [references/getting-started.md](references/getting-started.md)
- NuGet package installation
- Tag Helper import & CDN setup
- Script manager registration
- First Gantt control (Index.cshtml + Controller)
- Mapping task fields & defining columns
- Enabling editing, filtering, sorting

### Data Binding
📄 **Read:** [references/data-binding.md](references/data-binding.md)
- Local hierarchical data binding
- Local flat/self-referential data binding
- Remote data (URL Adaptor, OData, Web API)
- Load on demand (lazy loading child records)
- DynamicObject and ExpandoObject binding

### Columns
📄 **Read:** [references/columns.md](references/columns.md)
- Defining columns and field mapping
- Custom column headers & header templates
- Column templates & value accessors
- Serial number column (`enableSerialNumber`, auto-increment row numbering, behavior during sort/filter/drag-drop)
- Checkbox column, frozen columns
- Column reordering, resizing, spanning
- Responsive columns, WBS column, column menu

### Managing Tasks (Editing)
📄 **Read:** [references/managing-tasks.md](references/managing-tasks.md)
- IsPrimaryKey requirement for CRUD
- Cell editing, dialog editing, taskbar editing
- Adding and deleting tasks
- Indent / outdent tasks
- Splitting and merging tasks
- Server-side CRUD persistence
- Edit validation and error handling

### Task Dependencies
📄 **Read:** [references/task-dependency.md](references/task-dependency.md)
- SS, SF, FS, FF relationship types
- Mapping dependency field
- Predecessor offset values and duration units
- Allowed dependency types (`allowedDependencyTypes`, restrict FS/SS/FF/SF, validation during load and editing)
- Dependency editing via mouse drag
- Validation, error handling, parent dependencies

### Resources
📄 **Read:** [references/resources.md](references/resources.md)
- Resource collection and field mapping
- Assigning resources to tasks
- Resource view mode
- Multi-taskbar display
- Resource customization

### Filtering
📄 **Read:** [references/filtering.md](references/filtering.md)
- Menu filtering (column-level)
- Excel-like filtering
- Toolbar search / searching
- Filter settings and programmatic filtering

### Sorting
📄 **Read:** [references/sorting.md](references/sorting.md)
- Enabling sorting, multi-column sort
- Initial sort configuration
- Programmatic sort / clear sort

### Timeline
📄 **Read:** [references/timeline.md](references/timeline.md)
- Top tier and bottom tier configuration
- Timeline view modes (Hour, Day, Week, Month, Year)
- Custom timeline units and formats
- Timeline template
- Infinite timeline scrolling
- Zooming in and out

### Task Scheduling
📄 **Read:** [references/task-scheduling.md](references/task-scheduling.md)
- Auto, Manual, Custom scheduling modes
- Duration units (day, hour, minute, week, month) with `daysPerWeek` and `daysPerMonth`
- Global and per-task duration unit configuration
- Inline duration values with embedded units (e.g., "5 days", "2 weeks", "1 month")
- Unscheduled tasks
- Task constraints (ALAP, ASAP, FNLT, SNLT, MSO, MFO)

### Calendar Settings
📄 **Read:** [references/calendar-settings.md](references/calendar-settings.md)
- Project calendar configuration with working hours, holidays, and exceptions
- Task calendar definition and assignment via `taskFields.calendarId`
- Working time blocks and split-shift scheduling
- Holiday and calendar exception management
- `hoursPerDay` configuration for duration conversion
- Calendar interaction with scheduling, dependencies, and working time
- Multi-shift and region-specific calendar scenarios

### Baseline
📄 **Read:** [references/baseline.md](references/baseline.md)
- Baseline feature overview and use cases
- Mapping baseline date fields (baselineStartDate, baselineEndDate, baselineDuration)
- Enabling baseline display with renderBaseline and customizing baselineColor
- Rendering baseline milestones with explicit zero duration
- CSS styling of baseline bars
- Baseline templates and dynamic customization
- Multiple baseline rendering for comparing multiple planning phases

### Selection
📄 **Read:** [references/selection.md](references/selection.md)
- Row selection and cell selection
- Single/multiple selection modes
- Hierarchy checkbox selection with `hierarchyCheckboxMode` (Self, Hierarchy, FilteredHierarchy)
- Parent/child selection propagation and collapse/expand behavior
- Programmatic selection

### Scrolling
📄 **Read:** [references/scrolling.md](references/scrolling.md)
- Configure component `height` and `width` to enable scrollbars
- Responsive sizing with `100%` and parent container height requirements
- Programmatic timeline scroll via `scrollToDate()`
- Set vertical scroll with `ganttObj.ganttChartModule.scrollObject.setScrollTop()`

### Rows
📄 **Read:** [references/rows.md](references/rows.md)
- Configure global `rowHeight` and per-row expand state via `taskFields.expandState`
- Collapse all parent tasks at load with `collapseAllParentTasks`
- Customize row appearance with `rowDataBound` and `queryTaskbarInfo`
- Row spanning via `queryCellInfo.rowSpan` and clip modes for overflow

### Row Drag And Drop
📄 **Read:** [references/row-drag-and-drop.md](references/row-drag-and-drop.md)
- Enable row reordering with `allowRowDragAndDrop` and `selectionSettings.type = "Multiple"` for multi-drag
- Allow taskbar-based drag with `allowTaskbarDragAndDrop` and edit mode `Auto`
- Lifecycle events: `rowDragStartHelper`, `rowDragStart`, `rowDrag`, `rowDrop`
- Programmatic reordering via `reorderRows(fromIndexes, toIndex, position)`

### Timezone
📄 **Read:** [references/timezone.md](references/timezone.md)
- Set `timezone` (e.g., `UTC`, `America/New_York`) to normalise displayed dates across clients
- CRUD operations respect configured timezone and convert for server persistence
- Utility methods: `ej.schedule.Timezone().offset()`, `convert()`, and `remove()` for programmatic conversions

### Globalization
📄 **Read:** [references/globalization.md](references/globalization.md)
- Localize UI text via `locale` and `ej.base.L10n.load()` translation objects
- Internationalization: load CLDR files to format dates and numbers per culture
- Enable RTL layout with `enableRtl="true"` for right-to-left languages

### Export (Excel & PDF)
📄 **Read:** [references/export.md](references/export.md)
- Excel export with column and data customization
- PDF export with themes and custom columns
- Exporting multiple Gantt charts to a single PDF

### Toolbar
📄 **Read:** [references/toolbar.md](references/toolbar.md)
- Built-in toolbar items (Add, Edit, Delete, Search, ExpandAll, CollapseAll, ExcelExport, PdfExport, ZoomIn, ZoomOut, ZoomToFit, UndoRedo)
- Custom toolbar items and click handling
- Enabling/disabling toolbar items programmatically

### Context Menu
📄 **Read:** [references/context-menu.md](references/context-menu.md)
- Enable context menu with `enableContextMenu="true"`
- Built-in context menu items for CRUD operations
- Custom context menu items and click event handling

### Taskbar
📄 **Read:** [references/taskbar.md](references/taskbar.md)
- Taskbar templates using `text/x-jsrender` (`taskbarTemplate`, `parentTaskbarTemplate`, `milestoneTemplate`)
- Control taskbar size with `taskbarHeight` (must be less than `rowHeight`)
- Dynamic taskbar/progress styling with `queryTaskbarInfo` (e.g., `taskbarBgColor`, `progressBarBgColor`, `isCritical`)
- Change the drag gripper icon via CSS overrides
- Customize dependency connector lines with `connectorLineWidth` and `connectorLineBackground`
- Multi-taskbar display in project view using `enableMultiTaskbar="true"`

### Taskbar Draw
📄 **Read:** [references/taskbar-draw.md](references/taskbar-draw.md)
- Enable taskbar draw with `allowTaskbarDraw="true"` in EditSettings
- Create/schedule unscheduled tasks by dragging on the timeline
- Automatic date and duration calculation based on drawn range
- Task type scenarios (unscheduled, partial, parent, child, milestone, manual)
- Calendar and working time interaction with taskbar draw
- Predecessor constraint handling during drawing
- Best practices and troubleshooting

### Labels and Tooltips
📄 **Read:** [references/labels-and-tooltips.md](references/labels-and-tooltips.md)
- Left/right/inside label templates on taskbars
- Taskbar tooltip customization via `tooltipSettings`
- Connector line and baseline tooltips

### Event Markers
📄 **Read:** [references/event-markers.md](references/event-markers.md)
- Add striplines/event markers with `<e-gantt-eventmarkers>`
- Custom label and CSS class per marker
- Dynamic event markers

### Critical Path
📄 **Read:** [references/critical-path.md](references/critical-path.md)
- Enable critical path highlighting with `enableCriticalPath="true"`
- Critical path rendering and customization
- Critical slack value configuration

### Splitter
📄 **Read:** [references/splitter.md](references/splitter.md)
- Configure grid/chart pane ratio with `splitterSettings`
- Set splitter position by column index, percentage, or pixel
- Programmatic splitter position update via `setSplitterPosition()`

### Undo and Redo
📄 **Read:** [references/undo-redo.md](references/undo-redo.md)
- Enable undo/redo via toolbar items or `Ctrl+Z` / `Ctrl+Y`
- Configure undo-redo history size (`undoRedoStepsCount`)
- Supported actions and programmatic `undo()` / `redo()` calls

### State Persistence
📄 **Read:** [references/state-persistence.md](references/state-persistence.md)
- Enable persistence with `enablePersistence="true"` (saves to `localStorage`)
- Persisted properties: filter, sort, column width, scroll position, zoom level
- Clearing persisted state programmatically

### Immutable Mode
📄 **Read:** [references/immutable-mode.md](references/immutable-mode.md)
- Enable `enableImmutableMode="true"` to prevent re-render of unchanged rows
- Performance benefit for large data sets with frequent updates
- Limitations and usage patterns

### Virtual Scroll
📄 **Read:** [references/virtual-scroll.md](references/virtual-scroll.md)
- Enable row virtualization with `enableVirtualization="true"`
- Enable timeline virtualization with `enableTimelineVirtualization="true"`
- Performance characteristics and known limitations

### Loading Animation
📄 **Read:** [references/loading-animation.md](references/loading-animation.md)
- Built-in spinner shown during data load
- Show/hide loading indicator programmatically via `showSpinner()` / `hideSpinner()`
- Custom loading template

### Style and Appearance
📄 **Read:** [references/style-and-appearance.md](references/style-and-appearance.md)
- Applying Syncfusion themes (Bootstrap, Material, Fabric, High Contrast)
- CSS class overrides for taskbars, grid rows, and header
- `queryTaskbarInfo` event for per-task styling

### Events
📄 **Read:** [references/events.md](references/events.md)
- Wire events via camelCase Tag Helper attributes (`actionBegin`, `actionComplete`, `actionFailure`)
- `actionBegin` — cancel-able hook before every CRUD, filter, sort, zoom, and dependency action
- `actionComplete` — post-action callback with `requestType` reference table
- `cellEdit` — prevent specific cells or rows from entering edit mode
- `beforeTooltipRender` — customise or suppress any tooltip dynamically
- Row/cell selection events: `rowSelecting`, `rowSelected`, `rowDeselecting`, `rowDeselected`, `cellSelecting`, `cellSelected`
- Export events: `beforeExcelExport`, `beforePdfExport`, `excelExportComplete`, `pdfExportComplete`

### Public Methods
📄 **Read:** [references/methods.md](references/methods.md)
- Data access: `getCurrentViewData()`, `getRecordByID()`, `getTaskByUniqueID()`, `getRowByID()`
- Row expand/collapse: `expandAll()`, `collapseAll()`, `expandByID()`, `collapseByID()`, `expandByIndex()`
- Task utilities: `changeTaskMode()`, `convertToMilestone()`, `updateTaskId()`, `updateDataSource()`
- Scrolling: `scrollToDate()`, `scrollToTask()`, `setScrollTop()`, `updateChartScrollOffset()`
- Search: `search(keyword)` — programmatic search across displayed columns
- Lifecycle: `refresh()`, `dataBind()`, `getRootElement()`, `addEventListener()`, `removeEventListener()`
- Module injection reference table (`ej.gantt.Filter`, `Edit`, `RowDD`, `CriticalPath`, etc.)

## Quick Start Example

```cshtml
@* ~/Pages/Index.cshtml *@
<ejs-gantt id='Gantt' dataSource="Model.GanttDataSourceCollection" height="450px">
    <e-gantt-taskfields id="TaskId"
                        name="TaskName"
                        startDate="StartDate"
                        endDate="EndDate"
                        duration="Duration"
                        progress="Progress"
                        parentID="ParentID">
    </e-gantt-taskfields>
</ejs-gantt>
```

```csharp
// ~/Pages/Index.cshtml.cs
public class IndexModel : PageModel
{
    public List<GanttDataSource> GanttDataSourceCollection { get; set; }

    public void OnGet()
    {
        GanttDataSourceCollection = GetTaskCollection();
    }

    private List<GanttDataSource> GetTaskCollection()
    {
        return new List<GanttDataSource>()
        {
            new GanttDataSource() { TaskId = 1, TaskName = "Project initiation", StartDate = new DateTime(2019, 04, 02), EndDate = new DateTime(2019, 04, 21) },
            new GanttDataSource() { TaskId = 2, TaskName = "Identify site location", StartDate = new DateTime(2019, 04, 02), Duration = 4, Progress = 50, ParentID = 1 },
            new GanttDataSource() { TaskId = 3, TaskName = "Perform soil test", StartDate = new DateTime(2019, 04, 02), Duration = 4, Progress = 50, ParentID = 1 },
            new GanttDataSource() { TaskId = 4, TaskName = "Soil test approval", StartDate = new DateTime(2019, 04, 02), Duration = 4, Progress = 50, ParentID = 1 },
            new GanttDataSource() { TaskId = 5, TaskName = "Project estimation", StartDate = new DateTime(2019, 04, 02), EndDate = new DateTime(2019, 04, 21) },
            new GanttDataSource() { TaskId = 6, TaskName = "Develop floor plan for estimation", StartDate = new DateTime(2019, 04, 04), Duration = 3, Progress = 50, ParentID = 5 },
            new GanttDataSource() { TaskId = 7, TaskName = "List materials", StartDate = new DateTime(2019, 04, 04), Duration = 3, Progress = 50, ParentID = 5 }
        };
    }
}

public class GanttDataSource
{
    public int TaskId { get; set; }
    public string TaskName { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public int? Duration { get; set; }
    public int Progress { get; set; }
    public int? ParentID { get; set; }
```

## Common Patterns

### Enable Editing
```cshtml
<ejs-gantt id="Gantt" dataSource="Model.GanttDataSourceCollection" height="450px">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        endDate="EndDate" duration="Duration" progress="Progress"
                        parentID="ParentID">
    </e-gantt-taskfields>
    <e-gantt-editsettings allowEditing="true" allowAdding="true"
                          allowDeleting="true" allowTaskbarEditing="true"
                          mode="Auto">
    </e-gantt-editsettings>
    <e-gantt-columns>
        <e-gantt-column field="TaskId" isPrimaryKey="true"></e-gantt-column>
        <e-gantt-column field="TaskName"></e-gantt-column>
    </e-gantt-columns>
</ejs-gantt>
```

### Enable Filtering and Sorting
```cshtml
<ejs-gantt id="Gantt" dataSource="Model.GanttDataSourceCollection"
           allowFiltering="true" allowSorting="true" height="450px">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        endDate="EndDate" duration="Duration" progress="Progress"
                        parentID="ParentID">
    </e-gantt-taskfields>
</ejs-gantt>
```

### Toolbar with Export
```cshtml
<ejs-gantt id="Gantt" dataSource="Model.GanttDataSourceCollection"
           toolbar="@(new List<string>() { "Add","Edit","Delete","Cancel","Update","ExpandAll","CollapseAll","ExcelExport","PdfExport" })"
           allowExcelExport="true" allowPdfExport="true" height="450px">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        endDate="EndDate" duration="Duration" parentID="ParentID">
    </e-gantt-taskfields>
</ejs-gantt>
```
