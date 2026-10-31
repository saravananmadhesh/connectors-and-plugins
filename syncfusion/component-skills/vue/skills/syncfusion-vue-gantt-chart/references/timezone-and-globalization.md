# Timezone and Globalization

## Table of Contents
- [Timezone Overview](#timezone-overview)
- [Setting Timezone](#setting-timezone)
- [Hourly Timeline with Timezone](#hourly-timeline-with-timezone)
- [CRUD Operations with Timezone](#crud-operations-with-timezone)
- [Timezone Utility Methods](#timezone-utility-methods)
- [Timezone and Date Storage](#timezone-and-date-storage)
- [Localization (L10n)](#localization-l10n)
- [Date and Number Formatting](#date-and-number-formatting)
- [RTL Support](#rtl-support)
- [Currency Formatting](#currency-formatting)

## Timezone Overview

By default, Gantt renders dates in the **browser's local timezone**. When your data comes from a server in UTC (or another fixed timezone), the Gantt `timezone` property ensures dates are interpreted and displayed consistently regardless of the user's local clock.

## Setting Timezone

```vue
<ejs-gantt :timezone="'UTC'" :dataSource="data" :taskFields="taskFields" height="450px" ...></ejs-gantt>
```

Common timezone strings:

| Value | Description |
|---|---|
| `'UTC'` | Coordinated Universal Time |
| `'America/New_York'` | US Eastern (UTC−5/−4) |
| `'America/Los_Angeles'` | US Pacific (UTC−8/−7) |
| `'Europe/London'` | UK (UTC+0/+1) |
| `'Europe/Paris'` | Central European (UTC+1/+2) |
| `'Asia/Kolkata'` | India Standard Time (UTC+5:30) |
| `'Asia/Tokyo'` | Japan Standard Time (UTC+9) |
| `'Australia/Sydney'` | AEST (UTC+10/+11) |

> Timezone strings follow the **IANA Time Zone Database** format (same as JavaScript's `Intl` API).

## Hourly Timeline with Timezone

When working with time-of-day precision, combine `timezone` with `durationUnit: 'Hour'`, `dateFormat`, and an hour-level timeline:

```vue
<ejs-gantt
  :dataSource="data"
  :taskFields="taskFields"
  :timezone="'UTC'"
  :durationUnit="'Hour'"
  :dateFormat="'hh:mm a'"
  :timelineSettings="timelineSettings"
  :includeWeekend="true"
  height="450px"
></ejs-gantt>

<script>
import { GanttComponent, Selection } from '@syncfusion/ej2-vue-gantt';
export default {
  components: { 'ejs-gantt': GanttComponent },
  data() {
    return {
      taskFields: {
        id: 'TaskID', name: 'TaskName',
        startDate: 'StartDate', endDate: 'EndDate',
        duration: 'Duration', progress: 'Progress', child: 'subtasks'
      },
      timelineSettings: {
        timelineUnitSize: 65,
        topTier:    { unit: 'Day',  format: 'MMM dd, yyyy' },
        bottomTier: { unit: 'Hour', format: 'hh:mm a' }
      }
    };
  },
  provide: { gantt: [Selection] }
};
</script>
```

- `timezone: 'UTC'` — all users see the same times regardless of local clock
- `durationUnit: 'Hour'` — duration values represent hours, not days
- `dateFormat: 'hh:mm a'` — date columns display as 12-hour time
- Bottom tier `unit: 'Hour'` — renders per-hour slots on the chart

## CRUD Operations with Timezone

When `timezone` is set, all editing actions (taskbar drag, dialog edit) operate in the configured timezone. On save, Gantt internally **reverses the timezone conversion** back to local time before exposing data in events — use `actionComplete` to inspect the final values:

```vue
<ejs-gantt
  :dataSource="data"
  :taskFields="taskFields"
  :timezone="'America/New_York'"
  :durationUnit="'Hour'"
  :dateFormat="'hh:mm a'"
  :timelineSettings="timelineSettings"
  :editSettings="editSettings"
  :includeWeekend="true"
  @actionComplete="onActionComplete"
  height="450px"
></ejs-gantt>

<script>
import { GanttComponent, Selection, Edit } from '@syncfusion/ej2-vue-gantt';
export default {
  components: { 'ejs-gantt': GanttComponent },
  data() {
    return {
      editSettings: {
        allowAdding: true, allowEditing: true,
        allowDeleting: true, allowTaskbarEditing: true,
        showDeleteConfirmDialog: true
      },
      timelineSettings: {
        timelineUnitSize: 65,
        topTier:    { unit: 'Day',  format: 'MMM dd, yyyy' },
        bottomTier: { unit: 'Hour', format: 'hh:mm a' }
      }
    };
  },
  methods: {
    onActionComplete(args) {
      if (args.action === 'TaskbarEditing') {
        // endDate is already reversed back to local time for database storage
        console.log(args.data.ganttProperties.endDate);
      }
    }
  },
  provide: { gantt: [Selection, Edit] }
};
</script>
```

> The reversed local-time date exposed in `args.data.ganttProperties` is intended for direct persistence to the database without further conversion.

## Timezone Utility Methods

The `Timezone` class from `@syncfusion/ej2-base` provides helpers for manual timezone arithmetic:

```js
import { Timezone } from '@syncfusion/ej2-base';
const timezone = new Timezone();
```

### `offset(date, timezone)` → `number`

Returns the UTC offset in **minutes** for the given date in the specified timezone.

| Parameter | Type | Description |
|---|---|---|
| `date` | Date | UTC date object |
| `timezone` | string | IANA timezone string |

```js
const date = new Date(2018, 11, 5, 15, 25, 11);
const offset = timezone.offset(date, 'Europe/Paris');
console.log(offset); // -60  (UTC+1, so -60 minutes from UTC)
```

### `convert(date, fromOffset, toOffset)` → `Date`

Converts a date from one timezone to another. Both offsets can be IANA strings or numeric minutes.

| Parameter | Type | Description |
|---|---|---|
| `date` | Date | Source date object |
| `fromOffset` | number \| string | Source timezone (IANA string or offset minutes) |
| `toOffset` | number \| string | Target timezone (IANA string or offset minutes) |

```js
const date = new Date(2018, 11, 5, 15, 25, 11);

// Using IANA strings
const converted = timezone.convert(date, 'Europe/Paris', 'Asia/Tokyo');
console.log(converted); // 2018-12-05T08:55:11.000Z

// Using numeric offsets (minutes)
const converted2 = timezone.convert(date, 60, -360);
console.log(converted2); // 2018-12-05T16:55:11.000Z
```

### `remove(date, timezone)` → `Date`

Strips (removes) the timezone offset from a UTC date, returning the wall-clock time in that timezone as a plain date.

| Parameter | Type | Description |
|---|---|---|
| `date` | Date | UTC date object |
| `timezone` | string | IANA timezone string |

```js
const date = new Date(2018, 11, 5, 15, 25, 11);
const result = timezone.remove(date, 'Europe/Paris');
console.log(result); // 2018-12-05T14:25:11.000Z
```

## Timezone and Date Storage

When `timezone` is set, Gantt **offsets all dates** by the difference between the given timezone and UTC before rendering. This means:

- Dates from your data source are treated as if they are in the specified timezone.
- The Gantt will correctly shift start/end dates if the user is in a different timezone.

```vue
<!-- Data has UTC dates; display them as US Eastern -->
<ejs-gantt :timezone="'America/New_York'" ...></ejs-gantt>
```

### Best practice

If your backend stores dates in UTC ISO strings:
1. Parse them as JavaScript `Date` objects (which are UTC-based internally).
2. Set `timezone: 'UTC'` on the Gantt to prevent double-shifting.

```js
const data = [
  {
    TaskID: 1,
    TaskName: 'Planning',
    StartDate: new Date('2024-04-01T00:00:00Z'),  // UTC ISO string
    Duration: 5
  }
];
```

```vue
<ejs-gantt :timezone="'UTC'" :dataSource="data" ...></ejs-gantt>
```

## Localization (L10n)

Override the built-in Gantt UI text strings (and dialog/toolbar labels) to support any language.

### Load translated strings with `L10n.load`

```js
import { L10n, setCulture } from '@syncfusion/ej2-base';

setCulture('de-DE');

L10n.load({
  'de-DE': {
    gantt: {
      emptyRecord: 'Keine Einträge gefunden',
      id: 'Nr.',
      name: 'Aufgabenname',
      startDate: 'Startdatum',
      endDate: 'Enddatum',
      duration: 'Dauer',
      progress: 'Fortschritt',
      dependency: 'Abhängigkeit',
      notes: 'Notizen',
      addDialogTitle: 'Neue Aufgabe',
      editDialogTitle: 'Aufgabendetails',
      saveButton: 'Speichern',
      cancelButton: 'Abbrechen',
      deleteButton: 'Löschen',

      // toolbar / actions
      add: 'Hinzufügen',
      edit: 'Bearbeiten',
      update: 'Aktualisieren',
      delete: 'Löschen',
      cancel: 'Abbrechen',
      search: 'Suche',

      // navigation / zoom
      zoomIn: 'Vergrößern',
      zoomOut: 'Verkleinern',
      zoomToFit: 'Anpassen',
      expandAll: 'Alle erweitern',
      collapseAll: 'Alle reduzieren',

      // export
      excelExport: 'Excel exportieren',
      csvExport: 'CSV exportieren',
      pdfExport: 'PDF exportieren'
    }
  }
});
```

### Apply the culture to the component

```vue
<ejs-gantt locale="de-DE" :dataSource="data" :taskFields="taskFields" />
```

### Common Gantt localization keywords

Keys are provided under `gantt` in `L10n.load`.

| Locale key | UI text (English meaning) |
|---|---|
| `emptyRecord` | No records to display |
| `id` | ID |
| `name` | Name |
| `startDate` | Start Date |
| `endDate` | End Date |
| `duration` | Duration |
| `progress` | Progress |
| `dependency` | Dependency |
| `notes` | Notes |
| `baselineStartDate` | Baseline Start Date |
| `baselineEndDate` | Baseline End Date |
| `type` | Type |
| `offset` | Offset |
| `resourceName` | Resources |
| `resourceID` | Resource ID |
| `day` / `hour` / `minute` | day / hour / minute (singular) |
| `days` / `hours` / `minutes` | days / hours / minutes (plural) |
| `generalTab` | General |
| `customTab` | Custom Columns |
| `writeNotes` | Write Notes |
| `addDialogTitle` | New Task |
| `editDialogTitle` | Task Information |
| `add` | Add |
| `edit` | Edit |
| `update` | Update |
| `delete` | Delete |
| `cancel` | Cancel |
| `search` | Search |
| `task` / `tasks` | task / tasks |
| `zoomIn` / `zoomOut` / `zoomToFit` | Zoom in / out / fit |
| `expandAll` / `collapseAll` | Expand all / Collapse all |
| `nextTimeSpan` / `prevTimeSpan` | Next timespan / Previous timespan |
| `saveButton` | Save |
| `excelExport` / `csvExport` / `pdfExport` | Excel/CSV/PDF export |
| `okText` | Ok |
| `confirmDelete` | Are you sure you want to Delete Record? |

### Dialog / dependency editor keywords

| Locale key | UI text (English meaning) |
|---|---|
| `from` / `to` | From / To |
| `taskLink` | Task Link |
| `lag` | Lag |
| `start` / `finish` | Start / Finish |
| `enterValue` | Enter the value |
| `taskInformation` | Task Information |
| `deleteTask` | Delete Task |
| `deleteDependency` | Delete Dependency |
| `convert` / `save` | Convert / Save |
| `confirmPredecessorDelete` | Are you sure you want to remove dependency link? |

### Predecessor move warnings

These messages are shown when task link constraints cannot be honored. They use placeholders `{0}` and `{1}`.

| Locale key | Meaning (pattern) |
|---|---|
| `taskBeforePredecessor_FS` | `{0}` moved before `{1}` finishes (links cannot be honored) |
| `taskAfterPredecessor_FS` | `{0}` moved after `{1}` starts (links cannot be honored) |
| `taskBeforePredecessor_SS` | `{0}` moved before `{1}` starts (links cannot be honored) |
| `taskAfterPredecessor_SS` | `{0}` moved after `{1}` starts (links cannot be honored) |
| `taskBeforePredecessor_FF` | `{0}` moved before `{1}` finishes (links cannot be honored) |
| `taskAfterPredecessor_FF` | `{0}` moved after `{1}` finishes (links cannot be honored) |
| `taskBeforePredecessor_SF` | `{0}` moved before `{1}` starts (links cannot be honored) |
| `taskAfterPredecessor_SF` | `{0}` moved after `{1}` starts (links cannot be honored) |

### Units / task types / grouping

| Locale key | UI text (English meaning) |
|---|---|
| `taskMode` | Task Mode |
| `changeScheduleMode` | Change Schedule Mode |
| `subTasksStartDate` / `subTasksEndDate` | SubTasks Start Date / End Date |
| `scheduleStartDate` / `scheduleEndDate` | Schedule Start Date / End Date |
| `auto` / `manual` | Auto / Manual |
| `unit` | Unit |
| `work` | Work |
| `taskType` | Task Type |
| `unassignedTask` | Unassigned Task |
| `group` | Group |
| `FF` / `FS` / `SF` / `SS` | Dependency type labels |

### Taskbar / dialog action labels

| Locale key | UI text (English meaning) |
|---|---|
| `above` / `below` | Above / Below |
| `child` | Child |
| `milestone` | Milestone |
| `toTask` | To Task |
| `toMilestone` | To Milestone |
| `eventMarkers` | Event markers |
| `leftTaskLabel` | Left task label |
| `rightTaskLabel` | Right task label |
| `timelineCell` | Timeline cell |

### Editing operations labels

| Locale key | UI text (English meaning) |
|---|---|
| `indent` / `outdent` | Indent / Outdent |
| `segments` | Segments |
| `splitTask` | Split Task |
| `mergeTask` | Merge Task |
| `left` / `right` | Left / Right |

> Tip: You only need to provide the keys you want to translate; any missing keys keep the default English strings.

## Date and Number Formatting

Format date columns using the `format` property on each column:

```js
const columns = [
  {
    field: 'StartDate',
    headerText: 'Start',
    format: { type: 'date', format: 'dd/MM/yyyy' }
  },
  {
    field: 'EndDate',
    headerText: 'End',
    format: 'yMd'    // shorthand — locale-aware short date
  }
];
```

### Common date format strings

| Format | Example output |
|---|---|
| `'yMd'` | `4/1/2024` (locale-dependent) |
| `'dd/MM/yyyy'` | `01/04/2024` |
| `'MM-dd-yyyy'` | `04-01-2024` |
| `'yyyy-MM-dd'` | `2024-04-01` |
| `'MMMM d, y'` | `April 1, 2024` |
| `'EEE, MMM d'` | `Mon, Apr 1` |

## RTL Support

Enable right-to-left layout for Arabic, Hebrew, or other RTL languages:

```vue
<ejs-gantt :enableRtl="true" locale="ar" ...></ejs-gantt>
```

Load Arabic locale strings:

```js
L10n.load({
  'ar': {
    gantt: {
      emptyRecord: 'لا يوجد سجلات للعرض',
      id: 'المعرف',
      name: 'اسم المهمة',
      startDate: 'تاريخ البدء',
      endDate: 'تاريخ الانتهاء',
      duration: 'المدة',
      progress: 'التقدم',
    }
  }
});
```

RTL effects:
- Grid columns appear right-to-left
- Taskbars draw from right to left
- Splitter position is mirrored
- Toolbar items are right-aligned

## Currency Formatting

Set the currency code for number columns that represent monetary values:

```vue
<ejs-gantt :currencyCode="'EUR'" ...></ejs-gantt>
```

| Code | Currency |
|---|---|
| `'USD'` | US Dollar |
| `'EUR'` | Euro |
| `'GBP'` | British Pound |
| `'JPY'` | Japanese Yen |
| `'INR'` | Indian Rupee |
