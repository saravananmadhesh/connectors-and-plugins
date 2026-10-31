# Button - Accessibility (TypeScript)

## Table of Contents
- [WCAG 2.2 Compliance](#wcag-22-compliance)
- [WAI-ARIA Attributes](#wai-aria-attributes)
- [Keyboard Navigation](#keyboard-navigation)
- [Screen Reader Support](#screen-reader-support)
- [Color Contrast](#color-contrast)
- [Focus Management](#focus-management)

## WCAG 2.2 Compliance

The Button component meets WCAG 2.2 Level AA standards for accessibility:

- ✅ **Perceivable:** Buttons are clearly visible with sufficient color contrast
- ✅ **Operable:** Fully keyboard accessible with clear focus indicators
- ✅ **Understandable:** Clear labels and purpose
- ✅ **Robust:** Compatible with assistive technologies

**Section 508 Compliance:** Also compliant with Section 508 accessibility standards for federal IT procurement.

## WAI-ARIA Attributes

The Button component automatically includes appropriate ARIA attributes:

```typescript
import { Button } from '@syncfusion/ej2-buttons';

// Standard button with implicit role
const button: Button = new Button({
  content: 'Save',
  cssClass: 'e-primary'
});
button.appendTo('#button');

// Button with aria-label
const iconBtn: Button = new Button({
  iconCss: 'e-icons e-save',
  cssClass: 'e-primary'
});
// Add aria-label for icon-only buttons
iconBtn.element.setAttribute('aria-label', 'Save document');
iconBtn.appendTo('#iconButton');

// Disabled button with aria-disabled
const disabledBtn: Button = new Button({
  content: 'Disabled',
  disabled: true,
  cssClass: 'e-primary'
});
disabledBtn.appendTo('#disabledButton');

// Toggle button with aria-pressed
const toggleBtn: Button = new Button({
  content: 'Bold',
  isToggle: true,
  cssClass: 'e-primary'
});
toggleBtn.element.setAttribute('aria-pressed', 'false');
toggleBtn.appendTo('#toggleButton');

toggleBtn.element.addEventListener('click', (): void => {
  const isPressed = toggleBtn.element.classList.contains('e-active');
  toggleBtn.element.setAttribute('aria-pressed', isPressed ? 'true' : 'false');
});
```

**Key ARIA Attributes:**

| Attribute | Value | Purpose |
|-----------|-------|---------|
| `role` | `button` | Identifies element as a button |
| `aria-label` | Text | Provides accessible name for icon-only buttons |
| `aria-pressed` | `true`/`false` | Indicates toggle button state |
| `aria-disabled` | `true`/`false` | Indicates disabled state |
| `aria-describedby` | ID | Links to description |

## Keyboard Navigation

Buttons support full keyboard navigation:

```typescript
import { Button } from '@syncfusion/ej2-buttons';

const button: Button = new Button({
  content: 'Click Me',
  cssClass: 'e-primary',
  click: (): void => {
    console.log('Button activated via keyboard or mouse');
  }
});
button.appendTo('#button');
```

**Keyboard Shortcuts:**

| Key | Action |
|-----|--------|
| `Tab` | Focus button |
| `Shift + Tab` | Focus previous element |
| `Enter` | Activate button |
| `Space` | Activate button |

**HTML element type matters:**
```html
<!-- Native button element (semantic HTML) -->
<button id="button">Click Me</button>

<!-- Works with any element when properly configured -->
<div id="divButton" role="button" tabindex="0">Click Me</div>
```

```typescript
import { Button } from '@syncfusion/ej2-buttons';

// Standard button element - auto accessible
const btn1: Button = new Button({ content: 'Button' });
btn1.appendTo('#button');

// Div element - ensure role and tabindex
const btn2: Button = new Button({ content: 'Div Button' });
btn2.appendTo('#divButton');
if (btn2.element.tagName !== 'BUTTON') {
  btn2.element.setAttribute('role', 'button');
  btn2.element.setAttribute('tabindex', '0');
}
```

## Screen Reader Support

Screen readers announce buttons with clear labels:

```typescript
import { Button } from '@syncfusion/ej2-buttons';

// Good: Clear text label
const clearBtn: Button = new Button({
  content: 'Delete Account',
  cssClass: 'e-danger'
});
clearBtn.appendTo('#clearButton');
// Screen reader announces: "Delete Account, button"

// Icon-only button: Add aria-label
const saveBtn: Button = new Button({
  iconCss: 'e-icons e-save',
  cssClass: 'e-primary'
});
saveBtn.element.setAttribute('aria-label', 'Save changes');
saveBtn.appendTo('#saveButton');
// Screen reader announces: "Save changes, button"

// Button with description
const complexBtn: Button = new Button({
  content: 'Reset',
  cssClass: 'e-warning'
});
complexBtn.element.setAttribute('aria-describedby', 'resetDescription');
complexBtn.appendTo('#complexButton');

// Description element
const description = document.createElement('div');
description.id = 'resetDescription';
description.style.display = 'none';
description.textContent = 'Clears all form fields and restores default values';
document.body.appendChild(description);
// Screen reader announces: "Reset, button. Clears all form fields and restores default values"
```

## Color Contrast

Ensure sufficient color contrast for visibility:

```css
/* ✅ Good contrast (4.5:1 for normal text) */
.good-contrast {
  background-color: #0066cc;  /* Blue */
  color: #ffffff;             /* White */
  /* Contrast ratio: 8.6:1 */
}

/* ✅ Good contrast (3:1 for large text) */
.large-text {
  background-color: #666666;  /* Dark gray */
  color: #ffffff;             /* White */
  font-size: 18px;
  font-weight: bold;
  /* Contrast ratio: 7:1 */
}

/* ❌ Poor contrast (2:1) - AVOID */
.poor-contrast {
  background-color: #cccccc;  /* Light gray */
  color: #999999;             /* Medium gray */
  /* Contrast ratio: 2.1:1 - FAILS accessibility standards */
}

/* ✅ Using semantic color classes (built-in contrast) */
.e-primary {
  background-color: #0066cc;
  color: #ffffff;
  /* Built-in contrast: 8.6:1 */
}

.e-danger {
  background-color: #d32f2f;
  color: #ffffff;
  /* Built-in contrast: 7.5:1 */
}
```

**Test Contrast Ratio:**
Use tools like [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) to verify minimum 4.5:1 for normal text.

## Focus Management

Proper focus indicators help keyboard users:

```typescript
import { Button } from '@syncfusion/ej2-buttons';

const button: Button = new Button({
  content: 'Save',
  cssClass: 'e-primary',
  click: (): void => {
    console.log('Button clicked');
  }
});
button.appendTo('#button');
```

**Enhanced focus styles CSS:**
```css
button:focus {
  outline: 2px solid #0066cc;
  outline-offset: 2px;
}

button:focus:not(:focus-visible) {
  outline: none;
}

button:focus-visible {
  outline: 2px solid #0066cc;
  outline-offset: 2px;
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  button:focus-visible {
    outline-color: #66b3ff;
  }
}
```

**Programmatic focus management:**
```typescript
import { Button } from '@syncfusion/ej2-buttons';

const button: Button = new Button({
  content: 'Focus Me',
  cssClass: 'e-primary'
});
button.appendTo('#button');

// Set focus programmatically
button.focusIn();

// Clear focus
button.element.blur();
```

## Accessibility Checklist

Use this checklist when implementing buttons:

- [ ] Button has clear, descriptive text label
- [ ] Icon-only buttons have `aria-label` attribute
- [ ] Disabled buttons have `aria-disabled="true"`
- [ ] Toggle buttons have `aria-pressed` attribute
- [ ] Color contrast meets WCAG AA (4.5:1)
- [ ] Button is keyboard accessible (Tab, Enter, Space)
- [ ] Focus indicator is clearly visible
- [ ] Native `<button>` element used when possible
- [ ] Non-semantic elements have `role="button"` and `tabindex="0"`
- [ ] Screen reader tested (NVDA, JAWS, VoiceOver)
- [ ] Tested with keyboard-only navigation
- [ ] RTL layout works correctly
- [ ] Sufficient touch target size (48x48px recommended)

## Testing for Accessibility

### Screen Reader Testing
```bash
# Windows - NVDA (Free)
# Mac - VoiceOver (built-in)
# Test: Announce button text, state, and description
```

### Keyboard Navigation Testing
```bash
# Tab through buttons
# Activate with Enter/Space
# Verify focus indicators visible
# Test with Shift+Tab (reverse)
```

### Contrast Testing
```bash
# Tool: WebAIM Contrast Checker
# Requirement: 4.5:1 for normal text, 3:1 for large text
```
