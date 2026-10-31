# Toolbar Customization and Configuration

## Table of Contents
- [Toolbar Overview](#toolbar-overview)
- [Built-in Toolbar Items](#built-in-toolbar-items)
- [Toolbar Configuration](#toolbar-configuration)
- [Custom Toolbar Items](#custom-toolbar-items)
- [Toolbar Item Visibility](#toolbar-item-visibility)
- [Toolbar Events](#toolbar-events)
- [Toolbar Styling](#toolbar-styling)
- [Practical Examples](#practical-examples)

## Toolbar Overview

The File Manager toolbar provides quick access to file operations:

**Default Toolbar Items:**
- NewFolder - Create folder
- Upload - Upload files
- Delete - Delete selected items
- Rename - Rename selected item
- Download - Download selected items
- Refresh - Refresh file list
- Breadcrumb - Navigation path
- Search - Search files

## Built-in Toolbar Items

### All Available Toolbar Items

**View Code (Index.cshtml)**:
```html
<!-- Available toolbar items -->
<!-- NewFolder, Upload, Delete, Rename, Download, Refresh, Search, GridView, 
     LargeIconsView, Details, SortBy, ContextMenu -->

<ejs-filemanager id="filemanager"
    allowMultiSelection="true">
    <e-filemanager-toolbarsettings>
        <e-filemanager-toolbaritems>
            <e-filemanager-toolbaritem name="NewFolder"></e-filemanager-toolbaritem>
            <e-filemanager-toolbaritem name="Upload"></e-filemanager-toolbaritem>
            <e-filemanager-toolbaritem name="Delete"></e-filemanager-toolbaritem>
            <e-filemanager-toolbaritem name="Rename"></e-filemanager-toolbaritem>
            <e-filemanager-toolbaritem name="Download"></e-filemanager-toolbaritem>
            <e-filemanager-toolbaritem name="Refresh"></e-filemanager-toolbaritem>
            <e-filemanager-toolbaritem name="Search"></e-filemanager-toolbaritem>
            <e-filemanager-toolbaritem name="GridView"></e-filemanager-toolbaritem>
            <e-filemanager-toolbaritem name="LargeIconsView"></e-filemanager-toolbaritem>
            <e-filemanager-toolbaritem name="Details"></e-filemanager-toolbaritem>
            <e-filemanager-toolbaritem name="SortBy"></e-filemanager-toolbaritem>
        </e-filemanager-toolbaritems>
    </e-filemanager-toolbarsettings>
    <e-filemanager-ajaxsettings url="/FileManager/FileManager" uploadUrl="/FileManager/Upload" 
        downloadUrl="/FileManager/Download" getImageUrl="/FileManager/GetImage">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>
```

### Basic Toolbar Configuration

**View Code (Index.cshtml)**:
```html
<ejs-filemanager id="filemanager"
    allowMultiSelection="true">
    <e-filemanager-toolbarsettings>
        <e-filemanager-toolbaritems>
            <e-filemanager-toolbaritem name="NewFolder"></e-filemanager-toolbaritem>
            <e-filemanager-toolbaritem name="Upload"></e-filemanager-toolbaritem>
            <e-filemanager-toolbaritem name="Delete"></e-filemanager-toolbaritem>
            <e-filemanager-toolbaritem name="Refresh"></e-filemanager-toolbaritem>
            <e-filemanager-toolbaritem name="Download"></e-filemanager-toolbaritem>
        </e-filemanager-toolbaritems>
    </e-filemanager-toolbarsettings>
    <e-filemanager-ajaxsettings url="/FileManager/FileManager" uploadUrl="/FileManager/Upload" 
        downloadUrl="/FileManager/Download" getImageUrl="/FileManager/GetImage">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>
```

## Toolbar Configuration

### Hide Specific Items

**View Code (Index.cshtml)**:
```html
<!-- Omit 'Rename' to hide it from toolbar -->
<ejs-filemanager id="filemanager"
    allowMultiSelection="true">
    <e-filemanager-toolbarsettings>
        <e-filemanager-toolbaritems>
            <e-filemanager-toolbaritem name="NewFolder"></e-filemanager-toolbaritem>
            <e-filemanager-toolbaritem name="Upload"></e-filemanager-toolbaritem>
            <e-filemanager-toolbaritem name="Delete"></e-filemanager-toolbaritem>
            <e-filemanager-toolbaritem name="Refresh"></e-filemanager-toolbaritem>
            <!-- Rename item is NOT included, so it won't appear in toolbar -->
        </e-filemanager-toolbaritems>
    </e-filemanager-toolbarsettings>
    <e-filemanager-ajaxsettings url="/FileManager/FileManager" uploadUrl="/FileManager/Upload" 
        downloadUrl="/FileManager/Download" getImageUrl="/FileManager/GetImage">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>
```

### Show All Default Items

**View Code (Index.cshtml)**:
```html
<ejs-filemanager id="filemanager"
    allowMultiSelection="true">
    <e-filemanager-toolbarsettings>
        <e-filemanager-toolbaritems>
            <e-filemanager-toolbaritem name="NewFolder"></e-filemanager-toolbaritem>
            <e-filemanager-toolbaritem name="Upload"></e-filemanager-toolbaritem>
            <e-filemanager-toolbaritem name="Delete"></e-filemanager-toolbaritem>
            <e-filemanager-toolbaritem name="Rename"></e-filemanager-toolbaritem>
            <e-filemanager-toolbaritem name="Download"></e-filemanager-toolbaritem>
            <e-filemanager-toolbaritem name="Refresh"></e-filemanager-toolbaritem>
            <e-filemanager-toolbaritem name="Search"></e-filemanager-toolbaritem>
            <e-filemanager-toolbaritem name="Details"></e-filemanager-toolbaritem>
        </e-filemanager-toolbaritems>
    </e-filemanager-toolbarsettings>
    <e-filemanager-ajaxsettings url="/FileManager/FileManager" uploadUrl="/FileManager/Upload" 
        downloadUrl="/FileManager/Download" getImageUrl="/FileManager/GetImage">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>
```

### Toolbar Item Order

**View Code (Index.cshtml)**:
```html
<!-- Arrange items in custom order - order of elements determines display order -->
<ejs-filemanager id="filemanager"
    allowMultiSelection="true">
    <e-filemanager-toolbarsettings>
        <e-filemanager-toolbaritems>
            <e-filemanager-toolbaritem name="NewFolder"></e-filemanager-toolbaritem>
            <e-filemanager-toolbaritem name="Upload"></e-filemanager-toolbaritem>
            <e-filemanager-toolbaritem name="Download"></e-filemanager-toolbaritem>
            <e-filemanager-toolbaritem name="Delete"></e-filemanager-toolbaritem>
            <e-filemanager-toolbaritem name="Rename"></e-filemanager-toolbaritem>
            <e-filemanager-toolbaritem name="Refresh"></e-filemanager-toolbaritem>
        </e-filemanager-toolbaritems>
    </e-filemanager-toolbarsettings>
    <e-filemanager-ajaxsettings url="/FileManager/FileManager" uploadUrl="/FileManager/Upload" 
        downloadUrl="/FileManager/Download" getImageUrl="/FileManager/GetImage">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>
```

## Custom Toolbar Items

### Add Custom Buttons

**View Code (Index.cshtml)**:
```html
<ejs-filemanager id="filemanager"
    allowMultiSelection="true"
    toolbarClick="onToolbarClick">
    <e-filemanager-toolbarsettings>
        <e-filemanager-toolbaritems>
            <e-filemanager-toolbaritem name="NewFolder"></e-filemanager-toolbaritem>
            <e-filemanager-toolbaritem name="Upload"></e-filemanager-toolbaritem>
            <e-filemanager-toolbaritem name="Delete"></e-filemanager-toolbaritem>
            <!-- Custom toolbar items -->
            <e-filemanager-toolbaritem name="Print" text="Print" prefixIcon="e-icons e-print" 
                tooltipText="Print current folder"></e-filemanager-toolbaritem>
            <e-filemanager-toolbaritem name="Share" text="Share" prefixIcon="e-icons e-share" 
                tooltipText="Share selected items"></e-filemanager-toolbaritem>
            <e-filemanager-toolbaritem name="Compress" text="Compress" prefixIcon="e-icons e-compress" 
                tooltipText="Create ZIP archive"></e-filemanager-toolbaritem>
        </e-filemanager-toolbaritems>
    </e-filemanager-toolbarsettings>
    <e-filemanager-ajaxsettings url="/FileManager/FileManager" uploadUrl="/FileManager/Upload" 
        downloadUrl="/FileManager/Download" getImageUrl="/FileManager/GetImage">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
    function onToolbarClick(args) {
        console.log('Toolbar item clicked: ' + args.item.name);
        
        switch(args.item.name) {
            case 'Print':
                printCurrentFolder();
                break;
            case 'Share':
                showShareDialog();
                break;
            case 'Compress':
                createZipArchive();
                break;
        }
    }
    
    function printCurrentFolder() {
        var fileManager = document.getElementById('filemanager').ej2_instances[0];
        console.log('Printing: ' + fileManager.getCurrentPath());
        window.print();
    }
    
    function showShareDialog() {
        var fileManager = document.getElementById('filemanager').ej2_instances[0];
        var selected = fileManager.getSelectedItems();
        alert('Share: ' + selected.map(function(f) { return f.name; }).join(', '));
    }
    
    function createZipArchive() {
        var fileManager = document.getElementById('filemanager').ej2_instances[0];
        var selected = fileManager.getSelectedItems();
        console.log('Creating archive with: ' + selected.length + ' items');
    }
</script>
```

### Toolbar Item Structure

**Properties**:
```
name: 'uniqueName'           // Unique identifier (required)
text: 'Display Text'         // Text shown to user
tooltipText: 'Hover tooltip' // Tooltip on hover
icon: 'e-icons e-icon-name'  // Icon class (Syncfusion icon)
align: 'Left' or 'Right'     // Toolbar alignment
```

### Icon Examples

**View Code (Index.cshtml)**:
```html
<ejs-filemanager id="filemanager"
    allowMultiSelection="true"
    toolbarClick="onToolbarClick">
    <e-filemanager-toolbarsettings>
        <e-filemanager-toolbaritems>
            <!-- Built-in items -->
            <e-filemanager-toolbaritem name="NewFolder"></e-filemanager-toolbaritem>
            <e-filemanager-toolbaritem name="Upload"></e-filemanager-toolbaritem>
            <e-filemanager-toolbaritem name="Delete"></e-filemanager-toolbaritem>
            <!-- Custom items with icons -->
            <e-filemanager-toolbaritem name="Print" text="Print" prefixIcon="e-icons e-print" 
                tooltipText="Print files"></e-filemanager-toolbaritem>
            <e-filemanager-toolbaritem name="Archive" text="Archive" prefixIcon="e-icons e-zip-folder" 
                tooltipText="Create archive"></e-filemanager-toolbaritem>
            <e-filemanager-toolbaritem name="Sync" text="Sync" prefixIcon="e-icons e-refresh" 
                tooltipText="Sync with cloud"></e-filemanager-toolbaritem>
            <e-filemanager-toolbaritem name="Settings" text="Settings" prefixIcon="e-icons e-settings" 
                align="Right" tooltipText="Open settings"></e-filemanager-toolbaritem>
        </e-filemanager-toolbaritems>
    </e-filemanager-toolbarsettings>
    <e-filemanager-ajaxsettings url="/FileManager/FileManager" uploadUrl="/FileManager/Upload" 
        downloadUrl="/FileManager/Download" getImageUrl="/FileManager/GetImage">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<style>
    /* Right-aligned items appear on the right side of toolbar */
    .e-toolbar .e-align-right {
        margin-left: auto;
    }
</style>
```

## Toolbar Item Visibility

### Dynamic Visibility Control

**View Code (Index.cshtml)**:
```html
<div id="selectionInfo" style="padding: 10px; background-color: #f5f5f5; margin-bottom: 10px;">
    Selected: <strong id="selectedCount">0</strong> items
</div>

<ejs-filemanager id="filemanager"
    allowMultiSelection="true"
    fileSelect="onFileSelect">
    <e-filemanager-toolbarsettings>
        <e-filemanager-toolbaritems>
            <e-filemanager-toolbaritem name="NewFolder"></e-filemanager-toolbaritem>
            <e-filemanager-toolbaritem name="Upload"></e-filemanager-toolbaritem>
            <e-filemanager-toolbaritem name="Refresh"></e-filemanager-toolbaritem>
            <!-- These appear only when items are selected -->
            <e-filemanager-toolbaritem id="deleteBtn" name="Delete" style="display:none;"></e-filemanager-toolbaritem>
            <e-filemanager-toolbaritem id="renameBtn" name="Rename" style="display:none;"></e-filemanager-toolbaritem>
            <e-filemanager-toolbaritem id="downloadBtn" name="Download" style="display:none;"></e-filemanager-toolbaritem>
        </e-filemanager-toolbaritems>
    </e-filemanager-toolbarsettings>
    <e-filemanager-ajaxsettings url="/FileManager/FileManager" uploadUrl="/FileManager/Upload" 
        downloadUrl="/FileManager/Download" getImageUrl="/FileManager/GetImage">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
    function onFileSelect(args) {
        updateToolbarVisibility(args.fileDetails);
    }
    
    function updateToolbarVisibility(selectedItems) {
        var count = selectedItems ? selectedItems.length : 0;
        document.getElementById('selectedCount').textContent = count;
        
        // Show/hide toolbar items based on selection
        document.getElementById('deleteBtn').style.display = count > 0 ? 'block' : 'none';
        document.getElementById('downloadBtn').style.display = count > 0 ? 'block' : 'none';
        document.getElementById('renameBtn').style.display = count === 1 ? 'block' : 'none';
    }
</script>
```

### Hide Toolbar for Read-Only Mode

**View Code (Index.cshtml)**:
```html
<ejs-filemanager id="filemanager"
    allowMultiSelection="true">
    <e-filemanager-toolbarsettings>
        <e-filemanager-toolbaritems>
            <!-- Read-only items only -->
            <e-filemanager-toolbaritem name="Download"></e-filemanager-toolbaritem>
            <e-filemanager-toolbaritem name="Refresh"></e-filemanager-toolbaritem>
            <e-filemanager-toolbaritem name="Search"></e-filemanager-toolbaritem>
        </e-filemanager-toolbaritems>
    </e-filemanager-toolbarsettings>
    <e-filemanager-ajaxsettings url="/FileManager/FileManager" downloadUrl="/FileManager/Download" 
        getImageUrl="/FileManager/GetImage">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>
```

### Role-Based Toolbar

**Controller Code (FileManagerController.cs)**:
```csharp
[HttpGet]
public IActionResult GetRoleBasedToolbar()
{
    var userRole = User.FindFirst(System.Security.Claims.ClaimTypes.Role)?.Value ?? "viewer";
    
    var toolbarItems = GetToolbarItemsByRole(userRole);
    return Json(new { items = toolbarItems });
}

private List<string> GetToolbarItemsByRole(string userRole)
{
    var baseItems = new List<string> { "Refresh", "Search" };
    
    switch (userRole.ToLower())
    {
        case "admin":
            return new List<string> { "NewFolder", "Upload", "Delete", "Rename", "Download", "Refresh", "Search" };
        case "editor":
            return new List<string> { "NewFolder", "Upload", "Delete", "Refresh", "Search" };
        case "viewer":
        default:
            return baseItems;
    }
}
```

**View Code (Index.cshtml)**:
```html
<div id="toolbarContainer"></div>

<script>
    // Get role-based toolbar configuration
    fetch('/FileManager/GetRoleBasedToolbar')
        .then(response => response.json())
        .then(data => {
            renderToolbar(data.items);
        });
    
    function renderToolbar(items) {
        // Build toolbar HTML dynamically based on role
        var toolbarHtml = '<ejs-filemanager id="filemanager" allowMultiSelection="true">' +
            '<e-filemanager-toolbarsettings><e-filemanager-toolbaritems>';
        
        items.forEach(function(item) {
            toolbarHtml += '<e-filemanager-toolbaritem name="' + item + '"></e-filemanager-toolbaritem>';
        });
        
        toolbarHtml += '</e-filemanager-toolbaritems></e-filemanager-toolbarsettings>' +
            '<e-filemanager-ajaxsettings url="/FileManager/FileManager" ' +
            'uploadUrl="/FileManager/Upload" downloadUrl="/FileManager/Download" ' +
            'getImageUrl="/FileManager/GetImage"></e-filemanager-ajaxsettings>' +
            '</ejs-filemanager>';
        
        document.getElementById('toolbarContainer').innerHTML = toolbarHtml;
    }
</script>
```

## Toolbar Events

### Toolbar Click Event

**View Code (Index.cshtml)**:
```html
<div id="eventLog" style="padding: 10px; background-color: #f0f8ff; height: 100px; overflow-y: auto; margin-bottom: 10px; border: 1px solid #ddd;">
    <strong>Event Log:</strong><br/>
</div>

<ejs-filemanager id="filemanager"
    allowMultiSelection="true"
    toolbarClick="onToolbarClick">
    <e-filemanager-toolbarsettings>
        <e-filemanager-toolbaritems>
            <e-filemanager-toolbaritem name="NewFolder"></e-filemanager-toolbaritem>
            <e-filemanager-toolbaritem name="Upload"></e-filemanager-toolbaritem>
            <e-filemanager-toolbaritem name="Delete"></e-filemanager-toolbaritem>
            <e-filemanager-toolbaritem name="Refresh"></e-filemanager-toolbaritem>
            <e-filemanager-toolbaritem name="Custom" text="Custom" prefixIcon="e-icons e-play"></e-filemanager-toolbaritem>
        </e-filemanager-toolbaritems>
    </e-filemanager-toolbarsettings>
    <e-filemanager-ajaxsettings url="/FileManager/FileManager" uploadUrl="/FileManager/Upload" 
        downloadUrl="/FileManager/Download" getImageUrl="/FileManager/GetImage">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
    function onToolbarClick(args) {
        console.log('Toolbar item clicked: ' + args.item.name);
        var logDiv = document.getElementById('eventLog');
        
        var timestamp = new Date().toLocaleTimeString();
        var message = timestamp + ' - Clicked: ' + args.item.name + '<br/>';
        
        // Prepend new log entry
        logDiv.innerHTML = message + logDiv.innerHTML.replace(/<strong>Event Log:<\/strong><br\/>/g, '');
        
        // Handle specific items
        switch (args.item.name) {
            case 'NewFolder':
                console.log('Creating folder');
                break;
            case 'Upload':
                console.log('Uploading files');
                break;
            case 'Delete':
                console.log('Deleting selected');
                break;
            case 'Custom':
                console.log('Custom action executed');
                break;
            default:
                console.log('Item: ' + args.item.name);
        }
    }
</script>
```

### Toolbar Create Event

**View Code (Index.cshtml)**:
```html
<ejs-filemanager id="filemanager"
    allowMultiSelection="true"
    created="onToolbarCreate">
    <e-filemanager-toolbarsettings>
        <e-filemanager-toolbaritems>
            <e-filemanager-toolbaritem name="NewFolder"></e-filemanager-toolbaritem>
            <e-filemanager-toolbaritem name="Upload"></e-filemanager-toolbaritem>
            <e-filemanager-toolbaritem name="Delete"></e-filemanager-toolbaritem>
            <e-filemanager-toolbaritem name="Refresh"></e-filemanager-toolbaritem>
        </e-filemanager-toolbaritems>
    </e-filemanager-toolbarsettings>
    <e-filemanager-ajaxsettings url="/FileManager/FileManager" uploadUrl="/FileManager/Upload" 
        downloadUrl="/FileManager/Download" getImageUrl="/FileManager/GetImage">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
    function onToolbarCreate(args) {
        console.log('FileManager toolbar created');
        
        // Get the FileManager instance
        var fileManager = document.getElementById('filemanager').ej2_instances[0];
        
        // Dynamically add custom toolbar item after creation
        // Access toolbar via fileManager properties
        setTimeout(function() {
            console.log('Toolbar initialization complete');
        }, 100);
    }
</script>
```

## Toolbar Styling

### Custom Toolbar CSS

**View Code (Index.cshtml) with Styles**:
```html
<style>
    /* Toolbar container */
    .e-toolbar {
        background-color: #f5f5f5;
        border-bottom: 1px solid #ddd;
        padding: 8px;
    }

    /* Toolbar items */
    .e-toolbar .e-toolbar-item {
        margin: 0 4px;
        padding: 4px 8px;
    }

    /* Toolbar button hover */
    .e-toolbar .e-tbar-btn:hover {
        background-color: #e0e0e0;
        border-radius: 4px;
        transition: background-color 0.2s ease;
    }

    /* Active toolbar button */
    .e-toolbar .e-tbar-btn.e-active {
        background-color: #2196f3;
        color: white;
        border-radius: 3px;
    }

    /* Disabled toolbar button */
    .e-toolbar .e-tbar-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
</style>

<ejs-filemanager id="filemanager"
    allowMultiSelection="true">
    <e-filemanager-toolbarsettings>
        <e-filemanager-toolbaritems>
            <e-filemanager-toolbaritem name="NewFolder"></e-filemanager-toolbaritem>
            <e-filemanager-toolbaritem name="Upload"></e-filemanager-toolbaritem>
            <e-filemanager-toolbaritem name="Delete"></e-filemanager-toolbaritem>
            <e-filemanager-toolbaritem name="Refresh"></e-filemanager-toolbaritem>
        </e-filemanager-toolbaritems>
    </e-filemanager-toolbarsettings>
    <e-filemanager-ajaxsettings url="/FileManager/FileManager" uploadUrl="/FileManager/Upload" 
        downloadUrl="/FileManager/Download" getImageUrl="/FileManager/GetImage">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>
```

### Toolbar Height and Custom Styling

**View Code (Index.cshtml)**:
```html
<style>
    /* Custom toolbar height */
    #customFilemanager .e-toolbar {
        height: 60px;
        padding: 12px;
    }

    #customFilemanager .e-tbar-btn {
        height: 36px;
        line-height: 36px;
        padding: 0 12px;
    }
</style>

<ejs-filemanager id="customFilemanager"
    allowMultiSelection="true">
    <e-filemanager-toolbarsettings>
        <e-filemanager-toolbaritems>
            <e-filemanager-toolbaritem name="NewFolder"></e-filemanager-toolbaritem>
            <e-filemanager-toolbaritem name="Upload"></e-filemanager-toolbaritem>
            <e-filemanager-toolbaritem name="Delete"></e-filemanager-toolbaritem>
        </e-filemanager-toolbaritems>
    </e-filemanager-toolbarsettings>
    <e-filemanager-ajaxsettings url="/FileManager/FileManager" uploadUrl="/FileManager/Upload" 
        downloadUrl="/FileManager/Download" getImageUrl="/FileManager/GetImage">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>
```

### Colored Toolbar Items

**View Code (Index.cshtml)**:
```html
<style>
    .toolbar-print-btn {
        color: #4CAF50 !important;
    }

    .toolbar-print-btn:hover {
        background-color: #e8f5e9 !important;
    }

    .toolbar-danger-btn {
        color: #f44336 !important;
    }

    .toolbar-danger-btn:hover {
        background-color: #ffebee !important;
    }

    .toolbar-warning-btn {
        color: #ff9800 !important;
    }

    .toolbar-warning-btn:hover {
        background-color: #fff3e0 !important;
    }
</style>

<ejs-filemanager id="filemanager"
    allowMultiSelection="true"
    toolbarClick="onToolbarClick">
    <e-filemanager-toolbarsettings>
        <e-filemanager-toolbaritems>
            <e-filemanager-toolbaritem name="Print" text="Print" prefixIcon="e-icons e-print" 
                cssClass="toolbar-print-btn"></e-filemanager-toolbaritem>
            <e-filemanager-toolbaritem name="Delete" text="Delete" prefixIcon="e-icons e-delete" 
                cssClass="toolbar-danger-btn"></e-filemanager-toolbaritem>
            <e-filemanager-toolbaritem name="Backup" text="Backup" prefixIcon="e-icons e-refresh" 
                cssClass="toolbar-warning-btn"></e-filemanager-toolbaritem>
        </e-filemanager-toolbaritems>
    </e-filemanager-toolbarsettings>
    <e-filemanager-ajaxsettings url="/FileManager/FileManager" uploadUrl="/FileManager/Upload" 
        downloadUrl="/FileManager/Download" getImageUrl="/FileManager/GetImage">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
    function onToolbarClick(args) {
        console.log('Clicked ' + args.item.name + ' (styled button)');
    }
</script>
```

## Practical Examples

### Example 1: Complete Custom Toolbar

**View Code (Index.cshtml)**:
```html
<div id="actionLog" style="padding: 10px; background-color: #f0f0f0; margin-bottom: 10px; height: 80px; overflow-y: auto; border: 1px solid #ddd;">
    <strong>Action Log:</strong><br/>
</div>

<ejs-filemanager id="filemanager"
    allowMultiSelection="true"
    toolbarClick="onCustomToolbarClick">
    <e-filemanager-toolbarsettings>
        <e-filemanager-toolbaritems>
            <e-filemanager-toolbaritem name="NewFolder"></e-filemanager-toolbaritem>
            <e-filemanager-toolbaritem name="Upload"></e-filemanager-toolbaritem>
            <e-filemanager-toolbaritem name="Delete"></e-filemanager-toolbaritem>
            <e-filemanager-toolbaritem name="Download"></e-filemanager-toolbaritem>
            <!-- Custom items -->
            <e-filemanager-toolbaritem name="Print" text="Print" prefixIcon="e-icons e-print" 
                tooltipText="Print files"></e-filemanager-toolbaritem>
            <e-filemanager-toolbaritem name="Archive" text="Archive" prefixIcon="e-icons e-zip-folder" 
                tooltipText="Create archive"></e-filemanager-toolbaritem>
            <e-filemanager-toolbaritem name="Share" text="Share" prefixIcon="e-icons e-share" 
                align="Right" tooltipText="Share selected items"></e-filemanager-toolbaritem>
        </e-filemanager-toolbaritems>
    </e-filemanager-toolbarsettings>
    <e-filemanager-ajaxsettings url="/FileManager/FileManager" uploadUrl="/FileManager/Upload" 
        downloadUrl="/FileManager/Download" getImageUrl="/FileManager/GetImage">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
    function onCustomToolbarClick(args) {
        var fileManager = document.getElementById('filemanager').ej2_instances[0];
        var selected = fileManager.getSelectedItems();
        var actionName = args.item.name;
        
        logAction(actionName, selected.length);
        
        switch(actionName) {
            case 'Print':
                printFiles(selected);
                break;
            case 'Archive':
                createArchive(selected);
                break;
            case 'Share':
                openShareDialog(selected);
                break;
        }
    }
    
    function logAction(action, count) {
        var log = document.getElementById('actionLog');
        var timestamp = new Date().toLocaleTimeString();
        var message = timestamp + ' - ' + action + ' (' + count + ' selected)<br/>';
        log.innerHTML = message + log.innerHTML.replace(/<strong>Action Log:<\/strong><br\/>/g, '');
    }
    
    function printFiles(selected) {
        console.log('Printing ' + selected.length + ' files');
        alert('Print: ' + selected.map(function(f) { return f.name; }).join(', '));
    }
    
    function createArchive(selected) {
        console.log('Creating archive with ' + selected.length + ' files');
        alert('Archive: ' + selected.map(function(f) { return f.name; }).join(', '));
    }
    
    function openShareDialog(selected) {
        console.log('Sharing ' + selected.length + ' files');
        alert('Share: ' + selected.map(function(f) { return f.name; }).join(', '));
    }
</script>
```

### Example 2: Conditional Toolbar (Read-Only vs Edit Mode)

**View Code (Index.cshtml)**:
```html
<div style="margin-bottom: 10px;">
    <label><input type="radio" name="mode" value="edit" checked onchange="switchMode()" />
        Edit Mode</label>
    <label style="margin-left: 20px;"><input type="radio" name="mode" value="readonly" onchange="switchMode()" />
        Read-Only Mode</label>
</div>

<div id="toolbarContainer"></div>

<script>
    function switchMode() {
        var mode = document.querySelector('input[name="mode"]:checked').value;
        var container = document.getElementById('toolbarContainer');
        
        var html;
        if (mode === 'readonly') {
            // Read-only toolbar - limited operations
            html = '<ejs-filemanager id="filemanager" allowMultiSelection="true">' +
                '<e-filemanager-toolbarsettings><e-filemanager-toolbaritems>' +
                '<e-filemanager-toolbaritem name="Download"></e-filemanager-toolbaritem>' +
                '<e-filemanager-toolbaritem name="Refresh"></e-filemanager-toolbaritem>' +
                '<e-filemanager-toolbaritem name="Search"></e-filemanager-toolbaritem>' +
                '</e-filemanager-toolbaritems></e-filemanager-toolbarsettings>' +
                '<e-filemanager-ajaxsettings url="/FileManager/FileManager" ' +
                'downloadUrl="/FileManager/Download" getImageUrl="/FileManager/GetImage">' +
                '</e-filemanager-ajaxsettings></ejs-filemanager>';
        } else {
            // Edit mode - full toolbar
            html = '<ejs-filemanager id="filemanager" allowMultiSelection="true">' +
                '<e-filemanager-toolbarsettings><e-filemanager-toolbaritems>' +
                '<e-filemanager-toolbaritem name="NewFolder"></e-filemanager-toolbaritem>' +
                '<e-filemanager-toolbaritem name="Upload"></e-filemanager-toolbaritem>' +
                '<e-filemanager-toolbaritem name="Delete"></e-filemanager-toolbaritem>' +
                '<e-filemanager-toolbaritem name="Rename"></e-filemanager-toolbaritem>' +
                '<e-filemanager-toolbaritem name="Download"></e-filemanager-toolbaritem>' +
                '<e-filemanager-toolbaritem name="Refresh"></e-filemanager-toolbaritem>' +
                '<e-filemanager-toolbaritem name="Search"></e-filemanager-toolbaritem>' +
                '</e-filemanager-toolbaritems></e-filemanager-toolbarsettings>' +
                '<e-filemanager-ajaxsettings url="/FileManager/FileManager" ' +
                'uploadUrl="/FileManager/Upload" downloadUrl="/FileManager/Download" ' +
                'getImageUrl="/FileManager/GetImage"></e-filemanager-ajaxsettings>' +
                '</ejs-filemanager>';
        }
        
        container.innerHTML = html;
        console.log('Switched to ' + mode + ' mode');
    }
    
    // Initialize on page load
    switchMode();
</script>
```

### Example 3: Context-Based Toolbar with Export Options

**View Code (Index.cshtml)**:
```html
<button type="button" onclick="exportAs('zip')" style="padding: 8px 12px; margin: 5px;">
    Export as ZIP
</button>
<button type="button" onclick="exportAs('tar')" style="padding: 8px 12px; margin: 5px;">
    Export as TAR
</button>
<button type="button" onclick="exportAs('csv')" style="padding: 8px 12px; margin: 5px;">
    Export List as CSV
</button>

<ejs-filemanager id="filemanager"
    allowMultiSelection="true"
    toolbarClick="onToolbarClick">
    <e-filemanager-toolbarsettings>
        <e-filemanager-toolbaritems>
            <e-filemanager-toolbaritem name="NewFolder"></e-filemanager-toolbaritem>
            <e-filemanager-toolbaritem name="Upload"></e-filemanager-toolbaritem>
            <e-filemanager-toolbaritem name="Delete"></e-filemanager-toolbaritem>
            <e-filemanager-toolbaritem name="Refresh"></e-filemanager-toolbaritem>
            <e-filemanager-toolbaritem name="Export" text="Export" prefixIcon="e-icons e-export" 
                align="Right"></e-filemanager-toolbaritem>
        </e-filemanager-toolbaritems>
    </e-filemanager-toolbarsettings>
    <e-filemanager-ajaxsettings url="/FileManager/FileManager" uploadUrl="/FileManager/Upload" 
        downloadUrl="/FileManager/Download" getImageUrl="/FileManager/GetImage">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
    function onToolbarClick(args) {
        if (args.item.name === 'Export') {
            console.log('Export toolbar item clicked');
        }
    }
    
    function exportAs(format) {
        var fileManager = document.getElementById('filemanager').ej2_instances[0];
        var files = fileManager.fileDetails;
        
        switch(format) {
            case 'zip':
                console.log('Exporting ' + files.length + ' files as ZIP');
                alert('Export as ZIP: ' + files.map(function(f) { return f.name; }).slice(0, 3).join(', ') + 
                    (files.length > 3 ? ' ...' : ''));
                break;
            case 'tar':
                console.log('Exporting ' + files.length + ' files as TAR');
                alert('Export as TAR: ' + files.map(function(f) { return f.name; }).slice(0, 3).join(', ') + 
                    (files.length > 3 ? ' ...' : ''));
                break;
            case 'csv':
                console.log('Exporting file list as CSV');
                var csv = 'Name,Size,Modified\n';
                files.forEach(function(file) {
                    csv += file.name + ',' + file.size + ',' + file.dateModified + '\n';
                });
                downloadCSV(csv);
                break;
        }
    }
    
    function downloadCSV(csv) {
        var blob = new Blob([csv], { type: 'text/csv' });
        var url = window.URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'files_export.csv';
        a.click();
    }
</script>
```

---

**Related Topics:**
- Context menu: See `context-menu.md`
- File operations: See `file-operations.md`
