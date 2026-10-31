# Data Visualization with Labels and Color Mapping

## Table of Contents
- [Overview](#overview)
- [Data Labels](#data-labels)
  - [Adding Data Labels](#adding-data-labels)
  - [Label Path Configuration](#label-path-configuration)
  - [Customizing Data Labels](#customizing-data-labels)
  - [Smart Label Mode](#smart-label-mode)
  - [Intersection Action](#intersection-action)
  - [Label Templates](#label-templates)
  - [Label Animation](#label-animation)
- [Color Mapping](#color-mapping)
  - [Range Color Mapping](#range-color-mapping)
  - [Equal Color Mapping](#equal-color-mapping)
  - [Desaturation Color Mapping](#desaturation-color-mapping)
  - [Multiple Colors (Gradient Effect)](#multiple-colors-gradient-effect)
  - [Color for Excluded Items](#color-for-excluded-items)
  - [Color Mapping for Bubbles](#color-mapping-for-bubbles)
- [Best Practices](#best-practices)
  - [Data Labels Best Practices](#data-labels-best-practices)
  - [Color Mapping Best Practices](#color-mapping-best-practices)
- [Common Issues](#common-issues)
  - [Issue 1: Labels Not Appearing](#issue-1-labels-not-appearing)
  - [Issue 2: Color Mapping Not Working](#issue-2-color-mapping-not-working)
  - [Issue 3: Labels Overlap](#issue-3-labels-overlap)
  - [Issue 4: Desaturation Not Showing Gradient](#issue-4-desaturation-not-showing-gradient)
  - [Issue 5: Template Variables Not Rendering](#issue-5-template-variables-not-rendering)
  - [Issue 6: Colors Don't Match Legend](#issue-6-colors-dont-match-legend)
- [Summary](#summary)

## Overview

Data visualization in Maps includes two powerful features:

- **Data Labels** - Display text information directly on map shapes (country names, values, statistics)
- **Color Mapping** - Apply colors to shapes based on data values to create choropleth maps

**When to use Data Labels:**
- Show shape names or identifiers
- Display quantitative values on shapes
- Add contextual information to regions
- Create annotated maps

**When to use Color Mapping:**
- Create choropleth (heat) maps
- Visualize data distribution across regions
- Show categorical data with colors
- Create data-driven color schemes

## Data Labels

### Adding Data Labels

Data labels are enabled by setting the `Visible` property of `DataLabelSettings` to `true` and specifying which field to display using `LabelPath`.

**Basic Data Labels Example:**

**Controller:**

```csharp
using System.Web.Mvc;
using Newtonsoft.Json;

public class HomeController : Controller
{
    public ActionResult Index()
    {
        ViewBag.MapData = GetWorldMap();
        return View();
    }

    public object GetWorldMap()
    {
        string path = Server.MapPath("~/App_Data/world-map.json");
        return JsonConvert.DeserializeObject(System.IO.File.ReadAllText(path), typeof(object));
    }
}
```

**View:**

```cshtml
@using Syncfusion.EJ2.Maps

@Html.EJS().Maps("container").Layers(layer =>
{
    layer
        .DataLabelSettings(label => label
            .Visible(true)
            .LabelPath("name")).ShapeData(ViewBag.MapData).Add();
}).Render()
```

**Result:** Each shape displays its name from the GeoJSON `properties.name` field.

### Label Path Configuration

The `LabelPath` property determines which data field to display as labels. It can source from:

1. **GeoJSON Shape Properties** (default)
2. **Data Source** (when layer has bound data)

**Example 1: Labels from GeoJSON Properties**

GeoJSON structure:
```json
{
  "type": "Feature",
  "properties": {
    "name": "United States",
    "code": "US",
    "continent": "North America"
  },
  "geometry": { ... }
}
```

```cshtml
@* Show country names *@
.DataLabelSettings(label => label
    .Visible(true)
    .LabelPath("name"))

@* Or show country codes *@
.DataLabelSettings(label => label
    .Visible(true)
    .LabelPath("code"))
```

**Example 2: Labels from Data Source**

**Controller:**

```csharp
public ActionResult Index()
{
    ViewBag.MapData = GetWorldMap();
    ViewBag.PopulationData = new[]
    {
        new { Country = "United States", Population = 331, Density = 36 },
        new { Country = "India", Population = 1380, Density = 464 },
        new { Country = "China", Population = 1439, Density = 153 }
    };
    return View();
}
```

**View:**

```cshtml
@Html.EJS().Maps("container").Layers(layer =>
{
    layer
    .DataLabelSettings(label => label
    .Visible(true)
    .LabelPath("Population"))
    .ShapeData(ViewBag.MapData)
        .DataSource(ViewBag.PopulationData)
        .ShapePropertyPath(new[] { "name" })
        .ShapeDataPath("Country")
        .Add();
}).Render()
```

**Result:** Labels show population values from the bound data source.

### Customizing Data Labels

Data labels support extensive customization:

**Full Customization Example:**

```cshtml
@Html.EJS().Maps("container").Layers(layer =>
{
    layer
    .DataLabelSettings(label => label
    .Visible(true)
    .LabelPath("name")
    .Fill("#FFEB3B")                    // Background color (yellow)
    .Opacity(0.9)                       // Semi-transparent
    .Border(b => b
        .Color("#F57C00")               // Orange border
        .Width(2))
    .TextStyle(style => style
        .Color("#000000")               // Black text
        .Size("12px")
        .FontWeight("bold")
        .FontFamily("Arial, sans-serif")))
    .ShapeData(ViewBag.MapData)
        .Add();
}).Render()
```

**Customization Properties:**

| Property | Type | Description |
|----------|------|-------------|
| `Fill` | String | Label background color |
| `Opacity` | Double | Label transparency (0.0 to 1.0) |
| `Border` | Object | Border color, width, and opacity |
| `TextStyle` | Object | Text font, size, color, weight, family |

**Styling Text Only (No Background):**

```cshtml
.DataLabelSettings(label => label
    .Visible(true)
    .LabelPath("name")
    .Fill("transparent")                // No background
    .Border(b => b.Width(0))            // No border
    .TextStyle(style => style
        .Color("#FFFFFF")               // White text
        .Size("14px")
        .FontWeight("bold")))
```

### Smart Label Mode

Smart Label Mode handles labels that extend beyond shape boundaries.

**Modes Available:**

| Mode | Description |
|------|-------------|
| `None` | No special handling (labels may overflow) |
| `Hide` | Hide labels that exceed shape boundaries |
| `Trim` | Truncate labels to fit within shapes |

**Example:**

```cshtml
@Html.EJS().Maps("container").Layers(layer =>
{
    layer
    .DataLabelSettings(label => label
    .Visible(true)
    .LabelPath("name")
    .SmartLabelMode(Syncfusion.EJ2.Maps.SmartLabelMode.Trim)  // Trim long labels
    .TextStyle(style => style.Size("12px")))
    .ShapeData(ViewBag.MapData)
        .Add();
}).Render()
```

**Use Cases:**
- **None** - Large shapes with short names
- **Hide** - Remove labels from small shapes
- **Trim** - Show partial labels on medium shapes

**Visual Comparison:**

```cshtml
@* None: "United States of America" may overflow shape *@
.SmartLabelMode(Syncfusion.EJ2.Maps.SmartLabelMode.None)

@* Hide: Label hidden if shape is too small *@
.SmartLabelMode(Syncfusion.EJ2.Maps.SmartLabelMode.Hide)

@* Trim: "United States..." fits within shape *@
.SmartLabelMode(Syncfusion.EJ2.Maps.SmartLabelMode.Trim)
```

### Intersection Action

Intersection Action handles overlapping labels.

**Modes Available:**

| Mode | Description |
|------|-------------|
| `None` | Allow overlapping (labels may be unreadable) |
| `Hide` | Hide overlapping labels |
| `Trim` | Truncate overlapping labels |

**Example:**

```cshtml
@Html.EJS().Maps("container").Layers(layer =>
{
    layer
    .DataLabelSettings(label => label
    .Visible(true)
    .LabelPath("name")
    .IntersectionAction(Syncfusion.EJ2.Maps.IntersectAction.Hide)  // Hide overlapping
    .TextStyle(style => style.Size("12px")))
    .ShapeData(ViewBag.MapData)
        .Add();
}).Render()
```

**Best Practice:** Use `Hide` for maps with many small shapes to maintain readability.

### Label Templates

For complex label designs, use HTML templates.

**Basic Template Example:**

```cshtml
@using Syncfusion.EJ2.Maps;
@using Syncfusion.EJ2;

@{
    var label = new MapsDataLabelSettings
    {
        Visible = true,
        Template = "Label"
    };
}

@Html.EJS().Maps("maps").Layers(l =>
{
    l.ShapeSettings(s => s.Autofill(true)).DataLabelSettings(label).
      ShapeData(ViewBag.usmap).Add();
}).Render()
```

**Advanced Template with Icons:**

```cshtml
.DataLabelSettings(label => label
    .Visible(true)
    .Template("<div class='custom-label'>" +
             "<i class='fas fa-map-marker-alt' style='color:red'></i>" +
             "<span>${name}</span>" +
             "<div class='label-stat'>" +
             "<strong>${population}</strong> people" +
             "</div>" +
             "</div>"))

<style>
    .custom-label {
        background: white;
        padding: 6px 10px;
        border-radius: 6px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        font-size: 11px;
    }
    .label-stat {
        color: #666;
        margin-top: 4px;
    }
</style>
```

**Important Notes:**
- Template variables use `${fieldName}` syntax
- Standard label properties (Fill, Border, SmartLabelMode, etc.) don't apply to templates
- Style templates using CSS
- Templates can access all fields from data source

### Label Animation

Animate labels during initial map rendering:

```cshtml
@Html.EJS().Maps("container").Layers(layer =>
{
    layer
    .DataLabelSettings(label => label
    .Visible(true)
    .LabelPath("name")
    .AnimationDuration(2000))    // 2-second animation
    .ShapeData(ViewBag.MapData)
        .Add();
}).Render()
```

**Animation Duration Values:**
- `0` - No animation (instant display)
- `500-1000` - Quick animation
- `1000-2000` - Smooth animation
- `2000+` - Slow animation

## Color Mapping

Color mapping applies colors to shapes based on data values, creating choropleth (heat) maps.

**Setup Requirements:**
1. Bind data source to layer
2. Set `ShapePropertyPath` and `ShapeDataPath` to match data to shapes
3. Set `ColorValuePath` to field containing values for coloring
4. Configure `ColorMapping` with color rules

### Range Color Mapping

Apply colors based on numeric value ranges.

**Example: Population Density Map**

**Controller:**

```csharp
public ActionResult Index()
{
    ViewBag.MapData = GetWorldMap();
    ViewBag.DensityData = new[]
    {
        new { Country = "Mongolia", Density = 2 },
        new { Country = "United States", Density = 36 },
        new { Country = "India", Density = 464 },
        new { Country = "Bangladesh", Density = 1265 }
    };
    return View();
}
```

**View:**

```cshtml
@Html.EJS().Maps("container").Layers(layer =>
{
    layer
    .ShapeSettings(settings => settings
    .ColorValuePath("Density")
    .Fill("#E5E5E5")                        // Default color for unmatched
    .ColorMapping(cm =>
    {
        cm.From(0).To(100).Color("#deebae").Label("Low (0-100)").Add();
        cm.From(100).To(500).Color("#7bc1ce").Label("Medium (100-500)").Add();
        cm.From(500).To(1000).Color("#3a8fb7").Label("High (500-1000)").Add();
        cm.From(1000).To(1500).Color("#005288").Label("Very High (1000+)").Add();
    }))
    .ShapeData(ViewBag.MapData)
        .DataSource(ViewBag.DensityData)
        .ShapePropertyPath(new[] { "name" })
        .ShapeDataPath("Country")
        
        .Add();
}).Render()
```

**How It Works:**
1. Maps reads `Density` field from data source (via `ColorValuePath`)
2. For each shape, Maps checks which range the density value falls into
3. Applies the corresponding color from `ColorMapping`

**Range Properties:**

| Property | Description |
|----------|-------------|
| `From` | Range start value (inclusive) |
| `To` | Range end value (inclusive) |
| `Color` | Color to apply for this range |
| `Label` | Legend label for this range |

### Equal Color Mapping

Apply colors based on exact value matches (categorical data).

**Example: UN Security Council Members**

**Controller:**

```csharp
public ActionResult Index()
{
    ViewBag.MapData = GetWorldMap();
    ViewBag.UNMembers = new[]
    {
        new { Country = "China", Membership = "Permanent" },
        new { Country = "France", Membership = "Permanent" },
        new { Country = "Russia", Membership = "Permanent" },
        new { Country = "United Kingdom", Membership = "Permanent" },
        new { Country = "United States", Membership = "Permanent" },
        new { Country = "Bolivia", Membership = "Non-Permanent" },
        new { Country = "Ethiopia", Membership = "Non-Permanent" },
        new { Country = "Kazakhstan", Membership = "Non-Permanent" },
        new { Country = "Netherlands", Membership = "Non-Permanent" },
        new { Country = "Sweden", Membership = "Non-Permanent" }
    };
    return View();
}
```

**View:**

```cshtml
@Html.EJS().Maps("container").Layers(layer =>
{
    layer
    .ShapeSettings(settings => settings
    .ColorValuePath("Membership")
    .Fill("#E5E5E5")                    // Default for non-members
    .ColorMapping(cm =>
    {
        cm.Value("Permanent").Color("#C2185B").Label("Permanent Members").Add();
        cm.Value("Non-Permanent").Color("#7CB342").Label("Non-Permanent Members").Add();
    }))
    .ShapeData(ViewBag.MapData)
        .DataSource(ViewBag.UNMembers)
        .ShapePropertyPath(new[] { "name" })
        .ShapeDataPath("Country")
        
        .Add();
}).Render()
```

**How It Works:**
1. Maps reads `Membership` field from data source
2. If value exactly matches "Permanent", applies pink color
3. If value exactly matches "Non-Permanent", applies green color
4. Otherwise, uses default Fill color

**Value Property:**
- Must match exactly (case-sensitive by default)
- Works with strings, numbers, or booleans
- Best for categorical data (types, categories, statuses)

### Desaturation Color Mapping

Apply colors with varying opacity based on value ranges, creating a gradient effect.

**Example: Population Density with Opacity**

```cshtml
@Html.EJS().Maps("container").Layers(layer =>
{
    layer
    .ShapeSettings(settings => settings
    .ColorValuePath("Density")
    .ColorMapping(cm =>
    {
        cm.From(0).To(100)
            .Color("#7BC1CE")
            .MinOpacity(0.2)
            .MaxOpacity(0.5)
            .Label("Low")
            .Add();

        cm.From(100).To(500)
            .Color("#7BC1CE")
            .MinOpacity(0.5)
            .MaxOpacity(0.8)
            .Label("Medium")
            .Add();

        cm.From(500).To(1500)
            .Color("#7BC1CE")
            .MinOpacity(0.8)
            .MaxOpacity(1.0)
            .Label("High")
            .Add();
    }))
    .ShapeData(ViewBag.MapData)
        .DataSource(ViewBag.DensityData)
        .ShapePropertyPath(new[] { "name" })
        .ShapeDataPath("Country")
        .Add();
}).Render()
```

**How It Works:**
1. All ranges use the same base color (`#7BC1CE`)
2. Lower values within a range get lighter color (MinOpacity)
3. Higher values within a range get darker color (MaxOpacity)
4. Creates smooth gradient effect across data distribution

**Opacity Properties:**

| Property | Description |
|----------|-------------|
| `MinOpacity` | Minimum opacity for range start (0.0 to 1.0) |
| `MaxOpacity` | Maximum opacity for range end (0.0 to 1.0) |

**Use Case:** Ideal for showing data intensity on a single color scale.

### Multiple Colors (Gradient Effect)

Apply multiple colors within a single range for smooth gradients.

**Example: Multi-Color Range**

```cshtml
@Html.EJS().Maps("container").Layers(layer =>
{
    layer
    .ShapeSettings(settings => settings
    .ColorValuePath("Density")
    .ColorMapping(cm =>
    {
        // Single range with gradient from green → yellow → orange → red
        cm.From(0).To(1500)
            .Color(new string[] { "#7BC1CE", "#90EE90", "#FFFF00", "#FFA500", "#FF6347" })
            .Label("Population Density")
            .Add();
    }))
    .ShapeData(ViewBag.MapData)
        .DataSource(ViewBag.DensityData)
        .ShapePropertyPath(new[] { "name" })
        .ShapeDataPath("Country")
        .Add();
}).Render()
```

**How It Works:**
1. Values 0-300: Green to light green
2. Values 300-600: Light green to yellow
3. Values 600-900: Yellow to orange
4. Values 900-1200: Orange to tomato
5. Values 1200-1500: Tomato to red

**Color Array:**
- Colors are distributed evenly across the range
- More colors = smoother gradient
- First color = lowest values, last color = highest values

### Color for Excluded Items

Apply color to shapes that don't match any color mapping criteria.

**Example: Highlighting Unmapped Countries**

```cshtml
@Html.EJS().Maps("container").Layers(layer =>
{
    layer
    .ShapeSettings(settings => settings
    .ColorValuePath("Density")
    .ColorMapping(cm =>
    {
        // Ranges only cover 0-200
        cm.From(0).To(100).Color("#deebae").Add();
        cm.From(100).To(200).Color("#7bc1ce").Add();

        // Items with Density > 200 or unmapped shapes get this color
        cm.Color("#CCCCCC").Label("No Data / Out of Range").Add();
    }))
    .ShapeData(ViewBag.MapData)
        .DataSource(ViewBag.DensityData)
        .ShapePropertyPath(new[] { "name" })
        .ShapeDataPath("Country")
        .Add();
}).Render()
```

**When Excluded Color is Applied:**
1. Shape has no matching data in data source
2. Data value is outside all defined ranges
3. Data value doesn't match any equal values

**Best Practice:** Always include an excluded color mapping for incomplete datasets.

### Color Mapping for Bubbles

Apply color mapping to bubbles instead of shapes.

**Example: Population Bubbles with Range Colors**

**Controller:**

```csharp
public ActionResult Index()
{
    ViewBag.MapData = GetWorldMap();
    ViewBag.PopulationData = new[]
    {
        new { name = "United States", population = 331, density = 36 },
        new { name = "India", population = 1380, density = 464 },
        new { name = "China", population = 1439, density = 153 },
        new { name = "Indonesia", population = 273, density = 151 }
    };
    return View();
}
```

**View:**

```cshtml
@Html.EJS().Maps("container").Layers(layer =>
{
    layer
    .BubbleSettings(bubble =>
{
    bubble.Visible(true)
    .ColorMapping(cm =>
{
    cm.From(0).To(100).Color("#7BC1CE").Add();
    cm.From(100).To(500).Color("#E03C31").Add();
    cm.From(500).To(1500).Color("#5A1A59").Add();
})
        .DataSource(ViewBag.PopulationData)
        .ValuePath("population")
        .ColorValuePath("density")      // Color based on density
        .MinRadius(5)
        .MaxRadius(40)
        .Add();
})
    .ShapeData(ViewBag.MapData)
        .ShapePropertyPath(new[] { "name" })
        .ShapeDataPath("name")
        .Add();
}).Render()
```

**Result:**
- Bubble size represents population
- Bubble color represents density
- Shows two data dimensions simultaneously

**Configuration:**
- Use same color mapping syntax as shapes
- `ColorValuePath` determines which field controls color
- `ValuePath` determines bubble size (independent from color)

## Best Practices

### Data Labels Best Practices

1. **Keep Labels Short** - Use abbreviations or codes for small shapes
2. **Use Smart Label Mode** - Enable Trim or Hide for dense maps
3. **Manage Intersections** - Use Hide for readability with many labels
4. **Font Sizing** - Use 10-14px for most maps; adjust for zoom levels
5. **Contrast** - Ensure text color contrasts with shape colors
6. **Conditional Labels** - Don't label every shape; focus on important ones
7. **Template Performance** - Avoid complex templates on maps with 100+ shapes
8. **Animation** - Use subtle animation (1000-2000ms) for professional feel

**Example: Conditional Labels (via template)**

```cshtml
@* Only show labels for countries with population > 100M *@
.Template("<div>${population > 100 ? name : ''}</div>")
```

### Color Mapping Best Practices

1. **Choose Appropriate Type**
   - **Range:** Numeric, continuous data (temperature, population, income)
   - **Equal:** Categorical data (regions, types, status)
   - **Desaturation:** Single-theme intensity visualization

2. **Color Selection**
   - Use colorblind-friendly palettes
   - Maintain sufficient contrast between ranges
   - Use intuitive colors (red = high, blue = low; or green = good, red = bad)
   - Test colors on both light and dark shapes

3. **Range Definition**
   - Use 3-7 ranges (too many = confusing, too few = loss of detail)
   - Ensure ranges cover full data distribution
   - Use natural breaks in data for range boundaries
   - Always include excluded items color for incomplete data

4. **Legend Integration**
   - Always add labels to color mappings
   - Enable legend for user reference
   - Keep legend labels concise and clear

5. **Performance**
   - Limit number of color ranges to 7 maximum
   - Avoid complex gradient arrays (5 colors max per range)
   - Cache data source for faster re-renders

**Recommended Color Palettes:**

```cshtml
@* Sequential (low to high) *@
.Color(new string[] { "#fee5d9", "#fcae91", "#fb6a4a", "#de2d26", "#a50f15" })

@* Diverging (negative to positive) *@
.Color(new string[] { "#0571b0", "#92c5de", "#f7f7f7", "#f4a582", "#ca0020" })

@* Categorical *@
@* Use distinct colors for equal mapping *@
cm.Value("Type A").Color("#e41a1c").Add();
cm.Value("Type B").Color("#377eb8").Add();
cm.Value("Type C").Color("#4daf4a").Add();
```

## Common Issues

### Issue 1: Labels Not Appearing

**Symptoms:** Labels don't show on shapes

**Checklist:**

```cshtml
@* 1. Check Visible is true *@
.DataLabelSettings(label => label.Visible(true))

@* 2. Verify LabelPath matches field name (case-sensitive) *@
.LabelPath("name")  // Must match GeoJSON property or data field

@* 3. Check if SmartLabelMode is Hide and shapes are too small *@
.SmartLabelMode(Syncfusion.EJ2.Maps.SmartLabelMode.None)  // Test without

@* 4. Verify data is bound (for data source labels) *@
.DataSource(ViewBag.Data)
.ShapePropertyPath(new[] { "name" })
.ShapeDataPath("Country")

@* 5. Check font size and color aren't invisible *@
.TextStyle(style => style
    .Color("#000000")       // Visible color
    .Size("12px"))          // Readable size
```

### Issue 2: Color Mapping Not Working

**Symptoms:** All shapes show default color, not mapped colors

**Diagnosis:**

```cshtml
@* 1. Verify data binding *@
.DataSource(ViewBag.Data)               // Data source set
.ShapePropertyPath(new[] { "name" })     // Matches GeoJSON
.ShapeDataPath("Country")                // Matches data source

@* 2. Check ColorValuePath matches data field *@
.ColorValuePath("Density")               // Must be exact field name

@* 3. Verify ranges cover data values *@
@* If data has value 150 but ranges are 0-100 and 200-300,
   shape won't be colored unless excluded color is set *@
cm.From(0).To(100).Color("#AAA").Add();
cm.From(100).To(200).Color("#BBB").Add();  // Add this range!
cm.From(200).To(300).Color("#CCC").Add();

@* 4. Check equal values match exactly (case-sensitive) *@
cm.Value("Permanent").Color("#Red").Add();  // Must match "Permanent", not "permanent"

@* 5. Ensure ShapeSettings is configured *@
.ShapeSettings(settings => settings
    .ColorValuePath("Density")
    .ColorMapping(cm => { ... }))
```

### Issue 3: Labels Overlap

**Symptoms:** Labels are unreadable due to overlapping

**Solutions:**

```cshtml
@* Solution 1: Enable intersection action *@
.IntersectionAction(Syncfusion.EJ2.Maps.IntersectAction.Hide)

@* Solution 2: Reduce font size *@
.TextStyle(style => style.Size("10px"))

@* Solution 3: Use smart label mode *@
.SmartLabelMode(Syncfusion.EJ2.Maps.SmartLabelMode.Trim)

@* Solution 4: Show labels only on zoom *@
@* Implement in zoom event to toggle label visibility *@

@* Solution 5: Label selected shapes only *@
@* Use template to conditionally show labels *@
```

### Issue 4: Desaturation Not Showing Gradient

**Symptoms:** All shapes in range have same color

**Cause:** MinOpacity equals MaxOpacity or color is too similar

**Solution:**

```cshtml
@* Ensure sufficient opacity difference *@
cm.From(0).To(500)
    .Color("#7BC1CE")
    .MinOpacity(0.3)      // Light
    .MaxOpacity(1.0)      // Dark
    .Add();

@* At least 0.3-0.5 difference for visible gradient *@
```

### Issue 5: Template Variables Not Rendering

**Symptoms:** Labels show `${fieldName}` instead of values

**Causes & Solutions:**

```cshtml
@* 1. Check field name matches data exactly (case-sensitive) *@
.Template("<div>${Country}</div>")   // If data has "Country", not "country"

@* 2. Ensure data is bound to layer *@
.DataSource(ViewBag.Data)
.ShapePropertyPath(new[] { "name" })
.ShapeDataPath("Country")

@* 3. Use proper template syntax *@
.Template("<div>${fieldName}</div>")  // ✅ Correct
.Template("<div>{{fieldName}}</div>") // ❌ Wrong syntax

@* 4. Escape quotes in template *@
.Template("<div class=\"label\">${name}</div>")  // ✅ Correct
```

### Issue 6: Colors Don't Match Legend

**Symptoms:** Shape colors differ from legend colors

**Cause:** Multiple color mappings or gradient colors

**Solution:**

```cshtml
@* For gradient colors, legend shows interpolated colors *@
@* Use discrete ranges for exact legend match *@
cm.From(0).To(100).Color("#AAA").Label("Low").Add();
cm.From(100).To(200).Color("#BBB").Label("Medium").Add();
cm.From(200).To(300).Color("#CCC").Label("High").Add();

@* Avoid multi-color arrays if exact legend match is required *@
```

## Summary

This reference covered:

- ✅ Adding and customizing data labels on map shapes
- ✅ Label path configuration from GeoJSON or data source
- ✅ Smart label modes and intersection handling
- ✅ Custom HTML templates for complex label designs
- ✅ Label animation for enhanced visuals
- ✅ Range color mapping for numeric data visualization
- ✅ Equal color mapping for categorical data
- ✅ Desaturation color mapping for opacity-based gradients
- ✅ Multi-color gradients for smooth transitions
- ✅ Handling excluded items in color mapping
- ✅ Applying color mapping to bubbles
- ✅ Best practices for labels and color schemes
- ✅ Common issues and troubleshooting

**Next Steps:**
- Explore legends and overlays for enhanced map presentation
- Implement user interactions like zoom, pan, and tooltips
- Learn about map providers (Bing, Azure, OSM) integration

---

**Example Code Repository:** Check `utils/code-snippet/datalabel/` and `utils/code-snippet/colormapping/` for complete working examples.
