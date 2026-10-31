# Getting Started with Syncfusion TypeScript Scheduler

## Table of Contents
- [Installation and Configuration](#installation-and-configuration)
- [CSS Imports and Themes](#css-imports-and-themes)
- [Module Injection](#module-injection)
- [Initialize the Scheduler](#initialize-the-scheduler)
- [Populating Appointments](#populating-appointments)
- [Setting Date and View](#setting-date-and-view)
- [Individual View Customization](#individual-view-customization)

---

## Installation and Configuration

Clone the EJ2 quickstart project and install dependencies:

Map the Scheduler packages in `src/system.config.js`:

```javascript
System.config({
    paths: {
        'syncfusion:': './node_modules/@syncfusion/',
    },
    map: {
        app: 'app',
        "@syncfusion/ej2-base": "syncfusion:ej2-base/dist/ej2-base.umd.min.js",
        "@syncfusion/ej2-data": "syncfusion:ej2-data/dist/ej2-data.umd.min.js",
        "@syncfusion/ej2-inputs": "syncfusion:ej2-inputs/dist/ej2-inputs.umd.min.js",
        "@syncfusion/ej2-buttons": "syncfusion:ej2-buttons/dist/ej2-buttons.umd.min.js",
        "@syncfusion/ej2-dropdowns": "syncfusion:ej2-dropdowns/dist/ej2-dropdowns.umd.min.js",
        "@syncfusion/ej2-compression": "syncfusion:ej2-compression/dist/ej2-compression.umd.min.js",
        "@syncfusion/ej2-file-utils": "syncfusion:ej2-file-utils/dist/ej2-file-utils.umd.min.js",
        "@syncfusion/ej2-splitbuttons": "syncfusion:ej2-splitbuttons/dist/ej2-splitbuttons.umd.min.js",
        "@syncfusion/ej2-lists": "syncfusion:ej2-lists/dist/ej2-lists.umd.min.js",
        "@syncfusion/ej2-navigations": "syncfusion:ej2-navigations/dist/ej2-navigations.umd.min.js",
        "@syncfusion/ej2-popups": "syncfusion:ej2-popups/dist/ej2-popups.umd.min.js",
        "@syncfusion/ej2-calendars": "syncfusion:ej2-calendars/dist/ej2-calendars.umd.min.js",
        "@syncfusion/ej2-excel-export": "syncfusion:ej2-excel-export/dist/ej2-excel-export.umd.min.js",
        "@syncfusion/ej2-schedule": "syncfusion:ej2-schedule/dist/ej2-schedule.umd.min.js"
    },
    packages: {
        'app': { main: 'app', defaultExtension: 'js' }
    }
});

System.import('app');
```

---

## CSS Imports and Themes

Import the required CSS files in `src/styles/styles.css`:

```css
@import '../../node_modules/@syncfusion/ej2-base/styles/fluent2.css';
@import '../../node_modules/@syncfusion/ej2-buttons/styles/fluent2.css';
@import '../../node_modules/@syncfusion/ej2-calendars/styles/fluent2.css';
@import '../../node_modules/@syncfusion/ej2-dropdowns/styles/fluent2.css';
@import '../../node_modules/@syncfusion/ej2-inputs/styles/fluent2.css';
@import '../../node_modules/@syncfusion/ej2-splitbuttons/styles/fluent2.css';
@import '../../node_modules/@syncfusion/ej2-lists/styles/fluent2.css';
@import '../../node_modules/@syncfusion/ej2-navigations/styles/fluent2.css';
@import '../../node_modules/@syncfusion/ej2-popups/styles/fluent2.css';
@import '../../node_modules/@syncfusion/ej2-schedule/styles/fluent2.css';
```

Alternatively, use the single combined CSS:

```css
@import '../../node_modules/@syncfusion/ej2/fluent2.css';
```

---

## Module Injection

Each view type in the Scheduler is an individual module. Inject only the modules needed — this keeps bundle sizes lean. Missing injection will cause a script error when that view is used.

Available modules:

| Module | Purpose |
|--------|---------|
| `Day` | Day view |
| `Week` | Week view |
| `WorkWeek` | Work Week view |
| `Month` | Month view |
| `Agenda` | Agenda view |
| `MonthAgenda` | Month Agenda view |
| `TimelineViews` | TimelineDay, TimelineWeek, TimelineWorkWeek views |
| `TimelineMonth` | Timeline Month view |
| `DragAndDrop` | Drag and drop appointments |
| `Resize` | Resize appointments |

Inject modules using `Schedule.Inject()` **before** instantiating the Scheduler:

```typescript
import { Schedule, Day, Week, WorkWeek, Month, Agenda, MonthAgenda } from '@syncfusion/ej2-schedule';

Schedule.Inject(Day, Week, WorkWeek, Month, Agenda, MonthAgenda);
```

---

## Initialize the Scheduler

Add a `<div>` element in `index.html`:

```html
<body>
    <div id="Schedule"></div>
</body>
```

Initialize and append the Scheduler in `app.ts`:

```typescript
import { Schedule, Day, Week, WorkWeek, Month, Agenda } from '@syncfusion/ej2-schedule';

Schedule.Inject(Day, Week, WorkWeek, Month, Agenda);

let scheduleObj: Schedule = new Schedule();
scheduleObj.appendTo('#Schedule');
```

Run the app:

```bash
npm start
```

---

## Populating Appointments

Provide appointment data through `eventSettings.dataSource`. The `StartTime` and `EndTime` fields are mandatory.

**With default field names:**

```typescript
import { Schedule, Day, Week, WorkWeek, Month, Agenda } from '@syncfusion/ej2-schedule';

Schedule.Inject(Day, Week, WorkWeek, Month, Agenda);

let scheduleObj: Schedule = new Schedule({
    height: '550px',
    selectedDate: new Date(2018, 1, 15),
    eventSettings: {
        dataSource: [{
            Id: 1,
            Subject: 'Meeting',
            StartTime: new Date(2018, 1, 15, 10, 0),
            EndTime: new Date(2018, 1, 15, 12, 30)
        }]
    }
});
scheduleObj.appendTo('#Schedule');
```

**With custom field names** — use `eventSettings.fields` to map your data model:

```typescript
import { Schedule, Day, Week, WorkWeek, Month, Agenda } from '@syncfusion/ej2-schedule';

let data: object[] = [{
    Id: 2,
    EventName: 'Meeting',
    StartTime: new Date(2018, 1, 15, 10, 0),
    EndTime: new Date(2018, 1, 15, 12, 30),
    IsAllDay: false
}];

Schedule.Inject(Day, Week, WorkWeek, Month, Agenda);

let scheduleObj: Schedule = new Schedule({
    height: '550px',
    selectedDate: new Date(2018, 1, 15),
    eventSettings: {
        dataSource: data,
        fields: {
            id: 'Id',
            subject: { name: 'EventName' },
            isAllDay: { name: 'IsAllDay' },
            startTime: { name: 'StartTime' },
            endTime: { name: 'EndTime' }
        }
    }
});
scheduleObj.appendTo('#Schedule');
```

---

## Setting Date and View

**Set the displayed date** using `selectedDate` (defaults to current system date):

```typescript
let scheduleObj: Schedule = new Schedule({
    height: '550px',
    selectedDate: new Date(2018, 1, 15)
});
scheduleObj.appendTo('#Schedule');
```

**Set the current view** using `currentView`. The default is `'Week'`. Available values:

- `Day`, `Week`, `WorkWeek`, `Month`, `Year`
- `Agenda`, `MonthAgenda`
- `TimelineDay`, `TimelineWeek`, `TimelineWorkWeek`, `TimelineMonth`, `TimelineYear`

```typescript
let scheduleObj: Schedule = new Schedule({
    height: '550px',
    selectedDate: new Date(2018, 1, 15),
    currentView: 'Month'
});
scheduleObj.appendTo('#Schedule');
```

---

## Individual View Customization

Use the `views` property as an array of objects to configure each view independently. For example, set different `startHour`/`endHour` per view or hide weekends only in Month view:

```typescript
import { Schedule, Week, WorkWeek, Month } from '@syncfusion/ej2-schedule';

Schedule.Inject(Week, WorkWeek, Month);

let scheduleObj: Schedule = new Schedule({
    width: '100%',
    height: '550px',
    selectedDate: new Date(2018, 1, 15),
    views: [
        { option: 'Week', startHour: '07:00', endHour: '15:00' },
        { option: 'WorkWeek', startHour: '10:00', endHour: '18:00' },
        { option: 'Month', showWeekend: false }
    ],
    eventSettings: { dataSource: defaultData }
});
scheduleObj.appendTo('#Schedule');
```

Each view object uses the `option` property to specify the view name, and then any combination of view-specific configuration options.
