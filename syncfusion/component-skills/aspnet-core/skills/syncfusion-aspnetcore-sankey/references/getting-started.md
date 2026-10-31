# Getting Started with Syncfusion Sankey Chart

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Setup Steps](#setup-steps)
- [Basic Initialization](#basic-initialization)
- [Adding Data](#adding-data)
- [Complete Example](#complete-example)
- [First Render](#first-render)

## Prerequisites

Before creating a Sankey Chart, ensure your ASP.NET Core application meets these requirements:

- **System Requirements:** ASP.NET Core 6.0 or later
- **Development Tools:** Visual Studio 2019 or later, or Visual Studio Code
- **NuGet Package Manager:** Access to NuGet for package installation
- **Basic ASP.NET Core Knowledge:** Understanding of Razor pages and tag helpers

## Installation

### Step 1: Install NuGet Package

Add the Syncfusion.EJ2.AspNet.Core NuGet package to your ASP.NET Core application:

```bash
Install-Package Syncfusion.EJ2.AspNet.Core -Version {{ site.releaseversion }}
```

**Dependencies:**
- `Newtonsoft.Json` - Required for JSON serialization
- `Syncfusion.Licensing` - Required for license validation

You can install via NuGet Package Manager in Visual Studio (Tools → NuGet Package Manager → Manage NuGet Packages for Solution) by searching for `Syncfusion.EJ2.AspNet.Core`.

### Step 2: Import Tag Helper

Open the `~/Pages/_ViewImports.cshtml` file and add the Syncfusion tag helper import:

```csharp
@addTagHelper *, Syncfusion.EJ2
```

This enables all Syncfusion tag helpers throughout your application.

## Setup Steps

### Step 1: Add Script Resources

Add the Syncfusion script reference in the `<head>` section of `~/Pages/Shared/_Layout.cshtml`:

```html
<head>
    ...
    <!-- Syncfusion ASP.NET Core control scripts -->
    <script src="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/dist/ej2.min.js"></script>
</head>
```

**Alternative Methods:**
- Local file reference
- Module bundler integration
- See "Adding Script Reference" documentation for additional approaches

### Step 2: Register Script Manager

Register the Syncfusion script manager at the end of the `<body>` section in `~/Pages/Shared/_Layout.cshtml`:

```html
<body>
    ...
    <!-- Syncfusion ASP.NET Core Script Manager -->
    <ejs-scripts></ejs-scripts>
</body>
```

The script manager handles script loading and initialization for all Syncfusion controls on the page.

## Basic Initialization

### Minimal Sankey Chart

Add the Sankey Chart tag helper to your Razor page (`~/Pages/Index.cshtml`):

```html
<ejs-sankey id="container" width="100%" height="420px">
    <e-sankey-nodes></e-sankey-nodes>
</ejs-sankey>
```

This creates an empty Sankey Chart with default styling. Add nodes and links data to display actual flow visualization.

### With Basic Configuration

```html
<ejs-sankey id="container" 
    width="700px" 
    height="420px"
    margin="@new { top = 10, bottom = 10, left = 10, right = 10 }">
    <e-sankey-nodes></e-sankey-nodes>
</ejs-sankey>
```

**Configuration Parameters:**
- `width`: Chart container width (pixels or percentage)
- `height`: Chart container height (pixels or percentage)
- `margin`: Spacing around chart content
- `id`: Unique identifier for DOM reference and JavaScript interaction

## Adding Data

### Node Data Structure

Nodes represent categories, sources, or targets in your flow diagram. Define nodes as a collection of objects:

```csharp
// In your Page Model (Initialize.cs)
var nodeData = new object[]
{
    new { id = 0, label = "Agriculture" },
    new { id = 1, label = "Processing" },
    new { id = 2, label = "Distribution" },
    new { id = 3, label = "Consumer" }
};
```

**Required Properties:**
- `id`: Unique identifier (number)
- `label`: Display text for the node

### Link Data Structure

Links represent flows between nodes with associated values:

```csharp
// In your Page Model (Data.cs)
var linkData = new object[]
{
    new { sourceNodeID = 0, targetNodeID = 1, value = 100 },
    new { sourceNodeID = 1, targetNodeID = 2, value = 80 },
    new { sourceNodeID = 2, targetNodeID = 3, value = 75 },
    new { sourceNodeID = 1, targetNodeID = 3, value = 15 }
};
```

**Required Properties:**
- `sourceNodeID`: ID of the source node
- `targetNodeID`: ID of the target node
- `value`: Numeric flow magnitude (determines link thickness)

### Adding Data to Chart

```html
<ejs-sankey id="container" 
    dataSource="@linkData"
    width="100%" 
    height="420px">
    <e-sankey-nodes dataSource="@nodeData"></e-sankey-nodes>
</ejs-sankey>
```

## Complete Example

### Complete Razor Page (Index.cshtml)

```html
@page
@model IndexModel

<div class="container">
    <h1>Energy Flow Analysis</h1>
    
    <ejs-sankey id="energySankey" 
        dataSource="@Model.LinkData"
        width="100%" 
        height="500px"
        margin="@new { top = 20, bottom = 20, left = 20, right = 20 }">
        <e-sankey-nodes dataSource="@Model.NodeData"></e-sankey-nodes>
        <e-sankey-nodesettings width="20" padding="10"></e-sankey-nodesettings>
        <e-sankey-linksettings opacity="0.4"></e-sankey-linksettings>
    </ejs-sankey>
</div>
```

### Page Model Code-Behind (Index.cshtml.cs)

```csharp
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

public class IndexModel : PageModel
{
    public object[] NodeData { get; set; }
    public object[] LinkData { get; set; }

    public void OnGet()
    {
        // Define nodes: sources, intermediates, and targets
        NodeData = new object[]
        {
            new { id = 0, label = "Solar" },
            new { id = 1, label = "Wind" },
            new { id = 2, label = "Hydro" },
            new { id = 3, label = "Grid Distribution" },
            new { id = 4, label = "Residential" },
            new { id = 5, label = "Commercial" },
            new { id = 6, label = "Industrial" }
        };

        // Define links with flow values
        LinkData = new object[]
        {
            new { sourceNodeID = 0, targetNodeID = 3, value = 150 },
            new { sourceNodeID = 1, targetNodeID = 3, value = 200 },
            new { sourceNodeID = 2, targetNodeID = 3, value = 100 },
            new { sourceNodeID = 3, targetNodeID = 4, value = 180 },
            new { sourceNodeID = 3, targetNodeID = 5, value = 155 },
            new { sourceNodeID = 3, targetNodeID = 6, value = 115 }
        };
    }
}
```

## First Render

### Run the Application

Press **Ctrl+F5** (Windows) or **⌘+F5** (macOS) to run your ASP.NET Core application.

### Expected Output

The Sankey Chart displays:
- **Nodes** as rectangular boxes labeled with your node names (Solar, Wind, Hydro, etc.)
- **Links** as curved paths connecting source nodes to target nodes
- **Link Thickness** proportional to the value in each link
- **Default Colors** applied automatically from the theme

### Verification Checklist

- ✓ Nodes appear on the chart
- ✓ Links flow between nodes
- ✓ Link thickness varies based on values
- ✓ Labels are readable
- ✓ Chart is responsive to container size

## Troubleshooting

### Chart Not Rendering

**Issue:** Empty container with no visualization

**Solutions:**
1. Verify `<ejs-scripts></ejs-scripts>` is placed in `_Layout.cshtml`
2. Check that JavaScript CDN URL is correct and accessible
3. Ensure `dataSource` property contains valid link data
4. Verify node IDs in links match node data IDs exactly

### Data Not Showing

**Issue:** Sankey chart renders but shows no nodes or links

**Solutions:**
1. Check that `NodeData` property is populated with node objects
2. Verify `LinkData` contains objects with `sourceNodeID`, `targetNodeID`, and `value`
3. Ensure link node IDs reference existing node IDs
4. Check browser console for JavaScript errors

### Script Errors

**Issue:** Browser console shows JavaScript errors

**Solutions:**
1. Verify Syncfusion script CDN is accessible
2. Check for conflicts with other JavaScript libraries
3. Inspect Network tab to confirm scripts are loading
4. Ensure tag helper import is in `_ViewImports.cshtml`

## Next Steps

After creating your first Sankey Chart:
1. **Customize Nodes** - Learn node styling and individual customization
2. **Style Links** - Control link colors, curvature, and opacity
3. **Add Labels** - Display meaningful text on nodes
4. **Enable Legend** - Help users identify node categories
5. **Handle Events** - Respond to user interactions and data changes
