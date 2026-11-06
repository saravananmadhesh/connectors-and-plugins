# API Reference

## Table of Contents
- [ContextMenu Component](#contextmenu-component)
- [MenuItem Properties](#menuitem-properties)
- [MenuAnimationSettings](#menuanimationsettings)
- [Events](#events)

---

## ContextMenu Component

The `ContextMenu` component provides a graphical user interface for displaying contextual commands. It can be triggered by right-click or programmatically.

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `animationSettings` | MenuAnimationSettingsModel | { effect: 'SlideDown', duration: 400, easing: 'ease' } | Configures animation settings for submenu transitions. Includes effect (None, SlideDown, ZoomIn, FadeIn), duration in milliseconds, and easing function. |
| `cssClass` | string | null | Applies one or more CSS classes to the ContextMenu wrapper element for custom styling. Multiple classes separated by space. |
| `enableHtmlSanitizer` | boolean | true | When true, sanitizes untrusted HTML in menu items to prevent XSS attacks. Recommended for user-generated content. |
| `enablePersistence` | boolean | false | When true, persists component state (expanded/collapsed items) between page reloads using browser storage. |
| `enableRtl` | boolean | false | Enables right-to-left rendering for RTL languages (Arabic, Hebrew, Persian, Urdu). Mirrors layout and text direction. |
| `enableScrolling` | boolean | false | When true, enables vertical scrolling for menus exceeding viewport height. Displays scrollbar for overflow content. |
| `hoverDelay` | number | 0 | Delay in milliseconds before submenu appears on hover. Default 0 opens immediately; 300-500ms recommended for precise control. |
| `itemTemplate` | string \| Function | null | Custom HTML template for menu items. Supports template syntax ${property} for dynamic content. Template string or render function. |
| `items` | MenuItemModel[] | [] | Array of menu item definitions. Each item can have text, id, iconCss, url, items (for nested), separator, and htmlAttributes. |
| `locale` | string | 'en-US' | Component locale override. Influences date/time formatting and localized strings. Format: 'en-US', 'fr-FR', 'de-DE', etc. |
| `showItemOnClick` | boolean | false | When true, submenus open only on click. When false, submenus open on hover. Useful for touch devices or precise interaction. |
| `target` | string | null | **Required** CSS selector for target element(s) where context menu is triggered. Example: '#target', '.menu-area', '#table tbody tr' |

### Events

| Event | Argument Type | Description | Reference |
|-------|---------------|-------------|---------  |
| `beforeClose` | BeforeOpenCloseMenuEventArgs | Triggered BEFORE menu closes. Set `cancel: true` to prevent closing. | [beforeClose](event-handling.md#beforeclose-event) |
| `beforeItemRender` | MenuEventArgs | Triggered while rendering each menu item. Access item element via `args.element`. Useful for dynamic customization. | [beforeItemRender](templates-customization.md#beforeitemrender-event), [templates-customization.md](templates-customization.md) |
| `beforeOpen` | BeforeOpenCloseMenuEventArgs | Triggered BEFORE menu/submenu opens. Set `cancel: true` to prevent opening. | [beforeOpen](event-handling.md#beforeopen-event) |
| `created` | Event | Triggered once after component initialization completes. Component is fully ready for interaction. | [created](event-handling.md#created-event) |
| `onClose` | OpenCloseMenuEventArgs | Triggered AFTER menu closes. Use for cleanup operations. | [onClose](event-handling.md#onclose-event) |
| `onOpen` | OpenCloseMenuEventArgs | Triggered AFTER menu/submenu successfully opens. Use for post-open operations like focus management. | [onOpen](event-handling.md#onopen-event) |
| `select` | MenuEventArgs | Triggered when user clicks/selects a menu item. Use to handle menu item actions and commands. | [select](event-handling.md#select-event) |

### TagHelper Syntax

```html
<ejs-contextmenu id="contextmenu"
                 target="#target"
                 items="Model.MenuItems"
                 enableScrolling="true"
                 hoverDelay="300"
                 showItemOnClick="false"
                 enableRtl="false"
                 enablePersistence="false"
                 cssClass="custom-context-menu"
                 beforeOpen="onBeforeOpen"
                 onOpen="onMenuOpen"
                 select="onMenuSelect"
                 beforeClose="onBeforeClose"
                 onClose="onMenuClose"
                 beforeItemRender="onBeforeItemRender"
                 created="onCreated"
                 animationSettings="@new Syncfusion.EJ2.Navigations.ContextMenuAnimationSettings() { Effect = Syncfusion.EJ2.Navigations.MenuEffect.FadeIn, Duration = 200 }">
</ejs-contextmenu>
```

**Important Notes:**
- Menu items are bound using the `items` property: `items="Model.MenuItems"` or `items="ViewBag.items"`
- Animation settings use C# object initialization syntax
- There are NO child TagHelper elements like `<e-menu-items>`, `<e-menu-item>`, or `<e-animation-settings>`
- See [menu-items-and-data-binding.md](references/menu-items-and-data-binding.md#proper-data-binding-approaches) for data binding examples---

## MenuItem Properties

Menu items are individual entries displayed within the ContextMenu. Each item is defined as a `MenuItemModel` object.

### Properties

| Property | Type | Default | Description | Reference |
|----------|------|---------|-------------|-----------|
| `htmlAttributes` | Record | {} | Custom HTML attributes to apply to the menu item element. Example: { 'data-id': '123', 'title': 'Description' } | [menu-items-and-data-binding.md](menu-items-and-data-binding.md) |
| `iconCss` | string | null | CSS class(es) for icon display. Use Syncfusion e-icons ("e-icons e-cut") or third-party libraries (Font Awesome, Bootstrap Icons). | [icons-navigation-customization.md](icons-navigation-customization.md#using-syncfusion-e-icons) |
| `id` | string | '' | Unique identifier for the menu item. Useful for identifying selected items in events. Case-sensitive, must be unique within menu. | [menu-items-and-data-binding.md](menu-items-and-data-binding.md#menuitem-structure) |
| `items` | MenuItemModel[] | [] | Array of submenu items for nested menus. Enables multi-level hierarchy. Each nested item follows same MenuItemModel structure. | [menu-items-and-data-binding.md](menu-items-and-data-binding.md#multi-level-nested-items) |
| `separator` | boolean | false | When true, renders a horizontal separator line instead of a menu item. ONLY this property should be set when separator is true. | [menu-items-and-data-binding.md](menu-items-and-data-binding.md#separator-usage) |
| `text` | string | '' | Text displayed for the menu item. May contain special characters but should be concise. Truncated if too long. | [menu-items-and-data-binding.md](menu-items-and-data-binding.md#menuitem-structure) |
| `url` | string | null | Navigation URL for the menu item. When clicked, navigates to this URL. Supports relative, absolute, and hash routes. Use htmlAttributes for target="_blank". | [icons-navigation-customization.md](icons-navigation-customization.md#navigation-links-in-menu-items) |

### Data Binding Patterns

**Object Literal (Recommended):**
```csharp
new { text = "Cut", id = "cut", iconCss = "e-icons e-cut" }
```

**Dynamic Array:**
```csharp
List<object> items = new() {
    new { text = "Item 1", id = "it1" },
    new { text = "Item 2", id = "it2" }
};
```

**Nested Items:**
```csharp
new { 
    text = "Parent",
    items = new dynamic[] {
        new { text = "Child 1", id = "ch1" },
        new { text = "Child 2", id = "ch2" }
    }
}
```

**Separator:**
```csharp
new { separator = true }  // Only separator property
```

---

## MenuAnimationSettings

Configures how submenus are animated when opened.

### Properties

| Property | Type | Default | Description | Reference |
|----------|------|---------|-------------|-----------|
| `duration` | number | 400 | Animation duration in milliseconds. Range: 0-5000. Lower values = faster, higher values = smoother. Typical: 200-500ms. | [animation-scrolling.md](animation-scrolling.md#duration-and-easing) |
| `easing` | string | 'ease' | CSS easing function controlling acceleration/deceleration. Options: 'linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out', or cubic-bezier values. | [animation-scrolling.md](animation-scrolling.md#duration-and-easing) |
| `effect` | MenuEffect | 'SlideDown' | Animation transition effect. Options: 'None' (instant), 'SlideDown', 'ZoomIn', 'FadeIn'. | [animation-scrolling.md](animation-scrolling.md#animation-effects) |

### TagHelper Syntax

```html
<ejs-contextmenu id="contextmenu" 
                 target="#target"
                 items="Model.MenuItems"
                 animationSettings="@new Syncfusion.EJ2.Navigations.ContextMenuAnimationSettings() { Effect = Syncfusion.EJ2.Navigations.MenuEffect.FadeIn, Duration = 300 }">
</ejs-contextmenu>
```

### Supported MenuEffect Values

- **'None'** - Instant appearance without animation
- **'SlideDown'** - Submenu slides down from top
- **'ZoomIn'** - Submenu scales in from center
- **'FadeIn'** - Submenu fades in gradually

---

## Events

### Event Arguments

**MenuEventArgs** (for select and beforeItemRender events):
- `name` (string): Event name ("select", "beforeItemRender")
- `element` (HTMLElement): The rendered item element

**BeforeOpenCloseMenuEventArgs** (for beforeOpen and beforeClose events):
- `name` (string): Event name ("beforeOpen", "beforeClose")
- `element` (HTMLElement): The menu element
- `cancel` (boolean): Set to true to cancel the action

**OpenCloseMenuEventArgs** (for onOpen and onClose events):
- `name` (string): Event name ("onOpen", "onClose")
- `element` (HTMLElement): The menu element

**Event** (for created event):
- Standard JavaScript event object

### Event Lifecycle

```
1. created          → Component initialized
2. beforeOpen       → Before menu displays  (can cancel)
3. onOpen           → After menu displays
4. beforeItemRender → When rendering each item (can customize)
5. select           → When item is clicked
6. beforeClose      → Before menu hides    (can cancel)
7. onClose          → After menu hides
```

See [event-handling.md](event-handling.md) for complete event documentation and examples.

---

## Complete Implementation Example

```html
@page
@model IndexModel

<div id="target">Right-click me</div>

<ejs-contextmenu id="contextmenu"
                 target="#target"
                 items="Model.MenuItems"
                 enableScrolling="true"
                 hoverDelay="300"
                 enableRtl="false"
                 showItemOnClick="false"
                 beforeOpen="onBeforeOpen"
                 onOpen="onMenuOpen"
                 select="onMenuSelect"
                 onClose="onMenuClose">
                 animationSettings="@new Syncfusion.EJ2.Navigations.ContextMenuAnimationSettings() { Effect = Syncfusion.EJ2.Navigations.MenuEffect.FadeIn, Duration = 300 }">
</ejs-contextmenu>

<script>
function onBeforeOpen(args) {
    console.log('Menu about to open');
}

function onMenuOpen(args) {
    console.log('Menu opened:', args.element);
    var firstItem = args.element.querySelector('.e-menu-item');
    if (firstItem) firstItem.focus();
}

function onMenuSelect(args) {
    var selectedElement = event.target.closest('.e-menu-item');
    var itemText = selectedElement.textContent.trim();
    console.log('Selected:', itemText);
}

function onMenuClose(args) {
    console.log('Menu closed');
}
</script>

<style>
#target {
    border: 2px solid #007bff;
    padding: 20px;
    border-radius: 4px;
    cursor: context-menu;
}
</style>
```

```csharp
// IndexModel.cs
public class IndexModel : PageModel
{
    public List<object> MenuItems { get; set; }
    
    public void OnGet()
    {
        MenuItems = new List<object>
        {
            new { text = "Cut", id = "cut", iconCss = "e-icons e-cut" },
            new { text = "Copy", id = "copy", iconCss = "e-icons e-copy" },
            new { text = "Paste", id = "paste", iconCss = "e-icons e-paste" },
            new { separator = true },
            new { text = "Delete", id = "delete", iconCss = "e-icons e-delete" }
        };
    }
}
```

---

## Notes

- All property names are **case-sensitive**
- Event names in TagHelper use **camelCase** (e.g., `beforeOpen` not `before-open`)
- The `target` property is **required** and must point to existing DOM element(s)
- **Data Binding:** Use the `items` property to bind menu data (e.g., `items="Model.MenuItems"` or `items="ViewBag.items"`)
- **Animation Settings:** Configure via C# object: `animationSettings="@new Syncfusion.EJ2.Navigations.ContextMenuAnimationSettings() { Effect = MenuEffect.FadeIn, Duration = 300 }"`
- **NO Child TagHelper Elements:** There are no `<e-menu-items>`, `<e-menu-item>`, or `<e-animation-settings>` child elements
- **MenuItem.separator:** When `separator: true`, only this property should be set (no text, id, or other properties)
- For best performance, avoid using too many custom animations on menus with 100+ items
- Use `enableHtmlSanitizer: true` when menu content comes from untrusted sources
- Nested menu depth should not exceed 3-4 levels for optimal UX

