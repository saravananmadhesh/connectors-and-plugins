---
name: syncfusion-javascript-scheduler
description: Implement the Syncfusion Essential JS 2 TypeScript Scheduler (Schedule) component for event and appointment management. Use this when working with scheduling interfaces, calendar views, appointment CRUD operations, or resource management. This skill covers scheduler setup, views configuration, appointments handling, recurring events, resource scheduling, timeline views, editor templates, exporting functionality, timezone support, styling, and accessibility features.
metadata:
  author: "Syncfusion Inc"
  version: "34.1.29"
  category: "Calendars"
---

# Implementing Syncfusion TypeScript Scheduler

A comprehensive skill for implementing the Syncfusion EJ2 TypeScript **Schedule** (Scheduler) component — a full-featured calendar and appointment management UI supporting multiple views, recurring events, resource grouping, drag-and-drop, inline editing, and data export.

## When to Use This Skill

- Setting up and initializing the Scheduler in a TypeScript project
- Configuring calendar views (Day, Week, WorkWeek, Month, Year, Agenda, Timeline variants)
- Binding local or remote appointment data to the Scheduler
- Implementing CRUD (create, read, update, delete) for events
- Working with recurring events and the RecurrenceEditor
- Configuring multiple resources and grouped views
- Customizing the event editor popup or quick info templates
- Exporting Scheduler data to Excel, CSV, or iCalendar (.ics)
- Handling timezones for global user bases
- Styling, theming, and accessibility compliance

---

## Documentation and Navigation Guide

### Getting Started & Module Injection
📄 **Read:** [references/getting-started.md](references/getting-started.md)
- Package dependencies and npm installation
- CSS imports and theme configuration
- Module injection with `Schedule.Inject()`
- Initializing the Scheduler and appending to DOM
- Populating appointments with `eventSettings.dataSource`
- Setting `selectedDate` and `currentView`
- Individual per-view configuration with `views` array

### Views Configuration
📄 **Read:** [references/views.md](references/views.md)
- All 12 view types and their module requirements
- Per-view options (startHour, endHour, timeScale, showWeekend, etc.)
- Extended views using `interval` and `displayName`
- Timeline view orientations and Agenda view options

### Appointments & Recurring Events
📄 **Read:** [references/appointments.md](references/appointments.md)
- Normal, spanned, all-day, and recurring event types
- iCal `RecurrenceRule` string syntax (FREQ, BYDAY, COUNT, UNTIL, etc.)
- Recurrence exceptions and editing individual/following occurrences
- Built-in event fields reference table
- Custom field mapping via `eventSettings.fields`
- Preventing overlaps with `allowOverlap`, custom ordering with `sortComparer`

### Data Binding
📄 **Read:** [references/data-binding.md](references/data-binding.md)
- Local JSON array binding via `eventSettings.dataSource`
- Remote binding with `DataManager` and `ODataV4Adaptor`
- AJAX loading pattern using `ej2-base Ajax`
- Server-side date range filtering with `includeFiltersInQuery`
- Passing query parameters with `eventSettings.query`
- Google Calendar API integration via `dataBinding` event

### CRUD Actions
📄 **Read:** [references/crud-actions.md](references/crud-actions.md)
- Creating events via editor, quick popup, or `addEvent()` method
- Updating and deleting with `saveEvent()` and `deleteEvent()`
- Server-side CRUD using `UrlAdaptor` + `crudUrl`
- Field validation with `validation` property (required, regex)
- `actionBegin` / `actionComplete` lifecycle events
- Enabling read-only mode

### Editor Template & Quick Info
📄 **Read:** [references/editor-template.md](references/editor-template.md)
- Customizing default editor fields via `popupOpen`
- Full editor replacement with `editorTemplate`
- `editorHeaderTemplate` and `editorFooterTemplate`
- Custom quick info popups with `quickInfoTemplates`
- `showQuickInfo` toggle and `closeEditor()` method
- Custom timezone dropdown via `timezoneDataSource`

