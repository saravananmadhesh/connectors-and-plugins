# Methods and Actions for Programmatic Control

## Table of Contents
- [Adding Prompt Responses](#adding-prompt-responses)
- [Executing Prompts Dynamically](#executing-prompts-dynamically)
- [Streaming Responses](#streaming-responses)
- [Event-Driven Prompt Handling](#event-driven-prompt-handling)
- [Practical Use Cases](#practical-use-cases)

---

## Adding Prompt Responses

The `addPromptResponse()` method adds prompts and responses to the AI AssistView. You can add responses as either strings or objects. This method appends content to the conversation history programmatically.

### Adding Responses as String

When you pass a string, it appends the response to the last prompt added to the conversation:

```typescript
import { Component, ViewChild } from '@angular/core';
import { AIAssistViewModule, AIAssistViewComponent } from '@syncfusion/ej2-angular-interactive-chat';

@Component({
  imports: [AIAssistViewModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="container">
      <button (click)="addSimpleResponse()">Add Response</button>
      <div ejs-aiassistview 
        #aiAssistViewComponent
        id='aiAssistView'
        [prompt]="'Enter your question'">
      </div>
    </div>
  `
})
export class AppComponent {
  @ViewChild('aiAssistViewComponent')
  public aiAssistViewComponent!: AIAssistViewComponent;

  addSimpleResponse() {
    const response = 'This is a simple string response from the AI service.';
    this.aiAssistViewComponent.addPromptResponse(response);
  }
}
```

### Adding Responses as Object

You can add a response as an object by passing prompt and response as a collection. This creates a new prompt-response pair:

```typescript
interface PromptResponse {
  prompt: string;
  response: string;
}

@Component({
  imports: [AIAssistViewModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="container">
      <button (click)="addObjectResponse()">Add Complete Response</button>
      <div ejs-aiassistview 
        #aiAssistViewComponent
        id='aiAssistView'>
      </div>
    </div>
  `
})
export class AppComponent {
  @ViewChild('aiAssistViewComponent')
  public aiAssistViewComponent!: AIAssistViewComponent;

  addObjectResponse() {
    const promptResponse: PromptResponse = {
      prompt: 'What is Angular?',
      response: 'Angular is a TypeScript-based open-source web application framework maintained by Google. It provides a complete solution for building dynamic web applications with features like dependency injection, routing, and reactive forms.'
    };
    
    this.aiAssistViewComponent.addPromptResponse(promptResponse);
  }
}
```

### Handling Multiple Responses

```typescript
@Component({
  imports: [AIAssistViewModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="container">
      <button (click)="addMultipleResponses()">Load Conversation</button>
      <div ejs-aiassistview 
        #aiAssistViewComponent
        id='aiAssistView'>
      </div>
    </div>
  `
})
export class AppComponent {
  @ViewChild('aiAssistViewComponent')
  public aiAssistViewComponent!: AIAssistViewComponent;

  addMultipleResponses() {
    const responses = [
      {
        prompt: 'Hello',
        response: 'Hello! How can I assist you today?'
      },
      {
        prompt: 'Tell me about TypeScript',
        response: 'TypeScript is a superset of JavaScript that adds static types. It compiles to plain JavaScript and provides better tooling, error checking, and IDE support.'
      },
      {
        prompt: 'What are decorators?',
        response: 'Decorators are a TypeScript feature that allows you to annotate and modify classes and properties. Angular uses decorators extensively like @Component, @Injectable, and @Input.'
      }
    ];

    responses.forEach(response => {
      this.aiAssistViewComponent.addPromptResponse(response);
    });
  }
}
```

---

## Executing Prompts Dynamically

The `executePrompt()` method executes prompts dynamically in the AI AssistView. It accepts prompts as string values, which triggers the `promptRequest` event and performs the callback actions.

### Basic Prompt Execution

```typescript
import { Component, ViewChild } from '@angular/core';
import { AIAssistViewModule, AIAssistViewComponent } from '@syncfusion/ej2-angular-interactive-chat';

@Component({
  imports: [AIAssistViewModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="container">
      <button (click)="executeDefaultPrompt()">Execute Prompt</button>
      <div ejs-aiassistview 
        #aiAssistViewComponent
        id='aiAssistView'
        (promptRequest)="onPromptRequest($event)">
      </div>
    </div>
  `
})
export class AppComponent {
  @ViewChild('aiAssistViewComponent')
  public aiAssistViewComponent!: AIAssistViewComponent;

  executeDefaultPrompt() {
    this.aiAssistViewComponent.executePrompt('What is machine learning?');
  }

  onPromptRequest(args: any) {
    // This event fires when executePrompt is called
    setTimeout(() => {
      const response = 'Machine learning is a subset of artificial intelligence...';
      this.aiAssistViewComponent.addPromptResponse(response);
    }, 1000);
  }
}
```

### Executing Multiple Prompts in Sequence

```typescript
@Component({
  imports: [AIAssistViewModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="container">
      <button (click)="executeSequence()">Run Demo</button>
      <div ejs-aiassistview 
        #aiAssistViewComponent
        id='aiAssistView'
        (promptRequest)="onPromptRequest($event)">
      </div>
    </div>
  `
})
export class AppComponent {
  @ViewChild('aiAssistViewComponent')
  public aiAssistViewComponent!: AIAssistViewComponent;
  
  private prompts = [
    'What is Angular?',
    'What is RxJS?',
    'What is TypeScript?'
  ];
  
  private currentPromptIndex = 0;

  executeSequence() {
    this.currentPromptIndex = 0;
    this.executeNextPrompt();
  }

  executeNextPrompt() {
    if (this.currentPromptIndex < this.prompts.length) {
      const prompt = this.prompts[this.currentPromptIndex];
      this.aiAssistViewComponent.executePrompt(prompt);
    }
  }

  onPromptRequest(args: any) {
    // Generate response for current prompt
    const responses: { [key: string]: string } = {
      'What is Angular?': 'Angular is a TypeScript-based framework...',
      'What is RxJS?': 'RxJS is a library for reactive programming...',
      'What is TypeScript?': 'TypeScript is a superset of JavaScript...'
    };

    const currentPrompt = this.prompts[this.currentPromptIndex];
    const response = responses[currentPrompt] || 'I don\'t have an answer for that.';

    setTimeout(() => {
      this.aiAssistViewComponent.addPromptResponse(response);
      this.currentPromptIndex++;
      
      // Execute next prompt after a delay
      setTimeout(() => {
        this.executeNextPrompt();
      }, 500);
    }, 1000);
  }
}
```

---

## Streaming Responses

The `enableStreaming` property enables real-time streaming of AI responses, allowing content to be displayed progressively as it's generated. This creates a more dynamic and responsive user experience similar to modern AI chat applications.

### Enabling Streaming

```typescript
import { Component, ViewChild } from '@angular/core';
import { AIAssistViewModule, AIAssistViewComponent, PromptRequestEventArgs } from '@syncfusion/ej2-angular-interactive-chat';

@Component({
  imports: [AIAssistViewModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div ejs-aiassistview 
      #aiAssistViewComponent
      id='aiAssistView'
      [enableStreaming]="true"
      (promptRequest)="onPromptRequest($event)"
      (stopRespondingClick)="onStopResponding($event)">
    </div>
  `
})
export class AppComponent {
  @ViewChild('aiAssistViewComponent')
  public aiAssistViewComponent!: AIAssistViewComponent;

  async onPromptRequest(args: PromptRequestEventArgs) {
    const userPrompt = args.prompt || '';
    
    try {
      // Call AI service with streaming enabled
      await this.streamAIResponse(userPrompt);
    } catch (error) {
      console.error('Streaming error:', error);
      this.aiAssistViewComponent.addPromptResponse('Error occurred while streaming response.');
    }
  }

  async streamAIResponse(prompt: string) {
    let accumulatedResponse = '';
    
    // Simulate streaming from AI service
    const words = 'This is a sample streaming response that demonstrates how content appears progressively word by word as it is generated by the AI service.'.split(' ');
    
    for (const word of words) {
      // Simulate delay between words
      await new Promise(resolve => setTimeout(resolve, 100));
      
      accumulatedResponse += word + ' ';
      
      // Update the response progressively
      this.aiAssistViewComponent.addPromptResponse(accumulatedResponse.trim());
    }
  }

  onStopResponding(args: any) {
    console.log('Stop responding clicked');
    // Handle stop logic
  }
}
```

### Streaming with Real AI Services

#### Example: Azure OpenAI Streaming

```typescript
import { Component, ViewChild } from '@angular/core';
import { AIAssistViewModule, AIAssistViewComponent, PromptRequestEventArgs, StopRespondingEventArgs } from '@syncfusion/ej2-angular-interactive-chat';

@Component({
  imports: [AIAssistViewModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div ejs-aiassistview 
      #aiAssistViewComponent
      id='aiAssistView'
      [enableStreaming]="true"
      (promptRequest)="onPromptRequest($event)"
      (stopRespondingClick)="onStopResponding($event)">
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
  
  private abortController: AbortController | null = null;
  private isStreaming = false;

  async onPromptRequest(args: PromptRequestEventArgs) {
    this.isStreaming = true;
    this.abortController = new AbortController();
    
    const userPrompt = args.prompt || '';
    
    try {
      await this.streamFromAzureOpenAI(userPrompt);
    } catch (error: any) {
      if (error.name === 'AbortError') {
        console.log('Streaming aborted by user');
      } else {
        console.error('Streaming error:', error);
        this.aiAssistViewComponent.addPromptResponse('Error: Unable to stream response.');
      }
    } finally {
      this.isStreaming = false;
      this.abortController = null;
    }
  }

  async streamFromAzureOpenAI(prompt: string) {
    const url = `${this.AZURE_ENDPOINT}/openai/deployments/${this.AZURE_DEPLOYMENT}/chat/completions?api-version=${this.AZURE_API_VERSION}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': this.AZURE_API_KEY
      },
      body: JSON.stringify({
        messages: [{ role: 'user', content: prompt }],
        stream: true,
        temperature: 0.7,
        max_tokens: 800
      }),
      signal: this.abortController?.signal
    });

    if (!response.ok) {
      throw new Error(`Azure OpenAI error: ${response.statusText}`);
    }

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    let accumulatedResponse = '';

    if (!reader) {
      throw new Error('No response body');
    }

    while (true) {
      const { done, value } = await reader.read();
      
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.split('\n').filter(line => line.trim() !== '');

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const jsonStr = line.substring(6);
          
          if (jsonStr === '[DONE]') {
            continue;
          }

          try {
            const json = JSON.parse(jsonStr);
            const content = json.choices[0]?.delta?.content;
            
            if (content) {
              accumulatedResponse += content;
              // Update the AI AssistView with accumulated response
              this.aiAssistViewComponent.addPromptResponse(accumulatedResponse);
            }
          } catch (e) {
            console.error('Error parsing JSON:', e);
          }
        }
      }
    }
  }

  onStopResponding(args: StopRespondingEventArgs) {
    console.log('Stop button clicked for prompt:', args.prompt);
    console.log('Data index:', args.dataIndex);
    
    if (this.isStreaming && this.abortController) {
      // Abort the streaming fetch request
      this.abortController.abort();
      this.isStreaming = false;
      
      // Optionally add a message indicating the stream was stopped
      console.log('Streaming stopped by user');
    }
  }
}
```

### stopRespondingClick Event

The `stopRespondingClick` event is triggered when the user clicks the "Stop Responding" button during streaming. This allows you to gracefully cancel the streaming operation.

#### StopRespondingEventArgs Properties

| Property | Type | Description |
|----------|------|-------------|
| `dataIndex` | number | Index of the prompt in the prompt list |
| `event` | Event | The original DOM event |
| `name` | string | Name of the event |
| `prompt` | string | The prompt text for which response is being generated |

#### Example: Handling Stop Responding

```typescript
import { StopRespondingEventArgs } from '@syncfusion/ej2-angular-interactive-chat';

@Component({
  imports: [AIAssistViewModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div ejs-aiassistview 
      #aiAssistViewComponent
      id='aiAssistView'
      [enableStreaming]="true"
      (promptRequest)="onPromptRequest($event)"
      (stopRespondingClick)="onStopResponding($event)">
    </div>
  `
})
export class AppComponent {
  @ViewChild('aiAssistViewComponent')
  public aiAssistViewComponent!: AIAssistViewComponent;

  private activeStreams = new Map<number, AbortController>();

  async onPromptRequest(args: PromptRequestEventArgs) {
    // Get the current prompt index
    const promptIndex = this.aiAssistViewComponent.prompts.length - 1;
    
    // Create abort controller for this stream
    const abortController = new AbortController();
    this.activeStreams.set(promptIndex, abortController);

    try {
      await this.streamResponse(args.prompt || '', abortController.signal);
    } catch (error: any) {
      if (error.name !== 'AbortError') {
        console.error('Streaming error:', error);
      }
    } finally {
      this.activeStreams.delete(promptIndex);
    }
  }

  async streamResponse(prompt: string, signal: AbortSignal) {
    // Your streaming logic here
    let accumulatedResponse = '';
    const words = prompt.split(' ');

    for (const word of words) {
      if (signal.aborted) {
        throw new DOMException('Aborted', 'AbortError');
      }

      await new Promise(resolve => setTimeout(resolve, 100));
      accumulatedResponse += word + ' ';
      this.aiAssistViewComponent.addPromptResponse(accumulatedResponse);
    }
  }

  onStopResponding(args: StopRespondingEventArgs) {
    console.log('Stopping response at index:', args.dataIndex);
    console.log('Prompt:', args.prompt);
    
    // Get the abort controller for this specific stream
    const abortController = this.activeStreams.get(args.dataIndex);
    
    if (abortController) {
      // Abort the streaming operation
      abortController.abort();
      this.activeStreams.delete(args.dataIndex);
      
      // Optionally update the UI to show the stream was stopped
      const currentResponse = this.aiAssistViewComponent.prompts[args.dataIndex].response;
      const stoppedMessage = currentResponse + '\n\n*[Response stopped by user]*';
      
      // Update with the partial response
      this.aiAssistViewComponent.prompts[args.dataIndex].response = stoppedMessage;
    }
  }
}
```

### Best Practices for Streaming

#### 1. Manage Abort Controllers Properly

```typescript
private activeStreams = new Map<number, AbortController>();

startStreaming(index: number) {
  const controller = new AbortController();
  this.activeStreams.set(index, controller);
  return controller;
}

stopStreaming(index: number) {
  const controller = this.activeStreams.get(index);
  if (controller) {
    controller.abort();
    this.activeStreams.delete(index);
  }
}

ngOnDestroy() {
  // Clean up all active streams when component is destroyed
  this.activeStreams.forEach(controller => controller.abort());
  this.activeStreams.clear();
}
```

#### 2. Handle Network Errors Gracefully

```typescript
async streamResponse(prompt: string) {
  let retryCount = 0;
  const maxRetries = 3;

  while (retryCount < maxRetries) {
    try {
      await this.attemptStreaming(prompt);
      break; // Success, exit loop
    } catch (error: any) {
      if (error.name === 'AbortError') {
        // User stopped, don't retry
        break;
      }

      retryCount++;
      if (retryCount >= maxRetries) {
        this.aiAssistViewComponent.addPromptResponse(
          'Failed to get response after multiple attempts. Please try again.'
        );
      } else {
        console.log(`Retry attempt ${retryCount}/${maxRetries}`);
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  }
}
```

#### 3. Provide Visual Feedback

```typescript
@Component({
  imports: [AIAssistViewModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="container">
      <div *ngIf="isStreaming" class="streaming-indicator">
        <span class="spinner"></span>
        AI is thinking...
      </div>
      
      <div ejs-aiassistview 
        #aiAssistViewComponent
        id='aiAssistView'
        [enableStreaming]="true"
        (promptRequest)="onPromptRequest($event)"
        (stopRespondingClick)="onStopResponding($event)">
      </div>
    </div>
  `,
  styles: [`
    .streaming-indicator {
      padding: 12px;
      background: #e3f2fd;
      border-left: 4px solid #2196F3;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .spinner {
      width: 16px;
      height: 16px;
      border: 2px solid #2196F3;
      border-top-color: transparent;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }
    
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `]
})
export class AppComponent {
  isStreaming = false;

  async onPromptRequest(args: PromptRequestEventArgs) {
    this.isStreaming = true;
    try {
      await this.streamResponse(args.prompt || '');
    } finally {
      this.isStreaming = false;
    }
  }

  onStopResponding(args: StopRespondingEventArgs) {
    this.isStreaming = false;
  }
}
```

#### 4. Optimize Update Frequency

```typescript
async streamFromAI(prompt: string) {
  let accumulatedResponse = '';
  let lastUpdate = Date.now();
  const updateInterval = 100; // Update UI every 100ms

  // Process streaming chunks
  for await (const chunk of this.getStreamingChunks(prompt)) {
    accumulatedResponse += chunk;
    
    // Throttle UI updates
    const now = Date.now();
    if (now - lastUpdate >= updateInterval) {
      this.aiAssistViewComponent.addPromptResponse(accumulatedResponse);
      lastUpdate = now;
    }
  }

  // Final update with complete response
  this.aiAssistViewComponent.addPromptResponse(accumulatedResponse);
}
```

---

## Event-Driven Prompt Handling

### Handling with Event Args

```typescript
import { PromptRequestEventArgs } from '@syncfusion/ej2-angular-interactive-chat';

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

  onPromptRequest(args: PromptRequestEventArgs) {
    // Access the prompt from event args
    const userPrompt = args.prompt || '';
    
    console.log('User prompt:', userPrompt);
    
    // Process and respond
    this.processPromptAndRespond(userPrompt);
  }

  processPromptAndRespond(prompt: string) {
    // Simulate AI processing
    setTimeout(() => {
      const response = this.generateResponse(prompt);
      this.aiAssistViewComponent.addPromptResponse(response);
    }, 1500);
  }

  generateResponse(prompt: string): string {
    // Simple response generation logic
    if (prompt.toLowerCase().includes('hello')) {
      return 'Hello! How can I help you?';
    } else if (prompt.toLowerCase().includes('help')) {
      return 'I can help with Angular, TypeScript, and web development topics.';
    } else {
      return `I received your prompt: "${prompt}". This is a sample response.`;
    }
  }
}
```

---

## Practical Use Cases

### 1. Auto-Filling Previous Responses

```typescript
@Component({
  imports: [AIAssistViewModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="container">
      <select (change)="loadTemplate($event)">
        <option>Select a template...</option>
        <option value="intro">Introduction Template</option>
        <option value="help">Help Template</option>
      </select>
      
      <div ejs-aiassistview 
        #aiAssistViewComponent
        id='aiAssistView'
        (promptRequest)="onPromptRequest($event)">
      </div>
    </div>
  `
})
export class AppComponent {
  @ViewChild('aiAssistViewComponent')
  public aiAssistViewComponent!: AIAssistViewComponent;

  templates: { [key: string]: Array<{ prompt: string; response: string }> } = {
    'intro': [
      {
        prompt: 'What is Syncfusion?',
        response: 'Syncfusion provides enterprise-grade UI components for web, desktop, and mobile platforms.'
      },
      {
        prompt: 'What are the main features?',
        response: 'Key features include data visualization, forms, navigation, and AI integration.'
      }
    ],
    'help': [
      {
        prompt: 'How do I get support?',
        response: 'You can reach Syncfusion support through their official website or support portal.'
      }
    ]
  };

  loadTemplate(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const templateKey = selectElement.value;
    
    if (templateKey && this.templates[templateKey]) {
      this.templates[templateKey].forEach(item => {
        this.aiAssistViewComponent.addPromptResponse(item);
      });
    }
  }

  onPromptRequest(args: any) {
    // Handle new prompts
  }
}
```

### 2. Streaming Long Responses

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

  onPromptRequest(args: any) {
    // Simulate streaming response by building it progressively
    this.streamResponse('This is a long response that demonstrates progressive content delivery...');
  }

  streamResponse(fullResponse: string) {
    const chunkSize = 20;
    let index = 0;
    let accumulation = '';

    const streamInterval = setInterval(() => {
      if (index < fullResponse.length) {
        accumulation += fullResponse[index];
        index++;
        
        // Update the latest response
        this.aiAssistViewComponent.addPromptResponse(accumulation);
      } else {
        clearInterval(streamInterval);
      }
    }, 50);
  }
}
```

### 3. Conditional Response Logic

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
  
  userExpertise = 'beginner'; // beginner, intermediate, expert

  onPromptRequest(args: any) {
    const prompt = args.prompt || '';
    const response = this.generateContextualResponse(prompt);
    
    setTimeout(() => {
      this.aiAssistViewComponent.addPromptResponse(response);
    }, 1000);
  }

  generateContextualResponse(prompt: string): string {
    const responses: { [key: string]: { [key: string]: string } } = {
      'angular': {
        'beginner': 'Angular is a JavaScript framework for building dynamic web applications. Start by learning components and modules.',
        'intermediate': 'Angular uses dependency injection, routing, and services. Consider exploring RxJS and reactive patterns.',
        'expert': 'Dive into advanced topics like change detection strategies, zone optimization, and custom decorators.'
      },
      'typescript': {
        'beginner': 'TypeScript adds type safety to JavaScript. Start with basic types: string, number, boolean.',
        'intermediate': 'Explore generics, interfaces, and utility types for more sophisticated type definitions.',
        'expert': 'Master advanced types, conditional types, and type inference patterns for complex scenarios.'
      }
    };

    const key = Object.keys(responses).find(k => prompt.toLowerCase().includes(k));
    
    if (key && responses[key][this.userExpertise]) {
      return responses[key][this.userExpertise];
    }
    
    return 'I\'m not sure about that. Can you provide more details?';
  }
}
```

---

## Telemetry Data with addPromptResponse

When the component is configured with `telemetrySettings.enable = true`, the `addPromptResponse()` method accepts an **optional third argument `telemetryData`** that merges model and token usage details into the per-response telemetry report.

### Signature

```typescript
addPromptResponse(
  response: string | PromptResponse | { blocks: ResponseBlock[] },
  isFinalUpdate?: boolean,
  telemetryData?: TelemetryData
): void;
```

### TelemetryData Fields

| Field | Type | Description |
|-------|------|-------------|
| `model` | `string` | Name of the AI model that produced the response (e.g. `gpt-4o`, `gpt-4o-mini`). |
| `inputTokens` | `number` | Number of tokens included in the input prompt. |
| `outputTokens` | `number` | Number of tokens generated in the response. |
| `reasoningTokens` | `number` | Tokens consumed for reasoning, when the model reports it. |
| `cachedInputTokens` | `number` | Input tokens served from the model cache, when available. |
| `customAttributes` | `Record<string, unknown>` | Domain-specific key/value pairs surfaced as extra rows in the telemetry tooltip. |

> `totalTokens` is auto-computed as `inputTokens + outputTokens` whenever either is provided. See [telemetry.md](telemetry.md) for the full metric list and key characteristics.

### Example: Passing TelemetryData

```typescript
import { Component, ViewChild } from '@angular/core';
import {
  AIAssistViewModule,
  AIAssistViewComponent,
  PromptRequestEventArgs,
  TelemetrySettingsModel,
  TelemetryData
} from '@syncfusion/ej2-angular-interactive-chat';

@Component({
  imports: [AIAssistViewModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div ejs-aiassistview
      #aiAssistViewComponent
      id='aiAssistView'
      [telemetrySettings]="telemetrySettings"
      [enableStreaming]="true"
      (promptRequest)="onPromptRequest($event)">
    </div>
  `
})
export class AppComponent {
  @ViewChild('aiAssistViewComponent')
  public aiAssistViewComponent!: AIAssistViewComponent;

  public telemetrySettings: TelemetrySettingsModel = { enable: true };

  async onPromptRequest(args: PromptRequestEventArgs) {
    const userPrompt = args.prompt || '';

    // Call your AI service and capture usage data...
    const telemetryData: TelemetryData = {
      model: 'gpt-4o-mini',
      inputTokens: 128,
      outputTokens: 96,
      reasoningTokens: 24,
      cachedInputTokens: 16
    };

    this.aiAssistViewComponent.addPromptResponse(
      `Here is what I think about: ${userPrompt}`,
      true,
      telemetryData
    );
  }
}
```

### Example: TelemetryData with Custom Attributes

```typescript
const usageData: TelemetryData = {
  model: 'gpt-4o-mini',
  customAttributes: {
    region: 'us-east',
    tenant: 'acme-corp',
    sessionId: 'demo-session-42',
    feature: 'ai-assistview'
  }
};

this.aiAssistViewComponent.addPromptResponse(
  response,
  true,
  usageData
);
```

> Custom attributes are rendered as their own rows in the telemetry tooltip and are always included — regardless of the `telemetrySettings.metrics` filter. For more details on configuring telemetry and the `beforeReport` event, see [telemetry.md](telemetry.md).

---

## Telemetry Settings

`TelemetrySettingsModel` controls the built-in per-response telemetry button. It is bound to the component via the `[telemetrySettings]` input.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `enable` | `boolean` | `false` | Toggles the telemetry button in the response toolbar. |
| `metrics` | `TelemetryMetric[]` | `undefined` | Filters which metrics are captured and shown, in display order. Allowed values: `status`, `duration`, `toolCalls`, `streamingChunks`, `model`, `inputTokens`, `outputTokens`, `totalTokens`, `reasoningTokens`, `cachedInputTokens`. |
| `beforeReport` | `(report: TelemetryReport) => TelemetryReport \| null` | `undefined` | Intercepts the report before render. Return `null` to suppress the report; assign to `report.customAttributes` to add domain-specific rows. |

### Example: Filtering Metrics

```typescript
import { TelemetrySettingsModel, TelemetryMetric } from '@syncfusion/ej2-angular-interactive-chat';

public telemetrySettings: TelemetrySettingsModel = {
  enable: true,
  metrics: [
    'duration',
    'model',
    'inputTokens',
    'outputTokens',
    'totalTokens'
  ] as TelemetryMetric[]
};
```

### Example: Customizing via beforeReport

```typescript
import { TelemetrySettingsModel, TelemetryReport } from '@syncfusion/ej2-angular-interactive-chat';

public telemetrySettings: TelemetrySettingsModel = {
  enable: true,
  beforeReport: (report: TelemetryReport) => {
    report.customAttributes = {
      region: 'us-east-1',
      tenant: 'acme',
      beta: true
    };
    return report;
  }
};
```
