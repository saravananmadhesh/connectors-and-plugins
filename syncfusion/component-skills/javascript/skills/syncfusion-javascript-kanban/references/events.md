# Kanban Events Reference

Complete reference for all events supported by the Syncfusion TypeScript Kanban component.

## Overview

The Kanban component provides a comprehensive set of events that allow you to hook into various stages of user interactions and component lifecycle. These events enable you to customize behavior, validate actions, and respond to user interactions.

## Action Events

### actionBegin

**Type:** `EmitType<ActionEventArgs>`  
**Description:** Triggers at the beginning of every Kanban action (add, edit, delete, drag-drop).

**Event Arguments:**
- `addedRecords: Record[]` - Returns the appropriate added data based on the action
- `cancel: boolean` - Defines the cancel option for the action taking place
- `changedRecords: Record[]` - Returns the appropriate changed data based on the action
- `deletedRecords: Record[]` - Returns the appropriate deleted data based on the action
- `name: string` - Specifies name of the event
- `requestType: string` - Returns the request type of the current action
- `target: HTMLElement` - Returns the target HTML element

**Use Cases:**
- Validate data before adding/updating cards
- Show loading indicators
- Log user actions
- Cancel operations based on business rules

**Example:**
```typescript
const kanbanObj: Kanban = new Kanban({
    dataSource: kanbanData,
    keyField: 'Status',
    columns: columns,
    cardSettings: { contentField: 'Summary', headerField: 'Id' },
    actionBegin: (args: ActionEventArgs) => {
        console.log('Action starting:', args.requestType);
        // Cancel if condition not met
        if (args.requestType === 'cardCreate' && !isValidCard(args.addedRecords[0])) {
            args.cancel = true;
            alert('Invalid card data');
        }
    }
});
```

### actionComplete

**Type:** `EmitType<ActionEventArgs>`  
**Description:** Triggers on successful completion of Kanban actions.

**Event Arguments:**
- `addedRecords: Record[]` - Returns the appropriate added data based on the action
- `cancel: boolean` - Defines the cancel option for the action taking place
- `changedRecords: Record[]` - Returns the appropriate changed data based on the action
- `deletedRecords: Record[]` - Returns the appropriate deleted data based on the action
- `name: string` - Specifies name of the event
- `requestType: string` - Returns the request type of the current action
- `target: HTMLElement` - Returns the target HTML element

**Use Cases:**
- Update external systems after successful operations
- Show success notifications
- Refresh related data
- Update statistics or dashboards

**Example:**
```typescript
actionComplete: (args: ActionEventArgs) => {
    if (args.requestType === 'cardChanged') {
        console.log('Card moved successfully');
        updateDashboard();
    }
}
```

### actionFailure

**Type:** `EmitType<ActionEventArgs>`  
**Description:** Triggers when a Kanban action fails or is interrupted, providing error information.

**Event Arguments:**
- `addedRecords: Record[]` - Returns the appropriate added data based on the action
- `cancel: boolean` - Defines the cancel option for the action taking place
- `changedRecords: Record[]` - Returns the appropriate changed data based on the action
- `deletedRecords: Record[]` - Returns the appropriate deleted data based on the action
- `name: string` - Specifies name of the event
- `requestType: string` - Returns the request type of the current action
- `target: HTMLElement` - Returns the target HTML element

**Use Cases:**
- Display error messages to users
- Log errors for debugging
- Rollback local state changes
- Retry failed operations

**Example:**
```typescript
actionFailure: (args: ActionEventArgs) => {
    console.error('Action failed:', args.requestType);
    showErrorNotification('Operation failed. Please try again.');
}
```

## Card Interaction Events

### cardClick

**Type:** `EmitType<CardClickEventArgs>`  
**Description:** Triggers when a Kanban card is single-clicked.

**Event Arguments:**
- `cancel: boolean` - Defines the cancel option for the action taking place
- `data: Record` - Returns the object of the element currently being clicked
- `element: Element` - Returns the actual HTML element on which custom styling can be applied
- `event: Event | MouseEvent | KeyboardEvent` - Defines the type of the event
- `name: string` - Specifies name of the event

**Use Cases:**
- Show card details in a sidebar
- Navigate to a detailed view
- Apply custom styling or highlighting
- Track user interactions

**Example:**
```typescript
cardClick: (args: CardClickEventArgs) => {
    console.log('Card clicked:', args.data);
    showCardDetailsPanel(args.data);
}
```

