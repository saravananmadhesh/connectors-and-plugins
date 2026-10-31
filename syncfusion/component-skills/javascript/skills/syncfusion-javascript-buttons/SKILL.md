---
name: syncfusion-javascript-buttons
description: Comprehensive Syncfusion EJ2 JavaScript Buttons library with 10 components (Button, ButtonGroup, Chips, DropdownButton, FAB, ProgressButton, RadioButton, SpeedDial, SplitButton, Switch). Includes imperative TypeScript/JavaScript APIs, multiple themes (Material 3, Bootstrap 5, Fluent, Tailwind 3, Fabric), WCAG 2.2 accessibility compliance, and complete documentation with examples and common UI patterns.
metadata:
  author: "Syncfusion Inc"
  version: "34.1.29"
  category: "Buttons"
  components:
    - Button
    - ButtonGroup
    - Chips
    - DropdownButton
    - FloatingActionButton (FAB)
    - ProgressButton
    - RadioButton
    - SpeedDial
    - SplitButton
    - Switch
---

# Syncfusion EJ2 JavaScript Buttons Components

## Overview

The Syncfusion EJ2 JavaScript Buttons library provides a comprehensive collection of 10 button and toggle components for building interactive user interfaces. Each component is fully documented with TypeScript/JavaScript examples, accessibility guidelines, and common usage patterns.

All components support:
- **Accessibility:** WCAG 2.2 Level AA, Section 508, ADA compliance
- **Themes:** Material 3, Bootstrap 5, Fluent, Tailwind 3, Fabric
- **APIs:** Imperative TypeScript/JavaScript with full event support
- **Keyboard:** Full keyboard navigation and interaction

---

## Component Overview

### Quick Navigation

| Component | Purpose | Package | Files |
|-----------|---------|---------|-------|
| **Button** | Primary interactive button | ej2-buttons | 6 |
| **ButtonGroup** | Grouped button container | ej2-buttons | 6 |
| **Chips** | Interactive tag/chip elements | ej2-buttons | 7 |
| **DropdownButton** | Button with dropdown menu | ej2-splitbuttons | 8 |
| **FAB** | Floating action button | ej2-buttons | 7 |
| **ProgressButton** | Button with progress indicator | ej2-splitbuttons | 6 |
| **RadioButton** | Single-select radio button | ej2-buttons | 6 |
| **SpeedDial** | Expandable floating menu | ej2-buttons | 11 |
| **SplitButton** | Button with dropdown menu | ej2-splitbuttons | 6 |
| **Switch** | Toggle on/off component | ej2-buttons | 6 |

---

## Button Component

**Purpose:** Primary interactive button component for triggering user actions.

**Package:** `@syncfusion/ej2-buttons`

### Quick Example
```typescript
import { Button } from '@syncfusion/ej2-buttons';

const button: Button = new Button({
  cssClass: 'e-primary',
  click: (args: any): void => console.log('Clicked')
});
button.appendTo('#button');
```

### Documentation
- [button-getting-started.md](./references/button-getting-started.md) - Setup and basics
- [button-types-and-styles.md](./references/button-types-and-styles.md) - Style variants
- [button-style-and-appearance.md](./references/button-style-and-appearance.md) - Customization
- [button-how-to.md](./references/button-how-to.md) - Common patterns
- [button-accessibility.md](./references/button-accessibility.md) - Accessibility
- [button-api.md](./references/button-api.md) - Complete API

---

## ButtonGroup Component

**Purpose:** Container for grouping related buttons with selection modes.

**Package:** `@syncfusion/ej2-buttons`

### Quick Example
```html
<div class="e-btn-group" data-mode="radio">
  <button>Left</button>
  <button>Center</button>
  <button>Right</button>
</div>
```

