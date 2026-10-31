# Methods

This guide covers the public methods available in the Inline AI Assist component for programmatic control.

## addResponse()

Add an AI-generated response to the Inline AI Assist popup.

### Syntax

```typescript
inlineAssist.addResponse(response: string, isComplete?: boolean): void
```

### Parameters

- **response** (string): The response text to add (supports HTML/markdown)
- **isComplete** (boolean, optional): Whether the response is complete (used for streaming)

### Basic Usage

```typescript
import { InlineAIAssist } from '@syncfusion/ej2-interactive-chat';

let inlineAssist = new InlineAIAssist({
    relateTo: '#aiBtn',
    promptRequest: () => {
        // Add response after AI processing
        setTimeout(() => {
            inlineAssist.addResponse('This is the AI-generated response.');
        }, 1000);
    }
});

inlineAssist.appendTo('#inlineAssist');
```

### Streaming Responses

```typescript
promptRequest: async (args) => {
    let fullResponse = '';
    const chunks = await getStreamingResponse(args.prompt);
    
    for (const chunk of chunks) {
        fullResponse += chunk;
        const isLastChunk = chunk === chunks[chunks.length - 1];
        inlineAssist.addResponse(fullResponse, isLastChunk);
    }
}
```

### HTML/Markdown Responses

```typescript
// HTML response
inlineAssist.addResponse('<div><h3>Summary</h3><p>Content here...</p></div>');

// Markdown converted to HTML
import marked from 'marked';
const htmlResponse = marked.parse(markdownText);
inlineAssist.addResponse(htmlResponse);
```

---

## showPopup()

Display the Inline AI Assist popup positioned relative to the `relateTo` element.

### Syntax

```typescript
inlineAssist.showPopup(): void
```

### Basic Usage

```typescript
let inlineAssist = new InlineAIAssist({
    relateTo: '#improveBtn',
    promptRequest: handlePrompt
});

inlineAssist.appendTo('#inlineAssist');

// Show popup on button click
document.getElementById('improveBtn').addEventListener('click', () => {
    inlineAssist.showPopup();
});
```

### Show Popup Programmatically

```typescript
// Show after certain conditions
if (userHasSelection()) {
    inlineAssist.showPopup();
}

// Show with pre-filled prompt
inlineAssist.prompt = 'Improve this text';
inlineAssist.showPopup();
```

### Show on Keyboard Shortcut

```typescript
document.addEventListener('keydown', (e) => {
    // Ctrl+Alt+A to show AI assist
    if (e.ctrlKey && e.altKey && e.key === 'a') {
        e.preventDefault();
        inlineAssist.showPopup();
    }
});
```

---

## hidePopup()

Close the Inline AI Assist popup.

### Syntax

```typescript
inlineAssist.hidePopup(): void
```

### Basic Usage

```typescript
// Hide popup after accepting response
responseSettings: {
    itemSelect: (args) => {
        if (args.command.label === 'Accept') {
            applyResponse();
            inlineAssist.hidePopup();
        } else if (args.command.label === 'Discard') {
            inlineAssist.hidePopup();
        }
    }
}
```

### Hide Programmatically

```typescript
// Hide after timeout
setTimeout(() => {
    inlineAssist.hidePopup();
}, 5000);

// Hide on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        inlineAssist.hidePopup();
    }
});
```

---

## showCommandPopup()

Open the command popup below the prompt input area to display available AI commands and suggestions.

### Syntax

```typescript
inlineAssist.showCommandPopup(): void
```

### Basic Usage

```typescript
let inlineAssist = new InlineAIAssist({
    relateTo: '#aiBtn',
    commandSettings: {
        commands: [
            { id: '1', label: 'Summarize', prompt: 'Summarize this text' },
            { id: '2', label: 'Improve', prompt: 'Improve the writing' },
            { id: '3', label: 'Translate', prompt: 'Translate to Spanish' }
        ]
    },
    promptRequest: handlePrompt
});

inlineAssist.appendTo('#inlineAssist');

// Show command popup programmatically
document.getElementById('showCommandsBtn').addEventListener('click', () => {
    inlineAssist.showCommandPopup();
});
```

