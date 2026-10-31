---
name: syncfusion-javascript-ai-assistview
description: "Implement the Syncfusion JavaScript AI AssistView control. Use this skill when users mention AI assistant interfaces, AI chat UI, conversational AI components, prompt-response interfaces, AI integration (OpenAI, Gemini, Ollama, LiteLLM, MCP), chat toolbars, file attachments in chat, speech-to-text, text-to-speech, custom AI views, prompt suggestions, markdown responses, chain of thoughts, thinking blocks, reasoning visualization, AssistThinking, generative UI, dynamic AI-rendered components, interactive tool cards, registerToolUI, telemetry, telemetry metrics, telemetrySettings, TelemetryData, TelemetryReport, TelemetryMetric, AI usage tracking, token usage, duration metrics, tool call metrics, mentions, mention trigger, mentionChar, mention popup, mention data source, mention filtering, mention template, mentionSelect, response animation, responseAnimationTemplate, loading indicator, response template, custom response UI, or implementing any interactive AI assistant interface. Use this skill immediately for AIAssistView, AI chat control, interactive chat, ej2-interactive-chat package, AI conversation UI, or AI assistance components."
metadata:
  author: "Syncfusion Inc"
  version: "34.1.29"
---

# Syncfusion JavaScript AI AssistView Component

## Overview

The AI AssistView is an interactive chat component designed for building AI-powered conversational interfaces with support for prompts, responses, suggestions, custom toolbars, file attachments, speech features, and AI service integrations.

The AI AssistView component provides:

- **Prompt-Response System**: Display conversations with user prompts and AI responses
- **AI Service Integration**: Built-in support for major AI providers (OpenAI, Gemini, Ollama, etc.)
- **Toolbar Customization**: Header, footer, prompt, and response toolbars with custom items
- **File Attachments**: Upload and attach files to prompts
- **Speech Features**: Speech-to-text input and text-to-speech output
- **Custom Views**: Multiple view modes (Assist, Custom) with templates
- **Templates**: Customize banner, prompt items, response items, suggestions, and footer
- **Markdown Support**: Automatic markdown-to-HTML conversion for responses
- **Streaming Responses**: Real-time response streaming for AI outputs
- **Chain of Thoughts**: Collapsible thinking/reasoning blocks with staged, streamable status updates via the `AssistThinking` module
- **Generative UI**: Render interactive tools and dynamic UI (cards, charts, forms, custom components) within AI responses via `blocks` and `registerToolUI`
- **Regenerate Responses**: Request alternative AI responses for an existing prompt via the built-in `e-assist-regenerate` toolbar item, with automatic previous/next navigation between saved responses (`regeneratedResponses`)
- **Telemetry**: Built-in telemetry that tracks AI interaction metrics (`status`, `duration`, `toolCalls`, `streamingChunks`, `model`, `inputTokens`, `outputTokens`, `totalTokens`, `reasoningTokens`, `cachedInputTokens`, plus custom attributes) and renders a per-response toolbar button with a hover tooltip report, fully configurable via `telemetrySettings` (`enable`, `metrics`, `beforeReport`)
- **Mentions**: Insert mention triggers in the prompt editor (e.g. `@` or `/`) backed by a local or remote data source (`DataManager`), with configurable fields, `query`, `filterType` (`Contains`/`StartsWith`/`EndsWith`), match highlighting, popup dimensions, and custom item/display/no-records templates; select an item via the `mentionSelect` event
- **Response Animation**: Custom loading indicator or animation shown while an AI response is being generated, configured via the `responseAnimationTemplate` property (string or function returning HTML), and visible until `addPromptResponse` is called and any `Promise` returned by `promptRequest` resolves
- **Accessibility**: WCAG compliance with keyboard navigation and ARIA support

---

## Documentation and Navigation Guide

### Getting Started
📄 **Read:** [references/getting-started.md](references/getting-started.md)
- Package installation and dependencies (`@syncfusion/ej2-interactive-chat`)
- CSS imports and theme configuration
- Basic AI AssistView initialization
- First render with prompts and responses
- `promptRequest` event handling for AI integration
- Width, height, locale, and persistence configuration

