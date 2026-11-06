# Server-Side Integration Patterns

## Table of Contents
- [Server Integration Overview](#server-integration-overview)
- [ASP.NET Core Backend](#aspnet-core-backend)
- [Node.js Backend](#nodejs-backend)
- [Request/Response Patterns](#requestresponse-patterns)
- [Error Handling](#error-handling)
- [Advanced Integration](#advanced-integration)
- [Practical Examples](#practical-examples)

## Server Integration Overview

File Manager requires server-side endpoints to handle file operations:

**Required Endpoints:**
- `GET /api/FileManager/Read` - List files
- `POST /api/FileManager/Create` - Create folder
- `DELETE /api/FileManager/Delete` - Delete items
- `POST /api/FileManager/Rename` - Rename item
- `POST /api/FileManager/Upload` - Upload files
- `GET /api/FileManager/Download` - Download files
- `GET /api/FileManager/GetImage` - Get thumbnails

## ASP.NET Core Backend

### Complete File Manager Controller

```csharp
[ApiController]
[Route("api/[controller]")]
[Authorize]
public class FileManagerController : ControllerBase
{
    private readonly IFileService _fileService;
    
    public FileManagerController(IFileService fileService)
    {
        _fileService = fileService;
    }
    
    [HttpGet]
    [Route("Read")]
    public async Task<IActionResult> Read([FromQuery] string path)
    {
        try
        {
            var userId = User.FindFirst("sub")?.Value;
            var files = await _fileService.GetFilesAsync(path, userId);
            
            return Ok(new { files });
        }
        catch (UnauthorizedAccessException)
        {
            return Forbid();
        }
        catch (Exception ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }
    
    [HttpPost]
    [Route("Create")]
    public async Task<IActionResult> Create([FromBody] CreateFolderRequest request)
    {
        try
        {
            var userId = User.FindFirst("sub")?.Value;
            var folder = await _fileService.CreateFolderAsync(
                request.FolderName,
                request.Path,
                userId
            );
            
            return Ok(new { folder });
        }
        catch (Exception ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }
    
    [HttpDelete]
    [Route("Delete")]
    public async Task<IActionResult> Delete([FromBody] DeleteRequest request)
    {
        try
        {
            var userId = User.FindFirst("sub")?.Value;
            await _fileService.DeleteFilesAsync(
                request.FileNames,
                request.Path,
                userId
            );
            
            return Ok();
        }
        catch (Exception ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }
    
    [HttpPost]
    [Route("Upload")]
    public async Task<IActionResult> Upload([FromForm] IFormFile file, [FromForm] string path)
    {
        try
        {
            var userId = User.FindFirst("sub")?.Value;
            var uploadedFile = await _fileService.UploadFileAsync(
                file,
                path,
                userId
            );
            
            return Ok(new { uploadedFile });
        }
        catch (Exception ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }
}
```

### File Service Implementation

```csharp
public class FileService : IFileService
{
    private readonly string _basePath;
    private readonly ILogger<FileService> _logger;
    
    public async Task<List<FileInfo>> GetFilesAsync(string path, string userId)
    {
        // Validate path
        var validPath = ValidatePath(path);
        
        // Check permissions
        var hasAccess = await CheckUserAccessAsync(userId, validPath);
        if (!hasAccess)
            throw new UnauthorizedAccessException();
        
        // Get files
        var dirInfo = new DirectoryInfo(validPath);
        var files = dirInfo.GetFileSystemEntries()
            .Select(entry => new FileInfo
            {
                Name = Path.GetFileName(entry),
                Size = File.Exists(entry) ? new FileInfo(entry).Length : 0,
                Type = Directory.Exists(entry) ? "Folder" : "File",
                DateModified = File.GetLastWriteTime(entry),
                IsFile = File.Exists(entry),
                FilterPath = path
            })
            .OrderBy(f => !f.IsFile)
            .ThenBy(f => f.Name)
            .ToList();
        
        return files;
    }
    
    public async Task<Folder> CreateFolderAsync(string folderName, string path, string userId)
    {
        // Validate
        var validPath = ValidatePath(path);
        await CheckUserPermissionAsync(userId, validPath, "write");
        
        var newFolderPath = Path.Combine(validPath, folderName);
        Directory.CreateDirectory(newFolderPath);
        
        _logger.LogInformation($"Folder created by {userId}: {newFolderPath}");
        
        return new Folder { Name = folderName, Path = path };
    }
}
```

## Node.js Backend

### Express File Manager Endpoint

```javascript
const express = require('express');
const multer = require('multer');
const fs = require('fs-extra');
const path = require('path');
const { authenticate } = require('./auth');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Get files
router.get('/read', authenticate, async (req, res) => {
  try {
    const { path: filePath } = req.query;
    const userId = req.user.id;
    
    // Validate path
    const validPath = validatePath(filePath);
    
    // Check permissions
    const hasAccess = await checkUserAccess(userId, validPath);
    if (!hasAccess) {
      return res.status(403).json({ error: 'Access denied' });
    }
    
    // Read directory
    const files = await fs.readdir(validPath, { withFileTypes: true });
    
    const fileList = await Promise.all(files.map(async (file) => {
      const fullPath = path.join(validPath, file.name);
      const stat = await fs.stat(fullPath);
      
      return {
        name: file.name,
        size: stat.size,
        type: file.isDirectory() ? 'Folder' : 'File',
        dateModified: stat.mtime.toISOString(),
        isFile: file.isFile(),
        filterPath: filePath
      };
    }));
    
    res.json({ files: fileList });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Create folder
router.post('/create', authenticate, async (req, res) => {
  try {
    const { folderName, path: filePath } = req.body;
    const userId = req.user.id;
    
    const validPath = validatePath(filePath);
    await checkUserPermission(userId, validPath, 'write');
    
    const newPath = path.join(validPath, folderName);
    await fs.ensureDir(newPath);
    
    res.json({ folder: { name: folderName, path: filePath } });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Upload file
router.post('/upload', authenticate, upload.single('file'), async (req, res) => {
  try {
    const { path: filePath } = req.body;
    const userId = req.user.id;
    
    const validPath = validatePath(filePath);
    await checkUserPermission(userId, validPath, 'write');
    
    const finalPath = path.join(validPath, req.file.originalname);
    await fs.move(req.file.path, finalPath);
    
    res.json({ success: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Download file
router.get('/download', authenticate, async (req, res) => {
  try {
    const { file: fileName, path: filePath } = req.query;
    const userId = req.user.id;
    
    const validPath = validatePath(filePath);
    const fullPath = path.join(validPath, fileName);
    
    // Security check
    if (!fullPath.startsWith(validPath)) {
      return res.status(403).json({ error: 'Invalid path' });
    }
    
    res.download(fullPath);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
```

## Request/Response Patterns

### File List Response Format

```json
{
  "files": [
    {
      "name": "document.pdf",
      "size": 1024000,
      "type": "File",
      "dateModified": "2024-03-27T10:30:00Z",
      "isFile": true,
      "filterPath": "/documents"
    },
    {
      "name": "subfolder",
      "size": 0,
      "type": "Folder",
      "dateModified": "2024-03-26T15:00:00Z",
      "isFile": false,
      "hasChild": true,
      "filterPath": "/documents"
    }
  ]
}
```

### Upload Request with Chunks

```csharp
[HttpPost]
[Route("Upload")]
public async Task<IActionResult> Upload(
    [FromForm] IFormFile file,
    [FromForm] string path,
    [FromForm] int chunkIndex,
    [FromForm] int totalChunks,
    [FromForm] long size)
{
    var userId = User.FindFirst("sub")?.Value;
    
    var chunkPath = Path.Combine(
        _tempPath,
        $"{userId}_{Path.GetFileNameWithoutExtension(file.FileName)}_{chunkIndex}"
    );
    
    // Save chunk
    using (var stream = new FileStream(chunkPath, FileMode.Create))
    {
        await file.CopyToAsync(stream);
    }
    
    // Check if all chunks received
    if (chunkIndex == totalChunks - 1)
    {
        // Combine chunks
        var finalPath = Path.Combine(path, file.FileName);
        await CombineChunksAsync(userId, file.FileName, finalPath, totalChunks);
    }
    
    return Ok();
}
```

## Error Handling

### Comprehensive Error Handling

```csharp
public class FileManagerExceptionHandler
{
    public static IActionResult HandleException(Exception ex)
    {
        return ex switch
        {
            UnauthorizedAccessException => 
                new ForbidResult(),
            
            FileNotFoundException => 
                new NotFoundObjectResult(new { error = "File not found" }),
            
            DirectoryNotFoundException => 
                new NotFoundObjectResult(new { error = "Directory not found" }),
            
            IOException ioEx when ioEx.Message.Contains("in use") =>
                new BadRequestObjectResult(new { error = "File is locked" }),
            
            _ => new BadRequestObjectResult(new { error = ex.Message })
        };
    }
}
```

## Advanced Integration

### Resumable Upload

```javascript
const resumableUpload = {
  async uploadFile(file, path, userId) {
    const chunkSize = 1024 * 1024; // 1MB
    const totalChunks = Math.ceil(file.size / chunkSize);
    
    for (let i = 0; i < totalChunks; i++) {
      const start = i * chunkSize;
      const end = Math.min(start + chunkSize, file.size);
      const chunk = file.slice(start, end);
      
      await this.uploadChunk(chunk, i, totalChunks, path, userId);
    }
  },
  
  async uploadChunk(chunk, index, total, path, userId) {
    const formData = new FormData();
    formData.append('file', chunk);
    formData.append('chunkIndex', index);
    formData.append('totalChunks', total);
    formData.append('path', path);
    
    const response = await fetch('/api/FileManager/Upload', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`
      },
      body: formData
    });
    
    if (!response.ok) {
      throw new Error(`Chunk upload failed: ${response.statusText}`);
    }
  }
};
```

## Practical Examples

### Example 1: Complete ASP.NET Integration

```csharp
[ApiController]
[Route("api/[controller]")]
[Authorize]
public class FileManagerController : ControllerBase
{
    [HttpGet("read")]
    public async Task<IActionResult> Read([FromQuery] string path)
    {
        var files = await GetFilesAsync(path, User.Identity.Name);
        return Ok(new { files });
    }
    
    [HttpPost("upload")]
    public async Task<IActionResult> Upload(IFormFile file, string path)
    {
        var uploadPath = Path.Combine(path, file.FileName);
        using (var stream = System.IO.File.Create(uploadPath))
        {
            await file.CopyToAsync(stream);
        }
        return Ok();
    }
}
```

### Example 2: Node.js with Database

```javascript
router.get('/read', async (req, res) => {
  const { path } = req.query;
  const userId = req.user.id;
  
  // Get from database instead of filesystem
  const files = await File.find({
    path,
    userId,
    deletedAt: null
  }).lean();
  
  res.json({ files });
});
```

---

**Related Topics:**
- Authentication: See `authentication-headers.md`
- Security: See `security-basics.md`
