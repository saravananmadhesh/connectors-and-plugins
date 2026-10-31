# Inline Assist Configuration

Configure core properties of the Inline AI Assist component including prompts, placeholders, dimensions, and behavior settings.

## Setting Prompt Text

Use the `prompt` property to pre-define prompt text that appears in the prompt textarea.

```typescript
import { InlineAIAssist } from '@syncfusion/ej2-interactive-chat';

let inlineAssist = new InlineAIAssist({
    prompt: 'What are the benefits of Inline AI Assist?',
    relateTo: '#summarizeBtn',
    promptRequest: () => {
        setTimeout(() => {
            inlineAssist.addResponse('Inline AI Assist provides contextual AI help...');
        }, 1000);
    }
});

inlineAssist.appendTo('#inlineAssist');
```

### Use Case: Pre-filled Prompts

```typescript
// Pre-fill based on context
let selectedText = window.getSelection().toString();
let inlineAssist = new InlineAIAssist({
    prompt: `Improve this text: "${selectedText}"`,
    relateTo: '#improveBtn'
});
```

---

## Setting Prompt Placeholder

Use the `placeholder` property to set placeholder text in the prompt textarea. Default value is `'Ask or generate AI content..'`.

```typescript
let inlineAssist = new InlineAIAssist({
    placeholder: 'Type your prompt here...',
    relateTo: '#aiBtn',
    promptRequest: handlePrompt
});
```

### Contextual Placeholders

```typescript
// Different placeholders for different actions
let summarizeAssist = new InlineAIAssist({
    placeholder: 'Ask AI to summarize...',
    relateTo: '#summarizeBtn'
});

let translateAssist = new InlineAIAssist({
    placeholder: 'Enter text to translate...',
    relateTo: '#translateBtn'
});
```

---

## Prompt-Response Collection

The `prompts` property stores all prompts and their corresponding responses. Use this to retrieve, display, or manipulate the conversation history.

### Accessing Prompts Collection

```typescript
let promptsData = [
    {
        prompt: "What is AI?",
        response: "<div>AI stands for Artificial Intelligence...</div>"
    }
];

let inlineAssist = new InlineAIAssist({
    prompts: promptsData,
    relateTo: '#aiBtn',
    promptRequest: (args) => {
        // Check if prompt has cached response
        let foundPrompt = promptsData.find(p => p.prompt === args.prompt);
        if (foundPrompt) {
            inlineAssist.addResponse(foundPrompt.response);
        } else {
            // Generate new response
            getAIResponse(args.prompt).then(response => {
                inlineAssist.addResponse(response);
            });
        }
    }
});
```

### Retrieve Last Response

```typescript
responseSettings: {
    itemSelect: (args) => {
        if (args.command.label === 'Accept') {
            // Get the last prompt-response pair
            let lastPrompt = inlineAssist.prompts[inlineAssist.prompts.length - 1];
            console.log('Prompt:', lastPrompt.prompt);
            console.log('Response:', lastPrompt.response);
            
            // Apply to content
            document.getElementById('editor').innerHTML = lastPrompt.response;
            inlineAssist.hidePopup();
        }
    }
}
```

### Clear Prompts Collection

```typescript
// Clear all prompts
inlineAssist.prompts = [];

// Or reset to initial state
inlineAssist.prompts = [
    { prompt: '', response: '' }
];
```

---

## Popup Dimensions

### Setting Popup Width

Use the `popupWidth` property to set the width of the popup. Default is `'400px'`.

```typescript
let inlineAssist = new InlineAIAssist({
    popupWidth: '650px',
    relateTo: '#btn',
    promptRequest: handlePrompt
});
```

**Accepted values:**
- String with CSS units: `'500px'`, `'80%'`, `'30em'`, `'50vw'`
- Number (treated as pixels): `600`

### Setting Popup Height

Use the `popupHeight` property to set the height of the popup. Default is `'auto'`.

