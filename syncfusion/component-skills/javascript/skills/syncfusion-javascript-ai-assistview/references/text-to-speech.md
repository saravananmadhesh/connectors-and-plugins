# Text to Speech

## Table of Contents
- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Enable Text to Speech](#enable-text-to-speech)
- [Configuring the Speech Settings](#configuring-the-speech-settings)
  - [Language](#language)
  - [Speech Pitch](#speech-pitch)
  - [Speech Rate](#speech-rate)
  - [Volume](#volume)
  - [Voice](#voice)
  - [Input Text](#input-text)
- [Complete Example](#complete-example)
- [Browser Compatibility](#browser-compatibility)

This guide covers text-to-speech functionality using the browser's Web Speech API.

---

## Overview

The AI AssistView provides built-in **Text-to-Speech** (TTS) support using the browser's Web Speech API, specifically the `SpeechSynthesisUtterance` interface. This converts AI-generated responses into spoken audio, enhancing accessibility and hands-free interaction.

**Key Feature:**
- `textToSpeechSettings` - Complete speech synthesis configuration

Text-to-Speech is triggered from the response toolbar, using the built-in `e-assist-audio` toolbar item, which reads the corresponding AI response aloud when clicked.

---

## Prerequisites

Before integrating Text-to-Speech:

1. **AI AssistView Setup**: Component must be properly initialized
2. **Browser Support**: Web Speech API (`SpeechSynthesisUtterance`) is not universally supported (see Browser Compatibility)
3. **Response Toolbar**: The `e-assist-audio` item must be added to `responseToolbarSettings.items` to expose the Read Aloud control
4. **AI Integration** (optional): Works well alongside an AI service integration (e.g., Azure OpenAI) so generated responses can be read aloud

---

## Enable Text to Speech

### Property

```typescript
responseToolbarSettings: {
    items: ToolbarItemModel[]  // Add 'e-icons e-assist-audio' to enable Read Aloud
}
```

To enable the built-in Text-to-Speech functionality, add the `e-assist-audio` response toolbar item to the `items` collection of the `responseToolbarSettings` property. When clicked, it fetches the text from the generated AI response and uses the browser's `SpeechSynthesis` API to read it aloud.

### Basic Example

```typescript
import { AIAssistView, PromptRequestEventArgs, PromptModel } from '@syncfusion/ej2-interactive-chat';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

const promptsData: PromptModel[] = [
    {
        prompt: "What is AI?",
        response: "AI stands for Artificial Intelligence, enabling machines to mimic human intelligence for tasks such as learning, problem-solving, and decision-making."
    }
];

// Initializes the AI Assist control with textToSpeech settings
const aiAssistView: AIAssistView = new AIAssistView({
    prompts: promptsData,
    responseToolbarSettings: {
        items: [
            { type: 'Button', iconCss: 'e-icons e-assist-audio', tooltip: 'Read Aloud' },
            { type: 'Button', iconCss: 'e-icons e-assist-like', tooltip: 'Like' },
            { type: 'Button', iconCss: 'e-icons e-assist-dislike', tooltip: 'Need Improvement' }
        ]
    },
    // Configure the built-in Text-to-Speech behaviour
    textToSpeechSettings: {
        language: 'en-US',
        speechPitch: 1,
        speechRate: 1,
        volume: 1
    },
    promptRequest: (args: PromptRequestEventArgs) => {
        setTimeout(() => {
            const defaultResponse = 'For real-time prompt processing, connect the AIAssistView component to your preferred AI service, such as OpenAI or Azure Cognitive Services.';
            aiAssistView.addPromptResponse(defaultResponse);
        }, 1000);
    }
});

// Render initialized AI Assist.
aiAssistView.appendTo('#aiAssistView');
```

**Use case:** Let users listen to AI-generated responses instead of reading them, improving accessibility and enabling hands-free use.

---

## Configuring the Speech Settings

Use the `textToSpeechSettings` property to customize the speech synthesis behavior.

### Interface

```typescript
interface TextToSpeechSettingsModel {
    language?: string;
    speechPitch?: number;
    speechRate?: number;
    volume?: number;
    voice?: string;
    inputText?: string;
}
```

### Language

#### Property

```typescript
textToSpeechSettings: {
    language: string = 'en-US'
}
```

Set the language/locale used for speech synthesis.

#### Example

```typescript
textToSpeechSettings: {
    language: 'en-US'  // US English
}
```

#### Common Language Codes

```typescript
language: 'en-US'  // US English
language: 'en-GB'  // British English
language: 'fr-FR'  // French (France)
language: 'de-DE'  // German (Germany)
language: 'es-ES'  // Spanish (Spain)
language: 'ja-JP'  // Japanese (Japan)
language: 'hi-IN'  // Hindi (India)
```

---

### Speech Pitch

#### Property

```typescript
textToSpeechSettings: {
    speechPitch: number = 1  // Range: 0 (lowest) to 2 (highest)
}
```

Controls the pitch of the synthesized voice.

#### Example

```typescript
textToSpeechSettings: {
    speechPitch: 1.2  // Slightly higher pitch
}
```

---

### Speech Rate

#### Property

```typescript
textToSpeechSettings: {
    speechRate: number = 1  // Range: 0.1 (slowest) to 10 (fastest)
}
```

Controls how fast the response is read aloud.

#### Example

```typescript
textToSpeechSettings: {
    speechRate: 0.9  // Slightly slower for clarity
}
```

---

### Volume

#### Property

```typescript
textToSpeechSettings: {
    volume: number = 1  // Range: 0 (silent) to 1 (loudest)
}
```

Controls the playback volume of the spoken response.

#### Example

```typescript
textToSpeechSettings: {
    volume: 0.8
}
```

---

### Voice

#### Property

```typescript
textToSpeechSettings: {
    voice: string = ''  // Name of a browser-available SpeechSynthesisVoice
}
```

Selects a specific synthesis voice by name, from the voices exposed by the browser's `speechSynthesis.getVoices()`. Defaults to the browser's default voice when not specified.

#### Example

```typescript
textToSpeechSettings: {
    voice: 'Google US English'
}
```

> **Note:** Available voice names differ across browsers and operating systems. Query `window.speechSynthesis.getVoices()` at runtime to build a valid list for the current environment.

---

### Input Text

#### Property

```typescript
textToSpeechSettings: {
    inputText: string = ''  // Overrides the response text that is read aloud
}
```

By default, clicking the `e-assist-audio` toolbar item reads the corresponding response text. Use `inputText` to override what gets spoken — for example, to read a shortened or reformatted version of the response instead of the raw markdown/HTML content.

#### Example

```typescript
textToSpeechSettings: {
    inputText: 'Here is a summary of the response.'
}
```

**Use case:** Skip reading markdown syntax, code blocks, or links aloud by supplying a cleaned, speech-friendly version of the response text.

---

## Complete Example

### Full Configuration with Azure OpenAI Streaming

```typescript
import { AIAssistView, ToolbarItemClickedEventArgs, PromptRequestEventArgs } from '@syncfusion/ej2-interactive-chat';
import marked from 'marked';

const azureOpenAIApiKey = 'Your_AzureOpenAIApiKey'; // replace your key
const azureOpenAIEndpoint = 'Your_AzureOpenAIEndpoint'; // replace your endpoint
const azureOpenAIApiVersion = 'Your_AzureOpenAIApiVersion'; // replace to match your resource
const azureDeploymentName = 'Your_AzureDeploymentName'; // your Azure OpenAI deployment name
let stopStreaming = false;

// Initialize AI AssistView
let aiAssistView = new AIAssistView({
    toolbarSettings: {
        items: [{ iconCss: 'e-icons e-refresh', align: 'Right' }],
        itemClicked: toolbarItemClicked
    },
    responseToolbarSettings: {
        items: [
            { type: 'Button', iconCss: 'e-icons e-assist-copy', tooltip: 'Copy' },
            { type: 'Button', iconCss: 'e-icons e-assist-audio', tooltip: 'Read Aloud' },
            { type: 'Button', iconCss: 'e-icons e-assist-like', tooltip: 'Like' },
            { type: 'Button', iconCss: 'e-icons e-assist-dislike', tooltip: 'Need Improvement' }
        ]
    },
    bannerTemplate: "#bannerContent",
    promptRequest: onPromptRequest,
    stopRespondingClick: handleStopResponse
});

// Handles toolbar item clicks, such as clearing the conversation on refresh
function toolbarItemClicked(args: ToolbarItemClickedEventArgs) {
    if (args.item.iconCss === 'e-icons e-refresh') {
        aiAssistView.prompts = [];
        stopStreaming = true; // Ensure streaming is stopped on refresh
    }
}

// Streams the AI response character by character to create a typing effect
async function streamResponse(response: string) {
    let lastResponse = "";
    const responseUpdateRate = 10;
    let i = 0;
    const responseLength = response.length;
    while (i < responseLength && !stopStreaming) {
        lastResponse += response[i];
        i++;
        if (i % responseUpdateRate === 0 || i === responseLength) {
            const htmlResponse = marked.parse(lastResponse);
            aiAssistView.addPromptResponse(htmlResponse, i === responseLength);
            aiAssistView.scrollToBottom();
        }
        await new Promise(resolve => setTimeout(resolve, 15)); // Delay before the next chunk
    }
}

// Handles prompt requests by sending them to the Azure OpenAI API and streaming the response
function onPromptRequest(args: PromptRequestEventArgs) {
    const url =
        azureOpenAIEndpoint.replace(/\/$/, '') +
        `/openai/deployments/${encodeURIComponent(azureDeploymentName)}/chat/completions` +
        `?api-version=${encodeURIComponent(azureOpenAIApiVersion)}`;

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: azureOpenAIApiKey
        },
        body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [{ role: 'user', content: args.prompt }],
            max_tokens: 150,
            stream: false
        })
    })
        .then(response => response.json())
        .then(reply => {
            const responseText = reply.choices[0].message.content.trim() || 'No response received.';
            stopStreaming = false;
            streamResponse(responseText);
        })
        .catch((error: unknown) => {
            aiAssistView.addPromptResponse('⚠️ Something went wrong while connecting to the AI service. Please check your API key, Deployment model, endpoint or try again later.', true);
            stopStreaming = true;
        });
}

// Stops the ongoing streaming response
function handleStopResponse() {
    stopStreaming = true;
}

// Render AI AssistView
aiAssistView.appendTo('#aiAssistView');
```

**Use cases:**
- Read AI responses aloud for accessibility (screen-reader alternative, visually impaired users)
- Hands-free consumption of AI answers while multitasking
- Combine with streaming AI integrations (OpenAI, Azure OpenAI) so freshly generated responses can be read aloud immediately

---

## Browser Compatibility

The Web Speech API's synthesis interface has broad but uneven browser support:

**Supported Browsers:**
- Chrome/Edge (Chromium): Full support
- Safari: Full support
- Firefox: Partial support (voice availability varies)

**Not Supported:**
- Internet Explorer
- Older browser versions

**Recommendations:**
- Feature detection before enabling
- Provide a fallback (e.g., hide or disable the `e-assist-audio` item) when unsupported
- Test available voices per-browser, since `voice` names are not standardized across platforms

### Feature Detection

```typescript
if ('speechSynthesis' in window) {
    // Text-to-Speech supported
} else {
    console.warn('Speech synthesis not supported in this browser');
    // Hide or disable the Read Aloud toolbar item
}
```

---

## Summary

**Key Properties:**
- `textToSpeechSettings.language`: Speech synthesis language/locale
- `textToSpeechSettings.speechPitch`: Voice pitch (0–2)
- `textToSpeechSettings.speechRate`: Speech playback rate (0.1–10)
- `textToSpeechSettings.volume`: Playback volume (0–1)
- `textToSpeechSettings.voice`: Named synthesis voice
- `textToSpeechSettings.inputText`: Overrides the text read aloud

**Enabling Control:**
- Add `e-assist-audio` to `responseToolbarSettings.items` to show the Read Aloud button

**Requirements:**
- Browser support for `SpeechSynthesisUtterance`
- `e-assist-audio` response toolbar item configured

