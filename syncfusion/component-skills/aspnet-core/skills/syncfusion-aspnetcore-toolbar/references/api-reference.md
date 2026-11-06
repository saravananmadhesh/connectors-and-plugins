# Toolbar API Reference

## Table of Contents
- [Toolbar Properties](#toolbar-properties)
- [Toolbar Events](#toolbar-events)
- [Toolbar Methods](#toolbar-methods)
- [Item Properties](#item-properties)
- [Overflow Modes](#overflow-modes)
- [Alignment Options](#alignment-options)
- [Item Types](#item-types)
- [Event Arguments](#event-arguments)

## Toolbar Properties

### allowKeyboard
**Type**: `boolean`  
**Default**: `true`  
**Description**: Enables keyboard navigation in the Toolbar. When true, allows users to navigate between items using arrow keys and Tab/Shift+Tab (when tabIndex is configured on items).

```html
<ejs-toolbar id="keyboardToolbar" allowKeyboard="true">
    <e-toolbar-items>
        <e-toolbar-item text="Item 1" tabIndex="1"></e-toolbar-item>
        <e-toolbar-item text="Item 2" tabIndex="2"></e-toolbar-item>
    </e-toolbar-items>
</ejs-toolbar>
```

### cssClass
**Type**: `string`  
**Default**: Empty string  
**Description**: Sets CSS classes to the Toolbar root element for customization of toolbar styles. Multiple classes are separated by space.

```html
<ejs-toolbar id="themedToolbar" cssClass="custom-theme dark-mode">
    <e-toolbar-items>
        <e-toolbar-item text="New"></e-toolbar-item>
    </e-toolbar-items>
</ejs-toolbar>
```

### enableCollision
**Type**: `boolean`  
**Default**: `true`  
**Description**: Enables collision detection for the popup in Popup overflow mode. When enabled, the popup adjusts its position to stay within the viewport boundaries.

```html
<ejs-toolbar id="collisionToolbar" overflowMode="Popup" enableCollision="true">
    <!-- items -->
</ejs-toolbar>
```

### enableHtmlSanitizer
**Type**: `boolean`  
**Default**: `true`  
**Description**: Defines whether to enable HTML sanitization in Toolbar content to prevent XSS attacks. When true, potentially unsafe HTML is sanitized.

```html
<ejs-toolbar id="secureToolbar" enableHtmlSanitizer="true">
    <!-- items -->
</ejs-toolbar>
```

### enableRtl
**Type**: `boolean`  
**Default**: `false`  
**Description**: Enables right-to-left (RTL) direction for the Toolbar. Set to true for right-to-left languages like Arabic, Hebrew, and Urdu.

```html
<ejs-toolbar id="rtlToolbar" enableRtl="true">
    <e-toolbar-items>
        <e-toolbar-item text="جديد" prefixIcon="e-new-icon"></e-toolbar-item>
        <e-toolbar-item text="حفظ" prefixIcon="e-save-icon"></e-toolbar-item>
    </e-toolbar-items>
</ejs-toolbar>
```

### height
**Type**: `string`  
**Default**: Empty string  
**Description**: Sets the height of the Toolbar container in pixels or percentage. If not specified, height adjusts to content.

```html
<ejs-toolbar id="heightToolbar" height="60px">
    <!-- items -->
</ejs-toolbar>
```

### items
**Type**: `ToolbarItem[]`  
**Default**: Empty array  
**Description**: Defines the collection of Toolbar items. Each item is an object with properties like text, prefixIcon, type, etc. See Item Properties section for details.

Referenced in: [Item Configuration Guide](item-configuration-guide.md)

### overflowMode
**Type**: `enum` - `Scrollable` | `Popup` | `MultiRow` | `Extended`  
**Default**: `Scrollable`  
**Description**: Specifies the overflow mode when Toolbar content exceeds container width. See Responsive Modes section for detailed examples.

Referenced in: [Responsive Modes and Overflow](responsive-modes-and-overflow.md)

### scrollStep
**Type**: `number`  
**Default**: `40`  
**Description**: Sets the scroll distance (in pixels) when navigation arrows are clicked in Scrollable overflow mode. Larger values scroll more per click.

```html
<ejs-toolbar id="scrollStepToolbar" overflowMode="Scrollable" scrollStep="80">
    <!-- items with many elements -->
</ejs-toolbar>
```

Referenced in: [Advanced Features - Scroll Step Customization](advanced-features.md#scroll-step-customization)

### width
**Type**: `string`  
**Default**: Empty string  
**Description**: Sets the width of the Toolbar container in pixels or percentage. If not specified, width is 100% of parent container.

```html
<ejs-toolbar id="widthToolbar" width="600px">
    <!-- items -->
</ejs-toolbar>

<!-- Or responsive width -->
<ejs-toolbar id="responsiveToolbar" width="100%">
    <!-- items -->
</ejs-toolbar>
```

## Toolbar Events

### keyDown
**Type**: `Event`  
**Description**: Fires when a keyboard key is pressed while the Toolbar or its items have focus. Useful for handling keyboard shortcuts and custom key bindings.

```html
<script>
    function keyDown(e) {
        if (e.key === 'Enter') {
            console.log('Enter key pressed on toolbar');
        }
    }
</script>
```

### beforeCreate (under Events section)
**Type**: `Event`  
**Description**: Fires before Toolbar component is created. Useful for performing pre-initialization logic.

```html
<script>
    function beforecreate(e) {
        console.log('Toolbar is about to be created');
    }
</script>
```

### clicked
**Type**: `Event`  
**Description**: Fires when a Toolbar item is clicked. Contains information about the clicked item in event details.

```html
<script>
    function clicked(e) {
        console.log('Item clicked:', e.detail);
    }
</script>
```

Referenced in: [Advanced Features - Custom Command Handling](advanced-features.md#custom-command-handling)

### created
**Type**: `Event`  
**Description**: Fires after Toolbar component is completely created and initialized. Useful for post-initialization setup.

```html
<script>
    function created(e) {
        console.log('Toolbar created successfully');
        // Initialize dependent components
    }
</script>
```

### destroyed
**Type**: `Event`  
**Description**: Fires when Toolbar component is destroyed. Use for cleanup of resources.

```html
<script>
    function destroyed(e) {
        console.log('Toolbar destroyed');
        // Cleanup resources
    }
</script>
```

## Toolbar Methods

### addItems()
**Signature**: `addItems(items: ToolbarItem[], index?: number): void`  
**Description**: Programmatically adds items to the Toolbar at the specified index (appends at end if index not specified).

```html
<ejs-toolbar id="methodToolbar">
    <e-toolbar-items>
        <e-toolbar-item text="Existing Item"></e-toolbar-item>
    </e-toolbar-items>
</ejs-toolbar>

<script>
    // Add new items to toolbar
    const toolbar = document.querySelector('#methodToolbar');
    const newItems = [
        { text: 'New Item 1', prefixIcon: 'e-new-icon' },
        { text: 'New Item 2', prefixIcon: 'e-open-icon' }
    ];
    
    // Append at end (no index specified)
    // toolbar.ej2_instances[0].addItems(newItems);
    
    // Insert at index 1
    // toolbar.ej2_instances[0].addItems(newItems, 1);
</script>
```

### removeItems()
**Signature**: `removeItems(items: number[] | HTMLElement[] | string[]): void`  
**Description**: Programmatically removes items from Toolbar by index, HTML element reference, or item ID.

```html
<script>
    const toolbar = document.querySelector('#methodToolbar');
    
    // Remove by index
    // toolbar.ej2_instances[0].removeItems([1, 3]);
    
    // Remove by ID
    // toolbar.ej2_instances[0].removeItems(['item1', 'item2']);
</script>
```

### hideItem()
**Signature**: `hideItem(index: number | string): void`  
**Description**: Hides a Toolbar item by index or ID without removing it from the collection.

```html
<script>
    const toolbar = document.querySelector('#methodToolbar');
    // Hide item at index 2
    // toolbar.ej2_instances[0].hideItem(2);
    // Or hide by ID
    // toolbar.ej2_instances[0].hideItem('item1');
</script>
```

### enableItems()
**Signature**: `enableItems(index: number | string, value?: boolean): void`  
**Description**: Enables or disables a Toolbar item. Pass true to enable, false to disable (or omit for enable).

```html
<script>
    const toolbar = document.querySelector('#methodToolbar');
    // Enable item at index 1
    // toolbar.ej2_instances[0].enableItems(1, true);
    // Disable item at index 2
    // toolbar.ej2_instances[0].enableItems(2, false);
</script>
```

### refreshOverflow()
**Signature**: `refreshOverflow(): void`  
**Description**: Recalculates and updates the overflow popup layout. Call this after dynamically changing toolbar width or adding/removing items.

```html
<script>
    const toolbar = document.querySelector('#methodToolbar');
    // Resize container, then refresh overflow
    // toolbar.ej2_instances[0].refreshOverflow();
</script>
```

### destroy()
**Signature**: `destroy(): void`  
**Description**: Destroys the Toolbar component, removing it from the DOM and cleaning up resources and event listeners.

```html
<script>
    const toolbar = document.querySelector('#methodToolbar');
    // Destroy toolbar instance
    // toolbar.ej2_instances[0].destroy();
</script>
```

## Item Properties

### align
**Type**: `enum` - `Left` | `Center` | `Right`  
**Default**: `Left`  
**Description**: Specifies the alignment of the Toolbar item within the toolbar container. Right-aligned items typically appear at the end.

```html
<e-toolbar-item text="Right-aligned" align="Right"></e-toolbar-item>
```

Referenced in: [Item Configuration Guide](item-configuration-guide.md#item-properties-reference)

### cssClass
**Type**: `string`  
**Default**: Empty string  
**Description**: Adds CSS classes to the specific item for custom styling.

```html
<e-toolbar-item text="Styled Item" cssClass="btn-primary custom-btn"></e-toolbar-item>
```

### id
**Type**: `string`  
**Default**: Auto-generated  
**Description**: Sets a unique identifier for the Toolbar item. Used for targeting in JavaScript and CSS.

```html
<e-toolbar-item id="saveBtn" text="Save" prefixIcon="e-save-icon"></e-toolbar-item>
```

### prefixIcon
**Type**: `string`  
**Default**: Empty string  
**Description**: Sets the CSS class for an icon displayed before the item text (left side). Only `prefixIcon` displays if both prefix and suffix icons are specified.

```html
<e-toolbar-item text="Cut" prefixIcon="e-cut-icon"></e-toolbar-item>
```

Referenced in: [Item Configuration Guide - Button with Prefix Icon](item-configuration-guide.md#button-with-prefix-icon)

### suffixIcon
**Type**: `string`  
**Default**: Empty string  
**Description**: Sets the CSS class for an icon displayed after the item text (right side).

```html
<e-toolbar-item text="More Options" suffixIcon="e-dropdown-icon"></e-toolbar-item>
```

### text
**Type**: `string`  
**Default**: Empty string  
**Description**: Specifies the display text for the Toolbar item.

```html
<e-toolbar-item text="Save"></e-toolbar-item>
```

### tooltipText
**Type**: `string`  
**Default**: Empty string  
**Description**: Sets tooltip text that appears on mouse hover. Useful for providing context about item function.

```html
<e-toolbar-item text="Save" tooltipText="Save document (Ctrl+S)"></e-toolbar-item>
```

Referenced in: [Advanced Features - Tooltips](advanced-features.md#tooltips)

### type
**Type**: `enum` - `Button` | `Separator` | `Input`  
**Default**: `Button`  
**Description**: Specifies the type of Toolbar item. Button is default command type, Separator is visual divider, Input is container for form controls.

```html
<e-toolbar-item type="Button" text="Normal Button"></e-toolbar-item>
<e-toolbar-item type="Separator"></e-toolbar-item>
<e-toolbar-item type="Input"><!-- form control here --></e-toolbar-item>
```

Referenced in: [Item Configuration Guide](item-configuration-guide.md)

### width
**Type**: `string`  
**Default**: Empty string  
**Description**: Sets the width of the item in pixels or percentage. If not specified, width adjusts to content.

```html
<e-toolbar-item text="Wide Button" width="150px"></e-toolbar-item>
```

### overflow
**Type**: `enum` - `none` | `show` | `hide`  
**Default**: `none`  
**Description**: Controls overflow behavior in Popup mode. `show` = always visible (primary), `hide` = always in popup (secondary), `none` = normal order.

```html
<e-toolbar-item text="Important" overflow="show"></e-toolbar-item>
<e-toolbar-item text="Secondary" overflow="hide"></e-toolbar-item>
```

Referenced in: [Responsive Modes - Overflow Priority System](responsive-modes-and-overflow.md#overflow-priority-system)

### showAlwaysInPopup
**Type**: `boolean`  
**Default**: `false`  
**Description**: Forces the item to always appear in popup menu, even if space is available on toolbar. Not applicable when `overflow="show"`.

```html
<e-toolbar-item text="Settings" overflow="hide" showAlwaysInPopup="true"></e-toolbar-item>
```

Referenced in: [Responsive Modes - ShowAlwaysInPopup](responsive-modes-and-overflow.md#showalwaysinpopup-property)

### showTextOn
**Type**: `enum` - `Both` | `Toolbar` | `Overflow`  
**Default**: `Both`  
**Description**: Controls text visibility. `Both` = shown everywhere, `Toolbar` = toolbar only, `Overflow` = popup only.

```html
<e-toolbar-item text="Save" showTextOn="Both"></e-toolbar-item>
<e-toolbar-item text="Print" showTextOn="Overflow"></e-toolbar-item>
```

Referenced in: [Responsive Modes - ShowTextOn Property](responsive-modes-and-overflow.md#showtexton-property)

### tabIndex
**Type**: `number`  
**Default**: Not set  
**Description**: Sets tab order for keyboard navigation. Positive values enable tab navigation in ascending order. Zero includes item in tab order based on DOM order. Negative values exclude from tab order.

```html
<e-toolbar-item text="First" tabIndex="1"></e-toolbar-item>
<e-toolbar-item text="Second" tabIndex="2"></e-toolbar-item>
```

Referenced in: [Item Configuration Guide - Tab Key Navigation](item-configuration-guide.md#tab-key-navigation)

### template
**Type**: `string`  
**Default**: Empty string  
**Description**: Allows custom HTML content for the item using content templates. Set this property to the ID of a template element (div). Content templates are rendered within the toolbar and can include complex HTML structures with controls.

**Toolbar Item:**
```html
<e-toolbar-item type="Input" template="#toolbarTemplate"></e-toolbar-item>
```

**Template Definition:**
```html
<div id="toolbarTemplate">
    <button class='e-btn e-tbar-btn'>Cut</button>
    <button class='e-btn e-tbar-btn'>Copy</button>
    <ejs-menu id="menu" items="menuItems"></ejs-menu>
    <button class='e-btn e-tbar-btn'>Paste</button>
</div>
```

Referenced in: [Templates and Customization](templates-and-customization.md)

## Overflow Modes

| Mode | Behavior | Use Case |
|------|----------|----------|
| **Scrollable** (default) | Single line with navigation arrows and swipe support | Full command visibility preferred |
| **Popup** | Overflowing items move to dropdown menu | Space-constrained interfaces |
| **MultiRow** | Displays overflow toolbar items as an inline row of the toolbar | Multiple rows of commands |
| **Extended** | Hides overflowing items in the next row; shows them when expand icons are clicked. If popup content overflows page height, remaining elements are hidden | Compact toolbars with expandable sections |

Referenced in: [Responsive Modes and Overflow](responsive-modes-and-overflow.md)

## Alignment Options

| Value | Description | Example |
|-------|-------------|---------|
| **Left** | Item aligned to left (default) | Most commands |
| **Center** | Item centered (rare) | Centered brand/title |
| **Right** | Item aligned to right | Help, Settings, User menu |

```html
<e-toolbar-item text="Save" align="Left"></e-toolbar-item>
<e-toolbar-item text="Help" align="Right"></e-toolbar-item>
```

## Item Types

| Type | Purpose | Example |
|------|---------|---------|
| **Button** | Clickable command button | Save, Print, Edit |
| **Separator** | Visual divider between groups | Groups related commands |
| **Input** | Container for form controls | Dropdowns, textboxes |

```html
<e-toolbar-item type="Button" text="Action"></e-toolbar-item>
<e-toolbar-item type="Separator"></e-toolbar-item>
<e-toolbar-item type="Input"><!-- form control --></e-toolbar-item>
```

Referenced in: [Item Configuration Guide](item-configuration-guide.md)

## Event Arguments

### ClickEventArgs
**Properties**:
- `target`: HTML element of clicked item
- `itemId`: ID of the clicked item (if assigned)
- `itemIndex`: Index of clicked item in items collection
- `isInteracted`: Boolean indicating if click was from user interaction

```javascript
function click(e) {
    const eventArgs = e.detail;
    console.log('Clicked item index:', eventArgs.itemIndex);
    console.log('Item ID:', eventArgs.itemId);
}
```

### BeforeCreateEventArgs
**Properties**:
- `cancel`: Set to true to prevent initialization
- `element`: The toolbar element being initialized

```javascript
function beforecreate(e) {
    if (shouldPreventInit) {
        e.detail.cancel = true;
    }
}
```

---

**For complete implementation examples, refer to specific feature guides:**
- Getting Started: [getting-started.md](getting-started.md)
- Item Configuration: [item-configuration-guide.md](item-configuration-guide.md)
- Responsive Behavior: [responsive-modes-and-overflow.md](responsive-modes-and-overflow.md)
- Templates: [templates-and-customization.md](templates-and-customization.md)
- Advanced Features: [advanced-features.md](advanced-features.md)
