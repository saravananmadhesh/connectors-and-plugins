# Quick Info Templates and Tooltips in ASP.NET Core Scheduler

## Table of Contents
- [Quick Info Templates](#quick-info-templates)
- [Per-Template Customization](#per-template-customization)
- [Tooltips](#tooltips)

## Quick Info Templates

Quick Info Templates replace the default popups shown for empty cells or existing appointments. Three templates are bound through `e-schedule-quickinfotemplates`: `header`, `content`, and `footer`.

```cshtml
<ejs-schedule id="schedule" height="650"
              selectedDate="new DateTime(DateTime.Today.Year, 1, 6)"
              popupOpen="OnPopupOpen"
              eventRendered="onEventRendered">

    <e-schedule-quickinfotemplates header="#header-template"
                                  content="#content-template"
                                  footer="#footer-template">
    </e-schedule-quickinfotemplates>

    <e-schedule-resources>
        <e-schedule-resource dataSource="@Model.categories"
                             field="RoomId" title="Room Type"
                             name="MeetingRoom"
                             textField="Name" idField="Id" colorField="Color">
        </e-schedule-resource>
    </e-schedule-resources>

    <e-schedule-eventsettings dataSource="ViewBag.datasource"></e-schedule-eventsettings>
</ejs-schedule>

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

<script id="content-template" type="text/x-template">
    <div class="quick-info-content">
        ${if (elementType == "cell")}
        <div class="e-cell-content">
            <div class="content-area"><input id="title" placeholder="Title" /></div>
            <div class="content-area"><input id="eventType" placeholder="Choose Type" /></div>
            <div class="content-area"><input id="notes" placeholder="Notes" /></div>
        </div>
        ${else}
        <div class="event-content">
            <div class="meeting-type-wrap"><label>Subject</label>: <span>${Subject}</span></div>
            <div class="meeting-subject-wrap"><label>Type</label>: <span>${getEventType(data)}</span></div>
            <div class="notes-wrap"><label>Notes</label>: <span>${Description}</span></div>
        </div>
        ${/if}
    </div>
</script>

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

The key difference is the `elementType` check:
- Empty cell popup: `elementType == "cell"`
- Existing appointment popup: `elementType != "cell"`

Use `popupOpen` to initialize the controls rendered by the templates.

```cshtml
<script type="text/javascript">
    var intl = new ej.base.Internationalization();

    window.getResourceData = function (data) {
        var scheduleObj = document.getElementById('schedule').ej2_instances[0];
        var resources = scheduleObj.getResourceCollections().slice(-1)[0];
        return resources.dataSource.filter(function (r) { return r.Id === data.RoomId; })[0];
    };

    window.getHeaderDetails = function (data) {
        return intl.formatDate(data.StartTime, { type: 'date', skeleton: 'full' }) + ' (' +
            intl.formatDate(data.StartTime, { skeleton: 'hm' }) + ' - ' +
            intl.formatDate(data.EndTime, { skeleton: 'hm' }) + ')';
    };

    window.getHeaderStyles = function (data) {
        if (data.elementType === 'cell') {
            return 'align-items: center; color: #919191;';
        }
        var resourceData = window.getResourceData(data);
        return 'background:' + resourceData.Color + '; color: #FFFFFF;';
    };

    window.getEventType = function (data) {
        return window.getResourceData(data).Name;
    };

    var popupClose = function () {
        document.getElementById('schedule').ej2_instances[0].closeQuickInfoPopup();
    };

    function OnPopupOpen(args) {
        var scheduleObj = document.getElementById('schedule').ej2_instances[0];
        if (args.type !== 'QuickInfo' && args.type !== 'ViewEventInfo') return;

        if (!args.target.classList.contains('e-appointment')) {
            new ej.inputs.TextBox({ placeholder: 'Title' }).appendTo(args.element.querySelector('#title'));
            new ej.dropdowns.DropDownList({
                dataSource: scheduleObj.getResourceCollections().slice(-1)[0].dataSource,
                placeholder: 'Choose Type',
                fields: { text: 'Name', value: 'Id' },
                index: 0
            }).appendTo(args.element.querySelector('#eventType'));
            new ej.inputs.TextBox({ placeholder: 'Notes' }).appendTo(args.element.querySelector('#notes'));
        }

        var moreBtn = args.element.querySelector('#more-details');
        if (moreBtn) {
            new ej.buttons.Button({ content: 'More Details', cssClass: 'e-flat' }).appendTo(moreBtn);
            moreBtn.onclick = function () {
                scheduleObj.openEditor(scheduleObj.activeEventData.event || scheduleObj.activeCellsData, 'Add', true);
                scheduleObj.closeQuickInfoPopup();
            };
        }

        var addBtn = args.element.querySelector('#add');
        if (addBtn) {
            new ej.buttons.Button({ content: 'Add', isPrimary: true }, addBtn);
            addBtn.onclick = function () {
                scheduleObj.addEvent({
                    Id: scheduleObj.getEventMaxID(),
                    Subject: 'New Appointment',
                    StartTime: new Date(scheduleObj.activeCellsData.startTime),
                    EndTime: new Date(scheduleObj.activeCellsData.endTime)
                });
                scheduleObj.closeQuickInfoPopup();
            };
        }
    }
</script>
```

## Per-Template Customization

You can customize only the required slots.

### Header Template Only

```cshtml
<ejs-schedule id="schedule" height="550" selectedDate="new DateTime(2026, 1, 6)">
    <e-schedule-quickinfotemplates header="#header-template">
    </e-schedule-quickinfotemplates>
    <e-schedule-eventsettings dataSource="ViewBag.datasource"></e-schedule-eventsettings>
</ejs-schedule>

<script id="header-template" type="text/x-template">
    <div class="custom-header">
        <div class="custom-header-title">
            ${if (elementType == "cell")}New Appointment${else}${Subject}${/if}
        </div>
        <div class="custom-header-time">${getHeaderDetails(data)}</div>
    </div>
</script>
```

### Footer Template Only

```cshtml
<ejs-schedule id="schedule" height="550" selectedDate="new DateTime(2026, 1, 6)" popupOpen="OnPopupOpen">
    <e-schedule-quickinfotemplates footer="#footer-template">
    </e-schedule-quickinfotemplates>
    <e-schedule-eventsettings dataSource="ViewBag.datasource"></e-schedule-eventsettings>
</ejs-schedule>

<script id="footer-template" type="text/x-template">
    <div class="custom-footer">
        ${if (elementType == "cell")}
        <button id="custom-add" class="e-flat e-primary">Save</button>
        ${else}
        <button id="custom-delete" class="e-flat">Remove</button>
        <button id="custom-edit" class="e-flat e-primary">Edit</button>
        ${/if}
    </div>
</script>
```

## Tooltips

### Enabling Tooltips

```cshtml
<ejs-schedule id="schedule" width="100%" height="550">
    <e-schedule-eventsettings 
        dataSource="ViewBag.datasource"
        enableTooltip="true">
    </e-schedule-eventsettings>
</ejs-schedule>
```

### Custom Tooltip Template

```cshtml
<ejs-schedule id="schedule" width="100%" height="550">
    <e-schedule-eventsettings
        dataSource="ViewBag.datasource"
        enableTooltip="true"
        tooltipTemplate="#eventTooltip">
    </e-schedule-eventsettings>
</ejs-schedule>

<script id="eventTooltip" type="text/x-template">
    <div class="event-tooltip">
        <div class="event-title">${Subject}</div>
        <div class="event-location">${Location}</div>
        <div class="event-time">
            ${StartTime.toLocaleString()} - ${EndTime.toLocaleString()}
        </div>
    </div>
</script>
```

### Preventing Tooltip on Specific Events

```cshtml
<ejs-schedule id="schedule" width="100%" height="550" tooltipOpen="onTooltipOpen">
    <e-schedule-eventsettings dataSource="ViewBag.datasource" enableTooltip="true"></e-schedule-eventsettings>
</ejs-schedule>

<script>
function onTooltipOpen(args) {
    if (args.data && (args.data.IsReadonly || args.data.IsBlock)) {
        args.cancel = true;
    }
}
</script>
```

## Related references
- [Editor, Event, and Cell Templates](customization-templates.md)
- [Rendering and Styling](customization-rendering-and-styling.md)
