# Customization and Advanced Features in Syncfusion Maps

## Table of Contents
- [Overview](#overview)
- [Maps Dimensions](#maps-dimensions)
  - [Set Width and Height](#set-width-and-height)
  - [Responsive (Percentage)](#responsive-percentage)
  - [Auto-sizing (Default)](#auto-sizing-default)
- [Title and Subtitle](#title-and-subtitle)
  - [Basic Title](#basic-title)
  - [Complete Title Customization](#complete-title-customization)
- [Themes](#themes)
  - [Built-in Themes](#built-in-themes)
- [Container Customization](#container-customization)
  - [Background and Border](#background-and-border)
  - [Complete Container Styling](#complete-container-styling)
- [Area Customization](#area-customization)
- [Shape Customization](#shape-customization)
  - [Basic Shape Styling](#basic-shape-styling)
  - [Shape Customization with Palette](#shape-customization-with-palette)
  - [Shape Border Customization](#shape-border-customization)
  - [Color from Data Source](#color-from-data-source)
  - [Border from Data Source](#border-from-data-source)
- [Projection Types](#projection-types)
  - [Available Projections](#available-projections)
- [Internationalization (i18n)](#internationalization-i18n)
  - [Number Formatting](#number-formatting)
  - [German Culture Example](#german-culture-example)
  - [Format Options](#format-options)
- [Localization (l10n)](#localization-l10n)
  - [Default (English)](#default-english)
  - [German Localization](#german-localization)
  - [French Localization](#french-localization)
  - [Spanish Localization](#spanish-localization)
  - [Localizable Text Keys](#localizable-text-keys)
- [Right-to-Left (RTL)](#right-to-left-rtl)
- [Print and Export](#print-and-export)
  - [Enable Print](#enable-print)
  - [Export as PNG](#export-as-png)
  - [Export as JPEG](#export-as-jpeg)
  - [Export as SVG](#export-as-svg)
  - [Export as PDF](#export-as-pdf)
  - [Export as Base64 String](#export-as-base64-string)
  - [Export Tile Maps (OSM, Bing, Azure)](#export-tile-maps-osm-bing-azure)
- [Accessibility](#accessibility)
  - [Accessibility Features](#accessibility-features)
  - [WAI-ARIA Attributes](#wai-aria-attributes)
  - [Screen Reader Support](#screen-reader-support)
  - [Keyboard Navigation](#keyboard-navigation)
  - [Accessibility Best Practices](#accessibility-best-practices)
- [Best Practices](#best-practices)
  - [Performance Optimization](#performance-optimization)
  - [Responsive Design](#responsive-design)
  - [Cross-Browser Compatibility](#cross-browser-compatibility)
- [Common Issues](#common-issues)
  - [Issue 1: Map Not Displaying Correctly](#issue-1-map-not-displaying-correctly)
  - [Issue 2: Print/Export Not Working](#issue-2-printexport-not-working)
  - [Issue 3: Localization Not Applied](#issue-3-localization-not-applied)
  - [Issue 4: Theme Not Applying](#issue-4-theme-not-applying)
  - [Issue 5: Accessibility Issues](#issue-5-accessibility-issues)
  - [Issue 6: Internationalization Not Formatting](#issue-6-internationalization-not-formatting)
- [Summary](#summary)


## Overview

Advanced customization features include:

- **Dimensions** - Set map width and height
- **Theming** - Apply predefined or custom themes
- **Styling** - Customize container, area, and shapes
- **Projections** - Choose geographic projection types
- **Globalization** - Format numbers for different cultures (i18n)
- **Localization** - Translate UI text to different languages (l10n)
- **Print/Export** - Save maps as images or PDFs
- **Accessibility** - WCAG 2.2 AA compliance for screen readers

## Maps Dimensions

### Set Width and Height

```cshtml
@using Syncfusion.EJ2.Maps

@Html.EJS().Maps("container").Width("800px").Height("600px").Layers(layer =>
    {
        layer.ShapeData(ViewBag.WorldMap).Add();
    }).Render()
```

### Responsive (Percentage)

```cshtml
@Html.EJS().Maps("container")
    .Width("100%")                      // Full container width
    .Height("80vh")                     // 80% of viewport height
    .Layers(layer =>
    {
        layer.ShapeData(ViewBag.WorldMap).Add();
    })
    .Render()
```

### Auto-sizing (Default)

```cshtml
@* Omit Width/Height for auto-sizing *@
@Html.EJS().Maps("container")
    .Layers(layer =>
    {
        layer.ShapeData(ViewBag.WorldMap).Add();
    })
    .Render()
```

## Title and Subtitle

### Basic Title

```cshtml
@Html.EJS().Maps("container")
    .TitleSettings(title => title
        .Text("World Population by Country")
        .SubtitleSettings(subtitle => subtitle
            .Text("Year: 2023")))
    .Layers(layer =>
    {
        layer.ShapeData(ViewBag.WorldMap).Add();
    })
    .Render()
```

### Complete Title Customization

```cshtml
@Html.EJS().Maps("container")
    .TitleSettings(title => title
        .Text("Sales Distribution by Region")
        .Alignment(Syncfusion.EJ2.Maps.Alignment.Center)  // Near, Center, Far
        .Description("Interactive map showing regional sales performance")  // For accessibility
        .TextStyle(style => style
            .Color("#333333")
            .FontFamily("Arial")
            .FontWeight("bold")
            .Size("18px")
            .Opacity(1.0))
        .SubtitleSettings(subtitle => subtitle
            .Text("Q4 2023 Results")
            .Alignment(Syncfusion.EJ2.Maps.Alignment.Center)
            .TextStyle(subtitleStyle => subtitleStyle
                .Color("#666666")
                .Size("14px")
                .FontStyle("italic"))))
    .Layers(layer =>
    {
        layer.ShapeData(ViewBag.WorldMap).Add();
    })
    .Render()
```

## Themes

### Built-in Themes

Syncfusion Maps supports 13 themes:

```cshtml
@Html.EJS().Maps("container")
    .Theme(Syncfusion.EJ2.Maps.Theme.Material)      // Default
    .Layers(layer =>
    {
        layer.ShapeData(ViewBag.WorldMap).Add();
    })
    .Render()
```

| Theme | Description |
|-------|-------------|
| `Material` | Google Material Design (default) |
| `MaterialDark` | Dark Material theme |
| `Fabric` | Microsoft Office Fabric |
| `FabricDark` | Dark Fabric theme |
| `Bootstrap` | Bootstrap 3 theme |
| `Bootstrap4` | Bootstrap 4 theme |
| `BootstrapDark` | Dark Bootstrap theme |
| `Tailwind` | Tailwind CSS theme |
| `TailwindDark` | Dark Tailwind theme |
| `Highcontrast` | High contrast light theme |
| `HighContrastLight` | High contrast light theme |
| `Fluent` | Microsoft Fluent Design |
| `FluentDark` | Dark Fluent theme |

**Example: Dark Theme**

```cshtml
@Html.EJS().Maps("container")
    .Theme(Syncfusion.EJ2.Maps.Theme.MaterialDark)
    .Background("#1e1e1e")              // Match dark background
    .Layers(layer =>
    {
        layer.ShapeData(ViewBag.WorldMap)
            .ShapeSettings(shape => shape
                .Fill("#333333")
                .Border(b => b
                    .Color("#555555")
                    .Width(1)))
            .Add();
    })
    .Render()
```

## Container Customization

### Background and Border

```cshtml
@Html.EJS().Maps("container")
    .Background("#F5F5F5")              // Light gray background
    .Border(border => border
        .Color("#CCCCCC")
        .Width(2)
        .Opacity(1.0))
    .Margin(margin => margin
        .Top(20)
        .Bottom(20)
        .Left(20)
        .Right(20))
    .Layers(layer =>
    {
        layer.ShapeData(ViewBag.WorldMap).Add();
    })
    .Render()
```

### Complete Container Styling

```cshtml
@Html.EJS().Maps("container")
    .Width("900px")
    .Height("600px")
    .Background("linear-gradient(135deg, #667eea 0%, #764ba2 100%)")
    .Border(border => border
        .Color("#8B5CF6")
        .Width(3)
        .Opacity(0.8))
    .Margin(margin => margin
        .Top(10)
        .Bottom(10)
        .Left(10)
        .Right(10))
    .Layers(layer =>
    {
        layer.ShapeData(ViewBag.WorldMap)
            .ShapeSettings(shape => shape
                .Fill("rgba(255, 255, 255, 0.8)")
                .Border(b => b.Color("#FFFFFF").Width(1)))
            .Add();
    })
    .Render()
```

## Area Customization

The **map area** is the drawing region inside the container:

```cshtml
@Html.EJS().Maps("container")
    .MapsAreaSettings(area => area
        .Background("#E0F7FA")          // Light cyan
        .Border(border => border
            .Color("#00ACC1")
            .Width(2)))
    .Layers(layer =>
    {
        layer.ShapeData(ViewBag.WorldMap).Add();
    })
    .Render()
```

**Difference:**
- **Container** = Outer box with title, legend, margins
- **Area** = Inner region where map shapes render

## Shape Customization

### Basic Shape Styling

```cshtml
@Html.EJS().Maps("container")
    .Layers(layer =>
    {
        layer.ShapeData(ViewBag.WorldMap)
            .ShapeSettings(shape => shape
                .Fill("#C8EEFF")            // Light blue
                .Border(b => b
                    .Color("#3497DB")
                    .Width(1))
                .Opacity(0.9))
            .Add();
    })
    .Render()
```

### Shape Customization with Palette

```cshtml
@Html.EJS().Maps("container")
    .Layers(layer =>
    {
        layer.ShapeData(ViewBag.WorldMap)
            .ShapeSettings(shape => shape
                .Autofill(true)             // Use palette colors
                .Palette(new string[] { 
                    "#FFE5B4", 
                    "#FFDAB9", 
                    "#FFB6C1", 
                    "#E6E6FA", 
                    "#B0E0E6" 
                }))
            .Add();
    })
    .Render()
```

### Shape Border Customization

```cshtml
@Html.EJS().Maps("container")
    .Layers(layer =>
    {
        layer.ShapeData(ViewBag.WorldMap)
            .ShapeSettings(shape => shape
                .Fill("#FAFAFA")
                .Border(b => b
                    .Color("#333333")
                    .Width(1.5)
                    .Opacity(0.8))
                .DashArray("3,3"))          // Dashed border
            .Add();
    })
    .Render()
```

### Color from Data Source

```cshtml
@Html.EJS().Maps("container")
    .Layers(layer =>
    {
        layer.ShapeData(ViewBag.WorldMap)
            .DataSource(ViewBag.CountryData)
            .ShapePropertyPath(new[] { "name" })
            .ShapeDataPath("Country")
            .ShapeSettings(shape => shape
                .ColorValuePath("Color"))   // Use "Color" field from data
            .Add();
    })
    .Render()
```

**Controller:**

```csharp
public IActionResult Index()
{
    ViewBag.CountryData = new[]
    {
        new { Country = "United States", Color = "#FFB6C1" },
        new { Country = "Canada", Color = "#B0E0E6" },
        new { Country = "Mexico", Color = "#FFE5B4" }
    };
    return View();
}
```

### Border from Data Source

```cshtml
@Html.EJS().Maps("container")
    .Layers(layer =>
    {
        layer.ShapeData(ViewBag.WorldMap)
            .DataSource(ViewBag.CountryData)
            .ShapePropertyPath(new[] { "name" })
            .ShapeDataPath("Country")
            .ShapeSettings(shape => shape
                .BorderColorValuePath("BorderColor")
                .BorderWidthValuePath("BorderWidth"))
            .Add();
    })
    .Render()
```

**Controller:**

```csharp
public IActionResult Index()
{
    ViewBag.CountryData = new[]
    {
        new { Country = "United States", BorderColor = "#FF0000", BorderWidth = 3 },
        new { Country = "Canada", BorderColor = "#0000FF", BorderWidth = 2 },
        new { Country = "Mexico", BorderColor = "#00FF00", BorderWidth = 2 }
    };
    return View();
}
```

## Projection Types

Map projections transform 3D Earth surface to 2D maps:

```cshtml
@Html.EJS().Maps("container")
    .ProjectionType(Syncfusion.EJ2.Maps.ProjectionType.Mercator)  // Default
    .Layers(layer =>
    {
        layer.ShapeData(ViewBag.WorldMap).Add();
    })
    .Render()
```

### Available Projections

| Projection | Description | Use Case |
|------------|-------------|----------|
| `Mercator` | Preserves angles, distorts size (default) | Navigation, web maps |
| `Equirectangular` | Simple lat/long mapping | General purpose |
| `Miller` | Compromise between shape and size | World maps |
| `Eckert3` | Equal-area, oval shape | Statistical maps |
| `Eckert5` | Equal-area, oval shape | Thematic maps |
| `Eckert6` | Equal-area, oval shape | Distribution maps |
| `Winkel3` | Low distortion compromise | World maps |
| `AitOff` | Equal-area, oval shape | Global views |

**Example: Winkel3 (National Geographic standard)**

```cshtml
@Html.EJS().Maps("container")
    .ProjectionType(Syncfusion.EJ2.Maps.ProjectionType.Winkel3)
    .Layers(layer =>
    {
        layer.ShapeData(ViewBag.WorldMap)
            .ShapeSettings(shape => shape
                .Fill("#E0E0E0")
                .Border(b => b.Color("#666666").Width(1)))
            .Add();
    })
    .Render()
```

**Example: Eckert5 (Equal-area)**

```cshtml
@Html.EJS().Maps("container")
    .ProjectionType(Syncfusion.EJ2.Maps.ProjectionType.Eckert5)
    .Layers(layer =>
    {
        layer.ShapeData(ViewBag.WorldMap).Add();
    })
    .Render()
```

## Internationalization (i18n)

Format numbers for different cultures:

### Number Formatting

```cshtml
@Html.EJS().Maps("container")
    .Format("c")                        // Currency format
    .UseGroupingSeparator(true)         // Add thousand separators
    .Layers(layer =>
    {
        layer.ShapeData(ViewBag.WorldMap)
            .DataSource(ViewBag.PopulationData)
            .ShapePropertyPath(new[] { "name" })
            .ShapeDataPath("Country")
            .DataLabelSettings(label => label
                .Visible(true)
                .LabelPath("Population")
                .SmartLabelMode(Syncfusion.EJ2.Maps.SmartLabelMode.Trim))
            .TooltipSettings(tooltip => tooltip
                .Visible(true)
                .Format("Country: ${Country}<br/>Population: ${Population}"))
            .Add();
    })
    .Render()
```

### German Culture Example

```cshtml
@Html.EJS().Maps("container")
    .Format("c")                        // Currency format
    .UseGroupingSeparator(true)
    .Locale("de")                       // German culture
    .Layers(layer =>
    {
        layer.ShapeData(ViewBag.WorldMap)
            .DataSource(ViewBag.SalesData)
            .ShapePropertyPath(new[] { "name" })
            .ShapeDataPath("Country")
            .TooltipSettings(tooltip => tooltip
                .Visible(true)
                .Format("${Country}: ${Revenue}"))  // Will show as "1.234.567,89 €"
            .Add();
    })
    .Render()

<script src="https://cdn.syncfusion.com/ej2/dist/ej2-base/dist/global/cldr-data/currencies.json"></script>
<script src="https://cdn.syncfusion.com/ej2/dist/ej2-base/dist/global/cldr-data/numbers.json"></script>
<script src="https://cdn.syncfusion.com/ej2/dist/ej2-base/dist/global/cldr-data/timeZoneNames.json"></script>

<script>
    ej.base.loadCldr(
        require('cldr-data/supplemental/numberingSystems.json'),
        require('cldr-data/main/de/numbers.json'),
        require('cldr-data/main/de/currencies.json')
    );
    ej.base.setCulture('de');
    ej.base.setCurrencyCode('EUR');
</script>
```

### Format Options

| Format | Description | Example Output |
|--------|-------------|----------------|
| `"n"` | Number with decimal | 1,234.56 |
| `"c"` | Currency | $1,234.56 |
| `"p"` | Percentage | 12.34% |
| `"n2"` | Number with 2 decimals | 1,234.57 |
| `"c0"` | Currency, no decimals | $1,235 |

## Localization (l10n)

Translate UI text (zoom toolbar tooltips):

### Default (English)

Toolbar tooltips show: "Zoom", "Zoom In", "Zoom Out", "Reset", "Pan"

### German Localization

```cshtml
@Html.EJS().Maps("container")
    .Locale("de")
    .ZoomSettings(zoom => zoom.Enable(true))
    .Layers(layer =>
    {
        layer.ShapeData(ViewBag.WorldMap).Add();
    })
    .Render()

<script>
    ej.base.L10n.load({
        'de': {
            'maps': {
                "Zoom": "Zoomen",
                "ZoomIn": "Hineinzoomen",
                "ZoomOut": "Herauszoomen",
                "Reset": "Zurücksetzen",
                "Pan": "Schwenken"
            }
        }
    });
</script>
```

### French Localization

```cshtml
@Html.EJS().Maps("container")
    .Locale("fr")
    .ZoomSettings(zoom => zoom.Enable(true))
    .Layers(layer =>
    {
        layer.ShapeData(ViewBag.WorldMap).Add();
    })
    .Render()

<script>
    ej.base.L10n.load({
        'fr': {
            'maps': {
                "Zoom": "Zoom",
                "ZoomIn": "Agrandir",
                "ZoomOut": "Dézoomer",
                "Reset": "Réinitialiser",
                "Pan": "Panoramique"
            }
        }
    });
</script>
```

### Spanish Localization

```cshtml
<script>
    ej.base.L10n.load({
        'es': {
            'maps': {
                "Zoom": "Zoom",
                "ZoomIn": "Acercar",
                "ZoomOut": "Alejar",
                "Reset": "Restablecer",
                "Pan": "Desplazar"
            }
        }
    });
</script>
```

### Localizable Text Keys

| Key | Default Text | Description |
|-----|--------------|-------------|
| `Zoom` | "Zoom" | Rectangle zoom button |
| `ZoomIn` | "Zoom In" | Zoom in button |
| `ZoomOut` | "Zoom Out" | Zoom out button |
| `Reset` | "Reset" | Reset zoom button |
| `Pan` | "Pan" | Pan mode button |

## Right-to-Left (RTL)

**Note:** RTL is **not applicable** to Maps component (geographic data doesn't change direction).

For UI elements like legends and titles, use CSS:

```cshtml
@Html.EJS().Maps("container")
    .Layers(layer =>
    {
        layer.ShapeData(ViewBag.WorldMap).Add();
    })
    .Render()

<style>
    #container {
        direction: rtl;  /* For RTL languages (Arabic, Hebrew) */
    }
</style>
```

## Print and Export

### Enable Print

```cshtml
@Html.EJS().Maps("container")
    .AllowPrint(true)
    .Layers(layer =>
    {
        layer.ShapeData(ViewBag.WorldMap).Add();
    })
    .Render()

<button onclick="printMap()">Print Map</button>

<script>
    function printMap() {
        var maps = document.getElementById("container").ej2_instances[0];
        maps.print();
    }
</script>
```

### Export as PNG

```cshtml
@Html.EJS().Maps("container")
    .AllowImageExport(true)
    .Layers(layer =>
    {
        layer.ShapeData(ViewBag.WorldMap).Add();
    })
    .Render()

<button onclick="exportPNG()">Export PNG</button>

<script>
    function exportPNG() {
        var maps = document.getElementById("container").ej2_instances[0];
        maps.export('PNG', 'map');   // Filename: map.png
    }
</script>
```

### Export as JPEG

```cshtml
<button onclick="exportJPEG()">Export JPEG</button>

<script>
    function exportJPEG() {
        var maps = document.getElementById("container").ej2_instances[0];
        maps.export('JPEG', 'map');  // Filename: map.jpeg
    }
</script>
```

### Export as SVG

```cshtml
<button onclick="exportSVG()">Export SVG</button>

<script>
    function exportSVG() {
        var maps = document.getElementById("container").ej2_instances[0];
        maps.export('SVG', 'map');   // Filename: map.svg
    }
</script>
```

### Export as PDF

```cshtml
@Html.EJS().Maps("container")
    .AllowPdfExport(true)
    .Layers(layer =>
    {
        layer.ShapeData(ViewBag.WorldMap).Add();
    })
    .Render()

<button onclick="exportPDF()">Export PDF (Portrait)</button>
<button onclick="exportPDFLandscape()">Export PDF (Landscape)</button>

<script>
    function exportPDF() {
        var maps = document.getElementById("container").ej2_instances[0];
        maps.export('PDF', 'map', 0);  // 0 = Portrait
    }
    
    function exportPDFLandscape() {
        var maps = document.getElementById("container").ej2_instances[0];
        maps.export('PDF', 'map', 1);  // 1 = Landscape
    }
</script>
```

### Export as Base64 String

```cshtml
<button onclick="exportBase64()">Get Base64</button>

<script>
    function exportBase64() {
        var maps = document.getElementById("container").ej2_instances[0];
        maps.export('PNG', 'map', null, false).then((data) => {
            console.log(data);  // Base64 string
            // Use data for upload, preview, etc.
        });
    }
</script>
```

### Export Tile Maps (OSM, Bing, Azure)

```cshtml
@Html.EJS().Maps("container")
    .AllowImageExport(true)
    .AllowPdfExport(true)
    .Layers(layer =>
    {
        layer.UrlTemplate("https://tile.openstreetmap.org/${z}/${x}/${y}.png")
            .Add();
    })
    .Render()

<button onclick="exportTileMap()">Export Tile Map</button>

<script>
    function exportTileMap() {
        var maps = document.getElementById("container").ej2_instances[0];
        maps.export('PNG', 'tilemap');  // Works with online maps too
    }
</script>
```

## Accessibility

Syncfusion Maps is **WCAG 2.2 AA compliant**.

### Accessibility Features

| Feature | Support | Details |
|---------|---------|---------|
| **WCAG 2.2** | AA | Level AA compliance |
| **Section 508** | ✅ | US federal accessibility standard |
| **Screen Readers** | ✅ | NVDA, JAWS, Narrator support |
| **Keyboard Navigation** | ✅ | Full keyboard control |
| **Color Contrast** | ✅ | 4.5:1 minimum ratio |
| **Mobile Devices** | ✅ | Touch-friendly interactions |
| **Right-to-Left** | N/A | Not applicable to geographic data |

### WAI-ARIA Attributes

Maps automatically applies:

| Attribute | Purpose |
|-----------|---------|
| `role="region"` | Non-interactive map areas |
| `role="button"` | Interactive shapes (selection, highlight) |
| `aria-label` | Accessible names for shapes, titles, legends |

### Screen Reader Support

Screen readers announce:

- Shape names (countries, states, regions)
- Title and subtitle content
- Legend title and item labels
- Data labels
- Annotation content
- Marker templates
- Tooltip content

### Keyboard Navigation

| Key | Action |
|-----|--------|
| <kbd>Tab</kbd> | Move to next focusable element |
| <kbd>Shift</kbd> + <kbd>Tab</kbd> | Move to previous element |
| <kbd>+</kbd> | Zoom in |
| <kbd>-</kbd> | Zoom out |
| <kbd>R</kbd> | Reset zoom |
| <kbd>←</kbd> | Pan left (when zoomed) |
| <kbd>→</kbd> | Pan right (when zoomed) |
| <kbd>↑</kbd> | Pan up (when zoomed) |
| <kbd>↓</kbd> | Pan down (when zoomed) |
| <kbd>Enter</kbd> | Select shape or legend item |

### Accessibility Best Practices

**1. Provide Descriptive Titles**

```cshtml
.TitleSettings(title => title
    .Text("World Population Distribution 2023")
    .Description("Interactive choropleth map showing population density by country"))
```

**2. Ensure Color Contrast**

```cshtml
.ShapeSettings(shape => shape
    .ColorMapping(cm =>
    {
        cm.From(0).To(100).Color("#E8F5E9").Label("0-100").Add();        // Light
        cm.From(100).To(1000).Color("#4CAF50").Label("100-1000").Add();  // Medium - good contrast
        cm.From(1000).To(10000).Color("#1B5E20").Label("1000+").Add();   // Dark - excellent contrast
    }))
```

**3. Add Tooltips for Context**

```cshtml
.TooltipSettings(tooltip => tooltip
    .Visible(true)
    .Format("${Country}: ${Population} million"))
```

**4. Keyboard-Accessible Legends**

```cshtml
.LegendSettings(legend => legend
    .Visible(true)
    .Mode(Syncfusion.EJ2.Maps.LegendMode.Interactive)  // Clickable with keyboard
    .ToggleVisibility(true))
```

## Best Practices

### Performance Optimization

**1. Simplify GeoJSON**

Use simplified GeoJSON files for better performance:

```csharp
// Use lower resolution for world maps
ViewBag.WorldMap = GetSimplifiedWorldGeoJSON();  // ~500KB instead of 5MB
```

**2. Limit Data Points**

```csharp
// Use marker clustering for many markers
.MarkerClusterSettings(cluster => cluster
    .AllowClustering(true)
    .Shape(Syncfusion.EJ2.Maps.MarkerClusterShape.Circle))
```

**3. Disable Unused Features**

```cshtml
@* Don't load export libraries if not needed *@
.AllowImageExport(false)
.AllowPdfExport(false)
.AllowPrint(false)
```

### Responsive Design

```cshtml
@Html.EJS().Maps("container")
    .Width("100%")
    .Height("80vh")
    .Layers(layer =>
    {
        layer.ShapeData(ViewBag.WorldMap)
            .ShapeSettings(shape => shape
                .Border(b => b.Width(1)))   // Thinner borders for mobile
            .DataLabelSettings(label => label
                .Visible(true)
                .SmartLabelMode(Syncfusion.EJ2.Maps.SmartLabelMode.Hide))  // Hide overlapping labels
            .Add();
    })
    .Render()

<style>
    @media (max-width: 768px) {
        #container {
            height: 400px !important;  /* Shorter on mobile */
        }
    }
</style>
```

### Cross-Browser Compatibility

```cshtml
@* Works in all modern browsers *@
@* IE11+ support requires polyfills *@

@* Add for IE11 support: *@
<script src="https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/7.12.1/polyfill.min.js"></script>
```

## Common Issues

### Issue 1: Map Not Displaying Correctly

**Symptoms:** Distorted or blank map

**Solutions:**

```cshtml
@* 1. Ensure GeoJSON is valid *@
@* Test at: https://geojson.io/ *@

@* 2. Set appropriate dimensions *@
.Width("800px")
.Height("600px")

@* 3. Verify projection type matches data *@
.ProjectionType(Syncfusion.EJ2.Maps.ProjectionType.Mercator)

@* 4. Check MapsAreaSettings *@
.MapsAreaSettings(area => area
    .Background("#FFFFFF"))  @* Not transparent *@
```

### Issue 2: Print/Export Not Working

**Symptoms:** Export button does nothing

**Checklist:**

```cshtml
@* 1. Enable export properties *@
.AllowImageExport(true)
.AllowPdfExport(true)
.AllowPrint(true)

@* 2. Verify export method call *@
<script>
    function exportMap() {
        var maps = document.getElementById("container").ej2_instances[0];
        if (maps) {
            maps.export('PNG', 'map');  // ✅ Correct
        }
    }
</script>

@* 3. Check browser console for errors *@
@* PDF export requires additional library loaded *@
```

### Issue 3: Localization Not Applied

**Symptoms:** Toolbar still shows English text

**Solutions:**

```cshtml
@* 1. Set locale property *@
.Locale("de")

@* 2. Load L10n before Maps initialization *@
<script>
    // Load BEFORE @Html.EJS().Maps()
    ej.base.L10n.load({
        'de': {
            'maps': {
                "ZoomIn": "Hineinzoomen"
            }
        }
    });
</script>

@* 3. Verify key names match exactly *@
@* "ZoomIn" ✅  "Zoom In" ❌ (space not allowed in key) *@
```

### Issue 4: Theme Not Applying

**Symptoms:** Map doesn't match selected theme

**Solutions:**

```cshtml
@* 1. Ensure theme is set before layers *@
@Html.EJS().Maps("container")
    .Theme(Syncfusion.EJ2.Maps.Theme.MaterialDark)  @* Set first *@
    .Layers(layer => { ... })

@* 2. Include theme CSS file *@
<link href="https://cdn.syncfusion.com/ej2/material-dark.css" rel="stylesheet" />

@* 3. Clear browser cache *@
@* Theme changes may require cache clear *@
```

### Issue 5: Accessibility Issues

**Symptoms:** Screen reader not announcing content

**Solutions:**

```cshtml
@* 1. Add descriptive title *@
.TitleSettings(title => title
    .Text("Sales Map")
    .Description("Interactive map showing sales by region"))

@* 2. Enable tooltips for context *@
.TooltipSettings(tooltip => tooltip
    .Visible(true)
    .ValuePath("name"))

@* 3. Use semantic HTML *@
<div role="region" aria-label="Sales Distribution Map">
    @Html.EJS().Maps("container")...
</div>

@* 4. Ensure color contrast (4.5:1 minimum) *@
@* Test at: https://webaim.org/resources/contrastchecker/ *@
```

### Issue 6: Internationalization Not Formatting

**Symptoms:** Numbers not formatted for culture

**Solutions:**

```cshtml
@* 1. Load CLDR data *@
<script src="https://cdn.syncfusion.com/ej2/dist/ej2-base/dist/global/cldr-data/numbers.json"></script>
<script src="https://cdn.syncfusion.com/ej2/dist/ej2-base/dist/global/cldr-data/currencies.json"></script>

@* 2. Set culture before initialization *@
<script>
    ej.base.setCulture('de');
    ej.base.setCurrencyCode('EUR');
</script>

@* 3. Use Format property *@
.Format("c")  @* Currency format *@

@* 4. Enable grouping separator *@
.UseGroupingSeparator(true)
```

## Summary

This reference covered:

- ✅ Setting map dimensions (width, height, responsive)
- ✅ Title and subtitle customization with alignment and styling
- ✅ 13 built-in themes (Material, Fabric, Bootstrap, Tailwind, etc.)
- ✅ Container customization (background, border, margin)
- ✅ Area customization (drawing region styling)
- ✅ Shape customization (fill, borders, palette, data-driven colors)
- ✅ 8 geographic projection types (Mercator, Winkel3, Eckert, etc.)
- ✅ Internationalization (i18n) - number/currency formatting for cultures
- ✅ Localization (l10n) - translating UI text to multiple languages
- ✅ Print and export to PNG, JPEG, SVG, PDF, base64
- ✅ WCAG 2.2 AA accessibility compliance
- ✅ Screen reader support and keyboard navigation
- ✅ Best practices for performance, responsiveness, and accessibility
- ✅ Common issues and troubleshooting

**Complete Workflow Example:**

```cshtml
@Html.EJS().Maps("container")
    .Width("100%")
    .Height("600px")
    .Theme(Syncfusion.EJ2.Maps.Theme.Material)
    .Background("#F5F5F5")
    .Margin(margin => margin.Top(10).Bottom(10).Left(10).Right(10))
    .ProjectionType(Syncfusion.EJ2.Maps.ProjectionType.Mercator)
    .Format("n0")
    .UseGroupingSeparator(true)
    .AllowPrint(true)
    .AllowImageExport(true)
    .AllowPdfExport(true)
    .TitleSettings(title => title
        .Text("Global Sales Dashboard")
        .Description("Interactive map showing sales performance by country")
        .TextStyle(style => style.Size("20px").FontWeight("bold")))
    .MapsAreaSettings(area => area
        .Background("#FFFFFF"))
    .Layers(layer =>
    {
        layer.ShapeData(ViewBag.WorldMap)
            .DataSource(ViewBag.SalesData)
            .ShapePropertyPath(new[] { "name" })
            .ShapeDataPath("Country")
            .ShapeSettings(shape => shape
                .ColorValuePath("Sales")
                .ColorMapping(cm =>
                {
                    cm.From(0).To(1000).Color("#E8F5E9").Label("0-1K").Add();
                    cm.From(1000).To(10000).Color("#4CAF50").Label("1K-10K").Add();
                    cm.From(10000).To(100000).Color("#1B5E20").Label("10K+").Add();
                })
                .Border(b => b.Color("#BDBDBD").Width(1)))
            .TooltipSettings(tooltip => tooltip
                .Visible(true)
                .Format("${Country}<br/>Sales: ${Sales}"))
            .SelectionSettings(selection => selection
                .Enable(true)
                .Fill("#FFD700"))
            .HighlightSettings(highlight => highlight
                .Enable(true)
                .Fill("#FFEB3B")
                .Opacity(0.7))
            .Add();
    })
    .LegendSettings(legend => legend
        .Visible(true)
        .Position(Syncfusion.EJ2.Maps.LegendPosition.Bottom)
        .Mode(Syncfusion.EJ2.Maps.LegendMode.Interactive))
    .ZoomSettings(zoom => zoom
        .Enable(true)
        .MouseWheelZoom(true)
        .PinchZooming(true))
    .Render()
```

---

**Example Code Repository:** Check `utils/code-snippet/customization/` for complete working examples.
