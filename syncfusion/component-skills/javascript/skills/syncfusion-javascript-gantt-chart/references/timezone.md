# Timezone in Syncfusion Gantt Chart

## Table of Contents
- [Overview](#overview)
- [Setting Timezone](#setting-timezone)
- [CRUD Operations with Timezone](#crud-operations-with-timezone)
- [Timezone Utility Methods](#timezone-utility-methods)

## Overview

By default, Gantt uses the browser's local system timezone. Use the `timezone` property to display all tasks in a specific timezone regardless of user location.

## Setting Timezone

```typescript
import { Gantt, Selection } from '@syncfusion/ej2-gantt';

Gantt.Inject(Selection);

let gantt: Gantt = new Gantt({
    dataSource: GanttData,
    height: '450px',
    taskFields: {
        id: 'taskID',
        name: 'taskName',
        startDate: 'startDate',
        duration: 'duration',
        progress: 'progress',
        dependency: 'predecessor',
        parentID: 'parentID'
    },
    timezone: 'UTC',              // display same time for all users
    durationUnit: 'Hour',
    includeWeekend: true,
    dateFormat: 'hh:mm a',
    dayWorkingTime: [{ from: 0, to: 23 }],
    timelineSettings: {
        timelineUnitSize: 65,
        topTier: { unit: 'Day', format: 'MMM dd, yyyy' },
        bottomTier: { unit: 'Hour', format: 'hh:mm a' }
    }
});
gantt.appendTo('#Gantt');
```

**Common timezone values**: `'UTC'`, `'America/New_York'`, `'Europe/Paris'`, `'Asia/Tokyo'`, `'Asia/Kolkata'`

---

## CRUD Operations with Timezone

When editing with a specific timezone set, all editing actions are performed based on the user timezone. On save, data is converted back to local time before providing it to client-side events:

```typescript
import { Gantt, Edit, Selection } from '@syncfusion/ej2-gantt';

Gantt.Inject(Edit, Selection);

let gantt: Gantt = new Gantt({
    dataSource: GanttData,
    timezone: 'America/New_York',
    durationUnit: 'Hour',
    includeWeekend: true,
    editSettings: {
        allowEditing: true,
        allowDeleting: true,
        allowTaskbarEditing: true
    },
    actionComplete: function(args: any) {
        if (args.action === 'TaskbarEditing') {
            // endDate is provided in local time after timezone reverse conversion
            console.log(args.data.ganttProperties.endDate);
        }
    }
});
gantt.appendTo('#Gantt');
```

---

## Timezone Utility Methods

The `Timezone` utility class provides helpers for timezone conversions:

### `offset(date, timezone)` — Get UTC offset
```typescript
import { Timezone } from '@syncfusion/ej2-base';

let timezone: Timezone = new Timezone();
let date: Date = new Date(2018, 11, 5, 15, 25, 11);
let offset: number = timezone.offset(date, 'Europe/Paris');
// Returns: -60 (minutes ahead of UTC)
```

### `convert(date, fromTZ, toTZ)` — Convert between timezones
```typescript
let convertedDate: Date = timezone.convert(date, 'Europe/Paris', 'Asia/Tokyo');
// Or use numeric offsets:
let convertedDate2: Date = timezone.convert(date, 60, -360);
```

### `remove(date, timezone)` — Remove timezone offset
```typescript
let utcDate: Date = timezone.remove(date, 'Europe/Paris');
```
