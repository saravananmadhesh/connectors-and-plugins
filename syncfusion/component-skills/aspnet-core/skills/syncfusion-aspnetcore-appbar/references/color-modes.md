# AppBar Color Modes and Theming

## Table of Contents
- [Overview](#overview)
- [ColorMode Property](#colormode-property)
- [Light Mode](#light-mode)
- [Dark Mode](#dark-mode)
- [Primary Mode](#primary-mode)
- [Inherit Mode](#inherit-mode)
- [Color Selection Guide](#color-selection-guide)
- [Nested Component Integration](#nested-component-integration)
- [Theme Customization](#theme-customization)
- [Use Case Examples](#use-case-examples)

## Overview

The AppBar component supports four color modes that control the visual appearance and contrast of the component. The color mode affects both the background color and the text/icon color for optimal readability.

**Available Color Modes:**
- **Light** (default): Light background with dark text
- **Dark**: Dark background with light text
- **Primary**: Brand color background with complementary text
- **Inherit**: Inherits colors from parent element

The color mode is controlled by the `colorMode` property using the AppBarColor enumeration. Additionally, nested components (buttons, menus, text boxes) inherit these colors when marked with the `e-inherit` CSS class.

## ColorMode Property

The `colorMode` property defines the color theme of the AppBar. This property accepts values from the AppBarColor enum.

### ColorMode Values

| Value | Background | Text Color | Best For |
|-------|-----------|-----------|----------|
| `Light` | Light gray | Dark/black | Default, professional |
| `Dark` | Dark gray/black | Light/white | High contrast, evening mode |
| `Primary` | Theme brand color | White/light | Branding, emphasis |
| `Inherit` | Parent element color | Inherited | Custom styling, flexibility |

### Default Behavior

If the `colorMode` property is not specified, the AppBar defaults to **Light** mode:

```html
<!-- Explicit Light mode -->
<ejs-appbar id="lightAppBar" colorMode="Light">
    <e-content-template>
        <!-- Light background content -->
    </e-content-template>
</ejs-appbar>

<!-- Implicit Light mode (property omitted) -->
<ejs-appbar id="defaultAppBar">
    <e-content-template>
        <!-- Light background content -->
    </e-content-template>
</ejs-appbar>
```

Both examples render with the default Light color mode.

## Light Mode

Light mode is the default color mode, providing a light background with dark text for standard, professional appearance. This is suitable for most applications and provides good contrast for accessibility.

### Light Mode Characteristics

- **Background**: Light gray/white background
- **Text**: Dark text for readability
- **Best For**: Professional applications, office tools, daytime use
- **Contrast**: WCAG AA compliant
- **Accessibility**: High contrast for readability

### Light Mode Example: Professional Application Header

```html
<ejs-appbar id="professionalAppBar" colorMode="Light">
    <e-content-template>
        <!-- Left: Logo -->
        <img src="company-logo.png" alt="Company Logo" style="height: 40px;">
        
        <!-- Center: Navigation -->
        <div style="margin-left: 30px;">
            <a href="/dashboard">Dashboard</a> | 
            <a href="/reports">Reports</a> | 
            <a href="/analytics">Analytics</a>
        </div>
        
        <!-- Right: Actions -->
        <div class="e-appbar-spacer"></div>
        <ejs-button content="Help" cssClass="e-inherit"></ejs-button>
        <ejs-button content="Sign Out" cssClass="e-inherit"></ejs-button>
    </e-content-template>
</ejs-appbar>
```

### Light Mode Example: Business Application

```html
<ejs-appbar id="businessApp" colorMode="Light" mode="Regular">
    <e-content-template>
        <!-- Application Name -->
        <span style="font-weight: bold; font-size: 16px;">Business Portal</span>
        
        <!-- Features -->
        <div style="margin-left: 50px;">
            <ejs-button content="Home" cssClass="e-inherit"></ejs-button>
            <ejs-button content="Modules" cssClass="e-inherit"></ejs-button>
            <ejs-button content="Reports" cssClass="e-inherit"></ejs-button>
        </div>
        
        <!-- User Section -->
        <div class="e-appbar-spacer"></div>
        <ejs-button iconCss="e-icons e-bell" cssClass="e-inherit" title="Notifications"></ejs-button>
        <ejs-button content="Settings" cssClass="e-inherit"></ejs-button>
    </e-content-template>
</ejs-appbar>
```

### When to Use Light Mode

- Corporate and business applications
- Standard web applications
- Office productivity tools
- Healthcare and professional services
- When minimizing visual dominance is desired

## Dark Mode

Dark mode provides a dark background with light text, ideal for reducing eye strain and providing high contrast in low-light environments.

### Dark Mode Characteristics

- **Background**: Dark gray/charcoal background
- **Text**: Light/white text
- **Best For**: Evening use, developer tools, gaming interfaces
- **Contrast**: WCAG AAA compliant (high contrast)
- **Accessibility**: Excellent for low-light conditions

### Dark Mode Example: Developer Dashboard

```html
<ejs-appbar id="devDashboard" colorMode="Dark">
    <e-content-template>
        <!-- Terminal-like header -->
        <span style="color: #00ff00; font-family: monospace;">$ MyApp v1.0</span>
        
        <!-- Navigation -->
        <div style="margin-left: 20px;">
            <ejs-button content="Code" cssClass="e-inherit"></ejs-button>
            <ejs-button content="Debug" cssClass="e-inherit"></ejs-button>
            <ejs-button content="Deploy" cssClass="e-inherit"></ejs-button>
        </div>
        
        <!-- Right: Status -->
        <div class="e-appbar-spacer"></div>
        <span style="color: #00ff00;">● Running</span>
        <ejs-button iconCss="e-icons e-settings" cssClass="e-inherit"></ejs-button>
    </e-content-template>
</ejs-appbar>

<style>
    body {
        background-color: #1e1e1e;
        color: #e0e0e0;
    }
</style>
```

### Dark Mode Example: Entertainment Application

```html
<ejs-appbar id="mediaPlayer" colorMode="Dark" mode="Dense" position="Bottom">
    <e-content-template>
        <!-- Now Playing -->
        <span style="color: #fff; font-size: 12px;">Now Playing: Song Title</span>
        
        <!-- Playback Controls -->
        <div class="e-appbar-spacer"></div>
        <ejs-button iconCss="e-icons e-previous" cssClass="e-inherit" title="Previous"></ejs-button>
        <ejs-button iconCss="e-icons e-play" cssClass="e-inherit" title="Play"></ejs-button>
        <ejs-button iconCss="e-icons e-next" cssClass="e-inherit" title="Next"></ejs-button>
        <ejs-button iconCss="e-icons e-volume" cssClass="e-inherit" title="Volume"></ejs-button>
    </e-content-template>
</ejs-appbar>
```

### Dark Mode Example: Creative Tool Interface

```html
<ejs-appbar id="creativeTools" colorMode="Dark" mode="Regular">
    <e-content-template>
        <!-- Tool Name -->
        <span style="font-weight: bold; color: #fff;">Design Studio</span>
        
        <!-- Canvas Tools -->
        <div style="margin-left: 30px;">
            <ejs-button iconCss="e-icons e-pencil" cssClass="e-inherit" title="Draw"></ejs-button>
            <ejs-button iconCss="e-icons e-text" cssClass="e-inherit" title="Text"></ejs-button>
            <ejs-button iconCss="e-icons e-square" cssClass="e-inherit" title="Shapes"></ejs-button>
        </div>
        
        <!-- File Operations -->
        <div class="e-appbar-spacer"></div>
        <ejs-button content="Save" cssClass="e-inherit"></ejs-button>
        <ejs-button content="Export" cssClass="e-inherit"></ejs-button>
    </e-content-template>
</ejs-appbar>
```

### When to Use Dark Mode

- Developer tools and IDEs
- Media players and entertainment
- Creative applications (design, video editing)
- Evening/night-time applications
- Low-light environment optimization
- Reducing eye strain for extended use

## Primary Mode

Primary mode uses the application's brand color (typically defined in the Syncfusion theme), providing a branded appearance that reinforces application identity.

### Primary Mode Characteristics

- **Background**: Brand primary color
- **Text**: Complementary white or light text
- **Best For**: Branding, emphasis, marketing applications
- **Visual Impact**: High emphasis and recognition
- **Customization**: Respects theme color settings

### Primary Mode Example: E-Commerce Header

```html
<ejs-appbar id="ecommerceHeader" colorMode="Primary" mode="Regular">
    <e-content-template>
        <!-- Logo/Brand -->
        <span style="font-weight: bold; font-size: 18px; color: white;">ShopHub</span>
        
        <!-- Search Bar -->
        <div style="margin-left: 30px; width: 300px;">
            <input type="text" placeholder="Search products..." 
                   style="width: 100%; padding: 6px 10px; border-radius: 4px; border: none;">
        </div>
        
        <!-- Right: Shopping Cart and Account -->
        <div class="e-appbar-spacer"></div>
        <ejs-button iconCss="e-icons e-cart" cssClass="e-inherit"></ejs-button>
        <ejs-button content="My Account" cssClass="e-inherit"></ejs-button>
    </e-content-template>
</ejs-appbar>
```

### Primary Mode Example: Social Media Platform

```html
<ejs-appbar id="socialAppBar" colorMode="Primary" mode="Regular" isSticky="true" position="Top">
    <e-content-template>
        <!-- Platform Logo/Name -->
        <span style="font-weight: bold; font-size: 18px;">SocialNet</span>
        
        <!-- Navigation -->
        <div style="margin-left: 30px;">
            <ejs-button content="Home" cssClass="e-inherit"></ejs-button>
            <ejs-button content="Explore" cssClass="e-inherit"></ejs-button>
            <ejs-button content="Messages" cssClass="e-inherit"></ejs-button>
        </div>
        
        <!-- Right: Notifications and Profile -->
        <div class="e-appbar-spacer"></div>
        <ejs-button iconCss="e-icons e-notification" cssClass="e-inherit"></ejs-button>
        <ejs-button content="Profile" cssClass="e-inherit"></ejs-button>
    </e-content-template>
</ejs-appbar>

<style>
    body { padding-top: 56px; }
</style>
```

### Primary Mode Example: SaaS Application

```html
<ejs-appbar id="saasApp" colorMode="Primary" mode="Regular">
    <e-content-template>
        <!-- Product Name -->
        <img src="product-icon.png" alt="Product" style="height: 35px; margin-right: 10px;">
        <span style="font-weight: bold; font-size: 16px;">Analytics Pro</span>
        
        <!-- Main Navigation -->
        <div style="margin-left: 40px;">
            <ejs-button content="Dashboard" cssClass="e-inherit"></ejs-button>
            <ejs-button content="Reports" cssClass="e-inherit"></ejs-button>
            <ejs-button content="Data" cssClass="e-inherit"></ejs-button>
            <ejs-button content="Insights" cssClass="e-inherit"></ejs-button>
        </div>
        
        <!-- Right: Organization and User -->
        <div class="e-appbar-spacer"></div>
        <ejs-button content="Organization" cssClass="e-inherit"></ejs-button>
        <ejs-button content="User" cssClass="e-inherit"></ejs-button>
    </e-content-template>
</ejs-appbar>
```

### When to Use Primary Mode

- Brand-focused applications
- Marketing and promotional platforms
- SaaS products emphasizing branding
- E-commerce platforms
- Applications where brand identity is critical
- When visual emphasis is needed

## Inherit Mode

Inherit mode allows the AppBar to inherit colors from its parent element, providing maximum flexibility for custom styling and theme integration.

### Inherit Mode Characteristics

- **Background**: Inherited from parent CSS
- **Text**: Inherited from parent CSS
- **Best For**: Custom styling, flexible theming, component integration
- **Flexibility**: Full control over appearance
- **Use Case**: When AppBar colors need to match specific design requirements

### Inherit Mode Example: Nested Component Integration

```html
<!-- Outer container with custom styling -->
<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px;">
    
    <!-- AppBar inherits container's background -->
    <ejs-appbar id="inheritAppBar" colorMode="Inherit">
        <e-content-template>
            <span style="color: white; font-weight: bold;">Custom Themed Header</span>
            <div class="e-appbar-spacer"></div>
            <ejs-button content="Action" cssClass="e-inherit"></ejs-button>
        </e-content-template>
    </ejs-appbar>
    
</div>
```

### Inherit Mode Example: Context-Specific Styling

```html
<!-- Alert/Warning Section -->
<div style="background-color: #fff3cd; border-left: 4px solid #ffc107;">
    <ejs-appbar id="alertAppBar" colorMode="Inherit" cssClass="alert-appbar">
        <e-content-template>
            <span style="color: #856404; font-weight: bold;">⚠️ System Maintenance</span>
            <div class="e-appbar-spacer"></div>
            <ejs-button content="Learn More" cssClass="e-inherit"></ejs-button>
            <ejs-button content="Dismiss" cssClass="e-inherit"></ejs-button>
        </e-content-template>
    </ejs-appbar>
</div>

<style>
    .alert-appbar {
        border: none;
        box-shadow: none;
    }
</style>
```

### Inherit Mode Example: Success/Error States

```html
<!-- Success State AppBar -->
<ejs-appbar id="successAppBar" colorMode="Inherit" cssClass="success-appbar">
    <e-content-template>
        <span>✓ Operation completed successfully</span>
        <div class="e-appbar-spacer"></div>
        <ejs-button content="OK" cssClass="e-inherit"></ejs-button>
    </e-content-template>
</ejs-appbar>

<!-- Error State AppBar -->
<ejs-appbar id="errorAppBar" colorMode="Inherit" cssClass="error-appbar">
    <e-content-template>
        <span>✕ An error occurred</span>
        <div class="e-appbar-spacer"></div>
        <ejs-button content="Retry" cssClass="e-inherit"></ejs-button>
        <ejs-button content="Cancel" cssClass="e-inherit"></ejs-button>
    </e-content-template>
</ejs-appbar>

<style>
    .success-appbar {
        background-color: #d4edda;
        color: #155724;
    }
    
    .error-appbar {
        background-color: #f8d7da;
        color: #721c24;
    }
</style>
```

### When to Use Inherit Mode

- Custom component styling
- Flexible theming requirements
- Context-specific styling (alerts, states)
- Design system integration
- Component reusability across themes

## Color Selection Guide

### Decision Matrix

**Choose Light if:**
- Professional/corporate application
- Daytime primary use
- Standard web application
- Accessibility important

**Choose Dark if:**
- Developer tools or creative applications
- Evening/night usage expected
- Eye strain reduction needed
- High contrast required

**Choose Primary if:**
- Brand identity is critical
- Marketing/promotional app
- SaaS product emphasizing branding
- Visual emphasis needed

**Choose Inherit if:**
- Custom styling required
- Flexible theme integration
- Context-specific styling
- Component reusability needed

### Selection Flowchart

1. **Is brand identity critical?** → Yes → Use **Primary**
2. **Is custom styling needed?** → Yes → Use **Inherit**
3. **Is this a creative/developer tool?** → Yes → Use **Dark**
4. **Otherwise** → Use **Light** (default, professional)

## Nested Component Integration

The `e-inherit` CSS class enables nested components to inherit AppBar colors automatically.

### Using e-inherit CSS Class

Components inside AppBar inherit the parent AppBar colors when marked with `e-inherit`:

```html
<ejs-appbar id="integrationAppBar" colorMode="Primary">
    <e-content-template>
        <!-- These buttons inherit Primary color -->
        <ejs-button cssClass="e-inherit" content="Button 1"></ejs-button>
        <ejs-button cssClass="e-inherit" content="Button 2"></ejs-button>
        
        <!-- This button does NOT inherit (no e-inherit class) -->
        <ejs-button content="Different Color"></ejs-button>
    </e-content-template>
</ejs-appbar>
```

### Components Supporting e-inherit

The following components can inherit AppBar colors via `e-inherit` CSS class:
- `ejs-button` - Standard buttons
- `ejs-dropdown-button` - Dropdown buttons
- `ejs-menu` - Menu components
- `ejs-textbox` - Text input fields

### Example: Mixed Components with Inheritance

```html
<ejs-appbar id="mixedAppBar" colorMode="Dark">
    <e-content-template>
        <!-- Button inherits Dark theme -->
        <ejs-button cssClass="e-inherit" iconCss="e-icons e-menu"></ejs-button>
        
        <!-- Textbox inherits Dark theme -->
        <ejs-textbox placeholder="Search..." cssClass="e-inherit"></ejs-textbox>
        
        <!-- Spacer -->
        <div class="e-appbar-spacer"></div>
        
        <!-- Dropdown Menu inherits Dark theme -->
        <ejs-dropdownbutton cssClass="e-inherit" text="Options">
            <e-items>
                <e-item text="Option 1"></e-item>
                <e-item text="Option 2"></e-item>
            </e-items>
        </ejs-dropdownbutton>
    </e-content-template>
</ejs-appbar>
```

## Theme Customization

### Theme Files

Syncfusion provides multiple built-in themes that affect the Primary color:
- `fluent.css` - Microsoft Fluent theme
- `bootstrap5.css` - Bootstrap 5 theme
- `material.css` - Material Design theme
- `tailwind.css` - Tailwind CSS theme

### Applying Different Themes

Change the CSS file in `_Layout.cshtml` to switch themes:

```html
<!-- Material theme -->
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/20.4.34/material.css" />

<!-- Bootstrap 5 theme -->
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/20.4.34/bootstrap5.css" />

<!-- Tailwind theme -->
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/20.4.34/tailwind.css" />
```

The Primary color will automatically adapt to the selected theme.

## Use Case Examples

### Example 1: Multi-AppBar Design System

```html
<!-- Header: Light mode for professionalism -->
<ejs-appbar id="header" colorMode="Light">
    <e-content-template>
        <span>Acme Corp</span>
    </e-content-template>
</ejs-appbar>

<!-- Main Navigation: Primary for branding -->
<ejs-appbar id="mainNav" colorMode="Primary" mode="Dense">
    <e-content-template>
        <ejs-button content="Products" cssClass="e-inherit"></ejs-button>
        <ejs-button content="Services" cssClass="e-inherit"></ejs-button>
        <ejs-button content="Support" cssClass="e-inherit"></ejs-button>
    </e-content-template>
</ejs-appbar>

<!-- Content area -->
<div class="main-content">
    <!-- Page content -->
</div>

<!-- Footer: Dark mode for contrast -->
<ejs-appbar id="footer" colorMode="Dark" position="Bottom">
    <e-content-template>
        <span>© 2024 Acme Corp</span>
        <div class="e-appbar-spacer"></div>
        <ejs-button content="Privacy" cssClass="e-inherit"></ejs-button>
        <ejs-button content="Terms" cssClass="e-inherit"></ejs-button>
    </e-content-template>
</ejs-appbar>
```

### Example 2: Responsive Color Selection

```html
<ejs-appbar id="responsiveColor" class="responsive-color">
    <e-content-template>
        <span>Adaptive Colors</span>
    </e-content-template>
</ejs-appbar>

<style>
    <!-- Desktop: Primary branding -->
    @media (min-width: 1024px) {
        .responsive-color { background-color: var(--primary-color); }
    }
    
    <!-- Tablet: Light professional -->
    @media (min-width: 768px) and (max-width: 1023px) {
        .responsive-color { background-color: #f5f5f5; }
    }
    
    <!-- Mobile: Dark for battery saving -->
    @media (max-width: 767px) {
        .responsive-color { background-color: #2a2a2a; }
    }
</style>
```

---

**Next Steps:**
- Design complex layouts: [Design Patterns Guide](design-layouts.md)
- Explore positioning: [Positioning Guide](positioning.md)
- Customize further: [Customization Guide](customization.md)
