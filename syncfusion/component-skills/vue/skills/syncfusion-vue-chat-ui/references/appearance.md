# Appearance and Styling

This guide covers visual customization, dimensions, layout modes, and styling options for the Vue Chat UI component.

## Component Dimensions

### Setting Width

Control the chat component width:

```vue
<template>
  <ejs-chatui width="600px" :user="currentUser"></ejs-chatui>
</template>
```

**Accepted Values:**
- Pixels: `"500px"`, `"100px"`
- Percentage: `"100%"`, `"50%"`
- Auto: `"auto"`
- Number (treated as pixels): `500`

**Default:** `"100%"`

### Setting Height

Control the chat component height:

```vue
<template>
  <ejs-chatui height="400px" :user="currentUser"></ejs-chatui>
</template>
```

**Accepted Values:**
- Pixels: `"400px"`, `"600px"`
- Percentage: `"100%"`, `"80vh"`
- Number (treated as pixels): `400`

**Default:** `"100%"`

### Responsive Sizing

```vue
<template>
  <div class="chat-wrapper">
    <ejs-chatui 
      width="100%" 
      height="100%" 
      :user="currentUser"
    ></ejs-chatui>
  </div>
</template>

<style>
.chat-wrapper {
  width: clamp(300px, 90vw, 600px);
  height: clamp(400px, 80vh, 700px);
  margin: 0 auto;
}
</style>
```

## CSS Class Customization

### Basic CSS Class

Apply custom styling with the `cssClass` property:

```vue
<template>
  <ejs-chatui 
    cssClass="custom-chat-theme"
    :user="currentUser"
  ></ejs-chatui>
</template>

<style>
.custom-chat-theme .e-chat-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.custom-chat-theme .e-chat-input {
  border-radius: 20px;
  background-color: #f5f5f5;
}
</style>
```

### Multiple CSS Classes

Combine multiple CSS classes for complex styling with proper CSS cascade:

```vue
<template>
  <ejs-chatui 
    cssClass="dark-theme rounded-corners shadow-effect"
    :user="currentUser"
  ></ejs-chatui>
</template>

<style>
/* Base theme - lowest specificity */
.dark-theme {
  background-color: #1e1e1e;
  color: #ffffff;
}

/* Shape modifier - mid specificity */
.rounded-corners .e-chat-message {
  border-radius: 12px;
  overflow: hidden;
}

/* Effect modifier - highest specificity */
.shadow-effect .e-chat-message {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  transition: box-shadow 0.3s ease;
}

.shadow-effect .e-chat-message:hover {
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.6);
}

/* Combined modifiers */
.dark-theme.rounded-corners.shadow-effect .e-chat-header {
  background: linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%);
  border-radius: 12px 12px 0 0;
}
</style>
```

### Advanced Multi-Class Styling

```vue
<template>
  <ejs-chatui 
    :cssClass="themeClasses"
    :user="currentUser"
  ></ejs-chatui>
</template>

<script setup>
import { ref, computed } from 'vue';

const isDarkMode = ref(false);
const isCompactLayout = ref(false);
const hasCustomBranding = ref(true);

// Dynamically compute CSS classes
const themeClasses = computed(() => {
  const classes = [];
  
  if (isDarkMode.value) {
    classes.push('dark-theme');
  } else {
    classes.push('light-theme');
  }
  
  if (isCompactLayout.value) {
    classes.push('compact-mode');
  } else {
    classes.push('spacious-mode');
  }
  
  if (hasCustomBranding.value) {
    classes.push('branded-ui');
  }
  
  return classes.join(' ');
});

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value;
};

const toggleLayout = () => {
  isCompactLayout.value = !isCompactLayout.value;
};
</script>

<style>
/* Dark Theme */
.dark-theme {
  background-color: #1e1e1e;
  color: #ffffff;
}

.dark-theme .e-chat-header {
  background-color: #2d2d2d;
  border-bottom: 1px solid #3d3d3d;
}

.dark-theme .e-chat-message {
  background-color: #2a2a2a;
  color: #ffffff;
}

/* Light Theme */
.light-theme {
  background-color: #ffffff;
  color: #000000;
}

.light-theme .e-chat-header {
  background-color: #f5f5f5;
  border-bottom: 1px solid #e0e0e0;
}

.light-theme .e-chat-message {
  background-color: #f0f0f0;
  color: #000000;
}

/* Compact Mode */
.compact-mode .e-chat-message {
  padding: 4px 8px;
  margin: 2px 0;
  font-size: 12px;
}

.compact-mode .e-chat-header {
  padding: 8px 12px;
}

/* Spacious Mode */
.spacious-mode .e-chat-message {
  padding: 12px 16px;
  margin: 8px 0;
  font-size: 14px;
}

.spacious-mode .e-chat-header {
  padding: 16px 20px;
}

/* Branded UI */
.branded-ui .e-chat-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.branded-ui .e-chat-message.e-current-user {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 18px;
}

/* Combined class cascading */
.dark-theme.compact-mode .e-chat-input {
  background-color: #2d2d2d;
  color: #ffffff;
  border: 1px solid #3d3d3d;
}

.light-theme.spacious-mode .e-chat-footer {
  padding: 20px;
  background-color: #fafafa;
}

.branded-ui.dark-theme .e-chat-message:not(.e-current-user) {
  background-color: #2a2a2a;
  border-left: 3px solid #667eea;
}
</style>
```

