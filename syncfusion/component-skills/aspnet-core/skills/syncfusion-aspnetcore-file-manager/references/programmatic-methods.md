# Programmatic Methods and Control API

## Table of Contents
- [Methods Overview](#methods-overview)
- [Selection Methods](#selection-methods)
- [Navigation Methods](#navigation-methods)
- [File Operation Methods](#file-operation-methods)
- [Property Access Methods](#property-access-methods)
- [Dialog Control Methods](#dialog-control-methods)
- [Refresh and Reload Methods](#refresh-and-refresh-methods)

## Methods Overview

File Manager provides programmatic methods to control functionality via API:

**Method Categories:**
1. **Selection** - Select/clear selections
2. **Navigation** - Change directory
3. **File Operations** - Create, delete, rename via code
4. **Property Access** - Get/set properties
5. **Dialog Control** - Open/close dialogs
6. **Refresh** - Refresh file lists

## Selection Methods

### Select All Files

Selects all files in current directory:

**View Code (Index.cshtml)**:
```html
<button type="button" onclick="selectAllFiles()" style="padding: 8px 16px; margin-bottom: 10px;">
    Select All
</button>

<ejs-filemanager id="filemanager">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
    function selectAllFiles() {
        var fileManager = document.getElementById('filemanager').ej2_instances[0];
        if (fileManager) {
            fileManager.selectAll();
            console.log('All files selected');
        }
    }
</script>
```

### Clear Selection

Removes all selections:

**View Code (Index.cshtml)**:
```html
<button type="button" onclick="clearFileSelection()" style="padding: 8px 16px; margin-bottom: 10px;">
    Clear Selection
</button>

<script>
    function clearFileSelection() {
        var fileManager = document.getElementById('filemanager').ej2_instances[0];
        if (fileManager) {
            fileManager.clearSelection();
            console.log('Selection cleared');
        }
    }
</script>
```

### Get Selected Files

Retrieves array of selected files:

**View Code (Index.cshtml)**:
```html
<button type="button" onclick="getSelectedFiles()" style="padding: 8px 16px; margin-bottom: 10px;">
    Get Selected Files
</button>

<div id="selectedOutput" style="padding: 10px; background-color: #f5f5f5; margin-top: 10px;"></div>

<script>
    function getSelectedFiles() {
        var fileManager = document.getElementById('filemanager').ej2_instances[0];
        if (fileManager) {
            var selected = fileManager.selectedItems;
            console.log('Selected files:', selected);
            
            // Display selected files
            var output = document.getElementById('selectedOutput');
            output.innerHTML = '<strong>Selected Files:</strong><br/>' + 
                selected.join('<br/>');
            
            return selected;
        }
    }
</script>
```

### Select Specific Files

**View Code (Index.cshtml)**:
```html
<input type="text" id="fileNamesToSelect" placeholder="Enter file names (comma-separated)" 
    style="padding: 8px; width: 300px; margin-right: 5px;" />
<button type="button" onclick="selectSpecificFiles()" style="padding: 8px 16px; margin-bottom: 10px;">
    Select Files
</button>

<script>
    function selectSpecificFiles() {
        var fileManager = document.getElementById('filemanager').ej2_instances[0];
        var input = document.getElementById('fileNamesToSelect').value;
        var fileNames = input.split(',').map(function(name) { return name.trim(); });
        
        if (fileManager && fileNames.length > 0) {
            // Clear current selection
            fileManager.clearSelection();
            
            // Select specific files by name
            fileManager.selectedItems = fileNames;
            console.log('Selected: ' + fileNames.join(', '));
        }
    }
</script>
```

### Range Selection

**View Code (Index.cshtml)**:
```html
<input type="number" id="startIndex" placeholder="Start Index" min="0" style="padding: 8px; width: 150px;" />
<input type="number" id="endIndex" placeholder="End Index" min="0" style="padding: 8px; width: 150px;" />
<button type="button" onclick="selectFileRange()" style="padding: 8px 16px; margin-bottom: 10px;">
    Select Range
</button>

<script>
    function selectFileRange() {
        var fileManager = document.getElementById('filemanager').ej2_instances[0];
        var startIndex = parseInt(document.getElementById('startIndex').value);
        var endIndex = parseInt(document.getElementById('endIndex').value);
        
        if (fileManager && !isNaN(startIndex) && !isNaN(endIndex)) {
            // Get all items in current view
            var items = fileManager.fileDetails;
            
            // Select range
            var rangeItems = items.slice(startIndex, endIndex + 1);
            var fileNames = rangeItems.map(function(item) { return item.name; });
            
            fileManager.selectedItems = fileNames;
            console.log('Selected range: ' + startIndex + ' to ' + endIndex + ' (' + fileNames.length + ' items)');
        }
    }
</script>
```

## Navigation Methods

### Navigate to Path

Changes current directory:

**View Code (Index.cshtml)**:
```html
<input type="text" id="pathInput" placeholder="Enter path (e.g., /Documents)" 
    style="padding: 8px; width: 300px; margin-right: 5px;" />
<button type="button" onclick="navigateTo()" style="padding: 8px 16px; margin-bottom: 10px;">
    Navigate
</button>

<script>
    function navigateTo() {
        var fileManager = document.getElementById('filemanager').ej2_instances[0];
        var path = document.getElementById('pathInput').value;
        
        if (fileManager && path) {
            fileManager.path = path;
            console.log('Navigated to: ' + path);
            // Directory contents will automatically refresh
        }
    }
</script>
```

### Navigate Back

Goes to parent directory:

**View Code (Index.cshtml)**:
```html
<button type="button" onclick="navigateBack()" style="padding: 8px 16px; margin-bottom: 10px;">
    Navigate Back
</button>

<script>
    function navigateBack() {
        var fileManager = document.getElementById('filemanager').ej2_instances[0];
        if (fileManager) {
            var currentPath = fileManager.path;
            var pathParts = currentPath.split('/').filter(function(p) { return p; });
            
            if (pathParts.length > 0) {
                pathParts.pop();
                fileManager.path = '/' + pathParts.join('/');
                console.log('Navigated back to: ' + fileManager.path);
            }
        }
    }
</script>
```

### Navigate Forward

Navigate to subdirectory:

**View Code (Index.cshtml)**:
```html
<input type="text" id="folderNameInput" placeholder="Enter folder name" 
    style="padding: 8px; width: 300px; margin-right: 5px;" />
<button type="button" onclick="navigateToSubfolder()" style="padding: 8px 16px; margin-bottom: 10px;">
    Open Folder
</button>

<script>
    function navigateToSubfolder() {
        var fileManager = document.getElementById('filemanager').ej2_instances[0];
        var folderName = document.getElementById('folderNameInput').value;
        
        if (fileManager && folderName) {
            var currentPath = fileManager.path;
            var newPath = currentPath.endsWith('/') 
                ? currentPath + folderName 
                : currentPath + '/' + folderName;
            
            fileManager.path = newPath;
            console.log('Navigated to: ' + newPath);
        }
    }
</script>
```

### Get Current Path

**View Code (Index.cshtml)**:
```html
<button type="button" onclick="showCurrentPath()" style="padding: 8px 16px; margin-bottom: 10px;">
    Show Current Path
</button>

<div id="currentPathDisplay" style="padding: 10px; background-color: #f5f5f5; margin-top: 10px;"></div>

<script>
    function showCurrentPath() {
        var fileManager = document.getElementById('filemanager').ej2_instances[0];
        if (fileManager) {
            var currentPath = fileManager.path;
            console.log('Current path: ' + currentPath);
            
            document.getElementById('currentPathDisplay').innerHTML = 
                '<strong>Current Path:</strong> ' + currentPath;
            
            return currentPath;
        }
    }
</script>
```

## File Operation Methods

### Create New Folder

Creates folder programmatically:

**View Code (Index.cshtml)**:
```html
<input type="text" id="newFolderName" placeholder="Enter folder name" 
    style="padding: 8px; width: 300px; margin-right: 5px;" />
<button type="button" onclick="createNewFolder()" style="padding: 8px 16px; margin-bottom: 10px;">
    Create Folder
</button>

<script>
    function createNewFolder() {
        var fileManager = document.getElementById('filemanager').ej2_instances[0];
        var folderName = document.getElementById('newFolderName').value;
        
        if (fileManager && folderName) {
            var currentPath = fileManager.path;
            fileManager.createFolder(folderName);
            console.log('Creating folder: ' + folderName + ' in ' + currentPath);
            document.getElementById('newFolderName').value = '';
        }
    }
</script>
```

### Delete Files

Deletes selected or specified files:

**View Code (Index.cshtml)**:
```html
<input type="text" id="filesToDelete" placeholder="Enter file names (comma-separated)" 
    style="padding: 8px; width: 300px; margin-right: 5px;" />
<button type="button" onclick="deleteSelectedFiles()" style="padding: 8px 16px; margin-bottom: 10px;">
    Delete Files
</button>

<script>
    function deleteSelectedFiles() {
        var fileManager = document.getElementById('filemanager').ej2_instances[0];
        var input = document.getElementById('filesToDelete').value;
        var fileNames = input.split(',').map(function(name) { return name.trim(); });
        
        if (fileManager && fileNames.length > 0) {
            fileManager.selectedItems = fileNames;
            fileManager.delete();
            console.log('Deleting: ' + fileNames.join(', '));
            document.getElementById('filesToDelete').value = '';
        }
    }
</script>
```

### Rename File

Renames file programmatically (opens rename dialog):

**View Code (Index.cshtml)**:
```html
<input type="text" id="fileToRename" placeholder="Enter file name to rename" 
    style="padding: 8px; width: 300px; margin-right: 5px;" />
<button type="button" onclick="beginRenameFile()" style="padding: 8px 16px; margin-bottom: 10px;">
    Rename File
</button>

<script>
    function beginRenameFile() {
        var fileManager = document.getElementById('filemanager').ej2_instances[0];
        var fileName = document.getElementById('fileToRename').value;
        var newName ="NewFolder";
        if (fileManager && fileName) {
            fileManager.selectedItems = [fileName];
            fileManager.renameFile(fileName, newName);
            console.log('Opened rename dialog for: ' + fileName);
            document.getElementById('fileToRename').value = '';
        }
    }
</script>
```

## Property Access Methods

### Get File Details

**View Code (Index.cshtml)**:
```html
<button type="button" onclick="displayFileDetails()" style="padding: 8px 16px; margin-bottom: 10px;">
    Get All File Details
</button>

<div id="fileDetailsOutput" style="padding: 10px; background-color: #f5f5f5; margin-top: 10px; max-height: 300px; overflow-y: auto;"></div>

<script>
    function displayFileDetails() {
        var fileManager = document.getElementById('filemanager').ej2_instances[0];
        if (fileManager) {
            var fileDetails = fileManager.getSelectedFiles();
            var html = '<strong>File Details:</strong><br/>';
            
            console.log('File details:', fileDetails);
        }
    }
    
    function formatBytes(bytes) {
        if (!bytes || bytes === 0) return '0 Bytes';
        var k = 1024;
        var sizes = ['Bytes', 'KB', 'MB', 'GB'];
        var i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
</script>
```

### Get Selected Item Details

**View Code (Index.cshtml)**:
```html
<button type="button" onclick="displaySelectedDetails()" style="padding: 8px 16px; margin-bottom: 10px;">
    Get Selected Item Details
</button>

<div id="selectedDetailsOutput" style="padding: 10px; background-color: #f5f5f5; margin-top: 10px;"></div>

<script>
    function displaySelectedDetails() {
        var fileManager = document.getElementById('filemanager').ej2_instances[0];
        if (fileManager) {
            var selected = fileManager.selectedItems;
            var fileDetails = fileManager.fileDetails;
            
            var selectedDetails = fileDetails.filter(function(file) {
                return selected.indexOf(file.name) !== -1;
            });
            
            var html = '<strong>Selected Items (' + selectedDetails.length + '):</strong><br/>';
            selectedDetails.forEach(function(file) {
                html += '<div>• ' + file.name + ' (' + formatBytes(file.size) + ')</div>';
            });
            
            document.getElementById('selectedDetailsOutput').innerHTML = html;
            console.log('Selected details:', selectedDetails);
        }
    }
</script>
```

## Dialog Control Methods

### Close All Dialogs

**View Code (Index.cshtml)**:
```html
<button type="button" onclick="closeAllDialogs()" style="padding: 8px 16px; margin-bottom: 10px;">
    Close All Dialogs
</button>

<script>
    function closeAllDialogs() {
        var fileManager = document.getElementById('filemanager').ej2_instances[0];
        fileManager.closeDialog();
    }
</script>
```

## Refresh and Reload Methods

### Refresh Current Directory

Reloads the file list from server:

**View Code (Index.cshtml)**:
```html
<button type="button" onclick="refreshCurrentDirectory()" style="padding: 8px 16px; margin-bottom: 10px;">
    Refresh
</button>

<script>
    function refreshCurrentDirectory() {
        var fileManager = document.getElementById('filemanager').ej2_instances[0];
        if (fileManager) {
            fileManager.refresh();
            console.log('Directory refreshed');
        }
    }
    
    // Auto-refresh every 2 seconds for demonstration
    // Uncomment to enable:
    // setInterval(refreshCurrentDirectory, 2000);
</script>
```

### Refresh with New Path

Refresh specific directory:

**View Code (Index.cshtml)**:
```html
<input type="text" id="refreshPath" placeholder="Enter path to refresh" 
    style="padding: 8px; width: 300px; margin-right: 5px;" />
<button type="button" onclick="refreshPath()" style="padding: 8px 16px; margin-bottom: 10px;">
    Refresh Path
</button>

<script>
    function refreshPath() {
        var fileManager = document.getElementById('filemanager').ej2_instances[0];
        var path = document.getElementById('refreshPath').value;
        
        if (fileManager && path) {
            fileManager.path = path;
            fileManager.refresh();
            console.log('Refreshed path: ' + path);
        }
    }
</script>
```