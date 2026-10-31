# Syncfusion TypeScript Uploader — API Reference

> **Source:** [https://ej2.syncfusion.com/documentation/api/uploader/index-default](https://ej2.syncfusion.com/documentation/api/uploader/index-default)
> **Last Updated:** 16 Mar 2026

---

## Table of Contents

1. [Uploader Class](#uploader-class)
2. [Properties](#properties)
3. [Methods](#methods)
4. [Events](#events)
5. [Supporting Interfaces & Types](#supporting-interfaces--types)
   - [AsyncSettingsModel](#asyncsettingsmodel)
   - [ButtonsPropsModel](#buttonspropsmodel)
   - [FilesPropModel](#filespropmodel)
   - [FileInfo](#fileinfo)
   - [ValidationMessages](#validationmessages)
   - [DropEffect (Enum)](#dropeffect-enum)
6. [Event Argument Interfaces](#event-argument-interfaces)
   - [SelectedEventArgs](#selectedeventargs)
   - [UploadingEventArgs](#uploadingeventargs)
   - [RemovingEventArgs](#removingeventargs)
   - [BeforeRemoveEventArgs](#beforeremoveeventargs)
   - [BeforeUploadEventArgs](#beforeuploadeventargs)
   - [ActionCompleteEventArgs](#actioncompleteeventargs)
   - [CancelEventArgs](#canceleventargs)
   - [ClearingEventArgs](#clearingeventargs)
   - [FileListRenderingEventArgs](#filelistrenderingeventargs)
   - [RenderingEventArgs (Deprecated)](#renderingeventargs-deprecated)
   - [PauseResumeEventArgs](#pauseresumeeventargs)

---

## Uploader Class

The `Uploader` component allows uploading images, documents, and other files from a local machine to a server.

**Import:**
```typescript
import { Uploader } from '@syncfusion/ej2-inputs';
```

**Basic usage:**
```html
<input type="file" name="images[]" id="upload" />
```
```typescript
const uploadObj = new Uploader();
uploadObj.appendTo('#upload');
```

---

## Properties

### `allowedExtensions` — `string`

Specifies the extensions of the file types allowed in the uploader component. Pass extensions with comma separators.

```typescript
allowedExtensions: '.jpg,.png,.pdf'
```

- **Default:** `''`

---

### `asyncSettings` — [`AsyncSettingsModel`](#asyncsettingsmodel)

Configures the save and remove URL to perform upload operations on the server asynchronously.

```typescript
asyncSettings: {
  saveUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Save',
  removeUrl: 'https://aspnetmvc.syncfusion.com/services/api/uploadbox/Remove'
}
```

- **Default:** `{ saveUrl: '', removeUrl: '' }`

---

### `autoUpload` — `boolean`

By default, the uploader initiates automatic upload when files are added to the upload queue. Disable this property to manipulate files before uploading. When `true`, the "Upload" and "Clear" buttons are hidden from the file list.

- **Default:** `true`

---

### `buttons` — [`ButtonsPropsModel`](#buttonspropsmodel)

Customizes the default text of "Browse", "Clear", and "Upload" buttons with plain text or HTML elements. If both `locale` and `buttons` are configured, `buttons` takes precedence.

```typescript
buttons: { browse: 'Choose File', clear: 'Clear All', upload: 'Upload All' }
```

- **Default:** `{ browse: 'Browse…', clear: 'Clear', upload: 'Upload' }`

---

### `cssClass` — `string`

Specifies one or more CSS class names appended to the root element of the uploader for custom styling.

- **Default:** `''`

---

### `directoryUpload` — `boolean`

Specifies whether an entire folder of files can be browsed and uploaded. When enabled, only folder contents can be selected or dropped — individual files are not accepted.

> **Note:** When enabled, only folders may be selected/dropped; individual file selection is disabled.

- **Default:** `false`

---

### `dropArea` — `string | HTMLElement`

Specifies a custom drop target element to handle drag-and-drop uploads. By default, the component creates a wrapper around the file input that acts as the drop target.

> For more details, see the [drag-and-drop](https://ej2.syncfusion.com/documentation/uploader/file-source/#drag-and-drop) section.

- **Default:** `null`

---

### `dropEffect` — [`DropEffect`](#dropeffect-enum)

Specifies the drag operation effect for the uploader. Possible values: `Copy`, `Move`, `Link`, `None`, `Default`.

- **Default:** `'Default'`

---

### `enableHtmlSanitizer` — `boolean`

When `true`, prevents cross-site scripting (XSS) code in filenames. The uploader removes any XSS code from filenames and shows a validation error message to the user.

- **Default:** `true`

---

### `enablePersistence` — `boolean`

Enable or disable persisting the component's state between page reloads.

- **Default:** `false`

---

### `enableRtl` — `boolean`

Enable or disable rendering the component in right-to-left (RTL) direction.

- **Default:** `false`

---

### `enabled` — `boolean`

Specifies whether the component is enabled or disabled. When `false`, the uploader does not allow any interaction.

- **Default:** `true`

---

### `files` — [`FilesPropModel[]`](#filespropmodel)

Specifies the list of files preloaded on rendering. Used to view and remove already-uploaded files from the server. Preloaded files are set to the "uploaded successfully" state by default.

**Required properties for each preloaded file:** `name`, `size`, `type`

```typescript
files: [
  { name: 'Nature', size: 500000, type: '.png' },
  { name: 'TypeScript Succinctly', size: 12000, type: '.pdf' },
  { name: 'ASP.NET Webhooks', size: 500000, type: '.docx' }
]
```

- **Default:** `{ name: '', size: null, type: '' }`

---

### `htmlAttributes` — `{ [key: string]: string }`

Adds additional HTML attributes (e.g., `disabled`, `value`) to the element. If both a property and its equivalent HTML attribute are configured, the property value takes precedence.

```typescript
htmlAttributes: { name: 'browse', multiple: 'false' }
```

- **Default:** `{}`

---

### `locale` — `string`

Overrides the global culture and localization value for this component.

- **Default:** `''` (uses global culture, `'en-US'`)

---

### `maxFileSize` — `number`

Specifies the maximum allowed file size (in bytes) for upload. Prevents uploading files that are too large.

- **Default:** `30000000` (30 MB)

---

### `minFileSize` — `number`

Specifies the minimum file size (in bytes) for upload. Prevents uploading empty or very small files.

- **Default:** `0`

---

### `multiple` — `boolean`

Specifies whether multiple files can be browsed or dropped simultaneously in the uploader.

- **Default:** `true`

---

### `sequentialUpload` — `boolean`

By default, the uploader processes multiple files simultaneously. When `true`, files are uploaded one after the other in sequence.

- **Default:** `false`

---

### `showFileList` — `boolean`

Specifies whether the default file list is rendered. Set to `false` to suppress the default file list and use a custom template instead.

- **Default:** `true`

---

### `template` — `string | Function`

Specifies an HTML string or a function used to customize the content of each file item in the list.

> For more details, see the [template](https://ej2.syncfusion.com/documentation/uploader/template/) section.

- **Default:** `null`

---

## Methods

### `addEventListener(eventName, handler)`

Adds a handler to the given event listener.

| Parameter | Type | Description |
|-----------|------|-------------|
| `eventName` | `string` | The name of the event to listen for |
| `handler` | `Function` | The callback to run when the event occurs |

**Returns:** `void`

---

### `appendTo(selector?)`

Appends the control within the given HTML element.

| Parameter | Type | Description |
|-----------|------|-------------|
| `selector` *(optional)* | `string \| HTMLElement` | Target element where the control is appended |

**Returns:** `void`

---

### `bytesToSize(bytes)`

Converts a byte value into a human-readable string (kilobytes or megabytes) based on [binary prefix](https://en.wikipedia.org/wiki/Binary_prefix).

| Parameter | Type | Description |
|-----------|------|-------------|
| `bytes` | `number` | File size in bytes |

**Returns:** `string`

```typescript
const readableSize = uploadObj.bytesToSize(1048576); // "1 MB"
```

---

### `cancel(fileData?)`

Stops an in-progress chunked upload based on the file data. The partially uploaded file is removed from the server when canceled.

| Parameter | Type | Description |
|-----------|------|-------------|
| `fileData` *(optional)* | `FileInfo[]` | Files to cancel |

**Returns:** `void`

---

### `clearAll()`

Clears all file entries from the file list (both queued and uploaded files).

**Returns:** `void`

---

### `createFileList(fileData)`

Creates the file list UI for the specified file data.

| Parameter | Type | Description |
|-----------|------|-------------|
| `fileData` | `FileInfo[]` | Files for which to create the file list |

**Returns:** `void`

---

### `dataBind()`

When invoked, applies all pending property changes immediately to the component.

**Returns:** `void`

---

### `destroy()`

Removes the component from the DOM and detaches all related event handlers. Also removes associated attributes and CSS classes.

**Returns:** `void`

---

### `getFilesData(index?)`

Gets the data of files currently shown in the file list.

| Parameter | Type | Description |
|-----------|------|-------------|
| `index` *(optional)* | `number` | Index of the specific file list item (`<li>`) |

**Returns:** [`FileInfo[]`](#fileinfo)

```typescript
const allFiles = uploadObj.getFilesData();
const firstFile = uploadObj.getFilesData(0);
```

---

### `getModuleName()`

Returns the module name of the component.

**Returns:** `string`

---

### `getRootElement()`

Returns the root HTML element of the component.

**Returns:** `HTMLElement`

---

### `pause(fileData?, custom?)`

Pauses an in-progress chunked upload for the specified file(s).

| Parameter | Type | Description |
|-----------|------|-------------|
| `fileData` *(optional)* | `FileInfo \| FileInfo[]` | Files to pause |
| `custom` *(optional)* | `boolean` | Set `true` if using a custom UI |

**Returns:** `void`

---

### `refresh()`

Applies all pending property changes and re-renders the component.

**Returns:** `void`

---

### `remove()`

Removes an uploaded file from the server by calling the remove URL action. Pass an empty argument to clear the entire file list, or pass file data to remove a specific file.

**Returns:** `void`

---

### `removeEventListener(eventName, handler)`

Removes a handler from the given event listener.

| Parameter | Type | Description |
|-----------|------|-------------|
| `eventName` | `string` | The name of the event to remove |
| `handler` | `Function` | The function to remove |

**Returns:** `void`

---

### `resume(fileData?, custom?)`

Resumes a previously paused chunked upload.

| Parameter | Type | Description |
|-----------|------|-------------|
| `fileData` *(optional)* | `FileInfo \| FileInfo[]` | Files to resume |
| `custom` *(optional)* | `boolean` | Set `true` if using a custom UI |

**Returns:** `void`

---

### `retry(fileData?, fromcanceledStage?, custom?)`

Retries a canceled or failed file upload.

| Parameter | Type | Description |
|-----------|------|-------------|
| `fileData` *(optional)* | `FileInfo \| FileInfo[]` | Files to retry |
| `fromcanceledStage` *(optional)* | `boolean` | `true` to retry from canceled stage; `false` to retry from initial stage |
| `custom` *(optional)* | `boolean` | Specifies whether the uploader uses a custom file list |

**Returns:** `void`

---

### `sortFileList(filesData?)`

Sorts file data alphabetically by file name.

| Parameter | Type | Description |
|-----------|------|-------------|
| `filesData` *(optional)* | `FileList` | Files to sort |

**Returns:** `File[]`

---

### `upload(files?, custom?)`

Triggers the upload process manually by calling the save URL action. Pass an empty argument to process all queued files, or pass specific file data to upload a particular file.

| Parameter | Type | Description |
|-----------|------|-------------|
| `files` *(optional)* | `FileInfo \| FileInfo[]` | Files to upload |
| `custom` *(optional)* | `boolean` | Specifies whether the uploader uses a custom file list |

**Returns:** `void`

```typescript
// Upload all queued files
uploadObj.upload();

// Upload a specific file
const files = uploadObj.getFilesData();
uploadObj.upload(files[0]);
```

---

### `Inject(moduleList)` *(static)*

Dynamically injects the required modules into the component.

| Parameter | Type | Description |
|-----------|------|-------------|
| `moduleList` | `Function[]` | Modules to inject |

**Returns:** `void`

---

## Events

### `actionComplete` — `EmitType<ActionCompleteEventArgs>`

Triggers after **all** selected files have been processed (either uploaded successfully or failed).

```typescript
uploadObj.actionComplete = (args: ActionCompleteEventArgs) => {
  console.log('All files processed:', args.fileData);
};
```

---

### `beforeRemove` — `EmitType<BeforeRemoveEventArgs>`

Triggers before a remove action is sent to the server. Used to confirm removal or add custom data to the remove request.

```typescript
uploadObj.beforeRemove = (args: BeforeRemoveEventArgs) => {
  args.cancel = true; // Prevent removal
};
```

---

### `beforeUpload` — `EmitType<BeforeUploadEventArgs>`

Triggers before the upload process starts. Used to add additional parameters or headers to the upload request.

```typescript
uploadObj.beforeUpload = (args: BeforeUploadEventArgs) => {
  args.currentRequest = [{ Authorization: 'Bearer token' }];
};
```

---

### `canceling` — `EmitType<CancelEventArgs>`

Fires when a chunked file upload is canceled.

```typescript
uploadObj.canceling = (args: CancelEventArgs) => {
  console.log('Upload canceled for:', args.fileData.name);
};
```

---

### `change` — `EmitType<Object>`

Triggers when changes occur in the uploaded file list (by selecting or dropping files, or when a file is removed from the server).

| Event Argument | Description |
|----------------|-------------|
| `file` | File information successfully uploaded to or removed from the server |
| `name` | Name of the event |

```typescript
uploadObj.change = (args: any) => {
  console.log('File list changed:', args.file);
};
```

---

### `chunkFailure` — `EmitType<Object>`

Fires when a chunk file fails to upload.

| Event Argument | Description |
|----------------|-------------|
| `chunkIndex` | Current chunk index |
| `chunkSize` | Size of the chunk file |
| `file` | File information being uploaded |
| `name` | Name of the event |
| `totalChunk` | Total number of chunks |
| `cancel` | Set `true` to prevent triggering the failure event |

```typescript
uploadObj.chunkFailure = (args: any) => {
  console.log('Chunk failed:', args.chunkIndex, '/', args.totalChunk);
};
```

---

### `chunkSuccess` — `EmitType<Object>`

Fires when a chunk uploads successfully.

| Event Argument | Description |
|----------------|-------------|
| `chunkIndex` | Current chunk index |
| `chunkSize` | Size of the chunk file |
| `file` | File information being uploaded |
| `name` | Name of the event |

```typescript
uploadObj.chunkSuccess = (args: any) => {
  console.log('Chunk uploaded:', args.chunkIndex);
};
```

---

### `chunkUploading` — `EmitType<UploadingEventArgs>`

Fires when each individual chunk upload process starts. Used to add additional parameters to chunk upload requests.

```typescript
uploadObj.chunkUploading = (args: UploadingEventArgs) => {
  args.customFormData = [{ chunkId: args.currentChunkIndex }];
};
```

---

### `clearing` — `EmitType<ClearingEventArgs>`

Triggers before clearing items in the file list when the "Clear" button is clicked.

```typescript
uploadObj.clearing = (args: ClearingEventArgs) => {
  args.cancel = true; // Prevent clearing
};
```

---

### `created` — `EmitType<Object>`

Triggers when the component is created and rendered.

```typescript
uploadObj.created = () => {
  console.log('Uploader component created');
};
```

---

### `failure` — `EmitType<Object>`

Triggers when the AJAX request fails during file upload or removal.

| Event Argument | Description |
|----------------|-------------|
| `event` | Ajax progress event arguments |
| `file` | File information that failed to upload/remove |
| `name` | Name of the event |
| `operation` | Indicates the failed operation: `'upload'` or `'remove'` |

```typescript
uploadObj.failure = (args: any) => {
  console.log('Operation failed:', args.operation, args.file.name);
};
```

---

### `fileListRendering` — `EmitType<FileListRenderingEventArgs>`

Triggers before rendering each file item in the file list. Used to customize the structure of individual file items.

```typescript
uploadObj.fileListRendering = (args: FileListRenderingEventArgs) => {
  if (args.isPreload) {
    args.element.classList.add('preloaded-file');
  }
};
```

---

### `pausing` — `EmitType<PauseResumeEventArgs>`

Fires when a chunked file upload is paused.

```typescript
uploadObj.pausing = (args: PauseResumeEventArgs) => {
  console.log('Paused chunk:', args.chunkIndex, 'of', args.chunkCount);
};
```

---

### `progress` — `EmitType<Object>`

Triggers while uploading a file to the server (via AJAX), providing real-time progress information.

| Event Argument | Description |
|----------------|-------------|
| `event` | Ajax progress event arguments |
| `file` | File information currently being uploaded |
| `name` | Name of the event |

```typescript
uploadObj.progress = (args: any) => {
  const percent = Math.round((args.event.loaded / args.event.total) * 100);
  console.log(`Upload progress: ${percent}%`);
};
```

---

### `removing` — `EmitType<RemovingEventArgs>`

Triggers when a file is being removed. Used to confirm removal or add custom data to the remove request.

```typescript
uploadObj.removing = (args: RemovingEventArgs) => {
  args.customFormData = [{ userId: '123' }];
};
```

---

### `rendering` — `EmitType<RenderingEventArgs>` *(Deprecated)*

> **Deprecated.** Use [`fileListRendering`](#filelistrendering--emittypefilelistrenderingeventargs) instead.

Triggers before rendering each file item from the file list in a page.

---

### `resuming` — `EmitType<PauseResumeEventArgs>`

Fires when a paused chunked upload is resumed.

```typescript
uploadObj.resuming = (args: PauseResumeEventArgs) => {
  console.log('Resumed file:', args.file.name);
};
```

---

### `selected` — `EmitType<SelectedEventArgs>`

Triggers after files are selected or dropped, adding them to the upload queue.

```typescript
uploadObj.selected = (args: SelectedEventArgs) => {
  console.log('Files selected:', args.filesData.length);
  // Prevent specific files from being added
  args.filesData.forEach(file => {
    if (file.size > 10000000) {
      args.cancel = true;
    }
  });
};
```

---

### `success` — `EmitType<Object>`

Triggers when the AJAX request succeeds for a file upload or removal.

| Event Argument | Description |
|----------------|-------------|
| `event` | Ajax progress event arguments |
| `file` | File information that was uploaded/removed |
| `name` | Name of the event |
| `operation` | Indicates the successful operation: `'upload'` or `'remove'` |

```typescript
uploadObj.success = (args: any) => {
  console.log('Success:', args.operation, args.file.name);
};
```

---

### `uploading` — `EmitType<UploadingEventArgs>`

Triggers when the upload process starts for a file. Used to add additional parameters or headers to the upload request.

```typescript
uploadObj.uploading = (args: UploadingEventArgs) => {
  args.currentRequest.setRequestHeader('Authorization', 'Bearer token');
  args.customFormData = [{ userId: '42' }];
};
```

---

## Supporting Interfaces & Types

### `AsyncSettingsModel`

Interface for configuring asynchronous upload settings.

| Property | Type | Description |
|----------|------|-------------|
| `saveUrl` | `string` | URL of the save action endpoint (POST). Must match the input name used to render the component. Required for upload. |
| `removeUrl` | `string` | URL of the remove action endpoint (POST). Must define a `removeFileNames` attribute to identify files. Optional. |
| `chunkSize` | `number` | Chunk size in bytes for large file upload. When specified, enables chunk upload mode automatically. |
| `retryCount` | `number` | Number of times the uploader retries a failed upload. Default is `3`. Must be set to prevent infinite looping. |
| `retryAfterDelay` | `number` | Delay in milliseconds before an automatic retry occurs after failure. |

```typescript
asyncSettings: {
  saveUrl: 'https://api.example.com/upload',
  removeUrl: 'https://api.example.com/remove',
  chunkSize: 5242880,    // 5 MB chunks
  retryCount: 3,
  retryAfterDelay: 500
}
```

---

### `ButtonsPropsModel`

Interface for customizing uploader button labels.

| Property | Type | Description |
|----------|------|-------------|
| `browse` | `string \| HTMLElement` | Text or HTML content for the Browse button |
| `clear` | `string \| HTMLElement` | Text or HTML content for the Clear button |
| `upload` | `string \| HTMLElement` | Text or HTML content for the Upload button |

```typescript
buttons: {
  browse: '<span class="e-icons e-folder"></span> Choose Files',
  clear: 'Remove All',
  upload: 'Start Upload'
}
```

---

### `FilesPropModel`

Interface for specifying preloaded files.

| Property | Type | Description |
|----------|------|-------------|
| `name` | `string` | Name of the file |
| `size` | `number` | Size of the file in bytes |
| `type` | `string` | File extension/type (e.g., `'.png'`, `'.pdf'`) |

---

### `FileInfo`

Represents the details of a file in the uploader.

| Property | Type | Description |
|----------|------|-------------|
| `name` | `string` | The upload file name |
| `size` | `number` | File size in bytes |
| `type` | `string` | MIME type of the file as a string. Returns empty string if undetermined. |
| `status` | `string` | Current status message of the file |
| `statusCode` | `string` | Current state: `'Failed'`, `'Canceled'`, `'Selected'`, `'Uploaded'`, or `'Uploading'` |
| `rawFile` | `string \| Blob` | Raw file data |
| `fileSource` | `string` | Indicates where the file was selected from |
| `id` | `string` | Unique upload file name ID |
| `input` | `HTMLInputElement` | Input element mapped to the file list item |
| `list` | `HTMLElement` | The file list item (`<li>`) element |
| `validationMessages` | [`ValidationMessages`](#validationmessages) | List of validation errors (if any) |

---

### `ValidationMessages`

Represents file validation error messages.

| Property | Type | Description |
|----------|------|-------------|
| `maxSize` | `string` | Message shown when selected file exceeds `maxFileSize` |
| `minSize` | `string` | Message shown when selected file is below `minFileSize` |

---

### `DropEffect` (Enum)

Specifies the visual effect during drag-and-drop operations.

| Value | Description |
|-------|-------------|
| `'Copy'` | Indicates the dragged file will be copied |
| `'Move'` | Indicates the dragged file will be moved |
| `'Link'` | Indicates a link to the dragged file will be created |
| `'None'` | No drop effect |
| `'Default'` | Uses the browser's default drag operation effect |

---

## Event Argument Interfaces

### `SelectedEventArgs`

Arguments passed to the [`selected`](#selected--emittypeselectedeventargs) event.

| Property | Type | Description |
|----------|------|-------------|
| `cancel` | `boolean` | Set `true` to prevent the current action |
| `currentRequest` | `{ [key: string]: string }[]` | Set request headers on the XMLHttpRequest instance |
| `customFormData` | `{ [key: string]: Object }[]` | Additional data (key-value pairs) submitted with the upload action |
| `event` | `MouseEvent \| TouchEvent \| DragEvent \| ClipboardEvent` | The original event arguments |
| `filesData` | [`FileInfo[]`](#fileinfo) | List of selected files |
| `isCanceled` | `boolean` | Specifies whether file selection was canceled |
| `isModified` | `boolean` | Determines whether the file list should regenerate based on modified data |
| `modifiedFilesData` | [`FileInfo[]`](#fileinfo) | Modified files data to regenerate file items (depends on `isModified`) |
| `progressInterval` | `string` | Step value for the progress bar |

---

### `UploadingEventArgs`

Arguments passed to the [`uploading`](#uploading--emittypeuploadingeventargs) and [`chunkUploading`](#chunkuploading--emittypeuploadingeventargs) events.

| Property | Type | Description |
|----------|------|-------------|
| `cancel` | `boolean` | Set `true` to prevent the current action |
| `chunkSize` | `number` | Chunk size in bytes (available when chunk upload is enabled) |
| `currentChunkIndex` | `number` | Index of the current chunk (available when chunk upload is enabled) |
| `currentRequest` | `XMLHttpRequest` | The XMLHttpRequest instance associated with the upload action |
| `customFormData` | `{ [key: string]: Object }[]` | Additional data (key-value pairs) submitted with the upload action |
| `fileData` | [`FileInfo`](#fileinfo) | Details of the file being uploaded |

---

### `RemovingEventArgs`

Arguments passed to the [`removing`](#removing--emittyperemoveingeventargs) event.

| Property | Type | Description |
|----------|------|-------------|
| `cancel` | `boolean` | Set `true` to prevent the current action |
| `currentRequest` | `XMLHttpRequest` | The XMLHttpRequest instance associated with the remove action |
| `customFormData` | `{ [key: string]: Object }[]` | Additional data (key-value pairs) submitted with the remove action |
| `event` | `MouseEvent \| TouchEvent \| KeyboardEventArgs` | The original event arguments |
| `filesData` | [`FileInfo[]`](#fileinfo) | List of files to be removed |
| `postRawFile` | `boolean` | Set `true` to send the raw file to the server; `false` to send only the file name |

---

### `BeforeRemoveEventArgs`

Arguments passed to the [`beforeRemove`](#beforeremove--emittypebeforeremoveeventargs) event.

| Property | Type | Description |
|----------|------|-------------|
| `cancel` | `boolean` | Set `true` to prevent the current action |
| `currentRequest` | `{ [key: string]: string }[]` | XMLHttpRequest instance associated with the remove action |
| `customFormData` | `{ [key: string]: Object }[]` | Additional data (key-value pairs) submitted with the remove action |

---

### `BeforeUploadEventArgs`

Arguments passed to the [`beforeUpload`](#beforeupload--emittypebeforeuploadeventargs) event.

| Property | Type | Description |
|----------|------|-------------|
| `cancel` | `boolean` | Set `true` to prevent the current action |
| `currentRequest` | `{ [key: string]: string }[]` | XMLHttpRequest instance associated with the upload action |
| `customFormData` | `{ [key: string]: Object }[]` | Additional data (key-value pairs) submitted with the upload action |

---

### `ActionCompleteEventArgs`

Arguments passed to the [`actionComplete`](#actioncomplete--emittypeactioncompleteeventargs) event.

| Property | Type | Description |
|----------|------|-------------|
| `fileData` | [`FileInfo[]`](#fileinfo) | Details of all selected files after the batch operation completes |

---

### `CancelEventArgs`

Arguments passed to the [`canceling`](#canceling--emittypecanceleventargs) event.

| Property | Type | Description |
|----------|------|-------------|
| `cancel` | `boolean` | Set `true` to prevent the current action |
| `currentRequest` | `{ [key: string]: string }[]` | Additional headers submitted when the upload action is canceled |
| `customFormData` | `{ [key: string]: Object }[]` | Additional data submitted when the upload action is canceled |
| `event` | `ProgressEventInit` | The original event arguments |
| `fileData` | [`FileInfo`](#fileinfo) | Details of the file being canceled |

---

### `ClearingEventArgs`

Arguments passed to the [`clearing`](#clearing--emittypeclearingeventargs) event.

| Property | Type | Description |
|----------|------|-------------|
| `cancel` | `boolean` | Set `true` to prevent the current action |
| `filesData` | [`FileInfo[]`](#fileinfo) | List of files that will be cleared from the file list |

---

### `FileListRenderingEventArgs`

Arguments passed to the [`fileListRendering`](#filelistrendering--emittypefilelistrenderingeventargs) event.

| Property | Type | Description |
|----------|------|-------------|
| `element` | `HTMLElement` | The current file item element being rendered |
| `fileInfo` | [`FileInfo`](#fileinfo) | The current rendering file item data as a File object |
| `index` | `number` | Index of the file item in the file list |
| `isPreload` | `boolean` | Returns `true` if the file is a preloaded file |

---

### `RenderingEventArgs` *(Deprecated)*

> **Deprecated.** Use [`FileListRenderingEventArgs`](#filelistrenderingeventargs) instead.

Arguments passed to the deprecated [`rendering`](#rendering--emittyperendering-eventargs-deprecated) event.

| Property | Type | Description |
|----------|------|-------------|
| `element` | `HTMLElement` | The current file item element |
| `fileInfo` | [`FileInfo`](#fileinfo) | The current rendering file item data as a File object |
| `index` | `number` | Index of the file item in the file list |
| `isPreload` | `boolean` | Returns `true` if the file is preloaded |

---

### `PauseResumeEventArgs`

Arguments passed to the [`pausing`](#pausing--emittypepauseresumeeventargs) and [`resuming`](#resuming--emittypepauseresumeeventargs) events.

| Property | Type | Description |
|----------|------|-------------|
| `chunkCount` | `number` | Total number of chunks for the file |
| `chunkIndex` | `number` | Index of the chunk that was paused or resumed |
| `chunkSize` | `number` | Chunk size value in bytes |
| `event` | `Event` | The original event arguments |
| `file` | [`FileInfo`](#fileinfo) | File data that was paused or resumed |
