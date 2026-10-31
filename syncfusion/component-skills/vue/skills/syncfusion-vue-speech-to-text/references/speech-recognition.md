# Speech Recognition & Configuration

## Table of Contents
- [Retrieving Transcripts](#retrieving-transcripts)
- [Setting Language](#setting-language)
- [Allowing Interim Results](#allowing-interim-results)
- [Managing Listening State](#managing-listening-state)
- [Showing or Hiding Tooltip](#showing-or-hiding-tooltip)
- [Disabling the Component](#disabling-the-component)
- [Setting HTML Attributes](#setting-html-attributes)
- [Error Handling](#error-handling)
- [Browser Support](#browser-support)

## Retrieving Transcripts

The `transcript` property allows you to retrieve the transcribed text generated from the spoken input. Use the `@transcriptChanged` event to capture transcript updates in real-time.

```vue
<template>
  <div id='container'>
    <ejs-speechtotext id="speechtotext" ref="speechToTextInstance" v-model="transcript" @transcriptChanged="onTranscriptChange"></ejs-speechtotext>
    <ejs-textarea v-model="transcript" rows="5" cols="50" resizeMode="None" placeholder="Transcribed text will be shown here..."></ejs-textarea>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { SpeechToTextComponent as EjsSpeechtotext, TextAreaComponent as EjsTextarea } from "@syncfusion/ej2-vue-inputs";

const transcript = ref('Hi, hello! How are you?');
const speechToTextInstance = ref(null);

const onTranscriptChange = (args) => {
  transcript.value = speechToTextInstance.value.ej2Instances.transcript;
};

</script>
```

## Setting Language

The `lang` property specifies the language for speech recognition, ensuring the engine correctly interprets spoken words for a given locale. Common locale formats include `en-US` for American English, `fr-FR` for French, `de-DE` for German, and other BCP 47 language tags.

```vue
<template>
  <div id='container'>
    <ejs-speechtotext id="speechtotext" @transcript-changed="onTranscriptChange" lang="fr-FR"></ejs-speechtotext>
    <ejs-textarea v-model="textareaValue" rows="5" cols="50" resizeMode="None" placeholder="Transcribed text will be shown here..."></ejs-textarea>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { SpeechToTextComponent as EjsSpeechtotext, TextAreaComponent as EjsTextarea } from "@syncfusion/ej2-vue-inputs";

const textareaValue = ref('');

const onTranscriptChange = (args) => {
  textareaValue.value = args.transcript;
};

</script>
```

## Allowing Interim Results

The `allowInterimResults` property controls whether interim (real-time) or final speech recognition results are provided. When `true`, results are displayed as the user speaks; otherwise, only the final transcript is shown. This property is `true` by default.

**Use Case:** Set to `false` when you only want complete, final transcriptions rather than partial results during speech.

```vue
<template>
  <div id='container'>
    <ejs-speechtotext id="speechtotext" @transcript-changed="onTranscriptChange" :allow-interim-results="false"></ejs-speechtotext>
    <ejs-textarea v-model="textareaValue" rows="5" cols="50" resizeMode="None" placeholder="Transcript will be displayed here once speech recognition is complete."></ejs-textarea>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { SpeechToTextComponent as EjsSpeechtotext, TextAreaComponent as EjsTextarea } from "@syncfusion/ej2-vue-inputs";

const textareaValue = ref('');

const onTranscriptChange = (args) => {
  textareaValue.value = args.transcript;
};

</script>
```

## Managing Listening State

The `listeningState` property manages and indicates the component's current status. It can take three values:

### Inactive
The component is in an idle state with no active speech recognition. This is the default initial state.

### Listening
The component is actively listening, capturing, and transcribing speech. The button displays a stop icon and includes a blinking animation to indicate active recognition.

### Stopped
Speech recognition has ended, and no further speech is being processed.

Track state changes using the `@start` and `@stop` events:

```vue
<template>
  <div id="container">
    <div id="status-box-container" class="status-box inactive">
      <span>Status: <strong id="status-text">Inactive</strong></span>
    </div>
    <ejs-speechtotext id="speechtotext" listening-state="Inactive" @start="(args) => updateListeningState(args.listeningState)" @stop="(args) => updateListeningState(args.listeningState)"></ejs-speechtotext>
    <div class="waveform-container">
      <div id="waveform-item" class="waveform" style="display: none;">
        <span></span><span></span><span></span><span></span><span></span>
      </div>
      <p id="instruction-text">Click the button to start listening.</p>
    </div>
  </div>
</template>

<script setup>
import { SpeechToTextComponent as EjsSpeechtotext } from "@syncfusion/ej2-vue-inputs";

const updateListeningState = (state) => {
  document.getElementById("status-text").innerText = state;

  var statusBox = document.getElementById("status-box-container");
  var waveform = document.getElementById("waveform-item");
  var instructionText = document.getElementById("instruction-text");

  if (state === "Listening") {
    statusBox.className = "status-box listening";
    waveform.style.display = "flex";
    instructionText.innerText = "Listening... Speak now!";
  } else if (state === "Stopped") {
    statusBox.className = "status-box stopped";
    waveform.style.display = "none";
    instructionText.innerText = "Recognition Stopped.";
  } else {
    statusBox.className = "status-box inactive";
    waveform.style.display = "none";
    instructionText.innerText = "Click the button to start listening.";
  }
};
</script>
```

## Showing or Hiding Tooltip

The `showTooltip` property determines whether to display a tooltip when hovering over the SpeechToText button. It is enabled by default (`true`).

```vue
<template>
  <div id='container'>
    <ejs-speechtotext id="speechtotext" @transcript-changed="onTranscriptChange" :show-tooltip="false"></ejs-speechtotext>
    <ejs-textarea v-model="textareaValue" rows="5" cols="50" resizeMode="None" placeholder="Transcribed text will be shown here..."></ejs-textarea>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { SpeechToTextComponent as EjsSpeechtotext, TextAreaComponent as EjsTextarea } from "@syncfusion/ej2-vue-inputs";

const textareaValue = ref('');

const onTranscriptChange = (args) => {
  textareaValue.value = args.transcript;
};

</script>
```

## Disabling the Component

The `disabled` property, when set to `true`, disables the SpeechToText component and prevents user interaction. By default, it is `false`.

```vue
<template>
  <div id='container'>
    <ejs-speechtotext id="speechtotext" @transcript-changed="onTranscriptChange" :disabled="true"></ejs-speechtotext>
    <ejs-textarea v-model="textareaValue" rows="5" cols="50" resizeMode="None" placeholder="Transcribed text will be shown here..."></ejs-textarea>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { SpeechToTextComponent as EjsSpeechtotext, TextAreaComponent as EjsTextarea } from "@syncfusion/ej2-vue-inputs";

const textareaValue = ref('');

const onTranscriptChange = (args) => {
  textareaValue.value = args.transcript;
};

</script>
```

## Enabling State Persistence

The `enablePersistence` property allows the component's state to be persisted between page reloads. When set to `true`, the component will save its current state (such as transcript, listening state, and configuration) and restore it automatically when the page is reloaded.

**Type:** `boolean`  
**Default:** `false`

**Use Case:** Enable this property when you want to preserve the user's speech recognition session across page navigations or browser refreshes. This is useful for:
- Multi-page forms with voice input
- Applications where users frequently refresh the page
- Maintaining user preferences and state

**Usage:**
```vue
<ejs-speechtotext :enable-persistence="true"></ejs-speechtotext>
```

## Setting HTML Attributes

The `htmlAttributes` property allows additional HTML attributes to be added to the root element of the SpeechToText button. This property accepts a key-value pair format for attributes such as `name`, `aria-label`, and others, helping to make the button more accessible and adaptable to specific requirements.

**Type:** `{ [key: string]: string }`  
**Default:** `null`

**Common Use Cases:**
- Add ARIA attributes for accessibility (e.g., `aria-label`, `aria-describedby`)
- Set form-related attributes (e.g., `name`, `id`)
- Add data attributes for testing or tracking (e.g., `data-testid`, `data-analytics`)
- Apply custom HTML attributes as needed

**Property Format:**
```typescript
htmlAttributes: { [key: string]: string }
```

**Usage Pattern:**
```vue
<ejs-speechtotext 
  :html-attributes="{ 'aria-label': 'Voice input button', 'data-testid': 'speech-button' }"
></ejs-speechtotext>
```

## Error Handling

The SpeechToText component handles various errors that may occur during speech recognition. The `@error` event captures these errors. The following table lists the possible errors and their causes:

| Error | Cause |
|-------|-------|
| `no-speech` | The microphone did not detect any speech input. |
| `aborted` | The speech recognition process was intentionally terminated. |
| `audio-capture` | The system was unable to detect a microphone device. |
| `not-allowed` | Access to the microphone was denied by the user or browser settings. |
| `service-not-allowed` | The current context does not permit the use of the speech recognition service. |
| `network` | A network issue is preventing the speech recognition service from functioning. |
| `unsupported-browser` | The browser being used does not support the SpeechRecognition API. |
| `default` | An unidentified error occurred during the speech recognition process. |

### Troubleshooting Common Errors

- **no-speech:** User did not speak clearly or loudly enough. Ensure the microphone is active and positioned properly.
- **audio-capture:** Check that a microphone is connected and properly configured in system settings.
- **not-allowed:** Request microphone permissions in browser settings. User must grant permission explicitly.
- **network:** Verify internet connection is active and stable.
- **unsupported-browser:** Use a supported browser (Chrome 25+, Edge 79+, Safari 12+, Opera 30+).

## Browser Support

The SpeechToText component relies on the [Speech Recognition API](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition) for processing speech input. Ensure that the browser supports this API before implementation.

| Browser | Supported Versions |
|---------|-------------------|
| Chrome | 25+ |
| Edge | 79+ |
| Firefox | Not Supported |
| Safari | 12+ |
| Opera | 30+ |

**Note:** Firefox does not currently support the Speech Recognition API. Consider providing alternative input methods for Firefox users or informing them to use a supported browser.
