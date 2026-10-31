# Speech-to-Text Integration

## Table of Contents
- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [SpeechToTextSettingsModel Interface](#speechtotextsettingsmodel-interface)
- [Enable Speech-to-Text](#enable-speech-to-text)
- [Configure Speech Recognition Language](#configure-speech-recognition-language)
- [Configure Speech Button Settings](#configure-speech-button-settings)
- [Enable Interim Results](#enable-interim-results)
- [Configure Tooltip Settings](#configure-tooltip-settings)
- [Speech-to-Text Events](#speech-to-text-events)
- [Browser Compatibility](#browser-compatibility)
- [Complete Examples](#complete-examples)
- [Troubleshooting](#troubleshooting)

## Overview

The Inline AI Assist component integrates **Speech-to-Text** functionality through the browser's [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API). This enables the conversion of spoken words into text using the device's microphone, allowing users to dictate prompts via voice input.

The feature is configured through the `speechToTextSettings` property and emits dedicated events for the recognition lifecycle.

## Prerequisites

Before integrating Speech-to-Text, ensure the following:

1. The Syncfusion Inline AI Assist component is properly set up in your Vue application.
2. The component is integrated with an AI service such as [Azure OpenAI](https://azure.microsoft.com/en-us/products/ai-foundry/models/openai/) to process the generated text.
3. The host browser supports the [Speech Recognition API](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition) — see [Browser Compatibility](#browser-compatibility).

## SpeechToTextSettingsModel Interface

The `speechToTextSettings` property accepts a `SpeechToTextSettingsModel` object.

### Interface Structure

| Property | Type | Description |
|----------|------|-------------|
| `enable` | boolean | Activates the speech-to-text feature on the prompt input. Default is `false`. |
| `lang` | string | BCP-47 language code for the speech recognition engine (e.g., `en-US`, `es-ES`, `fr-FR`). Defaults to the browser's language. |
| `allowInterimResults` | boolean | When `true`, returns interim (partial) transcripts as the user speaks. Default is `false`. |
| `buttonSettings` | `SpeechButtonSettingsModel` | Customizes the microphone button text and icons for idle and recording states. |
| `tooltipSettings` | `TooltipSettingsModel` | Configures the tooltips shown when hovering the microphone button. |

### SpeechButtonSettingsModel

| Property | Type | Description |
|----------|------|-------------|
| `content` | string | Text shown on the button when idle (not recording). |
| `stopContent` | string | Text shown on the button while recording. |
| `iconCss` | string | Icon CSS class for the idle state (e.g., `e-icons e-microphone`). |
| `stopIconCss` | string | Icon CSS class for the recording state (e.g., `e-icons e-microphone-off`). |

### Speech-to-Text Events

| Event | Triggered when |
|-------|----------------|
| `onStart` | Recognition starts (user activates the microphone). |
| `onStop` | Recognition stops (user deactivates the microphone or it times out). |
| `transcriptChanged` | The transcript updates (interim or final). |
| `onError` | A recognition error occurs. |

## Enable Speech-to-Text

Set `speechToTextSettings.enable` to `true` to add a microphone button to the prompt input. Clicking the button starts and stops voice capture, and the recognized text is inserted into the prompt editor.

**Composition API (~/src/App.vue)**

```vue
<template>
    <div id="container" style="height: 350px; width: 650px; margin: 0 auto;">
        <br />
        <div class="toolbar-row">
            <button id="summarizeBtn" @click="showPopup">Summarize</button>
            <div id="editableText" contenteditable="true">Select text and click Summarize</div>
        </div>

        <ejs-inlineaiassist popup-width="500px"
            :relate-to="'#summarizeBtn'"
            :prompt-request="onPromptRequest"
            :response-settings="responseSettings"
            :speech-to-text-settings="speechToTextSettings"
            ref="inlineAiAssist">
        </ejs-inlineaiassist>
    </div>
</template>

<script setup>
import { InlineAIAssistComponent as EjsInlineaiassist } from '@syncfusion/ej2-vue-interactive-chat';
import { enableRipple } from '@syncfusion/ej2-base';
import { ref, reactive, onMounted } from 'vue';

enableRipple(true);

const inlineAiAssist = ref(null);

const responseSettings = reactive({
    itemSelect: (args) => {
        const label = args && args.command && args.command.label ? args.command.label : '';
        if (label === 'Accept') {
            const editable = document.getElementById('editableText');
            if (editable && inlineAiAssist.value && inlineAiAssist.value.prompts) {
                const prompts = inlineAiAssist.value.prompts;
                const last = prompts && prompts.length ? prompts[prompts.length - 1] : null;
                if (last && last.response) {
                    editable.innerHTML = '<p>' + last.response + '</p>';
                }
            }
            inlineAiAssist.value.hidePopup();
        } else if (label === 'Discard') {
            inlineAiAssist.value.hidePopup();
        }
    }
});

const speechToTextSettings = reactive({
    enable: true
});

const onPromptRequest = () => {
    setTimeout(() => {
        const defaultResponse = 'For real-time prompt processing, connect the Inline AI Assist component to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
        inlineAiAssist.value.addResponse(defaultResponse);
    }, 1000);
};

const showPopup = () => {
    if (inlineAiAssist.value && inlineAiAssist.value.showPopup) {
        inlineAiAssist.value.showPopup();
    }
};

onMounted(() => {
    if (inlineAiAssist.value && inlineAiAssist.value.showPopup) {
        inlineAiAssist.value.showPopup();
    }
});
</script>

<style>
@import "../node_modules/@syncfusion/ej2-tailwind3-theme/styles/inline-ai-assist/index.css";
</style>
```

**Options API (~/src/App.vue)**

```vue
<template>
    <div id="container" style="height: 350px; width: 650px; margin: 0 auto;">
        <br />
        <div class="toolbar-row">
            <button id="summarizeBtn" @click="showPopup">Summarize</button>
            <div id="editableText" contenteditable="true">Select text and click Summarize</div>
        </div>

        <ejs-inlineaiassist id="defaultInlineAssist"
            popup-width="500px"
            :relate-to="'#summarizeBtn'"
            :prompt-request="onPromptRequest"
            :response-settings="responseSettings"
            :speech-to-text-settings="speechToTextSettings"
            ref="defaultInlineAssist">
        </ejs-inlineaiassist>
    </div>
</template>

<script>
import { InlineAIAssistComponent } from '@syncfusion/ej2-vue-interactive-chat';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

export default {
    components: { 'ejs-inlineaiassist': InlineAIAssistComponent },
    data() {
        return {
            responseSettings: {
                itemSelect: this.onResponseItemSelect
            },
            speechToTextSettings: {
                enable: true
            }
        };
    },
    methods: {
        onPromptRequest() {
            setTimeout(() => {
                const defaultResponse = 'For real-time prompt processing, connect the Inline AI Assist component to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
                if (this.$refs.defaultInlineAssist && this.$refs.defaultInlineAssist.addResponse) {
                    this.$refs.defaultInlineAssist.addResponse(defaultResponse);
                }
            }, 1000);
        },
        onResponseItemSelect(args) {
            const label = args && args.command && args.command.label ? args.command.label : '';
            if (label === 'Accept') {
                const editable = document.getElementById('editableText');
                if (editable && this.$refs.defaultInlineAssist && this.$refs.defaultInlineAssist.prompts) {
                    const prompts = this.$refs.defaultInlineAssist.prompts;
                    const last = prompts && prompts.length ? prompts[prompts.length - 1] : null;
                    if (last && last.response) {
                        editable.innerHTML = '<p>' + last.response + '</p>';
                    }
                }
                this.$refs.defaultInlineAssist.hidePopup();
            } else if (label === 'Discard') {
                this.$refs.defaultInlineAssist.hidePopup();
            }
        },
        showPopup() {
            if (this.$refs.defaultInlineAssist && this.$refs.defaultInlineAssist.showPopup) {
                this.$refs.defaultInlineAssist.showPopup();
            }
        }
    },
    mounted() {
        if (this.$refs.defaultInlineAssist && this.$refs.defaultInlineAssist.showPopup) {
            this.$refs.defaultInlineAssist.showPopup();
        }
    }
};
</script>

<style>
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/inline-ai-assist/index.css";
</style>
```

## Configure Speech Recognition Language

The `lang` property sets the BCP-47 language code used by the speech recognition engine. By default, the engine uses the browser's language. Specify a custom language to ensure the engine transcribes speech in the desired language accurately (e.g., `en-US`, `es-ES`, `fr-FR`, `de-DE`, `ja-JP`).

```javascript
const speechToTextSettings = {
    enable: true,
    lang: 'en-US'
};
```

## Configure Speech Button Settings

The `buttonSettings` property customizes the microphone button's text and icons for the idle and recording states. Use this to align the UI with your design system and give users clear visual feedback.

| Sub-property | Purpose |
|--------------|---------|
| `content` | Text shown when idle (before recording starts) |
| `stopContent` | Text shown while recording is active |
| `iconCss` | Icon CSS class for the idle state |
| `stopIconCss` | Icon CSS class for the recording state |

```javascript
const speechToTextSettings = {
    enable: true,
    buttonSettings: {
        content: 'Start Recording',
        stopContent: 'Stop Recording',
        iconCss: 'e-icons e-microphone',
        stopIconCss: 'e-icons e-microphone-off'
    }
};
```

## Enable Interim Results

The `allowInterimResults` property enables real-time transcription as the user speaks. When `true`, the speech recognition engine returns partial (interim) transcripts that update continuously until the final transcript is produced. This provides immediate feedback to the user.

| Value | Behavior |
|-------|----------|
| `false` (default) | Transcript is updated only when recognition produces a final result. |
| `true` | Transcript updates in real time as the user speaks, including partial results. |

```javascript
const speechToTextSettings = {
    enable: true,
    allowInterimResults: true
};
```

### Combined Example: Language, Button, and Interim Results

**Composition API (~/src/App.vue)**

```vue
<template>
    <div id="container" style="height: 350px; width: 650px; margin: 0 auto;">
        <br />
        <div class="toolbar-row">
            <button id="summarizeBtn" @click="showPopup">Summarize</button>
            <div id="editableText" contenteditable="true">Select text and click Summarize</div>
        </div>

        <ejs-inlineaiassist popup-width="500px"
            :relate-to="'#summarizeBtn'"
            :prompt-request="onPromptRequest"
            :response-settings="responseSettings"
            :speech-to-text-settings="speechToTextSettings"
            ref="inlineAiAssist">
        </ejs-inlineaiassist>
    </div>
</template>

<script setup>
import { InlineAIAssistComponent as EjsInlineaiassist } from '@syncfusion/ej2-vue-interactive-chat';
import { enableRipple } from '@syncfusion/ej2-base';
import { ref, reactive, onMounted } from 'vue';

enableRipple(true);

const inlineAiAssist = ref(null);

const responseSettings = reactive({
    itemSelect: (args) => {
        const label = args && args.command && args.command.label ? args.command.label : '';
        if (label === 'Accept') {
            const editable = document.getElementById('editableText');
            if (editable && inlineAiAssist.value && inlineAiAssist.value.prompts) {
                const prompts = inlineAiAssist.value.prompts;
                const last = prompts && prompts.length ? prompts[prompts.length - 1] : null;
                if (last && last.response) {
                    editable.innerHTML = '<p>' + last.response + '</p>';
                }
            }
            inlineAiAssist.value.hidePopup();
        } else if (label === 'Discard') {
            inlineAiAssist.value.hidePopup();
        }
    }
});

const speechToTextSettings = reactive({
    enable: true,
    lang: 'en-US',
    allowInterimResults: true,
    buttonSettings: {
        content: 'Start Recording',
        stopContent: 'Stop Recording',
        iconCss: 'e-icons e-microphone',
        stopIconCss: 'e-icons e-microphone-off'
    }
});

const onPromptRequest = () => {
    setTimeout(() => {
        const defaultResponse = 'For real-time prompt processing, connect the Inline AI Assist component to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
        inlineAiAssist.value.addResponse(defaultResponse);
    }, 1000);
};

const showPopup = () => {
    if (inlineAiAssist.value && inlineAiAssist.value.showPopup) {
        inlineAiAssist.value.showPopup();
    }
};

onMounted(() => {
    if (inlineAiAssist.value && inlineAiAssist.value.showPopup) {
        inlineAiAssist.value.showPopup();
    }
});
</script>

<style>
@import "../node_modules/@syncfusion/ej2-tailwind3-theme/styles/inline-ai-assist/index.css";
</style>
```

**Options API (~/src/App.vue)**

```vue
<template>
    <div id="container" style="height: 350px; width: 650px; margin: 0 auto;">
        <br />
        <div class="toolbar-row">
            <button id="summarizeBtn" @click="showPopup">Summarize</button>
            <div id="editableText" contenteditable="true">Select text and click Summarize</div>
        </div>

        <ejs-inlineaiassist id="defaultInlineAssist"
            popup-width="500px"
            :relate-to="'#summarizeBtn'"
            :prompt-request="onPromptRequest"
            :response-settings="responseSettings"
            :speech-to-text-settings="speechToTextSettings"
            ref="defaultInlineAssist">
        </ejs-inlineaiassist>
    </div>
</template>

<script>
import { InlineAIAssistComponent } from '@syncfusion/ej2-vue-interactive-chat';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

export default {
    components: { 'ejs-inlineaiassist': InlineAIAssistComponent },
    data() {
        return {
            responseSettings: {
                itemSelect: this.onResponseItemSelect
            },
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
            }
        };
    },
    methods: {
        onPromptRequest() {
            setTimeout(() => {
                const defaultResponse = 'For real-time prompt processing, connect the Inline AI Assist component to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
                if (this.$refs.defaultInlineAssist && this.$refs.defaultInlineAssist.addResponse) {
                    this.$refs.defaultInlineAssist.addResponse(defaultResponse);
                }
            }, 1000);
        },
        onResponseItemSelect(args) {
            const label = args && args.command && args.command.label ? args.command.label : '';
            if (label === 'Accept') {
                const editable = document.getElementById('editableText');
                if (editable && this.$refs.defaultInlineAssist && this.$refs.defaultInlineAssist.prompts) {
                    const prompts = this.$refs.defaultInlineAssist.prompts;
                    const last = prompts && prompts.length ? prompts[prompts.length - 1] : null;
                    if (last && last.response) {
                        editable.innerHTML = '<p>' + last.response + '</p>';
                    }
                }
                this.$refs.defaultInlineAssist.hidePopup();
            } else if (label === 'Discard') {
                this.$refs.defaultInlineAssist.hidePopup();
            }
        },
        showPopup() {
            if (this.$refs.defaultInlineAssist && this.$refs.defaultInlineAssist.showPopup) {
                this.$refs.defaultInlineAssist.showPopup();
            }
        }
    },
    mounted() {
        if (this.$refs.defaultInlineAssist && this.$refs.defaultInlineAssist.showPopup) {
            this.$refs.defaultInlineAssist.showPopup();
        }
    }
};
</script>

<style>
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/inline-ai-assist/index.css";
</style>
```

## Configure Tooltip Settings

Use `tooltipSettings` to customize the tooltips that appear when hovering the microphone button in idle and recording states. You can also set the tooltip position.

| Sub-property | Purpose |
|--------------|---------|
| `content` | Tooltip text when the button is idle |
| `stopContent` | Tooltip text while the button is recording |
| `position` | Tooltip position (e.g., `TopCenter`, `BottomLeft`) |

**Composition API (~/src/App.vue)**

```vue
<template>
    <div id="container" style="height: 350px; width: 650px; margin: 0 auto;">
        <br />
        <div class="toolbar-row">
            <button id="summarizeBtn" @click="showPopup">Summarize</button>
            <div id="editableText" contenteditable="true">Select text and click Summarize</div>
        </div>

        <ejs-inlineaiassist popup-width="500px"
            :relate-to="'#summarizeBtn'"
            :prompt-request="onPromptRequest"
            :response-settings="responseSettings"
            :speech-to-text-settings="speechToTextSettings"
            ref="inlineAiAssist">
        </ejs-inlineaiassist>
    </div>
</template>

<script setup>
import { InlineAIAssistComponent as EjsInlineaiassist } from '@syncfusion/ej2-vue-interactive-chat';
import { enableRipple } from '@syncfusion/ej2-base';
import { ref, reactive, onMounted } from 'vue';

enableRipple(true);

const inlineAiAssist = ref(null);

const responseSettings = reactive({
    itemSelect: (args) => {
        const label = args && args.command && args.command.label ? args.command.label : '';
        if (label === 'Accept') {
            const editable = document.getElementById('editableText');
            if (editable && inlineAiAssist.value && inlineAiAssist.value.prompts) {
                const prompts = inlineAiAssist.value.prompts;
                const last = prompts && prompts.length ? prompts[prompts.length - 1] : null;
                if (last && last.response) {
                    editable.innerHTML = '<p>' + last.response + '</p>';
                }
            }
            inlineAiAssist.value.hidePopup();
        } else if (label === 'Discard') {
            inlineAiAssist.value.hidePopup();
        }
    }
});

const speechToTextSettings = reactive({
    enable: true,
    tooltipSettings: {
        content: 'Click to start listening',
        stopContent: 'Click to stop listening',
        position: 'TopCenter'
    }
});

const onPromptRequest = () => {
    setTimeout(() => {
        const defaultResponse = 'For real-time prompt processing, connect the Inline AI Assist component to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
        inlineAiAssist.value.addResponse(defaultResponse);
    }, 1000);
};

const showPopup = () => {
    if (inlineAiAssist.value && inlineAiAssist.value.showPopup) {
        inlineAiAssist.value.showPopup();
    }
};

onMounted(() => {
    if (inlineAiAssist.value && inlineAiAssist.value.showPopup) {
        inlineAiAssist.value.showPopup();
    }
});
</script>

<style>
@import "../node_modules/@syncfusion/ej2-tailwind3-theme/styles/inline-ai-assist/index.css";
</style>
```

**Options API (~/src/App.vue)**

```vue
<template>
    <div id="container" style="height: 350px; width: 650px; margin: 0 auto;">
        <br />
        <div class="toolbar-row">
            <button id="summarizeBtn" @click="showPopup">Summarize</button>
            <div id="editableText" contenteditable="true">Select text and click Summarize</div>
        </div>

        <ejs-inlineaiassist id="defaultInlineAssist"
            popup-width="500px"
            :relate-to="'#summarizeBtn'"
            :prompt-request="onPromptRequest"
            :response-settings="responseSettings"
            :speech-to-text-settings="speechToTextSettings"
            ref="defaultInlineAssist">
        </ejs-inlineaiassist>
    </div>
</template>

<script>
import { InlineAIAssistComponent } from '@syncfusion/ej2-vue-interactive-chat';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

export default {
    components: { 'ejs-inlineaiassist': InlineAIAssistComponent },
    data() {
        return {
            responseSettings: {
                itemSelect: this.onResponseItemSelect
            },
            speechToTextSettings: {
                enable: true,
                tooltipSettings: {
                    content: 'Click to start listening',
                    stopContent: 'Click to stop listening',
                    position: 'TopCenter'
                }
            }
        };
    },
    methods: {
        onPromptRequest() {
            setTimeout(() => {
                const defaultResponse = 'For real-time prompt processing, connect the Inline AI Assist component to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
                if (this.$refs.defaultInlineAssist && this.$refs.defaultInlineAssist.addResponse) {
                    this.$refs.defaultInlineAssist.addResponse(defaultResponse);
                }
            }, 1000);
        },
        onResponseItemSelect(args) {
            const label = args && args.command && args.command.label ? args.command.label : '';
            if (label === 'Accept') {
                const editable = document.getElementById('editableText');
                if (editable && this.$refs.defaultInlineAssist && this.$refs.defaultInlineAssist.prompts) {
                    const prompts = this.$refs.defaultInlineAssist.prompts;
                    const last = prompts && prompts.length ? prompts[prompts.length - 1] : null;
                    if (last && last.response) {
                        editable.innerHTML = '<p>' + last.response + '</p>';
                    }
                }
                this.$refs.defaultInlineAssist.hidePopup();
            } else if (label === 'Discard') {
                this.$refs.defaultInlineAssist.hidePopup();
            }
        },
        showPopup() {
            if (this.$refs.defaultInlineAssist && this.$refs.defaultInlineAssist.showPopup) {
                this.$refs.defaultInlineAssist.showPopup();
            }
        }
    },
    mounted() {
        if (this.$refs.defaultInlineAssist && this.$refs.defaultInlineAssist.showPopup) {
            this.$refs.defaultInlineAssist.showPopup();
        }
    }
};
</script>

<style>
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/inline-ai-assist/index.css";
</style>
```

## Speech-to-Text Events

The speech-to-text feature exposes four lifecycle events: `onStart`, `onStop`, `transcriptChanged`, and `onError`. Use them to drive UI state, show feedback, and handle errors gracefully.

| Event | Arguments |
|-------|-----------|
| `onStart` | `args.listeningState` — current listening state (e.g., `Listening`) |
| `onStop` | `args.listeningState` — current listening state after stopping (e.g., `Stopped`) |
| `transcriptChanged` | `args.text` / `args.value` / `args.transcript` — the latest text; `args.isFinal` — whether this is a final result |
| `onError` | `args.error` / `args.errorMessage` — error description |

> See [events-and-methods.md](events-and-methods.md) for full event argument patterns.

**Composition API (~/src/App.vue)**

```vue
<template>
    <div id="container" style="height: 580px; width: 700px; margin: 0 auto;">
        <br />

        <!-- Speech feedback panel -->
        <div class="speech-feedback">
            <div class="status-line">
                <strong>Status:</strong>
                <span :class="['status', isRecording ? 'recording' : 'ready']">
                    {{ recordingStatus }}
                </span>
            </div>
            <div class="transcript-line">
                <strong>Transcript:</strong>
                <span :style="{ fontStyle: transcriptIsFinal ? 'normal' : 'italic' }">
                    {{ transcriptText || 'Waiting for speech input...' }}
                </span>
            </div>
            <div v-if="errorText" class="error-line">
                <strong>Error:</strong> {{ errorText }}
            </div>
        </div>

        <div class="toolbar-row">
            <button id="summarizeBtn" @click="showPopup">Summarize</button>
            <div id="editableText" contenteditable="true">Select text and click Summarize</div>
        </div>

        <ejs-inlineaiassist id="defaultInlineAssist" popup-width="500px"
            :relate-to="'#summarizeBtn'"
            :prompt-request="onPromptRequest"
            :response-settings="responseSettings"
            :speech-to-text-settings="speechToTextSettings"
            ref="inlineAiAssist">
        </ejs-inlineaiassist>
    </div>
</template>

<script setup>
import { InlineAIAssistComponent as EjsInlineaiassist } from '@syncfusion/ej2-vue-interactive-chat';
import { enableRipple } from '@syncfusion/ej2-base';
import { ref, reactive, onMounted } from 'vue';

enableRipple(true);

const inlineAiAssist = ref(null);

const recordingStatus = ref('Ready to record');
const isRecording = ref(false);
const transcriptText = ref('');
const transcriptIsFinal = ref(true);
const errorText = ref('');
const listeningState = ref('Inactive');

let lastTranscript = '';

const responseSettings = reactive({
    itemSelect: (args) => {
        const label = args && args.command && args.command.label ? args.command.label : '';
        if (label === 'Accept') {
            const editable = document.getElementById('editableText');
            if (editable && inlineAiAssist.value && inlineAiAssist.value.prompts) {
                const prompts = inlineAiAssist.value.prompts;
                const last = prompts && prompts.length ? prompts[prompts.length - 1] : null;
                if (last && last.response) {
                    editable.innerHTML = '<p>' + last.response + '</p>';
                }
            }
            inlineAiAssist.value.hidePopup();
        } else if (label === 'Discard') {
            inlineAiAssist.value.hidePopup();
        }
    }
});

// Speech events - declared first so they are available to speechToTextSettings below
function onSpeechStart(args) {
    listeningState.value = (args && args.listeningState) || 'Listening';
    isRecording.value = true;
    recordingStatus.value = 'Recording...';
    errorText.value = '';
    transcriptText.value = 'Listening...';
    transcriptIsFinal.value = false;
}

function onSpeechStop(args) {
    // Stop -> return to starting state immediately
    listeningState.value = (args && args.listeningState) || 'Stopped';
    isRecording.value = false;
    recordingStatus.value = 'Ready to record';
    transcriptIsFinal.value = true;

    if (lastTranscript) {
        transcriptText.value = lastTranscript;
    } else {
        transcriptText.value = '';
    }

    // Clear transient transcript after a short delay so the UI settles
    setTimeout(() => {
        lastTranscript = '';
        transcriptText.value = '';
        transcriptIsFinal.value = true;
        listeningState.value = 'Inactive';
    }, 2200);
}

function onTranscriptChanged(args) {
    const text =
        args.text ||
        args.value ||
        args.transcript ||
        (args.result && args.result.transcript) ||
        '';

    const isFinal =
        args.isFinal || args.final || (args.result && args.result.isFinal) || false;

    if (text) {
        lastTranscript = text;
    }

    transcriptText.value = text;
    transcriptIsFinal.value = isFinal;
}

function onSpeechError(args) {
    listeningState.value = 'Inactive';
    isRecording.value = false;
    recordingStatus.value = 'Ready to record';
    errorText.value = 'Error: ' + ((args && (args.error || args.errorMessage)) || 'Speech recognition failed');
}

const speechToTextSettings = reactive({
    enable: true,
    onStart: onSpeechStart,
    onStop: onSpeechStop,
    transcriptChanged: onTranscriptChanged,
    onError: onSpeechError
});

const onPromptRequest = () => {
    setTimeout(() => {
        const defaultResponse = 'For real-time prompt processing, connect the Inline AI Assist component to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
        if (inlineAiAssist.value && inlineAiAssist.value.addResponse) {
            inlineAiAssist.value.addResponse(defaultResponse);
        }
    }, 1000);
};

const showPopup = () => {
    if (inlineAiAssist.value && inlineAiAssist.value.showPopup) {
        inlineAiAssist.value.showPopup();
    }
};

onMounted(() => {
    if (inlineAiAssist.value && inlineAiAssist.value.showPopup) {
        inlineAiAssist.value.showPopup();
    }
});
</script>
<style>
@import "../node_modules/@syncfusion/ej2-tailwind3-theme/styles/inline-ai-assist/index.css";
</style>
```

**Options API (~/src/App.vue)**

```vue
<template>
    <div id="container" style="height: 580px; width: 700px; margin: 0 auto;">
        <br />

        <!-- Speech feedback -->
        <div class="speech-feedback">
            <div class="status-line">
                <strong>Status:</strong>
                <span :class="['status', isRecording ? 'recording' : 'ready']">
                    {{ recordingStatus }}
                </span>
            </div>
            <div class="transcript-line">
                <strong>Transcript:</strong>
                <span :style="{ fontStyle: transcriptIsFinal ? 'normal' : 'italic' }">
                    {{ transcriptText || 'Waiting for speech input...' }}
                </span>
            </div>
            <div v-if="errorText" class="error-line">
                <strong>Error:</strong> {{ errorText }}
            </div>
        </div>

        <div class="toolbar-row">
            <button id="summarizeBtn" @click="showPopup">Summarize</button>
            <div id="editableText" contenteditable="true">Select text and click Summarize</div>
        </div>

        <ejs-inlineaiassist id="defaultInlineAssist"
            popup-width="500px"
            :relate-to="'#summarizeBtn'"
            :prompt-request="onPromptRequest"
            :response-settings="responseSettings"
            :speech-to-text-settings="speechToTextSettings"
            ref="defaultInlineAssist">
        </ejs-inlineaiassist>
    </div>
</template>

<script>
import { InlineAIAssistComponent } from '@syncfusion/ej2-vue-interactive-chat';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

export default {
    components: { 'ejs-inlineaiassist': InlineAIAssistComponent },
    data() {
        return {
            isRecording: false,
            recordingStatus: 'Ready to record',
            transcriptText: '',
            transcriptIsFinal: true,
            errorText: '',
            listeningState: 'Inactive',
            lastTranscript: '',

            responseSettings: {
                itemSelect: this.onResponseItemSelect
            },

            speechToTextSettings: {
                enable: true,
                onStart: this.onSpeechStart,
                onStop: this.onSpeechStop,
                transcriptChanged: this.onTranscriptChanged,
                onError: this.onSpeechError
            }
        };
    },
    methods: {
        onSpeechStart(args) {
            this.listeningState = (args && args.listeningState) || 'Listening';
            this.isRecording = true;
            this.recordingStatus = 'Recording...';
            this.errorText = '';
            this.transcriptText = 'Listening...';
            this.transcriptIsFinal = false;
        },

        onSpeechStop(args) {
            // Stop -> return to starting state immediately
            this.listeningState = (args && args.listeningState) || 'Stopped';
            this.isRecording = false;
            this.recordingStatus = 'Ready to record';
            this.transcriptIsFinal = true;

            if (this.lastTranscript) {
                this.transcriptText = this.lastTranscript;
            } else {
                this.transcriptText = '';
            }

            // Clear transient transcript after a short delay so the UI settles
            setTimeout(() => {
                this.lastTranscript = '';
                this.transcriptText = '';
                this.transcriptIsFinal = true;
                this.listeningState = 'Inactive';
            }, 2200);
        },

        onTranscriptChanged(args) {
            const text =
                args.text ||
                args.value ||
                args.transcript ||
                (args.result && args.result.transcript) ||
                '';

            const isFinal =
                args.isFinal || args.final || (args.result && args.result.isFinal) || false;

            if (text) this.lastTranscript = text;

            this.transcriptText = text;
            this.transcriptIsFinal = isFinal;
        },

        onSpeechError(args) {
            this.listeningState = 'Inactive';
            this.isRecording = false;
            this.recordingStatus = 'Ready to record';
            this.errorText = 'Error: ' + ((args && (args.error || args.errorMessage)) || 'Speech recognition failed');
        },

        onPromptRequest() {
            setTimeout(() => {
                const defaultResponse = 'For real-time prompt processing, connect the Inline AI Assist component to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
                if (this.$refs.defaultInlineAssist && this.$refs.defaultInlineAssist.addResponse) {
                    this.$refs.defaultInlineAssist.addResponse(defaultResponse);
                }
            }, 1000);
        },

        onResponseItemSelect(args) {
            const label = args && args.command && args.command.label ? args.command.label : '';
            if (label === 'Accept') {
                const editable = document.getElementById('editableText');
                if (editable && this.$refs.defaultInlineAssist && this.$refs.defaultInlineAssist.prompts) {
                    const prompts = this.$refs.defaultInlineAssist.prompts;
                    const last = prompts && prompts.length ? prompts[prompts.length - 1] : null;
                    if (last && last.response) {
                        editable.innerHTML = '<p>' + last.response + '</p>';
                    }
                }
                this.$refs.defaultInlineAssist.hidePopup();
            } else if (label === 'Discard') {
                this.$refs.defaultInlineAssist.hidePopup();
            }
        },

        showPopup() {
            if (this.$refs.defaultInlineAssist && this.$refs.defaultInlineAssist.showPopup) {
                this.$refs.defaultInlineAssist.showPopup();
            }
        }
    },
    mounted() {
        if (this.$refs.defaultInlineAssist && this.$refs.defaultInlineAssist.showPopup) {
            this.$refs.defaultInlineAssist.showPopup();
        }
    }
};
</script>
<style>
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/inline-ai-assist/index.css";
</style>
```

## Browser Compatibility

The Speech-to-Text feature relies on the [Speech Recognition API](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition), which has limited browser support.

| Browser | Support |
|---------|---------|
| Chrome (desktop & Android) | ✅ Supported |
| Edge | ✅ Supported |
| Safari (macOS 14.5+, iOS 14.5+) | ✅ Supported |
| Firefox | ❌ Not supported |
| Opera | ✅ Supported (Chromium-based) |

> Always check for browser support before enabling the feature, and provide a graceful fallback (e.g., a text input only) for unsupported browsers.

## Complete Examples

### Example: Multilingual Voice Input with Live Transcript

```vue
<template>
  <div style="height: 400px; width: 700px; margin: 0 auto;">
    <br />
    <label>
      Language:
      <select v-model="selectedLang">
        <option value="en-US">English (en-US)</option>
        <option value="es-ES">Spanish (es-ES)</option>
        <option value="fr-FR">French (fr-FR)</option>
        <option value="de-DE">German (de-DE)</option>
      </select>
    </label>
    <button @click="showPopup">Open Assistant</button>
    <ejs-inlineaiassist
      relate-to="#btn"
      :speech-to-text-settings="speechToTextSettings"
      :prompt-request="onPromptRequest"
      :response-settings="responseSettings"
      ref="inlineAiAssist">
    </ejs-inlineaiassist>
  </div>
</template>

<script setup>
import { InlineAIAssistComponent as EjsInlineaiassist } from '@syncfusion/ej2-vue-interactive-chat';
import { computed, ref } from 'vue';

const inlineAiAssist = ref(null);
const selectedLang = ref('en-US');

const speechToTextSettings = computed(() => ({
  enable: true,
  lang: selectedLang.value,
  allowInterimResults: true,
  onStart: (args) => console.log('Listening started:', args),
  onStop: (args) => console.log('Listening stopped:', args),
  transcriptChanged: (args) => console.log('Transcript:', args.text, 'isFinal:', args.isFinal),
  onError: (args) => console.error('Speech error:', args.error || args.errorMessage)
}));

const responseSettings = {
  itemSelect: (args) => {
    if (args.command.label === 'Accept') {
      inlineAiAssist.value?.hidePopup();
    }
  }
};

const onPromptRequest = () => {
  setTimeout(() => {
    inlineAiAssist.value?.addResponse('Response for voice input');
  }, 1000);
};

const showPopup = () => {
  inlineAiAssist.value?.showPopup();
};
</script>
```

## Troubleshooting

### Issue: Microphone button not appearing
- **Solution:** Confirm `speechToTextSettings.enable` is set to `true`.
- **Check:** Ensure the `speechToTextSettings` object is bound to the component via `:speech-to-text-settings`.

### Issue: Clicking the microphone does nothing
- **Solution:** The browser may not support the Speech Recognition API. Verify the browser is on the supported list.
- **Check:** Ensure the page is served over `https://` or `localhost` — microphone access requires a secure context.

### Issue: Recognition errors immediately after start
- **Solution:** Grant microphone permission when prompted by the browser.
- **Check:** Inspect the `onError` event payload (`args.error` / `args.errorMessage`) for details.

### Issue: Transcript does not update
- **Solution:** If you only want final results, set `allowInterimResults: false`. If you want live updates, set it to `true` and read `args.text` in the `transcriptChanged` handler.

### Issue: Wrong language transcription
- **Solution:** Set the `lang` property to a BCP-47 language code matching the user (e.g., `en-US`, `es-ES`).
