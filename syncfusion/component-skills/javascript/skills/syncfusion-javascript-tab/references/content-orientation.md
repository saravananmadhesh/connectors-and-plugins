# Header Placement and Tab Layout

## Table of Contents
- [Header Placement (Top, Bottom, Left, Right)](#header-placement-top-bottom-left-right)
- [Default Layout (Top Placement)](#default-layout-top-placement)
- [Left Placement Layout](#left-placement-layout)
- [Configuration](#configuration)
- [Responsive Placement](#responsive-placement)

## Header Placement (Top, Bottom, Left, Right)

The `headerPlacement` property controls where the Tab headers are positioned relative to the content. There are four placement options:

### Header Placement - Top (Default)

Headers are positioned at the top with content below:

```typescript
import { Tab } from '@syncfusion/ej2-navigations';

let tabObj: Tab = new Tab({
    items: [
        { header: { 'text': 'HTML' }, content: 'HTML content...' },
        { header: { 'text': 'CSS' }, content: 'CSS content...' },
        { header: { 'text': 'JavaScript' }, content: 'JavaScript content...' }
    ],
    headerPlacement: 'Top'  // Default position
});
tabObj.appendTo('#element');
```

**Visual Structure:**
```
┌──────────────────────────┐
│ HTML │ CSS │ JavaScript │  ← Headers at Top
├──────────────────────────┤
│   Content Area           │
│                          │
└──────────────────────────┘
```

### Header Placement - Bottom

Headers are positioned below the content:

```typescript
let tabObj: Tab = new Tab({
    items: [
        { header: { 'text': 'HTML' }, content: 'HTML content...' },
        { header: { 'text': 'CSS' }, content: 'CSS content...' },
        { header: { 'text': 'JavaScript' }, content: 'JavaScript content...' }
    ],
    headerPlacement: 'Bottom'
});
tabObj.appendTo('#element');
```

**Visual Structure:**
```
┌──────────────────────────┐
│   Content Area           │
│                          │
├──────────────────────────┤
│ HTML │ CSS │ JavaScript │  ← Headers at Bottom
└──────────────────────────┘
```

### Header Placement - Left

Headers are positioned on the left side with content on the right:

```typescript
let tabObj: Tab = new Tab({
    items: [
        { header: { 'text': 'Dashboard' }, content: 'Dashboard items...' },
        { header: { 'text': 'Analytics' }, content: 'Analytics data...' },
        { header: { 'text': 'Reports' }, content: 'Report content...' }
    ],
    headerPlacement: 'Left'
});
tabObj.appendTo('#element');
```

**Visual Structure:**
```
┌──────────────┬──────────────┐
│ Dashboard    │              │
│ Analytics    │ Content Area │
│ Reports      │              │
└──────────────┴──────────────┘
  ↑ Headers
```

### Header Placement - Right

Headers are positioned on the right side with content on the left:

```typescript
let tabObj: Tab = new Tab({
    items: [
        { header: { 'text': 'Tab 1' }, content: 'Content 1...' },
        { header: { 'text': 'Tab 2' }, content: 'Content 2...' },
        { header: { 'text': 'Tab 3' }, content: 'Content 3...' }
    ],
    headerPlacement: 'Right'
});
tabObj.appendTo('#element');
```

**Visual Structure:**
```
┌──────────────┬──────────────┐
│              │ Tab 1        │
│ Content Area │ Tab 2        │
│              │ Tab 3        │
└──────────────┴──────────────┘
                ↑ Headers
```

### CSS for Header Placement

```css
/* Header at Top (Default) */
.e-tab[data-headerplacement="top"] {
    flex-direction: column;
}

.e-tab[data-headerplacement="top"] .e-tab-header {
    border-bottom: 1px solid #ddd;
    order: -1;
}

/* Header at Bottom */
.e-tab[data-headerplacement="bottom"] {
    flex-direction: column-reverse;
}

.e-tab[data-headerplacement="bottom"] .e-tab-header {
    border-top: 1px solid #ddd;
}

/* Header at Left */
.e-tab[data-headerplacement="left"] {
    flex-direction: row;
}

.e-tab[data-headerplacement="left"] .e-tab-header {
    border-right: 1px solid #ddd;
    width: 150px;
    flex-direction: column;
    order: -1;
}

/* Header at Right */
.e-tab[data-headerplacement="right"] {
    flex-direction: row-reverse;
}

.e-tab[data-headerplacement="right"] .e-tab-header {
    border-left: 1px solid #ddd;
    width: 150px;
    flex-direction: column;
}
```

## Default Layout (Top Placement)

Headers are positioned at the top with content below - this is the default layout. Tabs display horizontally in the header row.

```typescript
let tabObj: Tab = new Tab({
    items: [
        { header: { 'text': 'Tab 1' }, content: 'Content 1' },
        { header: { 'text': 'Tab 2' }, content: 'Content 2' },
        { header: { 'text': 'Tab 3' }, content: 'Content 3' }
    ],
    headerPlacement: 'Top'  // Default, can be omitted
});
tabObj.appendTo('#element');
```

### Layout Structure

```
┌─────────────────────────────────┐
│ Tab 1  │ Tab 2  │ Tab 3         │  ← Headers at Top
├─────────────────────────────────┤
│                                 │
│   Content Area                  │
│                                 │
└─────────────────────────────────┘
```

### CSS for Top Placement

```css
.e-tab {
    flex-direction: column;
}

.e-tab .e-tab-header {
    border-bottom: 1px solid #ddd;
    overflow-x: auto;
    order: -1;
}

.e-content {
    flex: 1;
    padding: 20px;
}
```

## Left Placement Layout

Headers are positioned on the left side with content on the right. This is useful for sidebar navigation patterns.

```typescript
let tabObj: Tab = new Tab({
    items: [
        { header: { 'text': 'Dashboard', 'iconCss': 'e-icon-home' }, content: 'Dashboard content' },
        { header: { 'text': 'Analytics', 'iconCss': 'e-icon-chart' }, content: 'Analytics content' },
        { header: { 'text': 'Reports', 'iconCss': 'e-icon-document' }, content: 'Reports content' }
    ],
    headerPlacement: 'Left'
});
tabObj.appendTo('#element');
```

### Layout Structure

```
┌─────────────┬──────────────────┐
│ Dashboard   │                  │
│ Analytics   │   Content Area   │
│ Reports     │                  │
└─────────────┴──────────────────┘
    ↑
  Headers
```

### CSS for Left Placement

```css
.e-tab {
    display: flex;
    flex-direction: row;
}

.e-tab .e-tab-header {
    width: 150px;
    border-right: 1px solid #ddd;
    flex-direction: column;
    flex-shrink: 0;
    order: -1;
}

.e-tab .e-tab-header .e-toolbar-items {
    flex-direction: column;
}

.e-content {
    flex: 1;
    padding: 20px;
    overflow-y: auto;
}
```

## Configuration

### Set Header Placement Property

```typescript
// Top Placement (default)
headerPlacement: 'Top'

// Bottom Placement
headerPlacement: 'Bottom'

// Left Placement
headerPlacement: 'Left'

// Right Placement
headerPlacement: 'Right'
```

### Full Configuration Example

```typescript
let tabObj: Tab = new Tab({
    items: [
        { 
            header: { 
                'text': 'Settings',
                'iconCss': 'e-icon-settings'
            }, 
            content: 'Settings content' 
        },
        { 
            header: { 
                'text': 'Profile',
                'iconCss': 'e-icon-user'
            }, 
            content: 'Profile content' 
        },
        { 
            header: { 
                'text': 'Notifications',
                'iconCss': 'e-icon-bell'
            }, 
            content: 'Notifications content' 
        }
    ],
    headerPlacement: 'Left',
    heightAdjustMode: 'Auto',
    overflowMode: 'Scrollable'
});
tabObj.appendTo('#element');
```

## Responsive Placement

### Auto-Switch Based on Screen Size

```typescript
function getResponsivePlacement(): 'Top' | 'Left' {
    let screenWidth = window.innerWidth;
    
    if (screenWidth < 768) {
        return 'Top';    // Mobile: top placement (scrollable tabs)
    } else if (screenWidth < 1024) {
        return 'Left';   // Tablet: left sidebar
    } else {
        return 'Left';   // Desktop: left layout
    }
}

let tabObj: Tab = new Tab({
    items: [...],
    headerPlacement: getResponsivePlacement()
});
tabObj.appendTo('#element');

// Update on resize
window.addEventListener('resize', () => {
    let newPlacement = getResponsivePlacement();
    if (tabObj.headerPlacement !== newPlacement) {
        tabObj.headerPlacement = newPlacement;
        tabObj.refresh();
    }
});
```

### Media Query Responsive Styling

```css
/* Desktop: Left placement */
@media (min-width: 1024px) {
    .e-tab {
        flex-direction: row;
    }
    
    .e-tab .e-tab-header {
        width: 200px;
        border-right: 1px solid #ddd;
        border-bottom: none;
        flex-direction: column;
        order: -1;
    }
}

/* Tablet: Left with smaller header */
@media (max-width: 1023px) and (min-width: 768px) {
    .e-tab {
        flex-direction: row;
    }
    
    .e-tab .e-tab-header {
        width: 150px;
        border-right: 1px solid #ddd;
        order: -1;
    }
    
    .e-tab .e-tab-header .e-toolbar-item {
        padding: 8px 10px;
        font-size: 12px;
    }
}

/* Mobile: Top placement */
@media (max-width: 767px) {
    .e-tab {
        flex-direction: column;
    }
    
    .e-tab .e-tab-header {
        width: 100%;
        border-right: none;
        border-bottom: 1px solid #ddd;
        flex-direction: row;
        overflow-x: auto;
        order: -1;
    }
    
    .e-content {
        min-height: 300px;
    }
}
```

## Common Patterns

### Pattern 1: Toggle Header Placement

```typescript
let tabObj: Tab = new Tab({
    items: [...],
    headerPlacement: 'Top'
});
tabObj.appendTo('#element');

let isLeftPlacement = false;

document.getElementById('togglePlacementBtn')?.addEventListener('click', () => {
    if (isLeftPlacement) {
        tabObj.headerPlacement = 'Top';
        isLeftPlacement = false;
    } else {
        tabObj.headerPlacement = 'Left';
        isLeftPlacement = true;
    }
    tabObj.refresh();
});
```

### Pattern 2: Left Sidebar Navigation

```typescript
let tabObj: Tab = new Tab({
    items: [
        { header: { 'text': 'Home', 'iconCss': 'fas fa-home' }, content: renderHomePage() },
        { header: { 'text': 'Products', 'iconCss': 'fas fa-cube' }, content: renderProducts() },
        { header: { 'text': 'Services', 'iconCss': 'fas fa-cogs' }, content: renderServices() },
        { header: { 'text': 'About', 'iconCss': 'fas fa-info-circle' }, content: renderAbout() },
        { header: { 'text': 'Contact', 'iconCss': 'fas fa-envelope' }, content: renderContact() }
    ],
    headerPlacement: 'Left',
    heightAdjustMode: 'Auto',
    width: '100%'
});
tabObj.appendTo('#appLayout');

function renderHomePage(): string {
    return '<h2>Home</h2><p>Welcome to our application</p>';
}

function renderProducts(): string {
    return '<h2>Products</h2><p>Our product catalog</p>';
}

// ... other render functions
```

### Pattern 3: Left Sidebar with Collapsible Menu

```typescript
let tabObj: Tab = new Tab({
    items: [...],
    headerPlacement: 'Left'
});
tabObj.appendTo('#element');

let isCollapsed = false;

document.getElementById('collapseBtn')?.addEventListener('click', () => {
    let header = document.querySelector('.e-tab-header') as HTMLElement;
    
    if (!isCollapsed) {
        header.style.width = '60px';
        // Hide text, show only icons
        document.querySelectorAll('.e-tab-text').forEach((el) => {
            (el as HTMLElement).style.display = 'none';
        });
        isCollapsed = true;
    } else {
        header.style.width = '200px';
        document.querySelectorAll('.e-tab-text').forEach((el) => {
            (el as HTMLElement).style.display = 'inline';
        });
        isCollapsed = false;
    }
});
```

### Pattern 4: Responsive Placement Switcher

```typescript
class ResponsiveTabManager {
    private tabObj: Tab;
    private currentPlacement: 'Top' | 'Left';
    
    constructor(tabObj: Tab) {
        this.tabObj = tabObj;
        this.currentPlacement = 'Top';
        this.init();
    }
    
    private init() {
        window.addEventListener('resize', () => this.updateLayout());
        // Initial setup
        this.updateLayout();
    }
    
    private updateLayout() {
        let newPlacement: 'Top' | 'Left';
        let width = window.innerWidth;
        
        if (width < 768) {
            newPlacement = 'Top';
        } else {
            newPlacement = 'Left';
        }
        
        if (newPlacement !== this.currentPlacement) {
            this.tabObj.headerPlacement = newPlacement;
            this.tabObj.refresh();
            this.currentPlacement = newPlacement;
        }
    }
}

// Usage
let tabObj = new Tab({ items: [...] });
tabObj.appendTo('#element');
let manager = new ResponsiveTabManager(tabObj);
```

---

**Related Topics:**
- [Responsive and Adaptive Modes](./responsive-adaptive-modes.md) - Overflow handling
- [Customization and Styling](./customization-and-styling.md) - CSS for orientation layouts
