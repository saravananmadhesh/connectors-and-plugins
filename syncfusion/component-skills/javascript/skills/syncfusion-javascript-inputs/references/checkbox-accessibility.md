# CheckBox Accessibility

The Syncfusion TypeScript CheckBox component is fully accessible, complying with WCAG 2.2 Level AA, Section 508, and ADA standards.

## Table of Contents
- [WCAG Compliance](#wcag-compliance)
- [WAI-ARIA Attributes](#wai-aria-attributes)
- [Keyboard Navigation](#keyboard-navigation)
- [Screen Reader Support](#screen-reader-support)
- [Label Best Practices](#label-best-practices)
- [Focus Management](#focus-management)
- [Color Contrast](#color-contrast)
- [Best Practices](#best-practices)
- [Accessibility Testing](#accessibility-testing)

---

## WCAG Compliance

The CheckBox component meets the following accessibility standards:

| Standard | Level | Status |
|----------|-------|--------|
| WCAG 2.2 | AA | ✅ Compliant |
| Section 508 | - | ✅ Compliant |
| ADA | - | ✅ Compliant |
| WAI-ARIA | 1.2 | ✅ Compliant |

**Key Compliance Features:**
- Proper ARIA roles and states
- Keyboard navigation support
- Focus management
- Screen reader announcements
- Color contrast compliance
- Touch-friendly target sizes

---

## WAI-ARIA Attributes

The CheckBox component automatically applies appropriate ARIA attributes:

### Default ARIA Attributes

| Attribute | Value | Purpose |
|-----------|-------|---------|
| `role` | `checkbox` | Identifies the element as a checkbox |
| `aria-checked` | `true` / `false` / `mixed` | Current state |
| `aria-disabled` | `true` / `false` | Disabled state |
| `aria-readonly` | `true` / `false` | Readonly state |
| `aria-label` | Label content | Accessible name |
| `aria-labelledby` | Label element ID | Associated label |

### Automatic ARIA Application

```typescript
import { CheckBox } from '@syncfusion/ej2-buttons';

let checkbox: CheckBox = new CheckBox({
  label: 'Accept terms',
  checked: false
});
checkbox.appendTo('#checkbox');
```

**Resulting HTML:**

```html
<input type="checkbox" id="checkbox" role="checkbox" aria-checked="false" />
<label for="checkbox">Accept terms</label>
```

### Custom ARIA Labels

Add custom ARIA labels for more descriptive context:

```typescript
import { CheckBox } from '@syncfusion/ej2-buttons';

let checkbox: CheckBox = new CheckBox({
  label: 'Agree',
  checked: false
});
checkbox.appendTo('#checkbox');

// Add custom ARIA label
const element: HTMLElement = document.getElementById('checkbox')!;
element.setAttribute('aria-label', 'I agree to the terms of service and privacy policy');
```

### aria-checked for Indeterminate State

The `aria-checked` attribute automatically reflects the state:

| State | aria-checked Value |
|-------|-------------------|
| Unchecked | `false` |
| Checked | `true` |
| Indeterminate | `mixed` |

```typescript
import { CheckBox } from '@syncfusion/ej2-buttons';

let checkbox: CheckBox = new CheckBox({
  label: 'Select all',
  indeterminate: true
});
checkbox.appendTo('#checkbox');
// aria-checked="mixed"
```

---

## Keyboard Navigation

The CheckBox component supports full keyboard interaction:

| Key | Action |
|-----|--------|
| `Tab` | Move focus to the checkbox |
| `Shift + Tab` | Move focus away from checkbox |
| `Space` | Toggle checked state |
| `Enter` | Toggle checked state (when focused) |

### Keyboard-Accessible Example

```typescript
import { CheckBox } from '@syncfusion/ej2-buttons';

let checkbox: CheckBox = new CheckBox({
  label: 'Keyboard accessible checkbox'
});
checkbox.appendTo('#checkbox');

// Programmatically focus the checkbox
document.getElementById('checkbox')!.focus();
```

### Keyboard Event Handling

```typescript
import { CheckBox } from '@syncfusion/ej2-buttons';

let checkbox: CheckBox = new CheckBox({
  label: 'Press space to toggle',
  change: () => {
    console.log('Toggled via keyboard or mouse');
  }
});
checkbox.appendTo('#checkbox');

document.getElementById('checkbox')!.addEventListener('keydown', (e: KeyboardEvent) => {
  if (e.key === ' ' || e.key === 'Enter') {
    e.preventDefault();
    checkbox.checked = !checkbox.checked;
  }
});
```

---

## Screen Reader Support

The CheckBox component is tested with major screen readers:

| Screen Reader | Platform | Status |
|---------------|----------|--------|
| JAWS | Windows | ✅ Supported |
| NVDA | Windows | ✅ Supported |
| VoiceOver | macOS/iOS | ✅ Supported |
| TalkBack | Android | ✅ Supported |
| ChromeVox | Chrome OS | ✅ Supported |

### Screen Reader Announcements

**Unchecked Checkbox:**
> "Accept terms, checkbox, not checked"

**Checked Checkbox:**
> "Accept terms, checkbox, checked"

**Indeterminate Checkbox:**
> "Select all, checkbox, partially checked"

**Disabled Checkbox:**
> "Agree, checkbox, not checked, dimmed"

---

## Label Best Practices

### Always Provide a Label

```typescript
// ✅ Good: Clear, descriptive label
let good: CheckBox = new CheckBox({
  label: 'I have read and agree to the Terms of Service'
});

// ❌ Bad: Vague label
let bad: CheckBox = new CheckBox({
  label: 'Agree'
});
```

### Use Positive Language

```typescript
// ✅ Good: Positive phrasing
let good: CheckBox = new CheckBox({
  label: 'Subscribe to our newsletter'
});

// ❌ Bad: Negative phrasing
let bad: CheckBox = new CheckBox({
  label: 'Do not subscribe'
});
```

### Specify Consequence in Label

```typescript
// ✅ Good: Explains what happens
let good: CheckBox = new CheckBox({
  label: 'Remember me on this device (do not use on shared computers)'
});

// ❌ Bad: No context
let bad: CheckBox = new CheckBox({
  label: 'Remember me'
});
```

---

## Focus Management

### Visible Focus Indicator

```css
/* Ensure visible focus indicator */
.e-checkbox-wrapper input:focus + .e-frame {
  outline: 2px solid #1976d2;
  outline-offset: 2px;
  box-shadow: 0 0 0 4px rgba(25, 118, 210, 0.2);
}
```

### Focus Styles for Custom Themes

```css
/* High contrast focus */
.high-contrast-focus .e-checkbox-wrapper input:focus + .e-frame {
  outline: 3px solid #000;
  outline-offset: 2px;
}

/* Subtle focus */
.subtle-focus .e-checkbox-wrapper input:focus + .e-frame {
  outline: 1px solid #1976d2;
  outline-offset: 1px;
}
```

### Programmatic Focus

```typescript
import { CheckBox } from '@syncfusion/ej2-buttons';

let checkbox: CheckBox = new CheckBox({
  label: 'Focus me'
});
checkbox.appendTo('#checkbox');

function focusCheckbox(): void {
  document.getElementById('checkbox')!.focus();
}
```

---

## Color Contrast

### WCAG AA Requirements

- **Normal text (label):** 4.5:1 contrast ratio
- **Large text (18pt+):** 3:1 contrast ratio
- **UI components:** 3:1 contrast ratio

### Ensuring Proper Contrast

```css
/* High contrast label */
.high-contrast .e-checkbox-wrapper .e-label {
  color: #000000; /* Pure black on white = 21:1 ratio */
}

/* Standard contrast */
.standard-contrast .e-checkbox-wrapper .e-label {
  color: #212121; /* Near black on white = 16.1:1 ratio */
}

/* Minimum AA compliance */
.aa-compliant .e-checkbox-wrapper .e-label {
  color: #595959; /* 7:1 ratio on white */
}
```

### Custom Color with Contrast Check

```css
/* Custom color with sufficient contrast */
.custom-color .e-checkbox-wrapper .e-frame.e-check {
  background-color: #1976d2; /* 4.5:1 on white */
  border-color: #1976d2;
}

.custom-color .e-checkbox-wrapper .e-label {
  color: #212121; /* 16:1 on white */
}
```

---

## Best Practices

### 1. Don't Hide Critical Information in Checkboxes

```typescript
// ✅ Good: Tooltip is supplementary
let good: CheckBox = new CheckBox({
  label: 'Save my preferences'
});

// ❌ Bad: Critical info only in tooltip
let bad: CheckBox = new CheckBox({
  label: 'Click here'
  // Critical: "You must click this to save your work"
});
```

### 2. Group Related Checkboxes

```html
<!-- Use fieldset and legend for groups -->
<fieldset>
  <legend>Notification Preferences</legend>
  <input type="checkbox" id="email-notif" />
  <label for="email-notif">Email notifications</label>
  
  <input type="checkbox" id="sms-notif" />
  <label for="sms-notif">SMS notifications</label>
</fieldset>
```

### 3. Provide Clear Error Messages

```typescript
import { CheckBox, ChangeEventArgs } from '@syncfusion/ej2-buttons';

let requiredCheckbox: CheckBox = new CheckBox({
  label: 'I accept the terms (required)',
  change: (args: ChangeEventArgs) => {
    const errorMsg: HTMLElement = document.getElementById('error-msg')!;
    if (args.checked) {
      errorMsg.style.display = 'none';
      errorMsg.setAttribute('aria-live', 'polite');
    }
  }
});
requiredCheckbox.appendTo('#terms');
```

```html
<div id="error-msg" role="alert" style="display: none; color: #d32f2f;">
  You must accept the terms to continue
</div>
```

### 4. Ensure Touch-Friendly Size

```css
/* Minimum 44x44px touch target */
.touch-friendly .e-checkbox-wrapper .e-frame {
  min-width: 24px;
  min-height: 24px;
}

.touch-friendly .e-checkbox-wrapper {
  padding: 10px;
}
```

### 5. Test with Real Assistive Technology

Always test your implementation with:
- Screen readers (NVDA, JAWS, VoiceOver)
- Keyboard-only navigation
- High contrast mode
- Screen magnification

---

## Internationalization and RTL

The CheckBox component supports internationalization with proper RTL handling:

```typescript
import { CheckBox } from '@syncfusion/ej2-buttons';
import { L10n } from '@syncfusion/ej2-base';

// Set custom locale
L10n.load({
  'ar-AE': {
    'checkbox': {
      'checked': 'محدد',
      'unchecked': 'غير محدد'
    }
  }
});

let checkbox: CheckBox = new CheckBox({
  label: 'موافقة',
  enableRtl: true,
  locale: 'ar-AE'
});
checkbox.appendTo('#checkbox');
```

---

## Mobile Accessibility

The CheckBox component is tested on mobile devices:

| Feature | iOS | Android |
|---------|-----|---------|
| VoiceOver | ✅ | N/A |
| TalkBack | N/A | ✅ |
| Touch gestures | ✅ | ✅ |
| Voice control | ✅ | ✅ |

---

## Accessibility Testing

### Manual Testing Checklist

- [ ] Screen reader announces checkbox state correctly
- [ ] `role="checkbox"` is present
- [ ] `aria-checked` reflects current state
- [ ] Keyboard navigation works (Tab, Space, Enter)
- [ ] Focus indicator is visible
- [ ] Color contrast meets WCAG AA
- [ ] Touch target is at least 44x44px
- [ ] RTL layout works properly
- [ ] Disabled state is announced
- [ ] Indeterminate state is announced

### Automated Testing

```typescript
// Test with axe-core or similar tools
import { CheckBox } from '@syncfusion/ej2-buttons';

let checkbox: CheckBox = new CheckBox({
  label: 'Test checkbox',
  checked: false
});
checkbox.appendTo('#test-checkbox');

// Verify ARIA attributes
const input: HTMLInputElement = document.getElementById('test-checkbox') as HTMLInputElement;
console.log('Role:', input.getAttribute('role')); // Should be "checkbox"
console.log('ARIA-checked:', input.getAttribute('aria-checked')); // Should be "false"

// Test state changes
checkbox.checked = true;
console.log('ARIA-checked after check:', input.getAttribute('aria-checked')); // Should be "true"

checkbox.indeterminate = true;
console.log('ARIA-checked after indeterminate:', input.getAttribute('aria-checked')); // Should be "mixed"
```

---

## API Reference

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `enableRtl` | `boolean` | `false` | Enable right-to-left layout |
| `cssClass` | `string` | `''` | Custom CSS class |
| `label` | `string \| HTMLElement` | `''` | Checkbox label |

For complete API details, see [checkbox-api.md](./checkbox-api.md).
