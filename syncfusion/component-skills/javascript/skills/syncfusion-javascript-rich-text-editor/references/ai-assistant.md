# AI Assistant

> Requires module injection: `AIAssistant`

## Table of Contents
- [Overview](#overview)
- [Enable AI Assistant](#enable-ai-assistant)
- [Handle AI Prompt Requests](#handle-ai-prompt-requests)
- [Streaming vs Single Response](#streaming-vs-single-response)
- [aiAssistantSettings Reference](#aiassistantsettings-reference)
- [Custom AI Commands](#custom-ai-commands)
- [Custom Toolbar Items in AI Popup](#custom-toolbar-items-in-ai-popup)
- [Events Reference](#events-reference)

---

## Overview

The AI Assistant adds two toolbar items to the RTE:
- **AICommands** — dropdown of predefined prompts (improve, shorten, summarize, grammar check, etc.)
- **AIQuery** — opens a popup for free-form AI prompts (`Alt+Enter` / `⌥+Enter`)

The assistant displays an AssistView popup with the conversation history and response area.

---

## Enable AI Assistant

```typescript
import {
  RichTextEditor, Toolbar, HtmlEditor, Link, Image,
  AIAssistant, QuickToolbar
} from '@syncfusion/ej2-richtexteditor';
RichTextEditor.Inject(Toolbar, HtmlEditor, Link, Image, QuickToolbar, AIAssistant);

const editor = new RichTextEditor({
  toolbarSettings: {
    items: ['AICommands', 'AIQuery', '|', 'Bold', 'Italic']
  },
  aiAssistantPromptRequest: async (args) => {
    // Handle prompt — see below
  }
});
editor.appendTo('#editor');
```

---

## Handle AI Prompt Requests

The `aiAssistantPromptRequest` event fires whenever the user submits a prompt (built-in command or custom query).

```typescript
aiAssistantPromptRequest: async (args) => {
  const { prompt, text } = args;  // prompt = instruction, text = selected content
  // Send to your AI backend
  const response = await fetch('/api/ai', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: prompt + '\n\n' + text })
  });
  const data = await response.json();
  // Insert final response
  editor.addAIPromptResponse(data.result, true);
}
```

---

## Streaming vs Single Response

### Streaming (typewriter effect)

```typescript
aiAssistantPromptRequest: async (args) => {
  const response = await fetch('/api/ai/stream', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer TOKEN' },
    body: JSON.stringify({ message: args.prompt + args.text })
  });

  const stream = response.body.pipeThrough(new TextDecoderStream());
  let fullText = '';

  for await (const chunk of stream) {
    fullText += chunk;
    editor.addAIPromptResponse(fullText, false); // false = not final
  }
  editor.addAIPromptResponse(fullText, true);   // true = final
}
```

### Single response

```typescript
aiAssistantPromptRequest: async (args) => {
  const response = await fetch('/api/ai/query', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: args.prompt + args.text })
  });
  const result = await response.text();
  editor.addAIPromptResponse(result, true); // insert at once
}
```

> `addAIPromptResponse` converts Markdown responses to HTML using `@syncfusion/ej2-markdown-converter`.

---

## aiAssistantSettings Reference

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `commands` | `AICommands[]` | Predefined set | Items in the AI Commands dropdown |
| `popupWidth` | `string \| number` | `'600px'` | AI popup width |
| `popupMaxHeight` | `string \| number` | `'400px'` | AI popup max height |
| `placeholder` | `string` | `'Ask AI to rewrite...'` | Prompt textarea placeholder |
| `prompts` | `PromptModel[]` | `[]` | Preloaded conversation prompts/responses |
| `suggestions` | `string[]` | `[]` | Suggestion chips shown to users |
| `bannerTemplate` | `string \| Function` | `''` | Custom banner template inside popup |
| `maxPromptHistory` | `number` | `20` | Max prompts stored in history |
| `headerToolbarSettings` | array | `['AICommands', 'Close']` | Header toolbar items |
| `promptToolbarSettings` | array | `['Edit', 'Copy']` | Prompt section toolbar items |
| `responseToolbarSettings` | array | `['Regenerate', 'Copy', '\|', 'Insert']` | Response section toolbar items |

---

## Custom AI Commands

```typescript
const editor = new RichTextEditor({
  toolbarSettings: { items: ['AICommands', 'AIQuery'] },
  aiAssistantSettings: {
    commands: [
      { text: 'Rewrite',  prompt: 'Rewrite the content to be more refined.' },
      { text: 'Elaborate', prompt: 'Expand on the following content:' },
      {
        text: 'Change Tone',
        items: [
          { text: 'Professional', prompt: 'Rewrite in a professional tone:' },
          { text: 'Casual',       prompt: 'Rewrite in a casual tone:' },
          { text: 'Direct',       prompt: 'Rewrite to be more direct:' }
        ]
      }
    ]
  }
});
```

---

## Custom Toolbar Items in AI Popup

```typescript
const editor = new RichTextEditor({
  aiAssistantSettings: {
    promptToolbarSettings: [
      'Edit', 'Copy',
      { command: 'SearchGoogle', iconCss: 'e-icons e-open-link', tooltip: 'Search in Google' }
    ],
    responseToolbarSettings: [
      'Regenerate', 'Copy', '|', 'Insert',
      { command: 'Save', iconCss: 'e-icons e-save', tooltip: 'Save Response' }
    ]
  },
  aiAssistantToolbarClick: (args) => {
    if (args.item.iconCss === 'e-icons e-open-link') {
      const prompt = /* extract prompt text */ '';
      window.open(`https://www.google.com/search?q=${prompt}`, '_blank');
    }
    if (args.item.iconCss === 'e-icons e-save') {
      const responseHTML = /* extract response HTML */ '';
      console.log('Saving:', responseHTML);
    }
  }
});
```

---

## Events Reference

| Event | When it fires |
|-------|--------------|
| `aiAssistantPromptRequest` | User submits a prompt (built-in command or custom query) |
| `aiAssistantStopRespondingClick` | User clicks "Stop Responding" during streaming |
| `aiAssistantToolbarClick` | User clicks a toolbar item inside the AI popup |
| `beforePopupOpen` | Before AI popup opens |
| `beforePopupClose` | Before AI popup closes |
