# Customization — Syncfusion EJ2 JavaScript ButtonGroup

Customize the appearance and behavior of the ButtonGroup component.

## Table of Contents
- [CSS Classes Reference](#css-classes-reference)
- [Color Styles](#color-styles)
- [Size Variants](#size-variants)
- [Rounded Corners](#rounded-corners)
- [Vertical Layout](#vertical-layout)
- [Right-to-Left (RTL)](#right-to-left-rtl)
- [Custom CSS Overrides](#custom-css-overrides)
- [Theme Support](#theme-support)

---

## CSS Classes Reference

Target and customize ButtonGroup appearance using these CSS classes:

| CSS Class | Purpose |
|-----------|---------|
| `.e-btn-group` | Main ButtonGroup container |
| `.e-btn-group .e-btn` | Individual buttons within the group |
| `.e-btn:hover` | Button hover state |
| `.e-btn:focus` | Button focus state |
| `.e-btn:active` | Button active/pressed state |
| `.e-btn.e-active` | Selected button state |
| `.e-primary` | Primary color styling |
| `.e-success` | Success (green) color styling |
| `.e-info` | Info (blue) color styling |
| `.e-warning` | Warning (orange) color styling |
| `.e-danger` | Danger (red) color styling |
| `.e-outline` | Outline (transparent fill, visible border) styling |
| `.e-flat` | Flat (no shadow) styling |
| `.e-small` | Compact size |
| `.e-large` | Large size |
| `.e-round-corner` | Rounded corners on all buttons |
| `.e-vertical` | Vertical button stacking |
| `.e-rtl` | Right-to-left layout |

---

## Color Styles

Apply predefined color classes to ButtonGroup:

```typescript
import { ButtonGroup } from '@syncfusion/ej2-splitbuttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

// Primary buttons
const primaryGroup: ButtonGroup = new ButtonGroup({
  items: [
    { content: 'Left' },
    { content: 'Center' },
    { content: 'Right' },
  ],
  cssClass: 'e-primary'
});
primaryGroup.appendTo('#primary-group');

// Success buttons
const successGroup: ButtonGroup = new ButtonGroup({
  items: [
    { content: 'Add' },
    { content: 'Edit' },
    { content: 'Delete' },
  ],
  cssClass: 'e-success'
});
successGroup.appendTo('#success-group');

// Danger buttons
const dangerGroup: ButtonGroup = new ButtonGroup({
  items: [
    { content: 'Remove' },
    { content: 'Clear' },
    { content: 'Reset' },
  ],
  cssClass: 'e-danger'
});
dangerGroup.appendTo('#danger-group');

// Outline buttons
const outlineGroup: ButtonGroup = new ButtonGroup({
  items: [
    { content: 'Draft' },
    { content: 'Review' },
    { content: 'Publish' },
  ],
  cssClass: 'e-outline'
});
outlineGroup.appendTo('#outline-group');
```

---

## Size Variants

Control the size of buttons using CSS classes:

```typescript
import { ButtonGroup } from '@syncfusion/ej2-splitbuttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

// Small buttons
const smallGroup: ButtonGroup = new ButtonGroup({
  items: [
    { content: 'Small 1' },
    { content: 'Small 2' },
    { content: 'Small 3' },
  ],
  cssClass: 'e-small'
});
smallGroup.appendTo('#small-group');

// Default size
const defaultGroup: ButtonGroup = new ButtonGroup({
  items: [
    { content: 'Default 1' },
    { content: 'Default 2' },
    { content: 'Default 3' },
  ]
});
defaultGroup.appendTo('#default-group');

// Large buttons
const largeGroup: ButtonGroup = new ButtonGroup({
  items: [
    { content: 'Large 1' },
    { content: 'Large 2' },
    { content: 'Large 3' },
  ],
  cssClass: 'e-large'
});
largeGroup.appendTo('#large-group');
```

---

## Rounded Corners

Add `e-round-corner` class to apply border-radius:

```typescript
import { ButtonGroup } from '@syncfusion/ej2-splitbuttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

const roundedGroup: ButtonGroup = new ButtonGroup({
  items: [
    { content: 'Round 1', iconCss: 'e-icons e-one' },
    { content: 'Round 2', iconCss: 'e-icons e-two' },
    { content: 'Round 3', iconCss: 'e-icons e-three' },
  ],
  cssClass: 'e-round-corner e-primary'
});
roundedGroup.appendTo('#rounded-group');
```

---

## Vertical Layout

Stack buttons vertically using `e-vertical` class:

```typescript
import { ButtonGroup } from '@syncfusion/ej2-splitbuttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

const verticalGroup: ButtonGroup = new ButtonGroup({
  items: [
    { content: 'Up', iconCss: 'e-icons e-arrow-up' },
    { content: 'Down', iconCss: 'e-icons e-arrow-down' },
    { content: 'Left', iconCss: 'e-icons e-arrow-left' },
    { content: 'Right', iconCss: 'e-icons e-arrow-right' },
  ],
  cssClass: 'e-vertical'
});
verticalGroup.appendTo('#vertical-group');
```

---

## Right-to-Left (RTL)

Enable RTL layout for right-to-left languages:

```typescript
import { ButtonGroup } from '@syncfusion/ej2-splitbuttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

const rtlGroup: ButtonGroup = new ButtonGroup({
  items: [
    { content: 'اليمين', iconCss: 'e-icons e-arrow-right' },     // Right
    { content: 'الوسط', iconCss: 'e-icons e-arrow-down' },       // Center
    { content: 'اليسار', iconCss: 'e-icons e-arrow-left' },      // Left
  ],
  cssClass: 'e-primary',
  enableRtl: true
});
rtlGroup.appendTo('#rtl-group');
```

**HTML:**
```html
<div id="rtl-group" dir="rtl"></div>
```

---

## Custom CSS Overrides

Override default ButtonGroup styling with custom CSS:

```typescript
import { ButtonGroup } from '@syncfusion/ej2-splitbuttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

const customGroup: ButtonGroup = new ButtonGroup({
  items: [
    { content: 'Custom 1' },
    { content: 'Custom 2' },
    { content: 'Custom 3' },
  ],
  cssClass: 'custom-group'
});
customGroup.appendTo('#custom-group');
```

**Custom CSS:**

```css
/* Override button colors */
.custom-group .e-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  font-weight: 600;
}

/* Override hover state */
.custom-group .e-btn:hover {
  background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  transform: translateY(-2px);
}

/* Override active state */
.custom-group .e-btn:active,
.custom-group .e-btn.e-active {
  background: #5568d3;
  transform: translateY(0);
}

/* Override button spacing */
.custom-group .e-btn {
  padding: 12px 24px;
  font-size: 16px;
}

/* Override border-radius */
.custom-group .e-btn {
  border-radius: 8px;
}

/* First button rounded on left */
.custom-group .e-btn:first-child {
  border-radius: 8px 0 0 8px;
}

/* Last button rounded on right */
.custom-group .e-btn:last-child {
  border-radius: 0 8px 8px 0;
}
```

---

## Combining Multiple Classes

Chain CSS classes to apply multiple styles:

```typescript
import { ButtonGroup } from '@syncfusion/ej2-splitbuttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

// Large primary with rounded corners
const advancedGroup: ButtonGroup = new ButtonGroup({
  items: [
    { content: 'Save', iconCss: 'e-icons e-save' },
    { content: 'Edit', iconCss: 'e-icons e-edit' },
    { content: 'Delete', iconCss: 'e-icons e-delete' },
  ],
  cssClass: 'e-large e-primary e-round-corner'
});
advancedGroup.appendTo('#advanced-group');

// Small outline vertical
const compactGroup: ButtonGroup = new ButtonGroup({
  items: [
    { content: '1' },
    { content: '2' },
    { content: '3' },
  ],
  cssClass: 'e-small e-outline e-vertical'
});
compactGroup.appendTo('#compact-group');
```

---

## Theme Support

All ButtonGroup styles work with Syncfusion themes. Include the desired theme CSS:

```html
<!-- Material 3 Theme (Default) -->
<link href="https://cdn.syncfusion.com/ej2/ej2-splitbuttons/styles/material3.css" rel="stylesheet" />

<!-- Bootstrap 5 Theme -->
<link href="https://cdn.syncfusion.com/ej2/ej2-splitbuttons/styles/bootstrap5.css" rel="stylesheet" />

<!-- Fluent 2 Theme -->
<link href="https://cdn.syncfusion.com/ej2/ej2-splitbuttons/styles/fluent2.css" rel="stylesheet" />

<!-- Fabric Theme -->
<link href="https://cdn.syncfusion.com/ej2/ej2-splitbuttons/styles/fabric.css" rel="stylesheet" />

<!-- Tailwind 3 Theme -->
<link href="https://cdn.syncfusion.com/ej2/ej2-splitbuttons/styles/tailwind3.css" rel="stylesheet" />
```

---

## Disabled Button State

Disable individual buttons in the group:

```typescript
import { ButtonGroup } from '@syncfusion/ej2-splitbuttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

const groupWithDisabled: ButtonGroup = new ButtonGroup({
  items: [
    { content: 'Enabled', disabled: false },
    { content: 'Disabled', disabled: true },
    { content: 'Enabled', disabled: false },
  ],
  cssClass: 'e-primary'
});
groupWithDisabled.appendTo('#group-with-disabled');
```

---

## Interactive Styling Example

Dynamically apply styles based on selection:

```typescript
import { ButtonGroup, SelectEventArgs } from '@syncfusion/ej2-splitbuttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

function onSelect(args: SelectEventArgs): void {
  const selected = args.element as HTMLElement;
  console.log('Selected button:', selected.textContent);
  
  // Apply custom styling
  selected.style.background = '#667eea';
  selected.style.color = 'white';
}

const interactiveGroup: ButtonGroup = new ButtonGroup({
  items: [
    { content: 'Option 1' },
    { content: 'Option 2' },
    { content: 'Option 3' },
  ],
  cssClass: 'e-outline',
  select: onSelect
});
interactiveGroup.appendTo('#interactive-group');
```