### Documentation
- [buttongroup-getting-started.md](./references/buttongroup-getting-started.md) - Setup
- [buttongroup-types-and-styles.md](./references/buttongroup-types-and-styles.md) - Styles
- [buttongroup-selection-and-nesting.md](./references/buttongroup-selection-and-nesting.md) - Selection
- [buttongroup-customization.md](./references/buttongroup-customization.md) - Customization
- [buttongroup-how-to.md](./references/buttongroup-how-to.md) - Patterns
- [buttongroup-accessibility.md](./references/buttongroup-accessibility.md) - Accessibility

---

## Chips Component

**Purpose:** Interactive chip/tag elements with selection, deletion, and drag-and-drop.

**Package:** `@syncfusion/ej2-buttons`

### Quick Example
```typescript
import { ChipList } from '@syncfusion/ej2-buttons';

const chips: ChipList = new ChipList({
  chips: [
    { text: 'Angular' },
    { text: 'React' }
  ]
});
chips.appendTo('#chips');
```

### Documentation
- [chips-getting-started.md](./references/chips-getting-started.md) - Setup
- [chips-types-and-selection.md](./references/chips-types-and-selection.md) - Selection
- [chips-customization.md](./references/chips-customization.md) - Customization
- [chips-drag-and-drop.md](./references/chips-drag-and-drop.md) - Drag-drop
- [chips-style.md](./references/chips-style.md) - Styling
- [chips-api.md](./references/chips-api.md) - API
- [chips-accessibility.md](./references/chips-accessibility.md) - Accessibility

---

## DropdownButton Component

**Purpose:** Button with dropdown menu for displaying related actions or items.

**Package:** `@syncfusion/ej2-splitbuttons`

### Quick Example
```typescript
import { DropdownButton } from '@syncfusion/ej2-splitbuttons';

const dropdownBtn: DropdownButton = new DropdownButton({
  items: [
    { text: 'Item 1', iconCss: 'e-icons e-one' },
    { text: 'Item 2', iconCss: 'e-icons e-two' },
    { text: 'Item 3', iconCss: 'e-icons e-three' }
  ],
  select: (args: MenuEventArgs): void => {
    console.log('Selected:', args.item.text);
  }
});
dropdownBtn.appendTo('#dropdownbutton');
```

### Documentation
- [dropdownbutton-getting-started.md](./references/dropdownbutton-getting-started.md) - Setup and basics
- [dropdownbutton-popup-items.md](./references/dropdownbutton-popup-items.md) - Popup items
- [dropdownbutton-icons-and-layout.md](./references/dropdownbutton-icons-and-layout.md) - Icons
- [dropdownbutton-appearance-and-styling.md](./references/dropdownbutton-appearance-and-styling.md) - Styling
- [dropdownbutton-events-and-interactivity.md](./references/dropdownbutton-events-and-interactivity.md) - Events
- [dropdownbutton-item-template.md](./references/dropdownbutton-item-template.md) - Templates
- [dropdownbutton-api.md](./references/dropdownbutton-api.md) - API
- [dropdownbutton-accessibility.md](./references/dropdownbutton-accessibility.md) - Accessibility

---

## Floating Action Button (FAB)

**Purpose:** Circular button floating above content for primary actions.

**Package:** `@syncfusion/ej2-buttons`

### Quick Example
```typescript
import { Fab } from '@syncfusion/ej2-buttons';

const fab: Fab = new Fab({
  iconCss: 'e-icons e-plus',
  position: 'BottomRight'
});
fab.appendTo('#fab');
```

### Documentation
- [floating-action-button-getting-started.md](./references/floating-action-button-getting-started.md) - Setup
- [floating-action-button-positions.md](./references/floating-action-button-positions.md) - Positions
- [floating-action-button-icons.md](./references/floating-action-button-icons.md) - Icons
- [floating-action-button-events.md](./references/floating-action-button-events.md) - Events
- [floating-action-button-styles.md](./references/floating-action-button-styles.md) - Styling
- [floating-action-button-api.md](./references/floating-action-button-api.md) - API
- [floating-action-button-accessibility.md](./references/floating-action-button-accessibility.md) - Accessibility

---

## Speed Dial

