# Drag & Drop File Management Guide

## Table of Contents
- [Drag and Drop Overview](#drag-and-drop-overview)
- [Enabling Drag and Drop](#enabling-drag-and-drop)
- [Drag and Drop Events](#drag-and-drop-events)
- [External Drag and Drop](#external-drag-and-drop)
- [Practical Examples](#practical-examples)
- [Best Practices](#best-practices)

## Drag and Drop Overview

The File Manager allows users to drag and drop files and folders between directories within the File Manager. This provides an intuitive way to organize files similar to desktop file explorers.

**Drag and Drop Features:**
- Move files and folders between directories
- Intuitive visual feedback during dragging
- Drop zone highlighting
- Cancellation support
- Event-based customization
- Internal drag and drop (File Manager to File Manager)
- External drag and drop (OS files to File Manager)

## Enabling Drag and Drop

### Basic Setup

**View Code (Index.cshtml)**:
```html
<ejs-filemanager id="filemanager" allowDragAndDrop="true">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>
```

### Advanced Configuration

**View Code (Index.cshtml)**:
```html
<ejs-filemanager id="filemanager"
    allowDragAndDrop="true"
    allowMultiSelection="true">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager"
        uploadUrl="/FileManager/Upload">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>
```

**Important:** Setting `allowDragAndDrop="false"` only prevents internal drag and drop. External drag and drop (from OS) is controlled separately through upload settings.

## Drag and Drop Events

### File Drag Start Event

Triggered when a file or folder begins to be dragged:

**View Code (Index.cshtml)**:
```html
<ejs-filemanager id="filemanager"
    fileDragStart="onFileDragStart"
    allowDragAndDrop="true">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
    function onFileDragStart(args) {
        var fileNames = args.fileDetails.map(function(f) { return f.name; }).join(', ');
        console.log('Dragging started for:', fileNames);
        console.log('Source path:', args.path);
        
        // Prevent dragging specific file types
        var hasHiddenFile = args.fileDetails.some(function(f) { return f.name.startsWith('.'); });
        if (hasHiddenFile) {
            args.cancel = true;
        }
    }
</script>
```

**Event Properties:**
- `fileDetails`: Array of files/folders being dragged
- `path`: Current folder path
- `cancel`: Set to true to prevent drag operation

### File Dragging Event

Triggered continuously while file is being dragged:

**View Code (Index.cshtml)**:
```html
<ejs-filemanager id="filemanager"
    fileDragging="onFileDragging"
    allowDragAndDrop="true">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
    function onFileDragging(args) {
        // Track drag position
        console.log('Drag position - X:', args.event.clientX, 'Y:', args.event.clientY);
        console.log('Drop target:', args.dropTarget);
    }
</script>
```

**Event Properties:**
- `event`: Native drag event
- `dropTarget`: Target element information
- Fires multiple times during drag operation

### File Drag Stop Event

Triggered when file is released:

**View Code (Index.cshtml)**:
```html
<ejs-filemanager id="filemanager"
    fileDragStop="onFileDragStop"
    allowDragAndDrop="true">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
    function onFileDragStop(args) {
        console.log('Dragging stopped');
        console.log('Drop target folder:', args.dropPath);
        console.log('Source:', args.path);
        
        // Prevent drop to specific folders
        if (args.dropPath && args.dropPath.includes('archived')) {
            args.cancel = true;
        }
    }
</script>
```

**Event Properties:**
- `dropPath`: Target folder path
- `path`: Source folder path
- `fileDetails`: Items being dropped

### File Dropped Event

Triggered after successful drop operation:

**View Code (Index.cshtml)**:
```html
<ejs-filemanager id="filemanager"
    fileDropped="onFileDropped"
    allowDragAndDrop="true">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
    function onFileDropped(args) {
        console.log('Files dropped successfully');
        console.log('Moved to:', args.dropPath);
        var fileNames = args.fileDetails.map(function(f) { return f.name; }).join(', ');
        console.log('Files:', fileNames);
    }
</script>
```

## External Drag and Drop

External drag and drop allows users to drag files from their operating system (desktop, file explorer, etc.) into the File Manager. This is enabled by default if `allowDragAndDrop={true}`.

### Accepting OS Files

**View Code (Index.cshtml)**:
```html
<ejs-filemanager id="filemanager"
    allowDragAndDrop="true">
    <e-filemanager-uploadsettings autoUpload="true" allowedExtensions=".jpg,.png,.pdf,.doc,.docx">
    </e-filemanager-uploadsettings>
    <e-filemanager-ajaxsettings url="/FileManager/FileManager" uploadUrl="/FileManager/Upload" 
        downloadUrl="/FileManager/Download" getImageUrl="/FileManager/GetImage">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>
```

### Handling External Drop

**View Code (Index.cshtml)**:
```html
<ejs-filemanager id="filemanager"
    allowDragAndDrop="true"
    fileDropped="onFileDropped">
    <e-filemanager-uploadsettings autoUpload="true">
    </e-filemanager-uploadsettings>
    <e-filemanager-ajaxsettings url="/FileManager/FileManager" uploadUrl="/FileManager/Upload" 
        downloadUrl="/FileManager/Download" getImageUrl="/FileManager/GetImage">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
    function onFileDropped(args) {
        console.log('External drop detected');
        console.log('Dropped files:', args.fileDetails);
    }
</script>
```

### Disabling External Drop

If you want internal drag and drop but not external file drops:

**View Code (Index.cshtml)**:
```html
<ejs-filemanager id="filemanager"
    allowDragAndDrop="true">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager" uploadUrl="/FileManager/Upload" 
        downloadUrl="/FileManager/Download" getImageUrl="/FileManager/GetImage">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>
```

## Practical Examples

### Example 1: Drag and Drop with Event Logging

**View Code (Index.cshtml)**:
```html
<ejs-filemanager id="filemanager"
    allowDragAndDrop="true"
    fileDragStart="onFileDragStart"
    fileDragging="onFileDragging"
    fileDragStop="onFileDragStop"
    fileDropped="onFileDropped">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager" uploadUrl="/FileManager/Upload" 
        downloadUrl="/FileManager/Download" getImageUrl="/FileManager/GetImage">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
    function onFileDragStart(args) {
        var fileNames = args.fileDetails.map(function(f) { return f.name; }).join(', ');
        console.log('Start:', fileNames);
    }
    
    function onFileDragging(args) {
        // Continuously fires - use sparingly
    }
    
    function onFileDragStop(args) {
        console.log('Stop:', args.dropPath);
    }
    
    function onFileDropped(args) {
        var fileNames = args.fileDetails.map(function(f) { return f.name; }).join(', ');
        console.log('Dropped:', fileNames, 'to', args.dropPath);
    }
</script>
```

### Example 2: Preventing Drag of Protected Files

**View Code (Index.cshtml)**:
```html
<ejs-filemanager id="filemanager"
    allowDragAndDrop="true"
    fileDragStart="handleDragStart">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager" uploadUrl="/FileManager/Upload" 
        downloadUrl="/FileManager/Download" getImageUrl="/FileManager/GetImage">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
    function handleDragStart(args) {
        var protectedPatterns = ['.system', '.config', '.backup'];
        
        var hasProtected = args.fileDetails.some(function(f) {
            return protectedPatterns.some(function(p) { return f.name.startsWith(p); });
        });
        
        if (hasProtected) {
            args.cancel = true;
        }
    }
</script>
```

### Example 3: Preventing Drop to Archive Folders

**View Code (Index.cshtml)**:
```html
<ejs-filemanager id="filemanager"
    allowDragAndDrop="true"
    fileDragStop="handleDragStop">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager" uploadUrl="/FileManager/Upload" 
        downloadUrl="/FileManager/Download" getImageUrl="/FileManager/GetImage">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
    function handleDragStop(args) {
        if (args.dropPath && args.dropPath.includes('archive')) {
            args.cancel = true;
            alert('Cannot drop items into archived folders');
        }
    }
</script>
```

### Example 4: Full Drag-Drop with Upload Support

**View Code (Index.cshtml)**:
```html
<div id="dragInfo" style="padding: 10px; background-color: #f0f0f0; margin-bottom: 10px; display: none;">
    <p id="dragStatus"></p>
</div>

<ejs-filemanager id="filemanager"
    allowDragAndDrop="true"
    fileDragStart="onFileDragStart"
    fileDragStop="onFileDragStop"
    fileDropped="onFileDropped">
    <e-filemanager-uploadsettings autoUpload="true" allowedExtensions=".jpg,.png,.pdf,.doc,.docx,.txt">
    </e-filemanager-uploadsettings>
    <e-filemanager-ajaxsettings url="/FileManager/FileManager" uploadUrl="/FileManager/Upload" 
        downloadUrl="/FileManager/Download" getImageUrl="/FileManager/GetImage">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
    function onFileDragStart(args) {
        var fileNames = args.fileDetails.map(function(f) { return f.name; }).join(', ');
        updateDragInfo('Dragging: ' + fileNames);
    }
    
    function onFileDragStop(args) {
        updateDragInfo('Ready to drop to: ' + args.dropPath);
    }
    
    function onFileDropped(args) {
        updateDragInfo('Successfully moved to: ' + args.dropPath);
    }
    
    function updateDragInfo(message) {
        var dragInfoDiv = document.getElementById('dragInfo');
        var dragStatus = document.getElementById('dragStatus');
        dragInfoDiv.style.display = 'block';
        dragStatus.textContent = 'Status: ' + message;
    }
</script>
```

## Best Practices

### 1. Disable Drag for Protected Folders

**View Code (Index.cshtml)**:
```html
<ejs-filemanager id="filemanager"
    allowDragAndDrop="true"
    fileDragStart="validateProtectedFolder">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
    function validateProtectedFolder(args) {
        var protectedPaths = ['/System', '/Admin', '/Archive'];
        var isProtected = protectedPaths.indexOf(args.path) !== -1;
        
        if (isProtected) {
            args.cancel = true;
            console.log('Cannot drag items from protected folder: ' + args.path);
        }
    }
</script>
```

**Controller Code (FileManagerController.cs)**:
```csharp
[HttpPost]
public ActionResult FileManager(string action)
{
    var protectedFolders = new[] { "/System", "/Admin", "/Archive" };
    
    switch (action)
    {
        case "copy":
        case "move":
            var sourcePath = Request.Form["sourceFile"];
            if (protectedFolders.Any(p => sourcePath.StartsWith(p)))
            {
                return Json(new { error = "Cannot move files from protected folders" });
            }
            break;
    }
    
    return Json(new { });
}
```

### 2. Validate Drop Targets

**View Code (Index.cshtml)**:
```html
<ejs-filemanager id="filemanager"
    allowDragAndDrop="true"
    fileDragStop="validateDropTarget">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
    function validateDropTarget(args) {
        var allowedFolders = ['/Documents', '/Uploads', '/Shared'];
        var isAllowed = allowedFolders.some(function(folder) {
            return args.dropPath && args.dropPath.indexOf(folder) === 0;
        });
        
        if (!isAllowed) {
            args.cancel = true;
            console.log('Cannot drop files to: ' + args.dropPath);
        }
    }
</script>
```

**Key Considerations**:
- `args.dropPath` contains the target folder path
- Check against allowed destination folders
- Cancel operation for restricted targets
- Provide visual feedback to user (consider implementing CSS to show invalid drop zones)

### 3. File Type Restrictions

**View Code (Index.cshtml)**:
```html
<ejs-filemanager id="filemanager"
    allowDragAndDrop="true"
    fileDragStart="validateFileTypes">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
    function validateFileTypes(args) {
        var restrictedExtensions = ['.exe', '.bat', '.cmd', '.sh', '.zip', '.rar'];
        var hasRestrictedFile = false;
        
        if (args.fileDetails) {
            hasRestrictedFile = args.fileDetails.some(function(file) {
                var extension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
                return restrictedExtensions.indexOf(extension) !== -1;
            });
        }
        
        if (hasRestrictedFile) {
            args.cancel = true;
            alert('Cannot drag restricted file types (.exe, .bat, .cmd, .sh, .zip, .rar)');
        }
    }
</script>
```

**Restriction Configuration**:
- Executable files (.exe, .bat, .cmd, .sh)
- Archive files (.zip, .rar)
- Custom extension lists based on security policy
- Server-side validation should also enforce restrictions

### 4. Logging and Audit Trail

**View Code (Index.cshtml)**:
```html
<ejs-filemanager id="filemanager"
    allowDragAndDrop="true"
    fileDropped="logDragDropOperation">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
    function logDragDropOperation(args) {
        var fileNames = args.fileDetails ? 
            args.fileDetails.map(function(f) { return f.name; }).join(', ') : 'unknown';
        
        var auditLog = {
            action: 'drag-drop-move',
            files: fileNames,
            from: args.path,
            to: args.dropPath,
            timestamp: new Date().toISOString()
        };
        
        console.log('Audit Log:', auditLog);
        
        // Send to server for permanent logging
        fetch('/FileManager/LogAudit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(auditLog)
        }).catch(function(error) {
            console.error('Audit logging failed:', error);
        });
    }
</script>
```

**Controller Code (FileManagerController.cs)**:
```csharp
[HttpPost]
public ActionResult LogAudit([FromBody] dynamic auditData)
{
    try
    {
        // Log to file, database, or audit service
        var auditEntry = new
        {
            Action = auditData.action,
            Files = auditData.files,
            FromPath = auditData.from,
            ToPath = auditData.to,
            Timestamp = DateTime.ParseExact(auditData.timestamp.ToString(), "O", CultureInfo.InvariantCulture),
            User = User.Identity.Name,
            IpAddress = Request.HttpContext.Connection.RemoteIpAddress.ToString()
        };
        
        // Persist to database or file
        _auditService.LogOperation(auditEntry);
        
        return Json(new { success = true });
    }
    catch (Exception ex)
    {
        return Json(new { success = false, error = ex.Message });
    }
}
```

### 5. Performance Consideration

For operations with many files being dragged:

**View Code (Index.cshtml)**:
```html
<ejs-filemanager id="filemanager"
    allowDragAndDrop="true"
    fileDragging="optimizedDragHandler">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
    var dragTimeout;
    
    function optimizedDragHandler(args) {
        // Debounce UI updates during dragging
        clearTimeout(dragTimeout);
        dragTimeout = setTimeout(function() {
            var dropZoneElement = args.dropTarget;
            if (dropZoneElement) {
                // Add visual feedback to drop zone
                dropZoneElement.classList.add('drag-over');
            }
            
            // Log less frequently during continuous drag events
            console.log('Current drop zone:', args.dropTarget);
        }, 100);
    }
    
    function cleanupDragState() {
        clearTimeout(dragTimeout);
        var dropZones = document.querySelectorAll('.drag-over');
        dropZones.forEach(function(zone) {
            zone.classList.remove('drag-over');
        });
    }
</script>

<style>
    .drag-over {
        background-color: #e3f2fd;
        border: 2px dashed #2196F3;
    }
</style>
```

**Performance Tips**:
- Debounce frequent drag events to reduce UI updates
- Use CSS classes for visual feedback instead of inline styles
- Limit file details processing for large selections
- Consider backend optimization for operations with 100+ files

---

**Related Topics:**
- File upload: See `file-upload.md`
- File operations: See `file-operations.md`
- Selection modes: See `selection-modes.md`
