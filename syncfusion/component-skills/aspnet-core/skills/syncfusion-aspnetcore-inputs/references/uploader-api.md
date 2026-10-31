````markdown
# Syncfusion ASP.NET Core Uploader – API Reference

> **Source:** https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.inputs.uploader.html  
> **Namespace:** `Syncfusion.EJ2.Inputs`  
> **Assembly:** `Syncfusion.EJ2.dll`  
> **TagHelper:** `<ejs-uploader>`

> **Important:** Syncfusion EJ2 ASP.NET Core TagHelper attributes use **camelCase** (e.g., `autoUpload`, `allowedExtensions`, `maxFileSize`), matching the JavaScript API property names directly. This is different from standard ASP.NET Core kebab-case conventions.

---

## Properties

### allowedExtensions
- **Type:** `string`
- **Default:** `""`
- **TagHelper attr:** `allowedExtensions`
- **Description:** Specifies the extensions of the file types allowed in the uploader component. Pass extensions with comma separators. Example: `".jpg,.png"`.

```html
<ejs-uploader id="uploader" allowedExtensions=".doc, .docx, .xls, .xlsx" autoUpload="false">
    <e-uploader-asyncsettings saveUrl="Home/Save" removeUrl="Home/Remove"></e-uploader-asyncsettings>
</ejs-uploader>
```

---

### asyncSettings
- **Type:** `UploaderAsyncSettings`
- **Default:** `null`
- **TagHelper attr:** `asyncSettings` (model binding) or child tag `<e-uploader-asyncsettings>`
- **Description:** Configures the save and remove URL to perform upload operations on the server asynchronously.

**Usage Option 1 – Model object (used in official docs):**

```html
@{
    var asyncSettings = new Syncfusion.EJ2.Inputs.UploaderAsyncSettings {
        SaveUrl = "https://services.syncfusion.com/aspnet/production/api/FileUploader/Save",
        RemoveUrl = "https://services.syncfusion.com/aspnet/production/api/FileUploader/Remove"
    };
}
<ejs-uploader id="uploadFiles" asyncSettings="@asyncSettings" autoUpload="false"></ejs-uploader>
```

**Usage Option 2 – Child tag:**

```html
<ejs-uploader id="uploader" autoUpload="false">
    <e-uploader-asyncsettings saveUrl="Home/Save"
                      removeUrl="Home/Remove"
                      chunkSize="102400"
                      retryCount="3"
                      retryAfterDelay="500">
    </e-uploader-asyncsettings>
</ejs-uploader>
```

**Child Properties of `UploaderAsyncSettings`:**

| C# Property | Child Tag Attribute | Type | Default | Description |
|-------------|-------------------|------|---------|-------------|
| `SaveUrl` | `saveUrl` | string | `""` | URL of the save action handler on the server |
| `RemoveUrl` | `removeUrl` | string | `""` | URL of the remove action handler on the server |
| `ChunkSize` | `chunkSize` | double | `0` | Chunk size in bytes. If set > 0, enables chunk upload |
| `RetryCount` | `retryCount` | int | `3` | Number of retry attempts when a chunk fails |
| `RetryAfterDelay` | `retryAfterDelay` | int | `500` | Milliseconds to wait before retrying a failed chunk |

---

### autoUpload
- **Type:** `bool`
- **Default:** `true`
- **TagHelper attr:** `autoUpload`
- **Description:** By default, the uploader initiates automatic upload when files are added to the upload queue. Set to `false` to show Upload and Clear action buttons for manual control.

```html
<ejs-uploader id="uploadFiles" autoUpload="false"></ejs-uploader>
```

---

### buttons
- **Type:** `UploaderButtonsProps`
- **Default:** `null`
- **TagHelper attr:** child tag `<e-uploader-buttons>`
- **Description:** Customizes the text of Browse, Upload, and Clear buttons using plain text or HTML elements. If both `locale` and `buttons` are configured, `buttons` takes precedence.

**Child Properties of `UploaderButtonsProps`:**

| Property | Type | Description |
|----------|------|-------------|
| `browse` | string | Text/HTML for the browse button |
| `upload` | string | Text/HTML for the upload button |
| `clear` | string | Text/HTML for the clear button |

```html
<ejs-uploader id="uploader" autoUpload="false">
    <e-uploader-buttons browse="Choose File" upload="Upload Now" clear="Remove All"></e-uploader-buttons>
    <e-uploader-asyncsettings saveUrl="Home/Save" removeUrl="Home/Remove"></e-uploader-asyncsettings>
</ejs-uploader>
```

