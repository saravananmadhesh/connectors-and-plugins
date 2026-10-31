# AppBar Design Patterns and Complex Layouts

## Table of Contents
- [Overview](#overview)
- [Layout Elements](#layout-elements)
- [Spacer Element](#spacer-element)
- [Separator Element](#separator-element)
- [Media Queries for Responsiveness](#media-queries-for-responsiveness)
- [Component Integration Patterns](#component-integration-patterns)
- [Menu Integration](#menu-integration)
- [Button and DropDownButton Integration](#button-and-dropdownbutton-integration)
- [SideBar Integration](#sidebar-integration)
- [Real-World Design Examples](#real-world-design-examples)
- [Advanced Layout Patterns](#advanced-layout-patterns)
- [Best Practices](#best-practices)

## Overview

The AppBar component provides layout elements (spacer, separator) and integration patterns for creating complex, professional navigation layouts. These patterns enable flexible content distribution, visual grouping, responsive design, and seamless integration with other Syncfusion components.

This guide covers design patterns used in production applications, including e-commerce platforms, dashboards, social media, and enterprise software.

## Layout Elements

### Spacer and Separator Elements

The AppBar supports two CSS-based layout elements:

| Element | Purpose | Type | Behavior |
|---------|---------|------|----------|
| **Spacer** | Push content to opposite sides | Div with `e-appbar-spacer` class | Flexible space (flex: 1) |
| **Separator** | Visual divider between content groups | Div with `e-appbar-separator` class | Fixed vertical line |

These elements are pure HTML/CSS, not components, making them lightweight and flexible.

## Spacer Element

The spacer element creates flexible spacing that distributes content evenly within the AppBar.

### Spacer Mechanics

The spacer uses CSS flexbox with `flex: 1` to consume available space:

```html
<ejs-appbar id="spacerExample">
    <e-content-template>
        <!-- Content on left -->
        <span>Left</span>
        
        <!-- Spacer pushes next content to right -->
        <div class="e-appbar-spacer"></div>
        
        <!-- Content on right -->
        <span>Right</span>
    </e-content-template>
</ejs-appbar>
```

### Spacer Example: Three-Section Layout

```html
<ejs-appbar id="threeSection" colorMode="Primary">
    <e-content-template>
        <!-- Left Section: Menu and Logo -->
        <ejs-button iconCss="e-icons e-menu" cssClass="e-inherit"></ejs-button>
        <span style="margin-left: 10px; font-weight: bold;">My App</span>
        
        <!-- Center Section: Navigation -->
        <div style="flex: 1; text-align: center; display: flex; justify-content: center; gap: 20px;">
            <ejs-button content="Home" cssClass="e-inherit"></ejs-button>
            <ejs-button content="Products" cssClass="e-inherit"></ejs-button>
            <ejs-button content="About" cssClass="e-inherit"></ejs-button>
        </div>
        
        <!-- Right Section: Actions -->
        <div class="e-appbar-spacer"></div>
        <ejs-button iconCss="e-icons e-search" cssClass="e-inherit"></ejs-button>
        <ejs-button content="Sign In" cssClass="e-inherit"></ejs-button>
    </e-content-template>
</ejs-appbar>
```

### Spacer Example: Logo Left, Actions Right

```html
<ejs-appbar id="logoRight" colorMode="Dark">
    <e-content-template>
        <!-- Left: Logo/Branding -->
        <img src="logo.png" alt="Logo" style="height: 40px;">
        <span style="margin-left: 15px; font-weight: bold; color: white;">Company</span>
        
        <!-- Spacer: Pushes actions to right -->
        <div class="e-appbar-spacer"></div>
        
        <!-- Right: User Actions -->
        <ejs-button content="Notifications" cssClass="e-inherit"></ejs-button>
        <ejs-button content="Settings" cssClass="e-inherit"></ejs-button>
        <ejs-button content="Logout" cssClass="e-inherit"></ejs-button>
    </e-content-template>
</ejs-appbar>
```

## Separator Element

The separator element creates a visual divider between content groups.

### Separator Mechanics

The separator is a vertical line that visually groups related items:

```html
<ejs-appbar id="separatorExample" colorMode="Light">
    <e-content-template>
        <!-- Group 1: Main Navigation -->
        <ejs-button content="Home" cssClass="e-inherit"></ejs-button>
        <ejs-button content="About" cssClass="e-inherit"></ejs-button>
        
        <!-- Visual Divider -->
        <div class="e-appbar-separator"></div>
        
        <!-- Group 2: User Actions -->
        <ejs-button content="Profile" cssClass="e-inherit"></ejs-button>
        <ejs-button content="Settings" cssClass="e-inherit"></ejs-button>
    </e-content-template>
</ejs-appbar>
```

### Separator Example: Multi-Group Navigation

```html
<ejs-appbar id="multiGroup" colorMode="Primary" mode="Regular">
    <e-content-template>
        <!-- Group 1: Navigation -->
        <ejs-button content="Dashboard" cssClass="e-inherit"></ejs-button>
        <ejs-button content="Reports" cssClass="e-inherit"></ejs-button>
        
        <!-- Separator -->
        <div class="e-appbar-separator"></div>
        
        <!-- Group 2: Content Filters -->
        <ejs-button content="All" cssClass="e-inherit"></ejs-button>
        <ejs-button content="Recent" cssClass="e-inherit"></ejs-button>
        <ejs-button content="Favorites" cssClass="e-inherit"></ejs-button>
        
        <!-- Spacer -->
        <div class="e-appbar-spacer"></div>
        
        <!-- Group 3: User -->
        <div class="e-appbar-separator"></div>
        <ejs-button iconCss="e-icons e-user" cssClass="e-inherit"></ejs-button>
    </e-content-template>
</ejs-appbar>
```

### Separator Example: Toolbar with Tool Groups

```html
<ejs-appbar id="toolbarAppBar" colorMode="Inherit" cssClass="toolbar">
    <e-content-template>
        <!-- File Operations -->
        <ejs-button iconCss="e-icons e-file" title="New" cssClass="e-inherit"></ejs-button>
        <ejs-button iconCss="e-icons e-open" title="Open" cssClass="e-inherit"></ejs-button>
        <ejs-button iconCss="e-icons e-save" title="Save" cssClass="e-inherit"></ejs-button>
        
        <!-- Separator -->
        <div class="e-appbar-separator"></div>
        
        <!-- Editing Tools -->
        <ejs-button iconCss="e-icons e-cut" title="Cut" cssClass="e-inherit"></ejs-button>
        <ejs-button iconCss="e-icons e-copy" title="Copy" cssClass="e-inherit"></ejs-button>
        <ejs-button iconCss="e-icons e-paste" title="Paste" cssClass="e-inherit"></ejs-button>
        
        <!-- Separator -->
        <div class="e-appbar-separator"></div>
        
        <!-- Format Tools -->
        <ejs-button iconCss="e-icons e-bold" title="Bold" cssClass="e-inherit"></ejs-button>
        <ejs-button iconCss="e-icons e-italic" title="Italic" cssClass="e-inherit"></ejs-button>
    </e-content-template>
</ejs-appbar>

<style>
    .toolbar {
        background-color: #f5f5f5;
        border-bottom: 1px solid #ddd;
    }
</style>
```

## Media Queries for Responsiveness

Combine AppBar with CSS media queries to adapt layout for different screen sizes.

### Responsive Spacer and Separator Hiding

```html
<ejs-appbar id="responsiveLayout" class="responsive-layout">
    <e-content-template>
        <!-- Always shown -->
        <ejs-button iconCss="e-icons e-menu" cssClass="e-inherit"></ejs-button>
        <span>MyApp</span>
        
        <!-- Hidden on mobile -->
        <div class="nav-links">
            <ejs-button content="Home" cssClass="e-inherit"></ejs-button>
            <ejs-button content="Products" cssClass="e-inherit"></ejs-button>
            <ejs-button content="Contact" cssClass="e-inherit"></ejs-button>
        </div>
        
        <!-- Spacer -->
        <div class="e-appbar-spacer"></div>
        
        <!-- Always shown on right -->
        <ejs-button iconCss="e-icons e-cart" cssClass="e-inherit"></ejs-button>
    </e-content-template>
</ejs-appbar>

<style>
    /* Desktop: Show navigation links -->
    @media (min-width: 1024px) {
        .nav-links { display: flex; gap: 10px; margin-left: 30px; }
    }
    
    <!-- Tablet: Compact navigation -->
    @media (min-width: 768px) and (max-width: 1023px) {
        .nav-links { display: flex; gap: 5px; margin-left: 15px; }
    }
    
    <!-- Mobile: Hide navigation, show icons only -->
    @media (max-width: 767px) {
        .nav-links { display: none; }
    }
</style>
```

### Responsive Mode and Position

```html
<ejs-appbar id="responsiveMode" class="responsive-appbar">
    <e-content-template>
        <!-- Content -->
    </e-content-template>
</ejs-appbar>

<style>
    <!-- Desktop: Top, Regular mode -->
    @media (min-width: 1024px) {
        .responsive-appbar {
            position: fixed;
            top: 0;
            height: 56px;  /* Regular mode -->
            width: 100%;
            z-index: 1000;
        }
        body { padding-top: 56px; }
    }
    
    <!-- Tablet: Top, Dense mode -->
    @media (min-width: 768px) and (max-width: 1023px) {
        .responsive-appbar {
            position: fixed;
            top: 0;
            height: 48px;  <!-- Dense mode -->
            width: 100%;
            z-index: 1000;
        }
        body { padding-top: 48px; }
    }
    
    <!-- Mobile: Bottom, Dense mode -->
    @media (max-width: 767px) {
        .responsive-appbar {
            position: fixed;
            bottom: 0;
            height: 48px;  <!-- Dense mode -->
            width: 100%;
            z-index: 1000;
        }
        body { padding-bottom: 48px; }
    }
</style>
```

## Component Integration Patterns

Syncfusion components inherit AppBar colors when marked with the `e-inherit` CSS class. This section covers integration patterns for common components.

## Menu Integration

The Menu component integrates seamlessly with AppBar using the `e-inherit` CSS class.

### Menu Example: Main Navigation

```html
<ejs-appbar id="menuAppBar" colorMode="Primary">
    <e-content-template>
        <!-- Left: Logo -->
        <span style="font-weight: bold;">Acme</span>
        
        <!-- Center: Menu inheriting colors -->
        <ejs-menu cssClass="e-inherit" style="margin-left: 30px;">
            <e-menu-items>
                <e-menu-item text="File">
                    <e-menu-items>
                        <e-menu-item text="New"></e-menu-item>
                        <e-menu-item text="Open"></e-menu-item>
                        <e-menu-item text="Save"></e-menu-item>
                    </e-menu-items>
                </e-menu-item>
                <e-menu-item text="Edit">
                    <e-menu-items>
                        <e-menu-item text="Cut"></e-menu-item>
                        <e-menu-item text="Copy"></e-menu-item>
                        <e-menu-item text="Paste"></e-menu-item>
                    </e-menu-items>
                </e-menu-item>
            </e-menu-items>
        </ejs-menu>
        
        <!-- Right: User -->
        <div class="e-appbar-spacer"></div>
        <ejs-button content="User" cssClass="e-inherit"></ejs-button>
    </e-content-template>
</ejs-appbar>
```

### Menu Example: Dropdown Navigation

```html
<ejs-appbar id="dropdownNav" colorMode="Dark" mode="Dense">
    <e-content-template>
        <!-- Menu as horizontal navigation -->
        <ejs-menu cssClass="e-inherit">
            <e-menu-items>
                <e-menu-item text="Products">
                    <e-menu-items>
                        <e-menu-item text="Electronics"></e-menu-item>
                        <e-menu-item text="Clothing"></e-menu-item>
                        <e-menu-item text="Books"></e-menu-item>
                    </e-menu-items>
                </e-menu-item>
                <e-menu-item text="Services">
                    <e-menu-items>
                        <e-menu-item text="Support"></e-menu-item>
                        <e-menu-item text="Shipping"></e-menu-item>
                        <e-menu-item text="Returns"></e-menu-item>
                    </e-menu-items>
                </e-menu-item>
            </e-menu-items>
        </ejs-menu>
    </e-content-template>
</ejs-appbar>
```

## Button and DropDownButton Integration

Buttons and DropdownButtons inherit AppBar styling through the `e-inherit` class.

### DropDownButton Example: User Menu

```html
<ejs-appbar id="userMenu" colorMode="Primary">
    <e-content-template>
        <!-- Left: Navigation -->
        <span>Dashboard</span>
        
        <!-- Right: User Dropdown -->
        <div class="e-appbar-spacer"></div>
        <ejs-dropdownbutton cssClass="e-inherit" text="User Menu">
            <e-items>
                <e-item text="Profile"></e-item>
                <e-item text="Settings"></e-item>
                <e-item text="Help"></e-item>
                <e-item separator="true"></e-item>
                <e-item text="Logout"></e-item>
            </e-items>
        </ejs-dropdownbutton>
    </e-content-template>
</ejs-appbar>
```

### DropDownButton Example: More Options

```html
<ejs-appbar id="moreOptions" colorMode="Inherit">
    <e-content-template>
        <!-- Primary Actions -->
        <ejs-button cssClass="e-inherit" content="Save"></ejs-button>
        <ejs-button cssClass="e-inherit" content="Delete"></ejs-button>
        
        <!-- Separator -->
        <div class="e-appbar-separator"></div>
        
        <!-- More options in dropdown -->
        <ejs-dropdownbutton cssClass="e-inherit" text="More">
            <e-items>
                <e-item text="Export"></e-item>
                <e-item text="Import"></e-item>
                <e-item text="Duplicate"></e-item>
                <e-item text="Archive"></e-item>
            </e-items>
        </ejs-dropdownbutton>
    </e-content-template>
</ejs-appbar>
```

## SideBar Integration

The SideBar component pairs with AppBar to create classic navigation patterns.

### SideBar with AppBar Example: Dashboard Layout

```html
<!-- Top AppBar Navigation -->
<ejs-appbar id="dashboardNav" isSticky="true" position="Top" colorMode="Primary">
    <e-content-template>
        <ejs-button id="sidebarToggle" iconCss="e-icons e-menu" cssClass="e-inherit" 
                     onclick="toggleSidebar()"></ejs-button>
        <span style="margin-left: 15px; font-weight: bold;">Dashboard</span>
        <div class="e-appbar-spacer"></div>
        <ejs-button cssClass="e-inherit" content="Logout"></ejs-button>
    </e-content-template>
</ejs-appbar>

<!-- Sidebar Navigation -->
<ejs-sidebar id="dashboardSidebar" type="Push" width="250px">
    <div class="sidebar-content">
        <ul>
            <li><a href="/dashboard">Dashboard</a></li>
            <li><a href="/reports">Reports</a></li>
            <li><a href="/analytics">Analytics</a></li>
            <li><a href="/settings">Settings</a></li>
        </ul>
    </div>
</ejs-sidebar>

<!-- Main Content -->
<div id="mainContent" class="dashboard-content">
    <!-- Page content -->
</div>

<script>
    function toggleSidebar() {
        var sidebar = document.getElementById('dashboardSidebar');
        // Toggle sidebar visibility
    }
</script>

<style>
    body { padding-top: 56px; }
    
    .dashboard-content {
        margin-left: 0;
        transition: margin-left 0.3s ease;
    }
    
    .sidebar-open .dashboard-content {
        margin-left: 250px;
    }
</style>
```

## Real-World Design Examples

### Example 1: E-Commerce Header

```html
<ejs-appbar id="ecommerceHeader" colorMode="Primary" mode="Regular">
    <e-content-template>
        <!-- Left: Logo -->
        <img src="logo.png" alt="Logo" style="height: 40px;">
        <span style="margin-left: 10px; font-weight: bold;">ShopHub</span>
        
        <!-- Center: Search with Separator -->
        <div class="e-appbar-separator" style="margin: 0 15px;"></div>
        <input type="text" placeholder="Search products..." 
               style="width: 300px; padding: 8px 12px; border-radius: 4px; border: none;">
        
        <!-- Right: Cart and Account -->
        <div class="e-appbar-spacer"></div>
        <ejs-button cssClass="e-inherit" 
                    content="Cart (3)" iconCss="e-icons e-cart"></ejs-button>
        <ejs-button cssClass="e-inherit" content="Sign In"></ejs-button>
    </e-content-template>
</ejs-appbar>
```

### Example 2: Social Media Feed

```html
<ejs-appbar id="socialHeader" isSticky="true" position="Top" colorMode="Primary" mode="Dense">
    <e-content-template>
        <!-- Logo -->
        <span style="font-weight: bold; font-size: 18px;">SocialNet</span>
        
        <!-- Navigation -->
        <div style="margin-left: 20px;">
            <ejs-button content="Home" cssClass="e-inherit"></ejs-button>
            <ejs-button content="Explore" cssClass="e-inherit"></ejs-button>
            <ejs-button content="Messages" cssClass="e-inherit"></ejs-button>
        </div>
        
        <!-- Search -->
        <div class="e-appbar-spacer"></div>
        <ejs-textbox placeholder="Search" cssClass="e-inherit"></ejs-textbox>
        
        <!-- Notifications and Profile -->
        <div class="e-appbar-separator" style="margin: 0 10px;"></div>
        <ejs-button cssClass="e-inherit" iconCss="e-icons e-notification"></ejs-button>
        <ejs-button cssClass="e-inherit" iconCss="e-icons e-user"></ejs-button>
    </e-content-template>
</ejs-appbar>

<style>
    body { padding-top: 48px; } <!-- Dense mode height -->
</style>
```

### Example 3: Admin Dashboard

```html
<ejs-appbar id="adminDash" colorMode="Dark" mode="Regular" isSticky="true" position="Top">
    <e-content-template>
        <!-- Menu Toggle -->
        <ejs-button id="toggleMenu" iconCss="e-icons e-menu" cssClass="e-inherit"></ejs-button>
        
        <!-- Dashboard Title -->
        <span style="margin-left: 15px; font-weight: bold;">Admin Dashboard</span>
        
        <!-- Navigation Links -->
        <div style="margin-left: 40px;">
            <ejs-button content="Users" cssClass="e-inherit"></ejs-button>
            <ejs-button content="Reports" cssClass="e-inherit"></ejs-button>
            <ejs-button content="Settings" cssClass="e-inherit"></ejs-button>
        </div>
        
        <!-- Right: Notifications and User -->
        <div class="e-appbar-spacer"></div>
        <ejs-button cssClass="e-inherit" iconCss="e-icons e-bell" badge="5"></ejs-button>
        <div class="e-appbar-separator"></div>
        <ejs-dropdownbutton cssClass="e-inherit" text="Admin">
            <e-items>
                <e-item text="Profile"></e-item>
                <e-item text="Settings"></e-item>
                <e-item separator="true"></e-item>
                <e-item text="Logout"></e-item>
            </e-items>
        </ejs-dropdownbutton>
    </e-content-template>
</ejs-appbar>

<style>
    body { padding-top: 56px; }
</style>
```

## Advanced Layout Patterns

### Stacked AppBars

Multiple AppBars for different navigation levels:

```html
<!-- Level 1: Main branding -->
<ejs-appbar id="brandAppBar" colorMode="Light" mode="Regular">
    <e-content-template>
        <img src="logo.png" alt="Logo" style="height: 40px;">
        <span>Company</span>
    </e-content-template>
</ejs-appbar>

<!-- Level 2: Main navigation -->
<ejs-appbar id="mainNavAppBar" colorMode="Primary" mode="Dense">
    <e-content-template>
        <ejs-button content="Products" cssClass="e-inherit"></ejs-button>
        <ejs-button content="Services" cssClass="e-inherit"></ejs-button>
        <ejs-button content="Blog" cssClass="e-inherit"></ejs-button>
    </e-content-template>
</ejs-appbar>

<style>
    body { padding-top: 104px; } <!-- 56px + 48px -->
</style>
```

### Hierarchical Navigation

```html
<!-- Top: Breadcrumb AppBar -->
<ejs-appbar id="breadcrumb" colorMode="Light" mode="Dense">
    <e-content-template>
        <span>Home / Products / Electronics / Laptops</span>
    </e-content-template>
</ejs-appbar>

<!-- Below: Filter AppBar -->
<ejs-appbar id="filterAppBar" colorMode="Inherit">
    <e-content-template>
        <ejs-button content="Price: Low to High" cssClass="e-inherit"></ejs-button>
        <ejs-button content="Rating: High to Low" cssClass="e-inherit"></ejs-button>
        <div class="e-appbar-spacer"></div>
        <ejs-button content="Clear Filters" cssClass="e-inherit"></ejs-button>
    </e-content-template>
</ejs-appbar>
```

## Best Practices

### Best Practices Summary

1. **Use Spacer Strategically**: Place spacer before right-aligned content
2. **Group with Separator**: Use separator to visually group related actions
3. **Inherit Colors Consistently**: Apply `e-inherit` to all nested components
4. **Test Responsiveness**: Use media queries to adapt for all screen sizes
5. **Accessibility**: Use semantic buttons, `aria-label`, and meaningful text
6. **Mobile First**: Design for mobile, enhance for desktop
7. **Performance**: Keep AppBar content lightweight
8. **Consistency**: Maintain consistent spacing and alignment

### Performance Tips

- Keep AppBar content minimal
- Use icon buttons instead of text when possible
- Avoid excessive nesting of components
- Use CSS classes instead of inline styles where possible

---

**Next Steps:**
- Explore customization options: [Customization Guide](customization.md)
- Review complete API reference: [API Reference](api-reference.md)
- Learn about positioning: [Positioning Guide](positioning.md)