### Show Commands on Focus

```typescript
let inlineAssist = new InlineAIAssist({
    relateTo: '#aiBtn',
    commandSettings: {
        commands: [
            { id: '1', label: 'Fix Grammar', prompt: 'Fix grammar mistakes' },
            { id: '2', label: 'Make Professional', prompt: 'Make this sound professional' },
            { id: '3', label: 'Simplify', prompt: 'Simplify this text' }
        ]
    },
    open: () => {
        // Automatically show commands when popup opens
        setTimeout(() => {
            inlineAssist.showCommandPopup();
        }, 300);
    }
});
```

### Show Commands on Keyboard Shortcut

```typescript
document.addEventListener('keydown', (e) => {
    // Ctrl+K to show command popup
    if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        inlineAssist.showPopup();
        
        // Show commands after popup is visible
        setTimeout(() => {
            inlineAssist.showCommandPopup();
        }, 100);
    }
});
```

### Context-Aware Command Display

```typescript
function showContextCommands() {
    const selectedText = getSelectedText();
    
    if (selectedText.length > 500) {
        // Show summarize command for long text
        inlineAssist.commandSettings.commands = [
            { id: '1', label: 'Summarize', prompt: 'Summarize this long text' },
            { id: '2', label: 'Key Points', prompt: 'Extract key points' }
        ];
    } else if (selectedText.length > 0) {
        // Show improvement commands for short text
        inlineAssist.commandSettings.commands = [
            { id: '1', label: 'Improve', prompt: 'Improve this text' },
            { id: '2', label: 'Expand', prompt: 'Expand on this idea' }
        ];
    }
    
    inlineAssist.dataBind();
    inlineAssist.showPopup();
    inlineAssist.showCommandPopup();
}

document.getElementById('smartCommandsBtn').addEventListener('click', showContextCommands);
```

---

## hideCommandPopup()

Close the command popup without selecting a command.

### Syntax

```typescript
inlineAssist.hideCommandPopup(): void
```

### Basic Usage

```typescript
// Hide command popup programmatically
document.getElementById('closeCommandsBtn').addEventListener('click', () => {
    inlineAssist.hideCommandPopup();
});
```

### Hide on Escape Key

```typescript
let inlineAssist = new InlineAIAssist({
    relateTo: '#aiBtn',
    commandSettings: {
        commands: [
            { id: '1', label: 'Improve', prompt: 'Improve writing' }
        ]
    },
    created: () => {
        // Add escape key handler for command popup
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                inlineAssist.hideCommandPopup();
            }
        });
    }
});
```

### Auto-Hide After Selection

```typescript
let inlineAssist = new InlineAIAssist({
    relateTo: '#aiBtn',
    commandSettings: {
        commands: [
            { id: '1', label: 'Summarize', prompt: 'Summarize' },
            { id: '2', label: 'Translate', prompt: 'Translate' }
        ],
        itemSelect: (args) => {
            // Execute the command
            inlineAssist.executePrompt(args.command.prompt);
            
            // Hide command popup after selection
            inlineAssist.hideCommandPopup();
        }
    }
});
```

### Toggle Command Popup

```typescript
let commandPopupVisible = false;

document.getElementById('toggleCommandsBtn').addEventListener('click', () => {
    if (commandPopupVisible) {
        inlineAssist.hideCommandPopup();
        commandPopupVisible = false;
    } else {
        inlineAssist.showCommandPopup();
        commandPopupVisible = true;
    }
});
```

---

## executePrompt()

Trigger a prompt request programmatically without user clicking send button.

### Syntax

```typescript
inlineAssist.executePrompt(prompt: string | HTMLTextAreaElement): void
```

### Parameters

- **prompt**: String prompt text OR HTMLTextAreaElement containing the prompt

### Execute with String

```typescript
// Execute with direct string
inlineAssist.executePrompt('Summarize this content');

// Execute command programmatically
document.getElementById('summarizeBtn').addEventListener('click', () => {
    const selectedText = getSelectedText();
    inlineAssist.executePrompt(`Summarize: ${selectedText}`);
});
```