### Assist View Configuration
📄 **Read:** [references/assist-view-configuration.md](references/assist-view-configuration.md)
- Setting prompt text and placeholder (`prompt`, `promptPlaceholder`)
- Prompt and response icon customization (`promptIconCss`, `responseIconCss`)
- Prompt-response collection (`prompts` property with `PromptModel[]`)
- Adding prompt suggestions (`promptSuggestions`, `promptSuggestionsHeader`)
- Show/hide clear button and header (`showClearButton`, `showHeader`)
- Enable scroll to bottom functionality (`enableScrollToBottom`)
- Markdown response rendering with built-in converter
- Response streaming (`enableStreaming`)

### AI Service Integrations
📄 **Read:** [references/ai-integrations.md](references/ai-integrations.md)
- OpenAI and Azure OpenAI integration with API setup
- Google Gemini integration and configuration
- Ollama LLM local model integration
- LiteLLM proxy service integration
- MCP Server integration for Model Context Protocol
- Custom AI service integration patterns
- `promptRequest` event best practices
- Error handling and response formatting

### Chain of Thoughts (Thinking Blocks)
📄 **Read:** [references/chain-of-thoughts.md](references/chain-of-thoughts.md)
- Enabling reasoning visualization via the injectable `AssistThinking` module (`AIAssistView.Inject(AssistThinking)`)
- Response block types: `thinking`, `text`, `tool` blocks within the `blocks` array
- Configuring thinking blocks (`blockType`, `title`, `content`, `isActive`, `collapsed`, `collapsible`, `stages`)
- Adding reasoning stages (`ThinkingStage`) with Timeline-based rendering
- Stage status indicators (`completed`, `inprogress`, `failed`) for streaming reasoning progress
- Inline clickable context badges (`editableContext`, `ThinkingContextItem`) with `{index}` placeholders
- Handling the `editableContextClicked` event
- Custom thinking block rendering (`blockTemplate`) and stage item rendering (`itemTemplate`)

### Generative UI
📄 **Read:** [references/generative-ui.md](references/generative-ui.md)
- Registering custom tools with `registerToolUI({ toolName, template, handler? })`
- Configuring tool templates (string or function) and interactivity handlers
- Adding `tool` blocks (`blockType: 'tool'`, `toolName`, `props`) to responses via `addPromptResponse`
- Mixing `text` and `tool` blocks in a single response
- Configuring an AI service's system prompt to return structured `blocks` JSON for generative UI
- Multi-step generative flows: capturing tool state and triggering follow-up responses with `executePrompt`

### Toolbar Configuration
📄 **Read:** [references/toolbar-configuration.md](references/toolbar-configuration.md)
- Header toolbar configuration (`toolbarSettings`)
- Footer toolbar setup (`footerToolbarSettings`, toolbar positioning: Inline/Bottom)
- Response toolbar items (`responseToolbarSettings`, like/dislike/copy/refresh)
- Prompt toolbar items (`promptToolbarSettings`)
- Custom toolbar items (text, icons, tooltips, alignment, templates)
- Toolbar item click events (`ToolbarItemClickedEventArgs`)
- Built-in toolbar items (send, attachment)
- Regenerating responses via the built-in `e-assist-regenerate` response toolbar item
- Pre-loading alternate responses with `regeneratedResponses` (`PromptModel`) and the automatic previous/next navigation UI

### Custom Views
📄 **Read:** [references/custom-views.md](references/custom-views.md)
- Adding custom views (`views` property with `AssistViewModel[]`)
- View types: Assist vs Custom (`AssistViewType` enum)
- Setting view name and icon (`name`, `iconCss`)
- View templates (`viewTemplate` for custom content)
- Active view management (`activeView` property)
- Switching between views programmatically

### Templates
📄 **Read:** [references/templates.md](references/templates.md)
- Banner template for welcome messages (`bannerTemplate`)
- Prompt item template customization (`promptItemTemplate`)
- Response item template formatting (`responseItemTemplate`)
- Prompt suggestion item template (`promptSuggestionItemTemplate`)
- Footer template for custom input areas (`footerTemplate`)
- Template context and data binding
- Template customization examples

### File Attachments
📄 **Read:** [references/file-attachments.md](references/file-attachments.md)
- Enabling attachments (`enableAttachments`)
- Attachment settings (`attachmentSettings` with allowed types, size limits, max count)
- Upload configuration (saveUrl, removeUrl)
- Attached files in prompts (`PromptModel.attachedFiles`)
- Attachment events (beforeUpload, success, failure, removed)
- File preview and click handling
- Custom attachment templates (attachmentTemplate)

