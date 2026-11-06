# Getting Started with ASP.NET Core Block Editor

## Installation and Package Setup

### Install NuGet Package

Open the NuGet package manager in Visual Studio (Tools → NuGet Package Manager → Manage NuGet Packages for Solution), search for `Syncfusion.EJ2.AspNet.Core` and install it.

## Basic BlockEditor Implementation

### Step 1: Register Syncfusion Tag Helper

Open `~/Pages/_ViewImports.cshtml` (for Razor Pages) or `~/Views/Shared/_ViewImports.cshtml` (for MVC) and add:

```razor
@addTagHelper *, Syncfusion.EJ2
```

### Step 2: Add CSS and JavaScript Resources

In `~/Pages/Shared/_Layout.cshtml` or `~/Views/Shared/_Layout.cshtml`, add the following resources in the `<head>` and `<body>` sections:

```razor
<head>
    ...
    <!-- Syncfusion CSS -->
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/ej2.min.css" />
</head>

<body>
    @RenderBody()
    
    <!-- Syncfusion Scripts -->
    <script src="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/dist/ej2.min.js"></script>
    
    <!-- Syncfusion Script Manager -->
    <ejs-scripts></ejs-scripts>
    
    @RenderSection("Scripts", required: false)
</body>
```

### Step 3: Create First Block Editor Instance

Add the Block Editor tag helper to your Razor view:

```razor
@using Syncfusion.EJ2.BlockEditor

<div id='blockeditor-container'>
    <ejs-blockeditor id="block-editor"></ejs-blockeditor>
</div>

<style>
    #blockeditor-container {
        margin: 20px auto;
    }
</style>
```

## Setting Initial Content

### Define Block Model in Controller

Create a `BlockModel` class to represent block structure:

```csharp
using Syncfusion.EJ2.BlockEditor;

public class BlockModel
{
    public string id { get; set; }
    public string blockType { get; set; }
    public object properties { get; set; }
    public List<object> content { get; set; }
}
```

### Configure Blocks in Controller Action

```csharp
public IActionResult Index()
{
    var blocksData = new List<BlockModel>
    {
        // Heading block
        new BlockModel
        {
            id = "heading-1",
            blockType = "Heading",
            properties = new { level = 1 },
            content = new List<object>
            {
                new
                {
                    contentType = "Text",
                    content = "Welcome to Block Editor"
                }
            }
        },
        
        // Paragraph block
        new BlockModel
        {
            id = "paragraph-1",
            blockType = "Paragraph",
            content = new List<object>
            {
                new
                {
                    contentType = "Text",
                    content = "This is the first paragraph. You can edit and format text here."
                }
            }
        },
        
        // Bullet list block
        new BlockModel
        {
            id = "list-1",
            blockType = "BulletList",
            content = new List<object>
            {
                new
                {
                    contentType = "Text",
                    content = "First bullet point"
                }
            }
        },
        
        // Numbered list block
        new BlockModel
        {
            id = "numbered-1",
            blockType = "NumberedList",
            content = new List<object>
            {
                new
                {
                    contentType = "Text",
                    content = "First numbered item"
                }
            }
        }
    };
    
    ViewBag.BlocksData = blocksData;
    return View();
}
```

### Pass Data to View

```razor
@using Syncfusion.EJ2.BlockEditor

<div id='blockeditor-container'>
    <ejs-blockeditor id="block-editor" blocks="@ViewBag.BlocksData"></ejs-blockeditor>
</div>

<style>
    #blockeditor-container {
        margin: 20px auto;
        max-width: 900px;
        padding: 20px;
    }
</style>
```

## CSS Imports and Themes

```html
<head>
    ...
    <!-- Syncfusion ASP.NET Core controls styles -->
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/fluent.css" />
    <!-- Syncfusion ASP.NET Core controls scripts -->
    <script src="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/dist/ej2.min.js"></script>
</head>
```

## Complete Minimal Example

**Controller:**
```csharp
public IActionResult Index()
{
    var blocks = new List<BlockModel>
    {
        new BlockModel
        {
            id = "p1",
            blockType = "Paragraph",
            content = new List<object>
            {
                new { contentType = "Text", content = "Type '/' for commands or start typing..." }
            }
        }
    };
    
    ViewBag.BlocksData = blocks;
    return View();
}
```

**View:**
```razor
@using Syncfusion.EJ2.BlockEditor

<div id='blockeditor-container'>
    <ejs-blockeditor id="block-editor" blocks="@ViewBag.BlocksData"></ejs-blockeditor>
</div>

<style>
    #blockeditor-container {
        margin: 20px auto;
    }
</style>
```
