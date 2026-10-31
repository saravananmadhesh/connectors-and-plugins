# Styling and Accessibility in Syncfusion TypeScript Toolbar

## Table of Contents
- [CSS Structure and Classes](#css-structure-and-classes)
- [Theme Classes](#theme-classes)
- [Color and Appearance Customization](#color-and-appearance-customization)
- [WCAG Compliance](#wcag-compliance)
- [Keyboard Accessibility](#keyboard-accessibility)
- [Screen Reader Support](#screen-reader-support)
- [Best Practices](#best-practices)

## CSS Structure and Classes

Understanding Toolbar's CSS structure allows for precise customization.

### Core CSS Classes

| Class | Element | Purpose |
|-------|---------|---------|
| `.e-toolbar` | Root container | Main toolbar wrapper |
| `.e-toolbar-item` | Item container | Individual toolbar item |
| `.e-tbar-btn` | Button element | Toolbar button styling |
| `.e-tbar-btn-text` | Text content | Button text node |
| `.e-icons` | Icon element | Icon styling |
| `.e-btn-icon` | Icon variant | Button-specific icon |
| `.e-separator` | Separator line | Visual divider |
| `.e-overflow-button` | Overflow control | Popup/scroll button |

### Customizing Toolbar Container

```css
.e-toolbar {
    border: 5px solid rgb(173, 255, 47);
    background-color: #f5f5f5;
    padding: 0 15px;
}
```

### Customizing Toolbar Items

```css
.e-toolbar .e-toolbar-item {
    background: #add8e6;
    border: 1px solid #5a70cc;
    border-radius: 4px;
    margin: 0 4px;
}
```

### Customizing Toolbar Buttons

```css
.e-toolbar .e-tbar-btn {
    background: #add8e6;
    border: 1px solid #5a70cc;
    border-radius: 4px;
    padding: 8px 12px;
    transition: background 0.3s ease;
}

.e-toolbar .e-tbar-btn:hover {
    background: #a0c8d8;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.e-toolbar .e-tbar-btn:active {
    background: #8fb5c5;
}
```

### Customizing Icons

```css
.e-toolbar .e-icons {
    background: #185655;
    color: #d7f9d4;
    font-size: 16px;
    margin-right: 5px;
}

.e-toolbar .e-tbar-btn .e-icons.e-btn-icon {
    font-size: 14px !important;
}
```

### Customizing Button Text

```css
.e-toolbar .e-tbar-btn-text {
    font-weight: 600;
    color: #333;
    font-size: 13px;
}
```

## Theme Classes

Apply Syncfusion themes using CSS class names.

### Available Themes

| Class Prefix | Theme | Use Case |
|--------------|-------|----------|
| `.e-fluent2` | Fluent2 | Modern, default |
| `.e-bootstrap5` | Bootstrap 5 | Bootstrap compatibility |
| `.e-material` | Material | Material Design |
| `.e-fabric` | Fabric | Microsoft Office style |
| `.e-highcontrast` | High Contrast | Accessibility, dark backgrounds |

### Apply Theme via HTML Class

```html
<!DOCTYPE html>
<html>
<head>
    <!-- Theme CSS -->
    <link href="url" rel="stylesheet" />
</head>
<body class="e-bootstrap5">  <!-- Apply theme class -->
    <div id="element"></div>
</body>
</html>
```

### Material Theme Styling

```css
.e-material .e-toolbar {
    background: #2196F3;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.e-material .e-tbar-btn {
    color: #ffffff;
    background: transparent;
    text-transform: uppercase;
    font-size: 12px;
    letter-spacing: 0.5px;
}

.e-material .e-tbar-btn:hover {
    background: rgba(255, 255, 255, 0.1);
}
```

### Bootstrap 5 Theme Integration

```css
.e-bootstrap5 .e-toolbar {
    background-color: #f8f9fa;
    border: 1px solid #dee2e6;
}

.e-bootstrap5 .e-tbar-btn {
    color: #212529;
    border: 1px solid #dee2e6;
}

.e-bootstrap5 .e-tbar-btn:hover {
    background-color: #e2e6ea;
}
```

## Color and Appearance Customization

### Button Color Variants

```css
/* Primary button */
.e-tbar-btn.primary {
    background: #2196F3;
    color: #ffffff;
    border: none;
}

.e-tbar-btn.primary:hover {
    background: #1976D2;
}

/* Success button */
.e-tbar-btn.success {
    background: #4CAF50;
    color: #ffffff;
}

.e-tbar-btn.success:hover {
    background: #45a049;
}

/* Danger button */
.e-tbar-btn.danger {
    background: #f44336;
    color: #ffffff;
}

.e-tbar-btn.danger:hover {
    background: #da190b;
}

/* Warning button */
.e-tbar-btn.warning {
    background: #ff9800;
    color: #ffffff;
}

.e-tbar-btn.warning:hover {
    background: #e68900;
}
```

### Size Customization

```css
/* Small buttons */
.e-tbar-btn.sm {
    padding: 4px 8px;
    font-size: 12px;
}

/* Large buttons */
.e-tbar-btn.lg {
    padding: 12px 20px;
    font-size: 16px;
}

/* Icon-only buttons */
.e-tbar-btn.icon-only {
    padding: 6px;
}

.e-tbar-btn.icon-only .e-tbar-btn-text {
    display: none;
}
```

### Gradient and Shadow Effects

```css
/* Gradient background */
.e-tbar-btn.gradient {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: #ffffff;
    border: none;
}

.e-tbar-btn.gradient:hover {
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

/* Elevated shadow */
.e-tbar-btn.elevated {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.e-tbar-btn.elevated:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.e-tbar-btn.elevated:active {
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}
```

## WCAG Compliance

Ensure toolbar meets accessibility standards for all users.

### WCAG 2.1 Level AA Compliance

**Principle 1: Perceivable**
- Text alternatives for icons
- Sufficient color contrast (4.5:1 minimum)
- Readable font sizes

**Principle 2: Operable**
- Keyboard accessible (all functions via keyboard)
- Sufficient time for interactions
- Navigable structure

**Principle 3: Understandable**
- Clear labels and instructions
- Predictable behavior
- Error identification

**Principle 4: Robust**
- Valid HTML/CSS
- ARIA compliance
- Assistive technology compatibility

### Color Contrast Requirements

```css
/* Minimum 4.5:1 contrast for normal text */
.e-tbar-btn {
    background: #ffffff;  /* Light background */
    color: #333333;        /* Dark text */
    /* Contrast ratio: ~13:1 ✓ Exceeds requirement */
}

/* High contrast mode */
.e-highcontrast .e-tbar-btn {
    background: #000000;
    color: #ffffff;
    border: 2px solid #ffffff;
    /* Contrast ratio: 21:1 ✓ Maximum contrast */
}
```

### Font Size and Readability

```css
/* Minimum 12px for body text */
.e-tbar-btn-text {
    font-size: 13px;      /* ✓ Exceeds 12px minimum */
    line-height: 1.5;     /* ✓ Good line spacing */
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* Larger font for visibility */
.e-toolbar.large-text .e-tbar-btn-text {
    font-size: 16px;
    line-height: 1.6;
}
```

## Keyboard Accessibility

Make toolbar fully operable via keyboard.

### Tab Navigation Setup

```typescript
let toolbar: Toolbar = new Toolbar({
    items: [
        { text: 'Cut', tabIndex: 0 },
        { text: 'Copy', tabIndex: 0 },
        { text: 'Paste', tabIndex: 0 },
        { type: 'Separator' },
        { text: 'Undo', tabIndex: 0 },
        { text: 'Redo', tabIndex: 0 }
    ]
});
toolbar.appendTo('#element');
```

### Focus Indicators

```css
/* Visible focus indicator */
.e-tbar-btn:focus {
    outline: 3px solid #4A90E2;
    outline-offset: 2px;
}

/* High contrast focus indicator */
.e-highcontrast .e-tbar-btn:focus {
    outline: 3px solid #ffff00;
    outline-offset: 2px;
}
```

### Keyboard Shortcuts Documentation

```html
<div id="element"></div>

<section role="region" aria-label="Keyboard Shortcuts">
    <h2>Keyboard Shortcuts</h2>
    <dl>
        <dt>Ctrl+X</dt><dd>Cut</dd>
        <dt>Ctrl+C</dt><dd>Copy</dd>
        <dt>Ctrl+V</dt><dd>Paste</dd>
        <dt>Ctrl+Z</dt><dd>Undo</dd>
        <dt>Ctrl+Y</dt><dd>Redo</dd>
    </dl>
</section>
```

## Screen Reader Support

Ensure toolbar is announced properly by assistive technologies.

### ARIA Labels

```typescript
import { Toolbar } from '@syncfusion/ej2-navigations';

let toolbar: Toolbar = new Toolbar({
    items: [
        { 
            text: 'Cut',
            tooltipText: 'Cut (Ctrl+X)',
            prefixIcon: 'e-cut-icon tb-icons',
            // ARIA attributes via template
            template: '<button class="e-btn e-tbar-btn" aria-label="Cut selected content to clipboard (Ctrl+X)"><i class="e-icons e-cut-icon"></i></button>'
        },
        { 
            text: 'Copy',
            tooltipText: 'Copy (Ctrl+C)',
            prefixIcon: 'e-copy-icon tb-icons',
            template: '<button class="e-btn e-tbar-btn" aria-label="Copy selected content to clipboard (Ctrl+C)"><i class="e-icons e-copy-icon"></i></button>'
        }
    ]
});

toolbar.appendTo('#element');
```

### Semantic HTML

```html
<!-- Use nav role for navigation toolbar -->
<nav id="element" role="toolbar" aria-label="Document editing toolbar"></nav>

<!-- Use complementary role for auxilary content -->
<aside id="element" role="toolbar" aria-label="View options"></aside>
```

### ARIA Role Attributes

```html
<div id="element" role="toolbar" aria-label="Formatting toolbar">
    <!-- Items have role="button" for semantic meaning -->
</div>
```

## Best Practices

### 1. **Visual Hierarchy**
- Use size, color, and spacing to show importance
- Primary actions (Save) should stand out
- Secondary actions (Help) should be subtle

### 2. **Consistency**
- Use consistent icon sets (Font Awesome, Material Icons)
- Maintain uniform button sizing
- Apply consistent spacing between items

### 3. **Responsive Design**
```css
/* Desktop - Full labels and icons */
@media (min-width: 768px) {
    .e-tbar-btn-text {
        display: inline;
    }
}

/* Mobile - Icons only */
@media (max-width: 480px) {
    .e-tbar-btn-text {
        display: none;  /* Hide labels on mobile */
    }
}
```

### 4. **Loading States**
```css
.e-tbar-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background: #f0f0f0;
}

.e-tbar-btn:disabled:hover {
    background: #f0f0f0;
}
```

### 5. **Focus Management**
- Always provide visible focus indicators
- Ensure logical tab order
- Focus on first interactive element on page load

### 6. **Error Prevention**
- Disable destructive actions until ready
- Confirm before permanent actions (Delete)
- Provide undo functionality

---

**Accessibility Checklist:**
- [ ] All icons have text labels or tooltips
- [ ] Color contrast ≥ 4.5:1 (AA), 7:1 (AAA)
- [ ] Font size ≥ 12px
- [ ] Keyboard navigable (Tab, Enter, Arrow keys)
- [ ] Focus indicators visible
- [ ] ARIA labels for icon-only buttons
- [ ] Screen reader announcements clear
- [ ] Error messages descriptive and helpful
