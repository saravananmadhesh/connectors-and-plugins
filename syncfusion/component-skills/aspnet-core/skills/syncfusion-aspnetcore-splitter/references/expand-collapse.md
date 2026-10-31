# Expand and Collapse

## Table of Contents
- [Collapsible Pane Configuration](#collapsible-pane-configuration)
  - [Enable Collapse Button](#enable-collapse-button)
  - [Multiple Collapsible Panes](#multiple-collapsible-panes)
- [Programmatic Expand and Collapse](#programmatic-expand-and-collapse)
  - [Using collapse() and expand() Methods](#using-collapse-and-expand-methods)
  - [Example: Collapse on Button Click](#example-collapse-on-button-click)
- [Add and Remove Panes Dynamically](#add-and-remove-panes-dynamically)
  - [Adding Panes Dynamically](#adding-panes-dynamically)
  - [Removing Panes Dynamically](#removing-panes-dynamically)
  - [Practical Example: Dynamic Panel Management](#practical-example-dynamic-panel-management)
- [Initial Collapsed State](#initial-collapsed-state)
  - [Collapsed on Load](#collapsed-on-load)
  - [Conditional Collapsed State (Based on Device)](#conditional-collapsed-state-based-on-device)
- [Collapse and Expand Events](#collapse-and-expand-events)
- [Practical Examples](#practical-examples)
  - [Example 1: IDE Layout with Collapsible Panels](#example-1-ide-layout-with-collapsible-panels)
  - [Example 2: Dashboard with Toggle Features](#example-2-dashboard-with-toggle-features)
  - [Example 3: Save/Restore Collapse State](#example-3-saverestore-collapse-state)
- [Best Practices](#best-practices)

## Collapsible Pane Configuration

Enable the collapsible feature to show expand/collapse buttons on panes. This allows users to temporarily hide panes to maximize workspace.

### Enable Collapse Button

```csharp
<ejs-splitter id="splitter" height="400px">
    <e-splitter-panes>
        <!-- Left pane: collapsible with expand/collapse button -->
        <e-splitter-pane size="25%" collapsible="true" content="<div class='content'><h3>Navigation</h3><ul><li>Home</li><li>About</li><li>Services</li></ul></div>"></e-splitter-pane>
        
        <!-- Right pane: main content area -->
        <e-splitter-pane size="75%" content="<div class='content'><h3>Main Content</h3><p>Content details appear here.</p></div>"></e-splitter-pane>
    </e-splitter-panes>
</ejs-splitter>
```

**What the collapse button does:**
- Clicking arrow button in separator collapses/expands pane
- Collapsed pane is hidden completely (0 height/width)
- Remaining panes expand to fill space
- Clicking again restores original size

### Multiple Collapsible Panes

```csharp
<ejs-splitter id="splitter" height="500px" orientation="Vertical">
    <!-- Header: collapsible -->
    <e-splitter-pane size="15%" collapsible="true" content="<div class='content'><h3>Toolbar</h3></div>"></e-splitter-pane>
    
    <!-- Main area with sidebar -->
    <e-splitter-pane size="70%" content="<div class='content'>Main area with sidebar</div>"></e-splitter-pane>
    
    <!-- Footer: collapsible -->
    <e-splitter-pane size="15%" collapsible="true" content="<div class='content'><h3>Output</h3></div>"></e-splitter-pane>
</ejs-splitter>
```

**Design guideline:**
- Make sidebar/navigation panels collapsible
- Keep main content area non-collapsible
- Optional: make footer/details panel collapsible

## Programmatic Expand and Collapse

Control collapse/expand behavior using JavaScript methods in response to user actions or application state.

### Using collapse() and expand() Methods

```csharp
<ejs-splitter id="splitter" height="400px">
    <e-splitter-panes>
        <e-splitter-pane size="30%" collapsible="true" content="<div class='content'><h3>Navigation Panel</h3><p>This panel can be collapsed programmatically.</p></div>"></e-splitter-pane>
        <e-splitter-pane size="70%" content="<div class='content'><h3>Main Content</h3></div>"></e-splitter-pane>
    </e-splitter-panes>
</ejs-splitter>

<!-- Control buttons -->
<div style="margin-top: 20px;">
    <button class="e-btn" onclick="collapsePane()">Collapse Panel</button>
    <button class="e-btn" onclick="expandPane()">Expand Panel</button>
    <button class="e-btn" onclick="togglePane()">Toggle Panel</button>
</div>

<script>
    var splitterObj;
    
    document.addEventListener('DOMContentLoaded', function() {
        splitterObj = document.getElementById('splitter').ej2_instances[0];
    });
    
    function collapsePane() {
        // Collapse first pane (index 0)
        splitterObj.collapse(0);
    }
    
    function expandPane() {
        // Expand first pane (index 0)
        splitterObj.expand(0);
    }
    
    function togglePane() {
        var paneIndex = 0;
        var panes = splitterObj.paneSettings;
        
        if (panes[paneIndex].collapsed) {
            splitterObj.expand(paneIndex);
        } else {
            splitterObj.collapse(paneIndex);
        }
    }
</script>
```

**Method syntax:**
- `splitterObj.collapse(paneIndex)` - Collapse pane at index
- `splitterObj.expand(paneIndex)` - Expand pane at index
- `paneIndex` - 0-based index of pane (0 = first, 1 = second, etc.)

### Example: Collapse on Button Click

```csharp
<button onclick="document.getElementById('splitter').ej2_instances[0].collapse(0)" class="e-btn">
    Hide Sidebar
</button>

<script>
    function toggleSidebar() {
        var splitter = document.getElementById('splitter').ej2_instances[0];
        var paneIndex = 0;
        var pane = splitter.paneSettings[paneIndex];
        
        if (pane.collapsed) {
            splitter.expand(paneIndex);
        } else {
            splitter.collapse(paneIndex);
        }
    }
</script>
```

## Add and Remove Panes Dynamically

Create or remove panes at runtime using the `addPane()` and `removePane()` methods. This enables dynamic panel management based on user interactions or application state.

### Adding Panes Dynamically

Use the `addPane()` method to insert new panes into the splitter at runtime.

```csharp
<div>
    <ejs-splitter id="splitter" height="200px" width="600px">
        <e-splitter-panes>
            <e-splitter-pane size="190px" content="<div class='content'>Pane 1</div>"></e-splitter-pane>
            <e-splitter-pane size="190px" content="<div class='content'>Pane 2</div>"></e-splitter-pane>
        </e-splitter-panes>
    </ejs-splitter>
    <button id="addPane" class="e-btn" onclick="onAddPane()">Add Pane</button>
</div>

<style>
    .content {
        padding: 9px;
    }

    #addPane {
        margin-top: 15px;
    }
</style>

<script type="text/javascript">
    function onAddPane() {
        var splitterObj = document.getElementById('splitter').ej2_instances[0];
        var newPaneDetails = {
            size: '190px',
            content: '<div class="content">New Pane</div>',
            min: '30px',
            max: '250px',
        }
        // Add pane at position 1 (between first and second pane)
        splitterObj.addPane(newPaneDetails, 1);
    }
</script>
```

**addPane() syntax:**
- `splitterObj.addPane(paneSettings, index)` - Add a pane at specified index
- `paneSettings` - Object with properties: `size`, `content`, `min`, `max`, `resizable`, `collapsible`, etc.
- `index` - Position to insert (0 = first, inserts at end if omitted)

**Example pane configuration:**
```javascript
var paneConfig = {
    size: '200px',                              // Size (pixels or percentage)
    content: '<div>Pane content</div>',        // HTML content
    min: '50px',                                // Minimum size
    max: '400px',                               // Maximum size
    resizable: true,                            // Allow resize
    collapsible: false                          // Allow collapse
};
splitterObj.addPane(paneConfig, 2);            // Add at position 2
```

### Removing Panes Dynamically

Use the `removePane()` method to delete a pane from the splitter at runtime.

```csharp
<div>
    <ejs-splitter id="splitter" height="200px" width="600px">
        <e-splitter-panes>
            <e-splitter-pane size="200px" content="<div class='content'>Pane 1</div>"></e-splitter-pane>
            <e-splitter-pane size="200px" content="<div class='content'>Pane 2</div>"></e-splitter-pane>
            <e-splitter-pane size="200px" content="<div class='content'>Pane 3</div>"></e-splitter-pane>
        </e-splitter-panes>
    </ejs-splitter>
    <button id="removePane" class="e-btn" onclick="onRemovePane()">Remove Pane</button>
</div>

<style>
    .content {
        padding: 9px;
    }

    #removePane {
        margin-top: 15px;
    }
</style>

<script type="text/javascript">
    function onRemovePane() {
        var splitterObj = document.getElementById('splitter').ej2_instances[0];
        
        // Check if pane exists before removing
        var panes = document.querySelector('#splitter').querySelectorAll('.e-pane-horizontal');
        if (!ej.base.isNullOrUndefined(panes[1])) {
            // Remove pane at index 1
            splitterObj.removePane(1);
        }
    }
</script>
```

**removePane() syntax:**
- `splitterObj.removePane(index)` - Remove pane at specified index
- `index` - 0-based index of pane to remove

**Best practice:** Always check if pane exists before removing to avoid errors.

### Practical Example: Dynamic Panel Management

```javascript
function managePanes(action) {
    var splitterObj = document.getElementById('splitter').ej2_instances[0];
    
    if (action === 'add') {
        var newPane = {
            size: '25%',
            content: '<div>New Panel</div>',
            min: '100px',
            collapsible: true
        };
        splitterObj.addPane(newPane);  // Add at end
    } 
    else if (action === 'remove') {
        var currentPaneCount = splitterObj.paneSettings.length;
        if (currentPaneCount > 1) {
            splitterObj.removePane(currentPaneCount - 1); // Remove last pane
        } else {
            console.warn('Cannot remove last pane');
        }
    }
    else if (action === 'removeByIndex') {
        splitterObj.removePane(1);  // Remove specific pane
    }
}

// Usage
// managePanes('add');           // Add new pane
// managePanes('remove');        // Remove last pane
// managePanes('removeByIndex'); // Remove pane at index 1
```

## Initial Collapsed State

Set panes to be collapsed when the splitter first loads using the `collapsed` property.

### Collapsed on Load

```csharp
<ejs-splitter id="splitter" height="400px">
    <e-splitter-panes>
        <!-- This pane starts collapsed -->
        <e-splitter-pane size="30%" collapsible="true" collapsed="true" content="<div class='content'><h3>Hidden by Default</h3><p>This pane is initially collapsed.</p></div>"></e-splitter-pane>
        
        <!-- This pane starts expanded -->
        <e-splitter-pane size="70%" collapsible="true" collapsed="false" content="<div class='content'><h3>Visible by Default</h3><p>This pane is initially expanded.</p></div>"></e-splitter-pane>
    </e-splitter-panes>
</ejs-splitter>
```

**Use cases:**
- Minimize sidebar by default for mobile views
- Hide details panel in compact mode
- Save user preference to collapse specific panes on page load

### Conditional Collapsed State (Based on Device)

```csharp
@{
    // Determine if mobile view
    bool isMobile = ViewBag.IsMobile; // Set by controller based on user agent
    string navigationCollapsed = isMobile ? "true" : "false";
}

<ejs-splitter id="splitter" height="400px">
    <e-splitter-panes>
        <!-- Collapse navigation on mobile devices -->
        <e-splitter-pane size="25%" collapsible="true" collapsed=@navigationCollapsed content="<div class='content'><h3>Navigation</h3></div>"></e-splitter-pane>
        <e-splitter-pane size="75%" content="<div class='content'><h3>Content</h3></div>"></e-splitter-pane>
    </e-splitter-panes>
</ejs-splitter>
```

## Collapse and Expand Events

Respond to user-initiated collapse/expand actions with the `collapsed` and `expanded` event handlers.

```csharp
<ejs-splitter id="splitter" height="400px" collapsed="onCollapsed" expanded="onExpanded">
    <e-splitter-panes>
        <e-splitter-pane size="30%" collapsible="true" content="<div class='content'><h3>Panel</h3></div>"></e-splitter-pane>
        <e-splitter-pane size="70%" content="<div class='content'><h3>Content</h3></div>"></e-splitter-pane>
    </e-splitter-panes>
</ejs-splitter>

<script>
    // After collapse completed
    function onCollapsed(args) {
        console.log('Pane collapsed:', args.index[0]);
        // Update UI state, save preference, etc.
        updatePaneState(args.index[0], 'collapsed');
    }

    // After expand completed
    function onExpanded(args) {
        console.log('Pane expanded:', args.index[0]);
        // Refresh content, adjust layout, etc.
        updatePaneState(args.index[0], 'expanded');
    }

    function updatePaneState(paneIndex, state) {
        console.log('Pane ' + paneIndex + ' is now ' + state);
    }
</script>
```

**Event properties:**
- `index` - Array containing index of the pane being collapsed/expanded (access via `args.index[0]`)
- `event` - Original event object
- `pane` - Array of pane elements
- `element` - Root element after control is created
- `separator` - Respective split-bar/separator element

**Available Events:**
- `collapsed` - Fires after a pane is collapsed
- `expanded` - Fires after a pane is expanded

## Practical Examples

### Example 1: IDE Layout with Collapsible Panels

```csharp
<ejs-splitter id="ide" height="800px">
    <!-- Project sidebar -->
    <e-splitter-pane size="20%" min="150px" collapsible="true" content="<div class='panel'><h3>Project Explorer</h3><div id='projectTree'></div></div>"></e-splitter-pane>
    
    <!-- Main editor area -->
    <e-splitter-pane size="80%" content="<div class='panel'><ejs-splitter orientation='Vertical' style='width:100%;height:100%;'><e-splitter-panes><e-splitter-pane size='70%' content=\"<div class='panel'><h3>Code Editor</h3></div>\"></e-splitter-pane><e-splitter-pane size='30%' collapsible='true' content=\"<div class='panel'><h3>Properties</h3></div>\"></e-splitter-pane></e-splitter-panes></ejs-splitter></div>"></e-splitter-pane>
</ejs-splitter>

<style>
    .panel { padding: 15px; background: #f5f5f5; }
</style>

<script>
    function collapseSidebar() {
        document.getElementById('ide').ej2_instances[0].collapse(0);
    }
    
    function collapseProperties() {
        var splitter = document.getElementById('ide').ej2_instances[0];
        var innerSplitter = splitter.element.querySelector('[id*="nested"]')?.ej2_instances[0];
        if (innerSplitter) {
            innerSplitter.collapse(1);
        }
    }
</script>
```

### Example 2: Dashboard with Toggle Features

```csharp
<ejs-splitter id="dashboard" height="600px" orientation="Vertical">
    <!-- Toolbar (always visible) -->
    <e-splitter-pane size="60px" resizable="false" content="<div style='background:#2196F3;color:white;padding:15px;'><h3 style='margin:0;'>Dashboard</h3></div>"></e-splitter-pane>
    
    <!-- Main content area -->
    <e-splitter-pane size="100%" content="<div><ejs-splitter style='width:100%;height:100%;'><e-splitter-panes><e-splitter-pane size='20%' collapsible='true' collapsed='false' content=\"<div class='panel'><h3>Navigation</h3><p>Click to collapse</p></div>\"></e-splitter-pane><e-splitter-pane size='80%' content=\"<div class='panel'><h3>Main Content</h3></div>\"></e-splitter-pane></e-splitter-panes></ejs-splitter></div>"></e-splitter-pane>
    
    <!-- Footer: collapsible -->
    <e-splitter-pane size="100px" collapsible="true" content="<div style='background:#f0f0f0;padding:15px;'><h4 style='margin:0;'>Status Bar</h4></div>"></e-splitter-pane>
</ejs-splitter>

<script>
    var dashboardSplitter;
    
    document.addEventListener('DOMContentLoaded', function() {
        dashboardSplitter = document.getElementById('dashboard').ej2_instances[0];
        
        // Add event listeners for user preference
        dashboardSplitter.addEventListener('collapsed', function(e) {
            // Save preference to localStorage
            localStorage.setItem('sidebar-collapsed', 'true');
        });
        
        dashboardSplitter.addEventListener('expanded', function(e) {
            localStorage.setItem('sidebar-collapsed', 'false');
        });
    });
</script>
```

### Example 3: Save/Restore Collapse State

```csharp
<script>
    var splitterObj;
    
    function savePaneState() {
        var state = {};
        splitterObj.paneSettings.forEach((pane, index) => {
            state['pane_' + index] = {
                collapsed: pane.collapsed,
                size: pane.size
            };
        });
        localStorage.setItem('splitter-state', JSON.stringify(state));
        console.log('State saved');
    }
    
    function restorePaneState() {
        var savedState = localStorage.getItem('splitter-state');
        if (!savedState) return;
        
        var state = JSON.parse(savedState);
        Object.keys(state).forEach(key => {
            var index = parseInt(key.split('_')[1]);
            var paneState = state[key];
            
            if (paneState.collapsed) {
                splitterObj.collapse(index);
            } else {
                splitterObj.expand(index);
            }
        });
        console.log('State restored');
    }
    
    document.addEventListener('DOMContentLoaded', function() {
        splitterObj = document.getElementById('splitter').ej2_instances[0];
        
        // Restore on load
        restorePaneState();
        
        // Save on collapse/expand
        splitterObj.addEventListener('collapsed', savePaneState);
        splitterObj.addEventListener('expanded', savePaneState);
    });
</script>
```

## Best Practices

1. **Default Appropriate State** - Collapse panels by default on mobile, expand on desktop
2. **Provide Visual Cues** - Use arrow icons and animations to show collapse/expand state
3. **Save User Preferences** - Remember collapse state across page reloads
4. **Keyboard Support** - Consider keyboard shortcuts for collapse/expand
5. **Mobile Optimization** - Collapse non-essential panels to maximize screen space on small devices
6. **Animation Smoothness** - Use CSS transitions for smooth collapse/expand animation