### cardDoubleClick

**Type:** `EmitType<CardClickEventArgs>`  
**Description:** Triggers when a Kanban card is double-clicked.

**Event Arguments:**
- `cancel: boolean` - Defines the cancel option for the action taking place
- `data: Record` - Returns the object of the element currently being double-clicked
- `element: Element` - Returns the actual HTML element on which custom styling can be applied
- `event: Event | MouseEvent | KeyboardEvent` - Defines the type of the event
- `name: string` - Specifies name of the event

**Use Cases:**
- Open edit dialog
- Navigate to card detail page
- Quick actions on cards
- Alternative to opening dialogs

**Example:**
```typescript
cardDoubleClick: (args: CardClickEventArgs) => {
    // Open custom edit modal
    openEditModal(args.data);
}
```

### cardRendered

**Type:** `EmitType<CardRenderedEventArgs>`  
**Description:** Triggers before each card is rendered on the page.

**Event Arguments:**
- `cancel: boolean` (optional) - Defines the cancel option for the action taking place
- `data: Record` (optional) - Returns the object of the element currently being rendered
- `element: Element` (optional) - Returns the actual HTML element on which custom styling can be applied
- `name: string` (optional) - Specifies name of the event

**Use Cases:**
- Apply custom styling to cards
- Add custom CSS classes based on card data
- Modify card appearance dynamically
- Inject custom HTML elements

**Example:**
```typescript
cardRendered: (args: CardRenderedEventArgs) => {
    // Apply custom CSS based on priority
    if (args.data.Priority === 'High') {
        args.element.classList.add('high-priority-card');
    }
}
```

## Column Drag Events

### columnDragStart

**Type:** `EmitType<ColumnDragEventArgs>`  
**Description:** Triggers when a column drag operation starts.

**Event Arguments:**
- `cancel: boolean` (optional) - If set to true, the drag operation will be canceled
- `column: any` (optional) - The data object representing the column being dragged
- `dropIndex: number` (optional) - The final index position where the column is dropped
- `element: HTMLElement` (optional) - The HTML element representing the column being dragged
- `event: MouseEvent | TouchEvent` (optional) - The original mouse or touch event
- `fromIndex: number` (optional) - The index of the column before the drag operation began
- `toIndex: number` (optional) - The index where the column is currently being dragged to

**Use Cases:**
- Validate if column can be dragged
- Cancel drag for specific columns
- Show drag indicators
- Log column reordering events

**Example:**
```typescript
columnDragStart: (args: ColumnDragEventArgs) => {
    console.log('Column drag started from index:', args.fromIndex);
    // Prevent dragging the first column
    if (args.fromIndex === 0) {
        args.cancel = true;
    }
}
```

### columnDrag

**Type:** `EmitType<ColumnDragEventArgs>`  
**Description:** Triggers during the column drag operation.

**Event Arguments:** (Same as columnDragStart)

**Use Cases:**
- Update drag preview
- Show drop indicators
- Calculate drop position
- Visual feedback during drag

**Example:**
```typescript
columnDrag: (args: ColumnDragEventArgs) => {
    console.log('Dragging to index:', args.toIndex);
}
```

### columnDrop

**Type:** `EmitType<ColumnDragEventArgs>`  
**Description:** Triggers when a column is dropped.

**Event Arguments:** (Same as columnDragStart)

**Use Cases:**
- Save new column order to backend
- Update application state
- Show confirmation messages
- Trigger dependent updates

**Example:**
```typescript
columnDrop: (args: ColumnDragEventArgs) => {
    console.log(`Column moved from ${args.fromIndex} to ${args.dropIndex}`);
    saveColumnOrder(getCurrentColumnOrder());
}
```

## Drag-and-Drop Card Events

### dragStart

**Type:** `EmitType<DragEventArgs>`  
**Description:** Triggers when card drag starts.

**Event Arguments:**
- `cancel: boolean` - Defines the cancel option
- `data: Record[]` - Card data being dragged
- `element: HTMLElement` - Card element being dragged
- `event: MouseEvent | TouchEvent` - Original drag event
- `name: string` - Event name

**Use Cases:**
- Validate if card can be dragged
- Show drag feedback
- Disable drop zones conditionally
- Track drag analytics

**Example:**
```typescript
dragStart: (args: DragEventArgs) => {
    console.log('Card drag started:', args.data[0].Id);
}
```

