# User Interactions in Vue Maps

## Table of Contents
- [Zooming](#zooming)
  - [Enable Zooming](#enable-zooming)
  - [Zoom Methods](#zoom-methods)
  - [Zoom Levels](#zoom-levels)
  - [Zoom with Toolbar](#zoom-with-toolbar)
- [Panning](#panning)
  - [Enable Panning](#enable-panning)
  - [Pan Events](#pan-events)
- [Tooltips](#tooltips)
  - [Shape Tooltips](#shape-tooltips)
  - [Tooltip Templates](#tooltip-templates)
  - [Marker Tooltips](#marker-tooltips)
- [Selection and Highlighting](#selection-and-highlighting)
  - [Enable Selection](#enable-selection)
  - [Selection Events](#selection-events)
  - [Enable Highlighting](#enable-highlighting)
- [Event Handling](#event-handling)
  - [Common Events](#common-events)
- [Complete Interaction Example](#complete-interaction-example)
- [Best Practices](#best-practices)
- [API Reference for Interactions](#api-reference-for-interactions)
  - [Key Properties](#key-properties)
  - [Key Methods](#key-methods)
  - [Key Events](#key-events)

## Zooming

Enable users to zoom in/out of map areas using multiple methods.

### Enable Zooming

```vue
<template>
    <div id="app">
          <div class='wrapper'>
            <ejs-maps :zoomSettings='zoomSettings' >
                <e-layers>
                    <e-layer :shapeData='shapeData' ></e-layer>
                </e-layers>
            </ejs-maps>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import { MapsPlugin, Zoom } from '@syncfusion/ej2-vue-maps';
import { world_map } from './world-map.js';
Vue.use(MapsPlugin);
export default {
data () {
    return{
        zoomSettings: {
            enable: true,
            toolbarSettings: {
               buttonSettings: {
                 toolbarItems: ['Zoom', 'ZoomIn', 'ZoomOut', 'Pan', 'Reset'],
               }
            }
        },
        shapeData: world_map,
    }
},
provide: {
    maps: [Zoom]
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

### Zoom Methods

Multiple ways users can zoom:

```javascript
zoomSettings: {
  enable: true,
  zoomFactor: 2,                // Zoom level multiplier
  
  // Toolbar for zoom controls
  toolbarSettings : {
    orientation : 'Vertical', // 'Vertical' or 'Horizontal'
  } 
  
  // Enable specific interactions
  mouseWheelZoom: true,         // Mouse wheel zoom
  doubleClickZoom: true,        // Double-click zoom
  pinchZoom: true,              // Touch pinch zoom
  zoomOnClick : false,           // Single click (usually false)
  
  // Initial zoom level
  minZoom: 1,                   // Minimum zoom
  maxZoom: 100                  // Maximum zoom
}
```

### Zoom Levels

```javascript
// Initial zoom to specific level
zoomSettings: {
  enable: true,               // Zoom factor on load
  zoomFactor: 2                 // Increment per zoom action
}
```

### Zoom with Toolbar

```vue
<template>
    <div id="app">
          <div>
            <ejs-maps :zoomSettings='zoomSettings'>
                <e-layers>
                    <e-layer :shapeData='shapeData' :shapeSettings='shapeSettings'></e-layer>
                </e-layers>
            </ejs-maps>
        </div>
    </div>
</template>

<script>

import { MapsComponent, Zoom, LayerDirective, LayersDirective} from '@syncfusion/ej2-vue-maps';
import { world_map } from './world-map.js';

export default {
name: "App",
components: {
"ejs-maps":MapsComponent,
"e-layers":LayersDirective,
"e-layer":LayerDirective
},
data () {
    return{
        shapeData: world_map,
        shapeSettings:{
          fill:'#C1DFF5'
        },
        zoomSettings: {
        enable: true,
            toolbarSettings:{
                orientation:'Vertical',
                backgroundColor:'pink',
                borderWidth:3,
                borderColor:'green',
                verticalAlignment:'Near',
                buttonSettings: {
                   toolbarItems: ['Zoom', 'ZoomIn', 'ZoomOut', 'Pan', 'Reset']
                }
            }
        }
    }
},
provide: {
    maps: [Zoom]
}
}
</script>
```

Toolbar buttons:
- `+` - Zoom in
- `-` - Zoom out
- 🔄 - Reset to initial view

## Panning

Allow users to drag the map to explore different regions.

### Enable Panning

```vue
<template>
    <div id="app">
          <div class='wrapper'>
            <ejs-maps :zoomSettings='zoomSettings' >
                <e-layers>
                    <e-layer :shapeData='shapeData' ></e-layer>
                </e-layers>
            </ejs-maps>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import { MapsPlugin, Zoom } from '@syncfusion/ej2-vue-maps';
import { world_map } from './world-map.js';
Vue.use(MapsPlugin);
export default {
data () {
    return{
        zoomSettings: {
            enable: true,
            enablePanning: true
        },
        shapeData: world_map,
    }
},
provide: {
    maps: [Zoom]
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

### Pan Events

```vue
<template>
  <ejs-maps @panByDirection="panByDirection">
    <e-layers>
      <e-layer :shapeData="world_map"></e-layer>
    </e-layers>
  </ejs-maps>
</template>

<script>
export default {
  methods: {
    panByDirection(args) {
      console.log('Pan event:', {
        tileTranslatePoint: args.tileTranslatePoint,
        direction: args.direction
      });
    }
  }
};
</script>
```

## Tooltips

Show contextual information when hovering over map elements.

### Shape Tooltips

```vue
<template>
    <div id="app">
          <div class='wrapper'>
            <ejs-maps :tooltipRender='tooltipRender'>
                <e-layers>
                    <e-layer :shapeData='shapeData' :shapePropertyPath='shapePropertyPath' :shapeDataPath='shapeDataPath' :shapeSettings='shapeSettings' :dataSource='dataSource' :tooltipSettings='tooltipSettings' ></e-layer>
                </e-layers>
            </ejs-maps>
        </div>
    </div>
</template>

<script>

import { MapsComponent, MapsTooltip, LayerDirective, LayersDirective } from '@syncfusion/ej2-vue-maps';
import { world_map } from './world-map.js';

export default {
name: "App",
components: {
"ejs-maps":MapsComponent,
"e-layers":LayersDirective,
"e-layer":LayerDirective
},
data () {
    return{
        shapeData: world_map,
        shapePropertyPath: 'name',
        shapeDataPath: 'name',
        shapeSettings: {
            fill: '#E5E5E5',
            colorMapping: [
                { color: '#b3daff', value: '1' },
                { color: '#80c1ff', value: '2' },
                { color: '#1a90ff', value: '3' },
                { color: '#005cb3', value: '7' }
            ],
            colorValuePath: 'value1'
        },
        dataSource: [
            { "name": "India", "value1": "3", "value2": "2", "country": "India" },
            { "name": "Dominican Rep.", "value1": "3", "value2": "2", "country": "West Indies" },
            { "name": "Cuba", "value1": "3", "value2": "2", "country": "West Indies" },
            { "name": "Jamaica", "value1": "3", "value2": "2", "country": "West Indies" },
            { "name": "Haiti", "value1": "3", "value2": "2", "country": "West Indies" },
            { "name": "Guyana", "value1": "3", "value2": "2", "country": "West Indies" },
            { "name": "Suriname", "value1": "3", "value2": "2", "country": "West Indies"},
            { "name": "Trinidad and Tobago", "value1": "3", "value2": "2", "country": "West Indies" },
            { "name": "Sri Lanka", "value1": "3", "value2": "1", "country": "Sri Lanka" },
            { "name": "United Kingdom", "value1": "3", "value2": "0", "country": "England" },
            { "name": "Pakistan", "value1": "2", "value2": "1", "country": "Pakistan" },
            { "name": "New Zealand", "value1": "1", "value2": "0", "country": "New Zealand" },
            { "name": "Australia", "value1": "7", "value2": "5", "country": "Australia" }
        ],
        tooltipSettings: {
            visible: true,
            valuePath: 'name',
            format: '${name}: ${value1}',
            fill: '#D0D0D0',
            textStyle: {
                color: 'green',
                fontFamily: 'Times New Roman',
                fontStyle: 'Sans-serif'
            }
        }
    }
},
provide: {
    maps: [MapsTooltip]
},
methods:{
    tooltipRender:function(args){
        if (!args.options.data) {
            args.cancel = true;
        }
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

### Tooltip Templates

```vue
<template>
    <div id="app">
          <div class='wrapper'>
            <ejs-maps>
                <e-layers>
                    <e-layer :shapeData='shapeData' :shapePropertyPath='shapePropertyPath' :shapeDataPath='shapeDataPath' :dataSource='dataSource' :tooltipSettings='tooltipSettings' ></e-layer>
                </e-layers>
            </ejs-maps>
        </div>
    </div>
</template>

<script>

import { MapsComponent, MapsTooltip, LayerDirective, LayersDirective } from '@syncfusion/ej2-vue-maps';
import { world_map } from './world-map.js';
import { default_data } from './default-data.js';

export default {
name: "App",
components: {
"ejs-maps":MapsComponent,
"e-layers":LayersDirective,
"e-layer":LayerDirective
},
data () {
    return{
        shapeData: world_map,
        shapePropertyPath: 'continent',
        shapeDataPath: 'continent',
        dataSource: default_data,
        tooltipSettings: {
            visible: true,
            valuePath: 'continent',
            template: '<div style="width:60px; text-align:center; background-color: white; border: 2px solid black; padding-bottom: 10px;padding-top: 10px;padding-left: 10px;padding-right: 10px;"><span>${continent}</span></div>',
            textStyle: {
                color: 'black'
            }
        }
    }
},
provide: {
    maps: [MapsTooltip]
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

### Marker Tooltips

```vue
<template>
    <div id="app">
          <div class='wrapper'>
            <ejs-maps >
                <e-layers>
                    <e-layer :shapeData='shapeData' :markerSettings='markerSettings'></e-layer>
                </e-layers>
            </ejs-maps>
        </div>
    </div>
</template>

<script>

import { MapsComponent, Marker, MapsTooltip, LayerDirective, LayersDirective } from '@syncfusion/ej2-vue-maps';
import { usMap } from './usa.js';

export default {
name: "App",
components: {
"ejs-maps":MapsComponent,
"e-layers":LayersDirective,
"e-layer":LayerDirective,
},
data () {
    return {
        shapeData: usMap,
        markerSettings: [{
            dataSource: [
                { latitude: 40.7424509, longitude: -74.0081468, city: 'New York' }
            ],
        visible:true,
        shape:'Circle',
        fill:'white',
        width:3,
        animationDuration:0,
        border: { width:2, color:'green'},
        tooltipSettings: {
            visible: true,
            valuePath:'city'
        }
        }]
    }
},
provide: {
    maps: [Marker, MapsTooltip]
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

## Selection and Highlighting

Let users interact with shapes by selecting or highlighting them.

### Enable Selection

```vue
<template>
    <div id="app">
          <div class='wrapper'>
            <ejs-maps :layers='layers'>
            </ejs-maps>
        </div>
    </div>
</template>

<script>

import { MapsComponent, Selection, Bubble } from '@syncfusion/ej2-vue-maps';
import { world_map } from './world-map.js';

export default {
name: "App",
components: {
"ejs-maps":MapsComponent
},
data () {
    return {
        layers: [{
            shapeData: world_map,
            shapeDataPath: 'name',
            shapePropertyPath: 'name',
            bubbleSettings: [{
                visible: true,
                dataSource: [
                    { name: 'India', population: '38332521' },
                    { name: 'South Africa', population: '19651127' },
                    { name: 'Pakistan', population: '3090416' }
                ],
            selectionSettings: {
                enable: true,
                fill: 'green',
                border: { color: 'white', width: 2}
            },
            valuePath: 'population'
        }]
    }]
    }
},
provide: {
    maps: [Selection, Bubble]
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

### Selection Events

```vue
<template>
  <ejs-maps @shapeSelected="onShapeSelected" @shapeHighlighted="onShapeHighlighted">
    <e-layers>
      <e-layer :shapeData="world_map"></e-layer>
    </e-layers>
  </ejs-maps>
</template>

<script>
import { MapsComponent, Marker, Zoom, MapsTooltip, LayerDirective, LayersDirective } from '@syncfusion/ej2-vue-maps';
import { world_map } from './world-map.js';
export default {
  name: "App",
components: {
"ejs-maps":MapsComponent,
"e-layers":LayersDirective,
"e-layer":LayerDirective
},
  methods: {
    onShapeSelected(args) {
      console.log('Selected shape:', args.shapeData);
      // Handle selection - show details, update dashboard, etc.
    },
    
    onShapeHighlighted(args) {
      console.log('Highlighted shape:', args.shapeData);
      // Handle hover highlighting
    }
  }
  provide: {
    maps: [Selection, Bubble]
}
};
</script>
```

### Enable Highlighting

```vue
<template>
    <div id="app">
          <div class='wrapper'>
            <ejs-maps :layers='layers'>
            </ejs-maps>
        </div>
    </div>
</template>

<script>

import { MapsComponent, Highlight, Bubble } from '@syncfusion/ej2-vue-maps';
import { world_map } from './world-map.js';

export default {
name: "App",
components: {
"ejs-maps":MapsComponent
},
data () {
    return {
        layers: [{
            shapeData: world_map,
            shapeDataPath: 'name',
            shapePropertyPath: 'name',
            bubbleSettings: [{
                visible: true,
                dataSource: [
                    { name: 'India', population: '38332521' },
                    { name: 'South Africa', population: '19651127' },
                    { name: 'Pakistan', population: '3090416' }
                ],
            highlightSettings: {
                enable: true,
                fill: 'green',
                border: { color: 'white', width: 2}
            },
            valuePath: 'population'
        }]
    }]
    }
},
provide: {
    maps: [Highlight, Bubble]
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

## Event Handling

Map fires various events you can listen to and respond.

### Common Events

```vue
<template>
  <ejs-maps
    @load="onMapLoad"
    @loaded="onMapLoaded"
    @click="onMapClick"
    @rightClick="onMapRightClick"
    @doubleClick="onMapDoubleClick"
    @resize="onMapResize"
    @zoom="onMapZoom"
    @pan="onMapPan"
    @shapeSelected="onShapeSelected"
    @markerClick="onMarkerClick"
    @markerRendering="onMarkerRendering"
    @shapeHighlighted="onShapeHighlighted">
    <e-layers>
      <e-layer
        :shapeData="world_map">
        <e-markers
          :dataSource="markers">
        </e-markers>
      </e-layer>
    </e-layers>
  </ejs-maps>
</template>

<script>
export default {
  methods: {
    // Map events
    onMapLoad(args) {
      console.log('Map loading...');
    },
    
    onMapLoaded(args) {
      console.log('Map loaded!');
      // Initialize features after map is ready
    },
    
    onMapClick(args) {
      console.log('Clicked at:', {
        latitude: args.latitude,
        longitude: args.longitude
      });
    },
    
    onMapRightClick(args) {
      console.log('Right-clicked');
    },
    
    onMapDoubleClick(args) {
      console.log('Double-clicked');
    },
    
    onMapResize(args) {
      console.log('Map resized');
    },
    
    onMapZoom(args) {
      console.log('Zoom event:', args.zoomFactor);
    },
    
    onMapPan(args) {
      console.log('Pan event');
    },
    
    // Shape events
    onShapeSelected(args) {
      console.log('Shape selected:', args.shapeData);
    },
    
    onShapeHighlighted(args) {
      console.log('Shape highlighted');
    },
    
    // Marker events
    onMarkerClick(args) {
      console.log('Marker clicked:', args.data);
    },
    
    onMarkerRendering(args) {
      // Customize marker before rendering
      console.log('Marker rendering');
    }
  }
};
</script>
```

## Complete Interaction Example

Comprehensive example with all interaction features:

```vue
<template>
  <div class="map-container">
    <div class="controls">
    </div>
    
    <ejs-maps
      ref="mapsRef"
      @load="onMapLoad"
      @click="onMapClick"
    >
      <e-layers>
        <e-layer
          :shapeData="world_map"
          :dataSource="countryData"
          :shapeDataPath="'Country'"
          :shapePropertyPath="'name'"
          :shapeSettings="shapeSettings"
          :tooltipSettings="tooltipSettings"
          :selectionSettings="selectionSettings"
          :highlightSettings="highlightSettings"
        >
          <e-markers :dataSource="markers"></e-markers>
        </e-layer>
      </e-layers>
      
      <e-zoom-settings
        :enable="true"
        :enablePanning="true"
      >
      </e-zoom-settings>
    </ejs-maps>
  </div>
</template>

<script>
import { 
  MapsComponent, LayersDirective, LayerDirective,
  ZoomSettingsDirective, Inject,
  Zoom, Selection, Highlight, MapsTooltip, Marker
} from '@syncfusion/ej2-vue-maps';
import { world_map } from '@syncfusion/ej2-map-data';

export default {
  components: {
    'ejs-maps': MapsComponent,
    'e-layers': LayersDirective,
    'e-layer': LayerDirective,
    'e-zoom-settings': ZoomSettingsDirective,
    'e-markers': MarkersDirective,
    'e-marker': MarkerDirective
  },
  provide: {
    maps: [Zoom, Selection, Highlight, MapsTooltip, Marker]
  },
  data() {
    return {
      world_map: world_map,
      selectedShape: 'None',
      
      countryData: [
        { Country: 'United States', Population: 331000000 },
        { Country: 'China', Population: 1439000000 }
      ],
      
      shapeSettings: {
        colorValuePath: 'Population',
        colorMapping: [
          { value: 331000000, color: '#FFC0CB' },
          { value: 1439000000, color: '#FF0000' }
        ]
      },
      
      tooltipSettings: {
        visible: true,
        valuePath: 'Country'
      },
      
      selectionSettings: {
        enable: true,
        fill: '#FFD700',
        border: { width: 2, color: '#000' }
      },
      
      highlightSettings: {
        enable: true,
        fill: '#FFFF00',
        border: { width: 1, color: '#FF0000' }
      },
      
      markers: [
        { latitude: 40.7128, longitude: -74.0060, name: 'NYC' },
        { latitude: 39.9526, longitude: 116.4074, name: 'Beijing' }
      ]
    };
  },
  
  methods: {
    onMapLoad(args) {
      console.log('Map initialized');
    },
    
    onMapClick(args) {
      console.log('Clicked at:', args.latitude, args.longitude);
    },
  }
};
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 100vh;
  position: relative;
}

.controls {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 100;
  background: white;
  padding: 10px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

button {
  margin-right: 10px;
  padding: 8px 16px;
  background: #0066CC;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background: #0052A3;
}
</style>
```

## Best Practices

1. **Always enable zoom** - Standard user expectation
2. **Match panning with zoom** - Enable both together
3. **Show tooltips on hover** - Non-intrusive information
4. **Visual feedback on selection** - Clear what's selected
5. **Smooth animations** - Don't jarring jumps
6. **Responsive controls** - Works on touch devices
7. **Test accessibility** - Keyboard navigation essential
8. **Provide reset** - Always way to return to default view

## API Reference for Interactions

The user interactions are controlled by several component properties and events. For comprehensive API documentation:

### Key Properties
- `zoomSettings` - Configure zoom behavior (see api-reference-complete.md)
- `tooltipDisplayMode` - Set tooltip trigger ('MouseMove', 'Click', 'DoubleClick')

### Key Methods
- `zoomByPosition(centerPosition, zoomFactor)` - Programmatic zoom
- `zoomToCoordinates(minLat, minLon, maxLat, maxLon)` - Zoom to bounds
- `panByDirection(direction, mouseLocation)` - Move map programmatically
- `pointToLatLong(pageX, pageY)` - Convert screen coordinates to lat/lon
- `reset()` - Return to initial view

### Key Events
- `zoom` - Before zoom operation
- `zoomComplete` - After zoom completes
- `pan` - Before pan operation
- `panComplete` - After pan completes
- `shapeSelected` - Shape was selected
- `shapeHighlighted` - Shape is highlighted
- `tooltipRender` - Before tooltip shows
- `tooltipRenderComplete` - After tooltip renders

For complete API reference including all properties, methods, and events, see **api-reference-complete.md**.
