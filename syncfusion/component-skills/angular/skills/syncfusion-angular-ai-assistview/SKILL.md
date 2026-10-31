---
name: syncfusion-angular-ai-assistview
description: Implement the Syncfusion Angular AI AssistView component. Use this skill when you need to create conversational AI interfaces, integrate AI services, add chat-like UI, or create intelligent assistant applications. Includes setup, configuration, event handling, AI integrations (OpenAI, Gemini, Ollama), speech features, chain-of-thought reasoning, generative UI tool support, and customization. Use this skill for all AI AssistView component implementation needs.
metadata:
  author: "Syncfusion Inc"
  version: "34.1.29"
---

# Syncfusion Angular AI AssistView Component

## Component Overview

The **Syncfusion AI AssistView** is a powerful Angular component that provides a ready-to-use interface for building conversational AI applications.

**Key Capabilities:**
- **Conversation Management** - Manage prompt-response pairs with history, persistence, and markdown rendering
- **AI Service Integration** - Connect to OpenAI, Gemini, Ollama, Lite-LLM, and MCP providers with streaming support
- **Chain of Thoughts** - Visualize AI reasoning as collapsible thinking blocks with multi-stage, dynamic status updates via the injectable `AssistThinking` module
- **Generative UI** - Render interactive tools, charts, and custom components within AI responses using `blocks` and `registerToolUI`
- **Speech Features** - Built-in speech-to-text with 11 configurable properties and 4 events
- **Toolbar System** - Four toolbar types (header, prompt, response, footer) with custom actions and tag directives
- **Telemetry** - Built-in per-response telemetry button with metrics (status, duration, tool calls, tokens, model), `beforeReport` event for customization, and a `TelemetryData` argument on `addPromptResponse` to surface usage data
- **Mentions** - Trigger-character-based mention picker in the prompt editor with local or `DataManager` data sources, filtering, highlighting, popup sizing, and display/item/no-records templates
- **View Management** - Multiple views with programmatic `activeView` control and dynamic switching
- **Events & Interactions** - Typed event arguments (PromptRequestEventArgs, PromptChangedEventArgs, StopRespondingEventArgs)
- **File Attachments** - Support for file uploads with type/size restrictions and the full attachment lifecycle events: `beforeAttachmentUpload`, `attachmentUploadSuccess`, `attachmentUploadFailure`, `attachmentRemoved`, `attachmentRemoving`, and `attachmentClick`
- **Templates** - Customize prompts, responses, suggestions, banners, footers, and response animations with flexible templates including a per-response `responseAnimationTemplate` for branded loading states
- **Methods** - Programmatically add/update responses, execute prompts, and control component behavior
- **Globalization** - Full RTL support and localization for 12+ languages with locale-based formatting
- **Customizable UI** - Height, width, CSS classes, HTML attributes, and theme customization

## Documentation and Navigation Guide

### Getting Started
📄 **Read:** [references/getting-started.md](references/getting-started.md)
- Installation and dependency setup
- Angular environment configuration
- Basic component initialization
- CSS imports and theme configuration
- First working example

### Core Features & Conversation Management
📄 **Read:** [references/assist-view-basics.md](references/assist-view-basics.md)
- Setting prompt text and placeholders
- Managing prompt-response collections
- Markdown response rendering
- Configuring prompt suggestions
- Customizing user and assistant avatars
- UI controls (clear button, scroll-to-bottom)
- Component configuration (height, width, showHeader, cssClass, htmlAttributes)
- State persistence with `enablePersistence`
- Globalization and localization (locale property with 12+ languages)
- RTL support with `enableRtl` for Arabic, Hebrew, Persian, Urdu

### Appearance & Styling
📄 **Read:** [references/appearance-customization.md](references/appearance-customization.md)
- Setting component width and height
- Applying custom CSS classes
- Theme customization
- Responsive design patterns

