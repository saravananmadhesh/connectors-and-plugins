# Annotations in Syncfusion ASP.NET Core Maps

## Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
  - [Basic Prerequisites](#basic-prerequisites)
  - [Simple Annotation Setup](#simple-annotation-setup)
- [Basic Annotation](#basic-annotation)
  - [Complete Example: Simple Text Annotation](#complete-example-simple-text-annotation)
- [Annotation Positioning](#annotation-positioning)
  - [X and Y Positioning](#x-and-y-positioning)
    - [Complete Example: Pixel-Based Positioning](#complete-example-pixel-based-positioning)
  - [Percentage Positioning](#percentage-positioning)
    - [Complete Example: Percentage-Based Positioning](#complete-example-percentage-based-positioning)
- [Annotation Alignment](#annotation-alignment)
  - [Complete Example: Various Alignments](#complete-example-various-alignments)
- [Z-Index Management](#z-index-management)
  - [Complete Example: Layered Annotations](#complete-example-layered-annotations)
- [Content Types](#content-types)
  - [Text Content](#text-content)
  - [HTML Content](#html-content)
    - [Complete Example: Rich HTML Annotation](#complete-example-rich-html-annotation)
  - [Element ID Reference](#element-id-reference)
    - [Complete Example: Element Reference](#complete-example-element-reference)
- [Multiple Annotations](#multiple-annotations)
  - [Complete Example: Comprehensive Multi-Annotation Map](#complete-example-comprehensive-multi-annotation-map)
- [Complete Examples](#complete-examples)
  - [Example 1: Interactive Dashboard Annotation](#example-1-interactive-dashboard-annotation)
  - [Example 2: Geographic Markers with Annotations](#example-2-geographic-markers-with-annotations)
- [Troubleshooting](#troubleshooting)
  - [Issue: Annotation Not Displaying](#issue-annotation-not-displaying)
  - [Issue: Annotation Positioned Incorrectly](#issue-annotation-positioned-incorrectly)
  - [Issue: Annotation Hidden Behind Map](#issue-annotation-hidden-behind-map)
  - [Issue: HTML Content Not Rendering](#issue-html-content-not-rendering)
  - [Issue: Element ID Reference Not Working](#issue-element-id-reference-not-working)
  - [Issue: Alignment Not Working as Expected](#issue-alignment-not-working-as-expected)
  - [Issue: Annotation Overlaps Map Content](#issue-annotation-overlaps-map-content)
  - [Issue: Multiple Annotations Overlap](#issue-multiple-annotations-overlap)
  - [Issue: Annotation Not Responsive](#issue-annotation-not-responsive)
  - [Common Error Messages](#common-error-messages)

## Overview

Annotations in Syncfusion ASP.NET Core Maps allow you to mark specific areas of interest with texts, shapes, or images. This feature is invaluable for highlighting important locations, adding labels, displaying custom information, or creating interactive overlays. You can add unlimited annotations to a Maps component, each with customizable positioning, alignment, and z-index properties.

## Getting Started

Annotations are added using the `MapsAnnotation` class within the `MapsAnnotations` collection. Each annotation requires content and positioning information.

### Basic Prerequisites

```csharp
@using Syncfusion.EJ2
@using Syncfusion.EJ2.Maps
```

### Simple Annotation Setup

```cshtml
<ejs-maps id="maps">
    <e-maps-annotations>
        <e-maps-annotation content="<div>Annotation Text</div>"></e-maps-annotation>
    </e-maps-annotations>
    <e-maps-layers>
        <!-- Layer configuration -->
    </e-maps-layers>
</ejs-maps>
```

## Basic Annotation

The `Content` property of `MapsAnnotation` accepts text content, HTML strings, or element IDs to render custom content on the map.

### Complete Example: Simple Text Annotation

```cshtml
@using Syncfusion.EJ2
@using Syncfusion.EJ2.Maps

<div class="control-section">
    <ejs-maps id="maps" load="onMapsLoad">
        <e-maps-annotations>
            <e-maps-annotation content="<div style='padding: 10px; background-color: rgba(255, 255, 255, 0.9); border: 2px solid #333; border-radius: 5px;'><h4 style='margin: 0;'>World Map</h4></div>"
                              x="50%"
                              y="10%"
                              zIndex="1">
            </e-maps-annotation>
        </e-maps-annotations>
        <e-maps-layers>
            <e-maps-layer shapeData="ViewBag.worldMap">
                <e-layersettings-shapesettings fill="#C3E6ED"></e-layersettings-shapesettings>
            </e-maps-layer>
        </e-maps-layers>
    </ejs-maps>
</div>

<script>
    function onMapsLoad(args) {
        // Map loaded with annotation
    }
</script>
```

**Controller Code:**
```csharp
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.IO;

public class MapsController : Controller
{
    private readonly IWebHostEnvironment _hostingEnvironment;
    
    public MapsController(IWebHostEnvironment hostingEnvironment)
    {
        _hostingEnvironment = hostingEnvironment;
    }
    
    public IActionResult BasicAnnotation()
    {
        ViewBag.worldMap = GetWorldMap();
        return View();
    }
    
    private object GetWorldMap()
    {
        string filePath = Path.Combine(_hostingEnvironment.WebRootPath, "scripts", "MapsData", "WorldMap.json");
        string jsonString = System.IO.File.ReadAllText(filePath);
        return JsonConvert.DeserializeObject(jsonString);
    }
}
```

## Annotation Positioning

### X and Y Positioning

Annotations can be positioned using pixel values or percentage values for precise placement on the map.

#### Complete Example: Pixel-Based Positioning

```cshtml
@using Syncfusion.EJ2
@using Syncfusion.EJ2.Maps

<div class="control-section">
    <ejs-maps id="maps" load="onMapsLoad" width="100%" height="600px">
        <e-maps-annotations>
            <!-- Top-left corner annotation (pixel-based) -->
            <e-maps-annotation content="<div style='padding: 8px; background-color: #FF6B6B; color: white; border-radius: 4px;'>North</div>"
                              x="20"
                              y="20"
                              zIndex="1">
            </e-maps-annotation>
            
            <!-- Bottom-right annotation (pixel-based) -->
            <e-maps-annotation content="<div style='padding: 8px; background-color: #4ECDC4; color: white; border-radius: 4px;'>South</div>"
                              x="700"
                              y="550"
                              zIndex="1">
            </e-maps-annotation>
        </e-maps-annotations>
        <e-maps-layers>
            <e-maps-layer shapeData="ViewBag.worldMap">
                <e-layersettings-shapesettings fill="#E5E5E5"></e-layersettings-shapesettings>
            </e-maps-layer>
        </e-maps-layers>
    </ejs-maps>
</div>

<script>
    function onMapsLoad(args) {
        // Annotations positioned with pixel values
    }
</script>
```

### Percentage Positioning

Using percentage values makes annotations responsive and maintains position relative to map size.

#### Complete Example: Percentage-Based Positioning

```cshtml
@using Syncfusion.EJ2
@using Syncfusion.EJ2.Maps

<div class="control-section">
    <ejs-maps id="maps" load="onMapsLoad">
        <e-maps-annotations>
            <!-- Center annotation -->
            <e-maps-annotation content="<div style='padding: 15px; background-color: rgba(255, 255, 255, 0.95); border: 3px solid #0066CC; border-radius: 8px; text-align: center;'><h3 style='margin: 0; color: #0066CC;'>World Population Map</h3><p style='margin: 5px 0 0 0; color: #666;'>Data as of 2024</p></div>"
                              x="50%"
                              y="50%"
                              zIndex="1"
                              horizontalAlignment="Center"
                              verticalAlignment="Center">
            </e-maps-annotation>
            
            <!-- Top center title -->
            <e-maps-annotation content="<div style='padding: 10px 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 20px; font-size: 18px; font-weight: bold; box-shadow: 0 4px 6px rgba(0,0,0,0.1);'>Global Statistics</div>"
                              x="50%"
                              y="5%"
                              zIndex="1"
                              horizontalAlignment="Center">
            </e-maps-annotation>
            
            <!-- Bottom legend note -->
            <e-maps-annotation content="<div style='padding: 8px; background-color: rgba(0, 0, 0, 0.7); color: white; border-radius: 4px; font-size: 12px;'>* Population density per square kilometer</div>"
                              x="50%"
                              y="95%"
                              zIndex="1"
                              horizontalAlignment="Center">
            </e-maps-annotation>
        </e-maps-annotations>
        <e-maps-layers>
            <e-maps-layer shapeData="ViewBag.worldMap" 
                          shapePropertyPath='@new[] { "name" }' 
                          shapeDataPath="Country"
                          dataSource="ViewBag.populationData">
                <e-layersettings-shapesettings colorValuePath="density">
                    <e-shapesettings-colormappings>
                        <e-shapesettings-colormapping from="0" to="100" color='@new[] { "#E6F5FF" }'></e-shapesettings-colormapping>
                        <e-shapesettings-colormapping from="100" to="500" color='@new[] { "#0066CC" }'></e-shapesettings-colormapping>
                    </e-shapesettings-colormappings>
                </e-layersettings-shapesettings>
            </e-maps-layer>
        </e-maps-layers>
    </ejs-maps>
</div>

<script>
    function onMapsLoad(args) {
        // Responsive annotations with percentage positioning
    }
</script>
```

**Controller Code:**
```csharp
public IActionResult PercentagePositioning()
{
    ViewBag.worldMap = GetWorldMap();
    ViewBag.populationData = new[]
    {
        new { Country = "China", density = 153 },
        new { Country = "India", density = 464 },
        new { Country = "United States", density = 36 },
        new { Country = "Indonesia", density = 151 },
        new { Country = "Brazil", density = 25 }
    };
    return View();
}
```

## Annotation Alignment

Annotations can be aligned using `HorizontalAlignment` and `VerticalAlignment` properties with values: **Center**, **Far**, **Near**, and **None**.

### Complete Example: Various Alignments

```cshtml
@using Syncfusion.EJ2
@using Syncfusion.EJ2.Maps

<div class="control-section">
    <ejs-maps id="maps" load="onMapsLoad" height="600px">
        <e-maps-annotations>
            <!-- Near-Near (Top-Left) -->
            <e-maps-annotation content="<div style='padding: 10px; background-color: #FF6B6B; color: white; border-radius: 5px;'>Near-Near</div>"
                              x="100"
                              y="100"
                              horizontalAlignment="Near"
                              verticalAlignment="Near"
                              zIndex="1">
            </e-maps-annotation>
            
            <!-- Center-Near (Top-Center) -->
            <e-maps-annotation content="<div style='padding: 10px; background-color: #4ECDC4; color: white; border-radius: 5px;'>Center-Near</div>"
                              x="50%"
                              y="100"
                              horizontalAlignment="Center"
                              verticalAlignment="Near"
                              zIndex="1">
            </e-maps-annotation>
            
            <!-- Far-Near (Top-Right) -->
            <e-maps-annotation content="<div style='padding: 10px; background-color: #FFD93D; color: #333; border-radius: 5px;'>Far-Near</div>"
                              x="700"
                              y="100"
                              horizontalAlignment="Far"
                              verticalAlignment="Near"
                              zIndex="1">
            </e-maps-annotation>
            
            <!-- Near-Center (Middle-Left) -->
            <e-maps-annotation content="<div style='padding: 10px; background-color: #95E1D3; color: #333; border-radius: 5px;'>Near-Center</div>"
                              x="100"
                              y="50%"
                              horizontalAlignment="Near"
                              verticalAlignment="Center"
                              zIndex="1">
            </e-maps-annotation>
            
            <!-- Center-Center (Middle-Center) -->
            <e-maps-annotation content="<div style='padding: 15px; background-color: #F38181; color: white; border-radius: 5px; font-weight: bold;'>Center-Center</div>"
                              x="50%"
                              y="50%"
                              horizontalAlignment="Center"
                              verticalAlignment="Center"
                              zIndex="1">
            </e-maps-annotation>
            
            <!-- Far-Center (Middle-Right) -->
            <e-maps-annotation content="<div style='padding: 10px; background-color: #AA96DA; color: white; border-radius: 5px;'>Far-Center</div>"
                              x="700"
                              y="50%"
                              horizontalAlignment="Far"
                              verticalAlignment="Center"
                              zIndex="1">
            </e-maps-annotation>
            
            <!-- Near-Far (Bottom-Left) -->
            <e-maps-annotation content="<div style='padding: 10px; background-color: #FCBAD3; color: #333; border-radius: 5px;'>Near-Far</div>"
                              x="100"
                              y="500"
                              horizontalAlignment="Near"
                              verticalAlignment="Far"
                              zIndex="1">
            </e-maps-annotation>
            
            <!-- Center-Far (Bottom-Center) -->
            <e-maps-annotation content="<div style='padding: 10px; background-color: #A8E6CF; color: #333; border-radius: 5px;'>Center-Far</div>"
                              x="50%"
                              y="500"
                              horizontalAlignment="Center"
                              verticalAlignment="Far"
                              zIndex="1">
            </e-maps-annotation>
            
            <!-- Far-Far (Bottom-Right) -->
            <e-maps-annotation content="<div style='padding: 10px; background-color: #FFD3B6; color: #333; border-radius: 5px;'>Far-Far</div>"
                              x="700"
                              y="500"
                              horizontalAlignment="Far"
                              verticalAlignment="Far"
                              zIndex="1">
            </e-maps-annotation>
        </e-maps-annotations>
        <e-maps-layers>
            <e-maps-layer shapeData="ViewBag.worldMap">
                <e-layersettings-shapesettings fill="#E5E5E5"></e-layersettings-shapesettings>
            </e-maps-layer>
        </e-maps-layers>
    </ejs-maps>
</div>

<script>
    function onMapsLoad(args) {
        // Demonstrates all alignment combinations
    }
</script>
```

## Z-Index Management

The `ZIndex` property controls the stacking order of annotations. Higher values appear on top of lower values.

### Complete Example: Layered Annotations

```cshtml
@using Syncfusion.EJ2
@using Syncfusion.EJ2.Maps

<div class="control-section">
    <ejs-maps id="maps" load="onMapsLoad" height="600px">
        <e-maps-annotations>
            <!-- Background layer (lowest z-index) -->
            <e-maps-annotation content="<div style='width: 300px; height: 200px; background-color: rgba(255, 107, 107, 0.3); border: 2px solid #FF6B6B; border-radius: 10px;'></div>"
                              x="50%"
                              y="50%"
                              horizontalAlignment="Center"
                              verticalAlignment="Center"
                              zIndex="1">
            </e-maps-annotation>
            
            <!-- Middle layer -->
            <e-maps-annotation content="<div style='width: 250px; height: 150px; background-color: rgba(78, 205, 196, 0.5); border: 2px solid #4ECDC4; border-radius: 8px;'></div>"
                              x="50%"
                              y="50%"
                              horizontalAlignment="Center"
                              verticalAlignment="Center"
                              zIndex="2">
            </e-maps-annotation>
            
            <!-- Top layer (highest z-index) -->
            <e-maps-annotation content="<div style='padding: 20px; background-color: white; border: 3px solid #333; border-radius: 5px; box-shadow: 0 4px 8px rgba(0,0,0,0.2);'><h3 style='margin: 0; color: #333;'>Important Notice</h3><p style='margin: 10px 0 0 0;'>This annotation is on top</p></div>"
                              x="50%"
                              y="50%"
                              horizontalAlignment="Center"
                              verticalAlignment="Center"
                              zIndex="3">
            </e-maps-annotation>
        </e-maps-annotations>
        <e-maps-layers>
            <e-maps-layer shapeData="ViewBag.worldMap">
                <e-layersettings-shapesettings fill="#E5E5E5"></e-layersettings-shapesettings>
            </e-maps-layer>
        </e-maps-layers>
    </ejs-maps>
</div>

<script>
    function onMapsLoad(args) {
        // Overlapping annotations with different z-index values
    }
</script>
```

## Content Types

### Text Content

Simple text content with inline styling.

```cshtml
@using Syncfusion.EJ2
@using Syncfusion.EJ2.Maps

<ejs-maps id="maps">
    <e-maps-annotations>
        <e-maps-annotation content="<div style='font-size: 20px; font-weight: bold; color: #0066CC;'>Map Title</div>"
                          x="50%"
                          y="10%">
        </e-maps-annotation>
    </e-maps-annotations>
    <e-maps-layers>
        <e-maps-layer shapeData="ViewBag.worldMap"></e-maps-layer>
    </e-maps-layers>
</ejs-maps>
```

### HTML Content

Complex HTML structures with images, tables, and styled elements.

#### Complete Example: Rich HTML Annotation

```cshtml
@using Syncfusion.EJ2
@using Syncfusion.EJ2.Maps

<div class="control-section">
    <ejs-maps id="maps" load="onMapsLoad" height="700px">
        <e-maps-annotations>
            <e-maps-annotation content="<div style='padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 10px; box-shadow: 0 8px 16px rgba(0,0,0,0.2); max-width: 350px;'><div style='display: flex; align-items: center; margin-bottom: 15px;'><img src='https://ej2.syncfusion.com/demos/src/maps/images/weather-clear.png' style='width: 50px; height: 50px; margin-right: 15px;' /><div><h2 style='margin: 0; font-size: 24px;'>Population Statistics</h2><p style='margin: 5px 0 0 0; font-size: 14px; opacity: 0.9;'>Updated: March 2024</p></div></div><table style='width: 100%; border-collapse: collapse; margin-top: 10px;'><tr style='border-bottom: 1px solid rgba(255,255,255,0.2);'><td style='padding: 8px;'>Total Countries:</td><td style='text-align: right; font-weight: bold;'>195</td></tr><tr style='border-bottom: 1px solid rgba(255,255,255,0.2);'><td style='padding: 8px;'>World Population:</td><td style='text-align: right; font-weight: bold;'>8.1 Billion</td></tr><tr><td style='padding: 8px;'>Average Density:</td><td style='text-align: right; font-weight: bold;'>58/km²</td></tr></table></div>"
                              x="10%"
                              y="15%"
                              zIndex="1">
            </e-maps-annotation>
        </e-maps-annotations>
        <e-maps-layers>
            <e-maps-layer shapeData="ViewBag.worldMap" 
                          shapePropertyPath='@new[] { "name" }' 
                          shapeDataPath="Country"
                          dataSource="ViewBag.populationData">
                <e-layersettings-shapesettings colorValuePath="density">
                    <e-shapesettings-colormappings>
                        <e-shapesettings-colormapping from="0" to="100" color='@new[] { "#C7E8AC" }'></e-shapesettings-colormapping>
                        <e-shapesettings-colormapping from="100" to="500" color='@new[] { "#759D93" }'></e-shapesettings-colormapping>
                    </e-shapesettings-colormappings>
                </e-layersettings-shapesettings>
            </e-maps-layer>
        </e-maps-layers>
    </ejs-maps>
</div>
```

### Element ID Reference

Reference existing HTML elements by their ID.

#### Complete Example: Element Reference

```cshtml
@using Syncfusion.EJ2
@using Syncfusion.EJ2.Maps

<!-- Hidden template div -->
<div id="annotationTemplate" style="display: none;">
    <div style="padding: 15px; background-color: #FFFFFF; border: 2px solid #0066CC; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
        <h4 style="margin: 0 0 10px 0; color: #0066CC;">Legend Information</h4>
        <ul style="margin: 0; padding-left: 20px; color: #666;">
            <li>Blue: High population density</li>
            <li>Green: Medium population density</li>
            <li>Yellow: Low population density</li>
        </ul>
    </div>
</div>

<div class="control-section">
    <ejs-maps id="maps" load="onMapsLoad">
        <e-maps-annotations>
            <e-maps-annotation content="#annotationTemplate"
                              x="85%"
                              y="15%"
                              zIndex="1">
            </e-maps-annotation>
        </e-maps-annotations>
        <e-maps-layers>
            <e-maps-layer shapeData="ViewBag.worldMap">
                <e-layersettings-shapesettings fill="#E5E5E5"></e-layersettings-shapesettings>
            </e-maps-layer>
        </e-maps-layers>
    </ejs-maps>
</div>

<script>
    function onMapsLoad(args) {
        // Annotation using element ID reference
    }
</script>
```

## Multiple Annotations

Add multiple annotations to display various information across the map.

### Complete Example: Comprehensive Multi-Annotation Map

```cshtml
@using Syncfusion.EJ2
@using Syncfusion.EJ2.Maps

<div class="control-section">
    <ejs-maps id="maps" load="onMapsLoad" height="700px">
        <e-maps-annotations>
            <!-- Title annotation -->
            <e-maps-annotation content="<div style='padding: 15px 30px; background: linear-gradient(90deg, #FF6B6B 0%, #FF8E8E 100%); color: white; border-radius: 25px; font-size: 22px; font-weight: bold; box-shadow: 0 4px 12px rgba(255,107,107,0.4);'>World Climate Zones</div>"
                              x="50%"
                              y="3%"
                              horizontalAlignment="Center"
                              zIndex="5">
            </e-maps-annotation>
            
            <!-- North indicator -->
            <e-maps-annotation content="<div style='text-align: center;'><div style='width: 40px; height: 40px; background-color: #4ECDC4; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 20px; font-weight: bold; box-shadow: 0 2px 8px rgba(0,0,0,0.2);'>N</div><div style='margin-top: 5px; color: #333; font-size: 12px; font-weight: bold;'>North</div></div>"
                              x="95%"
                              y="10%"
                              zIndex="3">
            </e-maps-annotation>
            
            <!-- Tropical zone label -->
            <e-maps-annotation content="<div style='padding: 8px 15px; background-color: rgba(255, 215, 0, 0.9); color: #333; border-radius: 15px; font-size: 14px; font-weight: 600; border: 2px solid #FFD700;'>Tropical Zone</div>"
                              x="50%"
                              y="55%"
                              horizontalAlignment="Center"
                              verticalAlignment="Center"
                              zIndex="2">
            </e-maps-annotation>
            
            <!-- Arctic zone label -->
            <e-maps-annotation content="<div style='padding: 8px 15px; background-color: rgba(173, 216, 230, 0.9); color: #333; border-radius: 15px; font-size: 14px; font-weight: 600; border: 2px solid #87CEEB;'>Arctic Zone</div>"
                              x="50%"
                              y="15%"
                              horizontalAlignment="Center"
                              zIndex="2">
            </e-maps-annotation>
            
            <!-- Antarctic zone label -->
            <e-maps-annotation content="<div style='padding: 8px 15px; background-color: rgba(173, 216, 230, 0.9); color: #333; border-radius: 15px; font-size: 14px; font-weight: 600; border: 2px solid #87CEEB;'>Antarctic Zone</div>"
                              x="50%"
                              y="85%"
                              horizontalAlignment="Center"
                              zIndex="2">
            </e-maps-annotation>
            
            <!-- Info box -->
            <e-maps-annotation content="<div style='padding: 15px; background-color: rgba(255, 255, 255, 0.95); border: 2px solid #666; border-radius: 8px; max-width: 250px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);'><h4 style='margin: 0 0 10px 0; color: #333; font-size: 16px;'>Climate Information</h4><p style='margin: 0; color: #666; font-size: 12px; line-height: 1.5;'>The Earth is divided into different climate zones based on temperature, precipitation, and vegetation patterns.</p></div>"
                              x="5%"
                              y="50%"
                              verticalAlignment="Center"
                              zIndex="4">
            </e-maps-annotation>
            
            <!-- Copyright footer -->
            <e-maps-annotation content="<div style='padding: 5px 10px; background-color: rgba(0, 0, 0, 0.7); color: white; border-radius: 3px; font-size: 10px;'>© 2024 Climate Data Corporation</div>"
                              x="50%"
                              y="97%"
                              horizontalAlignment="Center"
                              zIndex="1">
            </e-maps-annotation>
        </e-maps-annotations>
        <e-maps-layers>
            <e-maps-layer shapeData="ViewBag.worldMap">
                <e-layersettings-shapesettings fill="#E5E5E5"></e-layersettings-shapesettings>
            </e-maps-layer>
        </e-maps-layers>
    </ejs-maps>
</div>

<script>
    function onMapsLoad(args) {
        // Multiple annotations creating a comprehensive display
    }
</script>
```

## Complete Examples

### Example 1: Interactive Dashboard Annotation

```cshtml
@using Syncfusion.EJ2
@using Syncfusion.EJ2.Maps

<div class="control-section">
    <ejs-maps id="maps" load="onMapsLoad" height="700px">
        <e-maps-annotations>
            <!-- Dashboard header -->
            <e-maps-annotation content="<div style='width: 100%; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;'><h1 style='margin: 0; text-align: center; font-size: 28px;'>Global Sales Dashboard</h1><p style='margin: 5px 0 0 0; text-align: center; opacity: 0.9;'>Real-time Analytics - Q1 2024</p></div>"
                              x="50%"
                              y="0"
                              horizontalAlignment="Center"
                              zIndex="10">
            </e-maps-annotation>
            
            <!-- Statistics cards -->
            <e-maps-annotation content="<div style='padding: 15px; background-color: white; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); min-width: 200px;'><div style='font-size: 14px; color: #666; margin-bottom: 5px;'>Total Revenue</div><div style='font-size: 32px; font-weight: bold; color: #4CAF50;'>$2.4M</div><div style='font-size: 12px; color: #4CAF50; margin-top: 5px;'>▲ 23.5% from last quarter</div></div>"
                              x="10%"
                              y="20%"
                              zIndex="5">
            </e-maps-annotation>
            
            <e-maps-annotation content="<div style='padding: 15px; background-color: white; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); min-width: 200px;'><div style='font-size: 14px; color: #666; margin-bottom: 5px;'>Active Customers</div><div style='font-size: 32px; font-weight: bold; color: #2196F3;'>18,542</div><div style='font-size: 12px; color: #2196F3; margin-top: 5px;'>▲ 12.8% growth</div></div>"
                              x="10%"
                              y="35%"
                              zIndex="5">
            </e-maps-annotation>
            
            <e-maps-annotation content="<div style='padding: 15px; background-color: white; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); min-width: 200px;'><div style='font-size: 14px; color: #666; margin-bottom: 5px;'>Orders Processed</div><div style='font-size: 32px; font-weight: bold; color: #FF9800;'>32,891</div><div style='font-size: 12px; color: #FF9800; margin-top: 5px;'>▲ 31.2% increase</div></div>"
                              x="10%"
                              y="50%"
                              zIndex="5">
            </e-maps-annotation>
        </e-maps-annotations>
        <e-maps-layers>
            <e-maps-layer shapeData="ViewBag.worldMap" 
                          shapePropertyPath='@new[] { "name" }' 
                          shapeDataPath="Country"
                          dataSource="ViewBag.salesData">
                <e-layersettings-shapesettings colorValuePath="revenue">
                    <e-shapesettings-colormappings>
                        <e-shapesettings-colormapping from="0" to="100000" color='@new[] { "#E8F5E9" }' label="Low"></e-shapesettings-colormapping>
                        <e-shapesettings-colormapping from="100000" to="500000" color='@new[] { "#66BB6A" }' label="Medium"></e-shapesettings-colormapping>
                        <e-shapesettings-colormapping from="500000" to="2000000" color='@new[] { "#2E7D32" }' label="High"></e-shapesettings-colormapping>
                    </e-shapesettings-colormappings>
                </e-layersettings-shapesettings>
            </e-maps-layer>
        </e-maps-layers>
    </ejs-maps>
</div>
```

### Example 2: Geographic Markers with Annotations

```cshtml
@using Syncfusion.EJ2
@using Syncfusion.EJ2.Maps

<div class="control-section">
    <ejs-maps id="maps" load="onMapsLoad" height="650px">
        <e-maps-annotations>
            <!-- City labels -->
            <e-maps-annotation content="<div style='padding: 5px 10px; background-color: rgba(255, 255, 255, 0.9); border: 2px solid #FF6B6B; border-radius: 5px; font-weight: 600; color: #FF6B6B;'>New York</div>"
                              x="240"
                              y="180"
                              zIndex="2">
            </e-maps-annotation>
            
            <e-maps-annotation content="<div style='padding: 5px 10px; background-color: rgba(255, 255, 255, 0.9); border: 2px solid #4ECDC4; border-radius: 5px; font-weight: 600; color: #4ECDC4;'>London</div>"
                              x="490"
                              y="160"
                              zIndex="2">
            </e-maps-annotation>
            
            <e-maps-annotation content="<div style='padding: 5px 10px; background-color: rgba(255, 255, 255, 0.9); border: 2px solid #FFD93D; border-radius: 5px; font-weight: 600; color: #FFD93D;'>Tokyo</div>"
                              x="720"
                              y="200"
                              zIndex="2">
            </e-maps-annotation>
            
            <e-maps-annotation content="<div style='padding: 5px 10px; background-color: rgba(255, 255, 255, 0.9); border: 2px solid #95E1D3; border-radius: 5px; font-weight: 600; color: #95E1D3;'>Sydney</div>"
                              x="740"
                              y="410"
                              zIndex="2">
            </e-maps-annotation>
        </e-maps-annotations>
        <e-maps-layers>
            <e-maps-layer shapeData="ViewBag.worldMap">
                <e-layersettings-shapesettings fill="#E5E5E5"></e-layersettings-shapesettings>
                <e-layersettings-markers>
                    <e-layersettings-marker visible="true" 
                                                   shape="Circle"
                                                   fill="#FF6B6B"
                                                   height="10"
                                                   width="10"
                                                   dataSource="ViewBag.cityMarkers">
                    </e-layersettings-marker>
                </e-layersettings-markers>
            </e-maps-layer>
        </e-maps-layers>
    </ejs-maps>
</div>

<script>
    function onMapsLoad(args) {
        // Annotations labeling specific geographic locations
    }
</script>
```

**Controller Code:**
```csharp
public IActionResult CityAnnotations()
{
    ViewBag.worldMap = GetWorldMap();
    ViewBag.cityMarkers = new[]
    {
        new { latitude = 40.7128, longitude = -74.0060, name = "New York" },
        new { latitude = 51.5074, longitude = -0.1278, name = "London" },
        new { latitude = 35.6762, longitude = 139.6503, name = "Tokyo" },
        new { latitude = -33.8688, longitude = 151.2093, name = "Sydney" }
    };
    return View();
}
```

## Troubleshooting

### Issue: Annotation Not Displaying

**Problem:** Annotation is not visible on the map.

**Solution:**
1. Verify `Content` property is not empty
2. Check X and Y coordinates are within map bounds
3. Ensure z-index is not lower than map elements
4. Verify HTML content is valid

```cshtml
<!-- Ensure content is provided -->
<e-maps-annotation content="<div>Visible Content</div>" x="50%" y="50%">
</e-maps-annotation>
```

### Issue: Annotation Positioned Incorrectly

**Problem:** Annotation appears in wrong location.

**Solution:**
1. Check if using pixel vs percentage values correctly
2. Verify horizontal and vertical alignment settings
3. Test with absolute positions first (pixel values)
4. Ensure map dimensions are properly set

```cshtml
<!-- Use percentage for responsive positioning -->
<e-maps-annotation content="<div>Text</div>" 
                  x="50%" 
                  y="50%"
                  horizontalAlignment="Center"
                  verticalAlignment="Center">
</e-maps-annotation>
```

### Issue: Annotation Hidden Behind Map

**Problem:** Annotation appears below map layers.

**Solution:**
1. Increase `ZIndex` value (use value > 1)
2. Verify z-index is higher than marker/bubble z-index
3. Check CSS z-index conflicts

```cshtml
<!-- Use high z-index value -->
<e-maps-annotation content="<div>Visible Text</div>" 
                  x="50%" 
                  y="50%"
                  zIndex="100">
</e-maps-annotation>
```

### Issue: HTML Content Not Rendering

**Problem:** HTML content displays as plain text.

**Solution:**
1. Ensure HTML is properly formatted
2. Check for syntax errors in HTML string
3. Verify quotes are escaped correctly in C#
4. Test with simple HTML first

```cshtml
<!-- Properly formatted HTML -->
<e-maps-annotation content="<div style='color: red;'><strong>Bold Text</strong></div>">
</e-maps-annotation>
```

### Issue: Element ID Reference Not Working

**Problem:** Annotation doesn't display when using element ID.

**Solution:**
1. Verify element ID exists in DOM
2. Ensure element ID starts with "#"
3. Check element is not set to display:none permanently
4. Verify element exists before map loads

```cshtml
<!-- Hidden template element -->
<div id="template1" style="display: none;">
    <div>Template Content</div>
</div>

<e-maps-annotation content="#template1" x="50%" y="50%">
</e-maps-annotation>
```

### Issue: Alignment Not Working as Expected

**Problem:** Horizontal or vertical alignment doesn't affect position.

**Solution:**
1. Ensure alignment values are correct: Center, Near, Far, None
2. Check that X/Y values allow room for alignment
3. Test with percentage positioning
4. Verify map has sufficient dimensions

```cshtml
<!-- Proper alignment configuration -->
<e-maps-annotation content="<div>Aligned Text</div>" 
                  x="50%" 
                  y="50%"
                  horizontalAlignment="Center"
                  verticalAlignment="Center">
</e-maps-annotation>
```

### Issue: Annotation Overlaps Map Content

**Problem:** Annotation covers important map elements.

**Solution:**
1. Adjust X/Y positioning
2. Use percentage positioning for responsiveness
3. Adjust z-index if needed
4. Make annotation background transparent
5. Reduce annotation size

```cshtml
<!-- Semi-transparent background -->
<e-maps-annotation content="<div style='background-color: rgba(255,255,255,0.8); padding: 10px;'>Text</div>" 
                  x="10%" 
                  y="10%">
</e-maps-annotation>
```

### Issue: Multiple Annotations Overlap

**Problem:** Multiple annotations appear stacked on each other.

**Solution:**
1. Adjust X/Y coordinates to separate annotations
2. Use different z-index values for intentional layering
3. Calculate positions based on content size
4. Use alignment properties effectively

```cshtml
<!-- Separate annotations with different positions -->
<e-maps-annotation content="<div>First</div>" x="20%" y="20%"></e-maps-annotation>
<e-maps-annotation content="<div>Second</div>" x="80%" y="20%"></e-maps-annotation>
```

### Issue: Annotation Not Responsive

**Problem:** Annotation doesn't adjust when map resizes.

**Solution:**
1. Use percentage values instead of pixels
2. Test map responsiveness
3. Use center alignment with percentages
4. Verify container has proper responsive styling

```cshtml
<!-- Responsive positioning -->
<e-maps-annotation content="<div>Responsive Text</div>" 
                  x="50%" 
                  y="50%"
                  horizontalAlignment="Center"
                  verticalAlignment="Center">
</e-maps-annotation>
```

### Common Error Messages

**"Content property is required"**
- Solution: Ensure `Content` property has a value

**"Invalid HTML in annotation"**
- Solution: Check HTML syntax, close all tags properly

**"Element not found"**
- Solution: Verify element ID exists when using reference

**"ZIndex must be numeric"**
- Solution: Provide valid integer for z-index property
