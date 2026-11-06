# Kanban Cards

## Table of Contents
- [Required Fields](#required-fields)
- [Hiding the Card Header](#hiding-the-card-header)
- [Custom Card Template](#custom-card-template)
- [Card Selection](#card-selection)

## Required Fields

Every card needs two `cardSettings` fields:

| Field | Prop | Role |
|---|---|---|
| Unique identifier | `headerField` | **Mandatory.** Rendered in card header. Used as primary key — never change via `updateCard`. |
| Body text | `contentField` | Displayed in card body. Optional; omit if using a full template. |

```vue
<template>
  <ejs-kanban keyField="Status" :dataSource="kanbanData" :cardSettings="cardSettings">
    <e-columns>
      <e-column headerText="To Do"       keyField="Open"></e-column>
      <e-column headerText="In Progress" keyField="InProgress"></e-column>
      <e-column headerText="Done"        keyField="Close"></e-column>
    </e-columns>
  </ejs-kanban>
</template>

<script setup>
import { KanbanComponent as EjsKanban, ColumnDirective as EColumn, ColumnsDirective as EColumns }
  from '@syncfusion/ej2-vue-kanban';
import { extend } from '@syncfusion/ej2-base';

const kanbanData = extend([], [
  { Id: 1, Status: 'Open',       Summary: 'Analyze requirements' },
  { Id: 2, Status: 'InProgress', Summary: 'Improve performance'  },
  { Id: 3, Status: 'Close',      Summary: 'Deploy release'       },
], null, true);

const cardSettings = {
  contentField: 'Summary',  // card body text
  headerField: 'Id'         // card header / unique key
};
</script>
```

**Gotcha:** Adding duplicate `headerField` values causes unexpected behavior — ensure each record has a unique ID.

## Hiding the Card Header

When you want a cleaner card (e.g., using a template) or the ID is irrelevant to users, set `showHeader: false`:

```vue
<script setup>
const cardSettings = {
  contentField: 'Summary',
  headerField: 'Id',
  showHeader: false   // hides the header row on every card
};
</script>
```

The `headerField` mapping is still required internally even when `showHeader` is false.

## Custom Card Template

Replace the default header+body layout with a fully custom Vue component. Define a child component and pass it via `cardSettings.template`:

```vue
<template>
  <ejs-kanban keyField="Status" :dataSource="kanbanData" :cardSettings="cardSettings">
    <e-columns>
      <e-column headerText="To Do"       keyField="Open"></e-column>
      <e-column headerText="In Progress" keyField="InProgress"></e-column>
      <e-column headerText="Done"        keyField="Close"></e-column>
    </e-columns>
  </ejs-kanban>
</template>

<script setup>
import { KanbanComponent as EjsKanban, ColumnDirective as EColumn, ColumnsDirective as EColumns }
  from '@syncfusion/ej2-vue-kanban';
import { extend } from '@syncfusion/ej2-base';
import { createApp } from 'vue';

const app = createApp({});

// The template component receives the card data object as `data`
const CardTpl = app.component('card-template', {
  data: () => ({}),
  template: `
    <div class="e-card-content">
      <table class="card-wrap">
        <tr><td class="card-label">Id:</td>       <td>{{ data.Id }}</td></tr>
        <tr><td class="card-label">Type:</td>     <td>{{ data.Type }}</td></tr>
        <tr><td class="card-label">Priority:</td> <td>{{ data.Priority }}</td></tr>
        <tr><td class="card-label">Summary:</td>  <td>{{ data.Summary }}</td></tr>
      </table>
    </div>`,
});

const kanbanData = extend([], [
  { Id: 1, Status: 'Open', Summary: 'Fix bug', Type: 'Bug', Priority: 'High' },
  { Id: 2, Status: 'InProgress', Summary: 'New feature', Type: 'Story', Priority: 'Normal' },
], null, true);

const cardSettings = {
  headerField: 'Id',
  template: () => ({ template: CardTpl })
};
</script>

<style>
.e-kanban .card-wrap td { background: none !important; }
.e-kanban .card-label   { font-weight: 500; }
</style>
```

**When to use a template:**
- You need to show multiple fields (type, priority, tags) in a structured layout.
- You want images, icons, or colored badges inside each card.
- The default header+content two-row layout is too restrictive.

## Card Selection

Control how many cards can be selected at once with `selectionType` inside `cardSettings`:

| Value | Behavior |
|---|---|
| `'None'` | No cards can be selected |
| `'Single'` | One card selected at a time (default) |
| `'Multiple'` | Multiple cards selectable |

Enable multiple selection for bulk move or delete operations:

```vue
<script setup>
const cardSettings = {
  contentField: 'Summary',
  headerField: 'Id',
  selectionType: 'Multiple'
};
</script>
```

**Keyboard shortcuts for multi-select:**
- `Ctrl + click` — add/remove individual cards
- `Shift + click` — select a range of cards
- `Ctrl + Enter` or `Ctrl + Space` — select multiple cards via keyboard
- `Shift + Arrow Up / Down` — extend selection
