# Message Display Variants

The Syncfusion EJ2 JavaScript Message component supports three display variants that control the visual appearance and styling of the message.

## Table of Contents
- [Variant Values](#variant-values)
- [Text Variant](#text-variant)
- [Outlined Variant](#outlined-variant)
- [Filled Variant](#filled-variant)
- [Combining Variant with Severity](#combining-variant-with-severity)
- [Visual Trade-offs](#visual-trade-offs)

---

## Variant Values

The `variant` property accepts the following values:

| Variant | Visual Style | Use Case |
|---------|--------------|----------|
| `Text` | Subtle background, no border (default) | Inline messages, less prominent |
| `Outlined` | Transparent background, colored border | Moderate emphasis, form validation |
| `Filled` | Solid colored background, high contrast | High emphasis, critical messages |

---

## Text Variant (Default)

Subtle background with no border. Best for inline messages that should not draw too much attention.

```typescript
import { Message } from '@syncfusion/ej2-notifications';

let msg: Message = new Message({
  content: 'Editing is restricted',
  variant: 'Text'
});
msg.appendTo('#msg');
```

**Visual Characteristics:**
- Light, subtle background color
- No visible border
- Text and icon use severity color
- Minimal visual weight

---

## Outlined Variant

Transparent background with a colored border. Provides moderate visual emphasis.

```typescript
import { Message } from '@syncfusion/ej2-notifications';

let msg: Message = new Message({
  content: 'Operation completed',
  severity: 'Success',
  variant: 'Outlined'
});
msg.appendTo('#msg');
```

**Visual Characteristics:**
- Transparent or white background
- Colored border matching severity
- Text and icon use severity color
- Medium visual weight

---

## Filled Variant

Solid colored background with high contrast. Provides strong visual emphasis for critical messages.

```typescript
import { Message } from '@syncfusion/ej2-notifications';

let msg: Message = new Message({
  content: 'Submission failed',
  severity: 'Error',
  variant: 'Filled'
});
msg.appendTo('#msg');
```

**Visual Characteristics:**
- Solid background color matching severity
- White or contrasting text color
- High visual weight
- Strong emphasis

---

## Combining Variant with Severity

Combine variant and severity to achieve the desired visual effect:

```typescript
import { Message } from '@syncfusion/ej2-notifications';

// Text + Success
let msg1: Message = new Message({
  content: 'Profile updated',
  severity: 'Success',
  variant: 'Text'
});
msg1.appendTo('#msg1');

// Outlined + Warning
let msg2: Message = new Message({
  content: 'Session expires in 5 minutes',
  severity: 'Warning',
  variant: 'Outlined'
});
msg2.appendTo('#msg2');

// Filled + Error
let msg3: Message = new Message({
  content: 'Payment processing failed',
  severity: 'Error',
  variant: 'Filled'
});
msg3.appendTo('#msg3');

// Filled + Info
let msg4: Message = new Message({
  content: 'New version available',
  severity: 'Info',
  variant: 'Filled'
});
msg4.appendTo('#msg4');
```

---

## Visual Trade-offs

| Variant | Pros | Cons | Best For |
|---------|------|------|----------|
| **Text** | Subtle, doesn't overwhelm UI | Low visibility, easy to miss | Inline tips, secondary info |
| **Outlined** | Balanced emphasis, clear boundaries | Moderate visual weight | Form validation, confirmations |
| **Filled** | High visibility, strong emphasis | Can be overwhelming if overused | Critical errors, important alerts |

---

## Choosing the Right Variant

| Scenario | Recommended Variant |
|----------|---------------------|
| Tooltip-like inline message | `Text` |
| Form field validation error | `Outlined` |
| Success confirmation | `Text` or `Outlined` |
| Critical system error | `Filled` |
| Warning before destructive action | `Outlined` or `Filled` |
| Informational banner | `Text` |
| Modal-blocking error | `Filled` |

---

## Variant + Severity Combinations Matrix

| Severity \\ Variant | Text | Outlined | Filled |
|---------------------|------|----------|--------|
| **Normal** | Subtle neutral | Neutral border | Solid neutral |
| **Success** | Subtle green | Green border | Solid green |
| **Info** | Subtle blue | Blue border | Solid blue |
| **Warning** | Subtle yellow | Yellow border | Solid yellow |
| **Error** | Subtle red | Red border | Solid red |

---

## CSS Customization

Override variant-specific styles:

```css
/* Customize filled variant */
.e-message.e-filled {
  font-weight: 600;
  padding: 12px 16px;
}

/* Customize outlined variant */
.e-message.e-outlined {
  border-width: 2px;
  background-color: transparent;
}
```

---

## API Reference

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `variant` | `string` | `'Text'` | Display variant: `Text`, `Outlined`, `Filled` |

For complete API details, see [message-api.md](./message-api.md).