---

### cssClass
- **Type:** `string`
- **Default:** `""`
- **TagHelper attr:** `cssClass`
- **Description:** Specifies one or more CSS class names appended to the root element of the uploader.

```html
<ejs-uploader id="uploader" cssClass="custom-uploader">
    <e-uploader-asyncsettings saveUrl="Home/Save" removeUrl="Home/Remove"></e-uploader-asyncsettings>
</ejs-uploader>
```

---

### directoryUpload
- **Type:** `bool`
- **Default:** `false`
- **TagHelper attr:** `directoryUpload`
- **Description:** When `true`, allows the user to browse and upload entire folders. Only folders can be selected instead of individual files.

```html
@{
    var asyncSettings = new Syncfusion.EJ2.Inputs.UploaderAsyncSettings {
        SaveUrl = "Home/Save", RemoveUrl = "Home/Remove"
    };
}
<ejs-uploader id="uploadFiles" asyncSettings="@asyncSettings" directoryUpload="true" autoUpload="false"></ejs-uploader>
```

---

### dropArea
- **Type:** `string`
- **Default:** `null`
- **TagHelper attr:** `dropArea`
- **Description:** Specifies an external HTML element (by CSS selector or element ID) to act as the drop target for drag-and-drop uploads. By default, the uploader itself acts as the drop area.

```html
<div id="droparea">Drop files here to upload</div>
<div id="uploadfile">
    <ejs-uploader id="uploadFiles" dropArea="#droparea" autoUpload="false"></ejs-uploader>
</div>
```

---

### dropEffect
- **Type:** `DropEffect` (enum)
- **Default:** `DropEffect.Default`
- **TagHelper attr:** `dropEffect`
- **Description:** Specifies the drag operation effect for the uploader component. Possible values: `Copy`, `Move`, `Link`, `None`.

```html
<ejs-uploader id="uploader" dropEffect="Copy">
    <e-uploader-asyncsettings saveUrl="Home/Save" removeUrl="Home/Remove"></e-uploader-asyncsettings>
</ejs-uploader>
```

---

### enabled
- **Type:** `bool`
- **Default:** `true`
- **TagHelper attr:** `enabled`
- **Description:** Specifies whether the component is enabled or disabled. When `false`, the uploader does not allow user interaction.

```html
<ejs-uploader id="uploader" enabled="false">
    <e-uploader-asyncsettings saveUrl="Home/Save" removeUrl="Home/Remove"></e-uploader-asyncsettings>
</ejs-uploader>
```

---

### enableHtmlSanitizer
- **Type:** `bool`
- **Default:** `true`
- **TagHelper attr:** `enableHtmlSanitizer`
- **Description:** When `true`, prevents cross-site scripting (XSS) in file names by stripping malicious code and showing a validation error message.

```html
<ejs-uploader id="uploader" enableHtmlSanitizer="true">
    <e-uploader-asyncsettings saveUrl="Home/Save" removeUrl="Home/Remove"></e-uploader-asyncsettings>
</ejs-uploader>
```

---

### enablePersistence
- **Type:** `bool`
- **Default:** `false`
- **TagHelper attr:** `enablePersistence`
- **Description:** Enables or disables persisting the component's state between page reloads.

```html
<ejs-uploader id="uploader" enablePersistence="true">
    <e-uploader-asyncsettings saveUrl="Home/Save" removeUrl="Home/Remove"></e-uploader-asyncsettings>
</ejs-uploader>
```

---

### enableRtl
- **Type:** `bool`
- **Default:** `false`
- **TagHelper attr:** `enableRtl`
- **Description:** Enables right-to-left rendering of the component.

```html
<ejs-uploader id="uploader" enableRtl="true">
    <e-uploader-asyncsettings saveUrl="Home/Save" removeUrl="Home/Remove"></e-uploader-asyncsettings>
</ejs-uploader>
```

---

### files
- **Type:** `List<UploaderUploadedFiles>`
- **Default:** `null`
- **TagHelper attr:** child tags `<e-uploader-files>` / `<e-uploader-uploadedfiles>`
- **Description:** Specifies a list of files preloaded on rendering (already uploaded to the server). Mandatory properties per file: `name`, `size`, `type`.