### Multiple Views & Custom Content
📄 **Read:** [references/custom-views.md](references/custom-views.md)
- Adding custom view models
- View types (Assist and Custom)
- View configuration and naming
- Managing multiple views within one component
- Programmatic view switching with `activeView` property
- Dynamic view navigation patterns
- View history and breadcrumb navigation
- Workflow-based view switching
- Conditional view display based on user roles

### Programmatic Control & Methods
📄 **Read:** [references/methods-and-actions.md](references/methods-and-actions.md)
- Adding prompt responses (string and object
- Complete event arguments reference section
- PromptRequestEventArgs with 6 properties (prompt, attachedFiles, promptSuggestions, cancel, etc.)
- PromptChangedEventArgs with 5 properties (value, previousValue, element, event)
- StopRespondingEventArgs for canceling responses
- AttachmentClickEventArgs with FileInfo interface
- Production-ready examples with all event types formats)
- Executing prompts dynamically
- Response handling patterns
- Programmatic interaction

### Chain of Thoughts
📄 **Read:** [references/chain-of-thoughts.md](references/chain-of-thoughts.md)
- Enabling reasoning visualization with the injectable `AssistThinking` module
- Thinking block configuration (`blocks` property, `blockType: 'thinking'`)
- Streaming multi-step reasoning with `addPromptResponse` and `isFinalUpdate`
- Adding stages with the `stages` array and `ThinkingStage` properties
- Stage status indicators (`completed`, `inprogress`, `failed`)
- Inline context items with `editableContext` and `{index}` placeholders
- Handling the `editableContextClicked` event
- Customizing rendering with `blockTemplate` and `itemTemplate`

### Generative UI
📄 **Read:** [references/generative-ui.md](references/generative-ui.md)
- Registering custom tools with `registerToolUI` (toolName, template, handler)
- Configuring tool templates and interactive handler functions
- Adding `tool` blocks to responses via `addPromptResponse` (`toolName`, `props`)
- Configuring the AI service system prompt to return structured `blocks` JSON
- Chaining follow-up prompts with `executePrompt` after tool interaction
- Complete production example: recipe builder with custom and chart-based tools

### Text to Speech
📄 **Read:** [references/text-to-speech.md](references/text-to-speech.md)
- Enabling built-in Text-to-Speech with the `e-assist-audio` response toolbar item
- Reading AI responses aloud via the browser's `SpeechSynthesisUtterance` API
- Customizing speech behavior with `textToSpeechSettings` (language, speechPitch, speechRate, volume, voice)

### Telemetry
📄 **Read:** [references/telemetry.md](references/telemetry.md)
- Enabling per-response telemetry with `telemetrySettings.enable`
- Filtering captured metrics with the `metrics` array (`status`, `duration`, `toolCalls`, `streamingChunks`, `model`, `inputTokens`, `outputTokens`, `totalTokens`, `reasoningTokens`, `cachedInputTokens`)
- Customizing the report with the `beforeReport` event (mutate, augment with `customAttributes`, or return `null` to suppress)
- Surfacing model and token usage via the optional `TelemetryData` argument to `addPromptResponse`
- Passing domain-specific metrics through `TelemetryData.customAttributes`
- Key behaviors: turn tracking, telemetry button states, duration formatting, metrics filter precedence, and regenerate flow

### Mentions
📄 **Read:** [references/mentions.md](references/mentions.md)
- Configuring the mention trigger character with `mentionChar` (e.g. `@` for agents, `/` for commands)
- Registering multiple mention configurations on a single component (the `mentions` array)
- Using local arrays or `DataManager` instances with the `dataSource` property
- Mapping object-based sources with `fields` and applying additional filters with `Query`
- Controlling match behavior via `filterType` (`Contains`, `StartsWith`, `EndsWith`) and `highlight`
- Showing or hiding the trigger character in the editor with `showMentionChar`
- Customizing popup dimensions with `popupWidth` / `popupHeight`
- Customizing rendering with `displayTemplate`, `itemTemplate`, and `noRecordsTemplate`
- Reacting to selections via the `mentionSelect` event and `MentionSelectEventArgs`

