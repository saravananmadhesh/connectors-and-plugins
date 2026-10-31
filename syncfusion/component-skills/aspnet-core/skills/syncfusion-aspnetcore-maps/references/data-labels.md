# Data Labels

## Table of Contents

- [Overview](#overview)
- [Enabling Data Labels](#enabling-data-labels)
  - [Basic Shape Labels](#basic-shape-labels)
  - [Label Path](#label-path)
  - [Labels with Data Binding](#labels-with-data-binding)
- [Smart Label Modes](#smart-label-modes)
  - [Trim Mode](#trim-mode)
  - [Hide Mode](#hide-mode)
  - [None Mode](#none-mode)
  - [Comparison Example](#comparison-example)
- [Label Styling](#label-styling)
  - [Font Customization](#font-customization)
  - [Border and Background](#border-and-background)
  - [Complete Styling Example](#complete-styling-example)
- [Template-Based Label](#template-based-label)
  - [Basic Template](#basic-template)
- [Intersection Actions](#intersection-actions)
  - [Hide on Intersection](#hide-on-intersection)
  - [Trim on Intersection](#trim-on-intersection)
  - [None (Allow Overlap)](#none-allow-overlap)
- [Complete Examples](#complete-examples)
  - [Example 1: US States with Names and Codes](#example-1-us-states-with-names-and-codes)
  - [Example 2: Population Data with Formatted Labels](#example-2-population-data-with-formatted-labels)
- [Best Practices](#best-practices)
  - [1. Use Smart Label Modes](#1-use-smart-label-modes)
  - [2. Font Size Guidelines](#2-font-size-guidelines)
  - [3. Readability](#3-readability)
  - [4. Performance](#4-performance)
  - [5. Accessibility](#5-accessibility)
- [Troubleshooting](#troubleshooting)
  - [Labels Not Showing](#labels-not-showing)
  - [Label Text is Wrong Property](#label-text-is-wrong-property)
  - [Labels Overlapping](#labels-overlapping)
  - [Template Not Rendering](#template-not-rendering)
  - [Poor Performance with Many Labels](#poor-performance-with-many-labels)

## Overview

Data labels display text on map shapes, markers, or bubbles to provide additional context. They can show region names, data values, or custom formatted information.

**When to Use Data Labels:**
- Display region/country names on shapes
- Show data values directly on the map
- Label specific features or areas
- Provide quick reference without tooltips
- Create annotated maps

**Label Types:**
- **Shape Labels** - Text on geographical shapes
- **Marker Labels** - Text near markers
- **Bubble Labels** - Text within or near bubbles

## Enabling Data Labels

### Basic Shape Labels

```cshtml
@using Syncfusion.EJ2.Maps
@using Newtonsoft.Json

@{
    var worldMap = JsonConvert.DeserializeObject(System.IO.File.ReadAllText("wwwroot/maps/world.json"));
}

<ejs-maps id="maps" height="600px">
    <e-maps-layers>
        <e-maps-layer shapeData="worldMap">
            <e-layersettings-shapesettings fill="#C3E6ED"></e-layersettings-shapesettings>
            
            <e-layersettings-datalabelsettings 
                visible="true"
                labelPath="name">
            </e-layersettings-datalabelsettings>
        </e-maps-layer>
    </e-maps-layers>
</ejs-maps>
```

**Key Properties:**
- `visible="true"` - Enable data labels
- `labelPath` - Property name in GeoJSON to display (e.g., "name", "code")

### Label Path

The `labelPath` specifies which GeoJSON property to display:

```cshtml
<!-- Display country names -->
<e-layersettings-datalabelsettings 
    visible="true"
    labelPath="name">     <!-- Shows: "United States", "China", etc. -->
</e-layersettings-datalabelsettings>

<!-- Display country codes -->
<e-layersettings-datalabelsettings 
    visible="true"
    labelPath="iso_a2">   <!-- Shows: "US", "CN", etc. -->
</e-layersettings-datalabelsettings>
```

### Labels with Data Binding

Display values from your data source:

```cshtml
@{
    var worldMap = JsonConvert.DeserializeObject(System.IO.File.ReadAllText("wwwroot/maps/world.json"));
    
    var populationData = new[] {
        new { Country = "United States", Population = 331000000 },
        new { Country = "China", Population = 1400000000 },
        new { Country = "India", Population = 1380000000 }
    };
    
    var propertyPath = new[] { "name" };
}

<e-maps-layer 
    shapeData="worldMap"
    dataSource="populationData"
    shapeDataPath="Country"
    shapePropertyPath="propertyPath">
    
    <e-layersettings-datalabelsettings 
        visible="true"
        labelPath="Country">    <!-- Shows data from dataSource -->
    </e-layersettings-datalabelsettings>
</e-maps-layer>
```

## Smart Label Modes

Smart label modes handle label overflow and intersection automatically.

### Trim Mode

Truncates long labels to fit within shape boundaries:

```cshtml
<e-layersettings-datalabelsettings 
    visible="true"
    labelPath="name"
    smartLabelMode="Trim">   <!-- Truncates with "..." -->
</e-layersettings-datalabelsettings>
```

**Result:**
- "United States of America" → "United States..."
- Prevents labels from overflowing shape boundaries

### Hide Mode

Hides labels that don't fit within shape:

```cshtml
<e-layersettings-datalabelsettings 
    visible="true"
    labelPath="name"
    smartLabelMode="Hide">   <!-- Hides if doesn't fit -->
</e-layersettings-datalabelsettings>
```

**Result:**
- Small shapes with long names won't show labels
- Keeps map clean and readable

### None Mode

Displays full labels regardless of fit:

```cshtml
<e-layersettings-datalabelsettings 
    visible="true"
    labelPath="name"
    smartLabelMode="None">   <!-- Shows complete label -->
</e-layersettings-datalabelsettings>
```

**Result:**
- All labels shown in full
- May cause overlap or overflow

### Comparison Example

```cshtml
@{
    var usaMap = JsonConvert.DeserializeObject(System.IO.File.ReadAllText("wwwroot/maps/usa.json"));
}

<!-- Trim mode (recommended for most cases) -->
<ejs-maps id="trimMap" height="400px">
    <e-maps-titlesettings text="Smart Label: Trim"></e-maps-titlesettings>
    <e-maps-layers>
        <e-maps-layer shapeData="usaMap">
            <e-layersettings-datalabelsettings 
                visible="true"
                labelPath="name"
                smartLabelMode="Trim">
            </e-layersettings-datalabelsettings>
        </e-maps-layer>
    </e-maps-layers>
</ejs-maps>

<!-- Hide mode (cleaner but fewer labels) -->
<ejs-maps id="hideMap" height="400px">
    <e-maps-titlesettings text="Smart Label: Hide"></e-maps-titlesettings>
    <e-maps-layers>
        <e-maps-layer shapeData="usaMap">
            <e-layersettings-datalabelsettings 
                visible="true"
                labelPath="name"
                smartLabelMode="Hide">
            </e-layersettings-datalabelsettings>
        </e-maps-layer>
    </e-maps-layers>
</ejs-maps>
```

## Label Styling

### Font Customization

```cshtml
<e-layersettings-datalabelsettings 
    visible="true"
    labelPath="name">
    <e-layers-datasabel-textstyle 
        fontFamily="Arial"
        size="12px"
        fontWeight="500"
        color="#333333"
        opacity="1">
    </e-layers-datasabel-textstyle>
</e-layersettings-datalabelsettings>
```

### Border and Background

```cshtml
<e-layersettings-datalabelsettings 
    visible="true"
    labelPath="name"
    fill="#FFFFFF"          <!-- Background color -->
    opacity="0.9">          <!-- Background opacity -->
    <e-layers-datalabel-border 
        color="#333333"     <!-- Border color -->
        width="1">          <!-- Border width -->
    </e-layers-datalabel-border>
    <e-layers-datasabel-textstyle 
        color="#000000"
        size="14px"
        fontWeight="bold">
    </e-layers-datasabel-textstyle>
</e-layersettings-datalabelsettings>
```

### Complete Styling Example

```cshtml

@{
    var offset = new { x = 35, y = -10 };
}


<e-layersettings-datalabelsettings 
    visible="true"
    labelPath="name"
    fill="#FFFFFF"
    opacity="0.95" offset="offset">
    <e-layers-datalabel-border 
        color="#1E90FF"
        width="2">
    </e-layers-datalabel-border>
    <e-layers-datasabel-textstyle 
        fontFamily="'Segoe UI', Arial, sans-serif"
        size="13px"
        fontWeight="600"
        color="#1E90FF">
    </e-layers-datasabel-textstyle>
</e-layersettings-datalabelsettings>
```

## Template-Based Label

Create custom formatted labels using templates:

### Basic Template

```cshtml
@{
    var worldMap = JsonConvert.DeserializeObject(System.IO.File.ReadAllText("wwwroot/maps/world.json"));
}

<e-layersettings-datalabelsettings visible="true" template="Label">
</e-layersettings-datalabelsettings>
```

## Intersection Actions

Control how labels behave when they intersect:

### Hide on Intersection

```cshtml
<e-layersettings-datalabelsettings 
    visible="true"
    labelPath="name"
    intersectionAction="Hide">   <!-- Hide intersecting labels -->
</e-layersettings-datalabelsettings>
```

### Trim on Intersection

```cshtml
<e-layersettings-datalabelsettings 
    visible="true"
    labelPath="name"
    intersectionAction="Trim">   <!-- Trim intersecting labels -->
</e-layersettings-datalabelsettings>
```

### None (Allow Overlap)

```cshtml
<e-layersettings-datalabelsettings 
    visible="true"
    labelPath="name"
    intersectionAction="None">   <!-- Allow overlapping -->
</e-layersettings-datalabelsettings>
```

## Complete Examples

### Example 1: US States with Names and Codes

```cshtml
@page
@using Syncfusion.EJ2.Maps
@using Newtonsoft.Json

@{
    var usaMap = JsonConvert.DeserializeObject(System.IO.File.ReadAllText("wwwroot/maps/usa.json"));
}

<div style="padding: 20px;">
    <h2>United States Map with State Labels</h2>
    
    <ejs-maps id="usaMap" height="600px">
        <e-maps-layers>
            <e-maps-layer shapeData="usaMap">
                <e-layersettings-shapesettings autofill="true">
                    <e-layers-shapesettings-border color="#FFFFFF" width="2"></e-layers-shapesettings-border>
                </e-layersettings-shapesettings>
                
                <e-layersettings-datalabelsettings 
                    visible="true"
                    labelPath="name"
                    smartLabelMode="Trim"
                    intersectionAction="Hide"
                    fill="#FFFFFF"
                    opacity="0.9">
                    <e-layers-datalabel-border 
                        color="#1E90FF"
                        width="1">
                    </e-layers-datalabel-border>
                    <e-layers-datasabel-textstyle 
                        fontFamily="Arial"
                        size="12px"
                        fontWeight="600"
                        color="#1E90FF">
                    </e-layers-datasabel-textstyle>
                </e-layersettings-datalabelsettings>
            </e-maps-layer>
        </e-maps-layers>
    </ejs-maps>
</div>
```

### Example 2: Population Data with Formatted Labels

```cshtml
@{
    var worldMap = JsonConvert.DeserializeObject(System.IO.File.ReadAllText("wwwroot/maps/world.json"));
    
    var countryData = new[] {
        new { Country = "China", Population = 1400000000, Code = "CN" },
        new { Country = "India", Population = 1380000000, Code = "IN" },
        new { Country = "United States", Population = 331000000, Code = "US" },
        new { Country = "Indonesia", Population = 273500000, Code = "ID" },
        new { Country = "Pakistan", Population = 225200000, Code = "PK" }
    };
    
    var propertyPath = new[] { "name" };
    
    var colorMapping = new List<MapsColorMapping> {
        new MapsColorMapping { From = 0, To = 500000000, Color = "#C6E7F0" },
        new MapsColorMapping { From = 500000000, To = 1000000000, Color = "#6AB7D6" },
        new MapsColorMapping { From = 1000000000, To = 1500000000, Color = "#1A7FA0" }
    };
}

<ejs-maps id="populationMap" height="600px">
    <e-maps-titlesettings text="World Population by Country"></e-maps-titlesettings>
    <e-maps-legendsettings visible="true"></e-maps-legendsettings>
    
    <e-maps-layers>
        <e-maps-layer 
            shapeData="worldMap"
            dataSource="countryData"
            shapeDataPath="Country"
            shapePropertyPath="propertyPath">
            
            <e-layersettings-shapesettings 
                colorValuePath="Population"
                colorMapping="colorMapping">
            </e-layersettings-shapesettings>
            
            <e-layersettings-datalabelsettings 
                visible="true"
                smartLabelMode="Trim">
            </e-layersettings-datalabelsettings>
        </e-maps-layer>
    </e-maps-layers>
</ejs-maps>
```

## Best Practices

### 1. Use Smart Label Modes
- **Trim** - Best for most scenarios
- **Hide** - When clean appearance is priority
- **None** - Only when all labels must be visible

### 2. Font Size Guidelines
- Large maps (>600px): 12-14px
- Medium maps (400-600px): 10-12px
- Small maps (<400px): 8-10px

### 3. Readability
- Use high contrast (dark text on light background or vice versa)
- Add background fill for better readability
- Use borders to separate labels from map

### 4. Performance
- Limit labels on dense maps
- Use Hide mode to reduce label count
- Avoid complex templates on many shapes

### 5. Accessibility
- Ensure sufficient color contrast (WCAG AA: 4.5:1)
- Don't rely on color alone for information
- Provide alternative text in tooltips

## Troubleshooting

### Labels Not Showing

**Problem:** Labels configured but not visible.

**Solutions:**
1. Verify `visible="true"` is set
2. Check `labelPath` matches GeoJSON property name (case-sensitive)
3. Verify shapes have the specified property in GeoJSON
4. Check font color isn't same as background
5. Try smartLabelMode="None" to see if labels are being hidden

### Label Text is Wrong Property

**Problem:** Labels show wrong data.

**Solutions:**
1. Verify `labelPath` value matches desired property
2. Check GeoJSON structure: `console.log(geoJsonData.features[0].properties)`
3. Ensure property exists in all features

### Labels Overlapping

**Problem:** Too many overlapping labels.

**Solutions:**
1. Use `smartLabelMode="Hide"` or `"Trim"`
2. Set `intersectionAction="Hide"`
3. Reduce font size
4. Increase map size
5. Filter to show fewer labels

### Template Not Rendering

**Problem:** Template labels show as blank.

**Solutions:**
1. Check template syntax for errors
2. Verify property names in `${PropertyName}` match data
3. Test with simple HTML first
4. Check browser console for JavaScript errors

### Poor Performance with Many Labels

**Problem:** Map is slow when showing many labels.

**Solutions:**
1. Use `smartLabelMode="Hide"` to reduce label count
2. Simplify templates (avoid complex HTML/CSS)
3. Reduce font effects (shadows, borders)
4. Filter data to show only significant regions
5. Disable animations
