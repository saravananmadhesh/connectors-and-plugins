# Templates and Localization

## Table of Contents
- [Editor Template](#editor-template)
- [Response Template](#response-template)
- [Localization Overview](#localization-overview)
- [Setting Locale](#setting-locale)
- [Custom Localization](#custom-localization)
- [RTL Support](#rtl-support)
- [Complete Examples](#complete-examples)

## Editor Template

The `editorTemplate` property customizes the default footer area where users enter prompts. Use this to create unique footers and manage prompt request actions.

### Basic Editor Template

```vue
<template>
  <div style="height: 400px; width: 700px; margin: 0 auto;">
    <div id="editor-template"></div>
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

function footerContent() {
  return `<div class="custom-footer">
            <textarea id="promptTextArea" class="e-input" rows="2" placeholder="Enter your prompt here"></textarea>
            <button id="sendPrompt" class="e-btn e-primary">Generate</button>
          </div>`;
}

let inlineAIAssist;
let docHandler;

enableRipple(true);

onMounted(() => {
  inlineAIAssist = new InlineAIAssist({
    editorTemplate: footerContent,
    relateTo: '#summarizeBtn',
    promptRequest: () => {
      setTimeout(() => {
        const defaultResponse = 'Connect to your AI service for real responses.';
        inlineAIAssist.addResponse(defaultResponse);
      }, 1000);
    },
    responseSettings: {
      itemSelect: (args) => {
        if (args.command.label === 'Accept') {
          const editable = document.getElementById('editableText');
          if (editable) {
            editable.innerHTML = '<p>' + inlineAIAssist.prompts[inlineAIAssist.prompts.length - 1].response + '</p>';
          }
          inlineAIAssist.hidePopup();
        } else if (args.command.label === 'Discard') {
          inlineAIAssist.hidePopup();
        }
      }
    }
  });

  inlineAIAssist.appendTo('#editor-template');

  const summarizeBtn = document.querySelector('#summarizeBtn');
  if (summarizeBtn) {
    summarizeBtn.addEventListener('click', () => {
      inlineAIAssist.showPopup();
    });
  }

  docHandler = (event) => {
    if (event.target && event.target.id === 'sendPrompt') {
      const textArea = document.getElementById('promptTextArea');
      if (textArea) {
        inlineAIAssist.executePrompt(textArea.value);
        textArea.value = '';
      }
    }
  };
  document.addEventListener('click', docHandler);
});

onBeforeUnmount(() => {
  if (inlineAIAssist) {
    try { inlineAIAssist.destroy(); } catch (e) { console.warn(e); }
    inlineAIAssist = null;
  }
  if (docHandler) {
    document.removeEventListener('click', docHandler);
    docHandler = null;
  }
});
</script>
```

### Custom Editor Template with Styling

```javascript
function customFooterTemplate() {
  return `<div style="padding: 12px; background: #f5f5f5; border-radius: 4px;">
            <textarea 
              id="customPrompt" 
              class="e-input" 
              rows="3" 
              placeholder="Type your prompt here..."
              style="width: 100%; margin-bottom: 8px; resize: none;">
            </textarea>
            <div style="display: flex; gap: 8px; justify-content: flex-end;">
              <button id="clearBtn" class="e-btn">Clear</button>
              <button id="submitBtn" class="e-btn e-primary">Submit</button>
            </div>
          </div>`;
}
```

## Response Template

The `responseTemplate` property customizes how responses are displayed. Create custom response layouts and styling.

### Basic Response Template

```javascript
function responseTemplate(props) {
  return `<div class="custom-response">
            <p>${props.response}</p>
            <div class="response-meta">
              <small>Generated at: ${new Date().toLocaleTimeString()}</small>
            </div>
          </div>`;
}
```

## Localization Overview

The Inline AI Assist supports multiple languages and cultural settings. Default strings can be localized using the `L10n` utility from Syncfusion.

## Setting Locale

Use the `locale` property to set the component's language.

### Basic Locale Setup

```vue
<template>
  <div style="height: 350px; width: 650px; margin: 0 auto;">
    <br />
    <button @click="showPopup">Open Inline AI Assist (de)</button>
    <div id="editableText" contenteditable="true" 
         style="min-height:80px; border:1px solid #ccc; padding:8px; margin-top:8px;">
      Editable content goes here.
    </div>
    <ejs-inlineaiassist 
      relate-to="#summarizeBtn"
      popup-width="500px"
      :prompt-request="onPromptRequest"
      :response-settings="responseSettings"
      locale="de"
      ref="inlineAiAssist">
    </ejs-inlineaiassist>
  </div>
</template>

<script setup>
import { InlineAIAssistComponent as EjsInlineaiassist } from "@syncfusion/ej2-vue-interactive-chat";
import { ref } from "vue";
import { L10n } from '@syncfusion/ej2-base';

// Load German locale
L10n.load({
  de: {
    "inline-ai-assist": {
      send: "Senden",
      stopResponseText: "Antwort stoppen"
    }
  }
});

let inlineAiAssist = ref(null);

const responseSettings = {
  itemSelect: (args) => {
    if (args.command.label === 'Accept') {
      const editable = document.getElementById('editableText');
      if (editable && inlineAiAssist.value?.prompts) {
        editable.innerHTML = '<p>' + inlineAiAssist.value.prompts[inlineAiAssist.value.prompts.length - 1].response + '</p>';
      }
      inlineAiAssist.value?.hidePopup();
    } else if (args.command.label === 'Discard') {
      inlineAiAssist.value?.hidePopup();
    }
  }
};

const onPromptRequest = () => {
  setTimeout(() => {
    const defaultResponse = 'Verbinden Sie sich mit einem KI-Dienst für echte Antworten.';
    inlineAiAssist.value?.addResponse(defaultResponse);
  }, 1000);
};

const showPopup = () => {
  inlineAiAssist.value?.showPopup();
};
</script>
```

## Custom Localization

Define custom locale strings for your application's languages.

### Multi-Language Support

```vue
<script setup>
import { L10n } from '@syncfusion/ej2-base';

// Define multiple locales
L10n.load({
  'de': {
    'inline-ai-assist': {
      send: 'Senden',
      stopResponseText: 'Antwort stoppen',
      thinkingIndicator: 'Denken',
      editingIndicator: 'Bearbeitung'
    }
  },
  'fr': {
    'inline-ai-assist': {
      send: 'Envoyer',
      stopResponseText: 'Arrêter la réponse',
      thinkingIndicator: 'Penser',
      editingIndicator: 'Édition'
    }
  },
  'es': {
    'inline-ai-assist': {
      send: 'Enviar',
      stopResponseText: 'Detener respuesta',
      thinkingIndicator: 'Pensando',
      editingIndicator: 'Edición'
    }
  }
});
</script>
```

### Localizable String Keys

| Key | Default | Purpose |
|-----|---------|---------|
| `send` | Send | Button text to submit prompt |
| `stopResponseText` | Stop Responding | Text when stopping response generation |
| `thinkingIndicator` | Thinking | Text shown while processing |
| `editingIndicator` | Editing | Text shown during editing |

## RTL Support

Enable Right-to-Left (RTL) layout for languages that read right to left (Arabic, Hebrew, etc.).

### Enabling RTL

```vue
<template>
  <div dir="rtl" style="height: 350px; width: 650px; margin: 0 auto;">
    <br />
    <button @click="showPopup">فتح مساعد الذكاء الاصطناعي</button>
    <ejs-inlineaiassist 
      relate-to="#btn"
      popup-width="500px"
      :prompt-request="onPromptRequest"
      :response-settings="responseSettings"
      enable-rtl="true"
      locale="ar"
      ref="inlineAiAssist">
    </ejs-inlineaiassist>
  </div>
</template>

<script setup>
import { InlineAIAssistComponent as EjsInlineaiassist } from "@syncfusion/ej2-vue-interactive-chat";
import { ref } from "vue";
import { L10n } from '@syncfusion/ej2-base';

L10n.load({
  ar: {
    'inline-ai-assist': {
      send: 'إرسال',
      stopResponseText: 'إيقاف الاستجابة',
      thinkingIndicator: 'تفكير',
      editingIndicator: 'تحرير'
    }
  }
});

let inlineAiAssist = ref(null);

const responseSettings = {
  itemSelect: (args) => {
    if (args.command.label === 'Accept') {
      inlineAiAssist.value?.hidePopup();
    }
  }
};

const onPromptRequest = () => {
  setTimeout(() => {
    const response = 'استجابة باللغة العربية';
    inlineAiAssist.value?.addResponse(response);
  }, 1000);
};

const showPopup = () => {
  inlineAiAssist.value?.showPopup();
};
</script>
```

## Complete Examples

### Example: Localized Component with Custom Editor Template

```vue
<template>
  <div style="height: 450px; width: 700px; margin: 0 auto;">
    <div id="component"></div>
    <button id="openBtn" @click="showPopup">Open (Locale: {{ currentLocale }})</button>
    <select @change="switchLocale" v-model="currentLocale">
      <option value="en">English</option>
      <option value="de">Deutsch</option>
      <option value="fr">Français</option>
    </select>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { InlineAIAssist } from '@syncfusion/ej2-interactive-chat';
import { L10n } from '@syncfusion/ej2-base';

const currentLocale = ref('en');
let inlineAIAssist;

L10n.load({
  de: {
    'inline-ai-assist': {
      send: 'Senden',
      stopResponseText: 'Antwort stoppen'
    }
  },
  fr: {
    'inline-ai-assist': {
      send: 'Envoyer',
      stopResponseText: 'Arrêter la réponse'
    }
  }
});

const switchLocale = () => {
  if (inlineAIAssist) {
    inlineAIAssist.locale = currentLocale.value;
    inlineAIAssist.refresh();
  }
};

const showPopup = () => {
  inlineAIAssist?.showPopup();
};

onMounted(() => {
  inlineAIAssist = new InlineAIAssist({
    locale: currentLocale.value,
    relateTo: '#openBtn',
    promptRequest: () => {
      setTimeout(() => {
        inlineAIAssist.addResponse('Localized response');
      }, 1000);
    }
  });
  inlineAIAssist.appendTo('#component');
});

onBeforeUnmount(() => {
  if (inlineAIAssist) {
    inlineAIAssist.destroy();
  }
});
</script>
```
