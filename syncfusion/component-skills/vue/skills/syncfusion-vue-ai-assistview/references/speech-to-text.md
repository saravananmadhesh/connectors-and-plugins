````markdown
# Speech-to-Text in AI AssistView

## Table of Contents
- [Overview](#overview)
- [Enabling Speech-to-Text](#enabling-speech-to-text)
- [Configuration Properties](#configuration-properties)
- [Button Settings](#button-settings)
- [Tooltip Settings](#tooltip-settings)
- [Language Support](#language-support)
- [Events](#events)
- [Complete Examples](#complete-examples)
- [Best Practices](#best-practices)

## Overview

The AI AssistView component supports speech-to-text functionality, allowing users to input prompts using voice commands. This feature uses the Web Speech API to convert spoken words into text.

### Key Features
- Real-time speech recognition
- Interim and final results
- Customizable microphone button
- Multiple language support
- Event-driven architecture
- Tooltip support

## Enabling Speech-to-Text

### Basic Setup

Enable speech-to-text by configuring the `speechToTextSettings` property:

```vue
<template>
  <div style="height: 500px; width: 700px;">
    <ejs-aiassistview
      ref="aiassist"
      :speech-to-text-settings="speechSettings"
      :prompt-request="onPromptRequest"
    />
  </div>
</template>

<script setup>
import { AIAssistViewComponent as EjsAiassistview } from "@syncfusion/ej2-vue-interactive-chat";
import { ref } from "vue";

const aiassist = ref(null);

const speechSettings = {
  enable: true
};

const onPromptRequest = (args) => {
  setTimeout(() => {
    aiassist.value.addPromptResponse('Response to: ' + args.prompt);
  }, 1000);
};
</script>

<style>
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/ai-assistview/index.css";
</style>
```

## Configuration Properties

### enable (boolean)

Enables or disables speech-to-text functionality.

**Default:** `false`

```javascript
const speechSettings = {
  enable: true  // Enable speech-to-text
};
```

### disabled (boolean)

Disables the speech-to-text control when true.

**Default:** `false`

```javascript
const speechSettings = {
  enable: true,
  disabled: false  // Control is active
};
```

### allowInterimResults (boolean)

Specifies whether interim results should be captured during speech recognition. When enabled, you get real-time updates as the user speaks.

**Default:** `false`

```vue
<template>
  <ejs-aiassistview
    ref="aiassist"
    :speech-to-text-settings="speechSettings"
    :prompt-request="onPromptRequest"
  />
</template>

<script setup>
import { AIAssistViewComponent as EjsAiassistview } from "@syncfusion/ej2-vue-interactive-chat";
import { ref } from "vue";

const aiassist = ref(null);

const speechSettings = {
  enable: true,
  allowInterimResults: true  // Show text as user speaks
};

const onPromptRequest = (args) => {
  setTimeout(() => {
    aiassist.value.addPromptResponse('Response: ' + args.prompt);
  }, 1000);
};
</script>
```

### transcript (string) - Read Only

Stores the recognized speech transcript. This property is automatically updated when speech recognition results are received.

**Type:** `string` (read-only)

```javascript
// Access transcript programmatically
const currentTranscript = aiassist.value.ej2Instances.speechToTextSettings.transcript;
console.log('Current transcript:', currentTranscript);
```

### cssClass (string)

Applies custom CSS classes to the speech-to-text component for styling.

**Default:** `''`

```vue
<template>
  <ejs-aiassistview
    ref="aiassist"
    :speech-to-text-settings="speechSettings"
  />
</template>

<script setup>
const speechSettings = {
  enable: true,
  cssClass: 'custom-speech-button'
};
</script>

<style>
.custom-speech-button {
  background-color: #007bff;
  border-radius: 50%;
}

.custom-speech-button:hover {
  background-color: #0056b3;
}
</style>
```

## Button Settings

Customize the microphone button appearance and behavior with `buttonSettings`.

### buttonSettings (ButtonSettingsModel)

Configuration object for the microphone button.

**Properties:**
- **iconCss** (string) - Icon CSS class for the button
- **content** (string) - Button text content
- **cssClass** (string) - Custom CSS class for button styling

```vue
<template>
  <ejs-aiassistview
    ref="aiassist"
    :speech-to-text-settings="speechSettings"
    :prompt-request="onPromptRequest"
  />
</template>

<script setup>
import { AIAssistViewComponent as EjsAiassistview } from "@syncfusion/ej2-vue-interactive-chat";
import { ref } from "vue";

const aiassist = ref(null);

const speechSettings = {
  enable: true,
  buttonSettings: {
    iconCss: 'e-icons e-microphone',
    content: 'Speak',
    cssClass: 'custom-mic-button'
  }
};

const onPromptRequest = (args) => {
  setTimeout(() => {
    aiassist.value.addPromptResponse('Response: ' + args.prompt);
  }, 1000);
};
</script>

<style>
.custom-mic-button {
  padding: 10px 15px;
  background-color: #28a745;
  color: white;
  border-radius: 5px;
}

.custom-mic-button:hover {
  background-color: #218838;
}
</style>
```

## Tooltip Settings

Configure tooltips for the microphone button with `tooltipSettings`.

### showTooltip (boolean)

Specifies whether to show a tooltip for the microphone button.

**Default:** `true`

```javascript
const speechSettings = {
  enable: true,
  showTooltip: true
};
```

### tooltipSettings (TooltipSettingsModel)

Configuration object for tooltip appearance and behavior.

**Properties:**
- **content** (string) - Tooltip text content
- **position** (string) - Tooltip position ('Top', 'Bottom', 'Left', 'Right')
- **cssClass** (string) - Custom CSS class for tooltip styling

```vue
<template>
  <ejs-aiassistview
    ref="aiassist"
    :speech-to-text-settings="speechSettings"
    :prompt-request="onPromptRequest"
  />
</template>

<script setup>
import { AIAssistViewComponent as EjsAiassistview } from "@syncfusion/ej2-vue-interactive-chat";
import { ref } from "vue";

const aiassist = ref(null);

const speechSettings = {
  enable: true,
  showTooltip: true,
  tooltipSettings: {
    content: 'Click to start speaking',
    position: 'Top',
    cssClass: 'custom-tooltip'
  }
};

const onPromptRequest = (args) => {
  setTimeout(() => {
    aiassist.value.addPromptResponse('Response: ' + args.prompt);
  }, 1000);
};
</script>

<style>
.custom-tooltip {
  background-color: #333;
  color: white;
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 12px;
}
</style>
```

## Language Support

### lang (string)

Specifies the language for speech recognition using ISO language codes.

**Default:** `'en-US'`

**Supported Language Codes:**
- `en-US` - English (United States)
- `en-GB` - English (United Kingdom)
- `es-ES` - Spanish (Spain)
- `fr-FR` - French (France)
- `de-DE` - German (Germany)
- `it-IT` - Italian (Italy)
- `ja-JP` - Japanese (Japan)
- `ko-KR` - Korean (South Korea)
- `zh-CN` - Chinese (Simplified)
- `pt-BR` - Portuguese (Brazil)
- `ru-RU` - Russian (Russia)
- `ar-SA` - Arabic (Saudi Arabia)
- `hi-IN` - Hindi (India)

### Basic Language Configuration

```vue
<template>
  <ejs-aiassistview
    ref="aiassist"
    :speech-to-text-settings="speechSettings"
    :prompt-request="onPromptRequest"
  />
</template>

<script setup>
import { AIAssistViewComponent as EjsAiassistview } from "@syncfusion/ej2-vue-interactive-chat";
import { ref } from "vue";

const aiassist = ref(null);

const speechSettings = {
  enable: true,
  lang: 'es-ES'  // Spanish language
};

const onPromptRequest = (args) => {
  setTimeout(() => {
    aiassist.value.addPromptResponse('Respuesta: ' + args.prompt);
  }, 1000);
};
</script>
```

### Dynamic Language Switching

```vue
<template>
  <div style="height: 500px; width: 700px;">
    <div style="margin-bottom: 10px;">
      <label>Language: </label>
      <select v-model="selectedLanguage" @change="updateLanguage">
        <option value="en-US">English (US)</option>
        <option value="es-ES">Spanish</option>
        <option value="fr-FR">French</option>
        <option value="de-DE">German</option>
      </select>
    </div>
    
    <ejs-aiassistview
      ref="aiassist"
      :speech-to-text-settings="speechSettings"
      :prompt-request="onPromptRequest"
    />
  </div>
</template>

<script setup>
import { AIAssistViewComponent as EjsAiassistview } from "@syncfusion/ej2-vue-interactive-chat";
import { ref } from "vue";

const aiassist = ref(null);
const selectedLanguage = ref('en-US');

const speechSettings = ref({
  enable: true,
  lang: 'en-US'
});

const updateLanguage = () => {
  speechSettings.value.lang = selectedLanguage.value;
};

const onPromptRequest = (args) => {
  setTimeout(() => {
    aiassist.value.addPromptResponse('Response: ' + args.prompt);
  }, 1000);
};
</script>
```

## Events

### onStart Event

Triggered when speech recognition starts (when user clicks mic button and begins speaking).

**Event Arguments:**
- `args.cancel` (boolean) - Set to true to cancel the operation
- `args.text` (string) - Current recognized text

```vue
<template>
  <ejs-aiassistview
    ref="aiassist"
    :speech-to-text-settings="speechSettings"
    :prompt-request="onPromptRequest"
  />
</template>

<script setup>
import { AIAssistViewComponent as EjsAiassistview } from "@syncfusion/ej2-vue-interactive-chat";
import { ref } from "vue";

const aiassist = ref(null);

const speechSettings = {
  enable: true,
  onStart: (args) => {
    console.log('Speech recognition started');
    // Show loading indicator or visual feedback
  }
};

const onPromptRequest = (args) => {
  setTimeout(() => {
    aiassist.value.addPromptResponse('Response: ' + args.prompt);
  }, 1000);
};
</script>
```

### onStop Event

Triggered when speech recognition stops (when user stops speaking and clicks mic button).

**Event Arguments:**
- `args.text` (string) - Final recognized text
- `args.duration` (number) - Duration of recording in milliseconds

```vue
<template>
  <ejs-aiassistview
    ref="aiassist"
    :speech-to-text-settings="speechSettings"
    :prompt-request="onPromptRequest"
  />
</template>

<script setup>
import { AIAssistViewComponent as EjsAiassistview } from "@syncfusion/ej2-vue-interactive-chat";
import { ref } from "vue";

const aiassist = ref(null);

const speechSettings = {
  enable: true,
  onStop: (args) => {
    console.log('Speech recognition stopped');
    console.log('Final text:', args.text);
    console.log('Duration:', args.duration, 'ms');
  }
};

const onPromptRequest = (args) => {
  setTimeout(() => {
    aiassist.value.addPromptResponse('Response: ' + args.prompt);
  }, 1000);
};
</script>
```

### transcriptChanged Event

Triggered when the transcript changes during speech recognition. Fired for both interim results (if enabled) and final results.

**Event Arguments:**
- `args.text` (string) - Current transcript text
- `args.isFinal` (boolean) - True if this is the final result
- `args.confidence` (number) - Confidence score (0-1)

```vue
<template>
  <ejs-aiassistview
    ref="aiassist"
    :speech-to-text-settings="speechSettings"
    :prompt-request="onPromptRequest"
  />
</template>

<script setup>
import { AIAssistViewComponent as EjsAiassistview } from "@syncfusion/ej2-vue-interactive-chat";
import { ref } from "vue";

const aiassist = ref(null);

const speechSettings = {
  enable: true,
  allowInterimResults: true,
  transcriptChanged: (args) => {
    console.log('Transcript:', args.text);
    console.log('Is Final:', args.isFinal);
    console.log('Confidence:', args.confidence);
    
    if (args.isFinal) {
      // Process final transcript
      console.log('Final transcript received');
    }
  }
};

const onPromptRequest = (args) => {
  setTimeout(() => {
    aiassist.value.addPromptResponse('Response: ' + args.prompt);
  }, 1000);
};
</script>
```

### onError Event

Triggered when an error occurs during speech recognition.

**Event Arguments:**
- `args.error` (string) - Error message
- `args.errorCode` (string) - Error code
- `args.message` (string) - Detailed error description

**Common Error Codes:**
- `no-speech` - No speech was detected
- `audio-capture` - Audio capture failed
- `not-allowed` - Microphone access denied
- `network` - Network error
- `aborted` - Recognition was aborted

```vue
<template>
  <ejs-aiassistview
    ref="aiassist"
    :speech-to-text-settings="speechSettings"
    :prompt-request="onPromptRequest"
  />
</template>

<script setup>
import { AIAssistViewComponent as EjsAiassistview } from "@syncfusion/ej2-vue-interactive-chat";
import { ref } from "vue";

const aiassist = ref(null);

const speechSettings = {
  enable: true,
  onError: (args) => {
    console.error('Speech recognition error:', args.error);
    
    // Handle specific errors
    if (args.errorCode === 'not-allowed') {
      alert('Microphone access denied. Please allow microphone access.');
    } else if (args.errorCode === 'no-speech') {
      console.log('No speech detected. Please try again.');
    } else if (args.errorCode === 'network') {
      console.error('Network error. Check your connection.');
    } else {
      console.error('Error:', args.message);
    }
  }
};

const onPromptRequest = (args) => {
  setTimeout(() => {
    aiassist.value.addPromptResponse('Response: ' + args.prompt);
  }, 1000);
};
</script>
```

## Complete Examples

### Full Configuration with All Settings

```vue
<template>
  <div id="container" style="height: 500px; width: 700px;">
    <ejs-aiassistview
      ref="aiassist"
      :speech-to-text-settings="speechSettings"
      :prompt-suggestions="suggestions"
      :prompt-request="onPromptRequest"
    />
  </div>
</template>

<script setup>
import { AIAssistViewComponent as EjsAiassistview } from "@syncfusion/ej2-vue-interactive-chat";
import { ref } from "vue";

const aiassist = ref(null);

const suggestions = [
  "What is AI?",
  "How does speech recognition work?",
  "Tell me about Vue.js"
];

const speechSettings = {
  // Enable speech-to-text
  enable: true,
  disabled: false,
  
  // Recognition settings
  allowInterimResults: true,
  lang: 'en-US',
  
  // Button customization
  buttonSettings: {
    iconCss: 'e-icons e-microphone',
    content: '',
    cssClass: 'custom-speech-btn'
  },
  
  // Tooltip settings
  showTooltip: true,
  tooltipSettings: {
    content: 'Click to start voice input',
    position: 'Top',
    cssClass: 'speech-tooltip'
  },
  
  // Custom styling
  cssClass: 'custom-speech-component',
  
  // Event handlers
  onStart: (args) => {
    console.log('🎤 Started listening...');
  },
  
  onStop: (args) => {
    console.log('🛑 Stopped listening');
    console.log('Final text:', args.text);
  },
  
  transcriptChanged: (args) => {
    console.log('📝 Transcript:', args.text);
    if (args.isFinal) {
      console.log('✅ Final result received');
    }
  },
  
  onError: (args) => {
    console.error('❌ Error:', args.error);
    if (args.errorCode === 'not-allowed') {
      alert('Please allow microphone access to use voice input.');
    }
  }
};

const onPromptRequest = (args) => {
  setTimeout(() => {
    const response = `You said: "${args.prompt}". Processing your request...`;
    aiassist.value.addPromptResponse(response);
  }, 1000);
};
</script>

<style>
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/ai-assistview/index.css";

.custom-speech-btn {
  background-color: #007bff;
  border-radius: 50%;
  padding: 10px;
  transition: all 0.3s ease;
}

.custom-speech-btn:hover {
  background-color: #0056b3;
  transform: scale(1.1);
}

.custom-speech-btn:active {
  background-color: #dc3545;
}

.speech-tooltip {
  background-color: #333;
  color: white;
  padding: 6px 10px;
  border-radius: 4px;
  font-size: 12px;
}
</style>
```

### Real-time Transcript Display

```vue
<template>
  <div style="height: 600px; width: 700px;">
    <div v-if="isListening" style="padding: 10px; background: #e3f2fd; border-radius: 5px; margin-bottom: 10px;">
      <strong>🎤 Listening...</strong>
      <p style="margin: 5px 0;">{{ currentTranscript || 'Speak now...' }}</p>
      <small>Confidence: {{ (confidence * 100).toFixed(0) }}%</small>
    </div>
    
    <ejs-aiassistview
      ref="aiassist"
      :speech-to-text-settings="speechSettings"
      :prompt-request="onPromptRequest"
    />
  </div>
</template>

<script setup>
import { AIAssistViewComponent as EjsAiassistview } from "@syncfusion/ej2-vue-interactive-chat";
import { ref } from "vue";

const aiassist = ref(null);
const isListening = ref(false);
const currentTranscript = ref('');
const confidence = ref(0);

const speechSettings = {
  enable: true,
  allowInterimResults: true,
  
  onStart: () => {
    isListening.value = true;
    currentTranscript.value = '';
    confidence.value = 0;
  },
  
  onStop: () => {
    isListening.value = false;
  },
  
  transcriptChanged: (args) => {
    currentTranscript.value = args.text;
    confidence.value = args.confidence;
  },
  
  onError: (args) => {
    isListening.value = false;
    console.error('Error:', args.error);
  }
};

const onPromptRequest = (args) => {
  setTimeout(() => {
    aiassist.value.addPromptResponse('Response to: ' + args.prompt);
  }, 1000);
};
</script>
```

## Best Practices

### 1. Request Microphone Permission Early

```javascript
// Check and request microphone permission
const requestMicrophonePermission = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    stream.getTracks().forEach(track => track.stop());
    console.log('Microphone access granted');
    return true;
  } catch (error) {
    console.error('Microphone access denied:', error);
    return false;
  }
};

// Check before enabling speech-to-text
const hasPermission = await requestMicrophonePermission();
if (hasPermission) {
  speechSettings.enable = true;
}
```

### 2. Handle Browser Compatibility

```javascript
// Check for speech recognition support
const isSpeechSupported = () => {
  return 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
};

const speechSettings = {
  enable: isSpeechSupported(),
  onError: (args) => {
    if (args.errorCode === 'not-supported') {
      alert('Speech recognition is not supported in this browser. Please use Chrome, Edge, or Safari.');
    }
  }
};
```

### 3. Provide User Feedback

```javascript
const speechSettings = {
  enable: true,
  onStart: () => {
    // Show visual feedback
    console.log('🎤 Listening...');
    // Could update UI to show recording state
  },
  
  transcriptChanged: (args) => {
    // Show real-time transcript
    console.log('Current:', args.text);
  },
  
  onStop: () => {
    // Hide visual feedback
    console.log('✅ Done');
  }
};
```

### 4. Handle Errors Gracefully

```javascript
const speechSettings = {
  enable: true,
  onError: (args) => {
    let message = '';
    
    switch (args.errorCode) {
      case 'not-allowed':
        message = 'Please allow microphone access to use voice input.';
        break;
      case 'no-speech':
        message = 'No speech detected. Please try again.';
        break;
      case 'audio-capture':
        message = 'Microphone not found. Please check your device.';
        break;
      case 'network':
        message = 'Network error. Please check your connection.';
        break;
      default:
        message = 'An error occurred. Please try again.';
    }
    
    // Show error to user
    alert(message);
  }
};
```

### 5. Use Interim Results for Better UX

```javascript
const speechSettings = {
  enable: true,
  allowInterimResults: true,  // Enable for real-time feedback
  
  transcriptChanged: (args) => {
    if (!args.isFinal) {
      // Show interim result in gray or with different styling
      console.log('Interim:', args.text);
    } else {
      // Show final result
      console.log('Final:', args.text);
    }
  }
};
```

### 6. Set Appropriate Language

```javascript
// Detect user's language preference
const userLanguage = navigator.language || 'en-US';

const speechSettings = {
  enable: true,
  lang: userLanguage  // Use browser language
};
```

### 7. Optimize for Mobile Devices

```javascript
// Mobile-specific configuration
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

const speechSettings = {
  enable: true,
  buttonSettings: {
    iconCss: 'e-icons e-microphone',
    cssClass: isMobile ? 'mobile-speech-btn' : 'desktop-speech-btn'
  },
  showTooltip: !isMobile  // Hide tooltip on mobile for cleaner UI
};
```

### 8. Cleanup and Resource Management

```javascript
import { onBeforeUnmount } from "vue";

// Stop recognition when component unmounts
onBeforeUnmount(() => {
  if (aiassist.value?.ej2Instances) {
    const speechInstance = aiassist.value.ej2Instances.speechToTextSettings;
    if (speechInstance && speechInstance.isListening) {
      // Stop recognition
      console.log('Stopping speech recognition');
    }
  }
});
```

---

## Browser Compatibility

Speech-to-text is supported in:
- ✅ Chrome 25+
- ✅ Edge 79+
- ✅ Safari 14.1+
- ❌ Firefox (limited support)
- ✅ Chrome Mobile
- ✅ Safari iOS

**Note:** Always check for browser support before enabling speech recognition.

````