# Getting Started with Syncfusion Vue Kanban

## Table of Contents
- [Installation](#installation)
- [CSS Imports](#css-imports)
- [Minimal Board](#minimal-board)
- [Populating Cards](#populating-cards)
- [Enable Swimlanes](#enable-swimlanes)
- [Run the App](#run-the-app)

## Installation

Create a Vite + Vue TypeScript project, then install the Kanban package:

```bash
npm create vite@7 my-vue-app -- --template vue-ts
cd my-vue-app
npm install
npm install @syncfusion/ej2-vue-kanban --save
```

## CSS Imports

Add the following imports to the `<style>` section of `src/App.vue`. Import order matters — base styles first, then component styles last:

```css
@import '../node_modules/@syncfusion/ej2-base/styles/tailwind3.css';
@import '../node_modules/@syncfusion/ej2-buttons/styles/tailwind3.css';
@import '../node_modules/@syncfusion/ej2-splitbuttons/styles/tailwind3.css';
@import '../node_modules/@syncfusion/ej2-inputs/styles/tailwind3.css';
@import '../node_modules/@syncfusion/ej2-lists/styles/tailwind3.css';
@import '../node_modules/@syncfusion/ej2-navigations/styles/tailwind3.css';
@import '../node_modules/@syncfusion/ej2-popups/styles/tailwind3.css';
@import '../node_modules/@syncfusion/ej2-vue-kanban/styles/tailwind3.css';
```

Replace `tailwind3` with any supported theme name: `material`, `bootstrap5`, `fluent`, `fabric`, `material3`.

## Minimal Board

A Kanban board needs at minimum:
- `keyField` — the data field that maps records to columns (e.g. `"Status"`)
- `<e-columns>` — one `<e-column>` per stage; each column's `keyField` must match values in your data

```vue
<!-- Composition API -->
<template>
  <div id="app">
    <ejs-kanban id="kanban" keyField="Status">
      <e-columns>
        <e-column headerText="To Do"       keyField="Open"></e-column>
        <e-column headerText="In Progress" keyField="InProgress"></e-column>
        <e-column headerText="Testing"     keyField="Testing"></e-column>
        <e-column headerText="Done"        keyField="Close"></e-column>
      </e-columns>
    </ejs-kanban>
  </div>
</template>

<script setup>
import { KanbanComponent as EjsKanban, ColumnDirective as EColumn, ColumnsDirective as EColumns }
  from '@syncfusion/ej2-vue-kanban';
</script>
```

```vue
<!-- Options API -->
<template>
  <div id="app">
    <ejs-kanban id="kanban" keyField="Status">
      <e-columns>
        <e-column headerText="To Do"       keyField="Open"></e-column>
        <e-column headerText="In Progress" keyField="InProgress"></e-column>
        <e-column headerText="Testing"     keyField="Testing"></e-column>
        <e-column headerText="Done"        keyField="Close"></e-column>
      </e-columns>
    </ejs-kanban>
  </div>
</template>

<script>
import { KanbanComponent, ColumnDirective, ColumnsDirective } from '@syncfusion/ej2-vue-kanban';

export default {
  name: 'App',
  components: {
    'ejs-kanban': KanbanComponent,
    'e-columns': ColumnsDirective,
    'e-column': ColumnDirective
  }
}
</script>
```

This renders the column headers with no cards — you'll see the Kanban header row.

## Populating Cards

Pass data via `dataSource` and tell the board which fields map to header and body text via `cardSettings`.

- `headerField` — **mandatory**; acts as unique card ID (e.g. `"Id"`). Cannot be changed via `updateCard`.
- `contentField` — text displayed in the card body (e.g. `"Summary"`).

Use `extend` from `@syncfusion/ej2-base` to deep-clone your source array so the board owns its copy:

```vue
<template>
  <div id="app">
    <ejs-kanban id="kanban" keyField="Status" :dataSource="kanbanData" :cardSettings="cardSettings">
      <e-columns>
        <e-column headerText="To Do"       keyField="Open"></e-column>
        <e-column headerText="In Progress" keyField="InProgress"></e-column>
        <e-column headerText="Testing"     keyField="Testing"></e-column>
        <e-column headerText="Done"        keyField="Close"></e-column>
      </e-columns>
    </ejs-kanban>
  </div>
</template>

<script setup>
import { KanbanComponent as EjsKanban, ColumnDirective as EColumn, ColumnsDirective as EColumns }
  from '@syncfusion/ej2-vue-kanban';
import { extend } from '@syncfusion/ej2-base';

const rawData = [
  { Id: 1, Status: 'Open',       Summary: 'Analyze new requirements', Assignee: 'Nancy Davloio',  RankId: 1 },
  { Id: 2, Status: 'InProgress', Summary: 'Improve app performance',   Assignee: 'Andrew Fuller', RankId: 1 },
  { Id: 3, Status: 'Open',       Summary: 'Web meeting with customer', Assignee: 'Janet Leverling', RankId: 2 },
  { Id: 4, Status: 'InProgress', Summary: 'Fix IE browser issues',     Assignee: 'Janet Leverling', RankId: 2 },
  { Id: 5, Status: 'Testing',    Summary: 'Fix customer-reported bugs', Assignee: 'Steven Walker', RankId: 1 },
];

const kanbanData = extend([], rawData, null, true);
const cardSettings = {
  contentField: 'Summary',
  headerField: 'Id'
};
</script>
```

**Why `extend`?** The Kanban mutates card positions during drag-and-drop. Cloning ensures your original array stays unchanged.

## Enable Swimlanes

Swimlanes group cards horizontally by a field value. Add `swimlaneSettings` with a `keyField` pointing to the grouping field:

```vue
<template>
  <ejs-kanban keyField="Status" :dataSource="kanbanData"
    :cardSettings="cardSettings" :swimlaneSettings="swimlaneSettings">
    <e-columns>
      <e-column headerText="To Do"       keyField="Open"></e-column>
      <e-column headerText="In Progress" keyField="InProgress"></e-column>
      <e-column headerText="Testing"     keyField="Testing"></e-column>
      <e-column headerText="Done"        keyField="Close"></e-column>
    </e-columns>
  </ejs-kanban>
</template>

<script setup>
import { KanbanComponent as EjsKanban, ColumnDirective as EColumn, ColumnsDirective as EColumns }
  from '@syncfusion/ej2-vue-kanban';
import { extend } from '@syncfusion/ej2-base';

const kanbanData = extend([], rawData, null, true); // rawData as above
const cardSettings   = { contentField: 'Summary', headerField: 'Id' };
const swimlaneSettings = { keyField: 'Assignee' };
</script>
```

Cards are now grouped by `Assignee`. Each distinct assignee value becomes one swimlane row.

## Run the App

```bash
npm run dev
```

Open the local URL shown in the terminal (usually `http://localhost:5173`).
