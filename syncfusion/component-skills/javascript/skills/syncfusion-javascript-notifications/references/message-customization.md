# Message Customization and Templates

The Syncfusion EJ2 JavaScript Message component supports extensive customization including content alignment, CSS classes, templates, RTL support, and persistence.

## Table of Contents
- [Content Alignment](#content-alignment)
- [Custom CSS Classes](#custom-css-classes)
- [Content Templates](#content-templates)
- [RTL Support](#rtl-support)
- [Persistence](#persistence)
- [CSS-Only Message](#css-only-message)

---

## Content Alignment

Control message text alignment using CSS classes:

| Alignment | CSS Class |
|-----------|-----------|
| Left (default) | `e-content-left` |
| Center | `e-content-center` |
| Right | `e-content-right` |

```typescript
import { Message } from '@syncfusion/ej2-notifications';

// Center-aligned
let msgCenter: Message = new Message({
  content: 'Center-aligned message',
  cssClass: 'e-content-center'
});
msgCenter.appendTo('#msg-center');

// Right-aligned
let msgRight: Message = new Message({
  content: 'Right-aligned message',
  cssClass: 'e-content-right'
});
msgRight.appendTo('#msg-right');
```

---

## Custom CSS Classes

Apply custom CSS classes for additional styling:

```typescript
import { Message } from '@syncfusion/ej2-notifications';

let msg: Message = new Message({
  content: 'Custom styled message',
  severity: 'Info',
  cssClass: 'my-custom-message'
});
msg.appendTo('#msg');
```

```css
.my-custom-message {
  background-color: #e3f2fd;
  border-left: 4px solid #2196f3;
  padding: 16px 20px;
  border-radius: 4px;
  font-size: 14px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
```

---

## Content Templates

Use the `content` property with HTML strings or functions for rich content:

### HTML String Template

```typescript
import { Message } from '@syncfusion/ej2-notifications';

let msg: Message = new Message({
  content: '<h4 style="margin: 0 0 8px 0;">Build succeeded</h4><p style="margin: 0;">All 42 tests passed.</p>',
  severity: 'Success',
  variant: 'Outlined'
});
msg.appendTo('#msg');
```

### Function Template

```typescript
import { Message } from '@syncfusion/ej2-notifications';

let msg: Message = new Message({
  content: () => {
    const div: HTMLElement = document.createElement('div');
    div.innerHTML = '<h4 style="margin: 0 0 8px 0;">Build succeeded</h4><p style="margin: 0;">All 42 tests passed.</p>';
    return div;
  },
  severity: 'Success'
});
msg.appendTo('#msg');
```

### Element Template

```typescript
import { Message } from '@syncfusion/ej2-notifications';

// Pre-create the content element
const contentDiv: HTMLElement = document.createElement('div');
contentDiv.innerHTML = '<strong>Important:</strong> Please review the terms.';

let msg: Message = new Message({
  content: contentDiv,
  severity: 'Warning'
});
msg.appendTo('#msg');
```

---

## RTL Support

Enable right-to-left layout using the `enableRtl` property:

```typescript
import { Message } from '@syncfusion/ej2-notifications';

let msg: Message = new Message({
  content: 'هذه رسالة بالعربية',
  severity: 'Info',
  enableRtl: true
});
msg.appendTo('#msg');
```

**Use Cases:**
- Arabic, Hebrew, Persian languages
- Right-to-left reading languages
- Internationalization support

---

## Persistence

Enable state persistence to retain the message state across page reloads:

```typescript
import { Message } from '@syncfusion/ej2-notifications';

let msg: Message = new Message({
  content: 'Persistent message',
  severity: 'Info',
  enablePersistence: true
});
msg.appendTo('#msg');
```

**Behavior:**
- The `visible` state is preserved in browser storage
- When the page reloads, the message restores its previous state
- Useful for dismissible messages

---

## CSS-Only Message

Create a message using only HTML and CSS (no JavaScript component):

```html
<div class="e-message e-info e-filled">
  <span class="e-msg-icon"></span>
  <span class="e-msg-content">This is a CSS-only message</span>
</div>
```

```css
.e-message {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-radius: 4px;
  font-size: 14px;
  line-height: 1.5;
  gap: 8px;
}

.e-message.e-info.e-filled {
  background-color: #2196f3;
  color: #ffffff;
}

.e-message .e-msg-icon::before {
  content: '\e718';
  font-family: 'e-icons';
  font-size: 18px;
}
```

**When to Use CSS-Only:**
- Static messages that don't need dynamic behavior
- No event handling required
- Simpler markup for server-rendered content

---

## Advanced Customization Example

```typescript
import { Message, MessageCloseEventArgs } from '@syncfusion/ej2-notifications';

let msg: Message = new Message({
  content: () => {
    const wrapper: HTMLElement = document.createElement('div');
    wrapper.style.display = 'flex';
    wrapper.style.alignItems = 'center';
    wrapper.style.justifyContent = 'space-between';
    
    const text: HTMLElement = document.createElement('span');
    text.innerHTML = '<strong>Pro tip:</strong> Use keyboard shortcuts to speed up your workflow.';
    
    const link: HTMLElement = document.createElement('a');
    link.href = '#';
    link.textContent = 'Learn more';
    link.style.color = '#1976d2';
    link.style.marginLeft = '12px';
    
    wrapper.appendChild(text);
    wrapper.appendChild(link);
    return wrapper;
  },
  severity: 'Info',
  variant: 'Outlined',
  cssClass: 'my-pro-tip',
  showIcon: true,
  showCloseIcon: true,
  enableRtl: false,
  closed: (args: MessageCloseEventArgs) => {
    console.log('Pro tip dismissed');
  }
});
msg.appendTo('#msg');
```

```css
.my-pro-tip {
  padding: 14px 18px;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}
```

---

## API Reference

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `cssClass` | `string` | `''` | Custom CSS class for additional styling |
| `content` | `string \| HTMLElement \| Function` | `''` | Message content |
| `enableRtl` | `boolean` | `false` | Enable right-to-left layout |
| `enablePersistence` | `boolean` | `false` | Enable state persistence |

For complete API details, see [message-api.md](./message-api.md).
