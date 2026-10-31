# File Operations Guide

## Table of Contents
- [Overview of File Operations](#overview-of-file-operations)
- [Creating Folders](#creating-folders)
- [Renaming Files and Folders](#renaming-files-and-folders)
- [Deleting Files and Folders](#deleting-files-and-folders)
- [Copying Files and Folders](#copying-files-and-folders)
- [Moving Files and Folders](#moving-files-and-folders)
- [Getting File and Folder Details](#getting-file-and-folder-details)
- [File Operation Request/Response Format](#file-operation-request-response-format)
- [Error Handling](#error-handling)
- [Practical Examples](#practical-examples)

## Overview of File Operations

The File Manager supports comprehensive file system operations through a request-response pattern. Operations are initiated by the File Manager and sent to your backend API endpoint specified in `ajaxSettings.url`.

**Supported Operations:**
- **read**: List files and folders in a directory
- **create**: Create new folders
- **delete**: Delete files and folders
- **rename**: Rename files and folders
- **copy**: Copy files and folders to another location
- **move**: Move (cut and paste) files and folders
- **search**: Search for files and folders
- **details**: Get detailed information about files/folders

All operations trigger AJAX requests to your backend service, which must handle the request and return an appropriate response.

## Creating Folders

### Programmatic Folder Creation

Create folders using the `createFolder()` method:

**View Code (Index.cshtml)**:
```html
<button onclick="createNewFolder()">New Folder (Dialog)</button>
<button onclick="createNamedFolder()">Create 'MyNewFolder'</button>

<ejs-filemanager id="filemanager">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
    function createNewFolder() {
        var filemanagerElement = document.getElementById('filemanager');
        if (filemanagerElement && filemanagerElement.ej2_instances) {
            var filemanager = filemanagerElement.ej2_instances[0];
            filemanager.createFolder();
        }
    }
    
    function createNamedFolder() {
        var filemanagerElement = document.getElementById('filemanager');
        if (filemanagerElement && filemanagerElement.ej2_instances) {
            var filemanager = filemanagerElement.ej2_instances[0];
            filemanager.createFolder('MyNewFolder');
        }
    }
</script>
```

**Controller Code (FileManagerController.cs)**:
```csharp
[HttpPost]
public IActionResult FileManager(string action, string path, string name)
{
    if (action == "create")
    {
        // Create new folder at specified path
        var folderPath = Path.Combine("files", path.TrimStart('/'), name);
        Directory.CreateDirectory(folderPath);
        
        return Ok(new {
            cwd = null,
            files = new[] {
                new {
                    name = name,
                    dateCreated = DateTime.Now.ToString("o"),
                    dateModified = DateTime.Now.ToString("o"),
                    filterPath = path + name + "/",
                    hasChild = false,
                    isFile = false,
                    size = 0,
                    type = ""
                }
            },
            error = (object)null,
            details = (object)null
        });
    }
    
    return Ok();
}
```

### Create Folder Request/Response

**Request Sent to Server:**
```javascript
{
  action: 'create',
  path: '/Documents/',
  name: 'NewFolder',
  data: [
    {
      name: 'Documents',
      isFile: false,
      type: '',
      size: 0,
      dateModified: '2024-01-15T10:30:00Z',
      hasChild: true,
      filterPath: '/'
    }
  ]
}
```

**Expected Response from Server:**
```javascript
{
  cwd: null,
  files: [
    {
      name: 'NewFolder',
      dateCreated: '2024-01-20T14:45:00Z',
      dateModified: '2024-01-20T14:45:00Z',
      filterPath: '/Documents/NewFolder/',
      hasChild: false,
      isFile: false,
      size: 0,
      type: ''
    }
  ],
  error: null,
  details: null
}
```

### Handling Create Folder Event

**View Code (Index.cshtml)**:
```html
<ejs-filemanager id="filemanager"
    folderCreate="onFolderCreate"
    beforeFolderCreate="beforeFolderCreate">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
    function beforeFolderCreate(args) {
        console.log('Folder to be created:', args.name);
        // args.cancel = true; // Prevent folder creation if needed
    }
    
    function onFolderCreate(args) {
        console.log('Folder created successfully:', args.data);
        // args.data contains the newly created folder details
    }
</script>
```

## Renaming Files and Folders

### Programmatic Renaming

Rename using the `renameFile()` method:

**View Code (Index.cshtml)**:
```html
<button onclick="renameSelected()">Rename Selected</button>
<button onclick="renameSpecificFile()">Rename File</button>

<ejs-filemanager id="filemanager">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
    function renameSelected() {
        var filemanagerElement = document.getElementById('filemanager');
        if (filemanagerElement && filemanagerElement.ej2_instances) {
            var filemanager = filemanagerElement.ej2_instances[0];
            filemanager.renameFile();
        }
    }
    
    function renameSpecificFile() {
        var filemanagerElement = document.getElementById('filemanager');
        if (filemanagerElement && filemanagerElement.ej2_instances) {
            var filemanager = filemanagerElement.ej2_instances[0];
            filemanager.renameFile('oldname.txt', 'newname.txt');
        }
    }
</script>
```

### Rename Request/Response

**Request Sent to Server:**
```javascript
{
  action: 'rename',
  path: '/Documents/',
  name: 'oldname.txt',
  newname: 'newname.txt',
  data: [
    {
      name: 'oldname.txt',
      isFile: true,
      type: '.txt',
      size: 1024,
      dateModified: '2024-01-15T10:30:00Z',
      filterPath: '/Documents/'
    }
  ]
}
```

**Expected Response:**
```javascript
{
  cwd: null,
  files: [
    {
      name: 'newname.txt',
      dateModified: '2024-01-15T10:30:00Z',
      filterPath: '/Documents/newname.txt',
      hasChild: false,
      isFile: true,
      size: 1024,
      type: '.txt'
    }
  ],
  error: null,
  details: null
}
```

**Controller Code (FileManagerController.cs)**:
```csharp
[HttpPost]
public IActionResult FileManager(string action, string path, string name, string newname)
{
    if (action == "rename")
    {
        var oldPath = Path.Combine("files", path.TrimStart('/'), name);
        var newPath = Path.Combine("files", path.TrimStart('/'), newname);
        
        if (System.IO.File.Exists(oldPath))
        {
            System.IO.File.Move(oldPath, newPath, true);
        }
        else if (Directory.Exists(oldPath))
        {
            Directory.Move(oldPath, newPath);
        }
        
        return Ok(new {
            cwd = null,
            files = new[] { new { name = newname } },
            error = (object)null,
            details = (object)null
        });
    }
    
    return Ok();
}
```

### Handling Rename Events

**View Code (Index.cshtml)**:
```html
<ejs-filemanager id="filemanager"
    beforeRename="onBeforeRename"
    rename="onRenameComplete">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
    function onBeforeRename(args) {
        console.log('Old name: ' + args.name + ', New name: ' + args.newName);
        
        // Prevent restricted names from being used
        if (args.newName === 'restricted.txt') {
            args.cancel = true;
            alert('This filename is restricted');
        }
    }
    
    function onRenameComplete(args) {
        console.log('Rename successful:', args.data);
        // Handle post-rename logic
    }
</script>
```

## Deleting Files and Folders

### Programmatic Deletion

Delete using the `deleteFiles()` method:

**View Code (Index.cshtml)**:
```html
<button onclick="deleteSelectedFiles()">Delete Selected</button>
<button onclick="deleteSpecificItems()">Delete Specific Files</button>
<button onclick="deleteByPath()">Delete by Path</button>

<ejs-filemanager id="filemanager">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
    function deleteSelectedFiles() {
        var filemanagerElement = document.getElementById('filemanager');
        if (filemanagerElement && filemanagerElement.ej2_instances) {
            var filemanager = filemanagerElement.ej2_instances[0];
            filemanager.deleteFiles();
        }
    }
    
    function deleteSpecificItems() {
        var filemanagerElement = document.getElementById('filemanager');
        if (filemanagerElement && filemanagerElement.ej2_instances) {
            var filemanager = filemanagerElement.ej2_instances[0];
            filemanager.deleteFiles(['file1.txt', 'file2.txt']);
        }
    }
    
    function deleteByPath() {
        var filemanagerElement = document.getElementById('filemanager');
        if (filemanagerElement && filemanagerElement.ej2_instances) {
            var filemanager = filemanagerElement.ej2_instances[0];
            filemanager.deleteFiles(['/Documents/Reports/report.pdf']);
        }
    }
</script>
```

**Controller Code (FileManagerController.cs)**:
```csharp
[HttpPost]
public IActionResult FileManager(string action, string path, [FromBody] FileManagerRequest request)
{
    if (action == "delete" && request?.Names != null)
    {
        foreach (var name in request.Names)
        {
            var itemPath = Path.Combine("files", path.TrimStart('/'), name);
            
            if (System.IO.File.Exists(itemPath))
            {
                System.IO.File.Delete(itemPath);
            }
            else if (Directory.Exists(itemPath))
            {
                Directory.Delete(itemPath, true);
            }
        }
        
        return Ok(new {
            cwd = null,
            files = request.Names.Select(n => new { name = n }),
            error = (object)null,
            details = (object)null
        });
    }
    
    return Ok();
}
```

### Delete Request/Response

**Request Sent to Server:**
```javascript
{
  action: 'delete',
  path: '/Documents/Old/',
  names: ['file1.txt', 'file2.txt', 'archive'],
  data: [
    {
      name: 'file1.txt',
      isFile: true,
      size: 2048,
      filterPath: '/Documents/Old/'
    },
    {
      name: 'file2.txt',
      isFile: true,
      size: 1536,
      filterPath: '/Documents/Old/'
    },
    {
      name: 'archive',
      isFile: false,
      hasChild: true,
      filterPath: '/Documents/Old/'
    }
  ]
}
```

**Expected Response:**
```javascript
{
  cwd: null,
  files: [
    {
      name: 'file1.txt',
      isFile: true,
      filterPath: '/Documents/Old/file1.txt'
    },
    {
      name: 'file2.txt',
      isFile: true,
      filterPath: '/Documents/Old/file2.txt'
    },
    {
      name: 'archive',
      isFile: false,
      filterPath: '/Documents/Old/archive'
    }
  ],
  error: null,
  details: null
}
```

### Handling Delete Events

**View Code (Index.cshtml)**:
```html
<ejs-filemanager id="filemanager"
    beforeDelete="onBeforeDelete"
    delete="onDeleteComplete">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
    function onBeforeDelete(args) {
        console.log('Items to delete:', args.fileDetails);
        
        var itemCount = args.fileDetails ? args.fileDetails.length : 0;
        var confirmDelete = window.confirm('Delete ' + itemCount + ' item(s)?');
        
        if (!confirmDelete) {
            args.cancel = true;
        }
    }
    
    function onDeleteComplete(args) {
        console.log('Items deleted:', args.data);
        // Handle post-delete logic
    }
</script>
```

## Copying Files and Folders

### Programmatic Copy Operation

Copy using toolbar/context menu or API:

**View Code (Index.cshtml)**:
```html
<button onclick="copySelectedFiles()">Copy Selected Files</button>

<ejs-filemanager id="filemanager">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
    function copySelectedFiles() {
        var filemanagerElement = document.getElementById('filemanager');
        if (filemanagerElement && filemanagerElement.ej2_instances) {
            var filemanager = filemanagerElement.ej2_instances[0];
            var selectedFiles = filemanager.getSelectedFiles();
            
            if (selectedFiles.length === 0) {
                alert('Select files first');
                return;
            }
            
            console.log('Selected for copy:', selectedFiles);
            // Files are copied via context menu or toolbar
            // User navigates to destination and pastes
        }
    }
</script>
```

### Copy Request/Response

**Request Sent to Server:**
```javascript
{
  action: 'copy',
  path: '/Source/',
  targetPath: '/Destination/',
  names: ['file1.txt', 'file2.txt'],
  renameFiles: ['file1.txt', 'file2.txt'],
  data: []
}
```

**Expected Response:**
```javascript
{
  cwd: null,
  files: [
    {
      name: 'file1.txt',
      isFile: true,
      size: 2048,
      dateModified: '2024-01-20T14:45:00Z',
      filterPath: '/Destination/file1.txt'
    },
    {
      name: 'file2.txt',
      isFile: true,
      size: 1536,
      dateModified: '2024-01-20T14:45:00Z',
      filterPath: '/Destination/file2.txt'
    }
  ],
  error: null,
  details: null
}
```

**Handling Duplicate Names:**
If files with the same name exist in the destination, the `renameFiles` array indicates renamed copies:
```javascript
{
  action: 'copy',
  renameFiles: ['file1(1).txt', 'file2(1).txt']
}
```

## Moving Files and Folders

### Programmatic Move Operation

Move using cut and paste:

**View Code (Index.cshtml)**:
```html
<button onclick="prepareItemsToMove()">Cut Selected</button>

<ejs-filemanager id="filemanager">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
    function prepareItemsToMove() {
        var filemanagerElement = document.getElementById('filemanager');
        if (filemanagerElement && filemanagerElement.ej2_instances) {
            var filemanager = filemanagerElement.ej2_instances[0];
            var selected = filemanager.getSelectedFiles();
            console.log('Selected items for move:', selected);
            // User must select destination folder and paste
        }
    }
</script>
```

### Move Request/Response

**Request Sent to Server:**
```javascript
{
  action: 'move',
  path: '/OldLocation/',
  targetPath: '/NewLocation/',
  names: ['file1.txt', 'folder1'],
  renameFiles: ['file1.txt', 'folder1'],
  data: []
}
```

**Expected Response:**
```javascript
{
  cwd: null,
  files: [
    {
      name: 'file1.txt',
      isFile: true,
      size: 2048,
      filterPath: '/NewLocation/file1.txt'
    },
    {
      name: 'folder1',
      isFile: false,
      hasChild: true,
      filterPath: '/NewLocation/folder1'
    }
  ],
  error: null,
  details: null
}
```

## Getting File and Folder Details

### Get Selected Files Details

**View Code (Index.cshtml)**:
```html
<button onclick="displaySelectedFileDetails()">Show File Details</button>

<ejs-filemanager id="filemanager">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
    function displaySelectedFileDetails() {
        var filemanagerElement = document.getElementById('filemanager');
        if (filemanagerElement && filemanagerElement.ej2_instances) {
            var filemanager = filemanagerElement.ej2_instances[0];
            var selectedFiles = filemanager.getSelectedFiles();
            
            selectedFiles.forEach(function(file) {
                console.log('File Name: ' + file.name);
                console.log('File Size: ' + file.size);
                console.log('File Type: ' + file.type);
                console.log('Modified Date: ' + file.dateModified);
                console.log('Is File: ' + file.isFile);
            });
        }
    }
</script>
```

### Details Request/Response

**Request Sent to Server:**
```javascript
{
  action: 'details',
  path: '/Documents/',
  names: ['file1.txt', 'file2.txt'],
  data: []
}
```

**Expected Response:**
```javascript
{
  cwd: null,
  files: null,
  error: null,
  details: {
    name: 'Multiple Files',
    location: '/Documents/',
    isFile: false,
    size: '3.58 KB',
    created: '2024-01-15T10:30:00Z',
    modified: '2024-01-20T14:45:00Z',
    multipleFiles: true
  }
}
```

## File Operation Request/Response Format

### Read Operation

**Request:**
```javascript
{
  action: 'read',
  path: '/',
  showHiddenItems: false,
  data: []
}
```

**Response:**
```javascript
{
  cwd: {
    name: 'Files',
    size: 0,
    dateModified: '2024-01-15T10:30:00Z',
    dateCreated: '2024-01-15T10:30:00Z',
    hasChild: true,
    isFile: false,
    type: '',
    filterPath: '/'
  },
  files: [
    {
      name: 'Documents',
      size: 0,
      dateModified: '2024-01-15T10:30:00Z',
      dateCreated: '2024-01-15T10:30:00Z',
      hasChild: true,
      isFile: false,
      type: '',
      filterPath: '/Documents/'
    },
    {
      name: 'report.pdf',
      size: 102400,
      dateModified: '2024-01-20T14:45:00Z',
      dateCreated: '2024-01-20T14:45:00Z',
      hasChild: false,
      isFile: true,
      type: '.pdf',
      filterPath: '/report.pdf'
    }
  ],
  error: null,
  details: null
}
```

### Search Operation

**Request:**
```javascript
{
  action: 'search',
  path: '/',
  searchString: '*report*',
  showHiddenItems: false,
  caseSensitive: false,
  data: []
}
```

**Response:**
```javascript
{
  cwd: {
    name: 'Files',
    filterPath: '/'
  },
  files: [
    {
      name: 'quarterly-report.pdf',
      size: 102400,
      isFile: true,
      type: '.pdf',
      filterPath: '/Documents/quarterly-report.pdf'
    },
    {
      name: 'annual-report.xlsx',
      size: 204800,
      isFile: true,
      type: '.xlsx',
      filterPath: '/Documents/annual-report.xlsx'
    }
  ],
  error: null,
  details: null
}
```

## Error Handling

### Error Response Format

When operations fail, the server should return an error object:

```javascript
{
  cwd: null,
  files: null,
  error: {
    code: '401',
    message: 'Access Denied',
    fileExists: null
  },
  details: null
}
```

### Common Error Codes

| Code | Meaning | Example |
|------|---------|---------|
| 401 | Access Denied | Insufficient permissions |
| 403 | Forbidden | Cannot delete system folder |
| 404 | Not Found | Path does not exist |
| 409 | Conflict | File already exists |
| 417 | Directory Traversal | Security violation |
| 500 | Server Error | Backend processing error |

### Handling Errors in Component

**View Code (Index.cshtml)**:
```html
<ejs-filemanager id="filemanager"
    beforeSend="onBeforeSend"
    failure="onFailure"
    success="onSuccess">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
    function onBeforeSend(args) {
        // Inspect and modify request before sending if needed
        console.log('Sending request:', args);
    }
    
    function onFailure(args) {
        if (args.error) {
            console.log('Operation failed:', args.error);
            console.log('Error Code: ' + args.error.code);
            console.log('Error Message: ' + args.error.message);
            
            // Show user-friendly error messages
            if (args.error.code === '401') {
                alert('Access Denied');
            } else if (args.error.code === '409') {
                alert('File already exists');
            } else {
                alert('Operation failed: ' + args.error.message);
            }
        }
    }
    
    function onSuccess(args) {
        console.log('Operation successful:', args.result);
    }
</script>
```

## Practical Examples

### Example 1: Bulk Delete with Confirmation

**View Code (Index.cshtml)**:
```html
<button onclick="deleteSelectedWithConfirmation()" style="color: red;">
    Delete Selected with Confirmation
</button>

<ejs-filemanager id="filemanager">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
    function deleteSelectedWithConfirmation() {
        var filemanagerElement = document.getElementById('filemanager');
        if (!filemanagerElement || !filemanagerElement.ej2_instances) {
            return;
        }
        
        var filemanager = filemanagerElement.ej2_instances[0];
        var selected = filemanager.getSelectedFiles();
        
        if (selected.length === 0) {
            alert('Please select files to delete');
            return;
        }
        
        var fileNames = [];
        for (var i = 0; i < selected.length; i++) {
            fileNames.push(selected[i].name);
        }
        
        var message = 'Delete ' + selected.length + ' item(s)?\n\n' + fileNames.join('\n');
        
        if (window.confirm(message)) {
            var namesToDelete = [];
            for (var i = 0; i < selected.length; i++) {
                namesToDelete.push(selected[i].name);
            }
            filemanager.deleteFiles(namesToDelete);
        }
    }
</script>
```

### Example 2: Copy Files to Specific Folder

**View Code (Index.cshtml)**:
```html
<div>
    <label>Target Folder: </label>
    <input id="targetFolder" value="/Archive" placeholder="/path/to/folder" />
    <button onclick="copySelectedToFolder()">Copy to Folder</button>
</div>

<ejs-filemanager id="filemanager">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
    function copySelectedToFolder() {
        var filemanagerElement = document.getElementById('filemanager');
        if (!filemanagerElement || !filemanagerElement.ej2_instances) {
            return;
        }
        
        var filemanager = filemanagerElement.ej2_instances[0];
        var targetFolder = document.getElementById('targetFolder').value;
        var selected = filemanager.getSelectedFiles();
        
        if (selected.length === 0) {
            alert('Select files to copy');
            return;
        }
        
        var fileNames = [];
        for (var i = 0; i < selected.length; i++) {
            fileNames.push(selected[i].name);
        }
        
        console.log('Copy ' + fileNames.join(', ') + ' to ' + targetFolder);
        alert('Copied ' + selected.length + ' file(s) to ' + targetFolder);
    }
</script>
```

### Example 3: Rename Files with Validation

**View Code (Index.cshtml)**:
```html
<ejs-filemanager id="filemanager" beforeRename="validateRename">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
    function validateRename(args) {
        // Validate new name - check for invalid characters
        var invalidChars = /[<>:"|?*]/g;
        if (invalidChars.test(args.newName)) {
            args.cancel = true;
            alert('New name contains invalid characters: < > : " | ? *');
            return;
        }
        
        // Prevent reserved names on Windows
        var reserved = ['CON', 'PRN', 'AUX', 'NUL', 'COM1', 'COM2', 'LPT1'];
        var upperName = args.newName.toUpperCase();
        
        for (var i = 0; i < reserved.length; i++) {
            if (reserved[i] === upperName) {
                args.cancel = true;
                alert('This filename is reserved by the system');
                return;
            }
        }
        
        console.log('Renaming "' + args.name + '" to "' + args.newName + '"');
    }
</script>
```

---

**Related Topics:**
- Search and filtering: See `selection-search.md`
- Event handling: See `events-methods.md`
- Error handling: See `events-methods.md`
