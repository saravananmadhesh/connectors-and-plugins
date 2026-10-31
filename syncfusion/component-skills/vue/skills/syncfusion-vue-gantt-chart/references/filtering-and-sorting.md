# Filtering and Sorting

## Table of Contents
- [Filtering Overview](#filtering-overview)
- [Enabling Filtering](#enabling-filtering)
- [Filter Types](#filter-types)
- [Column Menu Filter](#column-menu-filter)
- [Excel-like Filter](#excel-like-filter)
- [Toolbar Search](#toolbar-search)
- [filterSettings Reference](#filtersettings-reference)
- [Sorting Overview](#sorting-overview)
- [Enabling Sorting](#enabling-sorting)
- [Multi-Column Sorting](#multi-column-sorting)
- [sortSettings Reference](#sortsettings-reference)
- [Programmatic Filter & Sort](#programmatic-filter--sort)
- [Search Settings Reference](#search-settings-reference)
- [Sorting Keyboard Shortcuts](#sorting-keyboard-shortcuts)
- [Sorting Events](#sorting-events)
- [Touch Interaction](#touch-interaction)

## Filtering Overview

Gantt supports three filtering UI modes:
1. **Menu filter** (default) — filter icon on column headers, opens a filter dialog
2. **Excel filter** — Excel-like checkboxes with search
3. **Toolbar search** — global search via a search input in the toolbar

All filtering modes require the `Filter` module.

## Enabling Filtering

```vue
<ejs-gantt :allowFiltering="true" ...></ejs-gantt>

<script setup>
import { provide } from 'vue';
import { Filter } from '@syncfusion/ej2-vue-gantt';
provide('gantt', [Filter]);
</script>
```

## Filter Types

Set `filterSettings.type` to control which UI is shown on each column:

| `type` | Description |
|---|---|
| `'Menu'` | Default — filter dialog with operators |
| `'Excel'` | Checkbox list with search (like Excel auto-filter) |

## Column Menu Filter

Requires `showColumnMenu: true` and `ColumnMenu` module in addition to `Filter`:

```vue
<ejs-gantt :allowFiltering="true" :showColumnMenu="true" ...></ejs-gantt>

<script setup>
import { Filter, ColumnMenu } from '@syncfusion/ej2-vue-gantt';
provide('gantt', [Filter, ColumnMenu]);
</script>
```

## Excel-like Filter

```vue
<ejs-gantt :allowFiltering="true" :filterSettings="filterSettings" ...></ejs-gantt>

<script setup>
import { provide } from 'vue';
import { Filter } from '@syncfusion/ej2-vue-gantt';
provide('gantt', [Filter]);

const filterSettings = { type: 'Excel' };
</script>
```

## Toolbar Search

Add `'Search'` to the toolbar array to get a global search input:

```vue
<ejs-gantt :toolbar="['Search']" :searchSettings="searchSettings" ...></ejs-gantt>

<script setup>
import { provide } from 'vue';
import { Toolbar, Filter } from '@syncfusion/ej2-vue-gantt';
provide('gantt', [Toolbar, Filter]);

const searchSettings = {
  fields: ['TaskName'],   // columns to search; empty = all
  operator: 'contains',
  key: '',
  ignoreCase: true
};
</script>
```

## filterSettings Reference

| Property | Type | Default | Description |
|---|---|---|---|
| `type` | string | `'Menu'` | `'Menu'` or `'Excel'` |
| `columns` | array | `[]` | Initial filter predicates on load |
| `hierarchyMode` | string | `'Parent'` | `'Parent'`, `'Child'`, `'Both'`, `'None'` — determines which rows remain visible |

### `hierarchyMode` values

| Value | Behavior |
|---|---|
| `'Parent'` | Show matching rows AND all their ancestors |
| `'Child'` | Show matching rows AND all their descendants |
| `'Both'` | Show matching rows, ancestors, and descendants |
| `'None'` | Show only rows that match the predicate |

### Initial filter on load

```js
const filterSettings = {
  columns: [
    { field: 'TaskName', matchCase: false, operator: 'startswith', predicate: 'and', value: 'Plan' }
  ]
};
```

## Sorting Overview

Gantt supports single-column and multi-column sorting. `Sort` module must be injected.

## Enabling Sorting

```vue
<ejs-gantt :allowSorting="true" ...></ejs-gantt>

<script setup>
import { provide } from 'vue';
import { Sort } from '@syncfusion/ej2-vue-gantt';
provide('gantt', [Sort]);
</script>
```

Click a column header to sort ascending; click again to sort descending; third click removes the sort.

## Multi-Column Sorting

Hold **Ctrl** and click additional column headers to add secondary sort columns. Or configure via `sortSettings`:

```js
const sortSettings = {
  columns: [
    { field: 'StartDate', direction: 'Ascending' },
    { field: 'TaskName',  direction: 'Descending' }
  ]
};
```

```vue
<ejs-gantt :allowSorting="true" :sortSettings="sortSettings" ...></ejs-gantt>
```

## sortSettings Reference

| Property | Type | Description |
|---|---|---|
| `columns` | array | Array of `{ field, direction }` sort descriptors |
| `allowUnsort` | boolean | `true` (default) — third click removes sort |

Direction values: `'Ascending'` | `'Descending'`

## Programmatic Filter & Sort

```js
const gantt = this.$refs.ganttRef.ej2Instances;

// Filter a column
gantt.filterByColumn('TaskName', 'startswith', 'Design');

// Remove a column's filter
gantt.removeFilteredColsByField('TaskName');

// Clear all filters
gantt.clearFiltering();

// Sort a column
gantt.sortColumn('StartDate', 'Ascending', true);  // true = add to existing sort

// Clear all sorting
gantt.clearSorting();

// Programmatic toolbar search
gantt.search('Design');
```

## Search Settings Reference

Configure toolbar search behavior using `searchSettings`:

```js
const searchSettings = {
  fields: ['TaskName', 'Duration'],  // restrict search to specific columns (empty = all)
  operator: 'contains',              // 'contains' | 'startswith' | 'endswith' | 'equal'
  key: '',                           // initial search value on load
  ignoreCase: true                   // case-insensitive matching
};
```

```vue
<ejs-gantt :toolbar="['Search']" :searchSettings="searchSettings" ...></ejs-gantt>
```

## Sorting Keyboard Shortcuts

| Action | Keyboard |
|---|---|
| Add secondary sort column | Hold **Ctrl** + click column header |
| Remove one sorted column | Hold **Shift** + click column header |
| Remove all sorting | `gantt.clearSorting()` |

## Sorting Events

During the sort action, the Gantt Chart component triggers two events:
- `actionBegin` — fires before the sort action starts
- `actionComplete` — fires after the sort action is completed

```vue
<template>
  <ejs-gantt
    ref="gantt"
    :dataSource="data"
    :taskFields="taskFields"
    :columns="columns"
    :allowSorting="true"
    :actionBegin="actionBegin"
    :actionComplete="actionComplete"
  />
</template>

<script setup>
import { provide } from 'vue';
import { Sort } from '@syncfusion/ej2-vue-gantt';

provide('gantt', [Sort]);

const actionBegin = (args) => {
  // example: args.requestType === 'sorting'
  alert(`${args.requestType} ${args.type}`);
};

const actionComplete = (args) => {
  alert(`${args.requestType} ${args.type}`);
};
</script>
```

## Touch Interaction

On touch devices, tap a column header to apply sorting to that column.

- For multi-column sorting, tap the sorting popup and then tap the required column headers.
  - This popup appears when you add secondary sort columns using touch.
