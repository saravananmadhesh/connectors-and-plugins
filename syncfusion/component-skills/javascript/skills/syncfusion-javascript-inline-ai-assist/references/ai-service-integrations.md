# AI Service Integrations

## Table of Contents
- [Overview](#overview)
- [PromptRequest Event](#promptrequest-event)
- [OpenAI Integration](#openai-integration)
- [Azure OpenAI Integration](#azure-openai-integration)
- [Google Gemini Integration](#google-gemini-integration)
- [Ollama LLM Integration](#ollama-llm-integration)
- [LiteLLM Proxy Integration](#litellm-proxy-integration)
- [Response Formatting](#response-formatting)
- [Error Handling](#error-handling)
- [Streaming vs Standard Responses](#streaming-vs-standard-responses)

---

## Overview

The Inline AI Assist control integrates with various AI services through the `promptRequest` event. This event is triggered when a user submits a prompt, allowing you to send the request to your preferred AI service and display the response.

---

## PromptRequest Event

The `promptRequest` event is the central integration point for AI services.

### Event Structure

```typescript
import { InlineAIAssist, InlinePromptRequestEventArgs } from '@syncfusion/ej2-interactive-chat';

let inlineAssist = new InlineAIAssist({
    relateTo: '#aiBtn',
    promptRequest: (args: InlinePromptRequestEventArgs) => {
        // args.prompt - User's prompt text
        console.log('User prompt:', args.prompt);
        
        // Call your AI service
        callAIService(args.prompt).then(response => {
            // Add response to popup
            inlineAssist.addResponse(response);
        });
    }
});
```

### Event Arguments

```typescript
promptRequest: (args) => {
    // args.prompt: string - The prompt text submitted by user
    console.log('Prompt:', args.prompt);
}
```

---

## OpenAI Integration

### Prerequisites

```bash
npm install openai --save
```

### Basic Integration

```typescript
import { InlineAIAssist } from '@syncfusion/ej2-interactive-chat';
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: 'YOUR_OPENAI_API_KEY',
    dangerouslyAllowBrowser: true  // For client-side demo only
});

let inlineAssist = new InlineAIAssist({
    relateTo: '#aiBtn',
    promptRequest: async (args) => {
        try {
            const completion = await openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: [
                    { role: 'user', content: args.prompt }
                ],
                max_tokens: 150
            });
            
            const response = completion.choices[0].message.content;
            inlineAssist.addResponse(response);
        } catch (error) {
            inlineAssist.addResponse('Error: ' + error.message);
        }
    }
});
```

### Streaming Response with OpenAI

```typescript
let inlineAssist = new InlineAIAssist({
    relateTo: '#aiBtn',
    enableStreaming: true,
    promptRequest: async (args) => {
        try {
            const stream = await openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: args.prompt }],
                stream: true
            });
            
            let fullResponse = '';
            for await (const chunk of stream) {
                const content = chunk.choices[0]?.delta?.content || '';
                fullResponse += content;
                inlineAssist.addResponse(fullResponse);
            }
        } catch (error) {
            inlineAssist.addResponse('Error: ' + error.message);
        }
    }
});
```

---

## Azure OpenAI Integration

### Prerequisites

- Azure account with OpenAI service enabled
- API key, endpoint, deployment name

### Configuration

```typescript
import { InlineAIAssist } from '@syncfusion/ej2-interactive-chat';

const azureOpenAIApiKey = 'YOUR_API_KEY';
const azureOpenAIEndpoint = 'https://your-resource.openai.azure.com/';
const azureOpenAIApiVersion = '2023-05-15';
const azureDeploymentName = 'gpt-4';

let inlineAssist = new InlineAIAssist({
    relateTo: '#aiBtn',
    promptRequest: async (args) => {
        const url = `${azureOpenAIEndpoint}/openai/deployments/${azureDeploymentName}/chat/completions?api-version=${azureOpenAIApiVersion}`;
        
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'api-key': azureOpenAIApiKey
                },
                body: JSON.stringify({
                    messages: [{ role: 'user', content: args.prompt }],
                    max_tokens: 150
                })
            });
            
            const data = await response.json();
            const aiResponse = data.choices[0].message.content;
            inlineAssist.addResponse(aiResponse);
        } catch (error) {
            inlineAssist.addResponse('Error connecting to Azure OpenAI');
        }
    }
});
```

---

## Google Gemini Integration

### Prerequisites

```bash
npm install @google/generative-ai --save
```

### Basic Integration

```typescript
import { InlineAIAssist } from '@syncfusion/ej2-interactive-chat';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI('YOUR_GEMINI_API_KEY');
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

let inlineAssist = new InlineAIAssist({
    relateTo: '#aiBtn',
    promptRequest: async (args) => {
        try {
            const result = await model.generateContent(args.prompt);
            const response = await result.response;
            const text = response.text();
            
            inlineAssist.addResponse(text);
        } catch (error) {
            inlineAssist.addResponse('Error: ' + error.message);
        }
    }
});
```

### Streaming with Gemini

```typescript
let inlineAssist = new InlineAIAssist({
    relateTo: '#aiBtn',
    enableStreaming: true,
    promptRequest: async (args) => {
        try {
            const result = await model.generateContentStream(args.prompt);
            
            let fullResponse = '';
            for await (const chunk of result.stream) {
                const chunkText = chunk.text();
                fullResponse += chunkText;
                inlineAssist.addResponse(fullResponse);
            }
        } catch (error) {
            inlineAssist.addResponse('Error: ' + error.message);
        }
    }
});
```

---

## Ollama LLM Integration

### Prerequisites

- Ollama installed locally
- Running Ollama service (default: http://localhost:11434)

### Basic Integration

```typescript
import { InlineAIAssist } from '@syncfusion/ej2-interactive-chat';

let inlineAssist = new InlineAIAssist({
    relateTo: '#aiBtn',
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
            inlineAssist.addResponse(data.response);
        } catch (error) {
            inlineAssist.addResponse('Error connecting to Ollama');
        }
    }
});
```

### Streaming with Ollama

```typescript
let inlineAssist = new InlineAIAssist({
    relateTo: '#aiBtn',
    enableStreaming: true,
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
                    stream: true
                })
            });
            
            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let fullResponse = '';
            
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                
                const chunk = decoder.decode(value);
                const lines = chunk.split('\n');
                
                for (const line of lines) {
                    if (line.trim()) {
                        const json = JSON.parse(line);
                        fullResponse += json.response;
                        inlineAssist.addResponse(fullResponse);
                    }
                }
            }
        } catch (error) {
            inlineAssist.addResponse('Error connecting to Ollama');
        }
    }
});
```

---

## LiteLLM Proxy Integration

LiteLLM provides a unified API for multiple LLM providers.

### Basic Integration

```typescript
import { InlineAIAssist } from '@syncfusion/ej2-interactive-chat';

const liteLLMEndpoint = 'http://localhost:8000';
const liteLLMApiKey = 'YOUR_API_KEY';

let inlineAssist = new InlineAIAssist({
    relateTo: '#aiBtn',
    promptRequest: async (args) => {
        try {
            const response = await fetch(`${liteLLMEndpoint}/chat/completions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${liteLLMApiKey}`
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo',
                    messages: [{ role: 'user', content: args.prompt }]
                })
            });
            
            const data = await response.json();
            const aiResponse = data.choices[0].message.content;
            inlineAssist.addResponse(aiResponse);
        } catch (error) {
            inlineAssist.addResponse('Error connecting to LiteLLM');
        }
    }
});
```

---

## Response Formatting

### Markdown Responses

```bash
npm install marked --save
```

```typescript
import marked from 'marked';

let inlineAssist = new InlineAIAssist({
    relateTo: '#aiBtn',
    promptRequest: async (args) => {
        const response = await getAIResponse(args.prompt);
        
        // Convert markdown to HTML
        const htmlResponse = marked.parse(response);
        inlineAssist.addResponse(htmlResponse);
    }
});
```

### Plain Text Responses

```typescript
promptRequest: async (args) => {
    const response = await getAIResponse(args.prompt);
    
    // Wrap in paragraph for basic formatting
    const formattedResponse = `<p>${response}</p>`;
    inlineAssist.addResponse(formattedResponse);
}
```

---

## Error Handling

### Comprehensive Error Handling

```typescript
let inlineAssist = new InlineAIAssist({
    relateTo: '#aiBtn',
    promptRequest: async (args) => {
        try {
            const response = await callAIService(args.prompt);
            inlineAssist.addResponse(response);
        } catch (error) {
            let errorMessage = '⚠️ An error occurred. ';
            
            if (error.response) {
                // API error
                errorMessage += `API Error: ${error.response.status}`;
            } else if (error.request) {
                // Network error
                errorMessage += 'Network error. Please check your connection.';
            } else {
                // Other errors
                errorMessage += error.message;
            }
            
            inlineAssist.addResponse(errorMessage);
        }
    }
});
```

### Retry Logic

```typescript
async function callAIWithRetry(prompt, maxRetries = 3) {
    for (let i = 0; i < maxRetries; i++) {
        try {
            return await callAIService(prompt);
        } catch (error) {
            if (i === maxRetries - 1) throw error;
            await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
        }
    }
}

let inlineAssist = new InlineAIAssist({
    relateTo: '#aiBtn',
    promptRequest: async (args) => {
        try {
            const response = await callAIWithRetry(args.prompt);
            inlineAssist.addResponse(response);
        } catch (error) {
            inlineAssist.addResponse('Failed after multiple attempts');
        }
    }
});
```

---

## Streaming vs Standard Responses

### Standard (Non-Streaming)

```typescript
let inlineAssist = new InlineAIAssist({
    enableStreaming: false,
    promptRequest: async (args) => {
        const response = await getCompleteResponse(args.prompt);
        inlineAssist.addResponse(response);  // Response appears all at once
    }
});
```

### Streaming

```typescript
let inlineAssist = new InlineAIAssist({
    enableStreaming: true,
    promptRequest: async (args) => {
        let fullResponse = '';
        const stream = await getStreamingResponse(args.prompt);
        
        for await (const chunk of stream) {
            fullResponse += chunk;
            inlineAssist.addResponse(fullResponse);  // Updates incrementally
        }
    }
});
```

**When to use each:**
- **Standard:** Simple responses, faster initial display, less server load
- **Streaming:** Long responses, better user experience, perceived faster response time

---

## Complete Integration Example

```typescript
import { InlineAIAssist } from '@syncfusion/ej2-interactive-chat';
import OpenAI from 'openai';
import marked from 'marked';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

let inlineAssist = new InlineAIAssist({
    relateTo: '#improveBtn',
    enableStreaming: true,
    promptRequest: async (args) => {
        try {
            const stream = await openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: args.prompt }],
                stream: true
            });
            
            let fullResponse = '';
            for await (const chunk of stream) {
                const content = chunk.choices[0]?.delta?.content || '';
                fullResponse += content;
                
                // Convert markdown to HTML
                const htmlResponse = marked.parse(fullResponse);
                inlineAssist.addResponse(htmlResponse);
            }
        } catch (error) {
            console.error('AI Service Error:', error);
            inlineAssist.addResponse('⚠️ Unable to process your request. Please try again.');
        }
    },
    responseSettings: {
        itemSelect: (args) => {
            if (args.command.label === 'Accept') {
                const response = inlineAssist.prompts[inlineAssist.prompts.length - 1].response;
                document.getElementById('editor').innerHTML = response;
                inlineAssist.hidePopup();
            } else if (args.command.label === 'Discard') {
                inlineAssist.hidePopup();
            }
        }
    }
});

inlineAssist.appendTo('#inlineAssist');
```