## Complete documentation for all 4 toolbar types
- Header Toolbar (`toolbarSettings`) - Global actions and navigation
- Prompt Toolbar (`promptToolbarSettings`) - Actions on user prompts
- Response Toolbar (`responseToolbarSettings`) - Actions on AI responses
- Footer Toolbar (`footerToolbarSettings`) - Input area customization
- ToolbarItemModel interface with 10 properties
- ToolbarItemClickedEventArgs with dataIndex handling
- Tag directive approach: `<e-toolbarsettings>`, `<e-toolbaritem>`
- Property binding approach for dynamic toolbar items
- Common patterns, best practices, and troubleshootingest, promptChanged)
- File upload events (beforeAttachmentUpload, attachmentUploadSuccess, attachmentUploadFailure, attachmentRemoved, **attachmentRemoving**)
- Event arguments: `PromptRequestEventArgs`, `PromptChangedEventArgs`, `StopRespondingEventArgs`, `AttachmentClickEventArgs`, **`RemovingEventArgs`** (from `@syncfusion/ej2-inputs`)
- Event handling patterns and best practices

### File Attachments
📄 **Read:** [references/file-attachments.md](references/file-attachments.md)
- File attachment configuration
- Upload handling and validation
- File size and type restrictions
- Attachment display and management
- Custom attachment templates (attachmentTemplate)

### Toolbar Configuration
📄 **Read:** [references/toolbar-items.md](references/toolbar-items.md)
- Toolbar customization
- Built-in speech-to-text with `speechToTextSettings` (recommended approach)
- SpeechToTextSettingsModel with 11 configurable properties
- ButtonSettingsModel and TooltipSettingsModel interfaces
- 4 speech events: onStart, onStop, transcriptChanged, onError
- Event arguments: StartListeningEventArgs, StopListeningEventArgs, TranscriptChangedEventArgs, ErrorEventArgs
- Language support with 10+ language codes (en-US, es-ES, fr-FR, de-DE, ja-JP, etc.)
- Interim results handling with `allowInterimResults`
- Custom Web Speech API implementation (alternative approach)
- Text-to-speech setup and configuration
- Browser compatibility and error handling
- Regenerate responses with `e-assist-regenerate` icon, response navigation UI, and the `regeneratedResponses` property
- **Toolbar item alignment** with the `align` property (`Left`, `Center`, `Right`) — available on every `ToolbarItemModel` and across all four toolbar types

### Templates & Custom Rendering
📄 **Read:** [references/templates.md](references/templates.md)
- Template system overview
- Prompt templates
- Response templates
- **Response animation template** (`responseAnimationTemplate`) for branded loading states shown while a response is being generated and removed once `addPromptResponse()` is called
- Custom template creation

### AI Service Integration
📄 **Read:** [references/ai-integrations.md](references/ai-integrations.md)
- Azure OpenAI integration setup
- Gemini integration
- Lite-LLM integration
- Model Context Protocol (MCP) integration
- Ollama integration
- Security best practices and API management

### Speech Features
📄 **Read:** [references/speech-features.md](references/speech-features.md)
- Speech-to-text setup and configuration
- Text-to-speech setup and configuration
- Audio handling
- Browser compatibility considerations

---

### Methods (Generative UI)
| Method | Description |
|--------|-------------|
| `registerToolUI({ toolName, template, handler })` | Registers a tool's rendering template and optional interaction handler. Call before referencing the tool in any response. |
| `executePrompt(prompt)` | Programmatically triggers a new prompt/response cycle, useful for chaining follow-up AI responses after a tool interaction. |

---

## Quick Start Example

Here's a minimal working example to get started:

