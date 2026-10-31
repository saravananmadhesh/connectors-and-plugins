# Custom Views

## Table of Contents
- [Overview](#overview)
- [Adding Custom Views](#adding-custom-views)
- [View Types](#view-types)
- [View Properties](#view-properties)
- [Active View Management](#active-view-management)
- [View Templates](#view-templates)
- [Examples](#examples)

This guide covers creating and managing custom views in the AI AssistView component.

---

## Overview

The `views` property allows you to define multiple assist view modes. Each view can have its own layout, icon, and functionality, enabling different conversation modes or specialized interfaces within a single AI AssistView instance.

---

## Adding Custom Views

### Property

```typescript
views: AssistViewModel[]
```

### AssistViewModel Interface

```typescript
interface AssistViewModel {
    type: 'Assist' | 'Custom' | AssistViewType;  // View type
    name: string;                                 // Display name
    iconCss?: string;                            // Icon CSS class
    viewTemplate?: string | Function;             // Custom template
}
```

### Basic Example

```typescript
import { AIAssistView, AssistViewModel } from '@syncfusion/ej2-interactive-chat';

const assistViews: AssistViewModel[] = [
    {
        type: 'Assist',
        name: "AI Assistant"
    },
    {
        type: 'Custom',
        name: 'Documentation',
        viewTemplate: '<div class="doc-view"><h3>Documentation Helper</h3></div>'
    }
];

const aiAssistView: AIAssistView = new AIAssistView({
    views: assistViews
});

aiAssistView.appendTo('#aiAssistView');
```

---

## View Types

### AssistViewType Enum

```typescript
enum AssistViewType {
    Assist = 'Assist',    // Default chat view
    Custom = 'Custom'     // Custom content view
}
```

### Assist Type

Standard AI assistant view with prompt-response interface.

```typescript
{
    type: 'Assist',
    name: "AI Chat"
}
```

### Custom Type

Custom view with user-defined template and functionality.

```typescript
{
    type: 'Custom',
    name: 'Custom View',
    viewTemplate: '<div>Your custom content</div>'
}
```

---

## View Properties

### Setting View Name

The `name` property specifies the header name displayed for each view.

```typescript
const views: AssistViewModel[] = [
    { type: 'Assist', name: "Prompt" },
    { type: 'Custom', name: 'Response' }
];
```

### Setting Icon CSS

The `iconCss` property customizes the view icon in the header.

```typescript
const views: AssistViewModel[] = [
    {
        type: 'Assist',
        name: "AI Chat",
        iconCss: 'e-icons e-assistview-icon'
    },
    {
        type: 'Custom',
        name: 'Knowledge Base',
        iconCss: 'e-icons e-comment-show'
    }
];
```

**Default Icon:** `e-assistview-icon` for Assist type

---

## Active View Management

### Property

```typescript
activeView: number = 0
```

The `activeView` property specifies the index of the currently active view (zero-based).

### Example

```typescript
const aiAssistView: AIAssistView = new AIAssistView({
    views: [
        { type: 'Assist', name: "Chat" },
        { type: 'Custom', name: 'History' }
    ],
    activeView: 0  // Start with first view (Chat)
});

// Switch to second view programmatically
aiAssistView.activeView = 1;
aiAssistView.dataBind();
```

---

## View Templates

The `viewTemplate` property defines custom content for Custom type views.

### String Template

```typescript
const views: AssistViewModel[] = [
    {
        type: 'Custom',
        name: 'Welcome',
        viewTemplate: `
            <div class="welcome-view">
                <h2>Welcome to AI Assistant</h2>
                <p>Select a topic to get started:</p>
                <ul>
                    <li>General Questions</li>
                    <li>Technical Support</li>
                    <li>Documentation</li>
                </ul>
            </div>
        `
    }
];
```

### Function Template

```typescript
const views: AssistViewModel[] = [
    {
        type: 'Custom',
        name: 'Stats',
        viewTemplate: function(data: any) {
            return `
                <div class="stats-view">
                    <h3>Conversation Statistics</h3>
                    <p>Total Prompts: ${data.promptCount}</p>
                    <p>Total Responses: ${data.responseCount}</p>
                </div>
            `;
        }
    }
];
```

---

## Examples

### Multiple Views with Icons

```typescript
import { AIAssistView, AssistViewModel } from '@syncfusion/ej2-interactive-chat';

const views: AssistViewModel[] = [
    {
        type: 'Assist',
        name: "AI Chat",
        iconCss: 'e-icons e-assistview-icon'
    },
    {
        type: 'Custom',
        name: 'History',
        iconCss: 'e-icons e-timeline-work-week',
        viewTemplate: '<div class="history-view"><h3>Chat History</h3></div>'
    },
    {
        type: 'Custom',
        name: 'Settings',
        iconCss: 'e-icons e-settings',
        viewTemplate: '<div class="settings-view"><h3>Settings</h3></div>'
    }
];

const aiAssistView: AIAssistView = new AIAssistView({
    views: views,
    activeView: 0
});

aiAssistView.appendTo('#aiAssistView');
```

### Switching Views with Toolbar

```typescript
const aiAssistView: AIAssistView = new AIAssistView({
    views: [
        { type: 'Assist', name: "Chat", iconCss: 'e-icons e-comment' },
        { type: 'Custom', name: 'Docs', iconCss: 'e-icons e-file-text' }
    ],
    activeView: 0,
    toolbarSettings: {
        items: [
            { type: 'Button', text: 'Chat', iconCss: 'e-icons e-comment' },
            { type: 'Button', text: 'Docs', iconCss: 'e-icons e-file-text', align: 'Right' }
        ],
        itemClicked: (args) => {
            if (args.item.text === 'Chat') {
                aiAssistView.activeView = 0;
            } else if (args.item.text === 'Docs') {
                aiAssistView.activeView = 1;
            }
            aiAssistView.dataBind();
        }
    }
});
```

### Complete Example with Custom View Content

```typescript
const aiAssistView: AIAssistView = new AIAssistView({
    views: [
        {
            type: 'Assist',
            name: "AI Assistant",
            iconCss: 'e-icons e-assistview-icon'
        },
        {
            type: 'Custom',
            name: 'Help',
            iconCss: 'e-icons e-help',
            viewTemplate: `
                <div class="help-view" style="padding: 20px;">
                    <h2>How to Use</h2>
                    <ol>
                        <li>Type your question in the input box</li>
                        <li>Click Send or press Enter</li>
                        <li>Wait for the AI response</li>
                        <li>Use toolbar actions to copy, like, or regenerate</li>
                    </ol>
                    <h3>Tips</h3>
                    <ul>
                        <li>Be specific in your questions</li>
                        <li>Use prompt suggestions for inspiration</li>
                        <li>Attach files for context</li>
                    </ul>
                </div>
            `
        }
    ],
    activeView: 0,
    promptRequest: (args) => {
        setTimeout(() => {
            aiAssistView.addPromptResponse('This is the AI response.');
        }, 1000);
    }
});

aiAssistView.appendTo('#aiAssistView');
```

---

## Summary

**Key Properties:**
- `views`: Array of AssistViewModel configurations
- `activeView`: Index of currently active view
- `type`: 'Assist' or 'Custom'
- `name`: Display name in header
- `iconCss`: Icon CSS class
- `viewTemplate`: Custom template for Custom views

**Use Cases:**
- Multiple conversation modes (Chat, Q&A, Documentation)
- Help/documentation views
- Settings or configuration panels
- Conversation history view
- Statistics or analytics dashboard
