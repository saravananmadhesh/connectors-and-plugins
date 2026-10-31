---
name: syncfusion-aspnetmvc-scheduler
description: Guide for implementing Syncfusion ASP.NET MVC Scheduler component. Use this skill whenever users need to create scheduling interfaces, calendar views, event management systems, appointment booking, resource scheduling, timeline views, recurring events, drag-drop calendars, or any time-based data visualization. Covers setup, data binding, views configuration, CRUD operations, resources, customization, and integration with remote services.
metadata:
  author: "Syncfusion Inc"
  version: "34.1.29"
---

# Implementing Syncfusion ASP.NET MVC Scheduler

The Syncfusion ASP.NET MVC Scheduler is a comprehensive calendar and event management component that displays appointments in various views (Day, Week, Month, Year, Agenda, Timeline). It supports drag-and-drop, recurring events, multiple resources, timezone handling, and extensive customization options for building scheduling applications, appointment booking systems, resource management tools, and timeline-based interfaces.

## When to Use This Skill

Use this skill when users want to:
- Create scheduling or calendar interfaces in ASP.NET MVC applications
- Implement appointment booking or event management systems
- Build resource scheduling with multiple calendars
- Display time-based data in day, week, month, or timeline views
- Handle recurring events with complex recurrence patterns
- Enable drag-and-drop appointment management
- Integrate with remote data services or Google Calendar
- Customize event rendering, templates, or styling
- Implement timezone-aware scheduling across regions
- Export calendar data to Excel, PDF, or ICS formats
- Configure buffer times (prep/recovery) around appointments using Event Buffer
- Visually highlight the current time with a customizable indicator (CustomCurrentTimeIndicator)

## Component Overview

The Scheduler component provides:
- **Multiple Views**: Day, Week, Work Week, Month, Year, Agenda, Month Agenda, Timeline variants
- **Appointment Management**: Create, read, update, delete with inline editing, drag-drop, resize
- **Recurring Events**: Daily, weekly, monthly, yearly patterns with exceptions
- **Data Binding**: Local arrays, remote services, OData, custom adaptors, Google Calendar
- **Resource Scheduling**: Single/multi-level grouping, vertical/timeline layouts
- **Customization**: Event templates, cell templates, header customization, styling
- **Advanced Features**: Timezone support, localization, virtual scrolling, state persistence
- **Interactions**: Context menu, quick info popup, keyboard navigation, touch support
- **Export**: Excel, PDF, ICS (iCalendar) formats
- **Event Buffer**: Configurable pre/post buffer times around appointments with custom templates and overlap detection
- **Custom Current Time Indicator**: Fully configurable current time indicator with label, previous date support, and layering options

---

## Documentation and Navigation Guide

### Getting Started
📄 **Read:** [references/getting-started.md](references/getting-started.md)
- Prerequisites and system requirements
- Installing NuGet package (Syncfusion.EJ2.MVC5)
- Adding Scheduler to ASP.NET MVC project
- CSS and script references (CDN, NPM, CRG)
- Basic initialization with event data
- Setting initial date and view
- Populating appointments from controller

### Appointments and Event Management
📄 **Read:** [references/appointments.md](references/appointments.md)
- Normal, spanned, and all-day events
- Creating appointments programmatically
- Recurring events and recurrence rules (FREQ, INTERVAL, COUNT, UNTIL, BYDAY, BYMONTHDAY)
- Daily, weekly, monthly, yearly recurrence patterns
- Adding exceptions to recurring series
- Editing single occurrences vs entire series
- Event fields (Id, Subject, StartTime, EndTime, IsAllDay, RecurrenceRule, etc.)
- Binding different field names
- Adding custom fields to appointments
- Appointment selection and deletion

