# Map Providers

## Table of Contents
- [Overview](#overview)
- [Bing Maps](#bing-maps)
  - [Prerequisites for Bing Maps](#prerequisites-for-bing-maps)
  - [Basic Bing Maps Integration](#basic-bing-maps-integration)
  - [Bing Map Types](#bing-map-types)
  - [Bing Maps with Markers](#bing-maps-with-markers)
- [Azure Maps](#azure-maps)
  - [Prerequisites for Azure Maps](#prerequisites-for-azure-maps)
  - [Basic Azure Maps Integration](#basic-azure-maps-integration)
  - [Azure Maps Tilesets](#azure-maps-tilesets)
  - [Azure Maps with Authentication](#azure-maps-with-authentication)
- [OpenStreetMap](#openstreetmap)
  - [Basic OSM Integration](#basic-osm-integration)
  - [OSM with Custom Styling](#osm-with-custom-styling)
  - [OSM with Data Overlays](#osm-with-data-overlays)
- [Custom Tile Servers](#custom-tile-servers)
  - [Using Custom Tile Server](#using-custom-tile-server)
  - [Mapbox Integration](#mapbox-integration)
  - [Thunderforest Integration](#thunderforest-integration)
- [Hybrid Approaches](#hybrid-approaches)
  - [Multiple Layers (Base + Data)](#multiple-layers-base--data)
- [Complete Examples](#complete-examples)
  - [Example 1: Enterprise App with Azure Maps](#example-1-enterprise-app-with-azure-maps)
  - [Example 2: Public Website with OpenStreetMap](#example-2-public-website-with-openstreetmap)
- [Best Practices](#best-practices)
  - [1. API Key Security](#1-api-key-security)
  - [2. Performance Optimization](#2-performance-optimization)
  - [3. License Compliance](#3-license-compliance)
  - [4. Fallback Strategies](#4-fallback-strategies)
  - [5. Cost Management](#5-cost-management)
- [Troubleshooting](#troubleshooting)
  - [Bing Maps Not Loading](#bing-maps-not-loading)
  - [Azure Maps 401 Unauthorized](#azure-maps-401-unauthorized)
  - [OSM Tiles Loading Slowly](#osm-tiles-loading-slowly)
  - [Mixed Content Errors (HTTPS)](#mixed-content-errors-https)
  - [Tiles Not Matching Data Overlays](#tiles-not-matching-data-overlays)
 

## Overview

Map providers supply the base map imagery and data. The Maps component supports multiple providers, each offering different features, styling options, and licensing requirements.

**Supported Map Providers:**
- **Bing Maps** - Microsoft's mapping service with aerial imagery
- **Azure Maps** - Microsoft Azure's location-based services
- **OpenStreetMap (OSM)** - Free, open-source map data
- **Custom Tile Servers** - Your own tile server or third-party providers

**Choosing a Provider:**
- **Bing Maps** - Best for Microsoft ecosystem integration, aerial views
- **Azure Maps** - Best for enterprise applications on Azure
- **OpenStreetMap** - Best for open-source projects, no API key needed
- **Custom** - Best for specialized maps or offline scenarios

## Bing Maps

### Prerequisites for Bing Maps

1. **Get Bing Maps Key:**
   - Visit [Bing Maps Dev Center](https://www.bingmapsportal.com/)
   - Create account and generate API key
   - Free tier: 125,000 transactions/year

2. **Add Key to Configuration:**

```json
// appsettings.json
{
  "BingMaps": {
    "ApiKey": "YOUR_BING_MAPS_KEY"
  }
}
```

### Basic Bing Maps Integration

```cshtml
@using Syncfusion.EJ2;
    <ejs-maps id="maps" load="onLoad">
        <e-maps-layers>
            <e-maps-layer></e-maps-layer>
        </e-maps-layers>
    </ejs-maps>

    <script>

      function onLoad(args) {
          args.maps.getBingUrlTemplate("https://dev.virtualearth.net/REST/V1/Imagery/Metadata/CanvasLight?output=json&uriScheme=https&key=?").then(function(url) {
              args.maps.layers[0].urlTemplate= url;
          });
      }
  
  </script>
```


### Bing Map Types

```cshtml
@{
    var bingKey = Configuration["BingMaps:ApiKey"];
}

<!-- Aerial View (Satellite) -->
    function onLoad(args) {
          args.maps.getBingUrlTemplate("https://dev.virtualearth.net/REST/V1/Imagery/Metadata/Aerial?output=json&uriScheme=https&key=?").then(function(url) {
              args.maps.layers[0].urlTemplate= url;
          });
      }

<!-- Aerial with Labels -->
    function onLoad(args) {
          args.maps.getBingUrlTemplate("https://dev.virtualearth.net/REST/V1/Imagery/Metadata/AerialWithLabel?output=json&uriScheme=https&key=?").then(function(url) {
              args.maps.layers[0].urlTemplate= url;
          });
      }

<!-- Road Map -->
    function onLoad(args) {
          args.maps.getBingUrlTemplate("https://dev.virtualearth.net/REST/V1/Imagery/Metadata/Road?output=json&uriScheme=https&key=?").then(function(url) {
              args.maps.layers[0].urlTemplate= url;
          });
      }
```

### Bing Maps with Markers

```cshtml
@using Syncfusion.EJ2.Maps

@{
    
    var cities = new[] {
        new { Name = "Seattle", Latitude = 47.6062, Longitude = -122.3321 },
        new { Name = "San Francisco", Latitude = 37.7749, Longitude = -122.4194 },
        new { Name = "Los Angeles", Latitude = 34.0522, Longitude = -118.2437 }
    };

    var tooltip = new MapsTooltipSettings
    {
        Visible = true,
        ValuePath = "Name",
    };
}

<ejs-maps id="bingMarkersMap" height="600px">
    <e-maps-zoomsettings enable="true" enablePanning="true" zoomFactor="6">
        <e-zoomsettings-zoomOnClick>
            <e-zoomOnClick-position latitude="37.7749" longitude="-122.4194"></e-zoomOnClick-position>
        </e-zoomsettings-zoomOnClick>
    </e-maps-zoomsettings>
    
    <e-maps-layers>
        <e-maps-layer>
            <e-layersettings-markers>
                <e-layersettings-marker 
                    visible="true"
                    dataSource="cities"
                    latitudeValuePath="Latitude"
                    longitudeValuePath="Longitude"
                    shape="Circle"
                    fill="#FF6347"
                    height="15"
                    width="15"
                    tooltipsettings="tooltip">
                    
                </e-layersettings-marker>
            </e-layersettings-markers>
        </e-maps-layer>
    </e-maps-layers>
</ejs-maps>

 <script>

      function onLoad(args) {
          args.maps.getBingUrlTemplate("https://dev.virtualearth.net/REST/V1/Imagery/Metadata/CanvasLight?output=json&uriScheme=https&key=?").then(function(url) {
              args.maps.layers[0].urlTemplate= url;
          });
      }
  
  </script>
```

## Azure Maps

### Prerequisites for Azure Maps

1. **Create Azure Maps Account:**
   - Sign in to [Azure Portal](https://portal.azure.com/)
   - Create "Azure Maps Account" resource
   - Get Primary Key from Authentication section

2. **Add Key to Configuration:**

```json
// appsettings.json
{
  "AzureMaps": {
    "SubscriptionKey": "YOUR_AZURE_MAPS_KEY"
  }
}
```

### Basic Azure Maps Integration

```cshtml
@page
@using Syncfusion.EJ2.Maps
@using Microsoft.Extensions.Configuration
@inject IConfiguration Configuration

@{
    var azureKey = Configuration["AzureMaps:SubscriptionKey"];
}

<ejs-maps id="maps" height="600px">
    <e-maps-layers>
        <e-maps-layer 
            urlTemplate="https://atlas.microsoft.com/map/tile?api-version=2.0&tilesetId=microsoft.base.road&zoom={z}&x={x}&y={y}&subscription-key=@azureKey">
        </e-maps-layer>
    </e-maps-layers>
</ejs-maps>
```

### Azure Maps Tilesets

```cshtml
@{
    var azureKey = Configuration["AzureMaps:SubscriptionKey"];
}

<!-- Road Map -->
<ejs-maps id="azureRoad" height="400px">
    <e-maps-layers>
        <e-maps-layer 
            urlTemplate="https://atlas.microsoft.com/map/tile?api-version=2.0&tilesetId=microsoft.base.road&zoom={z}&x={x}&y={y}&subscription-key=@azureKey">
        </e-maps-layer>
    </e-maps-layers>
</ejs-maps>

<!-- Satellite -->
<ejs-maps id="azureSatellite" height="400px">
    <e-maps-layers>
        <e-maps-layer 
            urlTemplate="https://atlas.microsoft.com/map/tile?api-version=2.0&tilesetId=microsoft.imagery&zoom={z}&x={x}&y={y}&subscription-key=@azureKey">
        </e-maps-layer>
    </e-maps-layers>
</ejs-maps>

<!-- Hybrid (Satellite + Labels) -->
<ejs-maps id="azureHybrid" height="400px">
    <e-maps-layers>
        <e-maps-layer 
            urlTemplate="https://atlas.microsoft.com/map/tile?api-version=2.0&tilesetId=microsoft.imagery&zoom={z}&x={x}&y={y}&subscription-key=@azureKey">
        </e-maps-layer>
    </e-maps-layers>
</ejs-maps>
```

**Available Tilesets:**
- `microsoft.base.road` - Road map
- `microsoft.base.darkgrey` - Dark theme
- `microsoft.imagery` - Satellite imagery
- `microsoft.weather.radar.main` - Weather radar
- `microsoft.weather.infrared.main` - Infrared weather

### Azure Maps with Authentication

For production, use Azure AD authentication:

```csharp
// Startup.cs or Program.cs
public void ConfigureServices(IServiceCollection services)
{
    services.AddAzureMapsAuthentication(options =>
    {
        options.ClientId = Configuration["AzureMaps:ClientId"];
        options.TenantId = Configuration["AzureMaps:TenantId"];
    });
}
```

## OpenStreetMap

### Basic OSM Integration

Free and open-source, no API key required:

```cshtml
@using Syncfusion.EJ2.Maps

<ejs-maps id="osmMap" height="600px">
    <e-maps-layers>
        <e-maps-layer 
            layerType="OSM"
            urlTemplate="https://tile.openstreetmap.org/{z}/{x}/{y}.png">
        </e-maps-layer>
    </e-maps-layers>
</ejs-maps>
```

**URL Template Placeholders:**
- `{z}` - Zoom level
- `{x}` - Tile X coordinate
- `{y}` - Tile Y coordinate

### OSM with Custom Styling

Use different OSM tile servers:

```cshtml
<!-- Standard OSM -->
<ejs-maps id="osmStandard" height="400px">
    <e-maps-layers>
        <e-maps-layer 
            urlTemplate="https://tile.openstreetmap.org/{z}/{x}/{y}.png">
        </e-maps-layer>
    </e-maps-layers>
</ejs-maps>

<!-- OSM Humanitarian -->
<ejs-maps id="osmHumanitarian" height="400px">
    <e-maps-layers>
        <e-maps-layer 
            urlTemplate="https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png">
        </e-maps-layer>
    </e-maps-layers>
</ejs-maps>

<!-- CartoDB Light -->
<ejs-maps id="cartoLight" height="400px">
    <e-maps-layers>
        <e-maps-layer 
            urlTemplate="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png">
        </e-maps-layer>
    </e-maps-layers>
</ejs-maps>

<!-- CartoDB Dark -->
<ejs-maps id="cartoDark" height="400px">
    <e-maps-layers>
        <e-maps-layer 
            urlTemplate="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png">
        </e-maps-layer>
    </e-maps-layers>
</ejs-maps>
```

### OSM with Data Overlays

Combine OSM with custom data layers:

```cshtml
@using Syncfusion.EJ2.Maps

@{
    var cities = new[] {
        new { Name = "Paris", Latitude = 48.8566, Longitude = 2.3522, Population = "2.2M" },
        new { Name = "Berlin", Latitude = 52.5200, Longitude = 13.4050, Population = "3.7M" },
        new { Name = "Madrid", Latitude = 40.4168, Longitude = -3.7038, Population = "3.3M" }
    };

    var tooltip = new MapsTooltipSettings
    {
        Visible = true,
        Template = "#tooltipTemplate"
    };
}

<ejs-maps id="osmWithData" height="600px">
    <e-maps-zoomsettings enable="true" enablePanning="true" zoomFactor="5">
    </e-maps-zoomsettings>
    
    <e-maps-layers>
        <e-maps-layer 
            urlTemplate="https://tile.openstreetmap.org/{z}/{x}/{y}.png">
            
            <e-layersettings-markers>
                <e-layersettings-marker 
                    visible="true"
                    dataSource="cities"
                    latitudeValuePath="Latitude"
                    longitudeValuePath="Longitude"
                    shape="Circle"
                    fill="#FF6347"
                    height="15"
                    width="15"
                    tooltipsettings="tooltip">
                    
                </e-layersettings-marker>
            </e-layersettings-markers>
        </e-maps-layer>
    </e-maps-layers>
</ejs-maps>

<div id="tooltipTemplate" style="padding: 10px;">
    <strong>${Name}</strong><br/>
    Population: ${Population}
</div>
```

## Custom Tile Servers

### Using Custom Tile Server

Integrate your own tile server:

```cshtml
<ejs-maps id="customMap" height="600px">
    <e-maps-layers>
        <e-maps-layer 
            urlTemplate="https://yourtileserver.com/tiles/{z}/{x}/{y}.png">
        </e-maps-layer>
    </e-maps-layers>
</ejs-maps>
```

### Mapbox Integration

Use Mapbox tiles with access token:

```cshtml
@{
    var mapboxToken = Configuration["Mapbox:AccessToken"];
    var mapboxStyle = "streets-v11"; // or satellite-v9, dark-v10, light-v10
}

<ejs-maps id="mapboxMap" height="600px">
    <e-maps-layers>
        <e-maps-layer 
            urlTemplate="https://api.mapbox.com/styles/v1/mapbox/@mapboxStyle/tiles/{z}/{x}/{y}?access_token=@mapboxToken">
        </e-maps-layer>
    </e-maps-layers>
</ejs-maps>
```

### Thunderforest Integration

Specialized map styles:

```cshtml
@{
    var thunderforestKey = Configuration["Thunderforest:ApiKey"];
}

<!-- Outdoors Style -->
<ejs-maps id="outdoorsMap" height="600px">
    <e-maps-layers>
        <e-maps-layer 
            urlTemplate="https://tile.thunderforest.com/outdoors/{z}/{x}/{y}.png?apikey=@thunderforestKey">
        </e-maps-layer>
    </e-maps-layers>
</ejs-maps>
```

## Hybrid Approaches

### Multiple Layers (Base + Data)

Combine tile provider with GeoJSON shapes:

```cshtml
@{
    var bingKey = Configuration["BingMaps:ApiKey"];
    var countryBorders = JsonConvert.DeserializeObject(System.IO.File.ReadAllText("wwwroot/maps/world.json"));
    
    var populationData = new[] {
        new { Country = "United States", Population = 331000000 },
        new { Country = "China", Population = 1400000000 }
    };
    
    var colorMapping = new List<MapsColorMapping> {
        new MapsColorMapping { From = 0, To = 500000000, Color = "#C6E7F0" },
        new MapsColorMapping { From = 500000000, To = 1500000000, Color = "#0F5F7A" }
    };
    
    var propertyPath = new[] { "name" };
}

<ejs-maps id="hybridMap" height="600px">
    <e-maps-zoomsettings enable="true" enablePanning="true"></e-maps-zoomsettings>
    
    <e-maps-layers>
        <!-- Base Layer: Bing Maps -->
        <e-maps-layer>
        </e-maps-layer>
        
        <!-- Overlay Layer: GeoJSON with Data -->
        <e-maps-layer 
            type="SubLayer"
            shapeData="countryBorders"
            dataSource="populationData"
            shapeDataPath="Country"
            shapePropertyPath="propertyPath">
            
            <e-layersettings-shapesettings 
                colorValuePath="Population"
                fill="transparent"
                colorMapping="colorMapping"
                opacity="0.5">
                <e-layers-shapesettings-border color="#000000" width="1"></e-layers-shapesettings-border>
            </e-layersettings-shapesettings>
        </e-maps-layer>
    </e-maps-layers>
</ejs-maps>

 <script>

      function onLoad(args) {
          args.maps.getBingUrlTemplate("https://dev.virtualearth.net/REST/V1/Imagery/Metadata/CanvasLight?output=json&uriScheme=https&key=?").then(function(url) {
              args.maps.layers[0].urlTemplate= url;
          });
      }
  
  </script>
```

## Complete Examples

### Example 1: Enterprise App with Azure Maps

```cshtml
@page
@model IndexModel
@using Syncfusion.EJ2.Maps
@using Microsoft.Extensions.Configuration
@inject IConfiguration Configuration

@{
    ViewData["Title"] = "Store Locator";
    var azureKey = Configuration["AzureMaps:SubscriptionKey"];
    
    var stores = new[] {
        new { Name = "Downtown Store", Address = "123 Main St", Latitude = 47.6062, Longitude = -122.3321, Type = "Flagship" },
        new { Name = "Suburb Store", Address = "456 Oak Ave", Latitude = 47.6101, Longitude = -122.3421, Type = "Regular" },
        new { Name = "Mall Store", Address = "789 Pine Rd", Latitude = 47.6000, Longitude = -122.3150, Type = "Regular" }
    };

    var tooltip = new MapsTooltipSettings
    {
        Visible = true,
        Template = "#tooltipTemplate"
    };
}

<div style="padding: 20px;">
    <h1>@ViewData["Title"]</h1>
    <p>Find our stores near you</p>
    
    <ejs-maps id="storeMap" height="600px">
        <e-maps-zoomsettings 
            enable="true" 
            enablePanning="true" 
            zoomFactor="12"
            toolbars='new string[] { "Zoom", "ZoomIn", "ZoomOut", "Pan", "Reset" }'>
        </e-maps-zoomsettings>
        
        <e-maps-layers>
            <e-maps-layer 
                urlTemplate="https://atlas.microsoft.com/map/tile?api-version=2.0&tilesetId=microsoft.base.road&zoom={z}&x={x}&y={y}&subscription-key=@azureKey">
                
                <e-layersettings-markers>
                    <e-layersettings-marker 
                        visible="true"
                        dataSource="stores"
                        latitudeValuePath="Latitude"
                        longitudeValuePath="Longitude"
                        shape="Image"
                        imageUrl="/images/store-marker.png"
                        height="30"
                        width="30"
                        tooltipsettings="tooltip">
                        
                    </e-layersettings-marker>
                </e-layersettings-markers>
            </e-maps-layer>
        </e-maps-layers>
    </ejs-maps>
</div>

<div id="tooltiptemplate" style="padding: 15px; min-width: 200px;">
    <h4 style="margin: 0 0 10px 0;">${Name}</h4>
    <p style="margin: 5px 0;"><strong>Address:</strong> ${Address}</p>
    <p style="margin: 5px 0;"><strong>Type:</strong> ${Type}</p>
    <button onclick="getDirections(${Latitude}, ${Longitude})" 
            style="margin-top: 10px; padding: 5px 15px;">
        Get Directions
    </button>
</div>

<script>
    function getDirections(lat, lon) {
        var url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}`;
        window.open(url, '_blank');
    }
</script>
```

### Example 2: Public Website with OpenStreetMap

```cshtml
@page
@using Syncfusion.EJ2.Maps

@{
    var touristAttractions = new[] {
        new { Name = "Eiffel Tower", Latitude = 48.8584, Longitude = 2.2945, Description = "Iconic iron lattice tower" },
        new { Name = "Louvre Museum", Latitude = 48.8606, Longitude = 2.3376, Description = "World's largest art museum" },
        new { Name = "Arc de Triomphe", Latitude = 48.8738, Longitude = 2.2950, Description = "Famous monument" },
        new { Name = "Notre-Dame", Latitude = 48.8530, Longitude = 2.3499, Description = "Gothic cathedral" }
    };

    var tooltip = new MapsTooltipSettings
    {
        Visible = true,
        Template = "#tooltipTemplate"
    };

    var border = new MapsBorder
    {
        Color = "#FFFFFF",
        Width = 2,
        Opacity = 1
    };
}

<div style="padding: 20px;">
    <h1>Paris Tourist Attractions</h1>
    
    <ejs-maps id="parisMap" height="600px">
        <e-maps-zoomsettings 
            enable="true" 
            enablePanning="true" 
            mouseWheelZoom="true"
            pinchZooming="true"
            zoomFactor="13"
            toolbars='new string[] { "ZoomIn", "ZoomOut", "Reset" }'>
        </e-maps-zoomsettings>
        
        <e-maps-layers>
            <e-maps-layer 
                layerType="OSM"
                urlTemplate="https://tile.openstreetmap.org/{z}/{x}/{y}.png">
                
                <e-layersettings-markers>
                    <e-layersettings-marker 
                        visible="true"
                        dataSource="touristAttractions"
                        latitudeValuePath="Latitude"
                        longitudeValuePath="Longitude"
                        shape="Diamond"
                        border="border"
                        fill="#FF1744"
                        height="20"
                        width="20"
                        tooltipsettings="tooltip">
                    </e-layersettings-marker>
                </e-layersettings-markers>
            </e-maps-layer>
        </e-maps-layers>
    </ejs-maps>
</div>


<div id="tooltipTemplate" style="background: white; padding: 15px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.2);">
    <h3 style="margin: 0 0 10px 0; color: #FF1744;">${Name}</h3>
    <p style="margin: 0; font-size: 14px;">${Description}</p>
</div>
```

## Best Practices

### 1. API Key Security
- **Never** commit API keys to source control
- Store keys in environment variables or Azure Key Vault
- Use different keys for development/production
- Implement key rotation policies
- Restrict keys by domain/IP address

### 2. Performance Optimization
- Cache tiles locally when possible
- Use appropriate zoom limits (avoid excessive detail)
- Implement lazy loading for markers
- Compress tile images
- Use CDN for tile delivery

### 3. License Compliance
- **Bing Maps**: Attribute Microsoft, comply with Terms of Use
- **Azure Maps**: Follow Azure service terms
- **OpenStreetMap**: Always credit © OpenStreetMap contributors
- **Commercial providers**: Review and follow license terms

### 4. Fallback Strategies
- Provide offline fallback maps
- Handle network errors gracefully
- Show loading indicators
- Implement retry logic for failed tile loads

### 5. Cost Management
- Monitor API usage regularly
- Set usage alerts and quotas
- Use free tiers for development
- Cache frequently accessed tiles
- Optimize zoom levels to reduce tile requests

## Troubleshooting

### Bing Maps Not Loading

**Problem:** Bing map tiles don't appear.

**Solutions:**
1. Verify API key is valid and active
2. Check key hasn't exceeded transaction limit
3. Ensure `layerType="Bing"` is set correctly
4. Verify `bingMapType` is valid (Aerial, AerialWithLabel, Road)
5. Check browser console for network errors
6. Confirm domain is whitelisted in Bing Maps portal

### Azure Maps 401 Unauthorized

**Problem:** Azure Maps returns authentication errors.

**Solutions:**
1. Verify subscription key is correct
2. Check Azure Maps account is active
3. Ensure API version in URL is current (api-version=2.0)
4. Verify key hasn't been regenerated (use updated key)
5. Check Azure Maps account hasn't been suspended

### OSM Tiles Loading Slowly

**Problem:** OpenStreetMap tiles load slowly or intermittently.

**Solutions:**
1. Use alternative OSM tile server (HOT, CartoDB)
2. Implement tile caching
3. Reduce initial zoom level
4. Limit map area (don't allow excessive zoom out)
5. Use local tile server for high-traffic applications
6. Respect OSM usage policy (don't overwhelm servers)

### Mixed Content Errors (HTTPS)

**Problem:** Tile loading blocked on HTTPS site.

**Solutions:**
1. Ensure tile URLs use HTTPS (not HTTP)
2. Update urlTemplate to HTTPS version
3. Check tile provider supports HTTPS
4. Configure Content Security Policy correctly
5. Use proxy if tile server only supports HTTP

### Tiles Not Matching Data Overlays

**Problem:** GeoJSON shapes don't align with tile map.

**Solutions:**
1. Verify projection matches (most use Web Mercator)
2. Check coordinate order (longitude, latitude vs latitude, longitude)
3. Ensure zoom level is appropriate
4. Verify GeoJSON coordinates are in correct format
5. Test with simple shapes first

### High API Costs

**Problem:** Unexpectedly high charges for tile requests.

**Solutions:**
1. Implement aggressive tile caching
2. Limit zoom levels (maxZoom: 16-18 usually sufficient)
3. Restrict map bounds to necessary area
4. Use static map images for non-interactive views
5. Monitor usage dashboard regularly
6. Consider switching to OSM for high-volume, low-budget projects
7. Optimize marker clustering to reduce zoom-in needs
