# Kanban Public Methods

Access methods via a template ref:

```vue
<ejs-kanban ref="kanban" ...>
```
```js
const kanban = ref(null);
// Access the underlying EJ2 instance:
const kanbanObj = kanban.value.ej2Instances;
kanbanObj.methodName(args);
```

## Table of Contents
- [Card CRUD Methods](#card-crud-methods)
- [Column Methods](#column-methods)
- [Dialog Methods](#dialog-methods)
- [Data Query Methods](#data-query-methods)
- [Selection Methods](#selection-methods)
- [UI Methods](#ui-methods)

---

## Card CRUD Methods

### `addCard(cardData, index?)`
Adds one or more cards to the board and data source.

```js
// Add a single card
kanbanObj.addCard({ Id: 100, Status: 'Open', Summary: 'New task' });

// Add multiple cards at a specific position index
kanbanObj.addCard([card1, card2], 2);
```

| Parameter | Type | Required | Description |
|---|---|---|---|
| `cardData` | `Record \| Record[]` | ✅ | Card object(s) to add |
| `index` | `number` | — | Position to insert within the column |

### `updateCard(cardData, index?)`
Updates existing card(s) in the data source and refreshes the board.

```js
kanbanObj.updateCard({ Id: 5, Status: 'InProgress', Summary: 'Updated summary' });
```

### `deleteCard(cardData)`
Removes card(s) by ID value, card object, or array of card objects.

```js
// Delete by ID
kanbanObj.deleteCard(5);
kanbanObj.deleteCard('task-001');

// Delete by card object
kanbanObj.deleteCard({ Id: 5, Status: 'Open' });

// Delete multiple
kanbanObj.deleteCard([card1, card2]);
```

### `getCardDetails(target)`
Returns the data object for the card element passed as argument.

```js
const cardEl = document.querySelector('.e-card');
const data   = kanbanObj.getCardDetails(cardEl);
console.log(data.Id, data.Summary);
```

---

## Column Methods

### `addColumn(columnOptions, index)`
Dynamically inserts a new column at the given index.

```js
kanbanObj.addColumn(
  { headerText: 'Review', keyField: 'Review', allowToggle: true },
  2  // insert as the 3rd column
);
```

The `columnOptions` object accepts all `ColumnsModel` properties: `headerText`, `keyField`, `allowToggle`, `isExpanded`, `allowDrag`, `allowDrop`, `minCount`, `maxCount`, `showAddButton`, `showItemCount`, `template`, `transitionColumns`.

### `deleteColumn(index)`
Removes the column at the given index.

```js
kanbanObj.deleteColumn(1); // removes the second column
```

### `showColumn(key)`
Makes a previously hidden column visible.

```js
kanbanObj.showColumn('Testing');
```

### `hideColumn(key)`
Hides a column by its `keyField` value.

```js
kanbanObj.hideColumn('Close');
```

### `getColumnData(columnKey, dataSource?)`
Returns all card data objects that belong to the specified column.

```js
const inProgressCards = kanbanObj.getColumnData('InProgress');

// Or search within a specific data array:
const filtered = kanbanObj.getColumnData('Open', customArray);
```

---

## Dialog Methods

### `openDialog(action, data?)`
Programmatically opens the card edit dialog.

```js
// Open Add dialog (empty form)
kanbanObj.openDialog('Add');

// Open Edit dialog for a specific card
kanbanObj.openDialog('Edit', { Id: 5, Status: 'Open', Summary: 'Fix bug' });
```

`action` values: `'Add'`, `'Edit'`, `'Delete'`.

### `closeDialog()`
Programmatically closes the currently open dialog.

```js
kanbanObj.closeDialog();
```

---

## Data Query Methods

### `getSwimlaneData(keyField)`
Returns all cards belonging to the specified swimlane row.

```js
const andrewCards = kanbanObj.getSwimlaneData('Andrew Fuller');
```

---

## Selection Methods

### `getSelectedCards()`
Returns an array of currently selected card HTML elements.

```js
const selected = kanbanObj.getSelectedCards();
selected.forEach(el => console.log(kanbanObj.getCardDetails(el)));
```

---

## UI Methods

### `refreshHeader()`
Forces a re-render of all column headers (useful after programmatic column property changes).

```js
kanbanObj.columns[0].allowToggle = true;
kanbanObj.refreshHeader();
```

### `refreshUI(args, index?)`
Updates the board UI after manual data changes without a full re-render.

```js
kanbanObj.refreshUI({
  addedRecords:   [newCard],
  changedRecords: [],
  deletedRecords: [],
});
```

### `showSpinner()`
Displays the loading spinner overlay.

```js
kanbanObj.showSpinner();
```

### `hideSpinner()`
Hides the loading spinner shown by `showSpinner()`.

```js
kanbanObj.hideSpinner();
```

### `destroy()`
Removes the Kanban component from the DOM and detaches all event handlers.

```js
kanbanObj.destroy();
```
