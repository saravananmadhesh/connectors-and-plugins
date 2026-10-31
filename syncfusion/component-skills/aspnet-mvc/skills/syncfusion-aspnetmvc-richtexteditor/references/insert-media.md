# Insert Images and Media

This document covers how to insert and manage images, videos, and audio in the Rich Text Editor.

> **Related Documentation:**
> - For complete image/video/audio properties including `InsertImageSettings`, `InsertVideoSettings`, `InsertAudioSettings`, see [properties.md](properties.md)
> - For complete upload-related events including `BeforeImageUpload`, `ImageUploadSuccess`, `FileSelected`, see [events.md](events.md)
> - For programmatic media insertion methods including `executeCommand('insertImage')`, see [methods.md](methods.md)

## Table of Contents
- [Insert Images](#insert-images)
- [Image Upload Configuration](#image-upload-configuration)
- [Check Image Size Before Upload](#check-image-size-before-upload)
- [Insert Video](#insert-video)
- [Insert Audio](#insert-audio)
- [File Browser Integration](#file-browser-integration)

---

## Insert Images

Add the `Image` item to the toolbar to enable image insertion:

**Controller (Recommended Pattern):**
```csharp
ViewBag.tools = new object[] { "Bold", "Italic", "Image", "Undo", "Redo" };
```

**View:**
```cshtml
@(Html.EJS().RichTextEditor("rte")
    .ToolbarSettings(e => e.Items((object)ViewBag.tools))
    .Value(ViewBag.value)
    .Render())
```

Users can insert images by:
- **URL** — typing a direct image URL
- **Upload** — uploading from their local machine (requires `InsertImageSettings.SaveUrl`)
- **Base64** — enabling `InsertImageSettings.SaveFormat` as `Base64`

---

## Image Upload Configuration

> **⚠️ CRITICAL:** Always include the `Image` toolbar item in your toolbar configuration. Without it, the image upload UI is inaccessible to users, making `InsertImageSettings` non-functional.

Configure the server-side upload path and display path:

```cshtml
@(Html.EJS().RichTextEditor("rte")
    .ToolbarSettings(e => e.Items((object)new[] { "Image" }))
    .InsertImageSettings(img => img
        .SaveUrl("/api/images/save")
        .Path("/images/uploads/")
    )
    .Render())
```

- **`SaveUrl`** — controller action that handles the multipart file upload
- **`Path`** — the public base path used to construct the `<img src>` URL after upload

**Example server-side save action:**

```csharp
[HttpPost]
public ActionResult SaveImage(IEnumerable<HttpPostedFileBase> UploadFiles)
{
    foreach (var file in UploadFiles)
    {
        var fileName = file.FileName;
        var savePath = Server.MapPath("~/images/uploads/");
        file.SaveAs(Path.Combine(savePath, fileName));
    }
    return Content("");
}
```

**Rename uploaded images on the server** (to avoid collisions):

```csharp
[HttpPost]
public ActionResult SaveImage(IEnumerable<HttpPostedFileBase> UploadFiles)
{
    foreach (var file in UploadFiles)
    {
        var uniqueName = $"{Guid.NewGuid()}_{file.FileName}";
        file.SaveAs(Path.Combine(Server.MapPath("~/images/uploads/"), uniqueName));

        // Return the new filename so the editor uses it in the src
        return Json(new { name = uniqueName });
    }
    return Content("");
}
```

**Save as Base64 (no server upload):**

```cshtml
.InsertImageSettings(img => img.SaveFormat(SaveFormat.Base64))
```

> Base64 encoding increases content size significantly. Use for small images only.

---

## Image Quick Toolbar

> **⚠️ REQUIREMENT:** The `Image` toolbar item **must be present** in the main toolbar. The quick toolbar only appears when users insert an image via the main toolbar and then interact with it.

The quick toolbar appears when a user clicks on an inserted image. Customize it via `QuickToolbarSettings`.

### Using ViewBag Configuration (Recommended)

Configure image toolbar items in the Controller and pass to the view:

**Controller (HomeController.cs):**
```csharp
public ActionResult Index()
{
    ViewBag.items = new[] { "Image" };
    ViewBag.Image = new[] {
        "Replace", "Align", "Caption", "Remove", "|",
        "InsertLink", "OpenImageLink", "EditImageLink", "RemoveImageLink", "|",
        "Display", "AltText", "Dimension"
    };
    ViewBag.value = @"<p><img src='image.jpg' alt='Sample Image' /></p>";
    return View();
}
```

**View (Index.cshtml):**
```cshtml
@(Html.EJS().RichTextEditor("image")
    .QuickToolbarSettings(e => { e.Image((object)ViewBag.Image); })
    .ToolbarSettings(e => { e.Items((object)ViewBag.items); })
    .InsertImageSettings(img => img
        .SaveUrl("/api/images/save")
        .Path("/images/uploads/")
    )
    .Value(ViewBag.value)
    .Render())
```

### Inline Configuration

```cshtml
@(Html.EJS().RichTextEditor("rte")
    .QuickToolbarSettings(q => q.Image(new[] {
        "Replace", "Align", "Caption", "Remove", "|",
        "InsertLink", "OpenImageLink", "EditImageLink", "RemoveImageLink", "|",
        "Display", "AltText", "Dimension"
    }))
    .ToolbarSettings(e => e.Items((object)new[] { "Image" }))
    .InsertImageSettings(img => img
        .SaveUrl("/api/images/save")
        .Path("/images/uploads/")
    )
    .Render())
```

**Available image quick toolbar items:**

| Item | Description |
|------|-------------|
| `Replace` | Replace the current image with a new one |
| `Align` | Align image (left, center, right, justify) |
| `Caption` | Add/edit image caption |
| `Remove` | Remove the image |
| `InsertLink` | Convert image to a clickable link |
| `OpenImageLink` | Open the image link in a new tab |
| `EditImageLink` | Edit the image link URL |
| `RemoveImageLink` | Remove the link from the image |
| `Display` | Change display type (Inline, Break, Responsive) |
| `AltText` | Set or edit the alt text for accessibility |
| `Dimension` | Resize the image (width/height) |
| `\|` | Separator/divider for grouping items |

---

## Check Image Size Before Upload

> **⚠️ Remember:** Include the `Image` toolbar item for this to work. The event is triggered only when users interact with the image insertion UI via the toolbar.

Validate image dimensions or file size client-side using the `BeforeUploadImage` event:

```cshtml
@(Html.EJS().RichTextEditor("rte")
    .ToolbarSettings(e => e.Items((object)new[] { "Image" }))
    .InsertImageSettings(img => img.SaveUrl("/api/images/save").Path("/images/uploads/"))
    .BeforeUploadImage("checkImageSize")
    .Render())

<script>
    function checkImageSize(args) {
        var file = args.filesData[0].rawFile;
        // Restrict to 1MB
        if (file.size > 1048576) {
            args.cancel = true;
            alert('Image size must be less than 1MB.');
        }
    }
</script>
```

To check image dimensions (width/height):

```javascript
function checkImageSize(args) {
    var file = args.filesData[0].rawFile;
    var img = new Image();
    img.onload = function () {
        if (img.width > 1920 || img.height > 1080) {
            args.cancel = true;
            alert('Image dimensions must not exceed 1920x1080.');
        }
    };
    img.src = URL.createObjectURL(file);
}
```

---

## Insert Video

Add the `Video` item to the toolbar. Users can insert video by URL (YouTube, Vimeo, or direct MP4) or upload:

```cshtml
@(Html.EJS().RichTextEditor("rte")
    .ToolbarSettings(e => e.Items((object)new[] { "Video" }))
    .InsertVideoSettings(v => v
        .SaveUrl("/api/video/save")
        .Path("/videos/uploads/")
    )
    .Render())
```

**Supported embed providers:** YouTube, Vimeo, and direct video file URLs.

---

## Insert Audio

Add the `Audio` item to the toolbar:

```cshtml
@(Html.EJS().RichTextEditor("rte")
    .ToolbarSettings(e => e.Items((object)new[] { "Audio" }))
    .InsertAudioSettings(a => a
        .SaveUrl("/api/audio/save")
        .Path("/audio/uploads/")
    )
    .Render())
```

---

## File Browser Integration

The File Browser allows users to browse server-side files and select images/media from an existing library instead of uploading new ones.

Add `FileManager` to the toolbar:

```cshtml
@(Html.EJS().RichTextEditor("rte")
    .ToolbarSettings(e => e.Items((object)new[] { "Image", "FileManager" }))
    .FileManagerSettings(fm => fm
        .Enable(true)
        .Path("/")
        .AjaxSettings(ajax => ajax
            .Url("/api/FileManager/FileOperations")
            .DownloadUrl("/api/FileManager/Download")
            .UploadUrl("/api/FileManager/Upload")
            .GetImageUrl("/api/FileManager/GetImage")
        )
    )
    .Render())
```

> The File Manager requires a separate server-side FileManager controller. Syncfusion provides the `Syncfusion.EJ2.FileManager.PhysicalFileProvider` package for the backend implementation.
