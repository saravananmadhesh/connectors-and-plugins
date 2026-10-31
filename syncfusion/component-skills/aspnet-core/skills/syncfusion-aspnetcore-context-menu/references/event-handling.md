# Event Handling and Integration

## Table of Contents
- [Select Event](#select-event)
- [BeforeOpen Event](#beforeopen-event)
- [OnOpen Event](#onopen-event)
- [BeforeClose Event](#beforeclose-event)
- [OnClose Event](#onclose-event)
- [Created Event](#created-event)
- [Event Integration Patterns](#event-integration-patterns)

## Select Event

The `select` event fires when a menu item is clicked/selected by the user.

**Event:** `select`

**Event Arguments (MenuEventArgs):**
- `name` (string): Event name = "select"

**Syntax:**
```html
<ejs-contextmenu id="contextmenu" target="#target" select="onMenuSelect" items="Model.MenuItems"></ejs-contextmenu>

<script>
function onMenuSelect(args) {
    console.log('Event:', args.name);
    console.log('Selected item:', this);
    
    // Identify selected item by element
    var selectedElement = event.target.closest('.e-menu-item');
    var selectedText = selectedElement.textContent.trim();
    
    handleMenuItemSelection(selectedText);
}

function handleMenuItemSelection(itemText) {
    switch(itemText) {
        case 'Cut':
            performCut();
            break;
        case 'Copy':
            performCopy();
            break;
        case 'Paste':
            performPaste();
            break;
    }
}
</script>
```

**C# PageModel:**
```csharp
public List<object> MenuItems { get; set; }

public void OnGet()
{
    MenuItems = new List<object>
    {
        new { text = "Cut", id = "cut" },
        new { text = "Copy", id = "copy" },
        new { text = "Paste", id = "paste" }
    };
}
```

**Use Cases:**
1. **Execute Actions** - Perform operations based on selected item
2. **Track Usage** - Log menu item selections for analytics
3. **Conditional Logic** - Different behavior per item
4. **Context Awareness** - Handle items differently based on application state

**Example: Track Selected Items**
```html
<ejs-contextmenu id="contextmenu" target="#target" select="trackSelection"></ejs-contextmenu>

<script>
var selectionHistory = [];

function trackSelection(args) {
    var selectedItem = event.target.closest('.e-menu-item');
    var timestamp = new Date().toLocaleTimeString();
    
    selectionHistory.push({
        item: selectedItem.textContent.trim(),
        time: timestamp,
        target: event.target
    });
    
    // Log to server for analytics
    if (selectionHistory.length % 5 === 0) {
        logAnalytics(selectionHistory);
    }
}

function logAnalytics(history) {
    fetch('/api/analytics/menu-selection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(history)
    }).then(r => r.json());
}
</script>
```

**Example: Conditional Actions Based on State**
```html
<script>
function onMenuSelect(args) {
    var selectedElement = event.target.closest('.e-menu-item');
    var itemId = selectedElement.getAttribute('data-item-id');
    var selectedText = selectedElement.textContent.trim();
    
    // Get current application state
    var currentDocument = window.currentDocument;
    var userPermissions = window.userPermissions;
    
    // Handle based on item with context
    if (selectedText === 'Delete' && !userPermissions.canDelete) {
        alert('You do not have permission to delete.');
        return;
    }
    
    if (selectedText === 'Save' && !currentDocument.hasChanges) {
        console.log('No changes to save.');
        return;
    }
    
    // Perform action with context
    performAction(selectedText, currentDocument, itemId);
}

function performAction(action, context, itemId) {
    // Execute action with full context
    console.log(`Performing: ${action} on ${context.name} (ID: ${itemId})`);
}
</script>
```

## BeforeOpen Event

The `beforeOpen` event fires BEFORE the menu/submenu opens, allowing you to prevent opening or modify menu structure.

**Event:** `beforeOpen`

**Event Arguments (BeforeOpenCloseMenuEventArgs):**
- `name` (string): Event name = "beforeOpen"
- `element` (HTMLElement): The menu element
- `cancel` (boolean): Set to true to cancel the menu open

**Syntax:**
```html
<ejs-contextmenu id="contextmenu" target="#target" beforeOpen="onBeforeOpen" items="Model.MenuItems"></ejs-contextmenu>

<script>
function onBeforeOpen(args) {
    console.log('Event:', args.name);
    
    // Access menu element
    var menuElement = args.element;
    
    // Can modify menu before it opens
    // Can cancel the open
}
</script>
```

**C# PageModel:**
```csharp
public List<object> MenuItems { get; set; }

public void OnGet()
{
    MenuItems = new List<object>
    {
        new { text = "File\", id = \"file\", items = new List<object> {
            new { text = \"New\", id = \"new\" },
            new { text = \"Open\", id = \"open\" }
        }}
    };
}
```
```

**Use Cases:**
1. **Validate Opening** - Check permissions before opening
2. **Dynamic Menu Adjustment** - Adjust menu based on context
3. **Load Data** - Fetch menu items dynamically
4. **Prevent Invalid States** - Cancel opening when unreasonable

**Example: Prevent Opening Based on Permissions**
```html
<script>
function onBeforeOpen(args) {
    var userRole = getCurrentUserRole();
    
    // Prevent opening if user doesn't have permission
    if (userRole === 'Guest') {
        args.cancel = true;
        alert('Context menu is not available for guests.');
        return false;
    }
    
    console.log('Menu allowed to open for:', userRole);
}

function getCurrentUserRole() {
    return window.userRole || 'Guest';
}
</script>
```

**Example: Load Menu Items Dynamically on Open**
```html
<script>
function onBeforeOpen(args) {
    var selectedElement = event.target;
    var elementId = selectedElement.getAttribute('id');
    
    // Fetch relevant menu items for this element
    fetchMenuItemsFor(elementId).then(function(items) {
        // Dynamically populate menu
        var contextmenu = document.getElementById('contextmenu').ej2_instances[0];
        contextmenu.items = items;
    });
}

async function fetchMenuItemsFor(elementId) {
    const response = await fetch(`/api/menu-items?elementId=${elementId}`);
    return response.json();
}
</script>
```

## OnOpen Event

The `onOpen` event fires AFTER the menu has successfully opened and is visible.

**Event:** `onOpen`

**Event Arguments (OpenCloseMenuEventArgs):**
- `name` (string): Event name = "onOpen"
- `element` (HTMLElement): The opened menu element

**Syntax:**
```html
<ejs-contextmenu id="contextmenu" target="#target" onOpen="onMenuOpen" items="Model.MenuItems"></ejs-contextmenu>

<script>
function onMenuOpen(args) {
    console.log('Menu opened:', args.name);
    console.log('Menu element:', args.element);
    
    // Menu is now visible and interactive
}
</script>
```

**C# PageModel:**
```csharp
public List<object> MenuItems { get; set; }

public void OnGet()
{
    MenuItems = new List<object>
    {
        new { text = "Option 1", id = "opt1" },
        new { text = "Option 2", id = "opt2" }
    };
}
```

**Use Cases:**
1. **Track Analytics** - Log menu opens for usage tracking
2. **Focus Management** - Set focus to first item
3. **Visual Effects** - Apply styling after opening
4. **Keyboard Setup** - Initialize keyboard navigation

**Example: Set Focus on First Item**
```html
<script>
function onMenuOpen(args) {
    // Take focus away from the trigger element
    event.target.blur();
    
    // Focus the first menu item
    var firstItem = args.element.querySelector('.e-menu-item');
    if (firstItem) {
        firstItem.focus();
    }
}
</script>
```

## BeforeClose Event

The `beforeClose` event fires BEFORE the menu closes, allowing you to prevent closing.

**Event:** `beforeClose`

**Event Arguments (BeforeOpenCloseMenuEventArgs):**
- `name` (string): Event name = "beforeClose"
- `element` (HTMLElement): The menu element
- `cancel` (boolean): Set to true to keep menu open

**Syntax:**
```html
<ejs-contextmenu id="contextmenu" target="#target" beforeClose="onBeforeClose" items="Model.MenuItems"></ejs-contextmenu>

<script>
function onBeforeClose(args) {
    console.log('Menu about to close:', args.name);
    
    // Optionally prevent closing
    // args.cancel = true;
}
</script>
```

**Use Cases:**
1. **Warn Before Close** - Confirm user action before closing
2. **Save State** - Preserve menu state before closing
3. **Conditional Close** - Cancel close in certain scenarios

**Example: Confirm Action Before Close**
```html
<script>
function onBeforeClose(args) {
    var selectedItems = getSelectedMenuItems();
    
    // If user has pending selections, ask for confirmation
    if (selectedItems.length > 0 && !userConfirmed) {
        var proceed = confirm('You have unsaved selections. Close anyway?');
        if (!proceed) {
            args.cancel = true;
            return false;
        }
    }
    
    // Proceed with close
    savePendingState();
}
</script>
```

## OnClose Event

The `onClose` event fires AFTER the menu has closed.

**Event:** `onClose`

**Event Arguments (OpenCloseMenuEventArgs):**
- `name` (string): Event name = "onClose"
- `element` (HTMLElement): The closed menu element

**Syntax:**
```html
<ejs-contextmenu id="contextmenu" target="#target" onClose="onMenuClose" items="Model.MenuItems"></ejs-contextmenu>

<script>
function onMenuClose(args) {
    console.log('Menu closed:', args.name);
    
    // Cleanup after menu closes
    cleanupMenuState();
}
</script>
```

**Use Cases:**
1. **Cleanup** - Remove temporary data or listeners
2. **Analytics** - Track menu interaction duration
3. **State Reset** - Reset application state after menu interaction
4. **Restore Focus** - Return focus to triggering element

**Example: Track Menu Usage Time**
```html
<script>
var menuOpenTime;

function onMenuOpen(args) {
    menuOpenTime = Date.now();
}

function onMenuClose(args) {
    var menuClosedTime = Date.now();
    var interactionDuration = menuClosedTime - menuOpenTime;
    
    // Send analytics
    sendAnalytics({
        event: 'menu_interaction',
        duration: interactionDuration,
        timestamp: menuOpenTime
    });
}

function sendAnalytics(data) {
    fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
}
</script>
```

## Created Event

The `created` event fires once after the component initialization is complete.

**Event:** `created`

**Syntax:**
```html
<ejs-contextmenu id="contextmenu" target="#target" created="onContextMenuCreated" items="Model.MenuItems"></ejs-contextmenu>

<script>
function onContextMenuCreated(args) {
    console.log('ContextMenu component created and ready');
    
    // Component is fully initialized
    var contextmenu = document.getElementById('contextmenu').ej2_instances[0];
    console.log('Instance:', contextmenu);
}
</script>
```

**Use Cases:**
1. **Initialization** - Set up component after creation
2. **Dynamic Configuration** - Modify settings after creation
3. **Event Registration** - Register additional event listeners
4. **Data Loading** - Load initial data for menu

## Event Integration Patterns

**Pattern 1: Complete Event Lifecycle**
```html
<ejs-contextmenu id="contextmenu" 
                 target="#target"
                 items="Model.MenuItems"
                 created="onCreated"
                 beforeOpen="onBeforeOpen"
                 onOpen="onOpen"
                 select="onSelect"
                 beforeClose="onBeforeClose"
                 onClose="onClose">
</ejs-contextmenu>

<script>
var menuLifecycle = [];

function onCreated(args) {
    menuLifecycle.push('created');
}

function onBeforeOpen(args) {
    menuLifecycle.push('beforeOpen');
}

function onOpen(args) {
    menuLifecycle.push('open');
}

function onSelect(args) {
    menuLifecycle.push('select');
}

function onBeforeClose(args) {
    menuLifecycle.push('beforeClose');
}

function onClose(args) {
    menuLifecycle.push('close');
    console.log('Full lifecycle:', menuLifecycle.join(' → '));
}
</script>
```

**Pattern 2: Conditional Event Handling**
```html
<script>
var applicationState = {
    mode: 'view',
    readonly: false,
    selectedItems: []
};

function onBeforeOpen(args) {
    // Adjust available actions based on mode
    if (applicationState.mode === 'view' && applicationState.readonly) {
        args.cancel = true;
        showNotification('Context menu unavailable in read-only mode');
    }
}

function onSelect(args) {
    var selectedElement = event.target.closest('.e-menu-item');
    var itemText = selectedElement.textContent.trim();
    
    // Route to appropriate handler
    var handlers = {
        'Edit': handleEdit,
        'Delete': handleDelete,
        'Copy': handleCopy
    };
    
    if (handlers[itemText]) {
        handlers[itemText](applicationState);
    }
}

function handleEdit(state) {
    if (state.readonly) return;
    console.log('Editing:', state.selectedItems);
}

function handleDelete(state) {
    if (!state.selectedItems.length) return;
    console.log('Deleting:', state.selectedItems);
}

function handleCopy(state) {
    console.log('Copying:', state.selectedItems);
}
</script>
```

