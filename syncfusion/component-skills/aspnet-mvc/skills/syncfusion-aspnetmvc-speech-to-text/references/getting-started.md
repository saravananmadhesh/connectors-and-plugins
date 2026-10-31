# Getting Started

## Table of Contents
- [Installation](#installation)
- [NuGet Package Setup](#nuget-package-setup)
- [Web.config Configuration](#webconfig-configuration)
- [CDN References](#cdn-references)
- [First Component](#first-component)
- [License Registration](#license-registration)

## Installation

### Prerequisites

- Visual Studio 2015 or later
- .NET Framework 4.5.2 or later
- ASP.NET MVC 5
- NuGet Package Manager

### System Requirements

- Windows 7 SP1 or later
- Processor: 1.6 GHz or higher
- RAM: 1 GB (2 GB for better performance)
- Disk Space: 500 MB minimum

## NuGet Package Setup

### Method 1: Package Manager Console

1. Open Visual Studio
2. Navigate to **Tools → NuGet Package Manager → Package Manager Console**
3. Run the following command:

```powershell
Install-Package Syncfusion.EJ2.MVC5
```

### Method 2: NuGet Package Manager UI

1. Right-click on your project
2. Select **Manage NuGet Packages**
3. Search for `Syncfusion.EJ2.MVC5`
4. Click **Install**
5. Accept the license terms

### Method 3: .NET CLI

```bash
dotnet add package Syncfusion.EJ2.MVC5
```

### Verify Installation

After installation, verify the NuGet package is installed:

```powershell
Get-Package | Select Name, Version | Where-Object {$_.Name -like "*Syncfusion*"}
```

## Web.config Configuration

### Update Root Web.config

Edit your root `Web.config` file to add MIME types:

```xml
<configuration>
    <appSettings>
        <!-- Syncfusion License Key -->
        <add key="SyncfusionLicense" value="YOUR_LICENSE_KEY_HERE" />
    </appSettings>
    
    <system.webServer>
        <staticContent>
            <!-- Add MIME types for web fonts -->
            <mimeMap fileExtension=".woff" mimeType="application/font-woff" />
            <mimeMap fileExtension=".woff2" mimeType="application/font-woff2" />
            <mimeMap fileExtension=".ttf" mimeType="application/x-font-ttf" />
            <mimeMap fileExtension=".eot" mimeType="application/vnd.ms-fontobject" />
            <mimeMap fileExtension=".svg" mimeType="image/svg+xml" />
        </staticContent>
    </system.webServer>
</configuration>
```

### Update Views/Web.config

Edit `Views/Web.config` to register the Syncfusion assembly:

```xml
<configuration>
    <appSettings>
        <!-- Syncfusion License -->
        <add key="SyncfusionLicense" value="YOUR_LICENSE_KEY_HERE" />
    </appSettings>
    
    <system.web>
        <compilation>
            <assemblies>
                <!-- Register Syncfusion EJ2 MVC5 Assembly -->
                <add assembly="Syncfusion.EJ2.MVC5, Version=*, Culture=neutral, PublicKeyToken=*" />
            </assemblies>
        </compilation>
        
        <httpModules>
            <add name="SyncfusionModule" type="Syncfusion.EJ2.MVC5.Common.SyncfusionModule" />
        </httpModules>
    </system.web>
    
    <system.webServer>
        <modules>
            <add name="SyncfusionModule" type="Syncfusion.EJ2.MVC5.Common.SyncfusionModule" />
        </modules>
        
        <staticContent>
            <!-- MIME types for web fonts -->
            <mimeMap fileExtension=".woff" mimeType="application/font-woff" />
            <mimeMap fileExtension=".woff2" mimeType="application/font-woff2" />
        </staticContent>
    </system.webServer>
</configuration>
```

## CDN References

### Add CSS to _Layout.cshtml

Add Syncfusion CSS links to your `_Layout.cshtml`:

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>@ViewBag.Title</title>
    
    <!-- Syncfusion Material Theme CSS -->
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/dist/ej2.min.css" />
    
    <!-- Bootstrap CSS (if using) -->
    <link rel="stylesheet" href="~/Content/bootstrap.min.css" />
</head>
<body>
    @RenderBody()
    
    <!-- Scripts section -->
    @RenderSection("scripts", required: false)
</body>
</html>
```

### Add Scripts to _Layout.cshtml

Add Syncfusion scripts after your body content:

```html
<body>
    @RenderBody()
    
    <!-- jQuery (required by some MVC features) -->
    <script src="~/Scripts/jquery-3.6.0.min.js"></script>
    
    <!-- Syncfusion EJ2 Scripts -->
    <script src="https://cdn.syncfusion.com/ej2/dist/ej2.min.js"></script>
    
    <!-- Script Manager - initializes all Syncfusion components -->
    @Html.EJS().ScriptManager()
    
    @RenderSection("scripts", required: false)
</body>
```

### Alternative Theme Options

Replace the CSS link to use different themes:

```html
<!-- Bootstrap 5 Theme -->
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/dist/bootstrap5.min.css" />

<!-- Fluent Theme -->
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/dist/fluent.min.css" />

<!-- Tailwind Theme -->
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/dist/tailwind.min.css" />

<!-- Material Dark Theme -->
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/dist/material-dark.min.css" />
```

## First Component

### Create a Simple View

Create a new view file `Views/Home/SpeechToText.cshtml`:

```razor
@using Syncfusion.EJ2

@{
    ViewBag.Title = "Speech To Text Demo";
}

<div style="padding: 20px;">
    <h2>Speech To Text Component</h2>
    
    <!-- Speech To Text Control -->
    @Html.EJS().SpeechToText("voiceInput")
        .ButtonSettings(bs => bs
            .Content("Start Recording")
            .IconCss("e-icons e-microphone")
        )
        .Created("onCreated")
        .Render()
    
    <!-- Display Results -->
    <div style="marginTop: 20px; padding: 15px; border: 1px solid #ccc;">
        <h3>Transcript:</h3>
        <p id="transcript-output">Click the microphone button to start speaking...</p>
    </div>
</div>

<script>
    function onCreated() {
        console.log("Speech To Text component created successfully!");
    }
</script>
```

### Add Route to Controller

Update `Controllers/HomeController.cs`:

```csharp
public class HomeController : Controller
{
    public ActionResult Index()
    {
        return View();
    }
    
    public ActionResult SpeechToText()
    {
        return View();
    }
}
```

### Update RouteConfig

Ensure routing is configured in `App_Start/RouteConfig.cs`:

```csharp
public class RouteConfig
{
    public static void RegisterRoutes(RouteCollection routes)
    {
        routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

        routes.MapRoute(
            name: "Default",
            url: "{controller}/{action}/{id}",
            defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
        );
    }
}
```

### Test the Component

1. Build the solution (Ctrl + Shift + B)
2. Run the application (F5)
3. Navigate to `/Home/SpeechToText`
4. You should see the Speech To Text component with a microphone button

## License Registration

### Option 1: Register in Global.asax

Add license registration to `Global.asax.cs`:

```csharp
using Syncfusion.Licensing;

namespace YourMVCApplication
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            // Register Syncfusion License
            SyncfusionLicenseProvider.RegisterLicense("YOUR_LICENSE_KEY");
            
            AreaRegistration.RegisterAllAreas();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
        }
    }
}
```

### Option 2: Register in Web.config

Add license key to `Web.config`:

```xml
<configuration>
    <appSettings>
        <add key="SyncfusionLicense" value="YOUR_LICENSE_KEY" />
    </appSettings>
</configuration>
```

### Get Your License Key

1. Purchase a license from [Syncfusion](https://www.syncfusion.com/sales/products)
2. Navigate to [License Registration Portal](https://www.syncfusion.com/account/downloads)
3. Generate your license key
4. Replace `YOUR_LICENSE_KEY` with your actual key

### Free Community License

Syncfusion provides a free community license for companies with less than $1 million USD in annual sales. [Apply for Community License](https://www.syncfusion.com/community/license)

## Complete Startup Example

Here's a complete example from scratch:

### Project Structure

```
MyMVCApp/
├── App_Start/
│   ├── RouteConfig.cs
│   └── FilterConfig.cs
├── Controllers/
│   └── HomeController.cs
├── Views/
│   ├── Shared/
│   │   └── _Layout.cshtml
│   └── Home/
│       └── SpeechToText.cshtml
├── Global.asax
├── Web.config
└── packages.config
```

### Global.asax.cs

```csharp
using System.Web.Mvc;
using System.Web.Routing;
using Syncfusion.Licensing;

namespace MyMVCApp
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            // Register License
            SyncfusionLicenseProvider.RegisterLicense("YOUR_LICENSE_KEY");
            
            // MVC Setup
            AreaRegistration.RegisterAllAreas();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
        }
    }
}
```

### _Layout.cshtml

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>@ViewBag.Title</title>
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/dist/ej2.min.css" />
</head>
<body>
    @RenderBody()
    
    <script src="https://cdn.syncfusion.com/ej2/dist/ej2.min.js"></script>
    @Html.EJS().ScriptManager()
    
    @RenderSection("scripts", required: false)
</body>
</html>
```

