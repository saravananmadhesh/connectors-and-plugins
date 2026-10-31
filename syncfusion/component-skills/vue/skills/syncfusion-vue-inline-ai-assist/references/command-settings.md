# Command Settings and Configuration

## Table of Contents
- [Command Items Overview](#command-items-overview)
- [Configuring Commands](#configuring-commands)
- [Command Properties](#command-properties)
- [Command Grouping](#command-grouping)
- [Command Selection Handling](#command-selection-handling)
- [Event Arguments Reference](#event-arguments-reference)
- [Popup Sizing](#popup-sizing)
- [Troubleshooting](#troubleshooting)

## Command Items Overview

The `commandSettings` property enables you to render and configure a command action popup. This popup displays predefined commands that users can quickly select to execute actions without typing custom prompts.

## Configuring Commands

### Basic Command Configuration

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
      relate-to="#summarizeBtn"
      :prompt-request="onPromptRequest"
      :command-settings="commandSettings"
      :response-settings="responseSettings"
      ref="inlineAiAssist">
    </ejs-inlineaiassist>
  </div>
</template>

<script setup>
import { InlineAIAssistComponent as EjsInlineaiassist } from "@syncfusion/ej2-vue-interactive-chat";
import { ref } from "vue";

let inlineAiAssist = ref(null);

const commandSettings = {
  popupWidth: '500px',
  popupHeight: '200px',
  commands: [
    { label: 'Summarize', prompt: 'Summarize the content' },
    { label: 'Shorten', prompt: 'Shorten the content' },
    { label: 'Translate', prompt: 'Translate the content' },
    { label: 'Make professional', prompt: 'Make the content more professional' }
  ],
  itemSelect: () => {
    // Handle command selection
  }
};

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

## Command Properties

Each command in the `commands` array supports the following properties:

### label
The visible text displayed for the command in the popup.

```javascript
{ label: 'Summarize' }
```

### prompt
The prompt text executed when the command is selected. This text is sent to the `prompt-request` event handler.

```javascript
{ label: 'Summarize', prompt: 'Summarize the content' }
```

### id
A unique identifier to detect and handle specific commands in the selection handler.

```javascript
{ id: 'cmd-summarize', label: 'Summarize', prompt: 'Summarize the content' }
```

### iconCss
CSS class string to display an icon alongside the label.

```javascript
{ label: 'Summarize', iconCss: 'e-icons e-collapse-2' }
```

Common icons: `e-icons e-shorten`, `e-icons e-translate`, `e-icons e-elaborate`, `e-icons e-refresh`

### disabled
Boolean flag to disable a command, preventing selection. Default is `false`.

```javascript
{ label: 'Shorten', disabled: true }
```

### tooltip
Tooltip text displayed on hover over the command item.

```javascript
{ label: 'Summarize', tooltip: 'Make the content concise' }
```

### groupBy
Groups related commands visually in the popup with a group header.

```javascript
{ label: 'Summarize', groupBy: 'Improve content' }
```

## Command Grouping

Commands are visually grouped in the popup popup using the `groupBy` property. This improves UX for large command lists.

```vue
<script setup>
const commandSettings = {
  popupWidth: '500px',
  commands: [
    { label: 'Summarize', prompt: 'Summarize', groupBy: 'Improve content', iconCss: 'e-icons e-collapse-2', tooltip: 'Summarize' },
    { label: 'Shorten', prompt: 'Shorten', groupBy: 'Improve content', iconCss: 'e-icons e-shorten', tooltip: 'Shorten', disabled: true },
    { label: 'Translate', prompt: 'Translate', groupBy: 'Edit content', iconCss: 'e-icons e-translate' },
    { label: 'Make professional', prompt: 'Make professional', groupBy: 'Edit content', iconCss: 'e-icons e-elaborate' }
  ],
  itemSelect: (args) => {
    console.log('Selected command:', args.command.label);
  }
};
</script>
```

The popup will display two groups: "Improve content" and "Edit content" with their respective commands.

## Command Selection Handling

The `itemSelect` event in `commandSettings` fires when a user selects a command from the popup.

### Basic Event Handling

```vue
<script setup>
const commandSettings = {
  commands: [
    { label: 'Summarize', prompt: 'Summarize the content' },
    { label: 'Translate', prompt: 'Translate the content' }
  ],
  itemSelect: (args) => {
    const selectedCommand = args.command;
    console.log('Command selected:', selectedCommand.label);
    console.log('Prompt:', selectedCommand.prompt);
  }
};
</script>
```

### Advanced Handling with Custom Actions

```vue
<script setup>
const commandSettings = {
  commands: [
    { id: 'summarize', label: 'Summarize', prompt: 'Summarize' },
    { id: 'translate', label: 'Translate', prompt: 'Translate' },
    { id: 'copy', label: 'Copy to Clipboard', prompt: null }
  ],
  itemSelect: (args) => {
    const command = args.command;
    
    switch (command.id) {
      case 'summarize':
        console.log('Execute summarize');
        break;
      case 'translate':
        console.log('Execute translate');
        break;
      case 'copy':
        // Copy current content to clipboard
        const editable = document.getElementById('editableText');
        navigator.clipboard.writeText(editable.innerText);
        break;
    }
  }
};
</script>
```

## Event Arguments Reference

When the `itemSelect` event fires in `commandSettings`, the event handler receives a `CommandItemSelectEventArgs` object with detailed information about the selection.

### CommandItemSelectEventArgs Properties

| Property | Type | Description |
|----------|------|-------------|
| **cancel** | boolean | Set to `true` to prevent the default action (prompt execution) from occurring |
| **command** | CommandItemModel | The command item that was clicked, containing all item properties |
| **element** | HTMLElement | The DOM element associated with the clicked command item |
| **event** | Event | The native browser event object |
| **name** | string | The name of the event (typically "itemSelect") |

### Using cancel Property

Prevent command execution based on conditions:

```vue
<script setup>
const commandSettings = {
  commands: [
    { id: 'summarize', label: 'Summarize', prompt: 'Summarize this text' },
    { id: 'translate', label: 'Translate', prompt: 'Translate to Spanish' },
    { id: 'expand', label: 'Expand', prompt: 'Expand with details' }
  ],
  itemSelect: (args) => {
    // Get selected text from document
    const selectedText = window.getSelection().toString();
    
    // Cancel if no text is selected
    if (!selectedText || selectedText.trim().length === 0) {
      args.cancel = true;
      alert('Please select some text first');
      return;
    }
    
    // Cancel if text is too long
    if (selectedText.length > 5000) {
      args.cancel = true;
      alert('Selected text is too long (max 5000 characters)');
      return;
    }
    
    // Conditional cancellation based on command
    if (args.command.id === 'translate' && selectedText.length < 10) {
      args.cancel = true;
      alert('Text too short to translate');
      return;
    }
    
    console.log(`Executing command: ${args.command.label}`);
  }
};
</script>
```

### Accessing command Properties

The `command` property provides full access to the clicked command's configuration:

```vue
<script setup>
const commandSettings = {
  commands: [
    { 
      id: 'summarize', 
      label: 'Summarize', 
      prompt: 'Summarize the following text: {selection}',
      iconCss: 'e-icons e-collapse-2',
      tooltip: 'Create a brief summary',
      groupBy: 'Text Processing'
    },
    { id: 'translate', label: 'Translate', prompt: 'Translate to Spanish' }
  ],
  itemSelect: (args) => {
    const cmd = args.command;
    
    // Access all command properties
    console.log('Command ID:', cmd.id);           // 'summarize'
    console.log('Label:', cmd.label);             // 'Summarize'
    console.log('Prompt:', cmd.prompt);           // 'Summarize the following...'
    console.log('Icon CSS:', cmd.iconCss);        // 'e-icons e-collapse-2'
    console.log('Tooltip:', cmd.tooltip);         // 'Create a brief summary'
    console.log('Group:', cmd.groupBy);           // 'Text Processing'
    console.log('Is Disabled:', cmd.disabled);    // false
    
    // Replace placeholders in prompt
    const selectedText = window.getSelection().toString();
    const finalPrompt = cmd.prompt.replace('{selection}', selectedText);
    
    // Execute with modified prompt
    inlineAiAssist.value?.executePrompt(finalPrompt);
    
    // Cancel default to use custom prompt
    args.cancel = true;
  }
};
</script>
```

### Using element Property

Access the DOM element for visual feedback or custom interactions:

```vue
<script setup>
const commandSettings = {
  commands: [
    { id: 'summarize', label: 'Summarize' },
    { id: 'translate', label: 'Translate' }
  ],
  itemSelect: (args) => {
    const element = args.element;
    
    if (element) {
      // Add temporary highlight effect
      element.style.backgroundColor = '#4CAF50';
      element.style.color = 'white';
      
      setTimeout(() => {
        element.style.backgroundColor = '';
        element.style.color = '';
      }, 300);
      
      // Get element dimensions
      const rect = element.getBoundingClientRect();
      console.log('Element size:', rect.width, rect.height);
      console.log('Element position:', rect.top, rect.left);
      
      // Add custom class
      element.classList.add('command-selected');
    }
  }
};
</script>
```

### Using event Property

Access the native browser event for advanced handling:

```vue
<script setup>
const commandSettings = {
  commands: [
    { id: 'summarize', label: 'Summarize' },
    { id: 'translate', label: 'Translate' }
  ],
  itemSelect: (args) => {
    const nativeEvent = args.event;
    
    // Check if modifier keys were pressed
    if (nativeEvent.shiftKey) {
      console.log('Shift+Click detected');
      // Execute in different mode
      args.cancel = true;
      executeInSpecialMode(args.command);
      return;
    }
    
    if (nativeEvent.ctrlKey || nativeEvent.metaKey) {
      console.log('Ctrl/Cmd+Click detected');
      // Open command settings instead of executing
      args.cancel = true;
      openCommandSettings(args.command);
      return;
    }
    
    // Prevent event propagation if needed
    nativeEvent.stopPropagation();
    
    // Log click position
    console.log('Click coordinates:', nativeEvent.clientX, nativeEvent.clientY);
    
    // Get which mouse button was clicked
    console.log('Mouse button:', nativeEvent.button); // 0=left, 1=middle, 2=right
  }
};

const executeInSpecialMode = (command) => {
  console.log('Special execution for:', command.label);
  // Custom logic here
};

const openCommandSettings = (command) => {
  console.log('Opening settings for:', command.label);
  // Custom logic here
};
</script>
```

### Complete Event Handler Example

```vue
<script setup>
const commandSettings = {
  commands: [
    { id: 'summarize', label: 'Summarize', prompt: 'Summarize', groupBy: 'Process' },
    { id: 'translate', label: 'Translate', prompt: 'Translate', groupBy: 'Transform' },
    { id: 'expand', label: 'Expand', prompt: 'Expand details', groupBy: 'Process' }
  ],
  itemSelect: (args) => {
    // Log complete event information
    console.log('Command event:', {
      name: args.name,
      commandId: args.command?.id,
      commandLabel: args.command?.label,
      elementTag: args.element?.tagName,
      eventType: args.event?.type,
      shiftKey: args.event?.shiftKey,
      ctrlKey: args.event?.ctrlKey
    });
    
    // Validate command object
    if (!args.command) {
      console.error('No command object in event args');
      return;
    }
    
    // Get context
    const selectedText = window.getSelection().toString();
    const hasSelection = selectedText && selectedText.trim().length > 0;
    
    // Handle based on command
    switch (args.command.id) {
      case 'summarize':
        if (!hasSelection) {
          args.cancel = true;
          showNotification('Please select text to summarize', 'warning');
          return;
        }
        if (selectedText.split(' ').length < 50) {
          args.cancel = true;
          showNotification('Text too short for summarization (min 50 words)', 'info');
          return;
        }
        break;
        
      case 'translate':
        if (!hasSelection) {
          args.cancel = true;
          showNotification('Please select text to translate', 'warning');
          return;
        }
        // Check if Shift key is held - translate to different language
        if (args.event.shiftKey) {
          args.cancel = true;
          const language = prompt('Translate to which language?', 'French');
          if (language) {
            inlineAiAssist.value?.executePrompt(`Translate to ${language}: ${selectedText}`);
          }
          return;
        }
        break;
        
      case 'expand':
        if (args.event.ctrlKey || args.event.metaKey) {
          args.cancel = true;
          // Ctrl+Click = expand with custom instructions
          const instructions = prompt('Additional instructions:', '');
          if (instructions) {
            inlineAiAssist.value?.executePrompt(`${args.command.prompt} ${instructions}`);
          }
          return;
        }
        break;
    }
    
    // Add visual feedback
    if (args.element) {
      args.element.classList.add('executing');
      setTimeout(() => args.element.classList.remove('executing'), 500);
    }
    
    // Track command usage
    trackCommandUsage(args.command.id);
  }
};

const showNotification = (message, type) => {
  console.log(`[${type.toUpperCase()}] ${message}`);
  // Implement your notification logic
};

const trackCommandUsage = (commandId) => {
  // Analytics tracking
  console.log('Command used:', commandId);
};
</script>
```

## Popup Sizing

Control the dimensions of the command popup using `popupWidth` and `popupHeight`.

### Width Configuration

```javascript
const commandSettings = {
  popupWidth: '500px',    // CSS value
  commands: [...]
};
```

Accepts: `'500px'`, `'50%'`, `'auto'`, or numeric pixel value

### Height Configuration

```javascript
const commandSettings = {
  popupHeight: '300px',   // Enables scrollable list for many commands
  commands: [...]
};
```

Use height to create scrollable lists when you have many commands.

## Complete Example with All Features

```vue
<template>
  <div style="height: 400px; width: 700px; margin: 0 auto;">
    <br />
    <button @click="showPopup">Open Commands</button>
    <ejs-inlineaiassist 
      relate-to="#btn"
      :command-settings="commandSettings"
      :response-settings="responseSettings"
      ref="inlineAiAssist">
    </ejs-inlineaiassist>
  </div>
</template>

<script setup>
import { InlineAIAssistComponent as EjsInlineaiassist } from "@syncfusion/ej2-vue-interactive-chat";
import { ref } from "vue";

let inlineAiAssist = ref(null);

const commandSettings = {
  popupWidth: '550px',
  popupHeight: '250px',
  commands: [
    { 
      id: 'summarize',
      label: 'Summarize', 
      prompt: 'Summarize the content', 
      groupBy: 'Improve content', 
      iconCss: 'e-icons e-collapse-2', 
      tooltip: 'Make content concise'
    },
    { 
      id: 'shorten',
      label: 'Shorten', 
      prompt: 'Shorten the content', 
      groupBy: 'Improve content', 
      iconCss: 'e-icons e-shorten', 
      tooltip: 'Shorten', 
      disabled: true 
    },
    { 
      id: 'translate',
      label: 'Translate', 
      prompt: 'Translate the content', 
      groupBy: 'Edit content', 
      iconCss: 'e-icons e-translate',
      tooltip: 'Translate to Spanish'
    },
    { 
      id: 'professional',
      label: 'Make professional', 
      prompt: 'Make the content more professional', 
      groupBy: 'Edit content', 
      iconCss: 'e-icons e-elaborate',
      tooltip: 'Professional tone'
    }
  ],
  itemSelect: (args) => {
    console.log('Command executed:', args.command.label);
  }
};

const responseSettings = {
  itemSelect: (args) => {
    if (args.command.label === 'Accept') {
      inlineAiAssist.value?.hidePopup();
    }
  }
};

const showPopup = () => {
  inlineAiAssist.value?.showPopup();
};
</script>
```

## Troubleshooting

### Issue: Commands not appearing in popup
- **Solution:** Verify `commandSettings` object is passed to component
- **Check:** Ensure `commands` array is populated with objects

### Issue: Custom icon not displaying
- **Solution:** Use Syncfusion icon classes (e.g., `e-icons e-refresh`)
- **Check:** Verify CSS imports include icon styles

### Issue: itemSelect event not firing
- **Solution:** Confirm `itemSelect` function is defined in `commandSettings`
- **Check:** Verify function receives and processes `args` parameter
