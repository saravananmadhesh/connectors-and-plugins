# Advanced Patterns and Workflows

## Custom Styling with cssClass

The `cssClass` property allows you to apply one or more custom CSS classes to the root element of the component. Use this for custom styling, theming, or integrating with your design system.

### Single CSS Class

```vue
<template>
  <div style="height: 350px; width: 650px; margin: 0 auto;">
    <br />
    <button @click="showPopup">Open Styled Assistant</button>
    <ejs-inlineaiassist 
      css-class="custom-ai-assist"
      relate-to="#btn"
      :prompt-request="onPromptRequest"
      ref="inlineAiAssist">
    </ejs-inlineaiassist>
  </div>
</template>

<script setup>
import { InlineAIAssistComponent as EjsInlineaiassist } from "@syncfusion/ej2-vue-interactive-chat";
import { ref } from "vue";

let inlineAiAssist = ref(null);

const onPromptRequest = () => {
  setTimeout(() => {
    inlineAiAssist.value?.addResponse('Styled response');
  }, 1000);
};

const showPopup = () => {
  inlineAiAssist.value?.showPopup();
};
</script>

<style>
.custom-ai-assist {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.custom-ai-assist .e-prompt-input {
  border: 2px solid #4CAF50;
  border-radius: 8px;
  padding: 12px;
}

.custom-ai-assist .e-response-area {
  background-color: #f0f8ff;
  padding: 16px;
  border-radius: 8px;
}
</style>
```

### Multiple CSS Classes

```vue
<template>
  <ejs-inlineaiassist 
    css-class="custom-theme dark-mode elevated"
    ref="inlineAiAssist">
  </ejs-inlineaiassist>
</template>

<style>
.custom-theme {
  --primary-color: #2196F3;
  --secondary-color: #FFC107;
}

.dark-mode {
  background-color: #1e1e1e;
  color: #ffffff;
}

.elevated {
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}
</style>
```

### Dynamic CSS Classes

```vue
<template>
  <div>
    <button @click="toggleTheme">Toggle Theme</button>
    <ejs-inlineaiassist 
      :css-class="currentThemeClass"
      ref="inlineAiAssist">
    </ejs-inlineaiassist>
  </div>
</template>

<script setup>
const currentThemeClass = ref('light-theme');

const toggleTheme = () => {
  currentThemeClass.value = currentThemeClass.value === 'light-theme' 
    ? 'dark-theme' 
    : 'light-theme';
};
</script>

<style>
.light-theme {
  background-color: #ffffff;
  color: #000000;
}

.dark-theme {
  background-color: #2d2d2d;
  color: #ffffff;
}
</style>
```

## Component Mounting with target

The `target` property specifies where the InlineAIAssist component will be appended in the DOM. By default, it appends to `document.body`, but you can specify a custom container.

### Default Behavior

```vue
<template>
  <!-- Appends to document.body by default -->
  <ejs-inlineaiassist ref="inlineAiAssist"></ejs-inlineaiassist>
</template>
```

### Custom Target Container

```vue
<template>
  <div id="app-container">
    <div id="custom-target" style="position: relative; height: 500px;">
      <h3>Custom Container</h3>
      <button @click="showPopup">Open Assistant</button>
    </div>
    <ejs-inlineaiassist 
      target="#custom-target"
      relate-to="#btn"
      :prompt-request="onPromptRequest"
      ref="inlineAiAssist">
    </ejs-inlineaiassist>
  </div>
</template>

<script setup>
import { InlineAIAssistComponent as EjsInlineaiassist } from "@syncfusion/ej2-vue-interactive-chat";
import { ref } from "vue";

let inlineAiAssist = ref(null);

const onPromptRequest = () => {
  setTimeout(() => {
    inlineAiAssist.value?.addResponse('Response in custom container');
  }, 1000);
};

const showPopup = () => {
  inlineAiAssist.value?.showPopup();
};
</script>
```

### Target vs relateTo

| Property | Purpose | Example |
|----------|---------|---------|
| **target** | Where component is appended in DOM | `target="#container"` - component lives inside this element |
| **relateTo** | Where popup is positioned relative to | `relateTo="#button"` - popup appears near this element |

### Using HTMLElement Reference

```vue
<script setup>
const containerRef = ref(null);

onMounted(() => {
  // Use actual DOM element reference
  if (containerRef.value && inlineAiAssist.value) {
    // Target can be set to an HTMLElement
  }
});
</script>

<template>
  <div ref="containerRef">
    <ejs-inlineaiassist 
      target="body"
      ref="inlineAiAssist">
    </ejs-inlineaiassist>
  </div>
</template>
```

