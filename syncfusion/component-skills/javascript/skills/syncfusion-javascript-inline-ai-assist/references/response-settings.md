# Response Settings - Accept/Reject Actions

## Table of Contents
- [Overview](#overview)
- [Built-in Response Items](#built-in-response-items)
- [Custom Response Items](#custom-response-items)
- [Response Item Properties](#response-item-properties)
- [ItemSelect Event](#itemselect-event)
- [Common Patterns](#common-patterns)

---

## Overview

The response settings feature provides action buttons that appear after an AI response is generated. By default, users can "Accept" or "Discard" the response, creating a review workflow before applying changes.

Use the `responseSettings` property to configure response action items and handle user decisions.

---

## Built-in Response Items

By default, the response popup displays the built-in `Accept` and `Discard` items.

```typescript
import { InlineAIAssist } from '@syncfusion/ej2-interactive-chat';

let inlineAssist = new InlineAIAssist({
    relateTo: '#summarizeBtn',
    promptRequest: () => {
        setTimeout(() => {
            inlineAssist.addResponse('AI-generated response here...');
        }, 1000);
    },
    responseSettings: {
        // Handle built-in response actions
        itemSelect: (args) => {
            if (args.command.label === 'Accept') {
                // Apply the response
                const lastResponse = inlineAssist.prompts[inlineAssist.prompts.length - 1].response;
                document.getElementById('content').innerHTML = lastResponse;
                inlineAssist.hidePopup();
            } else if (args.command.label === 'Discard') {
                // Reject the response
                inlineAssist.hidePopup();
            }
        }
    }
});

inlineAssist.appendTo('#inlineAssist');
```

**Default Response Flow:**
1. User submits prompt → AI generates response
2. Response appears in popup with "Accept" and "Discard" buttons
3. User clicks "Accept" → Response is applied to content
4. User clicks "Discard" → Response is discarded, popup closes

---

## Custom Response Items

Add custom response action items using the `items` property in `responseSettings`.

### Basic Custom Items

```typescript
let inlineAssist = new InlineAIAssist({
    relateTo: '#aiBtn',
    promptRequest: handlePrompt,
    responseSettings: {
        items: [
            {
                id: 'accept',
                label: 'Accept',
                iconCss: 'e-icons e-check'
            },
            {
                id: 'regenerate',
                label: 'Regenerate',
                iconCss: 'e-icons e-refresh'
            },
            {
                id: 'discard',
                label: 'Discard',
                iconCss: 'e-icons e-close'
            }
        ],
        itemSelect: (args) => {
            if (args.command.label === 'Accept') {
                applyResponse();
                inlineAssist.hidePopup();
            } else if (args.command.label === 'Regenerate') {
                regenerateResponse();
            } else if (args.command.label === 'Discard') {
                inlineAssist.hidePopup();
            }
        }
    }
});
```

---

## Response Item Properties

### Setting ID

```typescript
responseSettings: {
    items: [
        {
            id: 'accept-btn',
            label: 'Accept'
        },
        {
            id: 'modify-btn',
            label: 'Modify'
        },
        {
            id: 'discard-btn',
            label: 'Discard'
        }
    ]
}
```

### Setting Label

```typescript
responseSettings: {
    items: [
        {
            label: 'Apply Changes'
        },
        {
            label: 'Try Again'
        },
        {
            label: 'Cancel'
        }
    ]
}
```

### Icon CSS

```typescript
responseSettings: {
    items: [
        {
            label: 'Accept',
            iconCss: 'e-icons e-check'
        },
        {
            label: 'Edit',
            iconCss: 'e-icons e-edit'
        },
        {
            label: 'Discard',
            iconCss: 'e-icons e-close'
        }
    ]
}
```

### Tooltip

```typescript
responseSettings: {
    items: [
        {
            label: 'Accept',
            iconCss: 'e-icons e-check',
            tooltip: 'Apply this response'
        },
        {
            label: 'Copy',
            iconCss: 'e-icons e-copy',
            tooltip: 'Copy to clipboard'
        },
        {
            label: 'Discard',
            iconCss: 'e-icons e-close',
            tooltip: 'Discard this response'
        }
    ]
}
```

### Disabled State

```typescript
responseSettings: {
    items: [
        {
            label: 'Accept',
            disabled: false
        },
        {
            label: 'Save to Library',
            disabled: !isPremiumUser(),  // Conditionally disabled
            tooltip: 'Premium feature'
        },
        {
            label: 'Discard',
            disabled: false
        }
    ]
}
```

---

## ItemSelect Event

The `itemSelect` event is triggered when a response action item is clicked.

### Basic Event Handling

```typescript
responseSettings: {
    itemSelect: (args) => {
        console.log('Selected action:', args.command.label);
        console.log('Command ID:', args.command.id);
        
        // Handle different actions
        switch (args.command.label) {
            case 'Accept':
                handleAccept();
                break;
            case 'Discard':
                handleDiscard();
                break;
            default:
                console.log('Unknown action');
        }
    }
}
```

### ItemSelect Event Arguments

```typescript
import { ResponseItemSelectEventArgs } from '@syncfusion/ej2-interactive-chat';

responseSettings: {
    itemSelect: (args: ResponseItemSelectEventArgs) => {
        // args.command - The response item that was clicked
        console.log('Label:', args.command.label);
        console.log('ID:', args.command.id);
        console.log('Icon:', args.command.iconCss);
        
        // args.element - HTML element
        console.log('Element:', args.element);
        
        // args.event - Native browser event
        console.log('Event:', args.event);
        
        // args.cancel - Prevent default behavior
        args.cancel = false;
    }
}
```

### Cancel Default Action

```typescript
responseSettings: {
    itemSelect: (args) => {
        if (args.command.label === 'Accept') {
            // Validate before accepting
            if (!validateResponse()) {
                args.cancel = true;
                alert('Response validation failed');
                return;
            }
        }
        
        // Proceed with default action
        handleResponseAction(args.command);
    }
}
```

---

## Common Patterns

### Pattern 1: Accept/Regenerate/Discard Workflow

```typescript
let inlineAssist = new InlineAIAssist({
    relateTo: '#improveBtn',
    promptRequest: (args) => {
        generateAIResponse(args.prompt);
    },
    responseSettings: {
        items: [
            {
                id: 'accept',
                label: 'Accept',
                iconCss: 'e-icons e-check',
                tooltip: 'Apply this response'
            },
            {
                id: 'regenerate',
                label: 'Regenerate',
                iconCss: 'e-icons e-refresh',
                tooltip: 'Generate new response'
            },
            {
                id: 'discard',
                label: 'Discard',
                iconCss: 'e-icons e-close',
                tooltip: 'Discard response'
            }
        ],
        itemSelect: (args) => {
            const lastPrompt = inlineAssist.prompts[inlineAssist.prompts.length - 1];
            
            if (args.command.id === 'accept') {
                // Apply response to content
                document.getElementById('editor').innerHTML = lastPrompt.response;
                inlineAssist.hidePopup();
            } else if (args.command.id === 'regenerate') {
                // Generate new response with same prompt
                generateAIResponse(lastPrompt.prompt);
            } else if (args.command.id === 'discard') {
                // Close without applying
                inlineAssist.hidePopup();
            }
        }
    }
});

function generateAIResponse(prompt) {
    callAIService(prompt).then(response => {
        inlineAssist.addResponse(response);
    });
}
```

### Pattern 2: Copy to Clipboard Action

```typescript
let inlineAssist = new InlineAIAssist({
    relateTo: '#aiBtn',
    promptRequest: handlePrompt,
    responseSettings: {
        items: [
            {
                label: 'Accept',
                iconCss: 'e-icons e-check'
            },
            {
                id: 'copy',
                label: 'Copy',
                iconCss: 'e-icons e-copy',
                tooltip: 'Copy to clipboard'
            },
            {
                label: 'Discard',
                iconCss: 'e-icons e-close'
            }
        ],
        itemSelect: (args) => {
            if (args.command.id === 'copy') {
                const response = inlineAssist.prompts[inlineAssist.prompts.length - 1].response;
                
                // Copy to clipboard
                navigator.clipboard.writeText(response).then(() => {
                    alert('Response copied to clipboard!');
                }).catch(err => {
                    console.error('Failed to copy:', err);
                });
            } else if (args.command.label === 'Accept') {
                applyResponse();
                inlineAssist.hidePopup();
            } else if (args.command.label === 'Discard') {
                inlineAssist.hidePopup();
            }
        }
    }
});
```

### Pattern 3: Edit Before Accept

```typescript
let inlineAssist = new InlineAIAssist({
    relateTo: '#aiBtn',
    promptRequest: handlePrompt,
    responseSettings: {
        items: [
            {
                id: 'accept',
                label: 'Accept',
                iconCss: 'e-icons e-check'
            },
            {
                id: 'edit',
                label: 'Edit',
                iconCss: 'e-icons e-edit',
                tooltip: 'Edit before applying'
            },
            {
                id: 'discard',
                label: 'Discard',
                iconCss: 'e-icons e-close'
            }
        ],
        itemSelect: (args) => {
            const lastResponse = inlineAssist.prompts[inlineAssist.prompts.length - 1].response;
            
            if (args.command.id === 'accept') {
                document.getElementById('editor').innerHTML = lastResponse;
                inlineAssist.hidePopup();
            } else if (args.command.id === 'edit') {
                // Open in editor for manual changes
                openEditDialog(lastResponse, (editedContent) => {
                    document.getElementById('editor').innerHTML = editedContent;
                    inlineAssist.hidePopup();
                });
            } else if (args.command.id === 'discard') {
                inlineAssist.hidePopup();
            }
        }
    }
});

function openEditDialog(content, callback) {
    // Show dialog with textarea for editing
    const dialog = document.getElementById('editDialog');
    document.getElementById('editTextarea').value = content;
    dialog.style.display = 'block';
    
    document.getElementById('saveEdit').onclick = () => {
        callback(document.getElementById('editTextarea').value);
        dialog.style.display = 'none';
    };
}
```

### Pattern 4: Save to Library

```typescript
let inlineAssist = new InlineAIAssist({
    relateTo: '#aiBtn',
    promptRequest: handlePrompt,
    responseSettings: {
        items: [
            {
                label: 'Accept',
                iconCss: 'e-icons e-check'
            },
            {
                id: 'save-library',
                label: 'Save to Library',
                iconCss: 'e-icons e-save',
                tooltip: 'Save for later use'
            },
            {
                label: 'Discard',
                iconCss: 'e-icons e-close'
            }
        ],
        itemSelect: (args) => {
            const lastPrompt = inlineAssist.prompts[inlineAssist.prompts.length - 1];
            
            if (args.command.label === 'Accept') {
                document.getElementById('editor').innerHTML = lastPrompt.response;
                inlineAssist.hidePopup();
            } else if (args.command.id === 'save-library') {
                // Save to user's content library
                saveToLibrary({
                    prompt: lastPrompt.prompt,
                    response: lastPrompt.response,
                    timestamp: new Date()
                }).then(() => {
                    alert('Saved to library!');
                });
            } else if (args.command.label === 'Discard') {
                inlineAssist.hidePopup();
            }
        }
    }
});
```

### Pattern 5: Rating System

```typescript
let inlineAssist = new InlineAIAssist({
    relateTo: '#aiBtn',
    promptRequest: handlePrompt,
    responseSettings: {
        items: [
            {
                label: 'Accept',
                iconCss: 'e-icons e-check'
            },
            {
                id: 'rate-good',
                label: '👍',
                tooltip: 'Good response'
            },
            {
                id: 'rate-bad',
                label: '👎',
                tooltip: 'Poor response'
            },
            {
                label: 'Discard',
                iconCss: 'e-icons e-close'
            }
        ],
        itemSelect: (args) => {
            const lastPrompt = inlineAssist.prompts[inlineAssist.prompts.length - 1];
            
            if (args.command.label === 'Accept') {
                document.getElementById('editor').innerHTML = lastPrompt.response;
                inlineAssist.hidePopup();
            } else if (args.command.id === 'rate-good') {
                submitRating(lastPrompt, 'positive');
                alert('Thanks for your feedback!');
            } else if (args.command.id === 'rate-bad') {
                submitRating(lastPrompt, 'negative');
                alert('Thanks for your feedback!');
            } else if (args.command.label === 'Discard') {
                inlineAssist.hidePopup();
            }
        }
    }
});

function submitRating(promptData, rating) {
    fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            prompt: promptData.prompt,
            response: promptData.response,
            rating: rating
        })
    });
}
```

---

## Complete Example

```typescript
import { InlineAIAssist, ResponseItemSelectEventArgs } from '@syncfusion/ej2-interactive-chat';

let inlineAssist = new InlineAIAssist({
    relateTo: '#improveBtn',
    popupWidth: '550px',
    
    promptRequest: (args) => {
        callAIService(args.prompt).then(response => {
            inlineAssist.addResponse(response);
        });
    },
    
    responseSettings: {
        // Custom response action items
        items: [
            {
                id: 'accept-btn',
                label: 'Accept',
                iconCss: 'e-icons e-check',
                tooltip: 'Apply this response',
                disabled: false
            },
            {
                id: 'copy-btn',
                label: 'Copy',
                iconCss: 'e-icons e-copy',
                tooltip: 'Copy to clipboard',
                disabled: false
            },
            {
                id: 'regenerate-btn',
                label: 'Regenerate',
                iconCss: 'e-icons e-refresh',
                tooltip: 'Generate new response',
                disabled: false
            },
            {
                id: 'discard-btn',
                label: 'Discard',
                iconCss: 'e-icons e-close',
                tooltip: 'Discard response',
                disabled: false
            }
        ],
        
        // Event handler
        itemSelect: (args: ResponseItemSelectEventArgs) => {
            console.log('Response action:', args.command.label);
            
            const lastPrompt = inlineAssist.prompts[inlineAssist.prompts.length - 1];
            
            switch (args.command.id) {
                case 'accept-btn':
                    document.getElementById('editor').innerHTML = lastPrompt.response;
                    inlineAssist.hidePopup();
                    break;
                    
                case 'copy-btn':
                    navigator.clipboard.writeText(lastPrompt.response);
                    alert('Copied!');
                    break;
                    
                case 'regenerate-btn':
                    callAIService(lastPrompt.prompt).then(response => {
                        inlineAssist.addResponse(response);
                    });
                    break;
                    
                case 'discard-btn':
                    inlineAssist.hidePopup();
                    break;
            }
        }
    }
});

inlineAssist.appendTo('#inlineAssist');
```
