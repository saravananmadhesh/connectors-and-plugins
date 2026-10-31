# File Attachments — Syncfusion ASP.NET MVC Chat UI

## Table of Contents
1. [Enable Attachments](#enable-attachments)
2. [Attachment Settings](#attachment-settings)
3. [Upload Controller Actions](#upload-controller-actions)
4. [Preview and Attachment Templates](#preview-and-attachment-templates)
5. [Attachment Events](#attachment-events)
6. [Common Patterns](#common-patterns)

---

## Enable Attachments

Set `EnableAttachments(true)` on the Chat UI to show a paperclip icon in the footer that lets users attach files. Default: `false`.

```razor
@Html.EJS().ChatUI("chatUI")
    .EnableAttachments(true)
    .Messages(ViewBag.Messages)
    .User(ViewBag.CurrentUser)
    .Render()
```

---

## Attachment Settings

Configure attachment behavior using `AttachmentSettings` with a `ChatUIFileAttachmentSettings` object.

```csharp
// Controller
var attachmentSettings = new ChatUIFileAttachmentSettings
{
    SaveUrl             = "/ChatAttachment/Save",
    RemoveUrl           = "/ChatAttachment/Remove",
    AllowedFileTypes    = new List<string> { ".jpg", ".png", ".pdf", ".docx" },
    MaxFileSize         = 5000000,       // 5 MB in bytes (default: 30000000)
    SaveFormat          = SaveFormat.Base64,
    Path                = "/Uploads/",
    EnableDragAndDrop   = true,          // default: true
    MaximumCount        = 5             // default: 10
};
ViewBag.AttachmentSettings = attachmentSettings;
```

```razor
@Html.EJS().ChatUI("chatUI")
    .EnableAttachments(true)
    .AttachmentSettings(att => att
        .SaveUrl("/ChatAttachment/Save")
        .RemoveUrl("/ChatAttachment/Remove")
        .AllowedFileTypes(new List<string> { ".jpg", ".png", ".pdf", ".docx" })
        .MaxFileSize(5000000)
        .SaveFormat(Syncfusion.EJ2.Inputs.SaveFormat.Base64)
        .Path("/Uploads/")
        .EnableDragAndDrop(true)
        .MaximumCount(5)
    )
    .Messages(ViewBag.Messages)
    .User(ViewBag.CurrentUser)
    .Render()
```

**`ChatUIFileAttachmentSettings` property reference:**

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `SaveUrl` | `string` | — | Server endpoint to upload the file |
| `RemoveUrl` | `string` | — | Server endpoint to remove/delete the file |
| `AllowedFileTypes` | `List<string>` | `["*"]` | Permitted file extensions (e.g. `".jpg"`, `".pdf"`) |
| `MaxFileSize` | `long` | `30000000` | Maximum file size in bytes (default ~28.6 MB) |
| `SaveFormat` | `SaveFormat` | `Blob` | Upload format: `SaveFormat.Blob` or `SaveFormat.Base64` |
| `Path` | `string` | — | Server path prefix prepended to returned file URLs |
| `EnableDragAndDrop` | `bool` | `true` | Allow drag-and-drop file selection |
| `MaximumCount` | `int` | `10` | Maximum number of files allowed per message |

---

## Upload Controller Actions

### Blob Upload (default)

```csharp
using System.IO;
using System.Web.Mvc;
using Newtonsoft.Json;

public class ChatAttachmentController : Controller
{
    private readonly string _uploadPath = "~/Uploads/";

    [HttpPost]
    public ActionResult Save(HttpPostedFileBase[] UploadFiles)
    {
        if (UploadFiles == null || UploadFiles.Length == 0)
            return Json(new { success = false, message = "No files received." });

        var results = new List<object>();
        foreach (var file in UploadFiles)
        {
            if (file != null && file.ContentLength > 0)
            {
                string fileName = Path.GetFileName(file.FileName);
                string savePath = Server.MapPath(_uploadPath);

                if (!Directory.Exists(savePath))
                    Directory.CreateDirectory(savePath);

                file.SaveAs(Path.Combine(savePath, fileName));
                results.Add(new { name = fileName, size = file.ContentLength });
            }
        }
        return Json(results);
    }

    [HttpPost]
    public ActionResult Remove(string[] fileNames)
    {
        if (fileNames != null)
        {
            foreach (var name in fileNames)
            {
                var path = Path.Combine(Server.MapPath(_uploadPath), name);
                if (System.IO.File.Exists(path))
                    System.IO.File.Delete(path);
            }
        }
        return Json(new { success = true });
    }
}
```

### Base64 Upload

When `SaveFormat = SaveFormat.Base64`, the component sends a JSON body with a `base64` property instead of a multipart form.

```csharp
[HttpPost]
public ActionResult Save()
{
    using (var reader = new StreamReader(Request.InputStream))
    {
        var json   = reader.ReadToEnd();
        var data   = JsonConvert.DeserializeAnonymousType(json, new { base64 = "", name = "", type = "" });
        var bytes  = Convert.FromBase64String(data.base64);
        var savePath = Path.Combine(Server.MapPath("~/Uploads/"), data.name);
        System.IO.File.WriteAllBytes(savePath, bytes);
    }
    return Json(new { success = true });
}
```

---

## Preview and Attachment Templates

### Preview Template

`PreviewTemplate` is rendered inside the footer attachment tray before a file is sent. Use it to display thumbnail previews.

```razor
@Html.EJS().ChatUI("chatUI")
    .EnableAttachments(true)
    .AttachmentSettings(att => att.SaveUrl("/ChatAttachment/Save").RemoveUrl("/ChatAttachment/Remove"))
    .AttachmentPreviewTemplate("#previewTemplate")
    .Messages(ViewBag.Messages)
    .User(ViewBag.CurrentUser)
    .Render()

<script id="previewTemplate" type="text/x-template">
    <div class="attachment-preview">
        ${if(type.startsWith('image/'))}
            <img src="${base64 ? 'data:' + type + ';base64,' + base64 : path + name}"
                 alt="${name}" style="max-width:80px; max-height:80px; border-radius:4px;" />
        ${else}
            <div class="file-icon">
                <span class="e-icons e-file-document"></span>
                <span class="file-name">${name}</span>
            </div>
        ${/if}
        <span class="file-size">${(size / 1024).toFixed(1)} KB</span>
    </div>
</script>
```

### Attachment Template (in Message Bubble)

`AttachmentTemplate` is rendered inside the message bubble for each attachment after the message is sent.

```razor
@Html.EJS().ChatUI("chatUI")
    .EnableAttachments(true)
    .AttachmentSettings(att => att.SaveUrl("/ChatAttachment/Save").RemoveUrl("/ChatAttachment/Remove").Path("/Uploads/"))
    .AttachmentTemplate("#attachmentTemplate")
    .Messages(ViewBag.Messages)
    .User(ViewBag.CurrentUser)
    .Render()

<script id="attachmentTemplate" type="text/x-template">
    <div class="e-chat-attachment">
        ${if(type && type.startsWith('image/'))}
            <img src="${path + name}"
                 alt="${name}"
                 style="max-width:200px; border-radius:8px; display:block;" />
        ${else}
            <a href="${path + name}" target="_blank" class="file-download-link">
                <span class="e-icons e-download"></span>
                <span>${name}</span>
                <span class="file-size">${(size / 1024).toFixed(1)} KB</span>
            </a>
        ${/if}
    </div>
</script>
```

**Template context object for attachments:**

| Property | Type | Description |
|----------|------|-------------|
| `name` | `string` | File name with extension |
| `size` | `number` | File size in bytes |
| `type` | `string` | MIME type (e.g., `"image/png"`) |
| `base64` | `string` | Base64 content when `SaveFormat = Base64` |
| `path` | `string` | Server path prefix from `Path` setting |

---

## Attachment Events

All attachment events are configured on `AttachmentSettings` (not directly on Chat UI):

```razor
@Html.EJS().ChatUI("chatUI")
    .EnableAttachments(true)
    .AttachmentSettings(att => att
        .SaveUrl("/ChatAttachment/Save")
        .RemoveUrl("/ChatAttachment/Remove")
        .BeforeAttachmentUpload("beforeUpload")
        .AttachmentUploadSuccess("uploadSuccess")
        .AttachmentUploadFailure("uploadFailure")
        .AttachmentRemoved("attachmentRemoved")
        .AttachmentClick("attachmentClick")
    )
    .Messages(ViewBag.Messages)
    .User(ViewBag.CurrentUser)
    .Render()
```

```javascript
function beforeUpload(args) {
    // args.fileData — the file being uploaded
    // args.cancel   — set to true to abort
    var sizeMB = args.fileData.size / (1024 * 1024);
    if (sizeMB > 5) {
        console.warn("File too large:", args.fileData.name);
        args.cancel = true;
    }
}

function uploadSuccess(args) {
    // args.file     — uploaded file info
    // args.response — server response
    console.log("Uploaded:", args.file.name, "→", args.response);
}

function uploadFailure(args) {
    // args.file  — failed file info
    // args.error — error details
    console.error("Upload failed for:", args.file.name, args.error);
}

function attachmentRemoved(args) {
    // args.file — removed attachment's FileInfo object
    console.log("Removed attachment:", args.file.name);
}

function attachmentClick(args) {
    // args.file   — FileInfo of the clicked attachment
    // args.cancel — set to true to suppress the default preview rendering
    console.log("Clicked attachment:", args.file.name);
}
```

**`AttachmentClick` event args (`ChatAttachmentClickEventArgs`):**

| Property | Type | Description |
|----------|------|-------------|
| `file` | `FileInfo` | The `FileInfo` object of the attachment that was clicked. Contains `name`, `size`, `type`, and other file metadata. |
| `cancel` | `bool` | Set to `true` to prevent the default preview from rendering, allowing a custom viewer or lightbox to handle the display instead. |
| `event` | `Event` | The underlying browser click event that triggered the action. |
| `name` | `string` | Name of the event (`"attachmentClick"`). |

**Attachment event summary:**

| Event | Trigger | Cancel? |
|-------|---------|---------|
| `BeforeAttachmentUpload` | Before file is sent to `SaveUrl` | ✅ Yes (`args.cancel = true`) |
| `AttachmentUploadSuccess` | After server returns success | ❌ No |
| `AttachmentUploadFailure` | On network/server error | ❌ No |
| `AttachmentRemoved` | After user removes queued attachment | ❌ No |
| `AttachmentClick` | When user clicks an attachment in a message | ✅ Yes (`args.cancel = true`) |

---

## Pre-Populating Attachments on Messages

Use the `AttachedFile` property on `ChatUIMessage` to display file attachments that already exist on the server when the component first renders — for example, when loading a conversation history that includes previously uploaded files.

`AttachedFile` accepts a `FileInfo`-compatible object containing the file metadata. The `Path` setting on `AttachmentSettings` is used as the base URL prefix when constructing the download or preview link.

```csharp
// Controller
ViewBag.Messages = new List<ChatUIMessage>
{
    new ChatUIMessage
    {
        Id     = "msg1",
        Text   = "Here is the project brief.",
        Author = currentUser,
        AttachedFile = new FileInfo
        {
            Name = "project-brief.pdf",
            Size = 204800,           // size in bytes
            Type = "application/pdf"
        }
    }
};
```

```razor
@Html.EJS().ChatUI("chatUI")
    .EnableAttachments(true)
    .AttachmentSettings(att => att
        .SaveUrl("/ChatAttachment/Save")
        .RemoveUrl("/ChatAttachment/Remove")
        .Path("/Uploads/")
    )
    .AttachmentTemplate("#attachmentTemplate")
    .Messages(ViewBag.Messages)
    .User(ViewBag.CurrentUser)
    .Render()
```

> **Note:** `AttachedFile` renders the attachment using the `AttachmentTemplate`. Ensure the `Path` property is set on `AttachmentSettings` so the template can resolve `${path + name}` correctly.

---

## Common Patterns

### Validate File Type Client-Side

```javascript
function beforeUpload(args) {
    var allowedExtensions = ['.jpg', '.png', '.pdf'];
    var ext = args.fileData.name.substring(args.fileData.name.lastIndexOf('.')).toLowerCase();
    if (!allowedExtensions.includes(ext)) {
        alert('File type not allowed: ' + ext);
        args.cancel = true;
    }
}
```

### Open Image Attachments in a Lightbox

```javascript
function attachmentClick(args) {
    // args.cancel — prevent the default preview
    // args.file   — FileInfo of the clicked attachment
    if (args.file.type && args.file.type.startsWith('image/')) {
        args.cancel = true;   // suppress default preview
        var modal = document.getElementById('imageLightbox');
        var img   = document.getElementById('lightboxImage');
        img.src   = '/Uploads/' + args.file.name;
        modal.style.display = 'flex';
    }
}
```

### Limit File Count Per Session

```javascript
var uploadedCount = 0;
function beforeUpload(args) {
    if (uploadedCount >= 3) {
        alert('Maximum 3 attachments allowed.');
        args.cancel = true;
        return;
    }
    uploadedCount++;
}
```

### Gotchas

| Issue | Cause | Fix |
|-------|-------|-----|
| Attachments don't appear in message bubbles | `AttachmentTemplate` not set | Add `.AttachmentTemplate("#tpl")` |
| Upload returns 401 | CSRF/auth on `SaveUrl` | Add `[AllowAnonymous]` or include anti-forgery token |
| `MaxFileSize` ignored | Property not set on `AttachmentSettings` | Always configure on the settings builder, not just `EnableAttachments` |
| File list resets on page reload | Attachments not persisted | Store file metadata in DB/session on `AttachmentUploadSuccess` |
