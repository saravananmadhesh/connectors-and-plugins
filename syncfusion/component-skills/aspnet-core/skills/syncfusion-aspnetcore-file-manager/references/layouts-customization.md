# Layouts and Template Customization

## Table of Contents
- [Layout System Overview](#layout-system-overview)
- [Navigation Pane](#navigation-pane)
- [Breadcrumb Navigation](#breadcrumb-navigation)
- [Custom Templates](#custom-templates)
- [Layout Configuration](#layout-configuration)
- [Responsive Layouts](#responsive-layouts)
- [Practical Examples](#practical-examples)

## Layout System Overview

File Manager provides customizable layout components for navigation and display:

**Layout Components:**
1. **Navigation Pane** - Left sidebar with folder tree
2. **Breadcrumb** - Path navigation at top
3. **File Grid** - Main content area
4. **Status Bar** - File information display
5. **Custom Areas** - Developer-defined layouts

## Navigation Pane

### Enable Navigation Pane

```html
<ejs-filemanager id="filemanager">
    <e-filemanager-navigationpanesettings visible="true" width="300px" maxWidth="400px">
    </e-filemanager-navigationpanesettings>
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>
```

### Navigation Pane Features

```html
<ejs-filemanager id="filemanager">
    <e-filemanager-navigationpanesettings visible="true" 
        width="280px" 
        maxWidth="500px" 
        allowResizing="true">
    </e-filemanager-navigationpanesettings>
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>
```

### Customize Tree Items

```html
<ejs-filemanager id="filemanager" navigationPaneTemplate="#treeTemplate">
    <e-filemanager-navigationpanesettings visible="true">
    </e-filemanager-navigationpanesettings>
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script id="treeTemplate" type="text/x-template">
    <div class="custom-tree-item" style="display: flex; align-items: center; gap: 8px;">
        <i class="e-icons e-folder"></i>
        <span class="tree-name">${name}</span>
        ${itemCount !== undefined ? '<span class="item-count">(' + itemCount + ')</span>' : ''}
    </div>
</script>

<style>
.custom-tree-item {
    padding: 4px 8px;
    border-radius: 3px;
    cursor: pointer;
    transition: background-color 0.2s ease;
}

.custom-tree-item:hover {
    background-color: #f0f0f0;
}

.tree-name {
    font-size: 13px;
    color: #333;
}

.item-count {
    font-size: 11px;
    color: #666;
    margin-left: auto;
}
</style>
```

## Custom Templates

### Large Icons Template

```html
<ejs-filemanager id="filemanager" 
    view="LargeIcons"
    largeIconsTemplate="#customLargeIconsTemplate">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager" 
        getImageUrl="/FileManager/GetImage">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script id="customLargeIconsTemplate" type="text/x-template">
    ${getCustomFileTemplate(data)}
</script>

<script>
function getCustomFileTemplate(item) {
    const fileSize = formatBytes(item.size);
    const fileDate = item.dateModified ? formatDate(item.dateModified) : '';
    const fileIcon = getFileType(item.name);
    
    return '<div class="custom-file-item">' +
        '<div class="file-icon"><i class="icon-' + fileIcon + '"></i></div>' +
        '<div class="file-info">' +
        '<div class="file-name" title="' + item.name + '">' + item.name + '</div>' +
        '<div class="file-meta">' + fileSize + ' · ' + fileDate + '</div>' +
        '</div>' +
        '<div class="file-actions">' +
        '<button onclick="shareFile(\'' + item.name + '\')">Share</button>' +
        '<button onclick="downloadFile(\'' + item.name + '\')">Download</button>' +
        '</div>' +
        '</div>';
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

function getFileType(fileName) {
    const ext = fileName.split('.').pop().toLowerCase();
    const typeMap = {
        'doc': 'doc', 'docx': 'doc', 'pdf': 'pdf', 'xls': 'xls', 'xlsx': 'xls',
        'ppt': 'ppt', 'pptx': 'ppt', 'jpg': 'image', 'jpeg': 'image', 'png': 'image',
        'gif': 'image', 'mp3': 'audio', 'mp4': 'video', 'txt': 'text', 'zip': 'zip'
    };
    return typeMap[ext] || 'file';
}

function shareFile(fileName) {
    console.log('Share file:', fileName);
}

function downloadFile(fileName) {
    console.log('Download file:', fileName);
}
</script>

<style>
.custom-file-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 12px;
    gap: 8px;
    text-align: center;
    border-radius: 6px;
    transition: background-color 0.2s ease;
}

.custom-file-item:hover {
    background-color: #f5f5f5;
}

.file-icon {
    font-size: 32px;
    color: #4CAF50;
}

.file-name {
    font-size: 13px;
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
}

.file-meta {
    font-size: 11px;
    color: #999;
}

.file-actions {
    display: flex;
    gap: 6px;
}

.file-actions button {
    padding: 4px 8px;
    font-size: 11px;
    border: 1px solid #ddd;
    border-radius: 3px;
    cursor: pointer;
    background-color: #fff;
    transition: all 0.2s ease;
}

.file-actions button:hover {
    background-color: #e8f5e9;
    border-color: #4CAF50;
    color: #4CAF50;
}
</style>
```

### Folder Item Template

For folders in large icons view, customize using `largeIconsTemplate` for all items:

```html
<ejs-filemanager id="filemanager" 
    view="LargeIcons"
    largeIconsTemplate="#customFolderTemplate">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager" 
        getImageUrl="/FileManager/GetImage">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script id="customFolderTemplate" type="text/x-template">
    ${getFolderTemplate(data)}
</script>

<script>
function getFolderTemplate(item) {
    const icon = item.isFile ? 'e-icons e-file' : 'e-icons e-folder';
    const stats = !item.isFile ? (item.fileCount || 0) + ' items' : formatBytes(item.size || 0);
    
    return '<div class="custom-folder-card">' +
        '<div class="folder-preview"><i class="' + icon + '"></i></div>' +
        '<div class="folder-name">' + item.name + '</div>' +
        '<div class="folder-stats">' + stats + '</div>' +
        '</div>';
}
</script>

<style>
.custom-folder-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 12px;
    text-align: center;
    border: 1px solid #ddd;
    border-radius: 6px;
    background-color: #fafafa;
    transition: all 0.2s ease;
}

.custom-folder-card:hover {
    border-color: #2196F3;
    background-color: #e3f2fd;
    box-shadow: 0 2px 8px rgba(33, 150, 243, 0.2);
}

.folder-preview {
    font-size: 36px;
    color: #2196F3;
}

.folder-name {
    font-size: 13px;
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
}

.folder-stats {
    font-size: 11px;
    color: #666;
}
</style>
```

## Layout Configuration

### Full Layout Setup

```html
<ejs-filemanager id="filemanager" 
    view="Details"
    showFileExtension="true"
    showHiddenItems="false">
    <e-filemanager-navigationpanesettings visible="true" width="250px">
    </e-filemanager-navigationpanesettings>
    <e-filemanager-detailsviewsettings>
        <e-detailsviewsettings-columns>
            <e-detailsviewsettings-column field="name" headerText="Name" width="200">
            </e-detailsviewsettings-column>
            <e-detailsviewsettings-column field="_fm_modified" headerText="Date Modified" width="150">
            </e-detailsviewsettings-column>
            <e-detailsviewsettings-column field="size" headerText="Size" width="120">
            </e-detailsviewsettings-column>
        </e-detailsviewsettings-columns>
    </e-filemanager-detailsviewsettings>
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>
```

### Minimal Layout

```html
<!-- Hide extra UI elements for compact view -->
<ejs-filemanager id="filemanager">
    <e-filemanager-navigationpanesettings visible="false">
    </e-filemanager-navigationpanesettings>
    <e-filemanager-toolbarsettings items="Upload,Download">
    </e-filemanager-toolbarsettings>
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>
```

## Responsive Layouts

### Mobile-Responsive Layout

```html
<ejs-filemanager id="filemanager" 
    view="Details"
    created="onFileManagerCreated">
    <e-filemanager-navigationpanesettings visible="true" width="250px">
    </e-filemanager-navigationpanesettings>
    <e-filemanager-toolbarsettings items="NewFolder,Upload,Download,Delete,Refresh">
    </e-filemanager-toolbarsettings>
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
function handleResponsiveLayout() {
    const fileManager = document.getElementById('filemanager').ej2_instances[0];
    const isMobile = window.innerWidth < 768;
    
    // Update navigation pane visibility
    fileManager.navigationPaneSettings.visible = !isMobile;
    fileManager.navigationPaneSettings.width = isMobile ? '100%' : '250px';
    
    // Update view type
    fileManager.view = isMobile ? 'LargeIcons' : 'Details';
    
    // Update toolbar items
    const toolbarItems = isMobile 
        ? ['Upload', 'Download', 'Delete']
        : ['NewFolder', 'Upload', 'Download', 'Delete', 'Refresh'];
    fileManager.toolbarSettings.items = toolbarItems;
    
    // Show/hide breadcrumb
    fileManager.showBreadcrumb = !isMobile;
}

function onFileManagerCreated(args) {
    handleResponsiveLayout();
}

// Listen for window resize
window.addEventListener('resize', handleResponsiveLayout);
</script>
```

### Tablet Layout

```html
<!-- Good balance for tablet view -->
<ejs-filemanager id="filemanager" view="Details">
    <e-filemanager-navigationpanesettings visible="true" width="200px">
    </e-filemanager-navigationpanesettings>
    <e-filemanager-detailsviewsettings>
        <e-detailsviewsettings-columns>
            <e-detailsviewsettings-column field="name" headerText="Name" width="150">
            </e-detailsviewsettings-column>
            <e-detailsviewsettings-column field="size" headerText="Size" width="100">
            </e-detailsviewsettings-column>
        </e-detailsviewsettings-columns>
    </e-filemanager-detailsviewsettings>
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>
```

## Practical Examples

### Example 1: Advanced Custom Layout

```html
<div class="file-manager-layout">
    <div class="sidebar">
        <ejs-filemanager id="filemanager">
            <e-filemanager-navigationpanesettings visible="true" width="250px">
            </e-filemanager-navigationpanesettings>
            <e-filemanager-detailsviewsettings>
                <e-detailsviewsettings-columns>
                    <e-detailsviewsettings-column field="name" headerText="Name" width="200">
                    </e-detailsviewsettings-column>
                    <e-detailsviewsettings-column field="size" headerText="Size" width="120">
                    </e-detailsviewsettings-column>
                </e-detailsviewsettings-columns>
            </e-filemanager-detailsviewsettings>
            <e-filemanager-ajaxsettings url="/FileManager/FileManager">
            </e-filemanager-ajaxsettings>
        </ejs-filemanager>
    </div>
    
    <div class="main-content">
        <div class="breadcrumb-area" id="breadcrumbArea">
            <!-- Breadcrumb displayed by component -->
        </div>
        
        <div class="file-grid">
            <!-- File display handled by component -->
        </div>
        
        <div class="status-area" id="statusArea">
            <!-- Status information displayed by component -->
        </div>
    </div>
</div>

<script>
let currentPath = '/';
</script>

<style>
.file-manager-layout {
    display: flex;
    height: 100vh;
}

.sidebar {
    flex: 0 0 250px;
    border-right: 1px solid #eee;
    overflow-y: auto;
}

.main-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.breadcrumb-area {
    flex: 0 0 auto;
    border-bottom: 1px solid #eee;
}

.file-grid {
    flex: 1;
    overflow-y: auto;
}

.status-area {
    flex: 0 0 auto;
    border-top: 1px solid #eee;
}
</style>
```

### Example 2: Collapsible Navigation

```html
<div class="collapsible-layout">
    <button id="toggleNavBtn" onclick="toggleNavigation()">◀</button>
    
    <div id="navPanel" class="nav-panel">
        <ejs-filemanager id="filemanager">
            <e-filemanager-navigationpanesettings visible="true" width="250px">
            </e-filemanager-navigationpanesettings>
            <e-filemanager-ajaxsettings url="/FileManager/FileManager">
            </e-filemanager-ajaxsettings>
        </ejs-filemanager>
    </div>
</div>

<script>
let navOpen = true;

function toggleNavigation() {
    navOpen = !navOpen;
    const navPanel = document.getElementById('navPanel');
    const toggleBtn = document.getElementById('toggleNavBtn');
    
    if (navOpen) {
        navPanel.style.width = '250px';
        toggleBtn.textContent = '◀';
    } else {
        navPanel.style.width = '0';
        toggleBtn.textContent = '▶';
    }
}
</script>

<style>
.collapsible-layout {
    display: flex;
    height: 100vh;
}

#toggleNavBtn {
    flex: 0 0 auto;
    width: 40px;
    border: none;
    background-color: #f5f5f5;
    border-right: 1px solid #eee;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.2s ease;
}

#toggleNavBtn:hover {
    background-color: #efefef;
}

.nav-panel {
    flex: 0 0 250px;
    width: 250px;
    overflow: hidden;
    transition: width 0.3s ease;
    border-right: 1px solid #eee;
}
</style>
```

### Example 3: Dark Mode Layout

```html
<div class="dark-theme">
    <ejs-filemanager id="filemanager"
        navigationPaneTemplate="#darkTreeTemplate">
        <e-filemanager-navigationpanesettings visible="true">
        </e-filemanager-navigationpanesettings>
        <e-filemanager-detailsviewsettings>
            <e-detailsviewsettings-columns>
                <e-detailsviewsettings-column field="name" headerText="Name" width="200">
                </e-detailsviewsettings-column>
                <e-detailsviewsettings-column field="size" headerText="Size" width="120">
                </e-detailsviewsettings-column>
            </e-detailsviewsettings-columns>
        </e-filemanager-detailsviewsettings>
        <e-filemanager-ajaxsettings url="/FileManager/FileManager">
        </e-filemanager-ajaxsettings>
    </ejs-filemanager>
</div>

<script id="darkTreeTemplate" type="text/x-template">
    <div class="dark-tree-item" style="display: flex; align-items: center; gap: 8px;">
        <i class="e-icons e-folder"></i>
        <span>${name}</span>
    </div>
</script>

<style>
.dark-theme {
    background-color: #1e1e1e;
    color: #ffffff;
    height: 100vh;
    overflow: hidden;
}

.dark-theme .e-filemanager {
    background-color: #1e1e1e;
    color: #ffffff;
}

.dark-theme .e-filemanager-header {
    background-color: #252526;
    border-bottom-color: #333;
}

.dark-theme .e-breadcrumb {
    background-color: #252526;
    border-bottom-color: #333;
}

.dark-theme .e-navigation {
    background-color: #252526;
    border-right-color: #333;
}

.dark-theme .e-list-item {
    border-color: #333;
    color: #ffffff;
}

.dark-theme .e-list-item:hover {
    background-color: #2d2d2d;
    border-color: #404040;
}

.dark-theme .e-list-item.e-active {
    background-color: #0e639c;
}

.dark-theme .e-treeview .e-text-content {
    color: #ffffff;
}

.dark-theme .e-treeview .e-fullrow:hover {
    background-color: #2d2d2d;
}

.dark-theme .dark-tree-item {
    color: #ffffff;
    padding: 4px 8px;
}

.dark-theme .e-statusbar {
    background-color: #252526;
    border-top-color: #333;
    color: #ffffff;
}

.dark-theme .e-input {
    background-color: #3c3c3c;
    color: #ffffff;
    border-color: #404040;
}

.dark-theme .e-btn {
    background-color: #0e639c;
    color: #ffffff;
    border-color: #0e639c;
}

.dark-theme .e-btn:hover {
    background-color: #1177bb;
    border-color: #1177bb;
}
</style>
```

---

**Related Topics:**
- Views and display modes: See `views-overview.md`
- Navigation: See `getting-started.md`
