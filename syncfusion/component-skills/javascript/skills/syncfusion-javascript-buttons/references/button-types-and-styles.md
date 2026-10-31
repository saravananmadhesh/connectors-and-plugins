# Button - Types and Styles (TypeScript)

## Table of Contents
- [Predefined Color Styles](#predefined-color-styles)
- [Button Types](#button-types)
- [Icon Buttons](#icon-buttons)
- [Button Sizes](#button-sizes)
- [Combined Styles and Types](#combined-styles-and-types)

## Predefined Color Styles

Apply semantic color styles using CSS classes:

```typescript
import { Button } from '@syncfusion/ej2-buttons';

// Default button
const defaultBtn: Button = new Button({});
defaultBtn.appendTo('#button1');

// Primary button (brand color)
const primaryBtn: Button = new Button({ cssClass: 'e-primary' });
primaryBtn.appendTo('#button2');

// Success button (green)
const successBtn: Button = new Button({ cssClass: 'e-success' });
successBtn.appendTo('#button3');

// Info button (blue)
const infoBtn: Button = new Button({ cssClass: 'e-info' });
infoBtn.appendTo('#button4');

// Warning button (orange)
const warningBtn: Button = new Button({ cssClass: 'e-warning' });
warningBtn.appendTo('#button5');

// Danger button (red)
const dangerBtn: Button = new Button({ cssClass: 'e-danger' });
dangerBtn.appendTo('#button6');

// Link button (text only)
const linkBtn: Button = new Button({ cssClass: 'e-link' });
linkBtn.appendTo('#button7');
```

**HTML:**
```html
<button id="button1">Default</button>
<button id="button2">Primary</button>
<button id="button3">Success</button>
<button id="button4">Info</button>
<button id="button5">Warning</button>
<button id="button6">Danger</button>
<button id="button7">Link</button>
```

## Button Types

Apply button style types using CSS classes:

### Flat Button
Removes background fill, shows only text and border:

```typescript
const flatBtn: Button = new Button({ cssClass: 'e-flat e-primary' });
flatBtn.appendTo('#flatButton');
```

### Outline Button
Border-only style with colored text and border:

```typescript
const outlineBtn: Button = new Button({ cssClass: 'e-outline e-primary' });
outlineBtn.appendTo('#outlineButton');
```

### Round Button
Creates a circular button with icon:

```typescript
const roundBtn: Button = new Button({
  iconCss: 'e-icons e-plus',
  cssClass: 'e-round e-primary'
});
roundBtn.appendTo('#roundButton');
```

### Toggle Button
Button that maintains on/off state:

```typescript
const toggleBtn: Button = new Button({
  cssClass: 'e-primary',
  isToggle: true
});
toggleBtn.appendTo('#toggleButton');

toggleBtn.element.addEventListener('click', (): void => {
  console.log('Toggle state:', toggleBtn.element.classList.contains('e-active'));
});
```

## Icon Buttons

Add icons to buttons using Font Icon or SVG:

### Icon with Text (Left Position)
```typescript
const btnWithIcon: Button = new Button({
  content: 'Save',
  iconCss: 'e-icons e-save',
  cssClass: 'e-primary'
});
btnWithIcon.appendTo('#iconButton');
```

### Icon with Text (Right Position)
```typescript
const btnIconRight: Button = new Button({
  content: 'Delete',
  iconCss: 'e-icons e-delete',
  iconPosition: 'Right',
  cssClass: 'e-danger'
});
btnIconRight.appendTo('#iconButtonRight');
```

### Icon Only Button
```typescript
const iconOnlyBtn: Button = new Button({
  iconCss: 'e-icons e-settings',
  cssClass: 'e-primary'
});
iconOnlyBtn.appendTo('#iconOnlyButton');
```

### Popular Icons
```
e-save, e-delete, e-edit, e-download, e-upload,
e-print, e-search, e-close, e-copy, e-cut, e-paste,
e-refresh, e-zoom-in, e-zoom-out, e-expand, e-collapse,
e-check, e-close-1, e-plus, e-minus, e-warning, e-error,
e-information, e-help-center, e-media-play, e-media-stop
```

## Button Sizes

Control button size using CSS classes:

### Small Button
```typescript
const smallBtn: Button = new Button({
  content: 'Small',
  cssClass: 'e-small e-primary'
});
smallBtn.appendTo('#smallButton');
```

### Normal Button (Default)
```typescript
const normalBtn: Button = new Button({
  content: 'Normal',
  cssClass: 'e-primary'
});
normalBtn.appendTo('#normalButton');
```

### Large Button
```typescript
const largeBtn: Button = new Button({
  content: 'Large',
  cssClass: 'e-large e-primary'
});
largeBtn.appendTo('#largeButton');
```

## Combined Styles and Types

Combine multiple CSS classes for advanced styling:

```typescript
import { Button } from '@syncfusion/ej2-buttons';

// Flat primary button
const flatPrimary: Button = new Button({
  content: 'Flat Primary',
  cssClass: 'e-flat e-primary'
});
flatPrimary.appendTo('#btn1');

// Outline success button with icon
const outlineSuccess: Button = new Button({
  content: 'Success',
  iconCss: 'e-icons e-check',
  cssClass: 'e-outline e-success'
});
outlineSuccess.appendTo('#btn2');

// Small warning button
const smallWarning: Button = new Button({
  content: 'Warning',
  cssClass: 'e-small e-warning'
});
smallWarning.appendTo('#btn3');

// Round danger button with icon
const roundDanger: Button = new Button({
  iconCss: 'e-icons e-delete',
  cssClass: 'e-round e-danger'
});
roundDanger.appendTo('#btn4');

// Block (full-width) primary button
const blockBtn: Button = new Button({
  content: 'Full Width',
  cssClass: 'e-block e-primary'
});
blockBtn.appendTo('#btn5');

// Rounded corner button
const roundedBtn: Button = new Button({
  content: 'Rounded',
  cssClass: 'e-round-corner e-primary'
});
roundedBtn.appendTo('#btn6');
```

## CSS Class Reference

| Class | Purpose |
|-------|---------|
| `e-primary` | Primary brand color |
| `e-success` | Success/positive action (green) |
| `e-info` | Info/informational (blue) |
| `e-warning` | Warning/caution (orange) |
| `e-danger` | Danger/destructive (red) |
| `e-link` | Link-style text button |
| `e-flat` | Flat background-free style |
| `e-outline` | Border-only outline style |
| `e-round` | Circular button |
| `e-block` | Full-width button |
| `e-small` | Small button size |
| `e-large` | Large button size |
| `e-round-corner` | Rounded corners |
| `e-disabled` | Disabled state |
| `e-active` | Active/pressed state (for toggles) |
