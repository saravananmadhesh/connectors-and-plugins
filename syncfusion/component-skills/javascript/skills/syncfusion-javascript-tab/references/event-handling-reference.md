---
name: event-handling-reference
title: Event Handling Reference
description: Complete reference for all Tab component events and handlers
---

# Event Handling Reference

The Syncfusion Tab component provides 11 events that fire at different stages of user interaction and component lifecycle. This guide documents all events, their arguments, and practical usage examples.

## Event Lifecycle Overview

```
Component Initialization
    ↓
    created event fires
    ↓
User selects tab or programmatic selection
    ↓
    selecting event fires (cancelable)
    ↓
    selected event fires
    ↓
User adds a tab
    ↓
    adding event fires (cancelable)
    ↓
    added event fires
    ↓
User drags a tab
    ↓
    onDragStart event fires
    ↓
    dragging event fires (during drag)
    ↓
    dragged event fires (after drop)
    ↓
User removes a tab
    ↓
    removing event fires (cancelable)
    ↓
    removed event fires
    ↓
Component destruction
    ↓
    destroyed event fires
```

## Complete Event Reference

### 1. **created** - Component Initialization Complete

Fires once the Tab component rendering is completed and ready for interaction.

**Event Type:** `Event`

**Use Cases:**
- Initialize dependent controls
- Load initial data
- Apply theme overrides
- Start monitoring component state

**Example:**

```typescript
let tabObj: Tab = new Tab({
    items: [
        { header: { 'text': 'Tab 1' }, content: 'Content 1' },
        { header: { 'text': 'Tab 2' }, content: 'Content 2' }
    ],
    created: () => {
        console.log('Tab component created and ready');
        // Perform post-initialization setup
        tabObj.select(0);  // Ensure first tab is selected
    }
});
tabObj.appendTo('#element');
```

---

### 2. **selecting** - Before Tab Selection (Cancelable)

Fires before a tab item gets selected. This event is cancelable, allowing you to prevent tab selection based on conditions.

**Event Arguments (SelectingEventArgs):**

| Property | Type | Description |
|----------|------|-------------|
| `cancel` | `boolean` | Set to `true` to cancel the selection |
| `event` | `Event` | The browser event that triggered the selection |
| `isInteracted` | `boolean` | `true` if user clicked tab; `false` if programmatic |
| `isSwiped` | `boolean` | `true` if tab changed via swipe gesture |
| `name` | `string` | Event name: `"selecting"` |
| `preventFocus` | `boolean` | Set to `true` to prevent focus after selection |
| `previousIndex` | `number` | Index of previously selected tab |
| `previousItem` | `HTMLElement` | DOM element of previously selected tab |

**Use Cases:**
- Validate data before leaving current tab
- Prevent selection based on conditions
- Show confirmation dialogs
- Block navigation until async operation completes

**Example:**

```typescript
let tabObj: Tab = new Tab({
    items: [
        { header: { 'text': 'Form' }, content: 'Form content with unsaved data' },
        { header: { 'text': 'Preview' }, content: 'Preview of submitted data' },
        { header: { 'text': 'Confirmation' }, content: 'Confirmation page' }
    ],
    selecting: (args: SelectingEventArgs) => {
        // Prevent navigation if form has unsaved changes
        let hasUnsavedChanges = checkFormValidity();
        
        if (hasUnsavedChanges && args.previousIndex === 0) {
            if (!confirm('You have unsaved changes. Save before leaving?')) {
                args.cancel = true;  // Prevent tab change
            }
        }
        
        // Log interaction details
        console.log(`Attempting to select tab ${args.previousIndex} → (next tab)`);
        console.log(`User interaction: ${args.isInteracted}`);
        console.log(`Swipe gesture: ${args.isSwiped}`);
    }
});
tabObj.appendTo('#element');
```

---

### 3. **selected** - Tab Selection Complete

Fires after a tab item is successfully selected. This is the ideal place for content-specific initialization.

