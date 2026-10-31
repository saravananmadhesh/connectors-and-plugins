# Templates and Toolbars

## Table of Contents
- [Editor Template](#editor-template)
- [Response Template](#response-template)
- [Inline Toolbar Configuration](#inline-toolbar-configuration)
- [Toolbar Item Properties](#toolbar-item-properties)
- [Toolbar Positioning](#toolbar-positioning)
- [Tab Key Navigation](#tab-key-navigation)

## Editor Template

### Overview

The editor template customizes the footer area where users enter prompts. Use this to create custom layouts, add buttons, or modify the input experience.

**Type:** `string | object`  
**Default:** `''`

The `editorTemplate` property accepts two types of values:

1. **String template** - HTML markup as a string
2. **Object/Function template** - Angular template reference or function that returns markup

### Template Types Explained

#### String Template
Direct HTML string for simple customizations:
```typescript
export class AppComponent {
    public editorTemplate: string = `
        <div class="custom-editor">
            <textarea placeholder="Custom prompt input"></textarea>
            <button onclick="submitPrompt()">Send</button>
        </div>
    `;
}
```

#### Angular Template Reference (Recommended)
Use Angular `ng-template` for better integration:
```typescript
// In template: #editorTemplate
// In component: Access via template reference
```

**Best practice:** Use Angular template references for access to component context, data binding, and event handlers.

### Basic Editor Template

```typescript
import { ViewChild, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InlineAIAssistModule, InlineAIAssistComponent } from '@syncfusion/ej2-angular-interactive-chat';

@Component({
    imports: [CommonModule, FormsModule, InlineAIAssistModule],
    standalone: true,
    selector: 'app-root',
    template: `
        <ejs-inlineaiassist 
            id="assist" 
            #inlineAssistComponent
            [relateTo]="'#button'"
            (promptRequest)="onPromptRequest($event)">
            <!-- Custom Editor Template -->
            <ng-template #editorTemplate>
                <div class="custom-footer">
                    <textarea 
                        id="promptTextArea" 
                        class="e-input" 
                        rows="2" 
                        placeholder="Enter your prompt here"
                        [(ngModel)]="promptText">
                    </textarea>
                    <button 
                        id="sendPrompt" 
                        class="e-btn e-primary" 
                        (click)="onGenerateClick()">
                        Generate
                    </button>
                </div>
            </ng-template>
        </ejs-inlineaiassist>
    `,
    styles: [`
        .custom-footer {
            display: flex;
            gap: 10px;
            padding: 10px;
            background-color: transparent;
        }
        #promptTextArea {
            width: 100%;
            padding: 10px;
            border-radius: 5px;
            border: 1px solid #ccc;
            font-family: inherit;
        }
        #sendPrompt {
            padding: 5px 15px;
            align-self: flex-end;
            white-space: nowrap;
        }
    `]
})
export class AppComponent {
    @ViewChild('inlineAssistComponent')
    public inlineAssistComponent!: InlineAIAssistComponent;

    public promptText: string = '';

    onGenerateClick(): void {
        if (this.promptText.trim()) {
            this.inlineAssistComponent.executePrompt(this.promptText.trim());
            this.promptText = '';
        }
    }

    public onPromptRequest = (args: any) => {
        setTimeout(() => {
            let response = 'Response for: ' + args.prompt;
            this.inlineAssistComponent.addResponse(response);
        }, 1000);
    };
}
```

### Advanced Editor Template

```typescript
<ng-template #editorTemplate>
    <div class="advanced-editor">
        <div class="editor-toolbar">
            <button class="tool-btn" title="Bold"><i class="e-icons e-bold"></i></button>
            <button class="tool-btn" title="Italic"><i class="e-icons e-italic"></i></button>
            <button class="tool-btn" title="Underline"><i class="e-icons e-underline"></i></button>
            <span class="divider"></span>
        </div>
        <textarea 
            class="prompt-input"
            rows="3"
            [(ngModel)]="promptText"
            placeholder="Enter prompt...">
        </textarea>
        <div class="editor-actions">
            <button class="e-btn e-outline" (click)="onCancel()">Cancel</button>
            <button class="e-btn e-primary" (click)="onGenerateClick()">Generate</button>
        </div>
    </div>
</ng-template>
```

## Response Template

### Overview

The response template customizes how AI responses are displayed. Create custom layouts for response items with headers, icons, and styling.

**Type:** `string | object`  
**Default:** `''`

The `responseTemplate` property accepts two types of values:

1. **String template** - HTML markup as a string  
2. **Object/Function template** - Angular template reference with access to response data

### Template Context

The response template function receives a context object with the following structure:

```typescript
interface ResponseTemplateContext {
    prompt: string;      // The user's prompt text
    response: string;    // The AI-generated response
    index?: number;      // Index in the prompts array
}
```

**Usage in template:**
```typescript
<ng-template #responseTemplate let-data>
    <div>
        <p>Prompt: {{ data.prompt }}</p>
        <p>Response: {{ data.response }}</p>
    </div>
</ng-template>
```

### Basic Response Template

```typescript
<ng-template #responseTemplate let-data>
    <div class="responseItemContent">
        <div class="response-header">
            <span class="e-icons e-assistview-icon"></span>
            <span>AI Response</span>
        </div>
        <div class="responseContent" [innerHTML]="data.response"></div>
    </div>
</ng-template>
```

### Complete Response Template Example

```typescript
import { ViewChild, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineAIAssistModule, InlineAIAssistComponent } from '@syncfusion/ej2-angular-interactive-chat';

@Component({
    imports: [CommonModule, InlineAIAssistModule],
    standalone: true,
    selector: 'app-root',
    template: `
        <ejs-inlineaiassist 
            id="assist" 
            #inlineAssistComponent
            [relateTo]="'#button'"
            [prompts]="promptsData"
            (promptRequest)="onPromptRequest($event)">
            <!-- Custom Response Template -->
            <ng-template #responseTemplate let-data>
                <div class="responseItemContent">
                    <div class="response-header">
                        <span class="e-icons e-assistview-icon"></span>
                        Inline AI Assist
                    </div>
                    <div class="responseContent" [innerHTML]="data.response"></div>
                    <div class="response-metadata">
                        <span class="timestamp">{{ getCurrentTime() }}</span>
                    </div>
                </div>
            </ng-template>
        </ejs-inlineaiassist>
    `,
    styles: [`
        .responseItemContent {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
        .response-header {
            font-size: 16px;
            font-weight: bold;
            display: flex;
            align-items: center;
            color: #2196f3;
        }
        .response-header .e-assistview-icon {
            margin-right: 10px;
        }
        .responseContent {
            margin-left: 35px;
            line-height: 1.6;
            color: #333;
        }
        .response-metadata {
            margin-left: 35px;
            margin-top: 5px;
            font-size: 12px;
            color: #999;
        }
        .e-response-item-template .e-toolbar-items {
            margin-left: 35px;
        }
    `]
})
export class AppComponent {
    @ViewChild('inlineAssistComponent')
    public inlineAssistComponent!: InlineAIAssistComponent;

    public promptsData = [
        {
            prompt: "What is AI?",
            response: `<div>AI stands for Artificial Intelligence, enabling machines to mimic human intelligence 
                       for tasks such as learning, problem-solving, and decision-making.</div>`
        }
    ];

    getCurrentTime(): string {
        return new Date().toLocaleTimeString();
    }

    public onPromptRequest = (args: any) => {
        setTimeout(() => {
            let response = 'Custom formatted response...';
            this.inlineAssistComponent.addResponse(response);
        }, 1000);
    };
}
```

## Inline Toolbar Configuration

### Overview

The inline toolbar appears within the prompt input area. Configure it to add custom buttons alongside the default send button.

### InlineToolbarSettingsModel Properties

The `InlineToolbarSettingsModel` interface configures the inline toolbar:

```typescript
interface InlineToolbarSettingsModel {
    items?: ToolbarItemModel[];           // Array of toolbar items
    toolbarPosition?: ToolbarPosition | string;  // Position of toolbar
    itemClick?: EmitType<ToolbarItemClickEventArgs>; // Click event handler
}
```

### Toolbar Position Property

**Type:** `ToolbarPosition | string`  
**Default:** `'Bottom'`  
**Allowed values:** `'Top'` | `'Bottom'` | `'Inline'`

Control where the toolbar appears relative to the prompt input:

```typescript
import { InlineToolbarSettingsModel } from '@syncfusion/ej2-angular-interactive-chat';

export class AppComponent {
    // Bottom position (default)
    public toolbarBottom: InlineToolbarSettingsModel = {
        toolbarPosition: 'Bottom',
        items: [
            { iconCss: 'e-icons e-send', type: 'Button', align: 'Right' }
        ]
    };

    // Top position
    public toolbarTop: InlineToolbarSettingsModel = {
        toolbarPosition: 'Top',
        items: [
            { iconCss: 'e-icons e-send', type: 'Button', align: 'Right' }
        ]
    };

    // Inline position (within same line as input)
    public toolbarInline: InlineToolbarSettingsModel = {
        toolbarPosition: 'Inline',
        items: [
            { iconCss: 'e-icons e-send', type: 'Button', align: 'Right' }
        ]
    };
}
```

### Toolbar Item Click Event

**Type:** `EmitType<ToolbarItemClickEventArgs>`

Handle clicks on toolbar buttons:

```typescript
import { ToolbarItemClickEventArgs, InlineToolbarSettingsModel } from '@syncfusion/ej2-angular-interactive-chat';

export class AppComponent {
    public inlineToolbarSettings: InlineToolbarSettingsModel = {
        items: [
            {
                id: 'clear-btn',
                iconCss: 'e-icons e-close',
                align: 'Right',
                type: 'Button',
                tooltip: 'Clear'
            },
            {
                id: 'emoji-btn',
                iconCss: 'e-icons e-emoji',
                align: 'Right',
                type: 'Button',
                tooltip: 'Insert Emoji'
            },
            {
                id: 'attach-btn',
                iconCss: 'e-icons e-attachment',
                align: 'Left',
                type: 'Button',
                tooltip: 'Attach File'
            }
        ],
        itemClick: this.onToolbarItemClick
    };

    public onToolbarItemClick = (args: ToolbarItemClickEventArgs) => {
        console.log('Toolbar item clicked:', args.item);
        
        // Access clicked item details
        const itemId = args.item.id;
        
        switch (itemId) {
            case 'clear-btn':
                this.clearPrompt();
                break;
            case 'emoji-btn':
                this.showEmojiPicker();
                break;
            case 'attach-btn':
                this.openFileDialog();
                break;
        }
    };

    private clearPrompt(): void {
        this.inlineAssistComponent.prompt = '';
        console.log('Prompt cleared');
    }

    private showEmojiPicker(): void {
        console.log('Opening emoji picker');
        // Implement emoji picker logic
    }

    private openFileDialog(): void {
        console.log('Opening file dialog');
        // Implement file attachment logic
    }
}
```

### Complete Toolbar Configuration Example

```typescript
import { ViewChild, Component } from '@angular/core';
import { 
    InlineAIAssistModule, 
    InlineAIAssistComponent,
    InlineToolbarSettingsModel,
    ToolbarItemClickEventArgs 
} from '@syncfusion/ej2-angular-interactive-chat';

@Component({
    imports: [InlineAIAssistModule],
    standalone: true,
    selector: 'app-root',
    template: `
        <div id="container">
            <button id="aiBtn" class="e-btn e-primary" (click)="onClick()">
                Open AI Assist
            </button>
            <ejs-inlineaiassist 
                id="assist" 
                #inlineAssistComponent
                [relateTo]="'#aiBtn'"
                [inlineToolbarSettings]="inlineToolbarSettings"
                popupWidth="600px"
                (promptRequest)="onPromptRequest($event)">
            </ejs-inlineaiassist>
        </div>
    `
})
export class AppComponent {
    @ViewChild('inlineAssistComponent')
    public inlineAssistComponent!: InlineAIAssistComponent;

    public inlineToolbarSettings: InlineToolbarSettingsModel = {
        toolbarPosition: 'Bottom',
        items: [
            {
                id: 'attach',
                iconCss: 'e-icons e-attachment',
                align: 'Left',
                type: 'Button',
                tooltip: 'Attach file'
            },
            {
                id: 'emoji',
                iconCss: 'e-icons e-emoji',
                align: 'Left',
                type: 'Button',
                tooltip: 'Insert emoji'
            },
            {
                type: 'Separator',
                align: 'Left'
            },
            {
                id: 'clear',
                iconCss: 'e-icons e-trash',
                align: 'Right',
                type: 'Button',
                tooltip: 'Clear prompt'
            },
            {
                id: 'voice',
                iconCss: 'e-icons e-microphone',
                align: 'Right',
                type: 'Button',
                tooltip: 'Voice input'
            }
        ],
        itemClick: this.handleToolbarClick
    };

    public handleToolbarClick = (args: ToolbarItemClickEventArgs) => {
        const itemId = args.item.id;
        
        console.log(`Toolbar button clicked: ${itemId}`);
        
        switch (itemId) {
            case 'clear':
                this.inlineAssistComponent.prompt = '';
                break;
            case 'emoji':
                this.insertEmoji('😊');
                break;
            case 'voice':
                this.startVoiceInput();
                break;
            case 'attach':
                this.attachFile();
                break;
        }
    };

    private insertEmoji(emoji: string): void {
        const currentPrompt = this.inlineAssistComponent.prompt || '';
        this.inlineAssistComponent.prompt = currentPrompt + emoji;
    }

    private startVoiceInput(): void {
        console.log('Starting voice input...');
        // Implement speech-to-text
    }

    private attachFile(): void {
        console.log('Attaching file...');
        // Implement file attachment
    }

    onClick(): void {
        this.inlineAssistComponent.showPopup();
    }

    public onPromptRequest = (args: any) => {
        setTimeout(() => {
            this.inlineAssistComponent.addResponse('Response generated');
        }, 1000);
    };
}
```

### Basic Inline Toolbar

```typescript
import { InlineToolbarSettingsModel } from '@syncfusion/ej2-angular-interactive-chat';

export class AppComponent {
    public inlineToolbarSettings: InlineToolbarSettingsModel = {
        items: [
            {
                iconCss: 'e-icons e-refresh',
                align: 'Right',
                type: 'Button'
            },
            {
                type: 'Button',
                iconCss: 'e-icons e-maximize-2',
                align: 'Right',
                tooltip: 'Expand'
            }
        ]
    };
}
```

## Toolbar Item Properties

### ToolbarItemModel Interface

The `ToolbarItemModel` interface defines toolbar button configuration:

```typescript
interface ToolbarItemModel {
    id?: string;              // Unique identifier
    type?: string;            // 'Button' | 'Separator' | 'Input'
    text?: string;            // Button label text
    iconCss?: string;         // Icon CSS class
    tooltip?: string;         // Hover tooltip
    align?: string;           // 'Left' | 'Center' | 'Right'
    disabled?: boolean;       // Whether disabled
    visible?: boolean;        // Whether visible
    cssClass?: string;        // Custom CSS class
    width?: string | number;  // Item width
    htmlAttributes?: object;  // Custom HTML attributes
}
```

### ID
Unique identifier for the toolbar item:
```typescript
{ 
    id: 'clear-btn',
    type: 'Button',
    iconCss: 'e-icons e-trash' 
}
```

**Usage:** Essential for identifying items in click event handlers.

### Type
Item type: `'Button'`, `'Separator'`, or `'Input'`
```typescript
{ type: 'Button' }       // Clickable button
{ type: 'Separator' }    // Visual divider
{ type: 'Input' }        // Input field
```

**Common usage:**
```typescript
public toolbarItems = [
    { id: 'btn1', type: 'Button', text: 'Action' },
    { type: 'Separator' },  // Visual divider
    { id: 'btn2', type: 'Button', text: 'Another Action' }
];
```

### Text
Button label text:
```typescript
{ text: 'Clear', type: 'Button' }
{ text: 'Send', type: 'Button', iconCss: 'e-icons e-send' }
```

**With icon:**
```typescript
{ 
    id: 'save-btn',
    text: 'Save', 
    iconCss: 'e-icons e-save',
    type: 'Button' 
}
```

### Icon CSS
Icon class for visual display:
```typescript
{ iconCss: 'e-icons e-refresh' }
{ iconCss: 'e-icons e-send' }
{ iconCss: 'e-icons e-attachment' }
```

**Syncfusion icon classes:**
- `e-icons e-send` - Send icon
- `e-icons e-trash` - Delete/Clear icon
- `e-icons e-attachment` - Attachment icon
- `e-icons e-emoji` - Emoji icon
- `e-icons e-microphone` - Voice input icon
- `e-icons e-close` - Close icon
- `e-icons e-refresh` - Refresh icon

### Tooltip
Hover tooltip:
```typescript
{ tooltip: 'Clear all prompts' }
{ tooltip: 'Send message (Ctrl+Enter)' }
{ tooltip: 'Attach file' }
```

**Best practices:**
- Include keyboard shortcuts when applicable
- Be descriptive but concise
- Explain the action, not just repeat the label

### Alignment
Position: `'Left'`, `'Center'`, `'Right'`
```typescript
{ align: 'Right' }   // Positioned on the right
{ align: 'Left' }    // Positioned on the left
{ align: 'Center' }  // Centered
```

**Layout example:**
```typescript
public toolbarItems = [
    { id: 'attach', iconCss: 'e-icons e-attachment', align: 'Left' },
    { id: 'emoji', iconCss: 'e-icons e-emoji', align: 'Left' },
    { id: 'send', iconCss: 'e-icons e-send', align: 'Right' },
    { id: 'clear', iconCss: 'e-icons e-trash', align: 'Right' }
];
```

### Disabled
Disable the item:
```typescript
{ disabled: true }
{ disabled: false }
```

**Conditional disabling:**
```typescript
export class AppComponent {
    public promptText: string = '';

    public getToolbarItems() {
        return [
            {
                id: 'send',
                iconCss: 'e-icons e-send',
                disabled: this.promptText.trim().length === 0, // Disable if empty
                tooltip: 'Send message'
            },
            {
                id: 'clear',
                iconCss: 'e-icons e-trash',
                disabled: this.promptText.length === 0, // Disable if nothing to clear
                tooltip: 'Clear prompt'
            }
        ];
    }
}
```

### Visible
Show/hide the item:
```typescript
{ visible: false }  // Hidden
{ visible: true }   // Visible (default)
```

**Conditional visibility:**
```typescript
export class AppComponent {
    public isVoiceSupported: boolean = 'webkitSpeechRecognition' in window;
    public isPremiumUser: boolean = true;

    public toolbarItems = [
        {
            id: 'voice',
            iconCss: 'e-icons e-microphone',
            visible: this.isVoiceSupported, // Only show if browser supports it
            tooltip: 'Voice input'
        },
        {
            id: 'premium-feature',
            iconCss: 'e-icons e-star',
            visible: this.isPremiumUser, // Only for premium users
            tooltip: 'Premium feature'
        }
    ];
}
```

### CSS Class
Custom styling:
```typescript
{ cssClass: 'custom-btn' }
{ cssClass: 'primary-action' }
```

**CSS example:**
```css
.custom-btn {
    background-color: #2196f3;
    color: white;
    border-radius: 4px;
    padding: 8px 16px;
}

.primary-action {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

### Width
Item width in pixels or CSS units:
```typescript
{ width: 100 }        // 100px
{ width: '80px' }     // 80px
{ width: '10%' }      // Percentage
```

### HTML Attributes
Custom HTML attributes:
```typescript
{
    id: 'custom-btn',
    type: 'Button',
    htmlAttributes: {
        'data-action': 'submit',
        'aria-label': 'Submit prompt',
        'class': 'custom-button-class'
    }
}
```

## Complete Toolbar Example

```typescript
public inlineToolbarSettings: InlineToolbarSettingsModel = {
    items: [
        {
            // Left aligned separator
            type: 'Separator',
            align: 'Left'
        },
        {
            // Refresh button (right)
            iconCss: 'e-icons e-refresh',
            align: 'Right',
            type: 'Button',
            tooltip: 'Refresh',
            cssClass: 'toolbar-refresh'
        },
        {
            // User button (right)
            type: 'Button',
            iconCss: 'e-icons e-user',
            align: 'Right',
            cssClass: 'toolbar-user',
            tooltip: 'User profile'
        },
        {
            // Maximize button (right)
            type: 'Button',
            iconCss: 'e-icons e-maximize-2',
            align: 'Right',
            tooltip: 'Expand'
        },
        {
            // Close button (right, disabled)
            type: 'Button',
            iconCss: 'e-icons e-close',
            align: 'Right',
            disabled: true,
            tooltip: 'Close'
        },
        {
            // Info button (right, visible)
            type: 'Button',
            iconCss: 'e-icons e-info',
            align: 'Right',
            visible: true,
            tooltip: 'Information'
        }
    ]
};
```

## Toolbar Positioning

### Top Position
Toolbar appears above the input:
```html
<div class="toolbar-top">
    <!-- Toolbar items here -->
</div>
<textarea class="prompt-input"></textarea>
```

### Bottom Position
Toolbar appears below the input:
```html
<textarea class="prompt-input"></textarea>
<div class="toolbar-bottom">
    <!-- Toolbar items here -->
</div>
```

### Inline Position
Toolbar items mixed with input (default):
```html
<div class="toolbar-inline">
    <textarea class="prompt-input"></textarea>
    <div class="toolbar-items">
        <!-- Inline items -->
    </div>
</div>
```

## Tab Key Navigation

### Enabling Tab Navigation in Toolbar

```typescript
public inlineToolbarSettings: InlineToolbarSettingsModel = {
    items: [
        {
            iconCss: 'e-icons e-refresh',
            align: 'Right',
            type: 'Button'
        }
    ],
    // Enable tab key navigation
    enableKeyboardNav: true
}
```

### Tab Order

Control focus order between toolbar items:

```css
.toolbar-item {
    tabindex: 0;  /* Focusable */
}

.toolbar-item:focus {
    outline: 2px solid #2196f3;
    outline-offset: 2px;
}
```

### Complete Navigation Example

```typescript
export class AppComponent {
    public inlineToolbarSettings: InlineToolbarSettingsModel = {
        items: [
            {
                iconCss: 'e-icons e-undo',
                align: 'Left',
                type: 'Button',
                tooltip: 'Undo (Alt+Z)'
            },
            {
                iconCss: 'e-icons e-redo',
                align: 'Left',
                type: 'Button',
                tooltip: 'Redo (Alt+Y)'
            },
            {
                type: 'Separator',
                align: 'Left'
            },
            {
                iconCss: 'e-icons e-copy',
                align: 'Right',
                type: 'Button',
                tooltip: 'Copy (Ctrl+C)'
            },
            {
                iconCss: 'e-icons e-cut',
                align: 'Right',
                type: 'Button',
                tooltip: 'Cut (Ctrl+X)'
            },
            {
                iconCss: 'e-icons e-paste',
                align: 'Right',
                type: 'Button',
                tooltip: 'Paste (Ctrl+V)'
            }
        ]
    };
}
```

## Styling Guidelines

### Custom Toolbar CSS

```css
/* Toolbar container */
.e-toolbar {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 8px;
    border-radius: 4px;
}

/* Toolbar buttons */
.e-toolbar-item {
    margin: 0 4px;
    border-radius: 4px;
}

.e-toolbar-item:hover {
    background-color: rgba(255, 255, 255, 0.2);
}

.e-toolbar-item:focus {
    box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.5);
}

/* Custom button styles */
.toolbar-refresh {
    color: #fff;
}

.toolbar-user {
    background: rgba(255, 255, 255, 0.1);
    padding: 4px 8px;
    border-radius: 50%;
}

/* Separator */
.e-toolbar-separator {
    background-color: rgba(255, 255, 255, 0.3);
}
```
