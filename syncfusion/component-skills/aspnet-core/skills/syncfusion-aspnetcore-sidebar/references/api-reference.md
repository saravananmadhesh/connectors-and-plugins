# Complete API Reference

## Table of Contents
- [Properties](#properties)
- [Methods](#methods)
- [Events](#events)
- [Type Enumerations](#type-enumerations)
- [Event Arguments](#event-arguments)
- [Quick Reference by Feature](#quick-reference-by-feature)

## Properties

### Core Configuration Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `animate` | boolean | true | Enable/disable smooth animations when expanding or collapsing the sidebar |
| `enableDock` | boolean | false | Enable docking mode where sidebar collapses to a smaller width (dockSize) instead of closing completely |
| `enableGestures` | boolean | true | Enable gesture support for swiping to open/close sidebar on touch devices |
| `enablePersistence` | boolean | false | Enable localStorage persistence to remember the sidebar's open/close state across page reloads |
| `enableRtl` | boolean | false | Enable right-to-left layout for Arabic, Hebrew, Farsi, and other RTL languages |
| `isOpen` | boolean | false | Get or set the current open/close state of the sidebar. true = open, false = closed |
| `showBackdrop` | boolean | false | Show semi-transparent backdrop overlay behind the sidebar when it's open (typically used with Over type) |
| `type` | SidebarType | Slide | The type of sidebar behavior: Over (overlay), Push (content shifts), Slide (translation), or Auto (responsive) |

### Sizing and Positioning Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `dockSize` | string \| number | "70px" | Width of the sidebar when in docked state (when enableDock="true"). Accepts px, %, or numeric values |
| `position` | SidebarPosition | Left | Position of the sidebar: Left or Right. In RTL mode, this reverses automatically |
| `width` | string \| number | "100%" | Width of the sidebar when fully open. Accepts px, %, or numeric values |
| `zIndex` | number | 1000 | CSS z-index for controlling stacking order of overlaid sidebars. Higher values appear above lower values |

### Target and Layout Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `closeOnDocumentClick` | boolean | false | Automatically close the sidebar when clicking outside of it. Useful for modal-style sidebars |
| `mediaQuery` | string | none | CSS media query string (e.g., "max-width: 768px") to trigger Auto type sidebar behavior at specific breakpoints |
| `target` | string \| HTMLElement | null | CSS selector string or HTMLElement reference specifying which element the sidebar should be appended to. By default, appends to body |

---

## Methods

### State Management Methods

#### show()
Opens the sidebar with animation.
```typescript
sidebar.show();
```

#### hide()
Closes the sidebar with animation.
```typescript
sidebar.hide();
```

#### toggle()
Toggles the sidebar state - opens if closed, closes if open. Most commonly used method.
```typescript
sidebar.toggle();
```

### Lifecycle Methods

#### destroy()
Destroy the sidebar component and clean up resources. Removes event listeners and DOM elements.
```typescript
sidebar.destroy();
```

## Events

### 5 Core Events

#### change
Fires when the sidebar's open/close state changes. Provides detailed change information.

**When it fires:**
- Always when sidebar state changes (open → closed or closed → open)
- For state changes via show(), hide(), toggle()
- For state changes via user interaction (click, gesture)

**Event argument:** `ChangeEventArgs`

```cshtml
<ejs-sidebar id="my-sidebar" change="onChange"></ejs-sidebar>

<script>
function onChange(args) {
    console.log('State changed to:', args.name); // 'isOpen' 
    console.log('New value:', args.element); // sidebar element
}
</script>
```

#### open
Fires when the sidebar transitions to open state.

**When it fires:**
- After sidebar fully opens (animation complete if animate=true)
- After show() method completes
- After toggle() that results in open state

**Event argument:** `EventArgs`

```cshtml
<ejs-sidebar id="my-sidebar" open="onOpen"></ejs-sidebar>

<script>
function onOpen(args) {
    console.log('Sidebar opened');
    // Lazy load content here
}
</script>
```

#### close
Fires when the sidebar transitions to closed state.

**When it fires:**
- After sidebar fully closes (animation complete)
- After hide() method completes
- After toggle() that results in closed state

**Event argument:** `EventArgs`

```cshtml
<ejs-sidebar id="my-sidebar" close="onClose"></ejs-sidebar>

<script>
function onClose(args) {
    console.log('Sidebar closed');
    // Cleanup or save state here
}
</script>
```

#### created
Fires after the sidebar component is fully initialized and added to the DOM.

**When it fires:**
- Once during component initialization (runs once per page load)
- After all properties are set and DOM is ready

**Event argument:** `Object`

```cshtml
<ejs-sidebar id="my-sidebar" created="onCreated"></ejs-sidebar>

<script>
function onCreated() {
    console.log('Sidebar created and ready');
    // Set up keyboard shortcuts, etc.
}
</script>
```

#### destroyed
Fires right before the sidebar component is destroyed and removed from the DOM.

**When it fires:**
- When destroy() method is called
- When component is being unloaded

**Event argument:** `Object`

```cshtml
<ejs-sidebar id="my-sidebar" destroyed="onDestroyed"></ejs-sidebar>

<script>
function onDestroyed() {
    console.log('Sidebar destroyed');
    // Cleanup custom resources
}
</script>
```

---

## Type Enumerations

### SidebarType Enum

Controls how the sidebar behaves when open/closed.

```typescript
enum SidebarType {
    Over = 'Over',      // Floats above content without affecting layout
    Push = 'Push',      // Pushes main content to the side
    Slide = 'Slide',    // Slides in from the side using transform
    Auto = 'Auto'       // Responsive - switches between types based on viewport
}
```

#### Over
Sidebar floats above the page content without affecting layout. Content stays in place.

**Use cases:**
- Mobile apps with limited space
- Overlay navigation menus
- Modals and panels

```cshtml
<ejs-sidebar type="Over"><!-- Floats above --></ejs-sidebar>
```

#### Push
Sidebar pushes the main content to the side. Content layout shifts to accommodate.

**Use cases:**
- Desktop dashboards
- Admin panels where sidebar is permanent
- Fixed-width navigation

```cshtml
<ejs-sidebar type="Push"><!-- Pushes content --></ejs-sidebar>
```

#### Slide
Sidebar slides in using CSS transform, most performant for animations.

**Use cases:**
- Mobile-first designs
- Performance-critical applications
- Gesture-driven interfaces

```cshtml
<ejs-sidebar type="Slide"><!-- Smooth slide animation --></ejs-sidebar>
```

#### Auto
Responsive type that switches behavior based on `mediaQuery`. Over type when narrow, Push type when wide.

**Use cases:**
- Responsive web applications
- Adapts to viewport changes
- Mobile to desktop adaptation

```cshtml
<ejs-sidebar type="Auto" mediaQuery="max-width: 768px">
    <!-- Behaves as Over on mobile, Push on desktop -->
</ejs-sidebar>
```

### SidebarPosition Enum

Controls which side of the screen the sidebar appears.

```typescript
enum SidebarPosition {
    Left = 'Left',    // Sidebar on left side
    Right = 'Right'   // Sidebar on right side
}
```

#### Left
Sidebar positioned on the left side of the viewport.

```cshtml
<ejs-sidebar position="Left"><!-- On the left --></ejs-sidebar>
```

#### Right
Sidebar positioned on the right side of the viewport.

```cshtml
<ejs-sidebar position="Right"><!-- On the right --></ejs-sidebar>
```

**RTL Interaction:** In RTL mode (enableRtl="true"), these reverse:
- position="Left" appears on the right
- position="Right" appears on the left

---

## Event Arguments

### ChangeEventArgs

Argument object passed to the `change` event handler.

| Property | Type | Description |
|----------|------|-------------|
| `name` | string | Name of the property that changed. For sidebar open/close, typically "isOpen" |
| `element` | HTMLElement | Reference to the sidebar's root DOM element |
| `event` | Event | The UI event that triggered the change (click, keyboard, etc.) |
| `isInteracted` | boolean | true if change was triggered by user interaction (click, gesture), false if programmatic (show/hide method) |

**Example usage:**
```typescript
function onSidebarChange(args: ChangeEventArgs) {
    console.log('Property changed:', args.name);
    console.log('DOM element:', args.element);
    console.log('User interaction?', args.isInteracted);
}
```

### EventArgs

Standard event argument object for `open`, `close`, `created`, and `destroyed` events.

| Property | Type | Description |
|----------|------|-------------|
| `type` | string | Event type name |

**Example usage:**
```typescript
function onSidebarOpen(args: EventArgs) {
    console.log('Event type:', args.type);
}
```

---

## Quick Reference by Feature

### State Control
- Property: `isOpen`
- Methods: `show()`, `hide()`, `toggle()`
- Event: `change`, `open`, `close`

**See detailed guide:** [Managing State](managing-state.md)

### Sidebar Types
- Property: `type` (Over, Push, Slide, Auto)
- Property: `mediaQuery` (for Auto type)
- Event: `open`, `close` (behavior varies by type)

**See detailed guide:** [Understanding Types](sidebar-types.md)

### Visual Appearance
- Property: `animate` (enable/disable animations)
- Property: `zIndex` (stacking order)
- Event: `open`, `close` (detect animation completion)

**See detailed guide:** [Styling and Appearance](styling-and-appearance.md)

### Layout Control
- Property: `position` (Left or Right)
- Property: `width` (sizing)
- Property: `target` (container target)

**See detailed guide:** [Positioning and Sizing](positioning-and-sizing.md)

### Advanced Features
- Property: `enableDock` + `dockSize` (docking)
- Property: `enableGestures` (touch support)
- Property: `closeOnDocumentClick` (modal behavior)
- Property: `showBackdrop` (overlay effect)
- Property: `enablePersistence` (state persistence)

**See detailed guide:** [Advanced Features](advanced-features.md)

### Internationalization
- Property: `enableRtl` (right-to-left support)

**See detailed guide:** [Internationalization](internationalization.md)

### Event Handling
- Methods: `addEventListener()`, `removeEventListener()`
- Events: `change`, `open`, `close`, `created`, `destroyed`

**See detailed guide:** [Events and Callbacks](events-and-callbacks.md)

### Initialization
- Method: `refresh()` (recalculate layout)
- Method: `destroy()` (cleanup)
- Method: `getRootElement()` (DOM access)
- Method: `appendTo()` (reposition)
- Event: `created`, `destroyed`

**See detailed guide:** [Getting Started](getting-started.md)

---

## Usage Patterns Summary

### Basic Sidebar Toggle
```cshtml
<ejs-sidebar id="sidebar" type="Push"></ejs-sidebar>
<ejs-button onclick="toggleSidebar()">Toggle</ejs-button>

<script>
function toggleSidebar() {
    var sidebar = document.getElementById('sidebar').ej2_instances[0];
    sidebar.toggle();
}
</script>
```

### Modal Sidebar with Backdrop
```cshtml
<ejs-sidebar type="Over" showBackdrop="true" closeOnDocumentClick="true">
    <!-- Modal content -->
</ejs-sidebar>
```

### Responsive Sidebar
```cshtml
<ejs-sidebar type="Auto" mediaQuery="max-width: 768px">
    <!-- Auto-switches based on viewport -->
</ejs-sidebar>
```

### Docked Sidebar
```cshtml
<ejs-sidebar enableDock="true" dockSize="70px">
    <!-- Docks to narrow width -->
</ejs-sidebar>
```

### RTL Sidebar
```cshtml
<ejs-sidebar enableRtl="true">
    <!-- Right-to-left layout -->
</ejs-sidebar>
```

### Persistent Sidebar
```cshtml
<ejs-sidebar enablePersistence="true">
    <!-- State persists across page reloads -->
</ejs-sidebar>
```

---

## Complete Property Reference Table

| Category | Property | Type | Default | Purpose | Reference Guide |
|----------|----------|------|---------|---------|-----------------|
| **State** | isOpen | boolean | false | Current open/close state | [Managing State](managing-state.md) |
| **Behavior** | type | SidebarType | Slide | Over/Push/Slide/Auto | [Understanding Types](sidebar-types.md) |
| **Animation** | animate | boolean | true | Enable smooth transitions | [Styling](styling-and-appearance.md) |
| **Positioning** | position | SidebarPosition | Left | Left or Right | [Positioning](positioning-and-sizing.md) |
| **Sizing** | width | string\|number | 100% | Sidebar width | [Positioning](positioning-and-sizing.md) |
| **Docking** | enableDock | boolean | false | Enable dock mode | [Advanced](advanced-features.md) |
| **Dock Size** | dockSize | string\|number | 70px | Width when docked | [Advanced](advanced-features.md) |
| **Touch** | enableGestures | boolean | true | Enable swipe/gesture | [Advanced](advanced-features.md) |
| **Persistence** | enablePersistence | boolean | false | Remember state | [Advanced](advanced-features.md) |
| **RTL** | enableRtl | boolean | false | Right-to-left layout | [Internationalization](internationalization.md) |
| **Overlay** | showBackdrop | boolean | false | Show backdrop | [Advanced](advanced-features.md) |
| **Click Outside** | closeOnDocumentClick | boolean | false | Close on outside click | [Advanced](advanced-features.md) |
| **Stacking** | zIndex | number | 1000 | CSS z-index | [Styling](styling-and-appearance.md) |
| **Responsive** | mediaQuery | string | none | Breakpoint for Auto type | [Positioning](positioning-and-sizing.md) |
| **Container** | target | string\|HTMLElement | null | Target container | [Positioning](positioning-and-sizing.md) |

---

## Method Quick Reference

| Method | Purpose | Returns | Example |
|--------|---------|---------|---------|
| `show()` | Open sidebar | void | `sidebar.show()` |
| `hide()` | Close sidebar | void | `sidebar.hide()` |
| `toggle()` | Toggle state | void | `sidebar.toggle()` |
| `refresh()` | Recalculate | void | `sidebar.refresh()` |
| `destroy()` | Cleanup | void | `sidebar.destroy()` |
| `getRootElement()` | Get DOM element | HTMLElement | `var el = sidebar.getRootElement()` |
| `appendTo(target)` | Reposition | void | `sidebar.appendTo('#container')` |
| `dataBind()` | Apply changes | void | `sidebar.dataBind()` |
| `addEventListener()` | Attach listener | void | `sidebar.addEventListener('show', handler)` |
| `removeEventListener()` | Detach listener | void | `sidebar.removeEventListener('show', handler)` |
| `Inject()` | Initialize modules | void | `sidebar.Inject(SidebarAnimation)` |

---

**For comprehensive feature guides, explore the reference documentation. For quick start, see [Getting Started](getting-started.md).**
