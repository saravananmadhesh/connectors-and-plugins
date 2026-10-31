# Templates Configuration

## Table of Contents
- [Overview](#overview)
- [Empty Chat Template](#empty-chat-template)
- [Message Template](#message-template)
- [Time Break Template](#time-break-template)
- [Typing Users Template](#typing-users-template)
- [Suggestion Template](#suggestion-template)
- [Footer Template](#footer-template)
- [Template Context and Data Binding](#template-context-and-data-binding)
- [Best Practices](#best-practices)

---

## Overview

The Chat UI control provides several template properties for customizing the appearance of various UI elements. These templates enable you to create a personalized chat experience by controlling how messages, empty states, typing indicators, suggestions, and footers are displayed.

All templates accept either:
- A string containing HTML markup
- A function that returns HTML string based on the context data

---

## Empty Chat Template

### emptyChatTemplate Property

Use the `emptyChatTemplate` property to customize the chat interface when no messages are displayed. This is ideal for showing welcome messages, images, or instructions to users starting a conversation.

**Property**: `emptyChatTemplate: string | Function`

### Basic Example

```typescript
import { ChatUI, UserModel } from '@syncfusion/ej2-interactive-chat';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

let currentUserModel: UserModel = {
    id: "user1",
    user: "Albert"
};

// Initializes the Chat UI control
let chatUI: ChatUI = new ChatUI({
    user: currentUserModel,
    emptyChatTemplate: '<div class="empty-chat-text"><h4><span class="e-icons e-comment-show"></span></h4><h4>No Messages Yet</h4><p>Start a conversation to see your messages here.</p></div>'
});

// Render initialized Chat UI.
chatUI.appendTo('#emptyChatTemplate');
```

### Custom Styling

```css
.empty-chat-text {
    font-size: 15px;
    text-align: center;
    margin-top: 90px;
}
```

### Use Cases

- Welcome messages for new users
- Call-to-action prompts
- Branding or logo display
- Help text or instructions

---

## Message Template

### messageTemplate Property

Use the `messageTemplate` property to customize the appearance and styling of each chat message. This allows complete control over message layout, styling, and content presentation.

**Property**: `messageTemplate: string | Function`

**Template Context**:
- `message`: The MessageModel object
- `index`: The message index in the messages array

### Basic Example

```typescript
import { ChatUI, UserModel, MessageModel } from '@syncfusion/ej2-interactive-chat';

let currentUserModel: UserModel = {
    id: "user1",
    user: "Albert"
};

let michaleUserModel: UserModel = {
    id: "user2",
    user: "Michale Suyama"
};

let chatMessages: MessageModel[] = [
    {
        author: currentUserModel,
        text: "Hi Michale, are we on track for the deadline?"
    },
    {
        author: michaleUserModel,
        text: "Yes, the design phase is complete."
    },
    {
        author: currentUserModel,
        text: "I'll review it and send feedback by today."
    }
];

// Initializes the Chat UI control
let chatUI: ChatUI = new ChatUI({
    messages: chatMessages,
    user: currentUserModel,
    messageTemplate: (context: any) => messageTemplate(context)
});

chatUI.appendTo('#messageTemplate');

function messageTemplate(context: any): string {
    return `<div class="message-items e-card">
                <div class="message-text">${context.message.text}</div>
            </div>`;
}
```

### Styling for Message Template

```css
#messageTemplate .e-right .message-items {
    border-radius: 16px 16px 2px 16px;
    background-color: #c5ffbf;
}

#messageTemplate .e-left .message-items {
    border-radius: 16px 16px 16px 2px;
    background-color: #f5f5f5;
}

#messageTemplate .message-items {
    padding: 5px;
}
```

### Access Message Properties

The context object provides access to all message properties:

```typescript
function messageTemplate(context: any): string {
    const msg = context.message;
    return `
        <div class="custom-message">
            <div class="author">${msg.author.user}</div>
            <div class="text">${msg.text}</div>
            <div class="timestamp">${msg.timestamp}</div>
            ${msg.status ? `<div class="status">${msg.status.text}</div>` : ''}
        </div>
    `;
}
```

---

## Time Break Template

### timeBreakTemplate Property

Use the `timeBreakTemplate` property to customize how date separators appear between messages. This enhances conversation organization by clearly separating messages based on time periods.

**Property**: `timeBreakTemplate: string | Function`

**Template Context**:
- `messageDate`: The date for the time break

### Basic Example

```typescript
import { ChatUI, UserModel, MessageModel } from '@syncfusion/ej2-interactive-chat';

let currentUserModel: UserModel = {
    id: "user1",
    user: "Albert"
};

let michaleUserModel: UserModel = {
    id: "user2",
    user: "Michale Suyama"
};

let chatMessages: MessageModel[] = [
    {
        author: currentUserModel,
        text: "Hi Michale, are we on track for the deadline?",
        timestamp: new Date("December 25, 2024 7:30")
    },
    {
        author: michaleUserModel,
        text: "Yes, the design phase is complete.",
        timestamp: new Date("December 25, 2024 8:00")
    },
    {
        author: currentUserModel,
        text: "I'll review it and send feedback by today.",
        timestamp: new Date("December 25, 2024 11:00")
    }
];

// Initializes the Chat UI control
let chatUI: ChatUI = new ChatUI({
    messages: chatMessages,
    user: currentUserModel,
    showTimeBreak: true,
    timeBreakTemplate: timeBreakTemplate
});

chatUI.appendTo('#timeBreakTemplate');

function timeBreakTemplate(context: any): string {
    const date: Date = new Date(context.messageDate);
    const day: string = String(date.getDate()).padStart(2, '0');
    const month: string = String(date.getMonth() + 1).padStart(2, '0');
    const year: number = date.getFullYear();
    let hours: number = date.getHours();
    const minutes: string = String(date.getMinutes()).padStart(2, '0');
    const ampm: string = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    const formattedDate: string = `${day}/${month}/${year} ${hours}:${minutes} ${ampm}`;
    return `<div class="timebreak-wrapper">${formattedDate}</div>`;
}
```

### Styling for Time Break

```css
#timeBreakTemplate .timebreak-wrapper {
    background-color: #6495ed;
    color: #ffffff;
    border-radius: 5px;
    padding: 2px;
}
```

### Custom Date Formatting

Display "Today", "Yesterday", or specific dates:

```typescript
function timeBreakTemplate(context: any): string {
    const messageDate = new Date(context.messageDate);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    let displayText: string;
    
    if (messageDate.toDateString() === today.toDateString()) {
        displayText = "Today";
    } else if (messageDate.toDateString() === yesterday.toDateString()) {
        displayText = "Yesterday";
    } else {
        displayText = messageDate.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric' 
        });
    }
    
    return `<div class="timebreak-wrapper">${displayText}</div>`;
}
```

---

## Typing Users Template

### typingUsersTemplate Property

Use the `typingUsersTemplate` property to customize how the typing indicator appears when users are typing. This provides visual feedback about active participants.

**Property**: `typingUsersTemplate: string | Function`

**Template Context**:
- `users`: Array of UserModel objects who are currently typing

### Basic Example

```typescript
import { ChatUI, UserModel, MessageModel } from '@syncfusion/ej2-interactive-chat';

let currentUserModel: UserModel = {
    id: "user1",
    user: "Albert"
};

let michaleUserModel: UserModel = {
    id: "user2",
    user: "Michale Suyama"
};

let reenaUserModel: UserModel = {
    id: "user3",
    user: "Reena"
};

let typingUsers: UserModel[] = [michaleUserModel, reenaUserModel];

let chatMessages: MessageModel[] = [
    {
        author: currentUserModel,
        text: "Hi Michale, are we on track for the deadline?"
    },
    {
        author: michaleUserModel,
        text: "Yes, the design phase is complete."
    },
    {
        author: currentUserModel,
        text: "I'll review it and send feedback by today."
    }
];

// Initializes the Chat UI control
let chatUI: ChatUI = new ChatUI({
    messages: chatMessages,
    user: currentUserModel,
    typingUsers: typingUsers,
    typingUsersTemplate: typingUsersTemplate
});

chatUI.appendTo('#typingUsersTemplate');

function typingUsersTemplate(context: any): string {
    if (!context.users || context.users.length === 0) {
        return '';
    }

    const usersList = context.users.map((user: any, i: number) => {
        const isLastUser: boolean = i === context.users.length - 1;
        return `${isLastUser && i > 0 ? 'and ' : ''}<span class="typing-user">${user.user}</span>`;
    }).join(' ');

    return `
        <div class="typing-wrapper">
            ${usersList} are typing...
        </div>
    `;
}
```

### Styling for Typing Indicator

```css
#typingUsersTemplate .typing-wrapper {
    display: flex;
    gap: 4px;
    align-items: center;
    font-family: Arial, sans-serif;
    font-size: 14px;
    color: #555;
    margin: 5px 0;
}

.typing-user {
    font-weight: bold;
    color: #0078d4;
}
```

### Handle Multiple Users

```typescript
function typingUsersTemplate(context: any): string {
    const users = context.users || [];
    
    if (users.length === 0) return '';
    
    if (users.length === 1) {
        return `<div class="typing-wrapper">${users[0].user} is typing...</div>`;
    } else if (users.length === 2) {
        return `<div class="typing-wrapper">${users[0].user} and ${users[1].user} are typing...</div>`;
    } else {
        return `<div class="typing-wrapper">${users.length} people are typing...</div>`;
    }
}
```

---

## Suggestion Template

### suggestionTemplate Property

Use the `suggestionTemplate` property to customize quick reply suggestions that appear above the input field. This enables visually appealing and functional suggestion layouts.

**Property**: `suggestionTemplate: string | Function`

**Template Context**:
- `suggestion`: The suggestion text/object
- `index`: The suggestion index in the suggestions array

### Basic Example

```typescript
import { ChatUI, UserModel, MessageModel } from '@syncfusion/ej2-interactive-chat';

let currentUserModel: UserModel = {
    id: "user1",
    user: "Albert"
};

let michaleUserModel: UserModel = {
    id: "user2",
    user: "Michale Suyama"
};

let suggestions: string[] = ["Okay will check it", "Sounds good!"];

let chatMessages: MessageModel[] = [
    {
        author: currentUserModel,
        text: "Hi Michale, are we on track for the deadline?"
    },
    {
        author: michaleUserModel,
        text: "Yes, the design phase is complete."
    }
];

// Initializes the Chat UI control
let chatUI: ChatUI = new ChatUI({
    messages: chatMessages,
    user: currentUserModel,
    suggestions: suggestions,
    suggestionTemplate: suggestionTemplate
});

chatUI.appendTo('#suggestionTemplate');

function suggestionTemplate(context: any): string {
    return `
        <div class='suggestion-item active'>
            <div class="content">${context.suggestion}</div>
        </div>
    `;
}
```

### Styling for Suggestions

```css
#suggestionTemplate .e-suggestion-list li {
    padding: 0;
    border: none;
    box-shadow: none;
}

#suggestionTemplate .suggestion-item {
    display: flex;
    align-items: center;
    background-color: #87b6fb;
    color: black;
    padding: 4px;
    gap: 5px;
    height: 30px;
    border-radius: 5px;
}

#suggestionTemplate .suggestion-item .content {
    padding: 0;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}
```

### Add Icons to Suggestions

```typescript
function suggestionTemplate(context: any): string {
    const icons: { [key: string]: string } = {
        "Yes": "e-check",
        "No": "e-close",
        "Maybe": "e-help"
    };
    
    const iconClass = icons[context.suggestion] || "e-comment";
    
    return `
        <div class='suggestion-item'>
            <span class="e-icons ${iconClass}"></span>
            <div class="content">${context.suggestion}</div>
        </div>
    `;
}
```

---

## Footer Template

### footerTemplate Property

Use the `footerTemplate` property to customize the footer area completely, replacing the default input field and send button with custom UI.

**Property**: `footerTemplate: string | Function`

### Basic Example

```typescript
import { ChatUI, UserModel, MessageModel } from '@syncfusion/ej2-interactive-chat';

let currentUserModel: UserModel = {
    id: "user1",
    user: "Albert"
};

let michaleUserModel: UserModel = {
    id: "user2",
    user: "Michale Suyama"
};

let chatMessages: MessageModel[] = [
    {
        author: currentUserModel,
        text: "Hi Michale, are we on track for the deadline?"
    },
    {
        author: michaleUserModel,
        text: "Yes, the design phase is complete."
    },
    {
        author: currentUserModel,
        text: "I'll review it and send feedback by today."
    }
];

// Initializes the Chat UI control
let chatUI: ChatUI = new ChatUI({
    messages: chatMessages,
    user: currentUserModel,
    footerTemplate: footerTemplate
});

chatUI.appendTo('#footerTemplate');

function footerTemplate(): string {
    return `
        <div class="custom-footer">
            <input id="chatTextArea" class="e-input" placeholder="Type your message..."></input>
            <button id="sendMessage" class="e-btn e-primary e-icons e-send-1"></button>
        </div>`;
}

// Handle custom footer events
document.addEventListener('click', (event) => {
    if (event.target && (event.target as HTMLElement).id === 'sendMessage') {
        const textArea = document.getElementById('chatTextArea') as HTMLInputElement;
        if (textArea && textArea.value.length > 0) {
            let value: string = textArea.value;
            textArea.value = '';
            chatUI.addMessage({
                author: michaleUserModel,
                text: value
            });
        }
    }
});
```

### Styling for Custom Footer

```css
#footerTemplate.e-chat-ui .e-footer {
    margin: unset;
    align-self: auto;
}

.custom-footer {
    display: flex;
    gap: 10px;
    padding: 10px;
    background-color: transparent;
}

#chatTextArea {
    width: 100%;
    border-radius: 5px;
    border: 1px solid #ccc;
    margin-bottom: 0;
    padding: 5px;
}

.e-icons.e-send-1 {
    font-family: "e-icons";
}
```

### Advanced Footer with Multiple Actions

```typescript
function footerTemplate(): string {
    return `
        <div class="custom-footer">
            <button id="attachBtn" class="e-btn e-icons e-attach" title="Attach file"></button>
            <input id="chatTextArea" class="e-input" placeholder="Type your message..."></input>
            <button id="emojiBtn" class="e-btn e-icons e-emoji" title="Add emoji"></button>
            <button id="sendMessage" class="e-btn e-primary e-icons e-send-1" title="Send message"></button>
        </div>`;
}
```

---

## Template Context and Data Binding

### Understanding Template Context

Each template receives specific context data that can be accessed within the template function:

| Template | Context Properties |
|----------|-------------------|
| `emptyChatTemplate` | None |
| `messageTemplate` | `message` (MessageModel), `index` (number) |
| `timeBreakTemplate` | `messageDate` (Date) |
| `typingUsersTemplate` | `users` (UserModel[]) |
| `suggestionTemplate` | `suggestion` (string/object), `index` (number) |
| `footerTemplate` | None |

### Accessing Context Data

```typescript
// Message Template
function messageTemplate(context: any): string {
    const message = context.message;
    const index = context.index;
    
    return `
        <div class="message-${index}">
            <div>${message.text}</div>
            <small>${message.author.user}</small>
        </div>
    `;
}

// Suggestion Template
function suggestionTemplate(context: any): string {
    const suggestion = context.suggestion;
    const index = context.index;
    
    return `<div data-index="${index}">${suggestion}</div>`;
}
```

### Type Safety with TypeScript

Define proper types for context:

```typescript
interface MessageTemplateContext {
    message: MessageModel;
    index: number;
}

interface SuggestionTemplateContext {
    suggestion: string;
    index: number;
}

function messageTemplate(context: MessageTemplateContext): string {
    return `<div>${context.message.text}</div>`;
}

function suggestionTemplate(context: SuggestionTemplateContext): string {
    return `<div>${context.suggestion}</div>`;
}
```

---

## Best Practices

### Performance

1. **Keep templates lightweight**: Avoid complex logic in template functions
2. **Minimize DOM operations**: Return clean, minimal HTML
3. **Cache computed values**: Calculate once, use multiple times
4. **Avoid inline styles**: Use CSS classes instead

### Maintainability

1. **Separate template functions**: Define templates as named functions
2. **Use consistent naming**: Follow a naming convention
3. **Document custom templates**: Add comments explaining logic
4. **Extract reusable parts**: Create helper functions for common patterns

### Accessibility

1. **Use semantic HTML**: Employ proper HTML elements
2. **Add ARIA labels**: Include accessibility attributes
3. **Support keyboard navigation**: Ensure interactive elements are accessible
4. **Maintain color contrast**: Follow WCAG guidelines

### Security

1. **Sanitize user input**: Never inject raw user content
2. **Escape HTML entities**: Prevent XSS attacks
3. **Validate data**: Check context data before use
4. **Use safe methods**: Prefer textContent over innerHTML when possible

### Example: Sanitized Template

```typescript
function escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function messageTemplate(context: any): string {
    const safeText = escapeHtml(context.message.text);
    const safeUser = escapeHtml(context.message.author.user);
    
    return `
        <div class="message">
            <div class="user">${safeUser}</div>
            <div class="text">${safeText}</div>
        </div>
    `;
}
```

### Responsive Design

Ensure templates work across different screen sizes:

```typescript
function messageTemplate(context: any): string {
    return `
        <div class="message-container">
            <div class="message-content">
                <div class="message-text">${context.message.text}</div>
            </div>
        </div>
    `;
}
```

```css
.message-container {
    max-width: 100%;
    padding: 8px;
}

@media (max-width: 768px) {
    .message-container {
        padding: 4px;
    }
}
```
