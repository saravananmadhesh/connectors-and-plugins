# CheckBox How-To Patterns

Common patterns and solutions for the Syncfusion TypeScript CheckBox component.

## Table of Contents
- [Form Submission](#form-submission)
- [Master-Detail Checkboxes](#master-detail-checkboxes)
- [Required Field Validation](#required-field-validation)
- [Dynamic Enable/Disable](#dynamic-enabledisable)
- [Reading State from Change Event](#reading-state-from-change-event)
- [Tristate Checkbox](#tristate-checkbox)
- [Conditional Checkbox Display](#conditional-checkbox-display)
- [Group Selection](#group-selection)
- [Save State to localStorage](#save-state-to-localstorage)

---

## Form Submission

Integrate CheckBox with HTML form submission:

```typescript
import { CheckBox } from '@syncfusion/ej2-buttons';

let newsletter: CheckBox = new CheckBox({
  label: 'Subscribe to newsletter',
  name: 'newsletter',
  value: 'yes'
});
newsletter.appendTo('#newsletter');

let terms: CheckBox = new CheckBox({
  label: 'Accept terms',
  name: 'terms',
  value: 'accepted'
});
terms.appendTo('#terms');
```

**HTML:**

```html
<form id="signup-form">
  <input type="checkbox" id="newsletter" />
  <input type="checkbox" id="terms" />
  <button type="submit">Sign Up</button>
</form>

<script>
document.getElementById('signup-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(e.target as HTMLFormElement);
  console.log('Newsletter:', formData.get('newsletter'));
  console.log('Terms:', formData.get('terms'));
});
</script>
```

---

## Master-Detail Checkboxes

Implement select-all pattern with parent and child checkboxes:

```typescript
import { CheckBox, ChangeEventArgs } from '@syncfusion/ej2-buttons';

const childCheckboxes: CheckBox[] = [];

let selectAll: CheckBox = new CheckBox({
  label: 'Select All',
  change: (args: ChangeEventArgs) => {
    childCheckboxes.forEach(cb => {
      cb.checked = args.checked;
    });
  }
});
selectAll.appendTo('#select-all');

// Create child checkboxes
const items: string[] = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'];
items.forEach((item, index) => {
  let child: CheckBox = new CheckBox({
    label: item,
    name: 'fruits',
    value: item.toLowerCase(),
    change: () => updateSelectAllState()
  });
  child.appendTo(`#child-${index}`);
  childCheckboxes.push(child);
});

function updateSelectAllState(): void {
  const totalChecked: number = childCheckboxes.filter(cb => cb.checked).length;
  
  if (totalChecked === 0) {
    selectAll.checked = false;
    selectAll.indeterminate = false;
  } else if (totalChecked === childCheckboxes.length) {
    selectAll.checked = true;
    selectAll.indeterminate = false;
  } else {
    selectAll.checked = false;
    selectAll.indeterminate = true;
  }
}
```

**HTML:**

```html
<div>
  <input type="checkbox" id="select-all" />
</div>
<div>
  <input type="checkbox" id="child-0" />
</div>
<div>
  <input type="checkbox" id="child-1" />
</div>
<div>
  <input type="checkbox" id="child-2" />
</div>
<div>
  <input type="checkbox" id="child-3" />
</div>
<div>
  <input type="checkbox" id="child-4" />
</div>
```

---

## Required Field Validation

```typescript
import { CheckBox, ChangeEventArgs } from '@syncfusion/ej2-buttons';
import { Button } from '@syncfusion/ej2-buttons';

let termsCheckbox: CheckBox = new CheckBox({
  label: 'I accept the terms and conditions',
  cssClass: 'required-checkbox',
  change: (args: ChangeEventArgs) => {
    const submitBtn: Button = (document.getElementById('submit-btn') as any).ej2_instances[0];
    submitBtn.disabled = !args.checked;
  }
});
termsCheckbox.appendTo('#terms');

let submitButton: Button = new Button({
  content: 'Continue',
  disabled: true,
  cssClass: 'e-primary',
  click: () => {
    if (!termsCheckbox.checked) {
      alert('You must accept the terms');
      return;
    }
    console.log('Form submitted');
  }
});
submitButton.appendTo('#submit-btn');
```

```css
.required-checkbox.e-disabled .e-checkbox-wrapper .e-label {
  color: #999;
}
```

---

## Dynamic Enable/Disable

Enable/disable checkbox based on another field:

```typescript
import { CheckBox, ChangeEventArgs } from '@syncfusion/ej2-buttons';

let hasLicenseCheckbox: CheckBox = new CheckBox({
  label: 'I have a valid license',
  change: (args: ChangeEventArgs) => {
    featuresCheckbox.disabled = !args.checked;
  }
});
hasLicenseCheckbox.appendTo('#has-license');

let featuresCheckbox: CheckBox = new CheckBox({
  label: 'Enable premium features',
  disabled: true
});
featuresCheckbox.appendTo('#features');
```

---

## Reading State from Change Event

```typescript
import { CheckBox, ChangeEventArgs } from '@syncfusion/ej2-buttons';

let notificationsCheckbox: CheckBox = new CheckBox({
  label: 'Enable notifications',
  change: (args: ChangeEventArgs) => {
    if (args.checked) {
      console.log('Notifications enabled');
      // Request browser notification permission
      if ('Notification' in window) {
        Notification.requestPermission();
      }
    } else {
      console.log('Notifications disabled');
    }
  }
});
notificationsCheckbox.appendTo('#notifications');
```

---

## Tristate Checkbox

Create a checkbox with three states (unchecked, checked, indeterminate):

```typescript
import { CheckBox, ChangeEventArgs } from '@syncfusion/ej2-buttons';

let tristateCheckbox: CheckBox = new CheckBox({
  label: 'Tri-state',
  change: (args: ChangeEventArgs) => {
    // Cycle: Unchecked -> Checked -> Indeterminate -> Unchecked
    if (tristateCheckbox.indeterminate) {
      tristateCheckbox.indeterminate = false;
      tristateCheckbox.checked = false;
    } else if (tristateCheckbox.checked) {
      tristateCheckbox.indeterminate = true;
      tristateCheckbox.checked = false;
    } else {
      tristateCheckbox.checked = true;
      tristateCheckbox.indeterminate = false;
    }
  }
});
tristateCheckbox.appendTo('#tristate');
```

---

## Conditional Checkbox Display

Show/hide checkboxes based on conditions:

```typescript
import { CheckBox, ChangeEventArgs } from '@syncfusion/ej2-buttons';

let isAdminCheckbox: CheckBox = new CheckBox({
  label: 'Admin mode',
  change: (args: ChangeEventArgs) => {
    const adminOptions: HTMLElement = document.getElementById('admin-options')!;
    adminOptions.style.display = args.checked ? 'block' : 'none';
    
    const userOptions: HTMLElement = document.getElementById('user-options')!;
    userOptions.style.display = args.checked ? 'none' : 'block';
  }
});
isAdminCheckbox.appendTo('#is-admin');
```

```html
<div id="admin-options" style="display: none;">
  <input type="checkbox" id="admin-1" />
  <label>Admin Option 1</label>
</div>

<div id="user-options">
  <input type="checkbox" id="user-1" />
  <label>User Option 1</label>
</div>
```

---

## Group Selection

Allow only one checkbox in a group to be selected (radio-like behavior):

```typescript
import { CheckBox, ChangeEventArgs } from '@syncfusion/ej2-buttons';

const groupCheckboxes: CheckBox[] = [];

const options: string[] = ['Small', 'Medium', 'Large'];

options.forEach((size, index) => {
  let cb: CheckBox = new CheckBox({
    label: size,
    name: 'size-group',
    change: (args: ChangeEventArgs) => {
      if (args.checked) {
        groupCheckboxes.forEach(otherCb => {
          if (otherCb !== cb) {
            otherCb.checked = false;
          }
        });
      }
    }
  });
  cb.appendTo(`#size-${index}`);
  groupCheckboxes.push(cb);
});
```

---

## Save State to localStorage

Persist checkbox state across page reloads:

```typescript
import { CheckBox, ChangeEventArgs } from '@syncfusion/ej2-buttons';

const STORAGE_KEY: string = 'checkbox-preferences';

interface CheckboxPreferences {
  [key: string]: boolean;
}

// Load saved preferences
const savedPrefs: CheckboxPreferences = JSON.parse(
  localStorage.getItem(STORAGE_KEY) || '{}'
);

const preferences: { [key: string]: CheckBox } = {};

const items: string[] = ['Option 1', 'Option 2', 'Option 3'];

items.forEach((item, index) => {
  const key: string = `pref-${index}`;
  let cb: CheckBox = new CheckBox({
    label: item,
    checked: savedPrefs[key] || false,
    change: (args: ChangeEventArgs) => {
      savedPrefs[key] = args.checked;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedPrefs));
    }
  });
  cb.appendTo(`#pref-${index}`);
  preferences[key] = cb;
});
```

---

## AJAX Form Submission

Submit checkbox state via AJAX:

```typescript
import { CheckBox, ChangeEventArgs } from '@syncfusion/ej2-buttons';

let autoSaveCheckbox: CheckBox = new CheckBox({
  label: 'Enable auto-save',
  change: (args: ChangeEventArgs) => {
    fetch('/api/user/preferences', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ autoSave: args.checked })
    })
    .then(response => response.json())
    .then(data => console.log('Saved:', data))
    .catch(err => console.error('Error:', err));
  }
});
autoSaveCheckbox.appendTo('#auto-save');
```

---

## Checkbox with Custom HTML in Label

Embed interactive elements in the label:

```typescript
import { CheckBox } from '@syncfusion/ej2-buttons';

let agreeCheckbox: CheckBox = new CheckBox({
  label: 'I have read and agree to the <a href="/terms" target="_blank" onclick="event.stopPropagation();">Terms of Service</a>'
});
agreeCheckbox.appendTo('#agree');
```

> **Note:** The `event.stopPropagation()` prevents the checkbox from toggling when clicking the link.

---

## Common Use Cases

1. **Terms Acceptance** - Require users to accept terms before form submission
2. **Newsletter Subscription** - Allow users to opt-in/out of communications
3. **Multi-Select Lists** - Let users select multiple items from a list
4. **Settings Toggles** - Enable/disable features in user preferences
5. **Filter Controls** - Filter data based on selected criteria
6. **Bulk Actions** - Select multiple items for batch operations
7. **Master-Detail** - Select-all pattern with parent/child relationships
8. **Form Validation** - Require specific checkboxes for form submission

---

## API Reference

For complete API details, see [checkbox-api.md](./checkbox-api.md).
