# Events & Lifecycle

This section describes the events that are triggered when performing actions with the SpeechToText component. These events enable you to respond to user interactions and component state changes.

## Event Overview

| Event | Args | Description |
|-------|------|-------------|
| `created` | - | Triggers when the SpeechToText component's rendering is fully completed. |
| `onStart` | `StartListeningEventArgs` | Triggers when speech recognition begins. |
| `onStop` | `StopListeningEventArgs` | Triggers when speech recognition stops. |
| `onError` | `ErrorEventArgs` | Triggers when an error occurs during speech recognition or listening. |
| `transcriptChanged` | `TranscriptChangedEventArgs` | Triggers when a transcription change occurs during speech recognition. |

## Created Event

The `@created` event fires when the component finishes rendering and initialization. Use this event to perform setup operations.

```vue
<script setup>
const onCreated = () => {
  console.log('SpeechToText component initialized');
};
</script>

<template>
  <ejs-speechtotext id="speechtotext" @created="onCreated"></ejs-speechtotext>
</template>
```

## Start Event

The `@start` event triggers when speech recognition begins. This event provides control through the `StartListeningEventArgs` object, allowing you to cancel the listening action or track its state.

### StartListeningEventArgs Properties

| Property | Type | Description |
|----------|------|-------------|
| `cancel` | boolean | Set to `true` to prevent listening from starting. Useful for conditional validation. |
| `listeningState` | SpeechToTextState | The current state of the component ('Listening', 'Inactive', or 'Stopped') |
| `isInteracted` | boolean | Indicates if triggered by user interaction (`true`) or programmatically (`false`) |
| `event` | Event | The native browser event associated with the start action |
| `name` | string | The name of the event |

### Basic Usage

```vue
<script setup>
const onStart = (args) => {
  console.log('Started listening. State:', args.listeningState);
  console.log('User interaction:', args.isInteracted);
};
</script>

<template>
  <ejs-speechtotext id="speechtotext" @start="onStart"></ejs-speechtotext>
</template>
```

### Canceling the Start Event

The `cancel` property allows you to prevent speech recognition from starting based on custom conditions. This is useful for validation, permission checks, or enforcing business rules.

```vue
<template>
  <div id='container'>
    <div v-if="!isOnline" class="warning">
      You are offline. Speech recognition requires an internet connection.
    </div>
    <ejs-speechtotext id="speechtotext" @start="onStart"></ejs-speechtotext>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { SpeechToTextComponent as EjsSpeechtotext } from "@syncfusion/ej2-vue-inputs";

const isOnline = ref(navigator.onLine);

const onStart = (args) => {
  // Cancel if offline
  if (!isOnline.value) {
    args.cancel = true;
    alert('Cannot start speech recognition. Please check your internet connection.');
    return;
  }
  
  console.log('Speech recognition started successfully');
};

// Monitor online/offline status
window.addEventListener('online', () => isOnline.value = true);
window.addEventListener('offline', () => isOnline.value = false);
</script>
```

### Conditional Start Based on User Interaction

Use the `isInteracted` property to differentiate between user-triggered and programmatic starts:

```vue
<template>
  <div id='container'>
    <button @click="startProgrammatically">Auto Start</button>
    <ejs-speechtotext id="speechtotext" ref="speechToTextInstance" @start="onStart"></ejs-speechtotext>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { SpeechToTextComponent as EjsSpeechtotext } from "@syncfusion/ej2-vue-inputs";

const speechToTextInstance = ref(null);
const autoStartsAllowed = ref(true);

const onStart = (args) => {
  // Allow manual user clicks anytime
  if (args.isInteracted) {
    console.log('User manually started speech recognition');
    return;
  }
  
  // Cancel programmatic starts if not allowed
  if (!autoStartsAllowed.value) {
    args.cancel = true;
    console.log('Programmatic start canceled - auto-start disabled');
    return;
  }
  
  console.log('Programmatic start allowed');
};

const startProgrammatically = () => {
  speechToTextInstance.value.startListening();
};
</script>
```

## Stop Event

The `@stop` event triggers when speech recognition stops. This event provides information about how and why listening ended through the `StopListeningEventArgs` object.

### StopListeningEventArgs Properties

| Property | Type | Description |
|----------|------|-------------|
| `listeningState` | SpeechToTextState | The current state of the component after stopping ('Stopped') |
| `isInteracted` | boolean | Indicates if stopped by user interaction (`true`) or programmatically (`false`) |
| `event` | Event | The native browser event associated with the stop action |
| `name` | string | The name of the event |

### Basic Usage

