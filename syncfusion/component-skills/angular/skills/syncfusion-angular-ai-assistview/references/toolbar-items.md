# Toolbar Configuration and Customization

## Overview

The AI AssistView component provides **four distinct toolbar types** to customize user interactions at different levels of the component. Each toolbar serves a specific purpose and can be independently configured with custom items and event handlers.

### The Four Toolbar Types

1. **Header Toolbar** (`toolbarSettings`) - Main toolbar at the top of the component
2. **Prompt Toolbar** (`promptToolbarSettings`) - Toolbar attached to each prompt item
3. **Response Toolbar** (`responseToolbarSettings`) - Toolbar attached to each response item
4. **Footer Toolbar** (`footerToolbarSettings`) - Toolbar in the footer/input area

---

## Table of Contents
- [Header Toolbar Configuration](#header-toolbar-configuration)
- [Prompt Toolbar Configuration](#prompt-toolbar-configuration)
- [Response Toolbar Configuration](#response-toolbar-configuration)
- [Regenerate Responses](#regenerate-responses)
- [Footer Toolbar Configuration](#footer-toolbar-configuration)
- [ToolbarItemModel Reference](#toolbaritemmodel-reference)
- [Setting Alignment](#setting-alignment)
- [Event Handling](#event-handling)
- [Common Patterns](#common-patterns)
- [Best Practices](#best-practices)
- [Styling Toolbars](#styling-toolbars)
- [Troubleshooting](#troubleshooting)

---

## Header Toolbar Configuration

The `toolbarSettings` property configures the main toolbar at the top of the AI AssistView component. This is ideal for global actions like creating new conversations, accessing settings, or exporting data.

### Basic Header Toolbar

**Using Tag Directive Approach:**

```ts
import { Component, ViewChild } from '@angular/core';
import { AIAssistViewModule, AIAssistViewComponent, ToolbarItemClickedEventArgs } from '@syncfusion/ej2-angular-interactive-chat';

@Component({
  imports: [AIAssistViewModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div ejs-aiassistview 
      #aiAssistViewComponent
      id='aiAssistView'
      (promptRequest)="onPromptRequest($event)">
      <e-toolbarsettings (itemClicked)="onHeaderToolbarClick($event)">
        <e-toolbaritems>
          <e-toolbaritem type="Button" iconCss="e-icons e-refresh" tooltip="New Conversation"></e-toolbaritem>
          <e-toolbaritem type="Button" iconCss="e-icons e-download" tooltip="Export Chat"></e-toolbaritem>
          <e-toolbaritem type="Button" iconCss="e-icons e-settings" tooltip="Settings" align="Right"></e-toolbaritem>
        </e-toolbaritems>
      </e-toolbarsettings>
    </div>
  `
})
export class AppComponent {
  @ViewChild('aiAssistViewComponent')
  public aiAssistViewComponent!: AIAssistViewComponent;

  onHeaderToolbarClick(args: ToolbarItemClickedEventArgs) {
    console.log('Header toolbar item clicked:', args.item);
    
    if (args.item.iconCss?.includes('e-refresh')) {
      console.log('Starting new conversation...');
    } else if (args.item.iconCss?.includes('e-download')) {
      console.log('Exporting chat...');
    } else if (args.item.iconCss?.includes('e-settings')) {
      console.log('Opening settings...');
    }
  }

  onPromptRequest(args: any) {
    setTimeout(() => {
      this.aiAssistViewComponent.addPromptResponse('Response from AI service...');
    }, 1000);
  }
}
```

### ToolbarSettingsModel Properties

| Property | Type | Description |
|----------|------|-------------|
| `items` | ToolbarItemModel[] | Collection of toolbar items to display in the header |
| `itemClicked` | EmitType<ToolbarItemClickedEventArgs> | Event triggered when a toolbar item is clicked |

### When to Use Header Toolbar

- **Global actions:** New conversation, clear all, settings
- **Navigation:** Switch between views or modes
- **Export/Import:** Save or load conversation data
- **User profile:** Account settings, preferences

---

## Prompt Toolbar Configuration

The `promptToolbarSettings` property configures toolbars that appear with each prompt item. This allows users to interact with their own prompts (edit, copy, delete).

### Basic Prompt Toolbar

```ts
import { Component, ViewChild } from '@angular/core';
import { AIAssistViewModule, AIAssistViewComponent, PromptToolbarSettingsModel, ToolbarItemClickedEventArgs, PromptRequestEventArgs } from '@syncfusion/ej2-angular-interactive-chat';

@Component({
  imports: [AIAssistViewModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div ejs-aiassistview 
      #aiAssistViewComponent
      id='aiAssistView'
      [promptToolbarSettings]="promptToolbarSettings"
      [prompts]="promptsData"
      (promptRequest)="onPromptRequest($event)">
    </div>
  `
})
export class AppComponent {
  @ViewChild('aiAssistViewComponent')
  public aiAssistViewComponent!: AIAssistViewComponent;

  public promptsData = [
    {
      prompt: "What is AI?",
      response: "AI stands for Artificial Intelligence, enabling machines to mimic human intelligence for tasks such as learning, problem-solving, and decision-making."
    }
  ];

  public promptToolbarSettings: PromptToolbarSettingsModel = {
    items: [
      { type: 'Button', iconCss: 'e-icons e-edit', tooltip: 'Edit Prompt' },
      { type: 'Button', iconCss: 'e-icons e-copy', tooltip: 'Copy Prompt' }
    ],
    itemClicked: this.onPromptToolbarClick.bind(this)
  };

  onPromptToolbarClick(args: ToolbarItemClickedEventArgs) {
    console.log('Prompt toolbar clicked:', args);
    console.log('Prompt index:', args.dataIndex);
    
    const promptData = this.promptsData[args.dataIndex];
    
    if (args.item.iconCss?.includes('e-edit')) {
      // Handle edit action
      console.log('Editing prompt:', promptData.prompt);
    } else if (args.item.iconCss?.includes('e-copy')) {
      // Handle copy action
      navigator.clipboard.writeText(promptData.prompt);
    }
  }

  onPromptRequest(args: PromptRequestEventArgs) {
    setTimeout(() => {
      this.aiAssistViewComponent.addPromptResponse('Response from AI service...');
    }, 1000);
  }
}
```

### PromptToolbarSettingsModel Properties

| Property | Type | Description |
|----------|------|-------------|
| `items` | ToolbarItemModel[] | Collection of toolbar items for prompt items |
| `width` | string \| number | Width of the prompt toolbar |
| `itemClicked` | EmitType<ToolbarItemClickedEventArgs> | Event triggered when a prompt toolbar item is clicked |

### When to Use Prompt Toolbar

- **Edit prompt:** Allow users to modify their previous prompts
- **Copy prompt:** Copy prompt text to clipboard
- **Retry prompt:** Re-submit the same prompt for a new response
- **Delete prompt:** Remove a specific prompt from history

---

## Response Toolbar Configuration

The `responseToolbarSettings` property configures toolbars that appear with each response item. This is essential for feedback, copying responses, and regenerating answers.

### Basic Response Toolbar

**Using Tag Directive Approach:**

```ts
import { Component, ViewChild } from '@angular/core';
import { AIAssistViewModule, AIAssistViewComponent, ToolbarItemClickedEventArgs, PromptRequestEventArgs } from '@syncfusion/ej2-angular-interactive-chat';

@Component({
  imports: [AIAssistViewModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div ejs-aiassistview 
      #aiAssistViewComponent
      id='aiAssistView'
      [prompts]="promptsData"
      (promptRequest)="onPromptRequest($event)">
      <e-responsetoolbarsettings (itemClicked)="onResponseToolbarClick($event)">
        <e-toolbaritems>
          <e-toolbaritem type="Button" iconCss="e-icons e-copy" tooltip="Copy Response"></e-toolbaritem>
          <e-toolbaritem type="Button" iconCss="e-icons e-refresh" tooltip="Regenerate"></e-toolbaritem>
          <e-toolbaritem type="Button" iconCss="e-icons e-assist-like" tooltip="Like"></e-toolbaritem>
          <e-toolbaritem type="Button" iconCss="e-icons e-assist-dislike" tooltip="Dislike"></e-toolbaritem>
        </e-toolbaritems>
      </e-responsetoolbarsettings>
    </div>
  `
})
export class AppComponent {
  @ViewChild('aiAssistViewComponent')
  public aiAssistViewComponent!: AIAssistViewComponent;

  public promptsData = [
    {
      prompt: "What is AI?",
      response: "AI stands for Artificial Intelligence, enabling machines to mimic human intelligence for tasks such as learning, problem-solving, and decision-making."
    }
  ];

  onResponseToolbarClick(args: ToolbarItemClickedEventArgs) {
    console.log('Response toolbar clicked:', args);
    console.log('Response index:', args.dataIndex);
    
    if (args.dataIndex === undefined || args.dataIndex < 0) {
      console.error('Invalid data index');
      return;
    }
    
    const responseData = this.promptsData[args.dataIndex];
    
    if (args.item.iconCss?.includes('e-copy')) {
      // Copy response to clipboard
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = responseData.response;
      navigator.clipboard.writeText(tempDiv.textContent || '');
      console.log('Response copied!');
    } else if (args.item.iconCss?.includes('e-refresh')) {
      // Regenerate response
      this.regenerateResponse(args.dataIndex);
    } else if (args.item.iconCss?.includes('e-assist-like')) {
      // Mark as helpful
      this.promptsData[args.dataIndex].isResponseHelpful = true;
      console.log('Response marked as helpful');
    } else if (args.item.iconCss?.includes('e-assist-dislike')) {
      // Mark as not helpful
      this.promptsData[args.dataIndex].isResponseHelpful = false;
      console.log('Response marked as not helpful');
    }
  }

  regenerateResponse(index: number) {
    const prompt = this.promptsData[index].prompt;
    // Call AI service again with the same prompt
    console.log('Regenerating response for:', prompt);
    
    // Simulate API call
    setTimeout(() => {
      this.promptsData[index].response = 'Regenerated response for: ' + prompt;
      this.aiAssistViewComponent.addPromptResponse(this.promptsData[index].response);
    }, 1000);
  }

  onPromptRequest(args: PromptRequestEventArgs) {
    setTimeout(() => {
      this.aiAssistViewComponent.addPromptResponse('Response from AI service...');
    }, 1000);
  }
}
```

### ResponseToolbarSettingsModel Properties

| Property | Type | Description |
|----------|------|-------------|
| `items` | ToolbarItemModel[] | Collection of toolbar items for response items |
| `width` | string \| number | Width of the response toolbar |
| `itemClicked` | EmitType<ToolbarItemClickedEventArgs> | Event triggered when a response toolbar item is clicked |

### When to Use Response Toolbar

- **Copy response:** Copy AI response to clipboard
- **Regenerate:** Request a new response for the same prompt
- **Feedback:** Like/dislike buttons for response quality
- **Share:** Share response via social media or email
- **Save:** Save specific responses to favorites

---

## Regenerate Responses

The AI AssistView supports a `regenerate` action that lets users request an alternative AI response for an existing prompt, without resubmitting the original query. Navigation buttons (`previous`/`next`) are rendered alongside the response (e.g., `1 / 3`), letting users move between all regenerated responses for that prompt.

> The navigation UI appears automatically once more than one response is available for a prompt — either because the user triggered a regenerate, or because multiple responses were pre-loaded via the `regeneratedResponses` property in the `prompts` collection.

### Adding the Regenerate Item

Enable the regenerate button by adding the `e-assist-regenerate` icon to the `items` collection of `responseToolbarSettings`.

```ts
public responseToolbarSettings: ResponseToolbarSettingsModel = {
    items: [
      { type: 'Button', iconCss: 'e-icons e-copy', tooltip: 'Copy Response' },
      { type: 'Button', iconCss: 'e-icons e-assist-regenerate', tooltip: 'Regenerate' },
      { type: 'Button', iconCss: 'e-icons e-assist-like', tooltip: 'Helpful' }
    ]
};
```

### Handling a Regenerated Response

When the user clicks regenerate, the component fires the `promptRequest` event with the existing prompt — enabling you to call your AI service again and push the new response via `addPromptResponse`. Regenerated responses are accumulated automatically into the prompt's `regeneratedResponses` array, and the navigation UI lets users step through them.

```ts
import { AIAssistViewModule } from '@syncfusion/ej2-angular-interactive-chat';
import { Component, ViewChild } from '@angular/core';
import { AIAssistViewComponent, ResponseToolbarSettingsModel } from '@syncfusion/ej2-angular-interactive-chat';
import { PromptRequestEventArgs, PromptModel } from '@syncfusion/ej2-interactive-chat';

@Component({
    imports: [ AIAssistViewModule ],
    standalone: true,
    selector: 'app-root',
    template: `<div ejs-aiassistview #aiAssistViewComponent (promptRequest)="onPromptRequest($event)" [responseToolbarSettings]="responseToolbarSettings" [prompts]="promptsData"></div>`
})
export class AppComponent {
    @ViewChild('aiAssistViewComponent')
    public aiAssistViewComponent!: AIAssistViewComponent;

    public promptsData: PromptModel[] = [
        {
            prompt: "What is AI?",
            response: "AI stands for Artificial Intelligence..."
        }
    ];

    public responseToolbarSettings: ResponseToolbarSettingsModel = {
        items: [
            { type: 'Button', iconCss: 'e-icons e-copy', tooltip: 'Copy Response' },
            { type: 'Button', iconCss: 'e-icons e-assist-regenerate', tooltip: 'Regenerate' },
            { type: 'Button', iconCss: 'e-icons e-assist-like', tooltip: 'Helpful' },
            { type: 'Button', iconCss: 'e-icons e-assist-dislike', tooltip: 'Not Helpful' }
        ],
        itemClicked: this.onResponseToolbarClick.bind(this)
    };

    onResponseToolbarClick(args: any) {
        // Handle regenerate click - regenerated responses auto-accumulate
    }

    onPromptRequest(args: PromptRequestEventArgs) {
        // Call AI service and push response via addPromptResponse()
        setTimeout(() => {
            this.aiAssistViewComponent.addPromptResponse("New AI response...");
        }, 1000);
    }
}
```

### Pre-Loading Regenerated Responses

Use the `regeneratedResponses` property in the `prompts` collection to pre-load multiple responses for a prompt at initial render, without requiring the user to trigger a regenerate action first. Users can navigate between the pre-loaded responses using the `previous`/`next` buttons in the response navigation UI.

```ts
import { AIAssistViewModule } from '@syncfusion/ej2-angular-interactive-chat';
import { Component, ViewChild } from '@angular/core';
import { AIAssistViewComponent, ResponseToolbarSettingsModel } from '@syncfusion/ej2-angular-interactive-chat';
import { PromptRequestEventArgs, PromptModel } from '@syncfusion/ej2-interactive-chat';

@Component({
    imports: [ AIAssistViewModule ],
    standalone: true,
    selector: 'app-root',
    template: `<div ejs-aiassistview #aiAssistViewComponent (promptRequest)="onPromptRequest($event)" [responseToolbarSettings]="responseToolbarSettings" [prompts]="promptsData"></div>`
})
export class AppComponent {
    @ViewChild('aiAssistViewComponent')
    public aiAssistViewComponent!: AIAssistViewComponent;

    public promptsData: PromptModel[] = [
        {
            prompt: "What is AI?",
            response: "AI stands for Artificial Intelligence...",
            regeneratedResponses: [
                "AI is the simulation of human intelligence...",
                "Artificial Intelligence enables machines to learn from data..."
            ]
        }
    ];

    public responseToolbarSettings: ResponseToolbarSettingsModel = {
        items: [
            { type: 'Button', iconCss: 'e-icons e-copy', tooltip: 'Copy Response' },
            { type: 'Button', iconCss: 'e-icons e-assist-regenerate', tooltip: 'Regenerate' },
            { type: 'Button', iconCss: 'e-icons e-assist-like', tooltip: 'Helpful' },
            { type: 'Button', iconCss: 'e-icons e-assist-dislike', tooltip: 'Not Helpful' }
        ],
        itemClicked: this.onResponseToolbarClick.bind(this)
    };

    onResponseToolbarClick(args: any) {
        // Handle clicks
    }

    onPromptRequest(args: PromptRequestEventArgs) {
        // Handle new prompts
    }
}
```

### PromptModel Property Reference (Regenerate)

| Property | Type | Description |
|----------|------|-------------|
| `regeneratedResponses` | `string[]` | Pre-loaded array of alternative responses for a prompt, navigable via the `previous`/`next` response navigation UI. |

---

## Footer Toolbar Configuration

The `footerToolbarSettings` property configures a toolbar in the footer/input area of the component. This is useful for formatting options, attachments, or quick actions related to prompt input.

### Basic Footer Toolbar

```ts
import { Component, ViewChild } from '@angular/core';
import { AIAssistViewModule, AIAssistViewComponent, FooterToolbarSettingsModel, ToolbarItemClickedEventArgs } from '@syncfusion/ej2-angular-interactive-chat';

@Component({
  imports: [AIAssistViewModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div ejs-aiassistview 
      #aiAssistViewComponent
      id='aiAssistView'
      [footerToolbarSettings]="footerToolbarSettings"
      (promptRequest)="onPromptRequest($event)">
    </div>
  `
})
export class AppComponent {
  @ViewChild('aiAssistViewComponent')
  public aiAssistViewComponent!: AIAssistViewComponent;

  public footerToolbarSettings: FooterToolbarSettingsModel = {
    items: [
      { type: 'Button', iconCss: 'e-icons e-bold', tooltip: 'Bold' },
      { type: 'Button', iconCss: 'e-icons e-italic', tooltip: 'Italic' },
      { type: 'Button', iconCss: 'e-icons e-attach', tooltip: 'Attach File' }
    ],
    toolbarPosition: 'Top', // or 'Bottom'
    itemClick: this.onFooterToolbarClick.bind(this)
  };

  onFooterToolbarClick(args: ToolbarItemClickedEventArgs) {
    console.log('Footer toolbar clicked:', args.item);
    
    if (args.item.iconCss?.includes('e-bold')) {
      // Toggle bold formatting
      console.log('Bold formatting toggled');
    } else if (args.item.iconCss?.includes('e-attach')) {
      // Open file picker
      console.log('File attachment triggered');
    }
  }

  onPromptRequest(args: any) {
    setTimeout(() => {
      this.aiAssistViewComponent.addPromptResponse('Response from AI service...');
    }, 1000);
  }
}
```

### FooterToolbarSettingsModel Properties

| Property | Type | Description |
|----------|------|-------------|
| `items` | ToolbarItemModel[] | Collection of toolbar items for the footer |
| `toolbarPosition` | ToolbarPosition \| string | Position of toolbar: 'Top' or 'Bottom' |
| `itemClick` | EmitType<ToolbarItemClickedEventArgs> | Event triggered when a footer toolbar item is clicked |

### When to Use Footer Toolbar

- **Text formatting:** Bold, italic, code formatting
- **File attachments:** Upload documents or images
- **Quick templates:** Insert predefined prompts
- **Voice input:** Trigger speech-to-text
- **Emoji picker:** Add emojis to prompts

---

## ToolbarItemModel Reference

Each toolbar item in the AI AssistView uses the `ToolbarItemModel` interface. Understanding these properties allows for complete customization of toolbar behavior and appearance.

### Complete ToolbarItemModel Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `type` | ItemType | 'Button' | Type of toolbar item: 'Button', 'Separator', 'Input' |
| `text` | string | '' | Display text for the toolbar item |
| `iconCss` | string | '' | CSS class for the icon (e.g., 'e-icons e-copy') |
| `tooltip` | string | '' | Tooltip text shown on hover |
| `align` | ItemAlign | 'Left' | Alignment: 'Left', 'Center', 'Right' |
| `disabled` | boolean | false | Whether the item is disabled |
| `visible` | boolean | true | Whether the item is visible |
| `cssClass` | string | '' | Additional CSS classes for styling |
| `tabIndex` | number | -1 | Tab order for keyboard navigation (0 or positive for focusable) |
| `template` | string \| object | '' | Custom template for the toolbar item |

### Example: Complete Toolbar Item Configuration

```ts
public toolbarSettings: ToolbarSettingsModel = {
  items: [
    {
      type: 'Button',
      text: 'New Chat',
      iconCss: 'e-icons e-plus',
      tooltip: 'Start a new conversation',
      align: 'Left',
      disabled: false,
      visible: true,
      cssClass: 'primary-action',
      tabIndex: 1
    },
    {
      type: 'Separator',
      align: 'Left'
    },
    {
      type: 'Button',
      iconCss: 'e-icons e-settings',
      tooltip: 'Settings',
      align: 'Right',
      cssClass: 'settings-button',
      tabIndex: 2
    }
  ]
};
```

---

## Setting Alignment

You can change the alignment of a toolbar item by using the `align` property. It supports three alignment values: `Left`, `Center`, and `Right`. By default, the value is `Left`.

The `align` property is available on every `ToolbarItemModel` entry and works across all four toolbar types (`toolbarSettings`, `promptToolbarSettings`, `responseToolbarSettings`, `footerToolbarSettings`).

### Example: Right-Aligned Toolbar Item

```typescript
import { AIAssistViewModule } from '@syncfusion/ej2-angular-interactive-chat';

import { Component, ViewChild } from '@angular/core';
import { AIAssistViewComponent, ToolbarSettingsModel } from '@syncfusion/ej2-angular-interactive-chat';
import { PromptRequestEventArgs } from '@syncfusion/ej2-interactive-chat';


@Component({
    imports: [ AIAssistViewModule ],
    standalone: true,
    selector: 'app-root',
    // specifies the template string for the AI AssistView component
    template: `<div ejs-aiassistview #aiAssistViewComponent (promptRequest)="onPromptRequest($event)" [toolbarSettings]="toolbarSettings"></div>`
})

export class AppComponent {
    @ViewChild('aiAssistViewComponent')
    public aiAssistViewComponent!: AIAssistViewComponent;

    public toolbarSettings: ToolbarSettingsModel = {
        items: [ { iconCss: 'e-icons e-refresh', align: 'Right' } ]
    };

    public onPromptRequest = (args: PromptRequestEventArgs) => {
        setTimeout(() => {
            let defaultResponse = 'For real-time prompt processing, connect the AIAssistView component to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
            this.aiAssistViewComponent.addPromptResponse(defaultResponse);
        }, 1000);
    };
}
```

```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app.component';
bootstrapApplication(AppComponent).catch((err) => console.error(err));
```

### Supported Alignment Values

| Value | Description |
|-------|-------------|
| `'Left'` | (Default) The item is rendered on the left edge of the toolbar. |
| `'Center'` | The item is rendered in the center of the toolbar. |
| `'Right'` | The item is rendered on the right edge of the toolbar — useful for secondary actions such as "Settings" or "Export". |

### Tips

- Use `align: 'Right'` for secondary or utility actions (Settings, Export, Help) so they don't compete visually with primary left-side actions (New Chat, Refresh).
- All items in a single toolbar with the same `align` value are grouped together in DOM order; mixing alignments gives you a left- and right-aligned layout in the same toolbar.
- The `align` property can be set via the `<e-toolbaritem align="Right">` tag-directive form or through the `ToolbarItemModel.align` property in the property-binding form.
- The setting is purely visual; it does not affect the click order or `itemClicked` event flow.

---

## Event Handling

All four toolbar types use the `ToolbarItemClickedEventArgs` interface for event handling. This provides consistent access to toolbar item information and context.

### ToolbarItemClickedEventArgs Properties

| Property | Type | Description |
|----------|------|-------------|
| `item` | ToolbarItemModel | The toolbar item that was clicked |
| `event` | Event | The original DOM event |
| `cancel` | boolean | Set to true to cancel the default action |
| `dataIndex` | number | Index of the prompt/response (for prompt/response toolbars) |
| `name` | string | Name of the event |

### Example: Advanced Event Handling

```ts
onToolbarClick(args: ToolbarItemClickedEventArgs) {
  // Prevent default action if needed
  if (someCondition) {
    args.cancel = true;
    return;
  }

  // Access the clicked item
  const item = args.item;
  console.log('Clicked item:', item.text, item.iconCss);

  // Access data index (for prompt/response toolbars)
  if (args.dataIndex !== undefined) {
    console.log('Interacting with item at index:', args.dataIndex);
    const data = this.promptsData[args.dataIndex];
  }

  // Access the original DOM event
  const clickEvent = args.event;
  console.log('Click coordinates:', clickEvent.clientX, clickEvent.clientY);
}
```

---

## Common Patterns

### Pattern 1: Complete Toolbar Setup (All Four Types)

```ts
import { Component, ViewChild } from '@angular/core';
import { 
  AIAssistViewModule, 
  AIAssistViewComponent,
  ToolbarSettingsModel,
  PromptToolbarSettingsModel,
  ResponseToolbarSettingsModel,
  FooterToolbarSettingsModel,
  ToolbarItemClickedEventArgs
} from '@syncfusion/ej2-angular-interactive-chat';

@Component({
  imports: [AIAssistViewModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div ejs-aiassistview 
      #aiAssistViewComponent
      id='aiAssistView'
      [toolbarSettings]="toolbarSettings"
      [promptToolbarSettings]="promptToolbarSettings"
      [responseToolbarSettings]="responseToolbarSettings"
      [footerToolbarSettings]="footerToolbarSettings"
      [prompts]="promptsData"
      (promptRequest)="onPromptRequest($event)">
    </div>
  `
})
export class AppComponent {
  @ViewChild('aiAssistViewComponent')
  public aiAssistViewComponent!: AIAssistViewComponent;

  public promptsData = [
    {
      prompt: "What is AI?",
      response: "AI stands for Artificial Intelligence..."
    }
  ];

  // Header toolbar
  public toolbarSettings: ToolbarSettingsModel = {
    items: [
      { type: 'Button', iconCss: 'e-icons e-refresh', tooltip: 'New Chat' },
      { type: 'Button', iconCss: 'e-icons e-download', tooltip: 'Export', align: 'Right' }
    ],
    itemClicked: this.onHeaderToolbarClick.bind(this)
  };

  // Prompt toolbar
  public promptToolbarSettings: PromptToolbarSettingsModel = {
    items: [
      { type: 'Button', iconCss: 'e-icons e-edit', tooltip: 'Edit' },
      { type: 'Button', iconCss: 'e-icons e-copy', tooltip: 'Copy' }
    ],
    itemClicked: this.onPromptToolbarClick.bind(this)
  };

  // Response toolbar
  public responseToolbarSettings: ResponseToolbarSettingsModel = {
    items: [
      { type: 'Button', iconCss: 'e-icons e-copy', tooltip: 'Copy' },
      { type: 'Button', iconCss: 'e-icons e-refresh', tooltip: 'Regenerate' },
      { type: 'Button', iconCss: 'e-icons e-assist-like', tooltip: 'Like' },
      { type: 'Button', iconCss: 'e-icons e-assist-dislike', tooltip: 'Dislike' }
    ],
    itemClicked: this.onResponseToolbarClick.bind(this)
  };

  // Footer toolbar
  public footerToolbarSettings: FooterToolbarSettingsModel = {
    items: [
      { type: 'Button', iconCss: 'e-icons e-attach', tooltip: 'Attach' }
    ],
    toolbarPosition: 'Top',
    itemClick: this.onFooterToolbarClick.bind(this)
  };

  onHeaderToolbarClick(args: ToolbarItemClickedEventArgs) {
    console.log('Header toolbar:', args.item);
  }

  onPromptToolbarClick(args: ToolbarItemClickedEventArgs) {
    console.log('Prompt toolbar at index:', args.dataIndex);
  }

  onResponseToolbarClick(args: ToolbarItemClickedEventArgs) {
    console.log('Response toolbar at index:', args.dataIndex);
  }

  onFooterToolbarClick(args: ToolbarItemClickedEventArgs) {
    console.log('Footer toolbar:', args.item);
  }

  onPromptRequest(args: any) {
    setTimeout(() => {
      this.aiAssistViewComponent.addPromptResponse('AI response...');
    }, 1000);
  }
}
```

### Pattern 2: Dynamic Toolbar Items

```ts
@Component({
  imports: [AIAssistViewModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div ejs-aiassistview 
      #aiAssistViewComponent
      id='aiAssistView'
      [responseToolbarSettings]="responseToolbarSettings"
      [prompts]="promptsData"
      (promptRequest)="onPromptRequest($event)">
    </div>
  `
})
export class AppComponent {
  @ViewChild('aiAssistViewComponent')
  public aiAssistViewComponent!: AIAssistViewComponent;

  public promptsData = [];
  public responseToolbarSettings: ResponseToolbarSettingsModel = {
    items: this.getResponseToolbarItems(),
    itemClicked: this.onResponseToolbarClick.bind(this)
  };

  getResponseToolbarItems() {
    const items = [
      { type: 'Button', iconCss: 'e-icons e-copy', tooltip: 'Copy' }
    ];

    // Add regenerate only for certain conditions
    if (this.canRegenerate()) {
      items.push({ type: 'Button', iconCss: 'e-icons e-refresh', tooltip: 'Regenerate' });
    }

    // Add feedback buttons
    items.push(
      { type: 'Button', iconCss: 'e-icons e-assist-like', tooltip: 'Like' },
      { type: 'Button', iconCss: 'e-icons e-assist-dislike', tooltip: 'Dislike' }
    );

    return items;
  }

  canRegenerate(): boolean {
    // Your logic to determine if regenerate is available
    return true;
  }

  updateToolbarItems() {
    // Dynamically update toolbar items
    this.responseToolbarSettings = {
      ...this.responseToolbarSettings,
      items: this.getResponseToolbarItems()
    };
  }

  onResponseToolbarClick(args: ToolbarItemClickedEventArgs) {
    // Handle clicks
  }

  onPromptRequest(args: any) {
    // Handle prompt
  }
}
```

### Pattern 3: Conditional Toolbar Display

```ts
@Component({
  imports: [AIAssistViewModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div ejs-aiassistview 
      #aiAssistViewComponent
      id='aiAssistView'
      [promptToolbarSettings]="promptToolbarSettings"
      [prompts]="promptsData">
    </div>
  `
})
export class AppComponent {
  @ViewChild('aiAssistViewComponent')
  public aiAssistViewComponent!: AIAssistViewComponent;

  userRole = 'admin'; // or 'user'
  public promptsData = [];

  get promptToolbarSettings(): PromptToolbarSettingsModel {
    const items = [
      { type: 'Button', iconCss: 'e-icons e-copy', tooltip: 'Copy' }
    ];

    // Only admins can edit
    if (this.userRole === 'admin') {
      items.push({ type: 'Button', iconCss: 'e-icons e-edit', tooltip: 'Edit' });
      items.push({ type: 'Button', iconCss: 'e-icons e-trash', tooltip: 'Delete' });
    }

    return {
      items: items,
      itemClicked: this.onPromptToolbarClick.bind(this)
    };
  }

  onPromptToolbarClick(args: ToolbarItemClickedEventArgs) {
    // Handle clicks
  }
}
```

---

## Best Practices

### 1. Keep Toolbar Items Focused

**✅ Do:**
```ts
// Clear, specific actions
items: [
  { iconCss: 'e-icons e-copy', tooltip: 'Copy' },
  { iconCss: 'e-icons e-refresh', tooltip: 'Regenerate' }
]
```

**❌ Don't:**
```ts
// Too many items, unclear purpose
items: [
  { iconCss: 'e-icons e-copy', tooltip: 'Copy' },
  { iconCss: 'e-icons e-save', tooltip: 'Save' },
  { iconCss: 'e-icons e-export', tooltip: 'Export' },
  { iconCss: 'e-icons e-share', tooltip: 'Share' },
  { iconCss: 'e-icons e-print', tooltip: 'Print' },
  { iconCss: 'e-icons e-email', tooltip: 'Email' }
]
```

### 2. Use Appropriate Toolbar Types

- **Header:** Global actions (new, settings, export)
- **Prompt:** User prompt actions (edit, copy, retry)
- **Response:** AI response actions (copy, regenerate, feedback)
- **Footer:** Input-related actions (formatting, attachments)

### 3. Provide Clear Visual Feedback

```ts
onResponseToolbarClick(args: ToolbarItemClickedEventArgs) {
  const item = args.item;
  
  // Show loading state for async operations
  if (item.iconCss?.includes('e-refresh')) {
    item.disabled = true;
    this.regenerateResponse(args.dataIndex).then(() => {
      item.disabled = false;
    });
  }
  
  // Show success feedback
  if (item.iconCss?.includes('e-copy')) {
    // Copy to clipboard
    // Show toast notification: "Copied to clipboard"
  }
}
```

### 4. Handle dataIndex Properly

```ts
onPromptToolbarClick(args: ToolbarItemClickedEventArgs) {
  // Always check dataIndex exists
  if (args.dataIndex === undefined || args.dataIndex < 0) {
    console.error('Invalid data index');
    return;
  }

  // Safely access data
  if (args.dataIndex < this.promptsData.length) {
    const data = this.promptsData[args.dataIndex];
    // Process data
  }
}
```

### 5. Keyboard Accessibility

```ts
public responseToolbarSettings: ResponseToolbarSettingsModel = {
  items: [
    { 
      type: 'Button', 
      iconCss: 'e-icons e-copy', 
      tooltip: 'Copy (Ctrl+C)',
      tabIndex: 1  // Make focusable for keyboard navigation
    },
    { 
      type: 'Button', 
      iconCss: 'e-icons e-refresh', 
      tooltip: 'Regenerate (Ctrl+R)',
      tabIndex: 2
    }
  ]
};
```

---

## Styling Toolbars

### Custom Toolbar Styling

```ts
@Component({
  imports: [AIAssistViewModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div ejs-aiassistview 
      #aiAssistViewComponent
      id='aiAssistView'
      [cssClass]="'custom-toolbar-theme'"
      [responseToolbarSettings]="responseToolbarSettings">
    </div>
  `,
  styles: [`
    :host ::ng-deep .custom-toolbar-theme .e-toolbar-item {
      margin: 0 4px;
      border-radius: 4px;
      transition: all 0.2s;
    }
    
    :host ::ng-deep .custom-toolbar-theme .e-toolbar-item:hover {
      background: rgba(33, 150, 243, 0.1);
    }
    
    :host ::ng-deep .custom-toolbar-theme .e-toolbar-item.e-active {
      background: rgba(33, 150, 243, 0.2);
      color: #2196F3;
    }
    
    :host ::ng-deep .custom-toolbar-theme .e-icons {
      font-size: 16px;
    }
  `]
})
export class AppComponent {
  // Component implementation
}
```

---

## Troubleshooting

### Issue: Toolbar Items Not Appearing

**Cause:** Items array is empty or undefined

**Solution:**
```ts
// Ensure items array is properly initialized
public toolbarSettings: ToolbarSettingsModel = {
  items: [  // Must have at least one item
    { type: 'Button', iconCss: 'e-icons e-refresh', tooltip: 'Refresh' }
  ]
};
```

### Issue: Event Handler Not Firing

**Cause:** Event handler not bound properly

**Solution:**
```ts
// Use .bind(this) to maintain component context
public responseToolbarSettings: ResponseToolbarSettingsModel = {
  items: [...],
  itemClicked: this.onResponseToolbarClick.bind(this)  // ← Important!
};
```

### Issue: dataIndex is Undefined

**Cause:** Accessing dataIndex in header or footer toolbar (not applicable there)

**Solution:**
```ts
onToolbarClick(args: ToolbarItemClickedEventArgs) {
  // dataIndex only exists for prompt/response toolbars
  if (args.dataIndex !== undefined) {
    // This is a prompt or response toolbar click
    const data = this.promptsData[args.dataIndex];
  } else {
    // This is a header or footer toolbar click
  }
}
```

### Issue: Can't Update Toolbar Items Dynamically

**Cause:** Not triggering change detection

**Solution:**
```ts
updateToolbarItems() {
  // Create new object to trigger change detection
  this.responseToolbarSettings = {
    ...this.responseToolbarSettings,
    items: [...newItems]  // New array reference
  };
}
```

---

## Complete Example: Production-Ready Toolbar Setup

```ts
import { Component, ViewChild } from '@angular/core';
import { 
  AIAssistViewModule, 
  AIAssistViewComponent,
  ToolbarSettingsModel,
  PromptToolbarSettingsModel,
  ResponseToolbarSettingsModel,
  FooterToolbarSettingsModel,
  ToolbarItemClickedEventArgs,
  PromptRequestEventArgs
} from '@syncfusion/ej2-angular-interactive-chat';

@Component({
  imports: [AIAssistViewModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div ejs-aiassistview 
      #aiAssistViewComponent
      id='aiAssistView'
      [toolbarSettings]="toolbarSettings"
      [promptToolbarSettings]="promptToolbarSettings"
      [responseToolbarSettings]="responseToolbarSettings"
      [footerToolbarSettings]="footerToolbarSettings"
      [prompts]="promptsData"
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
  @ViewChild('aiAssistViewComponent')
  public aiAssistViewComponent!: AIAssistViewComponent;

  public promptsData: any[] = [];

  // Header Toolbar
  public toolbarSettings: ToolbarSettingsModel = {
    items: [
      { type: 'Button', iconCss: 'e-icons e-plus', tooltip: 'New Chat', tabIndex: 1 },
      { type: 'Separator' },
      { type: 'Button', iconCss: 'e-icons e-download', tooltip: 'Export', align: 'Right', tabIndex: 2 },
      { type: 'Button', iconCss: 'e-icons e-settings', tooltip: 'Settings', align: 'Right', tabIndex: 3 }
    ],
    itemClicked: this.onHeaderToolbarClick.bind(this)
  };

  // Prompt Toolbar
  public promptToolbarSettings: PromptToolbarSettingsModel = {
    items: [
      { type: 'Button', iconCss: 'e-icons e-copy', tooltip: 'Copy Prompt' },
      { type: 'Button', iconCss: 'e-icons e-edit', tooltip: 'Edit Prompt' }
    ],
    width: 'auto',
    itemClicked: this.onPromptToolbarClick.bind(this)
  };

  // Response Toolbar
  public responseToolbarSettings: ResponseToolbarSettingsModel = {
    items: [
      { type: 'Button', iconCss: 'e-icons e-copy', tooltip: 'Copy Response' },
      { type: 'Button', iconCss: 'e-icons e-refresh', tooltip: 'Regenerate Response' },
      { type: 'Separator' },
      { type: 'Button', iconCss: 'e-icons e-assist-like', tooltip: 'Helpful' },
      { type: 'Button', iconCss: 'e-icons e-assist-dislike', tooltip: 'Not Helpful' }
    ],
    width: 'auto',
    itemClicked: this.onResponseToolbarClick.bind(this)
  };

  // Footer Toolbar
  public footerToolbarSettings: FooterToolbarSettingsModel = {
    items: [
      { type: 'Button', iconCss: 'e-icons e-attach', tooltip: 'Attach File' },
      { type: 'Button', iconCss: 'e-icons e-microphone', tooltip: 'Voice Input' }
    ],
    toolbarPosition: 'Top',
    itemClick: this.onFooterToolbarClick.bind(this)
  };

  onHeaderToolbarClick(args: ToolbarItemClickedEventArgs) {
    if (args.item.iconCss?.includes('e-plus')) {
      this.startNewConversation();
    } else if (args.item.iconCss?.includes('e-download')) {
      this.exportConversation();
    } else if (args.item.iconCss?.includes('e-settings')) {
      this.openSettings();
    }
  }

  onPromptToolbarClick(args: ToolbarItemClickedEventArgs) {
    if (args.dataIndex === undefined) return;
    
    const promptData = this.promptsData[args.dataIndex];
    
    if (args.item.iconCss?.includes('e-copy')) {
      navigator.clipboard.writeText(promptData.prompt);
      console.log('Prompt copied to clipboard');
    } else if (args.item.iconCss?.includes('e-edit')) {
      this.editPrompt(args.dataIndex);
    }
  }

  onResponseToolbarClick(args: ToolbarItemClickedEventArgs) {
    if (args.dataIndex === undefined) return;
    
    const responseData = this.promptsData[args.dataIndex];
    
    if (args.item.iconCss?.includes('e-copy')) {
      this.copyResponseToClipboard(responseData.response);
    } else if (args.item.iconCss?.includes('e-refresh')) {
      this.regenerateResponse(args.dataIndex);
    } else if (args.item.iconCss?.includes('e-assist-like')) {
      this.markAsHelpful(args.dataIndex, true);
    } else if (args.item.iconCss?.includes('e-assist-dislike')) {
      this.markAsHelpful(args.dataIndex, false);
    }
  }

  onFooterToolbarClick(args: ToolbarItemClickedEventArgs) {
    if (args.item.iconCss?.includes('e-attach')) {
      this.openFilePicker();
    } else if (args.item.iconCss?.includes('e-microphone')) {
      this.startVoiceInput();
    }
  }

  onPromptRequest(args: PromptRequestEventArgs) {
    setTimeout(() => {
      this.aiAssistViewComponent.addPromptResponse('AI response from service...');
    }, 1000);
  }

  // Action Methods
  startNewConversation() {
    this.promptsData = [];
    console.log('New conversation started');
  }

  exportConversation() {
    const data = JSON.stringify(this.promptsData, null, 2);
    console.log('Exporting conversation:', data);
  }

  openSettings() {
    console.log('Opening settings...');
  }

  editPrompt(index: number) {
    console.log('Editing prompt at index:', index);
  }

  copyResponseToClipboard(response: string) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = response;
    navigator.clipboard.writeText(tempDiv.textContent || '');
    console.log('Response copied to clipboard');
  }

  regenerateResponse(index: number) {
    console.log('Regenerating response at index:', index);
    // Call AI service again
  }

  markAsHelpful(index: number, isHelpful: boolean) {
    this.promptsData[index].isResponseHelpful = isHelpful;
    console.log(`Response at index ${index} marked as ${isHelpful ? 'helpful' : 'not helpful'}`);
  }

  openFilePicker() {
    console.log('Opening file picker...');
  }

  startVoiceInput() {
    console.log('Starting voice input...');
  }
}
```

---

## Summary

The AI AssistView component provides four powerful toolbar types to enhance user interaction:

1. **Header Toolbar (`toolbarSettings`)** - Global actions and navigation
2. **Prompt Toolbar (`promptToolbarSettings`)** - Actions on user prompts
3. **Response Toolbar (`responseToolbarSettings`)** - Actions on AI responses
4. **Footer Toolbar (`footerToolbarSettings`)** - Input-related actions

Each toolbar type uses:
- `items` array of `ToolbarItemModel` objects
- Event handlers (`itemClicked` or `itemClick`)
- Optional configuration (width, position)

**Key Points:**
- Use `dataIndex` to identify which prompt/response is being interacted with
- Bind event handlers with `.bind(this)` for proper context
- Provide clear tooltips and keyboard accessibility
- Keep toolbar items focused and purposeful
- Handle edge cases (undefined dataIndex, disabled states)
