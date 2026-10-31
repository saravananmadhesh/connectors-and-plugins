# Message Toolbar & Appearance

## Table of Contents
- [Message Toolbar](#message-toolbar)
- [Toolbar Configuration](#toolbar-configuration)
- [Toolbar Items](#toolbar-items)
- [Toolbar Events](#toolbar-events)
- [Compact Mode](#compact-mode)
- [CSS Customization](#css-customization)
- [RTL Support](#rtl-support)
- [Localization](#localization)
- [Persistence](#persistence)
- [Accessibility](#accessibility)

---

## Message Toolbar

The message toolbar appears when hovering over a message, providing quick actions like Copy, Reply, Pin, and Delete.

### MessageToolbarSettingsModel Interface

```typescript
interface MessageToolbarSettingsModel {
    items: ToolbarItemModel[];    // Array of toolbar items
    width?: string | number;      // Width of toolbar
}
```

---

## Toolbar Configuration

### Enable Message Toolbar

```typescript
import { ChatUI, UserModel } from '@syncfusion/ej2-interactive-chat';

let chatUI: ChatUI = new ChatUI({
    user: currentUser,
    messageToolbarSettings: {
        items: [
            { text: 'Copy', iconCss: 'e-icons e-copy' },
            { text: 'Reply', iconCss: 'e-icons e-reply' },
            { text: 'Pin', iconCss: 'e-icons e-pin' },
            { text: 'Delete', iconCss: 'e-icons e-delete' }
        ]
    }
});
```

### Default Toolbar Items

If `items` is not specified, the default toolbar shows: Copy, Reply, Pin, Delete

```typescript
// These are equivalent (second uses defaults)
let chatUI1: ChatUI = new ChatUI({
    user: currentUser,
    messageToolbarSettings: {
        items: []  // Use defaults
    }
});

let chatUI2: ChatUI = new ChatUI({
    user: currentUser
    // messageToolbarSettings omitted - uses default behavior
});
```

### Custom Toolbar Items

```typescript
let chatUI: ChatUI = new ChatUI({
    user: currentUser,
    messageToolbarSettings: {
        items: [
            {
                text: 'Share',
                iconCss: 'e-icons e-share',
                tooltip: 'Share this message'
            },
            {
                text: 'Report',
                iconCss: 'e-icons e-flag',
                tooltip: 'Report inappropriate content',
                cssClass: 'report-btn'
            },
            {
                text: 'Translate',
                iconCss: 'e-icons e-translate',
                tooltip: 'Translate message'
            }
        ]
    }
});
```

---

## Toolbar Items

### ToolbarItemModel Properties

```typescript
interface ToolbarItemModel {
    text?: string;          // Button text
    iconCss?: string;       // Icon CSS class
    align?: ItemAlign;      // Left, Center, Right
    tooltip?: string;       // Tooltip on hover
    disabled?: boolean;     // Enable/disable
    visible?: boolean;      // Show/hide
    cssClass?: string;      // Custom CSS class
    template?: string | Function;  // Custom template
    type?: ItemType;        // Button type
    tabIndex?: number;      // Tab order
}
```

### Toolbar Item Examples

```typescript
let chatUI: ChatUI = new ChatUI({
    user: currentUser,
    messageToolbarSettings: {
        items: [
            {
                text: 'Copy',
                iconCss: 'e-icons e-copy',
                tooltip: 'Copy message text',
                cssClass: 'toolbar-copy'
            },
            {
                text: 'Save',
                iconCss: 'e-icons e-save',
                tooltip: 'Save message to collection'
            },
            {
                text: 'React',
                iconCss: 'e-icons e-emoji',
                tooltip: 'Add emoji reaction'
            },
            {
                text: 'More',
                iconCss: 'e-icons e-more-vert',
                tooltip: 'More actions'
            }
        ],
        width: '200px'
    }
});
```

---

## Toolbar Events

### itemClicked Event

Triggered when a message toolbar item is clicked.

```typescript
interface MessageToolbarItemClickedEventArgs {
    cancel: boolean;         // Cancel the action
    item: ToolbarItemModel;  // Clicked item
    message: MessageModel;   // Associated message
    event: Event;            // Native click event
    name: string;            // Event name
}
```

### Handle Toolbar Actions

```typescript
let chatUI: ChatUI = new ChatUI({
    user: currentUser,
    messageToolbarSettings: {
        items: [
            { text: 'Copy' },
            { text: 'Reply' },
            { text: 'Pin' },
            { text: 'Delete' }
        ]
    },
    itemClicked: (args: MessageToolbarItemClickedEventArgs) => {
        let message = args.message;
        
        switch(args.item.text) {
            case 'Copy':
                navigator.clipboard.writeText(message.text);
                showNotification('Copied to clipboard');
                break;
                
            case 'Reply':
                selectMessageForReply(message);
                break;
                
            case 'Pin':
                pinMessage(message);
                break;
                
            case 'Delete':
                if (confirm('Delete this message?')) {
                    deleteMessage(message.id);
                } else {
                    args.cancel = true;
                }
                break;
        }
    }
});

function showNotification(text: string) {
    // Show toast notification
    console.log(text);
}

function selectMessageForReply(message: MessageModel) {
    // Highlight message for reply
    console.log('Selected for reply:', message.text);
}

function pinMessage(message: MessageModel) {
    chatUI.updateMessage({
        ...message,
        isPinned: true
    }, message.id);
}

function deleteMessage(messageId: string) {
    chatUI.messages = chatUI.messages.filter(m => m.id !== messageId);
    chatUI.dataBind();
}
```

---

## Compact Mode

### enableCompactMode Property

Enable compact mode to align all messages to the left side.

```typescript
let chatUI: ChatUI = new ChatUI({
    user: currentUser,
    enableCompactMode: true  // All messages left-aligned
});
```

**Default:** `false` (current user messages on right, others on left)

**Use Cases:**
- Dense group conversations
- Mobile/embedded displays
- Linear conversation format

---

## CSS Customization

### Custom Styling

```typescript
let chatUI: ChatUI = new ChatUI({
    user: currentUser,
    cssClass: 'custom-chat-theme'
});
```

```css
/* Custom theme styles */
.custom-chat-theme {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.custom-chat-theme .e-message-wrapper {
    padding: 20px;
}

.custom-chat-theme .e-right .e-message {
    background-color: #667eea;
    color: white;
}

.custom-chat-theme .e-left .e-message {
    background-color: #f0f0f0;
    color: #333;
}

.custom-chat-theme .e-toolbar .e-item {
    margin: 0 4px;
}

.custom-chat-theme .e-input,
.custom-chat-theme .e-input:focus {
    border-color: #667eea;
}
```

### Message Bubble Styling

```css
.custom-chat-theme .e-right .e-message-item {
    margin-bottom: 8px;
}

.custom-chat-theme .e-message {
    border-radius: 18px;
    padding: 10px 16px;
    word-wrap: break-word;
}

.custom-chat-theme .e-left .e-message {
    border-radius: 18px 18px 18px 2px;
}

.custom-chat-theme .e-right .e-message {
    border-radius: 18px 18px 2px 18px;
}
```

### Avatar Styling

```css
.custom-chat-theme .e-avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    color: white;
}

.custom-chat-theme .e-left .e-avatar {
    background: #4caf50;
}

.custom-chat-theme .e-right .e-avatar {
    background: #2196f3;
}
```

---

## RTL Support

### enableRtl Property

Enable right-to-left layout for RTL languages.

```typescript
let chatUI: ChatUI = new ChatUI({
    user: currentUser,
    enableRtl: true  // RTL layout
});
```

**Supported RTL Languages:**
- Arabic
- Hebrew
- Persian
- Urdu

---

## Localization

### locale Property

Set the component's localization culture.

```typescript
let chatUI: ChatUI = new ChatUI({
    user: currentUser,
    locale: 'ar'  // Arabic
});
```

### Supported Locales

- `en` - English (default)
- `ar` - Arabic
- `he` - Hebrew
- `fr` - French
- `de` - German
- `es` - Spanish
- `ja` - Japanese
- `zh` - Simplified Chinese
- `zh-CN` - Simplified Chinese
- `zh-TW` - Traditional Chinese
- And many more...

### Custom Localization

```typescript
// Register custom locale strings
let customLocalization = {
    "placeholder": "Ingresa tu mensaje...",
    "copy": "Copiar",
    "reply": "Responder",
    "pin": "Fijar",
    "delete": "Eliminar"
};

// Apply custom locale (framework-specific)
// See Syncfusion documentation for exact implementation
```

---

## Persistence

### enablePersistence Property

Enable persistence to save component state between page reloads.

```typescript
let chatUI: ChatUI = new ChatUI({
    user: currentUser,
    enablePersistence: true  // Save state to localStorage
});
```

**Persisted State:**
- Messages
- User preferences
- Last viewed message position

---

## Accessibility

### ARIA Labels

Ensure proper accessibility with ARIA attributes:

```typescript
let chatUI: ChatUI = new ChatUI({
    user: currentUser,
    placeholder: 'Enter your message',
    headerText: 'Customer Support Chat'
    // Component automatically handles ARIA attributes
});
```

### Keyboard Navigation

- **Tab** - Navigate through messages and toolbar items
- **Shift+Tab** - Reverse navigation
- **Enter** - Send message
- **Shift+Enter** - New line in message
- **Escape** - Close toolbar

### Screen Reader Support

The Chat UI component provides:
- Semantic HTML markup
- ARIA live regions for new messages
- ARIA labels for buttons and controls
- Screen reader announcements for typing status

---

## Complete Example: Custom Theme

```typescript
import { ChatUI, UserModel, MessageModel } from '@syncfusion/ej2-interactive-chat';

let currentUser: UserModel = {
    id: "user1",
    user: "Sarah",
    avatarBgColor: "#2196f3"
};

let botUser: UserModel = {
    id: "bot",
    user: "Support Bot",
    avatarBgColor: "#4caf50"
};

let chatUI: ChatUI = new ChatUI({
    user: currentUser,
    
    // Appearance
    cssClass: 'premium-chat-theme',
    width: '100%',
    height: '600px',
    
    // Message toolbar
    messageToolbarSettings: {
        items: [
            { text: 'Copy', iconCss: 'e-icons e-copy' },
            { text: 'Reply', iconCss: 'e-icons e-reply' },
            { text: 'Pin', iconCss: 'e-icons e-pin' },
            { text: 'Delete', iconCss: 'e-icons e-delete' }
        ]
    },
    
    // Layout options
    enableCompactMode: false,
    enableRtl: false,
    
    // Internationalization
    locale: 'en',
    
    // Persistence
    enablePersistence: true,
    
    // Initial messages
    messages: [
        {
            author: botUser,
            text: "Hello Sarah! How can I help you today?"
        }
    ],
    
    itemClicked: (args) => {
        console.log(`Action: ${args.item.text} on message`);
    }
});

chatUI.appendTo('#chatUI');
```

```css
/* Premium theme styles */
.premium-chat-theme {
    background: #ffffff;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;
}

.premium-chat-theme .e-message {
    border-radius: 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    padding: 12px 16px;
}

.premium-chat-theme .e-right .e-message {
    background: linear-gradient(135deg, #2196f3 0%, #1976d2 100%);
    color: white;
}

.premium-chat-theme .e-left .e-message {
    background: #f5f5f5;
    color: #333;
}

.premium-chat-theme .e-toolbar-item {
    transition: all 0.2s ease;
}

.premium-chat-theme .e-toolbar-item:hover {
    background: rgba(33, 150, 243, 0.1);
    border-radius: 4px;
}
```

---

## Best Practices

1. **Maintain Consistency**: Use consistent CSS class names
2. **Mobile First**: Design responsive layouts
3. **Contrast**: Ensure sufficient color contrast for accessibility
4. **Focus Indicators**: Maintain visible focus states for keyboard navigation
5. **Internationalization**: Test with different locales
6. **Performance**: Minimize custom CSS complexity
7. **Testing**: Test with screen readers (NVDA, JAWS, VoiceOver)