📄 **Read:** [references/appointment-interactions.md](references/appointment-interactions.md)
- Drag and drop appointments between time slots
- Multi-appointment drag (Ctrl+select multiple events)
- Resizing appointments (extending/shrinking duration)
- Controlling scroll speed during drag/resize
- Setting drag and resize intervals
- Auto-navigation on drag to edges
- Dragging from external sources (TreeView, ListView)
- Opening editor on drag stop
- Preventing overlaps with allowOverlap property
- Blocking specific dates/times (IsBlock field)
- Read-only appointments (IsReadonly field)
- Inline appointment editing

📄 **Read:** [references/appointment-customization.md](references/appointment-customization.md)
- Event templates for custom rendering
- Using EventRendered event for styling
- CSS class customization (CssClass property)
- Setting minimum appointment height
- Tooltip configuration (enableTooltip, tooltipTemplate)
- Differentiating past events
- Sorting overlapping events (sortComparer)
- Appointments occupying full cell height (enableMaxHeight)
- Custom appointment colors and backgrounds
- Quick Info popup customization

📄 **Read:** [references/event-buffer.md](references/event-buffer.md)
- Enabling the buffer feature with `EnableBuffer`
- `BufferBefore` and `BufferAfter` event fields (in minutes)
- Field mappings through `EventSettings.Fields`
- Custom `BufferTemplate` rendering
- Overlap behavior with `AllowOverlap(false)`
- Supported views (Day, Week, WorkWeek, Timeline variants)
- Use cases such as surgery prep/recovery and service appointments

📄 **Read:** [references/custom-current-time-indicator.md](references/custom-current-time-indicator.md)
- Enabling and customizing the current time indicator
- `ShowTimeIndicator` property usage
- `CurrentTimeIndicatorSettings` options: `ShowTime`, `ShowPreviousDates`, `OnTop`
- Supported views (Day, Week, WorkWeek, TimelineDay, TimelineWeek, TimelineWorkWeek)
- Limitations and best practices

### Views and Navigation
📄 **Read:** [references/views.md](references/views.md)
- Available views: Day, Week, WorkWeek, Month, Year, Agenda, MonthAgenda
- Setting active view (currentView property)
- Configuring specific views to display
- View-specific options (dateFormat, readonly, showWeekend, workDays)
- Day view with custom intervals (display 3 days, 5 days, etc.)
- Week and Work Week customization (firstDayOfWeek, workDays)
- Month view with "+more" indicator
- Year view (Horizontal and Vertical orientations)
- Agenda view with virtual scrolling (agendaDaysCount, hideEmptyAgendaDays)
- Month-Agenda view
- Extending view intervals with displayName
- MaxEventStack appointment limit per cell

📄 **Read:** [references/timeline-views.md](references/timeline-views.md)
- Timeline Day, Week, Work Week views
- Timeline Month and Year views
- Horizontal time axis with appointments
- Resource grouping in timeline mode
- Header rows configuration (year, month, week, date, hour labels)
- Auto row height for timeline views
- Timeline-specific cell and event rendering
- Customizing timeline intervals and slots

### Data Binding
📄 **Read:** [references/data-binding.md](references/data-binding.md)
- Binding local JSON data arrays
- Remote data services with DataManager
- Using ODataV4Adaptor for OData services
- Filter events with includeFiltersInQuery
- Creating custom adaptors
- Loading data via AJAX post
- Passing additional parameters to server (Query.addParams)
- Handling server failures (ActionFailure event)
- CRUD operations with UrlAdaptor
- Server-side controller implementation (InsertOnSubmit, DeleteOnSubmit)
- Google Calendar API integration
- Mapping event fields in DataBinding event

### Resources and Grouping
📄 **Read:** [references/resources.md](references/resources.md)
- Resource fields (Field, Title, Name, DataSource, IdField, TextField, ColorField)
- AllowMultiple for multi-resource selection
- Local and remote resource data binding
- Scheduler with multiple resources (no visual grouping)
- Vertical resource view (calendar views)
- Timeline resource view
- Single-level resource grouping
- Multi-level hierarchical grouping (GroupIDField)
- One-to-one grouping (byGroupID: false)
- Grouping by date (byDate: true)
- Resource-specific work hours (StartHourField, EndHourField, WorkDaysField)
- Customizing parent resource cells

