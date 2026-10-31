# Message Icons and Close Icon

The Syncfusion EJ2 JavaScript Message component supports severity icons and a close icon for user dismissal.

## Table of Contents
- [Severity Icon Visibility](#severity-icon-visibility)
- [Disabling Severity Icons](#disabling-severity-icons)
- [Custom Severity Icons](#custom-severity-icons)
- [Close Icon](#close-icon)
- [Closed Event Handler](#closed-event-handler)
- [Toggling Visibility](#toggling-visibility)

---

## Severity Icon Visibility

The `showIcon` property controls the visibility of the severity icon. By default, the icon is displayed.

```typescript
import { Message } from '@syncfusion/ej2-notifications';

let msg: Message = new Message({
  content: 'Operation completed',
  severity: 'Success',
  showIcon: true  // default
});
msg.appendTo('#msg');
```

**Default Behavior:** Icons are shown automatically based on severity:
- `Normal` - No icon
- `Success` - Checkmark icon
- `Info` - Info icon
- `Warning` - Warning icon
- `Error` - Error icon

---

## Disabling Severity Icons

Set `showIcon: false` to hide the severity icon:

```typescript
import { Message } from '@syncfusion/ej2-notifications';

let msg: Message = new Message({
  content: 'Operation completed',
  severity: 'Success',
  showIcon: false
});
msg.appendTo('#msg');
```

**Use Cases:**
- Minimal design preferences
- Space-constrained layouts
- When icon is conveyed through other means (color, text)

---

## Custom Severity Icons

Override the default severity icons using CSS classes:

```typescript
import { Message } from '@syncfusion/ej2-notifications';

let msg: Message = new Message({
  content: 'Custom success message',
  severity: 'Success',
  cssClass: 'custom-success-msg'
});
msg.appendTo('#msg');
```

```css
/* Custom success icon */
.custom-success-msg .e-msg-icon::before {
  content: '\e730'; /* Custom icon code */
  font-family: 'e-icons';
  color: #28a745;
}

/* Custom error icon */
.custom-error-msg .e-msg-icon::before {
  content: '\e7c2';
  font-family: 'e-icons';
  color: #dc3545;
}
```

---

## Close Icon

The `showCloseIcon` property controls the visibility of the close (X) icon. By default, the close icon is hidden.

```typescript
import { Message } from '@syncfusion/ej2-notifications';

let msg: Message = new Message({
  content: 'Your session will expire soon',
  severity: 'Warning',
  showCloseIcon: true
});
msg.appendTo('#msg');
```

**Default:** `showCloseIcon: false`

---

## Closed Event Handler

Use the `closed` event to execute logic when the user dismisses the message via the close icon:

```typescript
import { Message, MessageCloseEventArgs } from '@syncfusion/ej2-notifications';

let msg: Message = new Message({
  content: 'Your session will expire soon',
  severity: 'Warning',
  showCloseIcon: true,
  closed: (args: MessageCloseEventArgs) => {
    console.log('Message closed by user');
    // Update state, hide parent container, etc.
  }
});
msg.appendTo('#msg');
```

**Common Use Cases:**
- Update application state
- Log user actions
- Trigger cleanup logic
- Persist dismissal preference

---

## Dismissible Message with State Management

Example combining close icon with state tracking:

```typescript
import { Message } from '@syncfusion/ej2-notifications';

let isVisible: boolean = true;

let msg: Message = new Message({
  content: 'Your session will expire soon',
  severity: 'Warning',
  showCloseIcon: true,
  closed: () => {
    isVisible = false;
    console.log('Message dismissed, isVisible:', isVisible);
  }
});
msg.appendTo('#msg');

// Later, you can check isVisible to know if the message was dismissed
```

---

## Toggling Visibility

The `visible` property controls whether the message is displayed. Use it to programmatically show/hide messages.

```typescript
import { Message } from '@syncfusion/ej2-notifications';

let msg: Message = new Message({
  content: 'Conditional message',
  severity: 'Info',
  visible: false  // Initially hidden
});
msg.appendTo('#msg');

// Show the message programmatically
msg.show();

// Hide the message programmatically
msg.hide();
```

---

## Close Icon with Custom Styling

```css
/* Customize close icon */
.e-message .e-close-icon {
  color: #6c757d;
  font-size: 18px;
  cursor: pointer;
  opacity: 0.7;
}

.e-message .e-close-icon:hover {
  opacity: 1;
  color: #dc3545;
}
```

---

## Complete Example: Dismissible Warning Message

```typescript
import { Message, MessageCloseEventArgs } from '@syncfusion/ej2-notifications';

let msg: Message = new Message({
  content: 'Your session will expire in 5 minutes. Save your work.',
  severity: 'Warning',
  variant: 'Outlined',
  showIcon: true,
  showCloseIcon: true,
  closed: (args: MessageCloseEventArgs) => {
    console.log('Warning dismissed by user');
    // Optionally log to analytics
  }
});
msg.appendTo('#warning-msg');
```

```html
<div id="warning-msg"></div>
```

---

## API Reference

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `showIcon` | `boolean` | `true` | Shows or hides the severity icon |
| `showCloseIcon` | `boolean` | `false` | Shows or hides the close icon |
| `visible` | `boolean` | `true` | Controls the visibility of the message |

| Event | Description |
|-------|-------------|
| `closed` | Triggered when the message is closed via the close icon |
| `created` | Triggered after the component is created |
| `destroyed` | Triggered after the component is destroyed |

| Method | Description |
|--------|-------------|
| `show()` | Shows the message if hidden |
| `hide()` | Hides the message |
| `destroy()` | Destroys the component instance |

For complete API details, see [message-api.md](./message-api.md).
