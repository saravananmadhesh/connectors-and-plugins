# Kanban Methods Reference

Complete reference for all public methods available in the Syncfusion TypeScript Kanban component.

## Overview

The Kanban component provides a rich set of public methods that allow you to programmatically manipulate cards, columns, and the overall board state. These methods enable dynamic interactions and custom workflows.

## Card Management Methods

### addCard

**Signature:** `addCard(cardData: Record | Record[], index?: number): void`

**Description:** Adds new card(s) to the Kanban data source and updates the layout.

**Parameters:**
- `cardData` (required) - `Record | Record[]` - Single card object or collection of card objects to add
- `index` (optional) - `number` - Index position to insert the card in the column

**Returns:** `void`

**Use Cases:**
- Dynamically add new tasks
- Import cards from external sources
- Bulk card creation
- Programmatic card insertion

**Example:**
```typescript
// Add a single card
const newCard = {
    Id: 100,
    Status: 'Open',
    Summary: 'New task from external system',
    Priority: 'High',
    Assignee: 'John Doe'
};
kanbanObj.addCard(newCard);

// Add multiple cards
const newCards = [
    { Id: 101, Status: 'Open', Summary: 'Task 1' },
    { Id: 102, Status: 'InProgress', Summary: 'Task 2' }
];
kanbanObj.addCard(newCards);

// Add card at specific index
kanbanObj.addCard(newCard, 2); // Insert at index 2 in the column
```

### deleteCard

**Signature:** `deleteCard(cardData: string | number | Record | Record[]): void`

**Description:** Deletes card(s) based on ID or card object(s).

**Parameters:**
- `cardData` (required) - `string | number | Record | Record[]` - Card ID, card object, or collection of cards to remove

**Returns:** `void`

**Use Cases:**
- Remove completed tasks
- Delete cancelled items
- Bulk deletion operations
- Clean up old cards

**Example:**
```typescript
// Delete by ID (string or number)
kanbanObj.deleteCard('1');
kanbanObj.deleteCard(1);

// Delete by card object
const cardToDelete = kanbanObj.getCardDetails(cardElement);
kanbanObj.deleteCard(cardToDelete);

// Delete multiple cards
kanbanObj.deleteCard([card1, card2, card3]);
```

### updateCard

**Signature:** `updateCard(cardData: Record | Record[], index?: number): void`

**Description:** Updates existing card(s) in the Kanban.

**Parameters:**
- `cardData` (required) - `Record | Record[]` - Updated card object or collection
- `index` (optional) - `number` - New index position if moving the card

**Returns:** `void`

**Use Cases:**
- Update card details
- Change card status
- Modify card properties
- Bulk update operations

**Example:**
```typescript
// Update single card
const updatedCard = {
    Id: 1,
    Status: 'InProgress',
    Summary: 'Updated task description',
    Priority: 'High'
};
kanbanObj.updateCard(updatedCard);

// Update multiple cards
kanbanObj.updateCard([card1, card2]);
```

### getCardDetails

**Signature:** `getCardDetails(target: Element): Record`

**Description:** Returns card data based on the card element.

**Parameters:**
- `target` (required) - `Element` - The card HTML element

**Returns:** `Record` - The card data object

**Use Cases:**
- Get card data from click events
- Retrieve card information for processing
- Card validation
- Custom card interactions

**Example:**
```typescript
// In card click event
cardClick: (args: CardClickEventArgs) => {
    const cardData = kanbanObj.getCardDetails(args.element);
    console.log('Card ID:', cardData.Id);
    console.log('Card Status:', cardData.Status);
}

// Manual card element retrieval
const cardElement = document.querySelector('.e-card');
const cardData = kanbanObj.getCardDetails(cardElement);
```

## Column Management Methods

### addColumn

**Signature:** `addColumn(columnOptions: ColumnsModel, index: number): void`

**Description:** Dynamically adds a new column to the Kanban board.

**Parameters:**
- `columnOptions` (required) - `ColumnsModel` - Column configuration object
  - `headerText: string` - Column header text
  - `keyField: string | number` - Column key field
  - `allowDrag: boolean` - Enable/disable drag
  - `allowDrop: boolean` - Enable/disable drop
  - `allowToggle: boolean` - Enable/disable toggle
  - `minCount: number` - Minimum card count
  - `maxCount: number` - Maximum card count (WIP limit)
  - `showAddButton: boolean` - Show add button
  - `showItemCount: boolean` - Show card count
  - `template: string | Function` - Column template
  - `transitionColumns: string[]` - Valid target columns