### Execute with Textarea Element

```typescript
// When using custom editor template
function customEditorTemplate() {
    return `
        <div class="custom-editor">
            <textarea id="customPrompt" placeholder="Type prompt..."></textarea>
            <button id="sendBtn" class="e-btn e-primary">Send</button>
        </div>
    `;
}

let inlineAssist = new InlineAIAssist({
    editorTemplate: customEditorTemplate,
    created: () => {
        document.getElementById('sendBtn').addEventListener('click', () => {
            const textarea = document.getElementById('customPrompt') as HTMLTextAreaElement;
            inlineAssist.executePrompt(textarea);  // Pass textarea element
            textarea.value = '';  // Clear after sending
        });
    }
});
```

### Execute with Validation

```typescript
function executeWithValidation(promptText: string) {
    // Validate before executing
    if (!promptText || promptText.trim() === '') {
        alert('Please enter a prompt');
        return;
    }
    
    if (promptText.length > 500) {
        alert('Prompt too long (max 500 characters)');
        return;
    }
    
    inlineAssist.executePrompt(promptText);
}
```

---

## destroy()

Destroy the Inline AI Assist component and clean up resources.

### Syntax

```typescript
inlineAssist.destroy(): void
```

### Basic Usage

```typescript
// Destroy when no longer needed
inlineAssist.destroy();
```

### Destroy and Recreate

```typescript
// Clean up existing instance
if (inlineAssist) {
    inlineAssist.destroy();
}

// Create new instance
inlineAssist = new InlineAIAssist({
    relateTo: '#newBtn',
    promptRequest: handlePrompt
});

inlineAssist.appendTo('#inlineAssist');
```

### Destroy on Page Unload

```typescript
window.addEventListener('beforeunload', () => {
    if (inlineAssist) {
        inlineAssist.destroy();
    }
});
```

---

## Method Chaining Patterns

### Pattern 1: Show with Pre-filled Prompt

```typescript
// Set prompt and show
inlineAssist.prompt = 'Translate to Spanish';
inlineAssist.showPopup();
```

### Pattern 2: Execute and Track

```typescript
function executeAndTrack(prompt: string) {
    console.log('Executing prompt:', prompt);
    inlineAssist.executePrompt(prompt);
    
    // Log to analytics
    trackAIUsage({ prompt, timestamp: Date.now() });
}
```

### Pattern 3: Conditional Execute

```typescript
function smartExecute(text: string, action: string) {
    let prompt = '';
    
    switch (action) {
        case 'summarize':
            if (text.length > 500) {
                prompt = `Summarize this long text: ${text}`;
            } else {
                alert('Text is too short to summarize');
                return;
            }
            break;
            
        case 'translate':
            prompt = `Translate to Spanish: ${text}`;
            break;
            
        case 'improve':
            prompt = `Improve the writing: ${text}`;
            break;
    }
    
    if (prompt) {
        inlineAssist.showPopup();
        inlineAssist.executePrompt(prompt);
    }
}
```

---

## Complete Methods Example

```typescript
import { InlineAIAssist } from '@syncfusion/ej2-interactive-chat';

let inlineAssist = new InlineAIAssist({
    relateTo: '#aiBtn',
    promptRequest: async (args) => {
        try {
            const response = await callAIService(args.prompt);
            inlineAssist.addResponse(response);
        } catch (error) {
            inlineAssist.addResponse('Error: ' + error.message);
        }
    },
    responseSettings: {
        itemSelect: (args) => {
            if (args.command.label === 'Accept') {
                const lastResponse = inlineAssist.prompts[inlineAssist.prompts.length - 1].response;
                document.getElementById('editor').innerHTML = lastResponse;
                inlineAssist.hidePopup();
            } else if (args.command.label === 'Discard') {
                inlineAssist.hidePopup();
            }
        }
    }
});

inlineAssist.appendTo('#inlineAssist');

// Method: showPopup()
document.getElementById('aiBtn').addEventListener('click', () => {
    inlineAssist.showPopup();
});

// Method: executePrompt()
document.getElementById('summarizeBtn').addEventListener('click', () => {
    const selectedText = getSelectedText();
    inlineAssist.executePrompt(`Summarize: ${selectedText}`);
});

// Method: hidePopup() on Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        inlineAssist.hidePopup();
    }
});

// Method: destroy() on cleanup
window.addEventListener('beforeunload', () => {
    if (inlineAssist) {
        inlineAssist.destroy();
    }
});

// Helper function
function getSelectedText(): string {
    return window.getSelection()?.toString() || '';
}

async function callAIService(prompt: string): Promise<string> {
    // Your AI service integration
    const response = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
    });
    const data = await response.json();
    return data.response;
}
```

