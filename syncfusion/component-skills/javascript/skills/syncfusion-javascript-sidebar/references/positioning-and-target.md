# Positioning and Target

## Table of Contents
- [Implicit Targeting (Recommended)](#implicit-targeting-recommended)
- [Explicit Targeting (Advanced)](#explicit-targeting-advanced)
- [Target Selector Patterns](#target-selector-patterns)
- [Fixed Positioning](#fixed-positioning)

## Implicit Targeting (Recommended)

### How Implicit Targeting Works

By default, **the sidebar automatically targets the next sibling `<div>` element** without any configuration:

```typescript
let sidebar: Sidebar = new Sidebar({
    type: 'Push'
});
sidebar.appendTo('#sidebar');
```

### HTML Structure

The sidebar element must have an immediate next sibling `<div>` that becomes the target:

```html
<aside id="sidebar">
    <div class="title">Navigation</div>
    <ul>
        <li>Home</li>
        <li>About</li>
    </ul>
</aside>

<!-- Next sibling div - automatically becomes target -->
<div>
    <div class="content">
        <h1>Main Content</h1>
        <p>This content will be pushed/slid when sidebar opens</p>
    </div>
</div>
```

### Advantages of Implicit Targeting

- ✅ **Simple**: No configuration needed
- ✅ **Clean**: No wrapper elements required
- ✅ **Semantic**: Follows natural HTML flow
- ✅ **Responsive**: Works with any layout structure
- ✅ **Recommended**: Best practice for most applications

### When to Use Implicit Targeting

Use implicit targeting (recommended approach):
- Standard page layouts with sidebar and main content
- Most applications where sidebar should affect all content
- Mobile-first responsive designs
- Simple navigation patterns

## Explicit Targeting (Advanced)

### How Explicit Targeting Works

Explicitly specify which element the sidebar should target using the `target` property:

```typescript
let sidebar: Sidebar = new Sidebar({
    type: 'Push',
    target: '#content-area'  // Explicit selector
});
sidebar.appendTo('#sidebar');
```

### Critical: Required Inner Wrapper

**⚠️ IMPORTANT**: When using explicit targeting, you **MUST include an inner `<div>` wrapper** inside the target container for CSS transforms to work:

```html
<!-- Explicit target requires inner wrapper -->
<aside id="sidebar">
    <div class="title">Navigation</div>
</aside>

<div id="content-area">              <!-- Explicit target -->
    <div>                             <!-- REQUIRED: Inner wrapper -->
        <button>Toggle Sidebar</button>
        <div class="content">
            <h1>Main Content</h1>
            <p>Content goes here</p>
        </div>
    </div>
</div>
```

### Why the Inner Wrapper is Required

The CSS transform applied to the sidebar effect needs a direct child element to work properly. Without it:
- ❌ Transform doesn't apply
- ❌ Content doesn't move/push
- ❌ Sidebar appears broken

With inner wrapper:
- ✅ Transform applies correctly
- ✅ Content responds to sidebar state
- ✅ Animations work smoothly

### When to Use Explicit Targeting

Use explicit targeting only when:
- You need to **exclude certain elements** from sidebar effects (header, footer, fixed items)
- You have **complex layouts** with multiple sections
- You need **fine-grained control** over transformation scope
- Different page sections should respond differently to sidebar

## Target Selector Patterns

### By Element ID

```typescript
let sidebar: Sidebar = new Sidebar({
    target: '#main-content',
    type: 'Push'
});
sidebar.appendTo('#sidebar');
```

```html
<div id="main-content">
    <div><!-- Required wrapper -->
        Content here
    </div>
</div>
```

### By CSS Class

```typescript
let sidebar: Sidebar = new Sidebar({
    target: '.main-container',
    type: 'Push'
});
sidebar.appendTo('#sidebar');
```

```html
<div class="main-container">
    <div><!-- Required wrapper -->
        Content here
    </div>
</div>
```

### By HTMLElement Reference

```typescript
const targetElement = document.querySelector('.content-area') as HTMLElement;

let sidebar: Sidebar = new Sidebar({
    target: targetElement,
    type: 'Push'
});
sidebar.appendTo('#sidebar');
```

## Layout Examples

### Example 1: Full-Width Content (Implicit)

```html
<!-- Implicit targeting - next sibling -->
<aside id="sidebar">Navigation</aside>
<div>
    <div>All content pushed together</div>
</div>
```

### Example 2: Exclude Header and Footer (Explicit)

```html
<!-- Header stays fixed -->
<header>My App</header>

<!-- Sidebar -->
<aside id="sidebar">Navigation</aside>

<!-- Only main content is pushed -->
<div id="main">
    <div><!-- Required wrapper -->
        <div class="content">Main content</div>
    </div>
</div>

<!-- Footer stays fixed -->
<footer>Footer</footer>

<script>
let sidebar = new Sidebar({
    target: '#main',  // Only main content affected
    type: 'Push'
});
sidebar.appendTo('#sidebar');
</script>
```

### Example 3: Nested Multiple Targets

```html
<aside id="sidebar">Navigation</aside>

<!-- Primary content area -->
<div id="primary">
    <div>
        <section class="hero">Featured content</section>
    </div>
</div>

<!-- Secondary sidebar -->
<aside id="secondary-sidebar">Secondary nav</aside>

<script>
let primarySidebar = new Sidebar({
    target: '#primary',
    type: 'Push'
});
primarySidebar.appendTo('#sidebar');
</script>
```

### Example 4: Responsive with Multiple Targets

```typescript
import { Sidebar } from '@syncfusion/ej2-navigations';

const isMobile = window.matchMedia('(max-width: 768px)').matches;

let sidebar: Sidebar = new Sidebar({
    type: 'Push',
    // On mobile: target all content for full effect
    // On desktop: target only main area to preserve sidebar
    target: isMobile ? 'body' : '#main-content'
});
sidebar.appendTo('#sidebar');
```

## Fixed Positioning

### Sidebar with Fixed Header

Keep header fixed while sidebar affects main content:

```html
<header class="fixed-header">
    <h1>App Title</h1>
    <button id="toggle">Menu</button>
</header>

<div class="main-layout">
    <aside id="sidebar">
        <nav><!-- Navigation --></nav>
    </aside>
    
    <div id="content">
        <div><!-- Required wrapper for explicit target -->
            <div class="page-content">Page content</div>
        </div>
    </div>
</div>

<style>
.fixed-header {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 100;  /* Above sidebar */
}

.main-layout {
    margin-top: 60px;  /* Space for header */
    display: flex;
}

#sidebar {
    width: 280px;
}

#content {
    flex: 1;
}
</style>
```

```typescript
let sidebar: Sidebar = new Sidebar({
    target: '#content',  // Only content, not header
    type: 'Push',
    width: '280px'
});
sidebar.appendTo('#sidebar');
```

### Sidebar with Fixed Footer

```html
<div class="main-layout">
    <aside id="sidebar">Navigation</aside>
    <div id="main">
        <div><!-- Required wrapper -->
            <header class="page-header">Page Title</header>
            <div class="page-content">Content</div>
        </div>
    </div>
</div>

<footer class="fixed-footer">
    Footer content
</footer>

<style>
.fixed-footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 100;
}

.main-layout {
    display: flex;
    min-height: calc(100vh - 60px);  /* Exclude footer height */
}
</style>
```

## Stacking Context and Z-Index

Control layering when using multiple sidebars or overlays:

```css
/* Main sidebar on top */
#sidebar {
    z-index: 1000;
}

/* Backdrop behind sidebar */
.e-sidebar.e-over::before {
    z-index: 999;
}

/* Fixed header above all */
.fixed-header {
    z-index: 1100;
}

/* Secondary sidebar */
#secondary-sidebar {
    z-index: 500;  /* Below main sidebar */
}
```

## Complete Working Example

```typescript
import { Sidebar } from '@syncfusion/ej2-navigations';
import { Button } from '@syncfusion/ej2-buttons';

// Initialize with explicit target and inner wrapper
let sidebar: Sidebar = new Sidebar({
    type: 'Push',
    target: '#main-content',
    width: '280px',
    showBackdrop: false
});
sidebar.appendTo('#sidebar');

// Toggle button
let toggleBtn: Button = new Button({
    content: 'Menu',
    iconCss: 'e-icons e-menu'
}, '#toggle');

document.querySelector('#toggle')?.addEventListener('click', () => {
    sidebar.toggle();
});
```

HTML with proper structure:

```html
<header class="app-header">
    <button id="toggle">Menu</button>
    <h1>Application</h1>
</header>

<aside id="sidebar">
    <nav>
        <ul>
            <li>Home</li>
            <li>About</li>
        </ul>
    </nav>
</aside>

<div id="main-content">          <!-- Explicit target -->
    <div>                         <!-- Required wrapper -->
        <main class="page-content">
            <h2>Main Content</h2>
            <p>Content area</p>
        </main>
    </div>
</div>

<footer class="app-footer">
    <p>Copyright 2026</p>
</footer>
```

## Common Patterns

**Pattern: Simple Default (Implicit)**
```typescript
let sidebar = new Sidebar({ type: 'Push' });
sidebar.appendTo('#sidebar');
```

**Pattern: Advanced Control (Explicit)**
```typescript
let sidebar = new Sidebar({
    target: '#content',
    type: 'Push'
});
sidebar.appendTo('#sidebar');
// Remember: target must have inner wrapper!
```

## Next Steps

- Learn **Sidebar Types and Positions** for different expand behaviors
- Explore **Docking Sidebar** for icon-based navigation
- Check **Styling and Theming** for custom appearance
