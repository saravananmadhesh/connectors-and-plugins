# Legend in Syncfusion ASP.NET Core Maps

## Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
  - [Basic Prerequisites](#basic-prerequisites)
  - [Basic Legend Configuration](#basic-legend-configuration)
- [Legend Modes](#legend-modes)
  - [Default Mode](#default-mode)
    - [Complete Example: Default Legend Mode](#complete-example-default-legend-mode)
  - [Interactive Mode](#interactive-mode)
    - [Complete Example: Interactive Legend Mode](#complete-example-interactive-legend-mode)
- [Legend Positioning](#legend-positioning)
  - [Dock Position](#dock-position)
    - [Complete Example: Dock Positioning](#complete-example-dock-positioning)
  - [Absolute Position](#absolute-position)
    - [Complete Example: Absolute Positioning](#complete-example-absolute-positioning)
- [Legend for Different Elements](#legend-for-different-elements)
  - [Legend for Shapes](#legend-for-shapes)
    - [Complete Example: Shape Legend with Toggle](#complete-example-shape-legend-with-toggle)
  - [Legend for Bubbles](#legend-for-bubbles)
    - [Complete Example: Bubble Legend](#complete-example-bubble-legend)
  - [Legend for Markers](#legend-for-markers)
    - [Complete Example: Marker Legend with Custom Shapes](#complete-example-marker-legend-with-custom-shapes)
- [Legend Customization](#legend-customization)
  - [Complete Example: Comprehensive Legend Customization](#complete-example-comprehensive-legend-customization)
- [Advanced Features](#advanced-features)
  - [Hide Specific Legend Items](#hide-specific-legend-items)
  - [Legend Items from Data Source](#legend-items-from-data-source)
  - [Remove Duplicate Legend Items](#remove-duplicate-legend-items)
- [Complete Examples](#complete-examples)
  - [Example 1: Interactive Legend with Inverted Pointer](#example-1-interactive-legend-with-inverted-pointer)
  - [Example 2: Multi-Type Legend (Shapes and Markers)](#example-2-multi-type-legend-shapes-and-markers)
- [Troubleshooting](#troubleshooting)
  - [Issue: Legend Not Displaying](#issue-legend-not-displaying)
  - [Issue: Legend Items Not Matching Data](#issue-legend-items-not-matching-data)
  - [Issue: Interactive Mode Not Working](#issue-interactive-mode-not-working)
  - [Issue: Legend Position Overlaps Map](#issue-legend-position-overlaps-map)
  - [Issue: Toggle Legend Not Working](#issue-toggle-legend-not-working)
  - [Issue: Bubble Legend Not Appearing](#issue-bubble-legend-not-appearing)
  - [Issue: Marker Shapes Not Showing in Legend](#issue-marker-shapes-not-showing-in-legend)
  - [Issue: Legend Text Truncated](#issue-legend-text-truncated)
  - [Issue: Duplicate Legend Items Appearing](#issue-duplicate-legend-items-appearing)
  - [Common Error Messages](#common-error-messages)

## Overview

The Legend in Syncfusion ASP.NET Core Maps provides a visual representation of symbols used on the map. It helps users interpret colors, shapes, and other identifiers based on the data, explaining what each symbol represents. Legends can display information for shapes, bubbles, or markers, and support two modes: Default and Interactive.

## Getting Started

To enable legend in Maps, set the `Visible` property of `MapsLegendSettings` to **true**.

### Basic Prerequisites

```csharp
@using Syncfusion.EJ2
@using Syncfusion.EJ2.Maps
```

### Basic Legend Configuration

```cshtml
<ejs-maps id="maps">
    <e-maps-legendsettings visible="true"></e-maps-legendsettings>
    <e-maps-layers>
        <!-- Layer configuration -->
    </e-maps-layers>
</ejs-maps>
```

## Legend Modes

### Default Mode

Default mode legends display symbols with legend labels to identify shape, bubble, or marker colors. This is the standard display mode.

#### Complete Example: Default Legend Mode

```cshtml
@using Syncfusion.EJ2
@using Syncfusion.EJ2.Maps

<div class="control-section">
    <ejs-maps id="maps" load="onMapsLoad">
        <e-maps-legendsettings visible="true" 
                              mode="Default"
                              position="Bottom">
        </e-maps-legendsettings>
        <e-maps-layers>
            <e-maps-layer shapeData="ViewBag.worldMap" 
                          shapePropertyPath='@new[] { "name" }' 
                          shapeDataPath="Country"
                          dataSource="ViewBag.membershipData">
                <e-layersettings-shapesettings fill="#E5E5E5" colorValuePath="Membership">
                    <e-shapesettings-colormappings>
                        <e-shapesettings-colormapping value="Permanent" color='@new[] { "#D84444" }' label="Permanent Members"></e-shapesettings-colormapping>
                        <e-shapesettings-colormapping value="Non-Permanent" color='@new[] { "#316DB5" }' label="Non-Permanent Members"></e-shapesettings-colormapping>
                    </e-shapesettings-colormappings>
                </e-layersettings-shapesettings>
            </e-maps-layer>
        </e-maps-layers>
    </ejs-maps>
</div>

<script>
    function onMapsLoad(args) {
        // Map configuration
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
    
    public IActionResult DefaultLegend()
    {
        ViewBag.worldMap = GetWorldMap();
        ViewBag.membershipData = new[]
        {
            new { Country = "China", Membership = "Permanent" },
            new { Country = "France", Membership = "Permanent" },
            new { Country = "Russia", Membership = "Permanent" },
            new { Country = "United Kingdom", Membership = "Permanent" },
            new { Country = "United States", Membership = "Permanent" },
            new { Country = "Bolivia", Membership = "Non-Permanent" },
            new { Country = "Ethiopia", Membership = "Non-Permanent" },
            new { Country = "Kazakhstan", Membership = "Non-Permanent" }
        };
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

### Interactive Mode

Interactive mode displays an arrow indicator showing the exact range color when hovering over corresponding shapes. The `InvertedPointer` property controls the visibility of the inverted pointer.

#### Complete Example: Interactive Legend Mode

```cshtml
@using Syncfusion.EJ2
@using Syncfusion.EJ2.Maps

<div class="control-section">
    <ejs-maps id="maps" load="onMapsLoad">
        <e-maps-legendsettings visible="true" 
                              mode="Interactive"
                              invertedPointer="true"
                              position="Bottom">
        </e-maps-legendsettings>
        <e-maps-layers>
            <e-maps-layer shapeData="ViewBag.worldMap" 
                          shapePropertyPath='@new[] { "name" }' 
                          shapeDataPath="Country"
                          dataSource="ViewBag.populationData">
                <e-layersettings-shapesettings fill="#E5E5E5" colorValuePath="density">
                    <e-shapesettings-colormappings>
                        <e-shapesettings-colormapping from="0" to="100" color='@new[] { "#C7E8AC" }' label="< 100"></e-shapesettings-colormapping>
                        <e-shapesettings-colormapping from="100" to="200" color='@new[] { "#8DC26F" }' label="100 - 200"></e-shapesettings-colormapping>
                        <e-shapesettings-colormapping from="200" to="300" color='@new[] { "#759D93" }' label="200 - 300"></e-shapesettings-colormapping>
                        <e-shapesettings-colormapping from="300" to="500" color='@new[] { "#37524A" }' label="> 300"></e-shapesettings-colormapping>
                    </e-shapesettings-colormappings>
                </e-layersettings-shapesettings>
            </e-maps-layer>
        </e-maps-layers>
    </ejs-maps>
</div>

<script>
    function onMapsLoad(args) {
        // Interactive legend configured
    }
</script>
```

**Controller Code:**
```csharp
public IActionResult InteractiveLegend()
{
    ViewBag.worldMap = GetWorldMap();
    ViewBag.populationData = new[]
    {
        new { Country = "China", density = 153 },
        new { Country = "India", density = 464 },
        new { Country = "United States", density = 36 },
        new { Country = "Indonesia", density = 151 },
        new { Country = "Brazil", density = 25 },
        new { Country = "Pakistan", density = 287 },
        new { Country = "Nigeria", density = 226 },
        new { Country = "Bangladesh", density = 1265 },
        new { Country = "Russia", density = 9 },
        new { Country = "Japan", density = 336 }
    };
    return View();
}
```

## Legend Positioning

### Dock Position

Legends can be positioned at four locations (Top, Left, Bottom, Right) and aligned with Near, Center, or Far, providing 12 total position combinations.

#### Complete Example: Dock Positioning

```cshtml
@using Syncfusion.EJ2
@using Syncfusion.EJ2.Maps

<div class="control-section">
    <ejs-maps id="maps" load="onMapsLoad">
        <e-maps-legendsettings visible="true" 
                              position="Right"
                              alignment="Center"
                              height="200px"
                              width="100px">
        </e-maps-legendsettings>
        <e-maps-layers>
            <e-maps-layer shapeData="ViewBag.worldMap" 
                          shapePropertyPath='@new[] { "name" }' 
                          shapeDataPath="Country"
                          dataSource="ViewBag.populationData">
                <e-layersettings-shapesettings colorValuePath="density">
                    <e-shapesettings-colormappings>
                        <e-shapesettings-colormapping from="0" to="100" color='@new[] { "#E6F2FF" }' label="Low Density"></e-shapesettings-colormapping>
                        <e-shapesettings-colormapping from="100" to="200" color='@new[] { "#80B3FF" }' label="Medium Density"></e-shapesettings-colormapping>
                        <e-shapesettings-colormapping from="200" to="500" color='@new[] { "#0066CC" }' label="High Density"></e-shapesettings-colormapping>
                    </e-shapesettings-colormappings>
                </e-layersettings-shapesettings>
            </e-maps-layer>
        </e-maps-layers>
    </ejs-maps>
</div>

<script>
    function onMapsLoad(args) {
        // Legend positioned at right-center
    }
</script>
```

### Absolute Position

Position legend using X and Y coordinates by setting `Position` property to "Float" and using the `Location` property.

#### Complete Example: Absolute Positioning

```cshtml
@using Syncfusion.EJ2
@using Syncfusion.EJ2.Maps

<div class="control-section">
    <ejs-maps id="maps" load="onMapsLoad">
        <e-maps-legendsettings visible="true" 
                              position="Float"
                              location="new { x = 100, y = 200 }">
        </e-maps-legendsettings>
        <e-maps-layers>
            <e-maps-layer shapeData="ViewBag.worldMap" 
                          shapePropertyPath='@new[] { "name" }' 
                          shapeDataPath="Country"
                          dataSource="ViewBag.regionData">
                <e-layersettings-shapesettings colorValuePath="Region">
                    <e-shapesettings-colormappings>
                        <e-shapesettings-colormapping value="Asia" color='@new[] { "#FF6B6B" }' label="Asia"></e-shapesettings-colormapping>
                        <e-shapesettings-colormapping value="Europe" color='@new[] { "#4ECDC4" }' label="Europe"></e-shapesettings-colormapping>
                        <e-shapesettings-colormapping value="Africa" color='@new[] { "#FFD93D" }' label="Africa"></e-shapesettings-colormapping>
                        <e-shapesettings-colormapping value="Americas" color='@new[] { "#95E1D3" }' label="Americas"></e-shapesettings-colormapping>
                    </e-shapesettings-colormappings>
                </e-layersettings-shapesettings>
            </e-maps-layer>
        </e-maps-layers>
    </ejs-maps>
</div>
```

## Legend for Different Elements

### Legend for Shapes

Legend for shapes is automatically generated from color mapping configurations. Set the `Label` property in `MapsColorMapping` to define legend text.

#### Complete Example: Shape Legend with Toggle

```cshtml
@using Syncfusion.EJ2
@using Syncfusion.EJ2.Maps

<div class="control-section">
    <ejs-maps id="maps" load="onMapsLoad">
        <e-maps-legendsettings visible="true" position="Bottom">
            <e-legendsettings-togglelegendsettings enable="true" 
                                                   applyShapeSettings="false"
                                                   fill="#E5E5E5"
                                                   opacity="0.5">
                <e-togglelegendsettings-border color="#000000" width="2"></e-togglelegendsettings-border>
            </e-legendsettings-togglelegendsettings>
        </e-maps-legendsettings>
        <e-maps-layers>
            <e-maps-layer shapeData="ViewBag.worldMap" 
                          shapePropertyPath='@new[] { "name" }' 
                          shapeDataPath="Country"
                          dataSource="ViewBag.continentData">
                <e-layersettings-shapesettings colorValuePath="Continent">
                    <e-shapesettings-colormappings>
                        <e-shapesettings-colormapping value="Asia" color='@new[] { "#FF6B6B" }' label="Asia"></e-shapesettings-colormapping>
                        <e-shapesettings-colormapping value="Europe" color='@new[] { "#4ECDC4" }' label="Europe"></e-shapesettings-colormapping>
                        <e-shapesettings-colormapping value="Africa" color='@new[] { "#FFD93D" }' label="Africa"></e-shapesettings-colormapping>
                        <e-shapesettings-colormapping value="North America" color='@new[] { "#95E1D3" }' label="North America"></e-shapesettings-colormapping>
                        <e-shapesettings-colormapping value="South America" color='@new[] { "#A8E6CF" }' label="South America"></e-shapesettings-colormapping>
                        <e-shapesettings-colormapping value="Oceania" color='@new[] { "#FFDAB9" }' label="Oceania"></e-shapesettings-colormapping>
                    </e-shapesettings-colormappings>
                </e-layersettings-shapesettings>
            </e-maps-layer>
        </e-maps-layers>
    </ejs-maps>
</div>

<script>
    function onMapsLoad(args) {
        // Click legend items to toggle shape visibility
    }
</script>
```

### Legend for Bubbles

Enable bubble legend by setting `Type` property to "Bubbles" in `MapsLegendSettings`.

#### Complete Example: Bubble Legend

```cshtml
@using Syncfusion.EJ2
@using Syncfusion.EJ2.Maps

<div class="control-section">
    <ejs-maps id="maps" load="onMapsLoad">
        <e-maps-legendsettings visible="true" 
                              type="Bubbles"
                              position="Bottom">
        </e-maps-legendsettings>
        <e-maps-layers>
            <e-maps-layer shapeData="ViewBag.worldMap" 
                          shapePropertyPath='@new[] { "name" }' 
                          shapeDataPath="Country"
                          dataSource="ViewBag.populationData">
                <e-layersettings-shapesettings fill="#E5E5E5"></e-layersettings-shapesettings>
                <e-layersettings-bubblesettings>
                    <e-layersettings-bubblesetting visible="true" 
                                                   valuePath="population"
                                                   colorValuePath="density"
                                                   dataSource="ViewBag.populationData"
                                                   minRadius="5"
                                                   maxRadius="40">
                        <e-bubblesettings-colormappings>
                            <e-bubblesettings-colormapping from="0" to="100" color='@new[] { "#C7E8AC" }' label="Low Density"></e-bubblesettings-colormapping>
                            <e-bubblesettings-colormapping from="100" to="300" color='@new[] { "#F4A732" }' label="Medium Density"></e-bubblesettings-colormapping>
                            <e-bubblesettings-colormapping from="300" to="1500" color='@new[] { "#DF5A3A" }' label="High Density"></e-bubblesettings-colormapping>
                        </e-bubblesettings-colormappings>
                    </e-layersettings-bubblesetting>
                </e-layersettings-bubblesettings>
            </e-maps-layer>
        </e-maps-layers>
    </ejs-maps>
</div>

<script>
    function onMapsLoad(args) {
        // Bubble legend shows density ranges
    }
</script>
```

**Controller Code:**
```csharp
public IActionResult BubbleLegend()
{
    ViewBag.worldMap = GetWorldMap();
    ViewBag.populationData = new[]
    {
        new { Country = "China", population = 1403500365, density = 153 },
        new { Country = "India", population = 1366417754, density = 464 },
        new { Country = "United States", population = 329064917, density = 36 },
        new { Country = "Indonesia", population = 270625568, density = 151 },
        new { Country = "Pakistan", population = 216565318, density = 287 },
        new { Country = "Bangladesh", population = 163046161, density = 1265 }
    };
    return View();
}
```

### Legend for Markers

Enable marker legend by setting `Type` property to "Markers". Use `LegendText` property in `MapsMarker` for custom legend labels.

#### Complete Example: Marker Legend with Custom Shapes

```cshtml
@using Syncfusion.EJ2
@using Syncfusion.EJ2.Maps

<div class="control-section">
    <ejs-maps id="maps" load="onMapsLoad">
        <e-maps-legendsettings visible="true" 
                              type="Markers"
                              position="Top"
                              useMarkerShape="true"
                              shapeBorder="new { color = '#000000', width = 1 }">
        </e-maps-legendsettings>
        <e-maps-layers>
            <e-maps-layer shapeData="ViewBag.worldMap">
                <e-layersettings-shapesettings fill="#C3E6ED"></e-layersettings-shapesettings>
                <e-layersettings-markers>
                    <e-layersettings-marker visible="true" 
                                                   shape="Circle"
                                                   fill="#FF0000"
                                                   height="15"
                                                   width="15"
                                                   legendText="Capital Cities"
                                                   dataSource="ViewBag.capitalCities">
                    </e-layersettings-marker>
                    <e-layersettings-marker visible="true" 
                                                   shape="Diamond"
                                                   fill="#00FF00"
                                                   height="15"
                                                   width="15"
                                                   legendText="Major Ports"
                                                   dataSource="ViewBag.majorPorts">
                    </e-layersettings-marker>
                    <e-layersettings-marker visible="true" 
                                                   shape="Star"
                                                   fill="#0000FF"
                                                   height="15"
                                                   width="15"
                                                   legendText="Tourist Attractions"
                                                   dataSource="ViewBag.touristSpots">
                    </e-layersettings-marker>
                </e-layersettings-markers>
            </e-maps-layer>
        </e-maps-layers>
    </ejs-maps>
</div>

<script>
    function onMapsLoad(args) {
        // Marker legend displays with actual marker shapes
    }
</script>
```

**Controller Code:**
```csharp
public IActionResult MarkerLegend()
{
    ViewBag.worldMap = GetWorldMap();
    ViewBag.capitalCities = new[]
    {
        new { latitude = 35.6762, longitude = 139.6503, name = "Tokyo" },
        new { latitude = 40.7128, longitude = -74.0060, name = "New York" },
        new { latitude = 51.5074, longitude = -0.1278, name = "London" }
    };
    ViewBag.majorPorts = new[]
    {
        new { latitude = 1.3521, longitude = 103.8198, name = "Singapore" },
        new { latitude = 22.3193, longitude = 114.1694, name = "Hong Kong" }
    };
    ViewBag.touristSpots = new[]
    {
        new { latitude = 27.1751, longitude = 78.0421, name = "Taj Mahal" },
        new { latitude = 48.8584, longitude = 2.2945, name = "Eiffel Tower" }
    };
    return View();
}
```

## Legend Customization

### Complete Example: Comprehensive Legend Customization

```cshtml
@using Syncfusion.EJ2
@using Syncfusion.EJ2.Maps

<div class="control-section">
    <ejs-maps id="maps" load="onMapsLoad">
        <e-maps-legendsettings visible="true" 
                              position="Bottom"
                              alignment="Center"
                              orientation="Horizontal"
                              shape="Circle"
                              shapeWidth="20"
                              shapeHeight="20"
                              shapePadding="10"
                              background="#FFFFFF"
                              opacity="1"
                              height="80px"
                              width="600px">
            <e-legendsettings-border color="#000000" width="2" opacity="1"></e-legendsettings-border>
            <e-legendsettings-shapeborder color="#333333" width="1"></e-legendsettings-shapeborder>
            <e-legendsettings-textstyle size="14px" 
                                       fontFamily="Roboto" 
                                       fontWeight="500"
                                       color="#000000">
            </e-legendsettings-textstyle>
            <e-legendsettings-title text="Population Density (per sq km)">
                <e-legendsettings-titlestyle size="16px" 
                                  fontFamily="Roboto" 
                                  fontWeight="bold"
                                  color="#333333">
                </e-legendsettings-titlestyle>
            </e-legendsettings-title>
        </e-maps-legendsettings>
        <e-maps-layers>
            <e-maps-layer shapeData="ViewBag.worldMap" 
                          shapePropertyPath='@new[] { "name" }' 
                          shapeDataPath="Country"
                          dataSource="ViewBag.populationData">
                <e-layersettings-shapesettings colorValuePath="density">
                    <e-shapesettings-colormappings>
                        <e-shapesettings-colormapping from="0" to="50" color='@new[] { "#E6F5FF" }' label="Very Low (0-50)"></e-shapesettings-colormapping>
                        <e-shapesettings-colormapping from="50" to="100" color='@new[] { "#99D6FF" }' label="Low (50-100)"></e-shapesettings-colormapping>
                        <e-shapesettings-colormapping from="100" to="200" color='@new[] { "#4DB8FF" }' label="Medium (100-200)"></e-shapesettings-colormapping>
                        <e-shapesettings-colormapping from="200" to="400" color='@new[] { "#0080CC" }' label="High (200-400)"></e-shapesettings-colormapping>
                        <e-shapesettings-colormapping from="400" to="2000" color='@new[] { "#004D7A" }' label="Very High (400+)"></e-shapesettings-colormapping>
                    </e-shapesettings-colormappings>
                </e-layersettings-shapesettings>
            </e-maps-layer>
        </e-maps-layers>
    </ejs-maps>
</div>

<script>
    function onMapsLoad(args) {
        // Fully customized legend
    }
</script>
```

## Advanced Features

### Hide Specific Legend Items

Use `ShowLegend` property in `MapsColorMapping` to control individual legend item visibility.

```cshtml
@using Syncfusion.EJ2
@using Syncfusion.EJ2.Maps

<div class="control-section">
    <ejs-maps id="maps">
        <e-maps-legendsettings visible="true"></e-maps-legendsettings>
        <e-maps-layers>
            <e-maps-layer shapeData="ViewBag.worldMap" 
                          dataSource="ViewBag.data">
                <e-layersettings-shapesettings colorValuePath="value">
                    <e-shapesettings-colormappings>
                        <e-shapesettings-colormapping from="0" to="100" color='@new[] { "#D3E3F4" }' label="Low" showLegend="true"></e-shapesettings-colormapping>
                        <e-shapesettings-colormapping from="100" to="200" color='@new[] { "#A6C8E5" }' label="Medium" showLegend="false"></e-shapesettings-colormapping>
                        <e-shapesettings-colormapping from="200" to="500" color='@new[] { "#4A90E2" }' label="High" showLegend="true"></e-shapesettings-colormapping>
                    </e-shapesettings-colormappings>
                </e-layersettings-shapesettings>
            </e-maps-layer>
        </e-maps-layers>
    </ejs-maps>
</div>
```

### Legend Items from Data Source

Use `ValuePath` to display legend text from data source values.

```cshtml
@using Syncfusion.EJ2
@using Syncfusion.EJ2.Maps

<div class="control-section">
    <ejs-maps id="maps">
        <e-maps-legendsettings visible="true" valuePath="Country"></e-maps-legendsettings>
        <e-maps-layers>
            <e-maps-layer shapeData="ViewBag.worldMap" 
                          dataSource="ViewBag.customData"
                          shapePropertyPath='@new[] { "name" }' 
                          shapeDataPath="Country">
                <e-layersettings-shapesettings colorValuePath="status">
                    <e-shapesettings-colormappings>
                        <e-shapesettings-colormapping value="Developed" color='@new[] { "#4CAF50" }'></e-shapesettings-colormapping>
                        <e-shapesettings-colormapping value="Developing" color='@new[] { "#FFC107" }'></e-shapesettings-colormapping>
                        <e-shapesettings-colormapping value="Underdeveloped" color='@new[] { "#F44336" }'></e-shapesettings-colormapping>
                    </e-shapesettings-colormappings>
                </e-layersettings-shapesettings>
            </e-maps-layer>
        </e-maps-layers>
    </ejs-maps>
</div>
```

### Remove Duplicate Legend Items

Set `RemoveDuplicateLegend` to **true** to hide duplicate legend entries.

```cshtml
@using Syncfusion.EJ2
@using Syncfusion.EJ2.Maps

<div class="control-section">
    <ejs-maps id="maps">
        <e-maps-legendsettings visible="true" removeDuplicateLegend="true"></e-maps-legendsettings>
        <e-maps-layers>
            <e-maps-layer shapeData="ViewBag.worldMap" 
                          dataSource="ViewBag.data">
                <e-layersettings-shapesettings colorValuePath="category">
                    <e-shapesettings-colormappings>
                        <e-shapesettings-colormapping value="Category A" color='@new[] { "#FF5733" }' label="Category A"></e-shapesettings-colormapping>
                        <e-shapesettings-colormapping value="Category B" color='@new[] { "#33FF57" }' label="Category B"></e-shapesettings-colormapping>
                    </e-shapesettings-colormappings>
                </e-layersettings-shapesettings>
            </e-maps-layer>
        </e-maps-layers>
    </ejs-maps>
</div>
```

## Complete Examples

### Example 1: Interactive Legend with Inverted Pointer

```cshtml
@using Syncfusion.EJ2
@using Syncfusion.EJ2.Maps

<div class="control-section">
    <ejs-maps id="maps" load="onMapsLoad">
        <e-maps-legendsettings visible="true" 
                              mode="Interactive"
                              invertedPointer="true"
                              position="Float"
                              location="new { x = 20, y = 400 }"
                              orientation="Vertical"
                              height="300px"
                              width="150px"
                              background="#FFFFFF">
            <e-legendsettings-border color="#E0E0E0" width="1"></e-legendsettings-border>
        </e-maps-legendsettings>
        <e-maps-layers>
            <e-maps-layer shapeData="ViewBag.worldMap" 
                          shapePropertyPath='@new[] { "name" }' 
                          shapeDataPath="Country"
                          dataSource="ViewBag.temperatureData">
                <e-layersettings-shapesettings colorValuePath="avgTemp">
                    <e-shapesettings-colormappings>
                        <e-shapesettings-colormapping from="-20" to="0" color='@new[] { "#B3E5FC" }' label="< 0°C"></e-shapesettings-colormapping>
                        <e-shapesettings-colormapping from="0" to="10" color='@new[] { "#81C784" }' label="0-10°C"></e-shapesettings-colormapping>
                        <e-shapesettings-colormapping from="10" to="20" color='@new[] { "#FFB74D" }' label="10-20°C"></e-shapesettings-colormapping>
                        <e-shapesettings-colormapping from="20" to="35" color='@new[] { "#E57373" }' label="> 20°C"></e-shapesettings-colormapping>
                    </e-shapesettings-colormappings>
                </e-layersettings-shapesettings>
            </e-maps-layer>
        </e-maps-layers>
    </ejs-maps>
</div>
```

### Example 2: Multi-Type Legend (Shapes and Markers)

```cshtml
@using Syncfusion.EJ2
@using Syncfusion.EJ2.Maps

<div class="control-section">
    <div style="display: flex; flex-direction: column;">
        <ejs-maps id="maps1" load="onMapsLoad" style="margin-bottom: 20px;">
            <e-maps-legendsettings visible="true" 
                                  type="Layers"
                                  position="Top">
            </e-maps-legendsettings>
            <e-maps-layers>
                <e-maps-layer shapeData="ViewBag.worldMap" 
                              dataSource="ViewBag.regionData">
                    <e-layersettings-shapesettings colorValuePath="region">
                        <e-shapesettings-colormappings>
                            <e-shapesettings-colormapping value="Asia" color='@new[] { "#FF6B6B" }' label="Asia"></e-shapesettings-colormapping>
                            <e-shapesettings-colormapping value="Europe" color='@new[] { "#4ECDC4" }' label="Europe"></e-shapesettings-colormapping>
                            <e-shapesettings-colormapping value="Africa" color='@new[] { "#FFD93D" }' label="Africa"></e-shapesettings-colormapping>
                        </e-shapesettings-colormappings>
                    </e-layersettings-shapesettings>
                    <e-layersettings-markers>
                        <e-layersettings-marker visible="true" 
                                                       shape="Circle"
                                                       fill="#FF0000"
                                                       legendText="Major Cities"
                                                       dataSource="ViewBag.cities">
                        </e-layersettings-marker>
                    </e-layersettings-markers>
                </e-maps-layer>
            </e-maps-layers>
        </ejs-maps>
    </div>
</div>
```

## Troubleshooting

### Issue: Legend Not Displaying

**Problem:** Legend is not visible on the map despite setting `Visible` to true.

**Solution:**
1. Verify color mappings are properly configured
2. Ensure `Label` property is set in color mappings
3. Check that legend doesn't overflow map boundaries
4. Verify position and alignment settings

```cshtml
<!-- Ensure label is set -->
<e-shapesettings-colormapping from="0" to="100" color='@new[] { "#FF0000" }' label="0-100"></e-shapesettings-colormapping>
```

### Issue: Legend Items Not Matching Data

**Problem:** Legend shows incorrect items or colors.

**Solution:**
1. Verify `ColorValuePath` matches data field names
2. Check data source is properly bound
3. Ensure color mapping values match data values exactly
4. Verify `ValuePath` setting if using custom legend text

```csharp
// Ensure field names match
ViewBag.data = new[] { new { Country = "USA", density = 35 } }; // 'density' must match ColorValuePath
```

### Issue: Interactive Mode Not Working

**Problem:** Interactive legend doesn't show pointer on hover.

**Solution:**
1. Verify `Mode` is set to "Interactive"
2. Ensure range color mapping is used (not equal color mapping)
3. Check that shapes have proper data binding
4. Verify browser JavaScript is enabled

```cshtml
<e-maps-legendsettings visible="true" mode="Interactive" invertedPointer="true">
</e-maps-legendsettings>
```

### Issue: Legend Position Overlaps Map

**Problem:** Legend overlaps with map content making it unreadable.

**Solution:**
1. Adjust legend position using different dock positions
2. Use absolute positioning with `Location` property
3. Resize legend using `Height` and `Width` properties
4. Change legend orientation to fit better

```cshtml
<!-- Try different position -->
<e-maps-legendsettings visible="true" 
                      position="Bottom" 
                      height="60px"
                      alignment="Center">
</e-maps-legendsettings>
```

### Issue: Toggle Legend Not Working

**Problem:** Clicking legend items doesn't toggle shape visibility.

**Solution:**
1. Verify `Enable` property in `MapsToggleLegendSettings` is true
2. Ensure proper color mapping configuration
3. Check that shapes have data binding
4. Verify no JavaScript errors in console

```cshtml
<e-legendsettings-togglelegendsettings enable="true" 
                                       fill="#E5E5E5"
                                       opacity="0.5">
</e-legendsettings-togglelegendsettings>
```

### Issue: Bubble Legend Not Appearing

**Problem:** Legend for bubbles is not displayed.

**Solution:**
1. Verify `Type` property is set to "Bubbles"
2. Ensure bubble color mappings are configured
3. Check that bubble `Visible` property is true
4. Verify `ColorValuePath` is set in bubble settings

```cshtml
<e-maps-legendsettings visible="true" type="Bubbles"></e-maps-legendsettings>
```

### Issue: Marker Shapes Not Showing in Legend

**Problem:** Legend displays but doesn't show actual marker shapes.

**Solution:**
1. Set `UseMarkerShape` property to true
2. Verify marker settings are properly configured
3. Ensure `LegendText` is set for each marker
4. Check that `Type` is set to "Markers"

```cshtml
<e-maps-legendsettings visible="true" 
                      type="Markers"
                      useMarkerShape="true">
</e-maps-legendsettings>
```

### Issue: Legend Text Truncated

**Problem:** Legend labels are cut off or truncated.

**Solution:**
1. Increase legend `Width` or `Height`
2. Use shorter label text
3. Adjust `ShapePadding` for more space
4. Change legend orientation
5. Use custom text style with smaller font size

```cshtml
<e-maps-legendsettings visible="true" 
                      width="250px"
                      shapePadding="15">
    <e-legendsettings-textstyle size="12px"></e-legendsettings-textstyle>
</e-maps-legendsettings>
```

### Issue: Duplicate Legend Items Appearing

**Problem:** Same legend item appears multiple times.

**Solution:**
1. Set `RemoveDuplicateLegend` to true
2. Check data for duplicate entries
3. Verify color mapping configuration
4. Ensure proper data source structure

```cshtml
<e-maps-legendsettings visible="true" removeDuplicateLegend="true">
</e-maps-legendsettings>
```

### Common Error Messages

**"Legend settings not defined"**
- Solution: Ensure `MapsLegendSettings` is properly configured before layers

**"Cannot read property 'visible' of undefined"**
- Solution: Verify legend settings are inside `<ejs-maps>` tag

**"Color mapping required for legend"**
- Solution: Configure at least one color mapping in shape or bubble settings

**"Invalid legend position"**
- Solution: Use valid position values: Top, Bottom, Left, Right, or Float
