# Events and Methods

## Table of Contents
- [Overview](#overview)
- [Events](#events)
  - [created Event](#created-event)
  - [promptRequest Event](#promptrequest-event)
  - [open Event](#open-event)
  - [close Event](#close-event)
  - [Speech-to-Text Events](#speech-to-text-events)
  - [Additional Events](#additional-events)
- [Public Methods](#public-methods)
  - [addResponse() Method](#addresponse-method)
  - [showPopup() Method](#showpopup-method)
  - [hidePopup() Method](#hidepopup-method)
  - [getPrompt() Method](#getprompt-method)
  - [showCommandPopup() Method](#showcommandpopup-method)
  - [hideCommandPopup() Method](#hidecommandpopup-method)
  - [Additional Methods](#additional-methods)
- [Complete Examples](#complete-examples)
- [Troubleshooting](#troubleshooting)

## Overview

The Inline AI Assist component provides lifecycle events and public methods to manage component behavior and respond to user interactions. Events allow you to hook into component lifecycle phases, while methods enable programmatic control.

## Events

### created Event

The `created` event fires when the Inline AI Assist control rendering is complete and the component is ready for interaction.

#### Basic Usage

```vue
<template>
  <div style="height: 350px; width: 650px; margin: 0 auto;">
    <div id="created"></div>
    <button id="summarizeBtn" @click="showPopup">Summarize</button>
    <div id="editableText" contenteditable="true" 
         style="min-height:80px; border:1px solid #ccc; padding:8px; margin-top:8px;">
      Editable content goes here.
    </div>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue';
import { InlineAIAssist } from '@syncfusion/ej2-interactive-chat';
import { enableRipple } from '@syncfusion/ej2-base';

let inlineAIAssist;

enableRipple(true);

onMounted(() => {
  inlineAIAssist = new InlineAIAssist({
    created: function () {
      console.log('Inline AI Assist component created and ready');
    },
    relateTo: '#summarizeBtn',
    promptRequest: () => {
      setTimeout(() => {
        const defaultResponse = 'Component is ready for interaction.';
        inlineAIAssist.addResponse(defaultResponse);
      }, 1000);
    },
    responseSettings: {
      itemSelect: (args) => {
        if (args.command.label === 'Accept') {
          inlineAIAssist.hidePopup();
        }
      }
    }
  });

  inlineAIAssist.appendTo('#created');

  const summarizeBtn = document.querySelector('#summarizeBtn');
  if (summarizeBtn) {
    summarizeBtn.addEventListener('click', () => {
      inlineAIAssist.showPopup();
    });
  }
});

onBeforeUnmount(() => {
  if (inlineAIAssist) {
    try { inlineAIAssist.destroy(); } catch (e) { console.warn(e); }
    inlineAIAssist = null;
  }
});
</script>
```

### promptRequest Event

The `promptRequest` event fires when the user submits a prompt. This is where you connect to your AI service to fetch and process responses.

#### Event Arguments

- `args.prompt` - The prompt text submitted by the user
- `args.cancel` - Set to `true` to cancel the prompt processing

#### Basic Usage

```vue
<script setup>
const onPromptRequest = (args) => {
  console.log('User prompt:', args.prompt);
  
  // Call your AI service here
  fetchAIResponse(args.prompt).then((response) => {
    inlineAiAssist.value?.addResponse(response);
  });
};

async function fetchAIResponse(prompt) {
  try {
    const response = await fetch('/api/ai-service', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });
    const data = await response.json();
    return data.result;
  } catch (error) {
    return 'Error: Unable to process prompt.';
  }
}
</script>
```

#### Canceling Prompt Processing

```vue
<script setup>
const onPromptRequest = (args) => {
  if (args.prompt.length < 5) {
    args.cancel = true;  // Prevent processing short prompts
    console.log('Prompt too short');
    return;
  }
  
  // Process valid prompts
  fetchAIResponse(args.prompt);
};
</script>
```

### open Event

The `open` event fires when the popup or inline response area becomes visible. Use this event to initialize UI elements, set focus, measure layout, or perform analytics tracking.

#### Usage

```vue
<template>
  <div style="height: 350px; width: 650px; margin: 0 auto;">
    <br />
    <button @click="showPopup">Open Assistant</button>
    <ejs-inlineaiassist 
      :open="onOpen"
      :prompt-request="onPromptRequest"
      :response-settings="responseSettings"
      ref="inlineAiAssist">
    </ejs-inlineaiassist>
  </div>
</template>

<script setup>
import { InlineAIAssistComponent as EjsInlineaiassist } from "@syncfusion/ej2-vue-interactive-chat";
import { ref } from "vue";

let inlineAiAssist = ref(null);

const onOpen = (args) => {
  console.log('Popup opened');
  
  // Track analytics
  trackEvent('ai_assist_opened');
  
  // Set focus to prompt input
  setTimeout(() => {
    const promptInput = document.querySelector('.e-prompt-input');
    if (promptInput) {
      promptInput.focus();
    }
  }, 100);
  
  // Initialize any dynamic content
  loadRecentPrompts();
};

const trackEvent = (eventName) => {
  console.log('Analytics:', eventName);
  // Your analytics code here
};

const loadRecentPrompts = () => {
  // Load user's recent prompts from storage
  const recentPrompts = localStorage.getItem('recentPrompts');
  console.log('Recent prompts:', recentPrompts);
};

const responseSettings = {
  itemSelect: (args) => {
    if (args.command.label === 'Accept') {
      inlineAiAssist.value?.hidePopup();
    }
  }
};

const onPromptRequest = () => {
  setTimeout(() => {
    inlineAiAssist.value?.addResponse('Response content');
  }, 1000);
};

const showPopup = () => {
  inlineAiAssist.value?.showPopup();
};
</script>
```

### close Event

The `close` event fires when the popup or inline response area is closed or hidden. This occurs after the user cancels, presses Escape, clicks outside, or after response insertion.

#### Usage

```vue
<template>
  <div style="height: 350px; width: 650px; margin: 0 auto;">
    <br />
    <button @click="showPopup">Open Assistant</button>
    <div id="status">Status: Closed</div>
    <ejs-inlineaiassist 
      :open="onOpen"
      :close="onClose"
      :prompt-request="onPromptRequest"
      ref="inlineAiAssist">
    </ejs-inlineaiassist>
  </div>
</template>

<script setup>
import { InlineAIAssistComponent as EjsInlineaiassist } from "@syncfusion/ej2-vue-interactive-chat";
import { ref } from "vue";

let inlineAiAssist = ref(null);

const onOpen = () => {
  const status = document.getElementById('status');
  if (status) status.textContent = 'Status: Open';
  console.log('Popup opened');
};

const onClose = (args) => {
  const status = document.getElementById('status');
  if (status) status.textContent = 'Status: Closed';
  
  console.log('Popup closed');
  
  // Save state before closing
  saveComponentState();
  
  // Track session duration
  trackSessionEnd();
  
  // Clean up temporary data
  cleanupTempData();
};

const saveComponentState = () => {
  const prompts = inlineAiAssist.value?.prompts || [];
  localStorage.setItem('lastSession', JSON.stringify({
    timestamp: Date.now(),
    promptCount: prompts.length
  }));
};

const trackSessionEnd = () => {
  console.log('Session ended at:', new Date().toISOString());
};

const cleanupTempData = () => {
  // Remove temporary variables or cache
  console.log('Cleaning up temporary data');
};

const onPromptRequest = () => {
  setTimeout(() => {
    inlineAiAssist.value?.addResponse('Response content');
  }, 1000);
};

const showPopup = () => {
  inlineAiAssist.value?.showPopup();
};
</script>
```

### Combined open and close Event Handling

```vue
<script setup>
const sessionStartTime = ref(null);
const interactionCount = ref(0);

const onOpen = () => {
  sessionStartTime.value = Date.now();
  interactionCount.value = 0;
  console.log('Session started');
};

const onClose = () => {
  if (sessionStartTime.value) {
    const duration = Date.now() - sessionStartTime.value;
    console.log(`Session duration: ${duration}ms`);
    console.log(`Interactions: ${interactionCount.value}`);
    
    // Send analytics
    sendAnalytics({
      duration,
      interactions: interactionCount.value,
      completed: interactionCount.value > 0
    });
  }
};

const onPromptRequest = () => {
  interactionCount.value++;
  // Handle prompt
};
</script>
```

### Speech-to-Text Events

When `speechToTextSettings.enable` is `true`, the Inline AI Assist component emits dedicated events for the speech recognition lifecycle. These events are configured inside the `speechToTextSettings` object (not as root-level events).

| Event | Triggered when |
|-------|----------------|
| `onStart` | Recognition starts (the user activates the microphone button). |
| `onStop` | Recognition stops (the user deactivates the microphone or recognition times out). |
| `transcriptChanged` | The transcript updates — fires for both interim (partial) and final results. |
| `onError` | A recognition error occurs (e.g., no microphone, permission denied, network). |

#### onStart Event

Fires when speech recognition begins. Use this to update UI state (e.g., show a "Listening…" indicator).

```vue
<script setup>
const speechToTextSettings = {
  enable: true,
  onStart: (args) => {
    console.log('Listening state:', args.listeningState);
    // e.g., isRecording.value = true;
  }
};
</script>
```

#### onStop Event

Fires when speech recognition stops. Use this to reset UI state and finalize the captured transcript.

```vue
<script setup>
const speechToTextSettings = {
  enable: true,
  onStop: (args) => {
    console.log('Listening state:', args.listeningState);
    // e.g., isRecording.value = false;
  }
};
</script>
```

#### transcriptChanged Event

Fires whenever the recognized transcript changes. With `allowInterimResults: true`, this fires frequently with partial results; with it `false`, it fires once with the final transcript.

The event argument exposes the latest text via `args.text`, `args.value`, or `args.transcript`, and a boolean flag `args.isFinal` indicating whether the result is final.

```vue
<script setup>
const speechToTextSettings = {
  enable: true,
  allowInterimResults: true,
  transcriptChanged: (args) => {
    const text = args.text || args.value || args.transcript || '';
    const isFinal = args.isFinal || args.final || false;
    console.log('Transcript:', text, '| isFinal:', isFinal);
    // transcriptText.value = text;
  }
};
</script>
```

#### onError Event

Fires when a speech recognition error occurs. Inspect `args.error` or `args.errorMessage` for details, and show a user-friendly fallback (e.g., a text-only input).

```vue
<script setup>
const speechToTextSettings = {
  enable: true,
  onError: (args) => {
    const message = (args && (args.error || args.errorMessage)) || 'Speech recognition failed';
    console.error('Speech error:', message);
    // errorText.value = message;
  }
};
</script>
```

#### Complete Speech-to-Text Events Example

```vue
<template>
  <div style="height: 400px; width: 700px; margin: 0 auto;">
    <br />
    <button @click="showPopup">Open Assistant</button>
    <p>Status: <strong>{{ status }}</strong></p>
    <p>Transcript: <em>{{ transcript }}</em></p>
    <p v-if="error" style="color: red;">{{ error }}</p>

    <ejs-inlineaiassist
      relate-to="#btn"
      :speech-to-text-settings="speechToTextSettings"
      :prompt-request="onPromptRequest"
      ref="inlineAiAssist">
    </ejs-inlineaiassist>
  </div>
</template>

<script setup>
import { InlineAIAssistComponent as EjsInlineaiassist } from '@syncfusion/ej2-vue-interactive-chat';
import { ref } from 'vue';

const inlineAiAssist = ref(null);

const status = ref('Idle');
const transcript = ref('');
const error = ref('');

const speechToTextSettings = {
  enable: true,
  allowInterimResults: true,
  onStart: (args) => {
    error.value = '';
    status.value = 'Listening (' + (args.listeningState || '') + ')';
  },
  onStop: (args) => {
    status.value = 'Stopped (' + (args.listeningState || '') + ')';
  },
  transcriptChanged: (args) => {
    const text = args.text || args.value || args.transcript || '';
    transcript.value = text;
  },
  onError: (args) => {
    error.value = (args && (args.error || args.errorMessage)) || 'Speech recognition failed';
    status.value = 'Error';
  }
};

const onPromptRequest = () => {
  setTimeout(() => {
    inlineAiAssist.value?.addResponse('Response for: ' + transcript.value);
  }, 1000);
};

const showPopup = () => {
  inlineAiAssist.value?.showPopup();
};
</script>
```

> For a full configuration walkthrough (including `lang`, `buttonSettings`, and `tooltipSettings`), see [speech-to-text.md](speech-to-text.md).

### Additional Events

Other events available in the component:

- **destroy** - Fires before the component is destroyed

## Public Methods

### addResponse() Method

Adds a response to the prompt-response collection and displays it in the response popup.

#### Syntax

```javascript
addResponse(response, isMarkdown = false)
```

#### Parameters

- `response` - The response text or HTML content
- `isMarkdown` - Optional. If `true`, formats response as Markdown

#### Basic Usage

```vue
<script setup>
const onPromptRequest = () => {
  setTimeout(() => {
    const response = 'This is the AI response.';
    inlineAiAssist.value?.addResponse(response);
  }, 1000);
};
</script>
```

#### With HTML Response

```vue
<script setup>
const onPromptRequest = () => {
  const htmlResponse = '<div style="color: blue;">Formatted response</div>';
  inlineAiAssist.value?.addResponse(htmlResponse);
};
</script>
```

#### With Markdown Response

```vue
<script setup>
const onPromptRequest = () => {
  const markdownResponse = '## Summary\n\nThis is a **bold** summary.';
  inlineAiAssist.value?.addResponse(markdownResponse, true);
};
</script>
```

### showPopup() Method

Displays the Inline AI Assist popup.

#### Syntax

```javascript
showPopup()
```

#### Usage

```vue
<template>
  <button @click="showPopup">Open Assistant</button>
</template>

<script setup>
const showPopup = () => {
  inlineAiAssist.value?.showPopup();
};
</script>
```

### hidePopup() Method

Hides the Inline AI Assist popup.

#### Syntax

```javascript
hidePopup()
```

#### Usage

```vue
<script setup>
const responseSettings = {
  itemSelect: (args) => {
    if (args.command.label === 'Accept' || args.command.label === 'Discard') {
      inlineAiAssist.value?.hidePopup();
    }
  }
};
</script>
```

### getPrompt() Method

Retrieves the current prompt text.

#### Syntax

```javascript
getPrompt()
```

#### Returns

- `string` - The current prompt text

#### Usage

```vue
<script setup>
const getCurrentPrompt = () => {
  const prompt = inlineAiAssist.value?.getPrompt?.();
  console.log('Current prompt:', prompt);
  return prompt;
};
</script>
```

### showCommandPopup() Method

Displays the command popup below the prompt input area. Use this to programmatically show available commands for user selection.

#### Syntax

```javascript
showCommandPopup()
```

#### Usage

```vue
<template>
  <div style="height: 400px; width: 700px; margin: 0 auto;">
    <button @click="showCommands">Show Available Commands</button>
    <ejs-inlineaiassist 
      :command-settings="commandSettings"
      :prompt-request="onPromptRequest"
      ref="inlineAiAssist">
    </ejs-inlineaiassist>
  </div>
</template>

<script setup>
const commandSettings = {
  commands: [
    { label: 'Summarize', prompt: 'Summarize' },
    { label: 'Translate', prompt: 'Translate' },
    { label: 'Expand', prompt: 'Expand' }
  ]
};

const showCommands = () => {
  inlineAiAssist.value?.showPopup();
  // Show commands automatically
  setTimeout(() => {
    inlineAiAssist.value?.showCommandPopup();
  }, 100);
};

const onPromptRequest = () => {
  setTimeout(() => {
    inlineAiAssist.value?.addResponse('Processing...');
  }, 1000);
};
</script>
```

### hideCommandPopup() Method

Hides the command popup without executing any command. Use this to dismiss the command chooser programmatically.

#### Syntax

```javascript
hideCommandPopup()
```

#### Usage

```vue
<script setup>
const hideCommandsAfterDelay = () => {
  // Show command popup
  inlineAiAssist.value?.showCommandPopup();
  
  // Auto-hide after 3 seconds
  setTimeout(() => {
    inlineAiAssist.value?.hideCommandPopup();
  }, 3000);
};

// Hide on specific conditions
const conditionalHide = () => {
  const selection = window.getSelection().toString();
  if (!selection) {
    inlineAiAssist.value?.hideCommandPopup();
    alert('No text selected');
  }
};
</script>
```

### Additional Methods

Other public methods available:

- **destroy()** - Destroys the component and releases resources
- **appendTo(selector)** - Appends component to a DOM element
- **refresh()** - Refreshes the component

## Complete Examples

### Example 1: Full Lifecycle Management

```vue
<template>
  <div style="height: 400px; width: 700px; margin: 0 auto;">
    <br />
    <button @click="showPopup">Open Assistant</button>
    <button @click="getCurrentPrompt">Get Current Prompt</button>
    <button @click="hidePopup">Close Assistant</button>
    
    <ejs-inlineaiassist 
      relate-to="#btn"
      popup-width="500px"
      :prompt-request="onPromptRequest"
      :response-settings="responseSettings"
      ref="inlineAiAssist">
    </ejs-inlineaiassist>
  </div>
</template>

<script setup>
import { InlineAIAssistComponent as EjsInlineaiassist } from "@syncfusion/ej2-vue-interactive-chat";
import { ref } from "vue";

let inlineAiAssist = ref(null);

const responseSettings = {
  itemSelect: (args) => {
    if (args.command.label === 'Accept') {
      inlineAiAssist.value?.hidePopup();
    }
  }
};

const onPromptRequest = (args) => {
  console.log('Processing:', args.prompt);
  setTimeout(() => {
    const response = `Processed: "${args.prompt}"`;
    inlineAiAssist.value?.addResponse(response);
  }, 1500);
};

const showPopup = () => {
  inlineAiAssist.value?.showPopup();
};

const hidePopup = () => {
  inlineAiAssist.value?.hidePopup();
};

const getCurrentPrompt = () => {
  const prompt = inlineAiAssist.value?.getPrompt?.();
  console.log('Current prompt:', prompt);
};
</script>
```

### Example 2: Advanced Event Handling

```vue
<script setup>
const eventLog = ref([]);

const onPromptRequest = (args) => {
  logEvent(`Prompt requested: ${args.prompt}`);
  
  // Cancel if prompt is empty
  if (!args.prompt || args.prompt.trim().length === 0) {
    args.cancel = true;
    logEvent('Prompt cancelled: Empty input');
    return;
  }
  
  // Process prompt
  setTimeout(() => {
    const response = `Processed: ${args.prompt}`;
    inlineAiAssist.value?.addResponse(response);
    logEvent('Response added');
  }, 1000);
};

const logEvent = (message) => {
  const timestamp = new Date().toLocaleTimeString();
  eventLog.value.push(`[${timestamp}] ${message}`);
};
</script>
```

## Troubleshooting

### Issue: addResponse() not working
- **Solution:** Verify component reference is correct (ref="inlineAiAssist")
- **Check:** Ensure `prompt-request` event handler is triggered before calling `addResponse()`

### Issue: showPopup() not displaying popup
- **Solution:** Verify component is properly initialized and mounted
- **Check:** Ensure `relateTo` property points to valid DOM element

### Issue: getPrompt() returning undefined
- **Solution:** Call after component is fully created
- **Check:** Verify prompt exists in the component state

### Issue: Event handlers not firing
- **Solution:** Verify event names are correct (camelCase in template, callback names in script)
- **Check:** Ensure handlers are properly bound to component instance
