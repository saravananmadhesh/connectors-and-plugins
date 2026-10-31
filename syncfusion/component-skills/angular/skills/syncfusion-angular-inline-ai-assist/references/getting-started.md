# Getting Started with Syncfusion Angular Inline AI Assist

## Table of Contents
- [Installation](#installation)
- [Angular Environment Setup](#angular-environment-setup)
- [Package Installation](#package-installation)
- [CSS References](#css-references)
- [Basic Implementation](#basic-implementation)
- [Configure Position](#configure-position)
- [Run the Application](#run-the-application)

## Installation

The Inline AI Assist component is distributed as part of the `@syncfusion/ej2-angular-interactive-chat` package.

### Dependencies

The following dependencies are required:

```
@syncfusion/ej2-angular-interactive-chat
├── @syncfusion/ej2-base
├── @syncfusion/ej2-navigations
├── @syncfusion/ej2-inputs
├── @syncfusion/ej2-buttons
├── @syncfusion/ej2-dropdowns
└── @syncfusion/ej2-popups
```

## Angular Environment Setup

### Install Angular CLI

```bash
npm install -g @angular/cli
```

### Create Angular Application

```bash
ng new my-inline-ai-app
cd my-inline-ai-app
```

## Package Installation

Install the Syncfusion Inline AI Assist package:

```bash
npm install @syncfusion/ej2-angular-interactive-chat --save
```

## CSS References

To install the material3 theme package, use the following command:

```bash
npm install @syncfusion/ej2-material3-theme --save
```

Add the required CSS files to `src/styles.css`:

```css
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/inline-ai-assist/index.css";
```

## Basic Implementation

### Update app.component.ts

Modify `src/app/app.component.ts` to add the Inline AI Assist component:

```typescript
import { Component } from '@angular/core';
import { InlineAIAssistModule } from '@syncfusion/ej2-angular-interactive-chat';

@Component({
    imports: [InlineAIAssistModule],
    standalone: true,
    selector: 'app-root',
    template: `
        <ejs-inlineaiassist id='inlineAssist'></ejs-inlineaiassist>
    `
})
export class AppComponent { }
```

### Full Working Example

Here's a complete example with event handling:

```typescript
import { ViewChild, Component } from '@angular/core';
import { 
    InlineAIAssistModule, 
    InlineAIAssistComponent, 
    InlinePromptRequestEventArgs, 
    ResponseSettingsModel, 
    ResponseItemSelectEventArgs 
} from '@syncfusion/ej2-angular-interactive-chat';

@Component({
    imports: [InlineAIAssistModule],
    standalone: true,
    selector: 'app-root',
    template: `
        <div id="container" style="height: 350px; width: 650px;">
            <button id="summarizeBtn" class="e-btn e-primary" style="margin-bottom: 10px;" (click)="onClick()">
                Content Summarize
            </button>
            <div id="editableText" contenteditable="true">
                <p>Inline AI Assist component provides intelligent text processing capabilities that enhance user productivity. 
                   It leverages advanced natural language processing to understand context and deliver precise suggestions. 
                   Users can seamlessly integrate AI-powered features into their applications.</p>
                <p>With real-time response streaming and customizable prompts, developers can create interactive experiences. 
                   The component supports multiple response modes including inline editing and popup-based interactions.</p>
            </div>
            <ejs-inlineaiassist 
                id="defaultInlineAssist" 
                #inlineAssistComponent
                [relateTo]="'#summarizeBtn'"
                [responseSettings]="responseSetting"
                popupWidth="500px"
                (promptRequest)="onPromptRequest($event)">
            </ejs-inlineaiassist>
        </div>
    `,
    styles: [`
        #editableText {
            width: 100%;
            min-height: 120px;
            max-height: 300px;
            overflow-y: auto;
            font-size: 16px;
            padding: 12px;
            border-radius: 4px;
            border: 1px solid;
        }
    `]
})
export class AppComponent {
    @ViewChild('inlineAssistComponent')
    public inlineAssistComponent!: InlineAIAssistComponent;

    public itemSelect = (args: ResponseItemSelectEventArgs) => {
        if (args.command.label === 'Accept') {
            const editable = document.getElementById('editableText') as HTMLElement | null;
            if (editable) {
                editable.innerHTML = '<p>' + 
                    this.inlineAssistComponent.prompts[
                        this.inlineAssistComponent.prompts.length - 1
                    ].response + '</p>';
            }
            this.inlineAssistComponent.hidePopup();
        } else if (args.command.label === 'Discard') {
            this.inlineAssistComponent.hidePopup();
        }
    }

    public responseSetting: ResponseSettingsModel = {
        itemSelect: this.itemSelect
    }
    
    onClick(): void {
        this.inlineAssistComponent.showPopup();
    }

    public onPromptRequest = (args: InlinePromptRequestEventArgs) => {
        setTimeout(() => {
            let defaultResponse = 'For real-time prompt processing, connect to your preferred AI service, '
                + 'such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials '
                + 'to authenticate and enable seamless integration.';
            this.inlineAssistComponent.addResponse(defaultResponse);
        }, 1000);
    };
}
```

## Configure Position

### Using relateTo Property

The `relateTo` property positions the Inline AI Assist popup relative to a specific DOM element (CSS selector or HTMLElement):

```typescript
<ejs-inlineaiassist 
    id="inlineAssist"
    [relateTo]="'#summarizeBtn'"
    popupWidth="500px">
</ejs-inlineaiassist>
```

### Using target Property

The `target` property specifies where the component will be appended in the DOM:

```typescript
<div id="container">
    <button id="summarizeBtn" class="e-btn e-primary">Summarize</button>
    <div id="editableText" contenteditable="true">Your content here</div>
</div>

<ejs-inlineaiassist 
    id="inlineAssist"
    [target]="'#container'"
    [relateTo]="'#summarizeBtn'"
    popupWidth="500px">
</ejs-inlineaiassist>
```

## Run the Application

Execute the development server:

```bash
ng serve
```

The application will be available at `http://localhost:4200/`. The Inline AI Assist component will render when the button is clicked and show the popup relative to the target element.

### Expected Output

- A button labeled "Content Summarize"
- An editable text area with sample content
- When button clicked, Inline AI Assist popup appears with:
  - Prompt textarea with placeholder "Ask or generate AI content.."
  - Send button in the inline toolbar
  - Response display area
  - Accept/Reject action buttons

## Next Steps

After basic setup, explore:
- Configure prompt text and placeholder
- Add command settings for preset operations
- Customize response actions and toolbars
- Implement template customization
- Handle events and integrate with AI services
