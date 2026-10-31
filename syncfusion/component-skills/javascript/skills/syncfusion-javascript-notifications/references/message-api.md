# Message API Reference

Complete API reference for the Syncfusion EJ2 JavaScript Message component.

## Table of Contents
- [Properties](#properties)
- [Methods](#methods)
- [Events](#events)
- [Interfaces](#interfaces)
- [Enumerations](#enumerations)
- [Type Definitions](#type-definitions)

---

## Properties

### content

Gets or sets the content of the message.

| | |
|---|---|
| **Type** | `string \| HTMLElement \| Function` |
| **Default** | `''` |

```typescript
let msg: Message = new Message({
  content: 'Your message text'
});
```

### severity

Gets or sets the severity level of the message.

| | |
|---|---|
| **Type** | `string` |
| **Default** | `'Normal'` |
| **Values** | `'Normal' \| 'Success' \| 'Info' \| 'Warning' \| 'Error'` |

```typescript
let msg: Message = new Message({
  content: 'Error occurred',
  severity: 'Error'
});
```

### variant

Gets or sets the display variant of the message.

| | |
|---|---|
| **Type** | `string` |
| **Default** | `'Text'` |
| **Values** | `'Text' \| 'Outlined' \| 'Filled'` |

```typescript
let msg: Message = new Message({
  content: 'Success message',
  variant: 'Filled'
});
```

### showIcon

Gets or sets whether to display the severity icon.

| | |
|---|---|
| **Type** | `boolean` |
| **Default** | `true` |

```typescript
let msg: Message = new Message({
  content: 'Message without icon',
  showIcon: false
});
```

### showCloseIcon

Gets or sets whether to display the close icon.

| | |
|---|---|
| **Type** | `boolean` |
| **Default** | `false` |

```typescript
let msg: Message = new Message({
  content: 'Dismissible message',
  showCloseIcon: true
});
```

### cssClass

Gets or sets custom CSS classes for additional styling.

| | |
|---|---|
| **Type** | `string` |
| **Default** | `''` |

```typescript
let msg: Message = new Message({
  content: 'Custom styled message',
  cssClass: 'my-custom-class'
});
```

### visible

Gets or sets whether the message is visible.

| | |
|---|---|
| **Type** | `boolean` |
| **Default** | `true` |

```typescript
let msg: Message = new Message({
  content: 'Toggleable message',
  visible: false
});
```

### enableRtl

Gets or sets whether to enable right-to-left layout.

| | |
|---|---|
| **Type** | `boolean` |
| **Default** | `false` |

```typescript
let msg: Message = new Message({
  content: 'RTL message',
  enableRtl: true
});
```

### enablePersistence

Gets or sets whether to enable state persistence.

| | |
|---|---|
| **Type** | `boolean` |
| **Default** | `false` |

```typescript
let msg: Message = new Message({
  content: 'Persistent message',
  enablePersistence: true
});
```

### locale

Gets or sets the locale for internationalization.

| | |
|---|---|
| **Type** | `string` |
| **Default** | `'en-US'` |

```typescript
let msg: Message = new Message({
  content: 'Localized message',
  locale: 'fr-FR'
});
```

---

## Methods

### show()

Shows the message if it is hidden.

| | |
|---|---|
| **Returns** | `void` |

```typescript
let msg: Message = new Message({
  content: 'Toggle message',
  visible: false
});
msg.appendTo('#msg');

msg.show(); // Message becomes visible
```

### hide()

Hides the message.

| | |
|---|---|
| **Returns** | `void` |

```typescript
let msg: Message = new Message({
  content: 'Toggle message'
});
msg.appendTo('#msg');

msg.hide(); // Message is hidden
```

### destroy()

Destroys the message component and removes it from the DOM.

| | |
|---|---|
| **Returns** | `void` |

```typescript
let msg: Message = new Message({
  content: 'Temporary message'
});
msg.appendTo('#msg');

msg.destroy(); // Component is removed
```

### getPersistData()

Gets the persist data for the message component.

| | |
|---|---|
| **Returns** | `string` |

```typescript
let msg: Message = new Message({
  content: 'Persistent message',
  enablePersistence: true
});
msg.appendTo('#msg');

const persistData: string = msg.getPersistData();
console.log(persistData);
```

---

## Events

### closed

Triggered when the message is closed via the close icon.

| | |
|---|---|
| **Event Args** | `MessageCloseEventArgs` |

```typescript
let msg: Message = new Message({
  content: 'Dismissible message',
  showCloseIcon: true,
  closed: (args: MessageCloseEventArgs) => {
    console.log('Message closed');
    console.log('Event:', args.event);
  }
});
```

### created

Triggered after the component is created and rendered.

| | |
|---|---|
| **Event Args** | `void` |

```typescript
let msg: Message = new Message({
  content: 'Message',
  created: () => {
    console.log('Message component created');
  }
});
```

### destroyed

Triggered after the component is destroyed.

| | |
|---|---|
| **Event Args** | `void` |

```typescript
let msg: Message = new Message({
  content: 'Message',
  destroyed: () => {
    console.log('Message component destroyed');
  }
});
```

---

## Interfaces

### MessageCloseEventArgs

Defines the event arguments for the `closed` event.

| Property | Type | Description |
|----------|------|-------------|
| `event` | `Event` | The original close event |
| `cancel` | `boolean` | Indicates if the close action was cancelled |

```typescript
interface MessageCloseEventArgs {
  event: Event;
  cancel: boolean;
}
```

---

## Enumerations

### Severity

Defines the severity levels for the message.

| Value | Description |
|-------|-------------|
| `Normal` | Default severity, no icon |
| `Success` | Success message with checkmark icon |
| `Info` | Informational message with info icon |
| `Warning` | Warning message with warning icon |
| `Error` | Error message with error icon |

```typescript
import { Message } from '@syncfusion/ej2-notifications';

// Access enum values (if exported)
const severity: string = 'Success';
```

### Variant

Defines the display variants for the message.

| Value | Description |
|-------|-------------|
| `Text` | Subtle background, no border |
| `Outlined` | Transparent background, colored border |
| `Filled` | Solid colored background, high contrast |

---

## Type Definitions

### MessageContent

```typescript
type MessageContent = string | HTMLElement | (() => HTMLElement | string);
```

### MessageModel

```typescript
interface MessageModel {
  content?: string | HTMLElement | Function;
  severity?: 'Normal' | 'Success' | 'Info' | 'Warning' | 'Error';
  variant?: 'Text' | 'Outlined' | 'Filled';
  showIcon?: boolean;
  showCloseIcon?: boolean;
  cssClass?: string;
  visible?: boolean;
  enableRtl?: boolean;
  enablePersistence?: boolean;
  locale?: string;
  closed?: (args: MessageCloseEventArgs) => void;
  created?: () => void;
  destroyed?: () => void;
}
```

---

## Complete Example

```typescript
import { Message, MessageCloseEventArgs } from '@syncfusion/ej2-notifications';

let msg: Message = new Message({
  content: 'Complete example message',
  severity: 'Info',
  variant: 'Outlined',
  showIcon: true,
  showCloseIcon: true,
  cssClass: 'my-custom-message',
  visible: true,
  enableRtl: false,
  enablePersistence: true,
  closed: (args: MessageCloseEventArgs) => {
    console.log('Message closed');
  },
  created: () => {
    console.log('Message created');
  }
});
msg.appendTo('#msg');

// Programmatic control
// msg.show();
// msg.hide();
// msg.destroy();
```

---

## See Also

- [message-getting-started.md](./message-getting-started.md) - Setup and installation
- [message-severities.md](./message-severities.md) - Severity levels
- [message-variants.md](./message-variants.md) - Display variants
- [message-icons-and-close.md](./message-icons-and-close.md) - Icons and close button
- [message-customization.md](./message-customization.md) - Customization and templates
- [message-accessibility.md](./message-accessibility.md) - Accessibility guidelines
