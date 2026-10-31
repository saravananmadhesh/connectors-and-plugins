# Icons in Breadcrumb Control

## Table of Contents
- [Icon Implementation](#icon-implementation)
- [Font Icons](#font-icons)
- [Image Icons](#image-icons)
- [SVG Icons](#svg-icons)
- [Icon Positioning](#icon-positioning)
- [Icon Only Display](#icon-only-display)
- [Dynamic Icon Assignment](#dynamic-icon-assignment)
- [Icon Best Practices](#icon-best-practices)

## Icon Implementation

The Breadcrumb control uses the `iconCss` property to add icons to breadcrumb items. Icons enhance visual communication and help users quickly identify different sections.

### iconCss Property Overview

Each `<e-breadcrumb-item>` supports the `iconCss` property to define one or more CSS classes for displaying icons:

```cshtml
<e-breadcrumb-item 
    text="Home" 
    url="~/"
    iconCss="e-icons e-home">
</e-breadcrumb-item>
```

### Icon Placement

By default, icons appear to the left of the item text:

```
[icon] Home > [icon] Products > [icon] Settings
```

### How Icons Are Applied

The `iconCss` value is applied as a CSS class to an `<i>` or `<span>` element inside the breadcrumb item. The actual icon rendering depends on the CSS classes and available icon fonts.

## Font Icons

Font icons use icon fonts (like Syncfusion's built-in e-icons) to display vector-based icons. They're lightweight, scalable, and easily customizable.

### Syncfusion e-icons Font Icons

Syncfusion provides a built-in icon font called `e-icons`. Include it in your stylesheet:

```html
<!-- In _Layout.cshtml head -->
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/fluent.css" />
```

The fluent.css (and other themes) include the `e-icons` font automatically.

### Common e-icons Classes

```
e-home           - Home/house icon
e-chevron-right  - Right arrow
e-settings       - Settings/gear
e-user           - User/person
e-folder         - Folder
e-document       - Document/file
e-star           - Star
e-lock           - Lock
e-unlock         - Unlock
e-download       - Download
e-upload         - Upload
e-search         - Search/magnifier
e-bell           - Notification/bell
e-cart           - Shopping cart
e-trash          - Delete/trash
```

### Basic Font Icon Example

```cshtml
<ejs-breadcrumb>
    <e-breadcrumb-items>
        <e-breadcrumb-item 
            text="Home" 
            url="~/"
            iconCss="e-icons e-home">
        </e-breadcrumb-item>
        <e-breadcrumb-item 
            text="Products" 
            url="~/products"
            iconCss="e-icons e-folder">
        </e-breadcrumb-item>
        <e-breadcrumb-item 
            text="Settings" 
            url="~/settings"
            iconCss="e-icons e-settings">
        </e-breadcrumb-item>
    </e-breadcrumb-items>
</ejs-breadcrumb>
```

**Renders:**
```
[home] Home > [folder] Products > [settings] Settings
```

### Multiple CSS Classes

Combine multiple classes for icon styling:

```cshtml
<e-breadcrumb-item 
    text="Home" 
    url="~/"
    iconCss="e-icons e-home custom-icon-color">
</e-breadcrumb-item>
```

With CSS:
```css
.custom-icon-color {
    color: blue;
    font-size: 18px;
}
```

### Finding Available Icons

Syncfusion provides an icon gallery. Search for icons or browse at:
- Syncfusion Icon Gallery (available in online documentation)
- Look for class names starting with `e-` in the e-icons font

### Font Icon Advantages

- Lightweight (single font file)
- Scalable (vector-based)
- Easily customizable with CSS
- Works offline (no HTTP requests)
- Consistent across browsers

## Image Icons

Image icons use actual image files (.png, .jpg, .gif) instead of font icons.

### Image Icon Syntax

```cshtml
<e-breadcrumb-item 
    text="Home" 
    url="~/"
    iconCss="e-image home-icon">
</e-breadcrumb-item>
```

With CSS background image:

```css
.home-icon {
    background-image: url('~/images/home.png');
    background-size: 16px 16px;
    background-repeat: no-repeat;
    width: 16px;
    height: 16px;
    display: inline-block;
}
```

### Complete Image Icon Example

```cshtml
<style>
    .icon-home {
        background-image: url('~/images/home.png');
        background-size: 16px 16px;
        width: 16px;
        height: 16px;
        display: inline-block;
        margin-right: 4px;
    }

    .icon-products {
        background-image: url('~/images/products.png');
        background-size: 16px 16px;
        width: 16px;
        height: 16px;
        display: inline-block;
        margin-right: 4px;
    }
</style>

<ejs-breadcrumb>
    <e-breadcrumb-items>
        <e-breadcrumb-item 
            text="Home" 
            url="~/"
            iconCss="e-image icon-home">
        </e-breadcrumb-item>
        <e-breadcrumb-item 
            text="Products" 
            url="~/products"
            iconCss="e-image icon-products">
        </e-breadcrumb-item>
    </e-breadcrumb-items>
</ejs-breadcrumb>
```

### Image Icon Use Cases

Use image icons when:
- Custom branding requires specific artwork
- Using department/category logos
- Need colored, complex graphics
- Font icons don't match your design

### Image Icon Disadvantages

- Larger file size than font icons
- Requires HTTP requests for each image
- Less scalable (fixed sizes)
- Harder to customize with CSS
- May not work well on high-DPI displays

## SVG Icons

SVG (Scalable Vector Graphics) icons are vector-based like font icons but more flexible and can be embedded directly in HTML.

### Inline SVG Icon Example

```cshtml
<ejs-breadcrumb>
    <e-breadcrumb-items>
        <e-breadcrumb-item 
            text="Home" 
            url="~/"
            iconCss="svg-icon">
        </e-breadcrumb-item>
    </e-breadcrumb-items>
</ejs-breadcrumb>

<style>
    .svg-icon {
        background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>');
        background-size: 16px 16px;
        background-repeat: no-repeat;
        width: 16px;
        height: 16px;
        display: inline-block;
    }
</style>
```

### External SVG File Icon

```cshtml
<style>
    .icon-settings {
        background-image: url('~/images/settings.svg');
        background-size: 16px 16px;
        width: 16px;
        height: 16px;
        display: inline-block;
    }
</style>

<e-breadcrumb-item 
    text="Settings" 
    url="~/settings"
    iconCss="e-image icon-settings">
</e-breadcrumb-item>
```

### SVG Icon Advantages

- Vector-based (scalable)
- Smaller file sizes than images
- Can be colored with CSS
- Supports animations
- Works offline
- More flexible than font icons

### SVG Icon Disadvantages

- More complex to set up than font icons
- Limited browser support for older IE versions
- Requires proper MIME type configuration

## Icon Positioning

By default, icons appear to the left of item text. The `e-icon-right` class positions icons to the right.

### Default Left Position

```cshtml
<e-breadcrumb-item 
    text="Home" 
    url="~/"
    iconCss="e-icons e-home">
</e-breadcrumb-item>
```

**Renders:** `[icon] Home`

### Right Position

```cshtml
<e-breadcrumb-item 
    text="Home" 
    url="~/"
    iconCss="e-icons e-home e-icon-right">
</e-breadcrumb-item>
```

**Renders:** `Home [icon]`

### Dynamic Icon Position with beforeItemRender

```cshtml
<ejs-breadcrumb beforeItemRender="PositionIcons">
    <e-breadcrumb-items>
        <e-breadcrumb-item 
            text="Home" 
            url="~/"
            iconCss="e-icons e-home">
        </e-breadcrumb-item>
        <e-breadcrumb-item 
            text="Settings" 
            url="~/settings"
            iconCss="e-icons e-settings">
        </e-breadcrumb-item>
    </e-breadcrumb-items>
</ejs-breadcrumb>

@functions {
    public void PositionIcons(BreadcrumbBeforeItemRenderEventArgs args)
    {
        // Position specific item icons to the right
        if (args.Item.Text == "Settings")
        {
            args.Item.IconCss = "e-icons e-settings e-icon-right";
        }
    }
}
```

### Custom Icon Position with CSS

```cshtml
<style>
    .right-icon {
        order: 1;        /* Move icon to the right */
        margin-left: 4px;
        margin-right: 0;
    }
</style>

<e-breadcrumb-item 
    text="Home" 
    url="~/"
    iconCss="e-icons e-home right-icon">
</e-breadcrumb-item>
```

### Icon Position Use Cases

**Left (Default):**
- Standard navigation patterns
- Most common and expected position
- Works for most applications

**Right:**
- Call-to-action indicators
- Notification badges
- Less common, use sparingly
- Can be confusing to users

## Icon Only Display

Show only icons without text by setting `text` to empty or combining icon styling with CSS.

### Icon-Only with Empty Text

```cshtml
<ejs-breadcrumb>
    <e-breadcrumb-items>
        <e-breadcrumb-item 
            url="~/"
            iconCss="e-icons e-home"
            id="home-icon">
        </e-breadcrumb-item>
        <e-breadcrumb-item 
            url="~/products"
            iconCss="e-icons e-folder"
            id="products-icon">
        </e-breadcrumb-item>
        <e-breadcrumb-item 
            url="~/settings"
            iconCss="e-icons e-settings"
            id="settings-icon">
        </e-breadcrumb-item>
    </e-breadcrumb-items>
</ejs-breadcrumb>
```

**Renders:** `[home] [folder] [settings]`

### Add Tooltips for Icon-Only Breadcrumbs

```cshtml
<ejs-breadcrumb beforeItemRender="AddTooltips">
    <e-breadcrumb-items>
        <e-breadcrumb-item 
            url="~/"
            iconCss="e-icons e-home">
        </e-breadcrumb-item>
        <e-breadcrumb-item 
            url="~/products"
            iconCss="e-icons e-folder">
        </e-breadcrumb-item>
    </e-breadcrumb-items>
</ejs-breadcrumb>

@functions {
    public void AddTooltips(BreadcrumbBeforeItemRenderEventArgs args)
    {
        // Add title attribute for tooltip
        if (args.Element != null)
        {
            string tooltipText = args.Item.Text ?? GetLabelForIcon(args.Item.IconCss);
            args.Element.SetAttribute("title", tooltipText);
        }
    }

    private string GetLabelForIcon(string iconCss)
    {
        return iconCss switch
        {
            var i when i.Contains("e-home") => "Home",
            var i when i.Contains("e-folder") => "Products",
            var i when i.Contains("e-settings") => "Settings",
            _ => "Navigate"
        };
    }
}
```

## Dynamic Icon Assignment

Assign icons dynamically using the `beforeItemRender` event.

### Example: Icon Based on Item Type

```cshtml
<ejs-breadcrumb beforeItemRender="AssignIcons">
    <e-breadcrumb-items>
        <e-breadcrumb-item text="Home" url="~/"></e-breadcrumb-item>
        <e-breadcrumb-item text="Products" url="~/products"></e-breadcrumb-item>
        <e-breadcrumb-item text="Users" url="~/users"></e-breadcrumb-item>
        <e-breadcrumb-item text="Settings" url="~/settings"></e-breadcrumb-item>
    </e-breadcrumb-items>
</ejs-breadcrumb>

@functions {
    public void AssignIcons(BreadcrumbBeforeItemRenderEventArgs args)
    {
        args.Item.IconCss = args.Item.Text switch
        {
            "Home" => "e-icons e-home",
            "Products" => "e-icons e-folder",
            "Users" => "e-icons e-user",
            "Settings" => "e-icons e-settings",
            _ => "e-icons e-chevron-right"
        };
    }
}
```

### Example: Conditional Icons

```cshtml
<ejs-breadcrumb beforeItemRender="SetConditionalIcons">
    <e-breadcrumb-items>
        <e-breadcrumb-item text="Home" url="~/"></e-breadcrumb-item>
        <e-breadcrumb-item text="Admin" url="~/admin"></e-breadcrumb-item>
        <e-breadcrumb-item text="Reports" url="~/reports"></e-breadcrumb-item>
    </e-breadcrumb-items>
</ejs-breadcrumb>

@functions {
    public void SetConditionalIcons(BreadcrumbBeforeItemRenderEventArgs args)
    {
        // Add lock icon to admin section if user isn't admin
        if (args.Item.Text == "Admin" && !User.IsInRole("Admin"))
        {
            args.Item.IconCss = "e-icons e-lock";
            args.Item.Disabled = true;
        }
        else if (args.Item.Text == "Admin")
        {
            args.Item.IconCss = "e-icons e-settings";
        }
    }
}
```

## Icon Best Practices

### 1. Choose Consistent Icon Style
```cshtml
<!-- ✓ All font icons (consistent) -->
<e-breadcrumb-item text="Home" iconCss="e-icons e-home"></e-breadcrumb-item>
<e-breadcrumb-item text="Products" iconCss="e-icons e-folder"></e-breadcrumb-item>

<!-- ✗ Mixed icon types (inconsistent) -->
<e-breadcrumb-item text="Home" iconCss="e-icons e-home"></e-breadcrumb-item>
<e-breadcrumb-item text="Products" iconCss="e-image custom-folder"></e-breadcrumb-item>
```

### 2. Use Recognizable Icons
```cshtml
<!-- ✓ Standard meaning -->
<e-breadcrumb-item text="Home" iconCss="e-icons e-home"></e-breadcrumb-item>

<!-- ✗ Ambiguous or unclear -->
<e-breadcrumb-item text="Home" iconCss="e-icons e-star"></e-breadcrumb-item>
```

### 3. Don't Rely Solely on Icons
```cshtml
<!-- ✓ Icon + text (accessible) -->
<e-breadcrumb-item text="Products" iconCss="e-icons e-folder"></e-breadcrumb-item>

<!-- ✗ Icon only without alt/title (not accessible) -->
<e-breadcrumb-item iconCss="e-icons e-folder"></e-breadcrumb-item>
```

### 4. Maintain Consistent Size
```css
/* Standardize icon sizes */
.e-breadcrumb .e-icons {
    font-size: 16px;
    width: 16px;
    height: 16px;
}
```

### 5. Consider Colorblind Users
```cshtml
<!-- ✓ Icon + text conveying information -->
<e-breadcrumb-item text="Error" iconCss="e-icons e-error-red"></e-breadcrumb-item>

<!-- ✗ Color only without text -->
<e-breadcrumb-item iconCss="e-icons e-red-circle"></e-breadcrumb-item>
```

### 6. Test Icon Rendering
- Test in light and dark themes
- Test on various screen sizes
- Test with accessibility tools
- Verify icon font loads correctly

---

## Summary

| Icon Type | Best For | Performance | Customization |
|-----------|----------|-------------|---------------|
| **Font Icons** | Standard icons | Excellent | Good |
| **Image Icons** | Custom artwork | Good | Limited |
| **SVG Icons** | Scalable graphics | Good | Excellent |

Choose font icons for most cases, images for custom branding, and SVGs for advanced requirements.
