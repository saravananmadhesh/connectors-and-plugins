# Complete API Reference

## Table of Contents
- [Breadcrumb Properties](#breadcrumb-properties)
- [BreadcrumbItem Properties](#breadcrumbitem-properties)
- [Events and Event Arguments](#events-and-event-arguments)
- [Overflow Modes Enumeration](#overflow-modes-enumeration)
- [API Usage Examples](#api-usage-examples)

## Breadcrumb Properties

The Breadcrumb component includes the following configurable properties:

### activeItem
**Type:** `string`  
**Default:** `null`  
**Description:** Specifies the URL of the active breadcrumb item, marking it as the currently selected/active item.

**Usage:**
```cshtml
<ejs-breadcrumb activeItem="~/products/electronics">
    <e-breadcrumb-items>
        <e-breadcrumb-item text="Home" url="~/"></e-breadcrumb-item>
        <e-breadcrumb-item text="Products" url="~/products"></e-breadcrumb-item>
        <e-breadcrumb-item text="Electronics" url="~/products/electronics"></e-breadcrumb-item>
    </e-breadcrumb-items>
</ejs-breadcrumb>
```

### cssClass
**Type:** `string`  
**Default:** `''` (empty string)  
**Description:** Defines one or more CSS classes (space-separated) to apply to the breadcrumb container element, enabling custom styling and theming.

**Usage:**
```cshtml
<ejs-breadcrumb cssClass="custom-theme elevated-style">
    <!-- Items -->
</ejs-breadcrumb>
```

**Related:** See [CSS Class Application](./customization.md#css-class-application)

### disabled
**Type:** `boolean`  
**Default:** `false`  
**Description:** Disables the entire breadcrumb component when set to true, making it non-interactive and grayed out.

**Usage:**
```cshtml
<ejs-breadcrumb disabled="true">
    <!-- Items appear grayed out and non-clickable -->
</ejs-breadcrumb>
```

**Related:** See [Disabled State](./customization.md#disabled-state)

### enableActiveItemNavigation
**Type:** `boolean`  
**Default:** `false`  
**Description:** When true, the last breadcrumb item (typically the current/active page) becomes clickable and navigable. By default, only parent items are navigable.

**Usage:**
```cshtml
<!-- Default: Last item not clickable -->
<ejs-breadcrumb enableActiveItemNavigation="false">
    <e-breadcrumb-items>
        <e-breadcrumb-item text="Home" url="~/"></e-breadcrumb-item>
        <e-breadcrumb-item text="Current" url="~/current"></e-breadcrumb-item>
    </e-breadcrumb-items>
</ejs-breadcrumb>

<!-- With enableActiveItemNavigation: Last item clickable -->
<ejs-breadcrumb enableActiveItemNavigation="true">
    <e-breadcrumb-items>
        <e-breadcrumb-item text="Home" url="~/"></e-breadcrumb-item>
        <e-breadcrumb-item text="Current" url="~/current"></e-breadcrumb-item>
    </e-breadcrumb-items>
</ejs-breadcrumb>
```

**Related:** See [Enabling Active Item Navigation](./navigation.md#enabling-active-item-navigation)

### enableNavigation
**Type:** `boolean`  
**Default:** `true`  
**Description:** Controls whether breadcrumb items are navigable. When false, no items are clickable even if they have URLs. When true, items with URLs are clickable (unless disabled).

**Usage:**
```cshtml
<!-- Navigation enabled (items with URLs are clickable) -->
<ejs-breadcrumb enableNavigation="true">
    <!-- Items clickable -->
</ejs-breadcrumb>

<!-- Navigation disabled (all items non-clickable) -->
<ejs-breadcrumb enableNavigation="false">
    <!-- Breadcrumb displays path but isn't interactive -->
</ejs-breadcrumb>
```

**Related:** See [Navigation Control](./navigation.md#navigation-control)

### enablePersistence
**Type:** `boolean`  
**Default:** `false`  
**Description:** When true, the breadcrumb component's state is persisted to browser localStorage, allowing it to survive page reloads.

**Usage:**
```cshtml
<ejs-breadcrumb enablePersistence="true">
    <!-- State is saved and restored across page reloads -->
</ejs-breadcrumb>
```

**Related:** See [Component State Persistence](./customization.md#component-state-persistence)

### enableRtl
**Type:** `boolean`  
**Default:** `false`  
**Description:** Enables right-to-left (RTL) rendering, reversing the text direction and layout to support RTL languages like Arabic, Hebrew, and Farsi.

**Usage:**
```cshtml
<ejs-breadcrumb enableRtl="true">
    <e-breadcrumb-items>
        <e-breadcrumb-item text="الرئيسية" url="~/"></e-breadcrumb-item>
        <e-breadcrumb-item text="المنتجات" url="~/products"></e-breadcrumb-item>
    </e-breadcrumb-items>
</ejs-breadcrumb>
```

**Related:** See [RTL Support](./customization.md#rtl-support)

### itemTemplate
**Type:** `string` | `Function`  
**Default:** `null`  
**Description:** Customizes the rendering of each breadcrumb item using a template string or function. Allows creating rich, custom HTML layouts for items.

**Template Variables:**
- `${text}` - Item display text
- `${url}` - Item URL
- `${disabled}` - Item disabled state
- `${iconCss}` - Item icon CSS classes
- `${id}` - Item unique identifier

**Usage:**
```cshtml
<ejs-breadcrumb itemTemplate="#chipTemplate">
    <!-- Each item renders with custom template -->
</ejs-breadcrumb>
<script id="chipTemplate" type="text/x-template">
    <div class="e-lib e-chip-list e-control e-chip-set">
        <div class="e-chip" tabindex="0" role="option" aria-label="Apple" aria-selected="false">
            <span class="e-chip-text">${text}</span>
        </div>
    </div>
</script>
```

**Related:** See [Item Template Implementation](./templates.md#item-template-implementation)

### items
**Type:** `BreadcrumbItemModel[]`  
**Default:** `[]` (empty array)  
**Description:** Array of breadcrumb items to display. Each item is a BreadcrumbItemModel with text, URL, and optional properties.

**Usage:**
```cshtml
<ejs-breadcrumb>
    <e-breadcrumb-items>
        <e-breadcrumb-item text="Home" url="~/"></e-breadcrumb-item>
        <e-breadcrumb-item text="Products" url="~/products"></e-breadcrumb-item>
        <e-breadcrumb-item text="Current"></e-breadcrumb-item>
    </e-breadcrumb-items>
</ejs-breadcrumb>
```

**Related:** See [BreadcrumbItem Properties](#breadcrumbitem-properties)

### maxItems
**Type:** `number`  
**Default:** `null` (no limit)  
**Description:** Specifies the maximum number of breadcrumb items to display before overflow occurs. Used in conjunction with `overflowMode` to handle long breadcrumb trails.

**Usage:**
```cshtml
<ejs-breadcrumb maxItems="3" overflowMode="Collapsed">
    <!-- Only 3 items visible; rest hidden/collapsed -->
</ejs-breadcrumb>
```

**Related:** See [Overflow Behavior Overview](./overflow-modes.md#overflow-behavior-overview)

### overflowMode
**Type:** `string` | `BreadcrumbOverflowMode`  
**Default:** `"Default"` (hidden with expand icon)  
**Valid Values:** `Collapsed`, `Hidden`, `Menu`, `Wrap`, `Scroll`, `None`  
**Description:** Specifies how to display breadcrumb items when they exceed `maxItems`. Determines the overflow behavior and user interaction model.

**Usage:**
```cshtml
<!-- Show first & last, hide others (Collapsed) -->
<ejs-breadcrumb overflowMode="Collapsed" maxItems="3">
    <!-- Renders: Home [icon] Current -->
</ejs-breadcrumb>

<!-- Progressive reveal (Hidden) -->
<ejs-breadcrumb overflowMode="Hidden" maxItems="2">
    <!-- Click items to reveal hidden ones -->
</ejs-breadcrumb>

<!-- Dropdown menu (Menu) -->
<ejs-breadcrumb overflowMode="Menu" maxItems="3">
    <!-- Shows 3 items + dropdown for rest -->
</ejs-breadcrumb>

<!-- Wrap to multiple lines (Wrap) -->
<ejs-breadcrumb overflowMode="Wrap">
    <!-- Items wrap to next line when needed -->
</ejs-breadcrumb>

<!-- Horizontal scroll (Scroll) -->
<ejs-breadcrumb overflowMode="Scroll" maxItems="10">
    <!-- Scrollbar appears when needed -->
</ejs-breadcrumb>

<!-- All on single line (None) -->
<ejs-breadcrumb overflowMode="None">
    <!-- All items on one line -->
</ejs-breadcrumb>
```

**Related:** See [Overflow Modes Overview](./overflow-modes.md)

### separatorTemplate
**Type:** `string` | `Function`  
**Default:** `null` (uses default `/` separator)  
**Description:** Customizes the separator HTML between breadcrumb items. Allows replacing the default forward slash with custom icons, symbols, or styled separators.

**Usage:**
```cshtml
<!-- Custom arrow separator -->
<ejs-breadcrumb separatorTemplate="<span class='sep'>&gt;</span>">
    <!-- Renders: Home > Products > Current -->
</ejs-breadcrumb>

<!-- Icon separator -->
<ejs-breadcrumb separatorTemplate="<i class='e-icons e-chevron-right'></i>">
    <!-- Renders: Home → Products → Current -->
</ejs-breadcrumb>
```

**Related:** See [Separator Template Implementation](./templates.md#separator-template-implementation)

### url
**Type:** `string`  
**Default:** `null`  
**Description:** Provides a URL path for the breadcrumb to automatically generate items by parsing the path. If no items are explicitly defined, the breadcrumb uses this URL to create items.

**Usage:**
```cshtml
<!-- Auto-generate from static URL -->
<ejs-breadcrumb url="/shop/electronics/laptops">
    <!-- Generates: shop > electronics > laptops -->
</ejs-breadcrumb>

<!-- Auto-generate from current URL -->
<ejs-breadcrumb url="@Context.Request.Path">
    <!-- Uses current page URL to generate items -->
</ejs-breadcrumb>
```

**Related:** See [URL-Based Generation](./data-binding.md#static-url-based-generation)

---

## BreadcrumbItem Properties

Each breadcrumb item is configured using the following properties:

### disabled
**Type:** `boolean`  
**Default:** `false`  
**Description:** Disables an individual breadcrumb item, making it non-clickable and grayed out.

**Usage:**
```cshtml
<e-breadcrumb-item 
    text="Restricted" 
    url="~/restricted"
    disabled="true">
</e-breadcrumb-item>
```

### iconCss
**Type:** `string`  
**Default:** `null`  
**Description:** Defines CSS classes for displaying an icon within the breadcrumb item. Multiple classes can be space-separated.

**Usage:**
```cshtml
<e-breadcrumb-item 
    text="Home" 
    url="~/"
    iconCss="e-icons e-home">
</e-breadcrumb-item>

<e-breadcrumb-item 
    text="Settings" 
    url="~/settings"
    iconCss="e-icons e-settings e-icon-right">
</e-breadcrumb-item>
```

**Related:** See [Icon Implementation](./icons.md)

### id
**Type:** `string`  
**Default:** `''` (empty string)  
**Description:** Specifies a unique identifier for the breadcrumb item, useful for targeting in CSS or referencing in event handlers.

**Usage:**
```cshtml
<e-breadcrumb-item 
    text="Home" 
    url="~/"
    id="home-item">
</e-breadcrumb-item>

<e-breadcrumb-item 
    text="Products" 
    url="~/products"
    id="products-item">
</e-breadcrumb-item>
```

### text
**Type:** `string`  
**Default:** `''` (empty string)  
**Description:** The display text shown for the breadcrumb item. This is what users see and interact with.

**Usage:**
```cshtml
<e-breadcrumb-item text="Home"></e-breadcrumb-item>
<e-breadcrumb-item text="Products"></e-breadcrumb-item>
<e-breadcrumb-item text="Current Page"></e-breadcrumb-item>
```

### url
**Type:** `string`  
**Default:** `''` (empty string)  
**Description:** The URL to navigate to when the item is clicked. If empty, the item is not clickable (appears as plain text).

**Usage:**
```cshtml
<!-- Clickable item with URL -->
<e-breadcrumb-item 
    text="Products" 
    url="~/products">
</e-breadcrumb-item>

<!-- Non-clickable item (current page) -->
<e-breadcrumb-item text="Current Page"></e-breadcrumb-item>

<!-- Relative URL -->
<e-breadcrumb-item 
    text="Home" 
    url="~/home">
</e-breadcrumb-item>

<!-- Absolute URL -->
<e-breadcrumb-item 
    text="External" 
    url="https://example.com">
</e-breadcrumb-item>
```

**Related:** See [Navigation and URLs](./navigation.md)

---

## Events and Event Arguments

### beforeItemRender
**Type:** Event  
**Arguments:** `BreadcrumbBeforeItemRenderEventArgs`  
**Description:** Fires before each breadcrumb item is rendered, allowing customization of item properties and DOM manipulation.

**Event Arguments:**

| Property | Type | Description |
|----------|------|-------------|
| `args.Item` | `BreadcrumbItemModel` | The item being rendered; modify to customize |
| `args.Element` | `HTMLElement` | The DOM element for the item |
| `args.Cancel` | `boolean` | Set to true to prevent rendering this item |
| `args.Name` | `string` | Event name ("beforeItemRender") |

**Usage:**
```cshtml
<ejs-breadcrumb beforeItemRender="OnBeforeItemRender">
    <e-breadcrumb-items>
        <e-breadcrumb-item text="Home" url="~/"></e-breadcrumb-item>
        <e-breadcrumb-item text="Products" url="~/products"></e-breadcrumb-item>
    </e-breadcrumb-items>
</ejs-breadcrumb>

@functions {
    public void OnBeforeItemRender(BreadcrumbBeforeItemRenderEventArgs args)
    {
        // Customize item text
        if (args.Item.Text == "Products")
        {
            args.Item.Text = "All Products";
        }

        // Add icons
        args.Item.IconCss = "e-icons e-folder";

        // Add CSS classes
        args.Element?.ClassList.Add("custom-item");

        // Skip rendering specific items
        if (args.Item.Text == "Hidden")
        {
            args.Cancel = true;
        }
    }
}
```

**Related:** See [beforeItemRender Event](./customization.md#beforeitemrender-event)

### created
**Type:** Event  
**Arguments:** `Event`  
**Description:** Fires after the breadcrumb component is fully initialized and rendered on the page.

**Usage:**
```cshtml
<ejs-breadcrumb created="OnComponentCreated">
    <!-- Items -->
</ejs-breadcrumb>

@functions {
    public void OnComponentCreated(Event args)
    {
        // Component fully loaded
        Console.WriteLine("Breadcrumb component created");
    }
}
```

### itemClick
**Type:** Event  
**Arguments:** `BreadcrumbClickEventArgs`  
**Description:** Fires when a user clicks on a breadcrumb item, providing access to the clicked item and event details.

**Event Arguments:**

| Property | Type | Description |
|----------|------|-------------|
| `args.Item` | `BreadcrumbItemModel` | The clicked item |
| `args.Element` | `HTMLElement` | The clicked DOM element |
| `args.Event` | `Event` | The native JavaScript click event |
| `args.Cancel` | `boolean` | Set to true to prevent default navigation |
| `args.Name` | `string` | Event name ("itemClick") |

**Usage:**
```cshtml
<ejs-breadcrumb itemClick="OnItemClick">
    <e-breadcrumb-items>
        <e-breadcrumb-item text="Home" url="~/"></e-breadcrumb-item>
        <e-breadcrumb-item text="Products" url="~/products"></e-breadcrumb-item>
        <e-breadcrumb-item text="External" url="https://external.com"></e-breadcrumb-item>
    </e-breadcrumb-items>
</ejs-breadcrumb>

@functions {
    public void OnItemClick(BreadcrumbClickEventArgs args)
    {
        var clickedItem = args.Item.Text;
        Console.WriteLine($"Clicked: {clickedItem}");

        // Prevent navigation for external links
        if (args.Item.Url?.StartsWith("https://external.com") == true)
        {
            args.Cancel = true;
            // Handle external link differently (open in new tab, etc.)
        }
    }
}
```

**Related:** See [Item Click Events](./navigation.md#item-click-events)

---

## Overflow Modes Enumeration

The `overflowMode` property accepts the following enumeration values:

### BreadcrumbOverflowMode

```csharp
public enum BreadcrumbOverflowMode
{
    /// <summary>
    /// Shows the first and last items; hides rest behind a collapsible icon.
    /// Click icon to expand and show all items.
    /// </summary>
    Collapsed = 0,

    /// <summary>
    /// Shows maximum items that fit; hidden items revealed when clicking previous items.
    /// Provides progressive disclosure of breadcrumb path.
    /// </summary>
    Hidden = 1,

    /// <summary>
    /// Shows items that fit; excess items in a dropdown submenu.
    /// Users access hidden items through dropdown menu.
    /// </summary>
    Menu = 2,

    /// <summary>
    /// Shows all items on single line; wraps to multiple lines when needed.
    /// Every item always visible (responsive).
    /// </summary>
    Wrap = 3,

    /// <summary>
    /// Shows all items on single line with horizontal scrollbar.
    /// Users scroll to see all items.
    /// </summary>
    Scroll = 4,

    /// <summary>
    /// Shows all items on single line without truncation or scrollbar.
    /// Items may overflow container.
    /// </summary>
    None = 5
}
```

**Usage in Code:**
```cshtml
<!-- String-based -->
<ejs-breadcrumb overflowMode="Collapsed" maxItems="3"></ejs-breadcrumb>

<!-- Enum-based (in C#) -->
@{
    var mode = BreadcrumbOverflowMode.Collapsed;
    var maxItems = 3;
}
<ejs-breadcrumb overflowMode="@mode.ToString()" maxItems="@maxItems"></ejs-breadcrumb>
```

**Related:** See [Overflow Modes Reference](./overflow-modes.md)

---

## API Usage Examples

### Example 1: Complete Configuration

```cshtml
<ejs-breadcrumb
    activeItem="~/current"
    cssClass="theme-primary elevated"
    disabled="false"
    enableActiveItemNavigation="false"
    enableNavigation="true"
    enablePersistence="true"
    enableRtl="false"
    itemTemplate="<div class='item-template'>${text}</div>"
    maxItems="5"
    overflowMode="Collapsed"
    separatorTemplate="<span class='sep'>›</span>"
    beforeItemRender="CustomizeItems"
    itemClick="HandleItemClick">
    
    <e-breadcrumb-items>
        <e-breadcrumb-item 
            text="Dashboard" 
            url="~/dashboard"
            iconCss="e-icons e-dashboard"
            id="dashboard">
        </e-breadcrumb-item>
        <e-breadcrumb-item 
            text="Reports" 
            url="~/reports"
            iconCss="e-icons e-chart"
            id="reports">
        </e-breadcrumb-item>
        <e-breadcrumb-item 
            text="Analytics" 
            url="~/analytics"
            iconCss="e-icons e-analytics"
            id="analytics">
        </e-breadcrumb-item>
        <e-breadcrumb-item 
            text="Current" 
            id="current">
        </e-breadcrumb-item>
    </e-breadcrumb-items>
</ejs-breadcrumb>
```

### Example 2: Dynamic Configuration

```csharp
// In PageModel
public string BreadcrumbCssClass { get; set; }
public bool IsRtlEnabled { get; set; }
public List<BreadcrumbItemModel> BreadcrumbItems { get; set; }

public void OnGet()
{
    // Determine configuration based on user/context
    IsRtlEnabled = CultureInfo.CurrentCulture.TextInfo.IsRightToLeft;
    BreadcrumbCssClass = User.IsInRole("Admin") ? "admin-breadcrumb" : "user-breadcrumb";
    
    BreadcrumbItems = new List<BreadcrumbItemModel>
    {
        new BreadcrumbItemModel { Text = "Home", Url = "~/", IconCss = "e-icons e-home" },
        new BreadcrumbItemModel { Text = "Dashboard", Url = "~/dashboard" },
        new BreadcrumbItemModel { Text = "Current" }
    };
}
```

```cshtml
<ejs-breadcrumb
    enableRtl="@Model.IsRtlEnabled"
    cssClass="@Model.BreadcrumbCssClass">
    <e-breadcrumb-items>
        @foreach (var item in Model.BreadcrumbItems)
        {
            <e-breadcrumb-item
                text="@item.Text"
                url="@item.Url"
                iconCss="@item.IconCss">
            </e-breadcrumb-item>
        }
    </e-breadcrumb-items>
</ejs-breadcrumb>
```

---

## API Conventions

### Property Naming
- ASP.NET Core TagHelper: `enableNavigation` (camelCase in CSHTML)
- C# Properties: `EnableNavigation` (PascalCase in C#)

### Boolean Properties
```cshtml
<!-- These are equivalent -->
<ejs-breadcrumb disabled="true"></ejs-breadcrumb>
<ejs-breadcrumb disabled="false"></ejs-breadcrumb>
<ejs-breadcrumb disabled></ejs-breadcrumb>  <!-- Implicitly true -->
```

### Binding Model Properties
```cshtml
<ejs-breadcrumb disabled="@Model.IsDisabled" cssClass="@Model.Theme">
    <!-- Use @ to bind C# properties -->
</ejs-breadcrumb>
```

---

## Summary

The Breadcrumb API provides comprehensive control over:
- **Display:** `items`, `url`, `overflowMode`, `maxItems`
- **Interactivity:** `enableNavigation`, `enableActiveItemNavigation`
- **Customization:** `itemTemplate`, `separatorTemplate`, `cssClass`
- **Behavior:** `activeItem`, `disabled`, `enablePersistence`, `enableRtl`
- **Events:** `beforeItemRender`, `itemClick`, `created`

Combine these properties and events to create fully customized breadcrumb experiences.
