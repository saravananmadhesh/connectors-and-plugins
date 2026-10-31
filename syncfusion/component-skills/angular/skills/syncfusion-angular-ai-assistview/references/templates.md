# Templates in Angular AI AssistView Component

## Template Overview

The AI AssistView component offers several template options to customize the banner, prompt items, response items, suggestions, and footer. Templates enable you to create branded interfaces, custom layouts, and unique user interactions tailored to your application's needs.

## Banner Template

The `bannerTemplate` property allows for the display of custom content, such as a welcome note or introductory instructions, at the top of the AI AssistView's conversation area.

```typescript
import { AIAssistViewModule } from '@syncfusion/ej2-angular-interactive-chat';

import { Component, ViewChild } from '@angular/core';
import { AIAssistViewComponent } from '@syncfusion/ej2-angular-interactive-chat';


@Component({
    imports: [ AIAssistViewModule ],
    standalone: true,
    selector: 'app-root',
    // specifies the template string for the AI AssistView component
    template: `
    <div ejs-aiassistview id="banner" #aiAssistViewComponent (promptRequest)="onPromptRequest()">
        <ng-template #bannerTemplate>
            <div class="banner-content">
                <div class="e-icons e-assistview-icon"></div>
                <h3>AI Assistance</h3>
                <div>Your everyday AI companion.</div>
            </div>
        </ng-template>
    </div>`
})

export class AppComponent {
    @ViewChild('aiAssistViewComponent')
    public aiAssistViewComponent!: AIAssistViewComponent;

    public onPromptRequest = () => {
        setTimeout(() => {
          let defaultResponse = 'For real-time prompt processing, connect the AIAssistView component to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
          this.aiAssistViewComponent.addPromptResponse(defaultResponse);
        }, 1000);
    };
}
```

### Banner Template Use Cases

- **Welcome message:** "Welcome to our support assistant"
- **Quick instructions:** "Ask me about product features or troubleshooting"
- **Branding:** Display company logo with tagline
- **Resource links:** "Learn more about [Documentation](url)"

### Tips

- Keep banner content concise (2-3 lines)
- Use clear, welcoming language
- Include company branding if applicable
- Avoid interactive elements in banner

---

## Prompt Item Template

To customize the appearance of prompt items, use the `promptItemTemplate` property with an `ng-template` directive. The template's context provides `prompt`, `toolbarItems`, and `index` items for tailored rendering.

```typescript
import { AIAssistViewModule } from '@syncfusion/ej2-angular-interactive-chat';

import { Component, ViewChild } from '@angular/core';
import { AIAssistViewComponent } from '@syncfusion/ej2-angular-interactive-chat';
import { PromptRequestEventArgs } from '@syncfusion/ej2-interactive-chat';


@Component({
    imports: [ AIAssistViewModule ],
    standalone: true,
    selector: 'app-root',
    // specifies the template string for the AI AssistView component
    template: `
    <div ejs-aiassistview id="prompt-item" #aiAssistViewComponent [prompts]="promptsData" (promptRequest)="onPromptRequest($event)">
        <ng-template #promptItemTemplate let-data>
            <div class="promptItemContent">
                <div class="prompt-header">You
                    <span class="e-icons e-user"></span>
                </div>
                <div class="content">{{cleanPrompt(data.prompt)}}</div>
            </div>
        </ng-template>
    </div>`
})

export class AppComponent {
    @ViewChild('aiAssistViewComponent')
    public aiAssistViewComponent!: AIAssistViewComponent;

    public promptsData  = [
        {
          prompt: "What is AI?",
          response: `<div>AI stands for Artificial Intelligence, enabling machines to mimic human intelligence for tasks such as learning, problem-solving, and decision-making.</div>`
        }
    ];

    public onPromptRequest = (args: PromptRequestEventArgs) => {
        setTimeout(() => {
          let foundPrompt = this.promptsData.find((promptObj: any) => promptObj.prompt === args.prompt);
          let defaultResponse = 'For real-time prompt processing, connect the AIAssistView component to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
          this.aiAssistViewComponent.addPromptResponse(foundPrompt ? foundPrompt.response : defaultResponse);
        }, 1000);
    };

    public cleanPrompt(prompt: string): string {
        return prompt.replace('<span class="e-icons e-circle-info"></span>', '');
    };
}
```

