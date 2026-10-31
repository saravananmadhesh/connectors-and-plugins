# Auto-Close and Responsive Behavior

Control when and how the sidebar automatically closes or responds to user interactions and viewport changes.

## Table of Contents

- [Media Query for Responsive Behavior](#media-query-for-responsive-behavior)
- [Close on Document Click](#close-on-document-click)
- [Close Button](#close-button)
- [Mobile vs Desktop Viewport Handling](#mobile-vs-desktop-viewport-handling)
- [Complete Responsive Example](#complete-responsive-example)
- [HTML Structure for Responsive Sidebar](#html-structure-for-responsive-sidebar)
- [Keyboard Support](#keyboard-support)
- [Performance Optimization](#performance-optimization)
- [Common Patterns](#common-patterns)
- [Testing Responsive Behavior](#testing-responsive-behavior)
- [Next Steps](#next-steps)

## Media Query for Responsive Behavior

Use `mediaQuery` to automatically close/open the sidebar at specific screen widths:

### Expand on Large Screens

Keep sidebar expanded on desktop (min-width: 600px) and collapsed on mobile:

```typescript
import { Sidebar } from '@syncfusion/ej2-navigations';

let sidebar: Sidebar = new Sidebar({
    width: '280px',
    mediaQuery: window.matchMedia('(min-width: 600px)'),
    isOpen: false
});
sidebar.appendTo('#sidebar');

// Result: Expands automatically on screens ≥ 600px
```

### Collapse on Small Screens

Keep sidebar collapsed on mobile (max-width: 400px) and expanded on larger screens:

```typescript
let sidebar: Sidebar = new Sidebar({
    width: '280px',
    mediaQuery: window.matchMedia('(max-width: 400px)'),
    isOpen: true
});
sidebar.appendTo('#sidebar');

// Result: Only open on screens ≤ 400px
```

### Multiple Breakpoints

Create responsive behavior with different widths per screen size:

```typescript
let sidebar: Sidebar = new Sidebar({
    mediaQuery: window.matchMedia('(min-width: 768px)'),
    width: window.innerWidth >= 768px ? '280px' : '200px'
});
sidebar.appendTo('#sidebar');

// Monitor window resize
window.addEventListener('resize', () => {
    sidebar.width = window.innerWidth >= 768px ? '280px' : '200px';
});
```

## Close on Document Click

Use the built-in `closeOnDocumentClick` property to close the sidebar when the user clicks outside the sidebar:

```typescript
import { Sidebar } from '@syncfusion/ej2-navigations';

let sidebar: Sidebar = new Sidebar({
    type: 'Over',
    width: '280px',
    closeOnDocumentClick: true
});
sidebar.appendTo('#sidebar');
```

This property removes the need for manual document click event handling.

## Close Button

Add a button inside the sidebar to close it:

```typescript
let sidebar: Sidebar = new Sidebar({
    type: 'Over'
});
sidebar.appendTo('#sidebar');

const closeBtn = document.querySelector('#close-sidebar');
if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        sidebar.hide();
    });
}
```

HTML structure:

```html
<aside id="sidebar">
    <div class="sidebar-header">
        <h2>Menu</h2>
        <button id="close-sidebar" class="e-btn e-icon-btn">
            <span class="e-icons e-close"></span>
        </button>
    </div>
    <ul>
        <li>Home</li>
        <li>About</li>
    </ul>
</aside>
```

## Mobile vs Desktop Viewport Handling

The `Auto` type is the default expand mode. On initial rendering, the Sidebar with `type: 'Auto'` will:
- expand on desktop,
- collapse on mobile,
irrespective of `enableDock` and `isOpen` properties.

```typescript
let sidebar: Sidebar = new Sidebar({
    type: 'Auto',
    showBackdrop: true
});
sidebar.appendTo('#sidebar');
```

This default Auto behavior ensures responsive rendering without manual state switching.

## Complete Responsive Example

```typescript
import { Sidebar } from '@syncfusion/ej2-navigations';
import { Button } from '@syncfusion/ej2-buttons';

// Mobile query
const mobileQuery = window.matchMedia('(max-width: 768px)');
const tabletQuery = window.matchMedia('(max-width: 1024px)');

let sidebar: Sidebar = new Sidebar({
    type: 'Auto',
    width: getMobileAdjustedWidth(),
    showBackdrop: mobileQuery.matches,
    mediaQuery: mobileQuery
});
sidebar.appendTo('#sidebar');

function getMobileAdjustedWidth(): string {
    if (mobileQuery.matches) return '100%';
    if (tabletQuery.matches) return '280px';
    return '300px';
}

// Handle window resize
window.addEventListener('resize', () => {
    const newWidth = getMobileAdjustedWidth();
    if (sidebar.width !== newWidth) {
        sidebar.width = newWidth;
    }
});

// Toggle button
let toggleBtn: Button = new Button({ 
    content: 'Menu',
    iconCss: 'e-icons e-menu'
}, '#toggle');

document.querySelector('#toggle')?.addEventListener('click', () => {
    sidebar.toggle();
});

// Navigation items - close on click (mobile only)
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
        if (mobileQuery.matches) {
            sidebar.hide();
        }
    });
});

// Close on outside click (mobile only)
if (mobileQuery.matches) {
    document.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        if (!sidebar.element.contains(target) && !toggleBtn.element.contains(target)) {
            sidebar.hide();
        }
    });
}
```

## HTML Structure for Responsive Sidebar

```html
<div id="container">
    <header>
        <button id="toggle" class="e-btn">Menu</button>
        <h1>My App</h1>
    </header>
    
    <aside id="sidebar">
        <nav>
            <ul>
                <li class="nav-item" onclick="navigate('home')">Home</li>
                <li class="nav-item" onclick="navigate('about')">About</li>
                <li class="nav-item" onclick="navigate('services')">Services</li>
                <li class="nav-item" onclick="navigate('contact')">Contact</li>
            </ul>
        </nav>
    </aside>
    
    <main>
        <div id="content">Main content goes here</div>
    </main>
</div>
```

## Keyboard Support

Add keyboard shortcuts for auto-close behavior:

```typescript
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar.isOpen) {
        sidebar.hide();  // ESC to close
    }
});
```

## Performance Optimization

Debounce media query listeners to prevent excessive updates:

```typescript
function debounce(func: () => void, delay: number) {
    let timeoutId: NodeJS.Timeout;
    return () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(func, delay);
    };
}

const handleResize = debounce(() => {
    const newWidth = getMobileAdjustedWidth();
    if (sidebar.width !== newWidth) {
        sidebar.width = newWidth;
    }
}, 300);

window.addEventListener('resize', handleResize);
```

## Common Patterns

**Pattern: Mobile-First Navigation**
```typescript
let sidebar: Sidebar = new Sidebar({
    type: 'Auto',
    mediaQuery: window.matchMedia('(min-width: 768px)'),
    isOpen: false
});
sidebar.appendTo('#sidebar');
```

**Pattern: Persistent Desktop, Auto-Close Mobile**
```typescript
const desktopQuery = window.matchMedia('(min-width: 1024px)');
let sidebar: Sidebar = new Sidebar({
    isOpen: desktopQuery.matches  // Open on desktop only
});
sidebar.appendTo('#sidebar');
```

**Pattern: Close on Route Change**
```typescript
// If using a router (e.g., Angular, React Router)
router.events.subscribe((event) => {
    if (event instanceof NavigationEnd) {
        sidebar.hide();
    }
});
```

## Testing Responsive Behavior

Use browser DevTools:

```
1. Open DevTools (F12)
2. Click Toggle device toolbar (Ctrl+Shift+M)
3. Test different screen sizes
4. Verify sidebar behavior each breakpoint
```

## Next Steps

- Learn **Content Integration** for navigation structure
- Explore **Docking Sidebar** for icon-based navigation
- Check **Animations and Gestures** for mobile interactions
