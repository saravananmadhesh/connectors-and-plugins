# Positioning and Sizing the Sidebar

## Table of Contents
- [Understanding Sidebar Positioning](#understanding-sidebar-positioning)
- [Position Property](#position-property)
- [Width Property](#width-property)
- [Target Property](#target-property)
- [Calculating Effective Width](#calculating-effective-width)
- [Responsive Sizing](#responsive-sizing)
- [Container-Specific Placement](#container-specific-placement)
- [Multi-Sidebar Layouts](#multi-sidebar-layouts)
- [Best Practices](#best-practices)
- [Common Sizing Patterns](#common-sizing-patterns)

## Understanding Sidebar Positioning

The Sidebar component supports precise control over positioning and sizing through three key properties: `position`, `width`, and `target`. These properties work together to define where the sidebar appears and how much space it occupies.

The `position` property controls left/right placement, `width` defines the physical dimensions, and `target` allows placement within specific containers instead of the full page.

## Position Property

The `position` property determines whether the sidebar aligns to the left or right side of the page or container. Valid values are defined by the `SidebarPosition` enumeration.

### SidebarPosition Values

- **Left** (default) - Sidebar appears on the left side
- **Right** - Sidebar appears on the right side

### Left Position (Default)

```cshtml
<!-- Sidebar on the left (default) -->
<ejs-sidebar id="left-sidebar" position="Left" type="Push">
    <e-content-template>
        <div style="padding: 20px;">
            <h3>Left Navigation</h3>
            <ul style="list-style: none; padding-left: 0;">
                <li style="padding: 10px 0;">Home</li>
                <li style="padding: 10px 0;">About</li>
                <li style="padding: 10px 0;">Contact</li>
            </ul>
        </div>
    </e-content-template>
</ejs-sidebar>

<div style="padding: 20px; background-color: #f5f5f5; height: 300px;">
    <h1>Main Content</h1>
    <p>Sidebar is positioned on the left</p>
</div>
```

### Right Position

```cshtml
<!-- Sidebar on the right -->
<ejs-sidebar id="right-sidebar" position="Right" type="Push">
    <e-content-template>
        <div style="padding: 20px;">
            <h3>Right Panel</h3>
            <ul style="list-style: none; padding-left: 0;">
                <li style="padding: 10px 0;">Help</li>
                <li style="padding: 10px 0;">Settings</li>
                <li style="padding: 10px 0;">Profile</li>
            </ul>
        </div>
    </e-content-template>
</ejs-sidebar>

<div style="padding: 20px; background-color: #f5f5f5; height: 300px;">
    <h1>Main Content</h1>
    <p>Sidebar is positioned on the right</p>
</div>
```

### Dual Sidebars (Left and Right)

```cshtml
<!-- Left Sidebar for Navigation -->
<ejs-sidebar id="nav-sidebar" position="Left" type="Push" width="250px" isOpen="true">
    <e-content-template>
        <div style="padding: 20px;">
            <h4>Navigation</h4>
            <ul style="list-style: none; padding-left: 0;">
                <li>Menu Item 1</li>
                <li>Menu Item 2</li>
            </ul>
        </div>
    </e-content-template>
</ejs-sidebar>

<!-- Right Sidebar for Details -->
<ejs-sidebar id="detail-sidebar" position="Right" type="Push" width="300px" isOpen="true">
    <e-content-template>
        <div style="padding: 20px;">
            <h4>Details Panel</h4>
            <p>Additional information</p>
        </div>
    </e-content-template>
</ejs-sidebar>

<div style="padding: 20px; background-color: #fff; text-align: center; height: 300px; display: flex; align-items: center; justify-content: center;">
    <h1>Main Content Area</h1>
</div>

<script>
document.addEventListener('DOMContentLoaded', function () {
    var navSidebar = document.getElementById('nav-sidebar').ej2_instances[0];
    var detailSidebar = document.getElementById('detail-sidebar').ej2_instances[0];
    
    // Both sidebars can be controlled independently
});
</script>
```

## Width Property

The `width` property controls the sidebar's width when expanded. It accepts string values (with units like 'px', '%') or numeric values (interpreted as pixels).

### Width Default Behavior

By default, width is set to `'auto'`, which means the sidebar width is determined by its content.

```cshtml
<!-- Auto width - sized by content -->
<ejs-sidebar id="auto-width-sidebar" width="auto">
    <e-content-template>
        <div style="padding: 20px;">
            Short content determines width
        </div>
    </e-content-template>
</ejs-sidebar>
```

### Fixed Pixel Width

```cshtml
<!-- Fixed width in pixels -->
<ejs-sidebar id="fixed-width-sidebar" type="Push" width="280px">
    <e-content-template>
        <div style="padding: 20px;">
            <h3>Fixed Width Menu</h3>
            <ul style="list-style: none; padding-left: 0;">
                <li style="padding: 8px 0;">Dashboard</li>
                <li style="padding: 8px 0;">Analytics</li>
                <li style="padding: 8px 0;">Reports</li>
                <li style="padding: 8px 0;">Settings</li>
            </ul>
        </div>
    </e-content-template>
</ejs-sidebar>

<div style="padding: 20px; background-color: #f5f5f5; height: 300px;">
    <h1>Content Area</h1>
</div>
```

### Percentage Width

```cshtml
<!-- Width as percentage of parent container -->
<ejs-sidebar id="percent-width-sidebar" type="Push" width="30%">
    <e-content-template>
        <div style="padding: 20px;">
            <h3>30% Width Sidebar</h3>
        </div>
    </e-content-template>
</ejs-sidebar>

<div style="padding: 20px; background-color: #f5f5f5; height: 300px;">
    <h1>Main Content</h1>
</div>
```

### Common Width Values

Common width settings for different purposes:

| Purpose | Width | Use Case |
|---------|-------|----------|
| Compact Menu | 60px | Icon-only navigation |
| Small Sidebar | 180px | Mobile or narrow screens |
| Medium Sidebar | 250px - 280px | Standard navigation |
| Wide Sidebar | 350px - 400px | Content-rich navigation |
| Full Menu | 30% - 40% | Large content areas |

### Numeric Width Value

```cshtml
<!-- Width as numeric value (interpreted as pixels) -->
<ejs-sidebar id="numeric-width-sidebar" type="Push" width="300">
    <e-content-template>
        <p>300px width sidebar</p>
    </e-content-template>
</ejs-sidebar>
```

## Target Property

The `target` property allows placing the sidebar within a specific container element instead of the entire page. This is useful for component-level sidebars, modal sidebars, or isolated layout sections.

### Target Property Basics

```cshtml
<!-- Container for sidebar -->
<div id="app-container" style="border: 2px solid #333; height: 400px; position: relative; display: flex;">
    <!-- Sidebar targets this container -->
    <ejs-sidebar id="contained-sidebar" type="Push" target="#app-container">
        <e-content-template>
            <div style="padding: 20px;">
                <p>This sidebar is contained within the app-container div</p>
            </div>
        </e-content-template>
    </ejs-sidebar>
    
    <!-- Content inside container -->
    <div style="flex: 1; padding: 20px; background-color: #f5f5f5;">
        <h2>App Content</h2>
        <p>Sidebar is isolated to this container</p>
    </div>
</div>

<div style="padding: 20px;">
    <h3>Outside Container</h3>
    <p>This content is outside the container - sidebar doesn't affect it</p>
</div>
```

### Target with CSS Selector

```cshtml
<!-- Target using CSS selector -->
<ejs-sidebar id="modal-sidebar" type="Over" target=".modal-body" showBackdrop="true">
    <e-content-template>
        <p>Modal sidebar content</p>
    </e-content-template>
</ejs-sidebar>

<div class="modal-body" style="border: 1px solid #ccc; padding: 20px; height: 300px; position: relative;">
    <h2>Modal Content</h2>
</div>
```

### Target with HTMLElement Reference

```cshtml
<div id="sidebar-container" style="height: 300px; border: 1px solid #333; position: relative;">
    <ejs-sidebar id="js-target-sidebar" type="Push">
        <e-content-template><p>Content</p></e-content-template>
    </ejs-sidebar>
</div>

<script>
document.addEventListener('DOMContentLoaded', function () {
    var sidebar = document.getElementById('js-target-sidebar').ej2_instances[0];
    
    // Set target as HTMLElement
    sidebar.target = document.getElementById('sidebar-container');
    sidebar.dataBind();
});
</script>
```

### Dialog Sidebar Pattern

```cshtml
<!-- Sidebar within a dialog/modal -->
<div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); 
            width: 800px; height: 500px; background: white; border: 1px solid #ccc; 
            box-shadow: 0 2px 10px rgba(0,0,0,0.2); z-index: 1000;">
    
    <ejs-sidebar id="dialog-sidebar" type="Push" target="closest(.ejs-dialog)" width="250px">
        <e-content-template>
            <div style="padding: 15px;">
                <h4>Dialog Menu</h4>
                <ul style="list-style: none; padding-left: 0; font-size: 14px;">
                    <li style="padding: 8px 0;">Option 1</li>
                    <li style="padding: 8px 0;">Option 2</li>
                    <li style="padding: 8px 0;">Option 3</li>
                </ul>
            </div>
        </e-content-template>
    </ejs-sidebar>
    
    <div style="padding: 20px; margin-left: 250px;">
        <h2>Dialog Content</h2>
        <p>Sidebar is scoped to this dialog</p>
    </div>
</div>
```

## Calculating Effective Width

The effective width of the sidebar considering different properties:

### Auto Width Calculation

When `width="auto"`, the sidebar width is determined by its content:

```cshtml
<ejs-sidebar id="content-sized" width="auto" type="Push">
    <e-content-template>
        <div style="padding: 20px; white-space: nowrap;">
            <h3>Dynamic Width</h3>
            <p>Width is determined by content length</p>
        </div>
    </e-content-template>
</ejs-sidebar>
```

### Docked Width vs Expanded Width

When using docking, there's both a collapsed width (dockSize) and expanded width:

```cshtml
<!-- Dock size different from expanded width -->
<ejs-sidebar id="docked" type="Push" enableDock="true" 
             width="300px" dockSize="60px">
    <e-content-template>
        <div style="padding: 20px;">Menu</div>
    </e-content-template>
</ejs-sidebar>
```

In this example:
- **Expanded width**: 300px (from `width` property)
- **Docked width**: 60px (from `dockSize` property)

## Responsive Sizing

### Media Query Approach

For responsive width, combine sidebar with media query:

```html
<style>
    @media (max-width: 768px) {
        #responsive-sidebar {
            width: 180px;
        }
    }
    
    @media (min-width: 769px) {
        #responsive-sidebar {
            width: 280px;
        }
    }
</style>

<ejs-sidebar id="responsive-sidebar" type="Auto" width="280px">
    <e-content-template>
        <p>Responsive sidebar</p>
    </e-content-template>
</ejs-sidebar>
```

### JavaScript-Based Responsive Sizing

```javascript
var sidebar = document.getElementById('sidebar').ej2_instances[0];

function adjustSidebarWidth() {
    if (window.innerWidth < 768) {
        sidebar.width = '180px';
    } else {
        sidebar.width = '280px';
    }
    sidebar.dataBind();
}

// Adjust on load and resize
adjustSidebarWidth();
window.addEventListener('resize', adjustSidebarWidth);
```

## Container-Specific Placement

### Sidebar in Grid Layout

```cshtml
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; padding: 20px;">
    <div style="border: 1px solid #ddd; position: relative; height: 400px;">
        <h3>Container 1</h3>
        <ejs-sidebar id="grid-sidebar-1" type="Push" target="prev">
            <e-content-template><p>Sidebar 1</p></e-content-template>
        </ejs-sidebar>
    </div>
    
    <div style="border: 1px solid #ddd; position: relative; height: 400px;">
        <h3>Container 2</h3>
        <ejs-sidebar id="grid-sidebar-2" type="Push" target="next">
            <e-content-template><p>Sidebar 2</p></e-content-template>
        </ejs-sidebar>
    </div>
</div>
```

### Sidebar in Flex Layout

```cshtml
<div style="display: flex; gap: 20px;">
    <div style="flex: 0 0 300px; border: 1px solid #ddd; position: relative;">
        <ejs-sidebar id="flex-sidebar" type="Push" width="100%">
            <e-content-template>
                <p>Full width of flex container</p>
            </e-content-template>
        </ejs-sidebar>
    </div>
    
    <div style="flex: 1;">
        <h1>Main Content</h1>
    </div>
</div>
```

## Multi-Sidebar Layouts

### Two-Sidebar Layout (Left and Right)

```cshtml
<style>
    .layout-container {
        display: flex;
        min-height: 100vh;
    }
    
    .left-sidebar {
        width: 250px;
    }
    
    .main {
        flex: 1;
        overflow-y: auto;
    }
    
    .right-sidebar {
        width: 300px;
    }
</style>

<div class="layout-container">
    <ejs-sidebar id="left-sidebar" type="Push" position="Left" width="250px" isOpen="true">
        <e-content-template>
            <div style="padding: 20px;">
                <h3>Navigation</h3>
            </div>
        </e-content-template>
    </ejs-sidebar>
    
    <div class="main" style="padding: 20px; background-color: #f5f5f5;">
        <h1>Main Content</h1>
    </div>
    
    <ejs-sidebar id="right-sidebar" type="Push" position="Right" width="300px" isOpen="true">
        <e-content-template>
            <div style="padding: 20px;">
                <h3>Details</h3>
            </div>
        </e-content-template>
    </ejs-sidebar>
</div>
```

## Best Practices

### Practice 1: Use Consistent Width Values

```cshtml
<!-- Good: Consistent sizing -->
<ejs-sidebar id="sidebar1" width="280px" type="Push"></ejs-sidebar>
<ejs-sidebar id="sidebar2" width="280px" position="Right" type="Push"></ejs-sidebar>
```

### Practice 2: Account for Content

```cshtml
<!-- Size should accommodate typical content -->
<ejs-sidebar width="300px"> <!-- Enough for menu items -->
    <e-content-template>
        <!-- Typically 2-3 character widths per menu item -->
    </e-content-template>
</ejs-sidebar>
```

### Practice 3: Responsive Design First

```cshtml
<!-- Mobile-friendly width initially -->
<ejs-sidebar type="Auto" width="280px">
    <!-- Auto type handles responsive positioning -->
</ejs-sidebar>
```

### Practice 4: Always Use Position Left/Right

```cshtml
<!-- Explicitly set position for clarity -->
<ejs-sidebar position="Left" type="Push">
    <!-- Clear indication of placement -->
</ejs-sidebar>
```

## Common Sizing Patterns

### Pattern 1: Standard Dashboard Sidebar

```cshtml
<ejs-sidebar id="dashboard" type="Push" position="Left" width="280px">
    <e-content-template><p>Navigation</p></e-content-template>
</ejs-sidebar>
```

### Pattern 2: Mobile-Optimized Sidebar

```cshtml
<ejs-sidebar id="mobile" type="Auto" position="Left" width="280px" isOpen="false">
    <e-content-template><p>Mobile Menu</p></e-content-template>
</ejs-sidebar>
```

### Pattern 3: Narrow Icon Sidebar

```cshtml
<ejs-sidebar id="icons" type="Push" position="Left" width="60px">
    <e-content-template><p>⚙️ Menu</p></e-content-template>
</ejs-sidebar>
```

### Pattern 4: Wide Content Sidebar

```cshtml
<ejs-sidebar id="content" type="Push" position="Left" width="400px">
    <e-content-template><p>Rich Content</p></e-content-template>
</ejs-sidebar>
```

---

**Next Step:** Learn about [Advanced Features](advanced-features.md) like docking, gestures, and responsive media queries.
