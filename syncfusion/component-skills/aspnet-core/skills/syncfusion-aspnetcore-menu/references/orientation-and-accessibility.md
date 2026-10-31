# Orientation and Accessibility

## Table of Contents
- [Menu Orientation](#menu-orientation)
- [Horizontal Menu Implementation](#horizontal-menu-implementation)
- [Vertical Menu Implementation](#vertical-menu-implementation)
- [RTL Support (enableRtl)](#rtl-support-enablertl)
- [State Persistence](#state-persistence-enablepersistence)
- [Menu Scrolling](#menu-scrolling-enablescrolling)
- [Hamburger Mode](#hamburger-mode-hamburgermode)
- [Hover Delay](#hover-delay-hoverdelay)
- [HTML Sanitization](#html-sanitization-enablehtmlsanitizer)
- [Locale and Internationalization](#locale-and-internationalization)
- [Accessibility Best Practices](#accessibility-best-practices)

## Menu Orientation

The `orientation` property controls the layout direction of the menu: either horizontal (rows) or vertical (columns).

### Orientation Property

| Value | Description |
|-------|-------------|
| `Horizontal` | Menu items display in a horizontal row (navbar style) |
| `Vertical` | Menu items display in a vertical column (dropdown style, default) |

### Orientation Property Type

```csharp
public enum Orientation
{
    Horizontal,  // Row-based layout
    Vertical     // Column-based layout (default)
}
```

## Horizontal Menu Implementation

Horizontal menus display items in a single row, typically used for site navigation headers.

### Basic Horizontal Menu

```html
@{
    var menuItems = new List<object>
    {
        new { text = "Home" },
        new { text = "About" },
        new { text = "Products" },
        new { text = "Contact" }
    };
}

<ejs-menu id="menu" 
    items="menuItems"
    orientation="Horizontal">
</ejs-menu>
```

### Horizontal Menu with Sub-menus

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
        },
        new { text = "View" },
        new { text = "Help" }
    };
}

<ejs-menu id="menu" 
    items="menuItems"
    orientation="Horizontal">
</ejs-menu>
```

### Horizontal Menu with Icons

```html
@{
    var navMenu = new List<object>
    {
        new { text = "Dashboard", iconCss = "e-icons e-dashboard" },
        new
        {
            text = "Products",
            iconCss = "e-icons e-products",
            items = new List<object>
            {
                new { text = "Electronics" },
                new { text = "Fashion" },
                new { text = "Home & Garden" }
            }
        },
        new { text = "Services", iconCss = "e-icons e-services" },
        new { text = "Contact", iconCss = "e-icons e-phone" }
    };
}

<ejs-menu id="navbar" 
    items="navMenu"
    orientation="Horizontal"
    cssClass="navbar-menu">
</ejs-menu>

<style>
    .navbar-menu.e-menu-wrapper {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        padding: 0;
    }
    
    .navbar-menu .e-menu-wrapper .e-menu-item {
        color: white;
        padding: 12px 20px;
    }
    
    .navbar-menu .e-menu-item:hover {
        background-color: rgba(255, 255, 255, 0.2);
    }
</style>
```

## Vertical Menu Implementation

Vertical menus display items in a column. Sub-menus typically appear to the right of parent items.

### Basic Vertical Menu

```html
@{
    var menuItems = new List<object>
    {
        new { text = "File" },
        new { text = "Edit" },
        new { text = "View" },
        new { text = "Tools" },
        new { text = "Help" }
    };
}

<ejs-menu id="menu" items="menuItems"></ejs-menu>
<!-- Note: Vertical is default, orientation="Vertical" is optional -->
```

### Vertical Menu with Nested Items

```html
@{
    var sidebarMenu = new List<object>
    {
        new
        {
            text = "Dashboard",
            items = new List<object>
            {
                new { text = "Overview" },
                new { text = "Analytics" },
                new { text = "Reports" }
            }
        },
        new
        {
            text = "Administration",
            items = new List<object>
            {
                new { text = "Users" },
                new { text = "Roles" },
                new { text = "Permissions" }
            }
        }
    };
}

<ejs-menu id="sidebar" items="sidebarMenu"></ejs-menu>

<style>
    #sidebar {
        width: 250px;
        border-right: 1px solid #ddd;
    }
</style>
```

## RTL Support (enableRtl)

The `enableRtl` property enables right-to-left text direction for languages like Arabic, Hebrew, and Urdu.

### enableRtl Property

| Value | Type | Purpose |
|-------|------|---------|
| `true` | boolean | Enable RTL layout ("ar-AE", "he-IL", "ur-PK", etc.) |
| `false` | boolean | Default LTR layout |

### RTL Implementation

```html
@{
    var menuItems = new List<object>
    {
        new { text = "الصفحة الرئيسية" },  // Arabic: Home
        new { text = "حول" },              // Arabic: About
        new { text = "اتصل" }              // Arabic: Contact
    };
}

<ejs-menu id="menu" 
    items="menuItems"
    enableRtl="true"
    locale="ar-AE">
</ejs-menu>
```

### RTL with Sub-menus

```html
@{
    var arabicMenu = new List<object>
    {
        new
        {
            text = "ملف",  // File in Arabic
            items = new List<object>
            {
                new { text = "جديد" },     // New
                new { text = "فتح" },      // Open
                new { text = "حفظ" }       // Save
            }
        }
    };
}

<ejs-menu id="arabicMenu" 
    items="arabicMenu"
    enableRtl="true">
</ejs-menu>
```

### RTL with Icons

```html
<ejs-menu id="menu" 
    items="menuItems"
    enableRtl="true"
    cssClass="rtl-menu">
</ejs-menu>

<style>
    .rtl-menu.e-menu-wrapper {
        direction: rtl;
        text-align: right;
    }
    
    .rtl-menu .e-menu-item .e-icons {
        margin-left: 8px;  /* Right margin becomes left */
        margin-right: 0;
    }
</style>
```

## State Persistence (enablePersistence)

The `enablePersistence` property saves the menu's state between page reloads, maintaining the user's last menu position or selection.

### enablePersistence Property

| Value | Type | Purpose |
|-------|------|---------|
| `true` | boolean | Persist menu state in localStorage |
| `false` | boolean | No persistence (default) |

### enablePersistence Implementation

```html
@{
    var menuItems = new List<object>
    {
        new
        {
            text = "Settings",
            items = new List<object>
            {
                new { text = "General" },
                new { text = "Security" }
            }
        }
    };
}

<ejs-menu id="menu" 
    items="menuItems"
    enablePersistence="true">
</ejs-menu>
```

After the user expands a sub-menu, that state persists when the page is reloaded. The browser's localStorage stores the state.

### Persistent Menu with User Preferences

```html
<ejs-menu id="userMenu" 
    items="menuItems"
    enablePersistence="true"
    cssClass="user-preference-menu">
</ejs-menu>

<script>
    // Clear persistent state if needed
    function clearMenuState() {
        localStorage.removeItem("userMenu_persisted");
        location.reload();
    }
</script>

<button onclick="clearMenuState()">Reset Menu State</button>
```

## Menu Scrolling (enableScrolling)

The `enableScrolling` property enables scrollbars when menu content exceeds the available space.

### enableScrolling Property

| Value | Type | Purpose |
|-------|------|---------|
| `true` | boolean | Show scrollbars for overflow content |
| `false` | boolean | No scrolling (default)  |

### enableScrolling Implementation

```html
@{
    var longMenu = new List<object>();
    for (int i = 1; i <= 30; i++)
    {
        longMenu.Add(new { text = "Item " + i });
    }
}

<ejs-menu id="menu" 
    items="longMenu"
    enableScrolling="true"
    cssClass="scrollable-menu">
</ejs-menu>

<style>
    .scrollable-menu.e-menu-wrapper {
        max-height: 400px;
        overflow: auto;
    }
</style>
```

### Scrolling for Horizontal Menus

```html
<ejs-menu id="navbar" 
    items="wideMenuItems"
    orientation="Horizontal"
    enableScrolling="true">
</ejs-menu>

<style>
    #navbar {
        width: 100%;
        overflow-x: auto;
    }
</style>
```

## Hamburger Mode (hamburgerMode)

The `hamburgerMode` property enables a responsive hamburger/mobile menu toggle, typically for responsive design.

### hamburgerMode Property

| Value | Type | Purpose |
|-------|------|---------|
| `true` | boolean | Show hamburger icon for mobile/responsive mode |
| `false` | boolean | Standard menu display (default) |

### Basic Hamburger Menu

```html
@{
    var mobileMenu = new List<object>
    {
        new { text = "Dashboard" },
        new { text = "Settings" },
        new { text = "Profile" },
        new { text = "Logout" }
    };
}

<ejs-menu id="mobileMenu" 
    items="mobileMenu"
    hamburgerMode="true"
    target="#hamburgerTarget">
</ejs-menu>

<div id="hamburgerTarget"></div>
```

### Hamburger Menu with Title

```html
<ejs-menu id="menu" 
    items="menuItems"
    hamburgerMode="true"
    title="Navigation Menu"
    target="#menuToggle">
</ejs-menu>

<div id="menuToggle"></div>
```

### Responsive Hamburger Implementation

```html
@{
    var navMenu = new List<object>
    {
        new { text = "Home" },
        new { text = "About" },
        new { text = "Services" }
    };
}

<style>
    @media (max-width: 768px) {
        #mainMenu {
            display: none;  /* Hide on mobile */
        }
        
        #mobileMenu {
            display: block;  /* Show on mobile */
        }
    }
</style>

<ejs-menu id="mainMenu" 
    items="navMenu"
    orientation="Horizontal">
</ejs-menu>

<ejs-menu id="mobileMenu" 
    items="navMenu"
    hamburgerMode="true">
</ejs-menu>
```

## Hover Delay (hoverDelay)

The `hoverDelay` property controls the milliseconds delay before a sub-menu opens on hover.

### hoverDelay Property

| Property | Type | Range | Purpose |
|----------|------|-------|---------|
| `hoverDelay` | number | ms (milliseconds) | Delay before sub-menu opens |

### hoverDelay Implementation

**Slow Hover (500ms delay):**

```html
<ejs-menu id="menu" 
    items="menuItems"
    hoverDelay="500">
</ejs-menu>
```

**Fast Hover (100ms delay):**

```html
<ejs-menu id="menu" 
    items="menuItems"
    hoverDelay="100">
</ejs-menu>
```

**Default (No explicit delay, typically ~100-200ms):**

```html
<ejs-menu id="menu" 
    items="menuItems">
    <!-- hoverDelay defaults to standard delay -->
</ejs-menu>
```

## HTML Sanitization (enableHtmlSanitizer)

The `enableHtmlSanitizer` property sanitizes menu item HTML to prevent XSS (Cross-Site Scripting) attacks.

### enableHtmlSanitizer Property

| Value | Type | Purpose |
|-------|------|---------|
| `true` | boolean | Sanitize HTML content (secure, recommended) |
| `false` | boolean | Render HTML as-is (risky) |

### Safe HTML Sanitization

```html
@{
    var safeMenu = new List<object>
    {
        new { text = "<span class='highlight'>Home</span>" },
        new { text = "About" }
    };
}

<ejs-menu id="menu" 
    items="safeMenu"
    enableHtmlSanitizer="true">
</ejs-menu>
```

With `enableHtmlSanitizer="true"`, malicious scripts are filtered out.

## Locale and Internationalization

The `locale` property sets the language and regional formatting for the menu component.

### Locale Property

| Value | Purpose |
|-------|---------|
| `en-US` | English (United States, default) |
| `ar-AE` | Arabic (UAE) |
| `de-DE` | German (Germany) |
| `es-ES` | Spanish (Spain) |
| `fr-FR` | French (France) |
| `he-IL` | Hebrew (Israel) |
| `ja-JP` | Japanese (Japan) |
| `ur-PK` | Urdu (Pakistan) |
| `zh-CN` | Chinese (Simplified) |

### Locale Implementation

```html
<ejs-menu id="menu" 
    items="menuItems"
    locale="es-ES">
</ejs-menu>

<ejs-menu id="arabicMenu" 
    items="arabicMenuItems"
    locale="ar-AE"
    enableRtl="true">
</ejs-menu>
```

### Dynamic Locale Switching

```html
<select id="localeSelector" onchange="switchLocale(this.value)">
    <option value="en-US">English</option>
    <option value="ar-AE">Arabic</option>
    <option value="de-DE">German</option>
    <option value="es-ES">Spanish</option>
</select>

<ejs-menu id="menu" items="menuItems" locale="en-US"></ejs-menu>

<script>
    function switchLocale(newLocale) {
        // Update menu locale
        var menuInstance = document.getElementById('menu').ej2_instances[0];
        menuInstance.locale = newLocale;
        menuInstance.refresh();
    }
</script>
```

## Accessibility Best Practices

### 1. Use semantic HTML and ARIA attributes

Ensure menu structure is semantically correct:

```html
<ejs-menu id="menu" 
    items="menuItems">
</ejs-menu>
```

### 2. Keyboard Navigation

The Menu component supports keyboard navigation:
- **Arrow Keys**: Navigate between items
- **Enter**: Select item
- **Escape**: Close sub-menu

Test keyboard accessibility:

```html
<script>
    // Test keyboard navigation
    var menu = document.getElementById('menu');
    menu.addEventListener('keydown', function(e) {
        console.log('Key pressed: ' + e.key);
    });
</script>
```

### 3. Screen Reader Compatibility

Ensure menu items have descriptive labels:

```csharp
// Good: Clear text labels
new { text = "Dashboard Overview" }
new { text = "User Management" }

// Avoid: Vague labels
new { text = "Menu 1" }
new { text = "Menu 2" }
```

### 4. Color Contrast

Use sufficient color contrast for visibility:

```css
/* WCAG AA compliant (4.5:1 ratio) */
.menu-item {
    color: #333333;  /* Dark gray on light background */
    background-color: #ffffff;
}

/* Hover state */
.menu-item:hover {
    color: #1a1a1a;
    background-color: #f0f0f0;
}
```

### 5. Test with Assistive Technologies

- Test with screen readers (NVDA, JAWS)
- Verify keyboard-only navigation
- Check color contrast with accessibility tools
- Test with browser zoom at 200%

### 6. Accessibility Compliance Example

```html
<ejs-menu id="accessibleMenu" 
    items="menuItems"
    enableRtl="false"
    cssClass="accessible-menu">
</ejs-menu>

<style>
    .accessible-menu.e-menu-wrapper {
        font-size: 16px;  /* Readable size */
        line-height: 1.5;
    }
    
    .accessible-menu .e-menu-item {
        padding: 12px 16px;  /* Large touch targets */
        color: #1a1a1a;
        background: #ffffff;
    }
    
    .accessible-menu .e-menu-item:hover,
    .accessible-menu .e-menu-item:focus {
        background-color: #e8e8e8;
        outline: 2px solid #4a90e2;
    }
</style>
```

---

**Related References:**
- [getting-started.md](getting-started.md) - Theme and CSS basics
- [api-reference.md](api-reference.md) - Complete property reference
