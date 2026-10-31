# Getting Started with NumericTextBox in ASP.NET Core

## Table of Contents
- [Prerequisites](#prerequisites)
- [NuGet Installation](#nuget-installation)
- [TagHelper Registration](#taghelper-registration)
- [CDN Resources](#cdn-resources)
- [Basic NumericTextBox](#basic-numerictextbox)
- [First Example](#first-example)

## Prerequisites

Before implementing NumericTextBox, ensure you have:
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

## Basic NumericTextBox

Create your first NumericTextBox in a Razor view using TagHelper syntax:

```html
<!-- Views/Home/Index.cshtml -->
<ejs-numerictextbox id="numericTextBox">
</ejs-numerictextbox>
```

### Minimal NumericTextBox with Value

```html
<ejs-numerictextbox id="numericTextBox" value="10">
</ejs-numerictextbox>
```

This creates a NumericTextBox with:
- Default value: 10
- Spinner buttons enabled by default
- Full input validation

## First Example

### Complete Starter Page

Create a complete page with NumericTextBox in `Views/Home/Index.cshtml`:

```html
<!-- Views/Home/Index.cshtml -->
@{
    ViewBag.Title = "NumericTextBox Demo";
}

<div style="padding: 20px; max-width: 600px;">
    <h2>NumericTextBox Examples</h2>

    <!-- Basic NumericTextBox -->
    <div style="margin-bottom: 20px;">
        <label for="basic">Basic NumericTextBox:</label>
        <ejs-numerictextbox id="basic" value="10">
        </ejs-numerictextbox>
    </div>

    <!-- NumericTextBox with Placeholder -->
    <div style="margin-bottom: 20px;">
        <label for="withPlaceholder">With Placeholder:</label>
        <ejs-numerictextbox id="withPlaceholder" placeholder="Enter a number">
        </ejs-numerictextbox>
    </div>

    <!-- NumericTextBox with Min and Max -->
    <div style="margin-bottom: 20px;">
        <label for="withRange">With Min/Max (0-100):</label>
        <ejs-numerictextbox id="withRange" value="50" min="0" max="100">
        </ejs-numerictextbox>
    </div>

    <!-- NumericTextBox with Decimal Places -->
    <div style="margin-bottom: 20px;">
        <label for="withDecimals">With 2 Decimal Places:</label>
        <ejs-numerictextbox id="withDecimals" value="10.5" decimals="2">
        </ejs-numerictextbox>
    </div>

    <!-- Currency Format NumericTextBox -->
    <div style="margin-bottom: 20px;">
        <label for="currency">Currency Format (USD):</label>
        <ejs-numerictextbox id="currency" value="99.99" format="c2" currency="USD">
        </ejs-numerictextbox>
    </div>

    <!-- Percentage Format -->
    <div style="margin-bottom: 20px;">
        <label for="percentage">Percentage Format:</label>
        <ejs-numerictextbox id="percentage" value="0.5" format="p">
        </ejs-numerictextbox>
    </div>

    <!-- Disabled NumericTextBox -->
    <div style="margin-bottom: 20px;">
        <label for="disabled">Disabled NumericTextBox:</label>
        <ejs-numerictextbox id="disabled" value="15" enabled="false">
        </ejs-numerictextbox>
    </div>

    <!-- Read-only NumericTextBox -->
    <div style="margin-bottom: 20px;">
        <label for="readonly">Read-only NumericTextBox:</label>
        <ejs-numerictextbox id="readonly" value="20" readonly="true">
        </ejs-numerictextbox>
    </div>
</div>

@section scripts {
    <ejs-scripts></ejs-scripts>
}
```

### Running the Application

1. Build and run your ASP.NET Core application
2. Navigate to the page where you added the NumericTextBox
3. The NumericTextBox will render with spinner buttons
4. Click the up/down arrows to increment/decrement values
5. Type numbers directly into the field
6. Min/Max validation prevents out-of-range values

## Next Steps

- **Explore Formats:** See [numeric-textbox-formats-and-validation.md](numeric-textbox-formats-and-validation.md)
- **Add Validation:** Learn about validation in [numeric-textbox-formats-and-validation.md](numeric-textbox-formats-and-validation.md)
- **Customize Appearance:** Visit [numeric-textbox-adornments-and-styling.md](numeric-textbox-adornments-and-styling.md)
- **API Reference:** See [numeric-textbox-api.md](numeric-textbox-api.md)