**Purpose:** Expandable floating menu with linear or radial display modes.

**Package:** `@syncfusion/ej2-buttons`

### Quick Example
```typescript
import { SpeedDial } from '@syncfusion/ej2-buttons';

const speedDial: SpeedDial = new SpeedDial({
  iconCss: 'e-icons e-plus',
  items: [
    { text: 'Edit', iconCss: 'e-icons e-edit' },
    { text: 'Delete', iconCss: 'e-icons e-delete' }
  ]
});
speedDial.appendTo('#speeddial');
```

### Documentation
- [speeddial-getting-started.md](./references/speeddial-getting-started.md) - Setup
- [speeddial-items.md](./references/speeddial-items.md) - Items
- [speeddial-positions.md](./references/speeddial-positions.md) - Positions
- [speeddial-display-modes.md](./references/speeddial-display-modes.md) - Modes
- [speeddial-events.md](./references/speeddial-events.md) - Events
- [speeddial-modal.md](./references/speeddial-modal.md) - Modal
- [speeddial-styles.md](./references/speeddial-styles.md) - Styling
- [speeddial-template.md](./references/speeddial-template.md) - Templates
- [speeddial-radial-menu.md](./references/speeddial-radial-menu.md) - Radial Menu
- [speeddial-api.md](./references/speeddial-api.md) - API
- [speeddial-accessibility.md](./references/speeddial-accessibility.md) - Accessibility

---

## ProgressButton

**Purpose:** Button with progress indicator for async operations.

**Package:** `@syncfusion/ej2-splitbuttons`

### Quick Example
```typescript
import { ProgressButton } from '@syncfusion/ej2-splitbuttons';

const progressBtn: ProgressButton = new ProgressButton({
  enableProgress: true
});
progressBtn.appendTo('#progressbutton');
```

### Documentation
- [progressbutton-getting-started.md](./references/progressbutton-getting-started.md) - Setup
- [progressbutton-spinner-and-progress.md](./references/progressbutton-spinner-and-progress.md) - Progress
- [progressbutton-events.md](./references/progressbutton-events.md) - Events
- [progressbutton-how-to.md](./references/progressbutton-how-to.md) - Patterns
- [progressbutton-accessibility.md](./references/progressbutton-accessibility.md) - Accessibility
- [progressbutton-api.md](./references/progressbutton-api.md) - API

---

## RadioButton

**Purpose:** Single-selection radio button for mutually exclusive choices.

**Package:** `@syncfusion/ej2-buttons`

### Quick Example
```typescript
import { RadioButton } from '@syncfusion/ej2-buttons';

const radioBtn: RadioButton = new RadioButton({
  label: 'Option 1',
  name: 'group1',
  value: 'option1'
});
radioBtn.appendTo('#radio');
```

### Documentation
- [radiobutton-getting-started.md](./references/radiobutton-getting-started.md) - Setup
- [radiobutton-label-and-size.md](./references/radiobutton-label-and-size.md) - Labels
- [radiobutton-features-and-state.md](./references/radiobutton-features-and-state.md) - Features
- [radiobutton-how-to.md](./references/radiobutton-how-to.md) - Patterns
- [radiobutton-accessibility.md](./references/radiobutton-accessibility.md) - Accessibility
- [radiobutton-api.md](./references/radiobutton-api.md) - API

---

## SplitButton

**Purpose:** Button with dropdown menu for related actions.

**Package:** `@syncfusion/ej2-splitbuttons`

### Quick Example
```typescript
import { SplitButton } from '@syncfusion/ej2-splitbuttons';

const splitBtn: SplitButton = new SplitButton({
  items: [
    { text: 'Item 1', iconCss: 'e-icons e-one' },
    { text: 'Item 2', iconCss: 'e-icons e-two' }
  ]
});
splitBtn.appendTo('#splitbutton');
```

