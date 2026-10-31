# AI Service Integrations

## Table of Contents
- [Overview](#overview)
- [OpenAI and Azure OpenAI Integration](#openai-and-azure-openai-integration)
- [Google Gemini Integration](#google-gemini-integration)
- [Ollama LLM Integration](#ollama-llm-integration)
- [LiteLLM Integration](#litellm-integration)
- [MCP Server Integration](#mcp-server-integration)
- [Custom AI Service Integration](#custom-ai-service-integration)
- [Best Practices](#best-practices)

This guide covers integrating various AI services with the Syncfusion AI AssistView component.

---

## Overview

The AI AssistView control provides a user interface for conversational AI. It doesn't include AI capabilities itself—instead, it connects to external AI services through the `promptRequest` event. When a user submits a prompt, you make an API call to your chosen AI service and display the response using `addPromptResponse()`.

### Integration Flow

1. User submits prompt in AI AssistView
2. `promptRequest` event fires with prompt text
3. Your code calls AI service API
4. AI service returns response
5. Your code calls `addPromptResponse()` to display result
6. AI AssistView renders the response with markdown support

### Prerequisites for All Integrations

- Syncfusion AI AssistView package installed
- `marked` library for markdown parsing: `npm install marked --save`

---

## OpenAI and Azure OpenAI Integration

### OpenAI Integration Example

```typescript
import { AIAssistView, PromptRequestEventArgs } from '@syncfusion/ej2-interactive-chat';
import { marked } from 'marked';

const OPENAI_API_KEY = 'sk-...';  // Your API key

const aiAssistView: AIAssistView = new AIAssistView({
    promptSuggestions: [
        'Explain quantum computing',
        'Write a Python function',
        'Best coding practices'
    ],
    promptRequest: async (args: PromptRequestEventArgs) => {
        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${OPENAI_API_KEY}`
                },
                body: JSON.stringify({
                    model: 'gpt-4',
                    messages: [{ role: 'user', content: args.prompt }],
                    max_tokens: 500
                })
            });

            const data = await response.json();
            const aiResponse = data.choices[0].message.content;
            const htmlResponse = marked.parse(aiResponse);
            aiAssistView.addPromptResponse(htmlResponse);
        } catch (error) {
            aiAssistView.addPromptResponse('⚠️ Error connecting to OpenAI. Please check your API key.');
        }
    }
});

aiAssistView.appendTo('#aiAssistView');
```

### Azure OpenAI Integration Example

```typescript
import { AIAssistView } from '@syncfusion/ej2-interactive-chat';
import { marked } from 'marked';

const azureConfig = {
    apiKey: '',          // Your Azure API key
    endpoint: '',
    apiVersion: '',      // e.g., '2024-02-15-preview'
    deploymentName: ''   // e.g., 'gpt-4o-mini'
};

const aiAssistView: AIAssistView = new AIAssistView({
    promptRequest: async (args) => {
        const url = `${azureConfig.endpoint.replace(/\/$/, '')}/openai/deployments/${encodeURIComponent(azureConfig.deploymentName)}/chat/completions?api-version=${encodeURIComponent(azureConfig.apiVersion)}`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'api-key': azureConfig.apiKey
                },
                body: JSON.stringify({
                    messages: [{ role: 'user', content: args.prompt }],
                    max_tokens: 500
                })
            });

            const data = await response.json();
            const aiResponse = data.choices[0].message.content;
            const htmlResponse = marked.parse(aiResponse);
            aiAssistView.addPromptResponse(htmlResponse);
        } catch (error) {
            aiAssistView.addPromptResponse('⚠️ Error connecting to Azure OpenAI.');
        }
    }
});
```

### Streaming Responses

```typescript
import { AIAssistView } from '@syncfusion/ej2-interactive-chat';
import { marked } from 'marked';

let stopStreaming = false;

const aiAssistView: AIAssistView = new AIAssistView({
    enableStreaming: true,
    stopRespondingClick: () => {
        stopStreaming = true;
    },
    promptRequest: async (args) => {
        stopStreaming = false;

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: 'gpt-4',
                messages: [{ role: 'user', content: args.prompt }],
                stream: true
            })
        });

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let fullText = '';

        while (!stopStreaming) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value);
            const lines = chunk.split('\n').filter(line => line.trim() !== '');

            for (const line of lines) {
                if (line.startsWith('data: ')) {
                    const data = line.slice(6);
                    if (data === '[DONE]') continue;

                    try {
                        const parsed = JSON.parse(data);
                        const content = parsed.choices[0]?.delta?.content || '';
                        fullText += content;
                        const htmlResponse = marked.parse(fullText);
                        aiAssistView.addPromptResponse(htmlResponse, false);
                    } catch (e) {}
                }
            }
        }

        aiAssistView.addPromptResponse(marked.parse(fullText), true);
    }
});
```

---

## Google Gemini Integration

### Gemini Integration Example

```typescript
import { AIAssistView, PromptRequestEventArgs } from '@syncfusion/ej2-interactive-chat';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { marked } from 'marked';

