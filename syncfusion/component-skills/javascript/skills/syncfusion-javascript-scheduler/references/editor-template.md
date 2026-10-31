# Scheduler Editor Template and Popups

## Table of Contents
- [Editor Window Overview](#editor-window-overview)
- [Changing Editor Header and Footer Text](#changing-editor-header-and-footer-text)
- [Changing Label Text of Editor Fields](#changing-label-text-of-editor-fields)
- [Field Validation](#field-validation)
- [Add Additional Fields to Default Editor](#add-additional-fields-to-default-editor)
- [Customize Default Time Duration](#customize-default-time-duration)
- [Prevent Popup Opening](#prevent-popup-opening)
- [Custom Editor Template with editorTemplate](#custom-editor-template-with-editortemplate)
- [Custom Editor Header and Footer Templates](#custom-editor-header-and-footer-templates)
- [Quick Info Templates](#quick-info-templates)

---

## Editor Window Overview

The editor window opens when:
- **Cell double-click** — opens in "Add new" mode
- **Event double-click** — opens in "Edit" mode
- **Mobile** — tap edit icon in popup that appears when single-tapping an event

> Prevent opening by setting `readonly: true` or using `args.cancel = true` in `popupOpen`.

---

## Changing Editor Header and Footer Text

Use `L10n.load()` to customize localized strings:

```typescript
import { L10n } from '@syncfusion/ej2-base';
import { Schedule, Day, Week, TimelineViews, Month, Agenda } from '@syncfusion/ej2-schedule';

Schedule.Inject(Day, Week, TimelineViews, Month, Agenda);

L10n.load({
    'en-US': {
        'schedule': {
            'saveButton': 'Add',
            'cancelButton': 'Close',
            'deleteButton': 'Remove',
            'newEvent': 'Add Event',
        },
    }
});

let scheduleObj: Schedule = new Schedule({
    width: '100%',
    height: '550px',
    selectedDate: new Date(2018, 1, 15),
    views: ['TimelineDay', 'Day', 'Week', 'Month', 'Agenda'],
    eventSettings: { dataSource: [] }
});
scheduleObj.appendTo('#Schedule');
```

---

## Changing Label Text of Editor Fields

Use the `title` property in each field of `eventSettings.fields`:

```typescript
let scheduleObj: Schedule = new Schedule({
    width: '100%',
    height: '550px',
    selectedDate: new Date(2018, 1, 15),
    views: ['Day', 'Week', 'TimelineWeek', 'Month', 'Agenda'],
    eventSettings: {
        dataSource: [],
        fields: {
            id: 'Id',
            subject: { name: 'Subject', title: 'Event Name' },
            location: { name: 'Location', title: 'Event Location' },
            description: { name: 'Description', title: 'Event Description' },
            startTime: { name: 'StartTime', title: 'Start Duration' },
            endTime: { name: 'EndTime', title: 'End Duration' }
        }
    }
});
scheduleObj.appendTo('#Schedule');
```

---

## Field Validation

Add validation rules to event fields using the `validation` property:

```typescript
let minValidation: (args: { [key: string]: string }) => boolean =
    (args: { [key: string]: string }) => args['value'].length >= 5;

let scheduleObj: Schedule = new Schedule({
    width: '100%',
    height: '500px',
    selectedDate: new Date(2018, 1, 15),
    eventSettings: {
        dataSource: [],
        fields: {
            id: 'Id',
            subject: { name: 'Subject', validation: { required: true } },
            location: { name: 'Location', validation: { required: true } },
            description: {
                name: 'Description',
                validation: {
                    required: true,
                    minLength: [minValidation, 'Need at least 5 letters to be entered']
                }
            },
            startTime: { name: 'StartTime', validation: { required: true } },
            endTime: { name: 'EndTime', validation: { required: true } }
        }
    }
});
scheduleObj.appendTo('#Schedule');
```

---

## Add Additional Fields to Default Editor

Use `popupOpen` event with `args.type === 'Editor'` to append custom fields:

```typescript
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { createElement } from '@syncfusion/ej2-base';
import { Schedule, Day, Week, WorkWeek, Month, PopupOpenEventArgs } from '@syncfusion/ej2-schedule';

Schedule.Inject(Day, Week, WorkWeek, Month);

let scheduleObj: Schedule = new Schedule({
    width: '100%',
    height: '550px',
    selectedDate: new Date(2018, 1, 15),
    views: ['Day', 'Week', 'WorkWeek', 'Month'],
    popupOpen: (args: PopupOpenEventArgs) => {
        if (args.type === 'Editor') {
            if (!args.element.querySelector('.custom-field-row')) {
                let row: HTMLElement = createElement('div', { className: 'custom-field-row' });
                let formElement: HTMLElement = args.element.querySelector('.e-schedule-form');
                formElement.firstChild.insertBefore(row, args.element.querySelector('.e-title-location-row'));
                let container: HTMLElement = createElement('div', { className: 'custom-field-container' });
                let inputEle: HTMLInputElement = createElement('input', {
                    className: 'e-field', attrs: { name: 'EventType' }
                }) as HTMLInputElement;
                container.appendChild(inputEle);
                row.appendChild(container);
                let dropDownList: DropDownList = new DropDownList({
                    dataSource: [
                        { text: 'Public Event', value: 'public-event' },
                        { text: 'Maintenance', value: 'maintenance' },
                        { text: 'Commercial Event', value: 'commercial-event' },
                        { text: 'Family Event', value: 'family-event' }
                    ],
                    fields: { text: 'text', value: 'value' },
                    value: (args.data as { [key: string]: Object }).EventType as string,
                    floatLabelType: 'Always',
                    placeholder: 'Event Type'
                });
                dropDownList.appendTo(inputEle);
                inputEle.setAttribute('name', 'EventType');
            }
        }
    },
    eventSettings: { dataSource: [] }
});
scheduleObj.appendTo('#Schedule');
```

> Custom field elements must have the `e-field` CSS class and a `name` attribute matching the data field name.

---

## Customize Default Time Duration

Change the time interval in the editor's date-time picker via `args.duration` in `popupOpen`:

```typescript
import { Schedule, Day, Week, WorkWeek, Month, PopupOpenEventArgs } from '@syncfusion/ej2-schedule';

Schedule.Inject(Day, Week, WorkWeek, Month);

let scheduleObj: Schedule = new Schedule({
    width: '100%',
    height: '550px',
    selectedDate: new Date(2018, 1, 15),
    views: ['Day', 'Week', 'WorkWeek', 'Month'],
    popupOpen: (args: PopupOpenEventArgs) => {
        if (args.type === 'Editor') {
            args.duration = 60;   // 60-minute intervals instead of default 30
        }
    },
    eventSettings: { dataSource: [] }
});
scheduleObj.appendTo('#Schedule');
```

---

## Prevent Popup Opening

Set `args.cancel = true` inside `popupOpen` to prevent any popup from opening:

```typescript
import { Schedule, Day, Week, WorkWeek, Month, PopupOpenEventArgs } from '@syncfusion/ej2-schedule';

Schedule.Inject(Day, Week, WorkWeek, Month);

let scheduleObj: Schedule = new Schedule({
    width: '100%',
    height: '550px',
    selectedDate: new Date(2018, 1, 15),
    views: ['Day', 'Week', 'WorkWeek', 'Month'],
    popupOpen: (args: PopupOpenEventArgs) => {
        args.cancel = true;   // prevent all popups
    },
    eventSettings: { dataSource: [] }
});
scheduleObj.appendTo('#Schedule');
```

---

## Custom Editor Template with editorTemplate

Replace the entire editor form with a custom template using `editorTemplate`:

```typescript
import { DateTimePicker } from '@syncfusion/ej2-calendars';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { Schedule, Day, Week, WorkWeek, Month, Agenda, PopupOpenEventArgs } from '@syncfusion/ej2-schedule';

Schedule.Inject(Day, Week, WorkWeek, Month, Agenda);

let scheduleObj: Schedule = new Schedule({
    width: '100%',
    height: '550px',
    selectedDate: new Date(2018, 1, 15),
    showQuickInfo: false,
    editorTemplate: '#EventEditorTemplate',
    popupOpen: (args: PopupOpenEventArgs) => {
        if (args.type === 'Editor') {
            // Initialize DropDownList on the status input
            let statusElement: HTMLInputElement = args.element.querySelector('#EventType') as HTMLInputElement;
            if (!statusElement.classList.contains('e-dropdownlist')) {
                let dropDownListObject: DropDownList = new DropDownList({
                    placeholder: 'Choose status',
                    value: statusElement.value,
                    dataSource: ['New', 'Requested', 'Confirmed']
                });
                dropDownListObject.appendTo(statusElement);
            }
            // Initialize DateTimePicker on start/end inputs
            let startElement: HTMLInputElement = args.element.querySelector('#StartTime') as HTMLInputElement;
            if (!startElement.classList.contains('e-datetimepicker')) {
                new DateTimePicker({ value: new Date(startElement.value) || new Date() }, startElement);
            }
            let endElement: HTMLInputElement = args.element.querySelector('#EndTime') as HTMLInputElement;
            if (!endElement.classList.contains('e-datetimepicker')) {
                new DateTimePicker({ value: new Date(endElement.value) || new Date() }, endElement);
            }
        }
    },
    eventSettings: { dataSource: [] }
});
scheduleObj.appendTo('#Schedule');
```

**HTML template** (inside a `<script id="EventEditorTemplate" type="text/x-template">` tag):
```html
<table class="custom-event-editor" width="100%" cellpadding="5">
    <tbody>
        <tr>
            <td class="e-textlabel">Summary</td>
            <td colspan="4">
                <input id="Subject" class="e-field e-input" type="text" value="" name="Subject" style="width: 100%" />
            </td>
        </tr>
        <tr>
            <td class="e-textlabel">Status</td>
            <td colspan="4">
                <input type="text" id="EventType" name="EventType" class="e-field" style="width: 100%" />
            </td>
        </tr>
        <tr>
            <td class="e-textlabel">From</td>
            <td colspan="4">
                <input id="StartTime" class="e-field" type="text" name="StartTime" />
            </td>
        </tr>
        <tr>
            <td class="e-textlabel">To</td>
            <td colspan="4">
                <input id="EndTime" class="e-field" type="text" name="EndTime" />
            </td>
        </tr>
        <tr>
            <td class="e-textlabel">Reason</td>
            <td colspan="4">
                <textarea id="Description" class="e-field e-input" name="Description" rows="3" cols="50"
                    style="width: 100%; height: 60px !important; resize: vertical"></textarea>
            </td>
        </tr>
    </tbody>
</table>
```

> Each template field must have `class="e-field"` and a `name` attribute. Supported components: **DropDownList**, **DateTimePicker**, **MultiSelect**, **DatePicker**, **CheckBox**, **TextBox**.

---

## Custom Editor Header and Footer Templates

Use `editorHeaderTemplate` and `editorFooterTemplate` to customize the editor header and footer:

```typescript
let scheduleObj: Schedule = new Schedule({
    height: '550px',
    editorHeaderTemplate: '#editorHeaderTemplate',
    editorFooterTemplate: '#editorFooterTemplate',
    eventSettings: { dataSource: [] }
});
scheduleObj.appendTo('#Schedule');
```

---

## Quick Info Templates

Customize the quick popup window using `quickInfoTemplates` with `header`, `content`, and `footer` sub-options:

```typescript
import { Schedule, Day, Week, WorkWeek } from '@syncfusion/ej2-schedule';

Schedule.Inject(Day, Week, WorkWeek);

let scheduleObj: Schedule = new Schedule({
    height: '550px',
    selectedDate: new Date(2018, 3, 1),
    quickInfoTemplates: {
        header: '#headerTemplate',
        content: '#contentTemplate',
        footer: '#footerTemplate'
    },
    eventSettings: { dataSource: [] }
});
scheduleObj.appendTo('#Schedule');
```

**Template using `elementType`** to differentiate cell vs. event popups:
```html
<!-- header template -->
<script id="headerTemplate" type="text/x-template">
    <div>
        ${if (elementType === 'cell')}
        <div class="e-cell-header">
            <div class="e-header-icon-wrapper">
                <button class="e-close" title="Close"></button>
            </div>
        </div>
        ${else}
        <div class="e-event-header">
            <div class="e-header-icon-wrapper">
                <button class="e-close" title="CLOSE"></button>
            </div>
        </div>
        ${/if}
    </div>
</script>

<!-- content template -->
<script id="contentTemplate" type="text/x-template">
    <div>
        ${if (elementType === 'cell')}
        <div class="e-cell-content">
            <form class="e-schedule-form">
                <div><input class="subject e-field" type="text" name="Subject" placeholder="Title"></div>
                <div><input class="location e-field" type="text" name="Location" placeholder="Location"></div>
            </form>
        </div>
        ${else}
        <div class="e-event-content">
            ${if (Subject)}<div class="subject">${Subject}</div>${/if}
            ${if (Location)}<div class="location">${Location}</div>${/if}
        </div>
        ${/if}
    </div>
</script>

<!-- footer template -->
<script id="footerTemplate" type="text/x-template">
    <div>
        ${if (elementType === 'cell')}
        <div class="e-cell-footer">
            <button class="e-event-details" title="Additional Details">Additional Details</button>
            <button class="e-event-create" title="Add">Add</button>
        </div>
        ${else}
        <div class="e-event-footer">
            <button class="e-event-edit" title="Edit">Edit</button>
            <button class="e-event-delete" title="Delete">Delete</button>
        </div>
        ${/if}
    </div>
</script>
```

### popupOpen Event Args

| Property | Description |
|----------|-------------|
| `args.type` | Type of popup: `'Editor'`, `'QuickInfo'`, `'DeleteAlert'`, `'RecurrenceAlert'`, `'ValidationAlert'`, `'ViewEventInfo'` |
| `args.cancel` | Set to `true` to prevent popup opening |
| `args.duration` | Set in Editor type to change time slot interval (minutes) |
| `args.data` | Current event data |
| `args.element` | The popup DOM element |
