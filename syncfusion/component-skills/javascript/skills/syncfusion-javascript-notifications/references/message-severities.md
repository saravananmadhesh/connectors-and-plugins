# Message Severity Levels

The Syncfusion EJ2 JavaScript Message component supports five severity levels that provide visual differentiation through icons and colors.

## Table of Contents
- [Severity Values](#severity-values)
- [Normal Severity](#normal-severity)
- [Success Severity](#success-severity)
- [Info Severity](#info-severity)
- [Warning Severity](#warning-severity)
- [Error Severity](#error-severity)
- [Choosing the Right Severity](#choosing-the-right-severity)

---

## Severity Values

The `severity` property accepts the following values:

| Severity | Visual Style | Use Case |
|----------|--------------|----------|
| `Normal` | No icon, neutral background | General information, default messages |
| `Success` | Green checkmark icon, success colors | Confirmation of successful operations |
| `Info` | Blue info icon, info colors | Informational messages, tips |
| `Warning` | Yellow warning icon, warning colors | Cautionary messages, potential issues |
| `Error` | Red error icon, error colors | Error messages, failed operations |

---

## Normal Severity

Default severity with no icon and neutral background styling.

```typescript
import { Message } from '@syncfusion/ej2-notifications';

let msg: Message = new Message({
  content: 'Editing is restricted',
  severity: 'Normal'
});
msg.appendTo('#msg');
```

---

## Success Severity

Displays a green checkmark icon with success color styling. Use for positive confirmations.

```typescript
import { Message } from '@syncfusion/ej2-notifications';

let msg: Message = new Message({
  content: 'Operation completed',
  severity: 'Success'
});
msg.appendTo('#msg');
```

---

## Info Severity

Displays a blue info icon with informational color styling. Use for tips and informational content.

```typescript
import { Message } from '@syncfusion/ej2-notifications';

let msg: Message = new Message({
  content: 'Read these notes',
  severity: 'Info'
});
msg.appendTo('#msg');
```

---

## Warning Severity

Displays a yellow warning icon with warning color styling. Use for cautionary messages.

```typescript
import { Message } from '@syncfusion/ej2-notifications';

let msg: Message = new Message({
  content: 'Check your connection',
  severity: 'Warning'
});
msg.appendTo('#msg');
```

---

## Error Severity

Displays a red error icon with error color styling. Use for error messages and failed operations.

```typescript
import { Message } from '@syncfusion/ej2-notifications';

let msg: Message = new Message({
  content: 'Submission failed',
  severity: 'Error'
});
msg.appendTo('#msg');
```

---

## All Severities Example

```typescript
import { Message } from '@syncfusion/ej2-notifications';

// Normal
let msgNormal: Message = new Message({
  content: 'Editing is restricted',
  severity: 'Normal'
});
msgNormal.appendTo('#msg-normal');

// Success
let msgSuccess: Message = new Message({
  content: 'Operation completed',
  severity: 'Success'
});
msgSuccess.appendTo('#msg-success');

// Info
let msgInfo: Message = new Message({
  content: 'Read these notes',
  severity: 'Info'
});
msgInfo.appendTo('#msg-info');

// Warning
let msgWarning: Message = new Message({
  content: 'Check your connection',
  severity: 'Warning'
});
msgWarning.appendTo('#msg-warning');

// Error
let msgError: Message = new Message({
  content: 'Submission failed',
  severity: 'Error'
});
msgError.appendTo('#msg-error');
```

---

## Choosing the Right Severity

| Scenario | Recommended Severity |
|----------|---------------------|
| Generic placeholder text | `Normal` |
| Successful form submission | `Success` |
| Helpful tip or hint | `Info` |
| Approaching limit or deadline | `Warning` |
| Validation error | `Error` |
| System maintenance notice | `Warning` |
| Account locked or suspended | `Error` |
| Feature update available | `Info` |
| File uploaded successfully | `Success` |

---

## Severity with CSS Customization

You can override severity-specific styles using CSS:

```css
/* Customize success message */
.e-message.e-success {
  background-color: #d4edda;
  border-color: #c3e6cb;
  color: #155724;
}

/* Customize error message */
.e-message.e-error {
  background-color: #f8d7da;
  border-color: #f5c6cb;
  color: #721c24;
}
```

---

## API Reference

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `severity` | `string` | `'Normal'` | Severity level: `Normal`, `Success`, `Info`, `Warning`, `Error` |

For complete API details, see [message-api.md](./message-api.md).
