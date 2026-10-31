# Vue Rich Text Editor Events

## Table of Contents
- [Overview](#overview)
- [Lifecycle Events](#lifecycle-events)
- [Editor Action Events](#editor-action-events)
- [Content Change Events](#content-change-events)
- [Dialog Events](#dialog-events)
- [File Upload Events](#file-upload-events)
- [Toolbar & Popup Events](#toolbar--popup-events)
- [AI Assistant Events](#ai-assistant-events)
- [Advanced Events](#advanced-events)

## Overview

The Syncfusion Vue Rich Text Editor provides a comprehensive set of events to handle user interactions, content changes, and component lifecycle. All events are emitted using Vue's `@event-name` syntax (Composition API) or `v-on:event-name` (Options API).

**Event Binding Pattern:**
```vue
<ejs-richtexteditor 
  @actionBegin="onActionBegin"
  @change="onChange"
  @created="onCreated"
/>
```

## Lifecycle Events

### created
**Type:** `EmitType<Object>`  
**When it fires:** After the Rich Text Editor component is fully rendered and initialized.

```vue
<template>
  <ejs-richtexteditor @created="onCreated" />
</template>

<script setup>
const onCreated = () => {
  console.log('Rich Text Editor is ready');
};
</script>
```

**Use Cases:**
- Initialize editor with dynamic content
- Set up custom configurations after render
- Trigger initial API calls

### destroyed
**Type:** `EmitType<Object>`  
**When it fires:** When the Rich Text Editor component is destroyed and removed from the DOM.

```vue
<script setup>
const onDestroyed = () => {
  console.log('Editor destroyed - cleanup if needed');
};
</script>
```

## Editor Action Events

### actionBegin
**Type:** `EmitType<ActionBeginEventArgs>`  
**When it fires:** Before executing any command via toolbar items.

**Event Arguments:**
- `cancel` (boolean) - Set to `true` to prevent the action
- `name` (string) - Name of the event
- `originalEvent` (MouseEvent | KeyboardEvent | DragEvent) - The initiating event
- `requestType` (string) - Type of action being performed
- `selectType` (string) - Whether selection is a dropdown

```vue
<template>
  <ejs-richtexteditor @actionBegin="onActionBegin" />
</template>

<script setup>
const onActionBegin = (args) => {
  if (args.requestType === 'Image') {
    // Validate before image insertion
    if (!userHasPermission) {
      args.cancel = true;
      alert('You do not have permission to insert images');
    }
  }
};
</script>
```

**Common requestType Values:**
- `Bold`, `Italic`, `Underline`, `StrikeThrough`
- `FontName`, `FontSize`, `FontColor`, `BackgroundColor`
- `Formats`, `Alignments`
- `OrderedList`, `UnorderedList`
- `CreateLink`, `Image`, `Table`
- `Undo`, `Redo`

### actionComplete
**Type:** `EmitType<ActionCompleteEventArgs>`  
**When it fires:** After a command has been executed successfully.

**Event Arguments:**
- `editorMode` (string) - Current editor mode ('HTML' or 'Markdown')
- `event` (MouseEvent | KeyboardEvent) - The associated event
- `name` (string) - Event name
- `requestType` (string) - Type of action completed

```vue
<script setup>
const onActionComplete = (args) => {
  console.log(`Action completed: ${args.requestType}`);
  if (args.requestType === 'Image') {
    trackAnalytics('image_inserted');
  }
};
</script>
```

**Use Cases:**
- Track user actions for analytics
- Update UI after formatting changes
- Trigger autosave after content modification

### toolbarClick
**Type:** `EmitType<Object>`  
**When it fires:** When any toolbar item is clicked.

```vue
<script setup>
const onToolbarClick = (args) => {
  console.log('Toolbar item clicked:', args.item.id);
};
</script>
```

### updatedToolbarStatus
**Type:** `EmitType<ToolbarStatusEventArgs>`  
**When it fires:** When toolbar item status is updated (e.g., undo/redo availability).

```vue
<script setup>
const onToolbarStatusUpdate = (args) => {
  // Update custom UI based on toolbar status
  console.log('Toolbar status updated');
};
</script>
```

## Content Change Events

### change
**Type:** `EmitType<ChangeEventArgs>`  
**When it fires:** When the editor loses focus AND content has changed since last blur.

**Event Arguments:**
- `isInteracted` (boolean) - `true` if triggered by user interaction (focus out), `false` if programmatic
- `name` (string) - Event name ('change')
- `value` (string) - Current HTML/Markdown content

```vue
<template>
  <ejs-richtexteditor 
    @change="onChange"
    :value="content"
  />
</template>

<script setup>
import { ref } from 'vue';

const content = ref('<p>Initial content</p>');

const onChange = (args) => {
  console.log('Content changed:', args.value);
  console.log('User interaction:', args.isInteracted);
  
  // Save to backend
  if (args.isInteracted) {
    saveContent(args.value);
  }
};
</script>
```

**Important:** This event fires on blur, not on every keystroke. For real-time tracking, use `selectionChanged`.

### selectionChanged
**Type:** `EmitType<SelectionChangedEventArgs>`  
**When it fires:** When a non-empty text selection is made or updated in the editor.

**Event Arguments:**
- `editorMode` (EditorMode | string) - 'HTML' or 'Markdown'
- `selectedContent` (string) - HTML string of selected content
- `selection` (Selection) - Browser Selection object

```vue
<script setup>
const onSelectionChanged = (args) => {
  console.log('Selected content:', args.selectedContent);
  console.log('Editor mode:', args.editorMode);
  
  // Show custom toolbar based on selection
  if (args.selectedContent.includes('<a')) {
    showLinkEditToolbar();
  }
};
</script>
```

**Use Cases:**
- Show context-aware UI based on selection
- Implement custom formatting preview
- Track selected content for analytics

### focus
**Type:** `EmitType<Object>`  
**When it fires:** When the editor gains focus.

```vue
<script setup>
const onFocus = () => {
  console.log('Editor focused');
  // Show formatting hints or tooltips
};
</script>
```

### blur
**Type:** `EmitType<Object>`  
**When it fires:** When the editor loses focus.

```vue
<script setup>
const onBlur = () => {
  console.log('Editor blurred');
  // Trigger validation or autosave
};
</script>
```

## Dialog Events

### beforeDialogOpen
**Type:** `EmitType<BeforeOpenEventArgs>`  
**When it fires:** Before any dialog (image, link, table) opens.

**Event Arguments:**
- `cancel` (boolean) - Set to `true` to prevent dialog from opening

```vue
<script setup>
const onBeforeDialogOpen = (args) => {
  console.log('Dialog opening');
  
  // Prevent image dialog if user lacks permission
  if (!userCanInsertImages && isImageDialog(args)) {
    args.cancel = true;
    showPermissionError();
  }
};
</script>
```

### dialogOpen
**Type:** `EmitType<Object>`  
**When it fires:** After a dialog has opened.

```vue
<script setup>
const onDialogOpen = () => {
  console.log('Dialog opened - customize UI if needed');
};
</script>
```

### beforeDialogClose
**Type:** `EmitType<BeforeCloseEventArgs>`  
**When it fires:** Before a dialog closes.

**Event Arguments:**
- `cancel` (boolean) - Set to `true` to prevent dialog from closing

```vue
<script setup>
const onBeforeDialogClose = (args) => {
  // Validate inputs before closing
  if (!validateImageUrl(imageUrl.value)) {
    args.cancel = true;
    alert('Please enter a valid image URL');
  }
};
</script>
```

### dialogClose
**Type:** `EmitType<Object>`  
**When it fires:** After a dialog has closed.

```vue
<script setup>
const onDialogClose = () => {
  console.log('Dialog closed');
};
</script>
```

## File Upload Events

### beforeImageUpload
**Type:** `EmitType<BeforeUploadEventArgs>`  
**When it fires:** Before an image upload process begins.

```vue
<script setup>
const onBeforeImageUpload = (args) => {
  console.log('Uploading image:', args.filesData[0].name);
  
  // Add custom headers
  args.currentRequest.setRequestHeader('Authorization', `Bearer ${token}`);
};
</script>
```

### imageSelected
**Type:** `EmitType<SelectedEventArgs>`  
**When it fires:** When an image is selected or dragged into the insert image dialog.

```vue
<script setup>
const onImageSelected = (args) => {
  console.log('Image selected:', args.filesData[0].name);
  console.log('File size:', args.filesData[0].size);
  
  // Validate file size
  const maxSize = 5 * 1024 * 1024; // 5MB
  if (args.filesData[0].size > maxSize) {
    args.cancel = true;
    alert('Image must be less than 5MB');
  }
};
</script>
```

### imageUploading
**Type:** `EmitType<UploadingEventArgs>`  
**When it fires:** During image upload progress.

```vue
<script setup>
const onImageUploading = (args) => {
  const progress = (args.e.loaded / args.e.total) * 100;
  console.log(`Upload progress: ${progress}%`);
  updateProgressBar(progress);
};
</script>
```

### imageUploadSuccess
**Type:** `EmitType<Object>`  
**When it fires:** When an image has been successfully uploaded to the server.

```vue
<script setup>
const onImageUploadSuccess = (args) => {
  console.log('Image uploaded successfully:', args.e.target.response);
};
</script>
```

### imageUploadFailed
**Type:** `EmitType<Object>`  
**When it fires:** When there is an error during image upload.

```vue
<script setup>
const onImageUploadFailed = (args) => {
  console.error('Image upload failed:', args.e);
  showErrorNotification('Failed to upload image. Please try again.');
};
</script>
```

### imageRemoving
**Type:** `EmitType<RemovingEventArgs>`  
**When it fires:** When a selected image is removed from the insert image dialog.

```vue
<script setup>
const onImageRemoving = (args) => {
  console.log('Removing image:', args.filesData[0].name);
};
</script>
```

### afterImageDelete
**Type:** `EmitType<AfterImageDeleteEventArgs>`  
**When it fires:** When a selected image is removed from the editor content.

**Event Arguments:**
- `element` (Node) - The deleted image DOM element
- `src` (string) - The 'src' attribute of the deleted image

```vue
<script setup>
const onAfterImageDelete = (args) => {
  console.log('Image deleted from content:', args.src);
  
  // Clean up server-side file
  deleteImageFromServer(args.src);
};
</script>
```

### beforeFileUpload (Media)
**Type:** `EmitType<BeforeUploadEventArgs>`  
**When it fires:** Before audio/video upload begins.

### fileSelected (Media)
**Type:** `EmitType<SelectedEventArgs>`  
**When it fires:** When audio/video is selected or dragged into the dialog.

### fileUploading (Media)
**Type:** `EmitType<UploadingEventArgs>`  
**When it fires:** During audio/video upload progress.

### fileUploadSuccess (Media)
**Type:** `EmitType<Object>`  
**When it fires:** When audio/video upload succeeds.

### fileUploadFailed (Media)
**Type:** `EmitType<Object>`  
**When it fires:** When audio/video upload fails.

### fileRemoving (Media)
**Type:** `EmitType<RemovingEventArgs>`  
**When it fires:** When audio/video is removed from the dialog.

### afterMediaDelete
**Type:** `EmitType<AfterMediaDeleteEventArgs>`  
**When it fires:** When audio/video is removed from editor content.

**Event Arguments:**
- `element` (Node) - Deleted audio/video DOM element
- `src` (string) - The 'src' attribute

## Toolbar & Popup Events

### beforeQuickToolbarOpen
**Type:** `EmitType<BeforeQuickToolbarOpenArgs>`  
**When it fires:** Before the quick toolbar (context toolbar) opens.

```vue
<script setup>
const onBeforeQuickToolbarOpen = (args) => {
  console.log('Quick toolbar opening for:', args.targetElement);
  
  // Customize quick toolbar items based on context
  if (args.targetElement.tagName === 'IMG') {
    args.items = ['Replace', 'Remove', 'Dimension'];
  }
};
</script>
```

### quickToolbarOpen
**Type:** `EmitType<Object>`  
**When it fires:** After the quick toolbar has opened.

### quickToolbarClose
**Type:** `EmitType<Object>`  
**When it fires:** After the quick toolbar has closed.

### beforePopupOpen
**Type:** `EmitType<BeforePopupOpenCloseEventArgs>`  
**When it fires:** Before a popup is about to open in the editor.

```vue
<script setup>
const onBeforePopupOpen = (args) => {
  console.log('Popup opening');
};
</script>
```

### beforePopupClose
**Type:** `EmitType<BeforePopupOpenCloseEventArgs>`  
**When it fires:** Before a popup is about to close in the editor.

## AI Assistant Events

### aiAssistantPromptRequest
**Type:** `EmitType<AIAssistantPromptRequestArgs>`  
**When it fires:** When a user sends a prompt to the AI Assistant using the slash menu.

**Event Arguments:**
- `cancel` (boolean) - Cancel the request
- `html` - HTML content context
- `prompt` - User's prompt text
- `promptSuggestions` - Available prompt suggestions
- `responseToolbarItems` - Toolbar items for response
- `text` - Plain text context

```vue
<script setup>
const onAIPromptRequest = async (args) => {
  console.log('AI Prompt:', args.prompt);
  
  try {
    // Call your AI service
    const response = await callAIService(args.prompt, args.text);
    
    // Add response to editor
    rteRef.value.ej2Instances.addAIPromptResponse(response);
  } catch (error) {
    console.error('AI request failed:', error);
    args.cancel = true;
  }
};
</script>
```

### aiAssistantStopRespondingClick
**Type:** `EmitType<AIAssistantStopRespondingArgs>`  
**When it fires:** When the user clicks the stop responding button in the AI Assistant.

**Event Arguments:**
- `dataIndex` - Index of the prompt data
- `event` - Click event
- `prompt` - The prompt text

```vue
<script setup>
const onStopRespondingClick = (args) => {
  console.log('Stopping AI response for:', args.prompt);
  
  // Cancel ongoing AI query
  cancelAIRequest();
};
</script>
```

### aiAssistantToolbarClick
**Type:** `EmitType<AIAssitantToolbarClickEventArgs>`  
**When it fires:** When a user selects an item from the AI Assistant toolbar.

**Event Arguments:**
- `cancel` (boolean) - Cancel the action
- `dataIndex` - Index in prompt history
- `item` - Toolbar item clicked
- `originalEvent` - Original click event
- `requestType` - Type of toolbar action

```vue
<script setup>
const onAIToolbarClick = (args) => {
  console.log('AI Toolbar action:', args.requestType);
  
  if (args.requestType === 'Regenerate') {
    regenerateAIResponse(args.dataIndex);
  }
};
</script>
```

## Advanced Events

### beforePasteCleanup
**Type:** `EmitType<PasteCleanupArgs>`  
**When it fires:** Before cleaning up pasted content.

```vue
<script setup>
const onBeforePasteCleanup = (args) => {
  console.log('Cleaning pasted content');
  
  // Custom cleanup logic
  args.pastedContent = args.pastedContent.replace(/style="[^"]*"/g, '');
};
</script>
```

### afterPasteCleanup
**Type:** `EmitType<object>`  
**When it fires:** After pasted content has been cleaned.

### beforeSanitizeHtml
**Type:** `EmitType<BeforeSanitizeHtmlArgs>`  
**When it fires:** Before sanitizing HTML content (in HTML mode).

```vue
<script setup>
const onBeforeSanitizeHtml = (args) => {
  console.log('Sanitizing HTML');
  
  // Allow custom attributes
  args.allowedAttributes.push('data-custom');
};
</script>
```

### beforeClipboardWrite
**Type:** `EmitType<ClipboardWriteEventArgs>`  
**When it fires:** Before setting copy/cut data to clipboard.

### beforeImageDrop
**Type:** `EmitType<ImageDropEventArgs>`  
**When it fires:** Before an image is dropped into the editor.

```vue
<script setup>
const onBeforeImageDrop = (args) => {
  console.log('Image dropped');
  
  // Validate dropped image
  if (!isValidImageType(args.file)) {
    args.cancel = true;
  }
};
</script>
```

### beforeMediaDrop
**Type:** `EmitType<MediaDropEventArgs>`  
**When it fires:** Before audio/video is dropped into the editor.

### resizeStart
**Type:** `EmitType<ResizeArgs>`  
**When it fires:** When resizing starts for tables, images, videos, or the editor.

```vue
<script setup>
const onResizeStart = (args) => {
  console.log('Resize started for:', args.targetElement.tagName);
};
</script>
```

### resizing
**Type:** `EmitType<ResizeArgs>`  
**When it fires:** While resizing is in progress.

### resizeStop
**Type:** `EmitType<ResizeArgs>`  
**When it fires:** When resizing stops.

```vue
<script setup>
const onResizeStop = (args) => {
  console.log('New dimensions:', args.targetElement.style.width, args.targetElement.style.height);
};
</script>
```

### documentExporting
**Type:** `EmitType<ExportingEventArgs>`  
**When it fires:** Just before PDF or Word export requests are dispatched.

```vue
<script setup>
const onDocumentExporting = (args) => {
  console.log('Exporting document to:', args.format);
  
  // Add custom metadata
  args.metadata = {
    author: currentUser.name,
    exportDate: new Date().toISOString()
  };
};
</script>
```

### wordImporting
**Type:** `EmitType<UploadingEventArgs>`  
**When it fires:** When a Word document import is initiated.

```vue
<script setup>
const onWordImporting = (args) => {
  console.log('Importing Word document');
  
  // Add authentication header
  args.currentRequest.setRequestHeader('Authorization', `Bearer ${token}`);
};
</script>
```

### slashMenuItemSelect
**Type:** `EmitType<SlashMenuItemSelectArgs>`  
**When it fires:** When a slash menu item is selected.

**Event Arguments:**
- `cancel` (boolean) - Cancel the action
- `isInteracted` (boolean) - User interaction flag
- `item` (HTMLLIElement) - Selected list item
- `itemData` (ISlashMenuItem) - Menu item data
- `originalEvent` - Mouse/Keyboard/Touch event

```vue
<script setup>
const onSlashMenuItemSelect = (args) => {
  console.log('Slash menu item selected:', args.itemData.text);
  
  if (args.itemData.text === 'Custom Block') {
    args.cancel = true;
    insertCustomBlock();
  }
};
</script>
```

## Event Handling Best Practices

### Multiple Event Handlers
```vue
<template>
  <ejs-richtexteditor 
    @actionBegin="onActionBegin"
    @actionComplete="onActionComplete"
    @change="onChange"
    @created="onCreated"
  />
</template>

<script setup>
const onActionBegin = (args) => { /* ... */ };
const onActionComplete = (args) => { /* ... */ };
const onChange = (args) => { /* ... */ };
const onCreated = () => { /* ... */ };
</script>
```

### Async Event Handlers
```vue
<script setup>
const onBeforeImageUpload = async (args) => {
  // Validate with backend
  const isValid = await validateImageUpload(args.filesData[0]);
  
  if (!isValid) {
    args.cancel = true;
  }
};
</script>
```

### Combining with v-model
```vue
<template>
  <ejs-richtexteditor 
    v-model:value="content"
    @change="trackChanges"
  />
</template>

<script setup>
import { ref } from 'vue';

const content = ref('');

const trackChanges = (args) => {
  console.log('Content updated via v-model:', content.value);
  console.log('Event value:', args.value);
};
</script>
```

## Common Event Combinations

### Autosave Implementation
```vue
<script setup>
import { ref } from 'vue';

const saveTimeout = ref(null);

const onActionComplete = (args) => {
  // Debounce autosave
  clearTimeout(saveTimeout.value);
  saveTimeout.value = setTimeout(() => {
    autoSaveContent();
  }, 2000);
};

const onChange = (args) => {
  // Immediate save on blur
  saveContent(args.value);
};
</script>
```

### Upload Progress Tracking
```vue
<script setup>
import { ref } from 'vue';

const uploadProgress = ref(0);
const uploadStatus = ref('');

const onBeforeImageUpload = () => {
  uploadProgress.value = 0;
  uploadStatus.value = 'Starting upload...';
};

const onImageUploading = (args) => {
  uploadProgress.value = (args.e.loaded / args.e.total) * 100;
  uploadStatus.value = `Uploading: ${Math.round(uploadProgress.value)}%`;
};

const onImageUploadSuccess = () => {
  uploadStatus.value = 'Upload complete!';
};

const onImageUploadFailed = () => {
  uploadStatus.value = 'Upload failed!';
};
</script>
```

### Content Validation
```vue
<script setup>
const onBeforeDialogClose = (args) => {
  // Validate link URL
  if (isLinkDialog && !isValidUrl(linkUrl.value)) {
    args.cancel = true;
    showError('Please enter a valid URL');
  }
};

const onBeforeSanitizeHtml = (args) => {
  // Custom sanitization rules
  args.deniedTags.push('script', 'iframe');
};
</script>
```
