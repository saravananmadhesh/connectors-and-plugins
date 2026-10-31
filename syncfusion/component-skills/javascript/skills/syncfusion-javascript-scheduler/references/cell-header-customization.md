# Cell & Header Customization Reference

## Table of contents

- [Cell Customization](#cell-customization)
    - [`cellTemplate` Property](#celltemplate-property)
    - [`renderCell` Event](#rendercell-event)
    - [`RenderCellEventArgs` Properties](#rendercelleventargs-properties)
    - [`elementType` Values](#elementtype-values)
    - [`cellHeaderTemplate` Property](#cellheadertemplate-property)
    - [`isSlotAvailable()` Method](#isslotavailable-method)
    - [`allowMultiCellSelection` and `allowMultiRowSelection` Properties](#allowmulticellselection-and-allowmultirowselection-properties)
    - [`minDate` and `maxDate` Properties](#mindate-and-maxdate-properties)
- [Header Bar Customization](#header-bar-customization)
    - [`showHeaderBar` Property](#showheaderbar-property)
    - [`toolbarItems` Property](#toolbaritems-property)
    - [Adding Custom Items via `actionBegin`](#adding-custom-items-via-actionbegin)
    - [`dateHeaderTemplate` Property](#dateheadertemplate-property)
    - [`dateRangeTemplate` Property](#daterangetemplate-property)
    - [`enableAdaptiveUI` Property](#enableadaptiveui-property)
    - [Weekend Cell Styling via `renderCell`](#weekend-cell-styling-via-rendercell)
    - [Cell Dimension Customization](#cell-dimension-customization)

## Cell Customization

### `cellTemplate` Property

Customize cell background using HTML content based on date values. Accepts a template string. Available data properties: `date` (Date), `type` (string).

```ts
import { Schedule, Day, Week, Month, TimelineViews } from '@syncfusion/ej2-schedule';

Schedule.Inject(Day, Week, Month, TimelineViews);

(window as TemplateFunction).getWorkCellText = (date: Date) => {
    let weekEnds: number[] = [0, 6];
    if (weekEnds.indexOf(date.getDay()) >= 0) {
        return "<img src='path/to/icon.svg' />";
    }
    return '';
};

interface TemplateFunction extends Window {
    getWorkCellText?: Function;
}

let scheduleObj: Schedule = new Schedule({
    width: '100%',
    height: '550px',
    views: ['Day', 'Week', 'TimelineWeek', 'Month'],
    cssClass: 'schedule-cell-template',
    cellTemplate: '${if(type === "workCells")}<div class="templatewrap">${getWorkCellText(data.date)}</div>${/if}${if(type === "monthCells")}<div class="templatewrap">${getMonthCellText(data.date)}</div>${/if}',
    selectedDate: new Date(2017, 11, 16)
});
scheduleObj.appendTo('#Schedule');
```

> The `type` property in the template refers to the `elementType` of the cell (e.g., `"workCells"`, `"monthCells"`).

---

### `renderCell` Event

Triggered during rendering of each cell. Use for dynamic/conditional customizations. Provides a `RenderCellEventArgs` argument.

```ts
import { createElement } from '@syncfusion/ej2-base';
import { Schedule, Day, Week, Month, RenderCellEventArgs } from '@syncfusion/ej2-schedule';

Schedule.Inject(Day, Week, Month);

let scheduleObj: Schedule = new Schedule({
    height: '550px',
    selectedDate: new Date(2018, 1, 14),
    currentView: 'Month',
    views: ['Day', 'Week', 'Month'],
    renderCell: (args: RenderCellEventArgs) => {
        if (args.elementType == 'workCells' || args.elementType == 'monthCells') {
            let weekEnds: number[] = [0, 6];
            if (weekEnds.indexOf((args.date).getDay()) >= 0) {
                let ele: HTMLElement = createElement('div', {
                    innerHTML: "<img src='path/to/icon.svg' />",
                    className: 'templatewrap'
                });
                (args.element).appendChild(ele);
            }
        }
    },
    eventSettings: { dataSource: scheduleData }
});
scheduleObj.appendTo('#Schedule');
```

#### `RenderCellEventArgs` Properties

| Property | Type | Description |
|---|---|---|
| `elementType` | string | Type of cell being rendered (see table below) |
| `element` | HTMLElement | The cell DOM element |
| `date` | Date | Date associated with the cell |

#### `elementType` Values

| Value | Description |
|---|---|
| `dateHeader` | Header cells displaying dates |
| `monthDay` | Header cells in month view |
| `resourceHeader` | Resource header cells |
| `alldayCells` | All-day cells in Day/Week/WorkWeek views |
| `emptyCells` | Empty cells in the header bar |
| `resourceGroupCells` | Work cells for parent resources |
| `workCells` | Regular work cells |
| `monthCells` | Date cells in Month view |
| `majorSlot` | Major time slot cells |
| `minorSlot` | Minor time slot cells |
| `weekNumberCell` | Week number display cells |

---

### `cellHeaderTemplate` Property

Customize the month header of each date cell in Month view. Accepts a template string or HTMLElement. Data available: `date`.

```ts
import { Internationalization } from "@syncfusion/ej2-base";
import { Schedule, Month } from '@syncfusion/ej2-schedule';

Schedule.Inject(Month);

let instance: Internationalization = new Internationalization();
(window as TemplateFunction).getDate = (date: Date) => {
    return instance.formatDate(date, { skeleton: "Ed" });
};

interface TemplateFunction extends Window {
    getDate?: Function;
}

let scheduleObj: Schedule = new Schedule({
    width: '100%',
    height: '550px',
    views: ['Month'],
    cssClass: 'schedule-cell-header-template',
    cellHeaderTemplate: '<div class="cell-header-wrap">${getDate(data.date)}</div>'
});
scheduleObj.appendTo('#Schedule');
```

---

### `isSlotAvailable()` Method

Checks whether a time range is free of existing events (within the current view). Returns `false` if the slot is occupied.

> Only checks appointments within the current view's date range. Does not evaluate recurrence occurrences outside the visible range.

```ts
import { Schedule, Day, Week, WorkWeek, Month, ActionEventArgs, EventFieldsMapping } from '@syncfusion/ej2-schedule';

Schedule.Inject(Day, Week, WorkWeek, Month);

let scheduleObj: Schedule = new Schedule({
    height: '550px',
    selectedDate: new Date(2018, 1, 15),
    views: ['Day', 'Week', 'WorkWeek', 'Month'],
    actionBegin: (args: ActionEventArgs) => {
        if (args.requestType === 'eventCreate' && (<Object[]>args.data).length > 0) {
            let eventData: { [key: string]: Object } = args.data[0] as { [key: string]: Object };
            let eventField: EventFieldsMapping = scheduleObj.eventFields;
            let startDate: Date = eventData[eventField.startTime] as Date;
            let endDate: Date = eventData[eventField.endTime] as Date;
            args.cancel = !scheduleObj.isSlotAvailable(startDate, endDate);
        }
    },
    eventSettings: { dataSource: scheduleData }
});
scheduleObj.appendTo('#Schedule');
```

---

### `allowMultiCellSelection` and `allowMultiRowSelection` Properties

Control whether multiple cells/rows can be selected. Both default to `true`.

```ts
let scheduleObj: Schedule = new Schedule({
    allowMultiCellSelection: false,
    allowMultiRowSelection: false
});
```

---

### `minDate` and `maxDate` Properties

Restrict navigation to a specific date range. Dates outside the range are disabled.

```ts
let scheduleObj: Schedule = new Schedule({
    views: ['Day', 'Week', 'Month', 'Agenda', 'Year'],
    selectedDate: new Date(2018, 1, 17),
    minDate: new Date(2017, 4, 17),
    maxDate: new Date(2018, 5, 17),
    eventSettings: { dataSource: scheduleData }
});
```

> Default: `minDate` = `new Date(1900, 0, 1)`, `maxDate` = `new Date(2099, 11, 31)`.

---

## Header Bar Customization

### `showHeaderBar` Property

Show or hide the header bar (date navigation + view options). Default is `true`.

```ts
let scheduleObj: Schedule = new Schedule({
    views: ['Day', 'Week', 'WorkWeek'],
    showHeaderBar: false,
    eventSettings: { dataSource: scheduleData }
});
```

---

### `toolbarItems` Property

Add custom items to the Scheduler toolbar. Use `name` to include default items (`Previous`, `Next`, `Today`, `DateRangeText`, `NewEvent`, `Views`). For custom items, set `name: 'Custom'`.

```ts
import { Schedule, Month } from '@syncfusion/ej2-schedule';
import { DropDownList } from '@syncfusion/ej2-dropdowns';

Schedule.Inject(Month);

let scheduleObj: Schedule = new Schedule({
    views: ['Month'],
    toolbarItems: [
        { name: 'Previous', align: 'Left' },
        { name: 'Next', align: 'Left' },
        { name: 'DateRangeText', align: 'Left' },
        {
            type: 'Input', align: 'Center', template: new DropDownList({
                value: 1, width: 125,
                fields: { text: 'OwnerText', value: 'OwnerId' },
                dataSource: ownerCollections,
                change: onChange
            })
        },
        { name: 'Today', align: 'Right' }
    ],
    eventSettings: { dataSource: scheduleData }
});
```

---

### Adding Custom Items via `actionBegin`

Use `requestType === 'toolbarItemRendering'` in the `actionBegin` event to inject custom toolbar items.

```ts
import { Schedule, Month, ActionEventArgs, ToolbarActionArgs } from '@syncfusion/ej2-schedule';
import { ItemModel } from '@syncfusion/ej2-navigations';

Schedule.Inject(Month);

let scheduleObj: Schedule = new Schedule({
    views: ['Month'],
    actionBegin: (args: ActionEventArgs & ToolbarActionArgs) => {
        if (args.requestType === 'toolbarItemRendering') {
            let userIconItem: ItemModel = {
                align: 'Right', prefixIcon: 'user-icon', text: 'Nancy', cssClass: 'e-schedule-user-icon'
            };
            args.items.push(userIconItem);
        }
    },
    actionComplete: (args: ActionEventArgs) => {
        if (args.requestType === 'toolBarItemRendered') {
            let userIconEle: HTMLElement = scheduleObj.element.querySelector('.e-schedule-user-icon') as HTMLElement;
            // attach click handler
        }
    },
    eventSettings: { dataSource: scheduleData }
});
```

---

### `dateHeaderTemplate` Property

Customize date header cells in Day, Week, and Work Week views.

```ts
import { Schedule, Day, Week, Agenda, TimelineViews, TimelineMonth } from '@syncfusion/ej2-schedule';
import { Internationalization } from '@syncfusion/ej2-base';

Schedule.Inject(Day, Week, Agenda, TimelineViews, TimelineMonth);

let instance: Internationalization = new Internationalization();
(window as TemplateFunction).getDateHeaderText = (value: Date) => {
    return instance.formatDate(value, { skeleton: 'Ed' });
};

interface TemplateFunction extends Window {
    getDateHeaderText?: Function;
}

let scheduleObj: Schedule = new Schedule({
    views: ['Day', 'Week', 'Agenda', 'TimelineWorkWeek', 'TimelineMonth'],
    dateHeaderTemplate: '<div class="date-text">${getDateHeaderText(data.date)}</div>',
    cssClass: 'schedule-date-header-template',
    eventSettings: { dataSource: scheduleData }
});
scheduleObj.appendTo('#Schedule');
```

> In Month view, `dateHeaderTemplate` is not applicable. Use the `renderCell` event with `args.elementType === 'monthCells'` instead.

---

### `dateRangeTemplate` Property

Customize the date range text in the header bar. Available data: `startDate`, `endDate`, `currentView`.

```ts
(window as TemplateFunction).getDateRange = (value: Date) =>
    value.toLocaleString('en-us', { month: 'long' }) + ' ' + value.getFullYear();

let scheduleObj: Schedule = new Schedule({
    dateRangeTemplate: '<div class="date-text">${getDateRange(data.startDate)}-${getDateRange(data.endDate)}</div>'
});
```

---

### `enableAdaptiveUI` Property

Move view navigation options into a popup (useful for mobile). Default is `false`.

```ts
let scheduleObj: Schedule = new Schedule({
    enableAdaptiveUI: true,
    eventSettings: { dataSource: scheduleData }
});
```

---

### Weekend Cell Styling via `renderCell`

```ts
let scheduleObj: Schedule = new Schedule({
    cssClass: 'schedule-cell-customization',
    renderCell: (args: RenderCellEventArgs) => {
        if (args.elementType == "workCells") {
            if (args.date) {
                if (args.date.getDay() === 6) {
                    (args.element).style.background = '#ffdea2';
                }
                if (args.date.getDay() === 0) {
                    (args.element).style.background = '#ffdea2';
                }
            }
        }
    }
});
```

For Month view weekend cells, use CSS with `cssClass`:
```css
.schedule-cell-customization.e-schedule .e-month-view .e-work-cells:not(.e-work-days) {
    background-color: #f08080;
}
```

---

### Cell Dimension Customization

Use `cssClass` with custom CSS to adjust cell height/width:

```ts
let scheduleObj: Schedule = new Schedule({
    cssClass: 'schedule-cell-dimension',
    views: ['Day', 'Week', 'WorkWeek', 'Month'],
    eventSettings: { dataSource: scheduleData }
});
```

```css
.schedule-cell-dimension.e-schedule .e-vertical-view .e-work-cells {
    height: 100px;
}
.schedule-cell-dimension.e-schedule .e-month-view .e-work-cells {
    height: 200px;
}
```