```typescript
let inlineAssist = new InlineAIAssist({
    popupHeight: '350px',
    relateTo: '#btn',
    promptRequest: handlePrompt
});
```

### Responsive Dimensions

```typescript
function getPopupDimensions() {
    const isMobile = window.innerWidth < 768;
    return {
        width: isMobile ? '95%' : '500px',
        height: isMobile ? '400px' : 'auto'
    };
}

let dimensions = getPopupDimensions();
let inlineAssist = new InlineAIAssist({
    popupWidth: dimensions.width,
    popupHeight: dimensions.height,
    relateTo: '#btn',
    promptRequest: handlePrompt
});

// Update on resize
window.addEventListener('resize', () => {
    let newDimensions = getPopupDimensions();
    inlineAssist.popupWidth = newDimensions.width;
    inlineAssist.popupHeight = newDimensions.height;
});
```

---

## Z-Index Configuration

Use the `zIndex` property to control the stacking order of the popup. Default is `1000`.

```typescript
let inlineAssist = new InlineAIAssist({
    zIndex: 4000,
    relateTo: '#btn',
    promptRequest: handlePrompt
});
```

### Use Case: Modal Dialogs

When using Inline AI Assist inside modal dialogs, ensure z-index is higher than the modal.

```typescript
// Modal has z-index 2000
let inlineAssist = new InlineAIAssist({
    zIndex: 2100,  // Higher than modal
    relateTo: '#modalButton',
    promptRequest: handlePrompt
});
```

### Use Case: Multiple Popups

```typescript
// Primary AI assist
let primaryAssist = new InlineAIAssist({
    zIndex: 1000,
    relateTo: '#primaryBtn'
});

// Secondary AI assist (should appear on top)
let secondaryAssist = new InlineAIAssist({
    zIndex: 1100,
    relateTo: '#secondaryBtn'
});
```

---

## Target Container

Use the `target` property to specify where the Inline AI Assist popup should be appended in the DOM. By default, the popup is appended to `document.body`.

### Basic Usage

```typescript
let inlineAssist = new InlineAIAssist({
    relateTo: '#aiBtn',
    target: '.editor-container',  // CSS selector
    promptRequest: handlePrompt
});

inlineAssist.appendTo('#inlineAssist');
```

### Use Case: Modal or Dialog

When using Inline AI Assist inside a modal or dialog, append the popup to the modal container to ensure proper positioning and z-index handling.

```typescript
// Modal dialog with its own container
let inlineAssist = new InlineAIAssist({
    relateTo: '#modalAiBtn',
    target: '#modalContainer',  // Append to modal instead of body
    zIndex: 2100,  // Higher than modal backdrop
    promptRequest: handlePrompt
});
```

### Use Case: Portal or Shadow DOM

For applications using portals or shadow DOM, specify the target container explicitly.

```typescript
// React portal or custom container
const portalContainer = document.getElementById('portal-root');

let inlineAssist = new InlineAIAssist({
    relateTo: '#aiBtn',
    target: portalContainer,  // HTMLElement reference
    promptRequest: handlePrompt
});
```

### HTMLElement Reference

```typescript
// Use HTMLElement instead of selector
const customContainer = document.querySelector('.custom-layout-area');

let inlineAssist = new InlineAIAssist({
    relateTo: '#aiBtn',
    target: customContainer,  // Direct element reference
    promptRequest: handlePrompt
});
```

---

## CSS Class Customization

Use the `cssClass` property to apply custom CSS classes to the root element.

```typescript
let inlineAssist = new InlineAIAssist({
    cssClass: 'custom-container dark-theme',
    relateTo: '#btn',
    promptRequest: handlePrompt
});
```

### Custom Styling Example

```css
.e-inlineaiassist.custom-container {
    border-color: #0078d4;
    background-color: #f9f9f9;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    border-radius: 8px;
}

.e-inlineaiassist.custom-container .e-footer .e-toolbar {
    background: #e8e8e8;
}

.e-inlineaiassist.dark-theme {
    background-color: #1e1e1e;
    color: #ffffff;
}

.e-inlineaiassist.dark-theme .e-footer .e-toolbar {
    background: #2d2d2d;
}
```

