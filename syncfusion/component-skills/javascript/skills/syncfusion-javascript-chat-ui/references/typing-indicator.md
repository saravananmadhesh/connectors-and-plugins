# Typing Indicator

This guide covers how to show and customize typing indicators in the Chat UI component to display when participants are actively typing.

## Overview

The typing indicator provides visual feedback when other users are composing messages. This improves the conversational experience by showing real-time activity status.

---

## Show/Hide Typing Indicator

Use the `typingUsers` property to display typing indicators. Set it to an array of `UserModel` objects to show who is typing, or an empty array to hide the indicator.

###Basic Usage

```typescript
import { ChatUI, UserModel } from '@syncfusion/ej2-interactive-chat';

let currentUser: UserModel = {
    id: "user1",
    user: "Albert"
};

let participant: UserModel = {
    id: "user2",
    user: "Michale Suyama"
};

let chatUI: ChatUI = new ChatUI({
    user: currentUser,
    typingUsers: [participant]  // Show "Michale Suyama is typing..."
});

chatUI.appendTo('#chatUI');
```

---

## Dynamic Typing Updates

Update `typingUsers` dynamically to show/hide the typing indicator.

```typescript
let chatUI: ChatUI = new ChatUI({
    user: currentUser,
    typingUsers: []  // Initially no one typing
});

// Show typing indicator when user starts typing
function onUserStartedTyping() {
    chatUI.typingUsers = [participant];
    chatUI.dataBind();  // Apply changes
}

// Hide typing indicator when user stops typing or sends message
function onUserStoppedTyping() {
    chatUI.typingUsers = [];
    chatUI.dataBind();
}
```

---

## Multiple Users Typing

The typing indicator supports multiple users typing simultaneously.

```typescript
let participant1: UserModel = {
    id: "user2",
    user: "Michale Suyama"
};

let participant2: UserModel = {
    id: "user3",
    user: "Janet Leverling"
};

// Show multiple users typing
chatUI.typingUsers = [participant1, participant2];
chatUI.dataBind();
// Displays: "Michale Suyama and Janet Leverling are typing..."
```

**Display Behavior:**
- 1 user: "John is typing..."
- 2 users: "John and Sarah are typing..."
- 3+ users: "John, Sarah and 1 more are typing..." (or similar)

---

## Custom Typing Template

Use `typingUsersTemplate` to customize the appearance of the typing indicator.

### Simple Custom Template

```typescript
let chatUI: ChatUI = new ChatUI({
    user: currentUser,
    typingUsers: [participant],
    typingUsersTemplate: '<div class="custom-typing">✍️ ${user} is typing...</div>'
});
```

### Template with Function

```typescript
let chatUI: ChatUI = new ChatUI({
    user: currentUser,
    typingUsers: [participant],
    typingUsersTemplate: function(data) {
        let users = data.typingUsers;
        if (users.length === 1) {
            return `<div class="typing-indicator">
                        <span class="typing-dots">●●●</span>
                        ${users[0].user} is composing a message...
                    </div>`;
        } else {
            return `<div class="typing-indicator">
                        <span class="typing-dots">●●●</span>
                        ${users.length} people are typing...
                    </div>`;
        }
    }
});
```

### Styled Template with CSS

```typescript
let chatUI: ChatUI = new ChatUI({
    user: currentUser,
    typingUsers: [participant],
    typingUsersTemplate: `
        <div class="enhanced-typing">
            <span class="typing-animation">
                <span></span><span></span><span></span>
            </span>
            <span class="typing-text">\${user} is typing...</span>
        </div>
    `
});
```

```css
.enhanced-typing {
    display: flex;
    align-items: center;
    padding: 8px 12px;
    color: #666;
    font-style: italic;
}

.typing-animation {
    display: flex;
    gap: 3px;
    margin-right: 8px;
}

.typing-animation span {
    width: 6px;
    height: 6px;
    background: #2196f3;
    border-radius: 50%;
    animation: bounce 1.4s infinite ease-in-out both;
}

.typing-animation span:nth-child(1) {
    animation-delay: -0.32s;
}

.typing-animation span:nth-child(2) {
    animation-delay: -0.16s;
}

@keyframes bounce {
    0%, 80%, 100% { 
        transform: scale(0);
    }
    40% { 
        transform: scale(1);
    }
}
```

---

## userTyping Event

The `userTyping` event fires when the current user types in the input field.

### TypingEventArgs Interface

```typescript
interface TypingEventArgs {
    isTyping: boolean;    // true while typing, false when stopped
    message: string;      // Current message text
    user: UserModel;      // Current user information
    event: Event;         // Native event object
    name: string;         // Event name
}
```

