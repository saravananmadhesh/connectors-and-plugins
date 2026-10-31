# Map Providers in Syncfusion Maps

## Table of Contents
- [Overview](#overview)
- [OpenStreetMap (OSM)](#openstreetmap-osm)
  - [Basic OSM Implementation](#basic-osm-implementation)
  - [OSM Tile Servers](#osm-tile-servers)
  - [OSM with Zoom and Pan](#osm-with-zoom-and-pan)
  - [OSM with Center Position](#osm-with-center-position)
  - [OSM with Markers](#osm-with-markers)
  - [OSM with GeoJSON Sublayer](#osm-with-geojson-sublayer)
- [Bing Maps](#bing-maps)
  - [Getting Bing Maps API Key](#getting-bing-maps-api-key)
  - [Basic Bing Maps Setup](#basic-bing-maps-setup)
  - [Bing Map Types](#bing-map-types)
  - [Bing Maps with Zoom](#bing-maps-with-zoom)
  - [Bing Maps with Markers and Navigation Lines](#bing-maps-with-markers-and-navigation-lines)
  - [Bing Maps with GeoJSON Sublayer](#bing-maps-with-geojson-sublayer)
- [Azure Maps](#azure-maps)
  - [Getting Azure Maps Subscription Key](#getting-azure-maps-subscription-key)
  - [Basic Azure Maps Setup](#basic-azure-maps-setup)
  - [Azure Map Styles](#azure-map-styles)
  - [Azure Maps with Zoom](#azure-maps-with-zoom)
  - [Azure Maps with Markers](#azure-maps-with-markers)
  - [Azure Maps with Navigation Lines](#azure-maps-with-navigation-lines)
- [Other Map Providers](#other-map-providers)
  - [Generic Tile URL Template](#generic-tile-url-template)
  - [TomTom Maps](#tomtom-maps)
  - [Google Maps (Static Tiles)](#google-maps-static-tiles)
  - [Mapbox](#mapbox)
  - [Stamen Maps (Free)](#stamen-maps-free)
- [Common Features](#common-features)
  - [Features Available for All Providers](#features-available-for-all-providers)
  - [Legend with Map Providers](#legend-with-map-providers)
- [Best Practices](#best-practices)
  - [API Key Management](#api-key-management)
  - [Performance Optimization](#performance-optimization)
  - [Provider Selection Guide](#provider-selection-guide)
  - [Accessibility](#accessibility)
- [Common Issues](#common-issues)
  - [Issue 1: Tiles Not Loading](#issue-1-tiles-not-loading)
  - [Issue 2: Bing Maps Showing Errors](#issue-2-bing-maps-showing-errors)
  - [Issue 3: Azure Maps Not Displaying](#issue-3-azure-maps-not-displaying)
  - [Issue 4: Markers Not Appearing](#issue-4-markers-not-appearing)
  - [Issue 5: Slow Tile Loading](#issue-5-slow-tile-loading)
  - [Issue 6: CORS Errors in Console](#issue-6-cors-errors-in-console)
- [Summary](#summary)

## Overview

Map providers deliver tile-based imagery for rendering online maps. Syncfusion Maps supports:

- **OpenStreetMap (OSM)** - Free, community-built maps (no API key required)
- **Bing Maps** - Microsoft's mapping service (requires API key)
- **Azure Maps** - Microsoft's cloud-based maps (requires subscription key)
- **Other Providers** - TomTom, Google Maps, Mapbox, etc. (requires API key)

All providers use the **UrlTemplate** property with tile server URLs.

## OpenStreetMap (OSM)

### Basic OSM Implementation

OSM is free and requires no API key:

```cshtml
@using Syncfusion.EJ2.Maps

@Html.EJS().Maps("container").Layers(layer =>
    {
        layer.UrlTemplate("https://tile.openstreetmap.org/${z}/${x}/${y}.png")
            .Add();
    }).Render()
```

**Controller (not required for OSM):**

```csharp
public class HomeController : Controller
{
    public IActionResult Index()
    {
        return View();
    }
}
```

### OSM Tile Servers

Choose different OSM tile servers for varied map styles:

| Server | URL Template | Style |
|--------|-------------|-------|
| **Standard** | `https://tile.openstreetmap.org/${z}/${x}/${y}.png` | Default road map |
| **HOT** | `https://a.tile.openstreetmap.fr/hot/${z}/${x}/${y}.png` | Humanitarian style |
| **Topo** | `https://a.tile.opentopomap.org/${z}/${x}/${y}.png` | Topographic details |
| **Cycle** | `https://a.tile-cyclosm.openstreetmap.fr/cyclosm/${z}/${x}/${y}.png` | Cycling routes |

```cshtml
@* Use topographic style *@
.UrlTemplate("https://a.tile.opentopomap.org/${z}/${x}/${y}.png")
```

### OSM with Zoom and Pan

```cshtml
@Html.EJS().Maps("container").ZoomSettings(zoom => zoom
        .Enable(true)
        .EnablePanning(true)
        .MouseWheelZoom(true)
        .PinchZooming(true)
        .DoubleClickZoom(true)).Layers(layer =>
    {
        layer.UrlTemplate("https://tile.openstreetmap.org/${z}/${x}/${y}.png")
            .Add();
    }).Render()
```

### OSM with Center Position

Focus on a specific location:

```cshtml
@Html.EJS().Maps("container").CenterPosition(center => center
        .Latitude(51.5074)           // London
        .Longitude(-0.1278)).ZoomSettings(zoom => zoom
        .Enable(true)
        .ZoomFactor(5)).Layers(layer =>
    {
        layer.UrlTemplate("https://tile.openstreetmap.org/${z}/${x}/${y}.png")
            .Add();
    }).Render()
```

### OSM with Markers

```cshtml
@Html.EJS().Maps("container").Layers(layer =>
{
    layer.UrlTemplate("https://tile.openstreetmap.org/${z}/${x}/${y}.png")
        .MarkerSettings(marker =>
        {
            marker.TooltipSettings(tooltip => tooltip
              .Visible(true)
              .ValuePath("name"))
                .Visible(true)
                .Height(25)
                .Width(25)
                .DataSource(ViewBag.MarkerData)
                .Add();
        })
        .Add();
}).ZoomSettings(zoom => zoom.Enable(true)).Render()
```

**Controller:**

```csharp
public IActionResult Index()
{
    ViewBag.MarkerData = new[]
    {
        new { latitude = 40.7128, longitude = -74.0060, name = "New York" },
        new { latitude = 34.0522, longitude = -118.2437, name = "Los Angeles" },
        new { latitude = 51.5074, longitude = -0.1278, name = "London" }
    };
    return View();
}
```

### OSM with GeoJSON Sublayer

Overlay GeoJSON shapes on OSM tiles:

```cshtml
@Html.EJS().Maps("container").Layers(layer =>
    {
        // Base OSM layer
        layer.UrlTemplate("https://tile.openstreetmap.org/${z}/${x}/${y}.png")
            .Add();

        // GeoJSON sublayer
        layer
            .ShapeSettings(shape => shape
                .Fill("rgba(141, 206, 255, 0.5)")
                .Border(b => b
                    .Color("#3497DB")
                    .Width(2)))
            .Type(Syncfusion.EJ2.Maps.Type.SubLayer)
            .ShapeData(ViewBag.AfricaMap)
            .Add();
    }).ZoomSettings(zoom => zoom.Enable(true)).Render()
```

**Controller:**

```csharp
public IActionResult Index()
{
    ViewBag.AfricaMap = GetAfricaGeoJSON();  // Your GeoJSON data
    return View();
}
```

## Bing Maps

### Getting Bing Maps API Key

1. Visit [Bing Maps Portal](https://www.microsoft.com/en-us/maps/create-a-bing-maps-key)
2. Sign in with Microsoft account
3. Create a new key (select "Basic" or "Enterprise")
4. Copy the generated key

### Basic Bing Maps Setup

Bing Maps requires the `GetBingUrlTemplate` method:

```cshtml
<div class="control-section">
    <div id="outer" style="width:100%">
        @Html.EJS().Maps("container").Load("mapsLoad").Layers(l =>
        {
            l.Add();
        }).Render()
    </div>
</div>
<style>
    #container {
        display: block;
    }
</style>

<script type="text/javascript">
    function mapsLoad(args) {
        args.maps.getBingUrlTemplate("https://dev.virtualearth.net/REST/V1/Imagery/Metadata/CanvasLight?output=json&uriScheme=https&key=?").then(function (url) {
            args.maps.layers[0].urlTemplate = url;
        });
    }
</script>
```

### Bing Map Types

Bing offers 6 map styles:

| Type | Description | Use Case |
|------|-------------|----------|
| `Aerial` | Satellite imagery | High-detail terrain view |
| `AerialWithLabel` | Satellite + labels | Satellite with place names |
| `Road` | Street maps (default) | Navigation, street-level detail |
| `CanvasDark` | Dark theme roads | Dark mode applications |
| `CanvasLight` | Light theme roads | Clean, minimal design |
| `CanvasGray` | Grayscale roads | Print-friendly, subtle background |

```cshtml
@* Dark theme example *@
@using Syncfusion.EJ2;
<div class="control-section">
    <div id="outer" style="width:100%">
        @Html.EJS().Maps("container").Load("mapsLoad").Layers(l =>
        {
            l.Add();
        }).Render()
    </div>
</div>
<style>
    #container {
        display: block;
    }
</style>

<script type="text/javascript">
    function mapsLoad(args) {
        args.maps.getBingUrlTemplate("https://dev.virtualearth.net/REST/V1/Imagery/Metadata/CanvasLight?output=json&uriScheme=https&key=?").then(function (url) {
            args.maps.layers[0].urlTemplate = url;
        });
    }
</script>
```

### Bing Maps with Zoom

```cshtml
@using Syncfusion.EJ2;
@Html.EJS().Maps("maps").Load("mapsLoad").ZoomSettings(zoom=>zoom.Enable(true)).Layers(l=> {
    l.Add();
}).Render()

<script type="text/javascript">
    function mapsLoad(args) {
        args.maps.getBingUrlTemplate("https://dev.virtualearth.net/REST/V1/Imagery/Metadata/CanvasLight?output=json&uriScheme=https&key=?").then(function (url) {
            args.maps.layers[0].urlTemplate = url;
        });
    }
</script>
```

### Bing Maps with Markers and Navigation Lines

```cshtml
@using Syncfusion.EJ2;
@using Syncfusion.EJ2.Maps;

@Html.EJS().Maps("maps").Load("mapsLoad").Layers(l =>
{
    l.MarkerSettings(marker =>
       {
           marker.Visible(true).DataSource(ViewBag.markerData).Add();
       }).NavigationLineSettings(ns =>
    {
        ns.Visible(true).Latitude(new double[] { 34.060620, 40.724546 })
        .Longitude(new double[] { -118.330491, -73.850344 }).Color("black").Angle(90)
        .Width(2).DashArray("4").Add();
    }).Add();
}).Render()

<script type="text/javascript">
    function mapsLoad(args) {
        args.maps.getBingUrlTemplate("https://dev.virtualearth.net/REST/V1/Imagery/Metadata/CanvasLight?output=json&uriScheme=https&key=?").then(function (url) {
            args.maps.layers[0].urlTemplate = url;
        });
    }
</script>
```

**Controller:**

```csharp
public IActionResult Index()
{
    ViewBag.Cities = new[]
    {
        new { latitude = 37.7749, longitude = -122.4194, name = "San Francisco" },
        new { latitude = 34.0522, longitude = -118.2437, name = "Los Angeles" }
    };
    return View();
}
```

### Bing Maps with GeoJSON Sublayer

```cshtml
@using Syncfusion.EJ2;
@using Syncfusion.EJ2.Maps;

@Html.EJS().Maps("maps").Load("mapsLoad").Layers(l =>
{
    l.Add();
    l.ShapeSettings(s => s.Fill("blue")).ShapeData(ViewBag.africaShape).Type(Syncfusion.EJ2.Maps.Type.SubLayer).Add();
}).Render()

<script type="text/javascript">
    function mapsLoad(args) {
        args.maps.getBingUrlTemplate("https://dev.virtualearth.net/REST/V1/Imagery/Metadata/Aerial?output=json&uriScheme=https&key=?").then(function (url) {
            args.maps.layers[0].urlTemplate = url;
        });
    }
</script>
```

## Azure Maps

### Getting Azure Maps Subscription Key

1. Visit [Azure Portal](https://portal.azure.com/)
2. Create an "Azure Maps Account" resource
3. Navigate to **Authentication** → **Shared Key Authentication**
4. Copy the **Primary Key**

**Licensing:** See [Azure Maps Pricing](https://azure.microsoft.com/en-in/pricing/details/azure-maps/)

### Basic Azure Maps Setup

```cshtml
@Html.EJS().Maps("container").Layers(layer =>
    {
        layer.UrlTemplate("https://atlas.microsoft.com/map/tile?api-version=2.0" +
                         "&tilesetId=microsoft.base.road" +
                         "&zoom=${z}&x=${x}&y=${y}" +
                         "&subscription-key=YOUR_AZURE_SUBSCRIPTION_KEY")
            .Add();
    }).Render()
```

### Azure Map Styles

Change `tilesetId` parameter for different styles:

| Style | tilesetId | Description |
|-------|-----------|-------------|
| **Road** | `microsoft.base.road` | Default road map |
| **Imagery** | `microsoft.imagery` | Satellite imagery |
| **Hybrid** | `microsoft.base.hybrid.road` | Satellite + labels |
| **Night** | `microsoft.base.darkgrey` | Dark theme |
| **Terrain** | `microsoft.base.terrain` | Topographic relief |

```cshtml
@* Satellite imagery with labels *@
.UrlTemplate("https://atlas.microsoft.com/map/tile?api-version=2.0" +
             "&tilesetId=microsoft.base.hybrid.road" +
             "&zoom=${z}&x=${x}&y=${y}" +
             "&subscription-key=YOUR_AZURE_KEY")
```

### Azure Maps with Zoom

```cshtml
@Html.EJS().Maps("container").ZoomSettings(zoom => zoom
        .Enable(true)
        .EnablePanning(true)
        .ZoomFactor(5)
        .MinZoom(1)
        .MaxZoom(19)).CenterPosition(center => center
        .Latitude(48.8566)           // Paris
        .Longitude(2.3522)).Layers(layer =>
    {
        layer.UrlTemplate("https://atlas.microsoft.com/map/tile?api-version=2.0" +
                         "&tilesetId=microsoft.base.road" +
                         "&zoom=${z}&x=${x}&y=${y}" +
                         "&subscription-key=YOUR_AZURE_KEY")
            .Add();
    }).Render()
```

### Azure Maps with Markers

```cshtml
@Html.EJS().Maps("container").Layers(layer =>
    {
        layer.UrlTemplate("https://atlas.microsoft.com/map/tile?api-version=2.0" +
                         "&tilesetId=microsoft.imagery" +
                         "&zoom=${z}&x=${x}&y=${y}" +
                         "&subscription-key=YOUR_AZURE_KEY")
            .MarkerSettings(marker =>
            {
                marker
                .TooltipSettings(tooltip => tooltip
                    .Visible(true)
                    .ValuePath("city"))
                .Visible(true)
                    .DataSource(ViewBag.Locations)
                    .Shape(Syncfusion.EJ2.Maps.MarkerType.Image)
                    .ImageUrl("/images/marker-icon.png")
                    .Height(30)
                    .Width(30)
                    .Add();
            })
            .Add();
    }).ZoomSettings(zoom => zoom.Enable(true)).Render()
```

### Azure Maps with Navigation Lines

```cshtml
@Html.EJS().Maps("container").Layers(layer =>
    {
        layer.UrlTemplate("https://atlas.microsoft.com/map/tile?api-version=2.0" +
                         "&tilesetId=microsoft.base.darkgrey" +
                         "&zoom=${z}&x=${x}&y=${y}" +
                         "&subscription-key=YOUR_AZURE_KEY")
            .NavigationLineSettings(nav =>
            {
                nav.Visible(true)
                    .Latitude(new double[] { 40.7128, 51.5074 })
                    .Longitude(new double[] { -74.0060, -0.1278 })
                    .Color("#00FF00")
                    .Width(2)
                    .Angle(-0.2)
                    .DashArray("5,5")
                    .Add();
            })
            .Add();
    }).ZoomSettings(zoom => zoom.Enable(true)).Render()
```

## Other Map Providers

### Generic Tile URL Template

Any map provider following this pattern can be integrated:

```
https://<domain>/<path>/{z}/{x}/{y}.<extension>
```

Where:
- `{z}` = Zoom level (1-20)
- `{x}` = Tile X coordinate
- `{y}` = Tile Y coordinate

### TomTom Maps

1. Get API key from [TomTom Developer Portal](https://developer.tomtom.com/)
2. Use in UrlTemplate:

```cshtml
@Html.EJS().Maps("container")
    .Layers(layer =>
    {
        layer.UrlTemplate("https://api.tomtom.com/map/1/tile/basic/main/${z}/${x}/${y}.png?key=YOUR_TOMTOM_API_KEY")
            .Add();
    })
    .ZoomSettings(zoom => zoom.Enable(true))
    .Render()
```

### Google Maps (Static Tiles)

```cshtml
@Html.EJS().Maps("container").Layers(layer =>
    {
        layer.UrlTemplate("https://mt1.google.com/vt/lyrs=m&x=${x}&y=${y}&z=${z}")
            .Add();
    }).Render()
```

**Google Map Types:**
- `lyrs=m` - Standard roadmap
- `lyrs=s` - Satellite
- `lyrs=y` - Hybrid (satellite + labels)
- `lyrs=t` - Terrain
- `lyrs=p` - Terrain with labels

### Mapbox

1. Get token from [Mapbox](https://www.mapbox.com/)
2. Configure:

```cshtml
@Html.EJS().Maps("container").Layers(layer =>
    {
        layer.UrlTemplate("https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/${z}/${x}/${y}?access_token=YOUR_MAPBOX_TOKEN")
            .Add();
    }).Render()
```

**Mapbox Styles:**
- `streets-v11` - Standard streets
- `satellite-v9` - Satellite imagery
- `satellite-streets-v11` - Satellite + labels
- `light-v10` - Light theme
- `dark-v10` - Dark theme

### Stamen Maps (Free)

```cshtml
@Html.EJS().Maps("container").Layers(layer =>
    {
        layer.UrlTemplate("https://stamen-tiles.a.ssl.fastly.net/terrain/${z}/${x}/${y}.jpg")
            .Add();
    }).Render()
```

**Stamen Styles:**
- `terrain` - Terrain map
- `toner` - High contrast B&W
- `watercolor` - Artistic watercolor style

## Common Features

### Features Available for All Providers

```cshtml
@Html.EJS().Maps("container").ZoomSettings(zoom => zoom
        .Enable(true)
        .EnablePanning(true)
        .ZoomFactor(3)
        .MinZoom(1)
        .MaxZoom(15)).CenterPosition(center => center
        .Latitude(20.5937)
        .Longitude(78.9629)).Layers(layer =>
    {
        layer.UrlTemplate("YOUR_PROVIDER_URL")
            // Markers
            .MarkerSettings(marker =>
            {
                marker.Visible(true)
                    .DataSource(ViewBag.Markers)
                    .Add();
            })
            // Navigation lines
            .NavigationLineSettings(nav =>
            {
                nav.Visible(true)
                    .Latitude(new double[] { 28.6139, 19.0760 })
                    .Longitude(new double[] { 77.2090, 72.8777 })
                    .Add();
            })
            // Tooltips
            .TooltipSettings(tooltip => tooltip
                .Visible(true)
                .ValuePath("name"))
            .Add();

        // Add GeoJSON sublayer
        layer
        .ShapeSettings(shape => shape
             .Fill("rgba(255,0,0,0.3)"))
        .Type(Syncfusion.EJ2.Maps.Type.SubLayer)
            .ShapeData(ViewBag.GeoJSON)
            .Add();
    }).Render()
```

### Legend with Map Providers

```cshtml
@Html.EJS().Maps("container").LegendSettings(legend => legend
        .Visible(true)
        .Position(Syncfusion.EJ2.Maps.LegendPosition.Bottom)).Layers(layer =>
    {
        layer.UrlTemplate("https://tile.openstreetmap.org/${z}/${x}/${y}.png")
            .Add();

        layer
        .ShapeSettings(shape => shape
            .ColorValuePath("Population")
            .ColorMapping(cm =>
            {
                cm.From(0).To(100000).Color("#C8EEFF").Label("< 100K").Add();
                cm.From(100000).To(1000000).Color("#7BC1E8").Label("100K - 1M").Add();
                cm.From(1000000).To(10000000).Color("#3497DB").Label("1M - 10M").Add();
            }))
        .Type(Syncfusion.EJ2.Maps.Type.SubLayer)
            .ShapeData(ViewBag.WorldMap)
            .DataSource(ViewBag.PopulationData)
            .ShapeDataPath("Country")
            .ShapePropertyPath(new[] { "name" })
            .Add();
    })
    .Render()
```

## Best Practices

### API Key Management

**1. Never Hardcode Keys**

```csharp
// ❌ BAD - Exposed in code
.Key("AqrT4fGh3jKl9mN...")

// ✅ GOOD - Use configuration
.Key(Configuration["BingMaps:ApiKey"])
```

**2. Use appsettings.json**

```json
{
  "BingMaps": {
    "ApiKey": "YOUR_BING_KEY"
  },
  "AzureMaps": {
    "SubscriptionKey": "YOUR_AZURE_KEY"
  }
}
```

**Controller:**

```csharp
public class HomeController : Controller
{
    private readonly IConfiguration _config;
    
    public HomeController(IConfiguration config)
    {
        _config = config;
    }
    
    public IActionResult Index()
    {
        ViewBag.BingKey = _config["BingMaps:ApiKey"];
        return View();
    }
}
```

**View:**

```cshtml
.Key(ViewBag.BingKey)
```

### Performance Optimization

**1. Choose Appropriate Zoom Levels**

```cshtml
.ZoomSettings(zoom => zoom
    .MinZoom(2)       // Don't allow zoom out beyond world view
    .MaxZoom(15))     // Limit max zoom to reduce tile requests
```

**2. Set Reasonable Center and Zoom**

```cshtml
@* Start focused on relevant area *@
.CenterPosition(center => center
    .Latitude(YOUR_REGION_LAT)
    .Longitude(YOUR_REGION_LONG))
.ZoomSettings(zoom => zoom
    .ZoomFactor(4))   // Pre-zoom to area of interest
```

**3. Limit Markers**

```csharp
// Use marker clustering for many markers
.MarkerClusterSettings(cluster => cluster
    .AllowClustering(true)
    .Shape(Syncfusion.EJ2.Maps.MarkerClusterShape.Circle))
```

### Provider Selection Guide

| Provider | Best For | Pros | Cons |
|----------|----------|------|------|
| **OSM** | Free projects, open data | No API key, no cost limits | Basic styling, rate limits |
| **Bing** | Enterprise apps | 6 map styles, reliable | Requires API key, paid plans |
| **Azure** | Azure ecosystem | Cloud integration, scalable | Requires subscription, learning curve |
| **TomTom** | Traffic data | Real-time traffic, POI data | Paid service |
| **Mapbox** | Custom styling | Beautiful designs, customizable | Paid beyond free tier |

### Accessibility

```cshtml
@Html.EJS().Maps("container").TitleSettings(title => title
        .Text("Store Locations Map").SubtitleSettings(subtitle => subtitle.Text("Click markers for details"))).Layers(layer =>
    {
        layer.UrlTemplate("YOUR_PROVIDER_URL")
            .MarkerSettings(marker =>
            {
                marker.Visible(true)
                    .TooltipSettings(tooltip => tooltip
                        .Visible(true)
                        .ValuePath("name"))   // Keyboard accessible info
                    .Add();
            })
            .Add();
    }).Render()
```

## Common Issues

### Issue 1: Tiles Not Loading

**Symptoms:** Blank map or missing tiles

**Solutions:**

```cshtml
@* 1. Verify UrlTemplate syntax *@
@* Correct placeholders: ${z}, ${x}, ${y} (with $ and curly braces) *@
.UrlTemplate("https://tile.openstreetmap.org/${z}/${x}/${y}.png")  @* ✅ *@
.UrlTemplate("https://tile.openstreetmap.org/{z}/{x}/{y}.png")    @* ❌ *@

@* 2. Check HTTPS vs HTTP *@
.UrlTemplate("https://tile.openstreetmap.org/${z}/${x}/${y}.png")  @* ✅ HTTPS *@

@* 3. Verify API key is valid *@
@* Test key in browser: https://dev.virtualearth.net/REST/v1/Imagery/Metadata/Road?key=YOUR_KEY *@

@* 4. Enable zoom settings *@
.ZoomSettings(zoom => zoom
    .Enable(true)
    .ZoomFactor(2))   @* Must be > 1 to see tiles *@
```

### Issue 2: Bing Maps Showing Errors

**Symptoms:** Error messages instead of map tiles

**Checklist:**

```cshtml
@* 1. Use LayerType instead of UrlTemplate *@
.LayerType(Syncfusion.EJ2.Maps.Type.Bing)         @* ✅ Correct *@
.UrlTemplate("bing url...")                        @* ❌ Don't use this *@

@* 2. Specify BingMapType *@
.BingMapType(Syncfusion.EJ2.Maps.BingMapType.Road)

@* 3. Verify key format (no spaces, correct length) *@
.Key("AqrT4fGh3jKl9...")   @* Should be ~50-70 characters *@

@* 4. Check key permissions *@
@* Ensure "Public website" usage is enabled in Bing Maps portal *@
```

### Issue 3: Azure Maps Not Displaying

**Symptoms:** 401 Unauthorized or blank map

**Solutions:**

```cshtml
@* 1. Verify subscription key (not client ID) *@
@* Use "Primary Key" from Azure Portal → Authentication → Shared Key *@

@* 2. Correct URL format *@
.UrlTemplate("https://atlas.microsoft.com/map/tile?" +
             "api-version=2.0&" +
             "tilesetId=microsoft.base.road&" +
             "zoom=${z}&x=${x}&y=${y}&" +
             "subscription-key=YOUR_AZURE_KEY")

@* 3. Check Azure Maps account status *@
@* Ensure account is active and not suspended *@

@* 4. Verify CORS settings (if applicable) *@
@* Azure Maps should allow requests from your domain *@
```

### Issue 4: Markers Not Appearing

**Symptoms:** Map loads but markers invisible

**Solutions:**

```cshtml
@* 1. Verify latitude/longitude are valid *@
@* Latitude: -90 to 90, Longitude: -180 to 180 *@
ViewBag.Markers = new[]
{
    new { latitude = 51.5074, longitude = -0.1278 }   @* ✅ London *@
    // NOT: lat/long, x/y, or other property names
};

@* 2. Ensure zoom level is appropriate *@
.ZoomSettings(zoom => zoom
    .Enable(true)
    .ZoomFactor(3))   @* Zoom in to see markers *@

@* 3. Check marker visibility *@
.MarkerSettings(marker =>
{
    marker.Visible(true)              @* Must be true *@
        .Height(25).Width(25)         @* Must have size *@
        .DataSource(ViewBag.Markers)
        .Add();
})

@* 4. Set CenterPosition near markers *@
.CenterPosition(center => center
    .Latitude(51.5074)
    .Longitude(-0.1278))
```

### Issue 5: Slow Tile Loading

**Symptoms:** Tiles load slowly or timeout

**Optimization:**

```cshtml
@* 1. Limit initial zoom factor *@
.ZoomSettings(zoom => zoom
    .ZoomFactor(3))      @* Don't start at high zoom (10+) *@

@* 2. Restrict max zoom *@
.ZoomSettings(zoom => zoom
    .MaxZoom(12))        @* Reduce tile requests at high zoom *@

@* 3. Use faster tile servers *@
@* OSM: Use mirror servers (a.tile, b.tile, c.tile) *@
.UrlTemplate("https://a.tile.openstreetmap.org/${z}/${x}/${y}.png")

@* 4. Implement marker clustering *@
.MarkerClusterSettings(cluster => cluster
    .AllowClustering(true))  @* Reduce marker rendering *@

@* 5. Reduce sublayer complexity *@
@* Use simplified GeoJSON for sublayers *@
```

### Issue 6: CORS Errors in Console

**Symptoms:** "Access-Control-Allow-Origin" errors

**Solutions:**

```
1. OSM: No CORS issues (publicly accessible)

2. Bing Maps: No CORS issues (API key handles auth)

3. Azure Maps: Ensure subscription key is in URL, not headers

4. Custom Servers: Configure CORS on server-side:
   - Add Access-Control-Allow-Origin: *
   - Or whitelist your domain
```

## Summary

This reference covered:

- ✅ OpenStreetMap integration (free, no API key)
- ✅ Bing Maps setup with 6 map types (requires API key)
- ✅ Azure Maps configuration (requires subscription key)
- ✅ Other providers (TomTom, Google, Mapbox, Stamen)
- ✅ Generic tile URL template pattern
- ✅ Zoom, pan, markers, navigation lines for all providers
- ✅ GeoJSON sublayers on tile maps
- ✅ Legend integration with map providers
- ✅ API key management best practices
- ✅ Provider selection guide
- ✅ Performance optimization
- ✅ Common issues and troubleshooting

**Next Steps:**
- Implement customization (themes, dimensions, print, export)
- Add internationalization and localization
- Ensure accessibility compliance (WCAG 2.2 AA)

---

**Example Code Repository:** Check `utils/code-snippet/map-providers/` for complete working examples.
