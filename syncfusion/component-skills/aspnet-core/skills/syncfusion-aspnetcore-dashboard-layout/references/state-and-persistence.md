# State and Persistence

## Table of Contents
- [Overview](#overview)
- [Component Lifecycle Events](#component-lifecycle-events)
- [Enabling Persistence](#enabling-persistence)
- [Serializing Dashboard State](#serializing-dashboard-state)
- [Restoring Dashboard State](#restoring-dashboard-state)
- [Managing State Programmatically](#managing-state-programmatically)
- [Persistence Implementation](#persistence-implementation)
- [Complete State Management Examples](#complete-state-management-examples)

## Overview

Dashboard Layout provides comprehensive state management through lifecycle events (`created`, `destroyed`) and persistent storage capabilities via the `enablePersistence` property. The `serialize()` method captures the entire dashboard configuration, while restoration patterns allow you to recover user layouts. Understanding these features enables building dashboards that remember user preferences across sessions.

## Component Lifecycle Events

The Dashboard Layout triggers two key lifecycle events:

### created Event

The `created` event fires after the Dashboard Layout component is fully initialized and ready for interaction.

```html
<!-- Bind created event -->
<ejs-dashboardlayout id="dashboard" 
                      columns="6"
                      created="onDashboardCreated">
    <e-dashboardlayout-panels>
        <e-dashboardlayout-panel id="panel1" sizeX="2" sizeY="1" row="0" col="0"
                                 header="<div>Panel 1</div>"
                                 content="<div>Content here</div>">
        </e-dashboardlayout-panel>
    </e-dashboardlayout-panels>
</ejs-dashboardlayout>

<script>
    function onDashboardCreated(args) {
        console.log('Dashboard Layout created successfully');
        console.log('Element:', args.element);
        
        // Component is now ready
        var dashboardObj = document.getElementById('dashboard').ej2_instances[0];
        console.log('Dashboard initialized with', dashboardObj.panels.length, 'panels');
    }
</script>
```

### destroyed Event

The `destroyed` event fires when the Dashboard Layout component is being destroyed or removed from the DOM.

```html
<ejs-dashboardlayout id="dashboard" 
                      columns="6"
                      destroyed="onDashboardDestroyed">
    <e-dashboardlayout-panels>
        <e-dashboardlayout-panel id="panel1" sizeX="2" sizeY="1" row="0" col="0"
                                 header="<div>Panel 1</div>"
                                 content="<div>Content here</div>">
        </e-dashboardlayout-panel>
    </e-dashboardlayout-panels>
</ejs-dashboardlayout>

<script>
    function onDashboardDestroyed(args) {
        console.log('Dashboard Layout is being destroyed');
        
        // Clean up resources
        saveDashboardState();
        clearEventListeners();
    }
    
    function saveDashboardState() {
        var dashboardObj = document.getElementById('dashboard').ej2_instances[0];
        var currentState = dashboardObj.serialize();
        localStorage.setItem('dashboard-state-backup', JSON.stringify(currentState));
        console.log('Dashboard state saved to storage');
    }
    
    function clearEventListeners() {
        console.log('Cleaning up event listeners');
    }
</script>
```

### Lifecycle Flow

```
Page Load
    ↓
Component Initialization Begins
    ↓
Panels Are Created
    ↓
created Event Fires
    ↓
Component Ready for Interaction
    ↓
(User Actions: drag, drop, resize, etc.)
    ↓
Navigation Away or Unload
    ↓
destroyed Event Fires
    ↓
Component Removed from DOM
```

### Practical Lifecycle Example

```html
<ejs-dashboardlayout id="dashboard" 
                      columns="6"
                      created="initializeDashboard"
                      destroyed="cleanupDashboard">
    <e-dashboardlayout-panels>
        <e-dashboardlayout-panel id="panel1" sizeX="2" sizeY="1" row="0" col="0"
                                 header="<div>Status</div>"
                                 content="<div id='status-content'>Initializing...</div>">
        </e-dashboardlayout-panel>
    </e-dashboardlayout-panels>
</ejs-dashboardlayout>

<script>
    var dashboardState = {
        isInitialized: false,
        dataLoadAttempts: 0,
        lastSaveTime: null
    };
    
    function initializeDashboard(args) {
        dashboardState.isInitialized = true;
        
        var dashboardObj = document.getElementById('dashboard').ej2_instances[0];
        document.getElementById('status-content').textContent = 'Dashboard Ready';
        
        // Load initial data
        loadDashboardData();
        
        // Set up auto-save
        setupAutoSave();
        
        console.log('Dashboard initialized at', new Date().toLocaleTimeString());
    }
    
    function cleanupDashboard(args) {
        dashboardState.isInitialized = false;
        
        // Save final state
        saveDashboardState();
        
        // Stop auto-save interval
        clearAutoSave();
        
        console.log('Dashboard cleaned up at', new Date().toLocaleTimeString());
    }
    
    function loadDashboardData() {
        console.log('Loading dashboard data...');
        // Fetch data from API
    }
    
    function setupAutoSave() {
        window.autoSaveInterval = setInterval(function() {
            saveDashboardState();
            dashboardState.lastSaveTime = new Date();
        }, 30000); // Save every 30 seconds
    }
    
    function clearAutoSave() {
        if (window.autoSaveInterval) {
            clearInterval(window.autoSaveInterval);
        }
    }
    
    function saveDashboardState() {
        var dashboardObj = document.getElementById('dashboard').ej2_instances[0];
        var state = dashboardObj.serialize();
        localStorage.setItem('dashboard-state', JSON.stringify(state));
    }
</script>
```

## Enabling Persistence

### Basic Persistence Setup

The `enablePersistence` property automatically saves and restores the dashboard layout:

```html
<!-- Enable persistence -->
<ejs-dashboardlayout id="dashboard" 
                      enablePersistence="true"
                      columns="6">
    <e-dashboardlayout-panels>
        <e-dashboardlayout-panel id="panel1" sizeX="2" sizeY="1" row="0" col="0"
                                 header="<div>Panel 1</div>"
                                 content="<div>Changes will be persisted</div>">
        </e-dashboardlayout-panel>
    </e-dashboardlayout-panels>
</ejs-dashboardlayout>

<script>
    document.addEventListener('DOMContentLoaded', function() {
        console.log('Dashboard will automatically persist its layout');
        // Layout changes are saved to browser storage
    });
</script>
```

### Persistence with localStorage

When `enablePersistence` is true, the component automatically uses browser localStorage:

```javascript
// Internally, the component stores state with key:
// 'dashboard' + component-id (e.g., 'dashboard')

// You can manually retrieve persisted state:
var persistedState = localStorage.getItem('dashboard');
if (persistedState) {
    console.log('Previous dashboard layout found:', JSON.parse(persistedState));
}
```

### Storage Location and Key Format

```javascript
function getPersistenceKey() {
    var dashboardObj = document.getElementById('dashboard').ej2_instances[0];
    // Persistence key is typically: 'dashboard' + element ID
    return 'dashboard' + dashboardObj.element.id;
}

function getPersistenceSize() {
    var persistenceKey = getPersistenceKey();
    var persistedData = localStorage.getItem(persistenceKey);
    
    if (persistedData) {
        var sizeInBytes = new Blob([persistedData]).size;
        console.log('Persisted state size:', sizeInBytes, 'bytes');
        return sizeInBytes;
    }
    return 0;
}
```

## Serializing Dashboard State

### serialize() Method

The `serialize()` method returns the complete dashboard configuration as an array of panel objects:

```javascript
var dashboardObj = document.getElementById('dashboard').ej2_instances[0];

// Get current state
var currentState = dashboardObj.serialize();

console.log('Dashboard state:', JSON.stringify(currentState, null, 2));

// Each panel object contains:
currentState.forEach(function(panel) {
    console.log('Panel ID:', panel.id);
    console.log('Position:', 'Row', panel.row, 'Col', panel.col);
    console.log('Size:', panel.sizeX, 'x', panel.sizeY);
    console.log('Enabled:', panel.enabled);
});
```

### Sample Serialized Output

```javascript
[
    {
        "id": "panel1",
        "row": 0,
        "col": 0,
        "sizeX": 2,
        "sizeY": 1,
        "header": "Revenue",
        "content": "<div>$125,000</div>",
        "enabled": true,
        "minSizeX": 1,
        "minSizeY": 1,
        "maxSizeX": 6,
        "maxSizeY": 4,
        "cssClass": "custom-panel"
    },
    {
        "id": "panel2",
        "row": 0,
        "col": 2,
        "sizeX": 2,
        "sizeY": 1,
        "header": "Orders",
        "content": "<div>1,234</div>",
        "enabled": true,
        "minSizeX": 1,
        "minSizeY": 1,
        "maxSizeX": 6,
        "maxSizeY": 4,
        "cssClass": ""
    }
]
```

### Practical Serialization Examples

```javascript
function exportDashboardLayout() {
    var dashboardObj = document.getElementById('dashboard').ej2_instances[0];
    var state = dashboardObj.serialize();
    
    // Convert to JSON string
    var jsonString = JSON.stringify(state, null, 2);
    
    // Create download
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(jsonString);
    var downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "dashboard-layout.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
}

function copyLayoutToClipboard() {
    var dashboardObj = document.getElementById('dashboard').ej2_instances[0];
    var state = dashboardObj.serialize();
    var jsonString = JSON.stringify(state);
    
    navigator.clipboard.writeText(jsonString).then(function() {
        console.log('Dashboard layout copied to clipboard');
    });
}

function emailDashboardState() {
    var dashboardObj = document.getElementById('dashboard').ej2_instances[0];
    var state = dashboardObj.serialize();
    
    // Send to server
    fetch('/api/dashboard/save-layout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            layoutName: 'Current Layout',
            layoutData: state,
            timestamp: new Date().toISOString()
        })
    })
    .then(function(response) {
        console.log('Layout saved successfully');
    });
}
```

## Restoring Dashboard State

### Restore from Serialized Data

```javascript
function restoreDashboardLayout(layoutData) {
    var dashboardObj = document.getElementById('dashboard').ej2_instances[0];
    
    // Clear existing panels
    dashboardObj.removeAll();
    
    // Add panels from saved state
    layoutData.forEach(function(panelConfig) {
        dashboardObj.addPanel(panelConfig);
    });
    
    console.log('Dashboard layout restored with', layoutData.length, 'panels');
}

// Usage
var savedLayout = JSON.parse(localStorage.getItem('dashboard-state'));
if (savedLayout) {
    restoreDashboardLayout(savedLayout);
}
```

### Conditional Restoration

```javascript
function restoreDashboardIfAvailable() {
    var dashboardObj = document.getElementById('dashboard').ej2_instances[0];
    var savedState = localStorage.getItem('saved-dashboard-layout');
    
    if (savedState) {
        try {
            var layoutData = JSON.parse(savedState);
            
            // Validate layout data
            if (Array.isArray(layoutData) && layoutData.length > 0) {
                dashboardObj.removeAll();
                layoutData.forEach(function(panel) {
                    dashboardObj.addPanel(panel);
                });
                console.log('Previous layout restored');
                return true;
            }
        } catch (error) {
            console.error('Failed to restore layout:', error);
        }
    }
    
    console.log('Using default layout');
    return false;
}
```

## Managing State Programmatically

### Save State on User Actions

```html
<ejs-dashboardlayout id="dashboard"
                      change="onDashboardChange">
    <e-dashboardlayout-panels>
        <e-dashboardlayout-panel id="panel1" sizeX="2" sizeY="1" row="0" col="0"
                                 header="<div>Panel</div>"
                                 content="<div>Content</div>">
        </e-dashboardlayout-panel>
    </e-dashboardlayout-panels>
</ejs-dashboardlayout>

<script>
    function onDashboardChange(args) {
        // This fires whenever layout changes (drag, drop, resize)
        saveDashboardState();
    }
    
    function saveDashboardState() {
        var dashboardObj = document.getElementById('dashboard').ej2_instances[0];
        var state = dashboardObj.serialize();
        
        // Save to localStorage
        localStorage.setItem('dashboard-auto-save', JSON.stringify(state));
        
        // Save to server
        saveToServer(state);
    }
    
    function saveToServer(state) {
        fetch('/api/dashboard/state', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(state)
        })
        .then(function(response) { console.log('Saved to server'); })
        .catch(function(error) { console.error('Server save failed:', error); });
    }
</script>
```

### State History Management

```javascript
var dashboardHistory = {
    states: [],
    currentIndex: -1,
    
    saveState: function() {
        var dashboardObj = document.getElementById('dashboard').ej2_instances[0];
        var state = dashboardObj.serialize();
        
        // Remove any states after current index (for branching)
        this.states = this.states.slice(0, this.currentIndex + 1);
        
        // Add new state
        this.states.push(JSON.parse(JSON.stringify(state)));
        this.currentIndex++;
        
        // Limit history to 50 states
        if (this.states.length > 50) {
            this.states.shift();
            this.currentIndex--;
        }
    },
    
    undo: function() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.restoreState(this.states[this.currentIndex]);
        }
    },
    
    redo: function() {
        if (this.currentIndex < this.states.length - 1) {
            this.currentIndex++;
            this.restoreState(this.states[this.currentIndex]);
        }
    },
    
    restoreState: function(state) {
        var dashboardObj = document.getElementById('dashboard').ej2_instances[0];
        dashboardObj.removeAll();
        state.forEach(function(panel) {
            dashboardObj.addPanel(panel);
        });
    }
};

// Usage
document.getElementById('undoBtn').addEventListener('click', function() {
    dashboardHistory.undo();
});

document.getElementById('redoBtn').addEventListener('click', function() {
    dashboardHistory.redo();
});
```

## Persistence Implementation

### Server-Side Persistence (C#)

```csharp
public class DashboardStateController : Controller
{
    private readonly IUserService _userService;
    
    public DashboardStateController(IUserService userService)
    {
        _userService = userService;
    }
    
    [HttpGet("api/dashboard/state")]
    public async Task<IActionResult> GetDashboardState()
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        var userState = await _userService.GetDashboardStateAsync(userId);
        
        return Ok(userState);
    }
    
    [HttpPost("api/dashboard/state")]
    public async Task<IActionResult> SaveDashboardState([FromBody] DashboardStateDto state)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        await _userService.SaveDashboardStateAsync(userId, state);
        
        return Ok(new { message = "Dashboard state saved" });
    }
}

public class DashboardStateDto
{
    public string Id { get; set; }
    public int Row { get; set; }
    public int Col { get; set; }
    public int SizeX { get; set; }
    public int SizeY { get; set; }
    public string Header { get; set; }
    public string Content { get; set; }
    public bool Enabled { get; set; }
}
```

### Load Persisted State on Page Load

```html
<ejs-dashboardlayout id="dashboard" 
                      columns="6"
                      created="loadPersistentState">
    <e-dashboardlayout-panels>
        <!-- Placeholder panels, will be replaced by loaded state -->
    </e-dashboardlayout-panels>
</ejs-dashboardlayout>

<script>
    async function loadPersistentState(args) {
        var dashboardObj = document.getElementById('dashboard').ej2_instances[0];
        
        try {
            // Try to load from server
            var response = await fetch('/api/dashboard/state');
            var savedState = await response.json();
            
            if (savedState && Array.isArray(savedState)) {
                dashboardObj.removeAll();
                savedState.forEach(function(panel) {
                    dashboardObj.addPanel(panel);
                });
                console.log('Dashboard restored from server');
            }
        } catch (error) {
            console.error('Failed to load dashboard state:', error);
            
            // Fall back to localStorage
            var localState = localStorage.getItem('dashboard-state');
            if (localState) {
                var panels = JSON.parse(localState);
                dashboardObj.removeAll();
                panels.forEach(function(panel) {
                    dashboardObj.addPanel(panel);
                });
                console.log('Dashboard restored from localStorage');
            }
        }
    }
</script>
```

## Complete State Management Examples

### Example 1: Full Lifecycle Management

```html
<div class="controls mb-3">
    <button class="btn btn-primary" onclick="saveDashboardState()">Save</button>
    <button class="btn btn-warning" onclick="resetDashboard()">Reset</button>
    <button class="btn btn-info" onclick="exportLayout()">Export</button>
</div>

<ejs-dashboardlayout id="dashboard"
                      enablePersistence="true"
                      columns="6"
                      created="onDashboardCreated"
                      destroyed="onDashboardDestroyed"
                      change="onDashboardChange">
    <e-dashboardlayout-panels>
        <e-dashboardlayout-panel id="panel1" sizeX="2" sizeY="1" row="0" col="0"
                                 header="<div>KPI 1</div>"
                                 content="<div>Value 1</div>">
        </e-dashboardlayout-panel>
        <e-dashboardlayout-panel id="panel2" sizeX="2" sizeY="1" row="0" col="2"
                                 header="<div>KPI 2</div>"
                                 content="<div>Value 2</div>">
        </e-dashboardlayout-panel>
    </e-dashboardlayout-panels>
</ejs-dashboardlayout>

<script>
    var stateManager = {
        lastSaveTime: null,
        changeCount: 0
    };
    
    function onDashboardCreated(args) {
        console.log('Dashboard created');
        stateManager.lastSaveTime = new Date();
    }
    
    function onDashboardDestroyed(args) {
        console.log('Dashboard destroyed - saving final state');
        saveDashboardState();
    }
    
    function onDashboardChange(args) {
        stateManager.changeCount++;
        console.log('Dashboard changed - change count:', stateManager.changeCount);
    }
    
    function saveDashboardState() {
        var dashboardObj = document.getElementById('dashboard').ej2_instances[0];
        var state = dashboardObj.serialize();
        localStorage.setItem('dashboard-state', JSON.stringify(state));
        stateManager.lastSaveTime = new Date();
        console.log('State saved at', stateManager.lastSaveTime.toLocaleTimeString());
    }
    
    function resetDashboard() {
        var dashboardObj = document.getElementById('dashboard').ej2_instances[0];
        dashboardObj.removeAll();
        dashboardObj.destroy();
        stateManager.changeCount = 0;
        localStorage.removeItem('dashboard-state');
        location.reload();
    }
    
    function exportLayout() {
        var dashboardObj = document.getElementById('dashboard').ej2_instances[0];
        var state = dashboardObj.serialize();
        var json = JSON.stringify(state, null, 2);
        
        var blob = new Blob([json], { type: 'application/json' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'dashboard-layout-' + new Date().getTime() + '.json';
        a.click();
    }
</script>
```

### Example 2: Multi-User Dashboard Persistence

```html
<ejs-dashboardlayout id="dashboard"
                      created="initializeUserDashboard">
    <e-dashboardlayout-panels>
        <e-dashboardlayout-panel id="panel1" sizeX="2" sizeY="1" row="0" col="0"
                                 header="<div>Panel</div>"
                                 content="<div>Shared content</div>">
        </e-dashboardlayout-panel>
    </e-dashboardlayout-panels>
</ejs-dashboardlayout>

<script>
    async function initializeUserDashboard(args) {
        var dashboardObj = document.getElementById('dashboard').ej2_instances[0];
        var userId = getCurrentUserId();
        
        try {
            // Load user-specific layout
            var response = await fetch('/api/users/' + userId + '/dashboard-layout');
            var userLayout = await response.json();
            
            if (userLayout && userLayout.panels) {
                dashboardObj.removeAll();
                userLayout.panels.forEach(function(panel) {
                    dashboardObj.addPanel(panel);
                });
            }
        } catch (error) {
            console.error('Error loading user dashboard:', error);
        }
        
        // Set up auto-save
        setInterval(function() {
            saveUserDashboard(userId);
        }, 30000);
    }
    
    function saveUserDashboard(userId) {
        var dashboardObj = document.getElementById('dashboard').ej2_instances[0];
        var state = dashboardObj.serialize();
        
        fetch('/api/users/' + userId + '/dashboard-layout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ panels: state })
        });
    }
    
    function getCurrentUserId() {
        // Get from auth token or cookie
        return document.body.dataset.userId;
    }
</script>
```