### Documentation
- [splitbutton-getting-started.md](./references/splitbutton-getting-started.md) - Setup
- [splitbutton-icons-and-separator.md](./references/splitbutton-icons-and-separator.md) - Icons
- [splitbutton-popup-items.md](./references/splitbutton-popup-items.md) - Popup
- [splitbutton-how-to.md](./references/splitbutton-how-to.md) - Patterns
- [splitbutton-accessibility.md](./references/splitbutton-accessibility.md) - Accessibility
- [splitbutton-api.md](./references/splitbutton-api.md) - API

---

## Switch Component

**Purpose:** Toggle on/off control for binary state management in forms and settings.

**Package:** `@syncfusion/ej2-buttons`

### Quick Example
```typescript
import { Switch, ChangeEventArgs } from '@syncfusion/ej2-buttons';

const switchComponent: Switch = new Switch({
  checked: false,
  content: 'Enable notifications',
  change: (args: ChangeEventArgs): void => {
    console.log('Switch state:', args.checked ? 'ON' : 'OFF');
  }
});
switchComponent.appendTo('#switch');
```

### Documentation
- [switch-getting-started.md](./references/switch-getting-started.md) - Setup and basics
- [switch-features.md](./references/switch-features.md) - Features and configuration
- [switch-style-and-appearance.md](./references/switch-style-and-appearance.md) - Styling
- [switch-events-and-methods.md](./references/switch-events-and-methods.md) - Events and methods
- [switch-how-to.md](./references/switch-how-to.md) - Common patterns
- [switch-api.md](./references/switch-api.md) - API reference

---

## Common Patterns

### Button with Icon and Text
```typescript
import { Button } from '@syncfusion/ej2-buttons';

const button: Button = new Button({
  cssClass: 'e-primary',
  iconCss: 'e-icons e-send',
  iconPosition: 'Right'
});
button.appendTo('#button');
```

### Handling Click Events
```typescript
const button: Button = new Button({
  click: (args: any): void => {
    console.log('Button clicked');
  }
});
button.appendTo('#button');
```

### Dynamic Updates
```typescript
const button: Button = new Button();
button.appendTo('#button');

// Update properties
button.cssClass = 'e-success';
button.refresh();
```

### Group Selection
```html
<!-- Radio selection -->
<div class="e-btn-group" data-mode="radio">
  <button>Option 1</button>
  <button>Option 2</button>
  <button>Option 3</button>
</div>

<!-- Checkbox selection -->
<div class="e-btn-group" data-mode="checkbox">
  <button>Bold</button>
  <button>Italic</button>
  <button>Underline</button>
</div>
```

---

## Installation

```bash
npm install @syncfusion/ej2-buttons @syncfusion/ej2-splitbuttons
npm audit
```

## Import

```typescript
import { Button, ButtonGroup, ChipList, Fab, SpeedDial, RadioButton, Switch } from '@syncfusion/ej2-buttons';
import { ProgressButton, SplitButton, DropdownButton } from '@syncfusion/ej2-splitbuttons';
```

## Theme Support

All components support these themes:
- **Material 3** - Modern Material Design
- **Bootstrap 5** - Bootstrap framework
- **Fluent** - Microsoft Fluent Design
- **Tailwind 3** - Tailwind CSS
- **Fabric** - Microsoft Fabric

```html
<!-- CDN-based theme imports (for quick prototyping / CDN deployments only).
     For production npm-based projects, import from node_modules instead:
     @import '../node_modules/@syncfusion/ej2-base/styles/material3.css';
     @import '../node_modules/@syncfusion/ej2-buttons/styles/material3.css'; -->
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/ej2-base/styles/material3.css" />
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/ej2-buttons/styles/material3.css" />
```

---

## Keyboard Navigation

All components support full keyboard navigation:
- **Tab:** Focus component
- **Enter/Space:** Activate button or menu item
- **Escape:** Close menus
- **Arrow Keys:** Navigate items

---

## Accessibility

All components comply with:
- **WCAG 2.2 Level AA** - Web Content Accessibility Guidelines
- **Section 508** - US federal accessibility standards
- **ADA** - Americans with Disabilities Act

