# Globalization & Localization

## Localization

The SpeechToText component can be localized for any culture. By default, its locale is `en-US`. To adapt the component to other languages, use the `L10n.load` method to load translation data for a specific locale.

### Default Text Identifiers

The following table outlines the default text identifiers and their `en-US` values that can be customized:

| Key | Text | Purpose |
|-----|------|---------|
| `abortedError` | Speech recognition was aborted. | Error message for aborted recognition |
| `audioCaptureError` | No microphone detected. Ensure your microphone is connected. | Error message for missing microphone |
| `defaultError` | An unknown error occurred. | Generic error message |
| `networkError` | Network error occurred. Check your internet connection. | Network connectivity error message |
| `noSpeechError` | No speech detected. Please speak into the microphone. | Message for silent input |
| `notAllowedError` | Microphone access denied. Allow microphone permissions. | Microphone permission denial message |
| `serviceNotAllowedError` | Speech recognition service is not allowed in this context. | Service access restriction message |
| `unsupportedBrowserError` | The browser does not support the SpeechRecognition API. | Unsupported browser message |
| `startAriaLabel` | Press to start speaking and transcribe your words | Accessibility label for start button |
| `stopAriaLabel` | Press to stop speaking and end transcription | Accessibility label for stop button |
| `startTooltipText` | Start listening | Tooltip for start button |
| `stopTooltipText` | Stop listening | Tooltip for stop button |

### Setting Locale

Use the `locale` property to specify the language/culture for the component UI:

```vue
<template>
  <div id='container'>
    <ejs-speechtotext id="speechtotext" ref="speechToTextInstance" @transcript-changed="onTranscriptChange" locale="de"></ejs-speechtotext>
    <ejs-textarea v-model="textareaValue" rows="5" cols="50" resizeMode="None" placeholder="Transcribed text will be shown here..."></ejs-textarea>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { SpeechToTextComponent as EjsSpeechtotext, TextAreaComponent as EjsTextarea } from "@syncfusion/ej2-vue-inputs";
import { L10n } from '@syncfusion/ej2-base';

L10n.load({
  'de': {
    "speech-to-text": {
      "abortedError": "Die Spracherkennung wurde abgebrochen.",
      "audioCaptureError": "Kein Mikrofon erkannt. Stellen Sie sicher, dass Ihr Mikrofon angeschlossen ist.",
      "defaultError": "Ein unbekannter Fehler ist aufgetreten.",
      "networkError": "Netzwerkfehler aufgetreten. Überprüfen Sie Ihre Internetverbindung.",
      "noSpeechError": "Keine Sprache erkannt. Bitte sprechen Sie in das Mikrofon.",
      "notAllowedError": "Mikrofonzugriff verweigert. Erlauben Sie Mikrofonberechtigungen.",
      "serviceNotAllowedError": "Der Spracherkennungsdienst ist in diesem Kontext nicht erlaubt.",
      "unsupportedBrowserError": "Der Browser unterstützt die SpeechRecognition API nicht.",
      "startAriaLabel": "Drücken Sie, um zu sprechen und Ihre Worte zu transkribieren",
      "stopAriaLabel": "Drücken Sie, um das Sprechen zu beenden und die Transkription zu stoppen",
      "startTooltipText": "Zuhören starten",
      "stopTooltipText": "Zuhören beenden"
    }
  }
});

const textareaValue = ref('');

const onTranscriptChange = (args) => {
  textareaValue.value = args.transcript;
};

</script>
```

### Localization Examples

Support multiple languages by loading translations for different locales:

```vue
<script setup>
import { L10n } from '@syncfusion/ej2-base';

// Load French translations
L10n.load({
  'fr': {
    "speech-to-text": {
      "abortedError": "La reconnaissance vocale a été interrompue.",
      "noSpeechError": "Aucune parole détectée. Veuillez parler dans le microphone.",
      "startTooltipText": "Commencer à écouter",
      "stopTooltipText": "Arrêter d'écouter"
    }
  }
});

// Load Spanish translations
L10n.load({
  'es': {
    "speech-to-text": {
      "abortedError": "El reconocimiento de voz fue cancelado.",
      "noSpeechError": "No se detectó habla. Por favor, hable en el micrófono.",
      "startTooltipText": "Comenzar a escuchar",
      "stopTooltipText": "Dejar de escuchar"
    }
  }
});
</script>
```

## RTL (Right-to-Left) Support

The Right-to-Left (RTL) feature provides support for languages that are read from right to left, such as Arabic, Hebrew, Persian, or Urdu. Set the `enableRtl` property to `true` to reverse the component's layout and text direction, ensuring proper alignment and readability for RTL cultures.

```vue
<template>
  <div id='container'>
    <ejs-speechtotext id="speechtotext" @transcript-changed="onTranscriptChange" :button-settings="buttonSettings" enable-rtl="true"></ejs-speechtotext>
    <ejs-textarea v-model="textareaValue" rows="5" cols="50" resizeMode="None" placeholder="Transcribed text will be shown here..."></ejs-textarea>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { SpeechToTextComponent as EjsSpeechtotext, TextAreaComponent as EjsTextarea } from "@syncfusion/ej2-vue-inputs";

const textareaValue = ref('');

const buttonSettings = {
  content: 'Start Listening',
  stopContent: 'Stop Listening'
};

const onTranscriptChange = (args) => {
  textareaValue.value = args.transcript;
};

</script>
```

### RTL with Arabic Localization

Combine RTL support with Arabic translations for complete localization:

```vue
<script setup>
import { L10n } from '@syncfusion/ej2-base';

L10n.load({
  'ar': {
    "speech-to-text": {
      "startTooltipText": "ابدأ الاستماع",
      "stopTooltipText": "إيقاف الاستماع",
      "noSpeechError": "لم يتم اكتشاف أي كلام. يرجى الكلام في الميكروفون."
    }
  }
});
</script>

<template>
  <ejs-speechtotext locale="ar" enable-rtl="true"></ejs-speechtotext>
</template>
```

### Supported RTL Languages

RTL support is beneficial for:
- Arabic (ar)
- Hebrew (he)
- Persian/Farsi (fa)
- Urdu (ur)
- Other right-to-left scripts

## Multi-Language Application

To support multiple languages in your application, dynamically set the locale based on user selection:

```vue
<template>
  <div id='container'>
    <div>
      <label>Select Language: </label>
      <select v-model="selectedLocale">
        <option value="en">English</option>
        <option value="de">German</option>
        <option value="fr">French</option>
        <option value="ar">Arabic</option>
      </select>
    </div>
    <ejs-speechtotext 
      id="speechtotext" 
      :locale="selectedLocale" 
      :enable-rtl="isRtlLanguage"
      @transcript-changed="onTranscriptChange"
    ></ejs-speechtotext>
    <ejs-textarea v-model="textareaValue" rows="5" cols="50" resizeMode="None"></ejs-textarea>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { SpeechToTextComponent as EjsSpeechtotext, TextAreaComponent as EjsTextarea } from "@syncfusion/ej2-vue-inputs";
import { L10n } from '@syncfusion/ej2-base';

const selectedLocale = ref('en');
const textareaValue = ref('');

const isRtlLanguage = computed(() => {
  return selectedLocale.value === 'ar';
});

const onTranscriptChange = (args) => {
  textareaValue.value = args.transcript;
};
</script>
```