### Speech to Text
📄 **Read:** [references/speech-to-text.md](references/speech-to-text.md)
- Speech-to-text configuration (`speechToTextSettings`)
- Browser speech recognition setup
- Language and locale settings
- Button and tooltip customization
- Interim results and transcript handling
- Microphone permissions and error handling

### Text to Speech
📄 **Read:** [references/text-to-speech.md](references/text-to-speech.md)
- Enabling built-in Text-to-Speech via the `e-assist-audio` response toolbar item
- Speech synthesis configuration (`textToSpeechSettings`)
- Customizing `language`, `speechPitch`, `speechRate`, `volume`, `voice`, and `inputText`
- Reading AI responses aloud using the browser's `SpeechSynthesisUtterance` interface
- Browser compatibility and feature detection

### Appearance Customization
📄 **Read:** [references/appearance.md](references/appearance.md)
- CSS class customization (`cssClass`)
- Width and height configuration
- RTL support (`enableRtl`)
- Theme customization with Syncfusion themes
- Custom styling examples
- Responsive design patterns

### Methods and Events
📄 **Read:** [references/methods-and-events.md](references/methods-and-events.md)
- Methods: `addPromptResponse()` (with optional `TelemetryData` second argument), `executePrompt()`, `scrollToBottom()`, `refresh()`
- Events: `created`, `promptRequest`, `promptChanged`, `stopRespondingClick`
- Attachment events: `beforeAttachmentUpload`, `attachmentUploadSuccess`,`attachmentUploadFailure`, `attachmentRemoving` (pre-removal hook), `attachmentRemoved`, `attachmentClick`
- Event args interfaces and usage patterns
- Method usage examples

### Telemetry
📄 **Read:** [references/telemetry.md](references/telemetry.md)
- Enabling telemetry via `telemetrySettings.enable`
- Built-in per-response telemetry button (showing duration) and hover tooltip report
- Configuring captured metrics with `telemetrySettings.metrics` and the `TelemetryMetric` type (`status`, `duration`, `toolCalls`, `streamingChunks`, `model`, `inputTokens`, `outputTokens`, `totalTokens`, `reasoningTokens`, `cachedInputTokens`); array order sets tooltip display order
- Customizing or suppressing reports via the `telemetrySettings.beforeReport` event with `TelemetryReport`
- Passing AI usage data via the `TelemetryData` parameter of `addPromptResponse` (`model`, `inputTokens`, `outputTokens`, `reasoningTokens`, `cachedInputTokens`, `customAttributes`)
- Surfacing custom attributes (`region`, `tenant`, `sessionId`, `feature`, etc.) as their own rows in the tooltip
- Key behaviors: turn tracking, disabled-state telemetry button, duration formatting, automatic `totalTokens`, metrics filter precedence, regenerate flow

### Mentions
📄 **Read:** [references/mentions.md](references/mentions.md)
- Configuring mention trigger characters (`mentionChar`, e.g. `@` or `/`) via the `mentions` array
- Data sources for mention items: local collections or `DataManager` (local/remote)
- Field mappings (`fields.text`, `fields.value`, `fields.iconCss`) and additional data operations (`query`)
- Filtering and matching: `filterType` (`Contains`/`StartsWith`/`EndsWith`) and `highlight`
- Selected-mention display: `showMentionChar` and `displayTemplate`
- Popup customization: `popupWidth`, `popupHeight`, `itemTemplate`, and `noRecordsTemplate`
- Handling user selection through the `mentionSelect` event

---

## Quick Start

### Basic AI AssistView

```typescript
import { AIAssistView, PromptRequestEventArgs } from '@syncfusion/ej2-interactive-chat';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

// Initialize AI AssistView
const aiAssistView: AIAssistView = new AIAssistView({
    promptSuggestions: [
        'How do I get started?',
        'What are the key features?'
    ],
    promptRequest: (args: PromptRequestEventArgs) => {
        // Handle prompt request - integrate with AI service here
        setTimeout(() => {
            const response = 'This is the AI response to: ' + args.prompt;
            aiAssistView.addPromptResponse(response);
        }, 1000);
    }
});

// Render to DOM
aiAssistView.appendTo('#aiAssistView');
```

### HTML Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>AI AssistView</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    
    <!-- Syncfusion CSS -->
    <link href="https://cdn.syncfusion.com/ej2/32.1.19/fluent2.css" rel="stylesheet" />
