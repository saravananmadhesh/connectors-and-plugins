# Layers and GeoJSON Data

## Table of Contents

- [Understanding Map Layers](#understanding-map-layers)
- [Layer Architecture](#layer-architecture)
  - [Layer Hierarchy](#layer-hierarchy)
  - [Layer Components](#layer-components)
- [Working with GeoJSON](#working-with-geojson)
  - [What is GeoJSON?](#what-is-geojson)
  - [Supported Geometry Types](#supported-geometry-types)
  - [GeoJSON Sources](#geojson-sources)
- [Loading GeoJSON Data](#loading-geojson-data)
  - [Method 1: From File (Server-Side)](#method-1-from-file-server-side)
  - [Method 2: From URL (Client-Side)](#method-2-from-url-client-side)
  - [Method 3: From Database/API (Dynamic)](#method-3-from-databaseapi-dynamic)
  - [Method 4: Inline GeoJSON (Small Datasets)](#method-4-inline-geojson-small-datasets)
- [Layer Types and Configuration](#layer-types-and-configuration)
  - [Layer Type Property](#layer-type-property)
  - [Basic Layer Configuration](#basic-layer-configuration)
- [Multiple Layers](#multiple-layers)
  - [Use Cases for Multiple Layers](#use-cases-for-multiple-layers)
  - [Example: Country and State Layers](#example-country-and-state-layers)
  - [Example: Bing Maps with Data Overlay](#example-bing-maps-with-data-overlay)
- [Sublayers](#sublayers)
  - [Sublayer Configuration](#sublayer-configuration)
- [Layer Visibility and Order](#layer-visibility-and-order)
  - [Toggling Layer Visibility](#toggling-layer-visibility)
  - [Dynamic Layer Management](#dynamic-layer-management)
- [Complete Examples](#complete-examples)
  - [Example 1: World Map with Country Boundaries](#example-1-world-map-with-country-boundaries)
  - [Example 2: USA Map with State Details](#example-2-usa-map-with-state-details)
  - [Example 3: Multi-Layer Map with Custom Regions](#example-3-multi-layer-map-with-custom-regions)
- [Performance Considerations](#performance-considerations)
  - [Optimizing GeoJSON Files](#optimizing-geojson-files)
  - [Layer Performance Tips](#layer-performance-tips)
- [Troubleshooting](#troubleshooting)
  - [Layer Not Rendering](#layer-not-rendering)
  - [GeoJSON Not Loading](#geojson-not-loading)
  - [Multiple Layers Overlapping Incorrectly](#multiple-layers-overlapping-incorrectly)
  - [Performance Degradation with Many Layers](#performance-degradation-with-many-layers)
  - [Sublayer Not Visible Over Base Layer](#sublayer-not-visible-over-base-layer)

## Understanding Map Layers

Layers are the fundamental building blocks of Syncfusion Maps. Each layer represents a distinct collection of geographical shapes, data, and visual elements.

**What is a Layer?**
- A container for geographical shapes (from GeoJSON) and associated data
- Can display markers, bubbles, data labels, and annotations
- Has independent styling and configuration
- Can be shown/hidden dynamically

**Why Use Layers?**
- Separate different types of geographical data
- Overlay multiple datasets on the same map
- Control visibility of specific data sets
- Apply different styling to different regions

## Layer Architecture

### Layer Hierarchy

```
Maps Component
└── Layers Collection
    ├── Layer 1 (Base Layer - typically GeoJSON shapes)
    │   ├── Shape Data (GeoJSON)
    │   ├── Data Source (business data)
    │   ├── Shape Settings (styling)
    │   ├── Markers
    │   ├── Bubbles
    │   ├── Data Labels
    │   └── Annotations
    ├── Layer 2 (Sublayer - overlay)
    └── Layer 3 (Another sublayer)
```

### Layer Components

Each layer can contain:
- **Shape Data** - GeoJSON defining geographical boundaries
- **Data Source** - Business data to bind to shapes
- **Visual Elements** - Markers, bubbles, labels, annotations
- **Settings** - Styling, selection, highlight, tooltip configurations

## Working with GeoJSON

### What is GeoJSON?

GeoJSON is an open standard format for encoding geographical data structures using JSON. It's the primary format for defining shapes in Syncfusion Maps.

**GeoJSON Structure:**

```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "name": "United States",
        "code": "US",
        "population": 331000000
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [[-122.4, 37.8], [-122.5, 37.7], ...]]
      }
    }
  ]
}
```

**Key Elements:**
- `type` - Always "FeatureCollection" at root
- `features` - Array of geographical features
- `properties` - Metadata about the shape (name, code, etc.)
- `geometry` - Actual geographical coordinates defining the shape

### Supported Geometry Types

- **Point** - Single location (lat/lon)
- **LineString** - Connected line segments
- **Polygon** - Closed shape with boundary
- **MultiPoint** - Collection of points
- **MultiLineString** - Collection of lines
- **MultiPolygon** - Collection of polygons (e.g., island nations)

### GeoJSON Sources

**Where to Get GeoJSON Data:**
1. **Natural Earth Data** - [naturalearthdata.com](https://www.naturalearthdata.com/)
2. **OpenStreetMap** - Export GeoJSON from OSM
3. **Syncfusion Samples** - Sample GeoJSON files for common regions
4. **GeoJSON.io** - Create/edit custom GeoJSON
5. **Government Sources** - Census bureaus, statistical offices

**Format Requirements:**
- Must be valid JSON
- Must follow GeoJSON specification
- UTF-8 encoding
- Properties can have any custom fields

## Loading GeoJSON Data

### Method 1: From File (Server-Side)

Load GeoJSON file from server filesystem:

```cshtml
@using Newtonsoft.Json

@{
    // Load from wwwroot directory
    string geoJsonPath = "wwwroot/scripts/MapsData/WorldMap.json";
    string geoJsonText = System.IO.File.ReadAllText(geoJsonPath);
    var worldMapData = JsonConvert.DeserializeObject(geoJsonText);
}

<ejs-maps id="maps">
    <e-maps-layers>
        <e-maps-layer shapeData="worldMapData">
        </e-maps-layer>
    </e-maps-layers>
</ejs-maps>
```

**Best For:** Static GeoJSON files included in your project.

### Method 2: From URL (Client-Side)

Load GeoJSON from external URL:

```cshtml
<ejs-maps id="maps" load="onMapsLoad">
    <e-maps-layers>
        <e-maps-layer shapeDataPath="https://example.com/api/geojson/worldmap">
        </e-maps-layer>
    </e-maps-layers>
</ejs-maps>

<script>
    function onMapsLoad(args) {
        // Maps will fetch the GeoJSON from the URL
    }
</script>
```

**Best For:** Dynamic GeoJSON from APIs or CDN.

### Method 3: From Database/API (Dynamic)

Load GeoJSON from your API endpoint:

```csharp
// Controller action
public IActionResult GetMapData(string region)
{
    var geoJson = _mapService.GetGeoJsonForRegion(region);
    return Json(geoJson);
}
```

```cshtml
@{
    // Fetch from your API
    using (var client = new HttpClient())
    {
        var response = await client.GetStringAsync("https://yourapi.com/geojson/usa");
        var usaMapData = JsonConvert.DeserializeObject(response);
    }
}

<ejs-maps id="maps">
    <e-maps-layers>
        <e-maps-layer shapeData="usaMapData">
        </e-maps-layer>
    </e-maps-layers>
</ejs-maps>
```

**Best For:** Dynamic regions, user selections, real-time data.

### Method 4: Inline GeoJSON (Small Datasets)

For small, simple shapes:

```cshtml
@{
    var customShape = new {
        type = "FeatureCollection",
        features = new[] {
            new {
                type = "Feature",
                properties = new { name = "Custom Region" },
                geometry = new {
                    type = "Polygon",
                    coordinates = new[] {
                        new[] {
                            new[] { -100, 40 },
                            new[] { -90, 40 },
                            new[] { -90, 50 },
                            new[] { -100, 50 },
                            new[] { -100, 40 }
                        }
                    }
                }
            }
        }
    };
}

<ejs-maps id="maps">
    <e-maps-layers>
        <e-maps-layer shapeData="customShape">
        </e-maps-layer>
    </e-maps-layers>
</ejs-maps>
```

**Best For:** Simple custom regions, testing, demos.

## Layer Types and Configuration

### Layer Type Property

```cshtml
<e-maps-layer type="Layer">  <!-- Main layer -->
<e-maps-layer type="SubLayer">  <!-- Overlay layer -->
```

**Values:**
- `Layer` - Standard layer (default)
- `SubLayer` - Overlay layer rendered on top of base layers

### Basic Layer Configuration

```cshtml
<e-maps-layer 
    shapeData="geoJsonData"
    type="Layer"
    visible="true"
    animationDuration="1000">
    
    <e-layersettings-shapesettings 
        fill="#E5E5E5"
        autofill="false">
        <e-layers-shapesettings-border color="#000000" width="0.5"></e-layers-shapesettings-border>
    </e-layersettings-shapesettings>
</e-maps-layer>
```

**Key Properties:**
- `shapeData` - GeoJSON data
- `type` - Layer or SubLayer
- `visible` - Show/hide layer
- `animationDuration` - Load animation duration (ms)
- `shapeSettings` - Shape styling configuration

## Multiple Layers

### Use Cases for Multiple Layers

1. **Base + Overlay** - Country boundaries with state boundaries overlay
2. **Data Layers** - Different datasets on same geography
3. **Provider + Data** - Bing Maps with custom marker layer
4. **Progressive Detail** - Show more detail as user zooms

### Example: Country and State Layers

```cshtml
@{
    var countryData = JsonConvert.DeserializeObject(System.IO.File.ReadAllText("wwwroot/maps/countries.json"));
    var stateData = JsonConvert.DeserializeObject(System.IO.File.ReadAllText("wwwroot/maps/states.json"));
}

<ejs-maps id="maps" height="600px">
    <e-maps-layers>
        <!-- Base layer: Countries -->
        <e-maps-layer shapeData="countryData" type="Layer">
            <e-layersettings-shapesettings fill="#C3E6ED">
                <e-layers-shapesettings-border color="#FFFFFF" width="1"></e-layers-shapesettings-border>
            </e-layersettings-shapesettings>
        </e-maps-layer>
        
        <!-- Overlay layer: States -->
        <e-maps-layer shapeData="stateData" type="SubLayer">
            <e-layersettings-shapesettings fill="transparent">
                <e-layers-shapesettings-border color="#666666" width="0.5"></e-layers-shapesettings-border>
            </e-layersettings-shapesettings>
        </e-maps-layer>
    </e-maps-layers>
</ejs-maps>
```

### Example: Bing Maps with Data Overlay

```cshtml
<ejs-maps id="maps" height="600px">
    <e-maps-layers>
        <!-- Base layer: Bing Maps satellite imagery -->
        <e-maps-layer layerType="Bing" 
                      bingMapType="Aerial"
                      key="YOUR_BING_MAPS_KEY">
        </e-maps-layer>
        
        <!-- Overlay layer: Custom regions -->
        <e-maps-layer shapeData="customRegions" type="SubLayer">
            <e-layersettings-shapesettings fill="#FF6347" opacity="0.5">
                <e-layers-shapesettings-border color="#FFFFFF" width="2"></e-layers-shapesettings-border>
            </e-layersettings-shapesettings>
        </e-maps-layer>
    </e-maps-layers>
</ejs-maps>
```

## Sublayers

Sublayers are layers rendered on top of the base layer, useful for:
- Adding detailed boundaries (cities, districts)
- Highlighting specific regions
- Overlaying different datasets
- Creating visual hierarchy

### Sublayer Configuration

```cshtml
<ejs-maps id="maps">
    <e-maps-layers>
        <!-- Base layer -->
        <e-maps-layer shapeData="worldMap" type="Layer">
            <e-layersettings-shapesettings fill="#E5E5E5"></e-layersettings-shapesettings>
        </e-maps-layer>
        
        <!-- Sublayer 1: Highlight specific countries -->
        <e-maps-layer shapeData="highlightedCountries" type="SubLayer">
            <e-layersettings-shapesettings fill="#FF6347" opacity="0.7"></e-layersettings-shapesettings>
        </e-maps-layer>
        
        <!-- Sublayer 2: City markers -->
        <e-maps-layer type="SubLayer">
            <e-layersettings-markers>
                <e-layersettings-marker dataSource="cities" visible="true">
                </e-layersettings-marker>
            </e-layersettings-markers>
        </e-maps-layer>
    </e-maps-layers>
</ejs-maps>
```

**Rendering Order:** Layers are rendered in the order they appear (bottom to top).

## Layer Visibility and Order

### Toggling Layer Visibility

```cshtml
<button onclick="toggleLayer()">Toggle State Boundaries</button>

<ejs-maps id="maps">
    <e-maps-layers>
        <e-maps-layer shapeData="countryData"></e-maps-layer>
        <e-maps-layer shapeData="stateData" visible="true"></e-maps-layer>
    </e-maps-layers>
</ejs-maps>

<script>
    function toggleLayer() {
        var maps = document.getElementById('maps').ej2_instances[0];
        var layer = maps.layers[1];  // Second layer (states)
        layer.visible = !layer.visible;
        maps.refresh();
    }
</script>
```

### Dynamic Layer Management

```cshtml
<script>
    function showLayerByIndex(index, show) {
        var maps = document.getElementById('maps').ej2_instances[0];
        if (maps.layers[index]) {
            maps.layers[index].visible = show;
            maps.refresh();
        }
    }
    
    function addDynamicLayer(geoJsonUrl) {
        fetch(geoJsonUrl)
            .then(response => response.json())
            .then(data => {
                var maps = document.getElementById('maps').ej2_instances[0];
                maps.layers.push({
                    shapeData: data,
                    type: 'SubLayer',
                    shapeSettings: { fill: '#FF6347' }
                });
                maps.refresh();
            });
    }
</script>
```

## Complete Examples

### Example 1: World Map with Country Boundaries

```cshtml
@page
@using Syncfusion.EJ2.Maps
@using Newtonsoft.Json

@{
    var worldMap = JsonConvert.DeserializeObject(
        System.IO.File.ReadAllText("wwwroot/scripts/MapsData/WorldMap.json")
    );
}

<ejs-maps id="worldMap" height="600px">
    <e-maps-titlesettings text="World Map">
        <e-titlesettings-textstyle size="18px" fontWeight="600"></e-titlesettings-textstyle>
    </e-maps-titlesettings>
    
    <e-maps-layers>
        <e-maps-layer shapeData="worldMap">
            <e-layersettings-shapesettings fill="#C3E6ED">
                <e-layers-shapesettings-border color="#FFFFFF" width="0.5"></e-layers-shapesettings-border>
            </e-layersettings-shapesettings>
            
            <e-layersettings-tooltipsettings visible="true" valuePath="name">
            </e-layersettings-tooltipsettings>
        </e-maps-layer>
    </e-maps-layers>
</ejs-maps>
```

### Example 2: USA Map with State Details

```cshtml
@{
    var usaMap = JsonConvert.DeserializeObject(
        System.IO.File.ReadAllText("wwwroot/scripts/MapsData/USA.json")
    );
}

<ejs-maps id="usaMap" height="600px">
    <e-maps-layers>
        <e-maps-layer shapeData="usaMap">
            <e-layersettings-shapesettings autofill="true">
                <e-layers-shapesettings-border color="#FFFFFF" width="2"></e-layers-shapesettings-border>
            </e-layersettings-shapesettings>
            
            <e-layersettings-datalabelsettings visible="true" labelPath="name" smartLabelMode="Trim">
            </e-layersettings-datalabelsettings>
        </e-maps-layer>
    </e-maps-layers>
</ejs-maps>
```

### Example 3: Multi-Layer Map with Custom Regions

```cshtml
@{
    var baseMap = JsonConvert.DeserializeObject(System.IO.File.ReadAllText("wwwroot/maps/world.json"));
    var regions = JsonConvert.DeserializeObject(System.IO.File.ReadAllText("wwwroot/maps/custom-regions.json"));
}

<ejs-maps id="multiLayerMap" height="600px">
    <e-maps-layers>
        <!-- Base world map -->
        <e-maps-layer shapeData="baseMap" type="Layer">
            <e-layersettings-shapesettings fill="#E8E8E8">
            </e-layersettings-shapesettings>
        </e-maps-layer>
        
        <!-- Custom regions overlay -->
        <e-maps-layer shapeData="regions" type="SubLayer">
            <e-layersettings-shapesettings fill="#FF6347" opacity="0.6">
                <e-layers-shapesettings-border color="#8B0000" width="2"></e-layers-shapesettings-border>
            </e-layersettings-shapesettings>
        </e-maps-layer>
    </e-maps-layers>
</ejs-maps>
```

## Performance Considerations

### Optimizing GeoJSON Files

**1. Reduce Coordinate Precision:**
```javascript
// Instead of: [12.34567890, 45.67890123]
// Use: [12.346, 45.679]
```

**2. Simplify Geometries:**
- Use tools like [Mapshaper](https://mapshaper.org/) to reduce complexity
- Remove unnecessary points while maintaining shape
- Target: 100-1000 points per shape for optimal performance

**3. Remove Unnecessary Properties:**
```json
{
  "properties": {
    "name": "USA",
    // Remove unused properties to reduce file size
  }
}
```

### Layer Performance Tips

**Limit Layer Count:**
- Maximum 5-7 active layers for smooth performance
- Hide unnecessary layers dynamically
- Use layer visibility toggling

**Lazy Load Large Datasets:**
```csharp
// Load only visible region
public IActionResult GetRegionData(string region, int zoomLevel)
{
    if (zoomLevel > 5) {
        return Json(GetDetailedData(region));
    }
    return Json(GetSimplifiedData(region));
}
```

**Cache GeoJSON Data:**
```csharp
private static object _cachedWorldMap;

public IActionResult Index()
{
    if (_cachedWorldMap == null)
    {
        var json = System.IO.File.ReadAllText("wwwroot/maps/world.json");
        _cachedWorldMap = JsonConvert.DeserializeObject(json);
    }
    return View(_cachedWorldMap);
}
```

## Troubleshooting

### Layer Not Rendering

**Problem:** Layer added but not visible.

**Solutions:**
1. Verify `visible="true"` (default is true)
2. Check z-index/rendering order - layers render bottom-up
3. Ensure `shapeData` is valid GeoJSON
4. Check fill color isn't transparent or same as background

### GeoJSON Not Loading

**Problem:** Invalid or malformed GeoJSON.

**Solutions:**
1. Validate JSON at [GeoJSONLint](https://geojsonlint.com/)
2. Check file encoding (must be UTF-8)
3. Verify file path is correct
4. Handle deserialization errors:
   ```csharp
   try {
       var data = JsonConvert.DeserializeObject(json);
   } catch (JsonException ex) {
       // Log error, use fallback data
   }
   ```

### Multiple Layers Overlapping Incorrectly

**Problem:** Layers render in wrong order.

**Solutions:**
1. Reorder layers in markup (render order = markup order)
2. Use `type="SubLayer"` for overlays
3. Adjust opacity for see-through effect
4. Check z-index is not manually overridden

### Performance Degradation with Many Layers

**Problem:** Map is slow or laggy.

**Solutions:**
1. Reduce number of active layers
2. Simplify GeoJSON geometry
3. Use progressive loading based on zoom level
4. Implement layer visibility management
5. Cache frequently used GeoJSON data

### Sublayer Not Visible Over Base Layer

**Problem:** Sublayer hidden behind base layer.

**Solutions:**
1. Ensure sublayer comes after base layer in markup
2. Set `type="SubLayer"` explicitly
3. Check sublayer has opaque fill (not transparent)
4. Verify sublayer coordinates overlap base layer region
