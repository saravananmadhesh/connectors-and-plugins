# Data Binding in Breadcrumb Control

## Table of Contents
- [Items as Tag Directive](#items-as-tag-directive)
- [Current URL-Based Generation](#current-url-based-generation)
- [Static URL-Based Generation](#static-url-based-generation)
- [Customize Generated Items](#customize-generated-items)
- [BreadcrumbItem Properties](#breadcrumbitem-properties)
- [Data Binding Patterns](#data-binding-patterns)

## Items as Tag Directive

The Breadcrumb component uses `<e-breadcrumb-items>` and `<e-breadcrumb-item>` tag directives to render items. This is the most common and explicit way to define breadcrumb items.

### Basic Tag Directive Syntax

```cshtml
<ejs-breadcrumb>
    <e-breadcrumb-items>
        <e-breadcrumb-item text="Home" url="~/"></e-breadcrumb-item>
        <e-breadcrumb-item text="Products" url="~/products"></e-breadcrumb-item>
        <e-breadcrumb-item text="Laptops" url="~/products/laptops"></e-breadcrumb-item>
        <e-breadcrumb-item text="Gaming Laptop"></e-breadcrumb-item>
    </e-breadcrumb-items>
</ejs-breadcrumb>
```

**Output:**
```
Home > Products > Laptops > Gaming Laptop
```

### Item Property Bindings

Each `<e-breadcrumb-item>` supports binding to model properties:

```cshtml
@model BreadcrumbItemModel

<ejs-breadcrumb>
    <e-breadcrumb-items>
        <e-breadcrumb-item 
            text="@Model.ItemText" 
            url="@Model.ItemUrl"
            disabled="@Model.IsDisabled"
            iconCss="@Model.IconClass"
            id="@Model.ItemId">
        </e-breadcrumb-item>
    </e-breadcrumb-items>
</ejs-breadcrumb>
```

### Iterating Through Items

Bind multiple items from a collection:

```cshtml
@model List<BreadcrumbItemModel>

<ejs-breadcrumb>
    <e-breadcrumb-items>
        @foreach (var item in Model)
        {
            <e-breadcrumb-item 
                text="@item.Text" 
                url="@item.Url"
                disabled="@item.Disabled"
                iconCss="@item.IconCss">
            </e-breadcrumb-item>
        }
    </e-breadcrumb-items>
</ejs-breadcrumb>
```

**Model Example:**
```csharp
public class BreadcrumbItemModel
{
    public string Text { get; set; }
    public string Url { get; set; }
    public bool Disabled { get; set; }
    public string IconCss { get; set; }
}
```

**Usage:**
```csharp
@page
@model YourPageModel

public void OnGet()
{
    Model = new List<BreadcrumbItemModel>
    {
        new BreadcrumbItemModel { Text = "Home", Url = "~/" },
        new BreadcrumbItemModel { Text = "Products", Url = "~/products" },
        new BreadcrumbItemModel { Text = "Current" }
    };
}
```

## Current URL-Based Generation

The Breadcrumb component can automatically generate items from the current page's URL without explicitly defining `<e-breadcrumb-item>` tags. This is useful for automatic breadcrumb generation.

### How URL Generation Works

When no items are explicitly defined, the Breadcrumb generates items by:
1. Taking the current page URL (e.g., `/products/electronics/laptops`)
2. Splitting it by path separators (`/`)
3. Creating breadcrumb items for each path segment

### Example: Current URL Automatic Generation

```cshtml
<ejs-breadcrumb></ejs-breadcrumb>
```

If the current page URL is:
```
https://example.com/products/electronics/laptops
```

The breadcrumb automatically generates:
```
products > electronics > laptops
```

### Issues with Current URL Generation

- **No human-readable labels** - Path segments become item text (e.g., "electronics" instead of "Electronics Electronics")
- **No custom URLs** - Generated items reuse path segments
- **Limited customization** - Can't easily add icons or disable items
- **Not suitable for all scenarios** - Works best for URL-structured hierarchies

### Customizing Current URL Items

Use the `beforeItemRender` event to customize auto-generated items:

```cshtml
<ejs-breadcrumb beforeItemRender="OnBeforeItemRender"></ejs-breadcrumb>

@functions {
    public void OnBeforeItemRender(BreadcrumbBeforeItemRenderEventArgs args)
    {
        // Customize the item before rendering
        if (args.Item.Text == "electronics")
        {
            args.Item.Text = "Electronics"; // Better label
        }
    }
}
```

**Event Arguments:**
- `args.Item` - The BreadcrumbItemModel being rendered
- `args.Element` - The HTML element for the item
- `args.Cancel` - Set to true to prevent rendering
- `args.Name` - The event name ("beforeItemRender")

## Static URL-Based Generation

Instead of using the current page URL, you can specify a static URL for the Breadcrumb to parse and generate items.

### Static URL Property

Use the `url` property to provide a fixed URL path:

```cshtml
<ejs-breadcrumb url="/home/products/electronics"></ejs-breadcrumb>
```

**Generated Items:**
```
home > products > electronics
```

### Real-World Example

```cshtml
<ejs-breadcrumb url="/company/departments/engineering/projects"></ejs-breadcrumb>
```

**Renders:**
```
company > departments > engineering > projects
```

### Static URL with Different Domain

You can use URLs from different domains:

```cshtml
<ejs-breadcrumb url="https://example.com/shop/category/product"></ejs-breadcrumb>
```

**Generated Items:**
```
shop > category > product
```

### Limitations of Static URLs

- **No interactive navigation** - Generated items don't have meaningful URLs for clicking
- **Limited context** - URL segments don't contain semantic meaning
- **Requires customization** - Use `beforeItemRender` to make items useful

### When to Use Static URLs

Use static URL generation when:
- You need quick breadcrumb displays without explicit item definitions
- Your URL structure is consistent and hierarchical
- You'll customize items in `beforeItemRender` event
- Breadcrumbs are read-only (no navigation needed)

## Customize Generated Items

Use the `beforeItemRender` event to customize any generated or statically-defined items before rendering.

### beforeItemRender Event

This event fires for each breadcrumb item before it renders, allowing you to:
- Change item text (for better labels)
- Modify URLs
- Add icons
- Disable specific items
- Manipulate the DOM element

### Event Handler Syntax

```cshtml
<ejs-breadcrumb beforeItemRender="OnBeforeItemRender">
    <!-- Items defined or generated here -->
</ejs-breadcrumb>

@functions {
    public void OnBeforeItemRender(BreadcrumbBeforeItemRenderEventArgs args)
    {
        // args.Item - The BreadcrumbItemModel
        // args.Element - The HTMLElement
        // args.Cancel - Set to true to skip rendering
        // args.Name - Event name
    }
}
```

### Example: Improve Generated Item Labels

```cshtml
<ejs-breadcrumb url="/shop/Electronics/Laptops" beforeItemRender="CustomizeItem"></ejs-breadcrumb>

@functions {
    public void CustomizeItem(BreadcrumbBeforeItemRenderEventArgs args)
    {
        // Map path segments to friendly labels
        var labelMap = new Dictionary<string, string>
        {
            { "shop", "Shop Home" },
            { "Electronics", "Electronics Department" },
            { "Laptops", "Laptops & Desktops" }
        };

        if (labelMap.ContainsKey(args.Item.Text))
        {
            args.Item.Text = labelMap[args.Item.Text];
        }
    }
}
```

**Result:**
```
Shop Home > Electronics Department > Laptops & Desktops
```

### Example: Add Icons Dynamically

```cshtml
<ejs-breadcrumb beforeItemRender="AddIcons">
    <e-breadcrumb-items>
        <e-breadcrumb-item text="Home"></e-breadcrumb-item>
        <e-breadcrumb-item text="Settings"></e-breadcrumb-item>
        <e-breadcrumb-item text="Privacy"></e-breadcrumb-item>
    </e-breadcrumb-items>
</ejs-breadcrumb>

@functions {
    public void AddIcons(BreadcrumbBeforeItemRenderEventArgs args)
    {
        switch (args.Item.Text)
        {
            case "Home":
                args.Item.IconCss = "e-icons e-home";
                break;
            case "Settings":
                args.Item.IconCss = "e-icons e-settings";
                break;
            case "Privacy":
                args.Item.IconCss = "e-icons e-lock";
                break;
        }
    }
}
```

### Example: Conditional Item Manipulation

```cshtml
<ejs-breadcrumb beforeItemRender="ProcessItems">
    <e-breadcrumb-items>
        <e-breadcrumb-item text="Admin" url="~/admin"></e-breadcrumb-item>
        <e-breadcrumb-item text="Users" url="~/admin/users"></e-breadcrumb-item>
        <e-breadcrumb-item text="Edit"></e-breadcrumb-item>
    </e-breadcrumb-items>
</ejs-breadcrumb>

@functions {
    public void ProcessItems(BreadcrumbBeforeItemRenderEventArgs args)
    {
        // Disable items based on user role (example)
        if (!User.IsInRole("Admin") && args.Item.Text == "Admin")
        {
            args.Item.Disabled = true;
        }

        // Skip rendering specific items
        if (args.Item.Text == "Temporary")
        {
            args.Cancel = true; // Don't render this item
        }
    }
}
```

### Event Arguments Reference

| Property | Type | Description |
|----------|------|-------------|
| `args.Item` | BreadcrumbItemModel | The item being rendered (contains text, url, disabled, iconCss, id) |
| `args.Element` | HTMLElement | The DOM element for the item |
| `args.Cancel` | boolean | Set to true to prevent rendering |
| `args.Name` | string | Event name ("beforeItemRender") |

## BreadcrumbItem Properties

Each breadcrumb item can have the following properties:

### Item Properties Reference

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `text` | string | '' | Display text for the item |
| `url` | string | '' | URL to navigate to (optional) |
| `disabled` | boolean | false | Disable the item (prevent clicking) |
| `iconCss` | string | null | CSS classes for icon display |
| `id` | string | '' | Unique identifier for the item |

### C# Model Definition

```csharp
public class BreadcrumbItemModel
{
    /// <summary>
    /// Specifies the text content of the Breadcrumb item.
    /// </summary>
    public string Text { get; set; } = "";

    /// <summary>
    /// Specifies the URL of the Breadcrumb item that will be activated when clicked.
    /// </summary>
    public string Url { get; set; } = "";

    /// <summary>
    /// Enable or disable the breadcrumb item. When set to true, the item will be disabled.
    /// </summary>
    public bool Disabled { get; set; } = false;

    /// <summary>
    /// Defines CSS classes for the item to include an icon.
    /// </summary>
    public string IconCss { get; set; }

    /// <summary>
    /// Specifies the id of the Breadcrumb item.
    /// </summary>
    public string Id { get; set; } = "";
}
```

### Complete Item Example

```cshtml
<e-breadcrumb-item 
    text="Electronics"
    url="~/products/electronics"
    disabled="false"
    iconCss="e-icons e-device"
    id="electronics-item">
</e-breadcrumb-item>
```

## Data Binding Patterns

### Pattern 1: Static Items (Simple)

Best for small, unchanging breadcrumbs:

```cshtml
<ejs-breadcrumb>
    <e-breadcrumb-items>
        <e-breadcrumb-item text="Home" url="~/"></e-breadcrumb-item>
        <e-breadcrumb-item text="About" url="~/about"></e-breadcrumb-item>
        <e-breadcrumb-item text="Team"></e-breadcrumb-item>
    </e-breadcrumb-items>
</ejs-breadcrumb>
```

### Pattern 2: Model-Bound Items (Flexible)

Best for data-driven breadcrumbs:

```csharp
// In PageModel
public List<BreadcrumbItemModel> BreadcrumbItems { get; set; }

public void OnGet()
{
    BreadcrumbItems = GetBreadcrumbsForPage();
}
```

```cshtml
<!-- In View -->
<ejs-breadcrumb>
    <e-breadcrumb-items>
        @foreach (var item in Model.BreadcrumbItems)
        {
            <e-breadcrumb-item 
                text="@item.Text" 
                url="@item.Url"
                disabled="@item.Disabled">
            </e-breadcrumb-item>
        }
    </e-breadcrumb-items>
</ejs-breadcrumb>
```

### Pattern 3: URL-Generated with Customization (Dynamic)

Best for automatic breadcrumbs with custom labels:

```cshtml
<ejs-breadcrumb 
    url="@Context.Request.Path" 
    beforeItemRender="CustomizeLabels">
</ejs-breadcrumb>

@functions {
    private Dictionary<string, string> labelMap = new()
    {
        { "products", "Shop Products" },
        { "checkout", "Purchase" },
        { "confirmation", "Order Complete" }
    };

    public void CustomizeLabels(BreadcrumbBeforeItemRenderEventArgs args)
    {
        if (labelMap.TryGetValue(args.Item.Text.ToLower(), out var label))
        {
            args.Item.Text = label;
        }
    }
}
```

### Pattern 4: Conditional Data Binding

Best for role-based or user-specific breadcrumbs:

```cshtml
<ejs-breadcrumb beforeItemRender="ApplyPermissions">
    <e-breadcrumb-items>
        <e-breadcrumb-item text="Dashboard" url="~/dashboard"></e-breadcrumb-item>
        <e-breadcrumb-item text="Reports" url="~/reports"></e-breadcrumb-item>
        <e-breadcrumb-item text="Admin" url="~/admin"></e-breadcrumb-item>
    </e-breadcrumb-items>
</ejs-breadcrumb>

@functions {
    public void ApplyPermissions(BreadcrumbBeforeItemRenderEventArgs args)
    {
        // Disable admin section if user isn't admin
        if (args.Item.Text == "Admin" && !User.IsInRole("Admin"))
        {
            args.Item.Disabled = true;
        }
    }
}
```

---

## Summary

| Approach | Use Case | Flexibility |
|----------|----------|------------|
| **Static Items** | Simple, hardcoded breadcrumbs | Low |
| **Model-Bound Items** | Dynamic, data-driven breadcrumbs | High |
| **URL-Generated** | Auto-generated from path | Medium |
| **Customized Generated** | Auto-generated + beforeItemRender | High |

Choose the pattern that best matches your application's needs and data flow.
