# Methods

## Table of Contents
- [addMessage](#addmessage)
- [updateMessage](#updatemessage)
- [scrollToBottom](#scrolltobottom)
- [scrollToMessage](#scrolltomessage)
- [focus](#focus)
- [refresh](#refresh)
- [dataBind](#databind)
- [Other Methods](#other-methods)

---

## addMessage

Add a new message to the chat programmatically.

### Method Signature

```typescript
addMessage(message: string | MessageModel): void
```

### Parameters

- **message** - Either a string (creates message with current user) or a complete MessageModel object

### String Message

```typescript
// Simple string - uses current user automatically
chatUI.addMessage("This is a new message");
```

### MessageModel Message

```typescript
let message: MessageModel = {
    text: "Response from server",
    author: botUser,
    timestamp: new Date(),
    status: {
        text: "Delivered",
        iconCss: "e-icons e-check-double"
    }
};

chatUI.addMessage(message);
```

### Complete Example

```typescript
import { ChatUI, UserModel, MessageModel } from '@syncfusion/ej2-interactive-chat';

let currentUser: UserModel = { id: "user1", user: "Customer" };
let botUser: UserModel = { id: "bot", user: "Support Bot" };

let chatUI: ChatUI = new ChatUI({
    user: currentUser,
    messageSend: (args: MessageSendEventArgs) => {
        // Echo back user message
        chatUI.addMessage(args.message);
        
        // Simulate bot response
        setTimeout(() => {
            chatUI.addMessage({
                text: "Thanks for your message! How can I help?",
                author: botUser,
                timestamp: new Date()
            });
        }, 1000);
    }
});
```

---

## updateMessage

Modify an existing message in the chat.

### Method Signature

```typescript
updateMessage(message: MessageModel, msgId: string): void
```

### Parameters

- **message** - Updated MessageModel object with new content
- **msgId** - ID of the message to update

### Example

```typescript
// Update message text and status
chatUI.updateMessage({
    text: "Updated message content",
    author: currentUser,
    status: { text: "Edited" }
}, "message-id-123");
```

### Edit Message

```typescript
let editedMessage = {
    text: "I meant to say: this is the corrected version",
    author: currentUser,
    status: { text: "Edited" }
};

chatUI.updateMessage(editedMessage, "msg-123");
```

### Update Status Only

```typescript
let message = chatUI.messages.find(m => m.id === "msg-123");
if (message) {
    chatUI.updateMessage({
        ...message,
        status: { text: "Read", iconCss: "e-icons e-check-double" }
    }, "msg-123");
}
```

---

## scrollToBottom

Scroll the chat view to the latest message.

### Method Signature

```typescript
scrollToBottom(): void
```

### Example

```typescript
// Scroll to most recent message
chatUI.scrollToBottom();

// Scroll after adding message
chatUI.addMessage("New message");
chatUI.scrollToBottom();
```

### Auto-scroll Alternative

```typescript
// Enable automatic scrolling on new messages
let chatUI: ChatUI = new ChatUI({
    user: currentUser,
    autoScrollToBottom: true  // Scroll automatically
});
```

---

## scrollToMessage

Scroll to a specific message by its ID.

### Method Signature

```typescript
scrollToMessage(messageId: string): void
```

### Parameters

- **messageId** - The ID of the message to scroll to

### Example

```typescript
// Scroll to specific message
chatUI.scrollToMessage("message-id-456");

// Jump to message in search results
function goToMessage(messageId: string) {
    chatUI.scrollToMessage(messageId);
    highlightMessage(messageId);
}
```

### Find and Jump to Message

```typescript
function findAndJump(searchText: string) {
    let foundMessage = chatUI.messages.find(m => 
        m.text.toLowerCase().includes(searchText.toLowerCase())
    );
    
    if (foundMessage && foundMessage.id) {
        chatUI.scrollToMessage(foundMessage.id);
        return foundMessage;
    }
    return null;
}
```

---

## focus

Set focus to the message input textarea.

### Method Signature

```typescript
focus(): void
```

### Example

```typescript
// Focus input field
chatUI.focus();

// Focus when component is ready
let chatUI: ChatUI = new ChatUI({
    user: currentUser,
    created: () => {
        chatUI.focus();
    }
});
```

### Focus on User Action

```typescript
// Focus when user clicks send button
document.getElementById('customSendBtn').addEventListener('click', () => {
    chatUI.focus();
});

// Focus when component is clicked
chatUI.getRootElement().addEventListener('click', () => {
    chatUI.focus();
});
```

---

## refresh

Re-render the entire component after property changes.

### Method Signature

```typescript
refresh(): void
```

### Example

```typescript
// Modify properties and refresh
chatUI.headerText = "New Conversation";
chatUI.suggestions = ["Yes", "No"];
chatUI.refresh();
```

### When to Use

Use `refresh()` when making multiple property changes at once:

```typescript
// Change multiple properties
chatUI.headerText = "Updated Title";
chatUI.showHeader = true;
chatUI.enableAttachments = true;
chatUI.placeholder = "New placeholder";

// Render all changes
chatUI.refresh();
```

---

## dataBind

Apply pending property changes immediately.

### Method Signature

```typescript
dataBind(): void
```

### Example

```typescript
// Update typing users
chatUI.typingUsers = [participant];
chatUI.dataBind();  // Apply the change

// Update suggestions
chatUI.suggestions = ["Option 1", "Option 2"];
chatUI.dataBind();
```

### Difference: refresh() vs dataBind()

- **dataBind()** - Applies data-bound property changes (faster)
- **refresh()** - Re-renders entire component (slower, more complete)

```typescript
// Use dataBind() for data properties
chatUI.typingUsers = [user];
chatUI.dataBind();  // ✓ Efficient

// Use refresh() for structural changes
chatUI.showHeader = false;
chatUI.refresh();  // ✓ Necessary for UI changes
```

---

## Other Methods

### appendTo

Render the component to a DOM element.

```typescript
chatUI.appendTo('#chatUI');
chatUI.appendTo(document.getElementById('chatUI'));
```

### getRootElement

Get the root HTML element of the component.

```typescript
let rootElement: HTMLElement = chatUI.getRootElement();
rootElement.style.borderRadius = '8px';
```

### addEventListener

Register event handlers programmatically.

```typescript
chatUI.addEventListener('messageSend', (args) => {
    console.log('Message sent:', args.message.text);
});
```

### removeEventListener

Unregister event handlers.

```typescript
let handler = (args) => {
    console.log('Message:', args.message.text);
};

chatUI.addEventListener('messageSend', handler);

// Later, remove the handler
chatUI.removeEventListener('messageSend', handler);
```

### Inject

Dynamically inject feature modules.

```typescript
import { ChatUI, Toolbar, Link, Image, HtmlEditor } from '@syncfusion/ej2-interactive-chat';

ChatUI.Inject(Toolbar, Link, Image, HtmlEditor);
```

---

## Common Patterns

### Send Message with Validation

```typescript
function sendMessage(text: string) {
    if (!text || text.trim() === '') {
        console.warn('Cannot send empty message');
        return;
    }
    
    chatUI.addMessage(text);
    chatUI.scrollToBottom();
}
```

### Batch Add Messages

```typescript
let messages: MessageModel[] = [
    { text: "Message 1", author: currentUser },
    { text: "Message 2", author: botUser },
    { text: "Message 3", author: currentUser }
];

messages.forEach(msg => {
    chatUI.addMessage(msg);
});

chatUI.scrollToBottom();
```

### Clear Chat History

```typescript
function clearChatHistory() {
    if (confirm('Are you sure you want to clear all messages?')) {
        chatUI.messages = [];
        chatUI.dataBind();
    }
}
```

### Export Messages

```typescript
function exportMessages(): string {
    let csv = "Author,Message,Timestamp\n";
    
    chatUI.messages.forEach(msg => {
        let timestamp = msg.timestamp ? msg.timestamp.toLocaleString() : '';
        let text = `"${msg.text.replace(/"/g, '""')}"`;
        csv += `${msg.author.user},${text},${timestamp}\n`;
    });
    
    return csv;
}
```

---

## Best Practices

1. **Use addMessage for new content**: Don't manipulate messages array directly
2. **Call dataBind after bulk changes**: More efficient than individual updates
3. **Use focus() for UX**: Focus input after user interaction
4. **Implement error handling**: Wrap methods in try-catch for production
5. **Debounce scroll operations**: Avoid excessive scrollToMessage calls
6. **Clear resources**: Remove event listeners when component is destroyed
