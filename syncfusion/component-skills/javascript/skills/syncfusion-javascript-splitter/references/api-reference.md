# Syncfusion Splitter - Complete API Reference

This document contains detailed examples for all Splitter properties, methods, and events. For brief descriptions and links to this reference, see [SKILL.md](../SKILL.md).

---

## Table of Contents

1. [Splitter Properties](#splitter-properties)
2. [Pane Properties](#pane-properties)
3. [Methods](#methods)
4. [Events & Event Arguments](#events--event-arguments)

---

## Splitter Properties

### `height`

Specifies the height of the Splitter component that accepts both string and number values.

```typescript
import { Splitter } from '@syncfusion/ej2-layouts';

let splitObj: Splitter = new Splitter({
    height: '400px', // or '100%'
});
splitObj.appendTo('#splitter');
```

### `width`

Specifies the width of the Splitter control. The string value can be either in pixel or percentage format.

```typescript
let splitObj: Splitter = new Splitter({
    width: '800px', // or '100%'
});
splitObj.appendTo('#splitter');
```

### `orientation`

Specifies a value that indicates whether to align the split panes horizontally or vertically. See [Split Panes and Orientation](split-panes-orientation.md) for detailed examples.

```typescript
// Horizontal (default - left to right)
let splitObj: Splitter = new Splitter({
    orientation: 'Horizontal',
    paneSettings: [{ size: '50%' }, { size: '50%' }]
});
splitObj.appendTo('#splitter');

// Vertical (top to bottom)
let splitObj: Splitter = new Splitter({
    orientation: 'Vertical',
    paneSettings: [{ size: '50%' }, { size: '50%' }]
});
splitObj.appendTo('#splitter');
```

### `paneSettings`

Configures the individual pane behaviors such as content, size, resizable, minimum, maximum validation, collapsible and collapsed.

```typescript
let splitObj: Splitter = new Splitter({
    paneSettings: [
        { size: '250px', min: '100px', max: '400px', collapsible: true },
        { size: '300px', collapsible: true },
        { size: '250px' }
    ]
});
splitObj.appendTo('#splitter');
```

### `separatorSize`

Specifies the size of the separator line for both horizontal or vertical orientation.

```typescript
let splitObj: Splitter = new Splitter({
    separatorSize: 5, // 5px separator
    paneSettings: [{ size: '50%' }, { size: '50%' }]
});
splitObj.appendTo('#splitter');
```

### `cssClass`

Specifies the CSS class names that defines specific user-defined styles and themes to be appended on the root element.

```typescript
let splitObj: Splitter = new Splitter({
    cssClass: 'custom-splitter dark-theme',
    paneSettings: [{ size: '50%' }, { size: '50%' }]
});
splitObj.appendTo('#splitter');
```

### `enableRtl`

Enable or disable rendering component in right to left direction.

```typescript
let splitObj: Splitter = new Splitter({
    enableRtl: true, // Enable RTL for Arabic, Hebrew, etc.
    paneSettings: [{ size: '50%' }, { size: '50%' }]
});
splitObj.appendTo('#splitter');
```

See [Globalization (RTL)](globalization.md) for more details.

### `enabled`

Specifies boolean value that indicates whether the component is enabled or disabled. The Splitter component does not allow user interaction when this property is disabled.

```typescript
let splitObj: Splitter = new Splitter({
    enabled: false, // Disable user interaction
    paneSettings: [{ size: '50%' }, { size: '50%' }]
});
splitObj.appendTo('#splitter');
```

### `enablePersistence`

Enables or disables the persisting component's state between page reloads. When enabled, pane sizes and collapse states are saved to browser storage.

```typescript
let splitObj: Splitter = new Splitter({
    enablePersistence: true, // Save splitter state
    paneSettings: [{ size: '50%' }, { size: '50%' }]
});
splitObj.appendTo('#splitter');
```

### `enableReversePanes`

Specifies the value whether splitter panes are reordered or not. When enabled, the visual order of panes may be reversed.

```typescript
let splitObj: Splitter = new Splitter({
    enableReversePanes: true,
    paneSettings: [{ size: '50%' }, { size: '50%' }]
});
splitObj.appendTo('#splitter');
```

### `enableHtmlSanitizer`

Defines whether to allow the cross-scripting site or not. When enabled, HTML content in panes is sanitized to prevent XSS attacks.

```typescript
let splitObj: Splitter = new Splitter({
    enableHtmlSanitizer: true, // Sanitize HTML content
    paneSettings: [
        { content: '<strong>Safe HTML</strong>' },
        { content: '<div>Another pane</div>' }
    ]
});
splitObj.appendTo('#splitter');
```

### `locale`

Overrides the global culture and localization value for this component. Default global culture is 'en-US'.

```typescript
let splitObj: Splitter = new Splitter({
    locale: 'ar', // Arabic localization
    paneSettings: [{ size: '50%' }, { size: '50%' }]
});
splitObj.appendTo('#splitter');
```

---

## Pane Properties

### `size`

Configures the size for each pane. Can be specified in pixels ('200px') or percentage ('30%').

See [Pane Configuration & Sizing](pane-configuration.md) for detailed sizing examples.

```typescript
let splitObj: Splitter = new Splitter({
    paneSettings: [
        { size: '200px' },      // Fixed pixel size
        { size: '30%' },        // Percentage of container
        { size: 'auto' }        // Flexible/auto size
    ]
});
splitObj.appendTo('#splitter');
```

### `min`

Specifies the minimum size of a pane. The pane cannot be resized if it is less than the specified minimum size.

```typescript
let splitObj: Splitter = new Splitter({
    paneSettings: [
        { size: '30%', min: '20%' },  // Min 20% of container
        { size: '40%', min: '100px' } // Min 100px
    ]
});
splitObj.appendTo('#splitter');
```

### `max`

Specifies the maximum size of a pane. The pane cannot be resized if it is more than the specified maximum limit.

```typescript
let splitObj: Splitter = new Splitter({
    paneSettings: [
        { size: '30%', max: '50%' },   // Max 50% of container
        { size: '40%', max: '500px' }  // Max 500px
    ]
});
splitObj.appendTo('#splitter');
```

### `collapsible`

Specifies whether a pane is collapsible or not collapsible. When enabled, collapse/expand icons appear on the separator.

See [Collapse and Expand Behavior](collapse-expand.md) for detailed examples.

```typescript
let splitObj: Splitter = new Splitter({
    paneSettings: [
        { collapsible: true, size: '250px' },
        { collapsible: true, size: '250px' }
    ]
});
splitObj.appendTo('#splitter');
```

### `collapsed`

Specifies whether a pane is collapsed or not collapsed at the initial rendering of splitter.

See [Collapse and Expand Behavior](collapse-expand.md) for more details.

```typescript
let splitObj: Splitter = new Splitter({
    paneSettings: [
        { collapsed: false, size: '250px' }, // Initially expanded
        { collapsed: true, size: '250px' }   // Initially collapsed
    ]
});
splitObj.appendTo('#splitter');
```

### `resizable`

Specifies the value whether a pane is resizable. By default, the Splitter is resizable in all panes.

See [Resizing & Constraints](resizing-behavior.md) for detailed examples.

```typescript
let splitObj: Splitter = new Splitter({
    paneSettings: [
        { resizable: true, size: '250px' },   // Can be resized
        { resizable: false, size: '250px' }   // Cannot be resized
    ]
});
splitObj.appendTo('#splitter');
```

### `content`

Specifies the content of split pane as plain text, HTML markup, or any other JavaScript controls.

See [Pane Content Options](pane-content.md) for detailed examples.

```typescript
let splitObj: Splitter = new Splitter({
    paneSettings: [
        { content: 'Simple text content' },
        { content: '<h3>HTML Content</h3><p>With markup</p>' },
        { content: document.getElementById('myElement') }
    ]
});
splitObj.appendTo('#splitter');
```

### `cssClass` (Pane-level)

Specifies the CSS class names that defines specific user-defined styles for a pane.

```typescript
let splitObj: Splitter = new Splitter({
    paneSettings: [
        { cssClass: 'left-panel sidebar', size: '250px' },
        { cssClass: 'main-content', size: '500px' }
    ]
});
splitObj.appendTo('#splitter');
```

---

## Methods

### `addPane(paneProperties, index)`

Allows you to add a pane dynamically to the specified index position. See [Add or Remove Panes](split-panes-orientation.md#add-or-remove-panes) for detailed examples.

```typescript
let splitObj: Splitter = new Splitter({
    paneSettings: [
        { size: '50%', content: 'Pane 1' },
        { size: '50%', content: 'Pane 2' }
    ]
});
splitObj.appendTo('#splitter');

// Add a new pane at index 1
splitObj.addPane({ size: '200px', content: 'New Pane' }, 1);
```

### `removePane(index)`

Allows you to remove the specified pane dynamically by passing its index value. See [Add or Remove Panes](split-panes-orientation.md#add-or-remove-panes) for detailed examples.

```typescript
let splitObj: Splitter = new Splitter({
    paneSettings: [
        { size: '33%', content: 'Pane 1' },
        { size: '34%', content: 'Pane 2' },
        { size: '33%', content: 'Pane 3' }
    ]
});
splitObj.appendTo('#splitter');

// Remove pane at index 1
splitObj.removePane(1);
```

### `expand(index)`

Expands corresponding pane based on the index passed. See [Collapse and Expand Behavior](collapse-expand.md#expand-method) for detailed examples.

```typescript
let splitObj: Splitter = new Splitter({
    paneSettings: [
        { collapsible: true, size: '250px', content: 'Pane 1', collapsed: true },
        { collapsible: true, size: '250px', content: 'Pane 2' }
    ]
});
splitObj.appendTo('#splitter');

// Expand pane at index 0
document.getElementById('expandBtn').addEventListener('click', () => {
    splitObj.expand(0);
});
```

### `collapse(index)`

Collapses corresponding pane based on the index passed. See [Collapse and Expand Behavior](collapse-expand.md#collapse-method) for detailed examples.

```typescript
let splitObj: Splitter = new Splitter({
    paneSettings: [
        { collapsible: true, size: '250px', content: 'Pane 1' },
        { collapsible: true, size: '250px', content: 'Pane 2' }
    ]
});
splitObj.appendTo('#splitter');

// Collapse pane at index 0
document.getElementById('collapseBtn').addEventListener('click', () => {
    splitObj.collapse(0);
});
```

### `refresh()`

Applies all the pending property changes and render the component again.

```typescript
let splitObj: Splitter = new Splitter({
    paneSettings: [{ size: '50%' }, { size: '50%' }]
});
splitObj.appendTo('#splitter');

// Make property changes
splitObj.orientation = 'Vertical';
splitObj.height = '500px';

// Render changes
splitObj.refresh();
```

### `destroy()`

Removes the control from the DOM and also removes all its related events.

```typescript
let splitObj: Splitter = new Splitter({
    paneSettings: [{ size: '50%' }, { size: '50%' }]
});
splitObj.appendTo('#splitter');

// Later, destroy the component
document.getElementById('destroyBtn').addEventListener('click', () => {
    splitObj.destroy();
});
```

### `getRootElement()`

Returns the root element of the component.

```typescript
let splitObj: Splitter = new Splitter({
    paneSettings: [{ size: '50%' }, { size: '50%' }]
});
splitObj.appendTo('#splitter');

// Get root element
let rootElement: HTMLElement = splitObj.getRootElement();
console.log(rootElement.classList); // Splitter class list
```

### `dataBind()`

When invoked, applies the pending property changes immediately to the component.

```typescript
let splitObj: Splitter = new Splitter({
    paneSettings: [{ size: '50%', content: 'Pane 1' }, { size: '50%', content: 'Pane 2' }]
});
splitObj.appendTo('#splitter');

// Change properties
splitObj.height = '300px';
splitObj.paneSettings[0].size = '30%';

// Apply changes immediately
splitObj.dataBind();
```

### `addEventListener(eventName, handler)`

Adds the handler to the given event listener.

```typescript
let splitObj: Splitter = new Splitter({
    paneSettings: [{ size: '50%' }, { size: '50%' }]
});
splitObj.appendTo('#splitter');

// Add event listener
splitObj.addEventListener('expanded', (args: ExpandedEventArgs) => {
    console.log('Pane expanded at index:', args.index);
});
```

### `removeEventListener(eventName, handler)`

Removes the handler from the given event listener.

```typescript
let splitObj: Splitter = new Splitter({
    paneSettings: [{ size: '50%' }, { size: '50%' }]
});
splitObj.appendTo('#splitter');

// Define handler
const myHandler = (args: any) => {
    console.log('Event fired');
};

// Add event listener
splitObj.addEventListener('expanded', myHandler);

// Remove event listener
splitObj.removeEventListener('expanded', myHandler);
```

### `appendTo(selector)`

Appends the control within the given HTML element. This method mounts the Splitter component to the specified DOM element.

```typescript
import { Splitter } from '@syncfusion/ej2-layouts';

let splitObj: Splitter = new Splitter({
    paneSettings: [
        { size: '50%', content: 'Pane 1' },
        { size: '50%', content: 'Pane 2' }
    ]
});

// Append to element with ID 'splitter'
splitObj.appendTo('#splitter');

// Alternative: append to HTMLElement
const container = document.getElementById('myContainer');
splitObj.appendTo(container);
```

**Parameters:**
- `selector` (string | HTMLElement, optional): Target element where control needs to be appended

**Returns:** void

### `Inject(moduleList)`

Dynamically injects the required modules to the component. This is used to inject feature modules that extend the Splitter functionality.

```typescript
import { Splitter } from '@syncfusion/ej2-layouts';

let splitObj: Splitter = new Splitter({
    paneSettings: [
        { size: '50%', content: 'Pane 1' },
        { size: '50%', content: 'Pane 2' }
    ]
});
splitObj.appendTo('#splitter');

// Inject modules (if available)
// Example: Splitter.Inject([ModuleName]);
```

**Parameters:**
- `moduleList` (Function[]): Array of modules to inject into the component

**Returns:** void

---

## Events & Event Arguments

### `created`

Triggers after creating the splitter component with its panes.

```typescript
let splitObj: Splitter = new Splitter({
    created: () => {
        console.log('Splitter created successfully');
        console.log('Total panes:', splitObj.paneSettings.length);
    },
    paneSettings: [{ size: '50%' }, { size: '50%' }]
});
splitObj.appendTo('#splitter');
```

### `beforeExpand`

Triggers when before panes get expanded. Can be used to prevent expansion. See [Collapse and Expand Behavior](collapse-expand.md) for event handling examples.

**Arguments:** `BeforeExpandEventArgs`
- `cancel` (boolean): Set to true to cancel the expand action
- `element` (HTMLElement): Root element after control created
- `event` (Event): Default event arguments
- `index` (number[]): Index of pane being expanded
- `pane` (HTMLElement[]): Pane elements
- `separator` (HTMLElement): Split-bar element

```typescript
let splitObj: Splitter = new Splitter({
    beforeExpand: (args: BeforeExpandEventArgs) => {
        console.log('Expanding pane at index:', args.index);
        // Prevent expansion of pane at index 0
        if (args.index[0] === 0) {
            args.cancel = true; // Cancel expansion
        }
    },
    paneSettings: [
        { collapsible: true, size: '250px', content: 'Pane 1', collapsed: true },
        { collapsible: true, size: '250px', content: 'Pane 2' }
    ]
});
splitObj.appendTo('#splitter');
```

### `expanded`

Triggers when after panes get expanded (expansion completed).

**Arguments:** `ExpandedEventArgs`
- `element` (HTMLElement): Root element
- `event` (Event): Default event arguments
- `index` (number[]): Index of pane that was expanded
- `pane` (HTMLElement[]): Pane elements
- `separator` (HTMLElement): Split-bar element

```typescript
let splitObj: Splitter = new Splitter({
    expanded: (args: ExpandedEventArgs) => {
        console.log('Pane expanded successfully at index:', args.index);
    },
    paneSettings: [
        { collapsible: true, size: '250px', content: 'Pane 1', collapsed: true },
        { collapsible: true, size: '250px', content: 'Pane 2' }
    ]
});
splitObj.appendTo('#splitter');
```

### `beforeCollapse`

Triggers when before panes get collapsed. Can be used to prevent collapse.

**Arguments:** `BeforeExpandEventArgs`
- `cancel` (boolean): Set to true to cancel the collapse action
- `element` (HTMLElement): Root element
- `event` (Event): Default event arguments
- `index` (number[]): Index of pane being collapsed
- `pane` (HTMLElement[]): Pane elements
- `separator` (HTMLElement): Split-bar element

```typescript
let splitObj: Splitter = new Splitter({
    beforeCollapse: (args: BeforeExpandEventArgs) => {
        console.log('Collapsing pane at index:', args.index);
        // Prevent collapse of pane at index 0
        if (args.index[0] === 0) {
            args.cancel = true;
        }
    },
    paneSettings: [
        { collapsible: true, size: '250px', content: 'Pane 1' },
        { collapsible: true, size: '250px', content: 'Pane 2' }
    ]
});
splitObj.appendTo('#splitter');
```

### `collapsed`

Triggers when after panes get collapsed (collapse completed).

**Arguments:** `ExpandedEventArgs`
- `element` (HTMLElement): Root element
- `event` (Event): Default event arguments
- `index` (number[]): Index of pane that was collapsed
- `pane` (HTMLElement[]): Pane elements
- `separator` (HTMLElement): Split-bar element

```typescript
let splitObj: Splitter = new Splitter({
    collapsed: (args: ExpandedEventArgs) => {
        console.log('Pane collapsed successfully at index:', args.index);
    },
    paneSettings: [
        { collapsible: true, size: '250px', content: 'Pane 1' },
        { collapsible: true, size: '250px', content: 'Pane 2' }
    ]
});
splitObj.appendTo('#splitter');
```

### `resizeStart`

Triggers when resize of pane starts. Can be used to prevent resize.

**Arguments:** `ResizeEventArgs`
- `cancel` (boolean): Set to true to prevent resize
- `element` (HTMLElement): The resizing pane element
- `event` (Event): Default event arguments
- `index` (number[]): Index of pane being resized
- `pane` (HTMLElement[]): Pane elements
- `separator` (HTMLElement): Split-bar element

```typescript
let splitObj: Splitter = new Splitter({
    resizeStart: (args: ResizeEventArgs) => {
        console.log('Resize started on pane:', args.index);
        // Prevent resizing the first pane
        if (args.index[0] === 0) {
            args.cancel = true;
        }
    },
    paneSettings: [
        { size: '250px', content: 'Pane 1' },
        { size: '250px', content: 'Pane 2' }
    ]
});
splitObj.appendTo('#splitter');
```

### `resizing`

Triggers when pane is being resized.

**Arguments:** `ResizingEventArgs`
- `element` (HTMLElement): The resizing pane element
- `event` (Event): Default event arguments
- `index` (number[]): Index of pane being resized
- `pane` (HTMLElement[]): Pane elements
- `paneSize` (number[]): Current pane sizes during resize
- `separator` (HTMLElement): Split-bar element

```typescript
let splitObj: Splitter = new Splitter({
    resizing: (args: ResizingEventArgs) => {
        console.log('Resizing... Current sizes:', args.paneSize);
    },
    paneSettings: [
        { size: '250px', content: 'Pane 1' },
        { size: '250px', content: 'Pane 2' }
    ]
});
splitObj.appendTo('#splitter');
```

### `resizeStop`

Triggers when resize of pane stops.

**Arguments:** `ResizingEventArgs`
- `element` (HTMLElement): The resizing pane element
- `event` (Event): Default event arguments
- `index` (number[]): Index of pane that was resized
- `pane` (HTMLElement[]): Pane elements
- `paneSize` (number[]): Final pane sizes after resize
- `separator` (HTMLElement): Split-bar element

```typescript
let splitObj: Splitter = new Splitter({
    resizeStop: (args: ResizingEventArgs) => {
        console.log('Resize completed. Final sizes:', args.paneSize);
    },
    paneSettings: [
        { size: '250px', content: 'Pane 1' },
        { size: '250px', content: 'Pane 2' }
    ]
});
splitObj.appendTo('#splitter');
```

### `beforeSanitizeHtml`

Triggers before sanitizing the HTML content.

**Arguments:** `BeforeSanitizeHtmlArgs`
- `cancel` (boolean): Set to true to prevent sanitization
- `helper` (Function): Custom sanitize callback function
- `selectors` (SanitizeSelectors): Selectors to be sanitized

```typescript
let splitObj: Splitter = new Splitter({
    beforeSanitizeHtml: (args: BeforeSanitizeHtmlArgs) => {
        console.log('Sanitizing HTML content');
        // Custom sanitization logic if needed
    },
    paneSettings: [
        { content: '<strong>Safe HTML</strong>' },
        { content: '<p>Another pane</p>' }
    ]
});
splitObj.appendTo('#splitter');
```