### Theme Integration with CSS Classes

Combine with built-in themes:

```vue
<script setup>
import { ref } from 'vue';

const currentTheme = ref('material3');
const customClass = ref('branded-ui');

const themeMap = {
  material3: '@syncfusion/ej2-material3-theme/styles/chat-ui/index.css',
  bootstrap5: '@syncfusion/ej2-bootstrap5-theme/styles/chat-ui/index.css',
  fluent: '@syncfusion/ej2-fluent-theme/styles/chat-ui/index.css'
};

const switchTheme = (theme) => {
  currentTheme.value = theme;
};
</script>

<template>
  <div>
    <div class="theme-selector">
      <button @click="switchTheme('material3')">Material3</button>
      <button @click="switchTheme('bootstrap5')">Bootstrap5</button>
      <button @click="switchTheme('fluent')">Fluent</button>
    </div>
    
    <ejs-chatui 
      :cssClass="customClass"
      :user="currentUser"
    ></ejs-chatui>
  </div>
</template>

<style>
/* Custom branding can override theme */
.branded-ui {
  --primary-color: #667eea;
  --secondary-color: #764ba2;
}
</style>
```

### Feature-Specific CSS Classes

```vue
<template>
  <ejs-chatui 
    :cssClass="applicableClasses"
    :user="currentUser"
  ></ejs-chatui>
</template>

<script setup>
import { computed, ref } from 'vue';

const hasAttachments = ref(true);
const showTypingIndicator = ref(true);
const isGroupChat = ref(false);

// Apply CSS classes based on features
const applicableClasses = computed(() => {
  const classes = [];
  
  if (hasAttachments.value) {
    classes.push('with-attachments');
  }
  
  if (showTypingIndicator.value) {
    classes.push('with-typing-indicator');
  }
  
  if (isGroupChat.value) {
    classes.push('group-chat-mode');
  }
  
  return classes.join(' ');
});
</script>

<style>
/* With Attachments - Adjust spacing */
.with-attachments .e-chat-footer {
  padding-bottom: 20px;
}

.with-attachments .e-attachment-area {
  border-top: 1px solid #e0e0e0;
  padding: 8px 0;
}

/* With Typing Indicator */
.with-typing-indicator .e-typing-indicator {
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

/* Group Chat Mode - Show all avatars */
.group-chat-mode .e-chat-message {
  margin-left: 50px;
}

.group-chat-mode .e-message-avatar {
  width: 40px;
  height: 40px;
}
</style>
```

### Theme-Based Styling

```vue
<script setup>
import { ref } from 'vue';

const isDarkMode = ref(false);
const cssClass = ref('light-theme');

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value;
  cssClass.value = isDarkMode.value ? 'dark-theme' : 'light-theme';
};
</script>

<template>
  <div>
    <button @click="toggleTheme">Toggle Theme</button>
    <ejs-chatui 
      :cssClass="cssClass"
      :user="currentUser"
    ></ejs-chatui>
  </div>
</template>

<style>
.light-theme {
  background-color: #ffffff;
  color: #000000;
}

.light-theme .e-chat-message {
  background-color: #f0f0f0;
}

.dark-theme {
  background-color: #2d2d2d;
  color: #ffffff;
}

.dark-theme .e-chat-message {
  background-color: #3d3d3d;
}
</style>
```

## Placeholder Text

Customize the input field placeholder:

```vue
<template>
  <ejs-chatui 
    placeholder="Type your message here..."
    :user="currentUser"
  ></ejs-chatui>
</template>
```

**Default:** `"Type your message…"`

