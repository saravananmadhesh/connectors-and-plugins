# Getting Started with TextBox in ASP.NET Core

## Table of Contents
- [Prerequisites](#prerequisites)
- [NuGet Installation](#nuget-installation)
- [TagHelper Registration](#taghelper-registration)
- [CDN Resources](#cdn-resources)
- [Basic TextBox](#basic-textbox)
- [First Example](#first-example)

## Prerequisites

Before implementing TextBox, ensure you have:
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

## Basic TextBox

Create your first TextBox in a Razor view using TagHelper syntax:

```html
<!-- Views/Home/Index.cshtml -->
<ejs-textbox id="textBox">
</ejs-textbox>
```

### TextBox with Placeholder

```html
<ejs-textbox id="textBox" placeholder="Enter text">
</ejs-textbox>
```

This creates a TextBox with:
- Single-line text input
- Placeholder text guidance
- Full input support

## First Example

### Complete Starter Page

Create a complete page with TextBox examples in `Views/Home/Index.cshtml`:

```html
<!-- Views/Home/Index.cshtml -->
@{
    ViewBag.Title = "TextBox Demo";
}

<div style="padding: 20px; max-width: 600px;">
    <h2>TextBox Examples</h2>

    <!-- Basic TextBox -->
    <div style="margin-bottom: 20px;">
        <label for="basic">Basic TextBox:</label>
        <ejs-textbox id="basic">
        </ejs-textbox>
    </div>

    <!-- TextBox with Placeholder -->
    <div style="margin-bottom: 20px;">
        <label for="withPlaceholder">With Placeholder:</label>
        <ejs-textbox id="withPlaceholder" placeholder="Enter your name">
        </ejs-textbox>
    </div>

    <!-- TextBox with Value -->
    <div style="margin-bottom: 20px;">
        <label for="withValue">Pre-filled TextBox:</label>
        <ejs-textbox id="withValue" value="John Doe">
        </ejs-textbox>
    </div>

    <!-- TextBox with Floating Label -->
    <div style="margin-bottom: 20px;">
        <label for="floating">With Floating Label:</label>
        <ejs-textbox id="floating" placeholder="Enter text" floatLabelType="Auto">
        </ejs-textbox>
    </div>

    <!-- Disabled TextBox -->
    <div style="margin-bottom: 20px;">
        <label for="disabled">Disabled TextBox:</label>
        <ejs-textbox id="disabled" placeholder="This is disabled" enabled="false">
        </ejs-textbox>
    </div>

    <!-- Read-only TextBox -->
    <div style="margin-bottom: 20px;">
        <label for="readonly">Read-only TextBox:</label>
        <ejs-textbox id="readonly" value="Read-only content" readonly="true">
        </ejs-textbox>
    </div>

    <!-- TextBox with Type Email -->
    <div style="margin-bottom: 20px;">
        <label for="email">Email TextBox:</label>
        <ejs-textbox id="email" type="email" placeholder="Enter email">
        </ejs-textbox>
    </div>

    <!-- TextBox with Type Password -->
    <div style="margin-bottom: 20px;">
        <label for="password">Password TextBox:</label>
        <ejs-textbox id="password" type="password" placeholder="Enter password">
        </ejs-textbox>
    </div>
</div>

@section scripts {
    <ejs-scripts></ejs-scripts>
}
```

### Running the Application

1. Build and run your ASP.NET Core application
2. Navigate to the page where you added the TextBox
3. The TextBox will render as a single-line text input
4. Type text directly into the field
5. Floating label (if enabled) animates on focus

## Next Steps

- **Explore Events:** See [textbox-events.md](textbox-events.md)
- **Add Validation:** Learn about validation in [textbox-form-support.md](textbox-form-support.md)
- **Customize Appearance:** Visit [textbox-style-and-customization.md](textbox-style-and-customization.md)
- **API Reference:** See [textbox-api.md](textbox-api.md)
