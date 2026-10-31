# Command Settings - Quick Action Popup

## Table of Contents
- [Overview](#overview)
- [Configure Command Items](#configure-command-items)
- [Command Item Properties](#command-item-properties)
- [Command Popup Dimensions](#command-popup-dimensions)
- [Command Events](#command-events)
- [Common Patterns](#common-patterns)

---

## Overview

The command settings feature provides a quick action popup menu with predefined AI commands like "Summarize", "Translate", "Improve", etc. Users can click these commands to trigger AI processing without typing prompts manually.

Use the `commandSettings` property to configure commands, popup dimensions, and behavior.

---

## Configure Command Items

Use the `commands` array in `commandSettings` to define available command items.

### Basic Command Configuration

```typescript
import { InlineAIAssist } from '@syncfusion/ej2-interactive-chat';

let inlineAssist = new InlineAIAssist({
    relateTo: '#aiBtn',
    commandSettings: {
        commands: [
            {
                label: 'Summarize',
                prompt: 'Summarize the content'
            },
            {
                label: 'Shorten',
                prompt: 'Shorten the content'
            },
            {
                label: 'Translate',
                prompt: 'Translate the content'
            },
            {
                label: 'Make professional',
                prompt: 'Make the content more professional'
            }
        ]
    },
    promptRequest: () => {
        setTimeout(() => {
            inlineAssist.addResponse('AI-generated response...');
        }, 1000);
    }
});

inlineAssist.appendTo('#inlineAssist');
```

### How Commands Work

1. User clicks button to show popup
2. Command popup appears with predefined commands
3. User selects a command (e.g., "Summarize")
4. The command's `prompt` is automatically sent to `promptRequest` event
5. AI response is processed and displayed

---

## Command Item Properties

### Setting ID

Use the `id` property to assign a unique identifier to each command item.

```typescript
commandSettings: {
    commands: [
        {
            id: 'cmd-summarize',
            label: 'Summarize',
            prompt: 'Summarize the content'
        },
        {
            id: 'cmd-translate',
            label: 'Translate',
            prompt: 'Translate to Spanish'
        }
    ]
}
```

**Use Case:** Detect which command was selected in the `itemSelect` event.

```typescript
commandSettings: {
    commands: [{
            label: 'Summarize',
            prompt: 'Summarize the following content in 3 sentences'
        },
        {
            label: 'Translate to Spanish',
            prompt: 'Translate the following text to Spanish'
        },],
    itemSelect: (args) => {
        if (args.command.id === 'cmd-summarize') {
            console.log('Summarize command selected');
        }
    }
}
```

### Setting Label

Use the `label` property to specify the visible text for each command.

```typescript
commandSettings: {
    commands: [
        {
            label: 'Summarize',
            prompt: 'Summarize this content'
        },
        {
            label: 'Make it shorter',
            prompt: 'Reduce the length of this content'
        }
    ]
}
```

### Configure Prompt

Use the `prompt` property to specify the text sent to the AI service when the command is selected.

```typescript
commandSettings: {
    commands: [
        {
            label: 'Summarize',
            prompt: 'Summarize the following content in 3 sentences'
        },
        {
            label: 'Translate to Spanish',
            prompt: 'Translate the following text to Spanish'
        },
        {
            label: 'Fix Grammar',
            prompt: 'Fix any grammar and spelling errors in the following text'
        }
    ]
}
```

### Adding Icon CSS

Use the `iconCss` property to add icons alongside command labels.

```typescript
commandSettings: {
    commands: [
        {
            label: 'Summarize',
            prompt: 'Summarize the content',
            iconCss: 'e-icons e-collapse-2'
        },
        {
            label: 'Shorten',
            prompt: 'Shorten the content',
            iconCss: 'e-icons e-shorten'
        },
        {
            label: 'Translate',
            prompt: 'Translate the content',
            iconCss: 'e-icons e-translate'
        },
        {
            label: 'Make professional',
            prompt: 'Make the content more professional',
            iconCss: 'e-icons e-elaborate'
        }
    ]
}
```

**Custom Icons:**

```css
.custom-summarize-icon::before {
    content: '\e7c5';
    font-family: 'e-icons';
}
```

```typescript
{
    label: 'Summarize',
    iconCss: 'custom-summarize-icon'
}
```

### Setting Disabled State

Use the `disabled` property to disable a command. Default is `false`.

```typescript
commandSettings: {
    commands: [
        {
            label: 'Summarize',
            prompt: 'Summarize the content',
            disabled: false  // Enabled
        },
        {
            label: 'Shorten',
            prompt: 'Shorten the content',
            disabled: true   // Disabled (grayed out)
        },
        {
            label: 'Translate',
            prompt: 'Translate the content',
            disabled: true   // Disabled
        }
    ]
}
```

**Dynamic Enable/Disable:**

```typescript
let inlineAssist = new InlineAIAssist({
    commandSettings: {
        commands: [
            { id: 'translate', label: 'Translate', prompt: 'Translate' }
        ]
    }
});

// Disable command programmatically
let translateCmd = inlineAssist.commandSettings.commands.find(c => c.id === 'translate');
if (translateCmd) {
    translateCmd.disabled = true;
}
```

### Group Commands with GroupBy

Use the `groupBy` property to visually group related commands with headers.

```typescript
commandSettings: {
    commands: [
        {
            label: 'Summarize',
            prompt: 'Summarize the content',
            groupBy: 'Improve content'
        },
        {
            label: 'Shorten',
            prompt: 'Shorten the content',
            groupBy: 'Improve content'
        },
        {
            label: 'Translate',
            prompt: 'Translate the content',
            groupBy: 'Edit content'
        },
        {
            label: 'Make professional',
            prompt: 'Make the content more professional',
            groupBy: 'Edit content'
        }
    ]
}
```

**Result:** Commands are visually grouped under headers:
- **Improve content**
  - Summarize
  - Shorten
- **Edit content**
  - Translate
  - Make professional

### Setting Tooltip Text

Use the `tooltip` property to display tooltips when hovering over command items.

```typescript
commandSettings: {
    commands: [
        {
            label: 'Summarize',
            prompt: 'Summarize the content',
            tooltip: 'Generate a concise summary'
        },
        {
            label: 'Shorten',
            prompt: 'Shorten the content',
            tooltip: 'Reduce content length'
        },
        {
            label: 'Translate',
            prompt: 'Translate the content',
            tooltip: 'Translate to another language'
        }
    ]
}
```

---

## Command Popup Dimensions

### Setting Popup Width

Use the `popupWidth` property in `commandSettings` to control the width of the command popup.

```typescript
commandSettings: {
    popupWidth: '250px',  // Default width
    commands: [
        { label: 'Summarize', prompt: 'Summarize' },
        { label: 'Translate', prompt: 'Translate' }
    ]
}
```

**Accepted values:**
- CSS units: `'300px'`, `'20em'`, `'50%'`
- Number (pixels): `250`

### Setting Popup Height

Use the `popupHeight` property to control the height of the command popup.

```typescript
commandSettings: {
    popupHeight: '200px',
    commands: [
        { label: 'Summarize', prompt: 'Summarize' },
        { label: 'Shorten', prompt: 'Shorten' },
        { label: 'Translate', prompt: 'Translate' },
        { label: 'Improve', prompt: 'Improve' },
        { label: 'Fix Grammar', prompt: 'Fix grammar' }
    ]
}
```

**Use Case:** Set fixed height for scrollable command lists when you have many commands.

---

## Command Events

### ItemSelect Event

The `itemSelect` event is triggered when a command item is selected from the popup.

```typescript
commandSettings: {
    commands: [
        { label: 'Summarize', prompt: 'Summarize the content' },
        { label: 'Translate', prompt: 'Translate the content' }
    ],
    itemSelect: (args) => {
        console.log('Command selected:', args.command.label);
        console.log('Command prompt:', args.command.prompt);
        console.log('Command element:', args.element);
        
        // You can cancel the default action
        // args.cancel = true;
    }
}
```

### ItemSelect Event Arguments

```typescript
import { CommandItemSelectEventArgs } from '@syncfusion/ej2-interactive-chat';

commandSettings: {
    commands: [...],
    itemSelect: (args: CommandItemSelectEventArgs) => {
        // args.command - The command item that was selected
        console.log('Label:', args.command.label);
        console.log('Prompt:', args.command.prompt);
        console.log('ID:', args.command.id);
        
        // args.element - HTML element of the command item
        console.log('Element:', args.element);
        
        // args.event - Native browser event
        console.log('Event:', args.event);
        
        // args.cancel - Prevent default behavior
        args.cancel = false;
    }
}
```

### Cancel Command Execution

```typescript
commandSettings: {
    commands: [...],
    itemSelect: (args) => {
        // Prevent command execution based on condition
        if (args.command.id === 'translate' && !isTranslationEnabled()) {
            args.cancel = true;
            alert('Translation service is not available');
        }
    }
}
```

---

## Common Patterns

### Pattern 1: Content Editing Commands

```typescript
let inlineAssist = new InlineAIAssist({
    relateTo: '#editBtn',
    commandSettings: {
        popupWidth: '280px',
        commands: [
            {
                id: 'summarize',
                label: 'Summarize',
                prompt: 'Provide a concise summary',
                iconCss: 'e-icons e-collapse-2',
                tooltip: 'Generate summary',
                groupBy: 'Content'
            },
            {
                id: 'expand',
                label: 'Expand',
                prompt: 'Add more details and examples',
                iconCss: 'e-icons e-expand-2',
                tooltip: 'Add more detail',
                groupBy: 'Content'
            },
            {
                id: 'grammar',
                label: 'Fix Grammar',
                prompt: 'Fix grammar and spelling errors',
                iconCss: 'e-icons e-check',
                tooltip: 'Check grammar',
                groupBy: 'Quality'
            },
            {
                id: 'tone',
                label: 'Change Tone',
                prompt: 'Make the tone more professional',
                iconCss: 'e-icons e-settings',
                tooltip: 'Adjust tone',
                groupBy: 'Quality'
            }
        ]
    },
    promptRequest: (args) => {
        let selectedText = getSelectedText();
        let fullPrompt = `${args.prompt}: ${selectedText}`;
        
        callAIService(fullPrompt).then(response => {
            inlineAssist.addResponse(response);
        });
    }
});
```

### Pattern 2: Translation Commands

```typescript
let inlineAssist = new InlineAIAssist({
    relateTo: '#translateBtn',
    commandSettings: {
        commands: [
            {
                label: 'Spanish',
                prompt: 'Translate to Spanish',
                iconCss: 'flag-es'
            },
            {
                label: 'French',
                prompt: 'Translate to French',
                iconCss: 'flag-fr'
            },
            {
                label: 'German',
                prompt: 'Translate to German',
                iconCss: 'flag-de'
            },
            {
                label: 'Japanese',
                prompt: 'Translate to Japanese',
                iconCss: 'flag-jp'
            }
        ],
        itemSelect: (args) => {
            console.log(`Translating to: ${args.command.label}`);
        }
    }
});
```

### Pattern 3: Conditional Commands

```typescript
function getCommandsForUser() {
    const isPremium = checkPremiumUser();
    
    let commands = [
        {
            label: 'Summarize',
            prompt: 'Summarize this content'
        },
        {
            label: 'Fix Grammar',
            prompt: 'Fix grammar errors'
        }
    ];
    
    if (isPremium) {
        commands.push({
            label: 'Advanced Analysis',
            prompt: 'Provide detailed analysis',
            iconCss: 'e-icons e-star'
        });
    } else {
        commands.push({
            label: 'Advanced Analysis',
            prompt: '',
            disabled: true,
            tooltip: 'Premium feature - Upgrade to use'
        });
    }
    
    return commands;
}

let inlineAssist = new InlineAIAssist({
    relateTo: '#aiBtn',
    commandSettings: {
        commands: getCommandsForUser()
    }
});
```

### Pattern 4: Dynamic Command Loading

```typescript
let inlineAssist = new InlineAIAssist({
    relateTo: '#aiBtn',
    commandSettings: {
        commands: []  // Start empty
    },
    open: () => {
        // Load commands when popup opens
        fetchCommandsFromAPI().then(commands => {
            inlineAssist.commandSettings.commands = commands;
        });
    }
});
```

### Pattern 5: Context-Aware Commands

```typescript
document.querySelectorAll('.content-block').forEach(block => {
    const improveBtn = block.querySelector('.improve-btn');
    
    improveBtn.addEventListener('click', () => {
        const contentType = block.dataset.type; // 'technical', 'marketing', etc.
        
        let commands = getCommandsForContentType(contentType);
        
        let inlineAssist = new InlineAIAssist({
            relateTo: improveBtn,
            commandSettings: {
                commands: commands
            }
        });
        
        inlineAssist.appendTo(block.querySelector('.ai-container'));
        inlineAssist.showPopup();
    });
});

function getCommandsForContentType(type) {
    if (type === 'technical') {
        return [
            { label: 'Simplify', prompt: 'Simplify technical jargon' },
            { label: 'Add Examples', prompt: 'Add code examples' }
        ];
    } else if (type === 'marketing') {
        return [
            { label: 'Make Persuasive', prompt: 'Make more persuasive' },
            { label: 'Add CTA', prompt: 'Add a call-to-action' }
        ];
    }
}
```

---

## Complete Example with All Properties

```typescript
import { InlineAIAssist, CommandItemSelectEventArgs } from '@syncfusion/ej2-interactive-chat';

let inlineAssist = new InlineAIAssist({
    relateTo: '#improveBtn',
    
    commandSettings: {
        // Popup dimensions
        popupWidth: '300px',
        popupHeight: '250px',
        
        // Command items
        commands: [
            {
                id: 'cmd-1',
                label: 'Summarize',
                prompt: 'Create a concise summary',
                iconCss: 'e-icons e-collapse-2',
                tooltip: 'Generate summary',
                disabled: false,
                groupBy: 'Content Transformation'
            },
            {
                id: 'cmd-2',
                label: 'Expand Details',
                prompt: 'Add more details and examples',
                iconCss: 'e-icons e-expand-2',
                tooltip: 'Add detail',
                disabled: false,
                groupBy: 'Content Transformation'
            },
            {
                id: 'cmd-3',
                label: 'Fix Grammar',
                prompt: 'Correct grammar and spelling',
                iconCss: 'e-icons e-check',
                tooltip: 'Check grammar',
                disabled: false,
                groupBy: 'Quality Improvement'
            },
            {
                id: 'cmd-4',
                label: 'Professional Tone',
                prompt: 'Rewrite in professional tone',
                iconCss: 'e-icons e-settings',
                tooltip: 'Adjust tone',
                disabled: false,
                groupBy: 'Quality Improvement'
            }
        ],
        
        // Event handler
        itemSelect: (args: CommandItemSelectEventArgs) => {
            console.log('Selected command:', args.command.label);
            
            // Custom handling for specific commands
            if (args.command.id === 'cmd-4') {
                // Special handling for professional tone
                console.log('Applying professional tone...');
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
