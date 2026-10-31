# Appointment Customization

## Table of Contents
1. [Event Templates](#event-templates)
2. [EventRendered Event](#eventrendered-event)
3. [Custom CSS Styling](#custom-css-styling)
4. [Tooltip Template](#tooltip-template)
5. [Colors and Indicators](#colors-and-indicators)
6. [Quick Info Customization](#quick-info-customization)
   - [Schedule Configuration](#quick-info-schedule-configuration)
   - [Header Template](#header-template)
   - [Content Template](#content-template)
   - [Footer Template](#footer-template)
   - [Disable Quick Info](#disable-quick-info)

## Event Templates

Create custom HTML templates for appointment display:

```cshtml
@using Syncfusion.EJ2.Schedule

@(Html.EJS().Schedule("schedule")
    .Width("100%")
    .Height("550px")
    .EventSettings(new ScheduleEventSettings { DataSource = ViewBag.datasource, Template = ViewBag.template })
    .Readonly(true)
    .SelectedDate(new DateTime(2018, 2, 15))
    .Render()
)

<style>
    .e-schedule .e-vertical-view .e-content-wrap .e-appointment {
        border-radius: 8px;
    }

    .e-schedule .template-wrap {
        height: 100%;
        white-space: normal;
    }

    .e-schedule .template-wrap .subject {
        font-weight: 600;
        font-size: 15px;
        padding: 4px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }

    .e-schedule .template-wrap .time {
        height: 50px;
        font-size: 12px;
        padding: 4px 6px;
        overflow: hidden;
    }
</style>
```

## EventRendered Event

Customize appointments after rendering:

```cshtml
.EventRendered("onEventRendered")
```

```javascript
function onEventRendered(args) {
    if (args.data.Status === 'Pending') {
        args.element.style.backgroundColor = '#FFD700';
        args.element.style.color = '#000';
    }
}
```

## Custom CSS Styling

Apply CSS classes to appointments:

```cshtml
@using Syncfusion.EJ2.Schedule

@(Html.EJS().Schedule("schedule")
    .Width("100%")
    .Height("550px")
    .CssClass("custom-class")
    .EventSettings(new ScheduleEventSettings { DataSource = ViewBag.datasource})
    .SelectedDate(new DateTime(2018, 2, 15))
    .Render()
)

<style>
    .custom-class.e-schedule .e-vertical-view .e-all-day-appointment-wrapper .e-appointment,
    .custom-class.e-schedule .e-vertical-view .e-day-wrapper .e-appointment,
    .custom-class.e-schedule .e-month-view .e-appointment{
        background: green;
    }
</style>
```

## Tooltip Template

Customize appointment tooltips with rich HTML templates containing images and styled content:

```cshtml
@using Syncfusion.EJ2
@using Syncfusion.EJ2.Schedule


@Html.EJS().Schedule("schedule")
    .Width("100%")
    .Height("650px")
    .EventRendered("onEventRendered")
    .EventSettings(new ScheduleEventSettings
    {
        DataSource = ViewData["datasource"],
        EnableTooltip = true,
        TooltipTemplate = "#toolTip"
    })
    .SelectedDate(new DateTime(DateTime.Today.Year, 2, 15))
    .Render()

<script id="toolTip" type="text/x-template">
    <div class="tooltip-wrap">
        <div class="image ${EventType}"></div>
        <div class="content-area">
            <div class="name">${Subject}</div>
            ${if(City !== null && City !== undefined)}<div class="city">${City}</div>${/if}
            <div class="time">From&nbsp;:&nbsp;${StartTime.toLocaleString()}</div>
            <div class="time">To&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;${EndTime.toLocaleString()}</div>
        </div>
    </div>
</script>

```

### Key Properties

- **EnableTooltip**: Enable or disable the tooltip on appointments (defaults to `false`).
- **TooltipTemplate**: Selector or HTML string used to render the tooltip content.

## Colors and Indicators

Customize appointment appearance:

```csharp
new ScheduleEvent {
    Subject = "Project Deadline",
    StartTime = new DateTime(2024, 1, 15, 9, 0, 0),
    EndTime = new DateTime(2024, 1, 15, 10, 0, 0),
    CategoryColor = "#FF0000"
}
```

### Color Codes
- Success: `#28A745`
- Warning: `#FFC107`
- Error: `#DC3545`
- Info: `#17A2B8`

## Quick Info Customization

The Quick Info popup appears when a user clicks a cell (to add an appointment) or an existing appointment (to view details). Syncfusion ASP.NET MVC Scheduler exposes separate `Header`, `Content`, and `Footer` templates, allowing you to render different layouts for **cell** (add) and **event** (details) modes. Use `elementType === "cell"` to differentiate them inside the template.

### Quick Info Schedule Configuration

Register the three templates through `ScheduleQuickInfoTemplates` and use `PopupOpen` to wire up any controls (TextBox, DropDownList, Button) that live inside the templates:

```cshtml
@using Syncfusion.EJ2
@using Syncfusion.EJ2.Schedule

@Html.EJS().Schedule("schedule")
    .Width("100%")
    .Height("650px")
    .QuickInfoTemplates(new ScheduleQuickInfoTemplates
    {
        Header = "#header-template",
        Content = "#content-template",
        Footer = "#footer-template"
    })
    .PopupOpen("OnPopupOpen")
    .EventRendered("onEventRendered")
    .EventSettings(e => e.DataSource(ViewData["datasource"]))
    .SelectedDate(new DateTime(DateTime.Today.Year, 1, 6))
    .Resources(res =>
    {
        res.DataSource(ViewData["Categories"])
           .Field("RoomId")
           .Title("Room Type")
           .Name("MeetingRoom")
           .TextField("Name")
           .IdField("Id")
           .ColorField("Color")
           .Add();
    })
    .Render()
```

### Header Template

Render a header for both popups. Switch the title text and styles using `elementType`:

```html
<script id="header-template" type="text/x-template">
    <div class="quick-info-header">
        <button class="e-icons e-close" type="button" onclick="popupClose"></button>
        <div class="quick-info-header-content" style='${getHeaderStyles(data)}'>
            <div class="quick-info-title">
                ${if (elementType == "cell")}Add Appointment${else}Appointment Details${/if}
            </div>
            <div class="duration-text">${getHeaderDetails(data)}</div>
        </div>
    </div>
</script>
```

### Content Template

Render editable inputs when adding a new appointment and read-only fields when viewing an existing one:

```html
<script id="content-template" type="text/x-template">
    <div class="quick-info-content">
        ${if (elementType == "cell")}
        <div class="e-cell-content">
            <div class="content-area">
                <input id="title" placeholder="Title" />
            </div>
            <div class="content-area">
                <input id="eventType" placeholder="Choose Type" />
            </div>
            <div class="content-area">
                <input id="notes" placeholder="Notes" />
            </div>
        </div>
        ${else}
        <div class="event-content">
            <div class="meeting-type-wrap">
                <label>Subject</label>: <span>${Subject}</span>
            </div>
            <div class="meeting-subject-wrap">
                <label>Type</label>: <span>${getEventType(data)}</span>
            </div>
            <div class="notes-wrap">
                <label>Notes</label>: <span>${Description}</span>
            </div>
        </div>
        ${/if}
    </div>
</script>
```

### Footer Template

Render an **Add** button for cell popups and **Delete** / **More Details** buttons for event popups:

```html
<script id="footer-template" type="text/x-template">
    <div class="quick-info-footer">
        ${if (elementType == "cell")}
        <div class="cell-footer">
            <button id="more-details">More Details</button>
            <button id="add">Add</button>
        </div>
        ${else}
        <div class="event-footer">
            <button id="delete">Delete</button>
            <button id="more-details">More Details</button>
        </div>
        ${/if}
    </div>
</script>
```

### Disable Quick Info

```cshtml
.ShowQuickInfo(false)
```
