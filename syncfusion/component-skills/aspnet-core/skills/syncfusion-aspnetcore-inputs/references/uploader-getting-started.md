# Getting Started with Uploader in ASP.NET Core

## Table of Contents
- [Prerequisites](#prerequisites)
- [NuGet Installation](#nuget-installation)
- [TagHelper Registration](#taghelper-registration)
- [CDN Resources](#cdn-resources)
- [Script Manager](#script-manager)
- [Basic Uploader](#basic-uploader)
- [First Upload](#first-upload)

## Prerequisites

Before implementing Uploader, ensure you have:
- ASP.NET Core 6.0 or later
- Visual Studio 2022 or later
- .NET 6.0 SDK or later
- Basic understanding of Razor syntax and TagHelpers

## NuGet Installation

Install the Syncfusion.EJ2.AspNet.Core NuGet package via Package Manager Console:

```powershell
Install-Package Syncfusion.EJ2.AspNet.Core
```

Or search for "Syncfusion.EJ2.AspNet.Core" in NuGet Package Manager GUI and install.

**Dependencies:**
- Syncfusion.Licensing
- Newtonsoft.Json

## TagHelper Registration

Add Syncfusion TagHelpers in `_ViewImports.cshtml`:

```html
<!-- Views/_ViewImports.cshtml -->
@addTagHelper *, Syncfusion.EJ2
```

This single line registers all Syncfusion TagHelpers for use in your views.

## CDN Resources

Add stylesheet and script references in `_Layout.cshtml`:

```html
<!-- Shared/_Layout.cshtml -->
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@ViewBag.Title</title>
    
    <!-- Syncfusion Styles -->
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/33.1.44/fluent.css" />
    <!-- Syncfusion Scripts -->
    <script src="https://cdn.syncfusion.com/ej2/33.1.44/dist/ej2.min.js"></script>
</head>
<body>
    @RenderBody()
    
    @RenderSection("scripts", required: false)
</body>
</html>
```

### Available Themes

Choose one of these theme CDN URLs based on your preference:
- **Fluent:** `https://cdn.syncfusion.com/ej2/33.1.44/fluent.css`
- **Material:** `https://cdn.syncfusion.com/ej2/33.1.44/material.css`
- **Bootstrap 5:** `https://cdn.syncfusion.com/ej2/33.1.44/bootstrap5.css`
- **Tailwind:** `https://cdn.syncfusion.com/ej2/33.1.44/tailwind.css`

## Script Manager

Register the script manager at the end of `_Layout.cshtml`:

```html
<body>
    @RenderBody()
    
    <!-- Script Manager - required for all Syncfusion controls -->
    <ejs-scripts></ejs-scripts>
</body>
```

The `<ejs-scripts>` TagHelper initializes Syncfusion controls and must be placed once per page at the end of `<body>`.

## Basic Uploader

Create your first Uploader in a Razor view using TagHelper syntax:

```html
<!-- Views/Home/Index.cshtml -->
<ejs-uploader id="uploader">
    <e-uploader-asyncsettings saveUrl="Home/Save" removeUrl="Home/Remove"></e-uploader-asyncsettings>
</ejs-uploader>
```

### In HomeController.cs

```csharp
using Microsoft.AspNetCore.Mvc;
using System.IO;

public class HomeController : Controller
{
    private readonly IWebHostEnvironment _webHostEnvironment;

    public HomeController(IWebHostEnvironment webHostEnvironment)
    {
        _webHostEnvironment = webHostEnvironment;
    }

    [HttpGet]
    public IActionResult Index()
    {
        return View();
    }

    [HttpPost]
    public IActionResult Save(IFormFile[] uploader)
    {
        if (uploader != null && uploader.Length > 0)
        {
            string uploadPath = Path.Combine(_webHostEnvironment.WebRootPath, "Uploads");
            if (!Directory.Exists(uploadPath))
                Directory.CreateDirectory(uploadPath);

            foreach (IFormFile file in uploader)
            {
                if (file.Length > 0)
                {
                    string filePath = Path.Combine(uploadPath, file.FileName);
                    using (FileStream fs = System.IO.File.Create(filePath))
                    {
                        file.CopyTo(fs);
                        fs.Flush();
                    }
                }
            }
        }
        return Ok();
    }

    [HttpPost]
    public IActionResult Remove(string[] files)
    {
        if (files != null && files.Length > 0)
        {
            string uploadPath = Path.Combine(_webHostEnvironment.WebRootPath, "Uploads");
            
            foreach (string file in files)
            {
                string filePath = Path.Combine(uploadPath, file);
                if (System.IO.File.Exists(filePath))
                    System.IO.File.Delete(filePath);
            }
        }
        return Ok();
    }
}
```

## First Upload

To test your first upload:

1. **Create Uploads Folder:** Create `wwwroot/Uploads` folder in your project
2. **Run Application:** Press F5 in Visual Studio
3. **Select Files:** Click the browse button on the Uploader
4. **Choose File:** Select a file from your computer
5. **Auto Upload:** File uploads automatically (if auto-upload is enabled)
6. **Check Upload:** Verify file exists in wwwroot/Uploads folder

### Expected Output

```
✓ File selected
✓ File uploaded successfully
✓ Green checkmark appears next to filename
✓ Remove icon changes to trash bin
✓ File saved in wwwroot/Uploads folder
```

## Common Issues

### Issue: "Uploader is not defined"
**Solution:** Ensure `<ejs-scripts></ejs-scripts>` is called in _Layout.cshtml

### Issue: "ejs-uploader is not recognized"
**Solution:** Verify `@addTagHelper *, Syncfusion.EJ2` is in _ViewImports.cshtml

### Issue: "POST to Save URL returns 404"
**Solution:** Verify action method name matches save-url path (e.g., "Home/Save" → HomeController.Save())

### Issue: "File not saving to disk"
**Solution:** Ensure wwwroot/Uploads folder exists with write permissions

### Issue: "CORS error in browser console"
**Solution:** For cross-domain uploads, configure CORS in Program.cs:

```csharp
// Program.cs
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

app.UseCors("AllowAll");
```

## Next Steps

- Add file validation: [references/file-validation.md](file-validation.md)
- Configure advanced options: [references/async-upload.md](async-upload.md)
- Customize appearance: [references/templates-and-styling.md](templates-and-styling.md)
