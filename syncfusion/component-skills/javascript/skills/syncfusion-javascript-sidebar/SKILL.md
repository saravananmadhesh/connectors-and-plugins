---
name: syncfusion-javascript-sidebar
description: Build responsive sidebar navigation with Syncfusion Sidebar component. Supports multiple expand types (Over, Push, Slide, Auto), docking, animations, and gestures. Triggers when building navigation menus, mobile-friendly sidebars, dockable panels, or sidebars with list/tree views in TypeScript applications.
metadata:
  author: "Syncfusion Inc"
  version: "34.1.29"
---

# Syncfusion TypeScript Sidebar

The **Sidebar** is an expandable and collapsible navigation component that acts as a side container alongside main content. It's ideal for building responsive navigation menus, dockable panels, and mobile-friendly layouts in TypeScript applications using Syncfusion Essential JS 2.

## Key Features

- **Four Expand Types**: Over, Push, Slide, and Auto for flexible content interaction
- **Docking Support**: Reserve space for docked icons while maintaining full sidebar functionality
- **Animations & Gestures**: Smooth transitions with touch swipe and mobile gesture support
- **Responsive Design**: Auto-adjust behavior between desktop (Push) and mobile (Over) modes
- **Custom Targeting**: Position sidebar in any HTML container with implicit or explicit targeting
- **Content Integration**: Support for list views, tree views, and custom HTML content

## Navigation Guide

Read the appropriate reference file based on your task:

### Getting Started
📄 **Read:** [references/getting-started.md](references/getting-started.md) (~150 lines)
- Package installation and dependencies
- Project setup with webpack
- HTML structure and initialization
- CSS imports and configuration
- Running your first sidebar

### Target Property Behavior (Critical)
Two distinct modes for controlling which element the sidebar affects:

**Implicit Targeting (Recommended - Default):**
- Sidebar automatically targets the **next sibling `<div>`**
- No wrapper element needed
- Simple, clean code - use for most applications

**Explicit Targeting (Advanced):**
- Use `[target]="'#selector'"` property
- **Requires inner `<div>` wrapper** inside target container for CSS transforms
- Use when excluding elements (header, footer) or need fine-grained control

📄 **Read:** [references/positioning-and-target.md](references/positioning-and-target.md) (~160 lines)
- Target selectors and HTML structure
- Implicit vs explicit targeting patterns
- Fixed positioning and layout considerations
- Common target configuration scenarios

### Sidebar Types and Positions
📄 **Read:** [references/sidebar-types-and-positions.md](references/sidebar-types-and-positions.md) (~180 lines, with TOC)
- Four expand types explained: Over, Push, Slide, Auto
- Position options: Left or Right
- Type comparison table and when to use each
- Type switching and responsive behavior

### Open and Close Methods & Lifecycle Events
📄 **Read:** [references/open-and-close.md](references/open-and-close.md) (~250 lines)
- `show()`, `hide()`, `toggle()` methods
- State events: `open`, `close`, `change` with EventArgs properties
- Lifecycle events: `created`, `destroyed`
- Managing sidebar state programmatically
- Preventing default behavior with `args.cancel`
- User interaction detection with `args.isInteracted`

### Auto-Close and Responsive Behavior
📄 **Read:** [references/auto-close-responsive.md](references/auto-close-responsive.md) (~140 lines)
- `mediaQuery` property for responsive breakpoints
- Auto-close on document click behavior
- Close button implementation
- Mobile vs desktop viewport handling

### Docking Sidebar
📄 **Read:** [references/docking-sidebar.md](references/docking-sidebar.md) (~170 lines, with TOC)
- `enableDock` and `dockSize` properties
- Showing icons only in docked state
- CSS for text visibility control
- Docked state use cases

### Animations and Gestures
📄 **Read:** [references/animations-and-gestures.md](references/animations-and-gestures.md) (~200 lines, with TOC)
- `animate` property and timing configuration
- Gesture support: swipe and touch interactions
- Mobile interaction patterns
- Performance optimization for animations

### Content Integration
📄 **Read:** [references/content-integration.md](references/content-integration.md) (~180 lines, with TOC)
- Sidebar with list view content
- Sidebar with tree view content
- Multiple sidebar instances
- Multiple sidebars in same position
- Custom HTML content patterns

### Styling and Theming
📄 **Read:** [references/styling-and-theming.md](references/styling-and-theming.md) (~200 lines, with TOC)
- CSS classes and selectors (.e-sidebar, .e-open, .e-close, .e-dock)
- Customizing sidebars by type and position
- Backdrop styling and customization
- Responsive design and mobile styling

### Troubleshooting
📄 **Read:** [references/troubleshooting.md](references/troubleshooting.md) (~120 lines)
- Common issues and solutions
- Z-index and stacking context problems
- Performance optimization tips
- Gesture conflicts and gestures not working
- Mobile responsiveness debugging

