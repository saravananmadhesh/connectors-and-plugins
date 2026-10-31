# Inline Toolbar Settings

## Table of Contents
- [Overview](#overview)
- [Built-in Toolbar Items](#built-in-toolbar-items)
- [Custom Toolbar Items](#custom-toolbar-items)
- [Toolbar Item Properties](#toolbar-item-properties)
- [Toolbar Positioning](#toolbar-positioning)
- [Toolbar Events](#toolbar-events)
- [Common Patterns](#common-patterns)

---

## Overview

The inline toolbar appears in the footer area of the Inline AI Assist popup and provides quick action buttons. By default, it includes a "Send" button to submit prompts.

Use the `inlineToolbarSettings` property to customize toolbar items, positioning, and behavior.

---

## Built-in Toolbar Items

By default, the inline toolbar renders the `send` item which allows users to send the prompt text.

```typescript
import { InlineAIAssist } from '@syncfusion/ej2-interactive-chat';

// Default configuration (send button is automatically included)
let inlineAssist = new InlineAIAssist({
    relateTo: '#summarizeBtn',
    promptRequest: () => {
        setTimeout(() => {
            inlineAssist.addResponse('AI-generated response...');
        }, 1000);
    }
});

inlineAssist.appendTo('#inlineAssist');
```

The built-in `send` button:
- Appears in the footer toolbar
- Submits the prompt when clicked
- Triggers the `promptRequest` event
- Can be customized or replaced

---

## Custom Toolbar Items

Add custom toolbar items using the `items` property in `inlineToolbarSettings`.

### Basic Custom Items

```typescript
let inlineAssist = new InlineAIAssist({
    relateTo: '#aiBtn',
    inlineToolbarSettings: {
        items: [
            {
                type: 'Input'  // Prompt input field
            },
            {
                iconCss: 'e-icons e-send',
                align: 'Right'
            },
            {
                iconCss: 'e-icons e-clear',
                align: 'Right',
                tooltip: 'Clear'
            }
        ]
    },
    promptRequest: handlePrompt
});
```

### Item Types

**Input Type:** The prompt textarea input.

```typescript
{
    type: 'Input'  // Always include this for prompt input
}
```

**Button Type (with icon):**

```typescript
{
    iconCss: 'e-icons e-send',
    tooltip: 'Send prompt'
}
```

**Button Type (with text):**

```typescript
{
    text: 'Submit',
    align: 'Right'
}
```

---

## Toolbar Item Properties

### Setting ID

```typescript
inlineToolbarSettings: {
    items: [
        {
            type: 'Input'
        },
        {
            id: 'send-btn',
            iconCss: 'e-icons e-send',
            align: 'Right'
        },
        {
            id: 'clear-btn',
            iconCss: 'e-icons e-clear',
            align: 'Right'
        }
    ]
}
```

### Icon CSS

```typescript
inlineToolbarSettings: {
    items: [
        {
            type: 'Input'
        },
        {
            iconCss: 'e-icons e-send',  // Syncfusion icon
            align: 'Right'
        },
        {
            iconCss: 'custom-icon',  // Custom icon
            align: 'Right'
        }
    ]
}
```

**Custom Icon CSS:**

```css
.custom-icon::before {
    content: '\e7c5';
    font-family: 'custom-icons';
}
```

### Text and Tooltip

```typescript
inlineToolbarSettings: {
    items: [
        {
            type: 'Input'
        },
        {
            text: 'Send',
            tooltip: 'Send prompt to AI',
            align: 'Right'
        },
        {
            iconCss: 'e-icons e-clear',
            tooltip: 'Clear input',
            align: 'Right'
        }
    ]
}
```

### Alignment

Use the `align` property to position toolbar items.

```typescript
inlineToolbarSettings: {
    items: [
        {
            type: 'Input',
            align: 'Left'  // Input on left (default)
        },
        {
            iconCss: 'e-icons e-send',
            align: 'Right'  // Send button on right
        },
        {
            iconCss: 'e-icons e-help',
            align: 'Left',  // Help button on left
            tooltip: 'Help'
        }
    ]
}
```

**Alignment Options:**
- `'Left'` - Align to left side
- `'Right'` - Align to right side
- `'Center'` - Center align (rarely used)

### Disabled State

```typescript
inlineToolbarSettings: {
    items: [
        {
            type: 'Input'
        },
        {
            id: 'send-btn',
            iconCss: 'e-icons e-send',
            disabled: false,  // Enabled
            align: 'Right'
        },
        {
            id: 'premium-btn',
            iconCss: 'e-icons e-star',
            disabled: true,  // Disabled
            tooltip: 'Premium feature',
            align: 'Right'
        }
    ]
}
```

### Template

Use the `template` property to create custom toolbar item UI.

```typescript
inlineToolbarSettings: {
    items: [
        {
            type: 'Input'
        },
        {
            template: '<button class="e-btn e-primary custom-send">Generate</button>',
            align: 'Right'
        }
    ]
}
```

**Template with Function:**

```typescript
inlineToolbarSettings: {
    items: [
        {
            type: 'Input'
        },
        {
            template: () => {
                return `
                    <div class="custom-actions">
                        <button class="e-btn e-send-btn">Send</button>
                        <button class="e-btn e-voice-btn">🎤</button>
                    </div>
                `;
            },
            align: 'Right'
        }
    ]
}
```

---

## Toolbar Positioning

Use the `toolbarPosition` property to control where the toolbar appears.

### Inline Position (Default)

```typescript
let inlineAssist = new InlineAIAssist({
    relateTo: '#aiBtn',
    inlineToolbarSettings: {
        toolbarPosition: 'Inline',  // Toolbar in footer, inline with input
        items: [
            { type: 'Input' },
            { iconCss: 'e-icons e-send', align: 'Right' }
        ]
    }
});
```

### Bottom Position

```typescript
let inlineAssist = new InlineAIAssist({
    relateTo: '#aiBtn',
    inlineToolbarSettings: {
        toolbarPosition: 'Bottom',  // Toolbar at bottom edge
        items: [
            { type: 'Input' },
            { iconCss: 'e-icons e-send', align: 'Right' }
        ]
    }
});
```

**Position Options:**
- `'Inline'` (default) - Toolbar appears inline with input area
- `'Bottom'` - Toolbar appears at the bottom edge of popup

---

## Toolbar Events

### ItemClick Event

The `itemClick` event is triggered when a toolbar item is clicked.

```typescript
inlineToolbarSettings: {
    items: [
        { type: 'Input' },
        { id: 'send-btn', iconCss: 'e-icons e-send', align: 'Right' },
        { id: 'clear-btn', iconCss: 'e-icons e-clear', align: 'Right' }
    ],
    itemClick: (args) => {
        console.log('Clicked item:', args.item.id);
        
        if (args.item.id === 'clear-btn') {
            // Clear the input
            document.querySelector('.e-prompt-textarea').value = '';
        }
    }
}
```

### ItemClick Event Arguments

```typescript
import { ToolbarItemClickEventArgs } from '@syncfusion/ej2-interactive-chat';

inlineToolbarSettings: {
    items: [...],
    itemClick: (args: ToolbarItemClickEventArgs) => {
        // args.item - The toolbar item that was clicked
        console.log('Item ID:', args.item.id);
        console.log('Item text:', args.item.text);
        
        // args.event - Native browser event
        console.log('Event:', args.event);
        
        // args.cancel - Prevent default action
        args.cancel = false;
    }
}
```

### Cancel Default Action

```typescript
inlineToolbarSettings: {
    items: [...],
    itemClick: (args) => {
        if (args.item.id === 'send-btn') {
            // Prevent default send action
            args.cancel = true;
            
            // Custom send logic
            customSendPrompt();
        }
    }
}
```

---

## Common Patterns

### Pattern 1: Send and Clear Buttons

```typescript
let inlineAssist = new InlineAIAssist({
    relateTo: '#aiBtn',
    inlineToolbarSettings: {
        items: [
            {
                type: 'Input'
            },
            {
                id: 'clear-btn',
                iconCss: 'e-icons e-clear',
                tooltip: 'Clear input',
                align: 'Right'
            },
            {
                id: 'send-btn',
                iconCss: 'e-icons e-send',
                tooltip: 'Send prompt',
                align: 'Right'
            }
        ],
        itemClick: (args) => {
            if (args.item.id === 'clear-btn') {
                const textarea = document.querySelector('.e-prompt-textarea');
                if (textarea) textarea.value = '';
            }
        }
    },
    promptRequest: handlePrompt
});
```

### Pattern 2: Voice Input Button

```typescript
let inlineAssist = new InlineAIAssist({
    relateTo: '#aiBtn',
    inlineToolbarSettings: {
        items: [
            {
                type: 'Input'
            },
            {
                id: 'voice-btn',
                iconCss: 'e-icons e-microphone',
                tooltip: 'Voice input',
                align: 'Left'
            },
            {
                iconCss: 'e-icons e-send',
                align: 'Right'
            }
        ],
        itemClick: (args) => {
            if (args.item.id === 'voice-btn') {
                startVoiceRecognition();
            }
        }
    }
});

function startVoiceRecognition() {
    if ('webkitSpeechRecognition' in window) {
        const recognition = new webkitSpeechRecognition();
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            document.querySelector('.e-prompt-textarea').value = transcript;
        };
        recognition.start();
    }
}
```

### Pattern 3: Character Counter

```typescript
let inlineAssist = new InlineAIAssist({
    relateTo: '#aiBtn',
    inlineToolbarSettings: {
        items: [
            {
                type: 'Input'
            },
            {
                id: 'counter',
                template: '<span class="char-counter">0 / 500</span>',
                align: 'Left'
            },
            {
                iconCss: 'e-icons e-send',
                align: 'Right'
            }
        ]
    },
    created: () => {
        const textarea = document.querySelector('.e-prompt-textarea');
        const counter = document.querySelector('.char-counter');
        
        textarea.addEventListener('input', () => {
            const count = textarea.value.length;
            counter.textContent = `${count} / 500`;
            
            if (count > 500) {
                counter.style.color = 'red';
            } else {
                counter.style.color = '';
            }
        });
    }
});
```

### Pattern 4: Template Selector

```typescript
let inlineAssist = new InlineAIAssist({
    relateTo: '#aiBtn',
    inlineToolbarSettings: {
        items: [
            {
                type: 'Input'
            },
            {
                id: 'template-btn',
                iconCss: 'e-icons e-list',
                tooltip: 'Use template',
                align: 'Left'
            },
            {
                iconCss: 'e-icons e-send',
                align: 'Right'
            }
        ],
        itemClick: (args) => {
            if (args.item.id === 'template-btn') {
                showTemplateMenu();
            }
        }
    }
});

function showTemplateMenu() {
    const templates = [
        'Summarize this content',
        'Translate to Spanish',
        'Fix grammar errors'
    ];
    
    // Show menu and populate input with selected template
    // Implementation depends on your menu system
}
```

### Pattern 5: Custom Styled Toolbar

```typescript
let inlineAssist = new InlineAIAssist({
    relateTo: '#aiBtn',
    cssClass: 'custom-toolbar-style',
    inlineToolbarSettings: {
        toolbarPosition: 'Bottom',
        items: [
            {
                type: 'Input'
            },
            {
                template: `
                    <div class="custom-actions">
                        <button class="action-btn help-btn">
                            <i class="e-icons e-help"></i>
                        </button>
                        <button class="action-btn send-btn primary">
                            <i class="e-icons e-send"></i> Generate
                        </button>
                    </div>
                `,
                align: 'Right'
            }
        ]
    }
});
```

```css
.custom-toolbar-style .e-footer .e-toolbar {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 10px;
}

.custom-actions {
    display: flex;
    gap: 8px;
}

.action-btn {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    background: rgba(255, 255, 255, 0.2);
    color: white;
}

.action-btn.primary {
    background: rgba(255, 255, 255, 0.9);
    color: #333;
    font-weight: bold;
}
```

---

## Complete Example

```typescript
import { InlineAIAssist, ToolbarItemClickEventArgs } from '@syncfusion/ej2-interactive-chat';

let inlineAssist = new InlineAIAssist({
    relateTo: '#improveBtn',
    popupWidth: '550px',
    
    inlineToolbarSettings: {
        // Toolbar positioning
        toolbarPosition: 'Inline',
        
        // Toolbar items
        items: [
            {
                id: 'help-btn',
                iconCss: 'e-icons e-help',
                tooltip: 'Help',
                align: 'Left',
                disabled: false
            },
            {
                type: 'Input'  // Prompt input
            },
            {
                id: 'clear-btn',
                iconCss: 'e-icons e-clear',
                tooltip: 'Clear input',
                align: 'Right',
                disabled: false
            },
            {
                id: 'send-btn',
                iconCss: 'e-icons e-send',
                tooltip: 'Send prompt',
                align: 'Right',
                disabled: false
            }
        ],
        
        // Event handler
        itemClick: (args: ToolbarItemClickEventArgs) => {
            console.log('Toolbar item clicked:', args.item.id);
            
            if (args.item.id === 'clear-btn') {
                const textarea = document.querySelector('.e-prompt-textarea');
                if (textarea) textarea.value = '';
            } else if (args.item.id === 'help-btn') {
                showHelpDialog();
            }
        }
    },
    
    promptRequest: (args) => {
        callAIService(args.prompt).then(response => {
            inlineAssist.addResponse(response);
        });
    }
});

inlineAssist.appendTo('#inlineAssist');
```
