# Navigation in Breadcrumb Control

## Table of Contents
- [URL Types](#url-types)
- [Relative URLs](#relative-urls)
- [Absolute URLs](#absolute-urls)
- [Enabling Active Item Navigation](#enabling-active-item-navigation)
- [Navigation Control](#navigation-control)
- [Item Click Events](#item-click-events)
- [Dynamic URL Handling](#dynamic-url-handling)
- [Navigation Best Practices](#navigation-best-practices)

## URL Types

The Breadcrumb component supports two types of URLs for navigation: relative and absolute. The type you choose depends on your application's URL structure and routing.

### URL Property Overview

Each breadcrumb item can have a `url` property that determines where the user navigates when clicking the item:

```cshtml
<e-breadcrumb-item text="Products" url="~/products"></e-breadcrumb-item>
```

When this item is clicked and navigation is enabled, the browser navigates to the specified URL.

### Navigation Behavior

- **Items with URLs** are rendered as clickable links (anchor tags)
- **Items without URLs** are rendered as plain text (non-clickable)
- **Disabled items** appear grayed out and don't navigate even with URLs
- **Navigation property** controls whether any items are navigable

## Relative URLs

Relative URLs contain only the path without the server location. They're relative to the current domain and are ideal for internal application navigation.

### Relative URL Syntax

Relative URLs start with `~/`, `/`, or just a path:

```cshtml
<!-- Using ~/  (app-relative) -->
<e-breadcrumb-item text="Products" url="~/products"></e-breadcrumb-item>

<!-- Using / (root-relative) -->
<e-breadcrumb-item text="Products" url="/products"></e-breadcrumb-item>

<!-- Using just path (relative to current) -->
<e-breadcrumb-item text="Parent" url="../parent"></e-breadcrumb-item>
```

### Complete Relative URL Example

```cshtml
<ejs-breadcrumb>
    <e-breadcrumb-items>
        <e-breadcrumb-item text="Home" url="~/"></e-breadcrumb-item>
        <e-breadcrumb-item text="Products" url="~/products"></e-breadcrumb-item>
        <e-breadcrumb-item text="Electronics" url="~/products/electronics"></e-breadcrumb-item>
        <e-breadcrumb-item text="Laptops" url="~/products/electronics/laptops"></e-breadcrumb-item>
        <e-breadcrumb-item text="Gaming Laptop"></e-breadcrumb-item>
    </e-breadcrumb-items>
</ejs-breadcrumb>
```

**Navigation behavior:**
- Click "Home" → navigate to `/`
- Click "Products" → navigate to `/products`
- Click "Electronics" → navigate to `/products/electronics`
- Click "Laptops" → navigate to `/products/electronics/laptops`
- "Gaming Laptop" has no URL, so it's not clickable

### Relative URL Advantages

- Works with any domain/subdomain
- No hardcoding of domain names
- Works in development and production without changes
- Clean, readable URLs
- Best practice for internal navigation

### Relative URL Best Practice

Use `~/` prefix in ASP.NET Core for app-relative URLs:

```cshtml
<!-- ✓ Recommended -->
<e-breadcrumb-item text="Home" url="~/"></e-breadcrumb-item>

<!-- ✓ Also works -->
<e-breadcrumb-item text="Home" url="/"></e-breadcrumb-item>

<!-- ✗ Avoid (ambiguous) -->
<e-breadcrumb-item text="Home" url="Home"></e-breadcrumb-item>
```

## Absolute URLs

Absolute URLs include the full protocol, domain, and path. They're useful for linking to external sites or specific domains.

### Absolute URL Syntax

Absolute URLs start with a protocol (http, https):

```cshtml
<!-- External site -->
<e-breadcrumb-item text="Syncfusion" url="https://www.syncfusion.com"></e-breadcrumb-item>

<!-- Specific domain -->
<e-breadcrumb-item text="Products" url="https://example.com/products"></e-breadcrumb-item>

<!-- Current domain (explicit) -->
<e-breadcrumb-item text="Home" url="https://example.com/"></e-breadcrumb-item>
```

### Complete Absolute URL Example

```cshtml
<ejs-breadcrumb>
    <e-breadcrumb-items>
        <e-breadcrumb-item text="Home" url="https://example.com/"></e-breadcrumb-item>
        <e-breadcrumb-item text="Products" url="https://example.com/products"></e-breadcrumb-item>
        <e-breadcrumb-item text="Support" url="https://support.example.com"></e-breadcrumb-item>
        <e-breadcrumb-item text="External" url="https://external-partner.com"></e-breadcrumb-item>
    </e-breadcrumb-items>
</ejs-breadcrumb>
```

### Absolute URL Use Cases

Use absolute URLs when:
- Linking to external websites
- Linking to different subdomains (support.example.com)
- Creating cross-domain navigation
- Dynamically constructing URLs from configuration
- Linking to resources outside your application

### Dynamic Absolute URL Construction

```cshtml
@model BreadcrumbViewModel

<ejs-breadcrumb>
    <e-breadcrumb-items>
        <e-breadcrumb-item text="Home" url="@Model.BaseUrl"></e-breadcrumb-item>
        <e-breadcrumb-item text="Products" url="@Model.BaseUrl/products"></e-breadcrumb-item>
        <e-breadcrumb-item text="Details" url="@Model.GetDetailsUrl(Model.ProductId)"></e-breadcrumb-item>
    </e-breadcrumb-items>
</ejs-breadcrumb>
```

### Absolute URL Disadvantages

- Less flexible if domain changes
- Verbose and harder to read
- Not suitable for most internal navigation
- Can cause issues with development/staging environments

### When to Use Relative vs. Absolute

| Scenario | Use Relative | Use Absolute |
|----------|--------------|--------------|
| Internal navigation | ✓ Yes | ✗ No |
| Same application | ✓ Yes | ✗ No |
| External links | ✗ No | ✓ Yes |
| Cross-domain | ✗ No | ✓ Yes |
| Different subdomains | ✗ No | ✓ Yes |
| Configuration-driven | ~ Maybe | ✓ Often |

## Enabling Active Item Navigation

By default, the last breadcrumb item (the active/current page) is not clickable. Use `enableActiveItemNavigation="true"` to make the current item navigable.

### Standard Behavior (No Active Navigation)

```cshtml
<ejs-breadcrumb>
    <e-breadcrumb-items>
        <e-breadcrumb-item text="Home" url="~/"></e-breadcrumb-item>
        <e-breadcrumb-item text="Products" url="~/products"></e-breadcrumb-item>
        <e-breadcrumb-item text="Electronics" url="~/products/electronics"></e-breadcrumb-item>
        <e-breadcrumb-item text="Laptops" url="~/products/laptops"></e-breadcrumb-item>
    </e-breadcrumb-items>
</ejs-breadcrumb>
```

**Default behavior:**
- Home, Products, Electronics are clickable
- Laptops (last item) is not clickable (current page)

### Enable Active Item Navigation

```cshtml
<ejs-breadcrumb enableActiveItemNavigation="true">
    <e-breadcrumb-items>
        <e-breadcrumb-item text="Home" url="~/"></e-breadcrumb-item>
        <e-breadcrumb-item text="Products" url="~/products"></e-breadcrumb-item>
        <e-breadcrumb-item text="Electronics" url="~/products/electronics"></e-breadcrumb-item>
        <e-breadcrumb-item text="Laptops" url="~/products/laptops"></e-breadcrumb-item>
    </e-breadcrumb-items>
</ejs-breadcrumb>
```

**With enableActiveItemNavigation="true":**
- All items including Laptops (last item) are clickable

### Use Cases for Active Item Navigation

**Enable (true) when:**
- Users need to refresh the current page
- Breadcrumbs serve as action links (not just location indicators)
- Last item should trigger a reload or action
- Building breadcrumbs for multi-step processes where current step might be revisited

**Disable (false, default) when:**
- Breadcrumbs show current location (read-only indicator)
- Current page doesn't need refresh capability
- Last item represents the active section
- Following standard UX patterns (most websites)

## Navigation Control

Control whether breadcrumb items are navigable at all using the `enableNavigation` property.

### Disable All Navigation

```cshtml
<ejs-breadcrumb enableNavigation="false">
    <e-breadcrumb-items>
        <e-breadcrumb-item text="Home" url="~/"></e-breadcrumb-item>
        <e-breadcrumb-item text="Dashboard" url="~/dashboard"></e-breadcrumb-item>
        <e-breadcrumb-item text="Analytics" url="~/analytics"></e-breadcrumb-item>
        <e-breadcrumb-item text="Reports"></e-breadcrumb-item>
    </e-breadcrumb-items>
</ejs-breadcrumb>
```

**Result:**
- No items are clickable
- URLs are ignored
- Breadcrumb acts as a visual path indicator only

### Enable Navigation (Default)

```cshtml
<!-- Default behavior -->
<ejs-breadcrumb>
    <e-breadcrumb-items>
        <e-breadcrumb-item text="Home" url="~/"></e-breadcrumb-item>
        <e-breadcrumb-item text="Products" url="~/products"></e-breadcrumb-item>
    </e-breadcrumb-items>
</ejs-breadcrumb>

<!-- Explicit -->
<ejs-breadcrumb enableNavigation="true">
    <e-breadcrumb-items>
        <e-breadcrumb-item text="Home" url="~/"></e-breadcrumb-item>
        <e-breadcrumb-item text="Products" url="~/products"></e-breadcrumb-item>
    </e-breadcrumb-items>
</ejs-breadcrumb>
```

**Result:**
- Items with URLs are clickable
- Items without URLs are plain text
- Normal navigation behavior

### Disable Individual Items

Even with navigation enabled, you can disable specific items:

```cshtml
<ejs-breadcrumb enableNavigation="true">
    <e-breadcrumb-items>
        <e-breadcrumb-item text="Home" url="~/"></e-breadcrumb-item>
        <e-breadcrumb-item text="Admin" url="~/admin" disabled="true"></e-breadcrumb-item>
        <e-breadcrumb-item text="Settings" url="~/settings"></e-breadcrumb-item>
    </e-breadcrumb-items>
</ejs-breadcrumb>
```

**Result:**
- Home and Settings are clickable
- Admin is grayed out and non-clickable

### Use Cases for Navigation Control

**enableNavigation="false" (No Navigation):**
- Read-only breadcrumb trails
- Breadcrumbs in restricted sections
- Display-only breadcrumbs (no interaction)
- Breadcrumbs in modals/overlays where navigation isn't desired

**enableNavigation="true" (Allow Navigation):**
- Standard breadcrumb navigation
- User needs to move between sections
- Interactive breadcrumbs

## Item Click Events

Handle breadcrumb item clicks using the `itemClick` event.

### itemClick Event Handler

```cshtml
<ejs-breadcrumb itemClick="OnBreadcrumbItemClick">
    <e-breadcrumb-items>
        <e-breadcrumb-item text="Home" url="~/"></e-breadcrumb-item>
        <e-breadcrumb-item text="Products" url="~/products"></e-breadcrumb-item>
        <e-breadcrumb-item text="Electronics"></e-breadcrumb-item>
    </e-breadcrumb-items>
</ejs-breadcrumb>

@functions {
    public void OnBreadcrumbItemClick(BreadcrumbClickEventArgs args)
    {
        // args.Item - The clicked BreadcrumbItemModel
        // args.Element - The clicked HTMLElement
        // args.Event - The native click event
        // args.Cancel - Set true to prevent default navigation
    }
}
```

### Event Arguments Reference

| Property | Type | Description |
|----------|------|-------------|
| `args.Item` | BreadcrumbItemModel | The clicked item (text, url, disabled, etc.) |
| `args.Element` | HTMLElement | The DOM element of the clicked item |
| `args.Event` | Event | The native JavaScript click event |
| `args.Cancel` | boolean | Set true to prevent default navigation behavior |
| `args.Name` | string | Event name ("itemClick") |

### Example: Prevent Default Navigation

```cshtml
<ejs-breadcrumb itemClick="OnItemClick">
    <e-breadcrumb-items>
        <e-breadcrumb-item text="Home" url="~/"></e-breadcrumb-item>
        <e-breadcrumb-item text="External" url="https://external.com"></e-breadcrumb-item>
    </e-breadcrumb-items>
</ejs-breadcrumb>

@functions {
    public void OnItemClick(BreadcrumbClickEventArgs args)
    {
        // Prevent navigation for external links
        if (args.Item.Url.StartsWith("https://external.com"))
        {
            args.Cancel = true;
            // Custom handling (e.g., open in new window)
            System.Diagnostics.Debug.WriteLine($"Clicked: {args.Item.Text}");
        }
    }
}
```

### Example: Custom Navigation Logic

```cshtml
<ejs-breadcrumb itemClick="HandleCustomNavigation">
    <e-breadcrumb-items>
        <e-breadcrumb-item text="Home" url="~/"></e-breadcrumb-item>
        <e-breadcrumb-item text="Dashboard" url="~/dashboard"></e-breadcrumb-item>
        <e-breadcrumb-item text="Reports" url="~/reports"></e-breadcrumb-item>
    </e-breadcrumb-items>
</ejs-breadcrumb>

@functions {
    public void HandleCustomNavigation(BreadcrumbClickEventArgs args)
    {
        if (args.Item.Text == "Reports")
        {
            // Custom logic for reports (could require confirmation, etc.)
            Console.WriteLine("Reports clicked - custom handling");
        }
    }
}
```

## Dynamic URL Handling

Customize URLs dynamically using the `beforeItemRender` event before items are rendered.

### Modifying URLs Before Render

```cshtml
<ejs-breadcrumb beforeItemRender="CustomizeUrls">
    <e-breadcrumb-items>
        <e-breadcrumb-item text="Products" url="~/products"></e-breadcrumb-item>
        <e-breadcrumb-item text="Category"></e-breadcrumb-item>
        <e-breadcrumb-item text="Details"></e-breadcrumb-item>
    </e-breadcrumb-items>
</ejs-breadcrumb>

@functions {
    public void CustomizeUrls(BreadcrumbBeforeItemRenderEventArgs args)
    {
        // Add parameters to URLs dynamically
        if (args.Item.Text == "Products")
        {
            args.Item.Url = "~/products?sort=name";
        }
    }
}
```

### Example: URL Parameter Injection

```cshtml
@model string categoryId

<ejs-breadcrumb beforeItemRender="AddCategoryParams">
    <e-breadcrumb-items>
        <e-breadcrumb-item text="Shop" url="~/shop"></e-breadcrumb-item>
        <e-breadcrumb-item text="Category" url="~/shop/category"></e-breadcrumb-item>
        <e-breadcrumb-item text="Product" url="~/shop/product"></e-breadcrumb-item>
    </e-breadcrumb-items>
</ejs-breadcrumb>

@functions {
    public void AddCategoryParams(BreadcrumbBeforeItemRenderEventArgs args)
    {
        if (args.Item.Text == "Category")
        {
            args.Item.Url = $"~/shop/category?id=@Model.categoryId";
        }
    }
}
```

## Navigation Best Practices

### 1. Use Relative URLs
```cshtml
<!-- ✓ Good -->
<e-breadcrumb-item text="Home" url="~/"></e-breadcrumb-item>

<!-- ✗ Avoid -->
<e-breadcrumb-item text="Home" url="https://example.com/"></e-breadcrumb-item>
```

### 2. Last Item Without URL
```cshtml
<!-- ✓ Good - current page not clickable -->
<e-breadcrumb-item text="Current Page"></e-breadcrumb-item>

<!-- ✗ Avoid - confusing to click current page -->
<e-breadcrumb-item text="Current Page" url="~/current"></e-breadcrumb-item>
```

### 3. Enable Active Item Only When Needed
```cshtml
<!-- Standard (no active navigation) -->
<ejs-breadcrumb enableActiveItemNavigation="false">
```

### 4. Clear Visual Hierarchy
```cshtml
<!-- ✓ Clear path: Home > Products > Electronics -->
<e-breadcrumb-item text="Home" url="~/"></e-breadcrumb-item>
<e-breadcrumb-item text="Products" url="~/products"></e-breadcrumb-item>
<e-breadcrumb-item text="Electronics" url="~/products/electronics"></e-breadcrumb-item>
```

### 5. Disable When Not Navigable
```cshtml
<!-- ✓ Clear that user can't go back to admin -->
<e-breadcrumb-item text="Admin" url="~/admin" disabled="true"></e-breadcrumb-item>

<!-- ✗ Confusing - looks clickable but isn't -->
<e-breadcrumb-item text="Admin"></e-breadcrumb-item>
```

---

## Summary

| Feature | Usage | Default |
|---------|-------|---------|
| **Relative URLs** | Internal navigation | Recommended |
| **Absolute URLs** | External/cross-domain | For external only |
| **enableActiveItemNavigation** | Last item clickable | false |
| **enableNavigation** | Any items clickable | true |
| **disabled** | Individual item disabled | false per item |
| **itemClick event** | Handle clicks | Optional |
| **beforeItemRender event** | Modify URLs/items | Optional |

Follow these patterns for intuitive, accessible breadcrumb navigation.
