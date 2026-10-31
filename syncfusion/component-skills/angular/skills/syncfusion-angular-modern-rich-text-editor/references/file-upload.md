# File Upload

## Table of Contents
- [Overview](#overview)
- [Event arguments](#event-arguments)
  - [BeforeFileDropEventArgs](#beforefiledropeventargs)
  - [BeforeFileUploadEventArgs](#beforefileuploadeventargs)
  - [FileRemovingEventArgs](#fileremovingeventargs)
  - [FileSelectedEventArgs](#fileselectedeventargs)
  - [FileUploadingEventArgs](#fileuploadingeventargs)
  - [FileUploadSuccessEventArgs](#fileuploadsuccesseventargs)
  - [FileUploadFailedEventArgs](#fileuploadfailedeventargs)
- [See also](#see-also)

---

## Overview

This reference consolidates the event-argument types raised across the file upload lifecycle in the Modern Rich Text Editor: file drop, file selection, upload-in-progress, upload success, upload failure, and file removal. For the configuration surface (`imageSettings`, `imageSettings.uploadUrl`, `imageSettings.removeUrl`, `saveFormat`), see [Image Handling](image.md). For examples of subscribing to upload events on `<ejs-richtexteditor-ui>`, see the **Remote image upload** section of [Image Handling](image.md#remote-image-upload).

## Event arguments

### BeforeFileDropEventArgs

Source: <https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/beforefiledropeventargs>

Event args for `RichTextEditor.beforeFileDrop`. Raised when one or more files are dropped (or pasted) onto the editable area, before the image module routes them through the typed command pipeline.

Set `args.cancel = true` to keep the document untouched.

#### Properties

- `cancel: boolean` — Cancels the drop pipeline.
- `files: FileList` — Files dropped onto or pasted into the editor.
- `source: string` — The editor feature the sub-component belongs to. Supplied by the caller when the sub-component is created. Undefined for generic sub-components that are not tied to a specific feature.

---

### BeforeFileUploadEventArgs

Source: <https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/beforefileuploadeventargs>

Event args for `RichTextEditor.beforeFileUpload`. Extends the ej2 `BeforeUploadEventArgs` with the `source` field that identifies the editor feature the upload is for (e.g. `'Image'`).

#### Properties

- `cancel: boolean` — Defines whether the current action can be prevented.
- `currentRequest: { [key: string]: string }[]` — Returns the XMLHttpRequest instance that is associated with upload action.
- `customFormData: { [key: string]: Object }[]` — Defines the additional data in key and value pair format that will be submitted to the upload action.
- `source: string` — The editor feature the sub-component belongs to. Supplied by the caller when the sub-component is created. Undefined for generic sub-components that are not tied to a specific feature.

---

### FileRemovingEventArgs

Source: <https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/fileremovingeventargs>

Event args for `RichTextEditor.fileRemoving`. Raised before a previously-uploaded image is removed (client-side `URL.revokeObjectURL` for `saveFormat: 'Blob'`, or before the `removeUrl` POST is sent for server-side removal).

Set `args.cancel = true` to keep the image in place; both the `Blob` revocation and the `removeUrl` POST will be skipped.

#### Properties

- `cancel: boolean` — Cancels the removal. Both local `URL.revokeObjectURL` and the `removeUrl` POST will be skipped.
- `source: string` — The editor feature the sub-component belongs to. Supplied by the caller when the sub-component is created. Undefined for generic sub-components that are not tied to a specific feature.
- `src: string` — Source URL of the image being removed.

---

### FileSelectedEventArgs

Source: <https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/fileselectedeventargs>

Event args for `RichTextEditor.fileSelected`. Extends the ej2 `SelectedEventArgs` with the `source` field that identifies the editor feature the upload is for.

#### Properties

- `cancel: boolean` — Defines whether the current action can be prevented.
- `currentRequest: { [key: string]: string }[]` — Set the current request header to the XMLHttpRequest instance.
- `customFormData: { [key: string]: Object }[]` — Defines the additional data in key and value pair format that will be submitted to the upload action.
- `event: MouseEvent | TouchEvent | DragEvent | ClipboardEvent` — Returns the original event arguments.
- `filesData: FileInfo[]` — Returns the list of selected files.
- `isCanceled: boolean` — Specifies whether the file selection has been canceled.
- `isModified: boolean` — Determines whether the file list generates based on the modified data.
- `modifiedFilesData: FileInfo[]` — Specifies the modified files data to generate the file items. The argument depends on the `isModified` argument.
- `progressInterval: string` — Specifies the step value to the progress bar.
- `source: string` — The editor feature the sub-component belongs to. Supplied by the caller when the sub-component is created. Undefined for generic sub-components that are not tied to a specific feature.

---

### FileUploadingEventArgs

Source: <https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/fileuploadingeventargs>

Event args for `RichTextEditor.fileUploading`. Extends the ej2 `UploadingEventArgs` with the `source` field that identifies the editor feature the upload is for.

#### Properties

- `cancel: boolean` — Defines whether the current action can be prevented.
- `chunkSize: number` — Returns the chunk size in bytes if the chunk upload is enabled.
- `currentChunkIndex: number` — Returns the index of current chunk if the chunk upload is enabled.
- `currentRequest: XMLHttpRequest` — Returns the XMLHttpRequest instance that is associated with upload action.
- `customFormData: { [key: string]: Object }[]` — Defines the additional data in key and value pair format that will be submitted to the upload action.
- `fileData: FileInfo` — Returns the list of files that will be uploaded.
- `source: string` — The editor feature the sub-component belongs to. Supplied by the caller when the sub-component is created. Undefined for generic sub-components that are not tied to a specific feature.

---

### FileUploadSuccessEventArgs

Source: <https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/fileuploadsuccesseventargs>

Event args for `RichTextEditor.fileUploadSuccess`. Extends the ej2 `SuccessEventArgs` with the `source` field that identifies the editor feature the upload is for.

#### Properties

- `chunkIndex: number` — Returns the upload chunk index.
- `chunkSize: number` — Returns the upload chunk size.
- `e: object` — Returns the original event arguments.
- `event: object` — Returns the original event arguments.
- `file: FileInfo` — Returns the details about upload file.
- `operation: string` — Returns the upload event operation.
- `response: ResponseEventArgs` — Returns the upload event operation.
- `source: string` — The editor feature the sub-component belongs to. Supplied by the caller when the sub-component is created. Undefined for generic sub-components that are not tied to a specific feature.
- `statusText: string` — Returns the upload status.
- `totalChunk: number` — Returns the total chunk size.

---

### FileUploadFailedEventArgs

Source: <https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/fileuploadfailedeventargs>

Event args for `RichTextEditor.fileUploadFailed`. Extends the ej2 `FailureEventArgs` with the `source` field that identifies the editor feature the upload is for.

#### Properties

- `chunkIndex: number` — Returns the upload chunk index.
- `chunkSize: number` — Returns the upload chunk size.
- `e: object` — Returns the original event arguments.
- `event: object` — Returns the original event arguments.
- `file: FileInfo` — Returns the details about upload file.
- `operation: string` — Returns the upload event operation.
- `response: ResponseEventArgs` — Returns the upload event operation.
- `source: string` — The editor feature the sub-component belongs to. Supplied by the caller when the sub-component is created. Undefined for generic sub-components that are not tied to a specific feature.
- `statusText: string` — Returns the upload status.
- `totalChunk: number` — Returns the total chunk size.

---

## See also

- [Image Handling](image.md) — `imageSettings` configuration (`uploadUrl`, `removeUrl`, `imageUrl`, `allowedTypes`, `maxFileSize`, `saveFormat`, `dimension`, `display`, `resize`), Insert-Image dialog, image quick toolbar, remote upload examples.
- [Editor Events](editor-events.md) — Component-level events (`change`, `created`, `destroyed`, `focus`, `blur`, `actionBegin`, `actionComplete`).