</head>
<body>
    <div id='container' style="height: 400px; width: 700px;">
        <div id="aiAssistView"></div>
    </div>
</body>
</html>
```

### CSS Imports

```css
@import "../../node_modules/@syncfusion/ej2-fluent2-theme/styles/ai-assistview/index.css";
```

---

## Common Patterns

### Pattern 1: OpenAI Integration

```typescript
const aiAssistView: AIAssistView = new AIAssistView({
    promptSuggestions: ['Explain AI', 'Code example', 'Best practices'],
    promptRequest: async (args: PromptRequestEventArgs) => {
        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${OPENAI_API_KEY}`
                },
                body: JSON.stringify({
                    model: 'gpt-4',
                    messages: [{ role: 'user', content: args.prompt }]
                })
            });
            
            const data = await response.json();
            const aiResponse = data.choices[0].message.content;
            aiAssistView.addPromptResponse(aiResponse);
        } catch (error) {
            aiAssistView.addPromptResponse('Error: ' + error.message);
        }
    }
});
```

### Pattern 2: Markdown Responses with Streaming

```typescript
const aiAssistView: AIAssistView = new AIAssistView({
    enableStreaming: true,
    promptRequest: (args: PromptRequestEventArgs) => {
        // Simulate streaming response
        const markdownResponse = `# Response\n\nThis is **bold** and *italic* text.\n\n- Item 1\n- Item 2\n\`\`\`javascript\nconst x = 10;\n\`\`\``;
        
        let index = 0;
        const interval = setInterval(() => {
            if (index < markdownResponse.length) {
                const chunk = markdownResponse.slice(0, index + 5);
                aiAssistView.addPromptResponse(chunk, false);
                index += 5;
            } else {
                clearInterval(interval);
                aiAssistView.addPromptResponse(markdownResponse, true);
            }
        }, 50);
    }
});
```

### Pattern 3: Custom Toolbar with Actions

```typescript
const aiAssistView: AIAssistView = new AIAssistView({
    responseToolbarSettings: {
        items: [
            { type: 'Button', iconCss: 'e-icons e-copy', tooltip: 'Copy' },
            { type: 'Button', iconCss: 'e-icons e-assist-like', tooltip: 'Like' },
            { type: 'Button', iconCss: 'e-icons e-assist-dislike', tooltip: 'Dislike' }
        ],
        itemClicked: (args: ToolbarItemClickedEventArgs) => {
            if (args.item.iconCss.includes('copy')) {
                // Copy response to clipboard
                const responseText = aiAssistView.prompts[args.dataIndex].response;
                navigator.clipboard.writeText(responseText);
            } else if (args.item.iconCss.includes('like')) {
                console.log('User liked the response');
            }
        }
    }
});
```

### Pattern 4: Chain of Thoughts (Streaming Reasoning)

```typescript
import { AIAssistView, AssistThinking, PromptRequestEventArgs } from '@syncfusion/ej2-interactive-chat';

AIAssistView.Inject(AssistThinking);

const aiAssistView: AIAssistView = new AIAssistView({
    promptRequest: (args: PromptRequestEventArgs) => {
        // Show an in-progress reasoning stage first
        aiAssistView.addPromptResponse({
            blocks: [{
                blockType: 'thinking',
                title: 'Understanding your request',
                isActive: true,
                collapsed: false,
                stages: [
                    { id: 'step1', status: 'inprogress', content: 'Analyzing the request…' }
                ]
            }]
        }, false); // isFinalUpdate: false while streaming

        // Later, mark the stage complete and append the final response
        setTimeout(() => {
            aiAssistView.addPromptResponse({
                blocks: [{
                    blockType: 'thinking',
                    title: 'Understanding your request',
                    isActive: false,
                    collapsed: true,
                    stages: [
                        { id: 'step1', status: 'completed', content: 'Analyzed the request.' }
                    ]
                }],
                response: 'Here is the final answer based on my reasoning.'
            }, true); // isFinalUpdate: true
        }, 1000);
    }
});
```

### Pattern 5: Generative UI (Interactive Tool Cards)

```typescript
import { AIAssistView } from '@syncfusion/ej2-interactive-chat';

const aiAssistView: AIAssistView = new AIAssistView({
    promptRequest: onPromptRequest
});

