# Layers and Data Binding in Syncfusion Maps

## Table of Contents
- [Overview](#overview)
- [Layer Architecture](#layer-architecture)
  - [Understanding Layers](#understanding-layers)
  - [Basic Layer Configuration](#basic-layer-configuration)
- [Working with GeoJSON](#working-with-geojson)
  - [GeoJSON Format](#geojson-format)
  - [Where to Find GeoJSON Files](#where-to-find-geojson-files)
  - [Loading GeoJSON in MVC](#loading-geojson-in-mvc)
- [Multiple Layers and Sublayers](#multiple-layers-and-sublayers)
  - [Adding Sublayers](#adding-sublayers)
- [Data Binding](#data-binding)
  - [Understanding Shape Data Binding](#understanding-shape-data-binding)
  - [ShapePropertyPath](#shapepropertypath)
  - [ShapeDataPath](#shapedatapath)
  - [Complete Data Binding Example](#complete-data-binding-example)
- [Loading GeoJSON Data](#loading-geojson-data)
  - [Geometry Types Supported](#geometry-types-supported)
  - [Verifying GeoJSON Data](#verifying-geojson-data)
  - [Optimizing Large GeoJSON Files](#optimizing-large-geojson-files)
- [Binding Complex Data](#binding-complex-data)
  - [Nested Object Fields](#nested-object-fields)
  - [Array Fields in Data Source](#array-fields-in-data-source)
- [Switching Layers (Drill-Down)](#switching-layers-drill-down)
  - [BaseLayerIndex Property](#baselayerindex-property)
  - [Adding Back Navigation](#adding-back-navigation)
- [Custom Shapes](#custom-shapes)
  - [Creating Custom Maps](#creating-custom-maps)
  - [Custom Shape Resources](#custom-shape-resources)
- [Best Practices](#best-practices)
  - [Performance Optimization](#performance-optimization)
  - [Data Organization](#data-organization)
  - [File Organization](#file-organization)
- [Common Issues](#common-issues)
  - [Issue 1: Map Not Rendering](#issue-1-map-not-rendering)
  - [Issue 2: Data Not Binding to Shapes](#issue-2-data-not-binding-to-shapes)
  - [Issue 3: Sublayers Not Visible](#issue-3-sublayers-not-visible)
  - [Issue 4: Layer Switching Not Working](#issue-4-layer-switching-not-working)
  - [Issue 5: Complex Data Path Not Working](#issue-5-complex-data-path-not-working)
- [Summary](#summary)

## Overview

The Maps component is built on a layer-based architecture where each layer represents a distinct geographical or data visualization level. Layers are the foundation of the Maps component, allowing you to:

- Load GeoJSON shape data for geographical regions
- Add multiple shape layers (main layers and sublayers)
- Bind data sources to geographical shapes
- Create drill-down experiences by switching between layers
- Render custom shapes for specialized visualizations

**When to use this reference:**
- Setting up map layers for the first time
- Loading and configuring GeoJSON data
- Binding data sources to map shapes
- Creating multi-layer maps with sublayers
- Implementing drill-down functionality
- Matching data records to geographical shapes
- Creating custom maps for specialized use cases

## Layer Architecture

### Understanding Layers

The Maps component supports unlimited layers through the `Layers` collection. There are two types of layers:

1. **Main Layers** - Primary layers that display the base geographical shapes or map tiles
2. **Sublayers** - Additional layers overlaid on main layers for additional detail

**Layer Types:**

| Type | Description | Use Case |
|------|-------------|----------|
| `Geometry` | Shape-based layer using GeoJSON data | Country maps, state maps, custom shapes |
| `Bing` | Bing Maps tile layer | Satellite imagery, road maps |
| `OSM` | OpenStreetMap tile layer | Free alternative to commercial providers |

### Basic Layer Configuration

**Controller:**

```csharp
using System.Web.Mvc;
using Newtonsoft.Json;

public class HomeController : Controller
{
    public ActionResult Index()
    {
        // Load GeoJSON shape data
        ViewBag.MapData = GetWorldMap();
        return View();
    }

    public object GetWorldMap()
    {
        string jsonPath = Server.MapPath("~/App_Data/WorldMap.json");
        string jsonContent = System.IO.File.ReadAllText(jsonPath);
        return JsonConvert.DeserializeObject(jsonContent, typeof(object));
    }
}
```

**View:**

```cshtml
@using Syncfusion.EJ2.Maps

@Html.EJS().Maps("container").Layers(layer =>
{
    layer.ShapeData(ViewBag.MapData).Add();
}).Render()
```

## Working with GeoJSON

### GeoJSON Format

GeoJSON is a standard format for encoding geographical data structures. A typical GeoJSON file contains:

```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "name": "Afghanistan",
        "admin": "Afghanistan",
        "continent": "Asia"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[61.210817, 35.650072], ...]]
      }
    }
  ]
}
```

**Key GeoJSON Elements:**

- **type**: Always "FeatureCollection" at the root level
- **features**: Array of geographical features
- **properties**: Custom data associated with each shape (e.g., name, population)
- **geometry**: The shape definition (type and coordinates)

### Where to Find GeoJSON Files

1. **Syncfusion CDN**: https://cdn.syncfusion.com/maps/map-data/
2. **GitHub Repositories**: https://github.com/johan/world.geo.json
3. **Natural Earth Data**: https://www.naturalearthdata.com/
4. **Custom Creation**: Use tools like Mapshaper (https://mapshaper.org/)

### Loading GeoJSON in MVC

**Method 1: Load from App_Data Folder (Recommended)**

Place your GeoJSON file in `~/App_Data/` folder:

```csharp
public object GetWorldMap()
{
    string jsonPath = Server.MapPath("~/App_Data/world-map.json");
    string jsonContent = System.IO.File.ReadAllText(jsonPath);
    return JsonConvert.DeserializeObject(jsonContent, typeof(object));
}
```

**Method 2: Load from CDN or External URL**

```csharp
using System.Net;

public object GetWorldMapFromCDN()
{
    string url = "https://cdn.syncfusion.com/maps/map-data/world-map.json";
    using (WebClient client = new WebClient())
    {
        string jsonContent = client.DownloadString(url);
        return JsonConvert.DeserializeObject(jsonContent, typeof(object));
    }
}
```

**Method 3: Embed as Static Property**

For small GeoJSON data, you can create a static class:

```csharp
public static class MapDataSource
{
    public static object GetCustomShape()
    {
        string geoJson = @"{
            'type': 'FeatureCollection',
            'features': [...]
        }";
        return JsonConvert.DeserializeObject(geoJson, typeof(object));
    }
}
```

## Multiple Layers and Sublayers

### Adding Sublayers

Sublayers allow you to overlay additional geographical features on top of the main layer. Common uses include:

- Adding state boundaries over country map
- Overlaying river systems on terrain maps
- Showing city locations over regional maps
- Displaying multiple datasets simultaneously

**Example: United States Map with State Sublayers**

**Controller:**

```csharp
public ActionResult Index()
{
    ViewBag.UsaMap = GetUsaMap();
    ViewBag.TexasMap = GetTexasMap();
    ViewBag.CaliforniaMap = GetCaliforniaMap();
    return View();
}

public object GetUsaMap()
{
    string path = Server.MapPath("~/App_Data/usa.json");
    return JsonConvert.DeserializeObject(System.IO.File.ReadAllText(path), typeof(object));
}

public object GetTexasMap()
{
    string path = Server.MapPath("~/App_Data/texas.json");
    return JsonConvert.DeserializeObject(System.IO.File.ReadAllText(path), typeof(object));
}

public object GetCaliforniaMap()
{
    string path = Server.MapPath("~/App_Data/california.json");
    return JsonConvert.DeserializeObject(System.IO.File.ReadAllText(path), typeof(object));
}
```

**View:**

```cshtml
@Html.EJS().Maps("container").Layers(layer =>
{
    // Main layer - USA
    layer.ShapeSettings(settings => settings.Fill("#E5E5E5")).ShapeData(ViewBag.UsaMap)
        .Add();

    //Sublayer 1 - Texas
    layer.Type(Syncfusion.EJ2.Maps.Type.SubLayer)
    .ShapeSettings(settings => settings
        .Fill("#FFB6C1")
        .Border(b => b.Color("#FF0000").Width(2)))
    .ShapeData(ViewBag.TexasMap)
    .Add();

    //// Sublayer 2 - California
    layer.Type(Syncfusion.EJ2.Maps.Type.SubLayer)
           .ShapeSettings(settings => settings
            .Fill("#87CEEB")
            .Border(b => b.Color("#0000FF").Width(2)))
        .ShapeData(ViewBag.CaliforniaMap)
        .Add();
}).Render()
```

**Key Points:**
- Main layer uses default type (no Type property needed)
- Sublayers must set `Type(Syncfusion.EJ2.Maps.Type.SubLayer)`
- Each layer can have independent styling
- Layers are rendered in the order they are added

## Data Binding

### Understanding Shape Data Binding

Data binding connects your data source (e.g., statistical data) to geographical shapes so you can:

- Color shapes based on data values
- Display data labels on shapes
- Show tooltips with shape information
- Enable data-driven visualizations

**Two Key Properties:**

1. **ShapePropertyPath** - Field name in GeoJSON properties
2. **ShapeDataPath** - Field name in your data source

These properties create the link between shapes and data.

### ShapePropertyPath

This property references a field in the GeoJSON's `properties` object:

**GeoJSON Example:**

```json
{
  "type": "Feature",
  "properties": {
    "name": "Afghanistan",
    "admin": "Afghanistan",
    "continent": "Asia"
  },
  "geometry": { ... }
}
```

In this example, `ShapePropertyPath` would be set to **"name"** to use the country name for matching.

### ShapeDataPath

This property references a field in your C# data source:

**Data Source Example:**

```csharp
public ActionResult Index()
{
    ViewBag.PopulationData = new[]
    {
        new { Country = "Afghanistan", Population = 29863010, Density = 119 },
        new { Country = "Albania", Population = 3195000, Density = 111 },
        new { Country = "Algeria", Population = 34895000, Density = 15 }
    };
    return View();
}
```

In this example, `ShapeDataPath` would be set to **"Country"** to match the country name.

### Complete Data Binding Example

**Controller:**

```csharp
public ActionResult Index()
{
    // Load GeoJSON shape data
    ViewBag.MapData = GetWorldMap();
    
    // Prepare data source with statistics
    ViewBag.PopulationData = new[]
    {
        new { name = "Afghanistan", population = 29863010, density = 119, code = "AF" },
        new { name = "Albania", population = 3195000, density = 111, code = "AL" },
        new { name = "Algeria", population = 34895000, density = 15, code = "DZ" },
        new { name = "Angola", population = 18498000, density = 15, code = "AO" },
        new { name = "Argentina", population = 40091359, density = 14, code = "AR" },
        new { name = "Armenia", population = 3230100, density = 108, code = "AM" }
    };
    
    return View();
}

public object GetWorldMap()
{
    string path = Server.MapPath("~/App_Data/world-map.json");
    return JsonConvert.DeserializeObject(System.IO.File.ReadAllText(path), typeof(object));
}
```

**View:**

```cshtml
@Html.EJS().Maps("container").Layers(layer =>
{
    layer
    .ShapeSettings(settings => settings
        .ColorValuePath("density")        // Data field for coloring
        .Fill("#E5E5E5")                  // Default color
    )
    .ShapeData(ViewBag.MapData)
        .DataSource(ViewBag.PopulationData)
        .ShapePropertyPath(new[] { "name" })  // Field in GeoJSON
        .ShapeDataPath("name")                // Field in data source
        .Add();
}).Render()
```

**What Happens:**
1. Maps reads GeoJSON and finds shape with `properties.name = "Afghanistan"`
2. Maps reads data source and finds record with `name = "Afghanistan"`
3. Because both "name" values match, the shape is bound to the data record
4. Now the shape can use `density`, `population`, or other fields for visualization

## Loading GeoJSON Data

### Geometry Types Supported

The Maps component supports all standard GeoJSON geometry types:

| Geometry Type | Supported | Description |
|---------------|-----------|-------------|
| `Polygon` | ✅ Yes | Single polygon (most countries, states) |
| `MultiPolygon` | ✅ Yes | Multiple polygons (islands, archipelagos) |
| `LineString` | ✅ Yes | Single line (roads, rivers) |
| `MultiLineString` | ✅ Yes | Multiple lines (road networks) |
| `Point` | ✅ Yes | Single point (cities, landmarks) |
| `MultiPoint` | ✅ Yes | Multiple points (city clusters) |
| `GeometryCollection` | ✅ Yes | Mixed geometry types |

### Verifying GeoJSON Data

Before using GeoJSON data in production, validate it:

**Method 1: Online Validators**
- http://geojson.io/ - Visualize and validate
- https://geojsonlint.com/ - JSON validation

**Method 2: C# Validation**

```csharp
public bool IsValidGeoJson(string jsonPath)
{
    try
    {
        string content = System.IO.File.ReadAllText(jsonPath);
        var data = JsonConvert.DeserializeObject(content);
        return data != null;
    }
    catch (JsonException)
    {
        return false;
    }
}
```

### Optimizing Large GeoJSON Files

**Problem:** Large GeoJSON files can cause slow rendering and memory issues.

**Solutions:**

1. **Simplify Geometry** - Use Mapshaper to reduce coordinate points
   ```
   Visit https://mapshaper.org/
   Upload GeoJSON → Simplify → Export simplified version
   ```

2. **Split into Multiple Files** - Separate by region or zoom level

3. **Load on Demand** - Only load detailed data when zooming in

```csharp
public ActionResult GetDetailedMap(string region)
{
    string path = Server.MapPath($"~/App_Data/detailed/{region}.json");
    return Json(JsonConvert.DeserializeObject(
        System.IO.File.ReadAllText(path), typeof(object)), 
        JsonRequestBehavior.AllowGet);
}
```

## Binding Complex Data

### Nested Object Fields

When your data source contains nested objects, use dot notation in property paths:

**Data Source:**

```csharp
ViewBag.ComplexData = new[]
{
    new {
        Location = new { Country = "United States", Code = "US" },
        Statistics = new { Population = 331000000, GDP = 21427700 }
    },
    new {
        Location = new { Country = "India", Code = "IN" },
        Statistics = new { Population = 1380000000, GDP = 2875142 }
    }
};
```

**View:**

```cshtml
@Html.EJS().Maps("container").Layers(layer =>
{
    layer.ShapeSettings(settings => settings
    .ColorValuePath("Statistics.Population")
    ).ShapeData(ViewBag.MapData)
        .DataSource(ViewBag.ComplexData)
        .ShapePropertyPath(new[] { "name" })
        .ShapeDataPath("Location.Country")  // Dot notation for nested field
        .Add();
}).Render()
```

### Array Fields in Data Source

If your data contains arrays, you can access specific array elements:

```csharp
ViewBag.ArrayData = new[]
{
    new {
        Country = "USA",
        Years = new[] { 2018, 2019, 2020 },
        Values = new[] { 100, 120, 110 }
    }
};
```

```cshtml
@* Access first element *@
.ColorValuePath("Values.0")
```

## Switching Layers (Drill-Down)

### BaseLayerIndex Property

The `BaseLayerIndex` property controls which layer is visible in the Maps component. This is useful for drill-down functionality where clicking a region loads a more detailed map.

**Example: World Map to Country Drill-Down**

**Controller:**

```csharp
public ActionResult Index()
{
    ViewBag.WorldMap = GetWorldMap();
    ViewBag.UsaMap = GetUsaMap();
    return View();
}
```

**View:**

```cshtml
@Html.EJS().Maps("container").BaseLayerIndex(0)  // Start with world map (index 0).Layers(layer =>
    {
        // Layer 0 - World Map
        layer.ShapeData(ViewBag.WorldMap)
            .ShapeSettings(settings => settings.Fill("#E5E5E5"))
            .Add();
        
        // Layer 1 - USA Map (hidden initially)
        layer.ShapeData(ViewBag.UsaMap)
            .ShapeSettings(settings => settings.Fill("#FFB6C1"))
            .Add();
    }).ShapeSelected("shapeSelected").Render()

<script>
    function shapeSelected(args) {
        // When USA is clicked on world map, switch to USA detail map
        if (args.data.name === "United States") {
            var maps = document.getElementById("container").ej2_instances[0];
            maps.baseLayerIndex = 1;  // Switch to layer 1 (USA map)
            maps.refresh();
        }
    }
</script>
```

**How It Works:**
1. Initially, `BaseLayerIndex = 0`, so Layer 0 (World Map) is displayed
2. When user clicks USA on world map, `shapeSelected` event fires
3. Event handler sets `baseLayerIndex = 1`
4. Maps refreshes and displays Layer 1 (USA Map)

### Adding Back Navigation

```cshtml
<button onclick="goBackToWorld()">Back to World Map</button>

<script>
    function goBackToWorld() {
        var maps = document.getElementById("container").ej2_instances[0];
        maps.baseLayerIndex = 0;
        maps.refresh();
    }
</script>
```

## Custom Shapes

### Creating Custom Maps

You can create custom shapes for specialized visualizations like:

- Bus seat booking layouts
- Stadium seating charts
- Office floor plans
- Game board layouts
- Custom region maps

**Requirements:**
- GeoJSON format with proper geometries
- `GeometryType` set to `GeometryType.Normal`

**Example: Bus Seat Selection**

**GeoJSON Structure (seat.json):**

```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": { "seatNo": "1A", "row": 1, "available": true },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[0, 0], [1, 0], [1, 1], [0, 1], [0, 0]]]
      }
    },
    {
      "type": "Feature",
      "properties": { "seatNo": "1B", "row": 1, "available": false },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[1.2, 0], [2.2, 0], [2.2, 1], [1.2, 1], [1.2, 0]]]
      }
    }
  ]
}
```

**Controller:**

```csharp
public ActionResult SeatBooking()
{
    ViewBag.SeatData = GetSeatLayout();
    ViewBag.SeatStatus = new[]
    {
        new { seatNo = "1A", booked = false },
        new { seatNo = "1B", booked = true },
        new { seatNo = "2A", booked = false }
    };
    return View();
}

public object GetSeatLayout()
{
    string path = Server.MapPath("~/App_Data/seat.json");
    return JsonConvert.DeserializeObject(System.IO.File.ReadAllText(path), typeof(object));
}
```

**View:**

```cshtml
@Html.EJS().Maps("container").ProjectionType(Syncfusion.EJ2.Maps.ProjectionType.Equirectangular).Layers(layer =>
    {
        layer.ShapeSettings(settings => settings
                .ColorValuePath("booked")
                .ColorMapping(cm =>
                {
                    cm.Value("false").Color("#00FF00").Add();  // Available - Green
                    cm.Value("true").Color("#FF0000").Add();   // Booked - Red
                })
            ).ShapeData(ViewBag.SeatData)
            .GeometryType(Syncfusion.EJ2.Maps.GeometryType.Normal)
            .DataSource(ViewBag.SeatStatus)
            .ShapePropertyPath(new[] { "seatNo" })
            .ShapeDataPath("seatNo")
            .Add();
    }).Render()
```

### Custom Shape Resources

- **Example GeoJSON**: https://cdn.syncfusion.com/maps/map-data/seat.json
- **Live Demo**: https://ej2.syncfusion.com/aspnetmvc/Maps/Seatbooking

## Best Practices

### Performance Optimization

1. **Simplify GeoJSON** - Remove unnecessary precision in coordinates
2. **Cache GeoJSON Data** - Store in application cache to avoid repeated file reads
3. **Use Static Properties** - For small, unchanging data sets
4. **Lazy Load Details** - Load detailed maps only when needed

**Caching Example:**

```csharp
private static object _cachedWorldMap = null;

public object GetWorldMap()
{
    if (_cachedWorldMap == null)
    {
        string path = Server.MapPath("~/App_Data/world-map.json");
        string content = System.IO.File.ReadAllText(path);
        _cachedWorldMap = JsonConvert.DeserializeObject(content, typeof(object));
    }
    return _cachedWorldMap;
}
```

### Data Organization

1. **Match Field Names** - Use consistent naming between GeoJSON properties and data source fields
2. **Use Clear Property Names** - `ShapePropertyPath(new[] { "name" })` is clearer than generic keys
3. **Validate Data** - Ensure all shapes have matching data records
4. **Handle Missing Data** - Provide default values for shapes without data

### File Organization

```
App_Data/
├── maps/
│   ├── world-map.json
│   ├── usa-map.json
│   ├── states/
│   │   ├── california.json
│   │   └── texas.json
│   └── custom/
│       └── seat-layout.json
```

## Common Issues

### Issue 1: Map Not Rendering

**Symptoms:** Blank area where map should appear

**Causes & Solutions:**

1. **Invalid GeoJSON**
   ```csharp
   // Add error handling
   try {
       ViewBag.MapData = GetWorldMap();
   } catch (JsonException ex) {
       // Log error and use fallback data
   }
   ```

2. **File Path Incorrect**
   ```csharp
   // Verify file exists
   string path = Server.MapPath("~/App_Data/world-map.json");
   if (!System.IO.File.Exists(path)) {
       throw new FileNotFoundException($"Map data not found: {path}");
   }
   ```

3. **Missing ScriptManager**
   ```cshtml
   @* Add to _Layout.cshtml *@
   @Html.EJS().ScriptManager()
   ```

### Issue 2: Data Not Binding to Shapes

**Symptoms:** Shapes render but data (colors, tooltips) not showing

**Diagnosis Checklist:**

```csharp
// 1. Verify field names match exactly (case-sensitive)
ShapePropertyPath(new[] { "name" })  // Must match GeoJSON property
ShapeDataPath("name")                // Must match data source field

// 2. Check data source is not null
if (ViewBag.PopulationData == null) {
    // Data source is missing
}

// 3. Verify at least one record matches
// GeoJSON has: "properties": { "name": "Afghanistan" }
// Data source must have: { name = "Afghanistan", ... }
```

**Solution: Add Logging**

```csharp
public ActionResult Index()
{
    var data = new[] {
        new { name = "Afghanistan", value = 100 }
    };
    
    // Log for debugging
    System.Diagnostics.Debug.WriteLine($"Data count: {data.Length}");
    foreach (var item in data) {
        System.Diagnostics.Debug.WriteLine($"  {item.name}: {item.value}");
    }
    
    ViewBag.PopulationData = data;
    return View();
}
```

### Issue 3: Sublayers Not Visible

**Symptoms:** Only main layer renders, sublayers missing

**Solution:**

```cshtml
@* Ensure sublayers have Type set correctly *@
layer.Type(Syncfusion.EJ2.Maps.Type.SubLayer)
    .ShapeData(ViewBag.TexasMap)
    .Add();

@* Ensure sublayer data is not null *@
@if (ViewBag.TexasMap != null) {
    layer.Type(Syncfusion.EJ2.Maps.Type.SubLayer)
        .ShapeData(ViewBag.TexasMap)
        .Add();
}
```

### Issue 4: Layer Switching Not Working

**Symptoms:** BaseLayerIndex change doesn't update map

**Solution:**

```javascript
// Must refresh after changing BaseLayerIndex
var maps = document.getElementById("container").ej2_instances[0];
maps.baseLayerIndex = 1;
maps.refresh();  // Required!
```

### Issue 5: Complex Data Path Not Working

**Symptoms:** Nested object fields not accessible

**Check:**

```cshtml
@* Use dot notation correctly *@
.ShapeDataPath("Location.Country")  // ✅ Correct
.ShapeDataPath("Location[Country]") // ❌ Wrong syntax
```

## Summary

This reference covered:

- ✅ Layer architecture (main layers and sublayers)
- ✅ GeoJSON format and loading strategies
- ✅ Data binding with ShapePropertyPath and ShapeDataPath
- ✅ Multiple layers and sublayer configuration
- ✅ Complex data binding with nested objects
- ✅ Layer switching for drill-down functionality
- ✅ Custom shape creation for specialized maps
- ✅ Performance optimization and best practices
- ✅ Common issues and troubleshooting

**Next Steps:**
- Explore markers and bubbles for location-based visualizations
- Learn about color mapping for choropleth maps
- Implement interactive features like zoom and selection

---

**Example Code Repository:** Check `utils/code-snippet/layers/` for complete working examples.