### Context Variables

The prompt item template provides the following context variables through `let-data`:

- **prompt** (string): The user's prompt text
- **toolbarItems** (any): Toolbar items configuration
- **index** (number): Index of this prompt in conversation

### Use Cases

- **User identification:** Show "You" or user avatar
- **Timestamps:** Display when prompt was sent
- **Custom icons:** Add user icons or emoji
- **Styling:** Apply custom CSS classes for alignment

### Tips

- Use `let-data` to access context variables
- Bind to `data.prompt` for the actual prompt text
- Use `data.index` to style prompts differently based on order
- Keep prompt template lightweight for performance

---

## Response Item Template

The `responseItemTemplate` property can be utilized with an `ng-template` directive to modify the layout of response items. The available context includes `prompt`, `response`, `index`, `toolbarItems`, and `output`.

```typescript
import { AIAssistViewModule } from '@syncfusion/ej2-angular-interactive-chat';

import { Component, ViewChild } from '@angular/core';
import { AIAssistViewComponent } from '@syncfusion/ej2-angular-interactive-chat';
import { PromptRequestEventArgs } from '@syncfusion/ej2-interactive-chat';


@Component({
    imports: [ AIAssistViewModule ],
    standalone: true,
    selector: 'app-root',
    // specifies the template string for the AI AssistView component
    template: `
    <div ejs-aiassistview id="response-item" #aiAssistViewComponent (promptRequest)="onPromptRequest($event)" [prompts]="promptsData">
        <ng-template #responseItemTemplate let-data>
            <div class="responseItemContent">
                <div class="response-header">
                    <span class="e-icons e-assistview-icon"></span>
                    AI Assist
                </div>
                <div class="assist-response-content" [innerHTML]='data.response'></div>
            </div>
        </ng-template>
    </div>`
})

export class AppComponent {
    @ViewChild('aiAssistViewComponent')
    public aiAssistViewComponent!: AIAssistViewComponent;

    public promptsData = [
        {
          prompt: "What is AI?",
          response: `<div>AI stands for Artificial Intelligence, enabling machines to mimic human intelligence for tasks such as learning, problem-solving, and decision-making.</div>`
        }
    ];

    public onPromptRequest = (args: PromptRequestEventArgs) => {
        setTimeout(() => {
            let foundPrompt = this.promptsData.find((promptObj: any) => promptObj.prompt === args.prompt);
            let defaultResponse = 'For real-time prompt processing, connect the AIAssistView component to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
            this.aiAssistViewComponent.addPromptResponse(foundPrompt ? foundPrompt.response : defaultResponse);
        }, 1000);
    };
}
```

### Context Variables

The response item template provides the following context variables through `let-data`:

- **prompt** (string): Original user prompt
- **response** (string): HTML response from AI
- **index** (number): Index in conversation
- **toolbarItems** (any): Toolbar configuration
- **output** (any): Additional output data

### Use Cases

- **AI branding:** Show "AI Assistant" with icon
- **Response formatting:** Custom styling for different response types
- **Action buttons:** Add copy, like, dislike buttons
- **Metadata:** Display response timestamp or source

### Tips

- Use `[innerHTML]="data.response"` to render HTML responses safely
- The `data.response` already contains HTML from AI service
- Use `data.prompt` to conditionally format based on user question
- Add feedback buttons in response template for quality improvement

---

## Response Animation Template

The `responseAnimationTemplate` property allows a custom loading indicator or animation to be shown while the AI AssistView is generating a response. The animation template is shown in place of the response and removed once the response is added.

