# Styling and Customization in Angular AppBar

## Table of Contents
- [Overview](#overview)
- [Built-in CSS Classes](#built-in-css-classes)
- [CssClass Property](#cssclass-property)
- [HtmlAttributes](#htmlattributes)
- [Custom Styling](#custom-styling)
- [Theme Studio Integration](#theme-studio-integration)

## Overview

The Syncfusion Angular AppBar component offers extensive customization options through built-in CSS classes, custom styling properties, and theme configuration. These options allow you to create AppBars that seamlessly integrate with your application's design system.

## Built-in CSS Classes

The AppBar component automatically applies CSS classes based on its configuration. You can target these classes to customize appearance.

### Core AppBar Classes

| CSS Class | Purpose |
|-----------|---------|
| `.e-appbar` | Base AppBar container |
| `.e-appbar.e-light` | Light color mode styling |
| `.e-appbar.e-dark` | Dark color mode styling |
| `.e-appbar.e-primary` | Primary color mode styling |
| `.e-appbar.e-inherit` | Inherit color mode styling |
| `.e-appbar.e-regular` | Regular size mode styling |
| `.e-appbar.e-prominent` | Prominent size mode styling |
| `.e-appbar.e-dense` | Dense size mode styling |

### Content Element Classes

| CSS Class | Purpose |
|-----------|---------|
| `.e-appbar-spacer` | Flexible spacing element |
| `.e-appbar-separator` | Vertical separator line |

### Usage Examples

```css
/* Customize light AppBar */
.e-appbar.e-light {
  background-color: #f5f5f5;
  color: #333333;
}

/* Customize primary AppBar */
.e-appbar.e-primary {
  background-color: #2196F3;
  color: #ffffff;
}

/* Customize prominent dark AppBar */
.e-appbar.e-prominent.e-dark {
  height: 140px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
}

/* Customize dense light AppBar */
.e-appbar.e-dense.e-light {
  height: 44px;
  border-bottom: 1px solid #e0e0e0;
}

/* Customize spacer appearance */
.e-appbar-spacer {
  flex: 1;
}

/* Customize separator */
.e-appbar-separator {
  margin: 0 8px;
  opacity: 0.5;
}
```

## CssClass Property

The `cssClass` property allows you to apply one or more custom CSS classes to the AppBar. Use this for application-specific styling without modifying component internals.

### Basic CssClass Usage

```typescript
import { AppBarModule } from '@syncfusion/ej2-angular-navigations'
import { ButtonModule } from '@syncfusion/ej2-angular-buttons'
import { Component } from "@angular/core";

@Component({
  imports: [AppBarModule, ButtonModule],
  standalone: true,
  selector: "app-root",
  template: `
    <div class="control-container">
      <ejs-appbar colorMode="Primary" cssClass="custom-appbar">
        <button #defaultButtonMenu ejs-button cssClass="e-inherit" iconCss="e-icons e-home"></button>
      </ejs-appbar>
    </div>
  `,
})
export class AppComponent { }
```

### Multiple CSS Classes

Apply multiple classes by separating them with spaces:

```typescript
<ejs-appbar colorMode="Primary" cssClass="custom-appbar shadowed-appbar responsive-appbar">
  <!-- content -->
</ejs-appbar>
```

### Custom Styling Example

```css
/* Custom AppBar with gradient background */
.custom-appbar.e-appbar {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 16px;
}

/* Add shadow to AppBar */
.shadowed-appbar {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

/* Responsive padding */
.responsive-appbar {
  padding: 12px 8px;
}

@media (min-width: 768px) {
  .responsive-appbar {
    padding: 16px 24px;
  }
}
```

## HtmlAttributes

The `htmlAttributes` directive allows you to add inline HTML attributes (like `aria-label`, `data-*`, etc.) to the AppBar element.

### HtmlAttributes Example

```typescript
import { AppBarModule } from '@syncfusion/ej2-angular-navigations'
import { ButtonModule } from '@syncfusion/ej2-angular-buttons'
import { Component } from "@angular/core";

@Component({
  imports: [AppBarModule, ButtonModule],
  standalone: true,
  selector: "app-root",
  template: `
    <div class="control-container">
      <ejs-appbar colorMode="Primary" aria-label="Main application header" role="banner">
        <button #defaultButtonMenu ejs-button cssClass="e-inherit" iconCss="e-icons e-home"></button>
      </ejs-appbar>
    </div>
  `,
})
export class AppComponent { }
```

### Common HTML Attributes

| Attribute | Purpose | Example |
|-----------|---------|---------|
| `aria-label` | Accessibility label | `aria-label="Main navigation"` |
| `role` | ARIA role | `role="banner"` |
| `data-*` | Custom data attributes | `data-theme="dark"` |
| `id` | Element identifier | `id="main-appbar"` |
| `title` | Tooltip text | `title="Application Header"` |

### Accessibility Example

```typescript
<ejs-appbar 
  colorMode="Primary"
  aria-label="Main navigation header"
  role="banner"
  tabindex="0">
  <button 
    ejs-button 
    cssClass="e-inherit" 
    iconCss="e-icons e-menu"
    aria-label="Open navigation menu">
  </button>
</ejs-appbar>
```

## Custom Styling

Create custom styles for AppBar by targeting its classes or applying custom CSS.

### Advanced Custom Styling Example

```css
/* Modern gradient AppBar */
.modern-appbar.e-appbar {
  background: linear-gradient(90deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);
  border-radius: 0 0 12px 12px;
  position: relative;
  z-index: 1000;
}

/* Typography customization */
.modern-appbar.e-appbar span {
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

/* Button customization within AppBar */
.modern-appbar.e-appbar .e-btn {
  transition: all 0.3s ease;
}

.modern-appbar.e-appbar .e-btn:hover {
  transform: scale(1.1);
  background-color: rgba(255, 255, 255, 0.2);
}

/* Spacer and separator styling */
.modern-appbar .e-appbar-spacer {
  flex: 1;
}

.modern-appbar .e-appbar-separator {
  background-color: rgba(255, 255, 255, 0.5);
  margin: 0 12px;
}
```

### Responsive Custom Styling

```css
/* Desktop: Standard AppBar */
.responsive-custom-appbar.e-appbar {
  padding: 16px 32px;
  height: 70px;
}

/* Tablet: Reduced padding */
@media (max-width: 1024px) {
  .responsive-custom-appbar.e-appbar {
    padding: 12px 16px;
    height: 60px;
  }
}

/* Mobile: Minimal padding */
@media (max-width: 768px) {
  .responsive-custom-appbar.e-appbar {
    padding: 8px 12px;
    height: 50px;
  }
  
  .responsive-custom-appbar.e-appbar span {
    font-size: 14px;
  }
}
```

### Animation and Transitions

```css
/* Smooth color transitions */
.animated-appbar.e-appbar {
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

/* Scroll effect: Change AppBar on scroll */
.animated-appbar.e-appbar.scrolled {
  background-color: rgba(33, 150, 243, 0.95);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* Hover effects on buttons */
.animated-appbar button.e-btn {
  position: relative;
  overflow: hidden;
}

.animated-appbar button.e-btn::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.animated-appbar button.e-btn:hover::after {
  width: 300px;
  height: 300px;
}
```

## Theme Studio Integration

Syncfusion Theme Studio allows you to create and customize themes visually without writing CSS. Access it at [Theme Studio](https://ej2.syncfusion.com/themestudio/?theme=material).

### Using Custom Themes

1. **Visit Theme Studio**: Go to https://ej2.syncfusion.com/themestudio/
2. **Customize Colors**: Adjust primary, accent, and neutral colors
3. **Export Theme**: Download the custom theme CSS file
4. **Import in Angular**: Add the theme to your `style.css`:

```css
/* Your custom theme from Theme Studio */
@import "../themes/custom-theme.css";
```

### Example Theme Override

After generating a custom theme, you can override specific variables:

```css
/* Custom theme variables */
:root {
  --primary-color: #667eea;
  --accent-color: #764ba2;
  --surface-color: #ffffff;
  --text-color: #333333;
}

/* Apply to AppBar */
.e-appbar {
  background: var(--primary-color);
  color: var(--text-color);
}

.e-appbar.e-dark {
  background: #1a1a1a;
  color: #ffffff;
}
```

## Complete Customization Example

```typescript
import { AppBarModule } from '@syncfusion/ej2-angular-navigations'
import { ButtonModule } from '@syncfusion/ej2-angular-buttons'
import { Component } from "@angular/core";

@Component({
  imports: [AppBarModule, ButtonModule],
  standalone: true,
  selector: "app-root",
  template: `
    <div class="control-container">
      <ejs-appbar 
        colorMode="Primary" 
        cssClass="fully-customized-appbar"
        aria-label="Customized application header"
        data-theme="modern">
        <button 
          #menuBtn 
          ejs-button 
          cssClass="e-inherit menu-btn" 
          iconCss="e-icons e-menu"
          aria-label="Menu">
        </button>
        <span class="appbar-title">My Custom App</span>
        <div class="e-appbar-spacer"></div>
        <button 
          #settingsBtn 
          ejs-button 
          cssClass="e-inherit" 
          iconCss="e-icons e-settings"
          aria-label="Settings">
        </button>
        <button 
          #profileBtn 
          ejs-button 
          cssClass="e-inherit" 
          iconCss="e-icons e-user"
          aria-label="Profile">
        </button>
      </ejs-appbar>
    </div>
  `,
})
export class AppComponent { }
```

### Corresponding CSS

```css
/* Fully customized AppBar */
.fully-customized-appbar.e-appbar {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.3);
  padding: 12px 20px;
  position: relative;
}

/* Title styling */
.fully-customized-appbar .appbar-title {
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #ffffff;
  margin: 0 12px;
}

/* Menu button styling */
.fully-customized-appbar .menu-btn {
  margin-right: 12px;
}

/* Button hover effects */
.fully-customized-appbar .e-btn {
  color: #ffffff;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.fully-customized-appbar .e-btn:hover {
  background-color: rgba(255, 255, 255, 0.15);
  transform: translateY(-2px);
}

.fully-customized-appbar .e-btn:active {
  transform: translateY(0);
  background-color: rgba(255, 255, 255, 0.25);
}

/* Spacer spacing */
.fully-customized-appbar .e-appbar-spacer {
  flex: 1;
}

/* Separator styling */
.fully-customized-appbar .e-appbar-separator {
  background-color: rgba(255, 255, 255, 0.4);
  margin: 0 8px;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .fully-customized-appbar.e-appbar {
    padding: 8px 12px;
  }
  
  .fully-customized-appbar .appbar-title {
    font-size: 16px;
    margin: 0 8px;
  }
}
```

## Best Practices for Styling

1. **Use cssClass for application-specific styling**: Keep component styling separate
2. **Maintain color contrast**: Ensure text is readable on background (WCAG compliance)
3. **Test across themes**: Verify styling works with different color modes
4. **Use CSS variables**: Leverage custom properties for maintainability
5. **Minimize specificity**: Use low-specificity selectors to allow easy overrides
6. **Responsive design**: Test and adjust styles for all screen sizes
7. **Animation performance**: Use CSS transforms and opacity for smooth animations
8. **Accessibility first**: Test with screen readers and keyboard navigation
9. **Theme consistency**: Use Theme Studio for cohesive design across all components
10. **Documentation**: Comment complex styling for team maintenance