## Z-Index Configuration

The `zIndex` property controls the stacking order of the popup overlay. Use this when you have multiple overlays or need to ensure the component appears above other UI elements.

### Default Z-Index

The default z-index is `1000`. This works for most scenarios.

### Custom Z-Index

```vue
<template>
  <div style="height: 350px; width: 650px; margin: 0 auto;">
    <div class="modal" style="z-index: 1500;">
      <!-- Modal content -->
      <button @click="showPopup">Open AI Assistant</button>
    </div>
    <ejs-inlineaiassist 
      z-index="2000"
      relate-to="#btn"
      :prompt-request="onPromptRequest"
      ref="inlineAiAssist">
    </ejs-inlineaiassist>
  </div>
</template>

<script setup>
import { InlineAIAssistComponent as EjsInlineaiassist } from "@syncfusion/ej2-vue-interactive-chat";
import { ref } from "vue";

let inlineAiAssist = ref(null);

const onPromptRequest = () => {
  setTimeout(() => {
    inlineAiAssist.value?.addResponse('High z-index response');
  }, 1000);
};

const showPopup = () => {
  inlineAiAssist.value?.showPopup();
};
</script>
```

### Dynamic Z-Index

```vue
<script setup>
const currentZIndex = ref(1000);

const bringToFront = () => {
  currentZIndex.value = 9999;
};

const resetZIndex = () => {
  currentZIndex.value = 1000;
};
</script>

<template>
  <div>
    <button @click="bringToFront">Bring to Front</button>
    <button @click="resetZIndex">Reset Z-Index</button>
    <ejs-inlineaiassist 
      :z-index="currentZIndex"
      ref="inlineAiAssist">
    </ejs-inlineaiassist>
  </div>
</template>
```

### Z-Index Best Practices

| Scenario | Recommended Z-Index |
|----------|-------------------|
| Normal popup | 1000 (default) |
| Above modal dialogs | 1500-2000 |
| Above navigation bars | 1100-1200 |
| Highest priority overlay | 9999 |

## State Persistence

The `enablePersistence` property enables automatic saving and restoring of component state across page reloads. When enabled, the component remembers prompt history, configuration, and user preferences.

### Enabling Persistence

```vue
<template>
  <div style="height: 350px; width: 650px; margin: 0 auto;">
    <br />
    <button @click="showPopup">Open Assistant (with persistence)</button>
    <ejs-inlineaiassist 
      enable-persistence="true"
      relate-to="#btn"
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

const onPromptRequest = () => {
  setTimeout(() => {
    const response = 'This prompt history will be saved and restored on page reload.';
    inlineAiAssist.value?.addResponse(response);
  }, 1000);
};

const showPopup = () => {
  inlineAiAssist.value?.showPopup();
};
</script>
```

### What Gets Persisted

When `enablePersistence` is `true`, the following state is saved:

- Prompt-response collection (`prompts`)
- Current prompt text
- Component visibility state
- Custom configuration changes

### Storage Location

State is stored in browser's `localStorage` under a component-specific key.

### Clearing Persisted State

```vue
<script setup>
const clearPersistedData = () => {
  // Clear all Syncfusion component persistence
  localStorage.removeItem('ej2-inlineaiassist');
  
  // Reload component to reflect changes
  if (inlineAiAssist.value) {
    inlineAiAssist.value.refresh();
  }
};
</script>

<template>
  <button @click="clearPersistedData">Clear Saved State</button>
</template>
```

### Conditional Persistence

```vue
<script setup>
const shouldPersist = ref(false);

const togglePersistence = () => {
  shouldPersist.value = !shouldPersist.value;
  console.log('Persistence:', shouldPersist.value ? 'ON' : 'OFF');
};
</script>

<template>
  <div>
    <label>
      <input type="checkbox" v-model="shouldPersist" @change="togglePersistence" />
      Remember my session
    </label>
    <ejs-inlineaiassist 
      :enable-persistence="shouldPersist"
      ref="inlineAiAssist">
    </ejs-inlineaiassist>
  </div>
</template>
```