const geminiApiKey = '';  // Your Gemini API key
const genAI = new GoogleGenerativeAI(geminiApiKey);

const aiAssistView: AIAssistView = new AIAssistView({
    promptSuggestions: [
        'Explain machine learning',
        'Write a sorting algorithm',
        'Best project structure'
    ],
    promptRequest: async (args: PromptRequestEventArgs) => {
        try {
            const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
            const result = await model.generateContent(args.prompt);
            const response = await result.response;
            const text = response.text();
            const htmlResponse = marked.parse(text);
            aiAssistView.addPromptResponse(htmlResponse);
        } catch (error) {
            aiAssistView.addPromptResponse('⚠️ Error connecting to Gemini AI.');
        }
    }
});

aiAssistView.appendTo('#aiAssistView');
```

### Gemini Streaming Example

```typescript
let stopStreaming = false;

const aiAssistView: AIAssistView = new AIAssistView({
    enableStreaming: true,
    stopRespondingClick: () => {
        stopStreaming = true;
    },
    promptRequest: async (args) => {
        stopStreaming = false;
        const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
        const result = await model.generateContentStream(args.prompt);

        let fullText = '';
        for await (const chunk of result.stream) {
            if (stopStreaming) break;

            const chunkText = chunk.text();
            fullText += chunkText;
            const htmlResponse = marked.parse(fullText);
            aiAssistView.addPromptResponse(htmlResponse, false);
        }

        aiAssistView.addPromptResponse(marked.parse(fullText), true);
    }
});
```

---

## Ollama LLM Integration

Ollama allows you to run large language models locally on your machine.

### Ollama Integration Example

```typescript
import { AIAssistView } from '@syncfusion/ej2-interactive-chat';
import { marked } from 'marked';

const aiAssistView: AIAssistView = new AIAssistView({
    promptRequest: async (args) => {
        try {
            const response = await fetch('http://localhost:11434/api/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: 'llama2',
                    prompt: args.prompt,
                    stream: false
                })
            });

            const data = await response.json();
            const htmlResponse = marked.parse(data.response);
            aiAssistView.addPromptResponse(htmlResponse);
        } catch (error) {
            aiAssistView.addPromptResponse('⚠️ Error connecting to Ollama. Ensure Ollama is running locally.');
        }
    }
});
```

---

## LiteLLM Integration

LiteLLM is a proxy service that provides a unified interface to multiple AI providers.

### LiteLLM Integration Example

```typescript
import { AIAssistView } from '@syncfusion/ej2-interactive-chat';
import { marked } from 'marked';

const aiAssistView: AIAssistView = new AIAssistView({
    promptRequest: async (args) => {
        try {
            const response = await fetch('http://localhost:8000/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo',
                    messages: [{ role: 'user', content: args.prompt }]
                })
            });

            const data = await response.json();
            const aiResponse = data.choices[0].message.content;
            const htmlResponse = marked.parse(aiResponse);
            aiAssistView.addPromptResponse(htmlResponse);
        } catch (error) {
            aiAssistView.addPromptResponse('⚠️ Error connecting to LiteLLM proxy.');
        }
    }
});
```

---

## MCP Server Integration

Model Context Protocol (MCP) servers provide additional context and tools for AI models.

### MCP Integration Example

```typescript
import { AIAssistView } from '@syncfusion/ej2-interactive-chat';
import { marked } from 'marked';

