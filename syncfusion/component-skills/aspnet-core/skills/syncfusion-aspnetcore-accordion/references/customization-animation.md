# Customization & Animation

## Table of Contents

- [Overview](#overview)
- [Animation Configuration](#animation-configuration)
- [Animation Effects](#animation-effects)
- [Event Handling](#event-handling)
- [Programmatic Control](#programmatic-control)
- [Advanced Patterns](#advanced-patterns)
- [Troubleshooting](#troubleshooting)

---

## Overview

Customizing accordion appearance and behavior involves:

- **Animations**: Configure expand/collapse transition effects
- **Events**: Respond to user interactions and state changes
- **Programmatic Control**: Expand/collapse items via code
- **CSS Customization**: Apply custom styles to accordion elements
- **Advanced Interactions**: Sequential operations, conditional expansion, and complex workflows

This reference covers all customization options available in the Accordion component.

---

## Animation Configuration

### Animation Properties

The Accordion component exposes animation settings through the `animation` property:

```csharp
public class AccordionAnimationSettings
{
    // Settings for expand animation
    public AccordionActionSettings Expand { get; set; }
    
    // Settings for collapse animation
    public AccordionActionSettings Collapse { get; set; }
}

public class AccordionActionSettings
{
    public string Effect { get; set; }      // Animation effect (SlideDown, SlideUp, etc.)
    public int Duration { get; set; }       // Duration in milliseconds
    public string Easing { get; set; }      // Easing function (linear, ease-in, etc.)
}
```

### Default Animation

By default, the Accordion uses:

```
Expand:   { effect: 'SlideDown', duration: 400, easing: 'linear' }
Collapse: { effect: 'SlideUp', duration: 400, easing: 'linear' }
```

### Customizing Animation via Markup

Configure animation properties in the Razor view:

```cshtml
<ejs-accordion id="customAnimAccordion" animation="animation">
</ejs-accordion>

<script>
    document.addEventListener('DOMContentLoaded', function() {
        var accordion = document.getElementById('customAnimAccordion').ej2_instances[0];
        
        // Customize animation settings
        var animation = {
            expand: {
                effect: 'SlideDown',
                duration: 600,          // Slower animation
                easing: 'ease-in-out'
            },
            collapse: {
                effect: 'SlideUp',
                duration: 300,          // Faster collapse
                easing: 'ease-in'
            }
        };
    });
</script>
```

---

## Animation Effects

### Available Effects

The Accordion supports multiple animation effects for both expand and collapse actions:

#### SlideDown / SlideUp

The default sliding animation. Content slides down when expanding and up when collapsing.

```javascript
expand: { effect: 'SlideDown', duration: 400, easing: 'linear' },
collapse: { effect: 'SlideUp', duration: 400, easing: 'linear' }
```

#### FadeIn / FadeOut

Smooth fade effect where content fades in or out.

```javascript
expand: { effect: 'FadeIn', duration: 500, easing: 'ease-in-out' },
collapse: { effect: 'FadeOut', duration: 500, easing: 'ease-in-out' }
```

#### ZoomIn / ZoomOut

Content grows or shrinks with opacity change.

```javascript
expand: { effect: 'ZoomIn', duration: 600, easing: 'ease-out' },
collapse: { effect: 'ZoomOut', duration: 400, easing: 'ease-in' }
```

### Disabling Animation

To disable animations entirely:

```javascript
var animation = {
    expand: { effect: 'None', duration: 0 },
    collapse: { effect: 'None', duration: 0 }
};
```

### Duration and Easing

#### Duration

Specify duration in milliseconds:

```javascript
expand: { effect: 'SlideDown', duration: 1000 }  // 1 second
collapse: { effect: 'SlideUp', duration: 200 }   // 200ms
```

#### Easing Functions

- `'linear'`: Constant speed (default)
- `'ease-in'`: Slow start
- `'ease-out'`: Slow end
- `'ease-in-out'`: Slow start and end
- `'ease'`: Similar to ease-in-out

```javascript
expand: { effect: 'SlideDown', duration: 400, easing: 'ease-in-out' }
```

---

## Event Handling

### Accordion Events

The Accordion component fires events at different lifecycle stages:

| Event | Timing | Cancelable | Use Case |
|-------|--------|-----------|----------|
| `created` | After render complete | No | Initialize dependent components |
| `expanding` | Before expand/collapse starts | Yes | Prevent/allow state changes |
| `expanded` | After animation completes | No | Perform post-expand actions |
| `clicked` | When any accordion area clicked | No | Track user interactions |
| `destroyed` | When accordion is removed | No | Clean up resources |

### Creating Event Handlers

#### Via Razor Attributes

```cshtml
<ejs-accordion id="eventAccordion" expanding="OnExpanding" expanded="OnExpanded">
    <e-accordion-accordionitems>
        <e-accordion-accordionitem header="Item 1" content="Content 1"></e-accordion-accordionitem>
    </e-accordion-accordionitems>
</ejs-accordion>

<script>
    function OnExpanding(args) {
        console.log('Item expanding:', args);
    }
    
    function OnExpanded(args) {
        console.log('Item expanded:', args);
    }
</script>
```

#### Via JavaScript Event Binding

```javascript
document.addEventListener('DOMContentLoaded', function() {
    var accordion = document.getElementById('myAccordion').ej2_instances[0];
    
    function expanding(args) {
        console.log('Expanding event fired');
        console.log('Item:', args.item);
        console.log('Is expanding:', args.isExpanding);
    };
    
    function expanded(args) {
        console.log('Expanded event fired');
    };
});
```

### Expanding Event - Conditional Prevention

Use the `expanding` event to conditionally prevent expansion/collapse:

```javascript
function expanding(args) {
    // Prevent collapsing if content has unsaved changes
    if (!args.isExpanding && hasUnsavedChanges()) {
        args.cancel = true;
        showWarningDialog('Save changes before collapsing?');
    }
};

function hasUnsavedChanges() {
    return document.querySelector('[data-unsaved="true"]') !== null;
}
```

### Event Args Properties

The `expanding` event provides the following information:

```javascript
function expanding(args) {
    console.log(args.item);           // The accordion item being expanded
    console.log(args.isExpanding);    // true if expanding, false if collapsing
    console.log(args.index);          // Index of the item
    console.log(args.cancel);         // Set to true to prevent the action
    console.log(args.originalEvent);  // The original DOM event
};
```

### Expanded Event - Post-Expansion Actions

Use the `expanded` event to perform actions after expansion completes:

```javascript
function expanded(args) {
    // Load additional content after expansion
    if (args.isExpanding) {
        loadSupplementaryContent(args.index);
    }
};

function loadSupplementaryContent(index) {
    // Fetch and display additional information
    fetch(`/api/supplementary-content/${index}`)
        .then(r => r.json())
        .then(data => {
            // Process loaded data
        });
}
```

### Created Event - Initialization

Use the `created` event to initialize components after accordion is ready:

```javascript
function created() {
    console.log('Accordion created and ready');
    
    // Initialize dependent components
    initializeCharts();
    initializeDataTables();
    attachEventListeners();
};
```

---

## Programmatic Control

### Expanding and Collapsing Items

Use the `expandItem()` method to expand or collapse items programmatically:

#### Single Item Control

```javascript
var accordion = document.getElementById('accordion').ej2_instances[0];

// Expand item at index 0
accordion.expandItem(true, 0);

// Collapse item at index 0
accordion.expandItem(false, 0);

// Expand item at index 2
accordion.expandItem(true, 2);
```

#### All Items at Once

Without specifying an index, all items are affected:

```javascript
// Expand all items (in Multiple mode)
accordion.expandItem(true);

// Collapse all items
accordion.expandItem(false);
```

### Enabling and Disabling Items

```javascript
var accordion = document.getElementById('accordion').ej2_instances[0];

// Disable item at index 1
accordion.enableItem(1, false);

// Enable item at index 1
accordion.enableItem(1, true);
```

### Showing and Hiding Items

```javascript
// Hide item at index 2
accordion.hideItem(2, true);

// Show item at index 2
accordion.hideItem(2, false);
```

### Adding and Removing Items

```javascript
// Add new item
var newItem = {
    Header: 'New Item',
    Content: 'New content here'
};
accordion.addItem(newItem);

// Add multiple items
var newItems = [
    { Header: 'Item 1', Content: 'Content 1' },
    { Header: 'Item 2', Content: 'Content 2' }
];
accordion.addItem(newItems);

// Add item at specific index (0-based)
accordion.addItem(newItem, 1);

// Remove item at index 2
accordion.removeItem(2);
```

---

## Advanced Patterns

### Sequential Expansion Pattern

Expand items one after another with delays:

```javascript
function expandSequentially(accordion, indices, delayMs = 500) {
    let currentIndex = 0;
    
    function expandNext() {
        if (currentIndex < indices.length) {
            accordion.expandItem(true, indices[currentIndex]);
            currentIndex++;
            setTimeout(expandNext, delayMs);
        }
    }
    
    expandNext();
}

// Usage: Expand items 0, 1, 2 with 500ms delay
expandSequentially(accordion, [0, 1, 2], 500);
```

### Conditional Expansion Based on Data

Expand items only if they meet certain criteria:

```javascript
function expandItemsWithTag(accordion, tag) {
    accordion.items.forEach((item, index) => {
        // Expand only items with matching tag
        if (item.tags && item.tags.includes(tag)) {
            accordion.expandItem(true, index);
        }
    });
}

// Usage: Expand only items tagged 'urgent'
expandItemsWithTag(accordion, 'urgent');
```

### Synchronized Expansion

Keep multiple accordions in sync:

```javascript
var accordion1 = document.getElementById('accordion1').ej2_instances[0];
var accordion2 = document.getElementById('accordion2').ej2_instances[0];

// When accordion1 item expands, expand corresponding item in accordion2
function expanding(args) {
    if (args.isExpanding) {
        accordion2.expandItem(true, args.index);
    }
}

// When accordion2 item expands, expand corresponding item in accordion1
function expanding(args) {
    if (args.isExpanding) {
        accordion1.expandItem(true, args.index);
    }
}
```

### Load Content on First Expansion

Load content only on first expansion, then cache it:

```javascript
var contentCache = {};

function expanding(args) {
    if (args.isExpanding && !contentCache[args.index]) {
        var item = args.item;
        
        // Load content for this item
        fetch(`/api/content/${args.index}`)
            .then(r => r.text())
            .then(html => {
                contentCache[args.index] = html;
                item.content = html;
                accordion.refresh();
            });
    }
}
```

### Prevent Consecutive Collapses

Allow expansion but prevent all items from being collapsed:

```javascript
function expanding(args) {
    if (!args.isExpanding) {
        // Check if at least one other item is expanded
        var otherExpanded = accordion.items.some((item, idx) => 
            idx !== args.index && 
            accordion.expandedIndices.includes(idx)
        );
        
        // Prevent collapse if no other items are expanded
        if (!otherExpanded) {
            args.cancel = true;
        }
    }
}
```

---

## Customizing Appearance

### CSS Class Customization

Apply custom CSS classes to accordion items:

```csharp
var items = new List<AccordionItem>
{
    new AccordionItem { 
        Header = "Important", 
        Content = "Content", 
        CssClass = "priority-high"
    },
    new AccordionItem { 
        Header = "Low Priority", 
        Content = "Content", 
        CssClass = "priority-low"
    }
};
```

```css
.priority-high {
    background-color: #fff3cd;
    border-left: 4px solid #ff6b6b;
}

.priority-high .e-acrdn-header {
    font-weight: bold;
    color: #d9534f;
}

.priority-low {
    opacity: 0.8;
}

.priority-low .e-acrdn-header {
    color: #666;
}
```

### Theme Customization

Override theme variables:

```css
:root {
    --accordion-header-bg: #f8f9fa;
    --accordion-header-text: #333;
    --accordion-active-bg: #e9ecef;
    --accordion-active-text: #000;
}

.e-acrdn-header {
    background-color: var(--accordion-header-bg);
    color: var(--accordion-header-text);
}

.e-acrdn-header.e-active {
    background-color: var(--accordion-active-bg);
    color: var(--accordion-active-text);
}
```

---

## Troubleshooting

### Animation Not Working

**Problem**: Animations don't appear to play.

**Solutions**:
1. Check if `duration` is 0 (should be >0)
2. Verify `effect` is a valid animation name
3. Check browser console for JavaScript errors
4. Ensure CSS files are loaded correctly

### Events Not Firing

**Problem**: Event handlers are not being called.

**Solutions**:
1. Verify event handler is attached after accordion initializes
2. Check console for function name typos
3. Ensure you're using correct event names (expanding, not onExpanding in script)
4. Check that event handler doesn't throw errors

### Performance Issues

**Problem**: Accordion animations are slow or jerky.

**Solutions**:
1. Reduce animation duration (e.g., 200ms instead of 600ms)
2. Simplify content structure (remove heavy DOM elements)
3. Disable unnecessary animations
4. Use `requestAnimationFrame` for smooth custom animations

### Items Not Expanding

**Problem**: Items won't expand when clicked.

**Solutions**:
1. Check if items are disabled with `enableItem()`
2. Verify `expanding` event handler isn't canceling expansion
3. Check browser console for errors
4. Ensure expand mode is correctly set

---

## Summary

Master accordion customization through:

- **Animations**: Configure effects, duration, and easing
- **Events**: Respond to user interactions with expanding, expanded, created events
- **Programmatic Control**: Use expandItem(), enableItem(), addItem() methods
- **Advanced Patterns**: Implement sequential expansion, conditional logic, and synchronization
- **Styling**: Customize appearance with CSS classes and theme variables

Combine these features to create highly interactive and responsive accordion components that enhance your application's user experience.
