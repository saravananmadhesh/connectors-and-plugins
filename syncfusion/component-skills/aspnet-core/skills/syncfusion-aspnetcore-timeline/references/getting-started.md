# Getting Started with Syncfusion Timeline

## Overview
This guide explains how to add the Syncfusion Timeline component to an ASP.NET Core application, including prerequisites, installation, and basic usage.

## Prerequisites
- Visual Studio 2019 or later
- ASP.NET Core 3.1 or later
- Syncfusion.EJ2.AspNet.Core NuGet package

## Installation
Install the NuGet package:
```powershell
Install-Package Syncfusion.EJ2.AspNet.Core
```

## Register Tag Helpers
Add the following to your `_ViewImports.cshtml`:
```csharp
@addTagHelper *, Syncfusion.EJ2
```

## Add Styles and Scripts
In your `_Layout.cshtml` `<head>` section:
```html
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/23.1.36/fluent.css" />
<script src="https://cdn.syncfusion.com/ej2/23.1.36/dist/ej2.min.js"></script>
```

## Register Script Manager
At the end of `<body>` in `_Layout.cshtml`:
```html
<ejs-scripts></ejs-scripts>
```

## Basic Usage Example
Add the Timeline to a Razor page:
```cshtml
<ejs-timeline id="timeline">
    <e-timeline-items>
        <e-timeline-item content="Project Initiated"></e-timeline-item>
        <e-timeline-item content="Requirements Gathered"></e-timeline-item>
        <e-timeline-item content="Development Started"></e-timeline-item>
    </e-timeline-items>
</ejs-timeline>
```

## Next Steps
- See the other reference files for advanced configuration, alignment, and customization.
