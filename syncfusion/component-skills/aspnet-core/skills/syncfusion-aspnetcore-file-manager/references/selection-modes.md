# Selection Modes and Techniques

## Table of Contents
- [Selection Overview](#selection-overview)
- [Single Selection Mode](#single-selection-mode)
- [Multiple Selection Mode](#multiple-selection-mode)
- [Range Selection](#range-selection)
- [Programmatic Selection](#programmatic-selection)
- [Selection State Management](#selection-state-management)
- [Selection UI Indicators](#selection-ui-indicators)
- [Best Practices](#best-practices)
- [Practical Examples](#practical-examples)

## Selection Overview

File Manager supports multiple selection modes for different use cases:

**Available Modes:**
1. **Single Selection** - One file/folder at a time
2. **Multiple Selection** - Multiple items with Ctrl/Cmd+Click
3. **Range Selection** - Continuous range with Shift+Click
4. **Programmatic Selection** - Via API methods

### Selection Mode Configuration

**View Code (Index.cshtml)**:
```html
<ejs-filemanager id="filemanager"
    allowMultiSelection="true"
    enableRangeSelection="true">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
    // Configuration options:
    // allowMultiSelection: true/false - Enable multiple selection
    // enableRangeSelection: true/false - Allow Shift+Click range selection
    // selectedItems: Array of initially selected file names
</script>
```

## Single Selection Mode

### Enable Single Selection

In single selection mode, only one file or folder can be selected at a time:

**View Code (Index.cshtml)**:
```html
<ejs-filemanager id="filemanager"
    allowMultiSelection="false">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>
```

**User Interaction Patterns:**
- Click item to select (deselects others)
- Arrow Up/Down navigates without changing selection
- Click again to keep selection
- Ctrl+Click has no additional effect

### Single Selection Behavior

**View Code (Index.cshtml)**:
```html
<div id="selectionInfo" style="padding: 10px; background-color: #f5f5f5; margin-bottom: 10px;"></div>

<ejs-filemanager id="filemanager"
    allowMultiSelection="false"
    fileSelect="handleSingleSelect">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
    function handleSingleSelect(args) {
        if (args.fileDetails && args.fileDetails.length > 0) {
            var file = args.fileDetails[0];
            console.log('Single item selected:', file.name);
            console.log('Is file:', file.isFile);
            console.log('File size:', file.size);
            console.log('Path:', file.path);
            
            // Update UI based on file type
            var infoDiv = document.getElementById('selectionInfo');
            var html = '<strong>Selected:</strong> ' + file.name + '<br/>' +
                'Type: ' + (file.isFile ? 'File' : 'Folder') + '<br/>' +
                'Size: ' + formatBytes(file.size) + '<br/>' +
                'Modified: ' + (file.dateModified || 'N/A');
            infoDiv.innerHTML = html;
            
            if (file.isFile) {
                enableFileOptions();
            } else {
                enableFolderOptions();
            }
        }
    }
    
    function enableFileOptions() {
        console.log('File options enabled');
    }
    
    function enableFolderOptions() {
        console.log('Folder options enabled');
    }
</script>
```

## Multiple Selection Mode

### Enable Multiple Selection

**View Code (Index.cshtml)**:
```html
<ejs-filemanager id="filemanager"
    allowMultiSelection="true">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>
```

**User Interaction Patterns:**
- Click + Ctrl/Cmd to toggle individual items
- Ctrl/Cmd + A to select all items
- Click checkbox to toggle (if checkboxes enabled)
- Drag to select multiple items

### Multiple Selection Configuration

**View Code (Index.cshtml)**:
```html
<div id="selectionStats" style="padding: 10px; background-color: #f5f5f5; margin-bottom: 10px;">
    <strong>Selection Statistics:</strong><br/>
    Selected: <span id="selectedCount">0</span> files 
    (<span id="selectedSize">0 Bytes</span>)
</div>

<ejs-filemanager id="filemanager"
    allowMultiSelection="true"
    fileSelection="updateSelectionStats">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
    function updateSelectionStats(args) {
        if (args.fileDetails) {
            var totalSize = 0;
            var count = args.fileDetails.length;
            
            args.fileDetails.forEach(function(file) {
                totalSize += file.size || 0;
            });
            
            document.getElementById('selectedCount').textContent = count;
            document.getElementById('selectedSize').textContent = formatBytes(totalSize);
        }
    }
    
    function formatBytes(bytes) {
        if (bytes === 0) return '0 Bytes';
        var k = 1024;
        var sizes = ['Bytes', 'KB', 'MB', 'GB'];
        var i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
</script>
```

### Toggle Selection via Checkboxes

**View Code (Index.cshtml)**:
```html
<ejs-filemanager id="filemanager"
    allowMultiSelection="true"
    showFileExtension="true"
    showHiddenItems="true"
    fileSelect="handleSelectionToggle">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
    function handleSelectionToggle(args) {
        if (args.fileDetails) {
            console.log('Selection toggled:', args.fileDetails.map(function(f) { return f.name; }));
        }
    }
</script>
```

## Range Selection

### Shift+Click Range Selection

Selecting a range of files using Shift+Click:

**View Code (Index.cshtml)**:
```html
<ejs-filemanager id="filemanager"
    allowMultiSelection="true"
    enableRangeSelection="true">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
    // Usage Pattern:
    // 1. Click first file to select
    // 2. Hold Shift and click last file
    // 3. All files between are selected
    // 4. Combined with Ctrl for discontinuous ranges
</script>
```

### Range Selection with API

**View Code (Index.cshtml)**:
```html
<button type="button" onclick="selectRange(0, 5)" style="padding: 8px 16px; margin-right: 5px;">
    Select First 5
</button>
<button type="button" onclick="selectRange(10, 20)" style="padding: 8px 16px; margin-right: 5px;">
    Select Items 10-20
</button>

<ejs-filemanager id="filemanager"
    allowMultiSelection="true"
    enableRangeSelection="true">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
    function selectRange(startIndex, endIndex) {
        var fileManager = document.getElementById('filemanager').ej2_instances[0];
        if (fileManager) {
            var fileDetails = fileManager.fileDetails;
            var rangeItems = fileDetails.slice(startIndex, endIndex + 1)
                .map(function(file) { return file.name; });
            
            fileManager.selectedItems = rangeItems;
            console.log('Selected items ' + startIndex + ' to ' + endIndex + ' (' + rangeItems.length + ' items)');
        }
    }
</script>
```

## Programmatic Selection

### Select All Files

**View Code (Index.cshtml)**:
```html
<button type="button" onclick="selectAllFiles()" style="padding: 8px 16px; margin-right: 5px;">
    Select All
</button>
<button type="button" onclick="clearAllSelection()" style="padding: 8px 16px; margin-bottom: 10px;">
    Clear Selection
</button>

<ejs-filemanager id="filemanager"
    allowMultiSelection="true">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
    function selectAllFiles() {
        var fileManager = document.getElementById('filemanager').ej2_instances[0];
        if (fileManager) {
            fileManager.selectAll();
        }
    }
    
    function clearAllSelection() {
        var fileManager = document.getElementById('filemanager').ej2_instances[0];
        if (fileManager) {
            fileManager.clearSelection();
        }
    }
</script>
```

### Select Specific Files

**View Code (Index.cshtml)**:
```html
<button type="button" onclick="selectSpecificFiles()" style="padding: 8px 16px; margin-bottom: 10px;">
    Select document.pdf, image.jpg, spreadsheet.xlsx
</button>

<script>
    function selectSpecificFiles() {
        var fileManager = document.getElementById('filemanager').ej2_instances[0];
        if (fileManager) {
            fileManager.selectedItems = ['document.pdf', 'image.jpg', 'spreadsheet.xlsx'];
            console.log('Selected specific files');
        }
    }
</script>
```

### Select by Pattern

**View Code (Index.cshtml)**:
```html
<button type="button" onclick="selectByPattern('.*\\\\.pdf$')" style="padding: 8px 16px; margin-right: 5px;">
    Select PDFs
</button>
<button type="button" onclick="selectByPattern('.*\\\\.(jpg|png|gif|bmp)$')" style="padding: 8px 16px; margin-bottom: 10px;">
    Select Images
</button>

<script>
    function selectByPattern(pattern) {
        var fileManager = document.getElementById('filemanager').ej2_instances[0];
        if (fileManager) {
            var fileDetails = fileManager.fileDetails;
            var regex = new RegExp(pattern, 'i');
            
            var matchingFiles = fileDetails
                .filter(function(file) { return regex.test(file.name); })
                .map(function(file) { return file.name; });
            
            fileManager.selectedItems = matchingFiles;
            console.log('Pattern: ' + pattern + ' - Selected: ' + matchingFiles.length + ' files');
        }
    }
</script>
```

### Select by File Type

**View Code (Index.cshtml)**:
```html
<button type="button" onclick="selectByFileType('folders')" style="padding: 8px 16px; margin-right: 5px;">
    Select Folders
</button>
<button type="button" onclick="selectByFileType('files')" style="padding: 8px 16px; margin-right: 5px;">
    Select Files
</button>
<button type="button" onclick="selectByFileType('pdf')" style="padding: 8px 16px; margin-bottom: 10px;">
    Select PDFs
</button>

<script>
    function selectByFileType(fileType) {
        var fileManager = document.getElementById('filemanager').ej2_instances[0];
        if (fileManager) {
            var fileDetails = fileManager.fileDetails;
            
            var selectedFiles = fileDetails
                .filter(function(file) {
                    if (fileType === 'folders') return !file.isFile;
                    if (fileType === 'files') return file.isFile;
                    
                    var ext = file.name.split('.').pop().toLowerCase();
                    return ext === fileType.toLowerCase();
                })
                .map(function(file) { return file.name; });
            
            fileManager.selectedItems = selectedFiles;
            console.log('File type: ' + fileType + ' - Selected: ' + selectedFiles.length);
        }
    }
</script>
```

### Select by Size Range

**View Code (Index.cshtml)**:
```html
<button type="button" onclick="selectBySize(0, 1048576)" style="padding: 8px 16px; margin-right: 5px;">
    Select &lt; 1MB
</button>
<button type="button" onclick="selectBySize(1048576, 104857600)" style="padding: 8px 16px; margin-bottom: 10px;">
    Select 1-100MB
</button>

<script>
    function selectBySize(minBytes, maxBytes) {
        var fileManager = document.getElementById('filemanager').ej2_instances[0];
        if (fileManager) {
            var fileDetails = fileManager.fileDetails;
            
            var selectedFiles = fileDetails
                .filter(function(file) {
                    var size = file.size || 0;
                    return size >= minBytes && size <= maxBytes;
                })
                .map(function(file) { return file.name; });
            
            fileManager.selectedItems = selectedFiles;
            console.log('Size range: ' + formatBytes(minBytes) + ' to ' + formatBytes(maxBytes) + ' - Selected: ' + selectedFiles.length);
        }
    }
</script>
```

## Selection State Management

### Get Current Selection

**View Code (Index.cshtml)**:
```html
<button type="button" onclick="displayCurrentSelection()" style="padding: 8px 16px; margin-bottom: 10px;">
    Get Current Selection
</button>

<div id="selectionDisplay" style="padding: 10px; background-color: #f5f5f5;"></div>

<script>
    function getCurrentSelection() {
        var fileManager = document.getElementById('filemanager').ej2_instances[0];
        if (fileManager) {
            var selectedItems = fileManager.selectedItems;
            var fileDetails = fileManager.fileDetails;
            
            var selectedDetails = fileDetails.filter(function(file) {
                return selectedItems.indexOf(file.name) !== -1;
            });
            
            return {
                count: selectedDetails.length,
                files: selectedDetails.map(function(f) { return f.name; }),
                details: selectedDetails
            };
        }
    }
    
    function displayCurrentSelection() {
        var selection = getCurrentSelection();
        var html = '<strong>Current Selection:</strong><br/>' +
            'Count: ' + selection.count + '<br/>' +
            'Items: ' + selection.files.join(', ');
        document.getElementById('selectionDisplay').innerHTML = html;
    }
</script>
```

### Calculate Selection Statistics

**View Code (Index.cshtml)**:
```html
<button type="button" onclick="displaySelectionStats()" style="padding: 8px 16px; margin-bottom: 10px;">
    Get Selection Statistics
</button>

<div id="statsDisplay" style="padding: 10px; background-color: #f5f5f5;"></div>

<script>
    function getSelectionStats() {
        var selection = getCurrentSelection();
        var details = selection.details;
        
        var fileCount = details.filter(function(f) { return f.isFile; }).length;
        var folderCount = details.filter(function(f) { return !f.isFile; }).length;
        var totalSize = details.reduce(function(sum, f) { return sum + (f.size || 0); }, 0);
        
        return {
            totalItems: selection.count,
            files: fileCount,
            folders: folderCount,
            totalSize: formatBytes(totalSize),
            avgSize: selection.count > 0 ? formatBytes(totalSize / selection.count) : '0 Bytes'
        };
    }
    
    function displaySelectionStats() {
        var stats = getSelectionStats();
        var html = '<strong>Selection Statistics:</strong><br/>' +
            'Total Items: ' + stats.totalItems + '<br/>' +
            'Files: ' + stats.files + '<br/>' +
            'Folders: ' + stats.folders + '<br/>' +
            'Total Size: ' + stats.totalSize + '<br/>' +
            'Average Size: ' + stats.avgSize;
        document.getElementById('statsDisplay').innerHTML = html;
    }
</script>
```

### Save Selection State

**View Code (Index.cshtml)**:
```html
<button type="button" onclick="saveSelectionState()" style="padding: 8px 16px; margin-right: 5px;">
    Save State
</button>
<button type="button" onclick="restoreSelectionState()" style="padding: 8px 16px; margin-bottom: 10px;">
    Restore State
</button>

<div id="stateMessage" style="padding: 10px; background-color: #f5f5f5;"></div>

<script>
    function saveSelectionState() {
        var fileManager = document.getElementById('filemanager').ej2_instances[0];
        if (fileManager) {
            var state = {
                timestamp: new Date().toISOString(),
                path: fileManager.path,
                selectedItems: fileManager.selectedItems
            };
            
            sessionStorage.setItem('fileManagerSelection', JSON.stringify(state));
            document.getElementById('stateMessage').innerHTML = 
                '<strong style="color: green;">State saved successfully!</strong>';
        }
    }
    
    function restoreSelectionState() {
        var fileManager = document.getElementById('filemanager').ej2_instances[0];
        var saved = sessionStorage.getItem('fileManagerSelection');
        
        if (saved && fileManager) {
            var state = JSON.parse(saved);
            
            if (state.path === fileManager.path) {
                fileManager.selectedItems = state.selectedItems;
                document.getElementById('stateMessage').innerHTML = 
                    '<strong style="color: green;">State restored successfully!</strong>';
            } else {
                document.getElementById('stateMessage').innerHTML = 
                    '<strong style="color: orange;">Path mismatch: Save was for ' + state.path + ', current is ' + fileManager.path + '</strong>';
            }
        } else {
            document.getElementById('stateMessage').innerHTML = 
                '<strong style="color: red;">No saved state found</strong>';
        }
    }
</script>
```

## Selection UI Indicators

### Custom Selection Styling

**View Code (Index.cshtml)**:
```html
<style>
    /* Custom selection styling */
    .e-listview .e-list-item.e-active {
        background-color: #e3f2fd;
        border-left: 4px solid #2196f3;
    }
    
    .e-listview .e-list-item:hover {
        background-color: #f5f5f5;
    }
    
    .selection-counter {
        padding: 10px;
        background-color: #e3f2fd;
        border: 1px solid #2196f3;
        border-radius: 4px;
        margin-bottom: 10px;
    }
    
    .selection-counter span {
        display: inline-block;
        margin-right: 20px;
        font-weight: bold;
    }
</style>
```

### Selection Counter

**View Code (Index.cshtml)**:
```html
<div class="selection-counter">
    <span><span id="itemCount">0</span> items selected</span>
    <span><span id="fileCount">0</span> files</span>
    <span><span id="folderCount">0</span> folders</span>
    <span id="totalSize">0 Bytes</span>
</div>

<ejs-filemanager id="filemanager"
    allowMultiSelection="true"
    fileSelection="updateSelectionCounter">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
    function updateSelectionCounter(args) {
        if (args.fileDetails) {
            var totalSize = args.fileDetails.reduce(function(sum, f) {
                return sum + (f.size || 0);
            }, 0);
            var fileCount = args.fileDetails.filter(function(f) { return f.isFile; }).length;
            var folderCount = args.fileDetails.filter(function(f) { return !f.isFile; }).length;
            
            document.getElementById('itemCount').textContent = args.fileDetails.length;
            document.getElementById('fileCount').textContent = fileCount;
            document.getElementById('folderCount').textContent = folderCount;
            document.getElementById('totalSize').textContent = formatBytes(totalSize);
        }
    }
</script>
```

## Best Practices

### 1. Clear Selection Before Batch Operations

**View Code (Index.cshtml)**:
```html
<input type="text" id="filesToDelete" placeholder="Enter file names (comma-separated)" 
    style="padding: 8px; width: 300px; margin-right: 5px;" />
<button type="button" onclick="batchDelete()" style="padding: 8px 16px; margin-bottom: 10px;">
    Delete Selected
</button>

<script>
    function batchDelete() {
        var fileManager = document.getElementById('filemanager').ej2_instances[0];
        var input = document.getElementById('filesToDelete').value;
        var fileNames = input.split(',').map(function(name) { return name.trim(); });
        
        if (fileManager && fileNames.length > 0) {
            // Clear any previous selection
            fileManager.clearSelection();
            
            // Select only files to delete
            fileManager.selectedItems = fileNames;
            
            // Perform operation
            fileManager.delete();
            document.getElementById('filesToDelete').value = '';
        }
    }
</script>
```

### 2. Validate Selection Before Operations

**View Code (Index.cshtml)**:
```html
<button type="button" onclick="performOperation('delete')" style="padding: 8px 16px; margin-bottom: 10px;">
    Delete Selected
</button>

<div id="operationMessage" style="padding: 10px; background-color: #f5f5f5; margin-top: 10px;"></div>

<script>
    function performOperation(operation) {
        var fileManager = document.getElementById('filemanager').ej2_instances[0];
        var messageDiv = document.getElementById('operationMessage');
        
        if (fileManager) {
            var selected = fileManager.selectedItems;
            
            if (selected.length === 0) {
                messageDiv.innerHTML = '<strong style="color: red;">Please select items first</strong>';
                return;
            }
            
            switch(operation) {
                case 'delete':
                    fileManager.delete();
                    messageDiv.innerHTML = '<strong style="color: green;">Deleted ' + selected.length + ' items</strong>';
                    break;
            }
        }
    }
</script>
```

### 3. Provide Selection Feedback

**View Code (Index.cshtml)**:
```html
<div id="selectionStatus" style="padding: 10px; background-color: #e3f2fd; border: 1px solid #2196f3; margin-bottom: 10px;">
    No items selected
</div>

<ejs-filemanager id="filemanager"
    allowMultiSelection="true"
    fileSelection="updateSelectionStatus">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
    function updateSelectionStatus(args) {
        var statusDiv = document.getElementById('selectionStatus');
        if (args.fileDetails && args.fileDetails.length > 0) {
            statusDiv.innerHTML = '<strong style="color: green;">' + args.fileDetails.length + 
                ' items selected</strong>';
        } else {
            statusDiv.innerHTML = 'No items selected';
        }
    }
</script>
```

## Practical Examples

### Example 1: Smart Select by Type

**View Code (Index.cshtml)**:
```html
<div style="padding: 10px; background-color: #f5f5f5; margin-bottom: 10px;">
    <button type="button" onclick="selectByFileType('files')" style="padding: 6px 12px; margin: 3px;">
        Select All Files
    </button>
    <button type="button" onclick="selectByFileType('folders')" style="padding: 6px 12px; margin: 3px;">
        Select All Folders
    </button>
    <button type="button" onclick="selectByPattern('.*\\\\.(doc|docx|pdf)$')" style="padding: 6px 12px; margin: 3px;">
        Select Documents
    </button>
    <button type="button" onclick="selectByPattern('.*\\\\.(jpg|png|gif)$')" style="padding: 6px 12px; margin: 3px;">
        Select Images
    </button>
    <button type="button" onclick="clearAllSelection()" style="padding: 6px 12px; margin: 3px;">
        Clear Selection
    </button>
</div>

<ejs-filemanager id="filemanager"
    allowMultiSelection="true">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>
```

### Example 2: Selection with Confirmation

**View Code (Index.cshtml)**:
```html
<button type="button" onclick="confirmAndExecute('delete')" style="padding: 8px 16px; margin-bottom: 10px;">
    Delete with Confirmation
</button>

<div id="confirmDialog" style="display: none; position: fixed; top: 50%; left: 50%; 
    transform: translate(-50%, -50%); background: white; padding: 20px; 
    border: 1px solid #ccc; box-shadow: 0 2px 10px rgba(0,0,0,0.2); z-index: 1000;">
    <div id="dialogMessage" style="margin-bottom: 15px; font-size: 14px;"></div>
    <button type="button" onclick="confirmAction(true)" style="padding: 8px 16px; margin-right: 5px;">
        Confirm
    </button>
    <button type="button" onclick="confirmAction(false)" style="padding: 8px 16px;">
        Cancel
    </button>
</div>

<div id="overlay" style="display: none; position: fixed; top: 0; left: 0; 
    width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 999;"></div>

<script>
    var pendingOperation = null;
    
    function confirmAndExecute(operation) {
        var fileManager = document.getElementById('filemanager').ej2_instances[0];
        if (!fileManager || fileManager.selectedItems.length === 0) {
            alert('Please select items first');
            return;
        }
        
        var stats = getSelectionStats();
        var message = 'Confirm ' + operation.toUpperCase() + ':<br/>' +
            stats.totalItems + ' items: ' + stats.files + ' files, ' + 
            stats.folders + ' folders (' + stats.totalSize + ')';
        
        document.getElementById('dialogMessage').innerHTML = message;
        document.getElementById('confirmDialog').style.display = 'block';
        document.getElementById('overlay').style.display = 'block';
        
        pendingOperation = operation;
    }
    
    function confirmAction(confirmed) {
        document.getElementById('confirmDialog').style.display = 'none';
        document.getElementById('overlay').style.display = 'none';
        
        if (confirmed && pendingOperation) {
            var fileManager = document.getElementById('filemanager').ej2_instances[0];
            switch(pendingOperation) {
                case 'delete':
                    fileManager.delete();
                    alert('Deletion completed');
                    break;
            }
        }
        pendingOperation = null;
    }
</script>
```

---

**Related Topics:**
- Search and filtering: See `search-sort-filter.md`
- File operations: See `file-operations.md`
