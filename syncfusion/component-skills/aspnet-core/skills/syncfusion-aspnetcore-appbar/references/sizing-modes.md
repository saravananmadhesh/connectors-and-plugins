# AppBar Sizing Modes

## Table of Contents
- [Overview](#overview)
- [Mode Property](#mode-property)
- [Regular Mode](#regular-mode)
- [Prominent Mode](#prominent-mode)
- [Dense Mode](#dense-mode)
- [Mode Selection Guide](#mode-selection-guide)
- [Combining Modes with Other Properties](#combining-modes-with-other-properties)
- [Use Case Examples](#use-case-examples)
- [Responsive Sizing](#responsive-sizing)
- [Content Adaptation](#content-adaptation)

## Overview

The AppBar component supports three height modes to accommodate different design requirements and content density. The mode controls the vertical space available for AppBar content, allowing you to choose between compact, standard, and spacious layouts.

**Available Modes:**
- **Regular** (default): Standard height suitable for typical navigation
- **Prominent**: Larger height for featured headers and rich content
- **Dense**: Compressed height for space-conscious layouts

The sizing mode is controlled by the `mode` property using the AppBarMode enumeration.

## Mode Property

The `mode` property defines the height of the AppBar component. This property accepts values from the AppBarMode enum.

### Mode Values

| Value | Height | Purpose | Typical Use |
|-------|--------|---------|------------|
| `Regular` | ~56px | Standard navigation bar | Most applications, consistent height |
| `Prominent` | ~128px | Feature headers, larger titles | Hero sections, featured content |
| `Dense` | ~48px | Compact layouts | Mobile layouts, toolbars |

### Default Behavior

If the `mode` property is not specified, the AppBar defaults to **Regular** mode:

```html
<!-- Explicit Regular mode -->
<ejs-appbar id="regularAppBar" mode="Regular">
    <e-content-template>
        <!-- Content -->
    </e-content-template>
</ejs-appbar>

<!-- Implicit Regular mode (property omitted) -->
<ejs-appbar id="defaultAppBar">
    <e-content-template>
        <!-- Content -->
    </e-content-template>
</ejs-appbar>
```

Both examples render with the default Regular height (~56px).

## Regular Mode

Regular mode provides the standard AppBar height, suitable for most navigation scenarios. This is the default and most commonly used mode.

### Regular Mode Characteristics

- **Default Mode**: Used when `mode` property is not specified
- **Height**: Approximately 56 pixels
- **Content**: Accommodates navigation links, buttons, icons, and simple text
- **Best For**: Primary navigation, toolbars, standard headers
- **Space Usage**: Balanced between visibility and content space

### Regular Mode Example: Standard Navigation

```html
<ejs-appbar id="standardNav" mode="Regular" colorMode="Primary">
    <e-content-template>
        <!-- Left: Menu -->
        <ejs-button iconCss="e-icons e-menu" cssClass="e-inherit"></ejs-button>
        
        <!-- Center: Branding -->
        <span style="margin-left: 15px; font-size: 16px;">My Application</span>
        
        <!-- Right: Actions -->
        <div class="e-appbar-spacer"></div>
        <ejs-button iconCss="e-icons e-search" cssClass="e-inherit"></ejs-button>
        <ejs-button iconCss="e-icons e-settings" cssClass="e-inherit"></ejs-button>
        <ejs-button content="Login" cssClass="e-inherit"></ejs-button>
    </e-content-template>
</ejs-appbar>
```

### Regular Mode Example: Navigation Bar with Menu Integration

```html
<ejs-appbar id="navWithMenu" mode="Regular" colorMode="Dark" position="Top">
    <e-content-template>
        <!-- Logo -->
        <img src="logo.png" alt="Logo" style="height: 40px; margin-right: 10px;">
        
        <!-- Navigation Links -->
        <div style="display: flex; gap: 20px;">
            <a href="/">Home</a>
            <a href="/products">Products</a>
            <a href="/about">About</a>
            <a href="/contact">Contact</a>
        </div>
        
        <!-- Right: User Options -->
        <div class="e-appbar-spacer"></div>
        <ejs-button iconCss="e-icons e-user" cssClass="e-inherit"></ejs-button>
        <ejs-button content="Sign Out" cssClass="e-inherit"></ejs-button>
    </e-content-template>
</ejs-appbar>
```

### When to Use Regular Mode

- Primary application navigation headers
- Standard-height toolbars
- Simple navigation with links and buttons
- Desktop applications where space is adequate
- When no special content prominence is needed

## Prominent Mode

Prominent mode provides a taller AppBar suitable for featured headers, large titles, images, or content that requires more visual prominence.

### Prominent Mode Characteristics

- **Height**: Approximately 128 pixels
- **Content**: Accommodates large titles, images, rich content
- **Best For**: Hero sections, featured content, prominent branding
- **Space Usage**: Larger but still functional for content below
- **Visual Impact**: Creates strong visual hierarchy

### Prominent Mode Example: Featured Blog Header

```html
<ejs-appbar id="blogHeader" mode="Prominent" colorMode="Primary">
    <e-content-template>
        <div style="display: flex; flex-direction: column; justify-content: center; height: 100%;">
            <h1 style="margin: 0; font-size: 24px;">Blog: Web Development Tips</h1>
            <p style="margin: 5px 0 0 0; font-size: 14px;">Latest insights and tutorials</p>
        </div>
        
        <div class="e-appbar-spacer"></div>
        
        <div style="display: flex; align-items: center; gap: 10px;">
            <ejs-button iconCss="e-icons e-share" cssClass="e-inherit"></ejs-button>
            <ejs-button content="Subscribe" cssClass="e-inherit"></ejs-button>
        </div>
    </e-content-template>
</ejs-appbar>
```

### Prominent Mode Example: E-Commerce Product Featured Header

```html
<ejs-appbar id="productFeature" mode="Prominent" colorMode="Inherit">
    <e-content-template>
        <!-- Product Image (left) -->
        <img src="product.jpg" alt="Product" 
             style="height: 120px; border-radius: 4px; margin-right: 20px;">
        
        <!-- Product Info (center) -->
        <div style="flex-grow: 1;">
            <h2 style="margin: 0 0 5px 0;">Premium Headphones</h2>
            <p style="margin: 0; color: #666;">High-quality audio with wireless connectivity</p>
            <div style="margin-top: 8px;">
                <span style="font-size: 18px; font-weight: bold;">$199.99</span>
                <span style="margin-left: 10px; color: #27ae60;">In Stock</span>
            </div>
        </div>
        
        <!-- Actions (right) -->
        <div class="e-appbar-spacer"></div>
        <ejs-button content="Add to Cart" cssClass="e-inherit"></ejs-button>
    </e-content-template>
</ejs-appbar>
```

### Prominent Mode Example: Hero Section with Background

```html
<ejs-appbar id="heroAppBar" mode="Prominent" colorMode="Primary" 
            cssClass="hero-appbar">
    <e-content-template>
        <div style="display: flex; flex-direction: column; justify-content: center; height: 100%; width: 100%;">
            <h1 style="margin: 0; font-size: 28px; color: white;">Welcome to Our Platform</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px; color: rgba(255,255,255,0.8);">
                Build amazing applications with ease
            </p>
            
            <div class="e-appbar-spacer"></div>
            
            <div style="display: flex; gap: 10px;">
                <ejs-button content="Get Started" cssClass="e-inherit"></ejs-button>
                <ejs-button content="Learn More" cssClass="e-inherit"></ejs-button>
            </div>
        </div>
    </e-content-template>
</ejs-appbar>

<style>
    .hero-appbar {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
    }
</style>
```

### When to Use Prominent Mode

- Hero sections and landing pages
- Featured product displays
- Blog post headers with metadata
- Application branding sections
- Large title navigation areas
- Content that needs visual prominence

## Dense Mode

Dense mode provides a compressed AppBar height, ideal for space-constrained layouts and mobile applications.

### Dense Mode Characteristics

- **Height**: Approximately 48 pixels
- **Content**: Compact icons, text, and minimal spacing
- **Best For**: Mobile navigation, toolbars, compact layouts
- **Space Usage**: Minimizes vertical footprint
- **Use Case**: Mobile-first, touch-optimized interfaces

### Dense Mode Example: Mobile Navigation Bar

```html
<ejs-appbar id="mobileNav" mode="Dense" colorMode="Primary">
    <e-content-template>
        <!-- Left: Menu -->
        <ejs-button iconCss="e-icons e-menu" cssClass="e-inherit" 
                     aria-label="menu"></ejs-button>
        
        <!-- Center: App Name -->
        <span style="margin: 0 auto; font-size: 14px;">MyApp</span>
        
        <!-- Right: User -->
        <div class="e-appbar-spacer"></div>
        <ejs-button iconCss="e-icons e-user" cssClass="e-inherit" 
                     aria-label="profile"></ejs-button>
    </e-content-template>
</ejs-appbar>
```

### Dense Mode Example: Compact Toolbar

```html
<ejs-appbar id="compactToolbar" mode="Dense" colorMode="Inherit">
    <e-content-template>
        <!-- Document Title -->
        <span style="font-weight: bold; font-size: 12px;">Document.txt</span>
        
        <!-- Right: Actions -->
        <div class="e-appbar-spacer"></div>
        <ejs-button iconCss="e-icons e-save" cssClass="e-inherit" 
                     title="Save"></ejs-button>
        <ejs-button iconCss="e-icons e-undo" cssClass="e-inherit" 
                     title="Undo"></ejs-button>
        <ejs-button iconCss="e-icons e-redo" cssClass="e-inherit" 
                     title="Redo"></ejs-button>
    </e-content-template>
</ejs-appbar>
```

### Dense Mode Example: Mobile Bottom Navigation

```html
<ejs-appbar id="mobileBottomNav" mode="Dense" position="Bottom" colorMode="Primary">
    <e-content-template>
        <ejs-button cssClass="e-inherit" iconCss="e-icons e-home" 
                     aria-label="home"></ejs-button>
        <ejs-button cssClass="e-inherit" iconCss="e-icons e-search" 
                     aria-label="search"></ejs-button>
        <ejs-button cssClass="e-inherit" iconCss="e-icons e-plus" 
                     aria-label="add"></ejs-button>
        <ejs-button cssClass="e-inherit" iconCss="e-icons e-message" 
                     aria-label="messages"></ejs-button>
        <ejs-button cssClass="e-inherit" iconCss="e-icons e-user" 
                     aria-label="profile"></ejs-button>
    </e-content-template>
</ejs-appbar>

<style>
    body {
        padding-bottom: 48px; /* Dense mode height */
    }
</style>
```

### When to Use Dense Mode

- Mobile application navigation
- Compact toolbars
- Mobile-first responsive layouts
- Touch-optimized interfaces
- Dashboard widgets
- Space-constrained environments

## Mode Selection Guide

### Decision Matrix

**Choose Regular if:**
- Standard desktop application header
- Mixed navigation and content area
- Space is not constrained
- Need balanced approach

**Choose Prominent if:**
- Feature or hero section needed
- Large title display required
- Product showcase or blog header
- Visual emphasis is important

**Choose Dense if:**
- Mobile application
- Space is limited
- Touch interface optimization needed
- Compact toolbar required

### Selection Process

1. **Identify Layout Requirements**: What is the primary purpose of this AppBar?
2. **Consider Device/Screen**: Desktop, tablet, or mobile optimization?
3. **Evaluate Content**: Simple navigation or rich featured content?
4. **Check Space Budget**: How much vertical space can be allocated?
5. **Test User Experience**: Does the chosen mode work for your users?

## Combining Modes with Other Properties

### Regular Mode with Sticky Navigation

```html
<ejs-appbar id="stickyRegular" mode="Regular" isSticky="true" 
            position="Top" colorMode="Dark">
    <e-content-template>
        <!-- Regular height sticky navigation -->
    </e-content-template>
</ejs-appbar>

<style>
    body { padding-top: 56px; }
</style>
```

### Prominent Mode with Bottom Position

```html
<ejs-appbar id="prominentBottom" mode="Prominent" position="Bottom">
    <e-content-template>
        <!-- Large footer/action area -->
    </e-content-template>
</ejs-appbar>

<style>
    body { padding-bottom: 128px; }
</style>
```

### Dense Mode with Inherit Color

```html
<ejs-appbar id="denseInherit" mode="Dense" colorMode="Inherit">
    <e-content-template>
        <!-- Compact bar inheriting parent colors -->
    </e-content-template>
</ejs-appbar>
```

## Use Case Examples

### SaaS Dashboard: Stacked AppBars

```html
<!-- Prominent header for branding -->
<ejs-appbar id="brandHeader" mode="Prominent" colorMode="Primary">
    <e-content-template>
        <h1>Analytics Dashboard</h1>
    </e-content-template>
</ejs-appbar>

<!-- Regular navigation bar -->
<ejs-appbar id="navBar" mode="Regular" colorMode="Dark">
    <e-content-template>
        <ejs-button content="Reports" cssClass="e-inherit"></ejs-button>
        <ejs-button content="Users" cssClass="e-inherit"></ejs-button>
        <div class="e-appbar-spacer"></div>
        <ejs-button content="Settings" cssClass="e-inherit"></ejs-button>
    </e-content-template>
</ejs-appbar>

<!-- Page content -->
<div class="dashboard-content">
    <!-- Content -->
</div>
```

### E-Commerce: Responsive Sizing

```html
<!-- Desktop: Prominent featured header -->
<ejs-appbar id="responsive-appbar" mode="Regular" class="responsive-appbar">
    <e-content-template>
        <img src="logo.png" alt="Logo">
        <div style="margin-left: 20px;">
            <a href="/">Home</a> | 
            <a href="/products">Products</a> | 
            <a href="/sale">Sale</a>
        </div>
        <div class="e-appbar-spacer"></div>
        <ejs-button content="Cart" cssClass="e-inherit"></ejs-button>
    </e-content-template>
</ejs-appbar>

<style>
    /* Desktop: Regular mode -->
    @media (min-width: 1024px) {
        .responsive-appbar { height: 56px; }
    }
    
    /* Tablet: Regular mode -->
    @media (min-width: 768px) and (max-width: 1023px) {
        .responsive-appbar { height: 56px; }
    }
    
    /* Mobile: Dense mode -->
    @media (max-width: 767px) {
        .responsive-appbar { height: 48px; }
    }
</style>
```

## Responsive Sizing

### Dynamic Mode Based on Screen Size

```html
<ejs-appbar id="responsiveMode" class="responsive-appbar">
    <e-content-template>
        <span>Responsive AppBar</span>
        <div class="e-appbar-spacer"></div>
        <ejs-button content="Menu" cssClass="e-inherit"></ejs-button>
    </e-content-template>
</ejs-appbar>

<style>
    /* Desktop: Regular mode -->
    @media (min-width: 1024px) {
        .responsive-appbar {
            height: 56px;  /* Regular */
        }
    }
    
    /* Tablet: Regular mode -->
    @media (min-width: 768px) and (max-width: 1023px) {
        .responsive-appbar {
            height: 56px;  /* Regular */
        }
    }
    
    <!-- Mobile: Dense mode -->
    @media (max-width: 767px) {
        .responsive-appbar {
            height: 48px;  /* Dense */
        }
    }
</style>
```

## Content Adaptation

### Adapting Content for Different Modes

**Regular Mode Content:**
```html
<span>Standard Content</span>
<ejs-button content="Action" cssClass="e-inherit"></ejs-button>
```

**Prominent Mode Content:**
```html
<div style="display: flex; flex-direction: column; justify-content: center;">
    <h1>Featured Title</h1>
    <p>Subtitle or description</p>
</div>
```

**Dense Mode Content:**
```html
<ejs-button iconCss="e-icons e-menu" cssClass="e-inherit"></ejs-button>
<span style="font-size: 12px;">Compact</span>
<ejs-button iconCss="e-icons e-user" cssClass="e-inherit"></ejs-button>
```

### Content Height Considerations

- **Regular Mode (~56px)**: Use standard height elements
- **Prominent Mode (~128px)**: Can use taller images, multi-line text
- **Dense Mode (~48px)**: Use icon-only buttons, short text

---

**Next Steps:**
- Customize colors: [Color Modes Guide](color-modes.md)
- Design complex layouts: [Design Patterns Guide](design-layouts.md)
- Explore positioning: [Positioning Guide](positioning.md)
