# AI Service Integration Guide

## Table of Contents
- [Integration Overview](#integration-overview)
- [Azure OpenAI Integration](#azure-openai-integration)
- [Gemini Integration](#gemini-integration)
- [Lite-LLM Integration](#lite-llm-integration)
- [Model Context Protocol (MCP) Integration](#model-context-protocol-mcp-integration)
- [Ollama Integration](#ollama-integration)
- [Security Best Practices](#security-best-practices)

---

## Integration Overview

The AI AssistView component integrates seamlessly with multiple AI service providers. Each integration requires proper configuration, API credentials, and secure handling of sensitive information.

### General Integration Pattern

```typescript
@Component({
  imports: [AIAssistViewModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div ejs-aiassistview 
      #aiAssistViewComponent
      id='aiAssistView'
      (promptRequest)="onPromptRequest($event)">
    </div>
  `
})
export class AppComponent {
  @ViewChild('aiAssistViewComponent')
  public aiAssistViewComponent!: AIAssistViewComponent;

  async onPromptRequest(args: any) {
    const userPrompt = args.prompt;
    
    try {
      // Call your AI service
      const response = await this.callAIService(userPrompt);
      
      // Display response in component
      this.aiAssistViewComponent.addPromptResponse(response);
    } catch (error) {
      console.error('AI service error:', error);
      const errorMessage = 'Sorry, I encountered an error processing your request.';
      this.aiAssistViewComponent.addPromptResponse(errorMessage);
    }
  }

  private async callAIService(prompt: string): Promise<string> {
    // Implementation depends on chosen provider
    return '';
  }
}
```

---

## Azure OpenAI Integration

Integrate Azure OpenAI to leverage GPT models:

### Prerequisites

- Azure Account with Azure OpenAI resource
- API Key and Endpoint from Azure Portal
- Deployment name (e.g., gpt-4o-mini)
- API version

### Implementation

```typescript
import { Component, ViewChild } from '@angular/core';
import { AIAssistViewModule, AIAssistViewComponent } from '@syncfusion/ej2-angular-interactive-chat';

@Component({
  imports: [AIAssistViewModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div ejs-aiassistview 
      #aiAssistViewComponent
      id='aiAssistView'
      (promptRequest)="onPromptRequest($event)">
    </div>
  `
})
export class AppComponent {
  @ViewChild('aiAssistViewComponent')
  public aiAssistViewComponent!: AIAssistViewComponent;

  private readonly AZURE_API_KEY = 'your-api-key';
  private readonly AZURE_ENDPOINT = 'https://your-resource.openai.azure.com';
  private readonly AZURE_DEPLOYMENT = 'gpt-4o-mini';
  private readonly AZURE_API_VERSION = '2024-08-01-preview';

  async onPromptRequest(args: any) {
    const userPrompt = args.prompt;
    
    try {
      const response = await this.callAzureOpenAI(userPrompt);
      this.aiAssistViewComponent.addPromptResponse(response);
    } catch (error) {
      this.aiAssistViewComponent.addPromptResponse('Error: Unable to process your request.');
    }
  }

  private async callAzureOpenAI(prompt: string): Promise<string> {
    const url = `${this.AZURE_ENDPOINT}/openai/deployments/${this.AZURE_DEPLOYMENT}/chat/completions?api-version=${this.AZURE_API_VERSION}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': this.AZURE_API_KEY
      },
      body: JSON.stringify({
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 800
      })
    });

    if (!response.ok) {
      throw new Error(`Azure OpenAI error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  }
}
```

### Security Note

Never expose API keys in client-side code. Use a backend proxy or environment variables:

```typescript
// In environment.ts
export const environment = {
  production: false,
  aiServiceUrl: 'http://localhost:3000/api/ai' // Backend proxy
};

// In component
private readonly AI_SERVICE_URL = environment.aiServiceUrl;

async callAIService(prompt: string): Promise<string> {
  const response = await fetch(`${this.AI_SERVICE_URL}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt })
  });
  
  const data = await response.json();
  return data.response;
}
```

---

## Gemini Integration

Integrate Google's Gemini API:

### Setup

```typescript
@Component({
  imports: [AIAssistViewModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div ejs-aiassistview 
      #aiAssistViewComponent
      id='aiAssistView'
      (promptRequest)="onPromptRequest($event)">
    </div>
  `
})
export class AppComponent {
  @ViewChild('aiAssistViewComponent')
  public aiAssistViewComponent!: AIAssistViewComponent;

  private readonly GEMINI_API_KEY = 'your-gemini-api-key';
  private readonly GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

  async onPromptRequest(args: any) {
    const userPrompt = args.prompt;
    
    try {
      const response = await this.callGeminiAPI(userPrompt);
      this.aiAssistViewComponent.addPromptResponse(response);
    } catch (error) {
      this.aiAssistViewComponent.addPromptResponse('Error: Gemini API call failed.');
    }
  }

  private async callGeminiAPI(prompt: string): Promise<string> {
    const url = `${this.GEMINI_API_URL}?key=${this.GEMINI_API_KEY}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 800
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  }
}
```

---

## Lite-LLM Integration

Use Lite-LLM for unified access to multiple LLM providers:

```typescript
@Component({
  imports: [AIAssistViewModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div ejs-aiassistview 
      #aiAssistViewComponent
      id='aiAssistView'
      (promptRequest)="onPromptRequest($event)">
    </div>
  `
})
export class AppComponent {
  @ViewChild('aiAssistViewComponent')
  public aiAssistViewComponent!: AIAssistViewComponent;

  private readonly LITE_LLM_API_KEY = 'your-lite-llm-key';
  private readonly LITE_LLM_URL = 'http://localhost:4000'; // Local Lite-LLM server

  async onPromptRequest(args: any) {
    const userPrompt = args.prompt;
    
    try {
      const response = await this.callLiteLLM(userPrompt);
      this.aiAssistViewComponent.addPromptResponse(response);
    } catch (error) {
      this.aiAssistViewComponent.addPromptResponse('Error: Lite-LLM call failed.');
    }
  }

  private async callLiteLLM(prompt: string): Promise<string> {
    const response = await fetch(`${this.LITE_LLM_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.LITE_LLM_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo', // Or any model supported by Lite-LLM
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7
      })
    });

    if (!response.ok) {
      throw new Error(`Lite-LLM error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  }
}
```

---

## Model Context Protocol (MCP) Integration

Integrate with Model Context Protocol for structured interactions:

```typescript
@Component({
  imports: [AIAssistViewModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div ejs-aiassistview 
      #aiAssistViewComponent
      id='aiAssistView'
      (promptRequest)="onPromptRequest($event)">
    </div>
  `
})
export class AppComponent {
  @ViewChild('aiAssistViewComponent')
  public aiAssistViewComponent!: AIAssistViewComponent;

  private mcpClient: any; // MCP client instance

  async ngOnInit() {
    // Initialize MCP client
    this.initializeMCP();
  }

  private initializeMCP() {
    // Initialize your MCP client
    // Example: this.mcpClient = new MCPClient('server-config');
  }

  async onPromptRequest(args: any) {
    const userPrompt = args.prompt;
    
    try {
      const response = await this.callMCP(userPrompt);
      this.aiAssistViewComponent.addPromptResponse(response);
    } catch (error) {
      this.aiAssistViewComponent.addPromptResponse('Error: MCP interaction failed.');
    }
  }

  private async callMCP(prompt: string): Promise<string> {
    // Call MCP endpoint
    const result = await this.mcpClient.request({
      method: 'call_tool',
      params: {
        tool: 'chat',
        input: {
          message: prompt
        }
      }
    });

    return result.output || 'No response received.';
  }
}
```

---

## Ollama Integration

Integrate with local Ollama LLM service:

```typescript
@Component({
  imports: [AIAssistViewModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div ejs-aiassistview 
      #aiAssistViewComponent
      id='aiAssistView'
      (promptRequest)="onPromptRequest($event)">
    </div>
  `
})
export class AppComponent {
  @ViewChild('aiAssistViewComponent')
  public aiAssistViewComponent!: AIAssistViewComponent;

  private readonly OLLAMA_URL = 'http://localhost:11434';
  private readonly MODEL = 'llama2'; // or other available model

  async onPromptRequest(args: any) {
    const userPrompt = args.prompt;
    
    try {
      const response = await this.callOllama(userPrompt);
      this.aiAssistViewComponent.addPromptResponse(response);
    } catch (error) {
      this.aiAssistViewComponent.addPromptResponse('Error: Ollama service unavailable.');
    }
  }

  private async callOllama(prompt: string): Promise<string> {
    const response = await fetch(`${this.OLLAMA_URL}/api/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: this.MODEL,
        prompt: prompt,
        stream: false,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      throw new Error(`Ollama error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.response;
  }
}
```

---

## Security Best Practices

### 1. Protect API Keys

```typescript
// ❌ DO NOT: Expose keys in client code
const apiKey = 'sk-your-actual-key';

// ✅ DO: Use backend proxy
const response = await fetch('/api/chat', {
  method: 'POST',
  body: JSON.stringify({ prompt })
});
```

### 2. Use Environment Variables

```typescript
// environment.ts
export const environment = {
  apiEndpoint: 'https://api.example.com'
};

// component.ts
import { environment } from '../environments/environment';
const endpoint = environment.apiEndpoint;
```

### 3. Implement Rate Limiting

```typescript
private lastRequestTime = 0;
private readonly REQUEST_DELAY = 1000; // 1 second minimum

async onPromptRequest(args: any) {
  const now = Date.now();
  if (now - this.lastRequestTime < this.REQUEST_DELAY) {
    this.aiAssistViewComponent.addPromptResponse('Please wait before sending another prompt.');
    return;
  }
  
  this.lastRequestTime = now;
  // Process prompt
}
```

### 4. Validate and Sanitize Input

```typescript
private sanitizeInput(input: string): string {
  return input
    .trim()
    .substring(0, 5000) // Limit length
    .replace(/<[^>]*>/g, ''); // Remove HTML tags
}

async onPromptRequest(args: any) {
  const sanitized = this.sanitizeInput(args.prompt);
  // Use sanitized prompt
}
```

### 5. Handle Errors Gracefully

```typescript
async callAIService(prompt: string): Promise<string> {
  try {
    // API call
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('401')) {
        return 'Authentication failed. Please check your credentials.';
      } else if (error.message.includes('429')) {
        return 'Too many requests. Please try again later.';
      }
    }
    return 'An unexpected error occurred. Please try again.';
  }
}
```

---

## Streaming Responses

For providers supporting streaming, update responses progressively:

```typescript
async onPromptRequest(args: any) {
  const userPrompt = args.prompt;
  let accumulatedResponse = '';
  
  try {
    const response = await fetch('your-api-endpoint', {
      method: 'POST',
      body: JSON.stringify({ prompt: userPrompt })
    });
    
    if (!response.body) return;
    
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      
      const chunk = decoder.decode(value);
      accumulatedResponse += chunk;
      
      // Update UI with accumulated response
      this.aiAssistViewComponent.addPromptResponse(accumulatedResponse);
    }
  } catch (error) {
    this.aiAssistViewComponent.addPromptResponse('Streaming error occurred.');
  }
}
```

