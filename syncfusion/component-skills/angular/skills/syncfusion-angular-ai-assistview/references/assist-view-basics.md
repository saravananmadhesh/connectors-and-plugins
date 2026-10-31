# AI AssistView Basics: Core Features and Conversation Management

## Table of Contents
- [Setting Prompt Text](#setting-prompt-text)
- [Prompt Placeholder](#prompt-placeholder)
- [Prompt-Response Collection](#prompt-response-collection)
- [Markdown Response Rendering](#markdown-response-rendering)
- [Configuring Suggestions](#configuring-suggestions)
- [Avatar Customization](#avatar-customization)
- [UI Controls](#ui-controls)
- [Component Configuration](#component-configuration)
- [Globalization and Localization](#globalization-and-localization)

---

## Setting Prompt Text

The `prompt` property allows you to define initial or default text that appears in the prompt input area. This is useful for pre-filling the input with context or guidance.

### Basic Usage

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
      [prompt]="initialPrompt">
    </div>
  `
})
export class AppComponent {
  initialPrompt = 'Please analyze this data...';
}
```

### When to Use
- Pre-populate input with context from previous interactions
- Set default instruction text for users
- Provide template prompts for common queries

---

## Prompt Placeholder

The `promptPlaceholder` property defines the placeholder text displayed in the prompt textarea when it's empty. The default is `"Type prompt for assistance..."`.

### Customization Example

```typescript
@Component({
  imports: [AIAssistViewModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div ejs-aiassistview 
      id='aiAssistView'
      [promptPlaceholder]="'Ask me anything about your code...'">
    </div>
  `
})
export class AppComponent { }
```

### Best Practices
- Keep placeholder text concise (under 50 characters)
- Make it specific to your use case
- Guide users on expected input format if needed

---

## Prompt-Response Collection

The `prompts` property enables you to initialize the component with pre-configured conversation data or retrieve the complete history of user interactions. This automatically stores all user inputs and corresponding AI responses.

### Initialize with Conversation History

```typescript
interface PromptItem {
  prompt: string;
  response: string;
}

@Component({
  imports: [AIAssistViewModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div ejs-aiassistview 
      id='aiAssistView'
      [prompts]="conversationHistory">
    </div>
  `
})
export class AppComponent {
  conversationHistory: PromptItem[] = [
    {
      prompt: 'What is Angular?',
      response: 'Angular is a TypeScript-based open-source web application framework...'
    },
    {
      prompt: 'How do components work?',
      response: 'Components are the basic building blocks of Angular applications...'
    }
  ];
}
```

### Retrieve Conversation History

```typescript
import { ViewChild } from '@angular/core';
import { AIAssistViewComponent } from '@syncfusion/ej2-angular-interactive-chat';

@Component({
  // ... component config
})
export class AppComponent {
  @ViewChild('aiAssistViewComponent')
  public aiAssistViewComponent!: AIAssistViewComponent;

  saveConversation() {
    const history = this.aiAssistViewComponent.prompts;
    console.log('Current conversation:', history);
    // Save to storage or send to server
  }
}
```

### Use Cases
- Resume conversations from previous sessions
- Load context-specific conversation starters
- Maintain conversation history across page refreshes

---

## Markdown Response Rendering

The AI AssistView supports rendering responses as **Markdown** content, which is automatically converted to HTML using the built-in Markdown Converter. The streaming of markdown content happens seamlessly with dynamic rendering support.

### Supported Markdown Features

```typescript
const markdownResponse = `
# Heading 1
## Heading 2

This is **bold** and this is *italic*.

- List item 1
- List item 2
- List item 3

\`\`\`typescript
const greeting = 'Hello, World!';
console.log(greeting);
\`\`\`

[Link to Syncfusion](https://www.syncfusion.com)
`;
```

### Example: Streaming Markdown Response

```typescript
@Component({
  imports: [AIAssistViewModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div ejs-aiassistview 
      id='aiAssistView'
      (promptRequest)="onPromptRequest($event)">
    </div>
  `
})
export class AppComponent {
  @ViewChild('aiAssistViewComponent')
  public aiAssistViewComponent!: AIAssistViewComponent;

  onPromptRequest(args: any) {
    // Example markdown response
    const markdownContent = `
## Summary

You asked about **Angular forms**.

### Key Points:
1. Template-driven forms
2. Reactive forms
3. Form validation

### Example Code:
\`\`\`typescript
import { FormBuilder } from '@angular/forms';

constructor(private fb: FormBuilder) {}
\`\`\`
    `;
    
    setTimeout(() => {
      this.aiAssistViewComponent.addPromptResponse(markdownContent);
    }, 1000);
  }
}
```

### Supported Markdown Syntax
- **Headers:** # to ######
- **Bold:** **text** or __text__
- **Italic:** *text* or _text_
- **Lists:** - or * for unordered, 1. for ordered
- **Code blocks:** \`\`\`language code \`\`\`
- **Inline code:** \`code\`
- **Links:** [text](url)
- **Blockquotes:** > text

---

## Configuring Suggestions

The `promptSuggestions` property provides users with helpful suggestions that appear initially or on-demand. These guide users to discover available functionality.

### Basic Suggestions

```typescript
@Component({
  imports: [AIAssistViewModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div ejs-aiassistview 
      id='aiAssistView'
      [promptSuggestions]="suggestions">
    </div>
  `
})
export class AppComponent {
  suggestions = [
    'What is TypeScript?',
    'Show Angular best practices',
    'How to create services?',
    'Explain dependency injection',
    'What are pipes?'
  ];
}
```

### Customizing Suggestions Header

Use `promptSuggestionsHeader` to add descriptive header text:

```typescript
@Component({
  imports: [AIAssistViewModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div ejs-aiassistview 
      id='aiAssistView'
      [promptSuggestions]="suggestions"
      [promptSuggestionsHeader]="'Suggested Topics'">
    </div>
  `
})
export class AppComponent {
  suggestions = [
    'Getting Started with Angular',
    'Component Architecture',
    'State Management',
    'Testing Strategies'
  ];
}
```

### Best Practices
- Keep 3-5 suggestions initially
- Make suggestions specific and actionable
- Update suggestions based on context
- Group related topics together

---

## Avatar Customization

### User Avatar Customization

The `promptIconCss` property enables customization of the user avatar icon appearing alongside user prompts.

```typescript
@Component({
  imports: [AIAssistViewModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div ejs-aiassistview 
      id='aiAssistView'
      [promptIconCss]="'e-icon-user'"
      style="height: 100vh">
    </div>
  `
})
export class AppComponent { }
```

### AI Assistant Avatar

The `responseIconCss` property allows customization of the AI assistant avatar appearing alongside responses. By default, `e-assistview-icon` is used.

```typescript
@Component({
  imports: [AIAssistViewModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div ejs-aiassistview 
      id='aiAssistView'
      [responseIconCss]="'e-icon-robot'">
    </div>
  `
})
export class AppComponent { }
```

### Custom CSS Class Example

```typescript
// Component template
template: `
  <div ejs-aiassistview 
    id='aiAssistView'
    [promptIconCss]="'custom-user-icon'"
    [responseIconCss]="'custom-assistant-icon'">
  </div>
`

// Add CSS
styles: [`
  :host ::ng-deep .custom-user-icon::before {
    content: '👤';
    font-size: 18px;
  }
  :host ::ng-deep .custom-assistant-icon::before {
    content: '🤖';
    font-size: 18px;
  }
`]
```

---

## UI Controls

### Clear Button

The `showClearButton` property controls the visibility of the clear button in the prompt input area. Default is `false`.

```typescript
@Component({
  imports: [AIAssistViewModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div ejs-aiassistview 
      id='aiAssistView'
      [showClearButton]="true">
    </div>
  `
})
export class AppComponent { }
```

> **Note:** When the clear button is clicked, only the current prompt text is cleared, while the conversation history remains intact.

### Scroll-to-Bottom Indicator

The `enableScrollToBottom` property shows or hides the scroll-to-bottom indicator. Default is `true`.

```typescript
@Component({
  imports: [AIAssistViewModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div ejs-aiassistview 
      id='aiAssistView'
      [enableScrollToBottom]="true">
    </div>
  `
})
export class AppComponent { }
```

When enabled, a floating icon appears when the user scrolls away from the bottom. Clicking it smoothly scrolls the view to display the latest response.

### Practical Example

```typescript
@Component({
  imports: [AIAssistViewModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div ejs-aiassistview 
      id='aiAssistView'
      [promptSuggestions]="suggestions"
      [promptSuggestionsHeader]="'What can I help you with?'"
      [promptPlaceholder]="'Type your question here...'"
      [showClearButton]="true"
      [enableScrollToBottom]="true"
      (promptRequest)="onPromptRequest($event)">
    </div>
  `,
  styles: [`
    :host ::ng-deep #aiAssistView {
      height: 100vh;
      border: 1px solid #e0e0e0;
    }
  `]
})
export class AppComponent {
  suggestions = ['Hello', 'Help', 'Examples'];
  
  onPromptRequest(args: any) {
    // Handle prompt
  }
}
```

---

## Component Configuration

### Height and Width

Control the dimensions of the AI AssistView component using the `height` and `width` properties.

**Default Values:**
- `height`: '100%'
- `width`: '100%'

#### Fixed Dimensions

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
      [height]="'600px'"
      [width]="'800px'">
    </div>
  `
})
export class AppComponent { }
```

#### Responsive Dimensions

```typescript
@Component({
  imports: [AIAssistViewModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="ai-container">
      <div ejs-aiassistview 
        id='aiAssistView'
        [height]="'100%'"
        [width]="'100%'">
      </div>
    </div>
  `,
  styles: [`
    .ai-container {
      height: calc(100vh - 60px);
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      padding: 16px;
    }
  `]
})
export class AppComponent { }
```

#### Dynamic Sizing

```typescript
@Component({
  imports: [AIAssistViewModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="controls">
      <button (click)="setSize('small')">Small</button>
      <button (click)="setSize('medium')">Medium</button>
      <button (click)="setSize('large')">Large</button>
    </div>
    
    <div ejs-aiassistview 
      id='aiAssistView'
      [height]="componentHeight"
      [width]="componentWidth">
    </div>
  `
})
export class AppComponent {
  componentHeight = '600px';
  componentWidth = '800px';

  setSize(size: string) {
    switch (size) {
      case 'small':
        this.componentHeight = '400px';
        this.componentWidth = '600px';
        break;
      case 'medium':
        this.componentHeight = '600px';
        this.componentWidth = '800px';
        break;
      case 'large':
        this.componentHeight = '800px';
        this.componentWidth = '1200px';
        break;
    }
  }
}
```

---

### Show Header

The `showHeader` property controls the visibility of the component header. By default, it's `true`.

```typescript
@Component({
  imports: [AIAssistViewModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div ejs-aiassistview 
      id='aiAssistView'
      [showHeader]="false">
    </div>
  `
})
export class AppComponent { }
```

**When to hide the header:**
- Embedding in a custom layout with your own header
- Creating a minimalist interface
- Building a mobile-optimized view

**Example with Custom Header:**

```typescript
@Component({
  imports: [AIAssistViewModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="custom-layout">
      <div class="custom-header">
        <h2>AI Assistant</h2>
        <button (click)="clearChat()">Clear Chat</button>
      </div>
      
      <div ejs-aiassistview 
        #aiAssistViewComponent
        id='aiAssistView'
        [showHeader]="false"
        (promptRequest)="onPromptRequest($event)">
      </div>
    </div>
  `,
  styles: [`
    .custom-layout {
      display: flex;
      flex-direction: column;
      height: 100vh;
    }
    
    .custom-header {
      padding: 16px;
      background: #2196F3;
      color: white;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .custom-header h2 {
      margin: 0;
    }
    
    .custom-header button {
      padding: 8px 16px;
      background: white;
      color: #2196F3;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  `]
})
export class AppComponent {
  @ViewChild('aiAssistViewComponent')
  public aiAssistViewComponent!: AIAssistViewComponent;

  clearChat() {
    // Clear conversation logic
  }

  onPromptRequest(args: any) {
    setTimeout(() => {
      this.aiAssistViewComponent.addPromptResponse('Response...');
    }, 1000);
  }
}
```

---

### CSS Class Customization

The `cssClass` property allows you to apply custom CSS classes to the AI AssistView component for styling and theming.

```typescript
@Component({
  imports: [AIAssistViewModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div ejs-aiassistview 
      id='aiAssistView'
      [cssClass]="'custom-theme dark-mode'">
    </div>
  `,
  styles: [`
    :host ::ng-deep .custom-theme {
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }
    
    :host ::ng-deep .custom-theme.dark-mode {
      background: #1e1e1e;
      color: #ffffff;
    }
    
    :host ::ng-deep .custom-theme.dark-mode .e-assistview-prompt {
      background: #2d2d2d;
      border-color: #3d3d3d;
    }
    
    :host ::ng-deep .custom-theme.dark-mode .e-assistview-response {
      background: #252525;
    }
  `]
})
export class AppComponent { }
```

**Common Use Cases:**
- Theme switching (light/dark mode)
- Brand-specific styling
- Responsive design variations
- Accessibility enhancements

**Multiple Classes Example:**

```typescript
@Component({
  imports: [AIAssistViewModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="theme-toggle">
      <button (click)="toggleTheme()">Toggle Theme</button>
    </div>
    
    <div ejs-aiassistview 
      id='aiAssistView'
      [cssClass]="currentThemeClass">
    </div>
  `,
  styles: [`
    :host ::ng-deep .light-theme {
      background: #ffffff;
      color: #333333;
    }
    
    :host ::ng-deep .dark-theme {
      background: #1e1e1e;
      color: #ffffff;
    }
    
    :host ::ng-deep .compact-mode {
      font-size: 14px;
      line-height: 1.4;
    }
    
    :host ::ng-deep .compact-mode .e-assistview-prompt,
    :host ::ng-deep .compact-mode .e-assistview-response {
      padding: 8px;
      margin: 4px 0;
    }
  `]
})
export class AppComponent {
  isDarkMode = false;
  currentThemeClass = 'light-theme compact-mode';

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    this.currentThemeClass = this.isDarkMode 
      ? 'dark-theme compact-mode' 
      : 'light-theme compact-mode';
  }
}
```

---

### HTML Attributes

The `htmlAttributes` property allows you to add custom HTML attributes to the AI AssistView component's root element.

```typescript
@Component({
  imports: [AIAssistViewModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div ejs-aiassistview 
      id='aiAssistView'
      [htmlAttributes]="customAttributes">
    </div>
  `
})
export class AppComponent {
  customAttributes = {
    'data-component': 'ai-assistant',
    'data-version': '1.0',
    'aria-label': 'AI Assistant Chat Interface',
    'role': 'application',
    'tabindex': '0'
  };
}
```

**Common Use Cases:**

#### Accessibility Attributes

```typescript
customAttributes = {
  'aria-label': 'AI Powered Assistant',
  'aria-describedby': 'ai-description',
  'role': 'application'
};
```

#### Data Attributes for Analytics

```typescript
customAttributes = {
  'data-tracking-id': 'ai-chat-v2',
  'data-user-type': 'premium',
  'data-region': 'us-west'
};
```

#### Custom Element Attributes

```typescript
customAttributes = {
  'data-theme': 'corporate',
  'data-module': 'customer-support',
  'title': 'AI Support Assistant'
};
```

---

### State Persistence

The `enablePersistence` property enables the component to save its state (conversation history, settings) between page reloads. Default is `false`.

```typescript
@Component({
  imports: [AIAssistViewModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div ejs-aiassistview 
      id='aiAssistView'
      [enablePersistence]="true"
      (promptRequest)="onPromptRequest($event)">
    </div>
  `
})
export class AppComponent {
  onPromptRequest(args: any) {
    // Conversation is automatically saved to localStorage
  }
}
```

**What Gets Persisted:**
- Conversation history (prompts and responses)
- Active view index
- Component state

**Storage Location:** Browser's localStorage with the component ID as the key.

**Example with Custom ID:**

```typescript
@Component({
  imports: [AIAssistViewModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div ejs-aiassistview 
      id='userChatSession123'
      [enablePersistence]="true">
    </div>
  `
})
export class AppComponent {
  // State is saved with key: 'userChatSession123'
}
```

**Clear Persisted Data:**

```typescript
import { Component, ViewChild, OnInit } from '@angular/core';
import { AIAssistViewComponent } from '@syncfusion/ej2-angular-interactive-chat';

@Component({
  imports: [AIAssistViewModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <button (click)="clearPersistedData()">Clear Saved Data</button>
    
    <div ejs-aiassistview 
      #aiAssistViewComponent
      id='aiAssistView'
      [enablePersistence]="true">
    </div>
  `
})
export class AppComponent {
  @ViewChild('aiAssistViewComponent')
  public aiAssistViewComponent!: AIAssistViewComponent;

  clearPersistedData() {
    // Clear from localStorage
    localStorage.removeItem('aiAssistView');
    
    // Optionally reload the page to reset the component
    window.location.reload();
  }
}
```

---

## Globalization and Localization

### Locale Configuration

The `locale` property enables you to set the language and regional settings for the AI AssistView component. Default is `'en-US'` (English - United States).

#### Basic Localization

```typescript
import { Component } from '@angular/core';
import { AIAssistViewModule } from '@syncfusion/ej2-angular-interactive-chat';
import { L10n, setCulture } from '@syncfusion/ej2-base';

// Set culture globally
setCulture('de-DE');

// Load German translations
L10n.load({
  'de-DE': {
    'aiassistview': {
      'promptPlaceholder': 'Geben Sie hier Ihre Frage ein...',
      'sendButton': 'Senden',
      'clearButton': 'Löschen'
    }
  }
});

@Component({
  imports: [AIAssistViewModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div ejs-aiassistview 
      id='aiAssistView'
      [locale]="'de-DE'">
    </div>
  `
})
export class AppComponent { }
```

#### Multi-Language Support

```typescript
import { Component } from '@angular/core';
import { AIAssistViewModule } from '@syncfusion/ej2-angular-interactive-chat';
import { L10n } from '@syncfusion/ej2-base';

// Load multiple language translations
L10n.load({
  'fr-FR': {
    'aiassistview': {
      'promptPlaceholder': 'Tapez votre question ici...',
      'sendButton': 'Envoyer',
      'clearButton': 'Effacer'
    }
  },
  'es-ES': {
    'aiassistview': {
      'promptPlaceholder': 'Escribe tu pregunta aquí...',
      'sendButton': 'Enviar',
      'clearButton': 'Borrar'
    }
  },
  'ja-JP': {
    'aiassistview': {
      'promptPlaceholder': 'ここに質問を入力してください...',
      'sendButton': '送信',
      'clearButton': 'クリア'
    }
  }
});

@Component({
  imports: [AIAssistViewModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="language-selector">
      <button (click)="setLanguage('en-US')">English</button>
      <button (click)="setLanguage('fr-FR')">Français</button>
      <button (click)="setLanguage('es-ES')">Español</button>
      <button (click)="setLanguage('ja-JP')">日本語</button>
    </div>
    
    <div ejs-aiassistview 
      id='aiAssistView'
      [locale]="currentLocale">
    </div>
  `
})
export class AppComponent {
  currentLocale = 'en-US';

  setLanguage(locale: string) {
    this.currentLocale = locale;
  }
}
```

#### Available Locales

Common locale codes:
- `en-US` - English (United States)
- `en-GB` - English (United Kingdom)
- `de-DE` - German (Germany)
- `fr-FR` - French (France)
- `es-ES` - Spanish (Spain)
- `it-IT` - Italian (Italy)
- `pt-BR` - Portuguese (Brazil)
- `zh-CN` - Chinese (Simplified)
- `ja-JP` - Japanese
- `ko-KR` - Korean
- `ar-SA` - Arabic (Saudi Arabia)
- `ru-RU` - Russian

---

### Right-to-Left (RTL) Support

The `enableRtl` property enables right-to-left text direction for languages like Arabic, Hebrew, and Urdu. Default is `false`.

#### Basic RTL Configuration

```typescript
@Component({
  imports: [AIAssistViewModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div ejs-aiassistview 
      id='aiAssistView'
      [enableRtl]="true"
      [locale]="'ar-SA'">
    </div>
  `
})
export class AppComponent { }
```

#### RTL with Arabic Localization

```typescript
import { Component } from '@angular/core';
import { AIAssistViewModule } from '@syncfusion/ej2-angular-interactive-chat';
import { L10n, setCulture } from '@syncfusion/ej2-base';

// Set RTL culture
setCulture('ar-SA');

// Load Arabic translations
L10n.load({
  'ar-SA': {
    'aiassistview': {
      'promptPlaceholder': 'اكتب سؤالك هنا...',
      'sendButton': 'إرسال',
      'clearButton': 'مسح'
    }
  }
});

@Component({
  imports: [AIAssistViewModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div ejs-aiassistview 
      id='aiAssistView'
      [enableRtl]="true"
      [locale]="'ar-SA'"
      [promptPlaceholder]="'اكتب سؤالك هنا...'">
    </div>
  `
})
export class AppComponent { }
```

#### Dynamic RTL Toggle

```typescript
@Component({
  imports: [AIAssistViewModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="direction-toggle">
      <button (click)="toggleDirection()">
        {{ isRtl ? 'Switch to LTR' : 'Switch to RTL' }}
      </button>
    </div>
    
    <div ejs-aiassistview 
      id='aiAssistView'
      [enableRtl]="isRtl"
      [locale]="currentLocale">
    </div>
  `
})
export class AppComponent {
  isRtl = false;
  currentLocale = 'en-US';

  toggleDirection() {
    this.isRtl = !this.isRtl;
    this.currentLocale = this.isRtl ? 'ar-SA' : 'en-US';
  }
}
```

#### RTL Languages Support

Languages that typically use RTL:
- **Arabic** (ar-*): Arabic dialects
- **Hebrew** (he-IL): Hebrew (Israel)
- **Urdu** (ur-PK): Urdu (Pakistan)
- **Persian** (fa-IR): Persian (Iran)
- **Yiddish** (yi): Yiddish

**Complete RTL Example:**

```typescript
import { Component } from '@angular/core';
import { AIAssistViewModule } from '@syncfusion/ej2-angular-interactive-chat';
import { L10n } from '@syncfusion/ej2-base';

L10n.load({
  'he-IL': {
    'aiassistview': {
      'promptPlaceholder': 'הקלד את שאלתך כאן...',
      'sendButton': 'שלח',
      'clearButton': 'נקה'
    }
  }
});

@Component({
  imports: [AIAssistViewModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div ejs-aiassistview 
      id='aiAssistView'
      [enableRtl]="true"
      [locale]="'he-IL'"
      [promptSuggestions]="hebrewSuggestions"
      [promptPlaceholder]="'הקלד את שאלתך כאן...'"
      (promptRequest)="onPromptRequest($event)">
    </div>
  `,
  styles: [`
    :host ::ng-deep #aiAssistView {
      font-family: 'Arial', sans-serif;
      direction: rtl;
    }
  `]
})
export class AppComponent {
  hebrewSuggestions = [
    'מהו בינה מלאכותית?',
    'איך זה עובד?',
    'עזרה'
  ];

  onPromptRequest(args: any) {
    // Handle Hebrew prompts
  }
}
```

---

### Complete Configuration Example

Here's a comprehensive example combining all configuration options:

```typescript
import { Component, ViewChild } from '@angular/core';
import { AIAssistViewModule, AIAssistViewComponent } from '@syncfusion/ej2-angular-interactive-chat';
import { L10n } from '@syncfusion/ej2-base';

@Component({
  imports: [AIAssistViewModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="config-panel">
      <button (click)="toggleRtl()">Toggle RTL</button>
      <button (click)="togglePersistence()">Toggle Persistence</button>
      <button (click)="toggleHeader()">Toggle Header</button>
    </div>
    
    <div ejs-aiassistview 
      #aiAssistViewComponent
      id='configuredAssistView'
      [height]="'600px'"
      [width]="'100%'"
      [locale]="currentLocale"
      [enableRtl]="isRtlEnabled"
      [enablePersistence]="isPersistenceEnabled"
      [showHeader]="isHeaderVisible"
      [cssClass]="'custom-ai-theme'"
      [htmlAttributes]="customAttrs"
      [promptPlaceholder]="'Ask me anything...'"
      [showClearButton]="true"
      [enableScrollToBottom]="true"
      (promptRequest)="onPromptRequest($event)">
    </div>
  `,
  styles: [`
    .config-panel {
      padding: 16px;
      display: flex;
      gap: 8px;
      border-bottom: 1px solid #e0e0e0;
    }
    
    :host ::ng-deep .custom-ai-theme {
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
  `]
})
export class AppComponent {
  @ViewChild('aiAssistViewComponent')
  public aiAssistViewComponent!: AIAssistViewComponent;

  currentLocale = 'en-US';
  isRtlEnabled = false;
  isPersistenceEnabled = true;
  isHeaderVisible = true;

  customAttrs = {
    'aria-label': 'AI Assistant Interface',
    'data-version': '2.0'
  };

  toggleRtl() {
    this.isRtlEnabled = !this.isRtlEnabled;
    this.currentLocale = this.isRtlEnabled ? 'ar-SA' : 'en-US';
  }

  togglePersistence() {
    this.isPersistenceEnabled = !this.isPersistenceEnabled;
  }

  toggleHeader() {
    this.isHeaderVisible = !this.isHeaderVisible;
  }

  onPromptRequest(args: any) {
    setTimeout(() => {
      this.aiAssistViewComponent.addPromptResponse('Response...');
    }, 1000);
  }
}
```

