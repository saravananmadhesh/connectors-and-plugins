# API Reference — Syncfusion Angular Uploader

**Source:** https://ej2.syncfusion.com/angular/documentation/api/uploader/index-default  
**Component selector:** `<ejs-uploader></ejs-uploader>`  
**Module:** `UploaderModule` from `@syncfusion/ej2-angular-inputs`

## Table of Contents
- [Properties](#properties)
- [AsyncSettingsModel](#asyncsettingsmodel)
- [ButtonsPropsModel](#buttonspropsmodel)
- [FilesPropModel](#filespropmodel)
- [Methods](#methods)
- [Events](#events)
- [Event Argument Types](#event-argument-types)

---

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `allowedExtensions` | `string` | `''` | Comma-separated file extensions allowed for upload. Example: `".jpg,.png,.pdf"` |
| `asyncSettings` | `AsyncSettingsModel` | `{ saveUrl: '', removeUrl: '' }` | Server save and remove URLs, plus chunk upload configuration |
| `autoUpload` | `boolean` | `true` | If `true`, files upload immediately on selection. If `false`, Upload/Clear buttons are shown |
| `buttons` | `ButtonsPropsModel` | `{ browse: 'Browse…', clear: 'Clear', upload: 'Upload' }` | Customize browse, clear, and upload button text or HTML elements |
| `cssClass` | `string` | `''` | Additional CSS class name(s) appended to the root element |
| `directoryUpload` | `boolean` | `false` | If `true`, enables folder/directory selection and upload. Only folders can be selected when enabled |
| `dropArea` | `string \| HTMLElement` | `null` | External element (or CSS selector string) to use as the drag-and-drop target |
| `dropEffect` | `DropEffect` | `'Default'` | Drag operation effect. Values: `'Default'`, `'Copy'`, `'Move'`, `'Link'`, `'None'` |
| `enableHtmlSanitizer` | `boolean` | `true` | If `true`, strips XSS/cross-site scripting code from filenames |
| `enablePersistence` | `boolean` | `false` | If `true`, persists component state between page reloads |
| `enableRtl` | `boolean` | `false` | If `true`, renders the component in right-to-left direction |
| `enabled` | `boolean` | `true` | If `false`, the component is disabled and does not respond to interactions |
| `files` | `FilesPropModel[]` | `[]` | Array of preloaded files already on the server. Each entry requires `name`, `size`, and `type` |
| `htmlAttributes` | `{ [key: string]: string }` | `{}` | Additional HTML attributes to set on the input element (e.g., `name`, `accept`, `required`) |
| `locale` | `string` | `''` | Locale identifier for localization. Overrides global culture. Default: `'en-US'` |
| `maxFileSize` | `number` | `30000000` | Maximum allowed file size in bytes (~28.6 MB). Files exceeding this are rejected |
| `minFileSize` | `number` | `0` | Minimum required file size in bytes. Files below this size are rejected |
| `multiple` | `boolean` | `true` | If `true`, allows multiple file selection. If `false`, only one file can be selected at a time |
| `sequentialUpload` | `boolean` | `false` | If `true`, uploads files one at a time in sequence. Default: parallel upload |
| `showFileList` | `boolean` | `true` | If `false`, hides the default file list. Use with custom UI templates |
| `template` | `any` | `null` | HTML string to customize the appearance of each file item in the list |

---

## AsyncSettingsModel

Configuration object for `asyncSettings` property:

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `saveUrl` | `string` | `''` | Server endpoint URL for saving (uploading) files via POST request |
| `removeUrl` | `string` | `''` | Server endpoint URL for removing files from the server |
| `chunkSize` | `number` | `0` | Chunk size in bytes. When set > 0, enables chunk upload for files larger than this value |
| `retryCount` | `number` | `3` | Number of retry attempts when a chunk upload fails |
| `retryAfterDelay` | `number` | `500` | Milliseconds to wait before retrying a failed chunk upload |

**Example:**
```typescript
public asyncSettings = {
  saveUrl: 'https://your-api/upload/save',
  removeUrl: 'https://your-api/upload/remove',
  chunkSize: 500000,     // 500 KB chunks
  retryCount: 5,         // Retry up to 5 times
  retryAfterDelay: 2000  // Wait 2 seconds before retry
};
```

---

## ButtonsPropsModel

Configuration object for the `buttons` property:

| Field | Type | Description |
|-------|------|-------------|
| `browse` | `string \| HTMLElement` | Label or HTML element for the browse button |
| `clear` | `string \| HTMLElement` | Label or HTML element for the clear all button |
| `upload` | `string \| HTMLElement` | Label or HTML element for the upload button |

**Example:**
```typescript
public buttons = {
  browse: 'Choose Files',
  clear: 'Remove All',
  upload: 'Send to Server'
};
```

---

## FilesPropModel

Structure for entries in the `files` property (preloaded files):

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | `string` | ✅ | File name (without path) |
| `size` | `number` | ✅ | File size in bytes |
| `type` | `string` | ✅ | File extension including dot (e.g., `'.pdf'`) |

**Example:**
```typescript
public preloadedFiles = [
  { name: 'report', size: 500000, type: '.pdf' },
  { name: 'photo', size: 200000, type: '.jpg' }
];
```

---

## Methods

### `upload(files?, custom?)`
Programmatically start uploading. No argument uploads all queued files. Passing specific files uploads only those.

| Parameter | Type | Optional | Description |
|-----------|------|----------|-------------|
| `files` | `FileInfo \| FileInfo[]` | ✅ | Specific file(s) to upload. If omitted, all queued files upload |
| `custom` | `boolean` | ✅ | Set `true` when using a custom file list UI |

```typescript
// Upload all
this.uploader.upload();

// Upload specific file
this.uploader.upload(filesData[0]);

// Upload with custom UI
this.uploader.upload(filesData[0], true);
```

---

### `remove(fileData?, custom?, postRawFile?)`
Remove a file from the list or trigger the server remove endpoint.

| Parameter | Type | Optional | Description |
|-----------|------|----------|-------------|
| `fileData` | `FileInfo \| FileInfo[]` | ✅ | File(s) to remove. If omitted, clears the entire list |
| `custom` | `boolean` | ✅ | Set `true` when using a custom file list UI |
| `postRawFile` | `boolean` | ✅ | If `false`, sends only the filename to the remove endpoint |

```typescript
this.uploader.remove(fileInfo);
this.uploader.remove(fileInfo, true);         // Custom UI
this.uploader.remove(fileInfo, false, false); // Send filename only
```

---

### `cancel(fileData?)`
Cancel an in-progress chunk upload. Partially uploaded chunks are removed from the server.

| Parameter | Type | Optional | Description |
|-----------|------|----------|-------------|
| `fileData` | `FileInfo[]` | ✅ | Files to cancel. If omitted, cancels all in-progress uploads |

```typescript
this.uploader.cancel(this.uploader.getFilesData());
```

---

### `pause(fileData?, custom?)`
Pause an in-progress chunk upload.

| Parameter | Type | Optional | Description |
|-----------|------|----------|-------------|
| `fileData` | `FileInfo \| FileInfo[]` | ✅ | File(s) to pause |
| `custom` | `boolean` | ✅ | Set `true` when using custom UI |

```typescript
this.uploader.pause(filesData[0]);
```

---

### `resume(fileData?, custom?)`
Resume a paused chunk upload.

| Parameter | Type | Optional | Description |
|-----------|------|----------|-------------|
| `fileData` | `FileInfo \| FileInfo[]` | ✅ | File(s) to resume |
| `custom` | `boolean` | ✅ | Set `true` when using custom UI |

```typescript
this.uploader.resume(filesData[0]);
```

---

### `retry(fileData?, fromCanceledStage?, custom?)`
Retry a failed or canceled upload.

| Parameter | Type | Optional | Description |
|-----------|------|----------|-------------|
| `fileData` | `FileInfo \| FileInfo[]` | ✅ | File(s) to retry |
| `fromCanceledStage` | `boolean` | ✅ | If `true`, resumes from failure point (chunk). If `false`, restarts from beginning |
| `custom` | `boolean` | ✅ | Specifies whether uploader uses custom file list |

```typescript
// Restart from beginning
this.uploader.retry(filesData[0]);

// Resume from canceled stage (chunk upload)
this.uploader.retry(filesData[0], true);
```

---

### `clearAll()`
Remove all file entries from the list.

```typescript
this.uploader.clearAll();
```

---

### `getFilesData(index?)`
Get file data for files shown in the file list. Returns `FileInfo[]`.

| Parameter | Type | Optional | Description |
|-----------|------|----------|-------------|
| `index` | `number` | ✅ | Index of a specific file list item (li). If omitted, returns all |

```typescript
const allFiles: FileInfo[] = this.uploader.getFilesData();
const firstFile: FileInfo[] = this.uploader.getFilesData(0);
```

---

### `createFileList(fileData)`
Programmatically create file list entries without file selection UI.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `fileData` | `FileInfo[]` | ✅ | File data to create list items for |

```typescript
this.uploader.createFileList(filesData);
```

---

### `sortFileList(filesData?)`
Sort file list items alphabetically by name. Returns `File[]`.

| Parameter | Type | Optional | Description |
|-----------|------|----------|-------------|
| `filesData` | `FileList` | ✅ | Files to sort |

```typescript
const sorted = this.uploader.sortFileList();
```

---

### `bytesToSize(bytes)`
Convert a byte count to a human-readable size string (KB or MB). Returns `string`.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `bytes` | `number` | ✅ | File size in bytes |

```typescript
const sizeStr = this.uploader.bytesToSize(1048576); // Returns "1 MB"
const sizeStr2 = this.uploader.bytesToSize(2048);   // Returns "2 KB"
```

---

### `getModuleName()`
Returns the module name of the component as a string. Returns `string`.

---

### `destroy()`
Destroys the component: removes from DOM, detaches event handlers, removes attributes and classes.

```typescript
this.uploader.destroy();
```

---

## Events

| Event | Type | Description |
|-------|------|-------------|
| `(selected)` | `EmitType<SelectedEventArgs>` | Fires after files are selected or dropped and added to the upload queue |
| `(uploading)` | `EmitType<UploadingEventArgs>` | Fires when an upload process starts. Use to add headers or custom form data |
| `(chunkUploading)` | `EmitType<UploadingEventArgs>` | Fires before each chunk is sent. Use to add headers or custom data per chunk |
| `(beforeUpload)` | `EmitType<BeforeUploadEventArgs>` | Fires before the upload process starts. Used to add additional parameters |
| `(beforeRemove)` | `EmitType<BeforeRemoveEventArgs>` | Fires before a remove request. Use to show confirmation or cancel removal |
| `(removing)` | `EmitType<RemovingEventArgs>` | Fires when the remove request is about to be sent to the server |
| `(success)` | `EmitType<Object>` | Fires when upload OR remove operation succeeds. Check `args.operation` for context |
| `(failure)` | `EmitType<Object>` | Fires when upload OR remove operation fails |
| `(progress)` | `EmitType<Object>` | Fires during upload with progress information (loaded bytes, total bytes) |
| `(chunkSuccess)` | `EmitType<Object>` | Fires when each chunk uploads successfully |
| `(chunkFailure)` | `EmitType<Object>` | Fires when a chunk fails to upload |
| `(pausing)` | `EmitType<PauseResumeEventArgs>` | Fires when a chunk upload is paused |
| `(resuming)` | `EmitType<PauseResumeEventArgs>` | Fires when a paused chunk upload is resumed |
| `(canceling)` | `EmitType<CancelEventArgs>` | Fires when an upload is canceled |
| `(clearing)` | `EmitType<ClearingEventArgs>` | Fires before clearing items when the "Clear" button is clicked |
| `(change)` | `EmitType<Object>` | Fires when file list changes (file added or removed successfully) |
| `(fileListRendering)` | `EmitType<FileListRenderingEventArgs>` | Fires before each file item renders. Use to customize file item structure |
| `(rendering)` | `EmitType<RenderingEventArgs>` | **DEPRECATED** — Use `(fileListRendering)` instead |
| `(actionComplete)` | `EmitType<ActionCompleteEventArgs>` | Fires after ALL selected files have been processed (success or failure) |
| `(created)` | `EmitType<Object>` | Fires when the component is created and rendered |

---

## Event Argument Types

### SelectedEventArgs
Fires when files are selected or dropped.

| Field | Type | Description |
|-------|------|-------------|
| `filesData` | `FileInfo[]` | Array of selected/dropped file data objects |
| `modifiedFilesData` | `FileInfo[]` | Set this to override the files that get added to the queue |
| `isModified` | `boolean` | Set to `true` after modifying `modifiedFilesData` |
| `cancel` | `boolean` | Set to `true` to cancel the selection |
| `currentFiles` | `FileList` | The native FileList from the browser |

---

### UploadingEventArgs
Fires before an upload request (or chunk request) is sent.

| Field | Type | Description |
|-------|------|-------------|
| `fileData` | `FileInfo` | Information about the file being uploaded |
| `customFormData` | `object[]` | Array of key-value pairs to include in the multipart form data |
| `currentRequest` | `XMLHttpRequest` | The AJAX request object. Call `setRequestHeader()` to add headers |
| `cancel` | `boolean` | Set to `true` to cancel this upload |
| `chunkSize` | `number` | Size of the chunk (available in chunk upload mode) |

---

### RemovingEventArgs
Fires before a file remove request is sent.

| Field | Type | Description |
|-------|------|-------------|
| `filesData` | `FileInfo[]` | File data objects being removed |
| `postRawFile` | `boolean` | If `false`, sends only the filename to the remove endpoint. Default: `true` |
| `currentRequest` | `XMLHttpRequest` | The AJAX request object for adding headers |
| `cancel` | `boolean` | Set to `true` to cancel the remove operation |
| `customFormData` | `object[]` | Additional data to send with the remove request |

---

### BeforeRemoveEventArgs
Fires before confirming removal.

| Field | Type | Description |
|-------|------|-------------|
| `filesData` | `FileInfo[]` | Files about to be removed |
| `cancel` | `boolean` | Set to `true` to prevent the removal |

---

### Success Event Args (Object)
Fires when upload or remove succeeds.

| Field | Type | Description |
|-------|------|-------------|
| `file` | `FileInfo` | Information about the successfully uploaded/removed file |
| `operation` | `string` | Either `'upload'` or `'remove'` |
| `event` | `Event` | The underlying AJAX progress/load event |
| `e` | `Event` | Alias for `event` — use `args.e.target.responseText` to read server response |
| `name` | `string` | Event name |

---

### Failure Event Args (Object)
Fires when upload or remove fails.

| Field | Type | Description |
|-------|------|-------------|
| `file` | `FileInfo` | File that failed |
| `operation` | `string` | Either `'upload'` or `'remove'` |
| `event` | `Event` | The underlying AJAX error event |
| `name` | `string` | Event name |

---

### Progress Event Args (Object)
Fires during upload with progress data.

| Field | Type | Description |
|-------|------|-------------|
| `file` | `FileInfo` | File being uploaded |
| `event` | `ProgressEvent` | AJAX progress event with `loaded` and `total` bytes |
| `name` | `string` | Event name |

---

### ChunkSuccess / ChunkFailure Event Args (Object)

| Field | Type | Description |
|-------|------|-------------|
| `chunkIndex` | `number` | Zero-based index of the current chunk |
| `totalChunk` | `number` | Total number of chunks for the file |
| `chunkSize` | `number` | Size of this chunk in bytes |
| `file` | `FileInfo` | File being chunked |
| `name` | `string` | Event name |
| `cancel` | `boolean` | *(chunkFailure only)* Set `true` to prevent the `failure` event from firing |

---

### PauseResumeEventArgs
Fires on pause or resume actions.

| Field | Type | Description |
|-------|------|-------------|
| `file` | `FileInfo` | File being paused/resumed |
| `chunkIndex` | `number` | Current chunk index at time of pause/resume |
| `chunkCount` | `number` | Total number of chunks |
| `event` | `Event` | The underlying event |

---

### CancelEventArgs
Fires when upload is canceled.

| Field | Type | Description |
|-------|------|-------------|
| `fileData` | `FileInfo` | The canceled file |
| `event` | `Event` | The underlying event |

---

### ClearingEventArgs
Fires before the clear all action.

| Field | Type | Description |
|-------|------|-------------|
| `cancel` | `boolean` | Set to `true` to prevent clearing |
| `filesData` | `FileInfo[]` | Files that would be cleared |

---

### FileListRenderingEventArgs
Fires before each file item renders in the list.

| Field | Type | Description |
|-------|------|-------------|
| `element` | `HTMLElement` | The file list item element being rendered |
| `fileInfo` | `FileInfo` | File data for the item |

---

### ActionCompleteEventArgs
Fires after all files have been processed.

| Field | Type | Description |
|-------|------|-------------|
| `fileData` | `FileInfo[]` | All processed file data objects |

---

### FileInfo Interface
Represents information about a file in the upload queue.

| Field | Type | Description |
|-------|------|-------------|
| `name` | `string` | File name |
| `rawFile` | `File \| string` | Native File object or data URL |
| `size` | `number` | File size in bytes |
| `status` | `string` | Current status message (e.g., `'Ready to Upload'`, `'File uploaded successfully'`) |
| `statusCode` | `string` | Numeric status code as string |
| `type` | `string` | File extension (e.g., `'.pdf'`) |
| `validationMessage` | `string` | Validation error message if file fails validation |
| `uploadedSize` | `number` | Bytes uploaded so far (available during progress) |
| `id` | `string` | Unique identifier for the file |

---

## Complete Usage Example

```typescript
import { Component, ViewChild, OnInit } from '@angular/core';
import { UploaderModule, UploaderComponent } from '@syncfusion/ej2-angular-inputs';
import {
  SelectedEventArgs,
  UploadingEventArgs,
  RemovingEventArgs,
  BeforeRemoveEventArgs
} from '@syncfusion/ej2-angular-inputs';
import { FileInfo } from '@syncfusion/ej2-inputs';
import { L10n } from '@syncfusion/ej2-base';

@Component({
  imports: [UploaderModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-uploader
      #uploader
      [asyncSettings]="asyncSettings"
      [autoUpload]="false"
      [multiple]="true"
      [sequentialUpload]="false"
      allowedExtensions=".jpg,.png,.pdf"
      [minFileSize]="1024"
      [maxFileSize]="10485760"
      [buttons]="buttons"
      [enableRtl]="false"
      [enableHtmlSanitizer]="true"
      cssClass="custom-upload"
      (selected)="onSelected($event)"
      (uploading)="onUploading($event)"
      (beforeRemove)="onBeforeRemove($event)"
      (removing)="onRemoving($event)"
      (success)="onSuccess($event)"
      (failure)="onFailure($event)"
      (progress)="onProgress($event)"
      (clearing)="onClearing($event)"
      (actionComplete)="onActionComplete($event)"
      (created)="onCreated()">
    </ejs-uploader>
  `
})
export class AppComponent implements OnInit {
  @ViewChild('uploader') uploader!: UploaderComponent;

  public asyncSettings = {
    saveUrl: 'https://your-api/upload/save',
    removeUrl: 'https://your-api/upload/remove'
  };

  public buttons = { browse: 'Choose', clear: 'Clear', upload: 'Upload' };

  ngOnInit(): void {
    L10n.load({ 'en-US': { uploader: { Browse: 'Choose Files' } } });
  }

  onSelected(args: SelectedEventArgs): void {
    console.log('Files selected:', args.filesData.length);
  }

  onUploading(args: UploadingEventArgs): void {
    args.currentRequest.setRequestHeader('Authorization', 'Bearer token');
    args.customFormData = [{ category: 'documents' }];
  }

  onBeforeRemove(args: BeforeRemoveEventArgs): void {
    if (!confirm(`Remove ${args.filesData[0]?.name}?`)) args.cancel = true;
  }

  onRemoving(args: RemovingEventArgs): void {
    args.postRawFile = false;
  }

  onSuccess(args: any): void {
    console.log(`${args.operation} success:`, args.file.name);
  }

  onFailure(args: any): void {
    console.error(`${args.operation} failed:`, args.file.name);
  }

  onProgress(args: any): void {
    const pct = Math.round((args.event.loaded / args.event.total) * 100);
    console.log(`Progress: ${pct}%`);
  }

  onClearing(args: any): void {
    console.log('Clearing', args.filesData?.length, 'files');
  }

  onActionComplete(args: any): void {
    const size = this.uploader.bytesToSize(
      args.fileData.reduce((s: number, f: FileInfo) => s + (f.size || 0), 0)
    );
    console.log('All done. Total:', size);
  }

  onCreated(): void {
    console.log('Uploader ready');
  }
}
```
