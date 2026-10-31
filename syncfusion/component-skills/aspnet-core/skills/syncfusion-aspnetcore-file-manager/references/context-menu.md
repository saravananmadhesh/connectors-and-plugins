# Context Menu Configuration Guide

## Table of Contents
- [Context Menu Overview](#context-menu-overview)
- [Built-in Context Menu Items](#built-in-context-menu-items)
- [Context Menu Configuration](#context-menu-configuration)
- [Custom Context Menu Items](#custom-context-menu-items)
- [Context Menu Events](#context-menu-events)
- [Visibility Control](#visibility-control)
- [Practical Examples](#practical-examples)

## Context Menu Overview

The File Manager provides context-sensitive right-click menus:

**Default Context Menu Features:**
- File operations (copy, cut, paste, delete)
- Rename and properties
- Download functionality
- Custom item addition
- Dynamic menu items based on selection

## Built-in Context Menu Items

### Standard Menu Items

**Available Context Menu Items**:
```
Cut, Copy, Paste, Delete, Rename, Download, Properties, NewFolder, 
Upload, Open, Refresh, Paste, Preview, Edit, Extract, etc.
```

**Controller Code (FileManagerController.cs)**:
```csharp
public IActionResult Index()
{
    // Define context menu items for different contexts
    string[] fileMenu = new string[] { "Cut", "Copy", "Delete", "Download", "Rename", "Properties" };
    string[] folderMenu = new string[] { "Cut", "Copy", "Paste", "Delete", "Rename", "NewFolder", "Upload" };
    string[] layoutMenu = new string[] { "Paste", "Upload", "NewFolder", "Refresh" };
    
    ViewBag.FileMenu = fileMenu;
    ViewBag.FolderMenu = folderMenu;
    ViewBag.LayoutMenu = layoutMenu;
    
    return View();
}
```

**View Code (Index.cshtml)**:
```html
@{
    string[] fileMenu = new string[] { "Cut", "Copy", "Delete", "Download", "Rename", "Properties" };
    string[] folderMenu = new string[] { "Cut", "Copy", "Paste", "Delete", "Rename", "NewFolder", "Upload" };
    string[] layoutMenu = new string[] { "Paste", "Upload", "NewFolder", "Refresh" };
}

<ejs-filemanager id="filemanager"
    allowMultiSelection="true">
    <e-filemanager-contextmenusettings file="fileMenu" folder="folderMenu" layout="layoutMenu">
    </e-filemanager-contextmenusettings>
    <e-filemanager-ajaxsettings url="/FileManager/FileManager" uploadUrl="/FileManager/Upload" 
        downloadUrl="/FileManager/Download" getImageUrl="/FileManager/GetImage">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>
```

## Context Menu Configuration

### Context Menu Types

**Three Context Menu Scopes Supported**:
1. **File Menu** - Right-click on files
2. **Folder Menu** - Right-click on folders  
3. **Layout Menu** - Right-click on empty area

**View Code (Index.cshtml)**:
```html
@{
    // File context menu: shown when right-clicking on files
    string[] fileMenu = new string[] { "Copy", "Cut", "Delete", "Download", "Rename" };
    
    // Folder context menu: shown when right-clicking on folders
    string[] folderMenu = new string[] { "Copy", "Cut", "Paste", "Delete", "Rename", "NewFolder" };
    
    // Layout context menu: shown when right-clicking on empty area
    string[] layoutMenu = new string[] { "Paste", "NewFolder", "Upload", "Refresh" };
}

<ejs-filemanager id="filemanager"
    allowMultiSelection="true"
    menuClick="onMenuClick">
    <e-filemanager-contextmenusettings file="fileMenu" folder="folderMenu" layout="layoutMenu">
    </e-filemanager-contextmenusettings>
    <e-filemanager-ajaxsettings url="/FileManager/FileManager" uploadUrl="/FileManager/Upload" 
        downloadUrl="/FileManager/Download" getImageUrl="/FileManager/GetImage">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
    function onMenuClick(args) {
        console.log('Menu item clicked: ' + args.item.name);
        console.log('Files selected: ' + args.fileDetails.length);
    }
</script>
```

### Minimal Context Menu

**View Code (Index.cshtml)**:
```html
@{
    // Minimal context menu with essential items only
    string[] fileMenu = new string[] { "Copy", "Delete" };
    string[] folderMenu = new string[] { "Copy", "Delete", "NewFolder" };
    string[] layoutMenu = new string[] { "Upload", "NewFolder", "Refresh" };
}

<ejs-filemanager id="filemanager"
    allowMultiSelection="true">
    <e-filemanager-contextmenusettings file="fileMenu" folder="folderMenu" layout="layoutMenu">
    </e-filemanager-contextmenusettings>
    <e-filemanager-ajaxsettings url="/FileManager/FileManager" uploadUrl="/FileManager/Upload" 
        downloadUrl="/FileManager/Download" getImageUrl="/FileManager/GetImage">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>
```

## Custom Context Menu Items

### Add Custom Menu Items

**View Code (Index.cshtml)**:
```html
@{
    // Standard items
    string[] fileMenu = new string[] { "Copy", "Cut", "Delete", "Download" };
    string[] folderMenu = new string[] { "Copy", "Cut", "Paste", "Delete", "NewFolder" };
    
    // Add custom items (these will be added programmatically)
}

<div id="customMenuLog" style="padding: 10px; background-color: #f5f5f5; margin-bottom: 10px; height: 80px; overflow-y: auto;">
    <strong>Menu Actions:</strong><br/>
</div>

<ejs-filemanager id="filemanager"
    allowMultiSelection="true"
    menuClick="onCustomMenuClick">
    <e-filemanager-contextmenusettings file="fileMenu" folder="folderMenu">
    </e-filemanager-contextmenusettings>
    <e-filemanager-ajaxsettings url="/FileManager/FileManager" uploadUrl="/FileManager/Upload" 
        downloadUrl="/FileManager/Download" getImageUrl="/FileManager/GetImage">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
    function onCustomMenuClick(args) {
        logMenuAction(args.item.name);
        console.log('Menu item clicked: ' + args.item.name);
        
        var fileDetails = args.fileDetails || [];
        
        switch(args.item.name) {
            case 'Print':
                handlePrint(fileDetails);
                break;
            case 'Share':
                openShareDialog(fileDetails);
                break;
            case 'Compress':
                createArchive(fileDetails);
                break;
            case 'Lock':
                lockFile(fileDetails);
                break;
        }
    }
    
    function handlePrint(fileDetails) {
        console.log('Printing: ' + fileDetails.name);
        window.print();
    }
    
    function openShareDialog(fileDetails) {
        console.log('Sharing: ' + fileDetails.name);
        alert('Share dialog for: ' + fileDetails.name);
    }
    
    function createArchive(fileDetails) {
        console.log('Compressing: ' + fileDetails.name);
        alert('Creating archive: ' + fileDetails.name + '.zip');
    }
    
    function lockFile(fileDetails) {
        console.log('Locking: ' + fileDetails.name);
        alert('File locked: ' + fileDetails.name);
    }
</script>
```

### Menu Item Properties

**When adding custom items**, available properties are set via JavaScript:
```
name: 'uniqueName'           // Unique identifier
text: 'Display Text'         // Text shown to user
icon: 'e-icons e-icon-name'  // Icon class (Syncfusion icons)
```

### Icon Examples with Custom Items

**View Code (Index.cshtml)**:
```html
@{
    string[] fileMenu = new string[] { "Copy", "Cut", "Delete", "Download", "|", "Print", "Archive", "Sync", "Settings" };
}

<ejs-filemanager id="filemanager"
    allowMultiSelection="true"
    menuClick="onMenuClick">
    <e-filemanager-contextmenusettings file="fileMenu">
    </e-filemanager-contextmenusettings>
    <e-filemanager-ajaxsettings url="/FileManager/FileManager" uploadUrl="/FileManager/Upload" 
        downloadUrl="/FileManager/Download" getImageUrl="/FileManager/GetImage">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
    function onMenuClick(args) {
        console.log('Action: ' + args.item.name);
        
        switch(args.item.name) {
            case 'Print':
                console.log('Print: ' + args.fileDetails.name);
                window.print();
                break;
            case 'Archive':
                console.log('Archive: ' + args.fileDetails.name);
                alert('Creating archive...');
                break;
            case 'Sync':
                console.log('Sync: ' + args.fileDetails.name);
                alert('Syncing...');
                break;
            case 'Settings':
                console.log('Settings for: ' + args.fileDetails.name);
                alert('Opening settings...');
                break;
        }
    }
</script>
```

## Context Menu Events

### Before Context Menu Open

**Triggered before context menu appears**:

**View Code (Index.cshtml)**:
```html
@{
    string[] fileMenu = new string[] { "Copy", "Cut", "Delete", "Download" };
    string[] folderMenu = new string[] { "Copy", "Cut", "Paste", "Delete", "NewFolder" };
}

<div id="eventLog" style="padding: 10px; background-color: #f0f8ff; height: 80px; overflow-y: auto; margin-bottom: 10px; border: 1px solid #ddd;">
    <strong>Event Log:</strong><br/>
</div>

<ejs-filemanager id="filemanager"
    allowMultiSelection="true"
    menuOpen="onMenuOpen"
    menuClick="onMenuClick">
    <e-filemanager-contextmenusettings file="fileMenu" folder="folderMenu">
    </e-filemanager-contextmenusettings>
    <e-filemanager-ajaxsettings url="/FileManager/FileManager" uploadUrl="/FileManager/Upload" 
        downloadUrl="/FileManager/Download" getImageUrl="/FileManager/GetImage">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
    function onMenuOpen(args) {
        var log = document.getElementById('eventLog');
        var timestamp = new Date().toLocaleTimeString();
        var fileName = args.fileDetails ? args.fileDetails.name : 'empty area';
        var message = timestamp + ' - Menu open for: ' + fileName + '<br/>';
        log.innerHTML = message + log.innerHTML.replace(/<strong>Event Log:<\/strong><br\/>/g, '');
        
        console.log('Context menu opening');
        console.log('Right-clicked on:', args.fileDetails);
    }
    
    function onMenuClick(args) {
        console.log('Menu item clicked: ' + args.item.name);
    }
</script>
```

### Context Menu Click Event

**Triggered when menu item is clicked**:

**View Code (Index.cshtml)**:
```html
@{
    string[] fileMenu = new string[] { "Copy", "Cut", "Delete", "Download", "|", "Print", "Share" };
}

<ejs-filemanager id="filemanager"
    allowMultiSelection="true"
    menuClick="onMenuClick">
    <e-filemanager-contextmenusettings file="fileMenu">
    </e-filemanager-contextmenusettings>
    <e-filemanager-ajaxsettings url="/FileManager/FileManager" uploadUrl="/FileManager/Upload" 
        downloadUrl="/FileManager/Download" getImageUrl="/FileManager/GetImage">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
    function onMenuClick(args) {
        console.log('Menu item clicked: ' + args.item.name);
        console.log('Right-clicked on: ' + (args.fileDetails ? args.fileDetails.name : 'empty area'));
        
        if (!args.fileDetails) return;
        
        switch(args.item.name) {
            case 'Copy':
                console.log('Copy: ' + args.fileDetails.name);
                break;
            case 'Print':
                printFile(args.fileDetails);
                break;
            case 'Share':
                shareFile(args.fileDetails);
                break;
            default:
                break;
        }
    }
    
    function printFile(fileDetails) {
        console.log('Printing: ' + fileDetails.name);
        window.print();
    }
    
    function shareFile(fileDetails) {
        console.log('Sharing: ' + fileDetails.name);
        alert('Share file: ' + fileDetails.name);
    }
</script>
```

### Context Menu Close Event

**Triggered when context menu is closed**:

**View Code (Index.cshtml)**:
```html
@{
    string[] fileMenu = new string[] { "Copy", "Delete" };
}

<div id="closeLog" style="padding: 10px; background-color: #fff3cd; margin-bottom: 10px; height: 80px; overflow-y: auto;">
    <strong>Menu State:</strong><br/>
</div>

<ejs-filemanager id="filemanager"
    allowMultiSelection="true"
    menuOpen="onMenuOpen"
    menuClose="onMenuClose">
    <e-filemanager-contextmenusettings file="fileMenu">
    </e-filemanager-contextmenusettings>
    <e-filemanager-ajaxsettings url="/FileManager/FileManager" uploadUrl="/FileManager/Upload" 
        downloadUrl="/FileManager/Download" getImageUrl="/FileManager/GetImage">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
    function onMenuOpen(args) {
        var log = document.getElementById('closeLog');
        var status = 'Context menu opened for: ' + (args.fileDetails ? args.fileDetails.name : 'layout') + '<br/>';
        log.innerHTML = status;
        console.log('Context menu opened for: ' + (args.fileDetails ? args.fileDetails.name : 'layout'));
    }
    
    function onMenuClose(args) {
        var log = document.getElementById('closeLog');
        log.innerHTML += 'Context menu closed<br/>';
        console.log('Context menu closed');
    }
</script>
```

## Visibility Control

### Dynamic Menu Item Visibility by File Type

**View Code (Index.cshtml)**:
```html
@{
    // Base menu items for all files
    string[] fileMenu = new string[] { "Copy", "Cut", "Delete", "Download", "|", "Print", "Edit" };
}

<div style="padding: 10px; background-color: #f0f0f0; margin-bottom: 10px;">
    <strong>Dynamic Menu:</strong> Menu items shown based on file type (right-click on different files)
</div>

<ejs-filemanager id="filemanager"
    allowMultiSelection="true"
    menuOpen="onMenuOpen"
    menuClick="onMenuClick">
    <e-filemanager-contextmenusettings file="fileMenu">
    </e-filemanager-contextmenusettings>
    <e-filemanager-ajaxsettings url="/FileManager/FileManager" uploadUrl="/FileManager/Upload" 
        downloadUrl="/FileManager/Download" getImageUrl="/FileManager/GetImage">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
    function onMenuOpen(args) {
        var fileDetails = args.fileDetails;
        if (!fileDetails) return;
        
        // Determine file type
        var ext = fileDetails.name.split('.').pop().toLowerCase();
        
        console.log('File: ' + fileDetails.name + ', Extension: ' + ext);
        
        if (['pdf', 'doc', 'docx', 'xlsx'].includes(ext)) {
            console.log('Document/Office file - Print option available');
        }
        if (['jpg', 'png', 'gif', 'bmp'].includes(ext)) {
            console.log('Image file - Edit option available');
        }
    }
    
    function onMenuClick(args) {
        console.log('Menu item clicked: ' + args.item.name);
    }
</script>
```

### Role-Based Context Menu

**Controller Code (FileManagerController.cs)**:
```csharp
[HttpGet]
public IActionResult GetRoleBasedContextMenu()
{
    var userRole = User.FindFirst(System.Security.Claims.ClaimTypes.Role)?.Value ?? "viewer";
    
    var menu = GetContextMenuByRole(userRole);
    return Json(new { menu = menu });
}

private object GetContextMenuByRole(string userRole)
{
    var baseFile = new[] { "Copy", "Download" };
    var baseFolder = new[] { "Copy" };
    
    return userRole.ToLower() switch
    {
        "admin" => new
        {
            file = baseFile.Concat(new[] { "Cut", "Delete", "Rename", "Properties" }).ToArray(),
            folder = baseFolder.Concat(new[] { "Cut", "Delete", "Rename", "NewFolder", "Upload" }).ToArray(),
            layout = new[] { "Paste", "NewFolder", "Upload", "Refresh" }
        },
        "editor" => new
        {
            file = baseFile.Concat(new[] { "Cut", "Delete" }).ToArray(),
            folder = baseFolder.Concat(new[] { "Cut", "Delete", "NewFolder" }).ToArray(),
            layout = new[] { "Paste", "NewFolder", "Refresh" }
        },
        _ => new  // Viewer role
        {
            file = baseFile,
            folder = baseFolder,
            layout = new[] { "Refresh" }
        }
    };
}
```

**View Code (Index.cshtml)**:
```html
<div id="menuContainer"></div>

<ejs-filemanager id="filemanager"
    allowMultiSelection="true">
    <e-filemanager-contextmenusettings>
    </e-filemanager-contextmenusettings>
    <e-filemanager-ajaxsettings url="/FileManager/FileManager" uploadUrl="/FileManager/Upload" 
        downloadUrl="/FileManager/Download" getImageUrl="/FileManager/GetImage">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
    // Fetch role-based menu and initialize
    fetch('/FileManager/GetRoleBasedContextMenu')
        .then(response => response.json())
        .then(data => {
            console.log('User role context menu: ', data.menu);
            var roleInfo = 'Context menu customized for: ' + data.menu.role || 'user';
            document.getElementById('menuContainer').innerHTML = roleInfo;
        });
</script>
```

### Disable Menu for System Files

**View Code (Index.cshtml)**:
```html
@{
    string[] fileMenu = new string[] { "Copy", "Cut", "Delete", "Rename" };
}

<ejs-filemanager id="filemanager"
    allowMultiSelection="true"
    menuOpen="onMenuOpen">
    <e-filemanager-contextmenusettings file="fileMenu">
    </e-filemanager-contextmenusettings>
    <e-filemanager-ajaxsettings url="/FileManager/FileManager" uploadUrl="/FileManager/Upload" 
        downloadUrl="/FileManager/Download" getImageUrl="/FileManager/GetImage">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
    function onMenuOpen(args) {
        var fileName = args.fileDetails ? args.fileDetails.name : '';
        
        // System files (starting with .) are read-only
        if (fileName.startsWith('.')) {
            console.log('System file detected: ' + fileName + ' - Delete and Rename disabled');
            // In production, disable menu items via DOM manipulation
        }
    }
</script>
```

## Practical Examples

### Example 1: Advanced Custom Menu with Actions

**View Code (Index.cshtml)**:
```html
@{
    string[] advancedMenu = new string[] { "Copy", "Cut", "Paste", "Delete", "|", 
                                           "Print", "Export", "Share", "|", "Properties" };
}

<div id="actionLog" style="padding: 10px; background-color: #f0f0f0; margin-bottom: 10px; height: 100px; overflow-y: auto;">
    <strong>Actions Performed:</strong><br/>
</div>

<ejs-filemanager id="filemanager"
    allowMultiSelection="true"
    menuClick="onAdvancedMenuClick">
    <e-filemanager-contextmenusettings file="advancedMenu" folder="advancedMenu">
    </e-filemanager-contextmenusettings>
    <e-filemanager-ajaxsettings url="/FileManager/FileManager" uploadUrl="/FileManager/Upload" 
        downloadUrl="/FileManager/Download" getImageUrl="/FileManager/GetImage">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
    function onAdvancedMenuClick(args) {
        logAction(args.item.name, args.fileDetails ? args.fileDetails.name : 'N/A');
        
        switch(args.item.name) {
            case 'Print':
                handlePrint(args.fileDetails);
                break;
            case 'Export':
                handleExport(args.fileDetails);
                break;
            case 'Share':
                handleShare(args.fileDetails);
                break;
        }
    }
    
    function logAction(action, fileName) {
        var log = document.getElementById('actionLog');
        var timestamp = new Date().toLocaleTimeString();
        var message = timestamp + ' - ' + action + ': ' + fileName + '<br/>';
        log.innerHTML = message + log.innerHTML.replace(/<strong>Actions Performed:<\/strong><br\/>/g, '');
    }
    
    function handlePrint(fileDetails) {
        console.log('Printing: ' + fileDetails.name);
        window.print();
    }
    
    function handleExport(fileDetails) {
        console.log('Exporting: ' + fileDetails.name);
        alert('Export options: ZIP, TAR, 7Z');
    }
    
    function handleShare(fileDetails) {
        console.log('Sharing: ' + fileDetails.name);
        alert('Share: ' + fileDetails.name);
    }
</script>
```

### Example 2: File Type Specific Menu

**View Code (Index.cshtml)**:
```html
@{
    string[] baseMenu = new string[] { "Copy", "Cut", "Delete", "Rename" };
}

<ejs-filemanager id="filemanager"
    allowMultiSelection="true"
    menuOpen="onMenuOpen"
    menuClick="onMenuClick">
    <e-filemanager-contextmenusettings file="baseMenu">
    </e-filemanager-contextmenusettings>
    <e-filemanager-ajaxsettings url="/FileManager/FileManager" uploadUrl="/FileManager/Upload" 
        downloadUrl="/FileManager/Download" getImageUrl="/FileManager/GetImage">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
    function onMenuOpen(args) {
        if (!args.fileDetails) return;
        
        var ext = args.fileDetails.name.split('.').pop().toLowerCase();
        var fileType = getFileType(ext);
        
        console.log('File: ' + args.fileDetails.name + ', Type: ' + fileType);
        
        // In production, dynamically show/hide menu items based on file type
        if (['pdf', 'doc', 'docx', 'xlsx'].includes(ext)) {
            console.log('Document - Print option available');
        } else if (['jpg', 'png', 'gif', 'bmp'].includes(ext)) {
            console.log('Image - Preview/Edit option available');
        } else if (['mp3', 'mp4', 'avi', 'mkv'].includes(ext)) {
            console.log('Media - Play option available');
        } else if (['zip', 'rar', '7z', 'tar'].includes(ext)) {
            console.log('Archive - Extract option available');
        }
    }
    
    function getFileType(ext) {
        var documentTypes = ['pdf', 'doc', 'docx', 'xlsx', 'ppt'];
        var imageTypes = ['jpg', 'png', 'gif', 'bmp', 'svg'];
        var mediaTypes = ['mp3', 'mp4', 'avi', 'mkv', 'mov'];
        var archiveTypes = ['zip', 'rar', '7z', 'tar'];
        
        if (documentTypes.includes(ext)) return 'Document';
        if (imageTypes.includes(ext)) return 'Image';
        if (mediaTypes.includes(ext)) return 'Media';
        if (archiveTypes.includes(ext)) return 'Archive';
        return 'Other';
    }
    
    function onMenuClick(args) {
        console.log('Menu clicked: ' + args.item.name);
    }
</script>
```

### Example 3: Context Menu with Delete Confirmation

**View Code (Index.cshtml)**:
```html
@{
    string[] fileMenu = new string[] { "Copy", "Cut", "Delete", "Rename", "Download" };
}

<ejs-filemanager id="filemanager"
    allowMultiSelection="true"
    menuClick="onMenuClickWithConfirm">
    <e-filemanager-contextmenusettings file="fileMenu">
    </e-filemanager-contextmenusettings>
    <e-filemanager-ajaxsettings url="/FileManager/FileManager" uploadUrl="/FileManager/Upload" 
        downloadUrl="/FileManager/Download" getImageUrl="/FileManager/GetImage">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
    function onMenuClickWithConfirm(args) {
        // Show confirmation for destructive operations
        if (['Delete', 'Cut'].includes(args.item.name)) {
            var fileName = args.fileDetails ? args.fileDetails.name : 'items';
            var message = 'Are you sure you want to ' + args.item.name.toLowerCase() + 
                         ' ' + fileName + '?';
            
            if (!confirm(message)) {
                console.log('Operation cancelled');
                return; // Cancel operation
            }
        }
        
        // Proceed with operation
        console.log('Performing: ' + args.item.name);
        
        switch(args.item.name) {
            case 'Delete':
                console.log('Deleting: ' + args.fileDetails.name);
                break;
            case 'Cut':
                console.log('Cutting: ' + args.fileDetails.name);
                break;
            case 'Copy':
                console.log('Copying: ' + args.fileDetails.name);
                break;
            case 'Download':
                console.log('Downloading: ' + args.fileDetails.name);
                break;
        }
    }
</script>
```

---

**Related Topics:**
- Toolbar customization: See `toolbar-customization.md`
- File operations: See `file-operations.md`