**Event Arguments (SelectEventArgs):**

| Property | Type | Description |
|----------|------|-------------|
| `cancel` | `boolean` | Set to `true` to prevent default action |
| `isInteracted` | `boolean` | `true` if user clicked; `false` if programmatic |
| `isSwiped` | `boolean` | `true` if tab changed via swipe |
| `name` | `string` | Event name: `"selected"` |
| `preventFocus` | `boolean` | Prevent automatic focus after selection |
| `previousIndex` | `number` | Index of previously selected tab |
| `previousItem` | `HTMLElement` | DOM element of previous tab |
| `selectedContent` | `HTMLElement` | DOM element of newly selected content |

**Use Cases:**
- Load tab-specific content or data
- Update page title based on selected tab
- Focus input fields in the new tab
- Log analytics/user interaction
- Scroll content to top
- Trigger content refresh

**Example:**

```typescript
let tabObj: Tab = new Tab({
    items: [
        { header: { 'text': 'Dashboard' }, content: '<div id="dashContent">Dashboard</div>' },
        { header: { 'text': 'Analytics' }, content: '<div id="analyticsContent">Analytics</div>' },
        { header: { 'text': 'Reports' }, content: '<div id="reportsContent">Reports</div>' }
    ],
    loadOn: 'Demand',  // Content loaded when tab is selected
    selected: (args: SelectEventArgs) => {
        console.log(`Tab changed from ${args.previousIndex} to selected tab`);
        
        // Update document title based on selected tab
        let tabTitles = ['Dashboard', 'Analytics', 'Reports'];
        document.title = `MyApp - ${tabTitles[args.previousIndex]} | Loading...`;
        
        // Perform tab-specific initialization
        if (args.selectedContent) {
            const contentId = args.selectedContent.id;
            
            if (contentId === 'dashContent') {
                loadDashboardData();
            } else if (contentId === 'analyticsContent') {
                loadAnalyticsChart();
            } else if (contentId === 'reportsContent') {
                generateReports();
            }
        }
        
        // Distinguish between user click and programmatic selection
        if (args.isInteracted) {
            console.log('Tab selected by user click');
            logAnalytics('tab_selected_user');
        } else {
            console.log('Tab selected programmatically');
            logAnalytics('tab_selected_programmatic');
        }
        
        // Detect swipe-based selection
        if (args.isSwiped) {
            console.log('Tab changed via swipe gesture');
            showSwipeIndicator();
        }
    }
});
tabObj.appendTo('#element');

function loadDashboardData() {
    // Load dashboard widgets
    console.log('Loading dashboard...');
}

function loadAnalyticsChart() {
    // Initialize chart library
    console.log('Loading analytics...');
}

function generateReports() {
    // Generate and display reports
    console.log('Generating reports...');
}
```

---

### 4. **adding** - Before Adding Tab Item (Cancelable)

Fires before a new tab item is added to the Tab component. This event is cancelable.

**Event Arguments (AddEventArgs):**

| Property | Type | Description |
|----------|------|-------------|
| `addedItems` | `TabItemModel[]` | Array of tab items being added |
| `cancel` | `boolean` | Set to `true` to cancel the addition |
| `name` | `string` | Event name: `"adding"` |

**Use Cases:**
- Validate tab name/content before adding
- Check maximum tab limit
- Modify tab properties before insertion
- Prevent duplicate tabs
- Show validation errors

**Example:**

