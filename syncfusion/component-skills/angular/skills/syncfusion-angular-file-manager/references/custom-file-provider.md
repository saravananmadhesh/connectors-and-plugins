# Custom File Provider in Syncfusion Angular File Manager

## Overview

The FileManager component is flexible and can work with any backend or file storage service. A custom file provider allows you to integrate with cloud storage services (Azure, AWS S3, Google Drive), custom backends, or specialized file systems.

## Table of Contents
- [Custom File Provider Architecture](#custom-file-provider-architecture)
- [Implementing Custom Backend](#implementing-custom-backend)
- [Cloud Provider Implementations](#cloud-provider-implementations)
- [API Endpoints Required](#api-endpoints-required)
- [Examples](#examples)
- [Best Practices](#best-practices)
- [Related Documentation](#related-documentation)

---

## Custom File Provider Architecture

### Required API Endpoints

A custom file provider must implement these endpoints:

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/FileOperations` | POST | Read files, delete, rename, create folder |
| `/Upload` | POST | Upload files |
| `/Download` | GET | Download files |
| `/GetImage` | GET | Get thumbnail images |

### Request/Response Format

```typescript
// FileOperations Request
interface FileOperationsRequest {
  action: string;           // 'read', 'create', 'delete', 'rename', 'move', 'copy'
  path: string;            // Current folder path
  name?: string;           // New name for rename/create
  names?: string[];        // Multiple file names for bulk operations
  targetPath?: string;     // Destination for move/copy
  searchString?: string;   // Search query
  sortBy?: string;         // Sort field
  sortDirection?: string;  // 'ascending' or 'descending'
  showHiddenItems?: boolean;
}

// FileOperations Response
interface FileData {
  id?: string | number;
  name: string;
  size?: number;
  dateModified?: string;
  type?: string;
  isFile: boolean;
  hasChild?: boolean;
  filterPath?: string;
  permission?: any;
}

interface FileOperationsResponse {
  files: FileData[];
  details?: any;
  error?: string;
}
```

---

## Implementing Custom Backend

### ASP.NET Core Custom Provider

```csharp
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

[ApiController]
[Route("api/[controller]")]
public class FileManagerController : ControllerBase
{
    private readonly ICustomFileService _fileService;
    private readonly ILogger<FileManagerController> _logger;
    
    public FileManagerController(ICustomFileService fileService, ILogger<FileManagerController> logger)
    {
        _fileService = fileService;
        _logger = logger;
    }
    
    [HttpPost("FileOperations")]
    public async Task<IActionResult> FileOperations([FromBody] FileOperationsRequest request)
    {
        try
        {
            switch(request.Action?.ToLower())
            {
                case "read":
                    var files = await _fileService.GetFilesAsync(request.Path);
                    return Ok(new { files });
                    
                case "create":
                    var createdFolder = await _fileService.CreateFolderAsync(request.Path, request.Name);
                    return Ok(new { files = new[] { createdFolder } });
                    
                case "delete":
                    await _fileService.DeleteAsync(request.Path, request.Names);
                    return Ok(new { success = true });
                    
                case "rename":
                    var renamed = await _fileService.RenameAsync(request.Path, request.Name);
                    return Ok(renamed);
                    
                case "move":
                    await _fileService.MoveAsync(request.Path, request.TargetPath, request.Names);
                    return Ok(new { success = true });
                    
                case "copy":
                    await _fileService.CopyAsync(request.Path, request.TargetPath, request.Names);
                    return Ok(new { success = true });
                    
                case "search":
                    var searchResults = await _fileService.SearchAsync(request.Path, request.SearchString);
                    return Ok(new { files = searchResults });
                    
                default:
                    return BadRequest(new { error = "Invalid action" });
            }
        }
        catch(Exception ex)
        {
            _logger.LogError(ex, "Error in FileOperations");
            return StatusCode(500, new { error = ex.Message });
        }
    }
    
    [HttpPost("Upload")]
    public async Task<IActionResult> Upload([FromForm] FileUploadRequest request)
    {
        try
        {
            var results = new List<object>();
            
            foreach(var file in request.UploadFiles)
            {
                var filePath = Path.Combine(request.Path ?? "", file.FileName);
                var result = await _fileService.UploadFileAsync(filePath, file);
                results.Add(result);
            }
            
            return Ok(results);
        }
        catch(Exception ex)
        {
            _logger.LogError(ex, "Upload error");
            return StatusCode(500, new { error = ex.Message });
        }
    }
    
    [HttpGet("Download")]
    public async Task<IActionResult> Download([FromQuery] string path)
    {
        try
        {
            var fileData = await _fileService.DownloadFileAsync(path);
            return File(fileData.Content, "application/octet-stream", fileData.Name);
        }
        catch(Exception ex)
        {
            return StatusCode(500, new { error = ex.Message });
        }
    }
    
    [HttpGet("GetImage")]
    public async Task<IActionResult> GetImage([FromQuery] string path)
    {
        try
        {
            var imageData = await _fileService.GetThumbnailAsync(path);
            return File(imageData, "image/png");
        }
        catch(Exception ex)
        {
            return StatusCode(404, new { error = "Image not found" });
        }
    }
}

// Custom File Service Interface
public interface ICustomFileService
{
    Task<List<FileData>> GetFilesAsync(string path);
    Task<FileData> CreateFolderAsync(string path, string folderName);
    Task DeleteAsync(string path, string[] names);
    Task<FileData> RenameAsync(string path, string newName);
    Task MoveAsync(string path, string targetPath, string[] names);
    Task CopyAsync(string path, string targetPath, string[] names);
    Task<List<FileData>> SearchAsync(string path, string query);
    Task<FileUploadResult> UploadFileAsync(string path, IFormFile file);
    Task<(byte[] Content, string Name)> DownloadFileAsync(string path);
    Task<byte[]> GetThumbnailAsync(string path);
}
```

---

## Cloud Provider Implementations

For detailed setup instructions and complete implementations of specific cloud providers, refer to the comprehensive **[File System Provider Reference](file-system-provider-reference.md)** which includes:

- **Azure Blob Storage** - Setup, configuration, and implementation details
- **Amazon S3** - Setup, configuration, and implementation details  
- **Google Drive** - OAuth setup and integration
- **Firebase** - Database structure and configuration
- Plus 4 additional provider options

## API Endpoints Required

### Complete API Implementation Checklist

```csharp
public class FileManagerApiRequirements
{
    // Minimal Required Endpoints
    public const string ENDPOINT_FILE_OPERATIONS = "/api/FileManager/FileOperations";
    public const string ENDPOINT_UPLOAD = "/api/FileManager/Upload";
    public const string ENDPOINT_DOWNLOAD = "/api/FileManager/Download";
    
    // Optional but Recommended
    public const string ENDPOINT_GET_IMAGE = "/api/FileManager/GetImage";
    public const string ENDPOINT_SEARCH = "/api/FileManager/Search";
    
    // Request Body Examples
    public class FileOperationsRequest
    {
        public string Action { get; set; }  // read, create, delete, rename, move, copy, search
        public string Path { get; set; }    // Current folder path
        public string Name { get; set; }    // Name for create/rename
        public string[] Names { get; set; } // Multiple items
        public string TargetPath { get; set; }
        public string SearchString { get; set; }
        public bool ShowHiddenItems { get; set; }
    }
    
    // Response Format
    public class FileOperationsResponse
    {
        public List<FileData> Files { get; set; }
        public object Details { get; set; }
        public string Error { get; set; }
        public bool CaseInsensitive { get; set; } = true;
    }
}
```

---

## Examples

### Example 1: File Manager with Custom Provider

```typescript
@Component({
  selector: 'app-custom-provider-filemanager',
  template: `<div>
    <h3>File Manager - {{ currentProvider }}</h3>
    <ejs-filemanager 
      [ajaxSettings]='ajaxSettings'
      [toolbarSettings]='toolbarSettings'
      height="500px">
    </ejs-filemanager>
  </div>`
})
export class CustomProviderFileManagerComponent implements OnInit {
  currentProvider = 'Azure Blob Storage';
  
  ajaxSettings = {
    url: '/api/FileManager/FileOperations',
    uploadUrl: '/api/FileManager/Upload',
    downloadUrl: '/api/FileManager/Download',
    getImageUrl: '/api/FileManager/GetImage'
  };
  
  toolbarSettings = {
    items: ['NewFolder', 'Upload', 'Delete', 'Download', 'Refresh']
  };
}
```

### Example 2: Multi-Provider File Manager

```typescript
@Component({
  template: `<div>
    <div class="provider-selector">
      <label>Select Provider:</label>
      <select [(ngModel)]='selectedProvider' (change)='onProviderChange()'>
        <option value="azure">Azure Blob Storage</option>
        <option value="aws">AWS S3</option>
        <option value="database">Database</option>
        <option value="local">Local File System</option>
      </select>
    </div>
    
    <ejs-filemanager 
      [ajaxSettings]='ajaxSettings'
      height="500px">
    </ejs-filemanager>
  </div>`
})
export class MultiProviderFileManagerComponent {
  selectedProvider = 'azure';
  ajaxSettings = this.getAjaxSettings('azure');
  
  onProviderChange() {
    this.ajaxSettings = this.getAjaxSettings(this.selectedProvider);
  }
  
  private getAjaxSettings(provider: string) {
    const baseUrl = `/api/FileManager-${provider}`;
    return {
      url: `${baseUrl}/FileOperations`,
      uploadUrl: `${baseUrl}/Upload`,
      downloadUrl: `${baseUrl}/Download`,
      getImageUrl: `${baseUrl}/GetImage`
    };
  }
}
```

---

## Best Practices

1. **Implement all required endpoints** - Even if some are stubs initially
2. **Use consistent error handling** - Return proper HTTP status codes
3. **Validate all input** - Sanitize paths and file names
4. **Implement access control** - Check permissions for each operation
5. **Handle large files** - Use streaming for uploads/downloads
6. **Cache where appropriate** - Cache directory listings
7. **Log operations** - Maintain audit trail
8. **Handle concurrency** - Prevent race conditions
9. **Test edge cases** - Empty folders, special characters in names
10. **Document API** - Keep API documentation current

---

## Related Documentation

- [File System Provider Reference](file-system-provider-reference.md) - Complete documentation for all 9 file system providers
- [Authentication and Custom Values](authentication-and-custom-values.md) - Auth patterns and custom values
- [Access Control and Permissions](access-control-and-permissions.md) - RBAC implementation
- [File Operations](file-operations.md) - File operation details

---

**Next:** Explore authentication patterns at [authentication-and-custom-values.md](authentication-and-custom-values.md) or learn about advanced features at [advanced-features.md](advanced-features.md).