```vue
<script setup>
const onStop = (args) => {
  console.log('Stopped listening. State:', args.listeningState);
  console.log('User interaction:', args.isInteracted);
};
</script>

<template>
  <ejs-speechtotext id="speechtotext" @stop="onStop"></ejs-speechtotext>
</template>
```

### Tracking User vs Automatic Stops

Use the `isInteracted` property to distinguish between manual and automatic stops:

```vue
<template>
  <div id='container'>
    <p>Last action: {{ lastAction }}</p>
    <ejs-speechtotext id="speechtotext" @stop="onStop"></ejs-speechtotext>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { SpeechToTextComponent as EjsSpeechtotext } from "@syncfusion/ej2-vue-inputs";

const lastAction = ref('');

const onStop = (args) => {
  if (args.isInteracted) {
    lastAction.value = 'User manually stopped recording';
  } else {
    lastAction.value = 'Recording stopped automatically (timeout or programmatic)';
  }
  
  console.log('State after stop:', args.listeningState);
};
</script>
```

## Error Event

The `@error` event triggers when an error occurs during speech recognition. The `ErrorEventArgs` object contains detailed error information to help diagnose and handle problems.

### ErrorEventArgs Properties

| Property | Type | Description |
|----------|------|-------------|
| `error` | string | Error type identifier (e.g., 'no-speech', 'not-allowed', 'network') |
| `errorMessage` | string | User-friendly error message providing details about the error |
| `event` | Event | The native browser event associated with the error |
| `name` | string | The name of the event |

### Common Error Types

| Error Code | Description |
|------------|-------------|
| `no-speech` | No speech detected by the microphone |
| `aborted` | Speech recognition was aborted |
| `audio-capture` | No microphone detected or audio capture failed |
| `not-allowed` | Microphone access denied by user or browser |
| `service-not-allowed` | Speech recognition service not allowed in context |
| `network` | Network error occurred during recognition |
| `unsupported-browser` | Browser doesn't support Speech Recognition API |

### Basic Usage

```vue
<script setup>
const onError = (args) => {
  console.error('Speech recognition error:', args.error);
  console.error('Error message:', args.errorMessage);
};
</script>

<template>
  <ejs-speechtotext id="speechtotext" @error="onError"></ejs-speechtotext>
</template>
```

### Advanced Error Handling

Display user-friendly error messages based on error types:

```vue
<template>
  <div id='container'>
    <div v-if="errorMessage" class="error-alert">
      {{ errorMessage }}
    </div>
    <ejs-speechtotext id="speechtotext" @error="onError"></ejs-speechtotext>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { SpeechToTextComponent as EjsSpeechtotext } from "@syncfusion/ej2-vue-inputs";

const errorMessage = ref('');

const onError = (args) => {
  // Use the provided errorMessage or create custom messages
  const customMessages = {
    'no-speech': 'No speech detected. Please speak clearly into the microphone.',
    'not-allowed': 'Microphone access denied. Please enable microphone permissions in your browser settings.',
    'audio-capture': 'Microphone not detected. Please connect a microphone and try again.',
    'network': 'Network error. Please check your internet connection.',
    'unsupported-browser': 'Your browser does not support speech recognition. Please use Chrome, Edge, or Safari.'
  };
  
  // Display custom or default error message
  errorMessage.value = customMessages[args.error] || args.errorMessage || 'An error occurred during speech recognition.';
  
  // Log for debugging
  console.error('Error details:', {
    type: args.error,
    message: args.errorMessage,
    timestamp: new Date().toISOString()
  });
  
  // Clear error after 5 seconds
  setTimeout(() => {
    errorMessage.value = '';
  }, 5000);
};
</script>

<style>
.error-alert {
  background-color: #ffebee;
  color: #c62828;
  padding: 12px;
  border-radius: 4px;
  margin-bottom: 16px;
  border-left: 4px solid #c62828;
}
</style>
```

For a complete list of possible error types and causes, refer to the Error Handling section in the Speech Recognition guide.

## Transcript Changed Event

The `@transcriptChanged` event triggers when a transcription change occurs during speech recognition. This event provides the updated transcript in the `TranscriptChangedEventArgs` object.

### TranscriptChangedEventArgs Properties

| Property | Type | Description |
|----------|------|-------------|
| `transcript` | string | The transcribed text captured from speech |
| `isInterimResult` | boolean | Indicates if the result is interim (`true`) or final (`false`). Determined by the `allowInterimResults` property. |
| `event` | Event | The native browser event associated with the transcript update |
| `name` | string | The name of the event |

### Basic Usage