- `index` (required) - `number` - Position index for the new column

**Returns:** `void`

**Use Cases:**
- Dynamic workflow stages
- User-customizable workflows
- Project-specific columns
- Temporary columns

**Example:**
```typescript
// Add a new column at position 2
const newColumn: ColumnsModel = {
    headerText: 'Code Review',
    keyField: 'Review',
    allowDrag: true,
    allowDrop: true,
    maxCount: 5,
    showItemCount: true
};
kanbanObj.addColumn(newColumn, 2);

// Add column with transition restrictions
const restrictedColumn: ColumnsModel = {
    headerText: 'UAT Testing',
    keyField: 'UAT',
    transitionColumns: ['Testing', 'Done'], // Can only move from Testing or to Done
    maxCount: 3
};
kanbanObj.addColumn(restrictedColumn, 4);
```

### deleteColumn

**Signature:** `deleteColumn(index: number): void`

**Description:** Deletes a column at the specified index.

**Parameters:**
- `index` (required) - `number` - Index of the column to delete

**Returns:** `void`

**Use Cases:**
- Remove temporary workflow stages
- Simplify workflows
- Dynamic workflow management
- Project-phase transitions

**Example:**
```typescript
// Delete column at index 2
kanbanObj.deleteColumn(2);

// Delete last column
const columnCount = kanbanObj.columns.length;
kanbanObj.deleteColumn(columnCount - 1);
```

### showColumn

**Signature:** `showColumn(keys: string | string[]): void`

**Description:** Shows hidden columns by their key field(s).

**Parameters:**
- `keys` (required) - `string | string[]` - Column key or array of column keys

**Returns:** `void`

**Example:**
```typescript
// Show single column
kanbanObj.showColumn('Testing');

// Show multiple columns
kanbanObj.showColumn(['Testing', 'Review']);
```

### hideColumn

**Signature:** `hideColumn(keys: string | string[]): void`

**Description:** Hides visible columns by their key field(s).

**Parameters:**
- `keys` (required) - `string | string[]` - Column key or array of column keys

**Returns:** `void`

**Example:**
```typescript
// Hide single column
kanbanObj.hideColumn('Backlog');

// Hide multiple columns
kanbanObj.hideColumn(['Backlog', 'Archive']);
```

## Data Query Methods

### getColumnData

**Signature:** `getColumnData(columnKey: string | number, dataSource?: Record[]): Record[]`

**Description:** Returns all cards in a specific column.

