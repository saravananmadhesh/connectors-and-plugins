# Advanced Features

## Table of Contents

- [Item State Management](#item-state-management)
- [Event Handling](#event-handling)
- [Header Interactions](#header-interactions)
- [Content Interactions](#content-interactions)
- [Accessibility Features](#accessibility-features)
- [RTL Support](#rtl-support)
- [Methods Reference](#methods-reference)

## Item State Management

### Enable/Disable Items

Control whether users can interact with specific items:

```typescript
import { Accordion } from '@syncfusion/ej2-navigations';

const accordion = new Accordion({
    items: [
        { header: 'Item 1', content: 'Content 1' },
        { header: 'Item 2', content: 'Content 2', disabled: true },  // Disabled initially
        { header: 'Item 3', content: 'Content 3' }
    ]
});

accordion.appendTo('#element');

// Enable/disable dynamically
setTimeout(() => {
    accordion.enableItem(1, true);  // Enable item at index 1
    accordion.enableItem(2, false); // Disable item at index 2
}, 2000);
```

### Disable All Items

```typescript
const accordion = new Accordion({
    items: [...]
});

accordion.appendTo('#element');

// Disable all items except specific ones
accordion.items.forEach((item, index) => {
    if (index !== 0) {  // Keep first item enabled
        accordion.enableItem(index, false);
    }
});
```

### Conditional Enable/Disable

```typescript
import { Accordion, ExpandEventArgs } from '@syncfusion/ej2-navigations';

const accordion = new Accordion({
    items: [
        { header: 'Step 1: Personal Info', content: 'Personal details form' },
        { header: 'Step 2: Address', content: 'Address information' },
        { header: 'Step 3: Payment', content: 'Payment details' }
    ],
    expanding: (args: ExpandEventArgs) => {
        // Only allow expanding if previous steps are completed
        const itemIndex = accordion.items.indexOf(args.item);
        
        if (itemIndex > 0) {
            const previousItemComplete = checkStepComplete(itemIndex - 1);
            if (!previousItemComplete) {
                args.cancel = true;
                alert('Complete previous step first');
            }
        }
    }
});

accordion.appendTo('#element');

function checkStepComplete(stepIndex: number): boolean {
    // Validation logic
    return true;
}
```

## Event Handling

### Expanding Event

Fires when an item begins to expand:

```typescript
import { Accordion, ExpandEventArgs } from '@syncfusion/ej2-navigations';

const accordion = new Accordion({
    items: [
        { header: 'Item 1', content: 'Content 1' },
        { header: 'Item 2', content: 'Content 2' }
    ],
    expanding: (args: ExpandEventArgs) => {
        console.log('Item expanding:', args.item.header);
        console.log('Index:', accordion.items.indexOf(args.item));
        
        // Prevent expansion conditionally
        if (args.item.header === 'Restricted Item') {
            args.cancel = true;
        }
    }
});

accordion.appendTo('#element');
```

### Expanded Event

Fires after an item is fully expanded:

```typescript
const accordion = new Accordion({
    items: [...],
    expanded: (args: ExpandEventArgs) => {
        console.log('Item fully expanded:', args.item.header);
        
        // Load content when item expands
        if (!args.item.content) {
            loadDynamicContent(args.item);
        }
    }
});
```

### Collapsing Event

Fires when an item begins to collapse:

```typescript
import { Accordion, ExpandEventArgs } from '@syncfusion/ej2-navigations';

const accordion = new Accordion({
    items: [...],
    collapsing: (args: ExpandEventArgs) => {
        console.log('Item collapsing:', args.item.header);
        
        // Warn if unsaved changes
        if (hasUnsavedChanges(args.item)) {
            args.cancel = true;
            alert('Save changes before collapsing');
        }
    }
});
```

### Collapsed Event

Fires after an item is fully collapsed:

```typescript
const accordion = new Accordion({
    items: [...],
    collapsed: (args: ExpandEventArgs) => {
        console.log('Item fully collapsed:', args.item.header);
        
        // Cleanup resources
        cleanupItemResources(args.item);
    }
});
```

### Created Event

Fires after accordion is created:

```typescript
import { Accordion } from '@syncfusion/ej2-navigations';

const accordion = new Accordion({
    items: [
        { header: 'Item 1', content: 'Content 1' },
        { header: 'Item 2', content: 'Content 2', disabled: true },
        { header: 'Item 3', content: 'Content 3' }
    ],
    created: () => {
        console.log('Accordion created with', accordion.items.length, 'items');
        
        // Initialize UI or load data
        initializeUI();
        loadInitialData();
    }
});

accordion.appendTo('#element');
```

## Header Interactions

### Header Click Behavior

```typescript
import { Accordion, AccordionClickArgs } from '@syncfusion/ej2-navigations';

const accordion = new Accordion({
    items: [...],
    clicked: (args: AccordionClickArgs) => {
        console.log('Header clicked:', args.item?.header);
        console.log('Click position:', args.originalEvent);
        
        // Handle specific header clicks
        if (args.item?.header === 'Options') {
            showContextMenu(args.originalEvent as MouseEvent);
        }
    }
});

accordion.appendTo('#element');
```

### Prevent Default Expand on Click

```typescript
const accordion = new Accordion({
    items: [...],
    clicked: (args: AccordionClickArgs) => {
        // Prevent default expansion
        args.cancel = true;
        
        // Custom expand logic
        customExpandLogic(args.item);
    }
});
```

### Icon Click Handling

```typescript
const accordion = new Accordion({
    items: [
        {
            header: 'Item with Action',
            iconCss: 'e-item-icon',
            content: 'Content'
        }
    ],
    clicked: (args: AccordionClickArgs) => {
        const target = args.originalEvent?.target as HTMLElement;
        
        // Check if icon was clicked
        if (target?.classList.contains('e-item-icon')) {
            handleIconClick(args.item);
        }
    }
});
```

## Content Interactions

### Accessing Item Content

```typescript
const accordion = new Accordion({
    items: [...]
});

accordion.appendTo('#element');

// Get content of specific item
const itemContent = accordion.items[0].content;
console.log(itemContent);

// Update item content
accordion.items[0].content = '<p>Updated content</p>';
```

### Modifying Items at Runtime

```typescript
// Update item header
accordion.items[0].header = 'New Header';

// Update item properties
accordion.items[1].disabled = true;
accordion.items[2].expanded = true;

// Refresh to apply changes
accordion.refresh();
```

### Getting All Expanded Items

```typescript
const accordion = new Accordion({
    expandMode: 'Multiple',
    items: [...]
});

accordion.appendTo('#element');

// Get all currently expanded items
const expandedItems = accordion.items.filter(item => 
    item.expanded || accordion.items.indexOf(item) === accordion.expandedIndices[0]
);

console.log('Expanded items:', expandedItems);
```

## Accessibility Features

### ARIA Attributes

The Accordion automatically sets ARIA attributes for accessibility:

```typescript
const accordion = new Accordion({
    items: [
        { header: 'Section 1', content: 'Content 1' },
        { header: 'Section 2', content: 'Content 2' }
    ]
});

accordion.appendTo('#element');

// Accordion sets:
// - role="region" on accordion
// - role="heading" on headers
// - aria-expanded on headers
// - aria-controls for content panels
// - aria-disabled for disabled items
```

### Keyboard Navigation

The Accordion supports full keyboard navigation:

```typescript
// Users can navigate with:
// - Tab: Move to next header
// - Shift+Tab: Move to previous header
// - Enter/Space: Toggle current item expansion
// - Arrow Up: Previous item
// - Arrow Down: Next item
// - Home: First item
// - End: Last item
```

### Accessible Header Text

```typescript
const accordion = new Accordion({
    items: [
        { 
            header: '✉️ Email',  // Include icon in header text
            content: 'Email configuration',
            ariaLabel: 'Email settings section'  // Optional: explicit ARIA label
        },
        { 
            header: '🔔 Notifications',
            content: 'Notification preferences'
        }
    ]
});

accordion.appendTo('#element');
```

### Semantic HTML with Accordion

```typescript
// Use with semantic HTML structure
const accordion = new Accordion({
    items: [...]
});

accordion.appendTo('#article-accordion');

// The HTML structure:
// <div id="article-accordion" role="region">
//   <div class="e-acrdn-item">
//     <div role="heading" aria-expanded="true" class="e-acrdn-header">...</div>
//     <div role="region" class="e-acrdn-content">...</div>
//   </div>
// </div>
```

## RTL Support

### Enable Right-to-Left Layout

```typescript
const accordion = new Accordion({
    items: [
        { header: 'يسار إلى اليمين', content: 'المحتوى' },
        { header: 'من اليمين إلى اليسار', content: 'المحتوى' }
    ],
    enableRtl: true  // Enable RTL layout
});

accordion.appendTo('#element');
```

### RTL with CSS

```css
/* Apply RTL to accordion container */
[dir="rtl"] .e-accordion {
    direction: rtl;
    text-align: right;
}

[dir="rtl"] .e-accordion .e-acrdn-header {
    padding-right: 16px;
    padding-left: 8px;
}
```

### RTL in HTML

```html
<html dir="rtl">
    <body>
        <div id="accordion-element"></div>
    </body>
</html>
```

## Methods Reference

### All Available Methods

| Method | Parameters | Return | Purpose |
|--------|-----------|--------|---------|
| `addItem(item, index?)` | item: AccordionItemModel, index?: number | void | Add item at optional index (appends at end if not specified) |
| `removeItem(index)` | index: number | void | Remove item at specified index |
| `enableItem(index, isEnable)` | index: number, isEnable: boolean | void | Enable or disable item interaction |
| `expandItem(isExpand, index?)` | isExpand: boolean, index?: number | void | Expand/collapse item(s) |
| `hideItem(index, isHidden)` | index: number, isHidden: boolean | void | Hide or show item |
| `select(index)` | index: number | void | Select and expand item at index |
| `refresh()` | none | void | Refresh accordion and re-render |
| `dataBind()` | none | void | Bind data source to accordion |
| `getRootElement()` | none | HTMLElement | Get root DOM element |
| `appendTo(selector?)` | selector?: string \| HTMLElement | void | Append accordion to target element |
| `destroy()` | none | void | Destroy accordion instance |
| `addEventListener(eventName, handler)` | eventName: string, handler: Function | void | Attach event listener |
| `removeEventListener(eventName, handler)` | eventName: string, handler: Function | void | Remove event listener |

### addItem(item, index?)
Add a new accordion item at optional index (appends at end if index omitted):

```typescript
const accordion = new Accordion({ items: [...] });
accordion.appendTo('#element');

// Append at end
const newItem = { header: 'New Item', content: 'New content' };
accordion.addItem(newItem);

// Insert at specific index
accordion.addItem(newItem, 1);  // Inserts at index 1, pushes others down
```

### removeItem(index)
Remove item at specified index:

```typescript
// Remove first item
accordion.removeItem(0);

// Remove last item
accordion.removeItem(accordion.items.length - 1);

// Remove multiple items (in reverse order to avoid index issues)
[2, 1, 0].forEach(index => {
    accordion.removeItem(index);
});
```

### enableItem(index, isEnable)
Enable or disable item (disabled items cannot be expanded):

```typescript
// Disable item at index 2
accordion.enableItem(2, false);

// Enable item at index 2
accordion.enableItem(2, true);

// Disable all except first
accordion.items.forEach((_, i) => {
    accordion.enableItem(i, i === 0);
});
```

### expandItem(isExpand, index?)
Expand or collapse specific item, or all items if index omitted:

```typescript
// Expand item at index 1
accordion.expandItem(true, 1);

// Collapse item at index 0
accordion.expandItem(false, 0);

// Expand all items (in Multiple mode)
accordion.expandItem(true);

// Collapse all items
accordion.expandItem(false);
```

### hideItem(index, isHidden)
Hide or show item (hidden items don't render):

```typescript
// Hide item at index 2
accordion.hideItem(2, true);

// Show item at index 2
accordion.hideItem(2, false);

// Hide all except first
accordion.items.forEach((_, i) => {
    accordion.hideItem(i, i !== 0);
});
```

### select(index)
Select and expand item at specified index (respects expand mode):

```typescript
// Select and expand item at index 1
accordion.select(1);

// In Single mode, this closes any open item
// In Multiple mode, this only opens the selected item
```

### refresh()
Refresh accordion - re-renders all items and applies pending changes:

```typescript
// After programmatic item changes
accordion.items[0].header = 'Updated Header';
accordion.refresh();  // Apply changes
```

### dataBind()
Bind data source to accordion (used with dataSource property):

```typescript
// Load data from source
const accordion = new Accordion({
    dataSource: new DataManager({ 
        url: 'api/items', 
        adaptor: new UrlAdaptor()
    }),
    fields: { text: 'header', value: 'content' }
});

accordion.appendTo('#element');

// Rebind with new data
accordion.dataSource = updatedDataSource;
accordion.dataBind();
```

### getRootElement()
Get the root DOM element of accordion:

```typescript
const rootElement = accordion.getRootElement();
console.log(rootElement);  // HTMLElement

// Apply direct DOM operations
rootElement.style.border = '2px solid blue';
rootElement.classList.add('custom-class');
```

### appendTo(selector?)
Append accordion to target element (selector or HTMLElement):

```typescript
// Create accordion without appending
const accordion = new Accordion({ items: [...] });

// Append to element by selector
accordion.appendTo('#container');

// Or append to element reference
const element = document.getElementById('container');
accordion.appendTo(element);
```

### destroy()
Destroy accordion instance and cleanup:

```typescript
const accordion = new Accordion({ items: [...] });
accordion.appendTo('#element');

// Later, destroy when no longer needed
accordion.destroy();

// DOM element remains, but accordion is destroyed
```

### addEventListener(eventName, handler)
Attach custom event listener:

```typescript
accordion.addEventListener('expanding', (args) => {
    console.log('Item expanding:', args);
});

accordion.addEventListener('expanded', (args) => {
    console.log('Item expanded:', args);
});

accordion.addEventListener('clicked', (args) => {
    console.log('Item clicked:', args);
});
```

### removeEventListener(eventName, handler)
Remove previously attached event listener:

```typescript
const expandHandler = (args) => console.log('Expanding:', args);

// Attach listener
accordion.addEventListener('expanding', expandHandler);

// Remove listener
accordion.removeEventListener('expanding', expandHandler);
```

## Complete Advanced Example

```typescript
import { Accordion, ExpandEventArgs, AccordionClickArgs } from '@syncfusion/ej2-navigations';

const accordion = new Accordion({
    expandMode: 'Single',
    items: [
        { header: 'Form Step 1', content: 'Personal Info' },
        { header: 'Form Step 2', content: 'Address', disabled: true },
        { header: 'Form Step 3', content: 'Payment', disabled: true }
    ],
    expanding: (args: ExpandEventArgs) => {
        const index = accordion.items.indexOf(args.item);
        console.log(`Expanding item ${index}: ${args.item.header}`);
    },
    expanded: (args: ExpandEventArgs) => {
        const index = accordion.items.indexOf(args.item);
        console.log(`Item ${index} fully expanded`);
        
        // Enable next step
        if (index < accordion.items.length - 1) {
            accordion.enableItem(index + 1, true);
        }
    },
    created: () => {
        console.log('Accordion ready');
    }
});

accordion.appendTo('#form-accordion');
```

## Next Steps

- Build complex scenarios in **Advanced Use Cases**
- Learn templates for custom layouts in **Templates**
- Check styling options in **Customization and Styling**
