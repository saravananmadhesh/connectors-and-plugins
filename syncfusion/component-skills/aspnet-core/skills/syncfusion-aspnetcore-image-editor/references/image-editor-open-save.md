# Open & Save — Syncfusion ASP.NET Core Image Editor

## ⚠️ Security Note: Always Use Local Image Sources

**DO NOT** load images from external/untrusted URLs in production. All code examples below use local image paths (`/images/...`) to comply with security policies. Always:
- ✅ Host image files locally in `wwwroot/images/`
- ✅ Use base64 encoding for user uploads (via FileReader)
- ✅ Validate file types and sizes server-side
- ✅ Never pass untrusted URLs to `imageEditor.open()` or `drawImage()`

See [Security & Trust Boundary](../SKILL.md#security--trust-boundary) for details.

## Table of Contents
- [Supported Formats](#supported-formats)
- [Opening Images](#opening-images)
  - [Open a Local File](#open-a-local-file)
  - [Open from Base64](#open-from-base64)
  - [Open from Blob](#open-from-blob)
  - [Open from File Uploader](#open-from-file-uploader)
  - [Open with Custom Dimensions](#open-with-custom-dimensions)
- [Saving Images](#saving-images)
  - [export() Method](#export-method)
  - [Save as Base64](#save-as-base64)
  - [Save as Blob](#save-as-blob)
  - [Prevent Default Save and Save to Server](#prevent-default-save-and-save-to-server)
- [Utility Methods](#utility-methods)
  - [clearImage()](#clearimage)
  - [reset()](#reset)
- [Open & Save Events](#open--save-events)
- [Render in a Dialog](#render-in-a-dialog)
- [Add Watermarks on Open](#add-watermarks-on-open)

---

## Supported Formats

The Image Editor supports **PNG, JPEG, SVG, WEBP, and BMP**. The default export format is PNG unless specified otherwise.

---

## Opening Images

### Open a Local File

```cshtml
<ejs-imageeditor id="image-editor" created="created"></ejs-imageeditor>

<script>
function created() {
    var imageEditorObj = ej.base.getComponent(document.getElementById('image-editor'), 'image-editor');
    // Load from local wwwroot/images/ folder (NEVER use external URLs)
    if (ej.base.Browser.isDevice) {
        imageEditorObj.open('/images/flower.png');
    } else {
        imageEditorObj.open('/images/bridge.png');
    }
}
</script>
```

### Open from Base64

Pass a Base64-encoded data URL string directly to `open()`:

```cshtml
<ejs-imageeditor id="image-editor" created="created"></ejs-imageeditor>
<ejs-button id="savebase64" onclick="savebase64()" cssClass="e-primary" content="SAVE BASE64"></ejs-button>
<ejs-button id="openbase64" onclick="openbase64()" cssClass="e-primary" content="OPEN BASE64"></ejs-button>

<script>
var base64String;

function created() {
    var imageEditorObj = ej.base.getComponent(document.getElementById('image-editor'), 'image-editor');
    // Load from local wwwroot/images/ folder (NEVER use external URLs)
    if (ej.base.Browser.isDevice) {
        imageEditorObj.open('/images/flower.png');
    } else {
        imageEditorObj.open('/images/bridge.png');
    }
}

function savebase64() {
    var imageEditorObj = ej.base.getComponent(document.getElementById('image-editor'), 'image-editor');
    var imageData = imageEditorObj.getImageData();
    var canvas = document.createElement('canvas');
    canvas.width = imageData.width;
    canvas.height = imageData.height;
    var context = canvas.getContext('2d');
    context.putImageData(imageData, 0, 0);
    base64String = canvas.toDataURL();
}

function openbase64() {
    var imageEditorObj = ej.base.getComponent(document.getElementById('image-editor'), 'image-editor');
    imageEditorObj.open(base64String);
}
</script>
```

> Retrieve the current image as base64 using `getImageData()` — see [Save as Base64](#save-as-base64).

### Open from Blob

```cshtml
<ejs-imageeditor id="image-editor" created="created"></ejs-imageeditor>
<ejs-button id="saveBlob" onclick="saveBlob()" cssClass="e-primary" content="SAVE BLOB"></ejs-button>
<ejs-button id="openBlob" onclick="openBlob()" cssClass="e-primary" content="OPEN BLOB"></ejs-button>

<script>
var blobUrl;

function created() {
    var imageEditorObj = ej.base.getComponent(document.getElementById('image-editor'), 'image-editor');
    if (ej.base.Browser.isDevice) {
        imageEditorObj.open('/images/flower.png');
    } else {
        imageEditorObj.open('/images/bridge.png');
    }
}

function saveBlob() {
    var imageEditorObj = ej.base.getComponent(document.getElementById('image-editor'), 'image-editor');
    var imageData = imageEditorObj.getImageData();
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    canvas.width = imageData.width;
    canvas.height = imageData.height;
    ctx.putImageData(imageData, 0, 0);
    canvas.toBlob(function(blob) {
        blobUrl = URL.createObjectURL(blob);
    });
}

function openBlob() {
    var imageEditorObj = ej.base.getComponent(document.getElementById('image-editor'), 'image-editor');
    imageEditorObj.open(blobUrl);
}
</script>
```

### Open from File Uploader

Combine the Syncfusion Uploader with the Image Editor. Use the `selected` event to read the chosen file and pass it to `open()`:

```cshtml
@{
    // Use local endpoints instead of external Syncfusion service
    var asyncSettings = new Syncfusion.EJ2.Inputs.UploaderAsyncSettings {
        SaveUrl = @Url.Content("/api/uploader/save"),
        RemoveUrl = @Url.Content("/api/uploader/remove")
    };
}

<ejs-uploader id="UploadFiles" asyncSettings="@asyncSettings" showFileList="false" selected="selected"></ejs-uploader>
<ejs-imageeditor id="image-editor" created="created"></ejs-imageeditor>

<script>
function created() {
    var imageEditorObj = ej.base.getComponent(document.getElementById('image-editor'), 'image-editor');
    if (ej.base.Browser.isDevice) {
        imageEditorObj.open('/images/flower.png');
    } else {
        imageEditorObj.open('/images/bridge.png');
    }
}

function selected(args) {
    var imageEditorObj = ej.base.getComponent(document.getElementById('image-editor'), 'image-editor');
    if (args.filesData.length > 0) {
        var reader = new FileReader();
        reader.onload = function() {
            imageEditorObj.open(reader.result);
        };
        reader.readAsDataURL(args.filesData[0].rawFile);
    }
}
</script>
```

### Open with Custom Dimensions

Use the `imageSettings` parameter to control how the image is sized when loaded:

```cshtml
@{
    var toolbar = new string[] { };
}
<div>
    <ejs-button id="contain" cssClass="e-primary" content="Fit to Width (Aspect Ratio)" onclick="contain()"></ejs-button>
    <ejs-button id="cover" cssClass="e-primary" content="Cover (Aspect Ratio)" onclick="cover()"></ejs-button>
    <ejs-button id="stretch" cssClass="e-primary" content="Stretch / Shrink" onclick="stretch()"></ejs-button>
</div>
<ejs-imageeditor id="image-editor" width="550px" height="350px" created="created" toolbar="@toolbar"></ejs-imageeditor>

<script>
function created() {
    var imageEditorObj = ej.base.getComponent(document.getElementById('image-editor'), 'image-editor');
    imageEditorObj.open('/images/bridge.png');
}

function contain() {
    var imageEditorObj = ej.base.getComponent(document.getElementById('image-editor'), 'image-editor');
    // Contains: specify width only, height auto-calculated to maintain aspect ratio
    imageEditorObj.open('/images/bridge.png',
        true, { backgroundColor: '', width: 550, height: null, isAspectRatio: true });
}

function cover() {
    var imageEditorObj = ej.base.getComponent(document.getElementById('image-editor'), 'image-editor');
    // Cover: both dimensions, scales proportionally within them
    imageEditorObj.open('/images/bridge.png',
        true, { backgroundColor: '', width: 550, height: 550, isAspectRatio: true });
}

function stretch() {
    var imageEditorObj = ej.base.getComponent(document.getElementById('image-editor'), 'image-editor');
    // Stretch: exact dimensions, ignores original aspect ratio
    imageEditorObj.open('/images/bridge.png',
        true, { backgroundColor: '', width: 350, height: 350, isAspectRatio: false });
}
</script>
```

**`imageSettings` behaviors:**

| `width` | `height` | `isAspectRatio` | Behavior |
|---------|----------|-----------------|----------|
| set | not set | true | Contains — height auto-calculated |
| set | set | true | Cover — scales proportionally |
| set | set | false | Stretch — exact dimensions, no aspect ratio |

---

## Saving Images

### export() Method

Downloads the edited image to the user's device:

```cshtml
@{
    var imageTool = new string[] { };
}
<ejs-imageeditor id="image-editor" created="created" toolbar="@imageTool"></ejs-imageeditor>
<ejs-button id="btnClick" onclick="clickHandler()" cssClass="e-primary" content="Save PNG"></ejs-button>

<script>
function created() {
    var imageEditorObj = ej.base.getComponent(document.getElementById('image-editor'), 'image-editor');
    if (ej.base.Browser.isDevice) {
        imageEditorObj.open('/images/flower.png');
    } else {
        imageEditorObj.open('/images/bridge.png');
    }
}

function clickHandler() {
    var imageEditorObj = ej.base.getComponent(document.getElementById('image-editor'), 'image-editor');
    // export(type, fileName) — file type first, then file name
    imageEditorObj.export('PNG', 'Syncfusion');
}
</script>
```

**Supported `export()` types:** `'PNG'`, `'JPEG'`, `'SVG'`, `'WEBP'`

### Save as Base64

Use `getImageData()` to retrieve image data, convert to a canvas, then call `toDataURL()`:

```cshtml
<ejs-imageeditor id="image-editor" created="created"></ejs-imageeditor>
<ejs-button id="saveImage" onclick="saveImage()" cssClass="e-primary" content="Save Image"></ejs-button>

<script>
var base64String;

function created() {
    var imageEditorObj = ej.base.getComponent(document.getElementById('image-editor'), 'image-editor');
    if (ej.base.Browser.isDevice) {
        imageEditorObj.open('/images/flower.png');
    } else {
        imageEditorObj.open('/images/bridge.png');
    }
}

function saveImage() {
    var imageEditorObj = ej.base.getComponent(document.getElementById('image-editor'), 'image-editor');
    var imageData = imageEditorObj.getImageData();
    var canvas = document.createElement('canvas');
    canvas.width = imageData.width;
    canvas.height = imageData.height;
    var context = canvas.getContext('2d');
    context.putImageData(imageData, 0, 0);
    // Convert canvas content to Base64 encoded URL
    base64String = canvas.toDataURL();
    console.log('Base64:', base64String);
}
</script>
```

### Save as Blob

```cshtml
@{
    var imageTool = new string[] { };
}
<ejs-imageeditor id="image-editor" created="created" toolbar="@imageTool"></ejs-imageeditor>
<ejs-button id="saveBlob" onclick="saveBlob()" cssClass="e-primary" content="Save Blob"></ejs-button>

<script>
var blobUrl;

function created() {
    var imageEditorObj = ej.base.getComponent(document.getElementById('image-editor'), 'image-editor');
    if (ej.base.Browser.isDevice) {
        imageEditorObj.open('/images/flower.png');
    } else {
        imageEditorObj.open('/images/bridge.png');
    }
}

function saveBlob() {
    var imageEditorObj = ej.base.getComponent(document.getElementById('image-editor'), 'image-editor');
    var imageData = imageEditorObj.getImageData();
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    canvas.width = imageData.width;
    canvas.height = imageData.height;
    ctx.putImageData(imageData, 0, 0);
    canvas.toBlob(function(blob) {
        blobUrl = URL.createObjectURL(blob);
    });
}
</script>
```

### Prevent Default Save and Save to Server

Use the `beforeSave` event to cancel the default download. Then use `getImageData()` to process the image:

```cshtml
<ejs-imageeditor id="image-editor" created="created" beforeSave="beforeSaved" saved="saved"></ejs-imageeditor>

<script>
function created() {
    var imageEditorObj = ej.base.getComponent(document.getElementById('image-editor'), 'image-editor');
    if (ej.base.Browser.isDevice) {
        imageEditorObj.open('/images/flower.png');
    } else {
        imageEditorObj.open('/images/bridge.png');
    }
}

function beforeSaved(args) {
    // Prevent default browser download
    args.cancel = true;
    var imageEditorObj = ej.base.getComponent(document.getElementById('image-editor'), 'image-editor');
    var imageData = imageEditorObj.getImageData();
    var canvas = document.createElement('canvas');
    canvas.width = imageData.width;
    canvas.height = imageData.height;
    canvas.getContext('2d').putImageData(imageData, 0, 0);
    // Convert and send to server
    canvas.toBlob(function(blob) {
        var formData = new FormData();
        formData.append('file', blob, 'image.png');
        fetch('/Home/SaveImage', { method: 'POST', body: formData });
    }, 'image/png');
}

function saved() {
    console.log('Saved event fired');
}
</script>
```

---

## Utility Methods

### clearImage()

Clears the loaded image from the editor canvas. Useful when re-opening the editor inside a dialog — call `clearImage()` before closing so the previous image is not retained on next open.

```javascript
var imageEditorObj = ej.base.getComponent(document.getElementById('image-editor'), 'image-editor');
imageEditorObj.clearImage();
```

### reset()

Reverts all edits and restores the image to its original state (as first loaded):

```javascript
var imageEditorObj = ej.base.getComponent(document.getElementById('image-editor'), 'image-editor');
imageEditorObj.reset();
```

---

## Open & Save Events

### FileOpened Event

Triggered after an image is successfully loaded. Provides file name and type.

```cshtml
<ejs-imageeditor id="image-editor" fileOpened="onFileOpened"></ejs-imageeditor>

<script>
function onFileOpened(args) {
    // args.fileName - name of opened file (string)
    // args.fileType - format of file: 'PNG', 'JPEG', 'SVG', 'WEBP', 'BMP'
    console.log('Opened:', args.fileName, 'Type:', args.fileType);
}
</script>
```

### Saving Event

Triggered when the user initiates a save. Provides file name and type; set `cancel: true` to prevent save.

```cshtml
<ejs-imageeditor id="image-editor" saving="onSaving"></ejs-imageeditor>

<script>
function onSaving(args) {
    // args.fileName - name for the saved file
    // args.fileType - format: 'PNG', 'JPEG', 'SVG', 'WEBP'
    // args.cancel - set true to prevent download
    console.log('Saving as:', args.fileName, args.fileType);
}
</script>
```

### BeforeSave Event

Triggered just before the image is downloaded. Use to override save behavior:

```cshtml
<ejs-imageeditor id="image-editor" beforeSave="onBeforeSave"></ejs-imageeditor>

<script>
function onBeforeSave(args) {
    args.cancel = true; // prevent default download
    // custom save logic here
}
</script>
```

---

## Render in a Dialog

Place the Image Editor inside a Syncfusion Dialog. Use `clearImage()` when closing to prevent stale images on re-open:

```cshtml
<ejs-button id="openDialog" content="Open Editor" isPrimary="true"
            onclick="showDialog()"></ejs-button>

<ejs-dialog id="editorDialog" header="Image Editor" width="800px" height="600px"
            isModal="true" visible="false" close="onDialogClose">
    <e-content-template>
        <ejs-imageeditor id="image-editor"></ejs-imageeditor>
    </e-content-template>
</ejs-dialog>

<script>
function showDialog() {
    var dialog = ej.base.getComponent(document.getElementById('editorDialog'), 'dialog');
    dialog.show();
    var imageEditorObj = ej.base.getComponent(document.getElementById('image-editor'), 'image-editor');
    imageEditorObj.open('/images/bridge.png');
}

function onDialogClose() {
    var imageEditorObj = ej.base.getComponent(document.getElementById('image-editor'), 'image-editor');
    imageEditorObj.clearImage(); // clear so next open is fresh
}
</script>
```

---

## Add Watermarks on Open

Use the `FileOpened` event to automatically draw a watermark text after every image load:

```cshtml
<ejs-imageeditor id="image-editor" fileOpened="addWatermark"></ejs-imageeditor>

<script>
function addWatermark(args) {
    var imageEditorObj = ej.base.getComponent(document.getElementById('image-editor'), 'image-editor');
    var dimension = imageEditorObj.getImageDimension();
    // drawText(x, y, text, fontFamily, fontSize, bold, italic, color)
    imageEditorObj.drawText(dimension.x, dimension.y, '© MyCompany', 'Arial', 24, true, false, '#80FF0000');
}
</script>
```