```html
@{
    var asyncSettings = new Syncfusion.EJ2.Inputs.UploaderAsyncSettings {
        SaveUrl = "Home/Save", RemoveUrl = "Home/Remove"
    };
}
<ejs-uploader id="uploadFiles" asyncSettings="@asyncSettings">
    <e-uploader-files>
        <e-uploader-uploadedfiles name="Books" Size=500000 type=".png"></e-uploader-uploadedfiles>
        <e-uploader-uploadedfiles name="Movies" Size=12000 type=".pdf"></e-uploader-uploadedfiles>
        <e-uploader-uploadedfiles name="Study materials" size="500000" type=".docx"></e-uploader-uploadedfiles>
    </e-uploader-files>
</ejs-uploader>
```

---

### htmlAttributes
- **Type:** `object`
- **Default:** `null`
- **TagHelper attr:** `htmlAttributes`
- **Description:** Allows adding additional HTML attributes (e.g., `disabled`, `value`) to the underlying input element. If both property and equivalent HTML attribute are set, the property value takes precedence.

---

### locale
- **Type:** `string`
- **Default:** `""`
- **TagHelper attr:** `locale`
- **Description:** Overrides the global culture and localization value for this component. Default global culture is `en-US`.

```html
@{
    var asyncSettings = new Syncfusion.EJ2.Inputs.UploaderAsyncSettings {
        SaveUrl = "Home/Save", RemoveUrl = "Home/Remove"
    };
}
<ejs-uploader id="uploadFiles" asyncSettings="@asyncSettings" locale="fr-CH"></ejs-uploader>
```

---

### maxFileSize
- **Type:** `double`
- **Default:** `30000000` (≈28.6 MB)
- **TagHelper attr:** `maxFileSize`
- **Description:** Specifies the maximum allowed file size in bytes. Files exceeding this size are rejected on the client side.

```html
@{
    var asyncSettings = new Syncfusion.EJ2.Inputs.UploaderAsyncSettings {
        SaveUrl = "Home/Save", RemoveUrl = "Home/Remove"
    };
}
<ejs-uploader id="uploadFiles" asyncSettings="@asyncSettings" minFileSize="10000" maxFileSize="1000000" autoUpload="false"></ejs-uploader>
```

---

### minFileSize
- **Type:** `double`
- **Default:** `0`
- **TagHelper attr:** `minFileSize`
- **Description:** Specifies the minimum file size in bytes. Files smaller than this value (including empty files) are rejected.

```html
@{
    var asyncSettings = new Syncfusion.EJ2.Inputs.UploaderAsyncSettings {
        SaveUrl = "Home/Save", RemoveUrl = "Home/Remove"
    };
}
<ejs-uploader id="uploadFiles" asyncSettings="@asyncSettings" minFileSize="10000" maxFileSize="1000000" autoUpload="false"></ejs-uploader>
```

---

### multiple
- **Type:** `bool`
- **Default:** `true`
- **TagHelper attr:** `multiple`
- **Description:** Specifies whether multiple files can be browsed or dropped simultaneously. Set to `false` to allow only one file at a time.

```html
@{
    var asyncSettings = new Syncfusion.EJ2.Inputs.UploaderAsyncSettings {
        SaveUrl = "Home/Save", RemoveUrl = "Home/Remove"
    };
}
<ejs-uploader id="uploadFiles" asyncSettings="@asyncSettings" multiple="false" autoUpload="false"></ejs-uploader>
```

---

### sequentialUpload
- **Type:** `bool`
- **Default:** `false`
- **TagHelper attr:** `sequentialUpload`
- **Description:** When `true`, files are uploaded one after another (sequentially) instead of simultaneously. Helps reduce upload traffic and reduces the chance of failures.

```html
@{
    var asyncSettings = new Syncfusion.EJ2.Inputs.UploaderAsyncSettings {
        SaveUrl = "Home/Save", RemoveUrl = "Home/Remove"
    };
}
<ejs-uploader id="uploadFiles" sequentialUpload="true" asyncSettings="@asyncSettings"></ejs-uploader>
```

---

### showFileList
- **Type:** `bool`
- **Default:** `true`
- **TagHelper attr:** `showFileList`
- **Description:** When `false`, the default file list is hidden. Use this when implementing a fully custom file list UI. When using custom template, call `upload(filesData, true)` / `remove(filesData, true)`.

```html
<ejs-uploader id="uploader" showFileList="false">
    <e-uploader-asyncsettings saveUrl="Home/Save" removeUrl="Home/Remove"></e-uploader-asyncsettings>
</ejs-uploader>
```