**Examples:**
- `"Start typing..."`
- `"Send a message"`
- `"What's on your mind?"`
- `"Ask me anything"`

## Empty Chat Template

Customize the display when no messages exist:

```vue
<script setup>
const emptyChatTemplate = `
  <div class="empty-chat-state">
    <div class="icon">💬</div>
    <h3>No messages yet</h3>
    <p>Start a conversation by sending a message</p>
  </div>
`;
</script>

<template>
  <ejs-chatui 
    :user="currentUser"
    :emptyChatTemplate="emptyChatTemplate"
  ></ejs-chatui>
</template>

<style>
.empty-chat-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  text-align: center;
}

.empty-chat-state .icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.empty-chat-state h3 {
  margin: 0 0 8px 0;
  color: #333;
}

.empty-chat-state p {
  margin: 0;
  color: #666;
}
</style>
```

### Empty Template with Function

```vue
<script setup>
const emptyChatTemplate = () => {
  return `
    <div style="text-align: center; padding: 60px 20px;">
      <svg width="100" height="100" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="40" fill="#e0e0e0"/>
        <text x="50" y="60" font-size="40" text-anchor="middle">👋</text>
      </svg>
      <h2>Welcome to Chat!</h2>
      <p>Send your first message to get started</p>
    </div>
  `;
};
</script>
```

## Compact Mode

Align all messages to the left for streamlined layout:

```vue
<template>
  <ejs-chatui 
    :enableCompactMode="true"
    :user="currentUser"
  >
    <e-messages>
      <e-message :author="currentUser" text="Hello"></e-message>
      <e-message :author="otherUser" text="Hi there"></e-message>
    </e-messages>
  </ejs-chatui>
</template>
```

**Default:** `false`

**Use Cases:**
- Group conversations
- Mobile-optimized layouts
- Space-constrained interfaces
- When sender distinction is secondary

**Behavior:**
- All messages align left
- Sender name appears above message
- Avatars display for all messages
- No visual left/right distinction

## RTL (Right-to-Left) Support

Enable right-to-left layout for languages like Arabic, Hebrew:

```vue
<template>
  <ejs-chatui 
    :enableRtl="true"
    :user="currentUser"
    headerText="محادثة"
    placeholder="اكتب رسالتك..."
  >
    <e-messages>
      <e-message :author="currentUser" text="مرحبا"></e-message>
    </e-messages>
  </ejs-chatui>
</template>
```

**Default:** `false`

**RTL Behavior:**
- Messages flip horizontally
- Current user messages on left
- Other user messages on right
- Icons and buttons mirror
- Text alignment adjusts

## Persistence

Maintain component state across page reloads:

### Enable Persistence

```vue
<template>
  <div class="chat-container">
    <ejs-chatui 
      :enablePersistence="true"
      :user="currentUser"
      :messages="chatMessages"
    ></ejs-chatui>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
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
    text: "Hello! Let me know if you need any help.",
    author: michaleUser,
    timestamp: new Date()
  }
]);

onMounted(() => {
  console.log('Chat component mounted');
  console.log('Persisted messages restored:', chatMessages.value.length);
});
</script>

<style>
.chat-container {
  width: 500px;
  height: 600px;
}
</style>
```

**Default:** `false`

**Persisted State:**
- Messages collection
- Scroll position
- User input (draft message)
- Component dimensions
- Visibility settings

**Storage:** Uses browser's localStorage

### Verify Persisted State

To verify data is being persisted, open browser DevTools:

```javascript
// In browser console
localStorage.getItem('ejs_chatui') // View persisted chat state
localStorage.removeItem('ejs_chatui') // Clear persisted state
```

### Persistence with Manual State Management

```vue
<script setup>
import { ref, onBeforeUnmount } from 'vue';

const chatRef = ref(null);
const currentUser = { id: "user1", user: "Albert" };
const chatMessages = ref([]);

// Manually save state
const saveState = () => {
  const state = {
    messages: chatMessages.value,
    lastSync: new Date().toISOString()
  };
  localStorage.setItem('chat_state', JSON.stringify(state));
};

// Manually restore state
const restoreState = () => {
  const saved = localStorage.getItem('chat_state');
  if (saved) {
    const state = JSON.parse(saved);
    chatMessages.value = state.messages;
    console.log('State restored from:', state.lastSync);
  }
};

onBeforeUnmount(() => {
  saveState(); // Save before leaving
});
</script>
```

### Clear Persistence

