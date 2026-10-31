# Dragging and Dropping Panels

## Table of Contents
- [Overview](#overview)
- [Enabling Drag and Drop](#enabling-drag-and-drop)
- [Drag Event Lifecycle](#drag-event-lifecycle)
- [Handling Drag Events](#handling-drag-events)
- [Customizing Draggable Handles](#customizing-draggable-handles)
- [Panel Collision and Adaptation](#panel-collision-and-adaptation)
- [Event Binding Syntax](#event-binding-syntax)
- [Complete Drag Examples](#complete-drag-examples)

## Overview

The Dashboard Layout provides built-in drag-and-drop functionality that allows users to reorder panels within the grid. When dragging, the system automatically handles panel collisions and repositioning, providing visual feedback through a placeholder indicator showing where the panel will be placed.

The drag-and-drop feature is controlled by the `allowDragging` property and includes three exact events for tracking the drag lifecycle: `dragStart`, `drag`, and `dragStop`. These event names must match the API specification exactly.

## Enabling Drag and Drop

### Basic Enablement

Drag-and-drop is enabled by default. Use the `allowDragging` property to control this behavior:

```html
<!-- Enable dragging (default) -->
<ejs-dashboardlayout id="dashboard" allowDragging="true" columns="6">
    <e-dashboardlayout-panels>
        <!-- Panels can be dragged -->
    </e-dashboardlayout-panels>
</ejs-dashboardlayout>

<!-- Disable dragging -->
<ejs-dashboardlayout id="dashboard" allowDragging="false" columns="6">
    <e-dashboardlayout-panels>
        <!-- Panels cannot be dragged -->
    </e-dashboardlayout-panels>
</ejs-dashboardlayout>
```

### Toggling Drag Capability at Runtime

```html
<button id="toggleDragBtn" class="btn btn-primary">Toggle Dragging</button>

<script>
    document.getElementById('toggleDragBtn').addEventListener('click', function() {
        var dashboardObj = document.getElementById('dashboard').ej2_instances[0];
        var currentState = dashboardObj.allowDragging;
        
        dashboardObj.allowDragging = !currentState;
        console.log('Dragging is now ' + (dashboardObj.allowDragging ? 'enabled' : 'disabled'));
    });
</script>
```

## Drag Event Lifecycle

The drag operation triggers three distinct events in sequence:

### Event Sequence

1. **dragStart** - Fires when user initiates a drag action
2. **drag** - Fires continuously while the panel is being dragged
3. **dragStop** - Fires when the user releases the mouse/touch

```
User clicks panel
       ↓
    dragStart event
       ↓
User moves mouse (drag continues)
       ↓
    drag event (fires repeatedly)
       ↓
User releases mouse
       ↓
    dragStop event
```

## Handling Drag Events

### Event Binding in TagHelper Syntax

In ASP.NET Core TagHelper, the correct event binding uses `dragStart`, `drag`, and `dragStop`. These are exact API event names:

```html
<ejs-dashboardlayout id="dashboard" 
                      columns="6"
                      allowDragging="true"
                      dragStart="onDragStart"
                      drag="onDrag"
                      dragStop="onDragStop">
    <e-dashboardlayout-panels>
        <e-dashboardlayout-panel id="panel1" sizeX="2" sizeY="1" row="0" col="0"
                                 header="<div>Draggable Panel</div>"
                                 content="<div>Drag this panel</div>">
        </e-dashboardlayout-panel>
    </e-dashboardlayout-panels>
</ejs-dashboardlayout>

<script>
    function onDragStart(args) {
        console.log('Drag started for panel:', args.element.id);
    }
    
    function onDrag(args) {
        console.log('Panel being dragged');
    }
    
    function onDragStop(args) {
        console.log('Drag completed for panel:', args.element.id);
        console.log('New position - Row:', args.element.rowSpan, 'Col:', args.element.colSpan);
    }
</script>
```

### dragStart Event Details

The `dragStart` event fires when a panel drag begins:

```javascript
function onDragStart(args) {
    // args.element - The panel element being dragged
    // args.event - The mouse/touch event
    
    console.log('Panel ID:', args.element.id);
    console.log('Element:', args.element);
    
    // Prevent drag of specific panels
    if (args.element.id === 'protected-panel') {
        args.cancel = true;  // Prevent drag
    }
}
```

### drag Event Details

The `drag` event fires continuously during dragging:

```javascript
function onDrag(args) {
    // args.element - The panel being dragged
    // args.event - The current mouse/touch event
    // Position information may be available depending on implementation
    
    // Example: Update UI while dragging
    updateDragIndicator(args.element.id);
}
```

### dragStop Event Details

The `dragStop` event fires when dragging completes:

```javascript
function onDragStop(args) {
    // args.element - The panel that was dragged
    // args.event - The mouse/touch event
    
    var panelId = args.element.id;
    console.log('Drag completed for panel:', panelId);
    
    // Get final panel position
    var dashboardObj = document.getElementById('dashboard').ej2_instances[0];
    var panels = dashboardObj.serialize();
    var draggedPanel = panels.find(p => p.id === panelId);
    
    if (draggedPanel) {
        console.log('Final position - Row:', draggedPanel.row, 'Col:', draggedPanel.col);
    }
    
    // Save dashboard state
    saveDashboardState();
}
```

## Customizing Draggable Handles

By default, the entire panel acts as a drag handle. You can restrict dragging to specific elements (like a header) using the `draggableHandle` property.

### Restricting Drag to Header

```html
<ejs-dashboardlayout id="dashboard" 
                      columns="6"
                      allowDragging="true"
                      draggableHandle=".panel-header"
                      dragStart="onDragStart"
                      dragStop="onDragStop">
    <e-dashboardlayout-panels>
        <e-dashboardlayout-panel id="panel1" sizeX="2" sizeY="1">
            <e-content-template>
                <div class="panel-header" style="background: #f0f0f0; padding: 10px; cursor: move;">
                    <strong>Drag from header only</strong>
                </div>
                <div style="padding: 10px;">
                    Panel content here
                </div>
            </e-content-template>
        </e-dashboardlayout-panel>
    </e-dashboardlayout-panels>
</ejs-dashboardlayout>
```

### Restricting Drag to Specific Icon

```html
<style>
    .drag-handle {
        cursor: move;
        display: inline-block;
        margin-right: 10px;
        font-size: 18px;
    }
</style>

<ejs-dashboardlayout id="dashboard" 
                      columns="6"
                      draggableHandle=".drag-handle">
    <e-dashboardlayout-panels>
        <e-dashboardlayout-panel id="panel1" sizeX="2" sizeY="1">
            <e-content-template>
                <div style="display: flex; align-items: center; padding: 10px;">
                    <span class="drag-handle">☰</span>
                    <span><strong>Panel Title</strong></span>
                </div>
                <div style="padding: 10px;">
                    Content area - not draggable
                </div>
            </e-content-template>
        </e-dashboardlayout-panel>
    </e-dashboardlayout-panels>
</ejs-dashboardlayout>
```

### Updating Draggable Handle at Runtime

```javascript
function updateDraggableHandle(selector) {
    var dashboardObj = document.getElementById('dashboard').ej2_instances[0];
    dashboardObj.draggableHandle = selector;
    
    // Refresh if needed
    dashboardObj.refresh();
}

// Change drag handle from header to icon
updateDraggableHandle('.drag-icon');
```

### Refreshing Draggable Handle

When panels are added dynamically, use `refreshDraggableHandle` to update the drag configuration:

```javascript
function addPanelAndRefreshDrag() {
    var dashboardObj = document.getElementById('dashboard').ej2_instances[0];
    
    // Add new panel
    var newPanel = {
        'id': 'dynamic-panel',
        'sizeX': 2,
        'sizeY': 1,
        'header': 'Dynamic Panel',
        'content': '<span class="drag-handle">≡</span><strong>Drag me</strong>'
    };
    
    dashboardObj.addPanel(newPanel);
    
    // Refresh drag handle for dynamically added panels
    dashboardObj.refreshDraggableHandle();
}
```

## Panel Collision and Adaptation

When you drag a panel over another, the Dashboard Layout automatically handles collision detection and repositions panels to avoid overlap.

### Collision Detection

```javascript
function onDragStop(args) {
    var dashboardObj = document.getElementById('dashboard').ej2_instances[0];
    var panels = dashboardObj.serialize();
    var draggedPanel = panels.find(p => p.id === args.element.id);
    
    // Check if panel collided with others
    var collisions = detectCollisions(draggedPanel, panels);
    
    if (collisions.length > 0) {
        console.log('Collisions detected with panels:', collisions.map(p => p.id));
    }
}

function detectCollisions(draggedPanel, allPanels) {
    var collisions = [];
    
    allPanels.forEach(function(panel) {
        if (panel.id !== draggedPanel.id) {
            // Check if panels overlap
            if (panelsOverlap(draggedPanel, panel)) {
                collisions.push(panel);
            }
        }
    });
    
    return collisions;
}

function panelsOverlap(p1, p2) {
    var p1Right = p1.col + p1.sizeX;
    var p2Right = p2.col + p2.sizeX;
    var p1Bottom = p1.row + p1.sizeY;
    var p2Bottom = p2.row + p2.sizeY;
    
    return !(p1Right <= p2.col || p2Right <= p1.col || 
             p1Bottom <= p2.row || p2Bottom <= p1.row);
}
```

### Collision Event Notification

```javascript
function onDragStop(args) {
    var dashboardObj = document.getElementById('dashboard').ej2_instances[0];
    var panels = dashboardObj.serialize();
    var draggedPanel = panels.find(p => p.id === args.element.id);
    
    // Notify user of panel adjustments
    showNotification('Panel "' + draggedPanel.id + '" moved to Row ' + 
                    draggedPanel.row + ', Col ' + draggedPanel.col);
}

function showNotification(message) {
    // Use Bootstrap Toast or custom notification
    console.log('✓ ' + message);
}
```

## Event Binding Syntax

### TagHelper Event Binding

In ASP.NET Core, use the `dragStart`, `drag`, and `dragStop` attributes:

```html
<ejs-dashboardlayout id="dashboard"
                      dragStart="onDragStart"
                      drag="onDrag"
                      dragStop="onDragStop">
    <!-- panels -->
</ejs-dashboardlayout>

<script>
    function onDragStart(args) { }
    function onDrag(args) { }
    function onDragStop(args) { }
</script>
```

### Runtime Event Binding

```javascript
var dashboardObj = document.getElementById('dashboard').ej2_instances[0];

// Bind dragStart event
dashboardObj.dragStart = function(args) {
    console.log('Drag started');
};

// Bind drag event
dashboardObj.drag = function(args) {
    console.log('Dragging');
};

// Bind dragStop event
dashboardObj.dragStop = function(args) {
    console.log('Drag stopped');
};
```

### Using addEventListener

```javascript
var dashboardObj = document.getElementById('dashboard').ej2_instances[0];

dashboardObj.addEventListener('dragStart', function(args) {
    console.log('dragStart event triggered');
});

dashboardObj.addEventListener('drag', function(args) {
    console.log('drag event triggered');
});

dashboardObj.addEventListener('dragStop', function(args) {
    console.log('dragStop event triggered');
});
```

## Complete Drag Examples

### Example 1: Drag Tracking and Logging

```html
<ejs-dashboardlayout id="dashboard" 
                      allowDragging="true"
                      columns="6"
                      dragStart="onDragStart"
                      drag="onDrag"
                      dragStop="onDragStop">
    <e-dashboardlayout-panels>
        <e-dashboardlayout-panel id="panel1" sizeX="2" sizeY="1" row="0" col="0"
                                 header="<div>Track My Drags</div>"
                                 content="<div>Drag this panel to track events</div>">
        </e-dashboardlayout-panel>
    </e-dashboardlayout-panels>
</ejs-dashboardlayout>

<div id="drag-log" style="margin-top: 20px; border: 1px solid #ddd; padding: 10px; height: 200px; overflow-y: auto;">
    <h5>Drag Event Log</h5>
    <ul id="logList"></ul>
</div>

<script>
    var dragLog = [];
    
    function logEvent(eventType, details) {
        var timestamp = new Date().toLocaleTimeString();
        dragLog.push(`[${timestamp}] ${eventType}: ${details}`);
        
        var logList = document.getElementById('logList');
        logList.innerHTML = dragLog.map(log => `<li>${log}</li>`).join('');
        logList.parentElement.scrollTop = logList.parentElement.scrollHeight;
    }
    
    function onDragStart(args) {
        logEvent('dragStart', 'Panel: ' + args.element.id);
    }
    
    function onDrag(args) {
        logEvent('drag', 'Moving...');
    }
    
    function onDragStop(args) {
        var dashboardObj = document.getElementById('dashboard').ej2_instances[0];
        var panels = dashboardObj.serialize();
        var panel = panels.find(p => p.id === args.element.id);
        logEvent('dragStop', `Placed at Row: ${panel.row}, Col: ${panel.col}`);
    }
</script>
```

### Example 2: Prevent Dragging Specific Panels

```javascript
function onDragStart(args) {
    var panelId = args.element.id;
    var protectedPanels = ['header-panel', 'footer-panel'];
    
    if (protectedPanels.includes(panelId)) {
        args.cancel = true;
        console.log('Panel "' + panelId + '" is protected and cannot be dragged');
    }
}
```

### Example 3: Save Position After Drag

```javascript
function onDragStop(args) {
    var dashboardObj = document.getElementById('dashboard').ej2_instances[0];
    var panelState = dashboardObj.serialize();
    
    // Send to server
    fetch('/api/save-dashboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(panelState)
    }).then(response => {
        if (response.ok) {
            console.log('Dashboard layout saved successfully');
        }
    });
}
```

### Example 4: Visual Feedback During Drag

```javascript
function onDragStart(args) {
    args.element.style.opacity = '0.7';
    args.element.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
}

function onDragStop(args) {
    args.element.style.opacity = '1';
    args.element.style.boxShadow = 'none';
}
```

