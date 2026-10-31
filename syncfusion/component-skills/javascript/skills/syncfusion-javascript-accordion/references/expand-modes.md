# Expand Modes

## Table of Contents

- [Single Mode](#single-mode)
- [Multiple Mode](#multiple-mode)
- [Setting Initial Expanded Items](#setting-initial-expanded-items)
- [Toggle Behavior](#toggle-behavior)
- [Workflow Patterns](#workflow-patterns)
- [Best Practices](#best-practices)

## Overview

The Accordion supports two expand modes that control how items expand and collapse:
- **Single**: Only one item can be expanded at a time (tab-like behavior)
- **Multiple**: Multiple items can be expanded simultaneously (default)

## Single Mode

In **Single** expand mode, opening one item automatically closes any previously opened item. This creates a tab-like interface where only one content panel is visible at a time.

### Basic Single Mode Setup

```typescript
import { Accordion } from '@syncfusion/ej2-navigations';

const accordion = new Accordion({
    expandMode: 'Single',
    items: [
        { 
            header: 'ASP.NET', 
            expanded: true, 
            content: 'Microsoft ASP.NET is a set of technologies in the Microsoft .NET Framework for building Web applications and XML Web services.' 
        },
        { 
            header: 'ASP.NET MVC', 
            content: 'The Model-View-Controller (MVC) architectural pattern separates an application into three main components: the model, the view, and the controller.' 
        },
        { 
            header: 'JavaScript', 
            content: 'JavaScript (JS) is an interpreted computer programming language. It was originally implemented as part of web browsers so that client-side scripts could interact with the user, control the browser.' 
        }
    ]
});

accordion.appendTo('#element');
```

### Key Behaviors in Single Mode

- Only one item expanded at a time
- Clicking an expanded item collapses it (toggle behavior)
- Clicking a collapsed item expands it and collapses the previous item
- Use `expanded: true` on only one item initially

### When to Use Single Mode

- Navigation menus (only one section active)
- FAQ sections (view one answer at a time)
- Configuration steps (focus on one setting at a time)
- Tabbed interfaces (simulate tab behavior)
- Master-detail views (one detail panel visible)

## Multiple Mode

In **Multiple** expand mode (default), users can expand and collapse items independently. Multiple items can be open simultaneously, showing their content panels side-by-side or vertically stacked.

### Basic Multiple Mode Setup

```typescript
import { Accordion } from '@syncfusion/ej2-navigations';

const accordion = new Accordion({
    expandMode: 'Multiple',  // Explicit (default)
    items: [
        { 
            header: 'ASP.NET', 
            content: 'Microsoft ASP.NET is a set of technologies in the Microsoft .NET Framework for building Web applications and XML Web services.' 
        },
        { 
            header: 'ASP.NET MVC', 
            content: 'The Model-View-Controller (MVC) architectural pattern separates an application into three main components: the model, the view, and the controller.' 
        },
        { 
            header: 'JavaScript', 
            content: 'JavaScript (JS) is an interpreted computer programming language. It was originally implemented as part of web browsers so that client-side scripts could interact with the user, control the browser.' 
        }
    ]
});

accordion.appendTo('#element');
```

### Omitting expandMode (Uses Default)

Since `Multiple` is the default, you can omit the property:

```typescript
const accordion = new Accordion({
    items: [...]  // Automatically uses Multiple mode
});
```

### Key Behaviors in Multiple Mode

- Each item expands/collapses independently
- Multiple items can be open simultaneously
- Clicking an open item closes it (toggle)
- Clicking a closed item opens it without closing others
- Multiple items can have `expanded: true` initially

### When to Use Multiple Mode

- Dashboard panels (view multiple metrics together)
- Settings panels (expand multiple configuration sections)
- FAQ sections (view multiple answers at once)
- Content filters (keep multiple filter panels open)
- Expandable feature lists (expand features you're interested in)

## Setting Initial Expanded Items

Control which items are expanded when the accordion loads:

### Single Mode - One Item Expanded

```typescript
const accordion = new Accordion({
    expandMode: 'Single',
    items: [
        { header: 'Item 1', content: 'Content 1', expanded: true },  // Opens on load
        { header: 'Item 2', content: 'Content 2' },
        { header: 'Item 3', content: 'Content 3' }
    ]
});
```

### Multiple Mode - Multiple Items Expanded

```typescript
const accordion = new Accordion({
    expandMode: 'Multiple',
    items: [
        { header: 'Item 1', content: 'Content 1', expanded: true },  // Open on load
        { header: 'Item 2', content: 'Content 2', expanded: true },  // Also open on load
        { header: 'Item 3', content: 'Content 3' }  // Closed on load
    ]
});
```

### No Initial Expansion

```typescript
const accordion = new Accordion({
    items: [
        { header: 'Item 1', content: 'Content 1' },  // All closed
        { header: 'Item 2', content: 'Content 2' },
        { header: 'Item 3', content: 'Content 3' }
    ]
});
```

## Toggle Behavior

Both modes support toggling: clicking an expanded header collapses the item.

### Single Mode Toggle Example

```typescript
const accordion = new Accordion({
    expandMode: 'Single',
    items: [
        { header: 'Item 1', content: 'Content 1', expanded: true },
        { header: 'Item 2', content: 'Content 2' }
    ]
});

accordion.appendTo('#element');

// User interactions:
// 1. Click "Item 1" → Collapsed (toggle)
// 2. Click "Item 2" → "Item 2" expands
// 3. Click "Item 1" → "Item 2" closes, "Item 1" opens
// 4. Click "Item 1" again → Collapsed (toggle)
```

### Multiple Mode Toggle Example

```typescript
const accordion = new Accordion({
    expandMode: 'Multiple',
    items: [
        { header: 'Item 1', content: 'Content 1', expanded: true },
        { header: 'Item 2', content: 'Content 2', expanded: true },
        { header: 'Item 3', content: 'Content 3' }
    ]
});

accordion.appendTo('#element');

// User interactions:
// 1. Click "Item 1" → Collapsed (toggle), Item 2 remains open
// 2. Click "Item 3" → Expanded, Items 2 and 3 open
// 3. Click "Item 1" → Expanded, Items 1, 2, 3 open
```

## Workflow Patterns

### Pattern 1: Single Mode - Navigation Menu

```typescript
const accordion = new Accordion({
    expandMode: 'Single',
    items: [
        { 
            header: '📁 Dashboard', 
            content: 'Dashboard navigation items',
            expanded: true
        },
        { 
            header: '📊 Reports', 
            content: 'Reports navigation items'
        },
        { 
            header: '⚙️ Settings', 
            content: 'Settings navigation items'
        }
    ]
});
```

### Pattern 2: Multiple Mode - Dashboard Widgets

```typescript
const accordion = new Accordion({
    expandMode: 'Multiple',
    items: [
        { 
            header: 'System Health', 
            content: 'Health metrics here',
            expanded: true
        },
        { 
            header: 'Active Users', 
            content: 'User analytics here',
            expanded: true
        },
        { 
            header: 'Error Logs', 
            content: 'Error details here'
        }
    ]
});
```

### Pattern 3: Progressive Disclosure - Collapsible Options

```typescript
const accordion = new Accordion({
    expandMode: 'Multiple',
    items: [
        { 
            header: '🔍 Basic Search', 
            content: 'Basic search options',
            expanded: true
        },
        { 
            header: '⚙️ Advanced Filters', 
            content: 'Advanced filter controls'
        },
        { 
            header: '💾 Saved Searches', 
            content: 'Your saved search queries'
        }
    ]
});
```

## Expand/Collapse Only on Icon Click

Restrict accordion expansion to only occur when the toggle icon is clicked, not when the header text is clicked:

```typescript
import { Accordion, ExpandEventArgs } from '@syncfusion/ej2-navigations';

let isToggleIconClicked = false;

const accordion = new Accordion({
    expandMode: 'Single',
    items: [
        { 
            header: 'ASP.NET', 
            content: 'Microsoft ASP.NET is a set of technologies...',
            expanded: true 
        },
        { 
            header: 'ASP.NET MVC', 
            content: 'The Model-View-Controller (MVC) pattern...' 
        },
        { 
            header: 'JavaScript', 
            content: 'JavaScript (JS) is an interpreted language...' 
        }
    ],
    expanding: (args: ExpandEventArgs) => {
        // Cancel expand if toggle icon wasn't clicked
        if (!isToggleIconClicked) {
            args.cancel = true;
        } else {
            isToggleIconClicked = false;  // Reset flag
        }
    }
});

accordion.appendTo('#element');

// Add click listener to toggle icons
const toggleIcons = document.querySelectorAll('.e-toggle-icon');
toggleIcons.forEach((toggleIcon) => {
    toggleIcon.addEventListener('click', () => {
        isToggleIconClicked = true;
    });
});
```

### Complete Icon-Only Expand Example

```typescript
import { Accordion, ExpandEventArgs } from '@syncfusion/ej2-navigations';

class IconOnlyAccordion {
    accordion: Accordion;
    isIconClicked = false;
    
    constructor() {
        this.accordion = new Accordion({
            expandMode: 'Single',
            items: [
                { header: 'Settings', content: 'Configuration options', expanded: true },
                { header: 'Help', content: 'Help documentation' },
                { header: 'About', content: 'About this application' }
            ],
            expanding: (args: ExpandEventArgs) => this.onExpanding(args),
            created: () => this.attachIconListeners()
        });
        
        this.accordion.appendTo('#element');
    }
    
    private onExpanding(args: ExpandEventArgs) {
        // Prevent expansion unless icon was clicked
        if (!this.isIconClicked) {
            args.cancel = true;
            console.log('Click the icon to expand');
        } else {
            this.isIconClicked = false;
        }
    }
    
    private attachIconListeners() {
        // Find all toggle icons and attach click listeners
        const toggleIcons = document.querySelectorAll('.e-toggle-icon');
        
        toggleIcons.forEach((icon) => {
            icon.addEventListener('click', (e) => {
                e.stopPropagation();
                this.isIconClicked = true;
                
                // Trigger expand/collapse after setting flag
                const header = (e.target as HTMLElement).closest('.e-acrdn-header');
                if (header) {
                    header.click();
                }
            });
        });
    }
}

new IconOnlyAccordion();
```

### Visual Feedback for Icon-Only Mode

```css
/* Make header text not clickable */
.e-accordion .e-acrdn-item > .e-acrdn-header {
    cursor: default;
    user-select: none;
}

/* Make icon cursor indicate it's clickable */
.e-accordion .e-acrdn-item .e-acrdn-header .e-toggle-icon {
    cursor: pointer;
}

.e-accordion .e-acrdn-item .e-acrdn-header .e-toggle-icon:hover {
    transform: scale(1.2);
    transition: transform 0.2s ease;
}

/* Disable header hover effects */
.e-accordion .e-acrdn-item > .e-acrdn-header:hover {
    background-color: inherit;
}
```

## Keeping Single Pane Open Always

To prevent all items from being collapsed in Single mode, use the `expanding` event to reopen a collapsed item:

```typescript
import { Accordion, ExpandEventArgs } from '@syncfusion/ej2-navigations';

const accordion = new Accordion({
    expandMode: 'Single',
    items: [...],
    expanding: (args: ExpandEventArgs) => {
        // In Single mode, one item must always be open
        // If collapsing the last open item, prevent it
        if (!args.isExpanded) {
            args.cancel = true;  // Keep it open
        }
    }
});

accordion.appendTo('#element');
```

## Programmatic Mode Switching

Change expand mode after initialization:

```typescript
const accordion = new Accordion({
    expandMode: 'Single',
    items: [...]
});

accordion.appendTo('#element');

// Switch to Multiple mode
accordion.expandMode = 'Multiple';
```

## Best Practices

1. **Choose based on content**:
   - Single: When only one option should be visible (navigation)
   - Multiple: When comparing content (filters, settings)

2. **Consider mobile**:
   - Single mode usually better for mobile (saves vertical space)
   - Multiple mode works well with sufficient height

3. **Label clearly**:
   - Use descriptive headers that indicate content
   - Add icons to enhance visual distinction

4. **Initialize state logically**:
   - Open the most relevant item first
   - For navigation, open the current section

5. **Document behavior**:
   - Let users know if only one item can be open (Single mode)
   - Or that multiple items can be open (Multiple mode)

## Comparison Table

| Aspect | Single Mode | Multiple Mode |
|--------|------------|---------------|
| **Open items** | 1 maximum | Multiple |
| **Toggle behavior** | Expand/collapse | Expand/collapse |
| **Use case** | Navigation, tabs | Dashboards, filters |
| **Space efficient** | Yes (mobile friendly) | Less efficient |
| **Comparison** | Not possible | Easy comparison |
| **Default** | No | Yes |

## Next Steps

- Customize appearance in **Customization and Styling**
- Handle events in **Advanced Features**
- Build multi-step forms in **Advanced Use Cases**
