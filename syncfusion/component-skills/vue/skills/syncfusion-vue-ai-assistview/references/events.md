# Handling Events

## Table of Contents
- [Component Lifecycle Events](#component-lifecycle-events)
- [Prompt Interaction Events](#prompt-interaction-events)
- [Attachment Events](#attachment-events)
- [Telemetry Events](#telemetry-events)
- [Mention Events](#mention-events)
- [Event Arguments](#event-arguments)
- [Async Event Handling](#async-event-handling)
- [Event Patterns](#event-patterns)
- [Best Practices](#best-practices)

## Component Lifecycle Events

### Created Event

The `created` event is triggered when the AI AssistView component has finished rendering and is ready for interaction. This is the primary lifecycle hook for initialization.

**Event Type:** `EmitType<object>`

**When It Fires:**
- After component DOM is fully rendered
- After all internal properties are initialized
- Before user can interact with the component
- After all child components are mounted

**Basic Implementation:**

```vue
<template>
  <ejs-aiassistview
    ref="aiassist"
    :prompt-request="onPromptRequest"
    :created="onCreated"
  />
</template>

<script setup>
import { AIAssistViewComponent as EjsAiassistview } from "@syncfusion/ej2-vue-interactive-chat";
import { ref } from "vue";

const aiassist = ref(null);

const onCreated = () => {
  console.log('✅ AI AssistView component created and ready');
  
  // Access component instance
  const instance = aiassist.value.ej2Instances;
  console.log('Component instance:', instance);
};

const onPromptRequest = (args) => {
  setTimeout(() => {
    aiassist.value.addPromptResponse('Response to: ' + args.prompt);
  }, 1000);
};
</script>
```

**Initialize Default Content:**

```javascript
const onCreated = () => {
  const instance = aiassist.value.ej2Instances;
  
  // Set welcome message
  instance.prompt = 'Hello! How can I assist you today?';
  
  // Add initial suggestions
  if (instance.promptSuggestions) {
    instance.promptSuggestions = [
      'Tell me about your service',
      'How can I get started?',
      'What are your features?'
    ];
  }
};
```

**Load Conversation History:**

```javascript
const onCreated = async () => {
  try {
    // Load saved conversation
    const history = await fetchConversationHistory();
    
    if (history && history.length > 0) {
      const instance = aiassist.value.ej2Instances;
      instance.prompts = history;
      console.log(`Loaded ${history.length} previous conversations`);
    }
  } catch (error) {
    console.error('Failed to load history:', error);
  }
};
```

**Complete Initialization Pattern:**

```vue
<template>
  <div class="ai-assistant-wrapper">
    <div class="header">
      <h2>AI Assistant</h2>
      <span v-if="isReady" class="status">✅ Ready</span>
      <span v-else class="status">Loading...</span>
    </div>
    
    <ejs-aiassistview
      ref="aiassist"
      :prompt-request="onPromptRequest"
      :created="onCreated"
      :enable-attachments="true"
      :attachment-settings="attachmentSettings"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { AIAssistViewComponent as EjsAiassistview } from "@syncfusion/ej2-vue-interactive-chat";

const aiassist = ref(null);
const isReady = ref(false);

const attachmentSettings = {
  saveUrl: 'https://api.example.com/upload',
  removeUrl: 'https://api.example.com/remove'
};

const onCreated = async () => {
  try {
    // 1. Access component instance
    const instance = aiassist.value.ej2Instances;
    
    // 2. Load user preferences
    const userPrefs = await loadUserPreferences();
    
    // 3. Configure based on user preferences
    instance.locale = userPrefs.language || 'en';
    instance.height = userPrefs.height || '600px';
    
    // 4. Set initial suggestions
    instance.promptSuggestions = userPrefs.suggestions || [
      'What can you do?',
      'Tell me more',
      'Help me with this'
    ];
    
    // 5. Restore conversation history if available
    if (userPrefs.history?.length > 0) {
      instance.prompts = userPrefs.history;
    }
    
    // 6. Mark as ready
    isReady.value = true;
    console.log('✅ AI AssistView fully initialized');
    
    // 7. Log initialization
    logEvent({
      action: 'component_created',
      timestamp: new Date().toISOString(),
      preferencesLoaded: true
    });
    
  } catch (error) {
    console.error('❌ Initialization failed:', error);
    isReady.value = false;
  }
};

const onPromptRequest = (args) => {
  setTimeout(() => {
    aiassist.value.addPromptResponse('Response to: ' + args.prompt);
  }, 1000);
};

async function loadUserPreferences() {
  // Simulate API call
  return {
    language: 'en',
    height: '600px',
    suggestions: ['Hello', 'Help', 'FAQ'],
    history: []
  };
}

function logEvent(data) {
  console.log('Event logged:', data);
}
</script>

<style scoped>
.ai-assistant-wrapper {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background: #f5f5f5;
  border-radius: 4px;
}

.status {
  font-size: 12px;
  font-weight: bold;
}
</style>
```

**Use Cases:**
- ✅ Initialize default suggestions
- ✅ Set initial prompt text
- ✅ Restore conversation history
- ✅ Configure event handlers
- ✅ Load user preferences
- ✅ Set up authentication tokens
- ✅ Initialize analytics tracking
- ✅ Pre-load AI models or data

**Common Initialization Tasks:**

| Task | Example |
|------|---------|
| Load preferences | `instance.locale = userPrefs.language` |
| Set suggestions | `instance.promptSuggestions = suggestions` |
| Add welcome message | `instance.prompt = 'Welcome!'` |
| Load history | `instance.prompts = historicalPrompts` |
| Configure toolbar | `instance.footerToolbarSettings = config` |
| Enable features | `instance.enableAttachments = true` |
| Set dimensions | `instance.height = '600px'; instance.width = '100%'` |
| Initialize state | `sessionStorage.setItem('assistantReady', true)` |

## Prompt Interaction Events

### PromptRequest Event

The `promptRequest` event is triggered when a user submits a prompt in the AI AssistView. This is the primary event for handling user queries and processing responses.

```vue
<template>
  <ejs-aiassistview
    ref="aiassist"
    :prompt-request="onPromptRequest"
  />
</template>

<script setup>
import { AIAssistViewComponent as EjsAiassistview } from "@syncfusion/ej2-vue-interactive-chat";
import { ref } from "vue";

const aiassist = ref(null);

const onPromptRequest = (args) => {
  console.log('User prompt:', args.prompt);
  
  // Add response after processing
  setTimeout(() => {
    aiassist.value.addPromptResponse('Response to your prompt');
  }, 1000);
};
</script>
```

**Use Cases:**
- Call AI APIs (OpenAI, Gemini, Claude)
- Validate user input
- Log prompts and responses
- Update UI based on prompt content

### PromptChanged Event

The `promptChanged` event is triggered whenever the prompt text is modified in the AI AssistView input area.

```vue
<template>
  <ejs-aiassistview
    ref="aiassist"
    :prompt-request="onPromptRequest"
    :prompt-changed="onPromptChanged"
  />
</template>

<script setup>
import { AIAssistViewComponent as EjsAiassistview } from "@syncfusion/ej2-vue-interactive-chat";
import { ref } from "vue";

const aiassist = ref(null);
const charCount = ref(0);

const onPromptChanged = (args) => {
  console.log('Prompt text changed:', args.value);
  charCount.value = args.value.length;
  
  // Real-time suggestions based on input
  if (args.value.includes('help')) {
    // Update suggestions
  }
};

const onPromptRequest = (args) => {
  setTimeout(() => {
    aiassist.value.addPromptResponse('Response to: ' + args.prompt);
  }, 1000);
};
</script>
```

**Use Cases:**
- Real-time validation
- Character counting
- Dynamic suggestion generation
- Auto-save drafts
- Character limit enforcement

## Attachment Events

### BeforeAttachmentUpload Event

The `beforeAttachmentUpload` event is triggered before attached files begin uploading.

```vue
<template>
  <ejs-aiassistview
    ref="aiassist"
    :prompt-request="onPromptRequest"
    :before-attachment-upload="onBeforeAttachmentUpload"
    :enable-attachments="true"
    :attachment-settings="attachmentSettings"
  />
</template>

<script setup>
import { AIAssistViewComponent as EjsAiassistview } from "@syncfusion/ej2-vue-interactive-chat";
import { ref } from "vue";

const aiassist = ref(null);

const attachmentSettings = {
  saveUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Save',
  removeUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Remove'
};

const onBeforeAttachmentUpload = (args) => {
  // Validate file size (max 5MB)
  if (args.filesData[0].size > 5242880) {
    args.cancel = true;
    console.log('File too large');
  }
};

const onPromptRequest = (args) => {
  setTimeout(() => {
    aiassist.value.addPromptResponse('Response: ' + args.prompt);
  }, 1000);
};
</script>
```

**Use Cases:**
- Validate file size
- Check file type
- Prevent unwanted uploads
- Show custom validation messages

### AttachmentUploadSuccess Event

The `attachmentUploadSuccess` event is triggered when an attached file is successfully uploaded.

```vue
<template>
  <ejs-aiassistview
    ref="aiassist"
    :prompt-request="onPromptRequest"
    :attachment-upload-success="onAttachmentUploadSuccess"
    :enable-attachments="true"
    :attachment-settings="attachmentSettings"
  />
</template>

<script setup>
import { AIAssistViewComponent as EjsAiassistview } from "@syncfusion/ej2-vue-interactive-chat";
import { ref } from "vue";

const aiassist = ref(null);

const attachmentSettings = {
  saveUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Save',
  removeUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Remove'
};

const onAttachmentUploadSuccess = (args) => {
  console.log('File uploaded:', args.name);
  // Log upload or update UI
};

const onPromptRequest = (args) => {
  setTimeout(() => {
    aiassist.value.addPromptResponse('Response: ' + args.prompt);
  }, 1000);
};
</script>
```

### AttachmentUploadFailure Event

The `attachmentUploadFailure` event is triggered when an attached file upload fails.

```javascript
const onAttachmentUploadFailure = (args) => {
  console.error('Upload failed:', args.error);
  // Show error message to user
  aiassist.value.addPromptResponse('File upload failed. Please try again.');
};
```

### AttachmentRemoved Event

The `attachmentRemoved` event is triggered when an attached file is removed from the AI AssistView.

```javascript
const onAttachmentRemoved = (args) => {
  console.log('File removed:', args.name);
  // Update state or log removal
};
```

### AttachmentRemoving Event

The `attachmentRemoving` event is triggered when an attached file is being removed in the AI AssistView. It fires before the file is detached from the prompt, which makes it the right place to confirm with the user, cancel the removal, or log the operation.

#### Composition API (~/src/App.vue)

```vue
<template>
   <div id="container" style="height: 350px; width: 650px; margin: 0 auto;">
    <br />
    <ejs-aiassistview id="aiAssistView" ref="aiassist" :attachmentRemoving="attachmentRemoving" :promptRequest="onPromptRequest" :enableAttachments="true" :attachmentSettings="attachmentSettings"
    ></ejs-aiassistview>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { enableRipple } from '@syncfusion/ej2-base';
import { AIAssistViewComponent as EjsAiassistview } from '@syncfusion/ej2-vue-interactive-chat';

enableRipple(true);

const aiassist = ref(null);

const attachmentSettings = {
  saveUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Save',
  removeUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Remove'
};

// Prompt request handler
const onPromptRequest = () => {
  setTimeout(() => {
    const aiAssistInstance = aiassist.value?.ej2Instances;
    const defaultResponse =
      'For real-time prompt processing, connect the AIAssistView component to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
    aiAssistInstance.addPromptResponse(defaultResponse);
  }, 1000);
};

const attachmentRemoving = () => {
  // Your required action here
};
</script>

<style>
@import "../../node_modules/@syncfusion/ej2-base/styles/tailwind3.css";
@import "../../node_modules/@syncfusion/ej2-popups/styles/tailwind3.css";
@import "../../node_modules/@syncfusion/ej2-buttons/styles/tailwind3.css";
@import "../../node_modules/@syncfusion/ej2-inputs/styles/tailwind3.css";
@import "../../node_modules/@syncfusion/ej2-interactive-chat/styles/tailwind3.css";

</style>
```

#### Options API (~/src/App.vue)

```vue
<template>
  <div id="container" style="height: 350px; width: 650px; margin: 0 auto;">
    <br />
    <ejs-aiassistview id="aiAssistView" ref="aiassist" :attachmentRemoving="attachmentRemoving" :promptRequest="onPromptRequest" :enableAttachments="true" :attachmentSettings="attachmentSettings"
    ></ejs-aiassistview>
  </div>
</template>

<script>
import { enableRipple } from '@syncfusion/ej2-base';
import { AIAssistViewComponent } from '@syncfusion/ej2-vue-interactive-chat';

enableRipple(true);

export default {
  components: {
    'ejs-aiassistview': AIAssistViewComponent
  },
  data() {
    return {
      attachmentSettings: {
        saveUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Save',
        removeUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Remove'
      }
    };
  },
  methods: {
    onPromptRequest() {
      setTimeout(() => {
        const aiAssistInstance = this.$refs.aiassist.ej2Instances;
        const defaultResponse =
          'For real-time prompt processing, connect the AIAssistView component to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
        aiAssistInstance.addPromptResponse(defaultResponse);
      }, 1000);
    },
   attachmentRemoving() {
      // your code will be here
    }
  }
};
</script>

<style>
@import "../../node_modules/@syncfusion/ej2-base/styles/tailwind3.css";
@import "../../node_modules/@syncfusion/ej2-popups/styles/tailwind3.css";
@import "../../node_modules/@syncfusion/ej2-buttons/styles/tailwind3.css";
@import "../../node_modules/@syncfusion/ej2-inputs/styles/tailwind3.css";
@import "../../node_modules/@syncfusion/ej2-interactive-chat/styles/tailwind3.css";
</style>
```

#### Event Arguments

The `attachmentRemoving` callback receives an `args` object with the file metadata and a `cancel` flag. Set `args.cancel = true` to stop the removal.

| Property | Type | Description |
|----------|------|-------------|
| `cancel` | `boolean` | Defines whether the current action can be prevented. |
| `currentRequest` | `XMLHttpRequest` | Returns the XMLHttpRequest instance that is associated with the remove action. |
| `customFormData` | `{ [key: string]: Object }[]` | Defines the additional data with key and value pair format that will be submitted to the remove action. |
| `event` | `MouseEvent \| TouchEvent \| KeyboardEventArgs` | Returns the original event arguments. |
| `filesData` | [FileInfo[]](https://ej2.syncfusion.com/documentation/api/uploader/fileinfo) | Returns the list of files' details that will be removed. |
| `postRawFile` | `boolean` | Defines whether the selected raw file is sent to the server remove action. Set `true` to send the raw file, or `false` to send only the file name. |

#### Use Cases

- Confirm with the user before deleting an attachment (set `args.cancel = true` and prompt for confirmation).
- Block the removal of attachments larger than a threshold.
- Audit/log every file removal action.

### AttachmentClick Event

The `attachmentClick` event is triggered when an attached file is clicked in the AI AssistView.

```javascript
const onAttachmentClick = (args) => {
  console.log('Attachment clicked:', args.name);
  // Download or preview file
  window.open(args.url, '_blank');
};
```

## Telemetry Events

The `beforeReport` callback is configured through the `telemetrySettings` option rather than a top-level component event. It is invoked before every telemetry report is delivered, so you can inspect, modify, or suppress the report.

### beforeReport Callback

**When It Fires:**
- After a turn completes (response finalized) or is canceled
- Before the telemetry tooltip is rendered

**Callback Signature:**

```typescript
beforeReport?: (report: TelemetryReport) => TelemetryReport | null
```

**Basic Implementation:**

```vue
<template>
  <ejs-aiassistview
    ref="aiassist"
    :telemetry-settings="telemetrySettings"
    :prompt-request="onPromptRequest"
  />
</template>

<script setup>
import { ref } from "vue";
import { AIAssistViewComponent as EjsAiassistview } from "@syncfusion/ej2-vue-interactive-chat";

const aiassist = ref(null);

const telemetrySettings = {
  enable: true,
  // Invoked before every report is delivered. Return the report (modified or not)
  // to deliver it, or null to suppress the report entirely.
  beforeReport: (report) => {
    report.customAttributes = { region: 'us-east-1', tenant: 'acme', beta: true };
    return report;
  }
};

const onPromptRequest = (args) => {
  setTimeout(() => {
    aiassist.value.addPromptResponse('Response to: ' + args.prompt);
  }, 1000);
};
</script>
```

**Suppressing a Report:**

```javascript
const telemetrySettings = {
  enable: true,
  beforeReport: (report) => {
    // Skip telemetry for canceled test responses.
    if (report.status === 'canceled') {
      return null;
    }
    return report;
  }
};
```

> See [telemetry.md](./telemetry.md) for the full `TelemetryReport` shape, supported metrics, and the `metrics` filter.

## Mention Events

### MentionSelect Event

The `mentionSelect` event is triggered when a user selects an item from the mention suggestion popup. Use this event to access the selected mention data and perform custom actions such as analytics tracking or updating a side panel.

**When It Fires:**
- After a popup item is selected (mouse click or keyboard Enter)
- Before the mention is inserted into the prompt editor

**Basic Implementation (Composition API):**

```vue
<template>
  <ejs-aiassistview
    ref="aiassist"
    :mentions="mentions"
    :mention-select="onMentionSelect"
    :prompt-request="onPromptRequest"
  />
</template>

<script setup>
import { ref } from "vue";
import { AIAssistViewComponent as EjsAiassistview } from "@syncfusion/ej2-vue-interactive-chat";

const aiassist = ref(null);

const mentions = [
  {
    mentionChar: '@',
    dataSource: [
      { id: 'TechSupport', name: 'TechSupport' },
      { id: 'HRAssistant', name: 'HRAssistant' }
    ],
    fields: { text: 'name', value: 'id' }
  }
];

const onMentionSelect = (args) => {
  console.log('Selected mention:', args.itemData);

  // Example: log analytics for the selection
  if (args && args.itemData) {
    console.log('Mention id:', args.itemData.id, 'text:', args.text);
  }
};

const onPromptRequest = (args) => {
  setTimeout(() => {
    aiassist.value.addPromptResponse('Response: ' + args.prompt);
  }, 1000);
};
</script>
```

**Basic Implementation (Options API):**

```javascript
data() {
  return {
    mentions: [
      {
        mentionChar: '@',
        dataSource: [
          { id: 'TechSupport', name: 'TechSupport' },
          { id: 'HRAssistant', name: 'HRAssistant' }
        ],
        fields: { text: 'name', value: 'id' }
      }
    ]
  };
},
methods: {
  onMentionSelect(args) {
    console.log('Selected mention:', args.itemData);
  }
}
```

**Event Arguments:**

| Property | Type | Description |
|----------|------|-------------|
| `cancel` | `boolean` | Specifies whether the mention selection should be canceled. Set to `true` to prevent the default selection action. |
| `event` | `Event` | Specifies the original event that triggered the mention selection. Provides access to the underlying browser event details. |
| `isInteracted` | `boolean` | Specifies whether the selection was initiated through user interaction. Returns `true` when the action is performed directly by the user. |
| `itemData` | `FieldSettingsModel` | Specifies the data associated with the selected mention item. Contains the field settings information for the selected mention. |
| `name` | `string` | Specifies name of the event. |

> See [mentions.md](./mentions.md) for the full `mentions` configuration reference and complete examples.

## Event Arguments

### PromptRequest Event Arguments

The `promptRequest` event provides access to the `args` object with:
- `prompt` (string) - The user's query text
- `target` - The component instance for calling methods

```javascript
const onPromptRequest = (args) => {
  console.log('Prompt:', args.prompt);
  console.log('Component:', args.target);
  
  // Access component methods
  args.target.addPromptResponse('Response');
};
```

### PromptChanged Event Arguments

The `promptChanged` event provides:
- `value` (string) - Current prompt text
- `prevValue` (string) - Previous prompt text

```javascript
const onPromptChanged = (args) => {
  console.log('New value:', args.value);
  console.log('Previous value:', args.prevValue);
};
```

### Attachment Event Arguments

Common properties for attachment events:
- `name` (string) - Filename
- `size` (number) - File size in bytes
- `type` (string) - MIME type
- `filesData` (array) - File data array

```javascript
const onBeforeAttachmentUpload = (args) => {
  console.log('File name:', args.filesData[0].name);
  console.log('File size:', args.filesData[0].size);
  console.log('File type:', args.filesData[0].type);
  
  // Cancel upload if needed
  if (args.filesData[0].size > 10485760) { // 10MB
    args.cancel = true;
  }
};
```

## Async Event Handling

Handle events asynchronously to support API calls and long-running operations.

### Async/Await Pattern

```javascript
const onPromptRequest = async (args) => {
  try {
    const response = await fetchAIResponse(args.prompt);
    aiassist.value.addPromptResponse(response);
  } catch (error) {
    console.error('Error:', error);
    aiassist.value.addPromptResponse('Sorry, an error occurred');
  }
};

const fetchAIResponse = async (prompt) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Async response for: ' + prompt);
    }, 2000);
  });
};
```

### API Integration Example

```javascript
const onPromptRequest = async (args) => {
  try {
    const response = await fetch('/api/process-prompt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiToken}`
      },
      body: JSON.stringify({
        prompt: args.prompt,
        context: getUserContext()
      })
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    aiassist.value.addPromptResponse(data.response);
  } catch (error) {
    console.error('Failed to process prompt:', error);
    aiassist.value.addPromptResponse('Error processing your request');
  }
};
```

### Event Chaining

```javascript
const onCreated = () => {
  // Initialize when component loads
  loadConversationHistory();
};

const onPromptRequest = async (args) => {
  // Process new prompt
  const response = await getAIResponse(args.prompt);
  aiassist.value.addPromptResponse(response);
  
  // Then update UI
  updateSuggestionsForContext(args.prompt);
};

const onPromptChanged = (args) => {
  // Real-time updates while typing
  updateCharCount(args.value.length);
};
```

### Handling Multiple Events

```javascript
const handlers = {
  onCreated: () => {
    console.log('Component ready');
  },
  onPromptRequest: async (args) => {
    const response = await processPrompt(args.prompt);
    aiassist.value.addPromptResponse(response);
  },
  onPromptChanged: (args) => {
    updateUI(args.value);
  },
  onBeforeAttachmentUpload: (args) => {
    validateFile(args.filesData[0]);
  },
  onAttachmentUploadSuccess: (args) => {
    logUpload(args.name);
  }
};
```

## Error Handling in Events

Implement robust error handling in all event handlers.

### Try-Catch Pattern

```javascript
const onPromptRequest = async (args) => {
  try {
    if (!args.prompt?.trim()) {
      throw new Error('Prompt cannot be empty');
    }
    
    const response = await callAIService(args.prompt);
    aiassist.value.addPromptResponse(response);
  } catch (error) {
    const message = error.message === 'Network timeout' 
      ? 'Request timed out. Please try again.'
      : 'Service unavailable. Please try later.';
    aiassist.value.addPromptResponse(message);
  }
};
```

### Validation in Attachment Events

```javascript
const onBeforeAttachmentUpload = (args) => {
  const file = args.filesData[0];
  const MAX_SIZE = 10 * 1024 * 1024; // 10MB
  const ALLOWED_TYPES = ['application/pdf', 'text/plain', 'image/png'];
  
  if (file.size > MAX_SIZE) {
    args.cancel = true;
    aiassist.value.addPromptResponse('File too large. Max 10MB.');
  } else if (!ALLOWED_TYPES.includes(file.type)) {
    args.cancel = true;
    aiassist.value.addPromptResponse('File type not allowed.');
  }
};
```

## Event Lifecycle

### Complete Event Flow

```
created → (on component initialization)
  ↓
User interaction (typing, uploading)
  ↓
promptChanged → (while typing)
  ↓
promptRequest → (on submit)
  ↓
beforeAttachmentUpload → (if file attached)
  ↓
attachmentUploadSuccess/Failure → (async upload)
  ↓
Component re-renders with new state
```

### Managing Event Order

```javascript
// Composition setup with all events
const handleCreated = () => {
  console.log('1. Component initialized');
};

const handlePromptChanged = (args) => {
  console.log('2. Prompt changed:', args.value);
};

const handlePromptRequest = async (args) => {
  console.log('3. Prompt submitted:', args.prompt);
  // Main logic here
};

const handleBeforeAttachmentUpload = (args) => {
  console.log('4. File upload starting');
};

const handleAttachmentUploadSuccess = (args) => {
  console.log('5. File uploaded:', args.name);
};
```

## Common Event Patterns

### Pattern 1: Initialize on Created

```javascript
const onCreated = async () => {
  // Load user preferences
  const prefs = await loadUserPreferences();
  
  // Set initial suggestions
  aiassist.value.ej2Instances.promptSuggestions = prefs.suggestions;
  
  // Restore conversation history
  aiassist.value.ej2Instances.prompts = prefs.history;
};
```

### Pattern 2: Track Prompt Changes

```javascript
const debouncedSearch = ref(null);

const onPromptChanged = (args) => {
  clearTimeout(debouncedSearch.value);
  
  debouncedSearch.value = setTimeout(() => {
    if (args.value.length > 2) {
      updateSuggestions(args.value);
    }
  }, 300);
};
```

### Pattern 3: Handle File Attachments

```javascript
const onBeforeAttachmentUpload = (args) => {
  console.log('Uploading:', args.filesData[0].name);
};

const onAttachmentUploadSuccess = (args) => {
  console.log('Uploaded successfully:', args.name);
  // Send file reference with prompt
};

const onAttachmentUploadFailure = (args) => {
  console.error('Upload failed:', args.error);
  aiassist.value.addPromptResponse('Upload failed. Try again.');
};
```

## Best Practices

### 1. Always Provide Feedback
```javascript
// ✓ Good: Always respond to user actions
const onPromptRequest = async (args) => {
  try {
    const response = await getResponse(args.prompt);
    aiassist.value.addPromptResponse(response);
  } catch (error) {
    aiassist.value.addPromptResponse('Error: Please try again');
  }
};
```

### 2. Validate Before Processing
```javascript
// ✓ Good: Validate input early
const onPromptRequest = (args) => {
  if (!args.prompt?.trim()) {
    aiassist.value.addPromptResponse('Please enter a prompt');
    return;
  }
  // Process...
};
```

### 3. Use Timeouts for API Calls
```javascript
// ✓ Good: Prevent hanging requests
const withTimeout = (promise, ms) => {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Timeout')), ms)
    )
  ]);
};
```

### 4. Log Events for Debugging
```javascript
// ✓ Good: Track event execution
const onPromptRequest = async (args) => {
  const startTime = performance.now();
  try {
    const response = await getResponse(args.prompt);
    aiassist.value.addPromptResponse(response);
    console.log(`Completed in ${performance.now() - startTime}ms`);
  } catch (error) {
    console.error('Event failed:', error);
  }
};
```

### 5. Clean Up Timers
```javascript
// ✓ Good: Prevent memory leaks
let promptChangeTimer = null;

const onPromptChanged = (args) => {
  clearTimeout(promptChangeTimer);
  promptChangeTimer = setTimeout(() => {
    updateSuggestions(args.value);
  }, 300);
};

const onDestroy = () => {
  clearTimeout(promptChangeTimer);
};
```
