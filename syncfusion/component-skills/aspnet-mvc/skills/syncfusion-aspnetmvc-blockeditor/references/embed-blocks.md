# Embed Blocks (Image & Code) — Syncfusion ASP.NET MVC Block Editor

## Table of Contents
- [Image Blocks](#image-blocks)
- [Image Upload to Server](#image-upload-to-server)
- [Secure Upload with Authentication](#secure-upload-with-authentication)
- [File Upload Events](#file-upload-events)
- [Code Blocks](#code-blocks)

---

## Image Blocks

### Basic Image Block

Set `blockType = "Image"` and configure display properties in `properties`:

```csharp
public class BlockModel
{
    public string id { get; set; }
    public string blockType { get; set; }
    public object properties { get; set; }
    public List<object> content { get; set; }
}

new BlockModel
{
    blockType = "Image",
    properties = new
    {
        src = "https://cdn.syncfusion.com/ej2/richtexteditor-resources/RTE-Overview.png",
        altText = "Block Editor overview",
        width = "400px",
        height = "200px"
    }
}
```

### Image Block Properties

| Property | Description | Default |
|---|---|---|
| `src` | Image URL or base64 string | `""` |
| `altText` | Alternative text when image cannot load | `""` |
| `width` | Display width | `""` |
| `height` | Display height | `""` |

### Global ImageBlockSettings

Configure global defaults for all image blocks using `ImageBlockSettings` on the editor root:

```csharp
using Syncfusion.EJ2.BlockEditor;

public ImageBlockSettings ImageBlockSettings { get; set; }

public ActionResult Index()
{
    ImageBlockSettings = new ImageBlockSettings
    {
        MaxFileSize = 10000000,                                 // 10 MB limit
        AllowedTypes = new string[] { ".jpg", ".jpeg", ".png" },
        SaveFormat = ImageSaveFormat.Base64,                    // Base64 or Blob
        EnableResize = true,
        Width = "auto",
        Height = "auto"
    };
    ViewData["ImageBlockSettings"] = ImageBlockSettings;
    return View();
}
```

```razor
@Html.EJS().BlockEditor("block-editor")
    .ImageBlockSettings((ImageBlockSettings)ViewData["ImageBlockSettings"])
    .Render()
```

### ImageBlockSettings Reference

| Property | Description | Default |
|---|---|---|
| `saveUrl` | Server endpoint for image upload | `""` |
| `maxFileSize` | Max upload size in bytes | `30000000` (30 MB) |
| `path` | Base path for stored images on server | `""` |
| `saveFormat` | `Base64` or `Blob` | `Base64` |
| `allowedTypes` | Permitted file extensions | `[".jpg", ".jpeg", ".png"]` |
| `width` | Default display width | `"auto"` |
| `height` | Default display height | `"auto"` |
| `enableResize` | Allow image resizing by drag | `true` |
| `minWidth` | Minimum resize width | `""` |
| `maxWidth` | Maximum resize width | `""` |
| `minHeight` | Minimum resize height | `""` |
| `maxHeight` | Maximum resize height | `""` |

### Image Resizing

When `enableResize = true` (default), resize handles appear at each corner of a focused image. Users drag these handles to resize proportionally based on aspect ratio. If resizing exceeds the layout width, a horizontal scrollbar appears.

### Inserting from Web URL

When a user clicks an Image block's insert area, a popup appears with two tabs: local file browser and an **Embed Link** tab with a URL input field. No additional configuration is required.

---

## Image Upload to Server

To save uploaded images to your server, set `saveUrl` and `path` in `ImageBlockSettings`:

```razor
@Html.EJS().BlockEditor("blockEditor")
    .ImageBlockSettings((ImageBlockSettings)ViewData["ImageBlockSettings"])
    .Render()
```

```csharp
ImageBlockSettings = new ImageBlockSettings
{
    SaveUrl = "/api/Home/SaveImage",
    Path = "/Uploads/"
};
ViewData["ImageBlockSettings"] = ImageBlockSettings;
```

**Controller action to handle the upload:**

```csharp
[AcceptVerbs("Post")]
public void SaveImage(HttpPostedFileBase UploadFiles)
{
    if (UploadFiles != null)
    {
        string path = Server.MapPath("~/Uploads/");
        if (!Directory.Exists(path))
        {
            Directory.CreateDirectory(path);
        }
        UploadFiles.SaveAs(path + Path.GetFileName(UploadFiles.FileName));
    }
}
```

---

## Secure Upload with Authentication

Use the `FileUploading` event to add custom request headers (e.g., Authorization tokens) before the upload request is sent:

```razor
@Html.EJS().BlockEditor("blockEditor")
    .ImageBlockSettings((ImageBlockSettings)ViewData["ImageBlockSettings"])
    .FileUploading("fileUploading")
    .Render()

<script>
    function fileUploading(args) {
        args.currentRequest.setRequestHeader('Authorization', 'Bearer YOUR_TOKEN');
    }
</script>
```

**Retrieve the header on the server:**

```csharp
[AcceptVerbs("Post")]
public void SaveImage(HttpPostedFileBase UploadFiles)
{
    string authToken = Request.Form["Authorization"].ToString(); // Read custom header
    if (UploadFiles != null)
    {
        string path = Server.MapPath("~/Files/");
        if (!Directory.Exists(path))
        {
            Directory.CreateDirectory(path);
        }
        UploadFiles.SaveAs(path + Path.GetFileName(UploadFiles.FileName));
    }
}
```

---

## File Upload Events

Three events cover the full image upload lifecycle. Wire them using the same chained helper pattern:

### BeforeFileUpload

Fires before the upload request is sent. Set `args.cancel = true` to abort the upload (e.g., for custom client-side validation).

```razor
@Html.EJS().BlockEditor("blockEditor")
    .ImageBlockSettings((ImageBlockSettings)ViewData["ImageBlockSettings"])
    .BeforeFileUpload("onBeforeFileUpload")
    .Render()

<script>
    function onBeforeFileUpload(args) {
        // args.fileData contains file name, size, type
        if (args.fileData.size > 5000000) {
            args.cancel = true;   // Block files larger than 5 MB
            alert('File exceeds the 5 MB limit.');
        }
    }
</script>
```

### FileUploadSuccess

Fires after the server returns a successful response. Use `args.fileUrl` to retrieve the URL of the saved image when uploading in `Blob` format.

```razor
@Html.EJS().BlockEditor("blockEditor")
    .ImageBlockSettings((ImageBlockSettings)ViewData["ImageBlockSettings"])
    .FileUploadSuccess("onFileUploadSuccess")
    .Render()

<script>
    function onFileUploadSuccess(args) {
        // args.fileUrl — server-returned URL of the uploaded image
        // args.file    — FileInfo object (name, size, type)
        console.log('Uploaded to:', args.fileUrl);
    }
</script>
```

### FileUploadFailed

Fires when the upload fails or the server returns an error. Use this to surface error feedback to the user.

```razor
@Html.EJS().BlockEditor("blockEditor")
    .ImageBlockSettings((ImageBlockSettings)ViewData["ImageBlockSettings"])
    .FileUploadFailed("onFileUploadFailed")
    .Render()

<script>
    function onFileUploadFailed(args) {
        // args contains failure details from the server response
        console.error('Upload failed:', args);
        alert('Image upload failed. Please try again.');
    }
</script>
```

### Combining All Upload Events

```razor
@Html.EJS().BlockEditor("blockEditor")
    .ImageBlockSettings((ImageBlockSettings)ViewData["ImageBlockSettings"])
    .BeforeFileUpload("onBeforeFileUpload")
    .FileUploading("onFileUploading")
    .FileUploadSuccess("onFileUploadSuccess")
    .FileUploadFailed("onFileUploadFailed")
    .Render()

<script>
    function onBeforeFileUpload(args) {
        // Validate before upload; set args.cancel = true to abort
    }

    function onFileUploading(args) {
        // Add custom headers, e.g. auth token
        args.currentRequest.setRequestHeader('Authorization', 'Bearer YOUR_TOKEN');
    }

    function onFileUploadSuccess(args) {
        console.log('Image saved at:', args.fileUrl);
    }

    function onFileUploadFailed(args) {
        alert('Upload failed. Please try again.');
    }
</script>
```

---

## Code Blocks

### Basic Code Block

```csharp
new BlockModel
{
    blockType = "Code",
    content = new List<object>
    {
        new { contentType = "Text", content = "function greet() {\n  console.log('Hello!');\n}" }
    }
}
```

### Code Block with Language

Set `language` in `properties` to apply syntax highlighting. The language must match an entry in `CodeBlockSettings.languages`:

```csharp
new BlockModel
{
    blockType = "Code",
    properties = new { language = "javascript" },
    content = new List<object>
    {
        new { contentType = "Text", content = "const x = 42;" }
    }
}
```

### Global CodeBlockSettings

Configure available languages and the default across all code blocks:

```csharp
public class CodeBlockSettingsModel
{
    public string defaultLanguage { get; set; }
    public List<object> languages { get; set; }
}

var codeSettings = new CodeBlockSettingsModel
{
    defaultLanguage = "javascript",
    languages = new List<object>
    {
        new { label = "JavaScript", language = "javascript" },
        new { label = "TypeScript", language = "typescript" },
        new { label = "HTML",       language = "html" },
        new { label = "CSS",        language = "css" },
        new { label = "C#",         language = "csharp" }
    }
};
ViewBag.CodeBlocksData = codeSettings;
```

### CodeBlockSettings Reference

| Property | Description | Default |
|---|---|---|
| `defaultLanguage` | Language applied when no per-block language is set | `"javascript"` |
| `languages` | Array of `{ label, language }` shown in language selector | `[]` |

> When `languages` is empty, no language selector is shown and all code renders as plain text.
