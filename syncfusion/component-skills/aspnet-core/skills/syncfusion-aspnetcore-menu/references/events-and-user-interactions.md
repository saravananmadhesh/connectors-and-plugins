# Events and User Interactions

## Table of Contents
- [Menu Events Overview](#menu-events-overview)
- [beforeOpen Event](#beforeopen-event)
- [beforeClose Event](#beforeclose-event)
- [onOpen Event](#onopen-event)
- [onClose Event](#onclose-event)
- [select Event](#select-event)
- [beforeItemRender Event](#beforeitemrender-event)
- [created Event](#created-event)
- [Event Handling Patterns](#event-handling-patterns)
- [Common Event Scenarios](#common-event-scenarios)

## Menu Events Overview

The Menu component provides seven events for tracking and responding to user interactions. All events are properties on the Menu component that accept handler function names.

### Event Declaration Syntax

```html
<ejs-menu id="menu" 
    items="menuItems"
    beforeOpen="onBeforeOpen"
    beforeClose="onBeforeClose"
    onOpen="onMenuOpen"
    onClose="onMenuClose"
    select="onItemSelect"
    beforeItemRender="onBeforeItemRender"
    created="onCreated">
</ejs-menu>

<script>
    function onBeforeOpen(args) { /* Handle event */ }
    function onBeforeClose(args) { /* Handle event */ }
    function onMenuOpen(args) { /* Handle event */ }
    function onMenuClose(args) { /* Handle event */ }
    function onItemSelect(args) { /* Handle event */ }
    function onBeforeItemRender(args) { /* Handle event */ }
    function onCreated(args) { /* Handle event */ }
</script>
```

## beforeOpen Event

The `beforeOpen` event triggers before a sub-menu opens. This allows you to modify the menu structure or prevent opening if needed.

### Event Properties (BeforeOpenCloseMenuEventArgs)

| Property | Type | Description |
|----------|------|-------------|
| `name` | string | Event name: "beforeOpen" |

### beforeOpen Example: Conditional Sub-menu Opening

```html
<ejs-menu id="menu" 
    items="menuItems"
    beforeOpen="onBeforeOpen">
</ejs-menu>

<script>
    function onBeforeOpen(args) {
        console.log("before opening submenu");
        // Access: args.name (always "beforeOpen")
    }
</script>
```

### Use Case: Log Menu Navigation

```html
<ejs-menu id="menu" 
    items="menuItems"
    beforeOpen="logMenuAccess">
</ejs-menu>

<script>
    var menuLog = [];
    
    function logMenuAccess(args) {
        var timestamp = new Date().toLocaleTimeString();
        menuLog.push({
            event: "beforeOpen",
            time: timestamp
        });
        console.log("Menu accessed at: " + timestamp);
    }
</script>
```

## beforeClose Event

The `beforeClose` event triggers before a sub-menu closes. Use this to validate user actions or prevent unintended menu closures.

### Event Properties (BeforeOpenCloseMenuEventArgs)

| Property | Type | Description |
|----------|------|-------------|
| `name` | string | Event name: "beforeClose" |

### beforeClose Example: Tracking Sub-menu Closures

```html
<ejs-menu id="menu" 
    items="menuItems"
    beforeClose="onBeforeClose">
</ejs-menu>

<script>
    function onBeforeClose(args) {
        console.log("Sub-menu about to close");
        // args.name = "beforeClose"
    }
</script>
```

## onOpen Event

The `onOpen` event triggers after a sub-menu has opened and is visible to the user.

### Event Properties (OpenCloseMenuEventArgs)

| Property | Type | Description |
|----------|------|-------------|
| `name` | string | Event name: "onOpen" |

### onOpen Example: Analytics Tracking

```html
<ejs-menu id="menu" 
    items="menuItems"
    onOpen="trackMenuOpen">
</ejs-menu>

<script>
    var menuOpenCount = 0;
    
    function trackMenuOpen(args) {
        menuOpenCount++;
        console.log("Menu opened " + menuOpenCount + " times");
    }
</script>
```

### Use Case: Multiple Event Tracking

```html
<div class="control-section">
    <ejs-menu id="menu" 
        items="ViewBag.MenuItems"
        beforeOpen="updateEventLog"
        beforeClose="updateEventLog"
        onClose="updateEventLog"
        onOpen="updateEventLog"
        select="updateEventLog">
    </ejs-menu>
</div>

<div class="event-log">
    <h4>Event Log:</h4>
    <table id="eventTable">
        <tr><td>Event trace:</td></tr>
    </table>
</div>

<script>
    function updateEventLog(args) {
        var tableCell = document.getElementById('eventTable').getElementsByTagName('td')[0];
        tableCell.insertAdjacentHTML('beforeend', args.name + ' Event triggered. <br />');
    }
</script>
```

## onClose Event

The `onClose` event triggers after a sub-menu has closed and is no longer visible.

### Event Properties (OpenCloseMenuEventArgs)

| Property | Type | Description |
|----------|------|-------------|
| `name` | string | Event name: "onClose" |

### onClose Example: Cleanup Operations

```html
<ejs-menu id="menu" 
    items="menuItems"
    onClose="onSubMenuClosed">
</ejs-menu>

<script>
    function onSubMenuClosed(args) {
        console.log("Sub-menu closed");
        // Perform cleanup: clear highlights, reset selection, etc.
    }
</script>
```

## select Event

The `select` event triggers when a user clicks or selects a menu item. This is the primary event for handling menu item actions.

### Event Properties (MenuEventArgs)

| Property | Type | Description |
|----------|------|-------------|
| `name` | string | Event name: "select" |

### select Example: Basic Item Selection

```html
@{
    List<object> menuItems = new List<object>();
    menuItems.Add(new { text = "Save" });
    menuItems.Add(new { text = "Delete" });
}

<ejs-menu id="menu" 
    items="menuItems"
    select="onItemSelect">
</ejs-menu>

<script>
    function onItemSelect(args) {
        console.log("Item selected: " + args.name);  // "select"
    }
</script>
```

### Use Case: Perform Action on Item Selection

```html
@{
    var actionMenu = new List<object>
    {
        new { text = "Save", id = "save" },
        new { text = "Delete", id = "delete" },
        new { text = "Export", id = "export" }
    };
}

<ejs-menu id="menu" 
    items="actionMenu"
    select="handleMenuAction">
</ejs-menu>

<script>
    function handleMenuAction(args) {
        console.log("Menu action event: " + args.name);  // "select"
        // Route to specific action handler
    }
</script>
```

## beforeItemRender Event

The `beforeItemRender` event triggers for each menu item during rendering. This allows customization of items before display.

### Event Properties (MenuEventArgs)

| Property | Type | Description |
|----------|------|-------------|
| `name` | string | Event name: "beforeItemRender" |

### beforeItemRender Example: Item Customization

```html
<ejs-menu id="menu" 
    items="menuItems"
    beforeItemRender="customizeMenuItem">
</ejs-menu>

<script>
    function customizeMenuItem(args) {
        console.log("Rendering menu item...");
        // Modify item appearance or properties before rendering
    }
</script>
```

## created Event

The `created` event triggers once after the Menu component is fully initialized and ready for interaction.

### Event Properties

| Property | Type | Description |
|----------|------|-------------|
| `name` | string | Event name: "created" (implicit in Event type) |

### created Example: Post-Initialization Setup

```html
<ejs-menu id="menu" 
    items="menuItems"
    created="onMenuCreated">
</ejs-menu>

<script>
    function onMenuCreated(args) {
        console.log("Menu component created and initialized");
        // Perform setup operations after component is ready
    }
</script>
```

### Use Case: Initialize Features After Menu Load

```html
<ejs-menu id="menu" 
    items="menuItems"
    created="initializeMenuFeatures">
</ejs-menu>

<script>
    function initializeMenuFeatures(args) {
        console.log("Setting up menu features...");
        
        // Set initial state
        updateMenuState();
        
        // Add keyboard shortcuts
        setupKeyboardNavigation();
        
        // Load user preferences
        loadUserTheme();
    }
    
    function updateMenuState() { /* ... */ }
    function setupKeyboardNavigation() { /* ... */ }
    function loadUserTheme() { /* ... */ }
</script>
```

## Event Handling Patterns

### Pattern 1: Single Event Handler

Attach one handler to track a specific event:

```html
<ejs-menu id="menu" 
    items="menuItems"
    select="onMenuItemSelected">
</ejs-menu>

<script>
    function onMenuItemSelected(args) {
        var eventName = args.name;  // "select"
        console.log("Selected: " + eventName);
    }
</script>
```

### Pattern 2: Multiple Events with Same Handler

Reuse one handler for multiple events:

```html
<ejs-menu id="menu" 
    items="menuItems"
    beforeOpen="trackEvent"
    onOpen="trackEvent"
    onClose="trackEvent"
    select="trackEvent">
</ejs-menu>

<script>
    var eventLog = [];
    
    function trackEvent(args) {
        eventLog.push({
            event: args.name,
            timestamp: new Date()
        });
        console.log("Event tracked: " + args.name);
    }
</script>
```

### Pattern 3: Conditional Event Handling

Route events based on conditions:

```html
<ejs-menu id="menu" 
    items="menuItems"
    select="handleMenuEvent">
</ejs-menu>

<script>
    function handleMenuEvent(args) {
        var eventType = args.name;
        
        if (eventType === "select") {
            // Handle item selection
            onMenuItemClick(args);
        } else if (eventType === "beforeOpen") {
            // Prepare sub-menu before opening
            prepareSubMenu(args);
        }
    }
    
    function onMenuItemClick(args) { /* ... */ }
    function prepareSubMenu(args) { /* ... */ }
</script>
```

### Pattern 4: Event Delegation with Data Attributes

Link events to specific menu items using IDs or custom attributes:

```html
@{
    var actionMenu = new List<object>
    {
        new { text = "Save", id = "action-save" },
        new { text = "Delete", id = "action-delete" },
        new { text = "Archive", id = "action-archive" }
    };
}

<ejs-menu id="menu" 
    items="actionMenu"
    select="delegateMenuAction">
</ejs-menu>

<script>
    var actionHandlers = {
        "action-save": function() {
            console.log("Save action triggered");
            // Save data
        },
        "action-delete": function() {
            console.log("Delete action triggered");
            // Delete data
        },
        "action-archive": function() {
            console.log("Archive action triggered");
            // Archive data
        }
    };
    
    function delegateMenuAction(args) {
        if (args.name === "select") {
            // Get selected item ID and dispatch to handler
            var itemId = args.item?.id;
            if (itemId && actionHandlers[itemId]) {
                actionHandlers[itemId]();
            }
        }
    }
</script>
```

## Common Event Scenarios

### Scenario 1: Track All Menu Interactions

Create comprehensive logging of all menu activity:

```html
<ejs-menu id="menu" 
    items="menuItems"
    beforeOpen="trackMenuOpen"
    beforeClose="trackMenuClose"
    onOpen="trackMenuOpened"
    onClose="trackMenuClosed"
    select="trackMenuClick"
    created="trackInitialized">
</ejs-menu>

<script>
    var menuMetrics = {
        initialized: false,
        openCount: 0,
        closeCount: 0,
        selectCount: 0
    };
    
    function trackInitialized(args) {
        menuMetrics.initialized = true;
        console.log("Menu initialized");
    }
    
    function trackMenuOpen(args) {
        console.log("Sub-menu about to open");
    }
    
    function trackMenuOpened(args) {
        menuMetrics.openCount++;
        console.log("Sub-menu opened (total: " + menuMetrics.openCount + ")");
    }
    
    function trackMenuClose(args) {
        console.log("Sub-menu about to close");
    }
    
    function trackMenuClosed(args) {
        menuMetrics.closeCount++;
        console.log("Sub-menu closed (total: " + menuMetrics.closeCount + ")");
    }
    
    function trackMenuClick(args) {
        menuMetrics.selectCount++;
        console.log("Item selected (total: " + menuMetrics.selectCount + ")");
    }
</script>
```

### Scenario 2: Dynamic Menu Updates Based on Events

Modify menu state in response to user actions:

```html
<ejs-menu id="menu" 
    items="menuItems"
    select="updateMenuState">
</ejs-menu>

<script>
    var menuState = {
        lastSelected: null,
        itemCount: 0
    };
    
    function updateMenuState(args) {
        if (args.name === "select") {
            // Store last selected item
            menuState.lastSelected = new Date();
            
            // Count selections
            menuState.itemCount++;
            
            console.log("Menu state updated. Total selections: " + menuState.itemCount);
        }
    }
</script>
```

### Scenario 3: Synchronize Multiple Menus

Keep multiple menus in sync through events:

```html
<ejs-menu id="menu1" items="menuItems" select="syncMenus"></ejs-menu>
<ejs-menu id="menu2" items="menuItems" select="syncMenus"></ejs-menu>

<script>
    var lastSelectedMenu = null;
    
    function syncMenus(args) {
        if (args.name === "select") {
            lastSelectedMenu = this.id;
            console.log("Selected from: " + lastSelectedMenu);
            
            // Update other menus to match state
            // (requires Menu instance reference or data binding)
        }
    }
</script>
```

### Scenario 4: Validate Menu Actions

Verify user permissions or conditions before allowing actions:

```html
<ejs-menu id="menu" 
    items="menuItems"
    select="validateMenuAction">
</ejs-menu>

<script>
    var userPermissions = {
        canDelete: false,
        canEdit: true,
        isAdmin: false
    };
    
    function validateMenuAction(args) {
        if (args.name === "select") {
            var selectedItem = args.item;
            
            // Check permissions
            if (selectedItem === "Delete" && !userPermissions.canDelete) {
                console.log("Delete action not allowed for this user");
                // Prevent action or show message
                return;
            }
            
            if (selectedItem === "Admin" && !userPermissions.isAdmin) {
                console.log("Admin action not allowed");
                return;
            }
            
            // Allow action
            console.log("Action allowed");
        }
    }
</script>
```

---

**Related References:**
- [getting-started.md](getting-started.md) - Basic event setup
- [api-reference.md](api-reference.md) - Complete event type definitions
- [customization-and-styling.md](customization-and-styling.md) - Dynamic styling with events
