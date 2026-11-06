# Layers and Data Binding

Complete guide to working with map layers, GeoJSON shape data, and binding external data sources in Angular Maps.

## Table of Contents
- [Understanding Layers](#understanding-layers)
- [GeoJSON Shape Data](#geojson-shape-data)
- [Data Source Binding](#data-source-binding)
- [Multiple Layers and Sublayers](#multiple-layers-and-sublayers)
- [Switching Between Layers](#switching-between-layers)
- [Custom Shapes and Geometry Types](#custom-shapes-and-geometry-types)
- [Complex Data Binding](#complex-data-binding)
- [Best Practices](#best-practices)

## Understanding Layers

Layers are the fundamental building blocks of the Maps component. Each layer can display:
- Shape data from GeoJSON files
- Map providers (Bing, OpenStreetMap, Azure)
- Markers, bubbles, and annotations

The Maps component renders content through the `layers` property, and multiple layers can be added to create rich, layered visualizations.

### Basic Layer Structure

```typescript
import { Component } from '@angular/core';
import { MapsModule } from '@syncfusion/ej2-angular-maps';
import { world_map } from './world-map';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MapsModule],
  template: `
    <ejs-maps id='maps-container'>
      <e-layers>
        <e-layer [shapeData]='shapeData'></e-layer>
      </e-layers>
    </ejs-maps>
  `
})
export class AppComponent {
  public shapeData: object = { dataOptions: { type: 'GET', url: 'https://cdn.syncfusion.com/maps/map-data/world-map.json' } };
}
```

## GeoJSON Shape Data

### What is GeoJSON?

GeoJSON is a format for encoding geographic data structures. It uses JSON to represent geographical features with their spatial geometries and properties.

### Supported Geometry Types

The Maps component supports all GeoJSON geometry types:

| Geometry Type | Description | Supported |
|--------------|-------------|-----------|
| **Polygon** | A closed shape with linear rings | ✅ Yes |
| **MultiPolygon** | Multiple polygons grouped together | ✅ Yes |
| **LineString** | A line with two or more points | ✅ Yes |
| **MultiLineString** | Multiple lines grouped together | ✅ Yes |
| **Point** | A single coordinate position | ✅ Yes |
| **MultiPoint** | Multiple points grouped together | ✅ Yes |
| **GeometryCollection** | Collection of mixed geometry types | ✅ Yes |

### GeoJSON Structure Example

```typescript
// world-map.ts
export let world_map: object = {
  "type": "FeatureCollection",
  "crs": {
    "type": "name",
    "properties": {
      "name": "urn:ogc:def:crs:OGC:1.3:CRS84"
    }
  },
  "features": [
    {
      "type": "Feature",
      "properties": {
        "admin": "Afghanistan",
        "name": "Afghanistan",
        "continent": "Asia",
        "iso_a2": "AF"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [[61.21081709172573, 35.65007233330923], ...]
        ]
      }
    }
    // ... more features
  ]
};
```

### Loading Shape Data

The `shapeData` property accepts GeoJSON data:

```typescript
import { Component } from '@angular/core';
import { MapsModule } from '@syncfusion/ej2-angular-maps';
import { usa_map } from './usa-map';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MapsModule],
  template: `
    <ejs-maps id='maps-container'>
      <e-layers>
        <e-layer 
          [shapeData]='shapeData'
          [shapeSettings]='shapeSettings'>
        </e-layer>
      </e-layers>
    </ejs-maps>
  `
})
export class AppComponent {
  public shapeData: object = { dataOptions: { type: 'GET', url: 'https://cdn.syncfusion.com/maps/map-data/usa.json' } };
  
  public shapeSettings: object = {
    fill: '#E5E5E5',
    border: {
      color: '#000000',
      width: 0.5
    }
  };
}
```

## Data Source Binding

Binding external data to shapes enables data-driven visualizations like choropleth maps, heat maps, and statistical displays.

### Data Source Structure

The `dataSource` property accepts an array of objects with your data:

```typescript
export let populationData: object[] = [
  {
    code: 'AF',
    name: 'Afghanistan',
    population: 29863010,
    density: 119,
    growth: 2.3
  },
  {
    code: 'AL',
    name: 'Albania',
    population: 3195000,
    density: 111,
    growth: 0.3
  },
  {
    code: 'DZ',
    name: 'Algeria',
    population: 34895000,
    density: 15,
    growth: 1.5
  }
];
```

### Binding Properties

Three key properties establish the relationship between shape data and data source:

#### 1. shapeDataPath

Field name in the **dataSource** that identifies the shape:

```typescript
shapeDataPath: 'name'  // Looks for 'name' field in dataSource
```

#### 2. shapePropertyPath

Field name in the **shapeData** (GeoJSON) that matches shapeDataPath:

```typescript
shapePropertyPath: 'name'  // Looks for 'name' field in GeoJSON properties
```

#### 3. dataSource

The actual data array:

```typescript
dataSource: populationData
```

### Complete Data Binding Example

```typescript
import { Component } from '@angular/core';
import { MapsModule, LegendService } from '@syncfusion/ej2-angular-maps';
import { world_map } from './world-map';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MapsModule],
  providers: [LegendService],
  template: `
    <ejs-maps id='maps-container' [legendSettings]='legendSettings'>
      <e-layers>
        <e-layer 
          [shapeData]='shapeData'
          [dataSource]='dataSource'
          shapeDataPath='name'
          shapePropertyPath='name'
          [shapeSettings]='shapeSettings'>
        </e-layer>
      </e-layers>
    </ejs-maps>
  `
})
export class AppComponent {
  public shapeData: object = { dataOptions: { type: 'GET', url: 'https://cdn.syncfusion.com/maps/map-data/world-map.json' } };
  
  // External data source
  public dataSource: object[] = [
    { name: 'Afghanistan', population: 29863010, density: 119 },
    { name: 'Albania', population: 3195000, density: 111 },
    { name: 'Algeria', population: 34895000, density: 15 },
    { name: 'United States', population: 331002651, density: 36 }
  ];
  
  // Color mapping based on population
  public shapeSettings: object = {
    colorValuePath: 'population',
    colorMapping: [
      { from: 0, to: 10000000, color: '#C5E8B7', label: '< 10M' },
      { from: 10000001, to: 100000000, color: '#5BC85A', label: '10M - 100M' },
      { from: 100000001, to: 500000000, color: '#238B45', label: '> 100M' }
    ]
  };
  
  public legendSettings: object = {
    visible: true,
    position: 'Bottom'
  };
}
```

**How it works:**
1. Maps looks at each shape in `world_map` GeoJSON
2. For each shape, it finds the value of `shapePropertyPath` ('name') → e.g., "Afghanistan"
3. It searches `dataSource` for an object where `shapeDataPath` ('name') matches → finds `{ name: 'Afghanistan', population: 29863010, ... }`
4. The entire data object is now bound to that shape
5. The shape color is determined by `colorValuePath` ('population') value using `colorMapping`

## Multiple Layers and Sublayers

The Maps component supports multiple layers for creating rich, layered visualizations.

### Layer Types

1. **Base Layer** (Layer) - Main map layer
2. **Sublayer** (SubLayer) - Overlay layers rendered on top of the base layer

### Adding Sublayers

Sublayers allow highlighting specific regions or adding additional geographic information:

```typescript
import { Component } from '@angular/core';
import { MapsModule } from '@syncfusion/ej2-angular-maps';
import { usa_map } from './usa-map';
import { texas } from './texas';
import { california } from './california';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MapsModule],
  template: `
    <ejs-maps id='maps-container'>
      <e-layers>
        <!-- Base layer: USA map -->
        <e-layer 
          [shapeData]='usaMap'
          [shapeSettings]='baseSettings'>
        </e-layer>
        
        <!-- Sublayer 1: Texas -->
        <e-layer 
          type='SubLayer'
          [shapeData]='texasMap'
          [shapeSettings]='texasSettings'>
        </e-layer>
        
        <!-- Sublayer 2: California -->
        <e-layer 
          type='SubLayer'
          [shapeData]='californiaMap'
          [shapeSettings]='californiaSettings'>
        </e-layer>
      </e-layers>
    </ejs-maps>
  `
})
export class AppComponent {
  public usaMap: object = { dataOptions: { type: 'GET', url: 'https://cdn.syncfusion.com/maps/map-data/usa.json' } };
  public texasMap: object = { dataOptions: { type: 'GET', url: 'https://cdn.syncfusion.com/maps/map-data/texas.json' } };;
  public californiaMap: object = { dataOptions: { type: 'GET', url: 'https://cdn.syncfusion.com/maps/map-data/california.json' } };;
  
  public baseSettings: object = {
    fill: '#E5E5E5',
    border: { color: '#000000', width: 0.5 }
  };
  
  public texasSettings: object = {
    fill: '#FFD700',
    border: { color: '#FF6347', width: 2 }
  };
  
  public californiaSettings: object = {
    fill: '#87CEEB',
    border: { color: '#4169E1', width: 2 }
  };
}
```

### Sublayer Features

Sublayers support the same features as base layers:
- ✅ Markers
- ✅ Bubbles
- ✅ Data labels
- ✅ Color mapping
- ✅ Legends
- ✅ Tooltips

### Use Cases for Sublayers

- **Highlighting regions:** Emphasize specific states, provinces, or districts
- **Multiple data layers:** Display rivers, roads, or borders over base map
- **Comparative analysis:** Show different datasets on the same map
- **Progressive disclosure:** Reveal detailed information on specific areas

## Switching Between Layers

The `baseLayerIndex` property controls which layer is displayed.

### Dynamic Layer Switching

```typescript
import { Component } from '@angular/core';
import { MapsModule } from '@syncfusion/ej2-angular-maps';
import { world_map } from './world-map';
import { usa_map } from './usa-map';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MapsModule],
  template: `
    <div>
      <button (click)='showWorldMap()'>World Map</button>
      <button (click)='showUSAMap()'>USA Map</button>
      
      <ejs-maps 
        id='maps-container'
        [baseLayerIndex]='baseLayerIndex'>
        <e-layers>
          <!-- Layer 0: World -->
          <e-layer [shapeData]='worldMap'></e-layer>
          
          <!-- Layer 1: USA -->
          <e-layer [shapeData]='usaMap'></e-layer>
        </e-layers>
      </ejs-maps>
    </div>
  `
})
export class AppComponent {
  public worldMap: object = { dataOptions: { type: 'GET', url: 'https://cdn.syncfusion.com/maps/map-data/world-map.json' } };;
  public usaMap: object = { dataOptions: { type: 'GET', url: 'https://cdn.syncfusion.com/maps/map-data/usa.json' } };;
  public baseLayerIndex: number = 0; // Start with world map
  
  showWorldMap() {
    this.baseLayerIndex = 0;
  }
  
  showUSAMap() {
    this.baseLayerIndex = 1;
  }
}
```

**Use Case:** Drilldown navigation - Click on USA in world map → switch to detailed USA map

## Custom Shapes and Geometry Types

The Maps component can render custom, non-geographic shapes for creative visualizations.

### geometryType Property

Two geometry type options:

1. **Geographic** (default) - Standard geographic projections
2. **Normal** - No projection, coordinates used as-is

### Custom Shape Example: Seat Selection

```typescript
import { Component } from '@angular/core';
import { MapsModule, SelectionService } from '@syncfusion/ej2-angular-maps';
import { seatLayout } from './seat-layout'; // Custom GeoJSON

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MapsModule],
  providers: [SelectionService],
  template: `
    <ejs-maps 
      id='seat-selection'
      [height]='height'>
      <e-layers>
        <e-layer 
          [shapeData]='shapeData'
          geometryType='Normal'
          [selectionSettings]='selectionSettings'
          [shapeSettings]='shapeSettings'>
        </e-layer>
      </e-layers>
    </ejs-maps>
  `
})
export class AppComponent {
  public shapeData: object = seatLayout;
  public height: string = '400px';
  
  public shapeSettings: object = {
    fill: '#29B6F6',
    border: { color: '#FFFFFF', width: 2 }
  };
  
  public selectionSettings: object = {
    enable: true,
    fill: '#4CAF50',
    opacity: 1
  };
}
```

### Custom GeoJSON Example

```typescript
// seat-layout.ts - Bus seat selection
export let seatLayout: object = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "seatNumber": "1A",
        "available": true
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[0, 0], [50, 0], [50, 50], [0, 50], [0, 0]]]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "seatNumber": "1B",
        "available": false
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[60, 0], [110, 0], [110, 50], [60, 50], [60, 0]]]
      }
    }
    // ... more seats
  ]
};
```

### Use Cases for Custom Shapes

- 🎫 **Seat selection** - Theaters, stadiums, transportation
- 🏢 **Floor plans** - Office layouts, venue maps
- 🎮 **Game boards** - Chess, checkers, strategy games
- 📊 **Infographics** - Visual data representations
- 🏟️ **Stadium seating** - Event ticketing systems

## Complex Data Binding

For nested or complex data structures, use dot notation.

### Simple Field Binding

```typescript
public dataSource: object[] = [
  { name: 'USA', population: 331002651 }
];

// In template
colorValuePath='population'
```

### Nested Field Binding

```typescript
public dataSource: object[] = [
  {
    name: 'USA',
    data: {
      population: 331002651,
      gdp: 21427700,
      stats: {
        growth: 2.3
      }
    }
  }
];

// In template
colorValuePath='data.population'           // Access nested property
shapeDataPath='name'                       // Top-level property
valuePath='data.stats.growth'              // Deeply nested property
```

### Example with Complex Data

```typescript
import { Component } from '@angular/core';
import { MapsModule, MapsTooltipService } from '@syncfusion/ej2-angular-maps';
import { world_map } from './world-map';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MapsModule],
  providers: [MapsTooltipService],
  template: `
    <ejs-maps id='maps-container'>
      <e-layers>
        <e-layer 
          [shapeData]='shapeData'
          [dataSource]='dataSource'
          shapeDataPath='country'
          shapePropertyPath='name'
          [shapeSettings]='shapeSettings'
          [tooltipSettings]='tooltipSettings'>
        </e-layer>
      </e-layers>
    </ejs-maps>
  `
})
export class AppComponent {
  public shapeData: object = { dataOptions: { type: 'GET', url: 'https://cdn.syncfusion.com/maps/map-data/world-map.json' } };
  
  public dataSource: object[] = [
    {
      country: 'United States',
      metrics: {
        economy: {
          gdp: 21427700,
          growth: 2.3
        },
        demographics: {
          population: 331002651,
          density: 36
        }
      }
    }
  ];
  
  public shapeSettings: object = {
    colorValuePath: 'metrics.economy.gdp',
    colorMapping: [
      { from: 0, to: 1000000, color: '#C5E8B7' },
      { from: 1000001, to: 10000000, color: '#5BC85A' },
      { from: 10000001, to: 25000000, color: '#238B45' }
    ]
  };
  
  public tooltipSettings: object = {
    visible: true,
    valuePath: 'country',
    format: '${country}<br>GDP: ${metrics.economy.gdp}<br>Population: ${metrics.demographics.population}'
  };
}
```

## Best Practices

### 1. Optimize GeoJSON Data

- **Simplify geometries:** Use tools like [mapshaper](https://mapshaper.org/) to reduce coordinate precision
- **Remove unnecessary properties:** Keep only fields you'll use
- **Split large files:** Separate country-level and regional data

```typescript
// ❌ Bad: Too much precision
coordinates: [[[61.21081709172573, 35.65007233330923], ...]]

// ✅ Good: Simplified precision
coordinates: [[[61.21, 35.65], ...]]
```

### 2. Lazy Load Shape Data

For large applications with multiple maps:

```typescript
import { Component, OnInit } from '@angular/core';
import { MapsModule } from '@syncfusion/ej2-angular-maps';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MapsModule],
  template: `...`
})
export class AppComponent implements OnInit {
  public shapeData: object = {};
  
  async ngOnInit() {
    // Load shape data on demand
    const data = await import('./world-map');
    this.shapeData = data.world_map;
  }
}
```

### 3. Consistent Naming

Ensure field names match exactly (case-sensitive):

```typescript
// GeoJSON properties
"properties": { "name": "Afghanistan" }

// Data source
{ name: "Afghanistan", population: 29863010 }

// Binding
shapeDataPath='name'        // Must match data source field
shapePropertyPath='name'    // Must match GeoJSON property
```

### 4. Handle Missing Data

Provide fallback values for shapes without bound data:

```typescript
public shapeSettings: object = {
  autofill: true,          // Auto-generate colors for unmatched shapes
  fill: '#E5E5E5',         // Default fill for shapes without data
  colorValuePath: 'value',
  colorMapping: [...]
};
```

### 5. Use Appropriate Layer Types

- **Base layer** - Primary geographic context
- **Sublayers** - Additional overlays or highlights
- **Type specification** - Always set `type='SubLayer'` for overlays

### 6. Validate GeoJSON

Before using GeoJSON data, validate it:
- Use [geojsonlint.com](http://geojsonlint.com/)
- Check coordinate order (longitude, latitude)
- Verify CRS (Coordinate Reference System)

### 7. Performance Considerations

- Limit sublayers to 3-5 for optimal performance
- Use simplified geometries for overview maps
- Detailed geometries only for drilldown views
- Consider viewport-based data loading for large datasets

## Common Patterns

### Pattern 1: Choropleth Map with Data Binding

```typescript
// Perfect for: Election results, demographic data, sales by region
<e-layer 
  [shapeData]='shapeData'
  [dataSource]='dataSource'
  shapeDataPath='state'
  shapePropertyPath='name'
  [shapeSettings]='{
    colorValuePath: "value",
    colorMapping: [
      { from: 0, to: 50, color: "#E74C3C" },
      { from: 51, to: 100, color: "#3498DB" }
    ]
  }'>
</e-layer>
```

### Pattern 2: Multi-Layer with Highlights

```typescript
// Perfect for: Regional analysis, state comparisons
<e-layers>
  <!-- Base: All states -->
  <e-layer [shapeData]='allStates' [shapeSettings]='baseStyle'></e-layer>
  
  <!-- Highlight: Top performers -->
  <e-layer type='SubLayer' [shapeData]='topStates' [shapeSettings]='highlightStyle'></e-layer>
</e-layers>
```

### Pattern 3: Drilldown Navigation

```typescript
// Perfect for: World → Country → State hierarchy
<ejs-maps [baseLayerIndex]='currentIndex'>
  <e-layers>
    <e-layer [shapeData]='worldMap'></e-layer>
    <e-layer [shapeData]='countryMap'></e-layer>
    <e-layer [shapeData]='stateMap'></e-layer>
  </e-layers>
</ejs-maps>
```

## Troubleshooting

### Shapes Not Coloring Correctly

**Problem:** Shapes remain default color despite data binding

**Solutions:**
1. Verify `shapeDataPath` and `shapePropertyPath` values match exactly
2. Check data source field names (case-sensitive)
3. Ensure `colorValuePath` points to valid numeric field
4. Verify `colorMapping` ranges cover your data values

### Some Shapes Missing

**Problem:** Not all shapes from GeoJSON appear

**Solutions:**
1. Check if shapes have valid geometry
2. Verify geometry type is supported
3. Ensure coordinates are in correct order (longitude, latitude)
4. Check for null or undefined geometry objects

### Sublayer Not Visible

**Problem:** Sublayer doesn't appear over base layer

**Solutions:**
1. Ensure `type='SubLayer'` is set
2. Verify sublayer shapeData is loaded
3. Check z-index by reordering layers
4. Ensure sublayer has different styling than base layer

## Next Steps

- **[Markers](markers.md)** - Add location markers to your maps
- **[Data Visualization](data-visualization.md)** - Explore bubbles, legends, and color mapping in detail
- **[User Interactions](user-interactions.md)** - Enable tooltips, selection, and zooming
- **[Map Providers](map-providers.md)** - Integrate Bing Maps or OpenStreetMap as layers

---

## API Reference Summary

### Layer APIs

| API | Description | Documentation Link |
|-----|-------------|-------------------|
| `LayerSettings` | Layer configuration model | [LayerSettings](https://ej2.syncfusion.com/angular/documentation/api/maps/layerSettings) |
| `shapeData` | GeoJSON shape data | [shapeData](https://ej2.syncfusion.com/angular/documentation/api/maps/layerSettings#shapedata) |
| `dataSource` | Data binding array | [dataSource](https://ej2.syncfusion.com/angular/documentation/api/maps/layerSettings#datasource) |
| `type` | Layer type (Layer/SubLayer) | [type](https://ej2.syncfusion.com/angular/documentation/api/maps/layerSettings#type) |
| `geometryType` | Geometry type (Geographic/Normal) | [geometryType](https://ej2.syncfusion.com/angular/documentation/api/maps/layerSettings#geometrytype) |
| `urlTemplate` | Map tile URL template | [urlTemplate](https://ej2.syncfusion.com/angular/documentation/api/maps/layerSettings#urltemplate) |
| `shapeSettings` | Shape styling | [shapeSettings](https://ej2.syncfusion.com/angular/documentation/api/maps/layerSettings#shapesettings) |
| `baseLayerIndex` | Active layer index | [baseLayerIndex](https://ej2.syncfusion.com/angular/documentation/api/maps/mapsComponent#baselayerindex) |

### Enumerations

| Enum | Values | Documentation Link |
|------|--------|-------------------|
| `LayerType` | Layer, SubLayer | [LayerType](https://ej2.syncfusion.com/angular/documentation/api/maps/layerType) |
| `GeometryType` | Geographic, Normal | [GeometryType](https://ej2.syncfusion.com/angular/documentation/api/maps/geometryType) |

**For complete API documentation, see:** [api-reference.md](references/api-reference.md)