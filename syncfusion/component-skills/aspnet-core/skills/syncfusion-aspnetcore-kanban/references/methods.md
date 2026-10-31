```markdown
# Methods in Syncfusion ASP.NET Core Kanban

## Table of Contents
- [AddCard](#addcard)
- [AddColumn](#addcolumn)
- [AddEventListener](#addeventlistener)
- [AppendTo](#appendto)
- [CloseDialog](#closedialog)
- [DataBind](#databind)
- [DeleteCard](#deletecard)
- [DeleteColumn](#deletecolumn)
- [Destroy](#destroy)
- [GetCardDetails](#getcarddetails)
- [GetColumnData](#getcolumndata)
- [GetRootElement](#getrootelement)
- [GetSelectedCards](#getselectedcards)
- [GetSwimlaneData](#getswimlanedata)
- [HideColumn](#hidecolumn)
- [HideSpinner](#hidespinner)
- [Inject](#inject)
- [OpenDialog](#opendialog)
- [Refresh](#refresh)
- [RefreshHeader](#refreshheader)
- [RefreshUI](#refreshui)
- [RemoveEventListener](#removeeventlistener)
- [ShowColumn](#showcolumn)
- [ShowSpinner](#showspinner)
- [UpdateCard](#updatecard)

> **Note:** All methods are accessed via the component JavaScript instance:  
> `var kanbanObj = document.getElementById('Kanban').ej2_instances[0];`

## AddCard

**Signature:** `AddCard(cardData: Record | Record[], index?: number): void`  
**Description:** Adds one or more new cards to the Kanban data source and layout.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `cardData` | `Record \| Record[]` | Yes | Single card object or array of card objects to add |
| `index` | `number` | No | Column index at which to insert the card |

```javascript
var kanbanObj = document.getElementById('Kanban').ej2_instances[0];

// Add a single card
kanbanObj.addCard({ Id: 'Task-100', Title: 'New Task', Status: 'Open', Summary: 'A new task.' });

// Add multiple cards
kanbanObj.addCard([
    { Id: 'Task-101', Title: 'Task A', Status: 'Open', Summary: 'First task.' },
    { Id: 'Task-102', Title: 'Task B', Status: 'InProgress', Summary: 'Second task.' }
]);
```

## AddColumn

**Signature:** `AddColumn(columnOptions: ColumnsModel, index: number): void`  
**Description:** Dynamically adds a column to the Kanban board at the specified index.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `columnOptions` | `ColumnsModel` | Yes | Column properties (headerText, keyField, etc.) |
| `index` | `number` | Yes | Position at which to insert the new column |

```javascript
var kanbanObj = document.getElementById('Kanban').ej2_instances[0];
kanbanObj.addColumn({ headerText: 'Review', keyField: 'Review' }, 2);
```

→ See also: [dynamically-change-columns how-to guide](how-to.md#dynamically-change-columns)

## AddEventListener

**Signature:** `AddEventListener(eventName: string, handler: Function): void`  
**Description:** Attaches a handler function to the specified Kanban event.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `eventName` | `string` | Yes | Name of the event (e.g., `"dragStop"`) |
| `handler` | `Function` | Yes | Callback function to run when the event fires |

```javascript
var kanbanObj = document.getElementById('Kanban').ej2_instances[0];
kanbanObj.addEventListener('dragStop', function(args) {
    console.log('Drag stopped:', args.data);
});
```

## AppendTo

**Signature:** `AppendTo(selector?: string | HTMLElement): void`  
**Description:** Appends the Kanban control into the specified HTML element.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `selector` | `string \| HTMLElement` | No | Target element selector or DOM element |

```javascript
var kanbanObj = document.getElementById('Kanban').ej2_instances[0];
kanbanObj.appendTo('#container');
```

## CloseDialog

**Signature:** `CloseDialog(): void`  
**Description:** Programmatically closes the card edit dialog.

```javascript
var kanbanObj = document.getElementById('Kanban').ej2_instances[0];
kanbanObj.closeDialog();
```

## DataBind

**Signature:** `DataBind(): void`  
**Description:** Applies all pending property changes immediately to the component.

```javascript
var kanbanObj = document.getElementById('Kanban').ej2_instances[0];
kanbanObj.keyField = 'NewStatus';
kanbanObj.dataBind();
```

## DeleteCard

**Signature:** `DeleteCard(cardData: string | number | Record | Record[]): void`  
**Description:** Deletes a card (or cards) from the Kanban by ID or by card object.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `cardData` | `string \| number \| Record \| Record[]` | Yes | Card ID(s) or card object(s) to remove |

```javascript
var kanbanObj = document.getElementById('Kanban').ej2_instances[0];

