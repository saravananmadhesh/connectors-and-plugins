# API Reference — Syncfusion EJ2 JavaScript Switch

Complete API reference for the Syncfusion Switch component.

**Official Documentation:** https://ej2.syncfusion.com/javascript/documentation/api/switch/

## Table of Contents
- [Import](#import)
- [Properties](#properties)
- [Methods](#methods)
- [Events](#events)
- [ChangeEventArgs Interface](#changeeventargs-interface)
- [BeforeChangeEventArgs Interface](#beforechangeeventargs-interface)

---

## Import

```typescript
import { Switch } from '@syncfusion/ej2-buttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);
```

---

## Properties

All properties are passed to the `Switch` constructor configuration object.

### checked
- **Type:** `boolean`
- **Default:** `false`
- **Description:** Specifies whether the Switch is in the checked (on) state.

```typescript
new Switch({ checked: true });
```

---

### content
- **Type:** `string`
- **Default:** `''`
- **Description:** Text or HTML content displayed as the label next to the Switch.

```typescript
new Switch({ content: 'Enable notifications' });
```

---

### cssClass
- **Type:** `string`
- **Default:** `''`
- **Description:** Adds custom CSS classes. Use `"e-small"`, `"e-medium"`, or `"e-large"` for size variants. Multiple classes can be space-separated.

```typescript
new Switch({ cssClass: 'e-small my-custom-class' });
```

---

### disabled
- **Type:** `boolean`
- **Default:** `false`
- **Description:** When `true`, the Switch cannot be toggled and is excluded from form submissions.

```typescript
new Switch({ disabled: true });
```

---

### enablePersistence
- **Type:** `boolean`
- **Default:** `false`
- **Description:** When `true`, persists the checked state in browser local storage across page reloads.

```typescript
new Switch({ enablePersistence: true });
```

---

### enableRtl
- **Type:** `boolean`
- **Default:** `false`
- **Description:** When `true`, renders in right-to-left direction for RTL languages (Arabic, Hebrew, Urdu, etc.).

```typescript
new Switch({ enableRtl: true });
```

---

### id
- **Type:** `string`
- **Default:** `''`
- **Description:** Sets the `id` attribute on the Switch element. Used for form identification.

```typescript
new Switch({ id: 'notifications-switch' });
```

---

### name
- **Type:** `string`
- **Default:** `''`
- **Description:** Sets the `name` attribute for form submission. Only checked, enabled Switches submit their value.

```typescript
new Switch({ name: 'preferences' });
```

---

### offLabel
- **Type:** `string`
- **Default:** `''`
- **Description:** Text displayed inside the track when the Switch is unchecked (off state).

> **Note:** Not supported in Material themes. Keep short.

```typescript
new Switch({ offLabel: 'OFF' });
```

---

### onLabel
- **Type:** `string`
- **Default:** `''`
- **Description:** Text displayed inside the track when the Switch is checked (on state).

> **Note:** Not supported in Material themes. Keep short.

```typescript
new Switch({ onLabel: 'ON', offLabel: 'OFF' });
```

---

### value
- **Type:** `string`
- **Default:** `''`
- **Description:** Value submitted with form data when the Switch is checked and form is submitted.

```typescript
new Switch({ name: 'wifi', value: 'enabled' });
```

---

## Methods

### appendTo(element)

Renders the Switch into the specified DOM element.

- **Signature:** `appendTo(element: string | HTMLElement): void`
- **Parameter:** CSS selector (string) or HTMLElement reference

```typescript
const switchComponent = new Switch({ content: 'Toggle' });
switchComponent.appendTo('#switch');
// or
switchComponent.appendTo(document.getElementById('switch'));
```

---

### toggle()

Programmatically toggle the Switch state.

- **Signature:** `toggle(): void`

```typescript
const switchComponent = new Switch({ checked: false });
switchComponent.appendTo('#switch');

switchComponent.toggle();  // Now checked: true
switchComponent.toggle();  // Now checked: false
```

---

### click()

Simulate a click on the Switch, triggering change events.

- **Signature:** `click(): void`

```typescript
switchComponent.click();  // Simulates user click
```

---

### focusIn()

Set focus to the Switch element.

- **Signature:** `focusIn(): void`

```typescript
switchComponent.focusIn();
```

---

### refresh()

Refresh the component to reflect property changes.

- **Signature:** `refresh(): void`

```typescript
switchComponent.checked = true;
switchComponent.refresh();
```

---

### destroy()

Destroy the component and clean up resources.

- **Signature:** `destroy(): void`

```typescript
switchComponent.destroy();
```

---

## Events

### change

Fires after the Switch state changes (user toggles it).

- **Parameter Type:** `ChangeEventArgs`
- **Usage:** Pass function to `change` property in config

```typescript
new Switch({
  change: (args: ChangeEventArgs) => {
    console.log('Switch is now:', args.checked ? 'ON' : 'OFF');
  }
});
```

---

### beforeChange

Fires before the Switch state changes. Allows canceling the change.

- **Parameter Type:** `BeforeChangeEventArgs`
- **Usage:** Pass function to `beforeChange` property in config

```typescript
new Switch({
  beforeChange: (args: BeforeChangeEventArgs) => {
    if (args.checked === true) {
      args.cancel = true;  // Prevent changing to ON
    }
  }
});
```

---

### created

Fires after the component is created and initialized.

- **Parameter Type:** `Event`
- **Usage:** Pass function to `created` property in config

```typescript
new Switch({
  created: () => {
    console.log('Switch initialized');
  }
});
```

---

### click

Fires when the Switch is clicked.

- **Parameter Type:** `MouseEvent`
- **Usage:** Pass function to `click` property in config

```typescript
new Switch({
  click: (args: MouseEvent) => {
    console.log('Switch clicked at', args.clientX, args.clientY);
  }
});
```

---

### focus

Fires when the Switch receives focus.

- **Parameter Type:** `FocusEvent`
- **Usage:** Pass function to `focus` property in config

```typescript
new Switch({
  focus: (args: FocusEvent) => {
    console.log('Switch focused');
  }
});
```

---

### blur

Fires when the Switch loses focus.

- **Parameter Type:** `FocusEvent`
- **Usage:** Pass function to `blur` property in config

```typescript
new Switch({
  blur: (args: FocusEvent) => {
    console.log('Switch blurred');
  }
});
```

---

## ChangeEventArgs Interface

Passed to the `change` event handler:

```typescript
interface ChangeEventArgs {
  checked?: boolean;    // New checked state after the change
  event?: Event;        // The event that triggered the change
  name?: string;        // Event name: 'change'
}
```

### Example

```typescript
new Switch({
  change: (args: ChangeEventArgs) => {
    console.log('New state:', args.checked);
  }
});
```

---

## BeforeChangeEventArgs Interface

Passed to the `beforeChange` event handler:

```typescript
interface BeforeChangeEventArgs {
  checked?: boolean;    // Current checked state before change
  event?: Event;        // The event that triggered the change
  cancel?: boolean;     // Set to true to prevent the change
}
```

### Example

```typescript
new Switch({
  beforeChange: (args: BeforeChangeEventArgs) => {
    console.log('Current state:', args.checked);
    args.cancel = false;  // Allow the change
  }
});
```

---

## Complete Configuration Example

```typescript
import { Switch, ChangeEventArgs, BeforeChangeEventArgs } from '@syncfusion/ej2-buttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

const switchComponent = new Switch({
  // State
  checked: false,
  disabled: false,
  
  // Appearance
  content: 'Enable Feature',
  cssClass: 'e-small',
  onLabel: 'ON',
  offLabel: 'OFF',
  
  // Form integration
  id: 'feature-switch',
  name: 'feature_enabled',
  value: 'yes',
  
  // Localization
  enableRtl: false,
  enablePersistence: true,
  
  // Event handlers
  change: (args: ChangeEventArgs) => {
    console.log('State changed:', args.checked);
  },
  beforeChange: (args: BeforeChangeEventArgs) => {
    console.log('State changing from:', args.checked);
  },
  created: () => {
    console.log('Component ready');
  }
});

switchComponent.appendTo('#switch');
```

---

## Common Usage Patterns

### Enable/Disable Dynamically

```typescript
const switchComponent = new Switch({ content: 'Toggle' });
switchComponent.appendTo('#switch');

// Disable based on condition
if (someCondition) {
  switchComponent.disabled = true;
  switchComponent.refresh();
}
```

### Get Current State

```typescript
const isEnabled = switchComponent.checked;  // true or false
```

### Set State Programmatically

```typescript
switchComponent.checked = true;
switchComponent.refresh();
```

### Track State Changes

```typescript
interface StateTracker {
  toggles: number;
  enabled: boolean;
  lastChanged: Date;
}

const tracker: StateTracker = {
  toggles: 0,
  enabled: false,
  lastChanged: new Date()
};

new Switch({
  change: (args: ChangeEventArgs) => {
    tracker.toggles++;
    tracker.enabled = args.checked ?? false;
    tracker.lastChanged = new Date();
    console.log('Tracker:', tracker);
  }
});
```
