# Events and Callbacks in Sidebar

## Table of Contents
- [Understanding Sidebar Events](#understanding-sidebar-events)
- [Change Event](#change-event)
- [Open Event](#open-event)
- [Close Event](#close-event)
- [Created Event](#created-event)
- [Destroyed Event](#destroyed-event)
- [Event Arguments Structure](#event-arguments-structure)
- [Common Event Patterns](#common-event-patterns)
- [Event Binding Methods](#event-binding-methods)
- [Multiple Event Handlers](#multiple-event-handlers)

## Understanding Sidebar Events

Events in the Sidebar component allow you to execute code in response to user interactions and component lifecycle changes. The Sidebar component provides five event types, each firing at different stages of the component lifecycle or in response to user actions.

Events provide hooks to:
- React to sidebar state changes
- Update UI based on sidebar visibility
- Track user interactions
- Manage related components
- Validate state changes
- Log analytics

## Change Event

The `change` event fires whenever the sidebar's state changes between open and closed. This is the most commonly used event for responding to sidebar interactions.

### Change Event Signature

```csharp
change: EmitType<ChangeEventArgs>
```

### ChangeEventArgs Structure

The `change` event provides an argument object with these properties:

- **name** (string) - Event name: "change"
- **element** (HTMLElement) - The sidebar DOM element
- **event** (MouseEvent | Event) - The original browser event
- **isInteracted** (boolean) - True if user interacted (click/gesture), false if programmatic

### Basic Change Event Example

```cshtml
<ejs-sidebar id="change-demo" change="onSidebarChange">
    <e-content-template>
        <div style="padding: 20px;">
            <h3>Sidebar Menu</h3>
        </div>
    </e-content-template>
</ejs-sidebar>

<div id="status" style="padding: 20px; background-color: #f5f5f5; margin-top: 20px;">
    <p>Sidebar State: <strong id="state-text">Closed</strong></p>
    <p>Interaction Type: <strong id="interaction-text">None</strong></p>
</div>

<script>
function onSidebarClose(args) {
    var statText = document.getElementById('state-text');
    var interactionText = document.getElementById('interaction-text');
    
    // Check if sidebar is now open
    var isOpen = args.element.classList.contains('e-open');
    statText.textContent = isOpen ? 'Open' : 'Closed';
    
    // Check interaction type
    interactionText.textContent = args.isInteracted ? 
        'User Interaction' : 'Programmatic';
};
</script>
```

### Change Event with Data Updates

```cshtml
<ejs-sidebar id="sidebar" change="onSidebarStateChange">
    <e-content-template>
        <p>Navigation</p>
    </e-content-template>
</ejs-sidebar>

<div style="padding: 20px;">
    <h3>Content updates based on sidebar state</h3>
    <div id="content-area">
        <!-- Content updates here -->
    </div>
</div>

<script>
function onSidebarStateChange(args) {
    var contentArea = document.getElementById('content-area');
    
    if (args.element.classList.contains('e-open')) {
        // Sidebar opened
        contentArea.innerHTML = '<p>Sidebar is now OPEN - you can display additional information here</p>';
    } else {
        // Sidebar closed
        contentArea.innerHTML = '<p>Sidebar is now CLOSED - main content can take full width</p>';
    }
};
</script>
```

## Open Event

The `open` event fires specifically when the sidebar opens (transitions from closed to open state). This is useful for initialization or loading content that should only occur when the sidebar becomes visible.

### Open Event Signature

```csharp
open: EmitType<EventArgs>
```

### Open Event Example

```cshtml
<ejs-sidebar id="open-demo" open="onSidebarOpen">
    <e-content-template>
        <div style="padding: 20px;">
            <h3>Loading Menu...</h3>
            <div id="menu-content">
                <!-- Menu items loaded on open -->
            </div>
        </div>
    </e-content-template>
</ejs-sidebar>

<ejs-button id="openBtn" content="Open Sidebar"></ejs-button>

<script>
function onSidebarOpen(args) {
    
    // Load menu items only when sidebar opens
    var menuContent = document.getElementById('menu-content');
    menuContent.innerHTML = `
        <ul style="list-style: none; padding-left: 0;">
            <li style="padding: 8px 0;">Dashboard</li>
            <li style="padding: 8px 0;">Analytics</li>
            <li style="padding: 8px 0;">Settings</li>
        </ul>
    `;
    
    // Could also call an API to fetch menu items
    // fetch('/api/menu').then(response => response.json()).then(data => {
    //     menuContent.innerHTML = createMenuHTML(data);
    // });
};

document.addEventListener('DOMContentLoaded', function () {
    var sidebar = document.getElementById('open-demo').ej2_instances[0];
    document.getElementById('openBtn').addEventListener('click', function () {
        sidebar.open();
    });
});
</script>
```

<script>
function onSidebarOpenLazy(args) {
    var content = document.getElementById('sidebar-content');
    
    // Show loading indicator
    content.innerHTML = '<p>Loading...</p>';
    
    // Simulate API call
    setTimeout(function () {
        content.innerHTML = `
            <h3>Navigation</h3>
            <ul style="list-style: none;">
                <li>Home</li>
                <li>About</li>
                <li>Contact</li>
            </ul>
        `;
    }, 500);
};
</script>
```

## Close Event

The `close` event fires specifically when the sidebar closes (transitions from open to closed state). Useful for cleanup, analytics tracking, or saving state.

### Close Event Signature

```csharp
close: EmitType<EventArgs>
```

### Close Event Example

```cshtml
<ejs-sidebar id="close-demo" close="onSidebarClose">
    <e-content-template>
        <div style="padding: 20px;">
            <h3>Menu</h3>
            <input type="checkbox" id="setting-checkbox">
            <label for="setting-checkbox">My Setting</label>
        </div>
    </e-content-template>
</ejs-sidebar>

<div id="close-log" style="padding: 20px; background-color: #f5f5f5; margin-top: 20px;">
    <h3>Close Events Log:</h3>
    <div id="log-content" style="font-family: monospace; height: 100px; overflow-y: auto;"></div>
</div>

<ejs-button id="toggle" content="Toggle Sidebar"></ejs-button>

<script>
var closeCount = 0;

function onSidebarClose(args) {
    closeCount++;
    
    // Track that sidebar was closed
    var checkbox = document.getElementById('setting-checkbox');
    var isSaved = checkbox.checked;
    
    var logContent = document.getElementById('log-content');
    logContent.innerHTML += '<p>[' + new Date().toLocaleTimeString() + '] Sidebar closed. Setting saved: ' + isSaved + '</p>';
    
    // Analytics tracking
    console.log('Sidebar closed at:', new Date());
}

document.addEventListener('DOMContentLoaded', function () {
    var sidebar = document.getElementById('close-demo').ej2_instances[0];
    document.getElementById('toggle').addEventListener('click', function () {
        sidebar.toggle();
    });
});
</script>
```

## Created Event

The `created` event fires once when the sidebar component is fully initialized and ready for use. Use this to perform one-time setup operations.

### Created Event Signature

```csharp
created: EmitType<Object>
```

### Created Event Example

```cshtml
<ejs-sidebar id="created-demo" created="onSidebarCreated">
    <e-content-template>
        <div id="sidebar-init-msg" style="padding: 20px;">
            <!-- Message about initialization -->
        </div>
    </e-content-template>
</ejs-sidebar>

<script>
function onSidebarCreated(args) {
    console.log('Sidebar component created and initialized');
    
    // One-time setup operations
    var msg = document.getElementById('sidebar-init-msg');
    msg.innerHTML = '<p style="color: green;">✓ Sidebar initialized successfully!</p>';
    
    // Could perform other initialization:
    // - Load stored preferences
    // - Set up keyboard shortcuts
    // - Initialize child components
    // - Set up analytics tracking
};
</script>
```

### Created Event for Component Setup

```cshtml
<ejs-sidebar id="setup-sidebar" created="initializeSidebar">
    <e-content-template>
        <div style="padding: 20px;">
            <h3>Sidebar</h3>
        </div>
    </e-content-template>
</ejs-sidebar>

<script>
function initializeSidebar(args) {
    var sidebar = document.getElementById('setup-sidebar').ej2_instances[0];
    
    // Load user preferences from storage
    var savedState = localStorage.getItem('sidebar-state');
    if (savedState === 'open') {
        sidebar.show();
    }
    
    // Set up keyboard shortcut (Alt+S to toggle)
    document.addEventListener('keydown', function (event) {
        if (event.altKey && event.code === 'KeyS') {
            sidebar.toggle();
        }
    });
    
    console.log('Sidebar setup complete');
};
</script>
```

## Destroyed Event

The `destroyed` event fires when the sidebar component is completely removed from the DOM (via `destroy()` method). Use for cleanup operations.

### Destroyed Event Signature

```csharp
destroyed: EmitType<Object>
```

### Destroyed Event Example

```cshtml
<ejs-sidebar id="destroy-demo" destroyed="onSidebarDestroyed">
    <e-content-template>
        <p>This will be destroyed</p>
    </e-content-template>
</ejs-sidebar>

<ejs-button id="destroyBtn" content="Destroy Sidebar"></ejs-button>

<div id="destroy-message" style="margin-top: 20px;"></div>

<script>
function onSidebarDestroyed(args) {
    console.log('Sidebar has been destroyed');
    
    var message = document.getElementById('destroy-message');
    message.innerHTML = '<p style="color: red;">Sidebar component has been removed</p>';
};

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('destroyBtn').addEventListener('click', function () {
        var sidebar = document.getElementById('destroy-demo').ej2_instances[0];
        sidebar.destroy();
    });
});
</script>
```

## Event Arguments Structure

### ChangeEventArgs

The `change` event provides the most detailed arguments:

```javascript
{
    name: string,           // "change"
    element: HTMLElement,   // The sidebar DOM element
    event: MouseEvent|Event,// Original browser event
    isInteracted: boolean   // User interaction vs programmatic
}
```

### EventArgs (Open, Close, Created, Destroyed)

```javascript
{
    cancel: boolean,        // Can cancel the event (if cancellable)
    element: HTMLElement,   // The sidebar DOM element
    event: MouseEvent|Event,// Original browser event (may be null)
    isInteracted: boolean,  // Whether user interacted
    model: SidebarModel     // Current sidebar configuration
}
```

## Common Event Patterns

### Pattern 1: Track Sidebar Usage

```cshtml
<ejs-sidebar id="usage-tracker" change="trackUsage">
    <e-content-template><p>Menu</p></e-content-template>
</ejs-sidebar>

<script>
var usageStats = {
    opens: 0,
    closes: 0,
    interactions: 0
};

function trackUsage(args) {
    if (args.element.classList.contains('e-open')) {
        usageStats.opens++;
    } else {
        usageStats.closes++;
    }
    
    if (args.isInteracted) {
        usageStats.interactions++;
    }
    
    console.log('Usage Stats:', usageStats);
};
</script>
```

### Pattern 2: Disable Content While Sidebar Open

```cshtml
<ejs-sidebar id="disable-content" change="toggleContentAccess">
    <e-content-template><p>Menu</p></e-content-template>
</ejs-sidebar>

<div id="main-content" style="padding: 20px;">
    <button id="action-btn">Action</button>
    <input id="text-input" type="text">
</div>

<script>
function toggleContentAccess(args) {
    var isOpen = args.element.classList.contains('e-open');
    
    // Disable/enable main content interactions when sidebar is open
    document.getElementById('action-btn').disabled = isOpen;
    document.getElementById('text-input').disabled = isOpen;
};
</script>
```

### Pattern 3: Sync Multiple Sidebars

```cshtml
<!-- Left Navigation -->
<ejs-sidebar id="left-sidebar" change="syncSidebars">
    <e-content-template><p>Left Menu</p></e-content-template>
</ejs-sidebar>

<!-- Right Details -->
<ejs-sidebar id="right-sidebar" position="Right" change="syncSidebars">
    <e-content-template><p>Right Panel</p></e-content-template>
</ejs-sidebar>

<script>
function syncSidebars(args) {
    console.log('One sidebar changed, could update the other');
    
    // Custom sync logic here
};
</script>
```

### Pattern 4: Log State Changes

```cshtml
<ejs-sidebar id="logged-sidebar" 
             open="logOpen" 
             close="logClose"
             created="logCreated"
             destroyed="logDestroyed">
    <e-content-template><p>Menu</p></e-content-template>
</ejs-sidebar>

<script>
var eventLog = [];

function logOpen(args) {
    eventLog.push({ time: new Date(), event: 'open' });
    console.log('Event Log:', eventLog);
}

function logClose(args) {
    eventLog.push({ time: new Date(), event: 'close' });
    console.log('Event Log:', eventLog);
}

function logCreated(args) {
    eventLog.push({ time: new Date(), event: 'created' });
}

function logDestroyed(args) {
    eventLog.push({ time: new Date(), event: 'destroyed' });
}
</script>
```

## Event Binding Methods

### Method 1: TagHelper Attribute

```cshtml
<ejs-sidebar id="sidebar" change="onStateChange" open="onOpen" close="onClose">
    <e-content-template><p>Content</p></e-content-template>
</ejs-sidebar>

<script>
function onSidebarStateChange(args) { 
    console.log('Sidebar state changed'); 
};
function onSidebarOpened(args) { 
    console.log('Sidebar opened'); 
};
function onSidebarClosed(args) { 
    console.log('Sidebar closed'); 
};
</script>
```

### Method 2: JavaScript addEventListener

```cshtml
<ejs-sidebar id="sidebar">
    <e-content-template><p>Content</p></e-content-template>
</ejs-sidebar>

<script>
var sidebar = document.getElementById('sidebar').ej2_instances[0];

sidebar.addEventListener('change', function (args) {
    console.log('Change event:', args);
});

sidebar.addEventListener('open', function (args) {
    console.log('Open event:', args);
});
</script>
```

### Method 3: on() Method

```csharp
@{
    // In C# Razor, via server-side binding
}

<ejs-sidebar id="sidebar">
    <e-on-change TValue="Syncfusion.EJ2.SidebarModel" Handler="OnChange"></e-on-change>
    <e-content-template><p>Content</p></e-content-template>
</ejs-sidebar>

@code {
    private void OnChange(ChangeEventArgs args)
    {
        // Handle change event
    }
}
```

## Multiple Event Handlers

### Binding Multiple Handlers to Same Event

```cshtml
<ejs-sidebar id="sidebar" change="onStageChange">
    <e-content-template><p>Content</p></e-content-template>
</ejs-sidebar>

<script>
function onSidebarChange(args) {
    handleStateChange(args);
    logStateChange(args);
    updateAnalytics(args);
};

function handleStateChange(args) {
    console.log('Handle state change');
}

function logStateChange(args) {
    console.log('Log state change');
}

function updateAnalytics(args) {
    console.log('Update analytics');
}
</script>
```

### Using addEventListener for Multiple Handlers

```javascript
var sidebar = document.getElementById('sidebar').ej2_instances[0];

// Add multiple listeners
sidebar.addEventListener('change', handler1);
sidebar.addEventListener('change', handler2);
sidebar.addEventListener('change', handler3);

function handler1(args) { console.log('Handler 1'); }
function handler2(args) { console.log('Handler 2'); }
function handler3(args) { console.log('Handler 3'); }
```

---

**Next Step:** Learn about [Internationalization](internationalization.md) for RTL layouts and multi-language support.
