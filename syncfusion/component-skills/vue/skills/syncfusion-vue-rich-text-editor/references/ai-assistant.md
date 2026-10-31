# AI Assistant

The Rich Text Editor includes a built-in AI Assistant panel powered by the `AIAssistantService` module. It provides two toolbar items — **AICommands** (predefined prompts menu) and **AIQuery** (custom prompt popup) — and renders an AssistView inside a popup next to the editor.

## Setup

```vue
<template>
  <ejs-richtexteditor
    ref="rteRef"
    :toolbarSettings="toolbarSettings"
    :aiAssistantPromptRequest="onPromptRequest"
  />
</template>

<script setup>
import { provide, ref } from 'vue';
import {
  RichTextEditorComponent as EjsRichtexteditor,
  Toolbar, Link, Image, HtmlEditor, QuickToolbar,
  AIAssistantService
} from '@syncfusion/ej2-vue-richtexteditor';

const rteRef = ref(null);

const toolbarSettings = {
  items: [
    'Bold', 'Italic', 'Underline', '|',
    'Formats', 'Alignments', 'OrderedList', 'UnorderedList', '|',
    'CreateLink', 'Image', '|',
    'AICommands', 'AIQuery',    // AI toolbar items
    '|', 'Undo', 'Redo'
  ]
};

const onPromptRequest = async (args) => {
  // args.prompt  — the selected AI action or custom query text
  // args.text    — the currently selected text in the editor
  const response = await fetch('YOUR_AI_SERVICE_URL/api/query', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: args.prompt + args.text })
  });
  const data = await response.text();
  rteRef.value.ej2Instances.addAIPromptResponse(data, true);
};

provide('richtexteditor', [Toolbar, Link, Image, HtmlEditor, QuickToolbar, AIAssistantService]);
</script>
```

## Toolbar Items

| Item | Description |
|---|---|
| `AICommands` | Opens a dropdown menu with predefined prompts (Improve, Shorten, Elaborate, Simplify, Summarize, Grammar Check) |
| `AIQuery` | Opens a freeform text popup; also triggered by **Alt + Enter** (Windows) / **⌥ + Enter** (Mac) |

## Events

| Event | Description |
|---|---|
| `aiAssistantPromptRequest` | Fires when the user submits a prompt. Provides `args.prompt` and `args.text` |
| `aiAssistantStopRespondingClick` | Fires when the user clicks the Stop Responding button during a stream |

## Streaming Responses

For a typewriter effect, call `addAIPromptResponse(chunk, isFinal)` incrementally:

```js
const onPromptRequest = async (args) => {
  const response = await fetch('YOUR_AI_SERVICE_URL/api/stream', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer YOUR_TOKEN'
    },
    body: JSON.stringify({ message: args.prompt + args.text })
  });

  const stream = response.body.pipeThrough(new TextDecoderStream());
  let fullText = '';

  for await (const chunk of stream) {
    fullText += chunk;
    // Pass false for isFinal during streaming
    rteRef.value.ej2Instances.addAIPromptResponse(fullText, false);
  }

  // Signal the end of the stream
  rteRef.value.ej2Instances.addAIPromptResponse(fullText, true);
};
```

## Non-Streaming (Single Response)

Pass `true` for `finalUpdate` to insert the complete response at once. A loading skeleton is displayed while waiting.

```js
const onPromptRequest = async (args) => {
  const response = await fetch('YOUR_AI_SERVICE_URL/api/query', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: args.prompt + args.text })
  });
  const data = await response.text();
  rteRef.value.ej2Instances.addAIPromptResponse(data, true);
};
```

> `addAIPromptResponse` converts Markdown responses to HTML automatically using `@syncfusion/ej2-markdown-converter`.

## Stop Responding

Handle the stop-responding event to cancel ongoing fetch streams:

```js
let abortController = new AbortController();

const onPromptRequest = async (args) => {
  abortController = new AbortController();
  try {
    const response = await fetch('YOUR_AI_SERVICE_URL/api/stream', {
      signal: abortController.signal,
      // ...
    });
    // streaming logic...
  } catch (err) {
    if (err.name === 'AbortError') console.log('Stream cancelled');
  }
};

const onStopResponding = () => {
  abortController.abort();
};
```

```vue
<ejs-richtexteditor
  :aiAssistantPromptRequest="onPromptRequest"
  :aiAssistantStopRespondingClick="onStopResponding"
/>
```