```typescript
let maxTabs = 10;
let tabCount = 0;

let tabObj: Tab = new Tab({
    items: [
        { header: { 'text': 'Home' }, content: 'Home content' }
    ],
    adding: (args: AddEventArgs) => {
        tabCount++;
        
        // Enforce maximum tabs limit
        if (tabCount > maxTabs) {
            console.warn(`Cannot add more than ${maxTabs} tabs`);
            args.cancel = true;
            showNotification(`Maximum ${maxTabs} tabs allowed`);
            return;
        }
        
        // Validate tab content
        let newTab = args.addedItems[0];
        if (!newTab.header || !newTab.header.text) {
            console.error('Tab must have a header with text');
            args.cancel = true;
            return;
        }
        
        // Check for duplicates
        let existingHeaders = tabObj.items.map((item: TabItemModel) => 
            item.header?.text
        );
        if (existingHeaders.includes(newTab.header.text)) {
            console.warn(`Tab with name "${newTab.header.text}" already exists`);
            args.cancel = true;
            showNotification('Tab already exists');
            return;
        }
        
        console.log(`Adding tab: ${newTab.header.text}`);
    }
});
tabObj.appendTo('#element');

function showNotification(message: string) {
    // Show notification to user
    console.log(`Notification: ${message}`);
}
```

---

### 5. **added** - Tab Item Added Successfully

Fires after a new tab item is successfully added to the Tab component.

**Event Arguments (AddEventArgs):**

| Property | Type | Description |
|----------|------|-------------|
| `addedItems` | `TabItemModel[]` | Array of tab items that were added |
| `cancel` | `boolean` | Indicates if action was canceled |
| `name` | `string` | Event name: `"added"` |

**Use Cases:**
- Perform post-addition operations
- Update UI counters
- Save new tab to backend
- Auto-select newly added tab
- Log audit trail

**Example:**

```typescript
let tabObj: Tab = new Tab({
    items: [
        { header: { 'text': 'Tab 1' }, content: 'Content 1' }
    ],
    added: (args: AddEventArgs) => {
        console.log('Tab successfully added');
        
        // Get the newly added tab
        let newTab = args.addedItems[0];
        console.log(`New tab header: ${newTab.header?.text}`);
        
        // Update tab counter
        let tabCounter = document.getElementById('tab-count');
        if (tabCounter) {
            tabCounter.textContent = `Total tabs: ${tabObj.items.length}`;
        }
        
        // Save new tab to backend
        saveTabToBackend(newTab);
        
        // Optionally select the new tab
        // tabObj.select(tabObj.items.length - 1);
    }
});
tabObj.appendTo('#element');

function saveTabToBackend(tab: TabItemModel) {
    // POST new tab data to server
    fetch('/api/tabs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tab)
    }).then(response => {
        console.log('Tab saved to backend');
    }).catch(error => {
        console.error('Failed to save tab:', error);
    });
}
```

---

### 6. **removing** - Before Removing Tab Item (Cancelable)

Fires before a tab item is removed. This event is cancelable.

**Event Arguments (RemoveEventArgs):**

| Property | Type | Description |
|----------|------|-------------|
| `cancel` | `boolean` | Set to `true` to cancel removal |
| `name` | `string` | Event name: `"removing"` |
| `removedIndex` | `number` | Index of tab being removed |
| `removedItem` | `HTMLElement` | DOM element of tab being removed |

**Use Cases:**
- Confirm deletion with user
- Check for unsaved data
- Prevent removal of required tabs
- Backup tab data before removal
- Show warning messages

**Example:**

```typescript
let tabDataMap = new Map<number, any>();  // Store tab data by index

let tabObj: Tab = new Tab({
    items: [
        { header: { 'text': 'Important' }, content: 'Keep this tab' },
        { header: { 'text': 'Editable' }, content: 'Can be removed' }
    ],
    removing: (args: RemoveEventArgs) => {
        let removedIndex = args.removedIndex;
        let removedHeader = tabObj.items[removedIndex]?.header?.text;
        
        // Prevent removal of certain tabs
        if (removedHeader === 'Important') {
            console.warn('Cannot remove required tab');
            args.cancel = true;
            showNotification('This tab is required and cannot be removed');
            return;
        }
        
        // Confirm with user
        if (!confirm(`Remove tab "${removedHeader}"?`)) {
            args.cancel = true;
            return;
        }
        
        // Backup data before removal
        let tabData = tabDataMap.get(removedIndex);
        if (tabData && tabData.hasUnsavedChanges) {
            console.warn('Tab has unsaved changes - backing up...');
            backupTabData(removedIndex, tabData);
        }
        
        console.log(`Removing tab at index ${removedIndex}`);
    }
});
tabObj.appendTo('#element');

function backupTabData(index: number, data: any) {
    localStorage.setItem(`tab-backup-${index}`, JSON.stringify(data));
    console.log(`Backed up tab ${index} data`);
}

function showNotification(message: string) {
    console.log(`Notification: ${message}`);
}
```

