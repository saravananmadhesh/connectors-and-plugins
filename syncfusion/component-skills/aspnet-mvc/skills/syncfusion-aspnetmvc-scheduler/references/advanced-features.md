# Advanced Features

## Table of Contents
1. [State Persistence](#state-persistence)
2. [Virtual Scrolling](#virtual-scrolling)
3. [Row Auto Height](#row-auto-height)
4. [Working Days and Hours](#working-days-and-hours)
5. [Clipboard Operations](#clipboard-operations)
6. [Recurrence Editor](#recurrence-editor)
7. [Calendar Modes](#calendar-modes)
8. [Adaptive UI](#adaptive-ui)

## State Persistence

Save and restore scheduler state:

```cshtml
@Html.EJS().Schedule("Schedule")
    .EnablePersistence(true)
    .Render()
```

### Persistent Properties
- Current view
- Selected date
- Scroll position
- Zoom level
- Width/height

### Manual State Save
```javascript
function saveScheduleState() {
    var schedule = document.getElementById('Schedule').ej2_instances[0];
    var state = {
        currentView: schedule.currentView,
        selectedDate: schedule.selectedDate,
        scrollTop: schedule.element.querySelector('.e-work-cells').parentElement.scrollTop
    };
    localStorage.setItem('scheduleState', JSON.stringify(state));
}

function restoreScheduleState() {
    var state = JSON.parse(localStorage.getItem('scheduleState'));
    if (state) {
        var schedule = document.getElementById('Schedule').ej2_instances[0];
        schedule.currentView = state.currentView;
        schedule.selectedDate = new Date(state.selectedDate);
    }
}
```

## Virtual Scrolling

Enable virtual scrolling for large datasets:

```cshtml
@Html.EJS().Schedule("Schedule")
    .EnableVirtualScrolling(true)
    .RowHeight(60)
    .Render()
```

### Performance Benefits
- Load only visible appointments
- Smooth scrolling with large event counts
- Reduced memory footprint
- Better performance on mobile devices

## Row Auto Height

Automatically adjust row height for content:

```cshtml
@Html.EJS().Schedule("Schedule")
    .RowAutoHeight(true)
    .Views(new string[] { "TimelineDay", "TimelineWeek" })
    .Render()
```

### CSS for Auto Height
```css
.e-schedule .e-appointment {
    white-space: normal;
    word-wrap: break-word;
}

.e-schedule .e-day-wrapper {
    min-height: auto;
}
```

## Working Days and Hours

Configure business hours:

```cshtml
@Html.EJS().Schedule("Schedule")
    .WorkDays(new int[] { 1, 2, 3, 4, 5 }) // Monday to Friday
    .WorkHours(new ScheduleWorkHours {
        Highlight = true,
        Start = "09:00",
        End = "18:00"
    })
    .Render()
```

### Day Values
- 0 = Sunday
- 1 = Monday
- 2 = Tuesday
- 3 = Wednesday
- 4 = Thursday
- 5 = Friday
- 6 = Saturday

### Exclude Holidays
```csharp
public ActionResult Index() {
    var holidays = new List<DateTime> {
        new DateTime(2024, 1, 1),   // New Year
        new DateTime(2024, 12, 25)  // Christmas
    };
    ViewBag.holidays = holidays;
    return View();
}
```

## Clipboard Operations

Copy and paste appointments:

```cshtml
@Html.EJS().Schedule("Schedule")
    .AllowClipboard(true)
    .Render()
```

### Copy Event
```javascript
function copyAppointment(eventId) {
    var schedule = document.getElementById('Schedule').ej2_instances[0];
    var event = schedule.getEventDetails(eventId);
    
    // Store in clipboard
    var clipboard = {
        type: 'appointment',
        data: event
    };
    
    localStorage.setItem('scheduleClipboard', JSON.stringify(clipboard));
}
```

### Paste Event
```javascript
function pasteAppointment() {
    var schedule = document.getElementById('Schedule').ej2_instances[0];
    var clipboard = JSON.parse(localStorage.getItem('scheduleClipboard'));
    
    if (clipboard && clipboard.type === 'appointment') {
        var newEvent = Object.assign({}, clipboard.data);
        delete newEvent.Id;
        schedule.addEvent(newEvent);
    }
}
```

## Recurrence Editor

Customize recurrence dialog:

```cshtml
@Html.EJS().Schedule("Schedule")
    .RecurrenceEditorTemplate("#recurrenceTemplate")
    .Render()
```

### Recurrence Editor Popup
```javascript
function openRecurrenceEditor(event) {
    var schedule = document.getElementById('Schedule').ej2_instances[0];
    
    if (event.RecurrenceRule) {
        schedule.openRecurrenceEditor(event);
    }
}
```

## Calendar Modes

Support different calendar systems:

```cshtml
@Html.EJS().Schedule("Schedule")
    .CalendarMode(CalendarMode.Gregorian) // or IslamicCalendar
    .Render()
```

### Islamic Calendar
```cshtml
@Html.EJS().Schedule("Schedule")
    .CalendarMode(CalendarMode.Islamic)
    .Locale("ar-SA")
    .Timezone("Asia/Dubai")
    .Render()
```

## Adaptive UI

Render the Scheduler with a responsive, mobile-friendly UI optimized for small screens. When `EnableAdaptiveUI` is set to `true`, the Scheduler adjusts its layout (toolbar, events list, event dialog) to fit narrow viewports and provides a touch-optimized experience.

```cshtml
@using Syncfusion.EJ2
@using Syncfusion.EJ2.Schedule

@Html.EJS().Schedule("schedule")
    .Width("100%")
    .Height("650px")
    .EnableAdaptiveUI(true)
    .CurrentView(View.Month)
    .Render()
```
