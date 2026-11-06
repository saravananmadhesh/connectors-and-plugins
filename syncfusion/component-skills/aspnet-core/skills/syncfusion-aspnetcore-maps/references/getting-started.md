# Getting Started with Syncfusion Maps for ASP.NET Core

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
  - [Step 1: Create ASP.NET Core Web Application](#step-1-create-aspnet-core-web-application)
  - [Step 2: Install NuGet Package](#step-2-install-nuget-package)
- [Project Setup](#project-setup)
  - [Folder Structure](#folder-structure)
  - [Adding GeoJSON Data Files](#adding-geojson-data-files)
- [Adding Tag Helpers](#adding-tag-helpers)
  - [Step 1: Import Syncfusion Tag Helpers](#step-1-import-syncfusion-tag-helpers)
  - [Step 2: Add Using Directives](#step-2-add-using-directives)
- [Adding Script References](#adding-script-references)
  - [Option 1: Using CDN (Recommended for Development)](#option-1-using-cdn-recommended-for-development)
  - [Option 2: Using Local Scripts (For Production)](#option-2-using-local-scripts-for-production)
  - [Option 3: Using Static Web Assets](#option-3-using-static-web-assets)
- [Registering Script Manager](#registering-script-manager)
- [Creating Your First Map](#creating-your-first-map)
  - [Basic Empty Map](#basic-empty-map)
- [Rendering Shapes from GeoJSON](#rendering-shapes-from-geojson)
  - [Loading GeoJSON Data](#loading-geojson-data)
  - [Understanding Layers](#understanding-layers)
- [Running the Application](#running-the-application)
  - [Using Visual Studio](#using-visual-studio)
  - [Using .NET CLI](#using-net-cli)
  - [Expected Result](#expected-result)
- [Complete Minimal Example](#complete-minimal-example)
- [Troubleshooting](#troubleshooting)
  - [Map Not Rendering / Blank Page](#map-not-rendering--blank-page)
  - [Script Errors / Component Not Loading](#script-errors--component-not-loading)
  - [License Warning Message](#license-warning-message)
  - [JSON Deserialization Error](#json-deserialization-error)
  - [Tag Helper Not Recognized](#tag-helper-not-recognized)
  - [Performance Issues / Slow Rendering](#performance-issues--slow-rendering)
  - [NuGet Package Installation Fails](#nuget-package-installation-fails)
- [Next Steps](#next-steps)

## Prerequisites

Before you begin, ensure you have:

**System Requirements:**
- Visual Studio 2019 or later
- .NET Core 3.1 SDK or later / .NET 5.0 or later / .NET 6.0 or later
- ASP.NET Core Runtime
- Windows, macOS, or Linux operating system

**Knowledge Requirements:**
- Basic understanding of ASP.NET Core MVC or Razor Pages
- Familiarity with C# and HTML
- Understanding of JSON data format

**Additional Requirements:**
- GeoJSON data files for map shapes (world map, country map, etc.)
- Active internet connection for CDN script references (or local script files)

Check system requirements: [ASP.NET Core System Requirements](https://ej2.syncfusion.com/aspnetcore/documentation/system-requirements)

## Installation

### Step 1: Create ASP.NET Core Web Application

**Using Microsoft Templates:**

```bash
dotnet new webapp -o MapsDemo
cd MapsDemo
```

Or create via Visual Studio:
1. File → New → Project
2. Select "ASP.NET Core Web App" template
3. Choose .NET version (3.1 or later)
4. Click Create

**Using Syncfusion Extension (Optional):**

If you have Syncfusion Visual Studio Extension installed:
1. File → New → Syncfusion ASP.NET Core Project
2. Select project template and location
3. Syncfusion packages will be pre-configured

### Step 2: Install NuGet Package

**Using Package Manager Console:**

```bash
Install-Package Syncfusion.EJ2.AspNet.Core -Version 33.1.44
```

**Using .NET CLI:**

```bash
dotnet add package Syncfusion.EJ2.AspNet.Core --version 33.1.44
```

**Using Visual Studio NuGet Manager:**

1. Right-click project → Manage NuGet Packages
2. Search for "Syncfusion.EJ2.AspNet.Core"
3. Click Install

**Package Dependencies:**

The `Syncfusion.EJ2.AspNet.Core` package automatically installs:
- `Newtonsoft.Json` - For JSON serialization

**Getting a License Key:**
- Free 30-day trial: [Syncfusion Trial License](https://www.syncfusion.com/sales/products)
- Community license: Available for qualifying developers
- Commercial license: For production use

## Project Setup

### Folder Structure

Create a folder for map data in your `wwwroot` directory:

```
wwwroot/
├── scripts/
│   └── MapsData/
│       ├── WorldMap.json
│       ├── USA.json
│       └── electiondata.json
```

### Adding GeoJSON Data Files

Download sample GeoJSON files:
- [World Map GeoJSON](https://www.syncfusion.com/downloads/support/directtrac/general/ze/WorldMap-637657487)
- Or use custom GeoJSON from your own sources

Place GeoJSON files in `wwwroot/scripts/MapsData/` directory.

## Adding Tag Helpers

### Step 1: Import Syncfusion Tag Helpers

Open `~/Pages/_ViewImports.cshtml` (for Razor Pages) or `~/Views/_ViewImports.cshtml` (for MVC) and add:

```cshtml
@addTagHelper *, Microsoft.AspNetCore.Mvc.TagHelpers
@addTagHelper *, Syncfusion.EJ2
```

This enables Syncfusion tag helpers throughout your application.

### Step 2: Add Using Directives

Add commonly used namespaces:

```cshtml
@using Syncfusion.EJ2.Maps
@using Newtonsoft.Json
```

## Adding Script References

### Option 1: Using CDN (Recommended for Development)

Open `~/Pages/Shared/_Layout.cshtml` and add script reference in `<head>`:

```cshtml
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>@ViewData["Title"] - Maps Demo</title>
    
    
    <!-- Syncfusion Scripts -->
    <script src="https://cdn.syncfusion.com/ej2/24.1.41/dist/ej2.min.js"></script>
</head>
```

### Option 2: Using Local Scripts (For Production)

Install client-side scripts via npm:

```bash
npm install @syncfusion/ej2
```

### Option 3: Using Static Web Assets

Scripts are available as static web assets from the NuGet package:

```cshtml
<script src="_content/Syncfusion.EJ2.AspNet.Core/scripts/ej2.min.js"></script>
```

## Registering Script Manager

Add the Syncfusion Script Manager at the **end of `<body>`** in `_Layout.cshtml`:

```cshtml
<body>
    <header>
        <!-- Your header content -->
    </header>
    
    <main role="main" class="pb-3">
        @RenderBody()
    </main>
    
    <footer>
        <!-- Your footer content -->
    </footer>
    
    <!-- Syncfusion Script Manager - MUST be at end of body -->
    <ejs-scripts></ejs-scripts>
</body>
```

**Why at the end?** The script manager must be placed after all Syncfusion components to properly initialize them.

## Creating Your First Map

### Basic Empty Map

Open `~/Pages/Index.cshtml` (Razor Pages) or `~/Views/Home/Index.cshtml` (MVC):

```cshtml
@page
@using Syncfusion.EJ2.Maps

<h2>My First Map</h2>

<ejs-maps id="maps" height="500px">
</ejs-maps>
```

**Note:** This creates an empty map container. Maps require at least one layer with shape data to render content.

## Rendering Shapes from GeoJSON

### Loading GeoJSON Data

Maps visualize geographical regions using GeoJSON data. Here's how to load and render it:

```cshtml
@page
@using Syncfusion.EJ2.Maps
@using Newtonsoft.Json

@{
    // Load GeoJSON file from wwwroot/scripts/MapsData/
    string geoJsonText = System.IO.File.ReadAllText("wwwroot/scripts/MapsData/WorldMap.json");
    var worldMapData = JsonConvert.DeserializeObject(geoJsonText);
}

<div style="padding: 20px;">
    <h2>World Map</h2>
    
    <ejs-maps id="maps" height="600px">
        <e-maps-layers>
            <e-maps-layer shapeData="worldMapData">
                <e-layersettings-shapesettings fill="#E5E5E5"></e-layersettings-shapesettings>
            </e-maps-layer>
        </e-maps-layers>
    </ejs-maps>
</div>
```

**Key Properties:**
- `shapeData` - The GeoJSON data containing geographical shapes
- `shapeSettings.fill` - Default color for all shapes
- `height` - Map container height (required for visibility)

### Understanding Layers

Every map must have at least one layer. Layers contain:
- **Shape Data** - GeoJSON defining geographical boundaries
- **Settings** - Styling, data binding, and behavior configuration
- **Visual Elements** - Markers, bubbles, data labels, annotations

## Running the Application

### Using Visual Studio

1. Press `F5` or `Ctrl+F5` to run
2. Browser opens automatically
3. Navigate to the page with your map

### Using .NET CLI

```bash
dotnet run
```

Open browser to `https://localhost:5001` (or displayed URL).

### Expected Result

You should see a world map with all countries rendered in light gray. The map will be interactive (pan/zoom) by default.

## Complete Minimal Example

Here's a complete working example from scratch:

**1. Install Package:**

```bash
dotnet add package Syncfusion.EJ2.AspNet.Core
```

**2. Add Tag Helpers (~/_ViewImports.cshtml):**

```cshtml
@addTagHelper *, Syncfusion.EJ2
```

**3. Add Scripts (~/_Layout.cshtml):**

```cshtml
<!DOCTYPE html>
<html>
<head>
    <script src="https://cdn.syncfusion.com/ej2/24.1.41/dist/ej2.min.js"></script>
</head>
<body>
    @RenderBody()
    <ejs-scripts></ejs-scripts>
</body>
</html>
```

**4. Create Map (~/Pages/Index.cshtml):**

```cshtml
@page
@using Syncfusion.EJ2.Maps
@using Newtonsoft.Json

@{
    string geoJson = System.IO.File.ReadAllText("wwwroot/scripts/MapsData/WorldMap.json");
    var mapData = JsonConvert.DeserializeObject(geoJson);
}

<div style="width: 100%; height: 600px;">
    <ejs-maps id="maps" height="100%">
        <e-maps-layers>
            <e-maps-layer shapeData="mapData">
                <e-layersettings-shapesettings fill="#C3E6ED"></e-layersettings-shapesettings>
            </e-maps-layer>
        </e-maps-layers>
    </ejs-maps>
</div>
```

**5. Run:**

```bash
dotnet run
```

## Troubleshooting

### Map Not Rendering / Blank Page

**Problem:** Empty white space where map should appear.

**Solutions:**
1. **Verify height is set:** Maps require explicit height
   ```cshtml
   <ejs-maps id="maps" height="600px">
   ```

2. **Check GeoJSON path:** Ensure file exists and path is correct
   ```csharp
   // Path is relative to project root, not wwwroot
   string path = "wwwroot/scripts/MapsData/WorldMap.json";
   if (!System.IO.File.Exists(path)) {
       // File not found!
   }
   ```

3. **Verify shapeData is provided:** Layer must have shapeData
   ```cshtml
   <e-maps-layer shapeData="mapData">
   ```

### World Map Not Rendering or Shapes Appear Incorrect

**Problem:** The map loads but geographical shapes are missing, distorted, incomplete, or do not resemble an actual world map.

**Possible Causes:**
1. No GeoJSON file was provided.
2. An invalid or custom-generated GeoJSON file is being used.
3. The GeoJSON file path is incorrect.
4. The `shapeData` property is not bound correctly.
5. The GeoJSON file does not contain valid world map boundaries.

**Solutions:**

1. **Use the official World Map GeoJSON file**

   Download the official World Map GeoJSON:

   ```text
   https://www.syncfusion.com/downloads/support/directtrac/general/ze/WorldMap-637657487
   ```

2. **Place the file in the correct location**

   ```text
   wwwroot/scripts/MapsData/WorldMap.json
   ```

3. **Verify the file exists**

   ```csharp
   string path = "wwwroot/scripts/MapsData/WorldMap.json";

   if (!System.IO.File.Exists(path))
   {
       throw new FileNotFoundException(
           "WorldMap.json was not found.",
           path);
   }
   ```

4. **Load the GeoJSON correctly**

   ```cshtml
   @using Newtonsoft.Json

   @{
       string geoJsonText =
           System.IO.File.ReadAllText(
               "wwwroot/scripts/MapsData/WorldMap.json");

       var worldMapData =
           JsonConvert.DeserializeObject(geoJsonText);
   }
   ```

5. **Bind the GeoJSON to the map layer**

   ```cshtml
   <ejs-maps id="maps">
       <e-maps-layers>
           <e-maps-layer shapeData="worldMapData">
           </e-maps-layer>
       </e-maps-layers>
   </ejs-maps>
   ```

### Script Errors / Component Not Loading

**Problem:** JavaScript errors in browser console.

**Solutions:**
1. **Verify script order:** CDN script must be before `<ejs-scripts>`
   ```cshtml
   <head>
       <script src="https://cdn.syncfusion.com/ej2/.../ej2.min.js"></script>
   </head>
   <body>
       <!-- content -->
       <ejs-scripts></ejs-scripts> <!-- Must be at end -->
   </body>
   ```

2. **Check script version matches package version**
3. **Ensure internet connection for CDN scripts**
4. **Clear browser cache**

### License Warning Message

**Problem:** "License key not registered" warning in console.

**Solutions:**
1. Register license key in `Program.cs` or `Startup.cs`
2. Verify license key is valid and not expired
3. Ensure `Syncfusion.Licensing` package is installed

### JSON Deserialization Error

**Problem:** Error loading GeoJSON file.

**Solutions:**
1. **Verify JSON format:** GeoJSON must be valid JSON
2. **Check file encoding:** Use UTF-8 encoding
3. **Validate GeoJSON:** Use [GeoJSONLint](https://geojsonlint.com/)
4. **Handle exceptions:**
   ```csharp
   try {
       var data = JsonConvert.DeserializeObject(jsonText);
   } catch (JsonException ex) {
       // Handle error
   }
   ```

### Tag Helper Not Recognized

**Problem:** `<ejs-maps>` shows as plain text or error.

**Solutions:**
1. **Add tag helper directive in _ViewImports.cshtml:**
   ```cshtml
   @addTagHelper *, Syncfusion.EJ2
   ```

2. **Verify package is installed**
3. **Rebuild project:** Clean and rebuild solution
4. **Restart Visual Studio/IDE**

### Performance Issues / Slow Rendering

**Problem:** Map takes long time to load or lags.

**Solutions:**
1. **Simplify GeoJSON:** Use lower resolution shapes
2. **Reduce layer count:** Minimize number of layers
3. **Optimize data size:** Filter unnecessary properties from data
4. **Enable shape caching:** Set appropriate zoom levels

### NuGet Package Installation Fails

**Problem:** Cannot install Syncfusion.EJ2.AspNet.Core package.

**Solutions:**
1. **Check NuGet package source:** Ensure nuget.org is enabled
2. **Update NuGet Package Manager**
3. **Clear NuGet cache:**
   ```bash
   dotnet nuget locals all --clear
   ```
4. **Check .NET version compatibility**

## Next Steps

Now that you have a basic map running:

1. **Add Data Binding** - Connect your data to map shapes to visualize statistics
2. **Apply Color Mapping** - Create choropleth maps with color-coded regions
3. **Add Markers** - Plot specific locations on your map
4. **Enable Interactivity** - Configure zooming, panning, and tooltips
5. **Customize Styling** - Apply custom colors, borders, and themes

Congratulations! You've successfully set up and rendered your first Syncfusion Maps component.
