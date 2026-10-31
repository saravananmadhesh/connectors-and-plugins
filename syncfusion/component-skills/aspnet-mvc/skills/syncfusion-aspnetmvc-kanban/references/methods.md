# Kanban Methods Reference

## Table of Contents
- [Overview](#overview)
- [Card Operations](#card-operations)
- [Column Operations](#column-operations)
- [Dialog Operations](#dialog-operations)
- [Data Operations](#data-operations)
- [UI Operations](#ui-operations)
- [Selection Operations](#selection-operations)
- [Lifecycle Methods](#lifecycle-methods)
- [Event Management](#event-management)

## Overview

Kanban provides public API methods for programmatic control of the board, enabling dynamic manipulation of cards, columns, dialogs, and other features without user interaction.

**Accessing Kanban Instance:**

```javascript
// Get Kanban instance
var kanbanObj = document.getElementById('kanban').ej2_instances[0];

// Call methods
kanbanObj.addCard(cardData);
kanbanObj.deleteCard(cardId);
```

## Card Operations

### AddCard

Adds new card(s) to the Kanban data source and updates the layout.

**Signature:** `public void AddCard(object cardData, int? index = null)`

**Parameters:**
- `cardData` (required) — `object` | `List<object>` — Single card object or collection of cards
- `index` (optional) — `int` — Index position to insert the card in the column

**Example - Add Single Card:**

```javascript
var kanbanObj = document.getElementById('kanban').ej2_instances[0];

var newCard = {
    Id: 101,
    Status: 'Open',
    Summary: 'New Task',
    Assignee: 'Nancy',
    Priority: 'High'
};

kanbanObj.addCard(newCard);
```

**Example - Add Card at Specific Position:**

```javascript
// Add card at index 2 in its column
kanbanObj.addCard(newCard, 2);
```

**Example - Add Multiple Cards:**

```javascript
var newCards = [
    { Id: 101, Status: 'Open', Summary: 'Task 1', Assignee: 'Nancy' },
    { Id: 102, Status: 'InProgress', Summary: 'Task 2', Assignee: 'Andrew' },
    { Id: 103, Status: 'Testing', Summary: 'Task 3', Assignee: 'Janet' }
];

kanbanObj.addCard(newCards);
```

### UpdateCard

Updates existing card(s) with new data.

**Signature:** `public void UpdateCard(object cardData, int? index = null)`

**Parameters:**
- `cardData` (required) — `object` | `List<object>` — Updated card object(s)
- `index` (optional) — `int` — New index position in the column

**Example - Update Single Card:**

```javascript
var kanbanObj = document.getElementById('kanban').ej2_instances[0];

var updatedCard = {
    Id: 5,
    Status: 'Testing',
    Summary: 'Updated Task Description',
    Assignee: 'Andrew',
    Priority: 'Critical'
};

kanbanObj.updateCard(updatedCard);
```

**Example - Update Multiple Cards:**

```javascript
var updatedCards = [
    { Id: 5, Status: 'Testing', Priority: 'High' },
    { Id: 10, Status: 'Close', Assignee: 'Janet' }
];

kanbanObj.updateCard(updatedCards);
```

**Example - Update and Change Position:**

```javascript
// Move card to index 0 in its column
kanbanObj.updateCard(updatedCard, 0);
```

### DeleteCard

Deletes card(s) from the Kanban board.

**Signature:** `public void DeleteCard(object cardData)`

**Parameters:**
- `cardData` (required) — `string` | `int` | `object` | `List<object>` — Card ID, card object, or collection

**Example - Delete by ID:**

```javascript
var kanbanObj = document.getElementById('kanban').ej2_instances[0];

// Delete card with ID 5
kanbanObj.deleteCard(5);

// Or with string ID
kanbanObj.deleteCard('TASK-101');
```

**Example - Delete by Object:**

```javascript
var cardToDelete = kanbanObj.kanbanData.find(c => c.Id === 5);
kanbanObj.deleteCard(cardToDelete);
```

**Example - Delete Multiple Cards:**

```javascript
var cardsToDelete = [
    { Id: 5, Status: 'Open' },
    { Id: 10, Status: 'InProgress' }
];

kanbanObj.deleteCard(cardsToDelete);
```

### GetCardDetails

Returns card details based on the card element.

**Signature:** `public object GetCardDetails(Element target)`

**Parameters:**
- `target` (required) — `Element` — Card DOM element

**Returns:** Card data object

**Example:**

```javascript
// In card click event
function onCardClick(args) {
    var kanbanObj = document.getElementById('kanban').ej2_instances[0];
    var cardElement = args.element;
    
    var cardDetails = kanbanObj.getCardDetails(cardElement);
    console.log('Card Details:', cardDetails);
    console.log('ID:', cardDetails.Id);
    console.log('Summary:', cardDetails.Summary);
}
```

**Example - Get Card on Custom Event:**

```javascript
document.querySelector('.e-kanban').addEventListener('contextmenu', function(e) {
    var cardElement = e.target.closest('.e-card');
    if (cardElement) {
        var kanbanObj = document.getElementById('kanban').ej2_instances[0];
        var cardData = kanbanObj.getCardDetails(cardElement);
        showContextMenu(cardData);
    }
});
```

## Column Operations

### AddColumn

Dynamically adds a new column to the Kanban board.

**Signature:** `public void AddColumn(ColumnsModel columnOptions, int index)`

**Parameters:**
- `columnOptions` (required) — `ColumnsModel` — Column configuration
  - `headerText` — Column header title
  - `keyField` — Column key
  - `allowToggle` — Enable collapse/expand
  - `maxCount` — Maximum card limit
  - `minCount` — Minimum card requirement
  - `showAddButton` — Show add card button
  - `showItemCount` — Show card count
- `index` (required) — `int` — Position to insert the column

**Example:**

```javascript
var kanbanObj = document.getElementById('kanban').ej2_instances[0];

var newColumn = {
    headerText: 'Code Review',
    keyField: 'Review',
    allowToggle: true,
    maxCount: 5,
    showAddButton: true,
    showItemCount: true
};

// Add column at index 2
kanbanObj.addColumn(newColumn, 2);
```

### DeleteColumn

Deletes a column from the Kanban board.

**Signature:** `public void DeleteColumn(int index)`

**Parameters:**
- `index` (required) — `int` — Index of the column to delete

**Example:**

```javascript
var kanbanObj = document.getElementById('kanban').ej2_instances[0];

// Delete column at index 3
kanbanObj.deleteColumn(3);
```

**Example - Delete by KeyField:**

```javascript
// Find column index by keyField
var columns = kanbanObj.columns;
var indexToDelete = columns.findIndex(col => col.keyField === 'Testing');

if (indexToDelete !== -1) {
    kanbanObj.deleteColumn(indexToDelete);
}
```

### ShowColumn

Shows a previously hidden column.

**Signature:** `public void ShowColumn(string key)`

**Parameters:**
- `key` (required) — `string` | `int` — Column key field

**Example:**

```javascript
var kanbanObj = document.getElementById('kanban').ej2_instances[0];

// Show column by key
kanbanObj.showColumn('Testing');
```

### HideColumn

Hides a column from the Kanban board.

**Signature:** `public void HideColumn(string key)`

**Parameters:**
- `key` (required) — `string` | `int` — Column key field

**Example:**

```javascript
var kanbanObj = document.getElementById('kanban').ej2_instances[0];

// Hide column by key
kanbanObj.hideColumn('Testing');
```

**Example - Toggle Column Visibility:**

```javascript
function toggleColumn(columnKey) {
    var kanbanObj = document.getElementById('kanban').ej2_instances[0];
    var column = kanbanObj.columns.find(col => col.keyField === columnKey);
    
    if (column.isVisible) {
        kanbanObj.hideColumn(columnKey);
    } else {
        kanbanObj.showColumn(columnKey);
    }
}
```

## Dialog Operations

### OpenDialog

Manually opens the add/edit dialog.

**Signature:** `public void OpenDialog(CurrentAction action, object data = null)`

**Parameters:**
- `action` (required) — `CurrentAction` — Dialog action ('Add' or 'Edit')
- `data` (optional) — `object` — Card data for editing

**Example - Open Add Dialog:**

```javascript
var kanbanObj = document.getElementById('kanban').ej2_instances[0];

// Open dialog to add new card
kanbanObj.openDialog('Add');
```

**Example - Open Edit Dialog:**

```javascript
// Open dialog to edit specific card
var cardToEdit = kanbanObj.kanbanData.find(c => c.Id === 5);
kanbanObj.openDialog('Edit', cardToEdit);
```

**Example - Add Card to Specific Column:**

```javascript
// Pre-fill Status field for new card
kanbanObj.openDialog('Add', { Status: 'InProgress' });
```

### CloseDialog

Manually closes the currently open dialog.

**Signature:** `public void CloseDialog()`

**Example:**

```javascript
var kanbanObj = document.getElementById('kanban').ej2_instances[0];

// Close dialog programmatically
kanbanObj.closeDialog();
```

**Example - Close Dialog on Custom Validation:**

```javascript
function onDialogOpen(args) {
    if (args.requestType === 'Edit' && !hasEditPermission(args.data.Id)) {
        var kanbanObj = document.getElementById('kanban').ej2_instances[0];
        kanbanObj.closeDialog();
        alert('You do not have permission to edit this card');
    }
}
```

## Data Operations

### GetColumnData

Returns all cards in a specific column.

**Signature:** `public List<object> GetColumnData(string columnKey, List<object> dataSource = null)`

**Parameters:**
- `columnKey` (required) — `string` | `int` — Column key field
- `dataSource` (optional) — `List<object>` — Custom data source (uses board data if not provided)

**Returns:** Array of card objects in the column

**Example:**

```javascript
var kanbanObj = document.getElementById('kanban').ej2_instances[0];

// Get all cards in "InProgress" column
var inProgressCards = kanbanObj.getColumnData('InProgress');
console.log('In Progress Cards:', inProgressCards.length);
```

**Example - Check Column Capacity:**

```javascript
function checkColumnCapacity(columnKey) {
    var kanbanObj = document.getElementById('kanban').ej2_instances[0];
    var columnData = kanbanObj.getColumnData(columnKey);
    var column = kanbanObj.columns.find(col => col.keyField === columnKey);
    
    if (columnData.length >= column.maxCount) {
        alert('Column is at maximum capacity!');
        return false;
    }
    return true;
}
```

### GetSwimlaneData

Returns all cards in a specific swimlane row.

**Signature:** `public List<object> GetSwimlaneData(string keyField)`

**Parameters:**
- `keyField` (required) — `string` — Swimlane key field value

**Returns:** Array of card objects in the swimlane

**Example:**

```javascript
var kanbanObj = document.getElementById('kanban').ej2_instances[0];

// Get all cards assigned to Nancy
var nancyCards = kanbanObj.getSwimlaneData('Nancy');
console.log('Nancy has', nancyCards.length, 'cards');
```

**Example - Calculate Workload:**

```javascript
function calculateWorkload(assignee) {
    var kanbanObj = document.getElementById('kanban').ej2_instances[0];
    var assigneeCards = kanbanObj.getSwimlaneData(assignee);
    
    var totalHours = assigneeCards.reduce((sum, card) => {
        return sum + (card.Estimate || 0);
    }, 0);
    
    return {
        cardCount: assigneeCards.length,
        totalHours: totalHours
    };
}
```

## Selection Operations

### GetSelectedCards

Returns all currently selected cards.

**Signature:** `public List<Element> GetSelectedCards()`

**Returns:** Array of selected card DOM elements

**Example:**

```javascript
var kanbanObj = document.getElementById('kanban').ej2_instances[0];

// Get selected cards
var selectedCards = kanbanObj.getSelectedCards();
console.log('Selected cards:', selectedCards.length);

// Get data for selected cards
selectedCards.forEach(function(cardElement) {
    var cardData = kanbanObj.getCardDetails(cardElement);
    console.log('Selected:', cardData.Id, cardData.Summary);
});
```

**Example - Bulk Operations on Selected:**

```javascript
function deleteSelectedCards() {
    var kanbanObj = document.getElementById('kanban').ej2_instances[0];
    var selectedCards = kanbanObj.getSelectedCards();
    
    if (selectedCards.length === 0) {
        alert('No cards selected');
        return;
    }
    
    if (confirm(`Delete ${selectedCards.length} cards?`)) {
        var cardsToDelete = selectedCards.map(el => kanbanObj.getCardDetails(el));
        kanbanObj.deleteCard(cardsToDelete);
    }
}
```

## UI Operations

### Refresh

Refreshes the entire Kanban board, reapplying all pending property changes.

**Signature:** `public void Refresh()`

**Example:**

```javascript
var kanbanObj = document.getElementById('kanban').ej2_instances[0];

// Make multiple changes
kanbanObj.dataSource = newData;
kanbanObj.columns = newColumns;

// Apply all changes
kanbanObj.refresh();
```

### RefreshHeader

Refreshes only the column headers (useful after column modifications).

**Signature:** `public void RefreshHeader()`

**Example:**

```javascript
var kanbanObj = document.getElementById('kanban').ej2_instances[0];

// Modify column header
kanbanObj.columns[0].headerText = 'Updated Header';

// Refresh headers only
kanbanObj.refreshHeader();
```

### RefreshUI

Refreshes the Kanban UI based on modified records.

**Signature:** `public void RefreshUI(ActionEventArgs args, int? index = null)`

**Parameters:**
- `args` (required) — `ActionEventArgs` — Contains added, changed, or deleted data
- `index` (optional) — `int` — Index of the changed items

**Example:**

```javascript
var kanbanObj = document.getElementById('kanban').ej2_instances[0];

var actionArgs = {
    changedRecords: [
        { Id: 5, Status: 'Testing', Summary: 'Updated task' }
    ]
};

kanbanObj.refreshUI(actionArgs);
```

### ShowSpinner

Displays a loading spinner on the Kanban board.

**Signature:** `public void ShowSpinner()`

**Example:**

```javascript
var kanbanObj = document.getElementById('kanban').ej2_instances[0];

// Show spinner during async operation
kanbanObj.showSpinner();

// Fetch data from server
$.ajax({
    url: '/Kanban/GetData',
    success: function(data) {
        kanbanObj.dataSource = data;
        kanbanObj.hideSpinner();
    },
    error: function() {
        kanbanObj.hideSpinner();
    }
});
```

### HideSpinner

Hides the loading spinner.

**Signature:** `public void HideSpinner()`

**Example:**

```javascript
var kanbanObj = document.getElementById('kanban').ej2_instances[0];
kanbanObj.hideSpinner();
```

## Lifecycle Methods

### DataBind

Applies pending property changes immediately to the component.

**Signature:** `public void DataBind()`

**Example:**

```javascript
var kanbanObj = document.getElementById('kanban').ej2_instances[0];

// Change data source
kanbanObj.dataSource = newDataSource;

// Apply immediately
kanbanObj.dataBind();
```

### Destroy

Removes the Kanban control from the DOM and detaches all event handlers.

**Signature:** `public void Destroy()`

**Example:**

```javascript
var kanbanObj = document.getElementById('kanban').ej2_instances[0];

// Clean up Kanban instance
kanbanObj.destroy();
```

**Example - Component Cleanup:**

```javascript
// In page unload or SPA route change
window.addEventListener('beforeunload', function() {
    var kanbanObj = document.getElementById('kanban').ej2_instances[0];
    if (kanbanObj) {
        kanbanObj.destroy();
    }
});
```

### GetRootElement

Returns the root element of the Kanban component.

**Signature:** `public Element GetRootElement()`

**Returns:** Root DOM element

**Example:**

```javascript
var kanbanObj = document.getElementById('kanban').ej2_instances[0];
var rootElement = kanbanObj.getRootElement();

console.log('Kanban width:', rootElement.offsetWidth);
console.log('Kanban height:', rootElement.offsetHeight);
```

### AppendTo

Appends the Kanban control to a specified HTML element.

**Signature:** `public void AppendTo(string selector)`

**Parameters:**
- `selector` (optional) — `string` — Target element selector

**Example:**

```javascript
var kanbanObj = new ej.kanban.Kanban({
    keyField: 'Status',
    dataSource: data,
    columns: columns
});

// Append to specific element
kanbanObj.appendTo('#customContainer');
```

## Event Management

### AddEventListener

Adds an event handler to a Kanban event.

**Signature:** `public void AddEventListener(string eventName, Action handler)`

**Parameters:**
- `eventName` (required) — `string` — Event name
- `handler` (required) — `Action` — Event handler function

**Example:**

```javascript
var kanbanObj = document.getElementById('kanban').ej2_instances[0];

function customCardClickHandler(args) {
    console.log('Custom handler:', args.data);
}

// Add event listener
kanbanObj.addEventListener('cardClick', customCardClickHandler);
```

### RemoveEventListener

Removes an event handler from a Kanban event.

**Signature:** `public void RemoveEventListener(string eventName, Action handler)`

**Parameters:**
- `eventName` (required) — `string` — Event name
- `handler` (required) — `Action` — Event handler function to remove

**Example:**

```javascript
var kanbanObj = document.getElementById('kanban').ej2_instances[0];

// Remove event listener
kanbanObj.removeEventListener('cardClick', customCardClickHandler);
```

## Common Method Patterns

### Pattern 1: Bulk Card Operations
```javascript
function bulkAddCards(cards) {
    var kanbanObj = document.getElementById('kanban').ej2_instances[0];
    kanbanObj.showSpinner();
    
    try {
        kanbanObj.addCard(cards);
        console.log(`Added ${cards.length} cards`);
    } finally {
        kanbanObj.hideSpinner();
    }
}
```

### Pattern 2: Dynamic Column Management
```javascript
function addDynamicColumn(columnKey, columnName, position) {
    var kanbanObj = document.getElementById('kanban').ej2_instances[0];
    
    var newColumn = {
        headerText: columnName,
        keyField: columnKey,
        showAddButton: true,
        allowToggle: true
    };
    
    kanbanObj.addColumn(newColumn, position);
    kanbanObj.refreshHeader();
}
```

### Pattern 3: Safe Card Update
```javascript
function safeUpdateCard(cardId, updates) {
    var kanbanObj = document.getElementById('kanban').ej2_instances[0];
    var card = kanbanObj.kanbanData.find(c => c.Id === cardId);
    
    if (card) {
        var updatedCard = Object.assign({}, card, updates);
        kanbanObj.updateCard(updatedCard);
        return true;
    }
    return false;
}
```

## Best Practices

1. **Check instance exists**: Verify Kanban instance before calling methods
2. **Use try-catch**: Wrap method calls in error handling
3. **Show spinners**: Display loading indicators for async operations
4. **Batch updates**: Use single method call for multiple items when possible
5. **Refresh wisely**: Use specific refresh methods (refreshHeader vs refresh)
6. **Clean up**: Call destroy() when removing Kanban
7. **Validate data**: Check data validity before add/update operations
8. **Handle errors**: Implement error callbacks for all operations
9. **Test thoroughly**: Test methods with edge cases
10. **Document usage**: Comment complex method call sequences
