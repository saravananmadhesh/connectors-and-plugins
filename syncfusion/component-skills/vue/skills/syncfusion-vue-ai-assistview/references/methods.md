````markdown
# Component Methods

## Table of Contents
- [Overview](#overview)
- [addPromptResponse](#addpromptresponse)
- [executePrompt](#executeprompt)
- [scrollToBottom](#scrolltobottom)
- [Best Practices](#best-practices)
- [Common Patterns](#common-patterns)

## Overview

The AI AssistView component provides three essential methods for programmatic control:

1. **addPromptResponse** - Add responses to user prompts (optionally with telemetry data)
2. **executePrompt** - Programmatically trigger a prompt
3. **scrollToBottom** - Scroll the view to show the latest message

---

## addPromptResponse

Adds a response to the last prompt or appends a new prompt-response data in the AI AssistView component.

### Signature

```typescript
addPromptResponse(
  outputResponse: string | Object,
  isFinalUpdate?: boolean,
  telemetryData?: TelemetryData
): void
```

### Parameters

| Parameter | Type | Optional | Description |
|-----------|------|----------|-------------|
| `outputResponse` | `string` \| `Object` | No | The response to be added. Can be a string representing the response or an object containing both the prompt and the response. |
| `isFinalUpdate` | `boolean` | Yes | Indicates whether this response is the final one, to hide the stop response button. |
| `telemetryData` | `TelemetryData` | Yes | Model and token usage data merged into the telemetry report. Only applies when `telemetrySettings.enable` is `true`. See [telemetry.md](./telemetry.md) for details. |

### Behavior

**When `outputResponse` is a string:**
- Updates the response for the last prompt in the `prompts` collection
- Used for adding AI responses after user submits a prompt

**When `outputResponse` is an object:**
- Can update an existing prompt's response if the prompt matches
- Can append a new prompt-response pair to the conversation
- Object structure: `{ prompt: string, response: string }`

**When `telemetryData` is supplied:**
- Merges the supplied model/token values into the telemetry report for the current turn
- Custom `customAttributes` are surfaced as their own rows in the tooltip

### Basic Usage

```vue
<template>
  <ejs-aiassistview
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
    // Add response as string
    aiassist.value.addPromptResponse('This is the AI response');
  }, 1000);
};
</script>
```

### Adding Response as Object

```javascript
const onPromptRequest = (args) => {
  setTimeout(() => {
    // Add response as object with prompt and response
    aiassist.value.addPromptResponse({
      prompt: 'What is Vue?',
      response: 'Vue is a progressive JavaScript framework for building user interfaces.'
    });
  }, 1000);
};
```

### Streaming Responses

Use the `isFinalUpdate` parameter to control when the stop button is hidden during streaming.

```javascript
const onPromptRequest = async (args) => {
  const fullResponse = 'This is a long response that will be streamed...';
  
  // Stream response in chunks
  for (let i = 0; i < fullResponse.length; i += 10) {
    const chunk = fullResponse.substring(0, i + 10);
    const isFinal = i + 10 >= fullResponse.length;
    
    // Add partial response, mark final when complete
    aiassist.value.addPromptResponse(chunk, isFinal);
    
    await new Promise(resolve => setTimeout(resolve, 100));
  }
};
```

### Real-time API Streaming

```javascript
const onPromptRequest = async (args) => {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: args.prompt })
    });
    
    const reader = response.body.getReader();
    let accumulatedText = '';
    
    while (true) {
      const { done, value } = await reader.read();
      
      if (done) {
        // Final update - hide stop button
        aiassist.value.addPromptResponse(accumulatedText, true);
        break;
      }
      
      const chunk = new TextDecoder().decode(value);
      accumulatedText += chunk;
      
      // Interim update - keep stop button visible
      aiassist.value.addPromptResponse(accumulatedText, false);
    }
  } catch (error) {
    aiassist.value.addPromptResponse('Error: ' + error.message, true);
  }
};
```

### Passing Telemetry Data

When telemetry is enabled, you can pass the third `telemetryData` argument to merge model/token values into the report.

```javascript
const onPromptRequest = async (args) => {
  const response = await fetchAIResponse(args.prompt);

  aiassist.value.addPromptResponse(response, true, {
    model: 'gpt-4o',
    inputTokens: 128,
    outputTokens: 512,
    customAttributes: { region: 'us-east-1', tenant: 'acme' }
  });
};
```

> See [telemetry.md](./telemetry.md) for the full `TelemetryData` shape, `metrics` filtering, and the `beforeReport` event.

### Adding Multiple Responses

```javascript
// Pre-populate conversation with multiple prompt-response pairs
const initializeConversation = () => {
  const conversationHistory = [
    {
      prompt: 'What is AI?',
      response: 'AI stands for Artificial Intelligence...'
    },
    {
      prompt: 'How does machine learning work?',
      response: 'Machine learning is a subset of AI...'
    },
    {
      prompt: 'Tell me about neural networks',
      response: 'Neural networks are computing systems...'
    }
  ];
  
  conversationHistory.forEach(item => {
    aiassist.value.addPromptResponse(item);
  });
};
```

### Markdown Responses

```javascript
const onPromptRequest = (args) => {
  setTimeout(() => {
    const markdownResponse = `
# Vue.js Overview

Vue is a **progressive framework** for building user interfaces.

## Key Features:
- Reactive data binding
- Component-based architecture
- Virtual DOM
- Single-file components

\`\`\`javascript
const app = Vue.createApp({
  data() {
    return { message: 'Hello Vue!' }
  }
})
\`\`\`
    `;
    
    aiassist.value.addPromptResponse(markdownResponse);
  }, 1000);
};
```

### HTML Responses

```javascript
const onPromptRequest = (args) => {
  setTimeout(() => {
    const htmlResponse = `
      <div style="padding: 15px; background: #f5f5f5; border-radius: 8px;">
        <h3 style="color: #333; margin-top: 0;">Response Title</h3>
        <p>This is a <strong>formatted</strong> HTML response.</p>
        <ul>
          <li>Feature 1</li>
          <li>Feature 2</li>
          <li>Feature 3</li>
        </ul>
      </div>
    `;
    
    aiassist.value.addPromptResponse(htmlResponse);
  }, 1000);
};
```

---

## executePrompt

Executes the specified prompt in the AIAssistView component. This method programmatically triggers a prompt as if the user had typed and submitted it.

### Signature

```typescript
executePrompt(prompt: string): void
```

### Parameters

| Parameter | Type | Optional | Description |
|-----------|------|----------|-------------|
| `prompt` | `string` | No | The prompt text to be executed. Must be a non-empty string. |

### Basic Usage

```vue
<template>
  <div style="height: 500px; width: 700px;">
    <button @click="triggerPrompt">Ask a Question</button>
    
    <ejs-aiassistview
      ref="aiassist"
      :prompt-request="onPromptRequest"
    />
  </div>
</template>

<script setup>
import { AIAssistViewComponent as EjsAiassistview } from "@syncfusion/ej2-vue-interactive-chat";
import { ref } from "vue";

const aiassist = ref(null);

const triggerPrompt = () => {
  // Programmatically execute a prompt
  aiassist.value.executePrompt('What is Vue.js?');
};

const onPromptRequest = (args) => {
  setTimeout(() => {
    aiassist.value.addPromptResponse('Response to: ' + args.prompt);
  }, 1000);
};
</script>
```

### Guided Workflow Example

```vue
<template>
  <div style="height: 600px; width: 700px;">
    <div style="margin-bottom: 10px;">
      <h3>Quick Actions:</h3>
      <button @click="askAboutVue" class="action-btn">Learn Vue</button>
      <button @click="askAboutComposition" class="action-btn">Composition API</button>
      <button @click="askAboutComponents" class="action-btn">Components</button>
      <button @click="startTutorial" class="action-btn">Start Tutorial</button>
    </div>
    
    <ejs-aiassistview
      ref="aiassist"
      :prompt-request="onPromptRequest"
    />
  </div>
</template>

<script setup>
import { AIAssistViewComponent as EjsAiassistview } from "@syncfusion/ej2-vue-interactive-chat";
import { ref } from "vue";

const aiassist = ref(null);

const askAboutVue = () => {
  aiassist.value.executePrompt('What is Vue.js and why should I use it?');
};

const askAboutComposition = () => {
  aiassist.value.executePrompt('Explain the Vue Composition API');
};

const askAboutComponents = () => {
  aiassist.value.executePrompt('How do I create Vue components?');
};

const startTutorial = () => {
  aiassist.value.executePrompt('Start a beginner tutorial for Vue.js');
};

const onPromptRequest = (args) => {
  setTimeout(() => {
    let response = '';
    
    if (args.prompt.includes('What is Vue')) {
      response = 'Vue.js is a progressive JavaScript framework...';
    } else if (args.prompt.includes('Composition API')) {
      response = 'The Composition API is a set of APIs...';
    } else if (args.prompt.includes('components')) {
      response = 'Vue components are reusable instances...';
    } else if (args.prompt.includes('tutorial')) {
      response = 'Let\'s start with the basics of Vue.js...';
    } else {
      response = 'Response to: ' + args.prompt;
    }
    
    aiassist.value.addPromptResponse(response);
  }, 1000);
};
</script>

<style scoped>
.action-btn {
  margin: 5px;
  padding: 8px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.action-btn:hover {
  background-color: #0056b3;
}
</style>
```

### Sequential Prompts

```javascript
const runSequentialPrompts = async () => {
  const prompts = [
    'What is Vue.js?',
    'How do I create a component?',
    'Show me an example'
  ];
  
  for (const prompt of prompts) {
    aiassist.value.executePrompt(prompt);
    
    // Wait for response before next prompt
    await new Promise(resolve => setTimeout(resolve, 3000));
  }
};
```

### Interactive Demo Mode

```javascript
const startDemo = () => {
  const demoSteps = [
    { delay: 1000, prompt: 'Hello! I want to learn Vue.js' },
    { delay: 5000, prompt: 'How do I get started?' },
    { delay: 5000, prompt: 'Show me a simple example' },
    { delay: 5000, prompt: 'Thank you!' }
  ];
  
  let cumulativeDelay = 0;
  
  demoSteps.forEach(step => {
    cumulativeDelay += step.delay;
    setTimeout(() => {
      aiassist.value.executePrompt(step.prompt);
    }, cumulativeDelay);
  });
};
```

### Validation Before Execution

```javascript
const executeSafePrompt = (promptText) => {
  // Validate prompt
  if (!promptText || promptText.trim().length === 0) {
    console.error('Prompt cannot be empty');
    return;
  }
  
  if (promptText.length > 500) {
    console.error('Prompt too long (max 500 characters)');
    return;
  }
  
  // Execute validated prompt
  aiassist.value.executePrompt(promptText.trim());
};
```

---

## scrollToBottom

Scrolls the view to the bottom to display the most recent response in the AIAssistView component. This method programmatically scrolls the conversation view to the bottom.

### Signature

```typescript
scrollToBottom(): void
```

### Parameters

None

### Basic Usage

```vue
<template>
  <div>
    <button @click="scrollDown">Scroll to Latest</button>
    
    <ejs-aiassistview
      ref="aiassist"
      :prompt-request="onPromptRequest"
    />
  </div>
</template>

<script setup>
import { AIAssistViewComponent as EjsAiassistview } from "@syncfusion/ej2-vue-interactive-chat";
import { ref } from "vue";

const aiassist = ref(null);

const scrollDown = () => {
  // Scroll to the bottom
  aiassist.value.scrollToBottom();
};

const onPromptRequest = (args) => {
  setTimeout(() => {
    aiassist.value.addPromptResponse('Response: ' + args.prompt);
  }, 1000);
};
</script>
```

### Auto-scroll After Adding Response

```javascript
const onPromptRequest = async (args) => {
  try {
    const response = await fetchAIResponse(args.prompt);
    
    // Add response
    aiassist.value.addPromptResponse(response);
    
    // Ensure view scrolls to show new response
    setTimeout(() => {
      aiassist.value.scrollToBottom();
    }, 100);
  } catch (error) {
    aiassist.value.addPromptResponse('Error: ' + error.message);
  }
};
```

### Scroll After Loading History

```javascript
const loadConversationHistory = async () => {
  const history = await fetchHistoryFromAPI();
  
  // Load all history
  history.forEach(item => {
    aiassist.value.addPromptResponse({
      prompt: item.prompt,
      response: item.response
    });
  });
  
  // Scroll to show latest messages
  aiassist.value.scrollToBottom();
};
```

### Conditional Scrolling

```javascript
const addResponseWithSmartScroll = (response) => {
  // Check if user was already at bottom
  const container = document.querySelector('.e-aiassist-container');
  const isAtBottom = container.scrollHeight - container.scrollTop === container.clientHeight;
  
  // Add response
  aiassist.value.addPromptResponse(response);
  
  // Only auto-scroll if user was at bottom
  if (isAtBottom) {
    aiassist.value.scrollToBottom();
  }
};
```

### Smooth Scroll with Animation

```javascript
const smoothScrollToBottom = () => {
  aiassist.value.scrollToBottom();
  
  // Add smooth scroll behavior via CSS
  const container = document.querySelector('.e-aiassist-container');
  if (container) {
    container.style.scrollBehavior = 'smooth';
  }
};
```

---

## Best Practices

### 1. Always Handle Errors in addPromptResponse

```javascript
const onPromptRequest = async (args) => {
  try {
    const response = await callAIService(args.prompt);
    aiassist.value.addPromptResponse(response);
  } catch (error) {
    // Always provide user feedback on errors
    aiassist.value.addPromptResponse(
      'Sorry, I encountered an error processing your request. Please try again.'
    );
    console.error('AI Service Error:', error);
  }
};
```

### 2. Use isFinalUpdate for Streaming

```javascript
const streamResponse = async (prompt) => {
  let accumulated = '';
  
  for await (const chunk of getStreamingResponse(prompt)) {
    accumulated += chunk;
    const isLast = chunk.includes('[DONE]');
    
    // Set isFinalUpdate=true on last chunk to hide stop button
    aiassist.value.addPromptResponse(accumulated, isLast);
  }
};
```

### 3. Validate Before executePrompt

```javascript
const safeExecutePrompt = (prompt) => {
  // Validate
  if (!prompt || typeof prompt !== 'string') {
    console.error('Invalid prompt');
    return;
  }
  
  const trimmed = prompt.trim();
  if (trimmed.length === 0) {
    console.error('Empty prompt');
    return;
  }
  
  if (trimmed.length > 1000) {
    console.error('Prompt too long');
    return;
  }
  
  // Execute
  aiassist.value.executePrompt(trimmed);
};
```

### 4. Debounce scrollToBottom Calls

```javascript
let scrollTimeout;

const debouncedScroll = () => {
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    aiassist.value.scrollToBottom();
  }, 100);
};

// Use debounced version when adding multiple responses
responses.forEach(response => {
  aiassist.value.addPromptResponse(response);
  debouncedScroll();
});
```

### 5. Check Component Mount State

```javascript
import { onMounted } from "vue";

const aiassist = ref(null);
let isComponentReady = false;

onMounted(() => {
  isComponentReady = true;
});

const safeAddResponse = (response) => {
  if (!isComponentReady || !aiassist.value) {
    console.error('Component not ready');
    return;
  }
  
  aiassist.value.addPromptResponse(response);
};
```

### 6. Provide Loading Feedback

```javascript
const onPromptRequest = async (args) => {
  // Show loading message
  aiassist.value.addPromptResponse('Processing your request...');
  
  try {
    const response = await fetchResponse(args.prompt);
    
    // Replace loading message with actual response
    const history = aiassist.value.ej2Instances.prompts;
    history[history.length - 1].response = response;
    aiassist.value.ej2Instances.prompts = [...history];
  } catch (error) {
    // Replace with error message
    const history = aiassist.value.ej2Instances.prompts;
    history[history.length - 1].response = 'Error: Unable to process request';
    aiassist.value.ej2Instances.prompts = [...history];
  }
};
```

---

## Common Patterns

### Pattern 1: Auto-scroll After Response

```javascript
const onPromptRequest = (args) => {
  setTimeout(() => {
    aiassist.value.addPromptResponse('Your response here');
    
    // Auto-scroll to show new response
    setTimeout(() => aiassist.value.scrollToBottom(), 50);
  }, 1000);
};
```

### Pattern 2: Programmatic Conversation Flow

```javascript
const startWelcomeFlow = () => {
  aiassist.value.executePrompt('Hello!');
  
  setTimeout(() => {
    aiassist.value.executePrompt('What can you help me with?');
  }, 3000);
};
```

### Pattern 3: Retry Failed Prompts

```javascript
const executeWithRetry = async (prompt, maxRetries = 3) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      aiassist.value.executePrompt(prompt);
      return;
    } catch (error) {
      if (i === maxRetries - 1) {
        aiassist.value.addPromptResponse('Failed to execute prompt after multiple attempts');
      }
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
};
```

### Pattern 4: Bulk Load with Progress

```javascript
const loadBulkConversation = (items) => {
  items.forEach((item, index) => {
    setTimeout(() => {
      aiassist.value.addPromptResponse(item);
      
      // Scroll on last item
      if (index === items.length - 1) {
        aiassist.value.scrollToBottom();
      }
    }, index * 100);  // Stagger loading
  });
};
```

````