```vue
<script setup>
const clearPersistence = () => {
  // Clear Syncfusion persisted state
  localStorage.removeItem('ejs_chatui');
  
  // Reset component state
  location.reload(); // Refresh page
};
</script>

<template>
  <button @click="clearPersistence">Clear Chat History</button>
</template>
```

## Localization

Customize component text for different languages:

```vue
<script setup>
import { L10n, setCulture } from '@syncfusion/ej2-base';

// Set French localization
L10n.load({
  'fr-FR': {
    'chatui': {
      'placeholder': 'Tapez votre message...',
      'typing': 'est en train d\'écrire...',
      'send': 'Envoyer'
    }
  }
});

setCulture('fr-FR');
</script>

<template>
  <ejs-chatui 
    locale="fr-FR"
    :user="currentUser"
  ></ejs-chatui>
</template>
```

## Built-in Themes

Syncfusion provides multiple built-in themes:

### Material3 Theme

```vue
<style>
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/chat-ui/index.css";
</style>
```

### Bootstrap5 Theme

```vue
<style>
@import "../node_modules/@syncfusion/ej2-bootstrap5-theme/styles/chat-ui/index.css";
</style>
```

### Fluent Theme

```vue
<style>
@import "../node_modules/@syncfusion/ej2-fluent-theme/styles/chat-ui/index.css";
</style>
```

### Tailwind Theme

```vue
<style>
@import "../node_modules/@syncfusion/ej2-tailwind-theme/styles/chat-ui/index.css";
</style>
```

### Fabric Theme

```vue
<style>
@import "../node_modules/@syncfusion/ej2-fabric-theme/styles/chat-ui/index.css";
</style>
```

## Advanced Styling Examples

### Custom Message Bubbles

```vue
<style>
.custom-chat .e-chat-message {
  border-radius: 18px;
  padding: 12px 16px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.custom-chat .e-chat-message.e-current-user {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.custom-chat .e-chat-message:not(.e-current-user) {
  background: #f0f0f0;
  color: #333;
}
</style>
```

### Custom Header Styling

```vue
<style>
.branded-chat .e-chat-header {
  background: linear-gradient(to right, #00b4db, #0083b0);
  color: white;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
}

.branded-chat .e-chat-header-title {
  font-size: 18px;
  font-weight: 600;
}
</style>
```

### Glassmorphism Effect

```vue
<style>
.glass-chat {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
}

.glass-chat .e-chat-message {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(5px);
}
</style>
```

### Neumorphism Style

```vue
<style>
.neomorphic-chat {
  background: #e0e5ec;
  box-shadow: 
    20px 20px 60px #bec3c9,
    -20px -20px 60px #ffffff;
  border-radius: 20px;
}

.neomorphic-chat .e-chat-message {
  background: #e0e5ec;
  box-shadow: 
    5px 5px 10px #bec3c9,
    -5px -5px 10px #ffffff;
  border: none;
}
</style>
```

## Accessibility Features

### ARIA Labels

```vue
<style>
.accessible-chat .e-chat-input {
  aria-label: "Type your message";
}

.accessible-chat .e-send-button {
  aria-label: "Send message";
}
</style>
```

### High Contrast Mode

```vue
<style>
@media (prefers-contrast: high) {
  .e-chat-message {
    border: 2px solid currentColor;
  }
  
  .e-chat-message.e-current-user {
    background-color: #000;
    color: #fff;
  }
}
</style>
```

### Focus Indicators

```vue
<style>
.e-chat-input:focus {
  outline: 3px solid #4CAF50;
  outline-offset: 2px;
}

.e-send-button:focus {
  outline: 3px solid #2196F3;
  outline-offset: 2px;
}
</style>
```

## Responsive Design

```vue
<style>
/* Mobile */
@media (max-width: 600px) {
  .e-chatui {
    width: 100vw !important;
    height: 100vh !important;
  }
  
  .e-chat-message {
    max-width: 80%;
    font-size: 14px;
  }
}

/* Tablet */
@media (min-width: 601px) and (max-width: 1024px) {
  .e-chatui {
    max-width: 500px;
    height: 600px;
  }
}

/* Desktop */
@media (min-width: 1025px) {
  .e-chatui {
    max-width: 700px;
    height: 700px;
  }
}
</style>
```

## Print Styles

```vue
<style>
@media print {
  .e-chat-header,
  .e-chat-footer {
    display: none;
  }
  
  .e-chat-message {
    page-break-inside: avoid;
    box-shadow: none;
    border: 1px solid #000;
  }
}
</style>
```
