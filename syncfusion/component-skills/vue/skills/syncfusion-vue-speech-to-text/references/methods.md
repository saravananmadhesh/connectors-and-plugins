# Methods & Programmatic Control

## Start Listening

The `startListening()` method initiates speech recognition and begins converting speech to text. Use this method to programmatically start the recognition process without requiring the user to click the microphone button.

**When to use:** 
- Auto-trigger speech recognition on page load
- Start listening in response to other user actions
- Implement custom UI controls for speech capture

## Stop Listening

The `stopListening()` method terminates the speech recognition process. Use this method to programmatically stop recognition when an action is completed or a timeout occurs.

**When to use:**
- Stop recording after a set duration
- Halt recognition in response to button clicks
- Implement automatic timeout for idle periods

## Complete Example

The following example demonstrates how to use the `startListening` and `stopListening` methods with custom buttons:

```vue
<template>
  <div id='container'>
    <div class="actions">
      <button @click="startRecognition">Start Listening</button>
      <button @click="stopRecognition">Stop Listening</button>
    </div>
    <ejs-speechtotext id="speechtotext" ref="speechToTextInstance" @transcriptChanged="onTranscriptChange" ></ejs-speechtotext>
    <ejs-textarea v-model="textareaValue" rows="5" cols="50" resizeMode="None" placeholder="Transcribed text will be shown here..."></ejs-textarea>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { SpeechToTextComponent as EjsSpeechtotext, TextAreaComponent as EjsTextarea } from "@syncfusion/ej2-vue-inputs";
import { ButtonComponent as EjsButton } from "@syncfusion/ej2-vue-buttons";

const textareaValue = ref('');
const speechToTextInstance = ref(null);

const startRecognition = () => {
  speechToTextInstance.value.startListening();
};

const stopRecognition = () => {
  speechToTextInstance.value.stopListening();
};

const onTranscriptChange = (args) => {
  textareaValue.value = args.transcript;
};

</script>
```

## Usage Patterns

### Auto-Start on Component Load

Automatically begin listening when the component mounts:

```vue
<script setup>
import { onMounted, ref } from "vue";
import { SpeechToTextComponent as EjsSpeechtotext } from "@syncfusion/ej2-vue-inputs";

const speechToTextInstance = ref(null);

onMounted(() => {
  speechToTextInstance.value.startListening();
});
</script>
```

### Timeout Control

Stop listening after a specified duration:

```vue
<script setup>
import { ref } from "vue";

const speechToTextInstance = ref(null);

const startWithTimeout = (durationMs = 30000) => {
  speechToTextInstance.value.startListening();
  setTimeout(() => {
    speechToTextInstance.value.stopListening();
  }, durationMs);
};
</script>
```

### Conditional Control

Start or stop based on application state:

```vue
<script setup>
import { ref, computed } from "vue";

const isRecording = ref(false);
const speechToTextInstance = ref(null);

const toggleRecording = () => {
  if (isRecording.value) {
    speechToTextInstance.value.stopListening();
    isRecording.value = false;
  } else {
    speechToTextInstance.value.startListening();
    isRecording.value = true;
  }
};

const recordingStatus = computed(() => isRecording.value ? 'Recording...' : 'Not Recording');
</script>
```