// Delete by ID
kanbanObj.deleteCard('Task-29001');

// Delete by card object
kanbanObj.deleteCard({ Id: 'Task-29001', Title: 'Analyze', Status: 'Open' });

// Delete multiple cards
kanbanObj.deleteCard(['Task-29001', 'Task-29002']);
```

## DeleteColumn

**Signature:** `DeleteColumn(index: number): void`  
**Description:** Removes the column at the specified index from the Kanban board.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `index` | `number` | Yes | Zero-based index of the column to delete |

```javascript
var kanbanObj = document.getElementById('Kanban').ej2_instances[0];
kanbanObj.deleteColumn(1); // Removes the second column
```

## Destroy

**Signature:** `Destroy(): void`  
**Description:** Removes the Kanban control from the DOM and detaches all related event handlers, attributes, and CSS classes.

```javascript
var kanbanObj = document.getElementById('Kanban').ej2_instances[0];
kanbanObj.destroy();
```

## GetCardDetails

**Signature:** `GetCardDetails(target: Element): Record`  
**Description:** Returns the card data object associated with a given card DOM element.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `target` | `Element` | Yes | The card's DOM element |

**Returns:** `Record` — the card data object

```javascript
var kanbanObj = document.getElementById('Kanban').ej2_instances[0];
var cardElement = document.querySelector('.e-card');
var cardData = kanbanObj.getCardDetails(cardElement);
console.log(cardData); // { Id: 'Task-29001', Title: '...', Status: 'Open', ... }
```

## GetColumnData

**Signature:** `GetColumnData(columnKey: string | number, dataSource?: Record[]): Record[]`  
**Description:** Returns all card data objects belonging to the specified column key.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `columnKey` | `string \| number` | Yes | The column's `keyField` value |
| `dataSource` | `Record[]` | No | Optional custom data source to query instead of board data |

**Returns:** `Record[]` — array of card objects in the column

```javascript
var kanbanObj = document.getElementById('Kanban').ej2_instances[0];
var openCards = kanbanObj.getColumnData('Open');
console.log(openCards); // Array of cards with Status === 'Open'
```

## GetRootElement

**Signature:** `GetRootElement(): HTMLElement`  
**Description:** Returns the root DOM element of the Kanban component.

**Returns:** `HTMLElement`

```javascript
var kanbanObj = document.getElementById('Kanban').ej2_instances[0];
var rootEl = kanbanObj.getRootElement();
console.log(rootEl); // <div id="Kanban" class="e-kanban ...">
```

## GetSelectedCards

**Signature:** `GetSelectedCards(): HTMLElement[]`  
**Description:** Returns the list of currently selected card DOM elements.

**Returns:** `HTMLElement[]`

```javascript
var kanbanObj = document.getElementById('Kanban').ej2_instances[0];
var selected = kanbanObj.getSelectedCards();
selected.forEach(function(card) {
    console.log(kanbanObj.getCardDetails(card));
});
```

## GetSwimlaneData

**Signature:** `GetSwimlaneData(keyField: string): Record[]`  
**Description:** Returns all card data objects in the specified swimlane row.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `keyField` | `string` | Yes | The swimlane `keyField` value (e.g., the assignee name) |

**Returns:** `Record[]`

```javascript
var kanbanObj = document.getElementById('Kanban').ej2_instances[0];
var andrewCards = kanbanObj.getSwimlaneData('Andrew Fuller');
console.log(andrewCards);
```

## HideColumn

**Signature:** `HideColumn(key: string | number): void`  
**Description:** Hides a visible column by its `keyField` value.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `key` | `string \| number` | Yes | The `keyField` of the column to hide |

```javascript
var kanbanObj = document.getElementById('Kanban').ej2_instances[0];
kanbanObj.hideColumn('InProgress');
```

## HideSpinner

**Signature:** `HideSpinner(): void`  
**Description:** Hides the loading spinner that was shown with `ShowSpinner`.

```javascript
var kanbanObj = document.getElementById('Kanban').ej2_instances[0];
kanbanObj.hideSpinner();
```

## Inject

**Signature:** `Inject(moduleList: Function[]): void`  
**Description:** Dynamically injects optional feature modules into the Kanban component.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `moduleList` | `Function[]` | Yes | Array of module constructors to inject |

```javascript
ej.kanban.Kanban.Inject(ej.kanban.VirtualScroll);
```

## OpenDialog

**Signature:** `OpenDialog(action: CurrentAction, data?: Record): void`  
**Description:** Programmatically opens the card edit dialog for adding a new card or editing an existing one.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `action` | `CurrentAction` | Yes | `"Add"` for new card creation, `"Edit"` for editing an existing card |
| `data` | `Record` | No | Card data to pre-populate the dialog (required for `"Edit"`) |

```javascript
var kanbanObj = document.getElementById('Kanban').ej2_instances[0];

