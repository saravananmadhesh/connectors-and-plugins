# Resizing Panels

## Table of Contents
- [Overview](#overview)
- [Enabling Resize Functionality](#enabling-resize-functionality)
- [Configurable Resize Handles](#configurable-resize-handles)
- [Resize Event Lifecycle](#resize-event-lifecycle)
- [Handling Resize Events](#handling-resize-events)
- [Implementing Size Constraints](#implementing-size-constraints)
- [Event Binding Syntax](#event-binding-syntax)
- [Complete Resize Examples](#complete-resize-examples)

## Overview

The Dashboard Layout provides comprehensive panel resizing capabilities through the `allowResizing` property. Users can resize panels by dragging resize handles, and you can track resize operations through three exact lifecycle events: `resizeStart`, `resize`, and `resizeStop` (matching the API specification exactly). Resize functionality can be further customized with specific handle directions and size constraints.

## Enabling Resize Functionality

### Basic Resize Enablement

```html
<!-- Enable resizing -->
<ejs-dashboardlayout id="dashboard" allowResizing="true" columns="6">
    <e-dashboardlayout-panels>
        <e-dashboardlayout-panel id="panel1" sizeX="2" sizeY="1" row="0" col="0"
                                 header="<div>Resizable Panel</div>"
                                 content="<div>Drag resize handles to resize this panel</div>">
        </e-dashboardlayout-panel>
    </e-dashboardlayout-panels>
</ejs-dashboardlayout>

<!-- Disable resizing (default) -->
<ejs-dashboardlayout id="dashboard" allowResizing="false" columns="6">
    <e-dashboardlayout-panels>
        <!-- Panels cannot be resized -->
    </e-dashboardlayout-panels>
</ejs-dashboardlayout>
```

### Toggling Resize at Runtime

```html
<button id="toggleResizeBtn" class="btn btn-primary">Toggle Resizing</button>

<script>
    document.getElementById('toggleResizeBtn').addEventListener('click', function() {
        var dashboardObj = document.getElementById('dashboard').ej2_instances[0];
        var currentState = dashboardObj.allowResizing;
        
        dashboardObj.allowResizing = !currentState;
        console.log('Resizing is now ' + (dashboardObj.allowResizing ? 'enabled' : 'disabled'));
    });
</script>
```

## Configurable Resize Handles

The `resizableHandles` property defines which edges or corners can be used to resize panels.

### Handle Direction Options

```html
<!-- Resize from south-east corner only (default) -->
<ejs-dashboardlayout id="dashboard" 
                      allowResizing="true"
                      resizableHandles="@(new string[] { 'e-south-east' })"
                      columns="6">
    <!-- Resize handle only at bottom-right corner -->
</ejs-dashboardlayout>

<!-- Multiple resize handles -->
<ejs-dashboardlayout id="dashboard" 
                      allowResizing="true"
                      resizableHandles="@(new string[] { 'e-south-east', 'e-south', 'e-east' })"
                      columns="6">
    <!-- Resize from bottom-right, bottom, and right edges -->
</ejs-dashboardlayout>

<!-- All resize handles -->
<ejs-dashboardlayout id="dashboard" 
                      allowResizing="true"
                      resizableHandles="@(new string[] { 'e-south-east', 'e-south', 'e-south-west', 'e-east', 'e-west', 'e-north-east', 'e-north', 'e-north-west' })"
                      columns="6">
    <!-- Full resize capability from all edges -->
</ejs-dashboardlayout>
```

### Available Handle Directions

- `'e-south'` - Bottom edge
- `'e-north'` - Top edge
- `'e-east'` - Right edge
- `'e-west'` - Left edge
- `'e-south-east'` - Bottom-right corner (default)
- `'e-south-west'` - Bottom-left corner
- `'e-north-east'` - Top-right corner
- `'e-north-west'` - Top-left corner

### Handle Configuration in C# Model

```csharp
public class DashboardLayoutModel : PageModel
{
    public string[] DefaultHandles => new string[] { "e-south-east" };
    public string[] FlexibleHandles => new string[] { "e-south-east", "e-south", "e-east" };
    public string[] AllHandles => new string[] { 
        "e-south-east", "e-south", "e-south-west",
        "e-east", "e-west",
        "e-north-east", "e-north", "e-north-west"
    };

    public void OnGet()
    {
        // Use appropriate handles based on dashboard type
    }
}
```

In your view:

```html
<!-- Default: Corner resize only -->
<ejs-dashboardlayout resizableHandles="@Model.DefaultHandles">
    <!-- Panels -->
</ejs-dashboardlayout>

<!-- Flexible: Multiple edges -->
<ejs-dashboardlayout resizableHandles="@Model.FlexibleHandles">
    <!-- Panels -->
</ejs-dashboardlayout>

<!-- Maximum: All directions -->
<ejs-dashboardlayout resizableHandles="@Model.AllHandles">
    <!-- Panels -->
</ejs-dashboardlayout>
```

## Resize Event Lifecycle

The resize operation triggers three distinct events in sequence:

### Event Sequence

```
User clicks resize handle
       ↓
    resizeStart event
       ↓
User drags resize handle (resize continues)
       ↓
    resize event (fires repeatedly)
       ↓
User releases mouse/touch
       ↓
    resizeStop event
```

## Handling Resize Events

### Event Binding in TagHelper Syntax

```html
<ejs-dashboardlayout id="dashboard" 
                      columns="6"
                      allowResizing="true"
                      resizeStart="onResizeStart"
                      resize="onResize"
                      resizeStop="onResizeStop">
    <e-dashboardlayout-panels>
        <e-dashboardlayout-panel id="panel1" sizeX="2" sizeY="1" row="0" col="0"
                                 header="<div>Resizable Panel</div>"
                                 content="<div>Resize this panel</div>">
        </e-dashboardlayout-panel>
    </e-dashboardlayout-panels>
</ejs-dashboardlayout>

<script>
    function onResizeStart(args) {
        console.log('Resize started for panel:', args.element.id);
    }
    
    function onResize(args) {
        console.log('Panel being resized');
    }
    
    function onResizeStop(args) {
        console.log('Resize completed for panel:', args.element.id);
        console.log('New size - Width:', args.element.sizeX, 'Height:', args.element.sizeY);
    }
</script>
```

### resizeStart Event Details

```javascript
function onResizeStart(args) {
    // args.element - The panel element being resized
    // args.event - The mouse/touch event
    
    console.log('Panel ID:', args.element.id);
    console.log('Initial size:', args.element.sizeX, 'x', args.element.sizeY);
    
    // Get current panel configuration
    var dashboardObj = document.getElementById('dashboard').ej2_instances[0];
    var panels = dashboardObj.serialize();
    var currentPanel = panels.find(p => p.id === args.element.id);
    
    console.log('Constraints - Min:', currentPanel.minSizeX, 'x', currentPanel.minSizeY,
                'Max:', currentPanel.maxSizeX, 'x', currentPanel.maxSizeY);
}
```

### resize Event Details

```javascript
function onResize(args) {
    // This event fires continuously during resize
    // Can be used for real-time updates
    
    // Example: Update real-time size display
    var panelId = args.element.id;
    var newSize = args.element.sizeX + ' x ' + args.element.sizeY + ' cells';
    updateSizeIndicator(panelId, newSize);
}

function updateSizeIndicator(panelId, sizeText) {
    var indicator = document.getElementById(panelId + '-size');
    if (indicator) {
        indicator.textContent = sizeText;
    }
}
```

### resizeStop Event Details

```javascript
function onResizeStop(args) {
    // args.element - The panel that was resized
    // args.event - The mouse/touch event
    
    var panelId = args.element.id;
    var dashboardObj = document.getElementById('dashboard').ej2_instances[0];
    var panels = dashboardObj.serialize();
    var resizedPanel = panels.find(p => p.id === panelId);
    
    console.log('Resize completed for panel:', panelId);
    console.log('Final size:', resizedPanel.sizeX, 'x', resizedPanel.sizeY, 'cells');
    
    // Save dashboard state
    saveDashboardState();
}
```

## Implementing Size Constraints

Size constraints prevent panels from being resized beyond acceptable limits.

### Setting Min and Max Sizes

```javascript
var constrainedPanel = {
    'id': 'metrics-panel',
    'sizeX': 2,
    'sizeY': 1,
    'minSizeX': 1,           // Cannot be narrower than 1 cell
    'minSizeY': 1,           // Cannot be shorter than 1 cell
    'maxSizeX': 4,           // Cannot be wider than 4 cells
    'maxSizeY': 2,           // Cannot be taller than 2 cells
    'header': 'Constrained Panel'
};

var dashboardObj = document.getElementById('dashboard').ej2_instances[0];
dashboardObj.addPanel(constrainedPanel);
```

### Constraint Types by Panel Purpose

```javascript
var panelConstraints = {
    // Small metric cards - minimal size
    'metric': {
        'minSizeX': 1, 'minSizeY': 1,
        'maxSizeX': 2, 'maxSizeY': 1
    },
    
    // Chart panels - reasonable size range
    'chart': {
        'minSizeX': 2, 'minSizeY': 2,
        'maxSizeX': 6, 'maxSizeY': 4
    },
    
    // Table panels - larger minimum
    'table': {
        'minSizeX': 3, 'minSizeY': 2,
        'maxSizeX': 6, 'maxSizeY': 6
    },
    
    // Full-width panels
    'fullwidth': {
        'minSizeX': 6, 'minSizeY': 1,
        'maxSizeX': 6, 'maxSizeY': 3
    }
};

function addPanelWithConstraints(type, panelId) {
    var dashboardObj = document.getElementById('dashboard').ej2_instances[0];
    var constraints = panelConstraints[type] || panelConstraints['metric'];
    
    var panel = {
        'id': panelId,
        'sizeX': 2,
        'sizeY': 1,
        'header': 'Panel: ' + type,
        ...constraints
    };
    
    dashboardObj.addPanel(panel);
}
```

### Runtime Constraint Adjustment

```javascript
function updatePanelConstraints(panelId, minX, minY, maxX, maxY) {
    var dashboardObj = document.getElementById('dashboard').ej2_instances[0];
    var panels = dashboardObj.serialize();
    var panelToUpdate = panels.find(p => p.id === panelId);
    
    if (panelToUpdate) {
        panelToUpdate.minSizeX = minX;
        panelToUpdate.minSizeY = minY;
        panelToUpdate.maxSizeX = maxX;
        panelToUpdate.maxSizeY = maxY;
        
        dashboardObj.updatePanel(panelToUpdate);
    }
}

// Usage
updatePanelConstraints('sales-panel', 2, 1, 6, 3);
```

## Event Binding Syntax

### TagHelper Event Binding

In ASP.NET Core, use the `resizeStart`, `resize`, and `resizeStop` attributes:

```html
<ejs-dashboardlayout id="dashboard"
                      resizeStart="onResizeStart"
                      resize="onResize"
                      resizeStop="onResizeStop">
    <!-- panels -->
</ejs-dashboardlayout>

<script>
    function onResizeStart(args) { }
    function onResize(args) { }
    function onResizeStop(args) { }
</script>
```

### Runtime Event Binding

```javascript
var dashboardObj = document.getElementById('dashboard').ej2_instances[0];

// Bind resizeStart event
dashboardObj.resizeStart = function(args) {
    console.log('Resize started');
};

// Bind resize event
dashboardObj.resize = function(args) {
    console.log('Resizing');
};

// Bind resizeStop event
dashboardObj.resizeStop = function(args) {
    console.log('Resize stopped');
};
```

### Using addEventListener

```javascript
var dashboardObj = document.getElementById('dashboard').ej2_instances[0];

dashboardObj.addEventListener('resizeStart', function(args) {
    console.log('resizeStart event triggered');
});

dashboardObj.addEventListener('resize', function(args) {
    console.log('resize event triggered');
});

dashboardObj.addEventListener('resizeStop', function(args) {
    console.log('resizeStop event triggered');
});
```

## Complete Resize Examples

### Example 1: Resize with Visual Feedback

```html
<ejs-dashboardlayout id="dashboard" 
                      allowResizing="true"
                      columns="6"
                      resizeStart="onResizeStart"
                      resizeStop="onResizeStop">
    <e-dashboardlayout-panels>
        <e-dashboardlayout-panel id="panel1" sizeX="2" sizeY="1" row="0" col="0"
                                 header="<div>Resizable Panel</div>"
                                 content="<div id='panel1-size' style='text-align: center; color: #999;'>2 × 1 cells</div>">
        </e-dashboardlayout-panel>
    </e-dashboardlayout-panels>
</ejs-dashboardlayout>

<script>
    function onResizeStart(args) {
        args.element.style.opacity = '0.8';
        args.element.style.border = '2px dashed #007bff';
    }
    
    function onResizeStop(args) {
        args.element.style.opacity = '1';
        args.element.style.border = 'none';
        
        var dashboardObj = document.getElementById('dashboard').ej2_instances[0];
        var panels = dashboardObj.serialize();
        var panel = panels.find(p => p.id === args.element.id);
        
        var sizeDisplay = document.getElementById(panel.id + '-size');
        if (sizeDisplay) {
            sizeDisplay.textContent = panel.sizeX + ' × ' + panel.sizeY + ' cells';
        }
    }
</script>
```

### Example 2: Prevent Resizing Below Minimum

```javascript
function onResizeStart(args) {
    var dashboardObj = document.getElementById('dashboard').ej2_instances[0];
    var panels = dashboardObj.serialize();
    var currentPanel = panels.find(p => p.id === args.element.id);
    
    // Store original size
    args.element.originalSize = {
        sizeX: currentPanel.sizeX,
        sizeY: currentPanel.sizeY
    };
    
    console.log('Minimum size:', currentPanel.minSizeX, 'x', currentPanel.minSizeY);
    console.log('Maximum size:', currentPanel.maxSizeX, 'x', currentPanel.maxSizeY);
}
```

### Example 3: Responsive Resize Constraints

```javascript
function applyResponsiveConstraints() {
    var dashboardObj = document.getElementById('dashboard').ej2_instances[0];
    var width = window.innerWidth;
    var panels = dashboardObj.serialize();
    
    panels.forEach(function(panel) {
        var constraints;
        
        if (width < 768) {  // Mobile
            constraints = {
                minSizeX: 2, minSizeY: 1,
                maxSizeX: 2, maxSizeY: 2
            };
        } else if (width < 1024) {  // Tablet
            constraints = {
                minSizeX: 2, minSizeY: 1,
                maxSizeX: 4, maxSizeY: 3
            };
        } else {  // Desktop
            constraints = {
                minSizeX: 1, minSizeY: 1,
                maxSizeX: 6, maxSizeY: 4
            };
        }
        
        var updatedPanel = { ...panel, ...constraints };
        dashboardObj.updatePanel(updatedPanel);
    });
}

window.addEventListener('resize', applyResponsiveConstraints);
```

### Example 4: Lock Panel Size

```javascript
function lockPanelSize(panelId) {
    var dashboardObj = document.getElementById('dashboard').ej2_instances[0];
    var panels = dashboardObj.serialize();
    var panelToLock = panels.find(p => p.id === panelId);
    
    if (panelToLock) {
        // Set min/max to same as current size
        var lockedPanel = {
            ...panelToLock,
            minSizeX: panelToLock.sizeX,
            minSizeY: panelToLock.sizeY,
            maxSizeX: panelToLock.sizeX,
            maxSizeY: panelToLock.sizeY
        };
        
        dashboardObj.updatePanel(lockedPanel);
        console.log('Panel "' + panelId + '" is now locked at size ' + 
                   panelToLock.sizeX + ' x ' + panelToLock.sizeY);
    }
}

function unlockPanelSize(panelId) {
    var dashboardObj = document.getElementById('dashboard').ej2_instances[0];
    var panels = dashboardObj.serialize();
    var panelToUnlock = panels.find(p => p.id === panelId);
    
    if (panelToUnlock) {
        // Reset to default constraints
        var unlockedPanel = {
            ...panelToUnlock,
            minSizeX: 1,
            minSizeY: 1,
            maxSizeX: 6,
            maxSizeY: 6
        };
        
        dashboardObj.updatePanel(unlockedPanel);
        console.log('Panel "' + panelId + '" is now unlocked');
    }
}
```

