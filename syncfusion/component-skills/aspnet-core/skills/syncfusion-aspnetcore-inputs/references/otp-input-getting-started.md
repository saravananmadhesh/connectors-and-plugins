# Getting Started with OTP Input in ASP.NET Core

## Table of Contents
- [Prerequisites](#prerequisites)
- [NuGet Installation](#nuget-installation)
- [TagHelper Registration](#taghelper-registration)
- [CDN Resources](#cdn-resources)
- [Basic OTP Input](#basic-otp-input)
- [First Example](#first-example)

## Prerequisites

Before implementing OTP Input, ensure you have:
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

## Basic OTP Input

Create your first OTP Input in a Razor view using TagHelper syntax:

```html
<!-- Views/Home/Index.cshtml -->
<ejs-otpinput id="otpInput">
</ejs-otpinput>
```

### OTP Input with Length

```html
<!-- 6-digit OTP (default is 4) -->
<ejs-otpinput id="otpInput" length="6">
</ejs-otpinput>
```

This creates an OTP Input with:
- 6 input fields for digits
- Automatic focus management between fields
- Support for various input types (numeric, alphanumeric)

## First Example

### Complete Starter Page

Create a complete page with OTP Input examples in `Views/Home/Index.cshtml`:

```html
<!-- Views/Home/Index.cshtml -->
@{
    ViewBag.Title = "OTP Input Demo";
}

<div style="padding: 20px; max-width: 600px;">
    <h2>OTP Input Examples</h2>

    <!-- Basic 4-digit OTP -->
    <div style="margin-bottom: 30px;">
        <h3>4-Digit OTP (Default)</h3>
        <label>Enter OTP:</label>
        <ejs-otpinput id="otp4">
        </ejs-otpinput>
    </div>

    <!-- 6-digit OTP (Email/SMS standard) -->
    <div style="margin-bottom: 30px;">
        <h3>6-Digit OTP</h3>
        <label>Enter OTP sent to your email:</label>
        <ejs-otpinput id="otp6" length="6">
        </ejs-otpinput>
    </div>

    <!-- 8-digit OTP (High security) -->
    <div style="margin-bottom: 30px;">
        <h3>8-Digit OTP</h3>
        <label>Enter OTP for high security:</label>
        <ejs-otpinput id="otp8" length="8">
        </ejs-otpinput>
    </div>

    <!-- Alphanumeric OTP -->
    <div style="margin-bottom: 30px;">
        <h3>Alphanumeric OTP</h3>
        <label>Enter alphanumeric code:</label>
        <ejs-otpinput id="otpAlphanumeric" 
            length="4" 
            type="text">
        </ejs-otpinput>
    </div>

    <!-- Auto-focused OTP -->
    <div style="margin-bottom: 30px;">
        <h3>Auto-Focused OTP</h3>
        <label>OTP input is automatically focused:</label>
        <ejs-otpinput id="otpAutoFocus" 
            length="6" 
            autoFocus="true">
        </ejs-otpinput>
    </div>

    <!-- Disabled OTP -->
    <div style="margin-bottom: 30px;">
        <h3>Disabled OTP</h3>
        <label>This OTP input is disabled:</label>
        <ejs-otpinput id="otpDisabled" 
            length="4" 
            enabled="false">
        </ejs-otpinput>
    </div>

    <button onclick="submitOTP()" style="padding: 10px 20px; margin-top: 20px;">
        Verify OTP
    </button>
</div>

@section scripts {
    <ejs-scripts></ejs-scripts>
    <script>
        function submitOTP() {
            const otp = document.getElementById('otp6').ej2_instances[0].value;
            console.log('OTP entered:', otp);
        }
    </script>
}
```

### Running the Application

1. Build and run your ASP.NET Core application
2. Navigate to the page where you added the OTP Input
3. The OTP Input will render with individual input fields
4. Type a digit in each field (auto-advances to next field)
5. Use Tab/Shift+Tab to navigate between fields
6. Delete key removes digit and moves to previous field

## Next Steps

- **Explore Configuration:** See [otp-input-configuration.md](otp-input-configuration.md)
- **Handle Events:** Learn about events in [otp-input-events.md](otp-input-events.md)
- **Accessibility:** See [otp-input-accessibility.md](otp-input-accessibility.md)
- **API Reference:** See [otp-input-api.md](otp-input-api.md)
