# Styling and Customization

## Table of Contents
- [CSS Classes](#css-classes)
- [CssClass Property](#cssclass-property)
- [HtmlAttributes](#htmlattributes)
- [Theme Studio Integration](#theme-studio-integration)

## CSS Classes

The AppBar component provides predefined CSS classes for styling different modes and states.

### Core CSS Classes

| CSS Class | Purpose | Example |
|-----------|---------|---------|
| `.e-appbar` | Base AppBar styling | All AppBars |
| `.e-appbar.e-prominent` | Prominent mode | Large headers |
| `.e-appbar.e-dense` | Dense mode | Compact bars |
| `.e-appbar.e-light` | Light color mode | Default theme |
| `.e-appbar.e-dark` | Dark color mode | Dark theme |
| `.e-appbar.e-primary` | Primary color mode | Brand color |
| `.e-appbar.e-inherit` | Inherit mode | Custom colors |

### CSS Class Combinations

```css
/* Regular size + Primary color */
.e-appbar.e-primary {
    background: #1976d2;
    color: #ffffff;
}

/* Prominent size + Dark color */
.e-appbar.e-prominent.e-dark {
    background: #212121;
    height: 350px;
}

/* Dense size + Light color */
.e-appbar.e-dense.e-light {
    background: #f5f5f5;
    height: 40px;
}
```

## CssClass Property

The `cssClass` property applies custom CSS classes to the AppBar for advanced styling.

### Basic CssClass Usage

```ts
import { AppBar } from "@syncfusion/ej2-navigations";
import { Button } from "@syncfusion/ej2-buttons";

// Apply custom CSS class
const appbar: AppBar = new AppBar({
  colorMode: 'Primary',
  cssClass: 'custom-appbar'
});
appbar.appendTo("#appbar");

const menuBtn: Button = new Button({
  cssClass: 'e-inherit',
  iconCss: 'e-icons e-menu'
});
menuBtn.appendTo('#menuBtn');
```

### Custom CSS for AppBar

```css
/* Custom styling with e-inherit color mode */
.e-appbar.custom-appbar {
    background: #ff5722;
    color: #ffffff;
    border-bottom: 3px solid #ff9100;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

/* Custom button styling */
.e-appbar.custom-appbar .e-btn.e-inherit {
    margin: 0 8px;
    border-radius: 4px;
}

.e-appbar.custom-appbar .e-btn.e-inherit:hover {
    background: rgba(255, 255, 255, 0.15);
}
```

### HTML Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <title>CssClass Customization</title>
    <link href="url" rel="stylesheet" />
    <link href="url" rel="stylesheet" />
    <link href="url" rel="stylesheet" />
    
    <style>
        .e-appbar.custom-appbar {
            background: #ff5722;
            color: #ffffff;
            border-bottom: 3px solid #ff9100;
        }
    </style>
</head>
<body>
    <header id="appbar">
        <button id="menuBtn"></button>
        <span>Custom AppBar</span>
        <div class="e-appbar-spacer"></div>
        <button id="homeBtn"></button>
    </header>
</body>
</html>
```

### Multiple CSS Classes

```ts
// Apply multiple classes
const appbar = new AppBar({
  colorMode: 'Primary',
  cssClass: 'custom-appbar elevated-appbar'
});
appbar.appendTo("#appbar");
```

```css
.e-appbar.custom-appbar {
    background: #ff5722;
}

.e-appbar.elevated-appbar {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
```

## HtmlAttributes

The `htmlAttributes` property sets HTML attributes like ARIA labels for accessibility and data attributes.

### Basic HtmlAttributes Usage

```ts
import { AppBar } from "@syncfusion/ej2-navigations";
import { Button } from "@syncfusion/ej2-buttons";

// Set ARIA and data attributes
const appbar: AppBar = new AppBar({
  colorMode: 'Primary',
  htmlAttributes: {
    'aria-label': 'Main application navigation bar',
    'role': 'navigation',
    'data-testid': 'app-header'
  }
});
appbar.appendTo("#appbar");
```

### Generated HTML

```html
<header 
  id="appbar" 
  class="e-appbar e-primary" 
  aria-label="Main application navigation bar"
  role="navigation"
  data-testid="app-header">
  <!-- AppBar content -->
</header>
```

### Common ARIA Attributes

```ts
const appbar = new AppBar({
  colorMode: 'Primary',
  htmlAttributes: {
    'aria-label': 'Main navigation',           // Describe purpose
    'role': 'navigation',                       // Semantic role
    'aria-expanded': 'false',                   // State tracking
    'data-testid': 'header',                    // Testing
    'data-analytics': 'main-nav'                // Analytics
  }
});
appbar.appendTo("#appbar");
```

### HTML Structure with ARIA

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <title>Accessibility with HtmlAttributes</title>
    <link href="url" rel="stylesheet" />
    <link href="url" rel="stylesheet" />
    <link href="url" rel="stylesheet" />
</head>
<body>
    <header id="appbar"></header>
</body>
</html>
```

### ARIA with JavaScript

```ts
import { AppBar } from "@syncfusion/ej2-navigations";

const appbar = new AppBar({
  colorMode: 'Primary',
  htmlAttributes: {
    'aria-label': 'Main navigation bar',
    'role': 'banner'
  }
});
appbar.appendTo("#appbar");

// Access ARIA attributes
const ariaLabel = appbar.element.getAttribute('aria-label');
console.log(ariaLabel); // "Main navigation bar"
```

## Theme Studio Integration

Syncfusion Theme Studio allows visual theme customization without manual CSS.

### Accessing Theme Studio

1. Visit: [Syncfusion Theme Studio](url)
2. Select **AppBar** component
3. Customize colors, spacing, and sizing
4. Download custom theme CSS

### Using Custom Theme from Theme Studio

```ts
import { AppBar } from "@syncfusion/ej2-navigations";

const appbar: AppBar = new AppBar({
  colorMode: 'Primary'
});
appbar.appendTo("#appbar");
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <title>Custom Theme</title>
    
    <!-- Base styles -->
    <link href="url" rel="stylesheet" />
    <link href="url" rel="stylesheet" />
    
    <!-- Custom theme from Theme Studio -->
    <link href="custom-theme.css" rel="stylesheet" />
</head>
<body>
    <header id="appbar"></header>
</body>
</html>
```

## Advanced Customization Examples

### Example 1: Gradient Background

```ts
const appbar = new AppBar({
  colorMode: 'Inherit',
  cssClass: 'gradient-appbar'
});
appbar.appendTo("#appbar");
```

```css
.e-appbar.gradient-appbar {
    background: linear-gradient(
        to right,
        #667eea 0%,
        #764ba2 100%
    );
    color: #ffffff;
}

.e-appbar.gradient-appbar .e-inherit {
    background: transparent;
    color: inherit;
}

.e-appbar.gradient-appbar .e-inherit:hover {
    background: rgba(255, 255, 255, 0.15);
}
```

### Example 2: Glass Morphism Effect

```ts
const appbar = new AppBar({
  cssClass: 'glass-morphism'
});
appbar.appendTo("#appbar");
```

```css
.e-appbar.glass-morphism {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    color: #ffffff;
}
```

### Example 3: Material Design Elevation

```ts
const appbar = new AppBar({
  colorMode: 'Primary',
  cssClass: 'material-elevated'
});
appbar.appendTo("#appbar");
```

```css
.e-appbar.material-elevated {
    box-shadow: 
        0px 2px 1px -1px rgba(0, 0, 0, 0.2),
        0px 1px 1px 0px rgba(0, 0, 0, 0.14),
        0px 1px 3px 0px rgba(0, 0, 0, 0.12);
}

.e-appbar.material-elevated .e-btn.e-inherit {
    transition: background-color 0.2s ease;
}
```

### Example 4: Rounded Corners

```ts
const appbar = new AppBar({
  colorMode: 'Primary',
  cssClass: 'rounded-appbar'
});
appbar.appendTo("#appbar");
```

```css
.e-appbar.rounded-appbar {
    border-radius: 12px;
    margin: 12px;
}

.e-appbar.rounded-appbar .e-btn.e-inherit {
    border-radius: 8px;
    margin: 0 4px;
}
```

### Example 5: Sticky with Shadow

```ts
const appbar = new AppBar({
  colorMode: 'Primary',
  isSticky: true,
  cssClass: 'sticky-shadow'
});
appbar.appendTo("#appbar");
```

```css
.e-appbar.sticky-shadow {
    position: sticky;
    top: 0;
    z-index: 10;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s ease;
}

.e-appbar.sticky-shadow.scrolled {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
```

## Responsive Customization

```css
/* Desktop view */
@media (min-width: 1024px) {
    .e-appbar.custom-appbar {
        height: 64px;
        padding: 0 24px;
    }
}

/* Tablet view */
@media (min-width: 600px) and (max-width: 1023px) {
    .e-appbar.custom-appbar {
        height: 56px;
        padding: 0 16px;
    }
}

/* Mobile view */
@media (max-width: 599px) {
    .e-appbar.custom-appbar {
        height: 48px;
        padding: 0 12px;
    }
    
    .e-appbar.custom-appbar .e-btn.e-inherit {
        margin: 0 4px;
    }
}
```

## Troubleshooting

**Issue: Custom styles not applying**
- Ensure CSS is loaded after Syncfusion styles
- Use `!important` if necessary (last resort)
- Check class names match exactly

**Issue: Styles affecting other components**
- Use more specific selectors: `.e-appbar.custom-appbar`
- Scope styles properly to avoid global pollution

**Issue: Theme changes not visible**
- Clear browser cache
- Reload page
- Check CSS specificity

## Next Steps

- Follow **best practices** with [Accessibility Guide](best-practices-and-accessibility.md)
- Create **complex layouts** with [Layout Patterns](layout-patterns-and-design.md)
- Learn **positioning** with [Positioning Guide](positioning-and-sticky.md)

