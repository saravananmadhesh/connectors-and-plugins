# Built-in Block Types

## Table of Contents

- [Overview](#overview)
- [Basic Block Types](#basic-block-types)
- [List Blocks](#list-blocks)
- [Code and Utility Blocks](#code-and-utility-blocks)
- [Nested Block Types](#nested-block-types)
- [Block Properties](#block-properties)
- [Placeholder Configuration](#placeholder-configuration)
- [CSS Class Customization](#css-class-customization)
- [Block Templates](#block-templates)

## Overview

The Block Editor supports multiple block types to create rich, structured documents. Each block type offers specific functionality and formatting options.

| Block Type | Description | Use Case |
|-----------|-------------|----------|
| Paragraph | Default text block | Regular content |
| Heading1-4 | Heading levels 1-4 | Document structure |
| BulletList | Unordered list | Items without order |
| NumberedList | Ordered list | Sequenced items |
| Checklist | Interactive todo list | Task tracking |
| Code | Formatted code block | Code snippets |
| Quote | Styled quotation | Cited content |
| Callout | Highlighted box | Important notes |
| Divider | Horizontal separator | Visual breaks |
| CollapsibleHeading1-4 | Expandable heading | Collapsible sections |
| CollapsibleParagraph | Expandable paragraph | Hidden content |
| Image | Image block | Media content |
| Template | Custom template | Custom layouts |

## Basic Block Types

### Paragraph Block

Simple text content block:

```csharp
new BlockModel
{
    id = "para-1",
    blockType = "Paragraph",
    content = new List<object>
    {
        new
        {
            contentType = "Text",
            content = "This is a paragraph block with regular text content."
        }
    }
}
```

### Heading Blocks

Four levels of headings for document structure:

```csharp
// Heading 1
new BlockModel
{
    id = "h1",
    blockType = "Heading",
    properties = new { level = 1 },
    content = new List<object>
    {
        new { contentType = "Text", content = "Main Heading" }
    }
}

// Heading 2
new BlockModel
{
    id = "h2",
    blockType = "Heading",
    properties = new { level = 2 },
    content = new List<object>
    {
        new { contentType = "Text", content = "Subheading" }
    }
}

// Heading 3 and 4 follow the same pattern
```

## List Blocks

### Bullet List

Unordered list with bullet points:

```csharp
new BlockModel
{
    id = "bullet-1",
    blockType = "BulletList",
    content = new List<object>
    {
        new { contentType = "Text", content = "First item" }
    }
}

new BlockModel
{
    id = "bullet-2",
    blockType = "BulletList",
    content = new List<object>
    {
        new { contentType = "Text", content = "Second item" }
    }
}
```

### Numbered List

Ordered list with sequential numbering:

```csharp
new BlockModel
{
    id = "num-1",
    blockType = "NumberedList",
    content = new List<object>
    {
        new { contentType = "Text", content = "First step" }
    }
}

new BlockModel
{
    id = "num-2",
    blockType = "NumberedList",
    content = new List<object>
    {
        new { contentType = "Text", content = "Second step" }
    }
}
```

### Checklist

Interactive todo list with checkable items:

```csharp
new BlockModel
{
    id = "checklist-1",
    blockType = "Checklist",
    properties = new { isChecked = false },
    content = new List<object>
    {
        new { contentType = "Text", content = "Complete project documentation" }
    }
}

new BlockModel
{
    id = "checklist-2",
    blockType = "Checklist",
    properties = new { isChecked = true },
    content = new List<object>
    {
        new { contentType = "Text", content = "Review code" }
    }
}
```

## Code and Utility Blocks

### Code Block

Formatted code with syntax highlighting:

```csharp
new BlockModel
{
    id = "code-1",
    blockType = "Code",
    properties = new { language = "csharp" },
    content = new List<object>
    {
        new { contentType = "Text", content = "public void HelloWorld() { Console.WriteLine(\"Hello!\"); }" }
    }
}
```

## Code Block Configuration

### Global Code Block Settings

Configure syntax highlighting languages and default language using `e-blockeditor-codeblocksettings`:

```razor
<ejs-blockeditor id="block-editor">
    <e-blockeditor-codeblocksettings defaultLanguage="javascript">
    </e-blockeditor-codeblocksettings>
</ejs-blockeditor>
```

### CodeBlockSettings Properties

| Property | Type | Description |
|----------|------|-------------|
| `defaultLanguage` | string | Default programming language for new code blocks |
| `languages` | CodeLanguageModel[] | Array of available language options in the dropdown |

### Configure Available Languages

Customize the list of programming languages available in code blocks:

```csharp
public class CodeLanguageModel
{
    public string Language { get; set; }  // Language identifier
    public string Label { get; set; }     // Display name
}

public IActionResult CodeEditor()
{
    var languages = new List<object>
    {
        new { language = "javascript", label = "JavaScript" },
        new { language = "typescript", label = "TypeScript" },
        new { language = "csharp", label = "C#" },
        new { language = "python", label = "Python" },
        new { language = "java", label = "Java" },
        new { language = "cpp", label = "C++" },
        new { language = "html", label = "HTML" },
        new { language = "css", label = "CSS" },
        new { language = "sql", label = "SQL" },
        new { language = "bash", label = "Bash" },
        new { language = "json", label = "JSON" },
        new { language = "xml", label = "XML" }
    };
    
    ViewBag.Languages = languages;
    return View();
}
```

**View:**

```razor
@{
    var languages = ViewBag.Languages;
}

<ejs-blockeditor id="code-editor">
    <e-blockeditor-codeblocksettings 
        defaultLanguage="javascript"
        languages="@languages">
    </e-blockeditor-codeblocksettings>
</ejs-blockeditor>
```

### Supported Programming Languages

Common language identifiers for syntax highlighting:

| Language | Identifier | Label |
|----------|------------|-------|
| JavaScript | `javascript` | JavaScript |
| TypeScript | `typescript` | TypeScript |
| C# | `csharp` | C# |
| Python | `python` | Python |
| Java | `java` | Java |
| C++ | `cpp` | C++ |
| C | `c` | C |
| Go | `go` | Go |
| Rust | `rust` | Rust |
| PHP | `php` | PHP |
| Ruby | `ruby` | Ruby |
| Swift | `swift` | Swift |
| Kotlin | `kotlin` | Kotlin |
| HTML | `html` | HTML |
| CSS | `css` | CSS |
| SCSS | `scss` | SCSS |
| JSON | `json` | JSON |
| XML | `xml` | XML |
| YAML | `yaml` | YAML |
| Markdown | `markdown` | Markdown |
| SQL | `sql` | SQL |
| Bash/Shell | `bash` | Bash |
| PowerShell | `powershell` | PowerShell |
| Dockerfile | `dockerfile` | Dockerfile |
| R | `r` | R |
| MATLAB | `matlab` | MATLAB |

### Web Development Languages

Configure for web development projects:

```csharp
public IActionResult WebDevEditor()
{
    var webLanguages = new List<object>
    {
        new { language = "html", label = "HTML" },
        new { language = "css", label = "CSS" },
        new { language = "scss", label = "SCSS/SASS" },
        new { language = "javascript", label = "JavaScript" },
        new { language = "typescript", label = "TypeScript" },
        new { language = "jsx", label = "JSX (React)" },
        new { language = "vue", label = "Vue" },
        new { language = "angular", label = "Angular" },
        new { language = "json", label = "JSON" },
        new { language = "xml", label = "XML" }
    };
    
    ViewBag.WebLanguages = webLanguages;
    return View();
}
```

**View:**

```razor
@{
    var webLanguages = ViewBag.WebLanguages;
}

<div id="webdev-editor-container">
    <h3>Web Development Code Editor</h3>
    
    <ejs-blockeditor id="webdev-editor" height="600px">
        <e-blockeditor-codeblocksettings 
            defaultLanguage="javascript"
            languages="@webLanguages">
        </e-blockeditor-codeblocksettings>
    </ejs-blockeditor>
</div>
```

### Backend Development Languages

Configure for backend development:

```csharp
public IActionResult BackendEditor()
{
    var backendLanguages = new List<object>
    {
        new { language = "csharp", label = "C#" },
        new { language = "java", label = "Java" },
        new { language = "python", label = "Python" },
        new { language = "go", label = "Go" },
        new { language = "rust", label = "Rust" },
        new { language = "php", label = "PHP" },
        new { language = "ruby", label = "Ruby" },
        new { language = "sql", label = "SQL" },
        new { language = "bash", label = "Bash" },
        new { language = "powershell", label = "PowerShell" }
    };
    
    ViewBag.BackendLanguages = backendLanguages;
    return View();
}
```

### Complete Code Block Example

```csharp
public IActionResult TechnicalDocumentation()
{
    // Configure comprehensive language list
    var languages = new List<object>
    {
        // Web Technologies
        new { language = "html", label = "HTML" },
        new { language = "css", label = "CSS" },
        new { language = "javascript", label = "JavaScript" },
        new { language = "typescript", label = "TypeScript" },
        
        // Backend Languages
        new { language = "csharp", label = "C#" },
        new { language = "java", label = "Java" },
        new { language = "python", label = "Python" },
        new { language = "go", label = "Go" },
        new { language = "php", label = "PHP" },
        
        // Systems Programming
        new { language = "cpp", label = "C++" },
        new { language = "c", label = "C" },
        new { language = "rust", label = "Rust" },
        
        // Data Formats
        new { language = "json", label = "JSON" },
        new { language = "xml", label = "XML" },
        new { language = "yaml", label = "YAML" },
        
        // Database & Scripting
        new { language = "sql", label = "SQL" },
        new { language = "bash", label = "Bash" },
        new { language = "powershell", label = "PowerShell" },
        
        // Mobile
        new { language = "swift", label = "Swift" },
        new { language = "kotlin", label = "Kotlin" },
        
        // Other
        new { language = "markdown", label = "Markdown" },
        new { language = "dockerfile", label = "Dockerfile" }
    };
    
    // Initial content with code examples
    var blocks = new List<object>
    {
        new
        {
            id = "heading-1",
            blockType = "Heading",
            properties = new { level = 1 },
            content = new List<object>
            {
                new { contentType = "Text", content = "Code Examples" }
            }
        },
        new
        {
            id = "csharp-example",
            blockType = "Heading",
            properties = new { level = 2 },
            content = new List<object>
            {
                new { contentType = "Text", content = "C# Example" }
            }
        },
        new
        {
            id = "code-csharp",
            blockType = "Code",
            properties = new { language = "csharp" },
            content = new List<object>
            {
                new 
                { 
                    contentType = "Text", 
                    content = @"public class HelloWorld 
{
    public static void Main(string[] args)
    {
        Console.WriteLine(""Hello, World!"");
    }
}"
                }
            }
        },
        new
        {
            id = "javascript-example",
            blockType = "Heading",
            properties = new { level = 2 },
            content = new List<object>
            {
                new { contentType = "Text", content = "JavaScript Example" }
            }
        },
        new
        {
            id = "code-javascript",
            blockType = "Code",
            properties = new { language = "javascript" },
            content = new List<object>
            {
                new 
                { 
                    contentType = "Text", 
                    content = @"function greet(name) {
    return `Hello, ${name}!`;
}

console.log(greet('World'));"
                }
            }
        }
    };
    
    ViewBag.Languages = languages;
    ViewBag.BlocksData = blocks;
    
    return View();
}
```

**View:**

```razor
@{
    var languages = ViewBag.Languages;
    var blocks = ViewBag.BlocksData;
}

<div id="technical-docs-container">
    <h2>Technical Documentation Editor</h2>
    <p>Create technical documentation with syntax-highlighted code blocks in multiple languages.</p>
    
    <ejs-blockeditor id="technical-docs-editor" 
                     blocks="@blocks"
                     height="700px">
        <e-blockeditor-codeblocksettings 
            defaultLanguage="csharp"
            languages="@languages">
        </e-blockeditor-codeblocksettings>
        
        <e-blockeditor-toolbarsettings 
            enable="true"
            items="@(new string[] { 
                "Bold", "Italic", "Code",
                "OrderedList", "UnorderedList",
                "Undo", "Redo"
            })">
        </e-blockeditor-toolbarsettings>
    </ejs-blockeditor>
</div>

<style>
    #technical-docs-container {
        margin: 20px auto;
        max-width: 1000px;
        padding: 20px;
        background: #ffffff;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    
    #technical-docs-container h2 {
        color: #1e293b;
        margin-bottom: 10px;
    }
    
    #technical-docs-container p {
        color: #64748b;
        margin-bottom: 20px;
    }
    
    /* Custom code block styling */
    .e-block[data-blocktype="Code"] {
        background-color: #1e1e1e;
        border-radius: 6px;
        padding: 16px;
        overflow-x: auto;
    }
    
    .e-block[data-blocktype="Code"] code {
        font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
        font-size: 14px;
        line-height: 1.6;
        color: #d4d4d4;
    }
</style>
```

### Minimal Language Configuration

For simpler use cases, configure just a few languages:

```csharp
public IActionResult SimpleCodeEditor()
{
    var basicLanguages = new List<object>
    {
        new { language = "javascript", label = "JavaScript" },
        new { language = "csharp", label = "C#" },
        new { language = "python", label = "Python" },
        new { language = "json", label = "JSON" }
    };
    
    ViewBag.BasicLanguages = basicLanguages;
    return View();
}
```

```razor
@{
    var basicLanguages = ViewBag.BasicLanguages;
}

<ejs-blockeditor id="simple-code-editor">
    <e-blockeditor-codeblocksettings 
        defaultLanguage="javascript"
        languages="@basicLanguages">
    </e-blockeditor-codeblocksettings>
</ejs-blockeditor>
```

### Code Block Use Cases

1. **Technical Documentation** - Document APIs with code examples
2. **Tutorial Content** - Create coding tutorials with syntax highlighting
3. **Knowledge Base** - Store code snippets and solutions
4. **Code Reviews** - Share and review code with context
5. **Education** - Create programming course materials
6. **README Files** - Generate documentation with code samples

### Quote Block

Styled quotation block:

```csharp
new BlockModel
{
    id = "quote-1",
    blockType = "Quote",
    properties = new
    {
        children = new List<BlockModel>
        {
            new BlockModel
            {
                blockType = "Paragraph",
                content = new List<object>
                {
                    new { contentType = "Text", content = "The only way to do great work is to love what you do." }
                }
            }
        }
    }
}
```

### Callout Block

Highlighted box for important information:

```csharp
new BlockModel
{
    id = "callout-1",
    blockType = "Callout",
    properties = new
    {
        type = "info",  // info, warning, error, success
        children = new List<BlockModel>
        {
            new BlockModel
            {
                blockType = "Paragraph",
                content = new List<object>
                {
                    new { contentType = "Text", content = "This is important information!" }
                }
            }
        }
    }
}
```

### Divider Block

Horizontal separator line:

```csharp
new BlockModel
{
    id = "divider-1",
    blockType = "Divider"
}
```

### Table Block

Structured data in table format:

```csharp
new BlockModel
{
    id = "table-1",
    blockType = "Table",
    properties = new { rows = 3, cols = 3 }
}
```

### Image Block

Display images in the document:

```csharp
new BlockModel
{
    id = "image-1",
    blockType = "Image",
    properties = new
    {
        src = "https://example.com/image.jpg",
        alt = "Image description",
        width = "300px",
        height = "200px"
    }
}
```

## Image Upload Configuration

### Global Image Block Settings

Configure global image upload behavior using the `e-blockeditor-imageblocksettings` tag helper:

```razor
<ejs-blockeditor id="block-editor">
    <e-blockeditor-imageblocksettings 
        saveUrl="/api/blockeditor/image/save"
        path="/uploads/blockeditor/"
        maxFileSize="5000000"
        saveFormat="SaveFormat.Base64"
        enableResize="true"
        width="auto"
        height="auto"
        minWidth="50px"
        minHeight="50px"
        maxWidth="1200px"
        maxHeight="800px">
    </e-blockeditor-imageblocksettings>
</ejs-blockeditor>
```

### Image Settings Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `saveUrl` | string | "" | Server endpoint URL for image uploads |
| `path` | string | "" | Base path for storing images on server |
| `allowedTypes` | string[] | [".jpg", ".jpeg", ".png", ".gif"] | Allowed image file extensions |
| `maxFileSize` | number | 30000000 | Maximum file size in bytes (default: 30MB) |
| `saveFormat` | SaveFormat | Blob | Format to save images: `Blob` or `Base64` |
| `enableResize` | bool | true | Enable image resize handles |
| `width` | string | "auto" | Default image display width |
| `height` | string | "auto" | Default image display height |
| `minWidth` | string | "" | Minimum width when resizing |
| `minHeight` | string | "" | Minimum height when resizing |
| `maxWidth` | string | "" | Maximum width when resizing |
| `maxHeight` | string | "" | Maximum height when resizing |

### Configure Allowed File Types

Restrict image uploads to specific file types:

```razor
@{
    var allowedTypes = new string[] { ".jpg", ".jpeg", ".png", ".gif", ".webp" };
}

<ejs-blockeditor id="block-editor">
    <e-blockeditor-imageblocksettings 
        allowedTypes="@allowedTypes"
        maxFileSize="2000000">
    </e-blockeditor-imageblocksettings>
</ejs-blockeditor>
```

### Image Upload with Server Endpoint

Configure server-side image upload:

```razor
<ejs-blockeditor id="block-editor"
                 beforeFileUpload="onBeforeUpload"
                 fileUploadSuccess="onUploadSuccess"
                 fileUploadFailed="onUploadFailed">
    <e-blockeditor-imageblocksettings 
        saveUrl="@Url.Action("SaveImage", "BlockEditor")"
        path="/uploads/images/"
        maxFileSize="5000000"
        saveFormat="SaveFormat.Blob">
    </e-blockeditor-imageblocksettings>
</ejs-blockeditor>

<script>
    function onBeforeUpload(args) {
        console.log('Uploading file:', args.file.name);
        
        // Validate file before upload
        if (args.file.size > 5000000) {
            args.cancel = true;
            alert('File size exceeds 5MB limit');
        }
        
        // Add custom headers
        args.currentRequest.setRequestHeader('X-Custom-Header', 'value');
    }
    
    function onUploadSuccess(args) {
        console.log('Upload successful:', args.fileUrl);
        console.log('Server response:', args.response);
    }
    
    function onUploadFailed(args) {
        console.error('Upload failed:', args.statusText);
        alert('Image upload failed: ' + args.statusText);
    }
</script>
```

**Server-side Controller (C#):**

```csharp
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using System.IO;
using System.Threading.Tasks;

namespace YourApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlockEditorController : ControllerBase
    {
        private readonly IWebHostEnvironment _environment;
        
        public BlockEditorController(IWebHostEnvironment environment)
        {
            _environment = environment;
        }
        
        [HttpPost("image/save")]
        public async Task<IActionResult> SaveImage(IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest(new { error = "No file uploaded" });
            
            // Validate file type
            var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".gif" };
            var extension = Path.GetExtension(file.FileName).ToLowerInvariant();
            
            if (!Array.Exists(allowedExtensions, ext => ext == extension))
                return BadRequest(new { error = "Invalid file type" });
            
            // Validate file size (5MB limit)
            if (file.Length > 5 * 1024 * 1024)
                return BadRequest(new { error = "File size exceeds 5MB limit" });
            
            // Generate unique filename
            var fileName = $"{Guid.NewGuid()}{extension}";
            var uploadsFolder = Path.Combine(_environment.WebRootPath, "uploads", "images");
            
            // Ensure directory exists
            Directory.CreateDirectory(uploadsFolder);
            
            var filePath = Path.Combine(uploadsFolder, fileName);
            
            // Save file
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }
            
            // Return file URL
            var fileUrl = $"/uploads/images/{fileName}";
            return Ok(new { fileUrl = fileUrl });
        }
    }
}
```

### Image Resize Configuration

Control image resize behavior:

```razor
<ejs-blockeditor id="block-editor">
    <e-blockeditor-imageblocksettings 
        enableResize="true"
        minWidth="100px"
        minHeight="100px"
        maxWidth="800px"
        maxHeight="600px">
    </e-blockeditor-imageblocksettings>
</ejs-blockeditor>
```

### Base64 vs Blob Save Format

**Base64 Format** - Embeds images directly in the document JSON:

```razor
<ejs-blockeditor id="block-editor">
    <e-blockeditor-imageblocksettings 
        saveFormat="SaveFormat.Base64">
    </e-blockeditor-imageblocksettings>
</ejs-blockeditor>
```

**Advantages:**
- No server storage needed
- Images included in document export
- Simpler implementation

**Disadvantages:**
- Larger document size
- Slower document loading with many images

**Blob Format** - Stores images as separate files:

```razor
<ejs-blockeditor id="block-editor">
    <e-blockeditor-imageblocksettings 
        saveFormat="SaveFormat.Blob"
        saveUrl="/api/blockeditor/image/save"
        path="/uploads/images/">
    </e-blockeditor-imageblocksettings>
</ejs-blockeditor>
```

**Advantages:**
- Smaller document size
- Faster document loading
- Better for many/large images

**Disadvantages:**
- Requires server storage
- Need to manage file lifecycle

### Complete Image Configuration Example

```csharp
public IActionResult ImageEditor()
{
    // Configure allowed image types
    ViewBag.AllowedTypes = new string[] { ".jpg", ".jpeg", ".png", ".gif", ".webp" };
    
    // Initial blocks with image
    var blocks = new List<object>
    {
        new
        {
            id = "heading-1",
            blockType = "Heading",
            properties = new { level = 1 },
            content = new List<object>
            {
                new { contentType = "Text", content = "Image Upload Example" }
            }
        },
        new
        {
            id = "paragraph-1",
            blockType = "Paragraph",
            content = new List<object>
            {
                new { contentType = "Text", content = "Click below to insert an image or paste an image from clipboard." }
            }
        }
    };
    
    ViewBag.BlocksData = blocks;
    return View();
}
```

**View:**

```razor
@{
    var allowedTypes = ViewBag.AllowedTypes as string[];
}

<div id="blockeditor-container">
    <ejs-blockeditor id="block-editor" 
                     blocks="@ViewBag.BlocksData"
                     beforeFileUpload="onBeforeUpload"
                     fileUploadSuccess="onUploadSuccess"
                     fileUploadFailed="onUploadFailed">
        <e-blockeditor-imageblocksettings 
            saveUrl="@Url.Action("SaveImage", "BlockEditor")"
            path="/uploads/blockeditor/"
            allowedTypes="@allowedTypes"
            maxFileSize="5000000"
            saveFormat="SaveFormat.Blob"
            enableResize="true"
            width="auto"
            height="auto"
            minWidth="100px"
            minHeight="100px"
            maxWidth="1200px"
            maxHeight="900px">
        </e-blockeditor-imageblocksettings>
    </ejs-blockeditor>
</div>

<script>
    function onBeforeUpload(args) {
        // Validate file type
        var allowedTypes = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
        var fileName = args.file.name.toLowerCase();
        var isValid = allowedTypes.some(ext => fileName.endsWith(ext));
        
        if (!isValid) {
            args.cancel = true;
            alert('Please upload only image files (jpg, png, gif, webp)');
            return;
        }
        
        // Validate file size (5MB)
        if (args.file.size > 5 * 1024 * 1024) {
            args.cancel = true;
            alert('File size must be less than 5MB');
            return;
        }
        
        console.log('Uploading:', args.file.name, 'Size:', args.file.size + ' bytes');
    }
    
    function onUploadSuccess(args) {
        console.log('Upload successful!');
        console.log('File URL:', args.fileUrl);
        console.log('Server response:', args.response);
    }
    
    function onUploadFailed(args) {
        console.error('Upload failed:', args.statusText);
        alert('Failed to upload image. Please try again.');
    }
</script>

<style>
    #blockeditor-container {
        margin: 20px auto;
        max-width: 900px;
    }
</style>
```

## Nested Block Types

### CollapsibleHeading

Expandable heading with child content:

```csharp
new BlockModel
{
    id = "collapsible-h1",
    blockType = "CollapsibleHeading",
    content = new List<object>
    {
        new { contentType = "Text", content = "Click to expand" }
    },
    properties = new
    {
        level = 1,
        isExpanded = true,  // Initially expanded
        children = new List<BlockModel>
        {
            new BlockModel
            {
                blockType = "Paragraph",
                content = new List<object>
                {
                    new { contentType = "Text", content = "This content is hidden until expanded." }
                }
            },
            new BlockModel
            {
                blockType = "BulletList",
                content = new List<object>
                {
                    new { contentType = "Text", content = "Child item 1" }
                }
            }
        }
    }
}

// Levels: 1, 2, 3, 4
new BlockModel
{
    id = "collapsible-h2",
    blockType = "CollapsibleHeading",
    properties = new { level = 2, isExpanded = false }
}

new BlockModel
{
    id = "collapsible-h3",
    blockType = "CollapsibleHeading",
    properties = new { level = 3, isExpanded = true }
}

new BlockModel
{
    id = "collapsible-h4",
    blockType = "CollapsibleHeading",
    properties = new { level = 4, isExpanded = false }
}
```

## User Mentions

### Configure User List

Enable user mentions by providing a list of users with the `users` property:

```csharp
public class UserModel
{
    public string id { get; set; }
    public string user { get; set; }
    public string avatarUrl { get; set; }
    public string avatarBgColor { get; set; }
    public string cssClass { get; set; }
}

public IActionResult MentionsEditor()
{
    var users = new List<UserModel>
    {
        new UserModel
        {
            id = "user1",
            user = "Alice Johnson",
            avatarUrl = "/images/avatars/alice.jpg",
            avatarBgColor = "#4caf50",
            cssClass = "user-mention"
        },
        new UserModel
        {
            id = "user2",
            user = "Bob Smith",
            avatarUrl = "/images/avatars/bob.jpg",
            avatarBgColor = "#2196f3",
            cssClass = "user-mention"
        },
        new UserModel
        {
            id = "user3",
            user = "Carol Williams",
            avatarBgColor = "#ff9800",  // No avatar URL - uses initials
            cssClass = "user-mention"
        },
        new UserModel
        {
            id = "user4",
            user = "David Brown",
            avatarBgColor = "#e91e63",
            cssClass = "user-mention"
        }
    };
    
    ViewBag.Users = users;
    return View();
}
```

**View:**

```razor
@using YourApp.Models

@{
    var users = ViewBag.Users as List<UserModel>;
}

<ejs-blockeditor id="mentions-editor" 
                 users="@users"
                 height="500px">
</ejs-blockeditor>
```

### UserModel Properties

| Property | Type | Description |
|----------|------|-------------|
| `id` | string | Unique identifier for the user (required) |
| `user` | string | Display name shown in mention suggestions (required) |
| `avatarUrl` | string | URL to user's avatar image (optional) |
| `avatarBgColor` | string | Background color for avatar (required if no avatarUrl) |
| `cssClass` | string | Custom CSS class for styling mentions (optional) |

### Using Mentions in Content

Users trigger mentions by typing `@` followed by the user's name:

```csharp
// Create content with user mentions
new BlockModel
{
    id = "paragraph-with-mention",
    blockType = "Paragraph",
    content = new List<object>
    {
        new { contentType = "Text", content = "Hey " },
        new 
        { 
            contentType = "Mention", 
            content = "Alice Johnson",
            properties = new { userId = "user1" }
        },
        new { contentType = "Text", content = ", can you review this?" }
    }
}
```

### Mention Content Type

When creating blocks programmatically with mentions:

```csharp
var blocks = new List<object>
{
    new
    {
        id = "collab-paragraph",
        blockType = "Paragraph",
        content = new List<object>
        {
            new { contentType = "Text", content = "Task assigned to " },
            new 
            { 
                contentType = "Mention",
                content = "Bob Smith",
                properties = new { userId = "user2" }
            },
            new { contentType = "Text", content = " and " },
            new 
            { 
                contentType = "Mention",
                content = "Carol Williams",
                properties = new { userId = "user3" }
            },
            new { contentType = "Text", content = ". Please complete by Friday." }
        }
    }
};

ViewBag.BlocksData = blocks;
```

### Complete Mentions Example

```csharp
public IActionResult CollaborationEditor()
{
    // Define team members
    var teamMembers = new List<UserModel>
    {
        new UserModel
        {
            id = "alice_j",
            user = "Alice Johnson",
            avatarUrl = "https://i.pravatar.cc/150?img=1",
            avatarBgColor = "#4caf50",
            cssClass = "team-mention"
        },
        new UserModel
        {
            id = "bob_s",
            user = "Bob Smith",
            avatarUrl = "https://i.pravatar.cc/150?img=12",
            avatarBgColor = "#2196f3",
            cssClass = "team-mention"
        },
        new UserModel
        {
            id = "carol_w",
            user = "Carol Williams",
            avatarUrl = "https://i.pravatar.cc/150?img=5",
            avatarBgColor = "#ff9800",
            cssClass = "team-mention"
        },
        new UserModel
        {
            id = "david_b",
            user = "David Brown",
            avatarBgColor = "#e91e63",  // No avatar - shows initials
            cssClass = "team-mention"
        },
        new UserModel
        {
            id = "emma_d",
            user = "Emma Davis",
            avatarBgColor = "#9c27b0",
            cssClass = "team-mention"
        }
    };
    
    // Initial content with mentions
    var blocks = new List<object>
    {
        new
        {
            id = "meeting-notes",
            blockType = "Heading",
            properties = new { level = 1 },
            content = new List<object>
            {
                new { contentType = "Text", content = "Team Meeting Notes - March 26, 2026" }
            }
        },
        new
        {
            id = "action-items",
            blockType = "Heading",
            properties = new { level = 2 },
            content = new List<object>
            {
                new { contentType = "Text", content = "Action Items" }
            }
        },
        new
        {
            id = "task-1",
            blockType = "Checklist",
            properties = new { isChecked = false },
            content = new List<object>
            {
                new 
                { 
                    contentType = "Mention",
                    content = "Alice Johnson",
                    properties = new { userId = "alice_j" }
                },
                new { contentType = "Text", content = " - Review API documentation" }
            }
        },
        new
        {
            id = "task-2",
            blockType = "Checklist",
            properties = new { isChecked = false },
            content = new List<object>
            {
                new 
                { 
                    contentType = "Mention",
                    content = "Bob Smith",
                    properties = new { userId = "bob_s" }
                },
                new { contentType = "Text", content = " - Update database schema" }
            }
        },
        new
        {
            id = "task-3",
            blockType = "Checklist",
            properties = new { isChecked = true },
            content = new List<object>
            {
                new 
                { 
                    contentType = "Mention",
                    content = "Carol Williams",
                    properties = new { userId = "carol_w" }
                },
                new { contentType = "Text", content = " - Deploy to staging (Completed)" }
            }
        }
    };
    
    ViewBag.TeamMembers = teamMembers;
    ViewBag.BlocksData = blocks;
    
    return View();
}
```

**View:**

```razor
@using YourApp.Models

@{
    var teamMembers = ViewBag.TeamMembers as List<UserModel>;
    var blocks = ViewBag.BlocksData;
}

<div id="collaboration-editor-container">
    <h2>Collaborative Document Editor</h2>
    <p>Type <strong>@</strong> to mention team members</p>
    
    <ejs-blockeditor id="collaboration-editor" 
                     users="@teamMembers"
                     blocks="@blocks"
                     height="600px">
        <e-blockeditor-toolbarsettings 
            enable="true"
            items="@(new string[] { 
                "Bold", "Italic", "Underline",
                "OrderedList", "UnorderedList",
                "Undo", "Redo"
            })">
        </e-blockeditor-toolbarsettings>
    </ejs-blockeditor>
</div>

<style>
    #collaboration-editor-container {
        margin: 20px auto;
        max-width: 1000px;
        padding: 20px;
        background: #ffffff;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    
    #collaboration-editor-container h2 {
        color: #1e293b;
        margin-bottom: 10px;
    }
    
    #collaboration-editor-container p {
        color: #64748b;
        margin-bottom: 20px;
    }
    
    /* Custom mention styling */
    .team-mention {
        background-color: #e0f2fe;
        border-radius: 3px;
        padding: 2px 4px;
        font-weight: 500;
        color: #0369a1;
    }
    
    .team-mention:hover {
        background-color: #bae6fd;
    }
</style>
```

### Styling User Mentions

Customize mention appearance with CSS:

```css
/* Mention chip styling */
.e-mention {
    background-color: #e3f2fd;
    border-radius: 12px;
    padding: 2px 8px;
    font-weight: 500;
    color: #1976d2;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    transition: background-color 0.2s;
}

.e-mention:hover {
    background-color: #bbdefb;
    cursor: pointer;
}

/* Avatar in mention */
.e-mention .e-mention-avatar {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: inline-block;
}

/* Custom mention colors by user */
.user-mention.alice {
    background-color: #e8f5e9;
    color: #2e7d32;
}

.user-mention.bob {
    background-color: #e3f2fd;
    color: #1565c0;
}

.user-mention.carol {
    background-color: #fff3e0;
    color: #e65100;
}
```

### Without Avatar URLs (Using Initials)

When `avatarUrl` is not provided, the mention displays user initials:

```csharp
var users = new List<UserModel>
{
    new UserModel
    {
        id = "user1",
        user = "Alice Johnson",       // Shows "AJ" initials
        avatarBgColor = "#4caf50",
        cssClass = "user-mention"
    },
    new UserModel
    {
        id = "user2",
        user = "Bob Smith",            // Shows "BS" initials
        avatarBgColor = "#2196f3",
        cssClass = "user-mention"
    }
};
```

### Dynamic User Loading

Load users dynamically from a database or API:

```csharp
public async Task<IActionResult> MentionsWithDatabase()
{
    // Load users from database
    var users = await _context.Users
        .Where(u => u.IsActive)
        .Select(u => new UserModel
        {
            id = u.Id.ToString(),
            user = $"{u.FirstName} {u.LastName}",
            avatarUrl = u.ProfileImageUrl,
            avatarBgColor = u.AvatarColor ?? "#2196f3",
            cssClass = "user-mention"
        })
        .ToListAsync();
    
    ViewBag.Users = users;
    return View();
}
```

### Mention Use Cases

1. **Team Collaboration** - Assign tasks and tag team members
2. **Document Reviews** - Request reviews from specific users
3. **Meeting Notes** - Record attendees and action items
4. **Task Management** - Assign and track responsibilities
5. **Knowledge Base** - Reference subject matter experts
6. **Project Documentation** - Identify stakeholders and contributors

### CollapsibleParagraph

Expandable paragraph block:

```csharp
new BlockModel
{
    id = "collapsible-para",
    blockType = "CollapsibleParagraph",
    content = new List<object>
    {
        new { contentType = "Text", content = "Toggle paragraph" }
    },
    properties = new
    {
        isExpanded = false,  // Initially collapsed
        children = new List<BlockModel>
        {
            new BlockModel
            {
                blockType = "Paragraph",
                content = new List<object>
                {
                    new { contentType = "Text", content = "Hidden paragraph content" }
                }
            }
        }
    }
}
```

### Quote Block with Children

Quote with nested content blocks:

```csharp
new BlockModel
{
    id = "quote-nested",
    blockType = "Quote",
    properties = new
    {
        children = new List<BlockModel>
        {
            new BlockModel
            {
                blockType = "Paragraph",
                content = new List<object>
                {
                    new { contentType = "Text", content = "\"To be or not to be\"" }
                }
            },
            new BlockModel
            {
                blockType = "Paragraph",
                content = new List<object>
                {
                    new { contentType = "Text", content = "— William Shakespeare" }
                }
            }
        }
    }
}
```

### Callout Block with Children

Callout with nested structured content:

```csharp
new BlockModel
{
    id = "callout-nested",
    blockType = "Callout",
    properties = new
    {
        type = "warning",
        children = new List<BlockModel>
        {
            new BlockModel
            {
                blockType = "Heading",
                properties = new { level = 3 },
                content = new List<object>
                {
                    new { contentType = "Text", content = "Warning Title" }
                }
            },
            new BlockModel
            {
                blockType = "Paragraph",
                content = new List<object>
                {
                    new { contentType = "Text", content = "This action cannot be undone." }
                }
            },
            new BlockModel
            {
                blockType = "BulletList",
                content = new List<object>
                {
                    new { contentType = "Text", content = "Consequence 1" }
                }
            }
        }
    }
}
```

## Label Insertion

Configure labels (tags) that users can insert using a trigger character (default: `$`).

### Configure Label Settings

Use `e-blockeditor-labelsettings` to define available labels:

```csharp
public class LabelItemModel
{
    public string Id { get; set; }
    public string Text { get; set; }
    public string LabelColor { get; set; }
    public string IconCss { get; set; }
    public string GroupBy { get; set; }
}

public IActionResult LabelsEditor()
{
    var labels = new List<object>
    {
        new 
        {
            id = "bug",
            text = "Bug",
            labelColor = "#dc2626",
            iconCss = "e-icons e-bug",
            groupBy = "Issue Type"
        },
        new 
        {
            id = "feature",
            text = "Feature",
            labelColor = "#2563eb",
            iconCss = "e-icons e-star",
            groupBy = "Issue Type"
        },
        new 
        {
            id = "urgent",
            text = "Urgent",
            labelColor = "#ea580c",
            iconCss = "e-icons e-warning",
            groupBy = "Priority"
        },
        new 
        {
            id = "important",
            text = "Important",
            labelColor = "#ca8a04",
            iconCss = "e-icons e-bookmark",
            groupBy = "Priority"
        },
        new 
        {
            id = "low",
            text = "Low Priority",
            labelColor = "#65a30d",
            iconCss = "e-icons e-arrow-down",
            groupBy = "Priority"
        }
    };
    
    ViewBag.Labels = labels;
    return View();
}
```

**View:**

```razor
@{
    var labels = ViewBag.Labels;
}

<ejs-blockeditor id="labels-editor" height="500px">
    <e-blockeditor-labelsettings 
        triggerChar="$"
        items="@labels">
    </e-blockeditor-labelsettings>
</ejs-blockeditor>
```

### Label Settings Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `items` | LabelItemModel[] | *(predefined labels)* | Array of available label items |
| `triggerChar` | string | "$" | Character that triggers the label picker |

### LabelItemModel Properties

| Property | Type | Description |
|----------|------|-------------|
| `id` | string | Unique identifier for the label |
| `text` | string | Display text for the label |
| `labelColor` | string | Color of the label (hex code) |
| `iconCss` | string | Icon CSS class for the label |
| `groupBy` | string | Group header for organizing labels |

### Using Labels in Content

Users type the trigger character (`$` by default) to open the label picker:

```csharp
// Create content with labels
new BlockModel
{
    id = "task-with-label",
    blockType = "Paragraph",
    content = new List<object>
    {
        new { contentType = "Text", content = "Task: Fix login issue " },
        new 
        { 
            contentType = "Label",
            content = "Bug",
            properties = new { labelId = "bug" }
        },
        new { contentType = "Text", content = " " },
        new 
        { 
            contentType = "Label",
            content = "Urgent",
            properties = new { labelId = "urgent" }
        }
    }
}
```

### Custom Trigger Character

Change the trigger character to something else:

```razor
<ejs-blockeditor id="block-editor">
    <e-blockeditor-labelsettings 
        triggerChar="#"
        items="@ViewBag.Labels">
    </e-blockeditor-labelsettings>
</ejs-blockeditor>
```

Now users type `#` to insert labels instead of `$`.

### Project Management Labels

Configure labels for project management:

```csharp
public IActionResult ProjectLabelsEditor()
{
    var projectLabels = new List<object>
    {
        // Status Labels
        new { id = "todo", text = "To Do", labelColor = "#6b7280", iconCss = "e-icons e-circle", groupBy = "Status" },
        new { id = "inprogress", text = "In Progress", labelColor = "#3b82f6", iconCss = "e-icons e-refresh", groupBy = "Status" },
        new { id = "done", text = "Done", labelColor = "#10b981", iconCss = "e-icons e-check", groupBy = "Status" },
        new { id = "blocked", text = "Blocked", labelColor = "#ef4444", iconCss = "e-icons e-close", groupBy = "Status" },
        
        // Priority Labels
        new { id = "p1", text = "P1 - Critical", labelColor = "#dc2626", iconCss = "e-icons e-warning", groupBy = "Priority" },
        new { id = "p2", text = "P2 - High", labelColor = "#ea580c", iconCss = "e-icons e-arrow-up", groupBy = "Priority" },
        new { id = "p3", text = "P3 - Medium", labelColor = "#f59e0b", iconCss = "e-icons e-minus", groupBy = "Priority" },
        new { id = "p4", text = "P4 - Low", labelColor = "#84cc16", iconCss = "e-icons e-arrow-down", groupBy = "Priority" },
        
        // Category Labels
        new { id = "frontend", text = "Frontend", labelColor = "#06b6d4", iconCss = "e-icons e-web", groupBy = "Category" },
        new { id = "backend", text = "Backend", labelColor = "#8b5cf6", iconCss = "e-icons e-server", groupBy = "Category" },
        new { id = "database", text = "Database", labelColor = "#f97316", iconCss = "e-icons e-database", groupBy = "Category" },
        new { id = "testing", text = "Testing", labelColor = "#14b8a6", iconCss = "e-icons e-test", groupBy = "Category" }
    };
    
    ViewBag.ProjectLabels = projectLabels;
    return View();
}
```

**View:**

```razor
@{
    var projectLabels = ViewBag.ProjectLabels;
}

<div id="project-editor-container">
    <h2>Project Management Editor</h2>
    <p>Type <strong>$</strong> to add labels/tags to your tasks</p>
    
    <ejs-blockeditor id="project-editor" height="600px">
        <e-blockeditor-labelsettings 
            triggerChar="$"
            items="@projectLabels">
        </e-blockeditor-labelsettings>
    </ejs-blockeditor>
</div>

<style>
    #project-editor-container {
        margin: 20px auto;
        max-width: 1000px;
        padding: 20px;
        background: #ffffff;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    
    /* Custom label styling */
    .e-label {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        padding: 2px 8px;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 600;
        margin: 0 2px;
    }
</style>
```

### Complete Label Configuration Example

```csharp
public IActionResult CompleteLabelsEditor()
{
    var allLabels = new List<object>
    {
        // Issue Types
        new { id = "bug", text = "🐛 Bug", labelColor = "#ef4444", iconCss = "e-icons e-bug", groupBy = "Type" },
        new { id = "feature", text = "✨ Feature", labelColor = "#3b82f6", iconCss = "e-icons e-star", groupBy = "Type" },
        new { id = "docs", text = "📚 Documentation", labelColor = "#6366f1", iconCss = "e-icons e-file-text", groupBy = "Type" },
        new { id = "refactor", text = "♻️ Refactor", labelColor = "#8b5cf6", iconCss = "e-icons e-refresh", groupBy = "Type" },
        
        // Priority
        new { id = "critical", text = "Critical", labelColor = "#991b1b", iconCss = "e-icons e-warning", groupBy = "Priority" },
        new { id = "high", text = "High", labelColor = "#dc2626", iconCss = "e-icons e-arrow-up", groupBy = "Priority" },
        new { id = "medium", text = "Medium", labelColor = "#f59e0b", iconCss = "e-icons e-minus", groupBy = "Priority" },
        new { id = "low", text = "Low", labelColor = "#10b981", iconCss = "e-icons e-arrow-down", groupBy = "Priority" },
        
        // Status
        new { id = "todo", text = "To Do", labelColor = "#64748b", iconCss = "e-icons e-circle", groupBy = "Status" },
        new { id = "wip", text = "In Progress", labelColor = "#3b82f6", iconCss = "e-icons e-clock", groupBy = "Status" },
        new { id = "review", text = "In Review", labelColor = "#f59e0b", iconCss = "e-icons e-eye", groupBy = "Status" },
        new { id = "completed", text = "Completed", labelColor = "#10b981", iconCss = "e-icons e-check-circle", groupBy = "Status" },
        
        // Team
        new { id = "frontend-team", text = "Frontend", labelColor = "#06b6d4", iconCss = "e-icons e-code", groupBy = "Team" },
        new { id = "backend-team", text = "Backend", labelColor = "#8b5cf6", iconCss = "e-icons e-server", groupBy = "Team" },
        new { id = "devops-team", text = "DevOps", labelColor = "#f97316", iconCss = "e-icons e-settings", groupBy = "Team" }
    };
    
    // Initial content with labels
    var blocks = new List<object>
    {
        new
        {
            id = "task-1",
            blockType = "Checklist",
            properties = new { isChecked = false },
            content = new List<object>
            {
                new { contentType = "Text", content = "Fix authentication bug " },
                new { contentType = "Label", content = "Bug", properties = new { labelId = "bug" } },
                new { contentType = "Text", content = " " },
                new { contentType = "Label", content = "Critical", properties = new { labelId = "critical" } },
                new { contentType = "Text", content = " " },
                new { contentType = "Label", content = "Backend", properties = new { labelId = "backend-team" } }
            }
        }
    };
    
    ViewBag.AllLabels = allLabels;
    ViewBag.BlocksData = blocks;
    
    return View();
}
```

### Label Use Cases

1. **Issue Tracking** - Categorize bugs, features, and tasks
2. **Project Management** - Track status and priority
3. **Content Organization** - Tag content by topic or category
4. **Team Collaboration** - Assign work to teams
5. **Documentation** - Classify documentation sections
6. **Knowledge Management** - Organize knowledge base articles

All menu features work together to provide a comprehensive editing interface that enhances user productivity and content creation efficiency.

## Block Properties

### Common Properties

```csharp
public class BlockModel
{
    public string id { get; set; }              // Unique identifier
    public string blockType { get; set; }       // Type of block (Paragraph, Heading, etc.)
    public object properties { get; set; }      // Block-specific properties (level, isExpanded, etc.)
    public List<object> content { get; set; }   // Text content
    public int indent { get; set; }             // Indentation level (0-n)
    public string CssClass { get; set; }        // Custom CSS class
}
```

### Property Examples by Block Type

**Heading:**
```csharp
properties = new { level = 2 }  // level: 1, 2, 3, 4
```

**Checklist:**
```csharp
properties = new { isChecked = true }  // true or false
```

**CollapsibleHeading:**
```csharp
properties = new
{
    level = 1,              // 1, 2, 3, 4
    isExpanded = true,      // true or false
    placeholder = "Click to expand"
}
```

**CollapsibleParagraph:**
```csharp
properties = new
{
    isExpanded = false,
    placeholder = "Toggle content"
}
```

**Callout:**
```csharp
properties = new
{
    type = "info"  // "info", "warning", "error", "success"
}
```

## Indentation

Set indentation level for nested content:

```csharp
new BlockModel
{
    id = "indent-0",
    blockType = "Paragraph",
    indent = 0,
    content = new List<object> { new { contentType = "Text", content = "No indentation" } }
}

new BlockModel
{
    id = "indent-1",
    blockType = "Paragraph",
    indent = 1,
    content = new List<object> { new { contentType = "Text", content = "One level indent" } }
}

new BlockModel
{
    id = "indent-2",
    blockType = "Paragraph",
    indent = 2,
    content = new List<object> { new { contentType = "Text", content = "Two levels indent" } }
}
```

## CSS Class Customization

Apply custom CSS classes to blocks:

```csharp
new BlockModel
{
    id = "styled-para",
    blockType = "Paragraph",
    CssClass = "info-block highlight",
    content = new List<object>
    {
        new { contentType = "Text", content = "This block has custom styling" }
    }
}

new BlockModel
{
    id = "warning-block",
    blockType = "Paragraph",
    CssClass = "warning-block",
    content = new List<object>
    {
        new { contentType = "Text", content = "Warning message" }
    }
}
```

**CSS Styling:**
```css
.e-block.info-block {
    background-color: #e6f3ff;
    border-left: 4px solid #007bff;
    padding: 10px;
    color: #004085;
}

.e-block.warning-block {
    background-color: #fff8e1;
    border-left: 4px solid #ffc107;
    padding: 10px;
    color: #856404;
}

.e-block.highlight {
    font-weight: bold;
    text-decoration: underline;
}
```

## Placeholder Configuration

Set custom placeholder text for empty blocks:

```csharp
new BlockModel
{
    id = "collapsible-custom",
    blockType = "CollapsibleHeading",
    properties = new
    {
        level = 1,
        isExpanded = false,
        placeholder = "Enter section title here",
        children = new List<BlockModel>()
    }
}

new BlockModel
{
    id = "collapsible-para-custom",
    blockType = "CollapsibleParagraph",
    properties = new
    {
        isExpanded = false,
        placeholder = "Click to expand and add content",
        children = new List<BlockModel>()
    }
}
```

## Block Templates

Create custom block templates for specialized layouts:

```csharp
new BlockModel
{
    id = "template-1",
    blockType = "Template",
    Template = @"
        <div class='notification-card'>
            <div class='notification-header'>
                <span class='notification-icon'>📢</span>
                <h3 class='notification-title'>Important Announcement</h3>
            </div>
            <div class='notification-content'>
                <p>System maintenance scheduled for Saturday.</p>
            </div>
        </div>"
}
```

## Block Usage in View

Complete Razor example:

```razor
@using Syncfusion.EJ2.BlockEditor

<div id='blockeditor-container'>
    <ejs-blockeditor id="block-editor" blocks="@ViewBag.BlocksData"></ejs-blockeditor>
</div>

<style>
    #blockeditor-container {
        margin: 20px auto;
        max-width: 900px;
    }
    
    .e-block.info-block {
        background-color: #e6f3ff;
        border-left: 4px solid #007bff;
        padding: 10px;
    }
</style>
```

All blocks work seamlessly together in the editor, allowing users to combine different block types to create rich, structured documents with drag-and-drop reordering and intuitive editing.
