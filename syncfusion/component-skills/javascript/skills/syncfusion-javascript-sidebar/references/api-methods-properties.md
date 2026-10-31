# API Methods and Properties Reference

## Table of Contents
- [Quick Navigation to API Docs](#quick-navigation-to-api-docs)
- [Essential Properties (Complete Examples)](#essential-properties-complete-examples)
- [Configuration Properties (See Linked Guides)](#configuration-properties-see-linked-guides)
- [State Properties (Complete Examples)](#state-properties-complete-examples)
- [Methods Overview](#methods-overview)
- [Complete Configuration Example](#complete-configuration-example)

## Quick Navigation to API Docs

For detailed examples and use cases, refer to these specific guides:

| Property/Method | Coverage | Reference |
|-----------------|----------|-----------|
| `type` | Four expand types: Over, Push, Slide, Auto | [sidebar-types-and-positions.md](sidebar-types-and-positions.md) |
| `position` | Left or Right positioning | [sidebar-types-and-positions.md](sidebar-types-and-positions.md) |
| `target` | Implicit & explicit targeting with inner wrapper | [positioning-and-target.md](positioning-and-target.md) |
| `animate` | Animation enable/disable, timing, easing | [animations-and-gestures.md](animations-and-gestures.md) |
| `enableGestures` | Swipe and touch support | [animations-and-gestures.md](animations-and-gestures.md) |
| `enableDock` | Docking mode configuration | [docking-sidebar.md](docking-sidebar.md) |
| `dockSize` | Dock state width | [docking-sidebar.md](docking-sidebar.md) |
| `mediaQuery` | Responsive breakpoints | [auto-close-responsive.md](auto-close-responsive.md) |
| `closeOnDocumentClick` | Auto-close on outside click | [auto-close-responsive.md](auto-close-responsive.md) |
| `show()` | Open sidebar method | [open-and-close.md](open-and-close.md) |
| `hide()` | Close sidebar method | [open-and-close.md](open-and-close.md) |
| `toggle()` | Toggle sidebar state | [open-and-close.md](open-and-close.md) |
| Events: `open`, `close`, `change`, `created`, `destroyed` | All state and lifecycle events | [open-and-close.md](open-and-close.md) |

---

## Essential Properties (Complete Examples)

### width
**Type:** `string | number` | **Default:** `'auto'`

Specifies the width of the sidebar in pixels, percentages, or auto.

```typescript
import { Sidebar } from '@syncfusion/ej2-navigations';

// Fixed pixel width
let sidebar1: Sidebar = new Sidebar({ width: '280px', type: 'Push' });
sidebar1.appendTo('#sidebar');

// Percentage width
let sidebar2: Sidebar = new Sidebar({ width: '30%', type: 'Push' });
sidebar2.appendTo('#sidebar');

// Auto width (based on content)
let sidebar3: Sidebar = new Sidebar({ width: 'auto', type: 'Push' });
sidebar3.appendTo('#sidebar');

// Numeric value (interpreted as pixels)
let sidebar4: Sidebar = new Sidebar({ width: 300, type: 'Push' });
sidebar4.appendTo('#sidebar');
```

### showBackdrop
**Type:** `boolean` | **Default:** `false`

Apply overlay/backdrop to main content when sidebar is open.

```typescript
// With backdrop overlay
let sidebarWithBackdrop: Sidebar = new Sidebar({
    type: 'Over',
    width: '280px',
    showBackdrop: true  // Semi-transparent overlay behind sidebar
});
sidebarWithBackdrop.appendTo('#sidebar');

// Without backdrop (default)
let sidebarNoBackdrop: Sidebar = new Sidebar({
    type: 'Over',
    width: '280px',
    showBackdrop: false
});
sidebarNoBackdrop.appendTo('#sidebar');
```

### zIndex
**Type:** `string | number` | **Default:** `1000`

Set z-index of sidebar (applicable for overlay types only).

```typescript
// Default z-index
let defaultZ: Sidebar = new Sidebar({ type: 'Over', zIndex: 1000 });
defaultZ.appendTo('#sidebar');

// Custom z-index
let highZ: Sidebar = new Sidebar({ type: 'Over', zIndex: 9999 });
highZ.appendTo('#sidebar');

// Z-index as string
let stringZ: Sidebar = new Sidebar({ type: 'Over', zIndex: '2000' });
stringZ.appendTo('#sidebar');
```

---

## Configuration Properties (See Linked Guides)

These properties are detailed in their respective guides:

- **`type`** (Over, Push, Slide, Auto) → [See sidebar-types-and-positions.md](sidebar-types-and-positions.md)
- **`position`** (Left, Right) → [See sidebar-types-and-positions.md](sidebar-types-and-positions.md)
- **`target`** (Implicit/Explicit targeting) → [See positioning-and-target.md](positioning-and-target.md)
- **`animate`** (Enable/disable animations) → [See animations-and-gestures.md](animations-and-gestures.md)
- **`enableGestures`** (Swipe support) → [See animations-and-gestures.md](animations-and-gestures.md)
- **`enableDock`** (Docking mode) → [See docking-sidebar.md](docking-sidebar.md)
- **`dockSize`** (Dock state width) → [See docking-sidebar.md](docking-sidebar.md)
- **`mediaQuery`** (Responsive breakpoints) → [See auto-close-responsive.md](auto-close-responsive.md)
- **`closeOnDocumentClick`** (Auto-close) → [See auto-close-responsive.md](auto-close-responsive.md)

---

## State Properties (Complete Examples)

### isOpen
**Type:** `boolean` | **Default:** `false`

Gets or sets whether sidebar is open or closed.

```typescript
let sidebar: Sidebar = new Sidebar({ type: 'Push', width: '280px' });
sidebar.appendTo('#sidebar');

// Check current state
if (sidebar.isOpen) {
    console.log('Sidebar is open');
} else {
    console.log('Sidebar is closed');
}

// Set initial state to open
let openSidebar: Sidebar = new Sidebar({ isOpen: true, type: 'Push' });
openSidebar.appendTo('#sidebar');

// Toggle based on current state
if (sidebar.isOpen) {
    sidebar.hide();
} else {
    sidebar.show();
}
```

### enableRtl
**Type:** `boolean` | **Default:** `false`

Enable Right-to-Left (RTL) mode for sidebar display.

```typescript
// LTR mode (default)
let ltrSidebar: Sidebar = new Sidebar({ enableRtl: false, position: 'Left' });
ltrSidebar.appendTo('#sidebar');

// RTL mode
let rtlSidebar: Sidebar = new Sidebar({ enableRtl: true, position: 'Right' });
rtlSidebar.appendTo('#sidebar');

// Dynamic RTL toggle
let toggleRtlBtn = document.querySelector('#toggle-rtl');
if (toggleRtlBtn) {
    toggleRtlBtn.addEventListener('click', () => {
        sidebar.enableRtl = !sidebar.enableRtl;
        sidebar.refresh();
    });
}
```

### enablePersistence
**Type:** `boolean` | **Default:** `false`

Enable persisting sidebar state (position and type) between page reloads.

```typescript
// Persistence enabled - state saved in localStorage
let persistentSidebar: Sidebar = new Sidebar({
    enablePersistence: true,
    position: 'Left',
    type: 'Auto'
});
persistentSidebar.appendTo('#sidebar');

// Persisted automatically:
// - Position (Left/Right)
// - Type (Over/Push/Slide/Auto)
// - Current open/close state

// Manual state management (alternative)
const saveState = (sidebar: Sidebar) => {
    sessionStorage.setItem('sidebarState', JSON.stringify({
        isOpen: sidebar.isOpen,
        position: sidebar.position,
        type: sidebar.type,
        width: sidebar.width
    }));
};

const restoreState = (sidebar: Sidebar) => {
    const saved = sessionStorage.getItem('sidebarState');
    if (saved) {
        const state = JSON.parse(saved);
        Object.assign(sidebar, state);
        sidebar.refresh();
    }
};
```

---

## Methods Overview

### State Control Methods
- **`show()`** - Opens sidebar → [See open-and-close.md](open-and-close.md)
- **`hide()`** - Closes sidebar → [See open-and-close.md](open-and-close.md)
- **`toggle()`** - Toggle open/close → [See open-and-close.md](open-and-close.md)

### Utility Methods (Complete Examples Below)
- **`getRootElement()`** - Get root DOM element
- **`destroy()`** - Remove from DOM
- **`refresh()`** - Re-render component
- **`dataBind()`** - Apply property changes

### Event Management (Complete Examples Below)
- **`addEventListener()`** - Add event listener
- **`removeEventListener()`** - Remove event listener

---

## Utility Methods (Detailed)

### getRootElement()
Returns the root HTMLElement of the sidebar component.

```typescript
let sidebar: Sidebar = new Sidebar({ type: 'Push', width: '280px' });
sidebar.appendTo('#sidebar');

// Get root element
let rootElement = sidebar.getRootElement();
if (rootElement) {
    // Apply custom classes or styles
    rootElement.classList.add('custom-sidebar');
    rootElement.style.borderRadius = '8px';
    
    // Add event listeners to root
    rootElement.addEventListener('mouseenter', () => {
        console.log('Sidebar hovered');
    });
}
```

### destroy()
Removes sidebar from DOM and detaches all event handlers.

```typescript
let sidebar: Sidebar = new Sidebar({ type: 'Push', width: '280px' });
sidebar.appendTo('#sidebar');

// Destroy sidebar
function destroySidebar() {
    if (sidebar) {
        // Close if open
        if (sidebar.isOpen) {
            sidebar.hide();
        }
        
        // Destroy component
        sidebar.destroy();
        sidebar = null;
    }
}
```

### refresh()
Applies pending property changes and re-renders the component.

```typescript
let sidebar: Sidebar = new Sidebar({ type: 'Push', width: '280px' });
sidebar.appendTo('#sidebar');

// Modify properties
sidebar.type = 'Over';
sidebar.position = 'Right';
sidebar.width = '300px';
sidebar.enableRtl = true;

// Refresh to apply all changes
sidebar.refresh();
```

### dataBind()
Applies pending property changes to the component model.

```typescript
let sidebar: Sidebar = new Sidebar({ type: 'Push', width: '280px' });
sidebar.appendTo('#sidebar');

// Apply multiple changes
sidebar.width = '320px';
sidebar.position = 'Right';
sidebar.animate = false;

// Immediate binding
sidebar.dataBind();

// Note: Use refresh() for complete re-render with DOM updates
```

---

## Event Management Methods

### addEventListener()
Adds event listener for sidebar events.

```typescript
let sidebar: Sidebar = new Sidebar({ type: 'Push', width: '280px' });
sidebar.appendTo('#sidebar');

// Add listeners (see open-and-close.md for full event signatures)
sidebar.addEventListener('open', (args) => {
    console.log('Sidebar opened');
});

sidebar.addEventListener('close', (args) => {
    console.log('Sidebar closed');
});

sidebar.addEventListener('change', (args) => {
    console.log('State changed');
});

sidebar.addEventListener('created', () => {
    console.log('Sidebar created');
});

sidebar.addEventListener('destroyed', () => {
    console.log('Sidebar destroyed');
});

// Multiple listeners for same event work fine
sidebar.addEventListener('open', () => console.log('First listener'));
sidebar.addEventListener('open', () => console.log('Second listener'));
```

### removeEventListener()
Removes event listener from sidebar.

```typescript
const openHandler = (args) => console.log('Opened');

// Add listener
sidebar.addEventListener('open', openHandler);

// Remove specific listener
sidebar.removeEventListener('open', openHandler);

// For complete event signatures and event properties,
// see open-and-close.md
```

---

## Complete Configuration Example

```typescript
import { Sidebar } from '@syncfusion/ej2-navigations';

let sidebar: Sidebar = new Sidebar({
    // Essential Properties
    type: 'Auto',
    position: 'Left',
    width: '280px',
    target: '#content',
    
    // Configuration (see linked guides for details)
    animate: true,
    closeOnDocumentClick: true,
    enableGestures: true,
    enableDock: true,
    dockSize: '64px',
    mediaQuery: '(min-width: 768px)',
    
    // Appearance
    showBackdrop: true,
    zIndex: 1000,
    enableRtl: false,
    
    // State
    isOpen: false,
    enablePersistence: true,
    
    // Lifecycle Events (see open-and-close.md for full signatures)
    created: function() {
        console.log('Sidebar created');
    },
    
    destroyed: function() {
        console.log('Sidebar destroyed');
    },
    
    // State Events
    open: function(args) {
        console.log('Sidebar opened');
    },
    
    close: function(args) {
        console.log('Sidebar closed');
    },
    
    change: function(args) {
        console.log('State changed');
    }
});

// Append to DOM
sidebar.appendTo('#sidebar');

// Add dynamic event listeners
sidebar.addEventListener('open', () => {
    console.log('Dynamic listener');
});

// Method invocations
// For show/hide/toggle, see open-and-close.md
document.querySelector('#show-btn')?.addEventListener('click', () => sidebar.show());
document.querySelector('#hide-btn')?.addEventListener('click', () => sidebar.hide());
document.querySelector('#toggle-btn')?.addEventListener('click', () => sidebar.toggle());

// State management
if (sidebar.isOpen) {
    sidebar.hide();
}

// Property changes
sidebar.width = '300px';
sidebar.type = 'Push';
sidebar.refresh();

// Get root element
let rootElement = sidebar.getRootElement();
```

---

## API Properties Summary Table

| Property | Type | Default | Purpose | Details |
|----------|------|---------|---------|---------|
| `type` | SidebarType | Auto | Expand behavior | [Types Guide](sidebar-types-and-positions.md) |
| `position` | SidebarPosition | Left | Position (L/R) | [Position Guide](sidebar-types-and-positions.md) |
| `width` | string \| number | auto | Sidebar width | See above ⬆️ |
| `target` | HTMLElement \| string | null | Target element | [Target Guide](positioning-and-target.md) |
| `showBackdrop` | boolean | false | Show overlay | See above ⬆️ |
| `animate` | boolean | true | Enable animations | [Animation Guide](animations-and-gestures.md) |
| `closeOnDocumentClick` | boolean | false | Auto-close | [Close Guide](auto-close-responsive.md) |
| `enableGestures` | boolean | true | Swipe support | [Gesture Guide](animations-and-gestures.md) |
| `enableDock` | boolean | false | Docking mode | [Dock Guide](docking-sidebar.md) |
| `dockSize` | string \| number | auto | Dock width | [Dock Guide](docking-sidebar.md) |
| `mediaQuery` | string \| MediaQueryList | null | Responsive | [Responsive Guide](auto-close-responsive.md) |
| `zIndex` | string \| number | 1000 | Z-index | See above ⬆️ |
| `isOpen` | boolean | false | Open state | See above ⬆️ |
| `enableRtl` | boolean | false | RTL mode | See above ⬆️ |
| `enablePersistence` | boolean | false | State persistence | See above ⬆️ |

---

## API Methods Summary

| Method | Purpose | Details |
|--------|---------|---------|
| `show()` | Open sidebar | [Control Guide](open-and-close.md) |
| `hide()` | Close sidebar | [Control Guide](open-and-close.md) |
| `toggle()` | Toggle state | [Control Guide](open-and-close.md) |
| `getRootElement()` | Get root element | See above ⬆️ |
| `destroy()` | Remove from DOM | See above ⬆️ |
| `refresh()` | Re-render | See above ⬆️ |
| `dataBind()` | Apply changes | See above ⬆️ |
| `addEventListener()` | Add listener | See above ⬆️ |
| `removeEventListener()` | Remove listener | See above ⬆️ |

---

## API Events Summary

| Event | Trigger | Args | Details |
|-------|---------|------|---------|
| `open` | Sidebar opens | EventArgs | [Events Guide](open-and-close.md) |
| `close` | Sidebar closes | EventArgs | [Events Guide](open-and-close.md) |
| `change` | State changes | ChangeEventArgs | [Events Guide](open-and-close.md) |
| `created` | Component created | Object | [Events Guide](open-and-close.md) |
| `destroyed` | Component destroyed | Object | [Events Guide](open-and-close.md) |

