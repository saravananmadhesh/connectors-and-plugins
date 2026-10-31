# AppBar Positioning and Layout

## Table of Contents
- [Overview](#overview)
- [Position Property](#position-property)
- [Top Positioning](#top-positioning)
- [Bottom Positioning](#bottom-positioning)
- [Sticky Positioning](#sticky-positioning)
- [Combining Position with isSticky](#combining-position-with-issticky)
- [Responsive Positioning](#responsive-positioning)
- [Use Case Examples](#use-case-examples)
- [Common Patterns](#common-patterns)
- [Troubleshooting](#troubleshooting)

## Overview

The AppBar component provides flexible positioning options to accommodate different navigation patterns and application layouts. You can position the AppBar at the top or bottom of your page, and optionally make it sticky to remain visible during scrolling.

**Positioning Options:**
- **Top** (default): AppBar appears at the top of the page
- **Bottom**: AppBar appears at the bottom of the page
- **Sticky**: AppBar remains fixed during page scrolling

The positioning behavior is controlled by:
1. `position` property (Top or Bottom)
2. `isSticky` property (enables fixed positioning)

## Position Property

The `position` property controls where the AppBar is placed on the page. The AppBarPosition enum defines available options.

### Position Values

| Value | Description | Use Case |
|-------|-------------|----------|
| `Top` | Default position at the top | Primary navigation, main header |
| `Bottom` | Positioned at the bottom | Mobile bottom navigation, action bars |

### Default Behavior

If the `position` property is not specified, the AppBar defaults to **Top** positioning:

```html
<!-- Explicit Top positioning -->
<ejs-appbar id="topAppBar" position="Top">
    <e-content-template>
        <!-- Content -->
    </e-content-template>
</ejs-appbar>

<!-- Implicit Top positioning (property omitted) -->
<ejs-appbar id="defaultAppBar">
    <e-content-template>
        <!-- Content -->
    </e-content-template>
</ejs-appbar>
```

Both examples above render the AppBar at the top.

## Top Positioning

Top positioning places the AppBar at the top of the page or container. This is the most common and default positioning for primary navigation.

### Top AppBar Characteristics

- **Default Position**: Does not require explicit `position="Top"` setting
- **Layout Impact**: Pushes page content below the AppBar
- **Use**: Primary navigation, application headers, branding areas
- **Best For**: Desktop and mobile layouts where top navigation is standard

### Top AppBar Example: Primary Navigation

```html
<ejs-appbar id="topAppBar" position="Top" colorMode="Primary">
    <e-content-template>
        <!-- Left: Logo/Home -->
        <span style="font-weight: bold; font-size: 16px;">My App</span>
        
        <!-- Center Navigation Links (custom implementation) -->
        <div style="margin-left: 20px;">
            <a href="/">Home</a> | 
            <a href="/about">About</a> | 
            <a href="/contact">Contact</a>
        </div>
        
        <!-- Right: User Actions -->
        <div class="e-appbar-spacer"></div>
        <ejs-button id="searchBtn" cssClass="e-inherit" iconCss="e-icons e-search"></ejs-button>
        <ejs-button id="notificationBtn" cssClass="e-inherit" iconCss="e-icons e-bell"></ejs-button>
        <ejs-button id="profileBtn" cssClass="e-inherit" content="Profile"></ejs-button>
    </e-content-template>
</ejs-appbar>

<!-- Page content appears below the AppBar -->
<div class="page-content">
    <h1>Welcome</h1>
    <p>Your page content here...</p>
</div>
```

### Top AppBar Example: With Menu Integration

```html
<ejs-appbar id="topWithMenu" position="Top" colorMode="Dark">
    <e-content-template>
        <!-- Menu Toggle Button -->
        <ejs-button id="menuToggle" iconCss="e-icons e-menu" cssClass="e-inherit" 
                     onclick="toggleMenu()"></ejs-button>
        
        <!-- App Title -->
        <span style="margin-left: 15px; color: white;">Dashboard</span>
        
        <!-- Spacer -->
        <div class="e-appbar-spacer"></div>
        
        <!-- User Menu -->
        <ejs-button id="userBtn" cssClass="e-inherit" 
                     content="User" iconCss="e-icons e-user"></ejs-button>
    </e-content-template>
</ejs-appbar>

<script>
    function toggleMenu() {
        // Sidebar toggle logic
    }
</script>
```

## Bottom Positioning

Bottom positioning places the AppBar at the bottom of the viewport. This pattern is popular in mobile applications for thumb-friendly action access.

### Bottom AppBar Characteristics

- **Position Setting**: Requires explicit `position="Bottom"`
- **CSS Layout**: Uses CSS positioning to fix AppBar at bottom
- **Use**: Mobile navigation, action bars, floating footers
- **Best For**: Touch-based applications, mobile-first designs

### Bottom AppBar Example: Mobile Navigation

```html
<ejs-appbar id="bottomAppBar" position="Bottom" colorMode="Primary">
    <e-content-template>
        <!-- Home Tab -->
        <ejs-button id="homeBtn" cssClass="e-inherit" iconCss="e-icons e-home" 
                     aria-label="home"></ejs-button>
        
        <!-- Search Tab -->
        <ejs-button id="searchBtn" cssClass="e-inherit" iconCss="e-icons e-search" 
                     aria-label="search"></ejs-button>
        
        <!-- Add Tab (Center) -->
        <ejs-button id="addBtn" cssClass="e-inherit" iconCss="e-icons e-plus" 
                     aria-label="add"></ejs-button>
        
        <!-- Messages Tab -->
        <ejs-button id="messagesBtn" cssClass="e-inherit" iconCss="e-icons e-message" 
                     aria-label="messages"></ejs-button>
        
        <!-- Profile Tab -->
        <ejs-button id="profileBtn" cssClass="e-inherit" iconCss="e-icons e-profile" 
                     aria-label="profile"></ejs-button>
    </e-content-template>
</ejs-appbar>

<!-- Page content above the bottom AppBar -->
<div class="page-content" style="padding-bottom: 60px;">
    <!-- Content with padding to prevent overlap -->
</div>
```

### Bottom AppBar Example: Floating Action Area

```html
<ejs-appbar id="actionBar" position="Bottom" colorMode="Inherit" 
            cssClass="action-bar">
    <e-content-template>
        <span>Quick Actions</span>
        <div class="e-appbar-spacer"></div>
        <ejs-button id="saveBtn" cssClass="e-inherit" content="Save" 
                     iconCss="e-icons e-save"></ejs-button>
        <ejs-button id="cancelBtn" cssClass="e-inherit" content="Cancel" 
                     iconCss="e-icons e-close"></ejs-button>
    </e-content-template>
</ejs-appbar>

<style>
    .action-bar {
        background-color: #f5f5f5;
        border-top: 1px solid #ddd;
    }
</style>
```

## Sticky Positioning

Sticky positioning keeps the AppBar visible at the top or bottom while the user scrolls the page content. This is controlled by the `isSticky` property.

### Sticky Behavior

- **Property**: `isSticky="true"`
- **Effect**: AppBar remains fixed in viewport during scroll
- **Works With**: Both `position="Top"` and `position="Bottom"`
- **Use Case**: Persistent navigation, always-accessible actions

### Important: Content Padding

When using sticky AppBar, add padding to your page content to prevent overlap:

```html
<!-- Sticky AppBar at top -->
<ejs-appbar id="stickyTop" isSticky="true" position="Top">
    <e-content-template>
        <span>Sticky Navigation</span>
    </e-content-template>
</ejs-appbar>

<!-- Add padding to body or content container -->
<style>
    body {
        padding-top: 56px; /* AppBar height + buffer */
    }
</style>

<div class="page-content">
    <!-- Content scrolls, AppBar stays fixed -->
</div>
```

### Sticky AppBar Example: Top Navigation

```html
<ejs-appbar id="stickyNavbar" isSticky="true" position="Top" 
            colorMode="Primary" mode="Dense">
    <e-content-template>
        <!-- Logo -->
        <img src="logo.png" alt="Logo" style="height: 35px;">
        
        <!-- Navigation Menu (custom or Menu component) -->
        <div style="margin-left: 20px;">
            <a href="/">Home</a> | 
            <a href="/services">Services</a> | 
            <a href="/about">About</a>
        </div>
        
        <!-- Right Actions -->
        <div class="e-appbar-spacer"></div>
        <ejs-button cssClass="e-inherit" content="Sign In"></ejs-button>
    </e-content-template>
</ejs-appbar>

<style>
    body {
        padding-top: 48px; /* Dense mode AppBar height */
    }
</style>

<main class="page-content">
    <h1>Welcome</h1>
    <p>Scroll down while the AppBar remains visible...</p>
    <!-- Long content -->
</main>
```

### Sticky AppBar Example: Bottom Mobile Navigation

```html
<ejs-appbar id="stickyMobileNav" isSticky="true" position="Bottom" colorMode="Primary">
    <e-content-template>
        <ejs-button cssClass="e-inherit" iconCss="e-icons e-home"></ejs-button>
        <ejs-button cssClass="e-inherit" iconCss="e-icons e-search"></ejs-button>
        <div class="e-appbar-spacer"></div>
        <ejs-button cssClass="e-inherit" iconCss="e-icons e-cart"></ejs-button>
        <ejs-button cssClass="e-inherit" iconCss="e-icons e-user"></ejs-button>
    </e-content-template>
</ejs-appbar>

<style>
    body {
        padding-bottom: 56px; /* AppBar height */
    }
</style>

<div class="page-content">
    <!-- Scrollable content -->
</div>
```

## Combining Position with isSticky

You can combine the `position` and `isSticky` properties to create different layouts. The stickiness works regardless of position.

### Position + Sticky Combinations

| Position | isSticky | Result |
|----------|----------|--------|
| Top | false (default) | AppBar at top, scrolls with content |
| Top | true | AppBar fixed at top, content scrolls under |
| Bottom | false (default) | AppBar at bottom, scrolls with content |
| Bottom | true | AppBar fixed at bottom, content scrolls over |

### Example: Sticky Top with Bottom Action Bar

```html
<!-- Sticky navigation at top -->
<ejs-appbar id="headerNav" isSticky="true" position="Top" colorMode="Primary">
    <e-content-template>
        <span>My Website</span>
        <div class="e-appbar-spacer"></div>
        <ejs-button cssClass="e-inherit" content="Menu"></ejs-button>
    </e-content-template>
</ejs-appbar>

<!-- Scrollable content -->
<div class="page-content">
    <!-- Large content that scrolls -->
</div>

<!-- Sticky action bar at bottom -->
<ejs-appbar id="actionBar" isSticky="true" position="Bottom" colorMode="Inherit">
    <e-content-template>
        <span>Actions Available</span>
        <div class="e-appbar-spacer"></div>
        <ejs-button cssClass="e-inherit" content="Save"></ejs-button>
        <ejs-button cssClass="e-inherit" content="Cancel"></ejs-button>
    </e-content-template>
</ejs-appbar>

<style>
    body {
        padding-top: 56px;    /* Top AppBar */
        padding-bottom: 56px; /* Bottom AppBar */
    }
</style>
```

## Responsive Positioning

Combine positioning with CSS media queries to adapt layout for different screen sizes.

### Responsive Example: Top on Desktop, Bottom on Mobile

```html
<ejs-appbar id="responsiveAppBar" cssClass="responsive-appbar">
    <e-content-template>
        <ejs-button iconCss="e-icons e-menu" cssClass="e-inherit"></ejs-button>
        <span>App Title</span>
        <div class="e-appbar-spacer"></div>
        <ejs-button content="Sign In" cssClass="e-inherit"></ejs-button>
    </e-content-template>
</ejs-appbar>

<div class="page-content">
    <!-- Content -->
</div>

<style>
    /* Desktop: Top positioning */
    @media (min-width: 768px) {
        .responsive-appbar {
            position: fixed;
            top: 0;
            width: 100%;
            z-index: 1000;
        }
        
        body {
            padding-top: 56px;
        }
    }
    
    /* Mobile: Bottom positioning */
    @media (max-width: 767px) {
        .responsive-appbar {
            position: fixed;
            bottom: 0;
            width: 100%;
            z-index: 1000;
        }
        
        body {
            padding-bottom: 56px;
        }
    }
</style>
```

### Responsive Example: Sticky on Desktop, Normal on Mobile

```html
<ejs-appbar id="conditionalSticky" class="conditional-sticky">
    <e-content-template>
        <!-- AppBar content -->
    </e-content-template>
</ejs-appbar>

<style>
    /* Sticky on large screens */
    @media (min-width: 1024px) {
        .conditional-sticky {
            position: fixed;
            top: 0;
            width: 100%;
        }
    }
    
    /* Normal scroll on small screens -->
    @media (max-width: 1023px) {
        .conditional-sticky {
            position: relative;
        }
    }
</style>
```

## Use Case Examples

### E-Commerce: Product Detail Page

```html
<!-- Sticky header with navigation -->
<ejs-appbar id="productHeader" isSticky="true" position="Top" colorMode="Light">
    <e-content-template>
        <ejs-button iconCss="e-icons e-arrow-left" cssClass="e-inherit"></ejs-button>
        <span>Product Details</span>
        <div class="e-appbar-spacer"></div>
        <ejs-button iconCss="e-icons e-share" cssClass="e-inherit"></ejs-button>
        <ejs-button iconCss="e-icons e-heart" cssClass="e-inherit"></ejs-button>
    </e-content-template>
</ejs-appbar>

<!-- Product content scrolls under sticky header -->
<div class="product-details">
    <!-- Product images, description, etc. -->
</div>

<!-- Sticky bottom action bar -->
<ejs-appbar id="buyBar" isSticky="true" position="Bottom" colorMode="Primary">
    <e-content-template>
        <span>$99.99</span>
        <div class="e-appbar-spacer"></div>
        <ejs-button content="Add to Cart" cssClass="e-inherit"></ejs-button>
    </e-content-template>
</ejs-appbar>

<style>
    body { 
        padding-top: 56px; 
        padding-bottom: 56px;
    }
</style>
```

### Social Media Feed: Scrolling Navigation

```html
<!-- Fixed top navigation -->
<ejs-appbar id="feedNav" isSticky="true" position="Top" colorMode="Primary" mode="Dense">
    <e-content-template>
        <ejs-button content="Home" cssClass="e-inherit" iconCss="e-icons e-home"></ejs-button>
        <div class="e-appbar-spacer"></div>
        <span style="font-weight: bold;">Feed</span>
        <div class="e-appbar-spacer"></div>
        <ejs-button content="Explore" cssClass="e-inherit" iconCss="e-icons e-search"></ejs-button>
    </e-content-template>
</ejs-appbar>

<!-- Scrollable feed -->
<div class="feed-container">
    <!-- Feed items -->
</div>

<style>
    body { padding-top: 48px; } /* Dense mode height */
</style>
```

## Common Patterns

### Pattern 1: Dashboard with Top Navigation and Bottom Commands

```html
<ejs-appbar id="dashHeader" isSticky="true" position="Top">
    <!-- Header content -->
</ejs-appbar>

<div class="dashboard-content">
    <!-- Main content -->
</div>

<ejs-appbar id="dashCommands" isSticky="true" position="Bottom">
    <!-- Command buttons -->
</ejs-appbar>
```

### Pattern 2: Modal Dialog with Top Header AppBar

```html
<div class="modal-dialog">
    <ejs-appbar id="modalHeader" position="Top">
        <e-content-template>
            <span>Dialog Title</span>
            <div class="e-appbar-spacer"></div>
            <ejs-button iconCss="e-icons e-close" cssClass="e-inherit"></ejs-button>
        </e-content-template>
    </ejs-appbar>
    
    <div class="modal-body">
        <!-- Dialog content -->
    </div>
</div>
```

### Pattern 3: Responsive Single AppBar

```html
<ejs-appbar id="mainAppBar" class="main-appbar">
    <!-- Positioned and sized responsively via CSS -->
</ejs-appbar>

<style>
    @media (min-width: 768px) {
        .main-appbar { position: fixed; top: 0; }
        body { padding-top: 64px; }
    }
    
    @media (max-width: 767px) {
        .main-appbar { position: fixed; bottom: 0; }
        body { padding-bottom: 64px; }
    }
</style>
```

## Troubleshooting

### AppBar Overlaps Content

**Problem**: Page content appears behind or under the AppBar.

**Solution**: Add CSS padding to match AppBar height:
```css
body {
    padding-top: 56px;    /* For top AppBar */
    /* or */
    padding-bottom: 56px; /* For bottom AppBar */
}
```

### Sticky AppBar Not Staying Fixed

**Problem**: AppBar scrolls with page despite `isSticky="true"`.

**Solutions**:
1. Verify `isSticky="true"` is set on the component
2. Check for CSS `position` conflicts in parent elements
3. Ensure z-index is high enough: `style="z-index: 1000;"`

### Multiple AppBars Conflict

**Problem**: Multiple sticky AppBars overlap or cause layout issues.

**Solution**: Adjust padding for each:
```css
body {
    padding-top: 56px;    /* Top AppBar */
    padding-bottom: 56px; /* Bottom AppBar */
}
```

---

**Next Steps:**
- Explore sizing modes: [Sizing Modes Guide](sizing-modes.md)
- Customize colors: [Color Modes Guide](color-modes.md)
- Design complex layouts: [Design Patterns Guide](design-layouts.md)
