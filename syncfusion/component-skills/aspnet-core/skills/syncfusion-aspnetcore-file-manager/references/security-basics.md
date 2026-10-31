# Security Fundamentals and Best Practices

## Table of Contents
- [Security Overview](#security-overview)
- [Server-Side Validation](#server-side-validation)
- [HTML Sanitization](#html-sanitization)
- [XSS Prevention](#xss-prevention)
- [CORS Configuration](#cors-configuration)
- [File Validation](#file-validation)
- [Path Traversal Prevention](#path-traversal-prevention)
- [Best Practices](#best-practices)
- [Common Vulnerabilities](#common-vulnerabilities)

## Security Overview

Implementing File Manager securely requires attention to:

**Security Concerns:**
1. **Path Traversal** - Prevent access outside intended directory
2. **XSS Attacks** - Prevent malicious script injection
3. **File Upload Exploitation** - Validate uploads
4. **CORS Attacks** - Restrict cross-origin access
5. **Unauthorized Access** - Implement authentication
6. **Data Exposure** - Protect sensitive information

## Server-Side Validation

### Never Trust Client-Side Validation

```csharp
[HttpPost]
[Route("Upload")]
public IActionResult Upload(IFormFile file, string path)
{
    // NEVER trust client-side restrictions
    // Always validate on server
    
    // 1. Validate file extension
    var allowedExtensions = new[] { ".jpg", ".png", ".pdf" };
    var fileExtension = Path.GetExtension(file.FileName).ToLower();
    
    if (!allowedExtensions.Contains(fileExtension))
    {
        return BadRequest("File type not allowed");
    }
    
    // 2. Validate file size
    const long maxFileSize = 5 * 1024 * 1024; // 5MB
    if (file.Length > maxFileSize)
    {
        return BadRequest("File too large");
    }
    
    // 3. Validate path
    var safePath = ValidatePath(path);
    if (safePath == null)
    {
        return BadRequest("Invalid path");
    }
    
    // 4. Check MIME type
    var validMimeTypes = new[] { "image/jpeg", "image/png", "application/pdf" };
    if (!validMimeTypes.Contains(file.ContentType))
    {
        return BadRequest("Invalid file type");
    }
    
    // Process file...
    return Ok();
}
```

### Path Validation Helper

```csharp
private string ValidatePath(string path)
{
    try
    {
        // Resolve full path
        var basePath = Path.Combine(Directory.GetCurrentDirectory(), "Files");
        var fullPath = Path.GetFullPath(Path.Combine(basePath, path));
        
        // Ensure path is within base directory
        if (!fullPath.StartsWith(basePath, StringComparison.OrdinalIgnoreCase))
        {
            return null; // Path traversal attempt
        }
        
        return fullPath;
    }
    catch
    {
        return null; // Invalid path
    }
}
```

## HTML Sanitization

### Enable HTML Sanitization API

The `enableHtmlSanitizer` property enables automatic HTML sanitization in the File Manager component. This prevents malicious HTML/script injection in file names and other text content:

**Basic Configuration**:
```html
<ejs-filemanager id="filemanager"
    enableHtmlSanitizer="true"
    view="Details">
    <e-filemanager-ajaxsettings url="/FileManager/Read">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>
```

**What enableHtmlSanitizer Protects**:
- File names with HTML tags
- Metadata containing scripts
- Custom file properties
- Folder names with malicious content
- Template content rendering

**Example - Handling Malicious File Names**:
```html
<ejs-filemanager id="filemanager"
    enableHtmlSanitizer="true"
    largeIconsTemplate="#itemTemplate">
    <e-filemanager-ajaxsettings url="/FileManager/Read">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script id="itemTemplate" type="text/x-template">
    <!-- Malicious content in file names is automatically sanitized -->
    <div class="e-item">
        <div class="e-icon">${getIcon(data.name)}</div>
        <div class="e-name">${data.name}</div>
    </div>
</script>

<script>
// enableHtmlSanitizer will safely escape it
function getIcon(fileName) {
    const ext = (fileName.split('.').pop() || '').toLowerCase();
    return getIconClass(ext);
}
</script>
```

### Sanitize File Names

File names can contain malicious content. Sanitize before display:

**JavaScript Sanitization**:
```javascript
function sanitizeFileName(fileName) {
    // Remove special characters that could cause XSS
    return fileName
        .replace(/[<>:"\/\\|?*]/g, '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .trim();
}
```

**Advanced enableHtmlSanitizer Configuration**:
```html
<ejs-filemanager id="filemanager"
    enableHtmlSanitizer="true"
    allowMultiSelection="true"
    folderCreate="onFolderCreate"
    fileSelect="onFileSelect">
    <e-filemanager-detailsviewsettings>
        <e-detailsviewsettings-columns>
            <e-detailsviewsettings-column field="name" headerText="Name" width="200">
            </e-detailsviewsettings-column>
            <e-detailsviewsettings-column field="dateModified" headerText="Modified" width="150">
            </e-detailsviewsettings-column>
        </e-detailsviewsettings-columns>
    </e-filemanager-detailsviewsettings>
    <e-filemanager-ajaxsettings url="/FileManager/Read">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
function onFolderCreate(args) {
    const fileManager = document.getElementById('filemanager').ej2_instances[0];
    // File name is automatically sanitized by enableHtmlSanitizer
    console.log('Folder created with sanitized name:', args.name);
}

function onFileSelect(args) {
    // File names are automatically sanitized when selected
    args.fileDetails.forEach(file => {
        console.log('Selected file (sanitized):', file.name);
    });
}
</script>
```

**View Code (Index.cshtml) with enableHtmlSanitizer**:
```html
<ejs-filemanager id="filemanager"
    enableHtmlSanitizer="true"
    folderCreate="onFolderCreate">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
function onFolderCreate(args) {
    const fileManager = document.getElementById('filemanager').ej2_instances[0];
    const safeName = sanitizeFileName(args.name);
    console.log('Sanitized name:', safeName);
}
</script>
```

### Server-Side Sanitization

```csharp
public string SanitizeFileName(string fileName)
{
    // Remove invalid characters
    var invalidChars = Path.GetInvalidFileNameChars();
    var sanitized = new string(fileName
        .Where(c => !invalidChars.Contains(c))
        .ToArray());
    
    // Remove potentially dangerous patterns
    var dangerousPatterns = new[] { "<", ">", "\"", "'", "&" };
    foreach (var pattern in dangerousPatterns)
    {
        sanitized = sanitized.Replace(pattern, "");
    }
    
    return sanitized.Trim();
}
```

## XSS Prevention

### Prevent Script Injection in File Names

```javascript
// DON'T: Use innerHTML (Vulnerable to XSS)
function unsafeDomRender(fileName) {
    const div = document.createElement('div');
    div.innerHTML = fileName;  // UNSAFE: Script injection possible
    return div;
}

// DO: Use textContent (Safe from XSS)
function safeDomRender(fileName) {
    const div = document.createElement('div');
    div.textContent = fileName;  // SAFE: Text only, no script execution
    return div;
}

// DO: Use innerText (Also safe)
function safeDomRender2(fileName) {
    const div = document.createElement('div');
    div.innerText = fileName;  // SAFE: Text only
    return div;
}

// DO: Use createTextNode (Most secure)
function safestDomRender(fileName) {
    const div = document.createElement('div');
    const textNode = document.createTextNode(fileName);
    div.appendChild(textNode);  // SAFE: Pure text node
    return div;
}
```

**In ASP.NET Core Razor**:
```html
<!-- Safe: Razor automatically HTML encodes output -->
<div>@Model.FileName</div>
<!-- Output: automatically escaped -->

<!-- Unsafe: Never use Html.Raw with user input -->
<!-- DON'T: <div>@Html.Raw(userFileName)</div> -->

<!-- Safe: Use asp-* tag helpers -->
<input type="text" value="@Model.FileName" />
<!-- Properly encoded -->
```

### Content Security Policy

```html
<!-- Add to HTML head -->
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-inline'; 
               style-src 'self' 'unsafe-inline';">
```

```csharp
// Or set in ASP.NET
response.Headers.Add("Content-Security-Policy", 
  "default-src 'self'; script-src 'self'");
```

## CORS Configuration

### Enable CORS Safely

```csharp
// Startup.cs or Program.cs
public void ConfigureServices(IServiceCollection services)
{
    services.AddCors(options =>
    {
        options.AddPolicy("FileManagerPolicy", builder =>
        {
            // Restrict to specific origin
            builder
                .WithOrigins("url")
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials();
        });
    });
}

public void Configure(IApplicationBuilder app)
{
    app.UseCors("FileManagerPolicy");
}
```

### CORS in File Manager

**View Code (Index.cshtml)**:
```html
<ejs-filemanager id="filemanager" view="Details">
    <e-filemanager-detailsviewsettings>
        <e-detailsviewsettings-columns>
            <e-detailsviewsettings-column field="name" headerText="Name" width="200">
            </e-detailsviewsettings-column>
            <e-detailsviewsettings-column field="size" headerText="Size" width="120">
            </e-detailsviewsettings-column>
        </e-detailsviewsettings-columns>
    </e-filemanager-detailsviewsettings>
    <!-- CORS is automatically handled by browser when same origin -->
    <!-- For cross-origin requests, ensure server CORS policy is configured -->
    <e-filemanager-ajaxsettings url="/FileManager/Read" 
        uploadUrl="/FileManager/Upload"
        downloadUrl="/FileManager/Download">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>
```

**CORS Configuration in Program.cs**:
```csharp
// Configure CORS with File Manager API endpoints
builder.Services.AddCors(options =>
{
    options.AddPolicy("FileManagerCorsPolicy", builder =>
    {
        builder
            .WithOrigins("url", "url")
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials()
            .WithExposedHeaders("Content-Disposition"); // For file downloads
    });
});

var app = builder.Build();

app.UseCors("FileManagerCorsPolicy");

// File Manager API endpoints with CORS
app.MapControllers();
```

**Note:** CORS is automatically handled by the browser when requests are made to the same origin. For cross-origin file operations, ensure the server has appropriate CORS policies configured.

## File Validation

### Comprehensive File Validation

```csharp
public class FileValidator
{
    private readonly List<string> _allowedExtensions;
    private readonly long _maxFileSize;
    
    public FileValidator(List<string> extensions, long maxSize)
    {
        _allowedExtensions = extensions;
        _maxFileSize = maxSize;
    }
    
    public ValidationResult Validate(IFormFile file)
    {
        // Check if file exists
        if (file == null || file.Length == 0)
            return ValidationResult.Failed("No file provided");
        
        // Check file size
        if (file.Length > _maxFileSize)
            return ValidationResult.Failed("File too large");
        
        // Check extension
        var ext = Path.GetExtension(file.FileName).ToLower();
        if (!_allowedExtensions.Contains(ext))
            return ValidationResult.Failed("File type not allowed");
        
        // Check MIME type
        if (!IsValidMimeType(file.ContentType, ext))
            return ValidationResult.Failed("Invalid file type");
        
        // Check file contents (magic bytes)
        if (!ValidateMagicBytes(file, ext))
            return ValidationResult.Failed("File content invalid");
        
        return ValidationResult.Success();
    }
    
    private bool IsValidMimeType(string contentType, string extension)
    {
        var mimeMap = new Dictionary<string, string>
        {
            { ".pdf", "application/pdf" },
            { ".jpg", "image/jpeg" },
            { ".png", "image/png" },
            { ".gif", "image/gif" }
        };
        
        return mimeMap.ContainsKey(extension) && 
               mimeMap[extension] == contentType;
    }
    
    private bool ValidateMagicBytes(IFormFile file, string extension)
    {
        var magicBytes = new Dictionary<string, byte[]>
        {
            { ".pdf", new byte[] { 0x25, 0x50, 0x44, 0x46 } },      // %PDF
            { ".jpg", new byte[] { 0xFF, 0xD8, 0xFF } },              // JPG
            { ".png", new byte[] { 0x89, 0x50, 0x4E, 0x47 } }        // PNG
        };
        
        if (!magicBytes.ContainsKey(extension))
            return true;
        
        var buffer = new byte[4];
        file.OpenReadStream().Read(buffer, 0, buffer.Length);
        
        var expectedBytes = magicBytes[extension];
        return buffer.Take(expectedBytes.Length)
                     .SequenceEqual(expectedBytes);
    }
}
```

## Path Traversal Prevention

### Prevent Directory Escape

```csharp
public string ValidateAndResolvePath(string basePath, string userPath)
{
    try
    {
        // Get absolute paths
        var baseAbsolute = Path.GetFullPath(basePath);
        var userAbsolute = Path.GetFullPath(Path.Combine(basePath, userPath));
        
        // Ensure user path is within base path
        if (!userAbsolute.StartsWith(baseAbsolute, 
            StringComparison.OrdinalIgnoreCase))
        {
            throw new UnauthorizedAccessException("Path traversal detected");
        }
        
        return userAbsolute;
    }
    catch
    {
        throw new ArgumentException("Invalid path");
    }
}

// Usage
[HttpGet]
[Route("Read")]
public IActionResult Read(string path)
{
    try
    {
        var basePath = Path.Combine(Directory.GetCurrentDirectory(), "Files");
        var validPath = ValidateAndResolvePath(basePath, path);
        
        // Read files from validPath
        return Ok();
    }
    catch (UnauthorizedAccessException)
    {
        return Forbid();
    }
}
```

### Examples of Path Traversal Attempts

```javascript
// These should be blocked:
"../../etc/passwd"        // Directory traversal
"C:\\Windows\\System32"   // Absolute path
"/etc/passwd"             // Root path
"./../../sensitive"       // Relative traversal
```

## Best Practices

### 1. Use HTTPS Always

```csharp
// Force HTTPS
app.UseHttpsRedirection();

// In Startup
services.AddHsts(options =>
{
    options.MaxAge = TimeSpan.FromDays(365);
});
```

### 2. Implement Rate Limiting

```csharp
services.AddRateLimiting(options =>
{
    options.GlobalLimiter = PartitionedRateLimiter.Create<HttpContext, string>(context =>
        RateLimitPartition.GetFixedWindowLimiter(
            partitionKey: context.Request.Headers.Host.ToString(),
            factory: partition => new FixedWindowRateLimiterOptions
            {
                AutoReplenishment = true,
                PermitLimit = 100,
                Window = TimeSpan.FromSeconds(60)
            }));
});

app.UseRateLimiter();
```

### 3. Audit Logging

```csharp
public void LogFileOperation(string operation, string userName, string filePath)
{
    var logEntry = new
    {
        Timestamp = DateTime.UtcNow,
        Operation = operation,
        User = userName,
        FilePath = filePath,
        IpAddress = GetClientIpAddress(),
        Success = true
    };
    
    logger.LogInformation("File operation: {@LogEntry}", logEntry);
}
```

### 4. Regular Security Audits

- Test for path traversal vulnerabilities
- Validate all input/output
- Review CORS settings
- Check file upload handling
- Audit access logs

## Common Vulnerabilities

### Vulnerability 1: Missing File Type Validation

```html
<!-- VULNERABLE: Only client-side validation -->
<ejs-filemanager id="filemanager">
    <e-filemanager-uploadsettings 
        allowedExtensions=".jpg,.png">
    </e-filemanager-uploadsettings>
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>
```

**Fix:** Always validate on server

### Vulnerability 2: Arbitrary Path Access

```csharp
// VULNERABLE
[HttpGet]
[Route("Download")]
public IActionResult Download(string path)
{
    // No path validation!
    byte[] fileBytes = System.IO.File.ReadAllBytes(path);
    return File(fileBytes, "application/octet-stream");
}
```

**Fix:** Validate path is within allowed directory

### Vulnerability 3: XSS in File Names

```html
<!-- VULNERABLE -->
<ejs-filemanager id="filemanager"
    enableHtmlSanitizer="false">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
// Vulnerable event handler without sanitization
const fileManager = document.getElementById('filemanager').ej2_instances[0];
fileManager.fileSelect = (args) => {
    document.title = args.fileDetails[0].name;  // XSS risk
};
</script>
```

**Fix:** Enable HTML sanitization and use proper escaping

```html
<!-- SECURE -->
<ejs-filemanager id="filemanager"
    enableHtmlSanitizer="true">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
const fileManager = document.getElementById('filemanager').ej2_instances[0];
fileManager.fileSelect = (args) => {
    // Safe: content is automatically sanitized
    document.title = args.fileDetails[0].name;
};
</script>
```

---

**Related Topics:**
- Authentication headers: See `authentication-headers.md`
- Advanced permissions: See `permissions-access-control.md`
