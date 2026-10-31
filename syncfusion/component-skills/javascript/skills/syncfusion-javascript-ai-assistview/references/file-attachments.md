# File Attachments

## Table of Contents
- [Overview](#overview)
- [Enable Attachments](#enable-attachments)
- [Attachment Settings](#attachment-settings)
- [Save and Remove URLs](#save-and-remove-urls)
- [File Type Restrictions](#file-type-restrictions)
- [Attachment Templates](#attachment-templates)
- [File Size Limits](#file-size-limits)
- [Maximum File Count](#maximum-file-count)
- [Complete Example](#complete-example)

This guide covers file attachment functionality in the AI AssistView component.

---

## Overview

The AI AssistView provides file attachment support through two main properties:

- **enableAttachments**: Boolean flag to enable/disable file attachments
- **attachmentSettings**: Configuration object for file upload behavior

File attachments enhance user interactions by allowing additional context through documents, images, and other files.

---

## Enable Attachments

### Property

```typescript
enableAttachments: boolean = false
```

Set to `true` to enable the file attachment button in the footer area.

### Basic Example

```typescript
import { AIAssistView } from '@syncfusion/ej2-interactive-chat';

const aiAssistView: AIAssistView = new AIAssistView({
    enableAttachments: true,
    promptRequest: (args) => {
        setTimeout(() => {
            const response = 'For real-time prompt processing, connect to your AI service.';
            aiAssistView.addPromptResponse(response);
        }, 1000);
    }
});

aiAssistView.appendTo('#aiAssistView');
```

### HTML

```html
<div id="aiAssistView"></div>
```

When enabled, users will see an attachment icon button in the footer area to select and upload files.

---

## Attachment Settings

### Interface

```typescript
interface AttachmentSettingsModel {
    saveUrl?: string;
    removeUrl?: string;
    allowedFileTypes?: string;
    maxFileSize?: number;
    maximumCount?: number;
}
```

The `attachmentSettings` property provides comprehensive control over file upload behavior.

---

## Save and Remove URLs

### Properties

```typescript
saveUrl: string = ''
removeUrl: string = ''
```

Configure server endpoints for file upload and deletion operations.

### Example

```typescript
const aiAssistView: AIAssistView = new AIAssistView({
    enableAttachments: true,
    attachmentSettings: {
        saveUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Save',
        removeUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Remove'
    },
    promptRequest: (args) => {
        // Access attached files
        const files = args.fileData || [];
        console.log(`Received ${files.length} file(s) with prompt`);
        
        setTimeout(() => {
            aiAssistView.addPromptResponse('Processing your request with attachments...');
        }, 1000);
    }
});

aiAssistView.appendTo('#aiAssistView');
```

### Server Integration

The component sends file data to `saveUrl` using FormData. Your server endpoint should:

1. Accept multipart/form-data requests
2. Process uploaded files
3. Return success/failure response
4. Handle file removal requests at `removeUrl`

### ASP.NET Core Example

```csharp
[HttpPost]
public async Task<IActionResult> Save(IList<IFormFile> UploadFiles)
{
    foreach (var file in UploadFiles)
    {
        if (file.Length > 0)
        {
            var filePath = Path.Combine("uploads", file.FileName);
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }
        }
    }
    return Ok();
}

[HttpPost]
public IActionResult Remove(string[] fileNames)
{
    foreach (var fileName in fileNames)
    {
        var filePath = Path.Combine("uploads", fileName);
        if (System.IO.File.Exists(filePath))
        {
            System.IO.File.Delete(filePath);
        }
    }
    return Ok();
}
```

---

## File Type Restrictions

### Property

```typescript
allowedFileTypes: string = ''
```

Specify allowed file extensions or MIME types to restrict upload types.

### By Extension

```typescript
const aiAssistView: AIAssistView = new AIAssistView({
    enableAttachments: true,
    attachmentSettings: {
        saveUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Save',
        removeUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Remove',
        allowedFileTypes: '.png'  // Only PNG images
    }
});
```

### Multiple Extensions

```typescript
attachmentSettings: {
    saveUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Save',
    removeUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Remove',
    allowedFileTypes: '.pdf,.docx,.xlsx'  // Documents only
}
```

### By MIME Type

```typescript
attachmentSettings: {
    saveUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Save',
    removeUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Remove',
    allowedFileTypes: 'image/*'  // All image types
}
```

### Common File Type Patterns

```typescript
// Images only
allowedFileTypes: '.jpg,.jpeg,.png,.gif,.bmp'

// Documents only
allowedFileTypes: '.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx'

// Text files
allowedFileTypes: '.txt,.md,.csv,.json,.xml'

// Images and documents
allowedFileTypes: 'image/*,.pdf,.docx'
```

---

## Attachment Templates

### attachmentTemplate Property

Control how attachments appear inside message bubbles after sending.

**Property**: `attachmentTemplate: string | Function`

**Template Context**:
- `selectedFile`: File object with properties (name, size, type, fileSource)

### Template Example

```typescript
import { AIAssistView } from '@syncfusion/ej2-interactive-chat';

// Attachment template - displays in message bubble
function attachmentTemplate(context: any): string {

    return `
        <div class="e-attached-file-temp">
            <div class="attached-file-name">${context.selectedFile.name}</div>
            <div class="attached-file-type">${context.selectedFile.type}</div>
        </div>
    `;
}

const aiAssistView: AIAssistView = new AIAssistView({
    enableAttachments: true,
    attachmentSettings: {
        saveUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Save',
        removeUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Remove',
        attachmentTemplate: attachmentTemplate,
    }
});

aiAssistView.appendTo('#template');
```

---

## File Size Limits

### Property

```typescript
maxFileSize: number = 2000000  // 2 MB default
```

Set maximum file size in bytes. Files exceeding this limit will be rejected.

### Example

```typescript
const aiAssistView: AIAssistView = new AIAssistView({
    enableAttachments: true,
    attachmentSettings: {
        saveUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Save',
        removeUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Remove',
        maxFileSize: 1000000  // 1 MB limit
    }
});
```

### Size Calculations

```typescript
// 500 KB
maxFileSize: 500 * 1024

// 1 MB
maxFileSize: 1024 * 1024

// 5 MB
maxFileSize: 5 * 1024 * 1024

// 10 MB
maxFileSize: 10 * 1024 * 1024
```

Users will see an error message when attempting to upload files that exceed the size limit.

---

## Maximum File Count

### Property

```typescript
maximumCount: number = 10
```

Limit the number of files that can be attached at once.

### Example

```typescript
const aiAssistView: AIAssistView = new AIAssistView({
    enableAttachments: true,
    attachmentSettings: {
        saveUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Save',
        removeUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Remove',
        maximumCount: 5  // Maximum 5 files
    }
});
```

When users attempt to select more than the allowed count, they will receive an error notification.

---

## Complete Example

### Full Configuration

```typescript
import { AIAssistView } from '@syncfusion/ej2-interactive-chat';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

const aiAssistView: AIAssistView = new AIAssistView({
    // Enable attachments
    enableAttachments: true,
    
    // Configure attachment behavior
    attachmentSettings: {
        // Server endpoints
        saveUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Save',
        removeUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Remove',
        
        // Accept images and PDFs only
        allowedFileTypes: 'image/*,.pdf',
        
        // 5 MB maximum file size
        maxFileSize: 5 * 1024 * 1024,
        
        // Allow up to 3 files
        maximumCount: 3
    },
    
    // Handle prompt with attachments
    promptRequest: (args) => {
        const prompt = args.prompt;
        const files = args.fileData || [];
        
        console.log(`Prompt: ${prompt}`);
        console.log(`Attached files: ${files.length}`);
        
        if (files.length > 0) {
            files.forEach((file, index) => {
                console.log(`File ${index + 1}: ${file.name} (${file.size} bytes)`);
            });
        }
        
        setTimeout(() => {
            let response = 'Processing your request';
            if (files.length > 0) {
                response += ` with ${files.length} attachment(s)`;
            }
            response += '...';
            aiAssistView.addPromptResponse(response);
        }, 1000);
    }
});

aiAssistView.appendTo('#aiAssistView');
```

### HTML

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>AI AssistView - File Attachments</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    
    <!-- Syncfusion CSS -->
    <link href="https://cdn.syncfusion.com/ej2/32.1.19/ej2-base/styles/fluent2.css" rel="stylesheet" />
    <link href="https://cdn.syncfusion.com/ej2/32.1.19/ej2-interactive-chat/styles/fluent2.css" rel="stylesheet" />
    <link href="https://cdn.syncfusion.com/ej2/32.1.19/ej2-inputs/styles/fluent2.css" rel="stylesheet" />
    <link href="https://cdn.syncfusion.com/ej2/32.1.19/ej2-buttons/styles/fluent2.css" rel="stylesheet" />
    <link href="https://cdn.syncfusion.com/ej2/32.1.19/ej2-navigations/styles/fluent2.css" rel="stylesheet" />
    <link href="https://cdn.syncfusion.com/ej2/32.1.19/ej2-notifications/styles/fluent2.css" rel="stylesheet" />
</head>
<body>
    <div id='container' style="height: 400px; width: 700px;">
        <div id="aiAssistView"></div>
    </div>
</body>
</html>
```

---

## Summary

**Key Properties:**
- `enableAttachments`: Enable file upload functionality
- `attachmentSettings.saveUrl`: Server endpoint for uploads
- `attachmentSettings.removeUrl`: Server endpoint for deletions
- `attachmentSettings.allowedFileTypes`: File type restrictions
- `attachmentSettings.maxFileSize`: Maximum file size in bytes
- `attachmentSettings.maximumCount`: Maximum number of files

**Use Cases:**
- Document analysis with AI
- Image processing requests
- Context-rich prompts with supporting files
- Multi-modal AI interactions
