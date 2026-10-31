# Icons, Navigation, and Customization

## Table of Contents
- [Adding Icons to Menu Items](#adding-icons-to-menu-items)
- [Using Syncfusion e-icons](#using-syncfusion-e-icons)
- [Navigation Links in Menu Items](#navigation-links-in-menu-items)
- [CSS Customization](#css-customization)
- [Hover Delay Configuration](#hover-delay-configuration)

## Adding Icons to Menu Items

The `iconCss` property allows you to display visual icons in menu items. This enhances UX by providing visual cues for menu commands.

**Property:** `iconCss` (string)

**Syntax:**
```csharp
new { text = "Cut", iconCss = "e-icons e-cut" }
```

**C# Data Binding Example:**
```csharp
MenuItems = new List<object>
{
    new { text = "Cut", iconCss = "e-icons e-cut", id = "cut" },
    new { text = "Copy", iconCss = "e-icons e-copy", id = "copy" }
};
```

**How It Works:**
1. The specified CSS classes are applied to an icon element within the menu item
2. The icon appears to the LEFT of the menu item text (default positioning)
3. Multiple CSS classes can be combined for icon styling

**Icon Placement:**
- Icons are positioned before (left of) menu text
- Icon element is rendered with default icon styling
- Icon container respects menu item padding and alignment

## Using Syncfusion e-icons

Syncfusion provides a built-in icon library accessible via the `e-icons` CSS class:

**Common Icon Classes:**
```csharp
// Editing Operations
new { text = "Cut", iconCss = "e-icons e-cut" },
new { text = "Copy", iconCss = "e-icons e-copy" },
new { text = "Paste", iconCss = "e-icons e-paste" },

// File Operations
new { text = "Save", iconCss = "e-icons e-save" },
new { text = "Delete", iconCss = "e-icons e-delete" },

// View Operations
new { text = "Zoom In", iconCss = "e-icons e-zoom-in" },
new { text = "Zoom Out", iconCss = "e-icons e-zoom-out" },

// Formatting
new { text = "Bold", iconCss = "e-icons e-bold" },
new { text = "Italic", iconCss = "e-icons e-italic" },
new { text = "Underline", iconCss = "e-icons e-underline" },

// Navigation
new { text = "Home", iconCss = "e-icons e-home" },
new { text = "Settings", iconCss = "e-icons e-settings" }
```

**Getting Icon Names:**
1. Visit [Syncfusion Icons Documentation](https://ej2.syncfusion.com/documentation/appearance/icons/) for complete icon list
2. Icon class format: `e-<icon-name>` (e.g., `e-cut`, `e-copy`, `e-save`)
3. Combine with `e-icons` base class: `e-icons e-cut`

**Complete Example:**
```csharp
MenuItems = new List<object>
{
    new { text = "Cut", iconCss = "e-icons e-cut" },
    new { text = "Copy", iconCss = "e-icons e-copy" },
    new { text = "Paste", iconCss = "e-icons e-paste" },
    new { separator = true },
    new { text = "Delete", iconCss = "e-icons e-delete" }
};
```

## Third-Party Icon Libraries

Use Font Awesome or other icon libraries:

**Font Awesome Example:**
```html
<!-- Ensure Font Awesome is included in your layout -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

```

**Bootstrap Icons Example:**
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css">

```

**Implementation Steps:**
1. Include third-party icon library stylesheet in `_Layout.cshtml`
2. Use appropriate icon class format in `iconCss` property
3. Verify icon class names match library documentation

## Navigation Links in Menu Items

The `url` property enables menu items to function as navigation links:

**Property:** `url` (string)

**Syntax:**
```csharp
new { text = "Home", url = "/home" },
new { text = "About", url = "/about" },
new { text = "Contact", url = "/contact" }
```

**C# Data Binding:**
```csharp
MenuItems = new List<object>
{
    new { text = "Dashboard", url = "/dashboard" },
    new { text = "Users", url = "/users" },
    new { text = "Reports", url = "/reports" },
    new { text = "Settings", url = "/settings" }
};
```

**Navigation Behavior:**
- Clicking a menu item with URL redirects to the specified page
- URL is wrapped in an anchor (`<a>`) tag within the menu item
- Supports relative paths (`/users`), absolute URLs (`https://example.com`), and hash routes
- New window navigation supported with anchor target attributes

**Advanced: Dynamic Navigation Based on Context**
```csharp
public List<object> GetContextMenuItems(string resourceType)
{
    var baseUrl = $"/api/{resourceType}";
    
    return new List<object>
    {
        new { text = "View", url = $"{baseUrl}/view" },
        new { text = "Edit", url = $"{baseUrl}/edit" },
        new { text = "Delete", url = $"{baseUrl}/delete" },
        new { text = "Share", url = $"{baseUrl}/share" }
    };
}
```

**Opening Links in New Window:**
Use `htmlAttributes` to add target="_blank":
```csharp
new { 
    text = "External Link", 
    url = "https://example.com",
    htmlAttributes = new { target = "_blank" }
}
```

## CSS Customization

Apply custom styling to the context menu using the `cssClass` property:

**Property:** `cssClass` (string)

**Syntax:**
```html
<ejs-contextmenu id="contextmenu" 
                 target="#target" 
                 cssClass="custom-theme dark-mode"
                 items="Model.MenuItems">
```

**Custom CSS:**
```css
/* Apply styles to the context menu wrapper */
.custom-theme {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
    border-radius: 8px;
}

.custom-theme .e-menu-item {
    color: white;
    font-weight: 500;
    padding: 12px 16px;
}

.custom-theme .e-menu-item:hover {
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 4px;
}

.custom-theme .e-separator {
    background-color: rgba(255, 255, 255, 0.3);
    margin: 4px 0;
}

/* Dark theme variant */
.dark-mode {
    background: #2d3748;
    border: 1px solid #1a202c;
}

.dark-mode .e-menu-item {
    color: #e2e8f0;
}

.dark-mode .e-menu-item:hover {
    background-color: #4a5568;
}
```

**Multiple Classes:**
Combine multiple CSS classes for composition:
```html
<ejs-contextmenu cssClass="context-menu primary-theme elevated"></ejs-contextmenu>
```

The classes are applied cumulatively to the context menu container.

## Hover Delay Configuration

The `hoverDelay` property controls the delay (in milliseconds) before a submenu appears on hover:

**Property:** `hoverDelay` (number, milliseconds)

**Syntax:**
```html
<ejs-contextmenu id="contextmenu" 
                 target="#target" 
                 hoverDelay="500" items="Model.MenuItems">
    <e-menu-items>
        <e-menu-item text="File">
            <e-menu-items>
                <e-menu-item text="New"></e-menu-item>
                <e-menu-item text="Open"></e-menu-item>
            </e-menu-items>
        </e-menu-item>
    </e-menu-items>
</ejs-contextmenu>
```

**C# Configuration:**
```html
<ejs-contextmenu id="contextmenu" 
                 target="#target" 
                 hoverDelay="800"
                 items="Model.MenuItems">
</ejs-contextmenu>
```

**Recommended Values:**
| Value (ms) | Use Case | UX Impact |
|----------|----------|----------|
| 0 | Immediate submenu | Fast navigation, may feel abrupt |
| 200-300 | Standard (default ~300) | Balanced, good control |
| 500-800 | Careful navigation | Prevents accidental submenu opens |
| 1000+ | Deliberate control | Very slow, feels unresponsive |

**Default Behavior:**
If not specified, the component uses a default hover delay (typically 300ms) to balance responsiveness and precision.

**Disabling Hover Opening:**
Use `showItemOnClick="true"` to disable hover opening entirely:
```html
<ejs-contextmenu showItemOnClick="true" items=\"Model.MenuItems\">
    <!-- Submenus open only on click, not hover -->
</ejs-contextmenu>
```

Combining with hover delay:
```html
<ejs-contextmenu hoverDelay=\"500\" showItemOnClick=\"false\" items=\"Model.MenuItems\">
    <!-- Hover opens submenus after 500ms delay -->
</ejs-contextmenu>
```

