# Getting Started with File Manager Component

## Table of Contents
- [Installation and Setup](#installation-and-setup)
- [Basic Initialization](#basic-initialization)
- [AJAX Settings Configuration](#ajax-settings-configuration)
- [Component Dimensions](#component-dimensions)
- [Initial View Configuration](#initial-view-configuration)
- [Initial Path Setup](#initial-path-setup)
- [State Persistence](#state-persistence)
- [RTL Support](#rtl-support)
- [Locale and Internationalization](#locale-and-internationalization)
- [Quick Reference Examples](#quick-reference-examples)

## Installation and Setup

The Syncfusion File Manager component is part of the Essential Studio for ASP.NET Core package. Install via NuGet Package Manager.

### NuGet Installation

Install `Syncfusion.EJ2.AspNet.Core` via NuGet Package Manager or CLI:

```bash
# .NET CLI
dotnet add package Syncfusion.EJ2.AspNet.Core

# Package Manager Console
Install-Package Syncfusion.EJ2.AspNet.Core -Version {{ site.releaseversion }}
```

### CSS Setup

Include the required Syncfusion theme in your layout file (`_Layout.cshtml`):

```html
<!-- In the <head> section -->
<link rel="stylesheet" href="url" />
```

**Available Themes:**
- fluent.css - Fluent design theme (default)
- material.css - Material design theme
- bootstrap.css - Bootstrap theme
- fabric.css - Fabric design theme

### TagHelper Registration

Register Syncfusion TagHelper in `_ViewImports.cshtml`:

```html
@addTagHelper *, Syncfusion.EJ2
```

### Script Setup

Add Syncfusion scripts to your layout file (`_Layout.cshtml`):

```html
<!-- Before closing </body> tag -->
<script src="url"></script>
<ejs-scripts></ejs-scripts>
```

#### Important: PhysicalFileProvider is Bundled

**Do NOT install a separate NuGet package for `PhysicalFileProvider`.** The `PhysicalFileProvider` class is **already included** in `Syncfusion.EJ2.AspNet.Core`. 

You only need to add the using statement in your controller:

```csharp
using Syncfusion.EJ2.FileManager.PhysicalFileProvider;
```

If you encounter a compile error like "cannot find namespace PhysicalFileProvider", ensure:
1. `Syncfusion.EJ2.AspNet.Core` is installed (`dotnet list package` to verify)
2. You have the correct `using` statement above
3. Run `dotnet restore` to update package metadata if needed

### License Registration

Register your Syncfusion license key in `Program.cs`:

```csharp
using Syncfusion.Licensing;

var builder = WebApplication.CreateBuilder(args);

// Add Syncfusion license
Syncfusion.Licensing.SyncfusionLicenseProvider.RegisterLicense("YOUR_LICENSE_KEY");

builder.Services.AddControllersWithViews();
var app = builder.Build();
app.Run();
```

## Basic Initialization

The most basic File Manager setup requires only the component with AJAX settings pointing to your file provider endpoint.

### Controller Code

**C# (FileManagerController.cs)**:
```csharp
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Text.Json;
using WebApplication4.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Cors;
using Syncfusion.EJ2.FileManager.Base;
using Syncfusion.EJ2.FileManager.PhysicalFileProvider;

namespace WebApplication4.Controllers
{
    [Route("[controller]")]
    public class HomeController : Controller
    {
        public PhysicalFileProvider operation;
        public string basePath;
        string root = "wwwroot\\Files";

        public HomeController(IWebHostEnvironment hostingEnvironment)
        {
            this.basePath = hostingEnvironment.ContentRootPath;
            this.operation = new PhysicalFileProvider();
            this.operation.RootFolder(this.basePath + "\\" + this.root);
        }
        [Route("FileOperations")]
        public object FileOperations([FromBody] FileManagerDirectoryContent args)
        {
            var fullPath = (this.basePath + "\\" + this.root + args.Path).Replace("/", "\\");
            if (args.Action == "delete" || args.Action == "rename")
            {
                if ((args.TargetPath == null) && (args.Path == ""))
                {
                    FileManagerResponse response = new FileManagerResponse();
                    response.Error = new ErrorDetails { Code = "401", Message = "Restricted to modify the root folder." };
                    return this.operation.ToCamelCase(response);
                }
            }
            switch (args.Action)
            {
                case "read":
                    // reads the file(s) or folder(s) from the given path.
                    return this.operation.ToCamelCase(this.operation.GetFiles(args.Path, args.ShowHiddenItems));
                case "delete":
                    // deletes the selected file(s) or folder(s) from the given path.
                    return this.operation.ToCamelCase(this.operation.Delete(args.Path, args.Names));
                case "copy":
                    // copies the selected file(s) or folder(s) from a path and then pastes them into a given target path.
                    return this.operation.ToCamelCase(this.operation.Copy(args.Path, args.TargetPath, args.Names, args.RenameFiles, args.TargetData));
                case "move":
                    // cuts the selected file(s) or folder(s) from a path and then pastes them into a given target path.
                    return this.operation.ToCamelCase(this.operation.Move(args.Path, args.TargetPath, args.Names, args.RenameFiles, args.TargetData));
                case "details":
                    // gets the details of the selected file(s) or folder(s).
                    return this.operation.ToCamelCase(this.operation.Details(args.Path, args.Names, args.Data));
                case "create":
                    // creates a new folder in a given path.
                    return this.operation.ToCamelCase(this.operation.Create(args.Path, args.Name));
                case "search":
                    // gets the list of file(s) or folder(s) from a given path based on the searched key string.
                    return this.operation.ToCamelCase(this.operation.Search(args.Path, args.SearchString, args.ShowHiddenItems, args.CaseSensitive));
                case "rename":
                    // renames a file or folder.
                    return this.operation.ToCamelCase(this.operation.Rename(args.Path, args.Name, args.NewName, false, args.ShowFileExtension, args.Data));
            }
            return null;
        }

        // uploads the file(s) into a specified path
        [Route("Upload")]
        [DisableRequestSizeLimit]
        public IActionResult Upload(string path, long size, IList<IFormFile> uploadFiles, string action)
        {
            try
            {
                FileManagerResponse uploadResponse;
                foreach (var file in uploadFiles)
                {
                    var folders = (file.FileName).Split('/');
                    // checking the folder upload
                    if (folders.Length > 1)
                    {
                        for (var i = 0; i < folders.Length - 1; i++)
                        {
                            string newDirectoryPath = Path.Combine(this.basePath + path, folders[i]);
                            if (Path.GetFullPath(newDirectoryPath) != (Path.GetDirectoryName(newDirectoryPath) + Path.DirectorySeparatorChar + folders[i]))
                            {
                                throw new UnauthorizedAccessException("Access denied for Directory-traversal");
                            }
                            if (!Directory.Exists(newDirectoryPath))
                            {
                                this.operation.ToCamelCase(this.operation.Create(path, folders[i]));
                            }
                            path += folders[i] + "/";
                        }
                    }
                }
                uploadResponse = operation.Upload(path, uploadFiles, action, size, null);
                if (uploadResponse.Error != null)
                {
                    Response.Clear();
                    Response.ContentType = "application/json; charset=utf-8";
                    Response.StatusCode = Convert.ToInt32(uploadResponse.Error.Code);
                    Response.HttpContext.Features.Get<IHttpResponseFeature>().ReasonPhrase = uploadResponse.Error.Message;
                }
            }
            catch (Exception e)
            {
                ErrorDetails er = new ErrorDetails();
                er.Message = e.Message.ToString();
                er.Code = "417";
                er.Message = "Access denied for Directory-traversal";
                Response.Clear();
                Response.ContentType = "application/json; charset=utf-8";
                Response.StatusCode = Convert.ToInt32(er.Code);
                Response.HttpContext.Features.Get<IHttpResponseFeature>().ReasonPhrase = er.Message;
                return Content("");
            }
            return Content("");
        }

        // downloads the selected file(s) and folder(s)
        [Route("Download")]
        public IActionResult Download(string downloadInput)
        {
            var options = new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
            };
            FileManagerDirectoryContent args = JsonSerializer.Deserialize<FileManagerDirectoryContent>(downloadInput, options);
            return operation.Download(args.Path, args.Names, args.Data);
        }

        // gets the image(s) from the given path
        [Route("GetImage")]
        public IActionResult GetImage(FileManagerDirectoryContent args)
        {
            return this.operation.GetImage(args.Path, args.Id, false, null, null);
        }
    }
}
```

### Razor View Code

**Basic Initialization (Index.cshtml)**:
```html
<ejs-filemanager id="filemanager">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>
```

**Default Behavior:**
- View: LargeIcons (shows folders and files as icons)
- Height: 400px
- Width: 100%
- Path: /
- Drag & Drop: Disabled by default
- Multi-Selection: Enabled by default
- Persistence: Disabled by default

## AJAX Settings Configuration

The `ajaxSettings` property configures how the File Manager communicates with your backend service. This is essential for all file operations.

### Configuration Example with All Endpoints

**Razor View (Index.cshtml)**:
```html
<ejs-filemanager id="filemanager">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager"
        uploadUrl="/FileManager/Upload"
        downloadUrl="/FileManager/Download"
        getImageUrl="/FileManager/GetImage">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>
```

### ASP.NET Core Controller Setup

**C# (FileManagerController.cs)**:
```csharp
using Microsoft.AspNetCore.Mvc;
using Syncfusion.EJ2.FileManager;

public class FileManagerController : Controller
{
    // Main endpoint for read, create, delete, rename, copy, move, search operations
    [HttpPost]
    public IActionResult FileManager(string action, string path)
    {
        // Handle different actions: read, create, delete, rename, copy, move, search, details
        if (action == "read")
        {
            // Read directory contents
            return GetFiles(path);
        }
        else if (action == "create")
        {
            // Create new folder
            return CreateFolder(path);
        }
        // Handle other operations...
        
        return Ok();
    }
    
    // Endpoint specifically for file uploads
    [HttpPost]
    public IActionResult Upload(string path)
    {
        var files = Request.Form.Files;
        // Process uploaded files
        return Ok();
    }
    
    // Endpoint for file downloads
    [HttpPost]
    public IActionResult Download(string path, string[] names)
    {
        // Prepare files for download
        return Ok();
    }
    
    // Endpoint for retrieving image previews
    [HttpPost]
    public IActionResult GetImage(string path)
    {
        // Return image preview
        return Ok();
    }
}
```

### AJAX Request/Response Behavior

**How the File Manager communicates:**

1. **Read Operation**: Requests file list by sending action="read" and path
   ```
   Request: POST /api/FileManager
   Body: { action: 'read', path: '/', showHiddenItems: false }
   ```

2. **Create Folder**: Sends action="create" with folder name
   ```
   Request: POST /api/FileManager
   Body: { action: 'create', path: '/', name: 'NewFolder' }
   ```

3. **Delete Files**: Sends action="delete" with file names
   ```
   Request: POST /api/FileManager
   Body: { action: 'delete', path: '/', names: ['file.txt'] }
   ```

4. **Upload Files**: Sends to uploadUrl endpoint
   ```
   Request: POST /api/FileManager/Upload
   FormData: uploadFiles (IFormFile array), path, action
   ```

5. **Download Files**: Requests from downloadUrl endpoint
   ```
   Request: POST /api/FileManager/Download
   Body: { path: '/', names: ['file.txt'] }
   ```

## Component Dimensions

Control the File Manager's size using `width` and `height` properties:

**Fixed dimensions:**
```html
<ejs-filemanager id="filemanager"
    width="600px"
    height="500px">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>
```

**Percentage-based (responsive):**
```html
<ejs-filemanager id="filemanager"
    width="80%"
    height="100%">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>
```

**Auto-sizing:**
```html
<ejs-filemanager id="filemanager"
    width="100%"
    height="auto">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>
```

**Width and Height Rules:**
- Accepts CSS values: pixels (px), percentages (%), rem, em, etc.
- Default width: 100%
- Default height: 400px
- Container must be explicitly positioned for percentage-based sizing

### Responsive File Manager Example

```html
<div style="width: 100%; height: 600px;">
    <ejs-filemanager id="filemanager"
        width="100%"
        height="100%">
        <e-filemanager-ajaxsettings url="/FileManager/FileManager">
        </e-filemanager-ajaxsettings>
    </ejs-filemanager>
</div>
```

## Initial View Configuration

The `view` property determines how files and folders are displayed when the component first loads:

### Large Icons View (Default)

```html
<ejs-filemanager id="filemanager" view="LargeIcons">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>
```

**Characteristics:**
- Shows files and folders as large icons
- File name displayed below icon
- Thumbnail support for images
- Best for visual browsing and media libraries
- Default view if not specified

### Details View

```html
<ejs-filemanager id="filemanager" view="Details">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>
```

**Characteristics:**
- Displays files in a tabular list format
- Shows columns: Name, Date Modified, Size, Type
- Sortable columns
- More information per item
- Better for large lists and office documents

### View Switching with JavaScript

Users can switch views using the View button in the toolbar, but you can also control view programmatically:

**View Code (Index.cshtml)**:
```html
<button onclick="switchView('LargeIcons')">Icon View</button>
<button onclick="switchView('Details')">Details View</button>

<ejs-filemanager id="filemanager" view="LargeIcons">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
    function switchView(viewType) {
        var filemanager = document.getElementById('filemanager').ej2_instances[0];
        filemanager.view = viewType;
    }
</script>
```

## Initial Path Setup

The `path` property sets which folder is displayed when the File Manager first loads:

**Show root folder (default):**
```html
<ejs-filemanager id="filemanager" path="/">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>
```

**Show specific folder:**
```html
<ejs-filemanager id="filemanager" path="/Documents/Reports">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>
```

**Deep nested path:**
```html
<ejs-filemanager id="filemanager" path="/Users/Projects/Active/Development">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>
```

**Important Considerations:**
- Paths must exist on the server
- Use forward slashes (/) as path separators
- Root path is "/"
- Invalid paths will show an error
- Users can navigate to different paths after initial load

### Dynamic Path Changes

```html
<button onclick="navigateToFolder('/Documents')">Go to Documents</button>

<ejs-filemanager id="filemanager" path="/Downloads">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
    function navigateToFolder(path) {
        var filemanager = document.getElementById('filemanager').ej2_instances[0];
        filemanager.path = path;
    }
</script>
```

## State Persistence

The `enablePersistence` property maintains the File Manager's state across page reloads:

```html
<ejs-filemanager id="filemanager"
    enablePersistence="true">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>
```

**What Gets Persisted:**
1. **View**: The selected view (LargeIcons or Details)
2. **Path**: The currently open folder path
3. **SelectedItems**: Previously selected files/folders

**How It Works:**
- State is stored in browser's local storage
- Automatically restored on page reload
- Key: Component ID with '_filemanager' suffix

### Persistence Example

```html
<!-- First visit: Shows root folder, LargeIcons view -->
<!-- User navigates to: /Documents/Reports -->
<!-- User switches to: Details view -->
<!-- User selects: Several files -->
<!-- Page reloads... -->
<!-- Component restores: /Documents/Reports path, Details view, selected files -->

<ejs-filemanager id="filemanager"
    enablePersistence="true"
    path="/"
    view="LargeIcons">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>
```

**Browser Storage Details:**
- Uses localStorage API
- Persists until localStorage is cleared
- Not available in private/incognito browsing
- Per-browser storage (not synchronized across devices)

## RTL Support

The `enableRtl` property enables right-to-left (RTL) layout for languages like Arabic, Hebrew, Farsi, and Urdu:

**Standard LTR (left-to-right) layout:**
```html
<ejs-filemanager id="filemanager" enableRtl="false">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>
```

**RTL layout:**
```html
<ejs-filemanager id="filemanager" enableRtl="true">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>
```

**RTL Changes:**
- File Manager content flows right-to-left
- Toolbar buttons align to the right
- Navigation pane appears on the right
- Scroll bars appear on the left
- Text direction becomes RTL

### Dynamic RTL Switching

```html
<button onclick="switchRTL()">Toggle RTL</button>

<ejs-filemanager id="filemanager"
    enableRtl="false"
    locale="en">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>

<script>
    var isRTL = false;
    
    function switchRTL() {
        isRTL = !isRTL;
        var filemanager = document.getElementById('filemanager').ej2_instances[0];
        filemanager.enableRtl = isRTL;
        filemanager.locale = isRTL ? 'ar' : 'en';
    }
</script>
```

## Locale and Internationalization

The `locale` property sets the language and cultural settings for the File Manager interface:

**English (default):**
```html
<ejs-filemanager id="filemanager" locale="en">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>
```

**German:**
```html
<ejs-filemanager id="filemanager" locale="de">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>
```

**French:**
```html
<ejs-filemanager id="filemanager" locale="fr">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>
```

**Arabic (typically combined with RTL):**
```html
<ejs-filemanager id="filemanager"
    locale="ar"
    enableRtl="true">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>
```

**Supported Locales:**
- en: English
- de: German
- fr: French
- es: Spanish
- ar: Arabic
- ru: Russian
- zh: Chinese
- ja: Japanese
- pt: Portuguese
- And many more Syncfusion-supported languages

### Setting Locale in Controller

**C# (FileManagerController.cs)**:
```csharp
public IActionResult Index(string locale = "en")
{
    ViewBag.locale = locale;
    return View();
}
```

**Razor View (Index.cshtml)**:
```html
<ejs-filemanager id="filemanager"
    locale="@ViewBag.locale">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>
```

## Quick Reference Examples

### Minimal Setup
```html
<ejs-filemanager id="filemanager">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>
```

### Complete Production Setup
```html
<ejs-filemanager id="filemanager"
    path="/"
    view="Details"
    width="100%"
    height="600px"
    locale="en"
    enableRtl="false"
    enablePersistence="true"
    allowDragAndDrop="true"
    allowMultiSelection="true">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager"
        uploadUrl="/FileManager/Upload"
        downloadUrl="/FileManager/Download"
        getImageUrl="/FileManager/GetImage">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>
```

### Localized Setup with RTL
```html
<ejs-filemanager id="filemanager"
    path="/"
    view="LargeIcons"
    width="100%"
    height="500px"
    locale="ar"
    enableRtl="true"
    enablePersistence="true">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager"
        uploadUrl="/FileManager/Upload"
        downloadUrl="/FileManager/Download"
        getImageUrl="/FileManager/GetImage">
    </e-filemanager-ajaxsettings>
</ejs-filemanager>
```

### Document Management Setup
```html
<ejs-filemanager id="filemanager"
    path="/Documents"
    view="Details"
    width="100%"
    height="700px"
    allowDragAndDrop="true"
    allowMultiSelection="true"
    enablePersistence="true">
    <e-filemanager-ajaxsettings url="/FileManager/FileManager"
        uploadUrl="/FileManager/Upload"
        downloadUrl="/FileManager/Download">
    </e-filemanager-ajaxsettings>
    <e-filemanager-uploadsettings autoUpload="true"
        allowedExtensions=".doc,.docx,.pdf,.xls,.xlsx,.ppt,.pptx">
    </e-filemanager-uploadsettings>
</ejs-filemanager>
```

---

**Next Steps:**
- Configure file operations in `file-operations.md`
- Set up upload and drag-drop in `drag-drop-upload.md`
- Customize views and layouts in `views-layouts.md`
