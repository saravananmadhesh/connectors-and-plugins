# Editor, Event, Cell and Date Header Templates in ASP.NET Core Scheduler

## Table of Contents
- [Editor Template](#editor-template)
- [Event Templates](#event-templates)
- [Cell Templates](#cell-templates)
- [Date Header Templates](#date-header-templates)

## Editor Template

The Editor Template replaces the default appointment editor shown when creating or editing an event. It is bound by id through the `editorTemplate` attribute on `ejs-schedule`.

```cshtml
<ejs-schedule id="schedule" width="100%" height="600" selectedDate="new DateTime(2026, 5, 11)"
              editorTemplate="#EditorTemplate" popupOpen="onPopupOpen">
    <e-schedule-eventsettings dataSource="@appointments"></e-schedule-eventsettings>
</ejs-schedule>

<script id="EditorTemplate" type="text/x-template">
    <table style="width:100%;">
        <tr>
            <td>Name</td>
            <td>
                <input class="e-field e-input" name="Subject" />
            </td>
        </tr>
        <tr>
            <td>Status</td>
            <td>
                <input id="EventStatus" class="e-field" name="EventStatus" />
            </td>
        </tr>
        <tr>
            <td>Start</td>
            <td>
                <input name="StartTime" class="e-field" />
            </td>
        </tr>
        <tr>
            <td>End</td>
            <td>
                <input name="EndTime" class="e-field" />
            </td>
        </tr>
    </table>
</script>

<script>
    function onPopupOpen(args) {
        if (args.type !== 'Editor') return;

        var statusElement = args.element.querySelector('#EventStatus');
        if (statusElement && !statusElement.classList.contains('e-dropdownlist')) {
            new ej.dropdowns.DropDownList({
                placeholder: 'Select status',
                value: statusElement.value,
                dataSource: ['New', 'Requested', 'Confirmed']
            }).appendTo(statusElement);
        }

        var startElement = args.element.querySelector('[name="StartTime"]');
        if (startElement && !startElement.classList.contains('e-datetimepicker')) {
            new ej.calendars.DateTimePicker({ value: args.data.StartTime }).appendTo(startElement);
        }

        var endElement = args.element.querySelector('[name="EndTime"]');
        if (endElement && !endElement.classList.contains('e-datetimepicker')) {
            new ej.calendars.DateTimePicker({ value: args.data.EndTime }).appendTo(endElement);
        }
    }
</script>
```

Important points:
- The `name` attribute must match the event property name.
- Use `popupOpen` to initialize controls such as `DropDownList`, `DateTimePicker`, or `MultiSelect`.
- Apply controls to elements using the `e-field` class so values are mapped back to the appointment data.

## Event Templates

In the ASP.NET Core Tag Helper, event templates are authored as a `<script id="..." type="text/x-template">` block and bound with the `template` attribute on `e-schedule-eventsettings` or the `eventTemplate` attribute on a specific view.

- Global binding: `template="#event-template"` on `e-schedule-eventsettings`
- View-level binding: `eventTemplate="#..."` on an individual `e-schedule-view`
- A view-specific `eventTemplate` overrides the global template for that view

### Basic Event Template

```cshtml
<ejs-schedule id="schedule" width="100%" height="650" selectedDate="new DateTime(2024, 2, 16)">
    <e-schedule-views>
        <e-schedule-view option="Day"></e-schedule-view>
        <e-schedule-view option="Week"></e-schedule-view>
    </e-schedule-views>
    <e-schedule-eventsettings dataSource="ViewBag.datasource" template="#event-template">
    </e-schedule-eventsettings>
</ejs-schedule>

<script id="event-template" type="text/x-template">
    <div class="custom-event">
        <div class="event-subject">${Subject}</div>
        <div class="event-time">Time: ${getTimeString(data.StartTime)} - ${getTimeString(data.EndTime)}</div>
    </div>
</script>

<script>
    var instance = new ej.base.Internationalization();
    window.getTimeString = function (value) {
        return instance.formatDate(value, { format: 'HH:mm' });
    };
</script>
```

### Template with Conditional Formatting

```cshtml
<ejs-schedule id="schedule" width="100%" height="650" eventRendered="onEventRendered">
    <e-schedule-views>
        <e-schedule-view option="Day"></e-schedule-view>
        <e-schedule-view option="Week"></e-schedule-view>
    </e-schedule-views>
    <e-schedule-eventsettings dataSource="ViewBag.datasource" template="#event-template">
    </e-schedule-eventsettings>
</ejs-schedule>

<script id="event-template" type="text/x-template">
    <div class="event-card ${Priority}">
        ${if(Priority === 'High')}
        <span class="icon-urgent">!</span>
        ${/if}
        <div class="event-subject">${Subject}</div>
        <div class="event-status">${Status}</div>
    </div>
</script>

<script>
    function onEventRendered(args) {
        if (args.data.Priority === 'High') {
            args.element.classList.add('priority-high');
        } else if (args.data.Priority === 'Medium') {
            args.element.classList.add('priority-medium');
        } else if (args.data.Priority === 'Low') {
            args.element.classList.add('priority-low');
        }
    }
</script>
```

### View-Specific Templates

```cshtml
<ejs-schedule id="schedule" width="100%" height="650"
              startHour="08:00" endHour="18:00"
              selectedDate="new DateTime(2024, 2, 15)" readonly="true">
    <e-schedule-workhours start="08:00"></e-schedule-workhours>
    <e-schedule-views>
        <e-schedule-view option="Week" eventTemplate="#event-template"></e-schedule-view>
        <e-schedule-view option="TimelineWeek" eventTemplate="#timeline-event-template"></e-schedule-view>
    </e-schedule-views>
    <e-schedule-eventsettings dataSource="ViewBag.datasource"></e-schedule-eventsettings>
</ejs-schedule>

<script id="event-template" type="text/x-template">
    <div class="template-wrap" style="background:${SecondaryColor}">
        <div class="subject" style="background:${PrimaryColor}">${Subject}</div>
        <div class="time" style="background:${PrimaryColor}">
            Time: ${getTimeString(data.StartTime)} - ${getTimeString(data.EndTime)}
        </div>
        <div class="description">${Description}</div>
    </div>
</script>

<script id="timeline-event-template" type="text/x-template">
    <div class="template-wrap" style="background:${PrimaryColor}">
        <div class="subject" style="background:${SecondaryColor}">${Subject}</div>
    </div>
</script>
```

> A view-level `eventTemplate` overrides the global `template` for that specific view.

## Cell Templates

### Customizing Work Cells

Use the `cellTemplate` property for individual time slots:

```cshtml
@{ string cellTemplate = "${if(type === 'monthCells')}<div>${getSpecialDayLabel(data.date)}</div>${/if}"; }

<ejs-schedule id="schedule" width="100%" height="550" cellTemplate="@cellTemplate">
    <e-schedule-views>
        <e-schedule-view option="Week"></e-schedule-view>
        <e-schedule-view option="Month"></e-schedule-view>
    </e-schedule-views>
    <e-schedule-eventsettings dataSource="ViewBag.datasource">
    </e-schedule-eventsettings>
</ejs-schedule>

<script>
    window.getSpecialDayLabel = function (date) {
        if (!date) return '';
        var month = date.getMonth();
        var day = date.getDate();

        if (month === 11 && day === 25) return '🎄 Christmas Day';
        if (month === 0 && day === 1) return '🎆 New Year\'s Day';
        if (date.getDay() === 5) return '🎉 Party Time';
        if (date.getDay() === 1 && day <= 7) return '🎂 Happy Birthday';

        return '';
    };
</script>
```

The template string checks the `type` parameter to distinguish different cell types.

### Highlighting Specific Cells

```cshtml
<ejs-schedule id="schedule" width="100%" height="550" renderCell="onRenderCell">
    <e-schedule-views>
        <e-schedule-view option="Day"></e-schedule-view>
    </e-schedule-views>
    <e-schedule-eventsettings dataSource="ViewBag.datasource"></e-schedule-eventsettings>
</ejs-schedule>

<script>
function onRenderCell(args) {
    if (args.elementType === 'workCells') {
        if (args.date && args.date.getHours() >= 10 && args.date.getHours() <= 12) {
            args.element.classList.add('meeting-time');
        }
    }
}
</script>
```

## Date Header Templates

Use `dateHeaderTemplate` to customize the date header area.

```cshtml
@{ string dateHeaderTemplate = "<div class='date-header-template'>" + "<div class='date-value'>${getDateValue(data.date)}</div>" + "<div class='day-name'>${getDayName(data.date)}</div>" + "</div>"; }

<ejs-schedule id="schedule" width="100%" height="550" dateHeaderTemplate="@dateHeaderTemplate">
    <e-schedule-views>
        <e-schedule-view option="Week"></e-schedule-view>
    </e-schedule-views>
    <e-schedule-eventsettings dataSource="ViewBag.datasource"></e-schedule-eventsettings>
</ejs-schedule>

<script>
window.getDateValue = function (date) {
    return date.getDate();
};

window.getDayName = function (date) {
    return date.toLocaleDateString('en-US', { weekday: 'short' });
};
</script>
```

The template receives the current cell date through `data.date`.

## Related references
- [Quick Info and Tooltips](customization-quickinfo-and-tooltips.md)
- [Rendering and Styling](customization-rendering-and-styling.md)
