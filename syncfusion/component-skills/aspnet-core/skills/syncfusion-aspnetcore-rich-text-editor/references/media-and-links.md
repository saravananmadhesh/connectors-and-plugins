# Media & Links

## Table of Contents
- [Image Insertion](#image-insertion)
- [Saving Images to Server](#saving-images-to-server)
- [Image Quick Toolbar](#image-quick-toolbar)
- [Image Settings](#image-settings)
- [Video and Audio](#video-and-audio)
- [Link Insertion](#link-insertion)
- [File Browser Integration](#file-browser-integration)

---

## Image Insertion

Add `Image` to the toolbar items to enable image insertion:

```razor
<ejs-richtexteditor id="editor" value="@ViewBag.value">
    <e-richtexteditor-toolbarsettings items="@ViewBag.items"></e-richtexteditor-toolbarsettings>
</ejs-richtexteditor>
```

```csharp
ViewBag.items = new[] { "Image", "Bold", "Italic", "CreateLink" };
```

**Insertion methods available to users:**
- **URL** — paste a web image URL into the dialog
- **Local upload** — browse the local file system (uploads as Blob by default)
- **Drag and drop** — drag image files from file explorer directly into the editor
- **Paste** — paste images copied from clipboard

### Setting Save Format (Blob vs Base64)

By default images are saved as Blob. Switch to Base64 to embed images directly in HTML:

```razor
<ejs-richtexteditor id="editor">
    <e-richtexteditor-insertimagesettings saveFormat="Base64"></e-richtexteditor-insertimagesettings>
</ejs-richtexteditor>
```

---

## Saving Images to Server

Upload images to a server-side endpoint using `saveUrl`. Images are saved via a controller action.

```razor
<ejs-richtexteditor id="editor">
    <e-richtexteditor-insertimagesettings
        saveUrl="/Home/SaveImage"
        removeUrl="/Home/RemoveImage"
        path="./Uploads/">
    </e-richtexteditor-insertimagesettings>
</ejs-richtexteditor>
```

```csharp
[AcceptVerbs("Post")]
public void SaveImage(IList<IFormFile> UploadFiles)
{
    try
    {
        foreach (IFormFile file in UploadFiles)
        {
            string filename = ContentDispositionHeaderValue
                .Parse(file.ContentDisposition).FileName.Trim('"');
            filename = Path.Combine(hostingEnv.WebRootPath, "Uploads", filename);

            if (!Directory.Exists(Path.Combine(hostingEnv.WebRootPath, "Uploads")))
                Directory.CreateDirectory(Path.Combine(hostingEnv.WebRootPath, "Uploads"));

            if (!System.IO.File.Exists(filename))
            {
                using (FileStream fs = System.IO.File.Create(filename))
                {
                    file.CopyTo(fs);
                    fs.Flush();
                }
                Response.StatusCode = 200;
            }
        }
    }
    catch (Exception) { Response.StatusCode = 204; }
}

[AcceptVerbs("Post")]
public void RemoveImage(IList<IFormFile> UploadFiles)
{
    // Delete logic here
    Response.StatusCode = 200;
}
```

### Add Authentication Header to Image Upload

```razor
<ejs-richtexteditor id="editor" ImageUploading="onImageUploading">
    <e-richtexteditor-insertimagesettings saveUrl="/Home/SaveFiles" path="./Files/">
    </e-richtexteditor-insertimagesettings>
</ejs-richtexteditor>
<script>
    function onImageUploading(args) {
        args.currentRequest.setRequestHeader('Authorization', 'Bearer YOUR_TOKEN');
    }
</script>
```

### Restrict File Size

```razor
<ejs-richtexteditor id="editor">
    <!-- maxFileSize in bytes; default is 30,000,000 (30 MB) -->
    <e-richtexteditor-insertimagesettings maxFileSize="5000000"></e-richtexteditor-insertimagesettings>
</ejs-richtexteditor>
```

### Restrict Allowed File Types

```razor
<ejs-richtexteditor id="editor">
    <e-richtexteditor-insertimagesettings
        allowedTypes="@(new string[] {".jpg", ".png", ".gif"})">
    </e-richtexteditor-insertimagesettings>
</ejs-richtexteditor>
```

---

## Image Quick Toolbar

Configure actions available when the user clicks an inserted image:

```razor
<ejs-richtexteditor id="editor" value="@ViewBag.value">
    <e-richtexteditor-toolbarsettings items="@ViewBag.items"></e-richtexteditor-toolbarsettings>
    <e-richtexteditor-quicktoolbarsettings image="@ViewBag.imageTools">
    </e-richtexteditor-quicktoolbarsettings>
</ejs-richtexteditor>
```

```csharp
ViewBag.items = new[] { "Image" };
ViewBag.imageTools = new[] {
    "Replace", "Align", "Caption", "Remove",
    "InsertLink", "OpenImageLink", "|",
    "EditImageLink", "RemoveImageLink",
    "Display", "AltText", "Dimension", "WrapText"
};
```

**Quick toolbar options:**
- `Replace` — swap the image with another
- `Align` — set block alignment (left, center, right)
- `WrapText` — float image left/right so text wraps around it
- `Caption` — add a figcaption below the image
- `AltText` — set alternative text for accessibility
- `Dimension` — resize (width × height) via dialog
- `Display` — toggle inline vs block display
- `Remove` — delete the image

---

## Image Settings

```razor
<ejs-richtexteditor id="editor">
    <e-richtexteditor-insertimagesettings
        display="inline"
        width="300"
        height="200"
        saveFormat="Blob"
        saveUrl="/Home/SaveImage"
        path="./Uploads/"
        allowedTypes="@(new string[] { ".jpg", ".png", ".jpeg" })">
    </e-richtexteditor-insertimagesettings>
</ejs-richtexteditor>
```

| Property | Description |
|----------|-------------|
| `display` | Default display: `"inline"` or `"break"` (block) |
| `width` | Default image width in pixels |
| `height` | Default image height in pixels |
| `saveFormat` | `"Blob"` (default) or `"Base64"` |
| `saveUrl` | Server endpoint for upload |
| `removeUrl` | Server endpoint for delete |
| `path` | Server-side path prefix for inserted image `src` |
| `allowedTypes` | Array of allowed file extensions |
| `maxFileSize` | Maximum upload size in bytes |

---

## Video and Audio

Add `Video` and `Audio` to the toolbar to enable media insertion. They work similarly to images with their own settings:

```razor
<ejs-richtexteditor id="editor">
    <e-richtexteditor-toolbarsettings items="@ViewBag.items"></e-richtexteditor-toolbarsettings>
</ejs-richtexteditor>
```

```csharp
ViewBag.items = new[] { "Image", "Video", "Audio", "CreateLink" };
```

Video and audio support URL insertion, local upload, and quick toolbar actions similar to images.

---

## Link Insertion

Add `CreateLink` to the toolbar to enable hyperlink insertion:

```csharp
ViewBag.items = new[] { "CreateLink" };
```

Configure the link quick toolbar for editing, opening, and removing links:

```razor
<e-richtexteditor-quicktoolbarsettings link="@ViewBag.linkTools">
</e-richtexteditor-quicktoolbarsettings>
```

```csharp
ViewBag.linkTools = new[] { "Open", "Edit", "UnLink" };
```

---

## File Browser Integration

Integrate Syncfusion's File Manager to browse server-side files for image insertion:

```razor
<ejs-richtexteditor id="editor">
    <e-richtexteditor-toolbarsettings items="@ViewBag.items"></e-richtexteditor-toolbarsettings>
    <e-richtexteditor-filemanagersettings enable="true"
        browseOnFileSelect="false"
        ajaxSettings="@ViewBag.ajaxSettings">
    </e-richtexteditor-filemanagersettings>
</ejs-richtexteditor>
```

```csharp
ViewBag.items = new[] { "FileManager", "Image" };
ViewBag.ajaxSettings = new
{
    url = "/FileManager/FileOperations",
    uploadUrl = "/FileManager/Upload",
    downloadUrl = "/FileManager/Download",
    getImageUrl = "/FileManager/GetImage"
};
```

Add `FileManager` to the toolbar items list to show the file browser button.