## Table of Contents
- [Custom Styling with cssClass](#custom-styling-with-cssclass)
- [Component Mounting with target](#component-mounting-with-target)
- [Z-Index Configuration](#z-index-configuration)
- [State Persistence](#state-persistence)
- [Positioning with relateTo](#positioning-with-relateto)
- [Popup Sizing and Dimension](#popup-sizing-and-dimension)
- [Integration with Contenteditable](#integration-with-contenteditable)
- [Common Workflows](#common-workflows)
- [Edge Cases and Error Handling](#edge-cases-and-error-handling)
- [Best Practices](#best-practices)
- [Voice Input with Speech-to-Text](#voice-input-with-speech-to-text)

## Positioning with relateTo

The `relateTo` property positions the Inline AI Assist popup relative to a specific DOM element. It accepts either a CSS selector string or an HTMLElement.

### Using CSS Selector

```vue
<template>
  <div style="height: 350px; width: 650px; margin: 0 auto;">
    <br />
    <button id="summarizeBtn" @click="showPopup">
      Summarize
    </button>
    <div id="editableText" contenteditable="true" 
         style="min-height:80px; border:1px solid #ccc; padding:8px; margin-top:8px;">
      Editable content goes here.
    </div>
    <ejs-inlineaiassist 
      relate-to="#summarizeBtn"
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

const onPromptRequest = () => {
  setTimeout(() => {
    const response = 'Response content';
    inlineAiAssist.value?.addResponse(response);
  }, 1000);
};

const showPopup = () => {
  inlineAiAssist.value?.showPopup();
};
</script>
```

### Using HTMLElement Reference

```vue
<script setup>
const targetElement = ref(null);

const showPopupAtElement = () => {
  if (targetElement.value) {
    // Component will position relative to targetElement
    inlineAiAssist.value?.showPopup();
  }
};
</script>
```

### Relative Positioning with Container

```vue
<template>
  <div class="container" style="position: relative; height: 400px;">
    <button id="triggerBtn" @click="showPopup">
      Open Here
    </button>
    <ejs-inlineaiassist 
      relate-to="#triggerBtn"
      popup-width="500px"
      :prompt-request="onPromptRequest"
      ref="inlineAiAssist">
    </ejs-inlineaiassist>
  </div>
</template>
```

## Popup Sizing and Dimension

Control popup width and height for different use cases. Both `popupWidth` and `popupHeight` can be configured at the root level or within specific settings like `commandSettings`.

### Root-Level Popup Dimensions

Configure the main popup dimensions using root-level properties:

```vue
<template>
  <div style="height: 400px; width: 700px; margin: 0 auto;">
    <br />
    <button @click="showPopup">Open Assistant</button>
    <ejs-inlineaiassist 
      popup-width="600px"
      popup-height="400px"
      relate-to="#btn"
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

const onPromptRequest = () => {
  setTimeout(() => {
    inlineAiAssist.value?.addResponse('Response in custom-sized popup');
  }, 1000);
};

const showPopup = () => {
  inlineAiAssist.value?.showPopup();
};
</script>
```

### popupHeight Property

The `popupHeight` property sets the height of the main response popup container:

**Default:** `'auto'` (adjusts to content)

**Accepted Values:**
- CSS units: `'300px'`, `'50vh'`, `'80%'`
- Number (pixels): `400` (treated as 400px)
- `'auto'` (fits content)

```vue
<template>
  <!-- Fixed height -->
  <ejs-inlineaiassist popup-height="350px"></ejs-inlineaiassist>
  
  <!-- Viewport-relative height -->
  <ejs-inlineaiassist popup-height="60vh"></ejs-inlineaiassist>
  
  <!-- Auto height -->
  <ejs-inlineaiassist popup-height="auto"></ejs-inlineaiassist>
  
  <!-- Numeric value (pixels) -->
  <ejs-inlineaiassist :popup-height="400"></ejs-inlineaiassist>
</template>
```

### popupWidth Property

The `popupWidth` property sets the width of the main response popup container:

**Default:** `'400px'`

**Accepted Values:**
- CSS units: `'500px'`, `'50vw'`, `'80%'`
- Number (pixels): `600` (treated as 600px)

```vue
<template>
  <!-- Fixed width -->
  <ejs-inlineaiassist popup-width="550px"></ejs-inlineaiassist>
  
  <!-- Responsive width -->
  <ejs-inlineaiassist popup-width="90vw"></ejs-inlineaiassist>
  
  <!-- Numeric value -->
  <ejs-inlineaiassist :popup-width="700"></ejs-inlineaiassist>
</template>
```

### Command Settings Popup Dimensions

When using `commandSettings`, you can specify separate dimensions for the command popup:

```vue
<script setup>
const commandSettings = {
  popupWidth: '500px',
  popupHeight: '300px',
  commands: [
    { label: 'Summarize' },
    { label: 'Translate' },
    { label: 'Expand' }
  ]
};
</script>
```

**Note:** Command settings dimensions apply only to the command selection popup, while root-level dimensions apply to the main response popup.

### Fixed Dimensions

### Responsive Sizing

```vue
<script setup>
const getPopupWidth = () => {
  const viewport = window.innerWidth;
  if (viewport < 600) return '100vw';
  if (viewport < 1024) return '80vw';
  return '500px';
};

const commandSettings = {
  popupWidth: getPopupWidth(),
  commands: [...]
};
</script>
```

### Dynamic Sizing Based on Content

```vue
<script setup>
const updatePopupSize = (contentLength) => {
  if (contentLength > 1000) {
    commandSettings.popupHeight = '400px';
  } else if (contentLength > 500) {
    commandSettings.popupHeight = '300px';
  } else {
    commandSettings.popupHeight = '200px';
  }
};
</script>
```

## Integration with Contenteditable

Common pattern: Inline AI Assist with contenteditable div for text editing.

### Basic Integration

```vue
<template>
  <div style="height: 400px; width: 700px; margin: 0 auto;">
    <br />
    <button @click="showPopup">AI Assistant</button>
    <div id="editableText" 
         contenteditable="true" 
         style="border:2px solid #ddd; 
                padding:12px; 
                min-height:150px; 
                margin-top:10px; 
                font-size:16px;
                border-radius:4px;">
      Type or paste your text here, then click AI Assistant for suggestions.
    </div>
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
      const editable = document.getElementById('editableText');
      const prompts = inlineAiAssist.value?.prompts;
      if (editable && prompts && prompts.length > 0) {
        const lastResponse = prompts[prompts.length - 1].response;
        editable.innerHTML = lastResponse;
      }
      inlineAiAssist.value?.hidePopup();
    }
  }
};

const onPromptRequest = (args) => {
  // Get selected text from contenteditable div
  const editable = document.getElementById('editableText');
  const selectedText = window.getSelection().toString();
  const fullText = editable.innerText;
  
  console.log('Full text:', fullText);
  console.log('Selected:', selectedText);
  
  setTimeout(() => {
    const response = `Processed: ${selectedText || fullText}`;
    inlineAiAssist.value?.addResponse(response);
  }, 1000);
};

const showPopup = () => {
  inlineAiAssist.value?.showPopup();
};
</script>
```

### Advanced: Multiple Contenteditable Areas

```vue
<script setup>
const handleResponseForElement = (elementId) => {
  const element = document.getElementById(elementId);
  if (element && inlineAiAssist.value?.prompts) {
    const lastResponse = inlineAiAssist.value.prompts[inlineAiAssist.value.prompts.length - 1].response;
    element.innerHTML = lastResponse;
  }
};

const responseSettings = {
  itemSelect: (args) => {
    if (args.command.label === 'Accept') {
      // Determine which element to update based on context
      const activeElement = document.activeElement;
      if (activeElement && activeElement.id) {
        handleResponseForElement(activeElement.id);
      }
      inlineAiAssist.value?.hidePopup();
    }
  }
};
</script>
```

## Common Workflows

### Workflow 1: Text Summarization

```vue
<template>
  <div style="height: 450px; width: 700px; margin: 0 auto;">
    <button @click="summarizeText">Summarize Selection</button>
    <div id="content" contenteditable="true" 
         style="border:1px solid #ccc; padding:12px; min-height:150px; margin:10px 0;">
      Long text content to summarize...
    </div>
    <div id="summary" style="margin-top:10px; padding:10px; background:#f0f0f0; border-radius:4px;">
      Summary will appear here
    </div>
    <ejs-inlineaiassist 
      relate-to="#btn"
      :prompt-request="onSummarizeRequest"
      :response-settings="responseSettings"
      ref="inlineAiAssist">
    </ejs-inlineaiassist>
  </div>
</template>

<script setup>
const summarizeText = () => {
  const content = document.getElementById('content').innerText;
  inlineAiAssist.value?.showPopup();
};

const onSummarizeRequest = () => {
  const content = document.getElementById('content').innerText;
  setTimeout(() => {
    const summary = `Summary of: ${content.substring(0, 50)}...`;
    inlineAiAssist.value?.addResponse(summary);
  }, 1000);
};

const responseSettings = {
  itemSelect: (args) => {
    if (args.command.label === 'Accept') {
      const summary = document.getElementById('summary');
      const prompts = inlineAiAssist.value?.prompts;
      if (summary && prompts) {
        summary.innerHTML = prompts[prompts.length - 1].response;
      }
      inlineAiAssist.value?.hidePopup();
    }
  }
};
</script>
```

### Workflow 2: Content Translation

```vue
<script setup>
const languages = ['Spanish', 'French', 'German', 'Japanese'];

const commandSettings = {
  commands: languages.map((lang) => ({
    label: `Translate to ${lang}`,
    prompt: `Translate to ${lang}`,
    groupBy: 'Translation',
    iconCss: 'e-icons e-translate'
  })),
  itemSelect: (args) => {
    console.log(`Translating to: ${args.command.label}`);
  }
};
</script>
```

### Workflow 3: Content Enhancement

```vue
<script setup>
const commandSettings = {
  commands: [
    { label: 'Make Professional', prompt: 'Make professional', groupBy: 'Enhance' },
    { label: 'Add Examples', prompt: 'Add examples', groupBy: 'Enhance' },
    { label: 'Expand Details', prompt: 'Expand with details', groupBy: 'Enhance' },
    { label: 'Simplify', prompt: 'Simplify language', groupBy: 'Enhance' }
  ]
};
</script>
```

## Edge Cases and Error Handling

### Handling Empty Content

```vue
<script setup>
const onPromptRequest = (args) => {
  const content = document.getElementById('editableText').innerText;
  
  if (!content || content.trim().length === 0) {
    args.cancel = true;
    alert('Please enter some content first');
    return;
  }
  
  // Process non-empty content
};
</script>
```

### Handling Network Failures

```vue
<script setup>
const onPromptRequest = async (args) => {
  try {
    const response = await fetchFromAI(args.prompt);
    inlineAiAssist.value?.addResponse(response);
  } catch (error) {
    console.error('Error:', error);
    const errorMessage = 'Unable to process prompt. Please check your connection.';
    inlineAiAssist.value?.addResponse(errorMessage);
  }
};

async function fetchFromAI(prompt) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);
  
  try {
    const response = await fetch('/api/ai', {
      method: 'POST',
      body: JSON.stringify({ prompt }),
      signal: controller.signal
    });
    
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    return data.result;
  } finally {
    clearTimeout(timeout);
  }
}
</script>
```

### Handling Component Destruction

```vue
<script setup>
import { onBeforeUnmount } from 'vue';

onBeforeUnmount(() => {
  if (inlineAiAssist.value) {
    try {
      inlineAiAssist.value.destroy();
    } catch (error) {
      console.warn('Error destroying component:', error);
    }
    inlineAiAssist.value = null;
  }
});
</script>
```

## Best Practices

### 1. Always Validate User Input

```vue
<script setup>
const validatePrompt = (prompt) => {
  if (!prompt || prompt.trim().length === 0) return false;
  if (prompt.length > 5000) return false;  // Limit prompt size
  return true;
};
</script>
```

### 2. Provide User Feedback

```vue
<template>
  <div>
    <div v-if="isLoading" style="color: #666;">
      Processing your request...
    </div>
    <ejs-inlineaiassist ref="inlineAiAssist"></ejs-inlineaiassist>
  </div>
</template>

<script setup>
const isLoading = ref(false);

const onPromptRequest = (args) => {
  isLoading.value = true;
  setTimeout(() => {
    isLoading.value = false;
    inlineAiAssist.value?.addResponse('Done');
  }, 1000);
};
</script>
```

### 3. Clean Up Resources

```vue
<script setup>
import { onMounted, onBeforeUnmount } from 'vue';

let eventHandlers = [];

onMounted(() => {
  const handler = () => {
    // Handle event
  };
  document.addEventListener('customEvent', handler);
  eventHandlers.push({ type: 'customEvent', handler });
});

onBeforeUnmount(() => {
  eventHandlers.forEach(({ type, handler }) => {
    document.removeEventListener(type, handler);
  });
  eventHandlers = [];
});
</script>
```

### 4. Cache Responses

```vue
<script setup>
const responseCache = new Map();

const getOrFetchResponse = async (prompt) => {
  if (responseCache.has(prompt)) {
    return responseCache.get(prompt);
  }
  
  const response = await fetchFromAI(prompt);
  responseCache.set(prompt, response);
  return response;
};
</script>
```

## Voice Input with Speech-to-Text

The Inline AI Assist component supports voice-driven prompts through the browser's Web Speech API. Enable the feature with `speechToTextSettings` and bind the recognition lifecycle events to drive UI feedback.

For full configuration details (language, button, tooltip, browser support), see [speech-to-text.md](speech-to-text.md). The patterns below focus on integration with the existing component APIs.

### Pattern: Voice-Driven Summarization

Combine Speech-to-Text with `relate-to` to dictate a prompt that summarizes a `contenteditable` region.

```vue
<template>
  <div style="height: 400px; width: 700px; margin: 0 auto;">
    <br />
    <div id="editableText" contenteditable="true"
         style="min-height:120px; border:1px solid #ccc; padding:8px; margin-top:8px;">
      Paste or type the text you want summarized here.
    </div>
    <button id="summarizeBtn" @click="showPopup" style="margin-top:8px;">
      Summarize
    </button>
    <p>Status: <strong>{{ status }}</strong></p>

    <ejs-inlineaiassist
      relate-to="#summarizeBtn"
      popup-width="500px"
      :prompt-request="onPromptRequest"
      :response-settings="responseSettings"
      :speech-to-text-settings="speechToTextSettings"
      ref="inlineAiAssist">
    </ejs-inlineaiassist>
  </div>
</template>

<script setup>
import { InlineAIAssistComponent as EjsInlineaiassist } from '@syncfusion/ej2-vue-interactive-chat';
import { ref } from 'vue';

const inlineAiAssist = ref(null);
const status = ref('Idle');

const speechToTextSettings = {
  enable: true,
  lang: 'en-US',
  allowInterimResults: true,
  onStart: (args) => { status.value = 'Listening (' + (args.listeningState || '') + ')'; },
  onStop: (args) => { status.value = 'Stopped (' + (args.listeningState || '') + ')'; },
  transcriptChanged: (args) => {
    const text = args.text || args.value || args.transcript || '';
    if (text) status.value = 'Heard: ' + text;
  },
  onError: (args) => { status.value = 'Error: ' + ((args && (args.error || args.errorMessage)) || 'recognition failed'); }
};

const responseSettings = {
  itemSelect: (args) => {
    if (args.command.label === 'Accept') {
      const editable = document.getElementById('editableText');
      const prompts = inlineAiAssist.value?.prompts;
      if (editable && prompts && prompts.length) {
        editable.innerHTML = '<p>' + prompts[prompts.length - 1].response + '</p>';
      }
      inlineAiAssist.value?.hidePopup();
    } else if (args.command.label === 'Discard') {
      inlineAiAssist.value?.hidePopup();
    }
  }
};

const onPromptRequest = () => {
  setTimeout(() => {
    const defaultResponse = 'For real-time prompt processing, connect the Inline AI Assist component to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
    inlineAiAssist.value?.addResponse(defaultResponse);
  }, 1000);
};

const showPopup = () => {
  inlineAiAssist.value?.showPopup();
};
</script>
```

### Pattern: Feature Detection with Graceful Fallback

Always guard the Speech-to-Text feature behind a browser-support check. If unsupported, hide the microphone affordance or fall back to text input only.

```vue
<script setup>
import { ref, onMounted } from 'vue';

const isSpeechSupported = ref(false);

onMounted(() => {
  isSpeechSupported.value =
    typeof window !== 'undefined' &&
    (window.SpeechRecognition || window.webkitSpeechRecognition);
});

const speechToTextSettings = {
  enable: isSpeechSupported.value,
  lang: 'en-US'
};
</script>

<template>
  <div>
    <p v-if="!isSpeechSupported">
      Voice input is not supported in this browser. Use the text input instead.
    </p>
    <ejs-inlineaiassist
      :speech-to-text-settings="speechToTextSettings"
      :prompt-request="onPromptRequest"
      ref="inlineAiAssist">
    </ejs-inlineaiassist>
  </div>
</template>
```

### Pattern: Push Final Transcript into the Editor

Use `transcriptChanged` with `isFinal` to copy the final voice result into a target `contenteditable` element on stop.

```vue
<script setup>
import { ref } from 'vue';

const inlineAiAssist = ref(null);

const speechToTextSettings = {
  enable: true,
  allowInterimResults: false, // only emit final transcripts
  onStop: () => {
    const prompts = inlineAiAssist.value?.prompts || [];
    const last = prompts[prompts.length - 1];
    if (last && last.response) {
      const editor = document.getElementById('editableText');
      if (editor) editor.innerText = last.response;
    }
  }
};
</script>
```