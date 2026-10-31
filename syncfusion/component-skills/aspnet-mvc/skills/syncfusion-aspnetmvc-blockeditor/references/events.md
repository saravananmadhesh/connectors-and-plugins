# Events — Syncfusion ASP.NET MVC Block Editor

## All Available Events

| Event | Trigger | Useful for |
|---|---|---|
| `Created` | Editor initialized and ready | Post-init setup, capturing instance |
| `BlockChanged` | Any block added, deleted, or structurally modified | Auto-save, change tracking |
| `SelectionChanged` | User text selection changes | Updating external UI based on selection |
| `BlockDragStart` | Drag operation begins | Canceling drag for certain block types |
| `BlockDragging` | During an active drag | Custom drag UI feedback |
| `BlockDropped` | Blocks dropped at destination | Post-drop validation or logging |
| `Focus` | Editor gains focus | UI state updates |
| `Blur` | Editor loses focus | Auto-save triggers |
| `BeforePasteCleanup` | Before content is pasted | Cancel or modify paste operation |
| `AfterPasteCleanup` | After content is pasted | Post-paste processing |
| `BeforeFileUpload` | Before an image upload request is sent | Client-side file validation, canceling uploads |
| `FileUploading` | When the upload request is being prepared | Adding auth headers to upload requests |
| `FileUploadSuccess` | After server returns a successful upload response | Reading the saved image URL (`args.fileUrl`) |
| `FileUploadFailed` | When an upload fails or the server returns an error | Displaying upload error feedback |

---

## Created

Fires when the editor finishes initializing. Use this to capture the component instance for method calls.

```razor
@Html.EJS().BlockEditor("block-editor").Created("onCreated").Render()
```

```javascript
var blockEditorObj;
function onCreated() {
    blockEditorObj = ej.base.getInstance(
        document.getElementById('block-editor'),
        ejs.blockeditor.BlockEditor
    );
    // Editor is now ready; safe to call methods
}
```

---

## BlockChanged

Fires whenever blocks are added, removed, or structurally modified.

```razor
@Html.EJS().BlockEditor("block-editor").BlockChanged("onBlockChanged").Render()
```

```javascript
function onBlockChanged() {
    // Trigger auto-save or update "unsaved changes" indicator
    console.log('Content changed. Block count:', blockEditorObj.getBlockCount());
}
```

---

## SelectionChanged

Fires when the user's text selection changes within the editor.

```razor
@Html.EJS().BlockEditor("block-editor").SelectionChanged("onSelectionChanged").Render()
```

```javascript
function onSelectionChanged(args) {
    // Update an external format toolbar based on current selection
    var selectedBlocks = blockEditorObj.getSelectedBlocks();
    console.log('Selected blocks:', selectedBlocks ? selectedBlocks.length : 0);
}
```

---

## Drag Events

### BlockDragStart

```razor
@Html.EJS().BlockEditor("block-editor").BlockDragStart("onDragStart").Render()
```

```javascript
function onDragStart(args) {
    // args contains dragged block info and initial position
    // Cancel the drag by setting args.cancel = true (if supported)
    console.log('Drag started');
}
```

### BlockDragging

```razor
@Html.EJS().BlockEditor("block-editor").BlockDragging("onDragging").Render()
```

```javascript
function onDragging(args) {
    // Fires continuously during the drag; use sparingly for performance
}
```

### BlockDropped

```razor
@Html.EJS().BlockEditor("block-editor").BlockDropped("onDropped").Render()
```

```javascript
function onDropped(args) {
    console.log('Blocks dropped at new position');
}
```

---

## Focus and Blur

```razor
@Html.EJS().BlockEditor("block-editor")
    .Focus("onFocus")
    .Blur("onBlur")
    .Render()
```

```javascript
function onFocus(args) {
    document.getElementById('editor-status').textContent = 'Editing...';
}

function onBlur(args) {
    document.getElementById('editor-status').textContent = 'Saved';
    // Trigger auto-save here
    var json = blockEditorObj.getDataAsJson();
    saveToServer(json);
}
```

---

## Paste Events

### BeforePasteCleanup

Fires before pasted content is processed. Use to inspect or cancel the paste.

```razor
@Html.EJS().BlockEditor("block-editor").BeforePasteCleanup("onBeforePaste").Render()
```

```javascript
function onBeforePaste(args) {
    // Inspect args.content before cleanup
    // Set args.cancel = true to prevent paste
}
```

### AfterPasteCleanup

Fires after paste cleanup is complete and content is inserted.

```razor
@Html.EJS().BlockEditor("block-editor").AfterPasteCleanup("onAfterPaste").Render()
```

```javascript
function onAfterPaste(args) {
    console.log('Pasted content length:', args.content.length);
}
```

---

## File Upload Events

These events fire during image block uploads. See `embed-blocks.md` for full configuration context including `ImageBlockSettings`.

### BeforeFileUpload

Fires before an upload begins. Cancelable — set `args.cancel = true` to abort.

```razor
@Html.EJS().BlockEditor("block-editor").BeforeFileUpload("onBeforeFileUpload").Render()
```

```javascript
function onBeforeFileUpload(args) {
    if (args.fileData.size > 5000000) {
        args.cancel = true;
        alert('File exceeds the 5 MB limit.');
    }
}
```

### FileUploading

Fires when the upload request is being sent. Use to add custom request headers such as authorization tokens.

```razor
@Html.EJS().BlockEditor("block-editor").FileUploading("onFileUploading").Render()
```

```javascript
function onFileUploading(args) {
    args.currentRequest.setRequestHeader('Authorization', 'Bearer YOUR_TOKEN');
}
```

### FileUploadSuccess

Fires when the server returns a successful response. `args.fileUrl` contains the URL of the saved image (relevant for `Blob` save format).

```razor
@Html.EJS().BlockEditor("block-editor").FileUploadSuccess("onFileUploadSuccess").Render()
```

```javascript
function onFileUploadSuccess(args) {
    console.log('Uploaded image URL:', args.fileUrl);
}
```

### FileUploadFailed

Fires when the upload fails or returns a server error.

```razor
@Html.EJS().BlockEditor("block-editor").FileUploadFailed("onFileUploadFailed").Render()
```

```javascript
function onFileUploadFailed(args) {
    alert('Image upload failed. Please try again.');
}
```

---

## Combining Multiple Events

```razor
@Html.EJS().BlockEditor("block-editor")
    .Blocks((List<BlockModel>)ViewBag.BlocksData)
    .Created("onCreated")
    .BlockChanged("onBlockChanged")
    .Focus("onFocus")
    .Blur("onBlur")
    .BeforePasteCleanup("onBeforePaste")
    .AfterPasteCleanup("onAfterPaste")
    .BeforeFileUpload("onBeforeFileUpload")
    .FileUploading("onFileUploading")
    .FileUploadSuccess("onFileUploadSuccess")
    .FileUploadFailed("onFileUploadFailed")
    .Render()
```

> Events can be chained on the Block Editor helper before `.Render()`. Handler names are JavaScript function names defined in a `<script>` block or external file.
