# File Upload Configuration Guide

## Table of Contents
- [File Upload Configuration](#file-upload-configuration)
- [Upload Settings Properties](#upload-settings-properties)
- [File Type Filtering](#file-type-filtering)
- [File Size Constraints](#file-size-constraints)
- [Auto-Upload Behavior](#auto-upload-behavior)
- [Sequential Upload](#sequential-upload)
- [Chunk Upload for Large Files](#chunk-upload-for-large-files)
- [Directory Upload](#directory-upload)
- [Upload Events and Handlers](#upload-events-and-handlers)
- [Practical Examples](#practical-examples)
- [Best Practices](#best-practices)

## File Upload Configuration

### Upload Settings Overview

The upload settings control how files are uploaded to the server:

**View Code (Index.cshtml)**:
```html
<ejs-filemanager id="filemanager">
    <e-filemanager-uploadsettings
        autoUpload="true"
        minFileSize="0"
        maxFileSize="5242880"
        allowedExtensions=".jpg,.png,.pdf,.docx"
        autoClose="false"
        directoryUpload="false"
        sequentialUpload="false"
        chunkSize="0">
    </e-filemanager-uploadsettings>
    <e-filemanager-ajaxsettings url="/FileManager/FileManager"
        uploadUrl="/FileManager/Upload">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>
```

**Upload Settings Reference:**
- `autoUpload`: true/false - Upload immediately when files are selected
- `minFileSize`: 0+ - Minimum file size in bytes
- `maxFileSize`: 5242880 - Maximum file size (5MB example)
- `allowedExtensions`: Extension list (comma-separated)
- `autoClose`: true/false - Close dialog after upload
- `directoryUpload`: true/false - Allow folder uploads
- `sequentialUpload`: true/false - Upload one file at a time
- `chunkSize`: 0+ - Chunk size for large files (0 = no chunking)

## Upload Settings Properties

### Auto Upload

Controls whether files are uploaded automatically when selected:

**View Code - Auto Upload Enabled (Index.cshtml)**:
```html
<ejs-filemanager id="filemanager">
    <e-filemanager-uploadsettings autoUpload="true"></e-filemanager-uploadsettings>
    <e-filemanager-ajaxsettings url="/FileManager/FileManager"
        uploadUrl="/FileManager/Upload">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>
```

**View Code - Manual Upload (Index.cshtml)**:
```html
<ejs-filemanager id="filemanager">
    <e-filemanager-uploadsettings autoUpload="false"></e-filemanager-uploadsettings>
    <e-filemanager-ajaxsettings url="/FileManager/FileManager"
        uploadUrl="/FileManager/Upload">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>
```

**Behavior Comparison:**
- **autoUpload: true** - Upload starts immediately when files are selected
- **autoUpload: false** - User must click the Upload button to start the upload process

### Auto Close

Controls whether upload dialog closes after completion:

**View Code - Auto Close Enabled (Index.cshtml)**:
```html
<ejs-filemanager id="filemanager">
    <e-filemanager-uploadsettings autoClose="true"></e-filemanager-uploadsettings>
    <e-filemanager-ajaxsettings url="/FileManager/FileManager"
        uploadUrl="/FileManager/Upload">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>
```

**View Code - Keep Dialog Open (Index.cshtml)**:
```html
<ejs-filemanager id="filemanager">
    <e-filemanager-uploadsettings autoClose="false"></e-filemanager-uploadsettings>
    <e-filemanager-ajaxsettings url="/FileManager/FileManager"
        uploadUrl="/FileManager/Upload">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>
```

**Behavior Comparison:**
- **autoClose: true** - Upload dialog automatically closes after successful upload
- **autoClose: false** - Dialog remains open, allowing user to perform additional uploads

## File Type Filtering

### Restrict File Types with Allowed Extensions

**View Code - Images Only (Index.cshtml)**:
```html
<ejs-filemanager id="filemanager">
    <e-filemanager-uploadsettings
        allowedExtensions=".jpg,.jpeg,.png,.gif,.bmp,.webp">
    </e-filemanager-uploadsettings>
    <e-filemanager-ajaxsettings url="/FileManager/FileManager"
        uploadUrl="/FileManager/Upload">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>
```

**View Code - Documents Only (Index.cshtml)**:
```html
<ejs-filemanager id="filemanager">
    <e-filemanager-uploadsettings
        allowedExtensions=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt">
    </e-filemanager-uploadsettings>
    <e-filemanager-ajaxsettings url="/FileManager/FileManager"
        uploadUrl="/FileManager/Upload">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>
```

**View Code - All File Types (Index.cshtml)**:
```html
<ejs-filemanager id="filemanager">
    <e-filemanager-uploadsettings allowedExtensions=""></e-filemanager-uploadsettings>
    <e-filemanager-ajaxsettings url="/FileManager/FileManager"
        uploadUrl="/FileManager/Upload">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>
```

**Extension Lists:**
- **Images**: .jpg, .jpeg, .png, .gif, .bmp, .webp
- **Documents**: .pdf, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .txt
- **Media**: .mp3, .mp4, .avi, .mkv, .mov, .wmv
- **Archives**: .zip, .rar, .7z, .tar, .gz

### Dynamic File Type Filtering

**View Code (Index.cshtml)**:
```html
<div style="margin-bottom: 15px;">
    <label for="fileTypeFilter">Select File Type: </label>
    <select id="fileTypeFilter" onchange="updateFileTypeFilter(this.value)">
        <option value="images">Images</option>
        <option value="documents">Documents</option>
        <option value="media">Media</option>
        <option value="archives">Archives</option>
    </select>
</div>

<ejs-filemanager id="filemanager">
    <e-filemanager-uploadsettings allowedExtensions=".jpg,.jpeg,.png,.gif,.bmp">
    </e-filemanager-uploadsettings>
    <e-filemanager-ajaxsettings url="/FileManager/FileManager"
        uploadUrl="/FileManager/Upload">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
    var extensionMap = {
        images: '.jpg,.jpeg,.png,.gif,.bmp',
        documents: '.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx',
        media: '.mp3,.mp4,.avi,.mkv,.mov,.wmv',
        archives: '.zip,.rar,.7z,.tar,.gz'
    };
    
    function updateFileTypeFilter(fileType) {
        var fileManagerInstance = document.getElementById('filemanager').ej2_instances[0];
        fileManagerInstance.uploadSettings.allowedExtensions = extensionMap[fileType];
        console.log('Upload filter updated to: ' + extensionMap[fileType]);
    }
</script>
```

**Controller Code (FileManagerController.cs)**:
```csharp
[HttpPost]
public IActionResult Upload(IList<IFormFile> uploadFiles, string path, string fileType)
{
    var extensionMap = new Dictionary<string, string[]>
    {
        { "images", new[] { ".jpg", ".jpeg", ".png", ".gif", ".bmp" } },
        { "documents", new[] { ".pdf", ".doc", ".docx", ".xls", ".xlsx", ".ppt", ".pptx" } },
        { "media", new[] { ".mp3", ".mp4", ".avi", ".mkv", ".mov", ".wmv" } },
        { "archives", new[] { ".zip", ".rar", ".7z", ".tar", ".gz" } }
    };
    
    var allowedExtensions = extensionMap.ContainsKey(fileType) 
        ? extensionMap[fileType] 
        : new string[0];
    
    foreach (var file in uploadFiles)
    {
        var ext = Path.GetExtension(file.FileName).ToLower();
        if (!allowedExtensions.Contains(ext))
        {
            return BadRequest($"File type {ext} not allowed for category {fileType}");
        }
        
        // Process file upload...
    }
    
    return Content("");
}
```

## File Size Constraints

### Set File Size Limits

**View Code - 5MB Limit (Index.cshtml)**:
```html
<ejs-filemanager id="filemanager">
    <e-filemanager-uploadsettings
        maxFileSize="5242880"
        minFileSize="1024">
    </e-filemanager-uploadsettings>
    <e-filemanager-ajaxsettings url="/FileManager/FileManager"
        uploadUrl="/FileManager/Upload">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>
```

**View Code - 10MB Limit (Index.cshtml)**:
```html
<ejs-filemanager id="filemanager">
    <e-filemanager-uploadsettings
        maxFileSize="10485760"
        minFileSize="1024">
    </e-filemanager-uploadsettings>
    <e-filemanager-ajaxsettings url="/FileManager/FileManager"
        uploadUrl="/FileManager/Upload">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>
```

### Size Limit Reference

```javascript
const fileSizeLimits = {
  '1KB': 1024,
  '10KB': 10240,
  '100KB': 102400,
  '1MB': 1048576,
  '5MB': 5242880,
  '10MB': 10485760,
  '50MB': 52428800,
  '100MB': 104857600,
  '500MB': 524288000,
  '1GB': 1073741824
};
```

### Handle Size Validation Errors

**View Code (Index.cshtml)**:
```html
<ejs-filemanager id="filemanager"
    beforeSend="validateFileSize">
    <e-filemanager-uploadsettings maxFileSize="5242880">
    </e-filemanager-uploadsettings>
    <e-filemanager-ajaxsettings url="/FileManager/FileManager"
        uploadUrl="/FileManager/Upload">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
    function validateFileSize(args) {
        if (args.fileDetails) {
            var maxSize = 5242880; // 5MB in bytes
            
            args.fileDetails.forEach(function(file) {
                if (file.size > maxSize) {
                    args.cancel = true;
                    alert('File ' + file.name + ' exceeds maximum size of 5MB');
                    console.log('File rejected: ' + file.name);
                }
            });
        }
    }
</script>
```

**Controller Code (FileManagerController.cs)**:
```csharp
[HttpPost]
public IActionResult Upload(IList<IFormFile> uploadFiles, string path)
{
    const long maxFileSize = 5242880; // 5MB
    
    foreach (var file in uploadFiles)
    {
        if (file.Length > maxFileSize)
        {
            return BadRequest($"File {file.FileName} exceeds maximum size of 5MB");
        }
        
        // Process file upload...
    }
    
    return Content("");
}
```

## Auto-Upload Behavior

### Default Auto-Upload

By default, files upload automatically upon selection:

**View Code (Index.cshtml)**:
```html
<ejs-filemanager id="filemanager">
    <e-filemanager-uploadsettings autoUpload="true"></e-filemanager-uploadsettings>
    <e-filemanager-ajaxsettings url="/FileManager/FileManager"
        uploadUrl="/FileManager/Upload">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>
```

**Behavior:**
1. User selects file(s) through dialog
2. Upload starts immediately (no user action required)
3. Progress indicator shows upload progress
4. File appears in directory after completion

### Manual Upload Trigger

**View Code (Index.cshtml)**:
```html
<ejs-filemanager id="filemanager">
    <e-filemanager-uploadsettings autoUpload="false"></e-filemanager-uploadsettings>
    <e-filemanager-ajaxsettings url="/FileManager/FileManager"
        uploadUrl="/FileManager/Upload">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>
```

**Behavior:**
1. User selects file(s) through dialog
2. User manually clicks "Upload" button
3. Upload starts
4. File appears after completion

## Sequential Upload

### Enable Sequential Upload

**View Code (Index.cshtml)**:
```html
<ejs-filemanager id="filemanager">
    <e-filemanager-uploadsettings
        sequentialUpload="true"
        autoUpload="true">
    </e-filemanager-uploadsettings>
    <e-filemanager-ajaxsettings url="/FileManager/FileManager"
        uploadUrl="/FileManager/Upload">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>
```

**Sequential Upload Benefits:**
- Reduced server load - processes one file at a time
- Better bandwidth management - consistent upload speed
- Prevents connection congestion - limits concurrent connections
- Improved reliability - individual file failure doesn't affect others
- Pause/resume capability - granular control over uploads

### Sequential vs. Concurrent

**Sequential Mode:**
- Upload flow: file1 → file2 → file3 (in order)
- Upload time: Slower overall (individual times sum up)
- Bandwidth: Evenly distributed
- Server Load: Predictable and manageable
- Network Usage: Optimal for multiple files

**Concurrent Mode (sequentialUpload: false):**
- Upload flow: file1, file2, file3 upload simultaneously
- Upload time: Faster overall
- Bandwidth: Higher usage peaks
- Server Load: Higher, less predictable
- Network Usage: May exceed available bandwidth

## Chunk Upload for Large Files

### Configure Chunk Upload

**View Code (Index.cshtml)**:
```html
<ejs-filemanager id="filemanager">
    <e-filemanager-uploadsettings
        chunkSize="1048576"
        autoUpload="true"
        sequentialUpload="true">
    </e-filemanager-uploadsettings>
    <e-filemanager-ajaxsettings url="/FileManager/FileManager"
        uploadUrl="/FileManager/Upload">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>
```

**Configuration Notes:**
- `chunkSize`: 1048576 (1MB chunks recommended)
- `autoUpload`: true (start uploading immediately)
- `sequentialUpload`: true (recommended for chunk upload)

### Chunk Size Reference

```javascript
const chunkSizes = {
  '256KB': 262144,
  '512KB': 524288,
  '1MB': 1048576,
  '2MB': 2097152,
  '5MB': 5242880,
  '10MB': 10485760
};
```

### How Chunk Upload Works

1. **Large File Detection**: If file size > chunkSize
2. **Splitting**: File is divided into smaller chunks
3. **Sequential Upload**: Each chunk uploaded one at a time
4. **Server Reconstruction**: Backend combines chunks
5. **Pause/Resume**: User can pause and resume upload
6. **Progress Tracking**: Shows overall progress

### Server-Side Chunk Handling

The backend must handle chunks and combine them into the final file:

**Controller Code (FileManagerController.cs)**:
```csharp
[HttpPost]
[Route("Upload")]
public IActionResult Upload(string path, IList<IFormFile> uploadFiles, string action, long size)
{
    try
    {
        foreach (var file in uploadFiles)
        {
            if (size > 0)
            {
                // This is a chunk upload - size parameter indicates chunk size
                HandleChunkUpload(file, path, size);
            }
            else
            {
                // Regular file upload
                SaveFile(file, path);
            }
        }
        
        return Content("");
    }
    catch (Exception ex)
    {
        return StatusCode(500, ex.Message);
    }
}

private void HandleChunkUpload(IFormFile chunk, string path, long chunkSize)
{
    var uploadsFolder = Path.Combine(_env.WebRootPath, "Uploads", path);
    Directory.CreateDirectory(uploadsFolder);
    
    var tempFilePath = Path.Combine(uploadsFolder, chunk.FileName + ".tmp");
    
    // Append chunk to temporary file
    using (var stream = new FileStream(tempFilePath, FileMode.Append))
    {
        chunk.CopyTo(stream);
    }
    
    // Check if all chunks received
    var fileInfo = new FileInfo(tempFilePath);
    if (fileInfo.Length >= long.Parse(Request.Form["size"]))
    {
        // All chunks received - rename to final filename
        var finalPath = Path.Combine(uploadsFolder, chunk.FileName);
        System.IO.File.Move(tempFilePath, finalPath, true);
    }
}
```

### Chunk Upload Example with Progress

**View Code (Index.cshtml)**:
```html
<div style="margin-bottom: 15px;">
    <h4>Upload Progress: <span id="progressPercent">0</span>%</h4>
    <progress id="uploadProgress" max="100" value="0" style="width: 100%; height: 25px;"></progress>
</div>

<ejs-filemanager id="filemanager">
    <e-filemanager-uploadsettings
        chunkSize="1048576"
        autoUpload="true"
        sequentialUpload="true">
    </e-filemanager-uploadsettings>
    <e-filemanager-ajaxsettings url="/FileManager/FileManager"
        uploadUrl="/FileManager/Upload">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>
```

## Directory Upload

### Enable Folder Upload

**View Code (Index.cshtml)**:
```html
<ejs-filemanager id="filemanager">
    <e-filemanager-uploadsettings
        directoryUpload="true"
        autoUpload="true">
    </e-filemanager-uploadsettings>
    <e-filemanager-ajaxsettings url="/FileManager/FileManager"
        uploadUrl="/FileManager/Upload">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>
```

**Important Limitations:**
- When `directoryUpload` is true, ONLY folders can be uploaded through the UI
- Individual file uploads are not available in directory upload mode
- Set `directoryUpload: false` to upload individual files
- Folder structure is preserved on the server

### Directory Structure Handling

**Controller Code (FileManagerController.cs)**:
```csharp
[HttpPost]
[Route("Upload")]
public IActionResult Upload(string path, IList<IFormFile> uploadFiles, string action)
{
    try
    {
        foreach (var file in uploadFiles)
        {
            // Extract relative path from file name to recreate folder structure
            // Files from directory uploads include their relative paths
            var uploadsFolder = Path.Combine(_env.WebRootPath, "Uploads", path);
            
            // Extract the relative path if present
            var relativePath = file.FileName.Contains("/") 
                ? Path.GetDirectoryName(file.FileName) 
                : "";
            
            var targetFolder = string.IsNullOrEmpty(relativePath)
                ? uploadsFolder
                : Path.Combine(uploadsFolder, relativePath);
            
            // Create directory structure
            Directory.CreateDirectory(targetFolder);
            
            // Save file maintaining folder structure
            var fileName = Path.GetFileName(file.FileName);
            var filePath = Path.Combine(targetFolder, fileName);
            
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                file.CopyTo(stream);
            }
        }
        
        return Content("");
    }
    catch (Exception ex)
    {
        return StatusCode(500, ex.Message);
    }
}
```

## Upload Events and Handlers

### Before Send Event

Triggered before upload request is sent:

**View Code (Index.cshtml)**:
```html
<ejs-filemanager id="filemanager"
    beforeSend="onBeforeSend">
    <e-filemanager-uploadsettings autoUpload="true"></e-filemanager-uploadsettings>
    <e-filemanager-ajaxsettings url="/FileManager/FileManager"
        uploadUrl="/FileManager/Upload">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
    function onBeforeSend(args) {
        console.log('Files to upload:', args.fileDetails);
        console.log('Upload path:', args.path);
        
        // Cancel upload if file is too large
        var maxSize = 10485760; // 10MB
        if (args.fileDetails && args.fileDetails.some(function(f) { return f.size > maxSize; })) {
            args.cancel = true;
            alert('Some files exceed the maximum size of 10MB');
        }
    }
</script>
```

## Practical Examples

### Example 1: Basic Upload with Restrictions

**View Code (Index.cshtml)**:
```html
<ejs-filemanager id="filemanager"
    beforeSend="validateUpload">
    <e-filemanager-uploadsettings
        autoUpload="true"
        allowedExtensions=".jpg,.png,.pdf,.doc,.docx"
        maxFileSize="5242880"
        autoClose="false">
    </e-filemanager-uploadsettings>
    <e-filemanager-ajaxsettings url="/FileManager/FileManager"
        uploadUrl="/FileManager/Upload">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
    function validateUpload(args) {
        if (args.fileDetails) {
            args.fileDetails.forEach(function(file) {
                var ext = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
                var allowedExts = ['.jpg', '.png', '.pdf', '.doc', '.docx'];
                
                if (allowedExts.indexOf(ext) === -1) {
                    alert('File type ' + ext + ' is not allowed');
                    args.cancel = true;
                }
            });
        }
    }
</script>
```

### Example 2: Sequential Chunk Upload

**View Code (Index.cshtml)**:
```html
<div style="margin-bottom: 10px;">
    <label>Uploading: <span id="currentFile">--</span></label>
</div>

<ejs-filemanager id="filemanager">
    <e-filemanager-uploadsettings
        chunkSize="2097152"
        sequentialUpload="true"
        autoUpload="true">
    </e-filemanager-uploadsettings>
    <e-filemanager-ajaxsettings url="/FileManager/FileManager"
        uploadUrl="/FileManager/Upload">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>
```

### Example 3: Folder Upload

**View Code (Index.cshtml)**:
```html
<ejs-filemanager id="filemanager">
    <e-filemanager-uploadsettings
        directoryUpload="true"
        autoUpload="true">
    </e-filemanager-uploadsettings>
    <e-filemanager-ajaxsettings url="/FileManager/FileManager"
        uploadUrl="/FileManager/Upload">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
    console.log('Folder upload enabled - users can select entire folders to upload');
</script>
```

## Best Practices

### 1. Validate File Types Server-Side

Always validate on server, never trust client-side filters:

**Controller Code (FileManagerController.cs)**:
```csharp
[HttpPost]
public IActionResult Upload(IList<IFormFile> uploadFiles, string path)
{
    var allowedExtensions = new[] { ".jpg", ".png", ".pdf", ".doc", ".docx" };
    
    foreach (var file in uploadFiles)
    {
        var fileExtension = Path.GetExtension(file.FileName).ToLower();
        
        if (!allowedExtensions.Contains(fileExtension))
        {
            return BadRequest($"File type {fileExtension} is not allowed");
        }
        
        // Process upload...
    }
    
    return Content("");
}
```

### 2. Chunk Size Recommendations

**JavaScript Configuration**:
```javascript
// Network conditions affect optimal chunk sizes
var chunkSizeRecommendations = {
    'Mobile-3G': 512 * 1024,        // 512 KB - slower connection
    'Mobile-4G': 2 * 1024 * 1024,   // 2 MB - moderate connection
    'Desktop-WiFi': 5 * 1024 * 1024 // 5 MB - fast connection
};
```

**View Code (Index.cshtml)**:
```html
<ejs-filemanager id="filemanager">
    <e-filemanager-uploadsettings
        chunkSize="2097152"
        sequentialUpload="true">
    </e-filemanager-uploadsettings>
    <e-filemanager-ajaxsettings url="/FileManager/FileManager"
        uploadUrl="/FileManager/Upload">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>
```

### 3. Comprehensive Error Handling

**View Code (Index.cshtml)**:
```html
<div id="errorBox" style="display: none; padding: 10px; background-color: #ffebee; border: 1px solid #f44336; margin-bottom: 10px;">
    <strong>Upload Errors:</strong>
    <ul id="errorList"></ul>
</div>

<ejs-filemanager id="filemanager"
    beforeSend="validateBeforeUpload">
    <e-filemanager-uploadsettings
        maxFileSize="104857600"
        autoUpload="true">
    </e-filemanager-uploadsettings>
    <e-filemanager-ajaxsettings url="/FileManager/FileManager"
        uploadUrl="/FileManager/Upload">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
    function validateBeforeUpload(args) {
        var errors = [];
        var maxSize = 100 * 1024 * 1024; // 100 MB
        
        if (args.fileDetails) {
            args.fileDetails.forEach(function(file) {
                if (file.size > maxSize) {
                    errors.push(file.name + ' exceeds size limit (100MB max)');
                }
                
                // Additional validations
                if (file.name.length > 255) {
                    errors.push(file.name + ' has filename that is too long');
                }
            });
        }
        
        if (errors.length > 0) {
            displayErrors(errors);
            args.cancel = true;
        }
    }
    
    function displayErrors(errors) {
        var errorBox = document.getElementById('errorBox');
        var errorList = document.getElementById('errorList');
        errorList.innerHTML = '';
        
        errors.forEach(function(error) {
            var li = document.createElement('li');
            li.textContent = error;
            errorList.appendChild(li);
        });
        
        errorBox.style.display = 'block';
        setTimeout(function() {
            errorBox.style.display = 'none';
        }, 5000);
    }
</script>
```

---

**Related Topics:**
- Drag and drop: See `drag-and-drop.md`
- File operations: See `file-operations.md`
- Upload events: See `file-events.md`