### HomeController.cs

```csharp
using System.Web.Mvc;

namespace MyMVCApp.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }
        
        public ActionResult SpeechToText()
        {
            return View();
        }
    }
}
```

### SpeechToText.cshtml

```razor
@using Syncfusion.EJ2

@{
    ViewBag.Title = "Voice Input Demo";
}

<div class="container">
    @Html.EJS().SpeechToText("voice-input")
        .ButtonSettings(bs => bs
            .Content("🎤 Start Speaking")
        )
        .Render()
    
    <textarea id="output" placeholder="Transcript will appear here..." rows="4" cols="50"></textarea>
</div>

<script>
    var component = ej.base.getComponent(
        document.getElementById("voice-input"),
        "speechtotext"
    );
    
    // Listen for transcript changes
    component.transcriptChanged = function(args) {
        document.getElementById("output").value = args.transcript;
    };
</script>
```

## Troubleshooting Installation

### Issue: "Could not load file or assembly 'Syncfusion.EJ2.MVC5'"

**Solution:**
1. Ensure NuGet package is installed: `Install-Package Syncfusion.EJ2.MVC5`
2. Verify assembly binding in `Web.config`
3. Clean and rebuild the solution
4. Check that `Views/Web.config` has the assembly registration

### Issue: Styles not loading

**Solution:**
1. Verify CDN link is correct in `_Layout.cshtml`
2. Check browser DevTools → Network tab for 404 errors
3. Ensure `<ejs-scripts>` tag is present
4. Try using different CDN link: `https://cdn.syncfusion.com/ej2/dist/ej2.min.css`

### Issue: JavaScript errors

**Solution:**
1. Verify `@Html.EJS().ScriptManager()` is present
2. Ensure jQuery is loaded before Syncfusion scripts
3. Check browser console for specific error messages
4. Verify all CDN links are accessible

## Next Steps

- Read [speech-recognition-features.md](speech-recognition-features.md) to learn core functionality
- Explore [button-and-tooltip-customization.md](button-and-tooltip-customization.md) for UI customization
- Check [events-and-methods.md](events-and-methods.md) for event handling

