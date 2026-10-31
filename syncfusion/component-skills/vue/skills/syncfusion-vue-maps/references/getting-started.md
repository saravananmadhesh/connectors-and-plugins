# Getting Started with Vue Maps

## Table of Contents
-  [Installation](installation)
-  [Dependencies](dependencies)
-  [Setting up the Project](setting-up-the-project)
  -  [Vue 2 Setup](vue-2-setup)
  -  [Vue 3 Setup](vue-3-setup)
-  [Add Syncfusion Vue Maps](add-syncfusion-vue-maps)
  -  [Vue 2 Component Implementation](vue-2-component-implementation)
  -  [Vue 3 Component Implementation](vue-3-component-implementation)
-  [First Map Implementation](first-map-implementation)
-  [GeoJSON Data Binding](geojson-data-binding)
  -  [GeoJSON Structure](geojson-structure)
  -  [Where to Get GeoJSON Data](where-to-get-geojson-data)
  -  [Using Syncfusion Map Data](using-syncfusion-map-data)
-  [Data Source Binding](data-source-binding)
  -  [Key Properties](key-properties)
  -  [Example: Population Data Map](example-population-data-map)
-  [Running Your First Map](running-your-first-map)
  -  [Complete Getting Started Example](complete-getting-started-example)
  -  [Next Steps](next-steps)

## Installation

Before installing the Syncfusion Vue Maps component, ensure you have Node.js and npm installed on your system.

**Step 1: Install Syncfusion Vue Maps package**

```bash
npm install @syncfusion/ej2-vue-maps
```

**Step 2: Install required peer dependencies**

```bash
npm install @syncfusion/ej2-base @syncfusion/ej2-buttons @syncfusion/ej2-dropdowns
```

## Dependencies

The Vue Maps component depends on these core packages:

- `@syncfusion/ej2-base` - Base utilities
- `@syncfusion/ej2-buttons` - Button controls (for zoom toolbar)
- `@syncfusion/ej2-dropdowns` - Dropdown controls
- `@syncfusion/ej2-vue-maps` - Vue Maps component

The component works with both **Vue 2** and **Vue 3**. The implementation pattern differs slightly between versions.

## Setting up the Project

### Vue 2 Setup

For Vue 2 projects using vue-cli or webpack:

```javascript
// main.js
import Vue from 'vue';
import App from './App.vue';
import { MapsPlugin } from '@syncfusion/ej2-vue-maps';

Vue.use(MapsPlugin);

new Vue({
  render: h => h(App)
}).$mount('#app');
```

### Vue 3 Setup

For Vue 3 projects (Composition API or Options API):

```javascript
// main.ts or main.js
import { createApp } from 'vue';
import App from './App.vue';
import { registerPlugin } from '@syncfusion/ej2-vue-maps';

const app = createApp(App);
registerPlugin(app);
app.mount('#app');
```

## Add Syncfusion Vue Maps

### Vue 2 Component Implementation

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

### Vue 3 Component Implementation

```vue
<template>
   <ejs-maps :titleSettings='titleSettings' :legendSettings='legendSettings'>
        <e-layers>
            <e-layer :shapeData='shapeData' :shapePropertyPath='shapePropertyPath' :shapeDataPath='shapeDataPath' :dataSource='dataSource' :shapeSettings='shapeSettings' :dataLabelSettings='dataLabelSettings' :tooltipSettings='tooltipSettings'></e-layer>
        </e-layers>
    </ejs-maps>
</template>

<script setup>
    const titleSettings =  {
        text: 'UN security council countries'
    };
    const shapeData = new MapAjax('https://cdn.syncfusion.com/maps/map-data/world-map.json');
    const dataSource =  [{  "Country": "China", "Membership": "Permanent"},
            {"Country": "France","Membership": "Permanent" },
            { "Country": "Russia","Membership": "Permanent"},
            {"Country": "Kazakhstan","Membership": "Non-Permanent"},
            { "Country": "Poland","Membership": "Non-Permanent"},
            {"Country": "Sweden","Membership": "Non-Permanent"}];
    const shapePropertyPath = 'name';
    const shapeDataPath = 'Country';
    const shapeSettings = {
            colorValuePath: 'Membership',
            colorMapping: [
                {
                    value: 'Permanent', color: '#D84444'
                },
                {
                    value: 'Non-Permanent', color: '#316DB5'
                }
            ]
    };
    const dataLabelSettings = {
            visible: true,
            labelPath: 'name',
            smartLabelMode: 'Trim'
    };
    const legendSettings = {
        visible: true
    };
    const tooltipSettings = {
        visible: true,
        valuePath: 'Country'
    };
</script>
```

