# Events

## Table of Contents
- [created](#created)
- [messageSend](#messagesend)
- [userTyping](#usertyping)
- [mentionSelect](#mentionselect)
- [itemClicked (Header Toolbar)](#itemclicked-header-toolbar)
- [itemClicked (Message Toolbar)](#itemclicked-message-toolbar)
- [attachmentClick](#attachmentclick)
- [Attachment Upload Events](#attachment-upload-events)

---

## created

Triggered when the Chat UI component finishes rendering and is ready for interaction.

### Usage

```typescript
let chatUI: ChatUI = new ChatUI({
    user: currentUser,
    created: () => {
        console.log("Chat UI is initialized and ready");
        chatUI.focus();  // Focus input field
    }
});
```

### Initialize After Creation

```typescript
let chatUI: ChatUI = new ChatUI({
    user: currentUser,
    created: () => {
        // Load messages from server
        loadInitialMessages();
        
        // Setup WebSocket connection
        connectToWebSocket();
        
        // Initialize third-party integrations
        setupAnalytics();
    }
});

async function loadInitialMessages() {
    const messages = await fetch('/api/messages').then(r => r.json());
    chatUI.messages = messages;
    chatUI.dataBind();
}
```

---

## messageSend

Triggered when the user tries to send a message, before it's added to the chat.

### Event Arguments

```typescript
interface MessageSendEventArgs {
    cancel: boolean;      // Set to true to prevent sending
    message: MessageModel;  // The message being sent
    name: string;         // Event name
}
```

### Basic Usage

```typescript
let chatUI: ChatUI = new ChatUI({
    user: currentUser,
    messageSend: (args: MessageSendEventArgs) => {
        console.log("Message being sent:", args.message.text);
    }
});
```

### Validation Example

```typescript
messageSend: (args: MessageSendEventArgs) => {
    // Prevent empty messages
    if (!args.message.text || args.message.text.trim() === '') {
        args.cancel = true;
        alert('Cannot send empty message');
        return;
    }
    
    // Check message length
    if (args.message.text.length > 500) {
        args.cancel = true;
        alert('Message is too long (max 500 characters)');
        return;
    }
    
    // Prevent spam
    if (args.message.text === lastMessageText) {
        args.cancel = true;
        alert('Cannot send duplicate message');
        return;
    }
    
    lastMessageText = args.message.text;
}
```

### Server Communication

```typescript
messageSend: async (args: MessageSendEventArgs) => {
    try {
        // Send to server
        const response = await fetch('/api/messages', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: currentUser.id,
                text: args.message.text
            })
        });
        
        if (!response.ok) {
            args.cancel = true;
            alert('Failed to send message. Please try again.');
        }
    } catch (error) {
        console.error('Error sending message:', error);
        args.cancel = true;
    }
}
```

### Add Server Response

```typescript
let chatUI: ChatUI = new ChatUI({
    user: currentUser,
    messageSend: async (args: MessageSendEventArgs) => {
        // Send user message
        const userResponse = await fetch('/api/messages', {
            method: 'POST',
            body: JSON.stringify({ text: args.message.text })
        });
        
        if (userResponse.ok) {
            // Simulate bot response
            setTimeout(() => {
                chatUI.addMessage({
                    text: "I received your message and I'm processing it...",
                    author: botUser
                });
            }, 1000);
        }
    }
});
```

---

## userTyping

Triggered when the user types in the input field.

### Event Arguments

```typescript
interface TypingEventArgs {
    isTyping: boolean;    // true while typing, false when stopped
    message: string;      // Current input text
    user: UserModel;      // Current user
    event: Event;         // Native event object
    name: string;         // Event name
}
```

### Basic Usage

```typescript
userTyping: (args: TypingEventArgs) => {
    if (args.isTyping) {
        console.log(`${args.user.user} is typing: "${args.message}"`);
    } else {
        console.log(`${args.user.user} stopped typing`);
    }
}
```

### Notify Server of Typing Status

```typescript
let typingTimeout: any;

userTyping: (args: TypingEventArgs) => {
    clearTimeout(typingTimeout);
    
    if (args.isTyping) {
        // Send "started typing" to server
        sendTypingNotification('started');
    } else {
        // Delay sending "stopped typing" to debounce
        typingTimeout = setTimeout(() => {
            sendTypingNotification('stopped');
        }, 2000);
    }
}

async function sendTypingNotification(status: string) {
    await fetch('/api/typing', {
        method: 'POST',
        body: JSON.stringify({
            userId: currentUser.id,
            status: status
        })
    });
}
```

### Real-Time Typing Indicators

```typescript
userTyping: (args: TypingEventArgs) => {
    // Send typing status via WebSocket
    if (args.isTyping && args.message.length % 5 === 0) {
        // Send every 5 characters to reduce traffic
        websocket.send(JSON.stringify({
            type: 'typing',
            user: currentUser,
            text: args.message
        }));
    }
}
```

---

## mentionSelect

Triggered when the user selects a mention from the @mention suggestion popup.

### Event Arguments

```typescript
interface MentionSelectEventArgs {
    cancel: boolean;          // Cancel insertion of mention
    itemData: FieldSettingsModel;  // Selected item data
    isInteracted: boolean;    // User interaction or programmatic
    event: MouseEvent | KeyboardEvent | TouchEvent;  // Native event
    name: string;             // Event name
}
```

### Basic Usage

```typescript
mentionSelect: (args: MentionSelectEventArgs) => {
    console.log("User mentioned:", args.itemData);
}
```

### Validate Mention

```typescript
mentionSelect: (args: MentionSelectEventArgs) => {
    // Prevent mentioning certain users
    if (args.itemData.id === currentUser.id) {
        args.cancel = true;
        console.log('Cannot mention yourself');
        return;
    }
    
    // Allow mention
    console.log(`Mentioning user: ${args.itemData.user}`);
}
```

### Custom Mention Handling

```typescript
mentionSelect: (args: MentionSelectEventArgs) => {
    // Track who was mentioned
    let mentionedUser = args.itemData;
    logMention(mentionedUser);
    
    // Send notification to mentioned user
    notifyUser({
        mentionedBy: currentUser.id,
        mentionedUser: mentionedUser.id,
        messagePreview: chatUI.getRootElement().querySelector('input').value
    });
}
```

---

## itemClicked (Header Toolbar)

Triggered when a toolbar item in the header is clicked.

### Event Arguments

```typescript
interface ToolbarItemClickedEventArgs {
    cancel: boolean;        // Cancel the action
    item: ToolbarItemModel; // Clicked toolbar item
    event: Event;           // Native click event
    name: string;           // Event name
}
```

### Example

```typescript
let chatUI: ChatUI = new ChatUI({
    user: currentUser,
    headerToolbar: {
        items: [
            { text: 'Call', iconCss: 'e-icons e-phone' },
            { text: 'Video', iconCss: 'e-icons e-video' },
            { text: 'Info', iconCss: 'e-icons e-info' }
        ]
    },
    itemClicked: (args: ToolbarItemClickedEventArgs) => {
        switch(args.item.text) {
            case 'Call':
                startVoiceCall();
                break;
            case 'Video':
                startVideoCall();
                break;
            case 'Info':
                showInfo();
                break;
        }
    }
});
```

### Confirmation Dialog

```typescript
itemClicked: (args: ToolbarItemClickedEventArgs) => {
    if (args.item.text === 'End Chat') {
        if (confirm('Are you sure you want to end this chat?')) {
            endChat();
        } else {
            args.cancel = true;
        }
    }
}
```

---

## itemClicked (Message Toolbar)

Triggered when a toolbar item on a message is clicked (Copy, Reply, Pin, Delete).

### Event Arguments

```typescript
interface MessageToolbarItemClickedEventArgs {
    cancel: boolean;         // Cancel the action
    item: ToolbarItemModel;  // Clicked toolbar item
    message: MessageModel;   // Associated message
    event: Event;            // Native click event
    name: string;            // Event name
}
```

### Example

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
        switch(args.item.text) {
            case 'Copy':
                copyMessageToClipboard(args.message.text);
                break;
            case 'Reply':
                replyToMessage(args.message);
                break;
            case 'Pin':
                pinMessage(args.message);
                break;
            case 'Delete':
                deleteMessage(args.message);
                break;
        }
    }
});
```

---

## attachmentClick

Triggered when an attachment in the message is clicked.

### Event Arguments

```typescript
interface ChatAttachmentClickEventArgs {
    cancel: boolean;  // Cancel preview rendering
    file: FileInfo;   // File that was clicked
    event: Event;     // Native click event
    name: string;     // Event name
}
```

### Example

```typescript
attachmentClick: (args: ChatAttachmentClickEventArgs) => {
    console.log("Attachment clicked:", args.file.name);
    
    // Download or preview file
    downloadFile(args.file);
}
```

---

## Attachment Upload Events

### beforeAttachmentUpload

Fired before attachment upload begins.

```typescript
beforeAttachmentUpload: (args: BeforeUploadEventArgs) => {
    // Validate file before upload
    if (args.file.size > 5 * 1024 * 1024) {  // 5MB
        args.cancel = true;
        alert('File too large (max 5MB)');
    }
}
```

### attachmentUploadSuccess

Fired when attachment uploads successfully.

```typescript
attachmentUploadSuccess: (args: SuccessEventArgs) => {
    console.log("File uploaded successfully:", args.file.name);
    // Update file reference on server
    updateServerFileReference(args.file);
}
```

### attachmentUploadFailure

Fired when attachment upload fails.

```typescript
attachmentUploadFailure: (args: FailureEventArgs) => {
    console.error("Upload failed:", args.error);
    alert(`Failed to upload ${args.file.name}`);
}
```

### attachmentRemoved

Fired when an attachment is removed.

```typescript
attachmentRemoved: (args: RemovingEventArgs) => {
    console.log("Attachment removed:", args.file.name);
    // Delete file from server
    deleteFile(args.file.id);
}
```

---

## Complete Event Integration Example

```typescript
import { ChatUI, UserModel, MessageSendEventArgs, TypingEventArgs } from '@syncfusion/ej2-interactive-chat';

let currentUser: UserModel = { id: "user1", user: "Customer" };
let botUser: UserModel = { id: "bot", user: "Bot" };

let chatUI: ChatUI = new ChatUI({
    user: currentUser,
    
    created: () => {
        console.log("✓ Chat ready");
        setupWebSocket();
    },
    
    messageSend: async (args: MessageSendEventArgs) => {
        if (!args.message.text.trim()) {
            args.cancel = true;
            return;
        }
        await sendToServer(args.message);
    },
    
    userTyping: (args: TypingEventArgs) => {
        if (args.isTyping) {
            notifyServer({ type: 'typing', status: 'started' });
        }
    },
    
    mentionSelect: (args) => {
        console.log("Mentioned:", args.itemData);
    },
    
    itemClicked: (args) => {
        console.log("Toolbar action:", args.item.text);
    }
});

chatUI.appendTo('#chatUI');
```

---

## Best Practices

1. **Prevent Default**: Use `cancel` to control behavior
2. **Error Handling**: Wrap event logic in try-catch
3. **Async Operations**: Handle server calls properly
4. **Performance**: Debounce high-frequency events (userTyping)
5. **User Feedback**: Show status messages for long operations
6. **Logging**: Track important events for debugging
