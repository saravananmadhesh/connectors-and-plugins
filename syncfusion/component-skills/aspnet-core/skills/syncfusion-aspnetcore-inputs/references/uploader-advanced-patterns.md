# Advanced Patterns in ASP.NET Core Uploader

## Table of Contents
- [Chunk Upload](#chunk-upload)
- [Form Submission](#form-submission)
- [Directory Upload](#directory-upload)
- [File Removal](#file-removal)
- [Error Handling](#error-handling)
- [Security Considerations](#security-considerations)
- [Performance Optimization](#performance-optimization)

## Chunk Upload

Upload large files in smaller chunks for reliability:

### Enable Chunk Upload

```html
<ejs-uploader id="uploader"
    maxFileSize="1073741824">
    <e-uploader-asyncsettings saveUrl="Home/Save" 
                      removeUrl="Home/Remove" 
                      chunkSize="512000"></e-uploader-asyncsettings>
</ejs-uploader>
```

### Server-Side Chunk Handling

The form keys sent by the uploader are `chunk-index` and `total-chunk`:

```csharp
public string uploads = Path.Combine(Directory.GetCurrentDirectory(), "Uploaded Files");

public async Task<IActionResult> Save(IFormFile UploadFiles)
{
    try
    {
        if (UploadFiles.Length > 0)
        {
            var fileName = UploadFiles.FileName;

            if (!Directory.Exists(uploads))
                Directory.CreateDirectory(uploads);

            if (UploadFiles.ContentType == "application/octet-stream") // Chunk upload
            {
                var chunkIndex = Request.Form["chunk-index"];
                var totalChunk = Request.Form["total-chunk"];

                var tempFilePath = Path.Combine(uploads, fileName + ".part");

                using (var fileStream = new FileStream(tempFilePath, chunkIndex == "0" ? FileMode.Create : FileMode.Append))
                {
                    await UploadFiles.CopyToAsync(fileStream);
                }

                if (Convert.ToInt32(chunkIndex) == Convert.ToInt32(totalChunk) - 1)
                {
                    var finalFilePath = Path.Combine(uploads, fileName);
                    System.IO.File.Move(tempFilePath, finalFilePath);
                    return Ok(new { status = "File uploaded successfully" });
                }

                return Ok(new { status = "Chunk uploaded successfully" });
            }
            else // Normal upload
            {
                var filePath = Path.Combine(uploads, fileName);
                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await UploadFiles.CopyToAsync(fileStream);
                }
                return Ok(new { status = "File uploaded successfully" });
            }
        }
        return BadRequest(new { status = "No file to upload" });
    }
    catch (Exception ex)
    {
        return StatusCode(500, new { status = "Error", message = ex.Message });
    }
}
```

## Form Submission

Upload files as part of form submission:

### Form Integration

```html
<form method="post" asp-action="UploadWithForm" enctype="multipart/form-data">
    <div class="form-group">
        <label asp-for="Name">Name:</label>
        <input asp-for="Name" required />
    </div>
    
    <div class="form-group">
        <label asp-for="Description">Description:</label>
        <textarea asp-for="Description"></textarea>
    </div>
    
    <div class="form-group">
        <label for="documents">Upload Documents:</label>
        <ejs-uploader id="documents"
            allowedExtensions=".pdf,.doc,.docx"
            maxFileSize="5242880"
            autoUpload="false">
            <e-uploader-asyncsettings saveUrl="Home/Save" removeUrl="Home/Remove"></e-uploader-asyncsettings>
        </ejs-uploader>
    </div>
    
    <button type="submit">Submit Form</button>
</form>
```

### Form Submission Handler

```csharp
[HttpPost]
public async Task<IActionResult> UploadWithForm(string name, string description, IFormFile[] documents)
{
    try
    {
        // Validate form data
        if (string.IsNullOrEmpty(name))
            return BadRequest("Name is required");
        
        // Handle file uploads
        string uploadPath = Path.Combine(_webHostEnvironment.WebRootPath, "Uploads", name);
        if (!Directory.Exists(uploadPath))
            Directory.CreateDirectory(uploadPath);

        if (documents != null && documents.Length > 0)
        {
            foreach (IFormFile doc in documents)
            {
                if (doc.Length > 0)
                {
                    string filePath = Path.Combine(uploadPath, doc.FileName);
                    using (FileStream fs = System.IO.File.Create(filePath))
                    {
                        await doc.CopyToAsync(fs);
                    }
                }
            }
        }

        // Save form data to database
        // var record = new UploadRecord { Name = name, Description = description, ... };
        // await _context.SaveChangesAsync();

        return RedirectToAction("Success");
    }
    catch (Exception ex)
    {
        return BadRequest($"Error: {ex.Message}");
    }
}
```

## Directory Upload

Upload complete folder structure:

### Server-Side Directory Handling

```csharp
[HttpPost]
public IActionResult Save(IFormFile[] uploader)
{
    string baseUploadPath = Path.Combine(_webHostEnvironment.WebRootPath, "Uploads");
    if (!Directory.Exists(baseUploadPath))
        Directory.CreateDirectory(baseUploadPath);

    if (uploader != null)
    {
        foreach (IFormFile file in uploader)
        {
            if (file.Length > 0)
            {
                // Get relative path (includes directory structure)
                string relativePath = file.Name;
                string filePath = Path.Combine(baseUploadPath, relativePath);
                
                // Create directory structure if needed
                string directoryPath = Path.GetDirectoryName(filePath);
                if (!Directory.Exists(directoryPath))
                    Directory.CreateDirectory(directoryPath);

                using (FileStream fs = System.IO.File.Create(filePath))
                {
                    file.CopyTo(fs);
                    fs.Flush();
                }
            }
        }
    }
    return Ok();
}
```

## File Removal

Handle file deletion after upload:

### Removal Handler

```csharp
[HttpPost]
public IActionResult Remove(string[] files)
{
    string uploadPath = Path.Combine(_webHostEnvironment.WebRootPath, "Uploads");
    
    if (files != null)
    {
        foreach (string file in files)
        {
            try
            {
                string filePath = Path.Combine(uploadPath, file);
                
                // Security check: Prevent directory traversal
                string fullPath = Path.GetFullPath(filePath);
                string fullUploadPath = Path.GetFullPath(uploadPath);
                
                if (!fullPath.StartsWith(fullUploadPath))
                    continue; // Skip suspicious paths
                
                if (System.IO.File.Exists(filePath))
                {
                    System.IO.File.Delete(filePath);
                }
            }
            catch (Exception ex)
            {
                // Log error but continue with other files
                Console.WriteLine($"Error deleting file: {ex.Message}");
            }
        }
    }
    return Ok();
}
```

### Track Removed Files

```html
<ejs-uploader id="uploader"
    success="onSuccess">
    <e-uploader-asyncsettings saveUrl="Home/Save" removeUrl="Home/Remove"></e-uploader-asyncsettings>
</ejs-uploader>

<script>
function onSuccess(args) {
    if (args.operation === 'remove') {
        console.log('Removed: ' + args.file.name);
        
        // Update UI or database to track removed files
        fetch('Home/LogRemoved', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fileName: args.file.name })
        });
    }
}
</script>
```

## Error Handling

Handle upload failures gracefully:

### Comprehensive Error Handler

```html
<ejs-uploader id="uploader"
    failure="onFailure"
    success="onSuccess">
    <e-uploader-asyncsettings saveUrl="Home/Save" removeUrl="Home/Remove"></e-uploader-asyncsettings>
</ejs-uploader>

<div id="errorContainer"></div>

<script>
function onFailure(args) {
    let errorMsg = '';
    
    // Parse error based on status code
    if (args.statusCode === 400) {
        errorMsg = args.response || 'Bad request';
    } else if (args.statusCode === 413) {
        errorMsg = 'File size exceeds limit';
    } else if (args.statusCode === 500) {
        errorMsg = 'Server error. Please try again later';
    } else if (args.statusCode === 0) {
        errorMsg = 'Network error or server unreachable';
    } else {
        errorMsg = 'Upload failed: ' + args.response;
    }
    
    // Display error
    document.getElementById('errorContainer').innerHTML = 
        '<div style="color: red; padding: 10px; border: 1px solid #ffcccc; border-radius: 4px;">' +
        'Error: ' + errorMsg +
        '</div>';
}

function onSuccess(args) {
    if (args.operation === 'upload') {
        console.log('Uploaded: ' + args.file.name);
        document.getElementById('errorContainer').innerHTML = '';
    }
}
</script>
```

### Server-Side Validation with Errors

```csharp
[HttpPost]
public IActionResult Save(IFormFile[] uploader)
{
    try
    {
        string uploadPath = Path.Combine(_webHostEnvironment.WebRootPath, "Uploads");
        
        if (uploader == null || uploader.Length == 0)
            return BadRequest("No files provided");

        foreach (IFormFile file in uploader)
        {
            // Validate file
            if (file.Length == 0)
                return BadRequest($"File {file.FileName} is empty");
            
            if (file.Length > 5242880)  // 5MB
                return StatusCode(413, $"File {file.FileName} exceeds size limit");
            
            // Validate extension
            string ext = Path.GetExtension(file.FileName).ToLower();
            var allowedExts = new[] { ".jpg", ".png", ".pdf" };
            if (!allowedExts.Contains(ext))
                return BadRequest($"File type {ext} not allowed");
            
            // Save file
            if (!Directory.Exists(uploadPath))
                Directory.CreateDirectory(uploadPath);

            string filePath = Path.Combine(uploadPath, file.FileName);
            using (FileStream fs = System.IO.File.Create(filePath))
            {
                file.CopyTo(fs);
                fs.Flush();
            }
        }

        return Ok(new { message = "Upload successful", count = uploader.Length });
    }
    catch (IOException ex)
    {
        return StatusCode(500, $"IO Error: {ex.Message}");
    }
    catch (Exception ex)
    {
        return StatusCode(500, $"Server error: {ex.Message}");
    }
}
```

## Security Considerations

Implement security best practices:

### File Type Validation

```csharp
// Whitelist allowed MIME types
private readonly Dictionary<string, string> _allowedMimeTypes = new()
{
    { "image/jpeg", ".jpg" },
    { "image/png", ".png" },
    { "application/pdf", ".pdf" },
    { "application/msword", ".doc" }
};

[HttpPost]
public IActionResult Save(IFormFile[] uploader)
{
    foreach (IFormFile file in uploader)
    {
        // Check MIME type
        if (!_allowedMimeTypes.ContainsKey(file.ContentType))
            return BadRequest("Invalid file type");
        
        // Check file signature (magic bytes)
        byte[] buffer = new byte[512];
        file.OpenReadStream().Read(buffer, 0, 512);
        
        if (!IsValidFileSignature(buffer, file.ContentType))
            return BadRequest("File content does not match extension");
    }
    
    return Ok();
}

private bool IsValidFileSignature(byte[] buffer, string mimeType)
{
    // PNG: 89 50 4E 47
    if (mimeType == "image/png")
        return buffer[0] == 0x89 && buffer[1] == 0x50 && buffer[2] == 0x4E && buffer[3] == 0x47;
    
    // JPEG: FF D8 FF
    if (mimeType == "image/jpeg")
        return buffer[0] == 0xFF && buffer[1] == 0xD8 && buffer[2] == 0xFF;
    
    return true;
}
```

### Prevent Directory Traversal

```csharp
private string GetSafePath(string baseDir, string fileName)
{
    string filePath = Path.Combine(baseDir, fileName);
    string fullPath = Path.GetFullPath(filePath);
    string fullBaseDir = Path.GetFullPath(baseDir);
    
    // Ensure file is within upload directory
    if (!fullPath.StartsWith(fullBaseDir))
        throw new InvalidOperationException("Invalid file path");
    
    return filePath;
}
```

## Performance Optimization

Optimize upload performance:

### Async File Handling

```csharp
[HttpPost]
public async Task<IActionResult> Save(IFormFile[] uploader)
{
    string uploadPath = Path.Combine(_webHostEnvironment.WebRootPath, "Uploads");
    
    if (uploader != null)
    {
        var tasks = uploader.Select(async file =>
        {
            if (file.Length > 0)
            {
                string filePath = Path.Combine(uploadPath, file.FileName);
                
                using (FileStream fs = System.IO.File.Create(filePath))
                {
                    await file.CopyToAsync(fs);
                }
            }
        });
        
        await Task.WhenAll(tasks);
    }
    
    return Ok();
}
```

### Concurrent Upload Limits

```csharp
// Configure in Program.cs
private static readonly SemaphoreSlim _uploadSemaphore = new SemaphoreSlim(5); // Max 5 concurrent

[HttpPost]
public async Task<IActionResult> Save(IFormFile[] uploader)
{
    await _uploadSemaphore.WaitAsync();
    
    try
    {
        // Save files...
        return Ok();
    }
    finally
    {
        _uploadSemaphore.Release();
    }
}
```

## Summary

| Feature | Implementation | Benefit |
|---------|----------------|---------|
| Chunk Upload | `chunkSize` property + server handling | Upload large files reliably |
| Form Integration | `autoUpload="false"` + form submission | Combine file upload with data |
| Directory Upload | `directoryUpload="true"` | Upload folder structures |
| Error Handling | Status codes + error messages | Better UX |
| Security | MIME validation + path sanitization | Prevent attacks |
| Performance | Async + concurrency limits | Handle multiple uploads |
