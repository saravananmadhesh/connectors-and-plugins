# Kanban Drag-and-Drop

## Table of Contents
- [Internal Drag-and-Drop](#internal-drag-and-drop)
- [Disable Drag-and-Drop](#disable-drag-and-drop)
- [Column-Level Drag and Drop Control](#column-level-drag-and-drop-control)
- [Cross-Swimlane Dragging](#cross-swimlane-dragging)
- [External Kanban-to-Kanban](#external-kanban-to-kanban)
- [Kanban to Treeview](#kanban-to-treeview)
- [Kanban to Schedule](#kanban-to-schedule)

## Internal Drag-and-Drop

Drag-and-drop between columns is enabled by default. No additional configuration is needed:

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
```

Cards can also be reordered within the same column by dragging up or down.

## Disable Drag-and-Drop

Turn off drag-and-drop board-wide by setting `:allowDragAndDrop="false"`:

```vue
<ejs-kanban keyField="Status" :dataSource="kanbanData"
  :cardSettings="cardSettings" :allowDragAndDrop="false">
  <!-- columns -->
</ejs-kanban>
```

This makes the board read-only — useful for view-only dashboards.

## Column-Level Drag and Drop Control

Control whether cards can be dragged **out of** or **dropped into** each column individually:

```vue
<e-columns>
  <!-- Cards cannot be dragged out of "To Do" -->
  <e-column headerText="To Do"       keyField="Open"       :allowDrag="false"></e-column>
  <!-- Cards cannot be dropped into "Done" -->
  <e-column headerText="In Progress" keyField="InProgress"></e-column>
  <e-column headerText="Done"        keyField="Close"      :allowDrop="false"></e-column>
</e-columns>
```

| Property | Effect |
|---|---|
| `:allowDrag="false"` | Prevents cards in this column from being dragged away |
| `:allowDrop="false"` | Prevents cards from being dropped into this column |

## Cross-Swimlane Dragging

By default, cards can only be dragged within their own swimlane row. Enable cross-swimlane dragging in `swimlaneSettings`:

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
const swimlaneSettings = {
  keyField: 'Assignee',
  allowDragAndDrop: true   // ← enables cross-row dragging
};
</script>
```

When a card is dropped into a different swimlane row, its swimlane field value is automatically updated.

## External Kanban-to-Kanban

Transfer cards between two separate Kanban boards:

```vue
<template>
  <!-- Board A: externalDropId points to Board B -->
  <ejs-kanban id="KanbanA" ref="kanbanA" keyField="Status"
    :dataSource="kanbanDataA" :cardSettings="cardSettings"
    :externalDropId="['#KanbanB']"
    :dragStop="onDragStop">
    <e-columns>
      <e-column headerText="To Do"       keyField="Open"></e-column>
      <e-column headerText="In Progress" keyField="InProgress"></e-column>
    </e-columns>
  </ejs-kanban>

  <!-- Board B: externalDropId points to Board A -->
  <ejs-kanban id="KanbanB" ref="kanbanB" keyField="Status"
    :dataSource="kanbanDataB" :cardSettings="cardSettings"
    :externalDropId="['#KanbanA']"
    :dragStop="onDragStop">
    <e-columns>
      <e-column headerText="Testing" keyField="Testing"></e-column>
      <e-column headerText="Done"    keyField="Close"></e-column>
    </e-columns>
  </ejs-kanban>
</template>

<script setup>
import { ref } from 'vue';
import { KanbanComponent as EjsKanban, ColumnDirective as EColumn, ColumnsDirective as EColumns } from '@syncfusion/ej2-vue-kanban';

const kanbanA = ref(null);
const kanbanB = ref(null);

const cardSettings = { contentField: 'Summary', headerField: 'Id' };

function onDragStop(args) {
  const sourceKanban = args.event.target.closest('#KanbanA') ? kanbanA.value.ej2Instances : kanbanB.value.ej2Instances;
  const targetKanban = args.event.target.closest('#KanbanA') ? kanbanB.value.ej2Instances : kanbanA.value.ej2Instances;

  if (args.dropIndex !== undefined) {
    // Remove from source board
    sourceKanban.deleteCard(args.data);
    // Resolve duplicate IDs before adding to target
    args.data.forEach(card => {
      const existing = targetKanban.kanbanData.find(d => d.Id === card.Id);
      if (existing) {
        card.Id = Math.max(...targetKanban.kanbanData.map(d => d.Id)) + 1;
      }
    });
    // Add to target board
    targetKanban.addCard(args.data, args.dropIndex);
    args.cancel = true;
  }
}
</script>
```

Key points:
- `externalDropId` accepts CSS selector strings for one or more target boards
- In `dragStop`, use `deleteCard` on the source and `addCard` on the destination
- Check for `args.dropIndex !== undefined` to confirm a cross-board drop occurred (vs. an in-board drop)
- Always deduplicate `headerField` IDs before calling `addCard`

## Kanban to Treeview

Move a card out of Kanban and into a Treeview (and back):

```vue
<template>
  <ejs-kanban id="kanban" ref="kanban" keyField="Status" :dataSource="kanbanData"
    :cardSettings="cardSettings" :dragStop="kanbanDragStop">
    <e-columns>
      <e-column headerText="In Progress" keyField="InProgress"></e-column>
      <e-column headerText="Done"        keyField="Close"></e-column>
    </e-columns>
  </ejs-kanban>

  <ejs-treeview id="treeview" ref="treeview"
    :fields="treeFields" :allowDragAndDrop="true"
    :nodeDragStop="treeDragStop">
  </ejs-treeview>
</template>

<script setup>
import { ref } from 'vue';

const kanban   = ref(null);
const treeview = ref(null);

const cardSettings = { contentField: 'Summary', headerField: 'Id' };
const treeFields   = { dataSource: [], id: 'Id', text: 'Summary' };

// Card dragged out of Kanban → dropped on Treeview
function kanbanDragStop(args) {
  const treeEl = document.getElementById('treeview');
  if (treeEl.contains(args.event.target)) {
    const kanbanObj = kanban.value.ej2Instances;
    const treeObj   = treeview.value.ej2Instances;
    kanbanObj.deleteCard(args.data);
    treeObj.addNodes(args.data);
    args.cancel = true;
  }
}

// Node dragged out of Treeview → dropped on Kanban column
function treeDragStop(args) {
  const kanbanEl = document.getElementById('kanban');
  if (kanbanEl.contains(args.event.target)) {
    const kanbanObj = kanban.value.ej2Instances;
    const treeObj   = treeview.value.ej2Instances;
    treeObj.removeNodes([String(args.draggedNodeData.id)]);
    kanbanObj.openDialog('Add', args.nodeData);
    args.cancel = true;
  }
}
</script>
```

## Kanban to Schedule

Transfer cards to/from a Syncfusion Schedule component:

```vue
<template>
  <ejs-kanban id="kanban" ref="kanban" keyField="Status" :dataSource="kanbanData"
    :cardSettings="cardSettings" :dragStop="kanbanDragStop">
    <e-columns>
      <e-column headerText="Open"        keyField="Open"></e-column>
      <e-column headerText="In Progress" keyField="InProgress"></e-column>
    </e-columns>
  </ejs-kanban>

  <ejs-schedule id="schedule" ref="schedule" :eventSettings="scheduleEventSettings"
    :dragStop="scheduleDragStop">
  </ejs-schedule>
</template>

<script setup>
import { ref } from 'vue';

const kanban   = ref(null);
const schedule = ref(null);

const cardSettings        = { contentField: 'Summary', headerField: 'Id' };
const scheduleEventSettings = { dataSource: [] };

// Card dragged from Kanban to Schedule
function kanbanDragStop(args) {
  const scheduleEl = document.getElementById('schedule');
  if (scheduleEl.contains(args.event.target)) {
    const kanbanObj   = kanban.value.ej2Instances;
    const scheduleObj = schedule.value.ej2Instances;
    kanbanObj.deleteCard(args.data);
    scheduleObj.openEditor(args.data[0], 'Add', true);
    args.cancel = true;
  }
}

// Event dragged from Schedule to Kanban
function scheduleDragStop(args) {
  const kanbanEl = document.getElementById('kanban');
  if (kanbanEl.contains(args.event.target)) {
    const kanbanObj   = kanban.value.ej2Instances;
    const scheduleObj = schedule.value.ej2Instances;
    scheduleObj.deleteEvent(args.data.Id);
    kanbanObj.openDialog('Add', args.data);
    args.cancel = true;
  }
}
</script>
```
