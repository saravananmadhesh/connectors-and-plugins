# Connecting to AI Services

## Table of Contents
- [OpenAI Integration](#openai-integration)
- [Google Gemini Integration](#google-gemini-integration)
- [Claude Integration](#claude-integration)
- [API Credential Management](#api-credential-management)
- [Mock vs Real Responses](#mock-vs-real-responses)
- [Error Handling](#error-handling)
- [Rate Limiting](#rate-limiting)

## OpenAI Integration

### Basic OpenAI Setup

```vue
<template>
  <div style="height: 500px; width: 700px;">
    <ejs-aiassistview
      ref="aiassist"
      :prompt-suggestions="suggestions"
      :prompt-request="onPromptRequest"
    />
  </div>
</template>

<script setup>
import { AIAssistViewComponent as EjsAiassistview } from "@syncfusion/ej2-vue-interactive-chat";
import { ref } from "vue";

const aiassist = ref(null);

const suggestions = [
  "What is Vue?",
  "How do I create components?",
  "Explain the Composition API"
];

const OPENAI_API_KEY = process.env.VUE_APP_OPENAI_KEY;

const onPromptRequest = async (args) => {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'user', content: args.prompt }
        ],
        max_tokens: 500,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;
    
    aiassist.value.addPromptResponse(aiResponse);
  } catch (error) {
    aiassist.value.addPromptResponse(`Error: ${error.message}`);
  }
};
</script>
```

### OpenAI with Streaming

```javascript
const onPromptRequest = async (args) => {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: args.prompt }],
        stream: true
      })
    });

    const reader = response.body.getReader();
    let fullResponse = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = new TextDecoder().decode(value);
      const lines = chunk.split('\n');

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          try {
            const data = JSON.parse(line.slice(6));
            const content = data.choices[0].delta.content;
            if (content) {
              fullResponse += content;
              aiassist.value.addPromptResponse(fullResponse);
            }
          } catch (e) {
            // Parse error, continue
          }
        }
      }
    }
  } catch (error) {
    aiassist.value.addPromptResponse('Error: ' + error.message);
  }
};
```

## Google Gemini Integration

### Basic Gemini Setup

```javascript
const GEMINI_API_KEY = process.env.VUE_APP_GEMINI_KEY;

const onPromptRequest = async (args) => {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: args.prompt }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();
    const aiResponse = data.candidates[0].content.parts[0].text;
    
    aiassist.value.addPromptResponse(aiResponse);
  } catch (error) {
    aiassist.value.addPromptResponse('Error: ' + error.message);
  }
};
```

### Gemini with Streaming

```javascript
const onPromptRequest = async (args) => {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:streamGenerateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: args.prompt }
              ]
            }
          ]
        })
      }
    );

    const reader = response.body.getReader();
    let fullResponse = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = new TextDecoder().decode(value);
      const lines = chunk.split('\n');

      for (const line of lines) {
        if (line.trim()) {
          try {
            const data = JSON.parse(line);
            const content = data.candidates[0].content.parts[0].text;
            if (content) {
              fullResponse += content;
              aiassist.value.addPromptResponse(fullResponse);
            }
          } catch (e) {
            // Parse error
          }
        }
      }
    }
  } catch (error) {
    aiassist.value.addPromptResponse('Error: ' + error.message);
  }
};
```

## Claude Integration

### Basic Claude Setup (via Anthropic API)

```javascript
const CLAUDE_API_KEY = process.env.VUE_APP_CLAUDE_KEY;

const onPromptRequest = async (args) => {
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': CLAUDE_API_KEY,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        model: 'claude-3-sonnet-20240229',
        max_tokens: 1024,
        messages: [
          { role: 'user', content: args.prompt }
        ]
      })
    });

    const data = await response.json();
    const aiResponse = data.content[0].text;
    
    aiassist.value.addPromptResponse(aiResponse);
  } catch (error) {
    aiassist.value.addPromptResponse('Error: ' + error.message);
  }
};
```

### Claude with Streaming

```javascript
const onPromptRequest = async (args) => {
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': CLAUDE_API_KEY,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        model: 'claude-3-sonnet-20240229',
        max_tokens: 1024,
        stream: true,
        messages: [
          { role: 'user', content: args.prompt }
        ]
      })
    });

    const reader = response.body.getReader();
    let fullResponse = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = new TextDecoder().decode(value);
      const lines = chunk.split('\n');

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          try {
            const data = JSON.parse(line.slice(6));
            if (data.type === 'content_block_delta') {
              const content = data.delta.text;
              if (content) {
                fullResponse += content;
                aiassist.value.addPromptResponse(fullResponse);
              }
            }
          } catch (e) {
            // Parse error
          }
        }
      }
    }
  } catch (error) {
    aiassist.value.addPromptResponse('Error: ' + error.message);
  }
};
```

## API Credential Management

### Environment Variables

Create a `.env.local` file:

```bash
VUE_APP_OPENAI_KEY=sk-xxxxxxxxxxxxxxxxxx
VUE_APP_GEMINI_KEY=AIzaSyxxxxxxxxxxxxx
VUE_APP_CLAUDE_KEY=sk-ant-xxxxxxxxxxxxxxxxxx
```

### Backend Proxy (Recommended)

Instead of exposing API keys to frontend, use a backend proxy:

```javascript
// Frontend
const onPromptRequest = async (args) => {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt: args.prompt })
    });

    const data = await response.json();
    aiassist.value.addPromptResponse(data.response);
  } catch (error) {
    aiassist.value.addPromptResponse('Error: ' + error.message);
  }
};
```

Backend (Node.js/Express):

```javascript
app.post('/api/chat', async (req, res) => {
  const { prompt } = req.body;
  
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 500
      })
    });

    const data = await response.json();
    res.json({ response: data.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

## Mock vs Real Responses

### Mock Responses (Development)

```javascript
const MOCK_MODE = process.env.NODE_ENV === 'development';

const onPromptRequest = async (args) => {
  if (MOCK_MODE) {
    // Use mock responses
    const mockResponses = {
      'what is vue': 'Vue is a JavaScript framework...',
      'how do i': 'Here\'s how you do it...',
      'tell me about': 'Here\'s information about that...'
    };

    const key = Object.keys(mockResponses).find(k =>
      args.prompt.toLowerCase().includes(k)
    );

    const response = mockResponses[key] || 'I don\'t have a mock response for that.';
    
    setTimeout(() => {
      aiassist.value.addPromptResponse(response);
    }, 1000);
  } else {
    // Use real API
    await callRealAIService(args.prompt);
  }
};
```

### Fallback to Mock

```javascript
const onPromptRequest = async (args) => {
  try {
    const response = await callAIService(args.prompt);
    aiassist.value.addPromptResponse(response);
  } catch (error) {
    console.warn('AI service failed, using fallback:', error);
    
    // Fallback response
    const fallback = `I encountered an error processing your request: ${error.message}`;
    aiassist.value.addPromptResponse(fallback);
  }
};
```

## Error Handling

### Comprehensive Error Handling

```javascript
const onPromptRequest = async (args) => {
  try {
    // Validate input
    if (!args.prompt || args.prompt.trim().length === 0) {
      aiassist.value.addPromptResponse('Please enter a valid prompt');
      return;
    }

    // Call API
    const response = await Promise.race([
      callAIService(args.prompt),
      timeout(10000) // 10 second timeout
    ]);

    aiassist.value.addPromptResponse(response);
  } catch (error) {
    let errorMessage;

    if (error.message === 'Timeout') {
      errorMessage = 'Request timed out. Please try again.';
    } else if (error.status === 429) {
      errorMessage = 'Rate limit exceeded. Please wait a moment.';
    } else if (error.status === 401) {
      errorMessage = 'Authentication failed. Please check your API key.';
    } else if (error.status === 500) {
      errorMessage = 'Service error. Please try again later.';
    } else if (error.name === 'NetworkError') {
      errorMessage = 'Network error. Please check your connection.';
    } else {
      errorMessage = `Error: ${error.message}`;
    }

    aiassist.value.addPromptResponse(errorMessage);
    console.error('AI Service Error:', error);
  }
};

const timeout = (ms) => new Promise((_, reject) =>
  setTimeout(() => reject(new Error('Timeout')), ms)
);
```

## Rate Limiting

### Simple Rate Limiting

```javascript
let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL = 1000; // 1 second between requests

const onPromptRequest = async (args) => {
  const now = Date.now();
  const timeSinceLastRequest = now - lastRequestTime;

  if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
    aiassist.value.addPromptResponse(
      'Please wait before sending another request'
    );
    return;
  }

  lastRequestTime = now;
  
  try {
    const response = await callAIService(args.prompt);
    aiassist.value.addPromptResponse(response);
  } catch (error) {
    aiassist.value.addPromptResponse('Error: ' + error.message);
  }
};
```

### Request Queue with Concurrency Control

```javascript
const MAX_CONCURRENT_REQUESTS = 3;
let activeRequests = 0;
const requestQueue = [];

const queueRequest = async (prompt) => {
  return new Promise((resolve) => {
    requestQueue.push({ prompt, resolve });
    processQueue();
  });
};

const processQueue = async () => {
  while (activeRequests < MAX_CONCURRENT_REQUESTS && requestQueue.length > 0) {
    const { prompt, resolve } = requestQueue.shift();
    activeRequests++;

    try {
      const response = await callAIService(prompt);
      resolve(response);
    } catch (error) {
      resolve(`Error: ${error.message}`);
    } finally {
      activeRequests--;
      processQueue();
    }
  }
};

const onPromptRequest = async (args) => {
  const response = await queueRequest(args.prompt);
  aiassist.value.addPromptResponse(response);
};
```

### Token Usage Tracking

```javascript
let tokenUsage = 0;
const MAX_TOKENS_PER_DAY = 100000;

const onPromptRequest = async (args) => {
  // Estimate tokens (roughly 4 characters = 1 token)
  const estimatedTokens = Math.ceil(args.prompt.length / 4);

  if (tokenUsage + estimatedTokens > MAX_TOKENS_PER_DAY) {
    aiassist.value.addPromptResponse(
      'Daily token limit exceeded. Please try again tomorrow.'
    );
    return;
  }

  try {
    const response = await callAIService(args.prompt);
    tokenUsage += estimatedTokens;
    
    aiassist.value.addPromptResponse(response);
    console.log(`Token usage: ${tokenUsage}/${MAX_TOKENS_PER_DAY}`);
  } catch (error) {
    aiassist.value.addPromptResponse('Error: ' + error.message);
  }
};
```

### Retry with Exponential Backoff

```javascript
const MAX_RETRIES = 3;

const callWithRetry = async (prompt, attempt = 1) => {
  try {
    return await callAIService(prompt);
  } catch (error) {
    if (attempt < MAX_RETRIES && isRetryableError(error)) {
      const delay = Math.pow(2, attempt) * 1000; // Exponential backoff
      await new Promise(resolve => setTimeout(resolve, delay));
      return callWithRetry(prompt, attempt + 1);
    }
    throw error;
  }
};

const isRetryableError = (error) => {
  // Retry on network errors or 5xx status codes
  return error.status >= 500 || error.name === 'NetworkError';
};

const onPromptRequest = async (args) => {
  try {
    const response = await callWithRetry(args.prompt);
    aiassist.value.addPromptResponse(response);
  } catch (error) {
    aiassist.value.addPromptResponse('Error: ' + error.message);
  }
};
```
