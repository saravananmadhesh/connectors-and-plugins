````markdown
# Inline Toolbar Settings

## Table of Contents
- [Overview](#overview)
- [InlineToolbarSettingsModel Interface](#inlinetoolbarsettingsmodel-interface)
- [Configuring Toolbar Items](#configuring-toolbar-items)
- [Toolbar Position](#toolbar-position)
- [Toolbar Item Click Event](#toolbar-item-click-event)
- [Event Arguments Reference](#event-arguments-reference)
- [Complete Examples](#complete-examples)
- [Troubleshooting](#troubleshooting)

## Overview

The `inlineToolbarSettings` property configures the toolbar displayed in the inline prompt input area. This toolbar provides buttons, shortcuts, and interaction controls available while composing prompts or reviewing responses.

## InlineToolbarSettingsModel Interface

The `InlineToolbarSettingsModel` interface defines the configuration for the inline toolbar.

### Interface Structure

| Property | Type | Description |
|----------|------|-------------|
| **items** | ToolbarItemModel[] | Array of toolbar items to display in the response toolbar |
| **toolbarPosition** | ToolbarPosition \| string | Position of the toolbar ('Top', 'Bottom', or 'Inline') |

### Events

| Event | Type | Description |
|-------|------|-------------|
| **itemClick** | EmitType<ToolbarItemClickEventArgs> | Fires when a toolbar item is clicked |

## Configuring Toolbar Items

The `items` property defines the collection of toolbar buttons and controls rendered in the inline toolbar.

### Basic Toolbar Setup

```vue
<template>
  <div style="height: 400px; width: 700px; margin: 0 auto;">
    <br />
    <button @click="showPopup">Open with Toolbar</button>
    <ejs-inlineaiassist 
      relate-to="#btn"
      :inline-toolbar-settings="inlineToolbarSettings"
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

const inlineToolbarSettings = {
  items: [
    { id: 'bold', text: 'Bold', iconCss: 'e-icons e-bold' },
    { id: 'italic', text: 'Italic', iconCss: 'e-icons e-italic' },
    { id: 'underline', text: 'Underline', iconCss: 'e-icons e-underline' }
  ],
  toolbarPosition: 'Bottom',
  itemClick: (args) => {
    console.log('Toolbar item clicked:', args.item.id);
  }
};

const responseSettings = {
  itemSelect: (args) => {
    if (args.command.label === 'Accept') {
      inlineAiAssist.value?.hidePopup();
    }
  }
};

const onPromptRequest = () => {
  setTimeout(() => {
    inlineAiAssist.value?.addResponse('Response with toolbar');
  }, 1000);
};

const showPopup = () => {
  inlineAiAssist.value?.showPopup();
};
</script>
```

### ToolbarItemModel Properties

Each toolbar item supports these properties:

| Property | Type | Description |
|----------|------|-------------|
| **id** | string | Unique identifier for the toolbar item |
| **text** | string | Display text for the button |
| **iconCss** | string | CSS class for the icon |
| **tooltipText** | string | Tooltip displayed on hover |
| **disabled** | boolean | Whether the item is disabled |
| **type** | string | Type of toolbar item ('Button', 'Separator', etc.) |

### Custom Toolbar Items

```vue
<script setup>
const inlineToolbarSettings = {
  items: [
    { 
      id: 'copy', 
      text: 'Copy', 
      iconCss: 'e-icons e-copy',
      tooltipText: 'Copy to clipboard'
    },
    { 
      id: 'paste', 
      text: 'Paste', 
      iconCss: 'e-icons e-paste',
      tooltipText: 'Paste from clipboard'
    },
    { type: 'Separator' },
    { 
      id: 'clear', 
      text: 'Clear', 
      iconCss: 'e-icons e-clear',
      tooltipText: 'Clear prompt',
      disabled: false
    },
    { 
      id: 'send', 
      text: 'Send', 
      iconCss: 'e-icons e-send',
      tooltipText: 'Send prompt'
    }
  ],
  itemClick: (args) => {
    handleToolbarClick(args);
  }
};

const handleToolbarClick = (args) => {
  const itemId = args.item?.id;
  
  switch (itemId) {
    case 'copy':
      copyPromptToClipboard();
      break;
    case 'paste':
      pasteFromClipboard();
      break;
    case 'clear':
      clearPrompt();
      break;
    case 'send':
      sendPrompt();
      break;
  }
};

const copyPromptToClipboard = () => {
  const prompt = inlineAiAssist.value?.prompt || '';
  navigator.clipboard.writeText(prompt);
};

const pasteFromClipboard = async () => {
  try {
    const text = await navigator.clipboard.readText();
    // Update prompt with pasted text
    console.log('Pasted:', text);
  } catch (err) {
    console.error('Failed to read clipboard:', err);
  }
};

const clearPrompt = () => {
  // Clear the prompt input
  console.log('Clearing prompt');
};

const sendPrompt = () => {
  // Trigger prompt execution
  inlineAiAssist.value?.executePrompt(inlineAiAssist.value?.prompt || '');
};
</script>
```

## Toolbar Position

The `toolbarPosition` property determines where the toolbar is rendered relative to the prompt input area.

### Position Options

| Position | Description | Use Case |
|----------|-------------|----------|
| **Bottom** (default) | Toolbar appears below the prompt input | Standard editing toolbar |
| **Top** | Toolbar appears above the prompt input | Header-style controls |
| **Inline** | Toolbar renders inline with content | Contextual editing |

### Setting Toolbar Position

```vue
<script setup>
// Bottom position (default)
const bottomToolbarSettings = {
  toolbarPosition: 'Bottom',
  items: [
    { id: 'format', text: 'Format' }
  ]
};

// Top position
const topToolbarSettings = {
  toolbarPosition: 'Top',
  items: [
    { id: 'settings', text: 'Settings' }
  ]
};

// Inline position
const inlineToolbarSettings = {
  toolbarPosition: 'Inline',
  items: [
    { id: 'edit', text: 'Edit' }
  ]
};
</script>
```

### Dynamic Position

```vue
<template>
  <div>
    <select v-model="toolbarPos" @change="updatePosition">
      <option value="Top">Top</option>
      <option value="Bottom">Bottom</option>
      <option value="Inline">Inline</option>
    </select>
    <ejs-inlineaiassist 
      :inline-toolbar-settings="inlineToolbarSettings"
      ref="inlineAiAssist">
    </ejs-inlineaiassist>
  </div>
</template>

<script setup>
const toolbarPos = ref('Bottom');

const inlineToolbarSettings = computed(() => ({
  toolbarPosition: toolbarPos.value,
  items: [
    { id: 'action1', text: 'Action 1' },
    { id: 'action2', text: 'Action 2' }
  ]
}));

const updatePosition = () => {
  console.log('Toolbar position changed to:', toolbarPos.value);
};
</script>
```

## Toolbar Item Click Event

The `itemClick` event fires when a user clicks a toolbar item. Use this to handle toolbar actions, update UI, or cancel default behavior.

### Basic Event Handler

```vue
<script setup>
const inlineToolbarSettings = {
  items: [
    { id: 'bold', text: 'Bold' },
    { id: 'italic', text: 'Italic' }
  ],
  itemClick: (args) => {
    console.log('Clicked item:', args.item.text);
    console.log('Item ID:', args.item.id);
  }
};
</script>
```

### Advanced Event Handling

```vue
<script setup>
const inlineToolbarSettings = {
  items: [
    { id: 'format', text: 'Format', iconCss: 'e-icons e-format' },
    { id: 'insert', text: 'Insert', iconCss: 'e-icons e-insert' },
    { id: 'export', text: 'Export', iconCss: 'e-icons e-export' }
  ],
  itemClick: (args) => {
    // Cancel default action if needed
    if (someCondition) {
      args.cancel = true;
      return;
    }
    
    // Get message data index
    const dataIndex = args.dataIndex;
    console.log('Data index:', dataIndex);
    
    // Access native event
    const nativeEvent = args.event;
    if (nativeEvent.shiftKey) {
      console.log('Shift key held');
    }
    
    // Handle item action
    handleToolbarAction(args.item.id);
  }
};

const handleToolbarAction = (itemId) => {
  switch (itemId) {
    case 'format':
      formatContent();
      break;
    case 'insert':
      insertContent();
      break;
    case 'export':
      exportContent();
      break;
  }
};
</script>
```

## Event Arguments Reference

When `itemClick` fires, the handler receives a `ToolbarItemClickEventArgs` object.

### ToolbarItemClickEventArgs Properties

| Property | Type | Description |
|----------|------|-------------|
| **cancel** | boolean | Set to `true` to prevent the default action |
| **dataIndex** | number | Index of the message data associated with the click (not applicable for header toolbar) |
| **event** | Event | Native browser event object |
| **item** | ToolbarItemModel | The toolbar item that was clicked |
| **name** | string | Name of the event (typically "itemClick") |

### Using cancel Property

```vue
<script setup>
const inlineToolbarSettings = {
  items: [
    { id: 'delete', text: 'Delete', iconCss: 'e-icons e-delete' }
  ],
  itemClick: (args) => {
    // Confirm before deletion
    if (args.item.id === 'delete') {
      if (!confirm('Are you sure you want to delete?')) {
        args.cancel = true; // Cancel the action
        return;
      }
    }
    
    // Validate before action
    if (!isValid()) {
      args.cancel = true;
      alert('Validation failed');
      return;
    }
    
    processAction(args.item);
  }
};
</script>
```

### Accessing dataIndex

```vue
<script setup>
const inlineToolbarSettings = {
  items: [
    { id: 'edit', text: 'Edit' },
    { id: 'delete', text: 'Delete' }
  ],
  itemClick: (args) => {
    const messageIndex = args.dataIndex;
    
    if (messageIndex !== undefined && messageIndex >= 0) {
      const prompts = inlineAiAssist.value?.prompts;
      if (prompts && prompts[messageIndex]) {
        const message = prompts[messageIndex];
        console.log('Operating on message:', message);
        
        if (args.item.id === 'edit') {
          editMessage(messageIndex, message);
        } else if (args.item.id === 'delete') {
          deleteMessage(messageIndex);
        }
      }
    }
  }
};

const editMessage = (index, message) => {
  console.log('Editing message at index:', index);
  // Edit logic
};

const deleteMessage = (index) => {
  console.log('Deleting message at index:', index);
  // Delete logic
};
</script>
```

### Using event Property

```vue
<script setup>
const inlineToolbarSettings = {
  items: [
    { id: 'action', text: 'Action' }
  ],
  itemClick: (args) => {
    const nativeEvent = args.event;
    
    // Check modifier keys
    if (nativeEvent.shiftKey) {
      console.log('Shift+Click: Execute alternate action');
      args.cancel = true;
      executeAlternateAction(args.item);
      return;
    }
    
    if (nativeEvent.ctrlKey || nativeEvent.metaKey) {
      console.log('Ctrl/Cmd+Click: Open in new window');
      args.cancel = true;
      openInNewWindow(args.item);
      return;
    }
    
    // Prevent event bubbling
    nativeEvent.stopPropagation();
    
    // Get click position
    console.log('Click position:', nativeEvent.clientX, nativeEvent.clientY);
  }
};
</script>
```

## Complete Examples

### Example 1: Full-Featured Inline Toolbar

```vue
<template>
  <div style="height: 500px; width: 800px; margin: 0 auto;">
    <br />
    <button @click="showPopup">Open AI Assistant</button>
    <ejs-inlineaiassist 
      relate-to="#btn"
      popup-width="700px"
      :inline-toolbar-settings="inlineToolbarSettings"
      :prompt-request="onPromptRequest"
      :response-settings="responseSettings"
      ref="inlineAiAssist">
    </ejs-inlineaiassist>
  </div>
</template>

<script setup>
import { InlineAIAssistComponent as EjsInlineaiassist } from "@syncfusion/ej2-vue-interactive-chat";
import { ref, reactive } from "vue";

let inlineAiAssist = ref(null);

const inlineToolbarSettings = reactive({
  toolbarPosition: 'Bottom',
  items: [
    { 
      id: 'bold', 
      text: 'Bold', 
      iconCss: 'e-icons e-bold',
      tooltipText: 'Make text bold'
    },
    { 
      id: 'italic', 
      text: 'Italic', 
      iconCss: 'e-icons e-italic',
      tooltipText: 'Make text italic'
    },
    { type: 'Separator' },
    { 
      id: 'copy', 
      text: 'Copy', 
      iconCss: 'e-icons e-copy',
      tooltipText: 'Copy to clipboard'
    },
    { 
      id: 'paste', 
      text: 'Paste', 
      iconCss: 'e-icons e-paste',
      tooltipText: 'Paste from clipboard'
    },
    { type: 'Separator' },
    { 
      id: 'send', 
      text: 'Send', 
      iconCss: 'e-icons e-send',
      tooltipText: 'Send prompt'
    }
  ],
  itemClick: (args) => {
    console.log('Toolbar action:', args.item.id);
    
    // Log event details
    console.log({
      name: args.name,
      itemId: args.item.id,
      dataIndex: args.dataIndex,
      hasEvent: !!args.event
    });
    
    switch (args.item.id) {
      case 'bold':
        applyFormatting('bold');
        break;
      case 'italic':
        applyFormatting('italic');
        break;
      case 'copy':
        copyToClipboard();
        break;
      case 'paste':
        pasteFromClipboard();
        break;
      case 'send':
        sendCurrentPrompt();
        break;
    }
  }
});

const responseSettings = {
  itemSelect: (args) => {
    if (args.command.label === 'Accept') {
      inlineAiAssist.value?.hidePopup();
    } else if (args.command.label === 'Discard') {
      inlineAiAssist.value?.hidePopup();
    }
  }
};

const onPromptRequest = () => {
  setTimeout(() => {
    inlineAiAssist.value?.addResponse('Response generated with toolbar support');
  }, 1000);
};

const showPopup = () => {
  inlineAiAssist.value?.showPopup();
};

const applyFormatting = (format) => {
  console.log('Applying format:', format);
  // Apply formatting to selected text
};

const copyToClipboard = () => {
  const prompt = inlineAiAssist.value?.prompt || '';
  if (prompt) {
    navigator.clipboard.writeText(prompt).then(() => {
      console.log('Copied to clipboard');
    });
  }
};

const pasteFromClipboard = async () => {
  try {
    const text = await navigator.clipboard.readText();
    console.log('Pasted from clipboard:', text);
    // Update prompt with pasted text
  } catch (err) {
    console.error('Paste failed:', err);
  }
};

const sendCurrentPrompt = () => {
  const prompt = inlineAiAssist.value?.prompt;
  if (prompt) {
    inlineAiAssist.value?.executePrompt(prompt);
  }
};
</script>
```

### Example 2: Dynamic Toolbar with Position Toggle

```vue
<template>
  <div style="height: 450px; width: 750px; margin: 0 auto;">
    <div style="margin-bottom: 10px;">
      <label>Toolbar Position:</label>
      <select v-model="toolbarPosition">
        <option value="Top">Top</option>
        <option value="Bottom">Bottom</option>
        <option value="Inline">Inline</option>
      </select>
    </div>
    <button @click="showPopup">Open Assistant</button>
    <ejs-inlineaiassist 
      relate-to="#btn"
      :inline-toolbar-settings="dynamicToolbarSettings"
      :prompt-request="onPromptRequest"
      ref="inlineAiAssist">
    </ejs-inlineaiassist>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";

const toolbarPosition = ref('Bottom');

const dynamicToolbarSettings = computed(() => ({
  toolbarPosition: toolbarPosition.value,
  items: [
    { id: 'action1', text: 'Action 1', iconCss: 'e-icons e-check' },
    { id: 'action2', text: 'Action 2', iconCss: 'e-icons e-close' }
  ],
  itemClick: (args) => {
    console.log(`${args.item.text} clicked at ${toolbarPosition.value} position`);
  }
}));

const onPromptRequest = () => {
  setTimeout(() => {
    inlineAiAssist.value?.addResponse('Dynamic toolbar response');
  }, 1000);
};
</script>
```

## Troubleshooting

### Issue: Toolbar items not appearing
- **Solution:** Verify `inlineToolbarSettings` object has `items` array with at least one item
- **Check:** Ensure items have required properties (`id`, `text`)

### Issue: itemClick event not firing
- **Solution:** Confirm `itemClick` handler is defined in `inlineToolbarSettings`
- **Check:** Verify event handler function signature accepts `args` parameter

### Issue: Icons not displaying
- **Solution:** Use Syncfusion icon classes (e.g., `e-icons e-bold`)
- **Check:** Ensure Syncfusion CSS is properly imported

### Issue: Toolbar position not changing
- **Solution:** Use valid position values: 'Top', 'Bottom', or 'Inline'
- **Check:** If using reactive data, ensure computed properties are set up correctly

### Issue: dataIndex is undefined
- **Note:** `dataIndex` is only available for response toolbar items, not header toolbar items
- **Solution:** Check if toolbar item is associated with a specific message/response

````