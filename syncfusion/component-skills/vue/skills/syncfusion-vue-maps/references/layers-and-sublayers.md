# Layers and Sublayers in Vue Maps

## Table of Contents
- [Understanding Layer Architecture](#understanding-layer-architecture)
  - [Layer Hierarchy](#layer-hierarchy)
- [Main Layer vs Sublayers](#main-layer-vs-sublayers)
  - [Main Layer (type="Layer")](#main-layer-typelayer)
  - [Sublayer (type="SubLayer")](#sublayer-typesublayer)
- [Single Layer Maps](#single-layer-maps)
  - [Basic World Map](#basic-world-map)
- [Multiple Layer Maps](#multiple-layer-maps)
  - [Use Cases for Multiple Layers](#use-cases-for-multiple-layers)
  - [Example: Country Map with Highlighted States](#example-country-map-with-highlighted-states)
- [Layer Configuration](#layer-configuration)
  - [Layer Properties](#layer-properties)
  - [Common Configuration](#common-configuration)
- [Layer Visibility and Stacking](#layer-visibility-and-stacking)
  - [Z-Index (Stacking Order)](#z-index-stacking-order)
  - [Visibility Toggle](#visibility-toggle)
- [Common Layer Patterns](#common-layer-patterns)
  - [Pattern 1: Base + Highlight](#pattern-1-base--highlight)
  - [Pattern 2: Different Data Sources](#pattern-2-different-data-sources)
  - [Pattern 3: Administrative Boundaries](#pattern-3-administrative-boundaries)
  - [When to Add More Layers](#when-to-add-more-layers)
  - [Performance Consideration](#performance-consideration)

## Understanding Layer Architecture

A layer is a collection of shapes, annotations, and visual elements that make up a map. You can stack multiple layers to create complex visualizations where different data or shapes overlay on top of each other.

### Layer Hierarchy

```
MapsComponent
├── Layer 1 (Main Layer)
│   ├── Shapes (GeoJSON features)
│   ├── Markers
│   ├── Bubbles
│   └── Data Labels
│
├── Layer 2 (Sublayer)
│   ├── Highlighted regions
│   ├── Custom shapes
│   └── Overlay data
│
└── Layer 3 (Sublayer)
    └── Additional elements
```

**Why use multiple layers?**
- Separate concerns: base map + data overlay
- Create visual hierarchy and depth
- Combine different data sources
- Control what's visible at different zoom levels
- Apply distinct styling to different regions

## Main Layer vs Sublayers

### Main Layer (type="Layer")

The primary layer that serves as the foundation for your map.

**Characteristics:**
- Usually contains country/region boundaries
- Typically has data binding (population, GDP, etc.)
- Often uses color mapping
- Visible by default
- Typically the first layer defined

**Example:**

```vue
<template>
    <div id="app">
        <div class='wrapper'>
            <ejs-maps id='maps'>
               <e-layers>
                    <e-layer :shapeData='shapeData'></e-layer>
                </e-layers>
            </ejs-maps>
        </div>
    </div>
</template>

<script>
import { MapsComponent, LayersDirective, LayerDirective } from '@syncfusion/ej2-vue-maps';
import { world_map } from './world-map.js';

export default {
name: "App",
components: {
"ejs-maps":MapsComponent,
"e-layers":LayersDirective,
"e-layer":LayerDirective
  },
  data () {
    return {
        shapeData: world_map
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

### Sublayer (type="SubLayer")

Overlay layers that sit on top of the main layer, useful for highlighting or adding additional data.

**Characteristics:**
- Rendered on top of previous layers
- Optional visibility control
- Can have separate styling
- Often used for highlighting or emphasis
- Multiple sublayers supported

**Example:**

```vue
<template>
    <div id="app">
          <div class='wrapper'>
            <ejs-maps >
                <e-layers>
                    <e-layer :shapeData='shapeData' :shapeSettings='shapeSettings' ></e-layer>
                     <e-layer :shapeData='shapeData1' :type = 'type' :shapeSettings='shapeSettings1' ></e-layer>
                     <e-layer :shapeData='shapeData2' :type = 'type' :shapeSettings='shapeSettings2' ></e-layer>
                </e-layers>
            </ejs-maps>
        </div>
    </div>
</template>

<script>

import { MapsComponent, LayerDirective, LayersDirective } from '@syncfusion/ej2-vue-maps';
import { usMap } from './usa.js';
import { california } from './california.js';
import { texas } from './texas.js';

export default {
name: "App",
components: {
"ejs-maps":MapsComponent,
"e-layers":LayersDirective,
"e-layer":LayerDirective
},
data () {
    return{
        shapeData: usMap,
        shapeSettings: {
            fill: '#E5E5E5',
            border: {
                color: 'black',
                width: 0.1
            }
        },
        shapeData1: texas,
        type: 'SubLayer',
        shapeSettings1: {
            fill: 'rgba(141, 206, 255, 0.6)',
            border: {
                color: '#1a9cff',
                width: 0.25
            }
        },
        shapeData2: california,
        shapeSettings2: {
            fill: 'rgba(141, 206, 255, 0.6)',
            border: {
                color: '#1a9cff',
                width: 0.25
            }
        }
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

## Single Layer Maps

Simple maps with one layer are best for:
- Basic geographical visualization
- Single data dimension (e.g., just population)
- Country or region level views
- Starting point for more complex maps

### Basic World Map

```vue
<template>
    <div id="app">
        <div class='wrapper'>
            <ejs-maps id='maps'>
               <e-layers>
                    <e-layer :shapeData='shapeData'></e-layer>
                </e-layers>
            </ejs-maps>
        </div>
    </div>
</template>

<script>
import { MapsComponent, LayersDirective, LayerDirective } from '@syncfusion/ej2-vue-maps';
import { world_map } from './world-map.js';

export default {
name: "App",
components: {
"ejs-maps":MapsComponent,
"e-layers":LayersDirective,
"e-layer":LayerDirective
  },
  data () {
    return {
        shapeData: world_map
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

## Multiple Layer Maps

Multi-layer maps combine several GeoJSON sources to create rich visualizations.

### Use Cases for Multiple Layers

**1. Base + Highlight Pattern**
- Layer 1: Entire country (main)
- Layer 2: Specific states/regions to highlight (sublayer)

**2. Data + Annotation Pattern**
- Layer 1: Country map with population data
- Layer 2: Major cities as markers/annotations

**3. Hybrid Map Pattern**
- Layer 1: Map provider tiles as background
- Layer 2: Custom GeoJSON shapes overlay

### Example: Country Map with Highlighted States

```vue
<template>
<ejs-maps>
  <e-layers>
    <!-- Main Layer: US Map -->
    <e-layer
      :shapeData="shapeData"
      :dataSource="stateData"
      :shapeDataPath="'State'"
      :shapePropertyPath="'name'"
      type="Layer"
      :shapeSettings="baseShapeSettings"
    >
    </e-layer>

    <!-- Sublayer: Highlight top 5 states -->
    <e-layer
      :shapeData="shapeData"
      :dataSource="highlightedStates"
      :shapeDataPath="'State'"
      :shapePropertyPath="'name'"
      type="SubLayer"
      :shapeSettings="highlightShapeSettings"
    >
    </e-layer>
  </e-layers>
</ejs-maps>
</template>

<script>

import { MapsComponent, DataLabel, LayerDirective, LayersDirective } from '@syncfusion/ej2-vue-maps';
import { usMap } from './usa.js';

export default {
name: "App",
components: {
"ejs-maps":MapsComponent,
"e-layers":LayersDirective,
"e-layer":LayerDirective
},
data () {
    return {
        shapeData: usMap,
        shapeSettings: {
           autofill:true
        },
        dataLabelSettings: {
            visible: true,
            labelPath: 'name'
        },
        // Main layer: All states with basic data
      stateData: [
      { State: 'California', Population: 39500000 },
      { State: 'Texas', Population: 29000000 },
      { State: 'Florida', Population: 21500000 },
      { State: 'New York', Population: 19450000 },
      { State: 'Pennsylvania', Population: 13000000 }
    ],
    
    // Sublayer: Only top 3 to highlight
    highlightedStates: [
      { State: 'California', Status: 'Top' },
      { State: 'Texas', Status: 'Top' },
      { State: 'Florida', Status: 'Top' }
    ],
    
    baseShapeSettings: {
      fill: '#E5E5E5',
      border: { width: 0.5, color: '#999' }
    },
    
    highlightShapeSettings: {
      fill: '#FF6B6B',
      border: { width: 1, color: '#CC0000' }
    }
    }
},
provide: {
    maps: [DataLabel]
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

## Layer Configuration

### Layer Properties

```javascript
{
  // Data source and binding
  shapeData: world_map,              // GeoJSON data
  dataSource: countryData,           // Business data
  shapeDataPath: 'Country',          // Field in dataSource
  shapePropertyPath: 'name',         // Field in GeoJSON
  
  // Layer type
  type: 'Layer',                     // 'Layer' or 'SubLayer'
  
  // Styling
  shapeSettings: {
    fill: '#E5E5E5',
    border: { width: 0.5, color: '#999' },
    colorValuePath: 'Population',
    colorMapping: [...]
  },
  
  // Visual elements
  markerSettings: [...],             // Markers for this layer
  bubbleSettings: [...],             // Bubbles for this layer
  dataLabelSettings: {...},          // Data labels
  navigationLineSettings: [...],     // Lines between locations
  
  // Visibility and interaction
  visible: true,                     // Show/hide layer
  opacity: 1.0,                      // 0-1, transparency
  selectionSettings: {...}           // How shapes respond to clicks
}
```

### Common Configuration

**Styling a Layer**

```javascript
shapeSettings: {
  fill: '#E5E5E5',                   // Default shape color
  border: {
    width: 0.5,
    color: '#666'
  },
  colorValuePath: 'Population',      // Use data field for colors
  colorMapping: [
    { value: 'High', color: '#FF0000' },
    { value: 'Medium', color: '#FFFF00' },
    { value: 'Low', color: '#00FF00' }
  ]
}
```

**Visibility Control**

```javascript
// Hide a layer
visible: false

```

## Layer Visibility and Stacking

### Z-Index (Stacking Order)

Layers render in the order they're defined in the template. Later layers appear on top.

```vue
<ejs-maps>
  <e-layers>
    <!-- This renders first (bottom) -->
    <e-layer :shapeData="base_map" type="Layer"></e-layer>
    
    <!-- This renders second (middle) -->
    <e-layer :shapeData="overlay1" type="SubLayer"></e-layer>
    
    <!-- This renders last (top) -->
    <e-layer :shapeData="overlay2" type="SubLayer"></e-layer>
  </e-layers>
</ejs-maps>
```

### Visibility Toggle

You can dynamically show/hide layers:

```vue
<template>
  <div>
    <button @click="toggleLayer">Toggle Layer 2</button>
    
    <ejs-maps>
      <e-layers>
        <e-layer :shapeData="layer1" type="Layer"></e-layer>
        <e-layer :shapeData="layer2" :visible="showLayer2" type="SubLayer"></e-layer>
      </e-layers>
    </ejs-maps>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showLayer2: true
    };
  },
  methods: {
    toggleLayer() {
      this.showLayer2 = !this.showLayer2;
    }
  }
};
</script>
```

## Common Layer Patterns

### Pattern 1: Base + Highlight

**Purpose**: Show all regions but emphasize specific ones

```vue
<!-- Layer 1: Full map as base -->
<e-layer :shapeData="full_map" type="Layer">
</e-layer>

<!-- Layer 2: Highlight selected regions -->
<e-layer :shapeData="full_map" :dataSource="highlighted" type="SubLayer">
</e-layer>
```

### Pattern 2: Different Data Sources

**Purpose**: Show different datasets on same map

```vue
<!-- Layer 1: Population data -->
<e-layer
  :shapeData="map"
  :dataSource="populationData"
  type="Layer"
>
</e-layer>

<!-- Layer 2: Poverty rate overlay -->
<e-layer
  :shapeData="map"
  :dataSource="povertyData"
  type="SubLayer"
>
</e-layer>
```

### Pattern 3: Administrative Boundaries

**Purpose**: Show multiple administrative levels (country, state, city)

```vue
<!-- Layer 1: Country borders -->
<e-layer :shapeData="countries" type="Layer"></e-layer>

<!-- Layer 2: State/province borders -->
<e-layer :shapeData="states" type="SubLayer"></e-layer>

<!-- Layer 3: City locations as markers -->
<e-layer :shapeData="cities" type="SubLayer"></e-layer>
```

### When to Add More Layers

| Scenario | Layers Needed | Reason |
|----------|--------------|--------|
| Simple world map | 1 | Base visualization only |
| Country with highlights | 2 | Base + emphasis layer |
| Multiple data dimensions | 2-3 | Separate data concerns |
| Regional analysis | 3-4 | Country + regions + cities |
| Complex dashboard | 4+ | Many overlays and annotations |

### Performance Consideration

Each layer requires rendering calculations. For best performance:
- Use ≤3 layers for interactive maps
- Simplify GeoJSON when using many layers
- Hide layers not currently needed
- Use sublayers instead of multiple main layers
