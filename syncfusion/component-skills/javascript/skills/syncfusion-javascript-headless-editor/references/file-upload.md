# File Upload

This page combines the file-upload content from `accessibility-security.md` (lifecycle callbacks and security guidance) and the file-upload-related public API surface (registry types, handler interface, request/result types, lifecycle event payloads) that lives in this file under `## API references`. The file-handling methods `getFileHandler` and `setFileUploadHandler` are documented in [editor-methods.md](editor-methods.md).

The file-upload pipeline is invoked when a file is pasted or dropped into the editor. See [clipboard.md](clipboard.md) for the surrounding paste pipeline and [image.md](image.md) for how image nodes consume the upload result.

## Table of Contents

- [Lifecycle overview](#lifecycle-overview)
- [Editor API: getFileHandler / setFileUploadHandler](#editor-api-getfilehandler-setfileuploadhandler)
  - [`getFileHandler()`](#getfilehandler)
  - [`setFileUploadHandler(handler)`](#setfileuploadhandlerhandler)
- [EditorConfig options](#editorconfig-options)
- [Lifecycle callbacks](#lifecycle-callbacks)
- [File upload security](#file-upload-security)
- [API references](#api-references)
  - [FileHandler](#filehandler)
  - [PendingFileUpload](#pendingfileupload)
  - [FileUploadHandler](#fileuploadhandler)
  - [FileUploadProgress](#fileuploadprogress)
  - [FileUploadRequest](#fileuploadrequest)
  - [FileUploadResult](#fileuploadresult)
  - [BeforeFileUploadEventArgs](#beforefileuploadeventargs)
  - [FileReceivedEventArgs](#filereceivedeventargs)

## Lifecycle overview

When a file enters the editor (paste, drop, or API), the `FileHandler` orchestrates the upload:

1. The file is detected at the clipboard or drop boundary.
2. The `beforeFileUpload` event fires — listeners may set `args.cancel = true` to reject the file before any work begins.
3. An upload ID is generated and the file is registered with the `UploadStateRegistry`.
4. The `FileHandler` calls the product-registered `FileUploadHandler.upload()` method.
5. As the upload progresses, `FileUploadProgress` snapshots are written to the registry; UI components subscribed to the registry update in real time.
6. On success, the `FileUploadResult` is returned and the file is inserted as a node in the document.
7. The `fileReceived` event fires after the file is received (past the upload phase) — extensions may inspect it and create a node.
## Editor API: getFileHandler / setFileUploadHandler

The `HeadlessEditor` class exposes two methods for the file-upload pipeline. Most applications only need `setFileUploadHandler`; `getFileHandler` is for advanced use cases that require direct access to the upload registry.

### `getFileHandler()`

Returns the `FileHandler` instance for file upload operations. The `FileHandler` is lazily initialized on first access and manages the complete file lifecycle: paste/drop detection, upload ID generation, handler invocation, and event emission. This method provides low-level access for advanced use cases; most applications use `setFileUploadHandler()` instead.

**Returns:** `FileHandler`

### `setFileUploadHandler(handler)`

Registers a file upload handler for paste and drag-drop file operations. The provided handler is invoked whenever files are pasted or dropped into the editor. This method must be called before file paste/drop operations begin to have any effect. Calling it multiple times replaces the previous handler. The `FileUploadHandler` receives a file object and metadata, and must return a `Promise` resolving to the uploaded file URL or resource identifier.

| Parameter | Type | Description |
|-----------|------|-------------|
| `handler` | `FileUploadHandler` | The upload handler implementation with an `upload()` method that accepts a file request and returns a `Promise` with the uploaded URL. |

**Returns:** `void`

## EditorConfig options

Two `EditorConfig` fields and two callback fields control the file-upload pipeline:

| Property | Type | Description |
|----------|------|-------------|
| `fileUploadHandler` | `FileUploadHandler` | File upload handler for processing files. Must be provided to enable file upload functionality. |
| `beforeFileUpload` | `Object` (callback) | Invoked before a file is uploaded. |
| `fileReceived` | `Object` (callback) | Invoked after a file is received. |

## Lifecycle callbacks

The `beforeFileUpload` event is raised before processing begins. The public event handler receives `BeforeFileUploadEventArgs` directly. Set `args.cancel = true` to reject a file before the upload starts.

```ts
import type { BeforeFileUploadEventArgs } from '@syncfusion/ej2-headless-editor';

editor.on<BeforeFileUploadEventArgs>('beforeFileUpload', (args) => {
  const allowedTypes: Set<string> = new Set(['image/jpeg', 'image/png']);

  if (!allowedTypes.has(args.file.type) || args.file.size > 5 * 1024 * 1024) {
    args.cancel = true;
  }
});
```

`BeforeFileUploadEventArgs` contains the `file`, its `source` (`paste`, `drop`, or `api`), and the optional `cancel` flag. Validate file type, size, name, and content on the server as well. Use `editor.on('fileReceived', handler)` for post-validation processing and `FileHandler.cancel(uploadId)` to cancel an active upload.

## File upload security

When integrating the file-upload pipeline, validate file type, size, name, and content on the client before upload and on the server after upload. The editor's `beforeFileUpload` callback is the canonical place to enforce client-side limits.

## API references

This section documents the file-upload-related public API surface — registry types, handler interface, request/result types, and lifecycle event payloads.

### FileHandler

`FileHandler` — generic file upload service. Manages file lifecycle: paste/drop → upload ID generation → upload orchestration. Writes upload state directly to `UploadStateRegistry` (no `EventBus` re-publishing).

**Responsibility:**
- File intake and tracking
- Upload orchestration (call handler, track state)
- State validation (result contract, terminal conditions)
- Registry writes (progress, completed, failed, cancelled)

**Non-responsibility:**
- Document state
- Node validation
- Product implementation details

#### Methods

| Method | Description | Returns |
|--------|-------------|---------|
| `cancel(uploadId)` | Cancel an in-flight upload. May trigger `FILE_UPLOAD_CANCELLED` or `FILE_UPLOAD_FAILED` event. | `void` |
| `getPendingUpload(uploadId)` | Get a specific pending upload. | `PendingFileUpload \| undefined` |
| `getPendingUploads()` | Get all pending uploads. Used for progress UI, debugging. | `PendingFileUpload[]` |
| `setUploadHandler(handler)` | Register product's upload handler. MUST be called before file operations. | `void` |
| `startUpload(file)` | Start uploading a file. Returns `uploadId` synchronously (no `await` needed). Actual upload happens asynchronously in background. | `string` |

### PendingFileUpload

`PendingFileUpload` — pending file upload tracking.

| Property | Type | Description |
|----------|------|-------------|
| `error` | `Error` | Error details (if failed). |
| `file` | `File` | The file object. |
| `progress` | `FileUploadProgress` | Latest progress (if available). |
| `result` | `FileUploadResult` | Result (if completed). |
| `uploadId` | `string` | Unique upload ID (UUID). |

### FileUploadHandler

`FileUploadHandler` — product-implemented interface for uploading files. Responsibility: the handler is responsible for HTTP transport, validation, and error handling. The framework (`FileHandler`) owns upload state lifecycle.

The handler must:
- Validate HTTP response status (throw if `!response.ok`)
- Parse and validate response schema
- Validate that `result.url` is a non-empty string
- Throw on any error (including validation errors)
- Call `onProgress()` during transfer for UI feedback
- Respect `AbortSignal` for cancellation

The framework will:
- Determine terminal state from Promise: `resolve` → completed, `reject` → failed
- Handle `AbortError` specially: treated as cancelled state
- Validate `FileUploadResult` contract and reject if invalid
- Write upload state (progress, completed, failed, cancelled) directly to registry
- Notify UI via `UploadStateRegistry` subscriptions

#### Methods

| Method | Description | Returns |
|--------|-------------|---------|
| `upload(request)` | Upload a file and return hosted URL. The `request` argument is a `FileUploadRequest` (file + signal + progress callback). | `Promise<FileUploadResult>` |
| `cancel(uploadId)` | Optional: cancel an in-flight upload. Called when the user/extension cancels the upload. The handler should abort any pending network operations. | `void` |

### FileUploadProgress

`FileUploadProgress` — progress information during file upload.

| Property | Type | Description |
|----------|------|-------------|
| `loaded` | `number` | Bytes transferred so far. |
| `percentage` | `number` | Computed percentage (0–100) if `total` is available. |
| `total` | `number` | Total bytes (undefined if server doesn't provide). |

### FileUploadRequest

`FileUploadRequest` — request parameters for file upload. The product handler receives this object and must: validate HTTP response status before treating as success, validate response schema and return valid `FileUploadResult`, throw on any error, call `onProgress()` during transfer, and respect the `AbortSignal` for cancellation.

| Property | Type | Description |
|----------|------|-------------|
| `file` | `File` | The file being uploaded. |
| `id` | `string` | Unique upload identifier (UUID). Stable for this upload lifecycle. |
| `onProgress` | `Object` | Progress callback for real-time UI feedback. Called during transfer. |
| `signal` | `AbortSignal` | `AbortSignal` for cancellation support. |

### FileUploadResult

`FileUploadResult` — result of a successful file upload. The handler MUST validate the HTTP response and server schema before returning this object. The framework will reject the upload if `url` is missing/null/empty/not a string, or if the Promise rejects for any reason (including validation errors).

| Property | Type | Description |
|----------|------|-------------|
| `url` | `string` | Hosted URL to embed in document. **Required**: non-empty string. |
| `fileName` | `string` | Optional: canonical filename on server. |
| `height` | `number` | Optional: image height (for image files). |
| `mimeType` | `string` | Optional: server-confirmed MIME type. |
| `size` | `number` | Optional: server-side file size in bytes. |
| `width` | `number` | Optional: image width (for image files). |

### BeforeFileUploadEventArgs

Payload for `BEFORE_FILE_UPLOAD` event. Published before a file upload is attempted. Extensions can inspect the file and cancel the upload if needed.

#### Properties

| Property | Type | Description |
|----------|------|-------------|
| `cancel` | `boolean` | Set to `true` to cancel the upload. Extensions can set this in their event handler to prevent the upload from starting. |
| `file` | `File` | The file about to be uploaded. |

### FileReceivedEventArgs

Payload for `FILE_RECEIVED` event. Published when a file is received (pasted/dropped/API). Extensions receive this to decide whether to accept the file and create a node.

#### Properties

| Property | Type | Description |
|----------|------|-------------|
| `file` | `File` | The file that was received. |
