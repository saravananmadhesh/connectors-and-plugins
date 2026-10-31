# Views and Navigation

Configure multiple views in the AI AssistView component to provide different interaction modes or layouts for your users.

## Table of Contents
- [Overview](#overview)
- [Views Property](#views-property)
- [Active View](#active-view)
- [AssistViewModel Structure](#assistviewmodel-structure)
- [View Types](#view-types)
- [Complete Examples](#complete-examples)
- [Best Practices](#best-practices)

## Overview

The AI AssistView component supports multiple views, allowing you to switch between different layouts or functionalities. For example, you can have a default "Prompt" view for asking questions and a "Documentation" view for browsing help content.

## Views Property

The `views` property accepts an array of `AssistViewModel` objects that define the available views:

```vue
<template>
  <div style="height: 500px; width: 700px;">
    <ejs-aiassistview
      ref="aiassist"
      :views="viewModels"
      :active-view="activeViewIndex"
      :prompt-request="onPromptRequest"
    />
  </div>
</template>

<script setup>
import { AIAssistViewComponent as EjsAiassistview } from "@syncfusion/ej2-vue-interactive-chat";
import { ref } from 'vue';

const aiassist = ref(null);
const activeViewIndex = ref(0);  // Start with first view

const viewModels = [
  {
    name: 'Prompt',
    type: 'Assist',
    iconCss: 'e-icons e-search'
  },
  {
    name: 'Documentation',
    type: 'Custom',
    iconCss: 'e-icons e-book',
    viewTemplate: 'documentationTemplate'
  }
];

const onPromptRequest = (args) => {
  setTimeout(() => {
    aiassist.value.addPromptResponse('Response to: ' + args.prompt);
  }, 1000);
};
</script>
```

## Active View

The `activeView` property specifies which view is currently displayed by its index (0-based):

### Basic Usage

```vue
<template>
  <div>
    <!-- View selector buttons -->
    <button @click="activeViewIndex = 0">Prompt View</button>
    <button @click="activeViewIndex = 1">Documentation View</button>

    <ejs-aiassistview
      ref="aiassist"
      :views="viewModels"
      :active-view="activeViewIndex"
      :prompt-request="onPromptRequest"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const activeViewIndex = ref(0);  // Initially show first view
// When user clicks "Documentation View" button:
// activeViewIndex.value = 1  // Switch to second view
</script>
```

### Programmatic View Switching

```javascript
// Get current active view
const currentViewIndex = aiassist.value.ej2Instances.activeView;
console.log(`Currently on view: ${viewModels[currentViewIndex].name}`);

// Switch to a specific view
const switchToView = (viewIndex) => {
  aiassist.value.ej2Instances.activeView = viewIndex;
};

// Switch to Documentation view
switchToView(1);

// Switch to next view
const nextView = () => {
  const currentIndex = aiassist.value.ej2Instances.activeView;
  const nextIndex = (currentIndex + 1) % viewModels.length;
  aiassist.value.ej2Instances.activeView = nextIndex;
};
```

## AssistViewModel Structure

Each view is defined using the `AssistViewModel` interface with these properties:

| Property | Type | Description | Required |
|----------|------|-------------|----------|
| `name` | string | Display name of the view | Yes |
| `type` | AssistViewType | 'Assist' or 'Custom' | Yes |
| `iconCss` | string | CSS icon class for the view tab | No |
| `viewTemplate` | string/function | Custom template for Custom views | Only for Custom type |

### Basic AssistViewModel

```javascript
{
  name: 'Chat',
  type: 'Assist',
  iconCss: 'e-icons e-chat'
}
```

### Custom View with Template

```javascript
{
  name: 'Settings',
  type: 'Custom',
  iconCss: 'e-icons e-settings',
  viewTemplate: 'settingsTemplate'  // Reference to slot template
}
```

## View Types

### Assist View Type (Default)

The `Assist` type provides the default AI conversation interface:

```javascript
const assistView = {
  name: 'AI Assistant',
  type: 'Assist',
  iconCss: 'e-icons e-bot'
};
```

**Features:**
- Prompt input area
- Suggestion chips
- Conversation history
- Standard toolbar

### Custom View Type

The `Custom` type lets you define a completely custom layout:

```javascript
const customView = {
  name: 'Custom',
  type: 'Custom',
  iconCss: 'e-icons e-custom',
  viewTemplate: 'myCustomTemplate'
};
```

**Template Example (Composition API):**
```vue
<template v-slot:myCustomTemplate="">
  <div class="custom-view-container">
    <h3>Custom View Content</h3>
    <div class="custom-content">
      <!-- Your custom HTML here -->
    </div>
  </div>
</template>

<style scoped>
.custom-view-container {
  padding: 20px;
  background-color: #f5f5f5;
}
</style>
```

## Complete Examples

### Example 1: Basic Dual View

```vue
<template>
  <div style="height: 500px; width: 700px;">
    <ejs-aiassistview
      ref="aiassist"
      :views="viewModels"
      :active-view="activeViewIndex"
      :prompt-request="onPromptRequest"
    >
      <template v-slot:documentationTemplate="">
        <div class="documentation-view">
          <h3>Documentation</h3>
          <ul>
            <li><a href="#getting-started">Getting Started</a></li>
            <li><a href="#api">API Reference</a></li>
            <li><a href="#examples">Examples</a></li>
          </ul>
        </div>
      </template>
    </ejs-aiassistview>
  </div>
</template>

<script setup>
import { AIAssistViewComponent as EjsAiassistview } from "@syncfusion/ej2-vue-interactive-chat";
import { ref } from 'vue';

const aiassist = ref(null);
const activeViewIndex = ref(0);

const viewModels = [
  {
    name: 'Chat',
    type: 'Assist',
    iconCss: 'e-icons e-chat'
  },
  {
    name: 'Documentation',
    type: 'Custom',
    iconCss: 'e-icons e-book',
    viewTemplate: 'documentationTemplate'
  }
];

const onPromptRequest = (args) => {
  if (activeViewIndex.value === 0) {
    // Handle chat in Assist view
    setTimeout(() => {
      aiassist.value.addPromptResponse('Response to: ' + args.prompt);
    }, 1000);
  }
};
</script>

<style scoped>
.documentation-view {
  padding: 20px;
  background: white;
}

.documentation-view ul {
  list-style: none;
  padding: 0;
}

.documentation-view li {
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}

.documentation-view a {
  color: #0066cc;
  text-decoration: none;
}

.documentation-view a:hover {
  text-decoration: underline;
}
</style>
```

### Example 2: Three View Setup

```vue
<template>
  <div style="height: 600px; width: 800px;">
    <ejs-aiassistview
      ref="aiassist"
      :views="viewModels"
      :active-view="activeViewIndex"
      :prompt-request="onPromptRequest"
    >
      <template v-slot:settingsTemplate="">
        <div class="settings-view">
          <h3>Settings</h3>
          <label>
            <input type="checkbox" v-model="autoScroll" />
            Auto-scroll to latest message
          </label>
          <label>
            <input type="checkbox" v-model="showTimestamps" />
            Show message timestamps
          </label>
        </div>
      </template>

      <template v-slot:historyTemplate="">
        <div class="history-view">
          <h3>Conversation History</h3>
          <div v-if="conversationHistory.length === 0" class="empty-state">
            No conversation history
          </div>
          <div v-for="(item, index) in conversationHistory" :key="index" class="history-item">
            <strong>Q:</strong> {{ item.prompt }}<br>
            <strong>A:</strong> {{ truncateText(item.response, 100) }}
          </div>
        </div>
      </template>
    </ejs-aiassistview>
  </div>
</template>

<script setup>
import { AIAssistViewComponent as EjsAiassistview } from "@syncfusion/ej2-vue-interactive-chat";
import { ref, computed } from 'vue';

const aiassist = ref(null);
const activeViewIndex = ref(0);
const autoScroll = ref(true);
const showTimestamps = ref(false);

const viewModels = [
  {
    name: 'Chat',
    type: 'Assist',
    iconCss: 'e-icons e-chat'
  },
  {
    name: 'History',
    type: 'Custom',
    iconCss: 'e-icons e-history',
    viewTemplate: 'historyTemplate'
  },
  {
    name: 'Settings',
    type: 'Custom',
    iconCss: 'e-icons e-settings',
    viewTemplate: 'settingsTemplate'
  }
];

const conversationHistory = computed(() => {
  return aiassist.value?.ej2Instances?.prompts || [];
});

const truncateText = (text, length) => {
  return text.substring(0, length) + (text.length > length ? '...' : '');
};

const onPromptRequest = (args) => {
  setTimeout(() => {
    aiassist.value.addPromptResponse('Processing: ' + args.prompt);
  }, 1000);
};
</script>

<style scoped>
.settings-view, .history-view {
  padding: 20px;
}

.settings-view label {
  display: block;
  margin: 10px 0;
  cursor: pointer;
}

.history-item {
  padding: 10px;
  margin: 10px 0;
  background: #f9f9f9;
  border-left: 3px solid #0066cc;
  border-radius: 4px;
}

.empty-state {
  padding: 20px;
  color: #999;
  text-align: center;
}
</style>
```

### Example 3: Dynamic View Management

```javascript
// Dynamically add a new view at runtime
const addNewView = (viewName, viewType) => {
  const newView = {
    name: viewName,
    type: viewType,
    iconCss: 'e-icons e-custom'
  };
  
  viewModels.push(newView);
};

// Remove a view
const removeView = (viewIndex) => {
  viewModels.splice(viewIndex, 1);
  
  // If removed view was active, switch to first view
  if (activeViewIndex.value >= viewModels.length) {
    activeViewIndex.value = 0;
  }
};

// Get all views
const getAllViews = () => {
  return viewModels;
};

// Get current active view info
const getCurrentView = () => {
  return viewModels[activeViewIndex.value];
};

// Switch to view by name
const switchToViewByName = (viewName) => {
  const index = viewModels.findIndex(v => v.name === viewName);
  if (index !== -1) {
    activeViewIndex.value = index;
  }
};
```

## Best Practices

### 1. Use Meaningful View Names
```javascript
// ✓ Good: Clear, descriptive names
const viewModels = [
  { name: 'Chat', type: 'Assist' },
  { name: 'Documentation', type: 'Custom' },
  { name: 'Settings', type: 'Custom' }
];

// ✗ Avoid: Vague names
const viewModels = [
  { name: 'View 1', type: 'Assist' },
  { name: 'View 2', type: 'Custom' }
];
```

### 2. Provide Icon Context
```javascript
// ✓ Good: Consistent Syncfusion icons
{
  name: 'Chat',
  iconCss: 'e-icons e-chat',
  type: 'Assist'
}

// ✓ Good: Custom icons with clear meaning
{
  name: 'Documentation',
  iconCss: 'custom-icon-book',
  type: 'Custom'
}
```

### 3. Handle View State Separately
```javascript
// ✓ Good: Maintain view-specific state
const chatState = ref({ history: [] });
const settingsState = ref({ theme: 'light' });

const switchView = (index) => {
  // Save current view state
  saveCurrentViewState();
  // Load new view state
  loadViewState(index);
};
```

### 4. Monitor View Changes
```javascript
import { watch } from 'vue';

// Watch for active view changes
watch(() => activeViewIndex.value, (newIndex, oldIndex) => {
  console.log(`Switched from view ${oldIndex} to view ${newIndex}`);
  // Perform cleanup or initialization
});
```

### 5. Limit Number of Views
```javascript
// ✓ Good: Keep views reasonable (3-5)
const viewModels = [
  { name: 'Chat', type: 'Assist' },
  { name: 'History', type: 'Custom' },
  { name: 'Settings', type: 'Custom' }
];

// ✗ Avoid: Too many views
const viewModels = Array.from({ length: 20 }, (_, i) => ({
  name: `View ${i}`,
  type: 'Custom'
}));
```
