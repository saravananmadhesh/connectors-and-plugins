# Tab Structure and Content

## Table of Contents
- [Tab Item Structure](#tab-item-structure)
- [Header Configuration](#header-configuration)
- [Content Management](#content-management)
- [Tab Selection](#tab-selection)
- [Selection Events](#selection-events)
- [Common Patterns](#common-patterns)

## Tab Item Structure

Each tab item has two main parts: **header** and **content**.

### Basic Item Structure

```typescript
{
    header: { 'text': 'Tab Name' },
    content: 'Tab content here'
}
```

### Full Item Structure

```typescript
{
    header: {
        'text': 'Twitter',           // Header text
        'iconCss': 'e-icon-twitter', // Icon CSS class
        'tooltip': 'Twitter Tab'     // Tooltip text
    },
    content: 'Content text or HTML'
}
```

## Header Configuration

### Text-Only Header

```typescript
let tabObj: Tab = new Tab({
    items: [
        { header: { 'text': 'Home' }, content: 'Home content' },
        { header: { 'text': 'About' }, content: 'About content' },
        { header: { 'text': 'Contact' }, content: 'Contact content' }
    ]
});
tabObj.appendTo('#element');
```

### Header with Icons

```typescript
let tabObj: Tab = new Tab({
    items: [
        {
            header: { 'text': 'Settings', 'iconCss': 'e-icon-settings' },
            content: 'Settings panel'
        },
        {
            header: { 'text': 'Profile', 'iconCss': 'e-icon-user' },
            content: 'User profile'
        }
    ]
});
tabObj.appendTo('#element');
```

### Header Styles

The Tab supports predefined header styles:

```typescript
// Apply to root element
tabObj.element.classList.add('e-fill');     // Solid fill background
tabObj.element.classList.add('e-background'); // Solid fill with border
tabObj.element.classList.add('e-accent');    // Solid fill with accent color
```

### Icon Positioning

Configure icon position relative to text:

```typescript
let tabObj: Tab = new Tab({
    items: [...],
    iconPosition: 'Left'     // Default: 'Left', 'Right', 'Top', 'Bottom'
});
tabObj.appendTo('#element');
```

## Content Management

### Text Content

```typescript
{
    header: { 'text': 'Overview' },
    content: 'This is simple text content'
}
```

### HTML Content

```typescript
{
    header: { 'text': 'Dashboard' },
    content: `
        <div class="dashboard">
            <h2>Dashboard</h2>
            <p>Welcome to dashboard</p>
            <button>Action</button>
        </div>
    `
}
```

### Content Rendering Modes

Tab supports three rendering modes:

1. **On Demand (Lazy Loading)** - Content loaded when tab is selected
2. **Dynamic** - Content rendered dynamically
3. **Initial** - All content rendered on init

```typescript
let tabObj: Tab = new Tab({
    items: [...],
    heightAdjustMode: 'Content'  // Auto-adjust to content height
});
```

## Tab Selection

### Programmatic Selection

Select a tab by index:

```typescript
// Select second tab (index 1)
tabObj.select(1);

// Get currently selected tab index
let activeIndex: number = tabObj.selectedItem;
console.log('Selected tab:', activeIndex);
```

### Select Multiple Tabs

Only one tab can be active at a time, but you can track which was previously selected:

```typescript
let previousTab: number = tabObj.selectedItem;

tabObj.select(2);
console.log('Previous tab was:', previousTab);
console.log('Current tab is:', tabObj.selectedItem);
```

## Selection Events

### Detecting User vs Programmatic Selection

```typescript
let tabObj: Tab = new Tab({
    items: [...],
    selecting: (args) => {
        if (args.isInteracted) {
            console.log('User clicked tab');
            console.log('Selected index:', args.selectedIndex);
        } else {
            console.log('Tab selected programmatically');
        }
    },
    selected: (args) => {
        if (args.isInteracted) {
            console.log('User finished selecting tab');
        }
        console.log('Newly selected tab content:', args.content);
    }
});
tabObj.appendTo('#element');
```

### Selection Event Arguments

```typescript
// SelectingEventArgs (fired before selection changes)
{
    isInteracted: boolean,      // User clicked or programmatic
    selectedIndex: number,       // Index being selected
    previousIndex: number,       // Previously selected index
    content: string,             // Tab content
    target: HTMLElement          // Target element
}

// SelectEventArgs (fired after selection changes)
{
    isInteracted: boolean,       // User clicked or programmatic
    content: string,             // Selected tab content
    previousIndex: number,       // Previously selected index
}
```

### Common Patterns

#### Pattern 1: Prevent Selection

```typescript
let tabObj: Tab = new Tab({
    items: [...],
    selecting: (args) => {
        // Prevent selecting tab at index 2
        if (args.selectedIndex === 2) {
            args.cancel = true;
            console.log('Selection prevented');
        }
    }
});
tabObj.appendTo('#element');
```

#### Pattern 2: Conditional Navigation

```typescript
let tabObj: Tab = new Tab({
    items: [...],
    selecting: (args) => {
        // Only allow selection if form is valid
        if (!isFormValid()) {
            args.cancel = true;
            alert('Please complete the form first');
        }
    }
});

function isFormValid(): boolean {
    // Add validation logic
    return true;
}
```

#### Pattern 3: Track Selection History

```typescript
let selectionHistory: number[] = [];

let tabObj: Tab = new Tab({
    items: [...],
    selected: (args) => {
        selectionHistory.push(args.previousIndex !== undefined ? args.previousIndex : -1);
        console.log('History:', selectionHistory);
    }
});
tabObj.appendTo('#element');
```

#### Pattern 4: Sync Tab Selection with URL

```typescript
// Set tab from URL parameter
let urlParams = new URLSearchParams(window.location.search);
let tabIndex = parseInt(urlParams.get('tab') || '0');

let tabObj: Tab = new Tab({
    items: [...],
    selectedItem: tabIndex,
    selected: (args) => {
        // Update URL when tab changes
        window.history.pushState({}, '', `?tab=${tabObj.selectedItem}`);
    }
});
tabObj.appendTo('#element');
```

## Common Issues and Solutions

### Issue: Selection Events Not Firing
**Solution:** Ensure Tab is properly initialized with `appendTo()` before selecting.

### Issue: Content Not Updating
**Solution:** Check that content property matches between header and content items in order.

### Issue: Tab Won't Select
**Solution:** Check if `selecting` event has `args.cancel = true` preventing selection.

---

**Related Topics:**
- [Customization and Styling](./customization-and-styling.md) - Style headers and selected states
- [Data Binding](./data-binding.md) - Load content from data sources
- [Accessibility](./accessibility-and-localization.md) - Keyboard navigation for tab selection