## First Map Implementation

The simplest way to get started is with a basic world map using GeoJSON data:

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

**What's happening:**
- `MapsComponent` is the main container
- `LayersDirective` and `LayerDirective` define the layers
- `shapeData` accepts GeoJSON data to render shapes
- The map automatically renders all shapes from the GeoJSON file

## GeoJSON Data Binding

GeoJSON is the standard format for geographical features. Each feature represents a country, region, or custom shape.

### GeoJSON Structure

```javascript
// world-map.js or imported from a file
export const world_map = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "name": "United States"  // This property name is used for data binding
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[...], [...]], ...]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "Canada"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[...], [...]], ...]
      }
    }
    // ... more countries
  ]
};
```

### Where to Get GeoJSON Data

- **Syncfusion includes common maps**: Import from `@syncfusion/ej2-map-data`
- **Natural Earth**: https://www.naturalearthdata.com/
- **OpenStreetMap**: Custom exports available
- **GeoJSON.io**: Online tool to create or edit GeoJSON

### Using Syncfusion Map Data

```javascript
import { world_map } from '@syncfusion/ej2-map-data';
```

Syncfusion provides pre-built GeoJSON data for:
- World map
- Individual countries
- US states
- Cities and regions

## Data Source Binding

To display data on the map (colors, labels, etc.), bind your data using three key properties:

### Key Properties

1. **`dataSource`** - Array of your business data
2. **`shapeDataPath`** - Field name in your data that uniquely identifies each shape
3. **`shapePropertyPath`** - Field name in GeoJSON that matches your data

### Example: Population Data Map

```javascript
export default {
  data() {
    return {
      // GeoJSON with country shapes
      shapeData: world_map,
      
      // Your business data
      dataSource: [
        { Country: 'United States', Population: 331000000 },
        { Country: 'Russia', Population: 145900000 },
        { Country: 'China', Population: 1439000000 },
        { Country: 'India', Population: 1380000000 },
        { Country: 'Brazil', Population: 212500000 }
      ],
      
      // Map binding properties
      shapeDataPath: 'Country',           // Field in dataSource
      shapePropertyPath: 'name'           // Field in GeoJSON that matches
    };
  },
  template: `
    <ejs-maps>
      <e-layers>
        <e-layer
          :shapeData="shapeData"
          :dataSource="dataSource"
          :shapeDataPath="shapeDataPath"
          :shapePropertyPath="shapePropertyPath"
        >
        </e-layer>
      </e-layers>
    </ejs-maps>
  `
};
```

**How it works:**
- Maps looks for each value in `dataSource[].Country` (shapeDataPath)
- Matches it to a feature in GeoJSON where `properties.name` (shapePropertyPath) equals that value
- Binds the entire data object to that shape for access to all fields (like Population)

## Running Your First Map

Once you've set up the component:

```bash
npm run serve    # For Vue 2
npm run dev      # For Vue 3 / Vite
```

The map will display with:
- All countries/regions rendered
- Default colors and borders
- Interactive zoom and pan (if enabled)
- Responsive to container size

### Complete Getting Started Example

```vue
<template>
  <div class="map-demo">
    <h1>My First World Map</h1>
    <ejs-maps>
      <e-layers>
        <e-layer
          :shapeData="shapeData"
          :dataSource="dataSource"
          :shapeDataPath="shapeDataPath"
          :shapePropertyPath="shapePropertyPath"
        >
        </e-layer>
      </e-layers>
    </ejs-maps>
  </div>
</template>

<script>
import { MapsComponent, LayersDirective, LayerDirective } from '@syncfusion/ej2-vue-maps';
import { world_map } from '@syncfusion/ej2-map-data';

export default {
  components: {
    'ejs-maps': MapsComponent,
    'e-layers': LayersDirective,
    'e-layer': LayerDirective
  },
  data() {
    return {
      shapeData: world_map,
      dataSource: [
        { Country: 'United States', Population: 331000000 },
        { Country: 'Russia', Population: 145900000 },
        { Country: 'China', Population: 1439000000 }
      ],
      shapeDataPath: 'Country',
      shapePropertyPath: 'name'
    };
  }
};
</script>

<style scoped>
.map-demo {
  width: 100%;
  height: 100vh;
}
</style>
```

### Next Steps

- Add colors with **color-mapping.md**
- Add markers with **markers.md**
- Add legends with **legend.md**
- Customize interactions with **user-interactions.md**
