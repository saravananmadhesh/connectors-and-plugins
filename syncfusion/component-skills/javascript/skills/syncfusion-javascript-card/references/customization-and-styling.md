# Customization and Styling

## Table of Contents
- [CSS Customization Patterns](#css-customization-patterns)
- [Element-Specific Styling](#element-specific-styling)
- [Layout Customization](#layout-customization)
- [Color and Typography](#color-and-typography)
- [Responsive Design](#responsive-design)
- [Theme Integration](#theme-integration)
- [Advanced Styling Examples](#advanced-styling-examples)

---

## CSS Customization Patterns

### Global Card Styling

Apply custom styles to all card elements in your application:

```css
/* Override default card styling */
.e-card {
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    padding: 0;
    margin: 10px;
    transition: box-shadow 0.3s ease;
}

.e-card:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}
```

### CSS Class Naming

Create reusable custom card classes:

```css
/* Card variant - elevated */
.e-card.card-elevated {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

/* Card variant - outlined */
.e-card.card-outlined {
    border: 1px solid #e0e0e0;
    box-shadow: none;
}

/* Card variant - flat */
.e-card.card-flat {
    background-color: #f5f5f5;
    box-shadow: none;
    border: none;
}
```

### CSS Variables (Theming)

```css
:root {
    --card-bg-color: #ffffff;
    --card-text-color: #333333;
    --card-border-color: #e0e0e0;
    --card-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    --card-border-radius: 8px;
    --card-padding: 16px;
}

.e-card {
    background-color: var(--card-bg-color);
    color: var(--card-text-color);
    border: 1px solid var(--card-border-color);
    box-shadow: var(--card-shadow);
    border-radius: var(--card-border-radius);
    padding: var(--card-padding);
}
```

---

## Element-Specific Styling

### Card Container

Customize the root card element:

```css
.e-card {
    background-color: #f9f9f9;
    padding: 20px;
    margin-bottom: 20px;
    border-radius: 12px;
    border: 1px solid #e8e8e8;
}
```

### Header Styling

```css
.e-card .e-card-header {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-weight: 600;
    border-bottom: 1px solid #e8e8e8;
    padding-bottom: 12px;
    margin-bottom: 12px;
}
```

### Content Area

```css
.e-card .e-card-content {
    font-size: 14px;
    color: #666666;
    line-height: 1.6;
    font-weight: normal;
    padding: 8px 0;
}
```

### Header Title

```css
.e-card .e-card-header .e-card-header-caption .e-card-header-title {
    font-size: 18px;
    color: #333333;
    font-weight: 600;
    margin: 0;
}
```

### Subtitle

```css
.e-card .e-card-header .e-card-header-caption .e-card-sub-title {
    font-size: 14px;
    color: #888888;
    font-variant: normal;
    margin: 4px 0 0 0;
}
```

### Header Image

```css
.e-card .e-card-header .e-card-header-image {
    height: 48px;
    width: 48px;
    border-radius: 50%;
    margin-right: 12px;
    background-size: cover;
    background-position: center;
    flex-shrink: 0;
}
```

### Card Image

```css
.e-card .e-card-image {
    background-color: #f0f0f0;
    height: 200px;
    background-size: cover;
    background-position: center;
    border-radius: 8px 8px 0 0;
    position: relative;
}
```

### Image Title

```css
.e-card .e-card-image .e-card-title {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 16px;
    font-weight: 500;
    color: white;
    background: rgba(0, 0, 0, 0.6);
    padding: 12px;
}
```

### Separator/Divider

```css
.e-card .e-card-separator {
    height: 1px;
    background-color: #e8e8e8;
    margin: 16px 0;
    padding-bottom: 0;
}
```

### Action Buttons

```css
.e-card .e-card-actions .e-card-btn {
    padding: 10px 16px;
    background-color: #f5f5f5;
    color: #333333;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    transition: all 0.2s ease;
    margin: 0 4px;
}

.e-card .e-card-actions .e-card-btn:hover {
    background-color: #e8e8e8;
    border-color: #cccccc;
}

.e-card .e-card-actions .e-card-btn:active {
    background-color: #d0d0d0;
}
```

---

## Layout Customization

### Horizontal Alignment

```css
.e-card .e-card-horizontal {
    display: flex;
    flex-direction: row;
    gap: 16px;
    margin: auto;
    width: inherit;
}
```

### Stacked Vertical Layout within Horizontal

```css
.e-card .e-card-horizontal .e-card-stacked {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin: initial;
    flex: 1;
}
```

### Card Spacing and Margins

```css
.e-card {
    max-width: 400px;
    margin: 10px;
}

/* Grid layout */
.card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 20px;
    padding: 20px;
}

.card-grid .e-card {
    margin: 0;
}
```

### Card Container Width

```css
/* Full width with max-width constraint */
.e-card {
    width: 100%;
    max-width: 500px;
}

/* Flexible width for responsive layouts */
.e-card {
    flex: 1 1 calc(33% - 20px);
    min-width: 300px;
}
```

---

## Color and Typography

### Typography Stack

```css
.e-card {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 
                 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 
                 sans-serif;
}

.e-card .e-card-header .e-card-header-title {
    font-family: 'Georgia', 'Times New Roman', serif;
}
```

### Color Schemes

#### Light Theme

```css
.e-card {
    background-color: #ffffff;
    color: #333333;
}

.e-card .e-card-header {
    border-color: #e8e8e8;
}

.e-card .e-card-separator {
    background-color: #e8e8e8;
}

.e-card .e-card-content {
    color: #666666;
}
```

#### Dark Theme

```css
.e-card.dark-theme {
    background-color: #2d2d2d;
    color: #e0e0e0;
}

.e-card.dark-theme .e-card-header {
    border-color: #444444;
}

.e-card.dark-theme .e-card-separator {
    background-color: #444444;
}

.e-card.dark-theme .e-card-content {
    color: #b0b0b0;
}

.e-card.dark-theme .e-card-header .e-card-header-title {
    color: #ffffff;
}
```

#### Brand Color Theme

```css
.e-card.brand-theme {
    border-top: 4px solid #007bff;
    background: linear-gradient(135deg, #ffffff 0%, #f8fbff 100%);
}

.e-card.brand-theme .e-card-header .e-card-header-title {
    color: #007bff;
}

.e-card.brand-theme .e-card-actions .e-card-btn {
    background-color: #007bff;
    color: white;
    border: none;
}
```

### Font Sizes

```css
/* Small cards */
.e-card.card-small .e-card-header-title {
    font-size: 14px;
}

.e-card.card-small .e-card-content {
    font-size: 12px;
}

/* Large cards */
.e-card.card-large .e-card-header-title {
    font-size: 24px;
}

.e-card.card-large .e-card-content {
    font-size: 16px;
}
```

---

## Responsive Design

### Mobile-First Approach

```css
/* Mobile devices */
.e-card {
    width: 100%;
    padding: 12px;
    margin: 8px 0;
}

.e-card .e-card-image {
    height: 150px;
}

/* Tablets */
@media (min-width: 768px) {
    .e-card {
        padding: 16px;
        margin: 12px;
    }
    
    .e-card .e-card-image {
        height: 200px;
    }
}

/* Desktop */
@media (min-width: 1024px) {
    .e-card {
        padding: 20px;
        margin: 16px;
        max-width: 500px;
    }
    
    .e-card .e-card-image {
        height: 250px;
    }
}
```

### Horizontal Card Responsive

```css
.e-card.e-card-horizontal {
    flex-direction: row;
    gap: 16px;
}

@media (max-width: 600px) {
    .e-card.e-card-horizontal {
        flex-direction: column;
        gap: 12px;
    }
    
    .e-card.e-card-horizontal img {
        width: 100%;
        height: 200px;
        object-fit: cover;
    }
}
```

### Card Grid Responsive

```css
.card-container {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
}

@media (min-width: 600px) {
    .card-container {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (min-width: 1024px) {
    .card-container {
        grid-template-columns: repeat(3, 1fr);
    }
}
```

---

## Theme Integration

### Syncfusion Theme Customization

```css
/* Use Syncfusion CSS variables */
.e-card {
    background-color: var(--e-card-background, #ffffff);
    color: var(--e-card-foreground, #333333);
}

.e-card .e-card-header-title {
    color: var(--e-card-header-text, #1a1a1a);
    font-weight: var(--e-card-header-font-weight, 600);
}
```

### Custom Theme Switching

```javascript
// TypeScript example
class CardThemer {
    static setTheme(theme: 'light' | 'dark' | 'brand'): void {
        const cards = document.querySelectorAll('.e-card');
        cards.forEach((card) => {
            card.classList.remove('dark-theme', 'brand-theme');
            if (theme !== 'light') {
                card.classList.add(`${theme}-theme`);
            }
        });
    }
}

// Usage
CardThemer.setTheme('dark');
```

### CSS Theme File

```css
/* themes/light.css */
:root {
    --card-background: #ffffff;
    --card-border: #e0e0e0;
    --card-text: #333333;
    --card-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* themes/dark.css */
:root {
    --card-background: #2d2d2d;
    --card-border: #444444;
    --card-text: #e0e0e0;
    --card-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.e-card {
    background-color: var(--card-background);
    border-color: var(--card-border);
    color: var(--card-text);
    box-shadow: var(--card-shadow);
}
```

---

## Advanced Styling Examples

### Material Design Card

```css
.e-card.material-design {
    border-radius: 2px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 
                0 1px 2px rgba(0, 0, 0, 0.24);
    transition: box-shadow 0.3s ease;
    padding: 16px;
}

.e-card.material-design:hover {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16),
                0 3px 6px rgba(0, 0, 0, 0.23);
}
```

### Neumorphic Design

```css
.e-card.neumorphic {
    background: #e0e5ec;
    box-shadow: 9px 9px 16px #a3b1c6,
                -9px -9px 16px #ffffff;
    border-radius: 20px;
    padding: 24px;
}

.e-card.neumorphic .e-card-header-title {
    color: #1a1a2e;
}
```

### Glassmorphism Card

```css
.e-card.glass {
    background: rgba(255, 255, 255, 0.25);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    border: 1px solid rgba(255, 255, 255, 0.18);
    border-radius: 10px;
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
}
```

### Gradient Background Card

```css
.e-card.gradient-bg {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
}

.e-card.gradient-bg .e-card-header-title {
    color: white;
}

.e-card.gradient-bg .e-card-content {
    color: rgba(255, 255, 255, 0.9);
}
```

### Card with Border Left Accent

```css
.e-card.accent-left {
    border-left: 4px solid #007bff;
    padding-left: 16px;
}

.e-card.accent-left.error {
    border-left-color: #dc3545;
}

.e-card.accent-left.success {
    border-left-color: #28a745;
}

.e-card.accent-left.warning {
    border-left-color: #ffc107;
}
```

### Interactive Card with Scale

```css
.e-card.interactive {
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.e-card.interactive:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.e-card.interactive:active {
    transform: translateY(-2px);
}
```

---

## Performance Optimization

### CSS Best Practices

```css
/* Avoid excessive nesting */
/* ❌ Avoid */
.e-card .e-card-header .e-card-header-caption .e-card-header-title .title-text {
    color: red;
}

/* ✅ Prefer */
.e-card-header-title {
    color: red;
}
```

### Hardware Acceleration

```css
.e-card {
    will-change: transform, box-shadow;
    backface-visibility: hidden;
    perspective: 1000px;
}
```

### Transition Performance

```css
/* Performant transitions */
.e-card {
    transition: box-shadow 0.3s ease, 
                transform 0.3s ease;
}

/* Avoid expensive properties */
/* ❌ Avoid */
.e-card:hover {
    box-shadow: /* complex calculation */;
}

/* ✅ Prefer */
.e-card:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}
```

---

## Troubleshooting Styling Issues

### Issue: Styles not applying
**Solution**: Check CSS specificity and ensure styles are loaded after Syncfusion CSS:
```html
<link href="syncfusion.css" rel="stylesheet">
<link href="custom-styles.css" rel="stylesheet"> <!-- Load after -->
```

### Issue: Theme colors not working
**Solution**: Use `!important` only when necessary or increase specificity:
```css
.e-card.custom-theme {
    background-color: #f5f5f5 !important;
}
```

### Issue: Responsive design breaking
**Solution**: Test with correct media queries and mobile-first approach:
```css
/* Mobile first */
.e-card { /* styles */ }

/* Then add breakpoints */
@media (min-width: 768px) { /* tablet */ }
@media (min-width: 1024px) { /* desktop */ }
```

---

## See Also
- [Getting Started](getting-started.md) - Basic setup
- [Card Layouts and Images](card-layout.md) - Layout options
- [Header and Content](header-and-content.md) - Header styling
- [Action Buttons](action-buttons.md) - Button styling
