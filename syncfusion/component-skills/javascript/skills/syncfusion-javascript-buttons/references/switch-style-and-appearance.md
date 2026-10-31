# Style and Appearance — Syncfusion EJ2 JavaScript Switch

Customize the Switch's visual appearance by overriding CSS classes or using the `cssClass` property.

## Table of Contents
- [CSS Class Reference](#css-class-reference)
- [Size Variants](#size-variants)
- [Customize Track and Handle Shape](#customize-track-and-handle-shape)
- [Customize Colors](#customize-colors)
- [Theme Support](#theme-support)
- [Disabled State Styling](#disabled-state-styling)

---

## CSS Class Reference

The following CSS classes target specific Switch elements:

| CSS Class | Purpose |
|-----------|---------|
| `.e-switch-wrapper` | Main Switch container |
| `.e-switch` | Core Switch element |
| `.e-switch-inner` | Track (bar) in off mode |
| `.e-switch-inner.e-switch-active` | Track (bar) in on mode |
| `.e-switch-handle` | Thumb (handle) in off mode |
| `.e-switch-handle.e-switch-active` | Thumb (handle) in on mode |
| `.e-switch-wrapper:hover .e-switch-inner` | Track hover state |
| `.e-switch-wrapper:hover .e-switch-handle` | Handle hover state |
| `.e-switch-wrapper.e-switch-disabled` | Disabled state styling |
| `.e-switch-label` | Label text styling |
| `.e-switch-wrapper.e-small` | Small size variant |
| `.e-switch-wrapper.e-large` | Large size variant |
| `.e-switch-wrapper.e-rtl` | Right-to-left layout |

---

## Size Variants

Apply predefined size classes:

```typescript
import { Switch } from '@syncfusion/ej2-buttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

// Small size
const smallSwitch: Switch = new Switch({
  cssClass: 'e-small',
  content: 'Small Switch'
});
smallSwitch.appendTo('#small');

// Default size
const defaultSwitch: Switch = new Switch({
  content: 'Default Switch'
});
defaultSwitch.appendTo('#default');

// Large size
const largeSwitch: Switch = new Switch({
  cssClass: 'e-large',
  content: 'Large Switch'
});
largeSwitch.appendTo('#large');
```

**HTML:**
```html
<div>
  <div id="small"></div>
  <div id="default"></div>
  <div id="large"></div>
</div>
```

---

## Customize Track and Handle Shape

Use CSS classes to reshape the track and handle:

```typescript
import { Switch } from '@syncfusion/ej2-buttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

// Square switch
const squareSwitch: Switch = new Switch({
  cssClass: 'square-switch',
  content: 'Square Shape'
});
squareSwitch.appendTo('#square');

// Rounded handle
const roundedSwitch: Switch = new Switch({
  cssClass: 'rounded-handle',
  content: 'Rounded Handle'
});
roundedSwitch.appendTo('#rounded');

// Pill-shaped
const pillSwitch: Switch = new Switch({
  cssClass: 'pill-switch',
  content: 'Pill Shape'
});
pillSwitch.appendTo('#pill');
```

**Custom CSS:**

```css
/* Square switch */
.square-switch.e-switch-wrapper .e-switch-inner {
  border-radius: 0;
}

.square-switch.e-switch-wrapper .e-switch-handle {
  border-radius: 0;
}

/* Rounded handle */
.rounded-handle.e-switch-wrapper .e-switch-handle {
  border-radius: 50%;  /* Circular handle */
  width: 24px;
  height: 24px;
}

/* Pill-shaped track */
.pill-switch.e-switch-wrapper .e-switch-inner {
  border-radius: 20px;
}

.pill-switch.e-switch-wrapper .e-switch-handle {
  border-radius: 50%;
}
```

---

## Customize Colors

Override the default colors for on and off states:

```typescript
import { Switch } from '@syncfusion/ej2-buttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

// Success color (green)
const successSwitch: Switch = new Switch({
  cssClass: 'success-switch',
  checked: true,
  content: 'Success'
});
successSwitch.appendTo('#success');

// Danger color (red)
const dangerSwitch: Switch = new Switch({
  cssClass: 'danger-switch',
  content: 'Danger'
});
dangerSwitch.appendTo('#danger');

// Info color (blue)
const infoSwitch: Switch = new Switch({
  cssClass: 'info-switch',
  checked: true,
  content: 'Info'
});
infoSwitch.appendTo('#info');

// Custom primary
const primarySwitch: Switch = new Switch({
  cssClass: 'primary-switch',
  checked: true,
  content: 'Custom Primary'
});
primarySwitch.appendTo('#primary');
```

**Custom CSS for Colors:**

```css
/* Success (Green) */
.success-switch.e-switch-wrapper .e-switch-inner.e-switch-active {
  background-color: #10b981;
}

.success-switch.e-switch-wrapper.e-switch-active .e-switch-label {
  color: #10b981;
}

/* Danger (Red) */
.danger-switch.e-switch-wrapper .e-switch-inner.e-switch-active {
  background-color: #ef4444;
}

.danger-switch.e-switch-wrapper.e-switch-active .e-switch-label {
  color: #ef4444;
}

/* Info (Blue) */
.info-switch.e-switch-wrapper .e-switch-inner.e-switch-active {
  background-color: #3b82f6;
}

.info-switch.e-switch-wrapper.e-switch-active .e-switch-label {
  color: #3b82f6;
}

/* Custom Primary (Purple) */
.primary-switch.e-switch-wrapper .e-switch-inner.e-switch-active {
  background-color: #a855f7;
}

.primary-switch.e-switch-wrapper.e-switch-active .e-switch-label {
  color: #a855f7;
}

/* Off state customization */
.primary-switch.e-switch-wrapper .e-switch-inner {
  background-color: #e5e7eb;
}
```

---

## Gradient and Shadow Effects

Add advanced styling with gradients and shadows:

```typescript
import { Switch } from '@syncfusion/ej2-buttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

// Gradient switch
const gradientSwitch: Switch = new Switch({
  cssClass: 'gradient-switch',
  checked: true,
  content: 'Gradient'
});
gradientSwitch.appendTo('#gradient');

// Shadow switch
const shadowSwitch: Switch = new Switch({
  cssClass: 'shadow-switch',
  content: 'Shadow'
});
shadowSwitch.appendTo('#shadow');

// Neon switch
const neonSwitch: Switch = new Switch({
  cssClass: 'neon-switch',
  checked: true,
  content: 'Neon'
});
neonSwitch.appendTo('#neon');
```

**Advanced CSS:**

```css
/* Gradient effect */
.gradient-switch.e-switch-wrapper .e-switch-inner.e-switch-active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.gradient-switch.e-switch-wrapper .e-switch-handle.e-switch-active {
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

/* Shadow effect */
.shadow-switch.e-switch-wrapper .e-switch-inner {
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
}

.shadow-switch.e-switch-wrapper .e-switch-handle {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.shadow-switch.e-switch-wrapper .e-switch-handle.e-switch-active {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

/* Neon glow effect */
.neon-switch.e-switch-wrapper .e-switch-inner.e-switch-active {
  background-color: #00ff88;
  box-shadow: 0 0 20px rgba(0, 255, 136, 0.6), inset 0 0 10px rgba(0, 255, 136, 0.2);
}

.neon-switch.e-switch-wrapper .e-switch-handle.e-switch-active {
  background: white;
  box-shadow: 0 0 15px rgba(0, 255, 136, 0.8);
}
```

---

## Theme Support

Include CSS for different themes:

```html
<!-- Material 3 Theme (Default) -->
<link href="https://cdn.syncfusion.com/ej2/ej2-buttons/styles/material3.css" rel="stylesheet" />

<!-- Bootstrap 5 Theme -->
<link href="https://cdn.syncfusion.com/ej2/ej2-buttons/styles/bootstrap5.css" rel="stylesheet" />

<!-- Fluent 2 Theme -->
<link href="https://cdn.syncfusion.com/ej2/ej2-buttons/styles/fluent2.css" rel="stylesheet" />

<!-- Tailwind 3 Theme -->
<link href="https://cdn.syncfusion.com/ej2/ej2-buttons/styles/tailwind3.css" rel="stylesheet" />

<!-- Fabric Theme -->
<link href="https://cdn.syncfusion.com/ej2/ej2-buttons/styles/fabric.css" rel="stylesheet" />

<!-- High Contrast Theme -->
<link href="https://cdn.syncfusion.com/ej2/ej2-buttons/styles/highcontrast.css" rel="stylesheet" />
```

---

## Disabled State Styling

Customize the appearance of disabled Switches:

```css
/* Custom disabled styling */
.e-switch-wrapper.e-switch-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.e-switch-wrapper.e-switch-disabled .e-switch-inner {
  background-color: #d1d5db;
}

.e-switch-wrapper.e-switch-disabled .e-switch-handle {
  background-color: #9ca3af;
}

.e-switch-wrapper.e-switch-disabled .e-switch-label {
  color: #9ca3af;
}

/* Striped disabled state */
.disabled-striped.e-switch-wrapper.e-switch-disabled .e-switch-inner {
  background: repeating-linear-gradient(
    45deg,
    #d1d5db,
    #d1d5db 10px,
    #e5e7eb 10px,
    #e5e7eb 20px
  );
}
```

---

## Label Styling

Customize the label text appearance:

```typescript
import { Switch } from '@syncfusion/ej2-buttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

const styledSwitch: Switch = new Switch({
  cssClass: 'styled-label',
  content: 'Custom Label Styling',
  checked: true
});
styledSwitch.appendTo('#switch');
```

**CSS for Label:**

```css
.styled-label.e-switch-wrapper .e-switch-label {
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  margin-left: 12px;
  font-family: 'Segoe UI', sans-serif;
}

.styled-label.e-switch-wrapper .e-switch-label::before {
  content: '✓ ';
  color: #10b981;
}
```