### Resources & Grouping
📄 **Read:** [references/resources.md](references/resources.md)
- Defining resources with `resources` property and field mappings
- Single and multi-level grouping via `group.resources`
- Date-based grouping with `group.byDate`
- `allowMultiple` for multi-resource event assignment
- Resource-specific working hours, colors, and CSS classes
- Expandable resource rows in Timeline views

### Working Days, Hours & Timescale
📄 **Read:** [references/working-days-timescale.md](references/working-days-timescale.md)
- `workDays`, `showWeekend`, `showWeekNumber`, `firstDayOfWeek`
- `workHours` highlight, start, and end configuration
- `startHour` / `endHour` for visible time range
- `timeScale` with `interval` and `slotCount`
- Major/minor slot templates
- `scrollTo()` for programmatic time scroll

### Cell, Header & View Customization
📄 **Read:** [references/cell-header-customization.md](references/cell-header-customization.md)
- `cellTemplate` with `elementType` conditions
- `renderCell` event for targeted cell modifications
- `cellHeaderTemplate` for Month view date headers
- Header bar: `showHeaderBar`, `toolbarItems`, `dateHeaderTemplate`
- Timeline `headerRows` property for Year/Month/Week/Date/Hour rows
- `minDate` / `maxDate` for date range restrictions

### Exporting & Printing
📄 **Read:** [references/exporting.md](references/exporting.md)
- `exportToExcel()` with `ExportOptions` (fileName, fields, customData, etc.)
- CSV export via `exportType: 'csv'`
- `excelExport` event for pre-export customization
- `exportToICalendar()` to `.ics` format
- `importICalendar()` from a file Blob
- `print()` method with `beforePrint` event

### Timezone Handling
📄 **Read:** [references/timezone.md](references/timezone.md)
- `timezone` property (IANA timezone string)
- Per-event `StartTimezone` / `EndTimezone` fields
- `Timezone` utility class: `offset()`, `convert()`, `add()`, `remove()`
- Customizing the timezone dropdown with `timezoneData`
- UTC mode for global/multi-region teams

### Recurrence Editor
📄 **Read:** [references/recurrence-editor.md](references/recurrence-editor.md)
- Standalone `RecurrenceEditor` component setup
- `frequencies` and `endTypes` property configuration
- `change` event for getting generated rule string
- `setRecurrenceRule()` and `getRecurrenceDates()` methods

### Styling & Theming
📄 **Read:** [references/scheduler-styling.md](references/scheduler-styling.md)
- CSS class selector reference for all Scheduler elements
- View-scoped selectors (`.e-vertical-view`, `.e-month-view`, etc.)
- State classes: selected cells, selected appointments
- Resource row selectors for Timeline views
- Block and read-only appointment styles

### Advanced Features
📄 **Read:** [references/advanced-features.md](references/advanced-features.md)
- Context menu integration with `ContextMenu`
- Clipboard: `allowClipboard`, `cut()`, `copy()`, `paste()`, `beforePaste` event
- Virtual scrolling with `allowVirtualScrolling` and `enableLazyLoading`
- `rowAutoHeight` for Timeline and Month views
- State persistence with `enablePersistence`
- Islamic/Hijri calendar via `calendarMode: 'Islamic'`
- Scheduler dimensions: `height` and `width`
- Accessibility, WCAG 2.2, keyboard shortcuts

---

## Quick Start

```typescript
import { Schedule, Day, Week, WorkWeek, Month, Agenda } from '@syncfusion/ej2-schedule';

// Inject required view modules
Schedule.Inject(Day, Week, WorkWeek, Month, Agenda);

let scheduleObj: Schedule = new Schedule({
    height: '550px',
    selectedDate: new Date(2018, 1, 15),
    currentView: 'Week',
    eventSettings: {
        dataSource: [
            {
                Id: 1,
                Subject: 'Team Meeting',
                StartTime: new Date(2018, 1, 15, 10, 0),
                EndTime: new Date(2018, 1, 15, 12, 0)
            }
        ]
    }
});
scheduleObj.appendTo('#Schedule');
```

