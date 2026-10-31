# File Manager Views and Display Modes

## Table of Contents
- [View Types Overview](#view-types-overview)
- [Details View](#details-view)
- [Large Icons View](#large-icons-view)
- [Grid View](#grid-view)
- [View Configuration](#view-configuration)
- [Switching Between Views](#switching-between-views)
- [Custom View Templates](#custom-view-templates)
- [Practical Examples](#practical-examples)

## View Types Overview

File Manager supports three primary display modes:

**Available Views:**
1. **Details View** - List with file details (name, size, date)
2. **Large Icons View** - Large thumbnail icons

### Default View Setup

**View Code (Index.cshtml)**:
```html
<!-- Details view (list with columns) -->
<ejs-filemanager id="filemanager" view="Details">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<!-- Large Icons view (thumbnail mode) -->
<ejs-filemanager id="filemanager" view="LargeIcons">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager"
        getImageUrl="/FileManager/GetImage">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>
```

## Details View

### Enable Details View

**View Code (Index.cshtml)**:
```html
<ejs-filemanager id="filemanager"
    view="Details"
    showFileExtension="true"
    showHiddenItems="false">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>
```

**Details View Features:**
- List layout with columns
- Shows: name, size, date modified, type
- Sortable columns (click header)
- Compact space-efficient display
- Best for large file lists

### Details View Configuration with Columns

**View Code (Index.cshtml)**:
```html
<ejs-filemanager id="filemanager"
    view="Details"
    showFileExtension="true"
    showHiddenItems="false"
    enablePersistence="true">
    <e-filemanager-detailsviewsettings>
        <e-detailsviewsettings-columns>
            <e-detailsviewsettings-column field="name" headerText="File Name" template="${name}">
            </e-detailsviewsettings-column>
            <e-detailsviewsettings-column field="size" headerText="File Size" template="#sizeColumnTemplate">
            </e-detailsviewsettings-column>
            <e-detailsviewsettings-column field="_fm_modified" headerText="Date Modified">
            </e-detailsviewsettings-column>
        </e-detailsviewsettings-columns>
    </e-filemanager-detailsviewsettings>
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script id="sizeColumnTemplate" type="text/x-template">
    <span>${formatBytes(size)}</span>
</script>

<script>
function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}
</script>
```

### Customize Columns with Custom Headers and Actions

**View Code (Index.cshtml)**:
```html
<ejs-filemanager id="filemanager"
    view="Details"
    enablePersistence="true">
    <e-filemanager-detailsviewsettings>
        <e-detailsviewsettings-columns>
            <e-detailsviewsettings-column field="name" headerText="File Name" template="${name}">
            </e-detailsviewsettings-column>
            <e-detailsviewsettings-column field="size" headerText="File Size" template="#sizeColumnTemplate">
            </e-detailsviewsettings-column>
            <e-detailsviewsettings-column field="_fm_modified" headerText="Date Modified">
            </e-detailsviewsettings-column>
            <e-detailsviewsettings-column headerText="Actions" template="#actionColumnTemplate">
            </e-detailsviewsettings-column>
        </e-detailsviewsettings-columns>
    </e-filemanager-detailsviewsettings>
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script id="sizeColumnTemplate" type="text/x-template">
    <span>${formatBytes(size)}</span>
</script>

<script id="actionColumnTemplate" type="text/x-template">
    <div class="action-buttons">
        <button class="e-btn e-small" onclick="downloadFile('${name}')">Download</button>
        <button class="e-btn e-small" onclick="shareFile('${name}')">Share</button>
    </div>
</script>

<script>
function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

function downloadFile(fileName) {
    console.log('Downloading:', fileName);
    const fileManager = document.getElementById('filemanager').ej2_instances[0];
    fileManager.downloadFiles([fileName]);
}

function shareFile(fileName) {
    console.log('Sharing:', fileName);
    // Implement share logic
}
</script>

<style>
.action-buttons {
    display: flex;
    gap: 8px;
}

.action-buttons .e-btn {
    padding: 4px 8px;
    font-size: 12px;
}
</style>
```

## Large Icons View

### Enable Large Icons View

**View Code (Index.cshtml)**:
```html
<ejs-filemanager id="filemanager"
    view="LargeIcons"
    showFileExtension="true">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager"
        getImageUrl="/FileManager/GetImage">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>
```

**Large Icons View Features:**
- Thumbnail display of files
- File name below thumbnail
- Good for visual content (images, videos)
- Requires more space
- Touch-friendly for mobile

### Large Icons Configuration with Custom Template

**View Code (Index.cshtml)**:
```html
<ejs-filemanager id="filemanager"
    view="LargeIcons"
    showFileExtension="true"
    largeIconsTemplate="#largeIconsTemplate"
    height="600px"
    enablePersistence="true">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager"
        getImageUrl="/FileManager/GetImage">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script id="largeIconsTemplate" type="text/x-template">
    ${getLargeIconsViewTemplateJSON(data)}
</script>

<script>
function getLargeIconsViewTemplateJSON(item) {
    const formattedDate = item.dateModified
        ? new Date(item.dateModified).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
        : '';
    const iconClass = getFileIconCssClass(item);
    const fileSize = formatBytes(item.size || 0);
    
    return '<div class="custom-file-icon">' +
        '<div class="' + iconClass + '" style="font-size: 32px;"></div>' +
        '<div class="file-name" title="' + item.name + '">' + item.name + '</div>' +
        '<div class="file-size">' + fileSize + '</div>' +
        '<div class="file-date">' + formattedDate + '</div>' +
        '</div>';
}

function getFileIconCssClass(item) {
    if (!item.isFile) return 'e-list-icon e-fe-folder';

    const extensionMap = {
        jpg: 'image',
        jpeg: 'image',
        png: 'image',
        gif: 'image',
        pdf: 'pdf',
        doc: 'doc',
        docx: 'docx',
        xls: 'xlsx',
        xlsx: 'xlsx',
        txt: 'txt',
        zip: 'zip'
    };

    const extension = (item.name.split('.').pop() || '').toLowerCase();
    const iconType = extensionMap[extension] || 'unknown';
    return 'e-list-icon e-fe-' + iconType;
}

function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}
</script>

<style>
.custom-file-icon {
    padding: 12px;
    text-align: center;
    border: 1px solid #ddd;
    border-radius: 4px;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.file-name {
    font-size: 13px;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 110px;
    margin-top: 8px;
}

.file-size {
    font-size: 11px;
    color: #666;
    margin-top: 4px;
}

.file-date {
    font-size: 10px;
    color: #999;
    margin-top: 4px;
}
</style>
```

## Grid View

### Enable Grid View

**View Code (Index.cshtml)**:
```html
<ejs-filemanager id="filemanager"
    view="Details"
    height="600px">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>
```

**Grid View Features:**
- Grid/table layout
- Column-based display
- Customizable columns
- Sortable and filterable
- Good for data-heavy displays

## View Configuration

### Show/Hide File Extensions

**View Code (Index.cshtml)**:
```html
<!-- Show file extensions -->
<ejs-filemanager id="filemanager"
    view="Details"
    showFileExtension="true">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<!-- Hide file extensions -->
<ejs-filemanager id="filemanager"
    view="Details"
    showFileExtension="false">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>
```

### Show/Hide Hidden Files

**View Code (Index.cshtml)**:
```html
<!-- Show hidden files (starting with .) -->
<ejs-filemanager id="filemanager"
    view="Details"
    showHiddenItems="true">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<!-- Hide hidden files (default) -->
<ejs-filemanager id="filemanager"
    view="Details"
    showHiddenItems="false">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>
```

## Switching Between Views

### View Switching UI

**View Code (Index.cshtml)**:
```html
<div style="margin-bottom: 15px;">
    <button class="e-btn" onclick="switchToDetailsView()">Details View</button>
    <button class="e-btn" onclick="switchToIconsView()">Icons View</button>
    <button class="e-btn" onclick="switchToGridView()">Grid View</button>
</div>

<ejs-filemanager id="filemanager"
    view="Details"
    enablePersistence="true"
    created="onFileManagerCreated">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager"
        getImageUrl="/FileManager/GetImage">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
function onFileManagerCreated(args) {
    // enablePersistence="true" automatically saves view, path, and selection
    const fileManager = document.getElementById('filemanager').ej2_instances[0];
    console.log('File Manager created with persistence enabled');
}

function switchToDetailsView() {
    const fileManager = document.getElementById('filemanager').ej2_instances[0];
    fileManager.view = 'Details';
    localStorage.setItem('fileManagerView', 'Details');
}

function switchToIconsView() {
    const fileManager = document.getElementById('filemanager').ej2_instances[0];
    fileManager.view = 'LargeIcons';
    localStorage.setItem('fileManagerView', 'LargeIcons');
}

function switchToGridView() {
    const fileManager = document.getElementById('filemanager').ej2_instances[0];
    fileManager.view = 'Details'; // Grid uses Details view in ASP.NET Core
    localStorage.setItem('fileManagerView', 'Details');
}
</script>
```

### Programmatic View Change with Event Handling

**View Code (Index.cshtml)**:
```html
<button class="e-btn e-primary" onclick="toggleViewMode()">
    Toggle View
</button>

<ejs-filemanager id="filemanager"
    view="Details"
    enablePersistence="true"
    created="onFileManagerCreated">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
let currentView = 'Details';

function onFileManagerCreated(args) {
    const fileManager = document.getElementById('filemanager').ej2_instances[0];
    currentView = fileManager.view || 'Details';
}

function toggleViewMode() {
    const fileManager = document.getElementById('filemanager').ej2_instances[0];
    
    if (currentView === 'Details') {
        fileManager.view = 'LargeIcons';
        currentView = 'LargeIcons';
        console.log('Switched to LargeIcons view');
    } else {
        fileManager.view = 'Details';
        currentView = 'Details';
        console.log('Switched to Details view');
    }
    
    // enablePersistence="true" automatically saves the view change
}
</script>
```

### View Persistence with enablePersistence

**View Code (Index.cshtml)**:
```html
<!-- enablePersistence automatically saves and restores: -->
<!-- - Current view (Details/LargeIcons) -->
<!-- - Current path/directory -->
<!-- - Selected items -->
<!-- - Sort order -->

<ejs-filemanager id="filemanager"
    view="Details"
    enablePersistence="true"
    created="onFileManagerCreated">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
function onFileManagerCreated(args) {
    const fileManager = document.getElementById('filemanager').ej2_instances[0];
    
    // Get current state (restored automatically by enablePersistence)
    console.log('Current view:', fileManager.view);
    console.log('Current path:', fileManager.path);
    console.log('Selected items:', fileManager.selectedItems);
}

// Note: With enablePersistence="true", all user preferences are 
// automatically saved to browser localStorage and restored on page reload
</script>
```

## Custom View Templates

### File Item Template for Details View

**View Code (Index.cshtml)**:
```html
<ejs-filemanager id="filemanager"
    view="Details"
    enablePersistence="true">
    <e-filemanager-detailsviewsettings>
        <e-detailsviewsettings-columns>
            <e-detailsviewsettings-column field="name" headerText="File Name" template="${name}">
            </e-detailsviewsettings-column>
            <e-detailsviewsettings-column field="size" headerText="File Size" template="#sizeColumnTemplate">
            </e-detailsviewsettings-column>
            <e-detailsviewsettings-column field="_fm_modified" headerText="Date Modified">
            </e-detailsviewsettings-column>
            <e-detailsviewsettings-column headerText="Actions" template="#actionColumnTemplate">
            </e-detailsviewsettings-column>
        </e-detailsviewsettings-columns>
    </e-filemanager-detailsviewsettings>
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script id="sizeColumnTemplate" type="text/x-template">
    <span>${formatBytes(size)}</span>
</script>

<script id="actionColumnTemplate" type="text/x-template">
    <button class="e-btn e-small" onclick="previewFile('${name}')">Preview</button>
</script>

<script>
function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

function previewFile(fileName) {
    console.log('Previewing:', fileName);
}
</script>

<style>
/* Custom styling for file items */
.e-filemanager .e-grid .e-row {
    padding: 8px 0;
}

.e-filemanager .e-grid .e-row:hover {
    background-color: #f5f5f5;
}

.e-filemanager .e-grid .e-btn {
    padding: 4px 8px;
}
</style>
```

### Large Icons Custom Template

**View Code (Index.cshtml)**:
```html
<ejs-filemanager id="filemanager"
    view="LargeIcons"
    largeIconsTemplate="#largeIconsTemplate"
    height="600px">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager"
        getImageUrl="/FileManager/GetImage">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script id="largeIconsTemplate" type="text/x-template">
    ${getLargeIconsCustomTemplate(data)}
</script>

<script>
function getLargeIconsCustomTemplate(item) {
    const itemCount = item.isFile ? '' : (item.fileCount || 0) + ' items';
    const iconClass = item.isFile ? 'e-list-icon e-fe-file' : 'e-list-icon e-fe-folder';
    
    return '<div class="custom-file-card">' +
        '<div class="' + iconClass + '" style="font-size: 48px;"></div>' +
        '<div class="file-name">' + item.name + '</div>' +
        (itemCount ? '<div class="file-count">' + itemCount + '</div>' : '') +
        '</div>';
}
</script>

<style>
.custom-file-card {
    padding: 12px;
    text-align: center;
    border: 1px solid #ddd;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
}

.file-name {
    font-size: 13px;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 110px;
    margin-top: 8px;
}

.file-count {
    font-size: 11px;
    color: #666;
    margin-top: 4px;
}

.custom-file-card:hover {
    background-color: #f9f9f9;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
</style>
```

## Practical Examples

### Example 1: Responsive View Based on Screen Size

**View Code (Index.cshtml)**:
```html
<ejs-filemanager id="filemanager"
    view="Details"
    enablePersistence="true"
    created="onFileManagerCreated">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager"
        getImageUrl="/FileManager/GetImage">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
function onFileManagerCreated(args) {
    const fileManager = document.getElementById('filemanager').ej2_instances[0];
    
    function handleResize() {
        const width = window.innerWidth;
        
        if (width < 768) {
            // Mobile: Use Large Icons
            fileManager.view = 'LargeIcons';
        } else if (width < 1200) {
            // Tablet: Use Details
            fileManager.view = 'Details';
        } else {
            // Desktop: Use Details
            fileManager.view = 'Details';
        }
    }
    
    // Initial call
    handleResize();
    
    // Listen for resize events
    window.addEventListener('resize', handleResize);
}
</script>
```

### Example 2: View Switcher with Custom Styling

**View Code (Index.cshtml)**:
```html
<div style="margin-bottom: 15px;">
    <select id="viewSelector" onchange="changeView(this.value)">
        <option value="Details">Details View</option>
        <option value="LargeIcons">Large Icons</option>
    </select>
</div>

<ejs-filemanager id="filemanager"
    view="Details"
    enablePersistence="true"
    created="onFileManagerCreated">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager"
        getImageUrl="/FileManager/GetImage">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<style>
/* Details View Styling */
.e-filemanager .e-list-item {
    padding: 12px;
    border-bottom: 1px solid #eee;
}

.e-filemanager .e-list-item:hover {
    background-color: #f5f5f5;
    transition: background-color 0.2s ease;
}

/* Large Icons View Styling */
.e-filemanager .e-large-icons .e-list-item {
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 12px;
    text-align: center;
}

.e-filemanager .e-large-icons .e-list-item:hover {
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    transform: translateY(-2px);
}
</style>

<script>
function changeView(newView) {
    const fileManager = document.getElementById('filemanager').ej2_instances[0];
    fileManager.view = newView;
    localStorage.setItem('preferredView', newView);
}

function onFileManagerCreated(args) {
    const savedView = localStorage.getItem('preferredView') || 'Details';
    const fileManager = document.getElementById('filemanager').ej2_instances[0];
    fileManager.view = savedView;
    document.getElementById('viewSelector').value = savedView;
}
</script>
```

### Example 3: Smart View Selection Based on Content

**Controller Code (FileManagerController.cs)**:
```csharp
[HttpGet]
[Route("GetViewSuggestion")]
public IActionResult GetViewSuggestion(string path)
{
    try
    {
        // Analyze folder content
        var directory = new DirectoryInfo(path);
        var files = directory.GetFiles();
        
        // Count file types
        var imageCount = files.Count(f => 
            new[] { ".jpg", ".jpeg", ".png", ".gif", ".bmp" }
            .Contains(Path.GetExtension(f.Name).ToLower()));
        
        // Recommend view based on content
        string recommendedView = "Details";
        
        if (imageCount > (files.Length * 0.7)) {
            recommendedView = "LargeIcons";
        } else if (files.Length > 100) {
            recommendedView = "Details";
        }
        
        return Ok(new { view = recommendedView });
    }
    catch
    {
        return Ok(new { view = "Details" });
    }
}
```

**View Code (Index.cshtml)**:
```html
<ejs-filemanager id="filemanager"
    view="Details"
    enablePersistence="true"
    created="onFileManagerCreated">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager"
        getImageUrl="/FileManager/GetImage">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
function onFileManagerCreated(args) {
    const fileManager = document.getElementById('filemanager').ej2_instances[0];
    
    // Get suggested view from server based on content
    fetch('/FileManager/GetViewSuggestion?path=' + fileManager.path)
        .then(r => r.json())
        .then(data => {
            // Note: enablePersistence="true" will automatically save the selected view
            fileManager.view = data.view;
            console.log('Smart view selected:', data.view);
        });
}
</script>
```

---

**Related Topics:**
- Layout customization: See `layouts-customization.md`
- File operations: See `file-operations.md`
