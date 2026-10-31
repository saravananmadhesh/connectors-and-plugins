# User Interactions

## Table of Contents
- [Overview](#overview)
- [Zooming](#zooming)
  - [Enable Zooming](#enable-zooming)
  - [Zoom Toolbar](#zoom-toolbar)
  - [Zoom by Mouse Wheel](#zoom-by-mouse-wheel)
  - [Pinch Zoom (Touch Devices)](#pinch-zoom-touch-devices)
  - [Zoom to Specific Region](#zoom-to-specific-region)
- [Panning](#panning)
  - [Enable Panning](#enable-panning)
- [Tooltips](#tooltips)
  - [Basic Tooltip](#basic-tooltip)
  - [Tooltip Template](#tooltip-template)
  - [Tooltip Styling](#tooltip-styling)
  - [Marker Tooltips](#marker-tooltips)
- [Selection](#selection)
  - [Enable Selection](#enable-selection)
  - [Selection Events](#selection-events)
  - [Multi-Selection](#multi-selection)
- [Highlight](#highlight)
  - [Enable Highlight](#enable-highlight)
  - [Highlight with Tooltip](#highlight-with-tooltip)
- [Navigation Lines](#navigation-lines)
  - [Basic Navigation Line](#basic-navigation-line)
  - [Curved Navigation Lines](#curved-navigation-lines)
  - [Animated Navigation Lines](#animated-navigation-lines)
- [Complete Examples](#complete-examples)
  - [Example 1: Interactive World Map with All Features](#example-1-interactive-world-map-with-all-features)
  - [Example 2: Flight Route Map with Navigation Lines](#example-2-flight-route-map-with-navigation-lines)
- [Best Practices](#best-practices)
  - [1. Progressive Enhancement](#1-progressive-enhancement)
  - [2. Performance Optimization](#2-performance-optimization)
  - [3. Mobile Considerations](#3-mobile-considerations)
  - [4. Accessibility](#4-accessibility)
  - [5. User Feedback](#5-user-feedback)
- [Troubleshooting](#troubleshooting)
  - [Zooming Not Working](#zooming-not-working)
  - [Panning Disabled](#panning-disabled)
  - [Tooltips Not Appearing](#tooltips-not-appearing)
  - [Selection Not Working](#selection-not-working)
  - [Navigation Lines Not Visible](#navigation-lines-not-visible)
  - [Performance Issues](#performance-issues)


## Overview

User interactions make maps engaging and functional, allowing users to explore geographic data dynamically. The Maps component supports multiple interaction patterns that enhance user experience.

**Available Interactions:**
- **Zooming** - Magnify specific regions for detail
- **Panning** - Navigate across the map surface
- **Tooltips** - Display information on hover
- **Selection** - Highlight and track selected shapes
- **Highlight** - Emphasize shapes on hover
- **Navigation Lines** - Show connections between locations

## Zooming

### Enable Zooming

Basic zooming configuration:

```cshtml
@using Syncfusion.EJ2.Maps
@using Newtonsoft.Json

@{
    var worldMap = JsonConvert.DeserializeObject(System.IO.File.ReadAllText("wwwroot/maps/world.json"));
}

<ejs-maps id="maps" height="600px">
    <e-maps-zoomsettings 
        enable="true"
        enablePanning="true"
        zoomFactor="1"
        maxZoom="10"
        minZoom="1">
    </e-maps-zoomsettings>
    
    <e-maps-layers>
        <e-maps-layer shapeData="worldMap"></e-maps-layer>
    </e-maps-layers>
</ejs-maps>
```

**Zoom Properties:**
- `enable` - Enable/disable zooming
- `zoomFactor` - Initial zoom level (1 = no zoom)
- `minZoom` - Minimum zoom level (default: 1)
- `maxZoom` - Maximum zoom level (default: 10)
- `enablePanning` - Allow panning when zoomed

### Zoom Toolbar

Add a toolbar with zoom controls:

```cshtml
<ejs-maps id="maps" height="600px">
    <e-maps-zoomsettings 
        enable="true"
        enablePanning="true"
        toolbars='new string[] { "Zoom", "ZoomIn", "ZoomOut", "Pan", "Reset" }'>
    </e-maps-zoomsettings>
    
    <e-maps-layers>
        <e-maps-layer shapeData="worldMap"></e-maps-layer>
    </e-maps-layers>
</ejs-maps>
```

**Available Toolbar Buttons:**
- `Zoom` - Toggle zoom mode
- `ZoomIn` - Zoom in one level
- `ZoomOut` - Zoom out one level
- `Pan` - Toggle pan mode
- `Reset` - Reset to initial zoom

### Zoom by Mouse Wheel

Enable mouse wheel zooming:

```cshtml
<e-maps-zoomsettings 
    enable="true"
    enablePanning="true"
    mouseWheelZoom="true">
</e-maps-zoomsettings>
```

### Pinch Zoom (Touch Devices)

Enable pinch-to-zoom for touch devices:

```cshtml
<e-maps-zoomsettings 
    enable="true"
    enablePanning="true"
    pinchZooming="true">
</e-maps-zoomsettings>
```

### Zoom to Specific Region

Zoom to coordinates programmatically:

```cshtml
@{
    var worldMap = JsonConvert.DeserializeObject(System.IO.File.ReadAllText("wwwroot/maps/world.json"));
}

<ejs-maps id="maps" height="600px">
    <e-maps-zoomsettings 
        enable="true"
        enablePanning="true"
        zoomFactor="4" ZoomOnClick="true">
    </e-maps-zoomsettings>
    
    <e-maps-layers>
        <e-maps-layer shapeData="worldMap"></e-maps-layer>
    </e-maps-layers>
</ejs-maps>

<script>
    // Zoom to specific coordinates at runtime
    function zoomToRegion(latitude, longitude, zoomLevel) {
        var maps = document.getElementById('maps').ej2_instances[0];
        maps.zoomToCoordinates(latitude, longitude, zoomLevel);
    }
</script>
```

## Panning

### Enable Panning

Panning allows users to navigate the map when zoomed:

```cshtml
<ejs-maps id="maps" height="600px">
    <e-maps-zoomsettings 
        enable="true"
        enablePanning="true">
    </e-maps-zoomsettings>
    
    <e-maps-layers>
        <e-maps-layer shapeData="worldMap"></e-maps-layer>
    </e-maps-layers>
</ejs-maps>
```

**Panning Behavior:**
- Click and drag to pan
- Only works when zoom level > 1
- Automatically constrains to map boundaries
- Works on touch devices with drag gesture

## Tooltips

### Basic Tooltip

Display information on hover:

```cshtml
@{
    var worldMap = JsonConvert.DeserializeObject(System.IO.File.ReadAllText("wwwroot/maps/world.json"));
    
    var populationData = new[] {
        new { Country = "China", Population = "1.4B", Capital = "Beijing" },
        new { Country = "India", Population = "1.38B", Capital = "New Delhi" },
        new { Country = "United States", Population = "331M", Capital = "Washington, D.C." }
    };
    
    var propertyPath = new[] { "name" };
}

<ejs-maps id="maps" height="600px">
    <e-maps-layers>
        <e-maps-layer 
            shapeData="worldMap"
            dataSource="populationData"
            shapeDataPath="Country"
            shapePropertyPath="propertyPath">
            
            <e-layersettings-tooltipsettings 
                visible="true"
                valuePath="Country">
            </e-layersettings-tooltipsettings>
        </e-maps-layer>
    </e-maps-layers>
</ejs-maps>
```

### Tooltip Template

Custom HTML tooltip with rich content:

```cshtml
<e-layersettings-tooltipsettings visible="true" template="#tooltipTemplate">
</e-layersettings-tooltipsettings>

<div id="tooltipTemplate" style="background: white; padding: 12px; border-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.15);">
    <h4 style="margin: 0 0 8px 0; color: #333;">${Country}</h4>
    <div style="font-size: 14px;">
        <div><strong>Population:</strong> ${Population}</div>
        <div><strong>Capital:</strong> ${Capital}</div>
    </div>
</div>
```

### Tooltip Styling

Customize tooltip appearance:

```cshtml
<e-layersettings-tooltipsettings 
    visible="true"
    valuePath="Country"
    fill="#000000"
    textStyle="new { color = 'white', fontFamily = 'Segoe UI', size = '14px' }">
    <e-layers-tooltip-border color="#666666" width="2"></e-layers-tooltip-border>
</e-layersettings-tooltipsettings>
```

### Marker Tooltips

Separate tooltips for markers:

```cshtml
@using Syncfusion.EJ2.Maps

@{
    var tooltip = new MapsTooltipSettings
    {
        Visible = true,
        Template = "#markerTemplate"
    };
}

<e-layersettings-markers>
    <e-layersettings-marker 
        visible="true"
        dataSource="cities"
        latitudeValuePath="Latitude"
        longitudeValuePath="Longitude"
        tooltipsettings="tooltip">
        
    </e-layersettings-marker>
</e-layersettings-markers>

<div id="markerTemplate" style="padding: 10px;">
    <strong>${CityName}</strong><br/>
    Population: ${Population}<br/>
    Country: ${Country}
</div>
```

## Selection

### Enable Selection

Allow users to select shapes by clicking:

```cshtml
@{
    var worldMap = JsonConvert.DeserializeObject(System.IO.File.ReadAllText("wwwroot/maps/world.json"));
}

<ejs-maps id="maps" height="600px">
    <e-maps-layers>
        <e-maps-layer shapeData="worldMap">
            <e-layersettings-selectionsettings 
                enable="true"
                fill="#28a745"
                opacity="0.7">
                <e-layers-selection-border color="#FFFFFF" width="2"></e-layers-selection-border>
            </e-layersettings-selectionsettings>
        </e-maps-layer>
    </e-maps-layers>
</ejs-maps>
```

**Selection Properties:**
- `enable` - Enable selection
- `fill` - Color of selected shape
- `opacity` - Opacity of selected shape
- `border` - Border styling for selected shape

### Selection Events

Handle selection events:

```cshtml
<ejs-maps id="maps" height="600px" shapeSelected="onShapeSelected">
    <e-maps-layers>
        <e-maps-layer shapeData="worldMap">
            <e-layersettings-selectionsettings 
                enable="true"
                fill="#007bff">
            </e-layersettings-selectionsettings>
        </e-maps-layer>
    </e-maps-layers>
</ejs-maps>

<div id="selectedInfo" style="padding: 15px; margin-top: 10px; background: #f8f9fa;"></div>

<script>
    function onShapeSelected(args) {
        var infoDiv = document.getElementById('selectedInfo');
        if (args.data && args.data.name) {
            infoDiv.innerHTML = '<strong>Selected:</strong> ' + args.data.name;
        }
    }
</script>
```

### Multi-Selection

Allow selecting multiple shapes:

```cshtml
<e-layersettings-selectionsettings 
    enable="true"
    enableMultiSelect="true"
    fill="#007bff">
</e-layersettings-selectionsettings>
```

## Highlight

### Enable Highlight

Highlight shapes on hover:

```cshtml
@{
    var worldMap = JsonConvert.DeserializeObject(System.IO.File.ReadAllText("wwwroot/maps/world.json"));
}

<ejs-maps id="maps" height="600px">
    <e-maps-layers>
        <e-maps-layer shapeData="worldMap">
            <e-layersettings-highlightsettings 
                enable="true"
                fill="#FFA500"
                opacity="0.5">
                <e-layers-highlight-border color="#FFFFFF" width="2"></e-layers-highlight-border>
            </e-layersettings-highlightsettings>
        </e-maps-layer>
    </e-maps-layers>
</ejs-maps>
```

### Highlight with Tooltip

Combine highlight and tooltip:

```cshtml
<e-maps-layer shapeData="worldMap">
    <e-layersettings-highlightsettings 
        enable="true"
        fill="#FFD700">
    </e-layersettings-highlightsettings>
    
    <e-layersettings-tooltipsettings 
        visible="true"
        valuePath="name">
    </e-layersettings-tooltipsettings>
</e-maps-layer>
```

## Navigation Lines

Navigation lines connect two geographic points with lines or arcs.

### Basic Navigation Line

```cshtml
@{
@using Syncfusion.EJ2.Maps;
@{ 
    var latitude = new[] { 40.7128, 36.7783 };
    var longitude = new[] { -74.0060, -119.4179 };
}
<ejs-maps id="maps">
    <e-maps-layers>
        <e-maps-layer shapeData="ViewBag.worldmap">
            <e-layersettings-navigationlines>
                <e-layersettings-navigationline visible="true" color="black" angle="90" width="2" dashArray="4"
                                                latitude="latitude" longitude="longitude">
                </e-layersettings-navigationline>
            </e-layersettings-navigationlines>
        </e-maps-layer>
    </e-maps-layers>
 </ejs-maps>
```

### Curved Navigation Lines

Create arc-style connections:

```cshtml
<e-layersettings-navigationline 
    visible="true"
    latitude="Latitude"
    longitude="Longitude"
    color="#FF6347"
    width="3"
    angle="0.8"          <!-- Higher angle = more curved -->
    dashArray="5,5">     <!-- Dashed line -->
</e-layersettings-navigationline>
```

### Animated Navigation Lines

```cshtml
<style>
    @keyframes dash {
        to {
            stroke-dashoffset: -20;
        }
    }
    
    .navigation-line {
        stroke-dasharray: 5, 5;
        animation: dash 1s linear infinite;
    }
</style>

<e-layersettings-navigationline 
    visible="true"
    latitude="Latitude"
    longitude="Longitude"
    color="#28a745"
    width="2"
    angle="0.6">
</e-layersettings-navigationline>
```

## Complete Examples

### Example 1: Interactive World Map with All Features

```cshtml
@page
@using Syncfusion.EJ2.Maps
@using Newtonsoft.Json

@{
    var worldMap = JsonConvert.DeserializeObject(System.IO.File.ReadAllText("wwwroot/maps/world.json"));
    
    var countryInfo = new[] {
        new { Country = "United States", Population = "331M", GDP = "$21.4T", Capital = "Washington, D.C." },
        new { Country = "China", Population = "1.4B", GDP = "$14.3T", Capital = "Beijing" },
        new { Country = "India", Population = "1.38B", GDP = "$2.9T", Capital = "New Delhi" },
        new { Country = "Japan", Population = "126M", GDP = "$5.1T", Capital = "Tokyo" },
        new { Country = "Germany", Population = "83M", GDP = "$3.8T", Capital = "Berlin" }
    };
    
    var propertyPath = new[] { "name" };
}

<div style="padding: 20px;">
    <h2>Interactive World Map</h2>
    <p>Zoom, pan, hover, and click to explore country information.</p>
    
    <ejs-maps id="interactiveMap" height="600px" shapeSelected="onCountrySelected">
        <!-- Zoom Settings -->
        <e-maps-zoomsettings 
            enable="true"
            enablePanning="true"
            mouseWheelZoom="true"
            pinchZooming="true"
            zoomFactor="1"
            toolbars='new string[] { "Zoom", "ZoomIn", "ZoomOut", "Pan", "Reset" }'>
        </e-maps-zoomsettings>
        
        <e-maps-layers>
            <e-maps-layer 
                shapeData="worldMap"
                dataSource="countryInfo"
                shapeDataPath="Country"
                shapePropertyPath="propertyPath">
                
                <!-- Shape Settings -->
                <e-layersettings-shapesettings fill="#E5E5E5">
                    <e-layers-selection-border color="#FFFFFF" width="1"></e-layers-selection-border>
                </e-layersettings-shapesettings>
                
                <!-- Highlight Settings -->
                <e-layersettings-highlightsettings 
                    enable="true"
                    fill="#FFD700"
                    opacity="0.6">
                    <e-layers-highlight-border color="#FFFFFF" width="2"></e-layers-highlight-border>
                </e-layersettings-highlightsettings>
                
                <!-- Selection Settings -->
                <e-layersettings-selectionsettings 
                    enable="true"
                    fill="#007bff"
                    opacity="0.8">
                    <e-layers-selection-border color="#FFFFFF" width="2"></e-layers-selection-border>
                </e-layersettings-selectionsettings>
                
                <!-- Tooltip Settings -->
                <e-layersettings-tooltipsettings visible="true" template="tooltipTemplate">
                </e-layersettings-tooltipsettings>
            </e-maps-layer>
        </e-maps-layers>
    </ejs-maps>

    <div id="tooltipTemplate" style="background: white; padding: 15px; border-radius: 6px; box-shadow: 0 3px 10px rgba(0,0,0,0.2);">
        <h3 style="margin: 0 0 10px 0; color: #333; font-size: 18px;">${Country}</h3>
        <div style="font-size: 14px; line-height: 1.6;">
            <div><strong>Population:</strong> ${Population}</div>
            <div><strong>GDP:</strong> ${GDP}</div>
            <div><strong>Capital:</strong> ${Capital}</div>
        </div>
    </div>
    
    <div id="countryDetails" style="margin-top: 20px; padding: 15px; background: #f8f9fa; border-left: 4px solid #007bff; display: none;">
        <h4 style="margin-top: 0;">Selected Country</h4>
        <div id="detailsContent"></div>
    </div>
</div>

<script>
    function onCountrySelected(args) {
        var detailsDiv = document.getElementById('countryDetails');
        var contentDiv = document.getElementById('detailsContent');
        
        if (args.data) {
            var data = args.data;
            var html = '<p><strong>Country:</strong> ' + (data.Country || data.name) + '</p>';
            
            if (data.Population) {
                html += '<p><strong>Population:</strong> ' + data.Population + '</p>';
                html += '<p><strong>GDP:</strong> ' + data.GDP + '</p>';
                html += '<p><strong>Capital:</strong> ' + data.Capital + '</p>';
            }
            
            contentDiv.innerHTML = html;
            detailsDiv.style.display = 'block';
        }
    }
</script>
```

### Example 2: Flight Route Map with Navigation Lines

```cshtml
@page
@model EJ2CoreSampleBrowser.Pages.Maps.Curvedlines

@using Syncfusion.EJ2.Maps;

@{
    var centerPosition = new MapsCenterPosition
    {
        Latitude = 30.41078179084589,
        Longitude = 90.52734374999999
    };
    int zoomfactor = (int)2.5;
    var titleStyle = new MapsFont
    {
        Size = "16px",
        FontFamily = "Segoe UI"
    };
    var data1 = new[]
    {
        new { name = "India" },
        new { name = "China" }
    };
    var border1 = new MapsBorder { Width = 1, Color = "black", Opacity = 1 };
    var shapeborder = new MapsBorder { Width = 0.1, Color = "black", Opacity = 1 };
    var colormapping = new List<Syncfusion.EJ2.Maps.MapsColorMapping>
    {
        new MapsColorMapping { Value = "China", Color = "#f7d083" },
        new MapsColorMapping { Value = "India", Color = "#FFFE99" }
    };
    var tooltip = new MapsTooltipSettings
    {
        Visible = true,
        ValuePath = "title",
        TextStyle = new MapsFont
        {
            FontFamily = "Segoe UI"
        }
    };
    var mdata1 = new[] { new { name = "New Delhi", latitude = 28.6139391, longitude = 77.2090212 } };
    var mdata2 = new[] { new { name = "Mumbai", latitude = 19.0759837, longitude = 72.8776559 } };
    var mdata3 = new[] { new { name = "Chennai", latitude = 13.0826802, longitude = 80.2707184 } };
    var mdata4 = new[] { new { name = "Kolkata", latitude = 22.572646, longitude = 88.363895 } };
    var mdata5 = new[] { new { name = "Kunming", latitude = 24.880095, longitude = 102.832891 } };
    var mdata6 = new[] { new { name = "Beijing", latitude = 39.9041999, longitude = 116.4073963 } };
    var mdata7 = new[] { new { name = "Shanghai", latitude = 31.2303904, longitude = 121.4737021 } };
    var mdata8 = new[] { new { name = "Hong Kong", latitude = 22.396428, longitude = 114.109497 } };
    var mdata9 = new[] { new { name = "Guangzhou", latitude = 23.12911, longitude = 113.264385 } };
    var latitude1 = new[] { 28.6139391, 39.9041999 };
    var longitude1 = new[] { 77.2090212, 116.4073963 };
    var latitude2 = new[] { 28.6139391, 31.2303904 };
    var longitude2 = new[] { 77.2090212, 121.4737021 };
    var latitude3 = new[] { 28.6139391, 23.12911 };
    var longitude3 = new[] { 77.2090212, 113.264385 };
    var latitude4 = new[] { 28.6139391, 22.396428 };
    var longitude4 = new[] { 77.2090212, 114.109497 };
    var latitude5 = new[] { 19.0759837, 23.12911 };
    var longitude5 = new[] { 72.8776559, 113.264385 };
    var latitude6 = new[] { 13.0826802, 22.396428 };
    var longitude6 = new[] { 80.2707184, 114.109497 };
    var latitude7 = new[] { 22.572646, 24.880095 };
    var longitude7 = new[] { 88.363895, 102.832891 };
    var propertyPath = new[] { "name" };

    var mapData = new Curvedlines().GetWorldMap();
    var curvedMarkers = new Curvedlines().GetCurvedMarkers();
}
@section ControlsSection{
    
    <div class="control-section">
        <div class="row">
            <div class="col-md-12">
                <ejs-maps id="maps" load="window.onMapLoad" projectionType="Equirectangular" centerPosition="centerPosition">
                    <e-maps-titlesettings alignment="@Syncfusion.EJ2.Maps.Alignment.Center" text="Flights from India to China" textStyle="titleStyle"></e-maps-titlesettings>
                    <e-maps-zoomsettings enable="false" zoomFactor="zoomfactor"></e-maps-zoomsettings>
                    <e-maps-mapsarea background="#AEE2FA"></e-maps-mapsarea>
                    <e-maps-layers>
                        <e-maps-layer shapeData="@mapData" shapeDataPath="name" shapePropertyPath="propertyPath" dataSource="data1">
                            <e-layersettings-markers>
                                <e-layersettings-marker dataSource="@curvedMarkers" visible="true" shape="Circle" fill="white" width="8" height="8" animationDuration="0" border="border1" tooltipSettings="tooltip"></e-layersettings-marker>
                                <e-layersettings-marker dataSource="mdata1" visible="true" offset="new { x = -50, y = 10 }" animationDuration="0" template="<div style='font-size: 12px;color:black; font-weight: 500;'>New Delhi</div>"></e-layersettings-marker>
                                <e-layersettings-marker dataSource="mdata2" visible="true" offset="new { x = 1, y = 12 }" animationDuration="0" template="<div style='font-size: 12px;color:black; font-weight: 500;'>Mumbai</div>"></e-layersettings-marker>
                                <e-layersettings-marker dataSource="mdata3" visible="true" offset="new { x = 1, y = 12 }" animationDuration="0" template="<div style='font-size: 12px;color:black; font-weight: 500;'>Chennai</div>"></e-layersettings-marker>
                                <e-layersettings-marker dataSource="mdata4" visible="true" offset="new { x = 1, y = 12 }" animationDuration="0" template="<div style='font-size: 12px;color:black; font-weight: 500;'>Kolkata</div>"></e-layersettings-marker>
                                <e-layersettings-marker dataSource="mdata5" visible="true" offset="new { x = 1, y = 14 }" animationDuration="0" template="<div style='font-size: 12px;color:black; font-weight: 500;'>Kunming</div>"></e-layersettings-marker>
                                <e-layersettings-marker dataSource="mdata6" visible="true" offset="new { x = 1, y = 12 }" animationDuration="0" template="<div style='font-size: 12px;color:black; font-weight: 500;'>Beijing</div>"></e-layersettings-marker>
                                <e-layersettings-marker dataSource="mdata7" visible="true" offset="new { x = 1, y = 12 }" animationDuration="0" template="<div style='font-size: 12px;color:black; font-weight: 500;'>Shanghai</div>"></e-layersettings-marker>
                                <e-layersettings-marker dataSource="mdata8" visible="true" offset="new { x = 20, y = 20 }" animationDuration="0" template="<div style='font-size: 12px;color:black; font-weight: 500;'>Hong Kong</div>"></e-layersettings-marker>
                                <e-layersettings-marker dataSource="mdata9" visible="true" offset="new { x = 35, y = -10 }" animationDuration="0" template="<div style='font-size: 12px;color:black; font-weight: 500;'>Guangzhou</div>"></e-layersettings-marker>
                            </e-layersettings-markers>
                            <e-layersettings-shapesettings colorValuePath="name" fill="#fcfbf9" border="shapeborder" colorMapping="colormapping"></e-layersettings-shapesettings>
                            <e-layersettings-navigationlines>
                                <e-layersettings-navigationline dashArray="5,1" visible="true" angle="-0.2" color="black" latitude="latitude1" longitude="longitude1"></e-layersettings-navigationline>
                                <e-layersettings-navigationline dashArray="5,1" visible="true" angle="-0.2" color="black" latitude="latitude2" longitude="longitude2"></e-layersettings-navigationline>
                                <e-layersettings-navigationline dashArray="5,1" visible="true" angle="-0.2" color="black" latitude="latitude3" longitude="longitude3"></e-layersettings-navigationline>
                                <e-layersettings-navigationline dashArray="5,1" visible="true" angle="-0.4" color="black" latitude="latitude4" longitude="longitude4"></e-layersettings-navigationline>
                                <e-layersettings-navigationline dashArray="5,1" visible="true" angle="-0.2" color="black" latitude="latitude5" longitude="longitude5"></e-layersettings-navigationline>
                                <e-layersettings-navigationline dashArray="5,1" visible="true" angle="-0.2" color="black" latitude="latitude6" longitude="longitude6"></e-layersettings-navigationline>
                                <e-layersettings-navigationline dashArray="5,1" visible="true" angle="-0.2" color="black" latitude="latitude7" longitude="longitude7"></e-layersettings-navigationline>
                            </e-layersettings-navigationlines>
                        </e-maps-layer>
                    </e-maps-layers>
                </ejs-maps>
            </div>
        </div>
    </div>
}
<script>
    function onMapLoad(args) {

    };
</script>
```

## Best Practices

### 1. Progressive Enhancement
- Start with basic interactions (tooltip, highlight)
- Add advanced features (zoom, pan) as needed
- Don't overwhelm users with too many interaction modes

### 2. Performance Optimization
- Limit zoom levels (maxZoom: 10 is usually sufficient)
- Use throttling for pan events
- Optimize tooltip content (avoid heavy computations)
- Disable interactions not needed for your use case

### 3. Mobile Considerations
- Always enable `pinchZooming` for touch devices
- Make toolbar buttons touch-friendly (adequate size)
- Test pan gestures on actual devices
- Consider disabling hover effects on touch devices

### 4. Accessibility
- Provide keyboard navigation for zoom/pan
- Ensure tooltips are readable (contrast, size)
- Announce selection changes to screen readers
- Provide alternative ways to access information

### 5. User Feedback
- Show zoom level indicator
- Provide visual feedback for interactions (highlight, selection)
- Add loading states for zoom/pan operations
- Use clear toolbar icons

## Troubleshooting

### Zooming Not Working

**Problem:** Zoom controls don't function.

**Solutions:**
1. Verify `enable="true"` in zoomsettings
2. Check that map has valid shapeData
3. Ensure maxZoom > minZoom
4. Verify toolbar buttons array syntax is correct
5. Check for JavaScript errors in console

### Panning Disabled

**Problem:** Cannot pan the map.

**Solutions:**
1. Set `enablePanning="true"` in zoomsettings
2. Ensure zoom level > 1 (pan only works when zoomed)
3. Check that zooming is enabled
4. Verify no JavaScript errors preventing interaction

### Tooltips Not Appearing

**Problem:** Tooltips don't show on hover.

**Solutions:**
1. Set `visible="true"` in tooltipSettings
2. Verify `valuePath` points to valid data property
3. Check template syntax for errors
4. Ensure data source is properly bound
5. Test with simple tooltip before using template

### Selection Not Working

**Problem:** Shapes don't select on click.

**Solutions:**
1. Set `enable="true"` in selectionSettings
2. Check that selection fill color is visible (contrast with default)
3. Verify no overlay elements blocking clicks
4. Check browser console for errors
5. Ensure shapes have valid data

### Navigation Lines Not Visible

**Problem:** Navigation lines don't appear.

**Solutions:**
1. Verify latitude/longitude arrays have exactly 2 values each
2. Check that coordinates are valid (lat: -90 to 90, lon: -180 to 180)
3. Ensure color contrasts with map background
4. Check width is > 0
5. Verify dataSource is properly formatted

### Performance Issues

**Problem:** Map interactions are slow or laggy.

**Solutions:**
1. Reduce maxZoom level (limit to 8-10)
2. Simplify GeoJSON (reduce coordinate precision)
3. Limit number of markers/bubbles
4. Use simpler tooltip templates
5. Disable unused interaction features
6. Implement debouncing for frequent events
