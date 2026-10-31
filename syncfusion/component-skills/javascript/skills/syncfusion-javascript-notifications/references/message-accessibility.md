# Message Accessibility

The Syncfusion EJ2 JavaScript Message component is fully accessible, complying with WCAG 2.2 Level AA, Section 508, and ADA standards.

## Table of Contents
- [WCAG Compliance](#wcag-compliance)
- [WAI-ARIA Attributes](#wai-aria-attributes)
- [Keyboard Navigation](#keyboard-navigation)
- [Screen Reader Support](#screen-reader-support)
- [Best Practices](#best-practices)
- [Accessibility Testing](#accessibility-testing)

---

## WCAG Compliance

The Message component meets the following accessibility standards:

| Standard | Level | Status |
|----------|-------|--------|
| WCAG 2.2 | AA | ✅ Compliant |
| Section 508 | - | ✅ Compliant |
| ADA | - | ✅ Compliant |
| WAI-ARIA | 1.2 | ✅ Compliant |

**Key Compliance Features:**
- Proper ARIA roles and attributes
- Keyboard navigation support
- Screen reader announcements
- Sufficient color contrast ratios
- Focus indicators
- Semantic HTML structure

---

## WAI-ARIA Attributes

The Message component automatically applies appropriate ARIA attributes:

### Default ARIA Attributes

| Attribute | Value | Purpose |
|-----------|-------|---------|
| `role` | `alert` (for Error/Warning) | Announces important messages |
| `role` | `status` (for Success/Info) | Announces status updates |
| `aria-live` | `assertive` or `polite` | Controls announcement timing |
| `aria-label` | Message content | Provides accessible name |

### Automatic ARIA Application

```typescript
import { Message } from '@syncfusion/ej2-notifications';

// Error messages use role="alert" and aria-live="assertive"
let errorMsg: Message = new Message({
  content: 'Submission failed',
  severity: 'Error'
});
errorMsg.appendTo('#error-msg');
// Renders as: <div role="alert" aria-live="assertive">...</div>

// Info messages use role="status" and aria-live="polite"
let infoMsg: Message = new Message({
  content: 'Profile updated',
  severity: 'Info'
});
infoMsg.appendTo('#info-msg');
// Renders as: <div role="status" aria-live="polite">...</div>
```

### Custom ARIA Labels

Add custom ARIA labels for specific context:

```typescript
import { Message } from '@syncfusion/ej2-notifications';

let msg: Message = new Message({
  content: 'Form validation error',
  severity: 'Error',
  cssClass: 'custom-error'
});
msg.appendTo('#msg');

const element: HTMLElement = document.getElementById('msg')!;
element.setAttribute('aria-label', 'Form validation error: Please correct the highlighted fields');
element.setAttribute('aria-describedby', 'error-description');
```

---

## Keyboard Navigation

The Message component supports keyboard interaction:

| Key | Action |
|-----|--------|
| `Tab` | Move focus to the close icon (if visible) |
| `Shift + Tab` | Move focus away from the message |
| `Enter` | Activate the close icon (if focused) |
| `Space` | Activate the close icon (if focused) |
| `Escape` | Close the message (when focus is within) |

### Keyboard-Accessible Example

```typescript
import { Message, MessageCloseEventArgs } from '@syncfusion/ej2-notifications';

let msg: Message = new Message({
  content: 'Dismissible warning',
  severity: 'Warning',
  showCloseIcon: true,
  closed: (args: MessageCloseEventArgs) => {
    console.log('Closed via keyboard or mouse');
  }
});
msg.appendTo('#msg');

// Programmatically focus the message
document.getElementById('msg')!.focus();
```

---

## Screen Reader Support

The Message component is tested with major screen readers:

| Screen Reader | Platform | Status |
|---------------|----------|--------|
| JAWS | Windows | ✅ Supported |
| NVDA | Windows | ✅ Supported |
| VoiceOver | macOS/iOS | ✅ Supported |
| TalkBack | Android | ✅ Supported |
| ChromeVox | Chrome OS | ✅ Supported |

### Screen Reader Announcements

**Error Message:**
> "Alert: Submission failed"

**Success Message:**
> "Status: Operation completed"

**Warning Message:**
> "Alert: Check your connection"

---

## Best Practices

### 1. Use Appropriate Severity for Context

```typescript
// ✅ Good: Error for actual errors
let errorMsg: Message = new Message({
  content: 'Invalid email address',
  severity: 'Error'
});

// ❌ Bad: Using Error for informational content
let badMsg: Message = new Message({
  content: 'Tip: You can save with Ctrl+S',
  severity: 'Error'  // Wrong severity
});
```

### 2. Provide Meaningful Content

```typescript
// ✅ Good: Descriptive content
let goodMsg: Message = new Message({
  content: 'Your password has been changed successfully',
  severity: 'Success'
});

// ❌ Bad: Vague content
let badMsg: Message = new Message({
  content: 'Done',
  severity: 'Success'
});
```

### 3. Ensure Color Contrast

The component maintains WCAG AA color contrast ratios (4.5:1 for normal text, 3:1 for large text) across all themes.

### 4. Don't Rely Solely on Color

```typescript
// ✅ Good: Uses icon + color + text
let goodMsg: Message = new Message({
  content: 'Error: Submission failed',
  severity: 'Error'  // Icon + red color + text
});

// ❌ Bad: Color-only indication
let badMsg: Message = new Message({
  content: 'Submission failed',
  cssClass: 'red-text-only'  // Only color, no icon
});
```

### 5. Make Dismissible Messages Optional

```typescript
// ✅ Good: User can dismiss non-critical messages
let dismissibleMsg: Message = new Message({
  content: 'New feature available',
  severity: 'Info',
  showCloseIcon: true
});

// ✅ Good: Critical errors are not easily dismissible
let criticalMsg: Message = new Message({
  content: 'Session expired. Please log in again.',
  severity: 'Error',
  showCloseIcon: false
});
```

---

## Accessibility Testing

### Automated Testing

```typescript
// Test with axe-core or similar tools
import { Message } from '@syncfusion/ej2-notifications';

let msg: Message = new Message({
  content: 'Test message',
  severity: 'Info'
});
msg.appendTo('#test-msg');

// Verify ARIA attributes
const element: HTMLElement = document.getElementById('test-msg')!;
console.log('Role:', element.getAttribute('role')); // Should be "status"
console.log('ARIA-live:', element.getAttribute('aria-live')); // Should be "polite"
```

### Manual Testing Checklist

- [ ] Screen reader announces message content
- [ ] Keyboard navigation works (Tab, Enter, Space, Escape)
- [ ] Close icon is keyboard accessible
- [ ] Color contrast meets WCAG AA standards
- [ ] Focus indicators are visible
- [ ] Message is announced at appropriate priority
- [ ] Severity icons are accessible (have alt text or aria-label)

---

## Internationalization and RTL

The Message component supports internationalization with proper RTL handling:

```typescript
import { Message } from '@syncfusion/ej2-notifications';
import { L10n } from '@syncfusion/ej2-base';

// Set locale
L10n.load({
  'ar-AE': {
    'message': {
      'close': 'إغلاق'
    }
  }
});

let msg: Message = new Message({
  content: 'هذه رسالة بالعربية',
  severity: 'Info',
  enableRtl: true,
  locale: 'ar-AE'
});
msg.appendTo('#msg');
```

---

## API Reference

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `enableRtl` | `boolean` | `false` | Enable right-to-left layout |
| `cssClass` | `string` | `''` | Custom CSS class |
| `showIcon` | `boolean` | `true` | Show severity icon |
| `showCloseIcon` | `boolean` | `false` | Show close icon |

For complete API details, see [message-api.md](./message-api.md).
