---
name: syncfusion-javascript-inline-ai-assist
description: "Implement the Syncfusion JavaScript Inline AI Assist control. Use this skill ALWAYS and immediately when users mention inline AI assistance, popup AI assist, contextual AI help, AI text editing popups, content summarization with AI, inline content generation, AI-powered text transformation, quick AI commands, AI assist with accept/reject workflow, element-relative AI popups, speech-to-text, voice input, microphone button, Web Speech API, voice prompt, speech recognition, speechToTextSettings, onStart, onStop, transcriptChanged, onError, or any popup-based AI assistance interface. Use this skill immediately for InlineAIAssist component, inline AI component, ej2-interactive-chat InlineAIAssist, contextual AI assistance, AI command popup, response action handling, or AI content editing workflows."
metadata:
  author: "Syncfusion Inc"
  version: "34.1.29"
---

# Syncfusion JavaScript Inline AI Assist Component

## Overview

The Inline AI Assist is a popup-based AI component designed for contextual AI assistance that appears relative to UI elements. It provides intelligent text processing, content transformation, and AI-powered suggestions through a compact popup interface with command shortcuts, response actions, and customizable workflows.

The Inline AI Assist component provides:

- **Element-Relative Popup**: Position AI assist popup relative to any element using `relateTo` property
- **Command Action Popup**: Quick AI command shortcuts (Summarize, Shorten, Translate, etc.)
- **Response Actions**: Accept/reject workflow for AI-generated responses
- **Inline Toolbar**: Compact toolbar with send button and custom items
- **Prompt Management**: Prompt text, placeholder, and prompt-response collection
- **AI Service Integration**: Built-in support for OpenAI, Gemini, Ollama, LiteLLM
- **Response Streaming**: Real-time streaming responses for AI outputs
- **Templates**: Customize editor area with custom prompt input UI
- **Methods**: Show/hide popup, add responses, execute prompts programmatically
- **Events**: created, open, close, promptRequest for lifecycle management
- **Speech-to-Text**: Built-in voice input via the browser's Web Speech API, configured through `speechToTextSettings` (`enable`, `lang`, `allowInterimResults`, `buttonSettings`, `tooltipSettings`) and lifecycle events (`onStart`, `onStop`, `transcriptChanged`, `onError`); recognized speech is fed back into the `promptRequest` event
- **Globalization**: RTL support and localization for international apps

---

## Documentation and Navigation Guide

### Getting Started
📄 **Read:** [references/getting-started.md](references/getting-started.md)
- Package installation and dependencies (`@syncfusion/ej2-interactive-chat`)
- CSS imports and theme configuration
- Basic Inline AI Assist initialization
- `relateTo` property for element targeting
- First render with prompt handling
- `promptRequest` event basics
- Width, height, z-index configuration

### Inline Assist Configuration
📄 **Read:** [references/inline-assist-configuration.md](references/inline-assist-configuration.md)
- Setting prompt text (`prompt` property)
- Prompt placeholder (`placeholder` property)
- Prompt-response collection (`prompts` property)
- Popup dimensions (`popupWidth`, `popupHeight`)
- Z-index configuration (`zIndex`)
- Target container (`target` property for custom DOM append)
- CSS class customization (`cssClass`)
- Enable streaming responses (`enableStreaming`)
- Response display mode (`responseMode`: Popup/Inline modes)
- Enable persistence, RTL support

### Command Settings (Quick Actions)
📄 **Read:** [references/command-settings.md](references/command-settings.md)
- Command items overview (quick action popup)
- Configure command items array (`commandSettings.commands`)
- Command properties (id, label, prompt, iconCss, disabled)
- Group commands (`groupBy`)
- Tooltip configuration
- Command popup dimensions (`popupWidth`, `popupHeight`)
- `itemSelect` event for command actions

### Inline Toolbar Settings
📄 **Read:** [references/inline-toolbar-settings.md](references/inline-toolbar-settings.md)
- Built-in toolbar items (send button)
- Custom toolbar items configuration
- Toolbar item properties (id, iconCss, align, template, disabled)
- Toolbar positioning (`toolbarPosition`: Inline/Bottom)
- `itemClick` event for toolbar actions
- Disabling/hiding toolbar items

### Response Settings (Accept/Reject Actions)
📄 **Read:** [references/response-settings.md](references/response-settings.md)
- Built-in response items (accept/reject)
- Custom response action items
- Response item properties (id, label, iconCss)
- `itemSelect` event for response actions
- Accept/reject handling patterns
- Customizing response popup appearance

### AI Service Integrations
📄 **Read:** [references/ai-service-integrations.md](references/ai-service-integrations.md)
- `promptRequest` event detailed guide
- OpenAI and Azure OpenAI integration patterns
- Google Gemini integration
- Ollama LLM local model integration
- LiteLLM proxy service integration
- Response formatting and error handling
- Streaming vs standard response patterns

