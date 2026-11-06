# Docking Sidebar

## Table of Contents
- [Docking Overview](#docking-overview)
- [Enabling Dock Mode](#enabling-dock-mode)
- [Showing Icons Only](#showing-icons-only)
- [Docking Patterns](#docking-patterns)

## Docking Overview

The **dock** state reserves space on the page that always remains visible when the sidebar is collapsed. It displays a concise form of content, such as icons alone instead of lengthy text.

### When to Use Docking

Use docking when:
- You want to show icons in a collapsed state
- You need persistent navigation hints on screen
- You have limited screen space
- You want to improve UX with visual icons

### Docking vs Regular Collapse

| Feature | Regular Collapse | With Docking |
|---------|------------------|--------------|
| **Collapsed State** | Hidden completely | Reserved space visible |
| **Content Shown** | None | Icons or abbreviated content |
| **Space Reserved** | No | Yes (dockSize width) |
| **Use Case** | Large screens | Limited space |

## Enabling Dock Mode

### Basic Dock Configuration

Enable docking with `enableDock` and set the reserved width with `dockSize`:

```typescript
import { Sidebar } from '@syncfusion/ej2-navigations';

let dockSidebar: Sidebar = new Sidebar({
    width: '220px',          // Full width when open
    dockSize: '72px',        // Reserved width when collapsed
    enableDock: true,        // Enable docking
    isOpen: true             // Start open
});
dockSidebar.appendTo('#sidebar');
```

### Properties

- **`enableDock`**: `boolean` - Enable/disable dock mode (default: `false`)
- **`dockSize`**: `string` - Width reserved for docked state (default: `'52px'`)
- **`width`**: `string` - Full sidebar width when expanded

## Showing Icons Only

### CSS Rules for Icon Display

When docking is enabled, the `.e-dock` class is applied. Use CSS to control text visibility:

### Hide Text When Docked

```css
/* Hide text labels in docked (collapsed) state */
.e-dock.e-close span.e-text {
    display: none;
}

/* Show text when sidebar opens */
.e-dock.e-open span.e-text {
    display: inline-block;
}
```

### HTML Structure with Icons and Text

```html
<aside id="sidebar">
    <div class="dock">
        <ul>
            <li class="sidebar-item">
                <span class="e-icons e-home"></span>
                <span class="e-text">Home</span>
            </li>
            <li class="sidebar-item">
                <span class="e-icons e-user"></span>
                <span class="e-text">Profile</span>
            </li>
            <li class="sidebar-item">
                <span class="e-icons e-settings"></span>
                <span class="e-text">Settings</span>
            </li>
            <li class="sidebar-item">
                <span class="e-icons e-information"></span>
                <span class="e-text">Info</span>
            </li>
        </ul>
    </div>
</aside>
```

### Styling for Better UX

```css
#sidebar.e-sidebar {
    background: #2d323e;
    color: #fff;
    overflow: hidden;
}

/* List items in docked state */
#sidebar.e-close .sidebar-item {
    padding: 5px 20px;
    text-align: center;
}

/* List items when open */
#sidebar.e-open .sidebar-item {
    padding-left: 15px;
    text-align: left;
    color: #c0c2c5;
}

/* Icon styling */
span.e-icons {
    color: #c0c2c5;
    line-height: 2;
    font-size: 25px;
}

/* Text styling when open */
.e-open .e-text {
    margin-left: 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 23px;
    font-size: 15px;
}

/* Hover effect */
#sidebar.e-sidebar ul li:hover span {
    color: #fff;
}
```

## Complete Docking Example

```typescript
import { Sidebar } from '@syncfusion/ej2-navigations';
import { Button } from '@syncfusion/ej2-buttons';

// Initialize docked sidebar
let dockBar: Sidebar = new Sidebar({
    width: '220px',
    dockSize: '72px',
    enableDock: true,
    type: 'Over',
    isOpen: true
});
dockBar.appendTo('#dockSidebar');

// Toggle button
let toggleBtn: Button = new Button({
    iconCss: 'e-icons e-chevron-right',
    isPrimary: true
}, '#toggle');

document.querySelector('#toggle')?.addEventListener('click', () => {
    dockBar.toggle();
});
```

### HTML Structure

```html
<div id="container">
    <aside id="dockSidebar">
        <div class="dock">
            <ul>
                <li class="sidebar-item" id="toggle">
                    <span class="e-icons e-chevron-right"></span>
                    <span class="e-text">Menu</span>
                </li>
                <li class="sidebar-item">
                    <span class="e-icons e-home"></span>
                    <span class="e-text">Home</span>
                </li>
                <li class="sidebar-item">
                    <span class="e-icons e-user"></span>
                    <span class="e-text">Profile</span>
                </li>
                <li class="sidebar-item">
                    <span class="e-icons e-circle-info"></span>
                    <span class="e-text">Info</span>
                </li>
                <li class="sidebar-item">
                    <span class="e-icons e-settings"></span>
                    <span class="e-text">Settings</span>
                </li>
            </ul>
        </div>
    </aside>
    
    <div id="main-content">
        <div class="title">Main Content</div>
        <p>Click the menu icon to expand the sidebar</p>
    </div>
</div>
```

## Docking with Navigation

Handle navigation clicks while docked:

```typescript
let dockSidebar: Sidebar = new Sidebar({
    enableDock: true,
    dockSize: '72px',
    width: '250px'
});
dockSidebar.appendTo('#sidebar');

// Navigation item click handler
document.querySelectorAll('.sidebar-item').forEach(item => {
    item.addEventListener('click', () => {
        const action = item.getAttribute('data-action');
        console.log('Navigating to:', action);
        
        // If sidebar is docked, expand it first
        if (dockSidebar.dockSize === '72px' && !dockSidebar.isOpen) {
            dockSidebar.show();
        }
    });
});
```

## Docking Patterns

### Pattern 1: Icon-Only Docked Navigation

```typescript
let sidebar: Sidebar = new Sidebar({
    enableDock: true,
    dockSize: '72px',
    width: '220px',
    type: 'Over'
});
sidebar.appendTo('#sidebar');

// CSS for icon-only docked state
const style = document.createElement('style');
style.textContent = `
    .e-dock.e-close span.e-text {
        display: none;
    }
    .e-dock.e-open span.e-text {
        display: inline-block;
    }
`;
document.head.appendChild(style);
```

### Pattern 2: Auto-Expand on Hover

```typescript
const sidebar = document.querySelector('#sidebar');

// Expand on mouse hover
sidebar?.addEventListener('mouseenter', () => {
    if (!dockBar.isOpen) {
        dockBar.show();
    }
});

// Collapse on mouse leave
sidebar?.addEventListener('mouseleave', () => {
    if (sidebar.classList.contains('e-dock')) {
        dockBar.hide();
    }
});
```

### Pattern 3: Docking with Toggle Button

```html
<div id="toggle-dock" class="toggle-dock">
    <button id="dock-toggle" class="e-btn">
        <span class="e-icons e-arrow-left"></span>
    </button>
</div>

<script>
let sidebar = new Sidebar({
    enableDock: true,
    dockSize: '72px',
    width: '250px'
});
sidebar.appendTo('#sidebar');

document.querySelector('#dock-toggle')?.addEventListener('click', () => {
    sidebar.toggle();
    const icon = document.querySelector('#dock-toggle span');
    icon?.classList.toggle('e-arrow-left');
    icon?.classList.toggle('e-arrow-right');
});
</script>
```

## Use Cases

### Admin Dashboard
```typescript
// Icon-based navigation that expands on click
let sidebar: Sidebar = new Sidebar({
    enableDock: true,
    dockSize: '60px',
    width: '200px',
    type: 'Over'
});
sidebar.appendTo('#sidebar');
```

### Social App
```typescript
// Persistent icon navigation with expandable menu
let sidebar: Sidebar = new Sidebar({
    enableDock: true,
    dockSize: '80px',
    width: '280px',
    type: 'Slide'
});
sidebar.appendTo('#sidebar');
```

### Document Editor
```typescript
// Tool sidebar that minimizes to icons
let sidebar: Sidebar = new Sidebar({
    enableDock: true,
    dockSize: '50px',
    width: '250px',
    type: 'Push'
});
sidebar.appendTo('#sidebar');
```

## CSS Advanced Styling

```css
/* Smooth transition between docked and open states */
#sidebar.e-dock {
    transition: width 0.3s ease;
}

/* Docked state styling */
#sidebar.e-dock.e-close {
    width: 72px;
    background: #37474f;
}

/* Open state styling */
#sidebar.e-dock.e-open {
    width: 220px;
    background: #263238;
}

/* Icon container */
#sidebar .e-icons {
    display: inline-block;
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    transition: all 0.3s ease;
}

/* Hover effect in docked state */
#sidebar.e-dock.e-close .sidebar-item:hover .e-icons {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
}

/* Text container */
#sidebar .e-text {
    display: inline-block;
    margin-left: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

/* Separator */
#sidebar .sidebar-item-divider {
    height: 1px;
    background: rgba(255, 255, 255, 0.1);
    margin: 10px 5px;
}
```

## Performance Tips

1. **Use CSS for visibility control** - Avoid JavaScript for text show/hide
2. **Optimize icon sizes** - Keep icons small for better UX
3. **Debounce resize listeners** - If updating dockSize on resize
4. **Lazy load content** - Load expanded content on demand

## Common Issues

**Issue**: Text not hiding in docked state
- **Solution**: Ensure `.e-dock.e-close span.e-text { display: none; }` CSS is applied

**Issue**: Icons misaligned when docked
- **Solution**: Use consistent icon size and line-height in CSS

**Issue**: Slow animation on toggle
- **Solution**: Check `animate` property and reduce animation duration

## Next Steps

- Learn **Content Integration** for menu structure
- Explore **Animations and Gestures** for smooth transitions
- Check **Styling and Theming** for advanced appearance
