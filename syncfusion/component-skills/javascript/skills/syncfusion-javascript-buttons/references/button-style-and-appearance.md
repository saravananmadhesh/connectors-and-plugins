# Button - Style and Appearance (TypeScript)

## Table of Contents
- [Built-in CSS Classes](#built-in-css-classes)
- [Color Variants](#color-variants)
- [Button Types](#button-types)
- [Custom Styling](#custom-styling)
- [Theme Integration](#theme-integration)

## Built-in CSS Classes

The Button component provides predefined CSS classes for common styling needs:

| Class | Purpose |
|-------|---------|
| `e-primary` | Primary action button |
| `e-success` | Success/positive action |
| `e-info` | Information button |
| `e-warning` | Warning/caution button |
| `e-danger` | Danger/destructive action |
| `e-link` | Link-styled button |
| `e-flat` | Flat background-less style |
| `e-outline` | Outline/border-only style |
| `e-round` | Circular button |
| `e-block` | Full-width button |
| `e-small` | Small button size |
| `e-large` | Large button size |
| `e-round-corner` | Rounded corners |
| `e-disabled` | Disabled state |
| `e-active` | Active/pressed state |

## Color Variants

### Primary Color
```typescript
import { Button } from '@syncfusion/ej2-buttons';

const primaryBtn: Button = new Button({
  content: 'Primary',
  cssClass: 'e-primary'
});
primaryBtn.appendTo('#primary');
```

### Success Color
```typescript
const successBtn: Button = new Button({
  content: 'Success',
  cssClass: 'e-success'
});
successBtn.appendTo('#success');
```

### Info Color
```typescript
const infoBtn: Button = new Button({
  content: 'Info',
  cssClass: 'e-info'
});
infoBtn.appendTo('#info');
```

### Warning Color
```typescript
const warningBtn: Button = new Button({
  content: 'Warning',
  cssClass: 'e-warning'
});
warningBtn.appendTo('#warning');
```

### Danger Color
```typescript
const dangerBtn: Button = new Button({
  content: 'Danger',
  cssClass: 'e-danger'
});
dangerBtn.appendTo('#danger');
```

### Link Color
```typescript
const linkBtn: Button = new Button({
  content: 'Link',
  cssClass: 'e-link'
});
linkBtn.appendTo('#link');
```

## Button Types

### Solid Fill (Default)
```typescript
const solidBtn: Button = new Button({
  content: 'Solid',
  cssClass: 'e-primary'
});
solidBtn.appendTo('#solid');
```

### Flat Style
Removes background color:

```typescript
const flatBtn: Button = new Button({
  content: 'Flat',
  cssClass: 'e-flat e-primary'
});
flatBtn.appendTo('#flat');
```

### Outline Style
Border-only styling:

```typescript
const outlineBtn: Button = new Button({
  content: 'Outline',
  cssClass: 'e-outline e-primary'
});
outlineBtn.appendTo('#outline');
```

### Round Button
Circular shape:

```typescript
const roundBtn: Button = new Button({
  iconCss: 'e-icons e-plus',
  cssClass: 'e-round e-primary'
});
roundBtn.appendTo('#round');
```

## Custom Styling

### Override Default Styles
```css
/* Override e-primary color */
.custom-primary {
  background-color: #00695c !important;
  border-color: #00695c !important;
  color: #ffffff !important;
}

.custom-primary:hover {
  background-color: #004d40 !important;
}

.custom-primary:active {
  background-color: #003d32 !important;
}

.custom-primary:focus {
  box-shadow: inset 0 0 0 3px rgba(0, 105, 92, 0.2);
}

/* Disabled state */
.custom-primary:disabled {
  background-color: #e0e0e0 !important;
  color: #9e9e9e !important;
  cursor: not-allowed;
}
```

### TypeScript with Custom Class
```typescript
import { Button } from '@syncfusion/ej2-buttons';

const customBtn: Button = new Button({
  content: 'Custom',
  cssClass: 'e-primary custom-primary'
});
customBtn.appendTo('#custom');
```

### Inline Styles (Not Recommended)
```typescript
const styledBtn: Button = new Button({
  content: 'Styled',
  cssClass: 'e-primary'
});
styledBtn.appendTo('#styled');

// Apply inline styles (use CSS classes instead when possible)
const element = styledBtn.element;
element.style.fontSize = '16px';
element.style.padding = '12px 24px';
element.style.borderRadius = '4px';
```

## Theme Integration

### Using Theme CSS
```html
<!DOCTYPE html>
<html>
<head>
  <!-- Material theme (default) -->
  <link href="https://cdn.syncfusion.com/ej2/ej2-base/styles/material.css" rel="stylesheet" />
  <link href="https://cdn.syncfusion.com/ej2/ej2-buttons/styles/material.css" rel="stylesheet" />
  
  <!-- Or Bootstrap theme -->
  <!-- <link href="https://cdn.syncfusion.com/ej2/ej2-base/styles/bootstrap5.css" rel="stylesheet" />
  <link href="https://cdn.syncfusion.com/ej2/ej2-buttons/styles/bootstrap5.css" rel="stylesheet" /> -->
  
  <!-- Or Fluent theme -->
  <!-- <link href="https://cdn.syncfusion.com/ej2/ej2-base/styles/fluent.css" rel="stylesheet" />
  <link href="https://cdn.syncfusion.com/ej2/ej2-buttons/styles/fluent.css" rel="stylesheet" /> -->
</head>
<body>
  <button id="button"></button>
  <script src="bundle.js"></script>
</body>
</html>
```

### Switching Themes Dynamically
```typescript
import { Button } from '@syncfusion/ej2-buttons';

function switchTheme(themeName: string): void {
  // Remove current theme
  const existing = document.querySelector('link[data-theme]');
  if (existing) {
    existing.remove();
  }

  // Load new theme
  const themeLink = document.createElement('link');
  themeLink.rel = 'stylesheet';
  themeLink.href = `https://cdn.syncfusion.com/ej2/ej2-buttons/styles/${themeName}.css`;
  themeLink.setAttribute('data-theme', themeName);
  document.head.appendChild(themeLink);
}

// Switch to bootstrap theme
switchTheme('bootstrap5');

const button: Button = new Button({
  content: 'Themed',
  cssClass: 'e-primary'
});
button.appendTo('#button');
```

### Available Themes
- `material` - Material Design
- `bootstrap5` - Bootstrap 5
- `fluent` - Fluent Design
- `tailwind3` - Tailwind CSS
- `fabric` - Fabric/Office 365

## Advanced Customization

### Custom Button with Animation
```typescript
import { Button } from '@syncfusion/ej2-buttons';

const animatedBtn: Button = new Button({
  content: 'Animated',
  cssClass: 'e-primary animated-button'
});
animatedBtn.appendTo('#animated');
```

**CSS with Animation:**
```css
.animated-button {
  transition: all 0.3s ease-in-out;
}

.animated-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.animated-button:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Ripple effect on click */
.animated-button::after {
  content: '';
  position: absolute;
  width: 10px;
  height: 10px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  animation: ripple 0.6s ease-out;
}

@keyframes ripple {
  to {
    width: 100px;
    height: 100px;
    opacity: 0;
  }
}
```

### Dark Mode Support
```css
/* Light mode */
.e-primary {
  background-color: #0066cc;
  color: #ffffff;
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  .e-primary {
    background-color: #3399ff;
    color: #ffffff;
  }
  
  .e-primary:hover {
    background-color: #1a80ff;
  }
}
```

### CSS Variable Customization
```css
:root {
  --ej2-button-primary-bg: #0066cc;
  --ej2-button-primary-text: #ffffff;
  --ej2-button-padding: 8px 16px;
  --ej2-button-border-radius: 4px;
}

button.e-primary {
  background-color: var(--ej2-button-primary-bg);
  color: var(--ej2-button-primary-text);
  padding: var(--ej2-button-padding);
  border-radius: var(--ej2-button-border-radius);
}
```

## Best Practices

1. **Use CSS classes:** Prefer built-in classes over inline styles
2. **Consistent spacing:** Use theme-consistent padding/margins
3. **Accessible colors:** Ensure 4.5:1 contrast ratio
4. **Clear states:** Visual difference for hover, active, disabled
5. **Responsive:** Test on mobile/tablet with touch targets (48x48px)
6. **Performance:** Minimize custom CSS and animations
7. **Theme support:** Test with multiple themes
8. **Dark mode:** Support system dark mode preference