### Templates
📄 **Read:** [references/templates.md](references/templates.md)
- Editor template (`editorTemplate`) - Custom prompt input UI
- Response template (`responseTemplate`) - Custom AI response rendering
- Custom footer/prompt area design
- Template context and data binding
- `executePrompt()` method with custom UI
- Syntax highlighting and markdown rendering in responses
- Template rendering patterns

### Methods
📄 **Read:** [references/methods.md](references/methods.md)
- `addResponse()` - Add AI response to popup
- `showPopup()` - Display the AI assist popup
- `hidePopup()` - Close the popup
- `showCommandPopup()` - Open command popup programmatically
- `hideCommandPopup()` - Close command popup
- `executePrompt()` - Trigger prompt programmatically
- `destroy()` - Component cleanup
- Standard framework methods (appendTo, dataBind, refresh, etc.)

### Events and Globalization
📄 **Read:** [references/events-and-globalization.md](references/events-and-globalization.md)
- `created` event - Component initialization complete
- `open` event - Popup opened
- `close` event - Popup closed
- `promptRequest` event - Handle AI prompt requests
- Localization (L10n) for UI text
- RTL support (`enableRtl`)
- Locale configuration

### Speech to Text
📄 **Read:** [references/speech-to-text.md](references/speech-to-text.md)
- Enabling voice input via `speechToTextSettings.enable` (uses the browser's Web Speech API)
- Configuring the speech recognition language with `speechToTextSettings.lang` (e.g. `en-US`, `es-ES`, `fr-FR`)
- Customizing the microphone button with `speechToTextSettings.buttonSettings` (`content`, `stopContent`, `iconCss`, `stopIconCss`)
- Real-time interim transcription with `speechToTextSettings.allowInterimResults`
- Tooltip customization for the microphone button with `speechToTextSettings.tooltipSettings` (`content`, `stopContent`, `position`)
- Speech-to-text lifecycle events: `onStart`, `onStop`, `transcriptChanged`, `onError`
- Microphone permissions, browser compatibility (Speech Recognition API), and feature detection

---

## Quick Start Example

### Basic Inline AI Assist with Summarize Button

```typescript
import { InlineAIAssist } from '@syncfusion/ej2-interactive-chat';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

// Initialize Inline AI Assist
let inlineAssist: InlineAIAssist = new InlineAIAssist({
    relateTo: '#summarizeBtn',
    placeholder: 'Ask AI to help...',
    promptRequest: (args) => {
        // Connect to your AI service
        setTimeout(() => {
            let response = 'AI-generated summary of the content...';
            inlineAssist.addResponse(response);
        }, 1000);
    },
    responseSettings: {
        itemSelect: (args) => {
            if (args.command.label === 'Accept') {
                // Apply the AI response to your content
                document.getElementById('content').innerHTML = args.response;
                inlineAssist.hidePopup();
            } else if (args.command.label === 'Discard') {
                // Reject the response
                inlineAssist.hidePopup();
            }
        }
    }
});

inlineAssist.appendTo('#inlineAssist');

// Show popup on button click
document.getElementById('summarizeBtn').addEventListener('click', () => {
    inlineAssist.showPopup();
});
```

```html
<button id="summarizeBtn" class="e-btn e-primary">Summarize</button>
<div id="content" contenteditable="true">
    Your content here...
</div>
<div id="inlineAssist"></div>
```

---

## Common Patterns

### Pattern 1: Quick Command Actions

```typescript
let inlineAssist: InlineAIAssist = new InlineAIAssist({
    relateTo: '#improveBtn',
    commandSettings: {
        commands: [
            { label: 'Summarize', prompt: 'Summarize this content', iconCss: 'e-icons e-collapse-2' },
            { label: 'Shorten', prompt: 'Make this shorter', iconCss: 'e-icons e-shorten' },
            { label: 'Translate', prompt: 'Translate to Spanish', iconCss: 'e-icons e-translate' },
            { label: 'Make Professional', prompt: 'Rewrite professionally', iconCss: 'e-icons e-elaborate' }
        ]
    },
    promptRequest: (args) => {
        // Handle different commands
        callAIService(args.prompt);
    }
});
```

### Pattern 2: Accept/Reject Workflow

```typescript
let inlineAssist: InlineAIAssist = new InlineAIAssist({
    relateTo: '#editor',
    promptRequest: (args) => {
        // Get AI response
        getAIResponse(args.prompt).then(response => {
            inlineAssist.addResponse(response);
        });
    },
    responseSettings: {
        itemSelect: (args) => {
            if (args.command.label === 'Accept') {
                // Apply changes
                applyChanges(inlineAssist.prompts[inlineAssist.prompts.length - 1].response);
                inlineAssist.hidePopup();
            } else if (args.command.label === 'Discard') {
                // Discard changes
                inlineAssist.hidePopup();
            }
        }
    }
});
```

### Pattern 3: Streaming Responses

```typescript
let inlineAssist: InlineAIAssist = new InlineAIAssist({
    relateTo: '#generateBtn',
    enableStreaming: true,
    promptRequest: (args) => {
        // Stream response from AI service
        streamAIResponse(args.prompt, (chunk) => {
            inlineAssist.addResponse(chunk);
        });
    }
});
```

### Pattern 4: Custom Editor Template

```typescript
let inlineAssist: InlineAIAssist = new InlineAIAssist({
    relateTo: '#customBtn',
    editorTemplate: () => {
        return `
            <div class="custom-editor">
                <textarea id="customPrompt" placeholder="Type your request..."></textarea>
                <button id="sendBtn" class="e-btn">Generate</button>
            </div>
        `;
    }
});

document.addEventListener('click', (e) => {
    if (e.target.id === 'sendBtn') {
        const textarea = document.getElementById('customPrompt');
        inlineAssist.executePrompt(textarea.value);
    }
});
```

### Pattern 5: Voice Input with Speech-to-Text

```typescript
import { InlineAIAssist, InlinePromptRequestEventArgs } from '@syncfusion/ej2-interactive-chat';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

let inlineAIAssist: InlineAIAssist = new InlineAIAssist({
    relateTo: '#summarizeBtn',
    // Enables voice input through the browser's Web Speech API
    speechToTextSettings: {
        enable: true,
        lang: 'en-US',
        allowInterimResults: true,
        buttonSettings: {
            content: 'Start Recording',
            stopContent: 'Stop Recording',
            iconCss: 'e-icons e-microphone',
            stopIconCss: 'e-icons e-microphone-off'
        }
    },
    promptRequest: (args: InlinePromptRequestEventArgs) => {
        // Both typed and voice-recognized input flow through this event
        setTimeout(() => {
            inlineAIAssist.addResponse('For real-time processing, connect the Inline AI Assist component to your preferred AI service.');
        }, 1000);
    }
});

inlineAIAssist.appendTo('#inlineAssist');

const summarizeBtn: HTMLElement = document.querySelector('#summarizeBtn') as HTMLElement;
if (summarizeBtn) {
    summarizeBtn.addEventListener('click', () => {
        inlineAIAssist.dataBind();
        inlineAIAssist.showPopup();
    });
}
```

---

## Key Properties

### Core Configuration
- **relateTo** (string): CSS selector for element to position popup relative to
- **placeholder** (string): Placeholder text for prompt input (default: 'Ask or generate AI content..')
- **prompt** (string): Pre-set prompt text
- **prompts** (InlinePromptModel[]): Collection of prompt-response pairs
- **popupWidth** (string | number): Width of popup (default: '400px')
- **popupHeight** (string | number): Height of popup (default: 'auto')
- **zIndex** (number): Z-index for popup positioning (default: 1000)

### Feature Configuration
- **commandSettings** (CommandSettingsModel): Quick command actions configuration
- **inlineToolbarSettings** (InlineToolbarSettingsModel): Footer toolbar configuration
- **responseSettings** (ResponseSettingsModel): Accept/reject actions configuration
- **editorTemplate** (string | Function): Custom editor area template
- **enableStreaming** (boolean): Enable streaming responses (default: false)
- **speechToTextSettings** (SpeechToTextSettingsModel): Built-in voice input via the browser's Web Speech API; accepts `enable`, `lang`, `allowInterimResults`, `buttonSettings`, `tooltipSettings`, and lifecycle event handlers (`onStart`, `onStop`, `transcriptChanged`, `onError`)

### Styling & Behavior
- **cssClass** (string): Custom CSS classes for root element
- **enableRtl** (boolean): Enable right-to-left mode
- **locale** (string): Locale code for localization (default: 'en-US')
- **enablePersistence** (boolean): Persist state across page reloads

---

## Common Use Cases

### Use Case 1: Content Summarizer
Add a "Summarize" button next to text content that opens AI assist popup for quick summarization with accept/reject workflow.

### Use Case 2: Text Editor Enhancement
Integrate AI-powered text improvement commands (grammar, tone, length) into existing text editors with popup interface.

### Use Case 3: Translation Tool
Provide instant translation popup with language selection commands and response preview before applying.

### Use Case 4: Content Generator
Generate AI content for empty fields with command shortcuts for different content types (formal, casual, technical).

### Use Case 5: Code Assistant
Add AI assistance for code generation, explanation, or optimization with popup positioned relative to code blocks.

---
