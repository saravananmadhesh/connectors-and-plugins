# Managing Sidebar State and Open/Close Behavior

## Table of Contents
- [Understanding Sidebar State](#understanding-sidebar-state)
- [Initial State with isOpen](#initial-state-with-isopen)
- [show() Method](#show-method)
- [hide() Method](#hide-method)
- [toggle() Method](#toggle-method)
- [Reading Current State](#reading-current-state)
- [Common State Patterns](#common-state-patterns)
- [Button Integration](#button-integration)
- [Responding to State Changes](#responding-to-state-changes)
- [State Persistence](#state-persistence)
- [Troubleshooting State Issues](#troubleshooting-state-issues)

## Understanding Sidebar State

The sidebar state refers to whether the component is currently open (visible/expanded) or closed (hidden/collapsed). The `isOpen` property is the fundamental property controlling this state, and methods like `show()`, `hide()`, and `toggle()` manipulate it programmatically.

Every sidebar has two states:

- **Open State**: Sidebar is expanded and visible (isOpen = true)
- **Closed State**: Sidebar is collapsed/hidden (isOpen = false)

State management is crucial for creating interactive sidebars that respond to user actions like button clicks, navigation events, or viewport changes.

## Initial State with isOpen

The `isOpen` property sets the sidebar's initial state when the component first renders. Values are:

- `true` - Sidebar starts expanded (open)
- `false` - Sidebar starts collapsed (closed, default)

### isOpen Default Behavior

```cshtml
<!-- Sidebar starts closed (default) -->
<ejs-sidebar id="closed-sidebar">
    <e-content-template>
        <p>Start closed</p>
    </e-content-template>
</ejs-sidebar>
```

When `isOpen` is not specified, it defaults to `false`, and the sidebar renders in closed state.

### isOpen Set to True

```cshtml
<!-- Sidebar starts open -->
<ejs-sidebar id="open-sidebar" isOpen="true">
    <e-content-template>
        <h3>Navigation</h3>
        <ul style="list-style: none; padding-left: 0;">
            <li style="padding: 8px 0;">Home</li>
            <li style="padding: 8px 0;">About</li>
            <li style="padding: 8px 0;">Contact</li>
        </ul>
    </e-content-template>
</ejs-sidebar>

<div style="padding: 20px;">
    <h1>Main Content</h1>
    <p>Sidebar is open by default</p>
</div>
```

### isOpen with Different Sidebar Types

```cshtml
<!-- Over type, closed by default -->
<ejs-sidebar id="over-sidebar" type="Over" isOpen="false">
    <e-content-template><p>Overlay Menu</p></e-content-template>
</ejs-sidebar>

<!-- Push type, open by default -->
<ejs-sidebar id="push-sidebar" type="Push" isOpen="true">
    <e-content-template><p>Push Menu</p></e-content-template>
</ejs-sidebar>

<!-- Auto type, open by default -->
<ejs-sidebar id="auto-sidebar" type="Auto" isOpen="true">
    <e-content-template><p>Responsive Menu</p></e-content-template>
</ejs-sidebar>
```

## show() Method

The `show()` method opens the sidebar programmatically. It expands the sidebar if it's currently closed and triggers the appropriate animations and events.

### show() Method Signature

```javascript
sidebar.show(event: Event);
```

The `event` parameter is optional and represents the browser event triggering the show action (like a click event).

### Basic show() Example

```cshtml
<ejs-button id="openButton" content="Open Sidebar"></ejs-button>

<ejs-sidebar id="demo-sidebar" type="Push" isOpen="false">
    <e-content-template>
        <div style="padding: 20px;">
            <h3>Menu</h3>
            <p>Sidebar content here</p>
        </div>
    </e-content-template>
</ejs-sidebar>

<div style="padding: 20px; height: 300px; background-color: #f5f5f5;">
    <h2>Main Content</h2>
</div>

<script>
document.addEventListener('DOMContentLoaded', function () {
    var sidebar = document.getElementById('demo-sidebar').ej2_instances[0];
    var button = document.getElementById('openButton').ej2_instances[0];
    
    button.element.addEventListener('click', function () {
        sidebar.show();
    });
});
</script>
```

### show() with Event Parameter

```javascript
document.addEventListener('DOMContentLoaded', function () {
    var sidebar = document.getElementById('sidebar').ej2_instances[0];
    
    document.getElementById('openButton').addEventListener('click', function (event) {
        // Pass the click event to show()
        sidebar.show(event);
    });
});
```

## hide() Method

The `hide()` method closes the sidebar programmatically. It collapses the sidebar if it's currently open and triggers animations and events.

### hide() Method Signature

```javascript
sidebar.hide(event: Event);
```

The `event` parameter is optional.

### Basic hide() Example

```cshtml
<ejs-button id="closeButton" content="Close Sidebar"></ejs-button>

<ejs-sidebar id="demo-sidebar" type="Push" isOpen="true">
    <e-content-template>
        <div style="padding: 20px;">
            <h3>Menu</h3>
            <p>Sidebar content here</p>
            <ejs-button id="internalCloseBtn" content="Close from Inside"></ejs-button>
        </div>
    </e-content-template>
</ejs-sidebar>

<div style="padding: 20px; height: 300px; background-color: #f5f5f5;">
    <h2>Main Content</h2>
</div>

<script>
document.addEventListener('DOMContentLoaded', function () {
    var sidebar = document.getElementById('demo-sidebar').ej2_instances[0];
    
    // Close button outside sidebar
    document.getElementById('closeButton').addEventListener('click', function () {
        sidebar.hide();
    });
    
    // Close button inside sidebar
    document.getElementById('internalCloseBtn').addEventListener('click', function () {
        sidebar.hide();
    });
});
</script>
```

### Conditional hide() Example

```javascript
var sidebar = document.getElementById('sidebar').ej2_instances[0];

// Only close if sidebar is open
if (sidebar.isOpen) {
    sidebar.hide();
}
```

## toggle() Method

The `toggle()` method switches the sidebar between open and closed states. If the sidebar is open, calling `toggle()` closes it. If closed, calling `toggle()` opens it. This is the most convenient method for button interactions.

### toggle() Method Signature

```javascript
sidebar.toggle();
```

### Basic toggle() Example

```cshtml
<ejs-button id="toggleButton" content="Toggle Sidebar" isToggle="true"></ejs-button>

<ejs-sidebar id="demo-sidebar" type="Push" isOpen="false">
    <e-content-template>
        <div style="padding: 20px;">
            <h3>Navigation Menu</h3>
            <ul style="list-style: none; padding-left: 0;">
                <li style="padding: 10px 0;"><a href="/">Home</a></li>
                <li style="padding: 10px 0;"><a href="/about">About</a></li>
                <li style="padding: 10px 0;"><a href="/services">Services</a></li>
            </ul>
        </div>
    </e-content-template>
</ejs-sidebar>

<div style="padding: 20px;">
    <h1>Main Page Content</h1>
    <p>Click the toggle button to open and close the sidebar</p>
</div>

<script>
document.addEventListener('DOMContentLoaded', function () {
    var sidebar = document.getElementById('demo-sidebar').ej2_instances[0];
    
    document.getElementById('toggleButton').addEventListener('click', function () {
        sidebar.toggle();
    });
});
</script>
```

### Hamburger Menu Pattern with toggle()

The hamburger icon pattern is ideal for mobile navigation and uses `toggle()`:

```cshtml
<div style="padding: 10px; background-color: #333; color: white; display: flex; justify-content: space-between; align-items: center;">
    <ejs-button id="hamburger" content="☰" cssClass="e-link"></ejs-button>
    <h2 style="margin: 0; color: white;">My App</h2>
</div>

<ejs-sidebar id="nav-sidebar" type="Auto" isOpen="false">
    <e-content-template>
        <div style="padding: 20px;">
            <h3>Menu</h3>
            <ul style="list-style: none; padding-left: 0; line-height: 1.8;">
                <li><a href="/" style="text-decoration: none;">📱 Dashboard</a></li>
                <li><a href="/products" style="text-decoration: none;">📦 Products</a></li>
                <li><a href="/orders" style="text-decoration: none;">📋 Orders</a></li>
                <li><a href="/analytics" style="text-decoration: none;">📊 Analytics</a></li>
            </ul>
        </div>
    </e-content-template>
</ejs-sidebar>

<div style="padding: 20px; height: 400px; background-color: #f5f5f5;">
    <h1>Dashboard</h1>
    <p>Click hamburger menu to toggle sidebar</p>
</div>

<script>
document.addEventListener('DOMContentLoaded', function () {
    var sidebar = document.getElementById('nav-sidebar').ej2_instances[0];
    var hamburger = document.getElementById('hamburger').ej2_instances[0];
    
    hamburger.element.addEventListener('click', function () {
        sidebar.toggle();
    });
});
</script>
```

## Reading Current State

You can read the current sidebar state to make decisions about UI updates or validations.

### Checking if Sidebar is Open

```javascript
var sidebar = document.getElementById('sidebar').ej2_instances[0];

if (sidebar.isOpen) {
    console.log('Sidebar is currently open');
} else {
    console.log('Sidebar is currently closed');
}
```

### Using State in Conditional Logic

```javascript
var sidebar = document.getElementById('sidebar').ej2_instances[0];

document.getElementById('actionButton').addEventListener('click', function () {
    if (sidebar.isOpen) {
        // Perform action when sidebar is visible
        sidebar.hide();
    } else {
        // Perform different action when sidebar is hidden
        sidebar.show();
    }
});
```

## Common State Patterns

### Pattern 1: Show/Hide Buttons

Separate buttons for opening and closing:

```cshtml
<div style="margin-bottom: 20px;">
    <ejs-button id="showBtn" content="Show" cssClass="e-success"></ejs-button>
    <ejs-button id="hideBtn" content="Hide" cssClass="e-danger"></ejs-button>
</div>

<ejs-sidebar id="sidebar" type="Push" isOpen="false">
    <e-content-template><p>Content</p></e-content-template>
</ejs-sidebar>

<script>
document.addEventListener('DOMContentLoaded', function () {
    var sidebar = document.getElementById('sidebar').ej2_instances[0];
    
    document.getElementById('showBtn').addEventListener('click', function () {
        sidebar.show();
    });
    
    document.getElementById('hideBtn').addEventListener('click', function () {
        sidebar.hide();
    });
});
</script>
```

### Pattern 2: Single Toggle Button

One button to toggle open/close:

```cshtml
<ejs-button id="toggleBtn" content="Menu" isToggle="true"></ejs-button>

<ejs-sidebar id="sidebar" type="Push" isOpen="false">
    <e-content-template><p>Navigation</p></e-content-template>
</ejs-sidebar>

<script>
document.addEventListener('DOMContentLoaded', function () {
    var sidebar = document.getElementById('sidebar').ej2_instances[0];
    
    document.getElementById('toggleBtn').addEventListener('click', function () {
        sidebar.toggle();
    });
});
</script>
```

### Pattern 3: Navigation Link Click

Close sidebar when user clicks a navigation link:

```cshtml
<ejs-sidebar id="sidebar" type="Over" isOpen="false">
    <e-content-template>
        <ul style="list-style: none; padding-left: 0; margin: 0;">
            <li><a href="/" class="nav-link">Home</a></li>
            <li><a href="/about" class="nav-link">About</a></li>
            <li><a href="/contact" class="nav-link">Contact</a></li>
        </ul>
    </e-content-template>
</ejs-sidebar>

<script>
document.addEventListener('DOMContentLoaded', function () {
    var sidebar = document.getElementById('sidebar').ej2_instances[0];
    var links = document.querySelectorAll('.nav-link');
    
    links.forEach(function (link) {
        link.addEventListener('click', function () {
            sidebar.hide(); // Close when link clicked
        });
    });
});
</script>
```

### Pattern 4: Responsive State Management

Auto-close on mobile, keep open on desktop:

```cshtml
<ejs-sidebar id="sidebar" type="Auto" isOpen="false">
    <e-content-template><p>Menu</p></e-content-template>
</ejs-sidebar>

<ejs-button id="toggleBtn" content="Menu"></ejs-button>

<script>
document.addEventListener('DOMContentLoaded', function () {
    var sidebar = document.getElementById('sidebar').ej2_instances[0];
    
    document.getElementById('toggleBtn').addEventListener('click', function () {
        sidebar.toggle();
    });
    
    // Handle window resize
    window.addEventListener('resize', function () {
        // Auto type handles this automatically
    });
});
</script>
```

## Button Integration

### Complete Sidebar with Multiple Button Controls

```cshtml
<div style="padding: 15px; background-color: #2c3e50; color: white; display: flex; gap: 10px;">
    <ejs-button id="toggleBtn" content="☰ Toggle" cssClass="e-light"></ejs-button>
    <ejs-button id="openBtn" content="↧ Open" cssClass="e-light"></ejs-button>
    <ejs-button id="closeBtn" content="↥ Close" cssClass="e-light"></ejs-button>
</div>

<ejs-sidebar id="dashboard-sidebar" type="Push" isOpen="false" width="250px">
    <e-content-template>
        <div style="padding: 20px;">
            <h3>Dashboard</h3>
            <ul style="list-style: none; padding-left: 0;">
                <li style="padding: 8px 0;"><strong>◆ Overview</strong></li>
                <li style="padding: 8px 0;">Analytics</li>
                <li style="padding: 8px 0;">Reports</li>
                <li style="padding: 8px 0;">Settings</li>
            </ul>
        </div>
    </e-content-template>
</ejs-sidebar>

<div style="padding: 20px; height: 300px; background-color: #ecf0f1;">
    <h1>Dashboard Content</h1>
    <p>Use buttons above to control sidebar state</p>
</div>

<script>
document.addEventListener('DOMContentLoaded', function () {
    var sidebar = document.getElementById('dashboard-sidebar').ej2_instances[0];
    
    document.getElementById('toggleBtn').addEventListener('click', function () {
        sidebar.toggle();
    });
    
    document.getElementById('openBtn').addEventListener('click', function () {
        sidebar.show();
    });
    
    document.getElementById('closeBtn').addEventListener('click', function () {
        sidebar.hide();
    });
});
</script>
```

## Responding to State Changes

Listen for state change events using the `change` event to execute code when the sidebar opens or closes.

### Using the change Event

```cshtml
<ejs-sidebar id="sidebar" type="Push" isOpen="false" change="onStateChange">
    <e-content-template><p>Menu</p></e-content-template>
</ejs-sidebar>

<div id="status" style="padding: 20px;"></div>

<script>
document.addEventListener('DOMContentLoaded', function () {
    function onStateChange(args) {
        var status = document.getElementById('status');
        
        if (args.name === 'change') {
            status.innerHTML = '<p>Sidebar is now: <strong>' + (args.element.classList.contains('e-open') ? 'OPEN' : 'CLOSED') + '</strong></p>';
        }
    };
});
</script>
```

## State Persistence

Use `enablePersistence="true"` to maintain sidebar state across page reloads:

```cshtml
<ejs-sidebar id="sidebar" type="Push" isOpen="false" enablePersistence="true">
    <e-content-template>
        <p>This state is saved!</p>
    </e-content-template>
</ejs-sidebar>
```

With persistence enabled, if a user closes the sidebar and refreshes the page, the sidebar remains closed.

## Troubleshooting State Issues

### Issue: Sidebar Won't Open

**Symptom:** `show()` is called but sidebar doesn't open

**Solutions:**
1. Check that sidebar ID is correct in JavaScript
2. Verify sidebar instance is properly accessed: `document.getElementById('id').ej2_instances[0]`
3. Ensure sidebar is not hidden with CSS `display: none`
4. Check browser console for errors

### Issue: State Not Persisting

**Symptom:** Sidebar state resets on page reload

**Solutions:**
1. Add `enablePersistence="true"` to sidebar tag
2. Verify browser localStorage is not disabled
3. Check that enablePersistence property is properly recognized

### Issue: Multiple Clicks Required to Open/Close

**Symptom:** Clicking button multiple times before sidebar responds

**Solutions:**
1. Add debouncing to prevent rapid clicks
2. Use single `toggle()` call instead of both `show()` and `hide()`
3. Check for JavaScript errors in console

---

**Next Step:** Learn about [Positioning and Sizing](positioning-and-sizing.md) the sidebar with width and target properties.
