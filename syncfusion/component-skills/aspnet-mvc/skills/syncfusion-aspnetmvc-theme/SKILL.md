---
name: syncfusion-aspnetmvc-theme
description: "**THEMING & APPEARANCE GUIDE** — Assist with Syncfusion ASP.NET MVC EJ2 component theming, customization, size modes, dynamic theme switching, and icon integration. Use when: applying themes (Bootstrap, Material, Tailwind, Fluent, etc.), customizing via SCSS or Theme Studio, enabling touch/size modes, or managing appearance dynamically."
metadata:
  author: "Syncfusion Inc"
  version: "34.1.29"
  platform: "ASP.NET MVC"
---

# Syncfusion ASP.NET MVC — Theming & Appearance

High-level guidance for theme selection, delivery methods, size modes, and appearance customization. Detailed examples, SCSS patterns, Theme Studio usage, icon integration, and dynamic switching code live in the references.

## When to Use
- Choosing or applying a theme (Bootstrap, Material, Tailwind, Fluent, Fabric, High Contrast, etc.)
- Customizing themes via Theme Studio or SCSS overrides
- Implementing dynamic theme switching at runtime
- Enabling touch mode (`.e-bigger`) for accessibility and mobile responsiveness
- Customizing component sizes, colors, fonts, or other visual properties
- Integrating Syncfusion icons or custom icon sets
- Supporting dark mode/light mode switching

## Available Themes (ASP.NET MVC 5)
| Theme | Light CSS | Dark CSS | Use Case |
|-------|-----------|----------|----------|
| **Bootstrap 5** | bootstrap5.css | bootstrap5-dark.css | Modern Bootstrap v5 designs |
| **Bootstrap 4** | bootstrap4.css | (none) | Legacy Bootstrap v4 apps |
| **Material** | material.css | material-dark.css | Google Material Design |
| **Tailwind** | tailwind.css | tailwind-dark.css | Utility-first, modern UX |
| **Fluent** | fluent.css | fluent-dark.css | Microsoft Fluent Design System |
| **Fabric** | fabric.css | fabric-dark.css | Microsoft Office Fabric (legacy) |
| **High Contrast** | highcontrast.css | (none) | Accessibility, vision impairment |

## Theme Delivery Methods (in order of performance)

### 1. CDN (Easiest, Recommended for most apps)
- **Pros**: No build setup, always current, fast delivery
- **Cons**: External dependency, version management required
- **Location**: Reference in `~/Views/Shared/_Layout.cshtml` head
- **Version**: Must match Syncfusion.EJ2.MVC5 package version

### 2. Custom Resource Generator (CRG) (Best for production)
- **Pros**: Optimized bundle, only used components, best performance
- **Cons**: Requires setup, extra build step
- **Use**: https://crg.syncfusion.com/ (web tool)
- **Output**: Minimal CSS/JS for selected controls

### 3. NPM Packages (For advanced customization)
- **Pros**: Full SCSS source, can customize variables
- **Cons**: Requires build pipeline (Gulp, npm), more complex
- **Method**: Install `@syncfusion/ej2-*` via npm, use Gulp to copy to Content folder
- **Result**: Full control over theming via SCSS

### 4. Local Files (Legacy, not recommended)
- **Pros**: Complete control, offline access
- **Cons**: Manual updates, version management, maintenance burden
- **Use**: Only for air-gapped or specialized environments

## Size Modes & Responsiveness

### Touch Mode (`.e-bigger`)
- **Purpose**: Larger controls, better for touch devices, accessibility
- **Implementation**: Add `.e-bigger` CSS class to container
- **Options**:
  - Application-wide: Add class to `<body>`
  - Control-specific: Add class to div wrapping control
  - Runtime toggle: Add/remove class via JavaScript

### Responsive Design
- Sidebar auto-close on small screens
- DataGrid responsive columns
- Dashboard Layout adaptive mode
- Toolbar overflow mode
- Tab responsive modes

## Quick Checklist
✓ Choose theme based on design requirements (Bootstrap, Material, Tailwind, Fluent, etc.)  
✓ Select delivery method: CDN (easiest), CRG (optimized), NPM (customizable), or local  
✓ Add theme CSS to `_Layout.cshtml` head; ensure version matches NuGet package  
✓ Add theme CSS for dark variant if needed (e.g., material-dark.css)  
✓ Add `.e-bigger` class if touch mode/accessibility required  
✓ Test theme in multiple browsers (Chrome, Firefox, Edge, Safari)  
✓ For dynamic switching: Add `id` to CSS link; update `href` on theme change  
✓ For customization: Use Theme Studio or SCSS overrides; document customizations  
✓ Icons: Use Syncfusion's built-in icon classes or integrate FontAwesome/Bootstrap Icons  

## Icon Integration

### Syncfusion Built-in Icons
- Included in all themes, no additional setup
- Classes: `e-icon-*` (e.g., `e-icons e-icon-edit`)
- CDN or embedded in theme CSS

### Third-party Icons (Bootstrap Icons, FontAwesome)
- Install via NuGet or npm
- Reference CSS in _Layout.cshtml
- Use icon classes in control properties or HTML

### Custom Icons
- Convert SVG to icon font or base64 data URIs
- Define CSS classes mapping to icons
- Apply to controls via icon properties

## References
- Theme & CDN reference setup: [references/theme-appearance.md](references/theme-appearance.md)
