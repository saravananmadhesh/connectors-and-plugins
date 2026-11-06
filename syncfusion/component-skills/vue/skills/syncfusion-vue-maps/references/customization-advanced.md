# Customization and Advanced Features in Vue Maps

## Table of Contents
- [Map Projections](#map-projections)
  - [Available Projections](#available-projections)
  - [Projection Examples](#projection-examples)
- [Title and Subtitle](#title-and-subtitle)
  - [Basic Title](#basic-title)
  - [Title and Subtitle](#title-and-subtitle)
- [Borders and Background](#borders-and-background)
  - [Border Configuration](#border-configuration)
  - [Background Styling](#background-styling)
  - [Margin and Padding](#margin-and-padding)
- [Annotations](#annotations)
  - [Basic Annotation](#basic-annotation)
  - [Multiple Annotations](#multiple-annotations)
- [Internationalization and Localization](#internationalization-and-localization)
  - [i18n Setup](#i18n-setup)
  - [RTL Support (Right-to-Left)](#rtl-support-right-to-left)
  - [Regional Number Formatting](#regional-number-formatting)
- [Accessibility](#accessibility)
  - [WCAG Compliance](#wcag-compliance)
  - [Color Contrast](#color-contrast)
  - [Keyboard Navigation](#keyboard-navigation)
- [State Persistence](#state-persistence)
  - [Save Map State](#save-map-state)
- [Printing and Export](#printing-and-export)
  - [Print Support](#print-support)
  - [Export to Image](#export-to-image)
- [Performance Optimization](#performance-optimization)
  - [Simplify GeoJSON](#simplify-geojson)
  - [Lazy Load Data](#lazy-load-data)
  - [Virtualize Markers](#virtualize-markers)
  - [Limit Layers](#limit-layers)
  - [Disable Animations](#disable-animations)
- [Best Practices](#best-practices)

## Map Projections

A projection determines how the 3D Earth is displayed on a 2D map. Different projections suit different use cases.

### Available Projections

```vue
<template>
  <ejs-maps :projectionType="projectionType">
    <e-layers>
      <e-layer :shapeData="world_map"></e-layer>
    </e-layers>
  </ejs-maps>
</template>

<script>
import { MapsComponent, LayerDirective, LayersDirective } from '@syncfusion/ej2-vue-maps';
import { world_map } from './world-map.js';
export default {
  data() {
    return {
      world_map: world_map,
      projectionType: 'Mercator'  // Default
    };
  }
};
</script>
```

**Supported projections:**

| Projection | Use Case | Characteristics |
|-----------|----------|-----------------|
| Mercator | General mapping | Conformal, straight lines, distorts size near poles |
| Miller | Alternative cylindrical | Less distortion than Mercator |
| Eckert3 | Equal area | Preserves area, good for thematic maps |
| Eckert5 | Equal area alternative | Another equal-area option |
| Eckert6 | Equal area variant | Minimizes distortion |
| Winkel Tripel | Compromise projection | Balanced distortion |
| Aitoff | Azimuthal equidistant | Distances accurate from center |
| Equirectangular | Simple rectangular | Each degree = same pixel distance |

### Projection Examples

**Mercator (Default - Good for Navigation)**
```javascript
projectionType: 'Mercator'
// Web mapping standard, but distorts areas near poles
// Good for: Routes, directions, street-level
```

**Eckert3 (Equal Area - Good for Statistics)**
```javascript
projectionType: 'Eckert3'
// Preserves area proportions
// Good for: Population maps, statistical analysis, comparisons
```

**Winkel Tripel (Compromise - Good for General Reference)**
```javascript
projectionType: 'Winkel Tripel'
// Minimizes overall distortion
// Good for: World atlases, general reference
```

## Title and Subtitle

Add descriptive text to your maps.

### Basic Title

```vue
<template>
  <ejs-maps :titleSettings='titleSettings'>
    <e-layers>
      <e-layer :shapeData="world_map"></e-layer>
    </e-layers>
  </ejs-maps>
</template>

<script>
import { MapsComponent, LayerDirective, LayersDirective } from '@syncfusion/ej2-vue-maps';
import { world_map } from './world-map.js';
export default {
  data() {
    return {
      world_map: world_map,
      titleSettings: {
        text: 'UN security council countries',
        textStyle: {
            fontFamily: 'Arial',
            size: '20px',
            fontWeight: 'bold',
            color: '#000'
        }
      },
    };
  }
};
</script>
```

### Title with Subtitle

```javascript
titleSettings: {
  text: 'World Population 2024',
  alignment: 'Center',  // 'Near', 'Center', 'Far'
  textStyle: {
    size: '20px',
    fontWeight: 'bold'
  },
  
  subtitleSettings: {
    text: 'Population by country',
    textStyle: {
      size: '14px',
      color: '#666'
    }
  }
}
```

## Borders and Background

Customize map container appearance.

### Border Configuration

```vue
<template>
  <ejs-maps :border="border">    
    <e-layers>
      <e-layer :shapeData="world_map"></e-layer>
    </e-layers>
  </ejs-maps>
</template>

<script>
import { MapsComponent, LayerDirective, LayersDirective } from '@syncfusion/ej2-vue-maps';
import { world_map } from './world-map.js';
export default {
    world_map: world_map,
    border: {
        color:'#FFD700',
        width:'2'
    },
};
</script>
```

### Background Styling

```javascript
background: {
  color: '#F5F5F5'    // Light gray background
}
```

### Margin and Padding

```javascript
margin: {
  top: 10,
  bottom: 10,
  left: 10,
  right: 10
}
```

## Annotations

Add custom overlays and annotations to maps.

### Basic Annotation

```vue
<template>
    <div id="app">
        <div class='wrapper'>
            <ejs-maps >
                <e-maps-annotations>
                    <e-maps-annotation :content='contentTemplate' :x='x1' :y='y1' :zIndex='zindex'>
                    </e-maps-annotation>
                </e-maps-annotations>
                <e-layers>
                    <e-layer :shapeData='shapeData' >
                    </e-layer>
                </e-layers>
            </ejs-maps>
        </div>
    </div>
</template>

<script>
import { MapsComponent, LayerDirective, LayersDirective, AnnotationDirectives ,AnnotationDirective  } from '@syncfusion/ej2-vue-maps';
import { world_map } from './world-map.js';
import { createApp } from 'vue';

const app = createApp({});

const mapTemplate  = app.component('MapsComponent', {
  data: () => ({}),
  template: '<div id="first"><h1>Maps</h1></div>'
});

const shapeData = world_map;
const zindex = 1;
const x1 = '0%';
const y1 = '50%';

const contentTemplate = function () {
  return {
    template: mapTemplate 
  }
};

provide('maps',  [ Annotations ]);

</script>
<style>
  .wrapper {
    max-width: 400px;
    margin: 0 auto;
  }
</style>
```

### Multiple Annotations

```javascript
annotations: [
  {
    content: '<div>New York</div>',
    x: '74%',
    y: '30%'
  },
  {
    content: '<div>Los Angeles</div>',
    x: '25%',
    y: '55%'
  },
  {
    content: '<div>Chicago</div>',
    x: '68%',
    y: '42%'
  }
]
```

## Internationalization and Localization

Support multiple languages and regional formats.

### i18n Setup

```vue
<template>
  <div>
    <button @click="language = 'en'">English</button>
    <button @click="language = 'ar'">العربية</button>
    <button @click="language = 'fr'">Français</button>
    
    <ejs-maps :locale="language">
      <e-layers>
        <e-layer :shapeData="world_map"></e-layer>
      </e-layers>
    </ejs-maps>
  </div>
</template>

<script>
import { setLocale } from '@syncfusion/ej2-base';
import { MapsComponent, LayerDirective, LayersDirective } from '@syncfusion/ej2-vue-maps';
import { world_map } from './world-map.js';

export default {
  data() {
    return {
      world_map: world_map,
      language: 'en'
    };
  },
  watch: {
    language(newLang) {
      setLocale(newLang);
    }
  }
};
</script>
```

### RTL Support (Right-to-Left)

```vue
<template>
  <ejs-maps :enableRtl="true">
    <e-layers>
      <e-layer :shapeData="world_map"></e-layer>
    </e-layers>
  </ejs-maps>
</template>

<script>
import { MapsComponent, LayerDirective, LayersDirective } from '@syncfusion/ej2-vue-maps';
import { world_map } from './world-map.js';
export default {
  world_map: world_map,
};
</script>
```

### Regional Number Formatting

```javascript
// Automatically formats numbers based on locale
// US: 1,000,000
// German: 1.000.000
// French: 1 000 000

// Data labels, tooltips use locale-aware formatting
dataLabelSettings: {
  visible: true,
  labelPath: 'Country'
  // Numbers automatically formatted per locale
}
```

## Accessibility

Make your maps accessible to all users.

### WCAG Compliance

```vue
<template>
  <ejs-maps role="application" aria-label="World map with population data" :zoomSettings='zoomSettings'>
    <e-layers>
      <e-layer
        :shapeData="world_map"
        :shapeDataPath="'Country'"
        :shapePropertyPath="'name'"
      >
      </e-layer>
    </e-layers>
    
    <!-- Keyboard accessible zoom -->
  </ejs-maps>
  
  <!-- Text alternative -->
  <div class="accessibility-text">
    <h2>Map Data Summary</h2>
    <table>
      <tr>
        <th>Country</th>
        <th>Population</th>
      </tr>
      <!-- Data table for screen readers -->
    </table>
  </div>
</template>
<script>
import { MapsComponent, LayerDirective, LayersDirective } from '@syncfusion/ej2-vue-maps';
import { world_map } from './world-map.js';
export default {
  world_map: world_map,
  zoomSettings: {
      enable: true,
      pinchZooming: true
  }
};
</script>
```

### Color Contrast

```javascript
shapeSettings: {
  fill: '#000099',        // Dark blue
  border: {
    color: '#FFFFFF'      // White - high contrast
  }
}

// Text on maps
textStyle: {
  color: '#000',          // Black text
  fontWeight: 'bold',     // Easier to read
  size: '14px'            // Readable size
}
```

### Keyboard Navigation

Maps automatically support:
- Tab - Move focus
- Arrow keys - Navigate
- Enter/Space - Activate
- Escape - Close tooltips
- + / - Zoom in/out

## State Persistence

Save and restore map state across sessions.

### Save Map State

```vue
<template>
  <div>
    <button @click="saveState">Save Map State</button>
    <button @click="restoreState">Restore Map State</button>
    
    <ejs-maps ref="mapsRef" @load="onMapLoad">
      <e-layers>
        <e-layer :shapeData="world_map"></e-layer>
      </e-layers>
    </ejs-maps>
  </div>
</template>

<script>
import { MapsComponent, LayerDirective, LayersDirective } from '@syncfusion/ej2-vue-maps';
import { world_map } from './world-map.js';
export default {
  world_map: world_map,
  methods: {
    saveState() {
      const mapInstance = this.$refs.mapsRef;
      
      const state = {
        zoom: mapInstance.zoomModule?.getCurrentZoom?.(),
        center: mapInstance.centerPosition,
        timestamp: Date.now()
      };
      
      // Save to localStorage
      localStorage.setItem('mapState', JSON.stringify(state));
    },
    
    restoreState() {
      const state = JSON.parse(localStorage.getItem('mapState'));
      
      if (state) {
        const mapInstance = this.$refs.mapsRef;
        // Restore map to saved state
        mapInstance.zoom(state.zoom);
      }
    },
    
    onMapLoad() {
      // Auto-restore on component mount
      this.restoreState();
    }
  }
};
</script>
```

## Printing and Export

Allow users to print or export map visualizations.

### Print Support

```vue
<template>
  <div>
    <button @click="printMap">Print Map</button>
    
    <ejs-maps ref="mapsRef">
      <e-layers>
        <e-layer :shapeData="world_map"></e-layer>
      </e-layers>
    </ejs-maps>
  </div>
</template>

<script>
import { MapsComponent, LayerDirective, LayersDirective } from '@syncfusion/ej2-vue-maps';
import { world_map } from './world-map.js';
export default {
  world_map: world_map,
  methods: {
    printMap() {
      const mapInstance = this.$refs.mapsRef;
      mapInstance.print();
    }
  }
};
</script>
```

### Export to Image

```vue
<template>
  <button @click="exportMap">Export as PNG</button>
   <ejs-maps ref="mapsRef">
      <e-layers>
        <e-layer :shapeData="world_map"></e-layer>
      </e-layers>
    </ejs-maps>
</template>

<script>
import { MapsComponent, LayerDirective, LayersDirective } from '@syncfusion/ej2-vue-maps';
import { world_map } from './world-map.js';
export default {
  world_map: world_map,
  methods: {
    exportMap() {
      const mapInstance = this.$refs.mapsRef;
      mapInstance.export('PNG', 'map.png');
    }
  }
};
</script>
```

**Export formats:**
- `PNG` - Raster image
- `SVG` - Vector image
- `PDF` - Document format

## Performance Optimization

Improve map rendering and interaction performance.

### Simplify GeoJSON

Large GeoJSON files slow rendering:

```javascript
// Before: Complex boundary with 1000+ points
// After: Simplified to 100 points (usually imperceptible)

// Use tools like:
// - Mapshaper (https://mapshaper.org/)
// - topojson-simplify

// Reduce from 500KB to 50KB file size
```

### Lazy Load Data

```vue
<template>
  <ejs-maps @load="onMapLoad">
    <e-layers>
      <e-layer
        :shapeData="world_map"
        :dataSource="lazyLoadedData"
      >
      </e-layer>
    </e-layers>
  </ejs-maps>
</template>

<script>
import { MapsComponent, LayerDirective, LayersDirective } from '@syncfusion/ej2-vue-maps';
import { world_map } from './world-map.js';
export default {
  data() {
    return {
      world_map: world_map,
      lazyLoadedData: []
    };
  },
  methods: {
    onMapLoad() {
      // Load data only after map is ready
      setTimeout(() => {
        this.lazyLoadedData = this.fetchCountryData();
      }, 500);
    }
  }
};
</script>
```

### Virtualize Markers

```javascript
// Instead of 10,000 markers, show only visible ones
markerSettings: {
  dataSource: allMarkers,  // Can be large
  template: customMarkerTemplate
  // Component automatically virtualizes based on zoom
}
```

### Limit Layers

```javascript
// Fewer layers = better performance
// 1-3 layers optimal
// >5 layers start to degrade performance

layers: [
  { /* base layer */ },
  { /* data layer */ }
  // Avoid: { /* overlay 1 */ }, { /* overlay 2 */ }, ...
]
```

### Disable Animations

```javascript
// For large datasets, disable animations
dataLabelSettings: {
  visible: true,
  animationDuration: 0  // No animation
}
```

## Best Practices

1. **Choose projection wisely** - Mercator for navigation, Eckert for statistics
2. **Always include title** - Context for users
3. **High contrast colors** - Accessibility important
4. **Simplify for performance** - Don't load unnecessary complexity
5. **Support multiple languages** - RTL + i18n
6. **Test print output** - Ensure readable when printed
7. **Optimize exports** - PNG for rasters, SVG for vectors
8. **Document complex features** - Help users understand
