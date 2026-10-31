# Templates and Customization in Breadcrumb Control

## Table of Contents
- [Item Template Overview](#item-template-overview)
- [Item Template Implementation](#item-template-implementation)
- [Separator Template Overview](#separator-template-overview)
- [Separator Template Implementation](#separator-template-implementation)
- [Conditional Template Rendering](#conditional-template-rendering)
- [Template Event Binding](#template-event-binding)
- [Advanced Template Patterns](#advanced-template-patterns)
- [Template Best Practices](#template-best-practices)

## Item Template Overview

The `itemTemplate` property allows you to customize how breadcrumb items are rendered. Instead of the default text-based rendering, you can create rich, custom HTML layouts for each item.

### itemTemplate Property

The `itemTemplate` can be:
- A string containing HTML markup
- A function that returns HTML
- A reference to an HTML template element

### When to Use Item Templates

Use item templates when you need to:
- Add custom HTML elements (badges, buttons, custom styling)
- Integrate other components (chips, tags, icons)
- Create context-specific rendering
- Add interactive elements within items
- Display complex item structures

### Basic Item Template Example

```cshtml
<ejs-breadcrumb itemTemplate="<div>${text}</div>">
    <e-breadcrumb-items>
        <e-breadcrumb-item text="Home"></e-breadcrumb-item>
        <e-breadcrumb-item text="Products"></e-breadcrumb-item>
        <e-breadcrumb-item text="Electronics"></e-breadcrumb-item>
    </e-breadcrumb-items>
</ejs-breadcrumb>
```

## Item Template Implementation

### String-Based Item Template

Define item template as an HTML string:

```cshtml
<ejs-breadcrumb itemTemplate="<div class='custom-item'><strong>${text}</strong></div>">
    <e-breadcrumb-items>
        <e-breadcrumb-item text="Home" url="~/"></e-breadcrumb-item>
        <e-breadcrumb-item text="Dashboard" url="~/dashboard"></e-breadcrumb-item>
    </e-breadcrumb-items>
</ejs-breadcrumb>

<style>
    .custom-item {
        padding: 8px 12px;
        background: #f5f5f5;
        border-radius: 4px;
        font-weight: bold;
    }
</style>
```

### Template Variable Access

Inside item templates, use `${propertyName}` syntax to access item properties:

```cshtml
<!-- Access item text -->
${text}

<!-- Access item URL -->
${url}

<!-- Access item disabled state -->
${disabled}

<!-- Access item ID -->
${id}

<!-- Access icon CSS -->
${iconCss}
```

### Complete Property Template Example

```cshtml
<ejs-breadcrumb itemTemplate="
    <div class='breadcrumb-item'>
        <i class='${iconCss}'></i>
        <span class='item-text'>${text}</span>
        <span class='item-url' style='display:none;'>${url}</span>
    </div>
">
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
            text="Electronics" 
            url="~/products/electronics" 
            iconCss="e-icons e-device">
        </e-breadcrumb-item>
    </e-breadcrumb-items>
</ejs-breadcrumb>

<style>
    .breadcrumb-item {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 4px 8px;
    }

    .breadcrumb-item i {
        font-size: 14px;
    }

    .item-text {
        font-weight: 500;
    }
</style>
```

### Template with Badges

Add badges or labels to items:

```cshtml
<ejs-breadcrumb itemTemplate="
    <div class='item-with-badge'>
        ${text}
        <span class='badge' style='${text === 'New' ? 'display:inline;' : 'display:none;'}'>NEW</span>
    </div>
">
    <e-breadcrumb-items>
        <e-breadcrumb-item text="Products"></e-breadcrumb-item>
        <e-breadcrumb-item text="New"></e-breadcrumb-item>
        <e-breadcrumb-item text="Featured"></e-breadcrumb-item>
    </e-breadcrumb-items>
</ejs-breadcrumb>

<style>
    .item-with-badge {
        display: flex;
        align-items: center;
        gap: 6px;
    }

    .badge {
        background: #ff6b6b;
        color: white;
        padding: 2px 8px;
        border-radius: 12px;
        font-size: 11px;
        font-weight: bold;
    }
</style>
```

## Separator Template Overview

The `separatorTemplate` property customizes the separators between breadcrumb items. By default, breadcrumbs use forward slashes (`/`), but you can replace them with custom HTML.

### separatorTemplate Property

The separator appears between each breadcrumb item. Customize it to:
- Change the separator symbol (instead of `/`, use `>`, `→`, etc.)
- Add icons as separators
- Create custom separator styling
- Add separators with visual styling

## Separator Template Implementation

### Simple Separator Template

```cshtml
<ejs-breadcrumb separatorTemplate="<span class='separator'>&gt;</span>">
    <e-breadcrumb-items>
        <e-breadcrumb-item text="Home"></e-breadcrumb-item>
        <e-breadcrumb-item text="Products"></e-breadcrumb-item>
        <e-breadcrumb-item text="Electronics"></e-breadcrumb-item>
    </e-breadcrumb-items>
</ejs-breadcrumb>

<style>
    .separator {
        margin: 0 8px;
        color: #999;
        font-weight: bold;
    }
</style>
```

**Renders:** `Home > Products > Electronics`

### Icon as Separator

```cshtml
<ejs-breadcrumb separatorTemplate="<i class='e-icons e-chevron-right separator-icon'></i>">
    <e-breadcrumb-items>
        <e-breadcrumb-item text="Home"></e-breadcrumb-item>
        <e-breadcrumb-item text="Products"></e-breadcrumb-item>
        <e-breadcrumb-item text="Electronics"></e-breadcrumb-item>
    </e-breadcrumb-items>
</ejs-breadcrumb>

<style>
    .separator-icon {
        margin: 0 8px;
        font-size: 14px;
        color: #666;
    }
</style>
```

**Renders:** `Home → Products → Electronics` (with arrow icons)

### Styled Separator

```cshtml
<ejs-breadcrumb separatorTemplate="<span class='styled-sep'>/</span>">
    <e-breadcrumb-items>
        <e-breadcrumb-item text="Home"></e-breadcrumb-item>
        <e-breadcrumb-item text="Products"></e-breadcrumb-item>
        <e-breadcrumb-item text="Electronics"></e-breadcrumb-item>
    </e-breadcrumb-items>
</ejs-breadcrumb>

<style>
    .styled-sep {
        margin: 0 10px;
        color: #0066cc;
        font-weight: bold;
        font-size: 16px;
    }
</style>
```

### Custom Separator with Background

```cshtml
<ejs-breadcrumb separatorTemplate="<span class='decorated-sep'>&raquo;</span>">
    <e-breadcrumb-items>
        <e-breadcrumb-item text="Home"></e-breadcrumb-item>
        <e-breadcrumb-item text="Products"></e-breadcrumb-item>
        <e-breadcrumb-item text="Details"></e-breadcrumb-item>
    </e-breadcrumb-items>
</ejs-breadcrumb>

<style>
    .decorated-sep {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        margin: 0 8px;
        width: 24px;
        height: 24px;
        background: #f0f0f0;
        border-radius: 50%;
        color: #333;
        font-size: 14px;
    }
</style>
```

## Conditional Template Rendering

Use conditional logic within templates to render different content based on item properties.

### Conditional Item Template

```cshtml
<ejs-breadcrumb itemTemplate="
    <div class='conditional-item'>
        ${disabled ? '<span class=\'disabled-item\'>🔒 ' + text + '</span>' : '<span>' + text + '</span>'}
    </div>
">
    <e-breadcrumb-items>
        <e-breadcrumb-item text="Public" url="~/public"></e-breadcrumb-item>
        <e-breadcrumb-item text="Admin" url="~/admin" disabled="true"></e-breadcrumb-item>
        <e-breadcrumb-item text="Users" url="~/users"></e-breadcrumb-item>
    </e-breadcrumb-items>
</ejs-breadcrumb>

<style>
    .disabled-item {
        color: #999;
        text-decoration: line-through;
    }
</style>
```

### Conditional Icon Display

```cshtml
<ejs-breadcrumb itemTemplate="
    <div class='item-with-conditional-icon'>
        ${iconCss ? '<i class=\"' + iconCss + '\"></i>' : ''}
        <span>${text}</span>
        ${url ? '<i class=\"e-icons e-forward\" title=\"Has navigation\"></i>' : '<i class=\"e-icons e-close\" title=\"No navigation\"></i>'}
    </div>
">
    <e-breadcrumb-items>
        <e-breadcrumb-item text="Home" url="~/" iconCss="e-icons e-home"></e-breadcrumb-item>
        <e-breadcrumb-item text="Current" iconCss="e-icons e-here"></e-breadcrumb-item>
    </e-breadcrumb-items>
</ejs-breadcrumb>
```

### Status-Based Template

```cshtml
<ejs-breadcrumb itemTemplate="
    <div class='status-item' data-status='${id}'>
        <span class='status-dot'></span>
        ${text}
    </div>
">
    <e-breadcrumb-items>
        <e-breadcrumb-item text="Pending" id="pending"></e-breadcrumb-item>
        <e-breadcrumb-item text="Processing" id="processing"></e-breadcrumb-item>
        <e-breadcrumb-item text="Complete" id="complete"></e-breadcrumb-item>
    </e-breadcrumb-items>
</ejs-breadcrumb>

<style>
    .status-item {
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .status-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
    }

    .status-item[data-status='pending'] .status-dot {
        background-color: #ffc107;
    }

    .status-item[data-status='processing'] .status-dot {
        background-color: #0066cc;
    }

    .status-item[data-status='complete'] .status-dot {
        background-color: #28a745;
    }
</style>
```

## Template Event Binding

Dynamically modify templates using event handlers like `beforeItemRender`.

### Dynamic Item Template with Events

```cshtml
<ejs-breadcrumb 
    itemTemplate="<div class='template-item'>${text}</div>"
    beforeItemRender="ModifyTemplate">
    <e-breadcrumb-items>
        <e-breadcrumb-item text="Home" url="~/"></e-breadcrumb-item>
        <e-breadcrumb-item text="Admin" url="~/admin"></e-breadcrumb-item>
        <e-breadcrumb-item text="Settings" url="~/settings"></e-breadcrumb-item>
    </e-breadcrumb-items>
</ejs-breadcrumb>

@functions {
    public void ModifyTemplate(BreadcrumbBeforeItemRenderEventArgs args)
    {
        if (args.Element != null && args.Item.Text == "Admin")
        {
            // Add custom class to specific items
            args.Element.ClassList.Add("admin-item");
        }
    }
}

<style>
    .template-item {
        padding: 8px 12px;
    }

    .admin-item {
        background-color: #fff3cd;
        border-radius: 4px;
    }
</style>
```

## Advanced Template Patterns

### Pattern 1: Shopping Cart Breadcrumb with Chips

Create breadcrumb items styled like chips:

```cshtml
<ejs-breadcrumb 
    itemTemplate="
    <div class='chip-item'>
        <span class='chip-text'>${text}</span>
        ${url ? '<span class=\"chip-close\">×</span>' : ''}
    </div>
    "
    separatorTemplate="<span style='margin: 0 4px;'>,</span>">
    <e-breadcrumb-items>
        <e-breadcrumb-item text="Electronics" url="~/category/electronics"></e-breadcrumb-item>
        <e-breadcrumb-item text="Laptops" url="~/category/laptops"></e-breadcrumb-item>
        <e-breadcrumb-item text="Gaming" url="~/category/gaming"></e-breadcrumb-item>
        <e-breadcrumb-item text="Current"></e-breadcrumb-item>
    </e-breadcrumb-items>
</ejs-breadcrumb>

<style>
    .chip-item {
        display: inline-flex;
        align-items: center;
        background: #e0e0e0;
        border-radius: 16px;
        padding: 6px 12px;
        margin: 2px;
        gap: 6px;
    }

    .chip-text {
        font-size: 14px;
    }

    .chip-close {
        cursor: pointer;
        font-weight: bold;
        color: #666;
    }

    .chip-close:hover {
        color: #000;
    }
</style>
```

### Pattern 2: Step Indicator Breadcrumb

Use breadcrumb as a step indicator for multi-step forms:

```cshtml
<ejs-breadcrumb 
    itemTemplate="
    <div class='step-item'>
        <span class='step-number'>${text.charAt(0)}</span>
        <span class='step-label'>${text}</span>
    </div>
    "
    separatorTemplate="">
    <e-breadcrumb-items>
        <e-breadcrumb-item text="1 - Information"></e-breadcrumb-item>
        <e-breadcrumb-item text="2 - Verification"></e-breadcrumb-item>
        <e-breadcrumb-item text="3 - Confirmation"></e-breadcrumb-item>
    </e-breadcrumb-items>
</ejs-breadcrumb>

<style>
    .step-item {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 8px;
    }

    .step-number {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        background: #0066cc;
        color: white;
        border-radius: 50%;
        font-weight: bold;
    }

    .step-label {
        font-weight: 500;
        min-width: 100px;
    }
</style>
```

### Pattern 3: Tag-Based Breadcrumb

Render items as tags/labels:

```cshtml
<ejs-breadcrumb 
    itemTemplate="
    <span class='tag-item'>
        <i class='${iconCss}'></i> ${text}
    </span>
    "
    separatorTemplate="<span class='tag-separator'>,</span>">
    <e-breadcrumb-items>
        <e-breadcrumb-item 
            text="Python" 
            iconCss="e-icons e-settings">
        </e-breadcrumb-item>
        <e-breadcrumb-item 
            text="Web Development" 
            iconCss="e-icons e-device">
        </e-breadcrumb-item>
        <e-breadcrumb-item 
            text="Django" 
            iconCss="e-icons e-folder">
        </e-breadcrumb-item>
    </e-breadcrumb-items>
</ejs-breadcrumb>

<style>
    .tag-item {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        background: #e8f4f8;
        border: 1px solid #0066cc;
        border-radius: 4px;
        padding: 6px 12px;
        margin: 0 2px;
        font-size: 13px;
    }

    .tag-separator {
        margin: 0 4px;
        color: #999;
    }
</style>
```

## Template Best Practices

### 1. Keep Templates Simple
```cshtml
<!-- ✓ Simple and readable -->
<ejs-breadcrumb itemTemplate="<strong>${text}</strong>">

<!-- ✗ Complex and hard to maintain -->
<ejs-breadcrumb itemTemplate="<div class='${disabled?'disabled':'active'}'><span>${disabled?'🔒':'📍'} ${text.toUpperCase()}</span></div>">
```

### 2. Use CSS for Styling
```cshtml
<!-- ✓ Separate template and styling -->
<ejs-breadcrumb itemTemplate="<div class='item'>${text}</div>">

<style>
    .item { font-weight: bold; }
</style>

<!-- ✗ Inline styles in template -->
<ejs-breadcrumb itemTemplate="<div style='font-weight:bold;'>${text}</div>">
```

### 3. Include Event Binding for Dynamic Content
```cshtml
<!-- ✓ Template + event for flexibility -->
<ejs-breadcrumb 
    itemTemplate="<div>${text}</div>"
    beforeItemRender="CustomizeItem">

<!-- ✗ Only template, no dynamic behavior -->
<ejs-breadcrumb itemTemplate="<div>${text}</div>">
```

### 4. Test With Long Item Text
```cshtml
<!-- ✓ Handle text overflow -->
<style>
    .item {
        max-width: 150px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
</style>

<!-- ✗ Ignoring potential overflow -->
<style>
    .item { width: 100%; }
</style>
```

### 5. Ensure Accessibility
```cshtml
<!-- ✓ Include accessible elements -->
<ejs-breadcrumb itemTemplate="<a href='${url}' role='link'>${text}</a>">

<!-- ✗ Non-semantic HTML -->
<ejs-breadcrumb itemTemplate="<div onclick='navigate(${url})'>${text}</div>">
```

---

## Summary

| Feature | Purpose | Example |
|---------|---------|---------|
| **itemTemplate** | Customize item appearance | `<div class='custom'>${text}</div>` |
| **separatorTemplate** | Customize separators | `<i class='e-icons e-chevron-right'></i>` |
| **Conditional Logic** | Dynamic rendering | `${disabled ? 'locked' : 'open'}` |
| **Event Binding** | Real-time modification | `beforeItemRender="CustomizeItem"` |
| **CSS Styling** | Visual enhancement | `.item { font-weight: bold; }` |

Templates enable rich customization while maintaining clean, maintainable code.
