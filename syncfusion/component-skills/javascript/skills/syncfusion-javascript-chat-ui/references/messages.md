# Messages Configuration

## Table of Contents
- [Overview](#overview)
- [MessageModel Structure](#messagemodel-structure)
- [Adding Messages](#adding-messages)
- [Message Status](#message-status)
- [Message Replies](#message-replies)
- [Pinned Messages](#pinned-messages)
- [Forwarded Messages](#forwarded-messages)
- [Auto-scroll Behavior](#auto-scroll-behavior)
- [Message Avatars](#message-avatars)
- [Message Grouping](#message-grouping)
- [Mentions in Messages](#mentions-in-messages)
- [File Attachments in Messages](#file-attachments-in-messages)

---

## Overview

The Chat UI control manages messages through the `messages` property, which accepts an array of `MessageModel` objects. Each message contains properties like text, author, timestamp, status, and more.

---

## MessageModel Structure

Complete interface definition:

```typescript
interface MessageModel {
    id?: string;                    // Unique identifier
    text: string;                   // Message content (required)
    author: UserModel;              // Message sender (required)
    timestamp?: Date;               // When message was sent
    timeStampFormat?: string;       // Custom format for this message's timestamp
    status?: MessageStatusModel;    // Message status (sent, read, etc.)
    replyTo?: MessageReplyModel;    // Reference to replied message
    isForwarded?: boolean;          // Flag for forwarded messages
    isPinned?: boolean;             // Flag for pinned messages
    attachedFile?: FileInfo;        // Attached files
    mentionUsers?: UserModel[];     // Users mentioned in message
}
```

---

## Adding Messages

### Initial Messages

Set messages during initialization:

```typescript
import { ChatUI, UserModel, MessageModel } from '@syncfusion/ej2-interactive-chat';

let currentUser: UserModel = { id: "user1", user: "Albert" };
let participant: UserModel = { id: "user2", user: "Michale" };

let chatMessages: MessageModel[] = [
    {
        author: currentUser,
        text: "Hi Michale, are we on track for the deadline?"
    },
    {
        author: participant,
        text: "Yes, the design phase is complete."
    },
    {
        author: currentUser,
        text: "Great! I'll review it and send feedback by today."
    }
];

let chatUI: ChatUI = new ChatUI({
    user: currentUser,
    messages: chatMessages
});

chatUI.appendTo('#chatUI');
```

### Add Message Programmatically

Use the `addMessage()` method:

```typescript
// Add as string (uses current user)
chatUI.addMessage("This is a new message");

// Add as MessageModel
chatUI.addMessage({
    text: "Response from server",
    author: participant,
    timestamp: new Date()
});
```

### Update Existing Message

Use the `updateMessage()` method:

```typescript
chatUI.updateMessage({
    text: "Updated message content",
    author: currentUser,
    status: { text: "Edited" }
}, "message-id-123");
```

---

## Message Status

Add custom status indicators to messages using `MessageStatusModel`.

### MessageStatusModel Interface

```typescript
interface MessageStatusModel {
    text: string;        // Status text (e.g., "Sent", "Read", "Delivered")
    iconCss?: string;    // CSS class for status icon
    tooltip?: string;    // Tooltip text for status icon
}
```

### Example: Sent/Read Status

```typescript
let chatMessages: MessageModel[] = [
    {
        author: currentUser,
        text: "Has this been delivered?",
        status: {
            text: "Sent",
            iconCss: "e-icons e-check",
            tooltip: "Message sent"
        }
    },
    {
        author: currentUser,
        text: "Message with read receipt",
        status: {
            text: "Read",
            iconCss: "e-icons e-check-double",
            tooltip: "Message read at 2:30 PM"
        }
    }
];
```

### Update Status Dynamically

```typescript
// Simulate message delivery
setTimeout(() => {
    chatUI.updateMessage({
        text: "Has this been delivered?",
        author: currentUser,
        status: {
            text: "Delivered",
            iconCss: "e-icons e-check-double",
            tooltip: "Delivered successfully"
        }
    }, "msg-1");
}, 2000);
```

---

## Message Replies

Implement threaded conversations with the `replyTo` property.

### MessageReplyModel Interface

```typescript
interface MessageReplyModel {
    messageID: string;          // ID of the original message
    text: string;               // Original message text
    user: UserModel;            // Original message author
    timestamp?: Date;           // Original message timestamp
    timestampFormat?: string;   // Timestamp format
    attachedFile?: FileInfo;    // Files from original message
    mentionUsers?: UserModel[]; // Mentions from original message
}
```

### Reply to Message Example

```typescript
let originalMessage: MessageModel = {
    id: "msg-1",
    author: participant,
    text: "What's the status of the project?",
    timestamp: new Date('2026-03-26T09:00:00')
};

let replyMessage: MessageModel = {
    author: currentUser,
    text: "We're on track and will finish by Friday.",
    replyTo: {
        messageID: "msg-1",
        text: "What's the status of the project?",
        user: participant,
        timestamp: new Date('2026-03-26T09:00:00')
    }
};

let chatMessages: MessageModel[] = [originalMessage, replyMessage];
```

---

## Pinned Messages

Highlight important messages using the `isPinned` property.

### Pin Message

```typescript
let chatMessages: MessageModel[] = [
    {
        author: currentUser,
        text: "Important: Meeting tomorrow at 10 AM",
        isPinned: true
    },
    {
        author: participant,
        text: "Regular message"
    }
];
```

### Pin/Unpin Dynamically

```typescript
// Pin a message
chatUI.updateMessage({
    text: "Important: Meeting tomorrow at 10 AM",
    author: currentUser,
    isPinned: true
}, "msg-1");

// Unpin later
chatUI.updateMessage({
    text: "Important: Meeting tomorrow at 10 AM",
    author: currentUser,
    isPinned: false
}, "msg-1");
```

---

## Forwarded Messages

Mark messages as forwarded using the `isForwarded` property.

```typescript
let chatMessages: MessageModel[] = [
    {
        author: currentUser,
        text: "This message was forwarded from another chat",
        isForwarded: true
    }
];
```

Forwarded messages display a "Forwarded" indicator in the UI.

---

## Auto-scroll Behavior

Control whether the chat automatically scrolls to new messages using `autoScrollToBottom`.

```typescript
let chatUI: ChatUI = new ChatUI({
    user: currentUser,
    messages: chatMessages,
    autoScrollToBottom: true  // Auto-scroll on new messages
});
```

### Manual Scroll Control

```typescript
// Scroll to bottom programmatically
chatUI.scrollToBottom();

// Scroll to specific message
chatUI.scrollToMessage("message-id-123");
```

---

## Message Avatars

Configure user avatars for visual differentiation.

### Avatar URL

```typescript
let userWithAvatar: UserModel = {
    id: "user1",
    user: "Albert",
    avatarUrl: "https://example.com/avatars/albert.png"
};
```

### Avatar Background Color (fallback)

If no `avatarUrl` is provided, initials are shown with a background color:

```typescript
let userWithColor: UserModel = {
    id: "user2",
    user: "Michale Suyama",
    avatarBgColor: "#f44336"  // Red background
};
```

The component automatically extracts initials from the `user` name (e.g., "MS" for "Michale Suyama").

---

## Message Grouping

Messages from the same sender are automatically grouped together. Consecutive messages from the same user display only one avatar.

```typescript
let chatMessages: MessageModel[] = [
    { author: currentUser, text: "First message" },
    { author: currentUser, text: "Second message" },  // Grouped with first
    { author: currentUser, text: "Third message" },   // Grouped with above
    { author: participant, text: "Response" }         // New group
];
```

---

## Mentions in Messages

Store information about mentioned users in the `mentionUsers` array.

```typescript
let mentionedUser: UserModel = {
    id: "user3",
    user: "Janet"
};

let messageWithMention: MessageModel = {
    author: currentUser,
    text: "Hey @Janet, can you review this?",
    mentionUsers: [mentionedUser]
};
```

> See `mention.md` for complete @mention integration details.

---

## File Attachments in Messages

Attach files to messages using the `attachedFile` property.

```typescript
let messageWithFile: MessageModel = {
    author: currentUser,
    text: "Here's the document you requested",
    attachedFile: {
        name: "project-plan.pdf",
        size: 524288,  // Size in bytes
        type: "application/pdf"
    }
};
```

> See `file-attachments.md` for complete file attachment configuration.

---

## Complete Example: Rich Message

```typescript
import { ChatUI, UserModel, MessageModel } from '@syncfusion/ej2-interactive-chat';

let currentUser: UserModel = {
    id: "user1",
    user: "Albert",
    avatarBgColor: "#3f51b5"
};

let participant: UserModel = {
    id: "user2",
    user: "Michale Suyama",
    avatarUrl: "https://example.com/avatars/michale.png"
};

let chatMessages: MessageModel[] = [
    // Simple message
    {
        id: "msg-1",
        author: participant,
        text: "Have you completed the design review?",
        timestamp: new Date('2026-03-26T09:00:00')
    },
    
    // Message with status
    {
        id: "msg-2",
        author: currentUser,
        text: "Yes, all done!",
        timestamp: new Date('2026-03-26T09:05:00'),
        status: {
            text: "Read",
            iconCss: "e-icons e-check-double",
            tooltip: "Read at 9:06 AM"
        }
    },
    
    // Reply message
    {
        id: "msg-3",
        author: participant,
        text: "Great work! When can you share the files?",
        timestamp: new Date('2026-03-26T09:10:00'),
        replyTo: {
            messageID: "msg-2",
            text: "Yes, all done!",
            user: currentUser
        }
    },
    
    // Pinned message
    {
        id: "msg-4",
        author: currentUser,
        text: "Meeting at 2 PM today - don't forget!",
        timestamp: new Date('2026-03-26T09:15:00'),
        isPinned: true
    },
    
    // Forwarded message
    {
        id: "msg-5",
        author: participant,
        text: "Important update from management",
        timestamp: new Date('2026-03-26T09:20:00'),
        isForwarded: true
    }
];

let chatUI: ChatUI = new ChatUI({
    user: currentUser,
    messages: chatMessages,
    showTimeStamp: true,
    autoScrollToBottom: true
});

chatUI.appendTo('#chatUI');
```

---

## Best Practices

1. **Always set unique IDs**: Assign unique `id` values to messages for update/scroll operations
2. **Include timestamps**: Helps users track conversation chronology
3. **Use status indicators**: Provide feedback about message delivery
4. **Group related messages**: Use replies for threaded conversations
5. **Pin sparingly**: Only pin truly important messages to avoid clutter
6. **Provide context for forwards**: Include information about the original source
