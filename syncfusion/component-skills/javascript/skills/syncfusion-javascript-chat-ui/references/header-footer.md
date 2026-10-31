# Header & Footer Configuration

## Table of Contents
- [Header Overview](#header-overview)
- [Show/Hide Header](#showhide-header)
- [Header Text](#header-text)
- [Header Icon](#header-icon)
- [Header Toolbar](#header-toolbar)
- [Toolbar Items Configuration](#toolbar-items-configuration)
- [Toolbar Item Click Event](#toolbar-item-click-event)
- [Footer Overview](#footer-overview)
- [Show/Hide Footer](#showhide-footer)
- [Placeholder Text](#placeholder-text)
- [Footer Template](#footer-template)

---

## Header Overview

The Chat UI header displays conversation context (participant name or group name) and optional toolbar actions. It can be customized with text, icons, and toolbar items.

---

## Show/Hide Header

Use the `showHeader` property to control header visibility.

```typescript
import { ChatUI, UserModel } from '@syncfusion/ej2-interactive-chat';

let chatUI: ChatUI = new ChatUI({
    user: currentUser,
    showHeader: false  // Hide header
});
```

**Default:** `true` (header is shown)

---

## Header Text

The `headerText` property displays the conversation participant's name or group name.

```typescript
let chatUI: ChatUI = new ChatUI({
    user: currentUser,
    headerText: 'Michale Suyama'  // Display participant name
});
```

**Common Use Cases:**
- One-on-one chat: Display other participant's name
- Group chat: Display group name
- Bot chat: Display bot/assistant name
- Support chat: Display agent name or "Customer Support"

```typescript
// Example: Customer support chat
let chatUI: ChatUI = new ChatUI({
    user: customer,
    headerText: 'Customer Support - Agent Sarah'
});
```

---

## Header Icon

Use `headerIconCss` to add an icon to the header.

```typescript
let chatUI: ChatUI = new ChatUI({
    user: currentUser,
    headerText: 'Team Chat',
    headerIconCss: 'e-icons e-people'  // Group icon
});
```

**Built-in Syncfusion Icons:**
- `e-icons e-people` - Group/team icon
- `e-icons e-user` - Single user icon
- `e-icons e-comment` - Chat bubble icon
- `e-icons e-settings` - Settings icon
- `e-icons e-info` - Information icon

**Custom Icons:**

```typescript
let chatUI: ChatUI = new ChatUI({
    user: currentUser,
    headerIconCss: 'custom-bot-icon'  // Your custom CSS class
});
```

```css
.custom-bot-icon::before {
    content: '🤖';
    font-size: 20px;
}
```

---

## Header Toolbar

Add action buttons to the header using `headerToolbar` property.

### ToolbarSettingsModel Interface

```typescript
interface ToolbarSettingsModel {
    items: ToolbarItemModel[];  // Array of toolbar items
}
```

### Basic Toolbar Example

```typescript
import { ChatUI, UserModel } from '@syncfusion/ej2-interactive-chat';

let chatUI: ChatUI = new ChatUI({
    user: currentUser,
    headerText: 'Michale Suyama',
    headerToolbar: {
        items: [
            { text: 'Video Call', iconCss: 'e-icons e-video' },
            { text: 'Audio Call', iconCss: 'e-icons e-phone' },
            { text: 'More', iconCss: 'e-icons e-more-vert' }
        ]
    }
});
```

---

## Toolbar Items Configuration

### ToolbarItemModel Interface

```typescript
interface ToolbarItemModel {
    text?: string;          // Button text
    iconCss?: string;       // Icon CSS class
    align?: ItemAlign;      // Left, Center, Right
    tooltip?: string;       // Tooltip text
    disabled?: boolean;     // Enable/disable button
    visible?: boolean;      // Show/hide button
    cssClass?: string;      // Custom CSS class
    template?: string | Function;  // Custom template
    type?: ItemType;        // Button type
    tabIndex?: number;      // Tab order
}
```

### Comprehensive Toolbar Example

```typescript
let chatUI: ChatUI = new ChatUI({
    user: currentUser,
    headerText: 'Support Chat',
    headerToolbar: {
        items: [
            {
                text: 'Call',
                iconCss: 'e-icons e-phone',
                align: 'Left',
                tooltip: 'Start voice call',
                cssClass: 'call-button'
            },
            {
                text: 'Video',
                iconCss: 'e-icons e-video',
                align: 'Left',
                tooltip: 'Start video call'
            },
            {
                text: 'Info',
                iconCss: 'e-icons e-info',
                align: 'Right',
                tooltip: 'Conversation details'
            },
            {
                text: 'Settings',
                iconCss: 'e-icons e-settings',
                align: 'Right',
                tooltip: 'Chat settings',
                disabled: false
            }
        ]
    }
});
```

### Toolbar Alignment Options

- **Left** - Aligns items to the left side of the header
- **Center** - Centers items in the header
- **Right** - Aligns items to the right side of the header

```typescript
headerToolbar: {
    items: [
        { text: 'Back', iconCss: 'e-icons e-arrow-left', align: 'Left' },
        { text: 'Group Name', align: 'Center' },
        { text: 'Menu', iconCss: 'e-icons e-menu', align: 'Right' }
    ]
}
```

---

## Toolbar Item Click Event

Handle toolbar button clicks with the `itemClicked` event.

### ToolbarItemClickedEventArgs Interface

```typescript
interface ToolbarItemClickedEventArgs {
    cancel: boolean;            // Cancel the action
    dataIndex: number;          // Message data index (N/A for header toolbar)
    event: Event;               // Native event object
    item: ToolbarItemModel;     // Clicked toolbar item
    name: string;               // Event name
}
```

### Handle Toolbar Clicks

```typescript
import { ChatUI, ToolbarItemClickedEventArgs } from '@syncfusion/ej2-interactive-chat';

let chatUI: ChatUI = new ChatUI({
    user: currentUser,
    headerText: 'Michale Suyama',
    headerToolbar: {
        items: [
            { text: 'Call', iconCss: 'e-icons e-phone' },
            { text: 'Video', iconCss: 'e-icons e-video' },
            { text: 'Info', iconCss: 'e-icons e-info' }
        ]
    },
    itemClicked: (args: ToolbarItemClickedEventArgs) => {
        console.log('Toolbar item clicked:', args.item.text);
        
        switch(args.item.text) {
            case 'Call':
                startVoiceCall();
                break;
            case 'Video':
                startVideoCall();
                break;
            case 'Info':
                showConversationInfo();
                break;
        }
    }
});

function startVoiceCall() {
    console.log('Starting voice call...');
    // Implement call logic
}

function startVideoCall() {
    console.log('Starting video call...');
    // Implement video logic
}

function showConversationInfo() {
    console.log('Showing conversation details...');
    // Show info dialog
}
```

### Cancel Toolbar Action

```typescript
itemClicked: (args: ToolbarItemClickedEventArgs) => {
    if (args.item.text === 'Delete') {
        let confirmed = confirm('Are you sure you want to delete?');
        if (!confirmed) {
            args.cancel = true;  // Cancel the action
        }
    }
}
```

---

## Footer Overview

The footer contains the message input area, send button, and optional attachment button. It can be customized or hidden entirely.

---

## Show/Hide Footer

Use the `showFooter` property to control footer visibility.

```typescript
let chatUI: ChatUI = new ChatUI({
    user: currentUser,
    showFooter: false  // Hide footer (read-only mode)
});
```

**Default:** `true` (footer is shown)

**Use Cases for Hidden Footer:**
- Read-only chat view
- Archived conversations
- Chat history display
- Announcement/broadcast messages

---

## Placeholder Text

Customize the input field placeholder using the `placeholder` property.

```typescript
let chatUI: ChatUI = new ChatUI({
    user: currentUser,
    placeholder: 'Type your message here...'
});
```

**Default:** `"Type your message…"`

**Examples:**

```typescript
// Customer support
placeholder: 'Describe your issue...'

// AI assistant
placeholder: 'Ask me anything...'

// Team chat
placeholder: 'Message the team...'

// Feedback form
placeholder: 'Share your feedback...'
```

---

## Footer Template

Use `footerTemplate` to completely customize the footer layout.

### Simple Template Example

```typescript
let chatUI: ChatUI = new ChatUI({
    user: currentUser,
    footerTemplate: `
        <div class="custom-footer">
            <button id="customSend">Send Message</button>
            <span class="footer-info">Press Enter to send</span>
        </div>
    `
});
```

### Template with Function

```typescript
let chatUI: ChatUI = new ChatUI({
    user: currentUser,
    footerTemplate: function() {
        return `
            <div class="enhanced-footer">
                <textarea id="customInput" placeholder="Type here..."></textarea>
                <div class="footer-actions">
                    <button class="attach-btn">📎</button>
                    <button class="emoji-btn">😊</button>
                    <button class="send-btn">Send</button>
                </div>
            </div>
        `;
    }
});
```

### Custom Footer with Event Handlers

```typescript
let footerTemplate = `
    <div class="custom-footer-layout">
        <button id="voiceBtn" class="footer-btn">🎤</button>
        <input type="text" id="customMsgInput" placeholder="Type a message" />
        <button id="sendBtn" class="footer-btn send">➤</button>
    </div>
`;

let chatUI: ChatUI = new ChatUI({
    user: currentUser,
    footerTemplate: footerTemplate,
    created: () => {
        // Attach event handlers after component creation
        document.getElementById('sendBtn').onclick = () => {
            let input = document.getElementById('customMsgInput') as HTMLInputElement;
            if (input.value.trim()) {
                chatUI.addMessage(input.value);
                input.value = '';
            }
        };
        
        document.getElementById('voiceBtn').onclick = () => {
            console.log('Voice recording started');
        };
    }
});
```

> **Note:** When using custom footer templates, you need to manually handle message sending and input management.

---

## Complete Example: Advanced Header & Footer

```typescript
import { ChatUI, UserModel, ToolbarItemClickedEventArgs } from '@syncfusion/ej2-interactive-chat';

let currentUser: UserModel = {
    id: "user1",
    user: "Customer",
    avatarBgColor: "#2196f3"
};

let chatUI: ChatUI = new ChatUI({
    user: currentUser,
    
    // Header configuration
    showHeader: true,
    headerText: 'Support Agent - Sarah',
    headerIconCss: 'e-icons e-user',
    headerToolbar: {
        items: [
            {
                text: 'Call Support',
                iconCss: 'e-icons e-phone',
                align: 'Right',
                tooltip: 'Call customer support'
            },
            {
                text: 'End Chat',
                iconCss: 'e-icons e-close',
                align: 'Right',
                tooltip: 'End conversation',
                cssClass: 'end-chat-btn'
            }
        ]
    },
    itemClicked: (args: ToolbarItemClickedEventArgs) => {
        if (args.item.text === 'Call Support') {
            window.open('tel:1-800-SUPPORT');
        } else if (args.item.text === 'End Chat') {
            if (confirm('Are you sure you want to end this chat?')) {
                // Handle chat end
                console.log('Chat ended');
            } else {
                args.cancel = true;
            }
        }
    },
    
    // Footer configuration
    showFooter: true,
    placeholder: 'Describe your issue in detail...',
    
    width: '100%',
    height: '600px'
});

chatUI.appendTo('#chatUI');
```

---

## Best Practices

1. **Header Text**: Keep it concise - show participant name or group name only
2. **Toolbar Icons**: Use recognizable icons with tooltips for clarity
3. **Toolbar Alignment**: Place primary actions on the right, navigation on the left
4. **Footer Placeholder**: Make it contextual to guide user input
5. **Custom Templates**: Ensure accessibility with proper ARIA labels
6. **Responsive Design**: Test header/footer on mobile devices
7. **Disabled State**: Disable send button when input is empty
