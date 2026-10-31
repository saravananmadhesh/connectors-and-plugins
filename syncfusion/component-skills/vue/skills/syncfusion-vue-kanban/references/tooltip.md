# Kanban Tooltip

## Table of Contents
- [Enable Default Tooltip](#enable-default-tooltip)
- [Custom Tooltip on Elements](#custom-tooltip-on-elements)
- [Tooltip Template](#tooltip-template)

## Enable Default Tooltip

Set `:enableTooltip="true"` on the board to show a tooltip when hovering over any card. The tooltip content is auto-populated from the card's data:

```vue
<template>
  <ejs-kanban keyField="Status" :dataSource="kanbanData"
    :cardSettings="cardSettings" :enableTooltip="true">
    <e-columns>
      <e-column headerText="To Do"       keyField="Open"></e-column>
      <e-column headerText="In Progress" keyField="InProgress"></e-column>
      <e-column headerText="Done"        keyField="Close"></e-column>
    </e-columns>
  </ejs-kanban>
</template>

<script setup>
import { KanbanComponent as EjsKanban, ColumnDirective as EColumn, ColumnsDirective as EColumns } from '@syncfusion/ej2-vue-kanban';
const cardSettings = { contentField: 'Summary', headerField: 'Id' };
</script>
```

## Custom Tooltip on Elements

To show a tooltip on **custom elements** inside cards (e.g. icons, badges), add the class `e-tooltip-text` to those elements. The Kanban tooltip system will pick up their text content:

```vue
<!-- Inside a card template -->
<span class="e-tooltip-text priority-icon">🔴 High Priority</span>
```

## Tooltip Template

Replace the default tooltip content with a custom Vue component using `tooltipTemplate`. The template receives the card's `data` object:

```vue
<template>
  <ejs-kanban keyField="Status" :dataSource="kanbanData"
    :cardSettings="cardSettings"
    :enableTooltip="true"
    :tooltipTemplate="tooltipTemplate">
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
import { createApp } from 'vue';
import { kanbanData } from './datasource.js';

const app = createApp({});

const TooltipTpl = app.component('tooltip-template', {
  data: () => ({}),
  template: `
    <div class="kanban-tooltip" style="width: 250px; padding: 8px;">
      <table style="width: 100%;">
        <tr>
          <td class="label">Assignee:</td>
          <td>{{ data.Assignee }}</td>
        </tr>
        <tr>
          <td class="label">Type:</td>
          <td>{{ data.Type }}</td>
        </tr>
        <tr>
          <td class="label">Estimate:</td>
          <td>{{ data.Estimate }}</td>
        </tr>
        <tr>
          <td class="label">Summary:</td>
          <td>{{ data.Summary }}</td>
        </tr>
      </table>
    </div>`,
});

const data         = extend([], kanbanData, null, true);
const cardSettings = { contentField: 'Summary', headerField: 'Id' };

const tooltipTemplate = () => ({ template: TooltipTpl });
</script>

<style>
.kanban-tooltip .label {
  font-weight: 600;
  padding-right: 8px;
  vertical-align: top;
  white-space: nowrap;
}
</style>
```

The template receives `data` with all the card's data fields — use any field from your data source in the tooltip layout.
