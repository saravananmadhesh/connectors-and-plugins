# Kanban Events Reference

## Table of Contents
- [Action Events](#action-events)
- [Card Events](#card-events)
- [Column Drag Events](#column-drag-events)
- [Data Events](#data-events)
- [Dialog Events](#dialog-events)
- [Drag Events (Card Drag-and-Drop)](#drag-events-card-drag-and-drop)
- [Lifecycle Events](#lifecycle-events)
- [Using Events in Vue](#using-events-in-vue)

---

## Action Events

### `actionBegin`
Fires at the beginning of every Kanban action (add, edit, delete, etc.).

| Argument | Type | Description |
|---|---|---|
| `addedRecords` | `Record[]` | Cards being added |
| `changedRecords` | `Record[]` | Cards being updated |
| `deletedRecords` | `Record[]` | Cards being deleted |
| `requestType` | `string` | Current action type (e.g. `'cardChanged'`, `'cardAdded'`) |
| `target` | `HTMLElement` | Target DOM element |
| `cancel` | `boolean` | Set `true` to cancel the action |

### `actionComplete`
Fires after a Kanban action completes successfully. Same arguments as `actionBegin`.

### `actionFailure`
Fires when a Kanban action fails (e.g. remote data error). Same arguments as `actionBegin`.

---

## Card Events

### `cardClick`
Fires on a single click of any card.

| Argument | Type | Description |
|---|---|---|
| `data` | `Record` | The clicked card's data object |
| `element` | `Element` | The card's HTML element |
| `event` | `MouseEvent \| KeyboardEvent` | The browser event |
| `cancel` | `boolean` | Set `true` to cancel the action |

### `cardDoubleClick`
Fires on a double-click of any card. Same arguments as `cardClick`.

### `cardRendered`
Fires before each card is rendered. Use this to apply conditional CSS classes:

| Argument | Type | Description |
|---|---|---|
| `data` | `Record` | Card data object |
| `element` | `Element` | Card's HTML element (not yet in DOM) |
| `cancel` | `boolean` | Set `true` to skip rendering this card |

**Example — add a CSS class based on card data:**
```vue
<ejs-kanban :cardRendered="onCardRendered" ...>
```
```js
const onCardRendered = (args) => {
  if (args.data.Priority === 'High') {
    args.element.classList.add('high-priority');
  }
};
```

---

## Column Drag Events

### `columnDragStart`
Fires when a column header drag begins.

| Argument | Type | Description |
|---|---|---|
| `column` | `object` | Column data object being dragged |
| `element` | `HTMLElement` | Column's HTML element |
| `fromIndex` | `number` | Original column index |
| `event` | `MouseEvent \| TouchEvent` | The browser event |
| `cancel` | `boolean` | Set `true` to cancel the drag |

### `columnDrag`
Fires continuously while a column is being dragged. Same arguments as `columnDragStart`, plus:

| Argument | Type | Description |
|---|---|---|
| `toIndex` | `number` | Current target index during drag |

### `columnDrop`
Fires when a column is dropped. Same arguments as `columnDrag`, plus:

| Argument | Type | Description |
|---|---|---|
| `dropIndex` | `number` | Final index where column was dropped |

---

## Data Events

### `dataBinding`
Fires before data is bound to the Kanban. Use to preprocess or modify the data source.

### `dataBound`
Fires once all data is bound and the board is fully rendered. Use to attach DOM event listeners:

```vue
<ejs-kanban :dataBound="onDataBound" ...>
```
```js
const onDataBound = () => {
  // Safe to query the DOM here
  document.querySelector('.e-header-row')
    .addEventListener('dblclick', handleHeaderDblClick);
};
```

### `dataSourceChanged`
Fires when the data source changes (add/edit/delete). Use this for custom data persistence. Call `args.endEdit()` after processing:

| Argument | Type | Description |
|---|---|---|
| `addedRecords` | `Record[]` | Newly added cards |
| `changedRecords` | `Record[]` | Modified cards |
| `deletedRecords` | `Record[]` | Deleted cards |
| `requestType` | `string` | Action type |
| `endEdit` | `Function` | Call after finishing async persistence |
| `cancelEdit` | `Function` | Call to revert the operation |

### `dataStateChange`
Fires on Kanban state changes (useful for custom remote data state management):

| Argument | Type | Description |
|---|---|---|
| `action` | `ActionEventArgs` | Details of the action |
| `where` | `Predicate[]` | Filter conditions |
| `select` | `string[]` | Selected field names |

---

## Dialog Events

### `dialogOpen`
Fires before the card edit dialog opens:

| Argument | Type | Description |
|---|---|---|
| `data` | `Record` | Card data (empty object for Add) |
| `element` | `Element` | Dialog wrapper element |
| `requestType` | `'Add' \| 'Edit' \| 'Delete'` | Dialog action type |
| `cancel` | `boolean` | Set `true` to prevent the dialog from opening |

### `dialogClose`
Fires before the dialog closes. Same arguments as `dialogOpen`.

---

## Drag Events (Card Drag-and-Drop)

### `dragStart`
Fires when a card drag begins.

| Argument | Type | Description |
|---|---|---|
| `data` | `Record[]` | Array of dragged card data objects |
| `element` | `HTMLElement \| HTMLElement[]` | Dragged card elements |
| `event` | `MouseEvent` | The browser event |
| `cancel` | `boolean` | Set `true` to cancel the drag |

### `drag`
Fires while a card is being dragged. Same arguments as `dragStart`, plus:

| Argument | Type | Description |
|---|---|---|
| `dropIndex` | `number` | Current target drop position |

### `dragStop`
Fires when a card drag ends (whether dropped or cancelled). Same arguments as `drag`. Use this for external drop handling (Kanban-to-Kanban, Kanban-to-Treeview, etc.):

```js
const onDragStop = (args) => {
  if (isExternalDrop(args.event.target)) {
    kanban.value.ej2Instances.deleteCard(args.data);
    externalTarget.addItems(args.data);
    args.cancel = true; // prevent default in-board drop
  }
};
```

---

## Lifecycle Events

### `created`
Fires after the Kanban is fully instantiated. At this point, the component is in the DOM and all properties are initialized.

---

## Column Rendering Event

### `queryCellInfo`
Fires before each column cell renders. Use to customize column cell appearance:

| Argument | Type | Description |
|---|---|---|
| `data` | `HeaderArgs[]` | Array of header info objects (`count`, `keyField`, `textField`) |
| `element` | `Element` | The column cell HTML element |
| `requestType` | `string` | The type of column rendering |
| `cancel` | `boolean` | Set `true` to cancel rendering |

---

## Using Events in Vue

Bind events as props in the template:

```vue
<template>
  <ejs-kanban
    keyField="Status"
    :dataSource="kanbanData"
    :cardSettings="cardSettings"
    :cardClick="onCardClick"
    :cardRendered="onCardRendered"
    :dragStop="onDragStop"
    :dialogOpen="onDialogOpen"
    :dataBound="onDataBound"
    :actionBegin="onActionBegin"
  >
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

const onCardClick    = (args) => console.log('Clicked:', args.data);
const onCardRendered = (args) => { if (args.data.Type === 'Bug') args.element.classList.add('bug-card'); };
const onDragStop     = (args) => console.log('Dropped at index:', args.dropIndex);
const onDialogOpen   = (args) => { if (args.requestType === 'Delete') args.cancel = true; };
const onDataBound    = ()     => console.log('Board fully rendered');
const onActionBegin  = (args) => console.log('Action:', args.requestType);
</script>
```
