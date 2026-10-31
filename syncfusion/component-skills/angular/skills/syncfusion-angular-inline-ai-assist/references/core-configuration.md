# Core Configuration of Inline AI Assist

## Table of Contents
- [Prompt Configuration](#prompt-configuration)
- [Response Display Modes](#response-display-modes)
- [Popup Dimensions](#popup-dimensions)
- [Placeholder and Z-Index](#placeholder-and-z-index)
- [CSS Customization](#css-customization)
- [Prompt-Response Collection](#prompt-response-collection)
- [Streaming Responses](#streaming-responses)
- [State Persistence](#state-persistence)

## Prompt Configuration

### Setting Prompt Text

Use the `prompt` property to define the default prompt text for the component:

```typescript
export class AppComponent {
    public prompt: string = "What are the benefits of Inline AI Assist?";
}
```

This sets an initial prompt that users can modify before submitting.

## Response Display Modes

### Popup Mode (Default)

Displays responses in a floating popup window. Best for review-based workflows where users need to accept or reject suggestions:

```typescript
export class AppComponent {
    public responseMode: string = 'Popup';
}
```

**Characteristics:**
- Response shown in separate popup
- Accept/Reject buttons visible
- User must explicitly accept to apply
- Good for critical content changes

### Inline Mode

Updates content directly in-place without a popup. Best for seamless editing experiences:

```typescript
export class AppComponent {
    public responseMode: string = 'Inline';
}
```

**Characteristics:**
- Response applied directly to target element
- No separate popup shown
- Faster workflow for trusted operations
- Better for real-time suggestions

### Switching Modes

```typescript
export class AppComponent {
    public responseMode: string = 'Popup';
    
    onModeChange(event: Event): void {
        const selectElement = event.target as HTMLSelectElement;
        this.responseMode = selectElement.value;
        this.inlineAssistComponent.responseMode = selectElement.value;
        this.inlineAssistComponent.showPopup();
    }
}
```

## Popup Dimensions

### Setting Popup Width

Control popup width using `popupWidth` property (accepts CSS values or numbers in pixels):

```typescript
// Fixed width in pixels
[popupWidth]="'500px'"

// CSS value
[popupWidth]="'50%'"

// Number (treated as pixels)
[popupWidth]="500"
```

### Setting Popup Height

Control popup height using `popupHeight` property:

```typescript
// Fixed height
[popupHeight]="'350px'"

// Auto height (default)
[popupHeight]="'auto'"

// Screen percentage
[popupHeight]="'80vh'"
```

### Setting Z-Index

Control stacking order of the popup with `zIndex` property:

```typescript
// Default z-index is 1000
[zIndex]="4000"  // Higher values appear on top
```

## Placeholder and Z-Index

### Setting Placeholder Text

Customize the prompt textarea placeholder:

```typescript
export class AppComponent {
    public placeholder: string = 'Type your custom prompt here...';
}
```

Default placeholder is `"Ask or generate AI content.."`

### Z-Index Management

```typescript
export class AppComponent {
    public zIndex: number = 4000;
}
```

Use higher z-index values when the component appears over other overlays.

## CSS Customization

### Using CSS Class

Add custom CSS classes to the component for styling:

```typescript
export class AppComponent {
    public cssClass: string = 'custom-assist';
}

```

### Custom CSS Example

```css
/* Custom styling for Inline AI Assist */
.custom-assist {
    border: 2px solid #2196f3;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.custom-assist .e-toolbar {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 8px 8px 0 0;
}

.custom-assist .e-input {
    font-family: 'Courier New', monospace;
    font-size: 14px;
}

/* Theme override */
.custom-assist.e-btn {
    background-color: #007bff;
}

.custom-assist.e-btn:hover {
    background-color: #0056b3;
}
```

### Complete Configuration Example

```typescript
import { ViewChild, Component } from '@angular/core';
import { InlineAIAssistModule, InlineAIAssistComponent, ResponseSettingsModel, ResponseItemSelectEventArgs, InlinePromptRequestEventArgs } from '@syncfusion/ej2-angular-interactive-chat';

@Component({
    imports: [InlineAIAssistModule],
    standalone: true,
    selector: 'app-root',
    template: `
        <div id="container" style="height: 350px; width: 650px;">
            <button id="summarizeBtn" class="e-btn e-primary" style="margin-bottom: 10px;" (click)="onClick()">
                Content Summarize
            </button>
            <div id="editableText" contenteditable="true">
                <p>Inline AI Assist component provides intelligent text processing capabilities that enhance user productivity.</p>
            </div>
            <ejs-inlineaiassist 
                id="defaultInlineAssist" 
                #inlineAssistComponent
                [relateTo]="'#summarizeBtn'"
                [cssClass]="cssClass"
                [popupWidth]="popupWidth"
                [popupHeight]="popupHeight"
                [placeholder]="placeholder"
                [zIndex]="zIndex"
                [responseMode]="responseMode"
                [responseSettings]="responseSetting"
                (promptRequest)="onPromptRequest($event)">
            </ejs-inlineaiassist>
        </div>
    `,
    styles: [`#editableText { width: 100%; min-height: 120px; padding: 12px; border: 1px solid; }`]
})
export class AppComponent {
    @ViewChild('inlineAssistComponent')
    public inlineAssistComponent!: InlineAIAssistComponent;

    // CSS Class for styling
    public cssClass: string = 'custom-assist';
    
    // Popup dimensions
    public popupWidth: string = '650px';
    public popupHeight: string = '350px';
    
    // Placeholder text
    public placeholder: string = 'Type your prompt here...';
    
    // Z-index for stacking
    public zIndex: number = 4000;
    
    // Response mode
    public responseMode: string = 'Popup';

    public itemSelect = (args: ResponseItemSelectEventArgs) => {
        if (args.command.label === 'Accept') {
            const editable = document.getElementById('editableText') as HTMLElement | null;
            if (editable) {
                editable.innerHTML = '<p>' + 
                    this.inlineAssistComponent.prompts[
                        this.inlineAssistComponent.prompts.length - 1
                    ].response + '</p>';
            }
            this.inlineAssistComponent.hidePopup();
        } else if (args.command.label === 'Discard') {
            this.inlineAssistComponent.hidePopup();
        }
    }

    public responseSetting: ResponseSettingsModel = {
        itemSelect: this.itemSelect
    }
    
    onClick(): void {
        this.inlineAssistComponent.showPopup();
    }

    public onPromptRequest = (args: InlinePromptRequestEventArgs) => {
        setTimeout(() => {
            let defaultResponse = 'For real-time prompt processing, connect to your preferred AI service.';
            this.inlineAssistComponent.addResponse(defaultResponse);
        }, 1000);
    };
}
```

## Prompt-Response Collection

### Managing Prompt History

Access and manage the collection of prompts and responses:

```typescript
// Get all prompts and responses
const allPrompts = this.inlineAssistComponent.prompts;

// Get last prompt
const lastPrompt = allPrompts[allPrompts.length - 1];
console.log('Prompt:', lastPrompt.prompt);
console.log('Response:', lastPrompt.response);

// Iterate through history
allPrompts.forEach((item: any, index: number) => {
    console.log(`[${index}] Q: ${item.prompt}`);
    console.log(`[${index}] A: ${item.response}`);
});
```

### Pre-loading Prompts

Initialize component with predefined prompt-response pairs:

```typescript
import { PromptResponseModel } from '@syncfusion/ej2-angular-interactive-chat';

export class AppComponent {
    public prompts: PromptResponseModel[] = [
        {
            prompt: "What is AI?",
            response: `<div>AI stands for Artificial Intelligence, enabling machines to mimic human intelligence 
                       for tasks such as learning, problem-solving, and decision-making.</div>`
        },
        {
            prompt: "Explain machine learning",
            response: `<div>Machine learning is a subset of AI where systems learn and improve from experience 
                       without being explicitly programmed for specific tasks.</div>`
        }
    ];

}
```

### Using Pre-loaded Prompts

```typescript
public onPromptRequest = (args: InlinePromptRequestEventArgs) => {
    setTimeout(() => {
        // Search for matching prompt in collection
        let foundPrompt = this.prompts.find((promptObj: any) => 
            promptObj.prompt === args.prompt
        );
        
        let response = foundPrompt 
            ? foundPrompt.response 
            : 'No predefined response found. Connect to AI service.';
        
        this.inlineAssistComponent.addResponse(response);
    }, 1000);
};
```

## Streaming Responses

### Enable Streaming

Use the `enableStreaming` property to enable real-time streaming of AI responses (similar to ChatGPT). When enabled, responses are progressively displayed as they arrive:

**Type:** `boolean`  
**Default:** `false`

```typescript
export class AppComponent {
    public enableStreaming: boolean = true;
}
```

**Characteristics:**
- Response text appears progressively in real-time
- Provides better user experience for long responses
- Requires AI service support for streaming
- User sees content as it's being generated

### Streaming Implementation Example

```typescript
import { ViewChild, Component } from '@angular/core';
import { InlineAIAssistModule, InlineAIAssistComponent, InlinePromptRequestEventArgs } from '@syncfusion/ej2-angular-interactive-chat';

@Component({
    imports: [InlineAIAssistModule],
    standalone: true,
    selector: 'app-root',
    template: `
        <div id="container">
            <button id="aiBtn" class="e-btn e-primary" (click)="onClick()">
                AI Assist with Streaming
            </button>
            <div id="editableText" contenteditable="true">
                <p>Type your content here...</p>
            </div>
            <ejs-inlineaiassist 
                id="streamAssist" 
                #inlineAssistComponent
                [relateTo]="'#aiBtn'"
                [enableStreaming]="true"
                popupWidth="500px"
                (promptRequest)="onPromptRequest($event)">
            </ejs-inlineaiassist>
        </div>
    `,
    styles: [`#editableText { width: 100%; min-height: 120px; padding: 12px; border: 1px solid; }`]
})
export class AppComponent {
    @ViewChild('inlineAssistComponent')
    public inlineAssistComponent!: InlineAIAssistComponent;

    onClick(): void {
        this.inlineAssistComponent.showPopup();
    }

    public onPromptRequest = (args: InlinePromptRequestEventArgs) => {
        // Simulate streaming response from AI service
        const fullResponse = 'This is a streaming response that appears progressively. ' +
            'Each chunk of text is added in real-time, creating a smooth user experience. ' +
            'This mimics services like ChatGPT where responses stream in character by character.';
        
        let index = 0;
        const chunkSize = 10; // Characters per chunk
        
        const streamInterval = setInterval(() => {
            if (index < fullResponse.length) {
                const chunk = fullResponse.substring(0, index + chunkSize);
                // Pass false to indicate this is not the final update
                this.inlineAssistComponent.addResponse(chunk, false);
                index += chunkSize;
            } else {
                // Send final complete response with true flag
                this.inlineAssistComponent.addResponse(fullResponse, true);
                clearInterval(streamInterval);
            }
        }, 50); // 50ms between chunks for smooth streaming
    };
}
```

### Streaming with Real AI Service (OpenAI Example)

```typescript
import { HttpClient } from '@angular/common/http';

export class AppComponent {
    constructor(private http: HttpClient) {}

    public onPromptRequest = async (args: InlinePromptRequestEventArgs) => {
        try {
            // Example using OpenAI streaming API
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${YOUR_API_KEY}`
                },
                body: JSON.stringify({
                    model: 'gpt-4',
                    messages: [{ role: 'user', content: args.prompt }],
                    stream: true // Enable streaming from OpenAI
                })
            });

            const reader = response.body?.getReader();
            const decoder = new TextDecoder();
            let accumulatedResponse = '';

            while (true) {
                const { done, value } = await reader!.read();
                if (done) break;

                const chunk = decoder.decode(value);
                const lines = chunk.split('\n').filter(line => line.trim() !== '');

                for (const line of lines) {
                    if (line.startsWith('data: ')) {
                        const data = line.substring(6);
                        if (data === '[DONE]') break;

                        try {
                            const parsed = JSON.parse(data);
                            const content = parsed.choices[0]?.delta?.content || '';
                            if (content) {
                                accumulatedResponse += content;
                                // Update with accumulated response, not final yet
                                this.inlineAssistComponent.addResponse(accumulatedResponse, false);
                            }
                        } catch (e) {
                            // Skip parsing errors
                        }
                    }
                }
            }

            // Mark as final response
            this.inlineAssistComponent.addResponse(accumulatedResponse, true);
        } catch (error) {
            console.error('Streaming error:', error);
            this.inlineAssistComponent.addResponse('Error occurred during streaming', true);
        }
    };
}
```

## State Persistence

### Enable Persistence

Use the `enablePersistence` property to maintain component state across page reloads. When enabled, the conversation history and configuration are preserved in browser localStorage:

**Type:** `boolean`  
**Default:** `false`

```typescript
export class AppComponent {
    public enablePersistence: boolean = true;
}
```

**Important:** The component must have a unique `id` attribute for persistence to work correctly.

### Persistence Example

```typescript
import { Component } from '@angular/core';
import { InlineAIAssistModule, InlinePromptRequestEventArgs } from '@syncfusion/ej2-angular-interactive-chat';

@Component({
    imports: [InlineAIAssistModule],
    standalone: true,
    selector: 'app-root',
    template: `
        <div class="container">
            <button id="aiBtn" class="e-btn e-primary" (click)="onClick()">
                Open AI Assist
            </button>
            
            <ejs-inlineaiassist 
                id="persistentAssist"
                [relateTo]="'#aiBtn'"
                [enablePersistence]="true"
                popupWidth="500px"
                placeholder="Your conversation is saved..."
                (promptRequest)="onPromptRequest($event)">
            </ejs-inlineaiassist>
            
            <div class="info-box">
                <p><strong>State Persistence Enabled</strong></p>
                <p>Your conversation history will be preserved when you refresh this page.</p>
                <p>Try asking a question, then reload the page - your history remains!</p>
            </div>
        </div>
    `,
    styles: [`
        .container { padding: 20px; }
        .info-box { 
            margin-top: 20px; 
            padding: 15px; 
            background: #e3f2fd; 
            border-left: 4px solid #2196f3; 
        }
    `]
})
export class AppComponent {
    onClick(): void {
        // Component state is automatically restored from localStorage
        // No additional code needed
    }

    public onPromptRequest = (args: InlinePromptRequestEventArgs) => {
        setTimeout(() => {
            let response = 'Response for: ' + args.prompt;
            // This response will be persisted automatically
            this.inlineAssistComponent.addResponse(response);
        }, 1000);
    };
}
```

### Features Persisted

When `enablePersistence` is set to `true`, the following are automatically saved:

- **Conversation history** - All prompts and responses
- **Popup dimensions** - Width and height settings
- **Current prompt text** - Unsent prompt in textarea
- **Response mode** - Popup or Inline mode
- **Custom properties** - Any user-configured values

### Storage Details

**Storage Location:** Browser's localStorage  
**Storage Key:** Component's `id` attribute value  
**Storage Format:** JSON serialized component state

### Clearing Persisted State

```typescript
// Clear state for specific component
localStorage.removeItem('persistentAssist'); // Use component's id

// Clear all Syncfusion component state
Object.keys(localStorage).forEach(key => {
    if (key.startsWith('ejs-')) {
        localStorage.removeItem(key);
    }
});
```

## Common Configuration Patterns

### Minimal Setup
```typescript
<ejs-inlineaiassist id="assist" [relateTo]="'#button'"></ejs-inlineaiassist>
```

### Full Configuration
```typescript
<ejs-inlineaiassist 
    id="assist"
    [relateTo]="'#button'"
    [responseMode]="'Popup'"
    [popupWidth]="'600px'"
    [popupHeight]="'400px'"
    [placeholder]="'Enter your prompt...'"
    [cssClass]="'custom-class'"
    [zIndex]="5000"
    [enableStreaming]="true"
    [enablePersistence]="true"
    [responseSettings]="responseSettings"
    [commandSettings]="commandSettings"
    (promptRequest)="onPromptRequest($event)">
</ejs-inlineaiassist>
```