const aiAssistView: AIAssistView = new AIAssistView({
    promptRequest: async (args) => {
        try {
            const response = await fetch('http://localhost:3000/mcp/query', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    prompt: args.prompt,
                    context: {
                        conversationHistory: aiAssistView.prompts
                    }
                })
            });

            const data = await response.json();
            const htmlResponse = marked.parse(data.response);
            aiAssistView.addPromptResponse(htmlResponse);
        } catch (error) {
            aiAssistView.addPromptResponse('⚠️ Error connecting to MCP server.');
        }
    }
});
```

---

## Custom AI Service Integration

You can integrate any AI service by implementing the `promptRequest` event handler.

### Generic Pattern

```typescript
const aiAssistView: AIAssistView = new AIAssistView({
    promptRequest: async (args: PromptRequestEventArgs) => {
        try {
            // 1. Call your AI service
            const response = await fetch('YOUR_AI_SERVICE_URL', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer YOUR_API_KEY'
                },
                body: JSON.stringify({
                    prompt: args.prompt,
                    // ... other parameters
                })
            });

            // 2. Parse the response
            const data = await response.json();
            const aiResponse = data.response || data.completion || data.text;

            // 3. Convert markdown to HTML if needed
            const htmlResponse = marked.parse(aiResponse);

            // 4. Display in AI AssistView
            aiAssistView.addPromptResponse(htmlResponse);

        } catch (error) {
            // 5. Handle errors gracefully
            aiAssistView.addPromptResponse('⚠️ Error connecting to AI service.');
            console.error('AI Service Error:', error);
        }
    }
});
```

---

## Best Practices

### 1. Secure API Key Management

```typescript
// ❌ DON'T: Hardcode keys in client code
const apiKey = 'sk-1234567890abcdef';

// ✅ DO: Use environment variables
const apiKey = process.env.OPENAI_API_KEY;

// ✅ DO: Use server-side proxy
const response = await fetch('/api/ai-proxy', {
    method: 'POST',
    body: JSON.stringify({ prompt: args.prompt })
});
```

### 2. Error Handling

```typescript
promptRequest: async (args) => {
    try {
        const response = await fetch(AI_ENDPOINT, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({ prompt: args.prompt })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        aiAssistView.addPromptResponse(marked.parse(data.text));

    } catch (error) {
        console.error('AI Service Error:', error);
        aiAssistView.addPromptResponse('⚠️ Unable to connect to AI service. Please try again.');
    }
}
```

### 3. Loading Indicators

```typescript
promptRequest: async (args) => {
    // Show loading state
    aiAssistView.addPromptResponse('🤔 Thinking...', false);

    try {
        const response = await callAIService(args.prompt);
        // Replace loading with actual response
        aiAssistView.addPromptResponse(marked.parse(response), true);
    } catch (error) {
        aiAssistView.addPromptResponse('⚠️ Error occurred.', true);
    }
}
```

### 4. Rate Limiting and Throttling

```typescript
let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL = 1000; // 1 second

promptRequest: async (args) => {
    const now = Date.now();
    if (now - lastRequestTime < MIN_REQUEST_INTERVAL) {
        aiAssistView.addPromptResponse('⏳ Please wait before sending another prompt.');
        return;
    }

    lastRequestTime = now;
    // ... proceed with AI request
}
```

### 5. Context Management

```typescript
// Maintain conversation history
const conversationHistory: Array<{role: string, content: string}> = [];

promptRequest: async (args) => {
    // Add user prompt to history
    conversationHistory.push({
        role: 'user',
        content: args.prompt
    });

    const response = await fetch(AI_ENDPOINT, {
        body: JSON.stringify({
            messages: conversationHistory,
            // ... other params
        })
    });

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    // Add AI response to history
    conversationHistory.push({
        role: 'assistant',
        content: aiResponse
    });

    aiAssistView.addPromptResponse(marked.parse(aiResponse));
}
```

### 6. Stop Streaming Support

```typescript
let currentController: AbortController | null = null;

const aiAssistView: AIAssistView = new AIAssistView({
    enableStreaming: true,
    stopRespondingClick: () => {
        if (currentController) {
            currentController.abort();
            currentController = null;
        }
    },
    promptRequest: async (args) => {
        currentController = new AbortController();

        try {
            const response = await fetch(AI_ENDPOINT, {
                method: 'POST',
                signal: currentController.signal,
                // ... other options
            });

            // ... handle streaming
        } catch (error) {
            if (error.name === 'AbortError') {
                console.log('Request aborted by user');
            }
        } finally {
            currentController = null;
        }
    }
});
```

---

## Summary

**Supported AI Services:**
- OpenAI and Azure OpenAI
- Google Gemini
- Ollama (local models)
- LiteLLM (proxy)
- MCP Servers
- Custom AI services

**Key Integration Points:**
- `promptRequest` event for handling user prompts
- `addPromptResponse()` method for displaying responses
- Markdown support with `marked` library
- Streaming support with `enableStreaming` property
- Error handling and user feedback