### API Methods and Properties Reference
📄 **Read:** [references/api-methods-properties.md](references/api-methods-properties.md) (~580 lines, comprehensive API coverage)
- All sidebar **properties** with defaults and types: `type`, `position`, `width`, `target`, `showBackdrop`, `animate`, `closeOnDocumentClick`, `enableGestures`, `enableDock`, `dockSize`, `mediaQuery`, `zIndex`, `isOpen`, `enableRtl`, `enablePersistence`
- All **methods** with working examples: `show()`, `hide()`, `toggle()`, `getRootElement()`, `destroy()`, `refresh()`, `dataBind()`
- Event listener management: `addEventListener()`, `removeEventListener()`
- Responsive configuration examples
- Persistence and state management
- RTL and internationalization support

## Quick Start Example

### Implicit Targeting (Recommended)

```typescript
import { Sidebar } from '@syncfusion/ej2-navigations';

// Create sidebar - automatically targets next sibling div
let sidebar: Sidebar = new Sidebar({
    type: 'Push',
    width: '280px'
});
sidebar.appendTo('#sidebar');

// Toggle on button click
document.querySelector('#toggle')?.addEventListener('click', () => {
    sidebar.toggle();
});
```

```html
<!-- HTML Structure - sidebar targets main-content automatically -->
<aside id="sidebar">
    <div class="title">Navigation Menu</div>
    <ul>
        <li>Home</li>
        <li>About</li>
        <li>Contact</li>
    </ul>
</aside>

<!-- Next sibling - automatically becomes target -->
<div id="main-content">
    <button id="toggle">Toggle Sidebar</button>
    <div class="content">Main content here</div>
</div>
```

### Explicit Targeting (With Inner Wrapper)

```typescript
let sidebar: Sidebar = new Sidebar({
    type: 'Push',
    target: '#content-area',  // Explicit target selector
    width: '280px'
});
sidebar.appendTo('#sidebar');
```

```html
<!-- Explicit target requires inner wrapper div -->
<aside id="sidebar">
    <div class="title">Navigation</div>
</aside>

<div id="content-area">              <!-- Explicit target -->
    <div>                             <!-- REQUIRED: Inner wrapper -->
        <button id="toggle">Toggle</button>
        <div class="content">Main content</div>
    </div>
</div>
```

## Common Patterns

### Pattern 1: Mobile-Responsive Sidebar

```typescript
let sidebar: Sidebar = new Sidebar({
    type: 'Auto',  // Over on mobile, Push on desktop
    mediaQuery: window.matchMedia('(max-width: 768px)'),
    width: '280px'
});
sidebar.appendTo('#sidebar');
```

### Pattern 2: Docked Icon Sidebar

```typescript
let sidebar: Sidebar = new Sidebar({
    enableDock: true,
    dockSize: '72px',
    width: '220px'
});
sidebar.appendTo('#sidebar');

// CSS for docked state
// .e-dock.e-close span.e-text { display: none; }
// .e-dock.e-open span.e-text { display: inline-block; }
```

### Pattern 3: Toggle with Events

```typescript
let sidebar: Sidebar = new Sidebar({
    open: (e) => console.log('Sidebar opened'),
    close: (e) => console.log('Sidebar closed'),
    showBackdrop: true
});
sidebar.appendTo('#sidebar');

// Programmatic control
document.querySelector('#open')?.addEventListener('click', () => sidebar.show());
document.querySelector('#close')?.addEventListener('click', () => sidebar.hide());
document.querySelector('#toggle')?.addEventListener('click', () => sidebar.toggle());
```

## Key Properties Reference

| Property | Type | Default | Purpose |
|----------|------|---------|---------|
| `type` | 'Over' \| 'Push' \| 'Slide' \| 'Auto' | 'Auto' | Expand behavior |
| `position` | 'Left' \| 'Right' | 'Left' | Sidebar position |
| `width` | string | '100%' | Sidebar width |
| `target` | string | null | Target element selector (explicit) |
| `enableDock` | boolean | false | Enable dock/collapsed state |
| `dockSize` | string | '52px' | Width when docked |
| `showBackdrop` | boolean | false | Show overlay backdrop |
| `animate` | boolean | true | Enable animations |
| `mediaQuery` | MediaQueryList | null | Responsive breakpoint |
| `isOpen` | boolean | false | Initial open state |

## Common Use Cases

- **Navigation Menu**: Main app navigation with collapsible menu items
- **Dockable Panel**: Icon-based navigation that expands on hover/click
- **Mobile Menu**: Touch-friendly sidebar using gestures and Auto type
- **Multi-Level Navigation**: Sidebar with list or tree view hierarchy
- **Admin Dashboard**: Collapsible sidebar with role-based menu items
- **Content Drawer**: Side panel for filters, settings, or additional content

---

**Next Steps:** Choose a reference file based on your current task and read the detailed documentation. Start with "Getting Started" if this is your first time using the Sidebar component.
