# Events and Methods

## Table of Contents
- [Lifecycle Events](#lifecycle-events)
- [Popup Events](#popup-events)
- [Prompt Request Event](#prompt-request-event)
- [Public Methods](#public-methods)
- [Method Usage Examples](#method-usage-examples)
- [Complete Event Handling Example](#complete-event-handling-example)

## Lifecycle Events

### created Event

Triggered when the component rendering is completed. Use this to initialize component state or set up references.

```typescript
import { Component, ViewChild } from '@angular/core';
import { InlineAIAssistComponent, InlineAIAssistModule } from '@syncfusion/ej2-angular-interactive-chat';

@Component({
    imports: [InlineAIAssistModule],
    standalone: true,
    template: `
        <ejs-inlineaiassist id="assist" (created)="onCreated()"></ejs-inlineaiassist>
    `
})
export class AppComponent {
    @ViewChild('inlineAssistComponent')
    public inlineAssistComponent!: InlineAIAssistComponent;

    public onCreated = () => {
        console.log('Component created and initialized');
        // Initialize component properties
        // Load default prompts
        // Set up event listeners
    };
}
```

## Popup Events

### open Event

Triggered when the popup opens. Useful for logging, analytics, or updating UI.

```typescript
import { OpenEventArgs } from '@syncfusion/ej2-popups';

public onOpen = (args: OpenEventArgs) => {
    console.log('Popup opened');
    console.log('Event args:', args);
    
    // Track analytics
    // Update related UI
    // Focus on input
};

```

### close Event

Triggered when the popup closes. Handle cleanup or save state.

```typescript
import { CloseEventArgs } from '@syncfusion/ej2-popups';

public onClose = (args: CloseEventArgs) => {
    console.log('Popup closed');
};

```

## Prompt Request Event

### promptRequest Event

Triggered when user submits a prompt. This is where you connect to AI services.

```typescript
import { InlinePromptRequestEventArgs } from '@syncfusion/ej2-angular-interactive-chat';

public onPromptRequest = (args: InlinePromptRequestEventArgs) => {
    console.log('Prompt submitted:', args.prompt);
    
    // Step 1: Get the prompt text
    const userPrompt = args.prompt;
    
    // Step 2: Call AI service
    // Step 3: Get response
    // Step 4: Add response using addResponse method
    
    setTimeout(() => {
        let response = 'AI-generated response for: ' + userPrompt;
        this.inlineAssistComponent.addResponse(response);
    }, 1000);
};

```

### Integrating with AI Services

```typescript
import { HttpClient } from '@angular/common/http';

export class AppComponent {
    constructor(private http: HttpClient) {}

    public onPromptRequest = (args: InlinePromptRequestEventArgs) => {
        // Show loading state
        this.isLoading = true;
        
        // Call OpenAI or your AI service
        this.http.post('/api/ai/generate', { prompt: args.prompt })
            .subscribe({
                next: (response: any) => {
                    // Add response to component
                    this.inlineAssistComponent.addResponse(response.text);
                    this.isLoading = false;
                },
                error: (error) => {
                    // Handle error
                    this.inlineAssistComponent.addResponse('Error processing request');
                    this.isLoading = false;
                }
            });
    };
}
```

## Public Methods

### addResponse Method

Adds a response to the component and displays it based on response mode.

```typescript
// Syntax
addResponse(response: string): void

// Example
this.inlineAssistComponent.addResponse('This is the AI-generated response');

// With HTML content
const htmlResponse = `<div style="color: blue;">
    <h4>Summary</h4>
    <p>Key points go here</p>
</div>`;
this.inlineAssistComponent.addResponse(htmlResponse);
```

### executePrompt Method

Executes a prompt programmatically and triggers the promptRequest event.

```typescript
// Syntax
executePrompt(prompt: string): void

// Example - Execute a specific prompt
this.inlineAssistComponent.executePrompt('Summarize the content');

// Example - Execute user-provided prompt
onCustomButtonClick(promptText: string): void {
    this.inlineAssistComponent.executePrompt(promptText);
}
```

### showPopup Method

Displays the Inline AI Assist popup.

```typescript
// Syntax
showPopup(x?: number, y?: number): void

// Example - Show at default position
this.inlineAssistComponent.showPopup();

// Example - Show at specific coordinates
const x = 100;
const y = 200;
this.inlineAssistComponent.showPopup(x, y);

// Example - Show popup on button click
onClick(): void {
    this.inlineAssistComponent.showPopup();
}
```

### hidePopup Method

Closes/hides the Inline AI Assist popup.

```typescript
// Syntax
hidePopup(): void

// Example - Hide popup
this.inlineAssistComponent.hidePopup();

// Example - Hide after accepting response
public itemSelect = (args: ResponseItemSelectEventArgs) => {
    if (args.command.label === 'Accept') {
        // Apply response
        this.applyResponse();
        // Hide popup
        this.inlineAssistComponent.hidePopup();
    }
}
```

### showCommandPopup Method

Displays the command selection popup.

```typescript
// Syntax
showCommandPopup(): void

// Example
onClick(): void {
    this.inlineAssistComponent.showPopup();
    this.inlineAssistComponent.showCommandPopup();
}
```

### hideCommandPopup Method

Closes the command selection popup.

```typescript
// Syntax
hideCommandPopup(): void

// Example
onHideCommands(): void {
    this.inlineAssistComponent.hideCommandPopup();
}
```

## Method Usage Examples

### Example 1: Dynamic Prompt Execution

```typescript
export class AppComponent {
    @ViewChild('inlineAssistComponent')
    public inlineAssistComponent!: InlineAIAssistComponent;

    // Array of predefined prompts
    public quickPrompts = [
        { id: 1, text: 'Summarize content', label: 'Summarize' },
        { id: 2, text: 'Make it professional', label: 'Professional' },
        { id: 3, text: 'Translate to Spanish', label: 'Spanish' }
    ];

    public executeQuickPrompt(promptText: string): void {
        // Show popup
        this.inlineAssistComponent.showPopup();
        
        // Execute prompt
        setTimeout(() => {
            this.inlineAssistComponent.executePrompt(promptText);
        }, 200);
    }
}
```

### Example 2: Response History Management

```typescript
export class AppComponent {
    @ViewChild('inlineAssistComponent')
    public inlineAssistComponent!: InlineAIAssistComponent;

    public getPromptHistory(): any[] {
        return this.inlineAssistComponent.prompts;
    }

    public getLastResponse(): string {
        const prompts = this.inlineAssistComponent.prompts;
        if (prompts && prompts.length > 0) {
            return prompts[prompts.length - 1].response;
        }
        return '';
    }

    public exportHistory(): string {
        const history = this.getPromptHistory();
        return JSON.stringify(history, null, 2);
    }

    public clearHistory(): void {
        // Note: Direct clearing may not be available
        // You may need to re-initialize component
        this.inlineAssistComponent.dataBind();
    }
}
```

### Example 3: Conditional Popup Display

```typescript
export class AppComponent {
    @ViewChild('inlineAssistComponent')
    public inlineAssistComponent!: InlineAIAssistComponent;

    public userRole: string = 'user'; // user, admin, premium

    public showPopupIfAllowed(): void {
        // Check user permissions
        if (this.userRole === 'user') {
            alert('Feature available for premium users');
            return;
        }

        // Show popup if allowed
        this.inlineAssistComponent.showPopup();
    }

    public executeIfQuotaAvailable(prompt: string): void {
        if (this.getUserTokens() <= 0) {
            alert('Quota exceeded');
            return;
        }

        // Execute prompt
        this.inlineAssistComponent.executePrompt(prompt);
    }

    private getUserTokens(): number {
        // Get from service/store
        return 100;
    }
}
```

## Complete Event Handling Example

```typescript
import { ViewChild, Component, OnInit } from '@angular/core';
import { 
    InlineAIAssistModule, 
    InlineAIAssistComponent,
    InlinePromptRequestEventArgs,
    ResponseSettingsModel,
    ResponseItemSelectEventArgs
} from '@syncfusion/ej2-angular-interactive-chat';
import { OpenEventArgs, CloseEventArgs } from '@syncfusion/ej2-popups';

@Component({
    imports: [InlineAIAssistModule],
    standalone: true,
    selector: 'app-root',
    template: `
        <div class="container">
            <div class="info-panel">
                <p>Status: {{ status }}</p>
                <p>Prompts Count: {{ promptCount }}</p>
                <button (click)="onShowStatistics()" class="e-btn">Show Stats</button>
            </div>
            
            <button id="triggerBtn" class="e-btn e-primary" (click)="onClick()">
                Open AI Assist
            </button>
            
            <div id="editableText" contenteditable="true">
                <p>Content here...</p>
            </div>
            
            <ejs-inlineaiassist 
                id="assist" 
                #inlineAssistComponent
                [relateTo]="'#triggerBtn'"
                [responseSettings]="responseSetting"
                popupWidth="500px"
                (created)="onCreated()"
                (open)="onOpen($event)"
                (close)="onClose($event)"
                (promptRequest)="onPromptRequest($event)">
            </ejs-inlineaiassist>
        </div>
    `,
    styles: [`
        .container { padding: 20px; }
        .info-panel { margin-bottom: 20px; padding: 10px; border: 1px solid #ccc; }
        #editableText { width: 100%; min-height: 120px; padding: 12px; border: 1px solid; }
    `]
})
export class AppComponent implements OnInit {
    @ViewChild('inlineAssistComponent')
    public inlineAssistComponent!: InlineAIAssistComponent;

    public status: string = 'Ready';
    public promptCount: number = 0;
    private eventLog: any[] = [];

    ngOnInit(): void {
        // Initialize
    }

    public responseSetting: ResponseSettingsModel = {
        itemSelect: this.itemSelect
    }

    public onCreated = () => {
        this.status = 'Component initialized';
        console.log('Component created');
        this.logEvent('created');
    };

    public onOpen = (args: OpenEventArgs) => {
        this.status = 'Popup opened';
        console.log('Popup opened', args);
        this.logEvent('open');
    };

    public onClose = (args: CloseEventArgs) => {
        this.status = 'Popup closed';
        console.log('Popup closed', args);
        this.logEvent('close');
    };

    public onPromptRequest = (args: InlinePromptRequestEventArgs) => {
        this.status = 'Processing prompt...';
        this.logEvent('promptRequest', { prompt: args.prompt });
        
        console.log('Prompt requested:', args.prompt);
        
        setTimeout(() => {
            let response = 'Response for: ' + args.prompt;
            this.inlineAssistComponent.addResponse(response);
            this.promptCount = this.inlineAssistComponent.prompts.length;
            this.status = 'Response added';
        }, 1000);
    };

    public itemSelect = (args: ResponseItemSelectEventArgs) => {
        if (args.command.label === 'Accept') {
            const editable = document.getElementById('editableText') as HTMLElement;
            if (editable) {
                editable.innerHTML = this.inlineAssistComponent.prompts[
                    this.inlineAssistComponent.prompts.length - 1
                ].response;
            }
            this.inlineAssistComponent.hidePopup();
            this.status = 'Response accepted';
        }
    }

    public onClick(): void {
        this.inlineAssistComponent.showPopup();
    }

    public onShowStatistics(): void {
        const stats = {
            totalPrompts: this.promptCount,
            eventLog: this.eventLog,
            history: this.inlineAssistComponent.prompts
        };
        console.table(stats);
        alert(`Total prompts: ${this.promptCount}\nSee console for details`);
    }

    private logEvent(eventName: string, details?: any): void {
        this.eventLog.push({
            time: new Date().toLocaleTimeString(),
            event: eventName,
            details: details
        });
    }
}
```

## Error Handling

```typescript
public onPromptRequest = (args: InlinePromptRequestEventArgs) => {
    try {
        // Validate prompt
        if (!args.prompt || args.prompt.trim() === '') {
            throw new Error('Prompt cannot be empty');
        }

        // Call AI service with error handling
        this.callAIService(args.prompt)
            .then((response) => {
                this.inlineAssistComponent.addResponse(response);
            })
            .catch((error) => {
                console.error('AI service error:', error);
                this.inlineAssistComponent.addResponse(
                    'Error: Unable to process request. Please try again.'
                );
            });
    } catch (error) {
        console.error('Event handler error:', error);
        this.inlineAssistComponent.addResponse(
            'An error occurred. Please check the console for details.'
        );
    }
};

private callAIService(prompt: string): Promise<string> {
    return new Promise((resolve, reject) => {
        // Simulate API call
        setTimeout(() => {
            resolve('AI response here');
        }, 1000);
    });
}
```
