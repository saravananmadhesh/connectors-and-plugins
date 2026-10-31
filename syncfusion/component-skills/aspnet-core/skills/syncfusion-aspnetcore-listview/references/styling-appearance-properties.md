# Styling and Appearance Properties

## Table of Contents
- [CssClass Property](#cssclass-property)
- [Height and Width](#height-and-width)
- [ShowHeader and ShowIcon](#showheader-and-showicon)
- [CSS Selectors Reference](#css-selectors-reference)
- [Hover and Focus Styling](#hover-and-focus-styling)
- [HtmlAttributes Property](#htmlattributes-property)
- [Theme Customization](#theme-customization)

## CssClass Property

The `cssClass` property adds custom CSS classes to the ListView root element:

### Basic CssClass Usage

```cshtml
<ejs-listview id="list" dataSource="@ViewBag.Items" cssClass="custom-list">
    <e-listview-fieldsettings id="Id" text="Name"></e-listview-fieldsettings>
</ejs-listview>

<style>
.custom-list {
    border: 2px solid #2196f3;
    border-radius: 8px;
    background-color: #f5f5f5;
}
</style>
```

**Result:** ListView renders with blue border, rounded corners, and light gray background.

### Multiple Custom Classes

```cshtml
<ejs-listview id="list" dataSource="@ViewBag.Items" cssClass="e-list-template dark-theme compact-view">
    <e-listview-fieldsettings id="Id" text="Name"></e-listview-fieldsettings>
</ejs-listview>

<style>
.dark-theme {
    background-color: #333;
    color: #fff;
}

.compact-view .e-list-item {
    padding: 8px 12px;
    min-height: 36px;
}

.dark-theme .e-list-item:hover {
    background-color: #444;
}
</style>
```

### CssClass with Templates

```cshtml
<ejs-listview id="products" dataSource="@ViewBag.Products" cssClass="e-list-template product-list"
    template="<div class='e-list-wrapper'><span class='e-list-content'>${ProductName}</span></div>">
    <e-listview-fieldsettings id="ProductId" text="ProductName"></e-listview-fieldsettings>
</ejs-listview>

<style>
.product-list.e-list-template .e-list-wrapper {
    padding: 15px;
    border-bottom: 1px solid #ddd;
}

.product-list.e-list-template .e-list-content {
    font-size: 16px;
    font-weight: 500;
}
</style>
```

## Height and Width

The `height` and `width` properties control ListView dimensions:

### Fixed Height

```cshtml
<ejs-listview id="list" dataSource="@ViewBag.Items" height="400">
    <e-listview-fieldsettings id="Id" text="Name"></e-listview-fieldsettings>
</ejs-listview>
```

**Effect:** ListView container is exactly 400px tall; content scrolls within.

### Responsive Height with String Values

```cshtml
<ejs-listview id="list" dataSource="@ViewBag.Items" height="100%">
    <e-listview-fieldsettings id="Id" text="Name"></e-listview-fieldsettings>
</ejs-listview>
```

**Effect:** ListView takes 100% of parent container height.

### Width Control

```cshtml
<ejs-listview id="list" dataSource="@ViewBag.Items" width="300" height="500">
    <e-listview-fieldsettings id="Id" text="Name"></e-listview-fieldsettings>
</ejs-listview>
```

**Result:** 300px width × 500px height fixed dimensions.

### Responsive Sizing

```cshtml
<div style="display: flex; gap: 20px;">
    <!-- Left Sidebar -->
    <ejs-listview id="menu" dataSource="@ViewBag.Menu" height="600" width="250" cssClass="sidebar-list">
        <e-listview-fieldsettings id="Id" text="Label"></e-listview-fieldsettings>
    </ejs-listview>
    
    <!-- Main Content -->
    <div style="flex: 1;">
        <ejs-listview id="content" dataSource="@ViewBag.Items" height="600" cssClass="main-list">
            <e-listview-fieldsettings id="Id" text="Title"></e-listview-fieldsettings>
        </ejs-listview>
    </div>
</div>

<style>
.sidebar-list {
    border-right: 1px solid #ddd;
}

.main-list {
    padding: 20px;
}
</style>
```

## ShowHeader and ShowIcon

### ShowHeader Property

Display or hide the list header:

```cshtml
<!-- Header enabled with title -->
<ejs-listview id="list" dataSource="@ViewBag.Items" 
    showHeader="true" 
    headerTitle="My Items">
    <e-listview-fieldsettings id="Id" text="Name"></e-listview-fieldsettings>
</ejs-listview>

<!-- Header disabled -->
<ejs-listview id="list" dataSource="@ViewBag.Items" showHeader="false">
    <e-listview-fieldsettings id="Id" text="Name"></e-listview-fieldsettings>
</ejs-listview>
```

### ShowIcon Property

Display or hide icons in list items:

```cshtml
<!-- Icons enabled -->
<ejs-listview id="menu" dataSource="@ViewBag.Menu" showIcon="true">
    <e-listview-fieldsettings id="Id" text="Label" iconCss="IconClass"></e-listview-fieldsettings>
</ejs-listview>

<!-- Icons disabled (text only) -->
<ejs-listview id="simple" dataSource="@ViewBag.Items" showIcon="false">
    <e-listview-fieldsettings id="Id" text="Name"></e-listview-fieldsettings>
</ejs-listview>
```

### Icon Sizing

```cshtml
<ejs-listview id="icons" dataSource="@ViewBag.Menu" showIcon="true">
    <e-listview-fieldsettings id="Id" text="Label" iconCss="IconClass"></e-listview-fieldsettings>
</ejs-listview>

<style>
.e-listview .e-list-icon {
    height: 32px;
    width: 32px;
    font-size: 18px;
    line-height: 32px;
}
</style>
```

## CSS Selectors Reference

### Core Structure Selectors

| Selector | Target |
|----------|--------|
| `.e-listview` | Root ListView container |
| `.e-list-item` | Individual list item |
| `.e-list-content` | Item content area |
| `.e-list-header` | Header element |
| `.e-list-icon` | Item icon |
| `.e-list-group-item` | Group header |

### State Selectors

| Selector | Target |
|----------|--------|
| `.e-list-item.e-active` | Selected item |
| `.e-list-item.e-hover` | Hovered item |
| `.e-list-item.e-focused` | Focused item |
| `.e-list-item.e-checklist` | Item with checkbox |
| `.e-list-item.e-active.e-checklist` | Selected item with checkbox |

### Template Selectors

| Selector | Target |
|----------|--------|
| `.e-list-template` | Root with template enabled |
| `.e-list-wrapper` | Template wrapper |
| `.e-list-avatar` | Avatar container |
| `.e-list-badge` | Badge container |
| `.e-list-multi-line` | Multi-line layout |

## Hover and Focus Styling

### Custom Hover State

```cshtml
<ejs-listview id="list" dataSource="@ViewBag.Items">
    <e-listview-fieldsettings id="Id" text="Name"></e-listview-fieldsettings>
</ejs-listview>

<style>
/* Default hover effect override */
.e-listview .e-list-item.e-hover {
    background-color: #e3f2fd;
    color: #1976d2;
}

.e-listview .e-list-item.e-hover .e-list-content {
    font-weight: 500;
}
</style>
```

### Custom Focus/Selected State

```cshtml
<ejs-listview id="list" dataSource="@ViewBag.Items">
    <e-listview-fieldsettings id="Id" text="Name"></e-listview-fieldsettings>
</ejs-listview>

<style>
/* Custom selected item styling */
.e-listview .e-list-item.e-active {
    background-color: #4caf50;
    color: #fff;
    border-left: 4px solid #2e7d32;
}

.e-listview .e-list-item.e-active .e-list-content {
    font-weight: bold;
}

/* Checkbox specific styling */
.e-listview .e-list-item.e-active.e-checklist {
    background-color: #4caf50;
}

.e-listview .e-list-item.e-active.e-checklist input[type="checkbox"] {
    accent-color: #2e7d32;
}
</style>
```

### Disabled Item Styling

```cshtml
<ejs-listview id="list" dataSource="@ViewBag.Items">
    <e-listview-fieldsettings id="Id" text="Name" enabled="IsEnabled"></e-listview-fieldsettings>
</ejs-listview>

<style>
/* Disabled item styling */
.e-listview .e-list-item:disabled,
.e-listview .e-list-item[disabled] {
    opacity: 0.5;
    color: #999;
    cursor: not-allowed;
    background-color: #f5f5f5;
}

.e-listview .e-list-item:disabled .e-list-content {
    text-decoration: line-through;
}
</style>
```

## HtmlAttributes Property

The `htmlAttributes` property adds custom HTML attributes to ListView root:

### Basic HtmlAttributes

```csharp
var htmlAttrs = new Dictionary<string, string>()
{
    { "data-section", "products" },
    { "aria-label", "Product List" },
    { "role", "listbox" }
};
```

```cshtml
<ejs-listview id="list" dataSource="@ViewBag.Items" htmlAttributes="htmlAttrs">
    <e-listview-fieldsettings id="Id" text="Name"></e-listview-fieldsettings>
</ejs-listview>
```

### Style Attributes

```csharp
var styles = new Dictionary<string, string>()
{
    { "style", "border: 1px solid #ddd; border-radius: 8px;" }
};
```

```cshtml
<ejs-listview id="list" dataSource="@ViewBag.Items" htmlAttributes="styles">
    <e-listview-fieldsettings id="Id" text="Name"></e-listview-fieldsettings>
</ejs-listview>
```

## Theme Customization

### Theme Selection

Syncfusion provides predefined themes. Change in layout file:

```cshtml
<!-- In ~/Pages/Shared/_Layout.cshtml -->
<head>
    <!-- Fluent Theme -->
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/26.1.35/fluent.css" />
    
    <!-- OR Bootstrap Theme -->
    <!-- <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/26.1.35/bootstrap.css" /> -->
    
    <!-- OR Material Theme -->
    <!-- <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/26.1.35/material.css" /> -->
</head>
```

### Custom Theme Variables

Override theme colors:

```cshtml
<style>
:root {
    /* Primary color */
    --sf-primary: #2196f3;
    
    /* Background */
    --sf-background: #fff;
    
    /* Text color */
    --sf-text: #333;
    
    /* Border color */
    --sf-border: #ddd;
    
    /* Hover background */
    --sf-hover-bg: #f5f5f5;
}

.e-listview {
    --sf-listview-bg: var(--sf-background);
    --sf-listview-text: var(--sf-text);
    --sf-listview-border: var(--sf-border);
    --sf-listview-hover-bg: var(--sf-hover-bg);
}
</style>
```

### Custom Gradient Background

```cshtml
<ejs-listview id="list" dataSource="@ViewBag.Items" cssClass="gradient-list">
    <e-listview-fieldsettings id="Id" text="Name"></e-listview-fieldsettings>
</ejs-listview>

<style>
.gradient-list {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.gradient-list .e-list-item {
    background: rgba(255, 255, 255, 0.1);
    color: white;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.gradient-list .e-list-item.e-hover {
    background: rgba(255, 255, 255, 0.2);
}

.gradient-list .e-list-item.e-active {
    background: rgba(255, 255, 255, 0.3);
    border-left: 4px solid white;
}
</style>
```

### Dark Mode

```cshtml
<ejs-listview id="list" dataSource="@ViewBag.Items" cssClass="dark-mode-list">
    <e-listview-fieldsettings id="Id" text="Name"></e-listview-fieldsettings>
</ejs-listview>

<style>
.dark-mode-list {
    background-color: #1e1e1e;
    color: #e0e0e0;
}

.dark-mode-list .e-list-item {
    color: #e0e0e0;
    border-bottom: 1px solid #333;
}

.dark-mode-list .e-list-item.e-hover {
    background-color: #2d2d2d;
}

.dark-mode-list .e-list-item.e-active {
    background-color: #2196f3;
    color: #fff;
}

.dark-mode-list .e-list-header {
    background-color: #2d2d2d;
    color: #e0e0e0;
}
</style>
```

## Complete Styling Example

```cshtml
<ejs-listview id="styled" dataSource="@ViewBag.Items" 
    cssClass="e-list-template styled-list"
    showHeader="true" 
    headerTitle="Styled Items"
    height="500"
    width="350"
    showIcon="true"
    template="<div class='e-list-wrapper' style='display: flex; align-items: center; padding: 12px; gap: 12px;'><span class='e-list-icon' style='font-size: 24px;'></span><span class='e-list-content' style='flex: 1;'><strong>${Name}</strong></span></div>">
    <e-listview-fieldsettings id="Id" text="Name" iconCss="Icon"></e-listview-fieldsettings>
</ejs-listview>

<style>
.styled-list {
    border: 2px solid #2196f3;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.styled-list .e-list-header {
    background: linear-gradient(90deg, #2196f3, #1976d2);
    color: white;
    font-weight: bold;
    padding: 15px;
}

.styled-list .e-list-item {
    transition: all 0.3s ease;
    border: none;
}

.styled-list .e-list-item.e-hover {
    background-color: #e3f2fd;
    transform: translateX(5px);
}

.styled-list .e-list-item.e-active {
    background-color: #2196f3;
    color: white;
    border-left: 4px solid #1565c0;
}
</style>
```

---

**Related Topics:**
- [Templates & Customization](templates-and-customization.md)
- [Field Settings & Configuration](field-settings-and-configuration.md)
