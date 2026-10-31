# CheckBox States

The Syncfusion TypeScript CheckBox component supports three states: unchecked, checked, and indeterminate, plus disabled and readonly modes.

## Table of Contents
- [Three States](#three-states)
- [Unchecked State](#unchecked-state)
- [Checked State](#checked-state)
- [Indeterminate State](#indeterminate-state)
- [Disabled State](#disabled-state)
- [Readonly State](#readonly-state)
- [Programmatic State Control](#programmatic-state-control)
- [Change Event](#change-event)

---

## Three States

The CheckBox component supports three visual states:

| State | Description | Visual |
|-------|-------------|--------|
| Unchecked | Default off state | Empty box |
| Checked | Selected state | Box with checkmark |
| Indeterminate | Partial selection (parent checkbox) | Box with dash |

---

## Unchecked State

The default state with no selection:

```typescript
import { CheckBox } from '@syncfusion/ej2-buttons';

let checkbox: CheckBox = new CheckBox({
  label: 'Unchecked checkbox',
  checked: false  // default
});
checkbox.appendTo('#checkbox');
```

---

## Checked State

Pre-selected or active state:

```typescript
import { CheckBox } from '@syncfusion/ej2-buttons';

let checkbox: CheckBox = new CheckBox({
  label: 'Checked checkbox',
  checked: true
});
checkbox.appendTo('#checkbox');
```

---

## Indeterminate State

The indeterminate state represents a partial selection, commonly used for parent checkboxes in hierarchical lists:

```typescript
import { CheckBox } from '@syncfusion/ej2-buttons';

let parentCheckbox: CheckBox = new CheckBox({
  label: 'Select all',
  indeterminate: true
});
parentCheckbox.appendTo('#parent-checkbox');
```

### Parent-Child Checkbox Pattern

```typescript
import { CheckBox, ChangeEventArgs } from '@syncfusion/ej2-buttons';

const child1: HTMLInputElement = document.getElementById('child1') as HTMLInputElement;
const child2: HTMLInputElement = document.getElementById('child2') as HTMLInputElement;
const child3: HTMLInputElement = document.getElementById('child3') as HTMLInputElement;

let parent: CheckBox = new CheckBox({
  label: 'Select all',
  change: (args: ChangeEventArgs) => {
    child1.checked = args.checked;
    child2.checked = args.checked;
    child3.checked = args.checked;
    // Trigger change events on children if needed
    updateParentState();
  }
});
parent.appendTo('#parent');

let child1Checkbox: CheckBox = new CheckBox({
  label: 'Option 1',
  change: () => updateParentState()
});
child1Checkbox.appendTo('#child1');

let child2Checkbox: CheckBox = new CheckBox({
  label: 'Option 2',
  change: () => updateParentState()
});
child2Checkbox.appendTo('#child2');

let child3Checkbox: CheckBox = new CheckBox({
  label: 'Option 3',
  change: () => updateParentState()
});
child3Checkbox.appendTo('#child3');

function updateParentState(): void {
  const total: number = 3;
  const checkedCount: number = 
    (child1.checked ? 1 : 0) + 
    (child2.checked ? 1 : 0) + 
    (child3.checked ? 1 : 0);
  
  if (checkedCount === 0) {
    parent.checked = false;
    parent.indeterminate = false;
  } else if (checkedCount === total) {
    parent.checked = true;
    parent.indeterminate = false;
  } else {
    parent.checked = false;
    parent.indeterminate = true;
  }
}
```

---

## Disabled State

Disable the checkbox to prevent user interaction:

```typescript
import { CheckBox } from '@syncfusion/ej2-buttons';

// Disabled unchecked
let disabledUnchecked: CheckBox = new CheckBox({
  label: 'Disabled unchecked',
  disabled: true,
  checked: false
});
disabledUnchecked.appendTo('#disabled-unchecked');

// Disabled checked
let disabledChecked: CheckBox = new CheckBox({
  label: 'Disabled checked',
  disabled: true,
  checked: true
});
disabledChecked.appendTo('#disabled-checked');

// Disabled indeterminate
let disabledIndeterminate: CheckBox = new CheckBox({
  label: 'Disabled indeterminate',
  disabled: true,
  indeterminate: true
});
disabledIndeterminate.appendTo('#disabled-indeterminate');
```

### Dynamic Disable/Enable

```typescript
import { CheckBox } from '@syncfusion/ej2-buttons';
import { Button } from '@syncfusion/ej2-buttons';

let checkbox: CheckBox = new CheckBox({
  label: 'Toggle me'
});
checkbox.appendTo('#checkbox');

let toggleBtn: Button = new Button({
  content: 'Disable',
  click: () => {
    checkbox.disabled = !checkbox.disabled;
  }
});
toggleBtn.appendTo('#toggle-btn');
```

---

## Readonly State

Make the checkbox readonly (visible but not interactive):

```typescript
import { CheckBox } from '@syncfusion/ej2-buttons';

let readonlyCheckbox: CheckBox = new CheckBox({
  label: 'Readonly checkbox',
  readonly: true,
  checked: true
});
readonlyCheckbox.appendTo('#readonly-checkbox');
```

**Difference between `disabled` and `readonly`:**
- `disabled`: Cannot be focused or interacted with, visually grayed out
- `readonly`: Cannot be modified but can be focused, visually normal

---

## Programmatic State Control

### Get Current State

```typescript
import { CheckBox } from '@syncfusion/ej2-buttons';

let checkbox: CheckBox = new CheckBox({
  label: 'Programmatic control'
});
checkbox.appendTo('#checkbox');

// Read state
function getState(): void {
  console.log('Checked:', checkbox.checked);
  console.log('Indeterminate:', checkbox.indeterminate);
  console.log('Disabled:', checkbox.disabled);
  console.log('Readonly:', checkbox.readonly);
}
```

### Set State Programmatically

```typescript
import { CheckBox } from '@syncfusion/ej2-buttons';

let checkbox: CheckBox = new CheckBox({
  label: 'Toggle state'
});
checkbox.appendTo('#checkbox');

function checkIt(): void {
  checkbox.checked = true;
}

function uncheckIt(): void {
  checkbox.checked = false;
}

function setIndeterminate(): void {
  checkbox.indeterminate = true;
}
```

### Toggle State

```typescript
import { CheckBox } from '@syncfusion/ej2-buttons';

let checkbox: CheckBox = new CheckBox({
  label: 'Toggle'
});
checkbox.appendTo('#checkbox');

function toggle(): void {
  if (checkbox.indeterminate) {
    checkbox.indeterminate = false;
    checkbox.checked = true;
  } else {
    checkbox.checked = !checkbox.checked;
  }
}
```

---

## Change Event

The `change` event fires whenever the checkbox state changes:

```typescript
import { CheckBox, ChangeEventArgs } from '@syncfusion/ej2-buttons';

let checkbox: CheckBox = new CheckBox({
  label: 'Track changes',
  change: (args: ChangeEventArgs) => {
    console.log('Previous state:', args.previousCheckState);
    console.log('Current state:', args.checked);
    console.log('Event:', args.event);
  }
});
checkbox.appendTo('#checkbox');
```

### ChangeEventArgs Interface

```typescript
interface ChangeEventArgs {
  checked: boolean;           // Current checked state
  previousCheckState: boolean; // Previous checked state
  event: Event;               // Original event
  element: HTMLElement;       // Checkbox element
}
```

### Practical Change Event Example

```typescript
import { CheckBox, ChangeEventArgs } from '@syncfusion/ej2-buttons';

let termsCheckbox: CheckBox = new CheckBox({
  label: 'I accept the terms',
  change: (args: ChangeEventArgs) => {
    const submitBtn: HTMLButtonElement = document.getElementById('submit-btn') as HTMLButtonElement;
    submitBtn.disabled = !args.checked;
    submitBtn.style.opacity = args.checked ? '1' : '0.5';
  }
});
termsCheckbox.appendTo('#terms-checkbox');
```

```html
<button id="submit-btn" disabled style="opacity: 0.5;">Submit</button>
```

---

## Form Integration

Checkboxes work seamlessly with HTML forms:

```typescript
import { CheckBox } from '@syncfusion/ej2-buttons';

let checkbox1: CheckBox = new CheckBox({ label: 'Option 1', name: 'option1', value: 'opt1' });
checkbox1.appendTo('#option1');

let checkbox2: CheckBox = new CheckBox({ label: 'Option 2', name: 'option2', value: 'opt2' });
checkbox2.appendTo('#option2');
```

```html
<form id="my-form">
  <input type="checkbox" id="option1" />
  <input type="checkbox" id="option2" />
  <button type="submit">Submit</button>
</form>

<script>
document.getElementById('my-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(e.target as HTMLFormElement);
  console.log('Option 1:', formData.get('option1'));
  console.log('Option 2:', formData.get('option2'));
});
</script>
```

---

## State Validation

```typescript
import { CheckBox } from '@syncfusion/ej2-buttons';

let requiredCheckbox: CheckBox = new CheckBox({
  label: 'I agree (required)',
  cssClass: 'required-validate'
});
requiredCheckbox.appendTo('#required-checkbox');

function validateForm(): boolean {
  if (!requiredCheckbox.checked) {
    alert('You must agree to the terms');
    return false;
  }
  return true;
}
```

---

## API Reference

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `checked` | `boolean` | `false` | Checked state |
| `indeterminate` | `boolean` | `false` | Indeterminate state |
| `disabled` | `boolean` | `false` | Disabled state |
| `readonly` | `boolean` | `false` | Readonly state |

| Event | Description |
|-------|-------------|
| `change` | Fires when checked state changes |
| `created` | Fires after component creation |
| `destroyed` | Fires after component destruction |

For complete API details, see [checkbox-api.md](./checkbox-api.md).
