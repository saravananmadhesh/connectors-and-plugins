# How To — Syncfusion EJ2 JavaScript Switch

Practical recipes for common Switch implementation tasks using documented APIs.

## Table of Contents
- [Change Switch Size](#change-switch-size)
- [Set Text Labels](#set-text-labels)
- [Set Disabled State](#set-disabled-state)
- [Prevent State Change](#prevent-state-change)
- [Enable RTL Layout](#enable-rtl-layout)
- [Programmatic Toggle](#programmatic-toggle)
- [Form Integration](#form-integration)
- [Settings Panel](#settings-panel)

---

## Change Switch Size

Use `cssClass` to apply size variants. The Switch supports `e-small`, `e-medium` (default), and `e-large`:

```typescript
import { Switch } from '@syncfusion/ej2-buttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

// Small size
const smallSwitch: Switch = new Switch({
  cssClass: 'e-small',
  content: 'Small'
});
smallSwitch.appendTo('#small');

// Default size
const defaultSwitch: Switch = new Switch({
  content: 'Default'
});
defaultSwitch.appendTo('#default');

// Large size
const largeSwitch: Switch = new Switch({
  cssClass: 'e-large',
  content: 'Large'
});
largeSwitch.appendTo('#large');
```

---

## Set Text Labels

Display custom text inside the track using `onLabel` and `offLabel`:

```typescript
import { Switch } from '@syncfusion/ej2-buttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

const switchComponent: Switch = new Switch({
  onLabel: 'ON',
  offLabel: 'OFF',
  checked: true,
  content: 'Power'
});
switchComponent.appendTo('#switch');
```

> **Note:** Text labels are **not supported in Material themes**. Keep labels short.

---

## Set Disabled State

Use `disabled: true` to create a non-interactive Switch:

```typescript
import { Switch } from '@syncfusion/ej2-buttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

const disabledSwitch: Switch = new Switch({
  disabled: true,
  content: 'Unavailable Feature'
});
disabledSwitch.appendTo('#disabled');
```

**When to use:**
- Feature not yet available
- Requires another setting to be enabled first
- Read-only/audit mode

---

## Prevent State Change

Use `beforeChange` event to intercept state transitions:

```typescript
import { Switch, BeforeChangeEventArgs } from '@syncfusion/ej2-buttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

function beforeStateChange(args: BeforeChangeEventArgs): void {
  // Prevent turning OFF (only allow turning ON)
  if (args.checked === true) {
    args.cancel = true;
    console.log('Cannot turn off this feature');
  }
}

const protectedSwitch: Switch = new Switch({
  checked: true,
  beforeChange: beforeStateChange,
  content: 'Critical Feature'
});
protectedSwitch.appendTo('#protected');
```

### Conditional Prevention with Confirmation

```typescript
import { Switch, BeforeChangeEventArgs } from '@syncfusion/ej2-buttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

function beforeStateChange(args: BeforeChangeEventArgs): void {
  const newState = args.checked ? 'OFF' : 'ON';
  if (!confirm(`Turn ${newState}? This cannot be undone.`)) {
    args.cancel = true;
  }
}

const confirmSwitch: Switch = new Switch({
  beforeChange: beforeStateChange,
  content: 'Dangerous Operation'
});
confirmSwitch.appendTo('#confirm');
```

---

## Enable RTL Layout

Use `enableRtl: true` for right-to-left languages:

```typescript
import { Switch } from '@syncfusion/ej2-buttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

const rtlSwitch: Switch = new Switch({
  enableRtl: true,
  checked: true,
  content: 'تفعيل الإخطارات'  // Enable Notifications in Arabic
});
rtlSwitch.appendTo('#rtl');
```

**HTML:**
```html
<div id="rtl" dir="rtl"></div>
```

---

## Programmatic Toggle

Toggle the Switch state via the `toggle()` method:

```typescript
import { Switch } from '@syncfusion/ej2-buttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

let switchComponent: Switch;

function toggleSwitch(): void {
  switchComponent.toggle();
  console.log('New state:', switchComponent.checked);
}

switchComponent = new Switch({
  content: 'Toggle via Button'
});
switchComponent.appendTo('#switch');

document.getElementById('toggle-btn')?.addEventListener('click', toggleSwitch);
```

### Timer-Based Toggle

```typescript
import { Switch } from '@syncfusion/ej2-buttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

let switchComponent: Switch;
let isRunning = false;

function startTimer(): void {
  isRunning = true;
  const interval = setInterval(() => {
    switchComponent.toggle();
  }, 1000);
  
  setTimeout(() => {
    clearInterval(interval);
    isRunning = false;
  }, 5000);
}

switchComponent = new Switch({
  content: 'Auto-Toggle Demo'
});
switchComponent.appendTo('#switch');

document.getElementById('start-btn')?.addEventListener('click', startTimer);
```

---

## Form Integration

Use `name` and `value` properties for form submission:

```typescript
import { Switch } from '@syncfusion/ej2-buttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

// Create switches for preferences
const emailSwitch: Switch = new Switch({
  id: 'email-notifications',
  name: 'preferences',
  value: 'email',
  checked: true,
  content: 'Email Notifications'
});
emailSwitch.appendTo('#email');

const smsSwitch: Switch = new Switch({
  id: 'sms-notifications',
  name: 'preferences',
  value: 'sms',
  checked: false,
  content: 'SMS Notifications'
});
smsSwitch.appendTo('#sms');

const pushSwitch: Switch = new Switch({
  id: 'push-notifications',
  name: 'preferences',
  value: 'push',
  disabled: true,
  content: 'Push Notifications'
});
pushSwitch.appendTo('#push');

// Handle form submission
document.getElementById('preferences-form')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(e.target as HTMLFormElement);
  const preferences = formData.getAll('preferences');
  console.log('Selected preferences:', preferences);
  // Output: ['email'] (only email checked, sms unchecked, push disabled)
});
```

**HTML:**
```html
<form id="preferences-form">
  <div id="email"></div>
  <div id="sms"></div>
  <div id="push"></div>
  <button type="submit">Save Preferences</button>
</form>
```

---

## Settings Panel

Create a settings UI with multiple switches:

```typescript
import { Switch, ChangeEventArgs } from '@syncfusion/ej2-buttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

interface AppSettings {
  notifications: boolean;
  darkMode: boolean;
  autoSave: boolean;
  analytics: boolean;
}

let settings: AppSettings = {
  notifications: true,
  darkMode: false,
  autoSave: true,
  analytics: false,
};

function onSettingChange(key: keyof AppSettings, args: ChangeEventArgs): void {
  settings[key] = args.checked ?? false;
  console.log('Settings updated:', settings);
  saveSettings(settings);
}

function saveSettings(s: AppSettings): void {
  console.log('Saving to server:', s);
  localStorage.setItem('appSettings', JSON.stringify(s));
}

// Create settings switches
const notifSwitch = new Switch({
  checked: settings.notifications,
  content: 'Receive Notifications',
  change: (args) => onSettingChange('notifications', args)
});
notifSwitch.appendTo('#notifications');

const darkSwitch = new Switch({
  checked: settings.darkMode,
  content: 'Dark Mode',
  change: (args) => onSettingChange('darkMode', args)
});
darkSwitch.appendTo('#darkmode');

const autoSaveSwitch = new Switch({
  checked: settings.autoSave,
  content: 'Auto-save Changes',
  change: (args) => onSettingChange('autoSave', args)
});
autoSaveSwitch.appendTo('#autosave');

const analyticsSwitch = new Switch({
  checked: settings.analytics,
  content: 'Share Analytics',
  change: (args) => onSettingChange('analytics', args)
});
analyticsSwitch.appendTo('#analytics');

console.log('Settings panel initialized with saved values');
```

---

## Bind Switch State to Visual Elements

Toggle CSS classes to reflect switch state:

```typescript
import { Switch, ChangeEventArgs } from '@syncfusion/ej2-buttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

const darkModeSwitch = new Switch({
  content: 'Dark Mode',
  change: (args: ChangeEventArgs) => {
    const isDark = args.checked ?? false;
    const root = document.documentElement;
    
    if (isDark) {
      root.classList.add('dark-mode');
      document.body.style.backgroundColor = '#1a1a1a';
      document.body.style.color = '#fff';
    } else {
      root.classList.remove('dark-mode');
      document.body.style.backgroundColor = '#fff';
      document.body.style.color = '#000';
    }
  }
});
darkModeSwitch.appendTo('#darkmode');
```

**CSS:**
```css
:root.dark-mode {
  --bg-color: #1a1a1a;
  --text-color: #fff;
}

:root {
  --bg-color: #fff;
  --text-color: #000;
}

body {
  background-color: var(--bg-color);
  color: var(--text-color);
  transition: background-color 0.3s, color 0.3s;
}
```