---

## Method Reference Summary

| Method | Parameters | Returns | Description |
|--------|-----------|---------|-------------|
| `addResponse()` | response: string, isComplete?: boolean | void | Add AI response to popup |
| `showPopup()` | none | void | Display the popup |
| `hidePopup()` | none | void | Close the popup |
| `showCommandPopup()` | none | void | Open command popup |
| `hideCommandPopup()` | none | void | Close command popup |
| `executePrompt()` | prompt: string \| HTMLTextAreaElement | void | Trigger prompt request |
| `destroy()` | none | void | Destroy component |

---

## Standard Framework Methods

The Inline AI Assist component inherits common methods from the Syncfusion base component. These methods are available but typically used less frequently in everyday development.

### Common Framework Methods

| Method | Signature | Description | Usage Frequency |
|--------|-----------|-------------|-----------------|
| `appendTo()` | (selector?: string \| HTMLElement) => void | Appends the component to the specified element | Always (Required) |
| `addEventListener()` | (eventName: string, handler: Function) => void | Adds an event listener to the component | Common |
| `removeEventListener()` | (eventName: string, handler: Function) => void | Removes an event listener from the component | Occasional |
| `dataBind()` | () => void | Applies pending property changes immediately | Common |
| `refresh()` | () => void | Re-renders the component with current properties | Occasional |
| `getRootElement()` | () => HTMLElement | Returns the root HTML element of the component | Rare |
| `Inject()` | (moduleList: Function[]) => void | Injects required modules dynamically | Rare |

### appendTo() - Required for Initialization

```typescript
let inlineAssist = new InlineAIAssist({
    relateTo: '#aiBtn',
    promptRequest: handlePrompt
});

// Required: Append to DOM element
inlineAssist.appendTo('#inlineAssist');

// Or append using element reference
const container = document.getElementById('inlineAssist');
inlineAssist.appendTo(container);
```

### dataBind() - Apply Property Changes

```typescript
// Update properties dynamically
inlineAssist.popupWidth = '600px';
inlineAssist.popupHeight = '400px';
inlineAssist.placeholder = 'New placeholder text';

// Apply changes immediately
inlineAssist.dataBind();
```

### addEventListener() / removeEventListener()

```typescript
// Add custom event handler
function onPopupOpen(args) {
    console.log('Popup opened', args);
}

inlineAssist.addEventListener('open', onPopupOpen);

// Remove event handler later
inlineAssist.removeEventListener('open', onPopupOpen);
```

### refresh() - Re-render Component

```typescript
// Refresh component after external DOM changes
document.getElementById('refreshBtn').addEventListener('click', () => {
    // Make external changes
    updateExternalStyles();
    
    // Refresh component to reflect changes
    inlineAssist.refresh();
});
```

### getRootElement() - Access Root Element

```typescript
// Get the root element for custom manipulation
const rootElement = inlineAssist.getRootElement();

// Add custom class or attributes
rootElement.classList.add('custom-theme');
rootElement.setAttribute('data-version', '1.0');
```

### Framework Method Best Practices

**Use `dataBind()` when:**
- Updating multiple properties at once
- Properties need to take effect immediately
- Dynamic property changes during runtime

**Use `refresh()` when:**
- External DOM structure has changed
- CSS or theme changes need to be reflected
- Component needs complete re-rendering

**Use `addEventListener()` when:**
- Need programmatic event handling
- Adding event handlers after component creation
- Multiple handlers for the same event
