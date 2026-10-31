# Getting Started with Inline AI Assist

This guide covers installation, basic setup, and your first Inline AI Assist implementation.

## Package Installation

### NPM Installation

```bash
npm install @syncfusion/ej2-interactive-chat --save
```

## CSS Imports and Theme Configuration

To install the fluent2 theme package, use the following command:

```bash
npm install @syncfusion/ej2-fluent2-theme --save
```

```css
@import "../../node_modules/@syncfusion/ej2-fluent2-theme/styles/inline-ai-assist/index.css";
```

### Available Themes

- Material: `material.css`
- Bootstrap: `bootstrap.css`
- Fabric: `fabric.css`
- Tailwind: `tailwind.css`
- High Contrast: `highcontrast.css`

---

## Basic Inline AI Assist Initialization

### TypeScript Implementation

```typescript
import { InlineAIAssist } from '@syncfusion/ej2-interactive-chat';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

// Initialize Inline AI Assist
let inlineAssist: InlineAIAssist = new InlineAIAssist({
    relateTo: '#summarizeBtn',
    promptRequest: () => {
        setTimeout(() => {
            let defaultResponse = 'For real-time prompt processing, connect the Inline AI Assist component to your preferred AI service, such as OpenAI or Azure Cognitive Services.';
            inlineAssist.addResponse(defaultResponse);
        }, 1000);
    },
    responseSettings: {
        itemSelect: (args: any): void => {
            if (args.command.label === 'Accept') {
                const editable = document.getElementById('editableText') as HTMLElement;
                if (editable) {
                    editable.innerHTML = '<p>' + inlineAssist.prompts[inlineAssist.prompts.length - 1].response + '</p>';
                }
                inlineAssist.hidePopup();
            } else if (args.command.label === 'Discard') {
                inlineAssist.hidePopup();
            }
        }
    }
});

// Render initialized Inline AI Assist
inlineAssist.appendTo('#inlineAssist');

// Show popup on button click
const summarizeBtn = document.querySelector('#summarizeBtn') as HTMLElement;
if (summarizeBtn) {
    summarizeBtn.addEventListener('click', () => {
        inlineAssist.showPopup();
    });
}
```

### JavaScript Implementation

```javascript
var inlineAssist = new ej.interactivechat.InlineAIAssist({
    relateTo: '#summarizeBtn',
    promptRequest: function() {
        setTimeout(function() {
            var defaultResponse = 'For real-time prompt processing, connect to your AI service.';
            inlineAssist.addResponse(defaultResponse);
        }, 1000);
    },
    responseSettings: {
        itemSelect: function(args) {
            if (args.command.label === 'Accept') {
                document.getElementById('editableText').innerHTML = inlineAssist.prompts[inlineAssist.prompts.length - 1].response;
                inlineAssist.hidePopup();
            } else if (args.command.label === 'Discard') {
                inlineAssist.hidePopup();
            }
        }
    }
});

inlineAssist.appendTo('#inlineAssist');

document.getElementById('summarizeBtn').addEventListener('click', function() {
    inlineAssist.showPopup();
});
```

---

## HTML Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Inline AI Assist - Getting Started</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    
    <!-- Syncfusion CSS -->
    <link href="https://cdn.syncfusion.com/ej2/32.1.19/ej2-base/styles/fluent2.css" rel="stylesheet" />
    <link href="https://cdn.syncfusion.com/ej2/32.1.19/ej2-interactive-chat/styles/fluent2.css" rel="stylesheet" />
    <link href="https://cdn.syncfusion.com/ej2/32.1.19/ej2-inputs/styles/fluent2.css" rel="stylesheet" />
    <link href="https://cdn.syncfusion.com/ej2/32.1.19/ej2-buttons/styles/fluent2.css" rel="stylesheet" />
    <link href="https://cdn.syncfusion.com/ej2/32.1.19/ej2-navigations/styles/fluent2.css" rel="stylesheet" />
    
    <style>
        #editableText {
            width: 100%;
            min-height: 120px;
            max-height: 300px;
            overflow-y: auto;
            font-size: 16px;
            padding: 12px;
            border-radius: 4px;
            border: 1px solid #ddd;
        }
    </style>
</head>
<body>
    <div id='container' style="width: 650px; margin: 20px auto;">
        <button id="summarizeBtn" class="e-btn e-primary" style="margin-bottom: 10px;">
            Summarize Content
        </button>
        
        <div id="editableText" contenteditable="true">
            <p>Inline AI Assist component provides intelligent text processing capabilities that enhance user productivity.</p>
        </div>
        
        <!-- Inline AI Assist element -->
        <div id="inlineAssist"></div>
    </div>
    
    <script src="https://cdnjs.cloudflare.com/ajax/libs/systemjs/0.19.38/system.js"></script>
    <script src="app.js"></script>
