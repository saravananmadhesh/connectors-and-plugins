# Kanban Swimlanes

## Table of Contents
- [Basic Swimlane Setup](#basic-swimlane-setup)
- [Custom Display Text](#custom-display-text)
- [Swimlane Row Template](#swimlane-row-template)
- [Sorting Swimlane Rows](#sorting-swimlane-rows)
- [Cross-Row Drag-and-Drop](#cross-row-drag-and-drop)
- [Show Empty Rows](#show-empty-rows)
- [Hide Item Count](#hide-item-count)
- [Frozen Swimlane Rows](#frozen-swimlane-rows)

## Basic Swimlane Setup

Enable swimlanes by providing `swimlaneSettings.keyField` — the data field whose distinct values become swimlane row labels:

```vue
<template>
  <ejs-kanban keyField="Status" :dataSource="kanbanData"
    :cardSettings="cardSettings" :swimlaneSettings="swimlaneSettings">
    <e-columns>
      <e-column headerText="To Do"       keyField="Open"></e-column>
      <e-column headerText="In Progress" keyField="InProgress"></e-column>
      <e-column headerText="Done"        keyField="Close"></e-column>
    </e-columns>
  </ejs-kanban>
</template>

<script setup>
import { KanbanComponent as EjsKanban, ColumnDirective as EColumn, ColumnsDirective as EColumns } from '@syncfusion/ej2-vue-kanban';
import { extend } from '@syncfusion/ej2-base';
import { kanbanData } from './datasource.js';

const cardSettings    = { contentField: 'Summary', headerField: 'Id' };
const swimlaneSettings = { keyField: 'Assignee' };
</script>
```

Each unique value in the `Assignee` field generates a swimlane row. Cards are grouped within their swimlane and still movable between columns within that row.

## Custom Display Text

By default the swimlane header shows the raw `keyField` value. Provide a different field for the display label with `textField`:

```vue
<script setup>
// Data example: { Id: 1, Status: 'Open', Assignee: 'andrew', AssigneeName: 'Andrew Fuller' }
const swimlaneSettings = {
  keyField: 'Assignee',       // field used to group rows
  textField: 'AssigneeName'   // field whose value appears in the row header
};
</script>
```

Use `textField` when the key is a slug/ID and the data contains a human-readable name field.

## Swimlane Row Template

Render custom HTML in swimlane headers using a Vue component template:

```vue
<template>
  <ejs-kanban keyField="Status" :dataSource="kanbanData"
    :cardSettings="cardSettings" :swimlaneSettings="swimlaneSettings">
    <e-columns>
      <e-column headerText="To Do"       keyField="Open"></e-column>
      <e-column headerText="In Progress" keyField="InProgress"></e-column>
      <e-column headerText="Done"        keyField="Close"></e-column>
    </e-columns>
  </ejs-kanban>
</template>

<script setup>
import { createApp } from 'vue';
const app = createApp({});

const SwimlaneTpl = app.component('swimlane-template', {
  data: () => ({}),
  template: `
    <div class="swimlane-wrap">
      <img class="avatar" :src="'/images/' + data.keyField + '.png'" />
      <span class="name">{{ data.textField }}</span>
    </div>`,
});

const swimlaneSettings = {
  keyField: 'Assignee',
  textField: 'AssigneeName',
  template: () => ({ template: SwimlaneTpl }),
};
</script>
```

The template receives `data` with `keyField` (the row grouping value) and `textField` (the display value).

## Sorting Swimlane Rows

Control the order of swimlane rows with `sortBy`. Accepted values: `'DataSourceOrder'` (default), `'Ascending'`, `'Descending'`:

```vue
<script setup>
// Render swimlane rows in descending order by Assignee value
const swimlaneSettings = {
  keyField: 'Assignee',
  sortBy: 'Descending',
};
</script>
```

`'DataSourceOrder'` preserves the order in which distinct values first appear in the data source.

## Cross-Row Drag-and-Drop

By default cards are confined to their swimlane row. Allow dragging across rows with `allowDragAndDrop: true`:

```vue
<script setup>
const swimlaneSettings = {
  keyField: 'Assignee',
  allowDragAndDrop: true,
};
</script>
```

When a card is dropped into a different swimlane, its `keyField` data value updates automatically to match the target row.

## Show Empty Rows

Swimlane rows with zero cards are hidden by default. Show them with `showEmptyRow: true`:

```vue
<script setup>
const swimlaneSettings = {
  keyField: 'Assignee',
  showEmptyRow: true,
};
</script>
```

Useful when you want to make all assignees/categories visible even if they have no current work.

## Hide Item Count

Each swimlane header shows a card count badge by default. Suppress it with `showItemCount: false`:

```vue
<script setup>
const swimlaneSettings = {
  keyField: 'Assignee',
  showItemCount: false,
};
</script>
```

## Frozen Swimlane Rows

Pin swimlane headers so they remain visible as the user scrolls through many cards vertically. Requires a fixed height on the board:

```vue
<template>
  <!-- height is required for frozen rows to work -->
  <ejs-kanban keyField="Status" :dataSource="kanbanData"
    :cardSettings="cardSettings" :swimlaneSettings="swimlaneSettings"
    height="700px">
    <e-columns>
      <e-column headerText="To Do"       keyField="Open"></e-column>
      <e-column headerText="In Progress" keyField="InProgress"></e-column>
      <e-column headerText="Done"        keyField="Close"></e-column>
    </e-columns>
  </ejs-kanban>
</template>

<script setup>
const swimlaneSettings = {
  keyField: 'Assignee',
  enableFrozenRows: true,
};
</script>
```

When scrolling down within the board, the swimlane header for the current section sticks to the top of the visible area.

> `height` must be set on `<ejs-kanban>` for `enableFrozenRows` to function. Without a constrained height there is nothing to scroll within and the feature has no effect.
