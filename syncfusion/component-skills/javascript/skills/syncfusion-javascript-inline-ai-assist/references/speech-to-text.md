# Speech to Text

## Table of Contents
- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Enable Built-in Speech-to-Text](#enable-built-in-speech-to-text)
- [Configure Speech Recognition Language](#configure-speech-recognition-language)
- [Configure Speech Button Settings](#configure-speech-button-settings)
- [Enable Interim Results](#enable-interim-results)
- [Configure Tooltip Settings](#configure-tooltip-settings)
- [Speech-to-Text Events](#speech-to-text-events)
- [Browser Compatibility](#browser-compatibility)

This guide covers speech-to-text functionality in the Inline AI Assist component using the browser's Web Speech API.

---

## Overview

The Syncfusion TypeScript Inline AI Assist control integrates `Speech-to-Text` functionality through the browser's [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API). This enables the conversion of spoken words into text using the device's microphone, allowing users to provide voice input directly in the Inline AI Assist prompt area.

When content is selected, the recognized speech can be used as a prompt along with the selected content to provide contextual AI assistance. The generated response is displayed inline, where users can review and either accept or discard the suggestion.

---

## Prerequisites

Before integrating `Speech-to-Text`, ensure the following:

1. The Syncfusion Inline AI Assist control is properly set up in your TypeScript application.
2. The Inline AI Assist control is integrated with [Azure OpenAI](https://azure.microsoft.com/en-us/products/ai-foundry/models/openai).

---

## Enable Built-in Speech-to-Text

You can enable speech-to-text support using the [speechToTextSettings](../api/inline-ai-assist#speechtotextsettings) property. Set the `enable` property to `true` within the `speechToTextSettings` configuration to activate this feature.

Once enabled, a microphone button appears in the Inline AI Assist prompt area. The recognized speech is converted into prompt text and passed through the `promptRequest` event when the prompt is submitted.

```typescript
import { InlineAIAssist, InlinePromptRequestEventArgs } from '@syncfusion/ej2-interactive-chat';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

// Initializes the Inline AI Assist control with built-in speech-to-text support
let inlineAIAssist: InlineAIAssist = new InlineAIAssist({
    relateTo: '#summarizeBtn',
    // Enables the built-in speech-to-text functionality using Web Speech API
    speechToTextSettings: {
        enable: true
    },
    // Triggered when a prompt is submitted from voice input
    promptRequest: (args: InlinePromptRequestEventArgs) => {
        setTimeout(() => {
            // Default response displayed in the AI Assist popup
            let defaultResponse: string = 'For real-time prompt processing, connect the Inline AI Assist component to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
            inlineAIAssist.addResponse(defaultResponse);
        }, 1000);
    }
});

// Render initialized Inline AI Assist.
inlineAIAssist.appendTo('#stt');
// Opens the Inline AI Assist popup when the Summarize button is clicked
const summarizeBtn: HTMLElement = document.querySelector('#summarizeBtn') as HTMLElement;
if (summarizeBtn) {
    summarizeBtn.addEventListener('click', () => {
        // Refreshes data bindings before showing the popup
        inlineAIAssist.dataBind();
        inlineAIAssist.showPopup();
    });
}
```

---

## Configure Speech Recognition Language

The [lang](../api/inline-ai-assist#speechtotextsettings) property allows you to set the language code for speech recognition. By default, it uses the browser's language settings, but you can specify a custom language code, such as `en-US`, `es-ES`, or `fr-FR`. This ensures that the speech recognition engine recognizes and transcribes speech in the specified language accurately.

---

## Configure Speech Button Settings

The [buttonSettings](../api/inline-ai-assist#speechtotextsettings) property lets you customize the microphone button's appearance and text content by configuring the `content` property for the text displayed when idle, `stopContent` for the text displayed while recording, `iconCss` for the icon shown when idle, and `stopIconCss` for the icon shown while recording. This allows you to customize the user interface and provide clear visual feedback while speech recognition is active.

---

## Enable Interim Results

The [allowInterimResults](../api/inline-ai-assist#speechtotextsettings) property enables real-time transcription while the user is speaking. When set to `true`, the speech recognition engine returns interim transcripts as it processes the audio. This provides immediate feedback by displaying partially recognized speech before the final transcript is generated.

This example demonstrates how to configure Inline AI Assist with the speech recognition language, microphone button settings, and interim results:

```typescript
import { InlineAIAssist, InlinePromptRequestEventArgs } from '@syncfusion/ej2-interactive-chat';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

// Initializes the Inline AI Assist control with speech recognition language, button settings, and interim results
let inlineAIAssist: InlineAIAssist = new InlineAIAssist({
    relateTo: '#summarizeBtn',
    // Configures language, interim results, and custom microphone button labels and icons
    speechToTextSettings: {
        enable: true,
        lang: 'en-US',
        allowInterimResults: true,
        buttonSettings: {
            content: 'Start Recording',
            stopContent: 'Stop Recording',
            iconCss: 'e-icons e-microphone',
            stopIconCss: 'e-icons e-microphone-off'
        }
    },
    // Triggered once the recognized voice prompt is submitted
    promptRequest: (args: InlinePromptRequestEventArgs) => {
        setTimeout(() => {
            // Default response for the configured speech recognition scenario
            let defaultResponse: string = 'For real-time prompt processing, connect the Inline AI Assist component to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
            inlineAIAssist.addResponse(defaultResponse);
        }, 1000);
    }
});

// Render initialized Inline AI Assist.
inlineAIAssist.appendTo('#speech-configuration');
// Opens the Inline AI Assist popup on Summarize button click
const summarizeBtn: HTMLElement = document.querySelector('#summarizeBtn') as HTMLElement;
if (summarizeBtn) {
    summarizeBtn.addEventListener('click', () => {
        // Refreshes the control state before displaying the popup
        inlineAIAssist.dataBind();
        inlineAIAssist.showPopup();
    });
}
```

---

## Configure Tooltip Settings

You can customize the tooltips displayed for the microphone button using the [tooltipSettings](../api/inline-ai-assist#speechtotextsettings) property. The tooltip can provide different information based on whether speech recognition is idle or active.

```typescript
import { InlineAIAssist, InlinePromptRequestEventArgs } from '@syncfusion/ej2-interactive-chat';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

let isAccepted: boolean = false;

// Initializes the Inline AI Assist control with speech-to-text tooltip settings
let inlineAIAssist: InlineAIAssist = new InlineAIAssist({
    relateTo: '#summarizeBtn',
    // Displays AI responses inline for Accept/Discard review
    responseMode: 'Inline',
    // Custom tooltips shown for the microphone button while idle and recording
    speechToTextSettings: {
        enable: true,
        tooltipSettings: {
            content: 'Click to start recording',
            stopContent: 'Click to stop recording'
        }
    },
    // Triggered when the voice prompt is submitted
    promptRequest: (args: InlinePromptRequestEventArgs) => {
        setTimeout(() => {
            let defaultResponse: string = 'For real-time prompt processing, connect the Inline AI Assist component to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
            inlineAIAssist.addResponse(defaultResponse, true);
        }, 1000);
    },
    // Handles Accept and Discard buttons on the inline response
    responseSettings: {
        itemSelect: (args: any): void => {
            if (args.command.label === 'Accept') {
                isAccepted = true;
                const editableText: HTMLElement | null = document.getElementById('editableText');
                if (editableText) {
                    editableText.innerHTML = 'For real-time prompt processing, connect the Inline AI Assist component to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
                }
                inlineAIAssist.hidePopup();
            } else if (args.command.label === 'Discard') {
                isAccepted = false;
                inlineAIAssist.hidePopup();
            }
        }
    }
});

// Render initialized Inline AI Assist.
inlineAIAssist.appendTo('#tooltipSettings');
// Opens the popup on Summarize button click
const summarizeBtn: HTMLElement = document.querySelector('#summarizeBtn') as HTMLElement;
if (summarizeBtn) {
    summarizeBtn.addEventListener('click', () => {
        inlineAIAssist.dataBind();
        inlineAIAssist.showPopup();
    });
}
```

---

## Speech-to-Text Events

The speech-to-text functionality provides the `onStart`, `onStop`, `transcriptChanged`, and `onError` events. The `onStart` event is triggered when speech recognition starts, `onStop` is triggered when recognition stops, `transcriptChanged` is triggered when the recognized transcript is updated, and `onError` is triggered when an error occurs during speech recognition.

The recognized transcript is updated in the Inline AI Assist prompt area. When the prompt is submitted, both typed and speech-recognized input are available through the `prompt` property of the `promptRequest` event arguments.

```typescript
import { InlineAIAssist, InlinePromptRequestEventArgs } from '@syncfusion/ej2-interactive-chat';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

let lastTranscript: string = '';
let isAccepted: boolean = false;

// Updates the status panel when speech recognition begins
function onSpeechStart(args: any): void {
    const recordingStatus: HTMLElement | null = document.getElementById('recordingStatus');
    if (recordingStatus) {
        recordingStatus.textContent = 'Recording...';
        recordingStatus.className = 'status-indicator recording';
    }
    const errorMessage: HTMLElement | null = document.getElementById('errorMessage');
    if (errorMessage) {
        errorMessage.style.display = 'none';
    }
}

// Resets the status and displays the captured transcript after recognition stops
function onSpeechStop(args: any): void {
    const recordingStatus: HTMLElement | null = document.getElementById('recordingStatus');
    if (recordingStatus) {
        recordingStatus.textContent = 'Ready to record';
        recordingStatus.className = 'status-indicator ready';
    }
    const transcriptDisplay: HTMLElement | null = document.getElementById('transcriptDisplay');
    if (transcriptDisplay && lastTranscript) {
        transcriptDisplay.textContent = lastTranscript;
        transcriptDisplay.style.fontStyle = 'normal';
    }
    setTimeout(() => {
        lastTranscript = '';
        if (transcriptDisplay) {
            transcriptDisplay.textContent = 'Waiting for speech input...';
        }
    }, 2000);
}

// Streams interim and final transcripts to the status panel during recognition
function onTranscriptChanged(args: any): void {
    const currentTranscript: string = args.text || args.value || args.transcript || (args.result && args.result.transcript) || '';
    const isFinal: boolean = args.isFinal || args.final || (args.result && args.result.isFinal) || false;

    if (currentTranscript) {
        lastTranscript = currentTranscript;
    }

    const transcriptDisplay: HTMLElement | null = document.getElementById('transcriptDisplay');
    if (transcriptDisplay) {
        transcriptDisplay.textContent = currentTranscript;
        transcriptDisplay.style.fontStyle = isFinal ? 'normal' : 'italic';
    }
}

// Surfaces recognition errors in the status panel and resets the recording state
function onSpeechError(args: any): void {
    const errorMessage: HTMLElement | null = document.getElementById('errorMessage');
    if (errorMessage) {
        const errorText: HTMLElement | null = errorMessage.querySelector('.error-text');
        if (errorText) {
            errorText.textContent = 'Error: ' + (args.error || 'Speech recognition error occurred');
        }
        errorMessage.style.display = 'block';
    }
    const recordingStatus: HTMLElement | null = document.getElementById('recordingStatus');
    if (recordingStatus) {
        recordingStatus.textContent = 'Ready to record';
        recordingStatus.className = 'status-indicator ready';
    }
}

// Initializes the Inline AI Assist control with speech-to-text events
let inlineAIAssist: InlineAIAssist = new InlineAIAssist({
    relateTo: '#summarizeBtn',
    // Displays AI responses inline so users can Accept or Discard them
    responseMode: 'Inline',
    // Wires up all speech recognition lifecycle event handlers
    speechToTextSettings: {
        enable: true,
        onStart: onSpeechStart,
        onStop: onSpeechStop,
        transcriptChanged: onTranscriptChanged,
        onError: onSpeechError
    },
    // Triggered when the recognized voice prompt is submitted
    promptRequest: (args: InlinePromptRequestEventArgs) => {
        setTimeout(() => {
            // Default placeholder response shown after the thinking delay
            let defaultResponse: string = 'For real-time prompt processing, connect the Inline AI Assist component to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
            inlineAIAssist.addResponse(defaultResponse, true);
        }, 1000);
    },
    // Handles Accept and Discard buttons on the inline response
    responseSettings: {
        itemSelect: (args: any): void => {
            if (args.command.label === 'Accept') {
                isAccepted = true;
                const editableText: HTMLElement | null = document.getElementById('editableText');
                if (editableText) {
                    editableText.innerHTML = 'For real-time prompt processing, connect the Inline AI Assist component to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
                }
                inlineAIAssist.hidePopup();
            } else if (args.command.label === 'Discard') {
                isAccepted = false;
                inlineAIAssist.hidePopup();
            }
        }
    }
});

// Render initialized Inline AI Assist.
inlineAIAssist.appendTo('#speechEvents');
// Opens the popup on Summarize button click
const summarizeBtn: HTMLElement = document.querySelector('#summarizeBtn') as HTMLElement;
if (summarizeBtn) {
    summarizeBtn.addEventListener('click', () => {
        // Refreshes the control state before displaying the popup
        inlineAIAssist.dataBind();
        inlineAIAssist.showPopup();
    });
}
```

---

## Browser Compatibility

The speech-to-text functionality in Inline AI Assist relies on the browser's [Speech Recognition API](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition), which has limited browser support. Refer to the [Browser Compatibility](https://ej2.syncfusion.com/javascript/documentation/speech-to-text/speech-recognition#browser-support) section for detailed information.

The browser may request permission to access the device's microphone when speech recognition starts. Speech-to-text functionality is available only when microphone permission is granted and the browser supports the Speech Recognition API.
