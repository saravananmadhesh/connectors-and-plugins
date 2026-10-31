# File Attachments — Syncfusion ASP.NET MVC AI AssistView

## Table of Contents
- [Enable Attachments](#enable-attachments)
- [Configure SaveUrl and RemoveUrl](#configure-saveurl-and-removeurl)
- [Restrict File Types](#restrict-file-types)
- [Set Maximum File Size](#set-maximum-file-size)
- [Set Maximum Attachment Count](#set-maximum-attachment-count)

---

## Enable Attachments

Use `EnableAttachments(true)` to show the attachment button in the footer toolbar. Default: `false`.

```razor
@using Syncfusion.EJ2.InteractiveChat

<div class="aiassist-container" style="height: 350px; width: 650px;">
    @Html.EJS().AIAssistView("aiAssistView")
        .EnableAttachments(true)
        .PromptRequest("onPromptRequest")
        .Created("onCreated")
        .Render()
</div>

<script>
    var assistObj;
    function onCreated() { assistObj = this; }
    function onPromptRequest() {
        setTimeout(function () {
            assistObj.addPromptResponse('Connect to your AI service for real-time responses.');
        }, 2000);
    }
</script>
```

> When `EnableAttachments` is `true`, the footer toolbar renders both the `attachment` icon and the `send` icon.

---

## Configure SaveUrl and RemoveUrl

Use `AttachmentSettings` to specify server endpoints for uploading and removing attached files.

```razor
@using Syncfusion.EJ2.InteractiveChat

<div class="aiassist-container" style="height: 350px; width: 650px;">
    @Html.EJS().AIAssistView("aiAssistView")
        .EnableAttachments(true)
        .AttachmentSettings(new AIAssistViewAttachmentSettings()
        {
            SaveUrl = @Url.Content("https://services.syncfusion.com/aspnet/production/api/FileUploader/Save"),
            RemoveUrl = @Url.Content("https://services.syncfusion.com/aspnet/production/api/FileUploader/Remove")
        })
        .PromptRequest("onPromptRequest")
        .Created("onCreated")
        .Render()
</div>

<script>
    var assistObj;
    function onCreated() { assistObj = this; }
    function onPromptRequest() {
        setTimeout(function () {
            assistObj.addPromptResponse('Connect to your AI service for real-time responses.');
        }, 2000);
    }
</script>
```

**Controller endpoints example:**

```csharp
[HttpPost]
public ActionResult Save(IFormFile file)
{
    // Handle file save logic
    return Content("File saved");
}

[HttpPost]
public ActionResult Remove(string fileName)
{
    // Handle file remove logic
    return Content("File removed");
}
```

---

## Restrict File Types

Use `AllowedFileType` inside `AttachmentSettings` to restrict which file types users can attach. Pass a comma-separated string of extensions.

```razor
@Html.EJS().AIAssistView("aiAssistView")
    .EnableAttachments(true)
    .AttachmentSettings(new AIAssistViewAttachmentSettings()
    {
        SaveUrl = @Url.Content("https://services.syncfusion.com/aspnet/production/api/FileUploader/Save"),
        RemoveUrl = @Url.Content("https://services.syncfusion.com/aspnet/production/api/FileUploader/Remove"),
        AllowedFileType = ".png,.jpg,.pdf"
    })
    .PromptRequest("onPromptRequest")
    .Created("onCreated")
    .Render()
```

> **Format:** Each extension must include the leading dot (`.png`, not `png`). Multiple types are comma-separated without spaces.

---

## Set Maximum File Size

Use `MaxFileSize` inside `AttachmentSettings` to limit the size of uploaded files in bytes. Default: `2000000` (2 MB).

```razor
@Html.EJS().AIAssistView("aiAssistView")
    .EnableAttachments(true)
    .AttachmentSettings(new AIAssistViewAttachmentSettings()
    {
        SaveUrl = @Url.Content("https://services.syncfusion.com/aspnet/production/api/FileUploader/Save"),
        RemoveUrl = @Url.Content("https://services.syncfusion.com/aspnet/production/api/FileUploader/Remove"),
        MaxFileSize = 1000000  // 1 MB
    })
    .PromptRequest("onPromptRequest")
    .Created("onCreated")
    .Render()
```

> **Unit:** Always in bytes. Common values: `1000000` = 1 MB, `5000000` = 5 MB, `10000000` = 10 MB.

---

## Set Maximum Attachment Count

Use `MaximumCount` to limit how many files a user can attach at once. Default: `10`. When the user selects more files than allowed, a "maximum count reached" error is displayed.

```razor
@Html.EJS().AIAssistView("aiAssistView")
    .EnableAttachments(true)
    .AttachmentSettings(new AIAssistViewAttachmentSettings()
    {
        SaveUrl = @Url.Content("https://services.syncfusion.com/aspnet/production/api/FileUploader/Save"),
        RemoveUrl = @Url.Content("https://services.syncfusion.com/aspnet/production/api/FileUploader/Remove"),
        MaximumCount = 5
    })
    .PromptRequest("onPromptRequest")
    .Created("onCreated")
    .Render()
```

---

## Complete AttachmentSettings Configuration

```razor
@Html.EJS().AIAssistView("aiAssistView")
    .EnableAttachments(true)
    .AttachmentSettings(new AIAssistViewAttachmentSettings()
    {
        SaveUrl    = @Url.Content("/api/FileUploader/Save"),
        RemoveUrl  = @Url.Content("/api/FileUploader/Remove"),
        AllowedFileType = ".png,.jpg,.jpeg,.pdf,.docx",
        MaxFileSize = 5000000,    // 5 MB
        MaximumCount = 3
    })
    .PromptRequest("onPromptRequest")
    .Created("onCreated")
    .Render()
```

| Property | Type | Default | Description |
|---|---|---|---|
| `SaveUrl` | string | — | Server endpoint to handle file upload |
| `RemoveUrl` | string | — | Server endpoint to handle file removal |
| `AllowedFileType` | string | — | Comma-separated allowed extensions (e.g., `".png,.pdf"`) |
| `MaxFileSize` | int | `2000000` | Maximum file size in bytes |
| `MaximumCount` | int | `10` | Maximum number of files per prompt submission |
