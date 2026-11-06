# Icons, Sub-menus, and Hierarchy

## Table of Contents
- [Adding Icons with iconCss](#adding-icons-with-iconcss)
- [Creating Sub-menus](#creating-sub-menus)
- [Multi-Level Hierarchies](#multi-level-hierarchies)
- [Separator Items](#separator-items)
- [Complex Menu Structures](#complex-menu-structures)
- [Icon Libraries](#icon-libraries)
- [Best Practices](#best-practices)

## Adding Icons with iconCss

Icons provide visual cues for menu items, making navigation more intuitive. The `iconCss` property accepts CSS class names for icon rendering.

### iconCss Property

The `iconCss` property (available in MenuItemModel) specifies CSS classes for displaying icons:

```csharp
new
{
    text = "Home",
    iconCss = "e-icons e-home"  // CSS class for home icon
}
```

### Basic Icon Implementation

```html
@{
    var menuItems = new List<object>
    {
        new
        {
            text = "Dashboard",
            iconCss = "e-icons e-dashboard"
        },
        new
        {
            text = "Settings",
            iconCss = "e-icons e-settings"
        },
        new
        {
            text = "User Profile",
            iconCss = "e-icons e-user"
        },
        new
        {
            text = "Help",
            iconCss = "e-icons e-help"
        }
    };
}

<ejs-menu id="menu" items="menuItems"></ejs-menu>
```

### Syncfusion Included Icons

The Syncfusion `e-icons` class library includes common icon classes:

| Icon Class | Represents |
|------------|-----------|
| `e-home` | Home |
| `e-file` | File |
| `e-new` | New document |
| `e-open` | Open |
| `e-save` | Save |
| `e-cut` | Cut |
| `e-copy` | Copy |
| `e-paste` | Paste |
| `e-undo` | Undo |
| `e-redo` | Redo |
| `e-delete` | Delete |
| `e-settings` | Settings |
| `e-user` | User |
| `e-help` | Help |
| `e-close` | Close |
| `e-reload` | Reload |
| `e-maximize` | Maximize |
| `e-minimize` | Minimize |

### Custom Icon Classes

Use your own icon classes with Font Awesome, Bootstrap Icons, or Material Icons:

**Font Awesome:**

```html
@{
    var menuItems = new List<object>
    {
        new
        {
            text = "Home",
            iconCss = "fas fa-home"
        },
        new
        {
            text = "Settings",
            iconCss = "fas fa-cog"
        }
    };
}

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />

<ejs-menu id="menu" items="menuItems"></ejs-menu>
```

**Bootstrap Icons:**

```html
@{
    var menuItems = new List<object>
    {
        new
        {
            text = "Dashboard",
            iconCss = "bi bi-speedometer2"
        },
        new
        {
            text = "Settings",
            iconCss = " bi bi-gear"
        }
    };
}

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@latest/font/bootstrap-icons.css" />

<ejs-menu id="menu" items="menuItems"></ejs-menu>
```

**Material Icons:**

```html
@{
    var menuItems = new List<object>
    {
        new
        {
            text = "Home",
            iconCss = "material-icons"  // Requires inline span wrapping
        }
    };
}

<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />

<ejs-menu id="menu" items="menuItems"></ejs-menu>
```

### Icon Positioning

Icons are displayed by default at the left of the item text. Customize positioning with CSS:

```html
<style>
    /* Default: Icons on left */
    .e-menu-item .e-icons {
        margin-right: 8px;
    }
    
    /* Right-aligned icons */
    .right-icons .e-menu-item .e-icons {
        margin-right: 0;
        margin-left: 8px;
        order: 2;
    }
    
    /* Large icons */
    .large-icons .e-icons {
        font-size: 20px;
        width: 24px;
        height: 24px;
    }
</style>

<ejs-menu id="menu" items="menuItems" cssClass="right-icons"></ejs-menu>
```

## Creating Sub-menus

Sub-menus are nested menu items displayed when user hovers or clicks a parent item. Use the `items` property (MenuItemModel) for sub-menu arrays.

### Basic Sub-menu Structure

```html
@{
    var menuItems = new List<object>
    {
        new
        {
            text = "File",
            items = new List<object>
            {
                new { text = "New" },
                new { text = "Open" },
                new { text = "Save" }
            }
        },
        new
        {
            text = "Edit",
            items = new List<object>
            {
                new { text = "Cut" },
                new { text = "Copy" },
                new { text = "Paste" }
            }
        }
    };
}

<ejs-menu id="menu" items="menuItems"></ejs-menu>
```

### Sub-menus with Icons

Combine icons with sub-menus for enhanced visual clarity:

```html
@{
    var menuItems = new List<object>
    {
        new
        {
            text = "File",
            iconCss = "e-icons e-file",
            items = new List<object>
            {
                new { text = "New", iconCss = "e-icons e-new" },
                new { text = "Open", iconCss = "e-icons e-open" },
                new { text = "Save", iconCss = "e-icons e-save" },
                new { text = "Save As..." },
                new { text = "Close" }
            }
        },
        new
        {
            text = "Edit",
            iconCss = "e-icons e-edit",
            items = new List<object>
            {
                new { text = "Undo", iconCss = "e-icons e-undo" },
                new { text = "Redo", iconCss = "e-icons e-redo" },
                new { text = "Cut", iconCss = "e-icons e-cut" },
                new { text = "Copy", iconCss = "e-icons e-copy" },
                new { text = "Paste", iconCss = "e-icons e-paste" }
            }
        }
    };
}

<ejs-menu id="menu" items="menuItems"></ejs-menu>
```

### Sub-menu Positioning Control

Use `showItemOnClick` property to control sub-menu opening:

```html
<!-- Sub-menus open on hover (default) -->
<ejs-menu id="menu" 
    items="menuItems"
    showItemOnClick="false">
</ejs-menu>

<!-- Sub-menus open on click -->
<ejs-menu id="menu" 
    items="menuItems"
    showItemOnClick="true">
</ejs-menu>
```

## Multi-Level Hierarchies

Create deeply nested menu structures for complex navigation.

### Two-Level Hierarchy (Parent → Child)

```html
@{
    var menuItems = new List<object>
    {
        new
        {
            text = "Dashboard",
            items = new List<object>
            {
                new { text = "Overview" },
                new { text = "Analytics" }
            }
        },
        new
        {
            text = "Content",
            items = new List<object>
            {
                new { text = "Pages" },
                new { text = "Posts" }
            }
        }
    };
}

<ejs-menu id="menu" items="menuItems"></ejs-menu>
```

### Three-Level Hierarchy (Parent → SubParent → Leaf)

```html
@{
    var menuItems = new List<object>
    {
        new
        {
            text = "Products",
            iconCss = "e-icons e-products",
            items = new List<object>
            {
                new
                {
                    text = "Electronics",
                    iconCss = "e-icons e-electronics",
                    items = new List<object>
                    {
                        new { text = "Computers" },
                        new { text = "Mobile Phones" },
                        new { text = "Tablets" }
                    }
                },
                new
                {
                    text = "Fashion",
                    iconCss = "e-icons e-fashion",
                    items = new List<object>
                    {
                        new { text = "Men's Clothing" },
                        new { text = "Women's Clothing" },
                        new { text = "Accessories" }
                    }
                },
                new
                {
                    text = "Home & Garden",
                    iconCss = "e-icons e-home",
                    items = new List<object>
                    {
                        new { text = "Furniture" },
                        new { text = "Decor" },
                        new { text = "Appliances" }
                    }
                }
            }
        }
    };
}

<ejs-menu id="menu" items="menuItems"></ejs-menu>
```

### Four-Level Hierarchy

```html
@{
    var menuItems = new List<object>
    {
        new
        {
            text = "Company",
            items = new List<object>
            {
                new
                {
                    text = "Departments",
                    items = new List<object>
                    {
                        new
                        {
                            text = "Engineering",
                            items = new List<object>
                            {
                                new { text = "Backend" },
                                new { text = "Frontend" },
                                new { text = "DevOps" }
                            }
                        },
                        new
                        {
                            text = "Sales",
                            items = new List<object>
                            {
                                new { text = "Enterprise" },
                                new { text = "SMB" },
                                new { text = "Startups" }
                            }
                        }
                    }
                }
            }
        }
    };
}

<ejs-menu id="menu" items="menuItems"></ejs-menu>
```

## Separator Items

Separators visually group related menu items. Use the `separator` property (boolean) to create divider lines.

### Basic Separator Usage

```html
@{
    var menuItems = new List<object>
    {
        new { text = "New" },
        new { text = "Open" },
        new { text = "Save" },
        new { separator = true },  // Divider line
        new { text = "Exit" }
    };
}

<ejs-menu id="menu" items="menuItems"></ejs-menu>
```

### Separators in Sub-menus

```html
@{
    var menuItems = new List<object>
    {
        new
        {
            text = "File",
            items = new List<object>
            {
                new { text = "New" },
                new { text = "Open" },
                new { separator = true },
                new { text = "Save" },
                new { text = "Save As" },
                new { separator = true },
                new { text = "Close" },
                new { text = "Exit" }
            }
        }
    };
}

<ejs-menu id="menu" items="menuItems"></ejs-menu>
```

### Separator Styling

Customize separator appearance with CSS:

```html
<style>
    /* Default separator (thin line) */
    .e-menu-separator {
        height: 1px;
        background-color: #e0e0e0;
    }
    
    /* Styled separator (thick, colored) */
    .styled-menu .e-menu-separator {
        height: 2px;
        background: linear-gradient(90deg, transparent, #666, transparent);
        margin: 8px 0;
    }
</style>

<ejs-menu id="menu" items="menuItems" cssClass="styled-menu"></ejs-menu>
```

## Complex Menu Structures

### Real-World Example: E-Commerce Menu

```html
@{
    var navigationMenu = new List<object>
    {
        new
        {
            text = "Home",
            iconCss = "e-icons e-home"
        },
        new
        {
            text = "Categories",
            iconCss = "e-icons e-categories",
            items = new List<object>
            {
                new { text = "Electronics" },
                new { text = "Fashion" },
                new { text = "Home & Garden" }
            }
        },
        new
        {
            text = "Deals",
            iconCss = "e-icons e-discount"
        },
        new { separator = true },
        new
        {
            text = "Account",
            iconCss = "e-icons e-user",
            items = new List<object>
            {
                new { text = "My Profile" },
                new { text = "Orders" },
                new { text = "Wishlist" },
                new { separator = true },
                new { text = "Settings" },
                new { text = "Logout" }
            }
        }
    };
}

<ejs-menu id="mainNav" items="navigationMenu"></ejs-menu>
```

### Real-World Example: Admin Dashboard Menu

```html
@{
    var adminMenu = new List<object>
    {
        new
        {
            text = "Dashboard",
            iconCss = "e-icons e-dashboard"
        },
        new
        {
            text = "Content Management",
            iconCss = "e-icons e-content",
            items = new List<object>
            {
                new { text = "Pages" },
                new { text = "Posts" },
                new { text = "Media Library" },
                new { text = "Categories" }
            }
        },
        new
        {
            text = "User Management",
            iconCss = "e-icons e-users",
            items = new List<object>
            {
                new { text = "Users" },
                new { text = "Roles" },
                new { text = "Permissions" },
                new { text = "Groups" }
            }
        },
        new { separator = true },
        new
        {
            text = "Settings",
            iconCss = "e-icons e-settings",
            items = new List<object>
            {
                new { text = "General" },
                new { text = "Security" },
                new { text = "Email" },
                new { text = "Backups" }
            }
        },
        new { separator = true },
        new
        {
            text = "Reports",
            iconCss = "e-icons e-reports",
            items = new List<object>
            {
                new { text = "Analytics" },
                new { text = "Traffic" },
                new { text = "Conversions" }
            }
        }
    };
}

<ejs-menu id="adminMenu" items="adminMenu"></ejs-menu>
```

## Icon Libraries

### Syncfusion e-icons

Syncfusion includes a built-in icon set. Import required files:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ej2-base@latest/styles/material.css" />
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ej2-icons@latest/styles/ej2-icons.css" />
```

### Font Awesome Integration

```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />

@{
    var menuItems = new List<object>
    {
        new { text = "Home", iconCss = "fa-solid fa-home" },
        new { text = "Cart", iconCss = "fa-solid fa-shopping-cart" },
        new { text = "Settings", iconCss = "fa-solid fa-gear" }
    };
}

<ejs-menu id="menu" items="menuItems"></ejs-menu>
```

## Best Practices

### 1. Maintain Consistent Icon Style

Use icons from a single library throughout the menu:

```csharp
// Good: All Syncfusion icons
new { text = "Home", iconCss = "e-icons e-home" }
new { text = "About", iconCss = "e-icons e-info" }

// Avoid: Mixed icon libraries
new { text = "Home", iconCss = "e-icons e-home" }
new { text = "About", iconCss = "fa-solid fa-info" }  // Different library
```

### 2. Provide Icons for All Items in a Level

For consistency, either provide icons for all items or none:

```csharp
// Good: All parent items have icons
new
{
    text = "File",
    iconCss = "e-icons e-file",
    items = new List<object> { /* ... */ }
},
new
{
    text = "Edit",
    iconCss = "e-icons e-edit",
    items = new List<object> { /* ... */ }
}

// Avoid: Mixed icons
new
{
    text = "File",
    iconCss = "e-icons e-file"
},
new
{
    text = "Edit"  // No icon
}
```

### 3. Limit Nesting Depth

Keep hierarchy to 2-3 levels for better usability:

```csharp
// Good: 3 levels maximum
// Level 1: File
//   Level 2: Open
//     Level 3: Recent Files

// Avoid: 4+ levels (difficult to navigate)
```

### 4. Use Separators Wisely

Group related items with separators, not excess separators:

```csharp
// Good: Logical grouping
new { text = "New" },
new { text = "Open" },
new { text = "Save" },
new { separator = true },  // Logical break
new { text = "Exit" }

// Avoid: Excessive separators
new { text = "New" },
new { separator = true },
new { text = "Open" },
new { separator = true },
new { text = "Save" }
```

### 5. Test Accessibility

Ensure icons have semantic meaning with text labels:

```csharp
// Good: Icon + text combination
new { text = "Settings", iconCss = "e-icons e-settings" }

// Less ideal: Icon-only (test for screen readers)
new { text = "", iconCss = "e-icons e-settings" }
```

---

**Related References:**
- [menu-items-and-data-binding.md](menu-items-and-data-binding.md) - Item structure details
- [customization-and-styling.md](customization-and-styling.md) - Styling icons and separators
- [api-reference.md](api-reference.md) - MenuItemModel icon properties
