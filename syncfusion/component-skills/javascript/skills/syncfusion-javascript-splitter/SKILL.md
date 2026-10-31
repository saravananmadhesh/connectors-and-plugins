---
name: syncfusion-javascript-splitter
description: Implement and configure the Syncfusion TypeScript Splitter control for creating responsive multi-pane interfaces. Use this skill when implementing pane configuration, orientation changes, resizing, collapse/expand functionality, and content loading. This skill covers nested layouts, styling customization, and all API properties, methods, and events for the Splitter component.
metadata:
  author: "Syncfusion Inc"
  version: "34.1.29"
  category: "Layout Components"
---

# Implementing Syncfusion TypeScript Splitter

The Syncfusion Splitter control enables you to create complex, responsive multi-pane layouts in web applications. It provides built-in resizing, collapse/expand functionality, comprehensive event handling, and support for nested panes with full programmatic control.

## When to Use This Skill

- **Setting up a Splitter:** Initial configuration, dependency installation, basic initialization
- **Configuring panes:** Sizing (pixels/percentages), fixed vs flexible panes, min/max constraints
- **Orientation:** Horizontal vs vertical layouts
- **Interactive features:** Collapse/expand panes, programmatic control, dynamic pane management
- **Content:** Loading HTML markup, text content, or dynamic content
- **Resizing:** Configuring resize behavior, preventing resize, handling resize events
- **Styling:** Customizing split bars, resize handles, arrows, colors
- **Complex layouts:** Nested splitters, code editor layouts, multi-level pane hierarchies
- **Internationalization:** Right-to-left (RTL) support for Arabic, Hebrew, and other RTL languages
- **Event Handling:** Working with all Splitter events (before/after expand/collapse, resize, creation)
- **API Methods:** Programmatically manipulating splitter state (add/remove panes, expand/collapse, refresh)
- **Advanced Configuration:** Persistence, sanitization, pane reordering, locale management

---

## Splitter Overview & Key Capabilities

The Splitter is a flexible layout component that:
- Divides containers into **multiple panes** separated by resizable bars
- Supports **horizontal** (default) and **vertical** orientations
- Enables **collapsible panes** with expand/collapse icons
- Allows **flexible sizing** in pixels or percentages
- Supports **min/max constraints** during resizing
- Provides **nested splitters** for complex layouts
- Includes **built-in styling** customization via CSS
- Supports **RTL** for right-to-left languages
- Automatically adjusts panes using **flex layout**

---

## Documentation and Navigation Guide

