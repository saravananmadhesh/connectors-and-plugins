# Text to Speech in Vue AI AssistView Component

The Syncfusion Vue AI AssistView component provides built-in `Text-to-Speech` (TTS) support using the browser's Web Speech API, specifically the `SpeechSynthesisUtterance` interface. This allows AI-generated responses to be converted into spoken audio, enhancing accessibility and user interaction.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Configure Text to Speech](#configure-text-to-speech)
- [Customizing Speech Settings](#customizing-speech-settings)
- [TextToSpeechSettings Reference](#texttospeechsettings-reference)
- [Language Support](#language-support)
- [Browser Compatibility](#browser-compatibility)
- [Best Practices](#best-practices)
- [Advanced Example: Custom Voice Selection](#advanced-example-custom-voice-selection)
- [Troubleshooting](#troubleshooting)

## Prerequisites

Before integrating `Text-to-Speech`, ensure the following:

1. The Syncfusion AI AssistView component is properly set up in your Vue application.
    - [Vue Getting Started Guide](getting-started.md)

2. The AI AssistView component is integrated with [Azure OpenAI](https://azure.microsoft.com/en-us/products/ai-foundry/models/openai/) or another AI service.
    - [Integration of Azure OpenAI With Vue AI AssistView component](ai-integration.md)

## Configure Text to Speech

To enable the built-in Text-to-Speech functionality, add the `e-assist-audio` response toolbar item to the `items` collection of the `responseToolbarSettings` property. When clicked, it fetches the plain text from the generated AI response and uses the browser's SpeechSynthesis API to read it aloud.

```vue
<template>
  <div class="integration-texttospeech-section">
    <ejs-aiassistview
      id="aiAssistView"
      ref="aiAssist"
      bannerTemplate="bannerTemplate"
      :prompt-request="onPromptRequest"
      :toolbarSettings="toolbarSettings"
      :responseToolbarSettings="responseToolbarSettings"
      :stop-responding-click="stopRespondingClick"
    >
      <template v-slot:bannerTemplate="">
        <div class="banner-content">
          <div class="e-icons e-audio"></div>
          <i>Ready to assist voice enabled !</i>
        </div>
      </template>
    </ejs-aiassistview>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { AIAssistViewComponent as EjsAiassistview } from '@syncfusion/ej2-vue-interactive-chat';
import { marked } from 'marked';

const azureOpenAIApiKey = ''; // YOUR_AZURE_OPENAI_API_KEY
const azureOpenAIEndpoint = ''; // YOUR_AZURE_OPENAI_API_ENDPOINT
const azureOpenAIApiVersion = ''; // YOUR_AZURE_OPENAI_API_VERSION
const azureDeploymentName = ''; // YOUR_DEPLOYMENT_NAME

const stopStreaming = ref(false);
const currentUtterance = ref(null);
const toolbarSettings = {
  items: [
    {
      iconCss: 'e-icons e-refresh',
      align: 'Right',
      tooltip: 'Clear Prompts',
    },
  ],
  itemClicked: () => {
    aiAssist.value.ej2Instances.prompts = [];
    stopStreaming.value = true;
  },
};
const responseToolbarSettings = {
  items: [
      { type: 'Button', iconCss: 'e-icons e-assist-copy', tooltip: 'Copy' },
      { type: 'Button', iconCss: 'e-icons e-audio', tooltip: 'Read Aloud' },
      { type: 'Button', iconCss: 'e-icons e-assist-like', tooltip: 'Like' },
      { type: 'Button', iconCss: 'e-icons e-assist-dislike', tooltip: 'Need Improvement' },
  ],
  itemClicked: (args) => onResponseToolbarItemClicked(args)
};

const aiAssist = ref(null);

// Streams the AI response character by character to create a typing effect
const streamResponse = async (response) => {
  let lastResponse = '';
  const responseUpdateRate = 10;
  let i = 0;
  const responseLength = response.length;
  while (i < responseLength && !stopStreaming.value) {
    lastResponse += response[i];
    i++;
    if (i % responseUpdateRate === 0 || i === responseLength) {
      const htmlResponse = marked.parse(lastResponse);
      aiAssist.value.ej2Instances.addPromptResponse(
        htmlResponse,
        i === responseLength
      );
      aiAssist.value.ej2Instances.scrollToBottom();
    }
    await new Promise((resolve) => setTimeout(resolve, 15)); // Delay for streaming effect
  }
};

// Handles prompt requests by sending them to the Azure OpenAI API and streaming the response
const onPromptRequest = (args) => {
    const url= azureOpenAIEndpoint.replace(/\/$/, '') +
    `/openai/deployments/${encodeURIComponent(azureDeploymentName)}/chat/completions` +
    `?api-version=${encodeURIComponent(azureOpenAIApiVersion)}`;
    fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': azureOpenAIApiKey,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: args.prompt }],
      max_tokens: 150,
      stream: false,
    }),
  })
    .then(response => response.json())
    .then(reply => {
      const responseText = reply.choices[0].message.content.trim() || 'No response received.';
      stopStreaming.value = false;
      streamResponse(responseText);
    })
    .catch(error => {
      aiAssist.value.ej2Instances.addPromptResponse(
        '⚠️ Something went wrong while connecting to the AI service. Please check your API key, Deployment model, endpoint or try again later.',true);
      stopStreaming.value = true;
    });
};

// Stops the ongoing streaming response
const stopRespondingClick = () => {
  stopStreaming.value = true;
};

// Handles clicks on response toolbar items, such as copying, reading aloud, liking, or disliking the response
const onResponseToolbarItemClicked = (args) => {
    const responseHtml = aiAssist.value.ej2Instances.prompts[args.dataIndex].response;
    if (responseHtml) {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = responseHtml;
        const text = (tempDiv.textContent || tempDiv.innerText || '').trim();
        if (args.item.iconCss === 'e-icons e-audio' || args.item.iconCss === 'e-icons e-assist-stop') {
            if (currentUtterance.value) {
                speechSynthesis.cancel();
                currentUtterance.value = null;
                aiAssist.value.ej2Instances.responseToolbarSettings.items[1].iconCss = 'e-icons e-audio';
                aiAssist.value.ej2Instances.responseToolbarSettings.items[1].tooltip = 'Read Aloud';
            } else {
                const utterance = new SpeechSynthesisUtterance(text);
                utterance.onend = () => {
                    currentUtterance.value = null;
                    aiAssist.value.ej2Instances.responseToolbarSettings.items[1].iconCss = 'e-icons e-audio';
                    aiAssist.value.ej2Instances.responseToolbarSettings.items[1].tooltip = 'Read Aloud';
                };
                speechSynthesis.speak(utterance);
                currentUtterance.value = utterance;
                aiAssist.value.ej2Instances.responseToolbarSettings.items[1].iconCss = 'e-icons e-assist-stop';
                aiAssist.value.ej2Instances.responseToolbarSettings.items[1].tooltip = 'Stop';
            }
        }
    }
};
</script>

<style>

@import "../node_modules/@syncfusion/ej2-material3-theme/styles/ai-assistview/index.css";

</style>
```

## Customizing Speech Settings

You can use the `textToSpeechSettings` property to customize the speech synthesis behavior using the following available properties such as `language`, `speechPitch`, `speechRate`, `volume` and `voice`.

```vue
<template>
  <div id='container' style="height: 350px; width: 650px; margin: 0 auto;">
    <br>
    <ejs-aiassistview 
      id='aiAssistView' 
      ref="aiassist" 
      :prompts="promptsData"
      :responseToolbarSettings="responseToolbarSettings"
      :textToSpeechSettings="textToSpeechSettings"
      :prompt-request="onPromptRequest"
    ></ejs-aiassistview>
  </div>
</template>

<script setup>
import { AIAssistViewComponent as EjsAiassistview } from "@syncfusion/ej2-vue-interactive-chat";
import { ref } from "vue";

let aiassist = ref(null);

const promptsData = [
  {
    prompt: "What is AI?",
    response: "AI stands for Artificial Intelligence, enabling machines to mimic human intelligence for tasks such as learning, problem-solving, and decision-making."
  }
];

const responseToolbarSettings = {
  items: [
    { type: 'Button', iconCss: 'e-icons e-assist-audio', tooltip: 'Read Aloud' },
    { type: 'Button', iconCss: 'e-icons e-assist-like', tooltip: 'Like' },
    { type: 'Button', iconCss: 'e-icons e-assist-dislike', tooltip: 'Need Improvement' }
  ]
};

const textToSpeechSettings = {
  language: 'en-US',
  speechPitch: 1,
  speechRate: 1,
  volume: 1
};

const onPromptRequest = (args) => {
  setTimeout(() => {
    let defaultResponse = 'For real-time prompt processing, connect the AIAssistView component to your preferred AI service, such as OpenAI or Azure Cognitive Services.';
    aiassist.value.ej2Instances.addPromptResponse(defaultResponse);
  }, 1000);
};
</script>

<style>
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/ai-assistview/index.css";
</style>

```

## TextToSpeechSettings Reference

Configure speech synthesis behavior with the following properties:

| Property | Type | Default | Description |
|---|---|---|---|
| `language` | `string` | `'en-US'` | Language code for voice output (e.g., 'en-US', 'es-ES', 'fr-FR'). |
| `speechPitch` | `number` | `1` | Controls pitch of voice (0.1 to 2.0). Lower values = deeper voice, higher values = higher pitch. |
| `speechRate` | `number` | `1` | Controls speed of speech (0.1 to 10). Lower values = slower, higher values = faster. |
| `volume` | `number` | `1` | Controls volume level (0 to 1). 0 = silent, 1 = full volume. |
| `voice` | `string` | Browser default | Specific voice to use. Varies by browser and installed voices. |

## Language Support

Common language codes for `language` property:

| Language | Code | Language | Code |
|---|---|---|---|
| English (US) | `en-US` | Spanish (Spain) | `es-ES` |
| English (UK) | `en-GB` | French | `fr-FR` |
| German | `de-DE` | Italian | `it-IT` |
| Portuguese | `pt-BR` | Russian | `ru-RU` |
| Chinese (Mandarin) | `zh-CN` | Japanese | `ja-JP` |
| Korean | `ko-KR` | Hindi | `hi-IN` |

## Browser Compatibility

Text-to-Speech is supported on:
- ✅ Chrome/Edge (all versions)
- ✅ Firefox (43+)
- ✅ Safari (14.1+)
- ✅ Opera (27+)
- ⚠️ Internet Explorer (Not supported)

> Note: Available voices and languages vary by operating system and browser. Test your target languages in your deployment environment.

## Best Practices

1. **Check browser support** - Verify `speechSynthesis` API availability before enabling TTS
2. **Provide user control** - Always allow users to pause/stop audio playback
3. **Display status** - Show visual feedback (icons) indicating playback state
4. **Extract plain text** - Remove HTML markup from responses before converting to speech
5. **Test audio quality** - Test voice output across different browsers and devices
6. **Respect user preferences** - Allow customization of pitch, rate, and language
7. **Handle errors gracefully** - Catch speech synthesis errors and provide fallbacks
8. **Consider accessibility** - TTS improves accessibility for visually impaired users

## Advanced Example: Custom Voice Selection

```vue
<template>
  <div>
    <select v-model="selectedVoice">
      <option v-for="voice in availableVoices" :key="voice" :value="voice">
        {{ voice }}
      </option>
    </select>
    <ejs-aiassistview 
      :responseToolbarSettings="responseToolbarSettings"
      :textToSpeechSettings="textToSpeechSettings"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const selectedVoice = ref("");
const availableVoices = ref([]);

const textToSpeechSettings = ref({
  language: 'en-US',
  speechPitch: 1,
  speechRate: 1,
  volume: 1,
  voice: selectedVoice
});

onMounted(() => {
  // Get available voices from the browser
  const synth = window.speechSynthesis;
  synth.onvoiceschanged = () => {
    availableVoices.value = synth.getVoices().map(v => v.name);
    if (availableVoices.value.length > 0) {
      selectedVoice.value = availableVoices.value[0];
    }
  };
});
</script>
```

## Troubleshooting

### Audio Not Playing
- Verify browser supports Web Speech API
- Check if browser/system has audio output enabled
- Ensure response text is not empty before calling speech synthesis

### Voice Quality Issues
- Try different `speechRate` values (0.8 to 1.2 often sounds natural)
- Adjust `speechPitch` if voice sounds unnatural
- Test with different system voices via browser settings

### Language Not Working
- Verify language code is correct for your browser/OS
- Check if language is installed on the system
- Fallback to `en-US` if desired language is unavailable