```typescript
import { AIAssistViewModule } from '@syncfusion/ej2-angular-interactive-chat';

import { Component, ViewChild } from '@angular/core';
import { AIAssistViewComponent } from '@syncfusion/ej2-angular-interactive-chat';
import { PromptRequestEventArgs } from '@syncfusion/ej2-interactive-chat';


@Component({
    imports: [ AIAssistViewModule ],
    standalone: true,
    selector: 'app-root',
    // specifies the template string for the AI AssistView component
    template: `
    <div ejs-aiassistview id="response-animation" #aiAssistViewComponent (promptRequest)="onPromptRequest($event)">
        <ng-template #responseAnimationTemplate>
            <div class="assistview-loading-status">
                <div class="assistview-grid-icon">
                    <span></span><span></span><span></span>
                    <span></span><span></span><span></span>
                    <span></span><span></span><span></span>
                </div>
                <span class="assistview-loading-label">Generating</span>
            </div>
        </ng-template>
    </div>`
})

export class AppComponent {
    @ViewChild('aiAssistViewComponent')
    public aiAssistViewComponent!: AIAssistViewComponent;

    public onPromptRequest = (args: PromptRequestEventArgs) => {
        return new Promise<void>((resolve: () => void) => {
            setTimeout(() => {
                let defaultResponse = 'For real-time prompt processing, connect the AIAssistView component to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
                this.aiAssistViewComponent.addPromptResponse(defaultResponse);
                resolve();
            }, 2000);
        });
    };
}
```

### Context Variables

The response animation template does not expose context variables. It is rendered in place of the response and removed automatically once `addPromptResponse()` is called.

### Use Cases

- **Branded loader:** Show a logo or branded spinner while the AI is "thinking"
- **Status text:** Display progress messages such as "Generating", "Searching knowledge base…"
- **Skeleton placeholder:** Render a skeleton layout that hints at the upcoming response shape
- **Animated indicators:** Show typing dots, shimmer effects, or progress bars

### Tips

- Wrap async work in a `Promise` and call `resolve()` after `addPromptResponse()` so the loader stays visible for the full response time
- Use semantic markup (`role="status"`, `aria-live="polite"`) so screen readers announce the loading state
- Keep the template lightweight — it is rendered on every prompt
- Pair with `responseItemTemplate` so the post-loader response renders in your brand's layout

---

## Prompt Suggestion Item Template

For customizing the prompt suggestion items, the `promptSuggestionItemTemplate` property can be implemented using an `ng-template` directive. The context for this template includes the `index` and `promptSuggestion` items.

```typescript
import { AIAssistViewModule } from '@syncfusion/ej2-angular-interactive-chat';

import { Component, ViewChild } from '@angular/core';
import { AIAssistViewComponent } from '@syncfusion/ej2-angular-interactive-chat';
import { PromptRequestEventArgs } from '@syncfusion/ej2-interactive-chat';


@Component({
    imports: [ AIAssistViewModule ],
    standalone: true,
    selector: 'app-root',
    // specifies the template string for the AI AssistView component
    template: `
    <div ejs-aiassistview id="suggestions-template" #aiAssistViewComponent (promptRequest)="onPromptRequest($event)" [promptSuggestions]="promptSuggestions">
        <ng-template #promptSuggestionItemTemplate let-data>
            <div class='suggestion-item active'>
                <span class="e-icons e-circle-info"></span>
                <div class="content">{{data.promptSuggestion}}</div>
            </div>
        </ng-template>
    </div>`
})

export class AppComponent {
    @ViewChild('aiAssistViewComponent')
    public aiAssistViewComponent!: AIAssistViewComponent;

    public promptSuggestions: string[] = [
        "Best practices for clean, maintainable code?",
        "How to optimize code editor for speed?"
    ];

    public onPromptRequest = (args: PromptRequestEventArgs) => {
        setTimeout(() => {
          let response1 = "Use clear naming, break code into small functions, avoid repetition, write tests, and follow coding standards.";
          let response2 = "Install useful extensions, set up shortcuts, enable linting, and customize settings for smoother development.";
          let defaultResponse = 'For real-time prompt processing, connect the AIAssistView component to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
          this.aiAssistViewComponent.addPromptResponse(args.prompt === this.aiAssistViewComponent.promptSuggestions[0] ? response1 : args.prompt === this.aiAssistViewComponent.promptSuggestions[1] ? response2 : defaultResponse);
        }, 1000);
    };
}
```

### Context Variables

The suggestion item template provides the following context variables through `let-data`:

- **index** (number): Index of this suggestion
- **promptSuggestion** (string): The suggestion text

### Use Cases

- **Styled suggestion pills:** Custom background, borders, fonts
- **Suggestion icons:** Emoji or icon indicators for each suggestion
- **Category labels:** Group suggestions by topic
- **Interactive hints:** Show description on hover

### Tips

