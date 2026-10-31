# Customization and Styling

## Table of Contents
- [CSS Class Property (cssClass)](#css-class-property-cssclass)
- [Theme Selection and Import](#theme-selection-and-import)
- [Template Support](#template-support)
- [Menu Item Styling](#menu-item-styling)
- [Animation Configuration](#animation-configuration)
- [Advanced Styling Patterns](#advanced-styling-patterns)
- [Styling Best Practices](#styling-best-practices)

## CSS Class Property (cssClass)

The `cssClass` property allows you to add custom CSS classes to the Menu wrapper element. This enables you to apply custom styling without modifying Syncfusion theme files.

### Basic cssClass Usage

```html
@{
    List<object> menuItems = new List<object>();
    menuItems.Add(new { text = "Home" });
    menuItems.Add(new { text = "About" });
    menuItems.Add(new { text = "Contact" });
}

<ejs-menu id="menu" 
    items="menuItems"
    cssClass="custom-menu">
</ejs-menu>

<style>
    .custom-menu.e-menu-wrapper {
        background-color: #2c3e50;
        border-radius: 4px;
    }
    
    .custom-menu .e-menu-wrapper .e-menu-item {
        color: #ecf0f1;
        padding: 12px 16px;
    }
    
    .custom-menu .e-menu-wrapper .e-menu-item:hover {
        background-color: #34495e;
    }
</style>
```

### Multiple CSS Classes

You can apply multiple CSS classes by separating them with spaces:

```html
<ejs-menu id="menu" 
    items="menuItems"
    cssClass="dark-theme modern-styling">
</ejs-menu>

<style>
    .dark-theme.e-menu-wrapper {
        background-color: #1a1a1a;
    }
    
    .modern-styling.e-menu-wrapper {
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        border-radius: 6px;
    }
</style>
```

### Component Hierarchy for Styling

Understanding the Menu DOM structure helps with precise styling:

```
e-menu-wrapper (root container)
├── e-menu (menu container)
│   ├── e-menu-item (each menu item)
│   │   ├── e-menu-text
│   │   └── e-caret (for items with sub-menus)
│   └── e-ul (sub-menu list)
├── e-submenu (sub-menu wrapper)
│   └── e-menu-item (sub-menu items)
```

Use these classes for targeted styling:

```css
/* Target root menu items */
.custom-menu .e-menu-wrapper > .e-menu > .e-menu-item { }

/* Target sub-menu items */
.custom-menu .e-submenu .e-menu-item { }

/* Target specific menu item text */
.custom-menu .e-menu-item .e-menu-text { }

/* Target caret (arrow for expandable items) */
.custom-menu .e-menu-item .e-caret { }
```

## Theme Selection and Import

Syncfusion provides pre-built themes that define colors, fonts, spacing, and animations for the Menu component.

### Available Themes

| Theme | CDN Link | Best For |
|-------|----------|----------|
| Material | `ej2-base@latest/styles/material.css` | Modern, Material Design |
| Bootstrap 5 | `ej2-base@latest/styles/bootstrap5.css` | Bootstrap 5 projects |
| Tailwind | `ej2-base@latest/styles/tailwind.css` | Tailwind CSS projects |
| Fluent | `ej2-base@latest/styles/fluent.css` | Microsoft Fluent Design |
| Fabric | `ej2-base@latest/styles/fabric.css` | Microsoft Office style |
| Bootstrap | `ej2-base@latest/styles/bootstrap.css` | Bootstrap 3 projects |
| High Contrast | `ej2-base@latest/styles/highcontrast.css` | Accessibility |

### Importing a Theme

**Using CDN:**

```html
<head>
    <!-- Base theme -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ej2-base@latest/styles/material.css" />
    
    <!-- Component-specific styles -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ej2-navigations@latest/styles/material.css" />
</head>
```

**Multiple Theme Example:**

```html
<!-- For Bootstrap 5 projects -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ej2-base@latest/styles/bootstrap5.css" />
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ej2-navigations@latest/styles/bootstrap5.css" />
```

### Switching Themes Dynamically

Load different theme files based on user preference:

```html
<!-- Theme selection UI -->
<select id="themeSelector" onchange="switchTheme(this.value)">
    <option value="material">Material</option>
    <option value="bootstrap5">Bootstrap 5</option>
    <option value="tailwind">Tailwind</option>
</select>

<ejs-menu id="menu" items="menuItems"></ejs-menu>

<script>
    function switchTheme(themeName) {
        // Remove existing theme links
        const existingLinks = document.querySelectorAll('link[rel="stylesheet"][href*="styles/"]');
        existingLinks.forEach(link => link.remove());
        
        // Add new theme links
        const baseLink = document.createElement('link');
        baseLink.rel = 'stylesheet';
        baseLink.href = `https://cdn.jsdelivr.net/npm/ej2-base@latest/styles/${themeName}.css`;
        document.head.appendChild(baseLink);
        
        const navLink = document.createElement('link');
        navLink.rel = 'stylesheet';
        navLink.href = `https://cdn.jsdelivr.net/npm/ej2-navigations@latest/styles/${themeName}.css`;
        document.head.appendChild(navLink);
    }
</script>
```

## Template Support

The `template` property allows you to define a custom template for rendering menu items instead of using the default text-only display.

### Basic Template Syntax

The template property accepts a string containing HTML markup with template engine syntax:

```html
<ejs-menu id="menu" 
    items="menuItems"
    template="<span class='icon ${iconClass}'></span><span class='text'>${text}</span>">
</ejs-menu>
```

### Template Variables

Access menu item properties in templates using `${propertyName}` syntax:

| Variable | Type | Purpose |
|----------|------|---------|
| `${text}` | string | Menu item display text |
| `${iconCss}` | string | Icon CSS class |
| `${id}` | string | Unique menu item ID |
| `${separator}` | boolean | Is item a separator |

### Example 1: Template with Icons and Labels

**Controller:**

```csharp
var menuItems = new List<object>
{
    new
    {
        text = "Dashboard",
        iconCss = "e-icons e-dashboard",
        id = "dashboard"
    },
    new
    {
        text = "Settings",
        iconCss = "e-icons e-settings",
        id = "settings"
    },
    new
    {
        text = "Profile",
        iconCss = "e-icons e-profile",
        id = "profile"
    }
};

ViewBag.MenuItems = menuItems;
```

**View:**

```html
<ejs-menu id="menu" 
    items="ViewBag.MenuItems"
    template="<span class='menu-icon ${iconCss}'></span><span class='menu-text'>${text}</span>">
</ejs-menu>

<style>
    .menu-icon {
        display: inline-block;
        margin-right: 8px;
        width: 20px;
        height: 20px;
    }
    
    .menu-text {
        display: inline-block;
        vertical-align: middle;
    }
</style>
```

### Example 2: Badge Template

Add notification badges to menu items:

```html
<ejs-menu id="menu" 
    items="ViewBag.MenuItems"
    template="<span>${text}</span><span class='badge'>${badge}</span>">
</ejs-menu>

<style>
    .badge {
        display: inline-block;
        background-color: #ff4444;
        color: white;
        border-radius: 10px;
        padding: 2px 6px;
        font-size: 11px;
        margin-left: 8px;
    }
</style>
```

## Menu Item Styling

### Styling Individual Items

Apply inline styles or classes to specific menu items:

```csharp
var menuItems = new List<object>
{
    new
    {
        text = "Home",
        htmlAttributes = new { @class = "home-item", title = "Go to Home" }
    },
    new
    {
        text = "Admin",
        htmlAttributes = new { @class = "admin-item", style = "color: red;" }
    },
    new
    {
        text = "Settings",
        htmlAttributes = new { @class = "settings-item" }
    }
};
```

### Using htmlAttributes Property

The `htmlAttributes` property (MenuItemModel) allows custom HTML attributes:

```html
@{
    var menuItems = new List<object>
    {
        new
        {
            text = "Dashboard",
            htmlAttributes = new
            {
                data_analytics = "track",
                aria_label = "Dashboard Navigation"
            }
        }
    };
}

<ejs-menu id="menu" items="menuItems"></ejs-menu>
```

### CSS Class Styling

Define reusable item styling patterns:

```html
<style>
    /* Active/highlighted items */
    .menu-item-active {
        background-color: #e8f4f8;
        border-left: 3px solid #0066cc;
    }
    
    /* Disabled items */
    .menu-item-disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
    
    /* Warning/danger items */
    .menu-item-danger {
        color: #d32f2f;
        font-weight: bold;
    }
    
    /* Admin-only items */
    .menu-item-admin {
        background-color: #fff3e0;
    }
</style>
```

## Animation Configuration

The `animationSettings` property (MenuAnimationSettingsModel) controls how sub-menus open and close.

### Animation Properties

| Property | Type | Values | Description |
|----------|------|--------|-------------|
| `effect` | MenuEffect | None, SlideDown, ZoomIn, FadeIn | Animation type |
| `duration` | number | milliseconds | Animation duration |
| `easing` | string | CSS easing function | Animation timing |

### Default Animation Settings

```
Duration: 400ms
Easing: 'ease'
Effect: 'SlideDown'
```

### Custom Animation Example

```html
@{
    var animationSettings = new
    {
        effect = "ZoomIn",     // MenuEffect.ZoomIn
        duration = 300,
        easing = "ease-in-out"
    };
}

<ejs-menu id="menu" 
    items="menuItems"
    animationSettings="animationSettings">
</ejs-menu>
```

### Animation Effects

**SlideDown (Default):**
Sub-menu slides down from the parent item. Best for vertical menus.

```html
<ejs-menu id="menu" 
    items="menuItems"
    animationSettings='new { effect = "SlideDown", duration = 400 }'>
</ejs-menu>
```

**ZoomIn:**
Sub-menu zooms in from center. Modern, attention-grabbing effect.

```html
<ejs-menu id="menu" 
    items="menuItems"
    animationSettings='new { effect = "ZoomIn", duration = 300 }'>
</ejs-menu>
```

**FadeIn:**
Sub-menu fades in smoothly. Subtle, professional effect.

```html
<ejs-menu id="menu" 
    items="menuItems"
    animationSettings='new { effect = "FadeIn", duration = 350 }'>
</ejs-menu>
```

**None:**
No animation. Instant sub-menu display.

```html
<ejs-menu id="menu" 
    items="menuItems"
    animationSettings='new { effect = "None" }'>
</ejs-menu>
```

### Easing Functions

Common CSS easing values:
- `linear` - Constant speed
- `ease` - Slow start and end
- `ease-in` - Slow start
- `ease-out` - Slow end
- `ease-in-out` - Slow start and end
- `cubic-bezier(x, y, z, w)` - Custom timing

```html
@{
    var smoothAnimation = new
    {
        effect = "FadeIn",
        duration = 500,
        easing = "cubic-bezier(0.25, 0.46, 0.45, 0.94)"
    };
}

<ejs-menu id="menu" 
    items="menuItems"
    animationSettings="smoothAnimation">
</ejs-menu>
```

## Advanced Styling Patterns

### Pattern 1: Multi-Theme Support

```html
@{
    string theme = ViewBag.Theme ?? "light";
}

<ejs-menu id="menu" 
    items="menuItems"
    cssClass="@($"menu-theme-{theme}")">
</ejs-menu>

<style>
    /* Light theme */
    .menu-theme-light.e-menu-wrapper {
        background-color: #ffffff;
        color: #333333;
    }
    
    /* Dark theme */
    .menu-theme-dark.e-menu-wrapper {
        background-color: #2d2d2d;
        color: #ffffff;
    }
    
    /* Both themes */
    .menu-theme-light .e-menu-item:hover,
    .menu-theme-dark .e-menu-item:hover {
        opacity: 0.8;
    }
</style>
```

### Pattern 2: Responsive Sizing

```html
<ejs-menu id="menu" 
    items="menuItems"
    cssClass="responsive-menu">
</ejs-menu>

<style>
    /* Desktop */
    .responsive-menu .e-menu-item {
        padding: 12px 20px;
        font-size: 14px;
    }
    
    /* Tablet */
    @media (max-width: 768px) {
        .responsive-menu .e-menu-item {
            padding: 10px 15px;
            font-size: 13px;
        }
    }
    
    /* Mobile */
    @media (max-width: 480px) {
        .responsive-menu .e-menu-item {
            padding: 8px 10px;
            font-size: 12px;
        }
    }
</style>
```

### Pattern 3: Gradient Background

```html
<ejs-menu id="menu" 
    items="menuItems"
    cssClass="gradient-menu">
</ejs-menu>

<style>
    .gradient-menu.e-menu-wrapper {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }
    
    .gradient-menu .e-menu-item {
        color: white;
    }
    
    .gradient-menu .e-menu-item:hover {
        background-color: rgba(255, 255, 255, 0.1);
    }
</style>
```

## Styling Best Practices

### 1. Use cssClass for Customization

Always use `cssClass` rather than modifying Syncfusion theme files directly:

```html
<!-- Good: Use cssClass -->
<ejs-menu id="menu" items="menuItems" cssClass="my-custom-menu"></ejs-menu>

<!-- Avoid: Modifying theme files -->
<!-- (Don't edit the CDN theme CSS) -->
```

### 2. Maintain Cascade Specificity

Proper CSS selectors ensure your styles apply correctly:

```css
/* Good: Specific selector -->
.custom-menu.e-menu-wrapper .e-menu-item { }

/* Avoid: Too generic -->
.e-menu-item { }  /* Affects all menus on page */
```

### 3. Test Theme Compatibility

Verify your custom styles work with chosen theme:

```csharp
// Test with different themes
var themes = new[] { "material", "bootstrap5", "tailwind" };
// Apply custom cssClass with each theme
```

### 4. Use Template for Complex Layouts

For dynamic or complex item content, templates are better than CSS-only styling:

```html
<!-- Good: Template for dynamic content -->
<ejs-menu id="menu" 
    items="menuItems"
    template="<strong>${text}</strong><span>${badge}</span>">
</ejs-menu>

<!-- Avoid: Complex CSS for same result -->
```

### 5. Document Custom Styles

Add comments explaining custom styling purpose:

```css
/* Custom menu styling for admin dashboard */
.admin-menu.e-menu-wrapper {
    background-color: #1a237e;
    border-bottom: 3px solid #5e35b1;
}

/* Highlight admin-only items */
.admin-menu .admin-item {
    font-weight: bold;
    background-color: rgba(255, 235, 59, 0.1);
}
```

---

**Related References:**
- [getting-started.md](getting-started.md) - Theme import details
- [api-reference.md](api-reference.md) - MenuAnimationSettingsModel reference
