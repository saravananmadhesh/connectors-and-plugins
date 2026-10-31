# Markers and Bubbles in Syncfusion Maps

## Table of Contents
- [Overview](#overview)
- [Markers](#markers)
  - [Adding Markers](#adding-markers)
  - [Marker Data Structure](#marker-data-structure)
  - [Marker Shapes](#marker-shapes)
  - [Customizing Markers](#customizing-markers)
  - [Marker Templates](#marker-templates)
  - [Multiple Marker Groups](#multiple-marker-groups)
  - [Marker Positioning](#marker-positioning)
    - [Using LatitudeValuePath and LongitudeValuePath](#using-latitudevaluepath-and-longitudevaluepath)
    - [Marker Offset](#marker-offset)
  - [Marker Clustering](#marker-clustering)
    - [Per-Group Clustering](#per-group-clustering)
  - [Marker Drag and Drop](#marker-drag-and-drop)
  - [Marker Tooltips](#marker-tooltips)
  - [Using Image Markers](#using-image-markers)
  - [Dynamic Marker Styling from Data](#dynamic-marker-styling-from-data)
- [Bubbles](#bubbles)
  - [Adding Bubbles](#adding-bubbles)
  - [Bubble Shapes](#bubble-shapes)
  - [Customizing Bubbles](#customizing-bubbles)
  - [Bubble Size Configuration](#bubble-size-configuration)
  - [Multiple Bubble Groups](#multiple-bubble-groups)
  - [Bubble Tooltips](#bubble-tooltips)
  - [Dynamic Bubble Colors from Data](#dynamic-bubble-colors-from-data)
- [Best Practices](#best-practices)
  - [Markers Best Practices](#markers-best-practices)
  - [Bubbles Best Practices](#bubbles-best-practices)
  - [Performance Optimization](#performance-optimization)
- [Common Issues](#common-issues)
  - [Issue 1: Markers Not Appearing](#issue-1-markers-not-appearing)
  - [Issue 2: Bubbles All Same Size](#issue-2-bubbles-all-same-size)
  - [Issue 3: Clustering Not Working](#issue-3-clustering-not-working)
  - [Issue 4: Template Not Rendering](#issue-4-template-not-rendering)
  - [Issue 5: Marker Drag Not Working](#issue-5-marker-drag-not-working)
  - [Issue 6: Bubbles Overlapping Markers](#issue-6-bubbles-overlapping-markers)
- [Summary](#summary)

## Overview

Markers and bubbles are visual elements that enhance Maps by representing specific data points and quantitative values:

- **Markers** - Precise location indicators (cities, offices, landmarks) positioned at exact latitude/longitude coordinates
- **Bubbles** - Size-based data visualization that represents quantitative values (population, sales, metrics) at geographical locations

**When to use Markers:**
- Marking specific locations (stores, offices, landmarks)
- Showing points of interest
- Highlighting selected cities or regions
- Adding custom annotations at coordinates

**When to use Bubbles:**
- Visualizing quantitative data (population density, sales volume)
- Comparing values across different locations
- Creating proportional symbol maps
- Showing magnitude or intensity at locations

## Markers

### Adding Markers

Markers are enabled by setting the `Visible` property to `true` and providing a data source with latitude and longitude coordinates.

**Basic Marker Implementation:**

**Controller:**

```csharp
using System.Web.Mvc;
using Newtonsoft.Json;

public class HomeController : Controller
{
    public ActionResult Index()
    {
        ViewBag.MapData = GetWorldMap();
        ViewBag.MarkerData = new[]
        {
            new { Latitude = 40.7128, Longitude = -74.0060, City = "New York" },
            new { Latitude = 51.5074, Longitude = -0.1278, City = "London" },
            new { Latitude = 35.6762, Longitude = 139.6503, City = "Tokyo" },
            new { Latitude = -33.8688, Longitude = 151.2093, City = "Sydney" }
        };
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
@{
    var propertyPath = new[] { "name" };
    var data = new[]
    {
        new {latitude = 49.95121990866204, longitude =  18.468749999999998},
        new {latitude =  59.88893689676585, longitude =  -109.3359375},
        new {latitude =  -6.64607562172573, longitude =  -55.54687499999999}
    };
}
@Html.EJS().Maps("maps").Layers(l =>
   {
       l.MarkerSettings(marker =>
       {
           marker.Visible(true).AnimationDuration(0).DataSource(data).Height(20).Width(20).Add();
       }).ShapeData(ViewBag.world_map).Add();
   }).Render()
```

### Marker Data Structure

**Required Fields:**
- `latitude` (or `Latitude`) - Y-axis coordinate
- `longitude` (or `Longitude`) - X-axis coordinate

**Optional Fields:**
- Any custom fields for tooltips, colors, shapes, etc.

**Example Data Source:**

```csharp
ViewBag.MarkerData = new[]
{
    new {
        latitude = 37.7749,
        longitude = -122.4194,
        name = "San Francisco",
        population = 883305,
        category = "Major City",
        imageUrl = "/images/markers/city-icon.png"
    },
    new {
        latitude = 34.0522,
        longitude = -118.2437,
        name = "Los Angeles",
        population = 3979576,
        category = "Major City",
        imageUrl = "/images/markers/city-icon.png"
    }
};
```

### Marker Shapes

The Maps component supports multiple built-in marker shapes:

| Shape | Description |
|-------|-------------|
| `Circle` | Default circular marker |
| `Diamond` | Diamond-shaped marker |
| `Star` | Star-shaped marker |
| `Triangle` | Triangle-shaped marker |
| `Cross` | Cross/plus sign marker |
| `HorizontalLine` | Horizontal line marker |
| `VerticalLine` | Vertical line marker |
| `Rectangle` | Rectangle marker |
| `Balloon` | Speech bubble marker |
| `Image` | Custom image marker |

**Example: Using Different Shapes**

```cshtml
@{ var data = new[]
                {
        new {latitude = 37.0000, longitude = -120.0000, city= "California"},
        new {latitude = 40.7127, longitude = -74.0059, city= "New York"},
        new {latitude = 42.000, longitude = -93.000, city= "Iowa"}
    }; }
@Html.EJS().Maps("container").Layers(new List<Syncfusion.EJ2.Maps.MapsLayer>
{
                    new Syncfusion.EJ2.Maps.MapsLayer
                    {
                        ShapeData = ViewBag.worldMap,
                        ShapeSettings = new MapsShapeSettings
                        {
                           Fill="lightgray"
                        },
                        MarkerSettings  = new List<Syncfusion.EJ2.Maps.MapsMarker>
            {
                            new Syncfusion.EJ2.Maps.MapsMarker
                            {
                                Visible = true,
                                Fill = "green",
                                DataSource = data,
                                Shape=MarkerType.Image,
                                Height= 20,
                                Width= 20,
                                ImageUrl="~/ballon.png"
                            }
                        }}}).Render()
```

### Customizing Markers

Markers can be extensively customized using various properties:

**Full Customization Example:**

```cshtml
@{
    var data = new[]
    {
        new {latitude = 37.0000, longitude = -120.0000, city= "California"},
        new {latitude = 40.7127, longitude = -74.0059, city= "New York"},
        new {latitude = 42.000, longitude = -93.000, city= "Iowa"}
    };
    var border = new MapsBorder
    {
        Color = "green",
        Width = 2,
        Opacity = 1
    };
}
@Html.EJS().Maps("container").ZoomSettings(new Syncfusion.EJ2.Maps.MapsZoomSettings
      {
          Enable = true
      }).Layers(new List<Syncfusion.EJ2.Maps.MapsLayer>
         {
                    new Syncfusion.EJ2.Maps.MapsLayer
                    {
                        ShapeSettings = new MapsShapeSettings
                        {
                            Fill = "#C1DFF5"
                        },
                        ShapeData = ViewBag.world_map,
                        MarkerSettings  = new List<Syncfusion.EJ2.Maps.MapsMarker>
                        {
                            new Syncfusion.EJ2.Maps.MapsMarker
                            {
                                Visible = true,
                                Fill = "red",
                                DataSource = data,
                                DashArray = "1",
                                Shape=MarkerType.Balloon,
                                TooltipSettings = new MapsTooltipSettings {
                                    Visible = true,
                                    ValuePath= "area",
                                },
                                Height= 20,
                                Width= 20,
                                AnimationDuration= 0,
                                AnimationDelay = 100,
                                Border = border
                            }
                        }}}).Render()
```

**Customization Properties:**

| Property | Type | Description |
|----------|------|-------------|
| `Fill` | String | Marker fill color (hex, rgb, or color name) |
| `Height` | Double | Marker height in pixels |
| `Width` | Double | Marker width in pixels |
| `Opacity` | Double | Transparency (0.0 to 1.0) |
| `Border` | Object | Border configuration (color, width) |
| `DashArray` | String | Dash pattern for border (e.g., "5,3") |
| `Offset` | Object | X/Y pixel offset from coordinate point |
| `AnimationDuration` | Double | Animation duration in milliseconds |
| `AnimationDelay` | Double | Animation delay in milliseconds |

### Marker Templates

For advanced customization, use HTML templates to create complex marker designs.

**Example: Custom HTML Marker Template**

**View:**

```cshtml
@Html.EJS().Maps("maps").Layers(l=> {
    l.ShapeData( ViewBag.world_map).MarkerSettings(new List<MapsMarker>
    {
        new MapsMarker{Visible=true, Template="#template", DataSource= new[]
    {
            new {latitude= 37.0000, longitude= -120.0000, city= "California" },
            new {latitude= 40.7127, longitude= -74.0059, city= "New York" },
            new {latitude= 42.0000, longitude= -93.0000, city= "Iowa" }
    }}
    }).Add();
}).Render()
<div id="template" style="display: none;">
    <div>
        <div style="margin-left:8px;height:45px;width:120px;margin-top:-23px;">
            <label style="color:black;margin-left:15px;font-weight:normal;">\{\{\:city\}\}</label>
        </div>
    </div>
</div>
```

**Template Variables:**
- Use `${fieldName}` to access data source fields
- Template is rendered for each marker in the data source
- Full HTML and CSS customization available

### Multiple Marker Groups

Add multiple marker groups to differentiate between different types of locations:

**View:**

```cshtml
@{
    var data = new[]
    {
        new {latitude = 37.0000, longitude = -120.0000, city= "California"},
        new {latitude = 40.7127, longitude = -74.0059, city= "New York"},
        new {latitude = 42.000, longitude = -93.000, city= "Iowa"}
    };

    var data1 = new[]
   {
        new {latitude = 19.228825, longitude =  72.854118, city= "Mumbai"},
        new {latitude = 28.610001, longitude = 77.230003, city= "Delhi"},
        new {latitude = 13.067439, longitude = 80.237617, city= "Chennai"}
    };
}
@Html.EJS().Maps("container").ZoomSettings(new Syncfusion.EJ2.Maps.MapsZoomSettings
      {
          Enable = true
      }).Layers(new List<Syncfusion.EJ2.Maps.MapsLayer>
         {
                    new Syncfusion.EJ2.Maps.MapsLayer
                    {
                        ShapeData = ViewBag.world_map,
                        MarkerSettings  = new List<Syncfusion.EJ2.Maps.MapsMarker>
                        {
                            new Syncfusion.EJ2.Maps.MapsMarker
                            {
                                Visible = true,
                                Fill = "green",
                                DataSource = data,
                                Shape=MarkerType.Diamond,
                                Height= 15,
                                Width= 15
                            },
                            new Syncfusion.EJ2.Maps.MapsMarker
                            {
                                Visible = true,
                                Fill = "green",
                                DataSource = data1,
                                Shape=MarkerType.Circle,
                                Height= 15,
                                Width= 15
                            }
                        }}}).Render()
```

### Marker Positioning

#### Using LatitudeValuePath and LongitudeValuePath

By default, markers use `latitude` and `longitude` fields from the data source. To use different field names, use `LatitudeValuePath` and `LongitudeValuePath`:

**Data Source with Custom Field Names:**

**View:**

```cshtml
@{
    var data = new[]
    {
        new {latitude = 49.95121990866204, longitude =  18.468749999999998},
        new {latitude =  59.88893689676585, longitude =  -109.3359375},
        new {latitude =  -6.64607562172573, longitude =  -55.54687499999999}
    };
}
@Html.EJS().Maps("container").Layers(new List<Syncfusion.EJ2.Maps.MapsLayer>
         {
                    new Syncfusion.EJ2.Maps.MapsLayer
                    {
                        ShapeData = ViewBag.world_map,
                        MarkerSettings  = new List<Syncfusion.EJ2.Maps.MapsMarker>
                        {
                            new Syncfusion.EJ2.Maps.MapsMarker
                            {
                                Visible = true,
                                LatitudeValuePath = "latitude",
                                LongitudeValuePath = "longitude",
                                DataSource = data
                            }
                        }}}).Render()
```

#### Marker Offset

Use `Offset` to fine-tune marker positioning relative to the coordinate point:

```cshtml
.MarkerSettings(marker =>
{
    marker.Visible(true)
        .DataSource(ViewBag.MarkerData)
        .Offset(offset => offset
            .X(0)      // No horizontal offset
            .Y(-15))   // Move marker up 15 pixels
        .Add();
})
```

**Use Cases:**
- Position labels above markers
- Align custom shapes to coordinate points
- Prevent marker overlap with other elements

### Marker Clustering

Marker clustering automatically groups nearby markers into clusters, improving map readability when displaying many markers.

**Benefits:**
- Reduces visual clutter with many markers
- Improves performance by rendering fewer elements
- Shows marker count per cluster
- Expands on zoom-in, collapses on zoom-out

**Enable Clustering:**

**View:**

```cshtml
@Html.EJS().Maps("container").ZoomSettings(new Syncfusion.EJ2.Maps.MapsZoomSettings
      {
          Enable = true
      }).Layers(new List<Syncfusion.EJ2.Maps.MapsLayer>
         {
                    new Syncfusion.EJ2.Maps.MapsLayer
                    {
                        ShapeSettings = new MapsShapeSettings
                        {
                            Fill = "#C1DFF5"
                        },
                        ShapeData = ViewBag.shape_Data,
                        MarkerClusterSettings = new MapsMarkerClusterSettings
                        {
                            AllowClustering = true,
                            Shape = MarkerType.Circle,
                            Height = 40,
                            Width = 40,
                        },
                        MarkerSettings  = new List<Syncfusion.EJ2.Maps.MapsMarker>
                        {
                            new Syncfusion.EJ2.Maps.MapsMarker
                            {
                                Visible = true,
                                DataSource = ViewBag.Cluster_data,
                                Shape=MarkerType.Circle,
                                TooltipSettings = new MapsTooltipSettings {
                                    Visible = true,
                                    ValuePath= "area",
                                },
                                Height= 20,
                                Width= 20,
                                AnimationDuration= 0,
                            }
                        }}}).Render()
```

**Cluster Configuration Properties:**

| Property | Type | Description |
|----------|------|-------------|
| `AllowClustering` | Boolean | Enable/disable clustering |
| `AllowClusterExpand` | Boolean | Allow manual cluster expansion on click |
| `Shape` | MarkerType | Cluster marker shape |
| `Fill` | String | Cluster background color |
| `Opacity` | Double | Cluster transparency |
| `Height` | Double | Cluster marker height |
| `Width` | Double | Cluster marker width |
| `LabelStyle` | Object | Styling for cluster count label |
| `Border` | Object | Cluster border configuration |
| `ConnectorLineSettings` | Object | Line connecting cluster to expanded markers |

**Advanced Clustering Configuration:**

```cshtml
.MarkerClusterSettings(cluster => cluster
    .AllowClustering(true)
    .AllowClusterExpand(true)
    .Shape(Syncfusion.EJ2.Maps.MarkerType.Image)
    .ImageUrl("/images/cluster-icon.png")
    .Height(40)
    .Width(40)
    .Offset(offset => offset.X(0).Y(-20))
    .LabelStyle(style => style
        .Color("#FFFFFF")
        .Size("12px")
        .FontWeight("bold"))
    .Border(b => b
        .Color("#FFFFFF")
        .Width(2))
    .ConnectorLineSettings(conn => conn
        .Color("#000000")
        .Width(1)
        .Opacity(0.5))
)
```

#### Per-Group Clustering

Enable clustering for specific marker groups only:

```cshtml
.MarkerSettings(marker =>
{
    // Group 1: Clustered stores
    marker.Visible(true)
        .DataSource(ViewBag.Stores)
        .ClusterSettings(cluster => cluster
            .AllowClustering(true)
            .Fill("#FF0000"))
        .Add();
    
    // Group 2: Non-clustered headquarters (always visible)
    marker.Visible(true)
        .DataSource(ViewBag.Headquarters)
        .Shape(Syncfusion.EJ2.Maps.MarkerType.Star)
        .Fill("#FFD700")
        .Height(20)
        .Width(20)
        .Add();
})
```

**Note:** When `ClusterSettings` is configured for individual marker groups, the layer-level `MarkerClusterSettings` is ignored for that group.

### Marker Drag and Drop

Allow users to reposition markers by dragging:

**Controller:**

```csharp
public ActionResult Index()
{
    ViewBag.MapData = GetWorldMap();
    ViewBag.DraggableMarkers = new[]
    {
        new { latitude = 40.7128, longitude = -74.0060, name = "Marker 1" },
        new { latitude = 51.5074, longitude = -0.1278, name = "Marker 2" }
    };
    return View();
}
```

**View:**

```cshtml
@Html.EJS().Maps("container").MarkerDragStart("onMarkerDragStart").MarkerDragEnd("onMarkerDragEnd").Layers(layer =>
    {
        layer.MarkerSettings(marker =>
        {
            marker.Visible(true)
                .EnableDrag(true)
                .TooltipSettings(tooltip => tooltip
                    .Visible(true)
                    .ValuePath("name"))
                .DataSource(ViewBag.DraggableMarkers)
                .Shape(Syncfusion.EJ2.Maps.MarkerType.Circle)
                .Height(15)
                .Width(15)
                .Fill("#FF0000")

                .Add();
        }).ShapeData(ViewBag.MapData).Add();
    }).Render()

<script>
    function onMarkerDragStart(args) {
        console.log('Drag started:', args);
        // args.dataIndex - index of dragged marker in data source
        // args.latitude - current latitude
        // args.longitude - current longitude
    }
    
    function onMarkerDragEnd(args) {
        console.log('Drag ended:', args);
        console.log('New position:', args.latitude, args.longitude);
        
        // Update data source with new position
        // Send to server if needed
    }
</script>
```

**Event Properties:**

| Property | Description |
|----------|-------------|
| `dataIndex` | Index of the marker in data source |
| `latitude` | Latitude coordinate of marker |
| `longitude` | Longitude coordinate of marker |
| `markerIndex` | Index of marker settings group |
| `layerIndex` | Index of layer containing marker |
| `x` | Mouse X position on map |
| `y` | Mouse Y position on map |

### Marker Tooltips

Display additional information when hovering over markers:

**Basic Tooltip:**

```cshtml
.MarkerSettings(marker =>
{
    marker.Visible(true)
        .TooltipSettings(tooltip => tooltip
            .Visible(true)
            .ValuePath("name"))       // Show 'name' field in tooltip
        .DataSource(ViewBag.MarkerData).Add();
})
```

**Custom Tooltip Template:**

```cshtml
.MarkerSettings(marker =>
{
    marker.Visible(true)
        .TooltipSettings(tooltip => tooltip
            .Visible(true)
            .Template("<div class='custom-tooltip'>" +
                     "<strong>${name}</strong><br/>" +
                     "Population: ${population:N0}<br/>" +
                     "Category: ${category}" +
                     "</div>"))
        .DataSource(ViewBag.MarkerData).Add();
})

<style>
    .custom-tooltip {
        background: #333;
        color: white;
        padding: 10px;
        border-radius: 5px;
        font-family: Arial, sans-serif;
    }
    .custom-tooltip strong {
        font-size: 14px;
        color: #FFD700;
    }
</style>
```

### Using Image Markers

**Method 1: Fixed Image for All Markers**

```cshtml
.MarkerSettings(marker =>
{
    marker.Visible(true)
        .DataSource(ViewBag.MarkerData)
        .Shape(Syncfusion.EJ2.Maps.MarkerType.Image)
        .ImageUrl("/images/pin-red.png")      // Same image for all
        .Height(30)
        .Width(30)
        .Add();
})
```

**Method 2: Different Images from Data Source**

**Controller:**

```csharp
ViewBag.LocationsWithImages = new[]
{
    new {
        latitude = 40.7128,
        longitude = -74.0060,
        name = "Office",
        icon = "/images/office-icon.png"
    },
    new {
        latitude = 51.5074,
        longitude = -0.1278,
        name = "Warehouse",
        icon = "/images/warehouse-icon.png"
    }
};
```

**View:**

```cshtml
.MarkerSettings(marker =>
{
    marker.Visible(true)
        .DataSource(ViewBag.LocationsWithImages)
        .Shape(Syncfusion.EJ2.Maps.MarkerType.Image)
        .ImageUrlValuePath("icon")            // Field containing image path
        .Height(30)
        .Width(30)
        .Add();
})
```

### Dynamic Marker Styling from Data

Customize marker appearance based on data values:

**Controller:**

```csharp
ViewBag.DynamicMarkers = new[]
{
    new { latitude = 40.7128, longitude = -74.0060, name = "NYC", 
          markerShape = "Circle", markerColor = "#FF0000" },
    new { latitude = 51.5074, longitude = -0.1278, name = "London", 
          markerShape = "Diamond", markerColor = "#0000FF" },
    new { latitude = 35.6762, longitude = 139.6503, name = "Tokyo", 
          markerShape = "Star", markerColor = "#00FF00" }
};
```

**View:**

```cshtml
.MarkerSettings(marker =>
{
    marker.Visible(true)
        .DataSource(ViewBag.DynamicMarkers)
        .ShapeValuePath("markerShape")        // Shape from data
        .ColorValuePath("markerColor")        // Color from data
        .Height(15)
        .Width(15)
        .Add();
})
```

## Bubbles

### Adding Bubbles

Bubbles represent quantitative data with size-proportional circles at geographical locations.

**Basic Bubble Implementation:**

**Controller:**

```csharp
public ActionResult Index()
{
    ViewBag.MapData = GetWorldMap();
    ViewBag.PopulationData = new[]
    {
        new { name = "United States", population = 331002651 },
        new { name = "India", population = 1380004385 },
        new { name = "China", population = 1439323776 },
        new { name = "Indonesia", population = 273523615 }
    };
    return View();
}
```

**View:**

```cshtml
@Html.EJS().Maps("container").Layers(layer =>
{
    layer.BubbleSettings(bubble =>
{
    bubble.Visible(true)
        .DataSource(ViewBag.PopulationData)
        .ValuePath("population")      // Field for bubble sizing
        .MinRadius(5)                 // Minimum bubble size
        .MaxRadius(40)                // Maximum bubble size
        .Fill("#FF6347")
        .Opacity(0.7)
        .Add();
}).ShapeData(ViewBag.MapData)
        .ShapePropertyPath(new[] { "name" })
        .ShapeDataPath("name")
        .Add();
}).Render()
```

**How It Works:**
1. Bubbles are rendered on shapes that match data source records
2. Bubble size is calculated from `ValuePath` field
3. Size is normalized between `MinRadius` and `MaxRadius`
4. Bubbles appear at the centroid of each matched shape

### Bubble Shapes

Bubbles support two shape types:

| Shape | Use Case |
|-------|----------|
| `Circle` | Default, best for most visualizations |
| `Square` | Alternative style, useful for certain designs |

**Example:**

```cshtml
.BubbleSettings(bubble =>
{
    bubble.Visible(true)
        .DataSource(ViewBag.PopulationData)
        .ValuePath("population")
        .BubbleType(Syncfusion.EJ2.Maps.BubbleType.Square)  // Square bubbles
        .MinRadius(10)
        .MaxRadius(50)
        .Fill("#4169E1")
        .Add();
})
```

### Customizing Bubbles

**Full Customization Example:**

```cshtml
.BubbleSettings(bubble =>
{
    bubble.Visible(true)
        .DataSource(ViewBag.PopulationData)
        .ValuePath("population")
        .MinRadius(5)
        .MaxRadius(50)
        .Fill("#FF6347")                    // Tomato red
        .Opacity(0.6)                       // Semi-transparent
        .Border(b => b
            .Color("#8B0000")               // Dark red border
            .Width(2))
        .AnimationDuration(1500)            // 1.5 second animation
        .AnimationDelay(0)
        .Add();
})
```

**Customization Properties:**

| Property | Type | Description |
|----------|------|-------------|
| `Fill` | String | Bubble fill color |
| `Opacity` | Double | Transparency (0.0 to 1.0) |
| `Border` | Object | Border color and width |
| `MinRadius` | Double | Minimum bubble radius in pixels |
| `MaxRadius` | Double | Maximum bubble radius in pixels |
| `AnimationDuration` | Double | Animation time in milliseconds |
| `AnimationDelay` | Double | Animation delay in milliseconds |

### Bubble Size Configuration

The `ValuePath`, `MinRadius`, and `MaxRadius` properties work together to control bubble sizing:

**Size Calculation:**
1. Maps finds min and max values from `ValuePath` field in data source
2. Normalizes each value to a scale between `MinRadius` and `MaxRadius`
3. Renders bubble with calculated radius

**Example with Explicit Control:**

```csharp
ViewBag.SalesData = new[]
{
    new { region = "North", sales = 50000 },      // Will be smallest
    new { region = "South", sales = 120000 },     // Medium
    new { region = "East", sales = 200000 },      // Largest
    new { region = "West", sales = 85000 }        // Medium-small
};
```

```cshtml
.BubbleSettings(bubble =>
{
    bubble.Visible(true)
        .DataSource(ViewBag.SalesData)
        .ValuePath("sales")
        .MinRadius(10)              // Smallest bubble = 10px
        .MaxRadius(60)              // Largest bubble = 60px
        .Fill("#32CD32")
        .Add();
})
```

**Result:**
- North (50k): ~10px radius
- West (85k): ~28px radius
- South (120k): ~42px radius
- East (200k): ~60px radius

### Multiple Bubble Groups

Display multiple datasets with different bubble groups:

**Controller:**

```csharp
public ActionResult Index()
{
    ViewBag.MapData = GetWorldMap();
    
    // Dataset 1: Population
    ViewBag.PopulationData = new[]
    {
        new { name = "United States", value = 331 },
        new { name = "India", value = 1380 }
    };
    
    // Dataset 2: GDP
    ViewBag.GDPData = new[]
    {
        new { name = "United States", value = 21427 },
        new { name = "India", value = 2875 }
    };
    
    return View();
}
```

**View:**

```cshtml
@Html.EJS().Maps("container").Layers(layer =>
{
    layer.BubbleSettings(bubble =>
{
    // Bubble Group 1: Population (Red)
    bubble.Visible(true)
    .TooltipSettings(tooltip => tooltip
        .Visible(true)
        .ValuePath("name")
        .Template("Population: ${value}M"))
        .DataSource(ViewBag.PopulationData)
        .ValuePath("value")
        .MinRadius(5)
        .MaxRadius(30)
        .Fill("#FF0000")
        .Opacity(0.6)
        .Add();

    // Bubble Group 2: GDP (Blue)
    bubble.Visible(true)
    .TooltipSettings(tooltip => tooltip
        .Visible(true)
        .ValuePath("name")
        .Template("GDP: $${value}B"))
        .DataSource(ViewBag.GDPData)
        .ValuePath("value")
        .MinRadius(5)
        .MaxRadius(30)
        .Fill("#0000FF")
        .Opacity(0.6)
        .Add();
})
    .ShapeData(ViewBag.MapData)
        .ShapePropertyPath(new[] { "name" })
        .ShapeDataPath("name")
        
        .Add();
}).Render()
```

### Bubble Tooltips

**Simple Tooltip:**

```cshtml
.BubbleSettings(bubble =>
{
    bubble.Visible(true)
        .DataSource(ViewBag.PopulationData)
        .ValuePath("population")
        .TooltipSettings(tooltip => tooltip
            .Visible(true)
            .ValuePath("name"))       // Show country name
        .Add();
})
```

**Advanced Tooltip with Template:**

```cshtml
.BubbleSettings(bubble =>
{
    bubble.Visible(true)
        .DataSource(ViewBag.PopulationData)
        .ValuePath("population")
        .TooltipSettings(tooltip => tooltip
            .Visible(true)
            .Template("<div class='bubble-tooltip'>" +
                     "<div class='tooltip-header'>${name}</div>" +
                     "<div class='tooltip-body'>" +
                     "<div>Population: ${population:N0}</div>" +
                     "<div>Density: ${density} per km²</div>" +
                     "<div>Growth: ${growth}%</div>" +
                     "</div>" +
                     "</div>"))
        .Add();
})

<style>
    .bubble-tooltip {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 12px;
        border-radius: 8px;
        min-width: 180px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    }
    .tooltip-header {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 8px;
        border-bottom: 1px solid rgba(255,255,255,0.3);
        padding-bottom: 6px;
    }
    .tooltip-body div {
        margin: 4px 0;
        font-size: 13px;
    }
</style>
```

### Dynamic Bubble Colors from Data

Set individual bubble colors from data source:

**Controller:**

```csharp
ViewBag.RegionData = new[]
{
    new { name = "North America", value = 579, color = "#FF6347" },
    new { name = "South America", value = 422, color = "#4169E1" },
    new { name = "Europe", value = 747, color = "#32CD32" },
    new { name = "Asia", value = 4641, color = "#FFD700" }
};
```

**View:**

```cshtml
.BubbleSettings(bubble =>
{
    bubble.Visible(true)
        .DataSource(ViewBag.RegionData)
        .ValuePath("value")
        .ColorValuePath("color")        // Use color field from data
        .MinRadius(10)
        .MaxRadius(50)
        .Add();
})
```

## Best Practices

### Markers Best Practices

1. **Use Appropriate Shapes** - Match marker shapes to data categories (circles for cities, stars for capitals)
2. **Limit Marker Count** - Use clustering for datasets with 50+ markers
3. **Consistent Sizing** - Keep marker sizes consistent within groups
4. **Meaningful Colors** - Use color to convey information (red for alerts, green for success)
5. **Provide Tooltips** - Always add tooltips for markers to show details
6. **Offset for Labels** - Use offset when adding text labels near markers
7. **Image Optimization** - Compress marker images to improve performance
8. **Accessibility** - Ensure color contrast meets WCAG standards

### Bubbles Best Practices

1. **Appropriate Value Range** - Choose MinRadius and MaxRadius that show differences clearly
2. **Transparent Bubbles** - Use opacity 0.5-0.8 to see underlying map shapes
3. **Avoid Overcrowding** - Don't show bubbles for too many shapes simultaneously
4. **Color Coding** - Use color to represent categories or thresholds
5. **Add Legends** - Include bubble legend to explain size meaning
6. **Normalize Data** - Ensure data values are in appropriate range for sizing
7. **Provide Context** - Use tooltips to show exact values
8. **Test Extremes** - Verify appearance with very small and very large values

### Performance Optimization

**For Large Marker Datasets:**

```cshtml
@* Enable clustering for 50+ markers *@
.MarkerClusterSettings(cluster => cluster.AllowClustering(true))

@* Use simpler shapes *@
.Shape(Syncfusion.EJ2.Maps.MarkerType.Circle)  // Faster than complex shapes

@* Limit initial markers, load more on zoom *@
```

**For Multiple Groups:**

```cshtml
@* Limit to 3-4 marker/bubble groups maximum *@
@* Too many groups can confuse users and slow rendering *@
```

## Common Issues

### Issue 1: Markers Not Appearing

**Symptoms:** Map renders but markers are invisible

**Checklist:**

```cshtml
@* 1. Check Visible is true *@
.Visible(true)

@* 2. Verify data source is not null *@
@if (ViewBag.MarkerData != null)

@* 3. Check latitude/longitude field names *@
@* Default expects: latitude and longitude (case-insensitive) *@
@* Or use: *@
.LatitudeValuePath("lat")
.LongitudeValuePath("lng")

@* 4. Verify coordinates are valid *@
@* Latitude: -90 to 90 *@
@* Longitude: -180 to 180 *@

@* 5. Check Height and Width are set *@
.Height(10)
.Width(10)
```

### Issue 2: Bubbles All Same Size

**Symptoms:** All bubbles render with identical sizes

**Causes:**

1. **ValuePath incorrect or missing**
   ```cshtml
   .ValuePath("population")  // Must match data source field
   ```

2. **All data values are the same**
   ```csharp
   // Check data has variation
   ViewBag.Data = new[] {
       new { name = "A", value = 100 },  // Different values needed
       new { name = "B", value = 200 },
       new { name = "C", value = 300 }
   };
   ```

3. **MinRadius equals MaxRadius**
   ```cshtml
   .MinRadius(5)
   .MaxRadius(50)  // Must be different
   ```

### Issue 3: Clustering Not Working

**Symptoms:** All markers visible even when overlapping

**Solutions:**

```cshtml
@* 1. Enable clustering at layer level *@
.MarkerClusterSettings(cluster => cluster
    .AllowClustering(true))

@* 2. Ensure sufficient markers (needs 2+ overlapping) *@

@* 3. Check if per-group clustering overrides layer clustering *@
.MarkerSettings(marker =>
{
    marker.ClusterSettings(cluster => cluster.AllowClustering(true))
        .Add();
})

@* 4. Verify marker positions actually overlap *@
@* Zoom in to check if markers are truly close together *@
```

### Issue 4: Template Not Rendering

**Symptoms:** Template shows as plain text or doesn't appear

**Solutions:**

```cshtml
@* 1. Use proper template syntax *@
.Template("<div>${fieldName}</div>")  // ✅ Correct

@* 2. Escape quotes properly *@
.Template("<div class=\"wrapper\">${name}</div>")

@* 3. Check field names match data source *@
@* If data has 'City', use ${City}, not ${city} (case-sensitive) *@

@* 4. Verify HTML is valid *@
.Template("<div><strong>${name}</strong></div>")  // Valid HTML
```

### Issue 5: Marker Drag Not Working

**Symptoms:** Markers don't move when dragged

**Solutions:**

```cshtml
@* 1. Enable drag property *@
.EnableDrag(true)

@* 2. Ensure zoom is enabled (drag requires zoom) *@
@Html.EJS().Maps("container")
    .ZoomSettings(zoom => zoom.Enable(true))

@* 3. Check browser supports drag events *@
@* 4. Verify no CSS is preventing pointer events *@
```

### Issue 6: Bubbles Overlapping Markers

**Symptoms:** Bubbles render on top of markers, hiding them

**Solutions:**

```cshtml
@* Solution 1: Reorder - add bubbles before markers *@
.BubbleSettings(bubble => { /* bubble config */ })
.MarkerSettings(marker => { /* marker config */ })

@* Solution 2: Adjust bubble opacity *@
.BubbleSettings(bubble =>
{
    bubble.Opacity(0.4)  // More transparent
        .Add();
})

@* Solution 3: Use different layers *@
@* Put bubbles on sublayer *@
```

## Summary

This reference covered:

- ✅ Adding and configuring markers with data sources
- ✅ All marker shapes and customization options
- ✅ Marker templates for custom HTML designs
- ✅ Multiple marker groups with different styles
- ✅ Marker positioning with value paths and offsets
- ✅ Marker clustering for large datasets
- ✅ Marker drag and drop functionality
- ✅ Adding and configuring bubbles for quantitative data
- ✅ Bubble size calculation and range configuration
- ✅ Multiple bubble groups for multi-dataset visualization
- ✅ Tooltips for both markers and bubbles
- ✅ Best practices and performance optimization
- ✅ Common issues and troubleshooting

**Next Steps:**
- Learn about color mapping for choropleth visualizations
- Explore legends and overlays for enhanced data presentation
- Implement user interactions like zoom and selection

---

**Example Code Repository:** Check `utils/code-snippet/markers/` and `utils/code-snippet/bubble/` for complete working examples.