### Cell and UI Customization
📄 **Read:** [references/cell-customization.md](references/cell-customization.md)
- Work cell templates (cellTemplate)
- Resource header templates (resourceHeaderTemplate)
- RenderCell event for conditional cell styling
- Cell click and double-click handling
- Restricting cell availability with isSlotAvailable
- Custom cell content and rendering
- Preventing event creation on specific cells

📄 **Read:** [references/scheduler-styling.md](references/scheduler-styling.md)
- Theme customization (Fluent, Material, Bootstrap, etc.)
- CSS class override techniques
- Event color customization
- Header bar styling
- Cell and time slot styling
- Resource color mapping (ColorField)
- Custom CSS examples for events and cells
- CssClass property for appointments

### CRUD Operations
📄 **Read:** [references/crud-actions.md](references/crud-actions.md)
- Add, edit, delete events through UI
- Editor window configuration
- Custom editor templates (editorTemplate)
- Quick info popup customization
- Preventing default actions (ActionBegin event)
- Server-side CRUD with UrlAdaptor
- Validation rules for event fields
- Read-only mode (readonly property)
- Editor field settings (default, name, title, validation)

### Context Menu
📄 **Read:** [references/context-menu.md](references/context-menu.md)
- Enabling context menu on events and cells
- Default menu items (Add, Edit, Delete, Today, Save, Cancel, Close)
- Adding custom menu items
- Menu item selection handling (menuOpen, menuItemSelect events)
- Context menu templates
- Conditional menu display

### Editor Customization
📄 **Read:** [references/editor-template.md](references/editor-template.md)
- Creating custom editor popup
- Adding custom fields to editor
- Editor template setup with HTML
- Populating editor with appointment data
- Saving custom field data
- Multi-field editor forms
- Validation in custom editors
- Dependent Fields
- DateTime Picker
- Dropdown Fields
- Custom Styling

### TimeScale Configuration
📄 **Read:** [references/timescale.md](references/timescale.md)
- TimeScale enable/disable (shows/hides time slots)
- Setting time slot duration (interval property in minutes)
- SlotCount for subdividing intervals
- Major slot template (majorSlotTemplate)
- Minor slot template (minorSlotTemplate)
- Hiding timescale grid lines
- Current time indicator (showTimeIndicator)
- Custom time label formats

### Timezone Handling
📄 **Read:** [references/timezone.md](references/timezone.md)
- Scheduler-level timezone (timezone property)
- Event-specific timezones (StartTimezone, EndTimezone fields)
- IANA timezone names (America/New_York, Europe/London, etc.)
- Timezone conversion for display
- Handling appointments across multiple timezones
- UTC storage and local display
- Timezone offset calculations

### Localization
📄 **Read:** [references/localization.md](references/localization.md)
- Internationalization setup (locale property)
- Culture-specific date/time formats
- Translating Scheduler text (load CLDR data)
- RTL (right-to-left) support (enableRtl)
- Number and currency format customization
- Week number display (showWeekNumber)
- First day of week configuration

### Header Customization
📄 **Read:** [references/header-customization.md](references/header-customization.md)
- Header bar configuration
- Custom toolbar items
- Date range text customization (dateRangeTemplate)
- Hiding header bar elements
- Header rows for timeline views (year, month, week, date, hour)
- Custom navigation buttons
- Header item templates
- Date header templates (dateHeaderTemplate) with template scripts, formatted date text, and dynamic content like weather icons
- Combining DateHeaderTemplate with RenderCell for Month view decorations

### Print and Export
📄 **Read:** [references/print-and-export.md](references/print-and-export.md)
- Export to Excel (exportToExcel method)
- Export to PDF (exportToPdf method) with page settings
- Export to ICS/iCalendar format (exportToICalendar method)
- Import iCalendar files (importICalendar) via Uploader
- Print the Scheduler with default options (print method)
- Custom export fields and field mapping
- Export selected events only
- Export options (fileName, exportType, customData)
- Excel custom cell formatting
- PDF orientation and page size

