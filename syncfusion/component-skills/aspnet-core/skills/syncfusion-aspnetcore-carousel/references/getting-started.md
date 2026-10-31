# Getting Started with ASP.NET Core Carousel Control

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Tag Helper Setup](#tag-helper-setup)
- [Resources Configuration](#resources-configuration)
- [Basic Carousel Implementation](#basic-carousel-implementation)
- [Complete Setup Example](#complete-setup-example)
- [Verification and Troubleshooting](#verification-and-troubleshooting)

## Prerequisites

Before implementing the Carousel component, ensure you have:

- **Visual Studio** – 2019 or later with ASP.NET Core development workload
- **ASP.NET Core** – Version 5.0 or later
- **System Requirements** – Refer to [Syncfusion System Requirements](https://ej2.syncfusion.com/aspnetcore/documentation/system-requirements)
- **NuGet Access** – Access to nuget.org for package installation
- **Modern Browser** – Chrome, Firefox, Safari, or Edge (latest versions)

## Installation

### Step 1: Install Syncfusion NuGet Package

The Syncfusion.EJ2.AspNet.Core package contains all necessary controls including the Carousel component.

**Using NuGet Package Manager UI:**

1. Open Visual Studio and navigate to **Tools** → **NuGet Package Manager** → **Manage NuGet Packages for Solution**
2. Search for `Syncfusion.EJ2.AspNet.Core`
3. Select the latest stable version
4. Click **Install**
5. Accept the license agreement

**Using Package Manager Console:**

Open Package Manager Console and execute:

```powershell
Install-Package Syncfusion.EJ2.AspNet.Core -Version 24.1.36
```

**Using .NET CLI:**

Execute from your project directory:

```bash
dotnet add package Syncfusion.EJ2.AspNet.Core
```

### Step 2: Check Dependencies

The package automatically installs required dependencies:

- **Newtonsoft.Json** – For JSON serialization
- **Syncfusion.Licensing** – For license key validation

Verify these packages appear in your `Dependencies` → `Packages` section.

### Step 3: Project File Configuration

Ensure your ASP.NET Core project file (`.csproj`) targets the correct framework:

```xml
<TargetFramework>net6.0</TargetFramework>
<!-- or -->
<TargetFramework>net7.0</TargetFramework>
<!-- or -->
<TargetFramework>net8.0</TargetFramework>
```

## Tag Helper Setup

### Register Syncfusion Tag Helper

The Syncfusion Tag Helper must be registered in your Razor pages for the `ejs-carousel` tag to work.

**File: `~/Pages/_ViewImports.cshtml` (Razor Pages)**

Add this line to import the Syncfusion Tag Helper:

```csharp
@addTagHelper *, Syncfusion.EJ2
```

**File: `~/Views/Web.config` (ASP.NET Core MVC – if not using _ViewImports.cshtml)**

Add this section if you prefer Web.config configuration (not recommended for new projects):

```xml
<configuration>
  <system.webServer>
    <aspNetCore>
      <environmentVariables>
        <!-- TagHelper registration happens via _ViewImports.cshtml -->
      </environmentVariables>
    </aspNetCore>
  </system.webServer>
</configuration>
```

**Verification:**

After adding the tag helper import, IntelliSense in Visual Studio will recognize `ejs-carousel` tag with autocomplete suggestions.

## Resources Configuration

### Add Stylesheet

The Carousel component requires Syncfusion CSS themes. Add the stylesheet reference to your layout file.

**File: `~/Pages/Shared/_Layout.cshtml`**

Add this line inside the `<head>` section:

```html
<head>
    <!-- ... other head content ... -->
    
    <!-- Syncfusion Fluent CSS Theme (Recommended) -->
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/24.1.36/fluent.css" />
    
    <!-- Alternative themes available -->
    <!-- Material Theme: https://cdn.syncfusion.com/ej2/24.1.36/material.css -->
    <!-- Bootstrap Theme: https://cdn.syncfusion.com/ej2/24.1.36/bootstrap.css -->
    <!-- Tailwind Theme: https://cdn.syncfusion.com/ej2/24.1.36/tailwind.css -->
</head>
```

**Theme Options:**

- **Fluent** – Modern Microsoft-inspired design (recommended)
- **Material** – Google Material Design
- **Bootstrap** – Bootstrap-based styling
- **Tailwind** – Tailwind CSS compatible
- **High Contrast** – Accessibility-focused theme

### Add Script Resources

The Carousel component requires JavaScript libraries.

**File: `~/Pages/Shared/_Layout.cshtml`**

Add this line at the end of the `<body>` section (before closing `</body>`):

```html
<body>
    <!-- ... page content ... -->
    
    <!-- Syncfusion EJ2 Script (Required for all Syncfusion components) -->
    <script src="https://cdn.syncfusion.com/ej2/24.1.36/dist/ej2.min.js"></script>
    
    <!-- Syncfusion Script Manager (Required) -->
    <ejs-scripts></ejs-scripts>
</body>
```

**Script Manager:**

The `<ejs-scripts>` tag helper initializes all Syncfusion components on the page. Place it after all component markup but before custom scripts.

### Alternative: Local Resources

Instead of CDN, you can serve resources locally:

1. Download resources from [Syncfusion npm packages](https://www.npmjs.com/package/@syncfusion/ej2)
2. Place in `wwwroot/lib/syncfusion/` directory
3. Update references:

```html
<link rel="stylesheet" href="~/lib/syncfusion/ej2/24.1.36/fluent.css" />
<script src="~/lib/syncfusion/ej2/24.1.36/dist/ej2.min.js"></script>
```

## Basic Carousel Implementation

### Minimal Carousel Example

Create a simple carousel with three image slides:

**File: `~/Pages/Index.cshtml`**

```html
@page

<div class="carousel-section">
    <h2>My Image Carousel</h2>
    
    <ejs-carousel id="basicCarousel">
        <e-carousel-items>
            <e-carousel-item template="#slide1"></e-carousel-item>
            <e-carousel-item template="#slide2"></e-carousel-item>
            <e-carousel-item template="#slide3"></e-carousel-item>
        </e-carousel-items>
    </ejs-carousel>
</div>

<!-- Templates for each slide -->
<script id="slide1" type="text/x-template">
    <img src="https://ej2.syncfusion.com/aspnetcore/css/carousel/images/bridge.jpg" 
         alt="Golden Gate Bridge" 
         style="height: 100%; width: 100%; object-fit: cover;" />
</script>

<script id="slide2" type="text/x-template">
    <img src="https://ej2.syncfusion.com/aspnetcore/css/carousel/images/trees.jpg" 
         alt="Spring Trees" 
         style="height: 100%; width: 100%; object-fit: cover;" />
</script>

<script id="slide3" type="text/x-template">
    <img src="https://ej2.syncfusion.com/aspnetcore/css/carousel/images/waterfall.jpg" 
         alt="Waterfall" 
         style="height: 100%; width: 100%; object-fit: cover;" />
</script>

<style>
.carousel-section {
    margin: 30px 0;
}

#basicCarousel {
    max-width: 800px;
    height: 400px;
    margin: 20px auto;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}
</style>
```

**What this creates:**

- Three carousel slides with image templates
- Default auto-play behavior enabled
- Default navigation buttons visible
- Default dot indicators at the bottom

### Carousel with Configuration

Add properties to customize behavior:

```html
<ejs-carousel id="configuredCarousel"
              autoPlay="true"
              interval="4000"
              pauseOnHover="true"
              animationEffect="Slide"
              buttonsVisibility="Visible"
              showIndicators="true"
              indicatorsType="Fraction"
              loop="true"
              enableRtl="false">
    <e-carousel-items>
        <e-carousel-item template="#image1" interval="3000"></e-carousel-item>
        <e-carousel-item template="#image2" interval="5000"></e-carousel-item>
    </e-carousel-items>
</ejs-carousel>
```

## Complete Setup Example

### Full Page with Carousel

**File: `~/Pages/CarouselDemo.cshtml`**

```html
@page
@{
    ViewData["Title"] = "Carousel Demo";
}

<div class="container mt-5">
    <h1>Syncfusion ASP.NET Core Carousel Control</h1>
    <p class="lead">Showcase rotating content with automatic transitions and navigation controls.</p>
    
    <div class="row mt-4">
        <div class="col-lg-8 mx-auto">
            <div class="card">
                <div class="card-header">
                    <h5 class="mb-0">Image Carousel Example</h5>
                </div>
                <div class="card-body p-0">
                    <ejs-carousel id="demoCarousel"
                                  autoPlay="true"
                                  interval="3500"
                                  pauseOnHover="true"
                                  animationEffect="Slide"
                                  buttonsVisibility="Visible"
                                  showIndicators="true"
                                  indicatorsType="Dynamic"
                                  loop="true"
                                  cssClass="demo-carousel"
                                  height="400px">
                        <e-carousel-items>
                            <e-carousel-item template="#template1"></e-carousel-item>
                            <e-carousel-item template="#template2"></e-carousel-item>
                            <e-carousel-item template="#template3"></e-carousel-item>
                            <e-carousel-item template="#template4"></e-carousel-item>
                            <e-carousel-item template="#template5"></e-carousel-item>
                        </e-carousel-items>
                    </ejs-carousel>
                </div>
            </div>
            
            <div class="mt-3">
                <small class="text-muted">
                    Auto-plays every 3.5 seconds. Pause on hover enabled. Click navigation buttons to manually browse slides.
                </small>
            </div>
        </div>
    </div>
</div>

<!-- Slide Templates -->
<script id="template1" type="text/x-template">
    <figure class="carousel-figure">
        <img src="https://ej2.syncfusion.com/aspnetcore/css/carousel/images/bridge.jpg" 
             alt="Golden Gate Bridge" />
        <figcaption>Golden Gate Bridge, San Francisco</figcaption>
    </figure>
</script>

<script id="template2" type="text/x-template">
    <figure class="carousel-figure">
        <img src="https://ej2.syncfusion.com/aspnetcore/css/carousel/images/trees.jpg" 
             alt="Spring Trees" />
        <figcaption>Spring Flower Trees</figcaption>
    </figure>
</script>

<script id="template3" type="text/x-template">
    <figure class="carousel-figure">
        <img src="https://ej2.syncfusion.com/aspnetcore/css/carousel/images/waterfall.jpg" 
             alt="Waterfall" />
        <figcaption>Oddadalen Waterfalls, Norway</figcaption>
    </figure>
</script>

<script id="template4" type="text/x-template">
    <figure class="carousel-figure">
        <img src="https://ej2.syncfusion.com/aspnetcore/css/carousel/images/sea.jpg" 
             alt="Sea" />
        <figcaption>Anse Source d'Argent, Seychelles</figcaption>
    </figure>
</script>

<script id="template5" type="text/x-template">
    <figure class="carousel-figure">
        <img src="https://ej2.syncfusion.com/aspnetcore/css/carousel/images/rocks.jpeg" 
             alt="Rocks" />
        <figcaption>Stonehenge, England</figcaption>
    </figure>
</script>

<style>
#demoCarousel {
    border-radius: 4px;
    overflow: hidden;
}

.carousel-figure {
    margin: 0;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
}

.carousel-figure img {
    height: 100%;
    width: 100%;
    object-fit: cover;
}

.carousel-figure figcaption {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.5);
    color: white;
    padding: 15px;
    margin: 0;
    font-size: 14px;
    text-align: center;
}

.demo-carousel .e-carousel-item {
    height: 100%;
}
</style>
```

## Verification and Troubleshooting

### Verify Installation

After setting up, verify the carousel renders correctly:

1. Run `dotnet run` in your project directory
2. Navigate to your carousel page
3. Confirm carousel displays images
4. Try clicking next/previous buttons
5. Verify auto-play transitions work
6. Test pause-on-hover by hovering over carousel

### Common Issues and Solutions

**Issue: "ejs-carousel tag is not recognized"**

**Solution:** Verify Tag Helper is registered in `_ViewImports.cshtml`:
```csharp
@addTagHelper *, Syncfusion.EJ2
```

**Issue: Carousel renders but no styling (unstyled squares)**

**Solution:** Verify stylesheet link is in `<head>` section:
```html
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/24.1.36/fluent.css" />
```

**Issue: "Cannot find module '@syncfusion/ej2' or similar npm errors"**

**Solution:** Use CDN resources instead of npm (@syncfusion packages):
```html
<script src="https://cdn.syncfusion.com/ej2/24.1.36/dist/ej2.min.js"></script>
```

**Issue: Carousel not responding to clicks or auto-play not working**

**Solution:** Verify script manager is registered:
```html
<ejs-scripts></ejs-scripts>
```

**Issue: Template images not showing**

**Solution:** Verify image URLs are correct and accessible. Use browser DevTools (F12) to check:
- Network tab for 404 errors
- Console for JavaScript errors

### Browser DevTools Debugging

Use F12 (or right-click → Inspect) to:

1. **Check Console** – Look for JavaScript errors related to Syncfusion
2. **Network Tab** – Verify CSS and JS files load successfully
3. **Elements** – Inspect carousel HTML structure and classes
4. **CSS** – Verify applied styles and theme classes

### Next Steps

- Review [Populating Items](populating-items.md) for data binding techniques
- See [Animations and Transitions](animations-transitions.md) for customizing transitions
- Check [Navigation and Indicators](navigation-indicators.md) for UI customization
- Explore [API Reference](api-reference.md) for all available properties

---

**Installation complete!** Your carousel is now ready for customization.
