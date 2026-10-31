# Complete API Reference - Properties, Methods, and Events

## Table of Contents
1. [Properties](#properties)
2. [Methods](#methods)
3. [Events](#events)
4. [Type Definitions](#type-definitions)
5. [Complete Code Examples](#complete-code-examples)

---

## Properties

File Manager properties control initialization, display, and behavior:

### Essential Properties

#### ajaxSettings
**Type:** `AjaxSettingsModel`

Configures server communication endpoints for file operations:

**View Code (Index.cshtml)**:
```html
<ejs-filemanager id="filemanager">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager" 
        uploadUrl="/FileManager/Upload" 
        downloadUrl="/FileManager/Download" 
        getImageUrl="/FileManager/GetImage">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>
```

**Sub-properties:**
- `url` (string): Endpoint for read, create, delete, rename, search operations
- `uploadUrl` (string): Endpoint for file upload operations
- `downloadUrl` (string): Endpoint for file download
- `getImageUrl` (string): Endpoint for image/thumbnail retrieval

#### path
**Type:** `string`
**Default:** `'/'`

Sets the current directory path in the file manager:

```html
<ejs-filemanager id="filemanager" path="/Documents/Projects">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>
```

#### view
**Type:** `'LargeIcons' | 'Details'`
**Default:** `'LargeIcons'`

Sets the initial display view for files:

```html
<!-- Large icons view (thumbnail mode) -->
<ejs-filemanager id="filemanager" view="LargeIcons">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<!-- Details view (list mode with columns) -->
<ejs-filemanager id="filemanager" view="Details">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>
```

#### width
**Type:** `string | number`
**Default:** `'100%'`

Sets component width:

```html
<!-- Responsive width -->
<ejs-filemanager id="filemanager" width="100%">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<!-- Fixed pixels -->
<ejs-filemanager id="filemanager" width="800px">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>
```

#### height
**Type:** `string | number`
**Default:** `'400px'`

Sets component height:

```html
<ejs-filemanager id="filemanager" height="600px">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>
```

---

### File Operations Properties

#### allowDragAndDrop
**Type:** `boolean`
**Default:** `false`

Enables drag-and-drop functionality for files:

```html
<ejs-filemanager id="filemanager" allowDragAndDrop="true"
    fileDragStart="onFileDragStart"
    fileDropped="onFileDropped">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
function onFileDragStart(args) {
    console.log('Drag started:', args.fileDetails);
}

function onFileDropped(args) {
    console.log('File dropped:', args.fileDetails);
}
</script>
```

#### allowMultiSelection
**Type:** `boolean`
**Default:** `true`

Enables multiple file selection:

```html
<!-- Multiple selection (Ctrl+Click, Shift+Click) -->
<ejs-filemanager id="filemanager" allowMultiSelection="true">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<!-- Single selection only -->
<ejs-filemanager id="filemanager" allowMultiSelection="false">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>
```

#### enableRangeSelection
**Type:** `boolean`
**Default:** `false`

Enables mouse drag to select multiple files:

```html
<!-- Click and drag to select range -->
<ejs-filemanager id="filemanager" enableRangeSelection="true">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>
```

#### selectedItems
**Type:** `string[]`
**Default:** `[]`

Gets or sets the currently selected file/folder names:

```html
<!-- Set initial selection via JavaScript -->
<ejs-filemanager id="filemanager"
    created="onFileManagerCreated">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
function onFileManagerCreated(args) {
    // Set initial selection
    const fileManager = document.getElementById('filemanager').ej2_instances[0];
    fileManager.selectedItems = ['file1.pdf', 'file2.doc'];
}
</script>
```

---

### Upload Settings

#### uploadSettings
**Type:** `UploadSettingsModel`

Configures file upload behavior:

```html
<ejs-filemanager id="filemanager">
    <e-filemanager-uploadsettings autoUpload="true" 
        allowedExtensions=".jpg,.png,.pdf,.doc" 
        minFileSize="1024" 
        maxFileSize="5242880" 
        chunkSize="0" 
        directoryUpload="false" 
        sequentialUpload="false" 
        autoClose="false">
    </e-filemanager-uploadsettings>
    <e-filemanager-ajaxsettings uploadUrl="/FileManager/Upload">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>
```

**Sub-properties:**
- `autoUpload` (boolean): Auto-upload on file selection
- `allowedExtensions` (string): Comma-separated allowed extensions
- `minFileSize` (number): Minimum file size in bytes
- `maxFileSize` (number): Maximum file size in bytes
- `chunkSize` (number): Chunk size for large file uploads in bytes (0 = no chunking)
- `directoryUpload` (boolean): Enable folder upload
- `sequentialUpload` (boolean): Upload one file at a time
- `autoClose` (boolean): Close dialog after upload

---

### View & Display Properties

#### detailsViewSettings
**Type:** `DetailsViewSettingsModel`

Configures columns in Details view:

**View Code (Index.cshtml)**:
```html
<ejs-filemanager id="filemanager" view="Details">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
    <e-filemanager-detailsviewsettings>
        <e-filemanager-detailsviewsettings-columns>
            <e-detailsviewcolumn field="name" headerText="Name" minWidth="150" width="200"></e-detailsviewcolumn>
            <e-detailsviewcolumn field="_fm_modified" headerText="Date Modified" type="dateTime" minWidth="120" width="150"></e-detailsviewcolumn>
            <e-detailsviewcolumn field="size" headerText="Size" minWidth="90" width="120"></e-detailsviewcolumn>
        </e-filemanager-detailsviewsettings-columns>
    </e-filemanager-detailsviewsettings>
</ejs-filemanager>
```

#### largeIconsTemplate
**Type:** `string | function`

Custom template for large icons view with icon mapping and formatting:

**View Code (Index.cshtml)**:
```html
<ejs-filemanager id="filemanager"
    view="LargeIcons"
    largeIconsTemplate="#largeIconsTemplate">
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
    return '<div class="custom-icon-card">' +
        '<div class="file-header">' +
        '<div class="file-name" title="' + item.name + '">' + item.name + '</div>' +
        '</div>' +
        '<div class="' + iconClass + '"></div>' +
        '<div class="file-formattedDate">Created on ' + formattedDate + '</div>' +
        '</div>';
}

function getFileIconCssClass(item) {
    if (!item.isFile) return 'e-list-icon e-fe-folder';

    const extensionMap = {
        jpg: 'image',
        jpeg: 'image',
        png: 'image',
        gif: 'image',
        mp3: 'music',
        wav: 'music',
        mp4: 'video',
        avi: 'video',
        doc: 'doc',
        docx: 'docx',
        ppt: 'pptx',
        pptx: 'pptx',
        xls: 'xlsx',
        xlsx: 'xlsx',
        txt: 'txt',
        js: 'js',
        css: 'css',
        html: 'html',
        exe: 'exe',
        msi: 'msi',
        php: 'php',
        xml: 'xml',
        zip: 'zip',
        rar: 'rar',
        pdf: 'pdf'
    };

    const extension = (item.name.split('.').pop() || '').toLowerCase();
    const iconType = extensionMap[extension] || 'unknown';
    return 'e-list-icon e-fe-' + iconType;
}
</script>

<style>
.custom-icon-card {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 10px;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}

.file-header {
    display: contents;
    align-items: center;
    width: 100%;
    margin-bottom: 10px;
}

.file-name {
    font-size: 14px;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 110px;
}

.file-formattedDate {
    font-size: 12px;
    margin-top: 8px;
    text-align: center;
    font-weight: 600;
}

#filemanager .e-large-icons .e-list-item {
    height: 150px;
    width: 135px;
}
</style>
```

#### navigationPaneTemplate
**Type:** `string | function`

Custom template for navigation pane folder hierarchy:

**View Code (Index.cshtml)**:
```html
<ejs-filemanager id="filemanager"
    navigationPaneTemplate="#treeTemplate">
    <e-filemanager-navigationpanesettings visible="true" minWidth="240px" maxWidth="650px">
    </e-filemanager-navigationpanesettings>
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script id="treeTemplate" type="text/x-template">
    <div class="e-nav-pane-node" style="display: inline-flex; align-items: center;">
        <span class="folder-name" style="margin-left:8px;">${name}</span>
    </div>
</script>

<style>
.e-nav-pane-node {
    padding: 4px 8px;
    display: inline-flex;
    align-items: center;
    width: 100%;
}

.folder-name {
    font-size: 14px;
    color: #333;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.e-filemanager .e-navigation .e-treeview .e-text-content {
    padding: 8px 10px;
}

.e-filemanager .e-navigation .e-treeview .e-list-item {
    line-height: 32px;
}

.e-filemanager .e-navigation .e-treeview .e-list-item:hover {
    background-color: #f5f5f5;
}
</style>
```

#### showThumbnail
**Type:** `boolean`
**Default:** `true`

Display image thumbnails in large icons view:

```html
<!-- Show preview thumbnails -->
<ejs-filemanager id="filemanager" view="LargeIcons" showThumbnail="true">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager" 
        getImageUrl="/FileManager/GetImage">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>
```

#### showFileExtension
**Type:** `boolean`
**Default:** `true`

Display file extensions in file names:

```html
<!-- Show file extensions -->
<ejs-filemanager id="filemanager" showFileExtension="true">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>
<!-- Shows: "document.pdf" -->

<!-- Hide file extensions -->
<ejs-filemanager id="filemanager" showFileExtension="false">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>
<!-- Shows: "document" -->
```

#### showHiddenItems
**Type:** `boolean`
**Default:** `false`

Display hidden files and folders:

```html
<!-- Show hidden files and folders -->
<ejs-filemanager id="filemanager" showHiddenItems="true">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>
```

#### showItemCheckBoxes
**Type:** `boolean`
**Default:** `true`

Display checkboxes for file selection:

```html
<!-- Display checkboxes for selection -->
<ejs-filemanager id="filemanager" showItemCheckBoxes="true" allowMultiSelection="true">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>
```

---

### Toolbar & Context Menu Properties

#### toolbarSettings
**Type:** `ToolbarSettingsModel`

Configures toolbar:

**View Code (Index.cshtml)**:
```html
@{
    string[] toolbarItems = new string[] { "NewFolder", "Upload", "Cut", "Copy", "Paste", "Delete", "Download", "Rename", "SortBy", "Refresh", "Selection", "View", "Details" };
}

<ejs-filemanager id="filemanager">
    <e-filemanager-toolbarsettings items="@toolbarItems" visible="true">
    </e-filemanager-toolbarsettings>
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>
```

#### contextMenuSettings
**Type:** `ContextMenuSettingsModel`

Configures context menus:

**View Code (Index.cshtml)**:
```html
@{
    string[] fileMenu = new string[] { "Open", "|", "Cut", "Copy", "|", "Delete", "Rename", "|", "Details" };
    string[] folderMenu = new string[] { "Open", "|", "Cut", "Copy", "Paste", "|", "Delete", "Rename", "|", "Details" };
    string[] layoutMenu = new string[] { "SortBy", "View", "Refresh", "|", "Paste", "|", "NewFolder", "Upload", "|", "Details", "|", "SelectAll" };
}

<ejs-filemanager id="filemanager">
    <e-filemanager-contextmenusettings file="@fileMenu" folder="@folderMenu" layout="@layoutMenu" visible="true">
    </e-filemanager-contextmenusettings>
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>
```

#### navigationPaneSettings
**Type:** `NavigationPaneSettingsModel`

Configures left sidebar:

```html
<ejs-filemanager id="filemanager">
    <e-filemanager-navigationpanesettings visible="true" minWidth="240px" maxWidth="650px" sortOrder="None">
    </e-filemanager-navigationpanesettings>
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>
```

---

### Search & Sort Properties

#### searchSettings
**Type:** `SearchSettingsModel`

Configures search behavior:

```html
<ejs-filemanager id="filemanager">
    <e-filemanager-searchsettings allowSearchOnTyping="true" filterType="Contains" ignoreCase="true">
    </e-filemanager-searchsettings>
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>
```

#### sortBy
**Type:** `string`
**Default:** `'name'`

Sets initial sort field:

```html
<!-- Sort by name -->
<ejs-filemanager id="filemanager" sortBy="name">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<!-- Sort by file size -->
<ejs-filemanager id="filemanager" sortBy="size">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<!-- Sort by date modified -->
<ejs-filemanager id="filemanager" sortBy="_fm_modified">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>
```

#### sortOrder
**Type:** `'Ascending' | 'Descending' | 'None'`
**Default:** `'Ascending'`

Sets sort direction:

```html
<!-- Ascending order (A to Z) -->
<ejs-filemanager id="filemanager" sortOrder="Ascending">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<!-- Descending order (Z to A) -->
<ejs-filemanager id="filemanager" sortOrder="Descending">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>
```

#### sortComparer
**Type:** `function`

Custom sort comparator function:

```html
<ejs-filemanager id="filemanager"
                 height="380px"
                 sortComparer="naturalSortComparer">
    <e-filemanager-ajaxsettings 
        url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>

    <e-filemanager-detailsviewsettings>
        <e-filemanager-detailsview-columns>
            <e-filemanager-detailsview-column 
                field="name"
                headerText="File Name"
                minWidth="120"
                width="auto"
                sortComparer="naturalSortComparer">
            </e-filemanager-detailsview-column>

            <e-filemanager-detailsview-column 
                field="size"
                headerText="File Size"
                width="110">
            </e-filemanager-detailsview-column>

            <e-filemanager-detailsview-column 
                field="_fm_modified"
                headerText="Date Modified"
                width="190">
            </e-filemanager-detailsview-column>
        </e-filemanager-detailsview-columns>
    </e-filemanager-detailsviewsettings>
</ejs-filemanager>


<script>
    window.naturalSortComparer = function (x, y, isCaseSensitive) {
        const fileManager = document.getElementById('filemanager').ej2_instances[0];
        return fileManager.sortComparer(x, y, isCaseSensitive);
    };
</script>
```

---

### Customization Properties

#### cssClass
**Type:** `string`

Apply custom CSS class to component:

```html
<ejs-filemanager id="filemanager" cssClass="custom-file-manager">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>
```

#### locale
**Type:** `string`
**Default:** `'en-US'`

Set component language:

```html
<!-- Arabic -->
<ejs-filemanager id="filemanager" locale="ar-AE">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<!-- Spanish -->
<ejs-filemanager id="filemanager" locale="es-ES">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<!-- French -->
<ejs-filemanager id="filemanager" locale="fr-FR">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>
```

#### enableRtl
**Type:** `boolean`
**Default:** `false`

Enable right-to-left layout:

```html
<ejs-filemanager id="filemanager" locale="ar-AE" enableRtl="true">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>
```

---

### Advanced Properties

#### enableVirtualization
**Type:** `boolean`
**Default:** `false`

Enable virtual scrolling for large datasets:

```html
<ejs-filemanager id="filemanager" enableVirtualization="true" height="600px">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>
```

#### enablePersistence
**Type:** `boolean`
**Default:** `false`

Save user preferences across sessions:

```html
<ejs-filemanager id="filemanager" enablePersistence="true">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>
<!-- Persists: view, path, selectedItems -->
```

#### enableHtmlSanitizer
**Type:** `boolean`
**Default:** `true`

Enable HTML sanitization for security to prevent XSS attacks:

**View Code (Index.cshtml)**:
```html
<!-- HTML Sanitization Enabled (Default - Recommended) -->
<ejs-filemanager id="filemanager" enableHtmlSanitizer="true">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<!-- HTML Sanitization Disabled (Use with caution) -->
<ejs-filemanager id="filemanager" enableHtmlSanitizer="false">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>
```

**Best Practices**:
- Always keep `enableHtmlSanitizer="true"` in production
- Sanitize file names on both client and server
- Validate and sanitize custom template content
- Use Content Security Policy (CSP) headers for additional protection
- Never use `Html.Raw()` with user-supplied content in templates

#### fileSystemData
**Type:** `Array<Object>`
**Default:** `[]`

Local data array for flat data structure. Useful for binding local data without AJAX calls:

**View Code (Index.cshtml) - Basic Example**:
```html
@{
    var filesData = new object[] {
        new { 
            id = "1", 
            name = "Documents", 
            isFile = false, 
            hasChild = true, 
            type = "folder",
            dateModified = DateTime.Now,
            size = 0
        },
        new { 
            id = "2", 
            name = "Report.pdf", 
            isFile = true, 
            parentId = "1",
            type = "file",
            size = 123456,
            dateModified = DateTime.Now.AddDays(-5)
        },
        new { 
            id = "3", 
            name = "Images", 
            isFile = false, 
            hasChild = true, 
            type = "folder",
            dateModified = DateTime.Now,
            size = 0
        },
        new { 
            id = "4", 
            name = "photo.jpg", 
            isFile = true, 
            parentId = "3",
            type = "file",
            size = 2048576,
            dateModified = DateTime.Now.AddDays(-10)
        }
    };
}

<ejs-filemanager id="filemanager" 
    view="Details"
    fileSystemData="@filesData"
    rootAliasName="My Files">
    <e-filemanager-detailsviewsettings>
        <e-detailsviewsettings-columns>
            <e-detailsviewsettings-column field="name" headerText="File Name" width="200">
            </e-detailsviewsettings-column>
            <e-detailsviewsettings-column field="size" headerText="File Size" width="120">
            </e-detailsviewsettings-column>
            <e-detailsviewsettings-column field="dateModified" headerText="Date Modified" width="150">
            </e-detailsviewsettings-column>
        </e-detailsviewsettings-columns>
    </e-filemanager-detailsviewsettings>
</ejs-filemanager>
```

**View Code (Index.cshtml) - Advanced Example with Dynamic Data**:
```html
@{
    // Build hierarchical file system data from database or service
    var flatData = GetFlatFileSystemData();
}

<ejs-filemanager id="filemanager"
    view="LargeIcons"
    fileSystemData="@flatData"
    allowDragAndDrop="true"
    allowMultiSelection="true"
    showItemCheckBoxes="true"
    enablePersistence="true"
    largeIconsTemplate="#largeIconTemplate">
    
    <e-filemanager-uploadsettings autoUpload="true" 
        allowedExtensions=".jpg,.png,.pdf,.doc,.docx"
        maxFileSize="5242880">
    </e-filemanager-uploadsettings>
    
    <e-filemanager-detailsviewsettings>
        <e-detailsviewsettings-columns>
            <e-detailsviewsettings-column field="name" headerText="Name" width="200">
            </e-detailsviewsettings-column>
            <e-detailsviewsettings-column field="type" headerText="Type" width="100">
            </e-detailsviewsettings-column>
            <e-detailsviewsettings-column field="size" headerText="Size" width="120" template="#sizeTemplate">
            </e-detailsviewsettings-column>
            <e-detailsviewsettings-column field="dateModified" headerText="Modified" width="150">
            </e-detailsviewsettings-column>
        </e-detailsviewsettings-columns>
    </e-filemanager-detailsviewsettings>
</ejs-filemanager>

<script id="sizeTemplate" type="text/x-template">
    ${!isFile ? '' : formatBytes(size)}
</script>

<script id="largeIconTemplate" type="text/x-template">
    ${getLargeIconTemplate(data)}
</script>

<script>
function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

function getLargeIconTemplate(item) {
    const icon = item.isFile ? getFileIcon(item.type) : '📁';
    const size = formatBytes(item.size || 0);
    
    return '<div class="file-item" style="text-align: center; padding: 12px;">' +
        '<div style="font-size: 32px;">' + icon + '</div>' +
        '<div style="font-weight: 500; margin: 8px 0;">' + item.name + '</div>' +
        (item.isFile ? '<div style="font-size: 12px; color: #666;">' + size + '</div>' : '') +
        '</div>';
}

function getFileIcon(type) {
    const iconMap = {
        'pdf': '📄',
        'doc': '📝',
        'docx': '📝',
        'xls': '📊',
        'xlsx': '📊',
        'jpg': '🖼️',
        'jpeg': '🖼️',
        'png': '🖼️',
        'gif': '🖼️',
        'mp3': '🎵',
        'mp4': '🎬',
        'zip': '📦'
    };
    
    return iconMap[type?.toLowerCase()] || '📄';
}
</script>
```

**Controller Method - Generate Flat Data**:
```csharp
// Get flat file system data from service or database
public List<FileSystemItem> GetFlatFileSystemData()
{
    var flatData = new List<FileSystemItem>();
    
    // Root folders
    flatData.Add(new FileSystemItem
    {
        Id = "1",
        Name = "Documents",
        IsFile = false,
        HasChild = true,
        Type = "folder",
        DateModified = DateTime.Now,
        Size = 0,
        FilterPath = "/"
    });
    
    flatData.Add(new FileSystemItem
    {
        Id = "2",
        Name = "Images",
        IsFile = false,
        HasChild = true,
        Type = "folder",
        DateModified = DateTime.Now,
        Size = 0,
        FilterPath = "/"
    });
    
    // Files in Documents
    flatData.Add(new FileSystemItem
    {
        Id = "3",
        Name = "Report.pdf",
        IsFile = true,
        Type = "pdf",
        Size = 1024576,
        DateModified = DateTime.Now.AddDays(-5),
        FilterPath = "/Documents"
    });
    
    flatData.Add(new FileSystemItem
    {
        Id = "4",
        Name = "Proposal.docx",
        IsFile = true,
        Type = "docx",
        Size = 512000,
        DateModified = DateTime.Now.AddDays(-3),
        FilterPath = "/Documents"
    });
    
    // Files in Images
    flatData.Add(new FileSystemItem
    {
        Id = "5",
        Name = "photo.jpg",
        IsFile = true,
        Type = "jpg",
        Size = 2048000,
        DateModified = DateTime.Now.AddDays(-10),
        FilterPath = "/Images"
    });
    
    flatData.Add(new FileSystemItem
    {
        Id = "6",
        Name = "screenshot.png",
        IsFile = true,
        Type = "png",
        Size = 1024000,
        DateModified = DateTime.Now.AddDays(-7),
        FilterPath = "/Images"
    });
    
    return flatData;
}

public class FileSystemItem
{
    public string Id { get; set; }
    public string Name { get; set; }
    public bool IsFile { get; set; }
    public bool HasChild { get; set; }
    public string Type { get; set; }
    public long Size { get; set; }
    public DateTime DateModified { get; set; }
    public string FilterPath { get; set; }
}
```

**Example: Flat Data from Database**:
```csharp
[HttpGet]
[Route("GetFlatData")]
public IActionResult GetFlatData()
{
    try
    {
        // Build flat data from database
        var flatData = new List<FileSystemItem>();
        
        using (var context = new FileSystemContext())
        {
            // Get all files and folders from database
            var dbItems = context.FileSystemItems
                .OrderBy(f => f.IsFile ? 1 : 0)
                .ThenBy(f => f.Name)
                .ToList();
            
            foreach (var item in dbItems)
            {
                flatData.Add(new FileSystemItem
                {
                    Id = item.Id.ToString(),
                    Name = item.Name,
                    IsFile = item.IsFile,
                    HasChild = item.HasChild,
                    Type = item.Type,
                    Size = item.Size ?? 0,
                    DateModified = item.DateModified ?? DateTime.Now,
                    FilterPath = item.Path
                });
            }
        }
        
        return Ok(new { files = flatData });
    }
    catch (Exception ex)
    {
        return BadRequest(ex.Message);
    }
}

[HttpGet]
[Route("GetFlatDataByUser")]
public IActionResult GetFlatDataByUser(string userId)
{
    try
    {
        // Get flat data filtered by user
        var flatData = new List<FileSystemItem>();
        
        using (var context = new FileSystemContext())
        {
            var userFiles = context.FileSystemItems
                .Where(f => f.UserId == userId)
                .OrderBy(f => f.Path)
                .ThenBy(f => f.Name)
                .ToList();
            
            foreach (var file in userFiles)
            {
                flatData.Add(new FileSystemItem
                {
                    Id = file.Id.ToString(),
                    Name = file.Name,
                    IsFile = file.IsFile,
                    HasChild = file.Children?.Count > 0,
                    Type = file.Type,
                    Size = file.Size ?? 0,
                    DateModified = file.DateModified ?? DateTime.Now,
                    FilterPath = file.Path
                });
            }
        }
        
        return Ok(new { files = flatData });
    }
    catch (Exception ex)
    {
        return BadRequest(ex.Message);
    }
}
```

**Key Differences: AJAX vs FileSystemData**:

| Feature | AJAX Mode | FileSystemData Mode |
|---------|-----------|-------------------|
| Data Source | Server API calls | Local array |
| Performance | Better for large datasets | Better for smaller datasets |
| Pagination | Supported | Manual implementation |
| Real-time Updates | Yes (via API) | Manual refresh needed |
| Best Use Case | Remote file systems | Static/demo data, in-memory storage |
| Initial Load | Lazy loading | All data loaded upfront |

**Best Practices for Flat Data**:
- Use for demo/documentation purposes
- Use for smaller file systems (<1000 items)
- Consider AJAX mode for production with real file systems
- Always include parentId or filterPath for hierarchy
- Set hasChild correctly for folder expansion
- Format dates consistently using ISO 8601 format

#### rootAliasName
**Type:** `string`

Custom name for root folder:

```html
<ejs-filemanager id="filemanager" rootAliasName="My Files">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>
```

#### popupTarget
**Type:** `HTMLElement | string`

Target element for dialog rendering:

```html
<div id="dialogContainer"></div>

<ejs-filemanager id="filemanager" popupTarget="#dialogContainer">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>
```

---

## Methods

File Manager provides methods for programmatic control:

### Selection Methods

#### selectAll()

Selects all files in current directory:

```html
<ejs-filemanager id="filemanager">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
function selectAllAndLog() {
    const fileManager = document.getElementById('filemanager').ej2_instances[0];
    fileManager.selectAll();
    console.log('Selected:', fileManager.selectedItems.length);
}
</script>
```

#### clearSelection()

Deselects all files:

```html
<script>
function clearSelection() {
    const fileManager = document.getElementById('filemanager').ej2_instances[0];
    fileManager.clearSelection();
}
</script>
```

#### getSelectedFiles()

Returns array of selected file details:

```html
<script>
function getSelectedFiles() {
    const fileManager = document.getElementById('filemanager').ej2_instances[0];
    const selected = fileManager.getSelectedFiles();
    console.log('Selected files:', selected);
    // Returns: Array<{name, size, type, dateModified, ...}>
}

// Example: Calculate total size
function getTotalSize() {
    const fileManager = document.getElementById('filemanager').ej2_instances[0];
    const selected = fileManager.getSelectedFiles();
    return selected.reduce((sum, f) => sum + (f.size || 0), 0);
}
</script>
```

---

### Navigation Methods

#### traverseBackward()

Goes to parent directory:

```html
<script>
function goBack() {
    const fileManager = document.getElementById('filemanager').ej2_instances[0];
    fileManager.traverseBackward();
}
</script>
```

#### openFile(id: string)

Opens a file or navigates into a folder:

```html
<script>
function openFile(fileName) {
    const fileManager = document.getElementById('filemanager').ej2_instances[0];
    fileManager.openFile(fileName);
}
</script>
```

---

### File Operation Methods

#### createFolder(name?: string)

Creates a new folder:

```html
<ejs-filemanager id="filemanager">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
// Create with default dialog
function createFolder() {
    const fileManager = document.getElementById('filemanager').ej2_instances[0];
    fileManager.createFolder();
}

// Create with specific name
function createFolderWithName(name) {
    const fileManager = document.getElementById('filemanager').ej2_instances[0];
    fileManager.createFolder(name);
}

// Example: Create with validation
function createValidatedFolder(name) {
    if (isValidFolderName(name)) {
        const fileManager = document.getElementById('filemanager').ej2_instances[0];
        fileManager.createFolder(name);
    } else {
        alert('Invalid folder name');
    }
}
</script>
```

#### deleteFiles(ids?: string[])

Deletes files or folders:

```html
<script>
// Delete selected files with confirmation
function deleteSelectedFiles() {
    const fileManager = document.getElementById('filemanager').ej2_instances[0];
    fileManager.deleteFiles();
}

// Delete specific files
function deleteSpecificFiles(fileNames) {
    const fileManager = document.getElementById('filemanager').ej2_instances[0];
    fileManager.deleteFiles(fileNames);
}

// Example: Delete with audit log
function deleteWithAudit(fileNames) {
    fileNames.forEach(name => {
        logAuditEvent('DELETE', { file: name, timestamp: new Date() });
    });
    const fileManager = document.getElementById('filemanager').ej2_instances[0];
    fileManager.deleteFiles(fileNames);
}
</script>
```

#### renameFile(id?: string, name?: string)

Renames a file or folder:

```html
<script>
// Show rename dialog for selected file
function renameSelectedFile() {
    const fileManager = document.getElementById('filemanager').ej2_instances[0];
    fileManager.renameFile();
}

// Rename specific file
function renameFile(oldName, newName) {
    const fileManager = document.getElementById('filemanager').ej2_instances[0];
    fileManager.renameFile(oldName, newName);
}

// Example: Rename with validation
function renameWithValidation(oldName, newName) {
    if (!newName.includes('invalid-word')) {
        const fileManager = document.getElementById('filemanager').ej2_instances[0];
        fileManager.renameFile(oldName, newName);
    }
}
</script>
```

#### downloadFiles(ids?: string[])

Downloads files or folders:

```html
<button onclick="downloadSelectedFiles()">Download Selected</button>
<button onclick="downloadSpecificFiles()">Download Specific</button>

<script>
// Download selected files
function downloadSelectedFiles() {
    const fileManager = document.getElementById('filemanager').ej2_instances[0];
    fileManager.downloadFiles();
}

// Download specific files
function downloadSpecificFiles() {
    const fileManager = document.getElementById('filemanager').ej2_instances[0];
    fileManager.downloadFiles(['file1.pdf', 'file2.doc']);
}

// Example: Download multiple files as ZIP
function downloadSelectedAsZip() {
    const fileManager = document.getElementById('filemanager').ej2_instances[0];
    const selected = fileManager.getSelectedFiles();
    const names = selected.map(f => f.name);
    fileManager.downloadFiles(names);
}
</script>
```

#### uploadFiles()

Opens upload dialog:

```html
<button onclick="openUploadDialog()">Upload Files</button>

<ejs-filemanager id="filemanager">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager" uploadUrl="/FileManager/Upload">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
function openUploadDialog() {
    const fileManager = document.getElementById('filemanager').ej2_instances[0];
    fileManager.uploadFiles();
}
</script>
```

---

### Refresh Methods

#### refreshFiles()

Refreshes the current directory listing:

```html
<button onclick="refreshFiles()">Refresh</button>

<script>
function refreshFiles() {
    const fileManager = document.getElementById('filemanager').ej2_instances[0];
    fileManager.refreshFiles();
    console.log('Refreshing file list...');
}
</script>
```

#### refreshLayout()

Refreshes component layout:

```html
<script>
function refreshLayout() {
    const fileManager = document.getElementById('filemanager').ej2_instances[0];
    fileManager.refreshLayout();
}

// Refresh after window resize
window.addEventListener('resize', () => {
    const fileManager = document.getElementById('filemanager').ej2_instances[0];
    if (fileManager) {
        fileManager.refreshLayout();
    }
});
</script>
```

---

### Dialog Control Methods

#### closeDialog()

Closes open dialogs:

```html
<script>
function closeDialog() {
    const fileManager = document.getElementById('filemanager').ej2_instances[0];
    fileManager.closeDialog();
}
</script>
```

---

### Toolbar/Menu Methods

#### disableToolbarItems(items: string[])

Disables toolbar items:

```html
<script>
function disableToolbarItems() {
    const fileManager = document.getElementById('filemanager').ej2_instances[0];
    fileManager.disableToolbarItems(['Delete', 'Rename']);
}
</script>
```

#### enableToolbarItems(items: string[])

Enables toolbar items:

```html
<script>
function enableToolbarItems() {
    const fileManager = document.getElementById('filemanager').ej2_instances[0];
    fileManager.enableToolbarItems(['Delete', 'Rename']);
}
</script>
```

#### disableMenuItems(items: string[])

Disables context menu items:

```html
<script>
function disableMenuItems() {
    const fileManager = document.getElementById('filemanager').ej2_instances[0];
    fileManager.disableMenuItems(['Delete', 'Copy']);
}
</script>
```

#### enableMenuItems(items: string[])

Enables context menu items:

```html
<script>
function enableMenuItems() {
    const fileManager = document.getElementById('filemanager').ej2_instances[0];
    fileManager.enableMenuItems(['Delete', 'Copy']);
}
</script>
```

#### getToolbarItemIndex(item: string)

Gets toolbar item index:

```html
<script>
function getToolbarItemIndex() {
    const fileManager = document.getElementById('filemanager').ej2_instances[0];
    const index = fileManager.getToolbarItemIndex('Delete');
    console.log('Delete item index:', index);
}
</script>
```

#### getMenuItemIndex(item: string)

Gets context menu item index:

```html
<script>
function getMenuItemIndex() {
    const fileManager = document.getElementById('filemanager').ej2_instances[0];
    const index = fileManager.getMenuItemIndex('Delete');
    console.log('Delete item index:', index);
}
</script>
```

---

### Filter Methods

#### filterFiles(filterData?: object)

Applies custom filter:

```html
<script>
function filterFiles() {
    const fileManager = document.getElementById('filemanager').ej2_instances[0];
    fileManager.filterFiles({
        filterType: 'Contains',
        searchString: '.pdf'
    });
}
</script>
```

---

### Lifecycle Methods

#### destroy()

Destroys the component:

```html
<script>
function destroyFileManager() {
    const fileManager = document.getElementById('filemanager').ej2_instances[0];
    fileManager.destroy();
}
</script>
```

---

## Events

File Manager provides comprehensive events for tracking operations:

### File Operation Events

**View Code (Index.cshtml)**:
```html
<ejs-filemanager id="filemanager"
    beforeDelete="onBeforeDelete"
    delete="onDelete"
    beforeRename="onBeforeRename"
    rename="onRename"
    beforeFolderCreate="onBeforeFolderCreate"
    folderCreate="onFolderCreate"
    beforeMove="onBeforeMove"
    move="onMove">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
function onBeforeDelete(args) {
    console.log('Before delete:', args.fileDetails);
    // Set args.cancel = true to prevent deletion
}

function onDelete(args) {
    console.log('After delete:', args.fileDetails);
}

function onBeforeRename(args) {
    console.log('Before rename:', args.name, '->', args.newName);
}

function onRename(args) {
    console.log('After rename:', args.name);
}

function onBeforeFolderCreate(args) {
    console.log('Before create:', args.newFolderName);
}

function onFolderCreate(args) {
    console.log('Folder created:', args.fileDetails);
}

function onBeforeMove(args) {
    console.log('Before move:', args.fileDetails, '->', args.path);
}

function onMove(args) {
    console.log('After move:', args.fileDetails);
}
</script>
```

### Selection Events

```html
<ejs-filemanager id="filemanager"
    fileSelect="onFileSelect"
    fileSelection="onFileSelection">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
function onFileSelect(args) {
    console.log('File selected:', args.fileDetails);
    console.log('Normal selection:', args.isNormalSelection);
    console.log('Shift selection:', args.isShiftSelection);
    console.log('Ctrl selection:', args.isCtrlSelection);
}

function onFileSelection(args) {
    console.log('Selection changed');
}
</script>
```

### Search & Navigation Events

```html
<ejs-filemanager id="filemanager"
    search="onSearch"
    fileOpen="onFileOpen"
    fileLoad="onFileLoad">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
function onSearch(args) {
    console.log('Search:', args.searchString);
}

function onFileOpen(args) {
    console.log('Opening:', args.fileDetails);
}

function onFileLoad(args) {
    console.log('File loaded');
}
</script>
```

### Drag & Drop Events

```html
<ejs-filemanager id="filemanager"
    fileDragStart="onFileDragStart"
    fileDragging="onFileDragging"
    fileDragStop="onFileDragStop"
    fileDropped="onFileDropped">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
function onFileDragStart(args) {
    console.log('Drag started:', args.fileDetails);
}

function onFileDragging(args) {
    console.log('Dragging in progress');
}

function onFileDragStop(args) {
    console.log('Drag stopped, about to drop:', args.fileDetails);
}

function onFileDropped(args) {
    console.log('Files dropped:', args.fileDetails);
}
</script>
```

### Upload Events

```html
<ejs-filemanager id="filemanager"
    success="onUploadSuccess"
    failure="onUploadFailure"
    uploadListCreate="onUploadListCreate">
    <e-filemanager-uploadsettings autoUpload="true">
    </e-filemanager-uploadsettings>
    <e-filemanager-ajaxsettings uploadUrl="/FileManager/Upload">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
function onUploadSuccess(args) {
    console.log('Upload success:', args.response);
}

function onUploadFailure(args) {
    console.log('Upload failed:', args.error);
}

function onUploadListCreate(args) {
    console.log('Upload item:', args.fileDetails);
}
</script>
```

### AJAX Events

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
    console.log('Request:', args.action, args.path);
    // Customize headers
    if (args.ajaxSettings && args.ajaxSettings.beforeSend) {
        args.ajaxSettings.beforeSend = function(xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + getToken());
        };
    }
}

function onBeforeDownload(args) {
    console.log('Download:', args.fileDetails);
    args.useFormPost = false;
}

function onBeforeImageLoad(args) {
    console.log('Loading image:', args.fileDetails.name);
    args.useImageAsUrl = false;
}
</script>
```

### Dialog Events

```html
<ejs-filemanager id="filemanager"
    popupOpen="onPopupOpen"
    beforePopupOpen="onBeforePopupOpen"
    popupClose="onPopupClose"
    beforePopupClose="onBeforePopupClose">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
function onPopupOpen(args) {
    console.log('Dialog opening:', args.dialogType);
}

function onBeforePopupOpen(args) {
    console.log('Before dialog open');
    // Set args.cancel = true to prevent opening
}

function onPopupClose(args) {
    console.log('Dialog closed');
}

function onBeforePopupClose(args) {
    console.log('Before dialog close');
}
</script>
```

### UI Events

```html
<ejs-filemanager id="filemanager"
    toolbarClick="onToolbarClick"
    toolbarCreate="onToolbarCreate"
    menuClick="onMenuClick"
    menuOpen="onMenuOpen"
    menuClose="onMenuClose">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
function onToolbarClick(args) {
    console.log('Toolbar clicked:', args.item.name);
}

function onToolbarCreate(args) {
    console.log('Toolbar created');
}

function onMenuClick(args) {
    console.log('Menu clicked:', args.item.name);
}

function onMenuOpen(args) {
    console.log('Menu opening');
}

function onMenuClose(args) {
    console.log('Menu closing');
}
</script>
```

### Component Lifecycle

```html
<ejs-filemanager id="filemanager"
    created="onFileManagerCreated"
    destroyed="onFileManagerDestroyed">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
function onFileManagerCreated() {
    console.log('File Manager created');
}

function onFileManagerDestroyed() {
    console.log('File Manager destroyed');
}
</script>
```

---

## Complete Code Examples

### Example 1: Full-Featured File Manager with All Features

**Controller Code (FileManagerController.cs)**:
```csharp
using Microsoft.AspNetCore.Mvc;
using Syncfusion.EJ2.FileManager;

[ApiController]
[Route("api/[controller]")]
public class FileManagerController : ControllerBase
{
    private string basePath = "wwwroot/Files";
    
    [HttpGet("FileManager")]
    public IActionResult FileManager(string path, string searchString, string sortBy, string sortOrder)
    {
        try
        {
            string fullPath = Path.Combine(basePath, path?.TrimStart('/') ?? "");
            DirectoryInfo dir = new DirectoryInfo(fullPath);
            
            var files = new List<FileData>();
            
            // Get directories
            foreach (var subDir in dir.GetDirectories())
            {
                files.Add(new FileData
                {
                    Id = subDir.FullName,
                    Name = subDir.Name,
                    Type = "folder",
                    IsFile = false,
                    HasChild = subDir.GetFileSystemEntries().Length > 0,
                    Size = 0,
                    DateModified = subDir.LastWriteTime
                });
            }
            
            // Get files
            foreach (var file in dir.GetFiles())
            {
                files.Add(new FileData
                {
                    Id = file.FullPath,
                    Name = file.Name,
                    Type = file.Extension,
                    IsFile = true,
                    Size = file.Length,
                    DateModified = file.LastWriteTime
                });
            }
            
            return Ok(files);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
    
    [HttpPost("Upload")]
    public IActionResult Upload(IFormFile file, string path)
    {
        try
        {
            string uploadPath = Path.Combine(basePath, path?.TrimStart('/') ?? "");
            string filePath = Path.Combine(uploadPath, file.FileName);
            
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                file.CopyTo(stream);
            }
            
            return Ok(new { name = file.FileName, size = file.Length });
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}

public class FileData
{
    public string Id { get; set; }
    public string Name { get; set; }
    public string Type { get; set; }
    public bool IsFile { get; set; }
    public bool HasChild { get; set; }
    public long Size { get; set; }
    public DateTime DateModified { get; set; }
}
```

**View Code (Index.cshtml)**:
```html
@{
    string[] toolbarItems = new string[] { "NewFolder", "Upload", "Cut", "Copy", "Paste", "Delete", "Download", "Rename", "SortBy", "Refresh", "Selection", "View", "Details" };
    string[] fileMenu = new string[] { "Open", "|", "Cut", "Copy", "|", "Delete", "Rename", "|", "Download", "Details" };
    string[] folderMenu = new string[] { "Open", "|", "Cut", "Copy", "Paste", "|", "Delete", "Rename", "|", "Details" };
    string[] layoutMenu = new string[] { "SortBy", "View", "Refresh", "|", "Paste", "|", "NewFolder", "Upload", "|", "Details", "|", "SelectAll" };
    var columns = new object[] {
        new { field = "name", headerText = "Name", minWidth = 120, width = "200" },
        new { field = "_fm_modified", headerText = "Date Modified", type = "dateTime", minWidth = 120, width = "150" },
        new { field = "size", headerText = "Size", minWidth = 90, width = "120" }
    };
}

<div style="margin-bottom: 10px;">
    <button class="e-btn" onclick="selectAllFiles()">Select All</button>
    <button class="e-btn" onclick="deleteFiles()">Delete</button>
    <button class="e-btn" onclick="downloadFiles()">Download</button>
    <button class="e-btn" onclick="refreshFiles()">Refresh</button>
</div>

<ejs-filemanager id="filemanager"
    path="/"
    view="Details"
    width="100%"
    height="600px"
    allowDragAndDrop="true"
    allowMultiSelection="true"
    enableVirtualization="true"
    enablePersistence="true"
    showThumbnail="true"
    showFileExtension="true"
    showHiddenItems="false"
    showItemCheckBoxes="true"
    enableRtl="false"
    enableHtmlSanitizer="true"
    sortBy="name"
    sortOrder="Ascending"
    beforeSend="onBeforeSend"
    beforeDelete="onBeforeDelete"
    delete="onDelete"
    beforeFolderCreate="onBeforeFolderCreate"
    folderCreate="onFolderCreate"
    fileSelect="onFileSelect"
    success="onSuccess"
    failure="onFailure">
    
    <e-filemanager-uploadsettings autoUpload="true" 
        allowedExtensions=".jpg,.png,.pdf,.doc,.docx" 
        maxFileSize="5242880" 
        sequentialUpload="false">
    </e-filemanager-uploadsettings>
    
    <e-filemanager-toolbarsettings items="@toolbarItems" visible="true">
    </e-filemanager-toolbarsettings>
    
    <e-filemanager-contextmenusettings file="@fileMenu" folder="@folderMenu" layout="@layoutMenu" visible="true">
    </e-filemanager-contextmenusettings>
    
    <e-filemanager-navigationpanesettings visible="true" minWidth="240px" maxWidth="650px">
    </e-filemanager-navigationpanesettings>
    
    <e-filemanager-detailsviewsettings columns="@columns">
    </e-filemanager-detailsviewsettings>
    
    <e-filemanager-searchsettings allowSearchOnTyping="true" filterType="Contains" ignoreCase="true">
    </e-filemanager-searchsettings>
    
    <e-filemanager-ajaxsettings url="/api/FileManager/FileManager" 
        uploadUrl="/api/FileManager/Upload" 
        downloadUrl="/api/FileManager/Download" 
        getImageUrl="/api/FileManager/GetImage">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
function getToken() {
    return localStorage.getItem('authToken') || '';
}

function onBeforeSend(args) {
    console.log('Request:', args.action);
    if (args.action === 'download') {
        args.useFormPost = false;
    }
}

function onBeforeDelete(args) {
    console.log('Deleting:', args.fileDetails.map(f => f.name));
}

function onDelete(args) {
    console.log('Deleted successfully');
}

function onBeforeFolderCreate(args) {
    console.log('Creating folder:', args.newFolderName);
}

function onFolderCreate(args) {
    console.log('Folder created');
}

function onFileSelect(args) {
    console.log('Selected files:', args.fileDetails.length);
}

function onSuccess(args) {
    console.log('Operation success');
}

function onFailure(args) {
    console.log('Operation failed:', args.error);
}

function selectAllFiles() {
    const fileManager = document.getElementById('filemanager').ej2_instances[0];
    fileManager.selectAll();
}

function deleteFiles() {
    const fileManager = document.getElementById('filemanager').ej2_instances[0];
    const selected = fileManager.getSelectedFiles();
    if (selected.length > 0) {
        fileManager.deleteFiles(selected.map(f => f.name));
    }
}

function downloadFiles() {
    const fileManager = document.getElementById('filemanager').ej2_instances[0];
    fileManager.downloadFiles();
}

function refreshFiles() {
    const fileManager = document.getElementById('filemanager').ej2_instances[0];
    fileManager.refreshFiles();
}
</script>
```

---

## Type Definitions

### FileData Interface

```csharp
public class FileData
{
    public string Id { get; set; }
    public string Name { get; set; }
    public string Type { get; set; }
    public bool IsFile { get; set; }
    public bool HasChild { get; set; }
    public long Size { get; set; }
    public DateTime DateModified { get; set; }
}
```

### AjaxSettingsModel

Settings for AJAX communication:
- `url` (string): Main endpoint for CRUD operations
- `uploadUrl` (string): Upload endpoint
- `downloadUrl` (string): Download endpoint
- `getImageUrl` (string): Image thumbnail endpoint

### UploadSettingsModel

Settings for file upload:
- `autoUpload` (boolean): Auto-upload on file selection
- `minFileSize` (number): Minimum file size in bytes
- `maxFileSize` (number): Maximum file size in bytes
- `allowedExtensions` (string): Comma-separated allowed extensions
- `directoryUpload` (boolean): Enable folder upload
- `sequentialUpload` (boolean): Upload one file at a time
- `autoClose` (boolean): Close dialog after upload

---

**Related Documentation:**
- See `file-events.md` for detailed event handling patterns
- See `programmatic-methods.md` for advanced method usage
- See `getting-started.md` for basic setup