// Register a tool BEFORE it's referenced in any response; toolName must be unique
aiAssistView.registerToolUI({
    toolName: 'weather-card',
    template: (props: any) => `
        <div class="e-card">
            <div class="e-card-header-title">${props.location}</div>
            <div class="e-card-sub-title">${props.temperature}</div>
        </div>
    `
});

function onPromptRequest(args: any) {
    setTimeout(() => {
        // Mix text and tool blocks in a single response
        aiAssistView.addPromptResponse({
            blocks: [
                { blockType: 'text', content: 'Here is the forecast:' },
                { blockType: 'tool', toolName: 'weather-card', props: { location: 'New York', temperature: '1°C / -4°C' } }
            ]
        });
    }, 1000);
}

aiAssistView.appendTo('#aiAssistView');
```

### Pattern 6: File Attachments

```typescript
const aiAssistView: AIAssistView = new AIAssistView({
    enableAttachments: true,
    attachmentSettings: {
        allowedFileTypes: '.pdf,.docx,.txt,.jpg,.png',
        maxFileSize: 5242880, // 5MB
        maximumCount: 3,
        saveUrl: 'https://your-api.com/upload',
        removeUrl: 'https://your-api.com/remove'
    },
    promptRequest: (args: PromptRequestEventArgs) => {
        console.log('Attached files:', args.attachedFiles);
        // Process prompt with attached files
        aiAssistView.addPromptResponse('Received your prompt with attachments');
    }
});
```

### Pattern 7: Regenerate Responses

```typescript
import { AIAssistView, PromptRequestEventArgs, PromptModel } from '@syncfusion/ej2-interactive-chat';

let promptsData: PromptModel[] = [
    { prompt: "What is AI?", response: "AI stands for Artificial Intelligence..." }
];

const regenerateResponses: string[] = [
    "AI, or Artificial Intelligence, refers to the simulation of human intelligence in machines.",
    "Artificial Intelligence is the development of computer systems that perform human-like tasks."
];

const aiAssistView: AIAssistView = new AIAssistView({
    prompts: promptsData,
    responseToolbarSettings: {
        // e-assist-regenerate enables the built-in regenerate button
        items: [
            { type: 'Button', iconCss: 'e-icons e-assist-copy', tooltip: 'Copy' },
            { type: 'Button', iconCss: 'e-icons e-assist-regenerate', tooltip: 'Regenerate' }
        ]
    },
    promptRequest: (args: PromptRequestEventArgs) => {
        // Regenerate re-fires promptRequest with the existing prompt text
        setTimeout(() => {
            const response = regenerateResponses[Math.floor(Math.random() * regenerateResponses.length)];
            aiAssistView.addPromptResponse(response);
        }, 1000);
    }
});
```

### Pattern 8: Text to Speech (Read Aloud)

```typescript
import { AIAssistView, PromptRequestEventArgs, PromptModel } from '@syncfusion/ej2-interactive-chat';

const promptsData: PromptModel[] = [
    { prompt: "What is AI?", response: "AI stands for Artificial Intelligence..." }
];

const aiAssistView: AIAssistView = new AIAssistView({
    prompts: promptsData,
    responseToolbarSettings: {
        // e-assist-audio enables the built-in Read Aloud button
        items: [
            { type: 'Button', iconCss: 'e-icons e-assist-audio', tooltip: 'Read Aloud' },
            { type: 'Button', iconCss: 'e-icons e-assist-like', tooltip: 'Like' }
        ]
    },
    textToSpeechSettings: {
        language: 'en-US',
        speechPitch: 1,
        speechRate: 1,
        volume: 1
    },
    promptRequest: (args: PromptRequestEventArgs) => {
        setTimeout(() => {
            aiAssistView.addPromptResponse('This response can be read aloud via the toolbar.');
        }, 1000);
    }
});
```

### Pattern 9: Telemetry (Tracking AI Interaction Metrics)

```typescript
import { AIAssistView, PromptRequestEventArgs, TelemetryData, TelemetryMetric } from '@syncfusion/ej2-interactive-chat';

