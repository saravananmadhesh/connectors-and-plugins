# Toast Accessibility

The Syncfusion EJ2 JavaScript Toast component is fully accessible, complying with WCAG 2.2 Level AA, Section 508, and ADA standards.

## Table of Contents
- [WCAG Compliance](#wcag-compliance)
- [WAI-ARIA Attributes](#wai-aria-attributes)
- [Screen Reader Support](#screen-reader-support)
- [RTL Support](#rtl-support)
- [Keyboard Navigation](#keyboard-navigation)
- [Best Practices](#best-practices)
- [Accessibility Testing](#accessibility-testing)

---

## WCAG Compliance

The Toast component meets the following accessibility standards:

| Standard | Level | Status |
|----------|-------|--------|
| WCAG 2.2 | AA | ✅ Compliant |
| Section 508 | - | ✅ Compliant |
| ADA | - | ✅ Compliant |
| WAI-ARIA | 1.2 | ✅ Compliant |

**Key Compliance Features:**
- Proper ARIA roles and live regions
- Screen reader announcements
- Keyboard navigation
- Focus management
- Color contrast compliance
- Reduced motion support

---

## WAI-ARIA Attributes

The Toast component automatically applies appropriate ARIA attributes:

### Default ARIA Attributes

| Attribute | Value | Purpose |
|-----------|-------|---------|
| `role` | `alert` | Identifies the toast as an important message |
| `aria-live` | `assertive` | Announces immediately (for important messages) |
| `aria-atomic` | `true` | Announces entire content when changed |
| `aria-label` | Content | Provides accessible name |

### Automatic ARIA Application

```typescript
import { Toast } from '@syncfusion/ej2-notifications';

let toastObj: Toast = new Toast({
  title: 'Error',
  content: 'Submission failed',
  cssClass: 'e-toast-danger'
});
toastObj.appendTo('#toast');
toastObj.show();
// Renders as: <div role="alert" aria-live="assertive" aria-atomic="true" aria-label="Error: Submission failed"></div>
```

### Custom ARIA Labels

```typescript
import { Toast } from '@syncfusion/ej2-notifications';

let toastObj: Toast = new Toast({
  title: 'Form Error',
  content: 'Please correct the highlighted fields',
  created: () => {
    const element: HTMLElement = document.getElementById('toast')!;
    element.setAttribute('aria-label', 'Form validation error: Please correct the highlighted fields before submitting');
  }
});
toastObj.appendTo('#toast');
toastObj.show();
```

---

## Screen Reader Support

The Toast component is tested with major screen readers:

| Screen Reader | Platform | Status |
|---------------|----------|--------|
| JAWS | Windows | ✅ Supported |
| NVDA | Windows | ✅ Supported |
| VoiceOver | macOS/iOS | ✅ Supported |
| TalkBack | Android | ✅ Supported |
| ChromeVox | Chrome OS | ✅ Supported |

### Screen Reader Announcements

**Success Toast:**
> "Success: File saved successfully, alert"

**Error Toast:**
> "Error: Connection failed, alert"

**Warning Toast:**
> "Warning: Disk space low, alert"

**Info Toast:**
> "Information: New update available, alert"

---

## RTL Support

Enable right-to-left layout using the `enableRtl` property:

```typescript
import { Toast } from '@syncfusion/ej2-notifications';

let toastObj: Toast = new Toast({
  title: 'إشعار',
  content: 'تم حفظ الملف بنجاح',
  enableRtl: true,
  position: { X: 'Left', Y: 'Bottom' }  // Position adjusted for RTL
});
toastObj.appendTo('#toast');
toastObj.show();
```

**Use Cases:**
- Arabic, Hebrew, Persian languages
- Right-to-left reading languages
- Internationalization support

---

## Keyboard Navigation

The Toast component supports keyboard interaction:

| Key | Action |
|-----|--------|
| `Tab` | Move focus to the close button (if visible) |
| `Shift + Tab` | Move focus away from the toast |
| `Enter` | Activate the close button or action button |
| `Space` | Activate the close button or action button |
| `Escape` | Close the toast (when focus is within) |

### Keyboard-Accessible Example

```typescript
import { Toast, ButtonPropsModel } from '@syncfusion/ej2-notifications';

const undoButton: ButtonPropsModel = {
  model: { content: 'Undo', isPrimary: true },
  click: () => {
    console.log('Undo clicked');
    toastObj.hide();
  }
};

let toastObj: Toast = new Toast({
  title: 'Item Deleted',
  content: 'The item has been removed',
  showCloseButton: true,
  buttons: [undoButton],
  timeOut: 0  // Don't auto-dismiss
});
toastObj.appendTo('#toast');
toastObj.show();

// Programmatically focus the toast
const toastElement: HTMLElement = document.getElementById('toast')!;
toastElement.setAttribute('tabindex', '0');
toastElement.focus();
```

---

## Best Practices

### 1. Use Appropriate aria-live Level

```typescript
// ✅ Good: assertive for errors
let errorToast: Toast = new Toast({
  title: 'Error',
  content: 'Submission failed',
  cssClass: 'e-toast-danger'
  // Uses aria-live="assertive" by default
});

// ✅ Good: polite for info
let infoToast: Toast = new Toast({
  title: 'Info',
  content: 'New update available',
  cssClass: 'e-toast-info'
  // Uses aria-live="polite" by default
});
```

### 2. Provide Meaningful Content

```typescript
// ✅ Good: Descriptive content
let good: Toast = new Toast({
  title: 'File Saved',
  content: 'document.pdf has been saved successfully'
});

// ❌ Bad: Vague content
let bad: Toast = new Toast({
  title: 'Success',
  content: 'Done'
});
```

### 3. Don't Overuse Toasts

```typescript
// ✅ Good: Meaningful notifications
function notifyUser(message: string, type: string): void {
  const toastObj: Toast = new Toast({
    title: type,
    content: message,
    timeOut: 5000
  });
  toastObj.appendTo('#toast');
  toastObj.show();
}

// ❌ Bad: Too many toasts
// Don't show toasts for every minor action
```

### 4. Provide Dismissible Option for Important Messages

```typescript
// ✅ Good: Dismissible error
let dismissibleError: Toast = new Toast({
  title: 'Error',
  content: 'Connection failed',
  showCloseButton: true,
  timeOut: 0  // Don't auto-dismiss errors
});
```

### 5. Respect Reduced Motion

```typescript
import { Toast } from '@syncfusion/ej2-notifications';

const prefersReducedMotion: boolean = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let toastObj: Toast = new Toast({
  title: 'Motion-Aware',
  content: 'Animation respects user preference',
  animation: prefersReducedMotion
    ? { show: { effect: 'None' }, hide: { effect: 'None' } }
    : { show: { effect: 'FadeIn', duration: 400 }, hide: { effect: 'FadeOut', duration: 400 } }
});
```

### 6. Ensure Color Contrast

The component maintains WCAG AA color contrast ratios (4.5:1 for normal text) across all themes.

### 7. Don't Rely Solely on Color

```typescript
// ✅ Good: Uses icon + color + text
let good: Toast = new Toast({
  title: 'Error',
  content: 'Submission failed',
  cssClass: 'e-toast-danger'  // Icon + red color + text
});

// ❌ Bad: Color-only indication
let bad: Toast = new Toast({
  title: 'Error',
  content: 'Submission failed',
  cssClass: 'red-text-only'  // Only color, no icon
});
```

---

## Internationalization and RTL

The Toast component supports internationalization with proper RTL handling:

```typescript
import { Toast } from '@syncfusion/ej2-notifications';
import { L10n } from '@syncfusion/ej2-base';

// Set custom locale
L10n.load({
  'ar-AE': {
    'toast': {
      'close': 'إغلاق',
      'title': 'عنوان'
    }
  }
});

let toastObj: Toast = new Toast({
  title: 'إشعار',
  content: 'تم حفظ الملف بنجاح',
  enableRtl: true,
  locale: 'ar-AE'
});
toastObj.appendTo('#toast');
toastObj.show();
```

---

## Mobile Accessibility

The Toast component is tested on mobile devices with accessibility features:

| Feature | iOS | Android |
|---------|-----|---------|
| VoiceOver | ✅ | N/A |
| TalkBack | N/A | ✅ |
| Touch gestures | ✅ | ✅ |
| Swipe to dismiss | ✅ | ✅ |
| Reduced motion | ✅ | ✅ |

### Prevent Swipe Dismissal for Critical Toasts

```typescript
import { Toast, ToastBeforeCloseArgs } from '@syncfusion/ej2-notifications';

let toastObj: Toast = new Toast({
  title: 'Critical',
  content: 'This toast cannot be swipe-dismissed',
  beforeClose: (args: ToastBeforeCloseArgs) => {
    if (args.event && args.event.type === 'touchend') {
      args.cancel = true;
    }
  }
});
toastObj.appendTo('#toast');
toastObj.show();
```

---

## Accessibility Testing

### Manual Testing Checklist

- [ ] Screen reader announces toast content
- [ ] `role="alert"` is present
- [ ] `aria-live` is set correctly
- [ ] `aria-atomic` is set to `true`
- [ ] Close button is keyboard accessible
- [ ] Action buttons are keyboard accessible
- [ ] Color contrast meets WCAG AA standards
- [ ] Focus management is correct
- [ ] RTL layout works properly
- [ ] Reduced motion is respected
- [ ] Mobile swipe behavior is correct

### Automated Testing

```typescript
// Test with axe-core or similar tools
import { Toast } from '@syncfusion/ej2-notifications';

let toastObj: Toast = new Toast({
  title: 'Test Toast',
  content: 'Accessibility test',
  cssClass: 'e-toast-success'
});
toastObj.appendTo('#toast');
toastObj.show();

// Verify ARIA attributes
const element: HTMLElement = document.getElementById('toast')!;
console.log('Role:', element.getAttribute('role')); // Should be "alert"
console.log('ARIA-live:', element.getAttribute('aria-live')); // Should be "assertive"
console.log('ARIA-atomic:', element.getAttribute('aria-atomic')); // Should be "true"
```

---

## API Reference

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `enableRtl` | `boolean` | `false` | Enable right-to-left layout |
| `cssClass` | `string` | `''` | Custom CSS class |
| `showCloseButton` | `boolean` | `false` | Show close button |

For complete API details, see [toast-api.md](./toast-api.md).
