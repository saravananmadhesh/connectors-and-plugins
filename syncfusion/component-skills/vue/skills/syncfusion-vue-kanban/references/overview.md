# Kanban Component Overview

## What Is the Kanban Component?

The Syncfusion Vue Kanban board is a column-based task management UI that visually depicts work
at various stages of a process using **columns**, **cards**, and **swimlanes**.

Use it when you need a sprint board, workflow tracker, or any UI that groups work items by status
and lets users move items between stages via drag-and-drop.

---

## Key Features

| Feature | Description |
|---|---|
| **Drag-and-Drop** | Smooth card drag across columns, swimlane rows, and even external components (TreeView, Scheduler, another Kanban). |
| **Data Binding** | Bind to a local JSON array or a `DataManager` instance supporting OData, WebAPI, URL adaptors, and custom adaptors. |
| **Swimlanes** | Group cards into horizontal rows by any data field (e.g. assignee, team, priority). |
| **Templates** | Custom templates for cards, column headers, swimlane headers, and tooltips. |
| **Stacked Headers** | Group related columns under a shared header label. |
| **Responsive Layout** | Adapts to desktop and mobile viewports — touch-friendly swipe navigation on mobile. |
| **WIP Validation** | Enforce minimum and maximum card counts per column or per swimlane cell. |
| **Tooltip** | Show card detail on hover; supports custom tooltip templates. |
| **Selection** | Single or multiple card selection via mouse, touch, or keyboard. |
| **Virtual Scrolling** | Render only visible cards for high-performance boards with large datasets. |
| **Persistence** | Save board state (columns, swimlane expand/collapse) across page reloads via `localStorage`. |
| **Localization & RTL** | Full locale string overrides with `L10n.load()`; right-to-left layout via `enableRtl`. |
| **Accessibility** | WAI-ARIA compliant with full keyboard navigation and screen reader support. |
| **Built-in Themes** | Material, Bootstrap 3/4, Fabric, High Contrast, Tailwind, and Tailwind 3. |

---

## When to Use Each Feature

| User Need | Feature to Use |
|---|---|
| Show tasks moving through workflow stages | Columns with `keyField` mapping |
| Group tasks by team member or category | `swimlaneSettings.keyField` |
| Move cards between stages interactively | `allowDragAndDrop` (default: `true`) |
| Load cards from a REST API or OData service | `DataManager` + adaptor |
| Limit how many cards can be in a column | `minCount` / `maxCount` on `<e-column>` |
| Show 1000+ cards without lag | `enableVirtualization` |
| Display custom card layout | `cardSettings.template` |
| Show extra card info on hover | `enableTooltip` + `tooltipTemplate` |
| Add/edit/delete cards via a form dialog | `dialogSettings` or built-in dialog |
| Remember board state after page reload | `enablePersistence` |
| Support Arabic / Hebrew UI | `locale` + `enableRtl` |

---

## Package and Import

```bash
npm install @syncfusion/ej2-vue-kanban
```

```js
import { KanbanComponent as EjsKanban, ColumnDirective as EColumn, ColumnsDirective as EColumns }
  from '@syncfusion/ej2-vue-kanban';
```

**CSS (Tailwind 3 theme — all required imports):**

```css
@import '../node_modules/@syncfusion/ej2-base/styles/tailwind3.css';
@import '../node_modules/@syncfusion/ej2-buttons/styles/tailwind3.css';
@import '../node_modules/@syncfusion/ej2-layouts/styles/tailwind3.css';
@import '../node_modules/@syncfusion/ej2-dropdowns/styles/tailwind3.css';
@import '../node_modules/@syncfusion/ej2-inputs/styles/tailwind3.css';
@import '../node_modules/@syncfusion/ej2-navigations/styles/tailwind3.css';
@import '../node_modules/@syncfusion/ej2-popups/styles/tailwind3.css';
@import '../node_modules/@syncfusion/ej2-vue-kanban/styles/tailwind3.css';
```

---

## Minimal Working Example

```vue
<template>
  <div id="app">
    <ejs-kanban id="kanban" keyField="Status" :dataSource="kanbanData" :cardSettings="cardSettings">
      <e-columns>
        <e-column headerText="To Do"       keyField="Open"></e-column>
        <e-column headerText="In Progress" keyField="InProgress"></e-column>
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
  { Id: 1, Status: 'Open',       Summary: 'Analyze requirements' },
  { Id: 2, Status: 'InProgress', Summary: 'Improve performance' },
  { Id: 3, Status: 'Close',      Summary: 'Deploy to production' }
];

const kanbanData = extend([], rawData, null, true);
const cardSettings = { contentField: 'Summary', headerField: 'Id' };
</script>
```
