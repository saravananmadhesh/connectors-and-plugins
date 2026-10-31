# Templates

**Context**: When you need to customize the visual appearance and layout of various Chat UI elements beyond the default styles.

**Navigation**: This reference provides template customization patterns for all templatable areas in the Chat UI component.

## Table of Contents

- [Overview](#overview)
- [Empty Chat Template](#empty-chat-template)
- [Message Template](#message-template)
- [Time Break Template](#time-break-template)
- [Typing Users Template](#typing-users-template)
- [Suggestion Template](#suggestion-template)
- [Footer Template](#footer-template)

## Overview

The Chat UI component provides template support for customizing:

- **Empty Chat**: Welcome screen when no messages exist
- **Messages**: Individual message appearance
- **Time Breaks**: Date/time separators between messages
- **Typing Users**: Typing indicator display
- **Suggestions**: Quick reply buttons
- **Footer**: Input area and send controls

Each template receives context data specific to what it's rendering.

## Empty Chat Template

**When to use**: Display custom welcome content, branding, or instructions when the chat is empty.

### Basic Empty Chat Template

```vue
<template>
  <div class="chat-container">
    <ejs-chatui :user="currentUser">
      <template v-slot:emptyChatTemplate="">
        <div class="welcome-screen">
          <h3>Welcome to Support Chat</h3>
          <p>How can we help you today?</p>
        </div>
      </template>
    </ejs-chatui>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ChatUIComponent as EjsChatui } from "@syncfusion/ej2-vue-interactive-chat";

const currentUser = ref({
  id: "user1",
  user: "Albert"
});
</script>

<style scoped>
.welcome-screen {
  text-align: center;
  padding: 40px;
  color: #666;
}
</style>
```

### Empty Chat with Icons

```vue
<template>
  <div class="chat-container">
    <ejs-chatui :user="currentUser">
      <template v-slot:emptyChatTemplate="">
        <div class="empty-chat-content">
          <span class="e-icons e-comment-show empty-icon"></span>
          <h4>No Messages Yet</h4>
          <p>Start a conversation to see your messages here.</p>
        </div>
      </template>
    </ejs-chatui>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ChatUIComponent as EjsChatui } from "@syncfusion/ej2-vue-interactive-chat";

const currentUser = ref({
  id: "user1",
  user: "Albert"
});
</script>

<style scoped>
.empty-chat-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 10px;
}

.empty-icon {
  font-size: 48px;
  color: #ccc;
}
</style>
```

## Message Template

**When to use**: Customize the layout, styling, or structure of individual chat messages.

**Template context**: 
- `data.message`: The message object (text, author, timestamp, etc.)
- `data.index`: Message position in the list

### Custom Message Layout

```vue
<template>
  <div class="chat-container">
    <ejs-chatui :user="currentUser">
      <template v-slot:messageTemplate="{ data }">
        <div class="custom-message">
          <div class="message-header">
            <strong>{{ data.message.author.user }}</strong>
            <span class="message-time">{{ formatTime(data.message.timestamp) }}</span>
          </div>
          <div class="message-content">{{ data.message.text }}</div>
        </div>
      </template>
      <e-messages>
        <e-message :author="currentUser" text="Hi, how are you?" />
        <e-message :author="otherUser" text="I'm doing great, thanks!" />
      </e-messages>
    </ejs-chatui>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { 
  ChatUIComponent as EjsChatui,
  MessagesDirective as EMessages,
  MessageDirective as EMessage 
} from "@syncfusion/ej2-vue-interactive-chat";

const currentUser = ref({
  id: "user1",
  user: "Albert"
});

const otherUser = ref({
  id: "user2",
  user: "Michale Suyama"
});

const formatTime = (timestamp) => {
  if (!timestamp) return '';
  const date = new Date(timestamp);
  return date.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
};
</script>

<style scoped>
.custom-message {
  padding: 12px;
  margin: 8px 0;
  background: #f5f5f5;
  border-radius: 8px;
}

.message-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
  font-size: 12px;
}

.message-time {
  color: #999;
}

.message-content {
  font-size: 14px;
}
</style>
```

### Conditional Message Styling

```vue
<template>
  <div class="chat-container">
    <ejs-chatui :user="currentUser">
      <template v-slot:messageTemplate="{ data }">
        <div 
          class="message-bubble"
          :class="{ 
            'own-message': data.message.author.id === currentUser.id,
            'pinned-message': data.message.isPinned 
          }"
        >
          <div class="message-text">{{ data.message.text }}</div>
          <div v-if="data.message.isPinned" class="pin-indicator">
            <span class="e-icons e-pin"></span>
          </div>
        </div>
      </template>
      <e-messages>
        <e-message 
          :author="currentUser" 
          text="This is my message" 
        />
        <e-message 
          :author="otherUser" 
          text="Important: Meeting at 3 PM" 
          :isPinned="true" 
        />
      </e-messages>
    </ejs-chatui>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { 
  ChatUIComponent as EjsChatui,
  MessagesDirective as EMessages,
  MessageDirective as EMessage 
} from "@syncfusion/ej2-vue-interactive-chat";

const currentUser = ref({
  id: "user1",
  user: "Albert"
});

const otherUser = ref({
  id: "user2",
  user: "Michale Suyama"
});
</script>

<style scoped>
.message-bubble {
  padding: 10px 14px;
  border-radius: 16px;
  max-width: 70%;
  background: #e3e3e3;
}

.own-message {
  background: #007bff;
  color: white;
  margin-left: auto;
}

.pinned-message {
  border: 2px solid #ffc107;
}

.pin-indicator {
  display: inline-block;
  margin-left: 8px;
  color: #ffc107;
}
</style>
```

## Time Break Template

**When to use**: Customize the date/time separators that appear between messages.

**Template context**:
- `data.messageDate`: The date for the time break

### Custom Time Break Format

```vue
<template>
  <div class="chat-container">
    <ejs-chatui 
      :user="currentUser" 
      :showTimeBreak="true"
    >
      <template v-slot:timeBreakTemplate="{ data }">
        <div class="time-separator">
          <span class="separator-line"></span>
          <span class="separator-text">{{ formatTimeBreak(data.messageDate) }}</span>
          <span class="separator-line"></span>
        </div>
      </template>
      <e-messages>
        <e-message 
          :author="currentUser" 
          text="Good morning!"
          :timestamp="new Date('2024-01-15 09:00')"
        />
        <e-message 
          :author="otherUser" 
          text="Hi there!"
          :timestamp="new Date('2024-01-16 10:00')"
        />
      </e-messages>
    </ejs-chatui>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { 
  ChatUIComponent as EjsChatui,
  MessagesDirective as EMessages,
  MessageDirective as EMessage 
} from "@syncfusion/ej2-vue-interactive-chat";

const currentUser = ref({
  id: "user1",
  user: "Albert"
});

const otherUser = ref({
  id: "user2",
  user: "Michale Suyama"
});

const formatTimeBreak = (messageDate) => {
  const date = new Date(messageDate);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  if (date.toDateString() === today.toDateString()) {
    return 'Today';
  } else if (date.toDateString() === yesterday.toDateString()) {
    return 'Yesterday';
  } else {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  }
};
</script>

<style scoped>
.time-separator {
  display: flex;
  align-items: center;
  margin: 20px 0;
  gap: 10px;
}

.separator-line {
  flex: 1;
  height: 1px;
  background: #ddd;
}

.separator-text {
  font-size: 12px;
  color: #999;
  font-weight: 500;
}
</style>
```

### Detailed Time Break

```vue
<template>
  <div class="chat-container">
    <ejs-chatui 
      :user="currentUser" 
      :showTimeBreak="true"
    >
      <template v-slot:timeBreakTemplate="{ data }">
        <div class="detailed-timebreak">
          {{ getDetailedTimeBreak(data.messageDate) }}
        </div>
      </template>
      <e-messages>
        <e-message 
          :author="currentUser" 
          text="Morning message"
          :timestamp="new Date('2024-12-25 07:30')"
        />
        <e-message 
          :author="otherUser" 
          text="Afternoon message"
          :timestamp="new Date('2024-12-25 14:00')"
        />
      </e-messages>
    </ejs-chatui>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { 
  ChatUIComponent as EjsChatui,
  MessagesDirective as EMessages,
  MessageDirective as EMessage 
} from "@syncfusion/ej2-vue-interactive-chat";

const currentUser = ref({
  id: "user1",
  user: "Albert"
});

const otherUser = ref({
  id: "user2",
  user: "Michale Suyama"
});

const getDetailedTimeBreak = (messageDate) => {
  const date = new Date(messageDate);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  
  return `${day}/${month}/${year} ${displayHours}:${minutes} ${ampm}`;
};
</script>

<style scoped>
.detailed-timebreak {
  text-align: center;
  padding: 8px;
  margin: 16px 0;
  background: #f0f0f0;
  border-radius: 4px;
  font-size: 11px;
  color: #666;
}
</style>
```

## Typing Users Template

**When to use**: Customize the appearance of the typing indicator when users are typing.

**Template context**:
- `data.users`: Array of users currently typing

### Custom Typing Indicator

```vue
<template>
  <div class="chat-container">
    <ejs-chatui 
      :user="currentUser" 
      :typingUsers="typingUsers"
    >
      <template v-slot:typingUsersTemplate="{ data }">
        <div class="typing-indicator">
          <span class="typing-dots">
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
          </span>
          <span class="typing-text">
            {{ getTypingText(data.users) }}
          </span>
        </div>
      </template>
      <e-messages>
        <e-message :author="currentUser" text="Are you there?" />
      </e-messages>
    </ejs-chatui>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { 
  ChatUIComponent as EjsChatui,
  MessagesDirective as EMessages,
  MessageDirective as EMessage 
} from "@syncfusion/ej2-vue-interactive-chat";

const currentUser = ref({
  id: "user1",
  user: "Albert"
});

const otherUser = ref({
  id: "user2",
  user: "Michale Suyama"
});

const typingUsers = ref([otherUser.value]);

const getTypingText = (users) => {
  if (!users || users.length === 0) return '';
  
  if (users.length === 1) {
    return `${users[0].user} is typing...`;
  } else if (users.length === 2) {
    return `${users[0].user} and ${users[1].user} are typing...`;
  } else {
    return `${users.length} people are typing...`;
  }
};
</script>

<style scoped>
.typing-indicator {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  font-size: 13px;
  color: #666;
}

.typing-dots {
  display: flex;
  gap: 4px;
}

.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #999;
  animation: bounce 1.4s infinite ease-in-out;
}

.dot:nth-child(1) {
  animation-delay: -0.32s;
}

.dot:nth-child(2) {
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
</style>
```

### Multiple Users Typing

```vue
<template>
  <div class="chat-container">
    <ejs-chatui 
      :user="currentUser" 
      :typingUsers="typingUsers"
    >
      <template v-slot:typingUsersTemplate="{ data }">
        <div class="multi-user-typing">
          <span v-html="getTypingUsersList(data.users) + ' are typing...'"></span>
        </div>
      </template>
      <e-messages>
        <e-message :author="currentUser" text="Hello everyone!" />
      </e-messages>
    </ejs-chatui>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { 
  ChatUIComponent as EjsChatui,
  MessagesDirective as EMessages,
  MessageDirective as EMessage 
} from "@syncfusion/ej2-vue-interactive-chat";

const currentUser = ref({
  id: "user1",
  user: "Albert"
});

const michaleUser = ref({
  id: "user2",
  user: "Michale Suyama"
});

const reenaUser = ref({
  id: "user3",
  user: "Reena"
});

const typingUsers = ref([michaleUser.value, reenaUser.value]);

const getTypingUsersList = (users) => {
  if (!users || users.length === 0) return '';
  
  return users.map((user, i) => {
    const isLastUser = i === users.length - 1;
    return `${isLastUser && i > 0 ? 'and ' : ''}<strong>${user.user}</strong>`;
  }).join(' ');
};
</script>

<style scoped>
.multi-user-typing {
  padding: 8px 12px;
  font-size: 13px;
  color: #666;
  font-style: italic;
}
</style>
```

## Suggestion Template

**When to use**: Customize the appearance and layout of suggestion (quick reply) buttons.

**Template context**:
- `data.suggestion`: The suggestion text
- `data.index`: Position in the suggestions list

### Custom Suggestion Buttons

```vue
<template>
  <div class="chat-container">
    <ejs-chatui 
      :user="currentUser" 
      :suggestions="suggestions"
    >
      <template v-slot:suggestionTemplate="{ data }">
        <div class="custom-suggestion">
          <span class="suggestion-icon">💬</span>
          <span class="suggestion-text">{{ data.suggestion }}</span>
        </div>
      </template>
      <e-messages>
        <e-message :author="otherUser" text="How can I help you?" />
      </e-messages>
    </ejs-chatui>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { 
  ChatUIComponent as EjsChatui,
  MessagesDirective as EMessages,
  MessageDirective as EMessage 
} from "@syncfusion/ej2-vue-interactive-chat";

const currentUser = ref({
  id: "user1",
  user: "Albert"
});

const otherUser = ref({
  id: "user2",
  user: "Support Agent"
});

const suggestions = ref([
  "Check order status",
  "Track shipment",
  "Return item",
  "Contact support"
]);
</script>

<style scoped>
.custom-suggestion {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: #fff;
  border: 2px solid #007bff;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s;
}

.custom-suggestion:hover {
  background: #007bff;
  color: white;
}

.suggestion-icon {
  font-size: 16px;
}

.suggestion-text {
  font-size: 14px;
  font-weight: 500;
}
</style>
```

### Styled Suggestion Chips

```vue
<template>
  <div class="chat-container">
    <ejs-chatui 
      :user="currentUser" 
      :suggestions="suggestions"
    >
      <template v-slot:suggestionTemplate="{ data }">
        <div class="suggestion-chip" :class="`chip-${data.index % 3}`">
          {{ data.suggestion }}
        </div>
      </template>
      <e-messages>
        <e-message :author="otherUser" text="What would you like to do?" />
      </e-messages>
    </ejs-chatui>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { 
  ChatUIComponent as EjsChatui,
  MessagesDirective as EMessages,
  MessageDirective as EMessage 
} from "@syncfusion/ej2-vue-interactive-chat";

const currentUser = ref({
  id: "user1",
  user: "Albert"
});

const otherUser = ref({
  id: "user2",
  user: "Bot"
});

const suggestions = ref([
  "Yes, please",
  "No, thanks",
  "Tell me more"
]);
</script>

<style scoped>
.suggestion-chip {
  padding: 8px 16px;
  border-radius: 16px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: transform 0.2s;
}

.suggestion-chip:hover {
  transform: scale(1.05);
}

.chip-0 {
  background: #e3f2fd;
  color: #1976d2;
}

.chip-1 {
  background: #f3e5f5;
  color: #7b1fa2;
}

.chip-2 {
  background: #e8f5e9;
  color: #388e3c;
}
</style>
```

## Footer Template

**When to use**: Completely customize the input area, replacing the default footer with custom controls.

**Use case**: Custom send buttons, additional action buttons, or specialized input handling.

### Custom Footer with Send Button

```vue
<template>
  <div class="chat-container">
    <ejs-chatui ref="chatInstance" :user="currentUser">
      <template v-slot:footerTemplate="">
        <div class="custom-footer">
          <input 
            v-model="messageText"
            @keyup.enter="sendMessage"
            class="custom-input e-input" 
            placeholder="Type your message..."
          />
          <button 
            @click="sendMessage" 
            class="e-btn e-primary send-button"
          >
            <span class="e-icons e-send"></span>
          </button>
        </div>
      </template>
      <e-messages>
        <e-message :author="currentUser" text="Hello!" />
      </e-messages>
    </ejs-chatui>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { 
  ChatUIComponent as EjsChatui,
  MessagesDirective as EMessages,
  MessageDirective as EMessage 
} from "@syncfusion/ej2-vue-interactive-chat";

const chatInstance = ref(null);
const messageText = ref('');

const currentUser = ref({
  id: "user1",
  user: "Albert"
});

const sendMessage = () => {
  if (messageText.value.trim()) {
    chatInstance.value.addMessage({
      author: currentUser.value,
      text: messageText.value
    });
    messageText.value = '';
  }
};
</script>

<style scoped>
.custom-footer {
  display: flex;
  gap: 8px;
  padding: 12px;
  border-top: 1px solid #ddd;
  background: #fff;
}

.custom-input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 20px;
}

.send-button {
  border-radius: 50%;
  width: 40px;
  height: 40px;
  padding: 0;
}
</style>
```

### Advanced Footer with Multiple Actions

```vue
<template>
  <div class="chat-container">
    <ejs-chatui ref="chatInstance" :user="currentUser">
      <template v-slot:footerTemplate="">
        <div class="advanced-footer">
          <div class="footer-actions">
            <button 
              @click="attachFile" 
              class="e-btn e-flat action-button"
              title="Attach file"
            >
              <span class="e-icons e-attachment"></span>
            </button>
            <button 
              @click="toggleEmoji" 
              class="e-btn e-flat action-button"
              title="Add emoji"
            >
              <span class="e-icons e-emoji"></span>
            </button>
          </div>
          <input 
            v-model="messageText"
            @keyup.enter="sendMessage"
            class="footer-input e-input" 
            placeholder="Type a message..."
          />
          <button 
            @click="sendMessage" 
            class="e-btn e-primary send-btn"
          >
            Send
          </button>
        </div>
      </template>
      <e-messages>
        <e-message :author="currentUser" text="Hi there!" />
      </e-messages>
    </ejs-chatui>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { 
  ChatUIComponent as EjsChatui,
  MessagesDirective as EMessages,
  MessageDirective as EMessage 
} from "@syncfusion/ej2-vue-interactive-chat";

const chatInstance = ref(null);
const messageText = ref('');

const currentUser = ref({
  id: "user1",
  user: "Albert"
});

const sendMessage = () => {
  if (messageText.value.trim()) {
    chatInstance.value.addMessage({
      author: currentUser.value,
      text: messageText.value
    });
    messageText.value = '';
  }
};

const attachFile = () => {
  console.log('Attach file clicked');
  // Implement file attachment logic
};

const toggleEmoji = () => {
  console.log('Emoji picker clicked');
  // Implement emoji picker logic
};
</script>

<style scoped>
.advanced-footer {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  border-top: 1px solid #ddd;
  background: #fafafa;
}

.footer-actions {
  display: flex;
  gap: 4px;
}

.action-button {
  width: 36px;
  height: 36px;
  padding: 0;
  border-radius: 50%;
}

.footer-input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 20px;
}

.send-btn {
  min-width: 70px;
  border-radius: 20px;
}
</style>
```

## Related Topics

- [Getting Started](./getting-started.md) - Initial setup and basic usage
- [Messages](./messages.md) - Message configuration and management
- [Appearance](./appearance.md) - Visual customization options
- [Events and Methods](./events-methods.md) - Event handling and API methods