### drag

**Type:** `EmitType<DragEventArgs>`  
**Description:** Triggers while card is being dragged.

**Example:**
```typescript
drag: (args: DragEventArgs) => {
    // Update drag position indicator
}
```

### dragStop

**Type:** `EmitType<DragEventArgs>`  
**Description:** Triggers when card drag ends.

**Use Cases:**
- Save card position to backend
- Update related data
- Show completion message
- Trigger workflow actions

**Example:**
```typescript
dragStop: (args: DragEventArgs) => {
    console.log('Card dropped:', args.data[0].Id);
    notifyTeamOfCardMove(args.data[0]);
}
```

## Dialog Events

### dialogOpen

**Type:** `EmitType<DialogEventArgs>`  
**Description:** Triggers before the dialog is opened.

**Use Cases:**
- Populate dialog with dynamic data
- Validate permissions
- Customize dialog fields
- Cancel dialog opening

**Example:**
```typescript
dialogOpen: (args: DialogEventArgs) => {
    if (args.requestType === 'Add') {
        // Set default values for new card
        args.data.Priority = 'Normal';
        args.data.Assignee = getCurrentUser();
    }
}
```

### dialogClose

**Type:** `EmitType<DialogEventArgs>`  
**Description:** Triggers before the dialog is closed.

**Use Cases:**
- Confirm unsaved changes
- Clean up temporary data
- Trigger validation
- Prevent closing on certain conditions

**Example:**
```typescript
dialogClose: (args: DialogEventArgs) => {
    if (hasUnsavedChanges() && !confirm('Discard changes?')) {
        args.cancel = true;
    }
}
```

## Data Events

### dataBinding

**Type:** `EmitType<DataBindingEventArgs>`  
**Description:** Triggers before data is bound to the Kanban.

**Use Cases:**
- Transform data before display
- Filter data client-side
- Add computed properties
- Show loading indicators

### dataBound

**Type:** `EmitType<DataBoundEventArgs>`  
**Description:** Triggers after data is successfully bound.

**Use Cases:**
- Hide loading indicators
- Update statistics
- Apply post-render customizations
- Initialize dependent components

**Example:**
```typescript
dataBound: () => {
    console.log('Data bound successfully');
    updateCardCounters();
}
```

## Query Events

### queryCellInfo

**Type:** `EmitType<QueryCellInfoEventArgs>`  
**Description:** Triggers before each cell is rendered.

**Use Cases:**
- Apply custom cell styling
- Add cell-specific classes
- Modify cell content
- Conditional cell formatting

**Example:**
```typescript
queryCellInfo: (args: QueryCellInfoEventArgs) => {
    if (args.column.keyField === 'Testing' && args.data.length > 5) {
        args.element.classList.add('overloaded-column');
    }
}
```

## Best Practices

1. **Always use TypeScript types** for event arguments
2. **Cancel operations carefully** using `args.cancel = true`
3. **Avoid heavy operations** in frequently-fired events like `drag`
4. **Handle errors gracefully** in `actionFailure`
5. **Use `actionBegin`** for validation before state changes
6. **Use `actionComplete`** for side effects after successful operations
7. **Leverage `cardRendered`** for consistent card styling
8. **Test event handlers thoroughly** especially for cancel scenarios

## Common Patterns

### Pattern 1: Validate Before Adding

```typescript
actionBegin: (args: ActionEventArgs) => {
    if (args.requestType === 'cardCreate') {
        if (!validateCardData(args.addedRecords[0])) {
            args.cancel = true;
            showValidationError();
        }
    }
}
```

### Pattern 2: Sync with Backend

```typescript
actionComplete: async (args: ActionEventArgs) => {
    if (args.requestType === 'cardChanged') {
        try {
            await syncCardToBackend(args.changedRecords[0]);
            showSuccess('Card updated');
        } catch (error) {
            showError('Sync failed');
        }
    }
}
```

### Pattern 3: Custom Card Styling

```typescript
cardRendered: (args: CardRenderedEventArgs) => {
    const priority = args.data.Priority;
    const colorMap = {
        'High': 'card-high',
        'Normal': 'card-normal',
        'Low': 'card-low'
    };
    args.element.classList.add(colorMap[priority]);
}
```

---

**Related:** [properties.md](./properties.md) | [methods.md](./methods.md) | [getting-started.md](./getting-started.md)
