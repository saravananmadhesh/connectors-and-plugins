# Kanban Validation (WIP Limits)

## Overview

Kanban validation enforces Work-In-Progress (WIP) limits — minimum and maximum card counts
on a column or swimlane cell. When a count falls outside the allowed range, the column or cell
is visually highlighted to signal a constraint violation.

There are two constraint scopes:

| `constraintType` | Validates |
|---|---|
| `'Column'` (default) | Total cards per column across all swimlane rows |
| `'Swimlane'` | Cards per column **within each swimlane row** individually |

> In a board without swimlanes, only `'Column'` constraint applies.

---

## Minimum Card Limit (`minCount`)

Set `minCount` on a column to require at least that many cards.  
If the column card count drops **below** `minCount`, the column/cell is highlighted in a warning color.

```vue
<e-column headerText="To Do" keyField="Open" :minCount="6"></e-column>
```

---

## Maximum Card Limit (`maxCount`)

Set `maxCount` on a column to cap the number of cards.  
If the column card count **exceeds** `maxCount`, the column/cell is highlighted in a warning color.

```vue
<e-column headerText="In Progress" keyField="InProgress" :maxCount="5"></e-column>
```

---

## Combined min + max

Both limits can be set on the same column:

```vue
<e-column headerText="Testing" keyField="Testing" :maxCount="4" :minCount="3"></e-column>
```

---

## Full Column-Constraint Example (Composition API)

```vue
<template>
  <div id="app">
    <ejs-kanban id="kanban" keyField="Status" :dataSource="kanbanData"
      :cardSettings="cardSettings" :enableTooltip="true">
      <e-columns>
        <e-column headerText="To Do"       keyField="Open"       :minCount="6"></e-column>
        <e-column headerText="In Progress" keyField="InProgress" :maxCount="5"></e-column>
        <e-column headerText="Testing"     keyField="Testing"    :maxCount="4" :minCount="3"></e-column>
        <e-column headerText="Done"        keyField="Close"></e-column>
      </e-columns>
    </ejs-kanban>
  </div>
</template>

<script setup>
import { KanbanComponent as EjsKanban, ColumnDirective as EColumn, ColumnsDirective as EColumns }
  from '@syncfusion/ej2-vue-kanban';
import { extend } from '@syncfusion/ej2-base';
import { kanbanData } from './datasource.js';

const data = extend([], kanbanData, null, true);
const cardSettings = {
  contentField: 'Summary',
  headerField: 'Id'
};
</script>

<style>
@import '../node_modules/@syncfusion/ej2-base/styles/tailwind3.css';
@import '../node_modules/@syncfusion/ej2-buttons/styles/tailwind3.css';
@import '../node_modules/@syncfusion/ej2-layouts/styles/tailwind3.css';
@import '../node_modules/@syncfusion/ej2-dropdowns/styles/tailwind3.css';
@import '../node_modules/@syncfusion/ej2-inputs/styles/tailwind3.css';
@import '../node_modules/@syncfusion/ej2-navigations/styles/tailwind3.css';
@import '../node_modules/@syncfusion/ej2-popups/styles/tailwind3.css';
@import '../node_modules/@syncfusion/ej2-vue-kanban/styles/tailwind3.css';
</style>
```

---

## Full Column-Constraint Example (Options API)

```vue
<template>
  <div id="app">
    <ejs-kanban id="kanban" keyField="Status" :dataSource="kanbanData"
      :cardSettings="cardSettings" :enableTooltip="true">
      <e-columns>
        <e-column headerText="To Do"       keyField="Open"       :minCount="6"></e-column>
        <e-column headerText="In Progress" keyField="InProgress" :maxCount="5"></e-column>
        <e-column headerText="Testing"     keyField="Testing"    :maxCount="4" :minCount="3"></e-column>
        <e-column headerText="Done"        keyField="Close"></e-column>
      </e-columns>
    </ejs-kanban>
  </div>
</template>

<script>
import { KanbanComponent, ColumnDirective, ColumnsDirective } from '@syncfusion/ej2-vue-kanban';
import { extend } from '@syncfusion/ej2-base';
import { kanbanData } from './datasource.js';

export default {
  name: 'App',
  components: {
    'ejs-kanban': KanbanComponent,
    'e-columns': ColumnsDirective,
    'e-column': ColumnDirective
  },
  data() {
    return {
      kanbanData: extend([], kanbanData, null, true),
      cardSettings: {
        contentField: 'Summary',
        headerField: 'Id'
      }
    };
  }
};
</script>

<style>
@import '../node_modules/@syncfusion/ej2-base/styles/tailwind3.css';
@import '../node_modules/@syncfusion/ej2-buttons/styles/tailwind3.css';
@import '../node_modules/@syncfusion/ej2-layouts/styles/tailwind3.css';
@import '../node_modules/@syncfusion/ej2-dropdowns/styles/tailwind3.css';
@import '../node_modules/@syncfusion/ej2-inputs/styles/tailwind3.css';
@import '../node_modules/@syncfusion/ej2-navigations/styles/tailwind3.css';
@import '../node_modules/@syncfusion/ej2-popups/styles/tailwind3.css';
@import '../node_modules/@syncfusion/ej2-vue-kanban/styles/tailwind3.css';
</style>
```

---

## Swimlane Constraint Type

To validate WIP limits **per swimlane cell** (each row × column intersection), set `constraintType="Swimlane"` on the board:

```vue
<ejs-kanban keyField="Status" :dataSource="kanbanData"
  constraintType="Swimlane"
  :cardSettings="cardSettings"
  :swimlaneSettings="swimlaneSettings">
  <e-columns>
    <e-column headerText="In Progress" keyField="InProgress" :maxCount="3"></e-column>
    ...
  </e-columns>
</ejs-kanban>
```

> With `constraintType="Swimlane"`, the `maxCount` of 3 applies **per row** (e.g., Alice's "In Progress" cell and Bob's "In Progress" cell are checked independently).

---

## Visual Feedback

| Condition | Visual Effect |
|---|---|
| Card count < `minCount` | Column header and cell show minimum-violation highlight color |
| Card count > `maxCount` | Column header and cell show maximum-violation highlight color |
| Count within range | No highlight — normal appearance |

CSS classes that control validation colors:

```css
/* Customize the minimum-violation color */
.e-kanban .e-kanban-header .e-header-cells.e-min-color { background-color: #fff3cd; }

/* Customize the maximum-violation color */
.e-kanban .e-kanban-header .e-header-cells.e-max-color { background-color: #f8d7da; }
```

---

## Quick Reference

| Prop | Where | Purpose |
|---|---|---|
| `minCount` | `<e-column>` | Minimum cards required in this column/cell |
| `maxCount` | `<e-column>` | Maximum cards allowed in this column/cell |
| `constraintType` | `<ejs-kanban>` | `'Column'` (default) or `'Swimlane'` validation scope |
