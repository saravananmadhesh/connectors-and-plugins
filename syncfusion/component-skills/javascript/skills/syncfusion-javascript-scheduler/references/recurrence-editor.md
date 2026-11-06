# Recurrence Editor Reference

## Table of contents

- [Overview](#overview)
- [Standalone RecurrenceEditor](#standalone-recurrenceeditor)
- [`frequencies` Property](#frequencies-property)
- [`endTypes` Property](#endtypes-property)
- [RecurrenceEditor Properties Table](#recurrenceeditor-properties-table)
- [`change` Event](#change-event)
- [`setRecurrenceRule()` Method](#setrecurrencerule-method)
- [`getRecurrenceDates()` Method](#getrecurrencedates-method)
- [Accessing Built-in Recurrence Editor in Scheduler](#accessing-built-in-recurrence-editor-in-scheduler)

## Overview

The `RecurrenceEditor` component is integrated into the Scheduler editor window by default. It can also be used as a standalone component from `@syncfusion/ej2-schedule`.

> All valid recurrence rule strings per the iCalendar RFC 5545 specification are supported.

---

## Standalone RecurrenceEditor

```ts
import { RecurrenceEditor } from '@syncfusion/ej2-schedule';

let recObject: RecurrenceEditor = new RecurrenceEditor({
    frequencies: ['daily', 'weekly'],
    endTypes: ['until', 'count']
});
recObject.appendTo('#RecurrenceEditor');
```

```html
<div id="RecurrenceEditor"></div>
```

---

## `frequencies` Property

Control which repeat type options appear. Default options: `none`, `daily`, `weekly`, `monthly`, `yearly`.

```ts
import { Schedule, Day, Week, WorkWeek, Month, Agenda, PopupOpenEventArgs } from '@syncfusion/ej2-schedule';

Schedule.Inject(Day, Week, WorkWeek, Month, Agenda);

let scheduleObj: Schedule = new Schedule({
    width: '100%',
    height: '550px',
    selectedDate: new Date(2018, 1, 15),
    eventSettings: { dataSource: scheduleData },
    popupOpen: (args: PopupOpenEventArgs): void => {
        if (args.type == 'Editor') {
            // Access built-in recurrence editor and limit frequency options
            scheduleObj.eventWindow.recurrenceEditor.frequencies = ['none', 'daily', 'weekly'];
        }
    }
});
scheduleObj.appendTo('#Schedule');
```

---

## `endTypes` Property

Limit the end-type options. Default options: `never`, `until`, `count`.

```ts
let recObject: RecurrenceEditor = new RecurrenceEditor({
    frequencies: ['daily', 'weekly'],
    endTypes: ['until', 'count']
});
recObject.appendTo('#RecurrenceEditor');
```

---

## RecurrenceEditor Properties Table

| Property | Type | Description |
|---|---|---|
| `frequencies` | string[] | Repeat type options: `'none'`, `'daily'`, `'weekly'`, `'monthly'`, `'yearly'` |
| `endTypes` | string[] | End type options: `'never'`, `'until'`, `'count'` |
| `firstDayOfWeek` | number | First day of week in the editor |
| `startDate` | Date | Start date for the recurrence |
| `dateFormat` | string | Date format used in the editor |
| `locale` | string | Locale applied to the editor |
| `cssClass` | string | Custom CSS class for styling |
| `enableRtl` | boolean | Render in RTL mode |
| `minDate` | Date | Minimum date in the editor |
| `maxDate` | Date | Maximum date in the editor |
| `value` | string | Current recurrence rule string |
| `selectedType` | number | Active repeat type (index) |

---

## `change` Event

Triggered whenever the user modifies the recurrence options. Provides the generated rule string via `args.value`.

```ts
import { RecurrenceEditor, RecurrenceEditorChangeEventArgs } from '@syncfusion/ej2-schedule';

let outputElement: HTMLElement = <HTMLElement>document.querySelector('#rule-output');

let recObject: RecurrenceEditor = new RecurrenceEditor({
    change: (args: RecurrenceEditorChangeEventArgs) => {
        if (args.value == "") {
            outputElement.innerText = 'Select Rule';
        } else {
            outputElement.innerText = args.value;
        }
    }
});
recObject.appendTo('#RecurrenceEditor');

outputElement.innerText = 'Select Rule';
```

---

## `setRecurrenceRule()` Method

Loads an existing recurrence rule string into the editor, populating all fields accordingly.

```ts
import { RecurrenceEditor, RecurrenceEditorChangeEventArgs } from '@syncfusion/ej2-schedule';

let recObject: RecurrenceEditor = new RecurrenceEditor({
    change: (args: RecurrenceEditorChangeEventArgs) => {
        outputElement.innerText = args.value;
    }
});
recObject.appendTo('#RecurrenceEditor');

// Load an existing rule
recObject.setRecurrenceRule('FREQ=DAILY;INTERVAL=2;COUNT=8');
outputElement.innerText = recObject.value as string;
```

---

## `getRecurrenceDates()` Method

Parses a recurrence rule string and returns an array of timestamps (as `number[]`) representing each occurrence.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `startDate` | Date | Yes | Appointment start date |
| `rule` | string | Yes | Recurrence rule string |
| `excludeDate` | string | No | ISO date string(s) to exclude |
| `maximumCount` | number | No | Max number of dates to generate |
| `viewDate` | Date | No | Current view range's first date |

```ts
import { createElement } from '@syncfusion/ej2-base';
import { RecurrenceEditor, RecurrenceEditorChangeEventArgs } from '@syncfusion/ej2-schedule';

let outputElement: HTMLElement = <HTMLElement>document.querySelector('#rule-output');

let recObject: RecurrenceEditor = new RecurrenceEditor({
    change: (args: RecurrenceEditorChangeEventArgs): void => {
        if (args.value == '') {
            outputElement.innerText = 'Select Rule';
        } else {
            outputElement.innerHTML = '';
            let dates: number[] = recObject.getRecurrenceDates(new Date(), args.value);
            for (let index: number = 0; index < dates.length; index++) {
                outputElement.appendChild(
                    createElement('div', { innerHTML: new Date(dates[index]).toString() })
                );
            }
        }
    }
});
recObject.appendTo('#RecurrenceEditor');

// Generate dates for a specific rule
let ruleString: string = 'FREQ=DAILY;INTERVAL=1';
recObject.setRecurrenceRule(ruleString);
let ruleStringDates: number[] = recObject.getRecurrenceDates(new Date(), ruleString);
```

---

## Accessing Built-in Recurrence Editor in Scheduler

Access the built-in recurrence editor through `scheduleObj.eventWindow.recurrenceEditor` inside the `popupOpen` event when `args.type == 'Editor'`.

```ts
popupOpen: (args: PopupOpenEventArgs): void => {
    if (args.type == 'Editor') {
        let recEditor = scheduleObj.eventWindow.recurrenceEditor;
        recEditor.frequencies = ['none', 'daily', 'weekly', 'monthly'];
        // Or read the current rule value:
        let currentRule: string = recEditor.value as string;
    }
}
```
