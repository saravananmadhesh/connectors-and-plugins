# Map Providers in Vue Maps

## Table of Contents
- [Overview of Map Providers](#overview-of-map-providers)
- [GeoJSON vs Map Providers](#geojson-vs-map-providers)
  - [GeoJSON (Custom Shapes)](#geojson-custom-shapes)
  - [Map Provider (Satellite/Street Tiles)](#map-provider-satellitestreet-tiles)
- [Bing Maps Integration](#bing-maps-integration)
  - [Get Bing Maps API Key](#get-bing-maps-api-key)
  - [Bing Maps Setup](#bing-maps-setup)
  - [Complete Bing Maps Example](#complete-bing-maps-example)
- [OpenStreetMap Integration](#openstreetmap-integration)
  - [OpenStreetMap Setup](#openstreetmap-setup)
  - [Complete OpenStreetMap Example](#complete-openstreetmap-example)
- [Azure Maps Integration](#azure-maps-integration)
  - [Get Azure Maps API Key](#get-azure-maps-api-key)
  - [Azure Maps Setup](#azure-maps-setup)
- [Hybrid Approach](#hybrid-approach)
  - [Base Layer + GeoJSON Overlay](#base-layer--geojson-overlay)
  - [Real-World Use Case: Real Estate](#real-world-use-case-real-estate)
- [When to Use Each Provider](#when-to-use-each-provider)
  - [Use Bing Maps when:](#use-bing-maps-when)
  - [Use OpenStreetMap when:](#use-openstreetmap-when)
  - [Use Azure Maps when:](#use-azure-maps-when)
  - [Use GeoJSON only when:](#use-geojson-only-when)
- [Performance Considerations](#performance-considerations)
  - [Map Provider Performance](#map-provider-performance)
  - [GeoJSON Performance](#geojson-performance)
- [Best Practices](#best-practices)
- [Attribution Requirements](#attribution-requirements)

## Overview of Map Providers

A map provider is an external service that provides tile-based map imagery (satellite, street, terrain). Instead of rendering custom shapes, you use real-world map data.

**Supported providers:**
- **Bing Maps** - Microsoft's map service (requires API key)
- **OpenStreetMap** - Free, community-driven (no API key)
- **Azure Maps** - Microsoft's modern mapping platform (requires API key)

## GeoJSON vs Map Providers

### GeoJSON (Custom Shapes)

**Use when:**
- You need custom shapes or boundaries
- Data is region/country-based (choropleth maps)
- No real-world street-level detail needed
- Offline capability required
- Full control over styling and data binding
- Performance is critical (fewer data points)

**Example:** Population by country, election results by state

```vue
<e-layer
  :shapeData="world_map"           <!-- GeoJSON data -->
  :dataSource="populationData"
  :shapeDataPath="'Country'"
  :shapePropertyPath="'name'"
>
</e-layer>
```

### Map Provider (Satellite/Street Tiles)

**Use when:**
- You need real-world satellite/aerial imagery
- Street-level detail required
- Real-time map updates needed
- Users expect familiar map interface (like Google Maps)
- Location accuracy critical
- Route calculation needed

**Example:** Delivery tracking, real estate map, ride-sharing

```vue
<e-layer
  :urlTemplate="Your ULR">
</e-layer>
```

## Bing Maps Integration

Bing Maps provides detailed satellite and street views, but requires an API key.

### Get Bing Maps API Key

1. Visit https://www.bingmapsdev.com/
2. Create a Bing Maps account
3. Create a new key (Basic or Enterprise)
4. Copy your API key

### Bing Maps Setup

```vue
<template>
    <div id="app">
          <div class='wrapper'>
            <ejs-maps id='container' :layers='layers' :load='load'>
            </ejs-maps>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import { MapsPlugin } from '@syncfusion/ej2-vue-maps';
Vue.use(MapsPlugin);
export default {
data () {
    return {
      layers: [
        {
        }
    ]
    }
},
methods:{
    load: function (args) {
        let map=document.getElementById('container');
        map.ej2_instances[0].getBingUrlTemplate("Your URL link").then(function(url) {
            map.ej2_instances[0].layers[0].urlTemplate= url;
        });
    }
}
}
</script>
<style>
  .wrapper {
    max-width: 400px;
    margin: 0 auto;
  }
</style>
```

### Complete Bing Maps Example

```vue
<template>
  <div class="map-container">
    <ejs-maps :bingMapsApiKey="bingKey">
      <e-layers>
        <!-- Bing Maps satellite layer -->
        <e-layer :urlTemplate="bingUrl">
          <!-- Add markers for locations -->
          <e-markers :dataSource="storeLocations"></e-markers>
        </e-layer>
      </e-layers>
    </ejs-maps>
  </div>
</template>

<script>
export default {
  data() {
    return {
      storeLocations: [
        { latitude: 40.7128, longitude: -74.0060, name: 'NYC Store' },
        { latitude: 34.0522, longitude: -118.2437, name: 'LA Store' }
      ]
    };
  }
  methods:{
  load: function (args) {
      let map=document.getElementById('container');
      map.ej2_instances[0].getBingUrlTemplate("Your URL link").then(function(url) {
          map.ej2_instances[0].layers[0].urlTemplate= url;
      });
  }
}
};
</script>
```

## OpenStreetMap Integration

OpenStreetMap is free and doesn't require an API key, but has less detailed imagery.

### OpenStreetMap Setup

```vue
<template>
    <div id="app">
          <div class='wrapper'>
            <ejs-maps >
                <e-layers>
                    <e-layer :urlTemplate= 'urlTemplate'>
                    </e-layer>
                </e-layers>
            </ejs-maps>
        </div>
    </div>
</template>

<script>

import { MapsComponent, LayerDirective, LayersDirective } from '@syncfusion/ej2-vue-maps';

export default {
name: "App",
components: {
"ejs-maps":MapsComponent,
"e-layers":LayersDirective,
"e-layer":LayerDirective
},
data () {
    return{
       urlTemplate: 'Your URL link'
    }
},
}
</script>
<style>
  .wrapper {
    max-width: 400px;
    margin: 0 auto;
  }
</style>
```

### Complete OpenStreetMap Example

```vue
<template>
  <ejs-maps>
    <e-layers>
      <!-- OSM street map -->
      <e-layer
        :urlTemplate="osmUrl">
        <e-markers :dataSource="eventLocations"></e-markers>
      </e-layer>
    </e-layers>
  </ejs-maps>
</template>

<script>
export default {
  data() {
    return {
      osmUrl: 'Your URL link',
      eventLocations: [
        { latitude: 40.7128, longitude: -74.0060, event: 'Concert' },
        { latitude: 40.7580, longitude: -73.9855, event: 'Exhibition' }
      ]
    };
  }
};
</script>
```

## Azure Maps Integration

Azure Maps offers enterprise-grade mapping with multiple tile styles.

### Get Azure Maps API Key

1. Create Azure account
2. Create Maps resource
3. Get shared key or SAS token

### Azure Maps Setup

```vue
<template>
    <div id="app">
          <div class='wrapper'>
            <ejs-maps >
                <e-layers>
                    <e-layer :urlTemplate= 'urlTemplate'>
                    </e-layer>
                </e-layers>
            </ejs-maps>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import { MapsPlugin, MapsComponent } from '@syncfusion/ej2-vue-maps';
Vue.use(MapsPlugin);
export default {
data () {
    return{
       urlTemplate: 'Your URL link'
    }
},
}
</script>
<style>
  .wrapper {
    max-width: 400px;
    margin: 0 auto;
  }
</style>
```

## Hybrid Approach

Combine map provider tiles with custom GeoJSON overlays.

### Base Layer + GeoJSON Overlay

```vue
<template>
  <ejs-maps>
    <e-layers>
      <!-- Layer 1: Map provider base -->
      <e-layer
        :urlTemplate="osmUrl">
      </e-layer>
      
      <!-- Layer 2: Custom GeoJSON overlay -->
      <e-layer
        :shapeData="regions"
        :dataSource="regionData"
        type="SubLayer">
      </e-layer>
    </e-layers>
  </ejs-maps>
</template>

<script>
export default {
  data() {
    return {
      osmUrl: 'Your URL link',
      regions: world_map,              // GeoJSON
      regionData: [
        { Country: 'USA', Status: 'Active' }
      ]
    };
  }
};
</script>
```

### Real-World Use Case: Real Estate

```vue
<template>
  <ejs-maps>
    <e-layers>
      <!-- Satellite base map -->
      <e-layer :urlTemplate="satelliteUrl">
      </e-layer>
      
      <!-- Property boundaries overlay -->
      <e-layer
        :shapeData="propertyBoundaries"
        :dataSource="propertyData"
        type="SubLayer">
      </e-layer>
      
      <!-- Property markers -->
      <e-markers :dataSource="properties"></e-markers>
    </e-layers>
  </ejs-maps>
</template>

<script>
export default {
  data() {
    return {
      satelliteUrl: 'Your URL link',
      propertyBoundaries: complexGeoJSON,
      propertyData: [
        { Property: 'Lot-123', Price: 450000 }
      ],
      properties: [
        { 
          latitude: 40.7128, 
          longitude: -74.0060, 
          price: '$450K',
          beds: 3
        }
      ]
    };
  }
};
</script>
```

## When to Use Each Provider

### Use Bing Maps when:
- Client has Microsoft/enterprise preference
- Need bird's-eye view
- Require official/authoritative tiles
- Integration with Microsoft ecosystem

**Pros:** Detailed imagery, professional, enterprise support  
**Cons:** Requires API key, billing model

### Use OpenStreetMap when:
- Budget conscious (free)
- Community-driven data acceptable
- Quick prototyping needed
- Data privacy important (no tracking)

**Pros:** Free, diverse tile styles, no API key  
**Cons:** Community-maintained, less detailed imagery

### Use Azure Maps when:
- Using Azure ecosystem
- Enterprise requirements
- High availability SLA needed
- Real-time data updates

**Pros:** Enterprise support, SLA, Azure integration  
**Cons:** Requires API key, billing

### Use GeoJSON only when:
- Custom boundaries needed
- Choropleth/heatmaps required
- Offline support essential
- Statistical/regional data

**Pros:** Full control, offline, precise styling  
**Cons:** No real-world imagery, limited to custom shapes

## Performance Considerations

### Map Provider Performance
- Lazy-loads tiles on demand
- Smoother for large geographical areas
- Requires network connection
- Better for real-time scenarios

### GeoJSON Performance
- Loads all data upfront
- Can be slower with large/complex boundaries
- Works offline
- Better for focused regional analysis

## Best Practices

1. **Use provider for street-level** - Real-world imagery
2. **Use GeoJSON for regional** - Statistical visualization
3. **Hybrid for best of both** - Context + data
4. **Test tile loading** - Ensure good network coverage
5. **Cache API keys** - Don't expose in frontend
6. **Choose right zoom** - Different levels of detail
7. **Monitor API usage** - Billing/rate limits

## Attribution Requirements

Each map provider requires proper attribution:

```vue
<template>
  <!-- Most tiles require copyright notice -->
  <div class="map-credits">
    © OpenStreetMap contributors
  </div>
</template>
```

Always include attribution per provider's license requirements.