- Use `data.promptSuggestion` to access the suggestion text
- Use `data.index` to apply different styling to different suggestions
- Keep suggestion text concise (under 50 characters)
- Consider adding emoji or icons for visual guidance

---

## Footer Template

The `footerTemplate` property offers a way to replace the default footer and manage prompt request actions. This enables the creation of unique footers that can include custom functionalities, such as a character counter or a button to clear the conversation.

```typescript
import { AIAssistViewModule } from '@syncfusion/ej2-angular-interactive-chat';

import { Component, ViewChild } from '@angular/core';
import { AIAssistViewComponent } from '@syncfusion/ej2-angular-interactive-chat';


@Component({
    imports: [ AIAssistViewModule ],
    standalone: true,
    selector: 'app-root',
    // specifies the template string for the AI AssistView component
    template: `
    <div ejs-aiassistview id="footer-template" #aiAssistViewComponent>
        <ng-template #footerTemplate>
            <div class="custom-footer">
                <textarea id="promptTextArea" class="e-input" rows="2" placeholder="Enter your prompt here"></textarea>
                <button id="sendPrompt" class="e-btn e-primary" (click)="buttonClick()">Generate</button>
            </div>
        </ng-template>
    </div>`
})

export class AppComponent {
    @ViewChild('aiAssistViewComponent')
    public aiAssistViewComponent!: AIAssistViewComponent;

    public buttonClick = () => {
        const textArea = document.getElementById('promptTextArea') as HTMLTextAreaElement;
        if (textArea) {
          textArea.value = '';
          let defaultResponse = 'For real-time prompt processing, connect the AIAssistView component to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
          this.aiAssistViewComponent.addPromptResponse(defaultResponse);
        }
    };
}
```

### Use Cases

- **Custom textarea:** Multi-line input with custom styling
- **Multiple buttons:** Send, Clear, Settings buttons
- **Character counter:** Track input length
- **Input validation:** Show validation messages before sending
- **Quick action buttons:** Common actions like "Clear Chat", "Save Conversation"

### Tips

- Use `@ViewChild` to get reference to AIAssistViewComponent
- Call `addPromptResponse()` when user submits
- Access DOM elements using `document.getElementById()`
- Style footer to match your application theme
- Consider adding keyboard shortcuts (e.g., Ctrl+Enter to send)

---

## Template Context Variables Reference

| Template | Context Variable | Type | Description |
|----------|------------------|------|-------------|
| **Banner Template** | None | - | No context variables available |
| **Prompt Item Template** | let-data | Object | Contains: `prompt`, `index`, `toolbarItems` |
| **Response Item Template** | let-data | Object | Contains: `response`, `prompt`, `index`, `toolbarItems`, `output` |
| **Response Animation Template** | None | - | No context variables; rendered while generating, removed once `addPromptResponse()` is called |
| **Suggestion Item Template** | let-data | Object | Contains: `promptSuggestion`, `index` |
| **Footer Template** | None | - | No context variables; use @ViewChild for component reference |

---

## Complete Multi-Template Example