---

### template
- **Type:** `string`
- **Default:** `null`
- **TagHelper attr:** `template`
- **Description:** Specifies an HTML string to customize the content of each file item in the list. Supports template variables: `${name}`, `${size}`, `${type}`, `${statusText}`.

```html
@{
    var asyncSettings = new Syncfusion.EJ2.Inputs.UploaderAsyncSettings {
        SaveUrl = "Home/Save", RemoveUrl = "Home/Remove"
    };
}
<ejs-uploader id="UploadFiles" autoUpload="false" asyncSettings="@asyncSettings" progress="onFileUpload" selected="onSelect" success="onuploadSuccess" failure="onuploadFailed"
    template="<span class='wrapper'><span class='icon sf-icon-${type}'></span><span class='name file-name'>${name}</span></span><span class='file-size-td file-size'>${size} bytes</span><span class='e-icons e-file-remove-btn' title='Remove'></span><br/><progress id='progressBar' class='progressbar' value='0' max='100'></progress><span class='percent-td percent'></span>">
</ejs-uploader>
```

---

## Events

### actionComplete
- **TagHelper attr:** `actionComplete`
- **Description:** Triggers after all selected files have been processed (uploaded successfully or failed).

```html
<ejs-uploader id="uploader" actionComplete="onActionComplete">
    <e-uploader-asyncsettings saveUrl="Home/Save" removeUrl="Home/Remove"></e-uploader-asyncsettings>
</ejs-uploader>
<script>
function onActionComplete(args) {
    // args.fileData - array of all processed files
    console.log('All files processed');
}
</script>
```

---

### beforeRemove
- **TagHelper attr:** `beforeRemove`
- **Description:** Triggers before the remove action is sent to the server. Used to get confirmation before removing the file from the server.

```html
<ejs-uploader id="uploader" beforeRemove="onBeforeRemove">
    <e-uploader-asyncsettings saveUrl="Home/Save" removeUrl="Home/Remove"></e-uploader-asyncsettings>
</ejs-uploader>
<script>
function onBeforeRemove(args) {
    // args.cancel = true; // Cancel the remove action
    console.log('Before remove: ' + args.fileData.name);
}
</script>
```

---

### beforeUpload
- **TagHelper attr:** `beforeUpload`
- **Description:** Triggers before the upload process begins. Used to add additional parameters to the upload request.

```html
<ejs-uploader id="uploader" beforeUpload="onBeforeUpload">
    <e-uploader-asyncsettings saveUrl="Home/Save" removeUrl="Home/Remove"></e-uploader-asyncsettings>
</ejs-uploader>
<script>
function onBeforeUpload(args) {
    // args.customFormData = [{ 'key': 'value' }];
    console.log('Before upload: ' + args.fileData.name);
}
</script>
```

---

### canceling
- **TagHelper attr:** `canceling`
- **Description:** Fires when a chunk file upload is cancelled. Partially uploaded chunks are removed from the server.

```html
@{
    var asyncSettings = new Syncfusion.EJ2.Inputs.UploaderAsyncSettings {
        SaveUrl = "Home/Save", RemoveUrl = "Home/Remove", ChunkSize = 102400
    };
}
<ejs-uploader id="uploader" asyncSettings="@asyncSettings" canceling="onCanceling" autoUpload="false"></ejs-uploader>
<script>
function onCanceling(args) {
    console.log('Upload cancelled: ' + args.file.name);
}
</script>
```

---

### change
- **TagHelper attr:** `change`
- **Description:** Triggers when changes occur in the uploaded file list by selecting or dropping files.

```html
<ejs-uploader id="uploader" change="onChange">
    <e-uploader-asyncsettings saveUrl="Home/Save" removeUrl="Home/Remove"></e-uploader-asyncsettings>
</ejs-uploader>
<script>
function onChange(args) {
    // args.files - array of changed files
    console.log('File list changed');
}
</script>
```

---

### chunkFailure
- **TagHelper attr:** `chunkFailure`
- **Description:** Fires when a chunk file upload fails.

```html
@{
    var asyncSettings = new Syncfusion.EJ2.Inputs.UploaderAsyncSettings {
        SaveUrl = "Home/Save", RemoveUrl = "Home/Remove", ChunkSize = 102400
    };
}
<ejs-uploader id="uploader" asyncSettings="@asyncSettings" chunkFailure="onChunkFailure" autoUpload="false"></ejs-uploader>
<script>
function onChunkFailure(args) {
    console.log('Chunk failed: ' + args.file.name);
}
</script>
```

