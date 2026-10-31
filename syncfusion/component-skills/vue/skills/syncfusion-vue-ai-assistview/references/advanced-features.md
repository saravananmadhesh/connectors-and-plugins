# Advanced Features & AI Integration

## Table of Contents
- [Scroll-to-Bottom Indicator](#scroll-to-bottom-indicator)
- [Toolbar Configuration](#toolbar-configuration)
- [Advanced Styling](#advanced-styling)
- [RTL Support](#rtl-support)
- [Performance Optimization](#performance-optimization)
- [Long Conversations](#long-conversations)
- [Best Practices](#best-practices)

## Scroll-to-Bottom Indicator

The `enableScrollToBottom` property controls the scroll-to-bottom indicator. By default, it's `true`. When enabled, a floating icon/button appears when the user scrolls away from the bottom, allowing smooth scrolling to the latest response.

### Enable Scroll Indicator

```vue
<template>
  <ejs-aiassistview
    enableScrollToBottom="true"
    ref="aiassist"
    :prompt-request="onPromptRequest"
  />
</template>

<script setup>
import { AIAssistViewComponent as EjsAiassistview } from "@syncfusion/ej2-vue-interactive-chat";
import { ref } from "vue";

const aiassist = ref(null);

const onPromptRequest = (args) => {
  setTimeout(() => {
    aiassist.value.addPromptResponse('Response: ' + args.prompt);
  }, 1000);
};
</script>
```

### Disable Scroll Indicator

```vue
<template>
  <ejs-aiassistview
    enable-scroll-to-bottom="false"
    ref="aiassist"
  />
</template>
```

### Behavior

- When enabled and user scrolls up, a floating button appears
- Clicking the button smoothly scrolls to the latest message
- Button disappears when user reaches the bottom
- Automatic scroll happens on new responses

## Toolbar Configuration

The `toolbarSettings` property allows you to configure toolbar items and their behavior.

### Basic Toolbar

```vue
<template>
  <ejs-aiassistview
    ref="aiassist"
    :toolbar-settings="toolbarSettings"
    :prompt-request="onPromptRequest"
  />
</template>

<script setup>
import { AIAssistViewComponent as EjsAiassistview } from "@syncfusion/ej2-vue-interactive-chat";
import { ref } from "vue";

const aiassist = ref(null);

const toolbarSettings = {
  items: [
    { iconCss: "e-icons e-refresh", align: "Right" },
    { iconCss: "e-icons e-delete", align: "Right" }
  ],
  itemClicked: (args) => {
    if (args.item.iconCss === "e-icons e-refresh") {
      // Reset conversation
      aiassist.value.ej2Instances.prompts = [];
    } else if (args.item.iconCss === "e-icons e-delete") {
      // Clear history
      aiassist.value.ej2Instances.prompts = [];
    }
  }
};

const onPromptRequest = (args) => {
  setTimeout(() => {
    aiassist.value.addPromptResponse('Response');
  }, 1000);
};
</script>
```

### Toolbar with Multiple Items

```javascript
const toolbarSettings = {
  items: [
    { iconCss: "e-icons e-refresh", tooltipText: "Reset", align: "Left" },
    { iconCss: "e-icons e-copy", tooltipText: "Copy", align: "Left" },
    { iconCss: "e-icons e-settings", tooltipText: "Settings", align: "Right" },
    { iconCss: "e-icons e-delete", tooltipText: "Clear", align: "Right" }
  ],
  itemClicked: handleToolbarClick
};

const handleToolbarClick = (args) => {
  if (args.item.iconCss.includes('refresh')) {
    console.log('Reset clicked');
  } else if (args.item.iconCss.includes('copy')) {
    console.log('Copy clicked');
  } else if (args.item.iconCss.includes('settings')) {
    console.log('Settings clicked');
  } else if (args.item.iconCss.includes('delete')) {
    console.log('Delete clicked');
  }
};
```

### Options API Toolbar

```javascript
data() {
  return {
    toolbarSettings: {
      items: [
        { iconCss: "e-icons e-refresh", align: "Right" }
      ],
      itemClicked: this.onToolbarItemClick
    }
  }
},
methods: {
  onToolbarItemClick(args) {
    if (args.item.iconCss === "e-icons e-refresh") {
      this.$refs.aiassist.ej2Instances.prompts = [];
    }
  }
}
```

## Advanced Styling

### Custom CSS Variables

```vue
<style>
:root {
  --ai-primary-color: #667eea;
  --ai-secondary-color: #764ba2;
  --ai-text-color: #333;
  --ai-bg-color: #f5f5f5;
}

.custom-aiassist {
  --ej2-color-primary: var(--ai-primary-color);
  --ej2-color-background: var(--ai-bg-color);
}
</style>
```

### Dark Mode Support

```vue
<template>
  <div :class="{ 'dark-theme': isDarkMode }">
    <ejs-aiassistview ref="aiassist" />
  </div>
</template>

<script setup>
import { ref } from "vue";

const isDarkMode = ref(false);

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
};
</script>

<style>
.dark-theme .e-aiassist-container {
  background-color: #1e1e1e;
  color: #e0e0e0;
}

.dark-theme .e-aiassist-prompt {
  background-color: #2d2d2d;
  color: #e0e0e0;
  border-color: #444;
}

.dark-theme .e-aiassist-response {
  background-color: #2d2d2d;
  color: #e0e0e0;
}
</style>
```

### Custom Theme Colors

```vue
<style>
.branded-aiassist {
  --brand-primary: #007bff;
  --brand-secondary: #0056b3;
  --brand-success: #28a745;
  --brand-danger: #dc3545;
  --brand-warning: #ffc107;
  --brand-info: #17a2b8;
}

.branded-aiassist .e-aiassist-input {
  border-bottom-color: var(--brand-primary);
}

.branded-aiassist .e-aiassist-button {
  background-color: var(--brand-primary);
}

.branded-aiassist .e-aiassist-button:hover {
  background-color: var(--brand-secondary);
}
</style>
```

## RTL Support

For Right-to-Left languages, configure the component accordingly.

### Enable RTL

```vue
<template>
  <div dir="rtl">
    <ejs-aiassistview
      ref="aiassist"
      enable-rtl="true"
      :prompt-request="onPromptRequest"
    />
  </div>
</template>

<script setup>
import { AIAssistViewComponent as EjsAiassistview } from "@syncfusion/ej2-vue-interactive-chat";
import { ref } from "vue";

const aiassist = ref(null);

const onPromptRequest = (args) => {
  const arabicResponse = 'مرحبا بك في مساعد الذكاء الاصطناعي';
  aiassist.value.addPromptResponse(arabicResponse);
};
</script>
```

### RTL Best Practices

```vue
<template>
  <div :dir="language === 'ar' ? 'rtl' : 'ltr'">
    <ejs-aiassistview
      ref="aiassist"
      :enable-rtl="language === 'ar'"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";

const language = ref('en'); // 'en' or 'ar'

const switchLanguage = (lang) => {
  language.value = lang;
  location.reload(); // Reload to apply RTL styles
};
</script>
```

## Performance Optimization

### Lazy Loading Responses

```javascript
const onPromptRequest = async (args) => {
  // Add a loading response
  aiassist.value.addPromptResponse('Processing your request...');
  
  try {
    // Fetch actual response
    const response = await fetchResponse(args.prompt);
    
    // Replace loading response with actual response
    const history = aiassist.value.ej2Instances.prompts;
    history[history.length - 1].response = response;
    
    // Trigger UI update
    aiassist.value.ej2Instances.prompts = [...history];
  } catch (error) {
    aiassist.value.addPromptResponse('Error: ' + error.message);
  }
};
```

### Pagination for Long Conversations

```javascript
const PAGE_SIZE = 50;
let currentPage = 1;

const onPromptRequest = async (args) => {
  const allHistory = aiassist.value.ej2Instances.prompts;
  
  // Keep only last PAGE_SIZE items
  if (allHistory.length > PAGE_SIZE) {
    aiassist.value.ej2Instances.prompts = allHistory.slice(-PAGE_SIZE);
  }
  
  // Process prompt
  const response = await getResponse(args.prompt);
  aiassist.value.addPromptResponse(response);
};
```

### Debouncing Request Handler

```javascript
let requestTimeout;

const onPromptRequest = (args) => {
  clearTimeout(requestTimeout);
  
  requestTimeout = setTimeout(async () => {
    const response = await getResponse(args.prompt);
    aiassist.value.addPromptResponse(response);
  }, 300); // 300ms debounce
};
```

## Long Conversations

### Managing Memory for Long Sessions

```javascript
const MAX_HISTORY_SIZE = 100;

const addResponseWithLimit = (response) => {
  aiassist.value.addPromptResponse(response);
  
  // Check if history exceeds limit
  const history = aiassist.value.ej2Instances.prompts;
  if (history.length > MAX_HISTORY_SIZE) {
    // Keep only recent conversations
    aiassist.value.ej2Instances.prompts = history.slice(-MAX_HISTORY_SIZE);
  }
};
```

### Export Long Conversation

```javascript
const exportConversation = () => {
  const history = aiassist.value.ej2Instances.prompts;
  
  const text = history
    .map(item => `Q: ${item.prompt}\n\nA: ${item.response}\n\n---\n`)
    .join('\n');
  
  // Download as file
  const blob = new Blob([text], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'conversation.txt';
  a.click();
};
```

### Compress Old Messages

```javascript
const compressConversation = () => {
  const history = aiassist.value.ej2Instances.prompts;
  const compressed = [];
  
  // Keep first 10 and last 20 items
  if (history.length > 30) {
    compressed.push(...history.slice(0, 10));
    compressed.push({
      prompt: '... (conversation summary)',
      response: 'Earlier messages archived'
    });
    compressed.push(...history.slice(-20));
    
    aiassist.value.ej2Instances.prompts = compressed;
  }
};
```

## Best Practices

### 1. Use Scroll Indicator for Long Conversations

```javascript
// Enable for better UX with many messages
const aiassistView = new AIAssistViewComponent({
  enableScrollToBottom: true
});
```

### 2. Optimize Toolbar Items

```javascript
// Keep toolbar minimal for better performance
const toolbarSettings = {
  items: [
    { iconCss: "e-icons e-refresh", align: "Right" }
  ]
};
```

### 3. Handle Large Response Sets

```javascript
// Implement pagination for long conversations
const MAX_DISPLAY = 100;

const updateConversation = (history) => {
  if (history.length > MAX_DISPLAY) {
    return history.slice(-MAX_DISPLAY);
  }
  return history;
};
```

### 4. Monitor Performance

```javascript
// Track component performance
const monitorPerformance = () => {
  const history = aiassist.value.ej2Instances.prompts;
  
  console.log('Total messages:', history.length);
  console.log('Memory usage:', performance.memory);
  console.log('Render time:', performance.now());
};
```

### 5. Cache Responses

```javascript
const responseCache = new Map();

const getCachedResponse = async (prompt) => {
  if (responseCache.has(prompt)) {
    return responseCache.get(prompt);
  }
  
  const response = await fetchResponse(prompt);
  responseCache.set(prompt, response);
  return response;
};
```