</body>
</html>
```

---

## Relate To Property - Element Targeting

The `relateTo` property is critical for positioning the popup relative to a specific element.

### CSS Selector Targeting

```typescript
// Target by ID
let inlineAssist = new InlineAIAssist({
    relateTo: '#myButton'
});

// Target by class
let inlineAssist = new InlineAIAssist({
    relateTo: '.improve-btn'
});

// Target by element type
let inlineAssist = new InlineAIAssist({
    relateTo: 'button[data-action="improve"]'
});
```

### Dynamic Element Targeting

```typescript
let inlineAssist = new InlineAIAssist();
inlineAssist.appendTo('#inlineAssist');

// Change target element dynamically
document.querySelectorAll('.ai-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        inlineAssist.relateTo = '#' + this.id;
        inlineAssist.showPopup();
    });
});
```

---

## PromptRequest Event Basics

The `promptRequest` event is triggered when a user submits a prompt. Use this to integrate with your AI service.

### Simple PromptRequest Handler

```typescript
let inlineAssist = new InlineAIAssist({
    relateTo: '#aiBtn',
    promptRequest: (args) => {
        console.log('Prompt:', args.prompt);
        
        // Simulate AI response
        setTimeout(() => {
            inlineAssist.addResponse('This is the AI-generated response.');
        }, 1000);
    }
});
```

### PromptRequest with Event Arguments

```typescript
promptRequest: (args: InlinePromptRequestEventArgs) => {
    // Access prompt text
    console.log('User prompt:', args.prompt);
    
    // Call AI service
    getAIResponse(args.prompt).then(response => {
        inlineAssist.addResponse(response);
    }).catch(error => {
        inlineAssist.addResponse('Error: ' + error.message);
    });
}
```

---

## Width, Height, and Z-Index Configuration

### Setting Popup Dimensions

```typescript
let inlineAssist = new InlineAIAssist({
    relateTo: '#btn',
    popupWidth: '500px',      // Default: '400px'
    popupHeight: '350px',     // Default: 'auto'
    promptRequest: handlePrompt
});
```

### Z-Index for Overlays

```typescript
let inlineAssist = new InlineAIAssist({
    relateTo: '#btn',
    zIndex: 2000,  // Default: 1000
    promptRequest: handlePrompt
});
```

### Responsive Width

```typescript
let inlineAssist = new InlineAIAssist({
    relateTo: '#btn',
    popupWidth: window.innerWidth > 768 ? '600px' : '90%',
    promptRequest: handlePrompt
});
```

---

## First Render Example - Complete Workflow

```typescript
import { InlineAIAssist, InlinePromptRequestEventArgs } from '@syncfusion/ej2-interactive-chat';

// Initialize component
let inlineAssist = new InlineAIAssist({
    relateTo: '#improveBtn',
    placeholder: 'Ask AI to improve this text...',
    popupWidth: '500px',
    zIndex: 1000,
    
    // Handle prompt submission
    promptRequest: (args: InlinePromptRequestEventArgs) => {
        // Show loading state
        console.log('Processing prompt:', args.prompt);
        
        // Call your AI service
        fetch('https://your-ai-api.com/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: args.prompt })
        })
        .then(res => res.json())
        .then(data => {
            // Add response to popup
            inlineAssist.addResponse(data.response);
        })
        .catch(err => {
            inlineAssist.addResponse('Error: Unable to process request');
        });
    },
    
    // Handle response actions
    responseSettings: {
        itemSelect: (args) => {
            if (args.command.label === 'Accept') {
                // Apply the response
                document.getElementById('content').innerText = 
                    inlineAssist.prompts[inlineAssist.prompts.length - 1].response;
                inlineAssist.hidePopup();
            } else if (args.command.label === 'Discard') {
                // Discard the response
                inlineAssist.hidePopup();
            }
        }
    }
});

// Render component
inlineAssist.appendTo('#inlineAssist');

// Trigger popup on button click
document.getElementById('improveBtn').addEventListener('click', () => {
    inlineAssist.showPopup();
});
```

---

## Troubleshooting

### Popup Not Showing

**Issue:** Popup doesn't appear when button is clicked.

**Solution:** Ensure `relateTo` selector matches an existing element and `showPopup()` is called.

```typescript
// Verify element exists
const targetElement = document.querySelector('#myBtn');
if (!targetElement) {
    console.error('Target element not found');
}

// Show popup
inlineAssist.showPopup();
```

### Styles Not Applied

**Issue:** Component appears unstyled.

**Solution:** Ensure all required CSS files are imported in the correct order.

```typescript
import "@syncfusion/ej2-fluent2-theme/styles/inline-ai-assist/index.css";
```

### PromptRequest Not Firing

**Issue:** `promptRequest` event doesn't trigger when prompt is submitted.

**Solution:** Verify event handler is defined correctly and send button is enabled.

```typescript
promptRequest: (args) => {
    console.log('Event fired:', args);
    // Add your logic here
}
```
