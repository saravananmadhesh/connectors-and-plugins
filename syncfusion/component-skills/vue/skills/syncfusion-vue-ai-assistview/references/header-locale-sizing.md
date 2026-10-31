# Header, Locale, Sizing & Persistence

Configure component-level settings for header display, internationalization, dimensions, and state persistence.

## Table of Contents
- [Header Configuration](#header-configuration)
- [Localization & Internationalization](#localization--internationalization)
- [Component Sizing](#component-sizing)
- [State Persistence](#state-persistence)
- [Complete Examples](#complete-examples)
- [Best Practices](#best-practices)

---

## Header Configuration

### showHeader Property

The `showHeader` property controls whether the header section is displayed above the AI AssistView component.

```vue
<template>
  <div style="height: 500px; width: 700px;">
    <ejs-aiassistview
      ref="aiassist"
      :show-header="true"
      :prompt-request="onPromptRequest"
    />
  </div>
</template>

<script setup>
import { AIAssistViewComponent as EjsAiassistview } from "@syncfusion/ej2-vue-interactive-chat";
import { ref } from 'vue';

const aiassist = ref(null);

const onPromptRequest = (args) => {
  setTimeout(() => {
    aiassist.value.addPromptResponse('Response: ' + args.prompt);
  }, 1000);
};
</script>
```

### Hiding the Header

```vue
<template>
  <!-- Header is hidden by default (default: true) -->
  <ejs-aiassistview
    :show-header="false"
    :prompt-request="onPromptRequest"
  />
</template>

<script setup>
// This displays only prompts, responses, and footer
// No header banner is shown
</script>
```

### Toggling Header Dynamically

```vue
<template>
  <div>
    <button @click="showHeader = !showHeader">
      {{ showHeader ? 'Hide' : 'Show' }} Header
    </button>
    
    <ejs-aiassistview
      ref="aiassist"
      :show-header="showHeader"
      :prompt-request="onPromptRequest"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const showHeader = ref(true);

const onPromptRequest = (args) => {
  setTimeout(() => {
    aiassist.value.addPromptResponse('Response: ' + args.prompt);
  }, 1000);
};
</script>
```

### Header with Custom Banner Template

```vue
<template>
  <ejs-aiassistview
    ref="aiassist"
    :show-header="true"
    banner-template="bannerTemplate"
    :prompt-request="onPromptRequest"
  >
    <template v-slot:bannerTemplate="">
      <div class="custom-banner">
        <h2>Welcome to AI Assistant</h2>
        <p>Ask me anything!</p>
      </div>
    </template>
  </ejs-aiassistview>
</template>

<script setup>
import { AIAssistViewComponent as EjsAiassistview } from "@syncfusion/ej2-vue-interactive-chat";
import { ref } from 'vue';

const aiassist = ref(null);

const onPromptRequest = (args) => {
  setTimeout(() => {
    aiassist.value.addPromptResponse('Response: ' + args.prompt);
  }, 1000);
};
</script>

<style scoped>
.custom-banner {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 20px;
  border-radius: 4px;
  text-align: center;
}

.custom-banner h2 {
  margin: 0 0 10px 0;
}

.custom-banner p {
  margin: 0;
  opacity: 0.9;
}
</style>
```

---

## Localization & Internationalization

### locale Property

The `locale` property sets the language and regional format for the component UI.

| Locale Code | Language | Region |
|------------|----------|--------|
| `en-US` | English | United States (default) |
| `en-GB` | English | United Kingdom |
| `fr-FR` | French | France |
| `de-DE` | German | Germany |
| `es-ES` | Spanish | Spain |
| `it-IT` | Italian | Italy |
| `pt-BR` | Portuguese | Brazil |
| `ru-RU` | Russian | Russia |
| `ja-JP` | Japanese | Japan |
| `zh-CN` | Chinese | Simplified (China) |
| `zh-TW` | Chinese | Traditional (Taiwan) |
| `ko-KR` | Korean | South Korea |
| `ar-SA` | Arabic | Saudi Arabia |

### Basic Locale Setup

```vue
<template>
  <div style="height: 500px; width: 700px;">
    <ejs-aiassistview
      ref="aiassist"
      locale="en-US"
      :prompt-request="onPromptRequest"
    />
  </div>
</template>

<script setup>
import { AIAssistViewComponent as EjsAiassistview } from "@syncfusion/ej2-vue-interactive-chat";
import { ref } from 'vue';

const aiassist = ref(null);

const onPromptRequest = (args) => {
  setTimeout(() => {
    aiassist.value.addPromptResponse('Response: ' + args.prompt);
  }, 1000);
};
</script>
```

### Dynamic Locale Switching

```vue
<template>
  <div>
    <select v-model="selectedLocale" @change="changeLocale">
      <option value="en-US">English (US)</option>
      <option value="fr-FR">French</option>
      <option value="de-DE">German</option>
      <option value="es-ES">Spanish</option>
      <option value="ja-JP">Japanese</option>
      <option value="zh-CN">Chinese (Simplified)</option>
    </select>

    <ejs-aiassistview
      ref="aiassist"
      :locale="selectedLocale"
      :prompt-request="onPromptRequest"
    />
  </div>
</template>

<script setup>
import { AIAssistViewComponent as EjsAiassistview } from "@syncfusion/ej2-vue-interactive-chat";
import { ref } from 'vue';

const aiassist = ref(null);
const selectedLocale = ref('en-US');

const changeLocale = () => {
  // Component automatically updates UI text based on locale
  aiassist.value.ej2Instances.locale = selectedLocale.value;
};

const onPromptRequest = (args) => {
  setTimeout(() => {
    aiassist.value.addPromptResponse('Response: ' + args.prompt);
  }, 1000);
};
</script>
```

### Locale with Custom Strings

```javascript
// Override or add custom translation strings
const localeStrings = {
  'en-US': {
    'promptPlaceholder': 'Enter your question here...',
    'clearButton': 'Clear Chat',
    'send': 'Send'
  },
  'fr-FR': {
    'promptPlaceholder': 'Entrez votre question ici...',
    'clearButton': 'Effacer le chat',
    'send': 'Envoyer'
  }
};

// Apply custom strings
const applyCustomLocale = (locale) => {
  aiassist.value.ej2Instances.locale = locale;
  // Merge custom strings with default locale strings
};
```

---

## Component Sizing

### height Property

Control the height of the component.

| Value Type | Example | Description |
|-----------|---------|-------------|
| String (percentage) | `"100%"` | Responsive to parent |
| String (pixels) | `"500px"` | Fixed pixel height |
| String (viewport) | `"100vh"` | Full viewport height |
| Number | `500` | Interpreted as pixels |

### Basic Height Configuration

```vue
<template>
  <div>
    <!-- Full viewport height -->
    <ejs-aiassistview
      height="100vh"
      :prompt-request="onPromptRequest"
    />
  </div>
</template>
```

### Fixed Height

```vue
<template>
  <div>
    <!-- Fixed 500px height -->
    <ejs-aiassistview
      height="500px"
      width="700px"
      :prompt-request="onPromptRequest"
    />
  </div>
</template>

<script setup>
const onPromptRequest = (args) => {
  setTimeout(() => {
    aiassist.value.addPromptResponse('Response: ' + args.prompt);
  }, 1000);
};
</script>
```

### Responsive Height

```vue
<template>
  <div class="container">
    <ejs-aiassistview
      :height="containerHeight"
      :width="containerWidth"
      :prompt-request="onPromptRequest"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const containerHeight = ref('600px');
const containerWidth = ref('100%');

const handleResize = () => {
  const container = document.querySelector('.container');
  const parent = container?.parentElement;
  
  if (parent) {
    containerHeight.value = Math.max(300, parent.clientHeight - 50) + 'px';
    containerWidth.value = '100%';
  }
};

onMounted(() => {
  handleResize();
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
}
</style>
```

### width Property

Control the width of the component.

| Value Type | Example | Description |
|-----------|---------|-------------|
| String (percentage) | `"100%"` | Full parent width |
| String (pixels) | `"800px"` | Fixed width |
| Number | `800` | Interpreted as pixels |

### Fixed Width & Height

```vue
<template>
  <div class="centered-chat">
    <ejs-aiassistview
      height="600px"
      width="800px"
      :prompt-request="onPromptRequest"
    />
  </div>
</template>

<script setup>
import { AIAssistViewComponent as EjsAiassistview } from "@syncfusion/ej2-vue-interactive-chat";
import { ref } from 'vue';

const aiassist = ref(null);

const onPromptRequest = (args) => {
  setTimeout(() => {
    aiassist.value.addPromptResponse('Response: ' + args.prompt);
  }, 1000);
};
</script>

<style scoped>
.centered-chat {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
</style>
```

### Full Screen

```vue
<template>
  <ejs-aiassistview
    height="100vh"
    width="100%"
    :prompt-request="onPromptRequest"
  />
</template>
```

---

## State Persistence

### enablePersistence Property

Enable automatic saving and restoration of component state between page reloads.

```vue
<template>
  <div style="height: 500px; width: 700px;">
    <ejs-aiassistview
      ref="aiassist"
      :enable-persistence="true"
      :prompt-request="onPromptRequest"
    />
  </div>
</template>

<script setup>
import { AIAssistViewComponent as EjsAiassistview } from "@syncfusion/ej2-vue-interactive-chat";
import { ref } from 'vue';

const aiassist = ref(null);

const onPromptRequest = (args) => {
  setTimeout(() => {
    aiassist.value.addPromptResponse('Response: ' + args.prompt);
  }, 1000);
};
</script>
```

### What Gets Persisted

When `enablePersistence` is true, the following state is automatically saved:

- Conversation history (`prompts` array)
- Current view index (`activeView`)
- Component settings
- Scroll position
- User input

### Without Persistence (Default)

```vue
<template>
  <ejs-aiassistview
    :enable-persistence="false"
    :prompt-request="onPromptRequest"
  />
</template>

<!-- State resets on page reload -->
```

### Manual State Persistence

```javascript
import { ref } from 'vue';

const conversationHistory = ref([]);

// Save to localStorage manually
const saveConversation = () => {
  localStorage.setItem(
    'aiassist-conversation',
    JSON.stringify(aiassist.value.ej2Instances.prompts)
  );
};

// Load from localStorage manually
const loadConversation = () => {
  const saved = localStorage.getItem('aiassist-conversation');
  if (saved) {
    conversationHistory.value = JSON.parse(saved);
    aiassist.value.ej2Instances.prompts = conversationHistory.value;
  }
};

// On component mount
onMounted(() => {
  loadConversation();
});
```

---

## Complete Examples

### Example 1: Multilingual Chat

```vue
<template>
  <div>
    <div class="language-selector">
      <select v-model="currentLocale">
        <option value="en-US">English</option>
        <option value="es-ES">Español</option>
        <option value="fr-FR">Français</option>
      </select>
    </div>

    <ejs-aiassistview
      ref="aiassist"
      :locale="currentLocale"
      :show-header="true"
      height="600px"
      width="100%"
      :enable-persistence="true"
      :prompt-request="onPromptRequest"
    />
  </div>
</template>

<script setup>
import { AIAssistViewComponent as EjsAiassistview } from "@syncfusion/ej2-vue-interactive-chat";
import { ref } from 'vue';

const aiassist = ref(null);
const currentLocale = ref('en-US');

const onPromptRequest = (args) => {
  setTimeout(() => {
    const responses = {
      en: 'Thank you for your question!',
      es: '¡Gracias por su pregunta!',
      fr: 'Merci pour votre question!'
    };
    
    const lang = currentLocale.value.split('-')[0];
    const response = responses[lang] || 'Thank you!';
    
    aiassist.value.addPromptResponse(response);
  }, 1000);
};
</script>

<style scoped>
.language-selector {
  margin-bottom: 15px;
}

.language-selector select {
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
}
</style>
```

### Example 2: Responsive Dialog

```vue
<template>
  <div class="chat-dialog" :style="dialogStyle">
    <div class="dialog-header">
      <h3>AI Assistant</h3>
      <button @click="toggleDialog">{{ isOpen ? '−' : '+' }}</button>
    </div>

    <ejs-aiassistview
      v-if="isOpen"
      ref="aiassist"
      :height="dialogHeight"
      width="100%"
      :show-header="false"
      :enable-persistence="true"
      :prompt-request="onPromptRequest"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const isOpen = ref(true);
const dialogWidth = ref(400);
const baseHeight = ref(500);

const dialogStyle = computed(() => ({
  width: dialogWidth.value + 'px',
  opacity: isOpen.value ? 1 : 0.7
}));

const dialogHeight = computed(() => 
  (isOpen.value ? baseHeight.value : 50) + 'px'
);

const toggleDialog = () => {
  isOpen.value = !isOpen.value;
};

const onPromptRequest = (args) => {
  setTimeout(() => {
    aiassist.value.addPromptResponse('Response: ' + args.prompt);
  }, 1000);
};
</script>

<style scoped>
.chat-dialog {
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.dialog-header {
  background: #0066cc;
  color: white;
  padding: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.dialog-header h3 {
  margin: 0;
  font-size: 16px;
}

.dialog-header button {
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
  padding: 0;
}
</style>
```

### Example 3: Full Configuration

```vue
<template>
  <ejs-aiassistview
    ref="aiassist"
    locale="en-US"
    :show-header="true"
    height="100vh"
    width="100%"
    :enable-persistence="true"
    :enable-streaming="true"
    :prompt-request="onPromptRequest"
    banner-template="bannerTemplate"
  >
    <template v-slot:bannerTemplate="">
      <div class="app-banner">
        <h2>Universal AI Assistant</h2>
        <p>Persistence: ON | Streaming: ON</p>
      </div>
    </template>
  </ejs-aiassistview>
</template>

<script setup>
import { AIAssistViewComponent as EjsAiassistview } from "@syncfusion/ej2-vue-interactive-chat";
import { ref } from 'vue';

const aiassist = ref(null);

const onPromptRequest = (args) => {
  setTimeout(() => {
    aiassist.value.addPromptResponse('Response: ' + args.prompt);
  }, 1000);
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #f5f5f5;
}

.app-banner {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 30px;
  text-align: center;
}

.app-banner h2 {
  font-size: 24px;
  margin-bottom: 8px;
}

.app-banner p {
  opacity: 0.9;
  font-size: 12px;
}
</style>
```

---

## Best Practices

### 1. Match Header with Content
```vue
<!-- ✓ Good: Header matches conversation context -->
<ejs-aiassistview
  :show-header="true"
  banner-template="contextBanner"
/>

<!-- ✗ Avoid: Confusing header -->
<ejs-aiassistview :show-header="false" />
```

### 2. Respect User Locale
```javascript
// ✓ Good: Detect user's locale
const userLocale = navigator.language || navigator.userLanguage;
// Then use: locale: userLocale

// ✗ Avoid: Hard-coded single language
locale: "en-US"
```

### 3. Responsive Sizing
```vue
<!-- ✓ Good: Responsive dimensions -->
<ejs-aiassistview
  height="100vh"
  width="100%"
/>

<!-- ✗ Avoid: Fixed dimensions that don't adapt -->
<ejs-aiassistview
  height="600px"
  width="800px"
/>
```

### 4. Smart Persistence
```javascript
// ✓ Good: Persist sensitive data only
enablePersistence={isLoggedIn && allowPersistence}

// ✗ Avoid: Always persist without consideration
enablePersistence={true}
```

### 5. Test Locale Support
```javascript
// ✓ Good: Test all supported locales
const supportedLocales = ['en-US', 'es-ES', 'fr-FR', 'de-DE'];
supportedLocales.forEach(locale => {
  // Test each locale
});
```
