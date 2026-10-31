# File Attachments in Chat-UI

## Table of Contents
- [Enable File Attachments](#enable-file-attachments)
- [Attachment Settings](#attachment-settings)
- [File Type Restrictions](#file-type-restrictions)
- [File Size Configuration](#file-size-configuration)
- [Save Format Options](#save-format-options)
- [Server Path Configuration](#server-path-configuration)
- [Drag-and-Drop Support](#drag-and-drop-support)

## Enable File Attachments

The Chat-UI control supports message attachments, enabling users to upload and send files (images, documents, and more) alongside messages. Enable this functionality using the `enableAttachments` property.

### Basic Attachment Setup

Set `enableAttachments="true"` to allow users to attach files:

**Razor Template:**
```razor
@using Syncfusion.EJ2.InteractiveChat;

<div style="height:380px; width:450px">
    <ejs-chatui id="chatUser" enableAttachments="true">
        <e-chatui-user id="user1" user="Albert"></e-chatui-user>
    </ejs-chatui>
</div>
```

**Default Value:** `false`

## Attachment Settings

Use the `<e-chatui-attachmentsettings>` tag directive to customize file attachment behavior, including upload endpoints, file type restrictions, and size limits.

### Setting Save and Remove URLs

Configure server endpoints for handling file uploads and removals. The `saveUrl` processes file uploads, while the `removeUrl` handles file deletion requests.

**Razor Template:**
```razor
@using Syncfusion.EJ2.InteractiveChat;

<div style="height:380px; width:450px">
    <ejs-chatui id="chatUser" enableAttachments="true">
        <e-chatui-user id="user1" user="Albert"></e-chatui-user>
        <e-chatui-attachmentsettings saveUrl=@Url.Content("https://services.syncfusion.com/aspnet/production/api/FileUploader/Save") 
                                     removeUrl=@Url.Content("https://services.syncfusion.com/aspnet/production/api/FileUploader/Remove")></e-chatui-attachmentsettings>
    </ejs-chatui>
</div>
```

## File Type Restrictions

### Setting Allowed File Types

Use the `allowedFileTypes` property to specify which file types users can upload. Accepts file extensions (e.g., '.pdf', '.docx') or MIME types.

**Razor Template:**
```razor
@using Syncfusion.EJ2.InteractiveChat;

<div style="height:380px; width:450px">
    <ejs-chatui id="chatUser" enableAttachments="true">
        <e-chatui-user id="user1" user="Albert"></e-chatui-user>
        <e-chatui-attachmentsettings allowedFileTypes=".pdf" 
                                     saveUrl=@Url.Content("https://services.syncfusion.com/aspnet/production/api/FileUploader/Save") 
                                     removeUrl=@Url.Content("https://services.syncfusion.com/aspnet/production/api/FileUploader/Remove")></e-chatui-attachmentsettings>
    </ejs-chatui>
</div>
```

### Multiple File Types

Specify multiple allowed file types:

**Examples:**
```
allowedFileTypes=".pdf,.docx,.xlsx"
allowedFileTypes=".jpg,.png,.gif"
allowedFileTypes=".pdf,.doc,.txt,.xlsx,.ppt"
```

## File Size Configuration

### Setting Maximum File Size

Configure the `maxFileSize` property to define the maximum file size allowed for uploads. Specify the size in bytes.

- **Default:** 30000000 bytes (approximately 30 MB)
- **Files exceeding this limit will not be uploaded**

**Razor Template:**
```razor
@using Syncfusion.EJ2.InteractiveChat;

<div style="height:380px; width:450px">
    <ejs-chatui id="chatUser" enableAttachments="true">
        <e-chatui-user id="user1" user="Albert"></e-chatui-user>
        <e-chatui-attachmentsettings maxFileSize="4000000" 
                                     saveUrl=@Url.Content("https://services.syncfusion.com/aspnet/production/api/FileUploader/Save") 
                                     removeUrl=@Url.Content("https://services.syncfusion.com/aspnet/production/api/FileUploader/Remove")></e-chatui-attachmentsettings>
    </ejs-chatui>
</div>
```

### Size Reference

| Size | Bytes | Use Case |
|------|-------|----------|
| 1 MB | 1000000 | Small documents, screenshots |
| 5 MB | 5000000 | Images, PDFs |
| 10 MB | 10000000 | Large documents, presentations |
| 50 MB | 50000000 | Videos, large files |
| 100 MB | 100000000 | High-resolution media |
| 500 MB | 500000000 | Large media collections |

## Save Format Options

### Setting Save Format

Control the format used to send files to the server using the `saveFormat` property. The default is `Blob`.

| Format | Description | Use Case |
|--------|-------------|----------|
| `Blob` | Binary large object format for memory-efficient local previews | Quick file handling, temporary storage |
| `Base64` | Reads file as Base64 data URL, useful for inline data URLs | Cross-browser compatibility, email embedding |

**Razor Template:**
```razor
@using Syncfusion.EJ2.InteractiveChat;

<div style="height:380px; width:450px">
    <ejs-chatui id="chatUser" enableAttachments="true">
        <e-chatui-user id="user1" user="Albert"></e-chatui-user>
        <e-chatui-attachmentsettings saveFormat="Base64" 
                                     saveUrl=@Url.Content("https://services.syncfusion.com/aspnet/production/api/FileUploader/Save") 
                                     removeUrl=@Url.Content("https://services.syncfusion.com/aspnet/production/api/FileUploader/Remove")></e-chatui-attachmentsettings>
    </ejs-chatui>
</div>
```

## Server Path Configuration

### Setting Server Path

The `path` property specifies the public base URL where uploaded files are (or will be) hosted. When set, it takes precedence over `saveFormat`.

**Razor Template:**
```razor
@using Syncfusion.EJ2.InteractiveChat;

<div style="height:380px; width:450px">
    <ejs-chatui id="chatUser" enableAttachments="true">
        <e-chatui-user id="user1" user="Albert"></e-chatui-user>
        <e-chatui-attachmentsettings path="D:/CustomPathLocation" 
                                     saveUrl=@Url.Content("https://services.syncfusion.com/aspnet/production/api/FileUploader/Save") 
                                     removeUrl=@Url.Content("https://services.syncfusion.com/aspnet/production/api/FileUploader/Remove")></e-chatui-attachmentsettings>
    </ejs-chatui>
</div>
```

### Path Examples

- **Local path:** `D:/UploadedFiles`
- **Network path:** `\\\\server\\uploads`

## Maximum Attachment Count

### Setting Maximum Count

The `maximumCount` property specifies the maximum number of attachments allowed per message. This limits the number of files that can be uploaded and attached to a single message. Must be a positive integer.

**Default Value:** `10`

**Razor Template:**
```razor
@using Syncfusion.EJ2.InteractiveChat;

<div style="height:380px; width:450px">
    <ejs-chatui id="chatUser" enableAttachments="true">
        <e-chatui-user id="user1" user="Albert"></e-chatui-user>
        <e-chatui-attachmentsettings maximumCount="3"
                                     saveUrl=@Url.Content("https://services.syncfusion.com/aspnet/production/api/FileUploader/Save") 
                                     removeUrl=@Url.Content("https://services.syncfusion.com/aspnet/production/api/FileUploader/Remove")></e-chatui-attachmentsettings>
    </ejs-chatui>
</div>
```

### Use Cases

| Count | Use Case |
|-------|----------|
| 1 | Single file upload (profile picture, document) |
| 3-5 | Limited attachments (quick references) |
| 10 | Default, balanced for most scenarios |
| 20+ | Bulk uploads (image galleries, documentation) |

## Attachment Template

### Customizing Attachment Display

The `attachmentTemplate` property specifies a custom template for rendering attachments in the footer area. Use this to define the HTML structure or rendering logic for attachments (e.g., thumbnails, icons, file metadata).

**Razor Template:**
```razor
@using Syncfusion.EJ2.InteractiveChat;

<div style="height:380px; width:450px">
    <ejs-chatui id="chatUser" enableAttachments="true" attachmentTemplate="#attachmentContent">
        <e-chatui-user id="user1" user="Albert"></e-chatui-user>
        <e-chatui-attachmentsettings saveUrl=@Url.Content("https://services.syncfusion.com/aspnet/production/api/FileUploader/Save") 
                                     removeUrl=@Url.Content("https://services.syncfusion.com/aspnet/production/api/FileUploader/Remove")></e-chatui-attachmentsettings>
    </ejs-chatui>
</div>

<script id="attachmentContent" type="text/x-jsrender">
    <div class="custom-attachment">
        <span class="e-icons ${getFileIcon(file.type)}"></span>
        <span class="file-name">${file.name}</span>
        <span class="file-size">${formatFileSize(file.size)}</span>
        <button class="e-btn e-small e-icon-btn" onclick="removeAttachment('${file.name}')">
            <span class="e-icons e-close"></span>
        </button>
    </div>
</script>

<style>
    .custom-attachment {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 12px;
        background-color: #f5f5f5;
        border: 1px solid #ddd;
        border-radius: 8px;
        margin: 4px;
    }

    .custom-attachment .file-name {
        flex: 1;
        font-size: 13px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .custom-attachment .file-size {
        font-size: 11px;
        color: #666;
    }
</style>

<script>
    function getFileIcon(fileType) {
        if (fileType.includes('image')) return 'e-image';
        if (fileType.includes('pdf')) return 'e-pdf';
        if (fileType.includes('word')) return 'e-doc';
        if (fileType.includes('excel')) return 'e-xls';
        return 'e-file';
    }

    function formatFileSize(bytes) {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    }

    function removeAttachment(fileName) {
        // Handle attachment removal
        console.log("Remove attachment:", fileName);
    }
</script>
```

### Template Context Variables

| Variable | Type | Description |
|----------|------|-------------|
| `file` | object | The attachment file object |
| `file.name` | string | Name of the attached file |
| `file.size` | number | Size of the file in bytes |
| `file.type` | string | MIME type of the file |

## Drag-and-Drop Support

### Enabling Drag-and-Drop

Toggle drag-and-drop support for attachments via the `enableDragAndDrop` property. The default is `true`.

**Razor Template:**
```razor
@using Syncfusion.EJ2.InteractiveChat;

<div style="height:380px; width:450px">
    <ejs-chatui id="chatUser" enableAttachments="true">
        <e-chatui-user id="user1" user="Albert"></e-chatui-user>
        <e-chatui-attachmentsettings enableDragAndDrop="false" 
                                     saveUrl=@Url.Content("https://services.syncfusion.com/aspnet/production/api/FileUploader/Save") 
                                     removeUrl=@Url.Content("https://services.syncfusion.com/aspnet/production/api/FileUploader/Remove")></e-chatui-attachmentsettings>
    </ejs-chatui>
</div>
```

**Default:** `true` (enabled)

### Disabling for Specific Scenarios

Disable drag-and-drop when:
- You want to force users to use the file picker dialog
- Your UI design doesn't support drop zones
- You need explicit file selection events
- Testing on touch devices where drag-and-drop isn't intuitive

## Common Patterns

### Complete Attachment Configuration

Combine all attachment settings:

```razor
<ejs-chatui id="chatUser" enableAttachments="true" attachmentTemplate="#attachmentContent">
    <e-chatui-user id="user1" user="Albert"></e-chatui-user>
    <e-chatui-attachmentsettings 
        saveUrl=@Url.Content("https://services.syncfusion.com/aspnet/production/api/FileUploader/Save")
        removeUrl=@Url.Content("https://services.syncfusion.com/aspnet/production/api/FileUploader/Remove")
        allowedFileTypes=".pdf,.docx,.xlsx,.jpg,.png"
        maxFileSize="10000000"
        maximumCount="5"
        saveFormat="Blob"
        path="https://files.example.com/uploads"
        enableDragAndDrop="true">
    </e-chatui-attachmentsettings>
</ejs-chatui>
```

### Secure File Upload

For production scenarios with sensitive data:

```razor
<e-chatui-attachmentsettings 
    saveUrl=@Url.Content("/api/secure/upload")
    removeUrl=@Url.Content("/api/secure/delete")
    allowedFileTypes=".pdf,.docx"
    maxFileSize="5000000"
    enableDragAndDrop="true">
</e-chatui-attachmentsettings>
```

## Edge Cases

- **No saveUrl:** Attachments may fail silently if server endpoint is not configured
- **Invalid path:** Ensure path is accessible and has write permissions
- **File conflicts:** Multiple files with same name may overwrite each other
- **Browser limitations:** Very large files may timeout depending on browser and network
- **MIME type validation:** Always validate file types on server side as well
