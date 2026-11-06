# File Operation Events Reference

## Table of Contents
- [Event Overview](#event-overview)
- [File Operation Events](#file-operation-events)
- [Selection Events](#selection-events)
- [Navigation Events](#navigation-events)
- [Upload Events](#upload-events)
- [AJAX Communication Events](#ajax-communication-events)
- [Dialog and UI Events](#dialog-and-ui-events)
- [Image Loading Events](#image-loading-events)
- [Event Handler Patterns](#event-handler-patterns)
- [Practical Examples](#practical-examples)

## Event Overview

File Manager provides comprehensive events for tracking file operations, user interactions, and AJAX communication:

**Primary Event Categories:**
- **File Operations**: Create, delete, rename, copy, move
- **Selection**: File/folder selection changes
- **Navigation**: Directory path changes
- **Upload**: File upload lifecycle
- **AJAX**: Server communication
- **Dialog**: Modal dialogs opening/closing
- **UI**: Toolbar and context menu interactions

## File Operation Events

### Before Create Folder

Triggered before a new folder is created:

```html
<ejs-filemanager id="filemanager"
    beforeFolderCreate="onBeforeFolderCreate">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
function isValidFolderName(name) {
    // Check for invalid characters
    var invalidChars = /[<>:"|?*]/g;
    return !invalidChars.test(name) && name.length > 0;
}

function onBeforeFolderCreate(args) {
    console.log('Before creating folder:', args.path);
    console.log('New folder name:', args.newFolderName);
    
    // Validate folder name
    if (!isValidFolderName(args.newFolderName)) {
        args.cancel = true;
        console.log('Invalid folder name');
    }
}
</script>
```

**Event Arguments:**
- `path` - Directory path where folder will be created
- `newFolderName` - Name of the new folder
- `cancel` - Set to true to prevent creation

### File Created

Triggered after folder is successfully created:

```html
<ejs-filemanager id="filemanager"
    folderCreate="onFolderCreate">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
function showNotification(message) {
    alert(message);
}

function onFolderCreate(args) {
    console.log('Folder created:', args.name);
    console.log('Path:', args.path);
    console.log('Details:', args.fileDetails);
    
    // Update UI or show notification
    showNotification('Folder \'' + args.name + '\' created successfully');
}
</script>
```

**Event Arguments:**
- `name` - Created folder name
- `path` - Parent directory path
- `fileDetails` - Full file details object

### Before Delete

Triggered before files/folders are deleted:

```html
<ejs-filemanager id="filemanager"
    beforeDelete="onBeforeDelete">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
function onBeforeDelete(args) {
    console.log('About to delete:', args.fileDetails.map(function(f) { return f.name; }));
    
    // Prevent deletion of protected items
    var hasProtectedItems = args.fileDetails.some(function(f) {
        return f.name.startsWith('.') || f.name === 'System Volume Information';
    });
    
    if (hasProtectedItems) {
        args.cancel = true;
        alert('Cannot delete protected files');
    }
}
</script>
```

**Event Arguments:**
- `fileDetails` - Array of files/folders to delete
- `cancel` - Set to true to prevent deletion

### File Deleted

Triggered after successful deletion:

```html
<ejs-filemanager id="filemanager"
    delete="onDelete">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
function logAuditEvent(action, details) {
    console.log(action + ':', details);
    // Send to server for logging
    fetch('/Audit/Log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: action, details: details })
    });
}

function onDelete(args) {
    console.log('Deleted files:', args.fileDetails.map(function(f) { return f.name; }));
    
    // Log deletion or update stats
    args.fileDetails.forEach(function(file) {
        logAuditEvent('FILE_DELETED', { filename: file.name, path: file.path });
    });
}
</script>
```

**Event Arguments:**
- `fileDetails` - Array of deleted files/folders

### Before Rename

Triggered before file/folder is renamed:

```html
<ejs-filemanager id="filemanager"
    beforeRename="onBeforeRename">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
function isValidFileName(name) {
    var invalidChars = /[<>:"|?*]/g;
    return !invalidChars.test(name) && name.length > 0;
}

function isSystemFile(name) {
    var systemFiles = ['System Volume Information', '$Recycle.Bin'];
    return systemFiles.indexOf(name) !== -1;
}

function showError(message) {
    console.error(message);
    alert(message);
}

function onBeforeRename(args) {
    console.log('Current name:', args.name);
    console.log('New name:', args.newName);
    
    // Validate new name
    if (!isValidFileName(args.newName)) {
        args.cancel = true;
        showError('Invalid filename');
    }
    
    // Prevent renaming system files
    if (isSystemFile(args.name)) {
        args.cancel = true;
    }
}
</script>
```

**Event Arguments:**
- `name` - Current name
- `newName` - New name
- `cancel` - Set to true to prevent rename

### File Renamed

Triggered after successful rename:

```html
<ejs-filemanager id="filemanager"
    rename="onRename">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
function updateDocumentReferences(oldName, newName) {
    console.log('Updating references from ' + oldName + ' to ' + newName);
    // Update database or cache with new name
    fetch('/FileManager/UpdateReferences', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ oldName: oldName, newName: newName })
    });
}

function onRename(args) {
    console.log('Renamed to:', args.name);
    console.log('Old path:', args.path);
    
    // Update external references
    updateDocumentReferences(args.oldName, args.name);
}
</script>
```

**Event Arguments:**
- `name` - New filename
- `path` - File path
- `oldName` - Previous name

### Before Copy

Triggered before files are copied:

```html
<ejs-filemanager id="filemanager"
    beforeMove="onBeforeCopy">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
function onBeforeCopy(args) {
    console.log('Copying:', args.fileDetails.map(function(f) { return f.name; }));
    console.log('To:', args.path);
    
    // Validate copy operation
    var totalSize = args.fileDetails.reduce(function(sum, f) {
        return sum + (f.size || 0);
    }, 0);
    
    if (totalSize > 500000000) { // 500MB
        args.cancel = true;
        alert('Total size exceeds copy limit');
    }
}
</script>
```

**Event Arguments:**
- `fileDetails` - Files being copied
- `path` - Destination path
- `cancel` - Set to true to prevent copy

### File Copied

Triggered after successful copy:

```html
<ejs-filemanager id="filemanager"
    move="onCopyComplete">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
function onCopyComplete(args) {
    console.log('Copy operation complete');
    console.log('Source:', args.fileDetails.map(function(f) { return f.name; }));
    
    showNotification('Files copied successfully');
}
</script>
```

### Before Move

Triggered before files are moved:

```html
<ejs-filemanager id="filemanager"
    beforeMove="onBeforeMove">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
function onBeforeMove(args) {
    console.log('Moving:', args.fileDetails.map(function(f) { return f.name; }));
    console.log('To:', args.path);
    
    // Prevent moving to same location
    if (args.path === args.fileDetails[0].path) {
        args.cancel = true;
    }
}
</script>
```

**Event Arguments:**
- `fileDetails` - Files being moved
- `path` - Destination path
- `cancel` - Set to true to prevent move

### File Moved

Triggered after successful move:

```html
<ejs-filemanager id="filemanager"
    move="onMove">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
function onMove(args) {
    console.log('Files moved successfully');
    logAuditEvent('FILES_MOVED', {
        files: args.fileDetails.map(function(f) { return f.name; }),
        destination: args.path
    });
}
</script>
```

## Selection Events

### File Select Event

Triggered when file/folder is selected:

```html
<ejs-filemanager id="filemanager"
    fileSelect="onFileSelect">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
function onFileSelect(args) {
    console.log('Selected:', args.fileDetails);
    if (args.fileDetails && args.fileDetails.length > 0) {
        console.log('Is file:', args.fileDetails[0].isFile);
        console.log('File size:', args.fileDetails[0].size);
        console.log('Modified date:', args.fileDetails[0].dateModified);
    }
}
</script>
```

**Event Arguments:**
- `fileDetails` - Selected file/folder details
- `isNormalSelection` - True if single selection
- `isShiftSelection` - True if shift-selected
- `isCtrlSelection` - True if ctrl-selected

### Selection Changed Event

Triggered when selection changes:

```html
<ejs-filemanager id="filemanager"
    fileSelection="onSelectionChange">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    var k = 1024;
    var sizes = ['Bytes', 'KB', 'MB', 'GB'];
    var i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

function updateStatusBar(stats) {
    console.log('Selected: ' + stats.selectedCount + ' items, Size: ' + stats.selectedSize);
}

function onSelectionChange(args) {
    console.log('Selection changed');
    console.log('New selection count:', args.fileDetails.length);
    
    // Calculate total selected size
    var totalSize = args.fileDetails.reduce(function(sum, f) {
        return sum + (f.size || 0);
    }, 0);
    console.log('Total size:', formatBytes(totalSize));
    
    // Update status bar
    updateStatusBar({
        selectedCount: args.fileDetails.length,
        selectedSize: formatBytes(totalSize)
    });
}
</script>
```

## Navigation Events

### Navigation Event

Triggered when directory changes:

```html
<ejs-filemanager id="filemanager"
    fileOpen="onNavigate">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
function updateNavigationHistory(path) {
    console.log('Navigation history updated to:', path);
}

function logEvent(eventType, details) {
    console.log(eventType, details);
    fetch('/Logger/LogEvent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: eventType, details: details })
    });
}

function onNavigate(args) {
    console.log('Navigating to:', args.fileDetails.filterPath);
    
    // Update breadcrumbs or navigation history
    updateNavigationHistory(args.fileDetails.filterPath);
    
    // Track user navigation
    logEvent('NAVIGATION', { to: args.fileDetails.filterPath });
}
</script>
```

**Event Arguments:**
- `fileDetails` - Current directory details
- `fileDetails.filterPath` - New directory path

## Upload Events

### Upload Start Event

Triggered when upload begins:

```html
<ejs-filemanager id="filemanager">
    <e-filemanager-uploadsettings autoUpload="true">
    </e-filemanager-uploadsettings>
    <e-filemanager-ajaxsettings url="/FileManager/FileManager" 
        uploadUrl="/FileManager/Upload">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
function displayUploadProgressBar() {
    console.log('Showing upload progress');
}

function uploadListCreate(args) {
    console.log('Upload starting');
    console.log('Files:', args.files.length);
    console.log('File names:', args.files.map(function(f) { return f.name; }));
    
    // Show upload progress UI
    displayUploadProgressBar();
}
</script>
```

**Event Arguments:**
- `files` - Array of files being uploaded
- `cancel` - Set to true to prevent upload

### Upload Complete Event

Triggered after upload completes:

```html
<ejs-filemanager id="filemanager"
    success="onUploadComplete">
    <e-filemanager-uploadsettings autoUpload="true">
    </e-filemanager-uploadsettings>
    <e-filemanager-ajaxsettings url="/FileManager/FileManager" 
        uploadUrl="/FileManager/Upload">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
function hideUploadProgressBar() {
    console.log('Hiding upload progress');
}

function refreshFileList() {
    var filemanager = document.getElementById('filemanager').ej2_instances[0];
    if (filemanager) {
        filemanager.refreshFiles();
    }
}

function onUploadComplete(args) {
    console.log('Upload complete');
    
    // Hide progress and refresh
    hideUploadProgressBar();
    refreshFileList();
    
    showNotification('File uploaded successfully');
}
</script>
```

**Event Arguments:**
- `fileDetails` - Uploaded file details
- `response` - Server response

## AJAX Communication Events

### Before Send Event

Triggered before AJAX request is sent:

```html
<ejs-filemanager id="filemanager"
    beforeSend="onBeforeSend">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
function onBeforeSend(args) {
    console.log('Before sending request');
    console.log('Action:', args.action);
    console.log('Path:', args.path);
    
    // Add custom headers
    if (args.ajaxSettings && args.ajaxSettings.beforeSend) {
        args.ajaxSettings.beforeSend = function(xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + getAuthToken());
            xhr.setRequestHeader('X-Request-Type', args.action);
            xhr.setRequestHeader('X-Timestamp', Date.now().toString());
        };
    }
}
</script>
```

**Event Arguments:**
- `action` - AJAX action type (read, create, delete, etc.)
- `path` - File path for operation
- `ajaxSettings` - AJAX settings object
- `cancel` - Set to true to prevent request

### Failure Event

Triggered when request fails:

```html
<ejs-filemanager id="filemanager"
    failure="onFailure">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
function redirectToLogin() {
    window.location.href = '/Account/Login';
}

function onFailure(args) {
    console.log('Request failed');
    console.log('Error:', args.error);
    console.log('Status code:', args.status);
    
    // Handle specific errors
    if (args.status === 401) {
        redirectToLogin();
    } else if (args.status === 403) {
        showError('Access denied');
    } else {
        showError('Error: ' + args.error);
    }
}
</script>
```

**Event Arguments:**
- `error` - Error message
- `status` - HTTP status code
- `response` - Error response data

### Before Download Event

Triggered before file download. Allows customization of download headers and authentication:

```html
<ejs-filemanager id="filemanager"
    beforeDownload="onBeforeDownload">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager" 
        downloadUrl="/FileManager/Download">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
function onBeforeDownload(args) {
    console.log('Downloading:', args.fileDetails.map(function(f) { return f.name; }));
    
    // Use fetch API instead of form POST
    args.useFormPost = false;
    
    // Add authentication headers
    if (args.ajaxSettings && args.ajaxSettings.beforeSend) {
        args.ajaxSettings.beforeSend = function(xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + getAuthToken());
            xhr.setRequestHeader('X-Download-Type', 'secure');
        };
    }
}
</script>
```

**Event Arguments:**
- `fileDetails` - Files to download
- `useFormPost` - Set to false for custom headers
- `ajaxSettings` - AJAX settings for customization

## Dialog and UI Events

### Before Open Dialog

Triggered before dialog opens (create folder, rename, etc.):

```html
<ejs-filemanager id="filemanager"
    beforePopupOpen="onBeforePopupOpen">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
function getDefaultFolderName() {
    var date = new Date();
    return 'NewFolder-' + date.getTime();
}

function onBeforePopupOpen(args) {
    console.log('Dialog opening:', args.dialogName);
    console.log('Dialog type:', args.dialogType);
    
    // Customize dialog based on type
    if (args.dialogType === 'NewFolder' && args.element) {
        var input = args.element.querySelector('input');
        if (input) {
            input.value = getDefaultFolderName();
        }
    }
}
</script>
```

**Event Arguments:**
- `dialogName` - Dialog identifier
- `dialogType` - Type of dialog (NewFolder, Rename, etc.)
- `element` - Dialog DOM element
- `cancel` - Set to true to prevent dialog

### Dialog Close

Triggered when dialog closes:

```html
<ejs-filemanager id="filemanager"
    popupClose="onPopupClose">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
function onPopupClose(args) {
    console.log('Dialog closed:', args.dialogName);
    
    // Cleanup or refresh
    refreshFileList();
}
</script>
```

### Toolbar Click

Triggered when toolbar item is clicked:

```html
@{
    string[] toolbarItems = new string[] { "NewFolder", "Upload", "Delete" };
}

<ejs-filemanager id="filemanager"
    toolbarClick="onToolbarClick">
    <e-filemanager-toolbarsettings items="@toolbarItems">
    </e-filemanager-toolbarsettings>
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
function printCurrentDirectory() {
    console.log('Printing current directory contents');
}

function onToolbarClick(args) {
    console.log('Toolbar item clicked:', args.item.name);
    console.log('Item text:', args.item.text);
    
    // Handle custom toolbar items
    if (args.item.name === 'customPrint') {
        printCurrentDirectory();
    }
}
</script>
```

### Context Menu Events

```html
<ejs-filemanager id="filemanager"
    menuOpen="onMenuOpen"
    menuClick="onMenuClick">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
function onMenuOpen(args) {
    console.log('Context menu opening');
    console.log('Right-clicked on:', args.fileDetails);
}

function onMenuClick(args) {
    console.log('Context menu item clicked:', args.item.name);
}
</script>
```

## Image Loading Events

### Before Image Load

Triggered before loading thumbnail images for files in LargeIcons view. Allows customization for authenticated image access:

```html
<ejs-filemanager id="filemanager"
    view="LargeIcons"
    beforeImageLoad="onBeforeImageLoad">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager" 
        getImageUrl="/FileManager/GetImage">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
function onBeforeImageLoad(args) {
    console.log('Loading image for:', args.fileDetails.name);
    
    // Use fetch API instead of URL-based loading
    args.useImageAsUrl = false;
    
    // Add authentication headers
    if (args.ajaxSettings && args.ajaxSettings.beforeSend) {
        args.ajaxSettings.beforeSend = function(xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + getAuthToken());
            xhr.setRequestHeader('Cache-Control', 'max-age=3600');
        };
    }
}
</script>
```

**Event Arguments:**
- `fileDetails` - File details for image
- `useImageAsUrl` - Set to false for custom headers
- `ajaxSettings` - AJAX settings for customization

## Event Handler Patterns

### Combining Multiple Events

```html
<ejs-filemanager id="filemanager"
    beforeSend="onBeforeSend"
    beforeDownload="onBeforeDownload"
    beforeImageLoad="onBeforeImageLoad">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager" 
        downloadUrl="/FileManager/Download" 
        getImageUrl="/FileManager/GetImage">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
function onBeforeSend(args) {
    // Add auth headers to all requests
    if (args.ajaxSettings && args.ajaxSettings.beforeSend) {
        args.ajaxSettings.beforeSend = function(xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + getAuthToken());
        };
    }
}

function onBeforeDownload(args) {
    // Special handling for downloads
    args.useFormPost = false;
}

function onBeforeImageLoad(args) {
    // Special handling for images
    args.useImageAsUrl = false;
}
</script>
```

### Error Prevention Pattern

```html
<ejs-filemanager id="filemanager"
    beforeDelete="preventInvalidOperations"
    beforeRename="preventInvalidOperations"
    beforeMove="preventInvalidOperations">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
function showWarning(message) {
    alert('Warning: ' + message);
}

function preventInvalidOperations(args) {
    var protectedNames = ['.', '..', 'System Volume Information', '$Recycle.Bin'];
    
    if (args.fileDetails && args.fileDetails.some(function(f) {
        return protectedNames.indexOf(f.name) !== -1;
    })) {
        args.cancel = true;
        showWarning('Cannot modify protected files');
    }
}
</script>
```

## Practical Examples

### Audit Logging Example

```html
<div>
    <ejs-filemanager id="filemanager"
        folderCreate="logAuditOperation"
        delete="logAuditOperation"
        rename="logAuditOperation"
        move="logAuditOperation"
        copy="logAuditOperation">
        <e-filemanager-ajaxsettings url="/FileManager/FileManager">
        </e-filemanager-ajaxsettings>
    </ejs-filemanager>
</div>

<script>
function getCurrentUserId() {
    var userElement = document.getElementById('userId');
    return userElement ? userElement.value : 'SYSTEM';
}

function logAuditOperation(args) {
    var operationMap = {
        'folderCreate': 'CREATE_FOLDER',
        'delete': 'DELETE',
        'rename': 'RENAME',
        'move': 'MOVE',
        'copy': 'COPY'
    };
    
    var auditEntry = {
        userId: getCurrentUserId(),
        operation: operationMap[args.eventType] || args.eventType,
        timestamp: new Date().toISOString(),
        details: {
            files: args.fileDetails ? args.fileDetails.map(function(f) {
                return { name: f.name, path: f.path, type: f.isFile ? 'FILE' : 'FOLDER' };
            }) : [],
            targetPath: args.path || ''
        }
    };
    
    fetch('/FileManager/LogOperation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(auditEntry)
    }).catch(function(error) {
        console.error('Audit log failed:', error);
    });
}
</script>
```

### Authentication Header Example

```html
<div>
    <ejs-filemanager id="filemanager"
        beforeSend="injectAuthHeaders">
        <e-filemanager-ajaxsettings url="/FileManager/FileManager"
            downloadUrl="/FileManager/Download"
            getImageUrl="/FileManager/GetImage">
        </e-filemanager-ajaxsettings>
    </ejs-filemanager>
</div>

<script>
function getAuthToken() {
    return localStorage.getItem('authToken') || '';
}

function getDeviceId() {
    var deviceId = sessionStorage.getItem('deviceId');
    if (!deviceId) {
        deviceId = 'dev-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
        sessionStorage.setItem('deviceId', deviceId);
    }
    return deviceId;
}

function injectAuthHeaders(args) {
    if (args.ajaxSettings && args.ajaxSettings.beforeSend) {
        args.ajaxSettings.beforeSend = function(xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + getAuthToken());
            xhr.setRequestHeader('X-Device-ID', getDeviceId());
            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        };
    }
}
</script>
```

---

**Related Topics:**
- Programmatic methods: See `programmatic-methods.md`
- Custom headers: See `authentication-headers.md`
