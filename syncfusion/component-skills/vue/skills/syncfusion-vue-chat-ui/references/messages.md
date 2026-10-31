# Messages Configuration

## Table of Contents
- [Overview](#overview)
- [Basic Message Configuration](#basic-message-configuration)
- [Message Properties](#message-properties)
- [Message States](#message-states)
- [Message Status](#message-status)
- [User Configuration in Messages](#user-configuration-in-messages)
- [Timestamps](#timestamps)
- [Auto Scroll](#auto-scroll)
- [Suggestions](#suggestions)
- [Message Toolbar](#message-toolbar)
- [Markdown Support](#markdown-support)
- [Common Scenarios](#common-scenarios)

## Overview

Messages are the core content of the Chat UI component. Each message represents a single communication from a user and can include text, author information, timestamps, status indicators, and attachments. Messages are configured using the `<e-message>` directive within the `<e-messages>` collection.

## Basic Message Configuration

### Adding Messages Declaratively

Use `<e-messages>` to group messages and `<e-message>` for individual messages:

```vue
<template>
  <div class="chat-container" style="height: 400px; width: 500px;">
    <ejs-chatui :user="currentUser">
      <e-messages>
        <e-message 
          :author="currentUser" 
          text="Hi Michale, are we on track for the deadline?"
        ></e-message>
        <e-message 
          :author="michaleUser" 
          text="Yes, the design phase is complete."
        ></e-message>
        <e-message 
          :author="currentUser" 
          text="I'll review it and send feedback by today."
        ></e-message>
      </e-messages>
    </ejs-chatui>
  </div>
</template>

<script setup>
import { 
  ChatUIComponent as EjsChatui, 
  MessagesDirective as EMessages, 
  MessageDirective as EMessage 
} from "@syncfusion/ej2-vue-interactive-chat";

const currentUser = {
  id: "user1",
  user: "Albert"
};

const michaleUser = {
  id: "user2",
  user: "Michale Suyama"
};
</script>
```

### Adding Messages Programmatically

Use the `messages` property to bind an array of message objects:

```vue
<template>
  <div class="chat-container">
    <ejs-chatui 
      :user="currentUser"
      :messages="chatMessages"
    ></ejs-chatui>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ChatUIComponent as EjsChatui } from "@syncfusion/ej2-vue-interactive-chat";

const currentUser = {
  id: "user1",
  user: "Albert"
};

const michaleUser = {
  id: "user2",
  user: "Michale Suyama"
};

const chatMessages = ref([
  {
    id: "msg1",
    text: "Hi Michale, are we on track for the deadline?",
    author: currentUser,
    timestamp: new Date()
  },
  {
    id: "msg2",
    text: "Yes, the design phase is complete.",
    author: michaleUser,
    timestamp: new Date()
  }
]);
</script>
```

## Message Properties

### Required Properties

**`text`** - Message content (string)
```vue
<e-message text="Hello, how are you?"></e-message>
```

**`author`** - User who sent the message (UserModel object)
```vue
<e-message :author="currentUser" text="Message content"></e-message>
```

### Optional Properties

**`id`** - Unique identifier for the message
```vue
<e-message id="msg-123" :author="currentUser" text="Content"></e-message>
```

**`timestamp`** - When the message was sent (Date object)
```vue
<e-message 
  :author="currentUser" 
  text="Content"
  :timestamp="new Date('2026-03-27T10:00:00')"
></e-message>
```

**`timestampFormat`** - Custom format for displaying timestamp
```vue
<e-message 
  :author="currentUser" 
  text="Content"
  timestampFormat="MMMM dd, hh:mm a"
></e-message>
```

**`isPinned`** - Whether message is pinned (boolean)
```vue
<e-message :author="currentUser" text="Important message" :isPinned="true"></e-message>
```

**`isForwarded`** - Whether message was forwarded (boolean)
```vue
<e-message :author="currentUser" text="Forwarded content" :isForwarded="true"></e-message>
```

**`replyTo`** - Reference to original message (MessageReplyModel object)
```vue
<e-message 
  :author="currentUser" 
  text="That sounds great!"
  :replyTo="{
    messageID: 'msg-123',
    text: 'Shall we meet tomorrow?',
    user: michaleUser,
    timestamp: new Date('2026-03-27T09:00:00')
  }"
></e-message>
```

**`status`** - Message delivery status (MessageStatusModel object)
```vue
<e-message 
  :author="currentUser" 
  text="Content"
  :status="{ 
    iconCss: 'e-icons e-chat-seen',
    text: 'Seen',
    tooltip: 'Seen at 10:30 AM'
  }"
></e-message>
```

**`mentionUsers`** - Array of mentioned users (UserModel[])
```vue
<e-message 
  :author="currentUser" 
  text="@Alice can you review this?"
  :mentionUsers="[{ id: 'u2', user: 'Alice' }]"
></e-message>
```

**`attachedFile`** - Files attached to message (FileInfo object)
```vue
<e-message 
  :author="currentUser" 
  text="Here's the document"
  :attachedFile="fileInfo"
></e-message>
```

## Message States

### Pinned Messages

Mark important messages to highlight them visually:

```vue
<template>
  <div class="chat-container">
    <ejs-chatui :user="currentUser">
      <e-messages>
        <e-message 
          :author="currentUser" 
          text="Meeting at 3 PM today - conference room A"
          :isPinned="true"
        ></e-message>
        <e-message 
          :author="michaleUser" 
          text="Got it, I'll be there."
        ></e-message>
      </e-messages>
    </ejs-chatui>
  </div>
</template>
```

**Behavior:**
- Pinned messages are visually highlighted
- Users can access options menu to unpin
- Useful for keeping important information visible

### Forwarded Messages

Indicate that a message has been forwarded:

```vue
<template>
  <div class="chat-container">
    <ejs-chatui :user="currentUser">
      <e-messages>
        <e-message 
          :author="michaleUser" 
          text="The client approved the proposal!"
          :isForwarded="true"
        ></e-message>
      </e-messages>
    </ejs-chatui>
  </div>
</template>
```

**Behavior:**
- Forwarded messages display a "Forwarded" indicator
- Original author information is preserved

### Reply to Messages

Create threaded conversations by replying to specific messages:

```vue
<template>
  <div class="chat-container">
    <ejs-chatui :user="currentUser">
      <e-messages>
        <e-message 
          id="msg-1"
          :author="michaleUser" 
          text="Can you review the document?"
        ></e-message>
        <e-message 
          :author="currentUser" 
          text="Sure, I'll review it today."
          :replyTo="{
            messageID: 'msg-1',
            text: 'Can you review the document?',
            user: michaleUser,
            timestamp: new Date('2026-03-27T09:00:00')
          }"
        ></e-message>
      </e-messages>
    </ejs-chatui>
  </div>
</template>

<script setup>
import { 
  ChatUIComponent as EjsChatui, 
  MessagesDirective as EMessages, 
  MessageDirective as EMessage 
} from "@syncfusion/ej2-vue-interactive-chat";

const currentUser = { id: "user1", user: "Albert" };
const michaleUser = { id: "user2", user: "Michale Suyama" };
</script>
```

**ReplyTo Properties:**
- `messageID` - ID of the original message
- `text` - Text of the original message
- `user` - Author of the original message
- `timestamp` - When original message was sent
- `timestampFormat` - Format for reply timestamp
- `attachedFile` - Files in the original message
- `mentionUsers` - Users mentioned in original message

### Compact Mode

Align all messages to the left for a streamlined layout:

```vue
<template>
  <div class="chat-container">
    <ejs-chatui 
      :user="currentUser" 
      :enableCompactMode="true"
    >
      <e-messages>
        <e-message :author="currentUser" text="Hello"></e-message>
        <e-message :author="michaleUser" text="Hi there!"></e-message>
        <e-message :author="currentUser" text="How are you?"></e-message>
      </e-messages>
    </ejs-chatui>
  </div>
</template>
```

**Use Cases:**
- Group conversations
- Space-constrained interfaces
- Mobile applications
- When sender distinction is less important

## Message Status

Track message delivery and read status:

### Status with Icon

```vue
<template>
  <div class="chat-container">
    <ejs-chatui :user="currentUser">
      <e-messages>
        <e-message 
          :author="currentUser" 
          text="Did you receive my email?"
          :status="{ iconCss: 'e-icons e-chat-seen' }"
        ></e-message>
      </e-messages>
    </ejs-chatui>
  </div>
</template>

<script setup>
const currentUser = { id: "user1", user: "Albert" };
</script>
```

### Status with Text

```vue
<e-message 
  :author="currentUser" 
  text="Meeting confirmed"
  :status="{ text: 'Delivered' }"
></e-message>
```

### Status with Tooltip

```vue
<e-message 
  :author="currentUser" 
  text="Report submitted"
  :status="{ 
    iconCss: 'e-icons e-chat-seen',
    tooltip: 'Seen at 10:30 AM'
  }"
></e-message>
```

### Complete Status Configuration

```vue
<script setup>
const statusModel = {
  iconCss: 'e-icons e-chat-seen',
  text: 'Read',
  tooltip: 'Read by recipient at 10:30 AM'
};
</script>

<template>
  <e-message 
    :author="currentUser" 
    text="Message content"
    :status="statusModel"
  ></e-message>
</template>
```

## User Configuration in Messages

### Basic User Setup

```vue
<script setup>
const currentUser = {
  id: "user1",
  user: "Albert"
};

const michaleUser = {
  id: "user2",
  user: "Michale Suyama"
};
</script>
```

**Required User Properties:**
- `id` - Unique identifier (distinguishes users)
- `user` - Display name

### User with Avatar URL

```vue
<script setup>
const currentUser = {
  id: "user1",
  user: "Albert",
  avatarUrl: "https://example.com/avatars/albert.png"
};
</script>
```

**Avatar Fallback:** If `avatarUrl` is not provided, initials are displayed.

### User with Avatar Background Color

```vue
<script setup>
const michaleUser = {
  id: "user2",
  user: "Michale Suyama",
  avatarBgColor: "#4CAF50"
};
</script>
```

**Color Format:** Hexadecimal color code (e.g., "#FF5733")

### User with Status Icon

```vue
<script setup>
const currentUser = {
  id: "user1",
  user: "Albert",
  statusIconCss: "e-icons e-user-online"
};
</script>
```

**Predefined Status Icons:**
| Status | Icon Class |
|--------|------------|
| Available | `e-user-online` |
| Away | `e-user-away` |
| Busy | `e-user-busy` |
| Offline | `e-user-offline` |

### User with Custom CSS Class

```vue
<script setup>
const michaleUser = {
  id: "user2",
  user: "Michale Suyama",
  cssClass: "premium-user"
};
</script>

<style>
.premium-user .e-chat-message {
  background-color: #FFF9C4;
}
</style>
```

### Complete User Configuration

```vue
<script setup>
const currentUser = {
  id: "user1",
  user: "Albert Johnson",
  avatarUrl: "./assets/albert.png",
  avatarBgColor: "#2196F3",
  statusIconCss: "e-icons e-user-online",
  cssClass: "admin-user"
};
</script>
```

## Timestamps

### Show/Hide Timestamps

```vue
<template>
  <ejs-chatui 
    :user="currentUser" 
    :showTimeStamp="false"
  >
    <e-messages>
      <e-message :author="currentUser" text="Message without timestamp"></e-message>
    </e-messages>
  </ejs-chatui>
</template>
```

### Custom Timestamp

```vue
<e-message 
  :author="currentUser" 
  text="Scheduled message"
  :timestamp="new Date('2026-03-27T15:30:00')"
></e-message>
```

### Timestamp Format

**Default Format:** `dd/MM/yyyy hh:mm a`

**Custom Format:**
```vue
<e-message 
  :author="currentUser" 
  text="Custom format"
  timestampFormat="MMMM dd, yyyy hh:mm a"
></e-message>
```

**Format Examples:**
- `"dd/MM/yyyy hh:mm a"` → 27/03/2026 03:30 PM
- `"MMMM dd, hh:mm a"` → March 27, 03:30 PM
- `"hh:mm a"` → 03:30 PM
- `"MMM dd"` → Mar 27

## Auto Scroll

Automatically scroll to the bottom when new messages are added:

```vue
<template>
  <div class="chat-container">
    <ejs-chatui 
      :user="currentUser" 
      :autoScrollToBottom="true"
    >
      <e-messages>
        <e-message :author="currentUser" text="Message 1"></e-message>
        <e-message :author="michaleUser" text="Message 2"></e-message>
        <e-message :author="currentUser" text="Message 3"></e-message>
      </e-messages>
    </ejs-chatui>
  </div>
</template>
```

**Behavior:**
- Scrolls to bottom for each sent message
- Scrolls when scroll position is already at bottom
- Does not scroll if user is viewing older messages

**Use Cases:**
- Real-time chat applications
- Continuous conversation flow
- Bot interactions

## Suggestions

Provide quick-reply options above the input field:

```vue
<template>
  <div class="chat-container">
    <ejs-chatui 
      :user="currentUser" 
      :suggestions="suggestions"
    >
      <e-messages>
        <e-message :author="currentUser" text="What can you help me with?"></e-message>
      </e-messages>
    </ejs-chatui>
  </div>
</template>

<script setup>
import { ChatUIComponent as EjsChatui, MessagesDirective as EMessages, MessageDirective as EMessage } from "@syncfusion/ej2-vue-interactive-chat";

const currentUser = { id: "user1", user: "Albert" };

const suggestions = [
  "Tell me more",
  "That sounds good!",
  "I need help with this",
  "Can you clarify?"
];
</script>
```

**Behavior:**
- Suggestions appear as clickable chips
- Clicking a suggestion sends it as a message
- Useful for guided conversations and bot interactions

## Message Toolbar

Configure toolbar actions for each message:

### Default Toolbar

By default, messages have these toolbar actions:
- **Copy** - Copy message text
- **Reply** - Reply to message
- **Pin** - Pin/unpin message
- **Delete** - Delete message

### Custom Toolbar Width

```vue
<template>
  <ejs-chatui 
    :user="currentUser"
    :messageToolbarSettings="{ width: '80%' }"
  >
    <e-messages>
      <e-message :author="currentUser" text="Message with custom toolbar"></e-message>
    </e-messages>
  </ejs-chatui>
</template>
```

### Custom Toolbar Items

```vue
<template>
  <ejs-chatui 
    :user="currentUser"
    :messageToolbarSettings="toolbarSettings"
  >
    <e-messages>
      <e-message :author="currentUser" text="Message with custom toolbar"></e-message>
    </e-messages>
  </ejs-chatui>
</template>

<script setup>
import { ref } from 'vue';
import { ChatUIComponent as EjsChatui, MessagesDirective as EMessages, MessageDirective as EMessage } from '@syncfusion/ej2-vue-interactive-chat';

const currentUser = { id: 'user1', user: 'Albert' };

const toolbarSettings = {
  items: [
    { type: 'Button', iconCss: 'e-icons e-chat-forward', tooltip: 'Forward' },
    { type: 'Button', iconCss: 'e-icons e-chat-copy', tooltip: 'Copy' },
    { type: 'Button', iconCss: 'e-icons e-chat-reply', tooltip: 'Reply' },
    { type: 'Button', iconCss: 'e-icons e-chat-pin', tooltip: 'Pin' },
    { type: 'Button', iconCss: 'e-icons e-chat-trash', tooltip: 'Delete' }
  ]
};
</script>
```

### Toolbar Item Click Event

Handle custom actions when toolbar items are clicked:

```vue
<template>
  <ejs-chatui 
    ref="chatRef"
    :user="currentUser"
    :messageToolbarSettings="toolbarSettings"
  >
    <e-messages>
      <e-message :author="currentUser" text="Click toolbar to interact"></e-message>
    </e-messages>
  </ejs-chatui>
</template>

<script setup>
import { ref } from 'vue';
import { ChatUIComponent as EjsChatui, MessagesDirective as EMessages, MessageDirective as EMessage } from '@syncfusion/ej2-vue-interactive-chat';

const chatRef = ref(null);
const currentUser = { id: 'user1', user: 'Albert' };

const toolbarSettings = {
  items: [
    { type: 'Button', iconCss: 'e-icons e-chat-forward', tooltip: 'Forward' },
    { type: 'Button', iconCss: 'e-icons e-chat-copy', tooltip: 'Copy' }
  ],
  itemClicked: (args) => {
    if (args.item.iconCss === 'e-icons e-chat-forward') {
      const forwardedMessage = {
        text: args.message.text,
        author: currentUser,
        isForwarded: true,
        timestamp: new Date()
      };
      chatRef.value.ej2Instances.addMessage(forwardedMessage);
    }
  }
};
</script>
```

## Markdown Support

Render rich-formatted text using Markdown syntax:

### Prerequisites

Include these libraries in your HTML:

```html
<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/dompurify/2.4.0/purify.min.js"></script>
```

### Markdown Implementation

```vue
<template>
  <div class="chat-container">
    <ejs-chatui
      ref="chatRef"
      :user="currentUser"
      :messages="chatMessages"
      :suggestions="suggestionTexts"
      @messageSend="onMessageSend"
    ></ejs-chatui>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ChatUIComponent as EjsChatui } from '@syncfusion/ej2-vue-interactive-chat';
import { marked } from 'marked';

declare var DOMPurify: any;

const currentUser = { id: 'user1', user: 'Albert' };
const michaleUser = { id: 'user2', user: 'Michale' };

const suggestions = [
  {
    displayText: 'Share quick link',
    markdownText: 'Check out our [project dashboard](https://dashboard.example.com)!'
  },
  {
    displayText: 'Emphasize priority',
    markdownText: 'This is **high priority** and needs _immediate attention_.'
  }
];

const suggestionTexts = suggestions.map(s => s.displayText);

const chatMessages = ref([
  {
    text: marked.parse('Did you review the _new API documentation_?'),
    author: currentUser,
    timestamp: new Date()
  },
  {
    text: marked.parse('Yes! The **endpoint specifications** look great.'),
    author: michaleUser,
    timestamp: new Date()
  }
]);

const onMessageSend = (args) => {
  args.cancel = true;
  const suggestion = suggestions.find(s => s.displayText === args.message.text);
  const messageText = suggestion ? suggestion.markdownText : args.message.text;
  const parsedText = DOMPurify.sanitize(marked.parse(messageText));
  
  chatMessages.value.push({
    text: parsedText,
    author: currentUser,
    timestamp: new Date()
  });
};
</script>
```

**Supported Markdown Syntax:**
- **Bold:** `**text**` or `__text__`
- *Italic:* `*text*` or `_text_`
- [Links](url): `[Link text](url)`
- Lists: `- Item` or `1. Item`
- Code: `` `code` ``

**⚠️ Security:** Always sanitize Markdown output with DOMPurify to prevent XSS attacks.

## Common Scenarios

### Customer Support Chat

```vue
<script setup>
const agent = { id: "agent1", user: "Support Agent", avatarBgColor: "#4CAF50" };
const customer = { id: "cust1", user: "John Doe", avatarBgColor: "#2196F3" };

const messages = ref([
  {
    text: "Hi! I need help with my order #12345",
    author: customer,
    timestamp: new Date('2026-03-27T10:00:00')
  },
  {
    text: "Hello John! I'll be happy to help. Let me look up your order.",
    author: agent,
    timestamp: new Date('2026-03-27T10:01:00')
  },
  {
    text: "Your order has been shipped and should arrive by Friday.",
    author: agent,
    timestamp: new Date('2026-03-27T10:02:00'),
    isPinned: true
  }
]);
</script>
```

### Team Collaboration

```vue
<script setup>
const messages = ref([
  {
    text: "@Alice can you review the latest PR?",
    author: { id: "u1", user: "Bob" },
    mentionUsers: [{ id: "u2", user: "Alice" }],
    timestamp: new Date()
  },
  {
    text: "Sure! I'll review it today.",
    author: { id: "u2", user: "Alice" },
    timestamp: new Date(),
    replyTo: {
      messageID: "msg-1",
      text: "@Alice can you review the latest PR?",
      user: { id: "u1", user: "Bob" }
    }
  }
]);
</script>
```

### Bot Conversation

```vue
<script setup>
const user = { id: "user1", user: "User" };
const bot = { id: "bot1", user: "Assistant", avatarBgColor: "#9C27B0" };

const suggestions = [
  "Tell me more",
  "Show me examples",
  "How does it work?"
];

const messages = ref([
  {
    text: "Hello! How can I assist you today?",
    author: bot,
    timestamp: new Date()
  }
]);
</script>
```