Features include:
- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation
- Screen reader support
- Focus management
- High contrast support

---

## Quick Start Example

```typescript
import { Button, ChipList, Switch } from '@syncfusion/ej2-buttons';
import { SpeedDial, DropdownButton } from '@syncfusion/ej2-buttons';
import { SplitButton } from '@syncfusion/ej2-splitbuttons';

// Create a button
const button: Button = new Button({
  cssClass: 'e-primary',
  click: (): void => console.log('Clicked')
});
button.appendTo('#button');

// Create a switch
const switchComponent: Switch = new Switch({
  checked: false,
  content: 'Enable feature'
});
switchComponent.appendTo('#switch');

// Create a dropdown button
const dropdownBtn: DropdownButton = new DropdownButton({
  items: [
    { text: 'Edit', iconCss: 'e-icons e-edit' },
    { text: 'Delete', iconCss: 'e-icons e-delete' }
  ]
});
dropdownBtn.appendTo('#dropdownbutton');

// Create chips
const chips: ChipList = new ChipList({
  chips: [
    { text: 'Angular' },
    { text: 'React' },
    { text: 'Vue.js' }
  ]
});
chips.appendTo('#chips');

// Create speed dial
const speedDial: SpeedDial = new SpeedDial({
  iconCss: 'e-icons e-plus',
  items: [
    { text: 'Edit', iconCss: 'e-icons e-edit' },
    { text: 'Delete', iconCss: 'e-icons e-delete' }
  ]
});
speedDial.appendTo('#speeddial');
```

---

## Additional Resources

