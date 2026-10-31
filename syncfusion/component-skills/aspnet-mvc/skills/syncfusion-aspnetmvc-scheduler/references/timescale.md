# Timescale

## Table of Contents
1. [Timescale Configuration](#timescale-configuration)
2. [Intervals and Slots](#intervals-and-slots)
3. [Major Slot Template](#major-slot-template)
4. [Minor Slot Template](#minor-slot-template)
5. [Hide Timescale](#hide-timescale)

## Timescale Configuration

Configure time slot display:

```cshtml
@using Syncfusion.EJ2.Schedule

@(Html.EJS().Schedule("schedule")
    .Width("100%")
    .Height("550px")
    .SelectedDate(new DateTime(2018, 2, 15))
    .Views(view => {
        view.Option(View.Day).Add();
        view.Option(View.Week).Add();
        view.Option(View.WorkWeek).Add();
    })
    .TimeScale(ts => ts.Enable(true).Interval(60).SlotCount(6))
    .EventSettings(new ScheduleEventSettings { DataSource = ViewBag.datasource })
    .Render()
)
```

### Timescale Properties
| Property | Type | Description |
|----------|------|-------------|
| Enable | bool | Show/hide timescale |
| Interval | int | Minutes per slot (15, 30, 60) |
| SlotCount | int | Number of sub-slots |
| DateFormat | string | Time display format |

## Intervals and Slots

Set different interval configurations:

```cshtml
@using Syncfusion.EJ2.Schedule

// 30-minute intervals, 2 sub-slots = 15-minute minor slots
@(Html.EJS().Schedule("schedule")
    .TimeScale(ts => ts.Interval(30).SlotCount(2))
    .Render()
)

// 60-minute intervals, 4 sub-slots = 15-minute minor slots
@(Html.EJS().Schedule("schedule")
    .TimeScale(ts => ts.Interval(60).SlotCount(4))
    .Render()
)

// 15-minute intervals, 1 sub-slot
@(Html.EJS().Schedule("schedule")
    .TimeScale(ts => ts.Interval(15).SlotCount(1))
    .Render()
)
```

### Slot Height
```cshtml
.RowHeight(60) // pixels per slot
```

## Major Slot Template

Customize major time slot display:

```cshtml
@Html.EJS().Schedule("schedule")
    .TimeScale(new ScheduleTimeScale {
        Enable = true,
        Interval = 60,
        SlotCount = 2,
        MajorSlotTemplate = "#majorTemplate"
    })
    .Render()
```

```html
<script id="majorTemplate" type="text/x-template">
    <div class="e-slot-label">
        <span class="e-time">${getTimeString(data.date)}</span>
    </div>
</script>
```

### Template Context
```javascript
function getTimeString(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    return hours + ':' + (minutes < 10 ? '0' : '') + minutes + ' ' + ampm;
}
```

## Minor Slot Template

Customize minor slot appearance:

```cshtml
@Html.EJS().Schedule("schedule")
    .TimeScale(new ScheduleTimeScale {
        Enable = true,
        Interval = 60,
        SlotCount = 4,
        MinorSlotTemplate = "#minorTemplate"
    })
    .Render()
```

```html
<script id="minorTemplate" type="text/x-template">
    <div class="e-minor-slot">
        <span>${getMinutes(data.date)}</span>
    </div>
</script>
```

```javascript
function getMinutes(date) {
    var minutes = date.getMinutes();
    return (minutes < 10 ? '0' : '') + minutes;
}
```

### Minor Slot Styling
```css
.e-schedule .e-minor-slot {
    color: #999;
    font-size: 11px;
    text-align: center;
    padding: 5px 0;
}

.e-schedule .e-major-slot {
    font-weight: bold;
    color: #333;
}
```

## Hide Timescale

Disable timescale display:

```cshtml
@Html.EJS().Schedule("schedule")
    .TimeScale(new ScheduleTimeScale {
        Enable = false
    })
    .Render()
```

### Month View (No Timescale)
```cshtml
.Views(new string[] { "Month" })
.CurrentView(ScheduleView.Month)
// Timescale not applicable for month view
```

### Combined Configuration
```cshtml
@Html.EJS().Schedule("schedule")
    .Views(new string[] { "Day", "Week", "Month" })
    .CurrentView(ScheduleView.Day)
    .TimeScale(new ScheduleTimeScale {
        Enable = true,
        Interval = 30,
        SlotCount = 2,
        DateFormat = "HH:mm"
    })
    .Render()
```
