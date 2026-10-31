# Assist View Configuration

## Table of Contents
- [Setting Prompt Text](#setting-prompt-text)
- [Setting Prompt Placeholder](#setting-prompt-placeholder)
- [Prompt-Response Collection](#prompt-response-collection)
- [Markdown Response Rendering](#markdown-response-rendering)
- [Prompt Suggestions](#prompt-suggestions)
- [Prompt Icon Customization](#prompt-icon-customization)
- [Response Icon Customization](#response-icon-customization)
- [Show/Hide Clear Button](#showhide-clear-button)
- [Show/Hide Header](#showhide-header)
- [Enable Scroll to Bottom](#enable-scroll-to-bottom)
- [Response Streaming](#response-streaming)

This guide covers all configuration options for managing prompts, responses, suggestions, and UI controls in the AI AssistView component.

---

## Setting Prompt Text

Use the `prompt` property to pre-populate the prompt textarea with initial text.

### Property

```typescript
prompt: string = ''
```

### Example

```typescript
import { AIAssistView } from '@syncfusion/ej2-interactive-chat';

const aiAssistView: AIAssistView = new AIAssistView({
    prompt: 'What tools or apps can help me prioritize tasks?',
    promptRequest: () => {
        setTimeout(() => {
            aiAssistView.addPromptResponse('Here are some task prioritization tools...');
        }, 1000);
    }
});

aiAssistView.appendTo('#aiAssistView');
```

**Use case:** Set an initial prompt to guide users or demonstrate the component.

---

## Setting Prompt Placeholder

Use the `promptPlaceholder` property to customize the placeholder text in the prompt textarea.

### Property

```typescript
promptPlaceholder: string = 'Type prompt for assistance...'
```

### Example

```typescript
const aiAssistView: AIAssistView = new AIAssistView({
    promptPlaceholder: 'Ask me anything...',
    promptRequest: () => {
        setTimeout(() => {
            aiAssistView.addPromptResponse('I\'m here to help!');
        }, 1000);
    }
});
```

**Use cases:**
- Customize for specific domains: "Ask about your order...", "Describe your code issue..."
- Multi-language support: Translate placeholder text
- Provide hints: "Type your question here (max 500 chars)..."

---

## Prompt-Response Collection

The `prompts` property holds the collection of all prompt-response pairs in the AI AssistView.

### Property

```typescript
prompts: PromptModel[] = []
```

### PromptModel Interface

```typescript
interface PromptModel {
    prompt: string;              // User's prompt text
    response: string;            // AI's response (HTML or markdown)
    attachedFiles?: FileInfo[];  // Files attached with prompt
    isResponseHelpful?: boolean; // User feedback on response
}
```

### Initialize with Data

```typescript
const promptsData: PromptModel[] = [
    {
        prompt: "What is AI?",
        response: "<div>AI stands for Artificial Intelligence, enabling machines to mimic human intelligence for tasks such as learning, problem-solving, and decision-making.</div>"
    },
    {
        prompt: "What is Machine Learning?",
        response: "<div>Machine Learning is a subset of AI that enables systems to learn and improve from experience without being explicitly programmed.</div>"
    }
];

const aiAssistView: AIAssistView = new AIAssistView({
    prompts: promptsData,
    promptRequest: (args: PromptRequestEventArgs) => {
        setTimeout(() => {
            const foundPrompt = promptsData.find(p => p.prompt === args.prompt);
            const defaultResponse = 'Connect to an AI service for real-time responses.';
            aiAssistView.addPromptResponse(foundPrompt ? foundPrompt.response : defaultResponse);
        }, 1000);
    }
});
```

### Adding Prompts Programmatically

```typescript
// Add new prompt-response as object
const newPrompt: PromptModel = {
    prompt: "Explain neural networks",
    response: "Neural networks are computing systems inspired by biological neural networks..."
};

aiAssistView.addPromptResponse(newPrompt);
```

**Use cases:**
- Pre-load conversation history
- Restore previous sessions
- Display demo conversations
- Programmatically add Q&A pairs

---

## Markdown Response Rendering

The AI AssistView automatically converts markdown-formatted responses to HTML using the built-in Markdown Converter.

### Supported Markdown Syntax

- **Headers**: `#`, `##`, `###`
- **Bold**: `**text**` or `__text__`
- **Italic**: `*text*` or `_text_`
- **Code**: Triple backticks for code blocks, backticks for inline code
- **Lists**: `-`, `*`, or `1.` for ordered lists
- **Links**: `[text](url)`
- **Blockquotes**: `>`

### Example

```typescript
const markdownData = [
    {
        prompt: 'What is Markdown?',
        response: `# Markdown Guide

Markdown is a lightweight markup language:

- **Headers:** Use \`#\`, \`##\`, \`###\`
- **Bold:** \`**text**\` for bold
- **Italic:** \`*text*\` for italic
- **Code:** Triple backticks for code blocks
- **Lists:** Use \`-\` for bullet points

It's simple and perfect for documentation.`,
        suggestions: ['How do I use bold?', 'Show code block example']
    },
    {
        prompt: 'How do I use bold?',
        response: `# Bold Text in Markdown

Use double asterisks \`**text**\` or double underscores \`__text__\`:

**This is bold text**

Both methods produce the same result.`
    }
];

const aiAssistView: AIAssistView = new AIAssistView({
    promptSuggestions: ['What is Markdown?', 'How do I use bold?'],
    promptRequest: (args) => {
        const response = markdownData.find(d => d.prompt === args.prompt);
        if (response) {
            aiAssistView.addPromptResponse(response.response);
            if (response.suggestions) {
                aiAssistView.promptSuggestions = response.suggestions;
            }
        }
    }
});
```

### Code Block Example

```typescript
const response = `## API Example

Here's how to call the API:

\`\`\`javascript
const response = await fetch('https://api.example.com/data', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: 'test' })
});
const data = await response.json();
\`\`\`

This returns a JSON response.`;

aiAssistView.addPromptResponse(response);
```

**Use cases:**
- Format AI responses with headings, lists, and emphasis
- Display code examples with syntax highlighting
- Create structured, readable responses
- Stream markdown content (see Response Streaming section)

---

## Prompt Suggestions

The `promptSuggestions` property provides users with pre-defined prompt options.

### Property

```typescript
promptSuggestions: string[] = null
```

### Basic Example

```typescript
const aiAssistView: AIAssistView = new AIAssistView({
    promptSuggestions: [
        "Best practices for clean code?",
        "How to optimize code editor?",
        "Explain design patterns"
    ],
    promptRequest: (args) => {
        // Handle prompt
        aiAssistView.addPromptResponse(`Responding to: ${args.prompt}`);
    }
});
```

### Dynamic Suggestions

Update suggestions based on previous responses:

```typescript
const aiAssistView: AIAssistView = new AIAssistView({
    promptSuggestions: ['What is JavaScript?', 'What is TypeScript?'],
    promptRequest: (args) => {
        if (args.prompt === 'What is JavaScript?') {
            aiAssistView.addPromptResponse('JavaScript is a programming language...');
            // Update suggestions
            aiAssistView.promptSuggestions = [
                'Explain JavaScript closures',
                'What are JavaScript promises?',
                'How does async/await work?'
            ];
        }
    }
});
```

### Suggestion Headers

Use `promptSuggestionsHeader` to add a header above suggestions:

```typescript
const aiAssistView: AIAssistView = new AIAssistView({
    promptSuggestionsHeader: "Suggested Questions",
    promptSuggestions: [
        "How do I start?",
        "What are key features?"
    ]
});
```

**Property:**

```typescript
promptSuggestionsHeader: string = ''
```

**Use cases:**
- Guide users with relevant questions
- Update suggestions contextually based on conversation
- Group suggestions by topic
- Improve discoverability of features

---

## Prompt Icon Customization

Use the `promptIconCss` property to customize the user's avatar icon.

### Property

```typescript
promptIconCss: string = null
```

### Example

```typescript
const aiAssistView: AIAssistView = new AIAssistView({
    promptIconCss: "e-icons e-user",  // Syncfusion icon
    prompts: [
        {
            prompt: "What is AI?",
            response: "AI stands for Artificial Intelligence..."
        }
    ]
});
```

### Custom Icon Class

```html
<style>
    .custom-user-icon::before {
        content: '👤';
        font-size: 24px;
    }
</style>
```

```typescript
const aiAssistView: AIAssistView = new AIAssistView({
    promptIconCss: "custom-user-icon"
});
```

**Use cases:**
- Brand the interface with custom avatars
- Use user profile pictures
- Differentiate between user types
- Apply consistent iconography

---

## Response Icon Customization

Use the `responseIconCss` property to customize the AI responder's avatar icon.

### Property

```typescript
responseIconCss: string = null  // Default: 'e-assistview-icon'
```

### Example

```typescript
const aiAssistView: AIAssistView = new AIAssistView({
    responseIconCss: "e-icons e-comment-show",
    prompts: [
        {
            prompt: "Hello",
            response: "Hi! How can I help you?"
        }
    ]
});
```

### Custom AI Icon

```html
<style>
    .custom-ai-icon::before {
        content: '🤖';
        font-size: 28px;
    }
</style>
```

```typescript
const aiAssistView: AIAssistView = new AIAssistView({
    responseIconCss: "custom-ai-icon"
});
```

**Use cases:**
- Brand AI responses with company logo
- Use robot/bot icons for AI identity
- Different icons for different AI personas
- Visual distinction between user and AI

---

## Show/Hide Clear Button

The `showClearButton` property controls the visibility of the clear button in the prompt textarea.

### Property

```typescript
showClearButton: boolean = false
```

### Example

```typescript
const aiAssistView: AIAssistView = new AIAssistView({
    showClearButton: true,
    prompt: 'What tools can help me?',
    promptRequest: () => {
        setTimeout(() => {
            aiAssistView.addPromptResponse('Here are some tools...');
        }, 1000);
    }
});
```

**Behavior:** When enabled, a clear button (×) appears in the textarea. Clicking it clears the prompt text.

**Use cases:**
- Improve UX for long prompts
- Quick way to reset input
- Mobile-friendly input management

---

## Show/Hide Header

The `showHeader` property controls the visibility of the header section.

### Property

```typescript
showHeader: boolean = true
```

### Example - Hide Header

```typescript
const aiAssistView: AIAssistView = new AIAssistView({
    showHeader: false,
    promptRequest: () => {
        aiAssistView.addPromptResponse('Response without header');
    }
});
```

**Use cases:**
- Embed AI AssistView in custom layouts
- Save vertical space
- Custom header implementations
- Simplified UI

---

## Enable Scroll to Bottom

The `enableScrollToBottom` property shows a floating scroll-to-bottom button when the user scrolls away from the latest message.

### Property

```typescript
enableScrollToBottom: boolean = true
```

### Example

```typescript
const aiAssistView: AIAssistView = new AIAssistView({
    enableScrollToBottom: true,  // Default
    prompts: promptsData,  // Long conversation history
    promptRequest: () => {
        aiAssistView.addPromptResponse('New response...');
    }
});
```

**Behavior:**
- Button appears when user scrolls up
- Clicking scrolls smoothly to bottom
- Hides automatically when at bottom
- Shows on new response arrival

### Programmatic Scrolling

Use the `scrollToBottom()` method:

```typescript
// Scroll to bottom manually
aiAssistView.scrollToBottom();
```

**Use cases:**
- Ensure users see latest responses
- Improve UX in long conversations
- Auto-focus on new messages
- Navigation aid in chat UI

---

## Response Streaming

The `enableStreaming` property enables real-time streaming of AI responses.

### Property

```typescript
enableStreaming: boolean = false
```

### Example - Basic Streaming

```typescript
const aiAssistView: AIAssistView = new AIAssistView({
    enableStreaming: true,
    promptRequest: (args) => {
        const fullResponse = "This is a streaming response that appears gradually...";
        
        let index = 0;
        const interval = setInterval(() => {
            if (index < fullResponse.length) {
                const chunk = fullResponse.slice(0, index + 5);
                aiAssistView.addPromptResponse(chunk, false);  // isFinalUpdate: false
                index += 5;
            } else {
                clearInterval(interval);
                aiAssistView.addPromptResponse(fullResponse, true);  // isFinalUpdate: true
            }
        }, 50);
    }
});
```

### Streaming with OpenAI

```typescript
const aiAssistView: AIAssistView = new AIAssistView({
    enableStreaming: true,
    promptRequest: async (args) => {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: 'gpt-4',
                messages: [{ role: 'user', content: args.prompt }],
                stream: true
            })
        });

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let fullText = '';

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value);
            const lines = chunk.split('\n').filter(line => line.trim() !== '');

            for (const line of lines) {
                if (line.startsWith('data: ')) {
                    const data = line.slice(6);
                    if (data === '[DONE]') continue;

                    try {
                        const parsed = JSON.parse(data);
                        const content = parsed.choices[0]?.delta?.content || '';
                        fullText += content;
                        aiAssistView.addPromptResponse(fullText, false);
                    } catch (e) {}
                }
            }
        }

        // Final update
        aiAssistView.addPromptResponse(fullText, true);
    }
});
```

### Method Signature

```typescript
addPromptResponse(outputResponse: string | PromptModel, isFinalUpdate?: boolean): void
```

**Parameters:**
- `outputResponse`: String or PromptModel object
- `isFinalUpdate`: `false` for streaming chunks, `true` for final update (default: `true`)

**Use cases:**
- Real-time AI responses (OpenAI, Gemini streaming)
- Progressive text display
- Better perceived performance
- Engaging user experience

---

## Summary

**Key Properties:**
- `prompt`: Pre-populate prompt text
- `promptPlaceholder`: Customize placeholder
- `prompts`: Prompt-response collection
- `promptSuggestions`: Suggested prompts array
- `promptSuggestionsHeader`: Header for suggestions
- `promptIconCss`: User avatar icon
- `responseIconCss`: AI avatar icon
- `showClearButton`: Show/hide clear button
- `showHeader`: Show/hide header section
- `enableScrollToBottom`: Auto-scroll button
- `enableStreaming`: Enable response streaming
