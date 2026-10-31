# Scheduler Data Binding

## Table of Contents
- [Binding Local Data](#binding-local-data)
- [Binding Remote Data with ODataV4Adaptor](#binding-remote-data-with-odatav4adaptor)
- [Filter Events Using Built-in Query](#filter-events-using-built-in-query)
- [Using Custom Adaptor](#using-custom-adaptor)
- [Loading Data via AJAX](#loading-data-via-ajax)
- [Passing Additional Parameters](#passing-additional-parameters)
- [Handling Failure Actions](#handling-failure-actions)
- [CRUD via UrlAdaptor](#crud-via-urladaptor)
- [Binding Google Calendar](#binding-google-calendar)

---

## Binding Local Data

Assign a JavaScript object array to the `dataSource` property inside `eventSettings`:

```typescript
import { Schedule, Day, Week, WorkWeek, Month, Agenda } from '@syncfusion/ej2-schedule';

Schedule.Inject(Day, Week, WorkWeek, Month, Agenda);

let scheduleData: object[] = [{
    Id: 1,
    Subject: 'Explosion of Betelgeuse Star',
    StartTime: new Date(2018, 1, 15, 9, 30),
    EndTime: new Date(2018, 1, 15, 11, 0)
}, {
    Id: 2,
    Subject: 'Blue Moon Eclipse',
    StartTime: new Date(2018, 1, 13, 9, 30),
    EndTime: new Date(2018, 1, 13, 11, 0)
}];

let scheduleObj: Schedule = new Schedule({
    height: '550px',
    selectedDate: new Date(2018, 1, 15),
    eventSettings: { dataSource: scheduleData }
});
scheduleObj.appendTo('#Schedule');
```

> By default, `DataManager` uses `JsonAdaptor` for binding local data.

---

## Binding Remote Data with ODataV4Adaptor

```typescript
import { Schedule, Day, Week, WorkWeek, Month, Agenda } from '@syncfusion/ej2-schedule';
import { DataManager, ODataV4Adaptor } from '@syncfusion/ej2-data';

Schedule.Inject(Day, Week, WorkWeek, Month, Agenda);

let dataManager: DataManager = new DataManager({
    url: 'ur',
    adaptor: new ODataV4Adaptor(),
    crossDomain: true
});

let scheduleObj: Schedule = new Schedule({
    height: '550px',
    selectedDate: new Date(1996, 6, 9),
    readonly: true,
    eventSettings: {
        dataSource: dataManager,
        fields: {
            id: 'Id',
            subject: { name: 'ShipName' },
            location: { name: 'ShipCountry' },
            description: { name: 'ShipAddress' },
            startTime: { name: 'OrderDate' },
            endTime: { name: 'RequiredDate' },
            recurrenceRule: { name: 'ShipRegion' }
        }
    }
});
scheduleObj.appendTo('#Schedule');
```

---

## Filter Events Using Built-in Query

Set `includeFiltersInQuery: true` in `eventSettings` to have the Scheduler construct server-side filter queries based on the current view's start date, end date, and recurrence rule:

```typescript
import { Schedule, Day, Week, WorkWeek, Month, Agenda } from '@syncfusion/ej2-schedule';
import { DataManager, ODataV4Adaptor, Query } from '@syncfusion/ej2-data';

Schedule.Inject(Day, Week, WorkWeek, Month, Agenda);

let dataManager: DataManager = new DataManager({
    url: 'url',
    adaptor: new ODataV4Adaptor(),
    crossDomain: true
});

let scheduleObj: Schedule = new Schedule({
    height: '550px',
    selectedDate: new Date(1996, 6, 9),
    currentView: 'Month',
    readonly: true,
    eventSettings: {
        query: new Query(),
        includeFiltersInQuery: true,
        dataSource: dataManager,
        fields: {
            id: 'Id',
            subject: { name: 'ShipName' },
            location: { name: 'ShipCountry' },
            description: { name: 'ShipAddress' },
            startTime: { name: 'OrderDate' },
            endTime: { name: 'RequiredDate' },
            recurrenceRule: { name: 'ShipRegion' }
        }
    }
});
scheduleObj.appendTo('#Schedule');
```

---

## Using Custom Adaptor

Extend a built-in adaptor and override `processResponse` to add custom fields:

```typescript
import { Schedule, Day, Week, WorkWeek, Month, Agenda } from '@syncfusion/ej2-schedule';
import { DataManager, ODataV4Adaptor } from '@syncfusion/ej2-data';

Schedule.Inject(Day, Week, WorkWeek, Month, Agenda);

class CustomAdaptor extends ODataV4Adaptor {
    processResponse(): Object {
        let i: number = 0;
        let original: Object[] = super.processResponse.apply(this, arguments);
        original.forEach((item: Object) => item['EventID'] = ++i);
        return original;
    }
}

let dataManager: DataManager = new DataManager({
    url: 'url',
    adaptor: new CustomAdaptor()
});

let scheduleObj: Schedule = new Schedule({
    height: '550px',
    selectedDate: new Date(1996, 6, 9),
    readonly: true,
    eventSettings: {
        dataSource: dataManager,
        fields: {
            id: 'Id',
            subject: { name: 'ShipName' },
            startTime: { name: 'OrderDate' },
            endTime: { name: 'RequiredDate' }
        }
    }
});
scheduleObj.appendTo('#Schedule');
```

---

## Loading Data via AJAX

Fetch data externally and assign it in the `onSuccess` callback:

```typescript
import { Ajax } from '@syncfusion/ej2-base';
import { Schedule, Day, Week, WorkWeek, Month, Agenda } from '@syncfusion/ej2-schedule';

Schedule.Inject(Day, Week, WorkWeek, Month, Agenda);

let dataManager: object = [];
let ajax = new Ajax('Home/GetData', 'GET', false);
ajax.onSuccess = function (value) {
    dataManager = value;
};
ajax.send();

let scheduleObj: Schedule = new Schedule({
    height: '550px',
    selectedDate: new Date(2017, 5, 11),
    eventSettings: { dataSource: dataManager }
});
scheduleObj.appendTo('#Schedule');
```

---

## Passing Additional Parameters

Use `Query.addParams()` and assign to `eventSettings.query`:

```typescript
import { Schedule, Day, Week, WorkWeek, Month, Agenda } from '@syncfusion/ej2-schedule';
import { DataManager, ODataV4Adaptor, Query } from '@syncfusion/ej2-data';

Schedule.Inject(Day, Week, WorkWeek, Month, Agenda);

let dataManager: DataManager = new DataManager({
    url: 'url',
    adaptor: new ODataV4Adaptor()
});
let dataQuery: Query = new Query().addParams('readOnly', 'true');

let scheduleObj: Schedule = new Schedule({
    height: '550px',
    selectedDate: new Date(1996, 6, 9),
    readonly: true,
    eventSettings: {
        dataSource: dataManager,
        query: dataQuery,
        fields: {
            id: 'Id',
            subject: { name: 'ShipName' },
            startTime: { name: 'OrderDate' },
            endTime: { name: 'RequiredDate' }
        }
    }
});
scheduleObj.appendTo('#Schedule');
```

> Parameters added using `query` are sent with every data request.

---

## Handling Failure Actions

Use the `actionFailure` event to handle server errors:

```typescript
import { Schedule, Day, Week, WorkWeek, Month, Agenda } from '@syncfusion/ej2-schedule';
import { DataManager } from '@syncfusion/ej2-data';

Schedule.Inject(Day, Week, WorkWeek, Month, Agenda);

let dataManager: DataManager = new DataManager({
    url: 'http://some.com/invalidUrl'
});

let scheduleObj: Schedule = new Schedule({
    height: '550px',
    selectedDate: new Date(2017, 5, 11),
    eventSettings: { dataSource: dataManager },
    actionFailure: () => {
        let span: HTMLElement = document.createElement('span');
        scheduleObj.element.parentNode.insertBefore(span, scheduleObj.element);
        span.style.color = '#FF0000';
        span.innerHTML = 'Server exception: 404 Not found';
    }
});
scheduleObj.appendTo('#Schedule');
```

> `actionFailure` triggers when the server returns errors or an exception occurs during any Scheduler CRUD action.

---

## CRUD via UrlAdaptor

Use `UrlAdaptor` with `url` (read) and `crudUrl` (write) for full CRUD support:

```typescript
import { Schedule, Day, Week, WorkWeek, Month, Agenda } from '@syncfusion/ej2-schedule';
import { DataManager, UrlAdaptor } from '@syncfusion/ej2-data';

Schedule.Inject(Day, Week, WorkWeek, Month, Agenda);

let dataManager: DataManager = new DataManager({
    url: 'Home/GetData',
    crudUrl: 'Home/UpdateData',
    adaptor: new UrlAdaptor()
});

let scheduleObj: Schedule = new Schedule({
    height: '550px',
    selectedDate: new Date(2017, 5, 5),
    eventSettings: { dataSource: dataManager }
});
scheduleObj.appendTo('#Schedule');
```

---

## Binding Google Calendar

Map Google Calendar events in the `dataBinding` event:

```typescript
import { Schedule, Day, Week, WorkWeek, Month, Agenda } from '@syncfusion/ej2-schedule';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';

Schedule.Inject(Day, Week, WorkWeek, Month, Agenda);

const CALENDAR_ID: string = 'YOUR CALENDAR ID';
const PUBLIC_KEY: string = 'YOUR_GOOGLE_API_KEY';

let dataManager: DataManager = new DataManager({
    url: 'url' + CALENDAR_ID + '/events?key=' + PUBLIC_KEY,
    adaptor: new WebApiAdaptor(),
    crossDomain: true
});

let scheduleObj: Schedule = new Schedule({
    height: '550px',
    readonly: true,
    currentView: 'Month',
    timezone: 'UTC',
    eventSettings: { dataSource: dataManager },
    dataBinding: (e: { [key: string]: Object }) => {
        let items: { [key: string]: Object }[] = (e.result as { [key: string]: Object }).items as { [key: string]: Object }[];
        let scheduleData: Object[] = [];
        if (items.length > 0) {
            for (let i: number = 0; i < items.length; i++) {
                let event: { [key: string]: Object } = items[i];
                let start: string = ((event.start as { [key: string]: Object }).dateTime as string)
                    || ((event.start as { [key: string]: Object }).date as string);
                let end: string = ((event.end as { [key: string]: Object }).dateTime as string)
                    || ((event.end as { [key: string]: Object }).date as string);
                scheduleData.push({
                    Id: event.id,
                    Subject: event.summary,
                    StartTime: new Date(start),
                    EndTime: new Date(end),
                    IsAllDay: !(event.start as { [key: string]: Object }).dateTime
                });
            }
        }
        e.result = scheduleData;
    }
});
scheduleObj.appendTo('#Schedule');
```
