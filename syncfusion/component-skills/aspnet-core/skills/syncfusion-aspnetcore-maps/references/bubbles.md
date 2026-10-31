# Bubbles

## Table of Contents

- [Overview](#overview)
- [Adding Bubbles](#adding-bubbles)
  - [Basic Bubble Setup](#basic-bubble-setup)
  - [Bubble Data Structure](#bubble-data-structure)
- [Bubble Sizing](#bubble-sizing)
  - [Value Path](#value-path)
  - [Radius Range](#radius-range)
  - [Example: Population Bubbles](#example-population-bubbles)
- [Bubble Shapes](#bubble-shapes)
  - [Circle (Default)](#circle-default)
  - [Square](#square)
- [Bubble Customization](#bubble-customization)
  - [Fill Color](#fill-color)
  - [Color by Value (Color Value Path)](#color-by-value-color-value-path)
  - [Border Styling](#border-styling)
  - [Animation](#animation)
- [Bubble Tooltips](#bubble-tooltips)
  - [Basic Tooltip](#basic-tooltip)
  - [Custom Tooltip Template](#custom-tooltip-template)
  - [Styled Tooltip](#styled-tooltip)
- [Multiple Bubble Sets](#multiple-bubble-sets)
- [Bubble Selection](#bubble-selection)
- [Complete Examples](#complete-examples)
  - [Example 1: World Population Bubbles](#example-1-world-population-bubbles)
  - [Example 2: Sales Performance by Region](#example-2-sales-performance-by-region)
- [Best Practices](#best-practices)
  - [1. Choose Appropriate Radius Range](#1-choose-appropriate-radius-range)
  - [2. Use Opacity for Overlapping Bubbles](#2-use-opacity-for-overlapping-bubbles)
  - [3. Limit Data Points](#3-limit-data-points)
  - [4. Color Coding](#4-color-coding)
  - [5. Provide Clear Tooltips](#5-provide-clear-tooltips)
- [Troubleshooting](#troubleshooting)
  - [Bubbles Not Appearing](#bubbles-not-appearing)
  - [All Bubbles Same Size](#all-bubbles-same-size)
  - [Bubbles in Wrong Location](#bubbles-in-wrong-location)
  - [Tooltip Shows Undefined](#tooltip-shows-undefined)
  - [Performance Issues](#performance-issues)


## Overview

Bubbles are circular (or square) visualizations that represent quantitative data on geographical locations. Unlike markers which have fixed sizes, bubble sizes are proportional to data values, making them ideal for visualizing magnitude across regions.

**When to Use Bubbles:**
- Visualize quantitative data (population, revenue, counts)
- Show magnitude differences across locations
- Compare values between geographical regions
- Display multiple metrics with color and size

**Bubbles vs Markers:**
- **Bubbles** - Size represents data value, ideal for quantitative visualization
- **Markers** - Fixed size, better for marking specific points of interest

## Adding Bubbles

### Basic Bubble Setup

Bubbles require a data source with latitude/longitude and a numeric value field:

```cshtml
@using Syncfusion.EJ2.Maps
@using Newtonsoft.Json

@{
    var worldMap = JsonConvert.DeserializeObject(System.IO.File.ReadAllText("wwwroot/maps/world.json"));
    
    var populationData = new[] {
        new { Name = "China", Latitude = 35.8617, Longitude = 104.1954, Population = 1400000000 },
        new { Name = "India", Latitude = 20.5937, Longitude = 78.9629, Population = 1380000000 },
        new { Name = "USA", Latitude = 37.0902, Longitude = -95.7129, Population = 331000000 },
        new { Name = "Indonesia", Latitude = -0.7893, Longitude = 113.9213, Population = 273500000 }
    };
}

<ejs-maps id="maps" height="600px">
    <e-maps-layers>
        <e-maps-layer shapeData="worldMap">
            <e-layersettings-shapesettings fill="#C3E6ED"></e-layersettings-shapesettings>
            
            <e-layersettings-bubbles>
                <e-layersettings-bubble 
                    visible="true"
                    dataSource="populationData"
                    valuePath="Population"
                    minRadius="5"
                    maxRadius="40"
                    fill="#FF6347"
                    opacity="0.8">
                </e-layersettings-bubble>
            </e-layersettings-bubbles>
        </e-maps-layer>
    </e-maps-layers>
</ejs-maps>
```

**Required Properties:**
- `visible="true"` - Enable bubble display
- `dataSource` - Array with latitude, longitude, and value data
- `valuePath` - Property name containing numeric values for sizing
- `minRadius` - Minimum bubble radius (pixels)
- `maxRadius` - Maximum bubble radius (pixels)

### Bubble Data Structure

```csharp
// Minimum required structure
var bubbleData = new[] {
    new { 
        Latitude = 40.7128, 
        Longitude = -74.0060, 
        Population = 8400000  // Value for bubble sizing
    }
};

// Recommended structure with additional data
var bubbleData = new[] {
    new { 
        Name = "New York",
        Latitude = 40.7128, 
        Longitude = -74.0060,
        Population = 8400000,
        GrowthRate = 0.5,
        Category = "Metropolis"
    }
};
```

## Bubble Sizing

### Value Path

The `valuePath` property determines which data field controls bubble size:

```cshtml
@{
    var salesData = new[] {
        new { State = "California", Latitude = 36.7783, Longitude = -119.4179, Revenue = 500000 },
        new { State = "Texas", Latitude = 31.9686, Longitude = -99.9018, Revenue = 450000 },
        new { State = "New York", Latitude = 40.7128, Longitude = -74.0060, Revenue = 600000 }
    };
}

<e-layersettings-bubble
    visible="true"
    dataSource="salesData"
    valuePath="Revenue"     <!-- Bubble size based on Revenue -->
    minRadius="10"
    maxRadius="50">
</e-layersettings-bubble>
```

### Radius Range

Control minimum and maximum bubble sizes:

```cshtml
<e-layersettings-bubble
    visible="true"
    dataSource="data"
    valuePath="Value"
    minRadius="5"       <!-- Smallest bubble = 5px radius -->
    maxRadius="60"      <!-- Largest bubble = 60px radius -->
    >
</e-layersettings-bubble>
```

**Sizing Logic:**
- Smallest value in data → `minRadius`
- Largest value in data → `maxRadius`
- Other values → Proportionally scaled between min and max

### Example: Population Bubbles

```cshtml
@{
    var cityPopulations = new[] {
        new { City = "Tokyo", Lat = 35.6762, Lon = 139.6503, Pop = 37400000 },      // Largest bubble
        new { City = "Delhi", Lat = 28.7041, Lon = 77.1025, Pop = 30290000 },
        new { City = "Shanghai", Lat = 31.2304, Lon = 121.4737, Pop = 27060000 },
        new { City = "São Paulo", Lat = -23.5505, Lon = -46.6333, Pop = 22040000 },
        new { City = "Mexico City", Lat = 19.4326, Lon = -99.1332, Pop = 21780000 }, // Smallest bubble
    };
}

<e-layersettings-bubble 
    visible="true"
    dataSource="cityPopulations"
    valuePath="Pop"
    minRadius="15"
    maxRadius="50">
</e-layersettings-bubble>
```

## Bubble Shapes

Syncfusion Maps supports two bubble shapes:

### Circle (Default)

```cshtml
<e-layersettings-bubble 
    visible="true"
    dataSource="data"
    valuePath="Value"
    bubbleType="Circle">    <!-- Default shape -->
</e-layersettings-bubble>
```

### Square

```cshtml
<e-layersettings-bubble 
    visible="true"
    dataSource="data"
    valuePath="Value"
    bubbleType="Square">    <!-- Square bubbles -->
</e-layersettings-bubble>
```

**When to Use:**
- **Circle** - Standard, visually appealing, better for most use cases
- **Square** - When precise alignment or grid layout is needed

## Bubble Customization

### Fill Color

```cshtml
<e-layersettings-bubble 
    visible="true"
    dataSource="data"
    valuePath="Value"
    fill="#FF6347"          <!-- Solid color -->
    opacity="0.7">          <!-- 70% opacity -->
</e-layersettings-bubble>
```

### Color by Value (Color Value Path)

Color bubbles based on another data field:

```cshtml
@{
    var storeData = new[] {
        new { Name = "Store A", Lat = 34.05, Lon = -118.24, Sales = 500000, Performance = "High" },
        new { Name = "Store B", Lat = 40.71, Lon = -74.00, Sales = 300000, Performance = "Medium" },
        new { Name = "Store C", Lat = 41.88, Lon = -87.63, Sales = 150000, Performance = "Low" }
    };
    
    var colorMapping = new List<MapsColorMapping> {
        new MapsColorMapping { Value = "High", Color = "#28a745" },
        new MapsColorMapping { Value = "Medium", Color = "#ffc107" },
        new MapsColorMapping { Value = "Low", Color = "#dc3545" }
    };
}

<e-layersettings-bubble 
    visible="true"
    dataSource="storeData"
    valuePath="Sales"              <!-- Size based on Sales -->
    colorValuePath="Performance"   <!-- Color based on Performance -->
    colorMapping="colorMapping"
    minRadius="10"
    maxRadius="40">
</e-layersettings-bubble>
```

### Border Styling

```cshtml
<e-layersettings-bubble 
    visible="true"
    dataSource="data"
    valuePath="Value"
    fill="#FF6347"
    minRadius="10"
    maxRadius="40">
    <e-bubblesettings-border 
        color="#8B0000"     <!-- Border color -->
        width="2">          <!-- Border width -->
    </e-bubblesettings-border>
</e-layersettings-bubble>
```

### Animation

```cshtml
<e-layersettings-bubble 
    visible="true"
    dataSource="data"
    valuePath="Value"
    animationDuration="1500"    <!-- Animation duration (ms) -->
    animationDelay="200">       <!-- Delay before animation -->
</e-layersettings-bubble>
```

## Bubble Tooltips

### Basic Tooltip

```cshtml
<e-layersettings-bubble 
    visible="true"
    dataSource="populationData"
    valuePath="Population">
    <e-bubblesettings-tooltipsettings 
        visible="true" 
        valuePath="Name">
    </e-bubblesettings-tooltipsettings>
</e-layersettings-bubble>
```

### Custom Tooltip Template

```cshtml
<e-layersettings-bubble 
    visible="true"
    dataSource="populationData"
    valuePath="Population">
    <e-bubblesettings-tooltipsettings visible="true" template="bubbleTooltipTemplate">
    </e-bubblesettings-tooltipsettings>
</e-layersettings-bubble>

<div id="bubbleTooltipTemplate" style="padding: 10px; background: white; border-radius: 5px; box-shadow: 0 2px 8px rgba(0,0,0,0.2);">
    <h4 style="margin: 0 0 8px 0; color: #333;">${Name}</h4>
    <div style="font-size: 13px; color: #666;">
        <strong>Population:</strong> ${Population.toLocaleString()}<br/>
        <strong>Coordinates:</strong> ${Latitude.toFixed(2)}, ${Longitude.toFixed(2)}
    </div>
</div>
```

### Styled Tooltip

```cshtml
<e-bubblesettings-tooltipsettings visible="true" valuePath="Name">
    <e-bubble-tooltip-textstyle 
        fontFamily="Arial"
        size="14px"
        color="#FFFFFF">
    </e-bubble-tooltip-textstyle>
    <e-bubble-tooltip-border 
        color="#FF6347"
        width="2">
    </e-bubble-tooltip-border>
</e-bubblesettings-tooltipsettings>
```

## Multiple Bubble Sets

Display multiple bubble datasets on the same map:

```cshtml
@{
    var worldMap = JsonConvert.DeserializeObject(System.IO.File.ReadAllText("wwwroot/maps/world.json"));
    
    var populationData = new[] {
        new { Name = "Tokyo", Lat = 35.6762, Lon = 139.6503, Value = 37400000 },
        new { Name = "Delhi", Lat = 28.7041, Lon = 77.1025, Value = 30290000 }
    };
    
    var gdpData = new[] {
        new { Name = "New York", Lat = 40.7128, Lon = -74.0060, Value = 1700000 },
        new { Name = "London", Lat = 51.5074, Lon = -0.1278, Value = 700000 }
    };
}

<ejs-maps id="maps" height="600px">
    <e-maps-layers>
        <e-maps-layer shapeData="worldMap">
            <e-layersettings-bubbles>
                <!-- Population bubbles (red) -->
                <e-layersettings-bubble 
                    visible="true"
                    dataSource="populationData"
                    valuePath="Value"
                    fill="#FF6347"
                    opacity="0.7"
                    minRadius="10"
                    maxRadius="40">
                    <e-bubblesettings-tooltipsettings visible="true" valuePath="Name" template="bubbleTooltipTemplate1">
                    </e-bubblesettings-tooltipsettings>
                </e-layersettings-bubble>
                
                <!-- GDP bubbles (blue) -->
                <e-layersettings-bubble 
                    visible="true"
                    dataSource="gdpData"
                    valuePath="Value"
                    fill="#1E90FF"
                    opacity="0.7"
                    minRadius="10"
                    maxRadius="40">
                    <e-bubblesettings-tooltipsettings visible="true" valuePath="Name" template="bubbleTooltipTemplate">
                    </e-bubblesettings-tooltipsettings>
                </e-layersettings-bubble>
            </e-layersettings-bubbles>
        </e-maps-layer>
    </e-maps-layers>
</ejs-maps>
<div id="bubbleTooltipTemplate"><strong>${Name}</strong><br/>GDP: $${Value.toLocaleString()}B</div>

<div  id="bubbleTooltipTemplate1"><strong>${Name}</strong><br/>Population: ${Value.toLocaleString()}</div>
```

## Bubble Selection

Enable bubble selection for interactivity:

```cshtml
<ejs-maps id="maps" bubbleClick="onBubbleClick">
    <e-maps-layers>
        <e-maps-layer shapeData="worldMap">
            <e-layersettings-bubbles>
                <e-layersettings-bubble 
                    visible="true"
                    dataSource="data"
                    valuePath="Value">
                    <e-bubblesettings-selectionsettings 
                        enable="true"
                        fill="#8B0000"
                        opacity="1">
                        <e-selectionsettings-border 
                            color="#FFFFFF"
                            width="2">
                        </e-selectionsettings-border>
                    </e-bubblesettings-selectionsettings>
                </e-layersettings-bubble>
            </e-layersettings-bubbles>
        </e-maps-layer>
    </e-maps-layers>
</ejs-maps>

<script>
    function onBubbleClick(args) {
        console.log('Bubble selected:', args.data);
        alert('Selected: ' + args.data.Name + ' - Value: ' + args.data.Value);
    }
</script>
```

## Complete Examples

### Example 1: World Population Bubbles

```cshtml
@page
@using Syncfusion.EJ2.Maps
@using Newtonsoft.Json

@{
    var worldMap = JsonConvert.DeserializeObject(System.IO.File.ReadAllText("wwwroot/maps/world.json"));
    
    var populations = new[] {
        new { Country = "China", Lat = 35.8617, Lon = 104.1954, Pop = 1400000000, Density = 145 },
        new { Country = "India", Lat = 20.5937, Lon = 78.9629, Pop = 1380000000, Density = 420 },
        new { Country = "USA", Lat = 37.0902, Lon = -95.7129, Pop = 331000000, Density = 34 },
        new { Country = "Indonesia", Lat = -0.7893, Lon = 113.9213, Pop = 273500000, Density = 144 },
        new { Country = "Pakistan", Lat = 30.3753, Lon = 69.3451, Pop = 225200000, Density = 287 },
        new { Country = "Brazil", Lat = -14.2350, Lon = -51.9253, Pop = 213993000, Density = 25 }
    };
    
    var colorMapping = new List<MapsColorMapping> {
        new MapsColorMapping { From = 0, To = 100, Color = "#90EE90", Label = "Low" },
        new MapsColorMapping { From = 100, To = 300, Color = "#FFD700", Label = "Medium" },
        new MapsColorMapping { From = 300, To = 500, Color = "#FF6347", Label = "High" }
    };
}

<div style="padding: 20px;">
    <h2>World Population Distribution</h2>
    <p>Bubble size represents total population, color represents population density</p>
    
    <ejs-maps id="populationMap" height="600px">
        <e-maps-legendsettings visible="true" position="Bottom"></e-maps-legendsettings>
        
        <e-maps-layers>
            <e-maps-layer shapeData="worldMap">
                <e-layersettings-shapesettings fill="#E8E8E8">
                    <e-layers-shapesettings-border color="#FFFFFF" width="1"></e-layers-shapesettings-border>
                </e-layersettings-shapesettings>
                
                <e-layersettings-bubbles>
                    <e-layersettings-bubble 
                        visible="true"
                        dataSource="populations"
                        valuePath="Pop"
                        colorValuePath="Density"
                        colorMapping="colorMapping"
                        minRadius="10"
                        maxRadius="50"
                        opacity="0.8">
                        <e-bubblesettings-border color="#FFFFFF" width="1"></e-bubblesettings-border>
                        <e-bubblesettings-tooltipsettings visible="true" template="bubbleTooltipTemplate">
                        </e-bubblesettings-tooltipsettings>
                    </e-layersettings-bubble>
                </e-layersettings-bubbles>
            </e-maps-layer>
        </e-maps-layers>
    </ejs-maps>
</div>

<div id="bubbleTooltipTemplate" style="padding: 10px;">
    <h4 style="margin: 0 0 8px 0;">${Country}</h4>
    <div><strong>Population:</strong> ${Pop.toLocaleString()}</div>
    <div><strong>Density:</strong> ${Density}/km²</div>
</div>
```

### Example 2: Sales Performance by Region

```cshtml
@{
    var usaMap = JsonConvert.DeserializeObject(System.IO.File.ReadAllText("wwwroot/maps/usa.json"));
    
    var salesData = new[] {
        new { Region = "West", Lat = 37.5, Lon = -120, Sales = 850000, Growth = 12.5 },
        new { Region = "East", Lat = 40.0, Lon = -78, Sales = 720000, Growth = 8.3 },
        new { Region = "South", Lat = 32.0, Lon = -90, Sales = 650000, Growth = 15.2 },
        new { Region = "Midwest", Lat = 41.5, Lon = -93, Sales = 580000, Growth = 6.7 }
    };
}

<ejs-maps id="salesMap" height="600px">
    <e-maps-layers>
        <e-maps-layer shapeData="usaMap">
            <e-layersettings-bubbles>
                <e-layersettings-bubble 
                    visible="true"
                    dataSource="salesData"
                    valuePath="Sales"
                    fill="#1E90FF"
                    opacity="0.75"
                    minRadius="20"
                    maxRadius="60">
                    <e-bubblesettings-tooltipsettings visible="true" template="bubbleTooltipTemplate">
                    </e-bubblesettings-tooltipsettings>
                </e-layersettings-bubble>
            </e-layersettings-bubbles>
        </e-maps-layer>
    </e-maps-layers>
</ejs-maps>

<div id="bubbleTooltipTemplate" style="padding: 10px;">
    <h4>${Region} Region</h4>
    <div>Sales: $${Sales.toLocaleString()}</div>
    <div>Growth: ${Growth}%</div>
</div>
```

## Best Practices

### 1. Choose Appropriate Radius Range
- Too small: Hard to see differences
- Too large: Overlapping bubbles
- Recommended: minRadius=10, maxRadius=40-60

### 2. Use Opacity for Overlapping Bubbles
- Set opacity to 0.6-0.8 for better visibility
- Allows users to see overlapping data points

### 3. Limit Data Points
- Keep bubbles under 50-100 for performance
- Filter data to most significant values
- Consider aggregating nearby points

### 4. Color Coding
- Use color to represent additional dimensions
- Ensure color contrast with map background
- Use colorMapping for categorical data

### 5. Provide Clear Tooltips
- Always show data value in tooltip
- Include context (units, labels)
- Format large numbers with commas

## Troubleshooting

### Bubbles Not Appearing

**Problem:** Bubbles configured but not visible.

**Solutions:**
1. Verify `visible="true"` is set
2. Check `valuePath` matches data property name exactly
3. Ensure data contains numeric values (not strings)
4. Verify latitude/longitude are within map bounds
5. Check minRadius/maxRadius are reasonable (not 0 or too large)

### All Bubbles Same Size

**Problem:** Bubbles don't scale with data values.

**Solutions:**
1. Verify `valuePath` is set correctly
2. Check data values have variation (not all the same)
3. Ensure values are numbers, not strings
4. Verify minRadius < maxRadius

### Bubbles in Wrong Location

**Problem:** Bubbles appear at incorrect positions.

**Solutions:**
1. Verify data has "Latitude" and "Longitude" properties (case-sensitive)
2. Check latitude/longitude are not swapped
3. Ensure coordinates are decimal degrees (-90 to 90, -180 to 180)
4. Verify coordinate system matches map projection

### Tooltip Shows Undefined

**Problem:** Tooltip displays `${undefined}`.

**Solutions:**
1. Check property names in template match data exactly
2. Verify `valuePath` exists in data source
3. Test with simple tooltip before custom template
4. Escape property names if they contain special characters

### Performance Issues

**Problem:** Map is slow with many bubbles.

**Solutions:**
1. Reduce number of bubbles (filter to significant values)
2. Disable animation: `animationDuration="0"`
3. Use simpler bubble shapes (Circle vs Square)
4. Aggregate nearby data points
5. Implement zoom-based filtering