---

### 7. **removed** - Tab Item Removed Successfully

Fires after a tab item is successfully removed.

**Event Arguments (RemoveEventArgs):**

| Property | Type | Description |
|----------|------|-------------|
| `cancel` | `boolean` | Indicates if action was canceled |
| `name` | `string` | Event name: `"removed"` |
| `removedIndex` | `number` | Index of removed tab |
| `removedItem` | `HTMLElement` | DOM element of removed tab |

**Use Cases:**
- Update UI after removal
- Clear related data
- Notify backend of removal
- Update tab counter
- Cleanup resources

**Example:**

```typescript
let tabObj: Tab = new Tab({
    items: [
        { header: { 'text': 'Tab 1' }, content: 'Content 1' },
        { header: { 'text': 'Tab 2' }, content: 'Content 2' }
    ],
    removed: (args: RemoveEventArgs) => {
        console.log(`Tab removed at index: ${args.removedIndex}`);
        
        // Update UI counter
        let tabCounter = document.getElementById('tab-count');
        if (tabCounter) {
            tabCounter.textContent = `Total tabs: ${tabObj.items.length}`;
        }
        
        // Notify backend of removal
        deleteTabFromBackend(args.removedIndex);
        
        // Clear associated data
        let tabData = document.getElementById(`tab-data-${args.removedIndex}`);
        if (tabData) {
            tabData.remove();
        }
        
        // Show confirmation message
        console.log(`Successfully removed tab`);
    }
});
tabObj.appendTo('#element');

function deleteTabFromBackend(index: number) {
    fetch(`/api/tabs/${index}`, { method: 'DELETE' })
        .then(response => console.log('Tab deleted from backend'))
        .catch(error => console.error('Failed to delete:', error));
}
```

---

### 8. **onDragStart** - Before Dragging Tab Item

Fires before dragging a tab item. Drag-and-drop must be enabled with `allowDragAndDrop: true`.

**Event Arguments (DragEventArgs):**

| Property | Type | Description |
|----------|------|-------------|
| `cancel` | `boolean` | Set to `true` to cancel drag operation |
| `clonedElement` | `HTMLElement` | Clone element created for drag visual |
| `draggedItem` | `HTMLElement` | Source tab being dragged |
| `droppedItem` | `HTMLElement` | Target tab (if dropping on another) |
| `event` | `MouseEvent` | Browser mouse event |
| `index` | `number` | Index of tab being dragged |
| `name` | `string` | Event name: `"onDragStart"` |
| `target` | `HTMLElement` | Element under mouse cursor |

**Use Cases:**
- Validate if tab can be dragged
- Create custom drag preview
- Restrict dragging certain tabs
- Log drag operation start
- Change cursor/visual feedback

**Example:**

```typescript
let tabObj: Tab = new Tab({
    allowDragAndDrop: true,  // Enable drag-drop
    items: [
        { header: { 'text': 'Lock' }, content: 'Cannot drag' },
        { header: { 'text': 'Draggable' }, content: 'Can drag' }
    ],
    onDragStart: (args: DragEventArgs) => {
        console.log(`Starting drag of tab at index ${args.index}`);
        
        let draggedHeader = tabObj.items[args.index]?.header?.text;
        
        // Prevent dragging certain tabs
        if (draggedHeader === 'Lock') {
            console.warn('Cannot drag this tab');
            args.cancel = true;
            return;
        }
        
        // Customize drag preview
        if (args.clonedElement) {
            args.clonedElement.style.opacity = '0.7';
            args.clonedElement.style.transform = 'scale(0.95)';
        }
        
        // Change cursor
        document.body.style.cursor = 'grabbing';
        
        console.log(`Dragging tab: ${draggedHeader}`);
    }
});
tabObj.appendTo('#element');
```