```typescript
import { AIAssistViewModule } from '@syncfusion/ej2-angular-interactive-chat';
import { Component, ViewChild } from '@angular/core';
import { AIAssistViewComponent } from '@syncfusion/ej2-angular-interactive-chat';
import { PromptRequestEventArgs } from '@syncfusion/ej2-interactive-chat';

@Component({
    imports: [ AIAssistViewModule ],
    standalone: true,
    selector: 'app-root',
    template: `
    <div ejs-aiassistview #aiAssistViewComponent 
         [prompts]="promptsData"
         [promptSuggestions]="promptSuggestions"
         (promptRequest)="onPromptRequest($event)">
        
        <!-- Banner: Welcome message -->
        <ng-template #bannerTemplate>
            <div class="banner-content">
                <h3>Welcome to AI Assistant</h3>
                <p>Ask me anything about your project</p>
            </div>
        </ng-template>
        
        <!-- Prompts: User messages -->
        <ng-template #promptItemTemplate let-data>
            <div class="user-message">
                <span class="user-icon">👤</span>
                <span>{{data.prompt}}</span>
            </div>
        </ng-template>
        
        <!-- Responses: AI messages -->
        <ng-template #responseItemTemplate let-data>
            <div class="ai-message">
                <span class="ai-icon">🤖</span>
                <div [innerHTML]="data.response"></div>
            </div>
        </ng-template>
        
        <!-- Suggestions: Quick prompts -->
        <ng-template #promptSuggestionItemTemplate let-data>
            <div class="suggestion-pill">
                <span class="icon">💡</span>
                {{data.promptSuggestion}}
            </div>
        </ng-template>
        
        <!-- Footer: Custom input area -->
        <ng-template #footerTemplate>
            <div class="custom-footer">
                <textarea id="promptInput" placeholder="Type your question..."></textarea>
                <button (click)="sendPrompt()">Send</button>
            </div>
        </ng-template>
    </div>
    `
})
export class AppComponent {
    @ViewChild('aiAssistViewComponent')
    public aiAssistViewComponent!: AIAssistViewComponent;

    public promptsData = [
        {
            prompt: "What is AI?",
            response: `<div>AI stands for Artificial Intelligence, enabling machines to mimic human intelligence.</div>`
        }
    ];

    public promptSuggestions = [
        "How do I get started?",
        "What are common use cases?"
    ];

    public onPromptRequest = (args: PromptRequestEventArgs) => {
        setTimeout(() => {
            let defaultResponse = 'Processing your request...';
            this.aiAssistViewComponent.addPromptResponse(defaultResponse);
        }, 1000);
    };

    public sendPrompt = () => {
        const textArea = document.getElementById('promptInput') as HTMLTextAreaElement;
        if (textArea && textArea.value.trim()) {
            this.aiAssistViewComponent.addPromptResponse('Response...');
            textArea.value = '';
        }
    };
}
```

---

## Common Template Patterns

### Pattern 1: Minimal Setup (Banner + Footer Only)

When you need just essential customization, use only banner and footer templates:

```typescript
<div ejs-aiassistview #aiAssistViewComponent>
    <ng-template #bannerTemplate>
        <h3>My Assistant</h3>
    </ng-template>
    
    <ng-template #footerTemplate>
        <textarea placeholder="Ask me..."></textarea>
        <button>Send</button>
    </ng-template>
</div>
```

### Pattern 2: Branded Conversation

Create a branded experience with user/AI identification:

```typescript
<ng-template #promptItemTemplate let-data>
    <div class="user-bubble">
        <span class="avatar">User</span>
        <span class="text">{{data.prompt}}</span>
    </div>
</ng-template>

<ng-template #responseItemTemplate let-data>
    <div class="ai-bubble">
        <span class="avatar">AI</span>
        <div class="text" [innerHTML]="data.response"></div>
    </div>
</ng-template>
```

### Pattern 3: Data-Driven Styling

Use context index to apply alternating styles:

```typescript
<ng-template #promptItemTemplate let-data>
    <div [class]="'prompt-' + (data.index % 2 === 0 ? 'even' : 'odd')">
        {{data.prompt}}
    </div>
</ng-template>
```

---

## Troubleshooting

### Issue: Template Not Rendering

**Cause:** Template reference name doesn't match property name

**Solution:** Ensure `#bannerTemplate` matches `bannerTemplate` property on component

### Issue: Context Variables Undefined

**Cause:** Incorrect context variable names

**Solution:** Use `let-data` for access; verify property names match the reference table

### Issue: HTML in Response Not Rendering

**Cause:** Using string interpolation `{{data.response}}` instead of property binding

**Solution:** Use `[innerHTML]="data.response"` to render HTML content

### Issue: Footer Not Responding to Clicks

**Cause:** ViewChild not initialized or component not fully loaded

**Solution:** Ensure `@ViewChild` is declared and component is fully loaded before accessing

### Issue: Suggestions Not Appearing

**Cause:** `promptSuggestions` array is empty

**Solution:** Populate array before component initialization: `[promptSuggestions]="suggestions"`

---

## Best Practices

1. **Template Naming:** Use descriptive names matching the template property
2. **Performance:** Keep templates lightweight; avoid complex logic
3. **Accessibility:** Use semantic HTML; include aria-labels where needed
4. **Styling:** Use CSS classes instead of inline styles for maintainability
5. **Reusability:** Extract common template patterns into shared components
6. **Testing:** Test each template independently before combining
7. **Documentation:** Document custom template properties in component code
