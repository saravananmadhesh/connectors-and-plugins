# Getting Started with Syncfusion TypeScript Chat UI

This guide covers the installation, setup, and basic initialization of the Syncfusion Chat UI control in TypeScript applications.

## Package Installation

### Install via npm

```bash
npm install @syncfusion/ej2-interactive-chat --save
```
---

## CSS Imports

To install the fluent2 theme package, use the following command:

```bash
npm install @syncfusion/ej2-fluent2-theme --save
```

Import the required CSS files to apply the theme to the Chat UI control.

Add these imports to your `styles.css` file:

```css
@import "../../node_modules/@syncfusion/ej2-fluent2-theme/styles/chat-ui/index.css";
```
---

## Basic Chat UI Initialization

### Minimal Example

```typescript
import { ChatUI } from '@syncfusion/ej2-interactive-chat';

// Initialize Chat UI
let chatUI: ChatUI = new ChatUI({});

// Render to DOM element
chatUI.appendTo('#chatUI');
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Chat UI Example</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link href="https://cdn.syncfusion.com/ej2/32.1.19/fluent2.css" rel="stylesheet" />
</head>
<body>
    <div class="chatui-container" style="height: 400px; width: 450px;">
        <div id="chatUI"></div>
    </div>
</body>
</html>
```

---

## UserModel Configuration

The `UserModel` interface defines user information for the chat participants.

### UserModel Properties

```typescript
interface UserModel {
    id: string;           // Unique identifier for the user
    user: string;         // Display name
    avatarUrl?: string;   // URL to user's avatar image
    avatarBgColor?: string; // Background color for avatar (if no image)
    cssClass?: string;    // Custom CSS class for user's messages
    statusIconCss?: string; // CSS class for status icon
}
```

### Define Current User

```typescript
import { ChatUI, UserModel } from '@syncfusion/ej2-interactive-chat';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

let currentUser: UserModel = {
    id: "user1",
    user: "Albert",
    avatarUrl: "https://example.com/avatars/albert.png",
    avatarBgColor: "#3f51b5"
};

let chatUI: ChatUI = new ChatUI({
    user: currentUser
});

chatUI.appendTo('#chatUI');
```

### Multiple Users

```typescript
let currentUser: UserModel = {
    id: "user1",
    user: "Albert",
    avatarBgColor: "#3f51b5"
};

let participantUser: UserModel = {
    id: "user2",
    user: "Michale Suyama",
    avatarBgColor: "#f44336"
};
```

> **Note:** The `user` property in ChatUI defines the **current user** (you). Messages from this user appear on the right side. Messages from other users appear on the left side.

---

## MessageModel Structure

The `MessageModel` interface defines the structure of chat messages.

### MessageModel Properties

```typescript
interface MessageModel {
    id?: string;           // Unique identifier for the message
    text: string;          // Message content
    author: UserModel;     // User who sent the message
    timestamp?: Date;      // When the message was sent
    timeStampFormat?: string; // Custom timestamp format for this message
    status?: MessageStatusModel; // Message status (sent, read, etc.)
    replyTo?: MessageReplyModel; // Reference to replied message
    isForwarded?: boolean; // Whether message is forwarded
    isPinned?: boolean;    // Whether message is pinned
    attachedFile?: FileInfo; // Attached files
    mentionUsers?: UserModel[]; // Users mentioned in message
}
```

---

## Initial Messages

Use the `messages` property to display initial conversation history.

```typescript
import { ChatUI, UserModel, MessageModel } from '@syncfusion/ej2-interactive-chat';

let currentUser: UserModel = {
    id: "user1",
    user: "Albert"
};

let participantUser: UserModel = {
    id: "user2",
    user: "Michale Suyama"
};

let chatMessages: MessageModel[] = [
    {
        author: currentUser,
        text: "Hi Michale, are we on track for the deadline?"
    },
    {
        author: participantUser,
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

---

## Component Dimensions

Control the size of the Chat UI component using `width` and `height` properties.

```typescript
let chatUI: ChatUI = new ChatUI({
    user: currentUser,
    width: '100%',
    height: '500px'
});
```

Or set dimensions via CSS:

```html
<div id="chatUI" style="height: 500px; width: 400px;"></div>
```

```css
#chatUI {
    height: 100%;
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
}
```

---

## Component Lifecycle - created Event

The `created` event is triggered when the Chat UI component finishes rendering.

```typescript
let chatUI: ChatUI = new ChatUI({
    user: currentUser,
    created: () => {
        console.log("Chat UI is ready!");
        // Perform initialization tasks
        chatUI.focus(); // Focus the input field
    }
});
```

---

## Complete Working Example

```typescript
import { ChatUI, UserModel, MessageModel } from '@syncfusion/ej2-interactive-chat';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

// Define users
let currentUser: UserModel = {
    id: "user1",
    user: "Albert",
    avatarBgColor: "#3f51b5"
};

let botUser: UserModel = {
    id: "bot",
    user: "Support Bot",
    avatarBgColor: "#4caf50"
};

// Initial messages
let chatMessages: MessageModel[] = [
    {
        author: botUser,
        text: "Hello! How can I help you today?",
        timestamp: new Date('2026-03-26T09:00:00')
    },
    {
        author: currentUser,
        text: "I need help with my account.",
        timestamp: new Date('2026-03-26T09:01:00')
    },
    {
        author: botUser,
        text: "Sure! What specific issue are you facing?",
        timestamp: new Date('2026-03-26T09:01:30')
    }
];

// Initialize Chat UI
let chatUI: ChatUI = new ChatUI({
    user: currentUser,
    messages: chatMessages,
    width: '100%',
    height: '500px',
    showTimeStamp: true,
    placeholder: 'Type your message here...',
    created: () => {
        console.log('Chat UI initialized successfully');
    }
});

// Render
chatUI.appendTo('#chatUI');
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Chat UI - Getting Started</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link href="https://cdn.syncfusion.com/ej2/32.1.19/fluent2.css" rel="stylesheet" />
</head>
<body>
    <div class="container" style="padding: 20px;">
        <h2>Customer Support Chat</h2>
        <div id="chatUI" style="height: 500px; max-width: 600px;"></div>
    </div>
</body>
</html>
```