# Prompt Configuration and Management

## Table of Contents
- [Setting Prompt Text](#setting-prompt-text)
- [Customizing Placeholder Text](#customizing-placeholder-text)
- [Prompt-Response Collection](#prompt-response-collection)
- [Response Streaming](#response-streaming)
- [Handling Prompt Requests](#handling-prompt-requests)
- [Dynamic Prompt Workflows](#dynamic-prompt-workflows)
- [PromptResponseModel Interface](#promptresponsemodel-interface)
- [Troubleshooting](#troubleshooting)

## Setting Prompt Text

The `prompt` property defines the initial prompt text displayed to users. Use this to guide users on what action to perform.

### Basic Prompt Setup

```vue
<template>
  <div style="height: 350px; width: 650px; margin: 0 auto;">
    <br />
    <button @click="showPopup">Open Inline AI Assist</button>
    <div id="editableText" contenteditable="true" 
         style="min-height:80px; border:1px solid #ccc; padding:8px; margin-top:8px;">
      Editable content goes here.
    </div>
    <ejs-inlineaiassist 
      prompt="What are the benefits of Inline AI Assist?"
      relate-to="#summarizeBtn"
      popup-width="500px"
      :prompt-request="onPromptRequest"
      :response-settings="responseSettings"
      ref="inlineAiAssist">
    </ejs-inlineaiassist>
  </div>
</template>

<script setup>
import { InlineAIAssistComponent as EjsInlineaiassist } from "@syncfusion/ej2-vue-interactive-chat";
import { ref } from "vue";

let inlineAiAssist = ref(null);

const responseSettings = {
  itemSelect: (args) => {
    if (args.command.label === 'Accept') {
      const editable = document.getElementById('editableText');
      if (editable && inlineAiAssist.value?.prompts) {
        const lastPrompt = inlineAiAssist.value.prompts[inlineAiAssist.value.prompts.length - 1];
        editable.innerHTML = '<p>' + lastPrompt.response + '</p>';
      }
      inlineAiAssist.value?.hidePopup();
    } else if (args.command.label === 'Discard') {
      inlineAiAssist.value?.hidePopup();
    }
  }
};

const onPromptRequest = () => {
  setTimeout(() => {
    const defaultResponse = 'For real-time prompt processing, connect to your AI service (OpenAI, Azure, etc.). Ensure API credentials are configured.';
    inlineAiAssist.value?.addResponse(defaultResponse);
  }, 1000);
};

const showPopup = () => {
  inlineAiAssist.value?.showPopup();
};
</script>
```

## Customizing Placeholder Text

The `placeholder` property sets the text displayed in the prompt input field when it's empty. This guides users on what to type.

### Default Placeholder

The default placeholder text is `"Ask or generate AI content.."`.

### Custom Placeholder

```vue
<template>
  <div style="height: 350px; width: 650px; margin: 0 auto;">
    <br />
    <button @click="showPopup">Open Inline AI Assist</button>
    <ejs-inlineaiassist 
      prompt="Summarize this document"
      placeholder="Type your question or request here..."
      relate-to="#summarizeBtn"
      popup-width="500px"
      :prompt-request="onPromptRequest"
      :response-settings="responseSettings"
      ref="inlineAiAssist">
    </ejs-inlineaiassist>
  </div>
</template>

<script setup>
import { InlineAIAssistComponent as EjsInlineaiassist } from "@syncfusion/ej2-vue-interactive-chat";
import { ref } from "vue";

let inlineAiAssist = ref(null);

const responseSettings = {
  itemSelect: (args) => {
    if (args.command.label === 'Accept') {
      inlineAiAssist.value?.hidePopup();
    } else if (args.command.label === 'Discard') {
      inlineAiAssist.value?.hidePopup();
    }
  }
};

const onPromptRequest = () => {
  setTimeout(() => {
    const defaultResponse = 'Processing your request...';
    inlineAiAssist.value?.addResponse(defaultResponse);
  }, 1000);
};

const showPopup = () => {
  inlineAiAssist.value?.showPopup();
};
</script>
```

### Context-Specific Placeholders

```vue
<script setup>
const placeholderText = ref('Ask me anything about this document...');

const updatePlaceholder = (context) => {
  const placeholders = {
    'summarize': 'What would you like to summarize?',
    'translate': 'Which language should I translate to?',
    'improve': 'How would you like to improve this text?'
  };
  placeholderText.value = placeholders[context] || 'Ask or generate AI content..';
};
</script>
```

## Prompt-Response Collection

The `prompts` property stores all prompt-response pairs generated during the user session. This collection is automatically maintained and can be accessed to retrieve historical interactions.

### Accessing Prompts Collection

```vue
<template>
  <div style="height: 350px; width: 650px; margin: 0 auto;">
    <br />
    <button @click="showPopup">Open Inline AI Assist</button>
    <button @click="displayPromptHistory">View History</button>
    <div id="editableText" contenteditable="true" 
         style="min-height:80px; border:1px solid #ccc; padding:8px; margin-top:8px;">
      Editable content goes here.
    </div>
    <div id="history" style="margin-top: 10px; padding: 10px; border: 1px solid #e0e0e0;">
      {{ promptHistory }}
    </div>
    <ejs-inlineaiassist 
      :prompts="promptsData"
      relate-to="#summarizeBtn"
      popup-width="500px"
      :prompt-request="onPromptRequest"
      :response-settings="responseSettings"
      ref="inlineAiAssist">
    </ejs-inlineaiassist>
  </div>
</template>

<script setup>
import { InlineAIAssistComponent as EjsInlineaiassist } from "@syncfusion/ej2-vue-interactive-chat";
import { ref } from "vue";

let inlineAiAssist = ref(null);
const promptHistory = ref('');

const promptsData = [
  {
    prompt: 'What is AI?',
    response: '<div>AI stands for Artificial Intelligence, enabling machines to mimic human intelligence.</div>'
  }
];

const responseSettings = {
  itemSelect: (args) => {
    if (args.command.label === 'Accept') {
      const editable = document.getElementById('editableText');
      if (editable && inlineAiAssist.value?.prompts) {
        const lastResponse = inlineAiAssist.value.prompts[inlineAiAssist.value.prompts.length - 1].response;
        editable.innerHTML = '<p>' + lastResponse + '</p>';
      }
      inlineAiAssist.value?.hidePopup();
    } else if (args.command.label === 'Discard') {
      inlineAiAssist.value?.hidePopup();
    }
  }
};

const onPromptRequest = (args) => {
  const prompt = args?.prompt || '';
  setTimeout(() => {
    const foundPrompt = promptsData.find((p) => p.prompt === prompt);
    const defaultResponse = 'Connect to your AI service for real responses.';
    const response = foundPrompt ? foundPrompt.response : defaultResponse;
    inlineAiAssist.value?.addResponse(response);
  }, 1000);
};

const showPopup = () => {
  inlineAiAssist.value?.showPopup();
};

const displayPromptHistory = () => {
  if (inlineAiAssist.value?.prompts) {
    const history = inlineAiAssist.value.prompts.map((p) => `Q: ${p.prompt} | A: ${p.response}`).join('\n');
    promptHistory.value = history || 'No prompts yet';
  }
};
</script>
```

## Response Streaming

The `enableStreaming` property controls whether AI responses are streamed in real-time or displayed all at once. When enabled, responses appear progressively as they're generated, providing better user experience for long responses.

### Basic Streaming Setup

```vue
<template>
  <div style="height: 350px; width: 650px; margin: 0 auto;">
    <br />
    <button @click="showPopup">Open AI Assistant (Streaming)</button>
    <ejs-inlineaiassist 
      prompt="Generate a detailed summary"
      enable-streaming="true"
      relate-to="#summarizeBtn"
      popup-width="500px"
      :prompt-request="onPromptRequest"
      :response-settings="responseSettings"
      ref="inlineAiAssist">
    </ejs-inlineaiassist>
  </div>
</template>

<script setup>
import { InlineAIAssistComponent as EjsInlineaiassist } from "@syncfusion/ej2-vue-interactive-chat";
import { ref } from "vue";

let inlineAiAssist = ref(null);

const responseSettings = {
  itemSelect: (args) => {
    if (args.command.label === 'Accept') {
      inlineAiAssist.value?.hidePopup();
    } else if (args.command.label === 'Discard') {
      inlineAiAssist.value?.hidePopup();
    }
  }
};

const onPromptRequest = () => {
  // Simulate streaming response
  const fullResponse = 'This is a streaming response that appears word by word. ' +
    'The user sees the text appearing progressively, which provides better UX ' +
    'for long AI-generated content.';
  
  const words = fullResponse.split(' ');
  let currentText = '';
  
  words.forEach((word, index) => {
    setTimeout(() => {
      currentText += (index > 0 ? ' ' : '') + word;
      const isFinalUpdate = index === words.length - 1;
      inlineAiAssist.value?.addResponse(currentText, isFinalUpdate);
    }, index * 100);
  });
};

const showPopup = () => {
  inlineAiAssist.value?.showPopup();
};
</script>
```

### Streaming with AI Service

```vue
<script setup>
const onPromptRequest = async (args) => {
  const prompt = args?.prompt || '';
  
  try {
    // Example with OpenAI streaming
    const response = await fetch('/api/ai-stream', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, stream: true })
    });
    
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let accumulatedResponse = '';
    
    while (true) {
      const { done, value } = await reader.read();
      
      if (done) {
        // Final update
        inlineAiAssist.value?.addResponse(accumulatedResponse, true);
        break;
      }
      
      const chunk = decoder.decode(value, { stream: true });
      accumulatedResponse += chunk;
      
      // Update with partial response
      inlineAiAssist.value?.addResponse(accumulatedResponse, false);
    }
  } catch (error) {
    console.error('Streaming error:', error);
    inlineAiAssist.value?.addResponse('Error during streaming.', true);
  }
};
</script>
```

### Non-Streaming Mode (Default)

When `enableStreaming` is `false` (default), responses are displayed only when complete:

```vue
<template>
  <ejs-inlineaiassist 
    enable-streaming="false"
    :prompt-request="onPromptRequest"
    ref="inlineAiAssist">
  </ejs-inlineaiassist>
</template>

<script setup>
const onPromptRequest = async () => {
  // Fetch complete response
  const response = await fetchCompleteResponse();
  
  // Display once fully loaded
  inlineAiAssist.value?.addResponse(response, true);
};
</script>
```

## Handling Prompt Requests

The `prompt-request` event fires when the user submits a prompt. This is where you connect to your AI service to fetch responses.

### Basic Event Handler

```vue
<script setup>
const onPromptRequest = (args) => {
  // args.prompt contains the user's prompt text
  const userPrompt = args?.prompt;
  
  // Call your AI service here
  fetchAIResponse(userPrompt).then((response) => {
    inlineAiAssist.value?.addResponse(response);
  });
};

async function fetchAIResponse(prompt) {
  try {
    const response = await fetch('/api/ai-service', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });
    const data = await response.json();
    return data.result;
  } catch (error) {
    return 'Error fetching response. Please try again.';
  }
}
</script>
```

### Event Handler with Loading Indicator

```vue
<script setup>
const onPromptRequest = (args) => {
  console.log('Processing prompt:', args.prompt);
  
  // Simulate API delay
  setTimeout(() => {
    const response = `Processing: "${args.prompt}"`;
    inlineAiAssist.value?.addResponse(response);
  }, 2000);
};
</script>
```

## Dynamic Prompt Workflows

### Example 1: Context-Based Prompts

```vue
<script setup>
const contextPrompts = {
  summarize: 'Summarize the selected text in 2-3 sentences',
  translate: 'Translate the text to Spanish',
  expand: 'Expand the text with more details'
};

const setPrompt = (context) => {
  const prompt = contextPrompts[context];
  // Update component with dynamic prompt
};
</script>
```

### Example 2: Multi-Step Prompting

```vue
<script setup>
const promptSequence = ref([
  'What is the main topic?',
  'Provide a summary',
  'Suggest improvements'
]);

let currentPromptIndex = ref(0);

const nextPrompt = () => {
  if (currentPromptIndex.value < promptSequence.value.length - 1) {
    currentPromptIndex.value++;
    // Update prompt in component
  }
};
</script>
```

## PromptResponseModel Interface

The `PromptResponseModel` interface defines the structure of items in the `prompts` collection. Each item represents a prompt-response pair.

### Interface Structure

| Property | Type | Description |
|----------|------|-------------|
| `prompt` | string | The prompt text submitted by the user |
| `response` | string | The AI-generated response (plain text or HTML/Markdown) |

### Usage Example

```vue
<script setup>
import { ref } from "vue";

// Define prompts collection with PromptResponseModel structure
const promptsData = ref([
  {
    prompt: 'What is AI?',
    response: '<div>AI stands for Artificial Intelligence, enabling machines to mimic human intelligence.</div>'
  },
  {
    prompt: 'Explain machine learning',
    response: '<div>Machine learning is a subset of AI that allows systems to learn from data without explicit programming.</div>'
  }
]);

// Access individual properties
const getLastPrompt = () => {
  if (inlineAiAssist.value?.prompts?.length > 0) {
    const lastItem = inlineAiAssist.value.prompts[inlineAiAssist.value.prompts.length - 1];
    console.log('Prompt:', lastItem.prompt);
    console.log('Response:', lastItem.response);
    return lastItem;
  }
  return null;
};

// Build prompts programmatically
const buildPromptsCollection = (items) => {
  return items.map(item => ({
    prompt: item.question,
    response: item.answer
  }));
};
</script>
```

### Creating Custom Prompts

```vue
<template>
  <ejs-inlineaiassist 
    :prompts="customPrompts"
    :prompt-request="onPromptRequest"
    ref="inlineAiAssist">
  </ejs-inlineaiassist>
</template>

<script setup>
const customPrompts = ref([
  {
    prompt: 'Summarize the quarterly report',
    response: 'Q1 revenue increased by 15% compared to last year...'
  },
  {
    prompt: 'List key action items',
    response: '1. Follow up with vendors\n2. Schedule team meeting\n3. Review budget allocation'
  }
]);

const onPromptRequest = (args) => {
  // New prompt-response pair will be added to collection
  setTimeout(() => {
    const newResponse = `Response for: ${args.prompt}`;
    inlineAiAssist.value?.addResponse(newResponse);
    
    // Access updated collection
    console.log('Total prompts:', inlineAiAssist.value.prompts.length);
  }, 1000);
};
</script>
```

### Response Formats

The `response` property supports multiple formats:

**Plain Text:**
```javascript
{
  prompt: 'Hello',
  response: 'Hello! How can I assist you today?'
}
```

**HTML:**
```javascript
{
  prompt: 'Format the text',
  response: '<div><strong>Bold text</strong> and <em>italic text</em></div>'
}
```

**Markdown (when using markdown renderer):**
```javascript
{
  prompt: 'Create a list',
  response: '## Items\n\n- Item 1\n- Item 2\n- Item 3'
}
```

## Troubleshooting

### Issue: Response not appearing
- **Solution:** Verify the `prompt-request` event handler calls `addResponse()` method
- **Check:** Ensure API service is reachable and returning valid responses

### Issue: Prompts collection empty
- **Solution:** Confirm responses are added via `addResponse()` method
- **Check:** Verify component reference is correct (ref="inlineAiAssist")

### Issue: Prompt text not updating
- **Solution:** Use v-model binding or direct property updates
- **Example:** Set prompt via props: `:prompt="dynamicPromptText"`
