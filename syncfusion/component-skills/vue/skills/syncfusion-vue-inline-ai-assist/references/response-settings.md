# Response Settings and Actions

## Table of Contents
- [Overview](#overview)
- [Response Mode Configuration](#response-mode-configuration)
- [Built-in Response Items](#built-in-response-items)
- [Custom Response Items](#custom-response-items)
- [Response Item Properties](#response-item-properties)
- [Response Grouping](#response-grouping)
- [Item Selection Handling](#item-selection-handling)
- [Event Arguments Reference](#event-arguments-reference)
- [Complete Examples](#complete-examples)
- [Troubleshooting](#troubleshooting)

## Overview

The `responseSettings` property configures the response action popup that appears after an AI response is generated. It allows users to accept, reject, or perform custom actions on the response.

## Response Mode Configuration

The `responseMode` property determines how AI responses are displayed in the component. It accepts two values from the `ResponseMode` enum.

### ResponseMode Enum Values

| Mode | Description | Use Case |
|------|-------------|----------|
| **Popup** (default) | Displays response in a popup above the prompt area | Best for focused interaction, editing scenarios |
| **Inline** | Renders response at the caret/cursor position | Best for seamless text insertion, document editing |

### Using Popup Mode (Default)

```vue
<template>
  <div style="height: 350px; width: 650px; margin: 0 auto;">
    <br />
    <button @click="showPopup">Open AI Assistant</button>
    <ejs-inlineaiassist 
      response-mode="Popup"
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
    inlineAiAssist.value?.addResponse('Response appears in popup');
  }, 1000);
};

const showPopup = () => {
  inlineAiAssist.value?.showPopup();
};
</script>
```

### Using Inline Mode

```vue
<template>
  <div style="height: 400px; width: 700px; margin: 0 auto;">
    <br />
    <button @click="showPopup">Generate Inline</button>
    <div id="editableText" contenteditable="true" 
         style="min-height:150px; border:1px solid #ccc; padding:12px; margin-top:8px;">
      Click in this text area, then click the button to generate content at cursor position.
    </div>
    <ejs-inlineaiassist 
      response-mode="Inline"
      relate-to="#editableText"
      popup-width="500px"
      :prompt-request="onPromptRequest"
      :response-settings="responseSettings"
      ref="inlineAiAssist">
    </ejs-inlineaiassist>
  </div>
</template>

<script setup>
const onPromptRequest = () => {
  setTimeout(() => {
    // Response will be inserted at cursor position
    inlineAiAssist.value?.addResponse('Inline content inserted here');
  }, 1000);
};
</script>
```

### Dynamic Response Mode

```vue
<script setup>
const responseMode = ref('Popup');

const toggleMode = () => {
  responseMode.value = responseMode.value === 'Popup' ? 'Inline' : 'Popup';
};
</script>

<template>
  <div>
    <button @click="toggleMode">
      Current Mode: {{ responseMode }} (Click to toggle)
    </button>
    <ejs-inlineaiassist 
      :response-mode="responseMode"
      ref="inlineAiAssist">
    </ejs-inlineaiassist>
  </div>
</template>
```

### Mode Comparison

| Feature | Popup Mode | Inline Mode |
|---------|------------|-------------|
| **Visual Appearance** | Separate overlay popup | Content appears at cursor |
| **User Interaction** | Review before inserting | Immediate insertion |
| **Best For** | Summarization, translation | Text completion, generation |
| **Response Actions** | Accept/Discard visible | Minimal UI |
| **Editing** | Can edit before accepting | Direct insertion |

## Built-in Response Items

By default, the response popup displays two built-in items:
- **Accept** - Accept the response and apply changes
- **Discard** - Reject the response and close the popup

These built-in items are always available unless explicitly removed.

### Default Response Popup Example

```vue
<template>
  <div style="height: 350px; width: 650px; margin: 0 auto;">
    <br />
    <button @click="showPopup">Open Inline AI Assist</button>
    <div id="editableText" contenteditable="true" 
         style="min-height:80px; border:1px solid #ccc; padding:8px; margin-top:8px;">
      Editable content goes here.
    </div>
    <ejs-inlineaiassist 
      popup-width="500px"
      relate-to="#summarizeBtn"
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
      if (editable && inlineAiAssist.value?.prompts) {
        const lastResponse = inlineAiAssist.value.prompts[inlineAiAssist.value.prompts.length - 1].response;
        editable.innerHTML = '<p>' + lastResponse + '</p>';
      }
      inlineAiAssist.value?.hidePopup();
    } else if (args.command.label === 'Discard') {
      inlineAiAssist.value?.hidePopup();
    }
  }
};

const onPromptRequest = () => {
  setTimeout(() => {
    const defaultResponse = 'Connect to your AI service for real responses.';
    inlineAiAssist.value?.addResponse(defaultResponse);
  }, 1000);
};

const showPopup = () => {
  inlineAiAssist.value?.showPopup();
};
</script>
```

## Custom Response Items

Add custom items to the response popup using the `items` property in `responseSettings`. Custom items are displayed alongside built-in Accept/Discard items.

```vue
<script setup>
const responseSettings = {
  items: [
    { label: 'Regenerate', iconCss: 'e-icons e-refresh', tooltip: 'Regenerate', groupBy: 'Actions' },
    { label: 'Copy', iconCss: 'e-icons e-copy', tooltip: 'Copy', groupBy: 'Actions' },
    { label: 'Accept' },
    { label: 'Discard' }
  ],
  itemSelect: (args) => {
    // Handle item selection
  }
};
</script>
```

## Response Item Properties

Each item in the `items` array supports the following properties:

### label
The visible text displayed for the response item.

```javascript
{ label: 'Regenerate' }
```

### id
A unique identifier to detect specific items in the selection handler.

```javascript
{ id: 'regenerate', label: 'Regenerate' }
```

### iconCss
CSS class string to display an icon alongside the label.

```javascript
{ label: 'Copy', iconCss: 'e-icons e-copy' }
```

Common icons: `e-icons e-refresh`, `e-icons e-copy`, `e-icons e-edit`, `e-icons e-delete`

### disabled
Boolean flag to disable an item, preventing selection. Default is `false`.

```javascript
{ label: 'Regenerate', disabled: true }
```

### tooltip
Tooltip text displayed on hover over the response item.

```javascript
{ label: 'Copy', tooltip: 'Copy response to clipboard' }
```

### groupBy
Groups related response items visually in the popup with a group header.

```javascript
{ label: 'Copy', groupBy: 'Actions' }
```

## Response Grouping

Group response items visually using the `groupBy` property. This improves UX for response popups with many items.

```vue
<script setup>
const responseSettings = {
  items: [
    { label: 'Regenerate', iconCss: 'e-icons e-refresh', tooltip: 'Regenerate', groupBy: 'Actions' },
    { label: 'Copy', iconCss: 'e-icons e-copy', tooltip: 'Copy', groupBy: 'Actions' },
    { label: 'Share', iconCss: 'e-icons e-share', tooltip: 'Share', groupBy: 'Actions' },
    { label: 'Regenerate (disabled)', iconCss: 'e-icons e-refresh', disabled: true, groupBy: 'Actions' },
    { label: 'Accept' },
    { label: 'Discard' }
  ]
};
</script>
```

The popup displays an "Actions" group with related items, followed by Accept and Discard.

## Item Selection Handling

The `itemSelect` event fires when a user selects an item from the response popup.

### Basic Event Handler

```vue
<script setup>
const responseSettings = {
  items: [
    { label: 'Regenerate', iconCss: 'e-icons e-refresh' },
    { label: 'Copy', iconCss: 'e-icons e-copy' },
    { label: 'Accept' },
    { label: 'Discard' }
  ],
  itemSelect: (args) => {
    const label = args?.command?.label || '';
    console.log('Item selected:', label);
  }
};
</script>
```

### Advanced Event Handler

```vue
<script setup>
const responseSettings = {
  items: [
    { id: 'regenerate', label: 'Regenerate' },
    { id: 'copy', label: 'Copy' },
    { id: 'accept', label: 'Accept' },
    { id: 'discard', label: 'Discard' }
  ],
  itemSelect: (args) => {
    const command = args?.command;
    if (!command) return;
    
    switch (command.label) {
      case 'Accept':
        applyResponse();
        inlineAiAssist.value?.hidePopup();
        break;
      case 'Discard':
        inlineAiAssist.value?.hidePopup();
        break;
      case 'Copy':
        copyResponseToClipboard();
        break;
      case 'Regenerate':
        regenerateResponse();
        break;
    }
  }
};

const copyResponseToClipboard = () => {
  const prompts = inlineAiAssist.value?.prompts;
  if (prompts && prompts.length > 0) {
    const lastResponse = prompts[prompts.length - 1].response;
    navigator.clipboard.writeText(lastResponse).catch(() => {
      console.error('Failed to copy');
    });
  }
};

const regenerateResponse = () => {
  const currentPrompt = inlineAiAssist.value?.getPrompt?.();
  if (currentPrompt) {
    onPromptRequest({ prompt: currentPrompt });
  }
};

const applyResponse = () => {
  const editable = document.getElementById('editableText');
  const prompts = inlineAiAssist.value?.prompts;
  if (editable && prompts && prompts.length > 0) {
    const lastResponse = prompts[prompts.length - 1].response;
    editable.innerHTML = '<p>' + lastResponse + '</p>';
  }
};
</script>
```

## Event Arguments Reference

When the `itemSelect` event fires, the event handler receives a `ResponseItemSelectEventArgs` object with detailed information about the selection.

### ResponseItemSelectEventArgs Properties

| Property | Type | Description |
|----------|------|-------------|
| **cancel** | boolean | Set to `true` to prevent the default action from executing |
| **command** | ResponseItemModel | The response item that was clicked, containing all item properties |
| **element** | HTMLElement | The DOM element associated with the clicked item |
| **event** | Event | The native browser event object |
| **name** | string | The name of the event (typically "itemSelect") |

### Using cancel Property

Prevent default action when certain conditions are met:

```vue
<script setup>
const responseSettings = {
  items: [
    { id: 'regenerate', label: 'Regenerate' },
    { id: 'copy', label: 'Copy' },
    { label: 'Accept' },
    { label: 'Discard' }
  ],
  itemSelect: (args) => {
    // Prevent action if response is empty
    if (args.command.label === 'Accept') {
      const prompts = inlineAiAssist.value?.prompts;
      if (!prompts || prompts.length === 0) {
        args.cancel = true;
        alert('No response to accept');
        return;
      }
    }
    
    // Conditional cancellation
    if (args.command.label === 'Copy' && !navigator.clipboard) {
      args.cancel = true;
      alert('Clipboard not available');
      return;
    }
    
    // Normal processing
    handleItemAction(args);
  }
};
</script>
```

### Accessing command Properties

The `command` property provides full access to the clicked item's configuration:

```vue
<script setup>
const responseSettings = {
  items: [
    { id: 'custom1', label: 'Custom Action', iconCss: 'e-icons e-edit', tooltip: 'Edit response' },
    { label: 'Accept' }
  ],
  itemSelect: (args) => {
    const item = args.command;
    
    console.log('Item ID:', item.id);           // 'custom1'
    console.log('Label:', item.label);          // 'Custom Action'
    console.log('Icon CSS:', item.iconCss);     // 'e-icons e-edit'
    console.log('Tooltip:', item.tooltip);      // 'Edit response'
    console.log('Disabled:', item.disabled);    // false
    console.log('Group:', item.groupBy);        // undefined
    
    // Use item properties for logic
    if (item.id === 'custom1') {
      performCustomAction();
    }
  }
};
</script>
```

### Using element Property

Access the DOM element for advanced scenarios:

```vue
<script setup>
const responseSettings = {
  itemSelect: (args) => {
    // Add visual feedback
    const element = args.element;
    if (element) {
      element.style.backgroundColor = '#e0e0e0';
      setTimeout(() => {
        element.style.backgroundColor = '';
      }, 200);
    }
    
    // Get element position
    const rect = element.getBoundingClientRect();
    console.log('Element position:', rect.top, rect.left);
  }
};
</script>
```

### Using event Property

Access native browser event for low-level control:

```vue
<script setup>
const responseSettings = {
  itemSelect: (args) => {
    const nativeEvent = args.event;
    
    // Check modifier keys
    if (nativeEvent.shiftKey) {
      console.log('Shift key was held during click');
    }
    
    if (nativeEvent.ctrlKey || nativeEvent.metaKey) {
      console.log('Ctrl/Cmd key was held');
      // Perform alternate action
      args.cancel = true;
      handleAlternateAction(args.command);
      return;
    }
    
    // Prevent event bubbling if needed
    nativeEvent.stopPropagation();
    
    // Get click coordinates
    console.log('Click position:', nativeEvent.clientX, nativeEvent.clientY);
  }
};
</script>
```

### Complete Event Handler Example

```vue
<script setup>
const responseSettings = {
  items: [
    { id: 'regenerate', label: 'Regenerate', iconCss: 'e-icons e-refresh' },
    { id: 'copy', label: 'Copy', iconCss: 'e-icons e-copy' },
    { label: 'Accept' },
    { label: 'Discard' }
  ],
  itemSelect: (args) => {
    // Log all event properties
    console.log('Event details:', {
      name: args.name,
      commandId: args.command?.id,
      commandLabel: args.command?.label,
      elementId: args.element?.id,
      eventType: args.event?.type
    });
    
    // Validate before processing
    if (!args.command) {
      console.error('No command found in event args');
      return;
    }
    
    // Handle each action
    switch (args.command.label) {
      case 'Accept':
        if (!validateResponse()) {
          args.cancel = true;
          showError('Response validation failed');
          return;
        }
        acceptResponse();
        inlineAiAssist.value?.hidePopup();
        break;
        
      case 'Discard':
        if (args.event.shiftKey) {
          // Shift+click = discard without confirmation
          inlineAiAssist.value?.hidePopup();
        } else {
          // Normal click = ask for confirmation
          if (confirm('Discard this response?')) {
            inlineAiAssist.value?.hidePopup();
          } else {
            args.cancel = true;
          }
        }
        break;
        
      case 'Copy':
        copyToClipboard();
        // Add visual feedback to element
        if (args.element) {
          args.element.classList.add('copied');
          setTimeout(() => args.element.classList.remove('copied'), 1000);
        }
        break;
        
      case 'Regenerate':
        args.cancel = true; // Prevent default
        regenerateResponse();
        break;
    }
  }
};

const validateResponse = () => {
  const prompts = inlineAiAssist.value?.prompts;
  return prompts && prompts.length > 0 && prompts[prompts.length - 1].response;
};

const copyToClipboard = () => {
  const prompts = inlineAiAssist.value?.prompts;
  if (prompts && prompts.length > 0) {
    navigator.clipboard.writeText(prompts[prompts.length - 1].response);
  }
};
</script>
```

## Complete Examples

### Example 1: Full-Featured Response Settings

```vue
<template>
  <div style="height: 400px; width: 700px; margin: 0 auto;">
    <br />
    <button @click="showPopup">Open Inline AI Assist</button>
    <ejs-inlineaiassist 
      popup-width="500px"
      relate-to="#btn"
      :prompt-request="onPromptRequest"
      :response-settings="responseSettings"
      ref="inlineAiAssist">
    </ejs-inlineaiassist>
  </div>
</template>

<script setup>
import { InlineAIAssistComponent as EjsInlineaiassist } from "@syncfusion/ej2-vue-interactive-chat";
import { ref, reactive } from "vue";
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

let inlineAiAssist = ref(null);

const responseSettings = reactive({
  items: [
    { label: 'Regenerate', iconCss: 'e-icons e-refresh', tooltip: 'Regenerate', groupBy: 'Actions' },
    { label: 'Copy', iconCss: 'e-icons e-copy', tooltip: 'Copy', groupBy: 'Actions' },
    { label: 'Regenerate (disabled)', iconCss: 'e-icons e-refresh', disabled: true, groupBy: 'Actions' },
    { label: 'Accept' },
    { label: 'Discard' }
  ],
  itemSelect: (args) => {
    const label = args?.command?.label || '';
    
    if (label === 'Accept') {
      const editable = document.getElementById('editableText');
      if (editable && inlineAiAssist.value?.prompts) {
        const prompts = inlineAiAssist.value.prompts;
        const lastResponse = prompts[prompts.length - 1]?.response;
        if (lastResponse) {
          editable.innerHTML = '<p>' + lastResponse + '</p>';
        }
      }
      inlineAiAssist.value?.hidePopup();
    } else if (label === 'Discard') {
      inlineAiAssist.value?.hidePopup();
    } else if (label.includes('Copy')) {
      const prompts = inlineAiAssist.value?.prompts || [];
      const lastResponse = prompts[prompts.length - 1]?.response;
      if (lastResponse && navigator.clipboard) {
        navigator.clipboard.writeText(lastResponse).catch(() => {});
      }
    } else if (label.includes('Regenerate') && !label.includes('disabled')) {
      const currentPrompt = inlineAiAssist.value?.getPrompt?.();
      if (currentPrompt) {
        onPromptRequest({ prompt: currentPrompt });
      }
    }
  }
});

const onPromptRequest = (args) => {
  const prompt = args?.prompt || '';
  setTimeout(() => {
    const sampleResponse = `**You asked:** ${prompt}\n\nThis is a response.`;
    inlineAiAssist.value?.addResponse(sampleResponse, true);
  }, 1000);
};

const showPopup = () => {
  inlineAiAssist.value?.showPopup();
};
</script>
```

## Troubleshooting

### Issue: Custom items not appearing
- **Solution:** Verify `items` array is populated in `responseSettings`
- **Check:** Ensure objects in `items` have `label` property

### Issue: itemSelect event not firing
- **Solution:** Confirm `itemSelect` function is defined in `responseSettings`
- **Check:** Verify function receives `args` parameter

### Issue: Icons not displaying
- **Solution:** Use Syncfusion icon class names (e.g., `e-icons e-copy`)
- **Check:** Ensure CSS imports include icon styles

### Issue: Accept button not updating content
- **Solution:** Verify response is added via `addResponse()` method
- **Check:** Confirm target element exists and is accessible