// Open dialog to add a new card
kanbanObj.openDialog('Add');

// Open dialog to edit an existing card
kanbanObj.openDialog('Edit', { Id: 'Task-29001', Title: 'Analyze', Status: 'Open' });
```

## Refresh

**Signature:** `Refresh(): void`  
**Description:** Applies all pending property changes and re-renders the Kanban component.

```javascript
var kanbanObj = document.getElementById('Kanban').ej2_instances[0];
kanbanObj.refresh();
```

## RefreshHeader

**Signature:** `RefreshHeader(): void`  
**Description:** Re-renders only the column header row without refreshing the full board.

```javascript
var kanbanObj = document.getElementById('Kanban').ej2_instances[0];
kanbanObj.refreshHeader();
```

## RefreshUI

**Signature:** `RefreshUI(args: ActionEventArgs, index?: number): void`  
**Description:** Refreshes the Kanban UI based on modified (added, changed, or deleted) records.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `args` | `ActionEventArgs` | Yes | Object containing added, changed, or deleted card data |
| `index` | `number` | No | Index of the changed item |

```javascript
var kanbanObj = document.getElementById('Kanban').ej2_instances[0];
kanbanObj.refreshUI({
    addedRecords: [{ Id: 'Task-200', Title: 'New Task', Status: 'Open' }],
    changedRecords: [],
    deletedRecords: []
});
```

## RemoveEventListener

**Signature:** `RemoveEventListener(eventName: string, handler: Function): void`  
**Description:** Removes a previously attached event handler from a Kanban event.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `eventName` | `string` | Yes | Name of the event |
| `handler` | `Function` | Yes | The exact handler function to remove |

```javascript
var kanbanObj = document.getElementById('Kanban').ej2_instances[0];

function myHandler(args) { console.log(args); }

kanbanObj.addEventListener('dragStop', myHandler);
// Later, remove it:
kanbanObj.removeEventListener('dragStop', myHandler);
```

## ShowColumn

**Signature:** `ShowColumn(key: string | number): void`  
**Description:** Shows a previously hidden column by its `keyField` value.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `key` | `string \| number` | Yes | The `keyField` of the hidden column to show |

```javascript
var kanbanObj = document.getElementById('Kanban').ej2_instances[0];
kanbanObj.showColumn('InProgress');
```

## ShowSpinner

**Signature:** `ShowSpinner(): void`  
**Description:** Displays the loading spinner on the Kanban board.

```javascript
var kanbanObj = document.getElementById('Kanban').ej2_instances[0];
kanbanObj.showSpinner();
// Perform async operation...
kanbanObj.hideSpinner();
```

## UpdateCard

**Signature:** `UpdateCard(cardData: Record | Record[], index?: number): void`  
**Description:** Updates one or more existing cards in the Kanban data source and re-renders them.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `cardData` | `Record \| Record[]` | Yes | Updated card object or array of card objects |
| `index` | `number` | No | Column index position for the updated card |

```javascript
var kanbanObj = document.getElementById('Kanban').ej2_instances[0];

// Update a single card
kanbanObj.updateCard({ Id: 'Task-29001', Title: 'Updated Task', Status: 'InProgress', Summary: 'Updated.' });

// Update multiple cards
kanbanObj.updateCard([
    { Id: 'Task-29001', Status: 'Close' },
    { Id: 'Task-29002', Status: 'Testing' }
]);
```
```
