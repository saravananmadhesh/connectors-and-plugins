# Flat Data and UI Customization

## Table of Contents
- [Flat Data Overview](#flat-data-overview)
- [FileSystemData API](#filesystemdata-api)
- [FileSystemData Structure](#filesystemdata-structure)
- [Hierarchical to Flat Conversion](#hierarchical-to-flat-conversion)
- [Custom File Providers](#custom-file-providers)
- [UI Customization](#ui-customization)
- [Template Customization](#template-customization)
- [Practical Examples](#practical-examples)

## Flat Data Overview

File Manager can work with flat data structures for simplified data management:

**Flat Data Benefits:**
- Simpler data model
- Easier to manage custom providers
- Better for cloud storage integration
- Flexible filtering and sorting
- Custom event handling

## FileSystemData API

The `fileSystemData` API property allows you to bind custom flat data directly to the File Manager component without requiring AJAX calls. This is particularly useful for static data or data fetched from custom sources.

### Basic fileSystemData Usage

```javascript
// Initialize File Manager with fileSystemData
const fileSystemData = {
  files: [
    {
      name: 'Documents',
      size: 0,
      type: 'Folder',
      dateModified: new Date('2024-03-27T10:00:00Z'),
      hasChild: true,
      isFile: false,
      filterPath: '/'
    },
    {
      name: 'budget.xlsx',
      size: 2048,
      type: 'File',
      dateModified: new Date('2024-03-26T15:30:00Z'),
      hasChild: false,
      isFile: true,
      filterPath: '/Documents'
    }
  ]
};

const fileManagerInstance = new ej.filemanager.FileManager({
  fileSystemData: fileSystemData,  // Bind flat data directly
  view: 'Details'
});

fileManagerInstance.appendTo('#filemanager');
```

### fileSystemData with ASP.NET Core Razor

```html
<ejs-filemanager id="filemanager"
    fileSystemData="@Model.FileSystemData"
    view="Details">
    <e-filemanager-detailsviewsettings>
        <e-detailsviewsettings-columns>
            <e-detailsviewsettings-column field="name" headerText="Name" width="200">
            </e-detailsviewsettings-column>
            <e-detailsviewsettings-column field="size" headerText="Size" width="120">
            </e-detailsviewsettings-column>
            <e-detailsviewsettings-column field="dateModified" headerText="Modified" width="150">
            </e-detailsviewsettings-column>
        </e-detailsviewsettings-columns>
    </e-filemanager-detailsviewsettings>
</ejs-filemanager>

<script>
// Define fileSystemData in JavaScript
const fileSystemData = {
  files: [
    {
      name: 'Images',
      size: 0,
      type: 'Folder',
      dateModified: new Date('2024-03-27T10:00:00Z'),
      hasChild: true,
      isFile: false,
      filterPath: '/'
    },
    {
      name: 'photo1.jpg',
      size: 1024000,
      type: 'File',
      dateModified: new Date('2024-03-26T14:20:00Z'),
      hasChild: false,
      isFile: true,
      filterPath: '/Images'
    }
  ]
};

// Initialize File Manager with fileSystemData
const fileManager = new ej.filemanager.FileManager({
  fileSystemData: fileSystemData,
  view: 'Details'
});

fileManager.appendTo('#filemanager');
</script>
```

### fileSystemData vs AJAX Configuration

```html
<!-- Option 1: Using fileSystemData (No AJAX needed) -->
<ejs-filemanager id="filemanager1"
    fileSystemData="@Model.LocalFileData"
    view="Details">
</ejs-filemanager>

<!-- Option 2: Using AJAX Settings (Server-side data) -->
<ejs-filemanager id="filemanager2"
    view="Details">
    <e-filemanager-ajaxsettings url="/FileManager/Read">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>
```

**When to use fileSystemData:**
- Static file lists
- In-memory data from custom sources
- Data already loaded on client
- Reduced server round-trips
- Testing and prototyping

**When to use AJAX:**
- Large file lists
- Dynamic server-side data
- Real-time file system access
- Cloud storage integration
- Server-controlled permissions

### Advanced fileSystemData with Metadata

```javascript
const advancedFileSystemData = {
  files: [
    {
      name: 'Projects',
      size: 0,
      type: 'Folder',
      dateModified: new Date('2024-03-27T10:00:00Z'),
      hasChild: true,
      isFile: false,
      filterPath: '/',
      // Additional metadata
      owner: 'admin',
      permissions: 'rwx',
      tags: ['important', 'shared']
    },
    {
      name: 'project.zip',
      size: 5242880,
      type: 'File',
      dateModified: new Date('2024-03-26T09:30:00Z'),
      hasChild: false,
      isFile: true,
      filterPath: '/Projects',
      owner: 'developer1',
      permissions: 'r',
      tags: ['archived']
    }
  ]
};

const fileManager = new ej.filemanager.FileManager({
  fileSystemData: advancedFileSystemData,
  view: 'Details',
  fileSelect: function(args) {
    // Access metadata
    const selectedFile = args.fileDetails[0];
    console.log('Owner:', selectedFile.owner);
    console.log('Permissions:', selectedFile.permissions);
    console.log('Tags:', selectedFile.tags);
  }
});

fileManager.appendTo('#filemanager');
```

### fileSystemData with Real-Time Updates

```javascript
// Initialize with initial data
let currentFileSystemData = {
  files: [
    {
      name: 'Uploads',
      size: 0,
      type: 'Folder',
      dateModified: new Date(),
      hasChild: false,
      isFile: false,
      filterPath: '/'
    }
  ]
};

const fileManager = new ej.filemanager.FileManager({
  fileSystemData: currentFileSystemData,
  view: 'Details'
});

fileManager.appendTo('#filemanager');

// Update fileSystemData dynamically
function addNewFile(fileName, fileSize) {
  const newFile = {
    name: fileName,
    size: fileSize,
    type: 'File',
    dateModified: new Date(),
    hasChild: false,
    isFile: true,
    filterPath: '/Uploads'
  };
  
  currentFileSystemData.files.push(newFile);
  
  // Refresh File Manager with new data
  fileManager.refresh();
}

// Usage
addNewFile('newdocument.pdf', 2048000);
```

### fileSystemData from API Response

```csharp
// C# Controller that returns fileSystemData
[HttpGet]
[Route("GetFileSystemData")]
public IActionResult GetFileSystemData()
{
    var fileSystemData = new
    {
        files = new object[]
        {
            new
            {
                name = "Documents",
                size = 0,
                type = "Folder",
                dateModified = DateTime.UtcNow,
                hasChild = true,
                isFile = false,
                filterPath = "/"
            },
            new
            {
                name = "annual-report.pdf",
                size = 4096000,
                type = "File",
                dateModified = DateTime.UtcNow.AddDays(-5),
                hasChild = false,
                isFile = true,
                filterPath = "/Documents"
            }
        }
    };
    
    return Ok(fileSystemData);
}
```

**JavaScript Usage with API**:
```javascript
// Fetch fileSystemData from API and bind to File Manager
fetch('/api/filemanager/GetFileSystemData')
    .then(response => response.json())
    .then(data => {
        const fileManager = new ej.filemanager.FileManager({
            fileSystemData: data,
            view: 'Details'
        });
        fileManager.appendTo('#filemanager');
    })
    .catch(error => console.error('Error loading file system data:', error));
```

## FileSystemData Structure

### Flat Data Format

```javascript
{
  files: [
    {
      name: 'file1.txt',
      size: 1024,
      type: 'File',
      dateModified: '2024-03-27T10:30:00Z',
      hasChild: false,
      isFile: true,
      filterPath: '/'
    },
    {
      name: 'folder1',
      size: 0,
      type: 'Folder',
      dateModified: '2024-03-27T09:15:00Z',
      hasChild: true,
      isFile: false,
      filterPath: '/'
    }
  ]
}
```

### Flat Data Configuration

```html
<!-- Component automatically detects flat data format from AJAX endpoint -->
<ejs-filemanager id="filemanager" view="Details">
    <e-filemanager-detailsviewsettings>
        <e-detailsviewsettings-columns>
            <e-detailsviewsettings-column field="name" headerText="Name" width="200">
            </e-detailsviewsettings-column>
            <e-detailsviewsettings-column field="size" headerText="Size" width="120">
            </e-detailsviewsettings-column>
            <e-detailsviewsettings-column field="_fm_modified" headerText="Modified" width="150">
            </e-detailsviewsettings-column>
        </e-detailsviewsettings-columns>
    </e-filemanager-detailsviewsettings>
    <e-filemanager-ajaxsettings url="/FileManager/Details" getImageUrl="/FileManager/GetImage">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>
```

## FileSystemData Structure

### Complete Flat Data Structure

```javascript
const flatFileSystemData = {
  files: [
    {
      // Required fields
      name: string,                    // File/folder name
      size: number,                    // Size in bytes
      type: 'File' | 'Folder',        // Item type
      dateModified: ISO8601 string,   // Modification date
      
      // Navigation fields
      hasChild: boolean,               // Has subfolders
      isFile: boolean,                 // Is file or folder
      filterPath: string,              // Current path
      
      // Optional fields
      id: string,                      // Unique identifier
      parentId: string,                // Parent folder ID
      permissions: object,             // Access permissions
      metadata: object                 // Custom data
    }
  ]
}
```

### Example Flat Data

```jsx
const exampleFlatData = {
  files: [
    {
      name: 'Documents',
      size: 0,
      type: 'Folder',
      dateModified: '2024-03-27T10:00:00Z',
      hasChild: true,
      isFile: false,
      filterPath: '/'
    },
    {
      name: 'budget.xlsx',
      size: 2048,
      type: 'File',
      dateModified: '2024-03-26T15:30:00Z',
      hasChild: false,
      isFile: true,
      filterPath: '/Documents'
    },
    {
      name: 'report.pdf',
      size: 4096,
      type: 'File',
      dateModified: '2024-03-25T12:00:00Z',
      hasChild: false,
      isFile: true,
      filterPath: '/Documents'
    }
  ]
};
```

## Hierarchical to Flat Conversion

### Convert Nested Structure to Flat

```csharp
// Controller method to convert hierarchical data to flat structure
[HttpGet]
[Route("ConvertToFlat")]
public IActionResult ConvertToFlat()
{
    // Your hierarchical data source
    var hierarchicalData = GetHierarchicalData();
    
    // Convert to flat structure
    var flatData = ConvertHierarchicalToFlat(hierarchicalData);
    
    return Ok(new { files = flatData });
}

private List<FileInfo> ConvertHierarchicalToFlat(List<FileInfo> hierarchical, string parentPath = "/")
{
    var flatList = new List<FileInfo>();
    
    foreach (var item in hierarchical)
    {
        var flatItem = new FileInfo
        {
            Name = item.Name,
            Size = item.Size ?? 0,
            Type = item.IsFile ? "File" : "Folder",
            DateModified = item.DateModified,
            HasChild = item.Children?.Count > 0,
            IsFile = item.IsFile,
            FilterPath = parentPath
        };
        
        flatList.Add(flatItem);
        
        // Recursively process children
        if (item.Children?.Count > 0)
        {
            var childPath = parentPath == "/" ? "/" + item.Name : parentPath + "/" + item.Name;
            var childFlat = ConvertHierarchicalToFlat(item.Children, childPath);
            flatList.AddRange(childFlat);
        }
    }
    
    return flatList;
}
```

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
    <e-filemanager-ajaxsettings url="/FileManager/ConvertToFlat">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>
```

## Custom File Providers

### Implement Custom Provider

```csharp
// Custom FileManager controller for custom file operations
[ApiController]
[Route("api/[controller]")]
public class CustomFilesController : ControllerBase
{
    [HttpGet]
    [Route("Read")]
    public IActionResult ReadFiles(string path)
    {
        try
        {
            // Fetch from custom source
            var files = FetchFromCustomSource(path);
            return Ok(new { files = files });
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
    
    [HttpPost]
    [Route("CreateFolder")]
    public IActionResult CreateFolder([FromBody] FolderRequest request)
    {
        try
        {
            var result = CreateFolderInCustomSource(request.FolderName, request.Path);
            return Ok(result);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
    
    [HttpDelete]
    [Route("Delete")]
    public IActionResult DeleteFiles([FromBody] DeleteRequest request)
    {
        try
        {
            DeleteFilesFromCustomSource(request.FileNames, request.Path);
            return Ok(new { success = true });
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
    
    [HttpPost]
    [Route("Move")]
    public IActionResult MoveFiles([FromBody] MoveRequest request)
    {
        try
        {
            MoveFilesInCustomSource(request.SourceFiles, request.TargetPath);
            return Ok(new { success = true });
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
    
    private List<FileInfo> FetchFromCustomSource(string path)
    {
        // Implementation for fetching from custom source
        return new List<FileInfo>();
    }
    
    private object CreateFolderInCustomSource(string folderName, string path)
    {
        // Implementation for creating folder
        return new { success = true };
    }
    
    private void DeleteFilesFromCustomSource(string[] fileNames, string path)
    {
        // Implementation for deleting files
    }
    
    private void MoveFilesInCustomSource(string[] sourceFiles, string targetPath)
    {
        // Implementation for moving files
    }
}

public class FolderRequest
{
    public string FolderName { get; set; }
    public string Path { get; set; }
}

public class DeleteRequest
{
    public string[] FileNames { get; set; }
    public string Path { get; set; }
}

public class MoveRequest
{
    public string[] SourceFiles { get; set; }
    public string TargetPath { get; set; }
}
```

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
    <e-filemanager-ajaxsettings url="/api/CustomFiles/Read" 
        uploadUrl="/api/CustomFiles/Upload"
        downloadUrl="/api/CustomFiles/Download">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>
```

### Cloud Storage Provider

```csharp
// Cloud Storage integration (e.g., Azure Blob Storage)
public class CloudStorageProvider
{
    private readonly BlobContainerClient _containerClient;
    
    public CloudStorageProvider(string containerUri)
    {
        _containerClient = new BlobContainerClient(new Uri(containerUri));
    }
    
    public async Task<List<FileInfo>> GetFilesAsync(string path)
    {
        var files = new List<FileInfo>();
        
        try
        {
            // List blobs from cloud storage
            await foreach (BlobItem blob in _containerClient.GetBlobsAsync(prefix: path))
            {
                var properties = await _containerClient.GetBlobClient(blob.Name).GetPropertiesAsync();
                
                files.Add(new FileInfo
                {
                    Name = Path.GetFileName(blob.Name),
                    Size = blob.Properties.ContentLength ?? 0,
                    Type = blob.Properties.ContentType?.Contains("folder") == true ? "Folder" : "File",
                    DateModified = blob.Properties.LastModified?.DateTime ?? DateTime.UtcNow,
                    HasChild = blob.Properties.ContentType?.Contains("folder") == true,
                    IsFile = blob.Properties.ContentType?.Contains("folder") != true,
                    FilterPath = path
                });
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error fetching files from cloud: {ex.Message}");
        }
        
        return files;
    }
    
    public async Task<bool> UploadFileAsync(string filePath, Stream fileStream)
    {
        try
        {
            BlobClient blob = _containerClient.GetBlobClient(filePath);
            await blob.UploadAsync(fileStream, overwrite: true);
            return true;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Upload error: {ex.Message}");
            return false;
        }
    }
    
    public async Task<bool> DeleteFileAsync(string filePath)
    {
        try
        {
            BlobClient blob = _containerClient.GetBlobClient(filePath);
            await blob.DeleteAsync();
            return true;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Delete error: {ex.Message}");
            return false;
        }
    }
}
```

**Controller Usage**:
```csharp
[ApiController]
[Route("api/[controller]")]
public class CloudFileManagerController : ControllerBase
{
    private readonly CloudStorageProvider _provider;
    
    public CloudFileManagerController(IConfiguration config)
    {
        string containerUri = config["AzureStorage:ContainerUri"];
        _provider = new CloudStorageProvider(containerUri);
    }
    
    [HttpGet]
    [Route("Read")]
    public async Task<IActionResult> ReadFiles(string path)
    {
        var files = await _provider.GetFilesAsync(path);
        return Ok(new { files = files });
    }
}
```

**View Code (Index.cshtml)**:
```html
<ejs-filemanager id="filemanager" view="Details">
    <e-filemanager-detailsviewsettings>
        <e-detailsviewsettings-columns>
            <e-detailsviewsettings-column field="name" headerText="Name" width="200">
            </e-detailsviewsettings-column>
            <e-detailsviewsettings-column field="size" headerText="Size" width="120">
            </e-detailsviewsettings-column>
            <e-detailsviewsettings-column field="_fm_modified" headerText="Modified" width="150">
            </e-detailsviewsettings-column>
        </e-detailsviewsettings-columns>
    </e-filemanager-detailsviewsettings>
    <e-filemanager-ajaxsettings url="/api/CloudFileManager/Read" 
        uploadUrl="/api/CloudFileManager/Upload"
        downloadUrl="/api/CloudFileManager/Download">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>
```

## UI Customization

### Customize File Icons

```html
<ejs-filemanager id="filemanager" 
    largeIconsTemplate="#customIconTemplate">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
function getFileIcon(fileDetails) {
    // Return custom icon based on file type
    const ext = (fileDetails.name.split('.').pop() || '').toLowerCase();
    
    const iconMap = {
        pdf: 'e-pdf-icon',
        doc: 'e-doc-icon',
        docx: 'e-doc-icon',
        xls: 'e-xls-icon',
        xlsx: 'e-xls-icon',
        jpg: 'e-image-icon',
        jpeg: 'e-image-icon',
        png: 'e-image-icon',
        zip: 'e-zip-icon',
        rar: 'e-zip-icon',
        mp3: 'e-audio-icon',
        mp4: 'e-video-icon'
    };
    
    return iconMap[ext] || 'e-file-icon';
}
</script>

<style>
.e-file-item {
    transition: all 0.2s ease;
}

.e-file-item:hover {
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

/* Icon styling */
.e-pdf-icon::before {
    content: '📄';
    font-size: 24px;
}

.e-doc-icon::before {
    content: '📝';
    font-size: 24px;
}

.e-xls-icon::before {
    content: '📊';
    font-size: 24px;
}

.e-image-icon::before {
    content: '🖼️';
    font-size: 24px;
}

.e-zip-icon::before {
    content: '📦';
    font-size: 24px;
}

.e-audio-icon::before {
    content: '🎵';
    font-size: 24px;
}

.e-video-icon::before {
    content: '🎬';
    font-size: 24px;
}

.e-file-icon::before {
    content: '📄';
    font-size: 24px;
}
</style>
```

### Customize Item Display

```html
<ejs-filemanager id="filemanager"
    view="LargeIcons"
    largeIconsTemplate="#itemDisplayTemplate">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager" 
        getImageUrl="/FileManager/GetImage">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script id="itemDisplayTemplate" type="text/x-template">
    ${getCustomItemDisplay(data)}
</script>

<script>
function getCustomItemDisplay(item) {
    const icon = getFileIcon(item.name);
    const size = formatBytes(item.size);
    const date = formatDate(item.dateModified);
    
    return '<div class="custom-file-item">' +
        '<i class="' + icon + '" style="font-size: 32px; margin-bottom: 8px;"></i>' +
        '<span class="name" title="' + item.name + '">' + item.name + '</span>' +
        '<span class="size" style="font-size: 12px; color: #666;">' + size + '</span>' +
        '<span class="date" style="font-size: 12px; color: #999;">' + date + '</span>' +
        '<span class="actions" style="display: flex; gap: 6px; margin-top: 8px;">' +
        '<button onclick="shareItem(\'' + item.name + '\')">Share</button>' +
        '<button onclick="downloadItem(\'' + item.name + '\')">Download</button>' +
        '</span>' +
        '</div>';
}

function getFileIcon(fileName) {
    const ext = (fileName.split('.').pop() || '').toLowerCase();
    const iconMap = {
        pdf: 'e-pdf-icon', doc: 'e-doc-icon', docx: 'e-doc-icon',
        xls: 'e-xls-icon', xlsx: 'e-xls-icon', jpg: 'e-image-icon',
        jpeg: 'e-image-icon', png: 'e-image-icon', zip: 'e-zip-icon'
    };
    return iconMap[ext] || 'e-file-icon';
}

function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function shareItem(fileName) {
    console.log('Share:', fileName);
}

function downloadItem(fileName) {
    console.log('Download:', fileName);
}
</script>

<style>
.custom-file-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 12px;
    border-radius: 6px;
    transition: all 0.2s ease;
}

.custom-file-item:hover {
    background-color: #f5f5f5;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.custom-file-item .name {
    font-weight: 500;
    margin: 8px 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
}

.custom-file-item .actions button {
    padding: 4px 8px;
    font-size: 11px;
    border: 1px solid #ddd;
    border-radius: 3px;
    cursor: pointer;
    background-color: #fff;
    transition: all 0.2s ease;
}

.custom-file-item .actions button:hover {
    background-color: #e8f5e9;
    border-color: #4CAF50;
    color: #4CAF50;
}
</style>
```

## Template Customization

### Custom Large Icons Template

```html
<ejs-filemanager id="filemanager"
    view="LargeIcons"
    largeIconsTemplate="#customIconItemTemplate">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager" 
        getImageUrl="/FileManager/GetImage">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script id="customIconItemTemplate" type="text/x-template">
    ${getCustomIconTemplate(data)}
</script>

<script>
function getCustomIconTemplate(item) {
    const iconPath = item.isFile ? '/icons/' + getFileType(item.name) + '.png' : null;
    const fileSize = formatBytes(item.size);
    const fileDate = formatDate(item.dateModified);
    
    return '<div class="custom-icon-item">' +
        '<div class="icon-container">' +
        (item.isFile && iconPath 
            ? '<img src="' + iconPath + '" alt="' + item.name + '" />' 
            : '<i class="e-folder-icon" style="font-size: 32px;"></i>') +
        '</div>' +
        '<div class="item-info">' +
        '<h4>' + item.name + '</h4>' +
        '<p>' + fileSize + '</p>' +
        '<p class="modified">' + fileDate + '</p>' +
        '</div>' +
        '</div>';
}

function getFileType(fileName) {
    const ext = (fileName.split('.').pop() || '').toLowerCase();
    const typeMap = {
        'pdf': 'pdf', 'doc': 'doc', 'docx': 'doc', 'xls': 'xls', 'xlsx': 'xls',
        'jpg': 'image', 'jpeg': 'image', 'png': 'image', 'zip': 'zip'
    };
    return typeMap[ext] || 'file';
}

function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}
</script>

<style>
.custom-icon-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 12px;
    text-align: center;
    border: 1px solid #eee;
    border-radius: 6px;
    background-color: #f9f9f9;
    transition: all 0.2s ease;
}

.custom-icon-item:hover {
    border-color: #ddd;
    background-color: #f5f5f5;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.icon-container {
    width: 64px;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    border-radius: 4px;
}

.icon-container img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
}

.item-info h4 {
    margin: 8px 0 4px;
    font-size: 13px;
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.item-info p {
    margin: 0;
    font-size: 11px;
    color: #666;
}

.item-info p.modified {
    color: #999;
}
</style>
```

### Custom Context Menu Template

```html
<ejs-filemanager id="filemanager">
    <e-filemanager-contextmenusettings visible="true">
        <e-filemanager-contextmenuitems>
            <e-filemanager-contextmenuitem text="Open" id="cmOpen"></e-filemanager-contextmenuitem>
            <e-filemanager-contextmenuitem text="Preview" id="cmPreview"></e-filemanager-contextmenuitem>
            <e-filemanager-contextmenuitem text="Copy" id="cmCopy"></e-filemanager-contextmenuitem>
            <e-filemanager-contextmenuitem text="Cut" id="cmCut"></e-filemanager-contextmenuitem>
            <e-filemanager-contextmenuitem text="Share" id="cmShare"></e-filemanager-contextmenuitem>
            <e-filemanager-contextmenuitem text="Download" id="cmDownload"></e-filemanager-contextmenuitem>
            <e-filemanager-contextmenuitem text="Delete" id="cmDelete"></e-filemanager-contextmenuitem>
        </e-filemanager-contextmenuitems>
    </e-filemanager-contextmenusettings>
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
function onContextMenuItemClick(args) {
    const fileManager = document.getElementById('filemanager').ej2_instances[0];
    
    switch(args.item.id) {
        case 'cmOpen':
            console.log('Open:', fileManager.selectedItems);
            break;
        case 'cmPreview':
            console.log('Preview:', fileManager.selectedItems);
            break;
        case 'cmCopy':
            console.log('Copy:', fileManager.selectedItems);
            break;
        case 'cmCut':
            console.log('Cut:', fileManager.selectedItems);
            break;
        case 'cmShare':
            console.log('Share:', fileManager.selectedItems);
            break;
        case 'cmDownload':
            console.log('Download:', fileManager.selectedItems);
            break;
        case 'cmDelete':
            console.log('Delete:', fileManager.selectedItems);
            break;
    }
}
</script>

<style>
.custom-context-menu {
    list-style: none;
    padding: 0;
    margin: 0;
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: #fff;
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
}

.custom-context-menu li {
    padding: 8px 12px;
    cursor: pointer;
    border-bottom: 1px solid #f0f0f0;
    font-size: 13px;
    transition: background-color 0.2s ease;
}

.custom-context-menu li:last-child {
    border-bottom: none;
}

.custom-context-menu li:hover {
    background-color: #f5f5f5;
    color: #2196F3;
}

.custom-context-menu li.separator {
    padding: 0;
    border-bottom: 1px solid #ddd;
    cursor: default;
}

.custom-context-menu li.separator:hover {
    background-color: transparent;
    color: inherit;
}
</style>
```

## Practical Examples

### Example 1: Database-Backed File System

```csharp
// Database File Manager Controller
[ApiController]
[Route("api/[controller]")]
public class DatabaseFileManagerController : ControllerBase
{
    private readonly IFileManagerService _fileService;
    
    public DatabaseFileManagerController(IFileManagerService fileService)
    {
        _fileService = fileService;
    }
    
    [HttpGet]
    [Route("Read")]
    public async Task<IActionResult> ReadFiles(string path = "/")
    {
        try
        {
            var dbFiles = await _fileService.GetFilesByPathAsync(path);
            
            var files = dbFiles.Select(row => new FileInfo
            {
                Name = row.FileName,
                Size = row.FileSize,
                Type = row.IsDirectory ? "Folder" : "File",
                DateModified = row.DateModified,
                HasChild = row.IsDirectory,
                IsFile = !row.IsDirectory,
                FilterPath = path,
                CustomId = row.FileId,
                Metadata = row.Metadata
            }).ToList();
            
            return Ok(new { files = files });
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}

public interface IFileManagerService
{
    Task<List<DatabaseFileModel>> GetFilesByPathAsync(string path);
}

public class DatabaseFileModel
{
    public string FileId { get; set; }
    public string FileName { get; set; }
    public long FileSize { get; set; }
    public bool IsDirectory { get; set; }
    public DateTime DateModified { get; set; }
    public string Metadata { get; set; }
}
```

**View Code (Index.cshtml)**:
```html
<ejs-filemanager id="filemanager" view="Details">
    <e-filemanager-detailsviewsettings>
        <e-detailsviewsettings-columns>
            <e-detailsviewsettings-column field="name" headerText="Name" width="200">
            </e-detailsviewsettings-column>
            <e-detailsviewsettings-column field="size" headerText="Size" width="120">
            </e-detailsviewsettings-column>
            <e-detailsviewsettings-column field="_fm_modified" headerText="Modified" width="150">
            </e-detailsviewsettings-column>
        </e-detailsviewsettings-columns>
    </e-filemanager-detailsviewsettings>
    <e-filemanager-ajaxsettings url="/api/DatabaseFileManager/Read" 
        uploadUrl="/api/DatabaseFileManager/Upload"
        downloadUrl="/api/DatabaseFileManager/Download">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>
```

### Example 2: Versioned File System

```csharp
// Versioned File Manager Controller
[ApiController]
[Route("api/[controller]")]
public class VersionedFileManagerController : ControllerBase
{
    private readonly IVersionedFileService _versionedService;
    
    public VersionedFileManagerController(IVersionedFileService versionedService)
    {
        _versionedService = versionedService;
    }
    
    [HttpGet]
    [Route("Read")]
    public async Task<IActionResult> ReadVersionedFiles(string path = "/")
    {
        try
        {
            var versionedFiles = await _versionedService.GetVersionedFilesAsync(path);
            
            var files = versionedFiles.Select(file => new FileInfo
            {
                Name = file.FileName,
                Size = file.Size,
                Type = file.IsDirectory ? "Folder" : "File",
                DateModified = file.DateModified,
                HasChild = file.IsDirectory,
                IsFile = !file.IsDirectory,
                FilterPath = path,
                Metadata = new {
                    currentVersion = file.LatestVersion,
                    versions = file.VersionCount,
                    lastModifiedBy = file.LastModifiedBy
                }
            }).ToList();
            
            return Ok(new { files = files });
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}

public interface IVersionedFileService
{
    Task<List<VersionedFileModel>> GetVersionedFilesAsync(string path);
}

public class VersionedFileModel
{
    public string FileName { get; set; }
    public long Size { get; set; }
    public bool IsDirectory { get; set; }
    public DateTime DateModified { get; set; }
    public int LatestVersion { get; set; }
    public int VersionCount { get; set; }
    public string LastModifiedBy { get; set; }
}
```

**View Code with Version Display Template (Index.cshtml)**:
```html
<ejs-filemanager id="filemanager"
    view="LargeIcons"
    largeIconsTemplate="#versionedFileTemplate">
    <e-filemanager-ajaxsettings url="/api/VersionedFileManager/Read" 
        getImageUrl="/FileManager/GetImage">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script id="versionedFileTemplate" type="text/x-template">
    <div class="versioned-file">
        <span class="file-name">${name}</span>
        ${metadata && metadata.versions ? '<span class="version-badge">v' + metadata.currentVersion + '</span>' : ''}
        <span class="version-info">${metadata && metadata.versions ? '(' + metadata.versions + ' versions)' : ''}</span>
    </div>
</script>

<style>
.versioned-file {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    padding: 8px;
    text-align: center;
}

.file-name {
    font-weight: 500;
    font-size: 13px;
}

.version-badge {
    background-color: #2196F3;
    color: white;
    padding: 2px 6px;
    border-radius: 3px;
    font-size: 10px;
    font-weight: 600;
}

.version-info {
    font-size: 11px;
    color: #666;
}
</style>
```

### Example 3: Search-Enhanced File Manager

```csharp
// Search-Enhanced File Manager Controller
[ApiController]
[Route("api/[controller]")]
public class SearchableFileManagerController : ControllerBase
{
    private readonly ISearchService _searchService;
    
    public SearchableFileManagerController(ISearchService searchService)
    {
        _searchService = searchService;
    }
    
    [HttpGet]
    [Route("Search")]
    public async Task<IActionResult> SearchFiles(string q, string path = "/")
    {
        try
        {
            if (string.IsNullOrEmpty(q))
            {
                return BadRequest("Search query is required");
            }
            
            var searchResults = await _searchService.SearchAsync(q, path);
            
            var files = searchResults.Select(result => new FileInfo
            {
                Name = result.FileName,
                Size = result.Size,
                Type = result.Type,
                DateModified = result.DateModified,
                FilterPath = result.Path,
                HasChild = false,
                IsFile = true,
                Metadata = new {
                    highlight = result.HighlightedText,
                    matchCount = result.MatchCount
                }
            }).ToList();
            
            return Ok(new { files = files });
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}

public interface ISearchService
{
    Task<List<SearchResultModel>> SearchAsync(string query, string path);
}

public class SearchResultModel
{
    public string FileName { get; set; }
    public long Size { get; set; }
    public string Type { get; set; }
    public DateTime DateModified { get; set; }
    public string Path { get; set; }
    public string HighlightedText { get; set; }
    public int MatchCount { get; set; }
}
```

**View Code with Search-Highlighted Display (Index.cshtml)**:
```html
<div class="search-container">
    <input type="text" id="searchInput" placeholder="Search files..." onkeyup="performSearch(this.value)" style="width: 300px; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
</div>

<ejs-filemanager id="filemanager"
    view="Details"
    largeIconsTemplate="#searchResultTemplate">
    <e-filemanager-detailsviewsettings>
        <e-detailsviewsettings-columns>
            <e-detailsviewsettings-column field="name" headerText="Name" width="250" template="#nameTemplate">
            </e-detailsviewsettings-column>
            <e-detailsviewsettings-column field="size" headerText="Size" width="120">
            </e-detailsviewsettings-column>
            <e-detailsviewsettings-column field="_fm_modified" headerText="Modified" width="150">
            </e-detailsviewsettings-column>
        </e-detailsviewsettings-columns>
    </e-filemanager-detailsviewsettings>
    <e-filemanager-ajaxsettings url="/api/SearchableFileManager/Search">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script id="nameTemplate" type="text/x-template">
    <span class="search-result-name">${name}</span>
    ${metadata && metadata.matchCount ? '<span class="match-count">(' + metadata.matchCount + ' matches)</span>' : ''}
</script>

<script>
function performSearch(query) {
    const fileManager = document.getElementById('filemanager').ej2_instances[0];
    
    if (query.trim().length === 0) {
        fileManager.path = '/';
        return;
    }
    
    // Trigger search API call
    fetch('/api/SearchableFileManager/Search?q=' + encodeURIComponent(query))
        .then(r => r.json())
        .then(data => {
            console.log('Search results:', data);
            // Results will be displayed in file manager
        });
}
</script>

<style>
.search-container {
    margin-bottom: 16px;
    padding: 12px;
    background-color: #f5f5f5;
    border-radius: 4px;
}

.search-result-name {
    font-weight: 500;
    color: #2196F3;
}

.match-count {
    font-size: 11px;
    color: #999;
    margin-left: 8px;
    background-color: #fffde7;
    padding: 2px 6px;
    border-radius: 3px;
}
</style>
```

---

**Related Topics:**
- Virtualization: See `virtualization.md`
- Custom integration: See `server-integration.md`
