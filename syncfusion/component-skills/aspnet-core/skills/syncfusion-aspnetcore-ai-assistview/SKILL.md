---
name: syncfusion-aspnetcore-ai-assistview
description: Implement the Syncfusion ASP.NET Core AI AssistView control for interactive AI-powered assistance interfaces. Use this skill when implementing AI assistants, prompt suggestions, mentions in the prompt editor, custom views, file attachments, markdown responses, customizable templates, regenerable responses, thinking capabilities (chain-of-thoughts), generative UI blocks, Text-to-Speech conversion, Speech-to-Text voice input, telemetry tracking, or customizing advanced AI conversation UI in ASP.NET Core applications.
metadata:
  author: "Syncfusion Inc"
  version: "34.1.29"
---

# Syncfusion ASP.NET Core AI AssistView Control

## Overview

The Syncfusion AI AssistView is a comprehensive component for building AI-powered assistance interfaces in ASP.NET Core applications. It provides support for:
- Configurable prompt suggestions with custom headers
- Prompt-response collections with markdown rendering
- File attachments with validation and size restrictions
- Custom views and templates for complete UI control
- Event-driven architecture for real-time interaction
- Toolbar customization for both header and footer areas
- Icon customization for prompts and responses

## Key Features

- **Prompt Suggestions**: Guide users with predefined suggestions
- **Markdown Support**: Render formatted content with built-in markdown converter
- **Custom Templates**: Customize banners, prompts, responses, and suggestions
- **File Attachments**: Enable users to attach files with the prompt
- **Multiple Views**: Support for Assist and Custom view types
- **Toolbar Customization**: Customize header and footer toolbar items
- **Icon Customization**: Personalize prompt and response avatars
- **Stop Responding**: Cancel in-progress AI responses with the stop responding button
- **Header Visibility**: Show or hide the header bar via `showHeader`
- **Helpful Feedback**: Mark responses as helpful using `PromptModel.isResponseHelpful`
- **Event Driven**: Full event lifecycle for complete control
- **Methods**: Dynamic prompt execution and response management
- **Regenerate Responses**: Request alternative AI responses for existing prompts without resubmission
- **Thinking Capabilities**: Visualize AI reasoning stages and workflow through chain-of-thoughts blocks
- **Generative UI**: Render dynamic interactive tools and UI elements within AI responses
- **Text-to-Speech**: Convert AI responses into spoken audio with customizable voice settings
- **Speech-to-Text**: Convert spoken words into text using the device's microphone for voice-based prompt input
- **Telemetry**: Track AI interaction metrics (duration, tool calls, model info, token usage) and surface a built-in telemetry button in each response toolbar with a hover tooltip report
- **Mentions**: Configure mention characters in the prompt editor with a suggestion popup driven by a configurable data source, field mappings, filtering, popup dimensions, and templates

## Navigation Guide

### Getting Started
📄 **Read:** [references/getting-started.md](references/getting-started.md)
- Installation and NuGet package setup
- TagHelper registration and configuration
- CSS/script resource linking
- Basic control initialization
- Prompt suggestions and responses configuration

### Configuring Prompts and Responses
📄 **Read:** [references/assist-view-configuration.md](references/assist-view-configuration.md)
- Setting prompt text and placeholders
- Prompt-response collection initialization
- Markdown response rendering
- Prompt suggestions with headers
- Avatar customization (prompt and response icons)
- Clear button and scroll-to-bottom features
- Show or hide the header bar (`showHeader`)
- Marking a response as helpful (`PromptModel.isResponseHelpful`)

### Appearance and Styling
📄 **Read:** [references/appearance-customization.md](references/appearance-customization.md)
- Width and height configuration
- CSS class customization
- Custom styling and theming
- Component container styling

### Handling Events
📄 **Read:** [references/events-handling.md](references/events-handling.md)
- Created event for initialization
- PromptRequest event for handling prompts (with `cancel`, `attachedFiles`, `promptSuggestions`)
- PromptChanged event for text changes (with `value`, `previousValue`)
- StopRespondingClick event for cancelling in-progress responses
- Attachment events (upload, success, failure, removed, removing, click)

### Using Methods and APIs
📄 **Read:** [references/methods-and-apis.md](references/methods-and-apis.md)
- addPromptResponse() method for string and object responses
- executePrompt() method for dynamic prompt execution
- Public method signatures and usage patterns

