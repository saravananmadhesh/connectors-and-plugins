# Editor Events Reference

This reference covers all events emitted by the Modern Rich Text Editor component, including change, focus, blur, action lifecycle events, and toolbar status updates.

## Table of Contents

- [Overview](#overview)
- [Lifecycle Events](#lifecycle-events)
- [Focus & Blur Events](#focus--blur-events)
- [Change Event](#change-event)
- [Action Events](#action-events)
- [Event Pattern Examples](#event-pattern-examples)

---

## Overview

The Modern Rich Text Editor emits various events to notify your application about user interactions, state changes, and content modifications. All events are wired through component bindings and fire based on user actions or programmatic calls.

---

## Lifecycle Events

### created

The `created` event fires after the Rich Text Editor UI component has been successfully initialized and rendered. Use this event to perform setup tasks that depend on the editor instance or its rendered DOM elements.

```html
<template>
  <div>
    <ejs-richtexteditor-ui :created="onCreated"></ejs-richtexteditor-ui>
    <p id="event-log" style="margin-top: 15px;">Status: Waiting for editor to be created...</p>
  </div>
</template>

<script setup>
import { RichTextEditorUIComponent as EjsRichtexteditorUi } from '@syncfusion/ej2-vue-richtexteditor-ui';

const onCreated = () => {
  const logElement = document.getElementById('event-log');
  if (logElement) {
    const timestamp = new Date().toLocaleTimeString();
    logElement.innerText = `[created event]: Editor initialized successfully at ${timestamp}.`;
  }
};
</script>
```

**Use cases:**
- Load initial content or apply defaults
- Initialize third-party libraries that depend on the editor
- Set up event listeners for custom interactions
- Focus the editor programmatically

### destroyed

The `destroyed` event fires when the Rich Text Editor component is destroyed and removed from the application. Use this event to perform cleanup tasks such as releasing resources, removing event handlers, or resetting related state.

```html
<template>
  <div>
    <ejs-richtexteditor-ui ref="rteObj" :destroyed="onDestroyed">
      <p>The Rich Text Editor component is initialized. Click the <strong>Destroy</strong> button to dispose of the component and trigger the <code>destroyed</code> event.</p>
    </ejs-richtexteditor-ui>
    <button id="destroy-btn" class="e-btn" style="margin-top: 15px;" @click="destroyEditor">Destroy Editor</button>
    <p id="event-log" style="margin-top: 10px;">Status: Editor is active. Click the button to destroy.</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { RichTextEditorUIComponent as EjsRichtexteditorUi } from '@syncfusion/ej2-vue-richtexteditor-ui';

const rteObj = ref(null);

const destroyEditor = () => {
  rteObj.value.destroy();
};

const onDestroyed = () => {
  const logElement = document.getElementById('event-log');
  if (logElement) {
    logElement.innerText = '[destroyed event]: Editor component has been successfully destroyed.';
  }
};
</script>
```

**Use cases:**
- Clean up external resources or subscriptions
- Save draft data before editor is removed
- Trigger post-destruction workflows
- Cancel pending uploads or API calls

---

## Focus & Blur Events

### focus

The `focus` event fires when the editor receives focus, either through user interaction (clicking inside the editor) or a method call (`focusIn()`). Its event arguments identify the event source.

```html
<template>
  <div>
    <ejs-richtexteditor-ui :focus="onFocus" :blur="onBlur"></ejs-richtexteditor-ui>
    <p id="event-log" style="margin-top: 15px;">Click inside the editor to trigger the focus event.</p>
  </div>
</template>

<script setup>
import { RichTextEditorUIComponent as EjsRichtexteditorUi } from '@syncfusion/ej2-vue-richtexteditor-ui';

const onFocus = () => {
  const logElement = document.getElementById('event-log');
  if (logElement) {
    logElement.innerText = '[focus event]: Editor focused and ready for input.';
  }
};

const onBlur = () => {
  const logElement = document.getElementById('event-log');
  if (logElement) {
    logElement.innerText = '[blur event]: Editor lost focus. Click inside the editor to focus again.';
  }
};
</script>
```

**Use cases:**
- Track whether the editor is active
- Show/hide secondary UI when editor is focused
- Validate content when focus is lost
- Update autosave or sync state

### blur

The `blur` event fires when the editor loses focus, either through user interaction (clicking outside) or a method call (`focusOut()`).

```html
<template>
  <div>
    <ejs-richtexteditor-ui :blur="onBlur"></ejs-richtexteditor-ui>
    <p id="event-log" style="margin-top: 15px;">Click outside the editor to trigger the blur event.</p>
  </div>
</template>

<script setup>
import { RichTextEditorUIComponent as EjsRichtexteditorUi } from '@syncfusion/ej2-vue-richtexteditor-ui';

const onBlur = () => {
  const logElement = document.getElementById('event-log');
  if (logElement) {
    logElement.innerText = '[blur event]: Editor lost focus. Saving draft...';
  }
};
</script>
```

**Use cases:**
- Save draft content when the user leaves the editor
- Validate or process content
- Hide focus-dependent UI elements
- Update external state or notifications

---

## Change Event

### change

The `change` event fires whenever the editor content changes, such as when text is inserted, deleted, moved, replaced, or formatted. Its event arguments provide the updated document, selection state, action type, and affected nodes.

```html
<template>
  <div>
    <ejs-richtexteditor-ui ref="editor" :change="onChange"></ejs-richtexteditor-ui>
    <div class="event-log" style="margin-top: 15px;">
      <p id="event-log">Action: None</p>
      <p id="affected-node">Affected Element: None</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { RichTextEditorUIComponent as EjsRichtexteditorUi } from '@syncfusion/ej2-vue-richtexteditor-ui';

const editor = ref(null);

const onChange = (args) => {
  const logElement = document.getElementById('event-log');
  const nodeElement = document.getElementById('affected-node');
  if (logElement && nodeElement) {
    logElement.innerText = `Action: ${args.action || 'Modified'}`;
    if (args.affectedNodes && args.affectedNodes.length > 0) {
      const primaryNode = args.affectedNodes[0];
      nodeElement.innerText = `Affected Element: <${primaryNode.type}>`;
    } else {
      nodeElement.innerText = 'Affected Element: None';
    }
  }
};
</script>
```

**Event Arguments:**

| Property | Type | Description |
| --- | --- | --- |
| `action` | `string` | Type of action (e.g., 'Insert', 'Delete', 'Format') |
| `affectedNodes` | `Node[]` | Array of affected DOM nodes |
| `document` | `Document` | The current editor document |
| `selection` | `Selection` | Current selection or caret position |

**Use cases:**
- Track every content change for autosave
- Monitor changes for validation or compliance
- Update UI based on content state (e.g., disable publish button if empty)
- Implement collaborative editing (send changes to server)
- Detect specific types of modifications (insertions vs. deletions)

---

## Action Events

### actionBegin

The `actionBegin` event fires **before** an editor action is executed (inserting, deleting, formatting, etc.). It provides details about the pending action and allows applications to monitor or customize editor behavior before the operation begins.

```html
<template>
  <div>
    <ejs-richtexteditor-ui :actionBegin="onActionBegin"></ejs-richtexteditor-ui>
    <button id="clear-btn" class="e-btn" style="margin-top: 15px;" @click="clearLogs">Clear Log</button>
    <div id="log-container" style="margin-top: 15px; padding: 10px; border: 1px solid #ddd; min-height: 50px; max-height: 200px; overflow-y: auto;">
      <div id="empty-message" style="color: #999; font-style: italic;">No events captured yet. Try typing or formatting some text...</div>
    </div>
  </div>
</template>

<script setup>
import { RichTextEditorUIComponent as EjsRichtexteditorUi } from '@syncfusion/ej2-vue-richtexteditor-ui';

const onActionBegin = (args) => {
  const logContainer = document.getElementById('log-container');
  const emptyMessage = document.getElementById('empty-message');
  if (!logContainer) { return; }
  
  if (emptyMessage) {
    emptyMessage.style.display = 'none';
  }
  
  const logEntry = document.createElement('div');
  logEntry.style.fontSize = '12px';
  logEntry.style.marginBottom = '5px';
  logEntry.innerText = `[actionBegin] ${new Date().toLocaleTimeString()} - Action: ${args.action}`;
  logContainer.appendChild(logEntry);
};

const clearLogs = () => {
  const logContainer = document.getElementById('log-container');
  const emptyMessage = document.getElementById('empty-message');
  if (logContainer) {
    logContainer.innerHTML = '';
    if (emptyMessage) {
      emptyMessage.style.display = 'block';
    }
  }
};
</script>
```

**Use cases:**
- Log all editor actions for debugging or audit trails
- Prevent or cancel certain actions based on permissions
- Apply default settings before an action executes
- Show loading indicators for long-running operations
- Track undo/redo operations

### actionComplete

The `actionComplete` event fires **after** an editor action has been executed. Use this event to respond to completed operations, update UI accordingly, or trigger post-action workflows.

```html
<template>
  <div>
    <ejs-richtexteditor-ui
      ref="editor"
      :actionComplete="onActionComplete">
    </ejs-richtexteditor-ui>
    <div id="status" style="margin-top: 15px; padding: 10px; background-color: #f0f0f0;">
      Status: Ready
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { RichTextEditorUIComponent as EjsRichtexteditorUi } from '@syncfusion/ej2-vue-richtexteditor-ui';

const editor = ref(null);

const onActionComplete = (args) => {
  const statusElement = document.getElementById('status');
  if (statusElement) {
    const actionName = args.action || 'Unknown';
    statusElement.innerText = `Status: ${actionName} completed at ${new Date().toLocaleTimeString()}`;
  }
};
</script>
```

**Use cases:**
- Hide loading indicators after action completes
- Update UI state after formatting or content changes
- Save content after modifications
- Track operation performance metrics
- Trigger post-action notifications or confirmations

---

## Event Pattern Examples

### Complete Event Handling Example

```html
<template>
  <div>
    <ejs-richtexteditor-ui
      ref="editor"
      :created="onCreated"
      :focus="onFocus"
      :blur="onBlur"
      :change="onChange"
      :actionBegin="onActionBegin"
      :actionComplete="onActionComplete">
    </ejs-richtexteditor-ui>
    <div style="margin-top: 20px; padding: 15px; background-color: #f9f9f9; border: 1px solid #ddd;">
      <h4>Event Log</h4>
      <div id="eventLog" style="height: 300px; overflow-y: auto; font-size: 12px; font-family: monospace;"></div>
      <button @click="clearEventLog" style="margin-top: 10px;">Clear Log</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { RichTextEditorUIComponent as EjsRichtexteditorUi } from '@syncfusion/ej2-vue-richtexteditor-ui';

const editor = ref(null);
const eventLog = ref([]);

const addLog = (event, details) => {
  const timestamp = new Date().toLocaleTimeString();
  const logEntry = `[${timestamp}] ${event}: ${details}`;
  eventLog.value.unshift(logEntry);
  updateLogDisplay();
};

const updateLogDisplay = () => {
  const logElement = document.getElementById('eventLog');
  if (logElement) {
    logElement.innerHTML = eventLog.value.map(entry => 
      `<div style="padding: 2px 0;">${entry}</div>`
    ).join('');
  }
};

const onCreated = () => {
  addLog('created', 'Editor initialized');
};

const onFocus = () => {
  addLog('focus', 'Editor gained focus');
};

const onBlur = () => {
  addLog('blur', 'Editor lost focus');
};

const onChange = (args) => {
  addLog('change', `Action: ${args.action || 'Modified'}`);
};

const onActionBegin = (args) => {
  addLog('actionBegin', `Starting: ${args.action}`);
};

const onActionComplete = (args) => {
  addLog('actionComplete', `Completed: ${args.action}`);
};

const clearEventLog = () => {
  eventLog.value = [];
  updateLogDisplay();
};
</script>
```

### Autosave Implementation

```html
<template>
  <div>
    <ejs-richtexteditor-ui
      ref="editor"
      :change="onChange"
      :blur="onBlur">
    </ejs-richtexteditor-ui>
    <p id="saveStatus" style="margin-top: 10px; color: #999;">Content saved</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { RichTextEditorUIComponent as EjsRichtexteditorUi } from '@syncfusion/ej2-vue-richtexteditor-ui';

const editor = ref(null);
let autosaveTimeout = null;

const onChange = () => {
  // Debounce autosave: wait 2 seconds after the last change
  clearTimeout(autosaveTimeout);
  const statusElement = document.getElementById('saveStatus');
  if (statusElement) {
    statusElement.innerText = 'Saving...';
    statusElement.style.color = '#ff9800';
  }

  autosaveTimeout = setTimeout(() => {
    saveContent();
  }, 2000);
};

const onBlur = () => {
  // Save immediately when editor loses focus
  clearTimeout(autosaveTimeout);
  saveContent();
};

const saveContent = async () => {
  const content = editor.value.ej2Instances.getHtml();
  try {
    await fetch('/api/save-content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content })
    });
    
    const statusElement = document.getElementById('saveStatus');
    if (statusElement) {
      statusElement.innerText = 'Content saved';
      statusElement.style.color = '#4caf50';
    }
  } catch (error) {
    const statusElement = document.getElementById('saveStatus');
    if (statusElement) {
      statusElement.innerText = 'Error saving content';
      statusElement.style.color = '#f44336';
    }
  }
};
</script>
```
