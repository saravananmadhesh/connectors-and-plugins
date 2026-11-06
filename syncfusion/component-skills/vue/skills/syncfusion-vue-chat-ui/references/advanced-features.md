# Advanced Features

## Table of Contents
- [@Mentions](#mentions)
- [File Attachments](#file-attachments)
- [Message Toolbar](#message-toolbar)
- [Load on Demand](#load-on-demand)
- [Auto Scroll](#auto-scroll)
- [Suggestions](#suggestions)

## @Mentions

Enable users to mention others in messages with automatic suggestion popup.

### Basic Mention Configuration

```vue
<script setup>
const currentUser = { id: "user1", user: "Albert" };

const mentionUsers = [
  { id: "user1", user: "Albert" },
  { id: "user2", user: "Michale Suyama" },
  { id: "user3", user: "Janet Leverling" },
  { id: "user4", user: "Andrew Fuller" }
];
</script>

<template>
  <ejs-chatui 
    :user="currentUser"
    mentionTriggerChar="@"
    :mentionUsers="mentionUsers"
  ></ejs-chatui>
</template>
```

**Behavior:**
- Typing `@` triggers mention popup
- Filters users as you type
- Select user to insert mention
- Mention highlighted in message

### Custom Trigger Character

```vue
<template>
  <ejs-chatui 
    :user="currentUser"
    mentionTriggerChar="/"
    :mentionUsers="mentionUsers"
  ></ejs-chatui>
</template>
```

**Alternative Triggers:**
- `@` - Standard (default)
- `/` - Slack-style commands
- `#` - Hashtag-style
- Any single character

### Predefined Mentions in Messages

```vue
<template>
  <ejs-chatui :user="currentUser">
    <e-messages>
      <e-message 
        :author="currentUser" 
        text="Hi {0}, can you review this?"
        :mentionUsers="[michaleUser]"
      ></e-message>
      <e-message 
        :author="michaleUser" 
        text="Sure {0}, I'll check it today."
        :mentionUsers="[currentUser]"
      ></e-message>
    </e-messages>
  </ejs-chatui>
</template>

<script setup>
const currentUser = { id: "user1", user: "Albert" };
const michaleUser = { id: "user2", user: "Michale" };
</script>
```

**Placeholder Mapping:**
- `{0}` → First user in `mentionUsers` array
- `{1}` → Second user
- `{2}` → Third user, etc.

### Mention Select Event

Handle mention selection with custom logic:

```vue
<script setup>
import { ref } from 'vue';

const mentionUsers = [
  { id: "user1", user: "Albert" },
  { id: "user2", user: "Michale" }
];

const onMentionSelect = (args) => {
  console.log('Mentioned user:', args.itemData);
  console.log('Event:', args.event);
  console.log('Is user interaction:', args.isInteracted);
  
  // Cancel mention insertion if needed
  // args.cancel = true;
};
</script>

<template>
  <ejs-chatui 
    :user="{ id: 'user1', user: 'Albert' }"
    :mentionUsers="mentionUsers"
    @mentionSelect="onMentionSelect"
  ></ejs-chatui>
</template>
```

## File Attachments

Enable file upload and sharing within messages.

### Enable Attachments

```vue
<template>
  <ejs-chatui 
    :user="currentUser"
    :enableAttachments="true"
    :attachmentSettings="attachmentSettings"
  ></ejs-chatui>
</template>

<script setup>
const currentUser = { id: "user1", user: "Albert" };

const attachmentSettings = {
  saveUrl: 'https://api.example.com/upload',
  removeUrl: 'https://api.example.com/remove'
};
</script>
```

### Attachment Configuration

```vue
<script setup>
const attachmentSettings = {
  saveUrl: 'https://api.example.com/upload',
  removeUrl: 'https://api.example.com/remove',
  allowedFileTypes: '.jpg,.png,.pdf,.docx',
  maxFileSize: 5242880, // 5MB in bytes
  maximumCount: 3,
  enableDragAndDrop: true
};
</script>
```

**Configuration Options:**
- `saveUrl` - Upload endpoint (required)
- `removeUrl` - Delete endpoint (required)
- `allowedFileTypes` - File extension filter
- `maxFileSize` - Max size in bytes (default: 30MB)
- `maximumCount` - Max files per message (default: 10)
- `enableDragAndDrop` - Drag-drop support (default: true)

### Save Format

```vue
<script setup>
const attachmentSettings = {
  saveUrl: 'https://api.example.com/upload',
  saveFormat: 'Base64' // or 'Blob'
};
</script>
```

**Formats:**
- `Blob` - Fast, memory-efficient (default)
- `Base64` - Data URL format

### Server Path

```vue
<script setup>
const attachmentSettings = {
  saveUrl: 'https://api.example.com/upload',
  path: 'https://cdn.example.com/uploads/'
};
</script>
```

### Attachment Events

```vue
<script setup>
const handleBeforeUpload = (args) => {
  console.log('Before upload:', args.file);
  // Cancel upload if needed
  // args.cancel = true;
};

const handleUploadSuccess = (args) => {
  console.log('Upload successful:', args.file);
};

const handleUploadFailure = (args) => {
  console.log('Upload failed:', args.file);
};

const handleAttachmentRemoved = (args) => {
  console.log('Attachment removed:', args.file);
};

const handleAttachmentClick = (args) => {
  console.log('Attachment clicked:', args.file);
  // Cancel preview if needed
  // args.cancel = true;
};
</script>

<template>
  <ejs-chatui 
    :user="currentUser"
    :enableAttachments="true"
    :attachmentSettings="attachmentSettings"
    @beforeAttachmentUpload="handleBeforeUpload"
    @attachmentUploadSuccess="handleUploadSuccess"
    @attachmentUploadFailure="handleUploadFailure"
    @attachmentRemoved="handleAttachmentRemoved"
    @attachmentClick="handleAttachmentClick"
  ></ejs-chatui>
</template>
```

### Custom Attachment Template

Display attachments with custom HTML and styling:

```vue
<template>
  <ejs-chatui 
    :user="currentUser"
    :enableAttachments="true"
    :attachmentSettings="attachmentSettings"
  ></ejs-chatui>
</template>

<script setup>
const currentUser = { id: "user1", user: "Albert" };

const attachmentSettings = {
  saveUrl: 'https://api.example.com/upload',
  attachmentTemplate: (file) => {
    const sizeKB = (file.size / 1024).toFixed(2);
    return `
      <div class="custom-attachment">
        <span class="file-icon">📎</span>
        <div class="file-info">
          <span class="file-name">${file.name}</span>
          <span class="file-size">${sizeKB} KB</span>
        </div>
      </div>
    `;
  }
};
</script>

<style>
.custom-attachment {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  background-color: #f5f5f5;
  border-radius: 8px;
  margin: 4px 0;
}

.custom-attachment .file-icon {
  font-size: 20px;
}

.custom-attachment .file-info {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.custom-attachment .file-name {
  font-weight: 600;
  color: #333;
  font-size: 13px;
}

.custom-attachment .file-size {
  font-size: 11px;
  color: #999;
}
</style>
```

### Custom Preview Template

Show file previews based on file type:

```vue
<template>
  <ejs-chatui 
    :user="currentUser"
    :enableAttachments="true"
    :attachmentSettings="attachmentSettings"
  ></ejs-chatui>
</template>

<script setup>
const currentUser = { id: "user1", user: "Albert" };

const attachmentSettings = {
  saveUrl: 'https://api.example.com/upload',
  previewTemplate: (file) => {
    if (file.type.startsWith('image/')) {
      // Image preview with thumbnail
      return `
        <div class="image-preview">
          <img src="${file.url}" alt="${file.name}" />
          <p>${file.name}</p>
        </div>
      `;
    } else if (file.type === 'application/pdf') {
      // PDF with icon
      return `
        <div class="file-preview pdf-preview">
          <span class="pdf-icon">📄</span>
          <p>${file.name}</p>
        </div>
      `;
    } else {
      // Generic file preview
      return `
        <div class="file-preview">
          <span class="generic-icon">📎</span>
          <p>${file.name}</p>
        </div>
      `;
    }
  }
};
</script>

<style>
.image-preview {
  text-align: center;
  padding: 8px;
}

.image-preview img {
  max-width: 150px;
  max-height: 150px;
  border-radius: 8px;
  margin-bottom: 8px;
}

.image-preview p {
  margin: 0;
  font-size: 12px;
  color: #666;
  word-break: break-all;
}

.file-preview {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 12px;
  background: #f9f9f9;
  border-radius: 8px;
}

.file-preview p {
  margin: 0;
  font-size: 12px;
  color: #666;
}

.pdf-preview .pdf-icon {
  font-size: 32px;
}

.file-preview .generic-icon {
  font-size: 24px;
}
</style>
```

### Advanced Template with Metadata

Display rich attachment information with file metadata:

```vue
<template>
  <ejs-chatui 
    :user="currentUser"
    :enableAttachments="true"
    :attachmentSettings="attachmentSettings"
  ></ejs-chatui>
</template>

<script setup>
import { ref } from 'vue';

const currentUser = { id: "user1", user: "Albert" };

const getFileIcon = (filename) => {
  if (filename.endsWith('.pdf')) return '📄';
  if (filename.endsWith('.doc') || filename.endsWith('.docx')) return '📝';
  if (filename.endsWith('.jpg') || filename.endsWith('.png') || filename.endsWith('.gif')) return '🖼️';
  if (filename.endsWith('.zip') || filename.endsWith('.rar')) return '📦';
  if (filename.endsWith('.xlsx') || filename.endsWith('.xls')) return '📊';
  if (filename.endsWith('.pptx') || filename.endsWith('.ppt')) return '🎯';
  return '📎';
};

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
};

const attachmentSettings = ref({
  saveUrl: 'https://api.example.com/upload',
  attachmentTemplate: (file) => {
    const icon = getFileIcon(file.name);
    const size = formatFileSize(file.size);
    
    return `
      <div class="advanced-attachment">
        <div class="attachment-icon">${icon}</div>
        <div class="attachment-details">
          <div class="attachment-name" title="${file.name}">${file.name}</div>
          <div class="attachment-meta">
            <span class="attachment-size">${size}</span>
            <span class="attachment-divider">•</span>
            <span class="attachment-date">${formatDate(file.modified)}</span>
          </div>
        </div>
        <button class="attachment-action" data-action="download">⬇️</button>
      </div>
    `;
  },
  previewTemplate: (file) => {
    if (file.type.startsWith('image/')) {
      return `
        <div class="enhanced-image-preview">
          <img src="${file.url}" alt="${file.name}" />
          <div class="preview-footer">
            <span class="preview-name">${file.name}</span>
            <span class="preview-size">${formatFileSize(file.size)}</span>
          </div>
        </div>
      `;
    } else {
      return `
        <div class="enhanced-file-preview">
          <span class="large-icon">${getFileIcon(file.name)}</span>
          <div class="preview-info">
            <p class="preview-name">${file.name}</p>
            <p class="preview-meta">${formatFileSize(file.size)} • ${file.type}</p>
          </div>
        </div>
      `;
    }
  }
});
</script>

<style>
.advanced-attachment {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  border-radius: 8px;
  margin: 6px 0;
  border-left: 4px solid #667eea;
}

.attachment-icon {
  font-size: 24px;
  flex-shrink: 0;
}

.attachment-details {
  flex: 1;
  min-width: 0;
}

.attachment-name {
  font-weight: 600;
  color: #333;
  font-size: 13px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.attachment-meta {
  font-size: 11px;
  color: #999;
  margin-top: 2px;
}

.attachment-divider {
  margin: 0 4px;
}

.attachment-action {
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  padding: 4px;
  flex-shrink: 0;
}

.attachment-action:hover {
  opacity: 0.7;
}

/* Enhanced Preview Styles */
.enhanced-image-preview {
  text-align: center;
}

.enhanced-image-preview img {
  max-width: 200px;
  max-height: 200px;
  border-radius: 8px;
  margin-bottom: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.preview-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: #666;
}

.enhanced-file-preview {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: #f9f9f9;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
}

.large-icon {
  font-size: 40px;
  flex-shrink: 0;
}

.preview-info {
  flex: 1;
}

.preview-name {
  font-weight: 600;
  color: #333;
  margin: 0;
  word-break: break-all;
}

.preview-meta {
  font-size: 12px;
  color: #999;
  margin: 4px 0 0 0;
}
</style>
```

### Template with User Interaction

Handle attachment actions with custom logic:

```vue
<script setup>
import { ref } from 'vue';

const currentUser = { id: "user1", user: "Albert" };

const handleAttachmentAction = (action, file) => {
  switch(action) {
    case 'download':
      console.log('Downloading:', file.name);
      // Implement download logic
      break;
    case 'preview':
      console.log('Previewing:', file.name);
      // Open preview modal
      break;
    case 'delete':
      console.log('Deleting:', file.name);
      // Remove attachment
      break;
  }
};

const attachmentSettings = {
  saveUrl: 'https://api.example.com/upload',
  attachmentTemplate: (file) => {
    return `
      <div class="interactive-attachment">
        <span class="file-icon">📎</span>
        <span class="file-name">${file.name}</span>
        <div class="attachment-actions">
          <button onclick="handlePreview('${file.id}')" title="Preview">👁️</button>
          <button onclick="handleDownload('${file.id}')" title="Download">⬇️</button>
          <button onclick="handleDelete('${file.id}')" title="Delete">🗑️</button>
        </div>
      </div>
    `;
  }
};
</script>

<style>
.interactive-attachment {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  background-color: #f5f5f5;
  border-radius: 8px;
  margin: 4px 0;
}

.attachment-actions {
  display: flex;
  gap: 4px;
  margin-left: auto;
}

.attachment-actions button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
  padding: 4px 8px;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.attachment-actions button:hover {
  background-color: #e0e0e0;
}
</style>
```

## Message Toolbar

Configure toolbar actions for each message (Reply, Pin, Delete, Copy, Forward).

### Default Toolbar

Messages automatically have these toolbar actions:
- Copy - Copy message text
- Reply - Reply to message
- Pin - Pin/unpin message
- Delete - Delete message

### Custom Toolbar

```vue
<script setup>
const messageToolbarSettings = {
  items: [
    { type: 'Button', iconCss: 'e-icons e-chat-forward', tooltip: 'Forward' },
    { type: 'Button', iconCss: 'e-icons e-chat-copy', tooltip: 'Copy' },
    { type: 'Button', iconCss: 'e-icons e-chat-reply', tooltip: 'Reply' },
    { type: 'Button', iconCss: 'e-icons e-chat-pin', tooltip: 'Pin' },
    { type: 'Button', iconCss: 'e-icons e-chat-trash', tooltip: 'Delete' }
  ]
};
</script>

<template>
  <ejs-chatui 
    :user="currentUser"
    :messageToolbarSettings="messageToolbarSettings"
  ></ejs-chatui>
</template>
```

### Toolbar Width

```vue
<script setup>
const messageToolbarSettings = {
  width: '80%'
};
</script>
```

### Toolbar Item Click Event

```vue
<script setup>
import { ref } from 'vue';

const chatRef = ref(null);

const messageToolbarSettings = {
  items: [
    { type: 'Button', iconCss: 'e-icons e-chat-forward', tooltip: 'Forward' },
    { type: 'Button', iconCss: 'e-icons e-chat-copy', tooltip: 'Copy' },
    { type: 'Button', iconCss: 'e-icons e-chat-reply', tooltip: 'Reply' }
  ],
  itemClicked: (args) => {
    console.log('Toolbar item clicked:', args.item);
    console.log('Message:', args.message);
    
    if (args.item.tooltip === 'Forward') {
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

<template>
  <ejs-chatui 
    ref="chatRef"
    :user="currentUser"
    :messageToolbarSettings="messageToolbarSettings"
  ></ejs-chatui>
</template>
```

## Load on Demand

Dynamically load messages as user scrolls, improving performance for long conversations.

### Enable Load on Demand

```vue
<script setup>
import { ref } from 'vue';

const currentUser = { id: "user1", user: "Albert" };
const michaleUser = { id: "user2", user: "Michale" };

// Generate large message list
const chatMessages = ref(
  Array.from({ length: 150 }, (_, i) => ({
    text: i % 2 === 0 
      ? `Message ${i + 1} from Michale`
      : `Message ${i + 1} from Albert`,
    author: i % 2 === 0 ? michaleUser : currentUser,
    timestamp: new Date(Date.now() - (150 - i) * 60000)
  }))
);
</script>

<template>
  <ejs-chatui 
    :user="currentUser"
    :loadOnDemand="true"
    :messages="chatMessages"
  ></ejs-chatui>
</template>
```

**Behavior:**
- Messages load progressively as user scrolls up
- Reduces initial load time
- Improves performance for long conversations
- Automatic pagination

**Use Cases:**
- Conversations with 100+ messages
- Mobile applications with limited memory
- Performance-critical applications
- Chat history viewers

## Auto Scroll

Automatically scroll to latest message when new messages arrive.

### Enable Auto Scroll

```vue
<template>
  <ejs-chatui 
    :user="currentUser"
    :autoScrollToBottom="true"
  ></ejs-chatui>
</template>
```

**Default:** `false`

**Behavior:**
- Scrolls to bottom when current user sends message
- Scrolls if already at bottom when new message arrives
- Does NOT scroll if user is viewing older messages

**Use Cases:**
- Real-time chat applications
- Bot conversations
- Live support chats
- Continuous conversation flow

## Suggestions

Quick-reply options displayed above input field.

### Basic Suggestions

```vue
<script setup>
const suggestions = [
  "Yes, I agree",
  "No, thanks",
  "Tell me more",
  "I need help"
];
</script>

<template>
  <ejs-chatui 
    :user="currentUser"
    :suggestions="suggestions"
  ></ejs-chatui>
</template>
```

**Behavior:**
- Displayed as clickable chips above input
- Clicking sends as message
- Useful for guided conversations

### Dynamic Suggestions

```vue
<script setup>
import { ref } from 'vue';

const suggestions = ref([
  "What services do you offer?",
  "How can I contact support?",
  "Tell me about pricing"
]);

const updateSuggestions = (newSuggestions) => {
  suggestions.value = newSuggestions;
};
</script>
```

### Contextual Suggestions

```vue
<script setup>
import { ref } from 'vue';

const currentStep = ref('initial');

const suggestionMap = {
  initial: ["Get Started", "Learn More", "Contact Sales"],
  support: ["Technical Issue", "Billing Question", "General Inquiry"],
  feedback: ["Excellent", "Good", "Needs Improvement"]
};

const suggestions = ref(suggestionMap.initial);

const onMessageSend = (args) => {
  if (args.message.text === "Get Started") {
    suggestions.value = suggestionMap.support;
  }
};
</script>
```

### Suggestion Template

```vue
<script setup>
const suggestionTemplate = (data) => {
  return `
    <div class="custom-suggestion">
      <span class="icon">💬</span>
      <span class="text">${data}</span>
    </div>
  `;
};
</script>

<template>
  <ejs-chatui 
    :user="currentUser"
    :suggestions="suggestions"
    :suggestionTemplate="suggestionTemplate"
  ></ejs-chatui>
</template>

<style>
.custom-suggestion {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: #f5f5f5;
  border-radius: 16px;
  cursor: pointer;
}

.custom-suggestion:hover {
  background: #e0e0e0;
}
</style>
```

## Complete Advanced Features Example

```vue
<template>
  <div class="chat-wrapper">
    <ejs-chatui 
      ref="chatRef"
      :user="currentUser"
      :enableAttachments="true"
      :attachmentSettings="attachmentSettings"
      mentionTriggerChar="@"
      :mentionUsers="mentionUsers"
      :messageToolbarSettings="messageToolbarSettings"
      :loadOnDemand="true"
      :autoScrollToBottom="true"
      :suggestions="suggestions"
      :messages="messages"
      @mentionSelect="onMentionSelect"
      @beforeAttachmentUpload="handleBeforeUpload"
      @attachmentUploadSuccess="handleUploadSuccess"
    ></ejs-chatui>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ChatUIComponent as EjsChatui } from '@syncfusion/ej2-vue-interactive-chat';

const chatRef = ref(null);

const currentUser = { id: 'user1', user: 'Albert' };
const michaleUser = { id: 'user2', user: 'Michale' };

const mentionUsers = [currentUser, michaleUser];

const attachmentSettings = {
  saveUrl: 'https://api.example.com/upload',
  removeUrl: 'https://api.example.com/remove',
  allowedFileTypes: '.jpg,.png,.pdf,.docx',
  maxFileSize: 5242880,
  maximumCount: 3
};

const messageToolbarSettings = {
  items: [
    { type: 'Button', iconCss: 'e-icons e-chat-forward', tooltip: 'Forward' },
    { type: 'Button', iconCss: 'e-icons e-chat-copy', tooltip: 'Copy' },
    { type: 'Button', iconCss: 'e-icons e-chat-reply', tooltip: 'Reply' },
    { type: 'Button', iconCss: 'e-icons e-chat-pin', tooltip: 'Pin' }
  ],
  itemClicked: (args) => {
    console.log('Action:', args.item.tooltip);
  }
};

const suggestions = ['Yes', 'No', 'Tell me more', 'I need help'];

const messages = ref([
  {
    text: "Hello! How can I help you?",
    author: michaleUser,
    timestamp: new Date()
  }
]);

const onMentionSelect = (args) => {
  console.log('Mentioned:', args.itemData.user);
};

const handleBeforeUpload = (args) => {
  console.log('Uploading:', args.file.name);
};

const handleUploadSuccess = (args) => {
  console.log('Upload success:', args.file.name);
};
</script>

<style>
.chat-wrapper {
  width: 500px;
  height: 600px;
  margin: 0 auto;
}
</style>
```
