# Scheduler Resources and Grouping

## Table of Contents
- [Resource Fields Reference](#resource-fields-reference)
- [Resource Data Binding](#resource-data-binding)
- [Single-Level Grouping](#single-level-grouping)
- [Multi-Level Grouping](#multi-level-grouping)
- [Timeline Resource View](#timeline-resource-view)
- [Group by Date](#group-by-date)
- [Allow Group Edit (Shared Events)](#allow-group-edit-shared-events)
- [Customizing Resource Cells](#customizing-resource-cells)

---

## Resource Fields Reference

| Field | Type | Description |
|-------|------|-------------|
| `field` | String | Binds to the resource field in event data |
| `title` | String | Label shown in the editor window |
| `name` | String | Unique resource name for grouping |
| `allowMultiple` | Boolean | Allow selection of multiple resources for one event |
| `dataSource` | Object/DataManager | Resource data array or DataManager instance |
| `query` | Query | External query for remote data processing |
| `idField` | String | Binds the resource ID field name |
| `expandedField` | String | Boolean field — expanded/collapsed state in Timeline views |
| `textField` | String | Binds the display name field |
| `groupIDField` | String | Binds parent resource ID for hierarchical grouping |
| `colorField` | String | Binds a color field applied to events of this resource |
| `startHourField` | String | Different work start hour per resource |
| `endHourField` | String | Different work end hour per resource |
| `workDaysField` | String | Different working days per resource |
| `cssClassField` | String | Custom CSS class field for resource-specific event styling |

---

## Resource Data Binding

### Using Local JSON Data

```typescript
import { Schedule, Week, Month, Agenda, TimelineViews, TimelineMonth } from '@syncfusion/ej2-schedule';

Schedule.Inject(Week, Month, TimelineViews, TimelineMonth, Agenda);

let scheduleObj: Schedule = new Schedule({
    width: '100%',
    height: '550px',
    currentView: 'Week',
    views: ['Week', 'Month', 'TimelineWeek', 'TimelineMonth', 'Agenda'],
    selectedDate: new Date(2018, 3, 1),
    group: {
        resources: ['Owners']
    },
    resources: [{
        field: 'OwnerId',
        title: 'Owner',
        name: 'Owners',
        allowMultiple: true,
        dataSource: [
            { OwnerText: 'Nancy', Id: 1, OwnerColor: '#ffaa00' },
            { OwnerText: 'Steven', Id: 2, OwnerColor: '#f8a398' },
            { OwnerText: 'Michael', Id: 3, OwnerColor: '#7499e1' }
        ],
        textField: 'OwnerText',
        idField: 'Id',
        colorField: 'OwnerColor'
    }],
    eventSettings: { dataSource: [] }
});
scheduleObj.appendTo('#Schedule');
```

### Using Remote Service URL

```typescript
import { DataManager, UrlAdaptor } from '@syncfusion/ej2-data';
import { Schedule, Week, Month, Agenda, TimelineViews, TimelineMonth } from '@syncfusion/ej2-schedule';

Schedule.Inject(Week, Month, TimelineViews, TimelineMonth, Agenda);

let resource: DataManager = new DataManager({
    url: 'Home/GetResourceData',
    adaptor: new UrlAdaptor(),
    crossDomain: true
});

let scheduleObj: Schedule = new Schedule({
    width: '100%',
    height: '550px',
    currentView: 'Week',
    views: ['Week', 'Month', 'TimelineWeek', 'TimelineMonth', 'Agenda'],
    selectedDate: new Date(2018, 3, 1),
    group: {
        resources: ['Owners']
    },
    resources: [{
        field: 'OwnerId',
        title: 'Owner',
        name: 'Owners',
        allowMultiple: true,
        dataSource: resource,
        textField: 'OwnerText',
        idField: 'Id',
        colorField: 'OwnerColor'
    }],
    eventSettings: { dataSource: [] }
});
scheduleObj.appendTo('#Schedule');
```

---

## Single-Level Grouping

### Vertical Calendar View

```typescript
import { Schedule, Week, Month, Agenda } from '@syncfusion/ej2-schedule';

Schedule.Inject(Week, Month, Agenda);

let scheduleObj: Schedule = new Schedule({
    width: '100%',
    height: '550px',
    currentView: 'Week',
    views: ['Week', 'Month', 'Agenda'],
    selectedDate: new Date(2018, 3, 4),
    group: {
        byGroupID: false,
        resources: ['Projects', 'Categories']
    },
    resources: [
        {
            field: 'ProjectId', title: 'Choose Project', name: 'Projects',
            dataSource: [
                { text: 'PROJECT 1', id: 1, color: '#cb6bb2' },
                { text: 'PROJECT 2', id: 2, color: '#56ca85' },
                { text: 'PROJECT 3', id: 3, color: '#df5286' }
            ],
            textField: 'text', idField: 'id', colorField: 'color'
        },
        {
            field: 'TaskId', title: 'Category',
            name: 'Categories', allowMultiple: true,
            dataSource: [
                { text: 'Development', id: 1, color: '#df5286' },
                { text: 'Testing', id: 2, color: '#7fa900' }
            ],
            textField: 'text', idField: 'id', colorField: 'color'
        }
    ],
    eventSettings: { dataSource: [] }
});
scheduleObj.appendTo('#Schedule');
```

---

## Multi-Level Grouping

Define child resources with `groupIDField` pointing to the parent resource's ID:

```typescript
import { Schedule, TimelineViews, TimelineMonth, Agenda } from '@syncfusion/ej2-schedule';

Schedule.Inject(TimelineViews, TimelineMonth, Agenda);

let scheduleObj: Schedule = new Schedule({
    width: '100%',
    height: '550px',
    currentView: 'TimelineWeek',
    views: ['TimelineWeek', 'TimelineMonth', 'Agenda'],
    selectedDate: new Date(2018, 3, 4),
    group: {
        resources: ['Rooms', 'Owners']
    },
    resources: [
        {
            field: 'RoomId', title: 'Room',
            name: 'Rooms', allowMultiple: false,
            dataSource: [
                { RoomText: 'ROOM 1', Id: 1, RoomColor: '#cb6bb2' },
                { RoomText: 'ROOM 2', Id: 2, RoomColor: '#56ca85' }
            ],
            textField: 'RoomText', idField: 'Id', colorField: 'RoomColor'
        },
        {
            field: 'OwnerId', title: 'Owner',
            name: 'Owners', allowMultiple: true,
            dataSource: [
                { OwnerText: 'Nancy', Id: 1, OwnerGroupId: 1, OwnerColor: '#ffaa00' },
                { OwnerText: 'Steven', Id: 2, OwnerGroupId: 2, OwnerColor: '#f8a398' },
                { OwnerText: 'Michael', Id: 3, OwnerGroupId: 1, OwnerColor: '#7499e1' }
            ],
            textField: 'OwnerText', idField: 'Id', groupIDField: 'OwnerGroupId', colorField: 'OwnerColor'
        }
    ],
    eventSettings: { dataSource: [] }
});
scheduleObj.appendTo('#Schedule');
```

---

## Timeline Resource View

Identical structure to multi-level grouping but uses `TimelineViews` module:

```typescript
import { Schedule, TimelineViews, TimelineMonth } from '@syncfusion/ej2-schedule';

Schedule.Inject(TimelineViews, TimelineMonth);

let scheduleObj: Schedule = new Schedule({
    width: '100%',
    height: '550px',
    currentView: 'TimelineWeek',
    views: ['TimelineDay', 'TimelineWeek', 'TimelineMonth'],
    selectedDate: new Date(2018, 3, 4),
    group: {
        resources: ['Rooms', 'Owners']
    },
    resources: [
        {
            field: 'RoomId', title: 'Room', name: 'Rooms', allowMultiple: false,
            dataSource: [
                { RoomText: 'ROOM 1', Id: 1, RoomColor: '#cb6bb2' },
                { RoomText: 'ROOM 2', Id: 2, RoomColor: '#56ca85' }
            ],
            textField: 'RoomText', idField: 'Id', colorField: 'RoomColor'
        },
        {
            field: 'OwnerId', title: 'Owner', name: 'Owners', allowMultiple: true,
            dataSource: [
                { OwnerText: 'Nancy', Id: 1, OwnerGroupId: 1, OwnerColor: '#ffaa00' },
                { OwnerText: 'Steven', Id: 2, OwnerGroupId: 2, OwnerColor: '#f8a398' },
                { OwnerText: 'Michael', Id: 3, OwnerGroupId: 1, OwnerColor: '#7499e1' }
            ],
            textField: 'OwnerText', idField: 'Id', groupIDField: 'OwnerGroupId', colorField: 'OwnerColor'
        }
    ],
    eventSettings: { dataSource: [] }
});
scheduleObj.appendTo('#Schedule');
```

---

## Group by Date

Set `group.byDate: true` to display resources under each date column (only for calendar views: Day, Week, WorkWeek, Month, Agenda, MonthAgenda):

```typescript
import { Schedule, Week, Month, Agenda } from '@syncfusion/ej2-schedule';

Schedule.Inject(Month, Week, Agenda);

let scheduleObj: Schedule = new Schedule({
    width: '100%',
    height: '550px',
    views: ['Week', 'Month', 'Agenda'],
    selectedDate: new Date(2018, 3, 1),
    group: {
        byDate: true,
        resources: ['Owners']
    },
    resources: [{
        field: 'OwnerId', title: 'Owner',
        name: 'Owners', allowMultiple: true,
        dataSource: [
            { text: 'Alice', id: 1, color: '#1aaa55' },
            { text: 'Smith', id: 2, color: '#7fa900' }
        ],
        textField: 'text', idField: 'id', colorField: 'color'
    }],
    eventSettings: { dataSource: [] }
});
scheduleObj.appendTo('#Schedule');
```

> `group.byDate` is not applicable to Timeline views.
> `group.hideNonWorkingDays` only applies when `byDate: true`.

---

## Allow Group Edit (Shared Events)

Set `group.allowGroupEdit: true` to allow a single event to be shared by multiple resources. The resource field will hold an array of IDs:

```typescript
let scheduleObj: Schedule = new Schedule({
    width: '100%',
    height: '550px',
    currentView: 'TimelineWeek',
    views: ['TimelineWeek', 'TimelineMonth', 'Agenda'],
    selectedDate: new Date(2018, 5, 1),
    group: {
        resources: ['Owners'],
        allowGroupEdit: true
    },
    resources: [{
        field: 'OwnerId', title: 'Owner',
        name: 'Owners', allowMultiple: true,
        dataSource: [
            { text: 'Nancy', id: 1, color: '#ffaa00' },
            { text: 'Steven', id: 2, color: '#f8a398' },
            { text: 'Michael', id: 3, color: '#7499e1' }
        ],
        textField: 'text', idField: 'id', colorField: 'color'
    }],
    eventSettings: {
        dataSource: [{
            Id: 1,
            Subject: 'Conference',
            StartTime: new Date(2018, 5, 1, 10, 0),
            EndTime: new Date(2018, 5, 1, 11, 0),
            OwnerId: [1, 2, 3]      // shared among 3 resources
        }]
    }
});
scheduleObj.appendTo('#Schedule');
```

---

## Customizing Resource Cells

Use `renderCell` event with `args.elementType === 'resourceGroupCells'` to customize parent resource cells in Timeline views:

```typescript
import { Schedule, TimelineViews, TimelineMonth, RenderCellEventArgs } from '@syncfusion/ej2-schedule';

Schedule.Inject(TimelineViews, TimelineMonth);

let scheduleObj: Schedule = new Schedule({
    width: '100%',
    height: '550px',
    currentView: 'TimelineWeek',
    views: ['TimelineDay', 'TimelineWeek', 'TimelineMonth'],
    selectedDate: new Date(2018, 3, 4),
    group: {
        resources: ['Rooms', 'Owners']
    },
    resources: [
        {
            field: 'RoomId', title: 'Room', name: 'Rooms', allowMultiple: false,
            dataSource: [
                { RoomText: 'ROOM 1', Id: 1, RoomColor: '#cb6bb2' },
                { RoomText: 'ROOM 2', Id: 2, RoomColor: '#56ca85' }
            ],
            textField: 'RoomText', idField: 'Id', colorField: 'RoomColor'
        },
        {
            field: 'OwnerId', title: 'Owner', name: 'Owners', allowMultiple: true,
            dataSource: [
                { OwnerText: 'Nancy', Id: 1, OwnerGroupId: 1, OwnerColor: '#ffaa00' },
                { OwnerText: 'Steven', Id: 2, OwnerGroupId: 2, OwnerColor: '#f8a398' },
                { OwnerText: 'Michael', Id: 3, OwnerGroupId: 1, OwnerColor: '#7499e1' }
            ],
            textField: 'OwnerText', idField: 'Id', groupIDField: 'OwnerGroupId', colorField: 'OwnerColor'
        }
    ],
    eventSettings: { dataSource: [] },
    renderCell: (args: RenderCellEventArgs) => {
        if (args.elementType === 'resourceGroupCells' &&
            args.element.className.indexOf('e-work-hours') > 0) {
            args.element.style.background = '#FAFAE3';
        }
    }
});
scheduleObj.appendTo('#Schedule');
```

### Group Property Reference

| Property | Type | Description |
|----------|------|-------------|
| `resources` | string[] | Array of resource `name` values to group by |
| `byDate` | boolean | Group resources under each date (calendar views only) |
| `byGroupID` | boolean | Group child resources only under their parent resource's group (default: `true`) |
| `allowGroupEdit` | boolean | Allow shared events across multiple resources |
| `hideNonWorkingDays` | boolean | Hide non-working days when `byDate` is enabled |
