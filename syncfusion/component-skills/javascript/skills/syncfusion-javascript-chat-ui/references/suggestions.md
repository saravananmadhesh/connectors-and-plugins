# Suggestions

This guide covers how to implement quick reply suggestions in the Chat UI component.

## Overview

The suggestions feature displays quick reply options above the input field, helping users quickly respond without typing. This is useful for guided conversations, chatbots, and support scenarios.

---

## Suggestions Property

Use the `suggestions` property to display an array of quick reply options.

```typescript
import { ChatUI, UserModel } from '@syncfusion/ej2-interactive-chat';

let chatUI: ChatUI = new ChatUI({
    user: currentUser,
    suggestions: ['Yes', 'No', 'Maybe', 'Ask me later']
});

chatUI.appendTo('#chatUI');
```

---

## Dynamic Suggestions

Update suggestions dynamically based on conversation context.

```typescript
let chatUI: ChatUI = new ChatUI({
    user: currentUser,
    suggestions: []  // Start with no suggestions
});

// Update suggestions based on bot response
function showRelevantSuggestions(botMessage: string) {
    if (botMessage.includes('help')) {
        chatUI.suggestions = ['Yes, I need help', 'No, thanks', 'Show more options'];
    } else if (botMessage.includes('satisfied')) {
        chatUI.suggestions = ['Very satisfied', 'Satisfied', 'Neutral', 'Unsatisfied'];
    } else {
        chatUI.suggestions = [];
    }
    chatUI.dataBind();
}
```

---

## Custom Suggestion Template

Use `suggestionTemplate` to customize the appearance of suggestions.

```typescript
let chatUI: ChatUI = new ChatUI({
    user: currentUser,
    suggestions: ['Yes', 'No', 'Maybe'],
    suggestionTemplate: function(context: any) {
        return `<button class="custom-suggestion">${context.text}</button>`;
    }
});
```

---

## Common Patterns

### Billing Support Suggestions

```typescript
let chatUI: ChatUI = new ChatUI({
    user: currentUser,
    suggestions: [
        'Check my balance',
        'View recent transactions',
        'Update payment method',
        'Report an issue'
    ]
});
```

### Product Recommendations

```typescript
let chatUI: ChatUI = new ChatUI({
    user: currentUser,
    suggestions: [
        'Show electronics',
        'Show clothing',
        'Show home & garden',
        'Search by price'
    ]
});
```

### FAQ Navigation

```typescript
let chatUI: ChatUI = new ChatUI({
    user: currentUser,
    suggestions: [
        'How do I reset my password?',
        'What are your business hours?',
        'How do I contact support?',
        'View all FAQs'
    ]
});
```

---

## Suggestion Click Behavior

Suggestions automatically add the selected text as a user message when clicked. No additional event handling is required for basic functionality.

```typescript
// When user clicks "Yes"
// Message "Yes" is automatically added to the chat
```

---

## Advanced: Custom Suggestion Handler

If you need custom handling when suggestions are clicked, use the `messageSend` event:

```typescript
let chatUI: ChatUI = new ChatUI({
    user: currentUser,
    suggestions: ['Option 1', 'Option 2', 'Option 3'],
    messageSend: (args: MessageSendEventArgs) => {
        // Check if message is from suggestion click
        if (chatUI.suggestions && chatUI.suggestions.includes(args.message.text)) {
            console.log('Suggestion selected:', args.message.text);
            
            // Handle suggestion-specific logic
            handleSuggestionClick(args.message.text);
        }
    }
});

function handleSuggestionClick(suggestion: string) {
    switch(suggestion) {
        case 'Yes':
            // Handle yes
            break;
        case 'No':
            // Handle no
            break;
    }
}
```

---

## Clear Suggestions

Remove all suggestions programmatically:

```typescript
// Clear suggestions
chatUI.suggestions = [];
chatUI.dataBind();

// Or
chatUI.suggestions = null;
chatUI.dataBind();
```

---

## Complete Example: Guided Conversation

```typescript
import { ChatUI, UserModel, MessageModel, MessageSendEventArgs } from '@syncfusion/ej2-interactive-chat';

let currentUser: UserModel = { id: "user1", user: "Customer" };
let botUser: UserModel = { id: "bot", user: "Support Bot" };

let conversationStep = 0;

let chatUI: ChatUI = new ChatUI({
    user: currentUser,
    messages: [
        {
            author: botUser,
            text: "Hello! How can I help you today?"
        }
    ],
    suggestions: ['Billing', 'Technical Support', 'Feedback'],
    
    messageSend: (args: MessageSendEventArgs) => {
        handleUserResponse(args.message.text);
    }
});

function handleUserResponse(userMessage: string) {
    conversationStep++;
    
    let botResponse: string;
    let newSuggestions: string[] = [];
    
    if (conversationStep === 1) {
        // First response
        if (userMessage === 'Billing') {
            botResponse = 'What's your billing question?';
            newSuggestions = [
                'Check my balance',
                'Update payment method',
                'View invoice'
            ];
        } else if (userMessage === 'Technical Support') {
            botResponse = 'Describe your technical issue:';
            newSuggestions = [
                'Login problem',
                'Performance issue',
                'Feature not working'
            ];
        } else {
            botResponse = 'Thank you for your feedback!';
            newSuggestions = ['End conversation'];
        }
    } else if (conversationStep === 2) {
        // Second response
        botResponse = `I'll help you with "${userMessage}". One moment...`;
        newSuggestions = ['Resolve this', 'Escalate to agent', 'Back to menu'];
    } else {
        // Final response
        botResponse = 'Is there anything else I can help you with?';
        newSuggestions = ['Yes', 'No'];
    }
    
    // Add bot response
    chatUI.addMessage({
        author: botUser,
        text: botResponse
    });
    
    // Update suggestions
    chatUI.suggestions = newSuggestions;
    chatUI.dataBind();
}

chatUI.appendTo('#chatUI');
```

---

## Best Practices

1. **Limit Suggestions**: Show 3-4 suggestions maximum for clarity
2. **Context-Relevant**: Update suggestions based on conversation flow
3. **Clear Wording**: Use concise, action-oriented text
4. **Mobile Friendly**: Ensure suggestions are tappable on small screens
5. **Progressive Disclosure**: Simplify options by asking targeted questions
6. **Clear Option**: Always provide a way to bypass suggestions (e.g., free text input)
7. **Auto-Clear**: Clear suggestions after significant conversation steps