// Enable telemetry and limit the report to a specific set/order of metrics
const aiAssistView: AIAssistView = new AIAssistView({
    promptSuggestions: [
        'How do I set achievable goals at work?',
        'Why do people fly in their dreams?'
    ],
    telemetrySettings: {
        enable: true,
        metrics: ['status', 'duration', 'model', 'inputTokens', 'outputTokens', 'totalTokens'] as TelemetryMetric[]
    },
    promptRequest: (args: PromptRequestEventArgs) => {
        setTimeout(() => {
            const defaultResponse = 'For real-time prompt processing, connect the AIAssistView component to your preferred AI service.';
            // Attach AI usage details via the TelemetryData argument of addPromptResponse
            const telemetryData: TelemetryData = {
                model: 'gpt-4o',
                inputTokens: 128,
                outputTokens: 512,
                customAttributes: { region: 'us-east-1', tenant: 'acme' }
            };
            aiAssistView.addPromptResponse(defaultResponse, true, telemetryData);
        }, 1000);
    }
});

aiAssistView.appendTo('#aiAssistView');
```

### Pattern 10: Customizing the Telemetry Report via `beforeReport`

```typescript
import { AIAssistView, PromptRequestEventArgs, TelemetryReport } from '@syncfusion/ej2-interactive-chat';

const aiAssistView: AIAssistView = new AIAssistView({
    promptSuggestions: [
        'How do I set achievable goals at work?',
        'Why do people fly in their dreams?'
    ],
    telemetrySettings: {
        enable: true,
        // Return the report (modified or not) to deliver it, or null to suppress it
        beforeReport: (report: TelemetryReport): TelemetryReport | null => {
            report.customAttributes = { region: 'us-east-1', tenant: 'acme', beta: true };
            return report;
        }
    },
    promptRequest: (args: PromptRequestEventArgs) => {
        setTimeout(() => {
            aiAssistView.addPromptResponse('Response with custom telemetry attributes.');
        }, 1000);
    }
});

aiAssistView.appendTo('#aiAssistView');
```

### Pattern 11: Mentions in the Prompt Editor

```typescript
import { AIAssistView, PromptRequestEventArgs } from '@syncfusion/ej2-interactive-chat';

const agents: any[] = [
    { id: 'TechSupport', name: 'TechSupport' },
    { id: 'HRAssistant', name: 'HRAssistant' },
    { id: 'KnowledgeBase', name: 'KnowledgeBase' }
];

const aiAssistView: AIAssistView = new AIAssistView({
    promptPlaceholder: "Type '@' to mention an agent...",
    mentions: [
        {
            mentionChar: '@',
            dataSource: agents,
            fields: { text: 'name', value: 'id' },
            filterType: 'StartsWith',
            highlight: true,
            popupWidth: '250px',
            popupHeight: '200px'
        }
    ],
    promptRequest: (args: PromptRequestEventArgs) => {
        setTimeout(() => {
            aiAssistView.addPromptResponse('Processed mention from prompt: ' + args.prompt);
        }, 1000);
    }
});

aiAssistView.appendTo('#aiAssistView');
```

### Pattern 12: Multiple Mention Triggers (Agents and Commands)

```typescript
import { AIAssistView } from '@syncfusion/ej2-interactive-chat';

const agents: any[] = [
    { id: 'TechSupport', name: 'TechSupport', iconCss: 'e-icons e-comment-status' },
    { id: 'HRAssistant', name: 'HRAssistant', iconCss: 'e-icons e-people' }
];

const commands: any[] = [
    { id: 'table', name: '/table', description: 'Answer as a markdown table' },
    { id: 'rewrite', name: '/rewrite', description: 'Rewrite for clarity' }
];

const aiAssistView: AIAssistView = new AIAssistView({
    promptPlaceholder: "Type '@' for agents or '/' for commands...",
    mentions: [
        {
            mentionChar: '@',
            dataSource: agents,
            fields: { text: 'name', value: 'id', iconCss: 'iconCss' }
        },
        {
            mentionChar: '/',
            dataSource: commands,
            showMentionChar: false,
            fields: { text: 'name', value: 'id' },
            itemTemplate:
                '<div class="listItems">' +
                    '<span class="commandName">${name}</span>' +
                    '<span class="commandDesc">${description}</span>' +
                '</div>'
        }
    ],
    promptRequest: () => {
        setTimeout(() => aiAssistView.addPromptResponse('Mention processed.'), 1000);
    }
});

aiAssistView.appendTo('#aiAssistView');
```

### Pattern 13: Response Animation Template (Loading Indicator)

```typescript
import { AIAssistView, PromptRequestEventArgs } from '@syncfusion/ej2-interactive-chat';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