```css
/* In styles.css */
@import '../../node_modules/@syncfusion/ej2-base/styles/fluent2.css';
@import '../../node_modules/@syncfusion/ej2-buttons/styles/fluent2.css';
@import '../../node_modules/@syncfusion/ej2-calendars/styles/fluent2.css';
@import '../../node_modules/@syncfusion/ej2-dropdowns/styles/fluent2.css';
@import '../../node_modules/@syncfusion/ej2-inputs/styles/fluent2.css';
@import '../../node_modules/@syncfusion/ej2-navigations/styles/fluent2.css';
@import '../../node_modules/@syncfusion/ej2-popups/styles/fluent2.css';
@import '../../node_modules/@syncfusion/ej2-schedule/styles/fluent2.css';
```

---

## Common Patterns

### Pattern 1: Switch to Month View with Weekend Hidden
```typescript
import { Schedule, Month } from '@syncfusion/ej2-schedule';

Schedule.Inject(Month);
let scheduleObj: Schedule = new Schedule({
    height: '550px',
    currentView: 'Month',
    showWeekend: false,
    eventSettings: { dataSource: [...] }
});
scheduleObj.appendTo('#Schedule');
```

### Pattern 2: Custom Field Names
```typescript
let scheduleObj: Schedule = new Schedule({
    height: '550px',
    eventSettings: {
        dataSource: myData,
        fields: {
            id: 'EventId',
            subject: { name: 'Title' },
            startTime: { name: 'From' },
            endTime: { name: 'To' },
            isAllDay: { name: 'AllDay' }
        }
    }
});
scheduleObj.appendTo('#Schedule');
```

### Pattern 3: Programmatic Event Creation
```typescript
let eventData: Object = {
    Id: 10,
    Subject: 'New Event',
    StartTime: new Date(2018, 1, 15, 14, 0),
    EndTime: new Date(2018, 1, 15, 16, 0)
};
scheduleObj.addEvent(eventData);
```

### Pattern 4: Resource-Grouped Timeline
```typescript
import { Schedule, TimelineViews } from '@syncfusion/ej2-schedule';

Schedule.Inject(TimelineViews);
let scheduleObj: Schedule = new Schedule({
    height: '550px',
    currentView: 'TimelineWeek',
    group: { resources: ['Rooms'] },
    resources: [{
        field: 'RoomId',
        title: 'Room',
        name: 'Rooms',
        dataSource: [
            { RoomText: 'Room 1', Id: 1, RoomColor: '#cb6bb2' },
            { RoomText: 'Room 2', Id: 2, RoomColor: '#56ca85' }
        ],
        textField: 'RoomText',
        idField: 'Id',
        colorField: 'RoomColor'
    }],
    eventSettings: { dataSource: [...] }
});
scheduleObj.appendTo('#Schedule');
```

---

## Key Properties Reference

| Property | Type | Description |
|----------|------|-------------|
| `height` | string | Scheduler height (`'550px'`, `'100%'`, `'auto'`) |
| `width` | string | Scheduler width |
| `selectedDate` | Date | Currently displayed date |
| `currentView` | string | Active view name |
| `views` | ViewsModel[] | Per-view configuration array |
| `eventSettings` | EventSettingsModel | Data source and field mappings |
| `group` | GroupModel | Resource grouping configuration |
| `resources` | ResourcesModel[] | Resource definitions |
| `workDays` | number[] | Days of week to show (0=Sun–6=Sat) |
| `workHours` | WorkHoursModel | Work hour highlight and range |
| `showWeekend` | boolean | Show/hide Saturday and Sunday |
| `timezone` | string | IANA timezone string for display |
| `enablePersistence` | boolean | Persist state in localStorage |
| `readonly` | boolean | Disable all CRUD interactions |
| `allowClipboard` | boolean | Enable cut/copy/paste for events |
