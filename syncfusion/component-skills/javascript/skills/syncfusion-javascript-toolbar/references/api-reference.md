# Complete API Reference

Quick reference for all Syncfusion EJ2 TypeScript Toolbar component APIs. For detailed examples and use cases, see the linked guides.

## Table of Contents

- [ToolbarModel Properties](#toolbarmodel-properties)
- [ItemModel Properties](#itemmodel-properties)
- [Events](#events)
- [Event Arguments Reference](#event-arguments-reference)
- [Enumerations](#enumerations)
- [Methods](#methods)
- [Quick Configuration Examples](#quick-configuration-examples)

---

## ToolbarModel Properties

### allowKeyboard

**Type:** `boolean` **Default:** `false`

Enable keyboard navigation using arrow keys for item focus and Enter key for activation. Fires `keyDown` events when keyboard interaction occurs.

**See:** [Advanced Features](./advanced-features.md) | [Interactivity & Commands](./interactivity-and-commands.md)

### cssClass

**Type:** `string` **Default:** `''`

Apply custom CSS classes to the toolbar root element for styling customization and theme overrides.

Example:
```typescript
let toolbar = new Toolbar({
  cssClass: 'custom-toolbar dark-theme',
  items: [
    { text: 'File' },
    { text: 'Edit' }
  ]
});
toolbar.appendTo('#element');
```

### enableCollision

**Type:** `boolean` **Default:** `true`

Prevent popup menu from going outside viewport boundaries when in Popup mode overflow. Automatically repositions popup if it would exceed screen edges.

**See:** [Interactivity & Commands](./interactivity-and-commands.md)

### enableHtmlSanitizer

**Type:** `boolean` **Default:** `false`

Sanitize HTML content to prevent XSS (Cross-Site Scripting) attacks. **Always set to `true` when using user-provided content in templates or attributes.**

**See:** [Templates & Customization](./template-and-customization.md)

### enablePersistence

**Type:** `boolean` **Default:** `false`

Persist toolbar state (such as item visibility and overflow settings) between page reloads using browser localStorage.

**See:** [Advanced Features](./advanced-features.md)

### enableRtl

**Type:** `boolean` **Default:** `false`

Enable right-to-left rendering for RTL languages (Arabic, Hebrew, Persian, Urdu). All UI elements reverse direction automatically.

Example:
```typescript
let toolbar = new Toolbar({
  enableRtl: true,
  locale: 'ar-SA',
  items: [{ text: 'الصفحة الرئيسية' }, { text: 'ملف' }]
});
toolbar.appendTo('#element');
```

**See:** [Advanced Features](./advanced-features.md)

### height

**Type:** `string` | `number` **Default:** `auto`

Set toolbar height in pixels, percentage, or other CSS units. Number values are treated as pixels.

Example:
```typescript
let toolbar = new Toolbar({ height: 50 }); // 50 pixels
let toolbar = new Toolbar({ height: '100%' }); // Full height
```

### items

**Type:** `ItemModel[]` **Default:** `[]`

Array of toolbar items (buttons, separators, inputs) defining the toolbar commands and layout.

Example:
```typescript
let toolbar = new Toolbar({
  items: [
    { text: 'Home' },
    { type: 'Separator' },
    { text: 'File', align: 'Right' }
  ]
});
toolbar.appendTo('#element');
```

**See:** [Item Configuration](./item-configuration.md)

### locale

**Type:** `string` **Default:** `'en-US'`

Culture/language localization override for the component. Specifies language and region for text rendering and number formatting.

Example:
```typescript
let toolbar = new Toolbar({ locale: 'fr-FR' }); // French
let toolbar = new Toolbar({ locale: 'es-ES' }); // Spanish
let toolbar = new Toolbar({ locale: 'ar-SA' }); // Arabic
```

### overflowMode

**Type:** `OverflowMode` **Default:** `'Scrollable'`

Display mode when toolbar content exceeds available space. Options: `'Scrollable'`, `'Popup'`, `'MultiRow'`, `'Extended'`.

Example:
```typescript
// Scrollable - horizontal scrolling with arrows
let toolbar = new Toolbar({ overflowMode: 'Scrollable', scrollStep: 100 });

// Popup - dropdown menu for overflow items
let toolbar = new Toolbar({ overflowMode: 'Popup' });

// MultiRow - items wrap to next row
let toolbar = new Toolbar({ overflowMode: 'MultiRow' });

// Extended - collapsible overflow row
let toolbar = new Toolbar({ overflowMode: 'Extended' });
```

**See:** [Responsive & Popup Modes](./responsive-and-popup.md)

### scrollStep

**Type:** `number` **Default:** `50`

Number of pixels to scroll per arrow click in Scrollable mode. Match this to typical item width for smooth navigation.

Example:
```typescript
let toolbar = new Toolbar({
  overflowMode: 'Scrollable',
  scrollStep: 100  // Scroll 100px per click
});
toolbar.appendTo('#element');
```

**See:** [Responsive & Popup - Responsive & Popup Modes](./responsive-and-popup.md)

### width

**Type:** `string` | `number` **Default:** `auto`

Set toolbar width in pixels, percentage, or other CSS units. Number values are treated as pixels. Constraining width triggers overflow modes.

Example:
```typescript
let toolbar = new Toolbar({ width: 600 }); // 600 pixels - triggers overflow
let toolbar = new Toolbar({ width: '100%' }); // Full width - responsive
```

---

## ItemModel Properties

### align

**Type:** `ItemAlign` **Default:** `'Left'`

Align item horizontally on the toolbar. Options: `'Left'` (default), `'Center'`, `'Right'`. Use to group related items on different sides.

Example:
```typescript
items: [
  { text: 'Home', align: 'Left' },     // Left aligned
  { text: 'Company', align: 'Center' }, // Centered
  { text: 'Help', align: 'Right' }      // Right aligned
]
```

**See:** [Item Configuration](./item-configuration.md)

### cssClass

**Type:** `string` **Default:** `''`

Custom CSS classes for individual item styling. Separate multiple classes with spaces.

Example:
```typescript
items: [
  { text: 'Bold', cssClass: 'e-bold-btn custom-style' },
  { text: 'Important', cssClass: 'e-highlight-btn' }
]
```

### disabled

**Type:** `boolean` **Default:** `false`

Disable item interaction. Disabled items appear grayed out and don't respond to clicks.

Example:
```typescript
items: [
  { text: 'Cut' },
  { text: 'Copy' },
  { text: 'Paste', disabled: true }  // Initially disabled
]
```

**See:** [Interactivity & Commands](./interactivity-and-commands.md)

### htmlAttributes

**Type:** `{ [key: string]: string }` **Default:** `null`

Custom HTML attributes (data-*, aria-*, style, etc.) added to the item element. Use for metadata, accessibility, or styling.

Example:
```typescript
items: [
  {
    text: 'Save',
    htmlAttributes: {
      'data-action': 'save',
      'data-shortcut': 'Ctrl+S',
      'aria-label': 'Save document',
      'style': 'color: #007bff;'
    }
  }
]
```

**See:** [Templates & Customization](./template-and-customization.md)

### id

**Type:** `string` **Default:** `''`

Unique identifier for the item element. Enables direct DOM access and programmatic item control by ID lookup.

Example:
```typescript
items: [
  { id: 'save-btn', text: 'Save' },
  { id: 'delete-btn', text: 'Delete' }
]

// Later: find and modify by ID
let item = toolbar.items.find(i => i.id === 'save-btn');
item.disabled = false;
toolbar.refresh();
```

**See:** [Item Configuration](./item-configuration.md)

### overflow

**Type:** `OverflowOption` **Default:** `'None'`

Control item priority in Popup mode overflow. Options: `'Show'` (always on toolbar), `'Hide'` (always in popup), `'None'` (normal priority).

Example:
```typescript
items: [
  { text: 'Save', overflow: 'Show' },    // Always visible
  { text: 'Admin', overflow: 'Hide' },   // Always in popup
  { text: 'File', overflow: 'None' }     // Normal priority
]
```

**See:** [Responsive & Popup Modes](./responsive-and-popup.md)

### prefixIcon

**Type:** `string` **Default:** `''`

Icon class displayed before item text. Use Font Awesome or custom icon font classes. If text is present, icon appears before it.

Example:
```typescript
items: [
  { text: 'Cut', prefixIcon: 'fa-cut' },
  { text: 'Copy', prefixIcon: 'fa-copy' },
  { text: 'Save', prefixIcon: 'e-save-icon tb-icons' }
]
```

**See:** [Advanced Features](./advanced-features.md)

### showAlwaysInPopup

**Type:** `boolean` **Default:** `false`

Force item to always appear in popup menu even when there's space on toolbar. Only applicable in Popup mode.

Example:
```typescript
items: [
  { text: 'Help', showAlwaysInPopup: true },
  { text: 'Admin Settings', showAlwaysInPopup: true }
]
```

**See:** [Responsive & Popup Modes](./responsive-and-popup.md)

### showTextOn

**Type:** `DisplayMode` **Default:** `undefined`

Control where item text displays in Popup mode. Options: `'Toolbar'` (text on toolbar only), `'Overflow'` (text in popup only), `'Both'` (everywhere).

Example:
```typescript
items: [
  { text: 'Save', prefixIcon: 'fa-save', showTextOn: 'Toolbar' },   // Text on toolbar
  { text: 'Delete', prefixIcon: 'fa-trash', showTextOn: 'Overflow' }, // Text in popup
  { text: 'Format', prefixIcon: 'fa-font', showTextOn: 'Both' }       // Text everywhere
]
```

**See:** [Templates & Customization](./template-and-customization.md)

### suffixIcon

**Type:** `string` **Default:** `''`

Icon class displayed after item text. Use for dropdown indicators, status icons, or visual markers after the text.

Example:
```typescript
items: [
  { text: 'Dropdown', suffixIcon: 'fa-chevron-down' },
  { text: 'Menu', suffixIcon: 'fa-caret-down' }
]
```

**See:** [Advanced Features](./advanced-features.md)

### tabIndex

**Type:** `number` **Default:** `0`

Tab order for keyboard navigation. Positive values enable Tab/Shift-Tab navigation between items. Value `0` follows DOM order.

Example:
```typescript
items: [
  { text: 'Home', tabIndex: 1 },
  { text: 'File', tabIndex: 2 },
  { text: 'Help', tabIndex: 3 }
]
```

**See:** [Item Configuration](./item-configuration.md)

### template

**Type:** `string` | `Object` | `Function` **Default:** `null`

Custom HTML template for item. Can be inline HTML string, element ID selector, or function returning HTML.

Example:
```typescript
items: [
  { template: '<input type="text" placeholder="Search">' },
  { template: '#custom-template-id' },
  { template: () => '<div>Dynamic content</div>' }
]
```

**See:** [Templates & Customization](./template-and-customization.md)

### text

**Type:** `string` **Default:** `''`

Visible label text displayed on the item. If both text and icon are present, text typically appears with the icon.

Example:
```typescript
items: [
  { text: 'Home' },
  { text: 'File' },
  { text: 'Edit' }
]
```

**See:** [Item Configuration](./item-configuration.md)

### tooltipText

**Type:** `string` **Default:** `''`

Hover tooltip help text. Displayed when user mouses over item. Separate from visible item text.

Example:
```typescript
items: [
  { text: 'Save', tooltipText: 'Save current document (Ctrl+S)' },
  { text: 'Delete', tooltipText: 'Remove selected items' }
]
```

**See:** [Advanced Features](./advanced-features.md)

### type

**Type:** `ItemType` **Default:** `'Button'`

Item type. Options: `'Button'` (clickable), `'Separator'` (visual divider), `'Input'` (form control).

Example:
```typescript
items: [
  { text: 'Cut', type: 'Button' },
  { type: 'Separator' },
  { template: '<input type="text">', type: 'Input' }
]
```

**See:** [Item Configuration](./item-configuration.md)


---

## Events

### beforeCreate

**Type:** `EmitType<BeforeCreateArgs>`

Fired before toolbar renders in the DOM. Use to configure initial settings like scroll step or collision detection.

Example:
```typescript
let toolbar = new Toolbar({
  beforeCreate: (args) => {
    console.log('Scroll step:', args.scrollStep);
    console.log('Enable collision:', args.enableCollision);
  },
  scrollStep: 100
});
toolbar.appendTo('#element');
```

**See:** [Interactivity & Commands](./interactivity-and-commands.md)

### clicked

**Type:** `EmitType<ClickEventArgs>`

Fired when a toolbar item is clicked. Event object contains the clicked item and original event.

Example:
```typescript
let toolbar = new Toolbar({
  clicked: (args) => {
    console.log('Clicked item:', args.item.text);
    console.log('Original event:', args.originalEvent);
  },
  items: [
    { text: 'Save' },
    { text: 'Delete' }
  ]
});
toolbar.appendTo('#element');
```

**See:** [Interactivity & Commands](./interactivity-and-commands.md)

### created

**Type:** `EmitType<Event>`

Fired after toolbar component is fully initialized and rendered in the DOM. All child elements are ready for manipulation.

**See:** [Interactivity & Commands](./interactivity-and-commands.md)

### destroyed

**Type:** `EmitType<Event>`

Fired when toolbar component is destroyed. Cleanup and resource deallocation occurs at this point.

**See:** [Interactivity & Commands](./interactivity-and-commands.md)

### keyDown

**Type:** `EmitType<KeyDownEventArgs>`

Fired when a key is pressed on the toolbar (requires `allowKeyboard: true`). Provides current and next item navigation information.

Example:
```typescript
let toolbar = new Toolbar({
  allowKeyboard: true,
  keyDown: (args) => {
    console.log('Current:', args.currentItem.textContent);
    if (args.nextItem) {
      console.log('Next:', args.nextItem.textContent);
    }
  },
  items: [{ text: 'Item 1' }, { text: 'Item 2' }]
});
toolbar.appendTo('#element');
```

**See:** [Interactivity & Commands](./interactivity-and-commands.md)

---

## Event Arguments Reference

### BeforeCreateArgs

```typescript
interface BeforeCreateArgs {
  enableCollision: boolean;  // Popup collision detection setting
  name: string;              // Always 'beforeCreate'
  scrollStep: number;        // Scroll distance in Scrollable mode
}
```

### ClickEventArgs

```typescript
interface ClickEventArgs {
  cancel: boolean;          // Set true to prevent default action
  item: ItemModel;          // The clicked item object
  name: string;             // Always 'clicked'
  originalEvent: Event;     // Native browser click event
}
```

### KeyDownEventArgs

```typescript
interface KeyDownEventArgs {
  cancel: boolean;               // Set true to prevent default behavior
  currentItem: HTMLElement;      // Currently focused toolbar item
  name: string;                  // Always 'keyDown'
  nextItem: HTMLElement | null;  // Next item in navigation order (null at end)
  originalEvent: KeyboardEvent;  // Native keyboard event
}
```

---

## Enumerations

### ItemType

```typescript
type ItemType = 'Button' | 'Separator' | 'Input';
```

| Value | Description |
|-------|-------------|
| `'Button'` | Clickable button (default) |
| `'Separator'` | Visual divider line for grouping |
| `'Input'` | Input field or custom form component |

**See:** [Item Configuration](./item-configuration.md)

### ItemAlign

```typescript
type ItemAlign = 'Left' | 'Center' | 'Right';
```

| Value | Description |
|-------|-------------|
| `'Left'` | Align to left side (default) |
| `'Center'` | Align to center |
| `'Right'` | Align to right side |

**See:** [Item Configuration](./item-configuration.md)

### OverflowOption

```typescript
type OverflowOption = 'Show' | 'Hide' | 'None';
```

| Value | Description |
|-------|-------------|
| `'Show'` | Always visible on toolbar (primary priority) |
| `'Hide'` | Always in popup menu (secondary priority) |
| `'None'` | No priority; moves to popup as needed (default) |

**See:** [Responsive & Popup Modes](./responsive-and-popup.md)

### OverflowMode

```typescript
type OverflowMode = 'Scrollable' | 'Popup' | 'MultiRow' | 'Extended';
```

| Value | Description | Best For |
|-------|-------------|----------|
| `'Scrollable'` | Single line with horizontal scrolling (default) | Many items with frequent access |
| `'Popup'` | Prioritized items on toolbar, rest in dropdown | Space-limited layouts |
| `'MultiRow'` | Overflow items wrap to next row | Responsive designs with vertical space |
| `'Extended'` | Collapsible row with expand icons | Compact toolbars with progressive disclosure |

**See:** [Responsive & Popup Modes](./responsive-and-popup.md) for detailed guides on each mode

### DisplayMode

```typescript
type DisplayMode = 'Toolbar' | 'Overflow' | 'Both';
```

| Value | Description |
|-------|-------------|
| `'Toolbar'` | Text on toolbar only, icon-only in popup |
| `'Overflow'` | Icon-only on toolbar, text in popup |
| `'Both'` | Text in both toolbar and popup |

**See:** [Templates & Customization](./template-and-customization.md)

---

## Methods

### addEventListener

Adds an event listener for the specified event.

**Signature:**
```typescript
addEventListener(eventName: string, handler: Function): void
```

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `eventName` | `string` | Name of the event to listen for |
| `handler` | `Function` | Callback function to execute when event occurs |

**Example:**
```typescript
let toolbar = new Toolbar({ items: [{ text: 'Save' }] });
toolbar.appendTo('#element');

toolbar.addEventListener('beforeCreate', (args) => {
  console.log('beforeCreate event fired');
});
```

### addItems

Adds new items to the Toolbar.

**Signature:**
```typescript
addItems(items: ItemModel[], index?: number): void
```

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `items` | `ItemModel[]` | Array of items to add |
| `index` (optional) | `number` | Position to insert items (default: 0) |

**Example:**
```typescript
let toolbar = new Toolbar({ items: [{ text: 'File' }] });
toolbar.appendTo('#element');

// Add items at the end
toolbar.addItems([
  { text: 'Edit', id: 'edit' },
  { text: 'View', id: 'view' }
]);

// Add items at specific index
toolbar.addItems([{ text: 'Format' }], 1);
```

### appendTo

Appends the Toolbar component to a specified container element.

**Signature:**
```typescript
appendTo(selector?: string | HTMLElement): void
```

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `selector` (optional) | `string \| HTMLElement` | Target element ID or DOM element |

**Example:**
```typescript
let toolbar = new Toolbar({ items: [{ text: 'Save' }] });

// Append using selector string
toolbar.appendTo('#element');

// Or append using DOM element
toolbar.appendTo(document.getElementById('element'));
```

### dataBind

Applies all pending property changes immediately without full re-render.

**Signature:**
```typescript
dataBind(): void
```

**Example:**
```typescript
let toolbar = new Toolbar({ items: [{ text: 'File' }] });
toolbar.appendTo('#element');

toolbar.items.push({ text: 'Edit' });
toolbar.dataBind();  // Apply pending changes
```

### destroy

Removes the Toolbar component from the DOM and cleans up all related events and resources.

**Signature:**
```typescript
destroy(): void
```

**Example:**
```typescript
let toolbar = new Toolbar({ items: [{ text: 'Save' }] });
toolbar.appendTo('#element');

// Later, clean up
toolbar.destroy();  // Component removed from DOM
```

### disable

Disables or enables the entire Toolbar component.

**Signature:**
```typescript
disable(value: boolean): void
```

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `value` | `boolean` | `true` to disable, `false` to enable |

**Example:**
```typescript
let toolbar = new Toolbar({ items: [{ text: 'Save' }, { text: 'Delete' }] });
toolbar.appendTo('#element');

// Disable all toolbar interactions
toolbar.disable(true);

// Re-enable toolbar
toolbar.disable(false);
```

### enableItems

Enables or disables specific toolbar items.

**Signature:**
```typescript
enableItems(items: number | HTMLElement | NodeList, isEnable?: boolean): void
```

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `items` | `number \| HTMLElement \| NodeList` | Item index, DOM element, or node list of items |
| `isEnable` (optional) | `boolean` | `true` to enable, `false` to disable (default: true) |

**Example:**
```typescript
let toolbar = new Toolbar({
  items: [
    { id: 'cut', text: 'Cut' },
    { id: 'copy', text: 'Copy' },
    { id: 'paste', text: 'Paste', disabled: true }
  ]
});
toolbar.appendTo('#element');

// Enable item by index
toolbar.enableItems(2);  // Enable Paste

// Disable item by DOM element
let pasteBtn = document.getElementById('paste');
toolbar.enableItems(pasteBtn, false);
```

### getRootElement

Returns the root DOM element of the Toolbar component.

**Signature:**
```typescript
getRootElement(): HTMLElement
```

**Example:**
```typescript
let toolbar = new Toolbar({ items: [{ text: 'File' }] });
toolbar.appendTo('#element');

let rootElement = toolbar.getRootElement();
console.log(rootElement.classList);  // View toolbar classes
```

### hideItem

Shows or hides a toolbar item at the specified index.

**Signature:**
```typescript
hideItem(index: number | HTMLElement, value?: boolean): void
```

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `index` | `number \| HTMLElement` | Item index or DOM element to toggle visibility |
| `value` (optional) | `boolean` | `true` to hide, `false` to show (default: false) |

**Example:**
```typescript
let toolbar = new Toolbar({
  items: [
    { text: 'Save' },
    { text: 'Format' },
    { text: 'Admin' }
  ]
});
toolbar.appendTo('#element');

// Hide item at index 2
toolbar.hideItem(2);

// Show item at index 2
toolbar.hideItem(2, false);
```

### refresh

Applies all pending property changes and re-renders the component.

**Signature:**
```typescript
refresh(): void
```

**Example:**
```typescript
let toolbar = new Toolbar({ items: [{ text: 'File' }] });
toolbar.appendTo('#element');

toolbar.items.push({ text: 'Edit' });
toolbar.refresh();  // Full re-render with new item
```

### refreshOverflow

Refreshes overflow modes (Scrollable, Popup, MultiRow, Extended) without full re-render.

**Signature:**
```typescript
refreshOverflow(): void
```

**Example:**
```typescript
let toolbar = new Toolbar({
  overflowMode: 'Popup',
  items: [{ text: 'Item 1' }, { text: 'Item 2' }]
});
toolbar.appendTo('#element');

// Dynamically add items
toolbar.addItems([{ text: 'Item 3' }, { text: 'Item 4' }]);

// Refresh overflow layout
toolbar.refreshOverflow();
```

### removeEventListener

Removes an event listener that was previously added.

**Signature:**
```typescript
removeEventListener(eventName: string, handler: Function): void
```

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `eventName` | `string` | Name of the event to remove listener from |
| `handler` | `Function` | Reference to the handler function to remove |

**Example:**
```typescript
function myHandler(args) {
  console.log('Event triggered');
}

let toolbar = new Toolbar({ items: [{ text: 'Save' }] });
toolbar.appendTo('#element');

toolbar.addEventListener('clicked', myHandler);

// Later, remove the listener
toolbar.removeEventListener('clicked', myHandler);
```

### removeItems

Removes items from the Toolbar.

**Signature:**
```typescript
removeItems(args: number | HTMLElement | NodeList | Element | HTMLElement[]): void
```

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `args` | `number \| HTMLElement \| NodeList \| Element \| HTMLElement[]` | Item index, DOM element(s), or array of elements to remove |

**Example:**
```typescript
let toolbar = new Toolbar({
  items: [
    { id: 'cut', text: 'Cut' },
    { id: 'copy', text: 'Copy' },
    { id: 'paste', text: 'Paste' }
  ]
});
toolbar.appendTo('#element');

// Remove item by index
toolbar.removeItems(2);  // Remove Paste

// Remove item by DOM element
let copyBtn = document.getElementById('copy');
toolbar.removeItems(copyBtn);
```

### Inject

Dynamically injects required modules into the component.

**Signature:**
```typescript
Inject(moduleList: Function[]): void
```

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `moduleList` | `Function[]` | Array of module constructors to inject |

**Example:**
```typescript
import { Toolbar } from '@syncfusion/ej2-navigations';
import { HtmlSanitizer } from '@syncfusion/ej2-base';

// Inject HtmlSanitizer module if needed
Toolbar.Inject(HtmlSanitizer);

let toolbar = new Toolbar({
  enableHtmlSanitizer: true,
  items: [{ text: 'Safe HTML' }]
});
toolbar.appendTo('#element');
```

---

## Quick Configuration Examples

### Basic Toolbar

Example:
```typescript
let toolbar = new Toolbar({
  items: [
    { text: 'Home' },
    { text: 'File' },
    { type: 'Separator' },
    { text: 'Help', align: 'Right' }
  ]
});
toolbar.appendTo('#element');
```

**See:** [Getting Started](./getting-started.md)

### Responsive Toolbar (Popup Mode)

Example:
```typescript
let toolbar = new Toolbar({
  width: 400,
  overflowMode: 'Popup',
  items: [
    { text: 'Save', overflow: 'Show' },
    { text: 'Admin', overflow: 'Hide' },
    { text: 'Options' }
  ]
});
toolbar.appendTo('#element');
```

**See:** [Responsive & Popup Modes](./responsive-and-popup.md)

### Keyboard-Accessible Toolbar

Example:
```typescript
let toolbar = new Toolbar({
  allowKeyboard: true,
  keyDown: (args) => {
    console.log('Current:', args.currentItem.textContent);
    console.log('Next:', args.nextItem?.textContent);
  },
  items: [
    { text: 'Item 1', tabIndex: 1 },
    { text: 'Item 2', tabIndex: 2 }
  ]
});
toolbar.appendTo('#element');
```

**See:** [Advanced Features](./advanced-features.md) | [Interactivity & Commands](./interactivity-and-commands.md)

### Secure Toolbar with User Content

Example:
```typescript
let toolbar = new Toolbar({
  enableHtmlSanitizer: true,  // Prevent XSS
  items: [
    {
      template: getUserProvidedHtml(),  // Automatically sanitized
      htmlAttributes: { 'data-user': 'true' }
    }
  ]
});
toolbar.appendTo('#element');
```

**See:** [Templates & Customization](./template-and-customization.md)

### State Management Pattern

Example:
```typescript
let toolbar = new Toolbar({
  clicked: (args) => {
    if (args.item.id === 'cut') {
      toolbar.items.find(i => i.id === 'paste').disabled = false;
      toolbar.refresh();
    }
  },
  items: [
    { id: 'cut', text: 'Cut' },
    { id: 'paste', text: 'Paste', disabled: true }
  ]
});
toolbar.appendTo('#element');
```

**See:** [Interactivity & Commands](./interactivity-and-commands.md)

---

