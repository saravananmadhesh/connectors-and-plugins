# Getting Started with Syncfusion AI AssistView

## Installation and Package Setup

The Syncfusion AI AssistView component is distributed as part of the `@syncfusion/ej2-angular-interactive-chat` package. It includes all necessary dependencies for creating conversational AI interfaces in Angular.

### Required Dependencies

```javascript
|-- @syncfusion/ej2-angular-interactive-chat
    |-- @syncfusion/ej2-angular-base
    |-- @syncfusion/ej2-base
    |-- @syncfusion/ej2-navigations
    |-- @syncfusion/ej2-inputs
```

### Installation Steps

**Step 1: Set up Angular environment**

Install Angular CLI if you haven't already:
```bash
npm install -g @angular/cli
```

**Step 2: Create Angular application**

```bash
ng new my-app
cd my-app
```

**Step 3: Install AI AssistView package**

For modern Angular (version 12+) with Ivy library distribution:
```bash
npm install @syncfusion/ej2-angular-interactive-chat --save
```

## CSS Configuration

To install the material3 theme package, use the following command:

```bash
npm install @syncfusion/ej2-material3-theme --save
```

Add required CSS imports to your `src/styles.css` file:

```css
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/ai-assistview/index.css";
```

These imports include all themes and styling required for the component to render correctly. You can replace `material3` with other available themes like `material`, `bootstrap5`, `fabric`, or `tailwind`.

## Basic Component Implementation

### Minimal Example

Update `src/app/app.component.ts`:

```typescript
import { Component } from '@angular/core';
import { AIAssistViewModule } from '@syncfusion/ej2-angular-interactive-chat';

@Component({
  imports: [AIAssistViewModule],
  standalone: true,
  selector: 'app-root',
  template: `<div ejs-aiassistview id='aiAssistView'></div>`
})
export class AppComponent { }
```

### Bootstrap the Application

Update `src/main.ts`:

```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import 'zone.js';

bootstrapApplication(AppComponent).catch((err) => console.error(err));
```

### Run the Application

```bash
ng serve
```

Visit `http://localhost:4200/` in your browser to see the component.

## Initial Configuration Example

Here's a basic setup with suggestions and event handling:

```typescript
import { Component, ViewChild } from '@angular/core';
import { AIAssistViewModule, AIAssistViewComponent, PromptRequestEventArgs } from '@syncfusion/ej2-angular-interactive-chat';

@Component({
  imports: [AIAssistViewModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div ejs-aiassistview 
      #aiAssistViewComponent
      id='aiAssistView'
      [promptSuggestions]="suggestions"
      (promptRequest)="onPromptRequest($event)"
      style="height: 100vh">
    </div>
  `
})
export class AppComponent {
  @ViewChild('aiAssistViewComponent')
  public aiAssistViewComponent!: AIAssistViewComponent;

  suggestions = [
    'What can you help me with?',
    'Show me an example',
    'Tell me about your features'
  ];

  onPromptRequest(args: PromptRequestEventArgs) {
    // Handle the prompt request here
    setTimeout(() => {
      const response = 'Thank you for your prompt. This is a sample response.';
      this.aiAssistViewComponent.addPromptResponse(response);
    }, 1000);
  }
}
```

## Version Compatibility

- **Angular Version:** 12 and above (with Ivy library package)
- **Angular Version:** Below 12 (with ngcc package)
- **Syncfusion EJ2 Package:** Version 20.2.36 and above

> **Note:** Starting from version 33.1x, the component automatically scrolls to the latest prompt and response, eliminating the need for manual scrolling.

## Next Steps

- Configure prompt suggestions for your use case
- Set up event handlers for `promptRequest`
- Choose an AI service provider (OpenAI, Gemini, etc.)
- Customize appearance and styling