### Handle userTyping Event

```typescript
let chatUI: ChatUI = new ChatUI({
    user: currentUser,
    userTyping: (args: TypingEventArgs) => {
        console.log('User is typing:', args.isTyping);
        console.log('Current message:', args.message);
        
        if (args.isTyping) {
            // Notify server that user started typing
            sendTypingStatus(args.user.id, true);
        } else {
            // Notify server that user stopped typing
            sendTypingStatus(args.user.id, false);
        }
    }
});

function sendTypingStatus(userId: string, isTyping: boolean) {
    // Send to server via WebSocket/API
    console.log(`User ${userId} typing status: ${isTyping}`);
}
```

---

## Real-Time Typing Indicator Example

Complete example with WebSocket integration for real-time typing indicators.

```typescript
import { ChatUI, UserModel, TypingEventArgs } from '@syncfusion/ej2-interactive-chat';

let currentUser: UserModel = {
    id: "user1",
    user: "Albert"
};

let participant: UserModel = {
    id: "user2",
    user: "Michale Suyama"
};

let chatUI: ChatUI = new ChatUI({
    user: currentUser,
    typingUsers: [],
    
    userTyping: (args: TypingEventArgs) => {
        // Send typing status to other participants
        if (args.isTyping) {
            broadcastTypingStatus('started');
        } else {
            broadcastTypingStatus('stopped');
        }
    }
});

chatUI.appendTo('#chatUI');

// Simulate receiving typing status from WebSocket
function onTypingStatusReceived(userId: string, status: string) {
    if (status === 'started') {
        // Show typing indicator
        chatUI.typingUsers = [participant];
    } else if (status === 'stopped') {
        // Hide typing indicator
        chatUI.typingUsers = [];
    }
    chatUI.dataBind();
}

function broadcastTypingStatus(status: string) {
    // Send to WebSocket/API
    console.log(`Broadcasting typing status: ${status}`);
    // websocket.send({ type: 'typing', status: status, userId: currentUser.id });
}

// Auto-hide typing indicator after timeout
let typingTimeout: number;
function onTypingStatusReceived(userId: string, status: string) {
    clearTimeout(typingTimeout);
    
    if (status === 'started') {
        chatUI.typingUsers = [participant];
        chatUI.dataBind();
        
        // Auto-hide after 5 seconds of no activity
        typingTimeout = setTimeout(() => {
            chatUI.typingUsers = [];
            chatUI.dataBind();
        }, 5000);
    } else {
        chatUI.typingUsers = [];
        chatUI.dataBind();
    }
}
```

---

## Typing Indicator with Multiple Participants

Managing typing indicators in group chats.

```typescript
let participants: UserModel[] = [
    { id: "user2", user: "Michale" },
    { id: "user3", user: "Janet" },
    { id: "user4", user: "Andrew" }
];

let currentlyTyping: UserModel[] = [];

// Add user to typing list
function addTypingUser(userId: string) {
    let user = participants.find(p => p.id === userId);
    if (user && !currentlyTyping.find(u => u.id === userId)) {
        currentlyTyping.push(user);
        chatUI.typingUsers = [...currentlyTyping];
        chatUI.dataBind();
    }
}

// Remove user from typing list
function removeTypingUser(userId: string) {
    currentlyTyping = currentlyTyping.filter(u => u.id !== userId);
    chatUI.typingUsers = [...currentlyTyping];
    chatUI.dataBind();
}

// Clear all typing users
function clearAllTyping() {
    currentlyTyping = [];
    chatUI.typingUsers = [];
    chatUI.dataBind();
}
```

---

## Debounce Typing Events

Optimize typing notifications to reduce server load.

```typescript
let typingDebounceTimer: number;
let isCurrentlyTyping: boolean = false;

let chatUI: ChatUI = new ChatUI({
    user: currentUser,
    userTyping: (args: TypingEventArgs) => {
        clearTimeout(typingDebounceTimer);
        
        if (args.message.length > 0) {
            // Send "started typing" only once
            if (!isCurrentlyTyping) {
                sendTypingStatus('started');
                isCurrentlyTyping = true;
            }
            
            // Debounce "stopped typing" signal
            typingDebounceTimer = setTimeout(() => {
                sendTypingStatus('stopped');
                isCurrentlyTyping = false;
            }, 2000);  // 2 seconds after last keystroke
        }
    }
});

function sendTypingStatus(status: string) {
    console.log(`Typing status: ${status}`);
    // Send to server
}
```