### Multiple CSS Classes

```typescript
let inlineAssist = new InlineAIAssist({
    cssClass: 'ai-popup rounded-corners shadow-lg',
    relateTo: '#btn',
    promptRequest: handlePrompt
});
```

---

## Enable Streaming Responses

Use the `enableStreaming` property to enable real-time streaming of AI responses. Default is `false`.

```typescript
let inlineAssist = new InlineAIAssist({
    enableStreaming: true,
    relateTo: '#streamBtn',
    promptRequest: async (args) => {
        // Stream response from AI service
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer YOUR_API_KEY'
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: args.prompt }],
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
            fullResponse += chunk;
            
            // Add each chunk to display streaming effect
            inlineAssist.addResponse(fullResponse);
        }
    }
});
```

### Streaming vs Non-Streaming

**Non-Streaming (Default):**
```typescript
let inlineAssist = new InlineAIAssist({
    enableStreaming: false,  // Response appears all at once
    promptRequest: (args) => {
        getAIResponse(args.prompt).then(response => {
            inlineAssist.addResponse(response);  // Complete response
        });
    }
});
```

**Streaming:**
```typescript
let inlineAssist = new InlineAIAssist({
    enableStreaming: true,  // Response appears word-by-word
    promptRequest: (args) => {
        streamAIResponse(args.prompt, (chunk) => {
            inlineAssist.addResponse(chunk);  // Partial response
        });
    }
});
```

---

## Response Display Mode

Use the `responseMode` property to control how AI-generated responses are displayed. Choose between displaying responses in a popup above the prompt or inserting them inline at the cursor position.

### Available Modes

**ResponseMode.Popup (Default):** Shows the AI response in a popup container above the prompt input area. This mode allows users to review, accept, or discard the response before inserting it.

**ResponseMode.Inline:** Inserts the AI response directly at the caret position in the target editor without showing a popup. Best for seamless inline editing workflows.

### Popup Mode (Default)

```typescript
import { InlineAIAssist, ResponseMode } from '@syncfusion/ej2-interactive-chat';

let inlineAssist = new InlineAIAssist({
    relateTo: '#improveBtn',
    responseMode: ResponseMode.Popup,  // Default mode - shows response in popup
    promptRequest: async (args) => {
        const response = await getAIResponse(args.prompt);
        inlineAssist.addResponse(response);
        // Response appears in popup with Accept/Discard buttons
    },
    responseSettings: {
        itemSelect: (args) => {
            if (args.command.label === 'Accept') {
                // User clicks Accept - insert response into editor
                insertIntoEditor(args.command.response);
            }
        }
    }
});

inlineAssist.appendTo('#inlineAssist');
```

### Inline Mode

```typescript
import { InlineAIAssist, ResponseMode } from '@syncfusion/ej2-interactive-chat';

let inlineAssist = new InlineAIAssist({
    relateTo: '#rewriteBtn',
    responseMode: ResponseMode.Inline,  // Inline mode - inserts at caret
    promptRequest: async (args) => {
        const response = await getAIResponse(args.prompt);
        inlineAssist.addResponse(response);
        // Response is automatically inserted at cursor position
    }
});

inlineAssist.appendTo('#inlineAssist');

// Get cursor position from your editor
function insertIntoEditor(text) {
    const editor = document.getElementById('editor');
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    range.deleteContents();
    range.insertNode(document.createTextNode(text));
}
```

### When to Use Each Mode

**Use Popup Mode (ResponseMode.Popup) when:**
- Users need to review AI responses before accepting
- You want to provide Accept/Discard/Regenerate actions
- Multiple response options should be shown
- Users may want to edit the response before insertion
- Working with longer-form content generation

