# CheckBox Style and Appearance

The Syncfusion TypeScript CheckBox component supports extensive CSS customization for colors, sizes, borders, and states.

## Table of Contents
- [CSS Class Customization](#css-class-customization)
- [Custom Colors](#custom-colors)
- [Custom Borders](#custom-borders)
- [Custom Shapes](#custom-shapes)
- [Hover and Focus States](#hover-and-focus-states)
- [Theme Integration](#theme-integration)
- [Advanced Styling](#advanced-styling)

---

## CSS Class Customization

Use the `cssClass` property to apply custom styles:

```typescript
import { CheckBox } from '@syncfusion/ej2-buttons';

let checkbox: CheckBox = new CheckBox({
  label: 'Custom styled checkbox',
  cssClass: 'custom-checkbox'
});
checkbox.appendTo('#checkbox');
```

---

## Custom Colors

### Custom Checked Color

```typescript
import { CheckBox } from '@syncfusion/ej2-buttons';

let checkbox: CheckBox = new CheckBox({
  label: 'Custom color',
  checked: true,
  cssClass: 'custom-color-checkbox'
});
checkbox.appendTo('#checkbox');
```

```css
/* Custom checked color */
.custom-color-checkbox .e-checkbox-wrapper .e-frame.e-check {
  background-color: #e91e63;
  border-color: #e91e63;
}

/* Custom checkmark color */
.custom-color-checkbox .e-checkbox-wrapper .e-frame.e-check .e-checkmark {
  color: #ffffff;
}
```

### Custom Unchecked Color

```css
.custom-color-checkbox .e-checkbox-wrapper .e-frame {
  border-color: #e91e63;
  background-color: #ffffff;
}
```

### Theme Color Examples

```css
/* Material Blue */
.theme-blue .e-checkbox-wrapper .e-frame.e-check {
  background-color: #2196f3;
  border-color: #2196f3;
}

/* Material Purple */
.theme-purple .e-checkbox-wrapper .e-frame.e-check {
  background-color: #9c27b0;
  border-color: #9c27b0;
}

/* Material Green */
.theme-green .e-checkbox-wrapper .e-frame.e-check {
  background-color: #4caf50;
  border-color: #4caf50;
}

/* Material Orange */
.theme-orange .e-checkbox-wrapper .e-frame.e-check {
  background-color: #ff9800;
  border-color: #ff9800;
}

/* Material Red */
.theme-red .e-checkbox-wrapper .e-frame.e-check {
  background-color: #f44336;
  border-color: #f44336;
}
```

---

## Custom Borders

### Border Width

```css
.thick-border .e-checkbox-wrapper .e-frame {
  border-width: 3px;
}

.thin-border .e-checkbox-wrapper .e-frame {
  border-width: 1px;
}
```

### Border Radius

```css
.rounded-checkbox .e-checkbox-wrapper .e-frame {
  border-radius: 50%; /* Fully rounded */
}

.square-checkbox .e-checkbox-wrapper .e-frame {
  border-radius: 4px; /* Slightly rounded */
}

.rounded-square .e-checkbox-wrapper .e-frame {
  border-radius: 8px;
}
```

### Rounded Checkbox (Switch-like)

```typescript
import { CheckBox } from '@syncfusion/ej2-buttons';

let checkbox: CheckBox = new CheckBox({
  label: 'Rounded',
  checked: true,
  cssClass: 'pill-checkbox'
});
checkbox.appendTo('#checkbox');
```

```css
.pill-checkbox .e-checkbox-wrapper .e-frame {
  border-radius: 12px;
  width: 44px;
  height: 24px;
}

.pill-checkbox .e-checkbox-wrapper .e-frame.e-check {
  background-color: #4caf50;
  border-color: #4caf50;
}

.pill-checkbox .e-checkbox-wrapper .e-frame .e-checkmark {
  display: none;
}
```

---

## Custom Shapes

### Square Checkbox

```css
.square-shape .e-checkbox-wrapper .e-frame {
  border-radius: 0;
}
```

### Circle Checkbox

```css
.circle-shape .e-checkbox-wrapper .e-frame {
  border-radius: 50%;
}
```

### Custom Indeterminate Icon

```css
.custom-indeterminate .e-checkbox-wrapper .e-frame.e-stop {
  background-color: #ff9800;
  border-color: #ff9800;
}

.custom-indeterminate .e-checkbox-wrapper .e-frame.e-stop::before {
  content: '';
  position: absolute;
  width: 60%;
  height: 2px;
  background-color: white;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

---

## Hover and Focus States

### Hover Effect

```css
.hover-effect .e-checkbox-wrapper:hover .e-frame {
  border-color: #1976d2;
  box-shadow: 0 0 0 2px rgba(25, 118, 210, 0.2);
}
```

### Focus Effect

```css
.focus-effect .e-checkbox-wrapper .e-frame:focus,
.focus-effect .e-checkbox-wrapper input:focus + .e-frame {
  outline: none;
  box-shadow: 0 0 0 3px rgba(25, 118, 210, 0.3);
}
```

### Active/Pressed State

```css
.active-state .e-checkbox-wrapper:active .e-frame {
  transform: scale(0.95);
  transition: transform 0.1s;
}
```

### Smooth Transitions

```css
.smooth-transitions .e-checkbox-wrapper .e-frame {
  transition: all 0.2s ease-in-out;
}

.smooth-transitions .e-checkbox-wrapper .e-frame.e-check {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
```

---

## Theme Integration

### Dark Theme

```typescript
import { CheckBox } from '@syncfusion/ej2-buttons';

let checkbox: CheckBox = new CheckBox({
  label: 'Dark theme',
  cssClass: 'dark-theme-checkbox'
});
checkbox.appendTo('#checkbox');
```

```css
.dark-theme-checkbox {
  background-color: #1e1e1e;
  padding: 8px 12px;
  border-radius: 4px;
}

.dark-theme-checkbox .e-checkbox-wrapper .e-label {
  color: #ffffff;
}

.dark-theme-checkbox .e-checkbox-wrapper .e-frame {
  background-color: #2c2c2c;
  border-color: #555;
}

.dark-theme-checkbox .e-checkbox-wrapper .e-frame.e-check {
  background-color: #bb86fc;
  border-color: #bb86fc;
}
```

### Light Theme

```typescript
import { CheckBox } from '@syncfusion/ej2-buttons';

let checkbox: CheckBox = new CheckBox({
  label: 'Light theme',
  cssClass: 'light-theme-checkbox'
});
checkbox.appendTo('#checkbox');
```

```css
.light-theme-checkbox {
  background-color: #fafafa;
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid #e0e0e0;
}

.light-theme-checkbox .e-checkbox-wrapper .e-label {
  color: #212121;
}
```

### Custom Brand Color

```css
.brand-checkbox .e-checkbox-wrapper .e-frame.e-check {
  background-color: #ff6b35;
  border-color: #ff6b35;
}

.brand-checkbox .e-checkbox-wrapper:hover .e-frame {
  border-color: #ff6b35;
}
```

---

## Advanced Styling

### Glassmorphism Effect

```typescript
import { CheckBox } from '@syncfusion/ej2-buttons';

let checkbox: CheckBox = new CheckBox({
  label: 'Glassmorphism',
  cssClass: 'glass-checkbox'
});
checkbox.appendTo('#checkbox');
```

```css
.glass-checkbox .e-checkbox-wrapper .e-frame {
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
}

.glass-checkbox .e-checkbox-wrapper .e-frame.e-check {
  background-color: rgba(76, 175, 80, 0.6);
  border-color: rgba(76, 175, 80, 0.8);
}
```

### Gradient Background

```css
.gradient-checkbox .e-checkbox-wrapper .e-frame.e-check {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-color: transparent;
}
```

### Animated Checkmark

```css
.animated-check .e-checkbox-wrapper .e-frame .e-checkmark {
  stroke-dasharray: 100;
  stroke-dashoffset: 100;
  animation: drawCheck 0.3s ease-in-out forwards;
}

.animated-check .e-checkbox-wrapper .e-frame.e-check .e-checkmark {
  animation: drawCheck 0.3s ease-in-out forwards;
}

@keyframes drawCheck {
  to {
    stroke-dashoffset: 0;
  }
}
```

### Box Shadow Effects

```css
.shadow-checkbox .e-checkbox-wrapper .e-frame {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.shadow-checkbox .e-checkbox-wrapper .e-frame.e-check {
  box-shadow: 0 2px 8px rgba(76, 175, 80, 0.3);
}
```

---

## Complete Styled Example

```typescript
import { CheckBox } from '@syncfusion/ej2-buttons';

let checkbox: CheckBox = new CheckBox({
  label: 'Premium styled checkbox',
  checked: true,
  cssClass: 'premium-checkbox'
});
checkbox.appendTo('#checkbox');
```

```css
.premium-checkbox {
  padding: 8px;
  border-radius: 6px;
  display: inline-block;
}

.premium-checkbox .e-checkbox-wrapper .e-frame {
  width: 20px;
  height: 20px;
  border-width: 2px;
  border-color: #6200ee;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.premium-checkbox .e-checkbox-wrapper .e-frame.e-check {
  background-color: #6200ee;
  border-color: #6200ee;
}

.premium-checkbox .e-checkbox-wrapper .e-frame.e-check .e-checkmark {
  color: #ffffff;
  stroke-width: 3;
}

.premium-checkbox .e-checkbox-wrapper .e-label {
  color: #212121;
  font-weight: 500;
  font-size: 15px;
  margin-left: 8px;
}

.premium-checkbox .e-checkbox-wrapper:hover .e-frame {
  box-shadow: 0 0 0 4px rgba(98, 0, 238, 0.1);
}
```

---

## API Reference

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `cssClass` | `string` | `''` | Custom CSS class for styling |

For complete API details, see [checkbox-api.md](./checkbox-api.md).