**Parameters:**
- `columnKey` (required) - `string | number` - Column key field value
- `dataSource` (optional) - `Record[]` - Custom data source to query (defaults to Kanban's data source)

**Returns:** `Record[]` - Array of card objects

**Use Cases:**
- Get cards in a column for reporting
- Calculate column statistics
- Export column data
- Validate WIP limits

**Example:**
```typescript
// Get all cards in 'InProgress' column
const inProgressCards = kanbanObj.getColumnData('InProgress');
console.log(`In Progress count: ${inProgressCards.length}`);

// Get high priority cards in Testing column
const testingCards = kanbanObj.getColumnData('Testing');
const highPriorityCards = testingCards.filter(card => card.Priority === 'High');
```

### getSwimlaneData

**Signature:** `getSwimlaneData(keyField: string | number): Record[]`

**Description:** Returns all cards in a specific swimlane.

**Parameters:**
- `keyField` (required) - `string | number` - Swimlane key field value

**Returns:** `Record[]` - Array of card objects

**Use Cases:**
- Get assignee-specific tasks
- Calculate team workload
- Generate user reports
- Filter by swimlane

**Example:**
```typescript
// Get all cards assigned to 'Nancy Davloio'
const nancyCards = kanbanObj.getSwimlaneData('Nancy Davloio');
console.log(`Nancy has ${nancyCards.length} tasks`);
```

### getSelectedCards

**Signature:** `getSelectedCards(): HTMLElement[]`

**Description:** Returns an array of currently selected card elements.

**Returns:** `HTMLElement[]` - Array of selected card HTML elements

**Use Cases:**
- Bulk operations on selected cards
- Multi-card actions
- Selection validation
- Custom toolbar actions

**Example:**
```typescript
// Get selected cards and delete them
const selectedCards = kanbanObj.getSelectedCards();
if (selectedCards.length > 0) {
    const cardData = selectedCards.map(element => 
        kanbanObj.getCardDetails(element)
    );
    kanbanObj.deleteCard(cardData);
}

// Count selected cards
const selectionCount = kanbanObj.getSelectedCards().length;
console.log(`${selectionCount} cards selected`);
```

## Dialog Methods

### openDialog

**Signature:** `openDialog(action: 'Add' | 'Edit', data?: Record): void`

**Description:** Programmatically opens the add/edit dialog.

**Parameters:**
- `action` (required) - `'Add' | 'Edit'` - Dialog mode
- `data` (optional) - `Record` - Card data (required for Edit mode)

**Returns:** `void`

**Use Cases:**
- Custom add card buttons
- Programmatic card editing
- Workflow automation
- Quick add from external triggers

**Example:**
```typescript
// Open add dialog
kanbanObj.openDialog('Add');

// Open add dialog with pre-filled data
const newCard = {
    Status: 'Open',
    Priority: 'High',
    Assignee: getCurrentUser()
};
kanbanObj.openDialog('Add', newCard);

// Open edit dialog for existing card
const cardToEdit = kanbanObj.getColumnData('InProgress')[0];
kanbanObj.openDialog('Edit', cardToEdit);
```

### closeDialog

**Signature:** `closeDialog(): void`

**Description:** Programmatically closes the currently open dialog.

**Returns:** `void`

**Use Cases:**
- Custom dialog close logic
- Validation-based closing
- Auto-close timers
- External close triggers

**Example:**
```typescript
// Close dialog programmatically
kanbanObj.closeDialog();

// Close dialog after timeout
setTimeout(() => {
    kanbanObj.closeDialog();
}, 5000);
```

## Utility Methods

### refresh

**Signature:** `refresh(): void`

**Description:** Refreshes the Kanban board with current data.

**Returns:** `void`

**Use Cases:**
- Reload after external data changes
- Reset board state
- Apply configuration changes
- Force re-render

**Example:**
```typescript
// Refresh after external data update
updateExternalDataSource();
kanbanObj.refresh();

// Refresh after property change
kanbanObj.columns[0].maxCount = 10;
kanbanObj.refresh();
```

### destroy

**Signature:** `destroy(): void`

**Description:** Removes the Kanban component from the DOM and detaches all event handlers.

**Returns:** `void`

**Use Cases:**
- Clean up before removing component
- Memory leak prevention
- Single Page Application navigation
- Component lifecycle management

**Example:**
```typescript
// Destroy before removing from DOM
kanbanObj.destroy();
document.getElementById('Kanban').innerHTML = '';

// Destroy in SPA cleanup
componentWillUnmount() {
    if (this.kanbanObj) {
        this.kanbanObj.destroy();
    }
}
```

### dataBind

**Signature:** `dataBind(): void`

**Description:** Applies pending property changes immediately to the component.

**Returns:** `void`

**Use Cases:**
- Force immediate property updates
- Batch property changes
- Optimize rendering performance

**Example:**
```typescript
// Change multiple properties and apply at once
kanbanObj.allowDragAndDrop = false;
kanbanObj.allowKeyboard = false;
kanbanObj.dataBind(); // Apply all changes now
```

### getRootElement

**Signature:** `getRootElement(): HTMLElement`

**Description:** Returns the root HTML element of the Kanban component.

**Returns:** `HTMLElement` - The root element

**Use Cases:**
- Custom styling
- DOM manipulation
- Integration with other libraries
- Testing and debugging

**Example:**
```typescript
// Apply custom class to Kanban
const rootElement = kanbanObj.getRootElement();
rootElement.classList.add('custom-kanban-style');

// Get dimensions
const rect = rootElement.getBoundingClientRect();
console.log(`Kanban size: ${rect.width}x${rect.height}`);
```

## Event Management Methods

### addEventListener

**Signature:** `addEventListener(eventName: string, handler: Function): void`

**Description:** Adds an event listener to the Kanban component.

**Parameters:**
- `eventName` (required) - `string` - Name of the event
- `handler` (required) - `Function` - Event handler function

**Returns:** `void`

**Example:**
```typescript
// Add event listener dynamically
kanbanObj.addEventListener('cardClick', (args: CardClickEventArgs) => {
    console.log('Card clicked:', args.data);
});
```

### removeEventListener

**Signature:** `removeEventListener(eventName: string, handler: Function): void`

**Description:** Removes an event listener from the Kanban component.

**Parameters:**
- `eventName` (required) - `string` - Name of the event
- `handler` (required) - `Function` - Event handler function to remove

**Returns:** `void`

**Example:**
```typescript
const clickHandler = (args: CardClickEventArgs) => {
    console.log('Card clicked');
};

// Add listener
kanbanObj.addEventListener('cardClick', clickHandler);

// Remove listener later
kanbanObj.removeEventListener('cardClick', clickHandler);
```

## Persistence Methods

### getPersistData

**Signature:** `getPersistData(): string`

**Description:** Returns the persisted state of the Kanban as a JSON string.

**Returns:** `string` - JSON string of persisted state

**Use Cases:**
- Save user preferences
- Session persistence
- State restoration
- Backup configurations

**Example:**
```typescript
// Get and save state
const state = kanbanObj.getPersistData();
localStorage.setItem('kanbanState', state);

// Restore state later
const savedState = localStorage.getItem('kanbanState');
// Apply to new Kanban instance
```

## Best Practices

1. **Always check data before operations** - Validate card data before add/update
2. **Use try-catch for methods** - Handle potential errors gracefully
3. **Batch operations when possible** - Use array parameters for bulk operations
4. **Call dataBind after multiple property changes** - Optimize performance
5. **Destroy component properly** - Prevent memory leaks in SPAs
6. **Use getCardDetails for event-based operations** - Get accurate card data
7. **Validate column indices** - Ensure indices are within bounds before add/delete

## Common Patterns

### Pattern 1: Dynamic Card Management

```typescript
// Add card with validation
function addValidatedCard(cardData: Record) {
    if (validateCard(cardData)) {
        kanbanObj.addCard(cardData);
        showSuccess('Card added successfully');
    } else {
        showError('Invalid card data');
    }
}
```

### Pattern 2: Bulk Operations

```typescript
// Delete selected cards
function deleteSelectedCards() {
    const selected = kanbanObj.getSelectedCards();
    if (selected.length > 0 && confirm(`Delete ${selected.length} cards?`)) {
        const cardData = selected.map(el => kanbanObj.getCardDetails(el));
        kanbanObj.deleteCard(cardData);
    }
}
```

### Pattern 3: Column Statistics

```typescript
// Calculate WIP for all columns
function calculateWIP() {
    kanbanObj.columns.forEach((column: ColumnsModel) => {
        const cards = kanbanObj.getColumnData(column.keyField);
        const maxCount = column.maxCount || Infinity;
        const isOverLimit = cards.length > maxCount;
        console.log(`${column.headerText}: ${cards.length}/${maxCount} ${isOverLimit ? '⚠️' : '✓'}`);
    });
}
```

### Pattern 4: Programmatic Card Flow

```typescript
// Move card through workflow
async function moveCardToNextStage(cardId: number) {
    const card = kanbanObj.dataSource.find((c: any) => c.Id === cardId);
    if (card) {
        const workflow = ['Open', 'InProgress', 'Testing', 'Done'];
        const currentIndex = workflow.indexOf(card.Status);
        if (currentIndex < workflow.length - 1) {
            card.Status = workflow[currentIndex + 1];
            kanbanObj.updateCard(card);
            await syncToBackend(card);
        }
    }
}
```

### Pattern 5: Dynamic Column Management

```typescript
// Add column if not exists
function ensureColumn(keyField: string, headerText: string) {
    const exists = kanbanObj.columns.some((col: ColumnsModel) => 
        col.keyField === keyField
    );
    
    if (!exists) {
        kanbanObj.addColumn({
            headerText: headerText,
            keyField: keyField,
            showItemCount: true
        }, kanbanObj.columns.length);
    }
}
```

---

**Related:** [events.md](./events.md) | [properties.md](./properties.md) | [getting-started.md](./getting-started.md)