```vue
<script setup>
const onTranscriptChange = (args) => {
  console.log('New transcript:', args.transcript);
  console.log('Is interim result:', args.isInterimResult);
};
</script>

<template>
  <ejs-speechtotext id="speechtotext" @transcript-changed="onTranscriptChange"></ejs-speechtotext>
</template>
```

### Distinguishing Interim vs Final Results

The `isInterimResult` property is critical for handling real-time speech recognition. Use it to differentiate between partial results (as the user speaks) and complete results (when recognition finalizes).

```vue
<template>
  <div id='container'>
    <div class="transcript-display">
      <p class="interim" v-if="interimTranscript">{{ interimTranscript }}</p>
      <p class="final">{{ finalTranscript }}</p>
    </div>
    <ejs-speechtotext id="speechtotext" @transcript-changed="onTranscriptChange"></ejs-speechtotext>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { SpeechToTextComponent as EjsSpeechtotext } from "@syncfusion/ej2-vue-inputs";

const interimTranscript = ref('');
const finalTranscript = ref('');

const onTranscriptChange = (args) => {
  if (args.isInterimResult) {
    // Handle interim results - show as user speaks
    interimTranscript.value = args.transcript;
  } else {
    // Handle final results - finalized transcription
    finalTranscript.value = args.transcript;
    interimTranscript.value = ''; // Clear interim display
  }
};
</script>

<style>
.interim {
  color: #888;
  font-style: italic;
}
.final {
  color: #000;
  font-weight: bold;
}
</style>
```

## Complete Event Example

The following example demonstrates how to configure and handle all SpeechToText events:

```vue
<template>
  <div id='container'>
    <ejs-speechtotext 
      id="speechtotext" 
      @transcript-changed="onTranscriptChange" 
      @stop="onStop" 
      @start="onStart" 
      @error="onError" 
      @created="onCreated"
    ></ejs-speechtotext>
  </div>
</template>

<script setup>
import { SpeechToTextComponent as EjsSpeechtotext } from "@syncfusion/ej2-vue-inputs";

const onTranscriptChange = (args) => {
  console.log('Transcript updated:', args.transcript);
};

const onStart = (args) => {
  console.log('Speech recognition started');
};

const onStop = (args) => {
  console.log('Speech recognition stopped');
};

const onError = (args) => {
  console.error('Speech recognition error:', args);
};

const onCreated = () => {
  console.log('Component created and ready');
};

</script>
```

## Practical Event Patterns

### Pattern 1: Real-Time Display Updates

Update UI as transcript changes:

```vue
<template>
  <div>
    <p>{{ currentTranscript }}</p>
    <ejs-speechtotext @transcript-changed="updateDisplay"></ejs-speechtotext>
  </div>
</template>

<script setup>
import { ref } from "vue";

const currentTranscript = ref('');

const updateDisplay = (args) => {
  currentTranscript.value = args.transcript;
};
</script>
```

### Pattern 2: Error Notification

Display user-friendly error messages:

```vue
<template>
  <div>
    <div v-if="errorMessage" class="error-banner">{{ errorMessage }}</div>
    <ejs-speechtotext @error="handleError"></ejs-speechtotext>
  </div>
</template>

<script setup>
import { ref } from "vue";

const errorMessage = ref('');

const handleError = (args) => {
  const errorMap = {
    'no-speech': 'No speech detected. Please try again.',
    'not-allowed': 'Microphone access denied. Please check permissions.',
    'network': 'Network error. Please check your connection.',
  };
  errorMessage.value = errorMap[args.error] || 'An error occurred.';
};
</script>
```

### Pattern 3: State Tracking

Monitor and respond to state changes:

```vue
<template>
  <div>
    <p>Status: {{ status }}</p>
    <ejs-speechtotext 
      @start="updateStatus('Listening')" 
      @stop="updateStatus('Ready')" 
      @error="updateStatus('Error')"
    ></ejs-speechtotext>
  </div>
</template>

<script setup>
import { ref } from "vue";

const status = ref('Ready');

const updateStatus = (newStatus) => {
  status.value = newStatus;
};
</script>
```

### Pattern 4: Lifecycle Management

Perform setup and cleanup operations:

```vue
<script setup>
import { ref } from "vue";

const transcript = ref('');
const isActive = ref(false);

const onCreated = () => {
  console.log('Component ready for use');
  isActive.value = true;
};

const onStart = () => {
  transcript.value = '';
};

const onStop = () => {
  console.log('Final transcript:', transcript.value);
};

const onTranscriptChange = (args) => {
  transcript.value = args.transcript;
};

const onError = (args) => {
  isActive.value = false;
};
</script>
```
