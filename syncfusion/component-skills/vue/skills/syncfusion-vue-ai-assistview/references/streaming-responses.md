# Streaming Responses

Configure and implement real-time streaming of AI responses for a modern, interactive user experience.

## Table of Contents
- [Overview](#overview)
- [Enable Streaming](#enable-streaming)
- [Streaming Implementation](#streaming-implementation)
- [Handling Streaming Events](#handling-streaming-events)
- [Progressive Response Building](#progressive-response-building)
- [Complete Examples](#complete-examples)
- [Best Practices](#best-practices)

## Overview

The `enableStreaming` property allows responses to be displayed as they arrive, character by character, instead of waiting for the complete response. This provides immediate visual feedback and improves perceived performance.

**When to use:**
- OpenAI/Gemini streaming APIs
- Long-form responses that take time to generate
- Real-time data processing
- Any scenario requiring progressive response rendering

**When not to use:**
- Instant mock responses
- Pre-computed static content
- Responses smaller than 100 characters

## Enable Streaming

### Basic Configuration

```vue
<template>
  <div style="height: 500px; width: 700px;">
    <ejs-aiassistview
      ref="aiassist"
      :enable-streaming="true"
      :prompt-request="onPromptRequest"
    />
  </div>
</template>

<script setup>
import { AIAssistViewComponent as EjsAiassistview } from "@syncfusion/ej2-vue-interactive-chat";
import { ref } from 'vue';

const aiassist = ref(null);
const enableStreaming = ref(true);

const onPromptRequest = (args) => {
  // Streaming will be handled by updateResponse method
  simulateStreamingResponse(args.prompt);
};

const simulateStreamingResponse = async (prompt) => {
  const words = ['This', 'is', 'a', 'streaming', 'response', 'from', 'AI'];
  let fullResponse = '';
  
  for (const word of words) {
    fullResponse += word + ' ';
    // Add response progressively with streaming indicator
    aiassist.value.addPromptResponse(fullResponse, false);  // false = not final update
    await new Promise(resolve => setTimeout(resolve, 500));  // 500ms delay
  }
  
  // Mark as final update
  aiassist.value.addPromptResponse(fullResponse, true);
};
</script>
```

## Streaming Implementation

### addPromptResponse with Streaming

The `addPromptResponse` method supports streaming through the `isFinalUpdate` parameter:

```javascript
// Syntax
aiassist.value.addPromptResponse(outputResponse, isFinalUpdate);

// Parameters:
// - outputResponse (string): Current response content
// - isFinalUpdate (boolean, optional): true when response is complete
```

### Streaming Pattern

```javascript
const streamResponse = async (prompt) => {
  let accumulatedResponse = '';
  
  // Simulate character-by-character streaming
  const responseText = "This is a streamed response...";
  
  for (let i = 0; i < responseText.length; i++) {
    accumulatedResponse += responseText[i];
    
    // Update with false to show streaming indicator
    aiassist.value.addPromptResponse(
      accumulatedResponse,
      false  // Not final, streaming in progress
    );
    
    // Small delay between characters for visual effect
    await new Promise(resolve => setTimeout(resolve, 50));
  }
  
  // Final update with true
  aiassist.value.addPromptResponse(
    accumulatedResponse,
    true  // Final update, stop showing indicator
  );
};
```

## Handling Streaming Events

### Detect Streaming Status

```vue
<template>
  <div>
    <div v-if="isStreaming" class="streaming-indicator">
      <span class="spinner"></span> Streaming response...
    </div>
    <ejs-aiassistview
      ref="aiassist"
      :enable-streaming="true"
      :prompt-request="onPromptRequest"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const isStreaming = ref(false);

const onPromptRequest = async (args) => {
  isStreaming.value = true;
  
  try {
    await streamFromAPI(args.prompt);
  } finally {
    isStreaming.value = false;
  }
};

const streamFromAPI = async (prompt) => {
  // API streaming implementation
};
</script>

<style scoped>
.streaming-indicator {
  padding: 10px;
  background: #e8f4f8;
  border-left: 3px solid #0066cc;
  margin: 10px 0;
}

.spinner {
  display: inline-block;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
```

### Progress Tracking

```javascript
import { ref } from 'vue';

const streamingProgress = ref(0);
const totalChunks = ref(0);

const trackStreamingProgress = (chunkIndex, totalChunks) => {
  streamingProgress.value = (chunkIndex / totalChunks) * 100;
};

const streamWithProgress = async (prompt) => {
  const chunks = ['First chunk', 'Second chunk', 'Third chunk'];
  totalChunks.value = chunks.length;
  
  let fullResponse = '';
  
  for (let i = 0; i < chunks.length; i++) {
    fullResponse += chunks[i] + ' ';
    trackStreamingProgress(i + 1, chunks.length);
    
    const isFinal = i === chunks.length - 1;
    aiassist.value.addPromptResponse(fullResponse, isFinal);
    
    await new Promise(resolve => setTimeout(resolve, 500));
  }
};
```

## Progressive Response Building

### Word-by-Word Streaming

```javascript
const streamWordByWord = async (prompt) => {
  const apiResponse = await fetch('/api/chat', {
    method: 'POST',
    body: JSON.stringify({ prompt })
  });
  
  const reader = apiResponse.body.getReader();
  const decoder = new TextDecoder();
  let fullResponse = '';
  let buffer = '';
  
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    
    buffer += decoder.decode(value, { stream: true });
    const words = buffer.split(' ');
    
    // Process all complete words
    for (let i = 0; i < words.length - 1; i++) {
      fullResponse += (fullResponse ? ' ' : '') + words[i];
      aiassist.value.addPromptResponse(fullResponse, false);
      await new Promise(resolve => setTimeout(resolve, 50));
    }
    
    // Keep incomplete word in buffer
    buffer = words[words.length - 1];
  }
  
  // Add remaining text
  if (buffer) {
    fullResponse += (fullResponse ? ' ' : '') + buffer;
    aiassist.value.addPromptResponse(fullResponse, true);
  }
};
```

### Chunk-based Streaming

```javascript
const streamByChunks = async (prompt) => {
  const response = await fetch('/api/stream', {
    method: 'POST',
    body: JSON.stringify({ prompt })
  });
  
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let fullResponse = '';
  
  try {
    while (true) {
      const { done, value } = await reader.read();
      
      if (done) {
        // Final update when stream ends
        aiassist.value.addPromptResponse(fullResponse, true);
        break;
      }
      
      // Accumulate chunks
      fullResponse += decoder.decode(value, { stream: true });
      
      // Update UI with accumulated response
      aiassist.value.addPromptResponse(fullResponse, false);
    }
  } catch (error) {
    console.error('Streaming error:', error);
    aiassist.value.addPromptResponse(
      'Error during streaming: ' + error.message,
      true
    );
  }
};
```

### HTML Streaming with Markdown

```javascript
const streamMarkdown = async (prompt) => {
  let markdownBuffer = '';
  let htmlBuffer = '';
  
  const updateMarkdown = (text) => {
    markdownBuffer += text;
    // Convert markdown to HTML progressively
    htmlBuffer = markdownToHTML(markdownBuffer);
    aiassist.value.addPromptResponse(htmlBuffer, false);
  };
  
  const markdownToHTML = (md) => {
    // Simple markdown conversion
    return md
      .replace(/^### (.*)/gm, '<h3>$1</h3>')
      .replace(/^## (.*)/gm, '<h2>$1</h2>')
      .replace(/^# (.*)/gm, '<h1>$1</h1>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br/>');
  };
  
  // Stream from API
  const response = await fetch('/api/markdown-stream', {
    method: 'POST',
    body: JSON.stringify({ prompt })
  });
  
  // Implementation similar to previous examples
};
```

## Complete Examples

### Example 1: OpenAI Streaming

```vue
<template>
  <div style="height: 500px; width: 700px;">
    <ejs-aiassistview
      ref="aiassist"
      :enable-streaming="true"
      :prompt-request="onPromptRequest"
    />
  </div>
</template>

<script setup>
import { AIAssistViewComponent as EjsAiassistview } from "@syncfusion/ej2-vue-interactive-chat";
import { ref } from 'vue';

const aiassist = ref(null);
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_KEY;

const onPromptRequest = async (args) => {
  try {
    await streamFromOpenAI(args.prompt);
  } catch (error) {
    aiassist.value.addPromptResponse(
      'Error: ' + error.message,
      true
    );
  }
};

const streamFromOpenAI = async (prompt) => {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      stream: true
    })
  });
  
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let fullResponse = '';
  
  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      aiassist.value.addPromptResponse(fullResponse, true);
      break;
    }
    
    const chunk = decoder.decode(value);
    const lines = chunk.split('\n').filter(line => line.trim());
    
    for (const line of lines) {
      if (line.startsWith('data: ')) {
        const json = JSON.parse(line.slice(6));
        const content = json.choices[0]?.delta?.content;
        
        if (content) {
          fullResponse += content;
          aiassist.value.addPromptResponse(fullResponse, false);
        }
      }
    }
  }
};
</script>
```

### Example 2: Simulated Streaming

```vue
<template>
  <div style="height: 500px; width: 700px;">
    <ejs-aiassistview
      ref="aiassist"
      :enable-streaming="true"
      :prompt-request="onPromptRequest"
    />
  </div>
</template>

<script setup>
import { AIAssistViewComponent as EjsAiassistview } from "@syncfusion/ej2-vue-interactive-chat";
import { ref } from 'vue';

const aiassist = ref(null);

const onPromptRequest = async (args) => {
  simulateStreamingResponse(args.prompt);
};

const simulateStreamingResponse = async (prompt) => {
  const responses = {
    'hello': 'Hello! How can I assist you today?',
    'how are you': 'I\'m doing great, thank you for asking!',
    'default': `You asked: "${prompt}". This is a simulated streamed response.`
  };
  
  const responseText = responses[prompt.toLowerCase()] || responses.default;
  let fullResponse = '';
  
  // Simulate streaming with character delay
  for (let i = 0; i < responseText.length; i++) {
    fullResponse += responseText[i];
    const isFinal = i === responseText.length - 1;
    
    aiassist.value.addPromptResponse(fullResponse, isFinal);
    
    // 50ms between characters creates smooth typing effect
    if (!isFinal) {
      await new Promise(resolve => setTimeout(resolve, 50));
    }
  }
};
</script>
```

### Example 3: Smart Streaming Control

```javascript
import { ref, computed } from 'vue';

const enableStreaming = ref(true);
const responseLength = ref(0);

// Enable streaming only for long responses
const shouldStream = computed(() => {
  return enableStreaming.value && responseLength.value > 100;
});

const intelligentStream = async (prompt, responseText) => {
  responseLength.value = responseText.length;
  
  if (shouldStream.value) {
    // Stream character by character for long responses
    let current = '';
    for (let i = 0; i < responseText.length; i++) {
      current += responseText[i];
      aiassist.value.addPromptResponse(
        current,
        i === responseText.length - 1
      );
      await new Promise(resolve => setTimeout(resolve, 30));
    }
  } else {
    // Show immediately for short responses
    aiassist.value.addPromptResponse(responseText, true);
  }
};
```

## Best Practices

### 1. Appropriate Streaming Speed
```javascript
// ✓ Good: Natural reading pace (40-60ms per character)
await new Promise(resolve => setTimeout(resolve, 50));

// ✗ Too fast: Hard to read
await new Promise(resolve => setTimeout(resolve, 10));

// ✗ Too slow: Feels unresponsive
await new Promise(resolve => setTimeout(resolve, 500));
```

### 2. Error Handling
```javascript
// ✓ Good: Handle streaming errors gracefully
try {
  await streamFromAPI(prompt);
} catch (error) {
  aiassist.value.addPromptResponse(
    `<strong style="color: red;">Error:</strong> ${error.message}`,
    true
  );
}
```

### 3. Disable During Critical Operations
```javascript
// ✓ Good: Only stream when appropriate
if (isStreamingSupported && response.length > 50) {
  await streamResponse(response);
} else {
  aiassist.value.addPromptResponse(response, true);
}
```

### 4. User Control
```javascript
// ✓ Good: Let users toggle streaming
const streamingEnabled = ref(true);

const submitPrompt = async (prompt) => {
  if (streamingEnabled.value) {
    await streamResponse(prompt);
  } else {
    aiassist.value.addPromptResponse(response, true);
  }
};
```

### 5. Progress Indication
```javascript
// ✓ Good: Show that response is streaming
const isStreaming = ref(false);

const stream = async (prompt) => {
  isStreaming.value = true;
  try {
    await streamFromAPI(prompt);
  } finally {
    isStreaming.value = false;
  }
};
```
