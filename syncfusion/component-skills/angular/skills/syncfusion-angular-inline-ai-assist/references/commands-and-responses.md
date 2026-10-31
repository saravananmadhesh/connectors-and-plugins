# Commands and Responses Configuration

## Table of Contents
- [Command Settings](#command-settings)
- [Response Settings](#response-settings)
- [Built-in Items](#built-in-items)
- [Command Item Properties](#command-item-properties)
- [Response Item Properties](#response-item-properties)
- [Event Handling](#event-handling)

## Command Settings

### Overview

Commands are preset AI operations that users can quickly select from a popup menu. Each command has a label, prompt, and optional icon and grouping.

### Configuring Command Items

Use the `commandSettings` property to define available commands:

```typescript
import { CommandSettingsModel } from '@syncfusion/ej2-angular-interactive-chat';

export class AppComponent {
    public commandSetting: CommandSettingsModel = {
        commands: [
            {
                label: 'Summarize',
                prompt: 'Summarize the content',
                iconCss: 'e-icons e-collapse-2',
                groupBy: 'Improve content',
                tooltip: 'Summarize'
            },
            {
                label: 'Shorten',
                prompt: 'Shorten the content',
                iconCss: 'e-icons e-shorten',
                groupBy: 'Improve content',
                tooltip: 'Shorten'
            },
            {
                label: 'Translate',
                prompt: 'Translate the content',
                iconCss: 'e-icons e-translate',
                groupBy: 'Edit content',
                tooltip: 'Translate'
            },
            {
                label: 'Make professional',
                prompt: 'Make the content more professional',
                iconCss: 'e-icons e-elaborate',
                groupBy: 'Edit content'
            }
        ]
    };
}
```

### Command Popup Dimensions

Control the command popup size:

```typescript
public commandSetting: CommandSettingsModel = {
    commands: [...],
    popupWidth: '300px',
    popupHeight: '250px'
}
```

## Response Settings

### Overview

Response items are action buttons shown after AI generates a response. Use them to accept, reject, copy, or regenerate responses.

### Configuring Response Items

Use the `responseSettings` property to customize response actions:

```typescript
import { ResponseSettingsModel, ResponseItemSelectEventArgs } from '@syncfusion/ej2-angular-interactive-chat';

export class AppComponent {
    public onItemSelect = (args: ResponseItemSelectEventArgs) => {
        if (args.command.label === 'Accept') {
            // Apply response to content
            this.applyResponse();
        } else if (args.command.label === 'Copy') {
            // Copy response to clipboard
            this.copyToClipboard();
        }
    }

    public responseSetting: ResponseSettingsModel = {
        items: [
            {
                label: 'Regenerate',
                iconCss: 'e-icons e-refresh',
                tooltip: 'Regenerate the response',
                groupBy: 'Actions'
            },
            {
                label: 'Copy',
                iconCss: 'e-icons e-copy',
                tooltip: 'Copy the response',
                groupBy: 'Actions'
            }
        ],
        itemSelect: this.onItemSelect
    }
}
```

## Built-in Items

### Built-in Commands

Default command groups include:
- Summarize, Shorten, Rephrase
- Translate to different languages
- Grammar & style improvements
- Tone adjustments (formal, casual, etc.)

### Built-in Response Items

The component provides default response actions:
- **Accept** - Apply the AI-generated response
- **Reject** (Discard) - Dismiss the response

These are shown even if no custom items are configured.

## Command Item Properties

### Label
Visible text displayed in the command popup:
```typescript
{ label: 'Summarize' }
```

### Prompt
The prompt text executed when command is selected:
```typescript
{ label: 'Summarize', prompt: 'Summarize the content in 2-3 sentences' }
```

### ID (Optional)
Unique identifier for detecting selected command:
```typescript
{ id: 'cmd-summarize', label: 'Summarize' }
```

### Icon CSS
Icon class for visual representation:
```typescript
{ label: 'Summarize', iconCss: 'e-icons e-collapse-2' }
```

### ID (Optional)
Unique identifier for detecting and referencing specific commands:
```typescript
{ 
    id: 'cmd-summarize',
    label: 'Summarize', 
    prompt: 'Summarize the content' 
}
```

**Usage in event handlers:**
```typescript
public onCommandSelect = (args: CommandItemSelectEventArgs) => {
    // Identify command by ID
    if (args.command.id === 'cmd-summarize') {
        console.log('Summarize command selected');
        // Perform specific action for summarize
    } else if (args.command.id === 'cmd-translate') {
        console.log('Translate command selected');
        // Perform specific action for translate
    }
}
```

**Benefits:**
- Reliable command identification (label text may change with localization)
- Programmatic command triggering
- Better maintainability in large command sets

### Tooltip
Hover text describing the command:
```typescript
{ label: 'Summarize', tooltip: 'Shorten content to key points' }
```

**Extended tooltip example:**
```typescript
{
    label: 'Translate',
    prompt: 'Translate to Spanish',
    iconCss: 'e-icons e-translate',
    tooltip: 'Translate the selected text to Spanish language',
    groupBy: 'Language'
}
```

**Best practices:**
- Keep tooltips concise but informative
- Explain what the command does, not just repeat the label
- Include keyboard shortcuts if applicable

### Group By
Logical grouping for organized popup display:
```typescript
{ label: 'Summarize', groupBy: 'Improve content' }
```

Commands with same `groupBy` value appear under a group header.

**Multiple groups example:**
```typescript
public commandSetting: CommandSettingsModel = {
    commands: [
        { label: 'Summarize', groupBy: 'Content Improvement', tooltip: 'Create summary' },
        { label: 'Expand', groupBy: 'Content Improvement', tooltip: 'Add details' },
        { label: 'Spanish', groupBy: 'Translation', tooltip: 'Translate to Spanish' },
        { label: 'French', groupBy: 'Translation', tooltip: 'Translate to French' },
        { label: 'Professional', groupBy: 'Tone', tooltip: 'Make it formal' },
        { label: 'Casual', groupBy: 'Tone', tooltip: 'Make it friendly' }
    ]
}
```

### Disabled
Disable command selection based on conditions:
```typescript
{ label: 'Shorten', disabled: true }
```

**Conditional disabling example:**
```typescript
import { Component } from '@angular/core';
import { CommandSettingsModel } from '@syncfusion/ej2-angular-interactive-chat';

export class AppComponent {
    public selectedText: string = '';
    public userPlan: string = 'free'; // 'free' or 'premium'

    public commandSetting: CommandSettingsModel = {
        commands: [
            {
                id: 'cmd-summarize',
                label: 'Summarize',
                prompt: 'Summarize the content',
                disabled: false, // Always available
                iconCss: 'e-icons e-collapse-2',
                groupBy: 'Basic'
            },
            {
                id: 'cmd-translate',
                label: 'Advanced Translation',
                prompt: 'Translate with context',
                disabled: this.userPlan === 'free', // Only for premium users
                iconCss: 'e-icons e-translate',
                groupBy: 'Premium Features',
                tooltip: 'Premium feature'
            },
            {
                id: 'cmd-expand',
                label: 'Expand Content',
                prompt: 'Add more details',
                disabled: this.selectedText.length === 0, // Requires selection
                iconCss: 'e-icons e-expand',
                groupBy: 'Basic'
            }
        ]
    };

    // Update disabled state dynamically
    public updateCommandStates(): void {
        this.commandSetting.commands.forEach(cmd => {
            if (cmd.id === 'cmd-expand') {
                cmd.disabled = this.selectedText.length === 0;
            }
            if (cmd.id === 'cmd-translate') {
                cmd.disabled = this.userPlan === 'free';
            }
        });
    }
}
```

**Use cases for disabled commands:**
- Feature gating based on user subscription
- Context-dependent availability (text selected, document type, etc.)
- Temporary unavailability (service down, loading state)
- Permission-based access control

## Response Item Properties

Response items are action buttons displayed after the AI generates a response. They use the `ResponseItemModel` interface to define their properties.

### ResponseItemModel Interface

The `ResponseItemModel` interface defines the structure for response action items:

```typescript
interface ResponseItemModel {
    label?: string;          // Display text for the action
    iconCss?: string;        // CSS class for icon
    tooltip?: string;        // Hover tooltip text
    groupBy?: string;        // Group name for organization
    disabled?: boolean;      // Whether the item is disabled
    id?: string;            // Unique identifier
}
```

### Label
Action text shown to user:
```typescript
{ label: 'Copy' }
{ label: 'Accept' }
{ label: 'Regenerate' }
```

**Best practices:**
- Use action verbs (Copy, Accept, Reject, Share)
- Keep labels short (1-2 words)
- Be clear about the action's effect

### Icon CSS
Icon for visual identification:
```typescript
{ label: 'Copy', iconCss: 'e-icons e-copy' }
{ label: 'Accept', iconCss: 'e-icons e-check' }
{ label: 'Regenerate', iconCss: 'e-icons e-refresh' }
```

**Common icons for response actions:**
- `e-icons e-check` - Accept/Approve
- `e-icons e-close` - Reject/Discard
- `e-icons e-copy` - Copy to clipboard
- `e-icons e-refresh` - Regenerate/Retry
- `e-icons e-share` - Share response
- `e-icons e-edit` - Edit response
- `e-icons e-save` - Save response

### ID (Optional)
Unique identifier for detecting specific response actions:
```typescript
{ 
    id: 'action-accept',
    label: 'Accept', 
    iconCss: 'e-icons e-check' 
}
```

**Usage:**
```typescript
public onResponseSelect = (args: ResponseItemSelectEventArgs) => {
    switch (args.command.id) {
        case 'action-accept':
            this.acceptResponse();
            break;
        case 'action-copy':
            this.copyToClipboard();
            break;
        case 'action-regenerate':
            this.regenerateResponse();
            break;
    }
}
```

### Tooltip
Hover text for response action:
```typescript
{ label: 'Copy', tooltip: 'Copy response to clipboard' }
{ label: 'Accept', tooltip: 'Insert this response into the document' }
{ label: 'Regenerate', tooltip: 'Generate a new response' }
```

### Group By
Group related response actions:
```typescript
{ label: 'Copy', groupBy: 'Share' }
{ label: 'Email', groupBy: 'Share' }
{ label: 'Accept', groupBy: 'Actions' }
{ label: 'Reject', groupBy: 'Actions' }
```

**Organized response items example:**
```typescript
public responseSetting: ResponseSettingsModel = {
    items: [
        // Primary actions
        { label: 'Accept', iconCss: 'e-icons e-check', groupBy: 'Primary', tooltip: 'Use this response' },
        { label: 'Reject', iconCss: 'e-icons e-close', groupBy: 'Primary', tooltip: 'Discard this response' },
        
        // Secondary actions
        { label: 'Copy', iconCss: 'e-icons e-copy', groupBy: 'Share', tooltip: 'Copy to clipboard' },
        { label: 'Email', iconCss: 'e-icons e-mail', groupBy: 'Share', tooltip: 'Send via email' },
        
        // Utility actions
        { label: 'Regenerate', iconCss: 'e-icons e-refresh', groupBy: 'Utility', tooltip: 'Try again' },
        { label: 'Edit', iconCss: 'e-icons e-edit', groupBy: 'Utility', tooltip: 'Modify response' }
    ],
    itemSelect: this.onResponseSelect
};
```

### Disabled
Prevent selection of response action:
```typescript
{ label: 'Regenerate', disabled: true }
```

**Conditional disabling:**
```typescript
export class AppComponent {
    public isRegenerating: boolean = false;
    public copiedToClipboard: boolean = false;

    public responseSetting: ResponseSettingsModel = {
        items: [
            {
                label: 'Regenerate',
                iconCss: 'e-icons e-refresh',
                disabled: this.isRegenerating, // Disable while regenerating
                tooltip: 'Generate alternative response'
            },
            {
                label: 'Copy',
                iconCss: 'e-icons e-copy',
                disabled: false, // Always enabled
                tooltip: this.copiedToClipboard ? 'Copied!' : 'Copy to clipboard'
            }
        ],
        itemSelect: this.onResponseSelect
    };

    public onResponseSelect = (args: ResponseItemSelectEventArgs) => {
        if (args.command.label === 'Regenerate' && !this.isRegenerating) {
            this.isRegenerating = true;
            // Update disabled state
            this.updateResponseItems();
            
            // Regenerate logic
            setTimeout(() => {
                this.isRegenerating = false;
                this.updateResponseItems();
            }, 2000);
        }
    }

    private updateResponseItems(): void {
        if (this.responseSetting.items) {
            this.responseSetting.items.forEach(item => {
                if (item.label === 'Regenerate') {
                    item.disabled = this.isRegenerating;
                }
            });
        }
    }
}
```

### Complete ResponseItemModel Example

```typescript
import { ResponseSettingsModel, ResponseItemSelectEventArgs } from '@syncfusion/ej2-angular-interactive-chat';

export class AppComponent {
    public responseSetting: ResponseSettingsModel = {
        items: [
            {
                id: 'resp-accept',
                label: 'Accept',
                iconCss: 'e-icons e-check',
                tooltip: 'Insert this response',
                groupBy: 'Primary Actions',
                disabled: false
            },
            {
                id: 'resp-discard',
                label: 'Discard',
                iconCss: 'e-icons e-close',
                tooltip: 'Reject this response',
                groupBy: 'Primary Actions',
                disabled: false
            },
            {
                id: 'resp-copy',
                label: 'Copy',
                iconCss: 'e-icons e-copy',
                tooltip: 'Copy to clipboard',
                groupBy: 'Secondary Actions',
                disabled: false
            },
            {
                id: 'resp-regenerate',
                label: 'Regenerate',
                iconCss: 'e-icons e-refresh',
                tooltip: 'Generate new response',
                groupBy: 'Secondary Actions',
                disabled: false
            },
            {
                id: 'resp-edit',
                label: 'Edit',
                iconCss: 'e-icons e-edit',
                tooltip: 'Modify before accepting',
                groupBy: 'Advanced',
                disabled: false
            }
        ],
        itemSelect: this.handleResponseItemSelect
    };

    public handleResponseItemSelect = (args: ResponseItemSelectEventArgs) => {
        const itemId = args.command.id;
        const response = this.inlineAssistComponent.prompts[
            this.inlineAssistComponent.prompts.length - 1
        ].response;

        switch (itemId) {
            case 'resp-accept':
                this.insertResponse(response);
                this.inlineAssistComponent.hidePopup();
                break;
            case 'resp-discard':
                this.inlineAssistComponent.hidePopup();
                break;
            case 'resp-copy':
                navigator.clipboard.writeText(response);
                this.showToast('Copied to clipboard!');
                break;
            case 'resp-regenerate':
                const lastPrompt = this.inlineAssistComponent.prompts[
                    this.inlineAssistComponent.prompts.length - 1
                ].prompt;
                this.inlineAssistComponent.executePrompt(lastPrompt);
                break;
            case 'resp-edit':
                this.openEditor(response);
                break;
        }
    };

    private insertResponse(response: string): void {
        const editable = document.getElementById('editableText') as HTMLElement;
        if (editable) {
            editable.innerHTML = response;
        }
    }

    private showToast(message: string): void {
        console.log(message);
        // Implement your toast notification
    }

    private openEditor(response: string): void {
        // Open a modal or inline editor with the response
        console.log('Opening editor with:', response);
    }
}
```

## Event Handling

### Command Item Select Event

Triggered when user selects a command from popup:

```typescript
import { CommandItemSelectEventArgs } from '@syncfusion/ej2-angular-interactive-chat';

public onCommandSelect = (args: CommandItemSelectEventArgs) => {
    console.log('Selected command:', args.command.label);
    console.log('Prompt:', args.command.prompt);
    
    // Perform custom action based on selected command
    if (args.command.id === 'cmd-summarize') {
        // Handle summarization
    }
}

public commandSetting: CommandSettingsModel = {
    commands: [...],
    itemSelect: this.onCommandSelect
}
```

### Response Item Select Event

Triggered when user selects a response action:

```typescript
import { ResponseItemSelectEventArgs } from '@syncfusion/ej2-angular-interactive-chat';

public onResponseSelect = (args: ResponseItemSelectEventArgs) => {
    console.log('Selected action:', args.command.label);
    
    if (args.command.label === 'Accept') {
        // Apply response
        this.applyResponse();
    } else if (args.command.label === 'Copy') {
        // Copy response
        const response = this.inlineAssistComponent.prompts[
            this.inlineAssistComponent.prompts.length - 1
        ].response;
        navigator.clipboard.writeText(response);
    }
}

public responseSetting: ResponseSettingsModel = {
    items: [...],
    itemSelect: this.onResponseSelect
}
```

## Complete Example

```typescript
import { ViewChild, Component } from '@angular/core';
import { 
    InlineAIAssistModule, 
    InlineAIAssistComponent,
    CommandSettingsModel,
    ResponseSettingsModel,
    CommandItemSelectEventArgs,
    ResponseItemSelectEventArgs,
    InlinePromptRequestEventArgs
} from '@syncfusion/ej2-angular-interactive-chat';

@Component({
    imports: [InlineAIAssistModule],
    standalone: true,
    selector: 'app-root',
    template: `
        <div id="container" style="height: 350px; width: 650px;">
            <button id="summarizeBtn" class="e-btn e-primary" (click)="onClick()">
                Open Commands
            </button>
            <div id="editableText" contenteditable="true">
                <p>Sample content for AI processing</p>
            </div>
            <ejs-inlineaiassist 
                id="assist" 
                #inlineAssistComponent
                [relateTo]="'#summarizeBtn'"
                [commandSettings]="commandSettings"
                [responseSettings]="responseSettings"
                popupWidth="500px"
                (promptRequest)="onPromptRequest($event)">
            </ejs-inlineaiassist>
        </div>
    `,
    styles: [`#editableText { width: 100%; min-height: 120px; padding: 12px; border: 1px solid; }`]
})
export class AppComponent {
    @ViewChild('inlineAssistComponent')
    public inlineAssistComponent!: InlineAIAssistComponent;

    // Command settings with grouped commands
    public commandSettings: CommandSettingsModel = {
        commands: [
            {
                label: 'Summarize',
                prompt: 'Summarize the content',
                iconCss: 'e-icons e-collapse-2',
                groupBy: 'Improve content',
                tooltip: 'Create a concise summary'
            },
            {
                label: 'Shorten',
                prompt: 'Shorten the content',
                iconCss: 'e-icons e-shorten',
                groupBy: 'Improve content',
                tooltip: 'Make it shorter'
            },
            {
                label: 'Expand',
                prompt: 'Expand the content with more details',
                iconCss: 'e-icons e-expand',
                groupBy: 'Improve content',
                tooltip: 'Add more information'
            },
            {
                label: 'Translate to Spanish',
                prompt: 'Translate to Spanish',
                iconCss: 'e-icons e-translate',
                groupBy: 'Translate',
                tooltip: 'Spanish translation'
            },
            {
                label: 'Make Professional',
                prompt: 'Rewrite in professional tone',
                iconCss: 'e-icons e-elaborate',
                groupBy: 'Tone',
                tooltip: 'Professional wording'
            }
        ],
        popupWidth: '350px',
        popupHeight: '300px',
        itemSelect: this.onCommandSelect
    };

    // Response settings with custom actions
    public responseSettings: ResponseSettingsModel = {
        items: [
            {
                label: 'Regenerate',
                iconCss: 'e-icons e-refresh',
                tooltip: 'Generate alternative response',
                groupBy: 'Actions'
            },
            {
                label: 'Copy',
                iconCss: 'e-icons e-copy',
                tooltip: 'Copy to clipboard',
                groupBy: 'Actions'
            },
            {
                label: 'Share',
                iconCss: 'e-icons e-share',
                tooltip: 'Share response',
                groupBy: 'Actions'
            }
        ],
        itemSelect: this.onResponseSelect
    };

    onClick(): void {
        this.inlineAssistComponent.showPopup();
    }

    public onCommandSelect = (args: CommandItemSelectEventArgs) => {
        console.log('Command selected:', args.command.label);
        // Additional logic for specific commands
    }

    public onResponseSelect = (args: ResponseItemSelectEventArgs) => {
        if (args.command.label === 'Accept') {
            const editable = document.getElementById('editableText') as HTMLElement;
            if (editable) {
                editable.innerHTML = this.inlineAssistComponent.prompts[
                    this.inlineAssistComponent.prompts.length - 1
                ].response;
            }
            this.inlineAssistComponent.hidePopup();
        } else if (args.command.label === 'Copy') {
            const response = this.inlineAssistComponent.prompts[
                this.inlineAssistComponent.prompts.length - 1
            ].response;
            navigator.clipboard.writeText(response);
            alert('Response copied to clipboard!');
        }
    }

    public onPromptRequest = (args: InlinePromptRequestEventArgs) => {
        setTimeout(() => {
            let response = 'AI-generated response based on the selected command.';
            this.inlineAssistComponent.addResponse(response);
        }, 1000);
    };
}
```

## Best Practices

1. **Group related commands** - Use `groupBy` to organize similar operations
2. **Add descriptive icons** - Help users quickly identify commands
3. **Provide tooltips** - Explain what each command does
4. **Handle errors** - Catch command execution failures gracefully
5. **Disable unavailable commands** - Use `disabled` for context-specific actions
6. **Support undo** - Allow users to reject and try different commands