---

### chunkSuccess
- **TagHelper attr:** `chunkSuccess`
- **Description:** Fires when a chunk file is uploaded successfully.

```html
@{
    var asyncSettings = new Syncfusion.EJ2.Inputs.UploaderAsyncSettings {
        SaveUrl = "Home/Save", RemoveUrl = "Home/Remove", ChunkSize = 102400
    };
}
<ejs-uploader id="uploader" asyncSettings="@asyncSettings" chunkSuccess="onChunkSuccess" autoUpload="false"></ejs-uploader>
<script>
function onChunkSuccess(args) {
    console.log('Chunk uploaded: ' + args.file.name);
}
</script>
```

---

### chunkUploading
- **TagHelper attr:** `chunkUploading`
- **Description:** Fires when each chunk upload process starts. Used to add additional parameters to the chunk upload request.

```html
@{
    var asyncSettings = new Syncfusion.EJ2.Inputs.UploaderAsyncSettings {
        SaveUrl = "Home/Save", RemoveUrl = "Home/Remove", ChunkSize = 102400
    };
}
<ejs-uploader id="uploader" asyncSettings="@asyncSettings" chunkUploading="onChunkUploading" autoUpload="false"></ejs-uploader>
<script>
function onChunkUploading(args) {
    // args.currentRequest.setRequestHeader('custom-header', 'value');
    console.log('Chunk uploading: ' + args.file.name);
}
</script>
```

---

### clearing
- **TagHelper attr:** `clearing`
- **Description:** Triggers before clearing the file list items when the Clear button is clicked.

```html
<ejs-uploader id="uploader" clearing="onClearing" autoUpload="false">
    <e-uploader-asyncsettings saveUrl="Home/Save" removeUrl="Home/Remove"></e-uploader-asyncsettings>
</ejs-uploader>
<script>
function onClearing(args) {
    // args.cancel = true; // Prevent clearing
    console.log('Clearing file list');
}
</script>
```

---

### created
- **TagHelper attr:** `created`
- **Description:** Triggers when the component is created and rendered.

```html
<ejs-uploader id="uploader" created="onCreated">
    <e-uploader-asyncsettings saveUrl="Home/Save" removeUrl="Home/Remove"></e-uploader-asyncsettings>
</ejs-uploader>
<script>
function onCreated() {
    console.log('Uploader created');
}
</script>
```

---

### failure
- **TagHelper attr:** `failure`
- **Description:** Triggers when the AJAX request fails during file uploading or removing.

```html
@{
    var asyncSettings = new Syncfusion.EJ2.Inputs.UploaderAsyncSettings {
        SaveUrl = "Home/Save", RemoveUrl = "Home/Remove"
    };
}
<ejs-uploader id="uploadFiles" asyncSettings="@asyncSettings" success="onUploadSuccess" failure="onUploadFailure" autoUpload="false"></ejs-uploader>
<script>
function onUploadSuccess(args) {
    if (args.operation === 'upload') {
        console.log('success');
    }
}
function onUploadFailure(args) {
    console.log('failed');
}
</script>
```

---

### fileListRendering
- **TagHelper attr:** `fileListRendering`
- **Description:** Triggers before rendering each file item in the file list. Use to customize specific file item structure.

```html
<ejs-uploader id="uploader" fileListRendering="onFileListRendering">
    <e-uploader-asyncsettings saveUrl="Home/Save" removeUrl="Home/Remove"></e-uploader-asyncsettings>
</ejs-uploader>
<script>
function onFileListRendering(args) {
    // args.element  - the file list item element
    // args.fileInfo - file details
    console.log('Rendering: ' + args.fileInfo.name);
}
</script>
```

---

### pausing
- **TagHelper attr:** `pausing`
- **Description:** Fires when a chunk file upload is paused.

```html
@{
    var asyncSettings = new Syncfusion.EJ2.Inputs.UploaderAsyncSettings {
        SaveUrl = "Home/Save", RemoveUrl = "Home/Remove", ChunkSize = 102400
    };
}
<ejs-uploader id="uploader" asyncSettings="@asyncSettings" pausing="onPausing" autoUpload="false"></ejs-uploader>
<script>
function onPausing(args) {
    console.log('Upload paused: ' + args.file.name);
}
</script>
```