const aiAssistView: AIAssistView = new AIAssistView({
    responseAnimationTemplate: responseAnimationContent,
    // Returning a Promise keeps the animation visible until the response is added
    promptRequest: (args: PromptRequestEventArgs) => {
        return new Promise<void>((resolve: () => void) => {
            setTimeout(() => {
                const defaultResponse = 'For real-time prompt processing, connect the AIAssistView component to your preferred AI service, such as OpenAI or Azure Cognitive Services.';
                aiAssistView.addPromptResponse(defaultResponse);
                resolve();
            }, 2000);
        });
    }
});

aiAssistView.appendTo('#aiAssistView');

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

### Pattern 14: Toolbar Item Alignment

```typescript
import { AIAssistView } from '@syncfusion/ej2-interactive-chat';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

// Use the `align` property on a toolbar item to position it within the toolbar
// (supported values: 'Left', 'Center', 'Right'; default is 'Left').
const aiAssistView: AIAssistView = new AIAssistView({
    toolbarSettings: {
        items: [ { iconCss: 'e-icons e-refresh', align: 'Right' } ],
    },
    promptRequest: () => {
        setTimeout(() => {
            aiAssistView.addPromptResponse('For real-time prompt processing, connect the AIAssistView component to your preferred AI service, such as OpenAI or Azure Cognitive Services.');
        }, 1000);
    }
});

aiAssistView.appendTo('#aiAssistView');
```

---

## Key Properties Quick Reference

| Property | Type | Description |
|----------|------|-------------|
| `prompts` | `PromptModel[]` | Collection of prompt-response pairs |
| `promptSuggestions` | `string[]` | Array of suggested prompts |
| `promptRequest` | `Event` | Event triggered when user submits a prompt |
| `enableStreaming` | `boolean` | Enable response streaming |
| `enableAttachments` | `boolean` | Enable file attachment functionality |
| `views` | `AssistViewModel[]` | Custom view configurations |
| `toolbarSettings` | `ToolbarSettingsModel` | Header toolbar configuration |
| `footerToolbarSettings` | `FooterToolbarSettingsModel` | Footer toolbar configuration |
| `responseToolbarSettings` | `ResponseToolbarSettingsModel` | Response toolbar configuration |
| `promptToolbarSettings` | `PromptToolbarSettingsModel` | Prompt toolbar configuration |
| `bannerTemplate` | `string \| Function` | Custom banner template |
| `promptItemTemplate` | `string \| Function` | Custom prompt item template |
| `responseItemTemplate` | `string \| Function` | Custom response item template |
| `responseAnimationTemplate` | `string \| Function` | Custom loading indicator or animation shown while a response is being generated; visible until `addPromptResponse` is called and any `Promise` returned by `promptRequest` resolves |
| `speechToTextSettings` | `SpeechToTextSettingsModel` | Speech-to-text configuration |
| `textToSpeechSettings` | `TextToSpeechSettingsModel` | Text-to-speech configuration (`language`, `speechPitch`, `speechRate`, `volume`, `voice`, `inputText`) |
| `blockTemplate` | `string \| Function` | Custom template for rendering thinking blocks |
| `itemTemplate` | `string \| Function` | Custom template for individual thinking stage items |
| `editableContextClicked` | `Event` | Triggered when a clickable inline context badge is clicked |
| `registerToolUI` | `Method` | Registers a generative UI tool (`toolName`, `template`, optional `handler`) so it can be rendered via a `tool` block |
| `telemetrySettings` | `TelemetrySettingsModel` | Configures AI interaction telemetry (`enable`, `metrics`, `beforeReport`) and renders a built-in telemetry button with a hover tooltip report per response |
| `addPromptResponse(response, isFinalUpdate?, telemetryData?)` | `Method` | Adds a response; when telemetry is enabled, an optional `TelemetryData` argument supplies `model`, `inputTokens`, `outputTokens`, `reasoningTokens`, `cachedInputTokens`, and `customAttributes` for the report |
| `mentions` | `MentionSettingsModel[]` | Configures mention support in the prompt editor: `mentionChar`, `dataSource`, `fields`, `query`, `filterType`, `highlight`, `showMentionChar`, `popupWidth`, `popupHeight`, `displayTemplate`, `itemTemplate`, `noRecordsTemplate` |
| `mentionSelect` | `Event` | Triggered when a user selects an item from the mention suggestion popup (event args expose the selected `itemData`) |