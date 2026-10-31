# Header Customization

## Table of Contents
1. [Header Bar Configuration](#header-bar-configuration)
2. [Custom Toolbar Items](#custom-toolbar-items)
3. [Date Picker Integration](#date-picker-integration)
4. [Navigation Controls](#navigation-controls)
5. [Header Styling](#header-styling)
6. [Date Header Templates](#date-header-templates)

## Header Bar Configuration

Customize toolbar appearance:

```cshtml
@using Syncfusion.EJ2.Schedule

@(Html.EJS().Schedule("schedule")
    .Width("100%")
    .Height("550px")
    .Toolbar(new string[] { 
        "Previous", "Today", "Next", "Views", 
        "DatePicker", "Settings", "Print", "Export" 
    })
    .EventSettings(new ScheduleEventSettings { DataSource = ViewBag.datasource })
    .SelectedDate(new DateTime(2018, 2, 15))
    .Render()
)
```

### Toolbar Items
| Item | Purpose |
|------|---------|
| Previous | Go to previous period |
| Today | Go to current date |
| Next | Go to next period |
| Views | Switch between views |
| DatePicker | Select date directly |
| Settings | Show settings menu |
| Print | Print scheduler |
| Export | Export appointments |

## Custom Toolbar Items

Add custom buttons:

```cshtml
.ToolbarItemRendered("onToolbarItemRendered")
```

```javascript
function onToolbarItemRendered(args) {
    if (args.item && args.item.id === 'schedule_views') {
        // Customize views dropdown
        args.element.style.minWidth = '150px';
    }
}
```

### Custom Button
```cshtml
@using Syncfusion.EJ2.Schedule

@(Html.EJS().Schedule("schedule")
    .Width("100%")
    .Height("550px")
    .Toolbar(new object[] { 
        "Previous", "Today", "Next", "Views",
        new { text = "Refresh", tooltipText = "Refresh appointments", prefixIcon = "e-icon-refresh" }
    })
    .ToolbarClick("onToolbarClick")
    .EventSettings(new ScheduleEventSettings { DataSource = ViewBag.datasource })
    .SelectedDate(new DateTime(2018, 2, 15))
    .Render()
)
```

```javascript
function onToolbarClick(args) {
    if (args.item.text === 'Refresh') {
        var schedule = document.getElementById('schedule').ej2_instances[0];
        schedule.refreshEvents();
    }
}
```

## Date Picker Integration

Add date navigation:

```cshtml
@using Syncfusion.EJ2.Schedule

@(Html.EJS().Schedule("schedule")
    .Width("100%")
    .Height("550px")
    .Toolbar(new string[] { "Previous", "Today", "Next", "DatePicker", "Views" })
    .EventSettings(new ScheduleEventSettings { DataSource = ViewBag.datasource })
    .SelectedDate(new DateTime(2018, 2, 15))
    .Render()
)
```

### Custom Date Picker
```html
<div class="e-toolbar-custom-date">
    <input type="date" id="dateSelector" />
</div>

<script>
document.getElementById('dateSelector').addEventListener('change', function(e) {
    var selectedDate = new Date(e.target.value);
    var schedule = document.getElementById('schedule').ej2_instances[0];
    schedule.selectedDate = selectedDate;
});
</script>
```

## Navigation Controls

Control date navigation:

```javascript
var schedule = document.getElementById('schedule').ej2_instances[0];

// Previous period
schedule.previousDate();

// Next period
schedule.nextDate();

// Go to today
schedule.today();

// Set specific date
schedule.selectedDate = new Date(2024, 0, 15);
```

### Month Navigation
```javascript
function goToMonth(monthOffset) {
    var schedule = document.getElementById('schedule').ej2_instances[0];
    var newDate = new Date(schedule.selectedDate);
    newDate.setMonth(newDate.getMonth() + monthOffset);
    schedule.selectedDate = newDate;
}

// Go 3 months forward
goToMonth(3);

// Go 1 month back
goToMonth(-1);
```

## Header Styling

Customize header appearance:

```css
.e-schedule .e-toolbar {
    background: linear-gradient(90deg, #1a73e8 0%, #1e3a8a 100%);
    padding: 12px 16px;
    border-bottom: 2px solid #1565c0;
}

.e-schedule .e-toolbar .e-btn {
    color: white;
    border: none;
    margin: 0 4px;
}

.e-schedule .e-toolbar .e-btn:hover {
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 4px;
}

.e-schedule .e-toolbar .e-btn.e-active {
    background-color: rgba(255, 255, 255, 0.3);
    border-bottom: 3px solid white;
}

.e-schedule .e-date-range {
    font-size: 18px;
    font-weight: 600;
    color: white;
}

.e-schedule .e-date-range .e-tbar-btn:hover {
    background: transparent;
}
```

### Toolbar Spacing
```css
.e-schedule .e-toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.e-schedule .e-toolbar-left {
    display: flex;
    gap: 8px;
}

.e-schedule .e-toolbar-right {
    display: flex;
    gap: 8px;
}
```

### Responsive Toolbar
```css
@media (max-width: 768px) {
    .e-schedule .e-toolbar {
        flex-wrap: wrap;
    }
    
    .e-schedule .e-toolbar .e-btn {
        font-size: 12px;
        padding: 6px 8px;
    }
}
```

## Date Header Templates

Customize the content displayed in each date header cell on the Scheduler. Use the `DateHeaderTemplate` method along with `RenderCell` to compose rich headers that combine formatted date text, images, temperature readings, and any custom markup.

### Basic Date Header Template

Define a `<script>` template and bind it using `DateHeaderTemplate`:

```cshtml
@using Syncfusion.EJ2
@using Syncfusion.EJ2.Schedule

@Html.EJS().Schedule("schedule")
    .Width("100%")
    .Height("650px")
    .Views(ViewData["view"])
    .RenderCell("onRenderCell")
    .EventRendered("onEventRendered")
    .EventSettings(new ScheduleEventSettings { DataSource = ViewData["datasource"] })
    .CssClass("schedule-date-header-template")
    .DateHeaderTemplate("#template")
    .SelectedDate(new DateTime(DateTime.Today.Year, 1, 10))
    .Render()
```

### Template Script Block

The template receives the `data` object exposing properties such as `data.date`. Use interpolation to render date text and append additional markup such as images or labels:

```html
<script id="template" type="text/template">
    <div class="date-text">${getDateHeaderText(data.date)}</div>
    ${getWeather(data.date)}
</script>
```

### Format Date Text with Internationalization

Use the `Internationalization` instance to format the date string with a culture-specific skeleton (for example, `Ed` outputs a short day format like "Mon" or "Tue"):

```javascript
var instance = new ej.base.Internationalization();
window.getDateHeaderText = function (value) {
    return instance.formatDate(value, { skeleton: 'Ed' });
};
```

### Append Dynamic Content to the Header

Build the secondary content (such as a weather icon and temperature) programmatically and return it as HTML. The function receives the current cell date and switches on the day of the week:

```javascript
function getWeather(value) {
    switch (value.getDay()) {
        case 0:
            return '<img class="weather-image" src="@Url.Content("~/Content/schedule/images/weather-clear.svg")" /><div class="weather-text">25&degC</div>';
        case 1:
            return '<img class="weather-image" src="@Url.Content("~/Content/schedule/images/weather-clouds.svg")" /><div class="weather-text">18&degC</div>';
        // ...continue for other days
        default:
            return null;
    }
}
```

### Adding Decorations to Month View Cells

Combine `RenderCell` with the date header template so the same helper can decorate the body cells of Month view. This keeps the weather image consistent across the header and the month grid:

```javascript
function onRenderCell(args) {
    if (this.currentView === 'Month' && args.elementType === 'monthCells') {
        var ele = document.createElement('div');
        ele.innerHTML = getWeather(args.date);
        (args.element).appendChild(ele.firstChild);
    }
}
```
