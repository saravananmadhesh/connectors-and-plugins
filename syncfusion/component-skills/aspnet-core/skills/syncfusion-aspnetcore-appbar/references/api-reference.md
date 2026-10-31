# AppBar API Reference

## Table of Contents
- [Overview](#overview)
- [Properties](#properties)
- [Events](#events)
- [Enumerations](#enumerations)
- [Quick Reference](#quick-reference)
- [Complete Examples](#complete-examples)
- [Type Information](#type-information)

## Overview

This API reference documents all properties, events, and enumerations available for the Syncfusion AppBar component. Use this reference alongside other documentation files for complete implementation guidance.

**API Repository Source**: All APIs are defined in `appBarModel.md` with enumerations in `appBarColor.md`, `appBarMode.md`, and `appBarPosition.md`.

For implementation examples and use cases, refer to:
- [Getting Started](getting-started.md) - Setup and basic usage
- [Positioning](positioning.md) - Position and sticky properties
- [Sizing Modes](sizing-modes.md) - Mode property values
- [Color Modes](color-modes.md) - ColorMode property values
- [Design Layouts](design-layouts.md) - Layout patterns and integration
- [Customization](customization.md) - CSS and HTML customization

---

## Properties

### colorMode

**Type**: `AppBarColor` enum  
**Default**: `Light`

Specifies the color mode that defines the color of the AppBar component.

**Values**:
- `Light` - Specifies the AppBar in light color (default, professional appearance)
- `Dark` - Specifies the AppBar in dark color (high contrast, evening mode)
- `Primary` - Specifies the AppBar in primary color (brand color from theme)
- `Inherit` - AppBar background and colors are inherited from its parent element

**Usage**:
```html
<ejs-appbar id="appBar" colorMode="Primary">
    <!-- Content -->
</ejs-appbar>
```

**Related**: See [Color Modes Guide](color-modes.md) for detailed examples and use cases.

---

### cssClass

**Type**: `string`  
**Default**: Empty string

Accepts single or multiple CSS classes (separated by space) to be used for AppBar customization.

**Usage**:
```html
<ejs-appbar id="appBar" cssClass="custom-appbar shadow elevated">
    <!-- Content -->
</ejs-appbar>
```

**Common Uses**:
- Custom styling and themes
- Animation classes
- State-specific styling (success, warning, error)
- Layout adjustments

**Related**: See [Customization Guide](customization.md) for CSS class examples.

---

### enablePersistence

**Type**: `boolean`  
**Default**: `false`

Enable or disable persisting component's state between page reloads. When enabled, the AppBar state is automatically saved to browser storage and restored on page reload.

**Usage**:
```html
<ejs-appbar id="appBar" enablePersistence="true">
    <!-- Content -->
</ejs-appbar>
```

**Related**: See [Customization Guide](customization.md) for persistence examples.

---

### enableRtl

**Type**: `boolean`  
**Default**: `false`

Enable or disable rendering component in right-to-left (RTL) direction. Use for applications supporting RTL languages like Arabic, Hebrew, and Persian.

**Usage**:
```html
<ejs-appbar id="appBar" enableRtl="true">
    <!-- Content in RTL language -->
</ejs-appbar>
```

**Related**: See [Customization Guide](customization.md) for RTL implementation examples.

---

### htmlAttributes

**Type**: `Record<string, unknown>`  
**Default**: Empty record

Accepts HTML attributes and custom attributes that will be applied to the AppBar element. Useful for adding data attributes, ARIA attributes, and test identifiers.

**Usage (C# Dictionary)**:
```html
<ejs-appbar id="appBar" htmlAttributes="@(new Dictionary<string, object>
{
    { "data-testid", "main-header" },
    { "role", "banner" },
    { "aria-label", "Application header" }
})">
    <!-- Content -->
</ejs-appbar>
```

**Common Attributes**:
- `data-*` - Custom data attributes for tracking or testing
- `role` - ARIA role (e.g., "banner", "navigation")
- `aria-label` - Accessible name for screen readers
- `aria-level` - Heading level for accessibility

**Related**: See [Customization Guide](customization.md) for HTML attribute examples.

---

### isSticky

**Type**: `boolean`  
**Default**: `false`

Defines whether the AppBar position is fixed or not while scrolling the page. When set to `true`, the AppBar will remain fixed (sticky) at its position while the page content scrolls.

**Usage**:
```html
<ejs-appbar id="appBar" isSticky="true" position="Top">
    <!-- Content remains visible during scroll -->
</ejs-appbar>

<style>
    body { padding-top: 56px; } /* Account for AppBar height -->
</style>
```

**Important Notes**:
- Add padding to body or content to prevent overlap
- Works with both `position="Top"` and `position="Bottom"`
- Equivalent to CSS `position: fixed`

**Related**: See [Positioning Guide](positioning.md) for sticky implementation patterns.

---

### locale

**Type**: `string`  
**Default**: `"en-US"`

Overrides the global culture and localization value for this component. Used for multi-language support and region-specific formatting.

**Common Locales**:
- `"en-US"` - English (United States)
- `"fr"` - French
- `"de"` - German
- `"es"` - Spanish
- `"ar"` - Arabic
- `"he"` - Hebrew
- `"ja"` - Japanese
- `"zh"` - Chinese

**Usage**:
```html
<!-- French interface -->
<ejs-appbar id="appBar" locale="fr">
    <!-- Content -->
</ejs-appbar>

<!-- German interface -->
<ejs-appbar id="appBar" locale="de">
    <!-- Content -->
</ejs-appbar>
```

**Related**: See [Customization Guide](customization.md) for localization examples.

---

### mode

**Type**: `AppBarMode` enum  
**Default**: `Regular`

Specifies the mode (height) of the AppBar that defines the AppBar height and content layout. The possible values are:

**Values**:
- `Regular` - Specifies default height (~56px) for standard navigation
- `Prominent` - Specifies longer height (~128px) for featured headers
- `Dense` - Specifies compressed height (~48px) for compact layouts

**Usage**:
```html
<!-- Regular (default) -->
<ejs-appbar id="regular" mode="Regular">
    <!-- Standard navigation -->
</ejs-appbar>

<!-- Prominent for featured content -->
<ejs-appbar id="featured" mode="Prominent">
    <!-- Large title, images, rich content -->
</ejs-appbar>

<!-- Dense for mobile or compact layouts -->
<ejs-appbar id="compact" mode="Dense">
    <!-- Icon-based compact navigation -->
</ejs-appbar>
```

**Related**: See [Sizing Modes Guide](sizing-modes.md) for detailed examples of each mode.

---

### position

**Type**: `AppBarPosition` enum  
**Default**: `Top`

Specifies the position of the AppBar on the page. The possible values are:

**Values**:
- `Top` - Position the AppBar at the top of the page
- `Bottom` - Position the AppBar at the bottom of the page

**Usage**:
```html
<!-- Top positioning (default) -->
<ejs-appbar id="top" position="Top">
    <!-- Header navigation -->
</ejs-appbar>

<!-- Bottom positioning for mobile navigation -->
<ejs-appbar id="bottom" position="Bottom">
    <!-- Mobile bottom navigation -->
</ejs-appbar>
```

**Related**: See [Positioning Guide](positioning.md) for detailed positioning examples and patterns.

---

## Events

AppBar component supports two lifecycle events: `created` and `destroyed`.

### created

**Type**: `EmitType<Event>`

Triggers after the AppBar component is created and rendered in the DOM.

**Usage**:
```html
<ejs-appbar id="appBar" created="onAppBarCreated">
    <e-content-template>
        <!-- Content -->
    </e-content-template>
</ejs-appbar>

<script>
    function onAppBarCreated(args) {
        console.log("AppBar created successfully");
        // Perform initialization tasks
    }
</script>
```

**Event Handler Signature**:
```typescript
function eventHandler(args: Event) {
    // args.model contains AppBar model
}
```

**Use Cases**:
- Initialize plugins or extensions
- Set up event listeners
- Apply dynamic styling
- Load user preferences

---

### destroyed

**Type**: `EmitType<Event>`

Triggers when the AppBar component is destroyed (removed from DOM or page unload).

**Usage**:
```html
<ejs-appbar id="appBar" destroyed="onAppBarDestroyed">
    <e-content-template>
        <!-- Content -->
    </e-content-template>
</ejs-appbar>

<script>
    function onAppBarDestroyed(args) {
        console.log("AppBar destroyed");
        // Cleanup resources, event listeners
    }
</script>
```

**Event Handler Signature**:
```typescript
function eventHandler(args: Event) {
    // Cleanup logic
}
```

**Use Cases**:
- Cleanup event listeners
- Release resources
- Save component state
- Log analytics events

---

## Enumerations

### AppBarColor

Enumeration defining available color modes for the AppBar component. Used by the `colorMode` property.

**Members**:

| Value | Display | Use Case |
|-------|---------|----------|
| `Light` | Light gray background, dark text | Professional, corporate applications |
| `Dark` | Dark background, light text | Developer tools, evening mode |
| `Primary` | Theme primary color background | Brand emphasis, marketing apps |
| `Inherit` | Inherited from parent | Custom styling, flexible layouts |

**Default**: `Light`

**Example**:
```html
<ejs-appbar colorMode="Primary">
    <!-- Uses primary theme color -->
</ejs-appbar>
```

**Related**: [Color Modes Guide](color-modes.md) - See comprehensive color mode documentation.

---

### AppBarMode

Enumeration defining available height modes for the AppBar component. Used by the `mode` property.

**Members**:

| Value | Height | Purpose | Content Type |
|-------|--------|---------|--------------|
| `Regular` | ~56px | Default, standard navigation | Links, buttons, text |
| `Prominent` | ~128px | Featured headers | Large titles, images, rich content |
| `Dense` | ~48px | Compact layouts | Icons, minimal text |

**Default**: `Regular`

**Example**:
```html
<!-- Use prominent for featured headers -->
<ejs-appbar mode="Prominent">
    <h1>Featured Section</h1>
</ejs-appbar>

<!-- Use dense for mobile -->
<ejs-appbar mode="Dense">
    <!-- Icon buttons -->
</ejs-appbar>
```

**Related**: [Sizing Modes Guide](sizing-modes.md) - See comprehensive sizing documentation.

---

### AppBarPosition

Enumeration defining available positions for the AppBar component. Used by the `position` property.

**Members**:

| Value | Position | Use Case |
|-------|----------|----------|
| `Top` | At top of page | Primary navigation headers |
| `Bottom` | At bottom of page | Mobile navigation, footer actions |

**Default**: `Top`

**Example**:
```html
<!-- Top navigation (default) -->
<ejs-appbar position="Top">
    <!-- Top header -->
</ejs-appbar>

<!-- Bottom navigation for mobile -->
<ejs-appbar position="Bottom">
    <!-- Mobile navigation tabs -->
</ejs-appbar>
```

**Related**: [Positioning Guide](positioning.md) - See comprehensive positioning documentation.

---

## Quick Reference

### Common Property Combinations

**Professional Header**:
```html
<ejs-appbar colorMode="Light" mode="Regular" position="Top">
    <!-- Content -->
</ejs-appbar>
```

**Brand Navigation**:
```html
<ejs-appbar colorMode="Primary" mode="Regular" isSticky="true" position="Top">
    <!-- Content -->
    <style>body { padding-top: 56px; }</style>
</ejs-appbar>
```

**Mobile Navigation**:
```html
<ejs-appbar colorMode="Primary" mode="Dense" position="Bottom">
    <!-- Mobile navigation items -->
</ejs-appbar>
```

**Featured Header**:
```html
<ejs-appbar colorMode="Primary" mode="Prominent" position="Top">
    <!-- Hero content -->
</ejs-appbar>
```

**Custom Themed**:
```html
<ejs-appbar colorMode="Inherit" cssClass="custom-theme" position="Top">
    <!-- Content inherits parent colors -->
</ejs-appbar>
```

---

## Complete Examples

### Example 1: Feature-Rich Header with All Properties

```html
<ejs-appbar id="completeAppBar" 
            colorMode="Primary" 
            mode="Regular" 
            position="Top" 
            isSticky="true"
            cssClass="elevated"
            enableRtl="false"
            enablePersistence="true"
            locale="en-US"
            created="onCreated"
            htmlAttributes="@(new Dictionary<string, object>
            {
                { \"role\", \"banner\" },
                { \"data-testid\", \"main-header\" }
            })">
    <e-content-template>
        <span>Complete AppBar Example</span>
        <div class="e-appbar-spacer"></div>
        <ejs-button content="Action" cssClass="e-inherit"></ejs-button>
    </e-content-template>
</ejs-appbar>

<script>
    function onCreated() {
        console.log("AppBar initialized with all properties");
    }
</script>

<style>
    body { padding-top: 56px; }
    .elevated { box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
</style>
```

### Example 2: Mobile Responsive Header

```html
<ejs-appbar id="responsiveAppBar" 
            cssClass="responsive-appbar"
            enablePersistence="true">
    <e-content-template>
        <!-- Responsive content -->
    </e-content-template>
</ejs-appbar>

<script>
    // JavaScript logic to set mode and position based on screen size
    function adjustAppBar() {
        var appBar = document.getElementById('responsiveAppBar').ej2_instances[0];
        if (window.innerWidth < 768) {
            appBar.mode = 'Dense';
            appBar.position = 'Bottom';
        } else {
            appBar.mode = 'Regular';
            appBar.position = 'Top';
        }
    }
    
    window.addEventListener('resize', adjustAppBar);
</script>
```

### Example 3: Multi-Language AppBar

```html
<ejs-appbar id="multiLangAppBar" 
            locale="@ViewBag.UserLocale"
            enableRtl="@(ViewBag.IsRTL ? "true" : "false")">
    <e-content-template>
        <span>@ViewBag.AppTitle</span>
        <div class="e-appbar-spacer"></div>
        <ejs-button content="@ViewBag.SignIn" cssClass="e-inherit"></ejs-button>
    </e-content-template>
</ejs-appbar>
```

---

## Type Information

### Property Type Mapping

| Property | C# Type | TypeScript Type | Values |
|----------|---------|-----------------|--------|
| `colorMode` | `AppBarColor` | `AppBarColor` | Light \| Dark \| Primary \| Inherit |
| `cssClass` | `string` | `string` | Any CSS class names |
| `enablePersistence` | `bool` | `boolean` | true \| false |
| `enableRtl` | `bool` | `boolean` | true \| false |
| `htmlAttributes` | `IDictionary<string, object>` | `Record<string, any>` | Any HTML attributes |
| `isSticky` | `bool` | `boolean` | true \| false |
| `locale` | `string` | `string` | Culture codes (e.g., "en-US", "fr") |
| `mode` | `AppBarMode` | `AppBarMode` | Regular \| Prominent \| Dense |
| `position` | `AppBarPosition` | `AppBarPosition` | Top \| Bottom |

---

**Next Steps:**
- Review implementation guides: [Getting Started](getting-started.md)
- Explore all design patterns: [Design Patterns Guide](design-layouts.md)
- Learn customization: [Customization Guide](customization.md)
