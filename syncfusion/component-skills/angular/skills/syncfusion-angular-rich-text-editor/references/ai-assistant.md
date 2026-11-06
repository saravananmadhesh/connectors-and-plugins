# AI Assistant Integration in Syncfusion Angular Rich Text Editor

## Table of Contents
- [Overview](#overview)
- [Setup and Styles](#setup-and-styles)
- [Basic Integration](#basic-integration)
- [Accessing the AI Assistant](#accessing-the-ai-assistant)
- [AI Assistant Properties](#ai-assistant-properties)
- [Configuring AI Commands](#configuring-ai-commands)
- [Popup Dimensions](#popup-dimensions)
- [Preloading Prompts and Suggestions](#preloading-prompts-and-suggestions)
- [Conversation History](#conversation-history)
- [Custom Toolbar Configuration](#custom-toolbar-configuration)
- [Custom Toolbar Items](#custom-toolbar-items)
- [Styling the AI Assistant Popup](#styling-the-ai-assistant-popup)
- [Handling AI Requests](#handling-ai-requests)
- [Streaming Responses](#streaming-responses)
- [Non-Streaming (Single) Response](#non-streaming-single-response)
- [Stop Responding Event](#stop-responding-event)
- [AI Toolbar Items Reference](#ai-toolbar-items-reference)

---

## Overview

The AI Assistant feature adds an **AssistView** popup to the Rich Text Editor, providing integrated AI capabilities for simplified content creation, editing, and enhancement. Users can:
- Apply predefined AI commands (Improve, Shorten, Elaborate, Simplify, Summarize, Grammar Check)
- Enter custom free-form prompts via the AI Query toolbar item
- Stream AI-generated responses into the editor for a typewriter-like effect
- Customize toolbars, popup dimensions, and AI interaction workflows

**Requires:**
- `AIAssistantService` in providers
- `AICommands` and/or `AIQuery` in toolbar items
- Additional style imports for interactive chat and notifications

The AI Assistant is accessed through two main toolbar items:
1. **AICommands** — Opens a predefined command menu
2. **AIQuery** — Opens a custom prompt input dialog (Alt+Enter / ⌥+Enter)

---

## Basic Integration

```typescript
import { Component, ViewChild } from '@angular/core';
import {
  RichTextEditorModule, RichTextEditorComponent, ToolbarSettingsModel,
  ToolbarService, HtmlEditorService, LinkService, ImageService,
  QuickToolbarService, AIAssistantService, AIAssistantPromptRequestArgs
} from '@syncfusion/ej2-angular-richtexteditor';

@Component({
  imports: [RichTextEditorModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-richtexteditor
      #rte
      [toolbarSettings]="tools"
      (aiAssistantPromptRequest)="onAIRequest($event)">
    </ejs-richtexteditor>
  `,
  providers: [
    ToolbarService, HtmlEditorService, LinkService, ImageService,
    QuickToolbarService, AIAssistantService
  ]
})
export class AppComponent {
  @ViewChild('rte') editor!: RichTextEditorComponent;

  public tools: ToolbarSettingsModel = {
    items: [
      'Bold', 'Italic', '|',
      'AICommands',   // Predefined AI commands (Improve, Shorten, etc.)
      'AIQuery',      // Custom prompt input (Alt+Enter shortcut)
      '|', 'Undo', 'Redo'
    ]
  };

  async onAIRequest(args: AIAssistantPromptRequestArgs): Promise<void> {
    // args.prompt — the selected AI command or user's custom prompt
    // args.text — the currently selected text in the editor
    // Call your AI service and respond with addAIPromptResponse()
    await this.callAIService(args);
  }

  private async callAIService(args: AIAssistantPromptRequestArgs): Promise<void> {
    // See Streaming or Non-Streaming sections below
  }
}
```

---

## Accessing the AI Assistant

The AI Assistant interface can be opened through two main options:

### AI Commands Menu
The **AICommands** toolbar option opens a menu containing predefined AI commands:
- Improve writing
- Shorten content
- Elaborate with detail
- Simplify language
- Summarize text
- Check grammar

### AI Query  
The **AIQuery** toolbar button or keyboard shortcut opens a popup for custom prompts:
- **Windows:** Alt + Enter
- **Mac:** ⌥ + Enter

---

## AI Assistant Properties

The `AIAssistantSettings` class provides full customization via the following properties:

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `commands` | `AICommands[]` | Predefined commands | Defines AI command options in the command dropdown menu |
| `popupMaxHeight` | `string \| number` | `'400px'` | Maximum height of the AI Assistant popup (CSS values or pixels) |
| `popupWidth` | `string \| number` | `'600px'` | Width of the AI Assistant popup (CSS values or pixels) |
| `placeholder` | `string` | `'Ask AI to rewrite or generate content.'` | Placeholder text in the AI prompt textarea |
| `headerToolbarSettings` | `(AssitantHeaderToolbarItems \| IAIAssistantToolbarItem)[]` | `['AIcommands', 'Close']` | Toolbar configuration for header section |
| `promptToolbarSettings` | `(AssistantPromptToolbarItems \| IAIAssistantToolbarItem)[]` | `['Edit', 'Copy']` | Toolbar configuration for prompt input section |
| `responseToolbarSettings` | `(AssistantResponseToolbarItems \| IAIAssistantToolbarItem)[]` | `['Regenerate', 'Copy', '\|', 'Insert']` | Toolbar configuration for response section |
| `prompts` | `PromptModel[]` | `[]` | Collection of preloaded prompts and responses |
| `suggestions` | `string[]` | `[]` | Suggestion prompts displayed to user as guidance |
| `bannerTemplate` | `string \| Function` | `''` | Template for banner displayed above AI Assistant popup |
| `maxPromptHistory` | `number` | `20` | Maximum number of stored prompts in history stack |

---

## Configuring AI Commands

Customize the items displayed in the **AI Commands** dropdown menu using the `commands` property. This allows you to add custom prompts, create nested menu structures, and define AI interactions tailored to your application.

**Example: Custom AI Commands with Nested Items**

```typescript
import { Component } from '@angular/core';
import { RichTextEditorModule, ToolbarService, LinkService, ImageService, HtmlEditorService, QuickToolbarService, AIAssistantService, AIAssistantSettingsModel, ToolbarSettingsModel } from '@syncfusion/ej2-angular-richtexteditor';

@Component({
    imports: [RichTextEditorModule],
    standalone: true,
    templateUrl: 'app.component.html',
    selector: 'app-root',
    providers: [ToolbarService, LinkService, ImageService, HtmlEditorService, QuickToolbarService, AIAssistantService],
})
export class AppComponent {
    public toolbarSettings: ToolbarSettingsModel = { items: ['AICommands', 'AIQuery'] };

    public aiAssistantSettings: AIAssistantSettingsModel = {
        commands: [
            { text: 'Rewrite', prompt: 'Rewrite the content to be more refined.' },
            { text: 'Elaborate', prompt: 'Expand on the following content with more detail and explanation:' },
            {
                text: 'Change Tone',
                items: [
                    { text: 'Professional', prompt: 'Rewrite the following content in a professional tone:' },
                    { text: 'Casual', prompt: 'Rewrite the following content in a casual, conversational tone:' },
                    { text: 'Direct', prompt: 'Rewrite the following content to be more direct and to the point:' },
                ],
            },
        ]
    };
}
```

---

## Popup Dimensions

Customize the size of the AI Assistant popup to fit your editor layout using the `popupWidth` and `popupMaxHeight` properties. The default minimum height is `100px`.

**Example: Custom Popup Size**

```typescript
public aiAssistantSettings: AIAssistantSettingsModel = {
    popupWidth: 500,           // Width in pixels
    popupMaxHeight: 500        // Maximum height in pixels
};
```

You can also use CSS values:
```typescript
public aiAssistantSettings: AIAssistantSettingsModel = {
    popupWidth: '80%',         // 80% of editor width
    popupMaxHeight: '50vh'     // 50% of view height
};
```

---

## Preloading Prompts and Suggestions

Load conversation history and predefined suggestions using the `prompts` and `suggestions` properties. This is useful for returning users or initializing the AI Assistant with default guidance.

**Example: Preloaded Conversations and Suggestions**

```typescript
public aiAssistantSettings: AIAssistantSettingsModel = {
    prompts: [
        { 
            prompt: 'What is Essential Studio ?',
            response: 'Essential Studio is a software toolkit by Syncfusion that offers a variety of UI controls, frameworks, and libraries for developing applications on web, desktop, and mobile platforms. It aims to streamline application development with customizable, pre-built components.'
        }
    ],
    suggestions: [
        'What are the popular components of Essential Studio?',
        'Which web frameworks are supported by Essential Studio?'
    ]
};
```

---

## Conversation History

Track and manage conversation history using the `maxPromptHistory` property and `getAIPromptHistory()` method.

### Setting Maximum History Length

Limit the number of stored prompts using `maxPromptHistory` (default: 20). The conversation is cleared when closing the popup.

### Retrieving Conversation History

Use the `getAIPromptHistory()` method to retrieve all conversation history for saving or displaying previous chat sessions.

**Example: Managing Conversation History**

```html
<ejs-richtexteditor 
    #editor 
    [aiAssistantSettings]="aiAssistantSettings">
</ejs-richtexteditor>
<br>
<button class="e-btn e-primary" (click)="onSaveBtnClick()"><span class="e-icons e-save"></span>Save</button>
```

```typescript
import { Component, ViewChild } from '@angular/core';
import { RichTextEditorModule, ToolbarService, LinkService, ImageService, HtmlEditorService, QuickToolbarService, AIAssistantService, AIAssistantSettingsModel, ToolbarSettingsModel, RichTextEditorComponent } from '@syncfusion/ej2-angular-richtexteditor';
import { PromptModel } from '@syncfusion/ej2-interactive-chat';

@Component({
    imports: [RichTextEditorModule],
    standalone: true,
    templateUrl: 'app.component.html',
    selector: 'app-root',
    providers: [ToolbarService, LinkService, ImageService, HtmlEditorService, QuickToolbarService, AIAssistantService],
})
export class AppComponent {
    @ViewChild('editor')
    public editor!: RichTextEditorComponent;

    public toolbarSettings: ToolbarSettingsModel = { items: ['AICommands', 'AIQuery'] };

    public aiAssistantSettings: AIAssistantSettingsModel = {
        prompts: [
            { 
                prompt: 'What is Essential Studio ?',
                response: 'Essential Studio is a software toolkit by Syncfusion that offers a variety of UI controls, frameworks, and libraries for developing applications on web, desktop, and mobile platforms. It aims to streamline application development with customizable, pre-built components.'
            }
        ],
        maxPromptHistory: 30
    };

    public onSaveBtnClick(): void {
        const promptHistory: PromptModel[] = this.editor.getAIPromptHistory();
        console.log(promptHistory);
        // Handle DB Post and save history to the DB.
    }
}
```

---

## Custom Toolbar Configuration

Configure the order and items of toolbars in the header, prompt input, and response sections using `headerToolbarSettings`, `promptToolbarSettings`, and `responseToolbarSettings`.

### Available Toolbar Items

**Header Toolbar:**
- `AIcommands` – Opens AI-related command options
- `Close` – Closes the AI Assistant
- `Clear` – Clears conversation history

**Prompt Toolbar:**
- `Edit` – Modify prompt text
- `Copy` – Copy prompt to clipboard

**Response Toolbar:**
- `Regenerate` – Generate new response for same prompt
- `Copy` – Copy response to clipboard
- `|` – Visual separator
- `Insert` – Insert response into editor

### Default Toolbar Configurations

```typescript
// Header: ['AIcommands', 'Close']
// Prompt: ['Edit', 'Copy']
// Response: ['Regenerate', 'Copy', '|', 'Insert']
```

**Example: Modified Toolbar Configuration**

```typescript
import { Component } from '@angular/core';
import { RichTextEditorModule, ToolbarService, LinkService, ImageService, HtmlEditorService, QuickToolbarService, AIAssistantService, AIAssistantSettingsModel, ToolbarSettingsModel } from '@syncfusion/ej2-angular-richtexteditor';

@Component({
    imports: [RichTextEditorModule],
    standalone: true,
    templateUrl: 'app.component.html',
    selector: 'app-root',
    providers: [ToolbarService, LinkService, ImageService, HtmlEditorService, QuickToolbarService, AIAssistantService],
})
export class AppComponent {
    public toolbarSettings: ToolbarSettingsModel = { items: ['AICommands', 'AIQuery'] };

    public aiAssistantSettings: AIAssistantSettingsModel = {
        headerToolbarSettings: ['AIcommands', 'Clear', 'Close'],
        promptToolbarSettings: ['Edit'],
        responseToolbarSettings: ['Copy', '|', 'Insert'],
        prompts: [
            { 
                prompt: 'What is Essential Studio ?',
                response: 'Essential Studio is a software toolkit by Syncfusion that offers a variety of UI controls, frameworks, and libraries for developing applications on web, desktop, and mobile platforms. It aims to streamline application development with customizable, pre-built components.'
            }
        ]
    };
}
```

---

## Custom Toolbar Items

Add custom buttons, templates, and interactive elements to the AI Assistant toolbars using the `aiAssistantToolbarClick` event and toolbar item properties.

### Custom Toolbar Item Properties

| Property | Description |
|----------|-------------|
| `command` | Primary command executed when item is clicked |
| `subCommand` | Secondary sub-command for the item |
| `iconCss` | CSS class for the toolbar icon |
| `text` | Display text for the toolbar item |
| `type` | Type of toolbar item (default: `Button`) |
| `align` | Alignment within toolbar (`Left` or `Right`) |
| `visible` | Whether item is visible (default: `true`) |
| `disabled` | Whether item is disabled (default: `false`) |
| `tooltip` | Tooltip text on hover |
| `cssClass` | Additional CSS classes for styling |
| `template` | Custom template for rendering (string or function) |
| `tabIndex` | Tab order for keyboard navigation (default: `-1`) |

**Example: Custom Toolbar Buttons with Event Handling**

```html
<ejs-richtexteditor 
    [aiAssistantSettings]="aiAssistantSettings"
    (aiAssistantToolbarClick)="onAIAssistantToolbarClick($event)"
    (beforePopupOpen)="beforePopupOpen($event)" 
    (beforePopupClose)="beforePopupClose($event)">
</ejs-richtexteditor>
```

```typescript
import { Component } from '@angular/core';
import { RichTextEditorModule, ToolbarService, LinkService, ImageService, HtmlEditorService, QuickToolbarService, AIAssistantService, AIAssistantSettingsModel, ToolbarSettingsModel, AIAssitantToolbarClickEventArgs, BeforePopupOpenCloseEventArgs } from '@syncfusion/ej2-angular-richtexteditor';
import { DropDownButton } from '@syncfusion/ej2-splitbuttons';

@Component({
    imports: [RichTextEditorModule],
    standalone: true,
    templateUrl: 'app.component.html',
    selector: 'app-root',
    providers: [ToolbarService, LinkService, ImageService, HtmlEditorService, QuickToolbarService, AIAssistantService],
})
export class AppComponent {

    public userDropDown!: DropDownButton;

    public aiAssistantSettings: AIAssistantSettingsModel = {
        promptToolbarSettings: ['Edit', 'Copy', { command: 'Prompt', subCommand: 'Search', iconCss: 'e-icons e-open-link', tooltip: 'Search in Google' }],
        responseToolbarSettings: [{ command: 'Response', subCommand: 'Save', iconCss: 'e-icons e-save', tooltip: 'Save Response' }, 'Regenerate', 'Copy', '|', 'Insert'],
        headerToolbarSettings: ['AIcommands', 
            { command: 'Header', subCommand: 'Profile', template: '<button id="profileDropDown" class="e-rte-dropdown-menu"></button>', align: 'Right' }, 'Close',],
        prompts: [
            {
                prompt: 'What is Essential Studio ?',
                response:
                    'Essential Studio is a software toolkit by Syncfusion that offers a variety of UI controls, frameworks, and libraries for developing applications on web, desktop, and mobile platforms. It aims to streamline application development with customizable, pre-built components.',
            },
        ],
    };

    onAIAssistantToolbarClick(args: AIAssitantToolbarClickEventArgs) {
        if (args.item.iconCss === 'e-icons e-open-link') {
            const target: HTMLElement = args.originalEvent.target as HTMLElement;
            const promptContainer: HTMLElement = target.closest('.e-prompt-container') as HTMLElement;
            const prompt = (promptContainer.querySelector('.e-prompt-text') as HTMLElement).textContent;
            window.open(`url${prompt}`, '_blank')
        } else if (args.item.iconCss === 'e-icons e-save') {
            const response = (args as any).event.currentTarget.closest('.e-output-container').querySelector('.e-content-body').innerHTML;
            console.log(response); // Handle Saving response here.
        }
    };

    beforePopupOpen(event: BeforePopupOpenCloseEventArgs) {
        if (event.type === 'AIAssistant') {
            this.userDropDown = new DropDownButton({
                items: [
                    { text: 'Usage', iconCss: 'e-icons e-chart' },
                    { text: 'Saved Response' , iconCss: 'e-icons e-save'},
                    { separator: true },
                    { text: 'Log out', iconCss: 'e-icons e-view-side' }
                ],
                iconCss: 'e-icons e-user',
                cssClass: 'e-caret-hide',
            }, event.element.querySelector('#profileDropDown') as HTMLButtonElement);
        }
    }

    beforePopupClose(event: BeforePopupOpenCloseEventArgs) {
        if (event.type === 'AIAssistant') {
            this.userDropDown.destroy();
        }
    }
}
```

---

## Styling the AI Assistant Popup

Apply custom CSS to style the AI Assistant popup and its processing state.

**Example: Custom Popup Styling**

```css
/* Base popup styling */
.e-rte-aiquery-popup {
    padding: 2px;
}

/* Processing state styling */
.e-rte-aiquery-popup.processing {
    padding: 2px;
    color: white;
    background: white;
    z-index: 1;
}

/* Animated gradient border for processing state */
.e-rte-aiquery-popup.processing::before {
    content: "";
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(270deg, #ff0080, #7928ca, #2afadf, #ff0080);
    background-size: 600% 600%;
    border-radius: 10px;
    animation: gradient-animation 8s ease infinite;
}

.e-rte-aiquery-popup.processing::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: white;
    border-radius: 6px;
    z-index: -1;
}

@keyframes gradient-animation {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
}

```

### Adding a Banner

Display welcome messages, instructions, or important information at the top of the AI Assistant popup using the `bannerTemplate` property.

**Example: Custom Banner Template**

```typescript
public aiAssistantSettings: AIAssistantSettingsModel = {
    bannerTemplate: `<div class="banner-content">
        <div class="e-icons e-assistview-icon"></div>
        <h3>AI Assistant</h3>
        <i>AI-generated results can be error-prone; review them carefully.</i>
    </div>`
};
```

---

## Handling AI Requests

**Security Warning**
 
The Rich Text Editor does not handle or send requests to AI provider endpoints. All AI interactions must be processed at the application layer (preferably in the backend).
 
Ensure that:
 
* AI inputs are validated and moderated on the backend.
* API keys and secrets are never exposed in request bodies or client-side code.
* All requests to AI services are securely routed and managed through backend systems.

The `aiAssistantPromptRequest` event fires when the user selects an AI command or submits a custom prompt. This event provides the necessary data to forward the request to your AI service.

**Event Properties:**
- `args.prompt` — The AI command text or user's custom prompt
- `args.text` — The currently selected text in the editor at the time of request

---

## Streaming Responses

Provides a typewriter-like streaming effect as chunks arrive:

```typescript
async onAIRequest(args: AIAssistantPromptRequestArgs): Promise<void> {
  try {
    const response: Response = await fetch('/api/ai/stream', {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json',
        "Authorization": 'HANDLE_AUTH_HERE'
      },
      body: JSON.stringify({ message: args.prompt + args.text }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error);
    }

    const stream: ReadableStream<string> = response.body.pipeThrough(new TextDecoderStream());
    let fullText: string = '';

    for await (const chunk of stream as unknown as AsyncIterable<string>) {
      fullText += chunk;
      // Updates the UI with each chunk for a streaming effect
      this.editor.addAIPromptResponse(fullText, false);
    }

    // Final update to signal the end of the stream
    this.editor.addAIPromptResponse(fullText, true);
  } catch (error) {
    console.error('AI request failed:', error);
  }
}
```

> Note: `addAIPromptResponse(content, finalUpdate)` converts the provided Markdown response into HTML using the `@syncfusion/ej2-markdown-converter` package.

---

## Non-Streaming (Single) Response

A complete response can be inserted at once by setting the `finalUpdate` parameter to `true`. While the response is being processed, a loading skeleton is displayed in the AssistView.

```typescript
async onAIRequest(args: AIAssistantPromptRequestArgs): Promise<void> {
  const response: Response = await fetch('/api/ai/stream', {
    method: 'POST',
    headers: {
      "Content-Type": 'application/json',
      "Authorization": 'HANDLE_AUTH_HERE'
    },
    body: JSON.stringify({ message: args.prompt + args.text }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data: string = await response.text();
  this.editor.addAIPromptResponse(data, true);
}
```

---

## Stop Responding Event

Fires when the user clicks the "Stop Responding" button. Use the `aiAssistantStopRespondingClick` event to cancel active fetch/streaming operations:

```html
<ejs-richtexteditor
  (aiAssistantPromptRequest)="onAIRequest($event)"
  (aiAssistantStopRespondingClick)="onStopResponding($event)">
</ejs-richtexteditor>
```

```typescript
@Component({
  selector: 'app-root',
  template: `
    <ejs-richtexteditor
      (aiAssistantPromptRequest)="onAIRequest($event)"
      (aiAssistantStopRespondingClick)="onStopResponding($event)">
    </ejs-richtexteditor>
  `
})
export class AppComponent {
  private abortController: AbortController | null = null;

  async onAIRequest(args: AIAssistantPromptRequestArgs): Promise<void> {
    this.abortController = new AbortController();
    try {
      const response = await fetch('/api/stream', {
        method: 'POST',
        signal: this.abortController.signal,
        body: JSON.stringify({ message: args.prompt + args.text })
      });
      // ... handle streaming
    } catch (err: Error) {
      if (err.name !== 'AbortError') throw err;
    }
  }

  onStopResponding(args: AIAssistantStopRespondingArgs): void {
    this.abortController?.abort();
  }
}
```

---

## AI Toolbar Items Reference

| Toolbar item | Description |
|---|---|
| `AICommands` | Opens predefined command menu: Improve, Shorten, Elaborate, Simplify, Summarize, Grammar Check |
| `AIQuery` | Opens popup for custom prompt input. Keyboard shortcut: **Alt+Enter** (Win) / **⌥+Enter** (Mac) |
