# Component Properties Overview

## Table of Contents
- [Core Properties](#core-properties)
- [Navigation Configuration](#navigation-configuration)
- [State Management](#state-management)
- [URL-based Generation](#url-based-generation)
- [Styling and Appearance](#styling-and-appearance)
- [Property Combinations](#property-combinations)

## Core Properties

### activeItem
**Type:** `string`  
**Default:** `''`

Specifies the URL of the active breadcrumb item, which is typically highlighted or styled differently to show the current location.

```typescript
const breadcrumb = new Breadcrumb({
  items: [
    { text: 'Home', url: '/' },
    { text: 'Products', url: '/products' },
    { text: 'Electronics', url: '/products/electronics' }
  ],
  activeItem: '/products/electronics'  // Mark Electronics as active
});
```

**Use Cases:**
- Highlight the current page in the navigation path
- Show user's current location in the breadcrumb trail
- Update active item based on route changes

### items
**Type:** `BreadcrumbItemModel[]`  
**Default:** `[]`

Defines the list of breadcrumb items to display. Each item represents a level in the navigation hierarchy.

```typescript
const breadcrumb = new Breadcrumb({
  items: [
    { id: '1', text: 'Home', url: '/', disabled: false },
    { id: '2', text: 'Category', url: '/category', disabled: false },
    { id: '3', text: 'Product', url: '/product', disabled: false }
  ]
});
```

**Item Object Structure:**
- `id` (string): Unique identifier
- `text` (string): Display text
- `url` (string): Navigation URL
- `disabled` (boolean): Item state
- `iconCss` (string): Icon CSS classes

### disabled
**Type:** `boolean`  
**Default:** `false`

Enable or disable the entire breadcrumb component. When set to true, the breadcrumb and all its items become non-interactive.

```typescript
// Disabled breadcrumb
const breadcrumb = new Breadcrumb({
  items: [...],
  disabled: true  // All items are disabled
});

// Enable later
breadcrumb.disabled = false;
breadcrumb.dataBind();
```

**Behavior:**
- Visual state changes (grayed out appearance)
- Item click events do not fire
- Navigation is prevented
- Still renders but appears inactive

### maxItems
**Type:** `number`  
**Default:** `-1`

Specifies the maximum number of items to display. When the actual item count exceeds this value, the overflow mode determines how remaining items are handled. Value of `-1` means unlimited items.

```typescript
// Show maximum 4 items, rest handled by overflow mode
const breadcrumb = new Breadcrumb({
  items: [
    { text: 'Home', url: '/' },
    { text: 'Level1', url: '/l1' },
    { text: 'Level2', url: '/l2' },
    { text: 'Level3', url: '/l3' },
    { text: 'Level4', url: '/l4' },
    { text: 'Level5', url: '/l5' }
  ],
  maxItems: 4,
  overflowMode: 'Menu'
});

// Unlimited items (no overflow)
const breadcrumb2 = new Breadcrumb({
  items: [...],
  maxItems: -1
});
```

## Navigation Configuration

### enableNavigation
**Type:** `boolean`  
**Default:** `true`

Enable or disable item navigation. When set to false, breadcrumb items become non-clickable, serving as display-only elements.

```typescript
// Navigation enabled (default)
const breadcrumb = new Breadcrumb({
  items: [...],
  enableNavigation: true  // Items are clickable
});

// Navigation disabled (display only)
const breadcrumb = new Breadcrumb({
  items: [...],
  enableNavigation: false  // Items are not clickable
});
```

**Use Cases:**
- Read-only breadcrumb display
- Custom navigation handling via event handlers
- Preventing accidental navigation

### enableActiveItemNavigation
**Type:** `boolean`  
**Default:** `false`

Enable or disable navigation of the active item. When false, the current/active item cannot be clicked to navigate.

```typescript
// Active item not navigable (default)
const breadcrumb = new Breadcrumb({
  items: [
    { text: 'Home', url: '/' },
    { text: 'Products', url: '/products' }  // Current active item
  ],
  activeItem: '/products',
  enableActiveItemNavigation: false  // Cannot click Products
});

// Active item is navigable
const breadcrumb2 = new Breadcrumb({
  items: [...],
  enableActiveItemNavigation: true  // Can click active item
});
```

## State Management

### enablePersistence
**Type:** `boolean`  
**Default:** `false`

Enable or disable persisting the component's state between page reloads. When enabled, the current state is saved to browser storage.

```typescript
// With persistence
const breadcrumb = new Breadcrumb({
  items: [...],
  activeItem: '/current',
  enablePersistence: true  // State saved to localStorage
});

// After page reload, activeItem is restored
```

**What is Persisted:**
- Active item
- Disabled state
- Custom CSS classes

**Storage Method:**
- Uses browser localStorage
- Requires localStorage permission

### enableRtl
**Type:** `boolean`  
**Default:** `false`

Enable or disable rendering the component in right-to-left direction for RTL languages (Arabic, Hebrew, etc.).

```typescript
// LTR (default)
const breadcrumb = new Breadcrumb({
  items: [...],
  enableRtl: false
});

// RTL for Arabic
const breadcrumb = new Breadcrumb({
  items: [...],
  enableRtl: true
});
```

**RTL Behavior:**
- Items display from right to left
- Separators position reversed
- Text alignment adjusted
- Icon positioning mirrored

## URL-based Generation

### url
**Type:** `string`  
**Default:** `''`

Defines the URL based on which breadcrumb items are automatically generated. The component parses the URL and creates breadcrumb items from the path segments.

```typescript
// Generate breadcrumb from URL
const breadcrumb = new Breadcrumb({
  url: '/products/electronics/smartphones',
  enableNavigation: true
});

// Generates items:
// Home (/) -> Products (/products) -> Electronics (/products/electronics) -> Smartphones
```

**Automatic Path Generation:**
- Splits URL by `/`
- Creates items for each path segment
- First segment becomes Home
- Last segment is active item

**Note:** When using `url` property, the `items` array is not required.

## Styling and Appearance

### cssClass
**Type:** `string`  
**Default:** `''`

Defines CSS class(es) to apply to the breadcrumb element. Multiple classes can be separated by spaces.

```typescript
// Single class
const breadcrumb = new Breadcrumb({
  items: [...],
  cssClass: 'custom-breadcrumb'
});

// Multiple classes
const breadcrumb = new Breadcrumb({
  items: [...],
  cssClass: 'custom-breadcrumb dark-theme large-text'
});
```

```css
.custom-breadcrumb {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 15px;
  border-radius: 8px;
}

.custom-breadcrumb.dark-theme .e-breadcrumb-item {
  color: #fff;
}

.custom-breadcrumb.large-text .e-breadcrumb-item {
  font-size: 18px;
}
```

### itemTemplate
**Type:** `string | Function`  
**Default:** `null`

Specifies a custom template for rendering breadcrumb items. Can be an HTML string or template function.

```typescript
// String template
const breadcrumb = new Breadcrumb({
  items: [...],
  itemTemplate: '<span class="custom-item">${text}</span>'
});

// Function template
const breadcrumb = new Breadcrumb({
  items: [...],
  itemTemplate: (context) => {
    return `<span class="item-${context.id}">${context.text}</span>`;
  }
});
```

### separatorTemplate
**Type:** `string | Function`  
**Default:** `'/'`

Specifies a custom template for breadcrumb separators. Replaces the default "/" separator.

```typescript
// Custom separator string
const breadcrumb = new Breadcrumb({
  items: [...],
  separatorTemplate: '>'
});

// Arrow separator
const breadcrumb = new Breadcrumb({
  items: [...],
  separatorTemplate: '<span class="arrow">→</span>'
});

// Function template
const breadcrumb = new Breadcrumb({
  items: [...],
  separatorTemplate: () => '<i class="e-icons e-chevron-right"></i>'
});
```

## Property Combinations

### Common Configuration Patterns

**Pattern 1: Read-Only Display Breadcrumb**
```typescript
const breadcrumb = new Breadcrumb({
  items: [...],
  enableNavigation: false,
  cssClass: 'read-only-breadcrumb'
});
```

**Pattern 2: Site Navigation with Active Item**
```typescript
const breadcrumb = new Breadcrumb({
  items: [
    { text: 'Home', url: '/' },
    { text: 'Products', url: '/products' },
    { text: 'Category', url: '/products/cat' }
  ],
  activeItem: '/products/cat',
  enableActiveItemNavigation: false,
  cssClass: 'site-navigation'
});
```

**Pattern 3: Long Path with Overflow**
```typescript
const breadcrumb = new Breadcrumb({
  items: [...deeplyNestedItems],
  maxItems: 5,
  overflowMode: 'Menu',
  cssClass: 'overflow-breadcrumb'
});
```

**Pattern 4: Persistent Navigation State**
```typescript
const breadcrumb = new Breadcrumb({
  items: [...],
  enablePersistence: true,
  cssClass: 'persistent-breadcrumb'
});
```

**Pattern 5: RTL with Custom Styling**
```typescript
const breadcrumb = new Breadcrumb({
  items: [...],
  enableRtl: true,
  cssClass: 'rtl-theme',
  separatorTemplate: '>'
});
```

---

**Next:** Learn how to configure individual breadcrumb items using [items-configuration.md](items-configuration.md).
