# Toolbar Configuration

Configure toolbars in different areas of the AI AssistView component to control user interactions with prompts, responses, and footer.

## Table of Contents
- [Overview](#overview)
- [Toolbar Positioning](#toolbar-positioning)
- [Toolbar Types](#toolbar-types)
- [ToolbarItemModel Reference](#toolbaritemmodel-reference)
- [Prompt Toolbar](#prompt-toolbar)
- [Response Toolbar](#response-toolbar)
- [Regenerate Responses](#regenerate-responses)
- [Footer Toolbar](#footer-toolbar)
- [Complete Examples](#complete-examples)
- [Best Practices](#best-practices)

## Overview

The AI AssistView component provides three configurable toolbar areas:
1. **Prompt Toolbar** - Actions on user prompts (`promptToolbarSettings`)
2. **Response Toolbar** - Actions on AI responses (`responseToolbarSettings`)
3. **Footer Toolbar** - Controls in the footer area (`footerToolbarSettings`)

Each toolbar displays `ToolbarItemModel` items that users can interact with.

## Toolbar Positioning

### ToolbarPosition Enum

Toolbars can be positioned using the `toolbarPosition` property:

| Value | Description |
|-------|-------------|
| `Bottom` | Display toolbar at the bottom of the area |
| `Inline` | Display toolbar inline with the content |

```vue
<template>
  <ejs-aiassistview
    :footer-toolbar-settings="footerToolbarSettings"
  />
</template>

<script setup>
const footerToolbarSettings = {
  toolbarPosition: 'Bottom',  // or 'Inline'
  items: [/* toolbar items */]
};
</script>
```

## Toolbar Types

### Toolbar Settings Structure

Each toolbar setting follows this structure:

| Property | Type | Description |
|----------|------|-------------|
| `items` | ToolbarItemModel[] | Array of toolbar items to display |
| `toolbarPosition` | ToolbarPosition | Bottom or Inline positioning (footer/prompt only) |
| `width` | string/number | Width of the toolbar (optional) |

### ToolbarItemModel Properties

For detailed documentation, see **ToolbarItemModel Reference** section below.

## ToolbarItemModel Reference

Complete reference for toolbar items used in all three toolbars.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `text` | string | — | Display text of the item |
| `iconCss` | string | — | CSS class for icon |
| `tooltip` | string | — | Hover tooltip text |
| `type` | ItemType | — | Button, Separator, or Input |
| `cssClass` | string | — | Custom CSS class |
| `disabled` | boolean | false | Disable interaction |
| `align` | ItemAlign | — | Left, Center, or Right |
| `visible` | boolean | true | Show/hide item |
| `tabIndex` | number | — | Keyboard navigation order |
| `template` | string/function | — | Custom template |

### ItemType Enum

```
Button    - Clickable button
Separator - Visual separator line
Input     - Input field container
```

### ItemAlign Enum

```
Left   - Align to left
Center - Align to center
Right  - Align to right
```

### Setting Alignment

Use the `align` property on any `ToolbarItemModel` to control where the item is rendered within the toolbar. The default value is `Left`. The available values are `Left`, `Center`, and `Right`.

**Composition API (~/src/App.vue)**

```vue
<template>
  <div id='container' style="height: 350px; width: 650px; margin: 0 auto;">
    <br>
    <ejs-aiassistview id='aiAssistView' :toolbar-settings="toolbarSettings" :prompt-request="onPromptRequest" ref="aiassist"></ejs-aiassistview>
  </div>
</template>

<script setup>
import { AIAssistViewComponent as EjsAiassistview } from "@syncfusion/ej2-vue-interactive-chat";
import { ref } from "vue";

let aiassist = ref(null);

const toolbarSettings = {
  items: [ { iconCss: 'e-icons e-refresh', align: 'Right' } ]
};

const onPromptRequest = (args) => {
  setTimeout(() => {
    let defaultResponse = 'For real-time prompt processing, connect the AIAssistView component to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
    aiassist.value.addPromptResponse(defaultResponse);
  }, 1000);
};
</script>

<style>
@import "../node_modules/@syncfusion/ej2-base/styles/tailwind3.css";
@import "../node_modules/@syncfusion/ej2-inputs/styles/tailwind3.css";
@import "../node_modules/@syncfusion/ej2-navigations/styles/tailwind3.css";
@import "../node_modules/@syncfusion/ej2-notifications/styles/tailwind3.css";
@import "../node_modules/@syncfusion/ej2-layouts/styles/tailwind3.css";
@import "../node_modules/@syncfusion/ej2-interactive-chat/styles/tailwind3.css";
</style>
```

**Options API (~/src/App.vue)**

```vue
<template>
  <div id='container' style="height: 350px; width: 650px; margin: 0 auto;">
    <br>
    <ejs-aiassistview id='aiAssistView' :toolbar-settings="toolbarSettings" :prompt-request="onPromptRequest" ref="aiassist"></ejs-aiassistview>
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
      toolbarSettings: {
        items: [ { iconCss: 'e-icons e-refresh', align: 'Right' } ]
      }
    }
  },
  methods: {
    onPromptRequest: function (args) {
      setTimeout(() => {
        let defaultAiassist = this.$refs.aiassist.ej2Instances;
        let defaultResponse = 'For real-time prompt processing, connect the AI AssistView component to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
        defaultAiassist.addPromptResponse(defaultResponse);
      }, 1000);
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
</style>
```

> The `align` property works the same way on every toolbar (`toolbarSettings`, `promptToolbarSettings`, `responseToolbarSettings`, and `footerToolbarSettings`).

## Prompt Toolbar

The prompt toolbar displays actions associated with user prompts.

### Configuration

```vue
<template>
  <ejs-aiassistview
    :prompt-toolbar-settings="promptToolbarSettings"
  />
</template>

<script setup>
const promptToolbarSettings = {
  items: [
    {
      text: 'Edit',
      iconCss: 'e-icons e-edit',
      tooltip: 'Edit prompt',
      type: 'Button',
      align: 'Left'
    },
    {
      text: 'Delete',
      iconCss: 'e-icons e-delete',
      tooltip: 'Delete prompt',
      type: 'Button',
      align: 'Right'
    }
  ],
  width: 'auto'
};
</script>
```

### Common Prompt Actions

```javascript
const promptToolbarSettings = {
  items: [
    // Copy prompt text
    {
      text: 'Copy',
      iconCss: 'e-icons e-copy',
      tooltip: 'Copy prompt text',
      type: 'Button'
    },
    // Edit prompt
    {
      text: 'Edit',
      iconCss: 'e-icons e-edit',
      tooltip: 'Edit this prompt',
      type: 'Button'
    },
    // Regenerate response
    {
      text: 'Regenerate',
      iconCss: 'e-icons e-refresh',
      tooltip: 'Regenerate response',
      type: 'Button'
    },
    // Delete
    {
      text: 'Delete',
      iconCss: 'e-icons e-delete',
      tooltip: 'Remove this exchange',
      type: 'Button'
    }
  ]
};
```

## Response Toolbar

The response toolbar displays actions associated with AI responses.

### Configuration

```vue
<template>
  <ejs-aiassistview
    :response-toolbar-settings="responseToolbarSettings"
  />
</template>

<script setup>
const responseToolbarSettings = {
  items: [
    {
      text: 'Copy',
      iconCss: 'e-icons e-copy',
      tooltip: 'Copy response',
      type: 'Button',
      align: 'Left'
    },
    {
      type: 'Separator',
      align: 'Center'
    },
    {
      text: 'Helpful',
      iconCss: 'e-icons e-thumbs-up',
      tooltip: 'Mark as helpful',
      type: 'Button',
      align: 'Right'
    },
    {
      text: 'Not Helpful',
      iconCss: 'e-icons e-thumbs-down',
      tooltip: 'Mark as not helpful',
      type: 'Button',
      align: 'Right'
    }
  ],
  width: '100%'
};
</script>
```

### Common Response Actions

```javascript
const responseToolbarSettings = {
  items: [
    // Copy to clipboard
    {
      text: 'Copy',
      iconCss: 'e-icons e-copy',
      tooltip: 'Copy response to clipboard',
      type: 'Button'
    },
    // Download response
    {
      text: 'Download',
      iconCss: 'e-icons e-download',
      tooltip: 'Download as file',
      type: 'Button'
    },
    // Share response
    {
      text: 'Share',
      iconCss: 'e-icons e-share',
      tooltip: 'Share this response',
      type: 'Button'
    },
    // Separator
    {
      type: 'Separator'
    },
    // Feedback
    {
      text: 'Helpful',
      iconCss: 'e-icons e-like',
      tooltip: 'Helpful response',
      type: 'Button'
    },
    {
      text: 'Not Helpful',
      iconCss: 'e-icons e-dislike',
      tooltip: 'Not helpful',
      type: 'Button'
    }
  ]
};
```

## Regenerate Responses

The AI AssistView supports regenerate functionality, allowing users to request alternative AI responses for an existing prompt. The navigation buttons with `previous` and `next` buttons are rendered along with a response counter (e.g., `1 / 3`) allowing users to navigate between all regenerated responses for the prompt.

> The navigation UI appears automatically once more than one response is available for a prompt either re-generated or preloaded using the `regeneratedResponses` property in prompts collection.

### Adding Regenerate Item

You can enable the regenerate button by adding the `e-assist-regenerate` icon to the `items` collection of the `responseToolbarSettings` property.

#### Adding regenerated response

When regenerated, it triggers the `promptRequest` event with the existing prompt, enabling you to call your preferred AI service again and update the response using the `addPromptResponse` method.

```vue
<template>
  <div id='container' style="height: 350px; width: 650px; margin: 0 auto;">
    <br>
    <ejs-aiassistview id='aiAssistView' :prompts="promptsData" :response-toolbar-settings="responseToolbarSettings" :prompt-request="onPromptRequest" ref="aiassist"></ejs-aiassistview>
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

const regenerateResponses = [
  "AI, or Artificial Intelligence, refers to the simulation of human intelligence in machines programmed to think and learn like humans.",
  "Artificial Intelligence is the development of computer systems capable of performing tasks that typically require human intelligence.",
  "AI is a branch of computer science focused on building machines that can perform tasks requiring human-like intelligence."
];

const responseToolbarSettings = {
  items: [
    { type: 'Button', iconCss: 'e-icons e-assist-copy', tooltip: 'Copy' },
    { type: 'Button', iconCss: 'e-icons e-assist-like', tooltip: 'Like' },
    { type: 'Button', iconCss: 'e-icons e-assist-dislike', tooltip: 'Need Improvement' },
    { type: 'Button', iconCss: 'e-icons e-assist-regenerate', tooltip: 'Regenerate' }
  ]
};

const onPromptRequest = (args) => {
  setTimeout(() => {
    const isRegenerate = promptsData.some((p) => p.prompt === args.prompt);
    const response = isRegenerate
      ? regenerateResponses[Math.floor(Math.random() * regenerateResponses.length)]
      : 'For real-time prompt processing, connect the AIAssistView component to your preferred AI service, such as OpenAI or Azure Cognitive Services.';
    aiassist.value.ej2Instances.addPromptResponse(response);
  }, 1000);
};
</script>

<style>
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/ai-assistview/index.css";
</style>

```

### Pre-loading Regenerated Responses

You can use the `regeneratedResponses` property in the `prompts` property collection to pre-load multiple responses for a prompt at the initial render, without requiring the user to trigger the regenerate action. Users can navigate between the pre-loaded responses using the `previous` and `next` buttons in the response navigation UI.

```vue
<template>
  <div id='container' style="height: 350px; width: 650px; margin: 0 auto;">
    <br>
    <ejs-aiassistview id='aiAssistView' :prompts="promptsData" :response-toolbar-settings="responseToolbarSettings" :prompt-request="onPromptRequest" ref="aiassist"></ejs-aiassistview>
  </div>
</template>

<script setup>
import { AIAssistViewComponent as EjsAiassistview } from "@syncfusion/ej2-vue-interactive-chat";
import { ref } from "vue";

let aiassist = ref(null);

const promptsData = [
  {
    prompt: "What is AI?",
    response: "AI stands for Artificial Intelligence, enabling machines to mimic human intelligence for tasks such as learning, problem-solving, and decision-making.",
    regeneratedResponses: [
      "AI, or Artificial Intelligence, refers to the simulation of human intelligence in machines programmed to think and learn like humans.",
      "Artificial Intelligence is the development of computer systems capable of performing tasks that typically require human intelligence.",
      "AI is a branch of computer science focused on building machines that can perform tasks requiring human-like intelligence."
    ]
  }
];

const responseToolbarSettings = {
  items: [
    { type: 'Button', iconCss: 'e-icons e-assist-copy', tooltip: 'Copy' },
    { type: 'Button', iconCss: 'e-icons e-assist-like', tooltip: 'Like' },
    { type: 'Button', iconCss: 'e-icons e-assist-dislike', tooltip: 'Need Improvement' },
    { type: 'Button', iconCss: 'e-icons e-assist-regenerate', tooltip: 'Regenerate' }
  ]
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

## Footer Toolbar

The footer toolbar displays controls in the bottom footer area of the component.

### Configuration

```vue
<template>
  <ejs-aiassistview
    :footer-toolbar-settings="footerToolbarSettings"
  />
</template>

<script setup>
const footerToolbarSettings = {
  items: [
    {
      text: 'Clear',
      iconCss: 'e-icons e-close',
      tooltip: 'Clear conversation',
      type: 'Button',
      align: 'Left'
    },
    {
      text: 'Settings',
      iconCss: 'e-icons e-settings',
      tooltip: 'Open settings',
      type: 'Button',
      align: 'Right'
    }
  ],
  toolbarPosition: 'Bottom',
  width: '100%'
};
</script>
```

### Common Footer Actions

```javascript
const footerToolbarSettings = {
  items: [
    // Clear history
    {
      text: 'Clear',
      iconCss: 'e-icons e-trash',
      tooltip: 'Clear all messages',
      type: 'Button',
      align: 'Left'
    },
    // Export
    {
      text: 'Export',
      iconCss: 'e-icons e-export',
      tooltip: 'Export conversation',
      type: 'Button'
    },
    // Settings
    {
      text: 'Settings',
      iconCss: 'e-icons e-settings',
      tooltip: 'Configure settings',
      type: 'Button',
      align: 'Right'
    }
  ],
  toolbarPosition: 'Bottom'
};
```

## Complete Examples

### Example 1: Full Toolbar Setup

```vue
<template>
  <div style="height: 600px; width: 800px;">
    <ejs-aiassistview
      ref="aiassist"
      :prompt-toolbar-settings="promptToolbarSettings"
      :response-toolbar-settings="responseToolbarSettings"
      :footer-toolbar-settings="footerToolbarSettings"
      :prompt-request="onPromptRequest"
    />
  </div>
</template>

<script setup>
import { AIAssistViewComponent as EjsAiassistview } from "@syncfusion/ej2-vue-interactive-chat";
import { ref } from 'vue';

const aiassist = ref(null);

const promptToolbarSettings = {
  items: [
    { text: 'Copy', iconCss: 'e-icons e-copy', type: 'Button', align: 'Left' },
    { text: 'Edit', iconCss: 'e-icons e-edit', type: 'Button', align: 'Left' },
    { type: 'Separator' },
    { text: 'Delete', iconCss: 'e-icons e-delete', type: 'Button', align: 'Right' }
  ]
};

const responseToolbarSettings = {
  items: [
    { text: 'Copy', iconCss: 'e-icons e-copy', type: 'Button', align: 'Left' },
    { type: 'Separator' },
    { text: 'Like', iconCss: 'e-icons e-like', type: 'Button', align: 'Right' },
    { text: 'Dislike', iconCss: 'e-icons e-dislike', type: 'Button', align: 'Right' }
  ]
};

const footerToolbarSettings = {
  items: [
    { text: 'Clear', iconCss: 'e-icons e-trash', type: 'Button', align: 'Left' },
    { text: 'Settings', iconCss: 'e-icons e-settings', type: 'Button', align: 'Right' }
  ],
  toolbarPosition: 'Bottom'
};

const onPromptRequest = (args) => {
  setTimeout(() => {
    aiassist.value.addPromptResponse('Response to: ' + args.prompt);
  }, 1000);
};
</script>
```

### Example 2: Conditional Toolbar Items

```javascript
import { ref, computed } from 'vue';

const userRole = ref('user');  // 'user' or 'admin'

const responseToolbarSettings = computed(() => ({
  items: [
    { text: 'Copy', iconCss: 'e-icons e-copy', type: 'Button' },
    // Admin-only delete button
    {
      text: 'Delete',
      iconCss: 'e-icons e-delete',
      type: 'Button',
      visible: userRole.value === 'admin'
    },
    // Regular feedback
    { text: 'Like', iconCss: 'e-icons e-like', type: 'Button' },
    { text: 'Dislike', iconCss: 'e-icons e-dislike', type: 'Button' }
  ]
}));
```

### Example 3: Width Control

```javascript
// Fixed width
const narrowToolbar = {
  items: [/*...*/],
  width: '200px'
};

// Percentage width
const fullWidthToolbar = {
  items: [/*...*/],
  width: '100%'
};

// Auto width
const autoWidthToolbar = {
  items: [/*...*/],
  width: 'auto'
};

// Numeric (pixels)
const pixelWidthToolbar = {
  items: [/*...*/],
  width: 300
};
```

### Example 4: Toolbar Positioning

```javascript
// Bottom positioning (default)
const footerToolbarSettings = {
  items: [/*...*/],
  toolbarPosition: 'Bottom'
};

// Inline positioning
const footerToolbarSettings = {
  items: [/*...*/],
  toolbarPosition: 'Inline'
};
```

### Example 5: Complex Toolbar with Separators

```javascript
const responseToolbarSettings = {
  items: [
    // Left side - Actions
    { text: 'Copy', iconCss: 'e-icons e-copy', type: 'Button', align: 'Left' },
    { text: 'Download', iconCss: 'e-icons e-download', type: 'Button', align: 'Left' },
    
    // Center separator
    { type: 'Separator', align: 'Center' },
    
    // Right side - Feedback
    { text: 'Helpful', iconCss: 'e-icons e-check', type: 'Button', align: 'Right' },
    { text: 'Not Helpful', iconCss: 'e-icons e-close', type: 'Button', align: 'Right' }
  ],
  width: '100%'
};
```

## Best Practices

### 1. Consistent Icon Usage
```javascript
// ✓ Good: Use consistent Syncfusion icon classes
const toolbarSettings = {
  items: [
    { text: 'Copy', iconCss: 'e-icons e-copy' },
    { text: 'Delete', iconCss: 'e-icons e-delete' }
  ]
};

// ✗ Avoid: Mixing icon sources
const toolbarSettings = {
  items: [
    { text: 'Copy', iconCss: 'e-icons e-copy' },
    { text: 'Delete', iconCss: 'fa fa-trash' }  // Different library
  ]
};
```

### 2. Meaningful Tooltips
```javascript
// ✓ Good: Clear, descriptive tooltips
{
  text: 'Copy',
  tooltip: 'Copy response to clipboard',
  iconCss: 'e-icons e-copy'
}

// ✗ Avoid: Vague tooltips
{
  text: 'Copy',
  tooltip: 'Copy',  // Redundant with text
  iconCss: 'e-icons e-copy'
}
```

### 3. Logical Item Ordering
```javascript
// ✓ Good: Group related actions
items: [
  // Read actions
  { text: 'Copy', align: 'Left' },
  { text: 'Download', align: 'Left' },
  { type: 'Separator' },
  // Write actions
  { text: 'Edit', align: 'Right' },
  { text: 'Delete', align: 'Right' }
]
```

### 4. Proper Alignment
```javascript
// ✓ Good: Mixed alignment for visual balance
items: [
  { text: 'Copy', align: 'Left' },      // Left actions
  { type: 'Separator', align: 'Center' }, // Center separator
  { text: 'Like', align: 'Right' },     // Right feedback
  { text: 'Dislike', align: 'Right' }
]
```

### 5. Disable vs Hide
```javascript
// ✓ Good: Use disabled for temporarily unavailable actions
{
  text: 'Export',
  disabled: !isExportAvailable.value,
  iconCss: 'e-icons e-export'
}

// ✓ Good: Use visible to completely hide actions
{
  text: 'Admin Delete',
  visible: isAdmin.value,
  iconCss: 'e-icons e-delete'
}
```
