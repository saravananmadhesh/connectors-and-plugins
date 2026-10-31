# Events and Methods — Syncfusion EJ2 JavaScript Switch

This file covers all events and programmatic methods available on the Switch component.

## Table of Contents
- [Events Overview](#events-overview)
- [change Event](#change-event)
- [beforeChange Event](#beforechange-event)
- [created Event](#created-event)
- [Methods Overview](#methods-overview)
- [toggle() Method](#toggle-method)
- [click() Method](#click-method)
- [focusIn() Method](#focusin-method)
- [destroy() Method](#destroy-method)

---

## Events Overview

| Event | Argument Type | When It Fires |
|-------|--------------|---------------|
| `change` | `ChangeEventArgs` | After the user toggles the switch state |
| `beforeChange` | `BeforeChangeEventArgs` | Before the switch state changes (cancellable) |
| `created` | `Event` | Once the component finishes rendering |
| `click` | `MouseEvent` | When the switch is clicked |
| `focus` | `FocusEvent` | When the switch receives focus |
| `blur` | `FocusEvent` | When the switch loses focus |

---

## change Event

Fires every time the user toggles the Switch state. Use this to react to state changes:

```typescript
import { Switch, ChangeEventArgs } from '@syncfusion/ej2-buttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

function onStateChange(args: ChangeEventArgs): void {
  console.log('Switch is now:', args.checked ? 'ON' : 'OFF');
  console.log('Event:', args.event);
}

const switchComponent: Switch = new Switch({
  checked: false,
  content: 'Toggle me',
  change: onStateChange
});
switchComponent.appendTo('#switch');
```

### Log State Changes to Console

```typescript
import { Switch, ChangeEventArgs } from '@syncfusion/ej2-buttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

interface StateLog {
  timestamp: string;
  state: boolean;
}

const stateLogs: StateLog[] = [];

function logStateChange(args: ChangeEventArgs): void {
  const log: StateLog = {
    timestamp: new Date().toLocaleTimeString(),
    state: args.checked ?? false
  };
  stateLogs.push(log);
  console.table(stateLogs);
}

const switchComponent: Switch = new Switch({
  change: logStateChange,
  content: 'Log Changes'
});
switchComponent.appendTo('#switch');
```

---

## beforeChange Event

Fires **before** the Switch state changes. This event allows you to intercept, validate, or cancel the state transition:

```typescript
import { Switch, BeforeChangeEventArgs } from '@syncfusion/ej2-buttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

function beforeStateChange(args: BeforeChangeEventArgs): void {
  console.log('Current state:', args.checked);
  console.log('State change requested');
  // Set args.cancel = true to prevent the change
}

const switchComponent: Switch = new Switch({
  checked: false,
  content: 'Observe changes',
  beforeChange: beforeStateChange
});
switchComponent.appendTo('#switch');
```

### Conditionally Prevent Changes

```typescript
import { Switch, BeforeChangeEventArgs } from '@syncfusion/ej2-buttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

// Prevent turning OFF; only allow turning ON
function onBeforeChange(args: BeforeChangeEventArgs): void {
  if (args.checked === true) {
    // Currently ON, user tries to turn OFF → Cancel it
    args.cancel = true;
    alert('Cannot turn off this feature');
  }
}

const lockedSwitch: Switch = new Switch({
  checked: true,
  beforeChange: onBeforeChange,
  content: 'Cannot be disabled'
});
lockedSwitch.appendTo('#locked');

// Allow changes only on weekdays
function weekdayOnly(args: BeforeChangeEventArgs): void {
  const today = new Date().getDay();
  const isWeekend = today === 0 || today === 6;
  if (isWeekend) {
    args.cancel = true;
    alert('Changes only allowed on weekdays');
  }
}

const weekdaySwitch: Switch = new Switch({
  beforeChange: weekdayOnly,
  content: 'Weekdays only'
});
weekdaySwitch.appendTo('#weekday');
```

---

## created Event

Fires once the component finishes initialization and is ready to use:

```typescript
import { Switch } from '@syncfusion/ej2-buttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

function onCreated(): void {
  console.log('Switch component created and ready!');
}

const switchComponent: Switch = new Switch({
  created: onCreated,
  content: 'Check console'
});
switchComponent.appendTo('#switch');
```

---

## Methods Overview

| Method | Purpose |
|--------|---------|
| `toggle()` | Toggle the switch state programmatically |
| `click()` | Simulate a click on the switch |
| `focusIn()` | Set focus to the switch |
| `destroy()` | Destroy the component and clean up |
| `appendTo(element)` | Render component into specified element |

---

## toggle() Method

Programmatically toggle the Switch state:

```typescript
import { Switch } from '@syncfusion/ej2-buttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

let switchComponent: Switch;

function toggleSwitch(): void {
  switchComponent.toggle();
  console.log('Toggled! New state:', switchComponent.checked);
}

switchComponent = new Switch({
  checked: false,
  content: 'Programmatic Toggle'
});
switchComponent.appendTo('#switch');

// Add button to toggle
document.getElementById('toggle-btn')?.addEventListener('click', toggleSwitch);
```

### Auto-Toggle Example

```typescript
import { Switch } from '@syncfusion/ej2-buttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

let switchComponent: Switch;
let intervalId: number;

function startAutoToggle(): void {
  intervalId = window.setInterval(() => {
    switchComponent.toggle();
  }, 1000);
}

function stopAutoToggle(): void {
  clearInterval(intervalId);
}

switchComponent = new Switch({
  content: 'Auto Toggling'
});
switchComponent.appendTo('#switch');

document.getElementById('start-btn')?.addEventListener('click', startAutoToggle);
document.getElementById('stop-btn')?.addEventListener('click', stopAutoToggle);
```

---

## click() Method

Simulate a click on the switch (useful for testing or programmatic activation):

```typescript
import { Switch } from '@syncfusion/ej2-buttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

let switchComponent: Switch;

function simulateClick(): void {
  switchComponent.click();
  console.log('Click simulated!');
}

switchComponent = new Switch({
  change: () => console.log('Switch was clicked'),
  content: 'Simulate Click'
});
switchComponent.appendTo('#switch');

document.getElementById('simulate-btn')?.addEventListener('click', simulateClick);
```

---

## focusIn() Method

Set focus to the Switch element programmatically:

```typescript
import { Switch } from '@syncfusion/ej2-buttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

let switchComponent: Switch;

function focusSwitch(): void {
  switchComponent.focusIn();
  console.log('Focus set to switch');
}

switchComponent = new Switch({
  content: 'Focus me'
});
switchComponent.appendTo('#switch');

document.getElementById('focus-btn')?.addEventListener('click', focusSwitch);
```

### Focus Management Example

```typescript
import { Switch } from '@syncfusion/ej2-buttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

const switches: Switch[] = [];

function createSwitches(): void {
  for (let i = 1; i <= 3; i++) {
    const sw: Switch = new Switch({
      content: `Switch ${i}`
    });
    sw.appendTo(`#switch${i}`);
    switches.push(sw);
  }
}

function focusNext(): void {
  const currentIndex = switches.findIndex(s => s.element === document.activeElement);
  if (currentIndex < switches.length - 1) {
    switches[currentIndex + 1].focusIn();
  }
}

function focusPrevious(): void {
  const currentIndex = switches.findIndex(s => s.element === document.activeElement);
  if (currentIndex > 0) {
    switches[currentIndex - 1].focusIn();
  }
}

createSwitches();

document.getElementById('next-btn')?.addEventListener('click', focusNext);
document.getElementById('prev-btn')?.addEventListener('click', focusPrevious);
```

---

## destroy() Method

Destroy the component and clean up resources:

```typescript
import { Switch } from '@syncfusion/ej2-buttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

let switchComponent: Switch;

function destroySwitch(): void {
  switchComponent.destroy();
  console.log('Switch destroyed');
}

switchComponent = new Switch({
  content: 'Destroy me'
});
switchComponent.appendTo('#switch');

document.getElementById('destroy-btn')?.addEventListener('click', destroySwitch);
```

---

## Complete Event Handling Example

Combine multiple events for comprehensive interaction:

```typescript
import { Switch, ChangeEventArgs, BeforeChangeEventArgs } from '@syncfusion/ej2-buttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

interface SwitchState {
  id: string;
  checked: boolean;
  toggleCount: number;
}

const state: SwitchState = {
  id: 'notifications',
  checked: false,
  toggleCount: 0
};

function beforeNotificationChange(args: BeforeChangeEventArgs): void {
  console.log('Attempting to change notification state...');
  // Validate business rules
  if (!isValidChangeTime()) {
    args.cancel = true;
    alert('Changes allowed only during business hours');
  }
}

function onNotificationChange(args: ChangeEventArgs): void {
  state.checked = args.checked ?? false;
  state.toggleCount++;
  console.log(`Notifications: ${state.checked ? 'ON' : 'OFF'} (toggled ${state.toggleCount} times)`);
  
  // Update UI or send to server
  updateSettings();
}

function onCreated(): void {
  console.log('Notification switch ready');
}

function isValidChangeTime(): boolean {
  const hour = new Date().getHours();
  return hour >= 9 && hour <= 17; // Business hours
}

function updateSettings(): void {
  console.log('Syncing settings to server...', state);
}

const notificationSwitch: Switch = new Switch({
  checked: state.checked,
  content: 'Enable Notifications',
  beforeChange: beforeNotificationChange,
  change: onNotificationChange,
  created: onCreated
});
notificationSwitch.appendTo('#notification-switch');
```
