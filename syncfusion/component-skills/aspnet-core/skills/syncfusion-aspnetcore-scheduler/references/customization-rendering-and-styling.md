# Rendering, Styling, and Customization in ASP.NET Core Scheduler

## Table of Contents
- [Event Rendering](#event-rendering)
- [CSS Customization](#css-customization)
- [Overlapping Event Prevention](#overlapping-event-prevention)

## Event Rendering

Use the `eventRendered` event to customize the appointment element after it is created.

```cshtml
<ejs-schedule id="schedule" width="100%" height="550" eventRendered="onEventRendered">
    <e-schedule-eventsettings dataSource="ViewBag.datasource"></e-schedule-eventsettings>
</ejs-schedule>

<script>
function onEventRendered(args) {
    if (args.data.Priority === 'High') {
        args.element.style.backgroundColor = '#ff6b6b';
        args.element.style.color = 'white';
    } else if (args.data.Priority === 'Medium') {
        args.element.style.backgroundColor = '#ffd43b';
    } else if (args.data.Priority === 'Low') {
        args.element.style.backgroundColor = '#51cf66';
    }

    args.element.classList.add('priority-' + args.data.Priority);
}
</script>
```

Use this to:
- color code events by status or priority
- set a minimum height for short appointments
- gray out expired events

```cshtml
<script>
function onEventRendered(args) {
    var duration = (args.data.EndTime - args.data.StartTime) / (1000 * 60);
    if (duration < 30) {
        args.element.style.minHeight = '40px';
    }
}
</script>
```

## CSS Customization

Apply a shared CSS class with the `cssClass` property:

```cshtml
<ejs-schedule id="schedule" width="100%" height="550" cssClass="custom-schedule">
    <e-schedule-eventsettings dataSource="ViewBag.datasource"></e-schedule-eventsettings>
</ejs-schedule>

<style>
.custom-schedule .e-appointment {
    background-color: #4CAF50;
    border-left: 4px solid #2E7D32;
}

.custom-schedule .e-appointment:hover {
    background-color: #45a049;
    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
}

.custom-schedule .e-timecells {
    background-color: #f9f9f9;
}
</style>
```

### Dynamic Theming

```cshtml
<select id="themeSelector" onchange="changeTheme(this.value)">
    <option value="">Default</option>
    <option value="dark">Dark</option>
    <option value="light">Light</option>
</select>

<ejs-schedule id="schedule" width="100%" height="550" cssClass="theme-default">
    <e-schedule-eventsettings dataSource="ViewBag.datasource"></e-schedule-eventsettings>
</ejs-schedule>

<script>
function changeTheme(theme) {
    var schedule = document.getElementById('schedule');
    schedule.classList.remove('theme-default', 'theme-dark', 'theme-light');
    if (theme) {
        schedule.classList.add('theme-' + theme);
    } else {
        schedule.classList.add('theme-default');
    }
}
</script>
```

## Overlapping Event Prevention

```cshtml
<ejs-schedule id="schedule" width="100%" height="550" allowOverlap="false">
    <e-schedule-eventsettings dataSource="ViewBag.datasource"></e-schedule-eventsettings>
</ejs-schedule>
```

When overlapping is disabled, use `actionBegin` for custom validation:

```cshtml
<ejs-schedule id="schedule" width="100%" height="550" allowOverlap="false" actionBegin="onActionBegin">
    <e-schedule-eventsettings dataSource="ViewBag.datasource"></e-schedule-eventsettings>
</ejs-schedule>

<script>
function onActionBegin(args) {
    if ((args.requestType === 'eventCreate' || args.requestType === 'eventChange') && args.data) {
        var scheduleObj = document.getElementById('schedule').ej2_instances[0];
        var isAvailable = scheduleObj.isSlotAvailable(args.data.StartTime, args.data.EndTime);

        if (!isAvailable) {
            args.cancel = true;
            scheduleObj.openOverlapAlert();
        }
    }
}
</script>
```