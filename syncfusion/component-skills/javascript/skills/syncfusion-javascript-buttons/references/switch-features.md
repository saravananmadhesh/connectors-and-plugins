# Switch Features and Configuration — Syncfusion EJ2 JavaScript

This file covers all configurable properties and features of the Syncfusion Switch component.

## Table of Contents
- [Text Labels (onLabel / offLabel)](#text-labels-onlabel--offlabel)
- [Disabled State](#disabled-state)
- [Name and Value (Form Submission)](#name-and-value-form-submission)
- [Custom CSS Classes](#custom-css-classes)
- [Right-to-Left (RTL)](#right-to-left-rtl)
- [Persist State](#persist-state)
- [Content Property](#content-property)

---

## Text Labels (onLabel / offLabel)

Display custom text inside the Switch track for the on and off states:

```typescript
import { Switch } from '@syncfusion/ej2-buttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

const switchComponent: Switch = new Switch({
  onLabel: 'ON',
  offLabel: 'OFF',
  checked: true,
  content: 'Enable Feature'
});
switchComponent.appendTo('#switch');
```

**CSS for Styled Labels:**

```css
/* Custom label styling */
.e-switch .e-switch-inner {
  font-size: 12px;
  font-weight: 600;
}
```

> **Note:** Text labels are **not supported** in Material themes. Keep labels short — they have limited width inside the track.

---

## Disabled State

Set `disabled` to `true` to prevent user interaction. Disabled Switches appear grayed out:

```typescript
import { Switch } from '@syncfusion/ej2-buttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

// Enabled switch (default)
const enabledSwitch: Switch = new Switch({
  content: 'Enabled',
  disabled: false
});
enabledSwitch.appendTo('#enabled');

// Disabled switch
const disabledSwitch: Switch = new Switch({
  content: 'Disabled',
  disabled: true
});
disabledSwitch.appendTo('#disabled');
```

> Disabled Switches are excluded from form submission — only enabled, checked Switches send data.

---

## Name and Value (Form Submission)

Use `name` and `value` properties for HTML form integration:

```typescript
import { Switch, ChangeEventArgs } from '@syncfusion/ej2-buttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

// USB switch
const usbSwitch: Switch = new Switch({
  id: 'usb-switch',
  name: 'connectivity',
  value: 'USB',
  checked: true,
  content: 'USB Tethering'
});
usbSwitch.appendTo('#usb');

// Wi-Fi switch
const wifiSwitch: Switch = new Switch({
  id: 'wifi-switch',
  name: 'connectivity',
  value: 'Wi-Fi',
  checked: true,
  content: 'Wi-Fi Hotspot'
});
wifiSwitch.appendTo('#wifi');

// Bluetooth switch (disabled)
const btSwitch: Switch = new Switch({
  id: 'bt-switch',
  name: 'connectivity',
  value: 'Bluetooth',
  disabled: true,
  content: 'Bluetooth Tethering'
});
btSwitch.appendTo('#bluetooth');

// Form submission handling
document.getElementById('form-submit')?.addEventListener('click', () => {
  const formData = new FormData(document.querySelector('form') as HTMLFormElement);
  console.log('Form values:', Object.fromEntries(formData));
  // Output: { connectivity: ['USB', 'Wi-Fi'] }
  // (Bluetooth excluded because disabled)
});
```

**HTML:**
```html
<form id="connectivity-form">
  <div id="usb"></div>
  <div id="wifi"></div>
  <div id="bluetooth"></div>
  <button type="button" id="form-submit">Submit Form</button>
</form>
```

---

## Custom CSS Classes

Use `cssClass` to apply styling. The property accepts space-separated class names:

```typescript
import { Switch } from '@syncfusion/ej2-buttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

// Predefined size class
const smallSwitch: Switch = new Switch({
  cssClass: 'e-small',
  content: 'Small'
});
smallSwitch.appendTo('#small');

// Large switch
const largeSwitch: Switch = new Switch({
  cssClass: 'e-large',
  content: 'Large'
});
largeSwitch.appendTo('#large');

// Custom class
const customSwitch: Switch = new Switch({
  cssClass: 'my-custom-switch my-primary-color',
  content: 'Custom'
});
customSwitch.appendTo('#custom');
```

**Custom CSS:**

```css
/* Custom gradient styling */
.my-custom-switch .e-switch-inner,
.my-custom-switch.e-switch.e-switch-active .e-switch-inner {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

/* Custom primary color */
.my-primary-color.e-switch.e-switch-active {
  background-color: #d946ef;
}

/* Custom sizing */
.my-custom-switch.e-switch {
  width: 50px;
  height: 28px;
}

.my-custom-switch .e-switch-inner {
  width: 46px;
  height: 24px;
}

.my-custom-switch .e-switch-handle {
  width: 22px;
  height: 22px;
}
```

### Predefined Size Classes

```typescript
// Built-in classes
new Switch({ cssClass: 'e-small' });    // Compact size
new Switch({ cssClass: 'e-medium' });   // Medium size (default)
new Switch({ cssClass: 'e-large' });    // Large size
```

---

## Right-to-Left (RTL)

Enable RTL layout for Arabic, Hebrew, Urdu, and other RTL languages:

```typescript
import { Switch } from '@syncfusion/ej2-buttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

const rtlSwitch: Switch = new Switch({
  enableRtl: true,
  checked: true,
  content: 'تفعيل الإشعارات'  // Enable Notifications in Arabic
});
rtlSwitch.appendTo('#rtl-switch');
```

**HTML with dir attribute:**

```html
<div id="rtl-switch" dir="rtl"></div>
```

---

## Persist State

Enable state persistence across page reloads using browser local storage:

```typescript
import { Switch } from '@syncfusion/ej2-buttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

const persistSwitch: Switch = new Switch({
  enablePersistence: true,
  checked: false,
  content: 'Remember my choice'
});
persistSwitch.appendTo('#persist');

// On page reload, the checked state is automatically restored
```

---

## Content Property

Display label text alongside the Switch:

```typescript
import { Switch } from '@syncfusion/ej2-buttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

// Text content
const switch1: Switch = new Switch({
  content: 'Enable notifications'
});
switch1.appendTo('#switch1');

// HTML content
const switch2: Switch = new Switch({
  content: '<strong>Dark Mode</strong> (experimental)'
});
switch2.appendTo('#switch2');

// Complex content with icon
const switch3: Switch = new Switch({
  content: '<span class="icon-bell"></span> Sound effects'
});
switch3.appendTo('#switch3');
```

---

## Configuration Examples

### Settings Panel

```typescript
import { Switch, ChangeEventArgs } from '@syncfusion/ej2-buttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

interface Settings {
  notifications: boolean;
  darkMode: boolean;
  autoSave: boolean;
  publicProfile: boolean;
}

let settings: Settings = {
  notifications: true,
  darkMode: false,
  autoSave: true,
  publicProfile: false,
};

function onSettingChange(key: keyof Settings, args: ChangeEventArgs): void {
  settings[key] = args.checked ?? false;
  console.log('Settings updated:', settings);
}

// Create switches for each setting
const notifSwitch: Switch = new Switch({
  checked: settings.notifications,
  content: 'Receive Notifications',
  change: (args) => onSettingChange('notifications', args)
});
notifSwitch.appendTo('#notifications');

const darkSwitch: Switch = new Switch({
  checked: settings.darkMode,
  content: 'Dark Mode',
  change: (args) => onSettingChange('darkMode', args)
});
darkSwitch.appendTo('#darkmode');

const autoSaveSwitch: Switch = new Switch({
  checked: settings.autoSave,
  content: 'Auto-save Changes',
  change: (args) => onSettingChange('autoSave', args)
});
autoSaveSwitch.appendTo('#autosave');

const publicSwitch: Switch = new Switch({
  checked: settings.publicProfile,
  content: 'Make Profile Public',
  change: (args) => onSettingChange('publicProfile', args)
});
publicSwitch.appendTo('#public');
```

### Feature Toggle

```typescript
import { Switch } from '@syncfusion/ej2-buttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

let beta: Switch;
let experimental: Switch;

function toggleFeatures(): void {
  const betaEnabled = beta.checked;
  const expEnabled = experimental.checked;
  
  console.log(`Beta features: ${betaEnabled ? 'ON' : 'OFF'}`);
  console.log(`Experimental features: ${expEnabled ? 'ON' : 'OFF'}`);
}

beta = new Switch({
  checked: false,
  content: 'Enable Beta Features',
  change: toggleFeatures
});
beta.appendTo('#beta');

experimental = new Switch({
  checked: false,
  disabled: !beta.checked,  // Experimental only available if beta is enabled
  content: 'Enable Experimental Features',
  change: toggleFeatures
});
experimental.appendTo('#experimental');
```