- [Syncfusion Documentation](https://www.syncfusion.com/documentation/ej2/overview/)
- [API Reference](https://ej2.syncfusion.com/javascript/api/)
- [GitHub Repository](https://github.com/syncfusion/ej2-javascript-ui-controls)
- [Live Demos](https://www.syncfusion.com/javascript-components)

---

**Component Version:** 1.0.0  
**Last Updated:** 2024  
**Package:** @syncfusion/ej2-buttons, @syncfusion/ej2-splitbuttons
📄 **Read:** [references/getting-started.md](references/radiobutton-getting-started.md)
- Package dependencies (`ej2-buttons`, `ej2-base`)
- Webpack quickstart project setup
- CSS theme imports
- Basic TypeScript rendering example
- Checked and unchecked states

#### Label and Size
📄 **Read:** [references/label-and-size.md](references/radiobutton-label-and-size.md)
- Setting label text with the `label` property
- Positioning the label before or after the button (`labelPosition: 'Before'` / `'After'`)
- Small size RadioButton using `cssClass: 'e-small'`
- Default size RadioButton

#### How-To Scenarios
📄 **Read:** [references/how-to.md](references/radiobutton-how-to.md)
- Set the disabled state using `disabled: true`
- Display selected label via `change` event
- Enable RTL layout using `enableRtl: true`
- Use `name` and `value` for HTML form submission
- Customize appearance with semantic CSS classes (`e-primary`, `e-success`, `e-info`, `e-warning`, `e-danger`)

#### Accessibility
📄 **Read:** [references/accessibility.md](references/radiobutton-accessibility.md)
- WCAG 2.2, Section 508, and ADA compliance
- WAI-ARIA attributes (`aria-disabled`)
- Keyboard interaction (Up/Left arrow, Down/Right arrow)
- Screen reader support and color contrast

#### API Reference
📄 **Read:** [references/api.md](references/radiobutton-api.md)
- All properties: `checked`, `cssClass`, `disabled`, `enableHtmlSanitizer`, `enablePersistence`, `enableRtl`, `htmlAttributes`, `label`, `labelPosition`, `locale`, `name`, `value`
- All methods: `appendTo`, `click`, `dataBind`, `destroy`, `focusIn`, `getRootElement`, `getSelectedValue`, `refresh`, `addEventListener`, `removeEventListener`
- All events: `change` (`ChangeArgs`), `created`

### Quick Start

#### TypeScript

```typescript
import { RadioButton } from '@syncfusion/ej2-buttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

// Initialize RadioButton component
let radiobutton: RadioButton = new RadioButton({ label: 'Option 1', name: 'default' });
radiobutton.appendTo('#element1');

radiobutton = new RadioButton({ label: 'Option 2', name: 'default', checked: true });
radiobutton.appendTo('#element2');
```

```html
<!-- index.html -->
<input id="element1" type="radio" />
<input id="element2" type="radio" />
```

#### TypeScript (module setup)

**index.html**
```html
<!DOCTYPE html>
<html>
<head>
  <!-- CDN links for quick prototyping only. Use node_modules imports for production. -->
  <link href="https://cdn.syncfusion.com/ej2/ej2-base/styles/material.css" rel="stylesheet" />
  <link href="https://cdn.syncfusion.com/ej2/ej2-buttons/styles/material.css" rel="stylesheet" />
</head>
<body>
  <input id="radio1" type="radio" />
  <input id="radio2" type="radio" />
  <script src="bundle.js"></script>
</body>
</html>
```

```typescript
import { RadioButton } from '@syncfusion/ej2-buttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

const rb1: RadioButton = new RadioButton({ label: 'Option 1', name: 'default' });
rb1.appendTo('#radio1');

const rb2: RadioButton = new RadioButton({ label: 'Option 2', name: 'default', checked: true });
rb2.appendTo('#radio2');
```

### Common Patterns

#### RadioButton group with change event
```typescript
import { RadioButton, ChangeEventArgs } from '@syncfusion/ej2-buttons';

let rb1: RadioButton = new RadioButton({
  label: 'Option 1',
  name: 'group',
  checked: true,
  change: (args: ChangeEventArgs) => {
    console.log('Selected: ' + (args.event.target as HTMLInputElement).value);
  }
});
rb1.appendTo('#element1');
```

#### Small-size RadioButton
```typescript
import { RadioButton } from '@syncfusion/ej2-buttons';

let rb: RadioButton = new RadioButton({ label: 'Small', name: 'size', cssClass: 'e-small' });
rb.appendTo('#element');
```

#### Disabled RadioButton
```typescript
import { RadioButton } from '@syncfusion/ej2-buttons';

let rb: RadioButton = new RadioButton({ label: 'Disabled Option', name: 'group', disabled: true });
rb.appendTo('#element');
```
## SplitButton

The Syncfusion EJ2 JavaScript SplitButton renders a dual-action button: the primary button triggers a default action, and the secondary arrow button opens a contextual popup menu with additional action items. It supports icons, separators, item/popup templating, RTL, disabled state, keyboard navigation, and full accessibility — all from the `ej2-splitbuttons` package.

### Navigation Guide

#### Getting Started
📄 **Read:** [references/getting-started.md](references/splitbutton-getting-started.md)
- Package dependencies (`ej2-splitbuttons`, `ej2-base`, `ej2-buttons`, `ej2-popups`)
- Local script/style setup
- CDN-based setup
- Minimal working example (ES5 global namespace)
- Rendering via `appendTo()`, `items` configuration

#### Icons and Separator
📄 **Read:** [references/icons-and-separator.md](references/splitbutton-icons-and-separator.md)
- Adding icons via `iconCss` property
- Positioning icons: `Left` (default) and `Top`
- Vertical SplitButton using `e-vertical` CSS class and `cssClass`
- Adding horizontal separators between popup items via `separator: true`

#### Popup Items
📄 **Read:** [references/popup-items.md](references/splitbutton-popup-items.md)
- Adding icons to popup action items via `iconCss` on `ItemModel`
- Item templating with `beforeItemRender` event
- Popup templating using the `target` property with a custom HTML element
- `addItems()` and `removeItems()` methods for dynamic item management

#### How-To Scenarios
📄 **Read:** [references/how-to.md](references/splitbutton-how-to.md)
- Enable RTL (right-to-left) layout
- Set disabled state
- Group popup items using ListView
- Open a Dialog on popup item click via `select` event
- Underline a character in popup item text using `beforeItemRender`

#### Accessibility
📄 **Read:** [references/accessibility.md](references/splitbutton-accessibility.md)
- WCAG 2.2, Section 508, ADA compliance
- WAI-ARIA attributes: `role`, `aria-haspopup`, `aria-expanded`, `aria-owns`, `aria-disabled`
- Keyboard shortcuts (Esc, Enter, Space, Arrow keys, Alt+Arrow)
- Screen reader support, RTL, color contrast

#### API Reference
📄 **Read:** [references/api.md](references/splitbutton-api.md)
- All properties: `content`, `items`, `iconCss`, `iconPosition`, `cssClass`, `disabled`, `enableRtl`, `target`, `itemTemplate`, `animationSettings`, `closeActionEvents`, `createPopupOnClick`, `popupWidth`, `enableHtmlSanitizer`, `enablePersistence`, `locale`
- All methods: `appendTo`, `toggle`, `addItems`, `removeItems`, `dataBind`, `refresh`, `destroy`, `focusIn`, `getRootElement`
- All events: `click`, `select`, `beforeOpen`, `open`, `beforeClose`, `close`, `beforeItemRender`, `created`

### Quick Start

#### TypeScript

**index.html**
```html
<!DOCTYPE html>
<html>
<head>
  <!-- CDN links for quick prototyping only. Use node_modules imports for production. -->
  <link href="https://cdn.syncfusion.com/ej2/ej2-base/styles/material.css" rel="stylesheet" />
  <link href="https://cdn.syncfusion.com/ej2/ej2-buttons/styles/material.css" rel="stylesheet" />
  <link href="https://cdn.syncfusion.com/ej2/ej2-popups/styles/material.css" rel="stylesheet" />
  <link href="https://cdn.syncfusion.com/ej2/ej2-splitbuttons/styles/material.css" rel="stylesheet" />
</head>
<body>
  <button id="element">Paste</button>
  <script src="bundle.js"></script>
</body>
</html>
```

```typescript
import { SplitButton, ItemModel } from '@syncfusion/ej2-splitbuttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

const items: ItemModel[] = [
  { text: 'Cut' },
  { text: 'Copy' },
  { text: 'Paste' }
];

const splitBtn: SplitButton = new SplitButton({ items: items });
splitBtn.appendTo('#element');
```

### Common Patterns

#### SplitButton with icon (left position, default)
```typescript
import { SplitButton, ItemModel } from '@syncfusion/ej2-splitbuttons';

const items: ItemModel[] = [{ text: 'Cut' }, { text: 'Copy' }, { text: 'Paste' }];

const splitBtn: SplitButton = new SplitButton({
  content: 'Paste',
  iconCss: 'e-icons e-paste',
  items: items
});
splitBtn.appendTo('#element');
```

#### SplitButton with click and select event handlers
```typescript
import { SplitButton, ItemModel, ClickEventArgs, MenuEventArgs } from '@syncfusion/ej2-splitbuttons';

const items: ItemModel[] = [{ text: 'Cut' }, { text: 'Copy' }, { text: 'Paste' }];

const splitBtn: SplitButton = new SplitButton({
  content: 'Paste',
  items: items,
  click: (args: ClickEventArgs): void => {
    console.log('Primary button clicked');
  },
  select: (args: MenuEventArgs): void => {
    console.log('Selected item: ' + args.item.text);
  }
});
splitBtn.appendTo('#element');
```

#### Disabled SplitButton
```typescript
import { SplitButton, ItemModel } from '@syncfusion/ej2-splitbuttons';

const items: ItemModel[] = [{ text: 'Cut' }, { text: 'Copy' }, { text: 'Paste' }];

const splitBtn: SplitButton = new SplitButton({
  content: 'Paste',
  items: items,
  disabled: true
});
splitBtn.appendTo('#element');
```
