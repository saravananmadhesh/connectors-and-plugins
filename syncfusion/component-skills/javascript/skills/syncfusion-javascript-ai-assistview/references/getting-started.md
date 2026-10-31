# Getting Started with AI AssistView

This guide covers the installation, setup, and basic initialization of the Syncfusion AI AssistView component in JavaScript.

## Installation

### NPM Installation

Install the AI AssistView package from npm:

```bash
npm install @syncfusion/ej2-interactive-chat --save
```

## CSS Imports

### NPM CSS Imports

To install the fluent2 theme package, use the following command:

```bash
npm install @syncfusion/ej2-fluent2-theme --save
```

In your html or css file:

```css
@import "../../node_modules/@syncfusion/ej2-fluent2-theme/styles/ai-assistview/index.css";
```

**Available Themes:** material, bootstrap5, bootstrap4, bootstrap, tailwind, fabric, fluent, highcontrast

## Basic Initialization

### HTML Structure

Create a container element in your `index.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>AI AssistView</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link href="https://cdn.syncfusion.com/ej2/32.1.19/fluent2.css" rel="stylesheet" />
</head>
<body>
    <div id='container' style="height: 350px; width: 650px;">
        <div id="aiAssistView"></div>
    </div>
</body>
</html>
```

### TypeScript Initialization

Import and initialize the AI AssistView control:

```typescript
import { AIAssistView } from '@syncfusion/ej2-interactive-chat';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

// Initialize AI AssistView
const aiAssistView: AIAssistView = new AIAssistView({});

// Render to DOM
aiAssistView.appendTo('#aiAssistView');
```

### Run the Application

```bash
npm start
```

## First Render with Prompts and Responses

### Configure Suggestions and Responses

```typescript
import { AIAssistView, PromptRequestEventArgs } from '@syncfusion/ej2-interactive-chat';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

// Predefined prompts data
const prompts = [
    {
        prompt: "How do I prioritize my tasks?",
        response: "Prioritize tasks by urgency and impact: tackle high-impact tasks first, delegate when possible, and break large tasks into smaller steps."
    },
    {
        prompt: "How can I improve my time management skills?",
        response: "To improve time management skills, try setting clear goals, using a planner or digital tools, prioritizing tasks, and minimizing distractions."
    }
];

// Initialize AI AssistView
const aiAssistView: AIAssistView = new AIAssistView({
    promptSuggestions: [
        "How do I prioritize my tasks?",
        "How can I improve my time management skills?"
    ],
    promptRequest: (args: PromptRequestEventArgs) => {
        setTimeout(() => {
            // Find matching prompt
            const foundPrompt = prompts.find(p => p.prompt === args.prompt);
            const defaultResponse = 'For real-time prompt processing, connect the AI AssistView control to your preferred AI service, such as OpenAI or Azure Cognitive Services.';
            
            // Add response
            aiAssistView.addPromptResponse(foundPrompt ? foundPrompt.response : defaultResponse);
        }, 2000);
    }
});

aiAssistView.appendTo('#aiAssistView');
```

## PromptRequest Event Handling

The `promptRequest` event is the core integration point for AI services. It fires when a user submits a prompt.

### Event Args

```typescript
interface PromptRequestEventArgs {
    prompt: string;                      // The user's prompt text
    cancel: boolean;                      // Set to true to cancel the request
    attachedFiles?: FileInfo[];          // Files attached with the prompt
    promptSuggestions?: string[];        // Updated suggestions after response
    responseToolbarItems?: ToolbarItemModel[];  // Toolbar items for response
    name: string;                        // Event name
}
```

### Adding Responses

Use the `addPromptResponse()` method to add AI responses:

```typescript
promptRequest: (args: PromptRequestEventArgs) => {
    // Process the prompt
    const response = processPrompt(args.prompt);
    
    // Add response
    aiAssistView.addPromptResponse(response);
}
```

### Method Signature

```typescript
addPromptResponse(outputResponse: string | PromptModel, isFinalUpdate?: boolean): void
```

- **String response**: Updates the last prompt's response
- **PromptModel object**: Adds a new prompt-response pair or updates existing
- **isFinalUpdate**: For streaming responses (default: true)

## Width and Height Configuration

### Setting Dimensions

```typescript
const aiAssistView: AIAssistView = new AIAssistView({
    width: '700px',    // String or number
    height: '400px',   // String or number
    // Or use percentage
    width: '100%',
    height: '100%'
});
```

### Responsive Container

```html
<div id='container' style="height: 100vh; width: 100%;">
    <div id="aiAssistView"></div>
</div>
```

```typescript
const aiAssistView: AIAssistView = new AIAssistView({
    width: '100%',
    height: '100%'
});
```

## Locale and Localization

### Setting Locale

```typescript
import { L10n } from '@syncfusion/ej2-base';

// Load locale strings
L10n.load({
    'de-DE': {
        'aiassistview': {
            'promptPlaceholder': 'Geben Sie eine Aufforderung zur Unterstützung ein...',
            'clearButton': 'Löschen',
            'sendButton': 'Senden'
        }
    }
});

// Apply locale
const aiAssistView: AIAssistView = new AIAssistView({
    locale: 'de-DE'
});
```

### Default Locale

The default global culture is `'en-US'`. Set the `locale` property to override:

```typescript
const aiAssistView: AIAssistView = new AIAssistView({
    locale: 'fr-FR'  // French
});
```

## Enable Persistence

Enable state persistence across page reloads:

```typescript
const aiAssistView: AIAssistView = new AIAssistView({
    enablePersistence: true
});
```

**What gets persisted:**
- Prompt history
- Response data
- View state
- Toolbar states

**Note:** Requires a unique component ID for persistence to work correctly.

## Complete Example

```typescript
import { AIAssistView, PromptRequestEventArgs } from '@syncfusion/ej2-interactive-chat';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

const aiAssistView: AIAssistView = new AIAssistView({
    width: '700px',
    height: '400px',
    locale: 'en-US',
    enablePersistence: false,
    promptSuggestions: [
        'How do I get started?',
        'What are the main features?',
        'How do I integrate with OpenAI?'
    ],
    promptRequest: (args: PromptRequestEventArgs) => {
        // Simulate AI response
        setTimeout(() => {
            const response = `You asked: "${args.prompt}". Here's a helpful response!`;
            aiAssistView.addPromptResponse(response);
        }, 1000);
    }
});

aiAssistView.appendTo('#aiAssistView');
```

## Troubleshooting

### Component Not Rendering

**Issue:** AI AssistView doesn't appear on the page.

**Solutions:**
- Verify all CSS files are imported
- Check container has height set
- Ensure `appendTo()` targets correct element ID
- Confirm all dependencies are installed

### PromptRequest Not Firing

**Issue:** Event doesn't trigger when submitting prompts.

**Solutions:**
- Check event handler is properly attached
- Verify syntax: `promptRequest: (args) => { ... }`
- Ensure no JavaScript errors in console

### Styling Issues

**Issue:** Component looks unstyled or broken.

**Solutions:**
- Import all required CSS files in correct order
- Check CSS paths are correct (CDN or local)
- Clear browser cache
- Verify theme CSS is loaded
