# Getting Started with Syncfusion ASP.NET MVC EJ2

## Overview
This guide provides step-by-step instructions for creating and configuring ASP.NET MVC 5 applications with Syncfusion EJ2 components using HTML Helpers.

---

## Prerequisites

- **Visual Studio**: 2015 or later
- **.NET Framework**: 4.5.2 or later
- **ASP.NET MVC**: Version 5
- System requirements per [Syncfusion documentation](https://ej2.syncfusion.com/aspnetmvc/documentation/system-requirements)

---

## Installation & Setup

### Step 1: Create ASP.NET MVC 5 Project

1. Open **Visual Studio**
2. File → New → Project
3. Under Visual C#, select **Web**
4. Choose **ASP.NET Web Application (.NET Framework)**
5. Name your project and click OK
6. In the template selection dialog, choose **MVC**
7. Click OK

### Step 2: Install Syncfusion.EJ2.MVC5 NuGet Package

#### Option A: NuGet Package Manager UI
1. Tools → NuGet Package Manager → Manage NuGet Packages for Solution
2. Click "Browse" tab
3. Search for `Syncfusion.EJ2.MVC5`
4. Select version 33.1.44 (or latest)
5. Click Install
6. Accept the license agreement

#### Option B: Package Manager Console
```powershell
Install-Package Syncfusion.EJ2.MVC5 -Version 33.1.44
```

**Auto-installed Dependencies:**
- `Newtonsoft.Json` (JSON serialization)
- `Syncfusion.Licensing` (license validation)

✓ **All three packages MUST have matching versions**

### Step 3: Configure Web.config (Views Folder)

Open **`~/Web.config`** (located in the `Views` folder, NOT the root)

Add `Syncfusion.EJ2` namespace under `<pages>` → `<namespaces>`:

```xml
<configuration>
  <system.web>
    <compilation>
      <assemblies>
        <!-- Existing assemblies -->
      </assemblies>
    </compilation>
    <httpRuntime />
    
    <pages>
      <namespaces>
        <add namespace="System.Web.Mvc" />
        <add namespace="System.Web.Mvc.Ajax" />
        <add namespace="System.Web.Mvc.Html" />
        <add namespace="System.Web.Routing" />
        
        <!-- ADD THIS LINE -->
        <add namespace="Syncfusion.EJ2" />
        
      </namespaces>
    </pages>
  </system.web>
</configuration>
```

⚠️ **CRITICAL**: Add to `~/Views/Web.config`, NOT the root `Web.config`

### Step 4: Add Stylesheet and Script References

Open **`~/Views/Shared/_Layout.cshtml`** and add to the `<head>` section:

```html
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>@ViewBag.Title - Syncfusion ASP.NET MVC App</title>
    
    <!-- Existing stylesheets -->
    @Styles.Render("~/Content/css")
    
    <!-- Syncfusion EJ2 Controls Stylesheet -->
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/33.1.44/material.css" />
    
    <!-- Syncfusion EJ2 Controls Script -->
    <script src="https://cdn.syncfusion.com/ej2/33.1.44/dist/ej2.min.js"></script>
</head>
```

✓ **CDN version MUST match your Syncfusion.EJ2.MVC5 NuGet package version** (here: 33.1.44)

### Step 5: Register License Key

Open **`~/Global.asax.cs`** and add to the `Application_Start()` method:

```csharp
using Syncfusion.Licensing;

public class MvcApplication : System.Web.HttpApplication
{
    protected void Application_Start()
    {
        // Register Syncfusion License (BEFORE any control initialization)
        string licenseKey = Environment.GetEnvironmentVariable("SYNCFUSION_LICENSE") 
                           ?? "YOUR_FALLBACK_LICENSE_KEY";
        SyncfusionLicenseProvider.RegisterLicense(licenseKey);
        
        AreaRegistration.RegisterAllAreas();
        FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
        RouteConfig.RegisterRoutes(RouteTable.Routes);
        BundleConfig.RegisterBundles(BundleTable.Bundles);
    }
}
```

✓ **Use environment variables for production; never hardcode keys in code**

### Step 6: Register Script Manager

In **`~/Views/Shared/_Layout.cshtml`**, add at the **end of the `<body>` tag** (AFTER all content):

```html
<body>
    @RenderBody()
    
    <!-- Existing scripts -->
    @Scripts.Render("~/bundles/jquery")
    @Scripts.Render("~/bundles/bootstrap")
    
    <!-- Syncfusion Script Manager (must be LAST) -->
    @Html.EJS().ScriptManager()
</body>
```

⚠️ **CRITICAL**: ScriptManager MUST be placed at the end of body, after all controls and scripts

---

## Create Your First Control

### Add Calendar Control

Open **`~/Views/Home/Index.cshtml`** and add:

```html
@{
    ViewBag.Title = "Home Page";
}

<h2>Welcome to Syncfusion ASP.NET MVC</h2>

<div style="margin: 20px;">
    <h3>Calendar Control Example</h3>
    @Html.EJS().Calendar("calendar").Render()
</div>

<div style="margin: 20px;">
    <h3>Button Control Example</h3>
    @Html.EJS().Button("button").Content("Click Me!").Render()
</div>
```

### Run the Application

1. Press **Ctrl+F5** (Windows) or **⌘+F5** (macOS)
2. The Calendar and Button controls should render without errors
3. Verify responsive design and theme colors apply correctly

---

## Installation Verification Checklist

✓ NuGet packages installed:
  - Syncfusion.EJ2.MVC5 (version 33.1.44)
  - Newtonsoft.Json (matching version)
  - Syncfusion.Licensing (matching version)

✓ Namespace added to `~/Views/Web.config` (NOT root Web.config)

✓ CSS stylesheet added to `_Layout.cshtml` head (CDN version matches NuGet)

✓ Script tag added to `_Layout.cshtml` head (same version as CSS)

✓ License key registered in `Global.asax.cs` Application_Start()

✓ ScriptManager registered at end of `_Layout.cshtml` body

✓ At least one control renders without console errors

✓ Browser console shows no CSP, CORS, or 404 errors

---

## Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| **Namespace 'Syncfusion' not found** | Wrong Web.config edited | Edit `~/Views/Web.config`, not root `Web.config` |
| **Controls not rendering** | Missing ScriptManager | Add `@Html.EJS().ScriptManager()` at end of body in `_Layout.cshtml` |
| **Styles not applied** | CDN version mismatch | Ensure CSS CDN version matches NuGet package version |
| **License error in output** | License not registered | Register in `Global.asax.cs` `Application_Start()` |
| **Script errors in console** | Script loading order | Ensure ej2.min.js loads after jQuery/Bootstrap |
| **404 errors for CSS/JS** | Incorrect CDN URL | Verify version in CDN URL matches installed package |

### Troubleshooting Steps

1. **Clear browser cache**: Ctrl+Shift+Delete (Chrome), then F5 refresh
2. **Check browser console**: F12 → Console for specific error messages
3. **Verify NuGet versions**: Tools → NuGet Package Manager → Manage Packages
4. **Verify Web.config**: Edit `~/Views/Web.config`, check namespace exists
5. **Test simple control**: Add `@Html.EJS().Calendar("test").Render()` to verify basic setup
6. **Check Global.asax**: Ensure license registration runs without exception

---

## Security Best Practices

### License Key Management
- **Development**: Use environment variables or local settings
- **Production**: Store in Azure Key Vault or encrypted secrets manager
- **CI/CD**: Pass via secure pipeline variables, never hardcode
- **Never commit**: Exclude license keys from source control

### CSP Headers
- If implementing Content Security Policy, allowlist:
  - `https://cdn.syncfusion.com` (scripts and styles)
  - `https://fonts.googleapis.com` (Material/Tailwind themes)
  - `https://fonts.gstatic.com` (font files)

---

## Next Steps

1. **Configure Script References**: See [script-references.md](script-references.md) for CDN vs NPM vs CRG options
2. **Apply Themes**: Choose from Material, Bootstrap, Tailwind, Fluent, etc.
3. **Setup Localization**: See [localization-globalization.md](localization-globalization.md) for multi-language support
4. **Register License Securely**: Use environment variables or Key Vault
5. **Implement CSP**: See security skill if needed

---

## Official Resources

- [Syncfusion ASP.NET MVC Getting Started](https://ej2.syncfusion.com/aspnetmvc/documentation/getting-started/aspnet-mvc-htmlhelper)
- [Syncfusion NuGet Packages](https://www.nuget.org/packages?q=syncfusion.EJ2)
- [System Requirements](https://ej2.syncfusion.com/aspnetmvc/documentation/system-requirements)
- [License Registration](https://ej2.syncfusion.com/aspnetmvc/documentation/licensing/how-to-register-in-an-application)
Open **`~/Pages/_ViewImports.cshtml`** and add:
```csharp
@addTagHelper *, Syncfusion.EJ2
```

### Add Stylesheet and Script Resources

In **`~/Pages/Shared/_Layout.cshtml`**, add the following in the `<head>` section:
```html
<head>
    ...
    <!-- Syncfusion ASP.NET Core controls styles -->
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/33.1.44/fluent2.css" />
    <!-- Syncfusion ASP.NET Core controls scripts -->
    <script src="https://cdn.syncfusion.com/ej2/33.1.44/dist/ej2.min.js"></script>
</head>
```

**NOTE**: Installed package version and CDN version must be same.

Register the script manager at the end of the `<body>` section:
```html
<body>
    ...
    <!-- Syncfusion ASP.NET Core Script Manager -->
    <ejs-scripts></ejs-scripts>
</body>
```

### Example: Add Calendar Control

In **`~/Pages/Index.cshtml`**, add:
```html
<div>
    <ejs-calendar id="calendar"></ejs-calendar>
</div>
```
---

## Approach 2: Razor Pages (VS Code)

### Create ASP.NET Core Web Application

1. Create a new folder and open it in VS Code
2. Accept the trust prompt when asked
3. Open the Integrated Terminal: **View → Terminal**

### Generate Razor Pages Project

Run the following command in the terminal:
```bash
dotnet new webapp -o AspNetCoreWebApp
```

Open the project in VS Code:
```bash
code -r AspNetCoreWebApp
```

### Install Syncfusion Package

In the terminal, run:
```bash
dotnet add package Syncfusion.EJ2.AspNet.Core
```

### Add Syncfusion Tag Helper

Open **`~/Pages/_ViewImports.cshtml`** and add:
```csharp
@addTagHelper *, Syncfusion.EJ2
```

### Add Stylesheet and Script Resources

In **`~/Pages/Shared/_Layout.cshtml`**, add the following in the `<head>` section:
```html
<head>
    ...
    <!-- Syncfusion ASP.NET Core controls style -->
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/33.1.44/material.css" />
    <!-- Syncfusion ASP.NET Core controls script -->
    <script src="https://cdn.syncfusion.com/ej2/33.1.44/dist/ej2.min.js"></script>
</head>
```

**NOTE**: Installed package version and CDN version must be same.

Register the script manager at the end of the `<body>` section:
```html
<body>
    ...
    <!-- Syncfusion ASP.NET Core Script Manager -->
    <ejs-scripts></ejs-scripts>
</body>
```

### Example: Add Calendar Control

In **`~/Pages/Index.cshtml`**, add:
```html
<div>
    <ejs-calendar id="calendar"></ejs-calendar>
</div>
```

---

## Approach 3: ASP.NET Core MVC (HTML Helper)

### Create ASP.NET Core MVC Application

1. Create a new ASP.NET Core MVC project using:
   - Microsoft Templates: ASP.NET Core MVC Tutorial
   - Syncfusion Extension: Create Project via Extension

### Add Syncfusion Namespace

Open **`~/Views/_ViewImports.cshtml`** and add the namespace:
```csharp
@using Syncfusion.EJ2
@addTagHelper *, Microsoft.AspNetCore.Mvc.TagHelpers
```

### Add Stylesheet and Script Resources

In **`~/Views/Shared/_Layout.cshtml`**, add the following in the `<head>` section:
```html
<head>
    ...
    <!-- Syncfusion ASP.NET Core controls styles -->
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/33.1.44/material.css" />
    <!-- Syncfusion ASP.NET Core controls scripts -->
    <script src="https://cdn.syncfusion.com/ej2/33.1.44/dist/ej2.min.js"></script>
</head>
```

**NOTE**: Installed package version and CDN version must be same.

Register the script manager at the end of the `<body>` section:
```html
<body>
    ...
    <!-- Syncfusion Script Manager -->
    @Html.EJS().ScriptManager()
</body>
```

### Example: Add Calendar Control

In **`~/Views/Home/Index.cshtml`**, add:
```html
<div>
   @Html.EJS().Calendar("calendar").Render()
</div>
```

Press **Ctrl+F5** (Windows) or **⌘+F5** (macOS) to run the application. The Calendar control will render in the default web browser.

---

## Comparison of Approaches

| Feature | Razor Pages (VS) | Razor Pages (VS Code) | MVC (HTML Helper) |
|---------|------------------|-----------------------|-------------------|
| **IDE** | Visual Studio | Visual Studio Code | Visual Studio |
| **Syntax** | Tag Helper (`<ejs-calendar>`) | Tag Helper (`<ejs-calendar>`) | HTML Helper (`@Html.EJS()`) |
| **Configuration File** | `_ViewImports.cshtml` | `_ViewImports.cshtml` | `_ViewImports.cshtml` |
| **Markup Style** | XML-like | XML-like | C# method chaining |
| **Script Manager** | `<ejs-scripts>` | `<ejs-scripts>` | `@Html.EJS().ScriptManager()` |

---

