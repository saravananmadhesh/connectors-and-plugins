# Features and State — Syncfusion EJ2 JavaScript RadioButton

Comprehensive guide to RadioButton state management and features.

## Table of Contents
- [Checked and Unchecked States](#checked-and-unchecked-states)
- [Disabled State](#disabled-state)
- [Form Submission: Name and Value](#form-submission-name-and-value)
- [Right-to-Left (RTL) Support](#right-to-left-rtl-support)
- [Change Event](#change-event)
- [Created Event](#created-event)
- [State Persistence](#state-persistence)
- [Getting Selected Value](#getting-selected-value)
- [Radio Button Groups](#radio-button-groups)

---

## Checked and Unchecked States

The RadioButton has two states:
- **Checked** — inner circle visible; button is selected
- **Unchecked** — button appears empty; not selected

Set the initial state using the `checked` property:

```typescript
import { RadioButton } from '@syncfusion/ej2-buttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

// Pre-selected (checked)
const option1: RadioButton = new RadioButton({
  label: 'Option 1',
  name: 'size',
  checked: true
});
option1.appendTo('#option1');

// Not selected (unchecked)
const option2: RadioButton = new RadioButton({
  label: 'Option 2',
  name: 'size',
  checked: false
});
option2.appendTo('#option2');

// Also not selected
const option3: RadioButton = new RadioButton({
  label: 'Option 3',
  name: 'size'
});
option3.appendTo('#option3');
```

> **Important:** Within a `name` group, only one button can be checked at a time. If multiple are set to `checked: true`, the last one in the DOM wins.

---

## Disabled State

Use `disabled: true` to prevent user interaction. Disabled RadioButtons:
- Appear grayed out
- Cannot be clicked
- Are excluded from form submissions

```typescript
import { RadioButton } from '@syncfusion/ej2-buttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

// Enabled (default)
const enabledRadio: RadioButton = new RadioButton({
  label: 'Available Option',
  name: 'status',
  checked: true,
  disabled: false
});
enabledRadio.appendTo('#enabled');

// Disabled
const disabledRadio: RadioButton = new RadioButton({
  label: 'Unavailable Option',
  name: 'status',
  disabled: true
});
disabledRadio.appendTo('#disabled');
```

### Disable Based on Conditions

```typescript
import { RadioButton } from '@syncfusion/ej2-buttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

// Disable option 2 if certain condition is met
const isFeatureAvailable = false;

const radio1: RadioButton = new RadioButton({
  label: 'Always Available',
  name: 'feature',
  checked: true
});
radio1.appendTo('#radio1');

const radio2: RadioButton = new RadioButton({
  label: 'Conditional Option',
  name: 'feature',
  disabled: !isFeatureAvailable  // Disabled if feature not available
});
radio2.appendTo('#radio2');
```

---

## Form Submission: Name and Value

Use `name` to group radio buttons and `value` to specify form data:

```typescript
import { RadioButton } from '@syncfusion/ej2-buttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

// Create radio buttons in a group
const small: RadioButton = new RadioButton({
  label: 'Small',
  name: 'size',
  value: 'S',
  checked: true
});
small.appendTo('#small');

const medium: RadioButton = new RadioButton({
  label: 'Medium',
  name: 'size',
  value: 'M'
});
medium.appendTo('#medium');

const large: RadioButton = new RadioButton({
  label: 'Large',
  name: 'size',
  value: 'L'
});
large.appendTo('#large');

// Handle form submission
document.getElementById('size-form')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(e.target as HTMLFormElement);
  const selectedSize = formData.get('size');  // Gets 'S', 'M', or 'L'
  console.log('Selected size:', selectedSize);
});
```

**HTML:**
```html
<form id="size-form">
  <div id="small"></div>
  <div id="medium"></div>
  <div id="large"></div>
  <button type="submit">Submit</button>
</form>
```

> **Note:** Only the **checked** radio button's value is submitted. Unchecked and disabled buttons do not send values.

---

## Right-to-Left (RTL) Support

Enable RTL layout for right-to-left languages:

```typescript
import { RadioButton } from '@syncfusion/ej2-buttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

const rtlRadio: RadioButton = new RadioButton({
  label: 'خيار 1',        // Option 1 in Arabic
  name: 'rtl-group',
  enableRtl: true,
  checked: true
});
rtlRadio.appendTo('#rtl');
```

**HTML:**
```html
<div id="rtl" dir="rtl"></div>
```

---

## Change Event

The `change` event fires when the user selects a different radio button:

```typescript
import { RadioButton, ChangeEventArgs } from '@syncfusion/ej2-buttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

function onRadioChange(args: ChangeEventArgs): void {
  console.log('Selected value:', args.value);
  console.log('Is checked:', args.checked);
}

const radio1: RadioButton = new RadioButton({
  label: 'Option 1',
  name: 'choice',
  value: 'opt1',
  checked: true,
  change: onRadioChange
});
radio1.appendTo('#radio1');

const radio2: RadioButton = new RadioButton({
  label: 'Option 2',
  name: 'choice',
  value: 'opt2',
  change: onRadioChange
});
radio2.appendTo('#radio2');
```

---

## Created Event

The `created` event fires after the component is initialized:

```typescript
import { RadioButton } from '@syncfusion/ej2-buttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

function onCreated(): void {
  console.log('RadioButton initialized');
}

const radio: RadioButton = new RadioButton({
  label: 'Test',
  name: 'group',
  created: onCreated
});
radio.appendTo('#radio');
```

---

## State Persistence

Enable persistence to save the selected state across page reloads:

```typescript
import { RadioButton } from '@syncfusion/ej2-buttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

const persistedRadio: RadioButton = new RadioButton({
  label: 'Remember my choice',
  name: 'preference',
  enablePersistence: true,
  checked: false
});
persistedRadio.appendTo('#persisted');

// On page reload, the checked state is restored automatically
```

---

## Getting Selected Value

Access the selected radio button's value programmatically:

```typescript
import { RadioButton } from '@syncfusion/ej2-buttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

const radios: { [key: string]: RadioButton } = {};

// Create radio buttons
for (let i = 1; i <= 3; i++) {
  const radio: RadioButton = new RadioButton({
    label: `Option ${i}`,
    name: 'example',
    value: `opt${i}`,
    checked: i === 1
  });
  radio.appendTo(`#radio${i}`);
  radios[i] = radio;
}

// Get selected value
function getSelectedValue(): string | undefined {
  for (let i = 1; i <= 3; i++) {
    if (radios[i].checked) {
      return radios[i].value;
    }
  }
  return undefined;
}

document.getElementById('get-value-btn')?.addEventListener('click', () => {
  const selected = getSelectedValue();
  console.log('Currently selected:', selected);
});
```

---

## Radio Button Groups

Create organized radio button groups:

```typescript
import { RadioButton, ChangeEventArgs } from '@syncfusion/ej2-buttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

interface UserPreferences {
  theme: string;
  notifications: string;
}

let preferences: UserPreferences = {
  theme: 'light',
  notifications: 'all'
};

function onThemeChange(args: ChangeEventArgs): void {
  preferences.theme = (args.currentTarget as HTMLInputElement).value;
  console.log('Theme changed to:', preferences.theme);
}

function onNotificationChange(args: ChangeEventArgs): void {
  preferences.notifications = (args.currentTarget as HTMLInputElement).value;
  console.log('Notifications changed to:', preferences.notifications);
}

// Theme group
const lightTheme: RadioButton = new RadioButton({
  label: 'Light Theme',
  name: 'theme',
  value: 'light',
  checked: true,
  change: onThemeChange
});
lightTheme.appendTo('#light-theme');

const darkTheme: RadioButton = new RadioButton({
  label: 'Dark Theme',
  name: 'theme',
  value: 'dark',
  change: onThemeChange
});
darkTheme.appendTo('#dark-theme');

// Notifications group
const allNotif: RadioButton = new RadioButton({
  label: 'All Notifications',
  name: 'notifications',
  value: 'all',
  checked: true,
  change: onNotificationChange
});
allNotif.appendTo('#all-notifications');

const importantNotif: RadioButton = new RadioButton({
  label: 'Important Only',
  name: 'notifications',
  value: 'important',
  change: onNotificationChange
});
importantNotif.appendTo('#important-notifications');

const noNotif: RadioButton = new RadioButton({
  label: 'No Notifications',
  name: 'notifications',
  value: 'none',
  change: onNotificationChange
});
noNotif.appendTo('#no-notifications');
```

---

## Linked Radio Button Lists

Create dependent radio button groups:

```typescript
import { RadioButton, ChangeEventArgs } from '@syncfusion/ej2-buttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

// Country selection
const usRadio: RadioButton = new RadioButton({
  label: 'United States',
  name: 'country',
  value: 'US',
  checked: true
});
usRadio.appendTo('#us');

const caRadio: RadioButton = new RadioButton({
  label: 'Canada',
  name: 'country',
  value: 'CA'
});
caRadio.appendTo('#ca');

// State/Province selection (enabled based on country)
const nyRadio: RadioButton = new RadioButton({
  label: 'New York',
  name: 'state',
  value: 'NY',
  checked: true
});
nyRadio.appendTo('#ny');

const caStateRadio: RadioButton = new RadioButton({
  label: 'British Columbia',
  name: 'state',
  value: 'BC',
  disabled: true
});
caStateRadio.appendTo('#bc');

function onCountryChange(args: ChangeEventArgs): void {
  const selectedCountry = (args.currentTarget as HTMLInputElement).value;
  
  // Update state availability based on country
  if (selectedCountry === 'US') {
    nyRadio.disabled = false;
    caStateRadio.disabled = true;
  } else {
    nyRadio.disabled = true;
    caStateRadio.disabled = false;
  }
}

// Re-attach change event after creating
usRadio.change = onCountryChange;
caRadio.change = onCountryChange;
```
