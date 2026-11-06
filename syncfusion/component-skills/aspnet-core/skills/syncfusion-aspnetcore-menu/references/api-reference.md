# API Reference

## Table of Contents
- [MenuModel Properties](#menumodel-properties)
- [MenuItemModel Properties](#menuitemmodel-properties)
- [FieldSettingsModel Properties](#fieldsettingsmodel-properties)
- [MenuAnimationSettingsModel Properties](#menuanimationsettingsmodel-properties)
- [Menu Events](#menu-events)
- [Event Arguments](#event-arguments)
- [Enums and Constants](#enums-and-constants)

## MenuModel Properties

The MenuModel interface defines all properties available on the `<ejs-menu>` component.

### Core Properties

#### animationSettings
- **Type:** `MenuAnimationSettingsModel`
- **Default:** `{ duration: 400, easing: 'ease', effect: 'SlideDown' }`
- **Description:** Specifies animation settings for sub-menu open/close transitions
- **Example:** `animationSettings='new { effect = "ZoomIn", duration = 300 }'`

#### cssClass
- **Type:** `string`
- **Description:** Adds custom CSS class(es) to the Menu wrapper element for styling
- **Example:** `cssClass="custom-menu dark-theme"`
- **Usage:** Apply custom styles without modifying theme files

#### enableHtmlSanitizer
- **Type:** `boolean`
- **Default:** `false`
- **Description:** Sanitizes HTML content to prevent XSS attacks
- **Example:** `enableHtmlSanitizer="true"`
- **Note:** Should be `true` when rendering untrusted HTML content

#### enablePersistence
- **Type:** `boolean`
- **Default:** `false`
- **Description:** Persists menu state between page reloads using browser localStorage
- **Example:** `enablePersistence="true"`
- **Storage Key:** Automatically generated based on component ID

#### enableRtl
- **Type:** `boolean`
- **Default:** `false`
- **Description:** Enables right-to-left layout for RTL languages (Arabic, Hebrew, Urdu)
- **Example:** `enableRtl="true"`
- **Compatible Locales:** ar-AE, ar-SA, he-IL, ur-PK, etc.

#### enableScrolling
- **Type:** `boolean`
- **Default:** `false`
- **Description:** Displays scrollbars when menu content exceeds container height
- **Example:** `enableScrolling="true"`
- **Use Case:** Large menus with many items

#### fields
- **Type:** `FieldSettingsModel`
- **Description:** Maps custom data property names to menu item properties
- **Example:** `fields='new { text = "itemName", children = "subitems" }'`
- **Related:** See [FieldSettingsModel Properties](#fieldsettingsmodel-properties)

#### hamburgerMode
- **Type:** `boolean`
- **Default:** `false`
- **Description:** Shows hamburger icon for mobile/responsive menu toggle
- **Example:** `hamburgerMode="true"`
- **Related:** Use with `target` property

#### hoverDelay
- **Type:** `number` (milliseconds)
- **Default:** ~100-200 (system default)
- **Description:** Milliseconds delay before sub-menu opens on mouse hover
- **Example:** `hoverDelay="500"`
- **Range:** 0-5000 recommended

#### items
- **Type:** `MenuItemModel[]` OR `dynamic[]`
- **Description:** Array of menu items to display
- **Example:** `items="menuItemsVariable"` or inline list in C#
- **Supports:** Hierarchical nesting via `items` property in each item

#### locale
- **Type:** `string`
- **Default:** `"en-US"`
- **Description:** Sets language and regional formatting
- **Valid Values:** en-US, ar-AE, de-DE, es-ES, fr-FR, he-IL, ja-JP, ur-PK, zh-CN, etc.
- **Example:** `locale="ar-AE"`

#### orientation
- **Type:** `Orientation` enum
- **Default:** `Vertical`
- **Valid Values:** `Horizontal`, `Vertical`
- **Description:** Specifies menu layout direction
- **Example:** `orientation="Horizontal"`

#### showItemOnClick
- **Type:** `boolean`
- **Default:** `false` (open on hover)
- **Description:** When `true`, sub-menus open ONLY on click, not on hover
- **Example:** `showItemOnClick="true"`
- **Use Case:** Prevent accidental menu openings on hover

#### target
- **Type:** `string`
- **Description:** CSS selector or element ID for hamburger mode toggle target
- **Example:** `target="#hamburgerToggle"`
- **Used With:** `hamburgerMode="true"`

#### template
- **Type:** `string` OR `Function`
- **Description:** Custom HTML template for rendering menu items
- **Example:** `template="<span class='icon ${iconCss}'></span><span>${text}</span>"`
- **Template Syntax:** Use `${propertyName}` to access item properties

#### title
- **Type:** `string`
- **Description:** Display title for hamburger mode menu
- **Example:** `title="Navigation Menu"`
- **Used With:** `hamburgerMode="true"`

## MenuItemModel Properties

The MenuItemModel interface defines properties for individual menu items.

### Item Properties

#### text
- **Type:** `string`
- **Description:** Display text for the menu item
- **Example:** `text="File"`
- **Required:** For visible items

#### items
- **Type:** `MenuItemModel[]`
- **Description:** Array of sub-menu items (nested structure)
- **Example:** Nested list in C# anonymous objects
- **Depth:** Supports unlimited nesting levels

#### id
- **Type:** `string`
- **Description:** Unique identifier for the menu item
- **Example:** `id="menu-file"`
- **Use Case:** Reference items in custom logic or event handlers
- **Important:** Useful for self-referential data binding

#### iconCss
- **Type:** `string`
- **Description:** CSS class names for displaying icons before item text
- **Example:** `iconCss="e-icons e-home"`
- **Supports:** Multiple space-separated classes

#### separator
- **Type:** `boolean`
- **Default:** `false`
- **Description:** When `true`, renders item as a visual separator/divider
- **Example:** `separator=true`
- **Display:** No text shown; appears as horizontal line

#### htmlAttributes
- **Type:** `Record` (key-value pairs)
- **Description:** Custom HTML attributes added to the menu item element
- **Example:** `htmlAttributes=new { @class = "special-item", data_id = "123" }`
- **Use Case:** Custom data attributes, accessibility attributes

## FieldSettingsModel Properties

The FieldSettingsModel maps custom data property names to menu item properties for data binding.

### Field Mapping Properties

#### text
- **Type:** `string` OR `string[]`
- **Description:** Maps to item display text property name
- **Example:** `text = "itemName"` (for data with property named "itemName")
- **Default:** "text"

#### children
- **Type:** `string` OR `string[]`
- **Description:** Maps to sub-items array property name (for hierarchical data)
- **Example:** `children = "subitems"`
- **Default:** "items"

#### itemId
- **Type:** `string` OR `string[]`
- **Description:** Maps to unique ID property name (for self-referential data)
- **Example:** `itemId = "id"`
- **Default:** "id"

#### parentId
- **Type:** `string` OR `string[]`
- **Description:** Maps to parent ID property name (for self-referential data)
- **Example:** `parentId = "parentId"`
- **Default:** "parentId"
- **Note:** Used to establish parent-child relationships

#### iconCss
- **Type:** `string` OR `string[]`
- **Description:** Maps to icon CSS class property name
- **Example:** `iconCss = "icon"`
- **Default:** "iconCss"

#### separator
- **Type:** `string` OR `string[]`
- **Description:** Maps to separator flag property name
- **Example:** `separator = "isSeparator"`
- **Default:** "separator"
- **Data Type:** Boolean field

#### url
- **Type:** `string` OR `string[]`
- **Description:** Maps to navigation URL property name
- **Example:** `url = "navigationUrl"`
- **Default:** "url"

## MenuAnimationSettingsModel Properties

Controls animation behavior for sub-menu opening/closing transitions.

### Animation Properties

#### effect
- **Type:** `MenuEffect` enum
- **Default:** `SlideDown`
- **Valid Values:** `None`, `SlideDown`, `ZoomIn`, `FadeIn`
- **Description:** Animation effect type
- **Examples:**
  - `None`: Instant appearance
  - `SlideDown`: Smooth slide from top
  - `ZoomIn`: Zoom from center
  - `FadeIn`: Fade in gradually

#### duration
- **Type:** `number` (milliseconds)
- **Default:** `400`
- **Range:** 0-5000 recommended
- **Description:** Animation duration in milliseconds
- **Example:** `duration=300` (300ms animation)

#### easing
- **Type:** `string` (CSS easing function)
- **Default:** `"ease"`
- **Common Values:**
  - `"linear"` - Constant speed
  - `"ease"` - Slow start/end (default)
  - `"ease-in"` - Accelerating
  - `"ease-out"` - Decelerating
  - `"ease-in-out"` - Slow start/end
  - `"cubic-bezier(n,n,n,n)"` - Custom timing
- **Example:** `easing="ease-out"`

## Menu Events

Menu events are triggered in response to user interactions or component state changes.

### Event Properties

Menu events are declared as TagHelper attributes on the `<ejs-menu>` component:

```html
<ejs-menu id="menu"
    items="menuItems"
    beforeOpen="eventHandler"
    beforeClose="eventHandler"
    onOpen="eventHandler"
    onClose="eventHandler"
    select="eventHandler"
    beforeItemRender="eventHandler"
    created="eventHandler">
</ejs-menu>
```

### Event Definitions

#### beforeOpen
- **Trigger:** Before sub-menu opens
- **Argument Type:** `BeforeOpenCloseMenuEventArgs`
- **Handler Signature:** `function beforeOpen(args) { }`
- **Use Case:** Validate or prepare data before menu appears

#### beforeClose
- **Trigger:** Before sub-menu closes
- **Argument Type:** `BeforeOpenCloseMenuEventArgs`
- **Handler Signature:** `function beforeClose(args) { }`
- **Use Case:** Save state or prevent closing

#### onOpen
- **Trigger:** After sub-menu opens and is visible
- **Argument Type:** `OpenCloseMenuEventArgs`
- **Handler Signature:** `function onOpen(args) { }`
- **Use Case:** Analytics, logging, content loading

#### onClose
- **Trigger:** After sub-menu closes and is hidden
- **Argument Type:** `OpenCloseMenuEventArgs`
- **Handler Signature:** `function onClose(args) { }`
- **Use Case:** Cleanup operations, state saving

#### select
- **Trigger:** When user selects a menu item
- **Argument Type:** `MenuEventArgs`
- **Handler Signature:** `function select(args) { }`
- **Use Case:** Handle menu item actions

#### beforeItemRender
- **Trigger:** Before each menu item renders
- **Argument Type:** `MenuEventArgs`
- **Handler Signature:** `function beforeItemRender(args) { }`
- **Use Case:** Customize item appearance dynamically

#### created
- **Trigger:** After component initialization complete
- **Argument Type:** `Event`
- **Handler Signature:** `function created(args) { }`
- **Use Case:** Post-initialization setup

## Event Arguments

Event handler arguments provide context about the event and component state.

### BeforeOpenCloseMenuEventArgs

Used by `beforeOpen` and `beforeClose` events.

| Property | Type | Description |
|----------|------|-------------|
| `name` | string | Event name: "beforeOpen" or "beforeClose" |

**Example:**
```javascript
function onBeforeOpen(args) {
    console.log("Event name: " + args.name);  // "beforeOpen"
}
```

### OpenCloseMenuEventArgs

Used by `onOpen` and `onClose` events.

| Property | Type | Description |
|----------|------|-------------|
| `name` | string | Event name: "onOpen" or "onClose" |

**Example:**
```javascript
function onMenuOpen(args) {
    console.log("Sub-menu opened: " + args.name);  // "onOpen"
}
```

### MenuEventArgs

Used by `select` and `beforeItemRender` events.

| Property | Type | Description |
|----------|------|-------------|
| `name` | string | Event name: "select" or "beforeItemRender" |

**Example:**
```javascript
function onItemSelect(args) {
    console.log("Item selected: " + args.name);  // "select"
}
```

## Enums and Constants

### Orientation Enum

Defines menu layout direction.

```csharp
public enum Orientation
{
    Horizontal = 0,  // Row-based layout
    Vertical = 1     // Column-based layout (default)
}
```

**Usage:**
```html
<ejs-menu orientation="Horizontal"></ejs-menu>
```

### MenuEffect Enum

Defines animation effects for sub-menu transitions.

```csharp
public enum MenuEffect
{
    None = 0,      // No animation
    SlideDown = 1, // Slide down effect (default)
    ZoomIn = 2,    // Zoom in effect
    FadeIn = 3     // Fade in effect
}
```

**Usage:**
```csharp
var animationSettings = new
{
    effect = "ZoomIn"  // MenuEffect.ZoomIn enum value
};
```

### MenuOpenType (Informational)

Defines submenu open behavior options.

```
Auto - Submenu opens based on showItemOnClick setting
Click - Submenu opens only on click
Hover - Submenu opens on hover
```

**Note:** Menu component implements this via `showItemOnClick` property:
- `showItemOnClick="false"` → Hover/Auto opening
- `showItemOnClick="true"` → Click opening

## Common Property Combinations

### Horizontal Navigation Bar
```html
<ejs-menu items="menuItems"
    orientation="Horizontal"
    cssClass="navbar"
    showItemOnClick="false">
</ejs-menu>
```

### Vertical Sidebar Menu
```html
<ejs-menu items="menuItems"
    enableScrolling="true"
    enablePersistence="true"
    cssClass="sidebar">
</ejs-menu>
```

### RTL Menu (Arabic)
```html
<ejs-menu items="arabicItems"
    enableRtl="true"
    locale="ar-AE"
    animationSettings='new { effect = "FadeIn" }'>
</ejs-menu>
```

### Material Design Menu
```html
<ejs-menu items="menuItems"
    cssClass="material-menu"
    animationSettings='new { 
        effect = "SlideDown", 
        duration = 350,
        easing = "ease" 
    }'>
</ejs-menu>
```

### Responsive Mobile Menu
```html
<ejs-menu items="menuItems"
    hamburgerMode="true"
    title="Menu"
    hoverDelay="200">
</ejs-menu>
```

---

**See Also:**
- [menu-items-and-data-binding.md](menu-items-and-data-binding.md) - Data binding details
- [events-and-user-interactions.md](events-and-user-interactions.md) - Event handler patterns
- [customization-and-styling.md](customization-and-styling.md) - Animation and styling examples
