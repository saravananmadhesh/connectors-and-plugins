# Kanban Columns

## Table of Contents
- [Single-Key Mapping](#single-key-mapping)
- [Multi-Key Mapping](#multi-key-mapping)
- [Column Header Text and Template](#column-header-text-and-template)
- [Toggle Columns](#toggle-columns)
- [Initially Collapsed Column](#initially-collapsed-column)
- [Stacked Headers](#stacked-headers)
- [Column Drag-and-Drop Reordering](#column-drag-and-drop-reordering)

## Single-Key Mapping

Each column maps to a single value in the board's `keyField` data field. The board's `keyField` (e.g. `"Status"`) is declared at the `<ejs-kanban>` level; each `<e-column>` declares a matching value via its own `keyField`:

```vue
<template>
  <ejs-kanban keyField="Status" :dataSource="kanbanData" :cardSettings="cardSettings">
    <e-columns>
      <e-column headerText="To Do"       keyField="Open"></e-column>
      <e-column headerText="In Progress" keyField="InProgress"></e-column>
      <e-column headerText="Testing"     keyField="Testing"></e-column>
      <e-column headerText="Done"        keyField="Close"></e-column>
    </e-columns>
  </ejs-kanban>
</template>
```

Records with `Status === 'Open'` appear in the "To Do" column, `'InProgress'` in "In Progress", and so on.

> `keyField` on each `<e-column>` is mandatory — cards won't appear without it.

## Multi-Key Mapping

Combine multiple status values into a single column by comma-separating them in the column's `keyField`:

```vue
<e-columns>
  <!-- "To Do" shows cards where Status is 'Open' OR 'Validate' -->
  <e-column headerText="To Do"       keyField="Open, Validate"></e-column>
  <e-column headerText="In Progress" keyField="InProgress"></e-column>
  <e-column headerText="Done"        keyField="Close"></e-column>
</e-columns>
```

**When to use:** Merging deprecated or transitional statuses into one visible stage without changing data.

## Column Header Text and Template

`headerText` provides the plain text column title. For richer column headers (icons, badges), use the `template` prop on the column:

```vue
<template>
  <ejs-kanban keyField="Status" :dataSource="kanbanData"
    :cardSettings="cardSettings" cssClass="kanban-custom-header">
    <e-columns>
      <e-column headerText="To Do"       keyField="Open"       :template="colTemplate"></e-column>
      <e-column headerText="In Progress" keyField="InProgress" :template="colTemplate"></e-column>
      <e-column headerText="Done"        keyField="Close"      :template="colTemplate"></e-column>
    </e-columns>
  </ejs-kanban>
</template>

<script setup>
import { createApp } from 'vue';
const app = createApp({});

// The template receives `data` with `headerText` and `keyField`
const ColTpl = app.component('col-template', {
  data: () => ({}),
  template: `
    <div class="header-wrap">
      <span class="header-icon e-icons {{ data.keyField }}"></span>
      <span class="header-text">{{ data.headerText }}</span>
    </div>`,
});

const colTemplate = () => ({ template: ColTpl });
const cardSettings = { contentField: 'Summary', headerField: 'Id' };
</script>
```

Omitting `headerText` renders the column with no text (header area is still present).

## Toggle Columns

Allow users to collapse and expand columns by setting `allowToggle="true"` on each column. This renders an expand/collapse icon in the column header.

```vue
<e-columns>
  <e-column headerText="To Do"       keyField="Open"       allowToggle="true"></e-column>
  <e-column headerText="In Progress" keyField="InProgress" allowToggle="true"></e-column>
  <e-column headerText="Testing"     keyField="Testing"    allowToggle="true"></e-column>
  <e-column headerText="Done"        keyField="Close"      allowToggle="true"></e-column>
</e-columns>
```

A collapsed column narrows to `50px` wide by default — users can still see which stage exists without scrolling past all its cards.

## Initially Collapsed Column

Render a column in collapsed state on page load with `isExpanded="false"`. This only works when `allowToggle="true"` is also set:

```vue
<e-columns>
  <!-- "To Do" and "Testing" start collapsed -->
  <e-column headerText="To Do"       keyField="Open"       allowToggle="true" isExpanded="false"></e-column>
  <e-column headerText="In Progress" keyField="InProgress" allowToggle="true"></e-column>
  <e-column headerText="Testing"     keyField="Testing"    allowToggle="true" isExpanded="false"></e-column>
  <e-column headerText="Done"        keyField="Close"      allowToggle="true"></e-column>
</e-columns>
```

**When to use:** De-emphasize rarely-visited stages (e.g. a backlog column) so the active workflow stages dominate the view.

## Stacked Headers

Stacked headers add a grouping row above column headers, visually grouping related stages:

```vue
<template>
  <ejs-kanban keyField="Status" :dataSource="kanbanData" :cardSettings="cardSettings">
    <e-columns>
      <e-column headerText="Open"        keyField="Open"></e-column>
      <e-column headerText="In Progress" keyField="InProgress"></e-column>
      <e-column headerText="In Review"   keyField="Review"></e-column>
      <e-column headerText="Completed"   keyField="Close"></e-column>
    </e-columns>
    <e-stackedHeaders>
      <e-stackedHeader text="To Do"             keyFields="Open"></e-stackedHeader>
      <e-stackedHeader text="Development Phase" keyFields="InProgress, Review"></e-stackedHeader>
      <e-stackedHeader text="Done"              keyFields="Close"></e-stackedHeader>
    </e-stackedHeaders>
  </ejs-kanban>
</template>

<script setup>
import {
  KanbanComponent as EjsKanban,
  ColumnDirective as EColumn, ColumnsDirective as EColumns,
  StackedHeaderDirective as EStackedHeader, StackedHeadersDirective as EStackedHeaders
} from '@syncfusion/ej2-vue-kanban';

const cardSettings = { contentField: 'Summary', headerField: 'Id' };
</script>
```

`keyFields` on `<e-stackedHeader>` lists the column `keyField` values it spans, comma-separated.

## Column Drag-and-Drop Reordering

Let users rearrange the order of columns by dragging column headers. Set `allowColumnDragAndDrop` on the board:

```vue
<template>
  <ejs-kanban keyField="Status" :dataSource="kanbanData"
    :cardSettings="cardSettings" :allowColumnDragAndDrop="true">
    <e-columns>
      <e-column headerText="To Do"       keyField="Open"></e-column>
      <e-column headerText="In Progress" keyField="InProgress"></e-column>
      <e-column headerText="Testing"     keyField="Testing"></e-column>
      <e-column headerText="Done"        keyField="Close"></e-column>
    </e-columns>
  </ejs-kanban>
</template>
```

A visual highlight shows the drop target while the user drags. The column reorder is client-side only — persist the new order yourself if needed.