---

### 9. **dragging** - During Tab Dragging

Fires continuously while dragging a tab item.

**Event Arguments (DragEventArgs):**

| Property | Type | Description |
|----------|------|-------------|
| `cancel` | `boolean` | Set to `true` to cancel drag |
| `clonedElement` | `HTMLElement` | Dragged element clone |
| `draggedItem` | `HTMLElement` | Source tab element |
| `droppedItem` | `HTMLElement` | Current target element |
| `event` | `MouseEvent` | Current mouse event |
| `index` | `number` | Dragged tab index |
| `target` | `HTMLElement` | Current element under cursor |
| `name` | `string` | Event name: `"dragging"` |

**Use Cases:**
- Show drop zone indicators
- Validate drop targets
- Update visual feedback
- Prevent dropping in invalid areas
- Monitor drag progress

**Example:**

```typescript
let tabObj: Tab = new Tab({
    allowDragAndDrop: true,
    items: [...],
    dragging: (args: DragEventArgs) => {
        // Update visual feedback during drag
        if (args.target && args.target.classList) {
            args.target.classList.add('drop-target-active');
        }
        
        // Check if drop target is valid
        let isValidTarget = args.droppedItem && 
            !args.droppedItem.classList.contains('no-drop');
        
        if (!isValidTarget) {
            document.body.style.cursor = 'not-allowed';
        } else {
            document.body.style.cursor = 'grab';
        }
    }
});
tabObj.appendTo('#element');
```

---

### 10. **dragged** - Tab Dragging Complete

Fires after dropping a dragged tab item.

**Event Arguments (DragEventArgs):**

| Property | Type | Description |
|----------|------|-------------|
| `cancel` | `boolean` | Set to `true` to cancel drop |
| `draggedItem` | `HTMLElement` | Source tab element |
| `droppedItem` | `HTMLElement` | Target drop location |
| `event` | `MouseEvent` | Drop event |
| `index` | `number` | Source tab index |
| `target` | `HTMLElement` | Drop target element |
| `name` | `string` | Event name: `"dragged"` |

**Use Cases:**
- Save new tab order to backend
- Update UI after reorder
- Animate drop completion
- Log audit trail
- Sync with external systems

**Example:**

```typescript
let tabObj: Tab = new Tab({
    allowDragAndDrop: true,
    items: [
        { header: { 'text': 'Tab 1' }, content: 'Content 1' },
        { header: { 'text': 'Tab 2' }, content: 'Content 2' },
        { header: { 'text': 'Tab 3' }, content: 'Content 3' }
    ],
    dragged: (args: DragEventArgs) => {
        console.log(`Tab ${args.index} dropped`);
        
        // Reset cursor
        document.body.style.cursor = 'default';
        
        // Save new tab order to backend
        let tabOrder = tabObj.items.map((item: TabItemModel, index: number) => ({
            position: index,
            header: item.header?.text
        }));
        
        fetch('/api/tab-order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(tabOrder)
        }).then(() => {
            console.log('Tab order saved to backend');
            showNotification('Tab order updated');
        }).catch(error => {
            console.error('Failed to save order:', error);
            // Revert changes on error
            tabObj.refresh();
        });
        
        // Cleanup visual indicators
        document.querySelectorAll('.drop-target-active').forEach(el => {
            el.classList.remove('drop-target-active');
        });
    }
});
tabObj.appendTo('#element');

function showNotification(message: string) {
    console.log(`Notification: ${message}`);
}
```

---

