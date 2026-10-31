# Kanban State Persistence

## Overview

State persistence saves the Kanban's current state to `localStorage` so it is restored when the user refreshes the page or navigates back. The persisted state includes:

- Data source
- Column expand/collapse state
- Swimlane expand/collapse state

Enable with `enablePersistence="true"` (or `:enablePersistence="true"`):

```vue
<template>
  <ejs-kanban keyField="Status" :dataSource="kanbanData"
    :cardSettings="cardSettings"
    :swimlaneSettings="swimlaneSettings"
    enablePersistence="true">
    <e-columns>
      <e-column headerText="To Do"       keyField="Open"       allowToggle="true"></e-column>
      <e-column headerText="In Progress" keyField="InProgress" allowToggle="true"></e-column>
      <e-column headerText="Testing"     keyField="Testing"    allowToggle="true"></e-column>
      <e-column headerText="Done"        keyField="Close"      allowToggle="true"></e-column>
    </e-columns>
  </ejs-kanban>
</template>

<script setup>
import { KanbanComponent as EjsKanban, ColumnDirective as EColumn, ColumnsDirective as EColumns } from '@syncfusion/ej2-vue-kanban';
import { extend } from '@syncfusion/ej2-base';
import { kanbanData } from './datasource.js';

const data             = extend([], kanbanData, null, true);
const cardSettings     = { contentField: 'Summary', headerField: 'Id' };
const swimlaneSettings = { keyField: 'Assignee' };
</script>
```

## Key Points

- The `id` prop on `<ejs-kanban>` is used as the `localStorage` key. Set a **unique `id`** when you have multiple Kanban boards on the same domain to avoid state collisions.

```vue
<ejs-kanban id="sprint-board" enablePersistence="true" ...>
```

- Persistence is **browser-specific** — state stored in Chrome is not shared with Firefox.
- The persisted data source is a snapshot. If the remote data changes between visits, the stale persisted state may conflict. In such cases, rely on remote data binding instead of persistence for the data source.
- Column toggle state is only meaningful when `allowToggle="true"` is set on columns.

## Clearing Persisted State

To clear the Kanban's stored state (e.g. after a data schema change), remove the entry from `localStorage`:

```js
// The key follows the pattern: 'kanban' + component id
localStorage.removeItem('kanbansprint-board');
```