### Templates and Custom Views
📄 **Read:** [references/templates-and-views.md](references/templates-and-views.md)
- Banner templates for welcome messages
- Prompt item templates for custom prompt rendering
- Response item templates for response customization
- Response animation templates for custom loading indicators while the response is being generated
- Suggestion item templates
- Footer templates for custom actions
- Custom view types and active view configuration

### Toolbar Configuration
📄 **Read:** [references/toolbar-and-items.md](references/toolbar-and-items.md)
- Footer toolbar items and positioning
- Header toolbar configuration with icons
- Item types (Button, Separator, Input)
- Item alignment, visibility, and disabled states
- Tooltip text and CSS classes
- Built-in toolbar items for prompts and responses
- Custom toolbar items with templates and events
- `ToolbarItemClickedEventArgs` — item, dataIndex, cancel, event, name
- `itemClicked` event for prompt and response toolbar items
- Regenerate responses with alternative response navigation

### File Attachments
📄 **Read:** [references/file-attachments.md](references/file-attachments.md)
- Enabling file attachments
- Setting save and remove URLs
- File type restrictions (`allowedFileTypes`)
- Maximum file size configuration
- Maximum attachment count limits
- Custom attachment templates (attachmentTemplate)
- Pre-loading attached files in prompts (`PromptModel.attachedFiles`)

### Advanced Response Features

#### Thinking Capabilities
📄 **Read:** [references/chain-of-thoughts.md](references/chain-of-thoughts.md)
- Visualizing AI reasoning stages (*thinking blocks*, *stages*, *status updates*)
- Configuring thinking blocks with *blockType*, *title*, *content*, and *collapsed* state
- Adding stages with completion status (`completed`, `inprogress`, `failed`)
- Inline context items in stages with clickable badges
- `editableContextClicked` event for custom context actions
- Block template and item template customization

#### Generative UI
📄 **Read:** [references/generative-ui.md](references/generative-ui.md)
- Registering custom tools with `registerToolUI` method
- Tool templates and handlers for dynamic UI rendering
- Adding tools to prompt responses via `blocks` property
- Configuring AI service system prompts for generative responses
- Tool blocks with *toolName* and *props* for interactive components

#### Text-to-Speech
📄 **Read:** [references/text-to-speech.md](references/text-to-speech.md)
- Enabling built-in Text-to-Speech functionality with *`e-assist-audio`* icon
- Converting AI responses into spoken audio (*Web Speech API*)
- Configuring speech settings with `e-aiassistview-textToSpeechSettings` tag helper
- Speech customization properties (*language*, *speechPitch*, *speechRate*, *volume*, *voice*)

#### Speech-to-Text
📄 **Read:** [references/speech-to-text.md](references/speech-to-text.md)
- Enabling built-in Speech-to-Text functionality for voice input
- Converting spoken words into text using *Web Speech API*
- Configuring speech recognition with `e-aiassistview-speechToTextSettings` tag helper
- Speech recognition properties (*language*, *buttonSettings*, *tooltipSettings*, *allowInterimResults*)
- Handling speech events (*onStart*, *onStop*, *transcriptChanged*, *onError*)
- Real-time transcription with interim results support

#### Telemetry
📄 **Read:** [references/telemetry.md](references/telemetry.md)
- Enabling telemetry with `e-aiassistview-telemetrysettings` tag helper
- Built-in telemetry button in the response toolbar showing the response duration
- Hover tooltip displaying the telemetry report for each response
- Configuring captured metrics with the `metrics` property (`status`, `duration`, `toolCalls`, `streamingChunks`, `model`, `inputTokens`, `outputTokens`, `totalTokens`, `reasoningTokens`, `cachedInputTokens`)
- Customizing reports with the `beforeReport` callback (modify, add custom attributes, or suppress)
- Passing `TelemetryData` to `addPromptResponse` to merge model and token usage details
- Adding domain-specific custom attributes via `customAttributes` on `TelemetryData`
- Turn tracking, button state, tooltip display, duration formatting, total-token computation, and regenerate flow behavior

