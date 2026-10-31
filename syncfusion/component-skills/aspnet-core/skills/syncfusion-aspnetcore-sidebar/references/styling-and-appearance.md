# Styling and Appearance Customization

## Table of Contents
- [Animation Control](#animation-control)
- [Z-Index Layering](#z-index-layering)
- [CSS Customization](#css-customization)
- [Theme Integration](#theme-integration)
- [Backdrop Styling](#backdrop-styling)
- [Custom Color Schemes](#custom-color-schemes)
- [Responsive Styling](#responsive-styling)
- [Animation Timing](#animation-timing)
- [Advanced Styling Patterns](#advanced-styling-patterns)

## Animation Control

The `animate` property controls whether the sidebar uses smooth transitions when expanding or collapsing.

### animate Property

- `true` (default) - Smooth animations enabled
- `false` - Instant state changes, no animation

### Disabling Animations

```cshtml
<!-- Instant open/close without animation -->
<ejs-sidebar id="no-anim-sidebar" type="Push" animate="false">
    <e-content-template>
        <p>No animation - instant state change</p>
    </e-content-template>
</ejs-sidebar>

<ejs-button id="toggleBtn" content="Toggle (No Animation)"></ejs-button>

<script>
document.addEventListener('DOMContentLoaded', function () {
    var sidebar = document.getElementById('no-anim-sidebar').ej2_instances[0];
    document.getElementById('toggleBtn').addEventListener('click', function () {
        sidebar.toggle();
    });
});
</script>
```

### Enabling Animations (Default)

```cshtml
<!-- With animations (default behavior) -->
<ejs-sidebar id="anim-sidebar" type="Push" animate="true">
    <e-content-template>
        <p>Smooth animation transitions</p>
    </e-content-template>
</ejs-sidebar>

<ejs-button id="toggleBtn" content="Toggle (With Animation)"></ejs-button>

<script>
document.addEventListener('DOMContentLoaded', function () {
    var sidebar = document.getElementById('anim-sidebar').ej2_instances[0];
    document.getElementById('toggleBtn').addEventListener('click', function () {
        sidebar.toggle(); // Smooth transition
    });
});
</script>
```

### Animation Timing Examples

```html
<style>
    /* Customize animation timing via CSS classes */
    .sidebar-fast {
        transition-duration: 0.2s;
    }
    
    .sidebar-smooth {
        transition-duration: 0.5s;
    }
    
    .sidebar-slow {
        transition-duration: 1s;
    }
</style>

<ejs-sidebar id="custom-anim" class="sidebar-smooth">
    <e-content-template><p>Custom animation timing</p></e-content-template>
</ejs-sidebar>
```

## Z-Index Layering

The `zIndex` property controls the stacking order of overlaid sidebars relative to other page elements.

### Understanding Z-Index

Z-index determines which element appears on top when overlapping:
- Higher values = appear on top
- Lower values = appear behind
- Only applies to overlay (`Over` type) sidebars

### Default Z-Index

```cshtml
<!-- Default z-index: 1000 -->
<ejs-sidebar id="default-zindex" type="Over">
    <e-content-template>
        <p>Z-index: 1000 (default)</p>
    </e-content-template>
</ejs-sidebar>
```

### Custom Z-Index Values

```cshtml
<!-- Elevated z-index for priority display -->
<ejs-sidebar id="high-zindex" type="Over" zIndex="2000">
    <e-content-template>
        <p>Z-index: 2000 (above default modals)</p>
    </e-content-template>
</ejs-sidebar>

<!-- Low z-index for background display -->
<ejs-sidebar id="low-zindex" type="Over" zIndex="500">
    <e-content-template>
        <p>Z-index: 500 (behind other overlays)</p>
    </e-content-template>
</ejs-sidebar>
```

### Z-Index Layering Strategy

```html
<style>
    /* Typical z-index layering for web applications */
    .page-background { z-index: 1; }
    .tooltip { z-index: 1400; }
    .modal-dialog { z-index: 1300; }
    .sidebar-overlay { z-index: 1100; /* Use in Sidebar */ }
    .modal-backdrop { z-index: 1050; }
    .default-content { z-index: 1; }
</style>
```

### Z-Index for Multiple Overlays

```cshtml
<ejs-sidebar id="sidebar-main" type="Over" zIndex="1100">
    <e-content-template><p>Main Sidebar</p></e-content-template>
</ejs-sidebar>

<!-- Secondary sidebar must have lower z-index to stay behind -->
<ejs-sidebar id="sidebar-secondary" type="Over" zIndex="1050">
    <e-content-template><p>Secondary Sidebar</p></e-content-template>
</ejs-sidebar>

<div style="position: fixed; top: 50%; left: 50%; width: 400px; background: white; 
            border: 1px solid #ccc; z-index: 1200;">
    <!-- Modal dialog with z-index 1200 appears above sidebars -->
    <p>This modal dialog (z-index: 1200) appears above sidebars</p>
</div>
```

## CSS Customization

The sidebar component uses standard CSS classes for styling. You can override them with custom CSS.

### Standard Sidebar CSS Classes

```css
.e-sidebar { /* Main sidebar container */ }
.e-sidebar.e-open { /* When sidebar is open */ }
.e-sidebar.e-close { /* When sidebar is closed */ }
.e-sidebar-overlay { /* Backdrop overlay */ }
```

### Custom Styling Example

```html
<style>
    /* Custom sidebar appearance */
    .custom-sidebar.e-sidebar {
        background-color: #2c3e50;
        color: white;
        box-shadow: 2px 0 8px rgba(0,0,0,0.15);
    }
    
    .custom-sidebar.e-sidebar a {
        color: #ecf0f1;
        text-decoration: none;
    }
    
    .custom-sidebar.e-sidebar a:hover {
        color: #3498db;
        background-color: rgba(52, 152, 219, 0.1);
        padding-left: 10px;
        transition: all 0.3s ease;
    }
</style>

<ejs-sidebar id="styled-sidebar" class="custom-sidebar" type="Push">
    <e-content-template>
        <div style="padding: 20px;">
            <h3>Custom Styled Menu</h3>
            <a href="/">Dashboard</a><br>
            <a href="/">Analytics</a><br>
            <a href="/">Settings</a>
        </div>
    </e-content-template>
</ejs-sidebar>
```

### Sidebar Content Styling

```html
<style>
    .sidebar-dark {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
    }
    
    .sidebar-light {
        background: white;
        color: #333;
        border-right: 1px solid #e0e0e0;
    }
    
    .sidebar-minimal {
        background: none;
        border: none;
    }
</style>

<ejs-sidebar id="gradient-sidebar" class="sidebar-dark" type="Push">
    <e-content-template>
        <div style="padding: 20px; color: white;">
            <h3>Gradient Sidebar</h3>
        </div>
    </e-content-template>
</ejs-sidebar>
```

## Theme Integration

Syncfusion provides multiple themes that automatically style all components, including the Sidebar.

### Available Themes

The following themes are available via CDN:

1. **Fluent** - Modern, clean design (recommended)
2. **Bootstrap** - Bootstrap-style theme
3. **Material** - Material Design theme
4. **Tailwind** - Tailwind CSS inspired
5. **Fabric** - Microsoft Fabric design

### Loading Different Themes

In your `_Layout.cshtml`:

```html
<!-- Fluent Theme (Default) -->
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/26.1.35/fluent.css" />

<!-- Or Material Theme -->
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/26.1.35/material.css" />

<!-- Or Bootstrap Theme -->
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/26.1.35/bootstrap.css" />
```

### Theme-Specific Sidebar Rendering

```cshtml
<!-- Sidebar automatically adapts to loaded theme -->
<ejs-sidebar id="themed-sidebar" type="Push">
    <e-content-template>
        <h3>Theme-Aware Sidebar</h3>
        <p>Automatically styled by loaded theme</p>
    </e-content-template>
</ejs-sidebar>
```

### Dark Theme Example

```html
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/26.1.35/material-dark.css" />

<!-- Sidebar renders in dark theme colors automatically -->
```

## Backdrop Styling

The `showBackdrop` property displays an overlay. You can customize its appearance with CSS.

### Backdrop CSS Class

```html
<style>
    .e-sidebar-overlay {
        background-color: rgba(0, 0, 0, 0.5);  /* Semi-transparent black */
    }
    
    /* Custom backdrop styling */
    .e-sidebar-overlay.custom-backdrop {
        background: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.5));
        backdrop-filter: blur(4px);
    }
</style>

<ejs-sidebar id="custom-backdrop-sidebar" type="Over" showBackdrop="true" class="custom-backdrop">
    <e-content-template>
        <p>Custom backdrop with blur effect</p>
    </e-content-template>
</ejs-sidebar>
```

### Backdrop Opacity Levels

```html
<style>
    .backdrop-subtle .e-sidebar-overlay {
        background-color: rgba(0, 0, 0, 0.2);
    }
    
    .backdrop-medium .e-sidebar-overlay {
        background-color: rgba(0, 0, 0, 0.5);
    }
    
    .backdrop-strong .e-sidebar-overlay {
        background-color: rgba(0, 0, 0, 0.8);
    }
</style>

<ejs-sidebar id="subtle-bg" type="Over" showBackdrop="true" class="backdrop-subtle">
    <e-content-template><p>Subtle backdrop</p></e-content-template>
</ejs-sidebar>
```

## Custom Color Schemes

### Color Scheme Examples

```html
<style>
    /* Professional Dark Scheme */
    .scheme-dark.e-sidebar {
        background-color: #1e1e1e;
        color: #e0e0e0;
    }
    
    /* Vibrant Scheme */
    .scheme-vibrant.e-sidebar {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
    }
    
    /* Minimalist Scheme */
    .scheme-minimal.e-sidebar {
        background-color: #fafafa;
        color: #424242;
        border-right: 1px solid #e0e0e0;
    }
    
    /* Corporate Scheme */
    .scheme-corporate.e-sidebar {
        background-color: #0d47a1;
        color: #ffffff;
    }
</style>

<ejs-sidebar id="vibrant-sidebar" class="scheme-vibrant" type="Push">
    <e-content-template>
        <h3>Vibrant Color Scheme</h3>
    </e-content-template>
</ejs-sidebar>
```

## Responsive Styling

### Media Query Styling

```html
<style>
    /* Mobile first */
    .responsive-sidebar.e-sidebar {
        width: 100%;
        background-color: #f5f5f5;
    }
    
    /* Tablet */
    @media (min-width: 768px) {
        .responsive-sidebar.e-sidebar {
            width: 280px;
            background-color: #fff;
        }
    }
    
    /* Desktop */
    @media (min-width: 1200px) {
        .responsive-sidebar.e-sidebar {
            width: 320px;
            box-shadow: 2px 0 8px rgba(0,0,0,0.1);
        }
    }
</style>

<ejs-sidebar id="responsive-style" class="responsive-sidebar" type="Auto">
    <e-content-template>
        <p>Responsive styling</p>
    </e-content-template>
</ejs-sidebar>
```

## Animation Timing

### CSS Animation Customization

```html
<style>
    /* Fast animation */
    .fast-animation.e-sidebar {
        transition: all 0.2s ease-out;
    }
    
    /* Smooth animation */
    .smooth-animation.e-sidebar {
        transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    /* Slow animation */
    .slow-animation.e-sidebar {
        transition: all 1s ease-in-out;
    }
</style>

<ejs-sidebar id="smooth-sidebar" class="smooth-animation" type="Push">
    <e-content-template><p>Smooth transition</p></e-content-template>
</ejs-sidebar>
```

## Advanced Styling Patterns

### Pattern 1: Sidebar with Icons and Labels

```cshtml
<style>
    .icon-sidebar.e-sidebar {
        background-color: #34495e;
        padding: 10px 0;
    }
    
    .icon-sidebar .menu-item {
        display: flex;
        align-items: center;
        padding: 15px;
        color: white;
        text-decoration: none;
        transition: all 0.3s ease;
    }
    
    .icon-sidebar .menu-item:hover {
        background-color: #3498db;
        padding-left: 20px;
    }
    
    .icon-sidebar .menu-icon {
        margin-right: 15px;
        font-size: 20px;
    }
</style>

<ejs-sidebar id="icon-sidebar" class="icon-sidebar" type="Push" width="280px">
    <e-content-template>
        <a href="/" class="menu-item">
            <span class="menu-icon">📊</span>
            <span>Dashboard</span>
        </a>
        <a href="/" class="menu-item">
            <span class="menu-icon">👥</span>
            <span>Users</span>
        </a>
        <a href="/" class="menu-item">
            <span class="menu-icon">⚙️</span>
            <span>Settings</span>
        </a>
    </e-content-template>
</ejs-sidebar>
```

### Pattern 2: Accordion Sidebar

```cshtml
<style>
    .accordion-sidebar .section-title {
        background-color: #ecf0f1;
        padding: 12px 15px;
        cursor: pointer;
        font-weight: bold;
        user-select: none;
        transition: background-color 0.2s ease;
    }
    
    .accordion-sidebar .section-title:hover {
        background-color: #bdc3c7;
    }
    
    .accordion-sidebar .section-items {
        display: none;
        max-height: 0;
        overflow: hidden;
    }
    
    .accordion-sidebar .section-items.active {
        display: block;
    }
</style>

<ejs-sidebar id="accordion-sidebar" class="accordion-sidebar" type="Push">
    <e-content-template>
        <div class="section-title">General</div>
        <div class="section-items active">
            <a href="/" style="display: block; padding: 10px 15px; text-decoration: none;">Home</a>
            <a href="/" style="display: block; padding: 10px 15px; text-decoration: none;">Dashboard</a>
        </div>
        
        <div class="section-title">Management</div>
        <div class="section-items">
            <a href="/" style="display: block; padding: 10px 15px; text-decoration: none;">Users</a>
            <a href="/" style="display: block; padding: 10px 15px; text-decoration: none;">Roles</a>
        </div>
    </e-content-template>
</ejs-sidebar>
```

### Pattern 3: Gradient Sidebar with Hover Effects

```html
<style>
    .gradient-sidebar.e-sidebar {
        background: linear-gradient(180deg, #667eea 0%, #764ba2 100%);
        color: white;
    }
    
    .gradient-sidebar .nav-link {
        display: block;
        padding: 12px 20px;
        color: rgba(255,255,255,0.8);
        text-decoration: none;
        border-left: 3px solid transparent;
        transition: all 0.3s ease;
    }
    
    .gradient-sidebar .nav-link:hover {
        color: white;
        background-color: rgba(255,255,255,0.1);
        border-left-color: #3498db;
        padding-left: 25px;
    }
</style>

<ejs-sidebar id="gradient-nav" class="gradient-sidebar" type="Push">
    <e-content-template>
        <a href="/" class="nav-link">Home</a>
        <a href="/" class="nav-link">Features</a>
        <a href="/" class="nav-link">Documentation</a>
        <a href="/" class="nav-link">Support</a>
    </e-content-template>
</ejs-sidebar>
```

---

**Next Step:** Explore the [Complete API Reference](api-reference.md) for all available properties, methods, and events.
