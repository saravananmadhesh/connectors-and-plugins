# AppBar Customization and Advanced Features

## Table of Contents
- [Overview](#overview)
- [CSS Class Customization](#css-class-customization)
- [HTML Attributes](#html-attributes)
- [Right-to-Left (RTL) Support](#right-to-left-rtl-support)
- [Component State Persistence](#component-state-persistence)
- [Locale and Internationalization](#locale-and-internationalization)
- [Advanced Styling Scenarios](#advanced-styling-scenarios)
- [Custom CSS Classes](#custom-css-classes)
- [Responsive Custom Styling](#responsive-custom-styling)
- [Edge Cases and Solutions](#edge-cases-and-solutions)

## Overview

The AppBar component provides several customization options beyond the core properties (position, mode, colorMode). This section covers CSS customization, HTML attributes, RTL support, state persistence, and localization features that enable advanced implementation scenarios.

**Customization Options:**
- `cssClass` - Apply custom CSS classes
- `htmlAttributes` - Add HTML attributes
- `enableRtl` - Right-to-left language support
- `enablePersistence` - State persistence between page reloads
- `locale` - Custom culture and localization

## CSS Class Customization

The `cssClass` property accepts space-separated CSS class names for custom styling and behavioral modifications.

### cssClass Property

```html
<!-- Single class -->
<ejs-appbar id="customAppBar" cssClass="my-custom-appbar">
    <e-content-template>
        <!-- Content -->
    </e-content-template>
</ejs-appbar>

<!-- Multiple classes -->
<ejs-appbar id="multiClass" cssClass="header elevated shadow-lg">
    <e-content-template>
        <!-- Content -->
    </e-content-template>
</ejs-appbar>
```

### Example 1: Custom Styling with Shadow

```html
<ejs-appbar id="shadowAppBar" colorMode="Light" cssClass="elevated-shadow">
    <e-content-template>
        <span>Elevated AppBar</span>
    </e-content-template>
</ejs-appbar>

<style>
    .elevated-shadow {
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        transition: box-shadow 0.3s ease;
    }
    
    .elevated-shadow:hover {
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
    }
</style>
```

### Example 2: Custom Border and Background

```html
<ejs-appbar id="customStyle" cssClass="custom-border gradient-bg">
    <e-content-template>
        <span>Custom Styled AppBar</span>
    </e-content-template>
</ejs-appbar>

<style>
    .custom-border {
        border-bottom: 3px solid #2196F3;
    }
    
    .gradient-bg {
        background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
        color: white;
    }
</style>
```

### Example 3: Animated Styling

```html
<ejs-appbar id="animatedAppBar" cssClass="fade-in slide-down">
    <e-content-template>
        <span>Animated Appearance</span>
    </e-content-template>
</ejs-appbar>

<style>
    @keyframes slideDown {
        from {
            transform: translateY(-100%);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    .slide-down {
        animation: slideDown 0.5s ease-out;
    }
</style>
```

### Example 4: Theme Variant Classes

```html
<!-- Success/Positive state -->
<ejs-appbar id="successAppBar" cssClass="state-success">
    <e-content-template>
        <span>✓ Success State</span>
    </e-content-template>
</ejs-appbar>

<!-- Warning state -->
<ejs-appbar id="warningAppBar" cssClass="state-warning">
    <e-content-template>
        <span>⚠ Warning State</span>
    </e-content-template>
</ejs-appbar>

<!-- Error state -->
<ejs-appbar id="errorAppBar" cssClass="state-error">
    <e-content-template>
        <span>✕ Error State</span>
    </e-content-template>
</ejs-appbar>

<style>
    .state-success {
        background-color: #d4edda;
        color: #155724;
        border-bottom: 3px solid #28a745;
    }
    
    .state-warning {
        background-color: #fff3cd;
        color: #856404;
        border-bottom: 3px solid #ffc107;
    }
    
    .state-error {
        background-color: #f8d7da;
        color: #721c24;
        border-bottom: 3px solid #dc3545;
    }
</style>
```

## HTML Attributes

The `htmlAttributes` property allows adding custom HTML attributes to the AppBar element for enhanced functionality and metadata.

### htmlAttributes Property

```html
<!-- Add data attributes for tracking -->
<ejs-appbar id="trackedAppBar" htmlAttributes="@(new Dictionary<string, object>
{
    { "data-page", "dashboard" },
    { "data-version", "2.0" },
    { "role", "banner" }
})">
    <e-content-template>
        <!-- Content -->
    </e-content-template>
</ejs-appbar>
```

### Example 1: Accessibility Attributes

```html
<ejs-appbar id="accessibleAppBar" htmlAttributes="@(new Dictionary<string, object>
{
    { "role", "banner" },
    { "aria-label", "Application header" },
    { "aria-level", "1" }
})">
    <e-content-template>
        <h1>Application Title</h1>
        <nav>
            <ejs-button content="Home" cssClass="e-inherit" aria-label="Go to home"></ejs-button>
            <ejs-button content="About" cssClass="e-inherit" aria-label="Learn about us"></ejs-button>
        </nav>
    </e-content-template>
</ejs-appbar>
```

### Example 2: Data Attributes for Analytics

```html
<ejs-appbar id="analyticsAppBar" htmlAttributes="@(new Dictionary<string, object>
{
    { "data-component", "appbar" },
    { "data-environment", "production" },
    { "data-tracking-id", "nav-001" }
})">
    <e-content-template>
        <span>Analytics Tracked AppBar</span>
    </e-content-template>
</ejs-appbar>

<script>
    document.addEventListener('DOMContentLoaded', function() {
        var appBar = document.getElementById('analyticsAppBar');
        if (appBar) {
            console.log('AppBar ID:', appBar.getAttribute('data-tracking-id'));
            console.log('Environment:', appBar.getAttribute('data-environment'));
        }
    });
</script>
```

### Example 3: Test Automation Attributes

```html
<ejs-appbar id="testableAppBar" htmlAttributes="@(new Dictionary<string, object>
{
    { "data-testid", "main-header" },
    { "data-cy", "app-bar" }
})">
    <e-content-template>
        <span>Test Automation Ready</span>
    </e-content-template>
</ejs-appbar>

<!-- Cypress test -->
<script>
    // cy.get('[data-cy=app-bar]').should('be.visible');
</script>
```

## Right-to-Left (RTL) Support

The `enableRtl` property enables right-to-left text direction for languages like Arabic, Hebrew, and Persian.

### enableRtl Property

```html
<!-- Enable RTL for Arabic content -->
<ejs-appbar id="rtlAppBar" enableRtl="true" colorMode="Primary">
    <e-content-template>
        <span>تطبيقي</span> <!-- "My App" in Arabic -->
        <div class="e-appbar-spacer"></div>
        <ejs-button content="تسجيل خروج" cssClass="e-inherit"></ejs-button> <!-- "Logout" in Arabic -->
    </e-content-template>
</ejs-appbar>
```

### Example 1: Arabic Application

```html
<!-- Dynamic RTL based on language -->
<ejs-appbar id="dynamicRTL" enableRtl="@(ViewBag.Language == "ar")" 
            colorMode="Primary">
    <e-content-template>
        <span style="font-weight: bold;">@ViewBag.AppTitle</span>
        <div style="margin-left: 30px;">
            <ejs-button content="@ViewBag.Home" cssClass="e-inherit"></ejs-button>
            <ejs-button content="@ViewBag.Products" cssClass="e-inherit"></ejs-button>
            <ejs-button content="@ViewBag.Contact" cssClass="e-inherit"></ejs-button>
        </div>
        <div class="e-appbar-spacer"></div>
        <ejs-button content="@ViewBag.SignIn" cssClass="e-inherit"></ejs-button>
    </e-content-template>
</ejs-appbar>
```

### Example 2: Hebrew Interface

```html
<ejs-appbar id="hebrewAppBar" enableRtl="true" colorMode="Dark">
    <e-content-template>
        <span>תחליף דוגמה</span> <!-- "Sample App" in Hebrew -->
        <div class="e-appbar-spacer"></div>
        <ejs-button content="התחברות" cssClass="e-inherit"></ejs-button> <!-- "Sign In" in Hebrew -->
    </e-content-template>
</ejs-appbar>
```

### CSS Adjustments for RTL

```html
<style>
    /* RTL specific styling -->
    [dir="rtl"] .appbar-icon {
        margin-right: 8px; <!-- Instead of margin-left -->
    }
    
    [dir="rtl"] .appbar-text {
        text-align: right;
    }
</style>
```

## Component State Persistence

The `enablePersistence` property enables automatic persistence of AppBar state between page reloads.

### enablePersistence Property

```html
<!-- Enable state persistence -->
<ejs-appbar id="persistentAppBar" enablePersistence="true">
    <e-content-template>
        <!-- Content -->
    </e-content-template>
</ejs-appbar>
```

### Example 1: Remembering AppBar State

```html
<ejs-appbar id="rememberState" enablePersistence="true" colorMode="Primary">
    <e-content-template>
        <span>State will be remembered</span>
        <div class="e-appbar-spacer"></div>
        <ejs-button id="themeToggle" content="Dark Mode" cssClass="e-inherit" 
                     onclick="toggleTheme()"></ejs-button>
    </e-content-template>
</ejs-appbar>

<script>
    function toggleTheme() {
        var appBar = document.getElementById('rememberState');
        var currentMode = appBar.getAttribute('data-theme') || 'light';
        var newMode = currentMode === 'light' ? 'dark' : 'light';
        appBar.setAttribute('data-theme', newMode);
        // State persists to localStorage automatically
    }
</script>
```

### Example 2: Preferences Across Sessions

```html
<!-- User preferences persisted -->
<ejs-appbar id="userPrefs" enablePersistence="true" 
            cssClass="@ViewBag.UserTheme">
    <e-content-template>
        <span>Preferences Preserved</span>
    </e-content-template>
</ejs-appbar>

<!-- When user returns, their theme preference is restored -->
```

## Locale and Internationalization

The `locale` property enables custom culture and localization settings for different languages and regions.

### locale Property

```html
<!-- French locale -->
<ejs-appbar id="frenchAppBar" locale="fr">
    <e-content-template>
        <span>Barre d'application</span>
    </e-content-template>
</ejs-appbar>

<!-- German locale -->
<ejs-appbar id="germanAppBar" locale="de">
    <e-content-template>
        <span>Anwendungsleiste</span>
    </e-content-template>
</ejs-appbar>

<!-- Spanish locale -->
<ejs-appbar id="spanishAppBar" locale="es">
    <e-content-template>
        <span>Barra de aplicaciones</span>
    </e-content-template>
</ejs-appbar>
```

### Example: Multi-Language Interface

```html
<!-- Dynamic locale based on user language -->
<ejs-appbar id="multiLangAppBar" locale="@ViewBag.UserLocale" colorMode="Primary">
    <e-content-template>
        <!-- Content adapts to locale -->
        <span>@ViewBag.AppTitle</span>
        <div class="e-appbar-spacer"></div>
        <ejs-button content="@ViewBag.Logout" cssClass="e-inherit"></ejs-button>
    </e-content-template>
</ejs-appbar>

<!-- Controller sets locale -->
<script>
    @{
        ViewBag.UserLocale = User.GetUserLanguage(); // e.g., "es", "fr", "de"
    }
</script>
```

## Advanced Styling Scenarios

### Scenario 1: Glassmorphism Effect

```html
<ejs-appbar id="glassmorphAppBar" cssClass="glassmorphism">
    <e-content-template>
        <span>Modern Glassmorphism</span>
    </e-content-template>
</ejs-appbar>

<style>
    .glassmorphism {
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
    }
</style>
```

### Scenario 2: Neumorphism Design

```html
<ejs-appbar id="neumorphAppBar" cssClass="neumorphism">
    <e-content-template>
        <span>Neumorphic Design</span>
    </e-content-template>
</ejs-appbar>

<style>
    .neumorphism {
        background: #e0e5ec;
        box-shadow: 9px 9px 16px #a3b1c6, -9px -9px 16px #ffffff;
    }
</style>
```

### Scenario 3: Material Design Elevation

```html
<ejs-appbar id="elevatedAppBar" cssClass="elevation-4">
    <e-content-template>
        <span>Material Design Elevation</span>
    </e-content-template>
</ejs-appbar>

<style>
    .elevation-4 {
        box-shadow: 0 2px 4px -1px rgba(0,0,0,.2),
                    0 4px 5px 0 rgba(0,0,0,.14),
                    0 1px 10px 0 rgba(0,0,0,.12);
    }
</style>
```

## Custom CSS Classes

### Combining Multiple Custom Classes

```html
<ejs-appbar id="multiClasses" cssClass="header premium elevated gradient-bg shadow-lg">
    <e-content-template>
        <span>Multi-Class Styling</span>
    </e-content-template>
</ejs-appbar>

<style>
    .header { padding: 0 20px; }
    .premium { border: 2px solid gold; }
    .elevated { position: fixed; top: 0; width: 100%; z-index: 1000; }
    .gradient-bg { background: linear-gradient(90deg, #667eea 0%, #764ba2 100%); }
    .shadow-lg { box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3); }
</style>
```

## Responsive Custom Styling

### Mobile-Specific Styling

```html
<ejs-appbar id="responsiveCustom" cssClass="adaptive-appbar">
    <e-content-template>
        <span>Responsive Custom</span>
    </e-content-template>
</ejs-appbar>

<style>
    /* Desktop -->
    @media (min-width: 1024px) {
        .adaptive-appbar {
            height: 64px;
            padding: 0 30px;
        }
    }
    
    <!-- Tablet -->
    @media (min-width: 768px) and (max-width: 1023px) {
        .adaptive-appbar {
            height: 56px;
            padding: 0 20px;
        }
    }
    
    <!-- Mobile -->
    @media (max-width: 767px) {
        .adaptive-appbar {
            height: 48px;
            padding: 0 10px;
        }
    }
</style>
```

## Edge Cases and Solutions

### Edge Case 1: Long Content Overflow

**Problem**: Content overflows AppBar boundaries.

**Solution**:
```html
<ejs-appbar id="overflowAppBar" cssClass="overflow-safe">
    <e-content-template>
        <span class="truncate">Very Long Application Title That Might Overflow</span>
        <div class="e-appbar-spacer"></div>
        <ejs-button content="Action" cssClass="e-inherit"></ejs-button>
    </e-content-template>
</ejs-appbar>

<style>
    .overflow-safe {
        overflow: hidden;
    }
    
    .truncate {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 300px;
    }
</style>
```

### Edge Case 2: Nested Forms in AppBar

**Problem**: Form controls conflict with AppBar styling.

**Solution**:
```html
<ejs-appbar id="formAppBar" cssClass="form-enabled">
    <e-content-template>
        <form>
            <input type="text" placeholder="Quick Search" 
                   class="appbar-input">
        </form>
        <div class="e-appbar-spacer"></div>
        <ejs-button content="Search" cssClass="e-inherit"></ejs-button>
    </e-content-template>
</ejs-appbar>

<style>
    .form-enabled form {
        display: flex;
        align-items: center;
        height: 100%;
    }
    
    .appbar-input {
        padding: 6px 12px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 14px;
    }
</style>
```

### Edge Case 3: AppBar with Dropdown Menu Alignment

**Problem**: Dropdown menus misaligned or cut off.

**Solution**:
```html
<ejs-appbar id="dropdownAppBar" cssClass="dropdown-safe">
    <e-content-template>
        <span>App</span>
        <div class="e-appbar-spacer"></div>
        <ejs-dropdownbutton cssClass="e-inherit" text="Menu">
            <e-items>
                <e-item text="Option 1"></e-item>
                <e-item text="Option 2"></e-item>
                <e-item text="Option 3"></e-item>
            </e-items>
        </ejs-dropdownbutton>
    </e-content-template>
</ejs-appbar>

<style>
    .dropdown-safe {
        position: fixed;
        top: 0;
        width: 100%;
        z-index: 999;
    }
    
    .dropdown-safe .e-dropdown {
        z-index: 1000; <!-- Above AppBar z-index -->
    }
</style>
```

### Edge Case 4: AppBar with Sticky Sidebar Conflict

**Problem**: Sticky AppBar and SideBar overlap.

**Solution**:
```html
<!-- Sticky AppBar -->
<ejs-appbar id="topBar" isSticky="true" cssClass="sticky-header">
    <e-content-template>
        <ejs-button id="sidebarBtn" iconCss="e-icons e-menu" cssClass="e-inherit"></ejs-button>
    </e-content-template>
</ejs-appbar>

<!-- Sidebar with offset -->
<ejs-sidebar id="sideNav" cssClass="sidebar-with-appbar">
    <!-- Sidebar content -->
</ejs-sidebar>

<!-- Main content with padding -->
<div id="content" class="main-with-appbar">
    <!-- Content -->
</div>

<style>
    .sticky-header {
        position: fixed;
        top: 0;
        width: 100%;
        z-index: 999;
    }
    
    .sidebar-with-appbar {
        top: 56px; <!-- Account for AppBar height -->
        height: calc(100vh - 56px);
    }
    
    .main-with-appbar {
        padding-top: 56px; <!-- Room for sticky AppBar -->
        margin-left: 0;
        transition: margin-left 0.3s ease;
    }
</style>
```

---

**Next Steps:**
- Review complete API reference: [API Reference](api-reference.md)
- Explore design patterns: [Design Patterns Guide](design-layouts.md)
- Return to skill overview: [SKILL.md](../SKILL.md)
