# Customization and Templates in ASP.NET Core Scheduler


## Table of Contents

- [Editor, Event, Cell, and Date Header Templates](customization-templates.md)
- [Quick Info and Tooltips](customization-quickinfo-and-tooltips.md)
- [Rendering and Styling](customization-rendering-and-styling.md)
- [Complete Example](#complete-customization-example)
- [Best Practices](#best-practices)

## Included topics

- custom editor templates
- event templates and view-specific overrides
- cell templates and renderCell customization
- date header templates
- quick info popup templates and button wiring
- tooltip configuration and suppression
- event rendering and CSS customization
- overlapping event prevention and best practices

## Use this topic as a starting point

Start with the overview pages above and continue to the detailed examples in the linked documents for implementation patterns, code samples, and styling guidance.

## Complete Customization Example

```cshtml
<ejs-schedule id="schedule"
    width="100%"
    height="550"
    currentView="Week"
    selectedDate="new DateTime(2024, 3, 28)"
    cssClass="custom-company-schedule"
    eventRendered="onEventRendered"
    tooltipOpen="onTooltipOpen">

    <e-schedule-views>
        <e-schedule-view option="Week"></e-schedule-view>
        <e-schedule-view option="Day"></e-schedule-view>
        <e-schedule-view option="Month"></e-schedule-view>
    </e-schedule-views>
    <e-schedule-eventsettings dataSource="ViewBag.datasource"
        template="#eventTemplate"
        enableTooltip="true"
        tooltipTemplate="#eventTooltip">
    </e-schedule-eventsettings>
</ejs-schedule>

<script id="eventTemplate" type="text/x-template">
    <div class="event-card">
        <div class="event-priority ${Priority}"></div>
        <div class="event-body">
            <div class="event-title">${Subject}</div>
            <div class="event-meta">
                ${StartTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                -
                ${EndTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
        </div>
    </div>
</script>

<script id="eventTooltip" type="text/x-template">
    <div class="event-tooltip">
        <strong>${Subject}</strong>
        <div>Location: ${Location}</div>
        <div>Status: ${Status}</div>
    </div>
</script>

<script>
function onEventRendered(args) {
    if (args.data.IsReadonly) {
        args.element.classList.add('read-only-event');
    }
}

function onTooltipOpen(args) {
    if (args.data && args.data.IsBlock) {
        args.cancel = true;
    }
}
</script>

<style>
.custom-company-schedule .e-appointment {
    border-radius: 4px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.event-card {
    display: flex;
    padding: 5px;
    height: 100%;
}

.event-priority {
    width: 3px;
    background-color: #ccc;
    margin-right: 5px;
}

.event-priority.High {
    background-color: #ff6b6b;
}

.event-priority.Medium {
    background-color: #ffd43b;
}

.event-body {
    flex: 1;
}

.event-title {
    font-weight: 500;
    font-size: 13px;
    margin-bottom: 2px;
}

.event-meta {
    font-size: 11px;
    color: #666;
}

.read-only-event {
    opacity: 0.7;
    pointer-events: none;
}

.event-tooltip {
    padding: 10px;
    font-size: 12px;
}
</style>
```

## Best Practices

1. **Keep templates lean** - Complex templates impact performance
2. **Use CSS classes** - Easier to maintain than inline styles
3. **Test responsiveness** - Ensure customizations work on mobile
4. **Validate data** - Check for null/undefined in templates
5. **Cache templates** - Pre-compile for better performance
