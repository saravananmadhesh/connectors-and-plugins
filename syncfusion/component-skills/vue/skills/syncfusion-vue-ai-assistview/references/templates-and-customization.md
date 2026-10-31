# Templates and Customization

This guide covers template-related properties and customization options for the Syncfusion Vue AI AssistView component using Vue slot syntax.

**Table of Contents:**
- [Banner Template](#banner-template)
- [Footer Template](#footer-template)
- [Prompt Item Template](#prompt-item-template)
- [Prompt Suggestion Item Template](#prompt-suggestion-item-template)
- [Response Item Template](#response-item-template)
- [Response Animation Template](#response-animation-template)
- [Toolbar Settings](#toolbar-settings)
- [Views Configuration](#views-configuration)
- [Best Practices](#best-practices)

---

## Banner Template

Display a custom banner at the top of the AI AssistView component using `bannerTemplate` property with Vue slot syntax.

### Basic Banner Template (Composition API)

```vue
<template>
  <div id="container" style="height: 350px; width: 650px; margin: 0 auto;">
    <ejs-aiassistview 
      ref="aiassist"
      bannerTemplate="bannerTemplate"
      :prompt-request="onPromptRequest"
    >
      <template v-slot:bannerTemplate="">
        <div class="banner-content">
          <div class="e-icons e-assistview-icon"></div>
          <h3>Welcome to AI Assistant</h3>
          <div>Ask me anything about Vue.js and development</div>
        </div>
      </template>
    </ejs-aiassistview>
  </div>
</template>

<script setup>
import { AIAssistViewComponent as EjsAiassistview } from "@syncfusion/ej2-vue-interactive-chat";
import { ref } from 'vue';

const aiassist = ref(null);

const onPromptRequest = (args) => {
  setTimeout(() => {
    const defaultResponse = 'For real-time prompt processing, connect the AI AssistView component to your preferred AI service, such as OpenAI or Azure Cognitive Services.';
    aiassist.value.addPromptResponse(defaultResponse);
  }, 1000);
};
</script>

<style>
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/ai-assistview/index.css";

.banner-content {
  text-align: center;
  padding: 15px;
}

.banner-content .e-assistview-icon:before {
  font-size: 35px;
}

.banner-content h3 {
  margin: 10px 0 5px;
}
</style>
```



---

## Footer Template

Display a custom footer below the conversation area using `footerTemplate` property with Vue slot syntax.

### Basic Footer Template (Composition API)

```vue
<template>
  <div id="container" style="height: 350px; width: 650px; margin: 0 auto;">
    <ejs-aiassistview 
      ref="aiassist"
      footerTemplate="footerTemplate"
    >
      <template v-slot:footerTemplate="">
        <div class="custom-footer">
          <textarea id="promptTextArea" class="e-input" rows="2" placeholder="Enter your prompt here"></textarea>
          <button id="sendPrompt" class="e-btn e-primary" @click="handleSend">Generate</button>
        </div>
      </template>
    </ejs-aiassistview>
  </div>
</template>

<script setup>
import { AIAssistViewComponent as EjsAiassistview } from "@syncfusion/ej2-vue-interactive-chat";
import { ref } from 'vue';

const aiassist = ref(null);

const handleSend = () => {
  const textArea = document.getElementById('promptTextArea');
  if (textArea && textArea.value.trim()) {
    const prompt = textArea.value;
    textArea.value = '';
    
    setTimeout(() => {
      const defaultResponse = 'Response generated for: ' + prompt;
      aiassist.value.addPromptResponse(defaultResponse);
    }, 1000);
  }
};
</script>

<style>
.custom-footer {
  display: flex;
  gap: 10px;
  padding: 10px;
  background-color: transparent;
}

#promptTextArea {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

#sendPrompt {
  padding: 5px 15px;
  align-self: flex-end;
}
</style>
```



---

## Prompt Item Template

Customize the appearance of user prompts in the conversation using `promptItemTemplate` property with Vue slot syntax. The template receives `data` context with `prompt`, `index`, and `toolbarItems`.

### Basic Prompt Item Template (Composition API)

```vue
<template>
  <div id="container" style="height: 350px; width: 650px; margin: 0 auto;">
    <ejs-aiassistview 
      ref="aiassist"
      promptItemTemplate="promptItemTemplate"
      :prompts="promptsData"
      :prompt-request="onPromptRequest"
    >
      <template v-slot:promptItemTemplate="{data}">
        <div class="promptItemContent">
          <div class="prompt-header">
            You
            <span class="e-icons e-user"></span>
          </div>
          <div class="assist-prompt-content">{{ data.prompt }}</div>
        </div>
      </template>
    </ejs-aiassistview>
  </div>
</template>

<script setup>
import { AIAssistViewComponent as EjsAiassistview } from "@syncfusion/ej2-vue-interactive-chat";
import { ref } from 'vue';

const aiassist = ref(null);

const promptsData = [
  {
    prompt: "What is AI?",
    response: "<div>AI stands for Artificial Intelligence, enabling machines to mimic human intelligence for tasks such as learning, problem-solving, and decision-making.</div>"
  }
];

const onPromptRequest = (args) => {
  setTimeout(() => {
    const foundPrompt = promptsData.find((p) => p.prompt === args.prompt);
    const defaultResponse = 'For real-time prompt processing, connect to your preferred AI service.';
    aiassist.value.addPromptResponse(foundPrompt ? foundPrompt.response : defaultResponse);
  }, 1000);
};
</script>

<style>
.promptItemContent {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-end;
  margin-right: 20px;
}

.promptItemContent .prompt-header {
  font-size: 18px;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 10px;
}

.promptItemContent .assist-prompt-content {
  background: #e3f2fd;
  padding: 12px;
  border-radius: 8px;
  max-width: 70%;
  color: #333;
}
</style>
```



---

## Prompt Suggestion Item Template

Customize the appearance of suggestion chips using `promptSuggestionItemTemplate` property with Vue slot syntax. The template receives `data` context with `promptSuggestion` and `index`.

### Basic Suggestion Item Template (Composition API)

```vue
<template>
  <div id="container" style="height: 350px; width: 650px; margin: 0 auto;">
    <ejs-aiassistview 
      ref="aiassist"
      promptSuggestionItemTemplate="promptSuggestionItemTemplate"
      :prompt-suggestions="promptSuggestions"
      :prompt-request="onPromptRequest"
    >
      <template v-slot:promptSuggestionItemTemplate="{data}">
        <div class="suggestion-item active">
          <span class="e-icons e-circle-info"></span>
          <div class="assist-suggestion-content">{{ data.promptSuggestion }}</div>
        </div>
      </template>
    </ejs-aiassistview>
  </div>
</template>

<script setup>
import { AIAssistViewComponent as EjsAiassistview } from "@syncfusion/ej2-vue-interactive-chat";
import { ref } from 'vue';

const aiassist = ref(null);

const promptSuggestions = [
  "Best practices for clean code?",
  "How to optimize performance?"
];

const onPromptRequest = (args) => {
  setTimeout(() => {
    const response1 = "Use clear naming, break code into functions, avoid repetition, write tests.";
    const response2 = "Optimize bundle size, use lazy loading, implement caching, monitor metrics.";
    const defaultResponse = 'For real-time prompt processing, connect to your preferred AI service.';
    
    const response = args.prompt === promptSuggestions[0] ? response1 : 
                    args.prompt === promptSuggestions[1] ? response2 : 
                    defaultResponse;
    aiassist.value.addPromptResponse(response);
  }, 1000);
};
</script>

<style>
.e-aiassistview .e-views .e-suggestions li {
  padding: 0;
  border: none;
  box-shadow: none;
}

.suggestion-item {
  display: flex;
  align-items: center;
  background-color: #686868;
  color: white;
  padding: 8px 12px;
  opacity: 0.85;
  gap: 8px;
  height: 38px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.suggestion-item:hover {
  background-color: #555;
  opacity: 1;
}

.suggestion-item .assist-suggestion-content {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  flex: 1;
}
</style>
```



---

## Response Item Template

Customize the appearance of AI responses using `responseItemTemplate` property with Vue slot syntax. The template receives `data` context with `response`, `prompt`, `index`, `output`, and `toolbarItems`.

### Basic Response Item Template (Composition API)

```vue
<template>
  <div id="container" style="height: 350px; width: 650px; margin: 0 auto;">
    <ejs-aiassistview 
      ref="aiassist"
      responseItemTemplate="responseItemTemplate"
      :prompts="promptsData"
      :prompt-request="onPromptRequest"
    >
      <template v-slot:responseItemTemplate="{data}">
        <div class="responseItemContent">
          <div class="response-header">
            <span class="e-icons e-assistview-icon"></span>
            AI Assist
          </div>
          <div class="assist-response-content" v-html="data.response"></div>
        </div>
      </template>
    </ejs-aiassistview>
  </div>
</template>

<script setup>
import { AIAssistViewComponent as EjsAiassistview } from "@syncfusion/ej2-vue-interactive-chat";
import { ref } from 'vue';

const aiassist = ref(null);

const promptsData = [
  {
    prompt: "What is AI?",
    response: "<div>AI stands for Artificial Intelligence, enabling machines to mimic human intelligence for tasks such as learning, problem-solving, and decision-making.</div>"
  }
];

const onPromptRequest = (args) => {
  setTimeout(() => {
    const foundPrompt = promptsData.find((p) => p.prompt === args.prompt);
    const defaultResponse = '<div>For real-time prompt processing, connect to your preferred AI service.</div>';
    aiassist.value.addPromptResponse(foundPrompt ? foundPrompt.response : defaultResponse);
  }, 1000);
};
</script>

<style>
.e-assistview-icon:before {
  margin-right: 10px;
}

.responseItemContent {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-left: 20px;
}

.responseItemContent .response-header {
  font-size: 18px;
  font-weight: bold;
  display: flex;
  align-items: center;
}

.responseItemContent .assist-response-content {
  margin-left: 35px;
  background: #f5f5f5;
  padding: 12px;
  border-radius: 8px;
  color: #333;
}

#aiAssistView .e-response-item-template .e-toolbar-items {
  margin-left: 35px;
}
</style>
```



---

## Response Animation Template

The `responseAnimationTemplate` property shows a custom loading indicator or animation while the AI AssistView is generating a response. The animation template replaces the response slot during the request and is removed automatically once the response is added.

> Use this template together with `promptRequest` (and a small delay in `addPromptResponse`) to display a branded loader while waiting for the AI service.

### Basic Response Animation Template (Composition API)

```vue
<template>
  <div id='container' style="height: 350px; width: 650px; margin: 0 auto;">
    <br>
    <ejs-aiassistview id='aiAssistView' responseAnimationTemplate="responseAnimationTemplate" ref="aiassist" :prompt-request="onPromptRequest">
      <template v-slot:responseAnimationTemplate="">
        <div class="assistview-loading-status">
          <div class="assistview-grid-icon">
            <span></span><span></span><span></span>
            <span></span><span></span><span></span>
            <span></span><span></span><span></span>
          </div>
          <span class="assistview-loading-label">Generating</span>
        </div>
      </template>
    </ejs-aiassistview>
  </div>
</template>

<script setup>
import { AIAssistViewComponent as EjsAiassistview } from "@syncfusion/ej2-vue-interactive-chat";
import { ref } from "vue";

let aiassist = ref(null);

const onPromptRequest = (args) => {
  setTimeout(() => {
    let defaultResponse = 'For real-time prompt processing, connect the AIAssistView component to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
    aiassist.value.addPromptResponse(defaultResponse);
  }, 2000);
};
</script>

<style>
@import "../node_modules/@syncfusion/ej2-base/styles/tailwind3.css";
@import "../node_modules/@syncfusion/ej2-inputs/styles/tailwind3.css";
@import "../node_modules/@syncfusion/ej2-navigations/styles/tailwind3.css";
@import "../node_modules/@syncfusion/ej2-notifications/styles/tailwind3.css";
@import "../node_modules/@syncfusion/ej2-layouts/styles/tailwind3.css";
@import "../node_modules/@syncfusion/ej2-interactive-chat/styles/tailwind3.css";

#aiAssistView .e-view-container {
  margin: auto;
}

.assistview-loading-status {
  display: flex;
  gap: 10px;
  color: #666;
  font-family: "Segoe UI", system-ui, sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.4;
}

.assistview-grid-icon {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2px;
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}

.assistview-grid-icon span {
  width: 4px;
  height: 4px;
  background: #8a8a8a;
  border-radius: 1px;
  opacity: 0.25;
  animation: assistview-pulse 1.8s ease-in-out infinite;
}

.assistview-grid-icon span:nth-child(1) { animation-delay: 0s; }
.assistview-grid-icon span:nth-child(2) { animation-delay: 0.1s; }
.assistview-grid-icon span:nth-child(3) { animation-delay: 0.2s; }
.assistview-grid-icon span:nth-child(4) { animation-delay: 0.3s; }
.assistview-grid-icon span:nth-child(5) { animation-delay: 0.4s; }
.assistview-grid-icon span:nth-child(6) { animation-delay: 0.5s; }
.assistview-grid-icon span:nth-child(7) { animation-delay: 0.6s; }
.assistview-grid-icon span:nth-child(8) { animation-delay: 0.7s; }
.assistview-grid-icon span:nth-child(9) { animation-delay: 0.8s; }

@keyframes assistview-pulse {
  0%,
  100% {
    opacity: 0.25;
  }
  50% {
    opacity: 1;
  }
}
</style>
```

### Basic Response Animation Template (Options API)

```vue
<template>
  <div id='container' style="height: 350px; width: 650px; margin: 0 auto;">
    <br>
    <ejs-aiassistview id='aiAssistView' responseAnimationTemplate="responseAnimationTemplate" ref="aiassist" :prompt-request="onPromptRequest">
      <template v-slot:responseAnimationTemplate="">
        <div class="assistview-loading-status">
          <div class="assistview-grid-icon">
            <span></span><span></span><span></span>
            <span></span><span></span><span></span>
            <span></span><span></span><span></span>
          </div>
          <span class="assistview-loading-label">Generating</span>
        </div>
      </template>
    </ejs-aiassistview>
  </div>
</template>
<script>
import { AIAssistViewComponent } from "@syncfusion/ej2-vue-interactive-chat";

export default {
  components: {
    'ejs-aiassistview': AIAssistViewComponent
  },
  data: function () {
    return {
    }
  },
  methods: {
    onPromptRequest: function (args) {
      setTimeout(() => {
        let defaultAiassist = this.$refs.aiassist.ej2Instances;
        let defaultResponse = 'For real-time prompt processing, connect the AIAssistView component to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
        defaultAiassist.addPromptResponse(defaultResponse);
      }, 2000);
    }
  }
}
</script>
<style>
@import "../node_modules/@syncfusion/ej2-base/styles/tailwind3.css";
@import "../node_modules/@syncfusion/ej2-inputs/styles/tailwind3.css";
@import "../node_modules/@syncfusion/ej2-navigations/styles/tailwind3.css";
@import "../node_modules/@syncfusion/ej2-notifications/styles/tailwind3.css";
@import "../node_modules/@syncfusion/ej2-layouts/styles/tailwind3.css";
@import "../node_modules/@syncfusion/ej2-interactive-chat/styles/tailwind3.css";

#aiAssistView .e-view-container {
  margin: auto;
}

.assistview-loading-status {
  display: flex;
  gap: 10px;
  color: #666;
  font-family: "Segoe UI", system-ui, sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.4;
}

.assistview-grid-icon {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2px;
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}

.assistview-grid-icon span {
  width: 4px;
  height: 4px;
  background: #8a8a8a;
  border-radius: 1px;
  opacity: 0.25;
  animation: assistview-pulse 1.8s ease-in-out infinite;
}

.assistview-grid-icon span:nth-child(1) { animation-delay: 0s; }
.assistview-grid-icon span:nth-child(2) { animation-delay: 0.1s; }
.assistview-grid-icon span:nth-child(3) { animation-delay: 0.2s; }
.assistview-grid-icon span:nth-child(4) { animation-delay: 0.3s; }
.assistview-grid-icon span:nth-child(5) { animation-delay: 0.4s; }
.assistview-grid-icon span:nth-child(6) { animation-delay: 0.5s; }
.assistview-grid-icon span:nth-child(7) { animation-delay: 0.6s; }
.assistview-grid-icon span:nth-child(8) { animation-delay: 0.7s; }
.assistview-grid-icon span:nth-child(9) { animation-delay: 0.8s; }

@keyframes assistview-pulse {
  0%,
  100% {
    opacity: 0.25;
  }
  50% {
    opacity: 1;
  }
}
</style>
```

### When the Template Is Shown / Hidden

- **Shown** as soon as a prompt is submitted and `addPromptResponse` (or `executePrompt`) has not yet been called.
- **Hidden** the moment a response is added via `addPromptResponse(response, true)`.
- **Hidden** if the turn is canceled through `cancelPrompt()`, `failPrompt()`, or the `Stop responding` button.

> Streamed responses that call `addPromptResponse(response, false)` keep the animation visible until the final `addPromptResponse(response, true)` is invoked. See [streaming-responses.md](./streaming-responses.md) for the full streaming pattern.

### Best Practices

- **Match your brand** — replace the grid icon and `Generating` label with your product's tone, colors, and copy.
- **Provide accessible text** — include meaningful `aria-label` text (for example `Generating response...`) so screen readers announce the state.
- **Keep the animation short** — long animations increase perceived latency; combine with streaming to start replacing the template with content as soon as the first chunk arrives.
- **Avoid blocking JS** — use CSS keyframes (as shown above) rather than JS-driven animation timers so the loader doesn't compete with the AI request.

## Toolbar Settings

Configure toolbar settings via the `toolbarSettings` property to manage response item toolbar actions.

### ToolbarItemModel Properties Reference

Each toolbar item is a `ToolbarItemModel` with the following properties:

| Property | Type | Description | Example |
|----------|------|-------------|---------|
| `text` | string | Display text of the toolbar item | `"Copy"`, `"Feedback"` |
| `iconCss` | string | CSS class for the icon | `"e-icons e-copy"` |
| `tooltip` | string | Tooltip text shown on hover | `"Copy response to clipboard"` |
| `type` | ItemType | Button, Separator, or Input | `"Button"` |
| `cssClass` | string | Custom CSS class for styling | `"custom-toolbar-btn"` |
| `disabled` | boolean | Disable the toolbar item | `false`, `true` |
| `align` | ItemAlign | Left, Center, or Right alignment | `"Right"` |
| `visible` | boolean | Show/hide the toolbar item | `true`, `false` |
| `tabIndex` | number | Tab order for keyboard navigation | `0`, `1`, `2` |
| `template` | string/function | Custom template for the item | Function or HTML string |

**ItemType Enum Values:**
- `Button` - Clickable button item
- `Separator` - Vertical separator line
- `Input` - Input field container

**ItemAlign Enum Values:**
- `Left` - Align to the left
- `Center` - Align to center
- `Right` - Align to the right

### Basic Toolbar Configuration

The `toolbarSettings` property controls toolbar items displayed with responses. Individual toolbar items can be customized in the response item template.

```javascript
// Composition API - Fully documented ToolbarItemModel usage
const toolbarSettings = {
  items: [
    {
      text: 'Copy',
      iconCss: 'e-icons e-copy',
      tooltip: 'Copy response',
      type: 'Button',
      align: 'Left',
      visible: true,
      disabled: false,
      tabIndex: 0
    },
    {
      type: 'Separator',
      align: 'Center'
    },
    {
      text: 'Feedback',
      iconCss: 'e-icons e-feedback',
      tooltip: 'Send feedback',
      type: 'Button',
      align: 'Right',
      cssClass: 'custom-feedback-btn',
      visible: true,
      disabled: false,
      tabIndex: 1
    }
  ]
};
```

### Examples Using Each Property

**1. Disabling Items Conditionally**
```javascript
{
  text: 'Export',
  iconCss: 'e-icons e-export',
  tooltip: 'Export response',
  type: 'Button',
  disabled: !canExport.value  // Conditionally disable
}
```

**2. Hiding Items Based on State**
```javascript
{
  text: 'Premium Feature',
  iconCss: 'e-icons e-star',
  tooltip: 'Available in premium',
  type: 'Button',
  visible: isPremiumUser.value  // Only show for premium users
}
```

**3. Custom CSS Styling**
```javascript
{
  text: 'Delete',
  iconCss: 'e-icons e-delete',
  tooltip: 'Delete response',
  type: 'Button',
  cssClass: 'danger-button',  // Red styling
  align: 'Right'
}

// In your CSS:
// .danger-button { background-color: #dc3545; color: white; }
```

**4. Keyboard Navigation with TabIndex**
```javascript
const toolbarItems = [
  {
    text: 'First Action',
    type: 'Button',
    tabIndex: 0  // Tab order: 1st
  },
  {
    text: 'Second Action',
    type: 'Button',
    tabIndex: 1  // Tab order: 2nd
  },
  {
    text: 'Third Action',
    type: 'Button',
    tabIndex: 2  // Tab order: 3rd
  }
];
```

**5. Using Separators**
```javascript
{
  items: [
    { text: 'Edit', type: 'Button', align: 'Left' },
    { text: 'Share', type: 'Button', align: 'Left' },
    { type: 'Separator', align: 'Center' },  // Visual separator
    { text: 'Delete', type: 'Button', align: 'Right' }
  ]
}
```

**6. Custom Template**
```javascript
{
  type: 'Button',
  template: '<span class="custom-item">Custom Content</span>',
  align: 'Right'
}
```

**Note:** Toolbar actions are handled via the `responseItemTemplate`. Use the template to add custom click handlers for toolbar items.

---

## Best Practices

### 1. Template Performance

```javascript
// ✓ Good: Use computed for reactive templates
const bannerContent = computed(() => ({
  title: isLoading.value ? 'Processing...' : 'Welcome'
}));

// ✗ Avoid: Creating new objects on every render
const inefficientTemplate = () => {
  return { title: isLoading.value ? 'Processing...' : 'Welcome' };
};
```

### 2. Safe HTML Rendering

```javascript
// ✓ Good: Sanitize HTML before rendering
import DOMPurify from 'dompurify';

const sanitizedHTML = computed(() => {
  return DOMPurify.sanitize(userContent.value, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'p', 'div'],
    ALLOWED_ATTR: []
  });
});

// Use v-html with sanitized content
// <div v-html="sanitizedHTML"></div>
```

### 3. Event Handling in Templates

```javascript
// ✓ Good: Use event handlers in template
const handleCopyResponse = (text) => {
  navigator.clipboard.writeText(text);
  showNotification('Copied to clipboard');
};

// ✗ Avoid: Inline onclick handlers
// <button onclick="copy()">Copy</button>
```

### 4. Slot Data Access

```javascript
// ✓ Good: Access slot data properties correctly
// <template v-slot:promptItemTemplate="{data}">
//   <div>{{ data.prompt }}</div>
// </template>

// For responseItemTemplate, available data:
// - data.response: HTML response content
// - data.prompt: Original user prompt
// - data.index: Item index in prompts array
// - data.toolbarItems: Available toolbar actions
```

### 5. CSS Styling

```javascript
// ✓ Good: Use scoped styles with component
// <style scoped>
// .custom-banner { /* styles */ }
// </style>

// ✓ Good: Use Syncfusion CSS classes
// .e-aiassistview - main container
// .e-banner-view - banner section
// .e-response-item-template - response items
// .e-prompt-suggestion-item - suggestion items
```
