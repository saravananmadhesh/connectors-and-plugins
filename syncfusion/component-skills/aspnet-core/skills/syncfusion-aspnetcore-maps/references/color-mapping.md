# Color Mapping in Syncfusion ASP.NET Core Maps

## Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
  - [Basic Prerequisites](#basic-prerequisites)
- [Types of Color Mapping](#types-of-color-mapping)
  - [Range Color Mapping](#range-color-mapping)
    - [Properties](#properties)
    - [Complete Example: Population Density Map](#complete-example-population-density-map)
  - [Equal Color Mapping](#equal-color-mapping)
    - [Complete Example: UN Security Council Membership](#complete-example-un-security-council-membership)
  - [Desaturation Color Mapping](#desaturation-color-mapping)
    - [Complete Example: Population Density with Opacity](#complete-example-population-density-with-opacity)
- [Advanced Color Mapping](#advanced-color-mapping)
  - [Multiple Colors for Single Shape](#multiple-colors-for-single-shape)
    - [Complete Example: Gradient Color Mapping](#complete-example-gradient-color-mapping)
  - [Color for Excluded Items](#color-for-excluded-items)
    - [Complete Example: Handling Excluded Data](#complete-example-handling-excluded-data)
- [Color Mapping for Bubbles](#color-mapping-for-bubbles)
    - [Complete Example: Bubble Color Mapping](#complete-example-bubble-color-mapping)
- [Complete Examples](#complete-examples)
  - [Example 1: Economic Indicators with Legend](#example-1-economic-indicators-with-legend)
  - [Example 2: Climate Zones with Desaturation](#example-2-climate-zones-with-desaturation)
- [Troubleshooting](#troubleshooting)
  - [Issue: Colors Not Applying to Shapes](#issue-colors-not-applying-to-shapes)
  - [Issue: Range Color Mapping Not Working](#issue-range-color-mapping-not-working)
  - [Issue: Equal Color Mapping Not Matching Values](#issue-equal-color-mapping-not-matching-values)
  - [Issue: Desaturation Effect Not Visible](#issue-desaturation-effect-not-visible)
  - [Issue: Multiple Colors Not Creating Gradient](#issue-multiple-colors-not-creating-gradient)
  - [Issue: Bubble Color Mapping Not Working](#issue-bubble-color-mapping-not-working)
  - [Issue: Performance Issues with Large Datasets](#issue-performance-issues-with-large-datasets)
  - [Issue: Legend Not Displaying Color Mappings](#issue-legend-not-displaying-color-mappings)
  - [Common Error Messages](#common-error-messages)


## Overview

Color mapping in Syncfusion ASP.NET Core Maps is a powerful feature that allows you to customize shape colors based on data values. It provides visual representation of data patterns across geographic regions, making it easier to identify trends, outliers, and distributions. The component supports three types of color mapping: Range, Equal, and Desaturation, each suitable for different data visualization scenarios.

## Getting Started

To implement color mapping in Maps, you need to:
1. Bind data to the `DataSource` property of `MapsLayer`
2. Set the `ColorValuePath` property to specify which field contains color values
3. Configure color mapping using `MapsColorMapping` within `MapsShapeSettings`

### Basic Prerequisites

```csharp
@using Syncfusion.EJ2
@using Syncfusion.EJ2.Maps
```

## Types of Color Mapping

### Range Color Mapping

Range color mapping applies colors to shapes based on numeric ranges. It's ideal for continuous data like population density, temperature ranges, or economic indicators.

#### Properties
- `From` - Starting value of the range
- `To` - Ending value of the range
- `Color` - Color to apply for the range
- `Label` - Text label for the color mapping
- `MinOpacity` - Minimum opacity value
- `MaxOpacity` - Maximum opacity value

#### Complete Example: Population Density Map

```cshtml
@using Syncfusion.EJ2
@using Syncfusion.EJ2.Maps

<div class="control-section">
    <ejs-maps id="maps" load="onMapsLoad">
        <e-maps-layers>
            <e-maps-layer shapeData="ViewBag.worldMap" 
                          shapePropertyPath='@new[] { "name" }' 
                          shapeDataPath="Country"
                          dataSource="ViewBag.populationData">
                <e-layersettings-shapesettings fill="#E5E5E5" colorValuePath="density">
                    <e-shapesettings-colormappings>
                        <e-shapesettings-colormapping from="0" to="100" color='@new[] { "red" }' label="0-100"></e-shapesettings-colormapping>
                        <e-shapesettings-colormapping from="100" to="200" color='@new[] { "green" }' label="100-200"></e-shapesettings-colormapping>
                        <e-shapesettings-colormapping from="200" to="300" color='@new[] { "blue" }' label="200-300"></e-shapesettings-colormapping>
                        <e-shapesettings-colormapping from="300" to="500" color='@new[] { "orange" }' label="300-500"></e-shapesettings-colormapping>
                    </e-shapesettings-colormappings>
                </e-layersettings-shapesettings>
            </e-maps-layer>
        </e-maps-layers>
    </ejs-maps>
</div>

<script>
    function onMapsLoad(args) {
        // Additional configuration if needed
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
    public IActionResult ColorMapping()
    {
        ViewBag.worldMap = GetWorldMap();
        ViewBag.populationData = new[]
        {
            new { Country = "China", density = 297 },
            new { Country = "India", density = 411 },
            new { Country = "United States", density = 33 },
            new { Country = "Indonesia", density = 145 },
            new { Country = "Brazil", density = 25 },
            new { Country = "Pakistan", density = 287 },
            new { Country = "Nigeria", density = 213 },
            new { Country = "Bangladesh", density = 1265 },
            new { Country = "Russia", density = 9 },
            new { Country = "Japan", density = 336 }
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

### Equal Color Mapping

Equal color mapping assigns specific colors to shapes based on exact string or categorical values. Perfect for classification data like membership status, regions, or categories.

#### Complete Example: UN Security Council Membership

```cshtml
@using Syncfusion.EJ2
@using Syncfusion.EJ2.Maps

<div class="control-section">
    <ejs-maps id="maps" load="onMapsLoad">
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
        // Map loaded successfully
    }
</script>
```

**Controller Code:**
```csharp
public IActionResult EqualColorMapping()
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
        new { Country = "Kazakhstan", Membership = "Non-Permanent" },
        new { Country = "Kuwait", Membership = "Non-Permanent" },
        new { Country = "Netherlands", Membership = "Non-Permanent" },
        new { Country = "Peru", Membership = "Non-Permanent" },
        new { Country = "Poland", Membership = "Non-Permanent" },
        new { Country = "Sweden", Membership = "Non-Permanent" }
    };
    return View();
}
```

### Desaturation Color Mapping

Desaturation color mapping is similar to range color mapping but adds opacity variations based on `MinOpacity` and `MaxOpacity` properties, creating a gradient effect.

#### Complete Example: Population Density with Opacity

```cshtml
@using Syncfusion.EJ2
@using Syncfusion.EJ2.Maps

<div class="control-section">
    <ejs-maps id="maps" load="onMapsLoad">
        <e-maps-layers>
            <e-maps-layer shapeData="ViewBag.worldMap" 
                          shapePropertyPath='@new[] { "name" }' 
                          shapeDataPath="Country"
                          dataSource="ViewBag.populationData">
                <e-layersettings-shapesettings fill="#E5E5E5" colorValuePath="density">
                    <e-shapesettings-colormappings>
                        <e-shapesettings-colormapping from="0" to="100" 
                                      color='@new[] { "#F0D6AD" }' 
                                      minOpacity="0.2" 
                                      maxOpacity="0.5"
                                      label="0-100 per sq. km"></e-shapesettings-colormapping>
                        <e-shapesettings-colormapping from="100" to="200" 
                                      color='@new[] { "#9CA3A3" }' 
                                      minOpacity="0.3" 
                                      maxOpacity="0.7"
                                      label="100-200 per sq. km"></e-shapesettings-colormapping>
                        <e-shapesettings-colormapping from="200" to="300" 
                                      color='@new[] { "#759D93" }' 
                                      minOpacity="0.5" 
                                      maxOpacity="1"
                                      label="200-300 per sq. km"></e-shapesettings-colormapping>
                    </e-shapesettings-colormappings>
                </e-layersettings-shapesettings>
            </e-maps-layer>
        </e-maps-layers>
    </ejs-maps>
</div>

<script>
    function onMapsLoad(args) {
        // Configure additional settings
    }
</script>
```

## Advanced Color Mapping

### Multiple Colors for Single Shape

You can create gradient effects by specifying multiple colors in the `Color` property array. The colors blend smoothly across the range.

#### Complete Example: Gradient Color Mapping

```cshtml
@using Syncfusion.EJ2
@using Syncfusion.EJ2.Maps

<div class="control-section">
    <ejs-maps id="maps" load="onMapsLoad">
        <e-maps-layers>
            <e-maps-layer shapeData="ViewBag.worldMap" 
                          shapePropertyPath='@new[] { "name" }' 
                          shapeDataPath="Country"
                          dataSource="ViewBag.populationData">
                <e-layersettings-shapesettings colorValuePath="density">
                    <e-shapesettings-colormappings>
                        <e-shapesettings-colormapping from="0" to="100" 
                                      color='@new[] { "#DEEBAE", "#A4D6AD" }' 
                                      label="Low Density"></e-shapesettings-colormapping>
                        <e-shapesettings-colormapping from="100" to="200" 
                                      color='@new[] { "#A4D6AD", "#37AFAB", "#547C84" }' 
                                      label="Medium Density"></e-shapesettings-colormapping>
                        <e-shapesettings-colormapping from="200" to="500" 
                                      color='@new[] { "#547C84", "#104565" }' 
                                      label="High Density"></e-shapesettings-colormapping>
                    </e-shapesettings-colormappings>
                </e-layersettings-shapesettings>
            </e-maps-layer>
        </e-maps-layers>
    </ejs-maps>
</div>
```

### Color for Excluded Items

Items that don't match any color mapping criteria can be assigned a default color by setting only the `Color` property without range or value specifications.

#### Complete Example: Handling Excluded Data

```cshtml
@using Syncfusion.EJ2
@using Syncfusion.EJ2.Maps

<div class="control-section">
    <ejs-maps id="maps" load="onMapsLoad">
        <e-maps-layers>
            <e-maps-layer shapeData="ViewBag.worldMap" 
                          shapePropertyPath='@new[] { "name" }' 
                          shapeDataPath="Country"
                          dataSource="ViewBag.populationData">
                <e-layersettings-shapesettings colorValuePath="density">
                    <e-shapesettings-colormappings>
                        <e-shapesettings-colormapping from="0" to="100" color='@new[] { "#C7D0D8" }' label="0-100"></e-shapesettings-colormapping>
                        <e-shapesettings-colormapping from="100" to="200" color='@new[] { "#A4D6AD" }' label="100-200"></e-shapesettings-colormapping>
                        <e-shapesettings-colormapping color='@new[] { "#8C8C8C" }' label="Others"></e-shapesettings-colormapping>
                    </e-shapesettings-colormappings>
                </e-layersettings-shapesettings>
            </e-maps-layer>
        </e-maps-layers>
    </ejs-maps>
</div>

<script>
    function onMapsLoad(args) {
        // Countries with density > 200 will get the "Others" color
    }
</script>
```

## Color Mapping for Bubbles

Color mapping can also be applied to bubble markers on the map using the same principles.

#### Complete Example: Bubble Color Mapping

```cshtml
@using Syncfusion.EJ2
@using Syncfusion.EJ2.Maps

<div class="control-section">
    <ejs-maps id="maps" load="onMapsLoad">
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
                                                   maxRadius="30">
                        <e-bubblesettings-colormappings>
                            <e-bubblesettings-colormapping from="0" to="100" color='@new[] { "#C7E8AC" }' label="Low"></e-bubblesettings-colormapping>
                            <e-bubblesettings-colormapping from="100" to="200" color='@new[] { "#F4A732" }' label="Medium"></e-bubblesettings-colormapping>
                            <e-bubblesettings-colormapping from="200" to="500" color='@new[] { "#DF5A3A" }' label="High"></e-bubblesettings-colormapping>
                        </e-bubblesettings-colormappings>
                    </e-layersettings-bubblesetting>
                </e-layersettings-bubblesettings>
            </e-maps-layer>
        </e-maps-layers>
    </ejs-maps>
</div>

<script>
    function onMapsLoad(args) {
        // Bubbles will be colored based on density values
    }
</script>
```

**Controller Code:**
```csharp
public IActionResult BubbleColorMapping()
{
    ViewBag.worldMap = GetWorldMap();
    ViewBag.populationData = new[]
    {
        new { Country = "China", population = 1403500365, density = 153 },
        new { Country = "India", population = 1366417754, density = 464 },
        new { Country = "United States", population = 329064917, density = 36 },
        new { Country = "Indonesia", population = 270625568, density = 151 },
        new { Country = "Pakistan", population = 216565318, density = 287 },
        new { Country = "Brazil", population = 211049527, density = 25 },
        new { Country = "Nigeria", population = 200963599, density = 226 },
        new { Country = "Bangladesh", population = 163046161, density = 1265 },
        new { Country = "Russia", population = 145872256, density = 9 },
        new { Country = "Mexico", population = 127575529, density = 66 }
    };
    return View();
}
```

## Complete Examples

### Example 1: Economic Indicators with Legend

```cshtml
@using Syncfusion.EJ2
@using Syncfusion.EJ2.Maps

<div class="control-section">
    <ejs-maps id="maps" load="onMapsLoad">
        <e-maps-legendsettings visible="true" position="Bottom"></e-maps-legendsettings>
        <e-maps-layers>
            <e-maps-layer shapeData="ViewBag.worldMap" 
                          shapePropertyPath='@new[] { "name" }' 
                          shapeDataPath="Country"
                          dataSource="ViewBag.gdpData">
                <e-layersettings-shapesettings fill="#E5E5E5" 
                                              colorValuePath="gdpPerCapita"
                                              border="new { width = 0.5, color = '#808080' }">
                    <e-shapesettings-colormappings>
                        <e-shapesettings-colormapping from="0" to="10000" 
                                      color='@new[] { "#F4E3C7" }' 
                                      label="< $10K"></e-shapesettings-colormapping>
                        <e-shapesettings-colormapping from="10000" to="30000" 
                                      color='@new[] { "#B8D4E8" }' 
                                      label="$10K - $30K"></e-shapesettings-colormapping>
                        <e-shapesettings-colormapping from="30000" to="50000" 
                                      color='@new[] { "#759D93" }' 
                                      label="$30K - $50K"></e-shapesettings-colormapping>
                        <e-shapesettings-colormapping from="50000" to="100000" 
                                      color='@new[] { "#37524A" }' 
                                      label="> $50K"></e-shapesettings-colormapping>
                    </e-shapesettings-colormappings>
                </e-layersettings-shapesettings>
                <e-layersettings-tooltipsettings visible="true" 
                                                valuePath="Country"
                                                format="${Country}: $${gdpPerCapita}">
                </e-layersettings-tooltipsettings>
            </e-maps-layer>
        </e-maps-layers>
    </ejs-maps>
</div>
```

### Example 2: Climate Zones with Desaturation

```cshtml
@using Syncfusion.EJ2
@using Syncfusion.EJ2.Maps

<div class="control-section">
    <ejs-maps id="maps" load="onMapsLoad">
        <e-maps-legendsettings visible="true"></e-maps-legendsettings>
        <e-maps-layers>
            <e-maps-layer shapeData="ViewBag.worldMap" 
                          shapePropertyPath='@new[] { "name" }' 
                          shapeDataPath="Country"
                          dataSource="ViewBag.temperatureData">
                <e-layersettings-shapesettings colorValuePath="avgTemp">
                    <e-shapesettings-colormappings>
                        <e-shapesettings-colormapping from="-20" to="0" 
                                      color='@new[] { "#4A6FA5" }' 
                                      minOpacity="0.4" 
                                      maxOpacity="1"
                                      label="Cold (< 0°C)"></e-shapesettings-colormapping>
                        <e-shapesettings-colormapping from="0" to="15" 
                                      color='@new[] { "#92C463" }' 
                                      minOpacity="0.5" 
                                      maxOpacity="1"
                                      label="Temperate (0-15°C)"></e-shapesettings-colormapping>
                        <e-shapesettings-colormapping from="15" to="30" 
                                      color='@new[] { "#F4A732" }' 
                                      minOpacity="0.6" 
                                      maxOpacity="1"
                                      label="Warm (15-30°C)"></e-shapesettings-colormapping>
                        <e-shapesettings-colormapping from="30" to="50" 
                                      color='@new[] { "#DF5A3A" }' 
                                      minOpacity="0.7" 
                                      maxOpacity="1"
                                      label="Hot (> 30°C)"></e-shapesettings-colormapping>
                    </e-shapesettings-colormappings>
                </e-layersettings-shapesettings>
            </e-maps-layer>
        </e-maps-layers>
    </ejs-maps>
</div>
```

## Troubleshooting

### Issue: Colors Not Applying to Shapes

**Problem:** Shapes remain the default color despite color mapping configuration.

**Solution:**
1. Verify `ColorValuePath` matches your data field name exactly (case-sensitive)
2. Ensure data is properly bound to `DataSource` property
3. Check that `ShapeDataPath` and `ShapePropertyPath` are correctly configured
4. Verify data values fall within the specified ranges

```csharp
// Correct configuration
ViewBag.populationData = new[]
{
    new { Country = "China", density = 297 }, // 'density' must match ColorValuePath
};
```

### Issue: Range Color Mapping Not Working

**Problem:** Range color mapping doesn't display expected colors for numeric values.

**Solution:**
1. Ensure `From` and `To` values don't overlap
2. Check that data values are numeric, not strings
3. Verify ranges cover all data values or add a fallback color mapping
4. Use `Console.WriteLine` to debug data values

```cshtml
<!-- Add fallback for values outside ranges -->
<e-shapesettings-colormapping color='@new[] { "#CCCCCC" }' label="No Data"></e-shapesettings-colormapping>
```

### Issue: Equal Color Mapping Not Matching Values

**Problem:** Equal color mapping doesn't apply colors for specific values.

**Solution:**
1. Ensure `Value` property matches data exactly (case-sensitive)
2. Check for leading/trailing spaces in data
3. Verify data type consistency (string vs. number)

```csharp
// Trim and normalize data
new { Country = "China", Membership = "Permanent".Trim() }
```

### Issue: Desaturation Effect Not Visible

**Problem:** Opacity variations are not visible in desaturation color mapping.

**Solution:**
1. Ensure `MinOpacity` and `MaxOpacity` values are significantly different (e.g., 0.3 vs 1.0)
2. Check that the base color is not too dark or light
3. Use lighter base colors for better opacity effects
4. Verify browser rendering capabilities

```cshtml
<!-- Use sufficient opacity difference -->
<e-shapesettings-colormapping from="0" to="100" 
              color='@new[] { "#759D93" }' 
              minOpacity="0.3" 
              maxOpacity="1"></e-shapesettings-colormapping>
```

### Issue: Multiple Colors Not Creating Gradient

**Problem:** Multiple colors specified but gradient effect is not visible.

**Solution:**
1. Ensure at least 2 colors are specified in the array
2. Choose colors with good contrast
3. Verify that data range has sufficient distribution
4. Check browser CSS3 gradient support

```cshtml
<!-- Use contrasting colors -->
<e-shapesettings-colormapping from="0" to="100" 
              color='@new[] { "#FFFFFF", "#0000FF", "#000000" }'></e-shapesettings-colormapping>
```

### Issue: Bubble Color Mapping Not Working

**Problem:** Bubbles display but color mapping is not applied.

**Solution:**
1. Verify `ColorValuePath` is set in bubble settings
2. Ensure color mappings are inside `e-bubblesettings-colormappings`
3. Check that `DataSource` contains the color value field
4. Verify bubble visibility is set to true

```cshtml
<e-layersettings-bubblesetting visible="true" 
                               colorValuePath="density"
                               dataSource="ViewBag.populationData">
    <e-bubblesettings-colormappings>
        <e-bubblesettings-colormapping from="0" to="100" color='@new[] { "#FF0000" }'></e-bubblesettings-colormapping>
    </e-bubblesettings-colormappings>
</e-layersettings-bubblesetting>
```

### Issue: Performance Issues with Large Datasets

**Problem:** Map rendering is slow with many shapes and complex color mappings.

**Solution:**
1. Reduce the number of color mapping ranges
2. Simplify GeoJSON shapes if possible
3. Use equal color mapping instead of range when appropriate
4. Enable shape optimization in layer settings
5. Consider pagination or filtering for large datasets

### Issue: Legend Not Displaying Color Mappings

**Problem:** Legend is visible but doesn't show color mapping labels.

**Solution:**
1. Ensure `Label` property is set for each color mapping
2. Verify legend `Visible` property is true
3. Check legend position doesn't overlap with map content
4. Verify color mappings are properly configured

```cshtml
<e-maps-legendsettings visible="true" position="Bottom">
</e-maps-legendsettings>
```

### Common Error Messages

**"Cannot read property 'colorValuePath' of undefined"**
- Solution: Ensure `MapsShapeSettings` is properly defined before color mappings

**"Data source is null or undefined"**
- Solution: Verify ViewBag data is assigned in controller and not null

**"Shape property path does not match"**
- Solution: Check GeoJSON property names match `ShapePropertyPath` configuration
