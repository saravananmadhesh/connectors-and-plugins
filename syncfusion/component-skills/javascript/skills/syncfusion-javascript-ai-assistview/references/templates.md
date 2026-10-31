# Templates

## Table of Contents
- [Overview](#overview)
- [Banner Template](#banner-template)
- [Prompt Item Template](#prompt-item-template)
- [Response Item Template](#response-item-template)
- [Response Animation Template](#response-animation-template)
- [Prompt Suggestion Item Template](#prompt-suggestion-item-template)
- [Footer Template](#footer-template)

This guide covers all template customization options in the AI AssistView component.

---

## Overview

The AI AssistView provides six template properties to customize different areas:

1. **bannerTemplate** - Welcome banner at the top
2. **promptItemTemplate** - User prompt messages
3. **responseItemTemplate** - AI response messages
4. **responseAnimationTemplate** - Loading indicator shown while a response is being generated
5. **promptSuggestionItemTemplate** - Suggestion chips
6. **footerTemplate** - Custom footer/input area

All templates support string HTML or function returning HTML.

---

## Banner Template

### Property

```typescript
bannerTemplate: string | Function = ''
```

The banner appears at the top of the conversation area, ideal for welcome messages or branding.

### String Template Example

```typescript
const aiAssistView: AIAssistView = new AIAssistView({
    bannerTemplate: `
        <div class="banner-content">
            <div class="e-icons e-assistview-icon"></div>
            <h3>AI Assistance</h3>
            <div>Your everyday AI companion.</div>
        </div>
    `,
    promptRequest: (args) => {
        aiAssistView.addPromptResponse('Response...');
    }
});
```

### Styling Banner

```html
<style>
    .banner-content {
        text-align: center;
        padding: 20px;
    }
    .banner-content .e-assistview-icon:before {
        font-size: 35px;
        color: #007bff;
    }
    .banner-content h3 {
        margin: 10px 0 5px 0;
    }
</style>
```

### Function Template Example

```typescript
function bannerTemplate() {
    const userGuideName = 'John Doe';
    return `
        <div class="banner-content">
            <h2>Welcome, ${userName}!</h2>
            <p>Ask me anything about our services.</p>
        </div>
    `;
}

const aiAssistView: AIAssistView = new AIAssistView({
    bannerTemplate: bannerTemplate
});
```

---

## Prompt Item Template

### Property

```typescript
promptItemTemplate: string | Function = ''
```

Customize how user prompt messages are displayed.

### Template Context

```typescript
{
    prompt: string;           // Prompt text
    toolbarItems: any[];     // Toolbar items for this prompt
    index: number;           // Prompt index
}
```

### Example

```typescript
function promptItemContent(ctx: any) {
    return `
        <div class="promptItemContent">
            <div class="prompt-header">
                You
                <span class="e-icons e-user"></span>
            </div>
            <div class="content">${ctx.prompt}</div>
        </div>
    `;
}

const aiAssistView: AIAssistView = new AIAssistView({
    promptItemTemplate: promptItemContent
});
```

### Styling

```html
<style>
    .promptItemContent {
        display: flex;
        flex-direction: column;
        gap: 10px;
        align-items: flex-end;
        margin-right: 20px;
    }
    .promptItemContent .prompt-header {
        font-size: 18px;
        font-weight: bold;
        display: flex;
        align-items: center;
        gap: 10px;
    }
    .promptItemContent .content {
        background: #e3f2fd;
        padding: 10px 15px;
        border-radius: 10px;
        max-width: 70%;
    }
</style>
```

---

## Response Item Template

### Property

```typescript
responseItemTemplate: string | Function = ''
```

Customize how AI response messages are displayed.

### Template Context

```typescript
{
    prompt: string;           // Original prompt
    response: string;         // AI response (HTML)
    toolbarItems: any[];     // Toolbar items
    index: number;           // Response index
    output: any;             // Additional output data
}
```

### Example

```typescript
function responseItemContent(ctx: any) {
    return `
        <div class="responseItemContent">
            <div class="response-header">
                <span class="e-icons e-assistview-icon"></span>
                AI Assistant
            </div>
            <div class="responseContent">${ctx.response}</div>
        </div>
    `;
}

const aiAssistView: AIAssistView = new AIAssistView({
    responseItemTemplate: responseItemContent
});
```

### Styling

```html
<style>
    .responseItemContent {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-left: 20px;
    }
    .responseItemContent .response-header {
        font-size: 18px;
        font-weight: bold;
        display: flex;
        align-items: center;
        gap: 10px;
    }
    .responseItemContent .responseContent {
        background: #f5f5f5;
        padding: 10px 15px;
        border-radius: 10px;
        max-width: 70%;
    }
</style>
```

---

## Response Animation Template

### Property

```typescript
responseAnimationTemplate: string | Function = ''
```

The `responseAnimationTemplate` property displays a custom loading indicator or animation in the AI AssistView while a response is being generated. The animation template is shown in place of the response and is removed once the response is added.

To use this template effectively, return a `Promise` from `promptRequest` and call `resolve()` only after `addPromptResponse` completes. The AI AssistView keeps the animation visible until the promise resolves.

### Example

```typescript
import { AIAssistView, PromptRequestEventArgs } from '@syncfusion/ej2-interactive-chat';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

let aiAssistView: AIAssistView = new AIAssistView({
    responseAnimationTemplate: responseAnimationContent,
    promptRequest: (args: PromptRequestEventArgs) => {
        return new Promise<void>((resolve: () => void) => {
            setTimeout(() => {
                const defaultResponse = 'For real-time prompt processing, connect the AIAssistView component to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
                aiAssistView.addPromptResponse(defaultResponse);
                resolve();
            }, 2000);
        });
    }
});
aiAssistView.appendTo('#response-animation');

function responseAnimationContent() {
    return `<div class="assistview-loading-status">
                <div class="assistview-grid-icon">
                    <span></span><span></span><span></span>
                    <span></span><span></span><span></span>
                    <span></span><span></span><span></span>
                </div>
                <span class="assistview-loading-label">Generating</span>
            </div>`;
}
```

### Styling the Animation

```html
<style>
    .assistview-loading-status {
        display: flex;
        gap: 10px;
        color: #666;
        font-family: "Segoe UI", system-ui, sans-serif;
        font-size: 14px;
        font-weight: 500;
        line-height: 1.4;
    }

    .assistview-grid-icon {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 2px;
        width: 18px;
        height: 18px;
        flex-shrink: 0;
    }

    .assistview-grid-icon span {
        width: 4px;
        height: 4px;
        background: #8a8a8a;
        border-radius: 1px;
        opacity: 0.25;
        animation: assistview-pulse 1.8s ease-in-out infinite;
    }

    .assistview-grid-icon span:nth-child(1) { animation-delay: 0s; }
    .assistview-grid-icon span:nth-child(2) { animation-delay: 0.1s; }
    .assistview-grid-icon span:nth-child(3) { animation-delay: 0.2s; }
    .assistview-grid-icon span:nth-child(4) { animation-delay: 0.3s; }
    .assistview-grid-icon span:nth-child(5) { animation-delay: 0.4s; }
    .assistview-grid-icon span:nth-child(6) { animation-delay: 0.5s; }
    .assistview-grid-icon span:nth-child(7) { animation-delay: 0.6s; }
    .assistview-grid-icon span:nth-child(8) { animation-delay: 0.7s; }
    .assistview-grid-icon span:nth-child(9) { animation-delay: 0.8s; }

    @keyframes assistview-pulse {
        0%,
        100% {
            opacity: 0.25;
        }
        50% {
            opacity: 1;
        }
    }
</style>
```

### Behavior Notes

- The animation template is rendered in place of the response area while the response is being generated.
- The template is automatically removed once `addPromptResponse` (or the next response update) is invoked.
- Return a `Promise` from `promptRequest` and call `resolve()` only after the response is added so the AI AssistView keeps the animation visible until the response is complete.

---

## Prompt Suggestion Item Template

### Property

```typescript
promptSuggestionItemTemplate: string | Function = ''
```

Customize the appearance of prompt suggestion chips.

### Template Context

```typescript
{
    promptSuggestion: string;  // Suggestion text
    index: number;             // Suggestion index
}
```

### Example

```typescript
function suggestionItemContent(ctx: any) {
    return `
        <div class='suggestion-item'>
            <span class="e-icons e-circle-info"></span>
            <div class="assist-suggestion-content">${ctx.promptSuggestion}</div>
        </div>
    `;
}

const aiAssistView: AIAssistView = new AIAssistView({
    promptSuggestions: [
        'Best practices for clean code?',
        'How to optimize performance?'
    ],
    promptSuggestionItemTemplate: suggestionItemContent
});
```

### Styling

```html
<style>
    .suggestion-item {
        display: flex;
        align-items: center;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 10px 15px;
        gap: 10px;
        border-radius: 20px;
        cursor: pointer;
        transition: transform 0.2s;
    }
    .suggestion-item:hover {
        transform: translateY(-2px);
    }
    .suggestion-item .assist-suggestion-content {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
</style>
```

---

## Footer Template

### Property

```typescript
footerTemplate: string | Function = ''
```

Completely customize the footer area, replacing the default input and send button.

### Example

```typescript
function footerContent() {
    return `
        <div class="custom-footer">
            <textarea id="promptTextArea" class="e-input" rows="2" 
                placeholder="Enter your prompt here"></textarea>
            <button id="sendPrompt" class="e-btn e-primary">Generate</button>
        </div>
    `;
}

const aiAssistView: AIAssistView = new AIAssistView({
    footerTemplate: footerContent
});

// Handle custom button click
document.addEventListener('click', (event) => {
    if ((event.target as HTMLElement).id === 'sendPrompt') {
        const textArea = document.getElementById('promptTextArea') as HTMLTextAreaElement;
        const prompt = textArea.value;
        if (prompt) {
            // Execute prompt
            aiAssistView.executePrompt(prompt);
            textArea.value = '';
        }
    }
});
```

### Styling

```html
<style>
    .custom-footer {
        display: flex;
        gap: 10px;
        padding: 10px;
        background-color: #f9f9f9;
        border-top: 1px solid #ddd;
    }
    #promptTextArea {
        flex: 1;
        padding: 10px;
        border-radius: 5px;
        border: 1px solid #ccc;
        resize: vertical;
    }
    #sendPrompt {
        align-self: flex-end;
        padding: 10px 20px;
    }
</style>
```

### Complex Footer with Multiple Controls

```typescript
function advancedFooter() {
    return `
        <div class="advanced-footer">
            <div class="footer-controls">
                <button id="attachBtn" class="e-btn e-flat">
                    <span class="e-icons e-attachment"></span>
                </button>
                <button id="voiceBtn" class="e-btn e-flat">
                    <span class="e-icons e-microphone"></span>
                </button>
            </div>
            <textarea id="promptArea" class="e-input" placeholder="Type your message..."></textarea>
            <div class="footer-actions">
                <button id="clearBtn" class="e-btn e-flat">Clear</button>
                <button id="sendBtn" class="e-btn e-primary">Send</button>
            </div>
        </div>
    `;
}
```

---

## Summary

**Template Properties:**
- `bannerTemplate`: Top banner area
- `promptItemTemplate`: User prompt messages
- `responseItemTemplate`: AI response messages
- `responseAnimationTemplate`: Loading indicator shown while a response is being generated
- `promptSuggestionItemTemplate`: Suggestion chips
- `footerTemplate`: Footer/input area

**Template Types:**
- String: HTML string
- Function: Returns HTML string, can access context data

**Use Cases:**
- Custom branding and styling
- Add metadata to messages (timestamps, status)
- Implement custom input controls
- Create themed interfaces
- Add interactive elements