---

### progress
- **TagHelper attr:** `progress`
- **Description:** Triggers continuously during file upload using AJAX, providing upload progress data.

```html
@{
    var asyncSettings = new Syncfusion.EJ2.Inputs.UploaderAsyncSettings {
        SaveUrl = "Home/Save", RemoveUrl = "Home/Remove"
    };
}
<ejs-uploader id="uploader" asyncSettings="@asyncSettings" progress="onProgress" autoUpload="false"></ejs-uploader>
<script>
function onProgress(args) {
    // args.file     - file object
    // args.e.loaded - bytes uploaded
    // args.e.total  - total bytes
    let percent = Math.round((args.e.loaded / args.e.total) * 100);
    console.log(args.file.name + ': ' + percent + '%');
}
</script>
```

---

### removing
- **TagHelper attr:** `removing`
- **Description:** Triggers when the remove action starts for an uploaded file. Use to set `postRawFile` or confirm before sending remove request to server.

```html
@{
    var asyncSettings = new Syncfusion.EJ2.Inputs.UploaderAsyncSettings {
        SaveUrl = "Home/Save", RemoveUrl = "Home/Remove"
    };
}
<ejs-uploader id="uploadFiles" asyncSettings="@asyncSettings" removing="onFileRemove" autoUpload="false"></ejs-uploader>
<script>
function onFileRemove(args) {
    // Set to false to send only file name (not raw file data) to the Remove action
    args.postRawFile = false;
}
</script>
```

---

### resuming
- **TagHelper attr:** `resuming`
- **Description:** Fires when a paused chunk file upload is resumed.

```html
@{
    var asyncSettings = new Syncfusion.EJ2.Inputs.UploaderAsyncSettings {
        SaveUrl = "Home/Save", RemoveUrl = "Home/Remove", ChunkSize = 102400
    };
}
<ejs-uploader id="uploader" asyncSettings="@asyncSettings" resuming="onResuming" autoUpload="false"></ejs-uploader>
<script>
function onResuming(args) {
    console.log('Upload resumed: ' + args.file.name);
}
</script>
```

---

### selected
- **TagHelper attr:** `selected`
- **Description:** Triggers after files are selected or dropped into the upload queue. Use `args.filesData`, `args.modifiedFilesData`, and `args.isModified` for custom file list manipulation.

```html
@{
    var asyncSettings = new Syncfusion.EJ2.Inputs.UploaderAsyncSettings {
        SaveUrl = "Home/Save", RemoveUrl = "Home/Remove"
    };
}
<ejs-uploader id="UploadFiles" asyncSettings="@asyncSettings" selected="onFileSelected" success="onUploadSuccess" autoUpload="false"></ejs-uploader>
<script>
function onFileSelected(args) {
    // Limit to 5 files maximum
    args.filesData.splice(5);
    var uploadObj = document.getElementById("UploadFiles").ej2_instances[0];
    var filesData = uploadObj.getFilesData();
    var allFiles = filesData.concat(args.filesData);
    if (allFiles.length > 5) {
        for (var i = 0; i < allFiles.length; i++) {
            if (allFiles.length > 5) { allFiles.shift(); }
        }
        args.filesData = allFiles;
        args.modifiedFilesData = args.filesData;
    }
    args.isModified = true;
}
</script>
```

---

### success
- **TagHelper attr:** `success`
- **Description:** Triggers when the AJAX request succeeds for uploading or removing files.

```html
@{
    var asyncSettings = new Syncfusion.EJ2.Inputs.UploaderAsyncSettings {
        SaveUrl = "Home/Save", RemoveUrl = "Home/Remove"
    };
}
<ejs-uploader id="uploadFiles" asyncSettings="@asyncSettings" success="onUploadSuccess" failure="onUploadFailure" autoUpload="false"></ejs-uploader>
<script>
function onUploadSuccess(args) {
    // args.operation - 'upload' or 'remove'
    // args.file      - file object
    // args.response  - server response (args.e.target.responseText)
    if (args.operation === 'upload') {
        console.log('success');
    }
}
function onUploadFailure(args) {
    console.log('failed');
}
</script>
```

---

### uploading
- **TagHelper attr:** `uploading`
- **Description:** Triggers when the upload process starts for each file. Used to add additional parameters or request headers.

