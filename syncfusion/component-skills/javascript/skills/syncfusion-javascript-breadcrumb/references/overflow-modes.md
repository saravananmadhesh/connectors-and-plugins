# Overflow Modes and Behaviors

## Table of Contents
- [Overflow Mode Overview](#overflow-mode-overview)
- [Menu Mode](#menu-mode)
- [Collapsed Mode](#collapsed-mode)
- [Hidden Mode](#hidden-mode)
- [Scroll Mode](#scroll-mode)
- [Wrap Mode](#wrap-mode)
- [None Mode](#none-mode)
- [Mode Selection Guide](#mode-selection-guide)

## Overflow Mode Overview

The `overflowMode` property determines how the breadcrumb handles items that exceed the `maxItems` limit. Each mode provides a different user experience for navigating deep hierarchies.

### BreadcrumbOverflowMode Enum

```typescript
// Available overflow modes
type BreadcrumbOverflowMode = 
  | 'Menu'      // Default: Submenu for overflow items
  | 'Collapsed' // Collapsed icon with hidden items
  | 'Hidden'    // Max items visible, hidden items on previous click
  | 'Scroll'    // HTML scroll bar
  | 'Wrap'      // Multiple lines
  | 'None';     // Single line, all items

// Using the enum
import { BreadcrumbOverflowMode } from '@syncfusion/ej2-navigations';

const breadcrumb = new Breadcrumb({
  items: [...deepItems],
  maxItems: 4,
  overflowMode: BreadcrumbOverflowMode.Menu
});
```

### maxItems Configuration

The `maxItems` property works in conjunction with `overflowMode`:

```typescript
// maxItems = 4 means first 4 items display, rest are hidden
const breadcrumb = new Breadcrumb({
  items: [
    { text: 'Home', url: '/' },
    { text: 'Level 1', url: '/l1' },
    { text: 'Level 2', url: '/l2' },
    { text: 'Level 3', url: '/l3' },
    { text: 'Level 4', url: '/l4' },
    { text: 'Level 5', url: '/l5' },
    { text: 'Level 6', url: '/l6' }
  ],
  maxItems: 4,
  overflowMode: 'Menu'
});

// maxItems = -1 disables overflow behavior (shows all items)
const breadcrumb2 = new Breadcrumb({
  items: [...],
  maxItems: -1,
  overflowMode: 'None'
});
```

## Menu Mode

**Mode Value:** `'Menu'`  
**Default:** Yes  
**Best For:** Deep hierarchies with many items

The Menu mode displays the maximum number of items that fit in the container space and creates a submenu with the remaining hidden items.

### How It Works

```typescript
const breadcrumb = new Breadcrumb({
  items: [
    { text: 'Home', url: '/' },
    { text: 'Products', url: '/products' },
    { text: 'Electronics', url: '/electronics' },
    { text: 'Phones', url: '/phones' },
    { text: 'Smartphones', url: '/smartphones' },
    { text: 'Current', url: '/current' }
  ],
  maxItems: 4,
  overflowMode: 'Menu'
});

// Display: Home / Products / Electronics / ...
//          Clicking ... shows submenu with [Phones, Smartphones, Current]
```

### Features

- Compact display with submenu for overflow items
- Click the overflow icon (...) to reveal hidden items
- Smooth dropdown menu experience
- User can navigate through submenu

### Example with Styling

```typescript
const breadcrumb = new Breadcrumb({
  items: [...deepItems],
  maxItems: 5,
  overflowMode: 'Menu',
  cssClass: 'menu-overflow'
});
```

```css
.e-breadcrumb.menu-overflow {
  background: #f9f9f9;
  padding: 12px 16px;
  border: 1px solid #e0e0e0;
}

.e-breadcrumb.menu-overflow .e-overflow {
  color: #0066cc;
  font-weight: bold;
  cursor: pointer;
}

.e-breadcrumb.menu-overflow .e-overflow:hover {
  text-decoration: underline;
}
```

## Collapsed Mode

**Mode Value:** `'Collapsed'`  
**Best For:** Very deep hierarchies requiring minimal space

The Collapsed mode shows only the first and last items, with remaining items hidden in a collapsed icon. Clicking the icon reveals all items.

### How It Works

```typescript
const breadcrumb = new Breadcrumb({
  items: [
    { text: 'Home', url: '/' },
    { text: 'Products', url: '/products' },
    { text: 'Electronics', url: '/electronics' },
    { text: 'Phones', url: '/phones' },
    { text: 'Smartphones', url: '/smartphones' },
    { text: 'Current', url: '/current' }
  ],
  maxItems: 3,
  overflowMode: 'Collapsed'
});

// Display: Home / [collapsed-icon] / Current
//          Clicking collapsed icon shows all items
```

### Features

- Extremely compact display
- Shows first and last item only
- Middle items hidden in collapsed icon
- Expands to full breadcrumb on click
- Maximum space savings

### Configuration

```typescript
const breadcrumb = new Breadcrumb({
  items: [...veryDeepItems],
  maxItems: 2,
  overflowMode: 'Collapsed',
  cssClass: 'collapsed-breadcrumb'
});
```

```css
.e-breadcrumb.collapsed-breadcrumb {
  padding: 8px 12px;
}

.e-breadcrumb.collapsed-breadcrumb .e-collapsed {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #f0f0f0;
  cursor: pointer;
  font-weight: bold;
}

.e-breadcrumb.collapsed-breadcrumb .e-collapsed:hover {
  background: #e0e0e0;
}
```

## Hidden Mode

**Mode Value:** `'Hidden'`  
**Best For:** Progressive disclosure with user control

The Hidden mode displays the maximum number of items possible. Hidden items become visible when clicking a previous item in the breadcrumb.

### How It Works

```typescript
const breadcrumb = new Breadcrumb({
  items: [
    { text: 'Home', url: '/' },
    { text: 'Products', url: '/products' },
    { text: 'Electronics', url: '/electronics' },
    { text: 'Phones', url: '/phones' },
    { text: 'Smartphones', url: '/smartphones' },
    { text: 'Current', url: '/current' }
  ],
  maxItems: 4,
  overflowMode: 'Hidden'
});

// Initial: Home / Products / Electronics / Phones
// Click Products: Products / Electronics / Phones / Smartphones
// Click Electronics: Electronics / Phones / Smartphones / Current
```

### Features

- Progressive disclosure of items
- Click previous item to reveal next hidden items
- Adapts to container width
- Smooth navigation through hierarchy

### Use Case Example

```typescript
// File browser breadcrumb
const breadcrumb = new Breadcrumb({
  items: [
    { text: 'C:', url: '/c' },
    { text: 'Users', url: '/c/users' },
    { text: 'Documents', url: '/c/users/documents' },
    { text: 'Projects', url: '/c/users/documents/projects' },
    { text: 'MyProject', url: '/c/users/documents/projects/myproject' },
    { text: 'src', url: '/c/users/documents/projects/myproject/src' }
  ],
  maxItems: 3,
  overflowMode: 'Hidden'
});
```

## Scroll Mode

**Mode Value:** `'Scroll'`  
**Best For:** Fixed-width containers with many items

The Scroll mode displays all items with an HTML scroll bar when the breadcrumb width exceeds the container space.

### How It Works

```typescript
const breadcrumb = new Breadcrumb({
  items: [...manyItems],
  maxItems: -1,
  overflowMode: 'Scroll'
});

// All items visible with horizontal scroll bar
// Users scroll to see items
```

### Features

- All items always visible
- Horizontal scroll bar for navigation
- Preserves full context
- No items hidden

### Configuration with Container

```html
<div class="scroll-breadcrumb-container">
  <nav id="breadcrumb"></nav>
</div>
```

```typescript
const breadcrumb = new Breadcrumb({
  items: [
    { text: 'Home', url: '/' },
    { text: 'Products', url: '/products' },
    { text: 'Electronics', url: '/electronics' },
    { text: 'Phones', url: '/phones' },
    { text: 'Smartphones', url: '/smartphones' },
    { text: 'Latest', url: '/latest' },
    { text: 'Premium', url: '/premium' }
  ],
  maxItems: -1,
  overflowMode: 'Scroll'
});
breadcrumb.appendTo('#breadcrumb');
```

```css
.scroll-breadcrumb-container {
  width: 300px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.e-breadcrumb {
  white-space: nowrap;
  overflow-x: auto;
  padding: 10px;
}

/* Customize scroll bar */
.e-breadcrumb::-webkit-scrollbar {
  height: 8px;
}

.e-breadcrumb::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.e-breadcrumb::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

.e-breadcrumb::-webkit-scrollbar-thumb:hover {
  background: #555;
}
```

## Wrap Mode

**Mode Value:** `'Wrap'`  
**Best For:** Responsive design with flexible container

The Wrap mode wraps items to multiple lines when the breadcrumb's width exceeds the container space, allowing all items to be visible without scrolling.

### How It Works

```typescript
const breadcrumb = new Breadcrumb({
  items: [
    { text: 'Home', url: '/' },
    { text: 'Products', url: '/products' },
    { text: 'Electronics', url: '/electronics' },
    { text: 'Phones', url: '/phones' },
    { text: 'Smartphones', url: '/smartphones' },
    { text: 'Latest', url: '/latest' }
  ],
  maxItems: -1,
  overflowMode: 'Wrap'
});

// All items visible
// Items wrap to next line if needed
// Display adapts to container size
```

### Features

- All items visible without scrolling
- Wraps to multiple lines
- Responsive to container width
- No hidden items

### Responsive Implementation

```typescript
const breadcrumb = new Breadcrumb({
  items: [...deepItems],
  maxItems: -1,
  overflowMode: 'Wrap',
  cssClass: 'responsive-breadcrumb'
});
breadcrumb.appendTo('#breadcrumb');
```

```css
.e-breadcrumb.responsive-breadcrumb {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 12px;
  background: #f5f5f5;
}

.e-breadcrumb.responsive-breadcrumb .e-breadcrumb-item {
  display: inline-block;
  flex-shrink: 0;
}

@media (max-width: 600px) {
  .e-breadcrumb.responsive-breadcrumb {
    gap: 4px;
    padding: 8px;
  }
}
```

## None Mode

**Mode Value:** `'None'`  
**Best For:** Narrow spaces with few items

The None mode displays all items on a single line without any overflow handling. Items are not wrapped or scrollable.

### How It Works

```typescript
const breadcrumb = new Breadcrumb({
  items: [
    { text: 'Home', url: '/' },
    { text: 'Products', url: '/products' },
    { text: 'Current', url: '/current' }
  ],
  maxItems: -1,
  overflowMode: 'None'
});

// All items on single line
// No scroll, wrap, or menu
```

### Features

- Simple linear display
- No overflow handling
- Minimal performance impact
- Best for short breadcrumbs

### Configuration

```typescript
const breadcrumb = new Breadcrumb({
  items: [
    { text: 'Home', url: '/' },
    { text: 'Admin', url: '/admin' }
  ],
  overflowMode: 'None',
  cssClass: 'simple-breadcrumb'
});
```

## Mode Selection Guide

### Choose Your Mode

| Mode | Best For | Container | Items | Use When |
|------|----------|-----------|-------|----------|
| **Menu** | Deep hierarchies | Any | 5+ | Default choice, good UX |
| **Collapsed** | Maximum space saving | Small | 6+ | Very limited space |
| **Hidden** | Progressive navigation | Medium | 6+ | File browsers, navigators |
| **Scroll** | Full context needed | Fixed width | Many | Desktop applications |
| **Wrap** | Responsive design | Flexible | Many | Mobile-friendly apps |
| **None** | Simple paths | Any | Few | Short navigation paths |

### Decision Tree

```
Start: How many breadcrumb levels?
│
├─ Few (< 4) → Use 'None'
│
├─ Medium (4-6)
│  ├─ Space critical? → 'Collapsed'
│  └─ Normal space? → 'Menu'
│
└─ Many (> 6)
   ├─ Fixed container? → 'Scroll'
   ├─ Responsive design? → 'Wrap'
   └─ Progressive UI? → 'Hidden'
```

### Code Examples

```typescript
// Decision-based mode selection
function selectOverflowMode(itemCount, containerType) {
  if (itemCount < 4) return 'None';
  if (containerType === 'mobile') return 'Wrap';
  if (containerType === 'compact') return 'Collapsed';
  if (containerType === 'fixed') return 'Scroll';
  return 'Menu';  // Default
}

const breadcrumb = new Breadcrumb({
  items: [...items],
  maxItems: 4,
  overflowMode: selectOverflowMode(items.length, 'desktop')
});
```

---

**Next:** Learn how to handle component events using [events-handling.md](events-handling.md).
