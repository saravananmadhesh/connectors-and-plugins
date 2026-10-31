# File Validation in ASP.NET Core Uploader

## Table of Contents
- [Overview](#overview)
- [File Type Validation](#file-type-validation)
- [File Size Validation](#file-size-validation)
- [Maximum File Count](#maximum-file-count)
- [Duplicate Detection](#duplicate-detection)
- [Custom Validation](#custom-validation)
- [Error Messages](#error-messages)

## Overview

Validation ensures only appropriate files are uploaded to your server. The Uploader validates files on client-side before sending to server and can re-validate on server-side for security.

**Three validation layers:**
1. **Client-side:** Before upload attempt
2. **Server-side:** Before file save
3. **Form-level:** Before form submission

## File Type Validation

Restrict uploads to specific file types using `allowed-extensions`:

### Basic File Type Validation

```html
<ejs-uploader id="uploader"
    allowedExtensions=".jpg,.png,.pdf">
    <e-uploader-asyncsettings saveUrl="Home/Save" removeUrl="Home/Remove"></e-uploader-asyncsettings>
</ejs-uploader>
```

**Result:** 
- ✓ Accepts: image.jpg, document.pdf, photo.png
- ✗ Rejects: file.doc, document.xlsx

### Multiple File Type Categories

```html
<ejs-uploader id="uploader"
    allowedExtensions=".jpg,.jpeg,.png,.gif,.webp,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx">
    <e-uploader-asyncsettings saveUrl="Home/Save" removeUrl="Home/Remove"></e-uploader-asyncsettings>
</ejs-uploader>
```

### Images Only

```html
<ejs-uploader id="imageUploader"
    allowedExtensions=".jpg,.jpeg,.png,.gif,.bmp,.webp">
    <e-uploader-asyncsettings saveUrl="Home/Save" removeUrl="Home/Remove"></e-uploader-asyncsettings>
</ejs-uploader>
```

### Documents Only

```html
<ejs-uploader id="docUploader"
    allowedExtensions=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt">
    <e-uploader-asyncsettings saveUrl="Home/Save" removeUrl="Home/Remove"></e-uploader-asyncsettings>
</ejs-uploader>
```

## File Size Validation

Control upload size with `max-file-size` and `min-file-size`:

### Maximum File Size Only

```html
<ejs-uploader id="uploader"
    maxFileSize="5242880">
    <e-uploader-asyncsettings saveUrl="Home/Save" removeUrl="Home/Remove"></e-uploader-asyncsettings>
</ejs-uploader>
```

### Size Range

```html
<ejs-uploader id="uploader"
    minFileSize="102400"
    maxFileSize="5242880">
    <e-uploader-asyncsettings saveUrl="Home/Save" removeUrl="Home/Remove"></e-uploader-asyncsettings>
</ejs-uploader>
```

### Common Size Limits

```html
<!-- Profile Picture: Max 2MB -->
<ejs-uploader id="profilePic"
    maxFileSize="2097152"
    allowedExtensions=".jpg,.png,.jpeg">
    <e-uploader-asyncsettings saveUrl="Home/Save" removeUrl="Home/Remove"></e-uploader-asyncsettings>
</ejs-uploader>

<!-- Document Upload: Max 10MB -->
<ejs-uploader id="docUpload"
    maxFileSize="10485760"
    allowedExtensions=".pdf,.doc,.docx">
    <e-uploader-asyncsettings saveUrl="Home/Save" removeUrl="Home/Remove"></e-uploader-asyncsettings>
</ejs-uploader>

<!-- Video Upload: Max 500MB -->
<ejs-uploader id="videoUpload"
    maxFileSize="524288000"
    allowedExtensions=".mp4,.avi,.mov">
    <e-uploader-asyncsettings saveUrl="Home/Save" removeUrl="Home/Remove"></e-uploader-asyncsettings>
</ejs-uploader>
```

## Maximum File Count

Limit number of files using `selected` event:

### Restrict to 5 Files

```html
<ejs-uploader id="uploader"
    selected="onSelected">
    <e-uploader-asyncsettings saveUrl="Home/Save" removeUrl="Home/Remove"></e-uploader-asyncsettings>
</ejs-uploader>

<script>
function onSelected(args) {
    if (args.filesData.length > 5) {
        args.filesData.splice(5);  // Keep only first 5
        alert('Maximum 5 files allowed');
    }
}
</script>
```

### Cumulative Count Validation

```html
<ejs-uploader id="uploader"
    selected="onSelected"
    success="onSuccess">
    <e-uploader-asyncsettings saveUrl="Home/Save" removeUrl="Home/Remove"></e-uploader-asyncsettings>
</ejs-uploader>

<script>
var uploadedCount = 0;
var maxLimit = 10;

function onSelected(args) {
    var totalFiles = uploadedCount + args.filesData.length;
    if (totalFiles > maxLimit) {
        var canAdd = maxLimit - uploadedCount;
        args.filesData.splice(canAdd);
        alert('You can upload ' + canAdd + ' more files');
    }
}

function onSuccess(args) {
    if (args.operation === 'upload') {
        uploadedCount++;
    }
}
</script>
```

## Duplicate Detection

Prevent uploading same file twice:

### Client-Side Duplicate Check

```html
<ejs-uploader id="uploader"
    selected="onSelected">
    <e-uploader-asyncsettings saveUrl="Home/Save" removeUrl="Home/Remove"></e-uploader-asyncsettings>
</ejs-uploader>

<script>
var existingFiles = [];

function onSelected(args) {
    var duplicates = [];
    
    args.filesData.forEach(function(file) {
        if (existingFiles.includes(file.name)) {
            duplicates.push(file.name);
        }
    });
    
    if (duplicates.length > 0) {
        args.cancel = true;
        alert('Duplicate files: ' + duplicates.join(', '));
    }
}

// Get uploader instance and add to existing list after upload
document.addEventListener('DOMContentLoaded', function() {
    var uploader = document.getElementById("uploader").ej2_instances[0];
    // Add uploaded files to tracking list
});
</script>
```

### Server-Side Duplicate Check

```csharp
[HttpPost]
public IActionResult Save(IFormFile[] uploader)
{
    string uploadPath = Path.Combine(_webHostEnvironment.WebRootPath, "Uploads");
    if (!Directory.Exists(uploadPath))
        Directory.CreateDirectory(uploadPath);

    var uploadedFiles = new List<string>();

    if (uploader != null)
    {
        foreach (IFormFile file in uploader)
        {
            if (file.Length > 0)
            {
                string filePath = Path.Combine(uploadPath, file.FileName);
                
                // Check if file already exists
                if (System.IO.File.Exists(filePath))
                {
                    return StatusCode(400, $"File {file.FileName} already exists");
                }

                using (FileStream fs = System.IO.File.Create(filePath))
                {
                    file.CopyTo(fs);
                    fs.Flush();
                }
                uploadedFiles.Add(file.FileName);
            }
        }
    }
    return Ok(new { files = uploadedFiles });
}
```

## Custom Validation

Implement complex validation logic:

### MIME Type Validation

```html
<ejs-uploader id="uploader"
    selected="onSelected">
    <e-uploader-asyncsettings saveUrl="Home/Save" removeUrl="Home/Remove"></e-uploader-asyncsettings>
</ejs-uploader>

<script>
var allowedMimeTypes = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'application/pdf'
];

function onSelected(args) {
    var invalidFiles = [];
    
    args.filesData.forEach(function(file) {
        if (!allowedMimeTypes.includes(file.type)) {
            invalidFiles.push(file.name);
        }
    });
    
    if (invalidFiles.length > 0) {
        args.cancel = true;
        alert('Invalid file types: ' + invalidFiles.join(', '));
    }
}
</script>
```

### Dimension Validation for Images

```html
<ejs-uploader id="uploader"
    selected="onSelected">
    <e-uploader-asyncsettings saveUrl="Home/Save" removeUrl="Home/Remove"></e-uploader-asyncsettings>
</ejs-uploader>

<script>
var minWidth = 800;
var minHeight = 600;

function onSelected(args) {
    args.filesData.forEach(function(file) {
        if (file.type.includes('image/')) {
            var reader = new FileReader();
            reader.onload = function(e) {
                var img = new Image();
                img.onload = function() {
                    if (img.width < minWidth || img.height < minHeight) {
                        alert(file.name + ' is too small. Minimum: ' + minWidth + 'x' + minHeight);
                    }
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });
}
</script>
```

### Content Scanning for Security

```csharp
[HttpPost]
public IActionResult Save(IFormFile[] uploader)
{
    string uploadPath = Path.Combine(_webHostEnvironment.WebRootPath, "Uploads");
    
    if (uploader != null)
    {
        foreach (IFormFile file in uploader)
        {
            // Scan file for viruses/malware (requires antivirus library)
            if (!ScanFileForViruses(file))
            {
                return StatusCode(400, $"File {file.FileName} failed security scan");
            }

            // Validate file content matches extension
            string mimeType = file.ContentType;
            if (!IsValidMimeType(file.FileName, mimeType))
            {
                return StatusCode(400, $"File type mismatch for {file.FileName}");
            }
        }
    }
    return Ok();
}

private bool ScanFileForViruses(IFormFile file)
{
    // Implement virus scanning logic
    // Example: Use ClamAV, VirusTotal API, etc.
    return true;
}

private bool IsValidMimeType(string fileName, string mimeType)
{
    string extension = Path.GetExtension(fileName).ToLower();
    
    // Map extensions to valid MIME types
    var validMimeTypes = new Dictionary<string, string[]>
    {
        { ".jpg", new[] { "image/jpeg" } },
        { ".png", new[] { "image/png" } },
        { ".pdf", new[] { "application/pdf" } },
        { ".doc", new[] { "application/msword" } }
    };

    if (validMimeTypes.ContainsKey(extension))
        return validMimeTypes[extension].Contains(mimeType);
    
    return false;
}
```

## Error Messages

### Display Validation Errors

```html
<ejs-uploader id="uploader"
    allowedExtensions=".jpg,.png,.pdf"
    maxFileSize="5242880"
    selected="onSelected"
    failure="onFailure">
    <e-uploader-asyncsettings saveUrl="Home/Save" removeUrl="Home/Remove"></e-uploader-asyncsettings>
</ejs-uploader>

<div id="errorMessage" style="color: red; margin-top: 10px;"></div>

<script>
function onSelected(args) {
    document.getElementById('errorMessage').textContent = '';
}

function onFailure(args) {
    var errorMsg = 'Upload failed: ' + args.response;
    document.getElementById('errorMessage').textContent = errorMsg;
}
</script>
```

### Custom Validation Messages

Use the `ej.base.L10n.load` API to override the built-in validation messages:

```html
<script>
ej.base.L10n.load({
    'en-US': {
        'uploader': {
            'invalidMinFileSize': 'File size is too small. Minimum size is 100KB',
            'invalidMaxFileSize': 'File size exceeds maximum limit of 5MB',
            'invalidFileType': 'File type not allowed. Accepted types: JPG, PNG, PDF'
        }
    }
});
</script>
```

## Summary

| Validation | Property | Example |
|-----------|----------|---------|
| File Types | `allowedExtensions` | `allowedExtensions=".jpg,.png"` |
| Max Size | `maxFileSize` | `maxFileSize="5242880"` |
| Min Size | `minFileSize` | `minFileSize="102400"` |
| File Count | `selected` event | `if (args.filesData.length > 5)` |
| Duplicates | `selected` event | Check against existing list |
| MIME Type | `selected` event | Validate file.type property |
| Dimensions | `selected` event | Read image and check dimensions |