### Advanced Features
📄 **Read:** [references/advanced-features.md](references/advanced-features.md)
- State persistence (enablePersistence) across page reloads
- Virtual scrolling for Agenda and Timeline views (allowVirtualScrolling)
- Row auto height (rowAutoHeight) for Timeline views with adaptive resource rows
- Working days configuration (workDays property)
- Start and end hour (startHour, endHour)
- Scheduler dimensions (width, height)
- Clipboard operations (cut, copy, paste events)
- Recurrence editor component (standalone)
- Calendar modes (Gregorian, Islamic calendar)
- Adaptive UI rendering with EnableAdaptiveUI for mobile-friendly layouts

## Security Considerations

When implementing Syncfusion Scheduler:
- ✅ Always use [Authorize] and [ValidateAntiForgeryToken]
- ✅ Validate and sanitize all user inputs
- ✅ Encode all outputs to prevent XSS
- ✅ Filter data by authenticated user (multi-tenant isolation)
- ✅ Use parameterized queries (Entity Framework helps)
- ✅ Enable HTTPS and set secure cookie flags
- ✅ Implement audit logging for sensitive operations
- ✅ Follow principle of least privilege for resources

---

## Quick Start Example

### Basic Scheduler with Appointments

```csharp
// Controller: HomeController.cs
public class HomeController : Controller
{
    public ActionResult Index()
    {
        return View(GetScheduleData());
    }

    public List<AppointmentData> GetScheduleData()
    {
        List<AppointmentData> appData = new List<AppointmentData>();
        appData.Add(new AppointmentData
        {
            Id = 1,
            Subject = "Project Meeting",
            StartTime = new DateTime(2026, 4, 10, 9, 30, 0),
            EndTime = new DateTime(2026, 4, 10, 11, 0, 0),
            Location = "Conference Room A"
        });
        return appData;
    }
}

public class AppointmentData
{
    public int Id { get; set; }
    public string Subject { get; set; }
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }
    public string Location { get; set; }
}
```

```cshtml
@* View: Index.cshtml *@
@model List<AppointmentData>

@Html.EJS().Schedule("scheduler")
    .Width("100%")
    .Height("550px")
    .SelectedDate(new DateTime(2026, 4, 10))
    .EventSettings(e => e.DataSource(Model))
    .Render()
```

### Recurring Event Example

```csharp
// Create a weekly recurring event (every Monday for 10 occurrences)
appData.Add(new AppointmentData
{
    Id = 3,
    Subject = "Weekly Team Standup",
    StartTime = new DateTime(2026, 4, 13, 10, 0, 0),
    EndTime = new DateTime(2026, 4, 13, 10, 30, 0),
    RecurrenceRule = "FREQ=WEEKLY;BYDAY=MO;COUNT=10"
});
```

---

## Common Patterns

### 1. Data Binding with Remote Service

```cshtml
@Html.EJS().Schedule("scheduler")
    .Width("100%")
    .Height("550px")
    .EventSettings(e => e
        .DataSource(d => d
            .Url("url")
            .CrudUrl("url")
            .Adaptor("UrlAdaptor")
        )
    )
    .Render()
```

### 2. Resource Grouping (Timeline View)

```csharp
// Controller
public ActionResult Index()
{
    ViewBag.Resources = GetResourceData();
    return View(GetScheduleData());
}

public List<ResourceData> GetResourceData()
{
    return new List<ResourceData>
    {
        new ResourceData { Id = 1, Text = "Room A", Color = "#cb6bb2" },
        new ResourceData { Id = 2, Text = "Room B", Color = "#56ca85" }
    };
}
```

