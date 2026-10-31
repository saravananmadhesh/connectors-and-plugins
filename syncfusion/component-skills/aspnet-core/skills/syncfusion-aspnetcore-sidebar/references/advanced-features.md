# Advanced Sidebar Features

## Table of Contents
- [Docking Sidebar](#docking-sidebar)
- [Close on Document Click](#close-on-document-click)
- [Gesture Support](#gesture-support)
- [Media Query Responsiveness](#media-query-responsiveness)
- [Persistence Across Reloads](#persistence-across-reloads)
- [Backdrop Overlay](#backdrop-overlay)
- [Z-Index Management](#z-index-management)
- [Advanced Patterns](#advanced-patterns)

## Docking Sidebar

Docking enables a sidebar to remain partially visible when collapsed, reserving space for icons or abbreviated content. This is useful for creating persistent micro-interactions and maintaining navigation context without consuming full width.

### enableDock Property

The `enableDock` property activates docking mode. When enabled, the sidebar shows a reduced version (defined by `dockSize`) when collapsed, instead of completely disappearing.

### dockSize Property

The `dockSize` property specifies the width of the sidebar in docked (collapsed) state. It accepts string values with units (`'60px'`, `'auto'`) or numeric values.

### Basic Docking Example

```cshtml
<ejs-sidebar id="docked-sidebar" type="Push" enableDock="true" dockSize="70px" width="280px">
    <e-content-template>
        <div style="padding: 15px;">
            <h3>Navigation</h3>
            <ul style="list-style: none; padding-left: 0;">
                <li style="padding: 12px 0; text-align: center;">
                    <span style="font-size: 20px;">📊</span>
                    <div style="font-size: 12px; margin-top: 5px;">Dashboard</div>
                </li>
                <li style="padding: 12px 0; text-align: center;">
                    <span style="font-size: 20px;">👥</span>
                    <div style="font-size: 12px; margin-top: 5px;">Users</div>
                </li>
                <li style="padding: 12px 0; text-align: center;">
                    <span style="font-size: 20px;">📋</span>
                    <div style="font-size: 12px; margin-top: 5px;">Reports</div>
                </li>
                <li style="padding: 12px 0; text-align: center;">
                    <span style="font-size: 20px;">⚙️</span>
                    <div style="font-size: 12px; margin-top: 5px;">Settings</div>
                </li>
            </ul>
        </div>
    </e-content-template>
</ejs-sidebar>

<div style="padding: 20px;">
    <h1>Main Content</h1>
    <p>Sidebar docks to 70px width when collapsed but maintains full 280px when expanded</p>
</div>
```

### Docking with Auto Size

```cshtml
<!-- Dock size automatically calculated -->
<ejs-sidebar id="auto-dock-sidebar" type="Push" enableDock="true" dockSize="auto" width="300px">
    <e-content-template>
        <p>Auto-sized dock</p>
    </e-content-template>
</ejs-sidebar>
```

### Docking State Behavior

When a sidebar with docking enabled is in collapsed state:
- Space is reserved (dockSize width)
- Icon-only or abbreviated content is visible
- Main content area accommodates the docked space
- Smooth transition between docked and expanded states

## Close on Document Click

The `closeOnDocumentClick` property automatically closes the sidebar when the user clicks anywhere outside of it. This is useful for modal-style sidebars or overlay navigation.

### closeOnDocumentClick Default Behavior

```cshtml
<!-- Sidebar doesn't close on document click (default) -->
<ejs-sidebar id="persistent-sidebar" type="Push">
    <e-content-template>
        <p>Stays open until explicitly closed</p>
    </e-content-template>
</ejs-sidebar>
```

### Enabling Close on Document Click

```cshtml
<!-- Click outside sidebar to close it -->
<ejs-sidebar id="auto-close-sidebar" type="Over" closeOnDocumentClick="true" showBackdrop="true">
    <e-content-template>
        <div style="padding: 20px;">
            <h3>Modal Menu</h3>
            <p>Click outside to close</p>
            <ul style="list-style: none; padding-left: 0;">
                <li><a href="/">Option 1</a></li>
                <li><a href="/">Option 2</a></li>
                <li><a href="/">Option 3</a></li>
            </ul>
        </div>
    </e-content-template>
</ejs-sidebar>

<div style="padding: 20px; background-color: #f5f5f5; height: 300px;">
    <h1>Main Content</h1>
    <p>Click outside the sidebar to close it</p>
</div>

<ejs-button id="openModal" content="Open Menu"></ejs-button>

<script>
document.addEventListener('DOMContentLoaded', function () {
    var sidebar = document.getElementById('auto-close-sidebar').ej2_instances[0];
    document.getElementById('openModal').addEventListener('click', function () {
        sidebar.show();
    });
});
</script>
```

### Modal Pattern with closeOnDocumentClick

```cshtml
<!-- Classic modal menu pattern -->
<ejs-sidebar id="modal-menu" type="Over" closeOnDocumentClick="true" 
             showBackdrop="true" isOpen="false">
    <e-content-template>
        <div style="padding: 20px; background-color: #fff; height: 100%;">
            <h3>Navigation Menu</h3>
            <nav style="list-style: none; padding-left: 0;">
                <a href="/" style="display: block; padding: 10px 0; text-decoration: none;">Dashboard</a>
                <a href="/" style="display: block; padding: 10px 0; text-decoration: none;">Analytics</a>
                <a href="/" style="display: block; padding: 10px 0; text-decoration: none;">Settings</a>
            </nav>
        </div>
    </e-content-template>
</ejs-sidebar>

<ejs-button id="menuBtn" content="☰ Menu"></ejs-button>

<script>
document.addEventListener('DOMContentLoaded', function () {
    var sidebar = document.getElementById('modal-menu').ej2_instances[0];
    document.getElementById('menuBtn').addEventListener('click', function () {
        sidebar.toggle();
    });
});
</script>
```

## Gesture Support

The `enableGestures` property enables touch gestures for opening and closing the sidebar on touch devices. Users can swipe from the edge to open or swipe the sidebar to close it.

### enableGestures Property

- `true` (default) - Gestures are enabled
- `false` - Gestures are disabled (keyboard/button control only)

### Enabling Gestures

```cshtml
<!-- Touch swipe gestures enabled (default) -->
<ejs-sidebar id="gesture-sidebar" type="Over" enableGestures="true" isOpen="false">
    <e-content-template>
        <div style="padding: 20px;">
            <h3>Mobile Menu</h3>
            <p>Swipe from the left edge to open</p>
            <p>Swipe on the sidebar to close</p>
            <ul style="list-style: none; padding-left: 0;">
                <li style="padding: 8px 0;">Home</li>
                <li style="padding: 8px 0;">About</li>
                <li style="padding: 8px 0;">Contact</li>
            </ul>
        </div>
    </e-content-template>
</ejs-sidebar>

<div style="padding: 20px; background-color: #f5f5f5; height: 400px;">
    <h1>Main Content</h1>
    <p>On mobile devices, try swiping from the left edge to open the menu</p>
</div>
```

### Disabling Gestures

```cshtml
<!-- Gestures disabled - use buttons only -->
<ejs-sidebar id="no-gesture-sidebar" type="Push" enableGestures="false">
    <e-content-template>
        <p>Open/close using buttons only</p>
    </e-content-template>
</ejs-sidebar>

<ejs-button id="toggleBtn" content="Open Menu"></ejs-button>

<script>
document.addEventListener('DOMContentLoaded', function () {
    var sidebar = document.getElementById('no-gesture-sidebar').ej2_instances[0];
    document.getElementById('toggleBtn').addEventListener('click', function () {
        sidebar.toggle();
    });
});
</script>
```

### Gesture Behavior by Type

| Type | Gesture Behavior |
|------|-----------------|
| Over | Swipe from edge opens; swipe on sidebar closes |
| Push | Swipe from edge opens; swipe closes |
| Slide | Swipe gestures work smoothly |
| Auto | Responds to device-specific gestures |

## Media Query Responsiveness

The `mediaQuery` property enables automatic sidebar state control based on CSS media queries. This allows the sidebar to automatically open/close based on screen resolution, providing responsive behavior without manual JavaScript.

### mediaQuery Property

The `mediaQuery` property accepts a CSS media query string. When the query matches, the sidebar automatically opens. When it doesn't match, it closes.

### Responsive Breakpoint Example

```cshtml
<!-- Sidebar opens automatically on screens wider than 600px -->
<ejs-sidebar id="responsive-sidebar" type="Auto" mediaQuery="(min-width: 600px)" isOpen="false">
    <e-content-template>
        <div style="padding: 20px;">
            <h3>Responsive Navigation</h3>
            <p>Automatically opens on wider screens</p>
            <ul style="list-style: none; padding-left: 0;">
                <li>Menu Item 1</li>
                <li>Menu Item 2</li>
                <li>Menu Item 3</li>
            </ul>
        </div>
    </e-content-template>
</ejs-sidebar>

<div style="padding: 20px; background-color: #f5f5f5; min-height: 400px;">
    <h1>Responsive Content</h1>
    <p>Resize your browser window to see automatic sidebar behavior change</p>
    <p>Sidebar opens on screens wider than 600px</p>
</div>
```

### Multiple Breakpoints

```cshtml
<!-- Complex media query with multiple conditions -->
<ejs-sidebar id="complex-responsive" type="Auto" 
             mediaQuery="(min-width: 768px) and (max-width: 1024px) and (orientation: landscape)">
    <e-content-template>
        <p>Specific responsive behavior</p>
    </e-content-template>
</ejs-sidebar>
```

### Common Media Query Patterns

```cshtml
<!-- Mobile first: Open on tablet and above -->
<ejs-sidebar mediaQuery="(min-width: 768px)">
    <!-- Opens on tablet (768px+) -->
</ejs-sidebar>

<!-- Large screens only: Open on desktop -->
<ejs-sidebar mediaQuery="(min-width: 1200px)">
    <!-- Opens on desktop (1200px+) -->
</ejs-sidebar>

<!-- Landscape only -->
<ejs-sidebar mediaQuery="(orientation: landscape)">
    <!-- Opens in landscape orientation -->
</ejs-sidebar>

<!-- Portrait only -->
<ejs-sidebar mediaQuery="(orientation: portrait) and (max-width: 768px)">
    <!-- Opens in portrait mode on small screens -->
</ejs-sidebar>
```

## Persistence Across Reloads

The `enablePersistence` property saves the sidebar state (open/closed) to browser localStorage, preserving it across page reloads and browser sessions.

### enablePersistence Property

- `true` - State is persisted to browser storage
- `false` (default) - State is not persisted

### Enabling State Persistence

```cshtml
<!-- Sidebar state persists across page reloads -->
<ejs-sidebar id="persistent-sidebar" type="Push" enablePersistence="true" isOpen="false">
    <e-content-template>
        <div style="padding: 20px;">
            <h3>Persistent Navigation</h3>
            <p>Your sidebar state will be remembered!</p>
            <ul style="list-style: none; padding-left: 0;">
                <li style="padding: 8px 0;">Home</li>
                <li style="padding: 8px 0;">Settings</li>
                <li style="padding: 8px 0;">Profile</li>
            </ul>
        </div>
    </e-content-template>
</ejs-sidebar>

<div style="padding: 20px;">
    <ejs-button id="reloadBtn" content="Reload Page"></ejs-button>
    <p style="margin-top: 20px;">
        <strong>Try this:</strong> Open the sidebar, reload the page. The sidebar should remain open!
    </p>
</div>

<script>
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('reloadBtn').addEventListener('click', function () {
        location.reload();
    });
});
</script>
```

### What Gets Persisted

When `enablePersistence="true"`, the following state is preserved:

1. **Position** - Left or Right placement
2. **Type** - Over, Push, Slide, or Auto
3. **isOpen state** - Whether sidebar is open or closed

Storage Details:
- Browser localStorage is used
- Persisted per-component via unique ID
- Data survives browser refresh and closure
- Cleared when browser cache is cleared

## Backdrop Overlay

The `showBackdrop` property displays an overlay/backdrop behind the sidebar when it's open. This creates a modal-like visual effect and helps focus user attention on the sidebar content.

### showBackdrop Property

- `true` - Dark overlay appears behind sidebar
- `false` (default) - No backdrop overlay

### Enabling Backdrop

```cshtml
<!-- Sidebar with backdrop overlay -->
<ejs-sidebar id="backdrop-sidebar" type="Over" showBackdrop="true" isOpen="false">
    <e-content-template>
        <div style="padding: 20px; background-color: #fff;">
            <h3>Modal Navigation</h3>
            <p>Notice the semi-transparent overlay behind this sidebar</p>
            <ul style="list-style: none; padding-left: 0;">
                <li style="padding: 10px 0;">Dashboard</li>
                <li style="padding: 10px 0;">Analytics</li>
                <li style="padding: 10px 0;">Reports</li>
            </ul>
        </div>
    </e-content-template>
</ejs-sidebar>

<ejs-button id="showBackdrop" content="Open with Backdrop"></ejs-button>

<div style="padding: 20px; background-color: #f5f5f5; height: 300px;">
    <h1>Main Content</h1>
</div>

<script>
document.addEventListener('DOMContentLoaded', function () {
    var sidebar = document.getElementById('backdrop-sidebar').ej2_instances[0];
    document.getElementById('showBackdrop').addEventListener('click', function () {
        sidebar.toggle();
    });
});
</script>
```

### Backdrop with closeOnDocumentClick

Commonly used together for modal menu:

```cshtml
<!-- Modal menu: backdrop + document click to close -->
<ejs-sidebar id="modal-sidebar" type="Over" showBackdrop="true" 
             closeOnDocumentClick="true" isOpen="false">
    <e-content-template>
        <div style="padding: 20px;">
            <h3>Menu</h3>
            <p>Click outside to close</p>
        </div>
    </e-content-template>
</ejs-sidebar>

<ejs-button id="openMenu" content="Open Menu"></ejs-button>

<script>
document.addEventListener('DOMContentLoaded', function () {
    var sidebar = document.getElementById('modal-sidebar').ej2_instances[0];
    document.getElementById('openMenu').addEventListener('click', function () {
        sidebar.show();
    });
});
</script>
```

## Z-Index Management

The `zIndex` property controls the layering of the sidebar when it operates in overlay mode (Over type). This is important when there are other overlaid elements on the page.

### zIndex Property

- Default value: `1000`
- Higher values appear above lower values
- Only applicable when sidebar is an overlay (Over type)

### Setting Custom Z-Index

```cshtml
<!-- Sidebar with specific z-index -->
<ejs-sidebar id="zindex-sidebar" type="Over" zIndex="2000" isOpen="false">
    <e-content-template>
        <p>This sidebar appears above elements with z-index < 2000</p>
    </e-content-template>
</ejs-sidebar>

<!-- Modal backdrop typically z-index 1500, so sidebar needs > 1500 -->
```

### Z-Index for Multiple Overlays

```cshtml
<!-- First overlay element -->
<div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
            background: rgba(0,0,0,0.5); z-index: 1000;"></div>

<!-- Sidebar must have higher z-index -->
<ejs-sidebar id="high-zindex-sidebar" type="Over" zIndex="1100" isOpen="true">
    <e-content-template>
        <p>Sidebar appears above the overlay</p>
    </e-content-template>
</ejs-sidebar>
```

### Z-Index Layering Strategy

Standard z-index values for sidebar applications:

| Element | Z-Index | Purpose |
|---------|---------|---------|
| Backdrop/Overlay | 1000-1050 | Behind sidebar |
| Sidebar | 1100-1200 | Main navigation |
| Modals | 1300+ | Above sidebar |
| Tooltips | 1400+ | Above modals |

## Advanced Patterns

### Pattern 1: Progressive Enhancement Sidebar

```cshtml
<!-- Sidebar that enhances progressively based on device -->
<ejs-sidebar id="progressive" type="Auto" mediaQuery="(min-width: 768px)" 
             enableGestures="true" enablePersistence="true">
    <e-content-template>
        <p>Enhanced behavior on supported devices</p>
    </e-content-template>
</ejs-sidebar>
```

### Pattern 2: Docked + Gesture Sidebar

```cshtml
<!-- Docked navigation with touch support -->
<ejs-sidebar id="touch-dock" enableDock="true" dockSize="60px" 
             width="280px" enableGestures="true">
    <e-content-template>
        <p>Touch-friendly docked sidebar</p>
    </e-content-template>
</ejs-sidebar>
```

### Pattern 3: Complete Advanced Configuration

```cshtml
<!-- Sidebar with all advanced features -->
<ejs-sidebar id="advanced" type="Auto" position="Left" width="280px"
             enableDock="true" dockSize="60px" enableGestures="true"
             mediaQuery="(min-width: 768px)" enablePersistence="true"
             showBackdrop="true" closeOnDocumentClick="true" 
             zIndex="1100" animate="true">
    <e-content-template>
        <p>Fully featured advanced sidebar</p>
    </e-content-template>
</ejs-sidebar>
```

---

**Next Step:** Learn about [Events and Callbacks](events-and-callbacks.md) to respond to sidebar state changes.
