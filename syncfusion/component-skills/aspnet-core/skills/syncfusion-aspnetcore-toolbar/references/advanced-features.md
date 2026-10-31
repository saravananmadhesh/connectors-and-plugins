# Advanced Features and Customization

## Table of Contents
- [Toggle Buttons](#toggle-buttons)
- [Tooltips](#tooltips)
- [Custom Command Handling](#custom-command-handling)
- [Scroll Step Customization](#scroll-step-customization)
- [Content Template](#content-template)
- [Event Arguments and Handlers](#event-arguments-and-handlers)
- [HTMLAttributes Customization](#htmlattributes-customization)

## Toggle Buttons

Toggle buttons maintain state and change appearance/content based on activation. They're useful for mode switching, visibility toggling, and state-based actions.

### Basic Toggle Button Implementation

```html
<ejs-toolbar id="toggleToolbar">
    <e-toolbar-items>
        <e-content-template>
            <div>
                <button class="e-btn" id="media_btn" type="button">
                    <span class="e-icons e-play-icon"></span>
                    Play
                </button>
            </div>
        </e-content-template>
    </e-toolbar-items>
</ejs-toolbar>

<script>
    // Toggle button logic
    let isPlaying = false;
    
    document.getElementById('media_btn').addEventListener('click', function(e) {
        isPlaying = !isPlaying;
        const btn = e.currentTarget;
        
        if (isPlaying) {
            // Change to "pause" state
            btn.innerHTML = '<span class="e-icons e-pause-icon"></span>Pause';
            btn.classList.add('active');
        } else {
            // Change to "play" state
            btn.innerHTML = '<span class="e-icons e-play-icon"></span>Play';
            btn.classList.remove('active');
        }
    });
</script>

<style>
    .e-btn#media_btn {
        padding: 8px 16px;
        border: 1px solid #ccc;
        background: #f5f5f5;
        cursor: pointer;
        border-radius: 4px;
        transition: all 0.3s;
    }
    
    .e-btn#media_btn.active {
        background: #007bff;
        color: white;
        border-color: #0056b3;
    }
</style>
```

### Advanced Toggle: Multiple State Button

```html
<ejs-toolbar id="advancedToggleToolbar">
    <e-toolbar-items>
        <e-content-template>
            <div>
                <button class="e-btn multi-toggle" id="viewMode" type="button" data-state="0">
                    <span class="e-icons e-list-icon"></span>
                    List View
                </button>
            </div>
        </e-content-template>
    </e-toolbar-items>
</ejs-toolbar>

<script>
    const viewStates = [
        { text: 'List View', icon: 'e-list-icon' },
        { text: 'Grid View', icon: 'e-grid-icon' },
        { text: 'Card View', icon: 'e-card-icon' }
    ];
    
    document.getElementById('viewMode').addEventListener('click', function(e) {
        let state = parseInt(this.getAttribute('data-state'));
        state = (state + 1) % viewStates.length;
        
        const stateData = viewStates[state];
        this.innerHTML = `<span class="e-icons ${stateData.icon}"></span>${stateData.text}`;
        this.setAttribute('data-state', state);
        
        // Trigger view change logic
        triggerViewModeChange(state);
    });
    
    function triggerViewModeChange(mode) {
        console.log('View mode changed to:', mode);
    }
</script>
```

## Tooltips

Tooltips provide hover hints for toolbar items without taking up toolbar space.

### Add Tooltips to Items

```html
<ejs-toolbar id="tooltipToolbar">
    <e-toolbar-items>
        <e-toolbar-item text="Cut" prefixIcon="e-cut-icon" 
                       tooltipText="Cut selected text (Ctrl+X)"></e-toolbar-item>
        <e-toolbar-item text="Copy" prefixIcon="e-copy-icon" 
                       tooltipText="Copy selected text (Ctrl+C)"></e-toolbar-item>
        <e-toolbar-item text="Paste" prefixIcon="e-paste-icon" 
                       tooltipText="Paste from clipboard (Ctrl+V)"></e-toolbar-item>
        <e-toolbar-item type="Separator"></e-toolbar-item>
        <e-toolbar-item text="Bold" prefixIcon="e-bold-icon" 
                       tooltipText="Make text bold (Ctrl+B)"></e-toolbar-item>
        <e-toolbar-item text="Italic" prefixIcon="e-italic-icon" 
                       tooltipText="Make text italic (Ctrl+I)"></e-toolbar-item>
        <e-toolbar-item text="Underline" prefixIcon="e-underline-icon" 
                       tooltipText="Underline text (Ctrl+U)"></e-toolbar-item>
    </e-toolbar-items>
</ejs-toolbar>
```

### Initialize Tooltip Component

The Toolbar works with Syncfusion's Tooltip component for advanced hover behavior:

```html
<ejs-toolbar id="advancedTooltipToolbar">
    <e-toolbar-items>
        <e-toolbar-item text="Settings" prefixIcon="e-settings-icon" id="settingsBtn"></e-toolbar-item>
    </e-toolbar-items>
</ejs-toolbar>

<ejs-tooltip id="toolbarTooltip" content="Configure application settings" target="#settingsBtn" 
            showDelay="500" hideDelay="100">
</ejs-tooltip>
```

Tooltip properties:
- `content`: Tooltip text
- `target`: Target element selector
- `showDelay`: Milliseconds before showing
- `hideDelay`: Milliseconds before hiding
- `position`: Top, Bottom, Left, Right

## Custom Command Handling

Handle toolbar commands with custom event handlers and integrate with application logic.

### Click Event Handling

```html
<ejs-toolbar id="commandToolbar">
    <e-toolbar-items>
        <e-toolbar-item id="newCmd" text="New" prefixIcon="e-new-icon"></e-toolbar-item>
        <e-toolbar-item id="openCmd" text="Open" prefixIcon="e-open-icon"></e-toolbar-item>
        <e-toolbar-item id="saveCmd" text="Save" prefixIcon="e-save-icon"></e-toolbar-item>
        <e-toolbar-item id="printCmd" text="Print" prefixIcon="e-print-icon"></e-toolbar-item>
    </e-toolbar-items>
</ejs-toolbar>

<script>
    const commandHandlers = {
        'newCmd': function() {
            console.log('Creating new document');
            // Clear editor, reset state
        },
        'openCmd': function() {
            console.log('Opening file dialog');
            // Show file picker
        },
        'saveCmd': function() {
            console.log('Saving document');
            // Save logic
        },
        'printCmd': function() {
            console.log('Printing document');
            // Print logic
        }
    };
    
    // Attach click handlers to all items
    Object.entries(commandHandlers).forEach(([cmdId, handler]) => {
        const element = document.getElementById(cmdId);
        if (element) {
            element.addEventListener('click', handler);
        }
    });
</script>
```

### Toolbar Click Event (Global Handler)

```html
<ejs-toolbar id="globalHandlerToolbar" clicked="clicked">
    <e-toolbar-items>
        <e-toolbar-item text="Action 1" id="action1"></e-toolbar-item>
        <e-toolbar-item text="Action 2" id="action2"></e-toolbar-item>
        <e-toolbar-item text="Action 3" id="action3"></e-toolbar-item>
    </e-toolbar-items>
</ejs-toolbar>

<script>
    // Global toolbar click handler
    const toolbar = document.querySelector('#globalHandlerToolbar');
    function clicked(e) {
        const itemId = e.target.closest('.e-toolbar-item')?.id;
        if (itemId) {
            handleToolbarCommand(itemId);
        }
    }
    
    function handleToolbarCommand(itemId) {
        const commands = {
            'action1': () => performAction1(),
            'action2': () => performAction2(),
            'action3': () => performAction3()
        };
        
        if (commands[itemId]) {
            commands[itemId]();
        }
    }
    
    function performAction1() { console.log('Performing action 1'); }
    function performAction2() { console.log('Performing action 2'); }
    function performAction3() { console.log('Performing action 3'); }
</script>
```

## Scroll Step Customization

Control the distance toolbar scrolls when navigation arrows are clicked in scrollable mode.

### Configure Scroll Step

```html
<!-- Default scroll (approximately 40-50px) -->
<ejs-toolbar id="defaultScrollToolbar" overflowMode="Scrollable">
    <!-- items -->
</ejs-toolbar>

<!-- Custom scroll step (100px per click) -->
<ejs-toolbar id="largeScrollToolbar" overflowMode="Scrollable" scrollStep="100">
    <!-- items -->
</ejs-toolbar>

<!-- Small scroll step (30px per click, fine control) -->
<ejs-toolbar id="smallScrollToolbar" overflowMode="Scrollable" scrollStep="30">
    <!-- items -->
</ejs-toolbar>
```

### Programmatic Scroll Control

```html
<ejs-toolbar id="programScrollToolbar" overflowMode="Scrollable" scrollStep="80">
    <e-toolbar-items>
        <e-toolbar-item text="Item 1"></e-toolbar-item>
        <e-toolbar-item text="Item 2"></e-toolbar-item>
        <e-toolbar-item text="Item 3"></e-toolbar-item>
        <!-- more items -->
    </e-toolbar-items>
</ejs-toolbar>

<button onclick="scrollToolbarLeft()">Scroll Left</button>
<button onclick="scrollToolbarRight()">Scroll Right</button>

<script>
    // Note: Scroll methods would be implemented via Toolbar's public API
    function scrollToolbarLeft() {
        // Implementation depends on Toolbar's exposed scroll methods
        const toolbar = document.querySelector('#programScrollToolbar');
        // Apply scrolling logic
    }
    
    function scrollToolbarRight() {
        const toolbar = document.querySelector('#programScrollToolbar');
        // Apply scrolling logic
    }
</script>
```

## Content Template

Render complex toolbar content using the `<e-content-template>` approach, which allows direct HTML markup within the toolbar.

### Content Template with Complex Controls

```html
<ejs-toolbar id="complexContentToolbar" width="600px">
    <e-toolbar-items>
        <e-content-template>
            <div>
                <!-- Font selector with dropdown -->
                <div class="custom-item-container">
                    <button class="e-btn" onclick="toggleDropdown(this)">
                        <span class="e-icons e-font-icon"></span>
                        Font
                        <span class="e-icons e-dropdown-arrow"></span>
                    </button>
                    <div class="custom-dropdown" style="display:none;">
                        <div onclick="selectFont(this, 'Arial')">Arial</div>
                        <div onclick="selectFont(this, 'Times New Roman')">Times New Roman</div>
                        <div onclick="selectFont(this, 'Courier New')">Courier New</div>
                    </div>
                </div>
                
                <!-- Zoom slider -->
                <div style="display: flex; align-items: center; gap: 8px; margin: 0 10px;">
                    <label for="zoomSlider">Zoom:</label>
                    <input type="range" id="zoomSlider" min="50" max="200" value="100" 
                           oninput="applyZoom(this.value)">
                    <span id="zoomValue">100%</span>
                </div>
                
                <!-- Color picker -->
                <div class="color-picker-container">
                    <input type="color" id="colorPicker" value="#FF0000" 
                           onchange="applyColor(this.value)" 
                           style="width: 40px; height: 40px; cursor: pointer;">
                </div>
            </div>
        </e-content-template>
    </e-toolbar-items>
</ejs-toolbar>

<script>
    function toggleDropdown(btn) {
        const dropdown = btn.nextElementSibling;
        dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
    }
    
    function selectFont(item, fontName) {
        console.log('Font selected:', fontName);
        item.parentElement.style.display = 'none';
    }
    
    function applyZoom(value) {
        document.getElementById('zoomValue').textContent = value + '%';
        console.log('Zoom applied:', value);
    }
    
    function applyColor(color) {
        console.log('Color applied:', color);
    }
</script>

<style>
    .custom-item-container {
        position: relative;
        display: inline-block;
    }
    
    .custom-dropdown {
        position: absolute;
        background: white;
        border: 1px solid #ccc;
        border-radius: 4px;
        min-width: 150px;
        z-index: 1000;
        top: 100%;
    }
    
    .custom-dropdown div {
        padding: 8px 12px;
        cursor: pointer;
    }
    
    .custom-dropdown div:hover {
        background: #f0f0f0;
    }
    
    .color-picker-container input {
        border: 1px solid #ccc;
        border-radius: 4px;
    }
</style>
```

### Content Template with Menu Integration

```html
<ejs-toolbar id="defaultToolbar" width="600px">
    <e-toolbar-items>
        <e-content-template>
            <div>
                <div><button class='e-btn e-tbar-btn'>Cut</button></div>
                <div><button class='e-btn e-tbar-btn'>Copy</button></div>
                <div>
                    <ejs-menu id="menu" items="menuItems"></ejs-menu>
                </div>
                <div><button class='e-btn e-tbar-btn'>Paste</button></div>
            </div>
        </e-content-template>
    </e-toolbar-items>
</ejs-toolbar>

<script>
    let menuItems = [
        { text: 'New' },
        { text: 'Open' },
        { text: 'Save' },
        { separator: true },
        { text: 'Exit' }
    ];
</script>
```

This approach uses `<e-content-template>` to render the entire toolbar content as a unified DOM structure, allowing seamless integration of buttons, menus, and complex controls without the need for item-level templates.

## Event Arguments and Handlers

Toolbar provides several events for lifecycle and user interaction handling.

### Before Item Click Event

```html
<ejs-toolbar id="eventToolbar" clicked="onItemClicked">
    <e-toolbar-items>
        <e-toolbar-item id="item1" text="Deletable" prefixIcon="e-delete-icon"></e-toolbar-item>
        <e-toolbar-item id="item2" text="Allowed" prefixIcon="e-save-icon"></e-toolbar-item>
    </e-toolbar-items>
</ejs-toolbar>

<script>
    // Item click event handler
    function onItemClicked(e) {
        // e contains click event information
        const itemId = e.target?.id;
        
        if (itemId === 'item1') {
            // Prevent action or show confirmation
            if (!confirm('Delete this item?')) {
                e.preventDefault?.();
            }
        }
    }
</script>
```

### Creation and Destruction Events

```html
<ejs-toolbar id="lifecycleToolbar" created="onToolbarCreated" destroyed="onToolbarDestroyed">
    <e-toolbar-items>
        <e-toolbar-item text="Test"></e-toolbar-item>
    </e-toolbar-items>
</ejs-toolbar>

<script>
    // Toolbar created event handler
    function onToolbarCreated(e) {
        console.log('Toolbar initialized and ready');
        initializeToolbarData();
    }
    
    // Toolbar destroy event handler
    function onToolbarDestroyed(e) {
        console.log('Toolbar destroyed');
        cleanupToolbarResources();
    }
    
    function initializeToolbarData() {
        // Setup after creation
    }
    
    function cleanupToolbarResources() {
        // Cleanup before destruction
    }
</script>
```

## HTMLAttributes Customization

Add custom HTML attributes to toolbar items for styling and data attributes.

### Adding Custom Attributes

The `htmlAttributes` property allows setting ID, class, style, role, and custom data attributes:

```html
<ejs-toolbar id="customAttrToolbar">
    <e-toolbar-items>
        <!-- Item with custom CSS classes -->
        <e-toolbar-item text="Primary Action" prefixIcon="e-primary-icon" 
                       cssClass="btn-primary btn-large"></e-toolbar-item>
        
        <!-- Item with custom data attributes (via htmlAttributes) -->
        <e-toolbar-item text="Tracked Action" prefixIcon="e-track-icon" 
                       id="trackedItem" 
                       cssClass="trackable-item"></e-toolbar-item>
        
        <!-- Item with ARIA role -->
        <e-toolbar-item text="Help" prefixIcon="e-help-icon" 
                       cssClass="help-button" 
                       id="helpBtn"></e-toolbar-item>
    </e-toolbar-items>
</ejs-toolbar>

<script>
    // Set additional custom attributes programmatically
    document.getElementById('trackedItem').setAttribute('data-action', 'track-event');
    document.getElementById('trackedItem').setAttribute('data-category', 'document');
    document.getElementById('helpBtn').setAttribute('role', 'button');
    document.getElementById('helpBtn').setAttribute('aria-label', 'Help information');
</script>

<style>
    /* Custom CSS classes -->
    .btn-primary {
        background-color: #007bff;
        color: white;
    }
    
    .btn-large {
        padding: 12px 24px;
        font-size: 16px;
    }
    
    .trackable-item {
        border: 2px solid #ffc107;
    }
    
    .help-button {
        opacity: 0.8;
    }
    
    .help-button:hover {
        opacity: 1;
        background-color: #e7f3ff;
    }
</style>
```

These advanced features enable building sophisticated, interactive toolbars with complex behaviors and integrations tailored to specific application requirements.