```typescript
import { Component } from '@angular/core';
import { AIAssistViewModule } from '@syncfusion/ej2-angular-interactive-chat';

@Component({
  imports: [AIAssistViewModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div ejs-aiassistview 
      id='aiAssistView'
      [promptSuggestions]="suggestions"
      (promptRequest)="onPromptRequest($event)">
    </div>
  `,
  styles: [`
    :host ::ng-deep #aiAssistView {
      height: 100vh;
    }
  `]
})
export class AppComponent {
  suggestions = [
    'What is Angular?',
    'How to create components?',
    'Explain dependency injection'
  ];

  onPromptRequest(args: any) {
    // Handle prompt and provide response
    setTimeout(() => {
      const response = 'This is a sample response from your AI service.';
      // Add response using component method
    }, 1000);
  }
}
```

---

## Common Patterns

### Pattern 1: Basic Conversation Flow
1. Initialize component with suggestions
2. User enters prompt
3. `promptRequest` event fires
4. Call your AI service
5. Use `addPromptResponse()` to display result
6. Conversation history maintained automatically

### Pattern 2: AI Service Integration with Streaming
1. Enable streaming with `[enableStreaming]="true"`
2. Configure AI provider credentials (OpenAI, Gemini, etc.)
3. In `promptRequest` event, call provider API with streaming
4. Use `ReadableStream` for chunked responses
5. Handle `stopRespondingClick` event for cancellation
6. Update UI with `addPromptResponse()` incrementally

### Pattern 3: Custom View Management with activeView
1. Define multiple view types (Assist, Custom)
2. Use `[activeView]="currentIndex"` to control display
3. Switch between views programmatically based on user action
4. Track view history for back/forward navigation
5. Each view can have different configuration
6. Maintain separate state per view

### Pattern 4: Complete Toolbar Configuration
1. Configure header toolbar for global actions (new chat, export, settings)
2. Set up prompt toolbar for user prompt actions (edit, copy, retry)
3. Add response toolbar for AI response actions (copy, regenerate, like/dislike)
4. Configure footer toolbar for input actions (formatting, attachments)
5. Use tag directive or property binding approach
6. Handle `itemClicked` events with `dataIndex` for context
7. Use the `align` property on each `ToolbarItemModel` to position primary actions on the `Left` and secondary actions (Settings, Export) on the `Right`

### Pattern 5: Speech-Enabled Interface
1. Configure `speechToTextSettings` with language and options
2. Enable `allowInterimResults` for real-time transcription
3. Handle speech events: `onStart`, `onStop`, `transcriptChanged`, `onError`
4. Automatically submit recognized text as prompts
5. Provide visual feedback during listening state

### Pattern 6: Event-Driven Actions with Typed Arguments
1. Use `PromptRequestEventArgs` to access prompt, attachedFiles, and cancel flag
2. Use `PromptChangedEventArgs` for real-time input validation
3. Handle `StopRespondingEventArgs` to cancel long-running requests
4. Use `beforeAttachmentUpload` for file validation
5. Use `editableContextClicked` for inline context badge interactions

### Pattern 7: Chain of Thoughts (Reasoning Visualization)
1. Inject the `AssistThinking` module via `AIAssistView.Inject(AssistThinking)`
2. Push `blocks` with `blockType: 'thinking'` via `addPromptResponse`, using `isFinalUpdate: false` while streaming
3. Update `stages[].status` (`inprogress` → `completed`/`failed`) as reasoning progresses
4. Use `editableContext` with `{index}` placeholders for clickable inline references
5. Deliver the final `response` text alongside the last `isFinalUpdate: true` call
6. Optionally customize rendering with `blockTemplate` (full block) or `itemTemplate` (per-stage)

### Pattern 8: Generative UI (Interactive Tools in Responses)
1. Register each tool once via `registerToolUI({ toolName, template, handler })`, typically in `ngAfterViewInit`
2. Reference registered tools in responses using `blocks: [{ blockType: 'tool', toolName, props }]`
3. Combine `text` and `tool` blocks in the same `blocks` array for narrative + interactive content
4. Configure the AI system prompt to return a structured `blocks` JSON array for dynamic tool invocation
5. Use `executePrompt` to trigger a follow-up AI response after a user interacts with a rendered tool
6. Parse AI-returned JSON defensively and fall back to plain text on malformed output

### Pattern 9: Telemetry for AI Response Metrics
1. Enable the telemetry button by setting `telemetrySettings = { enable: true }`
2. Use the `metrics` array on `telemetrySettings` to choose which metrics are captured and to control the row order in the tooltip (e.g. `['duration', 'model', 'inputTokens', 'outputTokens', 'totalTokens']`)
3. Pass the optional `TelemetryData` argument to `addPromptResponse(response, isFinalUpdate, telemetryData)` to surface `model`, `inputTokens`, `outputTokens`, `reasoningTokens`, and `cachedInputTokens`; `totalTokens` is auto-computed
4. Use the `beforeReport(report)` event to add domain-specific entries via `report.customAttributes`, or return `null` to suppress the report
5. Hover the telemetry button on any response to inspect the rendered tooltip — `status` and `duration` are always shown, and `customAttributes` are always included regardless of the `metrics` filter

### Pattern 10: Mention Picker in the Prompt Editor
1. Define local arrays (or `DataManager` instances) for each mention group (e.g. agents, commands, knowledge items)
2. Build a `mentions` array on the component, with one entry per trigger: `{ mentionChar: '@', dataSource, fields: { text, value } }` and optional `filterType`, `query`, `highlight`, `popupWidth/Height`, and templates
3. Pass the array to the component via `[mentions]="mentions"` and set a helpful `promptPlaceholder` that hints at the available triggers
4. Use `showMentionChar: false` for slash-style commands so the `/` is not retained in the inserted mention
5. Customize appearance with `itemTemplate` (popup rows), `displayTemplate` (selected chip), and `noRecordsTemplate` (empty state)
6. React to selections via the `mentionSelect` event or per-mention `mentionSelect` callback to capture the chosen item and act on it

---

## Key Properties

| Property | Type | Default | When to Use |
|----------|------|---------|------------|
| `prompt` | string | `''` | Pre-fill prompt text |
| `promptPlaceholder` | string | `'Type prompt for assistance...'` | Guide user input |
| `promptSuggestions` | string[] | `[]` | Provide quick starting prompts |
| `prompts` | object[] | `[]` | Initialize conversation history |
| `showClearButton` | boolean | `false` | Show button to clear input |
| `enableScrollToBottom` | boolean | `true` | Show scroll-to-bottom indicator |
| `blockTemplate` | string \| object | `''` | Customize rendering of thinking blocks |
| `itemTemplate` | string \| object | `''` | Customize rendering of individual thinking stage items |
| `responseAnimationTemplate` | string \| object | `''` | Customize the loading indicator/animation shown in place of a response while it is being generated |

### Layout & Appearance
| Property | Type | Default | When to Use |
|----------|------|---------|------------|
| `width` | string \| number | `'100%'` | Set container width |
| `height` | string \| number | `'100%'` | Set container height |
| `cssClass` | string | `''` | Apply custom CSS styling and themes |
| `showHeader` | boolean | `true` | Control header visibility |
| `htmlAttributes` | object | `{}` | Add custom HTML attributes (aria-*, data-*, etc.) |

### Streaming & Features
| Property | Type | Default | When to Use |
|----------|------|---------|------------|
| `enableStreaming` | boolean | `false` | Enable real-time streaming responses |
| `speechToTextSettings` | SpeechToTextSettingsModel | `null` | Configure built-in speech recognition |
| `textToSpeechSettings` | `TextToSpeechSettingsModel` | `null` | Configure built-in Text-to-speech support|
| `activeView` | number | `0` | Programmatically switch between views |
| `telemetrySettings` | `TelemetrySettingsModel` | `null` | Track per-response AI metrics (`enable`, `metrics`, `beforeReport`) and surface a telemetry button in the response toolbar |
| `mentions` | `MentionSettings[]` | `null` | Configure trigger-character mention pickers in the prompt editor (data source, fields, query, filter type, templates) |

### Globalization
| Property | Type | Default | When to Use |
|----------|------|---------|------------|
| `locale` | string | `'en-US'` | Set language/culture (en-US, es-ES, fr-FR, de-DE, ja-JP, ar-SA, etc.) |
| `enableRtl` | boolean | `false` | Enable right-to-left text direction (Arabic, Hebrew, Persian, Urdu) |
| `enablePersistence` | boolean | `false` | Save component state between page reloads |

### Toolbar Configuration
| Property | Type | Default | When to Use |
|----------|------|---------|------------|
| `toolbarSettings` | ToolbarSettingsModel | `null` | Configure header toolbar (global actions) |
| `promptToolbarSettings` | PromptToolbarSettingsModel | `null` | Configure prompt toolbar (edit, copy, retry) |
| `responseToolbarSettings` | ResponseToolbarSettingsModel | `null` | Configure response toolbar (copy, regenerate, like/dislike) |
| `footerToolbarSettings` | FooterToolbarSettingsModel | `null` | Configure footer toolbar (formatting, attachments)

---

## Common Use Cases

1. **Customer Support Chatbot:** Build customer service interfaces with knowledge base integration
2. **Code Assistant:** Create coding helpers with AI that can review and suggest code
3. **Content Writer Assistant:** Implement writing tools with grammar and style suggestions
4. **Data Analysis Tool:** Create interfaces for users to query and analyze data through natural language
5. **Learning Platform:** Build educational assistants that answer student questions
6. **Internal Knowledge Bot:** Create enterprise assistants for company documentation and FAQs
7. **Multi-language Support:** Implement translation and localization features
8. **Accessibility Assistant:** Provide reading aid or instruction assistance
9. **Reasoning Visualization:** Build interfaces that surface AI reasoning via collapsible Chain of Thoughts blocks
10. **Generative UI Applications:** Render interactive tools and charts (cards, gauges, custom widgets) inline within AI responses
11. **Per-Response Telemetry:** Surface duration, model, and token usage on every AI response with `telemetrySettings` and the `TelemetryData` argument to `addPromptResponse`
12. **Usage-Aware Analytics:** Augment telemetry reports with `customAttributes` (region, tenant, sessionId, feature) for tenant/feature-level analytics in the response toolbar tooltip
13. **Agent Routing with Mentions:** Use `@` mentions to route a prompt to a specific agent (TechSupport, HRAssistant, KnowledgeBase) and parse `args.itemData` in the `mentionSelect` event to pre-load agent context before sending
14. **Slash Commands with Mentions:** Use `/` mentions (with `showMentionChar: false`) to expose quick actions like `/table`, `/rewrite`, `/checklist` that transform how the AI service responds
15. **Remote Knowledge Picker:** Bind the mention `dataSource` to a `DataManager` and apply a `Query` (with paging/filtering) so users can search and insert items from a large remote catalog
16. **Branded Loading States:** Use `responseAnimationTemplate` to show a custom loader, branded spinner, or progress indicator while the AI response is being generated — the template is removed automatically once `addPromptResponse()` is called
17. **Aligned Toolbar Layouts:** Use the `align` property on each `ToolbarItemModel` to position primary actions (`Left`), centered quick actions (`Center`), and secondary actions like Settings/Export (`Right`) — works across all four toolbar types
18. **Confirm or Cancel Attachment Removal:** Use the `attachmentRemoving` event (with `RemovingEventArgs`) to intercept a file removal before it happens — set `args.cancel = true` to keep the file attached, or perform cleanup (revoke object URLs, free preview state) before the file is detached

---