### API REFERENCE (Complete)
**[Complete API Reference](#complete-api-reference)** — This document
Comprehensive documentation of ALL components:
- **Splitter Properties** - All 12 properties with code examples
- **Pane Properties** - All 8 pane configuration properties
- **Methods** - All 12 methods with parameters and return types (addEventListener, addPane, appendTo, collapse, dataBind, destroy, expand, getRootElement, refresh, removeEventListener, removePane, Inject)
- **Events** - All 9 events with argument documentation (created, beforeExpand, expanded, beforeCollapse, collapsed, resizeStart, resizing, resizeStop, beforeSanitizeHtml)
- **Event Arguments** - Full documentation of all event argument properties

### Getting Started
**[references/getting-started.md](references/getting-started.md)**
- Package dependencies (@syncfusion/ej2-layouts)
- npm installation and setup
- CSS imports (fluent2.css theme)
- Basic Splitter component initialization
- HTML markup and DOM structure
- Creating panes with child elements

### Core Concepts: Panes and Orientation
**[references/split-panes-orientation.md](references/split-panes-orientation.md)**
- Horizontal layout (default behavior)
- Vertical layout (orientation: 'Vertical' property)
- Orientation API usage
- Pane separators (vertical for horizontal layout, horizontal for vertical)
- Dynamic pane management with addPane() method
- Dynamic pane removal with removePane() method
- Complete examples of both orientations

### Pane Configuration & Sizing
**[references/pane-configuration.md](references/pane-configuration.md)**
- Pane sizing in pixel format ('200px', '300px')
- Pane sizing in percentage format ('30%', '50%')
- Auto-sizing with flex layout
- Fixed pane sizes via paneSettings
- Minimum constraints (min property)
- Maximum constraints (max property)
- Flexible last pane behavior

### Expand/Collapse Behavior
**[references/collapse-expand.md](references/collapse-expand.md)**
- Enabling collapsible panes (collapsible: true)
- Built-in expand/collapse icons
- User-triggered collapse/expand actions
- Programmatic expand() method for specific pane index
- Programmatic collapse() method for specific pane index
- Specify initial collapsed state (collapsed: true property)
- Event handling and callbacks
- beforeExpand, expanded, beforeCollapse, collapsed events

### Pane Content Options
**[references/pane-content.md](references/pane-content.md)**
- HTML markup content in panes
- Text content strings
- Inner HTML via child elements
- Dynamic content property
- Loading HTML elements
- Practical content examples

### Resizing & Constraints
**[references/resizing-behavior.md](references/resizing-behavior.md)**
- Resizing enabled by default
- Resize gripper functionality
- Horizontal vs vertical resizing behavior
- Adjacent pane auto-adjustment during resize
- Min/Max validation constraints
- Preventing resizing (resizable: false)
- Resizable property per pane configuration
- resizeStart, resizing, resizeStop events

### Styling & Customization
**[references/styling-customization.md](references/styling-customization.md)**
- Split bar CSS customization (.e-split-bar)
- Horizontal split bar styling (.e-split-bar-horizontal)
- Vertical split bar styling (.e-split-bar-vertical)
- Hover and active state styling
- Resize handle customization (.e-resize-handler)
- Split bar arrow customization (.e-navigate-arrow)
- Color and theme customization

### Complex Layouts & Nesting
**[references/layouts-nested.md](references/layouts-nested.md)**
- Creating nested splitters
- Code editor style layout (horizontal + vertical)
- Outer and inner splitter configuration
- Step-by-step nesting implementation
- Multiple nesting levels
- Complex multi-pane hierarchies

### Globalization (RTL)
**[references/globalization.md](references/globalization.md)**
- Right-to-left (RTL) layout support
- enableRtl property configuration
- RTL for Arabic, Hebrew, and other languages
- Default LTR behavior (enableRtl: false)
- RTL styling adjustments

---

## Quick Start Example

```typescript
import { Splitter } from '@syncfusion/ej2-layouts';

// Initialize Splitter with horizontal orientation (default)
let splitObj: Splitter = new Splitter({
    height: '250px',
    width: '600px',
    paneSettings: [
        { size: '200px', content: 'Pane 1' },
        { size: '200px', content: 'Pane 2' },
        { size: '200px', content: 'Pane 3' }
    ]
});

// Render to DOM
splitObj.appendTo('#splitter');
```

**HTML:**
```html
<div id="splitter">
    <div></div>
    <div></div>
    <div></div>
</div>
```

---

## Common Patterns

### Pattern 1: Responsive Panes with Min/Max
```typescript
let splitObj: Splitter = new Splitter({
    height: '300px',
    width: '100%',
    paneSettings: [
        { size: '30%', min: '20%', max: '50%' },
        { size: '40%', min: '30%', max: '60%' },
        { size: '30%', min: '20%', max: '50%' }
    ]
});
splitObj.appendTo('#splitter');
```

### Pattern 2: Collapsible Panes with Initial State
```typescript
let splitObj: Splitter = new Splitter({
    height: '300px',
    paneSettings: [
        { collapsible: true, size: '250px', content: 'Sidebar', collapsed: false },
        { collapsible: true, size: '250px', content: 'Details', collapsed: true }
    ]
});
splitObj.appendTo('#splitter');
```

### Pattern 3: Vertical Split (Stacked)
```typescript
let splitObj: Splitter = new Splitter({
    height: '400px',
    orientation: 'Vertical',
    paneSettings: [
        { size: '150px' },
        { size: '200px' },
        { size: '150px' }
    ]
});
splitObj.appendTo('#splitter');
```

### Pattern 4: Nested Splitters (Code Editor Layout)
```typescript
// Outer vertical splitter
let verticalSplit: Splitter = new Splitter({
    height: '400px',
    orientation: 'Vertical',
    paneSettings: [
        { size: '250px', min: '30%' }
    ]
});
verticalSplit.appendTo('#verticalSplitter');

// Inner horizontal splitter (inside first pane)
let horizontalSplit: Splitter = new Splitter({
    height: '220px',
    paneSettings: [
        { size: '29%', min: '23%' },
        { size: '20%', min: '15%' },
        { size: '35%', min: '35%' }
    ]
});
horizontalSplit.appendTo('#horizontalSplitter');
```

### Pattern 5: Event Handling - Prevent Collapse
```typescript
let splitObj: Splitter = new Splitter({
    height: '300px',
    paneSettings: [
        { collapsible: true, size: '250px', content: 'Important Pane' },
        { collapsible: true, size: '250px', content: 'Other Pane' }
    ],
    beforeCollapse: (args: BeforeExpandEventArgs) => {
        // Prevent collapse of first pane
        if (args.index[0] === 0) {
            args.cancel = true;
            console.log('First pane cannot be collapsed');
        }
    }
});
splitObj.appendTo('#splitter');
```

### Pattern 6: Dynamically Add/Remove Panes
```typescript
let splitObj: Splitter = new Splitter({
    height: '300px',
    paneSettings: [
        { size: '50%', content: 'Pane 1' },
        { size: '50%', content: 'Pane 2' }
    ]
});
splitObj.appendTo('#splitter');

// Add a new pane
document.getElementById('addBtn').addEventListener('click', () => {
    splitObj.addPane({ size: '200px', content: 'New Pane' }, 1);
});

// Remove a pane
document.getElementById('removeBtn').addEventListener('click', () => {
    splitObj.removePane(1);
});
```

### Pattern 7: Programmatic Expand/Collapse
```typescript
let splitObj: Splitter = new Splitter({
    height: '300px',
    paneSettings: [
        { collapsible: true, size: '250px', content: 'Pane 1', collapsed: true },
        { collapsible: true, size: '250px', content: 'Pane 2' }
    ]
});
splitObj.appendTo('#splitter');

// Expand pane
document.getElementById('expandBtn').addEventListener('click', () => {
    splitObj.expand(0);
});

// Collapse pane
document.getElementById('collapseBtn').addEventListener('click', () => {
    splitObj.collapse(0);
});
```

### Pattern 8: Track Resize Events
```typescript
let splitObj: Splitter = new Splitter({
    height: '300px',
    paneSettings: [
        { size: '250px', content: 'Pane 1' },
        { size: '250px', content: 'Pane 2' }
    ],
    resizeStart: (args: ResizeEventArgs) => {
        console.log('Resize started on pane:', args.index);
    },
    resizing: (args: ResizingEventArgs) => {
        console.log('Resizing... New sizes:', args.paneSize);
    },
    resizeStop: (args: ResizingEventArgs) => {
        console.log('Resize completed. Final sizes:', args.paneSize);
    }
});
splitObj.appendTo('#splitter');
```

### Pattern 9: Persistent Splitter State
```typescript
let splitObj: Splitter = new Splitter({
    height: '300px',
    enablePersistence: true, // Save state to localStorage
    paneSettings: [
        { size: '250px', content: 'Pane 1' },
        { size: '250px', content: 'Pane 2' }
    ]
});
splitObj.appendTo('#splitter');
// State automatically persists across page reloads
```

### Pattern 10: RTL Support
```typescript
let splitObj: Splitter = new Splitter({
    height: '300px',
    enableRtl: true,
    paneSettings: [
        { size: '50%', content: 'محتوى عربي' }, // Arabic content
        { size: '50%', content: 'תוכן עברי' }   // Hebrew content
    ]
});
splitObj.appendTo('#splitter');
```



## Complete API Reference

For detailed examples of all properties, methods, and events, see the [Complete API Reference](references/api-reference.md).

### Splitter Properties

Complete list of all properties available on the Splitter component:

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `height` | `string` | `'100%'` | Height of the Splitter container |
| `width` | `string` | `'100%'` | Width of the Splitter container |
| `orientation` | `'Horizontal' \| 'Vertical'` | `'Horizontal'` | Layout direction - see [Orientations guide](references/split-panes-orientation.md) |
| `paneSettings` | `PanePropertiesModel[]` | `[]` | Configuration for each pane |
| `separatorSize` | `number` | `1` | Separator width between panes |
| `cssClass` | `string` | `''` | Custom CSS classes for styling |
| `enableRtl` | `boolean` | `false` | Enable right-to-left layout - see [RTL guide](references/globalization.md) |
| `enabled` | `boolean` | `true` | Enable/disable component interaction |
| `enablePersistence` | `boolean` | `false` | Persist pane state between page reloads |
| `enableReversePanes` | `boolean` | `false` | Reorder panes |
| `enableHtmlSanitizer` | `boolean` | `true` | Sanitize HTML content to prevent XSS |
| `locale` | `string` | `'en-US'` | Localization override |

→ [View examples in api-reference.md](references/api-reference.md#splitter-properties)

### Pane Properties

Configuration properties available within each pane in the `paneSettings` array:

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `size` | `string` | Auto | Pane size in pixels ('200px') or percentage ('30%') |
| `min` | `string` | None | Minimum pane size constraint |
| `max` | `string` | None | Maximum pane size constraint |
| `collapsible` | `boolean` | `false` | Enable collapse/expand icons |
| `collapsed` | `boolean` | `false` | Initially collapsed state |
| `resizable` | `boolean` | `true` | Allow resizing this pane |
| `content` | `string \| HTMLElement` | None | HTML content for the pane |
| `cssClass` | `string` | `''` | Custom CSS classes for pane styling |

→ [View examples in api-reference.md](references/api-reference.md#pane-properties)

### Methods

| Method | Parameters | Return | Description |
|--------|-----------|--------|-------------|
| `addPane()` | `paneProperties, index` | `void` | Add pane dynamically - see [Split Panes](references/split-panes-orientation.md) |
| `removePane()` | `index` | `void` | Remove pane dynamically - see [Split Panes](references/split-panes-orientation.md) |
| `expand()` | `index` | `void` | Expand pane programmatically - see [Collapse/Expand](references/collapse-expand.md) |
| `collapse()` | `index` | `void` | Collapse pane programmatically - see [Collapse/Expand](references/collapse-expand.md) |
| `refresh()` | — | `void` | Re-render component |
| `destroy()` | — | `void` | Cleanup component |
| `getRootElement()` | — | `HTMLElement` | Get root element |
| `dataBind()` | — | `void` | Apply pending changes |
| `appendTo()` | `selector?` | `void` | Mount component to DOM - see [Getting Started](references/getting-started.md) |
| `addEventListener()` | `eventName, handler` | `void` | Add event handler |
| `removeEventListener()` | `eventName, handler` | `void` | Remove event handler |
| `Inject()` | `moduleList` | `void` | Inject modules |

→ [View examples in api-reference.md](references/api-reference.md#methods)

### Events & Event Arguments

| Event | Triggers | Arguments | Description |
|-------|----------|-----------|-------------|
| `created` | After initialization | `Object` | Component initialized |
| `beforeExpand` | Before pane expands | `BeforeExpandEventArgs` | Cancellable - prevent expand |
| `expanded` | After pane expands | `ExpandedEventArgs` | Expansion completed |
| `beforeCollapse` | Before pane collapses | `BeforeExpandEventArgs` | Cancellable - prevent collapse |
| `collapsed` | After pane collapses | `ExpandedEventArgs` | Collapse completed |
| `resizeStart` | Resize begins | `ResizeEventArgs` | Cancellable |
| `resizing` | During resize | `ResizingEventArgs` | Continuous updates |
| `resizeStop` | Resize completes | `ResizingEventArgs` | Final size available |
| `beforeSanitizeHtml` | Before HTML sanitization | `BeforeSanitizeHtmlArgs` | Customize sanitization |

→ [View examples in api-reference.md](references/api-reference.md#events--event-arguments)

#### Event Arguments

**BeforeExpandEventArgs** (used in: beforeExpand, beforeCollapse)
- `cancel` (boolean): Set to true to cancel the action
- `element` (HTMLElement): Root element
- `event` (Event): Native event
- `index` (number[]): Pane index
- `pane` (HTMLElement[]): Pane elements
- `separator` (HTMLElement): Separator element

**ExpandedEventArgs** (used in: expanded, collapsed)
- `element` (HTMLElement): Root element
- `event` (Event): Native event
- `index` (number[]): Pane index
- `pane` (HTMLElement[]): Pane elements
- `separator` (HTMLElement): Separator element

**ResizeEventArgs** (used in: resizeStart)
- `cancel` (boolean): Set to true to stop resize
- `element` (HTMLElement): Resizing pane element
- `event` (Event): Native event
- `index` (number[]): Pane index
- `pane` (HTMLElement[]): Pane elements
- `separator` (HTMLElement): Separator element

**ResizingEventArgs** (used in: resizing, resizeStop)
- `element` (HTMLElement): Resizing pane element
- `event` (Event): Native event
- `index` (number[]): Pane index
- `pane` (HTMLElement[]): Pane elements
- `paneSize` (number[]): Current/final pane size
- `separator` (HTMLElement): Separator element

**BeforeSanitizeHtmlArgs** (used in: beforeSanitizeHtml)
- `cancel` (boolean): Prevent sanitization if needed
- `helper` (Function): Custom sanitization callback
- `selectors` (SanitizeSelectors): XSS block list configuration

---

## Quick Reference

**Essential Splitter Properties:**
- `height`, `width` → Container dimensions
- `orientation` → `'Horizontal'` (default) or `'Vertical'`
- `paneSettings` → Array of pane configurations
- `enableRtl` → Right-to-left support
- `separatorSize` → Gap width between panes (default: 1px)

**Key Pane Properties:**
- `size` → Dimension ('200px' or '30%')
- `min` / `max` → Resize constraints
- `collapsible` → Enable collapse icons (default: false)
- `collapsed` → Initial state
- `resizable` → Allow resizing (default: true)
- `content` → HTML content or text

---

## Common Use Cases

- **Dashboard Layout:** Sidebar + content with adjustable widths → Use collapsible left pane with flexible right pane
- **IDE/Code Editor:** Multi-pane editor with nested splitters → File explorer, code editor, console
- **Responsive Admin Panel:** Collapsible sections with min/max constraints for mobile-friendly resizing
- **Multi-Document Interface (MDI):** Stack/arrange multiple documents with horizontal and nested vertical splits

---

## Next Steps

1. **Start with Getting Started** → Setup dependencies and basic initialization
2. **Choose your orientation** → Horizontal for side-by-side, Vertical for stacked
3. **Configure panes** → Set sizes, min/max constraints, collapsible behavior
4. **Add content** → Load HTML markup or text
5. **Style as needed** → Customize colors, borders, resize handles
6. **Add nested splitters** → For complex layouts (advanced)

For specific implementation questions, refer to the appropriate reference file in the navigation guide above.