**Use Inline Mode (ResponseMode.Inline) when:**
- Implementing quick inline improvements (grammar, tone)
- Building autocomplete or suggestion features
- Users expect immediate text insertion
- Working with short text replacements
- Minimizing UI interruption is important

### Switching Modes Dynamically

```typescript
let inlineAssist = new InlineAIAssist({
    relateTo: '#aiBtn',
    responseMode: ResponseMode.Popup,  // Start with popup mode
    promptRequest: handlePrompt
});

// Switch to inline mode for quick fixes
document.getElementById('quickFixBtn').addEventListener('click', () => {
    inlineAssist.responseMode = ResponseMode.Inline;
    inlineAssist.dataBind();
    inlineAssist.executePrompt('Fix grammar');
});

// Switch back to popup mode for longer content
document.getElementById('generateBtn').addEventListener('click', () => {
    inlineAssist.responseMode = ResponseMode.Popup;
    inlineAssist.dataBind();
    inlineAssist.executePrompt('Generate a summary');
});
```

---

## Enable Persistence

Use the `enablePersistence` property to persist the component's state across page reloads.

```typescript
let inlineAssist = new InlineAIAssist({
    enablePersistence: true,
    relateTo: '#btn',
    promptRequest: handlePrompt
});
```

**Persisted properties:**
- `prompts` collection
- Popup state (open/closed)
- Last prompt text

---

## Enable RTL (Right-to-Left)

Use the `enableRtl` property to enable right-to-left layout for languages like Arabic or Hebrew.

```typescript
let inlineAssist = new InlineAIAssist({
    enableRtl: true,
    locale: 'ar-AE',  // Arabic locale
    relateTo: '#btn',
    promptRequest: handlePrompt
});
```

---

## Complete Configuration Example

```typescript
import { InlineAIAssist, InlinePromptRequestEventArgs } from '@syncfusion/ej2-interactive-chat';

let inlineAssist = new InlineAIAssist({
    // Core configuration
    relateTo: '#improveBtn',
    prompt: '',
    placeholder: 'Ask AI to help...',
    
    // Dimensions
    popupWidth: '550px',
    popupHeight: '400px',
    zIndex: 2000,
    
    // Styling
    cssClass: 'custom-ai-popup',
    
    // Behavior
    enableStreaming: false,
    enablePersistence: true,
    enableRtl: false,
    
    // Prompts collection
    prompts: [],
    
    // Event handlers
    promptRequest: (args: InlinePromptRequestEventArgs) => {
        // Handle AI request
        callAIService(args.prompt).then(response => {
            inlineAssist.addResponse(response);
        });
    },
    
    responseSettings: {
        itemSelect: (args) => {
            if (args.command.label === 'Accept') {
                applyResponse(inlineAssist.prompts[inlineAssist.prompts.length - 1].response);
                inlineAssist.hidePopup();
            } else if (args.command.label === 'Discard') {
                inlineAssist.hidePopup();
            }
        }
    }
});

inlineAssist.appendTo('#inlineAssist');

// Show popup on button click
document.getElementById('improveBtn').addEventListener('click', () => {
    inlineAssist.showPopup();
});
```

---

## Common Configuration Patterns

### Pattern 1: Compact Popup

```typescript
let compactAssist = new InlineAIAssist({
    popupWidth: '350px',
    popupHeight: '250px',
    placeholder: 'Quick AI help...',
    relateTo: '#compactBtn'
});
```

### Pattern 2: Full-Featured Popup

```typescript
let fullAssist = new InlineAIAssist({
    popupWidth: '700px',
    popupHeight: '500px',
    enableStreaming: true,
    cssClass: 'full-featured-ai',
    relateTo: '#fullBtn'
});
```

### Pattern 3: Mobile-Optimized

```typescript
let mobileAssist = new InlineAIAssist({
    popupWidth: '95%',
    popupHeight: '80vh',
    cssClass: 'mobile-ai-popup',
    relateTo: '#mobileBtn'
});
```
