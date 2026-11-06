# Getting Started with TextArea in ASP.NET Core

## Table of Contents
- [Prerequisites](#prerequisites)
- [NuGet Installation](#nuget-installation)
- [TagHelper Registration](#taghelper-registration)
- [CDN Resources](#cdn-resources)
- [Basic TextArea](#basic-textarea)
- [First Example](#first-example)

## Prerequisites

Before implementing TextArea, ensure you have:
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

## Basic TextArea

Create your first TextArea in a Razor view using TagHelper syntax:

```html
<!-- Views/Home/Index.cshtml -->
<ejs-textarea id="textarea">
</ejs-textarea>
```

### TextArea with Placeholder

```html
<ejs-textarea id="textarea" placeholder="Enter your comments">
</ejs-textarea>
```

This creates a TextArea with:
- Default height and width
- Placeholder text guidance
- Full multiline text input support

## First Example

### Complete Starter Page

Create a complete page with TextArea examples in `Views/Home/Index.cshtml`:

```html
<!-- Views/Home/Index.cshtml -->
@{
    ViewBag.Title = "TextArea Demo";
}

<div style="padding: 20px; max-width: 600px;">
    <h2>TextArea Examples</h2>

    <!-- Basic TextArea -->
    <div style="margin-bottom: 20px;">
        <label for="basic">Basic TextArea:</label>
        <ejs-textarea id="basic">
        </ejs-textarea>
    </div>

    <!-- TextArea with Placeholder -->
    <div style="margin-bottom: 20px;">
        <label for="withPlaceholder">With Placeholder:</label>
        <ejs-textarea id="withPlaceholder" placeholder="Enter your comments here...">
        </ejs-textarea>
    </div>

    <!-- TextArea with Rows/Columns -->
    <div style="margin-bottom: 20px;">
        <label for="sized">Sized TextArea (5 rows, 50 cols):</label>
        <ejs-textarea id="sized" rows="5" cols="50">
        </ejs-textarea>
    </div>

    <!-- TextArea with Max Length -->
    <div style="margin-bottom: 20px;">
        <label for="maxLength">Max Length (200 chars):</label>
        <ejs-textarea id="maxLength" maxLength="200" placeholder="Maximum 200 characters">
        </ejs-textarea>
    </div>

    <!-- TextArea with Floating Label -->
    <div style="margin-bottom: 20px;">
        <label for="floating">With Floating Label:</label>
        <ejs-textarea id="floating" placeholder="Enter your feedback" floatLabelType="Auto">
        </ejs-textarea>
    </div>

    <!-- Disabled TextArea -->
    <div style="margin-bottom: 20px;">
        <label for="disabled">Disabled TextArea:</label>
        <ejs-textarea id="disabled" placeholder="This is disabled" enabled="false">
        </ejs-textarea>
    </div>

    <!-- Read-only TextArea -->
    <div style="margin-bottom: 20px;">
        <label for="readonly">Read-only TextArea:</label>
        <ejs-textarea id="readonly" readonly="true" value="This is read-only content. You can select but not edit.">
        </ejs-textarea>
    </div>

    <!-- Pre-filled TextArea -->
    <div style="margin-bottom: 20px;">
        <label for="prefilled">Pre-filled TextArea:</label>
        <ejs-textarea id="prefilled" value="This TextArea has pre-filled content.">
        </ejs-textarea>
    </div>
</div>

@section scripts {
    <ejs-scripts></ejs-scripts>
}
```

### Running the Application

1. Build and run your ASP.NET Core application
2. Navigate to the page where you added the TextArea
3. The TextArea will render as a multiline text input
4. Type text directly into the field
5. Resizable handle appears at bottom-right corner

## Next Steps

- **Explore Events:** See [textarea-events.md](textarea-events.md)
- **Max Length:** Learn about character limits in [textarea-max-length.md](textarea-max-length.md)
- **Form Integration:** Discover form support in [textarea-form-support.md](textarea-form-support.md)
- **Floating Labels:** See [textarea-floating-label.md](textarea-floating-label.md)
- **API Reference:** See [textarea-api.md](textarea-api.md)
