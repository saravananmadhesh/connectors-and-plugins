# Responsive and Adaptive Modes

## Table of Contents
- [Overview](#overview)
- [Scrollable Mode](#scrollable-mode)
- [Popup Mode](#popup-mode)
- [MultiRow Mode](#multirow-mode)
- [Extended Mode](#extended-mode)
- [Height Adjustment](#height-adjustment)
- [Configuration Guide](#configuration-guide)

## Overview

Tab component adapts to different screen sizes and available space using the `overflowMode` property. Choose the mode that best fits your layout requirements.

| Mode | Use Case | Behavior |
|------|----------|----------|
| **Scrollable** | Default, unlimited tabs | Horizontal scroll with navigation arrows |
| **Popup** | Limited space, many tabs | Hidden tabs shown in dropdown menu |
| **MultiRow** | Responsive layouts | Tabs wrap to multiple rows |
| **Extended** | Special layouts | Extended mode for advanced layouts |

## Scrollable Mode

### Overview
Default mode displays tabs in a single line with horizontal scrolling when tabs overflow.

### Configuration

```typescript
let tabObj: Tab = new Tab({
    heightAdjustMode: 'Auto',
    overflowMode: 'Scrollable',  // or 'Scroll'
    items: [
        { header: { 'text': 'HTML' }, content: 'HTML content' },
        { header: { 'text': 'C Sharp' }, content: 'C# content' },
        { header: { 'text': 'Java' }, content: 'Java content' },
        // ... more tabs
    ]
});
tabObj.appendTo('#element');
```

### Features
- Left/right navigation arrows appear when tabs overflow
- Keyboard and mouse wheel support for scrolling
- Touch swipe support on mobile devices
- Smooth horizontal scrolling
- Navigation arrows disabled when at bounds

### Scroll Step Customization

```typescript
let tabObj: Tab = new Tab({
    items: [...],
    overflowMode: 'Scrollable',
    scrollStep: 100  // Pixels to scroll per click (default: 0 = auto)
});
tabObj.appendTo('#element');
```

### Example: Scrollable Tabs with Many Items

```typescript
let tabs = [];
for (let i = 1; i <= 15; i++) {
    tabs.push({
        header: { 'text': `Tab ${i}` },
        content: `Content for tab ${i}`
    });
}

let tabObj: Tab = new Tab({
    items: tabs,
    overflowMode: 'Scrollable'
});
tabObj.appendTo('#element');
```

## Popup Mode

### Overview
Hidden tabs are shown in a dropdown popup menu when space is limited.

### Configuration

```typescript
let tabObj: Tab = new Tab({
    heightAdjustMode: 'Auto',
    overflowMode: 'Popup',
    items: [...items...]
});
tabObj.appendTo('#element');
```

### Features
- Dropdown icon appears at the end of tab header
- Overflow tabs listed in popup menu
- Scrollable popup if many hidden tabs
- Selected tab from popup moves to visible area
- Popup closes on selection

### Example: Popup Mode with Many Tabs

```typescript
let tabObj: Tab = new Tab({
    heightAdjustMode: 'Auto',
    overflowMode: 'Popup',
    items: [
        { header: { 'text': 'Home' }, content: 'Home content' },
        { header: { 'text': 'Products' }, content: 'Products' },
        { header: { 'text': 'Services' }, content: 'Services' },
        { header: { 'text': 'About' }, content: 'About us' },
        { header: { 'text': 'Contact' }, content: 'Contact form' },
        { header: { 'text': 'FAQ' }, content: 'Frequently asked questions' },
        { header: { 'text': 'Blog' }, content: 'Blog posts' },
        { header: { 'text': 'Support' }, content: 'Support page' }
    ]
});
tabObj.appendTo('#element');
```

## MultiRow Mode

### Overview
Tabs wrap to multiple rows when space is limited instead of hiding tabs.

### Configuration

```typescript
let tabObj: Tab = new Tab({
    heightAdjustMode: 'Auto',
    overflowMode: 'MultiRow',
    items: [...items...]
});
tabObj.appendTo('#element');
```

### Features
- Tabs wrap to next row when space runs out
- All tabs visible simultaneously
- Responsive to container width
- Automatic row calculation
- Best for moderate number of tabs

### Example: MultiRow Tabs

```typescript
let tabObj: Tab = new Tab({
    overflowMode: 'MultiRow',
    items: [
        { header: { 'text': 'Dashboard' }, content: 'Dashboard' },
        { header: { 'text': 'Analytics' }, content: 'Analytics' },
        { header: { 'text': 'Reports' }, content: 'Reports' },
        { header: { 'text': 'Settings' }, content: 'Settings' },
        { header: { 'text': 'Users' }, content: 'Users' },
        { header: { 'text': 'Permissions' }, content: 'Permissions' },
        { header: { 'text': 'Audit' }, content: 'Audit logs' }
    ]
});
tabObj.appendTo('#element');
```

## Extended Mode

### Overview
Extended mode for special layout requirements and advanced use cases.

### Configuration

```typescript
let tabObj: Tab = new Tab({
    heightAdjustMode: 'Auto',
    overflowMode: 'Extended',
    items: [...items...]
});
tabObj.appendTo('#element');
```

### Features
- Flexible layout support
- Custom overflow handling
- Advanced positioning options
- Best for specialized scenarios

## Height Adjustment

### Height Adjustment Modes

```typescript
let tabObj: Tab = new Tab({
    items: [...],
    heightAdjustMode: 'Auto'  // or 'Content', 'Scroll'
});
tabObj.appendTo('#element');
```

| Mode | Behavior |
|------|----------|
| **Auto** | Height auto-adjusts to fit content |
| **Content** | Maintains consistent height |
| **Scroll** | Adds scrollbar if content exceeds height |

### Custom Content Height

```typescript
let tabObj: Tab = new Tab({
    items: [...],
    heightAdjustMode: 'Auto'
});
tabObj.appendTo('#element');

// Set custom height via CSS
```

```css
.e-tab .e-content {
    height: 300px;
    overflow-y: auto;
}
```

## Configuration Guide

### Responsive Tab Layout

```typescript
let tabObj: Tab = new Tab({
    items: [...],
    overflowMode: 'Scrollable',      // Default
    heightAdjustMode: 'Auto',         // Auto-adjust height
    width: '100%'                     // Full width container
});
tabObj.appendTo('#element');
```

### Mobile-Friendly Configuration

```typescript
// For small screens
function getResponsiveTabConfig() {
    let isMobile = window.innerWidth < 768;
    
    return {
        overflowMode: isMobile ? 'Popup' : 'Scrollable',
        heightAdjustMode: 'Auto',
        items: [...]
    };
}

let config = getResponsiveTabConfig();
let tabObj: Tab = new Tab(config);
tabObj.appendTo('#element');
```

### Adaptive Modes by Screen Size

```typescript
// Responsive CSS
@media (max-width: 480px) {
    /* Mobile: Use Popup mode */
}

@media (max-width: 768px) {
    /* Tablet: Use MultiRow mode */
}

@media (min-width: 1024px) {
    /* Desktop: Use Scrollable mode */
}
```

## Common Patterns

### Pattern 1: Context-Aware Mode Selection

```typescript
function getOptimalOverflowMode(): string {
    let container = document.getElementById('tabContainer');
    let containerWidth = container?.offsetWidth || 800;
    
    if (containerWidth < 600) {
        return 'Popup';
    } else if (containerWidth < 1000) {
        return 'MultiRow';
    } else {
        return 'Scrollable';
    }
}

let tabObj: Tab = new Tab({
    items: [...],
    overflowMode: getOptimalOverflowMode()
});
tabObj.appendTo('#element');
```

### Pattern 2: Dynamic Mode Switching

```typescript
let tabObj: Tab = new Tab({
    items: [...],
    overflowMode: 'Scrollable'
});
tabObj.appendTo('#element');

// Switch mode based on conditions
function switchMode(mode: 'Scrollable' | 'Popup' | 'MultiRow') {
    tabObj.overflowMode = mode;
    tabObj.refresh();
}

// Listen for window resize
window.addEventListener('resize', () => {
    let newMode = getOptimalOverflowMode();
    if (tabObj.overflowMode !== newMode) {
        switchMode(newMode as any);
    }
});
```

### Pattern 3: Configuration with Width Constraints

```typescript
let tabObj: Tab = new Tab({
    items: [...],
    overflowMode: 'Scrollable',
    width: 'calc(100% - 20px)',  // Responsive width
    selectedItem: 0
});
tabObj.appendTo('#element');

// Auto-resize on container resize
let resizeObserver = new ResizeObserver(() => {
    tabObj.refresh();
});
resizeObserver.observe(document.getElementById('tabContainer')!);
```

### Pattern 4: Touch-Friendly Responsive Tabs

```typescript
let tabObj: Tab = new Tab({
    items: [...],
    overflowMode: 'Popup',           // Popup on small screens
    heightAdjustMode: 'Auto',
    scrollStep: 50,                  // Smaller scroll step for touch
    cssClass: 'touch-friendly'       // Custom styling for touch
});
tabObj.appendTo('#element');
```

```css
.touch-friendly .e-tab-header .e-toolbar-item {
    min-height: 48px;  /* Touch target size */
}

.touch-friendly .e-tab-header .e-toolbar-item .e-tab-wrap {
    padding: 12px 16px;
}

.touch-friendly .e-popup-up-icon,
.touch-friendly .e-popup-down-icon {
    min-width: 48px;
    min-height: 48px;
}
```

## Troubleshooting

### Issue: Tabs Not Wrapping in MultiRow Mode
**Solution:** Ensure container has sufficient width or set explicit width percentage.

### Issue: Scroll Arrows Not Appearing
**Solution:** Check if `overflowMode` is set to 'Scrollable' and tabs exceed container width.

### Issue: Popup Menu Too Large
**Solution:** Tab component auto-scrolls popup if it exceeds viewport height.

### Issue: Content Cut Off at Edges
**Solution:** Adjust `heightAdjustMode` or set explicit height with overflow handling.

---

**Related Topics:**
- [Getting Started](./getting-started.md) - Basic Tab initialization
- [Tab Structure and Content](./tab-structure-and-content.md) - Header and content configuration
- [Customization and Styling](./customization-and-styling.md) - Responsive CSS patterns