```cshtml
@{
    string[] group = new string[] { "Rooms" };
}

@Html.EJS().Schedule("scheduler")
    .Width("100%")
    .Height("550px")
    .CurrentView(Syncfusion.EJ2.Schedule.View.TimelineWeek)
    .Group(g => g.Resources(group))
    .Resources(res =>
    {
        res.DataSource((IEnumerable<ResourceData>)ViewBag.Resources)
            .Field("RoomId")
            .Title("Room")
            .Name("Rooms")
            .TextField("Text")
            .IdField("Id")
            .ColorField("Color")
            .Add();
    })
    .EventSettings(e => e.DataSource(Model))
    .Render()
```

### 3. Custom Event Template

```cshtml
<script id="eventTemplate" type="text/x-template">
    <div class="template-wrap">
        <div class="subject">@Html.Encode("${Subject}")</div>
    </div>
</script>

@Html.EJS().Schedule("scheduler")
    .EventSettings(e => e
        .DataSource(Model)
        .Template("#eventTemplate")
    )
    .Render()
```

### 4. Handling CRUD Events

```cshtml
@Html.EJS().Schedule("scheduler")
    .EventSettings(e => e.DataSource(Model))
    .ActionBegin("onActionBegin")
    .ActionComplete("onActionComplete")
    .Render()

<script>
    function onActionBegin(args) {
        // args.requestType: 'eventCreate', 'eventChange', 'eventRemove'
        if (args.requestType === 'eventCreate') {
            console.log('Creating appointment:', args.data);
            // Validate or modify data before save
        }
    }

    function onActionComplete(args) {
        if (args.requestType === 'eventCreated') {
            console.log('Appointment created successfully');
        }
    }
</script>
```

## Key Properties

| Property | Type | Description |
|----------|------|-------------|
| `Width` | string | Scheduler width (e.g., "100%", "800px") |
| `Height` | string | Scheduler height (e.g., "550px") |
| `SelectedDate` | DateTime | Initially displayed date |
| `CurrentView` | View | Active view (Day, Week, Month, etc.) |
| `Views` | List<ScheduleView> | Available views in toolbar |
| `EventSettings` | EventSettings | Appointment data binding and configuration |
| `Group` | Group | Resource grouping options |
| `Resources` | List<Resource> | Resource definitions |
| `TimeScale` | TimeScale | Time slot configuration |
| `WorkDays` | int[] | Working days (0=Sunday, 6=Saturday) |
| `StartHour` | string | Start hour (e.g., "08:00") |
| `EndHour` | string | End hour (e.g., "18:00") |
| `Timezone` | string | Scheduler timezone (IANA format) |
| `Readonly` | bool | Disable editing (default: false) |
| `ShowTimeIndicator` | bool | Show current time line (default: true) |
| `AllowDragAndDrop` | bool | Enable drag-drop (default: true) |
| `AllowResizing` | bool | Enable appointment resize (default: true) |
| `AllowMultiDrag` | bool | Enable multi-select drag (default: false) |
| `AllowInline` | bool | Enable inline editing (default: false) |
| `EnablePersistence` | bool | Save state across reloads (default: false) |

---

## Common Use Cases

### Appointment Booking System
- Use Month view for date selection, Day view for time slots
- Implement custom event template showing patient/client details
- Use `isSlotAvailable` method to check availability
- Block lunch breaks and off-hours with IsBlock
- Send confirmation emails in ActionComplete event

### Resource Scheduling (Meeting Rooms, Equipment)
- Configure resources with room/equipment details
- Use Timeline Week/Month view for resource overview
- Enable resource grouping (byDate: false)
- Implement color coding by resource type
- Set resource-specific work hours (StartHourField, EndHourField)

### Project Timeline Management
- Use Timeline views with custom intervals (display weeks/months)
- Create milestone events as all-day appointments
- Implement custom event template showing task progress
- Group by project phases using hierarchical resources
- Export to Excel for stakeholder reports

### Employee Shift Scheduling
- Use Work Week view with custom workDays
- Configure multiple resources (employees) with timeline grouping
- Implement recurring shift patterns (weekly recurrence)
- Use custom cell templates to show shift details
- Handle shift swaps with drag-drop between resources

---