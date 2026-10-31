# Kanban Events Reference

## Table of Contents
- [Overview](#overview)
- [Lifecycle Events](#lifecycle-events)
- [Data Events](#data-events)
- [User Interaction Events](#user-interaction-events)
- [Drag and Drop Events](#drag-and-drop-events)
- [Dialog Events](#dialog-events)
- [Rendering Events](#rendering-events)
- [Common Event Patterns](#common-event-patterns)

## Overview

Kanban provides a comprehensive set of events to intercept and customize behavior at various stages of the component lifecycle, user interactions, and data operations.

**Event Categories:**
- Lifecycle: Created
- Data: DataBinding, DataBound, DataSourceChanged, DataStateChange
- User Interaction: CardClick, CardDoubleClick
- Drag and Drop: DragStart, Drag, DragStop, ColumnDragStart, ColumnDrag, ColumnDrop
- Dialog: DialogOpen, DialogClose
- Rendering: CardRendered, QueryCellInfo
- Actions: ActionBegin, ActionComplete, ActionFailure

## Lifecycle Events

### Created

Triggers after the Kanban board is fully created and rendered.

**Signature:** `public string Created { get; set; }`

**Example:**

```razor
@Html.EJS().Kanban("kanban")
    .KeyField("Status")
    .DataSource((IEnumerable<object>)ViewBag.data)
    .Columns(col =>
    {
        col.HeaderText("To Do").KeyField("Open").Add();
        col.HeaderText("In Progress").KeyField("InProgress").Add();
    })
    .CardSettings(card =>
    {
        card.ContentField("Summary").HeaderField("Id");
    })
    .Created("onCreated")
    .Render()

<script>
    function onCreated() {
        console.log('Kanban board created successfully');
        
        // Initialize custom features
        initializeCustomFeatures();
        
        // Load user preferences
        loadUserPreferences();
    }
    
    function initializeCustomFeatures() {
        // Custom initialization logic
    }
    
    function loadUserPreferences() {
        // Load saved preferences
    }
</script>
```

**Use Cases:**
- Initialize third-party integrations
- Load user preferences
- Set up custom event listeners
- Initialize tracking or analytics

## Data Events

### DataBinding

Triggers before data binds to the Kanban board.

**Signature:** `public string DataBinding { get; set; }`

**Example:**

```razor
.DataBinding("onDataBinding")

<script>
    function onDataBinding(args) {
        console.log('Data binding started');
        
        // Show loading indicator
        showLoadingSpinner();
        
        // Modify data before binding
        if (args.data) {
            args.data = args.data.map(function(item) {
                // Add computed fields
                item.DaysOld = calculateDaysOld(item.CreatedDate);
                return item;
            });
        }
    }
</script>
```

### DataBound

Triggers after data has been bound to the Kanban board.

**Signature:** `public string DataBound { get; set; }`

**Example:**

```razor
.DataBound("onDataBound")

<script>
    function onDataBound(args) {
        console.log('Data binding completed');
        console.log('Total cards:', args.result.length);
        
        // Hide loading indicator
        hideLoadingSpinner();
        
        // Update statistics
        updateCardStatistics();
        
        // Apply custom formatting
        applyConditionalFormatting();
    }
    
    function updateCardStatistics() {
        var kanbanObj = document.getElementById('kanban').ej2_instances[0];
        var totalCards = kanbanObj.kanbanData.length;
        document.getElementById('totalCards').innerText = totalCards;
    }
</script>
```

### DataSourceChanged

Triggers when cards are added, deleted, or updated in the data source.

**Signature:** `public string DataSourceChanged { get; set; }`

**Example:**

```razor
.DataSourceChanged("onDataSourceChanged")

<script>
    function onDataSourceChanged(args) {
        console.log('Data source changed');
        console.log('Action:', args.action); // 'add', 'edit', 'delete'
        console.log('Data:', args.data);
        
        // Send changes to server
        if (args.action === 'add') {
            syncToServer('INSERT', args.data);
        } else if (args.action === 'edit') {
            syncToServer('UPDATE', args.data);
        } else if (args.action === 'delete') {
            syncToServer('DELETE', args.data);
        }
    }
    
    function syncToServer(operation, data) {
        $.ajax({
            url: '/Kanban/Sync',
            type: 'POST',
            data: JSON.stringify({ operation: operation, data: data }),
            contentType: 'application/json'
        });
    }
</script>
```

### DataStateChange

Triggers when Kanban actions (sorting, filtering, etc.) are performed. Useful for server-side operations.

**Signature:** `public string DataStateChange { get; set; }`

**Example:**

```razor
.DataStateChange("onDataStateChange")

<script>
    function onDataStateChange(args) {
        console.log('Data state changed');
        
        // args contains query information
        var query = args;
        
        // Fetch data from server based on state
        $.ajax({
            url: '/Kanban/GetData',
            type: 'POST',
            data: JSON.stringify(query),
            contentType: 'application/json',
            success: function(result) {
                // Update Kanban with server data
                args.dataSource = result;
            }
        });
    }
</script>
```

## User Interaction Events

### CardClick

Triggers when a card is single-clicked.

**Signature:** `public string CardClick { get; set; }`

**Event Arguments:**
- `data`: Card data object
- `element`: Card DOM element
- `event`: Native mouse event
- `cancel`: Set to true to prevent default action

**Example:**

```razor
.CardClick("onCardClick")

<script>
    function onCardClick(args) {
        console.log('Card clicked:', args.data);
        
        // Show card details in sidebar
        showCardDetails(args.data);
        
        // Highlight clicked card
        args.element.style.boxShadow = '0 4px 12px rgba(33, 150, 243, 0.4)';
        
        // Track analytics
        trackCardClick(args.data.Id);
    }
    
    function showCardDetails(cardData) {
        document.getElementById('detailsPanel').innerHTML = `
            <h3>Card #${cardData.Id}</h3>
            <p><strong>Summary:</strong> ${cardData.Summary}</p>
            <p><strong>Assignee:</strong> ${cardData.Assignee}</p>
            <p><strong>Priority:</strong> ${cardData.Priority}</p>
        `;
    }
</script>
```

### CardDoubleClick

Triggers when a card is double-clicked. By default, opens the edit dialog.

**Signature:** `public string CardDoubleClick { get; set; }`

**Example:**

```razor
.CardDoubleClick("onCardDoubleClick")

<script>
    function onCardDoubleClick(args) {
        console.log('Card double-clicked:', args.data);
        
        // Cancel default dialog opening
        args.cancel = true;
        
        // Open custom detail view
        openCustomDetailView(args.data);
    }
    
    function openCustomDetailView(cardData) {
        // Custom implementation
        window.location.href = '/Tasks/Details/' + cardData.Id;
    }
</script>
```

## Drag and Drop Events

### DragStart

Triggers when card drag operation starts.

**Signature:** `public string DragStart { get; set; }`

**Event Arguments:**
- `data`: Array of dragged card objects
- `element`: Drag element
- `event`: Native mouse event
- `cancel`: Set to true to prevent drag

**Example:**

```razor
.DragStart("onDragStart")

<script>
    function onDragStart(args) {
        console.log('Drag started for card:', args.data[0].Id);
        
        // Prevent dragging high priority locked cards
        if (args.data[0].Priority === 'Critical' && args.data[0].Locked) {
            args.cancel = true;
            alert('Critical locked cards cannot be moved');
            return;
        }
        
        // Change drag cursor
        args.element.style.cursor = 'move';
        
        // Highlight valid drop zones
        highlightValidColumns(args.data[0]);
    }
    
    function highlightValidColumns(cardData) {
        var validColumns = getValidColumns(cardData.Status);
        validColumns.forEach(function(col) {
            document.querySelector(`[data-key="${col}"]`).classList.add('valid-drop-zone');
        });
    }
</script>
```

### Drag

Triggers while the card is being dragged.

**Signature:** `public string Drag { get; set; }`

**Example:**

```razor
.Drag("onDrag")

<script>
    function onDrag(args) {
        // Provide real-time visual feedback
        var targetColumn = getColumnUnderCursor(args.event);
        if (targetColumn) {
            updateDropIndicator(targetColumn);
        }
    }
    
    function updateDropIndicator(column) {
        // Update UI to show where card will drop
    }
</script>
```

### DragStop

Triggers when card drag operation ends (on drop).

**Signature:** `public string DragStop { get; set; }`

**Event Arguments:**
- `data`: Array of dropped card objects (with updated Status)
- `element`: Drag element
- `dropTarget`: Target element where card was dropped
- `event`: Native mouse event
- `cancel`: Set to true to prevent drop
- `requestType`: 'card'

**Example:**

```razor
.DragStop("onDragStop")

<script>
    function onDragStop(args) {
        console.log('Card dropped:', args.data[0]);
        console.log('New status:', args.data[0].Status);
        
        // Validate workflow transition
        var oldStatus = args.data[0].PreviousStatus || 'Open';
        var newStatus = args.data[0].Status;
        
        if (!isValidTransition(oldStatus, newStatus)) {
            args.cancel = true;
            alert(`Invalid transition from ${oldStatus} to ${newStatus}`);
            return;
        }
        
        // Update timestamps
        if (newStatus === 'InProgress') {
            args.data[0].StartedDate = new Date();
        } else if (newStatus === 'Close') {
            args.data[0].CompletedDate = new Date();
        }
        
        // Remove highlights
        document.querySelectorAll('.valid-drop-zone').forEach(function(el) {
            el.classList.remove('valid-drop-zone');
        });
        
        // Notify server
        notifyServer('cardMoved', args.data[0]);
    }
    
    function isValidTransition(from, to) {
        var validTransitions = {
            'Open': ['InProgress'],
            'InProgress': ['Testing', 'Open'],
            'Testing': ['Close', 'InProgress'],
            'Close': []
        };
        return validTransitions[from] && validTransitions[from].includes(to);
    }
</script>
```

### ColumnDragStart

Triggers when a column drag operation starts.

**Signature:** `public string ColumnDragStart { get; set; }`

**Example:**

```razor
.AllowColumnDragAndDrop(true)
.ColumnDragStart("onColumnDragStart")

<script>
    function onColumnDragStart(args) {
        console.log('Column drag started');
        
        // Prevent dragging specific columns
        if (args.column.keyField === 'Close') {
            args.cancel = true;
            alert('"Done" column cannot be moved');
        }
    }
</script>
```

### ColumnDrag

Triggers while a column is being dragged.

**Signature:** `public string ColumnDrag { get; set; }`

**Example:**

```razor
.ColumnDrag("onColumnDrag")

<script>
    function onColumnDrag(args) {
        // Show drop position indicator
        updateColumnDropIndicator(args);
    }
</script>
```

### ColumnDrop

Triggers when a column is dropped.

**Signature:** `public string ColumnDrop { get; set; }`

**Example:**

```razor
.ColumnDrop("onColumnDrop")

<script>
    function onColumnDrop(args) {
        console.log('Column dropped at index:', args.dropIndex);
        
        // Save new column order to user preferences
        saveColumnOrder(args.columnOrder);
    }
    
    function saveColumnOrder(order) {
        $.ajax({
            url: '/Kanban/SaveColumnOrder',
            type: 'POST',
            data: JSON.stringify({ order: order }),
            contentType: 'application/json'
        });
    }
</script>
```

## Dialog Events

### DialogOpen

Triggers before the dialog opens for adding or editing cards.

**Signature:** `public string DialogOpen { get; set; }`

**Event Arguments:**
- `cancel`: Set to true to prevent dialog opening
- `data`: Card data (for edit), empty object (for add)
- `element`: Dialog DOM element
- `requestType`: 'Add' or 'Edit'

**Example:**

```razor
.DialogOpen("onDialogOpen")

<script>
    function onDialogOpen(args) {
        console.log('Dialog opening for:', args.requestType);
        
        // Check permissions
        if (!hasEditPermission()) {
            args.cancel = true;
            alert('You do not have permission to edit cards');
            return;
        }
        
        // Set default values for new cards
        if (args.requestType === 'Add') {
            args.data.Priority = 'Normal';
            args.data.CreatedDate = new Date();
            args.data.CreatedBy = getCurrentUser();
        }
        
        // Modify dialog title
        if (args.requestType === 'Edit') {
            var dialogTitle = args.element.querySelector('.e-dlg-header-content');
            if (dialogTitle) {
                dialogTitle.innerText = `Edit Card #${args.data.Id}`;
            }
        }
        
        // Load related data
        if (args.requestType === 'Edit') {
            loadCardHistory(args.data.Id);
        }
    }
</script>
```

### DialogClose

Triggers before the dialog closes after adding, editing, or deleting cards.

**Signature:** `public string DialogClose { get; set; }`

**Event Arguments:**
- `cancel`: Set to true to prevent dialog closing
- `data`: Modified card data
- `element`: Dialog DOM element
- `requestType`: 'Add', 'Edit', or 'Delete'

**Example:**

```razor
.DialogClose("onDialogClose")

<script>
    function onDialogClose(args) {
        console.log('Dialog closing:', args.requestType);
        
        // Validate data before saving
        if (args.requestType === 'Add' || args.requestType === 'Edit') {
            if (!validateCardData(args.data)) {
                args.cancel = true;
                alert('Please fill all required fields');
                return;
            }
            
            // Add audit information
            args.data.ModifiedDate = new Date();
            args.data.ModifiedBy = getCurrentUser();
            
            // Save to server
            saveCardToServer(args.data, args.requestType);
        }
        
        // Confirm deletion
        if (args.requestType === 'Delete') {
            if (!confirm(`Delete card #${args.data.Id}?`)) {
                args.cancel = true;
                return;
            }
        }
    }
    
    function validateCardData(data) {
        return data.Summary && data.Summary.length >= 5 && data.Status && data.Assignee;
    }
    
    function saveCardToServer(data, action) {
        var url = action === 'Add' ? '/Kanban/Insert' : '/Kanban/Update';
        $.ajax({
            url: url,
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: function() {
                console.log('Card saved successfully');
            }
        });
    }
</script>
```

## Rendering Events

### CardRendered

Triggers before each card is rendered on the page. Useful for custom card styling or content modification.

**Signature:** `public string CardRendered { get; set; }`

**Event Arguments:**
- `data`: Card data object
- `element`: Card DOM element
- `cancel`: Set to true to skip rendering this card

**Example:**

```razor
.CardRendered("onCardRendered")

<script>
    function onCardRendered(args) {
        var card = args.element;
        var data = args.data;
        
        // Apply priority-based colors
        switch(data.Priority) {
            case 'Critical':
                card.style.borderLeft = '5px solid #d32f2f';
                card.style.backgroundColor = '#ffebee';
                break;
            case 'High':
                card.style.borderLeft = '5px solid #ff9800';
                card.style.backgroundColor = '#fff3e0';
                break;
            case 'Normal':
                card.style.borderLeft = '5px solid #4caf50';
                break;
            case 'Low':
                card.style.borderLeft = '5px solid #2196f3';
                card.style.backgroundColor = '#e3f2fd';
                break;
        }
        
        // Add badge for overdue cards
        if (data.DueDate && new Date(data.DueDate) < new Date()) {
            var badge = document.createElement('span');
            badge.className = 'overdue-badge';
            badge.innerText = 'OVERDUE';
            badge.style.cssText = 'background:red;color:white;padding:2px 6px;font-size:10px;border-radius:3px;';
            card.querySelector('.e-card-header').appendChild(badge);
        }
        
        // Add icons
        if (data.HasAttachments) {
            addIcon(card, 'e-icons e-attach');
        }
        if (data.HasComments) {
            addIcon(card, 'e-icons e-comment');
        }
    }
    
    function addIcon(card, iconClass) {
        var icon = document.createElement('span');
        icon.className = iconClass;
        card.querySelector('.e-card-footer').appendChild(icon);
    }
</script>
```

### QueryCellInfo

Triggers before each column is rendered on the page. Useful for custom column styling.

**Signature:** `public string QueryCellInfo { get; set; }`

**Event Arguments:**
- `data`: Array of cards in the column
- `element`: Column DOM element
- `column`: Column configuration object

**Example:**

```razor
.QueryCellInfo("onQueryCellInfo")

<script>
    function onQueryCellInfo(args) {
        var columnKey = args.column.keyField;
        var cardCount = args.data.length;
        
        // Highlight column if it exceeds limit
        if (cardCount > args.column.maxCount) {
            args.element.style.backgroundColor = '#ffebee';
        }
        
        // Add custom column indicators
        if (columnKey === 'InProgress') {
            args.element.classList.add('active-column');
        }
    }
</script>
```

## Action Events

### ActionBegin

Triggers at the beginning of every Kanban action (add, edit, delete, drag).

**Signature:** `public string ActionBegin { get; set; }`

**Event Arguments:**
- `requestType`: Type of action ('cardCreate', 'cardChange', 'cardRemove', 'cardDrag')
- `cancel`: Set to true to prevent the action
- `data`: Card data involved in the action
- `addedRecords`: Newly added cards
- `changedRecords`: Modified cards
- `deletedRecords`: Deleted cards

**Example:**

```razor
.ActionBegin("onActionBegin")

<script>
    function onActionBegin(args) {
        console.log('Action beginning:', args.requestType);
        
        // Show loading indicator
        if (args.requestType === 'cardCreate' || args.requestType === 'cardChange') {
            showLoadingSpinner();
        }
        
        // Validate before action
        if (args.requestType === 'cardRemove') {
            if (!confirm('Delete this card?')) {
                args.cancel = true;
            }
        }
        
        // Log all actions
        logAction(args.requestType, args.data);
    }
</script>
```

### ActionComplete

Triggers after successful completion of any Kanban action.

**Signature:** `public string ActionComplete { get; set; }`

**Example:**

```razor
.ActionComplete("onActionComplete")

<script>
    function onActionComplete(args) {
        console.log('Action completed:', args.requestType);
        
        // Hide loading indicator
        hideLoadingSpinner();
        
        // Show success message
        if (args.requestType === 'cardCreate') {
            showNotification('Card created successfully');
        } else if (args.requestType === 'cardChange') {
            showNotification('Card updated successfully');
        } else if (args.requestType === 'cardRemove') {
            showNotification('Card deleted successfully');
        }
        
        // Refresh statistics
        updateDashboard();
    }
</script>
```

### ActionFailure

Triggers when a Kanban action fails or is interrupted. Returns error information.

**Signature:** `public string ActionFailure { get; set; }`

**Event Arguments:**
- `error`: Error object with message and stack trace

**Example:**

```razor
.ActionFailure("onActionFailure")

<script>
    function onActionFailure(args) {
        console.error('Action failed:', args.error);
        
        // Hide loading indicator
        hideLoadingSpinner();
        
        // Show user-friendly error message
        var errorMessage = 'An error occurred. Please try again.';
        if (args.error && args.error.message) {
            if (args.error.message.includes('Network')) {
                errorMessage = 'Network error. Please check your connection.';
            } else if (args.error.message.includes('Unauthorized')) {
                errorMessage = 'You do not have permission for this action.';
            }
        }
        
        alert(errorMessage);
        
        // Log error to server
        logErrorToServer(args.error);
    }
    
    function logErrorToServer(error) {
        $.ajax({
            url: '/Kanban/LogError',
            type: 'POST',
            data: JSON.stringify({ error: error }),
            contentType: 'application/json'
        });
    }
</script>
```

## Common Event Patterns

### Pattern 1: Audit Logging
```javascript
function onActionComplete(args) {
    var auditEntry = {
        action: args.requestType,
        timestamp: new Date(),
        user: getCurrentUser(),
        data: args.data
    };
    
    $.ajax({
        url: '/Audit/Log',
        type: 'POST',
        data: JSON.stringify(auditEntry),
        contentType: 'application/json'
    });
}
```

### Pattern 2: Validation Pipeline
```javascript
function onDialogClose(args) {
    if (args.requestType === 'Add' || args.requestType === 'Edit') {
        // Run validation pipeline
        var validations = [
            validateRequired,
            validateLength,
            validateFormat,
            validateBusinessRules
        ];
        
        for (var i = 0; i < validations.length; i++) {
            if (!validations[i](args.data)) {
                args.cancel = true;
                return;
            }
        }
    }
}
```

### Pattern 3: Real-time Sync
```javascript
function onDataSourceChanged(args) {
    // Real-time sync with SignalR
    connection.invoke('SyncKanbanUpdate', {
        action: args.action,
        data: args.data
    });
}
```

## Best Practices

1. **Avoid heavy operations**: Keep event handlers lightweight
2. **Use cancel flag**: Prevent unwanted actions with `args.cancel = true`
3. **Error handling**: Always implement ActionFailure event
4. **Debounce**: For events that fire frequently (Drag, ColumnDrag)
5. **Clean up**: Remove event listeners in component destroy
6. **Async operations**: Use promises for server calls
7. **User feedback**: Provide visual feedback for all actions
8. **Validation**: Validate in ActionBegin or DialogClose
9. **Logging**: Log important events for debugging
10. **Testing**: Test all event handlers thoroughly
