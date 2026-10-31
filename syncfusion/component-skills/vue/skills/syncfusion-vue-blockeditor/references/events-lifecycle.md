# Events and Lifecycle in Vue BlockEditor

## Table of Contents
- [Overview](#overview)
- [Block Events](#block-events)
  - [blockChanged](#blockchanged)
  - [blockDragStart](#blockdragstart)
  - [blockDragging](#blockdragging)
  - [blockDropped](#blockdropped)
- [Focus Events](#focus-events)
  - [focus](#focus)
  - [blur](#blur)
- [Selection Events](#selection-events)
  - [selectionChanged](#selectionchanged)
- [Paste Events](#paste-events)
  - [beforePasteCleanup](#beforepastecleanup)
  - [afterPasteCleanup](#afterpastecleanup)
- [File Upload Events](#file-upload-events)
  - [beforeFileUpload](#beforefileupload)
  - [fileUploading](#fileuploading)
  - [fileUploadSuccess](#fileuploadsuccess)
  - [fileUploadFailed](#fileuploadfailed)
- [Lifecycle Events](#lifecycle-events)
  - [created](#created)
- [Complete Examples](#complete-examples)

## Overview

The BlockEditor provides 14 events to track user interactions, content changes, drag and drop operations, file uploads, and component lifecycle. All events use the Composition API pattern with event handler functions.

## Block Events

### blockChanged

Triggered when a block is added, updated, or removed:

```vue
<template>
  <div>
    <ejs-blockeditor
      ref="blockEditor"
      :value="editorValue"
      :blockChanged="onBlockChanged"
      :height="500"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { BlockEditorComponent as EjsBlockeditor } from '@syncfusion/ej2-vue-blockeditor';

const blockEditor = ref(null);

const editorValue = ref([
  {
    id: 'block1',
    type: 'Paragraph',
    content: [
      {
        text: 'Edit this block to trigger the event',
        type: 'Text'
      }
    ]
  }
]);

const onBlockChanged = (args) => {
  console.log('Block changed:', args);
  console.log('Changes:', args.changes);
  args.changes.forEach(change => {
    console.log('Action:', change.action); // 'Insert', 'Update', 'Delete', 'Move'
    console.log('Data:', change.data);
  });
};
</script>
```

### blockDragStart

Triggered when dragging a block starts:

```vue
<template>
  <div>
    <ejs-blockeditor
      ref="blockEditor"
      :value="editorValue"
      :enableDragAndDrop="true"
      :blockDragStart="onBlockDragStart"
      :height="500"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { BlockEditorComponent as EjsBlockeditor } from '@syncfusion/ej2-vue-blockeditor';

const blockEditor = ref(null);

const editorValue = ref([
  {
    id: 'block1',
    type: 'Paragraph',
    content: [{ text: 'Drag this block', type: 'Text' }]
  },
  {
    id: 'block2',
    type: 'Paragraph',
    content: [{ text: 'Another block', type: 'Text' }]
  }
]);

const onBlockDragStart = (args) => {
  console.log('Drag started:', args);
  console.log('Blocks:', args.blocks);
  console.log('From index:', args.fromIndex);
  console.log('Target:', args.target);
  
  // Optionally cancel drag
  // args.cancel = true;
};
</script>
```

### blockDragging

Triggered while a block is being dragged:

```vue
<template>
  <div>
    <ejs-blockeditor
      ref="blockEditor"
      :value="editorValue"
      :enableDragAndDrop="true"
      :blockDragging="onBlockDragging"
      :height="500"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { BlockEditorComponent as EjsBlockeditor } from '@syncfusion/ej2-vue-blockeditor';

const blockEditor = ref(null);

const editorValue = ref([
  {
    id: 'block1',
    type: 'Paragraph',
    content: [{ text: 'Drag this block', type: 'Text' }]
  },
  {
    id: 'block2',
    type: 'Paragraph',
    content: [{ text: 'Drop zone', type: 'Text' }]
  }
]);

const onBlockDragging = (args) => {
  console.log('Block dragging:', args);
  console.log('Blocks:', args.blocks);
  console.log('Drop index:', args.dropIndex);
  console.log('Target:', args.target);
};
</script>
```

### blockDropped

Triggered when a block is dropped:

```vue
<template>
  <div>
    <ejs-blockeditor
      ref="blockEditor"
      :value="editorValue"
      :enableDragAndDrop="true"
      :blockDropped="onBlockDropped"
      :height="500"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { BlockEditorComponent as EjsBlockeditor } from '@syncfusion/ej2-vue-blockeditor';

const blockEditor = ref(null);

const editorValue = ref([
  {
    id: 'block1',
    type: 'Paragraph',
    content: [{ text: 'Drag and drop this block', type: 'Text' }]
  },
  {
    id: 'block2',
    type: 'Paragraph',
    content: [{ text: 'Drop zone', type: 'Text' }]
  },
  {
    id: 'block3',
    type: 'Paragraph',
    content: [{ text: 'Another drop zone', type: 'Text' }]
  }
]);

const onBlockDropped = (args) => {
  console.log('Block dropped:', args);
  console.log('Blocks:', args.blocks);
  console.log('Drop index:', args.dropIndex);
  console.log('From index:', args.fromIndex);
  console.log('Target:', args.target);
};
};
</script>
```

## Focus Events

### focus

Triggered when the editor receives focus:

```vue
<template>
  <div>
    <ejs-blockeditor
      ref="blockEditor"
      :value="editorValue"
      :focus="onFocus"
      :height="500"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { BlockEditorComponent as EjsBlockeditor } from '@syncfusion/ej2-vue-blockeditor';

const blockEditor = ref(null);

const editorValue = ref([
  {
    id: 'block1',
    type: 'Paragraph',
    content: [
      {
        text: 'Click here to focus the editor',
        type: 'Text'
      }
    ]
  }
]);

const onFocus = (args) => {
  console.log('Editor focused:', args);
  console.log('Block ID:', args.blockId);
  console.log('Event:', args.event);
};
</script>
```

### blur

Triggered when the editor loses focus:

```vue
<template>
  <div>
    <ejs-blockeditor
      ref="blockEditor"
      :value="editorValue"
      :blur="onBlur"
      :height="500"
    />
    <button>Click to blur editor</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { BlockEditorComponent as EjsBlockeditor } from '@syncfusion/ej2-vue-blockeditor';

const blockEditor = ref(null);

const editorValue = ref([
  {
    id: 'block1',
    type: 'Paragraph',
    content: [
      {
        text: 'Click outside to blur the editor',
        type: 'Text'
      }
    ]
  }
]);

const onBlur = (args) => {
  console.log('Editor blurred:', args);
  console.log('Block ID:', args.blockId);
  console.log('Event:', args.event);
};
</script>
```

## Selection Events

### selectionChanged

Triggered when the selection changes:

```vue
<template>
  <div>
    <ejs-blockeditor
      ref="blockEditor"
      :value="editorValue"
      :selectionChanged="onSelectionChanged"
      :height="500"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { BlockEditorComponent as EjsBlockeditor } from '@syncfusion/ej2-vue-blockeditor';

const blockEditor = ref(null);

const editorValue = ref([
  {
    id: 'block1',
    type: 'Paragraph',
    content: [
      {
        text: 'Select text to trigger selection changed event',
        type: 'Text'
      }
    ]
  }
]);

const onSelectionChanged = (args) => {
  console.log('Selection changed:', args);
  console.log('Event:', args.event);
};
</script>
```

## Paste Events

### beforePasteCleanup

Triggered before pasted content is cleaned up:

```vue
<template>
  <div>
    <ejs-blockeditor
      ref="blockEditor"
      :value="editorValue"
      :beforePasteCleanup="onBeforePasteCleanup"
      :height="500"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { BlockEditorComponent as EjsBlockeditor } from '@syncfusion/ej2-vue-blockeditor';

const blockEditor = ref(null);

const editorValue = ref([
  {
    id: 'block1',
    type: 'Paragraph',
    content: [
      {
        text: 'Paste content here to trigger cleanup',
        type: 'Text'
      }
    ]
  }
]);

const onBeforePasteCleanup = (args) => {
  console.log('Before paste cleanup:', args);
  console.log('Content:', args.content);
  
  // Modify content before cleanup
  // args.content = modifiedContent;
};
</script>
```

### afterPasteCleanup

Triggered after pasted content is cleaned up:

```vue
<template>
  <div>
    <ejs-blockeditor
      ref="blockEditor"
      :value="editorValue"
      :afterPasteCleanup="onAfterPasteCleanup"
      :pasteCleanupSettings="pasteCleanupSettings"
      :height="500"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { BlockEditorComponent as EjsBlockeditor } from '@syncfusion/ej2-vue-blockeditor';

const blockEditor = ref(null);

const pasteCleanupSettings = ref({
  keepFormat: true,
  deniedTags: ['script', 'style'],
});

const editorValue = ref([
  {
    id: 'block1',
    type: 'Paragraph',
    content: [
      {
        text: 'Paste formatted content here',
        type: 'Text'
      }
    ]
  }
]);

const onAfterPasteCleanup = (args) => {
  console.log('After paste cleanup:', args);
  console.log('Cleaned content:', args.content);
};
</script>
```

## File Upload Events

### beforeFileUpload

Triggered before a file upload begins:

```vue
<template>
  <div>
    <ejs-blockeditor
      ref="blockEditor"
      :value="editorValue"
      :imageBlockSettings="imageBlockSettings"
      :beforeFileUpload="onBeforeFileUpload"
      :height="500"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { BlockEditorComponent as EjsBlockeditor } from '@syncfusion/ej2-vue-blockeditor';

const blockEditor = ref(null);

const imageBlockSettings = ref({
  saveUrl: 'https://api.example.com/upload',
  maxFileSize: 5000000
});

const editorValue = ref([
  {
    id: 'block1',
    type: 'Paragraph',
    content: [
      {
        text: 'Insert an image to trigger upload events',
        type: 'Text'
      }
    ]
  }
]);

const onBeforeFileUpload = (args) => {
  console.log('Before file upload:', args);
  console.log('File:', args.fileData);
  console.log('File size:', args.fileData.size);
  console.log('File type:', args.fileData.type);
  
  // Validate file
  if (args.fileData.size > 5000000) {
    args.cancel = true;
    alert('File size must be less than 5MB');
  }
  
  // Add custom headers
  // args.customFormData = { token: 'abc123' };
};
</script>
```

### fileUploading

Triggered during file upload progress:

```vue
<template>
  <div>
    <ejs-blockeditor
      ref="blockEditor"
      :value="editorValue"
      :imageBlockSettings="imageBlockSettings"
      :fileUploading="onFileUploading"
      :height="500"
    />
    <div v-if="uploadProgress > 0">
      <p>Upload progress: {{ uploadProgress }}%</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { BlockEditorComponent as EjsBlockeditor } from '@syncfusion/ej2-vue-blockeditor';

const blockEditor = ref(null);
const uploadProgress = ref(0);

const imageBlockSettings = ref({
  saveUrl: 'https://api.example.com/upload'
});

const editorValue = ref([
  {
    id: 'block1',
    type: 'Paragraph',
    content: [
      {
        text: 'Insert an image to see upload progress',
        type: 'Text'
      }
    ]
  }
]);

const onFileUploading = (args) => {
  console.log('File uploading:', args);
  uploadProgress.value = args.progress;
  console.log('Progress:', args.progress + '%');
};
</script>
```

### fileUploadSuccess

Triggered when file upload succeeds:

```vue
<template>
  <div>
    <ejs-blockeditor
      ref="blockEditor"
      :value="editorValue"
      :imageBlockSettings="imageBlockSettings"
      :fileUploadSuccess="onFileUploadSuccess"
      :height="500"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { BlockEditorComponent as EjsBlockeditor } from '@syncfusion/ej2-vue-blockeditor';

const blockEditor = ref(null);

const imageBlockSettings = ref({
  saveUrl: 'https://api.example.com/upload'
});

const editorValue = ref([
  {
    id: 'block1',
    type: 'Paragraph',
    content: [
      {
        text: 'Insert an image',
        type: 'Text'
      }
    ]
  }
]);

const onFileUploadSuccess = (args) => {
  console.log('File upload success:', args);
  console.log('File:', args.file);
  console.log('File URL:', args.fileUrl);
  console.log('Operation:', args.operation);
  console.log('Status:', args.statusText);
  console.log('Response:', args.response);
  
  alert('Image uploaded successfully!');
};
</script>
```

### fileUploadFailed

Triggered when file upload fails:

```vue
<template>
  <div>
    <ejs-blockeditor
      ref="blockEditor"
      :value="editorValue"
      :imageBlockSettings="imageBlockSettings"
      :fileUploadFailed="onFileUploadFailed"
      :height="500"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { BlockEditorComponent as EjsBlockeditor } from '@syncfusion/ej2-vue-blockeditor';

const blockEditor = ref(null);

const imageBlockSettings = ref({
  saveUrl: 'https://api.example.com/upload'
});

const editorValue = ref([
  {
    id: 'block1',
    type: 'Paragraph',
    content: [
      {
        text: 'Insert an image',
        type: 'Text'
      }
    ]
  }
]);

const onFileUploadFailed = (args) => {
  console.error('File upload failed:', args);
  console.error('Error:', args.error);
  console.error('Status:', args.statusCode);
  
  alert('Image upload failed: ' + args.error.message);
};
</script>
```

## Lifecycle Events

### created

Triggered when the component is created:

```vue
<template>
  <div>
    <ejs-blockeditor
      ref="blockEditor"
      :value="editorValue"
      :created="onCreated"
      :height="500"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { BlockEditorComponent as EjsBlockeditor } from '@syncfusion/ej2-vue-blockeditor';

const blockEditor = ref(null);

const editorValue = ref([
  {
    id: 'block1',
    type: 'Paragraph',
    content: [
      {
        text: 'Editor created successfully',
        type: 'Text'
      }
    ]
  }
]);

const onCreated = () => {
  console.log('BlockEditor created');
  console.log('Editor instance:', blockEditor.value.ej2Instances);
  
  // Perform initialization tasks
  console.log('Block count:', blockEditor.value.ej2Instances.getBlockCount());
};
</script>
```

## Complete Examples

### Comprehensive Events Example

A complete example with all event handlers:

```vue
<template>
  <div>
    <h2>BlockEditor Events Demo</h2>
    
    <div class="event-log">
      <h3>Event Log:</h3>
      <div v-for="(event, index) in eventLog" :key="index">
        <span>{{ event.timestamp }}: </span>
        <strong>{{ event.name }}</strong>
        <span> - {{ event.details }}</span>
      </div>
    </div>
    
    <ejs-blockeditor
      ref="blockEditor"
      :value="editorValue"
      :enableDragAndDrop="true"
      :imageBlockSettings="imageBlockSettings"
      :pasteCleanupSettings="pasteCleanupSettings"
      :created="onCreated"
      :blockChanged="onBlockChanged"
      :blockDragStart="onBlockDragStart"
      :blockDragging="onBlockDragging"
      :blockDropped="onBlockDropped"
      :focus="onFocus"
      :blur="onBlur"
      :selectionChanged="onSelectionChanged"
      :beforePasteCleanup="onBeforePasteCleanup"
      :afterPasteCleanup="onAfterPasteCleanup"
      :beforeFileUpload="onBeforeFileUpload"
      :fileUploading="onFileUploading"
      :fileUploadSuccess="onFileUploadSuccess"
      :fileUploadFailed="onFileUploadFailed"
      :height="600"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { BlockEditorComponent as EjsBlockeditor } from '@syncfusion/ej2-vue-blockeditor';

const blockEditor = ref(null);
const eventLog = ref([]);

const imageBlockSettings = ref({
  saveUrl: 'https://api.example.com/upload',
  maxFileSize: 5000000
});

const pasteCleanupSettings = ref({
  keepFormat: true,
  deniedTags: ['script']
});

const editorValue = ref([
  {
    id: 'block1',
    type: 'Heading1',
    content: [{ text: 'Events Demonstration', type: 'Text' }]
  },
  {
    id: 'block2',
    type: 'Paragraph',
    content: [{ text: 'Interact with the editor to trigger events', type: 'Text' }]
  },
  {
    id: 'block3',
    type: 'Paragraph',
    content: [{ text: 'Try dragging blocks, selecting text, pasting content', type: 'Text' }]
  }
]);

const logEvent = (name, details) => {
  const timestamp = new Date().toLocaleTimeString();
  eventLog.value.unshift({ name, details, timestamp });
  
  // Keep only last 10 events
  if (eventLog.value.length > 10) {
    eventLog.value.pop();
  }
};

// Lifecycle
const onCreated = () => {
  logEvent('created', 'Editor initialized');
};

// Block Events
const onBlockChanged = (args) => {
  logEvent('blockChanged', `Action: ${args.action}, Block: ${args.block?.id}`);
};

const onBlockDragStart = (args) => {
  logEvent('blockDragStart', `Block: ${args.blockId}`);
};

const onBlockDragging = (args) => {
  logEvent('blockDragging', `Position: ${args.position}`);
};

const onBlockDropped = (args) => {
  logEvent('blockDropped', `Block: ${args.blockId}, From: ${args.oldIndex}, To: ${args.newIndex}`);
};

// Focus Events
const onFocus = () => {
  logEvent('focus', 'Editor focused');
};

const onBlur = () => {
  logEvent('blur', 'Editor blurred');
};

// Selection Events
const onSelectionChanged = (args) => {
  const count = args.selectedBlocks?.length || 0;
  logEvent('selectionChanged', `Selected: ${count} block(s)`);
};

// Paste Events
const onBeforePasteCleanup = (args) => {
  logEvent('beforePasteCleanup', `Content length: ${args.htmlContent?.length || 0}`);
};

const onAfterPasteCleanup = (args) => {
  logEvent('afterPasteCleanup', `Blocks created: ${args.blocks?.length || 0}`);
};

// File Upload Events
const onBeforeFileUpload = (args) => {
  logEvent('beforeFileUpload', `File: ${args.fileData?.name}, Size: ${args.fileData?.size}`);
};

const onFileUploading = (args) => {
  logEvent('fileUploading', `Progress: ${args.progress}%`);
};

const onFileUploadSuccess = (args) => {
  logEvent('fileUploadSuccess', `URL: ${args.fileUrl}`);
};

const onFileUploadFailed = (args) => {
  logEvent('fileUploadFailed', `Error: ${args.error?.message}`);
};
</script>

<style scoped>
.event-log {
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 20px;
  background-color: #f9f9f9;
  font-family: monospace;
  font-size: 12px;
}

.event-log h3 {
  margin-top: 0;
  font-size: 14px;
}

.event-log div {
  margin-bottom: 5px;
  padding: 2px 0;
  border-bottom: 1px solid #eee;
}
</style>
```

This comprehensive guide covers all 14 events in the Vue BlockEditor using the Composition API with practical examples.
