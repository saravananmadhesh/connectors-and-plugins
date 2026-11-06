# Configuring Prompts & Responses

## Table of Contents
- [Initial Prompt Text](#initial-prompt-text)
- [Placeholder Text](#placeholder-text)
- [Prompt-Response Collections](#prompt-response-collections)
- [Managing Conversation History](#managing-conversation-history)
- [Dynamic Prompt Handling](#dynamic-prompt-handling)
- [Best Practices](#best-practices)

## Initial Prompt Text

The `prompt` property allows you to set pre-filled or default text in the prompt input area. This is useful for providing context or guidance to users.

### Basic Usage

```vue
<template>
  <ejs-aiassistview
    prompt="What would you like to know today?"
  />
</template>
```

### Use Cases

**Provide Context:**
```vue
<ejs-aiassistview
  prompt="I'm here to help with Vue development. What do you need?"
/>
```

**Pre-filled Query:**
```vue
<ejs-aiassistview
  prompt="Tell me about Vue 3 Composition API"
/>
```

**Empty Prompt:**
```vue
<ejs-aiassistview
  prompt=""
/>
```

## Placeholder Text

The `promptPlaceholder` property defines text displayed in the input area when it's empty. The default is `Type prompt for assistance...`.

### Basic Usage

```vue
<template>
  <ejs-aiassistview
    promptPlaceholder="Ask me anything..."
  />
</template>
```

```vue
<template>
  <div style="height: 400px; width: 600px;">
    <ejs-aiassistview
      ref="aiassist"
      promptPlaceholder="Ask about Vue, JavaScript, or web development..."
      :prompt-request="onPromptRequest"
    />
  </div>
</template>

<script setup>
import { AIAssistViewComponent as EjsAiassistview } from "@syncfusion/ej2-vue-interactive-chat";
import { ref } from "vue";

const aiassist = ref(null);

const onPromptRequest = (args) => {
  setTimeout(() => {
    aiassist.value.addPromptResponse('Default response for: ' + args.prompt);
  }, 1000);
};
</script>
```

## Prompt-Response Collections

The `prompts` property enables you to initialize the component with pre-configured conversation data or retrieve the complete history of user interactions.

### PromptModel Structure

Each prompt-response pair is a `PromptModel` object with:

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `prompt` | string | Yes | The user's query text |
| `response` | string (HTML) | Yes | The AI's response (supports HTML/markdown) |
| `attachedFiles` | FileInfo[] | No | Files attached to the prompt |
| `isResponseHelpful` | boolean | No | Whether user marked response as helpful (true/false/undefined) |

### Basic Collection Example

```javascript
[
  {
    prompt: "What is AI?",
    response: "<div>AI stands for Artificial Intelligence...</div>",
    isResponseHelpful: true
  },
  {
    prompt: "How do I learn Vue?",
    response: "Start with the official Vue documentation...",
    isResponseHelpful: undefined  // Not yet rated
  }
]
```

### With File Attachments

```javascript
{
  prompt: "Analyze this document",
  response: "<div>Document analysis complete...</div>",
  attachedFiles: [
    {
      name: "document.pdf",
      type: "application/pdf",
      size: 1024000
    }
  ],
  isResponseHelpful: true
}
```

### Tracking Response Helpfulness

```javascript
// Initialize with feedback data
const initialConversation = [
  {
    prompt: "Explain Vue reactivity",
    response: "Vue uses a reactive system based on Proxy objects...",
    isResponseHelpful: true  // User marked as helpful
  },
  {
    prompt: "How does v-model work?",
    response: "v-model is a two-way binding directive...",
    isResponseHelpful: false  // User marked as not helpful
  }
];
```

### Pre-configure Conversation History

```vue
<template>
  <ejs-aiassistview
    :prompts="initialConversation"
    :prompt-request="onPromptRequest"
    ref="aiassist"
  />
</template>

<script setup>
import { AIAssistViewComponent as EjsAiassistview } from "@syncfusion/ej2-vue-interactive-chat";
import { ref } from "vue";

const aiassist = ref(null);

const initialConversation = [
  {
    prompt: "What is Vue?",
    response: "<div><strong>Vue</strong> is a JavaScript framework for building user interfaces with a focus on simplicity and progressive enhancement.</div>"
  },
  {
    prompt: "How do I create components?",
    response: "<div>You can create Vue components using Single File Components (.vue) or as JavaScript objects.</div>"
  }
];

const onPromptRequest = (args) => {
  setTimeout(() => {
    aiassist.value.addPromptResponse('Your question: ' + args.prompt);
  }, 1000);
};
</script>
```

## Managing Conversation History

Access and manage the conversation history programmatically.

### Retrieving Conversation History

```javascript
// Get all prompts and responses
const history = aiassist.value.ej2Instances.prompts;

console.log(history);
// Output: [
//   { prompt: "What is Vue?", response: "..." },
//   { prompt: "How do I use props?", response: "..." }
// ]
```

### Clearing Conversation History

```javascript
// Clear all conversation history
aiassist.value.ej2Instances.prompts = [];

// Also reset suggestions if needed
aiassist.value.ej2Instances.promptSuggestions = [
  "What is Vue?",
  "How do I get started?"
];
```

### Accessing the Latest Prompt-Response Pair

```javascript
const history = aiassist.value.ej2Instances.prompts;
const latestEntry = history[history.length - 1];

console.log(latestEntry.prompt);
console.log(latestEntry.response);
```

### Filtering Conversation History

```javascript
// Get all user prompts
const userPrompts = aiassist.value.ej2Instances.prompts.map(item => item.prompt);

// Get prompts containing keyword
const keyword = "Vue";
const filtered = aiassist.value.ej2Instances.prompts.filter(
  item => item.prompt.includes(keyword)
);
```

## Dynamic Prompt Handling

Handle prompts dynamically based on user input or application state.

### Conditional Responses

```javascript
const onPromptRequest = (args) => {
  const prompt = args.prompt.toLowerCase();
  
  setTimeout(() => {
    let response;
    
    if (prompt.includes('vue')) {
      response = 'Vue is a progressive JavaScript framework.';
    } else if (prompt.includes('react')) {
      response = 'React is a JavaScript library for UI development.';
    } else {
      response = 'I can help with Vue and React questions.';
    }
    
    aiassist.value.addPromptResponse(response);
  }, 1000);
};
```

### Async Processing

```javascript
const onPromptRequest = async (args) => {
  try {
    // Simulate API call
    const response = await fetch('/api/process-prompt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: args.prompt })
    });
    
    const data = await response.json();
    aiassist.value.addPromptResponse(data.response);
  } catch (error) {
    aiassist.value.addPromptResponse('Error processing request. Please try again.');
  }
};
```

## Best Practices

### 1. Provide Clear Placeholder Text
Use descriptive placeholders that guide users on what to ask:
```vue
<ejs-aiassistview
  promptPlaceholder="Ask me about Vue, JavaScript, or web development..."
/>
```

### 2. Set Initial Context
Pre-fill with context when appropriate:
```vue
<ejs-aiassistview
  prompt="Welcome to Vue Assistant! What would you like to learn?"
/>
```

### 3. Pre-populate with Example Conversations
Help users understand the component by showing examples:
```javascript
const initialConversation = [
  {
    prompt: "What is Vue?",
    response: "Vue is a JavaScript framework..."
  }
];
```

### 4. Handle Errors Gracefully
Always provide feedback when processing fails:
```javascript
const onPromptRequest = async (args) => {
  try {
    const response = await processPrompt(args.prompt);
    aiassist.value.addPromptResponse(response);
  } catch (error) {
    aiassist.value.addPromptResponse(
      'Sorry, I encountered an error. Please try again.'
    );
  }
};
```

### 5. Limit Conversation History
Clear old conversations to manage performance:
```javascript
const MAX_HISTORY = 50;
const history = aiassist.value.ej2Instances.prompts;

if (history.length > MAX_HISTORY) {
  // Keep only the last MAX_HISTORY items
  aiassist.value.ej2Instances.prompts = history.slice(-MAX_HISTORY);
}
```

### 6. Sanitize User Input
Always validate and sanitize incoming prompts:
```javascript
const onPromptRequest = (args) => {
  const sanitizedPrompt = args.prompt.trim().substring(0, 500);
  // Process sanitized prompt
};
```