```html
@{
    var asyncSettings = new Syncfusion.EJ2.Inputs.UploaderAsyncSettings {
        SaveUrl = "Home/Save", RemoveUrl = "Home/Remove"
    };
}
<ejs-uploader id="UploadFiles" dropArea=".control-fluid" uploading="addHeaders" removing="addHeaders" asyncSettings="@asyncSettings"></ejs-uploader>
<script>
function addHeaders(args) {
    args.currentRequest.setRequestHeader('custom-header', 'Syncfusion');
}
</script>
```

---

## Deprecated Events

> The following event is deprecated. Use `fileListRendering` instead.

### rendering *(deprecated)*
- **TagHelper attr:** `rendering`
- **Description:** DEPRECATED. Triggers before rendering each file item from the file list. Use `fileListRendering` instead.

---

## Summary Table

### Properties

| C# Property | TagHelper Attribute | Type | Default |
|-------------|-------------------|------|---------|
| `AllowedExtensions` | `allowedExtensions` | string | `""` |
| `AsyncSettings` | `asyncSettings` / `<e-uploader-asyncsettings>` | UploaderAsyncSettings | null |
| `AutoUpload` | `autoUpload` | bool | `true` |
| `Buttons` | `<e-uploader-buttons>` | UploaderButtonsProps | null |
| `CssClass` | `cssClass` | string | `""` |
| `DirectoryUpload` | `directoryUpload` | bool | `false` |
| `DropArea` | `dropArea` | string | null |
| `DropEffect` | `dropEffect` | DropEffect | `Default` |
| `Enabled` | `enabled` | bool | `true` |
| `EnableHtmlSanitizer` | `enableHtmlSanitizer` | bool | `true` |
| `EnablePersistence` | `enablePersistence` | bool | `false` |
| `EnableRtl` | `enableRtl` | bool | `false` |
| `Files` | `<e-uploader-files>` | List\<UploaderUploadedFiles\> | null |
| `HtmlAttributes` | `htmlAttributes` | object | null |
| `Locale` | `locale` | string | `""` |
| `MaxFileSize` | `maxFileSize` | double | `30000000` |
| `MinFileSize` | `minFileSize` | double | `0` |
| `Multiple` | `multiple` | bool | `true` |
| `SequentialUpload` | `sequentialUpload` | bool | `false` |
| `ShowFileList` | `showFileList` | bool | `true` |
| `Template` | `template` | string | null |

### Events

| C# Event | TagHelper Attribute | Description |
|----------|-------------------|-------------|
| `ActionComplete` | `actionComplete` | All files processed |
| `BeforeRemove` | `beforeRemove` | Before server remove |
| `BeforeUpload` | `beforeUpload` | Before upload starts |
| `Canceling` | `canceling` | Chunk upload cancelled |
| `Change` | `change` | File list changed |
| `ChunkFailure` | `chunkFailure` | Chunk upload failed |
| `ChunkSuccess` | `chunkSuccess` | Chunk upload succeeded |
| `ChunkUploading` | `chunkUploading` | Chunk upload started |
| `Clearing` | `clearing` | Before file list clear |
| `Created` | `created` | Component created |
| `Failure` | `failure` | Upload/remove AJAX failed |
| `FileListRendering` | `fileListRendering` | Before file item render |
| `Pausing` | `pausing` | Chunk upload paused |
| `Progress` | `progress` | Upload progress update |
| `Removing` | `removing` | Before file removal |
| `Resuming` | `resuming` | Chunk upload resumed |
| `Selected` | `selected` | Files selected/dropped |
| `Success` | `success` | Upload/remove AJAX succeeded |
| `Uploading` | `uploading` | Upload request started |

### UploaderAsyncSettings Sub-Properties

| C# Property | Child Tag / Model Attribute | Type | Default | Description |
|-------------|---------------------------|------|---------|-------------|
| `SaveUrl` | `saveUrl` / `SaveUrl` | string | `""` | Server endpoint for saving files |
| `RemoveUrl` | `removeUrl` / `RemoveUrl` | string | `""` | Server endpoint for removing files |
| `ChunkSize` | `chunkSize` / `ChunkSize` | double | `0` | Chunk size in bytes (0 = disabled) |
| `RetryCount` | `retryCount` / `RetryCount` | int | `3` | Number of retry attempts per chunk |
| `RetryAfterDelay` | `retryAfterDelay` / `RetryAfterDelay` | int | `500` | Delay (ms) before chunk retry |
````
