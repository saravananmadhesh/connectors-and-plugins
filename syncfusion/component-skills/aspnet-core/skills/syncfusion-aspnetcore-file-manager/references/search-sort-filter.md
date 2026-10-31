# Search, Sorting, and Filtering Guide

## Table of Contents
- [Search Functionality](#search-functionality)
- [Search Configuration](#search-configuration)
- [Search Events](#search-events)
- [Sorting Files](#sorting-files)
- [Sort Order Configuration](#sort-order-configuration)
- [Filtering Operations](#filtering-operations)
- [Advanced Filtering](#advanced-filtering)
- [Case Sensitivity](#case-sensitivity)
- [Practical Examples](#practical-examples)

## Search Functionality

### Enable Search

**View Code (Index.cshtml)**:
```html
<ejs-filemanager id="filemanager">
    <e-filemanager-searchsettings
        allowSearchOnTyping="true"
        ignoreCase="true">
    </e-filemanager-searchsettings>
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>
```

### Search Bar Configuration

**View Code (Index.cshtml)**:
```html
<div id="searchResults" style="padding: 10px; background-color: #f5f5f5; margin-bottom: 10px;"></div>

<ejs-filemanager id="filemanager"
    search="onSearchComplete">
    <e-filemanager-searchsettings
        allowSearchOnTyping="true"
        ignoreCase="true"
        filterType="StartsWith">
    </e-filemanager-searchsettings>
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
    function onSearchComplete(args) {
        console.log('Search results:', args.files);
        
        var resultsDiv = document.getElementById('searchResults');
        var html = '<strong>Search Results: ' + args.files.length + ' files found</strong><br/>';
        args.files.forEach(function(file) {
            html += '<div>• ' + file.name + ' (' + formatBytes(file.size) + ')</div>';
        });
        resultsDiv.innerHTML = html;
    }
</script>
```

### Search Methods

**View Code (Index.cshtml)**:
```html
<input type="text" id="searchQuery" placeholder="Search for files" 
    style="padding: 8px; width: 300px; margin-right: 5px;" />
<button type="button" onclick="performSearch()" style="padding: 8px 16px; margin-bottom: 10px;">
    Search
</button>

<script>
    function performSearch() {
        var fileManager = document.getElementById('filemanager').ej2_instances[0];
        var query = document.getElementById('searchQuery').value;
        
        if (fileManager && query) {
            fileManager.search(query);
            console.log('Searching for: ' + query);
        }
    }
</script>
```

### Search Results Handling

**View Code (Index.cshtml)**:
```html
<ejs-filemanager id="filemanager" search="displayResults">
    <e-filemanager-searchsettings allowSearchOnTyping="true" ignoreCase="true">
    </e-filemanager-searchsettings>
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
    function displayResults(args) {
        console.log('Found files:', args.files.length);
        args.files.forEach(function(file) {
            console.log('- ' + file.name + ' (' + formatBytes(file.size) + ')');
        });
    }
</script>
```

## Search Configuration

### Filter Type Options

**View Code (Index.cshtml)**:
```html
<label style="margin-right: 10px;">Filter Type:</label>
<select id="filterType" onchange="updateFilterType()" style="padding: 8px; margin-right: 10px;">
    <option value="StartsWith">Starts With</option>
    <option value="EndsWith">Ends With</option>
    <option value="Contains">Contains</option>
</select>

<ejs-filemanager id="filemanager">
    <e-filemanager-searchsettings
        filterType="StartsWith"
        ignoreCase="true">
    </e-filemanager-searchsettings>
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
    function updateFilterType() {
        var fileManager = document.getElementById('filemanager').ej2_instances[0];
        var filterType = document.getElementById('filterType').value;
        fileManager.searchSettings.filterType = filterType;
        console.log('Filter type changed to: ' + filterType);
    }
</script>

**Filter Options (use PascalCase):**
- **StartsWith**: Query "doc" matches doc.pdf, document.txt (not "word doc")
- **EndsWith**: Query ".pdf" matches file.pdf, document.pdf (not "pdf-reader")
- **Contains**: Query "doc" matches document, word doc, mydoc.pdf (anywhere in name)
```

### Case Sensitivity

**View Code (Index.cshtml)**:
```html
<label style="margin-right: 10px;">Case Sensitivity:</label>
<input type="radio" name="caseSensitive" value="false" checked="checked" onchange="setCaseSensitivity()" /> 
Ignore Case (Case-insensitive)
<input type="radio" name="caseSensitive" value="true" onchange="setCaseSensitivity()" /> 
Match Case (Case-sensitive)

<ejs-filemanager id="filemanager">
    <e-filemanager-searchsettings ignoreCase="true">
    </e-filemanager-searchsettings>
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
    function setCaseSensitivity() {
        var fileManager = document.getElementById('filemanager').ej2_instances[0];
        var caseSensitive = document.querySelector('input[name="caseSensitive"]:checked').value === 'true';
        fileManager.searchSettings.ignoreCase = !caseSensitive;
        console.log('Case sensitive: ' + caseSensitive);
    }
</script>
```

### Search Scope

**View Code (Index.cshtml)**:
```html
<label style="margin-right: 10px;">Search Scope:</label>
<input type="radio" name="searchScope" value="inside" checked="checked" onchange="setSearchScope()" /> 
Current Folder Only
<input type="radio" name="searchScope" value="all" onchange="setSearchScope()" /> 
All Subfolders

<ejs-filemanager id="filemanager">
    <e-filemanager-searchsettings allowSearchOnTyping="true">
    </e-filemanager-searchsettings>
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
    function setSearchScope() {
        var fileManager = document.getElementById('filemanager').ej2_instances[0];
        var searchInside = document.querySelector('input[name="searchScope"]:checked').value === 'inside';
        fileManager.searchSettings.allowSearchInside = searchInside;
        console.log('Search inside: ' + searchInside);
    }
</script>
```

## Search Events

### Before Search Event

**View Code (Index.cshtml)**:
```html
<ejs-filemanager id="filemanager"
    search="validateSearchInput">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
    function validateSearchInput(args) {
        console.log('Search initiated');
        console.log('Query:', args.searchString);
        
        // Validate search term
        if (args.searchString.length < 2) {
            alert('Minimum 2 characters required');
            args.cancel = true;
        }
        
        // Track search analytics
        logSearchEvent(args.searchString);
    }
    
    function logSearchEvent(query) {
        // Send to server or track locally
        console.log('Search tracked:', query);
    }
</script>
```

### Search Complete Event

**View Code (Index.cshtml)**:
```html
<div id="searchMessage" style="padding: 10px; background-color: #f5f5f5; margin-bottom: 10px;"></div>

<ejs-filemanager id="filemanager"
    search="onSearchComplete">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
    function onSearchComplete(args) {
        console.log('Found ' + args.files.length + ' results');
        
        var messageDiv = document.getElementById('searchMessage');
        if (args.files.length === 0) {
            messageDiv.innerHTML = '<strong style="color: orange;">No files match your search</strong>';
        } else {
            var html = '<strong style="color: green;">Found ' + args.files.length + ' file(s):</strong><br/>';
            args.files.slice(0, 10).forEach(function(file) {
                html += '<div>• ' + file.name + '</div>';
            });
            if (args.files.length > 10) {
                html += '<div style="color: #666;">... and ' + (args.files.length - 10) + ' more</div>';
            }
            messageDiv.innerHTML = html;
        }
    }
</script>
```

## Sorting Files

### Sort Order Configuration

**View Code (Index.cshtml)**:
```html
<ejs-filemanager id="filemanager"
    sortOrder="Ascending"
    sortBy="name">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
    // Sort Order: 'Ascending' or 'Descending'
    // Sort By: 'name', 'modified', 'size', 'type'
</script>
```

### Sort Options

**View Code (Index.cshtml)**:
```html
<style>
    .sort-options {
        padding: 10px;
        background-color: #f5f5f5;
        margin-bottom: 10px;
    }
    .sort-options button {
        padding: 6px 12px;
        margin: 3px;
        cursor: pointer;
    }
    .sort-options button.active {
        background-color: #2196f3;
        color: white;
    }
</style>

<div class="sort-options">
    <button type="button" onclick="setSortOrder('name', 'Ascending')">Name A-Z</button>
    <button type="button" onclick="setSortOrder('name', 'Descending')">Name Z-A</button>
    <button type="button" onclick="setSortOrder('modified', 'Descending')">Newest First</button>
    <button type="button" onclick="setSortOrder('modified', 'Ascending')">Oldest First</button>
    <button type="button" onclick="setSortOrder('size', 'Descending')">Largest First</button>
    <button type="button" onclick="setSortOrder('type', 'Ascending')">By Type</button>
</div>

<script>
    function setSortOrder(sortBy, sortOrder) {
        var fileManager = document.getElementById('filemanager').ej2_instances[0];
        if (fileManager) {
            fileManager.sortBy = sortBy;
            fileManager.sortOrder = sortOrder;
            fileManager.refresh();
            console.log('Sort changed: ' + sortBy + ' (' + sortOrder + ')');
        }
    }
</script>
```

### Dynamic Sort

**View Code (Index.cshtml)**:
```html
<label style="margin-right: 10px;">Sort By:</label>
<select id="sortBySelect" onchange="updateSort()" style="padding: 8px; margin-right: 10px;">
    <option value="name">Name</option>
    <option value="modified">Date Modified</option>
    <option value="size">Size</option>
    <option value="type">Type</option>
</select>

<label style="margin-right: 10px;">Order:</label>
<select id="sortOrderSelect" onchange="updateSort()" style="padding: 8px; margin-bottom: 10px;">
    <option value="Ascending">Ascending</option>
    <option value="Descending">Descending</option>
</select>

<ejs-filemanager id="filemanager"
    sortBy="name"
    sortOrder="Ascending">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
    function updateSort() {
        var fileManager = document.getElementById('filemanager').ej2_instances[0];
        var sortBy = document.getElementById('sortBySelect').value;
        var sortOrder = document.getElementById('sortOrderSelect').value;
        
        if (fileManager) {
            fileManager.sortBy = sortBy;
            fileManager.sortOrder = sortOrder;
            fileManager.refresh();
            console.log('Sort: ' + sortBy + ' (' + sortOrder + ')');
        }
    }
</script>
```

## Filtering Operations

### Filter by File Extension

**View Code (Index.cshtml)**:
```html
<button type="button" onclick="filterByExtension(['pdf', 'doc', 'docx'])" style="padding: 8px 16px; margin: 3px;">
    Show Documents (PDF, DOC, DOCX)
</button>

<div id="filterResults" style="padding: 10px; background-color: #f5f5f5; margin-top: 10px;"></div>

<script>
    function filterByExtension(extensions) {
        const fileManager = document.getElementById('filemanager').ej2_instances[0];
        fileManager.filterFiles({
            filterType: 'Contains',
            searchString: '.pdf'
        });
    }
</script>
```

## Case Sensitivity

### Case-Sensitive Search

**View Code (Index.cshtml)**:
```html
<ejs-filemanager id="caseFilemanager"
    search="onSearchComplete">
    <e-filemanager-searchsettings
        allowSearchOnTyping="true"
        ignoreCase="false">
    </e-filemanager-searchsettings>
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<div id="caseSearchResults" style="padding: 10px; background-color: #fff3cd; margin-top: 10px;">
    <strong>Note:</strong> Search is case-sensitive<br/>
    "Document" matches only files starting with capital D<br/>
    "document" matches only files starting with lowercase d
</div>

<script>
    function onSearchComplete(args) {
        console.log('Case-sensitive search found: ' + args.files.length + ' files');
    }
</script>
```

### Case-Insensitive Search

**View Code (Index.cshtml)**:
```html
<ejs-filemanager id="filemanager"
    search="onSearchComplete">
    <e-filemanager-searchsettings
        allowSearchOnTyping="true"
        ignoreCase="true">
    </e-filemanager-searchsettings>
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<div id="searchResults" style="padding: 10px; background-color: #d1ecf1; margin-top: 10px;">
    <strong>Note:</strong> Search is case-insensitive (RECOMMENDED)<br/>
    Both "Document" and "document" match the same files<br/>
    This provides better user experience
</div>

<script>
    function onSearchComplete(args) {
        console.log('Case-insensitive search found: ' + args.files.length + ' files');
        
        var html = '<strong>Found ' + args.files.length + ' files:</strong><br/>';
        args.files.forEach(function(file) {
            html += '• ' + file.name + '<br/>';
        });
        document.getElementById('searchResults').innerHTML = html;
    }
</script>
```

### Search Case Configuration Control

**View Code (Index.cshtml)**:
```html
<div style="margin: 10px 0;">
    <label><input type="radio" name="caseOption" value="sensitive" onchange="switchCaseSensitivity()" />
        Case-Sensitive</label>
    <label style="margin-left: 20px;"><input type="radio" name="caseOption" value="insensitive" checked onchange="switchCaseSensitivity()" />
        Case-Insensitive (Recommended)</label>
</div>

<script>
    function switchCaseSensitivity() {
        var option = document.querySelector('input[name="caseOption"]:checked').value;
        
        // Destroy and recreate FileManager with new settings
        var fileManager = document.getElementById('filemanager');
        if (fileManager.ej2_instances) {
            fileManager.ej2_instances[0].destroy();
        }
        
        // Re-create with new case sensitivity setting
        var ignoreCase = option === 'insensitive';
        var FileManagerObj = new ej.filemanager.FileManager({
            ajaxSettings: {
                url: '/FileManager/FileManager',
                uploadUrl: '/FileManager/Upload',
                downloadUrl: '/FileManager/Download',
                getImageUrl: '/FileManager/GetImage'
            },
            searchSettings: {
                ignoreCase: ignoreCase,
                allowSearchInside: true,
                filterType: 'StartsWith'
            },
            allowSearching: true,
            height: '400px'
        });
        
        FileManagerObj.appendTo('#filemanager');
        console.log('Search case sensitivity set to: ' + (ignoreCase ? 'insensitive' : 'sensitive'));
    }
</script>
```

## Practical Examples

### Example 1: Advanced Search UI with Form

**View Code (Index.cshtml)**:
```html
<div style="border: 1px solid #ddd; padding: 20px; margin: 15px 0; background-color: #fafafa;">
    <h4>Advanced Search Form</h4>
    
    <label>Search Term:</label>
    <input type="text" id="searchTerm" placeholder="Enter search term" 
        style="padding: 8px; width: 250px; margin-right: 10px;" />
    
    <br style="margin: 10px 0;" />
    
    <label>File Type:</label>
    <select id="fileType" style="padding: 8px; width: 150px; margin-right: 10px;">
        <option value="">All Types</option>
        <option value="pdf">PDF</option>
        <option value="doc">Documents (DOC/DOCX)</option>
        <option value="jpg">Images (JPG/PNG/GIF)</option>
        <option value="xlsx">Spreadsheets (XLSX)</option>
    </select>
    
    <br style="margin: 10px 0;" />
    
    <label>Min Size (bytes):</label>
    <input type="number" id="minSize" value="0" style="padding: 8px; width: 150px; margin-right: 10px;" />
    
    <label>Max Size (bytes):</label>
    <input type="number" id="maxSize" value="1000000000" style="padding: 8px; width: 150px; margin-right: 10px;" />
    
    <br style="margin: 10px 0;" />
    
    <button type="button" onclick="applyAdvancedSearch()" style="padding: 10px 20px; margin: 10px 0;">
        Apply Search
    </button>
    <button type="button" onclick="resetSearchForm()" style="padding: 10px 20px; margin: 10px 5px; background-color: #f0f0f0;">
        Reset
    </button>
</div>

<div id="advancedSearchResults" style="padding: 15px; background-color: #f5f5f5; margin: 10px 0; display: none;"></div>

<script>
    function applyAdvancedSearch() {
        var fileManager = document.getElementById('filemanager').ej2_instances[0];
        if (!fileManager) return;
        
        var searchTerm = document.getElementById('searchTerm').value;
        var fileType = document.getElementById('fileType').value;
        var minSize = parseInt(document.getElementById('minSize').value) || 0;
        var maxSize = parseInt(document.getElementById('maxSize').value) || Infinity;
        
        var fileDetails = fileManager.fileDetails;
        var results = fileDetails.filter(function(file) {
            // Search term
            if (searchTerm && !file.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                return false;
            }
            
            // File type
            if (fileType) {
                var ext = file.name.split('.').pop().toLowerCase();
                if (ext !== fileType) return false;
            }
            
            // Size range
            var size = file.size || 0;
            if (size < minSize || size > maxSize) return false;
            
            return true;
        });
        
        var html = '<strong>Search Results: ' + results.length + ' files found</strong><br/>';
        results.slice(0, 10).forEach(function(file) {
            html += '<div>• ' + file.name + ' (' + formatBytes(file.size) + ', ' + 
                new Date(file.dateModified).toLocaleDateString() + ')</div>';
        });
        if (results.length > 10) {
            html += '<div style="margin-top: 5px;">... and ' + (results.length - 10) + ' more files</div>';
        }
        
        document.getElementById('advancedSearchResults').innerHTML = html;
        document.getElementById('advancedSearchResults').style.display = 'block';
    }
    
    function resetSearchForm() {
        document.getElementById('searchTerm').value = '';
        document.getElementById('fileType').value = '';
        document.getElementById('minSize').value = '0';
        document.getElementById('maxSize').value = '1000000000';
        document.getElementById('advancedSearchResults').style.display = 'none';
    }
</script>
```

### Example 2: Recent Files Finder

**View Code (Index.cshtml)**:
```html
<div style="border: 1px solid #ddd; padding: 15px; margin: 15px 0; background-color: #fafafa;">
    <label>Show recent files from last:</label>
    <select id="daysBack" onchange="findRecentFiles()" style="padding: 8px; width: 150px; margin-right: 10px;">
        <option value="1">1 Day</option>
        <option value="7" selected>7 Days</option>
        <option value="30">30 Days</option>
        <option value="90">90 Days</option>
    </select>
    
    <label style="margin-left: 20px;">Limit to first:</label>
    <select id="limitCount" onchange="findRecentFiles()" style="padding: 8px; width: 100px;">
        <option value="5">5</option>
        <option value="10" selected>10</option>
        <option value="20">20</option>
        <option value="50">50</option>
    </select>
</div>

<div id="recentFilesResults" style="padding: 15px; background-color: #e8f4f8; margin: 10px 0;"></div>

<script>
    function findRecentFiles() {
        var fileManager = document.getElementById('filemanager').ej2_instances[0];
        if (!fileManager) return;
        
        var daysBack = parseInt(document.getElementById('daysBack').value) || 7;
        var limit = parseInt(document.getElementById('limitCount').value) || 10;
        
        var cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - daysBack);
        
        var fileDetails = fileManager.fileDetails;
        var recentFiles = fileDetails
            .filter(function(file) {
                return new Date(file.dateModified) >= cutoffDate;
            })
            .sort(function(a, b) {
                return new Date(b.dateModified) - new Date(a.dateModified);
            })
            .slice(0, limit);
        
        var html = '<strong>Recent Files (Last ' + daysBack + ' days): ' + recentFiles.length + ' files</strong><br/>';
        recentFiles.forEach(function(file) {
            var date = new Date(file.dateModified).toLocaleDateString() + ' ' + 
                       new Date(file.dateModified).toLocaleTimeString();
            html += '<div>• ' + file.name + ' (' + formatBytes(file.size) + ') - ' + date + '</div>';
        });
        
        document.getElementById('recentFilesResults').innerHTML = html;
    }
    
    // Initialize on load
    setTimeout(findRecentFiles, 500);
</script>
```

### Example 3: Duplicate Files Finder

**View Code (Index.cshtml)**:
```html
<button type="button" onclick="findDuplicateFiles()" style="padding: 10px 20px; margin: 10px 0;">
    Find Duplicate Files
</button>

<div id="duplicateResults" style="padding: 15px; background-color: #ffe8e8; margin: 10px 0;"></div>

<script>
    function findDuplicateFiles() {
        var fileManager = document.getElementById('filemanager').ej2_instances[0];
        if (!fileManager) return;
        
        var fileDetails = fileManager.fileDetails;
        var nameMap = {};
        var duplicates = [];
        
        fileDetails.forEach(function(file) {
            if (nameMap[file.name]) {
                // Found a duplicate
                if (!duplicates.some(function(dup) { 
                    return dup.name === file.name; 
                })) {
                    duplicates.push(nameMap[file.name]);
                }
                duplicates.push(file);
            } else {
                nameMap[file.name] = file;
            }
        });
        
        if (duplicates.length === 0) {
            document.getElementById('duplicateResults').innerHTML = 
                '<div style="color: green;"><strong>No duplicate files found!</strong></div>';
            return;
        }
        
        // Group duplicates by name
        var groupedDuplicates = {};
        duplicates.forEach(function(file) {
            if (!groupedDuplicates[file.name]) {
                groupedDuplicates[file.name] = [];
            }
            groupedDuplicates[file.name].push(file);
        });
        
        var html = '<strong>Found ' + Object.keys(groupedDuplicates).length + ' duplicate file names:</strong><br/>';
        Object.keys(groupedDuplicates).forEach(function(name) {
            var group = groupedDuplicates[name];
            html += '<div style="margin-top: 10px; padding: 10px; background-color: #fff0f0; border-left: 3px solid #ff6b6b;">';
            html += '<strong>' + name + '</strong> (' + group.length + ' copies)<br/>';
            group.forEach(function(file) {
                html += '&nbsp;&nbsp;• Size: ' + formatBytes(file.size) + ', Modified: ' + 
                    new Date(file.dateModified).toLocaleDateString() + '<br/>';
            });
            html += '</div>';
        });
        
        document.getElementById('duplicateResults').innerHTML = html;
    }
</script>
```

---

**Related Topics:**
- Selection modes: See `selection-modes.md`
- File operations: See `file-operations.md`