#### Mentions
📄 **Read:** [references/mentions.md](references/mentions.md)
- Enabling mentions in the prompt editor using the `mentions` property (array of mention settings)
- Mention trigger character with `mentionChar` (e.g., `@`, `/`) and `showMentionChar` toggle for selected mentions
- Data source configuration with `dataSource` (local collection or `DataManager` for remote data)
- Field mappings via `fields` for display text and unique value
- Filtering suggestions with `query`, `filterType` (`Contains`, `StartsWith`, `EndsWith`), and `highlight` properties
- Popup dimensions using `popupWidth` and `popupHeight`
- Customization with `displayTemplate`, `itemTemplate`, and `noRecordsTemplate`
- Handling selection via the `mentionSelect` event with `args.itemData`

## Quick Start

```razor
@using Syncfusion.EJ2.InteractiveChat;

<div class="aiassist-container" style="height: 350px; width: 650px;">
    <ejs-aiassistview id="aiAssistView" promptRequest="onPromptRequest" created="onCreated"></ejs-aiassistview>
</div>

<script>
    var assistObj;
    function onCreated() {
        assistObj = this;
    }
    function onPromptRequest(args) {
        setTimeout(() => {
            let defaultResponse = 'For real-time prompt processing, connect the AI AssistView control to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
            assistObj.addPromptResponse(defaultResponse);
        }, 2000);
    }
</script>
```

## Common Patterns

### Pattern 1: Adding Prompt Suggestions
```razor
@using Syncfusion.EJ2.InteractiveChat;

@{
    var suggestions = new string[] { "How do I prioritize my tasks?", "How can I improve my time management skills?" };
}

<div class="aiassist-container" style="height: 350px; width: 650px;">
    <ejs-aiassistview id="aiAssistView" 
        promptSuggestions="@suggestions" 
        promptRequest="onPromptRequest" 
        created="onCreated">
    </ejs-aiassistview>
</div>

<script>
    var assistObj;
    function onCreated() {
        assistObj = this;
    }
    function onPromptRequest(args) {
        setTimeout(() => {
            assistObj.addPromptResponse('Response for: ' + args.prompt);
        }, 2000);
    }
</script>
```

### Pattern 2: Markdown Response Rendering
```razor
@using Syncfusion.EJ2.InteractiveChat;
@using System.Text.Json;

@{
   var markdownData = new[]
    {
        new {
            prompt = "What is Markdown?",
            response = "# Markdown Guide\n\nMarkdown is a lightweight markup language:\n\n- **Headers:** Use `#`, `##`, `###`\n- **Bold:** `**text**` for bold\n- **Lists:** Use `-` for bullet points",
            suggestions = new string[] {"How do I use bold?"}
        }
    };
    var promptsJson = JsonSerializer.Serialize(markdownData);
}

<div class="aiassist-container" style="height: 350px; width: 650px;">
    <ejs-aiassistview id="aiAssistView" 
        prompts="@markdownData" 
        promptRequest="onPromptRequest" 
        created="onCreated">
    </ejs-aiassistview>
</div>

<script>
    var assistObj;
    var prompts = @Html.Raw(promptsJson);
    function onCreated() {
        assistObj = this;
    }
    function onPromptRequest(args) {
        setTimeout(() => {
            var foundPrompt = prompts.find(prompt => prompt.prompt == args.prompt);
            if (foundPrompt) {
                assistObj.addPromptResponse(foundPrompt.response);
            }
        }, 2000);
    }
</script>
```

### Pattern 3: File Attachments
```razor
@using Syncfusion.EJ2.InteractiveChat;

<div class="aiassist-container" style="height: 350px; width: 650px;">
    <ejs-aiassistview id="aiAssistView" 
        enableAttachments="true" 
        promptRequest="onPromptRequest" 
        created="onCreated">
        <e-aiassistview-attachmentsettings 
            saveUrl=@Url.Content("https://services.syncfusion.com/aspnet/production/api/FileUploader/Save") 
            removeUrl=@Url.Content("https://services.syncfusion.com/aspnet/production/api/FileUploader/Remove")>
        </e-aiassistview-attachmentsettings>
    </ejs-aiassistview>
</div>

<script>
    var assistObj;
    function onCreated() {
        assistObj = this;
    }
    function onPromptRequest(args) {
        setTimeout(() => {
            assistObj.addPromptResponse('Processing your prompt with attachments');
        }, 2000);
    }
</script>
```