### 11. **destroyed** - Component Destroyed

Fires when the Tab component is destroyed via `destroy()` method.

**Event Type:** `Event`

**Use Cases:**
- Clean up resources
- Unsubscribe from events
- Save final state
- Clear timers/intervals
- Cancel pending API calls

**Example:**

```typescript
let tabObj: Tab = new Tab({
    items: [
        { header: { 'text': 'Tab 1' }, content: 'Content 1' }
    ],
    destroyed: () => {
        console.log('Tab component destroyed');
        
        // Clean up resources
        clearAllTimers();
        unsubscribeFromUpdates();
        
        // Save final state
        saveFinalStateToStorage();
        
        // Cancel pending requests
        abortPendingRequests();
        
        console.log('All cleanup complete');
    }
});
tabObj.appendTo('#element');

// Later: Destroy the component
document.getElementById('destroyBtn')?.addEventListener('click', () => {
    tabObj.destroy();
});

function clearAllTimers() {
    // Clear any timers
}

function unsubscribeFromUpdates() {
    // Unsubscribe from event listeners
}

function saveFinalStateToStorage() {
    // Save state before destruction
}

function abortPendingRequests() {
    // Cancel in-flight API calls
}
```

---

## Event Handler Practical Patterns

### Pattern 1: Form Validation with Tab Selection

```typescript
let tabObj: Tab = new Tab({
    items: [
        { header: { 'text': 'Personal Info' }, content: '...' },
        { header: { 'text': 'Address' }, content: '...' },
        { header: { 'text': 'Review' }, content: '...' }
    ],
    selecting: (args: SelectingEventArgs) => {
        // If leaving Personal Info tab, validate form
        if (args.previousIndex === 0) {
            if (!validatePersonalInfo()) {
                args.cancel = true;
                showValidationErrors();
            }
        }
    }
});
```

### Pattern 2: Multi-Step Workflow with Confirmation

```typescript
let tabObj: Tab = new Tab({
    items: [...],
    selecting: (args: SelectingEventArgs) => {
        // Only allow going to Review if all previous steps completed
        if (args.previousIndex < 2 && !allPreviousStepsComplete()) {
            args.cancel = true;
            showMessage('Complete all steps first');
        }
    },
    selected: (args: SelectEventArgs) => {
        // Populate Review tab with submitted data
        if (args.previousIndex === 2) {
            populateReviewTab();
        }
    }
});
```

### Pattern 3: Reorderable Tabs with Persistence

```typescript
let tabObj: Tab = new Tab({
    allowDragAndDrop: true,
    items: loadSavedTabOrder(),
    dragged: (args: DragEventArgs) => {
        let newOrder = tabObj.items.map(item => item.header?.text);
        localStorage.setItem('tab-order', JSON.stringify(newOrder));
    }
});
```

---

## Best Practices

1. **Use `selecting` for Blocked Navigation** - Use cancelable `selecting` event to prevent moving to next tab
2. **Use `selected` for Content Init** - Use `selected` event to load/initialize content after selection
3. **Always Validate in `adding`** - Check if tab can be added before `adding` event completes
4. **Save on `removed`** - Immediately sync removal to backend in `removed` event
5. **Clean up in `destroyed`** - Always clean up timers, listeners, and requests in `destroyed` event
6. **Distinguish User vs Programmatic** - Check `args.isInteracted` to handle user clicks differently
7. **Handle Swipe Specially** - Check `args.isSwiped` for touch device behavior
8. **Always Provide Cancel Option** - On `removing` event, always confirm with user before deletion

---

## Related Documentation

- [Data Binding and Dynamic Content](./data-binding.md) - Using `adding`/`added`/`removing`/`removed` events
- [Customization and Styling](./customization-and-styling.md) - Dynamic styling in event handlers
- [Advanced Features](./advanced-features.md) - Drag-drop events in detail
- [State Persistence](./state-persistence.md) - Saving state in `selected`/`removed` events

