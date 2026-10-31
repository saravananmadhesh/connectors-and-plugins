# Events and Methods

**Context**: When you need to respond to user interactions or programmatically control the Chat UI component.

**Navigation**: This reference covers all events fired by the Chat UI and methods available for programmatic control.

## Table of Contents

- [Events](#events)
  - [created](#created)
  - [messageSend](#messagesend)
  - [userTyping](#usertyping)
  - [mentionSelect](#mentionselect)
  - [Attachment Events](#attachment-events)
  - [Toolbar Events](#toolbar-events)
- [Methods](#methods)
  - [addMessage](#addmessage)
  - [updateMessage](#updatemessage)
  - [scrollToBottom](#scrolltobottom)
  - [focus](#focus)

## Events

Events allow you to respond to user interactions and component lifecycle changes.

### created

**When to use**: Perform actions after the Chat UI component has been fully initialized and rendered.

**Event arguments**: None

```vue
<template>
  <div class="chat-container">
    <ejs-chatui 
      :user="currentUser"
      :created="onCreated"
    ></ejs-chatui>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ChatUIComponent as EjsChatui } from "@syncfusion/ej2-vue-interactive-chat";

const currentUser = ref({
  id: "user1",
  user: "Albert"
});

const onCreated = () => {
  console.log('Chat UI has been initialized');
  // Load chat history, connect to services, etc.
};
</script>
```

**Common use cases**:

```vue
<script setup>
import { ref } from 'vue';
import { ChatUIComponent as EjsChatui } from "@syncfusion/ej2-vue-interactive-chat";

const chatInstance = ref(null);
const currentUser = ref({
  id: "user1",
  user: "Albert"
});

const onCreated = () => {
  // Load chat history from API
  loadChatHistory();
  
  // Connect to real-time service
  connectToWebSocket();
  
  // Set focus to input
  setTimeout(() => {
    chatInstance.value?.focus();
  }, 100);
};

const loadChatHistory = async () => {
  // Fetch and add previous messages
  const history = await fetchChatHistory();
  history.forEach(msg => {
    chatInstance.value?.addMessage(msg);
  });
};

const connectToWebSocket = () => {
  // Establish WebSocket connection
  console.log('Connecting to real-time service...');
};
</script>
```

### messageSend

**When to use**: Intercept and process messages before they are sent, or send messages to external services.

**Event arguments**:
- `args.message`: The message object being sent
- `args.cancel`: Set to `true` to prevent the message from being added

```vue
<template>
  <div class="chat-container">
    <ejs-chatui 
      :user="currentUser"
      :messageSend="onMessageSend"
    ></ejs-chatui>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ChatUIComponent as EjsChatui } from "@syncfusion/ej2-vue-interactive-chat";

const currentUser = ref({
  id: "user1",
  user: "Albert"
});

const onMessageSend = (args) => {
  console.log('Sending message:', args.message);
  
  // Send to backend
  sendToServer(args.message);
};

const sendToServer = async (message) => {
  try {
    await fetch('/api/chat/send', {
      method: 'POST',
      body: JSON.stringify(message),
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Failed to send message:', error);
  }
};
</script>
```

**Validation and cancellation**:

```vue
<script setup>
import { ref } from 'vue';
import { ChatUIComponent as EjsChatui } from "@syncfusion/ej2-vue-interactive-chat";

const currentUser = ref({
  id: "user1",
  user: "Albert"
});

const onMessageSend = (args) => {
  // Validate message content
  if (!args.message.text || args.message.text.trim().length === 0) {
    args.cancel = true;
    console.log('Empty message blocked');
    return;
  }
  
  // Check message length
  if (args.message.text.length > 1000) {
    args.cancel = true;
    alert('Message is too long (max 1000 characters)');
    return;
  }
  
  // Filter inappropriate content
  if (containsProfanity(args.message.text)) {
    args.cancel = true;
    alert('Please avoid inappropriate language');
    return;
  }
  
  // Add timestamp
  args.message.timestamp = new Date();
};

const containsProfanity = (text) => {
  // Implement profanity filter
  return false;
};
</script>
```

### userTyping

**When to use**: Detect when the user is typing to show typing indicators to other participants.

**Event arguments**:
- `args.user`: The user who is typing
- `args.isTyping`: Boolean indicating typing state

```vue
<template>
  <div class="chat-container">
    <ejs-chatui 
      :user="currentUser"
      :userTyping="onUserTyping"
    ></ejs-chatui>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ChatUIComponent as EjsChatui } from "@syncfusion/ej2-vue-interactive-chat";

const currentUser = ref({
  id: "user1",
  user: "Albert"
});

const onUserTyping = (args) => {
  console.log(`${args.user.user} is typing:`, args.isTyping);
  
  // Broadcast typing status to other users
  broadcastTypingStatus(args.user, args.isTyping);
};

const broadcastTypingStatus = (user, isTyping) => {
  // Send typing indicator to other participants
  // via WebSocket or similar real-time service
  console.log('Broadcasting typing status...');
};
</script>
```

**Debounced typing indicator**:

```vue
<script setup>
import { ref } from 'vue';
import { ChatUIComponent as EjsChatui } from "@syncfusion/ej2-vue-interactive-chat";

const currentUser = ref({
  id: "user1",
  user: "Albert"
});

let typingTimeout = null;

const onUserTyping = (args) => {
  if (args.isTyping) {
    // User started typing
    clearTimeout(typingTimeout);
    sendTypingStatus(true);
    
    // Stop typing indicator after 3 seconds of inactivity
    typingTimeout = setTimeout(() => {
      sendTypingStatus(false);
    }, 3000);
  } else {
    // User stopped typing
    clearTimeout(typingTimeout);
    sendTypingStatus(false);
  }
};

const sendTypingStatus = (isTyping) => {
  // Send to real-time service
  console.log('Typing status:', isTyping);
};
</script>
```

### mentionSelect

**When to use**: Handle when a user selects someone from the @mention suggestions list.

**Event arguments**:
- `args.user`: The selected user object
- `args.mentionText`: The text that will replace the mention

```vue
<template>
  <div class="chat-container">
    <ejs-chatui 
      :user="currentUser"
      :mentionUsers="mentionUsers"
      mentionTriggerChar="@"
      :mentionSelect="onMentionSelect"
    ></ejs-chatui>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ChatUIComponent as EjsChatui } from "@syncfusion/ej2-vue-interactive-chat";

const currentUser = ref({
  id: "user1",
  user: "Albert"
});

const mentionUsers = ref([
  { id: "user2", user: "Michale Suyama" },
  { id: "user3", user: "Reena" },
  { id: "user4", user: "Janet Leverling" }
]);

const onMentionSelect = (args) => {
  console.log('User mentioned:', args.user);
  
  // Track mention for notifications
  trackMention(args.user);
  
  // You can modify the mention text if needed
  // args.mentionText = `@${args.user.user}`;
};

const trackMention = (user) => {
  // Send notification to mentioned user
  console.log(`Sending notification to ${user.user}`);
};
</script>
```

### Attachment Events

Events related to file attachment operations.

#### beforeAttachmentUpload

**When to use**: Validate files before uploading or modify upload settings.

**Event arguments**:
- `args.files`: Array of files to be uploaded
- `args.cancel`: Set to `true` to prevent upload

```vue
<template>
  <div class="chat-container">
    <ejs-chatui 
      :user="currentUser"
      enableAttachments="true"
      :attachmentSettings="attachmentSettings"
      :beforeAttachmentUpload="onBeforeUpload"
    ></ejs-chatui>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ChatUIComponent as EjsChatui } from "@syncfusion/ej2-vue-interactive-chat";

const currentUser = ref({
  id: "user1",
  user: "Albert"
});

const attachmentSettings = ref({
  saveUrl: 'https://api.example.com/upload',
  maxFileSize: 5242880, // 5MB
  allowedFileTypes: '.jpg,.png,.pdf,.doc'
});

const onBeforeUpload = (args) => {
  const files = [args.fileData];
  // Validate file size
  const oversizedFiles = files.filter(f => f.size > 5242880);
  if (oversizedFiles.length > 0) {
    args.cancel = true;
    alert('One or more files exceed the 5MB limit');
    return;
  }
  
  // Validate file type
  const invalidFiles = files.filter(f => {
    const ext = f.name.substring(f.name.lastIndexOf('.'));
    return !['.jpg', '.png', '.pdf', '.doc'].includes(ext.toLowerCase());
  });
  
  if (invalidFiles.length > 0) {
    args.cancel = true;
    alert('Invalid file type');
    return;
  }
  
  console.log('Uploading files:', files);
};
</script>
```

#### attachmentUploadSuccess

**When to use**: Handle successful file uploads.

**Event arguments**:
- `args.file`: The uploaded file
- `args.response`: Server response

```vue
<script setup>
import { ref } from 'vue';
import { ChatUIComponent as EjsChatui } from "@syncfusion/ej2-vue-interactive-chat";

const currentUser = ref({
  id: "user1",
  user: "Albert"
});

const onUploadSuccess = (args) => {
  console.log('File uploaded successfully:', args.file.name);
  console.log('Server response:', args.response);
  
  // Update UI or notify user
  showNotification(`${args.file.name} uploaded successfully`);
};

const showNotification = (message) => {
  // Display success notification
  console.log(message);
};
</script>
```

#### attachmentUploadFailure

**When to use**: Handle upload errors.

**Event arguments**:
- `args.file`: The file that failed to upload
- `args.error`: Error information

```vue
<script setup>
import { ref } from 'vue';
import { ChatUIComponent as EjsChatui } from "@syncfusion/ej2-vue-interactive-chat";

const currentUser = ref({
  id: "user1",
  user: "Albert"
});

const onUploadFailure = (args) => {
  console.error('Upload failed:', args.file.name, args.error);
  
  // Retry logic
  if (confirm(`Failed to upload ${args.file.name}. Retry?`)) {
    retryUpload(args.file);
  }
};

const retryUpload = (file) => {
  // Implement retry logic
  console.log('Retrying upload for:', file.name);
};
</script>
```

#### attachmentRemoved

**When to use**: Handle when a user removes an attachment before sending.

**Event arguments**:
- `args.file`: The removed file

```vue
<script setup>
import { ref } from 'vue';
import { ChatUIComponent as EjsChatui } from "@syncfusion/ej2-vue-interactive-chat";

const currentUser = ref({
  id: "user1",
  user: "Albert"
});

const onAttachmentRemoved = (args) => {
  console.log('Attachment removed:', args.file.name);
  
  // Clean up any associated data
  removeFileFromCache(args.file);
};

const removeFileFromCache = (file) => {
  // Remove from local cache or state
  console.log('Cleaning up:', file.name);
};
</script>
```

#### attachmentClick

**When to use**: Handle clicks on attachments in messages.

**Event arguments**:
- `args.file`: The clicked file attachment
- `args.message`: The message containing the attachment

```vue
<script setup>
import { ref } from 'vue';
import { ChatUIComponent as EjsChatui } from "@syncfusion/ej2-vue-interactive-chat";

const currentUser = ref({
  id: "user1",
  user: "Albert"
});

const onAttachmentClick = (args) => {
  console.log('Attachment clicked:', args.file.name);
  
  // Open file preview or download
  previewOrDownloadFile(args.file);
};

const previewOrDownloadFile = (file) => {
  // Open file in new tab or trigger download
  window.open(file.url, '_blank');
};
</script>
```

### Toolbar Events

#### Header Toolbar itemClicked

**When to use**: Handle clicks on custom header toolbar items.

**Event arguments**:
- `args.item`: The clicked toolbar item
- `args.originalEvent`: The original click event

```vue
<template>
  <div class="chat-container">
    <ejs-chatui 
      :user="currentUser"
      :headerToolbar="headerToolbar"
      @headerToolbarItemClicked="onToolbarClick"
    ></ejs-chatui>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ChatUIComponent as EjsChatui } from "@syncfusion/ej2-vue-interactive-chat";

const currentUser = ref({
  id: "user1",
  user: "Albert"
});

const headerToolbar = ref({
  items: [
    { type: 'Button', iconCss: 'e-icons e-search', tooltip: 'Search' },
    { type: 'Button', iconCss: 'e-icons e-settings', tooltip: 'Settings' },
    { type: 'Button', iconCss: 'e-icons e-more-vertical', tooltip: 'More' }
  ]
});

const onToolbarClick = (args) => {
  const tooltip = args.item.tooltip;
  
  switch(tooltip) {
    case 'Search':
      openSearch();
      break;
    case 'Settings':
      openSettings();
      break;
    case 'More':
      showMoreOptions();
      break;
  }
};

const openSearch = () => {
  console.log('Opening search...');
};

const openSettings = () => {
  console.log('Opening settings...');
};

const showMoreOptions = () => {
  console.log('Showing more options...');
};
</script>
```

#### Message Toolbar itemClicked

**When to use**: Handle clicks on message toolbar items (Reply, Copy, Delete, etc.).

**Event arguments**:
- `args.item`: The clicked toolbar item
- `args.message`: The message associated with the toolbar

```vue
<template>
  <div class="chat-container">
    <ejs-chatui 
      :user="currentUser"
      :messageToolbarSettings="messageToolbarSettings"
    >
      <e-messages>
        <e-message 
          :author="currentUser" 
          text="Hello everyone!"
          id="msg1"
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

const messageToolbarSettings = ref({
  items: ['Reply', 'Copy', 'Pin', 'Delete'],
  itemClicked: (args) => {
    const action = args.item;
    const message = args.message;
    
    switch(action) {
      case 'Reply':
        handleReply(message);
        break;
      case 'Copy':
        copyToClipboard(message.text);
        break;
      case 'Pin':
        togglePin(message);
        break;
      case 'Delete':
        deleteMessage(message);
        break;
    }
  }
});

const handleReply = (message) => {
  console.log('Replying to:', message.text);
};

const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text);
  console.log('Copied to clipboard');
};

const togglePin = (message) => {
  message.isPinned = !message.isPinned;
  console.log('Pin toggled');
};

const deleteMessage = (message) => {
  if (confirm('Delete this message?')) {
    console.log('Deleting message:', message.id);
  }
};
</script>
```

## Methods

Methods allow you to programmatically control the Chat UI component.

### addMessage

**Purpose**: Programmatically add a new message to the chat.

**Parameters**:
- `message`: Can be a string or a `MessageModel` object

**Returns**: void

#### Add Message as String

```vue
<template>
  <div class="chat-container">
    <button @click="addSimpleMessage" class="e-btn e-primary">
      Add Message
    </button>
    <ejs-chatui ref="chatInstance" :user="currentUser"></ejs-chatui>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ChatUIComponent as EjsChatui } from "@syncfusion/ej2-vue-interactive-chat";

const chatInstance = ref(null);

const currentUser = ref({
  id: "user1",
  user: "Albert"
});

const addSimpleMessage = () => {
  chatInstance.value.addMessage('This is a simple text message');
};
</script>
```

#### Add Message as Object

```vue
<template>
  <div class="chat-container">
    <button @click="addDetailedMessage" class="e-btn e-primary">
      Add Detailed Message
    </button>
    <ejs-chatui ref="chatInstance" :user="currentUser"></ejs-chatui>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ChatUIComponent as EjsChatui } from "@syncfusion/ej2-vue-interactive-chat";

const chatInstance = ref(null);

const currentUser = ref({
  id: "user1",
  user: "Albert"
});

const otherUser = ref({
  id: "user2",
  user: "Michale Suyama"
});

const addDetailedMessage = () => {
  chatInstance.value.addMessage({
    author: otherUser.value,
    text: "Great! Let me know if there's anything that needs adjustment.",
    timestamp: new Date(),
    isPinned: false
  });
};
</script>
```

#### Bot Response Pattern

```vue
<script setup>
import { ref } from 'vue';
import { ChatUIComponent as EjsChatui } from "@syncfusion/ej2-vue-interactive-chat";

const chatInstance = ref(null);

const currentUser = ref({
  id: "user1",
  user: "User"
});

const botUser = ref({
  id: "bot",
  user: "Support Bot",
  avatarUrl: "/assets/bot-avatar.png"
});

const onMessageSend = async (args) => {
  // Show typing indicator
  showTypingIndicator();
  
  // Get bot response
  const response = await getBotResponse(args.message.text);
  
  // Hide typing indicator
  hideTypingIndicator();
  
  // Add bot response
  setTimeout(() => {
    chatInstance.value.addMessage({
      author: botUser.value,
      text: response
    });
  }, 500);
};

const getBotResponse = async (userMessage) => {
  // Call bot API
  return "This is an automated response";
};

const showTypingIndicator = () => {
  // Show bot is typing
};

const hideTypingIndicator = () => {
  // Hide typing indicator
};
</script>
```

### updateMessage

**Purpose**: Modify an existing message in the chat.

**Parameters**:
- `message`: Updated message object
- `messageId`: ID of the message to update

**Returns**: void

```vue
<template>
  <div class="chat-container">
    <button @click="editMessage" class="e-btn e-primary">
      Edit Message
    </button>
    <ejs-chatui ref="chatInstance" :user="currentUser">
      <e-messages>
        <e-message 
          :author="currentUser" 
          text="Original message text"
          id="msg1"
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

const chatInstance = ref(null);

const currentUser = ref({
  id: "user1",
  user: "Albert"
});

const editMessage = () => {
  chatInstance.value.updateMessage(
    {
      text: "Updated message text (edited)",
      author: currentUser.value
    },
    'msg1'
  );
};
</script>
```

**Update with additional properties**:

```vue
<script setup>
import { ref } from 'vue';
import { ChatUIComponent as EjsChatui } from "@syncfusion/ej2-vue-interactive-chat";

const chatInstance = ref(null);

const currentUser = ref({
  id: "user1",
  user: "Albert"
});

const updateMessageStatus = (messageId, status) => {
  chatInstance.value.updateMessage(
    {
      status: status,
      author: currentUser.value
    },
    messageId
  );
};

// Usage
// updateMessageStatus('msg1', 'delivered');
// updateMessageStatus('msg2', 'read');
</script>
```

### scrollToBottom

**Purpose**: Scroll the chat view to the most recent message.

**Parameters**: None

**Returns**: void

```vue
<template>
  <div class="chat-container">
    <button @click="scrollToLatest" class="e-btn e-flat scroll-btn">
      <span class="e-icons e-chevron-down"></span>
      New messages
    </button>
    <ejs-chatui ref="chatInstance" :user="currentUser">
      <e-messages>
        <e-message :author="currentUser" text="Message 1" />
        <e-message :author="otherUser" text="Message 2" />
        <e-message :author="currentUser" text="Message 3" />
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

const currentUser = ref({
  id: "user1",
  user: "Albert"
});

const otherUser = ref({
  id: "user2",
  user: "Michale Suyama"
});

const scrollToLatest = () => {
  chatInstance.value.scrollToBottom();
};
</script>
```

**Auto-scroll on new message**:

```vue
<script setup>
import { ref } from 'vue';
import { ChatUIComponent as EjsChatui } from "@syncfusion/ej2-vue-interactive-chat";

const chatInstance = ref(null);

const currentUser = ref({
  id: "user1",
  user: "Albert"
});

const onMessageSend = (args) => {
  // Scroll to bottom after message is sent
  setTimeout(() => {
    chatInstance.value?.scrollToBottom();
  }, 100);
};

// Listen for new messages from other users
const onNewMessageReceived = (message) => {
  chatInstance.value?.addMessage(message);
  
  // Auto-scroll if user is near bottom
  chatInstance.value?.scrollToBottom();
};
</script>
```

### focus

**Purpose**: Set focus to the Chat UI input field.

**Parameters**: None

**Returns**: void

```vue
<template>
  <div class="chat-container">
    <button @click="focusInput" class="e-btn e-primary">
      Focus Chat Input
    </button>
    <ejs-chatui ref="chatInstance" :user="currentUser"></ejs-chatui>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { ChatUIComponent as EjsChatui } from "@syncfusion/ej2-vue-interactive-chat";

const chatInstance = ref(null);

const currentUser = ref({
  id: "user1",
  user: "Albert"
});

const focusInput = () => {
  chatInstance.value?.focus();
};

// Auto-focus on mount
onMounted(() => {
  setTimeout(() => {
    chatInstance.value?.focus();
  }, 100);
});
</script>
```

## Complete Example with Events and Methods

```vue
<template>
  <div class="chat-app">
    <div class="chat-header">
      <button @click="loadHistory" class="e-btn e-flat">Load History</button>
      <button @click="clearChat" class="e-btn e-flat">Clear Chat</button>
      <button @click="scrollToLatest" class="e-btn e-flat">Scroll Down</button>
    </div>
    
    <ejs-chatui 
      ref="chatInstance"
      :user="currentUser"
      :created="onCreated"
      :messageSend="onMessageSend"
      :userTyping="onUserTyping"
      :mentionSelect="onMentionSelect"
      :mentionUsers="mentionUsers"
      :headerToolbar="headerToolbar"
      :beforeAttachmentUpload="onBeforeUpload"
      :attachmentUploadSuccess="onUploadSuccess"
    >
      <e-messages>
        <e-message 
          v-for="msg in messages" 
          :key="msg.id"
          :id="msg.id"
          :author="msg.author"
          :text="msg.text"
          :timestamp="msg.timestamp"
        />
      </e-messages>
    </ejs-chatui>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { 
  ChatUIComponent as EjsChatui,
  MessagesDirective as EMessages,
  MessageDirective as EMessage 
} from "@syncfusion/ej2-vue-interactive-chat";

const chatInstance = ref(null);

const currentUser = ref({
  id: "user1",
  user: "Albert"
});

const botUser = ref({
  id: "bot",
  user: "Assistant"
});

const mentionUsers = ref([
  { id: "user2", user: "Michale" },
  { id: "user3", user: "Reena" }
]);

const messages = ref([]);

const headerToolbar = ref({
  items: [
    { type: 'Button', iconCss: 'e-icons e-refresh', tooltip: 'Refresh' }
  ]
});

// Events
const onCreated = () => {
  console.log('Chat initialized');
  chatInstance.value?.focus();
};

const onMessageSend = async (args) => {
  console.log('Message sent:', args.message.text);
  
  // Get bot response
  setTimeout(() => {
    chatInstance.value.addMessage({
      author: botUser.value,
      text: `You said: "${args.message.text}"`
    });
  }, 1000);
};

const onUserTyping = (args) => {
  console.log('User typing:', args.isTyping);
};

const onMentionSelect = (args) => {
  console.log('Mentioned user:', args.user.user);
};

const onBeforeUpload = (args) => {
  console.log('Uploading files:', args.files.length);
};

const onUploadSuccess = (args) => {
  console.log('Upload successful:', args.file.name);
};

// Methods
const loadHistory = () => {
  // Load previous messages
  const history = [
    { id: '1', author: botUser.value, text: 'Welcome!', timestamp: new Date() }
  ];
  
  history.forEach(msg => {
    chatInstance.value?.addMessage(msg);
  });
};

const clearChat = () => {
  if (confirm('Clear all messages?')) {
    messages.value = [];
  }
};

const scrollToLatest = () => {
  chatInstance.value?.scrollToBottom();
};

onMounted(() => {
  loadHistory();
});
</script>
```

## Related Topics

- [Getting Started](./getting-started.md) - Initial setup and configuration
- [Messages](./messages.md) - Message configuration and properties
- [Advanced Features](./advanced-features.md) - Mentions, attachments, and toolbar
- [Templates](./templates.md) - Customize component appearance
