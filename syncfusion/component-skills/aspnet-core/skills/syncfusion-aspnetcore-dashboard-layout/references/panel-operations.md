# Panel Operations and Management

## Table of Contents
- [Overview](#overview)
- [Adding Panels Dynamically](#adding-panels-dynamically)
- [Removing Panels](#removing-panels)
- [Moving Panels](#moving-panels)
- [Updating Panels](#updating-panels)
- [Resizing Panels](#resizing-panels)
- [Panel Sizing Constraints](#panel-sizing-constraints)
- [Working with Panel Properties](#working-with-panel-properties)
- [Practical Examples](#practical-examples)

## Overview

The Dashboard Layout provides several methods for dynamic panel management, allowing you to add, remove, move, update, and resize panels programmatically after the dashboard is initialized. These operations enable responsive dashboard customization based on user interactions or application state changes.

## Adding Panels Dynamically

The `addPanel` method allows you to add new panels to the dashboard after initialization. This is useful for adding widgets based on user preferences, loading saved dashboard configurations, or creating data-driven dashboards.

### Basic Panel Addition

```html
<!-- HTML with Dashboard Layout -->
<ejs-dashboardlayout id="dashboard" columns="6">
    <e-dashboardlayout-panels>
        <e-dashboardlayout-panel id="existing-panel" sizeX="2" sizeY="1" row="0" col="0"
                                 header="<div>Existing Panel</div>"
                                 content="<div>This panel exists on page load</div>">
        </e-dashboardlayout-panel>
    </e-dashboardlayout-panels>
</ejs-dashboardlayout>

<!-- Button to add a new panel -->
<button id="addPanelBtn" class="btn btn-primary">Add New Panel</button>

<script>
    document.getElementById('addPanelBtn').addEventListener('click', function() {
        var dashboardObj = document.getElementById('dashboard').ej2_instances[0];
        
        var newPanel = {
            'id': 'new-panel-' + Date.now(),
            'sizeX': 2,
            'sizeY': 1,
            'row': 0,
            'col': 2,
            'header': 'Dynamically Added Panel',
            'content': 'This panel was added programmatically'
        };
        
        dashboardObj.addPanel(newPanel);
    });
</script>
```

### Panel Object Structure

When adding a panel, provide an object with these properties:

```javascript
var panelConfig = {
    'id': 'unique-panel-id',                    // Required: Unique identifier
    'sizeX': 2,                                  // Required: Width in cells
    'sizeY': 1,                                  // Required: Height in cells
    'row': 0,                                    // Optional: Starting row
    'col': 0,                                    // Optional: Starting column
    'header': 'Panel Header Text',               // Optional: Header content
    'content': 'HTML or text content',           // Optional: Panel content
    'cssClass': 'custom-class',                  // Optional: CSS class name
    'minSizeX': 1,                               // Optional: Minimum width
    'minSizeY': 1,                               // Optional: Minimum height
    'maxSizeX': 6,                               // Optional: Maximum width
    'maxSizeY': 3                                // Optional: Maximum height
};
```

### Adding Multiple Panels

```javascript
function addMultiplePanels() {
    var dashboardObj = document.getElementById('dashboard').ej2_instances[0];
    
    var panels = [
        {
            'id': 'sales-panel',
            'sizeX': 3,
            'sizeY': 2,
            'header': 'Sales Metrics',
            'content': '<h4>$2.5M</h4><p>Total Sales</p>'
        },
        {
            'id': 'revenue-panel',
            'sizeX': 3,
            'sizeY': 2,
            'header': 'Revenue Report',
            'content': '<h4>$1.8M</h4><p>YTD Revenue</p>'
        },
        {
            'id': 'growth-panel',
            'sizeX': 2,
            'sizeY': 1,
            'header': 'Growth Rate',
            'content': '<h4>+12.5%</h4><p>YoY Growth</p>'
        }
    ];
    
    panels.forEach(function(panel) {
        dashboardObj.addPanel(panel);
    });
}
```

### Loading Panels from Server

```csharp
// In your Razor page handler
public JsonResult OnGetLoadPanels(string dashboardType)
{
    var panels = dashboardType switch
    {
        "sales" => new object[]
        {
            new { id = "sales-1", sizeX = 2, sizeY = 1, header = "Sales Panel 1" },
            new { id = "sales-2", sizeX = 2, sizeY = 1, header = "Sales Panel 2" }
        },
        "analytics" => new object[]
        {
            new { id = "analytics-1", sizeX = 3, sizeY = 2, header = "Analytics Panel 1" },
            new { id = "analytics-2", sizeX = 3, sizeY = 2, header = "Analytics Panel 2" }
        },
        _ => Array.Empty<object>()
    };
    
    return new JsonResult(panels);
}
```

```javascript
fetch('/dashboard/loadpanels?dashboardType=sales')
    .then(response => response.json())
    .then(panels => {
        var dashboardObj = document.getElementById('dashboard').ej2_instances[0];
        panels.forEach(function(panel) {
            dashboardObj.addPanel(panel);
        });
    });
```

## Removing Panels

The `removePanel` method removes a specific panel by its ID, while `removeAll` clears all panels from the dashboard.

### Removing Individual Panels

```html
<button id="removePanelBtn" class="btn btn-danger">Remove Panel</button>

<script>
    document.getElementById('removePanelBtn').addEventListener('click', function() {
        var dashboardObj = document.getElementById('dashboard').ej2_instances[0];
        
        // Remove panel by ID
        dashboardObj.removePanel('existing-panel');
    });
</script>
```

### Removing All Panels

```javascript
function clearAllPanels() {
    var dashboardObj = document.getElementById('dashboard').ej2_instances[0];
    dashboardObj.removeAll();
}
```

### Conditional Panel Removal

```javascript
function removePanelIf(condition) {
    var dashboardObj = document.getElementById('dashboard').ej2_instances[0];
    var panelIds = ['panel-1', 'panel-2', 'panel-3'];
    
    panelIds.forEach(function(id) {
        if (condition(id)) {
            dashboardObj.removePanel(id);
        }
    });
}

// Usage: Remove panels with "temp" in the ID
removePanelIf(id => id.includes('temp'));
```

## Moving Panels

The `movePanel` method repositions a panel to a new location in the grid by specifying its row and column.

### Basic Panel Movement

```html
<button id="movePanelBtn" class="btn btn-info">Move Panel</button>

<script>
    document.getElementById('movePanelBtn').addEventListener('click', function() {
        var dashboardObj = document.getElementById('dashboard').ej2_instances[0];
        
        // Move panel 'sales-panel' to row 2, column 3
        dashboardObj.movePanel('sales-panel', 2, 3);
    });
</script>
```

### Moving Based on User Interaction

```javascript
// Move to top-left when button clicked
document.getElementById('moveTopLeft').addEventListener('click', function() {
    var dashboardObj = document.getElementById('dashboard').ej2_instances[0];
    dashboardObj.movePanel('panel-id', 0, 0);
});

// Move to top-right
document.getElementById('moveTopRight').addEventListener('click', function() {
    var dashboardObj = document.getElementById('dashboard').ej2_instances[0];
    dashboardObj.movePanel('panel-id', 0, 4);  // Assuming 6-column layout
});

// Move to center
document.getElementById('moveCenter').addEventListener('click', function() {
    var dashboardObj = document.getElementById('dashboard').ej2_instances[0];
    dashboardObj.movePanel('panel-id', 2, 2);
});
```

## Updating Panels

The `updatePanel` method modifies an existing panel's properties such as header, content, size, or styling.

### Updating Panel Properties

```javascript
function updatePanelContent() {
    var dashboardObj = document.getElementById('dashboard').ej2_instances[0];
    
    var updatedPanel = {
        'id': 'sales-panel',
        'header': 'Updated Sales Metrics',
        'content': '<h4>$3.2M</h4><p>Total Sales Updated</p>',
        'sizeX': 3,
        'sizeY': 2
    };
    
    dashboardObj.updatePanel(updatedPanel);
}
```

### Updating Panel Header Dynamically

```javascript
function updatePanelHeader(panelId, newHeader) {
    var dashboardObj = document.getElementById('dashboard').ej2_instances[0];
    
    var panelUpdate = {
        'id': panelId,
        'header': newHeader
    };
    
    dashboardObj.updatePanel(panelUpdate);
}

// Usage
updatePanelHeader('sales-panel', 'Sales Report - Last Updated: ' + new Date().toLocaleString());
```

### Updating with Server Data

```javascript
async function updatePanelFromServer(panelId) {
    try {
        const response = await fetch(`/api/panel-data/${panelId}`);
        const data = await response.json();
        
        var dashboardObj = document.getElementById('dashboard').ej2_instances[0];
        
        var panelUpdate = {
            'id': panelId,
            'header': data.header,
            'content': data.htmlContent,
            'sizeX': data.width,
            'sizeY': data.height
        };
        
        dashboardObj.updatePanel(panelUpdate);
    } catch (error) {
        console.error('Error updating panel:', error);
    }
}
```

## Resizing Panels

The `resizePanel` method changes a panel's size by specifying new sizeX and sizeY values.

### Basic Panel Resizing

```html
<button id="expandPanelBtn" class="btn btn-secondary">Expand Panel</button>
<button id="shrinkPanelBtn" class="btn btn-secondary">Shrink Panel</button>

<script>
    document.getElementById('expandPanelBtn').addEventListener('click', function() {
        var dashboardObj = document.getElementById('dashboard').ej2_instances[0];
        
        // Expand panel to 4x2 cells
        dashboardObj.resizePanel('sales-panel', 4, 2);
    });
    
    document.getElementById('shrinkPanelBtn').addEventListener('click', function() {
        var dashboardObj = document.getElementById('dashboard').ej2_instances[0];
        
        // Shrink panel to 2x1 cells
        dashboardObj.resizePanel('sales-panel', 2, 1);
    });
</script>
```

### Preset Resize Options

```javascript
var resizePresets = {
    'small': { width: 2, height: 1 },
    'medium': { width: 3, height: 2 },
    'large': { width: 4, height: 2 },
    'fullWidth': { width: 6, height: 2 }
};

function resizePanelToPreset(panelId, preset) {
    var dashboardObj = document.getElementById('dashboard').ej2_instances[0];
    var size = resizePresets[preset];
    
    if (size) {
        dashboardObj.resizePanel(panelId, size.width, size.height);
    }
}

// Usage
resizePanelToPreset('sales-panel', 'medium');
```

## Panel Sizing Constraints

When adding or updating panels, you can set minimum and maximum size constraints to prevent panels from becoming too small or too large.

### Setting Size Constraints

```javascript
var constrainedPanel = {
    'id': 'flexible-panel',
    'sizeX': 2,
    'sizeY': 1,
    'minSizeX': 1,           // Minimum width: 1 cell
    'minSizeY': 1,           // Minimum height: 1 cell
    'maxSizeX': 4,           // Maximum width: 4 cells
    'maxSizeY': 3,           // Maximum height: 3 cells
    'header': 'Flexible Panel',
    'content': 'Can be resized between constraints'
};

var dashboardObj = document.getElementById('dashboard').ej2_instances[0];
dashboardObj.addPanel(constrainedPanel);
```

### Size Constraint Best Practices

```javascript
var panelConstraints = {
    'metric': {
        'minSizeX': 1, 'minSizeY': 1,
        'maxSizeX': 2, 'maxSizeY': 1
    },
    'chart': {
        'minSizeX': 2, 'minSizeY': 2,
        'maxSizeX': 6, 'maxSizeY': 4
    },
    'table': {
        'minSizeX': 3, 'minSizeY': 2,
        'maxSizeX': 6, 'maxSizeY': 6
    }
};

function addConstrainedPanel(panelType, panelId) {
    var dashboardObj = document.getElementById('dashboard').ej2_instances[0];
    var constraints = panelConstraints[panelType];
    
    var panel = {
        'id': panelId,
        'sizeX': 2,
        'sizeY': 1,
        'header': 'Panel: ' + panelType,
        ...constraints
    };
    
    dashboardObj.addPanel(panel);
}
```

## Working with Panel Properties

### Accessing Panel Information

```javascript
function getPanelInfo(panelId) {
    var dashboardObj = document.getElementById('dashboard').ej2_instances[0];
    
    // Get all panels
    var allPanels = dashboardObj.serialize();
    
    // Find specific panel
    var panel = allPanels.find(p => p.id === panelId);
    
    if (panel) {
        console.log('Panel ID:', panel.id);
        console.log('Position:', 'Row ' + panel.row + ', Col ' + panel.col);
        console.log('Size:', panel.sizeX + ' x ' + panel.sizeY + ' cells');
        console.log('Header:', panel.header);
    }
}
```

### Serializing Dashboard State

```javascript
function saveDashboardState() {
    var dashboardObj = document.getElementById('dashboard').ej2_instances[0];
    var panelsState = dashboardObj.serialize();
    
    // Convert to JSON for storage
    var stateJson = JSON.stringify(panelsState);
    
    // Save to local storage or send to server
    localStorage.setItem('dashboardState', stateJson);
    
    return stateJson;
}
```

### Restoring Dashboard State

```javascript
function restoreDashboardState() {
    var dashboardObj = document.getElementById('dashboard').ej2_instances[0];
    var stateJson = localStorage.getItem('dashboardState');
    
    if (stateJson) {
        var panelsState = JSON.parse(stateJson);
        
        // Clear existing panels
        dashboardObj.removeAll();
        
        // Restore saved panels
        panelsState.forEach(function(panelConfig) {
            dashboardObj.addPanel(panelConfig);
        });
    }
}
```

## Practical Examples

### Example 1: Panel Preset Manager

```javascript
class PanelPresetManager {
    constructor(dashboardId) {
        this.dashboard = document.getElementById(dashboardId).ej2_instances[0];
        this.presets = {
            'sales': [
                { id: 'sales-kpi', sizeX: 2, sizeY: 1, header: 'Total Sales' },
                { id: 'sales-chart', sizeX: 4, sizeY: 2, header: 'Sales Trend' }
            ],
            'analytics': [
                { id: 'visitors', sizeX: 2, sizeY: 1, header: 'Visitors' },
                { id: 'engagement', sizeX: 2, sizeY: 1, header: 'Engagement' },
                { id: 'traffic-chart', sizeX: 6, sizeY: 2, header: 'Traffic' }
            ]
        };
    }
    
    loadPreset(presetName) {
        this.dashboard.removeAll();
        
        if (this.presets[presetName]) {
            this.presets[presetName].forEach(panel => {
                this.dashboard.addPanel(panel);
            });
        }
    }
    
    addCustomPreset(name, panels) {
        this.presets[name] = panels;
    }
}

// Usage
var manager = new PanelPresetManager('dashboard');
manager.loadPreset('sales');
```

### Example 2: Responsive Panel Adjuster

```javascript
function adjustPanelsForScreenSize() {
    var dashboardObj = document.getElementById('dashboard').ej2_instances[0];
    var width = window.innerWidth;
    
    // Get all current panels
    var panels = dashboardObj.serialize();
    
    // Adjust based on screen width
    panels.forEach(function(panel) {
        if (width < 768) {  // Mobile
            dashboardObj.resizePanel(panel.id, 2, panel.sizeY);
        } else if (width < 1024) {  // Tablet
            dashboardObj.resizePanel(panel.id, 3, panel.sizeY);
        } else {  // Desktop
            dashboardObj.resizePanel(panel.id, panel.sizeX, panel.sizeY);
        }
    });
}

window.addEventListener('resize', adjustPanelsForScreenSize);
```

### Example 3: Undo/Redo Functionality

```javascript
class DashboardHistory {
    constructor(dashboardId) {
        this.dashboard = document.getElementById(dashboardId).ej2_instances[0];
        this.history = [this.getCurrentState()];
        this.currentIndex = 0;
    }
    
    getCurrentState() {
        return JSON.stringify(this.dashboard.serialize());
    }
    
    recordChange() {
        // Remove any redo states
        this.history = this.history.slice(0, this.currentIndex + 1);
        this.history.push(this.getCurrentState());
        this.currentIndex++;
    }
    
    undo() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.restoreState(this.history[this.currentIndex]);
        }
    }
    
    redo() {
        if (this.currentIndex < this.history.length - 1) {
            this.currentIndex++;
            this.restoreState(this.history[this.currentIndex]);
        }
    }
    
    restoreState(stateJson) {
        var state = JSON.parse(stateJson);
        this.dashboard.removeAll();
        state.forEach(panel => this.dashboard.addPanel(panel));
    }
}

// Usage
var history = new DashboardHistory('dashboard');

// After each panel operation
history.recordChange();

// Undo
history.undo();

// Redo
history.redo();
```

